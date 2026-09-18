/**
 * Manufacturer certifications / partners shown on /about and in blog author boxes.
 */
export interface Certification { name: string; short: string; url: string; product: string; what: string; warranty: string }

export const CERTIFICATIONS: Certification[] = [
  {
    name: "STEK Automotive",
    short: "STEK",
    url: "https://stek-usa.com/",
    product: "DYNOshield & DYNOmatt paint protection film",
    what: "Self-healing, hydrophobic PPF cut on the manufacturer's pattern software for an edge-to-edge fit.",
    warranty: "12-year manufacturer warranty against yellowing, cracking, and peeling.",
  },
  {
    name: "GeoShield Window Films",
    short: "GeoShield",
    url: "https://www.geoshieldtint.com/",
    product: "Pro Nano Ceramic window film",
    what: "Non-metalized ceramic tint with 99% UV and 80–83% infrared rejection, signal-safe for EVs and phones.",
    warranty: "Nationwide lifetime warranty against fading, bubbling, and peeling.",
  },
  {
    name: "Gtechniq",
    short: "Gtechniq",
    url: "https://gtechniq.com/",
    product: "Crystal Serum Light & EXO ceramic coatings",
    what: "Professional-only ceramic coatings applied after paint correction for gloss, chemical resistance, and easy washing.",
    warranty: "5-year (Crystal) and 7-year (Ultimate) warranties.",
  },
];
