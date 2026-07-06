import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Container } from "@/components/site/Container";
import { articles, articlesByCategory, categories } from "@/data/articles";

export const Route = createFileRoute("/categories")({
  component: CategoriesIndex,
  head: () => ({
    meta: [
      { title: "Categories — Lordiphosa" },
      { name: "description", content: "Browse Lordiphosa by subject: essays, craft, guides, interviews, and more." },
      { property: "og:title", content: "Categories — Lordiphosa" },
      { property: "og:url", content: "/categories" },
    ],
    links: [{ rel: "canonical", href: "/categories" }],
  }),
});

function CategoriesIndex() {
  return (
    <SiteLayout>
      <Container size="wide" className="pt-16 pb-8">
        <div className="eyebrow">Subjects</div>
        <h1 className="mt-4 font-display text-5xl sm:text-7xl leading-[0.95] tracking-tight max-w-3xl">
          Six ways in.
        </h1>
        <p className="mt-6 text-lg text-ink-soft max-w-xl leading-relaxed">
          We organize the work into six standing subjects. Each has its own quiet logic. Pick one and follow it.
        </p>
      </Container>

      <Container size="wide" className="pb-24">
        <div className="rule-t">
          {categories.map((c, i) => {
            const count = articlesByCategory(c.slug).length || c.articleCount;
            const latest = articles.find((a) => a.category === c.slug);
            return (
              <Link
                key={c.slug}
                to="/categories/$slug"
                params={{ slug: c.slug }}
                className="group grid grid-cols-[auto_1fr_auto] sm:grid-cols-12 gap-6 sm:gap-10 items-center py-10 rule-b"
              >
                <div className="sm:col-span-1 font-mono text-sm text-ink-soft tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="sm:col-span-5">
                  <div className="font-display text-4xl sm:text-5xl tracking-tight group-hover:text-accent transition-colors">
                    {c.name}
                  </div>
                </div>
                <div className="hidden sm:block sm:col-span-4 text-ink-soft leading-relaxed">
                  {c.description}
                </div>
                <div className="sm:col-span-2 text-right">
                  <div className="font-mono text-sm tabular-nums">{count}</div>
                  <div className="text-[10px] uppercase tracking-widest text-ink-soft">pieces</div>
                  {latest && (
                    <div className="hidden sm:block mt-2 text-xs text-ink-soft italic truncate max-w-[200px] ml-auto">
                      Latest: {latest.title}
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </SiteLayout>
  );
}