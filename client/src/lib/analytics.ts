/**
 * Google Analytics 4 + Meta Pixel event layer.
 *
 * The gtag/fbq queue stubs live in client/index.html (the vendor scripts load
 * after first interaction). Everything here is safe to call when they are
 * missing, during SSR, or in a browser that blocks analytics.
 *
 * What GA4 receives (mark the starred ones as key events in GA4 admin):
 *   page_view              every route change, with content_group / service / city
 *   cta_click              any link to /get-a-quote or a [data-cta] element (cta_type, cta_text, cta_location)
 *   lead_form_start        first field focused in a lead form (form_id)
 *   generate_lead        * quote form, contact form, promo waitlist, or AI assistant hand-off
 *   form_error             a lead form submit failed
 *   phone_call           * tap on a tel: link
 *   email_click            tap on a mailto: link
 *   get_directions         tap on a Google Maps link
 *   booking_open           booking modal opened
 *   booking_service_select * a calendar was chosen inside the booking modal
 *   chat_open / chat_message  quote assistant
 *   video_open             a YouTube Short or reel opened with sound
 *   faq_open               an accordion/FAQ question expanded
 *   scroll_depth           25 / 50 / 75 % of a page (GA4 sends 90 % itself)
 *
 * Every event also carries the visitor's journey so far (landing_page,
 * pages_viewed, seconds_on_site), and the journey is stored in sessionStorage
 * so the lead forms can send the exact page path to the CRM with the lead.
 *
 * Add ?ga_debug=1 to any URL to see the session in GA4 DebugView.
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export const GA_MEASUREMENT_ID = "G-DDL3M7SVBK";
const JOURNEY_KEY = "sc_journey";
const DEBUG_KEY = "sc_ga_debug";
const MAX_STEPS = 40;

// ---------------------------------------------------------------------------
// Content grouping: turns a path into the dimensions the funnel reports use.
// ---------------------------------------------------------------------------
export interface PageGroup {
  content_group: string;
  service?: "ppf" | "ceramic" | "tint";
  city?: string;
  vehicle?: string;
}

const CITY_RE = /^\/(ppf|ceramic-coating|window-tinting|tint)-([a-z-]+)-va$/;

export function pageGroup(path: string): PageGroup {
  const p = path.replace(/\/+$/, "") || "/";
  if (p === "/") return { content_group: "Home" };
  if (p === "/services/ppf") return { content_group: "Service: PPF", service: "ppf" };
  if (p === "/services/ceramic-coating") return { content_group: "Service: Ceramic", service: "ceramic" };
  if (p === "/services/window-tinting") return { content_group: "Service: Tint", service: "tint" };
  if (p === "/services") return { content_group: "Services" };
  const city = p.match(CITY_RE);
  if (city) {
    const svc = city[1] === "ppf" ? "ppf" : city[1] === "ceramic-coating" ? "ceramic" : "tint";
    return { content_group: "City page", service: svc, city: city[2].replace(/-/g, " ") };
  }
  if (/^\/(tesla|bmw|porsche|corvette|rivian|bronco)-ppf$/.test(p)) return { content_group: "Vehicle PPF page", service: "ppf", vehicle: p.slice(1, -4) };
  if (/^\/(tesla-model-y|tesla-model-3|cybertruck|porsche-911)-ppf$/.test(p)) return { content_group: "Model PPF page", service: "ppf", vehicle: p.slice(1, -4) };
  if (p === "/ppf-cost" || p === "/ppf-vs-ceramic-coating") return { content_group: "PPF guide", service: "ppf" };
  if (p === "/get-a-quote") return { content_group: "Quote form" };
  if (p === "/contact") return { content_group: "Contact" };
  if (p === "/promo" || p.startsWith("/promo/")) return { content_group: "Promo" };
  if (p === "/gallery") return { content_group: "Gallery" };
  if (p.startsWith("/gallery/")) return { content_group: "Gallery job" };
  if (p === "/blog") return { content_group: "Blog index" };
  if (p.startsWith("/blog/")) return { content_group: "Blog post" };
  if (p === "/videos") return { content_group: "Videos" };
  if (p === "/faq") return { content_group: "FAQ" };
  if (p === "/reviews") return { content_group: "Reviews" };
  if (p === "/about") return { content_group: "About" };
  if (p === "/areas" || p.startsWith("/areas/")) return { content_group: "Service areas" };
  return { content_group: "Other" };
}

// ---------------------------------------------------------------------------
// Journey: the ordered list of pages this visitor has seen in this session.
// ---------------------------------------------------------------------------
export interface JourneyStep { p: string; t: number }
export interface Journey {
  started: number;
  landing: string;
  referrer: string;
  utm: Record<string, string>;
  steps: JourneyStep[];
}

const hasStorage = () => typeof window !== "undefined" && typeof sessionStorage !== "undefined";

export function readJourney(): Journey | null {
  if (!hasStorage()) return null;
  try {
    const raw = sessionStorage.getItem(JOURNEY_KEY);
    return raw ? (JSON.parse(raw) as Journey) : null;
  } catch {
    return null;
  }
}

function writeJourney(j: Journey) {
  try { sessionStorage.setItem(JOURNEY_KEY, JSON.stringify(j)); } catch { /* private mode */ }
}

