/**
 * Half-finished forms still become leads.
 *
 * Once a visitor has typed a first name and a valid phone number, the fields
 * are sent to contact.partial (tagged website-partial in the CRM) so the shop
 * can text them even if they never press submit. It only fires when the form
 * is actually abandoned: the visitor leaves the page without submitting
 * (keepalive request on pagehide) or goes quiet on the form for IDLE_MS with
 * no submit. A visitor who fills the form in one go never touches the partial
 * path, so the CRM's partial-lead workflow only sees real abandoners.
 */
import { useEffect, useRef } from "react";
import { trpc } from "@/lib/trpc";
import { leadJourney, track } from "@/lib/analytics";

export type PartialFormId = "quote" | "contact" | "promo" | "exit" | "fleet";

export interface PartialFields {
  firstName: string;
  lastName?: string;
  phone: string;
  email?: string;
  service?: string;
  promoTag?: string;
  language?: "en" | "es";
}

const SESSION_KEY = "sc-lead-captured";
/** No typing and no submit for this long counts as abandoning the form. */
const IDLE_MS = 90_000;

export const phoneDigits = (s: string) => s.replace(/\D/g, "");
export const isValidPhone = (s: string) => { const d = phoneDigits(s); return d.length === 10 || (d.length === 11 && d.startsWith("1")); };
const isValidEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);

/** True once any form on this visit has captured a lead (partial or full). The exit prompt checks it. */
export function leadCapturedThisSession(): boolean {
  try { return sessionStorage.getItem(SESSION_KEY) === "1"; } catch { return false; }
}
export function markLeadCaptured(): void {
  try { sessionStorage.setItem(SESSION_KEY, "1"); } catch { /* private mode */ }
}

function cleanFields(f: PartialFields) {
  return {
    firstName: f.firstName.trim(),
    lastName: f.lastName?.trim() || undefined,
    phone: f.phone.trim(),
    email: f.email && isValidEmail(f.email.trim()) ? f.email.trim() : undefined,
    service: f.service?.trim() || undefined,
    promoTag: f.promoTag || undefined,
    language: f.language,
  };
}

/**
 * Watch a form's fields; `submitted` stops everything (the real lead is in).
 * Returns nothing: the hook does its work in the background.
 */
export function usePartialLead(formId: PartialFormId, fields: PartialFields, submitted: boolean): void {
  const sent = useRef(false);
  const latest = useRef(fields);
  latest.current = fields;
  const mutation = trpc.contact.partial.useMutation();

  // Idle on the form: the timer restarts on every keystroke, so it only fires
  // when name + phone are usable and nothing has happened for IDLE_MS.
  useEffect(() => {
    if (sent.current || submitted) return;
    const ready = fields.firstName.trim().length >= 2 && isValidPhone(fields.phone);
    if (!ready) return;
    const t = window.setTimeout(async () => {
      if (sent.current || submitted || latest.current !== fields) return;
      sent.current = true;
      markLeadCaptured();
      const journey = await leadJourney();
      mutation.mutate({ ...cleanFields(fields), formId, page: window.location.pathname, journey });
      track("lead_partial", { form_id: formId, service: fields.service ?? "", reason: "idle" });
    }, IDLE_MS);
    return () => window.clearTimeout(t);
  }, [fields.firstName, fields.phone, fields.email, fields.lastName, fields.service, submitted]);

  // Leaving the page without submitting: send what we have with keepalive.
  useEffect(() => {
    const onHide = () => {
      if (sent.current || submitted) return;
      const f = latest.current;
      if (!(f.firstName.trim().length >= 2 && isValidPhone(f.phone))) return;
      sent.current = true;
      markLeadCaptured();
      try {
        fetch("/api/trpc/contact.partial", {
          method: "POST",
          keepalive: true,
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ json: { ...cleanFields(f), formId, page: window.location.pathname } }),
        }).catch(() => {});
        track("lead_partial", { form_id: formId, service: f.service ?? "", reason: "left" });
      } catch { /* ignore */ }
    };
    window.addEventListener("pagehide", onHide);
    return () => window.removeEventListener("pagehide", onHide);
  }, [formId, submitted]);

  // The real lead is in: nothing partial goes out after this.
  useEffect(() => { if (submitted) { sent.current = true; markLeadCaptured(); } }, [submitted]);
}
