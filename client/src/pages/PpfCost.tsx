/**
 * /ppf-cost — "How much does PPF cost in Northern Virginia?"
 * Targets cost-intent searches without publishing a price list: explains what
 * sets a quote and hands the reader to the free quote form.
 * Package and factor copy comes from @/lib/ppf.ts.
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
import { PPF_PACKAGES, PPF_COST_FACTORS, VEHICLE_CLASSES } from "@/lib/ppf";
import { trpc } from "@/lib/trpc";

const BASE_URL = "https://www.skylinecustomshop.com";
const PATH = "/ppf-cost";

const BUNDLES = [
  { name: "Full Front PPF + Ceramic Coating", note: "Film on the front, Gtechniq coating on the whole car. Quoted as one package." },
  { name: "Full Front PPF + GeoShield Ceramic Tint", note: "Front-end film plus full-car ceramic window tint." },
  { name: "Full Front PPF + Ceramic + Tint", note: "Our most popular combination: chips, gloss, and heat handled in one visit.", popular: true },
  { name: "Full Vehicle PPF + Ceramic Coating", note: "Every panel filmed and coated for cars you plan to keep." },
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
  { q: "How much does full front PPF cost?", a: "Full front is our most popular package and covers the full hood, full front bumper, both fenders, mirrors, headlights, and A-pillars in STEK DYNOshield with a 12-year warranty. The price depends on your vehicle, so send us the year, make, and model through the free quote form and we reply with an exact number, usually within the hour." },
  { q: "How much does full body PPF cost?", a: "Full-vehicle PPF is quoted by vehicle size, because a truck or large SUV has far more painted area than a coupe. Matte (stealth) film for the whole car is quoted separately. Request a free quote for your exact vehicle." },
  { q: "Why do PPF quotes vary so much between shops?", a: "Film brand, how much of each panel is covered, whether edges are wrapped or cut on the face of the panel, paint correction, and warranty length. A bargain 'full front' is usually a partial hood with a visible line and a short warranty. Ask any shop which film, which pattern software, and what the warranty covers." },
  { q: "Is a partial front worth it, or should I go full front?", a: "Partial front protects the bumper, the first 18 inches of the hood, and the mirrors, which is where most chips land. Full front adds the rest of the hood, both full fenders, and headlights, and has no film line on the hood. Most daily drivers choose full front once they see the difference in coverage." },
  { q: "Does the quote include paint correction?", a: "The decontamination wash and inspection are included. If the paint has swirls or scratches that would be locked under the film, we quote the correction separately after seeing the car. New cars usually need none." },
  { q: "How do I get an exact price?", a: "Use the quote form with your year, make, model, and the coverage you want, or call (703) 775-4383. We reply with pricing, usually within the hour, and confirm it at the car before any work starts." },
  { q: "Is PPF cheaper than repainting?", a: "A single respray of a bumper with fender blends means downtime, non-factory paint, and a note on the vehicle history, and it can happen more than once over the life of the car. Film is a known cost once, comes off cleanly, and leaves factory paint underneath." },
  { q: "Do you run PPF specials?", a: "Yes. Our monthly promotion is posted on the promo page and on the PPF page. Full-front installs frequently include a free ceramic coating, and spots are limited each month." },
];

export default function PpfCost() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const { data: promo } = trpc.promo.getActive.useQuery();
  const canonical = `${BASE_URL}${PATH}`;

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <SEO
        title="How Much Does PPF Cost in Northern Virginia? What Sets Your Quote"
        description="What determines the cost of paint protection film in Chantilly, VA and Northern Virginia: coverage level, vehicle size, matte vs gloss film, paint condition, and bundles with ceramic coating and tint. Get an exact quote within the hour."
        canonical={canonical}
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "How Much Does PPF Cost in Northern Virginia? What Sets Your Quote",
            "description": "What goes into a paint protection film quote from a STEK-certified installer in Chantilly, VA: coverage, vehicle size, film finish, paint condition, and bundles.",
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
            <p className="text-[#E85D04] text-xs font-bold tracking-[0.3em] uppercase mb-3">PPF cost guide · Chantilly, VA</p>
            <h1 className="font-['Bebas_Neue',sans-serif] text-5xl md:text-7xl text-white leading-none mb-6">HOW MUCH DOES PPF COST IN NORTHERN VIRGINIA?</h1>
            <div className="border-l-4 border-[#E85D04] bg-[#111] p-6 mb-6">
              <p className="text-white text-lg leading-relaxed">
                <strong>Short answer:</strong> it depends on two things, how much of the car you cover and how big the car is. Most drivers choose <strong>full front</strong>, which covers the hood, bumper, fenders, mirrors, and headlights in STEK DYNOshield with a 12-year warranty. Send us your vehicle and we reply with an exact price, usually within the hour.
              </p>
            </div>
            <p className="text-zinc-300 leading-relaxed text-lg">
              We quote every car individually rather than publishing a price list, because the same package on a Model 3 and a Cybertruck is not the same job. Your quote includes the prep, the film, the install, and the warranty. The only extras are paint correction on cars that need it and matte film, both quoted after we see the vehicle.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <Link href="/get-a-quote?service=ppf" className="bg-[#E85D04] hover:bg-[#d14e00] text-white font-bold tracking-widest uppercase px-8 py-4 inline-flex items-center gap-2 transition-colors">
                GET MY EXACT PRICE <ArrowRight className="w-4 h-4" />
              </Link>
              <a href="tel:+17037754383" className="border border-[#E85D04] text-[#E85D04] hover:bg-[#E85D04] hover:text-white font-bold tracking-widest uppercase px-8 py-4 inline-flex items-center gap-2 transition-colors">
                <Phone className="w-4 h-4" /> (703) 775-4383
              </a>
            </div>
          </div>
        </section>

        {/* Packages by vehicle */}
        <section className="py-16 bg-[#0D0D0D] border-t border-zinc-800">
          <div className="container max-w-5xl">
            <p className="text-[#E85D04] text-xs font-bold tracking-[0.3em] uppercase mb-2">What we quote</p>
            <h2 className="font-['Bebas_Neue',sans-serif] text-4xl md:text-5xl text-white mb-8">FOUR PACKAGES, THREE VEHICLE SIZES</h2>
            {promo && (
              <div className="border border-[#E85D04]/50 bg-[#E85D04]/10 p-4 mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <p className="text-white text-sm"><span className="text-[#E85D04] font-bold uppercase tracking-widest text-xs mr-2">{promo.title}</span>Full-front PPF this month includes a free full-car ceramic coating. Spots are limited.</p>
                <Link href="/promo" className="text-[#E85D04] text-xs font-bold tracking-widest uppercase hover:text-white whitespace-nowrap">Details →</Link>
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {PPF_PACKAGES.map((p) => (
                <div key={p.key} className={`border p-5 ${p.featured ? "border-[#E85D04]" : "border-zinc-800"}`}>
                  <h3 className="text-white font-bold">{p.name}</h3>
                  <p className="text-zinc-400 text-xs uppercase tracking-widest mt-1">{p.tagline}</p>
                  <ul className="mt-3 space-y-1">
                    {p.coverage.map((c) => <li key={c} className="text-zinc-400 text-xs flex items-start gap-2"><CheckCircle className="w-3 h-3 text-[#E85D04] mt-0.5 shrink-0" />{c}</li>)}
                  </ul>
                  <p className="text-zinc-400 text-xs mt-3">{p.bestFor}</p>
                  <p className="text-zinc-500 text-xs mt-2">Install time: {p.installTime}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              {VEHICLE_CLASSES.map((c) => (
                <div key={c.key} className="border border-zinc-800 p-5">
                  <h3 className="text-white font-bold">{c.label}</h3>
                  <p className="text-zinc-400 text-xs mt-1">{c.examples}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Included */}
        <section className="py-16 bg-[#0A0A0A] border-t border-zinc-800">
          <div className="container max-w-4xl">
            <p className="text-[#E85D04] text-xs font-bold tracking-[0.3em] uppercase mb-2">No surprises</p>
            <h2 className="font-['Bebas_Neue',sans-serif] text-4xl md:text-5xl text-white mb-6">WHAT EVERY PPF QUOTE INCLUDES</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {INCLUDED.map((i) => <li key={i} className="flex items-start gap-3 text-zinc-300"><CheckCircle className="w-5 h-5 text-[#E85D04] shrink-0 mt-0.5" />{i}</li>)}
            </ul>
          </div>
        </section>

        {/* Factors */}
        <section className="py-16 bg-[#0D0D0D] border-t border-zinc-800">
          <div className="container max-w-5xl">
            <p className="text-[#E85D04] text-xs font-bold tracking-[0.3em] uppercase mb-2">What moves the number</p>
            <h2 className="font-['Bebas_Neue',sans-serif] text-4xl md:text-5xl text-white mb-8">SIX THINGS THAT CHANGE A PPF QUOTE</h2>
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
                <div key={b.name} className={`border p-6 ${b.popular ? "border-[#E85D04] bg-[#1a0a00]" : "border-zinc-800"}`}>
                  <h3 className="text-white font-bold">{b.name}</h3>
                  <p className="text-zinc-400 text-sm mt-1">{b.note}</p>
                </div>
              ))}
            </div>
            <p className="text-zinc-400 text-sm mt-6">Bundles are quoted as one package and cost less than booking each service separately. See <Link href="/ppf-vs-ceramic-coating" className="text-[#E85D04] underline hover:text-white">PPF vs ceramic coating</Link> if you are deciding between the two.</p>
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
                { href: "/get-a-quote?service=ppf", label: "Get a quote" },
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
