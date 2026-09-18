/**
 * SKYLINE CUSTOMS — Local SEO Landing Page
 * Vinyl Wraps in Chantilly, VA
 * URL: /vinyl-wraps-chantilly-va
 * Target queries: "vinyl wrap chantilly va", "car wrap near me chantilly", "vehicle wrap northern virginia"
 */

import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Testimonials from "@/components/Testimonials";
import SEO from "@/components/SEO";
import { Shield, MapPin, Phone, Star, CheckCircle, ArrowRight, ChevronDown, Palette } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    q: "How much does a car wrap cost in Chantilly, VA?",
    a: "Full vehicle wraps typically range from $2,500–$6,000+ depending on vehicle size, film type, and complexity of the design. Partial wraps (hood, roof, accents) are significantly less. Contact us for a free, vehicle-specific quote.",
  },
  {
    q: "How long does a vinyl wrap last?",
    a: "A professionally installed vinyl wrap lasts 5–7 years with proper care. Keeping the vehicle garaged, hand-washing, and avoiding high-pressure washing near edges extends lifespan significantly.",
  },
  {
    q: "Will a vinyl wrap damage my paint?",
    a: "No — when installed and removed properly, vinyl wrap actually protects your factory paint. It acts as a barrier against minor scratches, UV, and environmental contaminants. When removed, your original paint is revealed in the same condition.",
  },
  {
    q: "Can I wrap a leased vehicle?",
    a: "Yes. Vinyl wrap is one of the best options for leased vehicles because it's fully reversible. Remove the wrap before returning the car and your factory paint is preserved — no penalties for color changes.",
  },
  {
    q: "What colors and finishes are available?",
    a: "We offer thousands of options: matte, gloss, satin, chrome, color-shift, brushed metal, carbon fiber texture, and custom printed designs. If you can imagine it, we can likely wrap it.",
  },
  {
    q: "How long does a full wrap installation take?",
    a: "A full vehicle wrap typically takes 3–5 business days. Partial wraps and accent pieces can often be completed in 1–2 days. We'll give you a firm timeline at your consultation.",
  },
];

const nearbyAreas = [
  "Chantilly", "Centreville", "Herndon", "Reston", "Ashburn",
  "Sterling", "Dulles", "Fairfax", "Vienna", "McLean",
];

const finishes = [
  { name: "Gloss", desc: "High-shine finish that mimics factory paint with a deeper, richer color." },
  { name: "Matte", desc: "Flat, non-reflective finish for a stealthy, aggressive look." },
  { name: "Satin", desc: "Between gloss and matte — a smooth sheen that turns heads." },
  { name: "Color-Shift", desc: "Changes color depending on viewing angle and lighting conditions." },
  { name: "Chrome", desc: "Mirror-like metallic finish for maximum visual impact." },
  { name: "Carbon Fiber", desc: "Textured carbon fiber look without the cost of real carbon fiber panels." },
  { name: "Brushed Metal", desc: "Brushed aluminum or steel texture for an industrial, premium aesthetic." },
  { name: "Custom Print", desc: "Full custom graphics, patterns, or branding printed to any design." },
];

