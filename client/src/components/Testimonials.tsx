/**
 * SKYLINE CUSTOMS — Testimonials Carousel
 * Real Google reviews from the shop's Google Business Profile (shared/googleReviews.json, synced by
 * scripts/sync-reviews.mjs, with the photos customers attached), served by the server with the live rating
 * and count. Order: recent reviews with photos first, then newest first.
 * Design: Industrial Brutalism | Dark matte black + burnt orange (#E85D04)
 */

import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight, Star, Quote, X, Expand } from "lucide-react";
import { useSiteReviews, type ReviewFocus } from "@/lib/reviews";

/** A photo the customer attached to their Google review (a local copy under /images/reviews). */
export interface ReviewPhoto { src: string; /** 640 px */ mid?: string; thumb: string; width: number; height: number }

export interface Review {
  name: string;
  initials: string;
  avatarColor: string;
  rating: number;
  date: string;
  service: string;
  text: string;
  /** Review date (Unix seconds). */
  time?: number;
  /** Reviewer profile picture from Google, when available. */
  photo?: string;
  /** Photos the customer attached to this review. */
  photos?: ReviewPhoto[];
}

interface TestimonialsProps {
  service?: string;
  title?: string;
  /** Which reviews lead the carousel; defaults to full front PPF and ceramic coating. */
  focus?: ReviewFocus[];
}

// Google logo SVG inline
function GoogleLogo({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

/** Google profile picture when the reviewer has one; initials on a colored ring otherwise (or if the image fails). */
export function Avatar({ review, size = "w-10 h-10" }: { review: Pick<Review, "name" | "initials" | "avatarColor" | "photo">; size?: string }) {
  const [broken, setBroken] = useState(false);
  if (review.photo && !broken) {
    return (
      <img
        src={review.photo}
        alt=""
        aria-hidden="true"
        width={40}
        height={40}
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        onError={() => setBroken(true)}
        className={`${size} rounded-full object-cover border-2 shrink-0 bg-[#111]`}
        style={{ borderColor: review.avatarColor }}
      />
    );
  }
  return (
    <div aria-hidden="true" className={`${size} rounded-full flex items-center justify-center text-white text-sm border-2 bg-[#111] font-bold shrink-0`} style={{ borderColor: review.avatarColor }}>
      {review.initials}
    </div>
  );
}

/** Large viewer for a review's photos: arrows, swipe, Escape; tap outside the photo closes it. */
function PhotoViewer({ name, photos, index, onIndex, onClose }: { name: string; photos: ReviewPhoto[]; index: number; onIndex: (i: number) => void; onClose: () => void }) {
  const n = photos.length;
  const touch = useRef<{ x: number; y: number } | null>(null);
  const swiped = useRef(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onIndex((index + 1) % n);
      if (e.key === "ArrowLeft") onIndex((index - 1 + n) % n);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, n, onIndex, onClose]);
  useEffect(() => { closeRef.current?.focus(); }, []);
  const p = photos[index];
  return (
    <div
      role="dialog" aria-modal="true" aria-label={`${name}'s review photos`} data-photo-viewer={index}
      className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
      onClick={() => { if (swiped.current) { swiped.current = false; return; } onClose(); }}
      onTouchStart={(e) => { touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }; }}
      onTouchEnd={(e) => {
        const t0 = touch.current; touch.current = null;
        if (!t0 || n < 2) return;
        const dx = e.changedTouches[0].clientX - t0.x, dy = e.changedTouches[0].clientY - t0.y;
        if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) { swiped.current = true; onIndex(dx < 0 ? (index + 1) % n : (index - 1 + n) % n); }
      }}
    >
      <img src={p.src} alt={`Photo ${index + 1} of ${n} from ${name}'s Google review`} width={p.width} height={p.height} className="max-w-full max-h-[85vh] w-auto h-auto object-contain rounded-lg" onClick={(e) => e.stopPropagation()} />
      <button ref={closeRef} type="button" aria-label="Close" onClick={onClose} className="absolute top-4 right-4 w-11 h-11 flex items-center justify-center bg-black/60 text-white border border-zinc-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#E85D04]"><X className="w-5 h-5" /></button>
      {n > 1 && (
        <>
          <button type="button" aria-label="Previous photo" onClick={(e) => { e.stopPropagation(); onIndex((index - 1 + n) % n); }} className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center bg-black/60 text-white border border-zinc-600"><ChevronLeft className="w-5 h-5" /></button>
          <button type="button" aria-label="Next photo" onClick={(e) => { e.stopPropagation(); onIndex((index + 1) % n); }} className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center bg-black/60 text-white border border-zinc-600"><ChevronRight className="w-5 h-5" /></button>
          <p className="absolute bottom-4 left-0 right-0 text-center text-zinc-300 text-sm">{index + 1} / {n}</p>
        </>
      )}
    </div>
  );
}

