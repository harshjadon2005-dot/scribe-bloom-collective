import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Container } from "@/components/site/Container";
import { Newsletter } from "@/components/site/Newsletter";
import { ArticleVertical } from "@/components/site/ArticleCard";
import { articles, formatDate, getArticle, getAuthor, getCategory, relatedTo, type Article } from "@/data/articles";
import { Twitter, Link as LinkIcon, Facebook, Bookmark } from "lucide-react";

export const Route = createFileRoute("/articles/$slug")({
  loader: ({ params }) => {
    const article = getArticle(params.slug);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ loaderData }) => {
    const a = loaderData?.article;
    if (!a) return {};
    return {
      meta: [
        { title: `${a.title} — Lordiphosa` },
        { name: "description", content: a.excerpt },
        { property: "og:title", content: a.title },
        { property: "og:description", content: a.excerpt },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/articles/${a.slug}` },
        { property: "article:published_time", content: a.publishedAt },
        { name: "twitter:title", content: a.title },
        { name: "twitter:description", content: a.excerpt },
      ],
      links: [{ rel: "canonical", href: `/articles/${a.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: a.title,
            description: a.excerpt,
            datePublished: a.publishedAt,
            dateModified: a.updatedAt ?? a.publishedAt,
            author: { "@type": "Person", name: getAuthor(a.authorSlug)?.name },
            publisher: { "@type": "Organization", name: "Lordiphosa" },
          }),
        },
      ],
    };
  },
  component: ArticlePage,
  notFoundComponent: () => (
    <SiteLayout>
      <Container className="py-32 text-center">
        <div className="eyebrow">404</div>
        <h1 className="mt-4 font-display text-5xl">This piece has been retired.</h1>
        <Link to="/articles" className="mt-8 inline-block border-b border-accent pb-1">Back to the library</Link>
      </Container>
    </SiteLayout>
  ),
});

