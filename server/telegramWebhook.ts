/**
 * Telegram Webhook Handler - Skyline Custom Shop Bot (@SkylineManusbot)
 *
 * All commands are owner-only (verified by TELEGRAM_OWNER_ID).
 *
 * -- PROMO SLOTS -------------------------------------------------------------
 *   "John D - 2023 BMW M3"   -> add a slot to the active promo (+ optional photo)
 *   /slots                   -> show current slots for active promo
 *   /slot_remove [n]         -> remove slot #n from active promo
 *
 * -- PROMO MANAGEMENT --------------------------------------------------------
 *   /promo off               -> hide the active promo banner from the homepage
 *   /promo on                -> show the active promo banner again
 *   /promo status            -> check if promo is currently active + slot count
 *   /promo_new Title | price | slots | startDate | endDate | dealDescription
 *                            -> create a new monthly promo (deactivates old one)
 *
 * -- GALLERY -----------------------------------------------------------------
 *   /gallery add [PPF|Tint|Ceramic Coating] -- [car description]  + photo
 *                            -> upload photo to CDN and add to gallery
 *   /gallery list            -> show last 10 gallery photos
 *   /gallery remove [id]     -> remove a gallery photo by ID
 *
 * -- HOURS -------------------------------------------------------------------
 *   /hours Mon-Fri 9am-6pm   -> update business hours displayed site-wide
 *   /hours show              -> show current hours setting
 *
 * -- ANNOUNCEMENT BANNER -----------------------------------------------------
 *   /announce [message]      -> show a site-wide announcement bar with message
 *   /announce off            -> hide the announcement bar
 *   /announce show           -> show current announcement
 *
 * -- HELP --------------------------------------------------------------------
 *   /help                    -> show all commands
 */

import type { Request, Response } from "express";
import { getDb } from "./db";
import { promos, promoSlots, promoWaitlist, siteSettings, galleryPhotos } from "../drizzle/schema";
import { eq, desc } from "drizzle-orm";
import { ENV } from "./_core/env";
import { storagePut } from "./storage";
import { notifyPpfLeadsSlotClaimed } from "./ghl";
import fs from "fs";
import path from "path";

// --- Sitemap helper ----------------------------------------------------------

/**
 * Updates the <lastmod> date for the /promo entry in the static sitemap.xml.
 * The sitemap lives in client/public/sitemap.xml (dev) and dist/public/sitemap.xml (prod).
 * We update both locations so the change is reflected immediately in dev and persists after build.
 */
function updateSitemapPromoDate() {
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
  const targets = [
    path.resolve(process.cwd(), "client/public/sitemap.xml"),
    path.resolve(process.cwd(), "dist/public/sitemap.xml"),
  ];
  for (const target of targets) {
    if (!fs.existsSync(target)) continue;
    try {
      const original = fs.readFileSync(target, "utf-8");
      // Replace the lastmod inside the /promo URL block only
      const updated = original.replace(
        /(<loc>https:\/\/www\.skylinecustomshop\.com\/promo<\/loc>\s*<lastmod>)[^<]*/,
        `$1${today}`
      );
      if (updated !== original) {
        fs.writeFileSync(target, updated, "utf-8");
        console.log(`[Sitemap] Updated /promo lastmod to ${today} in ${target}`);
      }
    } catch (e) {
      console.error(`[Sitemap] Failed to update ${target}:`, e);
    }
  }
}

/**
 * Adds a new archive URL entry to sitemap.xml for a just-archived promo.
 * E.g. when June Special is archived, adds /june-special to the sitemap.
 */
function addArchiveToSitemap(archiveSlug: string) {
  const today = new Date().toISOString().split("T")[0];
  const newEntry = `\n  <url>\n    <loc>https://www.skylinecustomshop.com/${archiveSlug}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.6</priority>\n  </url>`;
  const targets = [
    path.resolve(process.cwd(), "client/public/sitemap.xml"),
    path.resolve(process.cwd(), "dist/public/sitemap.xml"),
  ];
  for (const target of targets) {
    if (!fs.existsSync(target)) continue;
    try {
      const original = fs.readFileSync(target, "utf-8");
      // Only add if not already present
      if (original.includes(`/${archiveSlug}</loc>`)) continue;
      const updated = original.replace("</urlset>", `${newEntry}\n</urlset>`);
      fs.writeFileSync(target, updated, "utf-8");
      console.log(`[Sitemap] Added /${archiveSlug} archive entry to ${target}`);
    } catch (e) {
      console.error(`[Sitemap] Failed to add archive entry to ${target}:`, e);
    }
  }
}

// --- Telegram helpers --------------------------------------------------------

async function sendMessage(chatId: number | string, text: string) {
  await fetch(`https://api.telegram.org/bot${ENV.telegramBotToken}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" }),
  });
}

async function getFileUrl(fileId: string): Promise<string | null> {
  const res = await fetch(
    `https://api.telegram.org/bot${ENV.telegramBotToken}/getFile?file_id=${fileId}`
  );
  const data = (await res.json()) as { ok: boolean; result?: { file_path?: string } };
  if (!data.ok || !data.result?.file_path) return null;
  return `https://api.telegram.org/file/bot${ENV.telegramBotToken}/${data.result.file_path}`;
}

async function downloadAndUploadPhoto(fileId: string, label: string): Promise<string | null> {
  try {
    const tgUrl = await getFileUrl(fileId);
    if (!tgUrl) return null;
    const photoRes = await fetch(tgUrl);
    if (!photoRes.ok) return null;
    const buffer = Buffer.from(await photoRes.arrayBuffer());
    const key = `bot-uploads/${label.replace(/[^a-z0-9]/gi, "-").toLowerCase()}-${Date.now()}.jpg`;
    const { url } = await storagePut(key, buffer, "image/jpeg");
    return url;
  } catch {
    return null;
  }
}

async function getSetting(db: NonNullable<Awaited<ReturnType<typeof getDb>>>, key: string): Promise<string | null> {
  const rows = await db.select().from(siteSettings).where(eq(siteSettings.key, key)).limit(1);
  return rows[0]?.value ?? null;
}

async function setSetting(db: NonNullable<Awaited<ReturnType<typeof getDb>>>, key: string, value: string) {
  const existing = await db.select().from(siteSettings).where(eq(siteSettings.key, key)).limit(1);
  if (existing.length) {
    await db.update(siteSettings).set({ value }).where(eq(siteSettings.key, key));
  } else {
    await db.insert(siteSettings).values({ key, value });
  }
}

// Get the currently active promo (active=1), most recently created
async function getActivePromoRow(db: NonNullable<Awaited<ReturnType<typeof getDb>>>) {
  const rows = await db.select().from(promos)
    .where(eq(promos.active, 1))
    .orderBy(desc(promos.createdAt))
    .limit(1);
  return rows[0] ?? null;
}

// --- Inline keyboard helpers -------------------------------------------------

async function sendMessageWithButtons(
  chatId: number | string,
  text: string,
  buttons: Array<{ text: string; callback_data: string }>[]
) {
  await fetch(`https://api.telegram.org/bot${ENV.telegramBotToken}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "HTML",
      reply_markup: { inline_keyboard: buttons },
    }),
  });
}

async function answerCallbackQuery(callbackQueryId: string, text?: string, showAlert?: boolean) {
  await fetch(`https://api.telegram.org/bot${ENV.telegramBotToken}/answerCallbackQuery`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ callback_query_id: callbackQueryId, text: text ?? "", show_alert: showAlert ?? false }),
  });
}

async function editMessageText(chatId: number | string, messageId: number, text: string) {
  await fetch(`https://api.telegram.org/bot${ENV.telegramBotToken}/editMessageText`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, message_id: messageId, text, parse_mode: "HTML" }),
  });
}

// --- /new_month wizard helpers -----------------------------------------------

type WizardState = { step: string; data: Record<string, string> };
type Db = NonNullable<Awaited<ReturnType<typeof getDb>>>;

const WIZARD_STEPS = ["title", "price", "slots", "startDate", "endDate", "description", "confirm"];

