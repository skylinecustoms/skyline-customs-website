/**
 * SKYLINE CUSTOMS -- Promo Archive Page
 *
 * Displays a past monthly promo at its permanent URL (e.g. /june-special).
 * The archivedSlug is passed as a URL param from the router.
 *
 * Key differences from the live /promo page:
 *  - "This promo has ended" banner at the top
 *  - CTA button is disabled with "Promo Ended" label
 *  - No countdown timer
 *  - No waitlist form (promo is over)
 *  - "See current offer" link to /promo
 *  - All slots shown as filled (read-only gallery)
 *
 * Design: Midnight Garage -- Bebas Neue (display) + DM Sans (body) + DM Mono (prices)
 * Accent: #E85D04 (burnt orange) | Background: #0A0A0A (near-black)
 */

import { trpc } from "@/lib/trpc";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Link } from "wouter";
import { Shield, CheckCircle, Star, ChevronDown, ArrowRight, Lock, AlertTriangle } from "lucide-react";
import { useState } from "react";

// ---- Included Service type ---------------------------------------------------
interface IncludedService {
  name: string;
  value: string;
  isFree: boolean;
  badge?: string;
}

// ---- Slot Card (read-only, no anchor needed for live scroll) -----------------
function SlotCard({
  slotNumber, customerName, carDescription, photoUrl, promoTitle,
}: {
  slotNumber: number; customerName: string; carDescription: string;
  photoUrl?: string | null; promoTitle: string;
}) {
  return (
    <div className="border border-zinc-800 bg-[#0D0D0D] overflow-hidden group hover:border-[#E85D04]/40 transition-colors">
      <div className="relative aspect-[4/3] bg-zinc-900 overflow-hidden">
        {photoUrl ? (
          <img loading="lazy" decoding="async"
            src={photoUrl}
            alt={`${carDescription} -- Skyline Customs ${promoTitle}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2">
            <Shield className="w-10 h-10 text-zinc-700" />
            <span className="text-zinc-700 text-xs tracking-widest uppercase">No photo</span>
          </div>
        )}
        <div className="absolute top-3 left-3 bg-[#E85D04] text-white text-xs font-bold tracking-widest px-2 py-1">
          #{slotNumber}
        </div>
        <div className="absolute top-3 right-3 bg-black/70 text-emerald-400 text-xs font-bold tracking-wide px-2 py-1 flex items-center gap-1">
          <CheckCircle className="w-3 h-3" /> DONE
        </div>
      </div>
      <div className="p-4">
        <p className="text-white font-semibold text-sm mb-1">{customerName}</p>
        <p className="text-zinc-500 text-xs leading-relaxed">{carDescription}</p>
      </div>
    </div>
  );
}

// ---- FAQ Accordion -----------------------------------------------------------
const FAQ_ITEMS = [
  {
    q: "What exactly is included in the package?",
    a: "Stek DYNOshield Full Front PPF is what you pay for -- that covers the hood, front bumper, both fenders, side mirrors, and headlights. Included free: 9H Ceramic Coating on the full vehicle ($1,000 value), Full Paint Correction ($600 value), Door-Edge Guard Strips ($200 value), and A-Pillar Wrap ($300 value). That's $2,100 in additional work we include because it's the only way to do the job right.",
  },
  {
    q: "What does the Walk-and-Pay Guarantee mean?",
    a: "Before you pay the balance, we walk every panel with you under high-intensity lighting. If anything isn't right -- an edge lifting, a bubble, anything -- we fix it before you pay. If you're not satisfied, you don't pay. Simple as that.",
  },
  {
    q: "What exactly does the 12-Year No-Chip Promise cover?",
    a: "If a rock chips the paint under our film -- through intact, untampered film, from normal road driving -- we don't just replace the film. We repaint the panel, free. Film and paint, for as long as you own the car.",
  },
  {
    q: "Why only 21 cars a month?",
    a: "Because doing the job right takes time. A proper PPF install with paint correction and ceramic coating takes 2-3 days per car. We cap at 21 so every vehicle gets the same level of attention.",
  },
  {
    q: "How long does the install take?",
    a: "Plan for 2-3 days. Day 1 is decontamination and paint correction. Day 2 is the PPF installation. Day 3 is ceramic coating application and final inspection.",
  },
];

function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="divide-y divide-zinc-800 border border-zinc-800">
      {FAQ_ITEMS.map((item, i) => (
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

// ---- Loading Skeleton --------------------------------------------------------
function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white animate-pulse">
      <div className="h-16 bg-zinc-900" />
      <div className="h-12 bg-zinc-800" />
      <div className="container max-w-6xl py-24">
        <div className="h-8 bg-zinc-800 rounded w-48 mb-6" />
        <div className="h-24 bg-zinc-800 rounded w-2/3 mb-4" />
        <div className="h-6 bg-zinc-800 rounded w-1/2 mb-8" />
      </div>
    </div>
  );
}

// ---- Not Found ---------------------------------------------------------------
function ArchiveNotFound() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center px-6">
          <AlertTriangle className="w-16 h-16 text-zinc-700 mx-auto mb-6" />
          <h1 className="font-display text-4xl text-white tracking-wide mb-4">PROMO NOT FOUND</h1>
          <p className="text-zinc-500 mb-8">This promo archive doesn't exist or hasn't been archived yet.</p>
          <Link href="/promo" className="inline-flex items-center gap-2 bg-[#E85D04] text-white font-display text-lg tracking-[0.1em] px-8 py-4 hover:bg-orange-600 transition-colors">
            SEE CURRENT OFFER <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

// ---- Main Archive Page -------------------------------------------------------
export default function PromoArchive({ archivedSlug }: { archivedSlug: string }) {
  const { data: promo, isLoading } = trpc.promo.getArchived.useQuery({ archivedSlug });

  if (isLoading) return <LoadingSkeleton />;
  if (!promo) return <ArchiveNotFound />;

  const filledSlots = promo.slots ?? [];
  const totalSlots = promo.totalSlots ?? 21;
  const title = promo.title ?? "Monthly Special";
  const price = promo.price ?? "2400";
  const endDate = promo.endDate ?? "";
  const startDate = promo.startDate ?? "";
  const tagline = promo.tagline ?? "";
  const dealDescription = promo.dealDescription ?? "";

  let includedServices: IncludedService[] = [];
  if (promo.includedServices) {
    try {
      includedServices = JSON.parse(promo.includedServices) as IncludedService[];
    } catch { includedServices = []; }
  }

  const canonicalUrl = `https://www.skylinecustomshop.com/${archivedSlug}`;
  const seoTitle = `${title} (Archived) -- Skyline Customs Chantilly VA`;
  const seoDesc = `See how the ${title} at Skyline Customs filled all ${totalSlots} slots. ${tagline}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": title,
    "description": seoDesc,
    "brand": { "@type": "Brand", "name": "Skyline Customs" },
    "offers": {
      "@type": "Offer",
      "price": price,
      "priceCurrency": "USD",
      "availability": "https://schema.org/SoldOut",
      "validFrom": startDate,
      "validThrough": endDate,
      "seller": {
        "@type": "AutoBodyShop",
        "name": "Skyline Customs",
        "address": { "@type": "PostalAddress", "addressLocality": "Chantilly", "addressRegion": "VA" },
      },
    },
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col">
      <SEO
        title={seoTitle}
        description={seoDesc}
        canonical={canonicalUrl}
        jsonLd={jsonLd}
      />
      <Navbar />

      {/* Ended Banner */}
      <div className="bg-zinc-900 border-b border-zinc-800">
        <div className="container max-w-6xl py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Lock className="w-4 h-4 text-zinc-500 shrink-0" />
            <p className="text-zinc-400 text-sm">
              <span className="text-white font-semibold">{title}</span> has ended.
              All {totalSlots} slots were filled.
            </p>
          </div>
          <Link
            href="/promo"
            className="flex items-center gap-2 text-[#E85D04] text-sm font-bold tracking-wide hover:underline shrink-0"
          >
            See current offer <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-[#0A0A0A] border-b border-zinc-900 py-16 md:py-24">
          <div className="container max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Left: headline + details */}
              <div>
                <p className="text-[#E85D04] text-xs font-bold tracking-[0.3em] uppercase mb-4">
                  CHANTILLY, VA &middot; ARCHIVED &middot; ALL {totalSlots} SLOTS FILLED
                </p>
                <h1 className="font-display text-5xl md:text-6xl text-white tracking-wide leading-tight mb-4">
                  {title.split(" ").slice(0, -1).join(" ")}{" "}
                  <span className="text-[#E85D04]">{title.split(" ").slice(-1)[0]}</span>
                </h1>
                <p className="text-zinc-400 text-lg leading-relaxed mb-6">{tagline}</p>

                {/* Social proof */}
                <div className="flex items-center gap-2 mb-8">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-[#E85D04] fill-[#E85D04]" />
                    ))}
                  </div>
                  <span className="text-zinc-400 text-sm">5.0 &middot; 140+ Google Reviews</span>
                </div>

                {/* Dates */}
                <div className="flex items-center gap-3 text-sm text-zinc-500 mb-8">
                  <span>{startDate} &ndash; {endDate}</span>
                  <span className="text-zinc-700">|</span>
                  <span className="text-zinc-400 font-semibold">SOLD OUT</span>
                </div>

                {/* Disabled CTA */}
                <div className="space-y-3">
                  <button
                    disabled
                    className="w-full sm:w-auto bg-zinc-800 text-zinc-500 font-display text-xl tracking-[0.1em] px-10 py-5 cursor-not-allowed flex items-center gap-3"
                  >
                    <Lock className="w-5 h-5" /> THIS PROMO HAS ENDED
                  </button>
                  <Link
                    href="/promo"
                    className="flex items-center gap-2 text-[#E85D04] text-sm font-bold tracking-wide hover:underline"
                  >
                    See our current monthly offer <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Right: price box + slot fill */}
              <div className="space-y-6">
                {/* Price box */}
                <div className="border border-zinc-700 bg-[#0D0D0D] p-6">
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="font-mono-brand text-5xl text-white font-bold">${price}</span>
                    <span className="text-zinc-600 line-through text-2xl">$4,500</span>
                  </div>
                  <p className="text-emerald-400 text-sm font-semibold mb-4">You saved $2,100 in free services</p>
                  <div className="space-y-2 text-sm text-zinc-400">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-[#E85D04] shrink-0" />
                      <span>Stek DYNOshield Full Front PPF</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>9H Ceramic Coating <span className="text-emerald-400 text-xs">FREE ($1,000 value)</span></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Full Paint Correction <span className="text-emerald-400 text-xs">FREE ($600 value)</span></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Door-Edge Guard Strips <span className="text-emerald-400 text-xs">FREE ($200 value)</span></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>A-Pillar PPF <span className="text-emerald-400 text-xs">FREE ($300 value)</span></span>
                    </div>
                  </div>
                </div>

                {/* Slot fill bar */}
                <div className="border border-zinc-800 bg-[#0D0D0D] p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-zinc-400 text-sm font-medium tracking-wide uppercase">Final Slot Count</span>
                    <span className="font-bold text-sm tracking-wide text-red-400">SOLD OUT</span>
                  </div>
                  <div className="relative h-5 bg-zinc-800 overflow-hidden">
                    <div className="h-full bg-[#E85D04] w-full" />
                    <div className="absolute inset-0 flex">
                      {Array.from({ length: totalSlots }).map((_, i) => (
                        <div key={i} className="flex-1 border-r border-black/30 last:border-r-0" />
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-zinc-600 text-xs">{filledSlots.length} of {totalSlots} slots filled</span>
                    <span className="text-zinc-600 text-xs">Ended {endDate}</span>
                  </div>
                </div>

                {/* Dynamic included services (if set) */}
                {includedServices.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {includedServices.map((svc, i) => (
                      <span
                        key={i}
                        className={`text-xs font-bold tracking-wide px-3 py-1.5 border ${svc.isFree ? "border-emerald-800 text-emerald-400 bg-emerald-900/20" : "border-zinc-700 text-zinc-300 bg-zinc-900"}`}
                      >
                        {svc.isFree && "FREE: "}{svc.name}
                        {svc.value && <span className="text-zinc-500 ml-1">({svc.value})</span>}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Customer Gallery */}
        {filledSlots.length > 0 && (
          <section className="py-16 md:py-24 border-b border-zinc-900">
            <div className="container max-w-6xl">
              <div className="mb-12">
                <p className="text-[#E85D04] text-xs font-bold tracking-[0.3em] uppercase mb-3">ALL {totalSlots} SLOTS FILLED</p>
                <h2 className="font-display text-4xl md:text-5xl text-white tracking-wide">
                  {title.toUpperCase()} VEHICLES
                </h2>
                <p className="text-zinc-500 mt-3">Every car that came through during {title}.</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filledSlots.map((slot) => (
                  <SlotCard
                    key={slot.id}
                    slotNumber={slot.slotNumber}
                    customerName={slot.customerName}
                    carDescription={slot.carDescription}
                    photoUrl={slot.photoUrl}
                    promoTitle={title}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FAQ */}
        <section className="py-16 md:py-24 border-b border-zinc-900">
          <div className="container max-w-4xl">
            <div className="mb-12 text-center">
              <p className="text-[#E85D04] text-xs font-bold tracking-[0.3em] uppercase mb-3">QUESTIONS</p>
              <h2 className="font-display text-4xl md:text-5xl text-white tracking-wide">FREQUENTLY ASKED</h2>
            </div>
            <FaqAccordion />
          </div>
        </section>

        {/* Final CTA -- see current offer */}
        <section className="py-16 md:py-24 bg-zinc-950">
          <div className="container max-w-4xl text-center">
            <p className="text-[#E85D04] text-xs font-bold tracking-[0.3em] uppercase mb-4">
              THIS PROMO HAS ENDED
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-white tracking-wide leading-tight mb-6">
              WANT THE SAME DEAL<br />
              <span className="text-[#E85D04]">THIS MONTH?</span>
            </h2>
            <p className="text-zinc-400 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
              We run a new monthly special every month. Check if slots are still available for this month's offer.
            </p>
            <Link
              href="/promo"
              className="inline-flex items-center gap-3 bg-[#E85D04] text-white font-display text-xl tracking-[0.1em] px-10 py-5 hover:bg-orange-600 transition-colors"
            >
              SEE THIS MONTH'S OFFER <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
