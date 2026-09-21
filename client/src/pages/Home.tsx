import { Suspense, lazy, useEffect, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Star, ChevronDown, Phone, ClipboardList, Wrench, Shield, CheckCircle, Clock, Zap } from "lucide-react";
import { trpc } from "@/lib/trpc";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useBooking } from "@/contexts/BookingContext";
import type { BookingService } from "@/components/BookingModal";
import SEO from "@/components/SEO";
import Testimonials from "@/components/Testimonials";
import BrandMarquee from "@/components/BrandMarquee";
import { SUPPLIERS, VEHICLE_MAKES } from "@shared/brands";
const VideoSection = lazy(() => import("@/components/VideoSection"));
const InstagramSection = lazy(() => import("@/components/InstagramSection"));

const HERO_IMAGE = "/images/hero-bg.webp";

const PPF_IMAGE = "/images/ppf_1_c7c64665.webp";

const CERAMIC_IMAGE = "/images/ceramic_1_53c9aefc.webp";

const TINT_IMAGE = "/images/tint_bmw_m2_847caa83.webp";


const services: { number: string; title: string; subtitle: string; description: string; image: string; imageAlt: string; href: string; bookingService: BookingService }[] = [
  {
    number: "01",
    title: "Paint Protection Film",
    subtitle: "Self-Healing PPF",
    description: "An invisible barrier against rock chips, scratches, and road debris. Self-healing film absorbs impact and preserves your factory finish for years.",
    image: PPF_IMAGE,
    imageAlt: "Paint protection film installation on a Corvette C8 at Skyline Custom Shop in Chantilly, VA",
    href: "/services/ppf",
    bookingService: "ppf",
  },
  {
    number: "02",
    title: "Ceramic Coating",
    subtitle: "Permanent Paint Defense",
    description: "A molecular bond to your paint that creates a permanent hydrophobic layer. Repels water, dirt, and contaminants for years of effortless protection.",
    image: CERAMIC_IMAGE,
    imageAlt: "Close-up of ceramic coating water beads on a black car — hydrophobic paint protection by Skyline Custom Shop in Chantilly, VA",
    href: "/services/ceramic-coating",
    bookingService: "ceramic",
  },
  {
    number: "03",
    title: "Window Tinting",
    subtitle: "Pro Nano Ceramic Film",
    description: "Block up to 99% of UV rays and reduce interior heat by 60% with our premium Pro Nano ceramic film. Lifetime warranty against bubbling, peeling, and fading.",
    image: TINT_IMAGE,
    imageAlt: "Window tinting on a BMW M2 coupe in front of Skyline Custom Shop in Chantilly, VA",
    href: "/services/window-tinting",
    bookingService: "tint",
  },
];

const testimonials = [
  {
    name: "Mohamed A.",
    vehicle: "Window Tint & Ceramic Coating",
    rating: 5,
    text: "I had my window tints and ceramic coating done by Skyline Customs, and the entire experience was top-tier from start to finish. Communication was clear and consistent, the process was smooth, and the work itself was done at a very high professional standard. Monzir and Mo were great to work with — they made everything easy, explained my options clearly, and ensured I got exactly what I wanted done. You can tell they take pride in their work and customer service.",
    image: "/images/KovmCKkPIFEJFUmc.webp",
  },
  {
    name: "Hassan A.",
    vehicle: "Tesla Cybertruck — Window Tint & Ceramic",
    rating: 5,
    text: "The boys at Skyline Customs took care of me with my Cybertruck — tints all around and got it ceramic coated as well. Came out flawless, and the service was quick and professional. Will be bringing my other vehicles here as well.",
    image: "/images/LaOvleuxhMbNtzvL.webp",
  },
  {
    name: "Omar M.",
    vehicle: "Lamborghini — Full Customization",
    rating: 5,
    text: "Absolutely top-tier work. I brought my Lamborghini in for customization and the results exceeded my expectations. The team was professional, knowledgeable, and took the time to explain every detail so I felt confident in the process from start to finish. Clean work, attention to detail, and everything was done exactly how I wanted it.",
    image: "/images/qirXXIXGBYtrKUwU.webp",
  },
];

