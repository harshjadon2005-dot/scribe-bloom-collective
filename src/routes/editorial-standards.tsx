import { createFileRoute } from '@tanstack/react-router';
import { PlaceholderPage } from '@/components/site/PlaceholderPage';

export const Route = createFileRoute('/editorial-standards')({
  component: () => <PlaceholderPage title="Editorial Standards" />
});
