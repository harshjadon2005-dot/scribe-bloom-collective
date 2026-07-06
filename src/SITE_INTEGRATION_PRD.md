# PRD — Connecting Frontend Sites to NeuroSEO (Auto-Publish Blogs)

**Owner:** Aditya
**Status:** Ready to build
**Applies to:** Every external frontend site you want NeuroSEO to publish into (React SPA + Next.js).
**Related:** `neuroseo-api/src/services/cms/headless.publisher.ts`, `neuroseo-api/src/models/site.model.ts`

---

## 1. Goal

Today you write each blog by hand (MDX/markdown files or components), commit, and `git push` — your build renders it on `/blog`, `/compare`, `/alternatives`. This PRD makes NeuroSEO do that "write-file-and-push" step automatically, so an approved article in the NeuroSEO dashboard lands on the target site with **no change to your existing rendering**.

**Non-goal:** Rebuilding your blog UI. Your `/blog`, `/compare`, `/alternatives` pages stay exactly as they are — we only feed them new source files.

---

## 2. Why this works with zero rendering changes

NeuroSEO already ships a **`headless` CMS publisher**. When you connect a site as type `headless`, publishing a blog sends a **signed HTTP POST** to a webhook URL you own. We build a small receiver per site that:

1. Verifies the request is really from NeuroSEO (HMAC signature).
2. Converts the payload into **the exact frontmatter + file format your site already uses**.
3. Commits that file to your site's Git repo via the GitHub API (= your current `git push`, automated).
4. Your existing CI/CD redeploys → the post is live.

Because step 2 outputs the *same files you write by hand today*, `/blog` etc. render them with no code changes.

```
NeuroSEO (approve/publish)
      │  POST + X-NeuroSEO-Signature (HMAC-SHA256)
      ▼
[Your webhook receiver]  ── verify sig ──► reject if bad
      │
      │  map payload → your MDX frontmatter
      ▼
GitHub API: commit content/blog/<slug>.mdx  (or /compare, /alternatives)
      │
      ▼
CI/CD auto-deploy ──► post live on existing /blog route
      │
      └──► respond 200 { id, url }  (NeuroSEO stores as cms_post_id + published_url)
```

---

## 3. The contract (authoritative — from `headless.publisher.ts`)

### Request NeuroSEO sends you

**Headers**
| Header | Value |
|---|---|
| `Content-Type` | `application/json` |
| `X-NeuroSEO-Signature` | `HMAC-SHA256(rawBody, signing_secret)` as lowercase hex |
| `X-NeuroSEO-Event` | `post.publish` on real publishes; `ping` on connection test |

**Body (when `format = markdown` — recommended for you)**
```json
{
  "title": "How X Beats Y",
  "slug": "how-x-beats-y",
  "meta_title": "How X Beats Y (2026 Guide)",
  "meta_description": "…",
  "excerpt": "…",
  "featured_image": { "url": "https://…", "alt": "…" },
  "faq": [{ "question": "…", "answer": "…" }],
  "tags": ["comparison", "saas"],
  "status": "publish",
  "content": "# Heading\n\nMarkdown body…",
  "content_format": "markdown"
}
```
> `format = html` swaps `content` for HTML. `format = json` (default) sends both `content_markdown` and `content_html`. **Use `markdown`** — it matches how you author today.

### Response you must return

- On `ping`: any 2xx (e.g. `{ "ok": true }`).
- On `post.publish`: `200` with
```json
{ "id": "how-x-beats-y", "url": "https://yoursite.com/blog/how-x-beats-y" }
```
NeuroSEO stores `id` → `cms_post_id`, `url` → `published_url`. If you can't compute the final URL synchronously, return the deterministic URL you *will* deploy to (slug-based).

### Signature verification (critical)

- Compute HMAC over the **raw request body bytes**, before any JSON parsing/re-serialization. Re-serializing changes bytes and breaks the signature.
- Compare using a constant-time compare (`crypto.timingSafeEqual`).
- Reject with `401` on mismatch.

