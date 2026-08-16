import { createFileRoute } from "@tanstack/react-router";
import { OccasionDetail } from "@/components/occasion-detail";
import hero from "@/assets/team.jpg";
import g1 from "@/assets/decoration_001.jpeg";
import g2 from "@/assets/decoration_002.jpeg";
import g3 from "@/assets/decoration_003.jpeg";
import g4 from "@/assets/decoration_004.jpeg";
import g5 from "@/assets/bouquet_005.jpeg";
import g6 from "@/assets/bouquet_010.jpeg";

export const Route = createFileRoute("/occasions/corporate&brand-events")({
  component: () => <OccasionDetail cfg={cfg} />,
  head: () => ({
    meta: [
      { title: "Corporate & Brand Events — Hyper Petals & Decor, Kampala" },
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
    links: [{ rel: "canonical", href: "/occasions/corporate&brand-events" }],
  }),
});

const cfg = {
  slug: "Corporate & Brand Events",
  eyebrow: "Corporate & Brand Events",
  title: (
    <>
      Floral and décor, run like a <em className="italic">business partner.</em>
    </>
  ),
  intro:
    "Product launches, office openings, client-appreciation evenings, galas and conference stages — quoted, invoiced and delivered on your event timeline.",
  heroImage: hero,
  heroGradient: "from-[#1B2E4A]/70 to-[#0d1a13]/90",
  accent: "gold" as const,
  chips: ["Product Launches", "Office Openings", "Client Appreciation", "Galas & Conferences"],
  included: [
    {
      title: "Stage & Backdrop Branding",
      body: "Florals and staging built around your logo, brand colours and signage.",
    },
    {
      title: "Reception & Lobby Florals",
      body: "Standing arrangements and refresh schedules for offices and showrooms.",
    },
    {
      title: "TCorporate Gifting",
      body: "Bulk client or staff gifting coordinated and delivered on your schedule.",
    },
  ],
  gallery: [g1, g2, g3, g4, g5, g6],
  galleryHeading: "Styling that reflects your brand, not just a florist's default.S",
  testimonial: {
    quote:
      "They handled our product launch florals end-to-end, invoiced properly against our LPO, and the stage looked exactly on-brand",
    cite: "— Marketing Lead, FMCG client, Kampala",
  },
};
