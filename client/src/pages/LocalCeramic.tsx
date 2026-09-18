/**
 * SKYLINE CUSTOMS — Local SEO Landing Page
 * Ceramic Coating in Chantilly, VA
 * URL: /ceramic-coating-chantilly-va
 * Target queries: "ceramic coating chantilly va", "ceramic coating near me chantilly", "car ceramic coating northern virginia"
 */

import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Testimonials from "@/components/Testimonials";
import SEO from "@/components/SEO";
import { Shield, MapPin, Phone, Star, CheckCircle, ArrowRight, ChevronDown, Droplets } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    q: "How much does ceramic coating cost in Chantilly, VA?",
    a: "Ceramic coating pricing depends on vehicle size, paint condition, and the tier of coating selected. Entry-level packages for a sedan start around $700–$900. Our flagship 7-year coating is priced higher. Contact us for a free, vehicle-specific quote.",
  },
  {
    q: "Does my car need paint correction before ceramic coating?",
    a: "In most cases, yes. Ceramic coating locks in whatever condition the paint is in — so swirl marks, light scratches, and water spots need to be corrected first. We include a paint inspection with every quote.",
  },
  {
    q: "How long does ceramic coating last?",
    a: "Our coatings range from 3-year to 7-year formulations. With proper maintenance (hand washing, no automatic brush washes), coatings regularly outlast their rated lifespan.",
  },
  {
    q: "Can ceramic coating be applied to a new car?",
    a: "Yes — and new cars are the ideal candidate. Even brand-new vehicles have transport scratches and dealer swirls that benefit from light correction before coating. Applying ceramic coating early maximizes protection from day one.",
  },
  {
    q: "Is ceramic coating worth it in Northern Virginia?",
    a: "Absolutely. Northern Virginia's climate — humid summers, road salt in winter, pollen in spring — is particularly harsh on paint. Ceramic coating's hydrophobic properties repel contaminants and make maintenance significantly easier year-round.",
  },
  {
    q: "What's the difference between ceramic coating and wax?",
    a: "Wax lasts weeks to months and sits on top of the paint. Ceramic coating chemically bonds to the paint surface and lasts years, providing far superior hardness, UV resistance, and hydrophobic performance.",
  },
];

const nearbyAreas = [
  "Chantilly", "Centreville", "Herndon", "Reston", "Ashburn",
  "Sterling", "Dulles", "Fairfax", "Vienna", "McLean",
];

