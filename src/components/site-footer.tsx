import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Mail, Phone, MapPin } from "lucide-react";
import { site } from "@/lib/site";
import logo from "@/assets/luxe_floral_logo.svg";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-[oklch(0.955_0.012_60)]">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <img
            src={logo}
            alt={`${site.full} logo`}
            className="h-14 md:h-16"
            style={{ width: 300 }}
          />
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Romantic, luxury florals for the moments that matter — from a Tuesday bouquet to the
            wedding of a lifetime.
          </p>
          <div className="mt-5 flex items-center gap-4 text-foreground/70">
            <a
              href={site.instagram}
              aria-label="Instagram"
              className="transition-colors hover:text-primary"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href={site.facebook}
              aria-label="Facebook"
              className="transition-colors hover:text-primary"
            >
              <Facebook className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <p className="eyebrow">Studio</p>
          <ul className="mt-4 space-y-3 text-sm text-foreground/80">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 text-primary" />
              <span>{site.address}</span>
            </li>
            <li className="flex items-start gap-2">
              <Phone className="mt-0.5 h-4 w-4 text-primary" />
              <a href={site.phoneHref}>{site.phone}</a>
            </li>
            <li className="flex items-start gap-2">
              <Mail className="mt-0.5 h-4 w-4 text-primary" />
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </li>
          </ul>
          <p className="mt-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {site.hours}
          </p>
        </div>

        <div>
          <p className="eyebrow">Explore</p>
          <ul className="mt-4 space-y-2 text-sm text-foreground/80">
            <li>
              <Link to="/" className="hover:text-primary">
                Home
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-primary">
                Services
              </Link>
            </li>
            <li>
              <Link to="/gallery" className="hover:text-primary">
                Gallery
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-primary">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60">
        <p className="mx-auto max-w-7xl px-6 py-6 text-xs uppercase tracking-[0.22em] text-muted-foreground">
          © {new Date().getFullYear()} {site.full}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
