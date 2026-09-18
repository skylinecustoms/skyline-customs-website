/**
 * SKYLINE CUSTOMS — Testimonials Carousel
 * Real Google Business reviews (5.0 ★ · 141 reviews)
 * Design: Industrial Brutalism | Dark matte black + burnt orange (#E85D04)
 */

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

export interface Review {
  name: string;
  initials: string;
  avatarColor: string;
  rating: number;
  date: string;
  service: string;
  text: string;
}

// Real reviews from Skyline Customs Google Business Profile (5.0 ★ · 141 reviews)
export const ALL_REVIEWS: Review[] = [
  {
    name: "Henry Gates",
    initials: "HG",
    avatarColor: "#7C3AED",
    rating: 5,
    date: "in the last week",
    service: "Auto Protection",
    text: "The guys done a outstanding job they were very professional and didn’t hesitated to help and making the customer happy job well done",
  },
  {
    name: "von rob",
    initials: "VR",
    avatarColor: "#D97706",
    rating: 5,
    date: "in the last week",
    service: "PPF + Ceramic Coating",
    text: "Communicated very well in informing me about their PPF and ceramic coating offers. My truck was ready at our scheduled pickup time and they did a great job.",
  },
  {
    name: "Mark Baker",
    initials: "MB",
    avatarColor: "#DB2777",
    rating: 5,
    date: "a week ago",
    service: "Window Tinting",
    text: "This crew knows how to provide excellent customer service and are very professional. I walked in on a Thursday asking if I could get my car tinted next week and by Sunday afternoon the excellent job was completed. Trust me, if you need tinting (or any of the other services they provide) this is the place to go. Excellent communication throughout the process and just very pleasant to deal with. Plus, the car looks great!",
  },
  {
    name: "Chris Hons",
    initials: "CH",
    avatarColor: "#16A34A",
    rating: 5,
    date: "2 weeks ago",
    service: "Ceramic Coating",
    text: "I can’t say enough good things about my ceramic coat. I took a picture of it to show my friend and it literally looked like it was a mirror. Scheduling was easy. Payment was easy. Everything about the process was easy with top quality results. You won’t be disappointed! Thanks Mo!",
  },
  {
    name: "Youngsu Kim",
    initials: "YK",
    avatarColor: "#2563EB",
    rating: 5,
    date: "2 months ago",
    service: "PPF + Window Tinting",
    text: "I highly recommend these guys! They did an excellent job on both the front end PPF installation and the two front window tints. The attention to detail they put into their work is awesome, and everything looks flawless. On top of the great quality, the staff is incredibly friendly and very flexible with scheduling. If you're looking for professional work and great customer service, this is the place to go. Highly recommended!",
  },
  {
    name: "Paolo Miclat",
    initials: "PM",
    avatarColor: "#EA580C",
    rating: 5,
    date: "2 months ago",
    service: "PPF + Ceramic Coating",
    text: "Great people to deal with. Owner was very transparent with all their services and they offer payment plans. I got the front half of my car PPF'd and back half ceramic coated (one of the packages they offered) and has been raining for a few days on an off. You cant even tell it rained. The PPF and ceramic coat works as intended.",
  },
  {
    name: "Clara Kim",
    initials: "CK",
    avatarColor: "#9333EA",
    rating: 5,
    date: "4 months ago",
    service: "Window Tinting",
    text: "Good friend of mine recommended me to get the tints done from skyline and i can confidently say that my car looks awesome. I work from 8:30-6 so they were super flexible with my schedule, letting me drop my car off in the morning and pick it up later. I appreciate the work and happy with it!!",
  },
  {
    name: "Isra Ibrahim",
    initials: "II",
    avatarColor: "#4F46E5",
    rating: 5,
    date: "1 month ago",
    service: "Ceramic Coating",
    text: "From start to finish, the experience was top-notch. Clear communication, fair pricing, and incredible workmanship. The ceramic coating completely transformed the look of my car and the shine is unreal. You can tell they take pride in their work. Highly recommend!!!",
  },
  {
    name: "Hassan Awan",
    initials: "HA",
    avatarColor: "#059669",
    rating: 5,
    date: "1 month ago",
    service: "Tinting + Ceramic Coating",
    text: "The boys at Skyline Customs took care of me with my Cybertruck — tints all around and got it ceramic coated as well. Came out flawless, and the service was quick and professional. Will be bringing my other vehicles here as well.",
  },
  {
    name: "Jonathan Cao",
    initials: "JC",
    avatarColor: "#DC2626",
    rating: 5,
    date: "3 weeks ago",
    service: "Window Tinting",
    text: "Got my new-to-me car tinted by Skyline Customs. Everyone was super friendly and extremely patient — I had to reschedule multiple times and they were very accommodating. Professional quality work done at a great price. Highly recommend and will be returning for future work!",
  },
  {
    name: "Issac Tecle",
    initials: "IT",
    avatarColor: "#7C3AED",
    rating: 5,
    date: "1 month ago",
    service: "Window Tinting",
    text: "Top-tier service and excellent quality. Out of all the cars I've ever had tinted I've never received this level of expertise. The edges are perfect, there's not a single bubble. The tints look amazing and the staff was super friendly.",
  },
  {
    name: "Omhani Mohamed",
    initials: "OM",
    avatarColor: "#0891B2",
    rating: 5,
    date: "1 month ago",
    service: "Tinting + Ceramic Coating",
    text: "Skyline Customs did an amazing job on my Tahoe. I came in for tint and ceramic coating, and the results honestly exceeded my expectations. You can tell they really care about their work and about their customers. My truck looks incredible.",
  },
  {
    name: "Mohamed Ahmed",
    initials: "MA",
    avatarColor: "#D97706",
    rating: 5,
    date: "1 month ago",
    service: "Tinting + Ceramic Coating",
    text: "I had my window tints and ceramic coating done by Skyline Customs, and the entire experience was top-tier from start to finish. Communication was clear and consistent, the process was smooth, and the work itself was done at a very high standard.",
  },
  {
    name: "Md Israil",
    initials: "MI",
    avatarColor: "#BE185D",
    rating: 5,
    date: "1 month ago",
    service: "Window Tinting",
    text: "I took my car to Skyline Customs to get the windows tinted and I'm very happy with how everything turned out. The staff was professional, respectful, and explained everything clearly without trying to upsell me. The work was done on time and at a fair price.",
  },
  {
    name: "Md Moon",
    initials: "MM",
    avatarColor: "#0369A1",
    rating: 5,
    date: "1 month ago",
    service: "Auto Detailing",
    text: "I had a great experience with Skyline Customs. The quality of their work really stands out, and you can tell they take pride in what they do. Everything was done professionally, on time, and exactly how I wanted it. The staff was amazing.",
  },
  {
    name: "Ai Ai",
    initials: "AA",
    avatarColor: "#15803D",
    rating: 5,
    date: "1 month ago",
    service: "Ceramic Tinting",
    text: "Just got my ceramic tints done at Skyline Custom and wow — my car looks completely different now. Definitely recommend this spot. Great pricing and amazing staff!",
  },
  {
    name: "albedri m",
    initials: "AM",
    avatarColor: "#B45309",
    rating: 5,
    date: "3 weeks ago",
    service: "Auto Detailing",
    text: "Great service. Best work I've seen yet!!",
  },
];

