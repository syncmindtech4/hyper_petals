import { createFileRoute } from "@tanstack/react-router";
import { OccasionDetail } from "@/components/occasion-detail";
import hero from "@/assets/decoration_003.jpeg";
import g1 from "@/assets/decoration_000.jpeg";
import g2 from "@/assets/decoration_001.jpeg";
import g3 from "@/assets/decoration_002.jpeg";
import g4 from "@/assets/decoration_003.jpeg";
import g5 from "@/assets/bouquet_015.jpeg";
import g6 from "@/assets/bouquet_020.jpeg";

export const Route = createFileRoute("/occasions/kwanjula")({
  component: () => <OccasionDetail cfg={cfg} />,
  head: () => ({
    meta: [
      { title: "Kwanjula & Kukyala Ceremony Décor — Hyper Petals & Decor" },
      {
        name: "description",
        content:
          "Kwanjula and Kuhingira décor across Uganda — tent draping, mat and canopy styling, gift-basket displays and family-colour theming for introduction ceremonies.",
      },
      { property: "og:title", content: "Kwanjula Décor — Hyper Petals & Decor" },
      {
        property: "og:description",
        content: "Traditional ceremony styling built around your family colours.",
      },
      { property: "og:image", content: hero },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: hero },
    ],
    links: [{ rel: "canonical", href: "/occasions/kwanjula" }],
  }),
});

const cfg = {
  slug: "kwanjula",
  eyebrow: "Kwanjula & Traditional",
  title: (
    <>
      Décor that honours the tradition, <em className="italic">at every scale.</em>
    </>
  ),
  intro:
    "Tent draping, mat and canopy styling, gift-basket displays and family-colour theming for Kwanjula, Kuhingira and other introduction ceremonies — built around your clan's colours and customs.",
  heroImage: hero,
  heroGradient: "from-[#B5602E] to-[#3a1420]",
  included: [
    {
      title: "Tent & Canopy Draping",
      body: "Fabric draping, ceiling treatments and entrance arches in family colours.",
    },
    {
      title: "Mat & Seating Area Styling",
      body: "Traditional mat/floor seating styled with cushions, low tables and florals.",
    },
    {
      title: "Gift Basket & Table Display",
      body: "Styled display tables for baskets, luggage and gifts presented during the ceremony.",
    },
  ],
  gallery: [g1, g2, g3, g4, g5, g6],
  galleryHeading: "From intimate family gatherings to 300+ guests.",
  testimonial: {
    quote:
      "They matched our clan colours exactly and coordinated the whole compound with our planning committee — the aunties were impressed, which says a lot.",
    cite: "— Immaculate N., Kwanjula client, Mukono",
  },
  extra: (
    <div className="mt-8 flex items-start gap-4 rounded-sm border border-primary/30 bg-secondary/40 p-6">
      <span className="text-2xl">🎨</span>
      <p className="text-sm leading-relaxed text-foreground/85">
        <strong className="font-medium">Colour & theme guidance:</strong> Many families coordinate
        décor around clan colours, the bride's gomesi or a shared palette between both families.
        Send a fabric swatch or photo and we'll design around it rather than a generic template.
      </p>
    </div>
  ),
};
