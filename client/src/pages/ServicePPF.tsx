/**
 * SKYLINE CUSTOMS — Paint Protection Film pillar page
 * URL: /services/ppf
 * The hub for every PPF query: what it is, packages and prices, the film,
 * recent installs, videos, process, FAQ, and links to every PPF sub-page
 * (vehicle pages, cost page, comparison, city pages, blog).
 * Data: @/lib/ppf.ts (packages, prices, FAQ) and @/lib/modelPpf.ts (prices by class).
 */

import { useState, useEffect } from "react";
import { Link } from "wouter";
import { ChevronDown, Shield, Zap, Eye, Droplets, Sun, Award, CheckCircle, ArrowRight, Phone } from "lucide-react";
import OneIdea from "@/components/OneIdea";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceCityLinks from "@/components/ServiceCityLinks";
import CompareLinks from "@/components/CompareLinks";
import NearMeBlock from "@/components/NearMeBlock";
import VehicleLinks from "@/components/VehicleLinks";
import LocalBanner from "@/components/LocalBanner";
import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";
import ExitPrompt from "@/components/ExitPrompt";
import LeadPulse from "@/components/LeadPulse";
import { promoTagFor } from "@/components/PromoQuoteForm";
import { timeLeftLabel } from "@/pages/JuneSpecial";
import Testimonials from "@/components/Testimonials";
import RockChipDemo from "@/components/demos/RockChipDemo";
import SelfHealDemo from "@/components/demos/SelfHealDemo";
import VideoCarousel from "@/components/VideoCarousel";
import { VIDEOS, videoObject } from "@/lib/videos";
import { PPF_PACKAGES, PPF_FAQS, VEHICLE_CLASSES } from "@/lib/ppf";
import { PPF_QUESTIONS, PPF_QUESTIONS_COVERED_ON_SERVICE_PAGE } from "@/lib/ppfQuestions";
import { FULL_FRONT_GUIDE } from "@/lib/fullFrontGuide";
import { GuideBlocks } from "@/components/GuideBlocks";

const VS_FULL_BODY = FULL_FRONT_GUIDE.sections.find((x) => x.id === "full-front-vs-full-body");
const VS_FULL_BODY_FAQ = FULL_FRONT_GUIDE.faqs.find((f) => /full body/i.test(f.q));

/** The page's own FAQ plus the questions Google asks about PPF, minus the ones the FAQ already covers. */
const PPF_PAGE_FAQS = [...PPF_FAQS, ...(VS_FULL_BODY_FAQ ? [VS_FULL_BODY_FAQ] : []), ...PPF_QUESTIONS.filter((x) => !PPF_QUESTIONS_COVERED_ON_SERVICE_PAGE.has(x.id)).map((x) => ({ q: x.q, a: x.a }))];
import { CITY_ORDER } from "@/lib/localSeo";
import { trpc } from "@/lib/trpc";
import { withJobSlugs } from "@shared/galleryJobs";
import { responsiveImage } from "@/lib/responsiveImage";

const BASE_URL = "https://www.skylinecustomshop.com";
const LAST_REVIEWED = "September 18, 2026";

const benefits = [
  { icon: Shield, title: "Rock Chip & Impact Defense", desc: "Thick urethane film absorbs gravel, stone chips, and road debris that would otherwise chip the bumper, hood, and fenders permanently." },
  { icon: Zap, title: "Self-Healing Top Coat", desc: "Light swirls and scratches disappear on their own with heat from the sun or hot water. The film repairs itself; your paint never gets touched." },
  { icon: Eye, title: "Invisible on the Car", desc: "Optically clear, no orange peel, no haze, edges wrapped under the panels. Nobody can tell the film is there until a rock bounces off it." },
  { icon: Droplets, title: "Hydrophobic Surface", desc: "Water, mud, and road grime bead off, so the car stays cleaner and washes with less rubbing and fewer wash-induced scratches." },
  { icon: Sun, title: "UV & Stain Resistance", desc: "Blocks the UV that oxidizes and fades paint, and takes the etching from bird droppings, bugs, and tree sap instead of your clear coat." },
  { icon: Award, title: "12-Year Manufacturer Warranty", desc: "STEK DYNOshield is warrantied for 12 years against yellowing, cracking, peeling, and delamination, and our installs carry a lifetime craftsmanship warranty." },
];