function ArticlePage() {
  const { article } = Route.useLoaderData() as { article: Article };
  const author = getAuthor(article.authorSlug)!;
  const category = getCategory(article.category);
  const related = relatedTo(article, 3);

  const idx = articles.findIndex((a) => a.slug === article.slug);
  const prev = idx > 0 ? articles[idx - 1] : null;
  const next = idx < articles.length - 1 ? articles[idx + 1] : null;

  // Reading progress
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight);
      setProgress(Math.min(1, Math.max(0, scrolled)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // TOC — from markdown h2/h3
  const toc = article.body
    .split("\n")
    .filter((l: string) => l.startsWith("## ") || l.startsWith("### "))
    .map((l: string) => {
      const level = l.startsWith("### ") ? 3 : 2;
      const text = l.replace(/^#+\s+/, "");
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      return { level, text, id };
    });

  return (
    <SiteLayout>
      {/* Reading progress */}
      <div
        aria-hidden
        className="fixed top-16 left-0 right-0 h-[2px] bg-accent origin-left z-40"
        style={{ transform: `scaleX(${progress})` }}
      />

      <article>
        {/* Header */}
        <Container size="narrow" className="pt-16 pb-10 text-center">
          <nav aria-label="Breadcrumb" className="text-xs text-ink-soft mb-8">
            <Link to="/" className="hover:text-foreground">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/articles" className="hover:text-foreground">Articles</Link>
            {category && (
              <>
                <span className="mx-2">/</span>
                <Link to="/categories/$slug" params={{ slug: category.slug }} className="hover:text-foreground">
                  {category.name}
                </Link>
              </>
            )}
          </nav>

          {category && (
            <Link to="/categories/$slug" params={{ slug: category.slug }} className="eyebrow">
              {category.name}
            </Link>
          )}
          <h1 className="mt-5 font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.98] tracking-tight">
            {article.title}
          </h1>
          <p className="mt-6 text-xl text-ink-soft font-display italic leading-snug max-w-xl mx-auto">
            {article.subtitle}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm">
            <Link to="/authors/$slug" params={{ slug: author.slug }} className="flex items-center gap-3 group">
              <span className="h-9 w-9 rounded-full bg-foreground text-background grid place-items-center text-xs font-medium">
                {author.initials}
              </span>
              <span className="font-medium group-hover:text-accent transition-colors">
                {author.name}
              </span>
            </Link>
            <span aria-hidden className="text-ink-soft">·</span>
            <time className="text-ink-soft">{formatDate(article.publishedAt)}</time>
            <span aria-hidden className="text-ink-soft">·</span>
            <span className="text-ink-soft">{article.readingMinutes} min read</span>
          </div>
        </Container>

        {/* Hero cover */}
        <Container size="wide" className="pb-16">
          <figure>
            <div className="aspect-[16/9] overflow-hidden bg-secondary">
              <img
                src={article.cover}
                alt={article.coverAlt}
                width={1600}
                height={900}
                className="h-full w-full object-cover"
              />
            </div>
            <figcaption className="mt-3 text-xs text-ink-soft text-center italic">
              {article.coverAlt}
            </figcaption>
          </figure>
        </Container>

        {/* Body + sidebar */}
        <Container size="wide" className="pb-24">
          <div className="grid lg:grid-cols-12 gap-12">
            {/* TOC */}
            <aside className="hidden lg:block lg:col-span-3">
              <div className="sticky top-28">
                <div className="eyebrow mb-4" style={{ color: "var(--ink-soft)" }}>Contents</div>
                <ul className="space-y-2 text-sm border-l border-border pl-4">
                  {toc.map((t: { id: string; level: number; text: string }) => (
                    <li key={t.id} className={t.level === 3 ? "pl-4" : ""}>
                      <a href={`#${t.id}`} className="text-ink-soft hover:text-foreground transition-colors block">
                        {t.text}
                      </a>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex items-center gap-1">
                  <button aria-label="Share on Twitter" className="h-8 w-8 grid place-items-center rounded-full hover:bg-secondary">
                    <Twitter className="h-4 w-4" />
                  </button>
                  <button aria-label="Share on Facebook" className="h-8 w-8 grid place-items-center rounded-full hover:bg-secondary">
                    <Facebook className="h-4 w-4" />
                  </button>
                  <button aria-label="Copy link" className="h-8 w-8 grid place-items-center rounded-full hover:bg-secondary">
                    <LinkIcon className="h-4 w-4" />
                  </button>
                  <button aria-label="Bookmark" className="h-8 w-8 grid place-items-center rounded-full hover:bg-secondary">
                    <Bookmark className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </aside>

            {/* Body */}
            <div className="lg:col-span-6 lg:col-start-4">
              <div className="prose-editorial max-w-none">
                <p className="font-display text-2xl leading-[1.4] mb-8">
                  <span className="float-left font-display text-6xl leading-[0.85] mr-3 mt-1 text-accent">
                    {article.body.trim()[0]}
                  </span>
                  {article.body.trim().slice(1).split("\n\n")[0]}
                </p>
                {article.body.split("\n\n").slice(1).map((block: string, i: number) => {
                  const trimmed = block.trim();
                  if (trimmed.startsWith("## ")) {
                    const text = trimmed.slice(3);
                    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
                    return <h2 key={i} id={id}>{text}</h2>;
                  }
                  if (trimmed.startsWith("### ")) {
                    const text = trimmed.slice(4);
                    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
                    return <h3 key={i} id={id}>{text}</h3>;
                  }
                  if (trimmed.startsWith("> ")) {
                    return <blockquote key={i}>{trimmed.slice(2)}</blockquote>;
                  }
                  if (trimmed === "---") {
                    return <hr key={i} />;
                  }
                  if (trimmed.startsWith("- ")) {
                    const items = trimmed.split("\n").map((l: string) => l.replace(/^-\s+/, ""));
                    return (
                      <ul key={i}>
                        {items.map((it: string, j: number) => <li key={j}>{it}</li>)}
                      </ul>
                    );
                  }
                  return <p key={i}>{trimmed}</p>;
                })}

                {/* Callout */}
                <aside className="not-prose my-12 border-l-2 border-accent bg-secondary/60 p-6">
                  <div className="eyebrow mb-2">A note from the editor</div>
                  <p className="font-display text-lg italic leading-snug">
                    If this piece stayed with you, consider forwarding it to one person who might feel the same. Word of mouth is how we grow.
                  </p>
                </aside>

                {/* FAQ */}
                <h2>Frequently asked</h2>
                <div className="not-prose divide-y divide-border rule-t rule-b">
                  {[
                    ["How long should the middle actually take?", "As long as the work demands and no longer. There is no correct number of drafts, only a correct feeling in the room."],
                    ["Is this a productivity essay?", "No. It is a permission slip."],
                    ["What notebook do you use?", "Whatever is closest. The ritual matters; the object does not."],
                  ].map(([q, a], i) => (
                    <details key={i} className="group py-5">
                      <summary className="flex items-center justify-between cursor-pointer list-none">
                        <span className="font-display text-lg">{q}</span>
                        <span className="text-accent text-xl group-open:rotate-45 transition-transform">+</span>
                      </summary>
                      <p className="mt-3 text-ink-soft leading-relaxed">{a}</p>
                    </details>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="mt-14 flex flex-wrap gap-2">
                {article.tags.map((t: string) => (
                  <span key={t} className="text-xs uppercase tracking-widest px-3 py-1.5 border border-border rounded-full hover:border-accent hover:text-accent transition-colors cursor-pointer">
                    {t}
                  </span>
                ))}
              </div>

              {/* Author card */}
              <div className="mt-14 rule-t rule-b py-10 grid sm:grid-cols-[auto_1fr] gap-6 items-start">
                <div className="h-16 w-16 rounded-full bg-foreground text-background grid place-items-center font-display text-xl">
                  {author.initials}
                </div>
                <div>
                  <div className="eyebrow" style={{ color: "var(--ink-soft)" }}>Written by</div>
                  <Link to="/authors/$slug" params={{ slug: author.slug }} className="mt-1 block font-display text-2xl hover:text-accent transition-colors">
                    {author.name}
                  </Link>
                  <p className="mt-2 text-ink-soft leading-relaxed">{author.bio}</p>
                </div>
              </div>

              {/* Prev / Next */}
              <div className="mt-8 grid sm:grid-cols-2 gap-6">
                {prev && (
                  <Link to="/articles/$slug" params={{ slug: prev.slug }} className="group rule-t pt-4">
                    <div className="text-xs text-ink-soft mb-1">← Previous</div>
                    <div className="font-display text-xl leading-tight group-hover:text-accent transition-colors">
                      {prev.title}
                    </div>
                  </Link>
                )}
                {next && (
                  <Link to="/articles/$slug" params={{ slug: next.slug }} className="group rule-t pt-4 sm:text-right">
                    <div className="text-xs text-ink-soft mb-1">Next →</div>
                    <div className="font-display text-xl leading-tight group-hover:text-accent transition-colors">
                      {next.title}
                    </div>
                  </Link>
                )}
              </div>

              {/* Comments placeholder */}
              <div className="mt-14 rule-t pt-8">
                <div className="eyebrow mb-3">Correspondence</div>
                <p className="text-ink-soft">
                  Comments are handled by mail. Write to <a href="mailto:letters@lordiphosa.com" className="underline decoration-accent underline-offset-2">letters@lordiphosa.com</a> — the best ones appear in next Sunday's dispatch.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </article>

      {/* Related */}
      {related.length > 0 && (
        <div className="bg-secondary/40 rule-t rule-b">
          <Container size="wide" className="py-20">
            <div className="mb-10 rule-b pb-4">
              <div className="eyebrow">Keep reading</div>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl">More from the archive</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-10">
              {related.map((a) => <ArticleVertical key={a.slug} article={a} />)}
            </div>
          </Container>
        </div>
      )}

      <Newsletter />
    </SiteLayout>
  );
}