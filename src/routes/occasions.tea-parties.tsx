import { createFileRoute } from "@tanstack/react-router";
import { OccasionDetail } from "@/components/occasion-detail";
import hero from "@/assets/tea.avif";
import g1 from "@/assets/decoration_001.jpeg";
import g2 from "@/assets/decoration_002.jpeg";
import g3 from "@/assets/decoration_003.jpeg";
import g4 from "@/assets/decoration_004.jpeg";
import g5 from "@/assets/bouquet_005.jpeg";
import g6 from "@/assets/bouquet_010.jpeg";

export const Route = createFileRoute("/occasions/tea-parties")({
  component: () => <OccasionDetail cfg={cfg} />,
  head: () => ({
    meta: [
      { title: "Tea Parties — Hyper Petals & Decor, Kampala" },
      {
        name: "description",
        content:
          "Birthday party styling in Kampala — themed balloon arches, backdrops, cake tables and full décor for kids' parties, sweet sixteens and milestone birthdays.",
      },
      { property: "og:title", content: "Birthday Party Décor — Hyper Petals & Decor" },
      { property: "og:description", content: "Themed birthday styling across Uganda." },
      { property: "og:image", content: hero },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: hero },
    ],
    links: [{ rel: "canonical", href: "/occasions/tea-parties" }],
  }),
});

const cfg = {
  slug: "tea-parties",
  eyebrow: "Tea Parties",
  title: (
    <>
      Slow afternoons, <em className="italic">styled with care.</em>
    </>
  ),
  intro:
    "Fine-china table settings, floral runners and garden-lounge styling for bridal teas, birthday brunches, baby sprinkles and ladies' get-togethers.",
  heroImage: hero,
  heroGradient: "from-[#4E6B56]/70 to-[#122219]/85",
  accent: "gold" as const,
  chips: ["Bridal Tea", "Birthday Brunch", "Ladies' Get-Together", "Baby Sprinkle"],
  included: [
    {
      title: "Table & China Styling",
      body: "Floral runners, place settings and fine-china or vintage-inspired tableware.",
    },
    {
      title: "Garden Lounge Setup",
      body: "Low seating, cushions and shade styling for an outdoor or veranda tea.",
    },
    {
      title: "Cake Stand & Dessert Table",
      body: "Tiered stands, florals and signage styled around your bakes or caterer.",
    },
  ],
  gallery: [g1, g2, g3, g4, g5, g6],
  galleryHeading: "Delicate, unhurried, beautifully set.",
  testimonial: {
    quote:
      "It felt like a page out of a magazine — the china, the runner, even the little place cards matched our sage and dusty rose palette.",
    cite: "— Winnie A., Bridal Tea client, Najjera",
  },
};
