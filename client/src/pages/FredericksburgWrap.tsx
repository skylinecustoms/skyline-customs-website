/*
 * SKYLINE CUSTOMS — Local SEO Landing Page
 * Vinyl Wraps in Fredericksburg, VA
 * URL: /vinyl-wraps-fredericksburg-va
 */

import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Testimonials from "@/components/Testimonials";
import SEO from "@/components/SEO";
import { Palette, MapPin, Phone, CheckCircle, ArrowRight, ChevronDown } from "lucide-react";
import { useState } from "react";
import NearbyAreas from "@/components/NearbyAreas";

const faqs = [
  {
    q: "Do you offer vinyl wraps for cars in Fredericksburg, VA?",
    a: "Yes — we serve Fredericksburg and the Rappahannock region from our shop at 4215 Walney Rd Suite R, Chantilly, VA 20151. Fredericksburg is about 45–50 minutes from our Chantilly location via I-95 North.",
  },
  {
    q: "How much does a vinyl wrap cost near Fredericksburg?",
    a: "Full color change wraps start at $3,000 for sedans, $4,000 for SUVs/crossovers, and $4,500 for trucks. Partial combos (roof + hood + mirrors) start at $850. Chrome delete starts at $600 for sedans. All prices subject to in-person inspection. Contact us for a free, no-obligation quote.",
  },
  {
    q: "How long does a vinyl wrap last?",
    a: "A professionally installed vinyl wrap typically lasts 5–7 years with proper care. We use premium 3M and Avery Dennison films that resist UV fading, Virginia heat, and road debris.",
  },
  {
    q: "Can I wrap my vehicle to protect the paint and remove it later?",
    a: "Absolutely. Vinyl wraps are fully removable and actually protect your original paint underneath. Many Fredericksburg area drivers wrap their vehicles to preserve factory paint for resale value.",
  },
  {
    q: "What colors and finishes are available for wraps near Fredericksburg?",
    a: "We offer hundreds of colors and finishes including matte, satin, gloss, chrome, color-shift, brushed metal, and textured films. If you can imagine it, we can likely wrap it.",
  },
  {
    q: "Do you do commercial vehicle wraps near Fredericksburg?",
    a: "Yes — we wrap commercial vehicles, fleet vehicles, and business trucks. A wrapped vehicle is one of the most cost-effective forms of local advertising in the Fredericksburg and Spotsylvania market.",
  },
];

const nearbyAreas = [
  "Fredericksburg", "Spotsylvania", "Stafford", "Culpeper",
  "King George", "Locust Grove", "Massaponax", "Falmouth", "Quantico",
];

export default function FredericksburgWrap() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-['DM_Sans',sans-serif]">
      <SEO
        title="Vinyl Wraps Fredericksburg VA | Car Wraps Near Spotsylvania"
        description="Professional vinyl wraps serving Fredericksburg, VA and the Rappahannock region. Full vehicle wraps, partial wraps, and commercial fleet wraps. Free quotes. 5.0 stars on Google."
        canonical="https://www.skylinecustomshop.com/vinyl-wraps-fredericksburg-va"
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
            "areaServed": ["Fredericksburg, VA", "Stafford, VA", "Northern Virginia"],
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
              { "@type": "ListItem", "position": 3, "name": "Vinyl Wraps", "item": "https://www.skylinecustomshop.com/services/wrap" },
              { "@type": "ListItem", "position": 4, "name": "Fredericksburg, VA", "item": "https://www.skylinecustomshop.com/vinyl-wraps-fredericksburg-va" }
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
            <span className="text-[#E85D04] text-sm font-bold tracking-widest uppercase">Fredericksburg, VA</span>
          </div>
          <div className="max-w-4xl">
            <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">Vinyl Wraps</p>
            <h1 className="font-['Bebas_Neue',sans-serif] text-6xl md:text-8xl lg:text-9xl leading-none text-white mb-4">
              WRAPS NEAR<br />
              <span className="text-[#E85D04]">FREDERICKSBURG</span>
            </h1>
            <p className="text-zinc-300 text-lg md:text-xl max-w-2xl leading-relaxed mb-6">
              Professional vinyl wraps serving Fredericksburg and the Rappahannock region. Transform your vehicle's look, protect your factory paint, and stand out in the historic city and beyond.
            </p>
            <div className="flex flex-wrap gap-3 mb-6">
              {["5.0 ★ Google Rating", "Free Quotes", "3M & Avery Films", "Fully Removable"].map((b) => (
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

      <section className="py-20 bg-[#0D0D0D]">
        <div className="container">
          <div className="mb-12">
            <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">Why Wrap in Fredericksburg</p>
            <h2 className="font-['Bebas_Neue',sans-serif] text-5xl text-white">TRANSFORM YOUR VEHICLE IN THE RAPPAHANNOCK REGION</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-800">
            {[
              { icon: Palette, title: "Unlimited Colors", desc: "Hundreds of colors and finishes — matte, satin, gloss, chrome, color-shift, and more. Change your vehicle's look completely without a permanent paint job." },
              { icon: CheckCircle, title: "Paint Protection", desc: "The wrap film protects your factory paint from UV, rock chips, and minor abrasions — preserving resale value for years of Fredericksburg commuting." },
              { icon: ArrowRight, title: "Fully Removable", desc: "Unlike paint, wraps come off cleanly. Restore your vehicle to factory condition whenever you want — perfect for leased vehicles or future resale." },
              { icon: Palette, title: "Commercial Wraps", desc: "Turn your truck or van into a rolling billboard. Commercial vehicle wraps are one of the most cost-effective advertising tools in the Fredericksburg and Spotsylvania market." },
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
            SERVING FREDERICKSBURG & THE RAPPAHANNOCK REGION
          </h2>
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {nearbyAreas.map((area) => (
              <span key={area} className="border border-zinc-700 text-zinc-400 text-sm px-4 py-2 hover:border-[#E85D04] hover:text-white transition-colors">
                {area}, VA
              </span>
            ))}
          </div>
          <p className="text-zinc-500 text-sm max-w-xl mx-auto">
            Our shop is at 4215 Walney Rd Suite R, Chantilly, VA 20151 — about 45–50 minutes from Fredericksburg via I-95 North. Free parking on site.
          </p>
        </div>
      </section>

      <section className="py-20 bg-[#0D0D0D]">
        <div className="container max-w-3xl">
          <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">FAQ</p>
          <h2 className="font-['Bebas_Neue',sans-serif] text-4xl md:text-5xl text-white mb-10">
            WRAP QUESTIONS FROM FREDERICKSBURG DRIVERS
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

      <Testimonials title="WHAT FREDERICKSBURG DRIVERS SAY ABOUT OUR VINYL WRAPS" />

      <section className="py-20 bg-[#E85D04]">
        <div className="container max-w-3xl text-center">
          <h2 className="font-['Bebas_Neue',sans-serif] text-5xl md:text-6xl text-white mb-4">
            TRANSFORM YOUR VEHICLE TODAY
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
            Get a free vinyl wrap quote from Northern Virginia's top-rated installer. Serving Fredericksburg and the Rappahannock region.
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

      <NearbyAreas city="Fredericksburg" service="wrap" />

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
