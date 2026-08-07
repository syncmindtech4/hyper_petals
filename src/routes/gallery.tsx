// import { createFileRoute } from "@tanstack/react-router";
// import { useQuery } from "@tanstack/react-query";
// import { useProducts } from "@/hooks/useProducts";
// import { ProductCard } from "@/components/product-card";
// import { getPublicGallery } from "@/lib/cms.functions";
// import wedding from "@/assets/gallery-wedding.jpg";
// import arch from "@/assets/gallery-arch.jpg";
// import corporate from "@/assets/gallery-corporate.jpg";
// import workshop from "@/assets/gallery-workshop.jpg";

// export const Route = createFileRoute("/gallery")({
//   component: Gallery,
//   head: () => ({
//     meta: [
//       { title: "Bouquets & Event Portfolio — Luxe Floral" },
//       { name: "description", content: "Browse Luxe Floral's signature bouquets and a portfolio of past weddings, corporate events, and bespoke floral installations." },
//       { property: "og:title", content: "Bouquets & Event Portfolio — Luxe Floral" },
//       { property: "og:description", content: "Signature bouquets and a portfolio of past events." },
//       { property: "og:url", content: "/gallery" },
//     ],
//     links: [{ rel: "canonical", href: "/gallery" }],
//   }),
// });

// const eventShots = [
//   { src: wedding, alt: "Wedding reception centerpiece", tall: false },
//   { src: arch, alt: "Floral wedding arch", tall: true },
//   { src: corporate, alt: "Corporate floral installation", tall: false },
//   { src: workshop, alt: "Studio bouquet in progress", tall: true },
// ];

// function Gallery() {
//   const { data: adminItems = [] } = useQuery({
//     queryKey: ["public_gallery"],
//     queryFn: () => getPublicGallery(),
//   });
//   const { data: products } = useProducts();
//   return (
//     <>
//       <section className="border-b border-border/60">
//         <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
//           <p className="eyebrow">Shop</p>
//           <h1 className="mt-4 max-w-3xl font-serif text-5xl leading-[1.05] text-foreground md:text-6xl">
//             Signature bouquets, ready to order.
//           </h1>
//           <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
//             Same-day delivery across Kampala on orders placed before 11am. All bouquets are hand-tied in our studio the morning of delivery.
//           </p>
//         </div>
//       </section>

//       <section className="mx-auto max-w-7xl px-6 py-20">
//         <div className="grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
//           {products.map((p) => (
//             <ProductCard key={p.id} product={p} />
//           ))}
//         </div>
//       </section>

//       <section className="border-t border-border/60 bg-[oklch(0.955_0.012_60)]">
//         <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
//           <div className="flex flex-wrap items-end justify-between gap-6">
//             <div>
//               <p className="eyebrow">Portfolio</p>
//               <h2 className="mt-3 font-serif text-4xl text-foreground md:text-5xl">Events & installations</h2>
//             </div>
//             <p className="max-w-sm text-sm text-muted-foreground">
//               A small sample of recent weddings, corporate installations, and bespoke moments.
//             </p>
//           </div>

//           <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
//             {eventShots.map((img, i) => (
//               <figure key={i} className={`overflow-hidden rounded-sm bg-muted ${img.tall ? "row-span-2 aspect-[3/5]" : "aspect-[4/5]"} ${i === 0 ? "md:col-span-2 md:row-span-1 md:aspect-[8/5]" : ""}`}>
//                 <img src={img.src} alt={img.alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
//               </figure>
//             ))}
//             {adminItems.map((item) => (
//               <figure key={item.id} className="overflow-hidden rounded-sm bg-muted aspect-[4/5]">
//                 {item.kind === "image" ? (
//                   <img src={item.public_url} alt={item.alt_text ?? item.title ?? ""} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
//                 ) : (
//                   <video src={item.public_url} controls className="h-full w-full object-cover" />
//                 )}
//                 {item.caption && <figcaption className="sr-only">{item.caption}</figcaption>}
//               </figure>
//             ))}
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }

import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
import { getPublicGallery } from "@/lib/cms.functions";
import { MediaCarousel } from "@/components/media-carousel";

