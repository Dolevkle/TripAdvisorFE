import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/home/kaki")({
  component: HomeKaki,
});

function HomeKaki() {
  return <div>kaki</div>;
}
