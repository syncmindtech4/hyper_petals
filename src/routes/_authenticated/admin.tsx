import { createFileRoute, Link, Outlet, redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { UserButton, SignOutButton } from "@clerk/tanstack-react-start";
import { useIsAdmin } from "@/hooks/useSiteContent";
import { requireAdminUser } from "@/lib/db/auth.server";

// Server-side gate for the whole /admin subtree. This runs before any child
// route (loader or component) so admin-only data can never be fetched by a
// logged-in-but-non-admin user, regardless of what AdminLayout renders below —
// the client-side `useIsAdmin` check in AdminLayout is UI polish on top of
// this, not the actual boundary.
const requireAdminFn = createServerFn().handler(async () => {
  await requireAdminUser();
});

export const Route = createFileRoute("/_authenticated/admin")({
  beforeLoad: async () => {
    try {
      await requireAdminFn();
    } catch {
      throw redirect({ to: "/" });
    }
  },
  component: AdminLayout,
  head: () => ({
    meta: [{ title: "Admin — Hyper Petals Decor" }, { name: "robots", content: "noindex" }],
  }),
});

function AdminLayout() {
  const { data: isAdmin, isLoading } = useIsAdmin();

  if (isLoading) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-20 text-sm text-muted-foreground">
        Loading admin…
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <section className="mx-auto max-w-xl px-6 py-20">
        <p className="eyebrow">Access denied</p>
        <h1 className="mt-3 font-serif text-4xl text-foreground">Not an admin</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          This account doesn't have admin access. Ask a site owner to grant you the admin role, then
          reload.
        </p>
        <div className="mt-8">
          <SignOutButton>
            <button className="rounded-sm border border-input px-6 py-2.5 text-[11px] uppercase tracking-[0.22em] hover:bg-accent">
              Sign out
            </button>
          </SignOutButton>
        </div>
      </section>
    );
  }

  const tabs = [
    { to: "/admin", label: "Overview" },
    { to: "/admin/content", label: "Site content" },
    { to: "/admin/products", label: "Products" },
    { to: "/admin/gallery", label: "Gallery" },
  ] as const;

  return (
    <section className="mx-auto max-w-6xl px-6 py-14">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border/60 pb-6">
        <div>
          <p className="eyebrow">Admin dashboard</p>
          <h1 className="mt-2 font-serif text-3xl text-foreground">Hyper Petals Decor CMS</h1>
        </div>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <UserButton showName />
        </div>
      </div>
      <nav className="mt-6 flex gap-6 border-b border-border/40">
        {tabs.map((t) => (
          <Link
            key={t.to}
            to={t.to}
            activeOptions={{ exact: t.to === "/admin" }}
            activeProps={{ className: "border-primary text-primary" }}
            inactiveProps={{
              className: "border-transparent text-muted-foreground hover:text-foreground",
            }}
            className="-mb-px border-b-2 pb-3 text-[11px] uppercase tracking-[0.22em]"
          >
            {t.label}
          </Link>
        ))}
      </nav>
      <div className="mt-10">
        <Outlet />
      </div>
    </section>
  );
}
