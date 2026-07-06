import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function Container({
  children,
  className,
  size = "default",
}: {
  children: ReactNode;
  className?: string;
  size?: "default" | "wide" | "narrow" | "prose";
}) {
  const sizes = {
    narrow: "max-w-2xl",
    prose: "max-w-[680px]",
    default: "max-w-6xl",
    wide: "max-w-[1360px]",
  } as const;
  return (
    <div className={cn("mx-auto w-full px-5 sm:px-8 lg:px-12", sizes[size], className)}>
      {children}
    </div>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  href,
  hrefLabel = "View all",
}: {
  eyebrow?: string;
  title: string;
  href?: string;
  hrefLabel?: string;
}) {
  return (
    <div className="mb-10 flex items-end justify-between gap-6 rule-b pb-4">
      <div>
        {eyebrow && <div className="eyebrow mb-3">{eyebrow}</div>}
        <h2 className="text-3xl sm:text-4xl font-medium leading-none">{title}</h2>
      </div>
      {href && (
        <a
          href={href}
          className="hidden sm:inline-flex items-center gap-2 text-sm text-ink-soft hover:text-foreground transition-colors whitespace-nowrap"
        >
          {hrefLabel}
          <span aria-hidden>→</span>
        </a>
      )}
    </div>
  );
}