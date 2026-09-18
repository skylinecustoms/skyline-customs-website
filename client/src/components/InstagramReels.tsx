/**
 * Instagram reel pieces used inside VideoCarousel.
 * - ReelCard: autoplays the reel muted and looping while on screen (direct MP4
 *   from the live feed via trpc.site.instagram), exactly like the YouTube
 *   preview cards; tapping opens the popup player with sound.
 * - ReelPlayer: the popup player (direct MP4 with controls). Falls back to the
 *   official Instagram embed when the feed has no video URL for the reel.
 * Curated reels live in lib/instagramPosts.ts.
 */
import { useEffect, useMemo, useRef, useState } from "react";
import { Instagram, Play, Volume2 } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { reelUrl, type InstagramReel } from "@/lib/instagramPosts";
import { INSTAGRAM_HANDLE } from "@/lib/social";

declare global {
  interface Window { instgrm?: { Embeds: { process: () => void } } }
}

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

function loadEmbedScript() {
  if (typeof document === "undefined") return;
  if (document.querySelector('script[src="https://www.instagram.com/embed.js"]')) {
    window.instgrm?.Embeds.process();
    return;
  }
  const s = document.createElement("script");
  s.src = "https://www.instagram.com/embed.js";
  s.async = true;
  document.body.appendChild(s);
}

function ReelEmbed({ reel }: { reel: InstagramReel }) {
  const url = reelUrl(reel);
  useEffect(() => {
    loadEmbedScript();
    const t = setTimeout(() => window.instgrm?.Embeds.process(), 50);
    return () => clearTimeout(t);
  }, [url]);
  return (
    <blockquote className="instagram-media !m-0 !min-w-0 !w-full !bg-[#111] !border-0" data-instgrm-permalink={url} data-instgrm-version="14">
      <a href={url} target="_blank" rel="noopener noreferrer" className="block p-6 text-zinc-400 text-sm">Open this reel on Instagram</a>
    </blockquote>
  );
}

/** Popup player body for a reel (the frame/title bar is drawn by VideoCarousel). */
export function ReelPlayer({ reel, media }: { reel: InstagramReel; media?: ReelMedia }) {
  if (!media?.video) return <ReelEmbed reel={reel} />;
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
          {!media?.video && (
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="w-14 h-14 bg-[#E85D04] text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="w-6 h-6 ml-0.5" fill="currentColor" />
              </span>
            </span>
          )}
          <span className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent" />
          <span className="absolute left-3 bottom-3 inline-flex items-center gap-1.5 bg-black/70 text-white text-xs font-semibold px-2.5 py-1.5 border border-white/20 group-hover:border-[#E85D04] transition-colors">
            <Volume2 className="w-3.5 h-3.5 text-[#E85D04]" /> Tap to watch
          </span>
        </button>
      </div>
      <div className="p-4">
        <h3 className="text-white font-semibold leading-snug">{reel.title}</h3>
        <a href={reelUrl(reel)} target="_blank" rel="noopener noreferrer" className="text-zinc-400 text-xs mt-1 inline-block hover:text-[#E85D04]">@{INSTAGRAM_HANDLE} on Instagram</a>
      </div>
    </div>
  );
}