interface TestimonialsProps {
  service?: string;
  title?: string;
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
      <p className="text-zinc-300 text-sm leading-relaxed flex-1">"{review.text}"</p>

      {/* Service tag */}
      <span className="text-[#E85D04] text-xs font-bold tracking-widest uppercase border border-[#E85D04]/30 px-2 py-0.5 self-start">
        {review.service}
      </span>

      {/* Reviewer row */}
      <div className="flex items-center gap-3 pt-3 border-t border-zinc-800">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
          style={{ backgroundColor: review.avatarColor }}
        >
          {review.initials}
        </div>
        <div className="min-w-0">
          <p className="text-white text-sm font-semibold truncate">{review.name}</p>
          <div className="flex items-center gap-1.5 mt-0.5">
            <GoogleLogo size={12} />
            <span className="text-zinc-500 text-xs">Google · {review.date}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials({ title = "WHAT OUR CUSTOMERS SAY" }: TestimonialsProps) {
  const reviews = ALL_REVIEWS;
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
              <span className="text-[#E85D04] font-bold text-lg ml-1">5.0</span>
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
              className="w-12 h-12 border border-zinc-700 hover:border-[#E85D04] hover:bg-[#E85D04]/10 text-zinc-400 hover:text-white transition-all flex items-center justify-center"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => go("right")}
              aria-label="Next review"
              className="w-12 h-12 border border-zinc-700 hover:border-[#E85D04] hover:bg-[#E85D04]/10 text-zinc-400 hover:text-white transition-all flex items-center justify-center"
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
              className={`transition-all duration-300 rounded-none ${
                i === current ? "w-8 h-2 bg-[#E85D04]" : "w-2 h-2 bg-zinc-700 hover:bg-zinc-500"
              }`}
            />
          ))}
        </div>

        {/* Google attribution */}
        <div className="flex items-center justify-center gap-2 mt-6">
          <GoogleLogo size={14} />
          <span className="text-zinc-600 text-xs">Reviews from Google Business Profile</span>
        </div>
      </div>
    </section>
  );
}
