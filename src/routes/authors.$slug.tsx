import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Container } from "@/components/site/Container";
import { ArticleRow } from "@/components/site/ArticleCard";
import { authors, type Article, type Author, categories } from "@/data/articles";
import { Newsletter } from "@/components/site/Newsletter";
import { ChevronRight } from "lucide-react";
import { getAuthorBySlug, getArticles } from "@/api";

export const Route = createFileRoute("/authors/$slug")({
  loader: async ({ params }) => {
    try {
      const author = await getAuthorBySlug({ data: { slug: params.slug } });
      const articles = await getArticles({ data: { author: params.slug } });
      return { author, articles };
    } catch {
      throw notFound();
    }
  },
  head: ({ loaderData, params }) => {
    const a = loaderData?.author;
    if (!a) return {};
    return {
      meta: [
        { title: `${a.name} — Lordiphosa` },
        { name: "description", content: a.bio },
        { property: "og:title", content: `${a.name} — Lordiphosa` },
        { property: "og:url", content: `/authors/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/authors/${params.slug}` }],
    };
  },
  component: AuthorPage,
  notFoundComponent: () => (
    <SiteLayout>
      <Container className="py-32 text-center">
        <h1 className="font-display text-4xl">Author not found.</h1>
        <Link to="/authors" className="mt-6 inline-block border-b border-accent pb-1">All authors</Link>
      </Container>
    </SiteLayout>
  ),
});

