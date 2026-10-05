/**
 * /es/promo: the active special in Spanish. Deal facts (title, price, dates,
 * included services) come from the same promo record as /promo; the copy
 * and the giveaway rules come from @/lib/es.ts.
 */
import { useState } from "react";
import { Link } from "wouter";
import { ArrowRight, CheckCircle, ChevronDown, Gift, Languages, Phone } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import Testimonials from "@/components/Testimonials";
import QuoteFormEs from "@/components/QuoteFormEs";
import DepositBanner from "@/components/DepositBanner";
import { ES_PROMO, ES_UI } from "@/lib/es";
import { promoExtrasFor } from "@/lib/promoExtras";
import { trpc } from "@/lib/trpc";

const BASE_URL = "https://www.skylinecustomshop.com";
const fmt = (n: number) => `$${n.toLocaleString("en-US")}`;

export default function EsPromo() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const { data: promo } = trpc.promo.getActive.useQuery();
  const { giveaway } = promoExtrasFor(promo?.slug);
  const title = promo?.title ?? "Fall Special";
  const slug = promo?.slug ?? "promo";
  const price = Number(promo?.price ?? 0) || 0;
  let included: { name: string; value: string; isFree: boolean }[] = [];
  try { included = promo?.includedServices ? JSON.parse(promo.includedServices) : []; } catch { included = []; }
  const freeValue = included.filter((i) => i.isFree).reduce((s, i) => s + (Number((i.value ?? "").replace(/[^0-9.]/g, "")) || 0), 0);
  const canonical = `${BASE_URL}${ES_PROMO.path}`;
  const note = `Me interesa el ${title}: PPF del frente completo con recubrimiento cerámico incluido. Por favor contáctenme para reservar mi lugar.`;

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <SEO
        title={ES_PROMO.title}
        description={ES_PROMO.description}
        canonical={canonical}
        lang="es"
        alternates={[{ lang: "en", href: ES_PROMO.enPath }, { lang: "es", href: ES_PROMO.path }, { lang: "x-default", href: ES_PROMO.enPath }]}
        jsonLd={[
          { "@context": "https://schema.org", "@type": "FAQPage", "inLanguage": "es", "mainEntity": ES_PROMO.faqs.map((f) => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } })) },
        ]}
      />
      <Navbar />
      <DepositBanner lang="es" />
      <main lang="es">
        {/* Hero */}
        <section className="pt-32 pb-14 bg-[#0A0A0A] relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#E85D04]" />
          <div className="container max-w-6xl">
            <div className="flex flex-wrap items-center gap-3 mb-6 text-xs">
              <Link href={ES_PROMO.enPath} className="inline-flex items-center gap-1.5 border border-zinc-700 hover:border-[#E85D04] text-zinc-300 hover:text-white px-3 py-1.5 transition-colors"><Languages className="w-3.5 h-3.5 text-[#E85D04]" /> {ES_UI.common.readInEnglish}</Link>
              <Link href="/es/ppf" className="border border-zinc-800 hover:border-[#E85D04] text-zinc-400 hover:text-white px-3 py-1.5 transition-colors">{ES_UI.nav.ppf}</Link>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <p className="text-[#E85D04] text-xs font-bold tracking-[0.3em] uppercase mb-3">{ES_PROMO.eyebrow}{promo?.endDate ? ` · ${promo.endDate}` : ""}</p>
                <h1 className="font-['Bebas_Neue',sans-serif] leading-none mb-5">
                  <span className="block text-white text-5xl md:text-7xl">{ES_PROMO.h1[0]}</span>
                  <span className="block text-[#E85D04] text-5xl md:text-7xl">{ES_PROMO.h1[1]}</span>
                </h1>
                <p className="text-zinc-300 text-lg leading-relaxed max-w-lg mb-7">{ES_PROMO.sub}</p>
                <a href="#cotizar" className="inline-flex w-full sm:w-auto items-center justify-center gap-2 bg-[#E85D04] text-black font-display text-xl tracking-[0.1em] uppercase px-8 py-5 hover:bg-orange-600 transition-colors">{ES_PROMO.cta} <ArrowRight className="w-5 h-5" /></a>
                <p className="text-zinc-400 text-xs tracking-wide mt-3">{ES_UI.common.deposit} {ES_UI.common.payPlans}</p>
                {giveaway && (
                  <a href="#sorteo" className="mt-7 flex items-center gap-4 border border-[#E85D04]/50 bg-[#E85D04]/10 text-white px-5 py-4 max-w-lg hover:bg-[#E85D04]/20 transition-colors">
                    <Gift className="w-8 h-8 shrink-0 text-[#E85D04]" strokeWidth={1.75} />
                    <span>
                      <span className="block font-display text-2xl leading-none tracking-wide">{ES_PROMO.giveaway.heading}</span>
                      <span className="block text-sm text-zinc-300 mt-1">{ES_PROMO.giveaway.body}</span>
                    </span>
                  </a>
                )}
              </div>
              <div className="border border-[#E85D04]/40 bg-[#E85D04]/5 p-6 md:p-8">
                <p className="text-[#E85D04] text-xs font-bold tracking-[0.3em] uppercase mb-3">Precio del paquete</p>
                {price > 0 && (
                  <div className="flex items-baseline gap-3 mb-2">
                    {freeValue > 0 && <span className="font-mono-brand text-zinc-400 text-xl line-through">{fmt(price + freeValue)}</span>}
                    <span className="font-display text-[#E85D04] text-6xl leading-none">{fmt(price)}</span>
                  </div>
                )}
                <ul className="space-y-2 text-sm text-zinc-300 mt-4 mb-6">
                  {ES_PROMO.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-[#E85D04] mt-0.5 shrink-0" />{b}</li>
                  ))}
                </ul>
                <a href="#cotizar" className="inline-flex w-full items-center justify-center gap-2 bg-[#E85D04] text-black font-display text-xl tracking-[0.1em] uppercase px-8 py-4 hover:bg-orange-600 transition-colors">{ES_PROMO.cta} <ArrowRight className="w-5 h-5" /></a>
              </div>
            </div>
          </div>
        </section>

        {/* Giveaway */}
        {giveaway && (
          <section id="sorteo" className="py-16 bg-[#0D0D0D] border-t border-zinc-800 scroll-mt-24">
            <div className="container max-w-5xl">
              <h2 className="font-['Bebas_Neue',sans-serif] text-4xl md:text-5xl text-white mb-4">{ES_PROMO.giveaway.heading}</h2>
              <p className="text-zinc-300 leading-relaxed max-w-3xl mb-6">{ES_PROMO.giveaway.body}</p>
              <details className="border border-zinc-800 bg-[#0A0A0A] group">
                <summary className="cursor-pointer list-none px-6 py-4 flex items-center justify-between text-zinc-300 text-sm font-bold tracking-widest uppercase">
                  Reglas oficiales
                  <ChevronDown className="w-4 h-4 text-[#E85D04] transition-transform group-open:rotate-180" />
                </summary>
                <ol className="px-6 pb-6 space-y-2 text-zinc-400 text-sm leading-relaxed list-decimal list-inside">
                  {ES_PROMO.giveaway.rules.map((r) => <li key={r}>{r}</li>)}
                </ol>
              </details>
            </div>
          </section>
        )}

        {/* FAQ */}
        <section className="py-16 bg-[#0A0A0A] border-t border-zinc-800">
          <div className="container max-w-3xl">
            <h2 className="font-['Bebas_Neue',sans-serif] text-4xl text-white mb-8">PREGUNTAS FRECUENTES</h2>
            <div className="divide-y divide-zinc-800 border-y border-zinc-800">
              {ES_PROMO.faqs.map((f, i) => (
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

        <Testimonials title={ES_UI.common.reviews} focus={["ppf", "ceramic"]} />

        {/* Form */}
        <section id="cotizar" className="py-16 md:py-24 bg-[#140C07] border-y border-[#E85D04]/30 scroll-mt-20">
          <div className="container max-w-6xl grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
            <div className="lg:col-span-2">
              <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">{ES_UI.form.title}</p>
              <h2 className="font-['Bebas_Neue',sans-serif] text-5xl text-white leading-none mb-5">{ES_PROMO.formHeading}</h2>
              <p className="text-zinc-300 leading-relaxed mb-6">{ES_PROMO.formIntro}</p>
              <a href="tel:+17037754383" className="inline-flex items-center gap-2 text-zinc-300 hover:text-white text-sm"><Phone className="w-4 h-4 text-[#E85D04]" /> {ES_UI.common.call}</a>
            </div>
            <div className="lg:col-span-3">
              <QuoteFormEs ui={ES_UI.form} service="PPF" promo={{ title, slug, note }} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
