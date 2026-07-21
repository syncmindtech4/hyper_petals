import { createFileRoute } from "@tanstack/react-router";
import { OccasionDetail } from "@/components/occasion-detail";
import hero from "@/assets/birthday_party.jpg";
import g1 from "@/assets/decoration_001.jpeg";
import g2 from "@/assets/decoration_002.jpeg";
import g3 from "@/assets/decoration_003.jpeg";
import g4 from "@/assets/decoration_004.jpeg";
import g5 from "@/assets/bouquet_005.jpeg";
import g6 from "@/assets/bouquet_010.jpeg";

export const Route = createFileRoute("/occasions/birthday-parties")({
  component: () => <OccasionDetail cfg={cfg} />,
  head: () => ({
    meta: [
      { title: "Birthday Party Décor & Balloons — Luxe Floral, Kampala" },
      {
        name: "description",
        content:
          "Birthday party styling in Kampala — themed balloon arches, backdrops, cake tables and full décor for kids' parties, sweet sixteens and milestone birthdays.",
      },
      { property: "og:title", content: "Birthday Party Décor — Luxe Floral" },
      { property: "og:description", content: "Themed birthday styling across Uganda." },
      { property: "og:image", content: hero },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: hero },
    ],
    links: [{ rel: "canonical", href: "/occasions/birthday-parties" }],
  }),
});

const cfg = {
  slug: "birthday-parties",
  eyebrow: "Birthday Parties",
  title: (
    <>
      A party that looks as good <em className="italic">as it feels.</em>
    </>
  ),
  intro:
    "Themed balloon arches, photo backdrops, cake tables and full décor — from kids' parties to milestone celebrations. Styled to your palette, delivered ready before your first guest arrives.",
  heroImage: hero,
  heroGradient: "from-[#3a2c10] to-[#0d1a13]",
  accent: "gold" as const,
  chips: ["Kids' Parties", "Sweet 16 / 18", "30th / 40th / 50th", "Milestone & Surprise"],
  included: [
    {
      title: "Balloon Arch or Garland",
      body: "Organic or classic cluster styles in your theme's exact palette.",
    },
    {
      title: "Backdrop & Photo Corner",
      body: "Named signage, florals and a styled corner built for photos.",
    },
    {
      title: "Table & Cake Styling",
      body: "Grazing table, cake table and dessert styling to match the theme.",
    },
  ],
  gallery: [g1, g2, g3, g4, g5, g6],
  galleryHeading: "Every theme, every age.",
  tiers: [
    {
      tag: "Essential",
      amount: "From UGX 250,000",
      items: ["Balloon arch (single colour palette)", "Happy Birthday signage", "Up to 15 guests"],
    },
    {
      tag: "Most Booked · Signature",
      amount: "From UGX 550,000",
      items: [
        "Themed balloon & floral arch",
        "Photo backdrop with name signage",
        "Cake table & seating styling",
        "Up to 40 guests",
      ],
      featured: true,
    },
    {
      tag: "Full Décor",
      amount: "From UGX 1,100,000",
      items: [
        "Everything in Signature",
        "Full venue styling & lounge setup",
        "Dedicated on-site coordinator",
      ],
    },
  ],
  testimonial: {
    quote:
      "Our son's safari-themed 5th birthday looked like it belonged in a magazine — and it was ready before the first guest arrived.",
    cite: "— Daniel O., Birthday client, Naguru",
  },
};