---

## 4. What to build on each site

### 4.1 A webhook receiver endpoint

- **Next.js sites:** an App Router route handler, e.g. `app/api/neuroseo-webhook/route.ts` (must read the raw body — do **not** rely on the auto-parsed JSON for signature checking).
- **React SPA sites (Vite/CRA, no server):** a serverless function on your host — Vercel/Netlify function, Cloudflare Worker, or a tiny Express service. Same logic; it just needs to run server-side to hold the secret and call the GitHub API.

**Optional — one shared gateway:** Instead of an endpoint per site, you may host a single "publish gateway" service that receives all sites' webhooks and commits to the correct repo based on the site. Simpler to maintain, one place to store GitHub tokens. Per-site endpoints are fine too — pick one and note it in §9.

### 4.2 Signature verification (reject on fail, handle `ping`).

### 4.3 A payload → your-format mapper (the part that differs per site)

This is the only real per-site work. Map NeuroSEO fields into **your existing frontmatter schema**. Fill this table per site before coding:

| Your frontmatter key | NeuroSEO field | Notes |
|---|---|---|
| `title` | `title` | |
| `description` / `seoDescription` | `meta_description` | |
| `title`/`ogTitle` | `meta_title` | if you keep a separate SEO title |
| `slug` | `slug` | also the filename |
| `excerpt`/`summary` | `excerpt` | |
| `date`/`publishedAt` | *(not sent)* | stamp with server time at receive |
| `tags`/`categories` | `tags` | |
| `coverImage`/`ogImage` | `featured_image.url` | |
| `coverAlt` | `featured_image.alt` | |
| `faq` | `faq` | render as an FAQ block / JSON-LD if your template supports it |
| body | `content` | markdown → write into the MDX/md body |

Output a file identical to what you hand-author, e.g.:
```mdx
---
title: "How X Beats Y"
description: "…"
slug: "how-x-beats-y"
date: "2026-07-01"
tags: ["comparison", "saas"]
coverImage: "https://…"
---

# Heading

Markdown body…
```

### 4.4 Content-type routing (`/blog` vs `/compare` vs `/alternatives`)

NeuroSEO's payload has no native "content type" field, so route by a **convention**:
- **By tag:** if `tags` includes `compare` → write to `content/compare/`, `alternatives` → `content/alternatives/`, else default `content/blog/`. (Set these tags when generating in NeuroSEO.)
- **or by slug prefix:** `compare-…`, `vs-…`, `alternatives-…`.
- Document the chosen convention so whoever generates content in NeuroSEO tags/names articles correctly. If unsure, **start with `/blog` only** and add `/compare`, `/alternatives` routing once the blog path is proven.

### 4.5 Commit to Git (replaces your manual push)

- Use the GitHub REST API (`PUT /repos/{owner}/{repo}/contents/{path}`) or Octokit with a fine-grained PAT (repo contents: read/write).
- Commit message e.g. `content: publish "<title>" via NeuroSEO`.
- Target the branch your deploy watches (usually `main`).

### 4.6 Idempotency / updates (no duplicates)

- File path is derived from `slug` → same slug overwrites the same file (an edit, not a duplicate). When committing an existing file, include its current blob `sha` (GitHub requires it for updates).
- Safe to receive the same publish twice.

---

## 5. Security requirements

- `signing_secret` and the GitHub token live in **server-side env vars only** — never in client React bundles.
- Always verify `X-NeuroSEO-Signature` with a constant-time compare; `401` on mismatch.
- Ignore/allow `X-NeuroSEO-Event: ping` cheaply (return 200 without committing).
- Rate-limit / size-limit the endpoint (reject bodies over ~1–2 MB).
- Optionally allowlist NeuroSEO's egress IP if you have one; the HMAC is the primary guard.

---

## 6. Per-site configuration (env)