function AuthorPage() {
  const { author, articles } = Route.useLoaderData() as { author: Author; articles: Article[] };
  const allAuthors = authors;

  // Separate articles into latest and popular
  // For demonstration, the first 2 are latest, and the ones marked as trending/featured are popular
  const latestArticles = [...articles].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()).slice(0, 2);
  const popularArticles = articles.filter(a => a.trending || a.editorsPick || a.featured).slice(0, 3);
  
  // If popular is empty, just use other articles
  const displayPopular = popularArticles.length > 0 ? popularArticles : articles.slice(2, 5);

  // Derive related topics from expertise
  const relatedTopics = categories.filter(c => 
    author.expertise.some(e => e.toLowerCase() === c.name.toLowerCase() || c.description.toLowerCase().includes(e.toLowerCase()))
  ).slice(0, 4);

  // Find related authors based on overlapping expertise
  const relatedAuthors = authors.filter(a => 
    a.slug !== author.slug && a.expertise.some(e => author.expertise.includes(e))
  ).slice(0, 3);

  return (
    <SiteLayout>
      <Container size="wide" className="pt-16 pb-24 border-b border-border">
        <nav aria-label="Breadcrumb" className="text-xs uppercase tracking-widest text-ink-soft mb-12">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <span className="mx-3 text-border">/</span>
          <Link to="/authors" className="hover:text-foreground transition-colors">Editorial Team</Link>
          <span className="mx-3 text-border">/</span>
          <span className="text-foreground">{author.name}</span>
        </nav>

        <div className="grid md:grid-cols-12 gap-16 items-start">
          <div className="md:col-span-5 relative group">
            <div className="aspect-[4/5] overflow-hidden border border-border group-hover:shadow-xl transition-all duration-500">
              {author.portrait ? (
                <img src={author.portrait} alt={author.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
              ) : (
                <div className="w-full h-full bg-secondary text-background grid place-items-center font-display text-8xl">
                  {author.initials}
                </div>
              )}
            </div>
            {author.stats && (
              <div className="absolute -bottom-6 -right-6 bg-background border border-border p-6 shadow-lg hidden lg:block">
                <div className="text-[10px] uppercase tracking-widest text-ink-soft mb-1">Total Reads</div>
                <div className="font-display text-4xl">{author.stats.reads}</div>
              </div>
            )}
          </div>
          
          <div className="md:col-span-7 flex flex-col justify-center h-full pt-8">
            <div className="text-xs font-semibold uppercase tracking-widest text-accent mb-4">{author.role}</div>
            <h1 className="font-display text-6xl md:text-8xl leading-[0.95] tracking-tight mb-8">
              {author.name}
            </h1>
            
            {author.quote && (
              <blockquote className="border-l-2 border-accent pl-6 py-2 mb-10">
                <p className="text-2xl font-display leading-snug italic text-foreground/80">
                  "{author.quote}"
                </p>
              </blockquote>
            )}
            
            <p className="text-xl text-ink-soft leading-relaxed max-w-2xl mb-10">
              {author.bio}
            </p>
            
            <div className="mb-12">
              <div className="text-[10px] uppercase tracking-widest text-ink-soft mb-4">Areas of Expertise</div>
              <div className="flex flex-wrap gap-2">
                {author.expertise.map((e: string) => (
                  <span key={e} className="text-xs uppercase tracking-widest px-4 py-2 border border-border rounded-full hover:border-accent hover:text-accent transition-colors cursor-default bg-background">
                    {e}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex flex-wrap gap-8 items-center pt-8 border-t border-border">
              <div className="text-[10px] uppercase tracking-widest text-ink-soft">Connect</div>
              {author.social.twitter && (
                <a href={`https://twitter.com/${author.social.twitter}`} className="text-sm font-medium hover:text-accent transition-colors underline underline-offset-4 decoration-border hover:decoration-accent">Twitter / X</a>
              )}
              {author.social.site && (
                <a href={`https://${author.social.site}`} className="text-sm font-medium hover:text-accent transition-colors underline underline-offset-4 decoration-border hover:decoration-accent">Personal Website</a>
              )}
              <a href="#newsletter" className="text-sm font-medium hover:text-accent transition-colors underline underline-offset-4 decoration-border hover:decoration-accent">Subscribe to Newsletter</a>
            </div>
          </div>
        </div>
      </Container>

      {/* Bibliography & Content Section */}
      <Container size="wide" className="py-24">
        <div className="grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8">
            <div className="mb-12 border-b border-border pb-6 flex justify-between items-end">
              <div>
                <h2 className="font-display text-4xl tracking-tight mb-2">Latest Articles</h2>
                <p className="text-ink-soft">The most recent dispatches from {author.name.split(' ')[0]}.</p>
              </div>
            </div>
            
            <div className="flex flex-col gap-8 mb-24">
              {latestArticles.map(article => (
                <Link 
                  key={article.slug} 
                  to="/articles/$slug" 
                  params={{ slug: article.slug }}
                  className="group block border-b border-border/50 pb-8 last:border-0 last:pb-0"
                >
                  <div className="flex items-center gap-4 text-xs font-mono text-ink-soft mb-4">
                    <span>{new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                    <span className="w-1 h-1 rounded-full bg-border"></span>
                    <span>{article.readingMinutes} min read</span>
                  </div>
                  <h3 className="font-display text-3xl tracking-tight mb-3 group-hover:text-accent transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-ink-soft line-clamp-2 max-w-3xl mb-4">
                    {article.excerpt}
                  </p>
                  <div className="text-xs font-semibold uppercase tracking-widest text-foreground group-hover:text-accent transition-colors flex items-center">
                    Read Article <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>

            <div className="mb-12 border-b border-border pb-6">
              <h2 className="font-display text-4xl tracking-tight mb-2">Most Popular</h2>
              <p className="text-ink-soft">Highly cited and heavily read work.</p>
            </div>
            
            <div className="max-w-4xl">
              {displayPopular.map((a: Article) => (
                <ArticleRow key={a.slug} article={a} />
              ))}
            </div>
          </div>
          
          <div className="lg:col-span-4 space-y-16 pt-6">
            {/* Timeline */}
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest border-b border-border pb-4 mb-6">Career Highlights</div>
              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-5 h-5 rounded-full border-2 border-background bg-accent shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow" />
                  <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] ml-4 md:ml-0 bg-secondary/30 p-4 border border-border">
                    <time className="text-[10px] font-mono text-ink-soft uppercase">2026</time>
                    <div className="font-medium text-foreground mt-1">Lead coverage on Agentic AI Frameworks</div>
                  </div>
                </div>
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                  <div className="flex items-center justify-center w-5 h-5 rounded-full border-2 border-background bg-border shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2" />
                  <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] ml-4 md:ml-0 bg-secondary/30 p-4 border border-border">
                    <time className="text-[10px] font-mono text-ink-soft uppercase">2024</time>
                    <div className="font-medium text-foreground mt-1">Joined Lordiphosa Editorial Board</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Topics */}
            {relatedTopics.length > 0 && (
              <div>
                <div className="text-xs font-semibold uppercase tracking-widest border-b border-border pb-4 mb-6">Related Topics</div>
                <div className="flex flex-col gap-4">
                  {relatedTopics.map(topic => (
                    <Link 
                      key={topic.slug} 
                      to="/categories/$slug" 
                      params={{ slug: topic.slug }}
                      className="group flex items-center justify-between"
                    >
                      <span className="font-display text-xl group-hover:text-accent transition-colors">{topic.name}</span>
                      <ChevronRight className="w-4 h-4 text-ink-soft group-hover:text-accent group-hover:translate-x-1 transition-all" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Related Authors */}
            {relatedAuthors.length > 0 && (
              <div>
                <div className="text-xs font-semibold uppercase tracking-widest border-b border-border pb-4 mb-6">Similar Experts</div>
                <div className="flex flex-col gap-6">
                  {relatedAuthors.map(relAuthor => (
                    <Link 
                      key={relAuthor.slug} 
                      to="/authors/$slug" 
                      params={{ slug: relAuthor.slug }}
                      className="group flex items-center gap-4"
                    >
                      <div className="w-12 h-12 rounded-full overflow-hidden border border-border bg-secondary shrink-0">
                        {relAuthor.portrait ? (
                          <img src={relAuthor.portrait} alt={relAuthor.name} className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-sm font-display">{relAuthor.initials}</div>
                        )}
                      </div>
                      <div>
                        <div className="font-display text-lg group-hover:text-accent transition-colors">{relAuthor.name}</div>
                        <div className="text-[10px] uppercase tracking-widest text-ink-soft">{relAuthor.role}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
      
      <div id="newsletter">
        <Newsletter />
      </div>
    </SiteLayout>
  );
}