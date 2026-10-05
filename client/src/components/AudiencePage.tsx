/**
 * Template for the audience PPF pages: military bases and federal workplaces
 * (/ppf-fort-belvoir, /ppf-pentagon, ...) and dealer-delivery areas
 * (/new-car-ppf-tysons, ...). Data lives in @/lib/audiencePages.ts.
 */
import { useState } from "react";
import { Link } from "wouter";
import { ArrowRight, CheckCircle, ChevronDown, Phone, Shield, Zap, Star, Wrench, MapPin, Clock, CreditCard } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";
import Testimonials from "@/components/Testimonials";
import VideoCarousel from "@/components/VideoCarousel";
import VehicleLinks from "@/components/VehicleLinks";
import { VIDEOS } from "@/lib/videos";
import { PPF_PACKAGES } from "@/lib/ppf";
import { CITIES, cityPath } from "@/lib/localSeo";
import type { AudiencePage as AudiencePageData } from "@/lib/audiencePages";
import { trpc } from "@/lib/trpc";
import { withJobSlugs } from "@shared/galleryJobs";
import { responsiveImage } from "@/lib/responsiveImage";

const BASE_URL = "https://www.skylinecustomshop.com";
const ICONS = [Shield, Zap, Star, Wrench];
const LOGISTICS_ICONS = [MapPin, Clock, CreditCard];

