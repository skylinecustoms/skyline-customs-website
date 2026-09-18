/**
 * NearbyAreas — Shared geographic cross-link component
 * Renders a "Nearby Service Areas" section on each city landing page,
 * linking to the same service in neighboring cities.
 *
 * Usage:
 *   <NearbyAreas city="Stafford" service="ppf" />
 *
 * service values: "ppf" | "ceramic" | "tint" | "wrap"
 */

import { Link } from "wouter";
import { MapPin, ArrowRight } from "lucide-react";

type Service = "ppf" | "ceramic" | "tint" | "wrap";

interface NearbyAreasProps {
  city: string;
  service: Service;
}

// URL slug prefixes for each service
const serviceSlug: Record<Service, string> = {
  ppf: "ppf",
  ceramic: "ceramic-coating",
  tint: "window-tinting",
  wrap: "vinyl-wraps",
};

// Human-readable service labels
const serviceLabel: Record<Service, string> = {
  ppf: "Paint Protection Film",
  ceramic: "Ceramic Coating",
  tint: "Window Tinting",
  wrap: "Vinyl Wraps",
};

// URL city slug for each city name
const citySlug: Record<string, string> = {
  Chantilly: "chantilly-va",
  Centreville: "centreville-va",
  Herndon: "herndon-va",
  Fairfax: "fairfax-va",
  Vienna: "vienna-va",
  Reston: "reston-va",
  McLean: "mclean-va",
  Tysons: "tysons-va",
  Alexandria: "alexandria-va",
  Arlington: "arlington-va",
  "Falls Church": "falls-church-va",
  Springfield: "springfield-va",
  Manassas: "manassas-va",
  Woodbridge: "woodbridge-va",
  Stafford: "stafford-va",
  Fredericksburg: "fredericksburg-va",
};

// Geographic neighbor clusters — each city lists its 4 closest neighbors
const neighbors: Record<string, string[]> = {
  Chantilly: ["Centreville", "Herndon", "Reston", "Fairfax"],
  Centreville: ["Chantilly", "Fairfax", "Manassas", "Vienna"],
  Herndon: ["Chantilly", "Reston", "Vienna", "McLean"],
  Fairfax: ["Centreville", "Vienna", "Springfield", "Chantilly"],
  Vienna: ["Fairfax", "Tysons", "McLean", "Herndon"],
  Reston: ["Herndon", "McLean", "Tysons", "Chantilly"],
  McLean: ["Tysons", "Vienna", "Reston", "Arlington"],
  Tysons: ["McLean", "Vienna", "Reston", "Falls Church"],
  Alexandria: ["Arlington", "Springfield", "Falls Church", "McLean"],
  Arlington: ["Alexandria", "McLean", "Falls Church", "Tysons"],
  "Falls Church": ["Arlington", "Alexandria", "Tysons", "Vienna"],
  Springfield: ["Alexandria", "Fairfax", "Woodbridge", "Manassas"],
  Manassas: ["Centreville", "Springfield", "Woodbridge", "Fairfax"],
  Woodbridge: ["Springfield", "Manassas", "Stafford", "Alexandria"],
  Stafford: ["Woodbridge", "Fredericksburg", "Manassas", "Springfield"],
  Fredericksburg: ["Stafford", "Woodbridge", "Manassas", "Springfield"],
};

export default function NearbyAreas({ city, service }: NearbyAreasProps) {
  const nearbyList = neighbors[city] ?? [];
  if (nearbyList.length === 0) return null;

  const svcSlug = serviceSlug[service];
  const svcLabel = serviceLabel[service];

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
            const slug = citySlug[neighbor];
            if (!slug) return null;
            return (
              <Link
                key={neighbor}
                href={`/${svcSlug}-${slug}`}
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
