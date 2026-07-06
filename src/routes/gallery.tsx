import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
import { supabase } from "@/integrations/supabase/client";
import wedding from "@/assets/gallery-wedding.jpg";
import arch from "@/assets/gallery-arch.jpg";
import corporate from "@/assets/gallery-corporate.jpg";
import workshop from "@/assets/gallery-workshop.jpg";

export const Route = createFileRoute("/gallery")({
  component: Gallery,
  head: () => ({
    meta: [
      { title: "Bouquets & Event Portfolio — Luxe Floral" },
      { name: "description", content: "Browse Luxe Floral's signature bouquets and a portfolio of past weddings, corporate events, and bespoke floral installations." },
      { property: "og:title", content: "Bouquets & Event Portfolio — Luxe Floral" },
      { property: "og:description", content: "Signature bouquets and a portfolio of past events." },
      { property: "og:url", content: "/gallery" },
    ],
    links: [{ rel: "canonical", href: "/gallery" }],
  }),
});

const eventShots = [
  { src: wedding, alt: "Wedding reception centerpiece", tall: false },
  { src: arch, alt: "Floral wedding arch", tall: true },
  { src: corporate, alt: "Corporate floral installation", tall: false },
  { src: workshop, alt: "Studio bouquet in progress", tall: true },
];

function Gallery() {
  const { data: adminItems = [] } = useQuery({
    queryKey: ["public_gallery"],
    queryFn: async () => {
      const { data } = await (supabase as any)
        .from("gallery_items")
        .select("id,kind,public_url,title,alt_text,caption")
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: false });
      return (data ?? []) as Array<{ id: string; kind: "image" | "video"; public_url: string; title: string | null; alt_text: string | null; caption: string | null }>;
    },
  });
  return (
    <>
      <section className="border-b border-border/60">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
          <p className="eyebrow">Shop</p>
          <h1 className="mt-4 max-w-3xl font-serif text-5xl leading-[1.05] text-foreground md:text-6xl">
            Signature bouquets, ready to order.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Same-day delivery across Kampala on orders placed before 11am. All bouquets are hand-tied in our studio the morning of delivery.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="border-t border-border/60 bg-[oklch(0.955_0.012_60)]">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow">Portfolio</p>
              <h2 className="mt-3 font-serif text-4xl text-foreground md:text-5xl">Events & installations</h2>
            </div>
            <p className="max-w-sm text-sm text-muted-foreground">
              A small sample of recent weddings, corporate installations, and bespoke moments.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {eventShots.map((img, i) => (
              <figure key={i} className={`overflow-hidden rounded-sm bg-muted ${img.tall ? "row-span-2 aspect-[3/5]" : "aspect-[4/5]"} ${i === 0 ? "md:col-span-2 md:row-span-1 md:aspect-[8/5]" : ""}`}>
                <img src={img.src} alt={img.alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
              </figure>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
