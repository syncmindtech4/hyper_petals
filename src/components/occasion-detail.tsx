// import { Link } from "@tanstack/react-router";
// import { site, waLink } from "@/lib/site";

// export type Tier = {
//   tag: string;
//   amount: string;
//   items: string[];
//   featured?: boolean;
// };

// export type OccasionConfig = {
//   slug: string;
//   eyebrow: string;
//   title: React.ReactNode;
//   intro: string;
//   heroImage: string;
//   heroGradient: string; // tailwind arbitrary gradient e.g. "from-[#3a2c10] to-[#122219]"
//   accent?: "wine" | "gold";
//   chips?: string[];
//   included: { title: string; body: string }[];
//   gallery: string[]; // image srcs
//   galleryHeading?: string;
//   tiers: Tier[];
//   testimonial: { quote: string; cite: string };
//   extra?: React.ReactNode; // e.g. venue strip, clan note
// };

// export function OccasionDetail({ cfg }: { cfg: OccasionConfig }) {
//   const quoteMsg = `Hi Luxe Floral, I'd love a quote for ${cfg.eyebrow.toLowerCase()}.`;
//   const isGold = cfg.accent === "gold";
//   return (
//     <div>
//       {/* Back bar */}
//       <div className="sticky top-[64px] z-30 border-b border-border/60 bg-background/90 backdrop-blur">
//         <div className="mx-auto max-w-7xl px-6 py-4">
//           <Link
//             to="/occasions"
//             className="inline-flex items-center gap-2 text-[13px] text-primary hover:opacity-70"
//           >
//             ← Back to Occasions
//           </Link>
//         </div>
//       </div>

//       {/* Hero */}
//       <section
//         className={`relative overflow-hidden bg-gradient-to-br ${cfg.heroGradient} text-[color:var(--cream)]`}
//       >
//         <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 md:grid-cols-[1.1fr_.9fr] md:py-24">
//           <div>
//             <p className={`eyebrow ${isGold ? "!text-[#E4C877]" : "!text-[#E8B7B4]"}`}>
//               {cfg.eyebrow}
//             </p>
//             <h1 className="mt-4 font-serif text-4xl leading-[1.05] md:text-5xl">{cfg.title}</h1>
//             <p className="mt-6 max-w-lg text-base leading-relaxed text-white/80">{cfg.intro}</p>
//             <div className="mt-8 flex flex-wrap items-center gap-4">
//               <a
//                 href={waLink(quoteMsg)}
//                 target="_blank"
//                 rel="noreferrer"
//                 className={`inline-flex rounded-xl px-7 py-3.5 text-[11px] uppercase tracking-[0.24em] transition-opacity hover:opacity-90 ${
//                   isGold ? "bg-[#C6992F] text-[#0d1a13]" : "bg-primary text-primary-foreground"
//                 }`}
//               >
//                 Get a quote
//               </a>
//               <Link
//                 to="/contact"
//                 className="border-b border-white/60 pb-1 text-[11px] uppercase tracking-[0.24em] text-white/90 hover:opacity-70"
//               >
//                 Contact us ↓
//               </Link>
//             </div>
//             {cfg.chips && (
//               <div className="mt-6 flex flex-wrap gap-2">
//                 {cfg.chips.map((c) => (
//                   <span
//                     key={c}
//                     className="rounded-full border border-white/25 px-4 py-1.5 text-[12px] text-white/85"
//                   >
//                     {c}
//                   </span>
//                 ))}
//               </div>
//             )}
//           </div>
//           <div className="aspect-[4/5] w-full overflow-hidden rounded-3xl shadow-2xl">
//             <img src={cfg.heroImage} alt={cfg.eyebrow} className="h-full w-full object-cover" />
//           </div>
//         </div>
//       </section>

//       {/* What's included */}
//       <section className="border-b border-border/60">
//         <div className="mx-auto max-w-7xl px-6 py-20">
//           <p className="eyebrow">What's included</p>
//           <h2 className="mt-3 max-w-2xl font-serif text-3xl text-foreground md:text-4xl">
//             A setup that looks as good as it feels.
//           </h2>
//           <div className="mt-10 grid gap-px bg-border md:grid-cols-3">
//             {cfg.included.map((i) => (
//               <div key={i.title} className="bg-background p-8">
//                 <h3 className="font-serif text-xl text-foreground">{i.title}</h3>
//                 <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{i.body}</p>
//               </div>
//             ))}
//           </div>
//           {cfg.extra}
//         </div>
//       </section>

