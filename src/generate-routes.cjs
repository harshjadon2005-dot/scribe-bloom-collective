const fs = require('fs');
const path = require('path');
const routes = [
  { file: 'archive.tsx', title: 'Archive' },
  { file: 'collections.tsx', title: 'Collections' },
  { file: 'editorial-standards.tsx', title: 'Editorial Standards' },
  { file: 'faq.tsx', title: 'FAQ' },
  { file: 'masthead.tsx', title: 'Masthead' },
  { file: 'careers.tsx', title: 'Careers' },
  { file: 'rss.tsx', title: 'RSS Feed' },
  { file: 'changelog.tsx', title: 'Changelog' },
  { file: 'style-guide.tsx', title: 'Style Guide' },
  { file: 'accessibility.tsx', title: 'Accessibility' },
  { file: 'credits.tsx', title: 'Open Source Credits' },
  { file: 'newsletter.tsx', title: 'Newsletter Subscription' },
  { file: 'sitemap.tsx', title: 'Sitemap' },
];

const basePath = 'c:\\Users\\harsh\\Downloads\\scribe-bloom-collective-main\\scribe-bloom-collective-main\\src\\routes';

routes.forEach(route => {
  const content = `import { createFileRoute } from '@tanstack/react-router';
import { PlaceholderPage } from '@/components/site/PlaceholderPage';

export const Route = createFileRoute('/${route.file.replace('.tsx', '')}')({
  component: () => <PlaceholderPage title="${route.title}" />
});
`;
  fs.writeFileSync(path.join(basePath, route.file), content);
});
console.log('Routes generated successfully.');
