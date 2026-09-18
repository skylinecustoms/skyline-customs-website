/**
 * VideoCarousel — one horizontal carousel of YouTube Shorts and Instagram reels.
 *
 * Default mode: cards show the YouTube thumbnail and load the player on click.
 * Preview mode (`preview`): YouTube cards that are on screen autoplay muted and
 * loop, like a social feed; tapping a card opens the video in a popup with
 * sound, so the carousel can keep moving without disturbing the viewer.
 * Players are only mounted while visible, so off-screen cards cost nothing.
 * Instagram reels (`reels`) follow the YouTube cards; clicking one opens the
 * official Instagram embed in a dialog. The carousel loops (no end), and
 * `autoAdvanceMs` slides it forward on a timer, pausing while a reel dialog
 * is open or the tab is hidden.
 */

import React, { useEffect, useRef, useState } from "react";
import { Play, Volume2 } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { videoEmbedUrl, videoThumb, type Video } from "@/lib/videos";
import { ReelCard, ReelPlayer, useReelMedia } from "@/components/InstagramReels";
import { Instagram, Youtube, X } from "lucide-react";
import { reelUrl } from "@/lib/instagramPosts";
import type { InstagramReel } from "@/lib/instagramPosts";

const previewUrl = (id: string) =>
  `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&controls=0&playsinline=1&rel=0&modestbranding=1&enablejsapi=1` +
  (typeof window !== "undefined" ? `&origin=${encodeURIComponent(window.location.origin)}` : "");

function ClickToPlayCard({ video, onOpen }: { video: Video; onOpen: () => void }) {
  return (
    <div className="relative aspect-[9/16] bg-black overflow-hidden">
      <button type="button" onClick={onOpen} className="group absolute inset-0 w-full h-full text-left" aria-label={`Play video: ${video.title}`}>
        <img src={videoThumb(video.id)} alt={video.title} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover scale-[1.35] group-hover:scale-[1.4] transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="w-14 h-14 bg-[#E85D04] text-white flex items-center justify-center group-hover:scale-110 transition-transform">
            <Play className="w-6 h-6 ml-0.5" fill="currentColor" />
          </span>
        </span>
      </button>
    </div>
  );
}

function PreviewCard({ video, onOpen }: { video: Video; onOpen: () => void }) {
  const wrap = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  // Mount the player only while the card is near the viewport.
  useEffect(() => {
    const el = wrap.current;
    if (!el || typeof IntersectionObserver === "undefined") { setInView(true); return; }
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "200px 0px", threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrap} className="relative aspect-[9/16] bg-black overflow-hidden">
      {/* Thumbnail sits underneath so there is never a blank card while the player loads. */}
      <img src={videoThumb(video.id)} alt="" aria-hidden="true" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover scale-[1.35]" />
      {inView && (
        <iframe
          src={previewUrl(video.id)}
          title={video.title}
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        />
      )}
      {/* Click layer: YouTube's iframe swallows clicks, so this sits on top and opens the popup player. */}
      <button
        type="button"
        onClick={onOpen}
        className="absolute inset-0 w-full h-full text-left group"
        aria-label={`Watch with sound: ${video.title}`}
      >
        <span className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent" />
        <span className="absolute left-3 bottom-3 inline-flex items-center gap-1.5 bg-black/70 text-white text-xs font-semibold px-2.5 py-1.5 border border-white/20 group-hover:border-[#E85D04] transition-colors">
          <Volume2 className="w-3.5 h-3.5 text-[#E85D04]" /> Tap to watch
        </span>
      </button>
    </div>
  );
}

function VideoCard({ video, preview, onOpen }: { video: Video; preview: boolean; onOpen: () => void }) {
  return (
    <div className="bg-[#111] border border-zinc-800 hover:border-[#E85D04]/50 transition-colors h-full flex flex-col">
      {preview ? <PreviewCard video={video} onOpen={onOpen} /> : <ClickToPlayCard video={video} onOpen={onOpen} />}
      <div className="p-4">
        <h3 className="text-white font-semibold leading-snug">{video.title}</h3>
        <p className="text-zinc-400 text-sm mt-1 leading-relaxed">{video.blurb}</p>
      </div>
    </div>
  );
}

