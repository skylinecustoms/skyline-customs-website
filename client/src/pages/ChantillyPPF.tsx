/*
 * SKYLINE CUSTOMS — Local SEO Landing Page
 * Paint Protection Film in Chantilly, VA
 * URL: /ppf-chantilly-va
 * NOTE: This is the shop's home city — highest authority page
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
    q: "Where is Skyline Custom Shop located in Chantilly, VA?",
    a: "We are located at 4215 Walney Rd Suite R, Chantilly, VA 20151 — just off Route 28, minutes from Dulles Airport and easily accessible from I-66, I-495, and the Dulles Toll Road. Free parking on site.",
  },
  {
    q: "How much does PPF cost in Chantilly, VA?",
    a: "PPF pricing depends on coverage level. Partial front packages start at $1,800 (bumper + partial hood). Full front coverage — including bumper, hood, fenders, mirrors, headlights, and A-pillars — is $2,400. Full vehicle wraps start at $4,500 for sedans. All prices subject to in-person inspection. Contact us for a free, no-obligation quote.",
  },
  {
    q: "Why is Chantilly a great location for PPF installation?",
    a: "Chantilly sits at the intersection of Route 28, I-66, and the Dulles Toll Road — some of the highest-traffic roads in Northern Virginia. Road debris, gravel, and highway chips are a constant hazard for paint. PPF is the most effective way to protect your investment from daily commuter damage.",
  },
  {
    q: "How long does PPF installation take at your Chantilly shop?",
    a: "A partial front-end install typically takes one day. Full-vehicle wraps may take 2–3 days depending on vehicle complexity. We'll give you a firm timeline at your consultation.",
  },
  {
    q: "Do you offer PPF for Tesla, BMW, and luxury vehicles in Chantilly?",
    a: "Absolutely. We specialize in high-end and exotic vehicles. Our computer-cut patterns are precision-fit for every make and model, including Tesla, BMW, Mercedes, Porsche, and more.",
  },
  {
    q: "Does PPF self-heal scratches?",
    a: "Yes — our premium STEK DYNOshield film features thermoplastic polyurethane that self-heals light scratches and swirl marks when exposed to heat, keeping your paint looking pristine for years.",
  },
];

const nearbyAreas = [
  "Chantilly", "Dulles", "Centreville", "Herndon",
  "Reston", "Fairfax", "Sterling", "Ashburn",
];

export default function ChantillyPPF() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-['DM_Sans',sans-serif]">
      <SEO
        title="Paint Protection Film Chantilly VA | Skyline Custom Shop — PPF Near Dulles"
        description="Skyline Custom Shop is Chantilly's top-rated PPF installer, located at 4215 Walney Rd Suite R. We protect vehicles from rock chips and road debris on Route 28, I-66, and the Dulles Toll Road. Get a free quote today."
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
              "latitude": "38.8951",
              "longitude": "-77.4317"
            },
            "areaServed": { "@type": "City", "name": "Chantilly, VA" },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Paint Protection Film Services in Chantilly VA",
              "itemListElement": [
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Partial Front PPF — Chantilly VA" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Full Front PPF — Chantilly VA" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Full Vehicle PPF — Chantilly VA" } },
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
              { "@type": "ListItem", "position": 3, "name": "PPF Chantilly VA", "item": "https://www.skylinecustomshop.com/ppf-chantilly-va" }
            ]
          }
        ]}
      />
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-end pb-16 overflow-hidden">
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
            <span className="text-[#E85D04] text-sm font-bold tracking-widest uppercase">Chantilly, Virginia — Our Home Shop</span>
          </div>
          <div className="max-w-4xl">
            <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">Paint Protection Film</p>
            <h1 className="font-['Bebas_Neue',sans-serif] text-6xl md:text-8xl lg:text-9xl leading-none text-white mb-4">
              PPF IN<br />
              <span className="text-[#E85D04]">CHANTILLY</span>
            </h1>
            <p className="text-zinc-300 text-lg md:text-xl max-w-2xl leading-relaxed mb-2">
              Skyline Custom Shop is located right here in Chantilly, VA — at 4215 Walney Rd Suite R, off Route 28 near Dulles Airport. We protect Northern Virginia vehicles from rock chips, road debris, and daily commuter damage on I-66, the Dulles Toll Road, and Route 28.
            </p>
            <div className="flex items-center gap-2 mb-6">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-[#E85D04] text-[#E85D04]" />)}
              <span className="text-zinc-400 text-sm ml-1">5.0 · 78 Google reviews</span>
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

      {/* Why Chantilly needs PPF */}
      <section className="py-20 bg-[#0D0D0D]">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">Why Chantilly Drivers Need PPF</p>
              <h2 className="font-['Bebas_Neue',sans-serif] text-4xl md:text-5xl text-white mb-6">
                ROUTE 28, I-66 &<br />DULLES TOLL ROAD
              </h2>
              <p className="text-zinc-400 leading-relaxed mb-4">
                Chantilly sits at one of the busiest highway intersections in Northern Virginia. Daily commuters on Route 28, I-66, and the Dulles Toll Road face constant exposure to gravel, road debris, and construction zones — all of which cause paint chips and scratches that devalue your vehicle.
              </p>
              <p className="text-zinc-400 leading-relaxed mb-6">
                Paint Protection Film (PPF) is a clear, self-healing urethane film that absorbs impacts before they reach your paint. As Chantilly's local PPF specialist, we install STEK DYNOshield films with precision computer-cut patterns for every make and model.
              </p>
              <div className="space-y-3">
                {[
                  "Self-healing film — minor scratches disappear with heat",
                  "12-year manufacturer warranty on premium films",
                  "Invisible protection — preserves factory paint appearance",
                  "Increases resale value by protecting original paint",
                  "Computer-cut patterns for precise, seamless fit",
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
                { value: "10yr", label: "Film Warranty" },
                { value: "5.0★", label: "Google Rating" },
                { value: "500+", label: "Cars Protected" },
                { value: "1 Day", label: "Typical Install" },
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

      {/* Services */}
      <section className="py-20 bg-[#0A0A0A] border-t border-zinc-800">
        <div className="container">
          <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">PPF Packages</p>
          <h2 className="font-['Bebas_Neue',sans-serif] text-4xl md:text-5xl text-white mb-10">
            COVERAGE OPTIONS
          </h2>
          <div className="grid md:grid-cols-3 gap-px bg-zinc-800">
            {[
              {
                name: "Partial Front",
                desc: "Protects the most vulnerable areas: hood leading edge, front bumper, and mirrors. Ideal for daily commuters on Route 28 and I-66.",
                features: ["Hood leading edge", "Front bumper", "Side mirrors", "Headlights"],
              },
              {
                name: "Full Front",
                desc: "Complete front-end protection including full hood, full front bumper, fenders, and A-pillars. Best for highway commuters.",
                features: ["Full hood", "Full front bumper", "Full fenders", "A-pillars", "Headlights & mirrors"],
                featured: true,
              },
              {
                name: "Full Vehicle",
                desc: "Maximum protection for your entire vehicle. Ideal for luxury, exotic, and high-value vehicles driven on Northern Virginia roads.",
                features: ["All panels", "Roof", "Doors & rockers", "Rear bumper", "Full hood & trunk"],
              },
            ].map((pkg) => (
              <div key={pkg.name} className={`p-8 ${pkg.featured ? "bg-[#E85D04]" : "bg-[#0D0D0D]"}`}>
                {pkg.featured && <div className="text-white/70 text-xs font-bold tracking-widest uppercase mb-2">Most Popular</div>}
                <div className={`font-['Bebas_Neue',sans-serif] text-3xl mb-3 ${pkg.featured ? "text-white" : "text-white"}`}>{pkg.name}</div>
                <p className={`text-sm leading-relaxed mb-5 ${pkg.featured ? "text-white/80" : "text-zinc-400"}`}>{pkg.desc}</p>
                <ul className="space-y-2 mb-6">
                  {pkg.features.map((f) => (
                    <li key={f} className={`flex items-center gap-2 text-sm ${pkg.featured ? "text-white" : "text-zinc-300"}`}>
                      <CheckCircle className={`w-3.5 h-3.5 shrink-0 ${pkg.featured ? "text-white" : "text-[#E85D04]"}`} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/get-a-quote?service=ppf"
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

      {/* Location */}
      <section className="py-20 bg-[#0D0D0D] border-t border-zinc-800">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">Our Location</p>
              <h2 className="font-['Bebas_Neue',sans-serif] text-4xl md:text-5xl text-white mb-4">
                RIGHT HERE IN<br />CHANTILLY, VA
              </h2>
              <p className="text-zinc-400 leading-relaxed mb-6">
                We're conveniently located at <strong className="text-white">4215 Walney Rd Suite R, Chantilly, VA 20151</strong> — just off Route 28, minutes from Dulles Airport. Easy access from I-66, I-495, and the Dulles Toll Road. Free parking on site.
              </p>
              <div className="space-y-3 mb-8">
                {[
                  { label: "Address", value: "4215 Walney Rd Suite R, Chantilly, VA 20151" },
                  { label: "Phone", value: "(703) 775-4383", href: "tel:+17037754383" },
                  { label: "Hours", value: "Mon–Sat: 8am–6pm" },
                  { label: "Near", value: "Route 28, Dulles Airport, I-66, I-495" },
                ].map((item) => (
                  <div key={item.label} className="flex gap-3 text-sm">
                    <span className="text-zinc-500 w-16 shrink-0">{item.label}</span>
                    {item.href ? (
                      <a href={item.href} className="text-white hover:text-[#E85D04] transition-colors">{item.value}</a>
                    ) : (
                      <span className="text-white">{item.value}</span>
                    )}
                  </div>
                ))}
              </div>
              <Link href="/get-a-quote?service=ppf"
                className="bg-[#E85D04] hover:bg-[#d14e00] text-white font-bold tracking-widest uppercase px-8 py-4 transition-all inline-flex items-center gap-2"
              >
                BOOK YOUR INSTALL <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div>
              <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">Also Serving</p>
              <div className="flex flex-wrap gap-2">
                {nearbyAreas.map((area) => (
                  <span key={area} className="border border-zinc-700 text-zinc-400 text-xs px-3 py-1.5">{area}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-[#0A0A0A] border-t border-zinc-800">
        <div className="container max-w-3xl">
          <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">FAQ</p>
          <h2 className="font-['Bebas_Neue',sans-serif] text-4xl md:text-5xl text-white mb-10">
            PPF QUESTIONS — CHANTILLY VA
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

      <Testimonials title="WHAT CHANTILLY DRIVERS SAY ABOUT OUR PPF" />

      <section className="py-20 bg-[#E85D04]">
        <div className="container max-w-3xl text-center">
          <h2 className="font-['Bebas_Neue',sans-serif] text-5xl md:text-6xl text-white mb-4">
            PROTECT YOUR PAINT TODAY
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
            Get a free PPF quote from Northern Virginia's top-rated installer. Located right here in Chantilly — no long drive required.
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

      <NearbyAreas city="Chantilly" service="ppf" />

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
