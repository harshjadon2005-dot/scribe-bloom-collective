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
import { articles, authors, categories, getAuthor } from "@/data/articles";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const featured = articles.find((a) => a.featured) ?? articles[0];
  const trending = articles.filter((a) => a.trending && a.slug !== featured.slug).slice(0, 4);
  const latest = articles.filter((a) => a.slug !== featured.slug).slice(0, 4);
  const editorsPicks = articles.filter((a) => a.editorsPick && a.slug !== featured.slug).slice(0, 3);
  const continueReading = articles.slice(-3);

  return (
    <SiteLayout>
      {/* Ticker */}
      <div className="rule-b bg-secondary/40">
        <Container size="wide">
          <div className="flex items-center gap-6 py-2.5 text-[11px] uppercase tracking-[0.18em] text-ink-soft overflow-hidden">
            <span className="text-accent font-semibold">Issue №14</span>
            <span aria-hidden>·</span>
            <span className="hidden sm:inline">Updated 3 hours ago</span>
            <span aria-hidden className="hidden sm:inline">·</span>
            <span className="truncate">
              New this week — <em className="not-italic text-foreground">The Future of AI Agents in 2026</em> by Elena Marchetti
            </span>
          </div>
        </Container>
      </div>

      {/* Masthead */}
      <Container size="wide" className="pt-14 pb-10">
        <div className="flex flex-col items-center text-center">
          <div className="eyebrow">A publication for modern knowledge</div>
          <h1 className="mt-4 font-display font-medium text-[13vw] sm:text-[10vw] lg:text-[9rem] leading-[0.85] tracking-[-0.03em]">
            Lordiphosa
          </h1>
          <div className="mt-6 flex items-center gap-5 text-xs font-mono text-ink-soft">
            <span>Vol. II</span>
            <span aria-hidden>❋</span>
            <span>{new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</span>
            <span aria-hidden>❋</span>
            <span>AI · Engineering · Startups</span>
          </div>
        </div>
      </Container>

      {/* Featured hero */}
      <Container size="wide" className="mt-6 pb-24 rule-t pt-16">
        <ArticleFeatured article={featured} />
      </Container>

      {/* Today's top stories — asymmetric 2/1 */}
      <Container size="wide" className="pb-24">
        <SectionHeader eyebrow="Today's top stories" title="What's driving the industry" href="/articles" />
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
          <SectionHeader eyebrow="The wire, freshly filed" title="Latest articles" href="/articles" />
          <div className="grid lg:grid-cols-12 gap-14">
            <div className="lg:col-span-8">
              {latest.map((a) => (
                <ArticleRow key={a.slug} article={a} />
              ))}
            </div>
            <aside className="lg:col-span-4">
              <div className="eyebrow mb-6">From the editor's desk</div>
              <blockquote className="font-display text-2xl leading-[1.3] tracking-tight">
                "We are not interested in being first to a headline. We are interested in being right, and in explaining why it matters."
              </blockquote>
              <div className="mt-6 text-sm text-ink-soft">
                — Elena Marchetti, Editor-in-Chief
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
        <SectionHeader eyebrow="Handpicked by the editors" title="Editor's picks" href="/articles" />
        <div className="grid md:grid-cols-3 gap-10">
          {editorsPicks.map((a) => (
            <ArticleVertical key={a.slug} article={a} />
          ))}
        </div>
      </Container>

      {/* Categories */}
      <Container size="wide" className="pb-24">
        <SectionHeader eyebrow="Find your rabbit hole" title="Browse by subject" href="/categories" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-px bg-border rule-t rule-b">
          {categories.map((c) => (
            <Link
              key={c.slug}
              to="/categories/$slug"
              params={{ slug: c.slug }}
              className="bg-background p-6 hover:bg-secondary transition-colors group"
            >
              <div className="font-display text-xl leading-tight group-hover:text-accent transition-colors">
                {c.name}
              </div>
              <div className="mt-2 text-xs text-ink-soft font-mono tabular-nums">
                {c.articleCount} articles
              </div>
            </Link>
          ))}
        </div>
      </Container>

      {/* Featured collection — landscape */}
      <Container size="wide" className="pb-24">
        <SectionHeader eyebrow="A collection worth your Sunday" title="On the future of AI" />
        <div className="grid gap-16">
          {articles.filter((a) => a.category === "artificial-intelligence").slice(0, 2).map((a) => (
            <ArticleLandscape key={a.slug} article={a} />
          ))}
        </div>
      </Container>

      {/* Featured authors */}
      <div className="bg-secondary/40 rule-t rule-b">
        <Container size="wide" className="py-20">
          <SectionHeader eyebrow="Verified writers" title="Featured authors" href="/authors" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {authors.map((a) => (
              <Link
                key={a.slug}
                to="/authors/$slug"
                params={{ slug: a.slug }}
                className="group"
              >
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-full bg-foreground text-background grid place-items-center font-display text-base">
                    {a.initials}
                  </div>
                  <div>
                    <div className="font-display text-lg leading-tight group-hover:text-accent transition-colors">
                      {a.name}
                    </div>
                    <div className="text-[10px] uppercase tracking-widest text-ink-soft mt-1">
                      {a.role}
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-sm text-ink-soft leading-relaxed line-clamp-3">
                  {a.bio}
                </p>
              </Link>
            ))}
          </div>
        </Container>
      </div>

      {/* Continue reading */}
      <Container size="wide" className="py-24">
        <SectionHeader eyebrow="Recommended for you" title="Continue reading" href="/articles" />
        <div className="grid lg:grid-cols-3 gap-10">
          {continueReading.map((a) => {
            const author = getAuthor(a.authorSlug);
            return (
              <Link
                key={a.slug}
                to="/articles/$slug"
                params={{ slug: a.slug }}
                className="group flex flex-col rule-t pt-6"
              >
                <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.18em] text-ink-soft">
                  <span className="text-accent font-semibold">Recently updated</span>
                  <span aria-hidden>·</span>
                  <span>{a.readingMinutes} min</span>
                </div>
                <h3 className="mt-3 font-display text-2xl leading-[1.15] tracking-tight group-hover:text-accent transition-colors">
                  {a.title}
                </h3>
                <p className="mt-3 text-sm text-ink-soft leading-relaxed line-clamp-2">
                  {a.excerpt}
                </p>
                <div className="mt-4 text-xs text-ink-soft">
                  {author?.name} · {author?.role}
                </div>
              </Link>
            );
          })}
        </div>
      </Container>

      {/* Popular topics tag cloud */}
      <Container size="wide" className="pb-24">
        <SectionHeader eyebrow="Popular topics" title="What readers are following" href="/topics" />
        <div className="flex flex-wrap gap-x-6 gap-y-3 font-display">
          {[
            ["ai agents", 8], ["llms", 7], ["edge", 5], ["security", 6],
            ["frontend", 4], ["semiconductors", 3], ["startups", 6], ["open source", 5],
            ["cloud", 4], ["engineering", 7], ["research", 3], ["b2b", 2],
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