// Birthday
import bd1 from "@/assets/decoration_001.jpeg";
import bd2 from "@/assets/decoration_002.jpeg";
import bd3 from "@/assets/decoration_003.jpeg";
import bd4 from "@/assets/decoration_004.jpeg";
import bd5 from "@/assets/bouquet_005.jpeg";
import bd6 from "@/assets/bouquet_010.jpeg";
// Bridal shower
import br1 from "@/assets/bouquet_003.jpeg";
import br2 from "@/assets/bouquet_007.jpeg";
import br3 from "@/assets/decoration_001.jpeg";
import br4 from "@/assets/decoration_002.jpeg";
import br5 from "@/assets/bouquet_014.jpeg";
import br6 from "@/assets/bouquet_018.jpeg";
// Baby shower
import bb1 from "@/assets/decoration_003.jpeg";
import bb2 from "@/assets/decoration_004.jpeg";
import bb3 from "@/assets/bouquet_010.jpeg";
import bb4 from "@/assets/bouquet_015.jpeg";
import bb5 from "@/assets/decoration_000.jpeg";
import bb6 from "@/assets/bouquet_019.jpeg";
// Marriage proposals
import pr1 from "@/assets/bouquet_003.jpeg";
import pr2 from "@/assets/decoration_004.jpeg";
import pr3 from "@/assets/bouquet_014.jpeg";
import pr4 from "@/assets/decoration_001.jpeg";
import pr5 from "@/assets/bouquet_020.jpeg";
import pr6 from "@/assets/bouquet_007.jpeg";
// Tea parties
import tp1 from "@/assets/decoration_001.jpeg";
import tp2 from "@/assets/decoration_002.jpeg";
import tp3 from "@/assets/decoration_003.jpeg";
import tp4 from "@/assets/decoration_004.jpeg";
import tp5 from "@/assets/bouquet_005.jpeg";
import tp6 from "@/assets/bouquet_010.jpeg";
// Corporate & brand events
import cp1 from "@/assets/decoration_001.jpeg";
import cp2 from "@/assets/decoration_002.jpeg";
import cp3 from "@/assets/decoration_003.jpeg";
import cp4 from "@/assets/decoration_004.jpeg";
import cp5 from "@/assets/bouquet_005.jpeg";
import cp6 from "@/assets/bouquet_010.jpeg";
// Kwanjula & traditional
import kw1 from "@/assets/decoration_000.jpeg";
import kw2 from "@/assets/decoration_001.jpeg";
import kw3 from "@/assets/decoration_002.jpeg";
import kw4 from "@/assets/decoration_003.jpeg";
import kw5 from "@/assets/bouquet_015.jpeg";
import kw6 from "@/assets/bouquet_020.jpeg";

export const Route = createFileRoute("/gallery")({
  component: Gallery,
  head: () => ({
    meta: [
      { title: "Bouquets & Event Portfolio — Luxe Floral" },
      {
        name: "description",
        content:
          "Browse Luxe Floral's signature bouquets and a portfolio of past weddings, corporate events, and bespoke floral installations.",
      },
      { property: "og:title", content: "Bouquets & Event Portfolio — Luxe Floral" },
      { property: "og:description", content: "Signature bouquets and a portfolio of past events." },
      { property: "og:url", content: "/gallery" },
    ],
    links: [{ rel: "canonical", href: "/gallery" }],
  }),
});

type Band = {
  key: string;
  eyebrowClass: string;
  eyebrow: string;
  heading: string;
  link: string;
  linkLabel: string;
  bandClass: string;
  headingClass: string;
  bodyClass: string;
  dotClassName: string;
  images: string[];
};

