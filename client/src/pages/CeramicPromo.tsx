/**
 * /promo-ceramic: the ceramic coating special, laid out the same way as the
 * PPF promo (/promo): hero with price card, problem, offer, what you get,
 * guarantees, process, real cars and reviews, claim form, brand callout, FAQ,
 * final CTA, sticky mobile bar, exit prompt. $995 System X ceramic coating with
 * free glass and wheel coating, 6-year warranty, limited slots this month. Only
 * System X is named here. Leads use the shared promo form, tagged
 * ceramic-special-promo with the ceramic coating lead service.
 */
import { useEffect } from "react";
import { Link } from "wouter";
import { AlertTriangle, ArrowRight, CheckCircle, Clock, Droplets, Eye, Layers, Lock, MessageSquare, Phone, Shield, Sparkles, Star, Sun, Wrench } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import Testimonials from "@/components/Testimonials";
import PromoQuoteForm from "@/components/PromoQuoteForm";
import ExitPrompt from "@/components/ExitPrompt";
import { CountdownTimer, FaqAccordion, timeLeftLabel } from "@/pages/JuneSpecial";

const BASE_URL = "https://www.skylinecustomshop.com";
const PATH = "/promo-ceramic";
const PRICE = 995;
const PRICE_TXT = `$${PRICE}`;
const PHONE = "(703) 775-4383";
const TEL = "tel:+17037754383";
const SMS = "sms:+17037754383?&body=CERAMIC";
const HERO = "/images/ceramic_1_53c9aefc.webp";
const PROMO_TITLE = "Ceramic Special";
const PROMO_SLUG = "ceramic-special";
const PROMO_TAG = "ceramic-special-promo";
const DEAL = `${PRICE_TXT} System X ceramic coating with free glass coating and free wheel coating`;

