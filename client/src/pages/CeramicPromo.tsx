/**
 * /promo-ceramic: the ceramic coating special, laid out the same way as the
 * PPF promo (/promo): hero with price card, problem, offer, what you get,
 * guarantees, process, real cars and reviews, claim form, brand callout, FAQ,
 * final CTA, sticky mobile bar, exit prompt. $495 System X ceramic coating on the
 * paint (regular $1,300), 10-year warranty, limited slots this month. Paint only:
 * no wheel coating, no paint correction, no add-ons. Only System X is named here. Leads use the shared promo form, tagged
 * ceramic-special-promo with the ceramic coating lead service.
 */
import { useEffect } from "react";
import { Link } from "wouter";
import { AlertTriangle, ArrowRight, CheckCircle, Clock, Droplets, Eye, Layers, Lock, MessageSquare, Phone, Shield, Sparkles, Star, Sun, Wrench } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WaterDemo from "@/components/demos/WaterDemo";
import SEO from "@/components/SEO";
import Testimonials from "@/components/Testimonials";
import PromoQuoteForm from "@/components/PromoQuoteForm";
import ExitPrompt from "@/components/ExitPrompt";
import LeadPulse from "@/components/LeadPulse";
import { CountdownTimer, FaqAccordion, timeLeftLabel } from "@/pages/JuneSpecial";

const BASE_URL = "https://www.skylinecustomshop.com";
const PATH = "/promo-ceramic";
const PRICE = 495;
const PRICE_TXT = `$${PRICE}`;
/** The regular price of the same coating, shown struck through next to the special. */
const WAS = 1300;
const WAS_TXT = `$${WAS.toLocaleString("en-US")}`;
const WARRANTY = "10-year";
const PHONE = "(703) 775-4383";
const TEL = "tel:+17037754383";
const SMS = "sms:+17037754383?&body=CERAMIC";
const HERO = "/images/ceramic_1_53c9aefc.webp";
const PROMO_TITLE = "Ceramic Special";
const PROMO_SLUG = "ceramic-special";
const PROMO_TAG = "ceramic-special-promo";
const DEAL = `${PRICE_TXT} System X ceramic coating on the paint (regular ${WAS_TXT}), ${WARRANTY} warranty`;

