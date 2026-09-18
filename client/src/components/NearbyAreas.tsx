/**
 * NearbyAreas — Shared geographic cross-link component
 * Renders a "Nearby Service Areas" section on each city landing page,
 * linking to the same service in neighboring cities.
 *
 * Usage:
 *   <NearbyAreas city="Stafford" service="ppf" />
 *
 * City names, slugs, and neighbor lists live in @/lib/localSeo.
 */

import { Link } from "wouter";
import { MapPin, ArrowRight } from "lucide-react";
import { CITIES, SERVICES, cityPath, type ServiceKey } from "@/lib/localSeo";

interface NearbyAreasProps {
  city: string;
  service: ServiceKey;
}

export default function NearbyAreas({ city, service }: NearbyAreasProps) {
  const nearbyList = CITIES[city]?.neighbors ?? [];
  if (nearbyList.length === 0) return null;
  const svcLabel = SERVICES[service].label;

  return (
    <section className="py-12 bg-[#0D0D0D] border-t border-zinc-800">
      <div className="container">
        <div className="flex items-center gap-2 mb-6">
          <MapPin className="w-4 h-4 text-[#E85D04]" />
          <h2 className="font-['Bebas_Neue',sans-serif] text-2xl text-white tracking-wide">
            ALSO SERVING NEARBY AREAS
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {nearbyList.map((neighbor) => {
            if (!CITIES[neighbor]) return null;
            return (
              <Link
                key={neighbor}
                href={cityPath(service, neighbor)}
                className="group flex items-center justify-between gap-2 bg-[#111] hover:bg-[#1a1a1a] border border-zinc-800 hover:border-[#E85D04]/40 px-4 py-3 transition-all"
              >
                <div>
                  <div className="text-white text-sm font-medium group-hover:text-[#E85D04] transition-colors">
                    {neighbor}
                  </div>
                  <div className="text-zinc-500 text-xs">{svcLabel}</div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-[#E85D04] shrink-0 transition-colors" />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
