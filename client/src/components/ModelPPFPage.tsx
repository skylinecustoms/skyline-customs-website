/**
 * Template for the model-specific PPF pages (/tesla-model-y-ppf, /cybertruck-ppf, ...).
 * Data lives in @/lib/modelPages.ts. Server-rendered like every other page.
 */
import { useState } from "react";
import { Link } from "wouter";
import { ArrowRight, CheckCircle, ChevronDown, Phone, Shield, Zap, Star, Wrench } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";
import Testimonials from "@/components/Testimonials";
import VideoCarousel from "@/components/VideoCarousel";
import VehicleLinks from "@/components/VehicleLinks";
import { VIDEOS } from "@/lib/videos";
import { PPF_PACKAGES } from "@/lib/ppf";
import type { ModelPage } from "@/lib/modelPages";
import { trpc } from "@/lib/trpc";
import { withJobSlugs } from "@shared/galleryJobs";
import { responsiveImage } from "@/lib/responsiveImage";

const BASE_URL = "https://www.skylinecustomshop.com";
const ICONS = [Shield, Zap, Star, Wrench];

export default function ModelPPFPage({ model }: { model: ModelPage }) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const { data: photos } = trpc.site.gallery.useQuery(undefined, { staleTime: 10 * 60 * 1000 });
  const jobs = withJobSlugs(photos ?? []).filter((p) => model.photoMatch.test(p.alt)).slice(0, 4);
  const videos = VIDEOS.filter((v) => model.videoIds.includes(v.id));
  const path = `/${model.slug}-ppf`;
  const canonical = `${BASE_URL}${path}`;
  const quoteHref = `/get-a-quote?service=ppf&make=${encodeURIComponent(model.make)}&model=${encodeURIComponent(model.name.replace(`${model.make} `, ""))}`;

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-['DM_Sans',sans-serif]">
      <SEO
        title={model.seoTitle}
        description={model.seoDescription}
        canonical={canonical}
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": `${model.name} Paint Protection Film`,
            "name": `${model.name} PPF in Chantilly, VA`,
            "url": canonical,
            "areaServed": { "@type": "State", "name": "Virginia" },
            "provider": { "@type": "AutoBodyShop", "name": "Skyline Custom Shop", "url": BASE_URL, "telephone": "+17037754383" },
            "offers": PPF_PACKAGES.map((p) => ({ "@type": "Offer", "name": `${p.name} PPF (${model.name})`, "url": `${BASE_URL}${quoteHref}` })),
          },
          { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": model.faqs.map((f) => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } })) },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": `${BASE_URL}/` },
              { "@type": "ListItem", "position": 2, "name": "Paint Protection Film", "item": `${BASE_URL}/services/ppf` },
              { "@type": "ListItem", "position": 3, "name": model.brandPage.name, "item": `${BASE_URL}${model.brandPage.href}` },
              { "@type": "ListItem", "position": 4, "name": `${model.name} PPF`, "item": canonical },
            ],
          },
        ]}
      />
      <Navbar />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-14 bg-[#0A0A0A]">
          <div className="container max-w-5xl">
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "PPF", href: "/services/ppf" }, { label: model.brandPage.name, href: model.brandPage.href }, { label: model.name }]} className="mb-6" />
            <p className="text-[#E85D04] text-xs font-bold tracking-[0.3em] uppercase mb-3">{model.eyebrow} · Chantilly, VA</p>
            <h1 className="font-['Bebas_Neue',sans-serif] text-5xl md:text-7xl lg:text-8xl text-white leading-none mb-6">{model.h1}</h1>
            {model.intro.map((p) => (
              <p key={p.slice(0, 30)} className="text-zinc-300 text-lg leading-relaxed max-w-3xl mb-4">{p}</p>
            ))}
            <div className="flex flex-wrap gap-3 mt-8">
              <Link href={quoteHref} className="bg-[#E85D04] hover:bg-[#d14e00] text-black font-bold tracking-widest uppercase px-8 py-4 transition-all duration-200 hover:scale-105 inline-flex items-center gap-2">
                Quote my {model.name.replace(`${model.make} `, "")} <ArrowRight className="w-4 h-4" />
              </Link>
              <a href="tel:+17037754383" className="border border-zinc-700 hover:border-[#E85D04] text-white font-bold tracking-widest uppercase px-8 py-4 inline-flex items-center gap-2 transition-colors">
                <Phone className="w-4 h-4" /> (703) 775-4383
              </a>
            </div>
          </div>
        </section>

        {/* Where it gets hit */}
        <section className="py-16 bg-[#0D0D0D] border-t border-zinc-800">
          <div className="container max-w-5xl">
            <p className="text-[#E85D04] text-xs font-bold tracking-[0.3em] uppercase mb-2">What we see in the bay</p>
            <h2 className="font-['Bebas_Neue',sans-serif] text-4xl md:text-5xl text-white mb-8">WHERE A {model.name.replace(`${model.make} `, "").toUpperCase()} TAKES DAMAGE</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-zinc-800">
              {model.hits.map((h, i) => {
                const Icon = ICONS[i % ICONS.length];
                return (
                  <div key={h.title} className="bg-[#0D0D0D] p-6">
                    <Icon className="w-5 h-5 text-[#E85D04] mb-3" />
                    <h3 className="text-white font-bold mb-2">{h.title}</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">{h.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Coverage on this body */}
        <section className="py-16 bg-[#0A0A0A] border-t border-zinc-800">
          <div className="container max-w-5xl">
            <p className="text-[#E85D04] text-xs font-bold tracking-[0.3em] uppercase mb-2">Three packages</p>
            <h2 className="font-['Bebas_Neue',sans-serif] text-4xl md:text-5xl text-white mb-8">WHAT EACH PACKAGE COVERS ON THE {model.name.replace(`${model.make} `, "").toUpperCase()}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {model.coverage.map((c) => {
                const pkg = PPF_PACKAGES.find((p) => p.key === c.pkg)!;
                return (
                  <div key={c.pkg} className={`relative border p-6 bg-[#111] ${pkg.featured ? "border-[#E85D04]" : "border-zinc-800"}`}>
                    {pkg.featured && <div className="absolute -top-3 left-6 bg-[#E85D04] text-black text-xs font-bold tracking-widest uppercase px-3 py-1">Most chosen</div>}
                    <h3 className="font-['Bebas_Neue',sans-serif] text-3xl text-white">{pkg.name}</h3>
                    <p className="text-zinc-500 text-xs mb-4">{pkg.tagline} · {pkg.installTime}</p>
                    <p className="text-zinc-300 text-sm leading-relaxed mb-4">{c.note}</p>
                    <ul className="space-y-1.5">
                      {pkg.coverage.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-zinc-400 text-xs"><CheckCircle className="w-3.5 h-3.5 text-[#E85D04] mt-0.5 shrink-0" />{item}</li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
            <p className="text-zinc-500 text-sm mt-6">
              Pricing depends on the trim and the coverage you pick. <Link href="/ppf-cost" className="text-[#E85D04] hover:underline">What sets a PPF quote</Link>, or <Link href={quoteHref} className="text-[#E85D04] hover:underline">request yours</Link> and we reply the same business day.
            </p>
          </div>
        </section>

        {/* Model-specific details */}
        <section className="py-16 bg-[#0D0D0D] border-t border-zinc-800">
          <div className="container max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-8">
            {model.details.map((d) => (
              <div key={d.title}>
                <h2 className="font-['Bebas_Neue',sans-serif] text-2xl text-white mb-3">{d.title.toUpperCase()}</h2>
                <p className="text-zinc-400 text-sm leading-relaxed">{d.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Trims */}
        <section className="py-16 bg-[#0A0A0A] border-t border-zinc-800">
          <div className="container max-w-5xl">
            <p className="text-[#E85D04] text-xs font-bold tracking-[0.3em] uppercase mb-2">By trim</p>
            <h2 className="font-['Bebas_Neue',sans-serif] text-4xl text-white mb-6">{model.name.toUpperCase()} TRIMS WE FILM</h2>
            <div className="divide-y divide-zinc-800 border-y border-zinc-800">
              {model.trims.map((t) => (
                <div key={t.name} className="py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <p className="text-white font-semibold">{t.name}</p>
                  <p className="text-zinc-400 text-sm md:text-right">{t.note}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Real jobs */}
        {jobs.length > 0 && (
          <section className="py-16 bg-[#0D0D0D] border-t border-zinc-800">
            <div className="container max-w-5xl">
              <p className="text-[#E85D04] text-xs font-bold tracking-[0.3em] uppercase mb-2">From the bay</p>
              <h2 className="font-['Bebas_Neue',sans-serif] text-4xl text-white mb-8">{model.name.toUpperCase()} WORK WE'VE DONE</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-zinc-800">
                {jobs.map((p) => (
                  <Link key={p.id} href={`/gallery/${p.slug}`} className="block bg-[#0D0D0D] group">
                    <img src={p.photoUrl} srcSet={responsiveImage(p.photoUrl).srcSet} sizes="(min-width: 768px) 25vw, 50vw" alt={`${p.alt} at Skyline Custom Shop in Chantilly, VA`} loading="lazy" decoding="async" width="600" height="450" className="w-full aspect-[4/3] object-cover group-hover:opacity-90 transition-opacity" />
                    <p className="p-3 text-zinc-400 text-xs"><span className="text-white font-semibold">{p.car}</span> · {p.services.join(" + ")}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Videos */}
        {videos.length > 0 && (
          <section className="py-16 bg-[#0A0A0A] border-t border-zinc-800 overflow-hidden">
            <div className="container max-w-5xl">
              <p className="text-[#E85D04] text-xs font-bold tracking-[0.3em] uppercase mb-2">Watch</p>
              <h2 className="font-['Bebas_Neue',sans-serif] text-4xl text-white mb-8">BEFORE YOU BOOK</h2>
              <VideoCarousel videos={videos} preview />
            </div>
          </section>
        )}

        {/* FAQ */}
        <section className="py-16 bg-[#0D0D0D] border-t border-zinc-800">
          <div className="container max-w-3xl">
            <p className="text-[#E85D04] text-xs font-bold tracking-[0.3em] uppercase mb-2">Questions</p>
            <h2 className="font-['Bebas_Neue',sans-serif] text-4xl text-white mb-8">{model.name.toUpperCase()} PPF QUESTIONS</h2>
            <div className="divide-y divide-zinc-800 border-y border-zinc-800">
              {model.faqs.map((f, i) => (
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

        <Testimonials title={`WHAT ${model.make.toUpperCase()} OWNERS SAY ABOUT OUR PPF`} />
        <VehicleLinks current={model.slug} />

        {/* CTA */}
        <section className="py-20 bg-[#E85D04] text-black">
          <div className="container max-w-4xl text-center">
            <h2 className="font-['Bebas_Neue',sans-serif] text-5xl md:text-6xl leading-none mb-4">PROTECT YOUR {model.name.replace(`${model.make} `, "").toUpperCase()} THIS WEEK</h2>
            <p className="text-black/80 text-lg mb-8">Tell us the year and trim. Written quote the same business day, film on in one day at our Chantilly shop.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href={quoteHref} className="bg-black text-white font-bold tracking-widest uppercase px-8 py-4 inline-flex items-center gap-2 hover:bg-zinc-900 transition-colors">Get a free quote <ArrowRight className="w-4 h-4" /></Link>
              <a href="tel:+17037754383" className="border-2 border-black text-black font-bold tracking-widest uppercase px-8 py-4 inline-flex items-center gap-2 hover:bg-black hover:text-white transition-colors"><Phone className="w-4 h-4" /> Call the shop</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
