import heroAiFuture from "@/assets/hero-ai-future.jpg";
import coverAiAgents from "@/assets/cover-ai-agents.jpg";
import coverEdgeComputing from "@/assets/cover-edge-computing.jpg";
import coverSemiconductors from "@/assets/cover-semiconductors.jpg";
import coverFrontend from "@/assets/cover-frontend.jpg";
import coverCybersecurity from "@/assets/cover-cybersecurity.jpg";
import coverOpenSourceAi from "@/assets/cover-open-source-ai.jpg";

export type Category = {
  slug: string;
  name: string;
  description: string;
  articleCount: number;
};

export type Author = {
  slug: string;
  name: string;
  initials: string;
  role: string;
  bio: string;
  expertise: string[];
  social: { twitter?: string; site?: string };
};

export type Article = {
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  cover: string;
  coverAlt: string;
  category: string; // slug
  tags: string[];
  authorSlug: string;
  publishedAt: string; // ISO
  updatedAt?: string;
  readingMinutes: number;
  featured?: boolean;
  trending?: boolean;
  editorsPick?: boolean;
  body: string;
};

export const categories: Category[] = [
  { slug: "artificial-intelligence", name: "Artificial Intelligence", description: "Frontier models, agents, and how machine intelligence is reshaping software.", articleCount: 42 },
  { slug: "software-engineering", name: "Software Engineering", description: "Systems, architecture, and the practice of shipping durable code.", articleCount: 38 },
  { slug: "cybersecurity", name: "Cybersecurity", description: "Threats, defense, and the evolving discipline of protecting modern systems.", articleCount: 26 },
  { slug: "cloud-computing", name: "Cloud Computing", description: "Distributed infrastructure, edge, and the platforms powering the internet.", articleCount: 29 },
  { slug: "startups", name: "Startups", description: "How new companies are built, funded, and scaled in the AI era.", articleCount: 31 },
  { slug: "programming", name: "Programming", description: "Languages, tools, and the craft of writing software that lasts.", articleCount: 24 },
  { slug: "data-science", name: "Data Science", description: "From data pipelines to production ML, and the teams behind them.", articleCount: 19 },
  { slug: "technology", name: "Technology", description: "Hardware, semiconductors, and the physical layer of the digital world.", articleCount: 22 },
  { slug: "business", name: "Business", description: "Strategy, markets, and the economics of technology at scale.", articleCount: 18 },
  { slug: "future-trends", name: "Future Trends", description: "Emerging ideas and the shape of technology over the next decade.", articleCount: 15 },
];

export const authors: Author[] = [
  {
    slug: "elena-marchetti",
    name: "Elena Marchetti",
    initials: "EM",
    role: "Editor-in-Chief",
    bio: "Elena writes about applied AI and the economics of modern software. Formerly a senior editor at Wired and a product lead at Stripe.",
    expertise: ["AI Strategy", "Product", "Editorial"],
    social: { twitter: "elenamarch", site: "elena.works" },
  },
  {
    slug: "yusuf-adeyemi",
    name: "Yusuf Adeyemi",
    initials: "YA",
    role: "Senior Writer, Infrastructure",
    bio: "Yusuf covers distributed systems, cloud infrastructure, and platform engineering. Previously a staff engineer at Cloudflare.",
    expertise: ["Distributed Systems", "Edge", "Platform Engineering"],
    social: { twitter: "yadeyemi" },
  },
  {
    slug: "hana-kobayashi",
    name: "Hana Kobayashi",
    initials: "HK",
    role: "Contributing Editor, AI Research",
    bio: "Hana is a machine learning researcher and writer based in Tokyo. Her reporting sits at the intersection of open-source models, evaluation, and policy.",
    expertise: ["LLMs", "ML Research", "Open Source"],
    social: { site: "hana.ml" },
  },
  {
    slug: "mira-solberg",
    name: "Mira Solberg",
    initials: "MS",
    role: "Staff Writer, Security & Startups",
    bio: "Mira reports on cybersecurity, developer tooling, and the founders building the next generation of B2B software. Previously at The Information.",
    expertise: ["Security", "Developer Tools", "Startups"],
    social: { twitter: "mira_writes" },
  },
];

