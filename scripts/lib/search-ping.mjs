/**
 * Tell search engines about new or changed URLs.
 *
 *  - IndexNow (Bing, DuckDuckGo, Yandex, Naver, Seznam): always on; the key file
 *    is served at /<KEY>.txt.
 *  - Google Indexing API: on when GOOGLE_INDEXING_SA_JSON holds a service-account
 *    JSON key whose client_email is an Owner of the site in Google Search Console.
 *    Google documents the API for job and livestream pages; in practice it also
 *    gets ordinary pages crawled quickly, and it never hurts the sitemap route.
 *
 * Used by scripts/seed-content.mjs at deploy time and by scripts/notify-search.mjs by hand.
 */
import { createSign } from "node:crypto";

export const HOST = "www.skylinecustomshop.com";
export const INDEXNOW_KEY = "38576f4b734896647704c96e87d44956";

export const absolute = (p) => (p.startsWith("http") ? p : `https://${HOST}${p.startsWith("/") ? "" : "/"}${p}`);

export async function pingIndexNow(urls) {
  const urlList = [...new Set(urls.map(absolute))];
  if (urlList.length === 0) return { status: 0, count: 0 };
  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host: HOST, key: INDEXNOW_KEY, keyLocation: `https://${HOST}/${INDEXNOW_KEY}.txt`, urlList }),
  });
  return { status: res.status, count: urlList.length };
}

export const googleIndexingConfigured = () => Boolean((process.env.GOOGLE_INDEXING_SA_JSON ?? "").trim());

function b64url(input) {
  return Buffer.from(input).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

/** OAuth2 access token for the service account (JWT bearer grant, no SDK). */
async function googleAccessToken(sa) {
  const now = Math.floor(Date.now() / 1000);
  const header = b64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claims = b64url(JSON.stringify({ iss: sa.client_email, scope: "https://www.googleapis.com/auth/indexing", aud: "https://oauth2.googleapis.com/token", iat: now, exp: now + 3600 }));
  const signer = createSign("RSA-SHA256");
  signer.update(`${header}.${claims}`);
  const sig = signer.sign(sa.private_key, "base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=${encodeURIComponent("urn:ietf:params:oauth:grant-type:jwt-bearer")}&assertion=${header}.${claims}.${sig}`,
  });
  const json = await res.json();
  if (!res.ok || !json.access_token) throw new Error(`Google token: ${res.status} ${json.error_description ?? json.error ?? ""}`);
  return json.access_token;
}

/**
 * Reads the service-account key from GOOGLE_INDEXING_SA_JSON. Accepts the JSON
 * as downloaded, pretty-printed, wrapped in quotes, with escaped quotes, base64
 * encoded, or with the \n inside the private key turned into real newlines by
 * whatever pasted it. Only client_email and private_key are needed.
 */
export function parseServiceAccount(raw) {
  let text = String(raw ?? "").trim();
  if (!text) return null;
  if (!text.includes("{") && /^[A-Za-z0-9+/=\s]+$/.test(text)) {
    try { text = Buffer.from(text, "base64").toString("utf8").trim(); } catch { /* not base64 */ }
  }
  if ((text.startsWith("'") && text.endsWith("'")) || (text.startsWith('"') && text.endsWith('"'))) text = text.slice(1, -1).trim();
  for (const candidate of [text, text.replace(/\\"/g, '"')]) {
    try {
      const j = JSON.parse(candidate);
      if (j && j.client_email && j.private_key) return { client_email: j.client_email, private_key: j.private_key };
    } catch { /* try the next form */ }
  }
  // Last resort: pull the two fields out of whatever shape the text is in.
  const email = text.match(/[a-z0-9-]+@[a-z0-9-]+\.iam\.gserviceaccount\.com/i)?.[0];
  const body = text.match(/-----BEGIN PRIVATE KEY-----([\s\S]*?)-----END PRIVATE KEY-----/)?.[1];
  if (!email || !body) return null;
  const b64 = body.replace(/\\n/g, "").replace(/\s+/g, "");
  const pem = `-----BEGIN PRIVATE KEY-----\n${b64.match(/.{1,64}/g).join("\n")}\n-----END PRIVATE KEY-----\n`;
  return { client_email: email, private_key: pem };
}

/** Publishes URL_UPDATED notifications. Returns per-URL HTTP statuses. */
export async function pingGoogleIndexing(urls) {
  const raw = (process.env.GOOGLE_INDEXING_SA_JSON ?? "").trim();
  if (!raw) return null;
  const sa = parseServiceAccount(raw);
  if (!sa) throw new Error("GOOGLE_INDEXING_SA_JSON could not be read: it needs the client_email and the private_key from the downloaded key file");
  const token = await googleAccessToken(sa);
  const out = [];
  for (const u of [...new Set(urls.map(absolute))]) {
    const res = await fetch("https://indexing.googleapis.com/v3/urlNotifications:publish", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ url: u, type: "URL_UPDATED" }),
    });
    let detail = "";
    if (!res.ok) { try { detail = (await res.json()).error?.message ?? ""; } catch { /* ignore */ } }
    out.push({ url: u, status: res.status, detail });
  }
  return out;
}

/** Both engines in one call; never throws, logs what happened. */
export async function notifySearchEngines(urls, log = console.log) {
  const list = [...new Set(urls.map(absolute))];
  if (list.length === 0) return;
  try {
    const r = await pingIndexNow(list);
    log(`[search] IndexNow: HTTP ${r.status} for ${r.count} url(s)`);
  } catch (err) { log(`[search] IndexNow failed: ${err.message}`); }
  if (!googleIndexingConfigured()) { log("[search] Google Indexing API: GOOGLE_INDEXING_SA_JSON not set, skipped"); return; }
  try {
    const results = await pingGoogleIndexing(list);
    for (const r of results ?? []) log(`[search] Google: HTTP ${r.status} ${r.url}${r.detail ? ` (${r.detail})` : ""}`);
  } catch (err) { log(`[search] Google Indexing API failed: ${err.message}`); }
}
