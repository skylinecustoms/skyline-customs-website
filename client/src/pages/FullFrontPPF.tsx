/**
 * /full-front-ppf: the full front PPF guide, the authority page for the shop's
 * core service. Copy lives in @/lib/fullFrontGuide.ts; this file renders it with
 * a table of contents, the coverage diagram, FAQ, reviews, and links to every
 * city and model PPF page so the guide is the hub of the PPF cluster.
 */
import React, { useState } from "react";
import { Link } from "wouter";
import { ArrowRight, CheckCircle, ChevronDown, Phone, Shield } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";
import Testimonials from "@/components/Testimonials";
import CoverageDiagram from "@/components/CoverageDiagram";
import { FULL_FRONT_GUIDE, type GuideBlock } from "@/lib/fullFrontGuide";
import { PPF_PACKAGES } from "@/lib/ppf";
import { MODEL_PAGES } from "@/lib/modelPages";
import { CITIES, CITY_ORDER, cityPath, cityServices } from "@/lib/localSeo";

const BASE_URL = "https://www.skylinecustomshop.com";
const PATH = "/full-front-ppf";

function renderInline(text: string) {
  const parts: React.ReactNode[] = [];
  const re = /\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*/g;
  let last = 0; let m: RegExpExecArray | null; let k = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    if (m[1] !== undefined) parts.push(<Link key={k++} href={m[2]} className="text-[#E85D04] underline underline-offset-2 decoration-1 hover:decoration-2">{m[1]}</Link>);
    else parts.push(<strong key={k++} className="text-white font-semibold">{m[3]}</strong>);
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

function Block({ b }: { b: GuideBlock }) {
  switch (b.type) {
    case "h3": return <h3 className="font-['Bebas_Neue',sans-serif] text-2xl md:text-3xl text-white mt-8 mb-3 tracking-wide">{b.text}</h3>;
    case "p": return <p className="text-zinc-300 leading-relaxed mb-5">{renderInline(b.text)}</p>;
    case "quote": return <blockquote className="border-l-4 border-[#E85D04] pl-5 my-7 text-white text-lg leading-relaxed italic">{renderInline(b.text)}</blockquote>;
    case "ul": return <ul className="space-y-2 mb-6">{b.items.map((it) => <li key={it.slice(0, 40)} className="flex items-start gap-3 text-zinc-300 leading-relaxed"><CheckCircle className="w-4 h-4 text-[#E85D04] mt-1.5 shrink-0" /><span>{renderInline(it)}</span></li>)}</ul>;
    case "ol": return <ol className="space-y-3 mb-6 list-none counter-reset">{b.items.map((it, i) => <li key={it.slice(0, 40)} className="flex items-start gap-4 text-zinc-300 leading-relaxed"><span className="font-display text-2xl text-[#E85D04] leading-none mt-0.5 w-8 shrink-0">{String(i + 1).padStart(2, "0")}</span><span>{renderInline(it)}</span></li>)}</ol>;
  }
}

/** Plain text of the guide for the Article schema (links stripped). */
const plain = (t: string) => t.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/\*\*/g, "");

