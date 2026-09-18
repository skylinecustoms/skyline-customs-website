/**
 * ServiceCityLinks — "Serving Northern Virginia" block for the four main
 * service pages. Links to every city landing page for that service so
 * search engines (and visitors) reach each local page in one click.
 */

import { Link } from "wouter";
import { MapPin } from "lucide-react";
import { CITY_ORDER, SERVICES, cityPath, type ServiceKey } from "@/lib/localSeo";

export default function ServiceCityLinks({ service }: { service: ServiceKey }) {
  const label = SERVICES[service].label;
  return (
    <section className="py-16 bg-[#0D0D0D] border-t border-zinc-800">
      <div className="container">
        <div className="flex items-center gap-2 mb-3">
          <MapPin className="w-4 h-4 text-[#E85D04]" />
          <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase">Service Areas</p>
        </div>
        <h2 className="font-['Bebas_Neue',sans-serif] text-4xl md:text-5xl text-white mb-3">
          {label.toUpperCase()} ACROSS NORTHERN VIRGINIA
        </h2>
        <p className="text-zinc-400 max-w-2xl mb-8">
          All work is done at our Chantilly shop off Route 28, an easy drive from anywhere in NOVA. Pick your city for local details, drive times, and FAQs.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-px bg-zinc-800">
          {CITY_ORDER.map((city) => (
            <Link
              key={city}
              href={cityPath(service, city)}
              className="bg-[#0D0D0D] hover:bg-[#111] px-4 py-3 text-sm text-zinc-300 hover:text-[#E85D04] transition-colors"
            >
              {label} in {city}, VA
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
