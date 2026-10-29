/**
 * Lead-quality tags in GoHighLevel.
 *
 * The CRM already runs the Meta conversion-event setup through the
 * "PPF Meta Conversions Pipeline" workflow, keyed on these tags:
 *   ppf lead, ppf qualified lead, ppf unqualified lead, deposit paid, paid/job completed
 * An earlier pass created a second pair (quality | qualified / unqualified)
 * before that workflow was found. This removes that pair at boot if it is
 * still there, so the closer has one set of tags to pick from, and reports
 * on /api/health (integrations.ghlQualityTags).
 */
import { GHL_HEADERS, GHL_LOCATION_ID } from "./routers";

/** Tags the Meta workflow listens for. Keep in step with the workflow in GHL. */
export const QUALITY_TAGS = { newLead: "ppf lead", qualified: "ppf qualified lead", unqualified: "ppf unqualified lead", deposit: "deposit paid", complete: "paid/job completed" } as const;
const RETIRED_TAGS = ["quality | qualified", "quality | unqualified"];

export interface QualityTagStatus { checkedAt: string; present: string[]; removed: string[]; error?: string }
let status: QualityTagStatus | null = null;
export const qualityTagStatus = () => status;

export async function ensureQualityTags(): Promise<QualityTagStatus> {
  const result: QualityTagStatus = { checkedAt: new Date().toISOString(), present: [], removed: [] };
  if (!GHL_LOCATION_ID || !(process.env.GHL_API_KEY ?? "").trim()) { result.error = "GHL not configured"; status = result; return result; }
  try {
    const r = await fetch(`https://services.leadconnectorhq.com/locations/${GHL_LOCATION_ID}/tags`, { headers: GHL_HEADERS });
    if (!r.ok) throw new Error(`list tags HTTP ${r.status}: ${(await r.text()).slice(0, 200)}`);
    const tags = ((await r.json()) as { tags?: { id: string; name: string }[] }).tags ?? [];
    const byName = new Map(tags.map((t) => [t.name.trim().toLowerCase(), t.id]));
    for (const name of Object.values(QUALITY_TAGS)) if (byName.has(name)) result.present.push(name);
    for (const name of RETIRED_TAGS) {
      const id = byName.get(name);
      if (!id) continue;
      const d = await fetch(`https://services.leadconnectorhq.com/locations/${GHL_LOCATION_ID}/tags/${id}`, { method: "DELETE", headers: GHL_HEADERS });
      if (!d.ok) throw new Error(`delete tag "${name}" HTTP ${d.status}: ${(await d.text()).slice(0, 200)}`);
      result.removed.push(name);
    }
    console.log(`[ghl] quality tags: ${result.present.length}/5 workflow tags present, ${result.removed.length} retired tag(s) removed`);
  } catch (err) {
    result.error = (err as Error).message;
    console.warn("[ghl] quality tags check failed:", result.error);
  }
  status = result;
  return result;
}