export default function FullFrontPPF() {
  const g = FULL_FRONT_GUIDE;
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const canonical = `${BASE_URL}${PATH}`;
  const wordCount = [...g.intro, ...g.sections.flatMap((s) => s.blocks.map((b) => (b.type === "ul" || b.type === "ol" ? b.items.join(" ") : b.text)))].join(" ").split(/\s+/).length;
  const ppfCities = CITY_ORDER.filter((n) => CITIES[n] && cityServices(CITIES[n]).includes("ppf"));
  const fullFront = PPF_PACKAGES.find((p) => p.key === "fullFront");

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <SEO
        title={g.title}
        description={g.description}
        canonical={canonical}
        ogImage="/images/toyota-4runner-trailhunter-2026-full-front-ppf-ceramic-coating-chantilly-va.jpg"
        ogType="article"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "TechArticle",
            "headline": g.h1,
            "description": g.description,
            "about": { "@type": "Service", "name": "Full front paint protection film", "serviceType": "Paint protection film installation", "provider": { "@type": "AutoBodyShop", "name": "Skyline Customs", "telephone": "+1-703-775-4383", "address": { "@type": "PostalAddress", "streetAddress": "4215 Walney Rd Suite 1A & B", "addressLocality": "Chantilly", "addressRegion": "VA", "postalCode": "20151", "addressCountry": "US" } } },
            "wordCount": wordCount,
            "author": { "@type": "Organization", "name": "Skyline Customs", "url": `${BASE_URL}/about` },
            "publisher": { "@type": "Organization", "name": "Skyline Customs", "logo": { "@type": "ImageObject", "url": `${BASE_URL}/favicon-512.png` } },
            "mainEntityOfPage": { "@type": "WebPage", "@id": canonical },
            "articleSection": g.sections.map((s) => s.heading),
            "abstract": plain(g.intro[0]),
          },
          { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": g.faqs.map((f) => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } })) },
          { "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": `${BASE_URL}/` },
            { "@type": "ListItem", "position": 2, "name": "Paint Protection Film", "item": `${BASE_URL}/services/ppf` },
            { "@type": "ListItem", "position": 3, "name": "Full Front PPF Guide", "item": canonical },
          ] },
        ]}
      />
      <Navbar />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-14 bg-[#0A0A0A] relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#E85D04]" />
          <div className="container max-w-5xl">
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Paint Protection Film", href: "/services/ppf" }, { label: "Full Front PPF Guide" }]} className="text-white/60 mb-6" />
            <p className="text-[#E85D04] text-xs font-bold tracking-[0.3em] uppercase mb-3">{g.eyebrow}</p>
            <h1 className="font-['Bebas_Neue',sans-serif] text-5xl md:text-7xl lg:text-8xl text-white leading-none mb-6">{g.h1}</h1>
            {g.intro.map((p) => <p key={p.slice(0, 40)} className="text-zinc-300 text-lg leading-relaxed max-w-3xl mb-4">{renderInline(p)}</p>)}
            <div className="flex flex-wrap gap-3 mt-8">
              <Link href="/get-a-quote?service=ppf" data-cta="guide-quote" className="bg-[#E85D04] hover:bg-[#d14e00] text-black font-bold tracking-widest uppercase px-8 py-4 transition-colors inline-flex items-center gap-2">Get a full front quote <ArrowRight className="w-4 h-4" /></Link>
              <a href="tel:+17037754383" className="border border-zinc-700 hover:border-[#E85D04] text-white font-bold tracking-widest uppercase px-8 py-4 inline-flex items-center gap-2 transition-colors"><Phone className="w-4 h-4" /> (703) 775-4383</a>
            </div>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 mt-8 text-sm text-zinc-400">
              {["STEK DYNOshield, 12-year warranty", "STEK-certified installers, Chantilly, VA", "140+ five-star Google reviews", "Serving the whole DMV"].map((t) => (
                <li key={t} className="flex items-center gap-2"><Shield className="w-4 h-4 text-[#E85D04]" />{t}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* What full front covers: diagram + package list */}
        <section className="py-14 bg-[#0D0D0D] border-y border-zinc-800">
          <div className="container max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <CoverageDiagram className="w-full" />
            <div>
              <p className="text-[#E85D04] text-xs font-bold tracking-[0.3em] uppercase mb-3">What full front PPF covers</p>
              <h2 className="font-['Bebas_Neue',sans-serif] text-4xl md:text-5xl text-white mb-5">EVERYTHING FROM THE A-PILLARS FORWARD</h2>
              <ul className="space-y-2 mb-6">
                {(fullFront?.coverage ?? []).map((c) => <li key={c} className="flex items-start gap-3 text-zinc-300"><CheckCircle className="w-4 h-4 text-[#E85D04] mt-1 shrink-0" />{c}</li>)}
              </ul>
              <p className="text-zinc-400 text-sm">Partial front stops at the leading 18 inches of the hood. Full front extended adds the rockers and door edges. <Link href="/partial-front-vs-full-front-ppf" className="text-[#E85D04] underline underline-offset-2">Compare the three packages.</Link></p>
            </div>
          </div>
        </section>

        {/* Guide body with table of contents */}
        <section className="py-16 md:py-20 bg-[#0A0A0A]">
          <div className="container max-w-6xl grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-12">
            <nav aria-label="In this guide" className="lg:sticky lg:top-24 self-start hidden lg:block">
              <p className="text-[#E85D04] text-xs font-bold tracking-[0.3em] uppercase mb-4">In this guide</p>
              <ol className="space-y-2 border-l border-zinc-800">
                {g.sections.map((s, i) => <li key={s.id}><a href={`#${s.id}`} className="block pl-4 -ml-px border-l border-transparent hover:border-[#E85D04] text-zinc-400 hover:text-white text-sm leading-snug py-0.5">{i + 1}. {s.heading}</a></li>)}
                <li><a href="#faq" className="block pl-4 -ml-px border-l border-transparent hover:border-[#E85D04] text-zinc-400 hover:text-white text-sm py-0.5">{g.sections.length + 1}. Questions</a></li>
              </ol>
            </nav>
            <article className="max-w-3xl">
              {g.sections.map((s, i) => (
                <section key={s.id} id={s.id} className="scroll-mt-28 mb-14">
                  <p className="text-[#E85D04] text-xs font-bold tracking-[0.3em] uppercase mb-2">{String(i + 1).padStart(2, "0")}</p>
                  <h2 className="font-['Bebas_Neue',sans-serif] text-4xl md:text-5xl text-white mb-5 leading-none">{s.heading}</h2>
                  {s.blocks.map((b, j) => <Block key={j} b={b} />)}
                </section>
              ))}
            </article>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-16 bg-[#0D0D0D] border-t border-zinc-800 scroll-mt-24">
          <div className="container max-w-3xl">
            <h2 className="font-['Bebas_Neue',sans-serif] text-4xl md:text-5xl text-white mb-8">FULL FRONT PPF QUESTIONS</h2>
            <div className="divide-y divide-zinc-800 border-y border-zinc-800">
              {g.faqs.map((f, i) => (
                <div key={f.q}>
                  <button type="button" onClick={() => setOpenFaq(openFaq === i ? null : i)} aria-expanded={openFaq === i} className="w-full flex items-center justify-between gap-4 py-5 text-left text-white font-semibold">
                    <span>{f.q}</span>
                    <ChevronDown className={`w-5 h-5 text-[#E85D04] shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                  </button>
                  <div className={openFaq === i ? "pb-5" : "hidden"}><p className="text-zinc-400 leading-relaxed">{f.a}</p></div>
                </div>
              ))}
            </div>
            <p className="text-zinc-400 text-sm mt-6">More answers on the <Link href="/faq" className="text-[#E85D04] underline underline-offset-2">FAQ page</Link>.</p>
          </div>
        </section>

        <Testimonials title="FULL FRONT PPF CUSTOMERS" focus={["ppf"]} />

        {/* Hub links: by vehicle and by city */}
        <section className="py-16 bg-[#0A0A0A] border-t border-zinc-800">
          <div className="container max-w-6xl">
            <h2 className="font-['Bebas_Neue',sans-serif] text-4xl md:text-5xl text-white mb-3">FULL FRONT PPF FOR YOUR CAR</h2>
            <p className="text-zinc-400 mb-6 max-w-2xl">Patterns, panel notes, and real jobs for the models we see most.</p>
            <div className="flex flex-wrap gap-2 mb-12">
              {MODEL_PAGES.map((m) => <Link key={m.slug} href={`/${m.slug}-ppf`} className="border border-zinc-800 hover:border-[#E85D04] text-zinc-300 hover:text-white text-sm px-3 py-1.5 transition-colors">{m.name}</Link>)}
              {[{ href: "/truck-ppf", label: "Trucks" }, { href: "/suv-ppf", label: "SUVs" }, { href: "/ev-ppf", label: "EVs" }].map((b) => <Link key={b.href} href={b.href} className="border border-[#E85D04]/50 text-[#E85D04] hover:bg-[#E85D04]/10 text-sm px-3 py-1.5 transition-colors">{b.label}</Link>)}
            </div>
            <h2 className="font-['Bebas_Neue',sans-serif] text-4xl md:text-5xl text-white mb-3">FULL FRONT PPF NEAR YOU</h2>
            <p className="text-zinc-400 mb-6 max-w-2xl">One shop in Chantilly, drivers from the whole DMV. Drive time and road notes for each area.</p>
            <div className="flex flex-wrap gap-2">
              {ppfCities.map((n) => <Link key={n} href={cityPath("ppf", n)} className="border border-zinc-800 hover:border-[#E85D04] text-zinc-300 hover:text-white text-sm px-3 py-1.5 transition-colors">{n}{CITIES[n].state !== "VA" ? `, ${CITIES[n].state}` : ""}</Link>)}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-[#E85D04] text-black">
          <div className="container max-w-4xl text-center">
            <h2 className="font-['Bebas_Neue',sans-serif] text-5xl md:text-6xl mb-4">READY FOR FULL FRONT PPF?</h2>
            <p className="text-black/80 text-lg mb-8 max-w-2xl mx-auto">Send the year, make, and model and how you drive. You get an exact price, usually within the hour, and a fully refundable 20% deposit holds your day.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/get-a-quote?service=ppf" data-cta="guide-quote-bottom" className="bg-black text-white font-bold tracking-widest uppercase px-8 py-4 inline-flex items-center gap-2 hover:bg-zinc-900 transition-colors">Get a free quote <ArrowRight className="w-4 h-4" /></Link>
              <Link href="/promo" className="border-2 border-black text-black font-bold tracking-widest uppercase px-8 py-4 inline-flex items-center gap-2 hover:bg-black/10 transition-colors">This month's special</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
