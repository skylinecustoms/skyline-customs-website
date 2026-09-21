/**
 * SKYLINE CUSTOMS -- Monthly Promo Landing Page (/promo)
 *
 * ALL content (title, price, dates, included services, slot count) is pulled
 * dynamically from the database via trpc.promo.getActive -- no hardcoded month
 * names, prices, or dates. Works for June, July, August, etc.
 *
 * To create a new monthly promo, use the Telegram /promo_new command.
 *
 * Design: Midnight Garage -- Bebas Neue (display) + DM Sans (body) + DM Mono (prices)
 * Accent: #E85D04 (burnt orange) | Background: #0A0A0A (near-black)
 */

import React, { useState, useEffect, useRef } from "react";
import { trpc } from "@/lib/trpc";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Link } from "wouter";
import { toast } from "sonner";
import {
  Shield, Sparkles, Zap, CheckCircle, ArrowRight, Clock,
  Star, Lock, ChevronDown, AlertTriangle, Eye, Wrench, Layers, Mail, Phone, Car
} from "lucide-react";

// ---- Included Service type (matches DB JSON schema) --------------------------
interface IncludedService {
  name: string;
  value: string;
  isFree: boolean;
  badge?: string;
}

/** Sum the dollar amounts in included-service value strings ("$800 value" -> 800). */
function promoMath(price: string, included: IncludedService[]) {
  const freeItems = included.filter((i) => i.isFree);
  const paidItems = included.filter((i) => !i.isFree);
  const freeValue = freeItems.reduce((sum, i) => sum + (Number((i.value ?? "").replace(/[^0-9.]/g, "")) || 0), 0);
  const priceNum = Number(String(price).replace(/[^0-9.]/g, "")) || 0;
  const fmt = (n: number) => `$${n.toLocaleString("en-US")}`;
  return { freeItems, paidItems, freeValue, fullPrice: priceNum + freeValue, fmt };
}

// ---- Progress Bar ------------------------------------------------------------
function ProgressBar({ filled, total, endDate }: { filled: number; total: number; endDate?: string }) {
  const soldOut = filled >= total;
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3">
        <span className="text-zinc-400 text-sm font-medium tracking-wide uppercase">Availability</span>
        <span className={`font-bold text-sm tracking-wide ${soldOut ? "text-red-400" : "text-emerald-400"}`}>
          {soldOut ? "SOLD OUT" : "LIMITED SPOTS"}
        </span>
      </div>
      <p className="text-zinc-300 text-sm leading-relaxed">
        {soldOut
          ? "This month's spots are gone. Join the waitlist and you're first in line for next month."
          : "We only take a set number of cars each month so every one gets our full attention. First come, first served."}
      </p>
      {endDate && <p className="text-zinc-400 text-xs mt-2">Ends {endDate}</p>}
    </div>
  );
}

