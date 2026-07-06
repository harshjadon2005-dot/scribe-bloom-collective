import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Container, SectionHeader } from "@/components/site/Container";

import {
  ArticleFeatured,
  ArticleLandscape,
  ArticleVertical,
  ArticleCompact,
  ArticleRow,
} from "@/components/site/ArticleCard";
import { TrendingUp, Flame, BookOpen, Compass, PenTool } from "lucide-react";
import { getArticles, getFeaturedArticle, getAuthors, getTopics } from "@/api";
import { popularTopics } from "@/data/articles"; // keeping static popular topics for now or we could move it

export const Route = createFileRoute("/")({
  loader: async () => {
    const featured = await getFeaturedArticle();
    const trending = await getArticles({
      data: { trending: true, limit: 4, excludeSlug: featured.slug },
    });
    const latest = await getArticles({
      data: { sort: "newest", limit: 4, excludeSlug: featured.slug },
    });
    const editorsPicks = await getArticles({
      data: { editorsPick: true, limit: 3, excludeSlug: featured.slug },
    });
    const allArticles = await getArticles();
    const continueReading = allArticles.slice(-3);
    const authors = await getAuthors();
    const categories = await getTopics();

    return {
      featured,
      trending,
      latest,
      editorsPicks,
      continueReading,
      stats: {
        articles: allArticles.length,
        authors: authors.length,
        categories: categories.length,
      },
      allArticles,
      authors,
      categories,
    };
  },
  component: Index,
});

const tickerHeadlines = [
  { title: "The Future of AI Agents in 2026", link: "/articles" },
  { title: "NVIDIA's Next Generation AI Chips Explained", link: "/articles" },
  { title: "Cybersecurity Trends Every Developer Should Know", link: "/articles" },
  { title: "Inside the Rise of Open Source AI", link: "/articles" },
  { title: "Building Scalable React Applications", link: "/articles" },
  { title: "Why Edge Computing Is Becoming Essential", link: "/articles" },
  { title: "India's Semiconductor Industry in 2026", link: "/articles" },
  { title: "Modern Cloud Infrastructure Best Practices", link: "/articles" },
  { title: "The Evolution of AI Coding Assistants", link: "/articles" },
  { title: "Future of Robotics in Manufacturing", link: "/articles" },
];

