import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { auth } from "@clerk/tanstack-react-start/server";

const checkAuthFn = createServerFn().handler(async () => {
  const { userId } = await auth();
  if (!userId) {
    throw redirect({ to: "/auth" });
  }
  return { userId };
});

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async () => await checkAuthFn(),
  component: () => <Outlet />,
});
