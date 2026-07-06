import { createFileRoute, Link, Outlet, useNavigate, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useIsAdmin } from "@/hooks/useSiteContent";

export const Route = createFileRoute("/_authenticated/admin")({
  component: AdminLayout,
  head: () => ({ meta: [{ title: "Admin — Luxe Floral" }, { name: "robots", content: "noindex" }] }),
});

function AdminLayout() {
  const { data: isAdmin, isLoading } = useIsAdmin();
  const navigate = useNavigate();
  const loc = useLocation();
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? ""));
  }, []);

  async function signOut() {
    await supabase.auth.signOut();
    toast.success("Signed out");
    navigate({ to: "/auth" });
  }

  if (isLoading) {
    return <div className="mx-auto max-w-6xl px-6 py-20 text-sm text-muted-foreground">Loading admin…</div>;
  }

  if (!isAdmin) {
    return (
      <section className="mx-auto max-w-xl px-6 py-20">
        <p className="eyebrow">Access denied</p>
        <h1 className="mt-3 font-serif text-4xl text-foreground">Not an admin</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          You're signed in as <strong>{email}</strong>, but this account doesn't have admin access.
          Ask a site owner to grant you the admin role, then reload.
        </p>
        <button onClick={signOut} className="mt-8 rounded-sm border border-input px-6 py-2.5 text-[11px] uppercase tracking-[0.22em] hover:bg-accent">
          Sign out
        </button>
      </section>
    );
  }

  const tabs = [
    { to: "/admin", label: "Overview" },
    { to: "/admin/content", label: "Site content" },
    { to: "/admin/gallery", label: "Gallery" },
  ] as const;

  return (
    <section className="mx-auto max-w-6xl px-6 py-14">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border/60 pb-6">
        <div>
          <p className="eyebrow">Admin dashboard</p>
          <h1 className="mt-2 font-serif text-3xl text-foreground">Luxe Floral CMS</h1>
        </div>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span>{email}</span>
          <button onClick={signOut} className="uppercase tracking-[0.22em] hover:text-primary">Sign out</button>
        </div>
      </div>
      <nav className="mt-6 flex gap-6 border-b border-border/40">
        {tabs.map((t) => {
          const active = loc.pathname === t.to || (t.to !== "/admin" && loc.pathname.startsWith(t.to));
          return (
            <Link key={t.to} to={t.to}
              className={`-mb-px border-b-2 pb-3 text-[11px] uppercase tracking-[0.22em] ${
                active ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
              }`}>
              {t.label}
            </Link>
          );
        })}
      </nav>
      <div className="mt-10">
        <Outlet />
      </div>
    </section>
  );
}
