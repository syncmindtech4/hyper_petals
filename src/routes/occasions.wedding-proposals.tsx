import { createFileRoute } from "@tanstack/react-router";
import { OccasionDetail } from "@/components/occasion-detail";
import hero from "@/assets/proposal.jpg";
import g1 from "@/assets/bouquet_003.jpeg";
import g2 from "@/assets/decoration_004.jpeg";
import g3 from "@/assets/bouquet_014.jpeg";
import g4 from "@/assets/decoration_001.jpeg";
import g5 from "@/assets/bouquet_020.jpeg";
import g6 from "@/assets/bouquet_007.jpeg";

export const Route = createFileRoute("/occasions/wedding-proposals")({
  component: () => <OccasionDetail cfg={cfg} />,
  head: () => ({
    meta: [
      { title: "Marriage Proposal Setups — Luxe Floral, Kampala" },
      {
        name: "description",
        content:
          "Discreet, romantic marriage proposal setups across Uganda — rooftop, lakeside, garden and suite styling with florals, candles and full venue scouting.",
      },
      { property: "og:title", content: "Marriage Proposal Setups — Luxe Floral" },
      { property: "og:description", content: "Rooftop, lakeside and garden proposal styling." },
      { property: "og:image", content: hero },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: hero },
    ],
    links: [{ rel: "canonical", href: "/occasions/wedding-proposals" }],
  }),
});

const cfg = {
  slug: "wedding-proposals",
  eyebrow: "Marriage Proposals",
  title: (
    <>
      One question. <em className="italic">One perfect yes.</em>
    </>
  ),
  intro:
    "Rooftop, lakeside, garden or suite — we scout the venue, style the moment and stay discreet until you're ready. Florals, candles, signage and a hidden photographer if you'd like one.",
  heroImage: hero,
  heroGradient: "from-[#6E2434] to-[#0d1a13]",
  chips: ["Rooftop", "Lakeside", "Private Garden", "Hotel Suite"],
  included: [
    {
      title: "Romantic Floral Setup",
      body: "Petal-lined arch or pathway, candles and lighting for the ask.",
    },
    {
      title: "Venue Scouting",
      body: "We recommend, book and coordinate the perfect setting for the moment.",
    },
    { title: "Discreet Setup", body: "Fully installed before you arrive — she'll never see us." },
  ],
  gallery: [g1, g2, g3, g4, g5, g6],
  galleryHeading: "Rooftops, lakesides and hidden gardens.",
  tiers: [
    {
      tag: "Essential",
      amount: "From UGX 350,000",
      items: [
        "Petal-lined floral arch or pathway",
        "Fairy-light styling",
        "1-hour setup, own venue",
      ],
    },
    {
      tag: "Most Booked · Signature",
      amount: "From UGX 700,000",
      items: [
        'Full floral arch + "Marry Me" signage',
        "Candle & light path styling",
        "Venue scouting & booking assistance",
        "Discreet setup before arrival",
      ],
      featured: true,
    },
    {
      tag: "Full Experience",
      amount: "From UGX 1,400,000",
      items: [
        "Everything in Signature",
        "Hidden photographer/videographer",
        "Private after-proposal dinner setup",
      ],
    },
  ],
  testimonial: {
    quote:
      "They scouted the rooftop, handled the timing with the photographer, and kept it completely secret from her. It was flawless.",
    cite: "— Brian K., Proposal client, Kampala",
  },
};
