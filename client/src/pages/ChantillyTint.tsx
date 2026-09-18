/*
 * SKYLINE CUSTOMS — Local SEO Landing Page
 * Window Tinting in Chantilly, VA
 * URL: /window-tinting-chantilly-va
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
    q: "Is window tinting legal in Virginia?",
    a: "Yes — Virginia law allows front side windows to have a minimum of 50% VLT (visible light transmission), rear side windows and rear windshield can be any darkness. We ensure all our tint installations are Virginia-legal and provide documentation.",
  },
  {
    q: "How much does window tinting cost in Chantilly, VA?",
    a: "GeoShield Pro Nano Ceramic tint packages start at $280 (4 side windows), $350 (front 2 windows), $425 (rear package — most popular), or $575 for full car (all windows including windshield). Windshield-only is $200. All packages include a Nationwide Lifetime Warranty. Contact us for a free quote based on your specific vehicle.",
  },
  {
    q: "What is the best window tint film for Virginia heat?",
    a: "Ceramic window tint is the best choice for Virginia summers — it blocks up to 99% of UV rays and significantly reduces heat without affecting visibility or signal reception. It also won't fade or turn purple over time like dyed films.",
  },
  {
    q: "How long does window tinting take in Chantilly?",
    a: "Most vehicles can be tinted in 2–4 hours at our Chantilly shop. Larger SUVs and trucks may take slightly longer. We'll give you a firm timeline when you book.",
  },
  {
    q: "How long does window tint last?",
    a: "Quality ceramic and carbon films last 10+ years with proper care. We use premium brands with manufacturer warranties. Avoid rolling windows down for 3–5 days after installation to allow full curing.",
  },
  {
    q: "Does window tint reduce heat inside the car?",
    a: "Yes — ceramic window tint can reduce interior heat by up to 60%, making a significant difference on hot Virginia summer days. It also reduces glare from the Dulles corridor sun during morning and evening commutes.",
  },
];

export default function ChantillyTint() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-['DM_Sans',sans-serif]">
      <SEO
        title="Window Tinting Chantilly VA | Skyline Custom Shop — Ceramic Tint Near Dulles"
        description="Professional window tinting in Chantilly, VA at Skyline Custom Shop — 4215 Walney Rd Suite R. Virginia-legal ceramic and carbon tint that blocks heat and UV. Serving Route 28, I-66, and the Dulles corridor. Free quote."
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
            "areaServed": { "@type": "City", "name": "Chantilly, VA" },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Window Tinting Services in Chantilly VA",
              "itemListElement": [
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Ceramic Window Tint — Chantilly VA" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Carbon Window Tint — Chantilly VA" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Standard Window Tint — Chantilly VA" } },
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
              { "@type": "ListItem", "position": 3, "name": "Window Tinting Chantilly VA", "item": "https://www.skylinecustomshop.com/window-tinting-chantilly-va" }
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
            <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">Window Tinting</p>
            <h1 className="font-['Bebas_Neue',sans-serif] text-6xl md:text-8xl lg:text-9xl leading-none text-white mb-4">
              TINTING IN<br />
              <span className="text-[#E85D04]">CHANTILLY</span>
            </h1>
            <p className="text-zinc-300 text-lg md:text-xl max-w-2xl leading-relaxed mb-2">
              Virginia-legal window tinting at our Chantilly shop — 4215 Walney Rd Suite R, off Route 28. Ceramic and carbon films that block heat, UV, and glare on the Dulles Toll Road and I-66 morning commute.
            </p>
            <div className="flex items-center gap-2 mb-6">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-[#E85D04] text-[#E85D04]" />)}
              <span className="text-zinc-400 text-sm ml-1">5.0 · 78 Google reviews</span>
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

      {/* Benefits */}
      <section className="py-20 bg-[#0D0D0D]">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">Why Tint in Chantilly?</p>
              <h2 className="font-['Bebas_Neue',sans-serif] text-4xl md:text-5xl text-white mb-6">
                BEAT THE DULLES<br />CORRIDOR HEAT
              </h2>
              <p className="text-zinc-400 leading-relaxed mb-4">
                Chantilly's location along the Dulles Toll Road and Route 28 means long commutes in direct sun — especially during the brutal Virginia summer. Ceramic window tint reduces interior heat by up to 60% and blocks 99% of UV rays, protecting both you and your interior.
              </p>
              <p className="text-zinc-400 leading-relaxed mb-6">
                Our Virginia-legal tint installations come with documentation and are compliant with all state regulations. We use premium ceramic and carbon films from leading manufacturers for long-lasting performance.
              </p>
              <div className="space-y-3">
                {[
                  "Blocks up to 99% of UV rays — protects skin and interior",
                  "Reduces interior heat by up to 60%",
                  "Reduces glare on morning and evening commutes",
                  "Virginia-legal — all installs include compliance documentation",
                  "Ceramic film won't interfere with GPS, phone, or radio signals",
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
                { value: "99%", label: "UV Blocked" },
                { value: "60%", label: "Heat Reduction" },
                { value: "5.0★", label: "Google Rating" },
                { value: "2–4h", label: "Install Time" },
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

      {/* Film options */}
      <section className="py-20 bg-[#0A0A0A] border-t border-zinc-800">
        <div className="container">
          <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">Film Options</p>
          <h2 className="font-['Bebas_Neue',sans-serif] text-4xl md:text-5xl text-white mb-10">TINT PACKAGES</h2>
          <div className="grid md:grid-cols-3 gap-px bg-zinc-800">
            {[
              {
                name: "Standard Dyed",
                desc: "Entry-level dyed film for privacy and basic UV protection. Good for daily drivers on a budget.",
                features: ["Privacy tint", "Basic UV protection", "Virginia-legal shades", "1-year warranty"],
              },
              {
                name: "Carbon Film",
                desc: "Carbon-infused film with better heat rejection and a matte finish. Won't fade or turn purple over time.",
                features: ["Carbon-infused formula", "Better heat rejection", "Matte finish", "No signal interference", "Lifetime warranty"],
                featured: true,
              },
              {
                name: "Ceramic Film",
                desc: "Top-tier ceramic film with maximum heat and UV rejection. Best for Virginia summers and luxury vehicles.",
                features: ["Nano-ceramic technology", "Maximum heat rejection", "Crystal clarity", "No signal interference", "Lifetime warranty"],
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
                <Link href="/get-a-quote?service=tint"
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
            WINDOW TINTING — CHANTILLY VA
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

      <Testimonials title="WHAT CHANTILLY DRIVERS SAY ABOUT OUR WINDOW TINTING" />

      <section className="py-20 bg-[#E85D04]">
        <div className="container max-w-3xl text-center">
          <h2 className="font-['Bebas_Neue',sans-serif] text-5xl md:text-6xl text-white mb-4">
            TINT YOUR WINDOWS TODAY
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
            Beat the Virginia heat with professional ceramic window tinting. Located right here in Chantilly — book your appointment today.
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

      <NearbyAreas city="Chantilly" service="tint" />

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
