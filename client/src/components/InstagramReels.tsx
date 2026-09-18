/**
 * Instagram reel pieces used inside VideoCarousel.
 * - ReelCard: autoplays the reel muted and looping while on screen (direct MP4
 *   from the live feed via trpc.site.instagram), exactly like the YouTube
 *   preview cards; tapping opens the popup player with sound.
 * - ReelPlayer: the popup player (direct MP4 with controls, sound on).
 * Reels with no playable file (feed not loaded, or Instagram and the Facebook
 * Page both withhold it) are not rendered at all, so nothing on the site ever
 * sends a visitor off to Instagram to watch.
 * Curated reels live in lib/instagramPosts.ts.
 */
import { useEffect, useMemo, useRef, useState } from "react";
import { Instagram, Volume2 } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { reelUrl, type InstagramReel } from "@/lib/instagramPosts";
import { INSTAGRAM_HANDLE } from "@/lib/social";

export interface ReelMedia { thumb?: string; video?: string }

/** Reel shortcode -> thumbnail + direct video URL from the live Instagram feed. */
export function useReelMedia(enabled: boolean) {
  const { data: feed } = trpc.site.instagram.useQuery(undefined, { staleTime: 30 * 60 * 1000, retry: false, enabled });
  return useMemo(() => {
    const map = new Map<string, ReelMedia>();
    for (const p of feed?.posts ?? []) {
      const m = p.permalink.match(/\/(?:reel|p)\/([^/]+)\//);
      if (m) map.set(m[1], { thumb: p.mediaUrl || undefined, video: p.videoUrl || undefined });
    }
    return map;
  }, [feed]);
}

/** Popup player body for a reel (the frame/title bar is drawn by VideoCarousel). */
export function ReelPlayer({ media }: { media?: ReelMedia }) {
  if (!media?.video) return null;
  return (
    <div className="aspect-[9/16] w-full bg-black">
      <video
        src={media.video}
        poster={media.thumb}
        controls
        autoPlay
        playsInline
        preload="metadata"
        className="w-full h-full object-contain bg-black"
      />
    </div>
  );
}

export function ReelCard({ reel, media, onOpen }: { reel: InstagramReel; media?: ReelMedia; onOpen: () => void }) {
  const wrap = useRef<HTMLDivElement>(null);
  const vid = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(false);

  // Mount the video only while the card is near the viewport (same rule as the YouTube preview cards).
  useEffect(() => {
    const el = wrap.current;
    if (!el || typeof IntersectionObserver === "undefined") { setInView(true); return; }
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin: "200px 0px", threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Kick off muted playback as soon as the element exists (autoplay attribute alone is ignored by some browsers).
  useEffect(() => {
    if (inView && vid.current) vid.current.play().catch(() => {});
  }, [inView, media?.video]);

  return (
    <div className="bg-[#111] border border-zinc-800 hover:border-[#E85D04]/50 transition-colors h-full flex flex-col">
      <div ref={wrap} className="relative aspect-[9/16] bg-black overflow-hidden">
        {media?.thumb ? (
          <img src={media.thumb} alt="" aria-hidden="true" loading="lazy" decoding="async" referrerPolicy="no-referrer" className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a0a00] via-[#111] to-[#0A0A0A]" />
        )}
        {inView && media?.video && (
          <video
            ref={vid}
            src={media.video}
            poster={media.thumb}
            muted
            autoPlay
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <button type="button" onClick={onOpen} className="group absolute inset-0 w-full h-full text-left" aria-label={`Watch with sound: ${reel.title}`}>
          <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 bg-black/70 text-white text-[11px] font-semibold px-2 py-1 border border-white/20">
            <Instagram className="w-3.5 h-3.5 text-[#E85D04]" /> Reel
          </span>
          <span className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent" />
          <span className="absolute left-3 bottom-3 inline-flex items-center gap-1.5 bg-black/70 text-white text-xs font-semibold px-2.5 py-1.5 border border-white/20 group-hover:border-[#E85D04] transition-colors">
            <Volume2 className="w-3.5 h-3.5 text-[#E85D04]" /> Tap to watch
          </span>
        </button>
      </div>
      <div className="p-4">
        <h3 className="text-white font-semibold leading-snug">{reel.title}</h3>
        <p className="text-zinc-400 text-xs mt-1">From @{INSTAGRAM_HANDLE}</p>
      </div>
    </div>
  );
}