const body = `The last twelve months rewrote what an "agent" actually is. What was, until recently, a shell script wrapped around an LLM has become something closer to a colleague — one that reads your codebase, files pull requests, and quietly waits for a nod before merging.

We are not, to be clear, in the era of general autonomy. The systems shipping today are narrow, supervised, and — when they work — genuinely useful in the same unglamorous way that a good linter is useful.

## From chat to workflow

The first generation of AI products treated the chatbox as the product. The next generation is treating the chatbox as an implementation detail, and the workflow as the product. That shift is what makes agents feel different this year: they live inside the tools you already use, not in a separate tab.

> The interesting question is no longer "can the model do this task?" It is "who is accountable when it does?"

Consider the shape of a modern coding agent. It has read access to a repository, write access to a branch, and the ability to open a pull request. Everything past that — review, merge, deploy — remains human. The model is fast; the guardrails are slow on purpose.

### What senior teams are actually doing

The teams getting real value from agents right now share a few habits:

- They treat the agent as a junior engineer with unlimited energy and no judgment. They give it small, well-specified tasks and review every diff.
- They invest more in evaluation than in prompting. A good eval harness catches regressions that no amount of prompt engineering can prevent.
- They keep humans in the loop at every irreversible step — production deploys, customer emails, financial transactions.
- They budget for the fact that models change under them. Today's best model is next quarter's baseline.

## The infrastructure question

Behind every good agent is an unglamorous stack: a vector store that actually returns relevant results, a queue that handles retries without duplication, and an observability layer that lets you replay a failed run. None of this is new. All of it is suddenly load-bearing.

The companies that will win the next few years are not necessarily the ones with the best models. They are the ones with the cleanest data, the tightest feedback loops, and the discipline to say no to demos that would not survive contact with a real customer.

---

Agents are not magic. They are a new kind of software, with a new set of failure modes, deployed against problems that mostly predate them. The teams that internalize that — and resist the temptation to ship the demo — will build the products that matter.`;

