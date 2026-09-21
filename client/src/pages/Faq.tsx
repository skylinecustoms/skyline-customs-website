/**
 * SKYLINE CUSTOMS — FAQ hub
 * URL: /faq
 */

import { useState } from "react";
import { Link } from "wouter";
import { ArrowRight, ChevronDown, Phone } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { ALL_FAQS, FAQ_GROUPS } from "@/lib/faqs";

function Accordion({ items, offset }: { items: { q: string; a: string }[]; offset: number }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="space-y-px">
      {items.map((faq, i) => {
        const id = offset + i;
        return (
          <div key={faq.q} className="bg-[#111] border-l-2 border-transparent hover:border-[#E85D04] transition-colors">
            <button
              className="w-full text-left px-6 py-5 flex items-center justify-between gap-4"
              onClick={() => setOpen(open === id ? null : id)}
              aria-expanded={open === id}
            >
              <span className="text-white font-medium">{faq.q}</span>
              <ChevronDown className={`w-5 h-5 text-[#E85D04] shrink-0 transition-transform ${open === id ? "rotate-180" : ""}`} />
            </button>
            <div className={open === id ? "px-6 pb-5 text-zinc-400 text-sm leading-relaxed" : "hidden"}>{faq.a}</div>
          </div>
        );
      })}
    </div>
  );
}

export default function Faq() {
  let offset = 0;
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-['DM_Sans',sans-serif]">
      <SEO
        title="FAQ: PPF, Ceramic Coating & Window Tint | Skyline Customs"
        description="Straight answers on paint protection film, ceramic coating, and window tinting in Chantilly, VA: pricing, how long each lasts, Virginia tint law, care, and warranties."
        canonical="https://www.skylinecustomshop.com/faq"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": ALL_FAQS.map((f) => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } })),
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.skylinecustomshop.com/" },
              { "@type": "ListItem", "position": 2, "name": "FAQ", "item": "https://www.skylinecustomshop.com/faq" },
            ],
          },
        ]}
      />
      <Navbar />

      <section className="relative pt-32 pb-14 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0A] via-[#111] to-[#0a0d0a]" />
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10" style={{ background: "radial-gradient(ellipse at top right, #E85D04, transparent 70%)" }} />
        <div className="container relative z-10">
          <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">Help Center</p>
          <h1 className="font-['Bebas_Neue',sans-serif] text-6xl md:text-8xl leading-none text-white mb-4">
            QUESTIONS,<br /><span className="text-[#E85D04]">ANSWERED</span>
          </h1>
          <p className="text-zinc-300 text-lg max-w-2xl leading-relaxed mb-8">
            Everything Northern Virginia drivers ask us about PPF, ceramic coating, and window tint — pricing, lifespan, Virginia law, and care.
          </p>
          <div className="flex flex-wrap gap-3">
            {FAQ_GROUPS.map((g) => (
              <a key={g.key} href={`#${g.key}`} className="border border-zinc-700 hover:border-[#E85D04] text-zinc-300 hover:text-white text-sm px-4 py-2 transition-colors">
                {g.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      <div className="h-1 bg-[#E85D04]" />

      {FAQ_GROUPS.map((g, i) => {
        const start = offset;
        offset += g.items.length;
        return (
          <section key={g.key} id={g.key} className={`py-20 scroll-mt-24 ${i % 2 === 0 ? "bg-[#0D0D0D]" : "bg-[#0A0A0A]"}`}>
            <div className="container max-w-3xl">
              <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">{g.label}</p>
              <h2 className="font-['Bebas_Neue',sans-serif] text-4xl md:text-5xl text-white mb-3">{g.heading}</h2>
              <p className="text-zinc-400 mb-8">{g.intro}</p>
              <Accordion items={g.items} offset={start} />
              {g.href && (
                <Link href={g.href} className="inline-flex items-center gap-2 mt-6 text-[#E85D04] hover:underline font-medium text-sm">
                  {g.hrefLabel} <ArrowRight className="w-4 h-4" />
                </Link>
              )}
            </div>
          </section>
        );
      })}

      <section className="py-20 bg-[#E85D04]">
        <div className="container max-w-3xl text-center">
          <h2 className="font-['Bebas_Neue',sans-serif] text-5xl md:text-6xl text-white mb-4">STILL HAVE A QUESTION?</h2>
          <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">Call the shop or send a quote request and a real installer will answer, usually within the hour.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/get-a-quote" className="bg-white hover:bg-zinc-100 text-[#E85D04] font-bold tracking-widest uppercase px-10 py-4 inline-flex items-center gap-2 transition-colors">
              GET A FREE QUOTE <ArrowRight className="w-4 h-4" />
            </Link>
            <a href="tel:+17037754383" className="border-2 border-white hover:bg-white/10 text-white font-bold tracking-widest uppercase px-10 py-4 inline-flex items-center gap-2 transition-colors">
              <Phone className="w-4 h-4" /> (703) 775-4383
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