function utmParams(search: string): Record<string, string> {
  const out: Record<string, string> = {};
  try {
    const q = new URLSearchParams(search);
    for (const k of ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "gclid", "fbclid"]) {
      const v = q.get(k);
      if (v) out[k] = v.slice(0, 120);
    }
  } catch { /* ignore */ }
  return out;
}

function recordStep(path: string): Journey | null {
  if (!hasStorage()) return null;
  const now = Date.now();
  let j = readJourney();
  if (!j) {
    j = { started: now, landing: path, referrer: (document.referrer || "").slice(0, 200), utm: utmParams(window.location.search), steps: [] };
  }
  const last = j.steps[j.steps.length - 1];
  if (!last || last.p !== path) {
    j.steps.push({ p: path, t: now });
    if (j.steps.length > MAX_STEPS) j.steps = j.steps.slice(-MAX_STEPS);
  }
  writeJourney(j);
  return j;
}

/** Compact journey facts attached to every event so funnels can segment by them. */
export function journeyParams(): Record<string, unknown> {
  const j = readJourney();
  if (!j) return {};
  return {
    landing_page: j.landing,
    pages_viewed: j.steps.length,
    seconds_on_site: Math.round((Date.now() - j.started) / 1000),
    ...(j.utm.utm_source ? { first_utm_source: j.utm.utm_source } : {}),
  };
}

/** What the lead forms send to the CRM alongside the lead. */
export interface LeadJourney {
  gaClientId?: string;
  landing: string;
  referrer: string;
  utm: Record<string, string>;
  secondsOnSite: number;
  steps: { path: string; secondsIn: number }[];
}

export async function leadJourney(): Promise<LeadJourney | undefined> {
  const j = readJourney();
  if (!j) return undefined;
  const gaClientId = await getClientId();
  return {
    gaClientId,
    landing: j.landing,
    referrer: j.referrer,
    utm: j.utm,
    secondsOnSite: Math.round((Date.now() - j.started) / 1000),
    steps: j.steps.map((s) => ({ path: s.p, secondsIn: Math.round((s.t - j.started) / 1000) })),
  };
}

/** GA4 client id, so a lead in the CRM can be looked up in GA4's User explorer. */
export function getClientId(): Promise<string | undefined> {
  return new Promise((resolve) => {
    if (typeof window === "undefined" || !window.gtag) return resolve(undefined);
    const timer = setTimeout(() => resolve(undefined), 800);
    try {
      window.gtag("get", GA_MEASUREMENT_ID, "client_id", (id: unknown) => { clearTimeout(timer); resolve(typeof id === "string" ? id : undefined); });
    } catch {
      clearTimeout(timer);
      resolve(undefined);
    }
  });
}

// ---------------------------------------------------------------------------
// Sending
// ---------------------------------------------------------------------------
function debugMode(): boolean {
  if (!hasStorage()) return false;
  try {
    if (new URLSearchParams(window.location.search).get("ga_debug") === "1") sessionStorage.setItem(DEBUG_KEY, "1");
    return sessionStorage.getItem(DEBUG_KEY) === "1";
  } catch {
    return false;
  }
}

export function track(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  try {
    const path = window.location.pathname;
    window.gtag?.("event", event, {
      page_path: path,
      ...pageGroup(path),
      ...journeyParams(),
      ...params,
      ...(debugMode() ? { debug_mode: true } : {}),
    });
  } catch {
    /* analytics must never break the page */
  }
}

let lastPageKey = "";
/** Send a page_view for the current URL once (the index.html config has send_page_view off). */
export function trackPageView(title?: string) {
  if (typeof window === "undefined") return;
  const key = window.location.pathname + window.location.search;
  if (key === lastPageKey) return;
  lastPageKey = key;
  recordStep(window.location.pathname);
  resetScrollDepth();
  track("page_view", {
    page_title: title || document.title,
    page_location: window.location.href,
    page_referrer: document.referrer || undefined,
  });
  try { window.fbq?.("track", "PageView"); } catch { /* ignore */ }
}