/** The special runs through the end of the current month. */
export function endOfMonth(): string {
  const d = new Date();
  const last = new Date(d.getFullYear(), d.getMonth() + 1, 0);
  return last.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

const BTN = "inline-flex items-center justify-center gap-2 font-display text-lg md:text-xl tracking-[0.1em] uppercase px-8 py-4 md:py-5 transition-colors";
const BTN_PRIMARY = `cta ${BTN} bg-[#E85D04] text-black hover:bg-orange-600`;
const BTN_ON_ORANGE = `cta cta-alt ${BTN} bg-black text-white hover:bg-zinc-900`;
const BTN_ON_ORANGE_OUTLINE = `cta cta-alt ${BTN} border border-black/60 text-black hover:bg-black hover:text-white`;
const FINE_PRINT = "text-zinc-400 text-xs tracking-wide";

const PHOTOS = [
  { src: "/images/w/bmw-ix-2026-full-front-ppf-ceramic-coating-chantilly-va-960.webp", alt: "BMW iX with a fresh ceramic coating at Skyline Customs in Chantilly, VA" },
  { src: "/images/w/2024-mercedes-gle-53-amg-coupe-full-front-ppf-ceramic-coating-chantilly-va-960.webp", alt: "Mercedes GLE 53 AMG coupe ceramic coated at Skyline Customs" },
  { src: "/images/w/2022-lucid-air-full-front-ppf-ceramic-coating-chantilly-va-960.webp", alt: "Lucid Air ceramic coated at Skyline Customs in Chantilly" },
  { src: "/images/w/2023-cadillac-escalade-full-front-ppf-ceramic-coating-chantilly-va-960.webp", alt: "Cadillac Escalade after ceramic coating at Skyline Customs" },
  { src: "/images/w/bmw-m340i-full-front-ppf-ceramic-coating-chantilly-va-960.webp", alt: "BMW M340i with ceramic coating, glossy finish, Chantilly VA" },
];

const FAQS = [
  { q: "How long does the ceramic coating take?", a: "One day. Drop the car off in the morning at 4215 Walney Rd in Chantilly and it is ready the same day in most cases. If your paint needs correction first, that is quoted separately and adds a day." },
  { q: "How long before I can wash it?", a: "Seven days. The coating cures during that week, so keep it dry when you can and skip any wash. After that, hand washes or a touchless wash are fine." },
  { q: "Does it fix existing swirls or scratches?", a: "No. A ceramic coating locks in whatever is under it, and paint correction is not part of the $495 special. We inspect the paint when you drop off; if the car needs correction we quote it separately, and you decide before anything is applied." },
  { q: "What exactly is included for $495?", a: "The System X ceramic coating on every painted panel, with a full wash and decontamination before it goes on, and the registered 10-year warranty. Wheel coating, glass coating, paint correction, and other add-ons are not included. They can be quoted on top if you want them." },
  { q: "Why is it $495 when the same coating is normally $1,300?", a: "It is the same System X coating, the same prep, and the same registered warranty we install at the regular price. The special is limited to a set number of install slots this month, and the price goes back to $1,300 when they are gone." },
  { q: "What does the 10-year warranty cover?", a: "Chemical staining, UV fading, and water spotting on the coated paint for ten years. It is a registered System X warranty and it is transferable, so it stays with the car if you sell." },
  { q: "How do I keep it going?", a: "Hand wash with a pH-neutral soap, or a touchless wash. Avoid automatic brush washes, which grind grit into any finish. A quick rinse after a salty winter drive and the coating does the rest." },
  { q: "Can I pay over time?", a: "Yes. We take Klarna, Afterpay, and Affirm, so you can split the total into payments instead of paying it all at pickup. Nothing is due until you approve the price and the date." },
];

export default function CeramicPromo() {
  const canonical = `${BASE_URL}${PATH}`;
  const endDate = endOfMonth();
  const quoteUrl = "#claim";

  // In-page links glide to the form and focus its first field, same as the PPF promo.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a) return;
      const el = document.getElementById(a.getAttribute("href")!.slice(1));
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      window.setTimeout(() => el.querySelector<HTMLInputElement>("input")?.focus({ preventScroll: true }), 700);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <SEO
        title={`${PRICE_TXT} Ceramic Coating Special in Chantilly, VA | Was ${WAS_TXT}, ${WARRANTY} Warranty`}
        description={`System X ceramic coating on the paint for ${PRICE_TXT}, regular ${WAS_TXT}. 9H hardness, SGS lab certified, ${WARRANTY} transferable warranty. Limited install slots this month at Skyline Customs, Chantilly, VA.`}
        canonical={canonical}
        ogImage={HERO}
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "System X Ceramic Coating Special",
            "description": `System X ceramic coating on the paint, ${WARRANTY} transferable warranty, installed at Skyline Customs in Chantilly, VA. Regular price ${WAS_TXT}.`,
            "image": [`${BASE_URL}${HERO}`],
            "brand": { "@type": "Brand", "name": "System X" },
            "aggregateRating": { "@type": "AggregateRating", "ratingValue": "5.0", "reviewCount": "146", "bestRating": "5" },
            "offers": { "@type": "Offer", "name": `${PRICE_TXT} System X ceramic coating, regular ${WAS_TXT}`, "priceCurrency": "USD", "price": String(PRICE), "availability": "https://schema.org/LimitedAvailability", "itemCondition": "https://schema.org/NewCondition", "url": canonical, "seller": { "@type": "AutoBodyShop", "name": "Skyline Customs", "telephone": "+1-703-775-4383", "address": { "@type": "PostalAddress", "streetAddress": "4215 Walney Rd Suite 1A & B", "addressLocality": "Chantilly", "addressRegion": "VA", "postalCode": "20151", "addressCountry": "US" } } },
          },
          { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": FAQS.map((f) => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } })) },
        ]}
      />
      <ExitPrompt promoTitle={PROMO_TITLE} promoTag={PROMO_TAG} service="Ceramic Coating" />
      <Navbar hidePromoStrip />

      {/* ================================================================
          HERO
      ================================================================ */}
      <section className="relative overflow-hidden bg-[#0A0A0A]">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "repeating-linear-gradient(45deg, #E85D04 0, #E85D04 1px, transparent 0, transparent 50%)", backgroundSize: "20px 20px" }} />
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#E85D04]" />
        <div className="container max-w-6xl relative z-10 pt-24 pb-14 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <h2 className="font-display text-[#E85D04] text-sm tracking-[0.3em] uppercase mb-3">Ceramic Coating Special &middot; Chantilly, VA &middot; Ends {endDate}</h2>
              <div className="mb-6"><CountdownTimer endDate={endDate} /></div>
              <h1 className="font-display leading-none mb-5">
                <span className="block text-white text-5xl md:text-7xl"><s className="text-zinc-500 decoration-[#E85D04] decoration-4">{WAS_TXT}</s> Now {PRICE_TXT}</span>
                <span className="block text-[#E85D04] text-5xl md:text-7xl">System X Ceramic Coating</span>
              </h1>
              <p className="text-zinc-300 text-lg leading-relaxed italic mb-7 max-w-lg">{WARRANTY} System X protection on your paint &mdash; the same coating we install at {WAS_TXT}, for {PRICE_TXT} this month.</p>
              <div className="mb-7 max-w-lg">
                <a href={quoteUrl} data-cta="ceramic-promo-claim" className={`${BTN_PRIMARY} w-full`}>LOCK IN YOUR SLOT <ArrowRight className="w-5 h-5" /></a>
                <p className={`${FINE_PRINT} text-center mt-3`}>{PRICE_TXT} for the System X coating on the paint. Registered {WARRANTY} warranty. Pay over time with Klarna, Afterpay, or Affirm.</p>
              </div>
              <div className="flex items-center gap-3 mb-7">
                <div className="flex items-center gap-0.5">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-[#E85D04] text-[#E85D04]" />)}</div>
                <span className="text-zinc-300 text-sm font-semibold">5.0</span>
                <span className="text-zinc-400 text-sm">&middot;</span>
                <span className="text-zinc-400 text-sm">140+ Google reviews &middot; 700+ five-star reviews across all platforms</span>
              </div>
              <a href="#included" className="flex items-center gap-4 border border-[#E85D04]/50 bg-[#E85D04]/10 text-white px-5 py-4 max-w-lg hover:bg-[#E85D04]/20 transition-colors">
                <Droplets className="w-8 h-8 shrink-0 text-[#E85D04]" strokeWidth={1.75} />
                <span>
                  <span className="block font-display text-2xl leading-none tracking-wide">SAVE {`$${(WAS - PRICE).toLocaleString("en-US")}`} ON THE SAME COATING</span>
                  <span className="block text-sm text-zinc-300 mt-1">Same System X ceramic, same prep, same registered {WARRANTY} warranty as the {WAS_TXT} install. Paint only, no add-ons.</span>
                </span>
              </a>
            </div>

            <div className="space-y-4">
              <div className="border border-[#E85D04]/40 bg-[#E85D04]/5 p-6 md:p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-[#E85D04] text-black font-display text-xs tracking-widest px-3 py-1.5">WAS {WAS_TXT}</div>
                <p className="text-[#E85D04] text-xs font-bold tracking-[0.3em] uppercase mb-3">Special price</p>
                <div className="flex items-baseline gap-3 mb-2"><span className="font-display text-zinc-500 text-3xl leading-none line-through decoration-[#E85D04] decoration-2">{WAS_TXT}</span><span className="font-display text-[#E85D04] text-6xl leading-none">{PRICE_TXT}</span></div>
                <p className="text-white font-semibold text-base mb-1">System X ceramic coating on the paint, {WARRANTY} registered warranty</p>
                <p className="text-zinc-400 text-sm mb-1">Paint only. No wheel coating, paint correction, or add-ons. Price locked through {endDate}.</p>
                <p className="text-[#E85D04] text-sm font-semibold mb-5">Pay over time with Klarna, Afterpay, or Affirm.</p>
                <ul className="space-y-2 text-sm text-zinc-300 mb-6">
                  {["System X ceramic on every painted panel", `Registered ${WARRANTY} transferable warranty`, "Full wash and decontamination before the coating goes on", "Walk-and-pay: inspect every panel before you pay the balance"].map((line) => (
                    <li key={line} className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-[#E85D04] mt-0.5 shrink-0" />{line}</li>
                  ))}
                </ul>
                <a href={quoteUrl} data-cta="ceramic-promo-claim" className={`${BTN_PRIMARY} w-full`}>Lock in my slot <ArrowRight className="w-5 h-5" /></a>
                <p className="flex items-center justify-center gap-2 text-xs mt-3">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-bold text-emerald-400">Limited slots this month</span>
                  <span className="text-zinc-400">&middot; Ends {endDate}</span>
                </p>
                <LeadPulse className="mt-2" />
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: Lock, label: "Price Locked", sub: "No hidden fees" },
                  { icon: Star, label: "5-Star Rated", sub: "700+ reviews, all platforms" },
                  { icon: CheckCircle, label: "System X Certified", sub: "10-yr warranty" },
                ].map(({ icon: Icon, label, sub }) => (
                  <div key={label} className="border border-zinc-800 bg-[#0D0D0D] p-4 text-center">
                    <Icon className="w-5 h-5 text-[#E85D04] mx-auto mb-2" />
                    <p className="text-white text-xs font-bold">{label}</p>
                    <p className="text-zinc-400 text-xs">{sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          WAS / NOW BAND (right under the hero)
      ================================================================ */}
      <section className="bg-[#E85D04] text-black">
        <div className="container max-w-6xl py-5 md:py-6 flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
          <div className="flex items-center gap-4">
            <Sparkles className="w-10 h-10 shrink-0" strokeWidth={1.75} />
            <div>
              <p className="font-display text-3xl md:text-4xl leading-none tracking-wide">WAS {WAS_TXT}. NOW {PRICE_TXT}. SAME COATING.</p>
              <p className="text-black/90 text-sm md:text-base mt-1">The System X ceramic coating we install every week at {WAS_TXT}, on your paint for {PRICE_TXT} this month, with the full {WARRANTY} registered warranty.</p>
            </div>
          </div>
          <a href="#included" className={`${BTN_ON_ORANGE} md:ml-auto shrink-0`}>See what's included <ArrowRight className="w-5 h-5" /></a>
        </div>
      </section>

      {/* ================================================================
          THE PROBLEM
      ================================================================ */}
      <section className="py-16 md:py-24 bg-[#0D0D0D]">
        <div className="container max-w-6xl">
          <div className="mb-10 md:mb-16">
            <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">Sound Familiar?</p>
            <h2 className="font-display text-5xl md:text-6xl text-white leading-none">EVERY CAR IN NOVA<br /><span className="text-[#E85D04]">LOSES ITS SHINE THE SAME WAY</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-zinc-800">
            {[
              { icon: Sun, title: "Paint That Dulls After One Summer", body: "UV off the Route 28 asphalt, pollen in April, sap under every tree in Fairfax. Clear coat oxidizes, the gloss goes flat, and the car looks three years older than it is." },
              { icon: Eye, title: "Bird Droppings and Bugs That Etch", body: "A bird dropping left through one hot afternoon etches into clear coat. Bug splatter from an I-66 drive does the same. Once it is etched, it is a polish, not a wash." },
              { icon: Clock, title: "Washing Every Weekend", body: "Uncoated paint holds onto road film, brake dust, and water spots. You wash on Saturday, it rains Tuesday, and the car looks like you never touched it." },
              { icon: AlertTriangle, title: "Cheap Ceramic That's Gone in a Year", body: "A spray bottle with a logo is not a coating. It beads for a season, fades inside a year, and nobody stands behind it. Not all ceramic is the same." },
            ].map(({ icon: Icon, title: t, body }) => (
              <div key={t} className="bg-[#0D0D0D] p-6 md:p-10">
                <Icon className="w-8 h-8 text-[#E85D04] mb-4 md:mb-5" />
                <h3 className="font-display text-2xl text-white mb-3">{t}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          THE OFFER
      ================================================================ */}
      <section id="included" className="py-16 md:py-24 bg-[#140C07] border-y border-[#E85D04]/30 scroll-mt-20">
        <div className="container max-w-6xl">
          <div className="mb-10 md:mb-16 text-center">
            <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">The Solution</p>
            <h2 className="font-display text-5xl md:text-6xl text-white leading-none">THE SAME COATING.<br /><span className="text-[#E85D04]">LESS THAN HALF THE PRICE.</span></h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-zinc-300 text-lg leading-relaxed mb-8">The System X ceramic coating on your paint is normally {WAS_TXT}. This month it is {PRICE_TXT}. Same coating, same prep, same registered {WARRANTY} warranty. One day in the shop, one price, nothing else bundled in.</p>
              <div className="border border-zinc-800 bg-[#0D0D0D] p-8 mb-8">
                <p className="text-zinc-400 text-xs tracking-[0.3em] uppercase mb-3">Special Price</p>
                <div className="flex items-baseline gap-4 mb-2"><span className="font-display text-zinc-500 text-3xl line-through decoration-[#E85D04] decoration-2">{WAS_TXT}</span><span className="font-display text-[#E85D04] text-6xl">{PRICE_TXT}</span></div>
                <p className="text-zinc-400 text-sm mb-4">System X ceramic on the paint for {PRICE_TXT}, regular {WAS_TXT}. The price covers the coating on the painted panels only.</p>
                <div className="flex items-center gap-2 text-zinc-400 text-xs"><CheckCircle className="w-4 h-4 text-emerald-500" /> Price locked for all bookings before {endDate}</div>
                <div className="flex items-center gap-2 text-zinc-400 text-xs mt-2"><CheckCircle className="w-4 h-4 text-emerald-500" /> Pay over time with Klarna, Afterpay, or Affirm.</div>
              </div>
              <div className="mb-6">
                <p className="text-white font-bold text-sm tracking-widest uppercase mb-4">What You&apos;re Paying For</p>
                <div className="border-l-2 border-[#E85D04] pl-5">
                  <p className="font-display text-xl text-white mb-1">System X Ceramic Coating on the Paint</p>
                  <p className="text-zinc-400 text-sm leading-relaxed">Every painted panel. 9H hardness, SGS lab certified, hydrophobic, UV defense. Backed by a registered, transferable {WARRANTY} warranty.</p>
                </div>
              </div>
              <a href={quoteUrl} data-cta="ceramic-promo-claim" className={`${BTN_PRIMARY} w-full`}>LOCK IN YOUR SLOT <ArrowRight className="w-5 h-5" /></a>
              <p className={`${FINE_PRINT} text-center mt-3`}>No catch. Glossy paint, guaranteed 10 years.</p>
            </div>
            <div className="border-2 border-[#E85D04]/50 bg-[#E85D04]/5 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-[#E85D04] text-black text-xs font-bold tracking-widest px-3 py-1.5">INCLUDED</div>
                <span className="font-mono-brand text-zinc-400 text-sm">Paint only, no add-ons</span>
              </div>
              <div className="space-y-5">
                {[
                  { name: "System X ceramic on every painted panel", sub: "Hood, roof, doors, fenders, bumpers, trunk, mirrors. 9H hardness, hydrophobic, UV defense.", included: true },
                  { name: `Registered ${WARRANTY} transferable warranty`, sub: "Registered to your VIN against chemical staining, UV fading, and water spots. Goes with the car if you sell.", included: true },
                  { name: "Wash and decontamination before coating", sub: "Full wash, iron removal, and clay bar so the coating bonds to clean paint.", included: true },
                  { name: "Wheel coating, glass coating, paint correction", sub: "Not part of the special. We can quote any of them on top if you want them.", included: false },
                ].map(({ name, sub, included }) => (
                  <div key={name} className="flex items-start justify-between gap-4 pb-5 border-b border-[#E85D04]/20 last:border-0 last:pb-0">
                    <div className="flex items-start gap-3">
                      <CheckCircle className={`w-5 h-5 shrink-0 mt-0.5 ${included ? "text-[#E85D04]" : "text-zinc-600"}`} />
                      <div><p className="text-white font-semibold text-sm">{name}</p><p className="text-zinc-400 text-xs leading-relaxed">{sub}</p></div>
                    </div>
                    <span className={`font-mono-brand text-xs shrink-0 ${included ? "text-emerald-400" : "text-zinc-500"}`}>{included ? "INCLUDED" : "NOT INCLUDED"}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          WHAT YOU GET: photo cards
      ================================================================ */}
      <section className="py-16 md:py-24 bg-[#0D0D0D]">
        <div className="container max-w-6xl">
          <div className="mb-10 md:mb-14 text-center">
            <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">The Coating</p>
            <h2 className="font-display text-5xl md:text-6xl text-white">WHAT YOU GET</h2>
            <p className="text-zinc-400 mt-4 max-w-2xl mx-auto">One professional ceramic coating on every painted panel, applied in one day and backed for ten years.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { photo: PHOTOS[0].src, alt: PHOTOS[0].alt, title: "System X Ceramic Coating", sub: "Every painted panel", items: ["9H hardness, SGS lab certified", "Hydrophobic: water and dirt rinse off", "UV defense against fading", "Stops etching from bugs and bird droppings", "Applied by a certified installer"] },
              { photo: PHOTOS[1].src, alt: PHOTOS[1].alt, title: `${WARRANTY} Warranty`, sub: "Registered + transferable", items: ["Registered to your VIN with System X", "Chemical staining covered", "UV fading covered", "Water spotting covered", "Transfers to the next owner if you sell"] },
              { photo: PHOTOS[4].src, alt: PHOTOS[4].alt, title: "Prep + Walk-and-Pay", sub: "Done right, checked with you", items: ["Full wash and iron decontamination", "Clay bar before the coating", "Panel-by-panel inspection on drop-off", "Cured in the bay, not in a parking lot", "You inspect every panel before paying the balance"] },
            ].map(({ photo, alt, title: t, sub, items }) => (
              <div key={t} className="border border-[#E85D04]/60 bg-[#0A0A0A] overflow-hidden">
                <div className="relative aspect-[4/3] bg-zinc-900 overflow-hidden">
                  <img src={photo} alt={alt} loading="lazy" decoding="async" className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <p className="font-display text-2xl text-white leading-none">{t}</p>
                  <p className="text-[#E85D04] text-xs tracking-widest uppercase mt-1 mb-4">{sub}</p>
                  <ul className="space-y-1.5">{items.map((it) => <li key={it} className="flex items-start gap-2 text-zinc-300 text-sm"><CheckCircle className="w-4 h-4 text-[#E85D04] mt-0.5 shrink-0" />{it}</li>)}</ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          WHY SYSTEM X (three guarantees layout)
      ================================================================ */}
      <section className="py-16 md:py-24 bg-[#0A0A0A]">
        <div className="container max-w-6xl">
          <div className="mb-10 md:mb-16">
            <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">Not all ceramic is the same</p>
            <h2 className="font-display text-5xl md:text-6xl text-white leading-none">THREE REASONS<br /><span className="text-[#E85D04]">WE ONLY INSTALL SYSTEM X</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            {[
              { number: "01", title: "SGS Lab Certified", body: "Hardness, chemical resistance, and durability verified by an independent lab, not just the manufacturer's own claims. The generic ceramic most shops sell has never been tested by anyone." },
              { number: "02", title: "9H Hardness", body: "The top of the pencil-hardness scale. Wash marring, light scratches, and etching from bird droppings and bugs stop at the coating instead of reaching your clear coat." },
              { number: "03", title: "10-Year Transferable Warranty", body: "Registered to your VIN, covering chemical staining, UV fading, and water spots for ten years. If you sell the car, the coverage goes with it, which buyers notice. Generic ceramic fades in a year or two with nothing behind it." },
            ].map(({ number, title: t, body }) => (
              <div key={number} className="border border-zinc-800 bg-[#0D0D0D] p-6 md:p-8 relative overflow-hidden">
                <span className="font-display text-7xl md:text-8xl text-zinc-900 absolute -top-2 -right-2 leading-none select-none">{number}</span>
                <div className="relative z-10">
                  <div className="w-10 h-0.5 bg-[#E85D04] mb-4 md:mb-6" />
                  <h3 className="font-display text-2xl text-white mb-3 md:mb-4">{t}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          4-STEP PROCESS
      ================================================================ */}
      <section className="py-16 md:py-24 bg-[#0D0D0D]">
        <div className="container max-w-6xl">
          <div className="mb-10 md:mb-16 text-center">
            <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">How It Works</p>
            <h2 className="font-display text-5xl md:text-6xl text-white">THE PROCESS</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-zinc-800">
            {[
              { step: "01", icon: Wrench, title: "Decontamination", body: "Full wash, iron decontamination, clay bar treatment. Every contaminant removed before the coating goes on." },
              { step: "02", icon: Eye, title: "Paint Inspection", body: "Panel-by-panel check under the lights. If the paint needs correction, we tell you and quote it separately before the coating locks anything in." },
              { step: "03", icon: Layers, title: "The Coating", body: "System X ceramic applied to every painted panel by a certified installer, then leveled panel by panel under the lights." },
              { step: "04", icon: Shield, title: "Cure + Walk-and-Pay", body: "The coating flashes and cures in the bay. Then you walk every panel with us under high-intensity lighting before you pay the balance." },
            ].map(({ step, icon: Icon, title: t, body }) => (
              <div key={step} className="bg-[#0D0D0D] p-4 md:p-8 text-center">
                <div className="font-display text-4xl md:text-5xl text-[#E85D04] mb-3 md:mb-4">{step}</div>
                <div className="w-12 h-12 bg-[#E85D04]/10 border border-[#E85D04]/30 flex items-center justify-center mx-auto mb-3 md:mb-4"><Icon className="w-6 h-6 text-[#E85D04]" /></div>
                <h3 className="font-display text-xl md:text-2xl text-white mb-2 md:mb-3">{t}</h3>
                <p className="text-zinc-400 text-xs md:text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center"><p className="text-zinc-400 text-sm">Total time in the shop: <strong className="text-white">1 day</strong> &middot; Keep it dry for 7 days after</p></div>
        </div>
      </section>

      {/* ================================================================
          TRY THE COATING: drag the water off coated vs bare paint
      ================================================================ */}
      <section className="py-16 md:py-24 bg-[#0D0D0D] border-t border-zinc-900" id="try-it">
        <div className="container max-w-6xl">
          <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">See it for yourself</p>
          <h2 className="font-display text-5xl md:text-6xl text-white mb-8">TRY THE COATING YOURSELF</h2>
          <WaterDemo compact />
        </div>
      </section>

      {/* ================================================================
          REAL CARS + REVIEWS
      ================================================================ */}
      <section className="py-16 md:py-24 bg-[#0A0A0A]">
        <div className="container max-w-6xl">
          <div className="mb-8">
            <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">Real customers, real cars</p>
            <h2 className="font-display text-5xl md:text-6xl text-white">THE GLOSS SPEAKS FOR ITSELF</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {PHOTOS.map((p, i) => (
              <div key={p.src} className={`aspect-[4/3] overflow-hidden bg-zinc-900 border border-zinc-800 ${i === 0 ? "col-span-2 row-span-2 md:aspect-auto" : ""}`}>
                <img src={p.src} alt={p.alt} loading="lazy" decoding="async" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>
      <Testimonials title="WHAT CERAMIC CUSTOMERS SAY" focus={["ceramic"]} />

      {/* ================================================================
          CLAIM YOUR SLOT (embedded form; every CTA scrolls here)
      ================================================================ */}
      <section id="claim" className="py-16 md:py-24 bg-[#140C07] border-y border-[#E85D04]/30 scroll-mt-20">
        <div className="container max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-12 items-start">
            <div className="lg:col-span-2">
              <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">Only a limited number of install slots left this month</p>
              <h2 className="font-display text-5xl md:text-6xl text-white leading-none mb-5">SEEN ENOUGH?<br /><span className="text-[#E85D04]">BOOK YOUR SLOT</span></h2>
              <p className="text-zinc-300 leading-relaxed mb-6">Sixty seconds. We call or text back with your {PRICE_TXT} confirmation and the open install dates, usually within the hour during business hours. Nothing to pay until you approve.</p>
              <ul className="space-y-3 text-sm text-zinc-300">
                {[`${PRICE_TXT} for the coating on the paint, regular ${WAS_TXT}`, `System X ceramic with the registered ${WARRANTY} warranty`, "No wheel coating, paint correction, or add-ons bundled in. Quoted separately if you want them.", "Walk-and-pay: you inspect every panel before you pay the balance"].map((line) => (
                  <li key={line} className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-[#E85D04] mt-0.5 shrink-0" />{line}</li>
                ))}
              </ul>
              <div className="mt-8 space-y-3">
                <a href={SMS} data-cta="ceramic-promo-sms" className="flex items-center gap-3 border border-zinc-700 hover:border-[#E85D04] px-5 py-4 transition-colors"><MessageSquare className="w-5 h-5 text-[#E85D04]" /><span><span className="block text-white font-semibold">Text CERAMIC to {PHONE}</span><span className="block text-zinc-400 text-sm">Fastest on a phone</span></span></a>
                <a href={TEL} data-cta="ceramic-promo-call" className="inline-flex items-center gap-2 text-zinc-300 hover:text-white text-sm"><Phone className="w-4 h-4 text-[#E85D04]" /> Prefer to talk? {PHONE}</a>
              </div>
            </div>
            <div className="lg:col-span-3">
              <PromoQuoteForm promoTitle={PROMO_TITLE} promoSlug={PROMO_SLUG} dealDescription={DEAL} service="Ceramic Coating" buttonLabel="LOCK IN MY SLOT" footnote={`${PRICE_TXT} for the System X coating on the paint, regular ${WAS_TXT}. Nothing to pay now; you approve the price and date first.`} showDeposit={false} />
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          SYSTEM X CALLOUT
      ================================================================ */}
      <section className="py-14 md:py-16 bg-[#0D0D0D]">
        <div className="container max-w-4xl text-center">
          <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">The Coating</p>
          <h2 className="font-display text-5xl text-white mb-4">System X</h2>
          <p className="text-zinc-400 text-lg leading-relaxed max-w-2xl mx-auto mb-8">
            A professional-grade ceramic coating, SGS lab certified at 9H hardness, applied by a certified installer and registered to your car. Hydrophobic, UV-stable, and backed by a <strong className="text-white">{WARRANTY} transferable warranty</strong> against chemical staining, UV fading, and water spots.
          </p>
          <Link href="/services/ceramic-coating" className="text-[#E85D04] font-bold tracking-widest uppercase text-sm underline underline-offset-2 decoration-1 hover:decoration-2 inline-flex items-center gap-2">About our ceramic coatings <ArrowRight className="w-4 h-4" /></Link>
        </div>
      </section>

      {/* ================================================================
          FAQ
      ================================================================ */}
      <section className="py-16 md:py-24 bg-[#0A0A0A]">
        <div className="container max-w-3xl">
          <div className="mb-10 text-center">
            <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">Questions</p>
            <h2 className="font-display text-5xl md:text-6xl text-white">QUICK ANSWERS</h2>
          </div>
          <FaqAccordion items={FAQS} />
        </div>
      </section>

      {/* ================================================================
          FINAL CTA
      ================================================================ */}
      <section className="py-16 md:py-24 bg-[#E85D04]">
        <div className="container max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 bg-black/20 text-white text-xs font-bold tracking-[0.3em] uppercase px-4 py-2 mb-6"><Clock className="w-3 h-3" /> Limited slots this month</div>
          <h2 className="font-display text-5xl md:text-7xl text-white mb-4 leading-none">DON&apos;T MISS THIS</h2>
          <p className="text-black/90 text-lg mb-4 max-w-xl mx-auto">{PRICE_TXT} for the System X ceramic coating on your paint, regular {WAS_TXT}, with the {WARRANTY} warranty. The offer ends when the last slot is booked or on {endDate}, whichever comes first.</p>
          <p className="text-orange-200/70 text-sm mb-10">Skyline Customs &mdash; Chantilly, VA &middot; {PHONE}</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href={quoteUrl} data-cta="ceramic-promo-claim" className={BTN_ON_ORANGE}>LOCK IN YOUR SLOT <ArrowRight className="w-5 h-5" /></a>
            <a href={TEL} className={BTN_ON_ORANGE_OUTLINE}>CALL {PHONE}</a>
          </div>
          <p className="text-black/60 text-xs mt-6 tracking-wide">No catch. Glossy paint, guaranteed 10 years.</p>
        </div>
      </section>

      <Footer />

      {/* ================================================================
          STICKY MOBILE CTA BAR
      ================================================================ */}
      <div data-sticky-bar className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[#0A0A0A] border-t border-zinc-800 p-3 flex items-center gap-3 shadow-2xl">
        <div className="flex-1 min-w-0 leading-tight">
          <p className="text-[11px] font-bold"><span className="text-zinc-500 line-through">{WAS_TXT}</span><span className="text-zinc-400"> · </span><span className="text-white">{PRICE_TXT}</span><span className="text-zinc-400"> · </span><span className="text-[#E85D04]">{WARRANTY} warranty</span></p>
          <p className="text-zinc-400 text-[11px] mt-0.5">System X ceramic special{timeLeftLabel(endDate) ? ` · ${timeLeftLabel(endDate)}` : ""}</p>
        </div>
        <a href={quoteUrl} data-cta="ceramic-promo-claim" className="cta shrink-0 bg-[#E85D04] text-black font-display text-sm tracking-widest px-4 py-3 hover:bg-orange-600 transition-colors">LOCK IN SLOT</a>
      </div>
      <div className="h-16 md:hidden" aria-hidden="true" />
    </div>
  );
}
