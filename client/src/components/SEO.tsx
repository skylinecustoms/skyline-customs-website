import { useEffect } from "react";

/*
 * SKYLINE CUSTOMS — SEO Component
 * Injects page-specific meta tags, Open Graph, Twitter Card, and canonical URL
 * into the document <head> on mount/update.
 */

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  jsonLd?: object | object[];
}

const SITE_NAME = "Skyline Customs";
const BASE_URL = "https://www.skylinecustomshop.com";
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image.jpg`;

export default function SEO({ title, description, canonical, ogImage, jsonLd }: SEOProps) {
  const fullTitle = `${title} | ${SITE_NAME}`;
  const canonicalUrl = canonical
    ? canonical.startsWith("http")
      ? canonical
      : `${BASE_URL}${canonical}`
    : BASE_URL;
  const imageUrl = ogImage ?? DEFAULT_OG_IMAGE;

  useEffect(() => {
    // Title
    document.title = fullTitle;

    // Helper to set or create a meta tag
    const setMeta = (selector: string, attr: string, value: string) => {
      let el = document.querySelector<HTMLMetaElement>(selector);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr.split("=")[0], attr.split("=")[1]?.replace(/"/g, "") ?? "");
        document.head.appendChild(el);
      }
      el.setAttribute("content", value);
    };

    // Standard meta
    setMeta('meta[name="description"]', 'name="description"', description);
    setMeta('meta[name="robots"]', 'name="robots"', "index, follow");

    // Open Graph
    setMeta('meta[property="og:title"]', 'property="og:title"', fullTitle);
    setMeta('meta[property="og:description"]', 'property="og:description"', description);
    setMeta('meta[property="og:url"]', 'property="og:url"', canonicalUrl);
    setMeta('meta[property="og:image"]', 'property="og:image"', imageUrl);
    setMeta('meta[property="og:type"]', 'property="og:type"', "website");
    setMeta('meta[property="og:site_name"]', 'property="og:site_name"', SITE_NAME);

    // Twitter Card
    setMeta('meta[name="twitter:card"]', 'name="twitter:card"', "summary_large_image");
    setMeta('meta[name="twitter:title"]', 'name="twitter:title"', fullTitle);
    setMeta('meta[name="twitter:description"]', 'name="twitter:description"', description);
    setMeta('meta[name="twitter:image"]', 'name="twitter:image"', imageUrl);

    // Canonical
    let canonicalEl = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonicalEl) {
      canonicalEl = document.createElement("link");
      canonicalEl.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute("href", canonicalUrl);

    // JSON-LD structured data — supports single object or array of objects
    document.querySelectorAll('script[data-seo-jsonld]').forEach(el => el.remove());
    if (jsonLd) {
      const schemas = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
      schemas.forEach((schema, i) => {
        const script = document.createElement("script");
        script.setAttribute("type", "application/ld+json");
        script.setAttribute("data-seo-jsonld", String(i));
        script.textContent = JSON.stringify(schema);
        document.head.appendChild(script);
      });
    }
  }, [fullTitle, description, canonicalUrl, imageUrl, jsonLd]);

  return null;
}
