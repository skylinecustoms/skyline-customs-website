/**
 * InstagramSection — "Follow us on Instagram" block for the home page.
 *
 * Order of preference:
 *  1. Live feed from the server (trpc.site.instagram, Instagram Graph API with
 *     INSTAGRAM_ACCESS_TOKEN set on the server): newest posts link to Instagram.
 *  2. INSTAGRAM_POSTS (lib/social.ts) post URLs rendered with Instagram's
 *     official embed script.
 *  3. A grid of recent shop photos linking to the profile.
 */

import { useEffect } from "react";
import { Instagram, ArrowUpRight, Play, Images } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { INSTAGRAM_HANDLE, INSTAGRAM_POSTS, INSTAGRAM_URL } from "@/lib/social";

const FALLBACK_PHOTOS = [
  { src: "/images/slot-scott-s-2026-tesla-cybertruck-1784043332469.jpg", alt: "Tesla Cybertruck with full front PPF at Skyline Customs" },
  { src: "/images/slot-gui-d-2018-ford-shelby-gt350-1782926847823.jpg", alt: "Ford Shelby GT350 paint protection film install" },
  { src: "/images/slot-bernard-c-1994-toyota-supra-1783276263431.jpg", alt: "1994 Toyota Supra protected with PPF" },
  { src: "/images/slot-keith-n-2024-mercedes-gle-53-amg-coupe-1782829578687.jpg", alt: "Mercedes GLE 53 AMG Coupe PPF and ceramic coating" },
  { src: "/images/tint_bmw_m2_847caa83.webp", alt: "BMW M2 ceramic window tint in Chantilly, VA" },
  { src: "/images/ppf_1_c7c64665.webp", alt: "Corvette C8 paint protection film" },
];

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } };
  }
}

function PostEmbeds() {
  useEffect(() => {
    const existing = document.querySelector<HTMLScriptElement>('script[src="https://www.instagram.com/embed.js"]');
    if (existing) {
      window.instgrm?.Embeds.process();
      return;
    }
    const s = document.createElement("script");
    s.src = "https://www.instagram.com/embed.js";
    s.async = true;
    document.body.appendChild(s);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {INSTAGRAM_POSTS.map((url) => (
        <blockquote
          key={url}
          className="instagram-media !m-0 !min-w-0 !w-full !bg-[#111] !border !border-zinc-800 !rounded-none"
          data-instgrm-permalink={url}
          data-instgrm-version="14"
        >
          <a href={url} target="_blank" rel="noopener noreferrer" className="block p-6 text-zinc-400 text-sm">
            View this post on Instagram
          </a>
        </blockquote>
      ))}
    </div>
  );
}

function PhotoGrid() {
  const { data: dbPhotos } = trpc.site.gallery.useQuery(undefined, { staleTime: 5 * 60 * 1000 });
  const photos =
    dbPhotos && dbPhotos.length >= 6
      ? dbPhotos.slice(0, 6).map((p) => ({ src: p.photoUrl, alt: p.alt }))
      : FALLBACK_PHOTOS;

  return (
    <div className="grid grid-cols-3 md:grid-cols-6 gap-px bg-[oklch(0.18_0.006_285)]">
      {photos.map((p) => (
        <a
          key={p.src}
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative aspect-square overflow-hidden bg-[#111]"
          aria-label={`${p.alt} — see more on Instagram`}
        >
          <img src={p.src} alt={p.alt} loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          <span className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
            <Instagram className="w-7 h-7 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
          </span>
        </a>
      ))}
    </div>
  );
}

function LiveFeed({ posts }: { posts: { id: string; permalink: string; caption: string; mediaType: string; mediaUrl: string; timestamp: string }[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-[oklch(0.18_0.006_285)]">
      {posts.map((p) => (
        <a
          key={p.id}
          href={p.permalink}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative aspect-square overflow-hidden bg-[#111]"
          aria-label={`${p.caption ? p.caption.slice(0, 80) : "Instagram post"} — open on Instagram`}
        >
          <img
            src={p.mediaUrl}
            alt={p.caption ? p.caption.slice(0, 120) : "Skyline Customs Instagram post"}
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {p.mediaType === "VIDEO" && <Play className="absolute top-2 right-2 w-4 h-4 text-white drop-shadow" aria-hidden="true" />}
          {p.mediaType === "CAROUSEL_ALBUM" && <Images className="absolute top-2 right-2 w-4 h-4 text-white drop-shadow" aria-hidden="true" />}
          <span className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-colors flex items-end p-3">
            <span className="text-white text-xs leading-snug opacity-0 group-hover:opacity-100 transition-opacity line-clamp-3">{p.caption}</span>
          </span>
        </a>
      ))}
    </div>
  );
}

export default function InstagramSection() {
  const { data: feed } = trpc.site.instagram.useQuery(undefined, { staleTime: 30 * 60 * 1000, retry: false });
  const livePosts = feed?.posts?.slice(0, 6) ?? [];
  return (
    <section className="py-24 bg-[#0A0A0A]">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <p className="text-brand-orange font-mono-brand text-xs tracking-[0.3em] uppercase mb-3">Instagram</p>
            <h2 className="font-display text-5xl md:text-6xl text-white leading-none">FOLLOW THE SHOP</h2>
            <p className="text-[oklch(0.60_0.008_285)] mt-4 max-w-xl">
              Daily installs, before-and-afters, and monthly specials from the bay at{" "}
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="text-white hover:text-brand-orange transition-colors">
                @{INSTAGRAM_HANDLE}
              </a>
              .
            </p>
          </div>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-brand-orange hover:bg-[oklch(0.72_0.21_40)] text-[oklch(0.10_0.005_285)] font-bold tracking-widest uppercase text-sm px-6 py-3 inline-flex items-center gap-2 transition-colors self-start md:self-auto"
          >
            <Instagram className="w-4 h-4" /> Follow @{INSTAGRAM_HANDLE} <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
        {livePosts.length >= 3 ? <LiveFeed posts={livePosts} /> : INSTAGRAM_POSTS.length > 0 ? <PostEmbeds /> : <PhotoGrid />}
      </div>
    </section>
  );
}
