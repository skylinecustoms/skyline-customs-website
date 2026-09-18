/**
 * SKYLINE CUSTOMS — Local SEO Landing Page
 * Vinyl Wraps in Herndon, VA
 * URL: /vinyl-wraps-herndon-va
 */

import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Testimonials from "@/components/Testimonials";
import SEO from "@/components/SEO";
import { MapPin, Phone, Star, CheckCircle, ArrowRight, ChevronDown, Palette, Layers } from "lucide-react";
import { useState } from "react";
import NearbyAreas from "@/components/NearbyAreas";

const faqs = [
  {
    q: "Do you offer vinyl wraps near Herndon, VA?",
    a: "Yes — we serve Herndon and all of Northern Virginia from our shop at 4215 Walney Rd Suite R, Chantilly, VA 20151. Herndon is just 10–15 minutes away via Route 28 or the Dulles Toll Road.",
  },
  {
    q: "How much does a vinyl wrap cost near Herndon?",
    a: "Full vehicle wraps typically range from $2,500–$5,000+ depending on vehicle size, film type, and complexity. Partial wraps and accent panels start lower. Contact us for a free, no-obligation quote.",
  },
  {
    q: "How long does a vinyl wrap last?",
    a: "Quality vinyl wraps from 3M, Avery Dennison, and KPMF last 5–7 years with proper care. Garage-kept vehicles and those washed regularly can exceed this lifespan.",
  },
  {
    q: "Can I wrap my leased vehicle?",
    a: "Absolutely — vinyl wrapping a leased vehicle is a smart way to protect the factory paint while customizing the look. When the lease ends, simply remove the wrap to reveal pristine factory paint underneath.",
  },
  {
    q: "What finishes are available for vinyl wraps?",
    a: "We offer gloss, matte, satin, chrome, brushed metal, color-shift, and custom printed wraps. With thousands of film options, the customization possibilities are virtually unlimited.",
  },
  {
    q: "Do you offer fleet wraps for Herndon businesses?",
    a: "Yes — we work with local businesses in Herndon, Reston, and the Dulles corridor on fleet graphics and branded vehicle wraps. Contact us for fleet pricing and turnaround times.",
  },
];

const nearbyAreas = [
  "Herndon", "Reston", "Dulles", "Sterling", "Ashburn",
  "Chantilly", "Centreville", "Fairfax", "Vienna", "McLean",
];

export default function HerndonWrap() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-['DM_Sans',sans-serif]">
      <SEO
        title="Vinyl Wraps Herndon VA | Car Wrap Near Me"
        description="Custom vinyl wraps in Herndon, VA. Full wraps, partial wraps, color changes, and fleet graphics. 5.0 stars on Google. Free quotes."
        canonical="https://www.skylinecustomshop.com/vinyl-wraps-herndon-va"
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
            "areaServed": ["Herndon, VA", "Chantilly, VA", "Northern Virginia"],
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
              { "@type": "ListItem", "position": 4, "name": "Herndon, VA", "item": "https://www.skylinecustomshop.com/vinyl-wraps-herndon-va" }
            ]
          }
        ]}
      />
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[55vh] flex items-end pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0A] via-[#0d0d0d] to-[#0a0a0d]" />
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 40px, #E85D04 40px, #E85D04 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, #E85D04 40px, #E85D04 41px)" }}
        />
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10"
          style={{ background: "radial-gradient(ellipse at top right, #E85D04, transparent 70%)" }}
        />
        <div className="container relative z-10 pt-32">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-4 h-4 text-[#E85D04]" />
            <span className="text-[#E85D04] text-sm font-bold tracking-widest uppercase">Herndon, VA</span>
          </div>
          <div className="max-w-4xl">
            <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">Vinyl Wraps</p>
            <h1 className="font-['Bebas_Neue',sans-serif] text-6xl md:text-8xl lg:text-9xl leading-none text-white mb-4">
              VINYL WRAPS<br />
              <span className="text-[#E85D04]">HERNDON</span>
            </h1>
            <p className="text-zinc-300 text-lg md:text-xl max-w-2xl leading-relaxed mb-6">
              Transform your vehicle with a custom vinyl wrap. Full color changes, partial wraps, matte finishes, and fleet graphics — serving Herndon and all of Northern Virginia.
            </p>
            <div className="flex flex-wrap gap-3 mb-6">
              {["5.0 ★ Google Rating", "3M & Avery Films", "Fleet Graphics Available", "Lease-Safe Wraps"].map((b) => (
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

      {/* Benefits */}
      <section className="py-20 bg-[#0D0D0D]">
        <div className="container">
          <div className="mb-12">
            <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">Why Vinyl Wrap</p>
            <h2 className="font-['Bebas_Neue',sans-serif] text-5xl text-white">REINVENT YOUR VEHICLE</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-800">
            {[
              { icon: Palette, title: "Unlimited Colors", desc: "Thousands of film options — gloss, matte, satin, chrome, color-shift, and custom prints. If you can imagine it, we can wrap it." },
              { icon: Layers, title: "Paint Protection", desc: "Vinyl wrap acts as a sacrificial layer, protecting your factory paint from rock chips, UV, and minor abrasions." },
              { icon: Star, title: "Reversible", desc: "Unlike a paint job, vinyl wrap is fully removable. Perfect for leased vehicles or those who want to change looks later." },
              { icon: CheckCircle, title: "Fleet Graphics", desc: "Turn your work vehicles into rolling billboards. We offer fleet wraps and branded graphics for Herndon-area businesses." },
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
            SERVING HERNDON & ALL OF NOVA
          </h2>
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {nearbyAreas.map((area) => (
              <span key={area} className="border border-zinc-700 text-zinc-400 text-sm px-4 py-2 hover:border-[#E85D04] hover:text-white transition-colors">
                {area}, VA
              </span>
            ))}
          </div>
          <p className="text-zinc-500 text-sm max-w-xl mx-auto">
            Located at 4215 Walney Rd Suite R, Chantilly, VA 20151 — just 10–15 minutes from Herndon via Route 28.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-[#0D0D0D]">
        <div className="container max-w-3xl">
          <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">FAQ</p>
          <h2 className="font-['Bebas_Neue',sans-serif] text-4xl md:text-5xl text-white mb-10">
            VINYL WRAP QUESTIONS FROM HERNDON DRIVERS
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

      <Testimonials title="WHAT HERNDON DRIVERS SAY ABOUT OUR VINYL WRAPS" />

      {/* CTA */}
      <section className="py-20 bg-[#E85D04]">
        <div className="container max-w-3xl text-center">
          <h2 className="font-['Bebas_Neue',sans-serif] text-5xl md:text-6xl text-white mb-4">
            TRANSFORM YOUR VEHICLE
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
            Get a free vinyl wrap quote from Northern Virginia's top-rated installer. Just 10–15 minutes from Herndon.
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

      <NearbyAreas city="Herndon" service="wrap" />

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
