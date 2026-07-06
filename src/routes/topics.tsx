import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Container } from "@/components/site/Container";
import { Newsletter } from "@/components/site/Newsletter";
import { articles, categories } from "@/data/articles";

export const Route = createFileRoute("/topics")({
  component: Topics,
  head: () => ({
    meta: [
      { title: "Topics — Lordiphosa" },
      { name: "description", content: "Browse every topic covered on Lordiphosa — from AI agents and cybersecurity to semiconductors and startups." },
      { property: "og:title", content: "Topics — Lordiphosa" },
      { property: "og:url", content: "/topics" },
    ],
    links: [{ rel: "canonical", href: "/topics" }],
  }),
});

function Topics() {
  const tagCounts = new Map<string, number>();
  for (const a of articles) {
    for (const t of a.tags) tagCounts.set(t, (tagCounts.get(t) ?? 0) + 1);
  }
  const tags = Array.from(tagCounts.entries()).sort((a, b) => b[1] - a[1]);

  return (
    <SiteLayout>
      <Container size="wide" className="pt-16 pb-10">
        <div className="eyebrow">Explore by subject</div>
        <h1 className="mt-4 font-display text-5xl sm:text-7xl leading-[0.95] tracking-tight max-w-3xl">
          Every topic we follow.
        </h1>
        <p className="mt-6 text-lg text-ink-soft max-w-xl leading-relaxed">
          From frontier models and edge infrastructure to security, startups, and the hardware underneath it all.
        </p>
      </Container>

      <Container size="wide" className="pb-20 rule-t pt-12">
        <div className="eyebrow mb-6">Featured topics</div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border rule-t rule-b">
          {categories.map((c) => (
            <Link
              key={c.slug}
              to="/categories/$slug"
              params={{ slug: c.slug }}
              className="bg-background p-8 hover:bg-secondary transition-colors group"
            >
              <div className="font-display text-2xl leading-tight group-hover:text-accent transition-colors">
                {c.name}
              </div>
              <p className="mt-2 text-sm text-ink-soft leading-relaxed line-clamp-2">
                {c.description}
              </p>
              <div className="mt-4 text-xs text-ink-soft font-mono tabular-nums">
                {c.articleCount} articles
              </div>
            </Link>
          ))}
        </div>
      </Container>

      <Container size="wide" className="pb-24">
        <div className="eyebrow mb-6">In circulation</div>
        <div className="flex flex-wrap gap-x-6 gap-y-3 font-display">
          {tags.map(([tag, n]) => (
            <span
              key={tag}
              className="hover:text-accent transition-colors cursor-pointer"
              style={{ fontSize: `${1 + n * 0.12}rem` }}
            >
              {tag}
              <sup className="text-[10px] font-sans font-normal text-ink-soft ml-0.5">{n}</sup>
            </span>
          ))}
        </div>
      </Container>

      <Newsletter />
    </SiteLayout>
  );
}
