import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/admin/")({
  component: Overview,
});

function Overview() {
  const { data: galleryCount } = useQuery({
    queryKey: ["admin", "gallery_count"],
    queryFn: async () => {
      const { count } = await (supabase as any)
        .from("gallery_items")
        .select("*", { count: "exact", head: true });
      return count ?? 0;
    },
  });

  const cards = [
    { title: "Site content", body: "Edit hero copy, contact info, and service cards.", to: "/admin/content", cta: "Edit content" },
    { title: "Gallery", body: `${galleryCount ?? 0} media item${galleryCount === 1 ? "" : "s"} on the site. Upload, edit, or remove.`, to: "/admin/gallery", cta: "Manage gallery" },
  ] as const;

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {cards.map((c) => (
        <Link key={c.to} to={c.to} className="group rounded-sm border border-border/70 bg-card p-8 shadow-[var(--shadow-card)] transition-colors hover:border-primary">
          <h2 className="font-serif text-2xl text-foreground">{c.title}</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
          <span className="mt-6 inline-block border-b border-primary pb-1 text-[11px] uppercase tracking-[0.22em] text-primary group-hover:opacity-70">
            {c.cta} →
          </span>
        </Link>
      ))}
    </div>
  );
}
