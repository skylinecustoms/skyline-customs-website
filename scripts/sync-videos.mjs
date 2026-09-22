#!/usr/bin/env node
/**
 * Find YouTube Shorts and Instagram reels that are not on the site yet, and
 * transcribe them so they can be categorised (customers / learn / work).
 *
 *   node scripts/sync-videos.mjs                # writes .sync/candidates.json and prints a summary
 *   node scripts/sync-videos.mjs --no-transcribe
 *   node scripts/sync-videos.mjs --max-age-days 45 --limit 10
 *
 * Sources
 *   YouTube: the channel's public RSS feed (latest 15 uploads, no API key).
 *   Instagram: the site's own feed endpoint (/api/trpc/site.instagram), which
 *   already resolves a playable mp4 for each reel.
 *
 * Transcription runs locally with Whisper (transformers.js) after extracting
 * audio with ffmpeg-static. Those tools are installed on demand into a temp
 * folder so they never become site dependencies. YouTube does not let this
 * environment download audio, so a Short's transcript comes from the reel it
 * was cross-posted from (matched by caption/title); otherwise only the title
 * and description are available.
 *
 * Already-listed videos (client/src/lib/videos.ts, client/src/lib/instagramPosts.ts)
 * and anything recorded in content/videoReview.json are skipped.
 */
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync, spawnSync } from "node:child_process";
import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const args = process.argv.slice(2);
const flag = (name, def) => { const i = args.indexOf(name); return i >= 0 ? args[i + 1] ?? true : def; };
const NO_TRANSCRIBE = args.includes("--no-transcribe");
const MAX_AGE_DAYS = Number(flag("--max-age-days", 60));
const LIMIT = Number(flag("--limit", 12));
const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID || "UCCUqkDi6-jfsRXGXp0VNv1A"; // @SkylineCustomsOfficial
const SITE = process.env.SITE_URL || "https://www.skylinecustomshop.com";
const OUT_DIR = path.join(ROOT, ".sync");
const TOOLS_DIR = process.env.SYNC_TOOLS_DIR || path.join(os.tmpdir(), "skyline-sync-tools");
const UA = "Mozilla/5.0 (compatible; SkylineCustomsSiteBot/1.0; +https://www.skylinecustomshop.com)";

const read = (p) => fs.readFileSync(path.join(ROOT, p), "utf8");
const norm = (s) => (s ?? "").toLowerCase().replace(/https?:\S+/g, " ").replace(/#\w+/g, " ").replace(/[^a-z0-9 ]+/g, " ").replace(/\s+/g, " ").trim();
const words = (s) => new Set(norm(s).split(" ").filter((w) => w.length > 2));
const similarity = (a, b) => { const A = words(a), B = words(b); if (!A.size || !B.size) return 0; let n = 0; for (const w of A) if (B.has(w)) n++; return n / Math.min(A.size, B.size); };

// ---------- what the site already has ----------
const videosTs = read("client/src/lib/videos.ts");
const reelsTs = read("client/src/lib/instagramPosts.ts");
const listedYouTube = new Set([...videosTs.matchAll(/id:\s*"([A-Za-z0-9_-]{11})"/g)].map((m) => m[1]));
const listedReels = new Set([...reelsTs.matchAll(/code:\s*"([A-Za-z0-9_-]+)"/g)].map((m) => m[1]));
const pairedReels = new Map([...reelsTs.matchAll(/([A-Za-z0-9_-]{8,})\s*->\s*YouTube\s+([A-Za-z0-9_-]{11})/g)].map((m) => [m[1], m[2]]));
const reviewPath = path.join(ROOT, "content/videoReview.json");
const review = fs.existsSync(reviewPath) ? JSON.parse(fs.readFileSync(reviewPath, "utf8")) : { skipYouTube: [], skipInstagram: [], pairs: {} };
for (const [ig, yt] of Object.entries(review.pairs ?? {})) pairedReels.set(ig, yt);

// ---------- sources ----------
async function youtubeFeed() {
  const xml = await (await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`, { headers: { "user-agent": UA } })).text();
  return [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].map((m) => {
    const e = m[1]; const g = (re) => (e.match(re) || [])[1] || "";
    const unesc = (s) => s.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'");
    return { source: "youtube", id: g(/<yt:videoId>([^<]+)/), title: unesc(g(/<media:title>([^<]*)/)), description: unesc(g(/<media:description>([\s\S]*?)<\/media:description>/)).trim(), published: g(/<published>([^<]+)/), url: `https://www.youtube.com/shorts/${g(/<yt:videoId>([^<]+)/)}` };
  }).filter((v) => v.id);
}
async function instagramFeed() {
  const url = `${SITE}/api/trpc/site.instagram?batch=1&input=${encodeURIComponent(JSON.stringify({ 0: { json: null } }))}`;
  const j = await (await fetch(url, { headers: { "user-agent": UA } })).json();
  const posts = j?.[0]?.result?.data?.json?.posts ?? [];
  return posts.filter((p) => p.mediaType === "VIDEO").map((p) => ({ source: "instagram", code: (p.permalink.match(/\/(?:reel|p)\/([^/]+)/) || [])[1], caption: p.caption ?? "", published: p.timestamp, videoUrl: p.videoUrl, permalink: p.permalink, mediaUrl: p.mediaUrl }));
}

