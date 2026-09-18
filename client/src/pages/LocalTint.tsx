/**
 * SKYLINE CUSTOMS — Local SEO Landing Page
 * Window Tinting in Chantilly, VA
 * URL: /window-tinting-chantilly-va
 * Target queries: "window tinting chantilly va", "car window tint near me chantilly", "window tint northern virginia"
 */

import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Testimonials from "@/components/Testimonials";
import SEO from "@/components/SEO";
import { Shield, MapPin, Phone, Star, CheckCircle, ArrowRight, ChevronDown, Sun, Thermometer } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    q: "What are Virginia's window tint laws?",
    a: "Virginia law requires front side windows to allow at least 50% light transmission (VLT). Rear side and rear windows can be any darkness if the vehicle has dual side mirrors. Windshield tinting is limited to a non-reflective strip above the AS-1 line. We ensure every install is fully compliant.",
  },
  {
    q: "How much does window tinting cost in Chantilly, VA?",
    a: "GeoShield Pro Nano Ceramic tint packages start at $280 (4 side windows), $350 (front 2 windows), $425 (rear package — most popular), or $575 for full car (all windows including windshield). Windshield-only is $200. All packages include a Nationwide Lifetime Warranty. Contact us for a free, vehicle-specific quote.",
  },
  {
    q: "What's the difference between ceramic and regular window tint?",
    a: "Ceramic tint rejects significantly more heat and infrared radiation than standard dyed or carbon films — without using metallic particles that interfere with GPS, cell signals, or toll transponders. It's the premium choice for comfort and clarity.",
  },
  {
    q: "How long does window tinting take?",
    a: "Most vehicles are completed in 2–4 hours. We recommend leaving windows up for 3 days after installation to allow the film to fully cure and adhere.",
  },
  {
    q: "Will tint affect my visibility at night?",
    a: "Darker tints reduce nighttime visibility. We'll guide you toward the right VLT percentage that balances privacy, heat rejection, and safe nighttime driving for your specific vehicle and driving habits.",
  },
  {
    q: "Do you tint the windshield?",
    a: "Yes — we offer legal windshield tint strips and ceramic windshield film that rejects heat and UV without darkening your forward view beyond Virginia's legal limits.",
  },
];

const nearbyAreas = [
  "Chantilly", "Centreville", "Herndon", "Reston", "Ashburn",
  "Sterling", "Dulles", "Fairfax", "Vienna", "McLean",
];

const tintTypes = [
  {
    name: "Dyed Film",
    heat: "★★☆☆☆",
    clarity: "★★★☆☆",
    price: "$",
    desc: "Entry-level film that reduces glare and adds privacy. Limited heat rejection. Best for budget-conscious installs.",
  },
  {
    name: "Carbon Film",
    heat: "★★★☆☆",
    clarity: "★★★★☆",
    price: "$$",
    desc: "Carbon particles provide better heat rejection than dyed film without metallic interference. Good mid-range option.",
  },
  {
    name: "Ceramic Film",
    heat: "★★★★★",
    clarity: "★★★★★",
    price: "$$$",
    desc: "Top-tier nano-ceramic technology. Maximum heat and IR rejection, crystal-clear visibility, no signal interference. Our most popular upgrade.",
    featured: true,
  },
];

