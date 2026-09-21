/**
 * SKYLINE CUSTOMS — Videos page
 * URL: /videos
 * All curated YouTube Shorts grouped by topic, with VideoObject structured data.
 */

import { Link } from "wouter";
import { ArrowRight, Youtube, Instagram } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import VideoCarousel from "@/components/VideoCarousel";
import { reelsByCategory } from "@/lib/instagramPosts";
import { VIDEOS, VIDEO_CATEGORIES, videosByCategory, videoThumb, videoWatchUrl, type VideoCategory, videoObject } from "@/lib/videos";
import { INSTAGRAM_URL, YOUTUBE_URL } from "@/lib/social";

const ORDER: VideoCategory[] = ["learn", "customers", "work"];

export default function Videos() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-['DM_Sans',sans-serif]">
      <SEO
        title="Videos: PPF, Tint & Ceramic Coating Explained | Skyline Customs"
        description="Short videos from Skyline Customs in Chantilly, VA: ceramic vs dyed tint, is PPF worth it, Virginia tint law, customer stories, and recent installs."
        canonical="https://www.skylinecustomshop.com/videos"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Skyline Customs videos",
            "itemListElement": VIDEOS.map((v, i) => ({
              "@type": "ListItem",
              "position": i + 1,
              "item": videoObject(v),
            })),
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.skylinecustomshop.com/" },
              { "@type": "ListItem", "position": 2, "name": "Videos", "item": "https://www.skylinecustomshop.com/videos" },
            ],
          },
        ]}
      />
      <Navbar />

      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0A] via-[#111] to-[#0a0d0a]" />
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10" style={{ background: "radial-gradient(ellipse at top right, #E85D04, transparent 70%)" }} />
        <div className="container relative z-10">
          <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">Watch</p>
          <h1 className="font-['Bebas_Neue',sans-serif] text-6xl md:text-8xl leading-none text-white mb-4">
            TINT, PPF & CERAMIC<br /><span className="text-[#E85D04]">EXPLAINED</span>
          </h1>
          <p className="text-zinc-300 text-lg max-w-2xl leading-relaxed mb-8">
            Quick, honest answers from the shop floor in Chantilly, VA, plus customer stories and recent installs. New videos every week.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer" className="bg-[#E85D04] hover:bg-[#d14e00] text-black font-bold tracking-widest uppercase px-8 py-4 inline-flex items-center gap-2 transition-colors">
              <Youtube className="w-4 h-4" /> Subscribe on YouTube
            </a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="border border-zinc-600 hover:border-[#E85D04] text-zinc-300 hover:text-white font-bold tracking-widest uppercase px-8 py-4 inline-flex items-center gap-2 transition-colors">
              <Instagram className="w-4 h-4" /> Follow on Instagram
            </a>
          </div>
        </div>
      </section>

      <div className="h-1 bg-[#E85D04]" />

      {ORDER.map((key, i) => {
        const cat = VIDEO_CATEGORIES[key];
        return (
          <section key={key} className={`py-20 overflow-hidden ${i % 2 === 0 ? "bg-[#0D0D0D]" : "bg-[#0A0A0A]"}`}>
            <div className="container">
              <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">{cat.label}</p>
              <h2 className="font-['Bebas_Neue',sans-serif] text-4xl md:text-5xl text-white mb-3">{cat.heading}</h2>
              <p className="text-zinc-400 max-w-2xl mb-10">{cat.intro}</p>
              <VideoCarousel videos={videosByCategory(key)} reels={reelsByCategory(key)} preview autoAdvanceMs={10_000} />
            </div>
          </section>
        );
      })}

      <section className="py-20 bg-[#E85D04]">
        <div className="container max-w-3xl text-center">
          <h2 className="font-['Bebas_Neue',sans-serif] text-5xl md:text-6xl text-white mb-4">READY WHEN YOU ARE</h2>
          <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">Seen enough? Get a free quote and we'll recommend the right package for your car.</p>
          <Link href="/get-a-quote" className="bg-white hover:bg-zinc-100 text-[#E85D04] font-bold tracking-widest uppercase px-10 py-4 inline-flex items-center gap-2 transition-colors">
            GET MY FREE QUOTE <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
