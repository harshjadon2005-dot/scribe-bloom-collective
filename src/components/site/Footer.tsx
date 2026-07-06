import { Link } from "@tanstack/react-router";
import { Container } from "./Container";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-32 rule-t bg-secondary/50">
      <Container size="wide" className="py-16">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-10">
          <div className="col-span-2 md:col-span-4">
            <div className="font-display text-3xl font-medium leading-none">Lordiphosa</div>
            <p className="mt-4 text-sm text-ink-soft max-w-xs leading-relaxed">
              A publication for the curious. Longform essays, guides, and field notes on design, technology, and the craft of building things that last.
            </p>
          </div>

          <FooterCol
            title="Read"
            links={[
              { to: "/articles", label: "All Articles" },
              { to: "/categories", label: "Categories" },
              { to: "/authors", label: "Authors" },
              { to: "/search", label: "Search" },
            ]}
          />
          <FooterCol
            title="Publication"
            links={[
              { to: "/about", label: "About" },
              { to: "/contact", label: "Contact" },
              { to: "/about", label: "Masthead" },
              { to: "/about", label: "Submissions" },
            ]}
          />
          <FooterCol
            title="Legal"
            links={[
              { to: "/privacy", label: "Privacy" },
              { to: "/terms", label: "Terms" },
              { to: "/contact", label: "Ethics" },
            ]}
          />
          <FooterCol
            title="Elsewhere"
            links={[
              { to: "/", label: "Twitter", external: true },
              { to: "/", label: "RSS", external: true },
              { to: "/", label: "Newsletter", external: true },
            ]}
          />
        </div>

        <div className="mt-16 pt-6 rule-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-ink-soft">
          <div>© {year} Lordiphosa. All rights reserved.</div>
          <div className="font-mono">Printed with care on the open web.</div>
        </div>
      </Container>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { to: string; label: string; external?: boolean }[];
}) {
  return (
    <div className="md:col-span-2">
      <div className="eyebrow mb-4 text-ink-soft" style={{ color: "var(--ink-soft)" }}>{title}</div>
      <ul className="space-y-2.5 text-sm">
        {links.map((l, i) =>
          l.external ? (
            <li key={i}>
              <a href="#" className="hover:text-foreground transition-colors">{l.label}</a>
            </li>
          ) : (
            <li key={i}>
              <Link to={l.to} className="hover:text-foreground transition-colors">{l.label}</Link>
            </li>
          )
        )}
      </ul>
    </div>
  );
}