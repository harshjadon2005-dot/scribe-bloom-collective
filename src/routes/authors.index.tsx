import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Container } from "@/components/site/Container";
import { articlesByAuthor, type Author } from "@/data/articles";
import { Search, ChevronRight } from "lucide-react";
import { useState } from "react";
import { getAuthors, getArticles } from "@/api";

export const Route = createFileRoute("/authors/")({
  component: AuthorsIndex,
  head: () => ({
    meta: [
      { title: "Authors — Lordiphosa" },
      { name: "description", content: "The writers, editors, and contributors behind Lordiphosa." },
      { property: "og:title", content: "Authors — Lordiphosa" },
      { property: "og:url", content: "/authors" },
    ],
    links: [{ rel: "canonical", href: "/authors" }],
  }),
  loader: async () => {
    const authors = await getAuthors();
    const articles = await getArticles();
    return { authors, articles };
  }
});

function AuthorsIndex() {
  const { authors, articles } = Route.useLoaderData();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedExpertise, setSelectedExpertise] = useState<string | null>(null);

  const featuredEditor = authors.find(a => a.slug === "elena-marchetti") || authors[0];
  const gridAuthors = authors.filter(a => a.slug !== featuredEditor.slug);

  // Extract all unique expertise categories
  const allExpertise = Array.from(new Set(authors.flatMap(a => a.expertise))).sort();

  // Filter grid authors based on search and selected expertise
  const filteredAuthors = gridAuthors.filter(a => {
    const matchesSearch = a.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          a.expertise.some(e => e.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesExpertise = selectedExpertise ? a.expertise.includes(selectedExpertise) : true;
    return matchesSearch && matchesExpertise;
  });

  // Recently Published - getting the 5 most recent articles
  const recentArticles = [...articles].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()).slice(0, 5);

  return (
    <SiteLayout>
      {/* Hero Section */}
      <Container size="wide" className="pt-20 pb-24 border-b border-border">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="eyebrow mb-6 uppercase tracking-[0.2em] text-[10px] font-semibold text-accent">The Masthead</div>
            <h1 className="font-display text-5xl md:text-7xl leading-[0.95] tracking-tight mb-8">
              Meet the Minds Behind Lordiphosa
            </h1>
            <p className="text-xl text-ink-soft leading-relaxed max-w-xl mb-12">
              Independent journalists, engineers, researchers, analysts, and industry experts helping readers understand technology, AI, software engineering, cybersecurity, startups, and the future of innovation.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-y border-border">
              <div>
                <div className="font-display text-3xl mb-1">42</div>
                <div className="text-[10px] uppercase tracking-widest text-ink-soft">Verified Writers</div>
              </div>
              <div>
                <div className="font-display text-3xl mb-1">2.4k</div>
                <div className="text-[10px] uppercase tracking-widest text-ink-soft">Articles Published</div>
              </div>
              <div>
                <div className="font-display text-3xl mb-1">10</div>
                <div className="text-[10px] uppercase tracking-widest text-ink-soft">Topics Covered</div>
              </div>
              <div>
                <div className="font-display text-3xl mb-1">100%</div>
                <div className="text-[10px] uppercase tracking-widest text-ink-soft">Updated Weekly</div>
              </div>
            </div>
          </div>
          <div className="hidden lg:flex justify-center items-center relative h-[400px]">
            {/* Collage of portraits */}
            {authors.slice(0, 4).map((author, index) => (
              <div 
                key={author.slug} 
                className={`absolute rounded-full border-4 border-background overflow-hidden shadow-2xl transition-transform duration-700 hover:scale-110 hover:z-10`}
                style={{
                  width: index === 0 ? '220px' : index === 1 ? '160px' : '140px',
                  height: index === 0 ? '220px' : index === 1 ? '160px' : '140px',
                  top: index === 0 ? '20%' : index === 1 ? '10%' : index === 2 ? '60%' : '50%',
                  left: index === 0 ? '35%' : index === 1 ? '15%' : index === 2 ? '20%' : '65%',
                  zIndex: 4 - index
                }}
              >
                {author.portrait ? (
                  <img src={author.portrait} alt={author.name} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                ) : (
                  <div className="w-full h-full bg-secondary flex items-center justify-center font-display text-4xl text-foreground">
                    {author.initials}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </Container>

      {/* Featured Editor */}
      <div className="bg-secondary/20">
        <Container size="wide" className="py-24">
          <div className="eyebrow mb-12 text-accent">Featured Editor</div>
          <div className="grid md:grid-cols-12 gap-12 items-center bg-background border border-border p-8 md:p-16 hover:shadow-lg transition-shadow duration-500">
            <div className="md:col-span-4">
              <div className="aspect-[3/4] overflow-hidden border border-border">
                {featuredEditor.portrait ? (
                  <img src={featuredEditor.portrait} alt={featuredEditor.name} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
                ) : (
                  <div className="w-full h-full bg-secondary flex items-center justify-center font-display text-8xl">
                    {featuredEditor.initials}
                  </div>
                )}
              </div>
            </div>
            <div className="md:col-span-8 flex flex-col justify-center">
              <div className="text-[10px] uppercase tracking-widest text-ink-soft mb-3">{featuredEditor.role}</div>
              <h2 className="font-display text-5xl sm:text-6xl tracking-tight mb-6">
                {featuredEditor.name}
              </h2>
              <div className="flex flex-wrap gap-2 mb-8">
                {featuredEditor.expertise.map((e: string) => (
                  <span key={e} className="text-[10px] font-semibold uppercase tracking-widest px-3 py-1 bg-secondary/50 border border-border text-ink-soft">
                    {e}
                  </span>
                ))}
              </div>
              {featuredEditor.quote && (
                <blockquote className="border-l-2 border-accent pl-6 py-2 mb-8">
                  <p className="text-2xl font-display leading-snug italic text-foreground">
                    "{featuredEditor.quote}"
                  </p>
                </blockquote>
              )}
              <p className="text-lg text-ink-soft leading-relaxed mb-10 max-w-2xl">
                {featuredEditor.bio}
              </p>
              
              <div className="flex items-center gap-6">
                <Link 
                  to="/authors/$slug" 
                  params={{ slug: featuredEditor.slug }}
                  className="inline-flex items-center justify-center h-12 px-8 bg-foreground text-background font-medium text-sm hover:bg-accent transition-colors"
                >
                  View Profile
                </Link>
                
                {(() => {
                  const latestArticle = articlesByAuthor(featuredEditor.slug)[0];
                  return latestArticle ? (
                    <div className="hidden sm:block">
                      <div className="text-[10px] uppercase tracking-widest text-ink-soft mb-1">Latest Article</div>
                      <Link to="/articles/$slug" params={{ slug: latestArticle.slug }} className="text-sm font-medium hover:text-accent transition-colors underline underline-offset-4 decoration-border">
                        {latestArticle.title}
                      </Link>
                    </div>
                  ) : null;
                })()}
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Interactive Discovery */}
      <Container size="wide" className="pt-24 pb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
          <div>
            <h2 className="font-display text-4xl tracking-tight mb-2">Editorial Team</h2>
            <p className="text-ink-soft">Discover the experts behind the reporting.</p>
          </div>
          <div className="relative w-full md:w-80 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-soft group-focus-within:text-accent transition-colors" />
            <input 
              type="text" 
              placeholder="Search authors or expertise..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-background border border-border rounded-full py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all shadow-sm"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-16 pb-4 border-b border-border/50">
          <button
            onClick={() => setSelectedExpertise(null)}
            className={`px-4 py-2 rounded-full text-[10px] font-semibold uppercase tracking-widest transition-colors ${
              selectedExpertise === null 
                ? "bg-foreground text-background border border-foreground" 
                : "bg-background text-ink-soft border border-border hover:border-accent hover:text-foreground"
            }`}
          >
            All Writers
          </button>
          {allExpertise.map(exp => (
            <button
              key={exp}
              onClick={() => setSelectedExpertise(exp)}
              className={`px-4 py-2 rounded-full text-[10px] font-semibold uppercase tracking-widest transition-colors ${
                selectedExpertise === exp 
                  ? "bg-foreground text-background border border-foreground" 
                  : "bg-background text-ink-soft border border-border hover:border-accent hover:text-foreground"
              }`}
            >
              {exp}
            </button>
          ))}
        </div>

        {/* Editorial Team Grid */}
        {filteredAuthors.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAuthors.map((author) => {
              const latestArticle = articlesByAuthor(author.slug)[0];
              const articleCount = articlesByAuthor(author.slug).length;
              
              return (
                <Link
                  key={author.slug}
                  to="/authors/$slug"
                  params={{ slug: author.slug }}
                  className="group flex flex-col bg-background border border-border hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
                >
                  <div className="aspect-square overflow-hidden bg-secondary border-b border-border">
                    {author.portrait ? (
                      <img src={author.portrait} alt={author.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center font-display text-6xl text-ink-soft">
                        {author.initials}
                      </div>
                    )}
                  </div>
                  <div className="p-8 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-display text-3xl group-hover:text-accent transition-colors mb-1">{author.name}</h3>
                        <div className="text-[10px] uppercase tracking-widest text-ink-soft">{author.role}</div>
                      </div>
                      <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center group-hover:bg-accent group-hover:text-white group-hover:border-accent transition-colors">
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                    
                    <p className="text-sm text-ink-soft line-clamp-3 mb-6 flex-grow">
                      {author.bio}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {author.expertise.slice(0, 2).map((e: string) => (
                        <span key={e} className="text-[10px] uppercase tracking-widest px-2 py-1 bg-secondary/50 border border-border text-ink-soft">
                          {e}
                        </span>
                      ))}
                      {author.expertise.length > 2 && (
                        <span className="text-[10px] uppercase tracking-widest px-2 py-1 text-ink-soft">
                          +{author.expertise.length - 2} more
                        </span>
                      )}
                    </div>
                    
                    <div className="border-t border-border pt-6 mt-auto">
                      <div className="flex justify-between items-center text-[10px] uppercase tracking-widest text-ink-soft mb-2">
                        <span>{articleCount} Articles</span>
                        {latestArticle && <span>Latest</span>}
                      </div>
                      {latestArticle && (
                        <div className="text-sm font-medium line-clamp-1 group-hover:text-accent transition-colors">
                          {latestArticle.title}
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="py-24 text-center border border-dashed border-border">
            <h3 className="font-display text-2xl mb-2">No authors found</h3>
            <p className="text-ink-soft">Try adjusting your search or filter criteria.</p>
            <button 
              onClick={() => { setSearchQuery(""); setSelectedExpertise(null); }}
              className="mt-6 px-6 py-2 border border-border text-sm font-medium hover:border-accent hover:text-accent transition-colors"
            >
              Clear filters
            </button>
          </div>
        )}
      </Container>

      {/* Recently Published Section */}
      <div className="py-24 mt-12 border-t border-border">
        <Container size="wide">
          <div className="mb-12 border-b border-border pb-6 flex justify-between items-end">
            <div>
              <h2 className="font-display text-4xl tracking-tight mb-2">Recently Published</h2>
              <p className="text-ink-soft">The latest dispatches from our editorial team.</p>
            </div>
            <Link to="/articles" className="hidden sm:flex items-center text-sm font-medium hover:text-accent transition-colors">
              All Articles <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          
          <div className="flex flex-col gap-8">
            {recentArticles.map(article => {
              const author = authors.find(a => a.slug === article.authorSlug);
              return (
                <Link 
                  key={article.slug} 
                  to="/articles/$slug" 
                  params={{ slug: article.slug }}
                  className="group flex flex-col md:flex-row gap-6 md:gap-10 items-start border-b border-border pb-8 last:border-0 last:pb-0"
                >
                  <div className="w-full md:w-48 shrink-0">
                    <div className="text-[10px] uppercase tracking-widest text-ink-soft mb-2">
                      {new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </div>
                    {author && (
                      <div className="flex items-center gap-3">
                        {author.portrait ? (
                          <img src={author.portrait} alt={author.name} className="w-8 h-8 rounded-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all border border-border" />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-display">{author.initials}</div>
                        )}
                        <span className="text-sm font-medium text-foreground group-hover:text-accent transition-colors">{author.name}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-display text-2xl md:text-3xl tracking-tight mb-3 group-hover:text-accent transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-ink-soft line-clamp-2 max-w-3xl">
                      {article.excerpt}
                    </p>
                  </div>
                  <div className="hidden lg:block shrink-0 text-right">
                    <div className="text-xs font-mono text-ink-soft">{article.readingMinutes} min read</div>
                  </div>
                </Link>
              );
            })}
          </div>
        </Container>
      </div>

    </SiteLayout>
  );
}