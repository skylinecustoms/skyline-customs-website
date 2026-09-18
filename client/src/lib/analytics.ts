/**
 * Conversion tracking helpers.
 *
 * Google Analytics 4 (gtag) and the Facebook Pixel (fbq) are loaded in
 * client/index.html. These helpers are safe to call when either is missing.
 *
 * Events sent to GA4 (mark these as conversions in the GA4 admin):
 *   generate_lead  — quote form, contact form, or AI assistant hand-off
 *   phone_call     — any tap on a tel: link
 *   booking_open   — the booking modal was opened
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export function track(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  try {
    window.gtag?.("event", event, params);
  } catch {
    /* analytics must never break the page */
  }
}

export function trackLead(method: "quote_form" | "contact_form" | "ai_assistant", service?: string) {
  track("generate_lead", { method, service: service || "unspecified", currency: "USD", value: 0 });
  try {
    window.fbq?.("track", "Lead", { content_name: service || "Quote Request", content_category: "Auto Protection" });
  } catch {
    /* ignore */
  }
}

/** Attach once at app root: records every click on a phone link. */
export function installPhoneCallTracking() {
  if (typeof document === "undefined") return () => {};
  const handler = (e: MouseEvent) => {
    const a = (e.target as HTMLElement | null)?.closest?.('a[href^="tel:"]') as HTMLAnchorElement | null;
    if (a) track("phone_call", { phone_number: a.getAttribute("href")?.replace("tel:", ""), page_path: window.location.pathname });
  };
  document.addEventListener("click", handler, { capture: true });
  return () => document.removeEventListener("click", handler, { capture: true });
}
