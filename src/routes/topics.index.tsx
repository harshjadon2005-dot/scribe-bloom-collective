import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Container } from "@/components/site/Container";
import { Newsletter } from "@/components/site/Newsletter";
import { popularTopics, collections, trendingTechnologies, articlesByCategory } from "@/data/articles";
import { Search, Clock, ChevronRight } from "lucide-react";
import { useState } from "react";
import { getTopics, getArticles } from "@/api";

export const Route = createFileRoute("/topics/")({
  component: Topics,
  head: () => ({
    meta: [
      { title: "Knowledge Explorer — Lordiphosa" },
      { name: "description", content: "Explore the Lordiphosa knowledge library. Discover technologies, industries and ideas shaping tomorrow." },
      { property: "og:title", content: "Knowledge Explorer — Lordiphosa" },
      { property: "og:url", content: "/topics" },
    ],
    links: [{ rel: "canonical", href: "/topics" }],
  }),
  loader: async () => {
    const categories = await getTopics();
    const articles = await getArticles();
    return { categories, articles };
  }
});

const faqs = [
  {
    question: "How often are topics updated?",
    answer: "Our editorial team updates the knowledge base daily. Trending topics and breaking developments are updated in real-time as new articles are published."
  },
  {
    question: "How do you select featured topics?",
    answer: "Featured topics are chosen based on a combination of reader interest, industry momentum, and the volume of groundbreaking research or news in that sector."
  },
  {
    question: "Can I follow specific topics?",
    answer: "Yes, you can subscribe to our newsletter and select your preferred topics to receive curated weekly digests tailored to your interests."
  },
  {
    question: "Who writes the articles in these collections?",
    answer: "Our articles are written by a mix of our dedicated editorial team, industry experts, researchers, and contributing engineers who are actively working in these fields."
  }
];

