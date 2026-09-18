/*
 * SKYLINE CUSTOMS — Local SEO Landing Page
 * Vinyl Wraps in Chantilly, VA
 * URL: /vinyl-wraps-chantilly-va
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
    q: "Where can I get a vinyl wrap in Chantilly, VA?",
    a: "Skyline Custom Shop is located at 4215 Walney Rd Suite R, Chantilly, VA 20151 — just off Route 28 near Dulles Airport. We offer full vehicle wraps, partial wraps, and color change wraps for all vehicle types.",
  },
  {
    q: "How much does a vinyl wrap cost in Chantilly?",
    a: "Full color change wraps start at $3,000 for sedans, $4,000 for SUVs/crossovers, and $4,500 for trucks. Partial combos (roof + hood + mirrors) start at $850. Chrome delete starts at $600 for sedans. All prices subject to in-person inspection. Contact us for a free quote.",
  },
  {
    q: "How long does a vinyl wrap last?",
    a: "Quality cast vinyl wraps last 5–7 years with proper care. We use premium 3M and Avery Dennison films with manufacturer warranties. Proper washing and avoiding harsh chemicals will maximize longevity.",
  },
  {
    q: "Can a vinyl wrap protect my paint?",
    a: "Yes — vinyl wraps act as a sacrificial layer that protects your factory paint from minor scratches, UV fading, and road debris. When removed, your original paint is preserved underneath, which is excellent for resale value.",
  },
  {
    q: "How long does a full wrap installation take in Chantilly?",
    a: "A full vehicle wrap typically takes 3–5 days depending on vehicle complexity and design. Partial wraps and accent pieces can be done in 1–2 days. We'll give you a firm timeline at your consultation.",
  },
  {
    q: "Can I wrap my commercial vehicle or fleet in Chantilly?",
    a: "Absolutely. We offer commercial vehicle wraps and fleet graphics for businesses throughout the Chantilly and Dulles corridor area. Custom design services are available. Contact us for fleet pricing.",
  },
];

export default function ChantillyWrap() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-['DM_Sans',sans-serif]">
      <SEO
        title="Vinyl Wraps Chantilly VA | Skyline Custom Shop — Color Change Wraps Near Dulles"
        description="Professional vinyl wraps in Chantilly, VA at Skyline Custom Shop — 4215 Walney Rd Suite R. Full vehicle color change wraps, partial wraps, and commercial fleet wraps. Serving Route 28 and the Dulles corridor. Free quote."
        canonical="https://www.skylinecustomshop.com/vinyl-wraps-chantilly-va"
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
              "name": "Vinyl Wrap Services in Chantilly VA",
              "itemListElement": [
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Full Vehicle Color Change Wrap — Chantilly VA" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Partial Vinyl Wrap — Chantilly VA" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Commercial Fleet Wrap — Chantilly VA" } },
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
              { "@type": "ListItem", "position": 3, "name": "Vinyl Wraps Chantilly VA", "item": "https://www.skylinecustomshop.com/vinyl-wraps-chantilly-va" }
            ]
          }
        ]}
      />
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-end pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0A] via-[#111] to-[#0d0a0a]" />
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
            <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">Vinyl Wraps</p>
            <h1 className="font-['Bebas_Neue',sans-serif] text-6xl md:text-8xl lg:text-9xl leading-none text-white mb-4">
              WRAPS IN<br />
              <span className="text-[#E85D04]">CHANTILLY</span>
            </h1>
            <p className="text-zinc-300 text-lg md:text-xl max-w-2xl leading-relaxed mb-2">
              Full vehicle color change wraps, partial wraps, and commercial fleet graphics at our Chantilly shop — 4215 Walney Rd Suite R, off Route 28. Transform your vehicle's appearance while protecting the factory paint underneath.
            </p>
            <div className="flex items-center gap-2 mb-6">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-[#E85D04] text-[#E85D04]" />)}
              <span className="text-zinc-400 text-sm ml-1">5.0 · 78 Google reviews</span>
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
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">Why Wrap in Chantilly?</p>
              <h2 className="font-['Bebas_Neue',sans-serif] text-4xl md:text-5xl text-white mb-6">
                TRANSFORM YOUR<br />VEHICLE'S LOOK
              </h2>
              <p className="text-zinc-400 leading-relaxed mb-4">
                A vinyl wrap is the most cost-effective way to completely change your vehicle's color and appearance — at a fraction of the cost of a paint job. As Chantilly's local wrap specialist, we offer hundreds of colors and finishes including matte, satin, gloss, chrome, and specialty textures.
              </p>
              <p className="text-zinc-400 leading-relaxed mb-6">
                Beyond aesthetics, wraps protect your factory paint from UV fading and minor abrasions. When you're ready to sell or change colors, the wrap peels off cleanly, revealing pristine original paint underneath.
              </p>
              <div className="space-y-3">
                {[
                  "Hundreds of colors and finishes — matte, satin, gloss, chrome",
                  "Protects factory paint — preserves resale value",
                  "Fully reversible — peel off cleanly when ready",
                  "5–7 year durability with premium 3M and Avery films",
                  "Commercial fleet wraps and custom graphics available",
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
                { value: "500+", label: "Colors & Finishes" },
                { value: "5–7yr", label: "Film Durability" },
                { value: "5.0★", label: "Google Rating" },
                { value: "3–5d", label: "Full Wrap Time" },
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

      {/* Wrap types */}
      <section className="py-20 bg-[#0A0A0A] border-t border-zinc-800">
        <div className="container">
          <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">Wrap Options</p>
          <h2 className="font-['Bebas_Neue',sans-serif] text-4xl md:text-5xl text-white mb-10">WRAP PACKAGES</h2>
          <div className="grid md:grid-cols-3 gap-px bg-zinc-800">
            {[
              {
                name: "Partial Wrap",
                desc: "Accent pieces, roof wraps, hood wraps, and mirror caps. Great for adding a custom touch without a full color change.",
                features: ["Roof, hood, or mirrors", "Accent stripes", "Pillar wraps", "1–2 day install"],
              },
              {
                name: "Full Color Change",
                desc: "Complete vehicle transformation. Choose from hundreds of colors and finishes. Our most popular package.",
                features: ["Full vehicle coverage", "500+ color options", "Matte, satin, gloss, chrome", "Paint protection included", "3–5 day install"],
                featured: true,
              },
              {
                name: "Commercial Fleet",
                desc: "Custom branded wraps for business vehicles and fleets. Includes design services and fleet pricing.",
                features: ["Custom design service", "Fleet pricing available", "Branding & logos", "Durable commercial films", "Fast turnaround"],
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
                <Link href="/get-a-quote?service=wrap"
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
            VINYL WRAPS — CHANTILLY VA
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

      <Testimonials title="WHAT CHANTILLY DRIVERS SAY ABOUT OUR VINYL WRAPS" />

      <section className="py-20 bg-[#E85D04]">
        <div className="container max-w-3xl text-center">
          <h2 className="font-['Bebas_Neue',sans-serif] text-5xl md:text-6xl text-white mb-4">
            TRANSFORM YOUR VEHICLE
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
            Get a free vinyl wrap quote from Chantilly's top-rated wrap shop. Located right here on Walney Rd — no long drive required.
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

      <NearbyAreas city="Chantilly" service="wrap" />

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
