import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Container } from "@/components/site/Container";
import { ArticleRow } from "@/components/site/ArticleCard";
import { categories } from "@/data/articles";
import { Search as SearchIcon } from "lucide-react";
import { getArticles } from "@/api";

export const Route = createFileRoute("/search")({
  component: SearchPage,
  head: () => ({
    meta: [
      { title: "Search — Lordiphosa" },
      { name: "description", content: "Search the Lordiphosa archive." },
      { name: "robots", content: "noindex" },
    ],
  }),
  loader: async () => {
    const articles = await getArticles();
    return { articles };
  },
});

const recent = ["slow work", "typography", "morning pages"];

function SearchPage() {
  const { articles } = Route.useLoaderData();
  const [q, setQ] = useState("");
  const results = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return [];
    return articles.filter((a) =>
      [a.title, a.subtitle, a.excerpt, ...a.tags].some((s) => s.toLowerCase().includes(t)),
    );
  }, [q]);

  return (
    <SiteLayout>
      <Container size="wide" className="pt-16 pb-8">
        <div className="eyebrow">Search</div>
        <h1 className="mt-4 font-display text-5xl sm:text-7xl leading-[0.95] tracking-tight">
          Find something worth your afternoon.
        </h1>

        <div className="mt-10 flex items-center gap-4 rule-b border-foreground pb-3">
          <SearchIcon className="h-6 w-6 text-ink-soft" />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search essays, guides, tags…"
            className="flex-1 bg-transparent outline-none text-2xl sm:text-3xl font-display placeholder:text-ink-soft/50"
          />
          {q && (
            <button
              onClick={() => setQ("")}
              className="text-sm text-ink-soft hover:text-foreground"
            >
              Clear
            </button>
          )}
        </div>
      </Container>

      <Container size="wide" className="pb-24">
        {!q ? (
          <div className="grid md:grid-cols-2 gap-14 mt-16">
            <div>
              <div className="eyebrow mb-4" style={{ color: "var(--ink-soft)" }}>
                Recent searches
              </div>
              <ul className="space-y-3">
                {recent.map((r) => (
                  <li key={r}>
                    <button
                      onClick={() => setQ(r)}
                      className="font-display text-2xl hover:text-accent transition-colors"
                    >
                      {r}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="eyebrow mb-4" style={{ color: "var(--ink-soft)" }}>
                Popular topics
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((c) => (
                  <Link
                    key={c.slug}
                    to="/categories/$slug"
                    params={{ slug: c.slug }}
                    className="text-sm px-4 py-2 border border-border rounded-full hover:border-accent hover:text-accent transition-colors"
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ) : results.length === 0 ? (
          <div className="py-24 text-center">
            <div className="eyebrow">No results</div>
            <h2 className="mt-3 font-display text-4xl">Nothing matched "{q}".</h2>
            <p className="mt-3 text-ink-soft">Try a shorter query, or browse by subject.</p>
            <Link to="/categories" className="mt-6 inline-block border-b border-accent pb-1">
              Browse categories
            </Link>
          </div>
        ) : (
          <div className="mt-10">
            <div className="text-sm text-ink-soft mb-4">
              {results.length} result{results.length === 1 ? "" : "s"}
            </div>
            <div className="max-w-4xl">
              {results.map((a) => (
                <ArticleRow key={a.slug} article={a} />
              ))}
            </div>
          </div>
        )}
      </Container>
    </SiteLayout>
  );
}
