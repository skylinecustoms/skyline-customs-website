/**
 * SKYLINE CUSTOMS — Get A Quote Page
 * Design: Industrial Brutalism | Dark matte black + burnt orange (#E85D04)
 * URL: /get-a-quote
 */

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import QuoteSteps from "@/components/QuoteSteps";
import { Shield, Clock, Star } from "lucide-react";
import { useGoogleRating } from "@/lib/reviews";

export default function GetAQuote() {
  const { rating, total } = useGoogleRating();
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-['DM_Sans',sans-serif]">
      <SEO
        title="Get a Free Quote | Chantilly VA"
        description="Request a free full front PPF, ceramic coating, or window tint quote in Northern Virginia. A Skyline specialist replies with an exact price, usually within the hour."
        canonical="https://www.skylinecustomshop.com/get-a-quote"
      />
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0A] via-[#111] to-[#1a0a00]" />
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 40px, #E85D04 40px, #E85D04 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, #E85D04 40px, #E85D04 41px)",
          }}
        />
        <div
          className="absolute top-0 right-0 w-1/2 h-full opacity-10"
          style={{ background: "radial-gradient(ellipse at top right, #E85D04, transparent 70%)" }}
        />
        <div className="container relative z-10 max-w-5xl">
          <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">
            Free Quote
          </p>
          <h1 className="font-['Bebas_Neue',sans-serif] text-6xl md:text-8xl leading-none text-white mb-4">
            PROTECT YOUR<br />
            <span className="text-[#E85D04]">INVESTMENT</span>
          </h1>
          <p className="text-zinc-400 text-lg max-w-xl leading-relaxed">
            Fill out the form below and we'll reach out to walk you through the best protection package for your vehicle and budget. No pressure, no obligation.
          </p>

          {/* Trust bar */}
          <div className="flex flex-wrap gap-8 mt-8">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-[#E85D04]" />
              <span className="text-zinc-400 text-sm">{rating && total ? `${rating.toFixed(1)} stars from ${total} Google reviews` : "Five-star Google reviews"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#E85D04]" />
              <span className="text-zinc-400 text-sm">Response Within the Hour</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#E85D04]" />
              <span className="text-zinc-400 text-sm">Lifetime Craftsmanship Warranty</span>
            </div>
          </div>
        </div>
      </section>

      {/* Orange divider */}
      <div className="h-1 bg-[#E85D04]" />

      {/* Form Section: the shared three-step form, reading ?service=, promo params and AI assistant answers */}
      <section id="quote-form-section" className="py-16 bg-[#0D0D0D]">
        <div className="container max-w-3xl">
          <QuoteSteps formId="quote" readUrlParams showActivePromo />
        </div>
      </section>

      {/* What happens next */}
      <section className="py-16 bg-[#0D0D0D] border-t border-zinc-800">
        <div className="container max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <p className="text-[#E85D04] text-xs font-bold tracking-[0.3em] uppercase mb-2">Step 1</p>
            <h2 className="font-['Bebas_Neue',sans-serif] text-2xl text-white mb-2">WE READ YOUR REQUEST</h2>
            <p className="text-zinc-400 text-sm leading-relaxed">Year, make, model, and the coverage you want are all we need. Add a note about how you drive, where you park, or whether the car is new, and the quote gets more precise. Requests during business hours usually get a reply within the hour; every request gets one the same business day.</p>
          </div>
          <div>
            <p className="text-[#E85D04] text-xs font-bold tracking-[0.3em] uppercase mb-2">Step 2</p>
            <h2 className="font-['Bebas_Neue',sans-serif] text-2xl text-white mb-2">YOU GET A WRITTEN QUOTE</h2>
            <p className="text-zinc-400 text-sm leading-relaxed">Not a range and not a starting-at number. The quote lists the package, what it covers panel by panel, the film or coating, and the warranty. If two options make sense for your car we send both so you can compare. No obligation, and the quote is good for 30 days.</p>
          </div>
          <div>
            <p className="text-[#E85D04] text-xs font-bold tracking-[0.3em] uppercase mb-2">Step 3</p>
            <h2 className="font-['Bebas_Neue',sans-serif] text-2xl text-white mb-2">BOOK A DAY THAT WORKS</h2>
            <p className="text-zinc-400 text-sm leading-relaxed">Approve the quote and a 20% deposit locks your date and your price; it goes toward your total and is fully refundable at any time. Most PPF and tint jobs are same-day at our Chantilly shop, and a ceramic coating is two days. Drop off at 9 AM at 4215 Walney Rd, Suite 1A and B, and we call when the car is ready. Free parking on site, and we walk you through aftercare and register the warranty before you leave.</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
