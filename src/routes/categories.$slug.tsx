import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Container } from "@/components/site/Container";
import { ArticleFeatured, ArticleVertical, ArticleCompact } from "@/components/site/ArticleCard";
import { Newsletter } from "@/components/site/Newsletter";
import { articlesByCategory, getCategory, type Article, type Category } from "@/data/articles";

export const Route = createFileRoute("/categories/$slug")({
  loader: ({ params }) => {
    const category = getCategory(params.slug);
    if (!category) throw notFound();
    return { category, articles: articlesByCategory(params.slug) };
  },
  head: ({ loaderData, params }) => {
    const c = loaderData?.category;
    if (!c) return {};
    return {
      meta: [
        { title: `${c.name} — Lordiphosa` },
        { name: "description", content: c.description },
        { property: "og:title", content: `${c.name} — Lordiphosa` },
        { property: "og:url", content: `/categories/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/categories/${params.slug}` }],
    };
  },
  component: CategoryPage,
  notFoundComponent: () => (
    <SiteLayout>
      <Container className="py-32 text-center">
        <h1 className="font-display text-4xl">Unknown subject.</h1>
        <Link to="/categories" className="mt-6 inline-block border-b border-accent pb-1">All categories</Link>
      </Container>
    </SiteLayout>
  ),
});

function CategoryPage() {
  const { category, articles } = Route.useLoaderData() as { category: Category; articles: Article[] };
  const [feature, ...rest] = articles;

  return (
    <SiteLayout>
      <Container size="wide" className="pt-16 pb-12">
        <nav aria-label="Breadcrumb" className="text-xs text-ink-soft mb-6">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/categories" className="hover:text-foreground">Categories</Link>
        </nav>
        <div className="eyebrow">Subject</div>
        <h1 className="mt-4 font-display text-6xl sm:text-8xl leading-[0.9] tracking-tight">
          {category.name}.
        </h1>
        <p className="mt-6 text-xl text-ink-soft max-w-2xl leading-relaxed">
          {category.description}
        </p>
        <div className="mt-6 text-sm font-mono text-ink-soft">
          {articles.length} {articles.length === 1 ? "piece" : "pieces"} in this subject
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
                {rest.map((a: Article) => (
                  <ArticleVertical key={a.slug} article={a} />
                ))}
              </div>
              <aside className="lg:col-span-4">
                <div className="eyebrow mb-4" style={{ color: "var(--ink-soft)" }}>Popular in {category.name}</div>
                {articles.slice(0, 4).map((a: Article, i: number) => (
                  <ArticleCompact key={a.slug} article={a} index={i} />
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

      <Newsletter />
    </SiteLayout>
  );
}