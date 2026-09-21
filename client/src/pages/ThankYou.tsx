/**
 * SKYLINE CUSTOMS — Thank You Page
 * Design: Industrial Brutalism | Dark matte black + burnt orange (#E85D04)
 * URL: /thank-you
 */

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { CheckCircle, Phone, Images } from "lucide-react";
import { Link } from "wouter";

export default function ThankYou() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-['DM_Sans',sans-serif]">
      <SEO
        title="You're All Set | Skyline Customs — Chantilly, VA"
        description="Thank you for reaching out to Skyline Customs. A specialist will be in touch shortly."
        canonical="/thank-you"
      />
      <Navbar />

      {/* Background grid */}
      <div className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 40px, #E85D04 40px, #E85D04 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, #E85D04 40px, #E85D04 41px)",
        }}
      />

      <section className="relative min-h-[80vh] flex items-center justify-center pt-24 pb-16">
        <div className="container max-w-2xl text-center relative z-10">

          {/* Check icon */}
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 border-2 border-[#E85D04] flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-[#E85D04]" />
            </div>
          </div>

          {/* Headline */}
          <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">
            Form Received
          </p>
          <h1 className="font-['Bebas_Neue',sans-serif] text-6xl md:text-8xl leading-none text-white mb-6">
            YOU'RE<br />
            <span className="text-[#E85D04]">ALL SET</span>
          </h1>

          {/* Body copy */}
          <p className="text-zinc-400 text-lg leading-relaxed mb-10 max-w-md mx-auto">
            Someone from our team will reach out shortly — usually within the hour during business hours.
          </p>

          {/* Divider */}
          <div className="h-px bg-zinc-800 mb-10" />

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/gallery"
              className="inline-flex items-center justify-center gap-3 bg-[#E85D04] hover:bg-[#d14e00] text-black font-bold tracking-widest uppercase px-8 py-4 transition-all duration-200 hover:scale-105"
            >
              <Images className="w-4 h-4" />
              VIEW OUR GALLERY
            </Link>
            <a
              href="tel:+17037754383"
              className="inline-flex items-center justify-center gap-3 border border-zinc-600 hover:border-[#E85D04] text-white hover:text-[#E85D04] font-bold tracking-widest uppercase px-8 py-4 transition-all duration-200"
            >
              <Phone className="w-4 h-4" />
              CALL US NOW
            </a>
          </div>

          {/* Hours note */}
          <p className="text-zinc-600 text-xs font-mono mt-8 uppercase tracking-widest">
            Mon–Fri 9AM–6PM  ·&nbsp; (703) 775-4383
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
