import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/occasions")({
  component: () => <Outlet />,
});
