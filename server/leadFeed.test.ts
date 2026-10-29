import { describe, expect, it } from "vitest";
import { feedAuthorized, toLead, shortName, monthStarts, periodTotals, humanTouch } from "./leadFeed";

const KEY = "k".repeat(40);

describe("lead feed for the client portal", () => {
  it("needs the portal's key, and is closed without one", () => {
    expect(feedAuthorized(`Bearer ${KEY}`, KEY)).toBe(true);
    expect(feedAuthorized(`Bearer ${"x".repeat(40)}`, KEY)).toBe(false);
    expect(feedAuthorized("Bearer ", "")).toBe(false);
  });
  it("turns a GHL contact into a lead: short name, vehicle and job value, no phone or email", () => {
    const l = toLead({ tags: ["website-quote", "ppf lead", "booked"], source: "Google", dateAdded: "2026-10-28T18:00:00.000Z", firstName: "Dana", lastName: "lee",
      customFields: [{ id: "n5O64Bp2FJvBK5GsVSnV", value: "2024" }, { id: "2YNQZIRvWYEjqdJ2UGVw", value: "BMW" }, { id: "DAjqA7njYRUfAh7t67Xb", value: "M4" }, { id: "M4ZxemI7IYUXNbK2cMMx", value: "$3,150" }],
      ...({ phone: "+15555550100", email: "dana@example.com" } as object) });
    expect(l).toEqual({ kind: "form", name: "Dana L.", vehicle: "2024 BMW M4", value: 3150, source: "Google", service: "PPF", booked: true, website: true, at: "2026-10-28T18:00:00.000Z" });
    expect(JSON.stringify(l)).not.toMatch(/5555|example\.com/);
  });
  it("tidies names typed in all caps", () => {
    expect(shortName("GLEN", "DOE")).toBe("Glen D.");
    expect(shortName("mary-ann", "o'neil")).toBe("Mary-Ann O.");
    expect(shortName("DeShawn", "McKay")).toBe("DeShawn M.");
  });
  it("takes GHL's nulls for empty fields", () => {
    expect(toLead({ tags: null, firstName: null, lastName: null, source: null, dateAdded: null, customFields: null })).toMatchObject({ name: "", vehicle: "", value: 0, kind: "lead" });
    expect(toLead({ tags: ["organic"], firstName: "Sam", lastName: null, customFields: [{ id: "M4ZxemI7IYUXNbK2cMMx", value: null }] })).toMatchObject({ name: "Sam", value: 0, website: true });
  });
  it("uses the one-line vehicle field when that's what the lead filled in", () => {
    expect(toLead({ tags: ["facebook"], customFields: [{ id: "aCeicFhtVTo4zc8ZCvBy", value: "2023  Tesla Model Y" }] })).toMatchObject({ vehicle: "2023 Tesla Model Y", value: 0, name: "" });
  });
  it("labels calls and services, and drops spam", () => {
    expect(toLead({ tags: ["called lead", "tint lead"] })).toMatchObject({ kind: "call", service: "Tint" });
    expect(toLead({ tags: ["ceramic coating lead", "facebook"] })).toMatchObject({ kind: "lead", service: "Ceramic coating", source: "Facebook" });
    expect(toLead({ tags: ["website-contact", "ppf lead"] })).toMatchObject({ website: true });
    expect(toLead({ tags: ["website-contact", "called lead"] })).toMatchObject({ kind: "form", website: true });
    expect(toLead({ tags: ["called lead"] })).toMatchObject({ website: false });
    expect(toLead({ tags: ["organic", "tint lead"] })).toMatchObject({ website: true, kind: "lead" });
    expect(toLead({ tags: ["facebook", "ppf lead"] })).toMatchObject({ website: false });
    expect(toLead({ tags: ["spam likely"] })).toBeNull();
    expect(toLead({ tags: ["scam call", "called lead"] })).toBeNull();
  });
  it("splits this month and last month at midnight Eastern", () => {
    const m = monthStarts(new Date("2026-10-29T12:00:00Z"));
    expect(m.thisMonth.toISOString()).toBe("2026-10-01T04:00:00.000Z");
    expect(m.lastMonth.toISOString()).toBe("2026-09-01T04:00:00.000Z");
    expect(m.monthBefore.toISOString()).toBe("2026-08-01T04:00:00.000Z");
    expect(monthStarts(new Date("2026-02-10T12:00:00Z")).monthBefore.toISOString()).toBe("2025-12-01T05:00:00.000Z");
    expect(monthStarts(new Date("2026-01-01T03:00:00Z")).thisMonth.toISOString()).toBe("2025-12-01T05:00:00.000Z"); // still Dec 31 in Chantilly
    const a = toLead({ tags: ["website-contact", "booked"], dateAdded: "2026-09-30T23:00:00.000Z", customFields: [{ id: "M4ZxemI7IYUXNbK2cMMx", value: "500" }] })!; // Sep 30, 7pm ET
    const b = toLead({ tags: ["facebook"], dateAdded: "2026-10-02T15:00:00.000Z" })!;
    expect(periodTotals([a, b], m.lastMonth, m.thisMonth)).toMatchObject({ total: 1, website: { total: 1, counts: { value: 500 } } });
    expect(periodTotals([a, b], m.thisMonth)).toMatchObject({ total: 1, website: { total: 0 } });
  });
  it("counts a real reply as contacted, not the automatic first text", () => {
    expect(humanTouch({ direction: "outbound", messageType: "TYPE_SMS", source: "workflow" })).toBe(false);
    expect(humanTouch({ direction: "outbound", messageType: "TYPE_ACTIVITY_OPPORTUNITY", source: "app" })).toBe(false);
    expect(humanTouch({ direction: "outbound", messageType: "TYPE_SMS", source: "app" })).toBe(true);
    expect(humanTouch({ direction: "inbound", messageType: "TYPE_CALL", meta: { call: { status: "completed" } } })).toBe(true);
    expect(humanTouch({ direction: "inbound", messageType: "TYPE_CALL", meta: { call: { status: "no-answer" } } })).toBe(false);
  });
});
