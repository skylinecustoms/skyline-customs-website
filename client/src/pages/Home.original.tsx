import React, { useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Star, ChevronDown, Phone, ClipboardList, Wrench, Shield, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useBooking } from "@/contexts/BookingContext";
import type { BookingService } from "@/components/BookingModal";
import SEO from "@/components/SEO";
import Testimonials from "@/components/Testimonials";

const HERO_IMAGE = "/images/hero-bg.webp";

const PPF_IMAGE = "/images/ppf_1_c7c64665.webp";

const CERAMIC_IMAGE = "/images/ceramic_1_53c9aefc.webp";

const TINT_IMAGE = "/images/tint_bmw_m2_847caa83.webp";

const WRAP_IMAGE = "/images/chrome_1_6ee68f4c.webp";

const services: { number: string; title: string; subtitle: string; description: string; image: string; imageAlt: string; href: string; bookingService: BookingService }[] = [
  {
    number: "01",
    title: "Paint Protection Film",
    subtitle: "Self-Healing PPF",
    description: "An invisible barrier against rock chips, scratches, and road debris. Self-healing film absorbs impact and preserves your factory finish for years.",
    image: PPF_IMAGE,
    imageAlt: "Full-body paint protection film installation on a Corvette C8 at Skyline Custom Shop in Chantilly, VA",
    href: "/services/ppf",
    bookingService: "ppf",
  },
  {
    number: "02",
    title: "Ceramic Coating",
    subtitle: "Permanent Paint Defense",
    description: "A molecular bond to your paint that creates a permanent hydrophobic layer. Repels water, dirt, and contaminants for years of effortless protection.",
    image: CERAMIC_IMAGE,
    imageAlt: "Close-up of ceramic coating water beads on a black car — hydrophobic paint protection by Skyline Custom Shop in Chantilly, VA",
    href: "/services/ceramic-coating",
    bookingService: "ceramic",
  },
  {
    number: "03",
    title: "Window Tinting",
    subtitle: "Pro Nano Ceramic Film",
    description: "Block up to 99% of UV rays and reduce interior heat by 60% with our premium Pro Nano ceramic film. Lifetime warranty against bubbling, peeling, and fading.",
    image: TINT_IMAGE,
    imageAlt: "Window tinting on a BMW M2 coupe in front of Skyline Custom Shop in Chantilly, VA",
    href: "/services/window-tinting",
    bookingService: "tint",
  },
  {
    number: "04",
    title: "Vinyl Wraps",
    subtitle: "Unlimited Customization",
    description: "Transform your vehicle with unlimited color and finish options. Fully reversible, protects your original paint, and can be changed whenever you want.",
    image: WRAP_IMAGE,
    imageAlt: "Chrome delete vinyl wrap on a black SUV at Skyline Custom Shop in Chantilly, VA",
    href: "/services/vinyl-wraps",
    bookingService: "wrap",
  },
];

const testimonials = [
  {
    name: "Mohamed A.",
    vehicle: "Window Tint & Ceramic Coating",
    rating: 5,
    text: "I had my window tints and ceramic coating done by Skyline Customs, and the entire experience was top-tier from start to finish. Communication was clear and consistent, the process was smooth, and the work itself was done at a very high professional standard. Monzir and Mo were great to work with — they made everything easy, explained my options clearly, and ensured I got exactly what I wanted done. You can tell they take pride in their work and customer service.",
    image: "/images/KovmCKkPIFEJFUmc.webp",
  },
  {
    name: "Hassan A.",
    vehicle: "Tesla Cybertruck — Window Tint & Ceramic",
    rating: 5,
    text: "The boys at Skyline Customs took care of me with my Cybertruck — tints all around and got it ceramic coated as well. Came out flawless, and the service was quick and professional. Will be bringing my other vehicles here as well.",
    image: "/images/LaOvleuxhMbNtzvL.webp",
  },
  {
    name: "Omar M.",
    vehicle: "Lamborghini — Full Customization",
    rating: 5,
    text: "Absolutely top-tier work. I brought my Lamborghini in for customization and the results exceeded my expectations. The team was professional, knowledgeable, and took the time to explain every detail so I felt confident in the process from start to finish. Clean work, attention to detail, and everything was done exactly how I wanted it.",
    image: "/images/qirXXIXGBYtrKUwU.webp",
  },
];

