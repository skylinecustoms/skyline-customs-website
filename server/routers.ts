import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { invokeLLM } from "./_core/llm";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { getAllBlogPosts, getBlogPostBySlug, insertBlogPost, blogPostSlugExists, getActivePromo, getActivePromoByActive, getPromoSlots, addPromoSlot, addToWaitlist, getWaitlistCount, getArchivedPromoBySlug, getLastArchivedPromo } from "./db";
import { getDb } from "./db";
import { getGoogleReviews } from "./googleReviews";
import { getInstagramFeed } from "./instagram";
import { getGalleryRows } from "./galleryJobs";
import { siteSettings, galleryPhotos } from "../drizzle/schema";
import { eq, asc } from "drizzle-orm";

const GHL_API_KEY = process.env.GHL_API_KEY ?? "";
const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID ?? "";

// GHL custom field IDs (from live form inspection)
const GHL_FIELD_MAKE = "2YNQZIRvWYEjqdJ2UGVw";
const GHL_FIELD_MODEL = "DAjqA7njYRUfAh7t67Xb";
const GHL_FIELD_YEAR = "n5O64Bp2FJvBK5GsVSnV";
const GHL_FIELD_SERVICE = "j9D2tGUUK4qUONagWL71";

const GHL_HEADERS = {
  Authorization: `Bearer ${GHL_API_KEY}`,
  Version: "2021-07-28",
  "Content-Type": "application/json",
};

// Who a website lead is assigned to (GHL notifies the assigned user). Default: Mohamed Ibrahim.
const GHL_ASSIGNED_USER_ID = process.env.GHL_ASSIGNED_USER_ID ?? "towFVTHQJdQPLUabV4vy";
// "PPF Qualified Pipeline" -> "New Lead" stage: every website lead gets an opportunity here.
const GHL_PIPELINE_ID = process.env.GHL_PIPELINE_ID ?? "G0QXimqSJcVChaJflrXN";
const GHL_STAGE_NEW_LEAD = process.env.GHL_STAGE_NEW_LEAD ?? "badd36ef-a6df-4776-b168-7237d3309fbe";
/** The one tag every website submission carries; it is removed and re-added so a "tag added" workflow fires every time. */
const GHL_NOTIFY_TAG = "website-contact";
// Owner chats: the bot's configured owner (TELEGRAM_OWNER_ID) first, then any extra ids.
const TELEGRAM_OWNER_IDS = Array.from(new Set([process.env.TELEGRAM_OWNER_ID ?? "", ...(process.env.TELEGRAM_OWNER_IDS ?? "5497240056,5028193585").split(",")].map((s) => s.trim()).filter(Boolean)));

const escapeHtml = (v: unknown) => String(v ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Telegram message to the shop owners. Never throws. Reports per-chat results so a wrong chat id or a blocked bot is visible. */
async function notifyOwners(html: string): Promise<{ ok: boolean; results: string[] }> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) return { ok: false, results: ["TELEGRAM_BOT_TOKEN not set"] };
  if (TELEGRAM_OWNER_IDS.length === 0) return { ok: false, results: ["no owner chat ids"] };
  let ok = false;
  const results: string[] = [];
  for (const id of TELEGRAM_OWNER_IDS) {
    try {
      const r = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: id, text: html, parse_mode: "HTML", disable_web_page_preview: true }),
      });
      const body = (await r.json().catch(() => ({}))) as { ok?: boolean; description?: string };
      ok = ok || r.ok;
      results.push(`${id.slice(0, 4)}…: ${r.ok ? "sent" : body.description ?? `HTTP ${r.status}`}`);
    } catch (e) {
      results.push(`${id.slice(0, 4)}…: ${e instanceof Error ? e.message : String(e)}`);
    }
  }
  if (!ok) console.warn("[telegram] lead alert failed:", results.join(" | "));
  return { ok, results };
}

/** Add tags to a contact (additive, keeps what is there). The notify tag is removed first so it counts as newly added. */
async function addGhlTags(contactId: string, tags: string[]): Promise<void> {
  const unique = Array.from(new Set(tags.filter(Boolean)));
  try {
    if (unique.includes(GHL_NOTIFY_TAG)) {
      await fetch(`https://services.leadconnectorhq.com/contacts/${contactId}/tags`, { method: "DELETE", headers: GHL_HEADERS, body: JSON.stringify({ tags: [GHL_NOTIFY_TAG] }) }).catch(() => {});
    }
    const r = await fetch(`https://services.leadconnectorhq.com/contacts/${contactId}/tags`, { method: "POST", headers: GHL_HEADERS, body: JSON.stringify({ tags: unique }) });
    if (!r.ok) console.warn("[GHL] add tags failed (non-fatal):", r.status, (await r.text()).slice(0, 200));
  } catch (e) {
    console.warn("[GHL] add tags exception (non-fatal):", e);
  }
}

/** Tag a half-finished form carries until the visitor submits for real. */
const GHL_PARTIAL_TAG = "website-partial";

const SERVICE_LEAD_TAGS = ["ppf lead", "tint lead", "ceramic coating lead"] as const;
type ServiceLeadTag = (typeof SERVICE_LEAD_TAGS)[number];

