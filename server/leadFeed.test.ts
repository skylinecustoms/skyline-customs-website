import { describe, expect, it } from "vitest";
import { feedAuthorized, toLead } from "./leadFeed";

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
});