const brandStatements = [
  {
    heading: "CRAFTSMANSHIP.",
    body: "Meticulous installation standards with a Lifetime Craftsmanship Warranty on every vehicle.",
  },
  {
    heading: "ENGINEERING.",
    body: "Advanced ceramic tint, paint protection film, and coatings applied with precision and purpose.",
  },
  {
    heading: "REPUTATION.",
    body: "A division of Skyline Auto Body Shop — trusted across Northern Virginia with over 500 five-star reviews.",
  },
];

const faqs = [
  {
    q: "How long does Paint Protection Film last?",
    a: "High-quality PPF typically lasts 10–12 years when properly maintained. Our films come with manufacturer warranties of up to 12 years against yellowing, cracking, and delamination.",
  },
  {
    q: "Can I wash my car after ceramic coating?",
    a: "We recommend waiting 7 days before washing to allow the coating to fully cure. After that, regular washing is fine — in fact, the hydrophobic properties make washing easier than ever.",
  },
  {
    q: "What's the difference between PPF and ceramic coating?",
    a: "PPF is a physical film that absorbs rock chips and scratches. Ceramic coating is a chemical bond that adds gloss and hydrophobic protection but won't stop physical impact. For maximum protection, we recommend both — PPF first, then ceramic over the top.",
  },
  {
    q: "How long does window tinting take?",
    a: "Most full-vehicle tint jobs are completed in 2–4 hours. We use computer-cut patterns for a precise fit with no trimming on the glass, which reduces installation time and improves quality.",
  },
  {
    q: "Is vinyl wrap reversible?",
    a: "Yes — vinyl wrap is fully reversible. When removed properly, it leaves your original paint completely intact. This makes it ideal for leased vehicles or anyone who wants to change colors without committing permanently.",
  },
  {
    q: "Do you offer mobile service or do I come to you?",
    a: "We operate from our controlled-environment facility in Chantilly, VA. Proper installation of PPF and ceramic coatings requires a dust-free environment that can't be replicated outdoors — this is how we guarantee quality.",
  },
];

