import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Container } from "@/components/site/Container";

export const Route = createFileRoute("/contact")({
  component: Contact,
  head: () => ({
    meta: [
      { title: "Contact — Lordiphosa" },
      { name: "description", content: "Write to Lordiphosa. Letters, pitches, and corrections." },
      { property: "og:title", content: "Contact — Lordiphosa" },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
});

function Contact() {
  return (
    <SiteLayout>
      <Container size="wide" className="pt-16 pb-16">
        <div className="eyebrow">Correspondence</div>
        <h1 className="mt-4 font-display text-6xl sm:text-8xl leading-[0.9] tracking-tight max-w-3xl">
          Write to us.
        </h1>
      </Container>

      <Container size="wide" className="pb-24">
        <div className="grid lg:grid-cols-12 gap-14 rule-t pt-16">
          <aside className="lg:col-span-4 space-y-8">
            {[
              {
                label: "Letters",
                email: "letters@lordiphosa.com",
                note: "Reader mail. The best ones appear in the Sunday dispatch.",
              },
              {
                label: "Pitches",
                email: "pitches@lordiphosa.com",
                note: "Two paragraphs, not a finished essay. Reply within two weeks.",
              },
              {
                label: "Corrections",
                email: "corrections@lordiphosa.com",
                note: "We fix and note them at the foot of each piece.",
              },
              {
                label: "Press",
                email: "press@lordiphosa.com",
                note: "For interviews and inquiries.",
              },
            ].map((c) => (
              <div key={c.label} className="rule-b pb-6">
                <div className="eyebrow" style={{ color: "var(--ink-soft)" }}>
                  {c.label}
                </div>
                <a
                  href={`mailto:${c.email}`}
                  className="mt-1 block font-display text-xl hover:text-accent transition-colors break-all"
                >
                  {c.email}
                </a>
                <p className="mt-2 text-sm text-ink-soft leading-relaxed">{c.note}</p>
              </div>
            ))}
          </aside>

          <form onSubmit={(e) => e.preventDefault()} className="lg:col-span-8 space-y-8">
            <div className="grid sm:grid-cols-2 gap-6">
              <Field label="Your name" placeholder="Jane Q. Reader" />
              <Field label="Email" type="email" placeholder="you@somewhere.com" />
            </div>
            <Field label="Subject" placeholder="On the piece about slow work…" />
            <div>
              <label className="eyebrow block mb-2" style={{ color: "var(--ink-soft)" }}>
                Your letter
              </label>
              <textarea
                rows={8}
                placeholder="Take your time."
                className="w-full bg-transparent rule-b border-foreground/60 focus:border-accent transition-colors outline-none py-3 text-lg leading-relaxed resize-none"
              />
            </div>
            <button className="inline-flex items-center gap-2 border-b-2 border-accent pb-1 font-medium hover:gap-3 transition-all">
              Send letter →
            </button>
          </form>
        </div>
      </Container>
    </SiteLayout>
  );
}

function Field({
  label,
  type = "text",
  placeholder,
}: {
  label: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="eyebrow block mb-2" style={{ color: "var(--ink-soft)" }}>
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full bg-transparent rule-b border-foreground/60 focus:border-accent transition-colors outline-none py-3 text-lg"
      />
    </div>
  );
}
