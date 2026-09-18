/*
 * SKYLINE CUSTOMS — Local SEO Landing Page
 * Vinyl Wraps in Springfield, VA
 * URL: /vinyl-wraps-springfield-va
 */

import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Testimonials from "@/components/Testimonials";
import SEO from "@/components/SEO";
import { Shield, MapPin, Phone, Star, CheckCircle, ArrowRight, ChevronDown, Palette } from "lucide-react";
import { useState } from "react";
import NearbyAreas from "@/components/NearbyAreas";

const faqs = [
  {
    q: "Do you offer vinyl wraps for cars in Springfield, VA?",
    a: "Yes — we serve Springfield and all of Northern Virginia from our shop at 4215 Walney Rd Suite R, Chantilly, VA 20151. Springfield is about 25 minutes away via I-66 or the Fairfax County Parkway.",
  },
  {
    q: "How much does a vinyl wrap cost near Springfield?",
    a: "Full color change wraps start at $3,000 for sedans, $4,000 for SUVs/crossovers, and $4,500 for trucks. Partial combos (roof + hood + mirrors) start at $850. Chrome delete starts at $600 for sedans. All prices subject to in-person inspection. Contact us for a free, no-obligation quote.",
  },
  {
    q: "How long does a vinyl wrap last?",
    a: "A professionally installed vinyl wrap typically lasts 5–7 years with proper care. Keeping the vehicle garaged and hand-washed (avoiding high-pressure washes) will maximize the wrap's lifespan.",
  },
  {
    q: "Can a vinyl wrap protect my original paint?",
    a: "Yes — vinyl wraps act as a protective layer over your factory paint. When properly removed, the paint underneath is preserved, which can increase resale value compared to a traditional respray.",
  },
  {
    q: "What colors and finishes are available for vinyl wraps near Springfield?",
    a: "We offer hundreds of colors and finishes including matte, gloss, satin, chrome, color-shift, brushed metal, and custom printed designs. We work with 3M, Avery Dennison, and KPMF films.",
  },
  {
    q: "How long does a full vehicle wrap take to install?",
    a: "A full vehicle wrap typically takes 3–5 days depending on vehicle complexity and design. We'll give you a firm timeline at your consultation.",
  },
];

const nearbyAreas = [
  "Springfield", "Burke", "Fairfax", "Annandale",
  "Alexandria", "Lorton", "Newington", "Fort Belvoir", "Kingstowne",
];

