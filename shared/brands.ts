/**
 * Suppliers the shop installs and the vehicle makes in the gallery, used by the
 * homepage logo carousels, the image sitemap and the homepage structured data.
 * Logo files live in client/public/images/logos.
 */
export interface BrandLogo {
  name: string;
  /** Site-relative logo path; omit for a text wordmark. */
  logo?: string;
  /** Where the tile links: an internal page or the supplier's website. */
  href: string;
  /** Image alt text (also the image title in the sitemap). */
  alt: string;
  /** Short line under the logo. */
  caption: string;
  /** Logo is white artwork that must be inverted on a light tile. */
  invertOnLight?: boolean;
  width: number;
  height: number;
}

export const SUPPLIERS: BrandLogo[] = [
  { name: "STEK", logo: "/images/logos/stek.svg", href: "https://www.stek-usa.com/", alt: "STEK paint protection film - Skyline Customs is a STEK certified installer in Chantilly, VA", caption: "Certified PPF installer", invertOnLight: true, width: 100, height: 100 },
  { name: "Gtechniq", href: "https://gtechniq.com/", alt: "Gtechniq ceramic coatings installed by Skyline Customs in Chantilly, VA", caption: "Ceramic coatings", width: 240, height: 60 },
  { name: "GeoShield", logo: "/images/logos/geoshield.png", href: "https://geoshieldusa.com/", alt: "GeoShield Pro Nano Ceramic window film installed by Skyline Customs in Chantilly, VA", caption: "Ceramic window film", width: 150, height: 66 },
  { name: "PURE PPF", logo: "/images/logos/pureppf.webp", href: "https://pureppf.com/", alt: "PURE PPF paint protection film installed by Skyline Customs in Chantilly, VA", caption: "Paint protection film", width: 480, height: 131 },
];

export const VEHICLE_MAKES: BrandLogo[] = [
  { name: "BMW", logo: "/images/logos/bmw.svg", href: "/bmw-ppf", alt: "BMW paint protection film and ceramic coating in Chantilly, VA", caption: "M340i, X5, iX, Z4", width: 24, height: 24 },
  { name: "Tesla", logo: "/images/logos/tesla.svg", href: "/tesla-ppf", alt: "Tesla paint protection film in Chantilly, VA", caption: "Model 3, Cybertruck", width: 24, height: 24 },
  { name: "Corvette", logo: "/images/logos/chevrolet.svg", href: "/corvette-ppf", alt: "Corvette C8 Z06 paint protection film in Chantilly, VA", caption: "C8 Z06", width: 24, height: 24 },
  { name: "Mercedes-Benz", logo: "/images/logos/mercedes.svg", href: "/gallery/2024-mercedes-gle-53-amg-coupe-full-front-ppf-ceramic-coating", alt: "Mercedes-AMG GLE 53 paint protection film in Chantilly, VA", caption: "GLE 53 AMG", width: 24, height: 24 },
  { name: "Ford", logo: "/images/logos/ford.svg", href: "/bronco-ppf", alt: "Ford Bronco and Shelby GT350 paint protection film in Chantilly, VA", caption: "Bronco, Shelby GT350", width: 24, height: 24 },
  { name: "Toyota", logo: "/images/logos/toyota.svg", href: "/gallery/toyota-4runner-trailhunter-2026-full-front-ppf-ceramic-coating", alt: "Toyota 4Runner, Tacoma and Supra paint protection film in Chantilly, VA", caption: "4Runner, Tacoma, Supra", width: 24, height: 24 },
  { name: "Jeep", logo: "/images/logos/jeep.svg", href: "/gallery/2025-jeep-rubicon-full-front-ppf", alt: "Jeep Wrangler and Grand Cherokee paint protection film in Chantilly, VA", caption: "Wrangler, Grand Cherokee", width: 24, height: 24 },
  { name: "Lucid", logo: "/images/logos/lucid.svg", href: "/gallery/2022-lucid-air-full-front-ppf-ceramic-coating", alt: "Lucid Air paint protection film in Chantilly, VA", caption: "Air", width: 24, height: 24 },
  { name: "Cadillac", logo: "/images/logos/cadillac.svg", href: "/gallery/2023-cadillac-escalade-full-front-ppf-ceramic-coating", alt: "Cadillac Escalade paint protection film in Chantilly, VA", caption: "Escalade", width: 24, height: 24 },
  { name: "Acura", logo: "/images/logos/acura.svg", href: "/gallery/acura-integra-type-s-2023-full-front-ppf-ceramic-coating", alt: "Acura Integra Type S and MDX paint protection film in Chantilly, VA", caption: "Integra Type S, MDX", width: 24, height: 24 },
  { name: "Nissan", logo: "/images/logos/nissan.svg", href: "/gallery/nissan-gt-r-2021-full-front-ppf-ceramic-coating", alt: "Nissan GT-R paint protection film in Chantilly, VA", caption: "GT-R", width: 24, height: 24 },
  { name: "Honda", logo: "/images/logos/honda.svg", href: "/gallery/honda-pilot-elite-2026-full-front-ppf-ceramic-coating", alt: "Honda Pilot paint protection film in Chantilly, VA", caption: "Pilot Elite", width: 24, height: 24 },
  { name: "Mazda", logo: "/images/logos/mazda.svg", href: "/gallery/2026-mazda-cx-90-full-front-ppf", alt: "Mazda CX-90 paint protection film in Chantilly, VA", caption: "CX-90", width: 24, height: 24 },
  { name: "Kia", logo: "/images/logos/kia.svg", href: "/gallery/kia-seltos-full-front-ppf-ceramic-coating", alt: "Kia Seltos paint protection film in Chantilly, VA", caption: "Seltos", width: 24, height: 24 },
  { name: "MINI", logo: "/images/logos/mini.svg", href: "/gallery/2027-mini-countryman-s-full-front-ppf-ceramic-coating", alt: "Mini Countryman paint protection film in Chantilly, VA", caption: "Countryman S", width: 24, height: 24 },
];
