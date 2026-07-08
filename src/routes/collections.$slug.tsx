import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Container } from "@/components/site/Container";
import { ArticleFeatured, ArticleVertical, ArticleCompact } from "@/components/site/ArticleCard";
import { getCollection, articles as allArticles, type Article, type Collection } from "@/data/articles";

export const Route = createFileRoute("/collections/$slug")({
  loader: ({ params }) => {
    const collection = getCollection(params.slug);
    if (!collection) throw notFound();
    // Using hardcoded data for now by grabbing some articles from the main list
    const articles = allArticles.slice(0, 8);
    return { collection, articles };
  },
  head: ({ loaderData, params }) => {
    const c = loaderData?.collection;
    if (!c) return {};
    return {
      meta: [
        { title: `${c.name} Collection — Lordiphosa` },
        { name: "description", content: c.description },
        { property: "og:title", content: `${c.name} Collection — Lordiphosa` },
        { property: "og:url", content: `/collections/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/collections/${params.slug}` }],
    };
  },
  component: CollectionPage,
  notFoundComponent: () => (
    <SiteLayout>
      <Container className="py-32 text-center">
        <h1 className="font-display text-4xl">Unknown collection.</h1>
        <Link to="/topics" className="mt-6 inline-block border-b border-accent pb-1">
          Explore topics
        </Link>
      </Container>
    </SiteLayout>
  ),
});

function CollectionPage() {
  const { collection, articles } = Route.useLoaderData() as {
    collection: Collection;
    articles: Article[];
  };
  const [feature, ...rest] = articles;

  return (
    <SiteLayout>
      <Container size="wide" className="pt-16 pb-12">
        <nav aria-label="Breadcrumb" className="text-xs text-ink-soft mb-6">
          <Link to="/" className="hover:text-foreground">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link to="/topics" className="hover:text-foreground">
            Topics
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">Collections</span>
        </nav>
        <div className="eyebrow">Collection</div>
        <h1 className="mt-4 font-display text-5xl sm:text-7xl leading-[0.9] tracking-tight">
          {collection.name}.
        </h1>
        <p className="mt-6 text-xl text-ink-soft max-w-2xl leading-relaxed">
          {collection.description}
        </p>
        <div className="mt-6 text-sm font-mono text-ink-soft">
          {articles.length} {articles.length === 1 ? "piece" : "pieces"} in this collection
        </div>
      </Container>

      {feature ? (
        <>
          <Container size="wide" className="pb-20 rule-t pt-16">
            <ArticleFeatured article={feature} />
          </Container>

          <Container size="wide" className="pb-24">
            <div className="grid lg:grid-cols-12 gap-14">
              <div className="lg:col-span-8 grid sm:grid-cols-2 gap-10">
                {rest.map((a: Article, index: number) => (
                  <ArticleVertical key={a.slug + index} article={a} />
                ))}
              </div>
              <aside className="lg:col-span-4">
                <div className="eyebrow mb-4" style={{ color: "var(--ink-soft)" }}>
                  Popular in {collection.name}
                </div>
                {articles.slice(0, 4).map((a: Article, i: number) => (
                  <ArticleCompact key={a.slug + "-compact-" + i} article={a} index={i} />
                ))}
              </aside>
            </div>
          </Container>
        </>
      ) : (
        <Container className="py-24 text-center">
          <div className="font-display text-3xl">Nothing published here yet.</div>
        </Container>
      )}
    </SiteLayout>
  );
}
