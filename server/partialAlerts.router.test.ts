import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import type { TrpcContext } from "./_core/context";

// End to end through the real tRPC procedures: contact.partial queues the alert, contact.submit cancels it,
// and the scheduler tick sends the card to every owner chat. GHL and Telegram are stand-ins (stubbed fetch);
// no database (DATABASE_URL unset), so the in-memory store is used.
const calls: { url: string; body: Record<string, unknown> }[] = [];
function stubFetch() {
  vi.stubGlobal("fetch", vi.fn(async (url: string, init?: { body?: string }) => {
    const body = init?.body ? JSON.parse(init.body) : {};
    calls.push({ url: String(url), body });
    const json = (j: unknown) => ({ ok: true, status: 200, json: async () => j, text: async () => JSON.stringify(j) });
    if (String(url).includes("api.telegram.org")) return json({ ok: true });
    if (String(url).endsWith("/contacts/")) return json({ contact: { id: "ghl-contact-1", phone: "+17035550101" } });
    if (String(url).includes("/opportunities/search")) return json({ opportunities: [{ id: "o1" }] });
    return json({});
  }));
}

let ip = 0;
const ctx = (): TrpcContext => ({ user: null, req: { protocol: "https", headers: { "x-forwarded-for": `10.0.0.${++ip}` } } as TrpcContext["req"], res: {} as TrpcContext["res"] });
const partialInput = { firstName: "Sam", lastName: "Lee", phone: "(703) 555-0101", formId: "quote" as const, service: "PPF", year: "2023", make: "Tesla", model: "Model Y", page: "/" };

describe("unfinished-quote alert through the tRPC router", () => {
  beforeEach(() => {
    vi.resetModules();
    calls.length = 0;
    delete process.env.DATABASE_URL;
    delete process.env.PARTIAL_LEAD_ALERTS;
    process.env.TELEGRAM_BOT_TOKEN = "test-token";
    process.env.TELEGRAM_OWNER_IDS = "111,222";
    process.env.TELEGRAM_CHAT_IDS = "222,333";
    process.env.JWT_SECRET = "test-secret";
    process.env.GHL_LOCATION_ID = "loc123";
    stubFetch();
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(Date.UTC(2026, 10, 11, 15, 0));
  });
  afterEach(() => { vi.useRealTimers(); vi.unstubAllGlobals(); });

  it("partial with no submit: one card 15 minutes later to every chat in TELEGRAM_CHAT_IDS/OWNER_IDS, nothing texted to the lead", async () => {
    const { appRouter } = await import("./routers");
    const { runDueAlerts } = await import("./partialAlerts");
    await appRouter.createCaller(ctx()).contact.partial(partialInput);
    // The partial saved the car in GHL's custom fields.
    const created = calls.find((c) => c.url.endsWith("/contacts/"))!;
    expect(JSON.stringify(created.body.customFields)).toContain("Model Y");
    calls.length = 0;
    vi.setSystemTime(Date.UTC(2026, 10, 11, 15, 15));
    expect(await runDueAlerts()).toBe(1);
    const tg = calls.filter((c) => c.url.includes("api.telegram.org"));
    expect(tg.map((c) => c.body.chat_id).sort()).toEqual(["111", "222", "333"]);
    expect(String(tg[0].body.text)).toContain("Sam started a 2023 Tesla Model Y full front PPF quote 15 min ago, didn't finish.");
    expect(JSON.stringify(tg[0].body.reply_markup)).toContain("/api/call/7035550101.");
    expect(JSON.stringify(tg[0].body.reply_markup)).toContain("/contacts/detail/ghl-contact-1");
    // No SMS or conversation message to the lead.
    expect(calls.some((c) => c.url.includes("/conversations/messages"))).toBe(false);
  });

  it("partial then a full submit inside 15 minutes: no card", async () => {
    const { appRouter } = await import("./routers");
    const { runDueAlerts } = await import("./partialAlerts");
    await appRouter.createCaller(ctx()).contact.partial(partialInput);
    vi.setSystemTime(Date.UTC(2026, 10, 11, 15, 5));
    await appRouter.createCaller(ctx()).contact.submit({ firstName: "Sam", lastName: "Lee", email: "sam@example.com", phone: "703-555-0101", service: "PPF", year: "2023", make: "Tesla", model: "Model Y", formId: "quote" });
    calls.length = 0;
    vi.setSystemTime(Date.UTC(2026, 10, 11, 15, 30));
    expect(await runDueAlerts()).toBe(0);
    expect(calls.some((c) => c.url.includes("api.telegram.org"))).toBe(false);
  });

  it("PARTIAL_LEAD_ALERTS=off: nothing queued", async () => {
    process.env.PARTIAL_LEAD_ALERTS = "off";
    const { appRouter } = await import("./routers");
    const { runDueAlerts } = await import("./partialAlerts");
    await appRouter.createCaller(ctx()).contact.partial(partialInput);
    vi.setSystemTime(Date.UTC(2026, 10, 11, 16, 0));
    calls.length = 0;
    expect(await runDueAlerts()).toBe(0);
    expect(calls.length).toBe(0);
  });
});
