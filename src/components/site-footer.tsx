import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Mail, Phone, MapPin, MessageCircle, Clock } from "lucide-react";
import { site, waLink } from "@/lib/site";
import logo from "@/assets/luxe_floral_logo.svg";

export function SiteFooter() {
  return (
    <footer className="bg-[#5C1D24] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 sm:grid-cols-2 md:grid-cols-3">
        {/* Column 1: Brand */}
        <div className="space-y-4">
          <img
            src={logo}
            alt={`${site.full} logo`}
            className="h-14 w-auto md:h-16"
            style={{ filter: "brightness(0) invert(1)" }}
          />
          <p className="max-w-xs text-sm leading-relaxed text-[#E0E0E0]">
            Romantic, luxury florals for the moments that matter — from a Tuesday bouquet to the
            wedding of a lifetime.
          </p>
          <div className="flex items-center gap-3">
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 text-white transition-all duration-300 hover:border-white hover:bg-white hover:text-[#5C1D24]"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href={site.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 text-white transition-all duration-300 hover:border-white hover:bg-white hover:text-[#5C1D24]"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 text-white transition-all duration-300 hover:border-white hover:bg-white hover:text-[#5C1D24]"
            >
              <MessageCircle className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Column 2: Explore */}
        <div>
          <h3 className="text-xs uppercase tracking-[1.5px] font-semibold text-white mb-5">
            Explore
          </h3>
          <ul className="space-y-3 text-sm text-[#E0E0E0]">
            <li>
              <Link to="/catalogue" className="transition-opacity hover:opacity-80">
                Bouquets
              </Link>
            </li>
            <li>
              <Link to="/occasions" className="transition-opacity hover:opacity-80">
                Occasions
              </Link>
            </li>
            <li>
              <Link to="/gallery" className="transition-opacity hover:opacity-80">
                Gallery
              </Link>
            </li>
            <li>
              <Link to="/contact" className="transition-opacity hover:opacity-80">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Studio Info */}
        <div>
          <h3 className="text-xs uppercase tracking-[1.5px] font-semibold text-white mb-5">
            Studio Info
          </h3>
          <ul className="space-y-3.5 text-sm text-[#E0E0E0]">
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 text-white shrink-0" />
              <span>{site.address}</span>
            </li>
            <li className="flex items-start gap-2.5">
              <Phone className="mt-0.5 h-4 w-4 text-white shrink-0" />
              <a href={site.phoneHref} className="hover:underline">{site.phone}</a>
            </li>
            <li className="flex items-start gap-2.5">
              <Mail className="mt-0.5 h-4 w-4 text-white shrink-0" />
              <a href={`mailto:${site.email}`} className="hover:underline break-all">{site.email}</a>
            </li>
            <li className="flex items-start gap-2.5">
              <Clock className="mt-0.5 h-4 w-4 text-white shrink-0" />
              <span>{site.hours}</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Copyright & Payments */}
      <div className="border-t border-white/15">
        <div className="mx-auto max-w-7xl px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs tracking-[1.5px] text-[#E0E0E0] text-center sm:text-left">
            © {new Date().getFullYear()} {site.full}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="border border-white/20 px-2 py-0.5 rounded text-[9px] tracking-widest text-[#E0E0E0] uppercase font-semibold">MTN MoMo</span>
            <span className="border border-white/20 px-2 py-0.5 rounded text-[9px] tracking-widest text-[#E0E0E0] uppercase font-semibold">Airtel Money</span>
            <span className="border border-white/20 px-2 py-0.5 rounded text-[9px] tracking-widest text-[#E0E0E0] uppercase font-semibold">Visa</span>
            <span className="border border-white/20 px-2 py-0.5 rounded text-[9px] tracking-widest text-[#E0E0E0] uppercase font-semibold">Mastercard</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