function wizardPrompt(step: string, data: Record<string, string>): { text: string; buttons: Array<{ text: string; callback_data: string }>[] } {
  const nextMonth = new Date();
  nextMonth.setMonth(nextMonth.getMonth() + 1);
  const monthName = nextMonth.toLocaleString("en-US", { month: "long" });
  const year = nextMonth.getFullYear();
  const lastDay = new Date(year, nextMonth.getMonth() + 1, 0).getDate();

  const defaults: Record<string, string> = {
    title: `${monthName} Special`,
    price: "2400",
    slots: "21",
    startDate: `${monthName} 1, ${year}`,
    endDate: `${monthName} ${lastDay}, ${year}`,
    description: "Full Front PPF + Paint Correction + Ceramic Coating",
  };

  const stepIndex = WIZARD_STEPS.indexOf(step) + 1;
  const labels: Record<string, string> = {
    title: "Promo Title",
    price: "Price (numbers only)",
    slots: "Total Slots",
    startDate: "Start Date",
    endDate: "End Date",
    description: "Deal Description",
  };

  if (step === "confirm") {
    const text =
      `✅ <b>Ready to launch?</b>\n\n` +
      `📅 Title: <b>${data.title}</b>\n` +
      `💰 Price: <b>$${data.price}</b>\n` +
      `🎯 Slots: <b>${data.slots}</b>\n` +
      `📆 Dates: <b>${data.startDate} - ${data.endDate}</b>\n` +
      `📝 Deal: <b>${data.description}</b>\n\n` +
      `Tap <b>Launch</b> to archive the current promo and go live, or <b>Cancel</b> to abort.`;
    return {
      text,
      buttons: [
        [{ text: "🚀 Launch New Promo", callback_data: "wizard_launch" }, { text: "❌ Cancel", callback_data: "wizard_cancel" }],
      ],
    };
  }

  const def = defaults[step];
  const text =
    `🗓 <b>New Month Promo Wizard</b>\n\n` +
    `Step ${stepIndex} of 6 - <b>${labels[step]}</b>\n\n` +
    `Default: <code>${def}</code>\n\n` +
    `Type a custom value or tap the button to use the default:`;
  return {
    text,
    buttons: [
      [{ text: `Use "${def}"`, callback_data: `wizard_default:${step}:${encodeURIComponent(def)}` }, { text: "Cancel", callback_data: "wizard_cancel" }],
    ],
  };
}

async function advanceWizard(db: Db, chatId: number | string, wiz: WizardState, value: string) {
  const currentStep = wiz.step;
  const newData = { ...wiz.data, [currentStep]: value };
  const stepIndex = WIZARD_STEPS.indexOf(currentStep);
  const nextStep = WIZARD_STEPS[stepIndex + 1];

  if (!nextStep || nextStep === "confirm") {
    // Show confirmation card
    const confirmWiz: WizardState = { step: "confirm", data: newData };
    await setSetting(db, "pendingNewPromo", JSON.stringify(confirmWiz));
    const { text, buttons } = wizardPrompt("confirm", newData);
    await sendMessageWithButtons(chatId, text, buttons);
  } else {
    const newWiz: WizardState = { step: nextStep, data: newData };
    await setSetting(db, "pendingNewPromo", JSON.stringify(newWiz));
    const { text, buttons } = wizardPrompt(nextStep, newData);
    await sendMessageWithButtons(chatId, text, buttons);
  }
}

async function handleWizardReply(db: Db, chatId: number | string, wiz: WizardState, text: string) {
  if (wiz.step === "confirm") return; // confirm is handled by button, not text
  await advanceWizard(db, chatId, wiz, text);
}

// Strip ordinal suffixes so new Date() can parse reliably:
// "July 1st" -> "July 1, 2026", "July 31st" -> "July 31, 2026"
function sanitizePromoDate(raw: string, fallbackYear: number): string {
  let d = raw.trim().replace(/(\d+)(st|nd|rd|th)\b/gi, '$1');
  if (!/\d{4}/.test(d)) d = `${d}, ${fallbackYear}`;
  return d;
}

async function executeNewPromo(db: Db, chatId: number | string, data: Record<string, string>) {
  const { title, price, slots, description } = data;
  const currentYear = new Date().getFullYear();
  const startDate = sanitizePromoDate(data.startDate, currentYear);
  const endDate = sanitizePromoDate(data.endDate, currentYear);
  const totalSlots = parseInt(slots, 10);
  if (isNaN(totalSlots) || totalSlots < 1) {
    await sendMessage(chatId, `❌ Invalid slot count: "${slots}". Must be a positive number.`);
    return;
  }

  const monthWord = title.split(" ")[0].toLowerCase();
  const year = new Date().getFullYear();
  const newSlug = `${monthWord}-${year}`;
  const newTagline = `${title} - ${description}`;

  await sendMessage(chatId, `⏳ Launching "${title}"...`);

  try {
    // Archive current active promo
    const currentActive = await db.select().from(promos).where(eq(promos.active, 1)).limit(1);
    const prevPromo = currentActive[0] ?? null;
    if (prevPromo && !prevPromo.isArchived) {
      const prevMonthWord = prevPromo.title.split(" ")[0].toLowerCase();
      const prevArchiveSlug = `${prevMonthWord}-special`;
      await db.update(promos).set({ active: 0, isArchived: 1, archivedSlug: prevArchiveSlug }).where(eq(promos.id, prevPromo.id));
      await sendMessage(chatId, `📦 <b>${prevPromo.title}</b> archived at <code>/${prevArchiveSlug}</code>.`);
      addArchiveToSitemap(prevArchiveSlug);
    } else {
      await db.update(promos).set({ active: 0 });
    }

    // Insert or update
    const existing = await db.select().from(promos).where(eq(promos.slug, newSlug)).limit(1);
    if (existing.length > 0) {
      await db.update(promos).set({ title, tagline: newTagline, dealDescription: description, totalSlots, startDate, endDate, price, active: 1, isArchived: 0, archivedSlug: null }).where(eq(promos.slug, newSlug));
    } else {
      await db.insert(promos).values({ slug: newSlug, title, tagline: newTagline, dealDescription: description, totalSlots, startDate, endDate, price, active: 1, isArchived: 0 });
    }
    updateSitemapPromoDate();

    await sendMessage(chatId,
      `🚀 <b>${title} is now LIVE!</b>\n\n` +
      `💰 $${price} &middot; ${slots} slots &middot; ${startDate} - ${endDate}\n` +
      `📝 ${description}\n\n` +
      `The homepage banner and <a href="https://www.skylinecustomshop.com/promo">/promo</a> page are updated.`
    );
  } catch (err) {
    await sendMessage(chatId, `❌ Failed to launch promo: ${err instanceof Error ? err.message : String(err)}`);
  }
}

// --- Main webhook handler ----------------------------------------------------

