/**
 * SKYLINE CUSTOMS — Tesla PPF landing page
 * URL: /tesla-ppf
 * Targets "Tesla PPF Northern Virginia / near me" searches with model-specific
 * coverage diagrams, pricing, and FAQs.
 */

import { useState } from "react";
import { Link } from "wouter";
import { ArrowRight, CheckCircle, ChevronDown, Phone, Shield, Zap, Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import Testimonials from "@/components/Testimonials";
import TeslaPPFDiagram from "@/components/TeslaPPFDiagram";
import VideoCarousel from "@/components/VideoCarousel";
import { VIDEOS } from "@/lib/videos";
import { trpc } from "@/lib/trpc";

const BASE_URL = "https://www.skylinecustomshop.com";

type Pkg = "partial" | "full-front" | "full-front-plus" | "full-vehicle";

const PACKAGES: { key: Pkg; name: string; sub: string; sedan: string; suv: string; truck: string; covers: string[]; popular?: boolean }[] = [
  { key: "partial", name: "Partial Front", sub: "Budget rock-chip defense", sedan: "$1,800", suv: "$1,800", truck: "$1,800", covers: ["Front bumper", "Leading 18\" of hood", "Mirror caps"] },
  { key: "full-front", name: "Full Front", sub: "What most Tesla owners choose", sedan: "$2,400", suv: "$2,400", truck: "$2,400", covers: ["Full hood", "Front bumper", "Both fenders", "Mirrors & headlights", "A-pillars"], popular: true },
  { key: "full-front-plus", name: "Full Front + Rockers", sub: "Adds the panels that catch gravel", sedan: "$2,800", suv: "$2,850", truck: "$2,900", covers: ["Everything in Full Front", "Both rocker panels", "Door cups & edges"] },
  { key: "full-vehicle", name: "Full Vehicle", sub: "Every painted panel", sedan: "$4,500", suv: "$5,500", truck: "$6,000", covers: ["Every exterior panel", "Roof, doors, trunk", "Bumpers front & rear"] },
];

const MODELS = [
  { name: "Model 3", cls: "sedan" as const, note: "Thin single-stage paint; hood and bumper chip fast on Route 28." },
  { name: "Model Y", cls: "suv" as const, note: "Tall front end takes the brunt of highway debris." },
  { name: "Model S", cls: "sedan" as const, note: "Long hood plus wide fenders — full front pays for itself." },
  { name: "Model X", cls: "suv" as const, note: "Falcon doors and big fenders need a shop that cuts by computer." },
  { name: "Cybertruck", cls: "truck" as const, note: "Film keeps stainless free of fingerprints and scuffs." },
];

const FAQS = [
  { q: "Why do Tesla owners get PPF more than anyone else?", a: "Tesla paint is thin and soft compared with most manufacturers, and the front fascia, hood, and fenders show chips within the first few thousand miles on Northern Virginia highways. Film is the only thing that physically stops those chips." },
  { q: "Does PPF void the Tesla warranty?", a: "No. Paint protection film is a removable, non-permanent product that Tesla itself sells kits for. It does not affect the vehicle, battery, or paint warranty." },
  { q: "Is Tesla's own PPF kit good enough?", a: "The Tesla kit covers only the rear wheel arch area and is meant for DIY application. It does nothing for the hood, bumper, fenders, or mirrors where nearly all chips happen. A professional full-front install covers the panels that actually take damage." },
  { q: "Will film interfere with Autopilot cameras or sensors?", a: "No. Our computer-cut patterns are trimmed around every camera, ultrasonic sensor, and the front radar area, so nothing is covered that shouldn't be." },
  { q: "How much does Tesla PPF cost in Northern Virginia?", a: "Full front coverage is $2,400 for any Tesla model. Partial front starts at $1,800, full front plus rockers from $2,800, and full-vehicle coverage from $4,500 for a Model 3 or Model S and $5,500 for a Model Y or Model X. Prices are confirmed at inspection." },
  { q: "Can you PPF a Cybertruck?", a: "Yes. Film on the stainless panels prevents fingerprints, scuffs, and light scratches, and many owners choose a matte or satin film to change the look while protecting the metal. Full-vehicle Cybertruck coverage is $6,000." },
  { q: "How long does a Tesla PPF install take?", a: "Full front is usually one day; full-vehicle coverage takes 2–3 days. Every install starts with a decontamination wash and finishes with our walk-and-pay inspection under high-intensity lighting." },
  { q: "Should I add ceramic coating on top of the film?", a: "Yes — a ceramic coating over PPF keeps the film hydrophobic, protects it from UV and bird droppings, and makes the whole car easier to wash. This month's special includes a full-car ceramic coating with every full-front install." },
];

export default function TeslaPPF() {
  const [pkg, setPkg] = useState<Pkg>("full-front");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { data: promo } = trpc.promo.getActive.useQuery();
  const active = PACKAGES.find((p) => p.key === pkg)!;
  const teslaVideos = VIDEOS.filter((v) => ["dI6_E2HSmmE", "SugVScEKEWM", "euOKAH_QStE", "kfzGx2IROLg"].includes(v.id));

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-['DM_Sans',sans-serif]">
      <SEO
        title="Tesla PPF Northern Virginia | Model 3, Y, S, X & Cybertruck Paint Protection"
        description="Tesla paint protection film in Chantilly, VA. Full front from $2,400 with self-healing STEK DYNOshield, computer-cut for Model 3, Model Y, Model S, Model X, and Cybertruck. 12-year warranty. Free quotes."
        canonical={`${BASE_URL}/tesla-ppf`}
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Tesla Paint Protection Film",
            "name": "Tesla PPF — Chantilly, VA",
            "url": `${BASE_URL}/tesla-ppf`,
            "areaServed": { "@type": "State", "name": "Virginia" },
            "provider": { "@type": "AutoBodyShop", "name": "Skyline Custom Shop", "url": BASE_URL, "telephone": "+17037754383" },
            "offers": PACKAGES.map((p) => ({ "@type": "Offer", "name": `${p.name} PPF (Tesla)`, "price": p.sedan.replace(/[^0-9]/g, ""), "priceCurrency": "USD" })),
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": FAQS.map((f) => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } })),
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": `${BASE_URL}/` },
              { "@type": "ListItem", "position": 2, "name": "Paint Protection Film", "item": `${BASE_URL}/services/ppf` },
              { "@type": "ListItem", "position": 3, "name": "Tesla PPF", "item": `${BASE_URL}/tesla-ppf` },
            ],
          },
        ]}
      />
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-end pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0A] via-[#111] to-[#0a0d0a]" />
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 40px, #E85D04 40px, #E85D04 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, #E85D04 40px, #E85D04 41px)" }} />
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10" style={{ background: "radial-gradient(ellipse at top right, #E85D04, transparent 70%)" }} />
        <div className="container relative z-10 pt-32">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs text-zinc-500 mb-4">
            <Link href="/" className="hover:text-white">Home</Link><span>/</span>
            <Link href="/services/ppf" className="hover:text-white">Paint Protection Film</Link><span>/</span>
            <span className="text-zinc-300">Tesla</span>
          </nav>
          <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">Model 3 · Model Y · Model S · Model X · Cybertruck</p>
          <h1 className="font-['Bebas_Neue',sans-serif] text-6xl md:text-8xl lg:text-9xl leading-none text-white mb-4">
            TESLA<br /><span className="text-[#E85D04]">PPF</span>
          </h1>
          <p className="text-zinc-300 text-lg md:text-xl max-w-2xl leading-relaxed mb-6">
            Tesla paint is thin. Northern Virginia roads are not kind. Self-healing STEK DYNOshield, computer-cut for your exact model, installed in a dust-free bay in Chantilly.
          </p>
          <div className="flex flex-wrap gap-3 mb-6">
            {["Full front from $2,400", "12-Year Warranty", "Cut around every camera & sensor", "5.0 ★ Google Rating"].map((b) => (
              <span key={b} className="flex items-center gap-1.5 text-sm text-zinc-300 border border-zinc-700 px-3 py-1.5"><CheckCircle className="w-3.5 h-3.5 text-[#E85D04]" />{b}</span>
            ))}
          </div>
          <div className="flex flex-wrap gap-4">
            <Link href="/get-a-quote?service=ppf&make=Tesla" className="bg-[#E85D04] hover:bg-[#d14e00] text-white font-bold tracking-widest uppercase px-8 py-4 transition-all duration-200 hover:scale-105 inline-flex items-center gap-2">
              GET MY TESLA QUOTE <ArrowRight className="w-4 h-4" />
            </Link>
            <a href="tel:+17037754383" className="border border-zinc-600 hover:border-[#E85D04] text-zinc-300 hover:text-white font-bold tracking-widest uppercase px-8 py-4 transition-all inline-flex items-center gap-2">
              <Phone className="w-4 h-4" /> (703) 775-4383
            </a>
          </div>
        </div>
      </section>

      <div className="h-1 bg-[#E85D04]" />

      {promo && (
        <section className="bg-[#E85D04]/10 border-b border-[#E85D04]/30">
          <div className="container py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <p className="text-sm text-white"><Zap className="inline w-4 h-4 text-[#E85D04] mr-1.5" /><span className="font-bold">{promo.title}:</span> {promo.tagline}</p>
            <Link href="/promo" className="text-[#E85D04] text-sm font-bold uppercase tracking-widest hover:underline inline-flex items-center gap-1">See the deal <ArrowRight className="w-3.5 h-3.5" /></Link>
          </div>
        </section>
      )}

      {/* Coverage picker */}
      <section className="py-20 bg-[#0D0D0D]">
        <div className="container">
          <div className="mb-10">
            <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">Coverage Options</p>
            <h2 className="font-['Bebas_Neue',sans-serif] text-5xl text-white">PICK YOUR COVERAGE</h2>
            <p className="text-zinc-400 mt-3 max-w-2xl">Orange panels are protected. Tap a package to see exactly what film covers on your Tesla.</p>
          </div>
          <div className="grid lg:grid-cols-5 gap-8 items-start">
            <div className="lg:col-span-2 bg-[#111] border border-zinc-800 p-6 flex items-center justify-center">
              <div className="w-full max-w-[260px]"><TeslaPPFDiagram package={pkg} /></div>
            </div>
            <div className="lg:col-span-3 grid sm:grid-cols-2 gap-px bg-zinc-800">
              {PACKAGES.map((p) => (
                <button key={p.key} type="button" onClick={() => setPkg(p.key)} className={`text-left p-6 transition-colors ${pkg === p.key ? "bg-[#1a0a00] border-l-2 border-[#E85D04]" : "bg-[#0D0D0D] hover:bg-[#111]"}`}>
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <h3 className="font-['Bebas_Neue',sans-serif] text-2xl text-white">{p.name}</h3>
                    {p.popular && <span className="bg-[#E85D04] text-white text-[10px] font-bold tracking-widest px-2 py-1">MOST POPULAR</span>}
                  </div>
                  <p className="text-zinc-500 text-xs mb-3">{p.sub}</p>
                  <p className="font-['Bebas_Neue',sans-serif] text-3xl text-[#E85D04]">{p.sedan}<span className="text-zinc-500 text-sm font-sans ml-2">Model 3 / S</span></p>
                  <p className="text-zinc-400 text-xs">{p.suv} Model Y / X · {p.truck} Cybertruck</p>
                  <ul className="mt-3 space-y-1">
                    {p.covers.map((c) => <li key={c} className="flex items-center gap-2 text-zinc-400 text-xs"><CheckCircle className="w-3 h-3 text-[#E85D04] shrink-0" />{c}</li>)}
                  </ul>
                </button>
              ))}
            </div>
          </div>
          <p className="text-zinc-500 text-sm mt-6">Selected: <span className="text-white font-medium">{active.name}</span>. All prices in STEK DYNOshield, confirmed at in-person inspection. Stealth (matte) film available on request.</p>
        </div>
      </section>

      {/* By model */}
      <section className="py-20 bg-[#0A0A0A]">
        <div className="container">
          <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">Every Tesla</p>
          <h2 className="font-['Bebas_Neue',sans-serif] text-5xl text-white mb-10">WHAT WE SEE ON EACH MODEL</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-px bg-zinc-800">
            {MODELS.map((m) => (
              <div key={m.name} className="bg-[#0A0A0A] p-6 hover:bg-[#111] transition-colors">
                <h3 className="font-['Bebas_Neue',sans-serif] text-2xl text-white mb-2">{m.name}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-4">{m.note}</p>
                <p className="text-[#E85D04] text-sm font-bold">Full front $2,400</p>
                <p className="text-zinc-500 text-xs">Full vehicle {m.cls === "sedan" ? "$4,500" : m.cls === "suv" ? "$5,500" : "$6,000"}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="py-20 bg-[#0D0D0D]">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-px bg-zinc-800">
            {[
              { icon: Shield, title: "STEK DYNOshield", desc: "Self-healing top coat, 12-year manufacturer warranty against yellowing, cracking, and peeling." },
              { icon: Zap, title: "Computer-Cut Patterns", desc: "Model-specific patterns trimmed around cameras, sensors, and the charge port. No blades on your paint." },
              { icon: Star, title: "Walk-and-Pay", desc: "We inspect every edge with you under high-intensity lighting before you pay a dime." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-[#0D0D0D] p-8">
                <Icon className="w-8 h-8 text-[#E85D04] mb-4" />
                <h3 className="font-['Bebas_Neue',sans-serif] text-2xl text-white mb-2">{title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Videos */}
      {teslaVideos.length > 0 && (
        <section className="py-20 bg-[#0A0A0A] overflow-hidden">
          <div className="container">
            <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">Watch</p>
            <h2 className="font-['Bebas_Neue',sans-serif] text-5xl text-white mb-8">TESLA WORK FROM THE BAY</h2>
            <VideoCarousel videos={teslaVideos} preview />
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="py-20 bg-[#0D0D0D]">
        <div className="container max-w-3xl">
          <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">FAQ</p>
          <h2 className="font-['Bebas_Neue',sans-serif] text-4xl md:text-5xl text-white mb-10">TESLA PPF QUESTIONS</h2>
          <div className="space-y-px">
            {FAQS.map((faq, i) => (
              <div key={faq.q} className="bg-[#111] border-l-2 border-transparent hover:border-[#E85D04] transition-colors">
                <button className="w-full text-left px-6 py-5 flex items-center justify-between gap-4" onClick={() => setOpenFaq(openFaq === i ? null : i)} aria-expanded={openFaq === i}>
                  <span className="text-white font-medium">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-[#E85D04] shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                {openFaq === i && <div className="px-6 pb-5 text-zinc-400 text-sm leading-relaxed">{faq.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Testimonials title="WHAT TESLA OWNERS SAY ABOUT OUR PPF" />

      <section className="py-20 bg-[#E85D04]">
        <div className="container max-w-3xl text-center">
          <h2 className="font-['Bebas_Neue',sans-serif] text-5xl md:text-6xl text-white mb-4">PROTECT IT BEFORE THE FIRST CHIP</h2>
          <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">Tell us your model and we'll send exact pricing, usually within the hour.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/get-a-quote?service=ppf&make=Tesla" className="bg-white hover:bg-zinc-100 text-[#E85D04] font-bold tracking-widest uppercase px-10 py-4 inline-flex items-center gap-2 transition-colors">
              GET MY TESLA QUOTE <ArrowRight className="w-4 h-4" />
            </Link>
            <a href="tel:+17037754383" className="border-2 border-white hover:bg-white/10 text-white font-bold tracking-widest uppercase px-10 py-4 inline-flex items-center gap-2 transition-colors">
              <Phone className="w-4 h-4" /> CALL NOW
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
