/**
 * Spanish service pages (/es/ppf, /es/recubrimiento-ceramico, /es/polarizado).
 * Copy lives in @/lib/es.ts. Each page points at its English twin with hreflang.
 */
import { useState } from "react";
import { Link } from "wouter";
import { ArrowRight, CheckCircle, ChevronDown, Phone, Shield, Droplets, Sun, Wrench, Languages } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import Testimonials from "@/components/Testimonials";
import QuoteFormEs from "@/components/QuoteFormEs";
import { ES_PAGES, ES_UI, type EsServicePage } from "@/lib/es";
import { trpc } from "@/lib/trpc";

const BASE_URL = "https://www.skylinecustomshop.com";
const ICONS = [Shield, Droplets, Sun, Wrench];
const SERVICE_VALUE = { ppf: "PPF", ceramic: "Ceramic Coating", tint: "Tints" } as const;
const SERVICE_NAME = { ppf: "Paint Protection Film", ceramic: "Ceramic Coating", tint: "Window Tinting" } as const;

export default function SpanishServicePage({ data }: { data: EsServicePage }) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const { data: promo } = trpc.promo.getActive.useQuery();
  const canonical = `${BASE_URL}${data.path}`;
  const others = ES_PAGES.filter((p) => p.path !== data.path);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <SEO
        title={data.title}
        description={data.description}
        canonical={canonical}
        lang="es"
        alternates={[{ lang: "en", href: data.enPath }, { lang: "es", href: data.path }, { lang: "x-default", href: data.enPath }]}
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": SERVICE_NAME[data.service],
            "name": data.h1,
            "description": data.description,
            "url": canonical,
            "inLanguage": "es",
            "areaServed": ["Northern Virginia", "Maryland", "Washington, DC"],
            "provider": { "@type": "AutoBodyShop", "name": "Skyline Customs", "telephone": "+1-703-775-4383", "address": { "@type": "PostalAddress", "streetAddress": "4215 Walney Rd Suite 1A & B", "addressLocality": "Chantilly", "addressRegion": "VA", "postalCode": "20151", "addressCountry": "US" } },
          },
          { "@context": "https://schema.org", "@type": "FAQPage", "inLanguage": "es", "mainEntity": data.faqs.map((f) => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } })) },
        ]}
      />
      <Navbar />
      <main lang="es">
        {/* Hero */}
        <section className="pt-32 pb-14 bg-[#0A0A0A]">
          <div className="container max-w-5xl">
            <div className="flex flex-wrap items-center gap-3 mb-6 text-xs">
              <Link href={data.enPath} className="inline-flex items-center gap-1.5 border border-zinc-700 hover:border-[#E85D04] text-zinc-300 hover:text-white px-3 py-1.5 transition-colors"><Languages className="w-3.5 h-3.5 text-[#E85D04]" /> {ES_UI.common.readInEnglish}</Link>
              {others.map((p) => (
                <Link key={p.path} href={p.path} className="border border-zinc-800 hover:border-[#E85D04] text-zinc-400 hover:text-white px-3 py-1.5 transition-colors">{ES_UI.nav[p.service]}</Link>
              ))}
              <Link href="/es/promo" className="border border-[#E85D04]/50 text-[#E85D04] hover:bg-[#E85D04]/10 px-3 py-1.5 transition-colors font-bold">{ES_UI.nav.promo}</Link>
            </div>
            <p className="text-[#E85D04] text-xs font-bold tracking-[0.3em] uppercase mb-3">{data.eyebrow}</p>
            <h1 className="font-['Bebas_Neue',sans-serif] text-5xl md:text-7xl lg:text-8xl text-white leading-none mb-6">{data.h1}</h1>
            {data.intro.map((p) => (
              <p key={p.slice(0, 30)} className="text-zinc-300 text-lg leading-relaxed max-w-3xl mb-4">{p}</p>
            ))}
            <p className="text-zinc-400 text-sm max-w-3xl">{ES_UI.common.shopLine}</p>
            <div className="flex flex-wrap gap-3 mt-8">
              <a href="#cotizar" className="bg-[#E85D04] hover:bg-[#d14e00] text-black font-bold tracking-widest uppercase px-8 py-4 transition-colors inline-flex items-center gap-2">{ES_UI.common.getQuote} <ArrowRight className="w-4 h-4" /></a>
              <a href="tel:+17037754383" className="border border-zinc-700 hover:border-[#E85D04] text-white font-bold tracking-widest uppercase px-8 py-4 inline-flex items-center gap-2 transition-colors"><Phone className="w-4 h-4" /> {ES_UI.common.call}</a>
            </div>
          </div>
        </section>

        {/* Promo strip for Spanish readers */}
        {promo?.title && data.service === "ppf" && (
          <section className="bg-[#E85D04] text-black">
            <div className="container max-w-5xl py-4 flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
              <p className="font-display text-xl tracking-wide">{promo.title}: {ES_UI.nav.promo}</p>
              <Link href="/es/promo" className="md:ml-auto inline-flex items-center gap-2 bg-black text-white font-display text-base tracking-widest uppercase px-5 py-2.5 hover:bg-zinc-900 transition-colors">{ES_UI.nav.promo} <ArrowRight className="w-4 h-4" /></Link>
            </div>
          </section>
        )}

        {/* Benefits */}
        <section className="py-16 bg-[#0D0D0D] border-t border-zinc-800">
          <div className="container max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-zinc-800">
              {data.included.map((b, i) => {
                const Icon = ICONS[i % ICONS.length];
                return (
                  <div key={b.title} className="bg-[#0D0D0D] p-6">
                    <Icon className="w-5 h-5 text-[#E85D04] mb-3" />
                    <h2 className="text-white font-bold mb-2">{b.title}</h2>
                    <p className="text-zinc-400 text-sm leading-relaxed">{b.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Packages */}
        <section className="py-16 bg-[#0A0A0A] border-t border-zinc-800">
          <div className="container max-w-5xl">
            <h2 className="font-['Bebas_Neue',sans-serif] text-4xl md:text-5xl text-white mb-8">{data.service === "ppf" ? "TRES PAQUETES" : data.service === "ceramic" ? "DOS RECUBRIMIENTOS" : "OPCIONES DE POLARIZADO"}</h2>
            <div className={`grid grid-cols-1 gap-4 ${data.packages.length === 2 ? "md:grid-cols-2" : data.packages.length === 4 ? "md:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-3"}`}>
              {data.packages.map((p, i) => (
                <div key={p.name} className={`relative border p-6 bg-[#111] ${data.service === "ppf" && i === 1 ? "border-[#E85D04]" : "border-zinc-800"}`}>
                  {data.service === "ppf" && i === 1 && <div className="absolute -top-3 left-6 bg-[#E85D04] text-black text-xs font-bold tracking-widest uppercase px-3 py-1">El más elegido</div>}
                  <h3 className="font-['Bebas_Neue',sans-serif] text-3xl text-white mb-3">{p.name}</h3>
                  <p className="text-zinc-300 text-sm leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
            <p className="text-zinc-400 text-sm mt-6">{ES_UI.common.deposit} {ES_UI.common.payPlans}</p>
          </div>
        </section>

        {/* Process */}
        <section className="py-16 bg-[#0D0D0D] border-t border-zinc-800">
          <div className="container max-w-5xl">
            <h2 className="font-['Bebas_Neue',sans-serif] text-4xl md:text-5xl text-white mb-8">ASÍ TRABAJAMOS</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-zinc-800">
              {data.process.map((st, i) => (
                <div key={st.title} className="bg-[#0D0D0D] p-5 md:p-6">
                  <div className="font-display text-4xl text-[#E85D04] mb-3">0{i + 1}</div>
                  <h3 className="font-['Bebas_Neue',sans-serif] text-xl md:text-2xl text-white mb-2">{st.title}</h3>
                  <p className="text-zinc-400 text-xs md:text-sm leading-relaxed">{st.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-[#0A0A0A] border-t border-zinc-800">
          <div className="container max-w-3xl">
            <h2 className="font-['Bebas_Neue',sans-serif] text-4xl text-white mb-8">PREGUNTAS FRECUENTES</h2>
            <div className="divide-y divide-zinc-800 border-y border-zinc-800">
              {data.faqs.map((f, i) => (
                <div key={f.q}>
                  <button type="button" onClick={() => setOpenFaq(openFaq === i ? null : i)} aria-expanded={openFaq === i} className="w-full flex items-center justify-between gap-4 py-5 text-left text-white font-semibold">
                    <span>{f.q}</span>
                    <ChevronDown className={`w-5 h-5 text-[#E85D04] shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                  </button>
                  <div className={openFaq === i ? "pb-5" : "hidden"}>
                    <p className="text-zinc-400 leading-relaxed">{f.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Testimonials title={ES_UI.common.reviews} focus={[data.service]} />

        {/* Quote form */}
        <section id="cotizar" className="py-16 md:py-24 bg-[#140C07] border-y border-[#E85D04]/30 scroll-mt-20">
          <div className="container max-w-6xl grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
            <div className="lg:col-span-2">
              <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">{ES_UI.form.title}</p>
              <h2 className="font-['Bebas_Neue',sans-serif] text-5xl text-white leading-none mb-5">{data.cta.heading}</h2>
              <p className="text-zinc-300 leading-relaxed mb-6">{data.cta.text}</p>
              <ul className="space-y-3 text-sm text-zinc-300">
                {[ES_UI.form.sub, ES_UI.common.deposit, ES_UI.common.payPlans, ES_UI.common.serves].map((line) => (
                  <li key={line} className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-[#E85D04] mt-0.5 shrink-0" />{line}</li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-3">
              <QuoteFormEs ui={ES_UI.form} service={SERVICE_VALUE[data.service]} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
