/*
 * SKYLINE CUSTOMS — Local SEO Landing Page
 * Ceramic Coating in Chantilly, VA
 * URL: /ceramic-coating-chantilly-va
 */
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Testimonials from "@/components/Testimonials";
import SEO from "@/components/SEO";
import NearbyAreas from "@/components/NearbyAreas";
import { Shield, MapPin, Phone, Star, CheckCircle, ArrowRight, ChevronDown } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    q: "Where can I get ceramic coating in Chantilly, VA?",
    a: "Skyline Custom Shop is located at 4215 Walney Rd Suite R, Chantilly, VA 20151 — just off Route 28 near Dulles Airport. We offer professional ceramic coating for all vehicle types.",
  },
  {
    q: "How much does ceramic coating cost in Chantilly?",
    a: "Ceramic coating starts at $800 for sedans (no correction, Gtechniq CSL + Exo, 7-year warranty). The Crystal Package (Stage 2 correction + 5-year coating) starts at $1,300. The Ultimate Coating (Stage 3 correction + 7-year coating) starts at $1,500. SUV and truck pricing is slightly higher. Contact us for a free quote specific to your vehicle.",
  },
  {
    q: "How long does ceramic coating last?",
    a: "Professional-grade ceramic coatings typically last 2–5 years depending on the product tier and maintenance. Our top-tier graphene coatings can last 5+ years with proper care.",
  },
  {
    q: "Is ceramic coating worth it for Chantilly drivers?",
    a: "Yes — Chantilly's proximity to I-66, Route 28, and the Dulles Toll Road means your vehicle is constantly exposed to UV rays, road grime, and industrial fallout. Ceramic coating creates a hydrophobic barrier that repels contaminants and makes washing dramatically easier.",
  },
  {
    q: "How long does ceramic coating installation take?",
    a: "A standard single-stage ceramic coating takes 1–2 days including paint decontamination and curing time. Multi-stage packages may take 2–3 days. We'll give you a firm timeline at your consultation.",
  },
  {
    q: "Do I need paint correction before ceramic coating?",
    a: "We recommend paint correction before ceramic coating to remove swirl marks and scratches — ceramic locks in the paint's current condition, so it's best applied to a flawless surface. We offer paint correction as part of our coating packages.",
  },
];