const brandStatements = [
  {
    heading: "CRAFTSMANSHIP.",
    body: "Meticulous installation standards with a Lifetime Craftsmanship Warranty on every vehicle.",
  },
  {
    heading: "ENGINEERING.",
    body: "Advanced ceramic tint, paint protection film, and coatings applied with precision and purpose.",
  },
  {
    heading: "REPUTATION.",
    body: "A division of Skyline Auto Body Shop — trusted across Northern Virginia with over 500 five-star reviews.",
  },
];

const faqs = [
  {
    q: "How long does Paint Protection Film last?",
    a: "High-quality PPF typically lasts 10–12 years when properly maintained. Our films come with manufacturer warranties of up to 12 years against yellowing, cracking, and delamination.",
  },
  {
    q: "Can I wash my car after ceramic coating?",
    a: "We recommend waiting 7 days before washing to allow the coating to fully cure. After that, regular washing is fine — in fact, the hydrophobic properties make washing easier than ever.",
  },
  {
    q: "What's the difference between PPF and ceramic coating?",
    a: "PPF is a physical film that absorbs rock chips and scratches. Ceramic coating is a chemical bond that adds gloss and hydrophobic protection but won't stop physical impact. For maximum protection, we recommend both — PPF first, then ceramic over the top.",
  },
  {
    q: "How long does window tinting take?",
    a: "Most full-vehicle tint jobs are completed in 2–4 hours. We use computer-cut patterns for a precise fit with no trimming on the glass, which reduces installation time and improves quality.",
  },
  {
    q: "Do you offer mobile service or do I come to you?",
    a: "We operate from our controlled-environment facility in Chantilly, VA. Proper installation of PPF and ceramic coatings requires a dust-free environment that can't be replicated outdoors — this is how we guarantee quality.",
  },
];

// ─── Included Service type (matches DB JSON schema) ──────────────────────────
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

// ---- Homepage Countdown Timer -----------------------------------------------
function HomepageCountdown({ endDate }: { endDate: string }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    if (!endDate) return;
    const cleaned = endDate.replace(/(\d+)(st|nd|rd|th)\b/gi, '$1');
    const target = new Date(cleaned);
    if (isNaN(target.getTime())) return;
    target.setHours(23, 59, 59, 999);
    const tick = () => {
      const diff = target.getTime() - Date.now();
      if (diff <= 0) { setExpired(true); return; }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [endDate]);

  if (!endDate || expired) return null;

  return (
    <div className="flex items-center gap-1 bg-black/40 border border-zinc-700 px-3 py-2">
      <Clock className="w-3 h-3 text-zinc-400 mr-1" />
      {timeLeft.days > 0 && (
        <><span className="font-mono text-[#E85D04] font-bold text-sm">{timeLeft.days}</span><span className="text-zinc-400 text-xs mr-1">d</span></>
      )}
      <span className="font-mono text-[#E85D04] font-bold text-sm">{String(timeLeft.hours).padStart(2, '0')}</span>
      <span className="text-zinc-400 text-xs">h</span>
      <span className="font-mono text-[#E85D04] font-bold text-sm ml-1">{String(timeLeft.minutes).padStart(2, '0')}</span>
      <span className="text-zinc-400 text-xs">m</span>
      <span className="font-mono text-[#E85D04] font-bold text-sm ml-1">{String(timeLeft.seconds).padStart(2, '0')}</span>
      <span className="text-zinc-400 text-xs">s</span>
    </div>
  );
}