export const articles: Article[] = [
  {
    slug: "the-future-of-ai-agents-in-2026",
    title: "The Future of AI Agents in 2026",
    subtitle: "How autonomous systems are moving from novelty to load-bearing infrastructure inside real engineering teams.",
    excerpt: "Agents have quietly become colleagues. A field report on what shipped, what broke, and what the next twelve months actually look like.",
    cover: heroAiFuture,
    coverAlt: "A robotic hand reaching toward a burst of luminous data particles.",
    category: "artificial-intelligence",
    tags: ["ai agents", "llms", "automation", "engineering"],
    authorSlug: "elena-marchetti",
    publishedAt: "2026-06-28",
    updatedAt: "2026-07-04",
    readingMinutes: 11,
    featured: true,
    trending: true,
    editorsPick: true,
    body,
  },
  {
    slug: "why-edge-computing-is-becoming-essential",
    title: "Why Edge Computing Is Becoming Essential",
    subtitle: "Latency, sovereignty, and the quiet migration of workloads out of the hyperscaler core.",
    excerpt: "The centralized cloud is not going away. But the compute that matters most — inference, personalization, real-time video — is moving closer to the user, and the economics are finally working.",
    cover: coverEdgeComputing,
    coverAlt: "A row of edge computing server racks lit by teal status LEDs.",
    category: "cloud-computing",
    tags: ["edge", "cloud", "infrastructure", "latency"],
    authorSlug: "yusuf-adeyemi",
    publishedAt: "2026-06-22",
    readingMinutes: 9,
    trending: true,
    editorsPick: true,
    body,
  },
  {
    slug: "inside-the-next-wave-of-semiconductor-innovation",
    title: "Inside the Next Wave of Semiconductor Innovation",
    subtitle: "Chiplets, advanced packaging, and the fabs betting on a post-Moore world.",
    excerpt: "The single-die era is quietly ending. Inside the design wins, packaging bets, and geopolitical currents shaping the next decade of silicon.",
    cover: coverSemiconductors,
    coverAlt: "Iridescent macro photograph of a silicon semiconductor wafer.",
    category: "technology",
    tags: ["semiconductors", "hardware", "chips", "manufacturing"],
    authorSlug: "yusuf-adeyemi",
    publishedAt: "2026-06-17",
    readingMinutes: 13,
    trending: true,
    body,
  },
  {
    slug: "modern-frontend-architecture-explained",
    title: "Modern Frontend Architecture Explained",
    subtitle: "Server components, islands, and edge rendering — a working map of where the web is actually going.",
    excerpt: "The frontend stack has never been more fragmented, and never more coherent. A practical guide to the patterns that survived the last two years.",
    cover: coverFrontend,
    coverAlt: "A curved monitor showing code in a dimly lit developer workspace.",
    category: "software-engineering",
    tags: ["frontend", "react", "architecture", "web"],
    authorSlug: "hana-kobayashi",
    publishedAt: "2026-06-10",
    readingMinutes: 12,
    trending: true,
    editorsPick: true,
    body,
  },
  {
    slug: "cybersecurity-trends-every-developer-should-know",
    title: "Cybersecurity Trends Every Developer Should Know",
    subtitle: "Supply-chain attacks, prompt injection, and the quiet return of memory safety.",
    excerpt: "Security is no longer a separate team's job. Six trends every engineer should understand — and the practical steps that make the difference.",
    cover: coverCybersecurity,
    coverAlt: "A glowing padlock composed of data streams over a dark grid.",
    category: "cybersecurity",
    tags: ["security", "supply chain", "devsecops"],
    authorSlug: "mira-solberg",
    publishedAt: "2026-06-03",
    readingMinutes: 8,
    trending: true,
    body,
  },
  {
    slug: "the-rise-of-open-source-ai-models",
    title: "The Rise of Open Source AI Models",
    subtitle: "How open weights went from academic curiosity to production default in eighteen months.",
    excerpt: "The gap between open and closed models has narrowed faster than almost anyone predicted. A look at the ecosystems, licenses, and teams driving the shift.",
    cover: coverOpenSourceAi,
    coverAlt: "A luminous wireframe brain rendered in warm amber against a dark background.",
    category: "artificial-intelligence",
    tags: ["open source", "llms", "models", "research"],
    authorSlug: "hana-kobayashi",
    publishedAt: "2026-05-27",
    readingMinutes: 10,
    editorsPick: true,
    body,
  },
  {
    slug: "how-startups-are-rebuilding-b2b-software-with-ai",
    title: "How Startups Are Rebuilding B2B Software with AI",
    subtitle: "The playbook has changed. What the fastest-growing seed-stage companies of 2026 are doing differently.",
    excerpt: "Vertical AI, thin wrappers turned deep products, and the founders quietly displacing incumbents one workflow at a time.",
    cover: coverAiAgents,
    coverAlt: "Glowing neural network of blue and orange nodes on a dark background.",
    category: "startups",
    tags: ["startups", "b2b", "saas", "ai"],
    authorSlug: "mira-solberg",
    publishedAt: "2026-05-19",
    readingMinutes: 7,
    body,
  },
  {
    slug: "inside-the-new-data-science-stack",
    title: "Inside the New Data Science Stack",
    subtitle: "Notebooks are out. Composable pipelines, feature stores, and evaluation-first workflows are in.",
    excerpt: "The tools data teams actually reach for in 2026 — and the ones that quietly disappeared from the stack.",
    cover: coverFrontend,
    coverAlt: "A developer workstation with data pipelines on screen.",
    category: "data-science",
    tags: ["data", "ml", "pipelines", "tools"],
    authorSlug: "elena-marchetti",
    publishedAt: "2026-05-11",
    readingMinutes: 9,
    body,
  },
];

export function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug);
}
export function getAuthor(slug: string) {
  return authors.find((a) => a.slug === slug);
}
export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}
export function articlesByCategory(slug: string) {
  return articles.filter((a) => a.category === slug);
}
export function articlesByAuthor(slug: string) {
  return articles.filter((a) => a.authorSlug === slug);
}
export function relatedTo(article: Article, limit = 3) {
  return articles
    .filter((a) => a.slug !== article.slug && (a.category === article.category || a.tags.some((t) => article.tags.includes(t))))
    .slice(0, limit);
}
export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}
