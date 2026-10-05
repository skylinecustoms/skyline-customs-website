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
import { track, trackLead } from "@/lib/analytics";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import PromoQuoteForm, { promoTagFor } from "@/components/PromoQuoteForm";
import ExitPrompt from "@/components/ExitPrompt";
import ReviewWall from "@/components/ReviewWall";
import VideoCarousel from "@/components/VideoCarousel";
import CoverageDiagram from "@/components/CoverageDiagram";
import { videosByCategory } from "@/lib/videos";
import { reelsByCategory } from "@/lib/instagramPosts";
import { promoExtrasFor, type PromoGiveaway } from "@/lib/promoExtras";
import { Link } from "wouter";
import { toast } from "sonner";
import {
  Shield, Sparkles, Zap, CheckCircle, ArrowRight, Clock,
  Star, Lock, ChevronDown, AlertTriangle, Eye, Wrench, Layers, Mail, Phone, Car, Gift
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
          IN THE DRAWING
        </div>
        <div className="absolute top-3 right-3 bg-black/70 text-emerald-400 text-xs font-bold tracking-wide px-2 py-1 flex items-center gap-1">
          <CheckCircle className="w-3 h-3" /> JOB DONE
        </div>
      </div>
      <div className="p-4">
        <p className="text-white font-semibold text-sm mb-1">{customerName}</p>
        <p className="text-zinc-400 text-xs leading-relaxed">{carDescription}</p>
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
// ---- FAQ Accordion -----------------------------------------------------------
interface FaqItem { q: string; a: string }

/** FAQ copy follows the active promo: price, what is included free, and whether paint correction is part of it. */
function buildFaq(price: string, freeItems: IncludedService[], hasCorrection: boolean, giveaway?: PromoGiveaway): FaqItem[] {
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
    q: "Do you offer payment plans?",
    a: "Yes. We take Klarna, Afterpay, and Affirm, so you can split the total into payments instead of paying it all at pickup. Ask when you book and we send you the link. Approval and terms are set by the plan provider.",
  });
  items.push({
    q: "Is there a deposit for the special?",
    a: `Yes. Once you approve your quote, a 20% deposit reserves your install date and locks in the ${priceText} price. It goes toward your total, so you pay the remaining balance at pickup after the walk-and-pay inspection. The deposit is fully refundable at any time, no questions asked.`,
  });
  if (giveaway) {
    items.push({
      q: `How does the ${giveaway.name} work?`,
      a: `${giveaway.rules[0]} ${giveaway.rules[1]} ${giveaway.prize}`,
    });
    items.push({
      q: "Do I have to book to enter the giveaway?",
      a: giveaway.rules.find((r) => /no purchase/i.test(r)) ?? "No purchase is necessary. See the giveaway rules on this page for the free entry route.",
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
/** "31 days left" / "Last day" for tight spaces like the mobile bar. */
function timeLeftLabel(endDate: string): string {
  const target = new Date(endDate.replace(/(\d+)(st|nd|rd|th)\b/gi, "$1"));
  if (isNaN(target.getTime())) return "";
  target.setHours(23, 59, 59, 999);
  const days = Math.ceil((target.getTime() - Date.now()) / 86_400_000);
  if (days <= 0) return "Ends today";
  if (days === 1) return "Last day";
  return `${days} days left`;
}

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
      trackLead("promo_waitlist", "ppf");
      toast.success("You're on the waitlist!", {
        description: "We'll reach out as soon as a slot opens up.",
        duration: 6000,
      });
    },
    onError: (err) => {
      track("form_error", { form_id: "promo-waitlist", error_message: String(err.message).slice(0, 100) });
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

      <form onSubmit={handleSubmit} data-form="promo-waitlist" className="space-y-5">
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
  if (filledCount === 0) return null; // nothing to show off yet
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
  if (filledCount === 0) return null; // nothing to show off yet
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
  const { giveaway, heroVideo } = promoExtrasFor(promo?.slug);
  // Every "claim" button scrolls to the form embedded below the hero (see #claim).
  const quoteUrl = "#claim";

  // One primary and one secondary button style for the whole page (item 9).
  const BTN = "inline-flex items-center justify-center gap-2 font-display text-lg md:text-xl tracking-[0.1em] uppercase px-8 py-4 md:py-5 transition-colors";
  const BTN_PRIMARY = `${BTN} bg-[#E85D04] text-black hover:bg-orange-600`;
  const BTN_SECONDARY = `${BTN} border border-zinc-600 text-white hover:border-[#E85D04] hover:text-[#E85D04]`;
  // Same shapes on the orange sections.
  const BTN_ON_ORANGE = `${BTN} bg-black text-white hover:bg-zinc-900`;
  const BTN_ON_ORANGE_OUTLINE = `${BTN} border border-black/60 text-black hover:bg-black hover:text-white`;
  const FINE_PRINT = "text-zinc-400 text-xs tracking-wide";

  // Every in-page link (#claim, #giveaway) glides to its section instead of jumping,
  // and landing on the form focuses the first field so the visitor can start typing.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey) return;
      const a = (e.target as Element | null)?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      const id = a?.getAttribute("href")?.slice(1);
      const el = id ? document.getElementById(id) : null;
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", `#${id}`);
      if (id === "claim") {
        window.setTimeout(() => {
          el.querySelector<HTMLInputElement>("form input:not([type=checkbox])")?.focus({ preventScroll: true });
        }, 800);
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
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
  const faqItems = buildFaq(price, freeItems, hasCorrection, giveaway);
  const paidName = paidItems[0]?.name ?? "STEK DYNOshield Full Front PPF";
  const freeNames = freeItems.map((f) => f.name.toLowerCase());
  const freeSentence = freeNames.length === 0 ? "" : freeNames.length === 1 ? freeNames[0] : `${freeNames.slice(0, -1).join(", ")} and ${freeNames[freeNames.length - 1]}`;


  // Same title and description the server renders (server/_core/ssrMeta.ts), so the tab title and analytics match the crawled page.
  const shortTagline = tagline.replace(/\s*[—-]\s*Spots Are Limited\.?$/i, "").trim();
  const seoTitle = promo ? `${title}: Full Front PPF Deal in Chantilly, VA` : "This Month's Special | Full Front PPF Deal | Skyline Customs";
  const seoDesc = promo
    ? `${shortTagline}. Limited spots${endDate ? `, ends ${endDate}` : ""}. STEK DYNOshield full front PPF, 12-year warranty, at Skyline Customs in Chantilly, VA.`.slice(0, 165)
    : "See this month's limited-spot special on full front paint protection film and ceramic coating at Skyline Customs in Chantilly, VA.";

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
          "streetAddress": "4215 Walney Rd Suite 1A & B",
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
      "brand": { "@type": "Brand", "name": "STEK" },
      "category": "Paint Protection Film",
      "image": ["https://www.skylinecustomshop.com/images/w/2026-corvette-c8-z06-full-front-ppf-ceramic-coating-chantilly-va-960.webp"],
      "aggregateRating": { "@type": "AggregateRating", "ratingValue": "5.0", "reviewCount": "146", "bestRating": "5" },
      "offers": {
        "@type": "Offer",
        "name": `${title}: full front PPF${freeSentence ? ` with free ${freeSentence}` : ""}`,
        "priceCurrency": "USD",
        "price": price,
        "priceSpecification": freeValue > 0 ? { "@type": "UnitPriceSpecification", "priceType": "https://schema.org/StrikethroughPrice", "price": String(fullPrice), "priceCurrency": "USD" } : undefined,
        "validFrom": safeIsoDate(startDate) ?? undefined,
        "validThrough": safeIsoDate(endDate) ?? undefined,
        "priceValidUntil": safeIsoDate(endDate) ?? undefined,
        "availability": soldOut
          ? "https://schema.org/SoldOut"
          : "https://schema.org/LimitedAvailability",
        "itemCondition": "https://schema.org/NewCondition",
        "url": canonicalUrl,
        "areaServed": ["Chantilly, VA", "Fairfax County, VA", "Loudoun County, VA", "Northern Virginia"],
        "seller": { "@type": "AutoBodyShop", "name": "Skyline Customs", "telephone": "+1-703-775-4383", "url": "https://www.skylinecustomshop.com" }
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
      {!soldOut && <ExitPrompt promoTitle={title} promoTag={promoTagFor(title, slug)} />}
      <Navbar />

      {/* ================================================================
          "WE DID IT AGAIN" SOCIAL PROOF BANNER
          Shows last month's sell-out + quick link to last month's cars
      ================================================================ */}
      <WeDidItAgainBanner />

      {/* ================================================================
          HERO
      ================================================================ */}
      <section className="relative overflow-hidden bg-[#0A0A0A]">
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

        <div className="container max-w-6xl relative z-10 pt-24 pb-14 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* ---- Left: copy ---- */}
            <div>
              {/* One eyebrow line: the deal, the town, the deadline. Doubles as the crawlable H2. */}
              <h2 className="font-display text-[#E85D04] text-sm tracking-[0.3em] uppercase mb-3">
                {title.replace(/\s*special$/i, "")} {new Date().getFullYear()} PPF Deal &middot; Chantilly, VA{endDate ? ` · Ends ${endDate}` : ""}
              </h2>
              {endDate && !soldOut && <div className="mb-6"><CountdownTimer endDate={endDate} /></div>}

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
              <p className="text-zinc-300 text-lg leading-relaxed italic mb-7 max-w-lg">
                Without the constant worry &mdash; even if you daily-drive Northern Virginia&apos;s worst roads.
              </p>

              {/* Primary CTA, above the fold on every screen */}
              {!soldOut ? (
                <div className="mb-7 max-w-lg">
                  <a href={quoteUrl} data-cta="promo-claim" className={`${BTN_PRIMARY} w-full`}>
                    YES! PROTECT MY PAINT <ArrowRight className="w-5 h-5" />
                  </a>
                  <p className={`${FINE_PRINT} text-center mt-3`}>
                    {fmt(Number(price) || 0)} all in. Fully refundable 20% deposit, guaranteed 12 years. Pay over time with Klarna, Afterpay, or Affirm.
                  </p>
                </div>
              ) : (
                <div className="mb-7 max-w-lg"><WaitlistForm promoTitle={title} /></div>
              )}

              {/* Social proof bar */}
              <div className="flex items-center gap-3 mb-7">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#E85D04] text-[#E85D04]" />
                  ))}
                </div>
                <span className="text-zinc-300 text-sm font-semibold">5.0</span>
                <span className="text-zinc-400 text-sm">&middot;</span>
                <span className="text-zinc-400 text-sm">140+ Google reviews &middot; 700+ five-star reviews across all platforms</span>
              </div>

              {giveaway && (
                <a href="#giveaway" className="flex items-center gap-4 border border-[#E85D04]/50 bg-[#E85D04]/10 text-white px-5 py-4 max-w-lg hover:bg-[#E85D04]/20 transition-colors group">
                  <Gift className="w-8 h-8 shrink-0 text-[#E85D04]" strokeWidth={1.75} />
                  <span>
                    <span className="block font-display text-2xl leading-none tracking-wide">WIN FULL BODY PPF</span>
                    <span className="block text-sm text-zinc-300 mt-1">Every completed job is entered. One winner, drawn {giveaway.drawingDate}. <span className="text-[#E85D04] underline underline-offset-2 group-hover:decoration-2">How it works</span></span>
                  </span>
                </a>
              )}

              {heroVideo && (heroVideo.youtubeId || heroVideo.mp4) && (
                <div className="mt-7 max-w-lg">
                  <div className="aspect-video bg-black border border-zinc-800 overflow-hidden">
                    {heroVideo.youtubeId ? (
                      <iframe
                        src={`https://www.youtube-nocookie.com/embed/${heroVideo.youtubeId}?rel=0&modestbranding=1&playsinline=1`}
                        title={heroVideo.caption ?? `${title} video`}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    ) : (
                      <video src={heroVideo.mp4} poster={heroVideo.poster} controls playsInline preload="metadata" className="w-full h-full object-contain bg-black" />
                    )}
                  </div>
                  {heroVideo.caption && <p className="text-zinc-400 text-xs mt-2 tracking-wide">{heroVideo.caption}</p>}
                </div>
              )}
            </div>

            {/* ---- Right: price card + trust ---- */}
            <div className="space-y-4">
              <div className="border border-[#E85D04]/40 bg-[#E85D04]/5 p-6 md:p-8 relative overflow-hidden">
                {freeValue > 0 && (
                  <div className="absolute top-0 right-0 bg-[#E85D04] text-black font-display text-xs tracking-widest px-3 py-1.5">
                    FREE CERAMIC COATING
                  </div>
                )}
                <p className="text-[#E85D04] text-xs font-bold tracking-[0.3em] uppercase mb-3">Package price</p>
                <div className="flex items-baseline gap-3 mb-2">
                  {freeValue > 0 && <span className="font-mono-brand text-zinc-400 text-xl line-through">{fmt(fullPrice)}</span>}
                  <span className="font-display text-[#E85D04] text-6xl leading-none">{fmt(Number(price) || 0)}</span>
                </div>
                <p className="text-white font-semibold text-base mb-1">{paidName}{freeSentence ? ` + free ${freeSentence}` : ""}</p>
                <p className="text-zinc-400 text-sm mb-1">Everything included. No add-ons. Price locked{endDate ? ` through ${endDate}` : " for this special"}.</p>
                <p className="text-[#E85D04] text-sm font-semibold mb-5">Pay over time with Klarna, Afterpay, or Affirm.</p>
                <ul className="space-y-2 text-sm text-zinc-300 mb-6">
                  {[
                    `${paidName} with the 12-year manufacturer warranty`,
                    ...(freeSentence ? [`${freeSentence.charAt(0).toUpperCase()}${freeSentence.slice(1)} at no charge`] : []),
                    "Walk-and-pay: inspect every panel before you pay the balance",
                    ...(giveaway ? ["Entered to win full body PPF"] : []),
                  ].map((line) => (
                    <li key={line} className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-[#E85D04] mt-0.5 shrink-0" />{line}</li>
                  ))}
                </ul>
                {!soldOut ? (
                  <a href={quoteUrl} data-cta="promo-claim" className={`${BTN_PRIMARY} w-full`}>
                    Claim my spot <ArrowRight className="w-5 h-5" />
                  </a>
                ) : (
                  <a href="#claim" className={`${BTN_SECONDARY} w-full`}>Join the waitlist <ArrowRight className="w-5 h-5" /></a>
                )}
                <p className="flex items-center justify-center gap-2 text-xs mt-3">
                  <span className={`w-2 h-2 rounded-full ${soldOut ? "bg-red-400" : "bg-emerald-400 animate-pulse"}`} />
                  <span className={`font-bold ${soldOut ? "text-red-400" : "text-emerald-400"}`}>{soldOut ? "Sold out this month" : "Limited spots"}</span>
                  {endDate && <span className="text-zinc-400">&middot; Ends {endDate}</span>}
                </p>
              </div>

              {/* Trust signals */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: Lock, label: "Price Locked", sub: "No hidden fees" },
                  { icon: Star, label: "5-Star Rated", sub: "700+ reviews, all platforms" },
                  { icon: CheckCircle, label: "STEK Certified", sub: "12-yr warranty" },
                ].map(({ icon: Icon, label, sub }, i) => (
                  <div key={i} className="border border-zinc-800 bg-[#0D0D0D] p-4 text-center">
                    <Icon className="w-5 h-5 text-[#E85D04] mx-auto mb-2" />
                    <p className="text-white text-xs font-bold">{label}</p>
                    <p className="text-zinc-400 text-xs">{sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          GIVEAWAY BAND (right under the hero so nobody misses the prize)
      ================================================================ */}
      {giveaway && (
        <section className="bg-[#E85D04] text-black">
          <div className="container max-w-6xl py-5 md:py-6 flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
            <div className="flex items-center gap-4">
              <Gift className="w-10 h-10 shrink-0" strokeWidth={1.75} />
              <div>
                <p className="font-display text-3xl md:text-4xl leading-none tracking-wide">WIN FULL BODY PPF</p>
                <p className="text-black/80 text-sm md:text-base mt-1">Every completed {title} job is entered. One winner drawn {giveaway.drawingDate}.</p>
              </div>
            </div>
            <a href="#giveaway" className={`${BTN_ON_ORANGE} md:ml-auto shrink-0`}>
              See the prize <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </section>
      )}

      {/* ================================================================
          THE PROBLEM
      ================================================================ */}
      <section className="py-16 md:py-24 bg-[#0D0D0D]">
        <div className="container max-w-6xl">
          <div className="mb-10 md:mb-16">
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
              <div key={i} className="bg-[#0D0D0D] p-6 md:p-10">
                <Icon className="w-8 h-8 text-[#E85D04] mb-4 md:mb-5" />
                <h3 className="font-display text-2xl text-white mb-3">{t}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          WATCH BEFORE YOU BUY (PPF videos in objection order)
      ================================================================ */}
      <section className="py-16 md:py-24 bg-[#0A0A0A] overflow-hidden">
        <div className="container max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8 md:mb-10">
            <div>
              <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">Watch before you buy</p>
              <h2 className="font-display text-5xl md:text-6xl text-white leading-none">
                SEE IT BEFORE<br /><span className="text-[#E85D04]">YOU DECIDE</span>
              </h2>
              <p className="text-zinc-400 mt-4 max-w-2xl">
                Every education video from the shop, newest first: where chips actually land, why factory paint is not enough, what the film survives, whether you can see it, and how we prep every car. Tap any one to watch with sound.
              </p>
            </div>
            <Link href="/videos" className={`${BTN_SECONDARY} shrink-0 self-start md:self-auto`}>
              All videos <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          <VideoCarousel videos={videosByCategory("learn")} reels={reelsByCategory("learn")} preview autoAdvanceMs={12_000} />
        </div>
      </section>

      {/* ================================================================
          THE OFFER
      ================================================================ */}
      <section className="py-16 md:py-24 bg-[#140C07] border-y border-[#E85D04]/30">
        <div className="container max-w-6xl">
          <div className="mb-10 md:mb-16 text-center">
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
                <p className="text-zinc-400 text-sm mb-4">{freeValue > 0 ? `${fmt(fullPrice)} of work for ${fmt(Number(price) || 0)}. The ceramic coating is included at no charge.` : "Everything included. No add-ons."}</p>
                <div className="flex items-center gap-2 text-zinc-400 text-xs">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  Price locked for {endDate ? `all bookings before ${endDate}` : "all slots this month"}
                </div>
                <div className="flex items-center gap-2 text-zinc-400 text-xs mt-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  Pay over time with Klarna, Afterpay, or Affirm.
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

              <a href={quoteUrl} data-cta="promo-claim" className={`${BTN_PRIMARY} w-full`}>
                YES! PROTECT MY PAINT <ArrowRight className="w-5 h-5" />
              </a>
              <p className={`${FINE_PRINT} text-center mt-3`}>
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
          GIVEAWAY (from lib/promoExtras.ts) + who's in the drawing
      ================================================================ */}
      {giveaway && (
        <section id="giveaway" className="py-16 md:py-24 bg-[#0A0A0A] scroll-mt-24">
          <div className="container max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-12 items-start mb-12 md:mb-16">
              <div className="lg:col-span-3">
                <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">Plus, this season only</p>
                <h2 className="font-display text-5xl md:text-6xl text-white leading-none mb-5">
                  EVERY JOB IS AN ENTRY.<br /><span className="text-[#E85D04]">ONE CAR WINS FULL BODY PPF.</span>
                </h2>
                <p className="text-zinc-300 text-lg leading-relaxed mb-6">
                  Book the {title}, get your car done, and you're in the drawing. {giveaway.prize} Winner drawn {giveaway.drawingDate}.
                </p>
                <ul className="space-y-3 text-sm text-zinc-300">
                  {[
                    "Finish a Fall Special job and your entry is automatic. Nothing to sign up for.",
                    "Your car and first name go up in the drawing below, so you can see who you're up against.",
                    `We draw one winner on ${giveaway.drawingDate}, announce it on Instagram, and call you.`,
                  ].map((line) => (
                    <li key={line} className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-[#E85D04] mt-0.5 shrink-0" />{line}</li>
                  ))}
                </ul>
                {!soldOut && (
                  <a href={quoteUrl} data-cta="promo-claim" className={`${BTN_PRIMARY} mt-8 w-full sm:w-auto`}>
                    Get in the drawing <ArrowRight className="w-5 h-5" />
                  </a>
                )}
              </div>
              <div className="lg:col-span-2 bg-[#E85D04] text-black p-8 relative overflow-hidden">
                <Gift className="absolute -right-6 -bottom-6 w-40 h-40 text-black/10" strokeWidth={1} />
                <p className="text-xs font-bold tracking-[0.3em] uppercase mb-3 text-black/70">The prize</p>
                <p className="font-display text-5xl leading-none mb-4">FULL BODY PPF,<br />ON US</p>
                <p className="text-black/80 text-sm leading-relaxed mb-5 relative">Every painted panel wrapped in self-healing STEK DYNOshield with the 12-year warranty. Same film, same walk-and-pay inspection, no invoice.</p>
                <p className="text-black/70 text-xs font-bold tracking-wide uppercase relative">One winner · Drawing {giveaway.drawingDate} · Rules below</p>
              </div>
            </div>

            <div className="mb-8">
              <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">Real customers, real cars</p>
              <h3 className="font-display text-4xl md:text-5xl text-white">{giveaway.entriesHeading}</h3>
              <p className="text-zinc-400 mt-3 text-sm max-w-2xl">
                {filledSlots.length > 0
                  ? "Every car here finished its Fall Special and is in the drawing. Spots are limited, so the list stays short."
                  : "The first finished cars of the season go up here, with the owner in front of the car. Book early and you're first in the drawing."}
              </p>
            </div>
            {filledSlots.length > 0 && (
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
              </div>
            )}

            <details className="mt-12 border border-zinc-800 bg-[#0A0A0A] group">
              <summary className="cursor-pointer list-none px-6 py-4 flex items-center justify-between text-zinc-300 text-sm font-bold tracking-widest uppercase">
                {giveaway.name} official rules
                <ChevronDown className="w-4 h-4 text-[#E85D04] transition-transform group-open:rotate-180" />
              </summary>
              <ol className="px-6 pb-6 space-y-2 text-zinc-400 text-sm leading-relaxed list-decimal list-inside">
                {giveaway.rules.map((r) => <li key={r}>{r}</li>)}
              </ol>
            </details>
          </div>
        </section>
      )}

      {/* ================================================================
          WHAT'S INCLUDED: coverage map, photo cards, value math
      ================================================================ */}
      <section className="py-16 md:py-24 bg-[#0D0D0D]">
        <div className="container max-w-6xl">
          <div className="mb-10 md:mb-14 text-center">
            <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">The Full Package</p>
            <h2 className="font-display text-5xl md:text-6xl text-white">WHAT YOU GET</h2>
            <p className="text-zinc-400 mt-4 max-w-2xl mx-auto">Exactly what gets wrapped{hasCeramic ? ", what gets coated," : ""} and what it is worth.</p>
          </div>

          {/* Coverage map + legend */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center border border-zinc-800 bg-[#0A0A0A] p-6 md:p-10 mb-10 md:mb-12">
            <div className="lg:col-span-5">
              <CoverageDiagram ceramic={hasCeramic} className="w-full max-w-sm mx-auto lg:max-w-none" />
            </div>
            <div className="lg:col-span-7 space-y-6">
              <div className="flex gap-4">
                <span className="mt-1 w-5 h-5 shrink-0 bg-[#E85D04]" aria-hidden="true" />
                <div>
                  <p className="font-display text-2xl text-white leading-none mb-1">{paidName}</p>
                  <p className="text-zinc-400 text-sm leading-relaxed">Hood, front bumper, both fenders, mirrors, and headlights, the panels that take every rock chip, in self-healing STEK DYNOshield with the 12-year manufacturer warranty.</p>
                </div>
              </div>
              {hasCeramic && (
                <div className="flex gap-4">
                  <span className="mt-1 w-5 h-5 shrink-0 border border-zinc-500 bg-white/15" aria-hidden="true" />
                  <div>
                    <p className="font-display text-2xl text-white leading-none mb-1">Ceramic coating <span className="text-[#E85D04] text-sm tracking-widest align-middle ml-1">FREE</span></p>
                    <p className="text-zinc-400 text-sm leading-relaxed">Every painted panel on the car, over the film too. Water beads off, UV cannot fade it, and a wash takes ten minutes.</p>
                  </div>
                </div>
              )}
              {hasCorrection && (
                <div className="flex gap-4">
                  <Sparkles className="mt-1 w-5 h-5 shrink-0 text-[#E85D04]" aria-hidden="true" />
                  <div>
                    <p className="font-display text-2xl text-white leading-none mb-1">Paint correction <span className="text-[#E85D04] text-sm tracking-widest align-middle ml-1">FREE</span></p>
                    <p className="text-zinc-400 text-sm leading-relaxed">A machine polish before any film goes on, so swirls and light scratches never get sealed underneath.</p>
                  </div>
                </div>
              )}
              <p className="text-zinc-500 text-xs tracking-wide">Computer-cut patterns, edges wrapped under the hood and bumper. No visible lines.</p>
            </div>
          </div>

          {/* Photo cards */}
          <div className={`grid grid-cols-1 gap-5 ${hasCorrection && hasCeramic ? "md:grid-cols-3" : hasCorrection || hasCeramic ? "md:grid-cols-2" : "md:grid-cols-1 max-w-2xl mx-auto"}`}>
            {[
              {
                photo: "/images/w/2026-corvette-c8-z06-full-front-ppf-ceramic-coating-chantilly-va-960.webp",
                alt: "Corvette C8 Z06 with full front paint protection film installed at Skyline Customs in Chantilly, VA",
                title: "STEK DYNOshield PPF",
                sub: "Full front coverage",
                free: false,
                items: ["Full hood", "Full front bumper", "Both fenders", "Side mirrors", "Headlights", "12-year manufacturer warranty"],
              },
              ...(hasCorrection ? [{
                photo: "/images/w/bmw-m340i-full-front-ppf-ceramic-coating-chantilly-va-960.webp",
                alt: "BMW M340i after paint correction at Skyline Customs in Chantilly, VA",
                title: "Paint Correction",
                sub: "Single stage, included",
                free: true,
                items: ["Machine polish", "Swirl removal", "Light scratch removal", "Water spot correction", "Surface decontamination", "Included at no charge"],
              }] : []),
              ...(hasCeramic ? [{
                photo: "/images/w/2024-mercedes-gle-53-amg-coupe-full-front-ppf-ceramic-coating-chantilly-va-960.webp",
                alt: "Mercedes GLE 53 AMG with a full-car ceramic coating at Skyline Customs in Chantilly, VA",
                title: "Ceramic Coating",
                sub: "Whole car, included",
                free: true,
                items: ["Every painted panel", "Hydrophobic top coat", "UV protection", "Deeper gloss", "Easier washing", "Included at no charge"],
              }] : []),
            ].map((card) => (
              <div key={card.title} className="border border-zinc-800 bg-[#0A0A0A] overflow-hidden flex flex-col">
                <div className="relative aspect-[16/10] bg-black">
                  <img src={card.photo} alt={card.alt} loading="lazy" decoding="async" width={960} height={600} className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
                  {card.free && <span className="absolute top-3 right-3 bg-[#E85D04] text-black font-display text-sm tracking-[0.2em] px-3 py-1">FREE</span>}
                </div>
                <div className="p-6 md:p-7 flex-1">
                  <h3 className="font-display text-3xl text-white leading-none mb-1">{card.title}</h3>
                  <p className="text-[#E85D04] text-xs font-bold tracking-widest uppercase mb-5">{card.sub}</p>
                  <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
                    {card.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-zinc-300 text-sm">
                        <CheckCircle className="w-4 h-4 text-[#E85D04] shrink-0 mt-0.5" />{item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Value math */}
          {freeValue > 0 && (
            <div className="mt-8 border border-[#E85D04]/40 bg-[#140C07]">
              <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 divide-x divide-[#E85D04]/20 [&>div:nth-child(3)]:border-l-0 md:[&>div:nth-child(3)]:border-l">
                <div className="p-5 md:p-6 text-center">
                  <p className="text-zinc-400 text-[11px] font-bold tracking-[0.25em] uppercase mb-2">{paidName.replace(/^STEK DYNOshield\s*/i, "")}</p>
                  <p className="font-display text-3xl md:text-4xl text-white leading-none">{fmt(Number(price) || 0)}</p>
                </div>
                <div className="p-5 md:p-6 text-center">
                  <p className="text-zinc-400 text-[11px] font-bold tracking-[0.25em] uppercase mb-2">{freeItems.map((f) => f.name.replace(/full[- ]car\s*/i, "")).join(" + ")} value, free</p>
                  <p className="font-display text-3xl md:text-4xl text-white leading-none">+ {fmt(freeValue)}</p>
                </div>
                <div className="p-5 md:p-6 text-center">
                  <p className="text-zinc-400 text-[11px] font-bold tracking-[0.25em] uppercase mb-2">Total value</p>
                  <p className="font-display text-3xl md:text-4xl text-zinc-400 line-through decoration-[#E85D04] decoration-2 leading-none">{fmt(fullPrice)}</p>
                </div>
                <div className="p-5 md:p-6 text-center bg-[#E85D04]">
                  <p className="text-black/70 text-[11px] font-bold tracking-[0.25em] uppercase mb-2">You pay</p>
                  <p className="font-display text-3xl md:text-4xl text-black leading-none">{fmt(Number(price) || 0)}</p>
                  <p className="text-black/80 text-xs font-bold mt-1">Ceramic coating included</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ================================================================
          GUARANTEES
      ================================================================ */}
      <section className="py-16 md:py-24 bg-[#0A0A0A]">
        <div className="container max-w-6xl">
          <div className="mb-10 md:mb-16">
            <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">Our Promises</p>
            <h2 className="font-display text-5xl md:text-6xl text-white leading-none">
              THREE GUARANTEES<br />
              <span className="text-[#E85D04]">NO ONE ELSE OFFERS</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
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
                title: "Limited Spots",
                body: "We only take a set number of cars for each special so every one is done right. This isn't a marketing gimmick — it's how we maintain the standard that earned us 140+ five-star reviews.",
              },
            ].map(({ number, title: t, body }, i) => (
              <div key={i} className="border border-zinc-800 bg-[#0D0D0D] p-6 md:p-8 relative overflow-hidden">
                <span className="font-display text-7xl md:text-8xl text-zinc-900 absolute -top-2 -right-2 leading-none select-none">
                  {number}
                </span>
                <div className="relative z-10">
                  <div className="w-10 h-0.5 bg-[#E85D04] mb-4 md:mb-6" />
                  <h3 className="font-display text-2xl text-white mb-3 md:mb-4">{t}</h3>
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
      <section className="py-16 md:py-24 bg-[#0D0D0D]">
        <div className="container max-w-6xl">
          <div className="mb-10 md:mb-16 text-center">
            <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">How It Works</p>
            <h2 className="font-display text-5xl md:text-6xl text-white">THE PROCESS</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-zinc-800">
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
              <div key={i} className="bg-[#0D0D0D] p-4 md:p-8 text-center">
                <div className="font-display text-4xl md:text-5xl text-[#E85D04] mb-3 md:mb-4">{step}</div>
                <div className="w-12 h-12 bg-[#E85D04]/10 border border-[#E85D04]/30 flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <Icon className="w-6 h-6 text-[#E85D04]" />
                </div>
                <h3 className="font-display text-xl md:text-2xl text-white mb-2 md:mb-3">{t}</h3>
                <p className="text-zinc-400 text-xs md:text-sm leading-relaxed">{body}</p>
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
      <section className="py-16 md:py-24 bg-[#0A0A0A]">
        <div className="container max-w-6xl">
          <div className="mb-10 md:mb-12 text-center">
            <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">What Our Customers Say</p>
            <h2 className="font-display text-5xl md:text-6xl text-white leading-none">
              REAL REVIEWS<br />
              <span className="text-[#E85D04]">FROM REAL CUSTOMERS</span>
            </h2>
          </div>
          <ReviewWall initial={6} />
          <div className="text-center mt-10 md:mt-12">
            <a href={quoteUrl} data-cta="promo-claim" className={`${BTN_PRIMARY} w-full sm:w-auto`}>
              {soldOut ? "Join the waitlist" : "Claim my spot"} <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* ================================================================
          CLAIM YOUR SPOT (embedded form; every CTA scrolls here)
      ================================================================ */}
      <section id="claim" className="py-16 md:py-24 bg-[#140C07] border-y border-[#E85D04]/30 scroll-mt-20">
        <div className="container max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-12 items-start">
            <div className="lg:col-span-2">
              <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">{soldOut ? "Sold out this month" : "Claim your spot"}</p>
              <h2 className="font-display text-5xl md:text-6xl text-white leading-none mb-5">
                {soldOut ? <>GET IN LINE<br /><span className="text-[#E85D04]">FOR NEXT MONTH</span></> : <>SEEN ENOUGH?<br /><span className="text-[#E85D04]">CLAIM YOUR SPOT</span></>}
              </h2>
              <p className="text-zinc-300 leading-relaxed mb-6">
                {soldOut
                  ? "Every spot this month is taken. Leave your details and you are first in line when the next special opens."
                  : `Sixty seconds. We call or text back with your exact price for the ${title} and the open install dates, usually within the hour during business hours.`}
              </p>
              <ul className="space-y-3 text-sm text-zinc-300">
                {[
                  "Exact price, not a range",
                  `${paidName} with the 12-year manufacturer warranty`,
                  freeSentence ? `Includes ${freeSentence} at no charge` : "Everything included, no add-ons",
                  "Walk-and-pay: you inspect every panel before you pay the balance",
                  ...(giveaway ? [`${giveaway.name}: every completed job is entered to win full body PPF`] : []),
                ].map((line) => (
                  <li key={line} className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-[#E85D04] mt-0.5 shrink-0" />{line}</li>
                ))}
              </ul>
              <a href="tel:+17037754383" className="inline-flex items-center gap-2 mt-8 text-zinc-300 hover:text-white text-sm">
                <Phone className="w-4 h-4 text-[#E85D04]" /> Prefer to talk? (703) 775-4383
              </a>
            </div>
            <div className="lg:col-span-3">
              {soldOut ? <WaitlistForm promoTitle={title} /> : <PromoQuoteForm promoTitle={title} promoSlug={slug} dealDescription={dealDescription} />}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          STEK CALLOUT
      ================================================================ */}
      <section className="py-14 md:py-16 bg-[#0D0D0D]">
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
      <section className="py-16 md:py-24 bg-[#0A0A0A]">
        <div className="container max-w-4xl">
          <div className="mb-10 md:mb-16 text-center">
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
      <section className="py-16 md:py-24 bg-[#E85D04]">
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
          {giveaway && (
            <p className="text-white font-bold text-sm mb-4 tracking-wide">Plus every completed job is entered to win full body PPF.</p>
          )}
          <p className="text-orange-200/70 text-sm mb-10">
            Skyline Customs &mdash; Chantilly, VA &middot; (703) 775-4383
          </p>
          {soldOut ? (
            <a href="#claim" className={BTN_ON_ORANGE}>
              JOIN THE WAITLIST <ArrowRight className="w-5 h-5" />
            </a>
          ) : (
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href={quoteUrl} data-cta="promo-claim" className={BTN_ON_ORANGE}>
                YES! PROTECT MY PAINT <ArrowRight className="w-5 h-5" />
              </a>
              <a href="tel:+17037754383" className={BTN_ON_ORANGE_OUTLINE}>
                CALL (703) 775-4383
              </a>
            </div>
          )}
          <p className="text-black/60 text-xs mt-6 tracking-wide">
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
            <div className="leading-tight">
              <p className="text-[11px] font-bold">
                <span className="text-white">${Number(price).toLocaleString("en-US")}</span>
                <span className="text-zinc-400"> · </span>
                <span className="text-[#E85D04]">{giveaway ? "Win full body PPF" : "Limited spots"}</span>
              </p>
              <p className="text-zinc-400 text-[11px] mt-0.5">
                {giveaway ? "Full front PPF + free ceramic" : "Full front PPF special"}{endDate && timeLeftLabel(endDate) ? ` · ${timeLeftLabel(endDate)}` : ""}
              </p>
            </div>
          )}
        </div>
        {soldOut ? (
          <a
            href="#claim"
            className="shrink-0 bg-zinc-700 text-white font-display text-sm tracking-widest px-5 py-3"
          >
            JOIN WAITLIST
          </a>
        ) : (
          <a
            href={quoteUrl}
            data-cta="promo-claim"
            className="shrink-0 bg-[#E85D04] text-black font-display text-sm tracking-widest px-4 py-3 hover:bg-orange-600 transition-colors"
          >
            CLAIM SPOT
          </a>
        )}
      </div>
    </div>
  );
}
