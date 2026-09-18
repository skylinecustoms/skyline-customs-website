/**
 * VideoCarousel — one horizontal carousel of YouTube Shorts and Instagram reels.
 *
 * Default mode: cards show the YouTube thumbnail and load the player on click.
 * Preview mode (`preview`): YouTube cards that are on screen autoplay muted and
 * loop, like a social feed; tapping a card turns the sound on. Players are only
 * mounted while visible, so off-screen cards cost nothing.
 * Instagram reels (`reels`) follow the YouTube cards; clicking one opens the
 * official Instagram embed in a dialog. The carousel loops (no end), and
 * `autoAdvanceMs` slides it forward on a timer, pausing while a reel dialog
 * is open or the tab is hidden.
 */

import { useEffect, useRef, useState } from "react";
import { Play, Volume2, VolumeX } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { videoEmbedUrl, videoThumb, type Video } from "@/lib/videos";
import { ReelCard, ReelEmbed, useReelThumbs } from "@/components/InstagramReels";
import type { InstagramReel } from "@/lib/instagramPosts";

const previewUrl = (id: string) =>
  `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&controls=0&playsinline=1&rel=0&modestbranding=1&enablejsapi=1` +
  (typeof window !== "undefined" ? `&origin=${encodeURIComponent(window.location.origin)}` : "");

/** Send a command to an embedded YouTube player (works without loading the IFrame API script). */
function command(frame: HTMLIFrameElement | null, func: string) {
  frame?.contentWindow?.postMessage(JSON.stringify({ event: "command", func, args: [] }), "*");
}

function ClickToPlayCard({ video }: { video: Video }) {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="relative aspect-[9/16] bg-black overflow-hidden">
      {playing ? (
        <iframe
          src={videoEmbedUrl(video.id)}
          title={video.title}
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <button type="button" onClick={() => setPlaying(true)} className="group absolute inset-0 w-full h-full text-left" aria-label={`Play video: ${video.title}`}>
          <img src={videoThumb(video.id)} alt={video.title} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover scale-[1.35] group-hover:scale-[1.4] transition-transform duration-500" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="w-14 h-14 bg-[#E85D04] text-white flex items-center justify-center group-hover:scale-110 transition-transform">
              <Play className="w-6 h-6 ml-0.5" fill="currentColor" />
            </span>
          </span>
        </button>
      )}
    </div>
  );
}

function PreviewCard({ video }: { video: Video }) {
  const wrap = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLIFrameElement>(null);
  const [inView, setInView] = useState(false);
  const [sound, setSound] = useState(false);

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

  // Leaving the viewport mutes and unmounts, so sound never keeps playing off screen.
  useEffect(() => { if (!inView) setSound(false); }, [inView]);

  const toggleSound = () => {
    const next = !sound;
    setSound(next);
    command(frame.current, next ? "unMute" : "mute");
    command(frame.current, "playVideo");
  };

  return (
    <div ref={wrap} className="relative aspect-[9/16] bg-black overflow-hidden">
      {/* Thumbnail sits underneath so there is never a blank card while the player loads. */}
      <img src={videoThumb(video.id)} alt="" aria-hidden="true" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover scale-[1.35]" />
      {inView && (
        <iframe
          ref={frame}
          src={previewUrl(video.id)}
          title={video.title}
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        />
      )}
      {/* Click layer: YouTube's iframe swallows clicks, so this sits on top. */}
      <button
        type="button"
        onClick={toggleSound}
        className="absolute inset-0 w-full h-full text-left group"
        aria-label={sound ? `Sound on: ${video.title}` : `Tap for sound: ${video.title}`}
      >
        <span className={`absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent transition-opacity ${sound ? "opacity-60" : "opacity-100"}`} />
        <span className="absolute left-3 bottom-3 inline-flex items-center gap-1.5 bg-black/70 text-white text-xs font-semibold px-2.5 py-1.5 border border-white/20 group-hover:border-[#E85D04] transition-colors">
          {sound ? <Volume2 className="w-3.5 h-3.5 text-[#E85D04]" /> : <VolumeX className="w-3.5 h-3.5" />}
          {sound ? "Sound on" : "Tap for sound"}
        </span>
      </button>
    </div>
  );
}

function VideoCard({ video, preview }: { video: Video; preview: boolean }) {
  return (
    <div className="bg-[#111] border border-zinc-800 hover:border-[#E85D04]/50 transition-colors h-full flex flex-col">
      {preview ? <PreviewCard video={video} /> : <ClickToPlayCard video={video} />}
      <div className="p-4">
        <h3 className="text-white font-semibold leading-snug">{video.title}</h3>
        <p className="text-zinc-400 text-sm mt-1 leading-relaxed">{video.blurb}</p>
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
  const thumbs = useReelThumbs(reels.length > 0);

  useEffect(() => {
    if (!api || !autoAdvanceMs || open) return;
    const t = setInterval(() => {
      if (document.hidden) return;
      api.scrollNext();
    }, autoAdvanceMs);
    return () => clearInterval(t);
  }, [api, autoAdvanceMs, open]);

  if (videos.length === 0 && reels.length === 0) return null;
  const itemClass = "pl-4 basis-[78%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5";
  return (
    <>
      <Carousel opts={{ align: "start", loop: true }} setApi={setApi} className="relative">
        <CarouselContent className="-ml-4">
          {videos.map((v) => (
            <CarouselItem key={`yt-${v.id}`} className={itemClass}>
              <VideoCard video={v} preview={preview} />
            </CarouselItem>
          ))}
          {reels.map((r) => (
            <CarouselItem key={`ig-${r.code}`} className={itemClass}>
              <ReelCard reel={r} thumb={thumbs.get(r.code)} onOpen={() => setOpen(r)} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex -left-4 bg-[#111] border-zinc-700 text-white hover:bg-[#E85D04] hover:text-white rounded-none" />
        <CarouselNext className="hidden md:flex -right-4 bg-[#111] border-zinc-700 text-white hover:bg-[#E85D04] hover:text-white rounded-none" />
      </Carousel>
      {reels.length > 0 && (
        <Dialog open={!!open} onOpenChange={(o) => { if (!o) setOpen(null); }}>
          <DialogContent className="max-w-[420px] p-0 bg-[#111] border-zinc-800 max-h-[90vh] overflow-y-auto">
            <DialogTitle className="sr-only">{open?.title ?? "Instagram reel"}</DialogTitle>
            {open && <ReelEmbed reel={open} />}
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