const PRESS = "cursor-pointer transition duration-150 hover:brightness-110 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E85D04]";

/**
 * The photos a customer attached to their review: the first one large across the card (16:10), the rest as
 * small thumbnails under it (+N on the last one when there are more). Every photo opens the large viewer at
 * that photo. `fill`: a review with no text, where the big photo takes the text's place and grows to fill it.
 */
export function ReviewPhotos({ review, className = "", maxThumbs = 4, fill = false }: { review: Pick<Review, "name" | "photos">; className?: string; maxThumbs?: number; fill?: boolean }) {
  const photos = review.photos ?? [];
  const [open, setOpen] = useState<number | null>(null);
  if (!photos.length) return null;
  const n = photos.length;
  const label = (i: number) => `Open photo ${i + 1} of ${n} from ${review.name}'s review`;
  const first = photos[0];
  const rest = photos.slice(1);
  const thumbs = rest.slice(0, maxThumbs);
  const extra = rest.length - thumbs.length;
  return (
    <div className={`${fill ? "flex-1 flex flex-col" : ""} ${className}`} data-review-photos={n}>
      <button type="button" onClick={() => setOpen(0)} aria-label={label(0)} data-photo-index={0}
        className={`group relative block w-full overflow-hidden rounded-lg bg-[#111] border border-zinc-800 ${fill ? "flex-1 min-h-[220px]" : "aspect-[16/10]"} ${PRESS}`}>
        <img
          src={first.mid ?? first.src}
          srcSet={first.mid ? `${first.mid} 640w, ${first.src} 1000w` : undefined}
          sizes="(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw"
          alt={`Photo ${review.name} attached to their Google review`}
          width={first.width} height={first.height} loading="lazy" decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <span aria-hidden="true" className="absolute right-2 bottom-2 w-8 h-8 rounded-full bg-black/65 text-white flex items-center justify-center group-hover:bg-[#E85D04] transition-colors">
          <Expand className="w-4 h-4" />
        </span>
      </button>
      {thumbs.length > 0 && (
        <div className="flex gap-2 mt-2">
          {thumbs.map((p, i) => (
            <button key={p.src} type="button" onClick={() => setOpen(i + 1)} aria-label={label(i + 1)} data-photo-index={i + 1}
              className={`relative w-16 h-16 shrink-0 overflow-hidden rounded-md border border-zinc-800 bg-[#111] ${PRESS}`}>
              <img src={p.thumb} alt="" width={64} height={64} loading="lazy" decoding="async" className="w-full h-full object-cover" />
              {i === thumbs.length - 1 && extra > 0 && <span className="absolute inset-0 bg-black/60 text-white text-sm font-bold flex items-center justify-center">+{extra}</span>}
            </button>
          ))}
        </div>
      )}
      <p className="text-zinc-500 text-[11px] mt-1.5">{n === 1 ? "Photo" : `${n} photos`} from {review.name}'s Google review</p>
      {open !== null && <PhotoViewer name={review.name} photos={photos} index={open} onIndex={setOpen} onClose={() => setOpen(null)} />}
    </div>
  );
}

