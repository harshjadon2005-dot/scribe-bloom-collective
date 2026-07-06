import { createServerFn } from '@tanstack/react-start';
import { articles, authors, categories, type Article, type Author, type Category } from '@/data/articles';
import { z } from 'zod';

// ==========================================
// ARTICLES ENDPOINTS
// ==========================================

export const getArticles = createServerFn({ method: 'GET' })
  .validator(z.object({
    limit: z.number().optional(),
    sort: z.enum(['newest', 'oldest', 'reading']).optional(),
    category: z.string().optional(),
    trending: z.boolean().optional(),
    editorsPick: z.boolean().optional(),
    author: z.string().optional(),
    search: z.string().optional(),
    excludeSlug: z.string().optional()
  }).optional())
  .handler(async ({ data }) => {
    let result = [...articles];

    if (!data) return result;

    if (data.category) {
      result = result.filter(a => a.category === data.category);
    }
    if (data.trending !== undefined) {
      result = result.filter(a => a.trending === data.trending);
    }
    if (data.editorsPick !== undefined) {
      result = result.filter(a => a.editorsPick === data.editorsPick);
    }
    if (data.author) {
      result = result.filter(a => a.authorSlug === data.author);
    }
    if (data.excludeSlug) {
      result = result.filter(a => a.slug !== data.excludeSlug);
    }
    if (data.search) {
      const q = data.search.toLowerCase();
      result = result.filter(a => 
        a.title.toLowerCase().includes(q) || 
        a.excerpt.toLowerCase().includes(q)
      );
    }

    if (data.sort === 'newest') {
      result.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    } else if (data.sort === 'oldest') {
      result.sort((a, b) => new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime());
    } else if (data.sort === 'reading') {
      result.sort((a, b) => b.readingMinutes - a.readingMinutes);
    }

    if (data.limit) {
      result = result.slice(0, data.limit);
    }

    return result;
  });

export const getArticleBySlug = createServerFn({ method: 'GET' })
  .validator(z.object({ slug: z.string() }))
  .handler(async ({ data }) => {
    const article = articles.find(a => a.slug === data.slug);
    if (!article) throw new Error('Article not found');
    return article;
  });

export const getFeaturedArticle = createServerFn({ method: 'GET' })
  .handler(async () => {
    const article = articles.find(a => a.featured);
    return article || articles[0];
  });


// ==========================================
// AUTHORS ENDPOINTS
// ==========================================

export const getAuthors = createServerFn({ method: 'GET' })
  .handler(async () => {
    return authors;
  });

export const getAuthorBySlug = createServerFn({ method: 'GET' })
  .validator(z.object({ slug: z.string() }))
  .handler(async ({ data }) => {
    const author = authors.find(a => a.slug === data.slug);
    if (!author) throw new Error('Author not found');
    return author;
  });


// ==========================================
// TOPICS / CATEGORIES ENDPOINTS
// ==========================================

export const getTopics = createServerFn({ method: 'GET' })
  .handler(async () => {
    return categories;
  });

export const getTopicBySlug = createServerFn({ method: 'GET' })
  .validator(z.object({ slug: z.string() }))
  .handler(async ({ data }) => {
    const topic = categories.find(c => c.slug === data.slug);
    if (!topic) throw new Error('Topic not found');
    return topic;
  });


// ==========================================
// NEWSLETTER ENDPOINT
// ==========================================

export const subscribeToNewsletter = createServerFn({ method: 'POST' })
  .validator(z.object({ email: z.string().email() }))
  .handler(async ({ data }) => {
    // In a real application, you would save this to a database
    // or send it to an external service like Mailchimp/Resend.
    console.log(`Subscribed: ${data.email}`);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return { success: true, message: 'Successfully subscribed to the dispatch.' };
  });
