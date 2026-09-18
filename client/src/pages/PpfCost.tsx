/**
 * /ppf-cost — "How much does PPF cost in Northern Virginia?"
 * Targets cost/price intent searches and hands the reader to /services/ppf or a quote.
 * Prices come from @/lib/ppf.ts (single source of truth).
 */
import { useState } from "react";
import { Link } from "wouter";
import { ArrowRight, ChevronDown, Phone, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";
import Testimonials from "@/components/Testimonials";
import VehicleLinks from "@/components/VehicleLinks";
import { PPF_PACKAGES, PPF_COST_FACTORS, VEHICLE_CLASSES, priceFor } from "@/lib/ppf";
import { trpc } from "@/lib/trpc";

const BASE_URL = "https://www.skylinecustomshop.com";
const PATH = "/ppf-cost";

const BUNDLES = [
  { name: "Full Front PPF + Ceramic Coating", price: "$3,300", note: "Film on the front, Gtechniq coating on the whole car. Save $150." },
  { name: "Full Front PPF + GeoShield Ceramic Tint", price: "$3,000", note: "Front-end film plus full-car ceramic window tint. Save $75." },
  { name: "Full Front PPF + Ceramic + Tint", price: "$3,750", note: "Our most popular combination. Save $200.", popular: true },
  { name: "Full Vehicle PPF + Ceramic Coating", price: "$6,500", note: "Every panel filmed and coated, tint included. Save $450." },
];

const INCLUDED = [
  "Decontamination wash, iron remover, and clay bar",
  "Paint inspection under high-intensity lighting",
  "Computer-cut STEK DYNOshield patterns for your exact year and model",
  "Wrapped edges on the hood, fenders, and bumper wherever the panel allows",
  "12-year STEK manufacturer warranty and our lifetime craftsmanship warranty",
  "Walk-around inspection with you before payment and a 7-day care guide",
];

const FAQS = [
  { q: "How much does full front PPF cost?", a: "Full front PPF is $2,400 at Skyline Customs on any vehicle, from a Tesla Model 3 to a Cybertruck. It covers the full hood, full front bumper, both fenders, mirrors, headlights, and A-pillars in STEK DYNOshield with a 12-year warranty." },
  { q: "How much does full body PPF cost?", a: "Full-vehicle PPF is $4,500 for a sedan or coupe, $5,500 for an SUV or crossover, and $6,000 for a truck or large SUV. Matte (stealth) film for the whole car is quoted per vehicle." },
  { q: "Why do PPF quotes vary so much between shops?", a: "Film brand, how much of each panel is covered, whether edges are wrapped or cut on the face of the panel, paint correction, and warranty length. A $1,200 'full front' is usually a partial hood with a visible line and a short warranty. Ask any shop which film, which pattern software, and what the warranty covers." },
  { q: "Is a partial front worth it, or should I go full front?", a: "Partial front ($1,800) protects the bumper, the first 18 inches of the hood, and the mirrors, which is where most chips land. Full front ($2,400) adds the rest of the hood, both full fenders, and headlights, and has no film line on the hood. For $600 more, most daily drivers choose full front." },
  { q: "Does the price include paint correction?", a: "The decontamination wash and inspection are included. If the paint has swirls or scratches that would be locked under the film, we quote the correction separately after seeing the car. New cars usually need none." },
  { q: "How do I get an exact price?", a: "Use the quote form with your year, make, model, and the coverage you want, or call (703) 775-4383. We reply with pricing, usually within the hour, and confirm it at the car before any work starts." },
  { q: "Is PPF cheaper than repainting?", a: "A single respray of a bumper with fender blends means downtime, non-factory paint, and a note on the vehicle history, and it can happen more than once over the life of the car. Film costs a known amount once, comes off cleanly, and leaves factory paint underneath." },
  { q: "Do you run PPF specials?", a: "Yes. Our monthly promotion is posted on the promo page and in the pricing section of the PPF page. Full-front installs frequently include a free ceramic coating, and spots are limited each month." },
];

export default function PpfCost() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const { data: promo } = trpc.promo.getActive.useQuery();
  const canonical = `${BASE_URL}${PATH}`;

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <SEO
        title="How Much Does PPF Cost in Northern Virginia? 2026 Paint Protection Film Prices"
        description="PPF cost in Chantilly, VA and Northern Virginia: partial front $1,800, full front $2,400, full front extended $3,200, full vehicle $4,500 to $6,000. What's included, what changes the price, and bundle savings with ceramic coating and tint."
        canonical={canonical}
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "How Much Does PPF Cost in Northern Virginia? (2026 Prices)",
            "description": "Real paint protection film prices from a STEK-certified installer in Chantilly, VA, with what is included and what changes the price.",
            "url": canonical,
            "dateModified": "2026-09-18",
            "author": { "@type": "Organization", "name": "Skyline Customs", "url": `${BASE_URL}/about` },
            "publisher": { "@type": "Organization", "name": "Skyline Customs", "url": BASE_URL, "logo": { "@type": "ImageObject", "url": `${BASE_URL}/favicon-512.png` } },
            "mainEntityOfPage": { "@type": "WebPage", "@id": canonical },
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
              { "@type": "ListItem", "position": 3, "name": "PPF Cost", "item": canonical },
            ],
          },
        ]}
      />
      <Navbar />
      <main>
        {/* Hero + quick answer */}
        <section className="pt-32 pb-12 bg-[#0A0A0A]">
          <div className="container max-w-4xl">
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Paint Protection Film", href: "/services/ppf" }, { label: "PPF Cost" }]} className="mb-6" />
            <p className="text-[#E85D04] text-xs font-bold tracking-[0.3em] uppercase mb-3">PPF pricing · Chantilly, VA</p>
            <h1 className="font-['Bebas_Neue',sans-serif] text-5xl md:text-7xl text-white leading-none mb-6">HOW MUCH DOES PPF COST IN NORTHERN VIRGINIA?</h1>
            <div className="border-l-4 border-[#E85D04] bg-[#111] p-6 mb-6">
              <p className="text-white text-lg leading-relaxed">
                <strong>Short answer:</strong> paint protection film at Skyline Customs runs from <strong>$1,800</strong> for a partial front to <strong>$6,000</strong> for a full truck. Most drivers choose <strong>full front for $2,400</strong>, which covers the hood, bumper, fenders, mirrors, and headlights in STEK DYNOshield with a 12-year warranty.
              </p>
            </div>
            <p className="text-zinc-300 leading-relaxed text-lg">
              These are our real 2026 prices, the same numbers we quote in the shop. They include the prep, the film, the install, and the warranty. The only extras are paint correction on cars that need it and matte film, both quoted after we see the vehicle.
            </p>
          </div>
        </section>

        {/* Price table */}
        <section className="py-16 bg-[#0D0D0D] border-t border-zinc-800">
          <div className="container max-w-5xl">
            <p className="text-[#E85D04] text-xs font-bold tracking-[0.3em] uppercase mb-2">2026 price list</p>
            <h2 className="font-['Bebas_Neue',sans-serif] text-4xl md:text-5xl text-white mb-8">PPF PRICES BY PACKAGE AND VEHICLE</h2>
            {promo && (
              <div className="border border-[#E85D04]/50 bg-[#E85D04]/10 p-4 mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <p className="text-white text-sm"><span className="text-[#E85D04] font-bold uppercase tracking-widest text-xs mr-2">{promo.title}</span>Full-front PPF this month includes a free full-car ceramic coating. Spots are limited.</p>
                <Link href="/promo" className="text-[#E85D04] text-xs font-bold tracking-widest uppercase hover:text-white whitespace-nowrap">Details →</Link>
              </div>
            )}
            <div className="overflow-x-auto -mx-4 px-4">
              <table className="w-full min-w-[640px] text-sm border-collapse">
                <thead>
                  <tr className="border-b border-zinc-700">
                    <th className="text-left text-zinc-400 font-normal py-3 pr-4">Vehicle</th>
                    {PPF_PACKAGES.map((p) => <th key={p.key} className={`text-left py-3 pr-4 ${p.featured ? "text-[#E85D04]" : "text-white"}`}>{p.name}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {VEHICLE_CLASSES.map((c) => (
                    <tr key={c.key} className="border-b border-zinc-800">
                      <th scope="row" className="text-left py-4 pr-4 font-semibold text-white">{c.label}<span className="block text-zinc-400 text-xs font-normal">{c.examples}</span></th>
                      {PPF_PACKAGES.map((p) => <td key={p.key} className={`py-4 pr-4 font-bold ${p.featured ? "text-[#E85D04]" : "text-zinc-200"}`}>{priceFor(p.key, c.key)}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
              {PPF_PACKAGES.map((p) => (
                <div key={p.key} className={`border p-5 ${p.featured ? "border-[#E85D04]" : "border-zinc-800"}`}>
                  <h3 className="text-white font-bold">{p.name} <span className="text-[#E85D04]">{priceFor(p.key, "sedan")}{p.key === "fullVehicle" ? "+" : ""}</span></h3>
                  <ul className="mt-3 space-y-1">
                    {p.coverage.map((c) => <li key={c} className="text-zinc-400 text-xs flex items-start gap-2"><CheckCircle className="w-3 h-3 text-[#E85D04] mt-0.5 shrink-0" />{c}</li>)}
                  </ul>
                  <p className="text-zinc-400 text-xs mt-3">{p.bestFor}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Included */}
        <section className="py-16 bg-[#0A0A0A] border-t border-zinc-800">
          <div className="container max-w-4xl">
            <p className="text-[#E85D04] text-xs font-bold tracking-[0.3em] uppercase mb-2">No surprises</p>
            <h2 className="font-['Bebas_Neue',sans-serif] text-4xl md:text-5xl text-white mb-6">WHAT EVERY PPF PRICE INCLUDES</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {INCLUDED.map((i) => <li key={i} className="flex items-start gap-3 text-zinc-300"><CheckCircle className="w-5 h-5 text-[#E85D04] shrink-0 mt-0.5" />{i}</li>)}
            </ul>
          </div>
        </section>

        {/* Factors */}
        <section className="py-16 bg-[#0D0D0D] border-t border-zinc-800">
          <div className="container max-w-5xl">
            <p className="text-[#E85D04] text-xs font-bold tracking-[0.3em] uppercase mb-2">What moves the number</p>
            <h2 className="font-['Bebas_Neue',sans-serif] text-4xl md:text-5xl text-white mb-8">SIX THINGS THAT CHANGE THE PRICE OF PPF</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-zinc-800">
              {PPF_COST_FACTORS.map((f) => (
                <div key={f.title} className="bg-[#0D0D0D] p-6">
                  <h3 className="text-white font-bold mb-2">{f.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">{f.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bundles */}
        <section className="py-16 bg-[#0A0A0A] border-t border-zinc-800">
          <div className="container max-w-5xl">
            <p className="text-[#E85D04] text-xs font-bold tracking-[0.3em] uppercase mb-2">Bundle and save</p>
            <h2 className="font-['Bebas_Neue',sans-serif] text-4xl md:text-5xl text-white mb-8">PPF + CERAMIC + TINT PACKAGES</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {BUNDLES.map((b) => (
                <div key={b.name} className={`border p-6 flex items-start justify-between gap-4 ${b.popular ? "border-[#E85D04] bg-[#1a0a00]" : "border-zinc-800"}`}>
                  <div>
                    <h3 className="text-white font-bold">{b.name}</h3>
                    <p className="text-zinc-400 text-sm mt-1">{b.note}</p>
                  </div>
                  <p className="text-[#E85D04] font-bold text-xl whitespace-nowrap">{b.price}</p>
                </div>
              ))}
            </div>
            <p className="text-zinc-400 text-sm mt-6">Bundle prices are for sedans without paint correction. See <Link href="/ppf-vs-ceramic-coating" className="text-[#E85D04] underline hover:text-white">PPF vs ceramic coating</Link> if you are deciding between the two.</p>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-[#0D0D0D] border-t border-zinc-800">
          <div className="container max-w-3xl">
            <p className="text-[#E85D04] text-xs font-bold tracking-[0.3em] uppercase mb-2">Pricing questions</p>
            <h2 className="font-['Bebas_Neue',sans-serif] text-4xl md:text-5xl text-white mb-8">PPF COST FAQ</h2>
            <div className="divide-y divide-zinc-800 border-y border-zinc-800">
              {FAQS.map((f, i) => (
                <div key={f.q}>
                  <button type="button" onClick={() => setOpenFaq(openFaq === i ? null : i)} aria-expanded={openFaq === i} className="w-full flex items-center justify-between gap-4 py-5 text-left text-white font-semibold hover:text-[#E85D04] transition-colors">
                    {f.q}
                    <ChevronDown className={`w-5 h-5 shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                  </button>
                  {openFaq === i && <p className="pb-5 text-zinc-400 leading-relaxed">{f.a}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>

        <Testimonials title="WHAT PPF CUSTOMERS SAY" />

        {/* CTA */}
        <section className="py-20 bg-[#E85D04]">
          <div className="container max-w-3xl text-center">
            <h2 className="font-['Bebas_Neue',sans-serif] text-5xl md:text-6xl text-white mb-4">GET YOUR EXACT PPF PRICE</h2>
            <p className="text-white text-lg mb-8 max-w-xl mx-auto">Year, make, model, and the coverage you want. We reply with a number, usually within the hour.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/get-a-quote?service=ppf" className="bg-white hover:bg-zinc-100 text-[#E85D04] font-bold tracking-widest uppercase px-10 py-4 inline-flex items-center gap-2 transition-colors">
                GET A PPF QUOTE <ArrowRight className="w-4 h-4" />
              </Link>
              <a href="tel:+17037754383" className="border-2 border-white hover:bg-white/10 text-white font-bold tracking-widest uppercase px-10 py-4 inline-flex items-center gap-2 transition-colors">
                <Phone className="w-4 h-4" /> (703) 775-4383
              </a>
            </div>
          </div>
        </section>

        <VehicleLinks />

        <section className="py-10 bg-[#0A0A0A] border-t border-zinc-800">
          <div className="container">
            <p className="text-zinc-400 text-xs font-bold tracking-[0.3em] uppercase mb-4">Keep reading</p>
            <div className="flex flex-wrap gap-3">
              {[
                { href: "/services/ppf", label: "PPF packages and process" },
                { href: "/ppf-vs-ceramic-coating", label: "PPF vs ceramic coating" },
                { href: "/blog/full-front-vs-full-body-ppf-what-to-cover", label: "Full front vs full body" },
                { href: "/blog/how-long-does-ppf-last-northern-virginia", label: "How long PPF lasts" },
                { href: "/ppf-chantilly-va", label: "PPF in Chantilly" },
                { href: "/pricing", label: "All pricing" },
              ].map((l) => (
                <Link key={l.href} href={l.href} className="border border-zinc-700 hover:border-[#E85D04] text-zinc-300 hover:text-white text-sm px-4 py-2 transition-colors">{l.label}</Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