// ---- Customer Slot Card ------------------------------------------------------
function SlotCard({
  slotNumber, customerName, carDescription, photoUrl, promoTitle,
}: {
  slotNumber: number; customerName: string; carDescription: string;
  photoUrl?: string | null; promoTitle: string;
}) {
  return (
    <div id={`slot-${slotNumber}`} className="border border-zinc-800 bg-[#0D0D0D] overflow-hidden group hover:border-[#E85D04]/50 transition-colors">
      <div className="relative aspect-[4/3] bg-zinc-900 overflow-hidden">
        {photoUrl ? (
          <img
            src={photoUrl}
            alt={`${carDescription} -- Skyline Customs ${promoTitle}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2">
            <Shield className="w-10 h-10 text-zinc-700" />
            <span className="text-zinc-700 text-xs tracking-widest uppercase">Photo coming soon</span>
          </div>
        )}
        <div className="absolute top-3 left-3 bg-[#E85D04] text-black text-xs font-bold tracking-widest px-2 py-1">
          #{slotNumber}
        </div>
        <div className="absolute top-3 right-3 bg-black/70 text-emerald-400 text-xs font-bold tracking-wide px-2 py-1 flex items-center gap-1">
          <CheckCircle className="w-3 h-3" /> VERIFIED
        </div>
      </div>
      <div className="p-4">
        <p className="text-white font-semibold text-sm mb-1">{customerName}</p>
        <p className="text-zinc-400 text-xs leading-relaxed">{carDescription}</p>
      </div>
    </div>
  );
}

// ---- Empty Slot Card ---------------------------------------------------------
function EmptySlotCard({ slotNumber, quoteUrl }: { slotNumber: number; quoteUrl: string }) {
  return (
    <div className="border border-dashed border-zinc-800 bg-[#0A0A0A] overflow-hidden">
      <div className="aspect-[4/3] flex flex-col items-center justify-center gap-3 p-4">
        <div className="w-10 h-10 rounded-full border-2 border-dashed border-zinc-700 flex items-center justify-center">
          <span className="text-zinc-700 font-bold text-sm">#{slotNumber}</span>
        </div>
        <p className="text-zinc-700 text-xs tracking-widest uppercase text-center">Available</p>
        <Link href={quoteUrl} className="text-[#E85D04] text-xs font-bold tracking-widest uppercase underline underline-offset-2 decoration-1 hover:decoration-2">
          Claim This Slot →
        </Link>
      </div>
    </div>
  );
}

// ---- Before/After Slider ---------------------------------------------------
function BeforeAfterSlider({ beforeSrc, afterSrc, label }: { beforeSrc: string; afterSrc: string; label?: string }) {
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updatePos = (clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const pct = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    setPos(pct);
  };

  return (
    <div className="relative select-none overflow-hidden" ref={containerRef}
      onMouseMove={e => dragging && updatePos(e.clientX)}
      onMouseUp={() => setDragging(false)}
      onMouseLeave={() => setDragging(false)}
      onTouchMove={e => updatePos(e.touches[0].clientX)}
    >
      {label && (
        <div className="absolute top-3 left-3 z-20 bg-black/70 text-white text-xs font-bold tracking-widest uppercase px-2 py-1">{label}</div>
      )}
      {/* After (base layer) */}
      <img loading="lazy" decoding="async" src={afterSrc} alt="After PPF" className="w-full h-full object-cover block" />
      {/* Before (clipped) */}
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
        <img loading="lazy" decoding="async" src={beforeSrc} alt="Before PPF" className="absolute inset-0 w-full h-full object-cover" style={{ width: '100%', minWidth: '100%' }} />
        <div className="absolute top-3 left-3 bg-zinc-900/80 text-zinc-300 text-xs font-bold tracking-widest uppercase px-2 py-1">Before</div>
      </div>
      <div className="absolute top-3 right-3 z-20 bg-[#E85D04]/90 text-black text-xs font-bold tracking-widest uppercase px-2 py-1">After</div>
      {/* Divider handle */}
      <div
        className="absolute top-0 bottom-0 z-10 flex items-center justify-center cursor-ew-resize"
        style={{ left: `${pos}%`, transform: 'translateX(-50%)' }}
        onMouseDown={() => setDragging(true)}
        onTouchStart={() => setDragging(true)}
      >
        <div className="w-0.5 h-full bg-white/60 absolute" />
        <div className="w-9 h-9 rounded-full bg-white shadow-lg flex items-center justify-center z-10 relative">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M6 9H2M2 9L4 7M2 9L4 11" stroke="#E85D04" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 9H16M16 9L14 7M16 9L14 11" stroke="#E85D04" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
      <p className="absolute bottom-3 left-1/2 -translate-x-1/2 text-white/60 text-[10px] tracking-widest uppercase bg-black/50 px-2 py-0.5 rounded pointer-events-none">Drag to compare</p>
    </div>
  );
}

// ---- Review Snippet ---------------------------------------------------------
const GOOGLE_MAPS_URL = "https://www.google.com/maps/place/Skyline+Customs/@38.8875732,-77.433704,17z/data=!3m1!4b1!4m6!3m5!1s0x89b6457209ec6e35:0xd27075cd2a4f1b54!8m2!3d38.8875732!4d-77.433704!16s%2Fg%2F11yskymsnx";

const PROMO_REVIEWS = [
  {
    name: "Paolo Miclat",
    photo: "https://lh3.googleusercontent.com/a-/ALV-UjX3W-zZuG1k5d4PKqrb15t2jBJdiFG0F2G0WpisRMJQFPIvty_o=s128-c0x00000000-cc-rp-mo",
    text: "Great people to deal with. Owner was very transparent with all their services and they offer payment plans. I got the front half of my car PPF'd and back half ceramic coated and has been raining for a few days on and off. You can't even tell it rained. The PPF and ceramic coat works as intended.",
    time: "in the last week",
  },
  {
    name: "Youngsu Kim",
    photo: "https://lh3.googleusercontent.com/a-/ALV-UjUbpvlw9LVMgZzQ6k0LaXy5Ohck1j64CxBgips1OrKOwP6jROHtqA=s128-c0x00000000-cc-rp-mo-ba2",
    text: "I highly recommend these guys! They did an excellent job on both the front end PPF installation and the two front window tints. The attention to detail they put into their work is awesome, and everything looks flawless. On top of the great quality, the staff is incredibly friendly and very flexible with scheduling.",
    time: "a week ago",
  },
  {
    name: "Auriel Young",
    photo: "https://lh3.googleusercontent.com/a-/ALV-UjVcJDxOPKM8nPX-YgNdd4pUKIej81ahodnqn2E8yU2py2HrUC0_=s128-c0x00000000-cc-rp-mo",
    text: "Great experience! The tint job came out looking really clean and the team was fast and efficient. Would definitely recommend!",
    time: "a week ago",
  },
  {
    name: "Clara Kim",
    photo: "https://lh3.googleusercontent.com/a/ACg8ocIsoVT7soBUyuLnybazRn3qSXC7Q34N6slNpvtNedZ1iSA9cA=s128-c0x00000000-cc-rp-mo",
    text: "Good friend of mine recommended me to get the tints done from skyline and i can confidently say that my car looks awesome. I work from 8:30-6 so they were super flexible with my schedule, letting me drop my car off in the morning and pick it up later. I appreciate the work and happy with it!!",
    time: "a month ago",
  },
  {
    name: "Jonathan Cao",
    photo: "https://lh3.googleusercontent.com/a-/ALV-UjWT0lZnA17DEs1wKFkgRhFiCK05JsZQsL75K3XxHTdfcmUpLgkD=s128-c0x00000000-cc-rp-mo",
    text: "Got my new to me car tinted by Skyline Customs. Everyone was super friendly and extremely patient, I had to reschedule multiple times and they were very accommodating. Professional quality work done at a great price. I highly recommend their services and will be returning for future work!",
    time: "5 months ago",
  },
  {
    name: "Moeez Omer",
    photo: "https://lh3.googleusercontent.com/a/ACg8ocJXfn37iMLP3EAyuz_lE6GJV0Fanq3JfrNtAPhla3KNrPJwwA=s128-c0x00000000-cc-rp-mo",
    text: "An Excellent and professional team. I got my rear and side windows tinted and the process was exceptional from the jump. They gave me a step by step process which gave me full confidence with my purchase. Will definitely come back for my mother's car!",
    time: "6 months ago",
  },
  {
    name: "Md Israil",
    photo: "https://lh3.googleusercontent.com/a/ACg8ocJZfQSrnUyW64Mm6rBZSL9vmG8_RzKUGsWU64FjQcuZrJdM5g=s128-c0x00000000-cc-rp-mo",
    text: "I took my car to Skyline Customs to get the windows tinted and I'm very happy with how everything turned out. The staff was professional, respectful, and explained everything clearly without trying to upsell me. The work was done on time and the tint looks clean and even with no bubbles or flaws. Prices were fair and the quality speaks for itself.",
    time: "5 months ago",
  },
  {
    name: "Beanz",
    photo: "https://lh3.googleusercontent.com/a/ACg8ocIWs7Ba0R-uUnAteojCo1ICpY8jMrrubKiMVoqcth58EJT81A=s128-c0x00000000-cc-rp-mo",
    text: "Called yesterday, got me an appointment today, and done in only a few hours. Perfect guys here.",
    time: "in the last week",
  },
];

function ReviewSnippet() {
  const [active, setActive] = useState(0);
  const review = PROMO_REVIEWS[active];
  return (
    <div className="border border-zinc-800 bg-[#0D0D0D] p-8">
      {/* Header: stars + Google badge */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-[#E85D04] text-[#E85D04]" />)}
          <span className="text-zinc-400 text-xs ml-2 font-medium">5.0 Google Reviews</span>
        </div>
        <a href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer"
          className="text-[#E85D04] text-xs font-bold tracking-wider uppercase underline underline-offset-2 decoration-1 hover:decoration-2">
          See all 100+ reviews →
        </a>
      </div>
      {/* Review text */}
      <blockquote className="text-zinc-200 text-sm leading-relaxed italic mb-6">&ldquo;{review.text}&rdquo;</blockquote>
      {/* Author row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {review.photo ? (
            <img loading="lazy" decoding="async" src={review.photo} alt={review.name} className="w-10 h-10 rounded-full object-cover border border-zinc-700" />
          ) : (
            <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-white font-bold text-sm">
              {review.name.charAt(0)}
            </div>
          )}
          <div>
            <p className="text-white font-bold text-sm">{review.name}</p>
            <p className="text-zinc-400 text-xs">{review.time}</p>
          </div>
        </div>
        {/* Dot navigation */}
        <div className="flex gap-2">
          {PROMO_REVIEWS.map((_, i) => (
            <button key={i} onClick={() => setActive(i)}
              className={`w-2 h-2 rounded-full transition-colors ${i === active ? 'bg-[#E85D04]' : 'bg-zinc-700 hover:bg-zinc-500'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ---- FAQ Accordion -----------------------------------------------------------
interface FaqItem { q: string; a: string }

/** FAQ copy follows the active promo: price, what is included free, and whether paint correction is part of it. */
function buildFaq(price: string, freeItems: IncludedService[], hasCorrection: boolean): FaqItem[] {
  const priceText = `$${(Number(price) || 0).toLocaleString("en-US")}`;
  const freeList = freeItems.length
    ? freeItems.map((f) => `${f.name}${f.value ? ` (${f.value})` : ""}`).join(", ")
    : "nothing extra this month";
  const items: FaqItem[] = [
    {
      q: `What exactly is included in the ${priceText} package?`,
      a: `STEK DYNOshield Full Front PPF is what you pay for — that covers the hood, front bumper, both fenders, side mirrors, and headlights. Included free this month: ${freeList}. Every car also gets a full decontamination wash and our walk-and-pay inspection before you pay a dime.`,
    },
    {
      q: "What does the Walk-and-Pay Guarantee mean?",
      a: "Before you pay the balance, we walk every panel with you under high-intensity lighting. If anything isn't right — an edge lifting, a bubble, anything — we fix it before you pay. If you're not satisfied, you don't pay.",
    },
    {
      q: "What exactly does the 12-Year No-Chip Promise cover?",
      a: "If a rock chips the paint under our film — through intact, untampered film, from normal road driving — we don't just replace the film. We repaint the panel, free. Film and paint, for as long as you own the car, up to 12 years.",
    },
    {
      q: "Why are spots limited?",
      a: `Because doing the job right takes time. A proper PPF install${hasCorrection ? " with paint correction" : ""}${freeItems.some((f) => /ceramic/i.test(f.name)) ? " and a full ceramic coating" : ""} takes 2–3 days per car. We only take a set number of cars each month so every vehicle gets the same level of attention. This isn't a marketing gimmick — it's our real capacity.`,
    },
    {
      q: "How long does the install take?",
      a: hasCorrection
        ? "Plan for 2–3 days. Day 1 is decontamination and paint correction. Day 2 is the PPF installation. Day 3 is ceramic coating application and final inspection. We'll give you a specific timeline when you book."
        : "Plan for 2–3 days. Day 1 is decontamination and surface prep. Day 2 is the PPF installation. Day 3 is the ceramic coating and final inspection. We'll give you a specific timeline when you book.",
    },
    {
      q: "Is this really full front coverage — or just a partial kit?",
      a: "Full front. That means the entire hood, both front fenders, the front bumper, side mirrors, and headlights. Not a partial hood, not just the bumper. The full front end in STEK DYNOshield.",
    },
    {
      q: "Can I add more coverage than full front?",
      a: "Yes. The monthly special price covers the full front package. If you want to add the rocker panels, door edges, and door cups (our full front extended package), we'll quote that separately when you book. Many customers add at least the rocker panels.",
    },
  ];
  if (hasCorrection) {
    items.push({
      q: "What's included in the paint correction — and why does it matter?",
      a: "Paint correction is a machine polish that removes swirl marks, light scratches, water spots, and oxidation from the clear coat. We include it because trapping imperfections under PPF is permanent — you'd see them forever.",
    });
  } else {
    items.push({
      q: "Does my paint need correction before PPF?",
      a: "Every car gets a full decontamination and inspection first. If your paint has swirls or scratches that would show under film, we'll show you under the lights and quote a single-stage correction before we start — never a surprise on the invoice.",
    });
  }
  items.push({
    q: "Do I need to do anything to prepare my car?",
    a: "Just bring it in clean (a basic wash is fine — we'll do the full decontamination). Don't apply any wax or sealant in the week before your appointment. That's it.",
  });
  return items;
}

function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="divide-y divide-zinc-800 border border-zinc-800">
      {items.map((item, i) => (
        <div key={i}>
          <button
            className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-zinc-900/50 transition-colors"
            onClick={() => setOpen(open === i ? null : i)}
          >
            <span className="font-display text-lg text-white tracking-wide">{item.q}</span>
            <ChevronDown
              className={`w-5 h-5 text-[#E85D04] shrink-0 transition-transform duration-200 ${open === i ? "rotate-180" : ""}`}
            />
          </button>
          {open === i && (
            <div className="px-6 pb-5">
              <p className="text-zinc-400 text-sm leading-relaxed">{item.a}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ---- Countdown Timer --------------------------------------------------------
function CountdownTimer({ endDate }: { endDate: string }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    if (!endDate) return;
    // Parse "June 30, 2026", "July 31st", or "2026-06-30" style dates
    const cleaned = endDate.replace(/(\d+)(st|nd|rd|th)\b/gi, '$1');
    const target = new Date(cleaned);
    if (isNaN(target.getTime())) return;
    // Set to end of day
    target.setHours(23, 59, 59, 999);

    const tick = () => {
      const now = Date.now();
      const diff = target.getTime() - now;
      if (diff <= 0) {
        setExpired(true);
        return;
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeLeft({ days, hours, minutes, seconds });
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [endDate]);

  if (!endDate || expired) return null;

  return (
    <div className="flex items-center gap-1 text-xs">
      <span className="text-zinc-400 mr-1">Ends in</span>
      {timeLeft.days > 0 && (
        <>
          <span className="font-mono-brand text-[#E85D04] font-bold">{timeLeft.days}</span>
          <span className="text-zinc-400">d</span>
        </>
      )}
      <span className="font-mono-brand text-[#E85D04] font-bold ml-1">{String(timeLeft.hours).padStart(2, '0')}</span>
      <span className="text-zinc-400">h</span>
      <span className="font-mono-brand text-[#E85D04] font-bold ml-1">{String(timeLeft.minutes).padStart(2, '0')}</span>
      <span className="text-zinc-400">m</span>
      <span className="font-mono-brand text-[#E85D04] font-bold ml-1">{String(timeLeft.seconds).padStart(2, '0')}</span>
      <span className="text-zinc-400">s</span>
    </div>
  );
}

// ---- Waitlist Form -----------------------------------------------------------
type WaitlistIntent = 'asap' | 'this-week' | 'this-month';

function WaitlistForm({ promoTitle }: { promoTitle: string }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    // vehicle fields -- parsed into GHL custom fields (same as contact form)
    year: '',
    make: '',
    model: '',
    // qualifying questions
    ppfReason: '',
    desiredTiming: '',
  });
  const [intent, setIntent] = useState<WaitlistIntent | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [queuePosition, setQueuePosition] = useState<number | null>(null);

  const joinWaitlist = trpc.promo.joinWaitlist.useMutation({
    onSuccess: (data) => {
      setSubmitted(true);
      setQueuePosition(data.queuePosition ?? null);
      toast.success("You're on the waitlist!", {
        description: "We'll reach out as soon as a slot opens up.",
        duration: 6000,
      });
    },
    onError: (err) => {
      toast.error("Something went wrong", { description: err.message });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !intent) return;
    // Build vehicle string for the note (year make model)
    const vehicleParts = [form.year, form.make, form.model].filter(Boolean);
    const vehicle = vehicleParts.length > 0 ? vehicleParts.join(' ') : undefined;
    joinWaitlist.mutate({
      name: form.name,
      email: form.email,
      phone: form.phone || undefined,
      vehicle,
      year: form.year || undefined,
      make: form.make || undefined,
      model: form.model || undefined,
      intent,
      ppfReason: form.ppfReason || undefined,
      desiredTiming: form.desiredTiming || undefined,
    });
  };

  const inputCls = "w-full bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-600 px-4 py-3 text-sm focus:outline-none focus:border-[#E85D04] transition-colors";
  const labelCls = "block text-zinc-400 text-xs font-bold tracking-[0.2em] uppercase mb-2";

  if (submitted) {
    return (
      <div className="border border-emerald-800 bg-emerald-900/20 p-8 text-center" id="waitlist">
        <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
        <h3 className="font-display text-2xl text-white tracking-wide mb-2">YOU'RE ON THE LIST</h3>
        {queuePosition && (
          <div className="inline-flex items-center gap-2 bg-[#E85D04]/10 border border-[#E85D04]/30 text-[#E85D04] text-sm font-bold tracking-widest uppercase px-4 py-2 mb-4">
            You're #{queuePosition} in line
          </div>
        )}
        <p className="text-zinc-400 text-sm leading-relaxed">
          We'll reach out as soon as a slot opens. You'll be first to know — we noted you want to get it done {intent === 'asap' ? 'ASAP' : intent === 'this-week' ? 'this week' : 'this month'}.
        </p>
      </div>
    );
  }

  return (
    <div className="border border-zinc-700 bg-[#0D0D0D] p-8" id="waitlist">
      <div className="mb-6">
        <p className="text-[#E85D04] text-xs font-bold tracking-[0.3em] uppercase mb-2">All {promoTitle} Slots Are Filled</p>
        <h3 className="font-display text-3xl text-white tracking-wide leading-tight">
          JOIN THE WAITLIST<br />
          <span className="text-zinc-400 text-xl">Be First for Next Month</span>
        </h3>
        <p className="text-zinc-400 text-sm mt-3 leading-relaxed">
          Leave your info below. When a slot opens or next month's deal goes live, you'll be the first to know.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* --- Contact Info --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelCls}><Mail className="w-3 h-3 inline mr-1" />Full Name *</label>
            <input type="text" required placeholder="John Smith"
              value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              className={inputCls} />
          </div>
          <div>
            <label className={labelCls}><Mail className="w-3 h-3 inline mr-1" />Email *</label>
            <input type="email" required placeholder="john@example.com"
              value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              className={inputCls} />
          </div>
        </div>
        <div>
          <label className={labelCls}><Phone className="w-3 h-3 inline mr-1" />Phone (optional)</label>
          <input type="tel" placeholder="(703) 555-0100"
            value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
            className={inputCls} />
        </div>

        {/* --- Vehicle Info (maps to GHL custom fields) --- */}
        <div>
          <label className={labelCls}><Car className="w-3 h-3 inline mr-1" />Your Vehicle (optional)</label>
          <div className="grid grid-cols-3 gap-3">
            <input type="text" placeholder="Year" maxLength={4}
              value={form.year} onChange={e => setForm(f => ({ ...f, year: e.target.value }))}
              className={inputCls} />
            <input type="text" placeholder="Make"
              value={form.make} onChange={e => setForm(f => ({ ...f, make: e.target.value }))}
              className={inputCls} />
            <input type="text" placeholder="Model"
              value={form.model} onChange={e => setForm(f => ({ ...f, model: e.target.value }))}
              className={inputCls} />
          </div>
        </div>

        {/* --- Intent Buttons --- */}
        <div>
          <label className={labelCls}>When did you want to get it done? *</label>
          <div className="grid grid-cols-3 gap-3">
            {(['asap', 'this-week', 'this-month'] as WaitlistIntent[]).map((val) => {
              const labels: Record<WaitlistIntent, string> = { asap: 'ASAP', 'this-week': 'This Week', 'this-month': 'This Month' };
              const active = intent === val;
              return (
                <button
                  key={val}
                  type="button"
                  onClick={() => setIntent(val)}
                  className={`py-3 px-2 text-sm font-bold tracking-[0.1em] uppercase border transition-colors ${
                    active
                      ? 'bg-[#E85D04] border-[#E85D04] text-black'
                      : 'bg-transparent border-zinc-700 text-zinc-400 hover:border-[#E85D04]'
                  }`}
                >
                  {labels[val]}
                </button>
              );
            })}
          </div>
          {!intent && (
            <p className="text-zinc-400 text-xs mt-1">Select one to continue</p>
          )}
        </div>

        {/* --- Qualifying Questions --- */}
        <div>
          <label className={labelCls}>What made you look into PPF? (optional)</label>
          <input type="text"
            placeholder="e.g. saw a friend's car, worried about rock chips..."
            value={form.ppfReason}
            onChange={e => setForm(f => ({ ...f, ppfReason: e.target.value }))}
            className={inputCls} />
        </div>

        <button
          type="submit"
          disabled={joinWaitlist.isPending || !intent}
          className="w-full bg-[#E85D04] text-black font-display text-xl tracking-[0.1em] py-4 hover:bg-orange-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {joinWaitlist.isPending ? 'JOINING...' : 'JOIN THE WAITLIST'} <ArrowRight className="w-5 h-5" />
        </button>
        <p className="text-zinc-400 text-xs text-center">No spam. Just a heads-up when your spot is ready.</p>
      </form>
    </div>
  );
}

// ---- Last Month Strip -------------------------------------------------------
function LastMonthStrip() {
  const { data: lastPromo } = trpc.promo.getLastArchived.useQuery();
  if (!lastPromo) return null;

  const filledCount = lastPromo.slots?.length ?? 0;
  const totalSlots = lastPromo.totalSlots ?? 21;
  const archiveUrl = lastPromo.archivedSlug ? `/${lastPromo.archivedSlug}` : null;
  if (!archiveUrl) return null;

  return (
    <section className="py-16 bg-zinc-950 border-t border-zinc-900">
      <div className="container max-w-6xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="text-zinc-400 text-xs font-bold tracking-[0.3em] uppercase mb-2">Last Month</p>
            <h3 className="font-display text-3xl text-white tracking-wide">{lastPromo.title?.toUpperCase()}</h3>
            <p className="text-zinc-400 text-sm mt-1">
              Sold out &mdash; {filledCount} cars protected.
            </p>
          </div>
          <div className="flex flex-col sm:items-end gap-4">
            {/* Mini slot thumbnail grid */}
            {lastPromo.slots && lastPromo.slots.length > 0 && (
              <div className="flex gap-2">
                {lastPromo.slots.slice(0, 6).map((slot) => (
                  <div key={slot.id} className="w-12 h-12 bg-zinc-800 overflow-hidden border border-zinc-700">
                    {slot.photoUrl ? (
                      <img loading="lazy" decoding="async" src={slot.photoUrl} alt={slot.carDescription} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Shield className="w-4 h-4 text-zinc-400" />
                      </div>
                    )}
                  </div>
                ))}
                {lastPromo.slots.length > 6 && (
                  <div className="w-12 h-12 bg-zinc-800 border border-zinc-700 flex items-center justify-center">
                    <span className="text-zinc-400 text-xs font-bold">+{lastPromo.slots.length - 6}</span>
                  </div>
                )}
              </div>
            )}
            <Link
              href={archiveUrl}
              className="flex items-center gap-2 text-[#E85D04] text-sm font-bold tracking-wide underline underline-offset-2 decoration-1 hover:decoration-2"
            >
              See all {filledCount} cars from {lastPromo.title} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---- Loading Skeleton --------------------------------------------------------
function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white animate-pulse">
      <div className="h-16 bg-zinc-900" />
      <div className="container max-w-6xl py-24">
        <div className="h-8 bg-zinc-800 rounded w-48 mb-6" />
        <div className="h-24 bg-zinc-800 rounded w-2/3 mb-4" />
        <div className="h-6 bg-zinc-800 rounded w-1/2 mb-8" />
        <div className="h-12 bg-zinc-800 rounded w-40" />
      </div>
    </div>
  );
}

// Safe date-to-ISO helper -- returns null if the date string cannot be parsed
function safeIsoDate(raw: string): string | null {
  if (!raw) return null;
  // Strip ordinal suffixes: "July 1st" -> "July 1"
  const cleaned = raw.replace(/(\d+)(st|nd|rd|th)\b/gi, '$1');
  const d = new Date(cleaned);
  if (isNaN(d.getTime())) return null;
  return d.toISOString().split('T')[0];
}

// ---- "We Did It Again" Banner -----------------------------------------------
function WeDidItAgainBanner() {
  const { data: lastPromo } = trpc.promo.getLastArchived.useQuery();
  if (!lastPromo) return null;

  const filledCount = lastPromo.slots?.length ?? 0;
  const totalSlots = lastPromo.totalSlots ?? 21;
  const lastTitle = lastPromo.title ?? "Last Month's Special";
  const isSoldOut = filledCount >= totalSlots;

  // Mini car thumbnails (up to 5)
  const thumbSlots = (lastPromo.slots ?? []).filter((s) => s.photoUrl).slice(0, 5);

  return (
    <div className="bg-[#111] border-b border-zinc-800 pt-16">
      <div className="container max-w-6xl py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">

          {/* Left: headline + context */}
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 bg-[#E85D04] text-[#0A0A0A] font-['Bebas_Neue',sans-serif] text-xs tracking-widest px-2 py-1 mt-0.5">
              SOLD OUT
            </div>
            <div>
              <p className="text-white font-['Bebas_Neue',sans-serif] text-xl tracking-widest leading-tight">
                {lastTitle.toUpperCase()} &mdash; SOLD OUT
              </p>
              <p className="text-zinc-400 text-xs mt-0.5">
                {isSoldOut
                  ? `Every spot was claimed. See the cars we protected last month.`
                  : `${filledCount} cars protected last month. See them here.`}
              </p>
            </div>
          </div>

          {/* Right: mini car thumbs + link */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {thumbSlots.length > 0 && (
              <div className="flex -space-x-2">
                {thumbSlots.map((slot) => (
                  <div
                    key={slot.id}
                    className="w-9 h-9 rounded-full border-2 border-[#0A0A0A] overflow-hidden bg-zinc-800"
                  >
                    <img loading="lazy" decoding="async" src={slot.photoUrl!} alt={slot.carDescription ?? "car"} className="w-full h-full object-cover" />
                  </div>
                ))}
                {filledCount > 5 && (
                  <div className="w-9 h-9 rounded-full border-2 border-[#0A0A0A] bg-zinc-700 flex items-center justify-center">
                    <span className="text-zinc-300 text-[10px] font-bold">+{filledCount - 5}</span>
                  </div>
                )}
              </div>
            )}
            <a
              href="#last-month"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("last-month")?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="flex items-center gap-1.5 text-[#E85D04] text-xs font-bold tracking-widest uppercase underline underline-offset-2 decoration-1 hover:decoration-2 whitespace-nowrap"
            >
              See last month’s cars <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}

// ---- Main Page ---------------------------------------------------------------
export default function JuneSpecial() {
  const { data: promo, isLoading } = trpc.promo.getActive.useQuery();

  if (isLoading) return <LoadingSkeleton />;

  const filledSlots = promo?.slots ?? [];
  const totalSlots = promo?.totalSlots ?? 21;
  const remaining = totalSlots - filledSlots.length;
  const soldOut = remaining <= 0;

  const title = promo?.title ?? "Monthly Special";
  const price = promo?.price ?? "2400";
  const endDate = promo?.endDate ?? "";
  const startDate = promo?.startDate ?? "";
  const tagline = promo?.tagline ?? "The most complete paint protection package in Northern Virginia.";
  const dealDescription = promo?.dealDescription ?? "Full Front PPF + Free Paint Correction + Ceramic Coating";
  const slug = promo?.slug ?? "promo";
  const promoNote = encodeURIComponent(`I'm interested in the ${title} — ${dealDescription}. Please contact me to claim my spot.`);
  const quoteUrl = `/get-a-quote?service=ppf&promo=${encodeURIComponent(slug)}&promoTitle=${encodeURIComponent(title)}&promoNote=${promoNote}`;
  const canonicalUrl = "https://www.skylinecustomshop.com/promo";

  let includedServices: IncludedService[] = [];
  if (promo?.includedServices) {
    try {
      includedServices = JSON.parse(promo.includedServices) as IncludedService[];
    } catch { includedServices = []; }
  }
  const { freeItems, paidItems, freeValue, fullPrice, fmt } = promoMath(price, includedServices);
  const hasCorrection = freeItems.some((f) => /correction/i.test(f.name));
  const hasCeramic = freeItems.some((f) => /ceramic/i.test(f.name));
  const faqItems = buildFaq(price, freeItems, hasCorrection);
  const paidName = paidItems[0]?.name ?? "STEK DYNOshield Full Front PPF";
  const freeNames = freeItems.map((f) => f.name.toLowerCase());
  const freeSentence = freeNames.length === 0 ? "" : freeNames.length === 1 ? freeNames[0] : `${freeNames.slice(0, -1).join(", ")} and ${freeNames[freeNames.length - 1]}`;

  const allSlots = Array.from({ length: totalSlots }, (_, i) => {
    const slot = filledSlots.find((s) => s.slotNumber === i + 1);
    return slot ?? null;
  });

  const seoTitle = promo
    ? `${title} — ${dealDescription.slice(0, 80)} | Skyline Customs Chantilly VA`
    : "Monthly Special | Skyline Customs Chantilly VA";
  const seoDesc = promo
    ? `Spots are limited. ${tagline} Starting at $${price}. Skyline Customs, Chantilly VA.`
    : "Exclusive monthly automotive protection deal at Skyline Customs, Chantilly VA.";

  // ---- JSON-LD structured data ------------------------------------------------
  const jsonLdSchemas = [
    // 1. SpecialAnnouncement (COVID/promo announcements -- Google rich result)
    {
      "@context": "https://schema.org",
      "@type": "SpecialAnnouncement",
      "name": seoTitle,
      "text": seoDesc,
      "datePosted": safeIsoDate(startDate) ?? new Date().toISOString().split('T')[0],
      "expires": safeIsoDate(endDate) ?? undefined,
      "url": canonicalUrl,
      "announcementLocation": {
        "@type": "AutoBodyShop",
        "name": "Skyline Customs",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "4511 Daly Dr Suite 100",
          "addressLocality": "Chantilly",
          "addressRegion": "VA",
          "postalCode": "20151",
          "addressCountry": "US"
        }
      }
    },
    // 2. Product (enables price/availability rich results)
    {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": title,
      "description": seoDesc,
      "url": canonicalUrl,
      "brand": { "@type": "Brand", "name": "Skyline Customs" },
      "offers": {
        "@type": "Offer",
        "priceCurrency": "USD",
        "price": price,
        "availability": soldOut
          ? "https://schema.org/SoldOut"
          : "https://schema.org/InStock",
        "url": canonicalUrl,
        "seller": { "@type": "AutoBodyShop", "name": "Skyline Customs" }
      }
    },
    // 3. FAQPage (enables FAQ rich results in Google)
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqItems.map(item => ({
        "@type": "Question",
        "name": item.q,
        "acceptedAnswer": { "@type": "Answer", "text": item.a }
      }))
    },
    // 4. BreadcrumbList
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.skylinecustomshop.com" },
        { "@type": "ListItem", "position": 2, "name": title, "item": canonicalUrl }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <SEO title={seoTitle} description={seoDesc} canonical={canonicalUrl} jsonLd={jsonLdSchemas} />
      <Navbar />

      {/* ================================================================
          "WE DID IT AGAIN" SOCIAL PROOF BANNER
          Shows last month's sell-out + quick link to last month's cars
      ================================================================ */}
      <WeDidItAgainBanner />

      {/* ================================================================
          HERO
      ================================================================ */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-[#0A0A0A]">
        {/* Diagonal grid texture */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "repeating-linear-gradient(45deg, #E85D04 0, #E85D04 1px, transparent 0, transparent 50%)",
            backgroundSize: "20px 20px",
          }}
        />
        {/* Left orange accent bar */}
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#E85D04]" />

        <div className="container max-w-6xl relative z-10 py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* ---- Left: copy ---- */}
            <div>
              {/* Eyebrow */}
              <p className="font-display text-[#E85D04] text-sm tracking-[0.35em] mb-4">
                CHANTILLY, VA &middot; LIMITED SPOTS EACH MONTH
              </p>

              {/* Dates badge + countdown */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <div className="inline-flex items-center gap-2 bg-[#E85D04]/10 border border-[#E85D04]/30 text-[#E85D04] text-xs font-bold tracking-[0.25em] uppercase px-4 py-2">
                  <Clock className="w-3 h-3" />
                  {startDate && endDate ? `${startDate} – ${endDate}` : endDate ? `Ends ${endDate}` : "Limited Time"}
                </div>
                {endDate && !soldOut && <CountdownTimer endDate={endDate} />}
              </div>

              {/* Headline */}
              <h1 className="font-display leading-none mb-5">
                <span className="block text-white text-5xl md:text-7xl">
                  How to Keep Your Factory Paint
                </span>
                <span className="block text-[#E85D04] text-5xl md:text-7xl">
                  Flawless for 10+ Years
                </span>
              </h1>

              {/* Subheadline */}
              <p className="text-zinc-300 text-lg leading-relaxed italic mb-6 max-w-lg">
                Without the constant worry &mdash; even if you daily-drive Northern Virginia&apos;s worst roads.
              </p>

              {/* SEO H2 -- visually subtle but crawlable */}
              <h2 className="text-zinc-400 text-xs tracking-widest uppercase mb-6 font-sans">
                {new Date().toLocaleString('default', { month: 'long' })} {new Date().getFullYear()} PPF Deal &mdash; Chantilly, VA
              </h2>

              {/* Social proof bar */}
              <div className="flex items-center gap-3 mb-8">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#E85D04] text-[#E85D04]" />
                  ))}
                </div>
                <span className="text-zinc-300 text-sm font-semibold">5.0</span>
                <span className="text-zinc-400 text-sm">&middot;</span>
                <span className="text-zinc-400 text-sm">140+ Google Reviews</span>
              </div>

              {/* Primary CTA */}
              {!soldOut ? (
                <div className="flex flex-col gap-3">
                  <Link
                    href={quoteUrl}
                    className="btn-sweep bg-[#E85D04] text-black font-display text-xl tracking-[0.1em] px-8 py-5 flex items-center justify-center gap-3 hover:bg-orange-600 transition-colors"
                  >
                    YES! PROTECT MY PAINT &mdash; CLAIM MY SPOT <ArrowRight className="w-5 h-5" />
                  </Link>
                  <p className="text-center text-zinc-400 text-xs tracking-wide">
                    No catch. Just flawless paint, guaranteed 12 years.
                  </p>
                </div>
              ) : (
                <WaitlistForm promoTitle={title} />
              )}
            </div>

            {/* ---- Right: availability + trust ---- */}
            <div className="space-y-6">
              {/* Progress box */}
              <div className="border border-zinc-800 bg-[#0D0D0D] p-8">
                <p className="text-[#E85D04] text-xs font-bold tracking-[0.3em] uppercase mb-6">
                  Availability{endDate ? ` -- Ends ${endDate}` : ""}
                </p>
                <ProgressBar filled={filledSlots.length} total={totalSlots} endDate={endDate} />
                {filledSlots.length > 0 && (
                  <div className="flex items-center gap-2 mt-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E85D04] animate-pulse" />
                    <span className="text-zinc-400 text-xs">
                      Last spot claimed recently &mdash; limited availability
                    </span>
                  </div>
                )}
                <p className="text-zinc-400 text-xs mt-3 leading-relaxed">
                  Spots are limited each month. Once they&apos;re gone, this deal is gone until next month&apos;s special.
                </p>
              </div>

              {/* Trust signals */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: Lock, label: "Price Locked", sub: "No hidden fees" },
                  { icon: Star, label: "5-Star Rated", sub: "140+ reviews" },
                  { icon: CheckCircle, label: "STEK Certified", sub: "12-yr warranty" },
                ].map(({ icon: Icon, label, sub }, i) => (
                  <div key={i} className="border border-zinc-800 bg-[#0D0D0D] p-4 text-center">
                    <Icon className="w-5 h-5 text-[#E85D04] mx-auto mb-2" />
                    <p className="text-white text-xs font-bold">{label}</p>
                    <p className="text-zinc-400 text-xs">{sub}</p>
                  </div>
                ))}
              </div>

              {/* Price preview */}
              <div className="border border-[#E85D04]/30 bg-[#E85D04]/5 p-6 relative overflow-hidden">
                {/* Savings badge */}
                {freeValue > 0 && (
                  <div className="absolute top-0 right-0 bg-[#E85D04] text-black font-display text-xs tracking-widest px-3 py-1.5">
                    YOU SAVE {fmt(freeValue)}
                  </div>
                )}
                <p className="text-[#E85D04] text-xs font-bold tracking-[0.3em] uppercase mb-3">Starting At</p>
                <div className="flex items-baseline gap-3 mb-1">
                  {freeValue > 0 && <span className="font-mono-brand text-zinc-400 text-xl line-through">{fmt(fullPrice)}</span>}
                  <span className="font-display text-[#E85D04] text-5xl">{fmt(Number(price) || 0)}</span>
                </div>
                <p className="text-zinc-400 text-sm mb-3">Full package price &mdash; everything included. No add-ons.</p>
                <div className="flex items-center gap-2 text-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-emerald-400 font-bold">{remaining > 0 ? "Spots are limited at this price" : "Sold out — join the waitlist"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          THE PROBLEM
      ================================================================ */}
      <section className="py-24 bg-[#0D0D0D]">
        <div className="container max-w-6xl">
          <div className="mb-16">
            <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">Sound Familiar?</p>
            <h2 className="font-display text-5xl md:text-6xl text-white leading-none">
              EVERY CAR OWNER IN NOVA<br />
              <span className="text-[#E85D04]">FACES THE SAME PROBLEM</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-zinc-800">
            {[
              {
                icon: AlertTriangle,
                title: "Rock Chips That Never Stop",
                body: "Route 28, the Dulles Toll Road, I-66 — Northern Virginia roads are brutal on paint. One highway drive and you've got three new chips on the hood. And they only get worse.",
              },
              {
                icon: Eye,
                title: "Swirl Marks From Every Wash",
                body: "Automated car washes, improper hand washing, even a microfiber cloth used wrong — swirl marks accumulate invisibly until you see them in direct sunlight. By then, the paint is already compromised.",
              },
              {
                icon: Clock,
                title: "The Regret of Waiting Too Long",
                body: "Every month you wait is another month of chips, swirls, and UV fade. Paint correction before PPF costs more the longer you wait. The car you bought new won't stay new on its own.",
              },
              {
                icon: AlertTriangle,
                title: "Cheap Film That Yellows and Peels",
                body: "Not all PPF is the same. Low-grade film yellows within 3 years, peels at the edges, and traps moisture. Removing it costs more than doing it right the first time.",
              },
            ].map(({ icon: Icon, title: t, body }, i) => (
              <div key={i} className="bg-[#0D0D0D] p-10">
                <Icon className="w-8 h-8 text-[#E85D04] mb-5" />
                <h3 className="font-display text-2xl text-white mb-3">{t}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          THE OFFER
      ================================================================ */}
      <section className="py-24 bg-[#0A0A0A]">
        <div className="container max-w-6xl">
          <div className="mb-16 text-center">
            <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">The Solution</p>
            <h2 className="font-display text-5xl md:text-6xl text-white leading-none">
              EVERYTHING YOUR CAR NEEDS.<br />
              <span className="text-[#E85D04]">ONE PACKAGE. ONE PRICE.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left: copy + price box */}
            <div>
              <p className="text-zinc-300 text-lg leading-relaxed mb-8">
                You pay for the {paidName}. {freeSentence ? `${freeSentence.charAt(0).toUpperCase()}${freeSentence.slice(1)}? Included free.` : ""} {freeValue > 0 ? `That's ${fmt(freeValue)} in work we throw in because it's the only way to do the job right.` : "One price, no add-ons."}
              </p>

              {/* Price box */}
              <div className="border border-zinc-800 bg-[#0D0D0D] p-8 mb-8">
                <p className="text-zinc-400 text-xs tracking-[0.3em] uppercase mb-3">Package Price</p>
                <div className="flex items-baseline gap-4 mb-2">
                  {freeValue > 0 && <span className="font-mono-brand text-zinc-400 text-2xl line-through">{fmt(fullPrice)}</span>}
                  <span className="font-display text-[#E85D04] text-6xl">{fmt(Number(price) || 0)}</span>
                </div>
                <p className="text-zinc-400 text-sm mb-4">{freeValue > 0 ? `You save ${fmt(freeValue)} off the full package price.` : "Everything included. No add-ons."}</p>
                <div className="flex items-center gap-2 text-zinc-400 text-xs">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  Price locked for {endDate ? `all bookings before ${endDate}` : "all slots this month"}
                </div>
              </div>

              {/* What you're paying for */}
              <div className="mb-6">
                <p className="text-white font-bold text-sm tracking-widest uppercase mb-4">What You&apos;re Paying For</p>
                <div className="border-l-2 border-[#E85D04] pl-5">
                  <p className="font-display text-xl text-white mb-1">{paidName}</p>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    Hood, fenders, mirrors, and front bumper in Stek DYNOshield. Self-healing, optically clear. Backed by our 12-Year No-Chip Promise.
                  </p>
                </div>
              </div>

              <Link
                href={quoteUrl}
                className="btn-sweep bg-[#E85D04] text-black font-display text-xl tracking-[0.1em] px-8 py-5 flex items-center justify-center gap-3 hover:bg-orange-600 transition-colors"
              >
                YES! PROTECT MY PAINT &mdash; CLAIM MY SPOT <ArrowRight className="w-5 h-5" />
              </Link>
              <p className="text-center text-zinc-400 text-xs tracking-wide mt-3">
                No catch. Just flawless paint, guaranteed 12 years.
              </p>
            </div>

            {/* Right: included free box */}
            <div className="border-2 border-[#E85D04]/50 bg-[#E85D04]/5 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-[#E85D04] text-black text-xs font-bold tracking-widest px-3 py-1.5">
                  INCLUDED FREE
                </div>
                <span className="font-mono-brand text-zinc-400 text-sm">{freeValue > 0 ? `${fmt(freeValue)} Value` : ""}</span>
              </div>
              <div className="space-y-5">
                {freeItems.map((f) => ({ name: f.name, sub: f.badge ?? "Included with this month's special", value: f.value })).map(({ name, sub, value }, i) => (
                  <div key={i} className="flex items-start justify-between gap-4 pb-5 border-b border-[#E85D04]/20 last:border-0 last:pb-0">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[#E85D04] shrink-0 mt-0.5" />
                      <div>
                        <p className="text-white font-semibold text-sm">{name}</p>
                        <p className="text-zinc-400 text-xs">{sub}</p>
                      </div>
                    </div>
                    <span className="font-mono-brand text-zinc-400 text-xs shrink-0">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          WHAT'S INCLUDED (detail cards) -- from DB includedServices
      ================================================================ */}
      <section className="py-24 bg-[#0D0D0D]">
        <div className="container max-w-6xl">
          <div className="mb-16 text-center">
            <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">The Full Package</p>
            <h2 className="font-display text-5xl md:text-6xl text-white">WHAT YOU GET</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-zinc-800">
            {/* PPF -- always shown */}
            <div className="bg-[#0D0D0D] p-10">
              <div className="w-12 h-12 bg-[#E85D04]/10 border border-[#E85D04]/30 flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-[#E85D04]" />
              </div>
              <h3 className="font-display text-3xl text-white mb-2">STEK DYNOshield PPF</h3>
              <p className="text-[#E85D04] text-xs font-bold tracking-widest uppercase mb-4">Full Front Coverage</p>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                The full front end of your vehicle &mdash; hood, front bumper, both fenders, side mirrors, and headlights &mdash; wrapped in STEK DYNOshield, the industry&apos;s most advanced self-healing paint protection film.
              </p>
              <ul className="space-y-2">
                {["Full hood", "Full front bumper", "Both fenders", "Side mirrors", "Headlights", "12-year manufacturer warranty"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-zinc-400 text-sm">
                    <CheckCircle className="w-4 h-4 text-[#E85D04] shrink-0" />{item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Paint Correction (only when the promo includes it) */}
            {hasCorrection && (
            <div className="bg-[#111] p-10 relative">
              <div className="absolute top-4 right-4 bg-[#E85D04] text-black text-xs font-bold tracking-widest px-2 py-1">FREE</div>
              <div className="w-12 h-12 bg-[#E85D04]/10 border border-[#E85D04]/30 flex items-center justify-center mb-6">
                <Sparkles className="w-6 h-6 text-[#E85D04]" />
              </div>
              <h3 className="font-display text-3xl text-white mb-2">Paint Correction</h3>
              <p className="text-[#E85D04] text-xs font-bold tracking-widest uppercase mb-4">Single-Stage Included</p>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                Before any film goes on, we machine polish the painted surfaces to remove swirl marks, light scratches, and water spot etching. We never trap imperfections under film.
              </p>
              <ul className="space-y-2">
                {["Machine polish", "Swirl removal", "Light scratch removal", "Water spot correction", "Surface decontamination", "Included at no charge"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-zinc-400 text-sm">
                    <CheckCircle className="w-4 h-4 text-[#E85D04] shrink-0" />{item}
                  </li>
                ))}
              </ul>
            </div>
            )}

            {/* Ceramic Coating (only when the promo includes it) */}
            {hasCeramic && (
            <div className="bg-[#0D0D0D] p-10 relative">
              <div className="absolute top-4 right-4 bg-[#E85D04] text-black text-xs font-bold tracking-widest px-2 py-1">FREE</div>
              <div className="w-12 h-12 bg-[#E85D04]/10 border border-[#E85D04]/30 flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-[#E85D04]" />
              </div>
              <h3 className="font-display text-3xl text-white mb-2">Ceramic Coating</h3>
              <p className="text-[#E85D04] text-xs font-bold tracking-widest uppercase mb-4">Full Vehicle Included</p>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                Applied over the PPF and across the entire vehicle, ceramic coating bonds to the surface at a molecular level &mdash; creating a hydrophobic, UV-resistant, self-cleaning barrier that makes maintenance effortless.
              </p>
              <ul className="space-y-2">
                {["Full vehicle application", "Hydrophobic top coat", "UV protection", "Enhanced gloss depth", "Self-cleaning properties", "Included at no charge"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-zinc-400 text-sm">
                    <CheckCircle className="w-4 h-4 text-[#E85D04] shrink-0" />{item}
                  </li>
                ))}
              </ul>
            </div>
            )}
          </div>
        </div>
      </section>

      {/* ================================================================
          GUARANTEES
      ================================================================ */}
      <section className="py-24 bg-[#0A0A0A]">
        <div className="container max-w-6xl">
          <div className="mb-16">
            <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">Our Promises</p>
            <h2 className="font-display text-5xl md:text-6xl text-white leading-none">
              THREE GUARANTEES<br />
              <span className="text-[#E85D04]">NO ONE ELSE OFFERS</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                number: "01",
                title: "Walk-and-Pay Guarantee",
                body: "Before you pay the balance, we walk every panel with you under high-intensity lighting. If anything isn't right — an edge lifting, a bubble, anything — we fix it before you pay. If you're not satisfied, you don't pay.",
              },
              {
                number: "02",
                title: "The 12-Year No-Chip Promise",
                body: "If a rock chips the paint under our film — through intact, untampered film, from normal road driving — we don't just replace the film. We repaint the panel, free. Film and paint, for as long as you own the car.",
              },
              {
                number: "03",
                title: "Limited Monthly Spots",
                body: "We only take a set number of cars each month so every one is done right. This isn't a marketing gimmick — it's how we maintain the standard that earned us 140+ five-star reviews.",
              },
            ].map(({ number, title: t, body }, i) => (
              <div key={i} className="border border-zinc-800 bg-[#0D0D0D] p-8 relative overflow-hidden">
                <span className="font-display text-8xl text-zinc-900 absolute -top-2 -right-2 leading-none select-none">
                  {number}
                </span>
                <div className="relative z-10">
                  <div className="w-10 h-0.5 bg-[#E85D04] mb-6" />
                  <h3 className="font-display text-2xl text-white mb-4">{t}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          4-STEP PROCESS
      ================================================================ */}
      <section className="py-24 bg-[#0D0D0D]">
        <div className="container max-w-6xl">
          <div className="mb-16 text-center">
            <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">How It Works</p>
            <h2 className="font-display text-5xl md:text-6xl text-white">THE PROCESS</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-zinc-800">
            {[
              {
                step: "01",
                icon: Wrench,
                title: "Decontamination",
                body: "Full wash, iron decontamination, clay bar treatment. Every contaminant removed before a single tool touches the paint.",
              },
              hasCorrection
                ? {
                    step: "02",
                    icon: Sparkles,
                    title: "Paint Correction",
                    body: "Machine polish to remove swirl marks, light scratches, and water spots. We never trap imperfections under film.",
                  }
                : {
                    step: "02",
                    icon: Sparkles,
                    title: "Surface Prep",
                    body: "Clay bar, iron removal, and a panel-by-panel inspection under the lights so nothing gets trapped under the film.",
                  },
              {
                step: "03",
                icon: Layers,
                title: "PPF Install",
                body: "Stek DYNOshield applied to the full front end. Computer-cut patterns, no bulk edges, optically clear finish.",
              },
              hasCeramic
                ? {
                    step: "04",
                    icon: Shield,
                    title: "Ceramic + Inspection",
                    body: "Ceramic coating applied over the PPF and across the full vehicle. Final walk-and-pay inspection under high-intensity lighting.",
                  }
                : {
                    step: "04",
                    icon: Shield,
                    title: "Final Inspection",
                    body: "Every edge and panel checked with you under high-intensity lighting before you pay a dime.",
                  },
            ].map(({ step, icon: Icon, title: t, body }, i) => (
              <div key={i} className="bg-[#0D0D0D] p-8 text-center">
                <div className="font-display text-5xl text-[#E85D04] mb-4">{step}</div>
                <div className="w-12 h-12 bg-[#E85D04]/10 border border-[#E85D04]/30 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-[#E85D04]" />
                </div>
                <h3 className="font-display text-2xl text-white mb-3">{t}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <p className="text-zinc-400 text-sm">Total install time: <strong className="text-white">2&ndash;3 days</strong></p>
          </div>
        </div>
      </section>

      {/* ================================================================
          BEFORE / AFTER + REVIEW
      ================================================================ */}
      <section className="py-24 bg-[#0D0D0D]">
        <div className="container max-w-6xl">
          <div className="mb-12 text-center">
            <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">What Our Customers Say</p>
            <h2 className="font-display text-5xl md:text-6xl text-white leading-none">
              REAL REVIEWS<br />
              <span className="text-[#E85D04]">FROM REAL CUSTOMERS</span>
            </h2>
          </div>
          <div className="max-w-2xl mx-auto flex flex-col gap-6">
            <ReviewSnippet />
            <div className="border border-zinc-800 bg-[#0D0D0D] p-6">
              <p className="text-white font-bold text-sm mb-2">Ready to protect your paint?</p>
              <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                Join the {filledSlots.length} customers who&apos;ve already claimed their spot this month.
              </p>
              {!soldOut ? (
                <Link href={quoteUrl} className="inline-flex items-center gap-2 bg-[#E85D04] text-black font-display text-sm tracking-widest uppercase px-6 py-3 hover:bg-orange-600 transition-colors">
                  Claim My Spot <ArrowRight className="w-4 h-4" />
                </Link>
              ) : (
                <a href="#waitlist" className="inline-flex items-center gap-2 border border-[#E85D04] text-[#E85D04] font-display text-sm tracking-widest uppercase px-6 py-3 hover:bg-[#E85D04]/10 transition-colors">
                  Join Waitlist <ArrowRight className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          CUSTOMER GALLERY (live slots from DB)
      ================================================================ */}
      <section className="py-24 bg-[#0A0A0A]">
        <div className="container max-w-6xl">
          <div className="mb-12">
            <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">Real Customers, Real Cars</p>
            <h2 className="font-display text-5xl md:text-6xl text-white">
              WHO&apos;S ALREADY IN
            </h2>
            <p className="text-zinc-400 mt-3 text-sm">
              Every completed car is verified by our team. Spots are limited &mdash; claim yours before {endDate || "they run out"}.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filledSlots.map((slot) => (
              <SlotCard
                key={slot.slotNumber}
                slotNumber={slot.slotNumber}
                customerName={slot.customerName}
                carDescription={slot.carDescription}
                photoUrl={slot.photoUrl}
                promoTitle={title}
              />
            ))}
            {!soldOut && <EmptySlotCard slotNumber={filledSlots.length + 1} quoteUrl={quoteUrl} />}
          </div>
        </div>
      </section>

      {/* ================================================================
          STEK CALLOUT
      ================================================================ */}
      <section className="py-16 bg-[#0D0D0D] border-y border-zinc-900">
        <div className="container max-w-4xl text-center">
          <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">The Film</p>
          <h2 className="font-display text-5xl text-white mb-4">STEK DYNOshield</h2>
          <p className="text-zinc-400 text-lg leading-relaxed max-w-2xl mx-auto mb-8">
            Not all PPF is the same. STEK DYNOshield is a premium thermoplastic polyurethane film with a self-healing top coat, hydrophobic surface, and optical clarity that makes it virtually invisible on your paint. Backed by a{" "}
            <strong className="text-white">12-year manufacturer warranty</strong> against yellowing, cracking, peeling, and delamination.
          </p>
          <Link href="/services/ppf" className="text-[#E85D04] font-bold tracking-widest uppercase text-sm underline underline-offset-2 decoration-1 hover:decoration-2 flex items-center justify-center gap-2">
            Learn more about our PPF installation <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ================================================================
          FAQ
      ================================================================ */}
      <section className="py-24 bg-[#0A0A0A]">
        <div className="container max-w-4xl">
          <div className="mb-16 text-center">
            <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">Questions</p>
            <h2 className="font-display text-5xl md:text-6xl text-white">FREQUENTLY ASKED</h2>
          </div>
          <FaqAccordion items={faqItems} />
        </div>
      </section>

      {/* ================================================================
          LAST MONTH STRIP (shows previous archived promo)
      ================================================================ */}
      <div id="last-month">
        <LastMonthStrip />
      </div>

      {/* ================================================================
          FINAL CTA
      ================================================================ */}
      <section className="py-24 bg-[#E85D04]">
        <div className="container max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 bg-black/20 text-white text-xs font-bold tracking-[0.3em] uppercase px-4 py-2 mb-6">
            <Clock className="w-3 h-3" />
            {soldOut ? "Sold Out -- Join the Waitlist" : "Spots Are Limited"}
          </div>
          <h2 className="font-display text-5xl md:text-7xl text-white mb-4 leading-none">
            DON&apos;T MISS THIS
          </h2>
          <p className="text-orange-100 text-lg mb-4 max-w-xl mx-auto">
            {tagline || `Starting at $${price}. This deal disappears when the last slot is claimed.`}
          </p>
          <p className="text-orange-200/70 text-sm mb-10">
            Skyline Customs &mdash; Chantilly, VA &middot; (703) 775-4383
          </p>
          {soldOut ? (
            <div className="max-w-xl mx-auto">
              <WaitlistForm promoTitle={title} />
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href={quoteUrl}
                className="bg-white text-[#E85D04] hover:bg-zinc-100 font-display text-xl tracking-[0.1em] px-10 py-5 transition-all duration-200 hover:scale-105 flex items-center justify-center gap-2"
              >
                YES! PROTECT MY PAINT <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="tel:+17037754383"
                className="border-2 border-white text-white hover:bg-white hover:text-[#E85D04] font-display text-xl tracking-[0.1em] px-10 py-5 transition-all duration-200 text-center"
              >
                CALL (703) 775-4383
              </a>
            </div>
          )}
          <p className="text-orange-200/60 text-xs mt-6 tracking-wide">
            No catch. Just flawless paint, guaranteed 12 years.
          </p>
        </div>
      </section>

      <Footer />

      {/* ================================================================
          STICKY MOBILE CTA BAR (only on mobile, hides on md+)
      ================================================================ */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[#0A0A0A] border-t border-zinc-800 p-3 flex items-center gap-3 shadow-2xl">
        <div className="flex-1 min-w-0">
          {soldOut ? (
            <p className="text-red-400 text-xs font-bold tracking-wide uppercase truncate">All slots filled</p>
          ) : (
            <>
              <p className="text-[#E85D04] text-xs font-bold tracking-wide uppercase">
                {`Spots are limited at $${price}`}
              </p>
              {endDate && <CountdownTimer endDate={endDate} />}
            </>
          )}
        </div>
        {soldOut ? (
          <a
            href="#waitlist"
            className="shrink-0 bg-zinc-700 text-white font-display text-sm tracking-widest px-5 py-3"
          >
            JOIN WAITLIST
          </a>
        ) : (
          <a
            href={quoteUrl}
            className="shrink-0 bg-[#E85D04] text-black font-display text-sm tracking-widest px-5 py-3 hover:bg-orange-600 transition-colors"
          >
            CLAIM MY SPOT
          </a>
        )}
      </div>
    </div>
  );
}