function ReviewCard({ review, featured }: { review: Review; featured: boolean }) {
  return (
    <div
      className={`p-8 flex flex-col gap-5 h-full transition-colors ${
        featured
          ? "bg-[#1a0a00] border-t-2 border-t-[#E85D04]"
          : "bg-[#0D0D0D] hover:bg-[#111]"
      }`}
    >
      {/* Quote icon */}
      <Quote className="w-6 h-6 text-[#E85D04] opacity-50 shrink-0" />

      {/* Stars */}
      <div className="flex gap-1">
        {[...Array(review.rating)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-[#E85D04] text-[#E85D04]" />
        ))}
      </div>

      {/* The customer's photos (first one large), then the review text; a photo-only review lets the photo fill the space. */}
      {review.photos?.length ? <ReviewPhotos review={review} fill={!review.text} /> : null}
      {review.text ? <p className="text-zinc-300 text-sm leading-relaxed flex-1 whitespace-pre-line">"{review.text}"</p> : review.photos?.length ? null : <div className="flex-1" />}

      {/* Service tag */}
      <span className="text-[#E85D04] text-xs font-bold tracking-widest uppercase border border-[#E85D04]/30 px-2 py-0.5 self-start">
        {review.service}
      </span>

      {/* Reviewer row */}
      <div className="flex items-center gap-3 pt-3 border-t border-zinc-800">
        <Avatar review={review} />
        <div className="min-w-0">
          <p className="text-white text-sm font-semibold truncate">{review.name}</p>
          <div className="flex items-center gap-1.5 mt-0.5">
            <GoogleLogo size={12} />
            <span className="text-zinc-400 text-xs">Google · {review.date}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials({ title = "WHAT OUR CUSTOMERS SAY", focus }: TestimonialsProps) {
  const { reviews, rating, total: googleTotal } = useSiteReviews(focus);
  const total = reviews.length;
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const go = useCallback(
    (dir: "left" | "right") => {
      if (animating) return;
      setAnimating(true);
      setTimeout(() => {
        setCurrent((prev) =>
          dir === "right" ? (prev + 1) % total : (prev - 1 + total) % total
        );
        setAnimating(false);
      }, 250);
    },
    [animating, total]
  );

  // Auto-advance every 5 s
  useEffect(() => {
    if (total < 2) return;
    const t = setInterval(() => go("right"), 5000);
    return () => clearInterval(t);
  }, [go]);

  if (total === 0) return null;

  // Show 3 cards on desktop, 1 on mobile
  const visible = [
    reviews[current % total],
    reviews[(current + 1) % total],
    reviews[(current + 2) % total],
  ];

  return (
    <section className="py-24 bg-[#0A0A0A] overflow-hidden">
      <div className="container">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <div className="flex items-center gap-2 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-[#E85D04] text-[#E85D04]" />
              ))}
              {rating && <span className="text-[#E85D04] font-bold text-lg ml-1">{rating.toFixed(1)}</span>}
              <span className="text-zinc-400 text-sm ml-1">· {googleTotal ? `${googleTotal} Google reviews` : "Google reviews"}</span>
            </div>
            <h2 className="font-['Bebas_Neue',sans-serif] text-5xl md:text-6xl text-white leading-none">
              {title}
            </h2>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => go("left")}
              aria-label="Previous review"
              className="w-12 h-12 border border-zinc-700 hover:border-[#E85D04] hover:bg-[#E85D04]/10 text-zinc-400 transition-all flex items-center justify-center"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => go("right")}
              aria-label="Next review"
              className="w-12 h-12 border border-zinc-700 hover:border-[#E85D04] hover:bg-[#E85D04]/10 text-zinc-400 transition-all flex items-center justify-center"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <a
              href="/reviews"
              className="hidden sm:inline-flex items-center gap-2 text-[#E85D04] text-sm font-bold tracking-widest uppercase hover:text-white transition-colors ml-2"
            >
              ALL REVIEWS
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Cards grid */}
        <div
          className={`grid grid-cols-1 md:grid-cols-3 gap-px bg-zinc-800 transition-opacity duration-250 ${
            animating ? "opacity-0" : "opacity-100"
          }`}
        >
          {visible.map((review, idx) => (
            <ReviewCard key={`${review.name}-${current}-${idx}`} review={review} featured={idx === 0} />
          ))}
        </div>

        {/* Dot indicators */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => { if (!animating) setCurrent(i); }}
              aria-label={`Go to review ${i + 1}`}
              className="p-2 -m-1"
            >
              <span className={`block transition-all duration-300 ${
                i === current ? "w-8 h-2 bg-[#E85D04]" : "w-2 h-2 bg-zinc-700 hover:bg-zinc-500"
              }`} />
            </button>
          ))}
        </div>

        {/* Google attribution */}
        <div className="flex items-center justify-center gap-2 mt-6">
          <GoogleLogo size={14} />
          <span className="text-zinc-400 text-xs">Reviews from Google Business Profile</span>
        </div>
      </div>
    </section>
  );
}
