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

export type Topic = {
  name: string;
  slug: string;
  icon: string;
  description: string;
  articleCount: number;
  trendingPercentage: number;
  featured?: boolean;
  coverImage?: string;
  cardStyle?: "featured" | "horizontal" | "standard";
  lastUpdated?: string;
};

import authorElena from "@/assets/author-elena.png";
import authorYusuf from "@/assets/author-yusuf.png";
import authorHana from "@/assets/author-hana.png";
import authorMira from "@/assets/author-mira.png";

import topicAi from "@/assets/topic-ai.png";
import topicCloud from "@/assets/topic-cloud.png";
import topicCybersecurity from "@/assets/topic-cybersecurity.png";
import topicSoftware from "@/assets/topic-software.png";
import topicProgramming from "@/assets/topic-programming.png";
import topicSemiconductors from "@/assets/topic-semiconductors.png";
import topicStartups from "@/assets/topic-startups.png";
import collectionAiFundamentals from "@/assets/collection_ai_fundamentals.png";
import collectionStartupPlaybook from "@/assets/collection_startup_playbook.png";
import collectionFrontendArchitecture from "@/assets/collection_frontend_architecture.png";
import collectionFutureComputing from "@/assets/collection_future_computing.png";

export type Collection = {
  slug: string;
  name: string;
  description: string;
  articleCount: number;
  coverImage: string;
};
export type Author = {
  slug: string;
  name: string;
  initials: string;
  role: string;
  bio: string;
  expertise: string[];
  social: { twitter?: string; site?: string };
  portrait?: string;
  quote?: string;
  stats?: { articles: number; reads: string; badges: string[] };
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
  faqs?: { question: string; answer: string }[];
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

export const popularTopics: Topic[] = [
  {
    name: "Artificial Intelligence",
    slug: "artificial-intelligence",
    icon: "🤖",
    description: "The fastest-growing category this week with new research, engineering breakthroughs, foundation models, and enterprise AI adoption.",
    articleCount: 124,
    trendingPercentage: 18,
    featured: true,
    coverImage: topicAi,
    cardStyle: "featured",
    lastUpdated: "Updated Today",
  },
  {
    name: "Cloud Computing",
    slug: "cloud-computing",
    icon: "☁️",
    description: "Infrastructure, DevOps, Kubernetes, and scalable architectures.",
    articleCount: 76,
    trendingPercentage: 9,
    coverImage: topicCloud,
    cardStyle: "horizontal",
    lastUpdated: "Last Updated 2h ago",
  },
  {
    name: "Cybersecurity",
    slug: "cybersecurity",
    icon: "🔒",
    description: "Threats, defense, and the evolving discipline of protecting modern systems.",
    articleCount: 65,
    trendingPercentage: 14,
    coverImage: topicCybersecurity,
    cardStyle: "standard",
    lastUpdated: "Updated Today",
  },
  {
    name: "Programming",
    slug: "programming",
    icon: "💻",
    description: "Languages, tools, and the craft of writing software that lasts.",
    articleCount: 94,
    trendingPercentage: 5,
    coverImage: topicProgramming,
    cardStyle: "horizontal",
    lastUpdated: "Trending ↑",
  },
  {
    name: "Software Engineering",
    slug: "software-engineering",
    icon: "🛠️",
    description: "Systems, architecture, and the practice of shipping durable code.",
    articleCount: 89,
    trendingPercentage: 12,
    coverImage: topicSoftware,
    cardStyle: "standard",
    lastUpdated: "Updated 4h ago",
  },
  {
    name: "Semiconductors",
    slug: "technology",
    icon: "🔌",
    description: "Hardware, supply chains, and the physical layer of the digital world.",
    articleCount: 42,
    trendingPercentage: 21,
    coverImage: topicSemiconductors,
    cardStyle: "standard",
    lastUpdated: "Trending ↑",
  },
  {
    name: "Startups",
    slug: "startups",
    icon: "🚀",
    description: "How new companies are built, funded, and scaled in the AI era.",
    articleCount: 112,
    trendingPercentage: 15,
    coverImage: topicStartups,
    cardStyle: "horizontal",
    lastUpdated: "Updated Yesterday",
  },
];

export const authors: Author[] = [
  {
    slug: "elena-marchetti",
    name: "Elena Marchetti",
    initials: "EM",
    role: "Editor-in-Chief",
    bio: "Elena writes about applied AI and the economics of modern software. Formerly a senior editor at Wired and a product lead at Stripe.",
    expertise: ["Artificial Intelligence", "Business Innovation", "Software Engineering"],
    social: { twitter: "elenamarch", site: "elena.works" },
    portrait: authorElena,
    quote: "We are not interested in being first to a headline. We are interested in being right, and in explaining why it matters.",
    stats: { articles: 46, reads: "1.2M", badges: ["Verified Writer", "Top Contributor"] },
  },
  {
    slug: "yusuf-adeyemi",
    name: "Yusuf Adeyemi",
    initials: "YA",
    role: "Senior Writer, Infrastructure",
    bio: "Yusuf covers distributed systems, cloud infrastructure, and platform engineering. Previously a staff engineer at Cloudflare.",
    expertise: ["Cloud Infrastructure", "Programming", "Semiconductors"],
    social: { twitter: "yadeyemi" },
    portrait: authorYusuf,
    quote: "The next decade of the internet will be won by whoever can build the most resilient and distributed infrastructure.",
    stats: { articles: 32, reads: "850K", badges: ["Editor's Choice"] },
  },
  {
    slug: "hana-kobayashi",
    name: "Hana Kobayashi",
    initials: "HK",
    role: "Contributing Editor, AI Research",
    bio: "Hana is a machine learning researcher and writer based in Tokyo. Her reporting sits at the intersection of open-source models, evaluation, and policy.",
    expertise: ["Data Science", "Artificial Intelligence", "Robotics"],
    social: { site: "hana.ml" },
    portrait: authorHana,
    quote: "Intelligence is no longer scarce. The new scarcity is finding the right evaluations and building models that we can actually trust.",
    stats: { articles: 18, reads: "420K", badges: ["AI Specialist"] },
  },
  {
    slug: "mira-solberg",
    name: "Mira Solberg",
    initials: "MS",
    role: "Staff Writer, Security & Startups",
    bio: "Mira reports on cybersecurity, developer tooling, and the founders building the next generation of B2B software. Previously at The Information.",
    expertise: ["Cybersecurity", "Programming", "Startups"],
    social: { twitter: "mira_writes" },
    portrait: authorMira,
    quote: "Security is no longer a feature you build at the end. It is the foundation upon which everything else must stand.",
    stats: { articles: 24, reads: "680K", badges: ["Investigative Reporter"] },
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
    faqs: [
      { question: "What are AI agents?", answer: "AI agents are autonomous systems that can perceive their environment, make decisions, and take actions to achieve specific goals, often interacting with other software tools directly." },
      { question: "How are AI agents different from chatbots?", answer: "While chatbots primarily generate text in response to prompts, agents can execute complex multi-step workflows, access external APIs, and autonomously correct errors without human intervention." },
      { question: "Which industries benefit the most?", answer: "Currently, software engineering, customer support, and financial analysis are seeing the most immediate ROI, as these fields rely heavily on structured data and repeatable processes." },
      { question: "Are AI agents replacing traditional software?", answer: "Not entirely. They are acting as intelligent orchestrators that sit on top of traditional APIs and legacy systems, bridging the gap between human intent and software execution." },
      { question: "What skills are needed to work with AI agents?", answer: "System architecture, prompt engineering, and rigorous evaluation design are critical. The focus shifts from writing boilerplate code to defining clear constraints and success metrics." },
      { question: "What are the biggest challenges?", answer: "Reliability, hallucination management, and security (such as preventing prompt injection) remain the most significant hurdles to deploying agents in production environments." },
      { question: "What does the future look like?", answer: "We expect a shift from single monolithic agents to specialized multi-agent systems that collaborate, negotiate, and verify each other's work." }
    ]
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
    faqs: [
      { question: "What exactly is edge computing?", answer: "Edge computing is a distributed computing paradigm that brings computation and data storage closer to the sources of data, reducing response times and saving bandwidth." },
      { question: "How does edge computing reduce latency?", answer: "By processing data locally on devices or nearby edge servers rather than sending it to a centralized data center, the physical distance data must travel is drastically minimized." },
      { question: "Is the centralized cloud becoming obsolete?", answer: "No. The centralized cloud remains essential for heavy training workloads, long-term storage, and complex analytics. The edge is an extension, not a replacement." },
      { question: "What role does 5G play in edge computing?", answer: "5G provides the high-bandwidth, low-latency connectivity required to move data efficiently between edge devices and edge servers, enabling real-time applications." },
      { question: "What are the primary security concerns at the edge?", answer: "Distributed networks inherently expand the attack surface. Securing physical devices, managing identity at the edge, and encrypting data in transit are major challenges." }
    ]
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
    faqs: [
      { question: "What is advanced packaging in semiconductors?", answer: "It refers to assembling multiple distinct silicon components (often called chiplets) into a single package, improving performance and yield compared to monolithic chips." },
      { question: "Why is Moore's Law slowing down?", answer: "Physical limitations at the atomic level make it increasingly difficult and expensive to shrink transistors further without encountering quantum tunneling and heat dissipation issues." },
      { question: "What are chiplets and why are they important?", answer: "Chiplets are smaller, modular chips designed to work together in a single package. They improve manufacturing yields and allow companies to mix and match different process nodes." },
      { question: "How is AI demand impacting chip manufacturing?", answer: "The massive computational requirements for training AI models have driven unprecedented demand for specialized accelerators, straining global fab capacity and driving innovation in memory architectures." },
      { question: "What role does geopolitics play in the semiconductor supply chain?", answer: "Because advanced manufacturing is highly concentrated in a few regions, governments are actively investing in domestic fabs (like the CHIPS Act) to secure supply chains for critical technologies." }
    ]
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
    faqs: [
      { question: "What are React Server Components?", answer: "React Server Components allow developers to render components exclusively on the server, sending zero JavaScript to the client for those specific components, which greatly improves load times." },
      { question: "What is island architecture?", answer: "Island architecture is a paradigm where static HTML is rendered on the server, and only specific interactive sections ('islands') are hydrated with JavaScript on the client." },
      { question: "How does edge rendering differ from traditional SSR?", answer: "Edge rendering performs Server-Side Rendering at CDN nodes globally closer to the user, rather than in a single centralized server, drastically cutting down the time to first byte." },
      { question: "Is single-page application (SPA) architecture dead?", answer: "No, SPAs are still highly relevant for complex, dashboard-heavy applications with rich state. However, content-heavy sites are moving back toward multi-page or hybrid architectures." },
      { question: "How do these modern patterns improve performance?", answer: "By shifting the rendering burden to the server or edge, and sending significantly less JavaScript to the browser, these patterns ensure faster interactivity on low-end devices." }
    ]
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
    faqs: [
      { question: "What is a software supply-chain attack?", answer: "An attack that targets the third-party dependencies, open-source libraries, or build tools used to create software, compromising the final product before it even reaches the customer." },
      { question: "How does prompt injection work in AI applications?", answer: "Prompt injection occurs when a malicious user provides input designed to override the original instructions of a language model, potentially exposing sensitive data or executing unauthorized actions." },
      { question: "Why is memory safety becoming a priority again?", answer: "A vast majority of high-profile vulnerabilities stem from memory management bugs in languages like C/C++. There is a strong industry push to rewrite critical infrastructure in memory-safe languages like Rust." },
      { question: "What is the concept of 'shift left' in security?", answer: "Shift left refers to integrating security practices earlier in the software development lifecycle, rather than treating it as an afterthought just before deployment." },
      { question: "How can small teams implement effective DevSecOps?", answer: "By relying on automated tooling: implementing dependabot, running static analysis in CI pipelines, and enforcing strict least-privilege access rules across infrastructure." }
    ]
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
    faqs: [
      { question: "What defines an 'open weights' AI model?", answer: "Open weights means the trained parameters of the neural network are publicly available, though the training data and code used to produce those weights might remain closed." },
      { question: "Are open-source models as capable as proprietary ones?", answer: "For many enterprise use cases, yes. While top-tier proprietary models still hold the edge in reasoning, open models have rapidly closed the gap and are highly capable when fine-tuned." },
      { question: "What are the risks of open-sourcing powerful AI?", answer: "The primary concern is misuse by bad actors who can remove safety guardrails to generate deepfakes, automate cyberattacks, or produce disinformation at scale." },
      { question: "How are companies monetizing open-source AI?", answer: "Companies are monetizing through managed infrastructure, fine-tuning services, consulting, and building proprietary workflow tools on top of the open foundational models." },
      { question: "What role does community play in model evaluation?", answer: "Crowdsourced leaderboards and community-driven benchmarks (like LMSYS Chatbot Arena) have become the gold standard for unbiased, real-world evaluation of model performance." }
    ]
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
    faqs: [
      { question: "What is vertical AI in the B2B space?", answer: "Vertical AI refers to models and applications tailored to a specific industry—such as legal, healthcare, or real estate—trained on domain-specific data to solve highly specialized problems." },
      { question: "How do 'thin wrappers' evolve into deep products?", answer: "Startups often begin by simply wrapping an LLM API to validate a market, but they build defensibility by accumulating proprietary workflow data, integrating with legacy systems, and refining specialized UX." },
      { question: "Are incumbents at a disadvantage in the AI era?", answer: "Incumbents have distribution and data, which is a massive advantage. However, startups have the agility to completely rethink workflows from the ground up without worrying about legacy technical debt." },
      { question: "What is the most critical metric for AI startups today?", answer: "Beyond traditional SaaS metrics like ARR and churn, AI startups are obsessing over 'time to first value' and 'workflow completion rate'—measuring how often the AI successfully replaces a human task." },
      { question: "How does workflow automation differ from previous generations?", answer: "Previous automation required deterministic, rule-based programming (like RPA). Modern AI automation can handle unstructured data, edge cases, and natural language, making it far more adaptable." }
    ]
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
    faqs: [
      { question: "Why are data teams moving away from traditional notebooks?", answer: "While great for exploration, traditional notebooks often lead to hidden states, lack version control, and are notoriously difficult to refactor into production-ready pipelines." },
      { question: "What is a feature store?", answer: "A feature store is a centralized repository that stores, processes, and serves machine learning features, ensuring consistency between model training and real-time inference." },
      { question: "How do composable pipelines work?", answer: "Composable pipelines allow data engineers to build workflows using modular, reusable components (often powered by tools like dbt or Dagster), reducing redundancy and improving testing." },
      { question: "What does 'evaluation-first' mean in data workflows?", answer: "It means defining the metrics and evaluation harnesses before building the model, ensuring that every iteration is strictly measured against baseline business value." },
      { question: "Which legacy data tools are becoming obsolete?", answer: "Heavy, monolithic ETL platforms are being replaced by lightweight orchestration tools and zero-copy data sharing platforms that operate directly on the modern data warehouse." }
    ]
  }
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
    .filter((a) => a.slug !== article.slug)
    .filter((a) => a.category === article.category || a.tags.some((t) => article.tags.includes(t)))
    .slice(0, limit);
}

export const collections: Collection[] = [
  { slug: "ai-fundamentals", name: "AI Fundamentals", description: "The essential guide to understanding modern artificial intelligence.", articleCount: 24, coverImage: collectionAiFundamentals },
  { slug: "startup-playbook", name: "Startup Playbook", description: "Strategies and lessons from founders building in the AI era.", articleCount: 18, coverImage: collectionStartupPlaybook },
  { slug: "frontend-architecture", name: "Frontend Architecture", description: "Designing resilient, scalable interfaces for the modern web.", articleCount: 32, coverImage: collectionFrontendArchitecture },
  { slug: "future-computing", name: "Future Computing", description: "Quantum, spatial, and the hardware of tomorrow.", articleCount: 15, coverImage: collectionFutureComputing },
  { slug: "cloud-essentials", name: "Cloud Essentials", description: "Distributed systems and cloud-native engineering.", articleCount: 42, coverImage: topicCloud },
  { slug: "chip-design", name: "Chip Design", description: "The physical layer powering the digital revolution.", articleCount: 11, coverImage: topicSemiconductors },
  { slug: "cybersecurity-protocols", name: "Cybersecurity Protocols", description: "Protecting data in an increasingly complex threat landscape.", articleCount: 29, coverImage: topicCybersecurity },
  { slug: "developer-productivity", name: "Developer Productivity", description: "Tools and practices for shipping faster.", articleCount: 37, coverImage: topicSoftware },
];

export const trendingTechnologies = [
  "AI", "Quantum", "Edge Computing", "MCP", "Agentic AI", "Semiconductors", "Cloud Native", "Spatial Computing", "Rust", "WebAssembly"
];

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
}

export function getCollection(slug: string) {
  return collections.find((c) => c.slug === slug);
}
