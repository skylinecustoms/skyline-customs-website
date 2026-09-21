/**
 * Template for the vehicle-specific PPF pages (/bmw-ppf, /porsche-ppf, ...).
 * Data lives in @/lib/modelPpf.ts.
 */

import { useState } from "react";
import { Link } from "wouter";
import { ArrowRight, CheckCircle, ChevronDown, Phone, Shield, Zap, Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";
import Testimonials from "@/components/Testimonials";
import VideoCarousel from "@/components/VideoCarousel";
import { VIDEOS } from "@/lib/videos";
import type { VehicleBrand } from "@/lib/modelPpf";
import VehicleLinks from "@/components/VehicleLinks";
import { trpc } from "@/lib/trpc";
import { withJobSlugs } from "@shared/galleryJobs";
import { responsiveImage } from "@/lib/responsiveImage";

const BASE_URL = "https://www.skylinecustomshop.com";
const ICONS = [Shield, Zap, Star];

export default function VehiclePPFPage({ brand }: { brand: VehicleBrand }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { data: photos } = trpc.site.gallery.useQuery(undefined, { staleTime: 10 * 60 * 1000 });
  const { data: promo } = trpc.promo.getActive.useQuery();
  const jobs = withJobSlugs(photos ?? []).filter((p) => brand.photoMatch.test(p.alt)).slice(0, 4);
  const videos = VIDEOS.filter((v) => brand.videoIds.includes(v.id));
  const path = `/${brand.slug}-ppf`;
  const canonical = `${BASE_URL}${path}`;

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-['DM_Sans',sans-serif]">
      <SEO
        title={brand.seoTitle}
        description={brand.seoDescription}
        canonical={canonical}
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": `${brand.name} Paint Protection Film`,
            "name": `${brand.name} PPF — Chantilly, VA`,
            "url": canonical,
            "areaServed": { "@type": "State", "name": "Virginia" },
            "provider": { "@type": "AutoBodyShop", "name": "Skyline Custom Shop", "url": BASE_URL, "telephone": "+17037754383" },
            "offers": [
              { "@type": "Offer", "name": `Full Front PPF (${brand.name})`, "url": `${BASE_URL}/get-a-quote?service=ppf&make=${encodeURIComponent(brand.name)}` },
              { "@type": "Offer", "name": `Partial Front PPF (${brand.name})`, "url": `${BASE_URL}/get-a-quote?service=ppf&make=${encodeURIComponent(brand.name)}` },
            ],
          },
          { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": brand.faqs.map((f) => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } })) },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": `${BASE_URL}/` },
              { "@type": "ListItem", "position": 2, "name": "Paint Protection Film", "item": `${BASE_URL}/services/ppf` },
              { "@type": "ListItem", "position": 3, "name": `${brand.name} PPF`, "item": canonical },
            ],
          },
        ]}
      />
      <Navbar />

      <section className="relative min-h-[55vh] flex items-end pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0A] via-[#111] to-[#0a0d0a]" />
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 40px, #E85D04 40px, #E85D04 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, #E85D04 40px, #E85D04 41px)" }} />
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10" style={{ background: "radial-gradient(ellipse at top right, #E85D04, transparent 70%)" }} />
        <div className="container relative z-10 pt-32">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Paint Protection Film", href: "/services/ppf" }, { label: `${brand.name} PPF` }]} />
          <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">{brand.models.map((m) => m.name).join(" · ")}</p>
          <h1 className="font-['Bebas_Neue',sans-serif] text-6xl md:text-8xl lg:text-9xl leading-none text-white mb-4">
            {brand.name.toUpperCase()} <br className="hidden md:block" /><span className="text-[#E85D04]">{brand.headline}</span>
          </h1>
          <p className="text-zinc-300 text-lg md:text-xl max-w-2xl leading-relaxed mb-6">{brand.intro}</p>
          <div className="flex flex-wrap gap-3 mb-6">
            {["Free quotes within the hour", "12-Year Warranty", "Computer-cut patterns", "5.0 ★ on Google"].map((b) => (
              <span key={b} className="flex items-center gap-1.5 text-sm text-zinc-300 border border-zinc-700 px-3 py-1.5"><CheckCircle className="w-3.5 h-3.5 text-[#E85D04]" />{b}</span>
            ))}
          </div>
          <div className="flex flex-wrap gap-4">
            <Link href={`/get-a-quote?service=ppf&make=${encodeURIComponent(brand.name)}`} className="bg-[#E85D04] hover:bg-[#d14e00] text-black font-bold tracking-widest uppercase px-8 py-4 transition-all duration-200 hover:scale-105 inline-flex items-center gap-2">
              GET MY {brand.name.toUpperCase()} QUOTE <ArrowRight className="w-4 h-4" />
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
            <Link href="/promo" className="text-[#E85D04] text-sm font-bold uppercase tracking-widest underline underline-offset-2 decoration-1 hover:decoration-2 inline-flex items-center gap-1">See the deal <ArrowRight className="w-3.5 h-3.5" /></Link>
          </div>
        </section>
      )}

      {/* Models */}
      <section className="py-20 bg-[#0D0D0D]">
        <div className="container">
          <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">By model</p>
          <h2 className="font-['Bebas_Neue',sans-serif] text-5xl text-white mb-3">WHAT WE COVER ON YOUR {brand.name.toUpperCase()}</h2>
          <p className="text-zinc-400 max-w-2xl mb-10">All film is STEK DYNOshield, self-healing, with a 12-year warranty. Partial front, full front, and full front extended coverage are available on every model; pricing is by free quote and confirmed at an in-person inspection.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-800">
            {brand.models.map((m) => (
              <div key={m.name} className="bg-[#0D0D0D] p-6 hover:bg-[#111] transition-colors flex flex-col">
                <h3 className="text-white font-semibold text-lg">{m.name}</h3>
                <p className="text-zinc-400 text-sm mt-1 flex-1">{m.note}</p>
                <Link href={`/get-a-quote?service=ppf&make=${encodeURIComponent(brand.name)}&model=${encodeURIComponent(m.name)}`} className="text-[#E85D04] text-xs font-bold tracking-widest uppercase hover:text-white mt-4">Quote my {m.name} →</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reasons */}
      <section className="py-20 bg-[#0A0A0A]">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-px bg-zinc-800">
            {brand.reasons.map((r, i) => { const Icon = ICONS[i % ICONS.length]; return (
              <div key={r.title} className="bg-[#0A0A0A] p-8">
                <Icon className="w-8 h-8 text-[#E85D04] mb-4" />
                <h3 className="font-['Bebas_Neue',sans-serif] text-2xl text-white mb-2">{r.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{r.desc}</p>
              </div>
            ); })}
          </div>
        </div>
      </section>

      {/* Real jobs */}
      {jobs.length > 0 && (
        <section className="py-20 bg-[#0D0D0D]">
          <div className="container">
            <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">From the Bay</p>
            <h2 className="font-['Bebas_Neue',sans-serif] text-5xl text-white mb-8">{brand.name.toUpperCase()}S WE'VE PROTECTED</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-zinc-800">
              {jobs.map((p) => (
                <Link key={p.id} href={`/gallery/${p.slug}`} className="block bg-[#0D0D0D] group">
                  <figure>
                    <img src={p.photoUrl} srcSet={responsiveImage(p.photoUrl).srcSet} sizes="(min-width: 768px) 25vw, 50vw" alt={`${p.alt} at Skyline Custom Shop in Chantilly, VA`} loading="lazy" decoding="async" width="600" height="450" className="w-full aspect-[4/3] object-cover group-hover:opacity-90 transition-opacity" />
                    <figcaption className="p-3 text-zinc-400 text-xs"><span className="text-white font-semibold">{p.car}</span> · {p.services.join(" + ")}</figcaption>
                  </figure>
                </Link>
              ))}
            </div>
            <Link href="/gallery" className="inline-flex items-center gap-2 mt-6 text-[#E85D04] underline underline-offset-2 decoration-1 hover:decoration-2 text-sm font-medium">See the full gallery <ArrowRight className="w-4 h-4" /></Link>
          </div>
        </section>
      )}

      {videos.length > 0 && (
        <section className="py-20 bg-[#0A0A0A] overflow-hidden">
          <div className="container">
            <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">Watch</p>
            <h2 className="font-['Bebas_Neue',sans-serif] text-5xl text-white mb-8">SEE IT DONE</h2>
            <VideoCarousel videos={videos} preview />
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="py-20 bg-[#0D0D0D]">
        <div className="container max-w-3xl">
          <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">FAQ</p>
          <h2 className="font-['Bebas_Neue',sans-serif] text-4xl md:text-5xl text-white mb-10">{brand.name.toUpperCase()} PPF QUESTIONS</h2>
          <div className="space-y-px">
            {brand.faqs.map((faq, i) => (
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

      <Testimonials title={`WHAT ${brand.name.toUpperCase()} OWNERS SAY ABOUT OUR PPF`} />

      <section className="py-20 bg-[#E85D04]">
        <div className="container max-w-3xl text-center">
          <h2 className="font-['Bebas_Neue',sans-serif] text-5xl md:text-6xl text-white mb-4">PROTECT IT BEFORE THE FIRST CHIP</h2>
          <p className="text-white text-lg mb-8 max-w-xl mx-auto">Tell us your model and we'll send exact pricing, usually within the hour.</p>
          <Link href={`/get-a-quote?service=ppf&make=${encodeURIComponent(brand.name)}`} className="bg-white hover:bg-zinc-100 text-[#E85D04] font-bold tracking-widest uppercase px-10 py-4 inline-flex items-center gap-2 transition-colors">
            GET MY FREE QUOTE <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <VehicleLinks current={brand.slug} />

      <Footer />
    </div>
  );
}
