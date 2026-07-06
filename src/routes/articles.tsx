import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Container } from "@/components/site/Container";
import { ArticleVertical, ArticleRow, ArticleLandscape } from "@/components/site/ArticleCard";
import { articles, categories } from "@/data/articles";
import { Newsletter } from "@/components/site/Newsletter";
import { LayoutGrid, List } from "lucide-react";

export const Route = createFileRoute("/articles")({
  component: ArticlesIndex,
  head: () => ({
    meta: [
      { title: "Articles — Lordiphosa" },
      { name: "description", content: "Every essay, guide, interview, and field note published by Lordiphosa." },
      { property: "og:title", content: "Articles — Lordiphosa" },
      { property: "og:url", content: "/articles" },
    ],
    links: [{ rel: "canonical", href: "/articles" }],
  }),
});

function ArticlesIndex() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [cat, setCat] = useState<string>("all");
  const [sort, setSort] = useState<"newest" | "oldest" | "reading">("newest");

  const filtered = articles
    .filter((a) => (cat === "all" ? true : a.category === cat))
    .sort((a, b) => {
      if (sort === "newest") return +new Date(b.publishedAt) - +new Date(a.publishedAt);
      if (sort === "oldest") return +new Date(a.publishedAt) - +new Date(b.publishedAt);
      return b.readingMinutes - a.readingMinutes;
    });

  const feature = filtered[0];
  const rest = filtered.slice(1);

  return (
    <SiteLayout>
      {/* Page head */}
      <Container size="wide" className="pt-16 pb-10">
        <div className="eyebrow">The Library</div>
        <h1 className="mt-4 font-display text-5xl sm:text-7xl leading-[0.95] tracking-tight max-w-3xl">
          Every piece we have ever published.
        </h1>
        <p className="mt-6 text-lg text-ink-soft max-w-xl leading-relaxed">
          {articles.length} essays, guides, interviews and field notes across {categories.length} subjects. Sorted, filtered, and open.
        </p>
      </Container>

      {/* Featured story */}
      {feature && (
        <Container size="wide" className="pb-16 rule-t pt-12">
          <ArticleLandscape article={feature} />
        </Container>
      )}

      {/* Filter bar */}
      <div className="sticky top-16 z-30 bg-background/90 backdrop-blur rule-t rule-b">
        <Container size="wide">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 py-3">
            <div className="flex flex-wrap items-center gap-1 text-sm">
              <button
                onClick={() => setCat("all")}
                className={`px-3 py-1.5 rounded-full transition-colors ${cat === "all" ? "bg-foreground text-background" : "hover:bg-secondary"}`}
              >
                All
              </button>
              {categories.map((c) => (
                <button
                  key={c.slug}
                  onClick={() => setCat(c.slug)}
                  className={`px-3 py-1.5 rounded-full transition-colors ${cat === c.slug ? "bg-foreground text-background" : "hover:bg-secondary"}`}
                >
                  {c.name}
                </button>
              ))}
            </div>
            <div className="ml-auto flex items-center gap-4">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as typeof sort)}
                className="text-sm bg-transparent border-none outline-none cursor-pointer"
              >
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
                <option value="reading">Longest reads</option>
              </select>
              <div className="flex items-center rule-t rule-b border-l border-r border-border">
                <button
                  onClick={() => setView("grid")}
                  aria-label="Grid view"
                  className={`p-2 ${view === "grid" ? "bg-secondary" : ""}`}
                >
                  <LayoutGrid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setView("list")}
                  aria-label="List view"
                  className={`p-2 border-l border-border ${view === "list" ? "bg-secondary" : ""}`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Grid / List */}
      <Container size="wide" className="py-16">
        {rest.length === 0 ? (
          <div className="py-32 text-center">
            <div className="font-display text-3xl">Nothing here yet.</div>
            <p className="mt-2 text-ink-soft">Try a different subject.</p>
          </div>
        ) : view === "grid" ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
            {rest.map((a) => (
              <ArticleVertical key={a.slug} article={a} />
            ))}
          </div>
        ) : (
          <div className="max-w-4xl">
            {rest.map((a) => (
              <ArticleRow key={a.slug} article={a} />
            ))}
          </div>
        )}

        {/* Pagination */}
        <nav className="mt-20 flex items-center justify-between rule-t pt-6 text-sm">
          <button className="text-ink-soft cursor-not-allowed" disabled>← Previous</button>
          <div className="flex gap-2 font-mono">
            <span className="px-3 py-1 bg-foreground text-background rounded-full">1</span>
            <Link to="/articles" className="px-3 py-1 hover:bg-secondary rounded-full">2</Link>
            <Link to="/articles" className="px-3 py-1 hover:bg-secondary rounded-full">3</Link>
            <span className="px-3 py-1 text-ink-soft">…</span>
            <Link to="/articles" className="px-3 py-1 hover:bg-secondary rounded-full">7</Link>
          </div>
          <Link to="/articles" className="hover:text-accent transition-colors">Next →</Link>
        </nav>
      </Container>

      <Newsletter />
    </SiteLayout>
  );
}