// ---- Active Promo Banner (homepage) -----------------------------------------
// Pulls ALL content dynamically from the database via trpc.promo.getActive
// No hardcoded month names, prices, or dates -- works for any monthly promo
function ActivePromoBanner() {
  const { data: promo, isLoading } = trpc.promo.getActive.useQuery();

  if (isLoading) return null;
  if (!promo) return null;

  const filled = promo.slots?.length ?? 0;
  const total = promo.totalSlots ?? 21;
  const remaining = total - filled;
  const pct = Math.min((filled / total) * 100, 100);
  const price = promo.price ?? "2400";
  const title = promo.title ?? "Monthly Special";
  const endDate = promo.endDate ?? "";
  const slug = promo?.slug ?? "promo";
  const promoUrl = "/promo";
  const quoteUrl = `/get-a-quote?service=ppf&promo=${slug}`;
  const soldOut = remaining <= 0;

  let includedServices: IncludedService[] = [];
  if (promo.includedServices) {
    try { includedServices = JSON.parse(promo.includedServices) as IncludedService[]; }
    catch { includedServices = []; }
  }
  const { freeValue, fullPrice, fmt } = promoMath(price, includedServices);

  return (
    <section className="relative overflow-hidden bg-[#080808]">
      {/* Diagonal grid texture */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: "repeating-linear-gradient(45deg, #E85D04 0, #E85D04 1px, transparent 0, transparent 50%)", backgroundSize: "20px 20px" }}
      />
      {/* Left orange accent bar */}
      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#E85D04]" />
      {/* Orange ambient glow */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-[#E85D04] opacity-[0.07] blur-[100px] pointer-events-none" />

      <div className="relative z-10 container max-w-6xl py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* ---- Left: headline + CTAs ---- */}
          <div>
            {/* Urgency bar + countdown */}
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <div className="inline-flex items-center gap-2 bg-[#E85D04]/10 border border-[#E85D04]/40 px-4 py-2">
                <Zap className="w-3.5 h-3.5 text-[#E85D04]" />
                <span className="text-[#E85D04] text-xs font-bold tracking-[0.3em] uppercase">
                  ENDS {endDate || "THIS MONTH"} &mdash; LIMITED SPOTS
                </span>
              </div>
              {endDate && !soldOut && <HomepageCountdown endDate={endDate} />}
            </div>

            {/* Headline -- DB title */}
            <h2 className="font-display leading-none mb-3">
              <span className="block text-white text-4xl md:text-5xl lg:text-6xl">{title.toUpperCase()}</span>
              <span className="block text-[#E85D04] text-4xl md:text-5xl lg:text-6xl">+ FREE EXTRAS</span>
            </h2>

            {/* Tagline -- DB tagline */}
            <p className="text-zinc-300 text-base md:text-lg leading-relaxed mb-5 max-w-lg">
              {promo.tagline}
            </p>

            {/* Included pills -- from DB includedServices JSON */}
            {includedServices.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {includedServices.map((item) => (
                  <div key={item.name} className="flex items-center gap-1.5 bg-zinc-900 border border-zinc-700 px-3 py-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-[#E85D04] shrink-0" />
                    <span className="text-white text-xs font-bold">{item.name}</span>
                    {item.isFree && <span className="text-[#E85D04] text-xs font-bold">FREE</span>}
                  </div>
                ))}
              </div>
            )}

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href={promoUrl}
                className="flex items-center justify-center gap-2 bg-[#E85D04] text-black font-display text-lg tracking-[0.1em] px-8 py-4 hover:bg-orange-600 transition-colors"
              >
                YES! PROTECT MY PAINT <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href={quoteUrl}
                className="flex items-center justify-center gap-2 border-2 border-zinc-700 text-zinc-300 font-display text-lg tracking-[0.1em] px-8 py-4 hover:border-[#E85D04] hover:text-white transition-colors"
              >
                SEE DETAILS
              </Link>
            </div>
            <div className="flex items-center gap-3 mt-3">
              {remaining > 0 ? (
                <p className="text-xs tracking-wide">
                  <span className="text-emerald-400 font-bold">Spots are limited</span>
                  <span className="text-zinc-400"> &mdash; No catch. Just flawless paint, guaranteed 12 years.</span>
                </p>
              ) : (
                <p className="text-red-400 text-xs font-bold tracking-wide uppercase">All slots filled &mdash; join the waitlist</p>
              )}
            </div>
          </div>

          {/* ---- Right: progress + price ---- */}
          <div className="space-y-5">
            {/* Price box */}
            <div className="border border-[#E85D04]/30 bg-[#E85D04]/5 p-6">
              <p className="text-[#E85D04] text-xs font-bold tracking-[0.3em] uppercase mb-3">Starting At</p>
              <div className="flex items-baseline gap-3 mb-1">
                {freeValue > 0 && <span className="font-mono-brand text-zinc-400 text-xl line-through">{fmt(fullPrice)}</span>}
                <span className="font-display text-[#E85D04] text-5xl">{fmt(Number(price) || 0)}</span>
              </div>
              <p className="text-zinc-400 text-sm">
                {freeValue > 0 ? `You save ${fmt(freeValue)} in included services.` : "Everything included. No add-ons."}
              </p>
            </div>

            {/* Availability */}
            <div className="border border-zinc-800 bg-[#0D0D0D] p-6">
              <div className="flex justify-between text-xs mb-3">
                <span className="text-zinc-400 font-medium tracking-wide uppercase">Availability</span>
                {soldOut
                  ? <span className="text-red-400 font-bold">SOLD OUT</span>
                  : <span className="text-yellow-400 font-bold">Limited spots</span>}
              </div>
              <p className="text-zinc-300 text-sm leading-relaxed">
                {soldOut
                  ? "This month's spots are gone. Join the waitlist and you're first in line for next month."
                  : "We only take a set number of cars each month so every one gets our full attention. First come, first served."}
              </p>
              {endDate && <p className="text-zinc-400 text-xs mt-3">Ends {endDate}</p>}
            </div>

            {/* Trust row */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: Shield, label: "STEK Certified", sub: "12-yr warranty" },
                { icon: Star, label: "5-Star Rated", sub: "140+ reviews" },
                { icon: CheckCircle, label: "Walk & Pay", sub: "Guaranteed" },
              ].map(({ icon: Icon, label, sub }, i) => (
                <div key={i} className="border border-zinc-800 bg-[#0D0D0D] p-3 text-center">
                  <Icon className="w-4 h-4 text-[#E85D04] mx-auto mb-1.5" />
                  <p className="text-white text-xs font-bold leading-tight">{label}</p>
                  <p className="text-zinc-400 text-xs">{sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQAccordion() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="space-y-0 border border-[oklch(0.22_0.006_285)]">
      {faqs.map((faq, i) => (
        <div key={i} className={`${i !== faqs.length - 1 ? "border-b border-[oklch(0.22_0.006_285)]" : ""}` }>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between px-6 py-5 text-left group hover:bg-[oklch(0.14_0.005_285)] transition-colors"
          >
            <span className="font-display text-base md:text-lg text-[oklch(0.90_0.008_85)] tracking-wide group-hover:text-brand-orange transition-colors pr-4">
              {faq.q}
            </span>
            <ChevronDown
              size={18}
              className={`text-brand-orange shrink-0 transition-transform duration-300 ${open === i ? "rotate-180" : ""}`}
            />
          </button>
          {open === i && (
            <div className="px-6 pb-5">
              <p className="text-[oklch(0.65_0.008_285)] text-sm md:text-base leading-relaxed">{faq.a}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ---- "We Did It Again" Homepage Banner ------------------------------------
function WeDidItAgainBannerHome() {
  const { data: lastPromo } = trpc.promo.getLastArchived.useQuery();
  const { data: activePromo } = trpc.promo.getActive.useQuery();
  if (!lastPromo) return null;

  const filledCount = lastPromo.slots?.length ?? 0;
  const totalSlots = lastPromo.totalSlots ?? 21;
  const lastTitle = lastPromo.title ?? "Last Month's Special";
  const isSoldOut = filledCount >= totalSlots;
  const thumbSlots = (lastPromo.slots ?? []).filter((s) => s.photoUrl).slice(0, 5);
  const activeSlug = activePromo?.slug ?? "promo";
  const activeTitle = activePromo?.title ?? "This Month's Special";
  const promoUrl = "/promo";

  return (
    <Link
      href="/promo"
      className="block mt-16 md:mt-20 bg-[#0D0D0D] border-b border-zinc-800 hover:bg-[#141414] transition-colors cursor-pointer"
    >
      <div className="container max-w-6xl py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">

          {/* Left: badge + headline */}
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

          {/* Right: car thumbs + arrow */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {thumbSlots.length > 0 && (
              <div className="flex -space-x-2">
                {thumbSlots.map((slot) => (
                  <div key={slot.id} className="w-9 h-9 rounded-full border-2 border-[#0D0D0D] overflow-hidden bg-zinc-800">
                    <img loading="lazy" decoding="async" src={slot.photoUrl!} alt={slot.carDescription ?? 'car'} className="w-full h-full object-cover" />
                  </div>
                ))}
                {filledCount > 5 && (
                  <div className="w-9 h-9 rounded-full border-2 border-[#0D0D0D] bg-zinc-700 flex items-center justify-center">
                    <span className="text-zinc-300 text-[10px] font-bold">+{filledCount - 5}</span>
                  </div>
                )}
              </div>
            )}
            <ArrowRight className="w-4 h-4 text-[#E85D04] flex-shrink-0" />
          </div>

        </div>
      </div>
    </Link>
  );
}

// ---- Recent Cars Social Proof Section ------------------------------------
/** Starts the hero reel only after the page has loaded, so the 1.3 MB video never delays first paint. */
function HeroReel() {
  useEffect(() => {
    const v = document.getElementById("hero-reel") as HTMLVideoElement | null;
    if (!v) return;
    const start = () => {
      if (v.src) return;
      v.src = "/images/hero-reel_web.mp4";
      v.play().catch(() => {});
    };
    if (document.readyState === "complete") { const t = window.setTimeout(start, 400); return () => window.clearTimeout(t); }
    const onLoad = () => window.setTimeout(start, 400);
    window.addEventListener("load", onLoad, { once: true });
    return () => window.removeEventListener("load", onLoad);
  }, []);
  return null;
}

function RecentCarsSection() {
  const { data: lastPromo } = trpc.promo.getLastArchived.useQuery();
  if (!lastPromo || !lastPromo.slots || lastPromo.slots.length === 0) return null;

  const slots = lastPromo.slots.filter((s) => s.photoUrl);
  if (slots.length === 0) return null;

  const title = lastPromo.title ?? "Last Month's Special";

  return (
    <section className="py-24 bg-[#080808] border-t border-zinc-900">
      <div className="container max-w-6xl">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-[#E85D04]" />
            <span className="text-[#E85D04] text-xs font-bold tracking-[0.3em] uppercase">Real Customers, Real Cars</span>
          </div>
          <h2 className="font-display text-5xl md:text-6xl text-white tracking-tight">
            WHO WE&apos;VE PROTECTED
          </h2>
          <p className="text-zinc-400 mt-3 text-sm max-w-xl">
            Every car below was protected by our team this past month. Real customers, verified work.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {slots.map((slot) => (
            <div
              key={slot.id}
              className="border border-zinc-800 bg-[#0D0D0D] overflow-hidden group hover:border-[#E85D04]/50 transition-colors"
            >
              <div className="relative aspect-[4/3] bg-zinc-900 overflow-hidden">
                <img loading="lazy" decoding="async"
                  src={slot.photoUrl!}
                  alt={`${slot.carDescription} — Skyline Customs ${title}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-[#E85D04] text-black text-xs font-bold tracking-widest px-2 py-1">
                  #{slot.slotNumber}
                </div>
                <div className="absolute top-3 right-3 bg-black/70 text-emerald-400 text-xs font-bold tracking-wide px-2 py-1 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" /> VERIFIED
                </div>
              </div>
              <div className="p-4">
                <p className="text-white font-semibold text-sm mb-1">{slot.customerName}</p>
                <p className="text-zinc-400 text-xs leading-relaxed">{slot.carDescription}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---- This Month's Special mid-page banner ----------------------------------
function ThisMonthsSpecialBanner() {
  const { data: promo } = trpc.promo.getActive.useQuery();
  if (!promo) return null;

  const filled = promo.slots?.length ?? 0;
  const total = promo.totalSlots ?? 21;
  const remaining = total - filled;
  const soldOut = remaining <= 0;
  const title = promo.title ?? "Monthly Special";
  const price = promo.price ?? "2400";
  const slug = promo?.slug ?? "promo";
  const promoUrl = "/promo";
  const quoteUrl = `/get-a-quote?service=ppf&promo=${encodeURIComponent(slug)}&promoTitle=${encodeURIComponent(title)}`;

  return (
    <section className="py-20 bg-[#080808] border-y border-zinc-900">
      <div className="container max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left: copy */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-[#E85D04]" />
              <span className="text-[#E85D04] text-xs font-bold tracking-[0.3em] uppercase">This Month's Special</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl text-white leading-none mb-4">
              {title.toUpperCase()}<br />
              <span className="text-[#E85D04]">STARTING AT ${price}</span>
            </h2>
            <p className="text-zinc-400 text-base leading-relaxed mb-6 max-w-lg">
              {promo.tagline || "Full Front PPF + Free Ceramic Coating. Spots are limited this month."}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              {!soldOut ? (
                <Link href={quoteUrl} className="inline-flex items-center gap-2 bg-[#E85D04] text-black font-display text-sm tracking-widest uppercase px-7 py-4 hover:bg-orange-600 transition-colors">
                  Claim My Spot <ArrowRight className="w-4 h-4" />
                </Link>
              ) : (
                <Link href={promoUrl + "#waitlist"} className="inline-flex items-center gap-2 border border-[#E85D04] text-[#E85D04] font-display text-sm tracking-widest uppercase px-7 py-4 hover:bg-[#E85D04]/10 transition-colors">
                  Join Waitlist <ArrowRight className="w-4 h-4" />
                </Link>
              )}
              <Link href={promoUrl} className="inline-flex items-center gap-2 border border-zinc-700 text-zinc-300 font-display text-sm tracking-widest uppercase px-7 py-4 hover:border-zinc-500 transition-colors">
                See Full Details <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
          {/* Right: availability */}
          <div className="border border-zinc-800 bg-[#0D0D0D] p-8">
            <div className="flex items-center justify-between mb-4">
              <p className="text-zinc-400 text-xs font-bold tracking-[0.2em] uppercase">Availability</p>
              <span className={`text-sm font-bold tracking-wide ${soldOut ? 'text-red-400' : 'text-emerald-400'}`}>
                {soldOut ? 'SOLD OUT' : 'Limited spots'}
              </span>
            </div>
            <div className="flex justify-between text-zinc-400 text-xs mb-6">
              <span>{soldOut ? "Join the waitlist for next month" : "First come, first served"}</span>
              {promo.endDate && <span>Ends {promo.endDate}</span>}
            </div>
            <div className="border-t border-zinc-800 pt-5">
              <p className="text-zinc-400 text-xs leading-relaxed">
                We only take a set number of cars each month so every vehicle gets the same level of attention. Once the spots are gone, the deal is over until next month.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const { openBooking } = useBooking();

  return (
    <div className="min-h-screen bg-[oklch(0.10_0.005_285)] text-[oklch(0.95_0.005_85)]">
      <SEO
        title="Skyline Customs | PPF, Ceramic Coating & Tint in Chantilly, VA"
        description="Skyline Custom Shop in Chantilly, VA offers professional paint protection film (PPF), ceramic coating, and window tinting. STEK DYNOshield certified installer. Get a free quote today."
        canonical="https://www.skylinecustomshop.com/"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Vehicle makes protected at Skyline Custom Shop, Chantilly VA",
            "itemListElement": VEHICLE_MAKES.map((m, i) => ({ "@type": "ListItem", "position": i + 1, "name": m.name, "url": `https://www.skylinecustomshop.com${m.href}` })),
          },
        ]}
      />
      <Navbar />

      {/* ── ACTIVE PROMO BANNER (dynamic from DB, renders nothing if no active promo) ── */}
      <ActivePromoBanner />
      <HeroReel />

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background video */}
        <div className="absolute inset-0">
          {/* Background reel plays on every device, phones included (poster shows while it loads). */}
          <video
            id="hero-reel"
            muted
            loop
            playsInline
            preload="none"
            poster="/images/hero-poster_702747e9.webp"
            title="Skyline Custom Shop — PPF, Ceramic Coating & Window Tinting in Chantilly, VA"
            aria-label="Skyline Custom Shop technicians applying paint protection film and window tinting in Chantilly, VA"
            className="w-full h-full object-cover"
          >
            {/* The mp4 is attached after the load event (see HeroReel) so the poster is the LCP on every device. */}
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.08_0.005_285)]/92 via-[oklch(0.08_0.005_285)]/65 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.08_0.005_285)] via-transparent to-transparent" />
        </div>

        <div className="relative z-10 container max-w-6xl py-32">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-brand-orange" />
              <span className="text-brand-orange text-xs font-bold tracking-[0.3em] uppercase">Chantilly, Virginia</span>
            </div>

            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-none mb-6 tracking-tight">
              PROTECT<br />
              YOUR<br />
              <span className="text-brand-orange">INVESTMENT.</span>
            </h1>

            <p className="text-[oklch(0.75_0.008_285)] text-lg md:text-xl leading-relaxed mb-10 max-w-lg">
              Professional paint protection film, ceramic coating, and window tinting — installed in a controlled facility in Chantilly, VA.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/get-a-quote"
                className="flex items-center justify-center gap-3 bg-brand-orange text-black font-display text-lg tracking-widest px-10 py-5 hover:bg-orange-600 transition-all duration-200 hover:scale-[1.02] group"
              >
                GET A FREE QUOTE
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button
                onClick={() => openBooking("ppf")}
                className="flex items-center justify-center gap-3 border-2 border-[oklch(0.35_0.008_285)] text-[oklch(0.75_0.008_285)] font-display text-lg tracking-widest px-10 py-5 hover:border-brand-orange hover:text-white transition-colors"
              >
                <Phone className="w-5 h-5" />
                BOOK A CONSULT
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── BRAND STRIP: films/coatings we install and makes from the gallery, one loop ── */}
      <section className="py-8 bg-[oklch(0.10_0.005_285)] border-b border-[oklch(0.16_0.006_285)]" aria-labelledby="brands-heading">
        <h2 id="brands-heading" className="sr-only">Brands we install and vehicle makes we have protected</h2>
        <div className="container max-w-6xl">
          <p className="font-mono-brand text-[10px] uppercase tracking-[0.3em] text-zinc-400 mb-2">
            Certified installer for STEK, Gtechniq, GeoShield and PURE PPF <span className="text-zinc-700">·</span> cars we've protected, from the <Link href="/gallery" className="text-zinc-400 hover:text-brand-orange normal-case tracking-normal">gallery</Link>
          </p>
        </div>
        <BrandMarquee items={[...SUPPLIERS, ...VEHICLE_MAKES]} duration={90} ariaLabel="Brands Skyline Customs installs and vehicle makes it has protected" />
      </section>

      {/* ── BRAND STATEMENTS ─────────────────────────────────────────────────── */}
      <section className="border-y border-[oklch(0.18_0.006_285)] bg-[oklch(0.12_0.005_285)]">
        <div className="container max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[oklch(0.18_0.006_285)]">
            {brandStatements.map((s, i) => (
              <div key={i} className="px-8 py-10">
                <h2 className="font-display text-2xl text-brand-orange tracking-wider mb-3">{s.heading}</h2>
                <p className="text-[oklch(0.65_0.008_285)] text-sm leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────────────────────────── */}
      <section className="py-32 bg-[oklch(0.10_0.005_285)]">
        <div className="container max-w-6xl">
          <div className="mb-20">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-brand-orange" />
              <span className="text-brand-orange text-xs font-bold tracking-[0.3em] uppercase">What We Do Best</span>
            </div>
            <h2 className="font-display text-5xl md:text-6xl text-white tracking-tight">OUR SERVICES</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[oklch(0.18_0.006_285)]">
            {services.map((service) => (
              <Link key={service.number} href={service.href}>
                <div className="group relative bg-[oklch(0.10_0.005_285)] overflow-hidden cursor-pointer h-[400px]">
                  <img loading="lazy" decoding="async"
                    src={service.image}
                    alt={service.imageAlt}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.05_0.005_285)] via-[oklch(0.05_0.005_285)]/60 to-transparent" />
                  <div className="absolute inset-0 p-8 flex flex-col justify-between">
                    <span className="font-display text-6xl text-white/10 leading-none">{service.number}</span>
                    <div>
                      <p className="text-brand-orange text-xs font-bold tracking-[0.3em] uppercase mb-2">{service.subtitle}</p>
                      <h3 className="font-display text-3xl text-white tracking-wide mb-3">{service.title}</h3>
                      <p className="text-[oklch(0.70_0.008_285)] text-sm leading-relaxed mb-4 max-w-sm">{service.description}</p>
                      <div className="flex items-center gap-2 text-brand-orange text-sm font-bold tracking-widest uppercase group-hover:gap-4 transition-all">
                        Learn More <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────────── */}
      <Testimonials />

      {/* ── VIDEOS (educational Shorts carousel) ─────────────────────────────── */}
      <Suspense fallback={<div className="min-h-[640px]" />}><VideoSection /></Suspense>

      {/* ── RECENT CARS (social proof from last month's promo) ──────────────── */}
      <RecentCarsSection />

      {/* ── THIS MONTH'S SPECIAL ─────────────────────────────────────────────── */}
      <ThisMonthsSpecialBanner />

      {/* ── TRUST SIGNALS ────────────────────────────────────────────────────── */}
      <section className="py-24 bg-[oklch(0.12_0.005_285)] border-y border-[oklch(0.18_0.006_285)]">
        <div className="container max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[oklch(0.18_0.006_285)]">
            {[
              { icon: Star, label: "140+", sub: "5-Star Reviews" },
              { icon: Shield, label: "12-Year", sub: "PPF Warranty" },
              { icon: Wrench, label: "1,000+", sub: "Vehicles Protected" },
              { icon: CheckCircle, label: "STEK", sub: "Certified Installer" },
            ].map(({ icon: Icon, label, sub }, i) => (
              <div key={i} className="bg-[oklch(0.12_0.005_285)] p-8 flex flex-col items-center text-center gap-3">
                <Icon className="w-6 h-6 text-brand-orange" />
                <div>
                  <p className="font-display text-3xl text-white tracking-wide">{label}</p>
                  <p className="text-[oklch(0.66_0.008_285)] text-sm mt-1">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INSTAGRAM ───────────────────────────────────────────────────────── */}
      <Suspense fallback={<div className="min-h-[480px]" />}><InstagramSection /></Suspense>

      {/* ── PROCESS ──────────────────────────────────────────────────────────── */}
      <section className="py-32 bg-[oklch(0.10_0.005_285)]">
        <div className="container max-w-6xl">
          <div className="mb-20">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-brand-orange" />
              <span className="text-brand-orange text-xs font-bold tracking-[0.3em] uppercase">How It Works</span>
            </div>
            <h2 className="font-display text-5xl md:text-6xl text-white tracking-tight">THE PROCESS</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[oklch(0.18_0.006_285)]">
            {[
              { icon: ClipboardList, step: "01", title: "Get a Quote", desc: "Fill out our quick form with your vehicle info and desired services. We'll respond with a custom quote within 24 hours." },
              { icon: Wrench, step: "02", title: "Schedule Install", desc: "Pick a date that works for you. Most jobs are completed same-day in our controlled-environment facility in Chantilly." },
              { icon: Shield, step: "03", title: "Drive Protected", desc: "Leave with a fully protected vehicle and our Lifetime Craftsmanship Warranty. We stand behind every install." },
            ].map(({ icon: Icon, step, title, desc }, i) => (
              <div key={i} className="bg-[oklch(0.10_0.005_285)] p-10">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-brand-orange/10 border border-brand-orange/30 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-brand-orange" />
                  </div>
                  <span className="font-display text-5xl text-white/10 leading-none">{step}</span>
                </div>
                <h3 className="font-display text-2xl text-white tracking-wide mb-3">{title}</h3>
                <p className="text-[oklch(0.60_0.008_285)] text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────────── */}
      <section className="py-32 bg-[oklch(0.12_0.005_285)] border-t border-[oklch(0.18_0.006_285)]">
        <div className="container max-w-4xl">
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-brand-orange" />
              <span className="text-brand-orange text-xs font-bold tracking-[0.3em] uppercase">Common Questions</span>
            </div>
            <h2 className="font-display text-5xl md:text-6xl text-white tracking-tight">FAQ</h2>
          </div>
          <FAQAccordion />
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────────────────── */}
      <section className="py-32 bg-brand-orange">
        <div className="container max-w-4xl text-center">
          <h2 className="font-display text-5xl md:text-7xl text-white leading-none mb-6 tracking-tight">
            READY TO<br />PROTECT YOUR CAR?
          </h2>
          <p className="text-orange-100 text-lg md:text-xl mb-10 max-w-xl mx-auto">
            Get a custom quote in under 2 minutes. No commitment required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/get-a-quote"
              className="flex items-center justify-center gap-3 bg-white text-brand-orange font-display text-lg tracking-widest px-10 py-5 hover:bg-zinc-100 transition-all duration-200 hover:scale-[1.02] group"
            >
              GET A FREE QUOTE
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="tel:+17037754383"
              className="flex items-center justify-center gap-3 border-2 border-white text-white font-display text-lg tracking-widest px-10 py-5 hover:bg-white hover:text-brand-orange transition-colors"
            >
              <Phone className="w-5 h-5" />
              (703) 775-4383
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
