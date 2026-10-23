/**
 * /exotic-car-ceramic-coating: ceramic coating for exotic, luxury, and
 * performance cars across the DMV. Copy lives in @/lib/exoticCeramic.ts.
 */
import { useState } from "react";
import { Link } from "wouter";
import { ArrowRight, ChevronDown, Phone, CheckCircle, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";
import Testimonials from "@/components/Testimonials";
import CeramicPromoBanner from "@/components/CeramicPromoBanner";
import CompareLinks from "@/components/CompareLinks";
import { EXOTIC_CERAMIC } from "@/lib/exoticCeramic";
import { trpc } from "@/lib/trpc";
import { withJobSlugs } from "@shared/galleryJobs";
import { responsiveImage } from "@/lib/responsiveImage";

const BASE_URL = "https://www.skylinecustomshop.com";

export default function ExoticCeramic() {
  const d = EXOTIC_CERAMIC;
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const canonical = `${BASE_URL}${d.path}`;
  const { data: photos } = trpc.site.gallery.useQuery(undefined, { staleTime: 10 * 60 * 1000 });
  const all = withJobSlugs(photos ?? []);
  const anyBrand = (alt: string) => d.brands.some((b) => b.match.test(alt));
  // Real customer cars: exotic or performance models first, coated ones first within that.
  const jobs = [
    ...all.filter((p) => anyBrand(p.alt) && /ceramic/i.test(p.alt)),
    ...all.filter((p) => anyBrand(p.alt) && !/ceramic/i.test(p.alt)),
  ].slice(0, 6);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <SEO
        title={d.title}
        description={d.description}
        canonical={canonical}
        ogImage={d.hero}
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Automotive ceramic coating",
            "name": "Exotic and luxury car ceramic coating",
            "description": d.description,
            "url": canonical,
            "areaServed": ["Northern Virginia", "Washington, DC", "Maryland", "Chantilly, VA", "McLean, VA", "Tysons, VA", "Bethesda, MD"],
            "provider": { "@type": "AutoBodyShop", "name": "Skyline Customs", "telephone": "+1-703-775-4383", "url": BASE_URL, "address": { "@type": "PostalAddress", "streetAddress": "4215 Walney Rd Suite 1A & B", "addressLocality": "Chantilly", "addressRegion": "VA", "postalCode": "20151", "addressCountry": "US" } },
          },
          { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": d.faqs.map((f) => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } })) },
          { "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": `${BASE_URL}/` },
            { "@type": "ListItem", "position": 2, "name": "Ceramic Coating", "item": `${BASE_URL}/services/ceramic-coating` },
            { "@type": "ListItem", "position": 3, "name": "Exotic & Luxury Ceramic Coating", "item": canonical },
          ] },
        ]}
      />
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-16 overflow-hidden">
          <div className="absolute inset-0">
            <img src={d.hero} srcSet={responsiveImage(d.hero).srcSet} sizes="100vw" alt="" aria-hidden="true" className="w-full h-full object-cover opacity-25" fetchPriority="high" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/80 to-[#0A0A0A]/40" />
          </div>
          <div className="container relative z-10 max-w-5xl">
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Ceramic Coating", href: "/services/ceramic-coating" }, { label: "Exotic & Luxury" }]} className="text-white/60 mb-6" />
            <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">{d.eyebrow} · Serving the DMV</p>
            <h1 className="font-['Bebas_Neue',sans-serif] text-6xl md:text-8xl lg:text-9xl leading-none mb-6">
              <span className="block text-white">{d.h1[0]}</span>
              <span className="block text-[#E85D04]">{d.h1[1]}</span>
            </h1>
            {d.intro.map((p) => <p key={p.slice(0, 30)} className="text-zinc-300 text-lg md:text-xl leading-relaxed max-w-3xl mb-5">{p}</p>)}
            <div className="flex flex-wrap gap-3 mb-8">
              {["Paint correction first", "Gtechniq Crystal Serum Ultra, 7-year warranty", "Matte & Frozen safe", "Indoors start to finish"].map((b) => (
                <span key={b} className="flex items-center gap-1.5 text-sm text-zinc-300 border border-zinc-700 px-3 py-1.5"><CheckCircle className="w-3.5 h-3.5 text-[#E85D04]" />{b}</span>
              ))}
            </div>
            <div className="flex flex-wrap gap-4">
              <Link href="/get-a-quote?service=ceramic" data-cta="exotic-ceramic-hero" className="cta bg-[#E85D04] hover:bg-[#d14e00] text-black font-bold tracking-widest uppercase px-8 py-4 transition-colors inline-flex items-center gap-2">
                Get an exact quote <ArrowRight className="w-4 h-4" />
              </Link>
              <a href="tel:+17037754383" className="border border-zinc-600 hover:border-[#E85D04] text-zinc-300 hover:text-white font-bold tracking-widest uppercase px-8 py-4 transition-colors inline-flex items-center gap-2">
                <Phone className="w-4 h-4" /> (703) 775-4383
              </a>
            </div>
          </div>
        </section>

        <CeramicPromoBanner cta="ceramic-promo-banner-exotic" />

        {/* Brands */}
        <section className="py-20 bg-[#0D0D0D]">
          <div className="container">
            <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">What comes through the bay</p>
            <h2 className="font-['Bebas_Neue',sans-serif] text-5xl md:text-6xl text-white mb-10">THE CARS WE COAT</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-800">
              {d.brands.map((b) => (
                <div key={b.name} className="bg-[#0D0D0D] p-7 hover:bg-[#111] transition-colors flex flex-col">
                  <Sparkles className="w-7 h-7 text-[#E85D04] mb-4" />
                  <h3 className="font-['Bebas_Neue',sans-serif] text-2xl text-white mb-2">{b.name}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed flex-1">{b.note}</p>
                  {b.ppfHref && (
                    <Link href={b.ppfHref} className="text-[#E85D04] text-xs font-bold tracking-widest uppercase hover:text-white mt-4">Pair with {b.name} PPF →</Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Real cars */}
        {jobs.length > 0 && (
          <section className="py-20 bg-[#0A0A0A] border-t border-zinc-800">
            <div className="container">
              <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">Recent work</p>
              <h2 className="font-['Bebas_Neue',sans-serif] text-5xl text-white mb-10">PERFORMANCE CARS, DONE HERE</h2>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {jobs.map((p) => (
                  <figure key={p.photoUrl} className="border border-zinc-800 overflow-hidden group">
                    <img src={p.photoUrl} srcSet={responsiveImage(p.photoUrl).srcSet} sizes="(min-width: 1024px) 33vw, 50vw" alt={`${p.alt} at Skyline Customs in Chantilly, VA`} loading="lazy" decoding="async" className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500" />
                    <figcaption className="p-3 text-xs text-zinc-400">
                      {p.alt}
                      {"slug" in p && <Link href={`/gallery/${p.slug}`} className="ml-2 text-[#E85D04] underline underline-offset-2">See this job</Link>}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Sections */}
        {d.sections.map((s, i) => (
          <section key={s.heading} className={`py-16 ${i % 2 === 0 ? "bg-[#0D0D0D]" : "bg-[#0A0A0A]"} border-t border-zinc-800`}>
            <div className="container max-w-4xl">
              <h2 className="font-['Bebas_Neue',sans-serif] text-4xl md:text-5xl text-white mb-6">{s.heading.toUpperCase()}</h2>
              {s.paragraphs.map((p) => <p key={p.slice(0, 30)} className="text-zinc-300 text-lg leading-relaxed mb-4">{p}</p>)}
            </div>
          </section>
        ))}

        {/* FAQ */}
        <section className="py-20 bg-[#0D0D0D] border-t border-zinc-800">
          <div className="container max-w-3xl">
            <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">FAQ</p>
            <h2 className="font-['Bebas_Neue',sans-serif] text-4xl md:text-5xl text-white mb-10">EXOTIC CERAMIC COATING QUESTIONS</h2>
            <div className="space-y-px">
              {d.faqs.map((f, i) => (
                <div key={f.q} className="bg-[#111] border-l-2 border-transparent hover:border-[#E85D04] transition-colors">
                  <button className="w-full text-left px-6 py-5 flex items-center justify-between gap-4" onClick={() => setOpenFaq(openFaq === i ? null : i)} aria-expanded={openFaq === i}>
                    <span className="text-white font-medium">{f.q}</span>
                    <ChevronDown className={`w-5 h-5 text-[#E85D04] shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                  </button>
                  {openFaq === i && <div className="px-6 pb-5 text-zinc-400 text-sm leading-relaxed">{f.a}</div>}
                </div>
              ))}
            </div>
            <p className="text-zinc-400 text-sm mt-8">
              New to coatings? Read the <Link href="/ceramic-coating-guide" className="text-[#E85D04] underline underline-offset-2">complete ceramic coating guide</Link> or compare it with film in <Link href="/ppf-vs-ceramic-coating" className="text-[#E85D04] underline underline-offset-2">PPF vs ceramic coating</Link>.
            </p>
          </div>
        </section>

        <Testimonials title="WHAT OWNERS SAY ABOUT OUR CERAMIC COATING" focus={["ceramic"]} />

        {/* CTA */}
        <section className="py-20 bg-[#E85D04]">
          <div className="container max-w-3xl text-center">
            <h2 className="font-['Bebas_Neue',sans-serif] text-5xl md:text-6xl text-white mb-4">COATED, CORRECTED, CURED INDOORS</h2>
            <p className="text-black/90 text-lg mb-8 max-w-xl mx-auto">Tell us the car and how it is driven. We reply with an exact price and the next open two-day slot, usually within the hour.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/get-a-quote?service=ceramic" data-cta="exotic-ceramic-cta" className="bg-black hover:bg-zinc-900 text-white font-bold tracking-widest uppercase px-10 py-4 transition-colors inline-flex items-center gap-2">
                Get my exact quote <ArrowRight className="w-4 h-4" />
              </Link>
              <a href="tel:+17037754383" className="border-2 border-black/70 hover:bg-black hover:text-white text-black font-bold tracking-widest uppercase px-10 py-4 transition-colors inline-flex items-center gap-2">
                <Phone className="w-4 h-4" /> Call now
              </a>
            </div>
          </div>
        </section>

        <CompareLinks />
      </main>
      <Footer />
    </div>
  );
}
