import { Container } from "./Container";
import { Check } from "lucide-react";

export function Newsletter({ compact = false }: { compact?: boolean }) {
  return (
    <section className={`bg-secondary/30 border-y border-border ${compact ? "" : "mt-24"}`}>
      <Container size={compact ? "default" : "wide"}>
        <div className="py-24 text-center max-w-4xl mx-auto flex flex-col items-center">
          <div className="eyebrow mb-6 uppercase tracking-[0.2em] text-[10px] font-semibold text-accent">The Dispatch</div>
          <h3 className="font-display text-5xl md:text-7xl leading-[0.95] tracking-tight mb-8">
            Stay Ahead of Technology
          </h3>
          <p className="text-xl text-ink-soft leading-relaxed max-w-2xl mb-12">
            Receive carefully curated articles covering AI, software engineering, cybersecurity, startups, cloud computing, semiconductors, programming, and emerging technologies.
          </p>
          
          <form
            onSubmit={(e) => e.preventDefault()}
            className="w-full max-w-lg mb-8 relative group"
          >
            <label htmlFor="nl-email" className="sr-only">Email address</label>
            <div className="relative">
              <input
                id="nl-email"
                type="email"
                required
                placeholder="Enter your email address"
                className="w-full bg-background border border-border rounded-none py-4 pl-6 pr-32 text-lg focus:outline-none focus:border-accent transition-colors shadow-sm placeholder:text-ink-soft/50"
              />
              <button
                type="submit"
                className="absolute right-2 top-2 bottom-2 bg-foreground text-background font-medium px-6 text-sm hover:bg-accent transition-colors"
              >
                Subscribe
              </button>
            </div>
            
            <div className="absolute -inset-0.5 bg-accent/20 blur opacity-0 group-focus-within:opacity-100 transition-opacity -z-10"></div>
          </form>
          
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-xs font-medium text-ink-soft">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-accent" />
              Weekly Digest
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-accent" />
              No Spam
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-accent" />
              Unsubscribe Anytime
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
