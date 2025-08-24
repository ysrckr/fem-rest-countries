import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/country/$countryCode")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/country/$countryCode"!</div>;
}
