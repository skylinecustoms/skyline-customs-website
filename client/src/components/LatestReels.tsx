/**
 * LatestReels — the newest @skylinecustomshop reels straight from the live
 * Instagram feed (trpc.site.instagram), so a reel shows up on /videos within
 * an hour of being posted with no code change. Anything already curated in
 * lib/instagramPosts.ts (or replaced by its YouTube twin) is left out; the
 * daily video-sync routine moves each reel into its category, at which point
 * it drops out of this row. Renders nothing until the feed has loaded.
 */
import { useMemo } from "react";
import VideoCarousel from "@/components/VideoCarousel";
import { trpc } from "@/lib/trpc";
import { knownReelCodes, type InstagramReel } from "@/lib/instagramPosts";

const MAX = 8;
/** Only reels this recent qualify; anything older has been reviewed by the daily sync routine. */
const MAX_AGE_DAYS = 14;
/** Captions the site never repeats verbatim (prices, promos, coverage the shop does not sell) wait for the routine's review. */
const HOLD_FOR_REVIEW = /\$\s?\d|\d\s?%|full[- ]body|full[- ]vehicle|whole[- ]car|every panel|wrap|deal|giveaway|\bsale\b|hiring|discount|promo/i;

/** Short, clean title from a caption: first sentence or line, no hashtags, emoji, or handles. */
export function titleFromCaption(caption: string): string {
  const cleaned = caption
    .replace(/#\w+/g, " ")
    .replace(/@\w[\w.]*/g, " ")
    .replace(/[\uD800-\uDFFF\u2600-\u27BF\u2B00-\u2BFF\uFE0F\u200D]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const first = cleaned.split(/[.!?]\s|\s[|•]\s|\n/)[0]?.trim() ?? "";
  const t = first.replace(/[.\s]+$/, "");
  if (t.length < 4) return "New from the shop";
  return t.length > 64 ? `${t.slice(0, 61).replace(/\s+\S*$/, "")}…` : t;
}

export default function LatestReels() {
  const { data: feed } = trpc.site.instagram.useQuery(undefined, { staleTime: 30 * 60 * 1000, retry: false });
  const reels = useMemo<InstagramReel[]>(() => {
    const known = knownReelCodes();
    const cutoff = Date.now() - MAX_AGE_DAYS * 86_400_000;
    const out: InstagramReel[] = [];
    for (const p of feed?.posts ?? []) {
      if (p.mediaType !== "VIDEO" || !p.videoUrl || Date.parse(p.timestamp) < cutoff) continue;
      if (HOLD_FOR_REVIEW.test(p.caption)) continue;
      const m = p.permalink.match(/\/(reel|p)\/([^/]+)\//);
      if (!m || known.has(m[2])) continue;
      out.push({ code: m[2], type: m[1] as "reel" | "p", category: "work", title: titleFromCaption(p.caption) });
      if (out.length >= MAX) break;
    }
    return out;
  }, [feed]);

  if (reels.length === 0) return null;
  return (
    <section className="py-20 overflow-hidden bg-[#0A0A0A] border-b border-zinc-900">
      <div className="container">
        <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">Just Posted</p>
        <h2 className="font-['Bebas_Neue',sans-serif] text-4xl md:text-5xl text-white mb-3">LATEST FROM THE SHOP</h2>
        <p className="text-zinc-400 max-w-2xl mb-10">Our newest reels, straight from Instagram. Tap any card to watch with sound.</p>
        <VideoCarousel videos={[]} reels={reels} preview autoAdvanceMs={10_000} />
      </div>
    </section>
  );
}
