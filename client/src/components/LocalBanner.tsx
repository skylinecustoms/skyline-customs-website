/**
 * LocalBanner — "Serving Chantilly, VA & Northern Virginia" internal link banner.
 * Place near the bottom of each service detail page to pass link equity
 * to the corresponding local SEO landing page.
 */

import { Link } from "wouter";
import { MapPin, ArrowRight } from "lucide-react";

interface LocalBannerProps {
  /** The local landing page URL, e.g. "/ppf-chantilly-va" */
  localHref: string;
  /** Service name for the CTA copy, e.g. "PPF" */
  serviceName: string;
}

const NEARBY_CITIES = [
  "Chantilly", "Centreville", "Herndon", "Reston",
  "Ashburn", "Sterling", "Fairfax", "Vienna",
];

export default function LocalBanner({ localHref, serviceName }: LocalBannerProps) {
  return (
    <section className="py-12 bg-[#0D0D0D] border-t border-b border-zinc-800">
      <div className="container max-w-5xl">
        <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
          {/* Icon + heading */}
          <div className="flex items-start gap-4 flex-1">
            <div className="w-10 h-10 bg-[#E85D04]/10 border border-[#E85D04]/30 flex items-center justify-center flex-shrink-0 rounded-sm mt-0.5">
              <MapPin className="w-5 h-5 text-[#E85D04]" />
            </div>
            <div>
              <h3 className="text-white font-bold text-base mb-1">
                Serving Chantilly, VA &amp; Northern Virginia
              </h3>
              <p className="text-zinc-500 text-sm leading-relaxed">
                Our shop is located at 4215 Walney Rd Suite 1A &amp; B, Chantilly, VA 20151 — minutes from{" "}
                {NEARBY_CITIES.slice(0, 5).join(", ")}, and more.
              </p>
              {/* Nearby city tags */}
              <div className="flex flex-wrap gap-2 mt-3">
                {NEARBY_CITIES.map((city) => (
                  <span
                    key={city}
                    className="text-zinc-500 text-xs border border-zinc-800 px-2.5 py-1 hover:border-zinc-600 hover:text-zinc-300 transition-colors"
                  >
                    {city}, VA
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="flex-shrink-0">
            <Link
              href={localHref}
              className="inline-flex items-center gap-2 bg-[#E85D04] hover:bg-[#d14e00] text-black font-bold tracking-widest uppercase text-sm px-6 py-3 transition-all duration-200 hover:scale-105 whitespace-nowrap"
            >
              {serviceName} in Chantilly, VA
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
