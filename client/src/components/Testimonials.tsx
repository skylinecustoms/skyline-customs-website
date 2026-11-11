/**
 * SKYLINE CUSTOMS — Testimonials Carousel
 * Real Google Business reviews: live from the Places API (server, hourly), falling back to the snapshot in
 * shared/googleReviews.json (scripts/sync-reviews.mjs). Rating and count are live, never typed in.
 * Design: Industrial Brutalism | Dark matte black + burnt orange (#E85D04)
 */

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { useSiteReviews, type ReviewFocus } from "@/lib/reviews";
import snapshot from "@shared/googleReviews.json";
import { relativeWhen } from "@shared/reviewTime";

export interface Review {
  name: string;
  initials: string;
  avatarColor: string;
  rating: number;
  date: string;
  service: string;
  text: string;
  /** Review date (Unix seconds), when known: the "3 weeks ago" label is worked out from it. */
  time?: number;
  /** Reviewer profile picture from Google, when available. */
  photo?: string;
  /** The reviewer's own photo of their car from the Google listing (live feed only; URLs are short-lived). */
  jobPhoto?: { url: string; width: number; height: number };
}

const COLORS = ["#7C3AED", "#0891B2", "#D97706", "#DB2777", "#16A34A", "#2563EB"];
const initialsOf = (n: string) => n.split(" ").filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toUpperCase();

/**
 * Real reviews from the Skyline Customs Google Business Profile, exactly as Google returns them (author, rating,
 * text, date, profile photo). Used when the live feed is not loaded; the live feed (newer, with the current
 * rating and count) replaces it as soon as it is. Refresh with `node scripts/sync-reviews.mjs`.
 */
export const ALL_REVIEWS: Review[] = (snapshot.reviews as { author: string; rating: number; text: string; time: number; photo?: string }[]).map((r, i) => ({
  name: r.author,
  initials: initialsOf(r.author),
  avatarColor: COLORS[i % COLORS.length],
  rating: r.rating,
  date: relativeWhen(r.time),
  service: "Google Review",
  text: r.text,
  time: r.time,
  photo: r.photo,
}));

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

/** The reviewer's own photo of their car, posted on Google. Hidden if Google stops serving it. */
export function JobPhoto({ review, className = "" }: { review: Pick<Review, "name" | "jobPhoto">; className?: string }) {
  const [broken, setBroken] = useState(false);
  if (!review.jobPhoto || broken) return null;
  return (
    <figure className={className}>
      <img
        src={review.jobPhoto.url}
        alt={`Photo ${review.name} posted with their Google review of Skyline Customs`}
        width={review.jobPhoto.width}
        height={review.jobPhoto.height}
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        onError={() => setBroken(true)}
        className="w-full h-40 object-cover bg-[#111] border border-zinc-800"
      />
      <figcaption className="text-zinc-500 text-[11px] mt-1">Photo by {review.name} on Google</figcaption>
    </figure>
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

      {/* Review text */}
      <p className="text-zinc-300 text-sm leading-relaxed flex-1 whitespace-pre-line">"{review.text}"</p>

      {review.jobPhoto && <JobPhoto review={review} />}

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
    const t = setInterval(() => go("right"), 5000);
    return () => clearInterval(t);
  }, [go]);

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
