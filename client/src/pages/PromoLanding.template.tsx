/**
 * SKYLINE CUSTOMS — June Special Promo Landing Page
 * Deal: Full Front PPF (STEK DYNOshield) + Free Paint Correction + Ceramic Coating = $2,400
 * Scarcity: 21 slots total — live progress bar + customer gallery
 * Design: Industrial Brutalism | Dark matte black + burnt orange (#E85D04)
 * URL: /june-special
 *
 * REUSE: To create a new monthly promo, copy this file as PromoLanding.template.tsx
 * and update the PROMO_SLUG constant and any copy/colors as needed.
 */

import { trpc } from "@/lib/trpc";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Link } from "wouter";
import { Shield, Sparkles, Zap, CheckCircle, ArrowRight, Clock, Star, Lock } from "lucide-react";

const PROMO_SLUG = "june-2026";

// ─── Progress Bar ────────────────────────────────────────────────────────────
function ProgressBar({ filled, total }: { filled: number; total: number }) {
  const pct = Math.min((filled / total) * 100, 100);
  const remaining = total - filled;
  const urgency = remaining <= 5 ? "text-red-400" : remaining <= 10 ? "text-yellow-400" : "text-emerald-400";

  return (
    <div className="w-full">
      {/* Label row */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-zinc-400 text-sm font-medium tracking-wide uppercase">Slots Claimed</span>
        <span className={`font-bold text-sm tracking-wide ${urgency}`}>
          {remaining === 0 ? "SOLD OUT" : `${remaining} remaining`}
        </span>
      </div>

      {/* Bar */}
      <div className="relative h-5 bg-zinc-800 overflow-hidden">
        <div
          className="h-full bg-[#E85D04] transition-all duration-700 ease-out"
          style={{ width: `${pct}%` }}
        />
        {/* Slot tick marks */}
        <div className="absolute inset-0 flex">
          {Array.from({ length: total }).map((_, i) => (
            <div
              key={i}
              className="flex-1 border-r border-black/30 last:border-r-0"
            />
          ))}
        </div>
      </div>

      {/* Count */}
      <div className="flex items-center justify-between mt-2">
        <span className="text-zinc-600 text-xs">{filled} of {total} slots filled</span>
        <span className="text-zinc-600 text-xs">June 2026 only</span>
      </div>
    </div>
  );
}

// ─── Customer Slot Card ───────────────────────────────────────────────────────
function SlotCard({
  slotNumber,
  customerName,
  carDescription,
  photoUrl,
}: {
  slotNumber: number;
  customerName: string;
  carDescription: string;
  photoUrl?: string | null;
}) {
  return (
    <div className="border border-zinc-800 bg-[#0D0D0D] overflow-hidden group hover:border-[#E85D04]/50 transition-colors">
      {/* Photo or placeholder */}
      <div className="relative aspect-[4/3] bg-zinc-900 overflow-hidden">
        {photoUrl ? (
          <img loading="lazy" decoding="async"
            src={photoUrl}
            alt={`${carDescription} — Skyline Customs June Special`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2">
            <Shield className="w-10 h-10 text-zinc-700" />
            <span className="text-zinc-700 text-xs tracking-widest uppercase">Photo coming soon</span>
          </div>
        )}
        {/* Slot badge */}
        <div className="absolute top-3 left-3 bg-[#E85D04] text-white text-xs font-bold tracking-widest px-2 py-1">
          #{slotNumber}
        </div>
        {/* Verified badge */}
        <div className="absolute top-3 right-3 bg-black/70 text-emerald-400 text-xs font-bold tracking-wide px-2 py-1 flex items-center gap-1">
          <CheckCircle className="w-3 h-3" /> VERIFIED
        </div>
      </div>
      {/* Info */}
      <div className="p-4">
        <p className="text-white font-semibold text-sm mb-1">{customerName}</p>
        <p className="text-zinc-500 text-xs leading-relaxed">{carDescription}</p>
      </div>
    </div>
  );
}

// ─── Empty Slot Card ──────────────────────────────────────────────────────────
function EmptySlotCard({ slotNumber }: { slotNumber: number }) {
  return (
    <div className="border border-dashed border-zinc-800 bg-[#0A0A0A] overflow-hidden">
      <div className="aspect-[4/3] flex flex-col items-center justify-center gap-3 p-4">
        <div className="w-10 h-10 rounded-full border-2 border-dashed border-zinc-700 flex items-center justify-center">
          <span className="text-zinc-700 font-bold text-sm">#{slotNumber}</span>
        </div>
        <p className="text-zinc-700 text-xs tracking-widest uppercase text-center">Available</p>
        <Link
          href="/get-a-quote?service=ppf&promo=june-special"
          className="text-[#E85D04] text-xs font-bold tracking-widest uppercase hover:underline"
        >
          Claim This Slot →
        </Link>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function JuneSpecial() {
  const { data: promo, isLoading } = trpc.promo.get.useQuery({ slug: PROMO_SLUG });

  const filledSlots = promo?.slots ?? [];
  const totalSlots = promo?.totalSlots ?? 21;
  const remaining = totalSlots - filledSlots.length;
  const soldOut = remaining <= 0;

  // Build the full 21-slot grid: filled + empty
  const allSlots = Array.from({ length: totalSlots }, (_, i) => {
    const slot = filledSlots.find((s) => s.slotNumber === i + 1);
    return slot ?? null;
  });

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-['DM_Sans',sans-serif]">
      <SEO
        title="June Special — Full Front PPF + Free Paint Correction + Ceramic Coating | Skyline Customs"
        description="Only 21 cars. Full Front STEK DYNOshield PPF + complimentary paint correction + full ceramic coating — all for $2,400. Skyline Custom Shop, Chantilly VA."
        canonical="https://www.skylinecustomshop.com/june-special"
      />
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-[#0A0A0A]">
        {/* Background texture */}
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: "repeating-linear-gradient(45deg, #E85D04 0, #E85D04 1px, transparent 0, transparent 50%)", backgroundSize: "20px 20px" }}
        />
        {/* Orange accent bar */}
        <div className="absolute left-0 top-0 bottom-0 w-2 bg-[#E85D04]" />

        <div className="container max-w-6xl relative z-10 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: copy */}
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-[#E85D04]/10 border border-[#E85D04]/30 text-[#E85D04] text-xs font-bold tracking-[0.3em] uppercase px-4 py-2 mb-6">
                <Clock className="w-3 h-3" />
                June 2026 Only — Limited to 21 Cars
              </div>

              <h1 className="font-['Bebas_Neue',sans-serif] text-6xl md:text-8xl text-white leading-none mb-4">
                JUNE<br />
                <span className="text-[#E85D04]">SPECIAL</span>
              </h1>

              <p className="text-zinc-300 text-xl leading-relaxed mb-8 max-w-lg">
                Every Full Front PPF package this June includes a{" "}
                <strong className="text-white">free single-stage paint correction</strong> and{" "}
                <strong className="text-white">full ceramic coating</strong> — at no extra charge.
              </p>

              {/* Deal summary */}
              <div className="border border-zinc-800 bg-[#0D0D0D] p-6 mb-8">
                <p className="text-[#E85D04] text-xs font-bold tracking-[0.3em] uppercase mb-4">What's Included</p>
                <div className="space-y-3">
                  {[
                    { icon: Shield, label: "Full Front STEK DYNOshield PPF", sub: "Hood, bumper, fenders, mirrors, headlights — 12-year warranty" },
                    { icon: Sparkles, label: "Single-Stage Paint Correction", sub: "Removes swirls and light scratches before film application" },
                    { icon: Zap, label: "Full Ceramic Coating", sub: "Applied over the PPF for hydrophobic protection and deep gloss" },
                  ].map(({ icon: Icon, label, sub }, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <Icon className="w-5 h-5 text-[#E85D04] shrink-0 mt-0.5" />
                      <div>
                        <p className="text-white font-semibold text-sm">{label}</p>
                        <p className="text-zinc-500 text-xs leading-relaxed">{sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-zinc-800 mt-6 pt-4 flex items-center justify-between">
                  <div>
                    <p className="text-zinc-500 text-xs line-through">Normally $3,200+</p>
                    <p className="font-['Bebas_Neue',sans-serif] text-4xl text-white">$2,400</p>
                  </div>
                  <div className="bg-[#E85D04] text-white text-xs font-bold tracking-widest px-3 py-2">
                    SAVE $800+
                  </div>
                </div>
              </div>

              {/* CTA */}
              {!soldOut ? (
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/get-a-quote?service=ppf&promo=june-special"
                    className="bg-[#E85D04] text-white hover:bg-orange-600 font-bold tracking-widest uppercase px-8 py-4 transition-all duration-200 hover:scale-105 flex items-center justify-center gap-2"
                  >
                    CLAIM YOUR SLOT <ArrowRight className="w-4 h-4" />
                  </Link>
                  <a
                    href="tel:+17037754383"
                    className="border-2 border-zinc-700 text-white hover:border-[#E85D04] font-bold tracking-widest uppercase px-8 py-4 transition-all duration-200 text-center"
                  >
                    CALL (703) 775-4383
                  </a>
                </div>
              ) : (
                <div className="border border-red-800 bg-red-900/20 p-4 text-center">
                  <p className="text-red-400 font-bold tracking-widest uppercase">All 21 Slots Filled — June Special is Sold Out</p>
                  <p className="text-zinc-500 text-sm mt-1">Join the waitlist for our July special.</p>
                  <Link href="/get-a-quote" className="text-[#E85D04] text-sm font-bold mt-2 inline-block hover:underline">
                    Join Waitlist →
                  </Link>
                </div>
              )}
            </div>

            {/* Right: progress bar + urgency */}
            <div className="space-y-6">
              {/* Progress box */}
              <div className="border border-zinc-800 bg-[#0D0D0D] p-8">
                <p className="text-[#E85D04] text-xs font-bold tracking-[0.3em] uppercase mb-6">Availability — June 2026</p>
                {isLoading ? (
                  <div className="h-5 bg-zinc-800 animate-pulse" />
                ) : (
                  <ProgressBar filled={filledSlots.length} total={totalSlots} />
                )}
                <p className="text-zinc-600 text-xs mt-4 leading-relaxed">
                  Each slot represents one completed vehicle. Once all 21 are filled, this deal is gone until next month's special.
                </p>
              </div>

              {/* Trust signals */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: Lock, label: "Price Locked", sub: "No hidden fees" },
                  { icon: Star, label: "5-Star Rated", sub: "200+ reviews" },
                  { icon: CheckCircle, label: "STEK Certified", sub: "12-yr warranty" },
                ].map(({ icon: Icon, label, sub }, i) => (
                  <div key={i} className="border border-zinc-800 bg-[#0D0D0D] p-4 text-center">
                    <Icon className="w-5 h-5 text-[#E85D04] mx-auto mb-2" />
                    <p className="text-white text-xs font-bold">{label}</p>
                    <p className="text-zinc-600 text-xs">{sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT'S INCLUDED (detail) ──────────────────────────────────────── */}
      <section className="py-24 bg-[#0D0D0D]">
        <div className="container max-w-6xl">
          <div className="mb-16 text-center">
            <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">The Full Package</p>
            <h2 className="font-['Bebas_Neue',sans-serif] text-5xl md:text-6xl text-white">WHAT YOU GET</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-zinc-800">
            {/* PPF */}
            <div className="bg-[#0D0D0D] p-10">
              <div className="w-12 h-12 bg-[#E85D04]/10 border border-[#E85D04]/30 flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-[#E85D04]" />
              </div>
              <h3 className="font-['Bebas_Neue',sans-serif] text-3xl text-white mb-2">STEK DYNOshield PPF</h3>
              <p className="text-[#E85D04] text-xs font-bold tracking-widest uppercase mb-4">Full Front Coverage</p>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                The full front end of your vehicle — hood, front bumper, both fenders, side mirrors, and headlights — wrapped in STEK DYNOshield, the industry's most advanced self-healing paint protection film.
              </p>
              <ul className="space-y-2">
                {["Full hood", "Full front bumper", "Both fenders", "Side mirrors", "Headlights", "12-year manufacturer warranty"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-zinc-400 text-sm">
                    <CheckCircle className="w-4 h-4 text-[#E85D04] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Paint Correction */}
            <div className="bg-[#111] p-10 relative">
              <div className="absolute top-4 right-4 bg-[#E85D04] text-white text-xs font-bold tracking-widest px-2 py-1">FREE</div>
              <div className="w-12 h-12 bg-[#E85D04]/10 border border-[#E85D04]/30 flex items-center justify-center mb-6">
                <Sparkles className="w-6 h-6 text-[#E85D04]" />
              </div>
              <h3 className="font-['Bebas_Neue',sans-serif] text-3xl text-white mb-2">Paint Correction</h3>
              <p className="text-[#E85D04] text-xs font-bold tracking-widest uppercase mb-4">Single-Stage Included</p>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                Before any film goes on, we machine polish the painted surfaces to remove swirl marks, light scratches, and water spot etching. We never trap imperfections under film.
              </p>
              <ul className="space-y-2">
                {["Machine polish", "Swirl removal", "Light scratch removal", "Water spot correction", "Surface decontamination", "Included at no charge"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-zinc-400 text-sm">
                    <CheckCircle className="w-4 h-4 text-[#E85D04] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Ceramic Coating */}
            <div className="bg-[#0D0D0D] p-10 relative">
              <div className="absolute top-4 right-4 bg-[#E85D04] text-white text-xs font-bold tracking-widest px-2 py-1">FREE</div>
              <div className="w-12 h-12 bg-[#E85D04]/10 border border-[#E85D04]/30 flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-[#E85D04]" />
              </div>
              <h3 className="font-['Bebas_Neue',sans-serif] text-3xl text-white mb-2">Ceramic Coating</h3>
              <p className="text-[#E85D04] text-xs font-bold tracking-widest uppercase mb-4">Full Vehicle Included</p>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                Applied over the PPF and across the entire vehicle, ceramic coating bonds to the surface at a molecular level — creating a hydrophobic, UV-resistant, self-cleaning barrier that makes maintenance effortless.
              </p>
              <ul className="space-y-2">
                {["Full vehicle application", "Hydrophobic top coat", "UV protection", "Enhanced gloss depth", "Self-cleaning properties", "Included at no charge"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-zinc-400 text-sm">
                    <CheckCircle className="w-4 h-4 text-[#E85D04] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── STEK DYNO SHIELD CALLOUT ──────────────────────────────────────── */}
      <section className="py-16 bg-[#0A0A0A] border-y border-zinc-900">
        <div className="container max-w-4xl text-center">
          <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">The Film</p>
          <h2 className="font-['Bebas_Neue',sans-serif] text-5xl text-white mb-4">STEK DYNOshield</h2>
          <p className="text-zinc-400 text-lg leading-relaxed max-w-2xl mx-auto mb-8">
            Not all PPF is the same. STEK DYNOshield is a premium thermoplastic polyurethane film with a self-healing top coat, hydrophobic surface, and optical clarity that makes it virtually invisible on your paint. Backed by a{" "}
            <strong className="text-white">12-year manufacturer warranty</strong> against yellowing, cracking, peeling, and delamination.
          </p>
          <Link href="/services/ppf" className="text-[#E85D04] font-bold tracking-widest uppercase text-sm hover:underline flex items-center justify-center gap-2">
            Learn more about our PPF installation <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ── CUSTOMER GALLERY (filled slots) ──────────────────────────────── */}
      <section className="py-24 bg-[#0D0D0D]">
        <div className="container max-w-6xl">
          <div className="mb-12">
            <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">Real Customers, Real Cars</p>
            <h2 className="font-['Bebas_Neue',sans-serif] text-5xl md:text-6xl text-white">
              WHO'S ALREADY IN
            </h2>
            <p className="text-zinc-500 mt-3 text-sm">
              Every completed car is verified by our team. Remaining slots are open — claim yours before June ends.
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="aspect-[4/3] bg-zinc-900 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {allSlots.map((slot, i) =>
                slot ? (
                  <SlotCard
                    key={i}
                    slotNumber={slot.slotNumber}
                    customerName={slot.customerName}
                    carDescription={slot.carDescription}
                    photoUrl={slot.photoUrl}
                  />
                ) : (
                  <EmptySlotCard key={i} slotNumber={i + 1} />
                )
              )}
            </div>
          )}
        </div>
      </section>

      {/* ── BOTTOM CTA ────────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#E85D04]">
        <div className="container text-center">
          <div className="inline-flex items-center gap-2 bg-black/20 text-white text-xs font-bold tracking-[0.3em] uppercase px-4 py-2 mb-6">
            <Clock className="w-3 h-3" />
            {soldOut ? "Sold Out — Join the Waitlist" : `Only ${remaining} of ${totalSlots} Slots Left`}
          </div>
          <h2 className="font-['Bebas_Neue',sans-serif] text-5xl md:text-7xl text-white mb-4">
            DON'T MISS THIS
          </h2>
          <p className="text-orange-100 text-lg mb-10 max-w-xl mx-auto">
            Full Front PPF + Paint Correction + Ceramic Coating for $2,400. This deal disappears when the last slot is claimed.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/get-a-quote?service=ppf&promo=june-special"
              className="bg-white text-[#E85D04] hover:bg-zinc-100 font-bold tracking-widest uppercase px-10 py-4 transition-all duration-200 hover:scale-105 flex items-center gap-2"
            >
              {soldOut ? "JOIN WAITLIST" : "CLAIM YOUR SLOT"} <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="tel:+17037754383"
              className="border-2 border-white text-white hover:bg-white hover:text-[#E85D04] font-bold tracking-widest uppercase px-10 py-4 transition-all duration-200"
            >
              CALL (703) 775-4383
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
