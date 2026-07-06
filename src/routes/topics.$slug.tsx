import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Container } from "@/components/site/Container";
import { ArticleFeatured, ArticleVertical, ArticleCompact } from "@/components/site/ArticleCard";
import { popularTopics, type Article } from "@/data/articles";
import { getArticles } from "@/api";

export const Route = createFileRoute("/topics/$slug")({
  loader: async ({ params }) => {
    const topicSlug = params.slug;
    const allArticles = await getArticles();
    const matchedArticles = allArticles.filter((a) => a.tags.includes(topicSlug));

    if (matchedArticles.length === 0) throw notFound();

    // Find rich topic info if it exists in popularTopics, otherwise generate fallback
    const richTopic = popularTopics.find((t) => t.slug === topicSlug);
    const topicData = richTopic || {
      name: topicSlug
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" "),
      description: `Articles and field notes filed under #${topicSlug}.`,
      slug: topicSlug,
      articleCount: matchedArticles.length,
    };

    return { topic: topicData, articles: matchedArticles };
  },
  head: ({ loaderData, params }) => {
    const t = loaderData?.topic;
    if (!t) return {};
    return {
      meta: [
        { title: `${t.name} — Lordiphosa` },
        { name: "description", content: t.description },
        { property: "og:title", content: `${t.name} — Lordiphosa` },
        { property: "og:url", content: `/topics/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/topics/${params.slug}` }],
    };
  },
  component: TopicPage,
  notFoundComponent: () => (
    <SiteLayout>
      <Container className="py-32 text-center">
        <h1 className="font-display text-4xl">Unknown topic.</h1>
        <Link to="/topics" className="mt-6 inline-block border-b border-accent pb-1">
          Browse all topics
        </Link>
      </Container>
    </SiteLayout>
  ),
});

function TopicPage() {
  const { topic, articles } = Route.useLoaderData() as {
    topic: { name: string; description: string; slug: string; articleCount: number };
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
        </nav>
        <div className="eyebrow">Topic Tag</div>
        <h1 className="mt-4 font-display text-6xl sm:text-8xl leading-[0.9] tracking-tight">
          #{topic.name.toLowerCase()}
        </h1>
        <p className="mt-6 text-xl text-ink-soft max-w-2xl leading-relaxed">{topic.description}</p>
        <div className="mt-6 text-sm font-mono text-ink-soft">
          {articles.length} {articles.length === 1 ? "piece" : "pieces"} with this tag
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
                <div className="eyebrow mb-4" style={{ color: "var(--ink-soft)" }}>
                  Popular in {topic.name}
                </div>
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
    </SiteLayout>
  );
}
