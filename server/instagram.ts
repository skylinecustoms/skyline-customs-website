/**
 * Live Instagram feed for @skylinecustomshop via the Instagram Graph API.
 *
 * Accepts either kind of token in INSTAGRAM_ACCESS_TOKEN:
 *  - an Instagram-login user token (works against graph.instagram.com/me/media), or
 *  - a Facebook user/page token from the Graph API Explorer (resolved through
 *    /me/accounts -> instagram_business_account -> /media).
 *
 * Token upkeep, all optional:
 *  - INSTAGRAM_USER_ID (defaults to @skylinecustomshop's id) skips the Page lookup.
 *    When a lookup is needed, /me/accounts is tried first and then the Pages the
 *    token was explicitly granted (granular_scopes from /debug_token), because
 *    Pages managed through a business portfolio do not show up in /me/accounts.
 *  - INSTAGRAM_APP_ID + INSTAGRAM_APP_SECRET let the server exchange a short-lived
 *    Facebook token for a 60-day one at startup (fb_exchange_token) and refresh
 *    Instagram-login tokens (ig_refresh_token) once a day.
 *
 * Results are cached for an hour; on any error the last good feed is kept.
 * Returns null when no token is configured. The token itself is never returned.
 */
import { ENV } from "./_core/env";

export interface InstagramPost {
  id: string;
  permalink: string;
  caption: string;
  mediaType: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  mediaUrl: string;
  timestamp: string;
}
export interface InstagramFeed {
  username: string;
  posts: InstagramPost[];
  fetchedAt: number;
  /** Last error message, when the feed is stale or empty because of one. */
  error?: string;
  /** Non-secret shape of the configured token, to spot paste mistakes (only set with an error). */
  tokenHint?: { length: number; prefix: string; hasWhitespace: boolean };
}

const FB = "https://graph.facebook.com/v21.0";
const IG = "https://graph.instagram.com";
const FIELDS = "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp";
const TTL_MS = 60 * 60 * 1000;
const REFRESH_EVERY_MS = 24 * 60 * 60 * 1000;

let token = ENV.instagramAccessToken;
let tokenKind: "instagram" | "facebook" | null = null;
let igUserId = ENV.instagramUserId;
let lastRefreshAt = 0;
let exchanged = false;
let cache: { at: number; data: InstagramFeed | null } | null = null;
let inflight: Promise<InstagramFeed | null> | null = null;

type RawMedia = { id: string; caption?: string; media_type: InstagramPost["mediaType"]; media_url?: string; thumbnail_url?: string; permalink: string; timestamp: string };
type GraphError = { error?: { message?: string; code?: number; type?: string } };

async function graph<T>(url: string): Promise<T> {
  const res = await fetch(url);
  const body = (await res.json()) as T & GraphError;
  if (!res.ok || body.error) {
    const e = body.error ?? {};
    throw new Error(`${e.type ?? "GraphError"} ${e.code ?? res.status}: ${e.message ?? res.statusText}`);
  }
  return body;
}

function toPosts(items: RawMedia[]): InstagramPost[] {
  return items
    .filter((m) => m.permalink && (m.media_url || m.thumbnail_url))
    .map((m) => ({
      id: m.id,
      permalink: m.permalink,
      caption: (m.caption ?? "").replace(/\s+/g, " ").trim().slice(0, 220),
      mediaType: m.media_type,
      mediaUrl: (m.media_type === "VIDEO" ? m.thumbnail_url : m.media_url) ?? m.media_url ?? m.thumbnail_url ?? "",
      timestamp: m.timestamp,
    }));
}

/** Swap a short-lived Facebook user token for a 60-day one. Needs the app id + secret. */
async function exchangeFacebookToken() {
  if (exchanged || !ENV.instagramAppId || !ENV.instagramAppSecret) return;
  exchanged = true;
  try {
    const r = await graph<{ access_token: string; expires_in?: number }>(
      `${FB}/oauth/access_token?grant_type=fb_exchange_token&client_id=${encodeURIComponent(ENV.instagramAppId)}&client_secret=${encodeURIComponent(ENV.instagramAppSecret)}&fb_exchange_token=${encodeURIComponent(token)}`
    );
    if (r.access_token) {
      token = r.access_token;
      console.log(`[instagram] exchanged Facebook token for a long-lived one (expires in ~${Math.round((r.expires_in ?? 0) / 86400)} days)`);
    }
  } catch (err) {
    console.warn("[instagram] long-lived token exchange failed:", (err as Error).message);
  }
}

/** Instagram-login long-lived tokens can be refreshed once they are >24h old. */
async function refreshInstagramToken() {
  if (Date.now() - lastRefreshAt < REFRESH_EVERY_MS) return;
  lastRefreshAt = Date.now();
  try {
    const r = await graph<{ access_token: string; expires_in?: number }>(
      `${IG}/refresh_access_token?grant_type=ig_refresh_token&access_token=${encodeURIComponent(token)}`
    );
    if (r.access_token) {
      token = r.access_token;
      console.log(`[instagram] refreshed token (expires in ~${Math.round((r.expires_in ?? 0) / 86400)} days)`);
    }
  } catch (err) {
    // Short-lived tokens cannot be refreshed; not fatal.
    console.warn("[instagram] token refresh skipped:", (err as Error).message);
  }
}