export async function handleTelegramWebhook(req: Request, res: Response) {
  res.sendStatus(200); // Always respond immediately

  const update = req.body as TelegramUpdate;

  // -- Handle inline button taps (callback_query) -----------------------------
  if (update.callback_query) {
    const cq = update.callback_query;
    const cqUserId = String(cq.from?.id ?? "");
    const cqChatId = cq.message?.chat.id;
    const cqMessageId = cq.message?.message_id;
    const data = cq.data ?? "";

    const cqAllowedIds = [ENV.telegramOwnerId, "5028193585"].filter(Boolean);
    if (!cqAllowedIds.includes(cqUserId)) {
      await answerCallbackQuery(cq.id, "⛔ Unauthorized");
      return;
    }

    const db2 = await getDb();
    if (!db2) { await answerCallbackQuery(cq.id, "❌ DB unavailable"); return; }

    if (data === "slot_confirm") {
      // Load the pending draft
      const draftJson = await getSetting(db2, "pendingSlot");
      if (!draftJson) {
        await answerCallbackQuery(cq.id, "⚠️ No pending slot found - it may have expired.");
        if (cqChatId && cqMessageId) await editMessageText(cqChatId, cqMessageId, "⚠️ No pending slot found - it may have expired.");
        return;
      }
      const draft = JSON.parse(draftJson) as { customerName: string; carDescription: string; photoUrl: string | null; promoId: number; promoTitle: string; totalSlots: number };

      // Re-check slot count hasn't filled up while waiting
      const currentSlots = await db2.select().from(promoSlots).where(eq(promoSlots.promoId, draft.promoId));
      if (currentSlots.length >= draft.totalSlots) {
        await answerCallbackQuery(cq.id, "🚫 All slots are now filled!");
        if (cqChatId && cqMessageId) await editMessageText(cqChatId, cqMessageId, `🚫 All ${draft.totalSlots} slots for <b>${draft.promoTitle}</b> are already filled!`);
        await setSetting(db2, "pendingSlot", "");
        return;
      }

      const slotNumber = currentSlots.length + 1;
      await db2.insert(promoSlots).values({
        promoId: draft.promoId,
        slotNumber,
        customerName: draft.customerName,
        carDescription: draft.carDescription,
        photoUrl: draft.photoUrl ?? null,
      });
      await setSetting(db2, "pendingSlot", ""); // clear draft

      // Auto-add to gallery if a photo was included
      if (draft.photoUrl) {
        try {
          const existingGallery = await db2.select().from(galleryPhotos).orderBy(desc(galleryPhotos.sortOrder)).limit(1);
          const nextSort = (existingGallery[0]?.sortOrder ?? 0) + 1;
          await db2.insert(galleryPhotos).values({
            photoUrl: draft.photoUrl,
            alt: `PPF on ${draft.carDescription} - Skyline Custom Shop Chantilly VA`,
            category: "PPF",
            carDescription: draft.carDescription,
            sortOrder: nextSort,
            active: 1,
          });
        } catch (_) { /* non-fatal */ }
      }

      const remaining = draft.totalSlots - slotNumber;
      const photoNote = draft.photoUrl ? "📸 Photo included." : "(No photo)";
      const baseUrl = ENV.isProduction
        ? "https://www.skylinecustomshop.com/promo"
        : "https://skyline-shop-rwng7vt4.manus.space/promo";
      const slotUrl = `${baseUrl}#slot-${slotNumber}`;

      // Toast popup at top of Telegram screen
      await answerCallbackQuery(cq.id, `✅ Slot #${slotNumber} posted! ${remaining} remaining.`, true);

      // Update the preview card in-place to confirmed state
      if (cqChatId && cqMessageId) {
        await editMessageText(
          cqChatId,
          cqMessageId,
          `✅ <b>Slot #${slotNumber} posted to ${draft.promoTitle}!</b>\n\n` +
          `👤 ${draft.customerName}\n🚗 ${draft.carDescription}\n${photoNote}\n\n` +
          `<b>${remaining} slot${remaining !== 1 ? "s" : ""} remaining.</b>\n\n` +
          `🔗 <a href="${slotUrl}">View Slot #${slotNumber} live -></a>`
        );
      }

      // Fire GHL urgency SMS to all "ppf lead" contacts (non-blocking)
      // Fetch the promo end date for the SMS message
      try {
        const promoRows = await db2.select().from(promos).where(eq(promos.id, draft.promoId));
        const promoEndDate = promoRows[0]?.endDate ?? "end of month";
        notifyPpfLeadsSlotClaimed(slotNumber, remaining, draft.promoTitle, promoEndDate).catch((err) =>
          console.error("[GHL] Urgency SMS error:", err)
        );
      } catch (err) {
        console.error("[GHL] Failed to fetch promo for SMS:", err);
      }

      return;
    }

    if (data === "slot_cancel") {
      await setSetting(db2, "pendingSlot", ""); // clear draft
      await answerCallbackQuery(cq.id, "❌ Cancelled");
      if (cqChatId && cqMessageId) await editMessageText(cqChatId, cqMessageId, "❌ Slot entry cancelled. Nothing was saved.");
      return;
    }

    // -- edit_name / edit_car / edit_photo: user tapped an edit option button ----
    if (data.startsWith("edit_name:") || data.startsWith("edit_car:") || data.startsWith("edit_photo:")) {
      const [action, slotIdStr] = data.split(":");
      const slotId = parseInt(slotIdStr, 10);
      const slots2 = await db2.select().from(promoSlots).where(eq(promoSlots.id, slotId)).limit(1);
      const slot2 = slots2[0];
      if (!slot2) { await answerCallbackQuery(cq.id, "Slot not found"); return; }

      // Store what we're waiting for
      await setSetting(db2, "pendingEdit", JSON.stringify({ action, slotId, slotNumber: slot2.slotNumber }));

      if (action === "edit_name") {
        await answerCallbackQuery(cq.id);
        if (cqChatId && cqMessageId) await editMessageText(cqChatId, cqMessageId,
          `✏️ <b>Editing name for Slot #${slot2.slotNumber}</b>\n\nCurrent name: <b>${slot2.customerName}</b>\n\nReply with the new customer name:`);
      } else if (action === "edit_car") {
        await answerCallbackQuery(cq.id);
        if (cqChatId && cqMessageId) await editMessageText(cqChatId, cqMessageId,
          `🚗 <b>Editing vehicle for Slot #${slot2.slotNumber}</b>\n\nCurrent vehicle: <b>${slot2.carDescription}</b>\n\nReply with the new vehicle (year, make, model):`);
      } else if (action === "edit_photo") {
        await answerCallbackQuery(cq.id);
        if (cqChatId && cqMessageId) await editMessageText(cqChatId, cqMessageId,
          `📸 <b>Replacing photo for Slot #${slot2.slotNumber}</b>\n\n👤 ${slot2.customerName}\n🚗 ${slot2.carDescription}\n\nSend the new photo now:`);
      }
      return;
    }

    // -- edit_confirm: user confirmed the change -> save it, then show edit menu again
    if (data.startsWith("edit_confirm:")) {
      const slotId = parseInt(data.split(":")[1], 10);
      const peJson = await getSetting(db2, "pendingEdit");
      if (!peJson) { await answerCallbackQuery(cq.id, "No pending edit found"); return; }
      const pe = JSON.parse(peJson) as { action: string; slotId: number; slotNumber: number; pendingValue?: string; pendingPhotoUrl?: string };
      const editSlots = await db2.select().from(promoSlots).where(eq(promoSlots.id, slotId)).limit(1);
      let editTarget = editSlots[0];
      if (!editTarget) { await answerCallbackQuery(cq.id, "Slot not found"); return; }

      // Apply the change
      if ((pe.action === "edit_name" || pe.action === "edit_car") && pe.pendingValue) {
        if (pe.action === "edit_name") {
          await db2.update(promoSlots).set({ customerName: pe.pendingValue }).where(eq(promoSlots.id, slotId));
        } else {
          await db2.update(promoSlots).set({ carDescription: pe.pendingValue }).where(eq(promoSlots.id, slotId));
        }
      } else if (pe.action === "edit_photo" && pe.pendingPhotoUrl) {
        await db2.update(promoSlots).set({ photoUrl: pe.pendingPhotoUrl }).where(eq(promoSlots.id, slotId));
        // Also add to gallery
        try {
          const slotRow = await db2.select().from(promoSlots).where(eq(promoSlots.id, slotId)).limit(1);
          const slotCar = slotRow[0]?.carDescription ?? "Vehicle";
          const existingGallery2 = await db2.select().from(galleryPhotos).orderBy(desc(galleryPhotos.sortOrder)).limit(1);
          const nextSort2 = (existingGallery2[0]?.sortOrder ?? 0) + 1;
          await db2.insert(galleryPhotos).values({
            photoUrl: pe.pendingPhotoUrl,
            alt: `PPF on ${slotCar} - Skyline Custom Shop Chantilly VA`,
            category: "PPF",
            carDescription: slotCar,
            sortOrder: nextSort2,
            active: 1,
          });
        } catch (_) { /* non-fatal */ }
      }

      // Clear pending edit
      await setSetting(db2, "pendingEdit", "");
      await answerCallbackQuery(cq.id, "✅ Saved!", true);

      // Reload the slot with fresh data
      const freshSlots = await db2.select().from(promoSlots).where(eq(promoSlots.id, slotId)).limit(1);
      editTarget = freshSlots[0] ?? editTarget;

      const baseUrl2 = ENV.isProduction
        ? "https://www.skylinecustomshop.com/promo"
        : "https://skyline-shop-rwng7vt4.manus.space/promo";
      const photoStatus2 = editTarget.photoUrl ? "📸 Has photo" : "📷 No photo";

      // Show updated edit menu so user can keep making changes
      if (cqChatId && cqMessageId) {
        await fetch(`https://api.telegram.org/bot${ENV.telegramBotToken}/editMessageText`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: cqChatId,
            message_id: cqMessageId,
            text:
              `✅ <b>Saved! Slot #${editTarget.slotNumber} updated.</b>\n\n` +
              `👤 Name: <b>${editTarget.customerName}</b>\n` +
              `🚗 Vehicle: <b>${editTarget.carDescription}</b>\n` +
              `${photoStatus2}\n\nAnything else to change?`,
            parse_mode: "HTML",
            reply_markup: {
              inline_keyboard: [
                [
                  { text: "✏️ Edit Name", callback_data: `edit_name:${editTarget.id}` },
                  { text: "🚗 Edit Vehicle", callback_data: `edit_car:${editTarget.id}` },
                ],
                [
                  { text: "📸 Replace Photo", callback_data: `edit_photo:${editTarget.id}` },
                  { text: "✅ Done", callback_data: `edit_done:${editTarget.id}` },
                ],
              ],
            },
          }),
        });
      }
      return;
    }

    // -- edit_back: user tapped Go Back -> clear pendingValue, return to edit menu
    if (data.startsWith("edit_back:")) {
      const slotId = parseInt(data.split(":")[1], 10);
      const peJson = await getSetting(db2, "pendingEdit");
      if (peJson) {
        const pe = JSON.parse(peJson) as { action: string; slotId: number; slotNumber: number };
        // Clear pending value but keep action context so user can re-enter
        await setSetting(db2, "pendingEdit", "");
        const backSlots = await db2.select().from(promoSlots).where(eq(promoSlots.id, slotId)).limit(1);
        const backTarget = backSlots[0];
        if (backTarget) {
          const photoStatusBack = backTarget.photoUrl ? "📸 Has photo" : "📷 No photo";
          await answerCallbackQuery(cq.id);
          if (cqChatId && cqMessageId) {
            await fetch(`https://api.telegram.org/bot${ENV.telegramBotToken}/editMessageText`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                chat_id: cqChatId,
                message_id: cqMessageId,
                text:
                  `✏️ <b>Editing Slot #${backTarget.slotNumber}</b>\n\n` +
                  `👤 Name: <b>${backTarget.customerName}</b>\n` +
                  `🚗 Vehicle: <b>${backTarget.carDescription}</b>\n` +
                  `${photoStatusBack}\n\nWhat do you want to change?`,
                parse_mode: "HTML",
                reply_markup: {
                  inline_keyboard: [
                    [
                      { text: "✏️ Edit Name", callback_data: `edit_name:${backTarget.id}` },
                      { text: "🚗 Edit Vehicle", callback_data: `edit_car:${backTarget.id}` },
                    ],
                    [
                      { text: "📸 Replace Photo", callback_data: `edit_photo:${backTarget.id}` },
                      { text: "❌ Cancel", callback_data: "edit_cancel" },
                    ],
                  ],
                },
              }),
            });
          }
        }
      }
      return;
    }

    // -- edit_done: user is finished editing -> close card with summary + live link
    if (data.startsWith("edit_done:")) {
      const slotId = parseInt(data.split(":")[1], 10);
      const doneSlots = await db2.select().from(promoSlots).where(eq(promoSlots.id, slotId)).limit(1);
      const doneTarget = doneSlots[0];
      await answerCallbackQuery(cq.id, "✅ All done!");
      if (doneTarget && cqChatId && cqMessageId) {
        const baseUrlDone = ENV.isProduction
          ? "https://www.skylinecustomshop.com/promo"
          : "https://skyline-shop-rwng7vt4.manus.space/promo";
        await editMessageText(
          cqChatId,
          cqMessageId,
          `✅ <b>Slot #${doneTarget.slotNumber} - Done!</b>\n\n` +
          `👤 ${doneTarget.customerName}\n` +
          `🚗 ${doneTarget.carDescription}\n` +
          `${doneTarget.photoUrl ? "📸 Photo: updated" : "📷 No photo"}\n\n` +
          `🔗 <a href="${baseUrlDone}#slot-${doneTarget.slotNumber}">View Slot #${doneTarget.slotNumber} live -></a>`
        );
      }
      return;
    }

    // -- edit_cancel: user tapped cancel on the edit menu -----------------------
    if (data === "edit_cancel") {
      await setSetting(db2, "pendingEdit", "");
      await answerCallbackQuery(cq.id, "Cancelled");
      if (cqChatId && cqMessageId) await editMessageText(cqChatId, cqMessageId, "❌ Edit cancelled. Nothing was changed.");
      return;
    }

    // -- wizard_default: user tapped "Use default" button in /new_month wizard --
    if (data.startsWith("wizard_default:")) {
      const parts = data.split(":");
      const wizStep = parts[1];
      const wizValue = decodeURIComponent(parts.slice(2).join(":"));
      const wizJson = await getSetting(db2, "pendingNewPromo");
      if (!wizJson) { await answerCallbackQuery(cq.id, "Wizard expired. Send /new_month to restart."); return; }
      const wiz = JSON.parse(wizJson) as WizardState;
      if (wiz.step !== wizStep) { await answerCallbackQuery(cq.id, "Step mismatch. Send /new_month to restart."); return; }
      await answerCallbackQuery(cq.id);
      await advanceWizard(db2, cqChatId ?? cq.from.id, wiz, wizValue);
      return;
    }

    // -- wizard_launch: user tapped "Launch New Promo" on the confirm card ------
    if (data === "wizard_launch") {
      const wizJson = await getSetting(db2, "pendingNewPromo");
      if (!wizJson) { await answerCallbackQuery(cq.id, "Wizard expired. Send /new_month to restart.", true); return; }
      const wiz = JSON.parse(wizJson) as WizardState;
      if (wiz.step !== "confirm") { await answerCallbackQuery(cq.id, "Not ready to launch yet.", true); return; }
      await setSetting(db2, "pendingNewPromo", "");
      await answerCallbackQuery(cq.id, "🚀 Launching...", false);
      if (cqChatId && cqMessageId) await editMessageText(cqChatId, cqMessageId, "⏳ Launching new promo...");
      await executeNewPromo(db2, cqChatId ?? cq.from.id, wiz.data);
      return;
    }

    // -- wizard_cancel: user tapped Cancel in the wizard ------------------------
    if (data === "wizard_cancel") {
      await setSetting(db2, "pendingNewPromo", "");
      await answerCallbackQuery(cq.id, "Cancelled");
      if (cqChatId && cqMessageId) await editMessageText(cqChatId, cqMessageId, "❌ New promo wizard cancelled.");
      return;
    }

    await answerCallbackQuery(cq.id);
    return;
  }

  const msg = update.message;
  if (!msg) return;

  const chatId = msg.chat.id;
  const userId = String(msg.from?.id ?? "");
  const text = (msg.text ?? msg.caption ?? "").trim();

  const allowedIds = [ENV.telegramOwnerId, "5028193585"].filter(Boolean);
  if (!allowedIds.includes(userId)) {
    await sendMessage(chatId, "⛔ Unauthorized.");
    return;
  }

  const db = await getDb();
  if (!db) {
    await sendMessage(chatId, "❌ Database unavailable. Try again in a moment.");
    return;
  }

  // -- Normalize underscore command aliases from Telegram menu -----------------
  // Telegram command menus don't support spaces, so we register promo_on etc.
  // Map them back to their spaced equivalents for unified handling below.
  const normalizedText = text
    .replace(/^\/promo_on\b/, "/promo on")
    .replace(/^\/promo_off\b/, "/promo off")
    .replace(/^\/promo_status\b/, "/promo status")
    .replace(/^\/gallery_list\b/, "/gallery list")
    .replace(/^\/gallery_remove\b/, "/gallery remove")
    .replace(/^\/announce_off\b/, "/announce off")
    .replace(/^\/slots\b/, "/list")
    .replace(/^\/slot_remove\b/, "/remove")
    .replace(/^\/slot_edit\b/, "/edit")
    .replace(/^\/slot_photo\b/, "/photo")
    .replace(/^\/slot_add\b/, "/add")
    .replace(/^\/new_month\b/, "/new_month")
    .replace(/^\/waitlist\b/, "/waitlist")
    .replace(/^\/stats\b/, "/stats");
  const effectiveText = normalizedText;

  // -- /help ------------------------------------------------------------------
  if (effectiveText === "/help" || effectiveText === "/start") {
    await sendMessage(chatId,
      `<b>🚗 Skyline Custom Shop Bot</b>\n\n` +
      `<b>-- Promo Slots --</b>\n` +
      `/slot_add John D - 2023 BMW M3 (+ optional photo)\n` +
      `/list · /remove [n] · /edit [n] New Name - New Car\n/photo [n] (send with a photo to replace it)\n\n` +
      `<b>-- Promo Banner --</b>\n` +
      `/promo on · /promo off · /promo status\n` +
      `/stats - quick slot + waitlist count\n` +
      `/waitlist - see all waitlist entries\n\n` +
      `<b>-- Create New Promo --</b>\n` +
      `/new_month - guided step-by-step wizard (easiest)\n` +
      `<code>/promo_new Title | price | slots | startDate | endDate | description</code>\n\n` +
      `<b>-- Gallery --</b>\n` +
      `/gallery add [PPF|Tint|Ceramic Coating] -- [car] (+ photo)\n` +
      `/gallery list · /gallery remove [id]\n\n` +
      `<b>-- Hours --</b>\n` +
      `/hours Mon-Fri 9am-6pm\n` +
      `/hours show\n\n` +
      `<b>-- Announcement Banner --</b>\n` +
      `/announce [your message here]\n` +
      `/announce off · /announce show`
    );
    return;
  }

  // -- /new_month (guided wizard) ---------------------------------------------
  // Step-by-step wizard: asks each field one at a time with smart defaults.
  // State stored in siteSettings key "pendingNewPromo" as JSON.
  if (effectiveText === "/new_month") {
    // Start the wizard - ask for the title with a smart default
    const nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    const monthName = nextMonth.toLocaleString("en-US", { month: "long" });
    const defaultTitle = `${monthName} Special`;
    const wizardState = { step: "title", data: {} as Record<string, string> };
    await setSetting(db, "pendingNewPromo", JSON.stringify(wizardState));
    await sendMessageWithButtons(
      chatId,
      `🗓 <b>New Month Promo Wizard</b>\n\n` +
      `Step 1 of 6 - <b>Promo Title</b>\n\n` +
      `What should this month's promo be called?\n` +
      `Default: <code>${defaultTitle}</code>\n\n` +
      `Type a custom name or tap the button to use the default:`,
      [[
        { text: `Use "${defaultTitle}"`, callback_data: `wizard_default:title:${defaultTitle}` },
        { text: "Cancel", callback_data: "wizard_cancel" },
      ]]
    );
    return;
  }

  // -- /promo_new -------------------------------------------------------------
  // Format: /promo_new Title | price | totalSlots | startDate | endDate | dealDescription
  // Example: /promo_new July Special | 1999 | 15 | July 1, 2026 | July 31, 2026 | Full Front PPF + Tint Bundle
  if (effectiveText.startsWith("/promo_new")) {
    const argsRaw = effectiveText.replace(/^\/promo_new\s*/i, "").trim();
    if (!argsRaw) {
      await sendMessage(chatId,
        `📋 <b>/promo_new usage:</b>\n\n` +
        `<code>/promo_new Title | price | slots | startDate | endDate | description</code>\n\n` +
        `Example:\n<code>/promo_new July Special | 1999 | 15 | July 1, 2026 | July 31, 2026 | Full Front PPF + Tint Bundle</code>\n\n` +
        `Fields:\n` +
        `• <b>Title</b> - e.g. "July Special"\n` +
        `• <b>price</b> - number only, e.g. "1999"\n` +
        `• <b>slots</b> - total slot count, e.g. "15"\n` +
        `• <b>startDate</b> - e.g. "July 1, 2026"\n` +
        `• <b>endDate</b> - e.g. "July 31, 2026"\n` +
        `• <b>description</b> - short deal description`
      );
      return;
    }

    const parts = argsRaw.split("|").map(s => s.trim());
    if (parts.length < 6) {
      await sendMessage(chatId,
        `❌ Need exactly 6 fields separated by <code>|</code>:\n` +
        `Title | price | slots | startDate | endDate | description\n\n` +
        `You provided ${parts.length} field(s).`
      );
      return;
    }

    const [newTitle, newPrice, newSlotsStr, rawStartDate, rawEndDate, newDealDescription] = parts;
    const legacyYear = new Date().getFullYear();
    const newStartDate = sanitizePromoDate(rawStartDate, legacyYear);
    const newEndDate = sanitizePromoDate(rawEndDate, legacyYear);
    const newTotalSlots = parseInt(newSlotsStr, 10);
    if (isNaN(newTotalSlots) || newTotalSlots < 1) {
      await sendMessage(chatId, `❌ Invalid slot count: "${newSlotsStr}". Must be a positive number.`);
      return;
    }

    // Generate slug from title: "July Special" -> "july-2026"
    const monthWord = newTitle.split(" ")[0].toLowerCase();
    const year = new Date().getFullYear();
    const newSlug = `${monthWord}-${year}`;

    // Tagline auto-generated from title + description
    const newTagline = `${newTitle} - ${newDealDescription}`;

    await sendMessage(chatId, `⏳ Creating new promo "${newTitle}"...`);

    try {
      // Step 1: Find the current active promo so we can archive it
      const currentActive = await db.select().from(promos).where(eq(promos.active, 1)).limit(1);
      const prevPromo = currentActive[0] ?? null;

      // Step 2: Archive the current promo if it exists and isn't already archived
      // The archivedSlug is derived from the promo title: "June Special" -> "june-special"
      if (prevPromo && !prevPromo.isArchived) {
        const prevMonthWord = prevPromo.title.split(" ")[0].toLowerCase();
        const prevArchiveSlug = `${prevMonthWord}-special`;
        await db.update(promos)
          .set({ active: 0, isArchived: 1, archivedSlug: prevArchiveSlug })
          .where(eq(promos.id, prevPromo.id));
        await sendMessage(chatId,
          `📦 <b>${prevPromo.title}</b> archived at <code>/${prevArchiveSlug}</code> with ${prevPromo.totalSlots} slots.`
        );
        // Also update sitemap to add the archive URL
        addArchiveToSitemap(prevArchiveSlug);
      } else {
        // Just deactivate any remaining active promos without archiving
        await db.update(promos).set({ active: 0 });
      }

      // Step 3: Check if a promo with this slug already exists
      const existing = await db.select().from(promos).where(eq(promos.slug, newSlug)).limit(1);

      if (existing.length > 0) {
        // Update the existing record instead of inserting a duplicate
        await db.update(promos).set({
          title: newTitle,
          tagline: newTagline,
          dealDescription: newDealDescription,
          totalSlots: newTotalSlots,
          startDate: newStartDate,
          endDate: newEndDate,
          price: newPrice,
          active: 1,
          isArchived: 0,
          archivedSlug: null,
        }).where(eq(promos.slug, newSlug));
        updateSitemapPromoDate();
        await sendMessage(chatId,
          `✅ <b>Promo updated and activated!</b>\n\n` +
          `📅 <b>${newTitle}</b>\n` +
          `💰 Price: $${newPrice}\n` +
          `🎯 Slots: ${newTotalSlots}\n` +
          `📆 ${newStartDate} - ${newEndDate}\n` +
          `📝 ${newDealDescription}\n` +
          `🔗 Slug: ${newSlug}\n\n` +
          `The homepage banner and /promo landing page now show this promo.\n` +
          `Old slots are preserved. Use /list to see them.\n` +
          `📍 Sitemap /promo lastmod updated to today.`
        );
      } else {
        // Insert a new promo record
        await db.insert(promos).values({
          slug: newSlug,
          title: newTitle,
          tagline: newTagline,
          dealDescription: newDealDescription,
          totalSlots: newTotalSlots,
          startDate: newStartDate,
          endDate: newEndDate,
          price: newPrice,
          active: 1,
          isArchived: 0,
        });
        updateSitemapPromoDate();
        await sendMessage(chatId,
          `✅ <b>New promo created!</b>\n\n` +
          `📅 <b>${newTitle}</b>\n` +
          `💰 Price: $${newPrice}\n` +
          `🎯 Slots: ${newTotalSlots}\n` +
          `📆 ${newStartDate} - ${newEndDate}\n` +
          `📝 ${newDealDescription}\n` +
          `🔗 Slug: ${newSlug}\n\n` +
          `The homepage banner and /promo landing page now show this promo.\n` +
          `All previous promos have been deactivated.\n` +
          `📍 Sitemap /promo lastmod updated to today.`
        );
      }
    } catch (err) {
      console.error("[Telegram /promo_new] Error:", err);
      await sendMessage(chatId, `❌ Failed to create promo. Error: ${err instanceof Error ? err.message : String(err)}`);
    }
    return;
  }

  // -- /promo -----------------------------------------------------------------
  if (effectiveText.startsWith("/promo")) {
    const arg = effectiveText.replace("/promo", "").trim().toLowerCase();

    if (arg === "off") {
      const activePromo = await getActivePromoRow(db);
      if (!activePromo) { await sendMessage(chatId, "❌ No active promo found."); return; }
      await db.update(promos).set({ active: 0 }).where(eq(promos.id, activePromo.id));
      await sendMessage(chatId, `✅ <b>${activePromo.title}</b> banner is now <b>hidden</b> from the homepage.`);
      return;
    }

    if (arg === "on") {
      // Re-activate the most recently created promo
      const mostRecent = await db.select().from(promos).orderBy(desc(promos.createdAt)).limit(1);
      if (!mostRecent.length) { await sendMessage(chatId, "❌ No promo found."); return; }
      await db.update(promos).set({ active: 1 }).where(eq(promos.id, mostRecent[0].id));
      await sendMessage(chatId, `✅ <b>${mostRecent[0].title}</b> banner is now <b>visible</b> on the homepage.`);
      return;
    }

    if (arg === "status" || arg === "") {
      const activePromo = await getActivePromoRow(db);
      if (!activePromo) {
        await sendMessage(chatId, "🔴 No active promo. Use /promo on to activate the last promo, or /promo_new to create one.");
        return;
      }
      const slots = await db.select().from(promoSlots).where(eq(promoSlots.promoId, activePromo.id));
      await sendMessage(chatId,
        `<b>${activePromo.title} Status</b>\n\n` +
        `Status: 🟢 ACTIVE (visible on homepage)\n` +
        `Price: $${activePromo.price}\n` +
        `Slots filled: ${slots.length} / ${activePromo.totalSlots}\n` +
        `Remaining: ${activePromo.totalSlots - slots.length}\n` +
        `Dates: ${activePromo.startDate} - ${activePromo.endDate}`
      );
      return;
    }

    await sendMessage(chatId, "Usage: /promo on · /promo off · /promo status · /promo_new ...");
    return;
  }

  // -- /gallery ---------------------------------------------------------------
  if (effectiveText.startsWith("/gallery")) {
    const rest = effectiveText.replace("/gallery", "").trim();

    // /gallery list
    if (rest === "list" || rest === "") {
      const photos = await db.select().from(galleryPhotos).orderBy(desc(galleryPhotos.createdAt)).limit(10);
      if (!photos.length) {
        await sendMessage(chatId, "📷 No bot-uploaded gallery photos yet.");
        return;
      }
      const list = photos.map(p => `[${p.id}] ${p.category} - ${p.carDescription ?? p.alt}`).join("\n");
      await sendMessage(chatId, `<b>📷 Last 10 gallery photos:</b>\n\n${list}\n\nUse /gallery remove [id] to delete one.`);
      return;
    }

    // /gallery remove [id]
    if (rest.startsWith("remove")) {
      const id = parseInt(rest.replace("remove", "").trim(), 10);
      if (isNaN(id)) { await sendMessage(chatId, "Usage: /gallery remove [id]\nGet IDs with /gallery list"); return; }
      const rows = await db.select().from(galleryPhotos).where(eq(galleryPhotos.id, id)).limit(1);
      if (!rows.length) { await sendMessage(chatId, `❌ Photo #${id} not found.`); return; }
      await db.delete(galleryPhotos).where(eq(galleryPhotos.id, id));
      await sendMessage(chatId, `✅ Removed gallery photo #${id}: ${rows[0].carDescription ?? rows[0].alt}`);
      return;
    }

    // /gallery add [category] -- [car description] + photo
    if (rest.startsWith("add")) {
      const addRest = rest.replace(/^add\s*/i, "");
      const dashMatch = addRest.match(/^(.+?)\s*(?:-|-|--)\s*(.+)$/);

      const photos = msg.photo;
      if (!photos || photos.length === 0) {
        await sendMessage(chatId,
          `📷 Please attach a photo with your /gallery add command.\n\n` +
          `Format:\n<code>/gallery add PPF -- 2023 BMW M3 Chantilly VA</code>\n(with photo attached)`
        );
        return;
      }

      let category = "PPF";
      let carDesc = addRest;

      if (dashMatch) {
        const rawCat = dashMatch[1].trim();
        const validCats = ["PPF", "Tint", "Ceramic Coating"];
        const matched = validCats.find(c => c.toLowerCase() === rawCat.toLowerCase());
        category = matched ?? "PPF";
        carDesc = dashMatch[2].trim();
      }

      await sendMessage(chatId, "📸 Uploading photo to CDN...");
      const bestPhoto = photos[photos.length - 1];
      const photoUrl = await downloadAndUploadPhoto(bestPhoto.file_id, `gallery-${category}-${carDesc}`);

      if (!photoUrl) {
        await sendMessage(chatId, "❌ Failed to upload photo. Please try again.");
        return;
      }

      const alt = `${category} on ${carDesc} - Skyline Custom Shop Chantilly VA`;
      const existing = await db.select().from(galleryPhotos).orderBy(desc(galleryPhotos.sortOrder)).limit(1);
      const nextSort = (existing[0]?.sortOrder ?? 0) + 1;

      await db.insert(galleryPhotos).values({
        photoUrl,
        alt,
        category,
        carDescription: carDesc,
        sortOrder: nextSort,
        active: 1,
      });

      await sendMessage(chatId,
        `✅ <b>Gallery photo added!</b>\n\n` +
        `📂 Category: ${category}\n` +
        `🚗 Car: ${carDesc}\n` +
        `🔗 URL: ${photoUrl}\n\n` +
        `It will appear in the gallery on the website immediately.`
      );
      return;
    }

    await sendMessage(chatId, "Usage:\n/gallery add [category] -- [car] (+ photo)\n/gallery list\n/gallery remove [id]");
    return;
  }

  // -- /hours -----------------------------------------------------------------
  if (effectiveText.startsWith("/hours")) {
    const arg = effectiveText.replace("/hours", "").trim();

    if (arg === "show" || arg === "") {
      const current = await getSetting(db, "hours");
      await sendMessage(chatId, current
        ? `🕐 Current hours setting:\n<code>${current}</code>`
        : `🕐 No custom hours set. Default: Mon-Fri 9AM-6PM`
      );
      return;
    }

    await setSetting(db, "hours", arg);
    await sendMessage(chatId, `✅ Business hours updated to:\n<b>${arg}</b>\n\nThis will appear in the footer and contact page.`);
    return;
  }

  // -- /announce --------------------------------------------------------------
  if (effectiveText.startsWith("/announce")) {
    const arg = effectiveText.replace("/announce", "").trim();

    if (arg === "off") {
      await setSetting(db, "announcementActive", "0");
      await sendMessage(chatId, "✅ Announcement banner is now <b>hidden</b>.");
      return;
    }

    if (arg === "show" || arg === "") {
      const msg2 = await getSetting(db, "announcement");
      const active = await getSetting(db, "announcementActive");
      if (!msg2) {
        await sendMessage(chatId, "📢 No announcement set yet.\nUse: /announce Your message here");
        return;
      }
      const status = active === "1" ? "🟢 VISIBLE" : "🔴 HIDDEN";
      await sendMessage(chatId, `<b>Announcement Banner</b>\nStatus: ${status}\nMessage: ${msg2}`);
      return;
    }

    // Set new announcement message and activate it
    await setSetting(db, "announcement", arg);
    await setSetting(db, "announcementActive", "1");
    await sendMessage(chatId,
      `✅ <b>Announcement banner updated!</b>\n\n` +
      `"${arg}"\n\n` +
      `The banner is now visible on all pages.\nUse /announce off to hide it.`
    );
    return;
  }

  // -- /list ------------------------------------------------------------------
  if (effectiveText === "/list") {
    const activePromo = await getActivePromoRow(db);
    if (!activePromo) { await sendMessage(chatId, "❌ No active promo found."); return; }
    const slots = await db.select().from(promoSlots).where(eq(promoSlots.promoId, activePromo.id));
    if (!slots.length) {
      await sendMessage(chatId, `📋 No slots filled yet for <b>${activePromo.title}</b>. ${activePromo.totalSlots} remaining.`);
      return;
    }
    const list = slots.map((s, i) => `${i + 1}. ${s.customerName} - ${s.carDescription}`).join("\n");
    await sendMessage(chatId, `<b>📋 ${activePromo.title} (${slots.length}/${activePromo.totalSlots} filled)</b>\n\n${list}`);
    return;
  }

  // -- /waitlist ---------------------------------------------------------------
  if (effectiveText === "/waitlist") {
    const activePromo = await getActivePromoRow(db);
    if (!activePromo) { await sendMessage(chatId, "No active promo found."); return; }
    const entries = await db.select().from(promoWaitlist).where(eq(promoWaitlist.promoId, activePromo.id)).orderBy(promoWaitlist.createdAt);
    if (!entries.length) {
      await sendMessage(chatId, `<b>Waitlist for ${activePromo.title}</b>\n\nNo waitlist entries yet.`);
      return;
    }
    const list = entries.map((e, i) =>
      `${i + 1}. ${e.name} | ${e.email}${e.phone ? ` | ${e.phone}` : ""}${e.vehicle ? ` | ${e.vehicle}` : ""}`
    ).join("\n");
    await sendMessage(chatId, `<b>Waitlist for ${activePromo.title} (${entries.length} entries)</b>\n\n<code>${list}</code>`);
    return;
  }

  // -- /stats -----------------------------------------------------------------
  if (effectiveText === "/stats") {
    const activePromo = await getActivePromoRow(db);
    if (!activePromo) { await sendMessage(chatId, "No active promo. Use /new_month to create one."); return; }
    const slots = await db.select().from(promoSlots).where(eq(promoSlots.promoId, activePromo.id));
    const waitlistEntries = await db.select().from(promoWaitlist).where(eq(promoWaitlist.promoId, activePromo.id));
    const remaining = activePromo.totalSlots - slots.length;
    const daysLeft = activePromo.endDate
      ? Math.max(0, Math.ceil((new Date(activePromo.endDate).getTime() - Date.now()) / 86400000))
      : null;
    const statusIcon = remaining === 0 ? "🔴 SOLD OUT" : remaining <= 5 ? "🟡 ALMOST FULL" : "🟢 OPEN";
    await sendMessage(chatId,
      `<b>${activePromo.title} - Quick Stats</b>\n\n` +
      `${statusIcon}\n` +
      `Slots: ${slots.length} filled / ${activePromo.totalSlots} total\n` +
      `Remaining: ${remaining}\n` +
      `Waitlist: ${waitlistEntries.length} entries\n` +
      `${daysLeft !== null ? `Days left: ${daysLeft}` : ""}`
    );
    return;
  }

  // -- /remove ----------------------------------------------------------------
  if (effectiveText.startsWith("/remove")) {
    const num = parseInt(effectiveText.split(/\s+/)[1] ?? "", 10);
    if (isNaN(num) || num < 1) { await sendMessage(chatId, "Usage: /remove [slot number]"); return; }
    const activePromo = await getActivePromoRow(db);
    if (!activePromo) { await sendMessage(chatId, "❌ No active promo found."); return; }
    const slots = await db.select().from(promoSlots).where(eq(promoSlots.promoId, activePromo.id));
    const target = slots[num - 1];
    if (!target) { await sendMessage(chatId, `❌ Slot #${num} not found. Use /list to see slots.`); return; }
    await db.delete(promoSlots).where(eq(promoSlots.id, target.id));
    const remaining = activePromo.totalSlots - (slots.length - 1);
    await sendMessage(chatId, `✅ Removed slot #${num}: ${target.customerName} - ${target.carDescription}\n${remaining} remaining.`);
    return;
  }

  // -- /edit ------------------------------------------------------------------------------
  // -- /edit: guided slot editor with inline buttons --------------------------
  // Step 1: /slot_edit [n] -> show current slot + Edit Name / Edit Car / Replace Photo buttons
  if (effectiveText.startsWith("/edit")) {
    const editArgs = effectiveText.replace(/^\/edit\s*/, "").trim();
    const editNum = parseInt(editArgs, 10);
    if (isNaN(editNum) || editNum < 1) {
      await sendMessage(chatId,
        `❌ Usage: <code>/slot_edit [slot number]</code>\n\nExample: <code>/slot_edit 2</code>\n\nThe bot will then ask what you want to change.`
      );
      return;
    }

    const activePromo = await getActivePromoRow(db);
    if (!activePromo) { await sendMessage(chatId, "❌ No active promo found."); return; }
    const slots = await db.select().from(promoSlots).where(eq(promoSlots.promoId, activePromo.id));
    const target = slots.find(s => s.slotNumber === editNum);
    if (!target) { await sendMessage(chatId, `❌ Slot #${editNum} not found. Use /list to see all slots.`); return; }

    const photoStatus = target.photoUrl ? "📸 Has photo" : "📷 No photo";
    await sendMessageWithButtons(
      chatId,
      `✏️ <b>Editing Slot #${target.slotNumber}</b>\n\n` +
      `👤 Name: <b>${target.customerName}</b>\n` +
      `🚗 Vehicle: <b>${target.carDescription}</b>\n` +
      `${photoStatus}\n\nWhat do you want to change?`,
      [
        [
          { text: "✏️ Edit Name", callback_data: `edit_name:${target.id}` },
          { text: "🚗 Edit Vehicle", callback_data: `edit_car:${target.id}` },
        ],
        [
          { text: "📸 Replace Photo", callback_data: `edit_photo:${target.id}` },
          { text: "❌ Cancel", callback_data: "edit_cancel" },
        ],
      ]
    );
    return;
  }

  // -- Step 2a: handle wizard reply for /new_month ----------------------------
  const pendingNewPromoJson = await getSetting(db, "pendingNewPromo");
  if (pendingNewPromoJson && text && !text.startsWith("/")) {
    const wiz = JSON.parse(pendingNewPromoJson) as { step: string; data: Record<string, string> };
    await handleWizardReply(db, chatId, wiz, text);
    return;
  }

  // -- Step 2: handle reply after user tapped an edit button -------------------
  // pendingEdit stores: { action, slotId, slotNumber, pendingValue? }
  const pendingEditJson = await getSetting(db, "pendingEdit");
  if (pendingEditJson) {
    const pe = JSON.parse(pendingEditJson) as { action: string; slotId: number; slotNumber: number; pendingValue?: string; pendingPhotoUrl?: string };
    const editSlots = await db.select().from(promoSlots).where(eq(promoSlots.id, pe.slotId)).limit(1);
    const editTarget = editSlots[0];

    if (editTarget) {
      // For name/car: user just sent the new value -> show confirmation card
      if ((pe.action === "edit_name" || pe.action === "edit_car") && text && !pe.pendingValue) {
        const label = pe.action === "edit_name" ? "name" : "vehicle";
        const oldValue = pe.action === "edit_name" ? editTarget.customerName : editTarget.carDescription;
        // Store the pending value in state so confirm handler can use it
        await setSetting(db, "pendingEdit", JSON.stringify({ ...pe, pendingValue: text }));
        await sendMessageWithButtons(
          chatId,
          `🔍 <b>Confirm change for Slot #${pe.slotNumber}</b>\n\n` +
          `${pe.action === "edit_name" ? "👤" : "🚗"} ${label.charAt(0).toUpperCase() + label.slice(1)}\n` +
          `Before: <s>${oldValue}</s>\n` +
          `After: <b>${text}</b>\n\n` +
          `Save this change?`,
          [
            [
              { text: "✅ Confirm", callback_data: `edit_confirm:${pe.slotId}` },
              { text: "↩ Go Back", callback_data: `edit_back:${pe.slotId}` },
            ],
          ]
        );
        return;
      }

      // For photo: user just sent a photo -> upload it, then show confirmation card
      if (pe.action === "edit_photo" && !pe.pendingPhotoUrl) {
        const photos = msg.photo;
        if (!photos || photos.length === 0) {
          await sendMessage(chatId, `📸 Please send a photo to replace the one on Slot #${pe.slotNumber}.`);
          return;
        }
        await sendMessage(chatId, "📸 Uploading photo...");
        const newPhotoUrl = await downloadAndUploadPhoto(
          photos[photos.length - 1].file_id,
          `slot-${pe.slotNumber}-${editTarget.customerName}-${editTarget.carDescription}`
        );
        if (!newPhotoUrl) {
          await sendMessage(chatId, "❌ Photo upload failed. Please try again.");
          return;
        }
        // Store pending photo URL, show confirmation
        await setSetting(db, "pendingEdit", JSON.stringify({ ...pe, pendingPhotoUrl: newPhotoUrl }));
        await sendMessageWithButtons(
          chatId,
          `🔍 <b>Confirm photo for Slot #${pe.slotNumber}</b>\n\n` +
          `👤 ${editTarget.customerName}\n🚗 ${editTarget.carDescription}\n\n` +
          `📸 <a href="${newPhotoUrl}">Preview new photo</a>\n\n` +
          `Replace the current photo with this one?`,
          [
            [
              { text: "✅ Confirm", callback_data: `edit_confirm:${pe.slotId}` },
              { text: "↩ Go Back", callback_data: `edit_back:${pe.slotId}` },
            ],
          ]
        );
        return;
      }
    }
  }
  // -- Add slot (default: "Name - Car" or /slot_add Name - Car) --------------
  // Strip /add prefix if present so the dash-match below works for both styles
  const slotAddText = effectiveText.startsWith("/add ")
    ? effectiveText.replace(/^\/add\s+/, "")
    : effectiveText;
  const dashMatch = slotAddText.match(/^(.+?)\s*(?:-|-|--|-)\s*(.+)$/);
  if (dashMatch) {
    const customerName = dashMatch[1].trim();
    const carDescription = dashMatch[2].trim();

    const activePromo = await getActivePromoRow(db);
    if (!activePromo) { await sendMessage(chatId, "❌ No active promo found. Create one with /promo_new first."); return; }
    const currentSlots = await db.select().from(promoSlots).where(eq(promoSlots.promoId, activePromo.id));
    if (currentSlots.length >= activePromo.totalSlots) {
      await sendMessage(chatId, `🚫 All ${activePromo.totalSlots} slots for <b>${activePromo.title}</b> are already filled!`);
      return;
    }

    // Upload photo first if attached (before showing preview)
    let photoUrl: string | null = null;
    const photos = msg.photo;
    if (photos && photos.length > 0) {
      await sendMessage(chatId, "📸 Uploading photo...");
      photoUrl = await downloadAndUploadPhoto(photos[photos.length - 1].file_id, `slot-${customerName}-${carDescription}`);
    }

    // Save draft to siteSettings so the confirm handler can retrieve it
    const previewSlotNumber = currentSlots.length + 1;
    const draft = {
      customerName,
      carDescription,
      photoUrl,
      promoId: activePromo.id,
      promoTitle: activePromo.title,
      totalSlots: activePromo.totalSlots,
    };
    await setSetting(db, "pendingSlot", JSON.stringify(draft));

    const photoLine = photoUrl
      ? `📸 <a href="${photoUrl}">Photo attached</a>`
      : `📷 No photo (slot will show placeholder)`;
    const remaining = activePromo.totalSlots - previewSlotNumber;

    await sendMessageWithButtons(
      chatId,
      `🔍 <b>Preview - Slot #${previewSlotNumber} for ${activePromo.title}</b>\n\n` +
      `👤 <b>Customer:</b> ${customerName}\n` +
      `🚗 <b>Vehicle:</b> ${carDescription}\n` +
      `${photoLine}\n\n` +
      `This will be slot <b>#${previewSlotNumber}</b> of ${activePromo.totalSlots} ` +
      `(${remaining} remaining after this).\n\n` +
      `Does this look correct?`,
      [
        [
          { text: "✅ Yes, post it", callback_data: "slot_confirm" },
          { text: "❌ Cancel", callback_data: "slot_cancel" },
        ],
      ]
    );
    return;
  }

  // -- Plain number: typing just a number (e.g. "2") shows the edit menu for that slot
  const plainNum = parseInt(effectiveText, 10);
  if (!isNaN(plainNum) && plainNum >= 1 && String(plainNum) === effectiveText) {
    const activePromo2 = await getActivePromoRow(db);
    if (!activePromo2) { await sendMessage(chatId, "❌ No active promo found."); return; }
    const allSlots = await db.select().from(promoSlots).where(eq(promoSlots.promoId, activePromo2.id));
    const targetSlot = allSlots.find(s => s.slotNumber === plainNum);
    if (!targetSlot) {
      await sendMessage(chatId, `❌ Slot #${plainNum} not found. Use /list to see all slots.`);
      return;
    }
    const photoStatus = targetSlot.photoUrl ? "📸 Has photo" : "📷 No photo";
    await sendMessageWithButtons(
      chatId,
      `✏️ <b>Editing Slot #${targetSlot.slotNumber}</b>\n\n` +
      `👤 Name: <b>${targetSlot.customerName}</b>\n` +
      `🚗 Vehicle: <b>${targetSlot.carDescription}</b>\n` +
      `${photoStatus}\n\nWhat do you want to change?`,
      [
        [
          { text: "✏️ Edit Name", callback_data: `edit_name:${targetSlot.id}` },
          { text: "🚗 Edit Vehicle", callback_data: `edit_car:${targetSlot.id}` },
        ],
        [
          { text: "📸 Replace Photo", callback_data: `edit_photo:${targetSlot.id}` },
          { text: "❌ Cancel", callback_data: "edit_cancel" },
        ],
      ]
    );
    return;
  }

  // -- Unknown command --------------------------------------------------------
  await sendMessage(chatId,
    `❓ I didn't understand that.\n\nType /help to see all available commands.`
  );
}

// --- TypeScript types --------------------------------------------------------
interface TelegramUpdate {
  update_id: number;
  message?: TelegramMessage;
  callback_query?: TelegramCallbackQuery;
}

interface TelegramCallbackQuery {
  id: string;
  from: { id: number; username?: string; first_name?: string };
  message?: TelegramMessage;
  data?: string;
}

interface TelegramMessage {
  message_id: number;
  from?: { id: number; username?: string; first_name?: string };
  chat: { id: number };
  text?: string;
  caption?: string;
  photo?: Array<{ file_id: string; file_unique_id: string; width: number; height: number; file_size?: number }>;
}