export default function LocalTint() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-['DM_Sans',sans-serif]">
      <SEO
        title="Window Tinting Chantilly VA | Car Tint Shop"
        description="Professional window tinting in Chantilly, VA. Dyed, carbon & ceramic films. Virginia-legal installs. Heat rejection, UV protection & privacy. Free quotes."
        canonical="https://www.skylinecustomshop.com/window-tinting-chantilly-va"
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
              "name": "Window Tinting Services",
              "itemListElement": [
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Dyed Window Tint" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Carbon Window Tint" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Ceramic Window Tint" } }
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
              { "@type": "ListItem", "position": 2, "name": "Window Tinting Chantilly VA", "item": "https://www.skylinecustomshop.com/window-tinting-chantilly-va" }
            ]
          }
        ]}
      />
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-end pb-16 overflow-hidden">
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
            <span className="text-[#E85D04] text-sm font-bold tracking-widest uppercase">Chantilly, Virginia</span>
          </div>
          <div className="max-w-4xl">
            <h1 className="font-['Bebas_Neue',sans-serif] text-5xl md:text-7xl lg:text-8xl leading-none text-white mb-6">
              WINDOW TINTING<br />
              <span className="text-[#E85D04]">CHANTILLY, VA</span>
            </h1>
            <p className="text-zinc-300 text-lg md:text-xl max-w-2xl leading-relaxed mb-8">
              Virginia-legal window tint installed by certified professionals. Ceramic, carbon, and dyed films available — with heat rejection up to 99% IR blocking for Northern Virginia summers.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/get-a-quote?service=tint"
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
              { icon: Shield, text: "Virginia-Legal Installs Guaranteed" },
              { icon: Thermometer, text: "Up to 99% IR Heat Rejection" },
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

      {/* Benefits */}
      <section className="py-24 bg-[#0A0A0A]">
        <div className="container max-w-5xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">Why Tint Your Windows</p>
              <h2 className="font-['Bebas_Neue',sans-serif] text-4xl md:text-5xl text-white mb-6 leading-tight">
                COOLER CABIN.<br />BETTER PRIVACY.<br />PROTECTED INTERIOR.
              </h2>
              <p className="text-zinc-400 leading-relaxed mb-4">
                Northern Virginia summers are brutal — with temperatures regularly exceeding 95°F. Without window tint, your dashboard, leather seats, and interior plastics are exposed to direct UV radiation that causes cracking, fading, and heat buildup.
              </p>
              <p className="text-zinc-400 leading-relaxed mb-4">
                Ceramic window tint blocks up to 99% of infrared radiation, keeping your cabin dramatically cooler without darkening your windows beyond legal limits.
              </p>
              <p className="text-zinc-400 leading-relaxed">
                Every install at Skyline Customs is performed by certified technicians using professional-grade films. We guarantee Virginia-legal VLT percentages and bubble-free results.
              </p>
            </div>
            <div className="space-y-4">
              {[
                { icon: Thermometer, title: "Heat Rejection", desc: "Ceramic films block up to 99% of infrared radiation — keeping your cabin up to 30°F cooler on hot days." },
                { icon: Sun, title: "UV Protection", desc: "Blocks 99% of UV rays that cause interior fading, cracking, and skin damage during long commutes." },
                { icon: Shield, title: "Privacy & Security", desc: "Reduces visibility into your vehicle, deterring theft and providing a more private driving experience." },
                { icon: Star, title: "Glare Reduction", desc: "Reduces eye strain from sun glare and headlights — making driving safer and more comfortable." },
                { icon: CheckCircle, title: "Interior Preservation", desc: "Protects leather, vinyl, and dashboard materials from UV degradation and heat damage." },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-4 border border-zinc-800 bg-[#0D0D0D] hover:border-[#E85D04] transition-colors">
                  <item.icon className="w-5 h-5 text-[#E85D04] flex-shrink-0 mt-0.5" />
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

      {/* Film comparison */}
      <section className="py-24 bg-[#0D0D0D]">
        <div className="container max-w-5xl">
          <div className="mb-14">
            <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">Film Options</p>
            <h2 className="font-['Bebas_Neue',sans-serif] text-4xl md:text-5xl text-white">CHOOSE YOUR FILM</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-px bg-zinc-800">
            {tintTypes.map((film, i) => (
              <div key={i} className={`p-8 flex flex-col ${film.featured ? "bg-[#0a0d0a] border-t-2 border-[#E85D04]" : "bg-[#0D0D0D]"}`}>
                {film.featured && (
                  <span className="text-[#E85D04] text-xs font-bold tracking-widest uppercase mb-3">Recommended</span>
                )}
                <h3 className="font-['Bebas_Neue',sans-serif] text-3xl text-white mb-2">{film.name}</h3>
                <div className="flex gap-4 mb-4 text-xs text-zinc-500">
                  <span>Heat: {film.heat}</span>
                  <span>Clarity: {film.clarity}</span>
                  <span>Price: {film.price}</span>
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed flex-1 mb-6">{film.desc}</p>
                <Link href="/get-a-quote?service=tint"
                  className={`text-center font-bold tracking-widest uppercase py-3 text-sm transition-colors ${film.featured ? "bg-[#E85D04] hover:bg-[#d14e00] text-white" : "border border-zinc-700 hover:border-[#E85D04] text-zinc-300 hover:text-white"}`}
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
            <h2 className="font-['Bebas_Neue',sans-serif] text-4xl md:text-5xl text-white">WINDOW TINT FAQ — CHANTILLY, VA</h2>
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

      <Testimonials service="Window Tinting" title="WHAT CHANTILLY DRIVERS SAY ABOUT OUR TINT" />

      {/* CTA */}
      <section className="py-20 bg-[#E85D04]">
        <div className="container max-w-3xl text-center">
          <h2 className="font-['Bebas_Neue',sans-serif] text-5xl md:text-6xl text-white mb-4">
            BEAT THE NOVA HEAT
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
            Get a free window tint quote from Chantilly's top-rated installer. Virginia-legal installs, professional films, and same-day availability.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/get-a-quote?service=tint"
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
