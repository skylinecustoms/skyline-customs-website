import { describe, it, expect } from "vitest";
import { telegramSecretOk } from "./telegramWebhook";

// The Telegram webhook trusts nothing in the body (from.id is whatever the caller wrote): only Telegram's secret header.
describe("telegram webhook secret", () => {
  const secret = "s".repeat(40);
  it("refuses a missing or wrong header", () => {
    expect(telegramSecretOk(undefined, secret)).toBe(false);
    expect(telegramSecretOk("nope", secret)).toBe(false);
    expect(telegramSecretOk("s".repeat(39) + "x", secret)).toBe(false);
  });
  it("refuses everything when no secret is set (fails closed)", () => {
    expect(telegramSecretOk("", "")).toBe(false);
    expect(telegramSecretOk("short", "short")).toBe(false);
  });
  it("accepts the exact secret", () => {
    expect(telegramSecretOk(secret, secret)).toBe(true);
  });
});