/** "Tints" -> tint lead, "PPF" -> ppf lead, "Ceramic Coating" -> ceramic coating lead (the three tags the CRM workflows key on). */
function serviceTagFor(service: string | undefined): ServiceLeadTag | null {
  const svc = (service ?? "").toLowerCase();
  if (/ppf|film|paint protection/.test(svc)) return "ppf lead";
  if (/tint/.test(svc)) return "tint lead";
  if (/ceramic|coat/.test(svc)) return "ceramic coating lead";
  return null;
}

/**
 * What the customer wrote often says more than the button they tapped
 * ("I'm looking to get a quote for just the front two windows" with Ceramic
 * Coating selected). Tags come from both, so the lead is never filed under
 * the wrong service only. Returns the tags and whether the two disagree.
 */
function serviceTagsFor(service: string | undefined, message: string | undefined): { tags: ServiceLeadTag[]; mentioned: ServiceLeadTag[]; conflict: boolean } {
  const picked = serviceTagFor(service);
  const text = (message ?? "").toLowerCase();
  const mentioned: ServiceLeadTag[] = [];
  if (/\btint|\bwindows?\b|windshield strip|sun ?visor|\b(5|20|35|50|70)%/.test(text)) mentioned.push("tint lead");
  if (/\bppf\b|paint protection|\bfilm\b|clear bra|rock chip|full front|front bumper|\bhood\b/.test(text)) mentioned.push("ppf lead");
  if (/ceramic|\bcoat(ing)?\b/.test(text)) mentioned.push("ceramic coating lead");
  const tags = Array.from(new Set([...(picked ? [picked] : []), ...mentioned]));
  const conflict = !!picked && mentioned.length > 0 && !mentioned.includes(picked);
  return { tags, mentioned, conflict };
}

/** Keep exactly these service tags on the contact: drops the other service tags (and the CRM's derived variants) so a wrong early guess does not stick. */
async function syncServiceTags(contactId: string, keep: ServiceLeadTag[]): Promise<void> {
  const derived: Record<ServiceLeadTag, string[]> = { "ppf lead": ["ppf lead", "paint protection lead"], "tint lead": ["tint lead", "window tint lead"], "ceramic coating lead": ["ceramic coating lead", "ceramic lead"] };
  const drop = SERVICE_LEAD_TAGS.filter((t) => !keep.includes(t)).flatMap((t) => derived[t]);
  if (drop.length) await removeGhlTags(contactId, drop);
}

async function removeGhlTags(contactId: string, tags: string[]): Promise<void> {
  try {
    await fetch(`https://services.leadconnectorhq.com/contacts/${contactId}/tags`, { method: "DELETE", headers: GHL_HEADERS, body: JSON.stringify({ tags }) });
  } catch (e) {
    console.warn("[GHL] remove tags exception (non-fatal):", e);
  }
}

/** One open opportunity per contact in the PPF pipeline, so the lead shows on the board and "opportunity created" workflows fire. */
async function ensureGhlOpportunity(contactId: string, name: string, source: string): Promise<void> {
  try {
    const q = new URLSearchParams({ location_id: GHL_LOCATION_ID, contact_id: contactId, status: "open", limit: "5" });
    const existing = await fetch(`https://services.leadconnectorhq.com/opportunities/search?${q}`, { headers: GHL_HEADERS });
    if (existing.ok) {
      const data = (await existing.json()) as { opportunities?: { id: string }[] };
      if ((data.opportunities ?? []).length > 0) return;
    }
    const r = await fetch("https://services.leadconnectorhq.com/opportunities/", {
      method: "POST",
      headers: GHL_HEADERS,
      body: JSON.stringify({ pipelineId: GHL_PIPELINE_ID, locationId: GHL_LOCATION_ID, name, pipelineStageId: GHL_STAGE_NEW_LEAD, status: "open", contactId, source, assignedTo: GHL_ASSIGNED_USER_ID }),
    });
    if (!r.ok) console.warn("[GHL] opportunity create failed (non-fatal):", r.status, (await r.text()).slice(0, 200));
  } catch (e) {
    console.warn("[GHL] opportunity exception (non-fatal):", e);
  }
}

type GhlDuplicateError = {
  statusCode: number;
  message: string;
  meta?: { contactId?: string };
};

/**
 * Upsert a GHL contact, handling the "no duplicate contacts" 400 error at every step.
 * Strategy:
 *  1. Try POST (create). If 400 duplicate → extract existing ID from meta.
 *  2. Try PUT (update) with the existing ID, stripping phone to avoid a second duplicate hit.
 *     If that also returns 400 duplicate → use the second contactId from meta (just return it, no further update needed).
 *  3. Return the final contactId.
 */
