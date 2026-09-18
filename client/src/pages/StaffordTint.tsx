/*
 * SKYLINE CUSTOMS — Local SEO Landing Page
 * Window Tinting in Stafford, VA
 * URL: /window-tinting-stafford-va
 */

import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Testimonials from "@/components/Testimonials";
import SEO from "@/components/SEO";
import { Sun, MapPin, Phone, CheckCircle, ArrowRight, ChevronDown } from "lucide-react";
import { useState } from "react";
import NearbyAreas from "@/components/NearbyAreas";

const faqs = [
  {
    q: "Do you offer window tinting for cars in Stafford, VA?",
    a: "Yes — we serve Stafford and the Quantico corridor from our shop at 4215 Walney Rd Suite R, Chantilly, VA 20151. Stafford is about 35–40 minutes from our Chantilly location via I-95 North.",
  },
  {
    q: "What are Virginia's window tint laws for Stafford drivers?",
    a: "Virginia law requires front side windows to allow at least 50% light transmission (VLT). Rear side and rear windows can be any darkness. We ensure every tint job is fully compliant with Virginia state law.",
  },
  {
    q: "How much does window tinting cost near Stafford?",
    a: "GeoShield Pro Nano Ceramic tint packages start at $280 (4 side windows), $350 (front 2 windows), $425 (rear package — most popular), or $575 for full car (all windows including windshield). Windshield-only is $200. All packages include a Nationwide Lifetime Warranty. Contact us for a free, no-obligation quote.",
  },
  {
    q: "Is ceramic window tint worth it for the Stafford heat?",
    a: "Absolutely. Ceramic tint blocks up to 99% of UV rays and significantly reduces heat buildup — critical for Virginia summers. It also doesn't interfere with GPS, cell signals, or toll transponders like metallic films can.",
  },
  {
    q: "How long does window tinting take?",
    a: "Most vehicles are completed in 2–4 hours. We recommend waiting 3–5 days before rolling down windows to allow the film to fully cure.",
  },
  {
    q: "Do you offer tinting for military vehicles or government vehicles near Quantico?",
    a: "We tint all personal vehicles. For government or fleet vehicles, contact us directly to discuss your specific requirements and compliance needs.",
  },
];

const nearbyAreas = [
  "Stafford", "Quantico", "Aquia Harbour", "Garrisonville",
  "Brooke", "Fredericksburg", "Woodbridge", "Dumfries", "Triangle",
];

export default function StaffordTint() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-['DM_Sans',sans-serif]">
      <SEO
        title="Window Tinting Stafford VA | Near Quantico Military Base"
        description="Professional window tinting serving Stafford, VA and the Quantico corridor. Heat rejection, UV protection, Virginia-legal tint. Free quotes. 5.0 stars on Google."
        canonical="https://www.skylinecustomshop.com/window-tinting-stafford-va"
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
            "areaServed": ["Stafford, VA", "Quantico, VA", "Northern Virginia"],
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
              { "@type": "ListItem", "position": 3, "name": "Window Tinting", "item": "https://www.skylinecustomshop.com/services/tint" },
              { "@type": "ListItem", "position": 4, "name": "Stafford, VA", "item": "https://www.skylinecustomshop.com/window-tinting-stafford-va" }
            ]
          }
        ]}
      />
      <Navbar />

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
            <span className="text-[#E85D04] text-sm font-bold tracking-widest uppercase">Stafford, VA</span>
          </div>
          <div className="max-w-4xl">
            <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">Window Tinting</p>
            <h1 className="font-['Bebas_Neue',sans-serif] text-6xl md:text-8xl lg:text-9xl leading-none text-white mb-4">
              TINT NEAR<br />
              <span className="text-[#E85D04]">STAFFORD</span>
            </h1>
            <p className="text-zinc-300 text-lg md:text-xl max-w-2xl leading-relaxed mb-6">
              Professional window tinting serving Stafford and the Quantico military corridor. Block Virginia's intense summer heat, protect your interior, and stay fully compliant with Virginia tint laws.
            </p>
            <div className="flex flex-wrap gap-3 mb-6">
              {["5.0 ★ Google Rating", "Free Quotes", "Virginia-Legal Tint", "Ceramic & Carbon Films"].map((b) => (
                <span key={b} className="flex items-center gap-1.5 text-sm text-zinc-300 border border-zinc-700 px-3 py-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-[#E85D04]" />{b}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-4">
              <Link href="/get-a-quote?service=tint"
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

      <section className="py-20 bg-[#0D0D0D]">
        <div className="container">
          <div className="mb-12">
            <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">Why Tint in Stafford</p>
            <h2 className="font-['Bebas_Neue',sans-serif] text-5xl text-white">BEAT VIRGINIA HEAT ON THE I-95 COMMUTE</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-800">
            {[
              { icon: Sun, title: "Heat Rejection", desc: "Ceramic tint blocks up to 60% of solar heat — making a huge difference on the I-95 commute through Stafford on hot Virginia summer days." },
              { icon: CheckCircle, title: "99% UV Blocking", desc: "Protect your skin and your interior from UV damage. Our films block 99% of harmful UV rays regardless of tint shade." },
              { icon: ArrowRight, title: "Virginia-Legal Tint", desc: "We know Virginia's 50% VLT front window requirement inside and out. Every tint job we do is fully compliant — no worries at traffic stops." },
              { icon: Sun, title: "Privacy & Security", desc: "Darker rear window tint adds privacy and makes valuables less visible to opportunistic theft — important for military families with gear in their vehicles." },
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

      <section className="py-20 bg-[#0A0A0A]">
        <div className="container text-center">
          <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">Service Area</p>
          <h2 className="font-['Bebas_Neue',sans-serif] text-4xl md:text-5xl text-white mb-8">
            SERVING STAFFORD & THE I-95 CORRIDOR
          </h2>
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {nearbyAreas.map((area) => (
              <span key={area} className="border border-zinc-700 text-zinc-400 text-sm px-4 py-2 hover:border-[#E85D04] hover:text-white transition-colors">
                {area}, VA
              </span>
            ))}
          </div>
          <p className="text-zinc-500 text-sm max-w-xl mx-auto">
            Our shop is at 4215 Walney Rd Suite R, Chantilly, VA 20151 — about 35–40 minutes from Stafford via I-95 North. Free parking on site.
          </p>
        </div>
      </section>

      <section className="py-20 bg-[#0D0D0D]">
        <div className="container max-w-3xl">
          <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">FAQ</p>
          <h2 className="font-['Bebas_Neue',sans-serif] text-4xl md:text-5xl text-white mb-10">
            TINT QUESTIONS FROM STAFFORD DRIVERS
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

      <Testimonials title="WHAT STAFFORD DRIVERS SAY ABOUT OUR WINDOW TINTING" />

      <section className="py-20 bg-[#E85D04]">
        <div className="container max-w-3xl text-center">
          <h2 className="font-['Bebas_Neue',sans-serif] text-5xl md:text-6xl text-white mb-4">
            BEAT THE HEAT TODAY
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
            Get a free window tinting quote from Northern Virginia's top-rated installer. Serving Stafford and the Quantico corridor.
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

      <NearbyAreas city="Stafford" service="tint" />

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
