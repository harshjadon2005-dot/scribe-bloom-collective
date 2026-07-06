import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Container } from "@/components/site/Container";

export const Route = createFileRoute("/terms")({
  component: Terms,
  head: () => ({
    meta: [
      { title: "Terms — Lordiphosa" },
      { name: "description", content: "The rules of the road for reading and republishing Lordiphosa." },
      { property: "og:title", content: "Terms — Lordiphosa" },
      { property: "og:url", content: "/terms" },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
});

function Terms() {
  return (
    <SiteLayout>
      <Container size="prose" className="py-20">
        <div className="eyebrow">Legal</div>
        <h1 className="mt-4 font-display text-5xl leading-[1] tracking-tight">Terms</h1>
        <p className="mt-4 text-sm text-ink-soft">Last updated: July 2026</p>

        <div className="prose-editorial mt-10">
          <p>All writing on Lordiphosa is published under a Creative Commons Attribution-NonCommercial 4.0 license unless otherwise noted at the foot of the piece.</p>
          <h2>You may</h2>
          <ul>
            <li>Quote us at reasonable length with a link back.</li>
            <li>Translate a piece for non-commercial use with credit to the author.</li>
            <li>Print articles for personal or classroom use.</li>
          </ul>
          <h2>You may not</h2>
          <ul>
            <li>Republish an entire piece on a commercial site without our written permission.</li>
            <li>Use our writing to train machine-learning models. Full stop.</li>
            <li>Impersonate our authors or the publication.</li>
          </ul>
          <p>If you are unsure, write to <a href="mailto:letters@lordiphosa.com">letters@lordiphosa.com</a>. We are reasonable people.</p>
        </div>
      </Container>
    </SiteLayout>
  );
}