export default function ChantillyCeramic() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-['DM_Sans',sans-serif]">
      <SEO
        title="Ceramic Coating Chantilly VA | Skyline Custom Shop — Near Dulles Airport"
        description="Professional ceramic coating in Chantilly, VA at Skyline Custom Shop — 4215 Walney Rd Suite R. Protect your vehicle from UV, road grime, and Northern Virginia weather with a hydrophobic ceramic barrier. Free quote."
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
            "areaServed": { "@type": "City", "name": "Chantilly, VA" },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Ceramic Coating Services in Chantilly VA",
              "itemListElement": [
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Single-Stage Ceramic Coating — Chantilly VA" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Multi-Layer Ceramic Coating — Chantilly VA" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Graphene Ceramic Coating — Chantilly VA" } },
              ]
            },
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
              { "@type": "ListItem", "position": 2, "name": "Service Areas", "item": "https://www.skylinecustomshop.com/service-areas" },
              { "@type": "ListItem", "position": 3, "name": "Ceramic Coating Chantilly VA", "item": "https://www.skylinecustomshop.com/ceramic-coating-chantilly-va" }
            ]
          }
        ]}
      />
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-end pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0A] via-[#111] to-[#0a0a0d]" />
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 40px, #E85D04 40px, #E85D04 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, #E85D04 40px, #E85D04 41px)" }}
        />
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10"
          style={{ background: "radial-gradient(ellipse at top right, #E85D04, transparent 70%)" }}
        />
        <div className="container relative z-10 pt-32">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-4 h-4 text-[#E85D04]" />
            <span className="text-[#E85D04] text-sm font-bold tracking-widest uppercase">Chantilly, Virginia — Our Home Shop</span>
          </div>
          <div className="max-w-4xl">
            <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">Ceramic Coating</p>
            <h1 className="font-['Bebas_Neue',sans-serif] text-6xl md:text-8xl lg:text-9xl leading-none text-white mb-4">
              CERAMIC IN<br />
              <span className="text-[#E85D04]">CHANTILLY</span>
            </h1>
            <p className="text-zinc-300 text-lg md:text-xl max-w-2xl leading-relaxed mb-2">
              Professional ceramic coating at our Chantilly shop — 4215 Walney Rd Suite R, off Route 28 near Dulles Airport. A permanent hydrophobic barrier that repels water, UV rays, and road grime from Northern Virginia's busiest highways.
            </p>
            <div className="flex items-center gap-2 mb-6">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-[#E85D04] text-[#E85D04]" />)}
              <span className="text-zinc-400 text-sm ml-1">5.0 · 78 Google reviews</span>
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

      {/* Why ceramic in Chantilly */}
      <section className="py-20 bg-[#0D0D0D]">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">Why Chantilly Vehicles Need Ceramic</p>
              <h2 className="font-['Bebas_Neue',sans-serif] text-4xl md:text-5xl text-white mb-6">
                DULLES CORRIDOR<br />UV & ROAD GRIME
              </h2>
              <p className="text-zinc-400 leading-relaxed mb-4">
                Chantilly vehicles face a unique combination of hazards: intense Virginia summer UV that fades paint, industrial fallout from Dulles Airport flight paths, and constant road grime from Route 28 and the Dulles Toll Road. Ceramic coating addresses all of these with a single application.
              </p>
              <p className="text-zinc-400 leading-relaxed mb-6">
                Our professional-grade ceramic coatings bond permanently to your clear coat, creating a 9H-hardness hydrophobic surface that repels water, contaminants, and UV rays — keeping your vehicle cleaner, longer.
              </p>
              <div className="space-y-3">
                {[
                  "9H hardness — harder than factory clear coat",
                  "Hydrophobic — water beads and rolls off instantly",
                  "UV protection — prevents paint oxidation and fading",
                  "Chemical resistance — repels bird droppings and tree sap",
                  "2–5+ year durability depending on package tier",
                ].map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-[#E85D04] mt-0.5 shrink-0" />
                    <span className="text-zinc-300 text-sm">{point}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-px bg-zinc-800">
              {[
                { value: "9H", label: "Hardness Rating" },
                { value: "5.0★", label: "Google Rating" },
                { value: "5yr+", label: "Top Tier Durability" },
                { value: "1–2d", label: "Install Time" },
              ].map((stat) => (
                <div key={stat.label} className="bg-[#0D0D0D] p-8 text-center">
                  <div className="font-['Bebas_Neue',sans-serif] text-4xl text-[#E85D04] mb-1">{stat.value}</div>
                  <div className="text-zinc-500 text-xs uppercase tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-20 bg-[#0A0A0A] border-t border-zinc-800">
        <div className="container">
          <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">Ceramic Packages</p>
          <h2 className="font-['Bebas_Neue',sans-serif] text-4xl md:text-5xl text-white mb-10">COATING TIERS</h2>
          <div className="grid md:grid-cols-3 gap-px bg-zinc-800">
            {[
              {
                name: "Entry Ceramic",
                desc: "Single-stage SiO2 coating for daily drivers. Excellent hydrophobic performance and UV protection for Chantilly commuters.",
                features: ["1-layer SiO2 coating", "2-year durability", "Hydrophobic finish", "UV protection"],
              },
              {
                name: "Pro Ceramic",
                desc: "Multi-layer professional coating with enhanced gloss and durability. Our most popular package for Northern Virginia drivers.",
                features: ["2-layer coating", "3–4 year durability", "Enhanced gloss depth", "Paint decontamination included", "Chemical resistance"],
                featured: true,
              },
              {
                name: "Graphene Elite",
                desc: "Top-tier graphene-infused coating for maximum protection, heat resistance, and water behavior. Best for luxury and exotic vehicles.",
                features: ["Graphene-infused formula", "5+ year durability", "Superior heat dissipation", "Anti-static properties", "Full paint correction included"],
              },
            ].map((pkg) => (
              <div key={pkg.name} className={`p-8 ${pkg.featured ? "bg-[#E85D04]" : "bg-[#0D0D0D]"}`}>
                {pkg.featured && <div className="text-white/70 text-xs font-bold tracking-widest uppercase mb-2">Most Popular</div>}
                <div className="font-['Bebas_Neue',sans-serif] text-3xl text-white mb-3">{pkg.name}</div>
                <p className={`text-sm leading-relaxed mb-5 ${pkg.featured ? "text-white/80" : "text-zinc-400"}`}>{pkg.desc}</p>
                <ul className="space-y-2 mb-6">
                  {pkg.features.map((f) => (
                    <li key={f} className={`flex items-center gap-2 text-sm ${pkg.featured ? "text-white" : "text-zinc-300"}`}>
                      <CheckCircle className={`w-3.5 h-3.5 shrink-0 ${pkg.featured ? "text-white" : "text-[#E85D04]"}`} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/get-a-quote?service=ceramic"
                  className={`inline-flex items-center gap-2 font-bold tracking-widest uppercase text-sm px-6 py-3 transition-all ${
                    pkg.featured
                      ? "bg-white text-[#E85D04] hover:bg-zinc-100"
                      : "border border-zinc-700 hover:border-[#E85D04] text-zinc-300 hover:text-white"
                  }`}
                >
                  GET A QUOTE <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-[#0D0D0D] border-t border-zinc-800">
        <div className="container max-w-3xl">
          <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">FAQ</p>
          <h2 className="font-['Bebas_Neue',sans-serif] text-4xl md:text-5xl text-white mb-10">
            CERAMIC COATING — CHANTILLY VA
          </h2>
          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-zinc-800 hover:border-zinc-700 transition-colors">
                <button
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="text-white font-medium text-sm">{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-[#E85D04] shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-zinc-400 text-sm leading-relaxed">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Testimonials title="WHAT CHANTILLY DRIVERS SAY ABOUT OUR CERAMIC COATING" />

      <section className="py-20 bg-[#E85D04]">
        <div className="container max-w-3xl text-center">
          <h2 className="font-['Bebas_Neue',sans-serif] text-5xl md:text-6xl text-white mb-4">
            COAT YOUR CAR TODAY
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
            Get a free ceramic coating quote from Chantilly's top-rated detailing shop. Located right here on Walney Rd — no long drive required.
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

      <NearbyAreas city="Chantilly" service="ceramic" />

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