function Topics() {
  const { categories, articles } = Route.useLoaderData();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const [showAllTrending, setShowAllTrending] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate({ to: "/search", search: { q: searchQuery } });
    }
  };

  const featuredTopic = popularTopics[0];
  const featuredArticle = articlesByCategory(featuredTopic.slug)[0];

  const popularCollections = collections.slice(0, 4);
  const editorCollections = collections.slice(4);

  return (
    <SiteLayout>
      {/* Hero Section */}
      <Container size="wide" className="pt-20 pb-24">
        <div className="text-center max-w-4xl mx-auto">
          <div className="eyebrow mb-6 uppercase tracking-[0.2em] text-[10px] font-semibold text-accent">Knowledge Explorer</div>
          <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl leading-[0.95] tracking-tight mb-8">
            Explore Knowledge
          </h1>
          <p className="text-lg sm:text-xl text-ink-soft leading-relaxed max-w-2xl mx-auto mb-16">
            Discover technologies, industries and ideas shaping tomorrow.
          </p>
          
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-20 group">
            <div className="relative">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-soft group-focus-within:text-accent transition-colors" />
              <input 
                type="text" 
                placeholder="Search AI, Programming, Cloud..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-secondary/30 border border-border rounded-full py-5 pl-16 pr-6 text-lg focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all shadow-sm"
              />
            </div>
            <div className="mt-4 flex flex-wrap justify-center gap-2 text-xs text-ink-soft">
              <span>Popular searches:</span>
              <Link to="/search" search={{ q: "Agents" }} className="cursor-pointer hover:text-accent transition-colors">Agents</Link>
              <Link to="/search" search={{ q: "Rust" }} className="cursor-pointer hover:text-accent transition-colors">Rust</Link>
              <Link to="/search" search={{ q: "Kubernetes" }} className="cursor-pointer hover:text-accent transition-colors">Kubernetes</Link>
            </div>
          </form>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-border max-w-4xl mx-auto border-t border-border pt-12">
            <div className="text-center pt-8 md:pt-0">
              <div className="text-4xl font-mono text-foreground mb-2">{categories.length}</div>
              <div className="text-[10px] uppercase tracking-widest text-ink-soft">Topics</div>
            </div>
            <div className="text-center pt-8 md:pt-0">
              <div className="text-4xl font-mono text-foreground mb-2">{articles.length}</div>
              <div className="text-[10px] uppercase tracking-widest text-ink-soft">Articles</div>
            </div>
            <div className="text-center pt-8 md:pt-0">
              <div className="text-4xl font-mono text-foreground mb-2">12</div>
              <div className="text-[10px] uppercase tracking-widest text-ink-soft">Writers</div>
            </div>
            <div className="text-center pt-8 md:pt-0">
              <div className="text-4xl font-mono text-foreground mb-2 flex items-center justify-center gap-2">
                <Clock className="w-5 h-5 text-accent" />
              </div>
              <div className="text-[10px] uppercase tracking-widest text-ink-soft">Updated Daily</div>
            </div>
          </div>
        </div>
      </Container>

      {/* Featured Topic Anchor */}
      <Container size="wide" className="pb-24">
        <Link 
          to="/categories/$slug"
          params={{ slug: featuredTopic.slug }}
          className="group block relative border border-border bg-background overflow-hidden hover:shadow-lg transition-all duration-500 hover:-translate-y-1"
        >
          <div className="flex flex-col lg:flex-row min-h-[500px]">
            <div className="lg:w-[55%] relative overflow-hidden bg-secondary">
              {featuredTopic.coverImage && (
                <img src={featuredTopic.coverImage} alt={featuredTopic.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              )}
              <div className="absolute top-6 left-6 bg-background/90 backdrop-blur-md px-3 py-1.5 rounded-sm border border-border flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-[10px] uppercase tracking-widest font-semibold">Featured Topic</span>
              </div>
            </div>
            <div className="lg:w-[45%] p-10 md:p-16 flex flex-col justify-center bg-secondary/5">
              <h2 className="font-display text-5xl md:text-6xl tracking-tight mb-6 group-hover:text-accent transition-colors">
                {featuredTopic.name}
              </h2>
              <p className="text-lg text-ink-soft leading-relaxed mb-10">
                {featuredTopic.description}
              </p>
              
              <div className="border-t border-border pt-8 mt-auto">
                <div className="text-[10px] uppercase tracking-widest text-ink-soft mb-3 flex items-center gap-2">
                  <span>Latest Story</span>
                  <span aria-hidden>·</span>
                  <span className="text-accent">Updated Today</span>
                </div>
                <h3 className="text-2xl font-display leading-snug mb-3">
                  {featuredArticle?.title}
                </h3>
                <p className="text-sm text-ink-soft line-clamp-2 mb-8">
                  {featuredArticle?.excerpt}
                </p>
                <div className="inline-flex items-center text-xs font-semibold uppercase tracking-widest text-foreground group-hover:text-accent transition-colors">
                  Explore Collection <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </Link>
      </Container>

      {/* Trending Topics Pills */}
      <div className="bg-secondary/40 border-y border-border overflow-hidden">
        <Container size="wide" className="py-8 flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="text-xs font-semibold uppercase tracking-widest flex items-center gap-2 shrink-0 md:mt-3">
            <span>🔥</span> Trending This Week
          </div>
          <div className="flex flex-wrap gap-3 w-full">
            {(showAllTrending ? categories : categories.slice(0, 5)).map(c => (
              <Link 
                key={c.slug}
                to="/categories/$slug"
                params={{ slug: c.slug }}
                className="px-4 py-2 bg-background border border-border rounded-full text-sm font-medium hover:border-accent hover:text-accent transition-colors shadow-sm"
              >
                {c.name}
              </Link>
            ))}
            {categories.length > 5 && (
              <button
                onClick={() => setShowAllTrending(!showAllTrending)}
                className="px-4 py-2 bg-secondary border border-border rounded-full text-sm font-medium hover:bg-background transition-colors text-ink-soft hover:text-foreground shadow-sm"
              >
                {showAllTrending ? "Show Less" : `+${categories.length - 5} More`}
              </button>
            )}
          </div>
        </Container>
      </div>

      {/* Popular Collections */}
      <Container size="wide" className="py-24">
        <div className="mb-12 flex justify-between items-end">
          <div>
            <h2 className="font-display text-4xl tracking-tight">Popular Collections</h2>
            <p className="mt-3 text-ink-soft">Curated deep dives into essential topics.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularCollections.map(c => (
            <div
              key={c.slug}
              className="group block relative overflow-hidden bg-background border border-border hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
            >
              <div className="h-48 overflow-hidden bg-secondary border-b border-border">
                <img src={c.coverImage} alt={c.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
              </div>
              <div className="p-6">
                <div className="text-[9px] uppercase tracking-widest text-ink-soft mb-2">{c.articleCount} Articles</div>
                <h3 className="font-display text-xl mb-2 group-hover:text-accent transition-colors">{c.name}</h3>
                <p className="text-sm text-ink-soft line-clamp-2 mb-6">{c.description}</p>
                <div className="text-[10px] uppercase tracking-widest font-semibold flex items-center text-foreground group-hover:text-accent transition-colors cursor-pointer">
                  Browse Topics <ChevronRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>

      {/* Topic Cards Magazine Grid */}
      <Container size="wide" className="pb-24">
        <div className="mb-12 flex justify-between items-end">
          <div>
            <h2 className="font-display text-4xl tracking-tight">Topic Encyclopedia</h2>
            <p className="mt-3 text-ink-soft">Every subject we cover, continuously updated.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 md:gap-8">
          {popularTopics.slice(1).map((topic, i) => {
            const style = topic.cardStyle || "standard";
            const latestArticle = articlesByCategory(topic.slug)[0];

            let colSpan = "lg:col-span-4";
            if (style === "horizontal") colSpan = "md:col-span-2 lg:col-span-7";
            if (style === "standard") colSpan = "md:col-span-1 lg:col-span-5";

            if (i === 4) colSpan = "md:col-span-1 lg:col-span-5";
            if (i === 5) colSpan = "md:col-span-2 lg:col-span-7";

            return (
              <Link
                key={topic.slug}
                to="/categories/$slug"
                params={{ slug: topic.slug }}
                className={`group block relative overflow-hidden bg-background border border-border transition-all duration-500 hover:-translate-y-1 hover:shadow-lg ${colSpan}`}
              >
                {style === "horizontal" ? (
                  <div className="flex flex-col md:flex-row h-full">
                    <div className="order-1 md:order-2 w-full md:w-[45%] h-48 md:h-auto overflow-hidden bg-secondary border-b md:border-b-0 md:border-l border-border">
                      {topic.coverImage && (
                        <img src={topic.coverImage} alt={topic.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                      )}
                    </div>
                    <div className="order-2 md:order-1 w-full md:w-[55%] p-6 lg:p-8 flex flex-col justify-between">
                      <div>
                        <h3 className="font-display text-3xl group-hover:text-accent transition-colors tracking-tight mb-3">{topic.name}</h3>
                        <p className="text-sm text-ink-soft leading-relaxed mb-6 line-clamp-2">
                          {topic.description}
                        </p>
                      </div>
                      <div>
                        {latestArticle && (
                          <div className="mb-6 pt-5 border-t border-border/50">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-[9px] uppercase tracking-widest text-ink-soft">Latest</span>
                              <span className="text-[9px] uppercase tracking-widest text-accent font-semibold">{latestArticle.readingMinutes} min read</span>
                            </div>
                            <div className="text-sm font-medium line-clamp-2">
                              "{latestArticle.title}"
                            </div>
                          </div>
                        )}
                        <div className="flex items-center text-[10px] font-medium uppercase tracking-widest text-foreground group-hover:text-accent transition-colors">
                          Explore Topic <ChevronRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col h-full">
                    <div className="w-full h-48 lg:h-56 overflow-hidden bg-secondary border-b border-border">
                      {topic.coverImage && (
                        <img src={topic.coverImage} alt={topic.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                      )}
                    </div>
                    <div className="p-6 lg:p-8 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-display text-2xl group-hover:text-accent transition-colors tracking-tight mb-2">{topic.name}</h3>
                        <p className="text-sm text-ink-soft leading-relaxed mb-6 line-clamp-2">
                          {topic.description}
                        </p>
                      </div>
                      <div>
                        {latestArticle && (
                          <div className="mb-6 pt-5 border-t border-border/50">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-[9px] uppercase tracking-widest text-ink-soft">Latest</span>
                              <span className="text-[9px] uppercase tracking-widest text-accent font-semibold">{latestArticle.readingMinutes} min read</span>
                            </div>
                            <div className="text-sm font-medium line-clamp-2">
                              "{latestArticle.title}"
                            </div>
                          </div>
                        )}
                        <div className="flex items-center text-[10px] font-medium uppercase tracking-widest text-foreground group-hover:text-accent transition-colors">
                          Explore Topic <ChevronRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      </Container>

      {/* Two Column Section: Technologies & Recent Updates */}
      <div className="bg-secondary/20 border-t border-border">
        <Container size="wide" className="py-24">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            
            {/* Trending Technologies */}
            <div>
              <div className="mb-8 border-b border-border pb-4">
                <h2 className="font-display text-3xl tracking-tight">Trending Technologies</h2>
              </div>
              <div className="flex flex-wrap gap-3">
                {trendingTechnologies.map(tech => (
                  <Link 
                    key={tech} 
                    to="/search" 
                    search={{ q: tech }}
                    className="px-5 py-2.5 bg-background border border-border text-sm font-medium hover:border-accent hover:text-accent transition-colors shadow-sm"
                  >
                    {tech}
                  </Link>
                ))}
              </div>
            </div>

            {/* Recently Updated */}
            <div>
              <div className="mb-8 border-b border-border pb-4">
                <h2 className="font-display text-3xl tracking-tight">Recently Updated</h2>
              </div>
              <div className="flex flex-col gap-6">
                {[
                  { title: "Cloud Computing", time: "Updated 2 Hours Ago", slug: "cloud-computing" },
                  { title: "Programming", time: "Updated Yesterday", slug: "programming" },
                  { title: "Cybersecurity", time: "Updated Today", slug: "cybersecurity" },
                  { title: "Software Engineering", time: "Updated 2 Days Ago", slug: "software-engineering" }
                ].map((item, i) => (
                  <Link key={i} to="/categories/$slug" params={{ slug: item.slug }} className="group flex items-start justify-between border-b border-border/50 pb-6 last:border-0 last:pb-0">
                    <div>
                      <h3 className="font-display text-xl group-hover:text-accent transition-colors">{item.title}</h3>
                      <div className="mt-1 text-xs font-mono text-ink-soft">{item.time}</div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-ink-soft group-hover:text-accent group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </Container>
      </div>

      {/* Editor's Collections */}
      <div className="bg-secondary/20 border-t border-border">
        <Container size="wide" className="py-24">
          <div className="mb-12">
            <h2 className="font-display text-4xl tracking-tight">Editor's Collections</h2>
            <p className="mt-3 text-ink-soft">Carefully curated by our editorial team.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {editorCollections.map(c => (
              <div
                key={c.slug}
                className="group block relative overflow-hidden bg-background border border-border hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
              >
                <div className="h-56 overflow-hidden bg-secondary border-b border-border">
                  <img src={c.coverImage} alt={c.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-2xl mb-1 group-hover:text-accent transition-colors">{c.name}</h3>
                  <div className="text-[10px] uppercase tracking-widest text-ink-soft">{c.articleCount} Articles</div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* FAQ Section */}
      <Container size="wide" className="py-24">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl tracking-tight">Frequently Asked Questions</h2>
            <p className="mt-4 text-ink-soft">Everything you need to know about our knowledge explorer.</p>
          </div>
          <div className="divide-y divide-border/50 border-y border-border/50">
            {faqs.map((faq, index) => (
              <details key={index} className="group py-6">
                <summary className="font-display text-2xl cursor-pointer list-none flex items-center justify-between group-hover:text-accent transition-colors">
                  {faq.question}
                  <span className="text-accent text-3xl font-light group-open:rotate-45 transition-transform duration-300">+</span>
                </summary>
                <p className="mt-4 text-ink-soft leading-relaxed text-lg pl-4 border-l-2 border-accent/40">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </Container>

      <Newsletter />
    </SiteLayout>
  );
}
