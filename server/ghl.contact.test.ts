import { describe, expect, it } from "vitest";

const GHL_API_KEY = process.env.GHL_API_KEY ?? "";
const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID ?? "";

describe("GHL Contacts API credentials", () => {
  it("should have GHL_API_KEY and GHL_LOCATION_ID set", () => {
    expect(GHL_API_KEY.length).toBeGreaterThan(0);
    expect(GHL_LOCATION_ID.length).toBeGreaterThan(0);
  });

  it("should successfully reach the GHL contacts API with the provided key", async () => {
    // Use a GET to the contacts list endpoint (read-only, no side effects)
    const response = await fetch(
      `https://services.leadconnectorhq.com/contacts/?locationId=${GHL_LOCATION_ID}&limit=1`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${GHL_API_KEY}`,
          Version: "2021-07-28",
        },
      }
    );

    // 200 = valid key, 401/403 = invalid key
    expect(response.status).toBe(200);
  }, 15000);
});