async function fetchViaInstagramLogin(): Promise<InstagramFeed> {
  const me = await graph<{ id: string; username: string }>(`${IG}/me?fields=id,username&access_token=${encodeURIComponent(token)}`);
  const media = await graph<{ data: RawMedia[] }>(`${IG}/me/media?fields=${FIELDS}&limit=60&access_token=${encodeURIComponent(token)}`);
  return { username: me.username, posts: toPosts(media.data ?? []), fetchedAt: Date.now() };
}

async function fetchViaFacebook(): Promise<InstagramFeed> {
  await exchangeFacebookToken();
  let username = "";
  if (!igUserId) {
    const pages = await graph<{ data: { name: string; access_token?: string; instagram_business_account?: { id: string; username?: string } }[] }>(
      `${FB}/me/accounts?fields=name,access_token,instagram_business_account{id,username}&limit=50&access_token=${encodeURIComponent(token)}`
    );
    const candidates = [...(pages.data ?? [])];
    // Pages granted in the token dialog but managed via a business portfolio are
    // missing from /me/accounts; find them through the token's granular scopes.
    if (!candidates.some((p) => p.instagram_business_account?.id)) {
      const dbg = await graph<{ data?: { granular_scopes?: { scope: string; target_ids?: string[] }[] } }>(
        `${FB}/debug_token?input_token=${encodeURIComponent(token)}&access_token=${encodeURIComponent(token)}`
      ).catch(() => ({ data: undefined }));
      const ids = new Set((dbg.data?.granular_scopes ?? []).filter((g) => g.scope === "pages_show_list").flatMap((g) => g.target_ids ?? []));
      for (const id of Array.from(ids)) {
        const page = await graph<{ id: string; name: string; access_token?: string; instagram_business_account?: { id: string; username?: string } }>(
          `${FB}/${id}?fields=id,name,access_token,instagram_business_account%7Bid,username%7D&access_token=${encodeURIComponent(token)}`
        ).catch(() => null);
        if (page) candidates.push(page);
      }
    }
    const names = candidates.map((p) => p.name).join(", ") || "none";
    const withIg = candidates.find((p) => p.instagram_business_account?.id);
    if (!withIg) throw new Error(`None of the Facebook Pages this token can see (${names}) has a linked Instagram Business account. Link @skylinecustomshop to the Skyline Customs Page and regenerate the token with that Page selected.`);
    igUserId = withIg.instagram_business_account!.id;
    username = withIg.instagram_business_account!.username ?? "";
    // A Page token issued from a long-lived user token does not expire; prefer it.
    if (withIg.access_token) token = withIg.access_token;
    console.log(`[instagram] resolved Instagram Business account ${igUserId} (${username}) via Page "${withIg.name}"`);
  }
  const media = await graph<{ data: RawMedia[] }>(`${FB}/${igUserId}/media?fields=${FIELDS}&limit=60&access_token=${encodeURIComponent(token)}`);
  if (!username) {
    const acct = await graph<{ username?: string }>(`${FB}/${igUserId}?fields=username&access_token=${encodeURIComponent(token)}`).catch(() => ({ username: "" }));
    username = acct.username ?? "";
  }
  return { username, posts: toPosts(media.data ?? []), fetchedAt: Date.now() };
}

async function fetchFeed(): Promise<InstagramFeed> {
  // Instagram-login tokens start with "IG"; try that path first, then Facebook.
  const order: Array<"instagram" | "facebook"> =
    tokenKind ? [tokenKind] : token.startsWith("IG") ? ["instagram", "facebook"] : ["facebook", "instagram"];
  const errors: string[] = [];
  for (const kind of order) {
    try {
      const feed = kind === "instagram" ? await fetchViaInstagramLogin() : await fetchViaFacebook();
      if (tokenKind !== kind) console.log(`[instagram] feed loaded via ${kind} token: ${feed.posts.length} posts for @${feed.username}`);
      tokenKind = kind;
      if (kind === "instagram") void refreshInstagramToken();
      return feed;
    } catch (err) {
      errors.push(`[${kind}] ${(err as Error).message}`);
    }
  }
  throw new Error(errors.join(" || ") || "Instagram feed unavailable");
}

export async function getInstagramFeed(): Promise<InstagramFeed | null> {
  if (!token) return null;
  if (cache && Date.now() - cache.at < TTL_MS) return cache.data;
  if (inflight) return inflight;
  inflight = (async () => {
    try {
      const data = await fetchFeed();
      cache = { at: Date.now(), data };
      return data;
    } catch (err) {
      const message = (err as Error).message;
      console.warn("[instagram] fetch failed:", message);
      const stale = cache?.data;
      // Retry sooner after a failure (10 min) so a fixed token is picked up quickly.
      const raw = ENV.instagramAccessToken;
      const tokenHint = { length: raw.length, prefix: raw.slice(0, 4), hasWhitespace: /\s/.test(process.env.INSTAGRAM_ACCESS_TOKEN ?? "") };
      cache = { at: Date.now() - TTL_MS + 10 * 60 * 1000, data: stale ? { ...stale, error: message, tokenHint } : { username: "", posts: [], fetchedAt: Date.now(), error: message, tokenHint } };
      return cache.data;
    } finally {
      inflight = null;
    }
  })();
  return inflight;
}
