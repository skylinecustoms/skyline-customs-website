/**
 * Active monthly promo banner. Pulls everything from the database
 * (trpc.promo.getActive): title, tagline, price, included services, end date,
 * slot count. Renders nothing when no promo is active. Used on the home page
 * and every city service page.
 */
import { useEffect, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Star, Shield, CheckCircle, Clock, Zap } from "lucide-react";
import { trpc } from "@/lib/trpc";

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
/**
 * `compact` renders a slim one-line strip (used on the city pages) instead of
 * the full two-column block the home page shows.
 */
export default function ActivePromoBanner({ compact = false }: { compact?: boolean } = {}) {
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

  if (compact) {
    const shortTagline = (promo.tagline ?? "").replace(/\s*[—-]\s*Spots Are Limited\.?$/i, "").trim();
    return (
      <section className="bg-[#0D0D0D] border-b border-zinc-800" aria-label="This month's special">
        <div className="container max-w-6xl py-3">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-5 border-l-2 border-[#E85D04] pl-4">
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1 min-w-0 text-sm">
              <span className="text-[#E85D04] font-bold tracking-[0.2em] uppercase text-[11px]">{title}</span>
              {shortTagline && <span className="text-zinc-300">{shortTagline}</span>}
              <span className="text-zinc-500">
                {freeValue > 0 && <span className="line-through mr-1">{fmt(fullPrice)}</span>}
                <span className="text-white font-bold">{fmt(Number(price) || 0)}</span>
                {endDate && <span> · {soldOut ? "Sold out" : `Ends ${endDate}`}</span>}
              </span>
            </div>
            <Link href={promoUrl} data-cta="promo-strip" className="sm:ml-auto shrink-0 inline-flex items-center gap-1.5 text-[#E85D04] font-bold tracking-widest uppercase text-xs hover:text-white transition-colors">
              {soldOut ? "Join the waitlist" : "Claim my spot"} <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    );
  }

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

      <div className="relative z-10 container max-w-6xl pt-[calc(4rem+28px)] pb-16 lg:pt-[calc(5rem+28px)] lg:pb-20">
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
