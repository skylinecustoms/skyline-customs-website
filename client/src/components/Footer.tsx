import { Link } from "wouter";
import { Phone, Mail, MapPin, Instagram, Youtube } from "lucide-react";
import { CITY_ORDER, cityPath } from "@/lib/localSeo";

export default function Footer() {
  return (
    <footer className="bg-[oklch(0.08_0.005_285)] border-t border-[oklch(0.20_0.006_285)]">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <img
                src="/images/skyline-logo.webp"
                alt="Skyline Customs"
                width={108}
                height={120}
                className="h-10 w-auto object-contain"
              />
              <div className="flex flex-col leading-none">
                <span className="font-display text-2xl text-[oklch(0.96_0.008_85)] tracking-wider">
                  SKYLINE
                </span>
                <span className="font-mono-brand text-[10px] text-brand-orange tracking-[0.2em] uppercase">
                  Customs
                </span>
              </div>
            </div>
            <p className="text-[oklch(0.55_0.01_285)] text-sm leading-relaxed max-w-xs mb-6">
              Northern Virginia's premier automotive protection specialists. Trusted by 140+ drivers for window tinting, ceramic coating, and PPF.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/skylinecustomshop/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-[oklch(0.25_0.006_285)] flex items-center justify-center text-[oklch(0.55_0.01_285)] hover:text-brand-orange hover:border-brand-orange transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://www.youtube.com/@SkylineCustomsOfficial"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-[oklch(0.25_0.006_285)] flex items-center justify-center text-[oklch(0.55_0.01_285)] hover:text-brand-orange hover:border-brand-orange transition-colors"
                aria-label="YouTube"
              >
                <Youtube size={16} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-display text-lg text-[oklch(0.96_0.008_85)] tracking-wider mb-5">
              SERVICES
            </h3>
            <ul className="space-y-3">
              {[
                { label: "Window Tinting", href: "/services/window-tinting" },
                { label: "Ceramic Coating", href: "/services/ceramic-coating" },
                { label: "Paint Protection Film", href: "/services/ppf" },
                { label: "PPF Cost Guide", href: "/ppf-cost" },
                { label: "Tesla PPF", href: "/tesla-ppf" },
                { label: "PPF vs Ceramic Coating", href: "/ppf-vs-ceramic-coating" },
                { label: "Tint Types Compared", href: "/ceramic-vs-carbon-vs-dyed-tint" },
                { label: "All Services", href: "/services" },
                { label: "Videos", href: "/videos" },
                { label: "FAQ", href: "/faq" },
                { label: "Reviews", href: "/reviews" },
                { label: "Service Areas", href: "/service-areas" },
              ].map((s) => (
                <li key={s.label}>
                  <Link
                    href={s.href}
                    className="text-[oklch(0.55_0.01_285)] text-sm hover:text-brand-orange transition-colors"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>


          {/* Areas we serve */}
          <div>
            <h3 className="font-display text-lg text-[oklch(0.96_0.008_85)] tracking-wider mb-5">
              AREAS WE SERVE
            </h3>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
              {CITY_ORDER.map((city) => (
                <li key={city}>
                  <Link
                    href={cityPath("ppf", city)}
                    className="text-[oklch(0.55_0.01_285)] text-sm hover:text-brand-orange transition-colors"
                  >
                    {city}
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/service-areas" className="inline-block mt-4 text-brand-orange text-xs font-mono-brand uppercase tracking-widest hover:underline">
              All service areas
            </Link>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display text-lg text-[oklch(0.96_0.008_85)] tracking-wider mb-5">
              CONTACT
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+17037754383"
                  className="flex items-start gap-3 text-[oklch(0.55_0.01_285)] text-sm hover:text-brand-orange transition-colors"
                >
                  <Phone size={14} className="mt-0.5 shrink-0 text-brand-orange" />
                  (703) 775-4383
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@skylinecustomshop.com"
                  className="flex items-start gap-3 text-[oklch(0.55_0.01_285)] text-sm hover:text-brand-orange transition-colors"
                >
                  <Mail size={14} className="mt-0.5 shrink-0 text-brand-orange" />
                  info@skylinecustomshop.com
                </a>
              </li>
              <li>
                <a
                  href="https://maps.google.com/?q=4215+Walney+Rd+Suite+1A+%26+B+Chantilly+VA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-[oklch(0.55_0.01_285)] text-sm hover:text-brand-orange transition-colors"
                >
                  <MapPin size={14} className="mt-0.5 shrink-0 text-brand-orange" />
                  4215 Walney Rd. Suite 1A &amp; B<br />Chantilly, VA 20151
                </a>
              </li>
            </ul>
            <div className="mt-5">
              <p className="font-mono-brand text-xs text-[oklch(0.40_0.008_285)] uppercase tracking-widest mb-1">Hours</p>
              <p className="text-[oklch(0.55_0.01_285)] text-sm">Mon–Fri: 9AM – 6PM</p>
              <p className="text-[oklch(0.40_0.008_285)] text-sm">Weekends: Closed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[oklch(0.15_0.005_285)]">
        <div className="container py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[oklch(0.40_0.008_285)] font-mono-brand text-xs">
            © 2026 Skyline Customs. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="text-[oklch(0.40_0.008_285)] font-mono-brand text-xs hover:text-brand-orange transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="text-[oklch(0.40_0.008_285)] font-mono-brand text-xs hover:text-brand-orange transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
