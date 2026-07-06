import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Container } from "@/components/site/Container";

export const Route = createFileRoute("/privacy")({
  component: Privacy,
  head: () => ({
    meta: [
      { title: "Privacy — Lordiphosa" },
      { name: "description", content: "How Lordiphosa handles reader data." },
      { property: "og:title", content: "Privacy — Lordiphosa" },
      { property: "og:url", content: "/privacy" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
});

function Privacy() {
  return (
    <SiteLayout>
      <Container size="prose" className="py-20">
        <div className="eyebrow">Legal</div>
        <h1 className="mt-4 font-display text-5xl leading-[1] tracking-tight">Privacy</h1>
        <p className="mt-4 text-sm text-ink-soft">Last updated: July 2026</p>

        <div className="prose-editorial mt-10">
          <p>Lordiphosa is designed to be readable without giving anything up. We collect only what is necessary to publish and to send the newsletter you asked for.</p>
          <h2>What we collect</h2>
          <p>If you subscribe to the newsletter, we store your email address and the date you subscribed. That is all.</p>
          <h2>What we do not do</h2>
          <p>We do not use third-party analytics, tracking pixels, behavioural advertising, or fingerprinting. We do not sell, rent, or share reader data. If you never subscribe, we hold nothing about you.</p>
          <h2>Cookies</h2>
          <p>We use one cookie to remember your dark-mode preference. It expires after a year and is never sent to a server.</p>
          <h2>Your rights</h2>
          <p>You can unsubscribe at any time from the footer of any newsletter, or by writing to <a href="mailto:privacy@lordiphosa.com">privacy@lordiphosa.com</a>. On request we will delete every trace of you within seven days.</p>
        </div>
      </Container>
    </SiteLayout>
  );
}