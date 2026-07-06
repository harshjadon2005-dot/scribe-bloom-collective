import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Container } from "@/components/site/Container";
import { ArticleVertical, ArticleCompact } from "@/components/site/ArticleCard";
import { Newsletter } from "@/components/site/Newsletter";
import { articles } from "@/data/articles";

export const Route = createFileRoute("/trending")({
  component: Trending,
  head: () => ({
    meta: [
      { title: "Trending — Lordiphosa" },
      { name: "description", content: "The most-read technology, AI, and engineering stories on Lordiphosa this week." },
      { property: "og:title", content: "Trending — Lordiphosa" },
      { property: "og:url", content: "/trending" },
    ],
    links: [{ rel: "canonical", href: "/trending" }],
  }),
});

function Trending() {
  const trending = articles.filter((a) => a.trending);
  const leaderboard = [...articles].sort((a, b) => b.readingMinutes - a.readingMinutes).slice(0, 6);

  return (
    <SiteLayout>
      <Container size="wide" className="pt-16 pb-10">
        <div className="eyebrow">What people are reading now</div>
        <h1 className="mt-4 font-display text-5xl sm:text-7xl leading-[0.95] tracking-tight max-w-3xl">
          Trending this week.
        </h1>
        <p className="mt-6 text-lg text-ink-soft max-w-xl leading-relaxed">
          The stories our readers are sharing, saving, and returning to — updated every few hours.
        </p>
      </Container>

      <Container size="wide" className="pb-24 rule-t pt-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
          {trending.map((a) => (
            <ArticleVertical key={a.slug} article={a} />
          ))}
        </div>
      </Container>

      <div className="bg-secondary/40 rule-t rule-b">
        <Container size="wide" className="py-20">
          <div className="mb-8">
            <div className="eyebrow">Most read this month</div>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl">The leaderboard</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-x-12">
            {leaderboard.map((a, i) => (
              <ArticleCompact key={a.slug} article={a} index={i} />
            ))}
          </div>
        </Container>
      </div>

      <Newsletter />
    </SiteLayout>
  );
}
