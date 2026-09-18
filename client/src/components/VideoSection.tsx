/** Home page "Learn Before You Buy" section: educational Shorts + link to all videos. */

import { Link } from "wouter";
import { ArrowRight, Youtube } from "lucide-react";
import VideoCarousel from "@/components/VideoCarousel";
import { VIDEO_CATEGORIES, videosByCategory } from "@/lib/videos";
import { YOUTUBE_URL } from "@/lib/social";

export default function VideoSection() {
  const cat = VIDEO_CATEGORIES.learn;
  return (
    <section className="py-24 bg-[oklch(0.10_0.005_285)] border-y border-[oklch(0.18_0.006_285)] overflow-hidden">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <p className="text-brand-orange font-mono-brand text-xs tracking-[0.3em] uppercase mb-3">Videos</p>
            <h2 className="font-display text-5xl md:text-6xl text-white leading-none">{cat.heading}</h2>
            <p className="text-[oklch(0.60_0.008_285)] mt-4 max-w-xl">{cat.intro}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/videos" className="border border-zinc-600 hover:border-brand-orange text-white font-bold tracking-widest uppercase text-sm px-6 py-3 inline-flex items-center gap-2 transition-colors">
              All videos <ArrowRight className="w-4 h-4" />
            </Link>
            <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer" className="bg-brand-orange hover:bg-[oklch(0.72_0.21_40)] text-[oklch(0.10_0.005_285)] font-bold tracking-widest uppercase text-sm px-6 py-3 inline-flex items-center gap-2 transition-colors">
              <Youtube className="w-4 h-4" /> Subscribe
            </a>
          </div>
        </div>
        <VideoCarousel videos={videosByCategory("learn")} />
      </div>
    </section>
  );
}
