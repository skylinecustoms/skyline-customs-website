import { describe, expect, it } from "vitest";
import { applyLive, activeSpecial, upcomingClosure, getLive, hoursLine, hoursSchema } from "@shared/live";

describe("instant edits from the portal", () => {
  it("the special shows until its end date (Eastern)", () => {
    applyLive({ special: { text: "15% off tint", until: "2026-11-30" } });
    expect(activeSpecial(new Date("2026-11-30T23:00:00-05:00"))?.text).toBe("15% off tint");
    expect(activeSpecial(new Date("2026-12-01T09:00:00-05:00"))).toBeNull();
  });
  it("a closure shows from a week before until it ends", () => {
    applyLive({ closures: [{ from: "2026-11-26", to: "2026-11-27", note: "Closed for Thanksgiving" }] });
    expect(upcomingClosure(new Date("2026-11-18T12:00:00-05:00"))).toBeNull();
    expect(upcomingClosure(new Date("2026-11-20T12:00:00-05:00"))?.note).toBe("Closed for Thanksgiving");
    expect(upcomingClosure(new Date("2026-11-28T12:00:00-05:00"))).toBeNull();
  });
  it("hours read like the footer and go into the schema", () => {
    const h = { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] as const, opens: "08:00", closes: "17:30", other: [{ days: ["Saturday"] as const, opens: "10:00", closes: "14:00" }] };
    applyLive({ hours: h as never });
    expect(hoursLine(getLive().hours!)).toBe("Mon–Fri: 8AM – 5:30PM · Sat: 10AM – 2PM");
    expect(hoursSchema(getLive().hours!)[1]).toMatchObject({ dayOfWeek: ["Saturday"], opens: "10:00" });
  });
});
