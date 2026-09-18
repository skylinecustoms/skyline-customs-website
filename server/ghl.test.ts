import { describe, it, expect } from "vitest";
import dotenv from "dotenv";
dotenv.config();

const GHL_API_KEY = process.env.GHL_API_KEY ?? "";
const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID ?? "";
const BASE_URL = "https://services.leadconnectorhq.com";

describe("GHL API credentials", () => {
  it("should authenticate and reach the contacts endpoint", async () => {
    expect(GHL_API_KEY).toBeTruthy();
    expect(GHL_LOCATION_ID).toBeTruthy();

    const res = await fetch(
      `${BASE_URL}/contacts/?locationId=${GHL_LOCATION_ID}&limit=1`,
      {
        headers: {
          Authorization: `Bearer ${GHL_API_KEY}`,
          Version: "2021-07-28",
          "Content-Type": "application/json",
        },
      }
    );

    expect(res.status).toBe(200);
    const data = (await res.json()) as { contacts?: unknown[] };
    expect(data).toHaveProperty("contacts");
  });
});