const process = [
  { num: "01", title: "Free Quote & Inspection", desc: "Tell us the year, make, and model and how you drive. We recommend partial, full front, or full front extended, and confirm pricing at the car." },
  { num: "02", title: "Decontamination Wash", desc: "Foam wash, iron fallout remover, and clay bar so nothing sits between the film and the paint. Fresh-from-the-dealer cars get this too." },
  { num: "03", title: "Paint Correction (If Needed)", desc: "Film locks in whatever is under it. Swirls or scratches are polished out first so the paint under the film is better than the paint next to it." },
  { num: "04", title: "Computer-Cut Patterns", desc: "Patterns are plotted for your exact year and model, with extra material to wrap edges. No blades touch your paint." },
  { num: "05", title: "Installation in a Controlled Bay", desc: "Certified installers work panel by panel in a dust-controlled bay, tucking edges and clearing every panel under high-intensity lighting." },
  { num: "06", title: "Walk-Around & Care Guide", desc: "You inspect the car with us before paying. You leave with a 7-day cure guide and a wash routine that keeps the film clear for a decade." },
];

export default function ServicePPF() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const { data: photos } = trpc.site.gallery.useQuery(undefined, { staleTime: 10 * 60 * 1000 });
  const { data: promo } = trpc.promo.getActive.useQuery();
  const jobs = withJobSlugs(photos ?? []).filter((p) => /ppf/i.test(p.alt)).slice(0, 8);

  // This month's special, for the hero card and the sticky bar. Nothing renders until the promo has loaded.
  const promoPrice = Number(String(promo?.price ?? "").replace(/[^0-9.]/g, "")) || 0;
  const promoPriceTxt = promoPrice ? `$${promoPrice.toLocaleString("en-US")}` : "";
  const promoRemaining = (promo?.totalSlots ?? 21) - (promo?.slots?.length ?? 0);
  const promoLive = Boolean(promo?.title && promoPrice && promoRemaining > 0);
  let promoIncluded: { name: string; isFree: boolean }[] = [];
  if (promo?.includedServices) {
    try { promoIncluded = (JSON.parse(promo.includedServices) as { name: string; isFree: boolean }[]).filter((i) => i?.name); } catch { promoIncluded = []; }
  }
  // The sticky bar steps aside while the hero's own button is on screen.
  const [heroCtaVisible, setHeroCtaVisible] = useState(true);
  useEffect(() => {
    const el = document.getElementById("ppf-hero-cta");
    if (!el || typeof IntersectionObserver === "undefined") { setHeroCtaVisible(false); return; }
    const io = new IntersectionObserver(([entry]) => setHeroCtaVisible(entry.isIntersecting), { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, [promoLive]);
  const videos = VIDEOS.filter((v) => v.service === "ppf");

  // Facebook Pixel: ViewContent event when visitor lands on PPF service page
  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "ViewContent", { content_name: "Paint Protection Film", content_category: "Auto Protection", content_ids: ["ppf"], content_type: "service" });
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-['DM_Sans',sans-serif]">
      <SEO
        title="Full Front PPF in Chantilly, VA | Paint Protection Film Near You | STEK"
        description="Full front paint protection film near you in Chantilly, VA: hood, bumper, fenders, mirrors, and headlights in self-healing STEK DYNOshield, 12-year warranty. 140+ five-star reviews. Partial and extended options. Free quotes."
        canonical={`${BASE_URL}/services/ppf`}
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Paint Protection Film Installation",
            "name": "Paint Protection Film (PPF) — Chantilly, VA",
            "url": `${BASE_URL}/services/ppf`,
            "provider": {
              "@type": "AutoBodyShop",
              "name": "Skyline Customs",
              "url": BASE_URL,
              "telephone": "+17037754383",
              "address": { "@type": "PostalAddress", "streetAddress": "4215 Walney Rd Suite 1A & B", "addressLocality": "Chantilly", "addressRegion": "VA", "postalCode": "20151", "addressCountry": "US" },
            },
            "areaServed": CITY_ORDER.map((c) => ({ "@type": "City", "name": `${c}, VA` })),
            "brand": { "@type": "Brand", "name": "STEK DYNOshield" },
            "description": "STEK DYNOshield paint protection film installed by certified technicians in Chantilly, VA. Partial front, full front, and full front extended coverage with a 12-year manufacturer warranty.",
            "hasOfferCatalog": { "@type": "OfferCatalog", "name": "PPF packages", "itemListElement": PPF_PACKAGES.map((p) => ({ "@type": "Offer", "name": `${p.name} PPF`, "url": `${BASE_URL}/get-a-quote?service=ppf`, "itemOffered": { "@type": "Service", "name": `${p.name} paint protection film`, "description": p.coverage.join(", ") } })) },
            "review": [
              { "@type": "Review", "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }, "author": { "@type": "Person", "name": "Marcus T." }, "reviewBody": "Got full front PPF on my BMW M4. The installation was flawless — you can't even tell it's there. Skyline's attention to detail is unmatched in Northern Virginia." },
              { "@type": "Review", "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }, "author": { "@type": "Person", "name": "Jennifer L." }, "reviewBody": "Had PPF installed on my new Tesla Model 3. The team was professional, the shop was immaculate, and the result was perfect. Worth every penny for peace of mind." },
            ],
            "aggregateRating": { "@type": "AggregateRating", "ratingValue": "5", "reviewCount": "146", "bestRating": "5", "worstRating": "1" },
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": PPF_PAGE_FAQS.map((f) => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } })),
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": `${BASE_URL}/` },
              { "@type": "ListItem", "position": 2, "name": "Services", "item": `${BASE_URL}/services` },
              { "@type": "ListItem", "position": 3, "name": "Paint Protection Film", "item": `${BASE_URL}/services/ppf` },
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "PPF videos",
            "itemListElement": videos.map((v, i) => ({ "@type": "ListItem", "position": i + 1, "item": videoObject(v) })),
          },
        ]}
      />
      <Navbar hidePromoStrip />

      {/* Hero */}
      <section className="relative flex items-end pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0A] via-[#111] to-[#1a0a00]" />
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 40px, #E85D04 40px, #E85D04 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, #E85D04 40px, #E85D04 41px)" }} />
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10" style={{ background: "radial-gradient(ellipse at top right, #E85D04, transparent 70%)" }} />
        <div className="container relative z-10 pt-24">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: "Paint Protection Film" }]} />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <div className="lg:col-span-7">
            {promoLive && (
              <Link href="/promo" data-cta="ppf-hero-pill" className="inline-flex items-center gap-2 bg-[#E85D04] text-black text-xs font-bold tracking-[0.2em] uppercase px-3 py-1.5 mb-4 hover:bg-orange-500 transition-colors">
                <Zap className="w-3.5 h-3.5 fill-current" /> This month: {promo!.title}, {promoPriceTxt}
              </Link>
            )}
            <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">Chantilly, VA · Serving all of Northern Virginia</p>
            <h1 className="font-['Bebas_Neue',sans-serif] text-6xl md:text-7xl xl:text-8xl leading-none text-white mb-4">
              FULL FRONT<br />
              <span className="text-[#E85D04]">PAINT PROTECTION</span><br />
              FILM
            </h1>
            <p className="text-zinc-300 text-lg md:text-xl max-w-2xl leading-relaxed mb-6">
              Northern Virginia's STEK-certified full front PPF installer. Hood, bumper, fenders, mirrors, and headlights in self-healing, invisible DYNOshield, computer-cut for your exact model and installed in a dust-controlled bay in Chantilly, with a 12-year manufacturer warranty on every install.
            </p>
            <div className="flex flex-wrap gap-2 mb-8 text-xs text-zinc-300">
              {["Full front specialists", "STEK certified installer", "12-year film warranty", "5.0 ★ · 140+ Google reviews", "Computer-cut for your exact model", "Free quotes, usually within the hour"].map((t) => (
                <span key={t} className="border border-zinc-700 bg-black/30 px-3 py-1.5">{t}</span>
              ))}
            </div>
            <div className="flex flex-wrap gap-4">
              {promoLive ? (
                <>
                  <Link href="/promo" data-cta="ppf-hero-special" className="bg-[#E85D04] hover:bg-[#d14e00] text-black font-bold tracking-widest uppercase px-8 py-4 transition-all duration-200 hover:scale-105 inline-flex items-center gap-2">
                    SEE THE {promoPriceTxt} SPECIAL <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link href="/get-a-quote?service=ppf" className="border border-zinc-600 hover:border-[#E85D04] text-zinc-300 hover:text-white font-bold tracking-widest uppercase px-8 py-4 transition-all inline-flex items-center gap-2">
                    GET A PPF QUOTE
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/get-a-quote?service=ppf" id="ppf-hero-cta" className="bg-[#E85D04] hover:bg-[#d14e00] text-black font-bold tracking-widest uppercase px-8 py-4 transition-all duration-200 hover:scale-105 inline-flex items-center gap-2">
                    GET A PPF QUOTE <ArrowRight className="w-4 h-4" />
                  </Link>
                  <a href="#packages" className="text-zinc-300 hover:text-white font-bold tracking-widest uppercase px-4 py-4 inline-flex items-center gap-2">
                    SEE PACKAGES <ChevronDown className="w-4 h-4" />
                  </a>
                </>
              )}
            </div>
          </div>

          {/* This month's special: the same card as the home page and the promo page, from the database */}
          {promoLive && (
            <aside className="lg:col-span-5 order-first lg:order-none relative bg-gradient-to-br from-[#1a0f05] to-[#0D0D0D] border-2 border-[#E85D04]/70 p-6 md:p-8" aria-label="This month's PPF special">
              {promoIncluded.some((i) => i.isFree) && <span className="absolute -top-px -right-px bg-[#E85D04] text-black text-[11px] font-bold tracking-[0.2em] uppercase px-3 py-1.5">Free extras included</span>}
              <p className="text-[#E85D04] text-xs font-bold tracking-[0.3em] uppercase mb-2">This month only</p>
              <p className="font-['Bebas_Neue',sans-serif] text-6xl md:text-7xl text-[#E85D04] leading-none mb-2">{promoPriceTxt}</p>
              <p className="text-white font-semibold text-base md:text-lg leading-snug mb-1">{promo!.title}</p>
              <p className="text-zinc-400 text-sm mb-4">Everything included. No add-ons.{promo!.endDate ? ` Price locked through ${promo!.endDate}.` : ""}</p>
              {promoIncluded.length > 0 && (
                <ul className="hidden sm:block space-y-2 mb-6 text-sm text-zinc-200">
                  {promoIncluded.map((i) => (
                    <li key={i.name} className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-[#E85D04] mt-0.5 shrink-0" /><span>{i.name}{i.isFree && <span className="ml-2 text-emerald-400 font-bold text-xs uppercase tracking-wide">Free</span>}</span></li>
                  ))}
                </ul>
              )}
              <Link href="/promo" id="ppf-hero-cta" data-cta="ppf-hero-card" className="w-full inline-flex items-center justify-center gap-2 bg-[#E85D04] text-black font-['Bebas_Neue',sans-serif] text-xl md:text-2xl tracking-[0.1em] uppercase px-6 py-4 hover:bg-orange-600 transition-colors mt-2">
                Claim my spot <ArrowRight className="w-5 h-5" />
              </Link>
              <p className="text-zinc-400 text-xs mt-3 text-center"><span className="inline-block w-2 h-2 rounded-full bg-emerald-400 mr-1.5 align-middle" /><span className="text-emerald-400 font-semibold">{promoRemaining} spots left</span>{promo!.endDate ? ` · Ends ${promo!.endDate}` : ""}</p>
              <LeadPulse className="mt-2" />
            </aside>
          )}
          </div>
        </div>
      </section>
      <div className="h-1 bg-[#E85D04]" />

      {/* What PPF is: the quick answer */}
      <section className="py-16 bg-[#0A0A0A]">
        <div className="container max-w-4xl">
          <p className="text-[#E85D04] text-xs font-bold tracking-[0.3em] uppercase mb-3">What it is</p>
          <h2 className="font-['Bebas_Neue',sans-serif] text-4xl md:text-5xl text-white mb-6">WHAT PAINT PROTECTION FILM ACTUALLY DOES</h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed text-lg">
            <p>
              Paint protection film, also called PPF or clear bra, is a thick, transparent urethane film bonded over your factory paint. When a rock comes off a truck on I-66 or Route 28, the film takes the hit and heals the mark instead of leaving a chip in your clear coat. It is the only product that physically stops rock chips; waxes, sealants, and ceramic coatings cannot.
            </p>
            <p>
              At Skyline Customs we install one film, STEK DYNOshield, cut on the manufacturer's pattern software for your exact year and model, with edges wrapped under the panels so there is no visible line. Most customers protect the front end (hood, bumper, fenders, mirrors, headlights), and many add a ceramic coating on top for gloss and easy washing.
            </p>
          </div>
          <p className="text-zinc-400 text-sm mt-6">
            Written and reviewed by Skyline's STEK-certified install team · Last reviewed {LAST_REVIEWED} ·{" "}
            <Link href="/about#certifications" className="text-[#E85D04] underline hover:text-white">Our certifications</Link>
          </p>
        </div>
      </section>

      {/* Interactive: throw rocks at the car, with and without film */}
      <section className="py-20 bg-[#0D0D0D] border-t border-zinc-900" id="rock-chip-test">
        <div className="container"><RockChipDemo /></div>
      </section>

      {/* Benefits: one idea per screen on large screens */}
      <OneIdea eyebrow="Why PPF" heading="BUILT TO TAKE THE HIT" items={benefits} />

      {/* Interactive: scratch the film, add heat, watch it heal */}
      <section className="py-20 bg-[#0A0A0A] border-t border-zinc-900" id="self-healing">
        <div className="container"><SelfHealDemo /></div>
      </section>

      {/* Packages */}
      <section className="py-24 bg-[#0A0A0A]" id="packages">
        <div className="container">
          <div className="mb-16">
            <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">Coverage Options</p>
            <h2 className="font-['Bebas_Neue',sans-serif] text-5xl md:text-6xl text-white">CHOOSE YOUR PROTECTION</h2>
            <p className="text-zinc-400 mt-4 max-w-2xl">Three packages, one film. Tell us your vehicle and we quote the exact price, usually within the hour. New to this? Read the <Link href="/full-front-ppf" className="text-[#E85D04] underline underline-offset-2">complete full front PPF guide</Link>: every panel, the film, the install day, and what to expect at year ten.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {PPF_PACKAGES.map((pkg) => (
              <div key={pkg.key} className={`squircle overflow-hidden relative border flex flex-col ${pkg.featured ? "border-[#E85D04] bg-[#1a0a00]" : "border-zinc-800 bg-[#0D0D0D] hover:border-zinc-600"} transition-colors`}>
                {pkg.featured && <div className="absolute top-4 left-4 rounded-full bg-[#E85D04] text-black text-xs font-bold tracking-widest uppercase px-3 py-1 z-10 shadow-lg">MOST POPULAR</div>}
                <div className="w-full overflow-hidden">
                  <img loading="lazy" decoding="async" src={pkg.image} srcSet={responsiveImage(pkg.image).srcSet} sizes="(min-width: 1024px) 33vw, 100vw" alt={`${pkg.name} PPF coverage diagram on a Tesla Model Y at Skyline Customs, Chantilly VA`} width={640} height={360} className="w-full h-48 object-cover object-center" />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-['Bebas_Neue',sans-serif] text-2xl text-white mb-1">{pkg.name}</h3>
                  <p className="text-zinc-400 text-xs uppercase tracking-widest mb-3">{pkg.tagline}</p>
                  <ul className="space-y-2 flex-1 mb-4">
                    {pkg.coverage.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-zinc-300"><CheckCircle className="w-4 h-4 text-[#E85D04] mt-0.5 shrink-0" />{item}</li>
                    ))}
                  </ul>
                  <p className="text-zinc-400 text-xs mb-1">{pkg.bestFor}</p>
                  <p className="text-zinc-400 text-xs mb-5">Install time: {pkg.installTime}</p>
                  <Link href={`/get-a-quote?service=ppf&package=${pkg.key}`} className={`w-full py-3 font-bold text-sm tracking-widest uppercase transition-all block text-center ${pkg.featured ? "bg-[#E85D04] hover:bg-[#d14e00] text-black" : "border border-zinc-700 hover:border-[#E85D04] text-white"}`}>
                    GET A QUOTE
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How quotes work */}
      {VS_FULL_BODY && (
        <section className="py-24 bg-[#0D0D0D] border-t border-zinc-800" id="full-front-vs-full-body">
          <div className="container max-w-3xl">
            <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">The question we get most</p>
            <h2 className="font-['Bebas_Neue',sans-serif] text-5xl md:text-6xl text-white leading-none mb-8">FULL FRONT VS FULL BODY</h2>
            <GuideBlocks blocks={VS_FULL_BODY.blocks} />
            <Link href="/full-front-ppf" className="inline-flex items-center gap-2 mt-2 text-[#E85D04] font-bold tracking-widest uppercase text-sm hover:underline underline-offset-4">Read the complete full front guide <ArrowRight className="w-4 h-4" /></Link>
          </div>
        </section>
      )}

      <section className="py-24 bg-[#0D0D0D] border-t border-zinc-800" id="pricing">
        <div className="container max-w-5xl">
          <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">PPF cost</p>
          <h2 className="font-['Bebas_Neue',sans-serif] text-5xl md:text-6xl text-white mb-4">HOW PPF PRICING WORKS IN NORTHERN VIRGINIA</h2>
          <p className="text-zinc-400 max-w-2xl mb-8">Your quote comes down to two things: how much of the car you cover and how big the car is. Every package includes the decontamination wash, computer-cut STEK DYNOshield, edge wrapping, and the 12-year warranty. We confirm the number at inspection, and nothing changes after that.</p>
          {promo && (
            <div className="border border-[#E85D04]/50 bg-[#E85D04]/10 p-4 mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <p className="text-white text-sm"><span className="text-[#E85D04] font-bold uppercase tracking-widest text-xs mr-2">{promo.title}</span>Every full-front PPF this month includes a free full-car ceramic coating. Spots are limited.</p>
              <Link href="/promo" className="text-[#E85D04] text-xs font-bold tracking-widest uppercase hover:text-white whitespace-nowrap">Details →</Link>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {VEHICLE_CLASSES.map((c) => (
              <div key={c.key} className="squircle border border-zinc-800 bg-[#111] p-6">
                <h3 className="text-white font-bold">{c.label}</h3>
                <p className="text-zinc-400 text-xs mt-1">{c.examples}</p>
                <ul className="mt-4 space-y-1">
                  {PPF_PACKAGES.map((p) => <li key={p.key} className="flex items-center gap-2 text-zinc-300 text-sm"><CheckCircle className="w-3.5 h-3.5 text-[#E85D04] shrink-0" />{p.name}</li>)}
                </ul>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-4 mt-8">
            <Link href="/get-a-quote?service=ppf" className="bg-[#E85D04] hover:bg-[#d14e00] text-black font-bold tracking-widest uppercase px-8 py-4 inline-flex items-center gap-2 transition-colors">GET MY EXACT PRICE <ArrowRight className="w-4 h-4" /></Link>
            <Link href="/ppf-cost" className="inline-flex items-center gap-2 text-[#E85D04] font-bold tracking-widest uppercase text-sm hover:text-white self-center">What changes a PPF quote <ArrowRight className="w-4 h-4" /></Link>
          </div>
        </div>
      </section>

      {/* STEK DYNOshield */}
      <section className="py-24 bg-[#111]">
        <div className="container max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">The Film We Use</p>
              <h2 className="font-['Bebas_Neue',sans-serif] text-5xl md:text-6xl text-white leading-none mb-6">STEK<br /><span className="text-[#E85D04]">DYNOshield</span></h2>
              <p className="text-zinc-400 text-lg leading-relaxed mb-6">
                Not all PPF is the same. We exclusively install <strong className="text-white">STEK DYNOshield</strong>, a premium thermoplastic polyurethane film with a self-healing, hydrophobic top coat, chosen because it stays clear and glossy for years in Virginia sun and road salt.
              </p>
              <p className="text-zinc-400 leading-relaxed mb-8">
                DYNOshield is backed by a <strong className="text-white">12-year manufacturer warranty</strong> against yellowing, cracking, peeling, and delamination, and that warranty is only valid when installed by a certified shop like ours. Prefer a satin look? Ask about matte (stealth) DYNOshield on the full front.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { title: "Self-Healing", desc: "Light scratches and swirls vanish with heat from the sun or hot water." },
                  { title: "Hydrophobic Top Coat", desc: "Water and grime bead off, so the car stays cleaner between washes." },
                  { title: "Optical Clarity", desc: "No orange peel, no haze, and no yellowing over the life of the film." },
                  { title: "12-Year Warranty", desc: "Manufacturer-backed against yellowing, cracking, peeling, and delamination." },
                ].map((feat) => (
                  <div key={feat.title} className="squircle border border-zinc-800 bg-[#0D0D0D] p-5">
                    <p className="text-[#E85D04] text-xs font-bold tracking-widest uppercase mb-1">{feat.title}</p>
                    <p className="text-zinc-400 text-sm leading-relaxed">{feat.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="squircle border border-zinc-800 bg-[#0D0D0D] p-10 flex flex-col items-center justify-center text-center min-h-[400px]">
                <div className="w-20 h-1 bg-[#E85D04] mb-8" />
                <p className="font-['Bebas_Neue',sans-serif] text-8xl text-white leading-none mb-2">12</p>
                <p className="font-['Bebas_Neue',sans-serif] text-3xl text-[#E85D04] tracking-widest mb-6">YEAR WARRANTY</p>
                <p className="text-zinc-400 text-sm max-w-xs leading-relaxed">Manufacturer-backed coverage against yellowing, cracking, peeling, and delamination, included with every STEK DYNOshield installation.</p>
                <div className="w-20 h-1 bg-[#E85D04] mt-8" />
                <p className="text-zinc-400 text-xs tracking-widest uppercase mt-6">STEK DYNOshield Film</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent installs */}
      {jobs.length > 0 && (
        <section className="py-20 bg-[#0A0A0A]">
          <div className="container">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
              <div>
                <p className="text-[#E85D04] text-xs font-bold tracking-[0.3em] uppercase mb-2">From the bay</p>
                <h2 className="font-['Bebas_Neue',sans-serif] text-4xl md:text-5xl text-white">RECENT PPF INSTALLS IN CHANTILLY</h2>
              </div>
              <Link href="/gallery" className="text-[#E85D04] text-xs font-bold tracking-widest uppercase hover:text-white inline-flex items-center gap-2">Full gallery <ArrowRight className="w-3 h-3" /></Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-zinc-800">
              {jobs.map((p) => (
                <Link key={p.id} href={`/gallery/${p.slug}`} className="block bg-[#0A0A0A] group">
                  <figure>
                    <img src={p.photoUrl} srcSet={responsiveImage(p.photoUrl).srcSet} sizes="(min-width: 768px) 25vw, 50vw" alt={`${p.alt} at Skyline Customs in Chantilly, VA`} loading="lazy" decoding="async" width="600" height="450" className="w-full aspect-[4/3] object-cover group-hover:opacity-90 transition-opacity" />
                    <figcaption className="text-zinc-400 text-xs p-3"><span className="text-white font-semibold">{p.car}</span> · {p.services.join(" + ")}</figcaption>
                  </figure>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Videos */}
      {videos.length > 0 && (
        <section className="py-20 bg-[#0D0D0D] overflow-hidden">
          <div className="container">
            <p className="text-[#E85D04] text-xs font-bold tracking-[0.3em] uppercase mb-2">Watch</p>
            <h2 className="font-['Bebas_Neue',sans-serif] text-4xl md:text-5xl text-white mb-8">PPF, EXPLAINED IN 60 SECONDS</h2>
            <VideoCarousel videos={videos} preview />
          </div>
        </section>
      )}

      {/* Process */}
      <section className="py-24 bg-[#0A0A0A]">
        <div className="container">
          <div className="mb-16">
            <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">The Skyline Process</p>
            <h2 className="font-['Bebas_Neue',sans-serif] text-5xl md:text-6xl text-white">HOW WE INSTALL PPF</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {process.map((step) => (
              <div key={step.num} className="squircle border border-zinc-800 bg-[#0A0A0A] p-8 hover:bg-[#111] hover:border-zinc-700 transition-colors">
                <span aria-hidden="true" className="font-['Bebas_Neue',sans-serif] text-5xl text-[#E85D04]/70 block mb-4">{step.num}</span>
                <h3 className="font-['Bebas_Neue',sans-serif] text-2xl text-white mb-3">{step.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-[#0D0D0D]">
        <div className="container max-w-3xl">
          <div className="mb-12">
            <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">Common Questions</p>
            <h2 className="font-['Bebas_Neue',sans-serif] text-5xl md:text-6xl text-white">PPF FAQ</h2>
          </div>
          <div className="space-y-px">
            {PPF_PAGE_FAQS.map((faq, i) => (
              <div key={faq.q} className="border-b border-zinc-800">
                <button type="button" onClick={() => setOpenFaq(openFaq === i ? null : i)} aria-expanded={openFaq === i} className="w-full flex items-center justify-between py-6 text-left group">
                  <span className="font-['Bebas_Neue',sans-serif] text-xl text-white group-hover:text-[#E85D04] transition-colors pr-4">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-[#E85D04] shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                {openFaq === i && <p className="text-zinc-400 text-sm leading-relaxed pb-6">{faq.a}</p>}
              </div>
            ))}
          </div>
          <p className="text-zinc-400 text-sm mt-8">More answers on the <Link href="/faq" className="text-[#E85D04] underline hover:text-white">full FAQ page</Link>, or read <Link href="/ppf-vs-ceramic-coating" className="text-[#E85D04] underline hover:text-white">PPF vs ceramic coating</Link>.</p>
        </div>
      </section>

      <Testimonials title="WHAT PPF CUSTOMERS SAY" />

      {/* CTA */}
      <section className="py-24 bg-[#E85D04]">
        <div className="container text-center">
          <h2 className="font-['Bebas_Neue',sans-serif] text-5xl md:text-7xl text-white mb-4">PROTECT IT BEFORE THE FIRST CHIP</h2>
          <p className="text-black/90 text-lg mb-10 max-w-xl mx-auto">Send us the year, make, and model. We reply with exact pricing, usually within the hour, and book you into the bay.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/get-a-quote?service=ppf" className="bg-black text-white hover:bg-zinc-900 font-bold tracking-widest uppercase px-10 py-4 transition-all duration-200 hover:scale-105 inline-flex items-center gap-2">
              GET MY PPF QUOTE <ArrowRight className="w-4 h-4" />
            </Link>
            <a href="tel:+17037754383" className="border-2 border-black/70 text-black hover:bg-black hover:text-white font-bold tracking-widest uppercase px-10 py-4 transition-all duration-200 inline-flex items-center gap-2">
              <Phone className="w-4 h-4" /> CALL (703) 775-4383
            </a>
          </div>
        </div>
      </section>

      <LocalBanner localHref="/service-areas" serviceName="PPF" />

      {/* Tesla owners */}
      <section className="py-12 bg-[#0A0A0A] border-t border-zinc-800">
        <div className="container flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <p className="text-[#E85D04] text-xs font-bold tracking-[0.3em] uppercase mb-2">Tesla Owners</p>
            <h2 className="font-['Bebas_Neue',sans-serif] text-3xl md:text-4xl text-white">MODEL 3, Y, S, X & CYBERTRUCK COVERAGE</h2>
            <p className="text-zinc-400 mt-2 max-w-xl">Model-specific diagrams, pricing, and answers on Autopilot sensors and Tesla's own PPF kit.</p>
          </div>
          <Link href="/tesla-ppf" className="bg-[#E85D04] hover:bg-[#d14e00] text-black font-bold tracking-widest uppercase px-8 py-4 inline-flex items-center gap-2 transition-colors self-start md:self-auto">
            TESLA PPF PAGE <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <VehicleLinks />
      <NearMeBlock service="ppf" />
      <CompareLinks />

      {/* PPF reading */}
      <section className="py-10 bg-[#0D0D0D] border-t border-zinc-800">
        <div className="container">
          <p className="text-zinc-400 text-xs font-bold tracking-[0.3em] uppercase mb-4">Keep reading about PPF</p>
          <div className="flex flex-wrap gap-3">
            {[
              { href: "/ppf-cost", label: "What goes into a PPF quote" },
              { href: "/blog/how-long-does-ppf-last-northern-virginia", label: "How long PPF lasts" },
              { href: "/blog/self-healing-ppf-northern-virginia", label: "Self-healing PPF explained" },
              { href: "/blog/how-to-wash-and-care-for-ppf", label: "How to wash and care for PPF" },
              { href: "/blog/ppf-paint-protection-film-northern-virginia", label: "Is PPF worth it?" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="border border-zinc-700 hover:border-[#E85D04] text-zinc-300 hover:text-white text-sm px-4 py-2 transition-colors">{l.label}</Link>
            ))}
          </div>
        </div>
      </section>

      <ServiceCityLinks service="ppf" />
      <Footer />
      {promoLive && <ExitPrompt promoTitle={promo!.title ?? ""} promoTag={promoTagFor(promo!.title ?? "", promo!.slug ?? "promo")} />}

      {/* The special's button stays on screen while reading, on every screen size; it steps aside while the hero button is in view */}
      {promoLive && (
        <>
          <div data-sticky-bar className={`fixed bottom-0 left-0 right-0 z-50 bg-[#0A0A0A] border-t border-zinc-800 shadow-2xl transition-transform duration-300 ${heroCtaVisible ? "translate-y-full" : "translate-y-0"}`} aria-hidden={heroCtaVisible}>
            <div className="container max-w-6xl p-3 md:py-3 flex items-center gap-3 md:gap-6">
              <div className="flex-1 min-w-0 leading-tight">
                <p className="text-[11px] md:text-sm font-bold truncate"><span className="text-white">{promoPriceTxt}</span><span className="text-zinc-400"> · </span><span className="text-[#E85D04]">{promo!.title}</span></p>
                <p className="text-zinc-400 text-[11px] md:text-xs mt-0.5 truncate">{promoRemaining} spots left{promo!.endDate && timeLeftLabel(promo!.endDate) ? ` · ${timeLeftLabel(promo!.endDate)}` : ""}<span className="hidden md:inline"> · STEK DYNOshield, 12-year warranty</span></p>
              </div>
              <a href="tel:+17037754383" className="hidden md:inline-flex items-center gap-2 text-zinc-300 hover:text-white text-sm font-semibold whitespace-nowrap">(703) 775-4383</a>
              <Link href="/promo" data-cta="ppf-sticky" tabIndex={heroCtaVisible ? -1 : 0} className="shrink-0 bg-[#E85D04] text-black font-['Bebas_Neue',sans-serif] text-base md:text-xl tracking-widest px-4 md:px-8 py-3 hover:bg-orange-600 transition-colors whitespace-nowrap">CLAIM <span className="hidden md:inline">MY </span>SPOT</Link>
            </div>
          </div>
          <div className="h-16" aria-hidden="true" />
        </>
      )}
    </div>
  );
}
