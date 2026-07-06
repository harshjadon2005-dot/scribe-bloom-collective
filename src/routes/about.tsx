import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Container } from "@/components/site/Container";
import { Newsletter } from "@/components/site/Newsletter";
import { authors } from "@/data/articles";

export const Route = createFileRoute("/about")({
  component: About,
  head: () => ({
    meta: [
      { title: "About — Lordiphosa" },
      { name: "description", content: "The story, values, and people behind Lordiphosa." },
      { property: "og:title", content: "About — Lordiphosa" },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
});

function About() {
  return (
    <SiteLayout>
      <Container size="wide" className="pt-16 pb-12">
        <div className="eyebrow">Colophon</div>
        <h1 className="mt-4 font-display text-6xl sm:text-8xl leading-[0.9] tracking-tight max-w-4xl">
          A small publication with old-fashioned ambitions.
        </h1>
      </Container>

      <Container size="prose" className="py-16">
        <div className="prose-editorial">
          <p>
            Lordiphosa began in the spring of 2026 with a plain conviction: that longform writing about craft — done slowly, edited carefully, and untangled from the arithmetic of attention — is still worth doing.
          </p>
          <p>
            We publish essays, guides, interviews, and field notes on the work of building things. That includes software, but it is not only software. It includes typography, editorial practice, tools, teams, and the quiet economics of a life spent making.
          </p>
          <h2>What we believe</h2>
          <p>
            We are not interested in being first. We are interested in being right, and in being kind. We keep the archive clean, the copy honest, the ads absent, and the newsletter free.
          </p>
          <blockquote>
            "The half-life of a framework is about eighteen months. The half-life of an idea in Christopher Alexander is roughly forever."
          </blockquote>
          <h2>How we make money</h2>
          <p>
            Reader support, occasional print editions, and the discipline of small overheads. We do not accept sponsored posts. We do not run tracking scripts. If we ever change our minds about either, we will tell you plainly on this page first.
          </p>
          <h2>Submissions</h2>
          <p>
            We read every pitch, but we publish very few. If you would like to write for us, send a two-paragraph proposal — not a finished essay — to <a href="mailto:pitches@lordiphosa.com">pitches@lordiphosa.com</a>. Expect a reply within two weeks.
          </p>
        </div>
      </Container>

      <Container size="wide" className="py-16 rule-t">
        <div className="mb-8">
          <div className="eyebrow">Masthead</div>
          <h2 className="mt-3 font-display text-4xl">The people</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {authors.map((a) => (
            <div key={a.slug}>
              <div className="h-16 w-16 rounded-full bg-foreground text-background grid place-items-center font-display text-lg">
                {a.initials}
              </div>
              <div className="mt-3 font-display text-xl">{a.name}</div>
              <div className="text-xs uppercase tracking-widest text-ink-soft mt-1">{a.role}</div>
            </div>
          ))}
        </div>
      </Container>

      <Newsletter />
    </SiteLayout>
  );
}