import { describe, expect, it } from "vitest";
import { feedAuthorized, toLead } from "./leadFeed";

const KEY = "k".repeat(40);

describe("lead feed for the client portal", () => {
  it("needs the portal's key, and is closed without one", () => {
    expect(feedAuthorized(`Bearer ${KEY}`, KEY)).toBe(true);
    expect(feedAuthorized(`Bearer ${"x".repeat(40)}`, KEY)).toBe(false);
    expect(feedAuthorized("Bearer ", "")).toBe(false);
  });
  it("turns a GHL contact into a lead without anything personal", () => {
    const l = toLead({ tags: ["website-quote", "ppf lead", "booked"], source: "Google", dateAdded: "2026-10-28T18:00:00.000Z", ...({ firstName: "Dana", phone: "+15555550100" } as object) });
    expect(l).toEqual({ kind: "form", source: "Google", service: "PPF", booked: true, at: "2026-10-28T18:00:00.000Z" });
    expect(JSON.stringify(l)).not.toMatch(/Dana|5555/);
  });
  it("labels calls and services, and drops spam", () => {
    expect(toLead({ tags: ["called lead", "tint lead"] })).toMatchObject({ kind: "call", service: "Tint" });
    expect(toLead({ tags: ["ceramic coating lead", "facebook"] })).toMatchObject({ kind: "lead", service: "Ceramic coating", source: "Facebook" });
    expect(toLead({ tags: ["spam likely"] })).toBeNull();
    expect(toLead({ tags: ["scam call", "called lead"] })).toBeNull();
  });
});
