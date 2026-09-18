/*
 * SKYLINE CUSTOMS — Local SEO Landing Page
 * Paint Protection Film in Springfield, VA
 * URL: /ppf-springfield-va
 */

import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Testimonials from "@/components/Testimonials";
import SEO from "@/components/SEO";
import { Shield, MapPin, Phone, Star, CheckCircle, ArrowRight, ChevronDown } from "lucide-react";
import { useState } from "react";
import NearbyAreas from "@/components/NearbyAreas";

const faqs = [
  {
    q: "Do you install PPF for cars in Springfield, VA?",
    a: "Yes — we serve Springfield and all of Northern Virginia from our shop at 4215 Walney Rd Suite R, Chantilly, VA 20151. Springfield is about 25 minutes from our Chantilly location via I-66 or the Fairfax County Parkway.",
  },
  {
    q: "How much does PPF cost near Springfield?",
    a: "PPF pricing depends on coverage level. Partial front packages start at $1,800 (bumper + partial hood). Full front coverage — including bumper, hood, fenders, mirrors, headlights, and A-pillars — is $2,400. Full vehicle wraps start at $4,500 for sedans. All prices subject to in-person inspection. Contact us for a free, no-obligation quote.",
  },
  {
    q: "Is PPF worth it for driving near the Springfield Interchange?",
    a: "Absolutely. The Springfield Interchange — one of the busiest in Northern Virginia — sees heavy truck traffic and construction debris year-round. PPF is one of the best investments to protect your paint from rock chips and road damage on I-95, I-395, and I-495.",
  },
  {
    q: "How long does PPF installation take?",
    a: "A partial front-end install typically takes one day. Full-vehicle wraps may take 2–3 days depending on vehicle complexity. We'll give you a firm timeline at your consultation.",
  },
  {
    q: "Do you offer PPF for Tesla, BMW, and luxury vehicles near Springfield?",
    a: "Absolutely. We specialize in high-end and exotic vehicles. Our computer-cut patterns are precision-fit for every make and model, including Tesla, BMW, Mercedes, Porsche, and more.",
  },
  {
    q: "Does PPF self-heal scratches?",
    a: "Yes — our premium STEK DYNOshield film features thermoplastic polyurethane that self-heals light scratches and swirl marks when exposed to heat, keeping your paint looking pristine for years.",
  },
];

const nearbyAreas = [
  "Springfield", "Burke", "Fairfax", "Annandale",
  "Alexandria", "Lorton", "Newington", "Fort Belvoir", "Kingstowne",
];

export default function SpringfieldPPF() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-['DM_Sans',sans-serif]">
      <SEO
        title="PPF Springfield VA | Paint Protection Film Near Me"
        description="Top-rated paint protection film installer serving Springfield, VA. Rock chip protection, self-healing PPF, and full-vehicle coverage. Free quotes. 5.0 stars on Google."
        canonical="https://www.skylinecustomshop.com/ppf-springfield-va"
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
              { "@type": "ListItem", "position": 3, "name": "Paint Protection Film", "item": "https://www.skylinecustomshop.com/services/ppf" },
              { "@type": "ListItem", "position": 4, "name": "Springfield, VA", "item": "https://www.skylinecustomshop.com/ppf-springfield-va" }
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
            <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">Paint Protection Film</p>
            <h1 className="font-['Bebas_Neue',sans-serif] text-6xl md:text-8xl lg:text-9xl leading-none text-white mb-4">
              PPF NEAR<br />
              <span className="text-[#E85D04]">SPRINGFIELD</span>
            </h1>
            <p className="text-zinc-300 text-lg md:text-xl max-w-2xl leading-relaxed mb-6">
              Northern Virginia's top-rated PPF installer, just 25 minutes from Springfield via I-66 or the Fairfax County Parkway. Protect your paint from rock chips and road debris with self-healing film.
            </p>
            <div className="flex flex-wrap gap-3 mb-6">
              {["5.0 ★ Google Rating", "Free Quotes", "Lifetime Warranty", "STEK DYNOshield Film"].map((b) => (
                <span key={b} className="flex items-center gap-1.5 text-sm text-zinc-300 border border-zinc-700 px-3 py-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-[#E85D04]" />{b}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-4">
              <Link href="/get-a-quote?service=ppf"
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

      {/* Why PPF near Springfield */}
      <section className="py-20 bg-[#0D0D0D]">
        <div className="container">
          <div className="mb-12">
            <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">Why PPF in Springfield</p>
            <h2 className="font-['Bebas_Neue',sans-serif] text-5xl text-white">DEFEND YOUR PAINT AT THE SPRINGFIELD INTERCHANGE</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-800">
            {[
              { icon: Shield, title: "I-95 & I-395 Defense", desc: "The Springfield Interchange is one of the busiest in Northern Virginia. Heavy truck traffic and construction debris on I-95, I-395, and I-495 make PPF essential for protecting your paint." },
              { icon: Star, title: "Self-Healing Film", desc: "Light scratches and swirl marks disappear on their own when the film warms up — keeping your car showroom-fresh year-round." },
              { icon: CheckCircle, title: "12-Year Warranty", desc: "Our STEK DYNOshield films come with a manufacturer-backed 12-year warranty against yellowing, cracking, and peeling." },
              { icon: ArrowRight, title: "Invisible Protection", desc: "High-clarity film is virtually undetectable — your car's color and finish look exactly the same, just fully protected." },
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
            PPF QUESTIONS FROM SPRINGFIELD DRIVERS
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

      <Testimonials title="WHAT SPRINGFIELD DRIVERS SAY ABOUT OUR PPF" />

      {/* CTA */}
      <section className="py-20 bg-[#E85D04]">
        <div className="container max-w-3xl text-center">
          <h2 className="font-['Bebas_Neue',sans-serif] text-5xl md:text-6xl text-white mb-4">
            PROTECT YOUR PAINT TODAY
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
            Get a free PPF quote from Northern Virginia's top-rated installer. Just 25 minutes from Springfield.
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

      <NearbyAreas city="Springfield" service="ppf" />

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