export default function LocalWrap() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-['DM_Sans',sans-serif]">
      <SEO
        title="Vinyl Wraps Chantilly VA | Car Wrap Shop"
        description="Professional vinyl wraps in Chantilly, VA. Full & partial wraps in matte, gloss, satin, chrome & custom designs. Protect your paint & transform your look. Free quotes."
        canonical="https://www.skylinecustomshop.com/vinyl-wraps-chantilly-va"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "AutoBodyShop",
            "name": "Skyline Custom Shop",
            "url": "https://www.skylinecustomshop.com",
            "telephone": "+17037754383",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "4215 Walney Rd Suite R",
              "addressLocality": "Chantilly",
              "addressRegion": "VA",
              "postalCode": "20151",
              "addressCountry": "US"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 38.8951,
              "longitude": -77.4302
            },
            "openingHoursSpecification": [
              { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"], "opens": "09:00", "closes": "18:00" }
            ],
            "areaServed": ["Chantilly VA","Centreville VA","Herndon VA","Reston VA","Ashburn VA","Fairfax VA","Sterling VA","Northern Virginia"],
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Vinyl Wrap Services",
              "itemListElement": [
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Full Vehicle Vinyl Wrap" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Partial Vinyl Wrap" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Accent & Roof Wrap" } }
              ]
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "5",
              "reviewCount": "500",
              "bestRating": "5",
              "worstRating": "1"
            }
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(f => ({
              "@type": "Question",
              "name": f.q,
              "acceptedAnswer": { "@type": "Answer", "text": f.a }
            }))
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.skylinecustomshop.com/" },
              { "@type": "ListItem", "position": 2, "name": "Vinyl Wraps Chantilly VA", "item": "https://www.skylinecustomshop.com/vinyl-wraps-chantilly-va" }
            ]
          }
        ]}
      />
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-end pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0A] via-[#111] to-[#0d0a1a]" />
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 40px, #E85D04 40px, #E85D04 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, #E85D04 40px, #E85D04 41px)" }}
        />
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10"
          style={{ background: "radial-gradient(ellipse at top right, #E85D04, transparent 70%)" }}
        />
        <div className="container relative z-10 pt-32">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-4 h-4 text-[#E85D04]" />
            <span className="text-[#E85D04] text-sm font-bold tracking-widest uppercase">Chantilly, Virginia</span>
          </div>
          <div className="max-w-4xl">
            <h1 className="font-['Bebas_Neue',sans-serif] text-5xl md:text-7xl lg:text-8xl leading-none text-white mb-6">
              VINYL WRAPS<br />
              <span className="text-[#E85D04]">CHANTILLY, VA</span>
            </h1>
            <p className="text-zinc-300 text-lg md:text-xl max-w-2xl leading-relaxed mb-8">
              Transform your vehicle's appearance with a professional vinyl wrap — thousands of colors and finishes, fully reversible, and priced far below a respray. Serving Northern Virginia from our Chantilly shop.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/get-a-quote?service=wrap"
                className="bg-[#E85D04] hover:bg-[#d14e00] text-white font-bold tracking-widest uppercase px-8 py-4 transition-all duration-200 hover:scale-105 inline-flex items-center gap-2"
              >
                GET A FREE QUOTE <ArrowRight className="w-4 h-4" />
              </Link>
              <a href="tel:+17037754383"
                className="border border-zinc-600 hover:border-[#E85D04] text-white font-bold tracking-widest uppercase px-8 py-4 transition-all duration-200 inline-flex items-center gap-2"
              >
                <Phone className="w-4 h-4" /> (703) 775-4383
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="h-1 bg-[#E85D04]" />

      {/* Trust bar */}
      <section className="py-8 bg-[#0D0D0D] border-b border-zinc-800">
        <div className="container">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {[
              { icon: Star, text: "500+ Five-Star Reviews" },
              { icon: Palette, text: "Thousands of Colors & Finishes" },
              { icon: Shield, text: "Protects Factory Paint" },
              { icon: MapPin, text: "Chantilly, VA — Locally Owned" },
            ].map(({ icon: Icon, text }, i) => (
              <div key={i} className="flex items-center gap-2 text-zinc-300">
                <Icon className="w-4 h-4 text-[#E85D04] flex-shrink-0" />
                <span className="text-sm font-medium">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why wrap */}
      <section className="py-24 bg-[#0A0A0A]">
        <div className="container max-w-5xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">Why Vinyl Wrap</p>
              <h2 className="font-['Bebas_Neue',sans-serif] text-4xl md:text-5xl text-white mb-6 leading-tight">
                A NEW COLOR.<br />A NEW IDENTITY.<br />FULLY REVERSIBLE.
              </h2>
              <p className="text-zinc-400 leading-relaxed mb-4">
                A factory respray costs $5,000–$15,000 and permanently alters your vehicle's paint history — affecting resale value. A professional vinyl wrap achieves the same visual transformation at a fraction of the cost, and it's completely removable.
              </p>
              <p className="text-zinc-400 leading-relaxed mb-4">
                Vinyl wrap also protects the original paint underneath from UV rays, minor scratches, and road debris. When you're ready to sell or return a leased vehicle, simply remove the wrap and reveal factory-condition paint.
              </p>
              <p className="text-zinc-400 leading-relaxed">
                Skyline Customs installs 3M, Avery Dennison, and KPMF films — the industry's most respected brands — with precision cuts and seamless edges.
              </p>
            </div>
            <div className="space-y-4">
              {[
                { title: "Fraction of Respray Cost", desc: "Full vehicle wraps start well below the cost of a quality paint job — with results that rival factory finishes." },
                { title: "Fully Reversible", desc: "Change your mind? Remove the wrap and your original factory paint is revealed, unharmed." },
                { title: "Protects Factory Paint", desc: "The film acts as a sacrificial layer against UV, minor abrasions, and environmental contaminants." },
                { title: "Lease-Friendly", desc: "Customize a leased vehicle without violating your lease agreement — remove before return." },
                { title: "Thousands of Options", desc: "Matte, gloss, satin, chrome, color-shift, carbon fiber, brushed metal, and fully custom prints." },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-4 border border-zinc-800 bg-[#0D0D0D] hover:border-[#E85D04] transition-colors">
                  <CheckCircle className="w-5 h-5 text-[#E85D04] flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-white font-bold text-sm mb-1">{item.title}</h3>
                    <p className="text-zinc-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Finishes */}
      <section className="py-24 bg-[#0D0D0D]">
        <div className="container max-w-5xl">
          <div className="mb-14">
            <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">Film Finishes</p>
            <h2 className="font-['Bebas_Neue',sans-serif] text-4xl md:text-5xl text-white">ENDLESS POSSIBILITIES</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-zinc-800">
            {finishes.map((finish, i) => (
              <div key={i} className="bg-[#0D0D0D] p-6 hover:bg-[#111] transition-colors group">
                <h3 className="font-['Bebas_Neue',sans-serif] text-xl text-white mb-2 group-hover:text-[#E85D04] transition-colors">{finish.name}</h3>
                <p className="text-zinc-500 text-xs leading-relaxed">{finish.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/get-a-quote?service=wrap"
              className="bg-[#E85D04] hover:bg-[#d14e00] text-white font-bold tracking-widest uppercase px-8 py-4 transition-colors inline-flex items-center gap-2"
            >
              DISCUSS YOUR VISION <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-[#0A0A0A]">
        <div className="container max-w-3xl">
          <div className="mb-14">
            <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">Common Questions</p>
            <h2 className="font-['Bebas_Neue',sans-serif] text-4xl md:text-5xl text-white">VINYL WRAP FAQ — CHANTILLY, VA</h2>
          </div>
          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-zinc-800 bg-[#0D0D0D]">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-[#111] transition-colors"
                >
                  <span className="text-white font-semibold text-sm pr-4">{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-[#E85D04] flex-shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5">
                    <p className="text-zinc-400 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service area */}
      <section className="py-16 bg-[#0D0D0D] border-t border-zinc-800">
        <div className="container max-w-5xl text-center">
          <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">Service Area</p>
          <h2 className="font-['Bebas_Neue',sans-serif] text-3xl md:text-4xl text-white mb-6">
            SERVING ALL OF NORTHERN VIRGINIA
          </h2>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {nearbyAreas.map((area) => (
              <span key={area} className="border border-zinc-700 text-zinc-400 text-sm px-4 py-2 hover:border-[#E85D04] hover:text-white transition-colors">
                {area}, VA
              </span>
            ))}
          </div>
          <p className="text-zinc-500 text-sm max-w-xl mx-auto">
            Located at 4215 Walney Rd Suite R, Chantilly, VA 20151 — accessible from Route 28, Route 50, and the Dulles Toll Road.
          </p>
        </div>
      </section>

      <Testimonials service="Vinyl Wrap" title="WHAT NOVA DRIVERS SAY ABOUT OUR WRAPS" />

      {/* CTA */}
      <section className="py-20 bg-[#E85D04]">
        <div className="container max-w-3xl text-center">
          <h2 className="font-['Bebas_Neue',sans-serif] text-5xl md:text-6xl text-white mb-4">
            READY TO TRANSFORM YOUR RIDE?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
            Get a free vinyl wrap quote from Chantilly's top-rated installer. Bring your vision — we'll make it happen.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/get-a-quote?service=wrap"
              className="bg-white hover:bg-zinc-100 text-[#E85D04] font-bold tracking-widest uppercase px-10 py-4 transition-colors inline-flex items-center gap-2"
            >
              GET MY FREE QUOTE <ArrowRight className="w-4 h-4" />
            </Link>
            <a href="tel:+17037754383"
              className="border-2 border-white hover:bg-white/10 text-white font-bold tracking-widest uppercase px-10 py-4 transition-colors inline-flex items-center gap-2"
            >
              <Phone className="w-4 h-4" /> CALL NOW
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
