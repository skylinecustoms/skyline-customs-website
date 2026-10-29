/**
 * Lead-quality tags in GoHighLevel.
 *
 * The Meta conversion-event setup (Leadfuse lesson 1.6.6 and Bryan's
 * "What Is a Quality Lead" one-pager) hangs on two tags with exact spelling:
 *   quality | qualified     Meta: find more people like this one
 *   quality | unqualified   Meta: fewer people like this
 * This creates them in the CRM at boot if they are missing, so the closer
 * picks them from the list instead of typing them, and reports the result
 * on /api/health (integrations.ghlQualityTags). Workflows cannot be created
 * through the GHL API; those are built in the GHL interface.
 */
import { GHL_HEADERS, GHL_LOCATION_ID } from "./routers";

export const QUALITY_TAGS = ["quality | qualified", "quality | unqualified"] as const;

export interface QualityTagStatus { checkedAt: string; present: string[]; created: string[]; error?: string }
let status: QualityTagStatus | null = null;
export const qualityTagStatus = () => status;

export async function ensureQualityTags(): Promise<QualityTagStatus> {
  const result: QualityTagStatus = { checkedAt: new Date().toISOString(), present: [], created: [] };
  if (!GHL_LOCATION_ID || !(process.env.GHL_API_KEY ?? "").trim()) { result.error = "GHL not configured"; status = result; return result; }
  try {
    const r = await fetch(`https://services.leadconnectorhq.com/locations/${GHL_LOCATION_ID}/tags`, { headers: GHL_HEADERS });
    if (!r.ok) throw new Error(`list tags HTTP ${r.status}: ${(await r.text()).slice(0, 200)}`);
    const existing = new Set((((await r.json()) as { tags?: { name: string }[] }).tags ?? []).map((t) => t.name.trim().toLowerCase()));
    for (const name of QUALITY_TAGS) {
      if (existing.has(name)) { result.present.push(name); continue; }
      const c = await fetch(`https://services.leadconnectorhq.com/locations/${GHL_LOCATION_ID}/tags`, { method: "POST", headers: { ...GHL_HEADERS, "Content-Type": "application/json" }, body: JSON.stringify({ name }) });
      if (!c.ok) throw new Error(`create tag "${name}" HTTP ${c.status}: ${(await c.text()).slice(0, 200)}`);
      result.created.push(name);
    }
    console.log(`[ghl] quality tags: ${result.present.length} present, ${result.created.length} created`);
  } catch (err) {
    result.error = (err as Error).message;
    console.warn("[ghl] quality tags check failed:", result.error);
  }
  status = result;
  return result;
}
