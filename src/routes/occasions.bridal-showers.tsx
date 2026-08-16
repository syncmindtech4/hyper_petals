import { createFileRoute } from "@tanstack/react-router";
import { OccasionDetail } from "@/components/occasion-detail";
import hero from "@/assets/bridal-shower-party.jpg";
import g1 from "@/assets/bouquet_003.jpeg";
import g2 from "@/assets/bouquet_007.jpeg";
import g3 from "@/assets/decoration_001.jpeg";
import g4 from "@/assets/decoration_002.jpeg";
import g5 from "@/assets/bouquet_014.jpeg";
import g6 from "@/assets/bouquet_018.jpeg";

export const Route = createFileRoute("/occasions/bridal-showers")({
  component: () => <OccasionDetail cfg={cfg} />,
  head: () => ({
    meta: [
      { title: "Bridal Shower Décor & Styling — Hyper Petals & Decor, Kampala" },
      {
        name: "description",
        content:
          "Bridal shower styling in Uganda — blush, gold and ivory balloon arches, table setups and floral accents designed around the bride-to-be.",
      },
      { property: "og:title", content: "Bridal Shower Styling — Hyper Petals & Decor" },
      { property: "og:description", content: "Blush, gold and ivory bridal shower décor." },
      { property: "og:image", content: hero },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: hero },
    ],
    links: [{ rel: "canonical", href: "/occasions/bridal-showers" }],
  }),
});

const cfg = {
  slug: "bridal-showers",
  eyebrow: "Bridal Showers",
  title: (
    <>
      A celebration as lovely <em className="italic">as the bride-to-be.</em>
    </>
  ),
  intro:
    "Blush, gold and ivory styling — balloon arches, table setups and fresh floral accents designed around her, for the women who love her most.",
  heroImage: hero,
  heroGradient: "from-[#6E2434] to-[#3a1420]",
  included: [
    {
      title: "Balloon & Floral Arch",
      body: "Organic garland in your chosen palette, framing the bride's seating area.",
    },
    {
      title: "Table & Seating Styling",
      body: 'Linens, centrepieces and a "Mrs." chair sign for the guest of honour.',
    },
    {
      title: "Full Setup & Takedown",
      body: "Our team arrives early, styles everything, and clears up after — you just host.",
    },
  ],
  gallery: [g1, g2, g3, g4, g5, g6],
  galleryHeading: "Real setups, real brides.",
  testimonial: {
    quote:
      "Every guest asked who did our décor — the blush and gold arch matched the invitations perfectly.",
    cite: "— Patricia M., Bridal Shower client, Kololo",
  },
};
