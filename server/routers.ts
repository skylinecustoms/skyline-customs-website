import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { invokeLLM } from "./_core/llm";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { getAllBlogPosts, getBlogPostBySlug, insertBlogPost, blogPostSlugExists, getActivePromo, getActivePromoByActive, getPromoSlots, addPromoSlot, addToWaitlist, getWaitlistCount, getArchivedPromoBySlug, getLastArchivedPromo } from "./db";
import { getDb } from "./db";
import { getGoogleReviews } from "./googleReviews";
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
  const { locationId: _loc, phone: _ph, ...safeUpdatePayload } = payload as Record<string, unknown> & {
    locationId?: unknown;
    phone?: unknown;
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
        })
      )
      .mutation(async ({ input }) => {
        // Build custom fields array for GHL
        const customFields: { id: string; field_value: string }[] = [];
        if (input.make) customFields.push({ id: GHL_FIELD_MAKE, field_value: input.make });
        if (input.model) customFields.push({ id: GHL_FIELD_MODEL, field_value: input.model });
        if (input.year) customFields.push({ id: GHL_FIELD_YEAR, field_value: input.year });
        if (input.service) customFields.push({ id: GHL_FIELD_SERVICE, field_value: input.service });

        // Build GHL tags: always include website-contact; add promo tag if present
        const ghlTags = ["website-contact"];
        if (input.promoTag) ghlTags.push(input.promoTag);

        const contactPayload: Record<string, unknown> = {
          firstName: input.firstName,
          lastName: input.lastName,
          email: input.email,
          locationId: GHL_LOCATION_ID,
          source: input.promoTag ? `Promo CTA — ${input.promoTag}` : "Website Contact Form",
          tags: ghlTags,
        };
        if (input.phone) contactPayload.phone = input.phone;
        if (customFields.length > 0) contactPayload.customFields = customFields;

        // Step 1: Upsert contact (handles all duplicate scenarios)
        const { contactId, phone: resolvedPhone } = await upsertGhlContact(contactPayload);
        const contactPhone = resolvedPhone ?? input.phone;

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
        // Always write a note when a promo tag is present; otherwise only when a message exists
        const hasNote = (input.message && input.message.trim().length > 0) || !!input.promoTag;
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
            (input.message && input.message.trim() ? `\n--- Customer Message ---\n${input.message}` : "");

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

        return { success: true, contactId: contactId ?? null };
      }),
  }),

  site: router({
    // Public: live Google rating/count/newest reviews (null when no API key is configured)
    googleReviews: publicProcedure.query(async () => getGoogleReviews()),

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
      if (!db) return [];
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
          const tags = ['ppf-waitlist', 'ppf lead'];
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
          };
          if (lastName) ghlPayload.lastName = lastName;
          if (input.phone) ghlPayload.phone = input.phone;
          const { contactId } = await upsertGhlContact(ghlPayload);
          ghlContactId = contactId ?? null;

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
        const OWNER_IDS = ['5497240056', '5028193585'];
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