const bands: Band[] = [
  {
    key: "birthday",
    eyebrow: "Birthday Parties",
    eyebrowClass: "text-[#E4C877]",
    heading: "Every theme, every age.",
    link: "/occasions/birthday-parties",
    linkLabel: "View Birthday page",
    bandClass: "bg-gradient-to-br from-[#3a2c10] to-[#0d1a13]",
    headingClass: "text-[color:var(--cream)]",
    bodyClass: "text-white/75",
    dotClassName: "bg-[#E4C877]",
    images: [bd1, bd2, bd3, bd4, bd5, bd6],
  },
  {
    key: "bridal",
    eyebrow: "Bridal Showers",
    eyebrowClass: "text-[#E4C877]",
    heading: "Real setups, real brides.",
    link: "/occasions/bridal-showers",
    linkLabel: "View Bridal Shower page",
    bandClass: "bg-gradient-to-br from-[#2A4A35] to-[#122219]",
    headingClass: "text-[color:var(--cream)]",
    bodyClass: "text-white/75",
    dotClassName: "bg-[#E8B7B4]",
    images: [br1, br2, br3, br4, br5, br6],
  },
  {
    key: "baby",
    eyebrow: "Baby Showers",
    eyebrowClass: "text-[#E4C877]",
    heading: "Boy, girl, or beautifully neutral.",
    link: "/occasions/baby-showers",
    linkLabel: "View Baby Shower page",
    bandClass: "bg-gradient-to-br from-[#1e3a4a] to-[#122219]",
    headingClass: "text-[color:var(--cream)]",
    bodyClass: "text-white/75",
    dotClassName: "bg-[#B9CDE0]",
    images: [bb1, bb2, bb3, bb4, bb5, bb6],
  },
  {
    key: "proposal",
    eyebrow: "Marriage Proposals",
    eyebrowClass: "text-[#E4C877]",
    heading: "Every setup, kept secret until the moment.",
    link: "/occasions/wedding-proposals",
    linkLabel: "View Proposals page",
    bandClass: "bg-gradient-to-b from-[#0d1a13] to-[#051009]",
    headingClass: "text-[color:var(--cream)]",
    bodyClass: "text-white/70",
    dotClassName: "bg-[#C6992F]",
    images: [pr1, pr2, pr3, pr4, pr5, pr6],
  },
  {
    key: "tea",
    eyebrow: "Tea Parties",
    eyebrowClass: "text-[#6E2434]",
    heading: "Delicate, unhurried, beautifully set.",
    link: "/occasions/tea-parties",
    linkLabel: "View Tea Parties page",
    bandClass:
      "bg-gradient-to-br from-[#F3E3D8] via-[#F1EADA] to-[#FBF6EC] border-y border-border/60",
    headingClass: "text-foreground",
    bodyClass: "text-foreground/65",
    dotClassName: "bg-[#D9A6A0]",
    images: [tp1, tp2, tp3, tp4, tp5, tp6],
  },
  {
    key: "corporate",
    eyebrow: "Corporate & Brand Events",
    eyebrowClass: "text-[#E4C877]",
    heading: "From a lobby refresh to a 300-guest gala.",
    link: "/occasions/corporate&brand-events",
    linkLabel: "View Corporate page",
    bandClass: "bg-[#20262A]",
    headingClass: "text-[color:var(--cream)]",
    bodyClass: "text-white/70",
    dotClassName: "bg-[#C6992F]",
    images: [cp1, cp2, cp3, cp4, cp5, cp6],
  },
  {
    key: "kwanjula",
    eyebrow: "Kwanjula & Traditional Ceremonies",
    eyebrowClass: "text-[#E4C877]",
    heading: "From intimate family gatherings to 300+ guests.",
    link: "/occasions/kwanjula",
    linkLabel: "View Kwanjula page",
    bandClass: "bg-gradient-to-br from-[#4A2E1D] to-[#122219]",
    headingClass: "text-[color:var(--cream)]",
    bodyClass: "text-white/75",
    dotClassName: "bg-[#B5602E]",
    images: [kw1, kw2, kw3, kw4, kw5, kw6],
  },
];

function Gallery() {
  const { data: adminItems = [] } = useQuery({
    queryKey: ["public_gallery"],
    queryFn: () => getPublicGallery(),
  });

  return (
    <>
      {/* <section className="border-b border-border/60">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
          <p className="eyebrow">Shop</p>
          <h1 className="mt-4 max-w-3xl font-serif text-5xl leading-[1.05] text-foreground md:text-6xl">
            Signature bouquets, ready to order.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Same-day delivery across Kampala on orders placed before 11am. All bouquets are
            hand-tied in our studio the morning of delivery.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section> */}

      <section className="border-t border-border/60 bg-[oklch(0.955_0.012_60)]">
        <div className="mx-auto max-w-7xl px-6 py-16 text-center md:py-20">
          <p className="eyebrow justify-center">Gallery</p>
          <h2 className="mx-auto mt-4 max-w-2xl font-serif text-4xl leading-[1.1] text-foreground md:text-5xl">
            Every occasion, in photos.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Browse real setups by occasion. Click any photo to see it full-size — the carousel keeps
            playing behind it, so you can close the zoom and pick up right where it left off.
          </p>
        </div>
      </section>

      {bands.map((band) => (
        <section key={band.key} className={band.bandClass}>
          <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className={`eyebrow ${band.eyebrowClass}`}>{band.eyebrow}</p>
                <h2 className={`mt-2 font-serif text-3xl md:text-4xl ${band.headingClass}`}>
                  {band.heading}
                </h2>
              </div>
              <Link
                to={band.link}
                className={`whitespace-nowrap border-b pb-0.5 text-[13px] ${band.headingClass} ${band.bodyClass} border-current opacity-85 hover:opacity-100`}
              >
                {band.linkLabel} →
              </Link>
            </div>
            <MediaCarousel
              items={band.images.map((src) => ({ src }))}
              dotClassName={band.dotClassName}
            />
          </div>
        </section>
      ))}

      {adminItems.length > 0 && (
        <section className="border-t border-border/60 bg-background">
          <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
            <div>
              <p className="eyebrow">Behind the scenes</p>
              <h2 className="mt-2 font-serif text-3xl text-foreground md:text-4xl">
                Fresh from the studio.
              </h2>
            </div>
            <MediaCarousel
              items={adminItems.map((item) => ({
                src: item.public_url,
                alt: item.alt_text ?? item.title ?? "",
                video: item.kind === "video",
              }))}
              dotClassName="bg-primary"
            />
          </div>
        </section>
      )}
    </>
  );
}
