/**
 * SKYLINE CUSTOMS — Window Tinting Service Page
 * Design: Industrial Brutalism | Dark matte black + burnt orange (#E85D04)
 * Typography: Bebas Neue (headings) + DM Sans (body)
 * URL: /services/window-tinting
 */

import { useBooking } from "@/contexts/BookingContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceCityLinks from "@/components/ServiceCityLinks";
import LocalBanner from "@/components/LocalBanner";
import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useState, useEffect } from "react";
import { ChevronDown, Thermometer, Eye, Shield, Sun, Lock, Zap, CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "wouter";

const benefits = [
  {
    icon: Thermometer,
    title: "Heat Rejection",
    desc: "Premium ceramic tint blocks up to 99% of infrared heat, keeping your interior dramatically cooler and reducing AC load.",
  },
  {
    icon: Sun,
    title: "UV Protection",
    desc: "Blocks 99% of harmful UV rays that cause skin damage, dashboard cracking, and interior fading over time.",
  },
  {
    icon: Eye,
    title: "Glare Reduction",
    desc: "Reduces blinding glare from the sun and headlights for safer, more comfortable driving at all hours.",
  },
  {
    icon: Shield,
    title: "Shatter Resistance",
    desc: "Window film holds glass together on impact, reducing injury risk from accidents and break-in attempts.",
  },
  {
    icon: Lock,
    title: "Privacy & Security",
    desc: "Darker tint deters smash-and-grab theft by concealing valuables and making it harder to see inside your vehicle.",
  },
  {
    icon: Zap,
    title: "Signal-Safe Ceramic Film",
    desc: "Our ceramic tint is metal-free, so it never interferes with GPS, phone signals, or toll transponders.",
  },
];

const process = [
  {
    num: "01",
    title: "Consultation & VLT Selection",
    desc: "We discuss your tint goals, review Virginia's legal VLT limits, and help you choose the right shade and film type for your vehicle.",
  },
  {
    num: "02",
    title: "Window Cleaning & Prep",
    desc: "All glass surfaces are thoroughly cleaned and decontaminated to ensure a dust-free, bubble-free installation.",
  },
  {
    num: "03",
    title: "Precision Film Cutting",
    desc: "Film is computer-cut to your exact window dimensions — no hand trimming on glass that can leave gaps or uneven edges.",
  },
  {
    num: "04",
    title: "Expert Application",
    desc: "Film is applied using professional slip solution and squeegee technique to eliminate bubbles, creases, and lifting edges.",
  },
  {
    num: "05",
    title: "Curing Period",
    desc: "Film requires 3–5 days to fully cure. Minor haze or small water pockets during this period are completely normal and will clear.",
  },
  {
    num: "06",
    title: "Final Inspection",
    desc: "Every window is inspected for clarity, edge adhesion, and uniform coverage before your vehicle is returned.",
  },
];

const faqs = [
  {
    q: "What are Virginia's window tint laws?",
    a: "In Virginia, front side windows must allow more than 50% light transmission (VLT). Rear side windows and the rear window can be any darkness. We ensure all installations are compliant with state law.",
  },
  {
    q: "What is ceramic tint vs. regular tint?",
    a: "Ceramic tint uses nano-ceramic particles instead of metal or dye. It rejects significantly more heat and UV rays, doesn't interfere with electronics, and doesn't fade or turn purple over time. It's the premium choice.",
  },
  {
    q: "How long does window tint last?",
    a: "Quality ceramic tint professionally installed lasts 10+ years without fading, bubbling, or peeling. Cheaper dyed films can degrade in 3–5 years.",
  },
  {
    q: "Can I roll my windows down after tinting?",
    a: "We recommend keeping windows up for at least 3 days after installation to allow the film to cure and adhere fully to the glass.",
  },
  {
    q: "Will tint affect my visibility at night?",
    a: "Darker tints can reduce nighttime visibility. We'll guide you toward the right VLT percentage that balances privacy, heat rejection, and safe nighttime driving for your specific vehicle.",
  },
  {
    q: "Do you tint the windshield?",
    a: "Yes — we offer legal windshield tint strips and ceramic windshield film that rejects heat and UV without darkening your forward view beyond legal limits.",
  },
];

const shades = [
  { vlt: "5%", label: "Limo", irr: "80%", note: "Maximum privacy" },
  { vlt: "15%", label: "Dark", irr: "80%", note: "High privacy" },
  { vlt: "20%", label: "Medium", irr: "80%", note: "Popular choice" },
  { vlt: "35%", label: "Medium Light", irr: "83%", note: "Highest IRR" },
  { vlt: "40%", label: "Light", irr: "83%", note: "Balanced clarity" },
  { vlt: "50%", label: "Very Light", irr: "83%", note: "Subtle tint" },
  { vlt: "70%", label: "Clear", irr: "76%", note: "Windshield legal" },
];

export default function ServiceTint() {
  const { openBooking } = useBooking();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Facebook Pixel: ViewContent event when visitor lands on Window Tinting service page
  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "ViewContent", {
        content_name: "Window Tinting",
        content_category: "Auto Protection",
        content_ids: ["window-tinting"],
        content_type: "service",
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-['DM_Sans',sans-serif]">
      <SEO
        title="Window Tinting | Chantilly VA"
        description="Premium ceramic window tinting in Chantilly, VA. Heat-rejecting, UV-blocking, Virginia-legal, signal-safe ceramic film with a lifetime warranty."
        canonical="https://www.skylinecustomshop.com/services/window-tinting"
        jsonLd={[
          {
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Window Tinting",
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
          "description": "Premium ceramic window tinting that blocks heat and UV rays while remaining Virginia-legal and signal-safe. Lifetime warranty included.",
          "review": [
            {
              "@type": "Review",
              "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
              "author": { "@type": "Person", "name": "Priya S." },
              "reviewBody": "Got ceramic tint on all windows of my Lexus RX. The heat reduction is incredible — my car stays so much cooler in the Virginia summer. Clean install, no bubbles, perfect edges."
            },
            {
              "@type": "Review",
              "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
              "author": { "@type": "Person", "name": "James R." },
              "reviewBody": "Skyline did a great job on my truck. The tint looks factory and the team was knowledgeable about Virginia tint laws. In and out in a few hours. Would definitely recommend."
            },
            {
              "@type": "Review",
              "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
              "author": { "@type": "Person", "name": "Aisha B." },
              "reviewBody": "Best tint shop in Chantilly. My Kia Telluride looks amazing and the ceramic film actually makes a noticeable difference in heat. The lifetime warranty gives me total peace of mind."
            }
          ],
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "5",
            "reviewCount": "96",
            "bestRating": "5",
            "worstRating": "1"
          }
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              { "@type": "Question", "name": "What are Virginia's window tint laws?", "acceptedAnswer": { "@type": "Answer", "text": "In Virginia, front side windows must allow more than 50% light transmission (VLT). Rear side windows and the rear window can be any darkness. We ensure all installations are compliant with state law." } },
              { "@type": "Question", "name": "What is ceramic tint vs. regular tint?", "acceptedAnswer": { "@type": "Answer", "text": "Ceramic tint uses nano-ceramic particles instead of metal or dye. It rejects significantly more heat and UV rays, doesn't interfere with electronics, and doesn't fade or turn purple over time. It's the premium choice." } },
              { "@type": "Question", "name": "How long does window tint last?", "acceptedAnswer": { "@type": "Answer", "text": "Quality ceramic tint professionally installed lasts 10+ years without fading, bubbling, or peeling. Cheaper dyed films can degrade in 3\u20135 years." } },
              { "@type": "Question", "name": "Can I roll my windows down after tinting?", "acceptedAnswer": { "@type": "Answer", "text": "We recommend keeping windows up for at least 3 days after installation to allow the film to cure and adhere fully to the glass." } },
              { "@type": "Question", "name": "Will tint affect my visibility at night?", "acceptedAnswer": { "@type": "Answer", "text": "Darker tints can reduce nighttime visibility. We'll guide you toward the right VLT percentage that balances privacy, heat rejection, and safe nighttime driving for your specific vehicle." } },
              { "@type": "Question", "name": "Do you tint the windshield?", "acceptedAnswer": { "@type": "Answer", "text": "Yes \u2014 we offer legal windshield tint strips and ceramic windshield film that rejects heat and UV without darkening your forward view beyond legal limits." } }
            ]
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.skylinecustomshop.com/" },
              { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://www.skylinecustomshop.com/services" },
              { "@type": "ListItem", "position": 3, "name": "Window Tinting", "item": "https://www.skylinecustomshop.com/services/window-tinting" }
            ]
          }
        ]}
      />
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-end pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0A] via-[#0d0d0d] to-[#0a0d0a]" />
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 40px, #E85D04 40px, #E85D04 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, #E85D04 40px, #E85D04 41px)" }}
        />
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10"
          style={{ background: "radial-gradient(ellipse at top right, #E85D04, transparent 70%)" }}
        />
        <div className="container relative z-10 pt-32">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: "Window Tinting" }]} />
          <div className="flex items-center gap-3 mb-4">
            <Link href="/services" className="text-[#E85D04] text-sm font-medium tracking-widest uppercase hover:text-white transition-colors">Services</Link>
            <span className="text-zinc-600">/</span>
            <span className="text-zinc-400 text-sm tracking-widest uppercase">Window Tinting</span>
          </div>
          <div className="max-w-4xl">
            <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">03 — Tinting</p>
            <h1 className="font-['Bebas_Neue',sans-serif] text-6xl md:text-8xl lg:text-9xl leading-none text-white mb-6">
              WINDOW<br />
              <span className="text-[#E85D04]">TINTING</span>
            </h1>
            <p className="text-zinc-300 text-lg md:text-xl max-w-2xl leading-relaxed mb-6">
              Premium ceramic window film engineered for heat rejection, UV protection, and interior defense. Not just shade — performance.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="tel:+17037754383"
                className="bg-[#E85D04] hover:bg-[#d14e00] text-white font-bold tracking-widest uppercase px-8 py-4 transition-all duration-200 hover:scale-105 inline-flex items-center gap-2"
              >
                FREE CONSULTATION
              </a>
              <Link
                href="/get-a-quote?service=tint"
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
            <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">Why Ceramic Tint</p>
            <h2 className="font-['Bebas_Neue',sans-serif] text-5xl md:text-6xl text-white">
              MORE THAN JUST SHADE
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
            <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">Film Options</p>
            <h2 className="font-['Bebas_Neue',sans-serif] text-5xl md:text-6xl text-white">
              CHOOSE YOUR FILM
            </h2>
          </div>
          {/* Package Cards with Coverage Images */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              {
                name: "Standard Tint",
                desc: "4 Side & Rear Windows",
                features: ["All 4 side windows", "Rear window", "Geoshield Pro Nano Ceramic", "99% UV rejection", "80–83% IR rejection"],
                startingAt: "$350",
                image: "/images/tint-basic_dbb25149.webp",
                imageAlt: "Tesla with side and rear windows highlighted showing standard tint coverage",
                featured: false,
              },
              {
                name: "Full Vehicle Tint",
                desc: "All Windows Except Windshield",
                features: ["All 4 side windows", "Rear window", "Rear quarter windows", "Sunroof (if applicable)", "Geoshield Pro Nano Ceramic", "Lifetime warranty"],
                startingAt: "$425",
                image: "/images/tint-full_9d855a15.webp",
                imageAlt: "Tesla with all windows highlighted showing full vehicle tint coverage",
                featured: true,
              },
              {
                name: "Full + Windshield",
                desc: "Complete Glass Coverage",
                features: ["All 4 side windows", "Rear window", "All quarter windows", "Windshield ceramic film", "Maximum heat & UV rejection", "Lifetime warranty"],
                startingAt: "$575",
                image: "/images/tint-full-windshield_f5c08a9c.webp",
                imageAlt: "Tesla with all windows including windshield highlighted showing full tint with windshield coverage",
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
                    href="/get-a-quote?service=tint"
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

          {/* Film Feature Card */}
          <div className="border border-[#E85D04] bg-[#1a0a00] p-8 mb-10 max-w-3xl">
            <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
              <div>
                <p className="text-[#E85D04] text-xs font-bold tracking-widest uppercase mb-1">Exclusive Film</p>
                <h3 className="font-['Bebas_Neue',sans-serif] text-4xl text-white">Geoshield Pro Nano Ceramic</h3>
                <p className="text-zinc-400 text-sm mt-1">2 mil · Dyed Ceramic · Non-Metalized · Signal-Safe</p>
              </div>
              <div className="flex gap-6">
                <div className="text-center">
                  <p className="font-['Bebas_Neue',sans-serif] text-4xl text-[#E85D04]">80–83%</p>
                  <p className="text-zinc-500 text-xs uppercase tracking-widest">IR Rejection</p>
                </div>
                <div className="text-center">
                  <p className="font-['Bebas_Neue',sans-serif] text-4xl text-[#E85D04]">99%</p>
                  <p className="text-zinc-500 text-xs uppercase tracking-widest">UV Rejection</p>
                </div>
              </div>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
              {["All side & rear windows", "Windshield (legal strip or full)", "Deep warm black finish", "No GPS / signal interference", "Color-stable — never fades or purples", "Lifetime warranty"].map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-zinc-300">
                  <CheckCircle className="w-4 h-4 text-[#E85D04] mt-0.5 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <a
              href="/get-a-quote?service=tint"
              className="bg-[#E85D04] hover:bg-[#d14e00] text-white font-bold text-sm tracking-widest uppercase px-8 py-3 transition-all inline-block"
            >
              GET A QUOTE
            </a>
          </div>

          {/* Shade Selector */}
          <div>
            <p className="text-zinc-500 text-xs uppercase tracking-widest mb-4">Available Shades — Virginia front windows must be 50%+ VLT</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
              {shades.map((s, i) => (
                <div key={i} className="border border-zinc-800 bg-[#0D0D0D] p-4 text-center hover:border-zinc-600 transition-colors">
                  <p className="font-['Bebas_Neue',sans-serif] text-2xl text-white">{s.vlt}</p>
                  <p className="text-[#E85D04] text-xs font-bold uppercase tracking-widest">{s.label}</p>
                  <p className="text-zinc-500 text-xs mt-1">{s.irr} IRR</p>
                  <p className="text-zinc-600 text-xs">{s.note}</p>
                </div>
              ))}
            </div>
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
              TINT FAQ
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
            STAY COOL. DRIVE PROTECTED.
          </h2>
          <p className="text-orange-100 text-lg mb-10 max-w-xl mx-auto">
            Book a free consultation and we'll help you choose the right tint level for your vehicle, lifestyle, and Virginia's legal requirements.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:+17037754383"
              className="bg-white text-[#E85D04] hover:bg-zinc-100 font-bold tracking-widest uppercase px-10 py-4 transition-all duration-200 hover:scale-105 flex items-center gap-2"
            >
              FREE CONSULTATION <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      <LocalBanner localHref="/window-tinting-chantilly-va" serviceName="Window Tinting" />
      <ServiceCityLinks service="tint" />
      <Footer />
    </div>
  );
}