/** True when a page_view has already gone out for the current URL. */
export const pageViewSent = () => typeof window !== "undefined" && lastPageKey === window.location.pathname + window.location.search;

export type LeadMethod = "quote_form" | "contact_form" | "ai_assistant" | "promo_waitlist";

export function trackLead(method: LeadMethod, service?: string) {
  track("generate_lead", { method, lead_service: service || "unspecified", currency: "USD", value: 0 });
  try {
    window.fbq?.("track", "Lead", { content_name: service || "Quote Request", content_category: "Auto Protection" });
  } catch {
    /* ignore */
  }
}

// ---------------------------------------------------------------------------
// Engagement: one set of document-level listeners installed at the app root.
// ---------------------------------------------------------------------------
const clean = (s: string | null | undefined, n = 80) => (s ?? "").replace(/\s+/g, " ").trim().slice(0, n);

/** Where on the page an element sits: the section's id or its heading. */
function locationOf(el: Element): string {
  const section = el.closest("section, header, footer, nav, [data-section]");
  if (!section) return "page";
  const ds = (section as HTMLElement).dataset?.section;
  if (ds) return ds;
  if (section.id) return section.id;
  if (section.tagName === "NAV" || section.tagName === "HEADER") return "navbar";
  if (section.tagName === "FOOTER") return "footer";
  const h = section.querySelector("h1, h2, h3");
  return clean(h?.textContent, 60).toLowerCase() || "section";
}

const scrollMarks = new Set<number>();
function resetScrollDepth() { scrollMarks.clear(); }

export function installEngagementTracking() {
  if (typeof document === "undefined") return () => {};

  const onClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement | null;
    if (!target?.closest) return;

    const a = target.closest("a[href]") as HTMLAnchorElement | null;
    if (a) {
      const href = a.getAttribute("href") ?? "";
      const base = { link_text: clean(a.textContent) || clean(a.getAttribute("aria-label")), cta_location: locationOf(a) };
      if (href.startsWith("tel:")) { track("phone_call", { phone_number: href.replace("tel:", ""), ...base }); return; }
      if (href.startsWith("mailto:")) { track("email_click", base); return; }
      if (/maps\.google\.|google\.com\/maps|maps\.app\.goo|\/maps\?/.test(href)) { track("get_directions", base); return; }
      if (/^\/get-a-quote(\?|$)/.test(href) || a.dataset.cta) {
        track("cta_click", { cta_type: a.dataset.cta ?? "quote", cta_text: base.link_text, cta_location: base.cta_location, cta_target: href.split("?")[0] });
        return;
      }
    }

    const btn = target.closest("button, [role=button]") as HTMLElement | null;
    if (btn) {
      if (btn.dataset.cta) {
        track("cta_click", { cta_type: btn.dataset.cta, cta_text: clean(btn.textContent) || clean(btn.getAttribute("aria-label")), cta_location: locationOf(btn) });
        return;
      }
      if (btn.getAttribute("aria-expanded") === "false") {
        track("faq_open", { faq_question: clean(btn.textContent, 120), cta_location: locationOf(btn) });
      }
    }
  };

  const startedForms = new WeakSet<HTMLFormElement>();
  const onFocusIn = (e: FocusEvent) => {
    const el = e.target as HTMLElement | null;
    const form = el?.closest?.("form[data-form]") as HTMLFormElement | null;
    if (!form || startedForms.has(form)) return;
    startedForms.add(form);
    track("lead_form_start", { form_id: form.dataset.form });
  };

  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      const pct = Math.round(((window.scrollY || doc.scrollTop) / max) * 100);
      for (const mark of [25, 50, 75]) {
        if (pct >= mark && !scrollMarks.has(mark)) {
          scrollMarks.add(mark);
          track("scroll_depth", { percent_scrolled: mark });
        }
      }
    });
  };

  document.addEventListener("click", onClick, { capture: true });
  document.addEventListener("focusin", onFocusIn);
  window.addEventListener("scroll", onScroll, { passive: true });
  return () => {
    document.removeEventListener("click", onClick, { capture: true });
    document.removeEventListener("focusin", onFocusIn);
    window.removeEventListener("scroll", onScroll);
  };
}

/** @deprecated use installEngagementTracking (kept so older imports still compile). */
export const installPhoneCallTracking = installEngagementTracking;