export default function SpringfieldWrap() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-['DM_Sans',sans-serif]">
      <SEO
        title="Vinyl Wraps Springfield VA | Car Wrap Near Me"
        description="Top-rated vinyl wrap installer serving Springfield, VA. Full vehicle wraps, partial wraps, color changes, and custom designs. Free quotes. 5.0 stars on Google."
        canonical="https://www.skylinecustomshop.com/vinyl-wraps-springfield-va"
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
            "areaServed": ["Springfield, VA", "Chantilly, VA", "Northern Virginia"],
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "5",
              "reviewCount": "78",
              "bestRating": "5"
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
              { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://www.skylinecustomshop.com/services" },
              { "@type": "ListItem", "position": 3, "name": "Vinyl Wraps", "item": "https://www.skylinecustomshop.com/services/vinyl-wraps" },
              { "@type": "ListItem", "position": 4, "name": "Springfield, VA", "item": "https://www.skylinecustomshop.com/vinyl-wraps-springfield-va" }
            ]
          }
        ]}
      />
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[55vh] flex items-end pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0A] via-[#111] to-[#0a0d0a]" />
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 40px, #E85D04 40px, #E85D04 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, #E85D04 40px, #E85D04 41px)" }}
        />
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10"
          style={{ background: "radial-gradient(ellipse at top right, #E85D04, transparent 70%)" }}
        />
        <div className="container relative z-10 pt-32">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-4 h-4 text-[#E85D04]" />
            <span className="text-[#E85D04] text-sm font-bold tracking-widest uppercase">Springfield, VA</span>
          </div>
          <div className="max-w-4xl">
            <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">Vinyl Wraps</p>
            <h1 className="font-['Bebas_Neue',sans-serif] text-6xl md:text-8xl lg:text-9xl leading-none text-white mb-4">
              VINYL WRAPS NEAR<br />
              <span className="text-[#E85D04]">SPRINGFIELD</span>
            </h1>
            <p className="text-zinc-300 text-lg md:text-xl max-w-2xl leading-relaxed mb-6">
              Northern Virginia's top-rated vinyl wrap installer, just 25 minutes from Springfield via I-66 or the Fairfax County Parkway. Full color changes, partial wraps, and custom designs using 3M, Avery Dennison, and KPMF films.
            </p>
            <div className="flex flex-wrap gap-3 mb-6">
              {["5.0 ★ Google Rating", "Free Quotes", "500+ Colors & Finishes", "3M & Avery Films"].map((b) => (
                <span key={b} className="flex items-center gap-1.5 text-sm text-zinc-300 border border-zinc-700 px-3 py-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-[#E85D04]" />{b}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-4">
              <Link href="/get-a-quote?service=wrap"
                className="bg-[#E85D04] hover:bg-[#d14e00] text-white font-bold tracking-widest uppercase px-8 py-4 transition-all duration-200 hover:scale-105 inline-flex items-center gap-2"
              >
                GET A FREE QUOTE <ArrowRight className="w-4 h-4" />
              </Link>
              <a href="tel:+17037754383"
                className="border border-zinc-600 hover:border-[#E85D04] text-zinc-300 hover:text-white font-bold tracking-widest uppercase px-8 py-4 transition-all inline-flex items-center gap-2"
              >
                <Phone className="w-4 h-4" /> (703) 775-4383
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="h-1 bg-[#E85D04]" />

      {/* Why Vinyl Wraps near Springfield */}
      <section className="py-20 bg-[#0D0D0D]">
        <div className="container">
          <div className="mb-12">
            <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">Why Vinyl Wraps in Springfield</p>
            <h2 className="font-['Bebas_Neue',sans-serif] text-5xl text-white">TRANSFORM YOUR CAR WITHOUT A RESPRAY</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-800">
            {[
              { icon: Palette, title: "Endless Color Options", desc: "Choose from hundreds of matte, gloss, satin, chrome, and color-shift finishes. Express your style without committing to a permanent paint change." },
              { icon: Shield, title: "Paint Protection", desc: "Vinyl wraps protect your factory paint from minor scratches, stone chips, and UV fading — preserving your car's resale value for years." },
              { icon: Star, title: "Reversible & Resaleable", desc: "Unlike a respray, a vinyl wrap can be removed cleanly when you're ready for a new look or want to restore the original paint for resale." },
              { icon: CheckCircle, title: "Fraction of Respray Cost", desc: "A full vinyl wrap delivers a dramatic transformation at a fraction of the cost of a professional paint job, with faster turnaround times." },
            ].map((item, i) => (
              <div key={i} className="bg-[#0D0D0D] p-8 hover:bg-[#111] transition-colors group">
                <item.icon className="w-8 h-8 text-[#E85D04] mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-['Bebas_Neue',sans-serif] text-2xl text-white mb-2">{item.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service area */}
      <section className="py-20 bg-[#0A0A0A]">
        <div className="container text-center">
          <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">Service Area</p>
          <h2 className="font-['Bebas_Neue',sans-serif] text-4xl md:text-5xl text-white mb-8">
            SERVING SPRINGFIELD & ALL OF NOVA
          </h2>
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {nearbyAreas.map((area) => (
              <span key={area} className="border border-zinc-700 text-zinc-400 text-sm px-4 py-2 hover:border-[#E85D04] hover:text-white transition-colors">
                {area}, VA
              </span>
            ))}
          </div>
          <p className="text-zinc-500 text-sm max-w-xl mx-auto">
            Our shop is at 4215 Walney Rd Suite R, Chantilly, VA 20151 — about 25 minutes from Springfield via I-66 or the Fairfax County Parkway. Free parking on site.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-[#0D0D0D]">
        <div className="container max-w-3xl">
          <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">FAQ</p>
          <h2 className="font-['Bebas_Neue',sans-serif] text-4xl md:text-5xl text-white mb-10">
            VINYL WRAP QUESTIONS FROM SPRINGFIELD DRIVERS
          </h2>
          <div className="space-y-px">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-[#111] border-l-2 border-transparent hover:border-[#E85D04] transition-colors">
                <button
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="text-white font-medium">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-[#E85D04] shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-zinc-400 text-sm leading-relaxed">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Testimonials title="WHAT SPRINGFIELD DRIVERS SAY ABOUT OUR VINYL WRAPS" />

      {/* CTA */}
      <section className="py-20 bg-[#E85D04]">
        <div className="container max-w-3xl text-center">
          <h2 className="font-['Bebas_Neue',sans-serif] text-5xl md:text-6xl text-white mb-4">
            TRANSFORM YOUR CAR TODAY
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
            Get a free vinyl wrap quote from Northern Virginia's top-rated installer. Just 25 minutes from Springfield.
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

      <NearbyAreas city="Springfield" service="wrap" />

      <section className="py-8 bg-[#111] border-t border-zinc-800">
        <div className="container text-center">
          <p className="text-zinc-400 text-sm">
            Serving all of Northern Virginia —{" "}
            <Link href="/service-areas" className="text-[#E85D04] hover:underline font-medium">
              view all service areas
            </Link>
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
