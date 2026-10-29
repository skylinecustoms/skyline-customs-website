/**
 * /ghl_audit (Telegram, owner only): what the CRM already has around lead
 * quality, so the Meta conversion-event setup can be merged with whatever
 * was built before it. Lists every workflow with its status, the pipelines
 * and their stages, the tags that look like quality or stage markers, and
 * how many contacts carry each. The GHL API cannot read a workflow's trigger
 * or actions, so those still have to be opened in the GHL interface; this
 * tells you which ones to open.
 */
import { GHL_HEADERS, GHL_LOCATION_ID } from "./routers";

const API = "https://services.leadconnectorhq.com";
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

async function get<T>(path: string): Promise<T> {
  const r = await fetch(`${API}${path}`, { headers: GHL_HEADERS });
  if (!r.ok) throw new Error(`${path.split("?")[0]} HTTP ${r.status}: ${(await r.text()).slice(0, 160)}`);
  return (await r.json()) as T;
}

async function contactsWithTag(tag: string): Promise<number> {
  const r = await fetch(`${API}/contacts/search`, {
    method: "POST",
    headers: { ...GHL_HEADERS, "Content-Type": "application/json" },
    body: JSON.stringify({ locationId: GHL_LOCATION_ID, pageLimit: 1, filters: [{ field: "tags", operator: "eq", value: tag }] }),
  });
  if (!r.ok) return -1;
  const j = (await r.json()) as { total?: number };
  return j.total ?? -1;
}

export async function buildGhlAudit(): Promise<string> {
  if (!GHL_LOCATION_ID) return "GHL is not configured.";
  const lines: string[] = ["🔎 <b>GHL audit: lead quality and Meta events</b>"];

  // Workflows
  try {
    const w = await get<{ workflows?: { id: string; name: string; status: string; createdAt?: string; updatedAt?: string }[] }>(`/workflows/?locationId=${GHL_LOCATION_ID}`);
    const all = w.workflows ?? [];
    const interesting = all.filter((x) => /meta|facebook|fb|capi|conversion|qualif|deposit|paid|complete|lead/i.test(x.name));
    lines.push("", `<b>Workflows</b> (${all.length} total, ${interesting.length} look related)`);
    for (const x of interesting.sort((a, b) => a.name.localeCompare(b.name))) {
      lines.push(`• ${esc(x.name)} — ${x.status}${x.updatedAt ? `, updated ${x.updatedAt.slice(0, 10)}` : ""}`);
    }
    lines.push("Open each one that is not META | … and read its trigger and the Facebook event name in its Meta action.");
  } catch (err) { lines.push("", `Workflows: ${esc((err as Error).message)}`); }

  // Pipelines and stages
  try {
    const p = await get<{ pipelines?: { name: string; stages: { name: string }[] }[] }>(`/opportunities/pipelines?locationId=${GHL_LOCATION_ID}`);
    lines.push("", "<b>Pipelines</b>");
    for (const pl of p.pipelines ?? []) lines.push(`• ${esc(pl.name)}: ${pl.stages.map((s) => esc(s.name)).join(" → ")}`);
  } catch (err) { lines.push("", `Pipelines: ${esc((err as Error).message)}`); }

  // Tags that look like quality or stage markers, with contact counts
  try {
    const t = await get<{ tags?: { name: string }[] }>(`/locations/${GHL_LOCATION_ID}/tags`);
    const names = (t.tags ?? []).map((x) => x.name).filter((n) => /qualif|quality|deposit|paid|complete|booked|hot|cold|junk|spam|dnc|stop/i.test(n)).sort();
    lines.push("", `<b>Quality-looking tags</b> (${names.length} of ${(t.tags ?? []).length})`);
    for (const n of names) {
      const c = await contactsWithTag(n);
      lines.push(`• ${esc(n)} — ${c < 0 ? "count unavailable" : `${c} contact${c === 1 ? "" : "s"}`}`);
    }
  } catch (err) { lines.push("", `Tags: ${esc((err as Error).message)}`); }

  lines.push("", "Meta's dataset shows Qualified Lead, Added Payment Info and Paid/Job Completed arriving by Conversions API. Whichever workflow sends those is the one to merge with META | Qualified, META | Deposit Paid and META | Job Complete.");
  return lines.join("\n").slice(0, 4000);
}
