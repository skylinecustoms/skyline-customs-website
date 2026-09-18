/**
 * Template for the "X vs Y" decision pages (/ppf-vs-ceramic-coating, /ceramic-vs-carbon-vs-dyed-tint).
 * These target comparison-intent searches and hand the reader to the right service page.
 */
import { useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Check, ChevronDown, Minus, Phone, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";
import Testimonials from "@/components/Testimonials";
import VideoCarousel from "@/components/VideoCarousel";
import { VIDEOS } from "@/lib/videos";

const BASE_URL = "https://www.skylinecustomshop.com";

export type Cell = { text: string; mark?: "yes" | "no" | "partial" };
export interface ComparisonColumn { key: string; name: string; sub: string; href?: string; bestFor: string }
export interface ComparisonRow { label: string; cells: Record<string, Cell> }
export interface Verdict { title: string; body: string; href: string; cta: string }
export interface ComparisonData {
  path: string;
  title: string;
  description: string;
  eyebrow: string;
  h1: string;
  intro: string;
  columns: ComparisonColumn[];
  rows: ComparisonRow[];
  verdicts: Verdict[];
  faqs: { q: string; a: string }[];
  videoIds: string[];
  breadcrumb: string;
  related: { label: string; href: string }[];
}

function Mark({ cell }: { cell: Cell }) {
  const icon =
    cell.mark === "yes" ? <Check className="w-4 h-4 text-green-400 shrink-0" /> :
    cell.mark === "no" ? <X className="w-4 h-4 text-red-400 shrink-0" /> :
    cell.mark === "partial" ? <Minus className="w-4 h-4 text-yellow-400 shrink-0" /> : null;
  return (
    <span className="inline-flex items-start gap-2">
      {icon && <span className="mt-0.5">{icon}</span>}
      <span>{cell.text}</span>
    </span>
  );
}

export default function ComparisonPage({ data }: { data: ComparisonData }) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const canonical = `${BASE_URL}${data.path}`;
  const videos = VIDEOS.filter((v) => data.videoIds.includes(v.id));

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <SEO
        title={data.title}
        description={data.description}
        canonical={canonical}
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": data.h1,
            "description": data.description,
            "url": canonical,
            "author": { "@type": "Organization", "name": "Skyline Customs", "url": BASE_URL },
            "publisher": { "@type": "Organization", "name": "Skyline Customs", "url": BASE_URL, "logo": { "@type": "ImageObject", "url": `${BASE_URL}/favicon-512.png` } },
            "mainEntityOfPage": { "@type": "WebPage", "@id": canonical },
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": data.faqs.map((f) => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } })),
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE_URL },
              { "@type": "ListItem", "position": 2, "name": "Services", "item": `${BASE_URL}/services` },
              { "@type": "ListItem", "position": 3, "name": data.breadcrumb, "item": canonical },
            ],
          },
        ]}
      />
      <Navbar />
      <main>

      {/* Hero */}
      <section className="pt-32 pb-12 bg-[#0A0A0A]">
        <div className="container max-w-4xl">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: data.breadcrumb }]} className="mb-6" />
          <p className="text-[#E85D04] text-xs font-bold tracking-[0.3em] uppercase mb-3">{data.eyebrow}</p>
          <h1 className="font-['Bebas_Neue',sans-serif] text-5xl md:text-7xl text-white leading-none mb-6">{data.h1}</h1>
          <p className="text-zinc-300 text-lg leading-relaxed">{data.intro}</p>
        </div>
      </section>

      {/* Quick answer cards */}
      <section className="pb-12 bg-[#0A0A0A]">
        <div className="container max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-4">
          {data.columns.map((c) => (
            <div key={c.key} className="border border-zinc-800 bg-[#111] p-6">
              <p className="text-zinc-400 text-xs tracking-[0.3em] uppercase mb-1">{c.sub}</p>
              <h2 className="font-['Bebas_Neue',sans-serif] text-3xl text-white">{c.name}</h2>
              <p className="text-zinc-400 text-sm mt-3">{c.bestFor}</p>
              {c.href && (
                <Link href={c.href} className="inline-flex items-center gap-1 text-white text-xs font-bold tracking-widest uppercase mt-4 hover:text-[#E85D04]">
                  Learn more <ArrowRight className="w-3 h-3" />
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Comparison table */}
      <section className="py-16 bg-[#0D0D0D] border-t border-zinc-800">
        <div className="container max-w-5xl">
          <p className="text-[#E85D04] text-xs font-bold tracking-[0.3em] uppercase mb-2">Side by side</p>
          <h2 className="font-['Bebas_Neue',sans-serif] text-4xl md:text-5xl text-white mb-8">THE HONEST COMPARISON</h2>
          <div className="overflow-x-auto -mx-4 px-4">
            <table className="w-full min-w-[640px] text-sm border-collapse">
              <thead>
                <tr className="border-b border-zinc-700">
                  <th className="text-left text-zinc-400 font-normal py-3 pr-4 w-[22%]">Factor</th>
                  {data.columns.map((c) => (
                    <th key={c.key} className="text-left text-white font-bold py-3 pr-4">{c.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.rows.map((r) => (
                  <tr key={r.label} className="border-b border-zinc-800 align-top">
                    <th scope="row" className="text-left text-zinc-300 font-semibold py-4 pr-4">{r.label}</th>
                    {data.columns.map((c) => (
                      <td key={c.key} className="text-zinc-400 py-4 pr-4 leading-relaxed"><Mark cell={r.cells[c.key]} /></td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Verdicts */}
      <section className="py-16 bg-[#0A0A0A] border-t border-zinc-800">
        <div className="container max-w-5xl">
          <p className="text-[#E85D04] text-xs font-bold tracking-[0.3em] uppercase mb-2">Our recommendation</p>
          <h2 className="font-['Bebas_Neue',sans-serif] text-4xl md:text-5xl text-white mb-8">WHICH ONE SHOULD YOU GET?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {data.verdicts.map((v) => (
              <div key={v.title} className="border border-zinc-800 p-6 flex flex-col">
                <h3 className="text-white font-bold text-lg mb-3">{v.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed flex-1">{v.body}</p>
                <Link href={v.href} className="inline-flex items-center gap-2 text-[#E85D04] text-xs font-bold tracking-widest uppercase mt-5 hover:text-white">
                  {v.cta} <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {videos.length > 0 && (
        <section className="py-16 bg-[#0D0D0D] border-t border-zinc-800">
          <div className="container">
            <p className="text-[#E85D04] text-xs font-bold tracking-[0.3em] uppercase mb-2">Watch</p>
            <h2 className="font-['Bebas_Neue',sans-serif] text-4xl md:text-5xl text-white mb-8">SEE THE DIFFERENCE</h2>
            <VideoCarousel videos={videos} preview />
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="py-16 bg-[#0A0A0A] border-t border-zinc-800">
        <div className="container max-w-3xl">
          <p className="text-[#E85D04] text-xs font-bold tracking-[0.3em] uppercase mb-2">Questions</p>
          <h2 className="font-['Bebas_Neue',sans-serif] text-4xl md:text-5xl text-white mb-8">WHAT PEOPLE ASK US</h2>
          <div className="divide-y divide-zinc-800 border-y border-zinc-800">
            {data.faqs.map((f, i) => (
              <div key={f.q}>
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                  className="w-full flex items-center justify-between gap-4 py-5 text-left text-white font-semibold hover:text-[#E85D04] transition-colors"
                >
                  {f.q}
                  <ChevronDown className={`w-5 h-5 shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                {openFaq === i && <p className="pb-5 text-zinc-400 leading-relaxed">{f.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />

      {/* CTA */}
      <section className="py-20 bg-[#E85D04]">
        <div className="container max-w-3xl text-center">
          <h2 className="font-['Bebas_Neue',sans-serif] text-5xl md:text-6xl text-white mb-4">STILL NOT SURE? ASK US.</h2>
          <p className="text-white text-lg mb-8 max-w-xl mx-auto">Tell us the car and how you drive it. We'll recommend the option that actually fits, usually within the hour.</p>
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

      <section className="py-10 bg-[#0A0A0A] border-t border-zinc-800">
        <div className="container">
          <p className="text-zinc-400 text-xs font-bold tracking-[0.3em] uppercase mb-4">Keep reading</p>
          <div className="flex flex-wrap gap-3">
            {data.related.map((r) => (
              <Link key={r.href} href={r.href} className="border border-zinc-700 hover:border-[#E85D04] text-zinc-300 hover:text-white text-sm px-4 py-2 transition-colors">{r.label}</Link>
            ))}
          </div>
        </div>
      </section>

      </main>
      <Footer />
    </div>
  );
}
