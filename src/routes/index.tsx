import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/hero-bouquet.jpg";
import workshop from "@/assets/gallery-workshop.jpg";
import { ProductCard } from "@/components/product-card";
import { site, waLink } from "@/lib/site";
import { useHero } from "@/hooks/useSiteContent";
import { useProducts } from "@/hooks/useProducts";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "Hyper Petals & Decor — Romantic Luxury Florals" },
      {
        name: "description",
        content:
          "Hand-tied bouquets and full-service event florals from Hyper Petals Decor. Order signature arrangements or enquire about your next celebration.",
      },
      { property: "og:title", content: "Hyper Petals & Decor" },
      { property: "og:description", content: "Hand-tied bouquets and full-service event florals." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

function Home() {
  const { data: products, isFetching } = useProducts();
  const featured = products.slice(0, 3);
  const isInitialProductsLoad = isFetching && products.length === 0;
  const { data: h } = useHero();
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 pb-16 pt-14 md:grid-cols-12 md:gap-8 md:pb-24 md:pt-20">
          <div className="md:col-span-6 md:pt-8">
            <p className="eyebrow">{h.eyebrow}</p>
            <h1 className="mt-5 font-serif text-5xl leading-[1.05] text-foreground md:text-[68px]">
              {h.titleLead}
              <span className="italic text-primary"> {h.titleItalic} </span>
            </h1>
            <p className="mt-6 max-w-full text-base leading-relaxed text-muted-foreground">
              {h.subtitle}
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-12">
              <Link
                to="/catalogue"
                className="rounded-lg bg-primary px-7 py-3.5 text-[11px] uppercase tracking-[0.24em] text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Shop bouquets
              </Link>
              <Link
                to="/occasions"
                className="border-b border-foreground/60 pb-1 text-[11px] uppercase tracking-[0.24em] text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                Explore Occasions ↓
              </Link>
            </div>
            <div className="mt-14 sm:grid-col grid max-w-full grid-cols-3 gap-6 border-t border-border/70 pt-8">
              <div>
                <dt className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  {h.stat1Label}
                </dt>
                <dd className="mt-2 font-serif text-2xl text-foreground">{h.stat1Value}</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  {h.stat2Label}
                </dt>
                <dd className="mt-2 font-serif text-2xl text-foreground">{h.stat2Value}</dd>
              </div>
              <div className="lg::hidden max-w-full">
                <dt className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  {h.stat3Label}
                </dt>
                <dd className="mt-2 font-serif text-2xl text-foreground">{h.stat3Value}</dd>
              </div>
            </div>
          </div>

          <div className="relative md:col-span-6">
            <img
              src={hero}
              alt="Luxury bouquet of blush and burgundy roses"
              width={1600}
              height={1200}
              className="aspect-[4/5] w-full rounded-2xl object-cover shadow-[var(--shadow-soft)]"
            />
            <div className="absolute -bottom-6 -left-6 hidden max-w-[240px] rounded-2xl border border-border/60 bg-background/95 p-5 shadow-[var(--shadow-card)] backdrop-blur md:block">
              <div className="absolute inset-0 backdrop-blur-xl rounded-2xl"></div>
              <div className="relative z-10 rounded-2xl">
                <p className="eyebrow">Now Booking</p>
                <p className="mt-2 font-serif text-lg leading-snug text-foreground">
                  Birthday setups for any month of your choice.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="vine-divider">
        <svg viewBox="0 0 640 40" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 20 Q 40 0, 80 20 T 160 20 T 240 20 T 320 20 T 400 20 T 480 20 T 560 20 T 640 20"
            stroke="#1F3D2B"
            stroke-width="1.3"
            fill="none"
          />
          <g fill="#C6992F">
            <circle cx="80" cy="20" r="3" />
            <circle cx="240" cy="20" r="3" />
            <circle cx="400" cy="20" r="3" />
            <circle cx="560" cy="20" r="3" />
          </g>
        </svg>
      </div>

      {/* FEATURED */}
      <section className="border-border/60">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow">Featured</p>
              <h2 className="mt-3 font-serif text-4xl text-foreground md:text-5xl">
                The signature collection
              </h2>
            </div>
            <Link
              to="/gallery"
              className="border-b border-primary pb-1 text-[11px] uppercase tracking-[0.22em] text-primary hover:opacity-70"
            >
              View all bouquets →
            </Link>
          </div>
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {isInitialProductsLoad
              ? Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="aspect-[4/5] rounded-2xl bg-muted/70" />
                    <div className="mt-4 h-3 w-2/3 rounded bg-muted/70" />
                    <div className="mt-2 h-3 w-1/3 rounded bg-muted/70" />
                  </div>
                ))
              : featured.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* STORY */}
      <section className="bg-[oklch(0.955_0.012_60)]">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 py-24 md:grid-cols-2">
          <img
            src={workshop}
            alt="Florist arranging blush and burgundy roses in the studio"
            loading="lazy"
            width={900}
            height={1100}
            className="aspect-[4/5] w-full rounded-sm object-cover"
          />
          <div>
            <p className="eyebrow">Our studio</p>
            <h2 className="mt-3 font-serif text-4xl leading-tight text-foreground md:text-5xl">
              A love letter to flowers, tied by hand.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              We started {site.name} because Kampala deserved florals that felt considered —
              bouquets that arrive quietly beautiful, and event installations that hold their own
              next to the moment they were made for.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Every arrangement is designed and hand-tied in our Kampala studio using seasonal
              blooms sourced from farms we trust.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-border  border-foreground/60 p-2 rounded-xl text-[11px] uppercase tracking-[0.24em] text-foreground hover:border-primary hover:text-primary"
              >
                Message on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA STRIP */}
      <section>
        <div className="mx-auto max-w-7xl px-6 py-10 text-center">
          <p className="eyebrow">Planning something?</p>
          <h2 className="mx-auto mt-4 max-w-7xl font-serif text-4xl leading-tight text-foreground md:text-5xl">
            Birthdays, Baby & Bridal showers, Marriage Proposals, Tea & Corporate Parties, and
            Kwanjula. — tell us the moment, we'll bring the flowers.
          </h2>
          <Link
            to="/contact"
            className="mt-8 inline-flex rounded-sm bg-primary px-8 py-3.5 text-[11px] uppercase tracking-[0.24em] text-primary-foreground hover:bg-primary/90"
          >
            Start an inquiry
          </Link>
        </div>
      </section>
    </>
  );
}
