import { Link } from "@tanstack/react-router";
import { Container } from "./Container";
import { Newsletter } from "./Newsletter";
import { articles, categories } from "@/data/articles";
import { 
  ArrowRight, 
  Search, 
  Linkedin, 
  Github, 
  Twitter, 
  Rss, 
  Mail,
  ChevronRight
} from "lucide-react";
import { useState } from "react";

export function Footer() {
  const year = new Date().getFullYear();
  const [searchQuery, setSearchQuery] = useState("");

  // Continue Exploring Articles
  const exploreArticles = articles.slice(0, 4);

  return (
    <div className="mt-24">
      {/* SECTION 1: Continue Exploring */}
      <section className="bg-background py-24 border-t border-border">
        <Container size="wide">
          <div className="mb-12 border-b border-border pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
              <h2 className="font-display text-4xl sm:text-5xl tracking-tight mb-3">Continue Exploring</h2>
              <p className="text-lg text-ink-soft">Discover more stories, topics, and research from Lordiphosa.</p>
            </div>
            <Link to="/articles" className="group flex items-center text-sm font-medium hover:text-accent transition-colors">
              All Articles <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {exploreArticles.map(article => (
              <Link 
                key={article.slug} 
                to="/articles/$slug" 
                params={{ slug: article.slug }}
                className="group flex flex-col h-full"
              >
                <div className="aspect-[4/3] overflow-hidden mb-6 border border-border">
                  <img 
                    src={article.cover} 
                    alt={article.coverAlt} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="text-[10px] font-semibold uppercase tracking-widest text-accent mb-3">
                  {article.category.replace('-', ' ')}
                </div>
                <h3 className="font-display text-2xl tracking-tight mb-4 group-hover:text-accent transition-colors flex-grow">
                  {article.title}
                </h3>
                <div className="flex items-center justify-between text-xs font-mono text-ink-soft border-t border-border pt-4 mt-auto">
                  <span>{new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  <span className="flex items-center group-hover:text-accent transition-colors">
                    Read <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* SECTION 2: Newsletter */}
      <Newsletter compact={true} />

      {/* SECTION 3: Premium Editorial Footer */}
      <footer className="bg-foreground text-background pt-24 pb-12">
        <Container size="wide">
          <div className="grid grid-cols-2 md:grid-cols-12 gap-12 lg:gap-16 mb-20">
            {/* Column 1 - Brand */}
            <div className="col-span-2 md:col-span-12 lg:col-span-4 pr-0 lg:pr-8">
              <div className="font-display text-4xl font-medium leading-none tracking-tight mb-2">Lordiphosa</div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-background/60 mb-6">Modern Knowledge for Curious Minds</div>
              <p className="text-sm text-background/80 leading-relaxed mb-10 max-w-sm">
                An independent editorial publication dedicated to uncovering the nuance behind artificial intelligence, software engineering, and the technological frontier.
              </p>
              
              <div className="grid grid-cols-2 gap-x-4 gap-y-6">
                <div>
                  <div className="font-display text-2xl mb-1">2,840+</div>
                  <div className="text-[10px] uppercase tracking-widest text-background/50">Articles</div>
                </div>
                <div>
                  <div className="font-display text-2xl mb-1">124</div>
                  <div className="text-[10px] uppercase tracking-widest text-background/50">Topics</div>
                </div>
                <div>
                  <div className="font-display text-2xl mb-1">42</div>
                  <div className="text-[10px] uppercase tracking-widest text-background/50">Writers</div>
                </div>
                <div>
                  <div className="font-display text-2xl mb-1 text-accent">Daily</div>
                  <div className="text-[10px] uppercase tracking-widest text-background/50">Updated</div>
                </div>
              </div>
            </div>

            <FooterCol
              title="Explore"
              links={[
                { to: "/articles", label: "All Articles" },
                { to: "/articles", label: "Latest Articles" },
                { to: "/trending", label: "Trending" },
                { to: "/topics", label: "Topics" },
                { to: "/authors", label: "Authors" },
                { to: "/search", label: "Search" },
              ]}
            />

            <FooterCol
              title="Publication"
              links={[
                { to: "/about", label: "About" },
                { to: "/authors", label: "Editorial Team" },
                { to: "/contact", label: "Contact" },
              ]}
            />



            {/* Column 5 - Follow Us */}
            <div className="col-span-2 md:col-span-3 lg:col-span-2">
              <div className="eyebrow mb-6 text-background/50 tracking-widest">Follow Us</div>
              <ul className="flex flex-col gap-4">
                <li>
                  <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="group flex items-center gap-3 text-sm text-background/80 hover:text-background transition-colors">
                    <Linkedin className="w-4 h-4 group-hover:text-accent transition-colors" /> LinkedIn
                  </a>
                </li>
                <li>
                  <a href="https://github.com" target="_blank" rel="noreferrer" className="group flex items-center gap-3 text-sm text-background/80 hover:text-background transition-colors">
                    <Github className="w-4 h-4 group-hover:text-accent transition-colors" /> GitHub
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com" target="_blank" rel="noreferrer" className="group flex items-center gap-3 text-sm text-background/80 hover:text-background transition-colors">
                    <Twitter className="w-4 h-4 group-hover:text-accent transition-colors" /> Twitter / X
                  </a>
                </li>
                <li>
                  <Link to={"/contact" as any} className="group flex items-center gap-3 text-sm text-background/80 hover:text-background transition-colors">
                    <Mail className="w-4 h-4 group-hover:text-accent transition-colors" /> Email Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 items-center py-12 border-t border-background/20">
            <div className="lg:col-span-8">
              <div className="eyebrow mb-4 text-background/50 tracking-widest">Popular Topics</div>
              <div className="flex flex-wrap gap-2">
                {categories.slice(0, 8).map(cat => (
                  <Link 
                    key={cat.slug}
                    to="/categories/$slug"
                    params={{ slug: cat.slug }}
                    className="px-4 py-2 border border-background/20 rounded-full text-xs font-medium hover:border-accent hover:text-accent hover:bg-accent/10 transition-all duration-300"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="lg:col-span-4">
              <div className="eyebrow mb-4 text-background/50 tracking-widest">Search Lordiphosa</div>
              <form 
                action="/search" 
                method="GET" 
                className="relative group"
              >
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-background/50 group-focus-within:text-accent transition-colors" />
                <input 
                  type="text" 
                  name="q"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-background/5 border border-background/20 rounded-full py-3 pl-12 pr-4 text-sm text-background placeholder:text-background/50 focus:outline-none focus:border-accent focus:bg-background/10 transition-all"
                />
              </form>
            </div>
          </div>

          {/* SECTION 4: Bottom Copyright Bar */}
          <div className="pt-8 border-t border-background/20 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-background/50">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6">
              <span>© {year} Lordiphosa</span>
              <span className="hidden sm:inline w-1 h-1 rounded-full bg-background/30"></span>
              <span>Independent Technology Publication</span>
            </div>
            
            <div className="flex items-center gap-6 font-mono">
              <span>Version 1.0</span>
              <span className="hidden sm:inline text-background/30">|</span>
              <span className="hidden sm:inline">Last Updated</span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span> All Systems Operational
              </span>
            </div>

            <div className="flex items-center gap-6 font-medium text-background/70">
              <Link to={"/privacy" as any} className="hover:text-background transition-colors underline underline-offset-4 decoration-transparent hover:decoration-background">Privacy</Link>
              <Link to={"/terms" as any} className="hover:text-background transition-colors underline underline-offset-4 decoration-transparent hover:decoration-background">Terms</Link>
            </div>
          </div>
        </Container>
      </footer>
    </div>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { to: string; label: string }[];
}) {
  return (
    <div className="col-span-1 md:col-span-3 lg:col-span-2">
      <div className="eyebrow mb-6 text-background/50 tracking-widest">{title}</div>
      <ul className="space-y-4">
        {links.map((l, i) => (
          <li key={i}>
            <Link 
              to={l.to as any} 
              className="text-sm text-background/80 hover:text-background transition-colors relative group"
            >
              <span>{l.label}</span>
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
