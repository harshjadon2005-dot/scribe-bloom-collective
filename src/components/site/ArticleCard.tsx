import { Link } from "@tanstack/react-router";
import { type Article, formatDate, getAuthor, getCategory } from "@/data/articles";

function AuthorLine({ authorSlug, date, minutes }: { authorSlug: string; date: string; minutes: number }) {
  const a = getAuthor(authorSlug);
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-soft">
      <span className="text-foreground font-medium">{a?.name}</span>
      <span aria-hidden>·</span>
      <time>{formatDate(date)}</time>
      <span aria-hidden>·</span>
      <span>{minutes} min read</span>
    </div>
  );
}

function CategoryPill({ slug }: { slug: string }) {
  const c = getCategory(slug);
  if (!c) return null;
  return (
    <Link
      to="/categories/$slug"
      params={{ slug }}
      className="eyebrow hover:opacity-70 transition-opacity"
    >
      {c.name}
    </Link>
  );
}

/* -------- FEATURED (hero) -------- */
export function ArticleFeatured({ article }: { article: Article }) {
  return (
    <article className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-center">
      <Link
        to="/articles/$slug"
        params={{ slug: article.slug }}
        className="block lg:col-span-7 group overflow-hidden"
      >
        <div className="aspect-[4/3] overflow-hidden bg-secondary">
          <img
            src={article.cover}
            alt={article.coverAlt}
            width={1600}
            height={1120}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        </div>
      </Link>
      <div className="lg:col-span-5">
        <div className="flex items-center gap-3">
          <CategoryPill slug={article.category} />
          <span className="text-[10px] uppercase tracking-[0.18em] text-ink-soft">
            Featured
          </span>
        </div>
        <h1 className="mt-5 font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.02] tracking-tight">
          <Link to="/articles/$slug" params={{ slug: article.slug }} className="hover:text-accent transition-colors">
            {article.title}
          </Link>
        </h1>
        <p className="mt-6 text-lg text-ink-soft leading-relaxed max-w-lg">
          {article.subtitle}
        </p>
        <div className="mt-8">
          <AuthorLine authorSlug={article.authorSlug} date={article.publishedAt} minutes={article.readingMinutes} />
        </div>
        <Link
          to="/articles/$slug"
          params={{ slug: article.slug }}
          className="mt-8 inline-flex items-center gap-2 text-sm font-medium border-b border-accent pb-1 hover:gap-3 transition-all"
        >
          Read the essay <span aria-hidden>→</span>
        </Link>
      </div>
    </article>
  );
}

/* -------- LANDSCAPE -------- */
export function ArticleLandscape({ article }: { article: Article }) {
  return (
    <article className="grid sm:grid-cols-5 gap-6 group">
      <Link
        to="/articles/$slug"
        params={{ slug: article.slug }}
        className="sm:col-span-2 block overflow-hidden aspect-[4/3] bg-secondary"
      >
        <img
          src={article.cover}
          alt={article.coverAlt}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
      </Link>
      <div className="sm:col-span-3 flex flex-col justify-center">
        <CategoryPill slug={article.category} />
        <h3 className="mt-3 font-display text-2xl sm:text-3xl leading-[1.1] tracking-tight">
          <Link to="/articles/$slug" params={{ slug: article.slug }} className="hover:text-accent transition-colors">
            {article.title}
          </Link>
        </h3>
        <p className="mt-3 text-ink-soft leading-relaxed line-clamp-2">{article.excerpt}</p>
        <div className="mt-4">
          <AuthorLine authorSlug={article.authorSlug} date={article.publishedAt} minutes={article.readingMinutes} />
        </div>
      </div>
    </article>
  );
}

/* -------- VERTICAL -------- */
export function ArticleVertical({ article }: { article: Article }) {
  return (
    <article className="flex flex-col group">
      <Link
        to="/articles/$slug"
        params={{ slug: article.slug }}
        className="block overflow-hidden aspect-[5/4] bg-secondary"
      >
        <img
          src={article.cover}
          alt={article.coverAlt}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
      </Link>
      <div className="mt-5">
        <CategoryPill slug={article.category} />
        <h3 className="mt-3 font-display text-2xl leading-[1.15] tracking-tight">
          <Link to="/articles/$slug" params={{ slug: article.slug }} className="hover:text-accent transition-colors">
            {article.title}
          </Link>
        </h3>
        <p className="mt-2 text-sm text-ink-soft leading-relaxed line-clamp-2">{article.excerpt}</p>
        <div className="mt-4">
          <AuthorLine authorSlug={article.authorSlug} date={article.publishedAt} minutes={article.readingMinutes} />
        </div>
      </div>
    </article>
  );
}

/* -------- COMPACT (numbered list) -------- */
export function ArticleCompact({ article, index }: { article: Article; index: number }) {
  return (
    <article className="grid grid-cols-[auto_1fr] gap-5 py-6 rule-b last:border-b-0 group">
      <div className="font-display text-3xl text-ink-soft/60 leading-none tabular-nums pt-1">
        {String(index + 1).padStart(2, "0")}
      </div>
      <div>
        <CategoryPill slug={article.category} />
        <h4 className="mt-1 font-display text-xl leading-[1.2] tracking-tight">
          <Link to="/articles/$slug" params={{ slug: article.slug }} className="hover:text-accent transition-colors">
            {article.title}
          </Link>
        </h4>
        <div className="mt-2 text-xs text-ink-soft">
          {getAuthor(article.authorSlug)?.name} · {article.readingMinutes} min
        </div>
      </div>
    </article>
  );
}

/* -------- MINIMAL LIST ROW -------- */
export function ArticleRow({ article }: { article: Article }) {
  return (
    <article className="grid grid-cols-[80px_1fr_auto] sm:grid-cols-[120px_1fr_auto] gap-4 sm:gap-8 items-center py-5 rule-b last:border-b-0 group">
      <time className="text-xs font-mono text-ink-soft tabular-nums">
        {new Date(article.publishedAt).toLocaleDateString("en-US", { month: "short", day: "2-digit" })}
      </time>
      <div>
        <div className="flex items-center gap-3">
          <CategoryPill slug={article.category} />
        </div>
        <h4 className="mt-1 font-display text-xl sm:text-2xl leading-[1.2] tracking-tight">
          <Link to="/articles/$slug" params={{ slug: article.slug }} className="group-hover:text-accent transition-colors">
            {article.title}
          </Link>
        </h4>
      </div>
      <div className="text-xs text-ink-soft hidden sm:block whitespace-nowrap">
        {article.readingMinutes} min
      </div>
    </article>
  );
}