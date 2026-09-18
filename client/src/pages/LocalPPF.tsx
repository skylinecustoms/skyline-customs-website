/**
 * SKYLINE CUSTOMS — Local SEO Landing Page
 * Paint Protection Film in Chantilly, VA
 * URL: /ppf-chantilly-va
 * Target queries: "ppf chantilly va", "paint protection film chantilly", "ppf near me chantilly"
 */

import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Testimonials from "@/components/Testimonials";
import SEO from "@/components/SEO";
import { Shield, MapPin, Phone, Star, CheckCircle, ArrowRight, ChevronDown } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    q: "Where is Skyline Customs located?",
    a: "We're located at 4215 Walney Rd Suite R, Chantilly, VA 20151 — just minutes from Dulles Airport, Centreville, Herndon, Reston, and Ashburn.",
  },
  {
    q: "How much does PPF cost in Chantilly, VA?",
    a: "PPF pricing depends on coverage level. Partial front packages start at $1,800 (bumper + partial hood). Full front coverage — including bumper, hood, fenders, mirrors, headlights, and A-pillars — is $2,400. Full vehicle wraps start at $4,500 for sedans. All prices subject to in-person inspection. Contact us for a free, no-obligation quote.",
  },
  {
    q: "How long does PPF installation take?",
    a: "A partial front-end install typically takes one day. Full-vehicle wraps may take 2–3 days depending on vehicle complexity. We'll give you a firm timeline at your consultation.",
  },
  {
    q: "Does PPF really protect against rock chips?",
    a: "Yes. PPF is specifically engineered to absorb and disperse the impact energy from road debris, gravel, and rocks — preventing chips and scratches from reaching your paint.",
  },
  {
    q: "Do you offer PPF for Tesla, BMW, and luxury vehicles?",
    a: "Absolutely. We specialize in high-end and exotic vehicles. Our computer-cut patterns are precision-fit for every make and model, including Tesla, BMW, Mercedes, Porsche, and more.",
  },
  {
    q: "Is PPF worth it in Northern Virginia?",
    a: "Northern Virginia roads — especially I-66, Route 28, and the Dulles Toll Road — are known for construction debris and gravel. PPF is one of the best investments you can make to preserve your paint and resale value in this area.",
  },
];

const nearbyAreas = [
  "Chantilly", "Centreville", "Herndon", "Reston", "Ashburn",
  "Sterling", "Dulles", "Fairfax", "Vienna", "McLean",
];

