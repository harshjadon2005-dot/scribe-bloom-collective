import { createAPIFileRoute } from '@tanstack/react-start/api';
import { articles } from '@/data/articles';

export const APIRoute = createAPIFileRoute('/api/articles')({
  GET: ({ request }) => {
    const url = new URL(request.url);
    const limit = url.searchParams.get('limit');
    const sort = url.searchParams.get('sort');
    const category = url.searchParams.get('category');
    const trending = url.searchParams.get('trending');
    const author = url.searchParams.get('author');
    const search = url.searchParams.get('search');

    let result = [...articles];

    if (category) {
      result = result.filter(a => a.category === category);
    }

    if (trending === 'true') {
      result = result.filter(a => a.trending);
    }

    if (author) {
      result = result.filter(a => a.authorSlug === author);
    }

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(a => 
        a.title.toLowerCase().includes(q) || 
        a.excerpt.toLowerCase().includes(q) ||
        (a.content && a.content.toLowerCase().includes(q))
      );
    }

    if (sort === 'newest') {
      result.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    } else if (sort === 'oldest') {
      result.sort((a, b) => new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime());
    } else if (sort === 'reading') {
      result.sort((a, b) => b.readingMinutes - a.readingMinutes);
    }

    if (limit) {
      result = result.slice(0, parseInt(limit, 10));
    }

    return new Response(JSON.stringify(result), {
      headers: {
        'content-type': 'application/json',
      },
    });
  },
});
