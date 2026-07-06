import { Link } from "@tanstack/react-router";
import { Search, Menu, X, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Container } from "./Container";

const nav = [
  { to: "/articles", label: "Articles" },
  { to: "/trending", label: "Trending" },
  { to: "/topics", label: "Topics" },
  { to: "/authors", label: "Authors" },
  { to: "/about", label: "About" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [dark]);

  return (
    <header className="sticky top-0 z-40 bg-background/85 backdrop-blur-md rule-b">
      <Container size="wide">
        <div className="flex h-16 items-center justify-between gap-6">
          <Link to="/" className="flex items-baseline gap-2 group">
            <span className="font-display text-2xl font-medium tracking-tight leading-none">
              Lordiphosa
            </span>
            <span className="hidden sm:inline text-[10px] uppercase tracking-[0.2em] text-ink-soft">
              Modern Knowledge
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-7">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                activeProps={{ className: "text-foreground" }}
                inactiveProps={{ className: "text-ink-soft" }}
                className="text-sm font-medium hover:text-foreground transition-colors relative py-2"
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <Link
              to="/search"
              aria-label="Search"
              className="h-9 w-9 grid place-items-center rounded-full hover:bg-secondary transition-colors"
            >
              <Search className="h-4 w-4" />
            </Link>
            <button
              onClick={() => setDark((d) => !d)}
              aria-label="Toggle dark mode"
              className="h-9 w-9 grid place-items-center rounded-full hover:bg-secondary transition-colors"
            >
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Menu"
              className="md:hidden h-9 w-9 grid place-items-center rounded-full hover:bg-secondary transition-colors"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </Container>

      {open && (
        <div className="md:hidden rule-t bg-background">
          <Container size="wide">
            <div className="py-4 flex flex-col">
              {nav.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="py-3 text-lg font-display rule-b last:border-b-0"
                >
                  {n.label}
                </Link>
              ))}
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