//       {/* Gallery */}
//       <section className="bg-[oklch(0.955_0.012_60)]">
//         <div className="mx-auto max-w-7xl px-6 py-20">
//           <p className="eyebrow">Recent setups</p>
//           <h2 className="mt-3 font-serif text-3xl text-foreground md:text-4xl">
//             {cfg.galleryHeading ?? "Real events, real moments."}
//           </h2>
//           <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4 md:auto-rows-[160px]">
//             {cfg.gallery.map((src, i) => (
//               <div
//                 key={i}
//                 className={`overflow-hidden rounded-2xl ${i % 3 === 0 ? "md:row-span-2" : ""}`}
//               >
//                 <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Testimonial */}
//       <section className="bg-background">
//         <div className="mx-auto max-w-3xl px-6 py-24 text-center">
//           <p className="font-serif text-2xl italic leading-snug text-foreground md:text-3xl">
//             “{cfg.testimonial.quote}”
//           </p>
//           <p className="mt-6 text-sm text-muted-foreground">{cfg.testimonial.cite}</p>
//         </div>
//       </section>

//       {/* Quote CTA */}
//       <section className="bg-primary text-primary-foreground">
//         <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 md:grid-cols-2">
//           <div>
//             <p className="eyebrow !text-[#E8B7B4]">Request a Quote</p>
//             <h2 className="mt-3 font-serif text-4xl leading-tight md:text-5xl">
//               Let's plan the moment.
//             </h2>
//             <p className="mt-5 max-w-md text-white/85">
//               Share a few details and a stylist will reply — usually the same day. Deposits by MTN
//               MoMo or Airtel Money.
//             </p>
//           </div>
//           <div className="flex flex-col justify-center gap-4 md:items-end">
//             <a
//               href={waLink(quoteMsg)}
//               target="_blank"
//               rel="noreferrer"
//               className="inline-flex rounded-2xl bg-background px-8 py-4 text-[11px] uppercase tracking-[0.24em] text-primary hover:opacity-90"
//             >
//               WhatsApp {site.phone}
//             </a>
//             <Link
//               to="/contact"
//               className="border-b border-white/60 pb-1 text-[11px] uppercase tracking-[0.24em] text-white/90 hover:opacity-70"
//             >
//               Send a message →
//             </Link>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

import { Link } from "@tanstack/react-router";
import { site, waLink } from "@/lib/site";
import { MediaCarousel, type CarouselItem } from "@/components/media-carousel";

export type Tier = {
  tag: string;
  amount: string;
  items: string[];
  featured?: boolean;
};

export type OccasionConfig = {
  slug: string;
  eyebrow: string;
  title: React.ReactNode;
  intro: string;
  heroImage: string;
  heroGradient: string; // tailwind arbitrary gradient e.g. "from-[#3a2c10] to-[#122219]"
  accent?: "wine" | "gold";
  chips?: string[];
  included: { title: string; body: string }[];
  gallery: string[] | CarouselItem[]; // image srcs, or full carousel items (images/video)
  galleryHeading?: string;
  tiers?: Tier[];
  testimonial: { quote: string; cite: string };
  extra?: React.ReactNode; // e.g. venue strip, clan note
};