export default function LocalPPF() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-['DM_Sans',sans-serif]">
      <SEO
        title="PPF Chantilly VA | Paint Protection Film"
        description="Top-rated paint protection film (PPF) installer in Chantilly, VA. Protect your car from rock chips, scratches & UV damage. Free quotes. Serving Northern Virginia."
        canonical="https://www.skylinecustomshop.com/ppf-chantilly-va"
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
              "name": "Paint Protection Film Services",
              "itemListElement": [
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Partial Front PPF" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Full Front PPF" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Full Vehicle PPF" } }
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
              { "@type": "ListItem", "position": 2, "name": "PPF Chantilly VA", "item": "https://www.skylinecustomshop.com/ppf-chantilly-va" }
            ]
          }
        ]}
      />
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-end pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0A] via-[#111] to-[#1a0a00]" />
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
              PAINT PROTECTION FILM<br />
              <span className="text-[#E85D04]">CHANTILLY, VA</span>
            </h1>
            <p className="text-zinc-300 text-lg md:text-xl max-w-2xl leading-relaxed mb-8">
              Northern Virginia's top-rated PPF installer. We protect your paint from rock chips, road debris, and UV damage — with a Lifetime Craftsmanship Warranty on every install.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/get-a-quote?service=ppf"
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
              { icon: MapPin, text: "Chantilly, VA — Locally Owned" },
              { icon: CheckCircle, text: "STEK Certified" },
            ].map(({ icon: Icon, text }, i) => (
              <div key={i} className="flex items-center gap-2 text-zinc-300">
                <Icon className="w-4 h-4 text-[#E85D04] flex-shrink-0" />
                <span className="text-sm font-medium">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why PPF in Northern Virginia */}
      <section className="py-24 bg-[#0A0A0A]">
        <div className="container max-w-5xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">Why It Matters Here</p>
              <h2 className="font-['Bebas_Neue',sans-serif] text-4xl md:text-5xl text-white mb-6 leading-tight">
                NORTHERN VIRGINIA ROADS<br />ARE HARD ON PAINT
              </h2>
              <p className="text-zinc-400 leading-relaxed mb-4">
                I-66, Route 28, the Dulles Toll Road, and Route 50 are among the highest-traffic corridors in the country — and they're constantly under construction. That means gravel, debris, and road salt year-round.
              </p>
              <p className="text-zinc-400 leading-relaxed mb-4">
                Paint Protection Film is the only product that physically stops rock chips and scratches before they reach your paint. Once a chip happens, you're looking at touch-up paint or a full respray — neither of which restores original value.
              </p>
              <p className="text-zinc-400 leading-relaxed">
                Skyline Customs installs STEK DYNOshield PPF with computer-cut patterns for a seamless, invisible finish. We've protected hundreds of vehicles across Chantilly, Herndon, Reston, Ashburn, and Fairfax.
              </p>
            </div>
            <div className="space-y-4">
              {[
                { title: "Stops Rock Chips Cold", desc: "PPF absorbs and disperses impact energy from road debris before it reaches your paint." },
                { title: "Self-Healing Technology", desc: "Minor swirl marks and light scratches disappear on their own with heat from the sun or warm water." },
                { title: "UV & Chemical Resistance", desc: "Prevents paint oxidation, fading, and damage from bird droppings, tree sap, and road salt." },
                { title: "Invisible Protection", desc: "Computer-cut patterns conform perfectly to your vehicle's body lines — completely undetectable." },
                { title: "Preserves Resale Value", desc: "Factory-condition paint commands significantly higher resale and trade-in values." },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-4 border border-zinc-800 bg-[#0D0D0D] hover:border-[#E85D04] transition-colors group">
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

      {/* Coverage packages */}
      <section className="py-24 bg-[#0D0D0D]">
        <div className="container max-w-5xl">
          <div className="mb-14">
            <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">Coverage Options</p>
            <h2 className="font-['Bebas_Neue',sans-serif] text-4xl md:text-5xl text-white">CHOOSE YOUR PROTECTION LEVEL</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-px bg-zinc-800">
            {[
              {
                name: "Partial Front",
                desc: "Hood, bumper, and mirrors — the highest-impact zones on any vehicle.",
                includes: ["Full bumper", "Hood (partial or full)", "Side mirrors", "Headlights"],
                ideal: "Daily drivers on Northern VA highways",
              },
              {
                name: "Full Front",
                desc: "Complete front-end protection including full hood, fenders, A-pillars, and rocker panels.",
                includes: ["Full hood", "Full fenders", "Full bumper", "A-pillars", "Rocker panels", "Side mirrors"],
                ideal: "Enthusiasts and luxury vehicle owners",
                featured: true,
              },
              {
                name: "Full Vehicle",
                desc: "Every panel protected — the ultimate shield for high-value and exotic vehicles.",
                includes: ["All front panels", "All doors", "Roof", "Rear bumper", "Trunk lid", "Rear fenders"],
                ideal: "Exotics, new vehicles, maximum resale protection",
              },
            ].map((pkg, i) => (
              <div key={i} className={`p-8 flex flex-col ${pkg.featured ? "bg-[#1a0a00] border-t-2 border-[#E85D04]" : "bg-[#0D0D0D]"}`}>
                {pkg.featured && (
                  <span className="text-[#E85D04] text-xs font-bold tracking-widest uppercase mb-3">Most Popular</span>
                )}
                <h3 className="font-['Bebas_Neue',sans-serif] text-3xl text-white mb-3">{pkg.name}</h3>
                <p className="text-zinc-400 text-sm mb-5 leading-relaxed">{pkg.desc}</p>
                <ul className="space-y-2 mb-6 flex-1">
                  {pkg.includes.map((item, j) => (
                    <li key={j} className="flex items-center gap-2 text-zinc-300 text-sm">
                      <CheckCircle className="w-3.5 h-3.5 text-[#E85D04] flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="text-zinc-600 text-xs mb-4">Ideal for: {pkg.ideal}</p>
                <Link href="/get-a-quote?service=ppf"
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
            <h2 className="font-['Bebas_Neue',sans-serif] text-4xl md:text-5xl text-white">PPF FAQ — CHANTILLY, VA</h2>
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
            Our shop is located in Chantilly, VA — easily accessible from Route 28, Route 50, and the Dulles Toll Road. Free parking on site.
          </p>
        </div>
      </section>

      <Testimonials service="PPF" title="WHAT CHANTILLY DRIVERS SAY ABOUT OUR PPF" />

      {/* CTA */}
      <section className="py-20 bg-[#E85D04]">
        <div className="container max-w-3xl text-center">
          <h2 className="font-['Bebas_Neue',sans-serif] text-5xl md:text-6xl text-white mb-4">
            READY TO PROTECT YOUR PAINT?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
            Get a free, no-obligation quote from Chantilly's top-rated PPF installer. We'll recommend the right coverage for your vehicle and driving habits.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/get-a-quote?service=ppf"
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
