import { describe, expect, it, beforeEach } from "vitest";
import { queuePartialAlert, markLeadFinished, runDueAlerts, buildAlertCard, callUrl, verifyCallToken, alertsEnabled, alertDelayMs, phoneKey, type AlertStore, type PendingAlert, type InlineButton } from "./partialAlerts";

// Stand-ins: an in-memory store (the siteSettings row) and a fake Telegram sender that records cards.
function memoryStore(): AlertStore & { list: PendingAlert[] } {
  const s = { list: [] as PendingAlert[], async load() { return JSON.parse(JSON.stringify(s.list)) as PendingAlert[]; }, async save(l: PendingAlert[]) { s.list = JSON.parse(JSON.stringify(l)); } };
  return s;
}
const MIN = 60_000;
let clock = Date.UTC(2026, 10, 11, 15, 0);
const now = () => clock;
let sent: { html: string; buttons: InlineButton[][] }[] = [];
const send = async (html: string, buttons: InlineButton[][]) => { sent.push({ html, buttons }); return { ok: true, results: ["5028…: sent", "5497…: sent"] }; };
const env = { GHL_LOCATION_ID: "loc123" } as NodeJS.ProcessEnv;
const lead = { phone: "(703) 555-0101", firstName: "Sam", year: "2023", make: "Tesla", model: "Model Y", service: "PPF", contactId: "c1", formId: "quote", page: "/get-a-quote" };

describe("unfinished-quote alert", () => {
  let store: ReturnType<typeof memoryStore>;
  beforeEach(() => { store = memoryStore(); sent = []; clock = Date.UTC(2026, 10, 11, 15, 0); process.env.JWT_SECRET = "test-secret"; process.env.GHL_LOCATION_ID = "loc123"; });

  it("alerts once, 15 minutes after the partial, when they never finish", async () => {
    expect(await queuePartialAlert(lead, { store, now, env })).toBe(true);
    clock += 14 * MIN;
    expect(await runDueAlerts({ store, send, now, env })).toBe(0);
    clock += 1 * MIN;
    expect(await runDueAlerts({ store, send, now, env })).toBe(1);
    expect(sent).toHaveLength(1);
    expect(sent[0].html).toContain("Sam started a 2023 Tesla Model Y full front PPF quote 15 min ago, didn't finish.");
    expect(sent[0].html).toContain("(703) 555-0101");
    const [call, ghl] = sent[0].buttons[0];
    expect(call.text).toBe("📞 Call Sam");
    expect(call.url).toMatch(/^https:\/\/www\.skylinecustomshop\.com\/api\/call\/7035550101\.[A-Za-z0-9_-]{22}$/);
    expect(ghl.url).toBe("https://app.gohighlevel.com/v2/location/loc123/contacts/detail/c1");
    // Later ticks and a second partial from the same phone do not alert again.
    clock += 30 * MIN;
    expect(await runDueAlerts({ store, send, now, env })).toBe(0);
    expect(await queuePartialAlert(lead, { store, now, env })).toBe(false);
    clock += 30 * MIN;
    await runDueAlerts({ store, send, now, env });
    expect(sent).toHaveLength(1);
  });

  it("sends nothing when they finish within 15 minutes (phone matched in any format)", async () => {
    await queuePartialAlert(lead, { store, now, env });
    clock += 6 * MIN;
    expect(await markLeadFinished("+1 703-555-0101", { store, now })).toBe(true);
    clock += 20 * MIN;
    expect(await runDueAlerts({ store, send, now, env })).toBe(0);
    expect(sent).toHaveLength(0);
  });

  it("survives a restart: the pending alert is in the store, a fresh tick sends it", async () => {
    await queuePartialAlert(lead, { store, now, env });
    const persisted = JSON.parse(JSON.stringify(store.list));
    const afterRestart = memoryStore(); afterRestart.list = persisted;
    clock += 16 * MIN;
    expect(await runDueAlerts({ store: afterRestart, send, now, env })).toBe(1);
    expect(sent[0].html).toContain("16 min ago");
  });

  it("is off with PARTIAL_LEAD_ALERTS=off, and skips the exit prompt and junk phones", async () => {
    const off = { PARTIAL_LEAD_ALERTS: "off" } as NodeJS.ProcessEnv;
    expect(alertsEnabled(off)).toBe(false);
    expect(alertsEnabled({} as NodeJS.ProcessEnv)).toBe(true);
    expect(await queuePartialAlert(lead, { store, now, env: off })).toBe(false);
    expect(await queuePartialAlert({ ...lead, formId: "exit" }, { store, now, env })).toBe(false);
    expect(await queuePartialAlert({ ...lead, phone: "12345" }, { store, now, env })).toBe(false);
    expect(store.list).toHaveLength(0);
    expect(alertDelayMs({ PARTIAL_LEAD_ALERT_MINUTES: "20" } as NodeJS.ProcessEnv)).toBe(20 * MIN);
    expect(alertDelayMs({} as NodeJS.ProcessEnv)).toBe(15 * MIN);
  });

  it("card wording without a car or service, HTML-escaped name, no GHL button without a contact", () => {
    const a: PendingAlert = { phone: "7035550101", firstName: "<b>Jo</b>", vehicle: "", service: "Not Sure Yet", contactId: null, formId: "quote", page: "", startedAt: clock - 15 * MIN, dueAt: clock, status: "pending" };
    const card = buildAlertCard(a, clock, "loc123");
    expect(card.html).toContain("&lt;b&gt;Jo&lt;/b&gt; started a quote 15 min ago, didn't finish.");
    expect(card.buttons[0]).toHaveLength(1);
    expect(buildAlertCard({ ...a, firstName: "Ana", service: "Tints", vehicle: "2021 Honda Accord" }, clock).html).toContain("Ana started a 2021 Honda Accord window tint quote");
  });

  it("call links are signed: a tampered number is refused", () => {
    const url = callUrl("7035550101");
    const token = url.split("/api/call/")[1];
    expect(verifyCallToken(token)).toBe("7035550101");
    expect(verifyCallToken(token.replace("7035550101", "9005550199"))).toBeNull();
    expect(verifyCallToken("7035550101.short")).toBeNull();
    expect(phoneKey("+1 (571) 555-0123")).toBe("5715550123");
  });
});