export function OccasionDetail({ cfg }: { cfg: OccasionConfig }) {
  const quoteMsg = `Hi Luxe Floral, I'd love a quote for ${cfg.eyebrow.toLowerCase()}.`;
  const isGold = cfg.accent === "gold";
  const galleryItems: CarouselItem[] = cfg.gallery.map((g) =>
    typeof g === "string" ? { src: g } : g,
  );
  return (
    <div>
      {/* Back bar */}
      <div className="sticky top-[64px] z-30 border-b border-border/60 bg-background/90 backdrop-blur">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <Link
            to="/occasions"
            className="inline-flex items-center gap-2 text-[13px] text-primary hover:opacity-70"
          >
            ← Back to Occasions
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section
        className={`relative overflow-hidden bg-gradient-to-br ${cfg.heroGradient} text-[color:var(--cream)]`}
      >
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 md:grid-cols-[1.1fr_.9fr] md:py-24">
          <div>
            <p className={`eyebrow ${isGold ? "!text-[#E4C877]" : "!text-[#E8B7B4]"}`}>
              {cfg.eyebrow}
            </p>
            <h1 className="mt-4 font-serif text-4xl leading-[1.05] md:text-5xl">{cfg.title}</h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-white/80">{cfg.intro}</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={waLink(quoteMsg)}
                target="_blank"
                rel="noreferrer"
                className={`inline-flex rounded-xl px-7 py-3.5 text-[11px] uppercase tracking-[0.24em] transition-opacity hover:opacity-90 ${
                  isGold ? "bg-[#C6992F] text-[#0d1a13]" : "bg-primary text-primary-foreground"
                }`}
              >
                Get a quote
              </a>
              <Link
                to="/contact"
                className="border-b border-white/60 pb-1 text-[11px] uppercase tracking-[0.24em] text-white/90 hover:opacity-70"
              >
                Contact us ↓
              </Link>
            </div>
            {cfg.chips && (
              <div className="mt-6 flex flex-wrap gap-2">
                {cfg.chips.map((c) => (
                  <span
                    key={c}
                    className="rounded-full border border-white/25 px-4 py-1.5 text-[12px] text-white/85"
                  >
                    {c}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="aspect-[4/5] w-full overflow-hidden rounded-3xl shadow-2xl">
            <img src={cfg.heroImage} alt={cfg.eyebrow} className="h-full w-full object-cover" />
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="border-b border-border/60">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <p className="eyebrow">What's included</p>
          <h2 className="mt-3 max-w-2xl font-serif text-3xl text-foreground md:text-4xl">
            A setup that looks as good as it feels.
          </h2>
          <div className="mt-10 grid gap-px bg-border md:grid-cols-3">
            {cfg.included.map((i) => (
              <div key={i.title} className="bg-background p-8">
                <h3 className="font-serif text-xl text-foreground">{i.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{i.body}</p>
              </div>
            ))}
          </div>
          {cfg.extra}
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-[oklch(0.955_0.012_60)]">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <p className="eyebrow">Recent setups</p>
          <h2 className="mt-3 font-serif text-3xl text-foreground md:text-4xl">
            {cfg.galleryHeading ?? "Real events, real moments."}
          </h2>
          <MediaCarousel
            items={galleryItems}
            dotClassName={isGold ? "bg-[#C6992F]" : "bg-primary"}
          />
        </div>
      </section>

      {/* Pricing tiers */}
      {cfg.tiers && cfg.tiers.length > 0 && (
        <section className="border-t border-border/60 bg-background">
          <div className="mx-auto max-w-7xl px-6 py-20">
            <p className="eyebrow">Packages</p>
            <h2 className="mt-3 font-serif text-3xl text-foreground md:text-4xl">
              Choose the level of styling you need.
            </h2>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {cfg.tiers.map((tier) => (
                <div
                  key={tier.tag}
                  className={`flex flex-col rounded-2xl border p-8 ${
                    tier.featured
                      ? "border-transparent bg-[#122219] text-[color:var(--cream)] shadow-2xl"
                      : "border-border/60 bg-card"
                  }`}
                >
                  <p
                    className={`text-[11px] uppercase tracking-[0.2em] ${
                      tier.featured ? "text-[#E4C877]" : "text-primary"
                    }`}
                  >
                    {tier.tag}
                  </p>
                  <p className="mt-3 font-serif text-2xl">{tier.amount}</p>
                  <ul className="mt-5 flex-1 space-y-3 text-sm">
                    {tier.items.map((item) => (
                      <li
                        key={item}
                        className={`border-t pt-3 ${
                          tier.featured
                            ? "border-white/15 text-white/85"
                            : "border-border/60 text-muted-foreground"
                        }`}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={waLink(quoteMsg)}
                    target="_blank"
                    rel="noreferrer"
                    className={`mt-6 rounded-xl px-6 py-3 text-center text-[11px] uppercase tracking-[0.2em] transition-opacity hover:opacity-90 ${
                      tier.featured
                        ? "bg-[#E4C877] text-[#122219]"
                        : "border border-primary text-primary"
                    }`}
                  >
                    Enquire
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonial */}
      <section className="bg-background">
        <div className="mx-auto max-w-3xl px-6 py-24 text-center">
          <p className="font-serif text-2xl italic leading-snug text-foreground md:text-3xl">
            “{cfg.testimonial.quote}”
          </p>
          <p className="mt-6 text-sm text-muted-foreground">{cfg.testimonial.cite}</p>
        </div>
      </section>

      {/* Quote CTA */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 md:grid-cols-2">
          <div>
            <p className="eyebrow !text-[#E8B7B4]">Request a Quote</p>
            <h2 className="mt-3 font-serif text-4xl leading-tight md:text-5xl">
              Let's plan the moment.
            </h2>
            <p className="mt-5 max-w-md text-white/85">
              Share a few details and a stylist will reply — usually the same day. Deposits by MTN
              MoMo or Airtel Money.
            </p>
          </div>
          <div className="flex flex-col justify-center gap-4 md:items-end">
            <a
              href={waLink(quoteMsg)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex rounded-2xl bg-background px-8 py-4 text-[11px] uppercase tracking-[0.24em] text-primary hover:opacity-90"
            >
              WhatsApp {site.phone}
            </a>
            <Link
              to="/contact"
              className="border-b border-white/60 pb-1 text-[11px] uppercase tracking-[0.24em] text-white/90 hover:opacity-70"
            >
              Send a message →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
