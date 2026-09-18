/**
 * VideoCarousel — horizontal carousel of YouTube Shorts.
 *
 * Each card shows the YouTube thumbnail and only loads the real player
 * when clicked, so the page stays fast (no iframes on initial load).
 */

import { useState } from "react";
import { Play } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { videoEmbedUrl, videoThumb, type Video } from "@/lib/videos";

function VideoCard({ video }: { video: Video }) {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="bg-[#111] border border-zinc-800 hover:border-[#E85D04]/50 transition-colors h-full flex flex-col">
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
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group absolute inset-0 w-full h-full text-left"
            aria-label={`Play video: ${video.title}`}
          >
            <img
              src={videoThumb(video.id)}
              alt={video.title}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover scale-[1.35] group-hover:scale-[1.4] transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="w-14 h-14 bg-[#E85D04] text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="w-6 h-6 ml-0.5" fill="currentColor" />
              </span>
            </span>
          </button>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-white font-semibold leading-snug">{video.title}</h3>
        <p className="text-zinc-400 text-sm mt-1 leading-relaxed">{video.blurb}</p>
      </div>
    </div>
  );
}

export default function VideoCarousel({ videos }: { videos: Video[] }) {
  if (videos.length === 0) return null;
  return (
    <Carousel opts={{ align: "start", loop: false }} className="relative">
      <CarouselContent className="-ml-4">
        {videos.map((v) => (
          <CarouselItem key={v.id} className="pl-4 basis-[78%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
            <VideoCard video={v} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden md:flex -left-4 bg-[#111] border-zinc-700 text-white hover:bg-[#E85D04] hover:text-white rounded-none" />
      <CarouselNext className="hidden md:flex -right-4 bg-[#111] border-zinc-700 text-white hover:bg-[#E85D04] hover:text-white rounded-none" />
    </Carousel>
  );
}
