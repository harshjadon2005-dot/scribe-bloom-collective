import heroMarbled from "@/assets/hero-marbled.jpg";
import coverBooks from "@/assets/cover-books.jpg";
import coverStairs from "@/assets/cover-stairs.jpg";
import coverDesk from "@/assets/cover-desk.jpg";
import coverBotanical from "@/assets/cover-botanical.jpg";
import coverNotebook from "@/assets/cover-notebook.jpg";

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
  body: string; // markdown-like plain text with paragraphs separated by \n\n
};

export const categories: Category[] = [
  { slug: "essays", name: "Essays", description: "Longform argument and reflection on how we live, work, and make.", articleCount: 24 },
  { slug: "craft", name: "Craft", description: "Field notes on the discipline of building — code, design, and the space between.", articleCount: 18 },
  { slug: "guides", name: "Guides", description: "Careful, practical walkthroughs written by people who ship.", articleCount: 12 },
  { slug: "interviews", name: "Interviews", description: "Conversations with practitioners at the top of their craft.", articleCount: 9 },
  { slug: "field-notes", name: "Field Notes", description: "Short dispatches, observations, and things worth remembering.", articleCount: 31 },
  { slug: "reading", name: "Reading", description: "Books, papers, and passages we return to.", articleCount: 15 },
];

export const authors: Author[] = [
  {
    slug: "elena-marchetti",
    name: "Elena Marchetti",
    initials: "EM",
    role: "Editor-in-Chief",
    bio: "Elena writes about the craft of software and the quiet economics of independent work. Formerly at The Atlantic and Figma.",
    expertise: ["Editorial", "Design Systems", "Product"],
    social: { twitter: "elenamarch", site: "elena.works" },
  },
  {
    slug: "yusuf-adeyemi",
    name: "Yusuf Adeyemi",
    initials: "YA",
    role: "Senior Writer",
    bio: "Yusuf covers systems, infrastructure, and the strange organisms we call teams. He is happiest with a whiteboard and a strong coffee.",
    expertise: ["Systems", "Engineering Culture"],
    social: { twitter: "yadeyemi" },
  },
  {
    slug: "hana-kobayashi",
    name: "Hana Kobayashi",
    initials: "HK",
    role: "Contributing Editor",
    bio: "Hana is a designer and essayist based in Kyoto. Her work sits at the intersection of typography, ritual, and interface.",
    expertise: ["Typography", "Interface Design"],
    social: { site: "hana.type" },
  },
  {
    slug: "mira-solberg",
    name: "Mira Solberg",
    initials: "MS",
    role: "Staff Writer",
    bio: "Mira reports on the tools writers use and the writers who make them. Previously at Longreads.",
    expertise: ["Writing Tools", "Culture"],
    social: { twitter: "mira_writes" },
  },
];

const body = `There is a certain kind of work that resists being finished. You return to it in the morning with fresh coffee, convinced that today will be the day it clicks, and by afternoon you have rewritten the same paragraph seven times without noticeably improving it.

This is not, I want to argue, a failure of discipline. It is the ordinary weather of any project that takes taste seriously.

## The long middle

Beginnings are cheap. Endings, mercifully, are forced upon us. It is the long middle — the months where the shape of the thing is still soft, where nobody outside the room knows whether it will be any good — that consumes most of the actual life of a project.

> Taste is the residue of a thousand small refusals: this word and not that one, this proportion and not the other.

The temptation, in the middle, is to reach for metrics. Word counts. Story points. The soothing arithmetic of progress. And there is a place for that. But the metric will not tell you whether the paragraph is *true*, whether the button *feels* right under the thumb, whether the interview subject actually said what you think they said.

### What senior work looks like

What separates senior work is not speed. It is the quiet willingness to sit inside a decision without collapsing it prematurely into a shipped artifact. To keep two contradictory ideas alive at once, and let the friction between them do its work.

- Notice when a solution arrives too easily. It is usually the shape of a previous problem.
- Prefer the sentence that is slightly harder to write. It is usually more honest.
- When in doubt, cut. The reader will thank you; the writer, eventually, will too.

## A small ritual

I keep a plain notebook on my desk. Not a system. Not an app. A notebook. Every morning I write the same three lines: what I am trying to do today, what I am afraid of, and one sentence I would like to write by evening.

Most days I fail at the third. But the ritual is not really about the sentence.

---

The best essays, the best products, the best anything — they carry the fingerprint of someone who cared past the point of comfort. There is no shortcut around it. There is only the practice, done again tomorrow, and the small consolation that the middle, however long, is where the work actually lives.`;

