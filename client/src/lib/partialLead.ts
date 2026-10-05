/**
 * Half-finished forms still become leads.
 *
 * Once a visitor has typed a first name and a valid phone number, the fields
 * are sent to contact.partial (tagged website-partial in the CRM) so the shop
 * can text them even if they never press submit. Fires once per form, after a
 * short pause in typing, and again on page close via a keepalive request if
 * the pause never came. The full submit later upgrades the same contact.
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

  // Debounced send once name + phone are usable.
  useEffect(() => {
    if (sent.current || submitted) return;
    const ready = fields.firstName.trim().length >= 2 && isValidPhone(fields.phone);
    if (!ready) return;
    const t = window.setTimeout(async () => {
      if (sent.current || latest.current !== fields) return;
      sent.current = true;
      markLeadCaptured();
      const journey = await leadJourney();
      mutation.mutate({ ...cleanFields(fields), formId, page: window.location.pathname, journey });
      track("lead_partial", { form_id: formId, service: fields.service ?? "" });
    }, 2500);
    return () => window.clearTimeout(t);
  }, [fields.firstName, fields.phone, fields.email, fields.lastName, submitted]);

  // Page closing before the pause elapsed: send what we have with keepalive.
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
      } catch { /* ignore */ }
    };
    window.addEventListener("pagehide", onHide);
    return () => window.removeEventListener("pagehide", onHide);
  }, [formId, submitted]);

  useEffect(() => { if (submitted) { sent.current = true; markLeadCaptured(); } }, [submitted]);
}