// ---------- transcription tools (installed on demand, outside the repo) ----------
function ensureTools() {
  if (!fs.existsSync(path.join(TOOLS_DIR, "node_modules", "@xenova", "transformers"))) {
    fs.mkdirSync(TOOLS_DIR, { recursive: true });
    if (!fs.existsSync(path.join(TOOLS_DIR, "package.json"))) fs.writeFileSync(path.join(TOOLS_DIR, "package.json"), '{"name":"skyline-sync-tools","private":true}');
    console.error("[sync] installing ffmpeg-static + whisper into", TOOLS_DIR);
    execFileSync("npm", ["install", "--no-audit", "--no-fund", "--loglevel=error", "ffmpeg-static@5", "@xenova/transformers@2", "wavefile@11"], { cwd: TOOLS_DIR, stdio: "inherit" });
  }
  const req = createRequire(path.join(TOOLS_DIR, "package.json"));
  return { ffmpeg: req("ffmpeg-static"), wavefile: req("wavefile"), transformersUrl: pathToFileURL(path.join(TOOLS_DIR, "node_modules", "@xenova", "transformers", "src", "transformers.js")).href };
}
let asr = null, tools = null;
async function transcribeUrl(url, key) {
  tools ??= ensureTools();
  const mp4 = path.join(OUT_DIR, `${key}.mp4`), wav = path.join(OUT_DIR, `${key}.wav`);
  if (!fs.existsSync(mp4)) fs.writeFileSync(mp4, Buffer.from(await (await fetch(url, { headers: { "user-agent": UA } })).arrayBuffer()));
  const probe = spawnSync(tools.ffmpeg, ["-i", mp4], { encoding: "utf8" });
  const dm = (probe.stderr || "").match(/Duration: (\d+):(\d+):(\d+\.?\d*)/);
  const durationSec = dm ? Math.round(Number(dm[1]) * 3600 + Number(dm[2]) * 60 + Number(dm[3])) : undefined;
  execFileSync(tools.ffmpeg, ["-y", "-loglevel", "error", "-i", mp4, "-ac", "1", "-ar", "16000", "-t", "150", wav]);
  if (!asr) {
    const { pipeline, env } = await import(tools.transformersUrl);
    env.cacheDir = path.join(TOOLS_DIR, ".cache");
    asr = await pipeline("automatic-speech-recognition", "Xenova/whisper-tiny.en");
  }
  const wf = new tools.wavefile.WaveFile(fs.readFileSync(wav)); wf.toBitDepth("32f"); wf.toSampleRate(16000);
  let d = wf.getSamples(); if (Array.isArray(d)) d = d[0];
  const out = await asr(d, { chunk_length_s: 30, stride_length_s: 5 });
  fs.rmSync(wav, { force: true }); fs.rmSync(mp4, { force: true });
  return { transcript: out.text.replace(/\s+/g, " ").trim(), durationSec };
}