export default function LocalCeramic() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-['DM_Sans',sans-serif]">
      <SEO
        title="Ceramic Coating Chantilly VA | Car Detailing"
        description="Professional ceramic coating in Chantilly, VA. 3–7 year coatings with paint correction included. Hydrophobic, UV-resistant, and glossy. Free quotes for Northern Virginia."
        canonical="https://www.skylinecustomshop.com/ceramic-coating-chantilly-va"
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
              "name": "Ceramic Coating Services",
              "itemListElement": [
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "3-Year Ceramic Coating" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "5-Year Ceramic Coating" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "7-Year Ceramic Coating" } }
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
              { "@type": "ListItem", "position": 2, "name": "Ceramic Coating Chantilly VA", "item": "https://www.skylinecustomshop.com/ceramic-coating-chantilly-va" }
            ]
          }
        ]}
      />
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-end pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0A] via-[#0d0d14] to-[#0a0a1a]" />
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
              CERAMIC COATING<br />
              <span className="text-[#E85D04]">CHANTILLY, VA</span>
            </h1>
            <p className="text-zinc-300 text-lg md:text-xl max-w-2xl leading-relaxed mb-8">
              Professional ceramic coating that bonds to your paint at the molecular level — delivering years of hydrophobic protection, deep gloss, and effortless maintenance.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/get-a-quote?service=ceramic"
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
              { icon: Shield, text: "Lifetime Craftsmanship Warranty" },
              { icon: Droplets, text: "9H Hardness Ceramic Formulas" },
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

      {/* Why ceramic in NoVA */}
      <section className="py-24 bg-[#0A0A0A]">
        <div className="container max-w-5xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">Why Ceramic Coating</p>
              <h2 className="font-['Bebas_Neue',sans-serif] text-4xl md:text-5xl text-white mb-6 leading-tight">
                YOUR PAINT DESERVES<br />MORE THAN WAX
              </h2>
              <p className="text-zinc-400 leading-relaxed mb-4">
                Wax washes off in weeks. Ceramic coating chemically bonds to your clear coat and lasts years — providing a level of protection that no spray wax or sealant can match.
              </p>
              <p className="text-zinc-400 leading-relaxed mb-4">
                Northern Virginia's climate is particularly demanding: summer humidity accelerates oxidation, spring pollen is acidic, and winter road salt is corrosive. Ceramic coating's chemical resistance handles all of it.
              </p>
              <p className="text-zinc-400 leading-relaxed">
                Every ceramic coating install at Skyline Customs begins with a thorough paint inspection and decontamination. If correction is needed, we'll recommend the right polish before coating — so you're locking in flawless paint, not imperfections.
              </p>
            </div>
            <div className="space-y-4">
              {[
                { title: "Molecular Bond to Clear Coat", desc: "Unlike wax, ceramic coating forms a semi-permanent bond — it won't wash off or break down in UV." },
                { title: "9H Hardness Rating", desc: "Our top-tier coatings achieve 9H on the pencil hardness scale — harder than your clear coat itself." },
                { title: "Hydrophobic Water Beading", desc: "Water sheets off instantly, taking road grime, pollen, and contaminants with it." },
                { title: "UV & Oxidation Protection", desc: "Blocks UV rays that cause paint fading and oxidation over time." },
                { title: "3 to 7 Year Coverage", desc: "Choose the protection tier that matches your vehicle value and how long you plan to keep it." },
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

      {/* Coating tiers */}
      <section className="py-24 bg-[#0D0D0D]">
        <div className="container max-w-5xl">
          <div className="mb-14">
            <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">Coating Tiers</p>
            <h2 className="font-['Bebas_Neue',sans-serif] text-4xl md:text-5xl text-white">PROTECTION THAT FITS YOUR NEEDS</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-px bg-zinc-800">
            {[
              {
                tier: "3-Year",
                label: "Essential",
                desc: "Entry-level ceramic protection for daily drivers who want better-than-wax results without the premium investment.",
                features: ["9H hardness", "Hydrophobic coating", "UV protection", "Paint decontamination included"],
                ideal: "Daily commuters, leased vehicles",
              },
              {
                tier: "5-Year",
                label: "Professional",
                desc: "Our most popular tier — professional-grade formulation with enhanced gloss depth and chemical resistance.",
                features: ["9H+ hardness", "Enhanced hydrophobic layer", "UV & chemical resistance", "Paint correction available", "Annual maintenance check"],
                ideal: "Enthusiasts, luxury vehicles",
                featured: true,
              },
              {
                tier: "7-Year",
                label: "Flagship",
                desc: "The ultimate ceramic protection. Maximum hardness, deepest gloss, and the longest-lasting formula we offer.",
                features: ["9H++ hardness", "Multi-layer application", "Maximum gloss depth", "Full paint correction included", "Priority scheduling"],
                ideal: "Exotics, high-value vehicles, collectors",
              },
            ].map((pkg, i) => (
              <div key={i} className={`p-8 flex flex-col ${pkg.featured ? "bg-[#0a0a1a] border-t-2 border-[#E85D04]" : "bg-[#0D0D0D]"}`}>
                {pkg.featured && (
                  <span className="text-[#E85D04] text-xs font-bold tracking-widest uppercase mb-3">Most Popular</span>
                )}
                <div className="mb-4">
                  <span className="font-['Bebas_Neue',sans-serif] text-4xl text-[#E85D04]">{pkg.tier}</span>
                  <span className="text-zinc-500 text-sm ml-2">{pkg.label}</span>
                </div>
                <p className="text-zinc-400 text-sm mb-5 leading-relaxed">{pkg.desc}</p>
                <ul className="space-y-2 mb-6 flex-1">
                  {pkg.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-zinc-300 text-sm">
                      <CheckCircle className="w-3.5 h-3.5 text-[#E85D04] flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <p className="text-zinc-600 text-xs mb-4">Ideal for: {pkg.ideal}</p>
                <Link href="/get-a-quote?service=ceramic"
                  className={`text-center font-bold tracking-widest uppercase py-3 text-sm transition-colors ${pkg.featured ? "bg-[#E85D04] hover:bg-[#d14e00] text-white" : "border border-zinc-700 hover:border-[#E85D04] text-zinc-300 hover:text-white"}`}
                >
                  Get a Quote
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-[#0A0A0A]">
        <div className="container max-w-3xl">
          <div className="mb-14">
            <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">Common Questions</p>
            <h2 className="font-['Bebas_Neue',sans-serif] text-4xl md:text-5xl text-white">CERAMIC COATING FAQ — CHANTILLY, VA</h2>
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

      <Testimonials service="Ceramic Coating" title="WHAT NOVA DRIVERS SAY ABOUT OUR CERAMIC COATING" />

      {/* CTA */}
      <section className="py-20 bg-[#E85D04]">
        <div className="container max-w-3xl text-center">
          <h2 className="font-['Bebas_Neue',sans-serif] text-5xl md:text-6xl text-white mb-4">
            READY FOR SHOWROOM GLOSS?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
            Get a free ceramic coating quote from Chantilly's top-rated detailer. We'll inspect your paint and recommend the right tier for your vehicle and budget.
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

      <Footer />
    </div>
  );
}
