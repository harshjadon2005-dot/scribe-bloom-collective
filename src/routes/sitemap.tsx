import { createFileRoute } from '@tanstack/react-router';
import { PlaceholderPage } from '@/components/site/PlaceholderPage';

export const Route = createFileRoute('/sitemap')({
  component: () => <PlaceholderPage title="Sitemap" />
});