// ---------- main ----------
fs.mkdirSync(OUT_DIR, { recursive: true });
const cutoff = Date.now() - MAX_AGE_DAYS * 86400e3;
const [yt, ig] = await Promise.all([youtubeFeed(), instagramFeed()]);
const newYt = yt.filter((v) => !listedYouTube.has(v.id) && !review.skipYouTube?.includes(v.id) && Date.parse(v.published) > cutoff).slice(0, LIMIT);
const newIg = ig.filter((r) => r.code && !listedReels.has(r.code) && !pairedReels.has(r.code) && !review.skipInstagram?.includes(r.code) && Date.parse(r.published) > cutoff).slice(0, LIMIT);
console.error(`[sync] youtube feed ${yt.length} (new ${newYt.length}) | instagram feed ${ig.length} videos (new ${newIg.length})`);

const candidates = [];
for (const r of newIg) {
  const c = { source: "instagram", code: r.code, permalink: r.permalink, caption: r.caption, published: r.published, hasVideo: !!r.videoUrl, transcript: "", transcriptSource: "none", durationSec: undefined };
  if (!NO_TRANSCRIBE && r.videoUrl) {
    try { const t = await transcribeUrl(r.videoUrl, `ig-${r.code}`); c.transcript = t.transcript; c.durationSec = t.durationSec; c.transcriptSource = "whisper"; } catch (e) { c.transcriptError = String(e.message || e).slice(0, 200); }
  }
  candidates.push(c);
}
for (const v of newYt) {
  const c = { source: "youtube", id: v.id, url: v.url, title: v.title, description: v.description, published: v.published, transcript: "", transcriptSource: "none", likelyReel: undefined };
  // A Short is usually the same video as a reel posted within a few days: reuse that transcript.
  let best = null, bestScore = 0;
  for (const r of ig) { const s = Math.max(similarity(v.title, r.caption), similarity(v.description, r.caption)); const days = Math.abs(Date.parse(v.published) - Date.parse(r.published)) / 86400e3; if (s > bestScore && s >= 0.5 && days <= 21) { best = r; bestScore = s; } }
  if (best) {
    c.likelyReel = best.code; c.likelyReelScore = Number(bestScore.toFixed(2));
    const done = candidates.find((x) => x.source === "instagram" && x.code === best.code);
    if (done?.transcript) { c.transcript = done.transcript; c.durationSec = done.durationSec; c.transcriptSource = `whisper via reel ${best.code}`; }
    else if (!NO_TRANSCRIBE && best.videoUrl) { try { const t = await transcribeUrl(best.videoUrl, `ig-${best.code}`); c.transcript = t.transcript; c.durationSec = t.durationSec; c.transcriptSource = `whisper via reel ${best.code}`; } catch (e) { c.transcriptError = String(e.message || e).slice(0, 200); } }
  }
  if (!best) {
    c.nearbyReels = ig.filter((r) => Math.abs(Date.parse(v.published) - Date.parse(r.published)) <= 3 * 86400e3).map((r) => ({ code: r.code, listed: listedReels.has(r.code) || pairedReels.has(r.code), caption: r.caption.slice(0, 120).replace(/\n/g, " ") }));
  }
  candidates.push(c);
}

const meta = {};
for (const c of candidates) if (c.source === "youtube") meta[c.id] = { uploadDate: c.published.slice(0, 10), ...(c.durationSec ? { duration: `PT${c.durationSec}S` } : {}) };
fs.writeFileSync(path.join(OUT_DIR, "candidates.json"), JSON.stringify({ generatedAt: new Date().toISOString(), candidates, youtubeMeta: meta }, null, 2));

for (const c of candidates) {
  const head = c.source === "youtube" ? `YOUTUBE ${c.id}  "${c.title}"` : `INSTAGRAM ${c.code}  "${c.caption.slice(0, 90).replace(/\n/g, " ")}"`;
  console.log(`\n${head}\n  published ${c.published.slice(0, 10)}${c.durationSec ? ` · ${c.durationSec}s` : ""}${c.likelyReel ? ` · same video as reel ${c.likelyReel} (${c.likelyReelScore})` : ""}${c.nearbyReels?.length ? `\n  reels posted within 3 days (check for the same video): ${c.nearbyReels.map((r) => `${r.code}${r.listed ? " [listed]" : ""} "${r.caption.slice(0, 60)}"`).join(" | ")}` : ""}\n  transcript (${c.transcriptSource}): ${c.transcript ? c.transcript.slice(0, 400) : "(none)"}${c.transcriptError ? `\n  transcript error: ${c.transcriptError}` : ""}`);
}
console.log(`\n[sync] ${candidates.length} candidate(s) written to .sync/candidates.json`);
