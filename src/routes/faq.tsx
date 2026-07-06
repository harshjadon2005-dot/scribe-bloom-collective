import { createFileRoute } from '@tanstack/react-router';
import { PlaceholderPage } from '@/components/site/PlaceholderPage';

export const Route = createFileRoute('/faq')({
  component: () => <PlaceholderPage title="FAQ" />
});
