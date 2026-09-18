/**
 * SKYLINE CUSTOMS — Ceramic Coating Service Page
 * Design: Industrial Brutalism | Dark matte black + burnt orange (#E85D04)
 * Typography: Bebas Neue (headings) + DM Sans (body)
 * URL: /services/ceramic-coating
 */

import { useBooking } from "@/contexts/BookingContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceCityLinks from "@/components/ServiceCityLinks";
import LocalBanner from "@/components/LocalBanner";
import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useState, useEffect } from "react";
import { ChevronDown, Droplets, Sparkles, Shield, Sun, Clock, Award, CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "wouter";

const benefits = [
  {
    icon: Sparkles,
    title: "Deep Gloss Enhancement",
    desc: "Ceramic coating creates a glass-like surface that amplifies your paint's depth and reflectivity beyond what any wax or sealant can achieve.",
  },
  {
    icon: Droplets,
    title: "Extreme Hydrophobic Effect",
    desc: "Water, mud, bird droppings, and road grime bead up and roll off. Your car stays cleaner longer and washes in minutes.",
  },
  {
    icon: Shield,
    title: "Chemical Resistance",
    desc: "Protects against acid rain, industrial fallout, tree sap, and harsh cleaning products that would otherwise etch and stain your paint.",
  },
  {
    icon: Sun,
    title: "UV & Oxidation Protection",
    desc: "Blocks UV radiation that causes paint fading, oxidation, and color degradation — keeping your car looking new for years.",
  },
  {
    icon: Clock,
    title: "Long-Term Durability",
    desc: "Unlike wax that lasts weeks, a professionally applied ceramic coating lasts years — with warranty options up to 7 years.",
  },
  {
    icon: Award,
    title: "Lifetime Craftsmanship Warranty",
    desc: "Every ceramic coating installation is backed by our Lifetime Craftsmanship Warranty. We stand behind every vehicle we touch.",
  },
];

const process = [
  {
    num: "01",
    title: "Vehicle Assessment",
    desc: "We inspect your paint condition under controlled lighting to determine the level of paint correction needed before coating.",
  },
  {
    num: "02",
    title: "Full Decontamination",
    desc: "Clay bar treatment, iron fallout removal, and a thorough wash eliminate all surface contaminants that would compromise adhesion.",
  },
  {
    num: "03",
    title: "Paint Correction",
    desc: "Swirl marks, light scratches, and oxidation are polished out. We never seal in imperfections — the coating is only as good as the surface beneath it.",
  },
  {
    num: "04",
    title: "IPA Panel Wipe",
    desc: "An isopropyl alcohol wipe-down removes all polishing oils and residues, ensuring the surface is chemically clean for maximum coating bond.",
  },
  {
    num: "05",
    title: "Ceramic Application",
    desc: "The coating is applied panel by panel in controlled sections, leveled precisely, and cured under infrared lamps for optimal hardness.",
  },
  {
    num: "06",
    title: "Final Inspection",
    desc: "Every panel is inspected under high-intensity lighting before delivery. You drive away with a coating that will last years — not weeks.",
  },
];

const faqs = [
  {
    q: "How long does ceramic coating last?",
    a: "A professionally applied ceramic coating lasts 2–7+ years depending on the product tier and maintenance. We offer warranty options up to 7 years.",
  },
  {
    q: "Does ceramic coating prevent scratches?",
    a: "Ceramic coating adds hardness and chemical resistance but is not a substitute for PPF against rock chips and deep scratches. For maximum protection, we recommend PPF first, then ceramic coating on top.",
  },
  {
    q: "How do I maintain a ceramic-coated car?",
    a: "Hand wash or touchless wash only — no automatic brushes. Use a pH-neutral shampoo. Avoid parking under trees for extended periods. That's it — the coating does the rest.",
  },
  {
    q: "Can ceramic coating be applied to a new car?",
    a: "Yes — and it's the ideal time. New cars still benefit from paint correction to remove transport scratches and dealer swirls before coating.",
  },
  {
    q: "What's the difference between 5-year and 7-year coating?",
    a: "Higher-tier coatings use more advanced formulations with greater hardness (9H+), thicker layering, and stronger hydrophobic properties. The 7-year tier is our flagship product for clients who want maximum long-term protection.",
  },
  {
    q: "Should I get ceramic coating with PPF?",
    a: "Absolutely. PPF handles physical impacts; ceramic coating handles chemical and UV threats while adding gloss. Together they provide complete paint protection — and ceramic coating bonds exceptionally well to PPF.",
  },
];

const packages = [
  {
    name: "Crystal Package",
    warranty: "5-Year Warranty",
    desc: "Gtechniq Crystal Serum Light — Stage 1 Correction",
    features: [
      "Gtechniq Crystal Serum Light (CSL)",
      "Stage 1 Paint Correction",
      "Full Exterior Paint Protection",
      "Glass Coating",
      "Full Decon Wash & Clay Bar",
      "Hydrophobic & UV Protection",
    ],
    featured: false,
    startingAt: "$800",
    image: "/images/ceramic-essential_211dfeb7.webp",
    imageAlt: "Tesla with ceramic coating applied to full exterior paint surface",
  },
  {
    name: "Ultimate Coating",
    warranty: "7-Year Warranty",
    desc: "Gtechniq CSL + EXO Combo — Stage 2 Correction",
    features: [
      "Gtechniq Crystal Serum Light + EXO Combo",
      "Stage 2 Paint Correction",
      "Full Exterior Paint Protection",
      "Glass Coating",
      "Trim Coating",
      "Wheel Coating",
      "Full Decon Wash & Clay Bar",
      "Maximum Hydrophobic Performance",
    ],
    featured: true,
    startingAt: "$1,300",
    image: "/images/ceramic-ultimate_ec304cc4.webp",
    imageAlt: "Tesla with full ceramic coating including paint, glass, trim, and wheels",
  },
];

export default function ServiceCeramic() {
  const { openBooking } = useBooking();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Facebook Pixel: ViewContent event when visitor lands on Ceramic Coating service page
  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "ViewContent", {
        content_name: "Ceramic Coating",
        content_category: "Auto Protection",
        content_ids: ["ceramic-coating"],
        content_type: "service",
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-['DM_Sans',sans-serif]">
      <SEO
        title="Ceramic Coating | Chantilly VA"
        description="Professional ceramic coating in Chantilly, VA. 2, 5, and 7-year packages with a Lifetime Craftsmanship Warranty. Book a free consultation today."
        canonical="https://www.skylinecustomshop.com/services/ceramic-coating"
        jsonLd={[
          {
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Ceramic Coating",
          "provider": {
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
            }
          },
          "areaServed": "Chantilly, VA and Northern Virginia",
          "description": "Professional ceramic coating providing long-lasting gloss, hydrophobic protection, and UV resistance. Available in 2, 5, and 7-year packages.",
          "review": [
            {
              "@type": "Review",
              "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
              "author": { "@type": "Person", "name": "Hassan A." },
              "reviewBody": "Had the 5-year ceramic coating done on my Audi RS5. The water beading is insane and the paint looks like it's wet all the time. Skyline did an exceptional job."
            },
            {
              "@type": "Review",
              "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
              "author": { "@type": "Person", "name": "Rachel M." },
              "reviewBody": "Got the 7-year package on my Range Rover. The team was incredibly thorough with the paint correction before applying the coating. My car looks better than the day I bought it."
            },
            {
              "@type": "Review",
              "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
              "author": { "@type": "Person", "name": "Carlos V." },
              "reviewBody": "Skyline Customs is the real deal. Ceramic coating on my Corvette C8 turned out flawless. The depth of the gloss is unreal. These guys know their craft."
            }
          ],
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "5",
            "reviewCount": "141",
            "bestRating": "5",
            "worstRating": "1"
          }
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              { "@type": "Question", "name": "How long does ceramic coating last?", "acceptedAnswer": { "@type": "Answer", "text": "A professionally applied ceramic coating lasts 2\u20137+ years depending on the product tier and maintenance. We offer warranty options up to 7 years." } },
              { "@type": "Question", "name": "Does ceramic coating prevent scratches?", "acceptedAnswer": { "@type": "Answer", "text": "Ceramic coating adds hardness and chemical resistance but is not a substitute for PPF against rock chips and deep scratches. For maximum protection, we recommend PPF first, then ceramic coating on top." } },
              { "@type": "Question", "name": "How do I maintain a ceramic-coated car?", "acceptedAnswer": { "@type": "Answer", "text": "Hand wash or touchless wash only \u2014 no automatic brushes. Use a pH-neutral shampoo. Avoid parking under trees for extended periods. That's it \u2014 the coating does the rest." } },
              { "@type": "Question", "name": "Can ceramic coating be applied to a new car?", "acceptedAnswer": { "@type": "Answer", "text": "Yes \u2014 and it's the ideal time. New cars still benefit from paint correction to remove transport scratches and dealer swirls before coating." } },
              { "@type": "Question", "name": "What's the difference between 5-year and 7-year coating?", "acceptedAnswer": { "@type": "Answer", "text": "Higher-tier coatings use more advanced formulations with greater hardness (9H+), thicker layering, and stronger hydrophobic properties. The 7-year tier is our flagship product for clients who want maximum long-term protection." } },
              { "@type": "Question", "name": "Should I get ceramic coating with PPF?", "acceptedAnswer": { "@type": "Answer", "text": "Absolutely. PPF handles physical impacts; ceramic coating handles chemical and UV threats while adding gloss. Together they provide complete paint protection \u2014 and ceramic coating bonds exceptionally well to PPF." } }
            ]
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.skylinecustomshop.com/" },
              { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://www.skylinecustomshop.com/services" },
              { "@type": "ListItem", "position": 3, "name": "Ceramic Coating", "item": "https://www.skylinecustomshop.com/services/ceramic-coating" }
            ]
          }
        ]}
      />
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-end pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0A] via-[#0d0d14] to-[#0a0a1a]" />
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 40px, #E85D04 40px, #E85D04 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, #E85D04 40px, #E85D04 41px)" }}
        />
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10"
          style={{ background: "radial-gradient(ellipse at top right, #E85D04, transparent 70%)" }}
        />
        <div className="container relative z-10 pt-32">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: "Ceramic Coating" }]} />
          <div className="flex items-center gap-3 mb-4">
            <Link href="/services" className="text-[#E85D04] text-sm font-medium tracking-widest uppercase hover:text-white transition-colors">Services</Link>
            <span className="text-zinc-600">/</span>
            <span className="text-zinc-400 text-sm tracking-widest uppercase">Ceramic Coating</span>
          </div>
          <div className="max-w-4xl">
            <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">02 — Coating</p>
            <h1 className="font-['Bebas_Neue',sans-serif] text-6xl md:text-8xl lg:text-9xl leading-none text-white mb-6">
              CERAMIC<br />
              <span className="text-[#E85D04]">COATING</span>
            </h1>
            <p className="text-zinc-300 text-lg md:text-xl max-w-2xl leading-relaxed mb-6">
              A permanent paint defense system — not a wax, not a sealant. Professionally applied ceramic coating that bonds to your paint at a molecular level and lasts years.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="tel:+17037754383"
                className="bg-[#E85D04] hover:bg-[#d14e00] text-white font-bold tracking-widest uppercase px-8 py-4 transition-all duration-200 hover:scale-105 inline-flex items-center gap-2"
              >
                FREE CONSULTATION
              </a>
              <Link
                href="/get-a-quote?service=ceramic"
                className="border border-[#E85D04] text-[#E85D04] hover:bg-[#E85D04] hover:text-white font-bold tracking-widest uppercase px-8 py-4 transition-all duration-200 inline-flex items-center gap-2"
              >
                GET A QUOTE
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Orange divider */}
      <div className="h-1 bg-[#E85D04]" />

      {/* Benefits */}
      <section className="py-24 bg-[#0D0D0D]">
        <div className="container">
          <div className="mb-16">
            <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">Why Ceramic</p>
            <h2 className="font-['Bebas_Neue',sans-serif] text-5xl md:text-6xl text-white">
              PERMANENT PAINT DEFENSE
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-800">
            {benefits.map((b, i) => (
              <div key={i} className="bg-[#0D0D0D] p-8 hover:bg-[#111] transition-colors group">
                <b.icon className="w-8 h-8 text-[#E85D04] mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-['Bebas_Neue',sans-serif] text-2xl text-white mb-3">{b.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-24 bg-[#0A0A0A]">
        <div className="container">
          <div className="mb-16">
            <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">Protection Tiers</p>
            <h2 className="font-['Bebas_Neue',sans-serif] text-5xl md:text-6xl text-white">
              CHOOSE YOUR LEVEL
            </h2>
          </div>
          <p className="text-zinc-500 text-sm mb-8">Pricing varies by vehicle size — sedans &amp; coupes / SUVs &amp; trucks. Request a free quote for your vehicle.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
            {packages.map((pkg, i) => (
              <div
                key={i}
                className={`relative border flex flex-col overflow-hidden ${pkg.featured ? "border-[#E85D04] bg-[#1a0a00]" : "border-zinc-800 bg-[#0D0D0D] hover:border-zinc-600"} transition-colors`}
              >
                {pkg.featured && (
                  <div className="absolute top-3 left-6 z-10 bg-[#E85D04] text-white text-xs font-bold tracking-widest uppercase px-3 py-1">
                    MOST POPULAR
                  </div>
                )}
                <img loading="lazy" decoding="async"
                  src={pkg.image}
                  alt={pkg.imageAlt}
                  className="w-full h-48 object-cover"
                />
                <div className="p-8 flex flex-col flex-1">
                  <h3 className="font-['Bebas_Neue',sans-serif] text-3xl text-white mb-1">{pkg.name}</h3>
                  <p className="text-[#E85D04] text-xs font-bold tracking-widest uppercase mb-1">{pkg.warranty}</p>
                  <p className="text-zinc-500 text-xs uppercase tracking-widest mb-6">{pkg.desc}</p>
                  <ul className="space-y-2 flex-1 mb-6">
                    {pkg.features.map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-zinc-300">
                        <CheckCircle className="w-4 h-4 text-[#E85D04] mt-0.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/get-a-quote?service=ceramic"
                    className={`w-full py-3 font-bold text-sm tracking-widest uppercase transition-all block text-center ${pkg.featured ? "bg-[#E85D04] hover:bg-[#d14e00] text-white" : "border border-zinc-700 hover:border-[#E85D04] text-white hover:text-[#E85D04]"}`}
                  >
                    GET A QUOTE
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 bg-[#0D0D0D]">
        <div className="container">
          <div className="mb-16">
            <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">The Skyline Process</p>
            <h2 className="font-['Bebas_Neue',sans-serif] text-5xl md:text-6xl text-white">
              HOW WE DO IT
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-800">
            {process.map((step, i) => (
              <div key={i} className="bg-[#0D0D0D] p-8 hover:bg-[#111] transition-colors">
                <span className="font-['Bebas_Neue',sans-serif] text-5xl text-[#E85D04] opacity-40 block mb-4">{step.num}</span>
                <h3 className="font-['Bebas_Neue',sans-serif] text-2xl text-white mb-3">{step.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-[#0A0A0A]">
        <div className="container max-w-3xl">
          <div className="mb-16">
            <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">Common Questions</p>
            <h2 className="font-['Bebas_Neue',sans-serif] text-5xl md:text-6xl text-white">
              CERAMIC FAQ
            </h2>
          </div>
          <div className="space-y-px">
            {faqs.map((faq, i) => (
              <div key={i} className="border-b border-zinc-800">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between py-6 text-left group"
                >
                  <span className="font-['Bebas_Neue',sans-serif] text-xl text-white group-hover:text-[#E85D04] transition-colors pr-4">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-[#E85D04] shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                {openFaq === i && (
                  <p className="text-zinc-400 text-sm leading-relaxed pb-6">{faq.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-[#E85D04]">
        <div className="container text-center">
          <h2 className="font-['Bebas_Neue',sans-serif] text-5xl md:text-7xl text-white mb-4">
            GIVE YOUR PAINT PERMANENT DEFENSE
          </h2>
          <p className="text-orange-100 text-lg mb-10 max-w-xl mx-auto">
            Book a free consultation and we'll recommend the right coating tier for your vehicle, budget, and lifestyle.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:+17037754383"
              className="bg-white text-[#E85D04] hover:bg-zinc-100 font-bold tracking-widest uppercase px-10 py-4 transition-all duration-200 hover:scale-105 flex items-center gap-2"
            >
              FREE CONSULTATION <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href="/get-a-quote?service=ceramic"
              className="border-2 border-white text-white hover:bg-white hover:text-[#E85D04] font-bold tracking-widest uppercase px-10 py-4 transition-all duration-200"
            >
              COMBINE WITH PPF
            </Link>
          </div>
        </div>
      </section>

      <LocalBanner localHref="/ceramic-coating-chantilly-va" serviceName="Ceramic Coating" />
      <ServiceCityLinks service="ceramic" />
      <Footer />
    </div>
  );
}
