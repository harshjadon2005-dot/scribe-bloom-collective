import crypto from 'node:crypto';

function valid(raw: string, sig: string) {
  const secret = process.env.NEUROSEO_SIGNING_SECRET || '';
  if (!secret) {
    console.error("Missing NEUROSEO_SIGNING_SECRET");
    return false;
  }
  
  const expected = crypto.createHmac("sha256", secret).update(raw).digest("hex");
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

export async function handleNeuroseoWebhook(request: Request): Promise<Response> {
  try {
    const raw = await request.text();
    const sig = request.headers.get("x-neuroseo-signature") ?? "";
    
    if (!valid(raw, sig)) {
      return new Response("bad signature", { status: 401 });
    }

    if (request.headers.get("x-neuroseo-event") === "ping") {
      return new Response(JSON.stringify({ ok: true }), { 
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const p = JSON.parse(raw);
    const slug = p.slug;
    
    // Map NeuroSEO payload to the Article interface used by the frontend
    const article = {
      slug: slug,
      title: p.title || p.meta_title || "Untitled",
      excerpt: p.excerpt || p.meta_description || "",
      category: p.tags && p.tags.length > 0 ? p.tags[0] : "software-engineering", // Default category
      authorSlug: "elena-marchetti", // Default author if not provided
      publishedAt: new Date().toISOString(),
      readingMinutes: Math.ceil((p.content?.length || 0) / 1000) || 5,
      coverImage: p.featured_image?.url || "",
      content: p.content,
    };

    // Commit to GitHub via REST API
    const token = process.env.GITHUB_TOKEN;
    const repo = process.env.GITHUB_REPO;
    const branch = process.env.GITHUB_BRANCH || 'main';

    if (!token || !repo) {
      console.error("Missing GitHub config (GITHUB_TOKEN or GITHUB_REPO)");
      return new Response("server config error", { status: 500 });
    }

    const path = `src/data/posts/${slug}.json`;
    const contentBase64 = Buffer.from(JSON.stringify(article, null, 2)).toString('base64');

    let sha = undefined;
    const getRes = await fetch(`https://api.github.com/repos/${repo}/contents/${path}?ref=${branch}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'User-Agent': 'NeuroSEO-Integration'
      }
    });
    
    if (getRes.ok) {
      const data = await getRes.json();
      sha = data.sha;
    }

    const putRes = await fetch(`https://api.github.com/repos/${repo}/contents/${path}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'User-Agent': 'NeuroSEO-Integration'
      },
      body: JSON.stringify({
        message: `content: publish "${article.title}" via NeuroSEO`,
        content: contentBase64,
        branch,
        sha
      })
    });

    if (!putRes.ok) {
      const errorText = await putRes.text();
      console.error("GitHub API error:", errorText);
      return new Response(JSON.stringify({ error: "Failed to commit" }), { 
        status: 500, 
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const publicUrl = process.env.SITE_PUBLIC_URL || 'http://localhost:8080';
    return new Response(JSON.stringify({
      id: slug,
      url: `${publicUrl}/articles/${slug}`,
    }), { headers: { 'Content-Type': 'application/json' }});
    
  } catch (err) {
    console.error(err);
    return new Response("internal server error", { status: 500 });
  }
}
