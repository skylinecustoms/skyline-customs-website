/**
 * Audience PPF pages: military bases and federal workplaces (/ppf-<slug>) and
 * dealer-delivery areas (/new-car-ppf-<slug>). Rendered by components/AudiencePage.tsx.
 */
export interface AudiencePage {
  slug: string;
  path: string;
  kind: "base" | "dealer";
  name: string;
  seoTitle: string;
  seoDescription: string;
  eyebrow: string;
  h1: string;
  intro: string[];
  drive: string;
  reasons: { title: string; desc: string }[];
  logistics: { title: string; body: string }[];
  packages: { pkg: "partial" | "fullFront" | "fullFrontPlus"; note: string }[];
  faqs: { q: string; a: string }[];
  nearbyCities: string[];
  videoIds: string[];
}

export const AUDIENCE_PAGES: AudiencePage[] = [];