function Index() {
  const {
    featured,
    trending,
    latest,
    editorsPicks,
    continueReading,
    stats,
    allArticles,
    authors,
    categories,
  } = Route.useLoaderData();

  const articlesByAuthor = (slug: string) => allArticles.filter((a) => a.authorSlug === slug);
  const articlesByCategory = (slug: string) => allArticles.filter((a) => a.category === slug);
  const getAuthor = (slug: string) => authors.find((a) => a.slug === slug);
  const articles = allArticles;

  return (
    <SiteLayout>
      {/* Ticker */}
      <div className="rule-b bg-secondary/40 hover-pause relative border-b border-border">
        <Container size="wide" className="px-0 md:px-6">
          <div className="flex items-center text-[11px] uppercase tracking-[0.18em] text-ink-soft h-11 overflow-hidden">
            {/* Left Fixed Section */}
            <div
              className="shrink-0 flex items-center h-full px-4 md:px-0 md:pr-6 bg-secondary/40 relative z-10 
                            after:absolute after:inset-y-0 after:-right-8 after:w-8 after:bg-gradient-to-r after:from-secondary/40 after:to-transparent pointer-events-none"
            >
              <span className="text-accent font-semibold whitespace-nowrap">🔥 TRENDING TODAY</span>
            </div>

            {/* Right Scrolling Section */}
            <div className="flex-1 overflow-hidden flex items-center relative h-full mask-edges">
              <div className="flex w-max animate-marquee items-center group">
                {/* Duplicate the array to create a seamless infinite scroll effect */}
                {[...tickerHeadlines, ...tickerHeadlines].map((headline, index) => (
                  <div key={index} className="flex items-center shrink-0">
                    <Link
                      to={headline.link}
                      className="px-4 sm:px-6 py-1 whitespace-nowrap hover:text-accent hover:underline decoration-accent underline-offset-4 cursor-pointer transition-colors"
                    >
                      {headline.title}
                    </Link>
                    <span aria-hidden className="text-ink-soft/40">
                      •
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Masthead */}
      <Container size="wide" className="pt-8 pb-6">
        <div className="flex flex-col items-center text-center animate-in fade-in slide-in-from-bottom-2 duration-700">
          <div className="eyebrow">A publication for modern knowledge</div>
          <h1 className="mt-4 font-display font-medium text-[13vw] sm:text-[10vw] lg:text-[6rem] leading-[0.85] tracking-[-0.03em]">
            Lordiphosa
          </h1>
          <div className="mt-6 flex items-center gap-5 text-xs font-mono text-ink-soft">
            <span>Vol. II</span>
            <span aria-hidden>❋</span>
            <span>
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span aria-hidden>❋</span>
            <span>AI · Engineering · Startups</span>
          </div>
        </div>
      </Container>

      {/* Hero & Knowledge Dashboard */}
      <Container
        size="wide"
        className="pb-16 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150 fill-mode-both"
      >
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="font-display font-medium text-4xl sm:text-5xl lg:text-6xl leading-[1.1] tracking-tight text-foreground">
            Understand Tomorrow, Today.
          </h2>
          <p className="mt-6 text-lg sm:text-xl text-ink-soft leading-relaxed max-w-2xl mx-auto">
            Independent publication delivering trusted insights on artificial intelligence,
            engineering, business innovation, software development, cybersecurity, and the
            technologies shaping the future.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/articles"
              className="inline-flex items-center justify-center h-11 px-8 rounded-sm bg-foreground text-background font-medium text-sm transition-transform hover:-translate-y-0.5"
            >
              Explore Latest Articles
            </Link>
            <Link
              to="/topics"
              className="inline-flex items-center justify-center h-11 px-8 rounded-sm border border-border bg-background text-foreground font-medium text-sm transition-all hover:bg-secondary hover:-translate-y-0.5"
            >
              Browse Topics
            </Link>
          </div>
        </div>

        {/* 4-Card Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 rule-t pt-8">
          {/* Card 1: Trending Today */}
          <div className="bg-secondary/30 p-6 rounded-sm border border-border transition-all duration-300 hover:-translate-y-1 hover:shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Flame className="w-5 h-5 text-accent" />
              <h3 className="font-display font-medium text-lg">Trending Today</h3>
            </div>
            <ul className="space-y-3">
              {[
                "AI Agents",
                "Quantum Computing",
                "Cybersecurity",
                "Semiconductors",
                "Startups",
                "Cloud Computing",
              ].map((topic, i) => (
                <li key={i}>
                  <Link
                    to="/search"
                    className="text-sm text-ink-soft hover:text-foreground relative group inline-flex items-center gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-border group-hover:bg-accent transition-colors" />
                    {topic}
                    <span className="absolute -bottom-0.5 left-3 right-0 h-px bg-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Card 2: Publication Stats */}
          <div className="bg-secondary/30 p-6 rounded-sm border border-border transition-all duration-300 hover:-translate-y-1 hover:shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-5">
                <BookOpen className="w-5 h-5 text-ink-soft" />
                <h3 className="font-display font-medium text-lg">Publication</h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-border/50 pb-2">
                  <span className="text-sm text-ink-soft">Articles</span>
                  <span className="font-mono text-sm font-medium">{stats.articles}</span>
                </div>
                <div className="flex justify-between items-center border-b border-border/50 pb-2">
                  <span className="text-sm text-ink-soft">Categories</span>
                  <span className="font-mono text-sm font-medium">{stats.categories}</span>
                </div>
                <div className="flex justify-between items-center border-b border-border/50 pb-2">
                  <span className="text-sm text-ink-soft">Authors</span>
                  <span className="font-mono text-sm font-medium">{stats.authors}</span>
                </div>
              </div>
            </div>
            <div className="mt-6 text-[10px] uppercase tracking-widest text-ink-soft flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500/80 animate-pulse" />
              Updated 12 mins ago
            </div>
          </div>

          {/* Card 3: Featured Topics */}
          <div className="bg-secondary/30 p-6 rounded-sm border border-border transition-all duration-300 hover:-translate-y-1 hover:shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Compass className="w-5 h-5 text-ink-soft" />
              <h3 className="font-display font-medium text-lg">Featured Topics</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                "Artificial Intelligence",
                "Software Engineering",
                "Programming",
                "Business",
                "Data Science",
                "Future Trends",
                "Cloud",
                "Robotics",
              ].map((topic, i) => (
                <Link
                  key={i}
                  to="/topics"
                  className="px-3 py-1.5 rounded-full border border-border/80 bg-background text-[11px] font-medium text-ink-soft hover:border-accent hover:text-accent transition-colors"
                >
                  {topic}
                </Link>
              ))}
            </div>
          </div>

          {/* Card 4: Editor's Note */}
          <div className="bg-secondary/30 p-6 rounded-sm border border-border transition-all duration-300 hover:-translate-y-1 hover:shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <PenTool className="w-5 h-5 text-ink-soft" />
                <h3 className="font-display font-medium text-lg">Editor's Note</h3>
              </div>
              <p className="text-sm text-ink-soft leading-relaxed italic">
                "Every day we publish carefully curated insights covering emerging technologies,
                engineering, innovation, and digital transformation."
              </p>
            </div>
            <Link
              to="/about"
              className="mt-6 text-xs font-medium text-foreground inline-flex items-center gap-1 group"
            >
              Read More
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        </div>
      </Container>

      {/* Featured hero */}
      <Container size="wide" className="mt-6 pb-24 rule-t pt-16">
        <ArticleFeatured article={featured} />
      </Container>

      {/* Today's top stories — asymmetric 2/1 */}
      <Container size="wide" className="pb-24">
        <SectionHeader
          eyebrow="Today's top stories"
          title="What's driving the industry"
          href="/articles"
        />
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14">
          <div className="lg:col-span-8 grid sm:grid-cols-2 gap-10">
            {trending.slice(0, 2).map((a) => (
              <ArticleVertical key={a.slug} article={a} />
            ))}
          </div>
          <aside className="lg:col-span-4">
            <div className="eyebrow mb-4" style={{ color: "var(--ink-soft)" }}>
              Most read
            </div>
            {trending.map((a, i) => (
              <ArticleCompact key={a.slug} article={a} index={i} />
            ))}
          </aside>
        </div>
      </Container>

      {/* Latest — list */}
      <div className="bg-secondary/40 rule-t rule-b">
        <Container size="wide" className="py-24">
          <SectionHeader
            eyebrow="The wire, freshly filed"
            title="Latest articles"
            href="/articles"
          />
          <div className="grid lg:grid-cols-12 gap-14">
            <div className="lg:col-span-8">
              {latest.map((a) => (
                <ArticleRow key={a.slug} article={a} />
              ))}
            </div>
            <aside className="lg:col-span-4">
              <div className="eyebrow mb-6">From the editor's desk</div>
              <blockquote className="font-display text-2xl leading-[1.3] tracking-tight">
                "We are not interested in being first to a headline. We are interested in being
                right, and in explaining why it matters."
              </blockquote>
              <div className="mt-6 text-sm text-ink-soft">— Elena Marchetti, Editor-in-Chief</div>
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
        <SectionHeader
          eyebrow="Handpicked by the editors"
          title="Editor's picks"
          href="/articles"
        />
        <div className="grid md:grid-cols-3 gap-10">
          {editorsPicks.map((a) => (
            <ArticleVertical key={a.slug} article={a} />
          ))}
        </div>
      </Container>

      {/* Featured collection — landscape */}
      <Container size="wide" className="pb-24">
        <SectionHeader eyebrow="A collection worth your Sunday" title="On the future of AI" />
        <div className="grid gap-16">
          {articles
            .filter((a) => a.category === "artificial-intelligence")
            .slice(0, 2)
            .map((a) => (
              <ArticleLandscape key={a.slug} article={a} />
            ))}
        </div>
      </Container>

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

      {/* Our Editorial Team */}
      <div className="bg-secondary/40 rule-t rule-b">
        <Container size="wide" className="py-24">
          <div className="mb-12">
            <div className="eyebrow mb-3 uppercase tracking-[0.18em] text-[10px] font-semibold text-accent">
              Verified Writers
            </div>
            <h2 className="font-display text-4xl sm:text-5xl leading-tight tracking-tight">
              Our Editorial Team
            </h2>
            <p className="mt-4 text-ink-soft max-w-2xl leading-relaxed text-lg">
              The journalists, researchers, engineers and industry experts shaping Lordiphosa's
              reporting.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Featured Author Card (50% Width) */}
            <div className="lg:col-span-6">
              {(() => {
                const a = authors[0]; // Elena Marchetti
                const latestArticle = articlesByAuthor(a.slug)[0];
                return (
                  <Link
                    to="/authors/$slug"
                    params={{ slug: a.slug }}
                    className="group block h-full p-8 sm:p-10 border border-border bg-background transition-all duration-300 hover:shadow-md hover:-translate-y-1 relative overflow-hidden"
                  >
                    <div className="flex flex-col sm:flex-row gap-8 items-start relative z-10">
                      {a.portrait ? (
                        <div className="w-32 h-32 sm:w-40 sm:h-40 shrink-0 overflow-hidden rounded-sm border border-border">
                          <img
                            src={a.portrait}
                            alt={a.name}
                            className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                          />
                        </div>
                      ) : (
                        <div className="w-32 h-32 sm:w-40 sm:h-40 shrink-0 rounded-sm bg-foreground text-background grid place-items-center font-display text-4xl">
                          {a.initials}
                        </div>
                      )}

                      <div>
                        <div className="flex items-center gap-3 flex-wrap mb-2">
                          <h3 className="font-display text-3xl group-hover:text-accent transition-colors">
                            {a.name}
                          </h3>
                          {a.stats?.badges?.[0] && (
                            <span className="text-[9px] font-mono tracking-widest px-2 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 rounded-full uppercase">
                              {a.stats.badges[0]}
                            </span>
                          )}
                        </div>
                        <div className="text-xs uppercase tracking-[0.15em] text-ink-soft font-semibold">
                          {a.role}
                        </div>

                        <div className="mt-4 flex flex-wrap gap-2">
                          {a.expertise.map((exp) => (
                            <span
                              key={exp}
                              className="text-[10px] font-medium uppercase tracking-wider px-2 py-1 border border-border/80 bg-secondary/50 rounded-sm text-ink-soft group-hover:border-accent/40 group-hover:text-foreground transition-colors"
                            >
                              {exp}
                            </span>
                          ))}
                        </div>

                        {a.quote && (
                          <blockquote className="mt-6 font-display text-xl leading-snug italic border-l-2 border-accent/40 pl-4 text-ink-soft group-hover:text-foreground transition-colors">
                            "{a.quote}"
                          </blockquote>
                        )}

                        <div className="mt-8 grid grid-cols-2 gap-4 rule-t pt-4">
                          <div>
                            <div className="text-2xl font-mono text-foreground">
                              {a.stats?.articles || 0}
                            </div>
                            <div className="text-[10px] uppercase tracking-widest text-ink-soft">
                              Articles
                            </div>
                          </div>
                          <div>
                            <div className="text-2xl font-mono text-foreground">
                              {a.stats?.reads || "0"}
                            </div>
                            <div className="text-[10px] uppercase tracking-widest text-ink-soft">
                              Total Reads
                            </div>
                          </div>
                        </div>

                        {latestArticle && (
                          <div className="mt-8 rule-t pt-4">
                            <div className="text-[10px] uppercase tracking-widest text-ink-soft mb-2">
                              Latest Article
                            </div>
                            <div className="text-sm font-medium hover:text-accent transition-colors line-clamp-2">
                              {latestArticle.title}
                            </div>
                          </div>
                        )}

                        <div className="mt-8 text-xs font-medium uppercase tracking-widest text-accent flex items-center gap-2 group-hover:gap-3 transition-all">
                          View Profile <span aria-hidden>→</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })()}
            </div>

            {/* Supporting Author Cards */}
            <div className="lg:col-span-6 flex flex-col gap-4">
              {authors.slice(1).map((a) => {
                const latestArticle = articlesByAuthor(a.slug)[0];
                return (
                  <Link
                    key={a.slug}
                    to="/authors/$slug"
                    params={{ slug: a.slug }}
                    className="group flex-1 p-6 border border-border bg-background transition-all duration-300 hover:shadow-sm hover:-translate-y-0.5 flex flex-col justify-center"
                  >
                    <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                      {a.portrait ? (
                        <div className="w-20 h-20 shrink-0 overflow-hidden rounded-full border border-border bg-secondary">
                          <img
                            src={a.portrait}
                            alt={a.name}
                            className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                          />
                        </div>
                      ) : (
                        <div className="w-20 h-20 shrink-0 rounded-full bg-foreground text-background grid place-items-center font-display text-xl">
                          {a.initials}
                        </div>
                      )}

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <h3 className="font-display text-2xl group-hover:text-accent transition-colors truncate">
                              {a.name}
                            </h3>
                            <div className="text-[10px] uppercase tracking-[0.15em] text-ink-soft font-semibold truncate mt-1">
                              {a.role}
                            </div>
                          </div>
                          <div className="hidden sm:block text-right">
                            <div className="text-lg font-mono text-foreground">
                              {a.stats?.articles || 0}
                            </div>
                            <div className="text-[9px] uppercase tracking-widest text-ink-soft">
                              Articles
                            </div>
                          </div>
                        </div>

                        <div className="mt-3 flex flex-wrap gap-2">
                          {a.expertise.map((exp) => (
                            <span
                              key={exp}
                              className="text-[10px] font-medium uppercase tracking-wider text-ink-soft group-hover:text-foreground transition-colors"
                            >
                              {exp}
                            </span>
                          ))}
                        </div>

                        {latestArticle && (
                          <div className="mt-4 pt-3 border-t border-border/50 text-sm">
                            <span className="text-[10px] uppercase tracking-widest text-ink-soft mr-2">
                              Latest:
                            </span>
                            <span className="text-foreground group-hover:text-accent transition-colors truncate inline-block max-w-[200px] sm:max-w-[300px] align-bottom">
                              {latestArticle.title}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="hidden md:flex text-accent group-hover:translate-x-1 transition-transform">
                        →
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </Container>
      </div>

      {/* Trending Topics Explorer */}
      <Container size="wide" className="pb-24">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="eyebrow mb-3 uppercase tracking-[0.18em] text-[10px] font-semibold text-accent">
              Popular Topics
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl leading-tight tracking-tight">
              Trending Topics Across Lordiphosa
            </h2>
            <p className="mt-4 text-ink-soft max-w-2xl leading-relaxed text-lg">
              Discover the technologies, industries, and ideas readers are exploring this week.
            </p>
          </div>
          <Link
            to="/topics"
            className="text-sm font-medium hover:text-accent transition-colors whitespace-nowrap group inline-flex items-center gap-1"
          >
            View all topics{" "}
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {popularTopics.map((topic) => {
            const latestArticle = articlesByCategory(topic.slug)[0];

            return (
              <Link
                key={topic.slug}
                to="/categories/$slug"
                params={{ slug: topic.slug }}
                className="group block relative overflow-hidden bg-background border border-border transition-all duration-500 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex flex-col h-full">
                  <div className="w-full h-48 lg:h-56 overflow-hidden bg-secondary border-b border-border">
                    {topic.coverImage && (
                      <img
                        src={topic.coverImage}
                        alt={topic.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                    )}
                  </div>
                  <div className="p-6 lg:p-8 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-display text-2xl group-hover:text-accent transition-colors tracking-tight mb-2">
                        {topic.name}
                      </h3>
                      <p className="text-sm text-ink-soft leading-relaxed mb-6 line-clamp-2">
                        {topic.description}
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <span className="text-lg font-mono text-foreground mr-1">
                            {topic.articleCount}
                          </span>
                          <span className="text-[9px] uppercase tracking-widest text-ink-soft">
                            Articles
                          </span>
                        </div>
                        <div className="text-[9px] uppercase tracking-widest text-ink-soft border border-border/80 bg-secondary/30 px-2 py-1 rounded-sm">
                          {topic.lastUpdated}
                        </div>
                      </div>
                      {latestArticle && (
                        <div className="mb-6 pt-5 border-t border-border/50">
                          <div className="text-[9px] uppercase tracking-widest text-ink-soft mb-1.5">
                            Latest
                          </div>
                          <div className="text-sm font-medium line-clamp-2">
                            "{latestArticle.title}"
                          </div>
                        </div>
                      )}
                      <div className="flex items-center text-[10px] font-medium uppercase tracking-widest text-accent">
                        Explore Topic{" "}
                        <span className="ml-1.5 group-hover:translate-x-1.5 transition-transform">
                          →
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </SiteLayout>
  );
}
