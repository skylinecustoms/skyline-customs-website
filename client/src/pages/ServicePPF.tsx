/**
 * SKYLINE CUSTOMS — Paint Protection Film Service Page
 * Design: Industrial Brutalism | Dark matte black + burnt orange (#E85D04)
 * Typography: Bebas Neue (headings) + DM Sans (body)
 * URL: /services/ppf
 */

import { useBooking } from "@/contexts/BookingContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceCityLinks from "@/components/ServiceCityLinks";
import CompareLinks from "@/components/CompareLinks";
import VehicleLinks from "@/components/VehicleLinks";
import LocalBanner from "@/components/LocalBanner";
import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useState, useEffect } from "react";
import { ChevronDown, Shield, Zap, Eye, Droplets, Sun, Wrench, CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "wouter";

const ppfImages: Record<string, string> = {
  "partial": "/images/NguTnAOoECcVqDUI.webp",
  "full-front": "/images/CfKThxbsmkQPistt.webp",
  "full-front-plus": "/images/CvygVrceuSyvFqPY.webp",
  "full-vehicle": "/images/lUHfbPByiOnODTUs.webp",
};

const benefits = [
  {
    icon: Shield,
    title: "Rock Chip & Impact Defense",
    desc: "Absorbs the force of road debris, gravel, and stone chips that would otherwise chip and crack your paint permanently.",
  },
  {
    icon: Zap,
    title: "Self-Healing Technology",
    desc: "Minor swirl marks and light scratches disappear on their own with heat exposure — the film literally heals itself.",
  },
  {
    icon: Eye,
    title: "Optically Clear Finish",
    desc: "Our precision-cut PPF is virtually invisible, preserving your vehicle's original color and gloss without altering its appearance.",
  },
  {
    icon: Droplets,
    title: "Hydrophobic Surface",
    desc: "Water, mud, and road grime bead off the surface, making your car easier to clean and reducing wash-induced scratches.",
  },
  {
    icon: Sun,
    title: "UV Ray Blocking",
    desc: "Blocks harmful ultraviolet radiation that causes paint oxidation, fading, and yellowing over time.",
  },
  {
    icon: Wrench,
    title: "Lifetime Craftsmanship Warranty",
    desc: "Every PPF installation at Skyline Customs is backed by our Lifetime Craftsmanship Warranty — no shortcuts, no exceptions.",
  },
];

const process = [
  {
    num: "01",
    title: "Free Consultation",
    desc: "We assess your vehicle, discuss your protection goals, and recommend the right PPF package — partial, full front, or full vehicle coverage.",
  },
  {
    num: "02",
    title: "Paint Decontamination",
    desc: "A full clay bar treatment and iron fallout removal ensures the surface is perfectly clean before any film is applied. No shortcuts here.",
  },
  {
    num: "03",
    title: "Paint Correction (If Needed)",
    desc: "Any existing swirl marks, scratches, or oxidation are corrected before installation. We never trap imperfections under film.",
  },
  {
    num: "04",
    title: "Computer-Cut Precision",
    desc: "Patterns are cut using industry-leading software for your exact vehicle make and model — minimizing blade use and maximizing coverage.",
  },
  {
    num: "05",
    title: "Expert Installation",
    desc: "Our certified technicians apply the film with precision, working panel by panel to eliminate bubbles, lifting edges, and misalignment.",
  },
  {
    num: "06",
    title: "Final Inspection & Delivery",
    desc: "Every inch is inspected under controlled lighting before your vehicle is returned. You drive away protected — and it shows.",
  },
];

const faqs = [
  {
    q: "How long does PPF last?",
    a: "High-quality PPF installed by certified professionals typically lasts 10–12+ years with proper care. Our film comes with manufacturer warranties up to 12 years.",
  },
  {
    q: "Will PPF change how my car looks?",
    a: "No. Our optically clear PPF is virtually invisible. The only difference you'll notice is a deeper, protected gloss. We also offer Stealth/Matte PPF if you want a satin finish.",
  },
  {
    q: "Can I wash my car normally after PPF?",
    a: "Yes — after a 7-day cure period, you can wash your car normally. We recommend hand washing or touchless washes for best results and longest film life.",
  },
  {
    q: "Does PPF damage my paint when removed?",
    a: "No. When removed by a professional, PPF leaves your paint completely intact. We use computer-cut patterns wherever possible to avoid hand cutting on the vehicle.",
  },
  {
    q: "Should I get PPF or ceramic coating — or both?",
    a: "Both. PPF provides physical protection from chips and impacts; ceramic coating provides chemical resistance, hydrophobic properties, and enhanced gloss. The ideal setup is PPF first, then ceramic coating on top.",
  },
  {
    q: "What areas do you cover with PPF?",
    a: "We offer partial coverage (high-impact zones like the hood, bumper, mirrors), full front end, full front + rocker panels, and full vehicle coverage. We'll recommend the right package for your driving habits.",
  },
];

const packages = [
  {
    name: "Partial",
    desc: "High-impact zones only",
    diagram: "partial" as const,
    coverage: ["Front bumper", "Hood leading edge (12\")", "Side mirrors"],
    startingAt: "$1,800",
  },
  {
    name: "Full Front",
    desc: "Maximum front-end coverage",
    diagram: "full-front" as const,
    coverage: ["Full hood", "Full front bumper", "Full fenders", "Side mirrors", "Headlights"],
    featured: true,
    startingAt: "$2,400",
  },
  {
    name: "Full Front Extended",
    desc: "Front end + high-wear areas",
    diagram: "full-front-plus" as const,
    coverage: ["Everything in Full Front", "Rocker Panels", "Door Strips", "Door Cups", "Door Edges", "A-Pillars (Halfway)"],
    startingAt: "$3,200",
  },
  {
    name: "Full Vehicle",
    desc: "Complete 360° protection",
    diagram: "full-vehicle" as const,
    coverage: ["Every painted panel", "Full roof", "Full doors", "Trunk & rear bumper", "All pillars"],
    startingAt: "$4,500",
  },
];

export default function ServicePPF() {
  const { openBooking } = useBooking();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Facebook Pixel: ViewContent event when visitor lands on PPF service page
  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "ViewContent", {
        content_name: "Paint Protection Film",
        content_category: "Auto Protection",
        content_ids: ["ppf"],
        content_type: "service",
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-['DM_Sans',sans-serif]">
      <SEO
        title="Paint Protection Film (PPF) | Chantilly VA"
        description="Professional PPF installation in Chantilly, VA. Partial, full front, and full vehicle coverage with a Lifetime Craftsmanship Warranty. Free consultation."
        canonical="https://www.skylinecustomshop.com/services/ppf"
        jsonLd={[
          {
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Paint Protection Film (PPF)",
          "provider": {
            "@type": "AutoBodyShop",
            "name": "Skyline Custom Shop",
            "url": "https://www.skylinecustomshop.com",
            "telephone": "+17037754383",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "4215 Walney Rd Suite 1A & B",
              "addressLocality": "Chantilly",
              "addressRegion": "VA",
              "postalCode": "20151",
              "addressCountry": "US"
            }
          },
          "areaServed": "Chantilly, VA and Northern Virginia",
          "description": "Professional Paint Protection Film installation protecting your vehicle's paint from rock chips, scratches, and road debris. Partial, full front, and full vehicle coverage available.",
          "review": [
            {
              "@type": "Review",
              "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
              "author": { "@type": "Person", "name": "Marcus T." },
              "reviewBody": "Got full front PPF on my BMW M4. The installation was flawless — you can't even tell it's there. Skyline's attention to detail is unmatched in Northern Virginia."
            },
            {
              "@type": "Review",
              "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
              "author": { "@type": "Person", "name": "Jennifer L." },
              "reviewBody": "Had PPF installed on my new Tesla Model 3. The team was professional, the shop was immaculate, and the result was perfect. Worth every penny for peace of mind."
            },
            {
              "@type": "Review",
              "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
              "author": { "@type": "Person", "name": "David K." },
              "reviewBody": "Best PPF shop in the DMV area. They did a full vehicle wrap on my Porsche 911 and it looks incredible. Highly recommend Skyline to anyone serious about protecting their investment."
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
              { "@type": "Question", "name": "How long does PPF last?", "acceptedAnswer": { "@type": "Answer", "text": "High-quality PPF installed by certified professionals typically lasts 7\u201310+ years with proper care. Our film comes with manufacturer warranties up to 12 years." } },
              { "@type": "Question", "name": "Will PPF change how my car looks?", "acceptedAnswer": { "@type": "Answer", "text": "No. Our optically clear PPF is virtually invisible. The only difference you'll notice is a deeper, protected gloss. We also offer Stealth/Matte PPF if you want a satin finish." } },
              { "@type": "Question", "name": "Can I wash my car normally after PPF?", "acceptedAnswer": { "@type": "Answer", "text": "Yes \u2014 after a 7-day cure period, you can wash your car normally. We recommend hand washing or touchless washes for best results and longest film life." } },
              { "@type": "Question", "name": "Does PPF damage my paint when removed?", "acceptedAnswer": { "@type": "Answer", "text": "No. When removed by a professional, PPF leaves your paint completely intact. We use computer-cut patterns wherever possible to avoid hand cutting on the vehicle." } },
              { "@type": "Question", "name": "Should I get PPF or ceramic coating \u2014 or both?", "acceptedAnswer": { "@type": "Answer", "text": "Both. PPF provides physical protection from chips and impacts; ceramic coating provides chemical resistance, hydrophobic properties, and enhanced gloss. The ideal setup is PPF first, then ceramic coating on top." } },
              { "@type": "Question", "name": "What areas do you cover with PPF?", "acceptedAnswer": { "@type": "Answer", "text": "We offer partial coverage (high-impact zones like the hood, bumper, mirrors), full front end, full front + rocker panels, and full vehicle coverage. We'll recommend the right package for your driving habits." } }
            ]
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.skylinecustomshop.com/" },
              { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://www.skylinecustomshop.com/services" },
              { "@type": "ListItem", "position": 3, "name": "Paint Protection Film", "item": "https://www.skylinecustomshop.com/services/ppf" }
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
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: "Paint Protection Film" }]} />
          <div className="flex items-center gap-3 mb-4">
            <Link href="/services" className="text-[#E85D04] text-sm font-medium tracking-widest uppercase hover:text-white transition-colors">Services</Link>
            <span className="text-zinc-600">/</span>
            <span className="text-zinc-400 text-sm tracking-widest uppercase">Paint Protection Film</span>
          </div>
          <div className="max-w-4xl">
            <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">01 — Protection</p>
            <h1 className="font-['Bebas_Neue',sans-serif] text-6xl md:text-8xl lg:text-9xl leading-none text-white mb-6">
              PAINT<br />
              <span className="text-[#E85D04]">PROTECTION</span><br />
              FILM
            </h1>
            <p className="text-zinc-300 text-lg md:text-xl max-w-2xl leading-relaxed mb-6">
              The most advanced physical barrier between your paint and the road. Professionally installed, precision-cut, and backed by our Lifetime Craftsmanship Warranty.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="tel:+17037754383"
                className="bg-[#E85D04] hover:bg-[#d14e00] text-white font-bold tracking-widest uppercase px-8 py-4 transition-all duration-200 hover:scale-105 inline-flex items-center gap-2"
              >
                FREE CONSULTATION
              </a>
              <Link
                href="/get-a-quote?service=ppf"
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
            <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">Why PPF</p>
            <h2 className="font-['Bebas_Neue',sans-serif] text-5xl md:text-6xl text-white">
              BUILT TO TAKE THE HIT
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
            <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">Coverage Options</p>
            <h2 className="font-['Bebas_Neue',sans-serif] text-5xl md:text-6xl text-white">
              CHOOSE YOUR PROTECTION
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {packages.map((pkg, i) => (
              <div
                key={i}
                className={`relative border flex flex-col ${pkg.featured ? "border-[#E85D04] bg-[#1a0a00]" : "border-zinc-800 bg-[#0D0D0D] hover:border-zinc-600"} transition-colors`}
              >
                {pkg.featured && (
                  <div className="absolute -top-3 left-6 bg-[#E85D04] text-white text-xs font-bold tracking-widest uppercase px-3 py-1 z-10">
                    MOST POPULAR
                  </div>
                )}
                {/* Tesla PPF image */}
                <div className="w-full overflow-hidden">
                  <img loading="lazy" decoding="async"
                    src={ppfImages[pkg.diagram]}
                    alt={`Tesla Model Y with ${pkg.name} PPF coverage`}
                    className="w-full h-48 object-cover object-center"
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-['Bebas_Neue',sans-serif] text-2xl text-white mb-1">{pkg.name}</h3>
                  <p className="text-zinc-500 text-xs uppercase tracking-widest mb-4">{pkg.desc}</p>
                  <ul className="space-y-2 flex-1 mb-5">
                    {pkg.coverage.map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-zinc-300">
                        <CheckCircle className="w-4 h-4 text-[#E85D04] mt-0.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/get-a-quote?service=ppf"
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

      {/* STEK DYNOshield Film Section */}
      <section className="py-24 bg-[#111]">
        <div className="container max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Text */}
            <div>
              <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">The Film We Use</p>
              <h2 className="font-['Bebas_Neue',sans-serif] text-5xl md:text-6xl text-white leading-none mb-6">
                STEK<br />
                <span className="text-[#E85D04]">DYNOshield</span>
              </h2>
              <p className="text-zinc-400 text-lg leading-relaxed mb-6">
                Not all PPF is the same. At Skyline Customs, we exclusively install{" "}
                <strong className="text-white">STEK DYNOshield</strong> — a premium thermoplastic polyurethane film
                engineered for long-term protection without compromising your vehicle's appearance.
              </p>
              <p className="text-zinc-400 leading-relaxed mb-8">
                STEK DYNOshield is backed by a{" "}
                <strong className="text-white">12-year manufacturer warranty</strong> against yellowing, cracking,
                peeling, and delamination. It's the same film trusted by enthusiasts, collectors, and daily drivers
                who refuse to compromise on quality.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { title: "Self-Healing Technology", desc: "Minor swirl marks and light scratches vanish with heat exposure — the film repairs itself." },
                  { title: "Hydrophobic Top Coat", desc: "Water, dirt, and road grime bead off the surface, making maintenance effortless." },
                  { title: "Optical Clarity", desc: "Crystal-clear finish that's virtually invisible on your paint — no orange peel, no haze." },
                  { title: "12-Year Warranty", desc: "Manufacturer-backed protection against yellowing, cracking, peeling, and delamination." },
                ].map((feat, i) => (
                  <div key={i} className="border border-zinc-800 bg-[#0D0D0D] p-4">
                    <p className="text-[#E85D04] text-xs font-bold tracking-widest uppercase mb-1">{feat.title}</p>
                    <p className="text-zinc-400 text-sm leading-relaxed">{feat.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            {/* Visual accent */}
            <div className="relative">
              <div className="border border-zinc-800 bg-[#0D0D0D] p-10 flex flex-col items-center justify-center text-center min-h-[400px]">
                <div className="w-20 h-1 bg-[#E85D04] mb-8" />
                <p className="font-['Bebas_Neue',sans-serif] text-8xl text-white leading-none mb-2">12</p>
                <p className="font-['Bebas_Neue',sans-serif] text-3xl text-[#E85D04] tracking-widest mb-6">YEAR WARRANTY</p>
                <p className="text-zinc-500 text-sm max-w-xs leading-relaxed">
                  Manufacturer-backed coverage against yellowing, cracking, peeling, and delamination — included with every STEK DYNOshield installation.
                </p>
                <div className="w-20 h-1 bg-[#E85D04] mt-8" />
                <p className="text-zinc-600 text-xs tracking-widest uppercase mt-6">STEK DYNOshield Film</p>
              </div>
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
              PPF FAQ
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
            READY TO PROTECT YOUR INVESTMENT?
          </h2>
          <p className="text-orange-100 text-lg mb-10 max-w-xl mx-auto">
            Book a free consultation and we'll recommend the right PPF package for your vehicle and budget.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:+17037754383"
              className="bg-white text-[#E85D04] hover:bg-zinc-100 font-bold tracking-widest uppercase px-10 py-4 transition-all duration-200 hover:scale-105 flex items-center gap-2"
            >
              FREE CONSULTATION <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href="/get-a-quote?service=ppf"
              className="border-2 border-white text-white hover:bg-white hover:text-[#E85D04] font-bold tracking-widest uppercase px-10 py-4 transition-all duration-200"
            >
              ADD CERAMIC COATING
            </Link>
          </div>
        </div>
      </section>

      <LocalBanner localHref="/ppf-chantilly-va" serviceName="PPF" />
      {/* Tesla owners */}
      <section className="py-12 bg-[#0A0A0A] border-t border-zinc-800">
        <div className="container flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <p className="text-[#E85D04] text-xs font-bold tracking-[0.3em] uppercase mb-2">Tesla Owners</p>
            <h2 className="font-['Bebas_Neue',sans-serif] text-3xl md:text-4xl text-white">MODEL 3, Y, S, X & CYBERTRUCK COVERAGE</h2>
            <p className="text-zinc-400 mt-2 max-w-xl">Model-specific diagrams, pricing, and answers on Autopilot sensors and Tesla's own PPF kit.</p>
          </div>
          <Link href="/tesla-ppf" className="bg-[#E85D04] hover:bg-[#d14e00] text-white font-bold tracking-widest uppercase px-8 py-4 inline-flex items-center gap-2 transition-colors self-start md:self-auto">
            TESLA PPF PAGE <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <VehicleLinks />
      <CompareLinks />
      <ServiceCityLinks service="ppf" />
      <Footer />
    </div>
  );
}
