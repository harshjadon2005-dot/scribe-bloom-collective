import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Container } from "@/components/site/Container";
import { ArticleRow } from "@/components/site/ArticleCard";
import { articlesByAuthor, getAuthor, type Article, type Author } from "@/data/articles";

export const Route = createFileRoute("/authors/$slug")({
  loader: ({ params }) => {
    const author = getAuthor(params.slug);
    if (!author) throw notFound();
    return { author, articles: articlesByAuthor(params.slug) };
  },
  head: ({ loaderData, params }) => {
    const a = loaderData?.author;
    if (!a) return {};
    return {
      meta: [
        { title: `${a.name} — Lordiphosa` },
        { name: "description", content: a.bio },
        { property: "og:title", content: `${a.name} — Lordiphosa` },
        { property: "og:url", content: `/authors/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/authors/${params.slug}` }],
    };
  },
  component: AuthorPage,
  notFoundComponent: () => (
    <SiteLayout>
      <Container className="py-32 text-center">
        <h1 className="font-display text-4xl">Author not found.</h1>
        <Link to="/authors" className="mt-6 inline-block border-b border-accent pb-1">All authors</Link>
      </Container>
    </SiteLayout>
  ),
});

function AuthorPage() {
  const { author, articles } = Route.useLoaderData() as { author: Author; articles: Article[] };

  return (
    <SiteLayout>
      <Container size="wide" className="pt-16 pb-12">
        <nav aria-label="Breadcrumb" className="text-xs text-ink-soft mb-6">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/authors" className="hover:text-foreground">Authors</Link>
        </nav>

        <div className="grid md:grid-cols-12 gap-10 items-start">
          <div className="md:col-span-4">
            <div className="h-40 w-40 rounded-full bg-foreground text-background grid place-items-center font-display text-6xl">
              {author.initials}
            </div>
          </div>
          <div className="md:col-span-8">
            <div className="eyebrow">{author.role}</div>
            <h1 className="mt-3 font-display text-6xl sm:text-7xl leading-[0.95] tracking-tight">
              {author.name}
            </h1>
            <p className="mt-6 text-xl text-ink-soft leading-relaxed max-w-2xl">
              {author.bio}
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {author.expertise.map((e: string) => (
                <span key={e} className="text-xs uppercase tracking-widest px-3 py-1.5 border border-border rounded-full">
                  {e}
                </span>
              ))}
            </div>
            <div className="mt-8 flex gap-6 text-sm">
              {author.social.twitter && (
                <a href={`https://twitter.com/${author.social.twitter}`} className="border-b border-accent pb-0.5 hover:text-accent">Twitter</a>
              )}
              {author.social.site && (
                <a href={`https://${author.social.site}`} className="border-b border-accent pb-0.5 hover:text-accent">{author.social.site}</a>
              )}
            </div>
          </div>
        </div>
      </Container>

      <Container size="wide" className="pb-24">
        <div className="mb-8 rule-b pb-4">
          <div className="eyebrow">Bibliography</div>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl">
            {articles.length} {articles.length === 1 ? "piece" : "pieces"}
          </h2>
        </div>
        <div className="max-w-4xl">
          {articles.map((a: Article) => (
            <ArticleRow key={a.slug} article={a} />
          ))}
        </div>
      </Container>
    </SiteLayout>
  );
}