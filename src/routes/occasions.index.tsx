import { createFileRoute, Link } from "@tanstack/react-router";
import bridal_shower from "@/assets/bridal-shower-party.jpg";
import baby_shower from "@/assets/baby_shower.jpg";
import birthday_party from "@/assets/birthday_party.jpg";
import proposal from "@/assets/proposal_africa.png";
import decor4 from "@/assets/decoration_003.jpeg";
import decor5 from "@/assets/decoration_004.jpeg";
import tea from "@/assets/tea.avif";

export const Route = createFileRoute("/occasions/")({
  component: OccasionsIndex,
  head: () => ({
    meta: [
      { title: "Occasions — Hyper Petals Decor, Kampala" },
      {
        name: "description",
        content:
          "Birthday parties, bridal & baby showers, marriage proposals and Kwanjula décor by Hyper Petals Decor — full-service styling across Kampala and Uganda.",
      },
      { property: "og:title", content: "Occasions — Hyper Petals Decor" },
      {
        property: "og:description",
        content: "Full-service event florals for every celebration in Uganda.",
      },
      { property: "og:url", content: "/occasions" },
    ],
    links: [{ rel: "canonical", href: "/occasions" }],
  }),
});

const cards = [
  {
    to: "/occasions/birthday-parties" as const,
    label: "Birthday Parties",
    tag: "Kids · Sweet 16 · Milestone",
    img: birthday_party,
    tint: "from-[#3a2c10]/70 to-[#0d1a13]/85",
  },
  {
    to: "/occasions/bridal-showers" as const,
    label: "Bridal Showers",
    tag: "Blush · Gold · Ivory",
    img: bridal_shower,
    tint: "from-[#6E2434]/70 to-[#3a1420]/85",
  },
  {
    to: "/occasions/baby-showers" as const,
    label: "Baby Showers",
    tag: "Boy · Girl · Reveal",
    img: baby_shower,
    tint: "from-[#5a6f89]/70 to-[#122219]/85",
  },
  {
    to: "/occasions/wedding-proposals" as const,
    label: "Marriage Proposals",
    tag: "Rooftop · Lakeside · Garden",
    img: proposal,
    tint: "from-[#6E2434]/70 to-[#0d1a13]/90",
  },
  {
    to: "/occasions/kwanjula" as const,
    label: "Kwanjula & Traditional",
    tag: "Tent · Mat · Family colours",
    img: decor4,
    tint: "from-[#B5602E]/70 to-[#3a1420]/85",
  },
  {
    to: "/occasions/tea-parties" as const,
    label: "Tea Party",
    tag: "Cups · Spices · Tables",
    img: tea,
    tint: "from-[#4E6B56]/70 to-[#122219]/85",
  },
  {
    to: "/occasions/corporate&brand-events" as const,
    label: "Corporate & Brand Events",
    tag: "Classic · Elegant · Unique",
    img: decor4,
    tint: "from-[#1B2E4A]/70 to-[#0d1a13]/90",
  },
];

function OccasionsIndex() {
  return (
    <>
      <section className="border-b border-border/60 bg-[#122219] text-[color:var(--cream)]">
        <div className="mx-auto max-w-7xl px-6 py-24 md:py-28">
          <p className="eyebrow !text-[#E4C877]">Occasions</p>
          <h1 className="mt-4 max-w-3xl font-serif text-5xl leading-[1.05] md:text-6xl">
            Every celebration deserves a beautiful setting.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/80">
            From surprise proposals to Kwanjula ceremonies, we design and install floral moments
            across Uganda — with same-day delivery available on selected setups.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((c) => (
            <Link
              key={c.to}
              to={c.to}
              className="group relative block aspect-[5/5] overflow-hidden rounded-3xl"
            >
              <img
                src={c.img}
                alt={c.label}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className={`absolute inset-0 bg-gradient-to-br ${c.tint}`} />
              <div className="relative flex h-full flex-col justify-end p-8 text-[color:var(--cream)]">
                <p className="text-[11px] uppercase tracking-[0.22em] text-white/75">{c.tag}</p>
                <h2 className="mt-2 font-serif text-3xl md:text-4xl">{c.label}</h2>
                <span className="mt-4 inline-block border p-2 border-border rounded-xl border-white/70  text-[11px] uppercase tracking-[0.24em] w-max">
                  Explore Occasion →
                </span>
              </div>
            </Link>
          ))}
          <div className="group relative flex aspect-[5/5] md:aspect-auto min-h-[320px] w-full flex-col justify-between overflow-hidden rounded-3xl border border-[#E4C877]/30 bg-[#122219] p-8 md:p-10 text-[color:var(--cream)] md:col-span-2">
            <img
              src={decor5}
              alt="Custom floral setup"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover opacity-25 transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#122219] via-[#122219]/90 to-[#122219]/60" />

            <div className="relative z-10 max-w-xl">
              <p className="eyebrow !text-[#E4C877]">Custom Experience</p>
              <h3 className="mt-3 font-serif text-3xl md:text-4xl text-white">
                Have something unique in mind?
              </h3>
              <p className="mt-3 text-sm md:text-base leading-relaxed text-white/80">
                We style celebrations of every scale across Uganda. Reach out and our team will help
                bring your exact vision to life.
              </p>
            </div>

            <div className="relative z-10 mt-8 flex items-center justify-between">
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 rounded-2xl bg-[#E4C877] px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#122219] transition-all hover:bg-white hover:shadow-lg"
              >
                <span>Start an inquiry</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
