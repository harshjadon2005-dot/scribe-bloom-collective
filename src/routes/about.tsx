import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Container } from "@/components/site/Container";
import { authors } from "@/data/articles";

export const Route = createFileRoute("/about")({
  component: About,
  head: () => ({
    meta: [
      { title: "About — Lordiphosa" },
      { name: "description", content: "The story, values, and editorial team behind Lordiphosa." },
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
          A modern publication for the people building what comes next.
        </h1>
      </Container>

      <Container size="prose" className="py-16">
        <div className="prose-editorial">
          <p>
            Lordiphosa is a technology publication. We report on artificial intelligence, software
            engineering, cybersecurity, startups, and the infrastructure quietly holding the modern
            world together.
          </p>
          <p>
            We publish essays, field reports, technical guides, and interviews written by
            practitioners — people who have shipped the software they are writing about. We are
            slower than the news cycle on purpose, and we would rather be useful in six months than
            viral this afternoon.
          </p>
          <h2>What we believe</h2>
          <p>
            The interesting questions in technology are almost never the ones being loudly debated
            on any given day. They are the ones a working engineer is quietly wrestling with at
            their desk. Our job is to find those questions, report them out honestly, and explain
            why they matter.
          </p>
          <blockquote>
            "We are not interested in being first to a headline. We are interested in being right,
            and in explaining why it matters."
          </blockquote>
          <h2>How we make money</h2>
          <p>
            Reader support, a small number of vetted job listings, and the discipline of low
            overheads. We do not accept sponsored posts. We do not run tracking scripts. If we ever
            change our minds about either, we will tell you plainly on this page first.
          </p>
          <h2>Submissions</h2>
          <p>
            We read every pitch and publish very few. If you have shipped something interesting and
            can write about it clearly, send a two-paragraph proposal to{" "}
            <a href="mailto:pitches@lordiphosa.com">pitches@lordiphosa.com</a>. Expect a reply
            within two weeks.
          </p>
        </div>
      </Container>

      <Container size="wide" className="py-16 rule-t">
        <div className="mb-8">
          <div className="eyebrow">Masthead</div>
          <h2 className="mt-3 font-display text-4xl">The editorial team</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {authors.map((a) => (
            <div key={a.slug}>
              <div className="h-16 w-16 rounded-full bg-foreground text-background grid place-items-center font-display text-lg">
                {a.initials}
              </div>
              <div className="mt-3 font-display text-xl">{a.name}</div>
              <div className="text-xs uppercase tracking-widest text-ink-soft mt-1">{a.role}</div>
              <p className="mt-3 text-sm text-ink-soft leading-relaxed">{a.bio}</p>
            </div>
          ))}
        </div>
      </Container>
    </SiteLayout>
  );
}