export const articles: Article[] = [
  {
    slug: "the-long-middle",
    title: "The Long Middle",
    subtitle: "On the ordinary weather of taste, and the discipline of not shipping too soon.",
    excerpt: "There is a certain kind of work that resists being finished. What separates senior work is not speed — it is the willingness to sit inside a decision.",
    cover: heroMarbled,
    coverAlt: "Marbled paper in ink black, cream, and a streak of vermillion.",
    category: "essays",
    tags: ["craft", "writing", "process"],
    authorSlug: "elena-marchetti",
    publishedAt: "2026-06-24",
    updatedAt: "2026-07-01",
    readingMinutes: 9,
    featured: true,
    editorsPick: true,
    body,
  },
  {
    slug: "a-field-guide-to-quiet-interfaces",
    title: "A Field Guide to Quiet Interfaces",
    subtitle: "The best software gets out of the way. Some notes on how that happens.",
    excerpt: "Loud interfaces are easy; quiet ones are the result of a hundred small refusals. A working typology and a set of tests.",
    cover: coverStairs,
    coverAlt: "A curving concrete staircase in warm afternoon light.",
    category: "craft",
    tags: ["design", "interface", "typography"],
    authorSlug: "hana-kobayashi",
    publishedAt: "2026-06-18",
    readingMinutes: 12,
    trending: true,
    editorsPick: true,
    body,
  },
  {
    slug: "on-reading-the-classics-at-work",
    title: "On Reading the Classics at Work",
    subtitle: "Why the best engineers keep a shelf of books that predate their stack.",
    excerpt: "The half-life of a framework is about eighteen months. The half-life of an idea in Christopher Alexander is roughly forever.",
    cover: coverBooks,
    coverAlt: "A stack of cloth-bound books on warm linen.",
    category: "reading",
    tags: ["books", "engineering", "learning"],
    authorSlug: "yusuf-adeyemi",
    publishedAt: "2026-06-11",
    readingMinutes: 7,
    trending: true,
    body,
  },
  {
    slug: "morning-pages-for-builders",
    title: "Morning Pages, for Builders",
    subtitle: "A twenty-minute ritual that fixes more product decisions than most meetings.",
    excerpt: "Julia Cameron's exercise, translated for people who ship. What to write, what to skip, and why the notebook wins over the doc.",
    cover: coverDesk,
    coverAlt: "A wooden desk from above with a fountain pen, ink, newspaper, and coffee.",
    category: "guides",
    tags: ["writing", "rituals", "productivity"],
    authorSlug: "mira-solberg",
    publishedAt: "2026-06-04",
    readingMinutes: 6,
    trending: true,
    body,
  },
  {
    slug: "the-shape-of-attention",
    title: "The Shape of Attention",
    subtitle: "A conversation with Hana Kobayashi on typography as an ethics of care.",
    excerpt: "We spoke in Kyoto about kerning, patience, and what it means to design for people who will never notice you did.",
    cover: coverBotanical,
    coverAlt: "A single dried botanical branch on a warm plaster wall.",
    category: "interviews",
    tags: ["typography", "interview", "design"],
    authorSlug: "elena-marchetti",
    publishedAt: "2026-05-28",
    readingMinutes: 14,
    editorsPick: true,
    body,
  },
  {
    slug: "notes-from-a-week-offline",
    title: "Notes from a Week Offline",
    subtitle: "Seven days without a feed. A quiet, unromantic account.",
    excerpt: "I did not have any epiphanies. I did notice, for the first time in years, the sound of the house.",
    cover: coverNotebook,
    coverAlt: "Hands sketching in a leather notebook by warm window light.",
    category: "field-notes",
    tags: ["attention", "essay"],
    authorSlug: "mira-solberg",
    publishedAt: "2026-05-20",
    readingMinutes: 5,
    body,
  },
  {
    slug: "against-the-dashboard",
    title: "Against the Dashboard",
    subtitle: "Why the most-viewed page in your product is often the most poorly designed.",
    excerpt: "Dashboards are what happens when nobody wants to decide what matters. A polemic, and a way out.",
    cover: coverStairs,
    coverAlt: "A curving staircase in warm shadow.",
    category: "essays",
    tags: ["product", "design"],
    authorSlug: "yusuf-adeyemi",
    publishedAt: "2026-05-12",
    readingMinutes: 8,
    body,
  },
  {
    slug: "what-editors-actually-do",
    title: "What Editors Actually Do",
    subtitle: "A short defense of a much-misunderstood role.",
    excerpt: "Not gatekeeping. Not spellchecking. Something closer to a form of care performed with a red pen.",
    cover: coverBooks,
    coverAlt: "Stack of old books.",
    category: "essays",
    tags: ["editorial", "craft"],
    authorSlug: "elena-marchetti",
    publishedAt: "2026-05-04",
    readingMinutes: 6,
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