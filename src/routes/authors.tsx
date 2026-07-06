import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Container } from "@/components/site/Container";
import { articlesByAuthor, authors } from "@/data/articles";

export const Route = createFileRoute("/authors")({
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
});

function AuthorsIndex() {
  return (
    <SiteLayout>
      <Container size="wide" className="pt-16 pb-12">
        <div className="eyebrow">The Masthead</div>
        <h1 className="mt-4 font-display text-5xl sm:text-7xl leading-[0.95] tracking-tight max-w-3xl">
          The hands behind the words.
        </h1>
        <p className="mt-6 text-lg text-ink-soft max-w-xl leading-relaxed">
          A small staff of writers and editors, plus a rotating cast of contributors we admire.
        </p>
      </Container>

      <Container size="wide" className="pb-24">
        <div className="grid md:grid-cols-2 gap-x-14 gap-y-16 rule-t pt-16">
          {authors.map((a) => {
            const count = articlesByAuthor(a.slug).length;
            return (
              <Link
                key={a.slug}
                to="/authors/$slug"
                params={{ slug: a.slug }}
                className="group grid grid-cols-[auto_1fr] gap-6 items-start"
              >
                <div className="h-24 w-24 rounded-full bg-foreground text-background grid place-items-center font-display text-3xl">
                  {a.initials}
                </div>
                <div>
                  <div className="eyebrow" style={{ color: "var(--ink-soft)" }}>{a.role}</div>
                  <h2 className="mt-1 font-display text-3xl group-hover:text-accent transition-colors">
                    {a.name}
                  </h2>
                  <p className="mt-2 text-ink-soft leading-relaxed">{a.bio}</p>
                  <div className="mt-3 text-xs font-mono text-ink-soft">
                    {count} {count === 1 ? "piece" : "pieces"}
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