| Var | Purpose |
|---|---|
| `NEUROSEO_SIGNING_SECRET` | Same secret you enter in the NeuroSEO dashboard for this site |
| `GITHUB_TOKEN` | Fine-grained PAT with contents:write on this repo |
| `GITHUB_REPO` | `owner/repo` |
| `GITHUB_BRANCH` | e.g. `main` |
| `SITE_PUBLIC_URL` | To build the returned `url` (e.g. `https://yoursite.com`) |
| `CONTENT_DIR_BLOG` / `_COMPARE` / `_ALTERNATIVES` | Folder paths for routing |

---

## 7. NeuroSEO dashboard setup (per site)

1. **Sites → [site] → CMS section → choose `Headless`.**
2. Enter:
   - `webhook_url` = your receiver URL (e.g. `https://yoursite.com/api/neuroseo-webhook`)
   - `signing_secret` = the same value as `NEUROSEO_SIGNING_SECRET`
   - `format` = `markdown`
3. Connect → NeuroSEO fires a `ping`; your endpoint returns 200 → connected.
4. (Optional) In site Settings, set `auto_publish_enabled` + min SEO/quality scores if you want fully hands-off publishing; otherwise you approve each article and hit Publish.

---

## 8. Acceptance criteria

- [ ] `ping` from the dashboard returns 2xx and shows "connected".
- [ ] A bad/absent signature returns `401` and commits nothing.
- [ ] A real `post.publish` writes a correctly-frontmattered file to the right folder and commits to the deploy branch.
- [ ] Re-publishing the same slug updates the existing file (no duplicate).
- [ ] The article renders on the existing `/blog` (or `/compare` / `/alternatives`) route after deploy with no template changes.
- [ ] Endpoint returns `{ id, url }`; NeuroSEO shows the blog as `published` with the correct `published_url`.
- [ ] Secrets are server-side only; not present in the client bundle.

---

## 9. Per-site rollout checklist

For **each** site, record:
- [ ] Stack (Next.js App Router / Next.js Pages / Vite SPA / other) → receiver style (route handler vs serverless fn)
- [ ] Frontmatter schema captured in the §4.3 mapping table
- [ ] Content-type routing convention chosen (§4.4)
- [ ] Receiver deployed + env vars set
- [ ] Connected in NeuroSEO dashboard (§7)
- [ ] End-to-end test article published and verified live

---

## 10. Alternative storage (if a site is DB-backed, not file/git)

If some site renders `/blog` from a database instead of files: skip the Git commit, and have the receiver `upsert` a post row (unique on `slug`) into that DB. Everything else (signature, mapping, response) is identical. Use this only for dynamically-rendered sites; your current git-push sites should use the file-commit path in §4.5 to keep rendering unchanged.

---

## Appendix A — Reference receiver (Next.js App Router)

```ts
// app/api/neuroseo-webhook/route.ts
import { createHmac, timingSafeEqual } from "crypto";

const SECRET = process.env.NEUROSEO_SIGNING_SECRET!;

function valid(raw: string, sig: string) {
  const expected = createHmac("sha256", SECRET).update(raw).digest("hex");
  const a = Buffer.from(sig), b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function POST(req: Request) {
  const raw = await req.text();                       // raw body for HMAC
  const sig = req.headers.get("x-neuroseo-signature") ?? "";
  if (!valid(raw, sig)) return new Response("bad signature", { status: 401 });

  if (req.headers.get("x-neuroseo-event") === "ping")
    return Response.json({ ok: true });

  const p = JSON.parse(raw);
  const slug = p.slug;
  const dir = routeFor(p.tags);                       // §4.4 convention → content/blog|compare|alternatives
  const file = frontmatter(p);                        // §4.3 mapping → your MDX string
  await commitToGit(`${dir}/${slug}.mdx`, file);      // §4.5 GitHub contents API

  return Response.json({
    id: slug,
    url: `${process.env.SITE_PUBLIC_URL}/blog/${slug}`,
  });
}
```
`routeFor`, `frontmatter`, and `commitToGit` are the three small per-site functions to implement.
