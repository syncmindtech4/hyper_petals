import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Mail, Phone, MapPin, MessageCircle, Instagram } from "lucide-react";
import { site } from "@/lib/site";
import { useContact } from "@/hooks/useSiteContent";

export const Route = createFileRoute("/contact")({
  component: Contact,
  head: () => ({
    meta: [
      { title: "Contact & Enquiries — Hyper Petals Decor" },
      {
        name: "description",
        content:
          "Get in touch with Hyper Petals Decor for bouquet orders, event florals and bespoke enquiries. WhatsApp, phone, email or send us a message.",
      },
      { property: "og:title", content: "Contact & Enquiries — Hyper Petals Decor" },
      {
        property: "og:description",
        content: "Get in touch for bouquets, event florals and bespoke enquiries.",
      },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
});

function Contact() {
  const [sent, setSent] = useState(false);
  const { data: c } = useContact();
  const waHref = `https://wa.me/${c.whatsapp}?text=${encodeURIComponent(site.whatsappMsg)}`;

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
    (e.target as HTMLFormElement).reset();
  }

  return (
    <section className="border-t border-border/60">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 py-20 md:grid-cols-[1fr_1.15fr] md:py-24">
        {/* LEFT */}
        <div>
          <p className="eyebrow">Get in touch</p>
          <h1 className="mt-4 font-serif text-5xl leading-[1.05] text-foreground md:text-6xl">
            Let's design something beautiful.
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
            Whether it's a Tuesday bouquet or a full wedding install, we'd love to hear about it.
            WhatsApp is fastest.
          </p>

          <div className="mt-10 space-y-6">
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-4 group"
            >
              <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <MessageCircle className="h-4 w-4" />
              </span>
              <span>
                <span className="block text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                  WhatsApp
                </span>
                <span className="mt-1 block font-serif text-lg text-foreground group-hover:text-primary">
                  Message the studio
                </span>
              </span>
            </a>
            <a href={c.phoneHref} className="flex items-start gap-4 group">
              <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
                <Phone className="h-4 w-4" />
              </span>
              <span>
                <span className="block text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                  Phone
                </span>
                <span className="mt-1 block font-serif text-lg text-foreground group-hover:text-primary">
                  {c.phone}
                </span>
              </span>
            </a>
            <a href={`mailto:${c.email}`} className="flex items-start gap-4 group">
              <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
                <Mail className="h-4 w-4" />
              </span>
              <span>
                <span className="block text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                  Email
                </span>
                <span className="mt-1 block font-serif text-lg text-foreground group-hover:text-primary">
                  {c.email}
                </span>
              </span>
            </a>
            <div className="flex items-start gap-4">
              <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
                <MapPin className="h-4 w-4" />
              </span>
              <span>
                <span className="block text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                  Studio
                </span>
                <span className="mt-1 block font-serif text-lg text-foreground">{c.address}</span>
                <span className="mt-1 block text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {c.hours}
                </span>
              </span>
            </div>
          </div>

          <a
            href={c.instagram}
            className="mt-10 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-primary hover:opacity-70"
          >
            <Instagram className="h-4 w-4" /> Follow the studio
          </a>
        </div>

        {/* FORM */}
        <div className="rounded-sm border border-border/70 bg-card p-8 shadow-[var(--shadow-card)] md:p-10">
          <p className="eyebrow">Send a message</p>
          <h2 className="mt-2 font-serif text-3xl text-foreground">Tell us about it</h2>

          {sent ? (
            <div className="mt-10 rounded-sm border border-primary/30 bg-secondary/40 p-8 text-center">
              <p className="font-serif text-2xl text-foreground">
                Thank you — flowers already forming.
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                We'll be in touch within one business day.
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="mt-8 grid gap-5">
              <Field label="Name" name="name" required />
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Email" name="email" type="email" required />
                <Field label="Phone" name="phone" type="tel" />
              </div>
              <div className="grid gap-2">
                <label className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                  Enquiry type
                </label>
                <select
                  name="type"
                  defaultValue="bouquet"
                  className="rounded-sm border border-input bg-background px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none"
                >
                  <option value="bouquet">Bouquet Order</option>
                  <option value="wedding">Birthday Parties</option>
                  <option value="corporate">Bridal Showers</option>
                  <option value="bespoke">Baby Showers</option>
                  <option value="other">Marriage Proposals</option>
                  <option value="other">Kwanjula & Traditional Events</option>
                  <option value="other">Tea Party</option>
                  <option value="other">Corporate & Brand Events</option>
                  <option value="other">Something else</option>
                </select>
              </div>
              <div className="grid gap-2">
                <label className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                  Message
                </label>
                <textarea
                  name="message"
                  rows={5}
                  required
                  className="rounded-sm border border-input bg-background px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none"
                  placeholder="Tell us the date, occasion and any vision you already have…"
                />
              </div>
              <button
                type="submit"
                className="mt-2 rounded-sm bg-primary px-8 py-3.5 text-[11px] uppercase tracking-[0.24em] text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Send enquiry
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div className="grid gap-2">
      <label className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
        {label}
        {required && " *"}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        className="rounded-sm border border-input bg-background px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none"
      />
    </div>
  );
}
