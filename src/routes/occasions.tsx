import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import archImg from "@/assets/gallery-arch.jpg";
import { useServicesContent } from "@/hooks/useSiteContent";

export const Route = createFileRoute("/occasions")({
  component: Occasions,
  head: () => ({
    meta: [
      { title: "Birthday, Baby Shower & Proposal Florals — Luxe Floral" },
      {
        name: "description",
        content:
          "Full-service event florals from Luxe Floral Designs & Events — birthday parties, baby showers, and wedding proposals across Uganda.",
      },
      { property: "og:title", content: "Birthday, Baby Shower & Proposal Florals — Luxe Floral" },
      {
        property: "og:description",
        content: "Full-service event florals for birthdays, baby showers, and wedding proposals.",
      },
      { property: "og:url", content: "/occasions" },
    ],
    links: [{ rel: "canonical", href: "/occasions" }],
  }),
});

function Occasions() {
  const { data: s } = useServicesContent();
  return (
    <>
      <section className="border-b border-border/60">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <p className="eyebrow">Occasions</p>
          <h1 className="mt-4 max-w-3xl font-serif text-5xl leading-[1.05] text-foreground md:text-6xl">
            {s.heading}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {s.subtitle}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-10 md:grid-cols-3">
          {s.items.map((svc) => (
            <article key={svc.title} className="flex flex-col border-t border-border/70 pt-8">
              <p className="eyebrow">{svc.price}</p>
              <h2 className="mt-3 font-serif text-3xl text-foreground">{svc.title}</h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{svc.body}</p>
              <ul className="mt-6 space-y-2.5">
                {svc.includes.map((i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-foreground/85">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{i}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/contact"
                className="mt-8 inline-flex w-max border-b border-primary pb-1 text-[11px] uppercase tracking-[0.22em] text-primary hover:opacity-70"
              >
                Inquire →
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[oklch(0.955_0.012_60)]">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 py-24 md:grid-cols-2">
          <img
            src={archImg}
            alt="Floral wedding arch installation"
            loading="lazy"
            width={900}
            height={1200}
            className="aspect-[3/4] w-full rounded-sm object-cover"
          />
          <div>
            <p className="eyebrow">Process</p>
            <h2 className="mt-3 font-serif text-4xl leading-tight text-foreground md:text-5xl">
              How we work together
            </h2>
            <ol className="mt-8 space-y-6">
              {[
                ["01", "Enquire", "Tell us the date, the vision and the venue."],
                ["02", "Design", "We share a mood board, palette and detailed proposal."],
                ["03", "Refine", "Adjust until every stem and vessel feels right."],
                ["04", "Deliver", "We install, style and stay to see it come to life."],
              ].map(([n, t, d]) => (
                <li key={n} className="grid grid-cols-[auto_1fr] gap-6">
                  <span className="font-serif text-2xl text-primary">{n}</span>
                  <div>
                    <p className="font-serif text-xl text-foreground">{t}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{d}</p>
                  </div>
                </li>
              ))}
            </ol>
            <Link
              to="/contact"
              className="mt-10 inline-flex rounded-sm bg-primary px-7 py-3.5 text-[11px] uppercase tracking-[0.24em] text-primary-foreground hover:bg-primary/90"
            >
              Start your inquiry
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