export default function AudiencePage({ data }: { data: AudiencePageData }) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const { data: photos } = trpc.site.gallery.useQuery(undefined, { staleTime: 10 * 60 * 1000 });
  const jobs = withJobSlugs(photos ?? []).filter((p) => /ppf|film/i.test(p.alt)).slice(0, 4);
  const videos = VIDEOS.filter((v) => data.videoIds.includes(v.id));
  const canonical = `${BASE_URL}${data.path}`;
  const quoteHref = `/get-a-quote?service=ppf`;
  const kindLabel = data.kind === "base" ? "Military & federal" : "New-car delivery";
  const cities = data.nearbyCities.filter((c) => CITIES[c]);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <SEO
        title={data.seoTitle}
        description={data.seoDescription}
        canonical={canonical}
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Paint Protection Film",
            "name": `Full Front PPF for ${data.name} drivers`,
            "description": data.seoDescription,
            "url": canonical,
            "areaServed": [data.name, "Northern Virginia", "Maryland", "Washington, DC"],
            "provider": { "@type": "AutoBodyShop", "name": "Skyline Customs", "telephone": "+1-703-775-4383", "address": { "@type": "PostalAddress", "streetAddress": "4215 Walney Rd Suite 1A & B", "addressLocality": "Chantilly", "addressRegion": "VA", "postalCode": "20151", "addressCountry": "US" } },
          },
          { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": data.faqs.map((f) => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } })) },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE_URL },
              { "@type": "ListItem", "position": 2, "name": "Paint Protection Film", "item": `${BASE_URL}/services/ppf` },
              { "@type": "ListItem", "position": 3, "name": data.name, "item": canonical },
            ],
          },
        ]}
      />
      <Navbar />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-14 bg-[#0A0A0A]">
          <div className="container max-w-5xl">
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "PPF", href: "/services/ppf" }, { label: data.name }]} className="mb-6" />
            <p className="text-[#E85D04] text-xs font-bold tracking-[0.3em] uppercase mb-3">{data.eyebrow} · {kindLabel}</p>
            <h1 className="font-['Bebas_Neue',sans-serif] text-5xl md:text-7xl lg:text-8xl text-white leading-none mb-6">{data.h1}</h1>
            {data.intro.map((p) => (
              <p key={p.slice(0, 30)} className="text-zinc-300 text-lg leading-relaxed max-w-3xl mb-4">{p}</p>
            ))}
            <p className="flex items-start gap-2 text-zinc-400 text-sm max-w-3xl mt-2"><MapPin className="w-4 h-4 text-[#E85D04] mt-0.5 shrink-0" />{data.drive}</p>
            <div className="flex flex-wrap gap-3 mt-8">
              <Link href={quoteHref} className="bg-[#E85D04] hover:bg-[#d14e00] text-black font-bold tracking-widest uppercase px-8 py-4 transition-colors inline-flex items-center gap-2">
                Get my PPF quote <ArrowRight className="w-4 h-4" />
              </Link>
              <a href="tel:+17037754383" className="border border-zinc-700 hover:border-[#E85D04] text-white font-bold tracking-widest uppercase px-8 py-4 inline-flex items-center gap-2 transition-colors">
                <Phone className="w-4 h-4" /> (703) 775-4383
              </a>
            </div>
          </div>
        </section>

        {/* Why this audience */}
        <section className="py-16 bg-[#0D0D0D] border-t border-zinc-800">
          <div className="container max-w-5xl">
            <p className="text-[#E85D04] text-xs font-bold tracking-[0.3em] uppercase mb-2">Why the front end</p>
            <h2 className="font-['Bebas_Neue',sans-serif] text-4xl md:text-5xl text-white mb-8">WHAT {data.name.toUpperCase()} DOES TO YOUR PAINT</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-zinc-800">
              {data.reasons.map((r, i) => {
                const Icon = ICONS[i % ICONS.length];
                return (
                  <div key={r.title} className="bg-[#0D0D0D] p-6">
                    <Icon className="w-5 h-5 text-[#E85D04] mb-3" />
                    <h3 className="text-white font-bold mb-2">{r.title}</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">{r.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Logistics */}
        <section className="py-16 bg-[#0A0A0A] border-t border-zinc-800">
          <div className="container max-w-5xl">
            <p className="text-[#E85D04] text-xs font-bold tracking-[0.3em] uppercase mb-2">How it works for you</p>
            <h2 className="font-['Bebas_Neue',sans-serif] text-4xl md:text-5xl text-white mb-8">DROP-OFF, TIMING, AND PAYING</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {data.logistics.map((l, i) => {
                const Icon = LOGISTICS_ICONS[i % LOGISTICS_ICONS.length];
                return (
                  <div key={l.title}>
                    <Icon className="w-6 h-6 text-[#E85D04] mb-3" />
                    <h3 className="font-['Bebas_Neue',sans-serif] text-2xl text-white mb-3">{l.title.toUpperCase()}</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">{l.body}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Packages */}
        <section className="py-16 bg-[#0D0D0D] border-t border-zinc-800">
          <div className="container max-w-5xl">
            <p className="text-[#E85D04] text-xs font-bold tracking-[0.3em] uppercase mb-2">Three packages</p>
            <h2 className="font-['Bebas_Neue',sans-serif] text-4xl md:text-5xl text-white mb-8">WHAT EACH PACKAGE COVERS</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {data.packages.map((c) => {
                const pkg = PPF_PACKAGES.find((p) => p.key === c.pkg)!;
                return (
                  <div key={c.pkg} className={`relative border p-6 bg-[#111] ${pkg.featured ? "border-[#E85D04]" : "border-zinc-800"}`}>
                    {pkg.featured && <div className="absolute -top-3 left-6 bg-[#E85D04] text-black text-xs font-bold tracking-widest uppercase px-3 py-1">Most chosen</div>}
                    <h3 className="font-['Bebas_Neue',sans-serif] text-3xl text-white">{pkg.name}</h3>
                    <p className="text-zinc-400 text-xs mb-4">{pkg.tagline} · {pkg.installTime}</p>
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
            <p className="text-zinc-400 text-sm mt-6">
              Pricing depends on the vehicle and the coverage you pick. <Link href="/ppf-cost" className="text-[#E85D04] underline underline-offset-2 decoration-1 hover:decoration-2">What sets a PPF quote</Link>, or <Link href={quoteHref} className="text-[#E85D04] underline underline-offset-2 decoration-1 hover:decoration-2">request yours</Link> and we reply with an exact number.
            </p>
          </div>
        </section>

        {/* Real jobs */}
        {jobs.length > 0 && (
          <section className="py-16 bg-[#0A0A0A] border-t border-zinc-800">
            <div className="container max-w-5xl">
              <p className="text-[#E85D04] text-xs font-bold tracking-[0.3em] uppercase mb-2">From the bay</p>
              <h2 className="font-['Bebas_Neue',sans-serif] text-4xl text-white mb-8">RECENT FULL FRONT INSTALLS</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-zinc-800">
                {jobs.map((p) => (
                  <Link key={p.id} href={`/gallery/${p.slug}`} className="block bg-[#0A0A0A] group">
                    <img src={p.photoUrl} srcSet={responsiveImage(p.photoUrl).srcSet} sizes="(min-width: 768px) 25vw, 50vw" alt={`${p.alt} at Skyline Custom Shop in Chantilly, VA`} loading="lazy" decoding="async" width="480" height="360" className="w-full aspect-[4/3] object-cover group-hover:opacity-90 transition-opacity" />
                    <p className="p-3 text-zinc-400 text-xs"><span className="text-white font-semibold">{p.car}</span> · {p.services.join(" + ")}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Videos */}
        {videos.length > 0 && (
          <section className="py-16 bg-[#0D0D0D] border-t border-zinc-800 overflow-hidden">
            <div className="container max-w-5xl">
              <p className="text-[#E85D04] text-xs font-bold tracking-[0.3em] uppercase mb-2">Watch</p>
              <h2 className="font-['Bebas_Neue',sans-serif] text-4xl text-white mb-8">BEFORE YOU BOOK</h2>
              <VideoCarousel videos={videos} preview />
            </div>
          </section>
        )}

        {/* FAQ */}
        <section className="py-16 bg-[#0A0A0A] border-t border-zinc-800">
          <div className="container max-w-3xl">
            <p className="text-[#E85D04] text-xs font-bold tracking-[0.3em] uppercase mb-2">Questions</p>
            <h2 className="font-['Bebas_Neue',sans-serif] text-4xl text-white mb-8">{data.name.toUpperCase()} PPF QUESTIONS</h2>
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

        <Testimonials title={`WHAT DRIVERS NEAR ${data.name.toUpperCase()} SAY ABOUT OUR PPF`} focus={["ppf"]} />

        {/* Nearby city pages */}
        {cities.length > 0 && (
          <section className="py-10 bg-[#0D0D0D] border-t border-zinc-800">
            <div className="container">
              <p className="text-zinc-400 text-xs font-bold tracking-[0.3em] uppercase mb-4">PPF near {data.name}</p>
              <div className="flex flex-wrap gap-3">
                {cities.map((c) => (
                  <Link key={c} href={cityPath("ppf", c)} className="border border-zinc-700 hover:border-[#E85D04] text-zinc-300 hover:text-white text-sm px-4 py-2 transition-colors">
                    PPF in {CITIES[c].name}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
        <VehicleLinks />

        {/* CTA */}
        <section className="py-20 bg-[#E85D04] text-black">
          <div className="container max-w-4xl text-center">
            <h2 className="font-['Bebas_Neue',sans-serif] text-5xl md:text-6xl leading-none mb-4">FILM IT BEFORE THE FIRST CHIP</h2>
            <p className="text-black/80 text-lg mb-8">Tell us the car and the week you want it done. Written quote the same business day, full front on in one day at our Chantilly shop.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href={quoteHref} className="bg-black text-white font-bold tracking-widest uppercase px-8 py-4 inline-flex items-center gap-2 hover:bg-zinc-900 transition-colors">Get a free quote <ArrowRight className="w-4 h-4" /></Link>
              <a href="tel:+17037754383" className="border-2 border-black text-black font-bold tracking-widest uppercase px-8 py-4 inline-flex items-center gap-2 hover:bg-black hover:text-white transition-colors"><Phone className="w-4 h-4" /> (703) 775-4383</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
