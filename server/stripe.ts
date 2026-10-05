/**
 * Online deposits through Stripe Checkout.
 *
 * Flow: a lead submits the promo form -> the thank-you screen offers "Reserve my
 * date" -> POST /api/deposit/checkout creates a Checkout Session for the deposit
 * product -> the customer pays (card, Klarna, Afterpay, Affirm: whatever is on in
 * the Stripe dashboard) -> Stripe calls POST /api/stripe/webhook -> the contact
 * is tagged deposit-paid in GoHighLevel, a note is added, and the owners get a
 * Telegram alert.
 *
 * Env: STRIPE_SECRET_KEY (restricted key is fine: write Checkout Sessions, read
 * Products and Prices), STRIPE_WEBHOOK_SECRET (from the webhook endpoint in the
 * dashboard), STRIPE_DEPOSIT_PRODUCT_ID (the live deposit product).
 */
import { createHmac, timingSafeEqual } from "node:crypto";

const SECRET = process.env.STRIPE_SECRET_KEY ?? "";
const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET ?? "";
export const DEPOSIT_PRODUCT_ID = process.env.STRIPE_DEPOSIT_PRODUCT_ID ?? "prod_VEKSXTNHGKnu1x";
const BASE_URL = "https://www.skylinecustomshop.com";

export const stripeConfigured = () => SECRET.length > 0;
export const stripeWebhookConfigured = () => WEBHOOK_SECRET.length > 0;

/** Stripe's REST API takes form-encoded bodies; nested keys use bracket notation. */
function encode(params: Record<string, unknown>, prefix = ""): string[] {
  const out: string[] = [];
  for (const [k, v] of Object.entries(params)) {
    if (v === undefined || v === null) continue;
    const key = prefix ? `${prefix}[${k}]` : k;
    if (Array.isArray(v)) v.forEach((item, i) => out.push(...(typeof item === "object" ? encode(item as Record<string, unknown>, `${key}[${i}]`) : [`${encodeURIComponent(`${key}[${i}]`)}=${encodeURIComponent(String(item))}`])));
    else if (typeof v === "object") out.push(...encode(v as Record<string, unknown>, key));
    else out.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(v))}`);
  }
  return out;
}

async function stripe<T>(method: "GET" | "POST", path: string, params?: Record<string, unknown>): Promise<T> {
  if (!SECRET) throw new Error("STRIPE_SECRET_KEY not set");
  const body = params ? encode(params).join("&") : "";
  const url = `https://api.stripe.com/v1${path}${method === "GET" && body ? `?${body}` : ""}`;
  const r = await fetch(url, {
    method,
    headers: { Authorization: `Bearer ${SECRET}`, "Content-Type": "application/x-www-form-urlencoded", "Stripe-Version": "2024-06-20" },
    body: method === "POST" ? body : undefined,
  });
  const json = (await r.json()) as T & { error?: { message?: string } };
  if (!r.ok) throw new Error(`Stripe ${path}: ${json.error?.message ?? r.status}`);
  return json;
}

interface Price { id: string; unit_amount: number | null; currency: string; active: boolean; type: string }
let priceCache: { at: number; price: Price } | null = null;

/** The deposit product's active one-time price, cached for ten minutes. */
export async function getDepositPrice(): Promise<Price> {
  if (priceCache && Date.now() - priceCache.at < 10 * 60 * 1000) return priceCache.price;
  const list = await stripe<{ data: Price[] }>("GET", "/prices", { product: DEPOSIT_PRODUCT_ID, active: "true", limit: 10 });
  const price = list.data.find((p) => p.type === "one_time") ?? list.data[0];
  if (!price) throw new Error("No active price on the deposit product");
  priceCache = { at: Date.now(), price };
  return price;
}

export interface CheckoutInput {
  contactId?: string | null;
  firstName: string;
  lastName?: string;
  email: string;
  phone?: string;
  promoTitle: string;
  vehicle?: string;
  lang?: "en" | "es";
}

/** Creates a Checkout Session for the deposit and returns the hosted payment URL. */
export async function createDepositCheckout(input: CheckoutInput): Promise<{ url: string; amount: number; currency: string }> {
  const price = await getDepositPrice();
  const back = input.lang === "es" ? "/es/promo" : "/promo";
  const name = `${input.firstName} ${input.lastName ?? ""}`.trim();
  const session = await stripe<{ url: string }>("POST", "/checkout/sessions", {
    mode: "payment",
    line_items: [{ price: price.id, quantity: 1 }],
    customer_email: input.email,
    client_reference_id: input.contactId ?? undefined,
    success_url: `${BASE_URL}${back}?deposit=paid&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${BASE_URL}${back}?deposit=cancelled#claim`,
    locale: input.lang === "es" ? "es" : "auto",
    phone_number_collection: { enabled: "true" },
    metadata: { contactId: input.contactId ?? "", name, phone: input.phone ?? "", promo: input.promoTitle, vehicle: input.vehicle ?? "", lang: input.lang ?? "en" },
    payment_intent_data: { description: `${input.promoTitle} deposit — ${name}${input.vehicle ? ` — ${input.vehicle}` : ""}`, metadata: { contactId: input.contactId ?? "", promo: input.promoTitle } },
  });
  return { url: session.url, amount: price.unit_amount ?? 0, currency: price.currency };
}

export interface CheckoutSession {
  id: string;
  payment_status: string;
  amount_total: number | null;
  currency: string | null;
  customer_details?: { email?: string | null; name?: string | null; phone?: string | null } | null;
  client_reference_id?: string | null;
  metadata?: Record<string, string>;
}

export const getCheckoutSession = (id: string) => stripe<CheckoutSession>("GET", `/checkout/sessions/${encodeURIComponent(id)}`);

/** Verifies the Stripe-Signature header against the raw request body. */
export function verifyStripeSignature(rawBody: Buffer, header: string | undefined, toleranceSec = 300): boolean {
  if (!WEBHOOK_SECRET || !header) return false;
  const parts = Object.fromEntries(header.split(",").map((p) => p.split("=") as [string, string]));
  const t = parts.t, v1 = parts.v1;
  if (!t || !v1) return false;
  if (Math.abs(Date.now() / 1000 - Number(t)) > toleranceSec) return false;
  const expected = createHmac("sha256", WEBHOOK_SECRET).update(`${t}.`).update(rawBody).digest("hex");
  const a = Buffer.from(expected), b = Buffer.from(v1);
  return a.length === b.length && timingSafeEqual(a, b);
}

export const fmtMoney = (cents: number, currency = "usd") => new Intl.NumberFormat("en-US", { style: "currency", currency: currency.toUpperCase(), maximumFractionDigits: 0 }).format(cents / 100);