/** Branded frame around the popup player: orange border and glow, title bar with source badge, close button. */
function PlayerFrame({ source, title, href, onClose, children }: { source: "youtube" | "instagram"; title: string; href?: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="border-2 border-[#E85D04] bg-[#0A0A0A] shadow-[0_0_0_1px_rgba(0,0,0,0.6),0_0_60px_rgba(232,93,4,0.35)] overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-4 py-3 bg-[#E85D04]">
        <span className="inline-flex items-center gap-2 text-white text-xs font-bold tracking-[0.2em] uppercase">
          {source === "youtube" ? <Youtube className="w-4 h-4" /> : <Instagram className="w-4 h-4" />}
          {source === "youtube" ? "YouTube Short" : "Instagram Reel"}
        </span>
        <button type="button" onClick={onClose} aria-label="Close video" className="w-8 h-8 inline-flex items-center justify-center text-white hover:bg-black/20 transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="p-2 bg-[#0A0A0A]">
        <div className="border border-zinc-800 overflow-hidden">{children}</div>
      </div>
      <div className="px-4 pb-4 pt-1">
        <h3 className="text-white font-semibold leading-snug">{title}</h3>
        {href && (
          <a href={href} target="_blank" rel="noopener noreferrer" className="text-[#E85D04] text-xs font-bold tracking-widest uppercase hover:text-white mt-2 inline-block">
            {source === "youtube" ? "Open on YouTube" : "Open on Instagram"} →
          </a>
        )}
      </div>
    </div>
  );
}

export default function VideoCarousel({
  videos,
  reels = [],
  preview = false,
  autoAdvanceMs,
}: {
  videos: Video[];
  reels?: InstagramReel[];
  preview?: boolean;
  /** Slide forward every N ms (wraps to the start). Omit for manual only. */
  autoAdvanceMs?: number;
}) {
  const [api, setApi] = useState<CarouselApi>();
  const [open, setOpen] = useState<InstagramReel | null>(null);
  const [openVideo, setOpenVideo] = useState<Video | null>(null);
  const media = useReelMedia(reels.length > 0);

  useEffect(() => {
    if (!api || !autoAdvanceMs || open || openVideo) return;
    const t = setInterval(() => {
      if (document.hidden) return;
      api.scrollNext();
    }, autoAdvanceMs);
    return () => clearInterval(t);
  }, [api, autoAdvanceMs, open, openVideo]);

  if (videos.length === 0 && reels.length === 0) return null;
  const itemClass = "pl-4 basis-[78%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5";
  return (
    <>
      <Carousel opts={{ align: "start", loop: true }} setApi={setApi} className="relative">
        <CarouselContent className="-ml-4">
          {videos.map((v) => (
            <CarouselItem key={`yt-${v.id}`} className={itemClass}>
              <VideoCard video={v} preview={preview} onOpen={() => setOpenVideo(v)} />
            </CarouselItem>
          ))}
          {reels.map((r) => (
            <CarouselItem key={`ig-${r.code}`} className={itemClass}>
              <ReelCard reel={r} media={media.get(r.code)} onOpen={() => setOpen(r)} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex -left-4 bg-[#111] border-zinc-700 text-white hover:bg-[#E85D04] hover:text-white rounded-none" />
        <CarouselNext className="hidden md:flex -right-4 bg-[#111] border-zinc-700 text-white hover:bg-[#E85D04] hover:text-white rounded-none" />
      </Carousel>
      <Dialog open={!!openVideo || !!open} onOpenChange={(o) => { if (!o) { setOpenVideo(null); setOpen(null); } }}>
        <DialogContent showCloseButton={false} className="w-[min(440px,calc(100vw-2rem),calc((100vh-190px)*0.5625))] max-w-none p-0 bg-transparent border-0 shadow-none overflow-visible">
          <DialogTitle className="sr-only">{openVideo?.title ?? open?.title ?? "Video"}</DialogTitle>
          <PlayerFrame
            source={openVideo ? "youtube" : "instagram"}
            title={openVideo?.title ?? open?.title ?? ""}
            href={openVideo ? `https://www.youtube.com/shorts/${openVideo.id}` : open ? reelUrl(open) : undefined}
            onClose={() => { setOpenVideo(null); setOpen(null); }}
          >
            {openVideo && (
              <div className="aspect-[9/16] w-full bg-black">
                <iframe
                  src={videoEmbedUrl(openVideo.id)}
                  title={openVideo.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            )}
            {open && !openVideo && <ReelPlayer reel={open} media={media.get(open.code)} />}
          </PlayerFrame>
        </DialogContent>
      </Dialog>
    </>
  );
}