function FAQAccordion() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="space-y-0 border border-[oklch(0.22_0.006_285)]">
      {faqs.map((faq, i) => (
        <div key={i} className={`${i !== faqs.length - 1 ? "border-b border-[oklch(0.22_0.006_285)]" : ""}` }>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between px-6 py-5 text-left group hover:bg-[oklch(0.14_0.005_285)] transition-colors"
          >
            <span className="font-display text-base md:text-lg text-[oklch(0.90_0.008_85)] tracking-wide group-hover:text-brand-orange transition-colors pr-4">
              {faq.q}
            </span>
            <ChevronDown
              size={18}
              className={`text-brand-orange shrink-0 transition-transform duration-300 ${open === i ? "rotate-180" : ""}`}
            />
          </button>
          {open === i && (
            <div className="px-6 pb-5">
              <p className="text-[oklch(0.60_0.008_85)] text-sm leading-relaxed">{faq.a}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  const { openBooking } = useBooking();

  return (
    <div className="min-h-screen bg-[oklch(0.10_0.005_285)]">
      <SEO
        title="PPF & Ceramic Coating | Chantilly VA"
        description="Northern Virginia's #1 PPF, ceramic coating, window tinting & vinyl wrap shop. 500+ five-star reviews. Free consultation in Chantilly, VA."
        canonical="https://www.skylinecustomshop.com/"
        jsonLd={[
          {
          "@context": "https://schema.org",
          "@type": "VideoObject",
          "name": "Skyline Custom Shop — PPF, Ceramic Coating & Window Tinting in Chantilly, VA",
          "description": "Watch Skyline Custom Shop technicians apply paint protection film (PPF) and window tinting on customer vehicles in Chantilly, VA. Northern Virginia's premier auto protection specialists.",
          "thumbnailUrl": "/images/hero-poster_702747e9.webp",
          "contentUrl": "/images/hero-reel_ecfc1328.mp4",
          "uploadDate": "2026-04-23",
          "duration": "PT20S",
          "publisher": {
            "@type": "Organization",
            "name": "Skyline Custom Shop",
            "url": "https://www.skylinecustomshop.com"
          }
          },
          {
          "@context": "https://schema.org",
          "@type": "AutoBodyShop",
          "name": "Skyline Custom Shop",
          "url": "https://www.skylinecustomshop.com",
          "telephone": "+17037754383",
          "priceRange": "$$",
          "description": "Northern Virginia's premier auto protection shop specializing in PPF, ceramic coating, window tinting, and vinyl wraps.",
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
            "latitude": 38.86928,
            "longitude": -77.46572
          },
          "openingHoursSpecification": [
            {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
              "opens": "09:00",
              "closes": "18:00"
            }
          ],
          "areaServed": [
            "Chantilly, VA", "Fairfax, VA", "Herndon, VA", "Reston, VA",
            "Ashburn, VA", "Sterling, VA", "Leesburg, VA", "McLean, VA",
            "Vienna, VA", "Tysons, VA", "Centreville, VA", "Manassas, VA"
          ],
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Auto Protection Services",
            "itemListElement": [
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Paint Protection Film (PPF)" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Ceramic Coating" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Window Tinting" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Vinyl Wraps" } }
            ]
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "5",
            "reviewCount": "500",
            "bestRating": "5",
            "worstRating": "1"
          },
          "image": "/images/NaRyJghitOfUAxex.jpg",
          "logo": {
            "@type": "ImageObject",
            "url": "/images/NaRyJghitOfUAxex.jpg"
          },
          "sameAs": [
            "https://www.google.com/maps/place/Skyline+Customs/@38.8875732,-77.433704,17z/data=!3m1!4b1!4m6!3m5!1s0x89b6457209ec6e35:0xd27075cd2a4f1b54!8m2!3d38.8875732!4d-77.433704!16s%2Fg%2F11yskymsnx",
            "https://www.skylinecustomshop.com"
          ]
        }
        ]}
      />
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-end overflow-hidden">
        {/* Background video */}
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="/images/hero-poster_702747e9.webp"
            title="Skyline Custom Shop — PPF, Ceramic Coating & Window Tinting in Chantilly, VA"
            aria-label="Skyline Custom Shop technicians applying paint protection film and window tinting in Chantilly, VA"
            className="w-full h-full object-cover"
          >
            <source src="/images/hero-reel_ecfc1328.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.08_0.005_285/0.92)] via-[oklch(0.08_0.005_285/0.65)] to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.08_0.005_285)] via-transparent to-transparent" />
        </div>

        {/* Hero content */}
        <div className="relative z-10 container pb-20 pt-32">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-[2px] w-12 bg-brand-orange" />
              <span className="font-mono-brand text-xs text-brand-orange uppercase tracking-[0.2em]">
                Chantilly, Virginia
              </span>
            </div>
            <h1 className="font-display text-6xl md:text-8xl lg:text-9xl text-[oklch(0.96_0.008_85)] leading-none mb-6">
              PROTECT<br />
              <span className="text-brand-orange">YOUR</span><br />
              INVESTMENT
            </h1>
            <p className="text-[oklch(0.70_0.008_85)] text-lg md:text-xl leading-relaxed mb-10 max-w-lg">
              Northern Virginia's premier automotive protection specialists. PPF, ceramic coating, window tinting, and vinyl wraps — trusted by 500+ drivers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/get-a-quote"
                className="inline-flex items-center justify-center gap-3 bg-brand-orange text-[oklch(0.10_0.005_285)] font-display text-lg tracking-widest px-8 py-4 hover:bg-[oklch(0.72_0.21_40)] transition-colors group"
              >
                BOOK YOUR APPOINTMENT
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-3 border border-[oklch(0.40_0.008_285)] text-[oklch(0.75_0.008_85)] font-display text-lg tracking-widest px-8 py-4 hover:border-brand-orange hover:text-brand-orange transition-colors"
              >
                VIEW SERVICES
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[oklch(0.40_0.008_285)] animate-bounce">
          <ChevronDown size={20} />
        </div>
      </section>

      <style>{`
        @keyframes kenBurns {
          from { transform: scale(1.05); }
          to { transform: scale(1.0); }
        }
      `}</style>

      {/* ── BRAND STATEMENTS BAND ────────────────────────────────── */}
      <section className="bg-brand-orange">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[oklch(0.10_0.005_285/0.25)]">
          {brandStatements.map((item) => (
            <div key={item.heading} className="px-8 py-10 flex flex-col gap-2">
              <span className="font-display text-3xl md:text-4xl text-[oklch(0.10_0.005_285)] leading-none tracking-wider">
                {item.heading}
              </span>
              <span className="text-[oklch(0.10_0.005_285/0.80)] text-sm leading-relaxed">
                {item.body}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── TRUSTED BRANDS CAROUSEL ──────────────────────────────── */}
      <section className="py-12 bg-[oklch(0.08_0.005_285)] border-y border-[oklch(0.18_0.006_285)] overflow-hidden">
        <div className="container mb-6">
          <p className="text-center font-mono-brand text-xs text-[oklch(0.45_0.01_285)] uppercase tracking-[0.3em]">Certified Partners &amp; Trusted Brands</p>
        </div>
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{background: 'linear-gradient(to right, oklch(0.08 0.005 285), transparent)'}} />
          <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{background: 'linear-gradient(to left, oklch(0.08 0.005 285), transparent)'}} />
          {/* Scrolling track — two identical sets for seamless loop */}
          <div className="flex items-center gap-20 w-max px-8" style={{animation: 'logoScroll 32s linear infinite'}}>
            {[0, 1].map((set) => (
              <React.Fragment key={set}>
                {/* Tesla — official T logo */}
                <div key={`tesla-${set}`} className="shrink-0 flex items-center justify-center opacity-50 hover:opacity-90 transition-opacity duration-300">
                  <img src="/images/tiFHaWYQUsMWJTXY.png" alt="Tesla" className="h-24 w-auto object-contain brightness-0 invert" />
                </div>
                {/* BMW — text wordmark */}
                <div key={`bmw-${set}`} className="shrink-0 flex items-center justify-center opacity-50 hover:opacity-90 transition-opacity duration-300">
                  <svg height="36" viewBox="0 0 120 36" fill="white" xmlns="http://www.w3.org/2000/svg">
                    <text x="0" y="30" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="34" letterSpacing="2" fill="white">BMW</text>
                  </svg>
                </div>
                {/* Gtechniq — wordmark from CDN (transparent PNG) */}
                <div key={`gtechniq-${set}`} className="shrink-0 flex items-center justify-center opacity-50 hover:opacity-90 transition-opacity duration-300">
                  <img src="/images/WYbljMYaVeBRAbKe.png" alt="Gtechniq" className="h-7 w-auto object-contain brightness-0 invert" />
                </div>
                {/* 3M — text wordmark */}
                <div key={`3m-${set}`} className="shrink-0 flex items-center justify-center opacity-50 hover:opacity-90 transition-opacity duration-300">
                  <svg height="40" viewBox="0 0 80 40" fill="white" xmlns="http://www.w3.org/2000/svg">
                    <text x="0" y="34" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="38" fill="white">3M</text>
                  </svg>
                </div>
                {/* Geoshield — from CDN (transparent PNG) */}
                <div key={`geo-${set}`} className="shrink-0 flex items-center justify-center opacity-50 hover:opacity-90 transition-opacity duration-300">
                  <img src="/images/gGGByVLnzCviIhpo.png" alt="Geoshield" className="h-10 w-auto object-contain brightness-0 invert" />
                </div>
                {/* Koch Chemie — transparent PNG, inverted to white */}
                <div key={`koch-${set}`} className="shrink-0 flex items-center justify-center opacity-50 hover:opacity-90 transition-opacity duration-300">
                  <img src="/images/jrtzAvVcsbAcKREe.png" alt="Koch Chemie" className="h-56 w-auto object-contain brightness-0 invert" />
                </div>
                {/* STEK — PPF & window film brand */}
                <div key={`stek-${set}`} className="shrink-0 flex items-center justify-center opacity-50 hover:opacity-90 transition-opacity duration-300">
                  <img src="/images/stek-logo_95f8c6ef.png" alt="STEK" className="h-16 w-auto object-contain" />
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
        <style>{`
          @keyframes logoScroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </section>

      {/* ── SERVICES OVERVIEW ──────────────────────────────────────── */}
      <section className="py-24 bg-[oklch(0.10_0.005_285)]">
        <div className="container">
          <div className="flex items-start justify-between mb-16 flex-wrap gap-6">
            <div>
              <p className="section-number mb-3">02 / Services</p>
              <h2 className="font-display text-5xl md:text-7xl text-[oklch(0.96_0.008_85)] leading-none">
                WHAT WE<br />
                <span className="text-brand-orange">DO BEST</span>
              </h2>
            </div>
            <Link
              href="/services"
              className="self-end flex items-center gap-2 font-display text-sm tracking-widest text-[oklch(0.55_0.01_285)] hover:text-brand-orange transition-colors border-b border-[oklch(0.25_0.006_285)] hover:border-brand-orange pb-1"
            >
              ALL SERVICES <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[oklch(0.20_0.006_285)]">
            {services.map((service) => (
              <div
                key={service.number}
                className="group relative overflow-hidden bg-[oklch(0.10_0.005_285)] block"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.imageAlt}
                    title={service.title + " | Skyline Custom Shop – Chantilly, VA"}
                    loading="lazy"
                    width="600"
                    height="400"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.08_0.005_285)] via-[oklch(0.08_0.005_285/0.3)] to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="font-mono-brand text-xs text-brand-orange bg-[oklch(0.10_0.005_285/0.8)] px-2 py-1">
                      {service.number}
                    </span>
                  </div>

                </div>
                <div className="p-6">
                  <p className="font-mono-brand text-xs text-brand-orange uppercase tracking-widest mb-2">
                    {service.subtitle}
                  </p>
                  <h3 className="font-display text-3xl text-[oklch(0.96_0.008_85)] mb-3 group-hover:text-brand-orange transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-[oklch(0.55_0.01_285)] text-sm leading-relaxed">
                    {service.description}
                  </p>
                  <div className="flex items-center gap-3 mt-4">
                    <Link href={service.href} className="flex items-center gap-2 text-brand-orange font-display text-sm tracking-wider hover:underline">
                      LEARN MORE <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <span className="text-[oklch(0.30_0.006_285)]">|</span>
                    <Link
                      href="/get-a-quote"
                      className="text-[oklch(0.65_0.008_85)] font-display text-sm tracking-wider hover:text-brand-orange transition-colors"
                    >
                      GET A QUOTE
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY SKYLINE ──────────────────────────────────────────── */}
      <section className="py-24 bg-[oklch(0.12_0.005_285)]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="section-number mb-3">03 / Why Us</p>
              <h2 className="font-display text-5xl md:text-6xl text-[oklch(0.96_0.008_85)] leading-none mb-8">
                PRECISION<br />
                <span className="text-brand-orange">OVER</span><br />
                EVERYTHING
              </h2>
              <p className="text-[oklch(0.65_0.008_85)] leading-relaxed mb-8">
                We are the specialty protection division of Skyline Auto Body Shop — one of Northern Virginia's most trusted automotive businesses with over 500 five-star reviews. Every vehicle we touch receives the same meticulous attention to detail, whether it's a daily driver or an exotic.
              </p>
              <div className="space-y-0 border border-[oklch(0.22_0.006_285)]">
                {[
                  { heading: "CRAFTSMANSHIP.", body: "Meticulous installation standards with a Lifetime Craftsmanship Warranty on every vehicle." },
                  { heading: "ENGINEERING.", body: "Advanced ceramic tint, paint protection film, and coatings applied with precision and purpose." },
                  { heading: "REPUTATION.", body: "A division of Skyline Auto Body Shop — trusted across Northern Virginia with over 500 five-star reviews." },
                ].map((item, i) => (
                  <div key={item.heading} className={`flex items-start gap-5 px-6 py-5 ${i !== 2 ? "border-b border-[oklch(0.22_0.006_285)]" : ""}`}>
                    <div className="w-1 self-stretch bg-brand-orange shrink-0" />
                    <div>
                      <h4 className="font-display text-2xl text-brand-orange tracking-wider leading-none mb-1">{item.heading}</h4>
                      <p className="text-[oklch(0.60_0.008_85)] text-sm leading-relaxed">{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-full h-full border border-brand-orange opacity-20" />
              <img
                src="/images/ppf_new1_7f1dc8fc.webp"
                alt="Skyline Customs shop exterior in Chantilly, VA with a race-liveried BMW and black Corvette C8 outside the PPF and window tinting facility"
                title="Skyline Custom Shop – Professional Auto Protection in Chantilly, VA"
                loading="lazy"
                width="800"
                height="500"
                className="w-full h-80 lg:h-[500px] object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[oklch(0.08_0.005_285)] to-transparent h-32" />
            </div>
          </div>
        </div>
      </section>



      {/* ── HOW IT WORKS ─────────────────────────────────────────── */}
      <section className="py-24 bg-[oklch(0.10_0.005_285)]">
        <div className="container">
          <div className="mb-16">
            <p className="section-number mb-3">04 / Process</p>
            <h2 className="font-display text-5xl md:text-7xl text-[oklch(0.96_0.008_85)] leading-none">
              HOW IT<br />
              <span className="text-brand-orange">WORKS</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[oklch(0.20_0.006_285)]">
            {[
              {
                step: "01",
                icon: ClipboardList,
                title: "FREE CONSULTATION",
                body: "Tell us about your vehicle and goals. We assess your paint condition, recommend the right protection package, and give you a transparent quote — no pressure.",
              },
              {
                step: "02",
                icon: Wrench,
                title: "PAINT PREP",
                body: "We decontaminate, clay bar, and perform paint correction as needed. A flawless surface is the foundation of a flawless install — we never skip this step.",
              },
              {
                step: "03",
                icon: Shield,
                title: "PRECISION INSTALL",
                body: "Our certified installers apply your chosen protection using computer-cut patterns and controlled environment techniques. Every edge, every panel, done right.",
              },
              {
                step: "04",
                icon: CheckCircle,
                title: "QUALITY DELIVERY",
                body: "We walk you through the finished work, explain aftercare, and hand over your vehicle with a Lifetime Craftsmanship Warranty. You drive away protected.",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.step} className="bg-[oklch(0.10_0.005_285)] p-8 group hover:bg-[oklch(0.13_0.005_285)] transition-colors">
                  <div className="flex items-start justify-between mb-6">
                    <span className="font-mono-brand text-4xl font-bold text-[oklch(0.20_0.006_285)] leading-none group-hover:text-brand-orange transition-colors">
                      {item.step}
                    </span>
                    <Icon size={24} className="text-brand-orange" />
                  </div>
                  <h3 className="font-display text-xl text-[oklch(0.96_0.008_85)] tracking-wider mb-3">
                    {item.title}
                  </h3>
                  <p className="text-[oklch(0.55_0.01_285)] text-sm leading-relaxed">
                    {item.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────── */}
      <section className="py-24 bg-[oklch(0.12_0.005_285)]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="section-number mb-3">05 / FAQ</p>
              <h2 className="font-display text-5xl md:text-6xl text-[oklch(0.96_0.008_85)] leading-none mb-6">
                COMMON<br />
                <span className="text-brand-orange">QUESTIONS</span>
              </h2>
              <p className="text-[oklch(0.60_0.008_85)] leading-relaxed mb-8">
                Have more questions? Call us at{" "}
                <a href="tel:+17037754383" className="text-brand-orange hover:underline">(703) 775-4383</a>{" "}
                or book a free consultation — we're happy to walk you through everything.
              </p>
              <a
                href="tel:+17037754383"
                className="inline-flex items-center gap-3 bg-brand-orange text-[oklch(0.10_0.005_285)] font-display text-sm tracking-widest px-6 py-3 hover:bg-[oklch(0.72_0.21_40)] transition-colors"
              >
                <Phone size={14} /> FREE CONSULTATION
              </a>
            </div>
            <FAQAccordion />
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────── */}
      <Testimonials title="WHAT DRIVERS ARE SAYING" />

      {/* ── FINAL CTA ────────────────────────────────────────────── */}
      <section className="py-24 bg-brand-orange relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src={HERO_IMAGE} alt="Skyline Customs technician applying paint protection film to a luxury vehicle in Chantilly VA" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 container text-center">
          <h2 className="font-display text-5xl md:text-7xl text-[oklch(0.10_0.005_285)] leading-none mb-6">
            READY TO PROTECT<br />YOUR VEHICLE?
          </h2>
          <p className="text-[oklch(0.10_0.005_285/0.75)] text-lg mb-10 max-w-xl mx-auto">
            Book your appointment today. Most services available same-week. We serve all of Northern Virginia from our Chantilly facility.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+17037754383"
              className="inline-flex items-center justify-center gap-3 bg-[oklch(0.10_0.005_285)] text-[oklch(0.96_0.008_85)] font-display text-lg tracking-widest px-8 py-4 hover:bg-[oklch(0.15_0.005_285)] transition-colors"
            >
              <Phone size={18} />
              FREE CONSULTATION
            </a>
          </div>
        </div>
      </section>

      {/* Location Map Strip */}
      <section className="bg-[oklch(0.08_0.005_285)]">
        <div className="relative overflow-hidden" style={{ height: '280px' }}>
          <iframe
            title="Skyline Customs — Chantilly, VA"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3107.523!2d-77.46572!3d38.86928!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b64c2f7c9c3c3d%3A0x8e4b1e2f3a4b5c6d!2s4215%20Walney%20Rd%20Suite%20R%2C%20Chantilly%2C%20VA%2020151!5e0!3m2!1sen!2sus!4v1740000000000!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0, filter: 'grayscale(20%) contrast(1.05) brightness(0.85)' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          {/* Overlay with address + CTA */}
          <div className="absolute inset-y-0 left-0 w-full md:w-auto flex items-end md:items-center pointer-events-none">
            <div className="bg-[oklch(0.08_0.005_285/0.88)] backdrop-blur-sm px-8 py-6 border-t md:border-t-0 md:border-r border-brand-orange/40 pointer-events-auto">
              <p className="font-mono-brand text-xs text-brand-orange uppercase tracking-[0.2em] mb-2">Visit Us</p>
              <p className="font-display text-xl text-[oklch(0.96_0.008_85)] tracking-wider leading-tight mb-1">4215 Walney Rd. Suite R</p>
              <p className="font-display text-xl text-[oklch(0.96_0.008_85)] tracking-wider leading-tight mb-4">Chantilly, VA 20151</p>
              <a
                href="https://maps.google.com/?q=Skyline+Customs+4215+Walney+Rd+Suite+R+Chantilly+VA+20151"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-brand-orange font-mono-brand text-xs uppercase tracking-widest hover:underline"
              >
                Get Directions →
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