/** Human-readable "what they did on the site before this form" block for the CRM note. */
function journeyNote(j: {
  gaClientId?: string; landing: string; referrer: string; utm?: Record<string, string>; secondsOnSite: number; steps: { path: string; secondsIn: number }[];
} | undefined): string {
  if (!j) return "";
  const mmss = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
  const source = j.utm?.utm_source
    ? `${j.utm.utm_source}${j.utm.utm_medium ? ` / ${j.utm.utm_medium}` : ""}${j.utm.utm_campaign ? ` (${j.utm.utm_campaign})` : ""}`
    : j.utm?.gclid ? "Google Ads (gclid)" : j.utm?.fbclid ? "Facebook/Instagram (fbclid)" : j.referrer ? j.referrer.replace(/^https?:\/\/(www\.)?/, "").split("/")[0] : "Direct / typed URL";
  const lines = j.steps.map((s, i) => `${String(i + 1).padStart(2, " ")}. [${mmss(s.secondsIn)}] ${s.path}`);
  return (
    `\n\n--- Website Journey (${j.steps.length} page${j.steps.length === 1 ? "" : "s"}, ${mmss(j.secondsOnSite)} on site) ---\n` +
    `Source: ${source}\n` +
    `Landed on: ${j.landing}\n` +
    lines.join("\n") +
    (j.gaClientId ? `\nGA4 client id: ${j.gaClientId}` : "")
  );
}

async function upsertGhlContact(
  payload: Record<string, unknown>
): Promise<{ contactId: string; phone?: string }> {
  // --- Step 1: Attempt creation ---
  const createRes = await fetch("https://services.leadconnectorhq.com/contacts/", {
    method: "POST",
    headers: GHL_HEADERS,
    body: JSON.stringify(payload),
  });

  if (createRes.ok) {
    const data = await createRes.json() as { contact?: { id?: string; phone?: string } };
    return { contactId: data.contact?.id ?? "", phone: data.contact?.phone };
  }

  const createErrText = await createRes.text();
  let createErr: GhlDuplicateError = { statusCode: createRes.status, message: "" };
  try { createErr = JSON.parse(createErrText); } catch { /* ignore */ }

  const existingId = createErr?.meta?.contactId;
  if (createRes.status !== 400 || !existingId) {
    console.error("[GHL] Contact creation failed:", createRes.status, createErrText);
    throw new Error("Failed to create contact in GHL");
  }

  console.log("[GHL] Duplicate on create, upserting:", existingId);

  // --- Step 2: Attempt update (strip locationId and phone to avoid cascading duplicate) ---
  // Tags are left out of the update: a PUT replaces the whole tag list, and the caller adds tags additively afterwards.
  const { locationId: _loc, phone: _ph, tags: _tags, ...safeUpdatePayload } = payload as Record<string, unknown> & {
    locationId?: unknown;
    phone?: unknown;
    tags?: unknown;
  };

  const updateRes = await fetch(`https://services.leadconnectorhq.com/contacts/${existingId}`, {
    method: "PUT",
    headers: GHL_HEADERS,
    body: JSON.stringify(safeUpdatePayload),
  });

  if (updateRes.ok) {
    const updateData = await updateRes.json() as { contact?: { id?: string; phone?: string } };
    return { contactId: updateData.contact?.id ?? existingId, phone: updateData.contact?.phone };
  }

  const updateErrText = await updateRes.text();
  let updateErr: GhlDuplicateError = { statusCode: updateRes.status, message: "" };
  try { updateErr = JSON.parse(updateErrText); } catch { /* ignore */ }

  // If PUT also hits a duplicate (e.g. phone matches another contact), just use that contact's ID
  const fallbackId = updateErr?.meta?.contactId;
  if (updateRes.status === 400 && fallbackId) {
    console.log("[GHL] Duplicate on update too, using fallback contact:", fallbackId);
    return { contactId: fallbackId };
  }

  console.error("[GHL] Contact update failed:", updateRes.status, updateErrText);
  throw new Error("Failed to update contact in GHL");
}

