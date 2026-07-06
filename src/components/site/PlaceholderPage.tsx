import { SiteLayout } from "@/components/site/SiteLayout";
import { Container } from "@/components/site/Container";
import { Link } from "@tanstack/react-router";

export function PlaceholderPage({ title, description = "This section is currently being updated." }: { title: string, description?: string }) {
  return (
    <SiteLayout>
      <Container size="wide" className="py-32">
        <div className="max-w-3xl">
          <div className="eyebrow mb-6 uppercase tracking-[0.2em] text-[10px] font-semibold text-accent">Editorial Update</div>
          <h1 className="font-display text-5xl md:text-7xl leading-[0.95] tracking-tight mb-8">
            {title}
          </h1>
          <p className="text-xl text-ink-soft leading-relaxed mb-12">
            {description} Please check back soon for the latest coverage.
          </p>
          <div className="flex items-center gap-6">
            <Link 
              to="/" 
              className="inline-flex items-center justify-center h-12 px-8 bg-foreground text-background font-medium text-sm hover:bg-accent transition-colors"
            >
              Return Home
            </Link>
            <Link 
              to="/articles" 
              className="text-sm font-medium hover:text-accent transition-colors underline underline-offset-4 decoration-border"
            >
              Browse Articles
            </Link>
          </div>
        </div>
      </Container>
    </SiteLayout>
  );
}
