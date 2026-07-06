import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/site/PlaceholderPage";

export const Route = createFileRoute("/credits")({
  component: () => <PlaceholderPage title="Open Source Credits" />,
});
