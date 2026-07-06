import { Container } from "./Container";

export function Newsletter({ compact = false }: { compact?: boolean }) {
  return (
    <section className={compact ? "" : "mt-24"}>
      <Container size={compact ? "default" : "wide"}>
        <div className="grid md:grid-cols-12 gap-8 items-end rule-t rule-b py-16">
          <div className="md:col-span-7">
            <div className="eyebrow mb-4">The Dispatch</div>
            <h3 className="font-display text-4xl sm:text-5xl leading-[1.05] tracking-tight max-w-xl">
              A slow letter, delivered on Sundays.
            </h3>
            <p className="mt-5 text-ink-soft max-w-lg leading-relaxed">
              One considered essay each week, plus three things worth reading. No tracking, no ads, no obligation. Twenty-eight thousand quiet readers already inside.
            </p>
          </div>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="md:col-span-5 flex flex-col gap-3"
          >
            <label htmlFor="nl" className="sr-only">Email address</label>
            <div className="flex rule-b border-foreground focus-within:border-accent transition-colors">
              <input
                id="nl"
                type="email"
                required
                placeholder="you@somewhere.com"
                className="flex-1 bg-transparent py-3 text-lg outline-none placeholder:text-ink-soft/60"
              />
              <button
                type="submit"
                className="ml-4 text-sm font-medium tracking-wide hover:text-accent transition-colors"
              >
                Subscribe →
              </button>
            </div>
            <p className="text-xs text-ink-soft">
              By subscribing you agree to our <a href="/privacy" className="underline decoration-accent underline-offset-2">privacy policy</a>. Unsubscribe any time.
            </p>
          </form>
        </div>
      </Container>
    </section>
  );
}