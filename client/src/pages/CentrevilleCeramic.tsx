/**
 * SKYLINE CUSTOMS — Local SEO Landing Page
 * Ceramic Coating in Centreville, VA
 * URL: /ceramic-coating-centreville-va
 */

import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Testimonials from "@/components/Testimonials";
import SEO from "@/components/SEO";
import { Shield, MapPin, Phone, Star, CheckCircle, ArrowRight, ChevronDown, Droplets } from "lucide-react";
import { useState } from "react";
import NearbyAreas from "@/components/NearbyAreas";

const faqs = [
  {
    q: "Do you offer ceramic coating near Centreville, VA?",
    a: "Yes — we serve Centreville and all of Northern Virginia from our shop at 4215 Walney Rd Suite R, Chantilly, VA 20151. Centreville is just 10 minutes away via Route 28 or I-66.",
  },
  {
    q: "How much does ceramic coating cost near Centreville?",
    a: "Ceramic coating starts at $800 for sedans (no correction, Gtechniq CSL + Exo, 7-year warranty). The Crystal Package (Stage 2 correction + 5-year coating) starts at $1,300. The Ultimate Coating (Stage 3 correction + 7-year coating) starts at $1,500. SUV and truck pricing is slightly higher. Contact us for a free quote.",
  },
  {
    q: "How long does ceramic coating last?",
    a: "Our entry-level coatings last 2–3 years. Mid-tier coatings last 5 years. Our flagship lifetime coating is backed by a manufacturer warranty for the life of the vehicle with annual inspections.",
  },
  {
    q: "Do I need paint correction before ceramic coating?",
    a: "In most cases, yes. We perform a thorough paint inspection and recommend the appropriate level of paint correction before coating to ensure the ceramic bonds to a flawless surface.",
  },
  {
    q: "What does ceramic coating protect against?",
    a: "Ceramic coating protects against UV oxidation, bird droppings, tree sap, road grime, light scratches, and water spots. It also makes your car dramatically easier to wash and maintain.",
  },
  {
    q: "Can ceramic coating be applied to a new car?",
    a: "Absolutely — new cars are ideal candidates for ceramic coating. Factory paint often has minor defects from transport and dealer prep. We correct those and coat the car before any damage occurs.",
  },
];

const nearbyAreas = [
  "Centreville", "Chantilly", "Manassas", "Fairfax", "Herndon",
  "Reston", "Ashburn", "Sterling", "Gainesville", "Bristow",
];

export default function CentrevilleCeramic() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-['DM_Sans',sans-serif]">
      <SEO
        title="Ceramic Coating Centreville VA | Car Detailing Near Me"
        description="Professional ceramic coating in Centreville, VA. Nano-ceramic protection, paint correction, and showroom gloss. 5.0 stars on Google. Free quotes."
        canonical="https://www.skylinecustomshop.com/ceramic-coating-centreville-va"
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
            "areaServed": ["Centreville, VA", "Chantilly, VA", "Northern Virginia"],
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
              { "@type": "ListItem", "position": 3, "name": "Ceramic Coating", "item": "https://www.skylinecustomshop.com/services/ceramic-coating" },
              { "@type": "ListItem", "position": 4, "name": "Centreville, VA", "item": "https://www.skylinecustomshop.com/ceramic-coating-centreville-va" }
            ]
          }
        ]}
      />
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[55vh] flex items-end pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0A] via-[#0d0d0d] to-[#0a0d0a]" />
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 40px, #E85D04 40px, #E85D04 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, #E85D04 40px, #E85D04 41px)" }}
        />
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10"
          style={{ background: "radial-gradient(ellipse at top right, #E85D04, transparent 70%)" }}
        />
        <div className="container relative z-10 pt-32">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-4 h-4 text-[#E85D04]" />
            <span className="text-[#E85D04] text-sm font-bold tracking-widest uppercase">Centreville, VA</span>
          </div>
          <div className="max-w-4xl">
            <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">Ceramic Coating</p>
            <h1 className="font-['Bebas_Neue',sans-serif] text-6xl md:text-8xl lg:text-9xl leading-none text-white mb-4">
              CERAMIC COATING<br />
              <span className="text-[#E85D04]">CENTREVILLE</span>
            </h1>
            <p className="text-zinc-300 text-lg md:text-xl max-w-2xl leading-relaxed mb-6">
              Nano-ceramic paint protection that delivers showroom gloss, hydrophobic water beading, and UV defense. Serving Centreville and all of Northern Virginia.
            </p>
            <div className="flex flex-wrap gap-3 mb-6">
              {["5.0 ★ Google Rating", "Free Quotes", "Paint Correction Included", "Lifetime Options"].map((b) => (
                <span key={b} className="flex items-center gap-1.5 text-sm text-zinc-300 border border-zinc-700 px-3 py-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-[#E85D04]" />{b}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-4">
              <Link href="/get-a-quote?service=ceramic"
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
            <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">Why Ceramic Coating</p>
            <h2 className="font-['Bebas_Neue',sans-serif] text-5xl text-white">MORE THAN JUST A SHINE</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-800">
            {[
              { icon: Droplets, title: "Hydrophobic Barrier", desc: "Water, mud, and road grime bead up and roll off instantly — keeping your car cleaner between washes." },
              { icon: Shield, title: "UV & Oxidation Defense", desc: "Ceramic coating blocks UV rays that cause paint oxidation, fading, and chalking over time." },
              { icon: Star, title: "Depth of Gloss", desc: "Nano-ceramic amplifies your paint's depth and clarity to a level that wax and sealants simply can't match." },
              { icon: CheckCircle, title: "Chemical Resistance", desc: "Bird droppings, tree sap, and road chemicals are neutralized before they can etch into your clear coat." },
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
            SERVING CENTREVILLE & ALL OF NOVA
          </h2>
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {nearbyAreas.map((area) => (
              <span key={area} className="border border-zinc-700 text-zinc-400 text-sm px-4 py-2 hover:border-[#E85D04] hover:text-white transition-colors">
                {area}, VA
              </span>
            ))}
          </div>
          <p className="text-zinc-500 text-sm max-w-xl mx-auto">
            Located at 4215 Walney Rd Suite R, Chantilly, VA 20151 — just 10 minutes from Centreville via Route 28.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-[#0D0D0D]">
        <div className="container max-w-3xl">
          <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">FAQ</p>
          <h2 className="font-['Bebas_Neue',sans-serif] text-4xl md:text-5xl text-white mb-10">
            CERAMIC COATING QUESTIONS FROM CENTREVILLE DRIVERS
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

      <Testimonials title="WHAT CENTREVILLE DRIVERS SAY ABOUT OUR CERAMIC COATING" />

      {/* CTA */}
      <section className="py-20 bg-[#E85D04]">
        <div className="container max-w-3xl text-center">
          <h2 className="font-['Bebas_Neue',sans-serif] text-5xl md:text-6xl text-white mb-4">
            READY FOR SHOWROOM GLOSS?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
            Get a free ceramic coating quote from Northern Virginia's top-rated detailer. Just 10 minutes from Centreville.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/get-a-quote?service=ceramic"
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

      <NearbyAreas city="Centreville" service="ceramic" />

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
