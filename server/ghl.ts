/**
 * GHL (GoHighLevel) integration helpers for Skyline Custom Shop.
 *
 * Used to send urgency SMS messages to PPF lead contacts whenever
 * a promo slot is confirmed via the Telegram bot.
 */

import { ENV } from "./_core/env";

const GHL_BASE = "https://services.leadconnectorhq.com";
const PPF_LEAD_TAG = "ppf lead";

interface GhlContact {
  id: string;
  firstName?: string;
  phone?: string;
  tags?: string[];
}

interface GhlContactsResponse {
  contacts: GhlContact[];
  meta?: { total?: number; nextPageUrl?: string };
}

/**
 * Fetch all contacts tagged "ppf lead" from GHL (handles pagination).
 */
async function getPpfLeadContacts(): Promise<GhlContact[]> {
  const contacts: GhlContact[] = [];
  let url: string | null =
    `${GHL_BASE}/contacts/?locationId=${ENV.ghlLocationId}&limit=100&tags=${encodeURIComponent(PPF_LEAD_TAG)}`;

  while (url) {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${ENV.ghlApiKey}`,
        Version: "2021-07-28",
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      console.error(`[GHL] Failed to fetch contacts: ${res.status} ${await res.text()}`);
      break;
    }

    const data = (await res.json()) as GhlContactsResponse;
    contacts.push(...(data.contacts ?? []));

    // Pagination: follow nextPageUrl if present
    url = data.meta?.nextPageUrl ?? null;
  }

  return contacts;
}

/**
 * Send an SMS to a single GHL contact by contact ID.
 */
async function sendSms(contactId: string, message: string): Promise<boolean> {
  const res = await fetch(`${GHL_BASE}/conversations/messages`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${ENV.ghlApiKey}`,
      Version: "2021-07-28",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      type: "SMS",
      contactId,
      message,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    console.error(`[GHL] SMS failed for contact ${contactId}: ${res.status} ${body}`);
    return false;
  }

  return true;
}

/**
 * Fire urgency SMS to all "ppf lead" contacts when a promo slot is confirmed.
 *
 * @param slotNumber   The slot number that was just claimed (e.g. 8)
 * @param remaining    How many slots are still available (e.g. 13)
 * @param promoTitle   The promo title (e.g. "June Special")
 * @param promoEndDate The promo end date string (e.g. "June 30, 2026")
 */
export async function notifyPpfLeadsSlotClaimed(
  slotNumber: number,
  remaining: number,
  promoTitle: string,
  promoEndDate: string
): Promise<void> {
  if (!ENV.ghlApiKey || !ENV.ghlLocationId) {
    console.warn("[GHL] Missing GHL_API_KEY or GHL_LOCATION_ID — skipping urgency SMS.");
    return;
  }

  let contacts: GhlContact[];
  try {
    contacts = await getPpfLeadContacts();
  } catch (err) {
    console.error("[GHL] Failed to fetch PPF lead contacts:", err);
    return;
  }

  if (contacts.length === 0) {
    console.log("[GHL] No PPF lead contacts found — no SMS sent.");
    return;
  }

  console.log(`[GHL] Sending urgency SMS to ${contacts.length} PPF lead contact(s)...`);

  const slotsWord = remaining === 1 ? "spot" : "spots";
  const message =
    `Hey ${"{firstName}"} - just a heads up, Slot #${slotNumber} on our ${promoTitle} just got claimed. ` +
    `Only ${remaining} ${slotsWord} left at $2,400 before ${promoEndDate}. ` +
    `See who's already in and grab your spot: https://www.skylinecustomshop.com/promo`;

  let sent = 0;
  let failed = 0;

  for (const contact of contacts) {
    if (!contact.phone) continue; // skip contacts with no phone
    const firstName = contact.firstName?.trim() || "there";
    const personalizedMsg = message.replace("{firstName}", firstName);
    const ok = await sendSms(contact.id, personalizedMsg);
    if (ok) sent++;
    else failed++;
    // Small delay to avoid GHL rate limits
    await new Promise((r) => setTimeout(r, 150));
  }

  console.log(`[GHL] Urgency SMS complete: ${sent} sent, ${failed} failed.`);
}
