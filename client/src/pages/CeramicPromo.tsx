/**
 * /promo-ceramic: the ceramic coating special. A single conversion page for
 * SMS and ad traffic: $995 System X ceramic coating with free glass and wheel
 * coating, 6-year warranty, limited install slots this month. Only System X is
 * named here. Leads go through the same promo form and CRM path as /promo,
 * tagged ceramic-special-promo with the ceramic coating lead service.
 */
import { useState } from "react";
import { Link } from "wouter";
import { ArrowRight, CheckCircle, ChevronDown, Droplets, MessageSquare, Phone, Shield, Sparkles, Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import Testimonials from "@/components/Testimonials";
import PromoQuoteForm from "@/components/PromoQuoteForm";

const BASE_URL = "https://www.skylinecustomshop.com";
const PATH = "/promo-ceramic";
const PRICE = 995;
const PHONE = "(703) 775-4383";
const TEL = "tel:+17037754383";
const SMS = "sms:+17037754383?&body=CERAMIC";
const HERO = "/images/ceramic_1_53c9aefc.webp";
const BTN = "inline-flex items-center justify-center gap-2 font-display text-xl tracking-[0.1em] uppercase px-8 py-5 transition-colors";
const BTN_PRIMARY = `${BTN} bg-[#E85D04] text-black hover:bg-orange-600`;

const PHOTOS = [
  { src: "/images/bmw-ix-2026-full-front-ppf-ceramic-coating-chantilly-va.jpg", alt: "BMW iX with a fresh ceramic coating at Skyline Customs in Chantilly, VA" },
  { src: "/images/2024-mercedes-gle-53-amg-coupe-full-front-ppf-ceramic-coating-chantilly-va.jpg", alt: "Mercedes GLE 53 AMG coupe ceramic coated at Skyline Customs" },
  { src: "/images/2022-lucid-air-full-front-ppf-ceramic-coating-chantilly-va.jpg", alt: "Lucid Air ceramic coated at Skyline Customs in Chantilly" },
  { src: "/images/2023-cadillac-escalade-full-front-ppf-ceramic-coating-chantilly-va.jpg", alt: "Cadillac Escalade after ceramic coating at Skyline Customs" },
  { src: "/images/bmw-m340i-full-front-ppf-ceramic-coating-chantilly-va.jpg", alt: "BMW M340i with ceramic coating, glossy finish, Chantilly VA" },
];

const INCLUDED = [
  { icon: Sparkles, name: "Full Ceramic Coating", price: `$${PRICE}`, free: false, points: ["System X ceramic on every painted panel", "UV defense against fading and oxidation", "Hydrophobic: water, dirt, and bird droppings rinse off", "6-year warranty on the coating"] },
  { icon: Droplets, name: "Glass Coating", price: "FREE", free: true, points: ["Windshield and all windows", "Rain beads and sheets off at speed", "Better wet-weather visibility", "Wipers work less, glass stays clearer"] },
  { icon: Shield, name: "Wheel Coating", price: "FREE", free: true, points: ["All four wheels, face and barrel", "Brake dust rinses off instead of baking on", "Protects the wheel finish from pitting", "Weekly wash becomes a hose-off"] },
];

const FAQS = [
  { q: "How long does the ceramic coating take?", a: "One day for the coating with the glass and wheel bundle. Drop the car off in the morning at 4215 Walney Rd in Chantilly and it is ready the same day in most cases. If your paint needs correction first, we tell you up front and it adds a day." },
  { q: "How long before I can wash it?", a: "Seven days. The coating cures during that week, so keep it dry when you can and skip any wash. After that, hand washes or a touchless wash are fine." },
  { q: "Does it fix existing swirls or scratches?", a: "No. A ceramic coating locks in whatever is under it, so paint correction happens before the coating goes on. We inspect the paint when you drop off and quote correction separately if the car needs it." },
  { q: "What does the 6-year warranty cover?", a: "Chemical staining, UV fading, and water spotting on the coated surfaces for six years. It is a registered System X warranty and it is transferable, so it stays with the car if you sell." },
  { q: "How do I keep it going?", a: "Hand wash with a pH-neutral soap, or a touchless wash. Avoid automatic brush washes, which grind grit into any finish. A quick rinse after a salty winter drive and the coating does the rest." },
];

export default function CeramicPromo() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const canonical = `${BASE_URL}${PATH}`;
  const scrollToClaim = (e: React.MouseEvent) => { e.preventDefault(); document.getElementById("claim")?.scrollIntoView({ behavior: "smooth", block: "start" }); };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <SEO
        title="$995 Ceramic Coating Special in Chantilly, VA | Glass + Wheels Free"
        description="System X ceramic coating for $995 with free glass coating and free wheel coating. 9H hardness, SGS lab certified, 6-year transferable warranty. Limited install slots this month at Skyline Customs, Chantilly, VA."
        canonical={canonical}
        ogImage={HERO}
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "System X Ceramic Coating Special: paint, glass, and wheels",
            "description": "Full System X ceramic coating with free glass coating and free wheel coating, 6-year warranty, installed at Skyline Customs in Chantilly, VA.",
            "image": [`${BASE_URL}${HERO}`],
            "brand": { "@type": "Brand", "name": "System X" },
            "aggregateRating": { "@type": "AggregateRating", "ratingValue": "5.0", "reviewCount": "146", "bestRating": "5" },
            "offers": { "@type": "Offer", "name": "$995 ceramic coating with free glass and wheel coating", "priceCurrency": "USD", "price": String(PRICE), "availability": "https://schema.org/LimitedAvailability", "itemCondition": "https://schema.org/NewCondition", "url": canonical, "seller": { "@type": "AutoBodyShop", "name": "Skyline Customs", "telephone": "+1-703-775-4383", "address": { "@type": "PostalAddress", "streetAddress": "4215 Walney Rd Suite 1A & B", "addressLocality": "Chantilly", "addressRegion": "VA", "postalCode": "20151", "addressCountry": "US" } } },
          },
          { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": FAQS.map((f) => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } })) },
        ]}
      />
      <Navbar hidePromoStrip />
      <main>
        {/* Hero */}
        <section className="relative min-h-[88vh] flex items-end overflow-hidden">
          <img src={HERO} alt="" aria-hidden="true" fetchPriority="high" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/80 to-[#0A0A0A]/30" />
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#E85D04]" />
          <div className="container max-w-5xl relative z-10 pt-36 pb-16">
            <p className="text-[#E85D04] text-xs font-bold tracking-[0.3em] uppercase mb-4">Ceramic coating special · Limited slots this month</p>
            <h1 className="font-['Bebas_Neue',sans-serif] leading-[0.95] mb-5">
              <span className="block text-white text-6xl sm:text-7xl md:text-8xl">${PRICE} FULL CERAMIC COATING</span>
              <span className="block text-[#E85D04] text-5xl sm:text-6xl md:text-7xl">GLASS + WHEELS FREE</span>
            </h1>
            <p className="text-zinc-200 text-lg md:text-xl max-w-xl mb-8">6-year System X protection. Paint stays glossy, washes in minutes, and the glass and wheels come along at no charge.</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href="#claim" onClick={scrollToClaim} data-cta="ceramic-promo-hero" className={`${BTN_PRIMARY} w-full sm:w-auto`}>Lock in your slot <ArrowRight className="w-5 h-5" /></a>
              <a href={TEL} className={`${BTN} w-full sm:w-auto border border-zinc-600 text-white hover:border-[#E85D04]`}><Phone className="w-5 h-5" /> {PHONE}</a>
            </div>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 mt-8 text-sm text-zinc-300">
              {["System X, SGS lab certified", "9H hardness", "6-year transferable warranty", "140+ five-star Google reviews"].map((t) => <li key={t} className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#E85D04]" />{t}</li>)}
            </ul>
          </div>
        </section>

        {/* What's included */}
        <section className="py-16 md:py-24 bg-[#0D0D0D] border-t border-zinc-800">
          <div className="container max-w-6xl">
            <p className="text-[#E85D04] text-xs font-bold tracking-[0.3em] uppercase mb-3">What's included</p>
            <h2 className="font-['Bebas_Neue',sans-serif] text-5xl md:text-6xl text-white leading-none mb-10">THREE COATINGS, ONE PRICE</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {INCLUDED.map(({ icon: Icon, name, price, free, points }) => (
                <div key={name} className={`relative border p-7 bg-[#0A0A0A] ${free ? "border-zinc-800" : "border-[#E85D04]"}`}>
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <Icon className="w-7 h-7 text-[#E85D04]" strokeWidth={1.75} />
                    <span className={`font-['Bebas_Neue',sans-serif] text-3xl leading-none ${free ? "text-emerald-400" : "text-white"}`}>{price}</span>
                  </div>
                  <h3 className="font-['Bebas_Neue',sans-serif] text-3xl text-white mb-4">{name}</h3>
                  <ul className="space-y-2">
                    {points.map((pt) => <li key={pt} className="flex items-start gap-2 text-zinc-300 text-sm leading-relaxed"><CheckCircle className="w-4 h-4 text-[#E85D04] mt-0.5 shrink-0" />{pt}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why System X */}
        <section className="py-16 md:py-24 bg-[#0A0A0A]">
          <div className="container max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <p className="text-[#E85D04] text-xs font-bold tracking-[0.3em] uppercase mb-3">Not all ceramic is the same</p>
              <h2 className="font-['Bebas_Neue',sans-serif] text-5xl md:text-6xl text-white leading-none mb-6">WHY SYSTEM X</h2>
              <p className="text-zinc-300 leading-relaxed mb-6">The generic ceramic a lot of shops sell is a bottle with a logo on it: it looks great for a season, fades in a year or two, and nobody stands behind it. System X is a professional coating that is tested by an outside lab and registered to your car.</p>
              <ul className="space-y-4">
                {[
                  ["SGS lab certified", "Hardness, chemical resistance, and durability verified by a third-party lab, not just the manufacturer's own claims."],
                  ["9H hardness", "The top of the pencil-hardness scale: wash marring, light scratches, and etching from bird droppings and bugs stop at the coating."],
                  ["Transferable registered warranty", "Six years, registered to the VIN. If you sell the car, the coverage goes with it, which buyers notice."],
                  ["Applied by a certified installer", "Paint decontaminated and inspected, coating applied panel by panel under lights, cured before it goes outside."],
                ].map(([h, b]) => (
                  <li key={h} className="flex items-start gap-3"><Star className="w-5 h-5 text-[#E85D04] mt-0.5 shrink-0" /><div><p className="text-white font-semibold">{h}</p><p className="text-zinc-400 text-sm leading-relaxed">{b}</p></div></li>
                ))}
              </ul>
            </div>
            <div className="border border-zinc-800 bg-[#0D0D0D] p-7">
              <p className="text-[#E85D04] text-xs font-bold tracking-[0.3em] uppercase mb-4">Generic ceramic vs System X</p>
              <div className="divide-y divide-zinc-800 text-sm">
                {[
                  ["Lab testing", "None, or in-house", "SGS certified"],
                  ["Hardness", "Unrated", "9H"],
                  ["Warranty", "None, or verbal", "6 years, registered, transferable"],
                  ["Typical life", "1 to 2 years", "6 years under warranty"],
                  ["Glass and wheels", "Extra, if offered", "Included free this month"],
                ].map(([k, a, b]) => (
                  <div key={k} className="grid grid-cols-3 gap-3 py-3">
                    <span className="text-zinc-400">{k}</span><span className="text-zinc-500">{a}</span><span className="text-white font-semibold">{b}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Social proof */}
        <section className="py-16 md:py-24 bg-[#0D0D0D] border-t border-zinc-800">
          <div className="container max-w-6xl">
            <p className="text-[#E85D04] text-xs font-bold tracking-[0.3em] uppercase mb-3">Real cars, coated here</p>
            <h2 className="font-['Bebas_Neue',sans-serif] text-5xl md:text-6xl text-white leading-none mb-8">THE GLOSS SPEAKS FOR ITSELF</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {PHOTOS.map((p, i) => (
                <div key={p.src} className={`aspect-[4/3] overflow-hidden bg-zinc-900 ${i === 0 ? "col-span-2 md:col-span-2 md:row-span-2 md:aspect-auto" : ""}`}>
                  <img src={p.src} alt={p.alt} loading="lazy" decoding="async" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </section>
        <Testimonials title="CERAMIC COATING CUSTOMERS" focus={["ceramic"]} />

        {/* FAQ */}
        <section className="py-16 bg-[#0A0A0A] border-t border-zinc-800">
          <div className="container max-w-3xl">
            <h2 className="font-['Bebas_Neue',sans-serif] text-4xl md:text-5xl text-white mb-8">QUICK QUESTIONS</h2>
            <div className="divide-y divide-zinc-800 border-y border-zinc-800">
              {FAQS.map((f, i) => (
                <div key={f.q}>
                  <button type="button" onClick={() => setOpenFaq(openFaq === i ? null : i)} aria-expanded={openFaq === i} className="w-full flex items-center justify-between gap-4 py-5 text-left text-white font-semibold">
                    <span>{f.q}</span><ChevronDown className={`w-5 h-5 text-[#E85D04] shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                  </button>
                  <div className={openFaq === i ? "pb-5" : "hidden"}><p className="text-zinc-400 leading-relaxed">{f.a}</p></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Claim */}
        <section id="claim" className="py-16 md:py-24 bg-[#140C07] border-y border-[#E85D04]/30 scroll-mt-20">
          <div className="container max-w-6xl grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
            <div className="lg:col-span-2">
              <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">Only a limited number of install slots left this month</p>
              <h2 className="font-['Bebas_Neue',sans-serif] text-5xl text-white leading-none mb-5">BOOK YOUR SLOT</h2>
              <p className="text-zinc-300 leading-relaxed mb-6">Send the year, make, and model. We confirm your ${PRICE} price and the open dates, usually within the hour during business hours. Nothing to pay until you approve.</p>
              <div className="space-y-3">
                <a href={SMS} data-cta="ceramic-promo-sms" className="flex items-center gap-3 border border-zinc-700 hover:border-[#E85D04] px-5 py-4 transition-colors"><MessageSquare className="w-5 h-5 text-[#E85D04]" /><span><span className="block text-white font-semibold">Text CERAMIC to {PHONE}</span><span className="block text-zinc-400 text-sm">Fastest on a phone</span></span></a>
                <a href={TEL} data-cta="ceramic-promo-call" className="flex items-center gap-3 border border-zinc-700 hover:border-[#E85D04] px-5 py-4 transition-colors"><Phone className="w-5 h-5 text-[#E85D04]" /><span><span className="block text-white font-semibold">Call {PHONE}</span><span className="block text-zinc-400 text-sm">Mon to Fri, 9 AM to 6 PM</span></span></a>
              </div>
              <p className="text-zinc-500 text-xs mt-6">Skyline Customs · 4215 Walney Rd Suite 1A &amp; B, Chantilly, VA 20151 · <Link href="/services/ceramic-coating" className="underline underline-offset-2 hover:text-zinc-300">About our ceramic coatings</Link></p>
            </div>
            <div className="lg:col-span-3">
              <PromoQuoteForm promoTitle="Ceramic Special" promoSlug="ceramic-special" dealDescription={`$${PRICE} System X ceramic coating with free glass coating and free wheel coating`} service="Ceramic Coating" buttonLabel="LOCK IN MY SLOT" footnote={`$${PRICE} all in for paint, glass, and wheels. Nothing to pay now; you approve the price and date first.`} showDeposit={false} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
