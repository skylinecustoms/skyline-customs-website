/**
 * Deposit routes: create a Stripe Checkout for the promo deposit, confirm a
 * paid session for the thank-you banner, and take Stripe's webhook so the CRM
 * and the owners hear about every paid deposit.
 */
import type { Express, Request, Response } from "express";
import { createDepositCheckout, getCheckoutSession, verifyStripeSignature, stripeConfigured, fmtMoney, type CheckoutSession } from "./stripe";
import { GHL_HEADERS, GHL_LOCATION_ID, addGhlTags, notifyOwners, escapeHtml } from "./routers";

const DEPOSIT_TAG = "deposit-paid";
const seen = new Set<string>();

async function recordPaidDeposit(session: CheckoutSession, via: "webhook" | "status"): Promise<void> {
  if (session.payment_status !== "paid" || seen.has(session.id)) return;
  seen.add(session.id);
  const m = session.metadata ?? {};
  const contactId = session.client_reference_id || m.contactId || "";
  const name = session.customer_details?.name || m.name || "Customer";
  const email = session.customer_details?.email || "";
  const phone = session.customer_details?.phone || m.phone || "";
  const amount = fmtMoney(session.amount_total ?? 0, session.currency ?? "usd");
  if (contactId) {
    await addGhlTags(contactId, [DEPOSIT_TAG, "booked"]);
    const note = `DEPOSIT PAID — ${amount} via Stripe (${session.id})\nPromo: ${m.promo || "n/a"}${m.vehicle ? `\nVehicle: ${m.vehicle}` : ""}\nFully refundable, applied to the total. Call to set the install date.`;
    fetch(`https://services.leadconnectorhq.com/contacts/${contactId}/notes`, { method: "POST", headers: GHL_HEADERS, body: JSON.stringify({ body: note, userId: "" }) }).catch(() => {});
  }
  await notifyOwners(
    `<b>💳 DEPOSIT PAID: ${escapeHtml(amount)}</b>\n<b>${escapeHtml(name)}</b>` +
    (phone ? `\n📞 ${escapeHtml(phone)}` : "") + (email ? `\n✉️ ${escapeHtml(email)}` : "") +
    (m.promo ? `\n🏷 ${escapeHtml(m.promo)}` : "") + (m.vehicle ? `\n🚘 ${escapeHtml(m.vehicle)}` : "") +
    (m.lang === "es" ? "\n🗣 Spanish speaker" : "") +
    `\n\nThey are booked. Call to set the install date.` +
    (contactId ? `\nIn GHL: https://app.gohighlevel.com/v2/location/${GHL_LOCATION_ID}/contacts/detail/${contactId}` : "\n⚠️ No CRM contact id on this payment; find them by email.") +
    (via === "status" ? "\n(confirmed from the thank-you page; webhook not received)" : "")
  );
}

export function registerDepositRoutes(app: Express): void {
  // Start a checkout for the promo deposit. Body: { contactId?, firstName, lastName?, email, phone?, promoTitle, vehicle?, lang? }
  app.post("/api/deposit/checkout", async (req: Request, res: Response) => {
    if (!stripeConfigured()) return res.status(503).json({ error: "Online deposits are not enabled yet." });
    const b = req.body ?? {};
    if (!b.email || !b.firstName || !b.promoTitle) return res.status(400).json({ error: "Missing fields" });
    try {
      const out = await createDepositCheckout({ contactId: b.contactId ?? null, firstName: String(b.firstName).slice(0, 80), lastName: b.lastName ? String(b.lastName).slice(0, 80) : undefined, email: String(b.email).slice(0, 200), phone: b.phone ? String(b.phone).slice(0, 40) : undefined, promoTitle: String(b.promoTitle).slice(0, 80), vehicle: b.vehicle ? String(b.vehicle).slice(0, 80) : undefined, lang: b.lang === "es" ? "es" : "en" });
      res.json(out);
    } catch (e) {
      console.error("[stripe] checkout failed:", e);
      res.status(502).json({ error: "Could not start the deposit. Call (703) 775-4383 and we will take it by phone." });
    }
  });

  // The thank-you banner asks whether a session is paid. Also records the deposit if the webhook has not arrived yet.
  app.get("/api/deposit/status", async (req: Request, res: Response) => {
    const id = String(req.query.session_id ?? "");
    if (!stripeConfigured() || !/^cs_(live|test)_[A-Za-z0-9]+$/.test(id)) return res.json({ paid: false });
    try {
      const s = await getCheckoutSession(id);
      const paid = s.payment_status === "paid";
      if (paid) await recordPaidDeposit(s, "status");
      res.json({ paid, amount: s.amount_total ? fmtMoney(s.amount_total, s.currency ?? "usd") : null, name: s.customer_details?.name ?? s.metadata?.name ?? null });
    } catch {
      res.json({ paid: false });
    }
  });

  // Stripe -> us. Needs the raw body for the signature check (see express.json verify in index.ts).
  app.post("/api/stripe/webhook", async (req: Request & { rawBody?: Buffer }, res: Response) => {
    const raw = req.rawBody;
    if (!raw || !verifyStripeSignature(raw, req.get("stripe-signature"))) return res.status(400).send("bad signature");
    const event = req.body as { type: string; data: { object: CheckoutSession } };
    if (event.type === "checkout.session.completed" || event.type === "checkout.session.async_payment_succeeded") {
      try { await recordPaidDeposit(event.data.object, "webhook"); } catch (e) { console.error("[stripe] webhook handling failed:", e); }
    }
    res.json({ received: true });
  });
}
