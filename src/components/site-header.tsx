import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/luxe-floral-logo.png.asset.json";
import { site } from "@/lib/site";

const nav = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4 md:py-5">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="font-serif text-xl leading-none tracking-tight text-foreground md:text-2xl">
            {site.name}
          </span>
          <span className="hidden text-[10px] uppercase tracking-[0.28em] text-primary md:inline">
            {site.tagline}
          </span>
        </Link>

        <nav className="hidden items-center gap-9 md:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-[13px] uppercase tracking-[0.2em] text-foreground/75 transition-colors hover:text-primary"
              activeProps={{ className: "text-primary" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <Link
          to="/contact"
          className="hidden rounded-sm bg-primary px-5 py-2.5 text-[11px] uppercase tracking-[0.22em] text-primary-foreground transition-colors hover:bg-primary/90 md:inline-flex"
        >
          Enquire
        </Link>

        <button
          type="button"
          aria-label="Toggle menu"
          className="text-foreground md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border/60 bg-background md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-4">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="py-3 text-sm uppercase tracking-[0.2em] text-foreground/80"
                activeProps={{ className: "text-primary" }}
                activeOptions={{ exact: n.to === "/" }}
              >
                {n.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-sm bg-primary px-5 py-3 text-[11px] uppercase tracking-[0.22em] text-primary-foreground"
            >
              Enquire
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
