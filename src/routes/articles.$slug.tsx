import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Container } from "@/components/site/Container";
import { ArticleFAQ } from "@/components/site/ArticleFAQ";
import { articles, formatDate, popularTopics, type Article } from "@/data/articles";
import { Twitter, Link as LinkIcon, Facebook, Bookmark, Printer } from "lucide-react";
import { getArticleBySlug, getArticles, getAuthors, getTopics } from "@/api";

export const Route = createFileRoute("/articles/$slug")({
  loader: async ({ params }) => {
    try {
      const article = await getArticleBySlug({ data: { slug: params.slug } });
      const allArticles = await getArticles();
      const authors = await getAuthors();
      const categories = await getTopics();
      return { article, allArticles, authors, categories };
    } catch {
      throw notFound();
    }
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
            author: {
              "@type": "Person",
              name: loaderData?.authors?.find((a) => a.slug === a.authorSlug)?.name,
            },
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
        <Link to="/articles" className="mt-8 inline-block border-b border-accent pb-1">
          Back to the library
        </Link>
      </Container>
    </SiteLayout>
  ),
});

function ArticlePage() {
  const { article, allArticles, authors, categories } = Route.useLoaderData();
  const author = authors.find((a) => a.slug === article.authorSlug)!;
  const category = categories.find((c) => c.slug === article.category);
  const related = allArticles
    .filter((a) => a.category === article.category && a.slug !== article.slug)
    .slice(0, 4);
  const trending = allArticles.filter((a) => a.trending && a.slug !== article.slug).slice(0, 3);

  const idx = allArticles.findIndex((a) => a.slug === article.slug);
  const prev = idx > 0 ? allArticles[idx - 1] : null;
  const next = idx < allArticles.length - 1 ? allArticles[idx + 1] : null;

  // Reading progress & Intersection Observer
  const [progress, setProgress] = useState(0);
  const [activeId, setActiveId] = useState<string>("");

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

  const toc = article.body
    .split("\n")
    .filter((l: string) => l.startsWith("## ") || l.startsWith("### "))
    .map((l: string) => {
      const level = l.startsWith("### ") ? 3 : 2;
      const text = l.replace(/^#+\s+/, "");
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
      return { level, text, id };
    });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -80% 0px" },
    );

    toc.forEach((t) => {
      const el = document.getElementById(t.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [toc]);

  return (
    <SiteLayout>
      <Container size="wide" className="pt-10 pb-24">
        {/* 10-column grid on desktop, 4 on tablet, 1 on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-10 gap-10 lg:gap-14">
          {/* LEFT SIDEBAR (Reading Tools) */}
          <aside className="md:col-span-1 lg:col-span-2">
            <div className="sticky top-28 space-y-12">
              {/* Desktop TOC */}
              <div className="hidden md:block">
                <div className="text-[10px] uppercase tracking-widest font-semibold text-accent mb-4">
                  On This Page
                </div>
                <ul className="space-y-3 text-sm border-l border-border/70">
                  {toc.map((t) => (
                    <li key={t.id} className={t.level === 3 ? "pl-4" : ""}>
                      <a
                        href={`#${t.id}`}
                        className={`block border-l-2 -ml-[1px] pl-4 py-1 transition-colors ${activeId === t.id ? "border-accent text-foreground font-medium" : "border-transparent text-ink-soft hover:text-foreground"}`}
                      >
                        {t.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Progress & Actions */}
              <div className="hidden md:block">
                <div className="flex items-center justify-between text-[11px] font-mono text-ink-soft mb-3 uppercase tracking-wider">
                  <span>Progress</span>
                  <span className="text-foreground">{Math.round(progress * 100)}%</span>
                </div>
                <div className="h-0.5 w-full bg-secondary overflow-hidden rounded-full">
                  <div
                    className="h-full bg-accent transition-transform duration-150 ease-out origin-left"
                    style={{ transform: `scaleX(${progress})` }}
                  />
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <button
                    onClick={() => window.alert("Article saved to bookmarks!")}
                    aria-label="Save"
                    title="Save"
                    className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-ink-soft hover:border-accent hover:text-accent hover:bg-background transition-colors bg-secondary/30"
                  >
                    <Bookmark className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      window.alert("Link copied to clipboard!");
                    }}
                    aria-label="Copy Link"
                    title="Copy Link"
                    className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-ink-soft hover:border-accent hover:text-accent hover:bg-background transition-colors bg-secondary/30"
                  >
                    <LinkIcon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() =>
                      window.open(
                        `https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(window.location.href)}`,
                        "_blank",
                      )
                    }
                    aria-label="Share"
                    title="Share"
                    className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-ink-soft hover:border-accent hover:text-accent hover:bg-background transition-colors bg-secondary/30"
                  >
                    <Twitter className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => window.print()}
                    aria-label="Print"
                    title="Print"
                    className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-ink-soft hover:border-accent hover:text-accent hover:bg-background transition-colors bg-secondary/30"
                  >
                    <Printer className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Article Info */}
              <div className="hidden md:block space-y-4 text-xs">
                <div className="flex justify-between border-b border-border/50 pb-2">
                  <span className="text-ink-soft">Published</span>
                  <span className="font-medium text-foreground">
                    {formatDate(article.publishedAt)}
                  </span>
                </div>
                <div className="flex justify-between border-b border-border/50 pb-2">
                  <span className="text-ink-soft">Updated</span>
                  <span className="font-medium text-foreground">
                    {article.updatedAt
                      ? formatDate(article.updatedAt)
                      : formatDate(article.publishedAt)}
                  </span>
                </div>
                <div className="flex justify-between border-b border-border/50 pb-2">
                  <span className="text-ink-soft">Read Time</span>
                  <span className="font-medium text-foreground">{article.readingMinutes} min</span>
                </div>
              </div>
            </div>
          </aside>

          {/* MAIN ARTICLE (60%) */}
          <main className="md:col-span-3 lg:col-span-6 min-w-0">
            <article className="max-w-[720px] mx-auto">
              {/* Header */}
              <nav
                aria-label="Breadcrumb"
                className="text-[10px] uppercase tracking-widest text-ink-soft mb-6 flex flex-wrap items-center gap-2"
              >
                <Link to="/" className="hover:text-foreground">
                  Home
                </Link>
                <span>/</span>
                <Link to="/articles" className="hover:text-foreground">
                  Articles
                </Link>
                {category && (
                  <>
                    <span>/</span>
                    <Link
                      to="/categories/$slug"
                      params={{ slug: category.slug }}
                      className="hover:text-foreground"
                    >
                      {category.name}
                    </Link>
                  </>
                )}
              </nav>

              {category && (
                <div className="mb-4">
                  <Link
                    to="/categories/$slug"
                    params={{ slug: category.slug }}
                    className="text-accent text-[11px] font-semibold uppercase tracking-[0.2em] hover:underline"
                  >
                    {category.name}
                  </Link>
                </div>
              )}

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight">
                {article.title}
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-ink-soft font-display italic leading-relaxed">
                {article.subtitle}
              </p>

              <div className="mt-8 flex items-center gap-4 text-sm rule-b pb-8">
                <Link
                  to="/authors/$slug"
                  params={{ slug: author.slug }}
                  className="flex items-center gap-3 group"
                >
                  <span className="h-10 w-10 rounded-full bg-foreground text-background grid place-items-center text-sm font-medium">
                    {author.initials}
                  </span>
                  <div>
                    <span className="block font-medium group-hover:text-accent transition-colors">
                      {author.name}
                    </span>
                    <span className="block text-xs text-ink-soft">{author.role}</span>
                  </div>
                </Link>
              </div>

              {/* Hero Image */}
              <figure className="mt-10 mb-14">
                <div className="aspect-[16/9] overflow-hidden rounded-sm bg-secondary border border-border">
                  <img
                    src={article.cover}
                    alt={article.coverAlt}
                    loading="lazy"
                    className="h-full w-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <figcaption className="mt-3 text-[11px] text-ink-soft italic text-center">
                  {article.coverAlt}
                </figcaption>
              </figure>

              {/* Mobile TOC Accordion */}
              <div className="md:hidden mb-10 border border-border rounded-sm bg-secondary/10">
                <details className="group">
                  <summary className="font-medium p-4 cursor-pointer list-none flex items-center justify-between text-sm">
                    <span className="text-[10px] uppercase tracking-widest font-semibold text-accent">
                      On This Page
                    </span>
                    <span className="transition group-open:rotate-180">↓</span>
                  </summary>
                  <ul className="px-4 pb-4 space-y-3 text-sm border-t border-border pt-4">
                    {toc.map((t) => (
                      <li key={t.id} className={t.level === 3 ? "pl-4" : ""}>
                        <a href={`#${t.id}`} className="text-ink-soft hover:text-foreground block">
                          {t.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </details>
              </div>

              {/* Markdown Content */}
              <div className="prose-editorial max-w-none">
                <p className="font-display text-2xl leading-[1.4] mb-8">
                  <span className="float-left font-display text-6xl leading-[0.85] mr-3 mt-1 text-accent">
                    {article.body.trim()[0]}
                  </span>
                  {article.body.trim().slice(1).split("\n\n")[0]}
                </p>
                {article.body
                  .split("\n\n")
                  .slice(1)
                  .map((block: string, i: number) => {
                    const trimmed = block.trim();
                    if (trimmed.startsWith("## ")) {
                      const text = trimmed.slice(3);
                      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
                      return (
                        <h2 key={i} id={id} className="scroll-mt-32">
                          {text}
                        </h2>
                      );
                    }
                    if (trimmed.startsWith("### ")) {
                      const text = trimmed.slice(4);
                      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
                      return (
                        <h3 key={i} id={id} className="scroll-mt-32">
                          {text}
                        </h3>
                      );
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
                          {items.map((it: string, j: number) => (
                            <li key={j}>{it}</li>
                          ))}
                        </ul>
                      );
                    }
                    return <p key={i}>{trimmed}</p>;
                  })}

                <aside className="not-prose my-14 border-l-2 border-accent bg-secondary/30 p-6 sm:p-8 rounded-r-sm">
                  <div className="eyebrow mb-2">A note from the editor</div>
                  <p className="font-display text-lg italic leading-snug text-foreground">
                    If this piece stayed with you, consider forwarding it to one person who might
                    feel the same. Word of mouth is how we grow.
                  </p>
                </aside>
              </div>

              {/* FAQ Section */}
              <ArticleFAQ faqs={article.faqs} />

              {/* Prev / Next Article */}
              <div className="mt-16 rule-t pt-8 grid grid-cols-2 gap-6">
                {prev && (
                  <Link to="/articles/$slug" params={{ slug: prev.slug }} className="group">
                    <div className="text-[10px] uppercase tracking-widest font-semibold text-accent mb-2">
                      ← Previous
                    </div>
                    <div className="font-display sm:text-xl leading-tight group-hover:text-accent transition-colors">
                      {prev.title}
                    </div>
                  </Link>
                )}
                {next && (
                  <Link
                    to="/articles/$slug"
                    params={{ slug: next.slug }}
                    className="group text-right col-start-2"
                  >
                    <div className="text-[10px] uppercase tracking-widest font-semibold text-accent mb-2">
                      Next →
                    </div>
                    <div className="font-display sm:text-xl leading-tight group-hover:text-accent transition-colors">
                      {next.title}
                    </div>
                  </Link>
                )}
              </div>
            </article>
          </main>

          {/* RIGHT SIDEBAR (Knowledge Hub - 20%) */}
          <aside className="hidden lg:block lg:col-span-2">
            <div className="sticky top-28 space-y-12">
              {/* Related Articles */}
              <div>
                <div className="text-[10px] uppercase tracking-widest font-semibold text-accent mb-5">
                  Related Reads
                </div>
                <div className="space-y-5">
                  {related.slice(0, 4).map((a) => (
                    <Link
                      key={a.slug}
                      to="/articles/$slug"
                      params={{ slug: a.slug }}
                      className="group flex gap-4 items-center"
                    >
                      <div className="w-14 h-14 shrink-0 rounded-sm overflow-hidden bg-secondary border border-border">
                        <img
                          src={a.cover}
                          alt=""
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-display leading-tight group-hover:text-accent transition-colors line-clamp-2 text-sm">
                          {a.title}
                        </h4>
                        <div className="text-[10px] font-mono text-ink-soft mt-1.5 uppercase tracking-wider">
                          {a.readingMinutes} min read
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Featured Author */}
              <div>
                <div className="text-[10px] uppercase tracking-widest font-semibold text-accent mb-4">
                  The Author
                </div>
                <div className="p-5 border border-border bg-secondary/20 rounded-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-foreground text-background grid place-items-center text-sm font-medium">
                      {author.initials}
                    </div>
                    <div>
                      <div className="font-display font-medium leading-tight">{author.name}</div>
                      <div className="text-[10px] uppercase tracking-widest text-ink-soft mt-0.5">
                        {author.role}
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-ink-soft leading-relaxed mb-4 line-clamp-3">
                    {author.bio}
                  </p>
                  <Link
                    to="/authors/$slug"
                    params={{ slug: author.slug }}
                    className="text-xs font-semibold text-accent hover:underline"
                  >
                    View All Articles →
                  </Link>
                </div>
              </div>

              {/* Popular Topics */}
              <div>
                <div className="text-[10px] uppercase tracking-widest font-semibold text-accent mb-4">
                  Popular Topics
                </div>
                <div className="flex flex-wrap gap-2">
                  {popularTopics.slice(0, 7).map((t) => (
                    <Link
                      key={t.slug}
                      to="/categories/$slug"
                      params={{ slug: t.slug }}
                      className="text-[11px] font-medium px-3 py-1.5 border border-border rounded-full hover:border-accent hover:text-accent transition-colors bg-background"
                    >
                      {t.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </Container>

      {/* Mobile/Tablet Knowledge Hub (below article) */}
      <Container size="wide" className="lg:hidden pb-16">
        <div className="grid sm:grid-cols-2 gap-10 rule-t pt-12">
          {/* Related Articles */}
          <div>
            <div className="text-[10px] uppercase tracking-widest font-semibold text-accent mb-5">
              Related Reads
            </div>
            <div className="space-y-5">
              {related.slice(0, 4).map((a) => (
                <Link
                  key={a.slug}
                  to="/articles/$slug"
                  params={{ slug: a.slug }}
                  className="group flex gap-4 items-center"
                >
                  <div className="w-16 h-16 shrink-0 rounded-sm overflow-hidden bg-secondary border border-border">
                    <img
                      src={a.cover}
                      alt=""
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-display leading-tight group-hover:text-accent transition-colors line-clamp-2">
                      {a.title}
                    </h4>
                    <div className="text-[10px] font-mono text-ink-soft mt-1.5 uppercase tracking-wider">
                      {a.readingMinutes} min read
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-10">
            {/* Featured Author */}
            <div>
              <div className="text-[10px] uppercase tracking-widest font-semibold text-accent mb-4">
                The Author
              </div>
              <div className="p-6 border border-border bg-secondary/20 rounded-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-foreground text-background grid place-items-center text-base font-medium">
                    {author.initials}
                  </div>
                  <div>
                    <div className="font-display font-medium text-lg leading-tight">
                      {author.name}
                    </div>
                    <div className="text-[10px] uppercase tracking-widest text-ink-soft mt-0.5">
                      {author.role}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-ink-soft leading-relaxed mb-4">{author.bio}</p>
                <Link
                  to="/authors/$slug"
                  params={{ slug: author.slug }}
                  className="text-xs font-semibold text-accent hover:underline"
                >
                  View All Articles →
                </Link>
              </div>
            </div>

            {/* Popular Topics */}
            <div>
              <div className="text-[10px] uppercase tracking-widest font-semibold text-accent mb-4">
                Popular Topics
              </div>
              <div className="flex flex-wrap gap-2">
                {popularTopics.map((t) => (
                  <Link
                    key={t.slug}
                    to="/categories/$slug"
                    params={{ slug: t.slug }}
                    className="text-xs font-medium px-3 py-1.5 border border-border rounded-full hover:border-accent hover:text-accent transition-colors bg-background"
                  >
                    {t.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Newsletter */}
    </SiteLayout>
  );
}
