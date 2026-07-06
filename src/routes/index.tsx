import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Container, SectionHeader } from "@/components/site/Container";
import { Newsletter } from "@/components/site/Newsletter";
import {
  ArticleFeatured,
  ArticleLandscape,
  ArticleVertical,
  ArticleCompact,
  ArticleRow,
} from "@/components/site/ArticleCard";
import { articles, categories } from "@/data/articles";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const featured = articles.find((a) => a.featured) ?? articles[0];
  const trending = articles.filter((a) => a.trending).slice(0, 4);
  const latest = articles.filter((a) => a.slug !== featured.slug).slice(0, 4);
  const editorsPicks = articles.filter((a) => a.editorsPick && a.slug !== featured.slug).slice(0, 3);

  return (
    <SiteLayout>
      {/* Ticker */}
      <div className="rule-b bg-secondary/40">
        <Container size="wide">
          <div className="flex items-center gap-6 py-2.5 text-[11px] uppercase tracking-[0.18em] text-ink-soft overflow-hidden">
            <span className="text-accent font-semibold">Issue №14</span>
            <span aria-hidden>·</span>
            <span className="hidden sm:inline">Summer 2026</span>
            <span aria-hidden className="hidden sm:inline">·</span>
            <span className="truncate">New this week — <em className="not-italic text-foreground">The Long Middle</em> by Elena Marchetti</span>
          </div>
        </Container>
      </div>

      {/* Masthead */}
      <Container size="wide" className="pt-14 pb-10">
        <div className="flex flex-col items-center text-center">
          <div className="eyebrow">A publication for the curious</div>
          <h1 className="mt-4 font-display font-medium text-[13vw] sm:text-[10vw] lg:text-[9rem] leading-[0.85] tracking-[-0.03em]">
            Lordiphosa
          </h1>
          <div className="mt-6 flex items-center gap-5 text-xs font-mono text-ink-soft">
            <span>Vol. II</span>
            <span aria-hidden>❋</span>
            <span>{new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</span>
            <span aria-hidden>❋</span>
            <span>Free to read</span>
          </div>
        </div>
      </Container>

      {/* Featured hero */}
      <Container size="wide" className="mt-6 pb-24 rule-t pt-16">
        <ArticleFeatured article={featured} />
      </Container>

      {/* Trending — asymmetric 2/1 */}
      <Container size="wide" className="pb-24">
        <SectionHeader eyebrow="What people are reading" title="Trending this week" href="/articles" />
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14">
          <div className="lg:col-span-8 grid sm:grid-cols-2 gap-10">
            {trending.slice(0, 2).map((a) => (
              <ArticleVertical key={a.slug} article={a} />
            ))}
          </div>
          <aside className="lg:col-span-4">
            <div className="eyebrow mb-4" style={{ color: "var(--ink-soft)" }}>Most read</div>
            {trending.map((a, i) => (
              <ArticleCompact key={a.slug} article={a} index={i} />
            ))}
          </aside>
        </div>
      </Container>

      {/* Latest — list */}
      <div className="bg-secondary/40 rule-t rule-b">
        <Container size="wide" className="py-24">
          <SectionHeader eyebrow="The archive, freshly stocked" title="Latest dispatches" href="/articles" />
          <div className="grid lg:grid-cols-12 gap-14">
            <div className="lg:col-span-8">
              {latest.map((a) => (
                <ArticleRow key={a.slug} article={a} />
              ))}
            </div>
            <aside className="lg:col-span-4">
              <div className="eyebrow mb-6">From the editor's desk</div>
              <blockquote className="font-display text-2xl leading-[1.3] tracking-tight">
                "We are not interested in being first. We are interested in being right, and in being kind."
              </blockquote>
              <div className="mt-6 text-sm text-ink-soft">
                — Elena Marchetti, in the founding letter
              </div>
              <Link
                to="/about"
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium border-b border-accent pb-1 hover:gap-3 transition-all"
              >
                Read the letter <span aria-hidden>→</span>
              </Link>
            </aside>
          </div>
        </Container>
      </div>

      {/* Editor's picks */}
      <Container size="wide" className="py-24">
        <SectionHeader eyebrow="Handpicked" title="Editor's picks" href="/articles" />
        <div className="grid md:grid-cols-3 gap-10">
          {editorsPicks.map((a) => (
            <ArticleVertical key={a.slug} article={a} />
          ))}
        </div>
      </Container>

      {/* Categories */}
      <Container size="wide" className="pb-24">
        <SectionHeader eyebrow="Find your rabbit hole" title="Browse by subject" href="/categories" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-border rule-t rule-b">
          {categories.map((c) => (
            <Link
              key={c.slug}
              to="/categories/$slug"
              params={{ slug: c.slug }}
              className="bg-background p-6 hover:bg-secondary transition-colors group"
            >
              <div className="font-display text-2xl leading-tight group-hover:text-accent transition-colors">
                {c.name}
              </div>
              <div className="mt-2 text-xs text-ink-soft font-mono tabular-nums">
                {c.articleCount} pieces
              </div>
            </Link>
          ))}
        </div>
      </Container>

      {/* Featured collection — landscape article */}
      <Container size="wide" className="pb-24">
        <SectionHeader eyebrow="A collection worth your Sunday" title="On slow work" />
        <div className="grid gap-16">
          {articles.slice(3, 5).map((a) => (
            <ArticleLandscape key={a.slug} article={a} />
          ))}
        </div>
      </Container>

      {/* Popular topics tag cloud */}
      <Container size="wide" className="pb-24">
        <SectionHeader eyebrow="In circulation" title="Popular topics" />
        <div className="flex flex-wrap gap-x-6 gap-y-3 font-display">
          {[
            ["craft", 4], ["writing", 6], ["typography", 3], ["design", 8],
            ["engineering", 5], ["books", 4], ["interviews", 2], ["attention", 3],
            ["process", 7], ["editorial", 2], ["product", 5], ["rituals", 2],
          ].map(([tag, n], i) => (
            <span
              key={i}
              className="hover:text-accent transition-colors cursor-pointer"
              style={{ fontSize: `${1 + Number(n) * 0.08}rem` }}
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
