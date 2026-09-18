/**
 * SKYLINE CUSTOMS — Vinyl Wraps Service Page
 * Design: Industrial Brutalism | Dark matte black + burnt orange (#E85D04)
 * Typography: Bebas Neue (headings) + DM Sans (body)
 * URL: /services/vinyl-wraps
 */

import { useBooking } from "@/contexts/BookingContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceCityLinks from "@/components/ServiceCityLinks";
import LocalBanner from "@/components/LocalBanner";
import SEO from "@/components/SEO";
import { useState, useEffect } from "react";
import { ChevronDown, Palette, Shield, RefreshCw, DollarSign, Layers, Star, CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "wouter";

const benefits = [
  {
    icon: Palette,
    title: "Unlimited Color Options",
    desc: "From matte black to chrome, satin finishes to color-shift films — the possibilities are virtually limitless. Change your car's look without repainting.",
  },
  {
    icon: Shield,
    title: "Paint Protection",
    desc: "Vinyl wrap acts as a protective layer over your factory paint, shielding it from minor scratches, UV rays, and environmental damage.",
  },
  {
    icon: RefreshCw,
    title: "Fully Reversible",
    desc: "Unlike a paint job, vinyl wrap can be removed cleanly — restoring your factory paint underneath. Perfect for leased vehicles.",
  },
  {
    icon: DollarSign,
    title: "Preserves Resale Value",
    desc: "Wrap protects your original paint from wear and fading, keeping it in showroom condition when you're ready to sell or trade.",
  },
  {
    icon: Layers,
    title: "Partial or Full Coverage",
    desc: "Wrap a single panel, roof, hood, or mirrors — or go full vehicle. We offer accent wraps, two-tone designs, and complete color changes.",
  },
  {
    icon: Star,
    title: "Lifetime Craftsmanship Warranty",
    desc: "Every wrap installation at Skyline Customs is backed by our Lifetime Craftsmanship Warranty. We stand behind every panel we touch.",
  },
];

const process = [
  {
    num: "01",
    title: "Design Consultation",
    desc: "We discuss your vision — color, finish, coverage area — and walk you through film samples so you can see and feel the options before committing.",
  },
  {
    num: "02",
    title: "Surface Preparation",
    desc: "The vehicle is thoroughly washed, decontaminated, and any existing damage is noted. Proper prep is what separates a lasting wrap from a failing one.",
  },
  {
    num: "03",
    title: "Panel Disassembly",
    desc: "Trim pieces, badges, and moldings are carefully removed to allow full panel coverage with clean, hidden edges — not wrapped over gaps.",
  },
  {
    num: "04",
    title: "Precision Film Application",
    desc: "Film is applied panel by panel using professional heat guns and squeegees to conform perfectly to curves, edges, and complex body lines.",
  },
  {
    num: "05",
    title: "Edge Sealing & Reassembly",
    desc: "All edges are heat-set and sealed to prevent lifting. Trim and badges are reinstalled and the vehicle is inspected in full.",
  },
  {
    num: "06",
    title: "Final Quality Check",
    desc: "Every seam, edge, and panel is reviewed under controlled lighting before delivery. No bubbles, no lifting, no shortcuts.",
  },
];

const faqs = [
  {
    q: "How long does a vinyl wrap last?",
    a: "A professionally installed vinyl wrap typically lasts 5–7 years with proper care. Garage-kept vehicles and those regularly hand-washed can see even longer life.",
  },
  {
    q: "Will vinyl wrap damage my paint?",
    a: "No — when installed and removed properly by professionals, vinyl wrap protects your paint. It's one of the best ways to preserve factory paint on a leased or high-value vehicle.",
  },
  {
    q: "Can I wrap a car that has been repainted?",
    a: "It depends on the quality of the repaint. We'll inspect the paint condition during consultation — fresh, properly cured paint wraps well; flaking or poorly adhered paint can cause issues.",
  },
  {
    q: "How do I care for a wrapped vehicle?",
    a: "Hand wash or touchless wash only. Avoid high-pressure water directly on seams and edges. Use wrap-safe cleaning products. No automatic brush washes.",
  },
  {
    q: "Can I wrap just part of my car?",
    a: "Absolutely. Partial wraps are one of our most popular services — roof wraps, hood wraps, mirror accents, and two-tone designs all create a dramatic look without a full vehicle commitment.",
  },
  {
    q: "How is vinyl wrap different from a paint job?",
    a: "Wrap is reversible, faster, and typically more cost-effective than a full respray. It also offers finishes (matte, satin, chrome, color-shift) that are extremely difficult to achieve with paint.",
  },
];

const styles = [
  { name: "Matte", desc: "Flat, non-reflective finish. The most popular choice for a stealthy, aggressive look." },
  { name: "Satin", desc: "Between matte and gloss — a subtle sheen that catches light without being flashy." },
  { name: "Gloss", desc: "High-shine finish that mimics a fresh paint job. Deep, reflective, and bold." },
  { name: "Chrome / Mirror", desc: "Maximum visual impact. Highly reflective metallic finish that turns heads everywhere." },
  { name: "Color Shift", desc: "Changes color depending on the viewing angle and lighting conditions. Truly unique." },
  { name: "Textured", desc: "Carbon fiber, brushed metal, and other textured films that add dimension and depth." },
];

export default function ServiceWrap() {
  const { openBooking } = useBooking();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Facebook Pixel: ViewContent event when visitor lands on Vinyl Wraps service page
  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "ViewContent", {
        content_name: "Vinyl Wraps",
        content_category: "Auto Protection",
        content_ids: ["vinyl-wraps"],
        content_type: "service",
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-['DM_Sans',sans-serif]">
      <SEO
        title="Vinyl Wraps | Chantilly VA"
        description="Custom vinyl wraps in Chantilly, VA. Full vehicle, partial, and color change wraps in matte, satin, chrome, and color-shift films. Free consultation."
        canonical="https://www.skylinecustomshop.com/services/vinyl-wraps"
        jsonLd={[
          {
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Vinyl Wraps",
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
          "description": "Custom vinyl wraps for full vehicle color changes, partial wraps, and accents. Available in matte, satin, chrome, and color-shift films.",
          "review": [
            {
              "@type": "Review",
              "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
              "author": { "@type": "Person", "name": "Tyler W." },
              "reviewBody": "Skyline wrapped my Mustang GT in matte black and it looks absolutely menacing. The wrap is perfectly smooth with no bubbles or lifting edges. Best shop in Northern Virginia."
            },
            {
              "@type": "Review",
              "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
              "author": { "@type": "Person", "name": "Natalie C." },
              "reviewBody": "Did a color-shift wrap on my Mercedes GLE and the result is stunning. The team walked me through every film option and helped me choose the perfect color. Couldn't be happier."
            },
            {
              "@type": "Review",
              "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
              "author": { "@type": "Person", "name": "Omar F." },
              "reviewBody": "Got a satin white wrap on my Dodge Charger. Skyline's craftsmanship is top tier — every panel is perfect. Multiple people have asked me if it's a factory color. Incredible work."
            }
          ],
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "5",
            "reviewCount": "73",
            "bestRating": "5",
            "worstRating": "1"
          }
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              { "@type": "Question", "name": "How long does a vinyl wrap last?", "acceptedAnswer": { "@type": "Answer", "text": "A professionally installed vinyl wrap typically lasts 5\u20137 years with proper care. Avoiding high-pressure washes and keeping the vehicle garaged extends the life significantly." } },
              { "@type": "Question", "name": "Will a wrap damage my paint?", "acceptedAnswer": { "@type": "Answer", "text": "No \u2014 when installed and removed properly, vinyl wraps protect your original paint. In fact, many owners wrap their vehicles specifically to preserve the factory paint underneath." } },
              { "@type": "Question", "name": "Can I wrap a car that has been repainted?", "acceptedAnswer": { "@type": "Answer", "text": "It depends on the quality and condition of the repaint. We'll inspect the paint before installation. Aftermarket paint that isn't fully cured or is peeling can cause adhesion issues." } },
              { "@type": "Question", "name": "How do I wash a wrapped car?", "acceptedAnswer": { "@type": "Answer", "text": "Hand washing is best. If using a drive-through, choose touchless only. Avoid high-pressure wands directed at wrap edges. Use a mild, non-abrasive soap." } },
              { "@type": "Question", "name": "Can I wrap just part of my car?", "acceptedAnswer": { "@type": "Answer", "text": "Yes \u2014 partial wraps (roof, hood, mirrors, accents) are popular and cost-effective. We can wrap any panel or combination of panels to achieve the look you want." } },
              { "@type": "Question", "name": "What's the difference between a wrap and a paint job?", "acceptedAnswer": { "@type": "Answer", "text": "A wrap is reversible, faster, and often more affordable than a full respray. It also protects the original paint. A custom paint job is permanent. Wraps are ideal for color changes, branding, and protection." } }
            ]
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.skylinecustomshop.com/" },
              { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://www.skylinecustomshop.com/services" },
              { "@type": "ListItem", "position": 3, "name": "Vinyl Wraps", "item": "https://www.skylinecustomshop.com/services/vinyl-wraps" }
            ]
          }
        ]}
      />
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-end pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0A] via-[#111] to-[#1a0a00]" />
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 40px, #E85D04 40px, #E85D04 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, #E85D04 40px, #E85D04 41px)" }}
        />
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10"
          style={{ background: "radial-gradient(ellipse at top right, #E85D04, transparent 70%)" }}
        />
        <div className="container relative z-10 pt-32">
          <div className="flex items-center gap-3 mb-4">
            <Link href="/services" className="text-[#E85D04] text-sm font-medium tracking-widest uppercase hover:text-white transition-colors">Services</Link>
            <span className="text-zinc-600">/</span>
            <span className="text-zinc-400 text-sm tracking-widest uppercase">Vinyl Wraps</span>
          </div>
          <div className="max-w-4xl">
            <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">04 — Transformation</p>
            <h1 className="font-['Bebas_Neue',sans-serif] text-6xl md:text-8xl lg:text-9xl leading-none text-white mb-6">
              VINYL<br />
              <span className="text-[#E85D04]">WRAPS</span>
            </h1>
            <p className="text-zinc-300 text-lg md:text-xl max-w-2xl leading-relaxed mb-6">
              Transform your vehicle's appearance without touching the factory paint. Full color changes, accent wraps, and custom designs — installed with precision.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="tel:+17037754383"
                className="bg-[#E85D04] hover:bg-[#d14e00] text-white font-bold tracking-widest uppercase px-8 py-4 transition-all duration-200 hover:scale-105 inline-flex items-center gap-2"
              >
                FREE CONSULTATION
              </a>
              <Link
                href="/get-a-quote?service=wrap"
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
            <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">Why Wrap</p>
            <h2 className="font-['Bebas_Neue',sans-serif] text-5xl md:text-6xl text-white">
              YOUR VISION. YOUR VEHICLE.
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

      {/* Wrap Package Cards */}
      <section className="py-24 bg-[#0A0A0A]">
        <div className="container">
          <div className="mb-16">
            <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">Wrap Packages</p>
            <h2 className="font-['Bebas_Neue',sans-serif] text-5xl md:text-6xl text-white">
              CHOOSE YOUR COVERAGE
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Partial Wrap",
                desc: "Accent Panels & Highlights",
                features: ["Hood, roof, or trunk", "Mirror caps & pillars", "Custom accent sections", "3M or Avery Dennison film", "Protects factory paint underneath"],
                startingAt: "$850",
                image: "/images/wrap-partial_134cf5c4.webp",
                imageAlt: "Tesla with partial wrap showing roof and accent panels covered in orange vinyl",
                featured: false,
              },
              {
                name: "Full Color Change",
                desc: "Complete Vehicle Transformation",
                features: ["Full exterior body panels", "Bumpers, mirrors, handles", "Any color or finish", "3M or Avery Dennison film", "Reversible — factory paint preserved", "3–5 year warranty"],
                startingAt: "$3,000",
                image: "/images/wrap-full_a65f82e0.webp",
                imageAlt: "Tesla fully wrapped in orange vinyl showing complete color change coverage",
                featured: true,
              },
              {
                name: "Custom Design",
                desc: "Graphics, Stripes & Liveries",
                features: ["Custom graphic design", "Racing stripes & liveries", "Brand & business wraps", "Printed or cut vinyl", "Unique one-of-a-kind finish", "Design consultation included"],
                startingAt: "$4,000",
                image: "/images/wrap-custom_967fa623.webp",
                imageAlt: "Tesla with custom graphic wrap design showing racing stripes and livery",
                featured: false,
              },
            ].map((pkg, i) => (
              <div
                key={i}
                className={`relative border flex flex-col overflow-hidden ${
                  pkg.featured ? "border-[#E85D04] bg-[#1a0a00]" : "border-zinc-800 bg-[#0D0D0D] hover:border-zinc-600"
                } transition-colors`}
              >
                {pkg.featured && (
                  <div className="absolute top-3 left-4 z-10 bg-[#E85D04] text-white text-xs font-bold tracking-widest uppercase px-3 py-1">
                    MOST POPULAR
                  </div>
                )}
                <img loading="lazy" decoding="async" src={pkg.image} alt={pkg.imageAlt} className="w-full h-44 object-cover" />
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-['Bebas_Neue',sans-serif] text-2xl text-white mb-1">{pkg.name}</h3>
                  <p className="text-zinc-500 text-xs uppercase tracking-widest mb-4">{pkg.desc}</p>
                  <ul className="space-y-1.5 flex-1 mb-5">
                    {pkg.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-zinc-300">
                        <CheckCircle className="w-4 h-4 text-[#E85D04] mt-0.5 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/get-a-quote?service=wrap"
                    className={`w-full py-3 font-bold text-sm tracking-widest uppercase transition-all block text-center ${
                      pkg.featured ? "bg-[#E85D04] hover:bg-[#d14e00] text-white" : "border border-zinc-700 hover:border-[#E85D04] text-white hover:text-[#E85D04]"
                    }`}
                  >
                    GET A QUOTE
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Film Styles */}
      <section className="py-24 bg-[#0A0A0A]">
        <div className="container">
          <div className="mb-16">
            <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">Finishes Available</p>
            <h2 className="font-['Bebas_Neue',sans-serif] text-5xl md:text-6xl text-white">
              CHOOSE YOUR FINISH
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {styles.map((style, i) => (
              <div key={i} className="border border-zinc-800 bg-[#0D0D0D] p-6 hover:border-[#E85D04] transition-colors group">
                <h3 className="font-['Bebas_Neue',sans-serif] text-2xl text-white mb-2 group-hover:text-[#E85D04] transition-colors">{style.name}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{style.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-zinc-500 text-sm mt-6">Hundreds of colors and finishes available. Bring your vision and we'll find the perfect film.</p>
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
              WRAP FAQ
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
            READY TO TRANSFORM YOUR RIDE?
          </h2>
          <p className="text-orange-100 text-lg mb-10 max-w-xl mx-auto">
            Book a free consultation and bring your vision. We'll walk you through film samples and design options for your specific vehicle.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:+17037754383"
              className="bg-white text-[#E85D04] hover:bg-zinc-100 font-bold tracking-widest uppercase px-10 py-4 transition-all duration-200 hover:scale-105 flex items-center gap-2"
            >
              FREE CONSULTATION <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href="/gallery"
              className="border-2 border-white text-white hover:bg-white hover:text-[#E85D04] font-bold tracking-widest uppercase px-10 py-4 transition-all duration-200"
            >
              VIEW OUR WORK
            </Link>
          </div>
        </div>
      </section>

      <LocalBanner localHref="/vinyl-wraps-chantilly-va" serviceName="Vinyl Wraps" />
      <ServiceCityLinks service="wrap" />
      <Footer />
    </div>
  );
}