export const appRouter = router({
  system: systemRouter,

  blog: router({
    list: publicProcedure.query(async () => {
      return getAllBlogPosts();
    }),

    getBySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        return getBlogPostBySlug(input.slug);
      }),

    // Used by the scheduled automation after owner approval
    // Requires user-level auth (scheduled task cookie has role=user)
    create: protectedProcedure
      .input(
        z.object({
          slug: z.string().min(1),
          title: z.string().min(1),
          excerpt: z.string().min(1),
          date: z.string().min(1),
          readTime: z.string().min(1),
          category: z.string().min(1),
          heroImage: z.string().url(),
          heroImageAlt: z.string().min(1),
          content: z.string().min(1), // JSON stringified array
          status: z.enum(["published", "draft"]).default("published"),
        })
      )
      .mutation(async ({ input }) => {
        const exists = await blogPostSlugExists(input.slug);
        if (exists) {
          return { success: false, error: "A post with this slug already exists" };
        }
        await insertBlogPost({
          slug: input.slug,
          title: input.title,
          excerpt: input.excerpt,
          date: input.date,
          readTime: input.readTime,
          category: input.category,
          heroImage: input.heroImage,
          heroImageAlt: input.heroImageAlt,
          content: input.content,
          status: input.status,
        });
        return { success: true, url: `/blog/${input.slug}` };
      }),
  }),

  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  quoteAssistant: router({
    chat: publicProcedure
      .input(
        z.object({
          messages: z.array(
            z.object({
              role: z.enum(["user", "assistant"]),
              content: z.string(),
            })
          ),
        })
      )
      .mutation(async ({ input }) => {
        const systemPrompt = `You are the Skyline Customs AI Quote Assistant — a friendly, knowledgeable automotive protection specialist at Skyline Custom Shop in Chantilly, VA.

Your ONLY job is to collect the following 6 pieces of information from the visitor so you can pre-fill their quote request form:
1. First name
2. Last name
3. Phone number
4. Email address
5. Vehicle info: Year, Make, and Model (e.g. "2022 BMW M3")
6. Service interested in: one of — PPF (Paint Protection Film), Ceramic Coating, or Window Tinting

Guidelines:
- Be warm, confident, and concise. Max 2 sentences per reply.
- Ask for one or two pieces of info at a time — never dump all questions at once.
- Start by asking for their first name.
- Once you have all 6 items, output EXACTLY this JSON block on its own line (no extra text before or after the JSON):
{"done":true,"firstName":"...","lastName":"...","phone":"...","email":"...","year":"...","make":"...","model":"...","service":"..."}
- If the visitor asks about pricing, say prices vary by vehicle and service — the team will send a custom quote after the form is submitted.
- If the visitor asks something unrelated, gently redirect them back to collecting their info.
- Never make up prices or guarantees.`;

        const llmMessages = [
          { role: "system" as const, content: systemPrompt },
          ...input.messages.map((m) => ({ role: m.role as "user" | "assistant", content: m.content })),
        ];

        const response = await invokeLLM({ messages: llmMessages });
        const rawContent = response.choices?.[0]?.message?.content ?? "";
        const content = typeof rawContent === "string" ? rawContent : "";

        // Check if the assistant has collected all data and returned the JSON
        const jsonMatch = content.match(/\{"done":true[^}]+\}/);
        if (jsonMatch) {
          try {
            const parsed = JSON.parse(jsonMatch[0]) as {
              done: boolean;
              firstName: string;
              lastName: string;
              phone: string;
              email: string;
              year: string;
              make: string;
              model: string;
              service: string;
            };
            return {
              message: "Perfect! I have everything I need. Taking you to the quote form now — it's already filled in for you!",
              done: true,
              formData: {
                firstName: parsed.firstName,
                lastName: parsed.lastName,
                phone: parsed.phone,
                email: parsed.email,
                year: parsed.year,
                make: parsed.make,
                model: parsed.model,
                service: parsed.service,
              },
            };
          } catch {
            // JSON parse failed — fall through to normal reply
          }
        }

        return { message: content, done: false, formData: null };
      }),
  }),

  contact: router({
    submit: publicProcedure
      .input(
        z.object({
          firstName: z.string().min(1),
          lastName: z.string().min(1),
          email: z.string().email(),
          phone: z.string().optional(),
          make: z.string().optional(),
          model: z.string().optional(),
          year: z.string().optional(),
          service: z.string().optional(),
          message: z.string().optional(),
          // Optional promo tag — set when visitor arrives from a promo CTA
          promoTag: z.string().max(80).optional(),
          // Which form on the site sent this: sets the CRM source and tags.
          formId: z.enum(["quote", "contact", "promo"]).optional(),
          // "es" when the visitor used a Spanish page: tags the contact so the call-back happens in Spanish.
          language: z.enum(["en", "es"]).optional(),
          // The pages this visitor saw before submitting (client/src/lib/analytics.ts).
          journey: z
            .object({
              gaClientId: z.string().max(64).optional(),
              landing: z.string().max(300),
              referrer: z.string().max(300),
              utm: z.record(z.string(), z.string().max(120)).optional(),
              secondsOnSite: z.number().int().nonnegative(),
              steps: z.array(z.object({ path: z.string().max(300), secondsIn: z.number().int().nonnegative() })).max(40),
            })
            .optional(),
        })
      )
      .mutation(async ({ input }) => {
        // Build custom fields array for GHL
        const customFields: { id: string; field_value: string }[] = [];
        if (input.make) customFields.push({ id: GHL_FIELD_MAKE, field_value: input.make });
        if (input.model) customFields.push({ id: GHL_FIELD_MODEL, field_value: input.model });
        if (input.year) customFields.push({ id: GHL_FIELD_YEAR, field_value: input.year });
        if (input.service) customFields.push({ id: GHL_FIELD_SERVICE, field_value: input.service });

        // Source and tags per form, so CRM workflows can tell them apart. Every one carries the notify tag.
        const form = input.formId ?? (input.promoTag ? "promo" : "contact");
        const source = form === "quote" ? "Website Quote Form" : form === "promo" ? `Website Promo Form${input.promoTag ? ` — ${input.promoTag}` : ""}` : "Website Contact Form";
        // Promo submissions carry a prefilled note that names the free ceramic coating, so only the button counts there.
        const svcTags = serviceTagsFor(input.service, input.promoTag ? "" : input.message);
        const ghlTags = [GHL_NOTIFY_TAG, `website-${form}`, ...svcTags.tags, ...(input.promoTag ? [input.promoTag] : []), ...(input.language === "es" ? ["spanish-speaker"] : [])];

        const contactPayload: Record<string, unknown> = {
          firstName: input.firstName,
          lastName: input.lastName,
          email: input.email,
          locationId: GHL_LOCATION_ID,
          source,
          tags: ghlTags,
          assignedTo: GHL_ASSIGNED_USER_ID,
        };
        if (input.phone) contactPayload.phone = input.phone;
        if (customFields.length > 0) contactPayload.customFields = customFields;

        const vehicleLabel = [input.year, input.make, input.model].filter(Boolean).join(" ");

        // Step 1: Upsert contact (handles all duplicate scenarios). A CRM outage must not lose the lead:
        // the owners still get the Telegram message below, and the form still succeeds.
        let contactId: string | null = null;
        let resolvedPhone: string | undefined;
        let crmError: string | null = null;
        try {
          const r = await upsertGhlContact(contactPayload);
          contactId = r.contactId || null;
          resolvedPhone = r.phone;
        } catch (e) {
          crmError = e instanceof Error ? e.message : String(e);
          console.error("[GHL] lead not saved:", crmError);
        }
        const contactPhone = resolvedPhone ?? input.phone;
        if (contactId) {
          // The real submission wins over anything a half-finished form guessed earlier.
          await removeGhlTags(contactId, [GHL_PARTIAL_TAG, `website-${form}-partial`, "website-exit-partial"]);
          await syncServiceTags(contactId, svcTags.tags);
          await addGhlTags(contactId, ghlTags);
          await ensureGhlOpportunity(contactId, `${input.firstName} ${input.lastName}${vehicleLabel ? ` — ${vehicleLabel}` : ""}${input.service ? ` — ${input.service}` : ""}`, source);
        }

        // Telegram to the owners, every time, so no lead depends on the CRM or on someone checking it.
        const journeyLine = input.journey
          ? `\nCame from: ${escapeHtml(input.journey.utm?.utm_source ? `${input.journey.utm.utm_source}${input.journey.utm.utm_medium ? ` / ${input.journey.utm.utm_medium}` : ""}` : input.journey.referrer ? input.journey.referrer.replace(/^https?:\/\/(www\.)?/, "").split("/")[0] : "direct")} · landed on ${escapeHtml(input.journey.landing)} · ${input.journey.steps.length} page${input.journey.steps.length === 1 ? "" : "s"}`
          : "";
        const telegram = await notifyOwners(
          `<b>🚗 New website lead (${escapeHtml(source)})</b>\n` +
          `<b>${escapeHtml(input.firstName)} ${escapeHtml(input.lastName)}</b>` +
          (contactPhone ? `\n📞 ${escapeHtml(contactPhone)}` : "") +
          `\n✉️ ${escapeHtml(input.email)}` +
          (vehicleLabel ? `\n🚘 ${escapeHtml(vehicleLabel)}` : "") +
          (input.service ? `\n🛠 ${escapeHtml(input.service)}` : "") +
          (input.language === "es" ? `\n🗣 Spanish speaker: came through the Spanish site, call back in Spanish` : "") +
          (svcTags.conflict ? `\n⚠️ Picked "${escapeHtml(input.service ?? "")}" but the message reads like ${svcTags.mentioned.map((t) => t.replace(" lead", "")).join(" + ")}. Tagged both.` : "") +
          (input.promoTag ? `\n🏷 ${escapeHtml(input.promoTag)}` : "") +
          (input.message?.trim() ? `\n💬 ${escapeHtml(input.message.trim().slice(0, 300))}` : "") +
          journeyLine +
          (contactId ? `\n\nIn GHL: https://app.gohighlevel.com/v2/location/${GHL_LOCATION_ID}/contacts/detail/${contactId}` : `\n\n⚠️ <b>NOT saved in GHL</b> (${escapeHtml(crmError ?? "unknown error")}). Add this lead by hand.`)
        );
        if (!contactId && !telegram.ok) throw new Error("Failed to create contact in GHL");

        // Step 2: Send an SMS via GHL conversations if a message was provided
        if (input.message && input.message.trim().length > 0 && contactId && contactPhone) {
          const vehicle = [input.year, input.make, input.model].filter(Boolean).join(" ");
          const smsBody = `New website message from ${input.firstName} ${input.lastName}${vehicle ? ` (${vehicle})` : ""}:\n\n"${input.message}"\n\nPhone: ${contactPhone}\nEmail: ${input.email}`;

          try {
            const smsRes = await fetch("https://services.leadconnectorhq.com/conversations/messages", {
              method: "POST",
              headers: {
                Authorization: `Bearer ${GHL_API_KEY}`,
                Version: "2021-04-15",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                type: "SMS",
                contactId,
                locationId: GHL_LOCATION_ID,
                message: smsBody,
              }),
            });
            if (!smsRes.ok) {
              const smsErr = await smsRes.text();
              console.warn("[GHL] SMS send failed (non-fatal):", smsRes.status, smsErr);
            }
          } catch (smsErr) {
            console.warn("[GHL] SMS send exception (non-fatal):", smsErr);
          }
        }

        // Step 3: Add a note to the GHL contact
        // Written when there is a message, a promo tag, or a recorded website journey.
        const hasNote = (input.message && input.message.trim().length > 0) || !!input.promoTag || !!input.journey;
        if (hasNote && contactId) {
          const vehicle = [input.year, input.make, input.model].filter(Boolean).join(" ");
          const noteHeader = input.promoTag
            ? `PROMO QUOTE REQUEST — ${input.promoTag.replace(/-/g, " ").toUpperCase()}`
            : `QUOTE REQUEST`;
          const noteBody = `${noteHeader} — ${new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}\n` +
            `Customer: ${input.firstName} ${input.lastName}\n` +
            `Email: ${input.email}\n` +
            (input.phone ? `Phone: ${input.phone}\n` : "") +
            (vehicle ? `Vehicle: ${vehicle}\n` : "") +
            (input.service ? `Service: ${input.service}\n` : "") +
            (input.promoTag ? `\n** Came from promo CTA: ${input.promoTag} **\n` : "") +
            (input.message && input.message.trim() ? `\n--- Customer Message ---\n${input.message}` : "") +
            journeyNote(input.journey);

          try {
            const noteRes = await fetch(`https://services.leadconnectorhq.com/contacts/${contactId}/notes`, {
              method: "POST",
              headers: {
                Authorization: `Bearer ${GHL_API_KEY}`,
                Version: "2021-07-28",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                body: noteBody,
                userId: "",
              }),
            });
            if (!noteRes.ok) {
              const noteErr = await noteRes.text();
              console.warn("[GHL] Note creation failed (non-fatal):", noteRes.status, noteErr);
            } else {
              console.log("[GHL] Note added to contact:", contactId);
            }
          } catch (noteErr) {
            console.warn("[GHL] Note exception (non-fatal):", noteErr);
          }
        }

        return { success: true, contactId: contactId ?? null, crm: contactId ? "ok" : "failed", telegram: telegram.results };
      }),

    /**
     * A visitor typed a name and a valid phone number but has not submitted (yet).
     * Saves them in the CRM tagged website-partial (never website-contact, so the
     * new-lead workflow does not fire) and pings the owners, so a text can go out
     * even if they never press the button. The full submit later upgrades the
     * same contact and removes the partial tag.
     */
    partial: publicProcedure
      .input(
        z.object({
          firstName: z.string().min(2).max(80),
          lastName: z.string().max(80).optional(),
          phone: z.string().min(10).max(30),
          email: z.string().email().optional(),
          service: z.string().max(60).optional(),
          promoTag: z.string().max(80).optional(),
          formId: z.enum(["quote", "contact", "promo", "exit"]),
          language: z.enum(["en", "es"]).optional(),
          page: z.string().max(300).optional(),
          journey: z
            .object({
              gaClientId: z.string().max(64).optional(),
              landing: z.string().max(300),
              referrer: z.string().max(300),
              utm: z.record(z.string(), z.string().max(120)).optional(),
              secondsOnSite: z.number().int().nonnegative(),
              steps: z.array(z.object({ path: z.string().max(300), secondsIn: z.number().int().nonnegative() })).max(40),
            })
            .optional(),
        })
      )
      .mutation(async ({ input }) => {
        const digits = input.phone.replace(/\D/g, "");
        if (digits.length < 10) return { success: false as const, reason: "phone" };
        const serviceTag = serviceTagFor(input.service);
        const source = input.formId === "exit" ? "Website Exit Prompt (text me the price)" : `Website ${input.formId} form (not submitted)`;
        const tags = [GHL_PARTIAL_TAG, `website-${input.formId}-partial`, ...(serviceTag ? [serviceTag] : []), ...(input.promoTag ? [input.promoTag] : []), ...(input.language === "es" ? ["spanish-speaker"] : [])];
        const payload: Record<string, unknown> = {
          firstName: input.firstName.trim(),
          lastName: (input.lastName ?? "").trim() || undefined,
          phone: input.phone,
          locationId: GHL_LOCATION_ID,
          source,
          tags,
          assignedTo: GHL_ASSIGNED_USER_ID,
        };
        if (input.email) payload.email = input.email;
        if (input.service) payload.customFields = [{ id: GHL_FIELD_SERVICE, field_value: input.service }];

        let contactId: string | null = null;
        let crmError: string | null = null;
        try {
          contactId = (await upsertGhlContact(payload)).contactId || null;
        } catch (e) {
          crmError = e instanceof Error ? e.message : String(e);
          console.error("[GHL] partial lead not saved:", crmError);
        }
        if (contactId) {
          await addGhlTags(contactId, tags);
          const note =
            `PARTIAL LEAD — ${source} — ${new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}\n` +
            `Started the form but did not submit. Name and phone captured as typed.\n` +
            (input.page ? `Page: ${input.page}\n` : "") +
            journeyNote(input.journey);
          fetch(`https://services.leadconnectorhq.com/contacts/${contactId}/notes`, { method: "POST", headers: GHL_HEADERS, body: JSON.stringify({ body: note, userId: "" }) }).catch(() => {});
        }
        const telegram = await notifyOwners(
          `<b>✍️ Partial lead: typed name + phone, did not submit</b>\n` +
          `<b>${escapeHtml(input.firstName)} ${escapeHtml(input.lastName ?? "")}</b>\n` +
          `📞 ${escapeHtml(input.phone)}` +
          (input.email ? `\n✉️ ${escapeHtml(input.email)}` : "") +
          (input.service ? `\n🛠 ${escapeHtml(input.service)}` : "") +
          (input.promoTag ? `\n🏷 ${escapeHtml(input.promoTag)}` : "") +
          `\n📄 ${escapeHtml(source)}${input.page ? ` · ${escapeHtml(input.page)}` : ""}` +
          `\n\nWorth a quick text: "Hey ${escapeHtml(input.firstName)}, saw you were looking at PPF on our site, want me to send the price?"` +
          (contactId ? `\nIn GHL: https://app.gohighlevel.com/v2/location/${GHL_LOCATION_ID}/contacts/detail/${contactId}` : `\n⚠️ Not saved in GHL (${escapeHtml(crmError ?? "unknown")})`)
        );
        return { success: true as const, contactId, crm: contactId ? "ok" : "failed", telegram: telegram.results };
      }),
  }),

  site: router({
    // Public: live Google rating/count/newest reviews (null when no API key is configured)
    googleReviews: publicProcedure.query(async () => getGoogleReviews()),

    // Public: latest Instagram posts (Graph API, cached 1h). Null when no token is set.
    instagram: publicProcedure.query(async () => getInstagramFeed()),

    // Public: get all active site settings (hours, announcement, etc.)
    settings: publicProcedure.query(async () => {
      const db = await getDb();
      if (!db) return {};
      const rows = await db.select().from(siteSettings);
      return Object.fromEntries(rows.map(r => [r.key, r.value]));
    }),

    // Public: get all active gallery photos from DB (bot-uploaded)
    gallery: publicProcedure.query(async () => {
      const db = await getDb();
      if (!db) return (await getGalleryRows()) as (typeof galleryPhotos.$inferSelect)[]; // seeded photos when no database
      return db.select().from(galleryPhotos)
        .where(eq(galleryPhotos.active, 1))
        .orderBy(asc(galleryPhotos.sortOrder));
    }),
  }),

  promo: router({
    // Public: get the currently active promo (active=1) with slot count — used by homepage banner and landing page
    getActive: publicProcedure.query(async () => {
      const promo = await getActivePromoByActive();
      if (!promo) return null;
      const slots = await getPromoSlots(promo.id);
      return { ...promo, slots };
    }),

    // Public: get promo details + slot count by slug
    get: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        const promo = await getActivePromo(input.slug);
        if (!promo) return null;
        const slots = await getPromoSlots(promo.id);
        return { ...promo, slots };
      }),

    // Public: get an archived promo by its archivedSlug (e.g. "june-special")
    getArchived: publicProcedure
      .input(z.object({ archivedSlug: z.string() }))
      .query(async ({ input }) => {
        const promo = await getArchivedPromoBySlug(input.archivedSlug);
        if (!promo) return null;
        const slots = await getPromoSlots(promo.id);
        return { ...promo, slots };
      }),

    // Public: get the most recently archived promo (for "Last Month" strip on /promo)
    getLastArchived: publicProcedure.query(async () => {
      const promo = await getLastArchivedPromo();
      if (!promo) return null;
      const slots = await getPromoSlots(promo.id);
      return { ...promo, slots };
    }),

    // Public: join the waitlist when all slots are filled
    joinWaitlist: publicProcedure
      .input(
        z.object({
          name: z.string().min(1).max(128),
          email: z.string().email(),
          phone: z.string().optional(),
          vehicle: z.string().optional(),
          year: z.string().max(4).optional(),
          make: z.string().max(64).optional(),
          model: z.string().max(64).optional(),
          intent: z.enum(['asap', 'this-week', 'this-month']).optional(),
          ppfReason: z.string().max(500).optional(),
          desiredTiming: z.string().max(500).optional(),
        })
      )
      .mutation(async ({ input }) => {
        const promo = await getActivePromoByActive();
        if (!promo) throw new Error('No active promo found');
        await addToWaitlist({
          promoId: promo.id,
          name: input.name,
          email: input.email,
          phone: input.phone ?? null,
          vehicle: input.vehicle ?? null,
          intent: input.intent ?? null,
          ppfReason: input.ppfReason ?? null,
          desiredTiming: input.desiredTiming ?? null,
        });

        // Map intent value to GHL tag label
        const intentTagMap: Record<string, string> = {
          'asap': 'intent: asap',
          'this-week': 'intent: this week',
          'this-month': 'intent: this month',
        };
        const intentTag = input.intent ? intentTagMap[input.intent] : null;
        const intentLabel = input.intent ? { asap: 'ASAP', 'this-week': 'This Week', 'this-month': 'This Month' }[input.intent] : null;

        // --- GHL: create/upsert contact with ppf-waitlist tag + intent tag ---
        let ghlContactId: string | null = null;
        try {
          const nameParts = input.name.trim().split(/\s+/);
          const firstName = nameParts[0] ?? input.name;
          const lastName = nameParts.slice(1).join(' ') || undefined;
          const tags = [GHL_NOTIFY_TAG, 'website-waitlist', 'ppf-waitlist', 'ppf lead'];
          if (intentTag) tags.push(intentTag);
          // Build GHL custom fields for vehicle (same IDs as contact form)
          const customFields: { id: string; field_value: string }[] = [];
          if (input.make) customFields.push({ id: GHL_FIELD_MAKE, field_value: input.make });
          if (input.model) customFields.push({ id: GHL_FIELD_MODEL, field_value: input.model });
          if (input.year) customFields.push({ id: GHL_FIELD_YEAR, field_value: input.year });
          customFields.push({ id: GHL_FIELD_SERVICE, field_value: 'PPF' });
          const ghlPayload: Record<string, unknown> = {
            firstName,
            email: input.email,
            locationId: GHL_LOCATION_ID,
            source: 'Promo Waitlist',
            tags,
            customFields,
            assignedTo: GHL_ASSIGNED_USER_ID,
          };
          if (lastName) ghlPayload.lastName = lastName;
          if (input.phone) ghlPayload.phone = input.phone;
          const { contactId } = await upsertGhlContact(ghlPayload);
          ghlContactId = contactId ?? null;
          if (ghlContactId) await addGhlTags(ghlContactId, tags);

          // Add a note to the GHL contact
          if (ghlContactId) {
            const vehicleLine = [input.year, input.make, input.model].filter(Boolean).join(' ');
            const noteBody =
              `WAITLIST SIGNUP - ${promo.title}\n` +
              `Date: ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}\n` +
              `Name: ${input.name}\n` +
              `Email: ${input.email}\n` +
              (input.phone ? `Phone: ${input.phone}\n` : '') +
              (vehicleLine ? `Vehicle: ${vehicleLine}\n` : '') +
              (intentLabel ? `Timeline: ${intentLabel}\n` : '') +
              (input.ppfReason ? `Why PPF: ${input.ppfReason}\n` : '') +
              (input.desiredTiming ? `Desired Timing: ${input.desiredTiming}\n` : '') +
              `\nCustomer joined the waitlist because all ${promo.totalSlots} slots were filled. Follow up when a slot opens.`;
            await fetch(`https://services.leadconnectorhq.com/contacts/${ghlContactId}/notes`, {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${GHL_API_KEY}`,
                Version: '2021-07-28',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ body: noteBody }),
            }).catch((e) => console.warn('[GHL] Waitlist note failed:', e));

            // Customer-facing SMS confirmation
            const firstName2 = input.name.trim().split(/\s+/)[0] ?? input.name;
            const smsBody =
              `Hi ${firstName2}, you're on the waitlist for Skyline's ${promo.title}!\n\n` +
              `We'll reach out as soon as a spot opens up` +
              (intentLabel ? ` — we noted you're looking to get it done ${intentLabel.toLowerCase()}` : '') +
              `.\n\nQuestions? Call or text us at (703) 775-4383.\n\nReply STOP to unsubscribe.`;
            await fetch('https://services.leadconnectorhq.com/conversations/messages', {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${GHL_API_KEY}`,
                Version: '2021-04-15',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                type: 'SMS',
                contactId: ghlContactId,
                locationId: GHL_LOCATION_ID,
                message: smsBody,
              }),
            }).catch((e) => console.warn('[GHL] Waitlist SMS failed:', e));
          }
        } catch (ghlErr) {
          console.warn('[GHL] Waitlist contact upsert failed (non-fatal):', ghlErr);
        }

        // --- Telegram notification to owner ---
        const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
        const OWNER_IDS = TELEGRAM_OWNER_IDS;
        if (BOT_TOKEN) {
          const msg =
            `*New Waitlist Entry - ${promo.title}*\n\n` +
            `Name: ${input.name}\n` +
            `Email: ${input.email}` +
            (input.phone ? `\nPhone: ${input.phone}` : '') +
            (input.vehicle ? `\nVehicle: ${input.vehicle}` : '') +
            (intentLabel ? `\nTimeline: ${intentLabel}` : '') +
            (input.ppfReason ? `\nWhy PPF: ${input.ppfReason}` : '') +
            (input.desiredTiming ? `\nDesired Timing: ${input.desiredTiming}` : '') +
            `\n\nAdded to GHL with tags: ppf-waitlist` +
            (intentTag ? `, ${intentTag}` : '') +
            `.\nThey want to be notified when a slot opens up.`;
          for (const id of OWNER_IDS) {
            await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ chat_id: id, text: msg, parse_mode: 'Markdown' }),
            }).catch(() => {});
          }
        }
        // Get queue position for confirmation message
        const queueCount = await getWaitlistCount(promo.id);
        return { success: true, queuePosition: queueCount };
      }),

    // Owner-only: add a completed customer slot
    addSlot: protectedProcedure
      .input(
        z.object({
          promoSlug: z.string(),
          customerName: z.string().min(1),
          carDescription: z.string().min(1),
          photoUrl: z.string().url().optional(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        if (ctx.user.role !== 'admin') {
          throw new Error('Only the owner can add promo slots');
        }
        const promo = await getActivePromo(input.promoSlug);
        if (!promo) throw new Error('Promo not found');
        const slots = await getPromoSlots(promo.id);
        if (slots.length >= promo.totalSlots) throw new Error('All slots are filled');
        const nextSlot = slots.length + 1;
        await addPromoSlot({
          promoId: promo.id,
          slotNumber: nextSlot,
          customerName: input.customerName,
          carDescription: input.carDescription,
          photoUrl: input.photoUrl ?? null,
        });
        return { success: true, slotNumber: nextSlot, totalSlots: promo.totalSlots };
      }),
  }),
});

export type AppRouter = typeof appRouter;
