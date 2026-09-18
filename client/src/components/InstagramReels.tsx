/**
 * Carousel of curated @skylinecustomshop reels for one category (see
 * lib/instagramPosts.ts). Cards show the reel thumbnail from the live feed
 * (trpc.site.instagram) with an Instagram badge; clicking opens the official
 * Instagram embed in a dialog, so likes, comments and the follow button all work.
 */
import { useEffect, useMemo, useState } from "react";
import { Instagram, Play } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { trpc } from "@/lib/trpc";
import { reelsByCategory, reelUrl, type InstagramReel } from "@/lib/instagramPosts";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from "@/lib/social";
import type { VideoCategory } from "@/lib/videos";

declare global {
  interface Window { instgrm?: { Embeds: { process: () => void } } }
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
    // embed.js may already be loaded; process again once the blockquote is mounted.
    const t = setTimeout(() => window.instgrm?.Embeds.process(), 50);
    return () => clearTimeout(t);
  }, [url]);
  return (
    <blockquote className="instagram-media !m-0 !min-w-0 !w-full !bg-[#111] !border-0" data-instgrm-permalink={url} data-instgrm-version="14">
      <a href={url} target="_blank" rel="noopener noreferrer" className="block p-6 text-zinc-400 text-sm">Open this reel on Instagram</a>
    </blockquote>
  );
}

function ReelCard({ reel, thumb, onOpen }: { reel: InstagramReel; thumb?: string; onOpen: () => void }) {
  return (
    <div className="bg-[#111] border border-zinc-800 hover:border-[#E85D04]/50 transition-colors h-full flex flex-col">
      <button type="button" onClick={onOpen} className="group relative aspect-[9/16] bg-black overflow-hidden text-left w-full" aria-label={`Watch on Instagram: ${reel.title}`}>
        {thumb ? (
          <img src={thumb} alt="" aria-hidden="true" loading="lazy" decoding="async" referrerPolicy="no-referrer" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a0a00] via-[#111] to-[#0A0A0A]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
        <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 bg-black/70 text-white text-[11px] font-semibold px-2 py-1 border border-white/20">
          <Instagram className="w-3.5 h-3.5 text-[#E85D04]" /> Reel
        </span>
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="w-14 h-14 bg-[#E85D04] text-white flex items-center justify-center group-hover:scale-110 transition-transform">
            <Play className="w-6 h-6 ml-0.5" fill="currentColor" />
          </span>
        </span>
      </button>
      <div className="p-4">
        <h3 className="text-white font-semibold leading-snug">{reel.title}</h3>
        <a href={reelUrl(reel)} target="_blank" rel="noopener noreferrer" className="text-zinc-400 text-xs mt-1 inline-block hover:text-[#E85D04]">@{INSTAGRAM_HANDLE} on Instagram</a>
      </div>
    </div>
  );
}

export default function InstagramReels({ category, heading = "On Instagram" }: { category: VideoCategory; heading?: string }) {
  const reels = reelsByCategory(category);
  const { data: feed } = trpc.site.instagram.useQuery(undefined, { staleTime: 30 * 60 * 1000, retry: false });
  const [open, setOpen] = useState<InstagramReel | null>(null);
  const thumbs = useMemo(() => {
    const map = new Map<string, string>();
    for (const p of feed?.posts ?? []) {
      const m = p.permalink.match(/\/(?:reel|p)\/([^/]+)\//);
      if (m && p.mediaUrl) map.set(m[1], p.mediaUrl);
    }
    return map;
  }, [feed]);
  if (reels.length === 0) return null;

  return (
    <div className="mt-10">
      <div className="flex items-center justify-between gap-4 mb-4">
        <p className="text-zinc-400 text-xs font-bold tracking-[0.3em] uppercase inline-flex items-center gap-2"><Instagram className="w-4 h-4 text-[#E85D04]" /> {heading}</p>
        <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="text-[#E85D04] text-xs font-bold tracking-widest uppercase hover:text-white">Follow @{INSTAGRAM_HANDLE}</a>
      </div>
      <Carousel opts={{ align: "start", loop: false }} className="relative">
        <CarouselContent className="-ml-4">
          {reels.map((r) => (
            <CarouselItem key={r.code} className="pl-4 basis-[78%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
              <ReelCard reel={r} thumb={thumbs.get(r.code)} onOpen={() => setOpen(r)} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex -left-4 bg-[#111] border-zinc-700 text-white hover:bg-[#E85D04] hover:text-white rounded-none" />
        <CarouselNext className="hidden md:flex -right-4 bg-[#111] border-zinc-700 text-white hover:bg-[#E85D04] hover:text-white rounded-none" />
      </Carousel>
      <Dialog open={!!open} onOpenChange={(o) => { if (!o) setOpen(null); }}>
        <DialogContent className="max-w-[420px] p-0 bg-[#111] border-zinc-800 max-h-[90vh] overflow-y-auto">
          <DialogTitle className="sr-only">{open?.title ?? "Instagram reel"}</DialogTitle>
          {open && <ReelEmbed reel={open} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}
