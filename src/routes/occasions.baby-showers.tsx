import { createFileRoute } from "@tanstack/react-router";
import { OccasionDetail } from "@/components/occasion-detail";
import hero from "@/assets/baby_shower.jpg";
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
      { title: "Baby Shower Décor & Gender Reveals — Hyper Petals Decor, Kampala" },
      {
        name: "description",
        content:
          'Baby shower styling in Uganda — soft-toned balloon arches, "Oh Baby" backdrops and gender-reveal setups designed around mum-to-be.',
      },
      { property: "og:title", content: "Baby Shower Styling — Hyper Petals Decor" },
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
    {
      title: "Balloon & Floral Arch",
      body: "Soft pastel or gender-neutral tones, with a fresh floral accent.",
    },
    { title: '"Oh Baby" Backdrop', body: "Named signage and a styled photo corner for mum-to-be." },
    {
      title: "Reveal Setup (optional)",
      body: "Balloon-pop or confetti-cannon gender reveal moment, fully staged.",
    },
  ],
  gallery: [g1, g2, g3, g4, g5, g6],
  galleryHeading: "Boy, girl, or beautifully neutral.",
  testimonial: {
    quote:
      "They set up such a soft, dreamy space — I actually cried when I walked in. Every friend has asked for their contact.",
    cite: "— Sylvia N., Baby Shower client, Naalya",
  },
};
