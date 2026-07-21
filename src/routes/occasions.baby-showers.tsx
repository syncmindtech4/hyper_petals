import { createFileRoute } from "@tanstack/react-router";
import { OccasionDetail } from "@/components/occasion-detail";
import hero from "@/assets/decoration_002.jpeg";
import g1 from "@/assets/decoration_003.jpeg";
import g2 from "@/assets/decoration_004.jpeg";
import g3 from "@/assets/bouquet_010.jpeg";
import g4 from "@/assets/bouquet_015.jpeg";
import g5 from "@/assets/decoration_000.jpeg";
import g6 from "@/assets/bouquet_019.jpeg";

export const Route = createFileRoute("/occasions/baby-showers")({
  component: () => <OccasionDetail cfg={cfg} />,
  head: () => ({
    meta: [
      { title: "Baby Shower Décor & Gender Reveals — Luxe Floral, Kampala" },
      {
        name: "description",
        content:
          'Baby shower styling in Uganda — soft-toned balloon arches, "Oh Baby" backdrops and gender-reveal setups designed around mum-to-be.',
      },
      { property: "og:title", content: "Baby Shower Styling — Luxe Floral" },
      { property: "og:description", content: "Soft pastel and gender-neutral baby shower décor." },
      { property: "og:image", content: hero },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: hero },
    ],
    links: [{ rel: "canonical", href: "/occasions/baby-showers" }],
  }),
});

const cfg = {
  slug: "baby-showers",
  eyebrow: "Baby Showers",
  title: (
    <>
      Welcoming the little one, <em className="italic">beautifully.</em>
    </>
  ),
  intro:
    'Soft-toned balloon arches, "Oh Baby" backdrops and gender-reveal styling — designed around mum-to-be and the family gathered to celebrate her.',
  heroImage: hero,
  heroGradient: "from-[#5a6f89] to-[#122219]",
  chips: ["Boy", "Girl", "Surprise Reveal"],
  included: [
    { title: "Balloon & Floral Arch", body: "Soft pastel or gender-neutral tones, with a fresh floral accent." },
    { title: '"Oh Baby" Backdrop', body: "Named signage and a styled photo corner for mum-to-be." },
    { title: "Reveal Setup (optional)", body: "Balloon-pop or confetti-cannon gender reveal moment, fully staged." },
  ],
  gallery: [g1, g2, g3, g4, g5, g6],
  galleryHeading: "Boy, girl, or beautifully neutral.",
  tiers: [
    {
      tag: "Essential",
      amount: "From UGX 400,000",
      items: ["Pastel balloon arch", "Mum-to-be chair styling", "Up to 15 guests"],
    },
    {
      tag: "Most Booked · Signature",
      amount: "From UGX 750,000",
      items: [
        '"Oh Baby" backdrop + floral arch',
        "Table & seating styling",
        "Gender-reveal moment staged",
        "Up to 30 guests",
      ],
      featured: true,
    },
    {
      tag: "Full Décor",
      amount: "From UGX 1,300,000",
      items: ["Everything in Signature", "Tent/venue draping", "Dedicated on-site coordinator"],
    },
  ],
  testimonial: {
    quote: "They set up such a soft, dreamy space — I actually cried when I walked in. Every friend has asked for their contact.",
    cite: "— Sylvia N., Baby Shower client, Naalya",
  },
};