/** The special runs through the end of the current month. */
export function endOfMonth(): string {
  const d = new Date();
  const last = new Date(d.getFullYear(), d.getMonth() + 1, 0);
  return last.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

const BTN = "inline-flex items-center justify-center gap-2 font-display text-lg md:text-xl tracking-[0.1em] uppercase px-8 py-4 md:py-5 transition-colors";
const BTN_PRIMARY = `${BTN} bg-[#E85D04] text-black hover:bg-orange-600`;
const BTN_ON_ORANGE = `${BTN} bg-black text-white hover:bg-zinc-900`;
const BTN_ON_ORANGE_OUTLINE = `${BTN} border border-black/60 text-black hover:bg-black hover:text-white`;
const FINE_PRINT = "text-zinc-400 text-xs tracking-wide";

const PHOTOS = [
  { src: "/images/w/bmw-ix-2026-full-front-ppf-ceramic-coating-chantilly-va-960.webp", alt: "BMW iX with a fresh ceramic coating at Skyline Customs in Chantilly, VA" },
  { src: "/images/w/2024-mercedes-gle-53-amg-coupe-full-front-ppf-ceramic-coating-chantilly-va-960.webp", alt: "Mercedes GLE 53 AMG coupe ceramic coated at Skyline Customs" },
  { src: "/images/w/2022-lucid-air-full-front-ppf-ceramic-coating-chantilly-va-960.webp", alt: "Lucid Air ceramic coated at Skyline Customs in Chantilly" },
  { src: "/images/w/2023-cadillac-escalade-full-front-ppf-ceramic-coating-chantilly-va-960.webp", alt: "Cadillac Escalade after ceramic coating at Skyline Customs" },
  { src: "/images/w/bmw-m340i-full-front-ppf-ceramic-coating-chantilly-va-960.webp", alt: "BMW M340i with ceramic coating, glossy finish, Chantilly VA" },
];

const FAQS = [
  { q: "How long does the ceramic coating take?", a: "One day for the coating with the glass and wheel bundle. Drop the car off in the morning at 4215 Walney Rd in Chantilly and it is ready the same day in most cases. If your paint needs correction first, we tell you up front and it adds a day." },
  { q: "How long before I can wash it?", a: "Seven days. The coating cures during that week, so keep it dry when you can and skip any wash. After that, hand washes or a touchless wash are fine." },
  { q: "Does it fix existing swirls or scratches?", a: "No. A ceramic coating locks in whatever is under it, so paint correction happens before the coating goes on. We inspect the paint when you drop off and quote correction separately if the car needs it." },
  { q: "What does the 6-year warranty cover?", a: "Chemical staining, UV fading, and water spotting on the coated surfaces for six years. It is a registered System X warranty and it is transferable, so it stays with the car if you sell." },
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
        title={`${PRICE_TXT} Ceramic Coating Special in Chantilly, VA | Glass + Wheels Free`}
        description={`System X ceramic coating for ${PRICE_TXT} with free glass coating and free wheel coating. 9H hardness, SGS lab certified, 6-year transferable warranty. Limited install slots this month at Skyline Customs, Chantilly, VA.`}
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
            "offers": { "@type": "Offer", "name": `${PRICE_TXT} ceramic coating with free glass and wheel coating`, "priceCurrency": "USD", "price": String(PRICE), "availability": "https://schema.org/LimitedAvailability", "itemCondition": "https://schema.org/NewCondition", "url": canonical, "seller": { "@type": "AutoBodyShop", "name": "Skyline Customs", "telephone": "+1-703-775-4383", "address": { "@type": "PostalAddress", "streetAddress": "4215 Walney Rd Suite 1A & B", "addressLocality": "Chantilly", "addressRegion": "VA", "postalCode": "20151", "addressCountry": "US" } } },
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
                <span className="block text-white text-5xl md:text-7xl">{PRICE_TXT} Full Ceramic Coating</span>
                <span className="block text-[#E85D04] text-5xl md:text-7xl">Glass + Wheels Free</span>
              </h1>
              <p className="text-zinc-300 text-lg leading-relaxed italic mb-7 max-w-lg">6-year System X protection &mdash; glossy paint that washes in minutes, with the glass and wheels done at no charge.</p>
              <div className="mb-7 max-w-lg">
                <a href={quoteUrl} data-cta="ceramic-promo-claim" className={`${BTN_PRIMARY} w-full`}>LOCK IN YOUR SLOT <ArrowRight className="w-5 h-5" /></a>
                <p className={`${FINE_PRINT} text-center mt-3`}>{PRICE_TXT} all in for paint, glass, and wheels. Registered 6-year warranty. Pay over time with Klarna, Afterpay, or Affirm.</p>
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
                  <span className="block font-display text-2xl leading-none tracking-wide">GLASS + WHEELS COATED FREE</span>
                  <span className="block text-sm text-zinc-300 mt-1">Windshield, every window, and all four wheels, included with every coating booked this month.</span>
                </span>
              </a>
            </div>

            <div className="space-y-4">
              <div className="border border-[#E85D04]/40 bg-[#E85D04]/5 p-6 md:p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-[#E85D04] text-black font-display text-xs tracking-widest px-3 py-1.5">FREE GLASS + WHEELS</div>
                <p className="text-[#E85D04] text-xs font-bold tracking-[0.3em] uppercase mb-3">Package price</p>
                <div className="flex items-baseline gap-3 mb-2"><span className="font-display text-[#E85D04] text-6xl leading-none">{PRICE_TXT}</span></div>
                <p className="text-white font-semibold text-base mb-1">Full System X ceramic coating + free glass and wheel coating</p>
                <p className="text-zinc-400 text-sm mb-1">Everything included. No add-ons. Price locked through {endDate}.</p>
                <p className="text-[#E85D04] text-sm font-semibold mb-5">Pay over time with Klarna, Afterpay, or Affirm.</p>
                <ul className="space-y-2 text-sm text-zinc-300 mb-6">
                  {["System X ceramic on every painted panel, 6-year registered warranty", "Glass coating on the windshield and every window at no charge", "Wheel coating on all four wheels at no charge", "Walk-and-pay: inspect every panel before you pay the balance"].map((line) => (
                    <li key={line} className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-[#E85D04] mt-0.5 shrink-0" />{line}</li>
                  ))}
                </ul>
                <a href={quoteUrl} data-cta="ceramic-promo-claim" className={`${BTN_PRIMARY} w-full`}>Lock in my slot <ArrowRight className="w-5 h-5" /></a>
                <p className="flex items-center justify-center gap-2 text-xs mt-3">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-bold text-emerald-400">Limited slots this month</span>
                  <span className="text-zinc-400">&middot; Ends {endDate}</span>
                </p>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: Lock, label: "Price Locked", sub: "No hidden fees" },
                  { icon: Star, label: "5-Star Rated", sub: "700+ reviews, all platforms" },
                  { icon: CheckCircle, label: "System X Certified", sub: "6-yr warranty" },
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
          FREE BAND (right under the hero)
      ================================================================ */}
      <section className="bg-[#E85D04] text-black">
        <div className="container max-w-6xl py-5 md:py-6 flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
          <div className="flex items-center gap-4">
            <Sparkles className="w-10 h-10 shrink-0" strokeWidth={1.75} />
            <div>
              <p className="font-display text-3xl md:text-4xl leading-none tracking-wide">GLASS + WHEELS FREE WITH EVERY COATING</p>
              <p className="text-black/80 text-sm md:text-base mt-1">Book the {PRICE_TXT} System X coating this month and the windshield, windows, and all four wheels are coated at no charge.</p>
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
            <h2 className="font-display text-5xl md:text-6xl text-white leading-none">EVERYTHING YOUR CAR NEEDS.<br /><span className="text-[#E85D04]">ONE PACKAGE. ONE PRICE.</span></h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-zinc-300 text-lg leading-relaxed mb-8">You pay for the System X ceramic coating on the paint. The glass coating and the wheel coating? Included free this month. Three coatings, one day in the shop, one price.</p>
              <div className="border border-zinc-800 bg-[#0D0D0D] p-8 mb-8">
                <p className="text-zinc-400 text-xs tracking-[0.3em] uppercase mb-3">Package Price</p>
                <div className="flex items-baseline gap-4 mb-2"><span className="font-display text-[#E85D04] text-6xl">{PRICE_TXT}</span></div>
                <p className="text-zinc-400 text-sm mb-4">Paint, glass, and wheels for {PRICE_TXT}. The glass and wheel coatings are included at no charge for bookings this month.</p>
                <div className="flex items-center gap-2 text-zinc-400 text-xs"><CheckCircle className="w-4 h-4 text-emerald-500" /> Price locked for all bookings before {endDate}</div>
                <div className="flex items-center gap-2 text-zinc-400 text-xs mt-2"><CheckCircle className="w-4 h-4 text-emerald-500" /> Pay over time with Klarna, Afterpay, or Affirm.</div>
              </div>
              <div className="mb-6">
                <p className="text-white font-bold text-sm tracking-widest uppercase mb-4">What You&apos;re Paying For</p>
                <div className="border-l-2 border-[#E85D04] pl-5">
                  <p className="font-display text-xl text-white mb-1">Full System X Ceramic Coating</p>
                  <p className="text-zinc-400 text-sm leading-relaxed">Every painted panel. 9H hardness, SGS lab certified, hydrophobic, UV defense. Backed by a registered, transferable 6-year warranty.</p>
                </div>
              </div>
              <a href={quoteUrl} data-cta="ceramic-promo-claim" className={`${BTN_PRIMARY} w-full`}>LOCK IN YOUR SLOT <ArrowRight className="w-5 h-5" /></a>
              <p className={`${FINE_PRINT} text-center mt-3`}>No catch. Glossy paint, guaranteed 6 years.</p>
            </div>
            <div className="border-2 border-[#E85D04]/50 bg-[#E85D04]/5 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-[#E85D04] text-black text-xs font-bold tracking-widest px-3 py-1.5">INCLUDED FREE</div>
                <span className="font-mono-brand text-zinc-400 text-sm">This month only</span>
              </div>
              <div className="space-y-5">
                {[
                  { name: "Glass Coating", sub: "Windshield and every window. Rain beads and sheets off at speed, wipers work less, wet-weather visibility improves." },
                  { name: "Wheel Coating", sub: "All four wheels, face and barrel. Brake dust rinses off instead of baking on, and the finish is protected from pitting." },
                ].map(({ name, sub }) => (
                  <div key={name} className="flex items-start justify-between gap-4 pb-5 border-b border-[#E85D04]/20 last:border-0 last:pb-0">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[#E85D04] shrink-0 mt-0.5" />
                      <div><p className="text-white font-semibold text-sm">{name}</p><p className="text-zinc-400 text-xs leading-relaxed">{sub}</p></div>
                    </div>
                    <span className="font-mono-brand text-emerald-400 text-xs shrink-0">FREE</span>
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
            <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">The Full Package</p>
            <h2 className="font-display text-5xl md:text-6xl text-white">WHAT YOU GET</h2>
            <p className="text-zinc-400 mt-4 max-w-2xl mx-auto">Three coatings, each on the surface it belongs on, all in one day.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { photo: PHOTOS[0].src, alt: PHOTOS[0].alt, title: "System X Ceramic Coating", sub: "Every painted panel", free: false, items: ["9H hardness, SGS lab certified", "Hydrophobic: water and dirt rinse off", "UV defense against fading", "Stops etching from bugs and bird droppings", "Registered 6-year warranty", "Transferable if you sell"] },
              { photo: PHOTOS[1].src, alt: PHOTOS[1].alt, title: "Glass Coating", sub: "Windshield + every window", free: true, items: ["Rain beads and sheets off", "Better wet-weather visibility", "Wipers work less", "Easier to clear frost and grime", "Included at no charge"] },
              { photo: PHOTOS[4].src, alt: PHOTOS[4].alt, title: "Wheel Coating", sub: "All four wheels", free: true, items: ["Face and barrel coated", "Brake dust rinses off", "Protects the finish from pitting", "Weekly wash becomes a hose-off", "Included at no charge"] },
            ].map(({ photo, alt, title: t, sub, free, items }) => (
              <div key={t} className={`border bg-[#0A0A0A] overflow-hidden ${free ? "border-zinc-800" : "border-[#E85D04]/60"}`}>
                <div className="relative aspect-[4/3] bg-zinc-900 overflow-hidden">
                  <img src={photo} alt={alt} loading="lazy" decoding="async" className="w-full h-full object-cover" />
                  {free && <div className="absolute top-3 left-3 bg-emerald-500 text-black text-xs font-bold tracking-widest px-2 py-1">INCLUDED FREE</div>}
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
              { number: "03", title: "6-Year Transferable Warranty", body: "Registered to your VIN, covering chemical staining, UV fading, and water spots. If you sell the car, the coverage goes with it, which buyers notice. Generic ceramic fades in a year or two with nothing behind it." },
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
              { step: "02", icon: Eye, title: "Paint Inspection", body: "Panel-by-panel check under the lights. If the paint needs correction, we tell you before the coating locks anything in." },
              { step: "03", icon: Layers, title: "Three Coatings", body: "System X on every painted panel, the glass coating on the windshield and windows, the wheel coating on all four wheels." },
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
                {["Exact price, not a range", "System X ceramic with the registered 6-year warranty", "Glass coating and wheel coating included at no charge", "Walk-and-pay: you inspect every panel before you pay the balance"].map((line) => (
                  <li key={line} className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-[#E85D04] mt-0.5 shrink-0" />{line}</li>
                ))}
              </ul>
              <div className="mt-8 space-y-3">
                <a href={SMS} data-cta="ceramic-promo-sms" className="flex items-center gap-3 border border-zinc-700 hover:border-[#E85D04] px-5 py-4 transition-colors"><MessageSquare className="w-5 h-5 text-[#E85D04]" /><span><span className="block text-white font-semibold">Text CERAMIC to {PHONE}</span><span className="block text-zinc-400 text-sm">Fastest on a phone</span></span></a>
                <a href={TEL} data-cta="ceramic-promo-call" className="inline-flex items-center gap-2 text-zinc-300 hover:text-white text-sm"><Phone className="w-4 h-4 text-[#E85D04]" /> Prefer to talk? {PHONE}</a>
              </div>
            </div>
            <div className="lg:col-span-3">
              <PromoQuoteForm promoTitle={PROMO_TITLE} promoSlug={PROMO_SLUG} dealDescription={DEAL} service="Ceramic Coating" buttonLabel="LOCK IN MY SLOT" footnote={`${PRICE_TXT} all in for paint, glass, and wheels. Nothing to pay now; you approve the price and date first.`} showDeposit={false} />
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
            A professional-grade ceramic coating, SGS lab certified at 9H hardness, applied by a certified installer and registered to your car. Hydrophobic, UV-stable, and backed by a <strong className="text-white">6-year transferable warranty</strong> against chemical staining, UV fading, and water spots.
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
          <p className="text-orange-100 text-lg mb-4 max-w-xl mx-auto">{PRICE_TXT} for the full System X ceramic coating, with the glass and wheels done free. The offer ends when the last slot is booked or on {endDate}, whichever comes first.</p>
          <p className="text-orange-200/70 text-sm mb-10">Skyline Customs &mdash; Chantilly, VA &middot; {PHONE}</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href={quoteUrl} data-cta="ceramic-promo-claim" className={BTN_ON_ORANGE}>LOCK IN YOUR SLOT <ArrowRight className="w-5 h-5" /></a>
            <a href={TEL} className={BTN_ON_ORANGE_OUTLINE}>CALL {PHONE}</a>
          </div>
          <p className="text-black/60 text-xs mt-6 tracking-wide">No catch. Glossy paint, guaranteed 6 years.</p>
        </div>
      </section>

      <Footer />

      {/* ================================================================
          STICKY MOBILE CTA BAR
      ================================================================ */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[#0A0A0A] border-t border-zinc-800 p-3 flex items-center gap-3 shadow-2xl">
        <div className="flex-1 min-w-0 leading-tight">
          <p className="text-[11px] font-bold"><span className="text-white">{PRICE_TXT}</span><span className="text-zinc-400"> · </span><span className="text-[#E85D04]">Glass + wheels free</span></p>
          <p className="text-zinc-400 text-[11px] mt-0.5">System X ceramic special{timeLeftLabel(endDate) ? ` · ${timeLeftLabel(endDate)}` : ""}</p>
        </div>
        <a href={quoteUrl} data-cta="ceramic-promo-claim" className="shrink-0 bg-[#E85D04] text-black font-display text-sm tracking-widest px-4 py-3 hover:bg-orange-600 transition-colors">LOCK IN SLOT</a>
      </div>
      <div className="h-16 md:hidden" aria-hidden="true" />
    </div>
  );
}
