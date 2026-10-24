import { Star, Phone, CalendarCheck } from "lucide-react";
import { useBooking } from "@/contexts/BookingContext";
import type { BookingService } from "@/components/BookingModal";
import { useSiteReviews, type ReviewFocus } from "@/lib/reviews";

/**
 * Shown right after a quote or contact form is sent (and on /thank-you): the moment the visitor is most
 * focused on their car, so instead of "someone will contact you" it says what happens next and when, lets
 * them book a day now, answers the questions people ask before a visit, and shows one real Google review.
 * Every fact here is one the site already states (hours, address, install times, how pricing works).
 */

/** Map whatever the form calls the service ("PPF", "Tints", "Ceramic Coating", ...) to the booking calendar. */
export function bookingServiceOf(raw?: string): BookingService {
  const s = (raw ?? "").toLowerCase();
  if (s.includes("ppf") || s.includes("paint protection") || s.includes("film")) return "ppf";
  if (s.includes("ceramic")) return "ceramic";
  if (s.includes("tint") || s.includes("window")) return "tint";
  return "general";
}

const QUESTIONS: [string, string][] = [
  ["How long will my car be at the shop?", "Full front PPF is usually done the same day: drop off at 9 AM and we call when it's ready. A ceramic coating takes two days. Window tint takes about two to three hours, and you're welcome to wait."],
  ["Will the price change when I get there?", "No. We confirm the number when we see the car, and nothing changes after that."],
  ["Where do I go?", "4215 Walney Rd, Suite 1A & B, Chantilly, VA 20151, just off Route 28. Free parking on site. We're open Monday to Friday, 9 AM to 6 PM."],
];

export default function WhatHappensNext({ service, name, heading = "WHAT HAPPENS NEXT", className = "" }: { service?: string; name?: string; heading?: string; className?: string }) {
  const { openBooking } = useBooking();
  const booking = bookingServiceOf(service);
  const focus: ReviewFocus[] = booking === "general" ? ["ppf", "ceramic"] : [booking];
  const { reviews } = useSiteReviews(focus);
  const story = reviews.find((r) => r.rating >= 5 && r.text.length > 80);
  const quote = story && (story.text.length > 260 ? story.text.slice(0, story.text.lastIndexOf(" ", 250)) + "…" : story.text);

  const steps: [string, string][] = [
    ["In the next minute", "A text from Skyline Customs confirming we have your request. Reply to it any time; it comes straight to the shop."],
    ["Within the hour", "A specialist texts or calls with your exact price, usually within the hour, Monday to Friday 9 AM to 6 PM. Sent after hours or on a weekend? The next business morning."],
    ["Then pick your day", "Book the install that suits you. Most full front PPF jobs are done the same day you drop the car off."],
  ];

  return (
    <div className={`text-left ${className}`}>
      <p className="text-[#E85D04] text-xs font-bold tracking-[0.3em] uppercase mb-2">{name ? `Thanks, ${name}` : "Request received"}</p>
      <h3 className="font-['Bebas_Neue',sans-serif] text-4xl md:text-5xl text-white tracking-wide leading-none mb-6">{heading}</h3>

      <ol className="relative space-y-5 border-l-2 border-zinc-800 pl-6">
        {steps.map(([when, what], i) => (
          <li key={when} className="relative">
            <span className={`absolute -left-[33px] top-0.5 grid h-4 w-4 place-items-center rounded-full ${i === 0 ? "bg-[#E85D04] shadow-[0_0_14px_rgba(232,93,4,0.7)]" : "border-2 border-zinc-600 bg-[#111]"}`} aria-hidden="true" />
            <p className="text-white font-bold text-sm uppercase tracking-widest">{when}</p>
            <p className="text-zinc-400 text-sm leading-relaxed mt-1">{what}</p>
          </li>
        ))}
      </ol>

      <div className="flex flex-col sm:flex-row gap-3 mt-7">
        <button type="button" onClick={() => openBooking(booking)} className="cta inline-flex items-center justify-center gap-2 bg-[#E85D04] hover:bg-[#d14e00] text-black font-bold tracking-widest uppercase text-sm px-6 py-3">
          <CalendarCheck className="w-4 h-4" /> Book my install
        </button>
        <a href="tel:+17037754383" className="cta cta-alt inline-flex items-center justify-center gap-2 border border-zinc-600 hover:border-[#E85D04] text-white font-bold tracking-widest uppercase text-sm px-6 py-3">
          <Phone className="w-4 h-4" /> (703) 775-4383
        </a>
      </div>

      <div className="mt-8">
        <p className="text-zinc-400 text-xs font-bold tracking-[0.25em] uppercase mb-2">Before your visit</p>
        <div className="divide-y divide-zinc-800 border-y border-zinc-800">
          {QUESTIONS.map(([q, a]) => (
            <details key={q} className="group py-3">
              <summary className="cursor-pointer list-none flex items-center justify-between gap-4 text-white text-sm font-semibold">
                {q}<span className="text-[#E85D04] text-lg leading-none transition-transform group-open:rotate-45" aria-hidden="true">+</span>
              </summary>
              <p className="text-zinc-400 text-sm leading-relaxed mt-2">{a}</p>
            </details>
          ))}
        </div>
      </div>

      {story && quote && (
        <figure className="mt-8 squircle border border-zinc-800 bg-[#0D0D0D] p-5">
          <div className="flex gap-0.5 mb-2" aria-label={`${story.rating} out of 5 stars`}>
            {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-4 h-4 fill-[#E85D04] text-[#E85D04]" aria-hidden="true" />)}
          </div>
          <blockquote className="text-zinc-300 text-sm leading-relaxed">“{quote}”</blockquote>
          <figcaption className="text-zinc-400 text-xs mt-3">{story.name} · Google review{story.service && story.service !== "Google Review" ? ` · ${story.service}` : ""}</figcaption>
        </figure>
      )}
    </div>
  );
}
