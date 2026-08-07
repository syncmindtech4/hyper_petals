import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Mail, Phone, MapPin } from "lucide-react";
import { site } from "@/lib/site";
import logo from "@/assets/luxe_floral_logo_white.svg";

//cream color: bg-[oklch(0.955_0.012_60)]

export function SiteFooter() {
  return (
    <footer className="mt-1 border-t border-border/60] bg-primary text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <img
            src={logo}
            alt={`${site.full} logo`}
            className="logo1 h-14 md:h-16"
            style={{ width: 300 }}
          />
          <p className="mt-3 max-w-sm text-sm leading-relaxed">
            Romantic, luxury florals for the moments that matter — from a Tuesday bouquet to the
            wedding of a lifetime.
          </p>
          <div className="mt-5 flex items-center gap-4">
            <a
              href={site.instagram}
              aria-label="Instagram"
              className="transition-colors hover:text-dark"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href={site.facebook}
              aria-label="Facebook"
              className="transition-colors hover:text-dark"
            >
              <Facebook className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <p className="eyebrow">Studio</p>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4" />
              <span>{site.address}</span>
            </li>
            <li className="flex items-start gap-2">
              <Phone className="mt-0.5 h-4 w-4" />
              <a href={site.phoneHref}>{site.phone}</a>
            </li>
            <li className="flex items-start gap-2">
              <Mail className="mt-0.5 h-4 w-4" />
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </li>
          </ul>
          <p className="mt-4 text-xs uppercase tracking-[0.2em]">{site.hours}</p>
        </div>

        <div>
          <p className="eyebrow">Explore</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link to="/bouquets" className="hover:text-primary">
                Bouquets
              </Link>
            </li>
            <li>
              <Link to="/occasions" className="hover:text-primary">
                Occasions
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
        <p className="mx-auto max-w-7xl px-6 py-6 text-xs lowercase tracking-[0.22em]">
          © {new Date().getFullYear()} {site.full}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
