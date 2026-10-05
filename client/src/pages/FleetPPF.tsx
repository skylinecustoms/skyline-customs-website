/**
 * /fleet-ppf: paint protection, tint, and coatings for fleets, dealers, and
 * company vehicles. Written for the person who manages the vehicles, not the
 * person who drives one. The form tags the lead fleet-lead in the CRM.
 */
import { useState } from "react";
import { Link } from "wouter";
import { ArrowRight, CheckCircle, ChevronDown, Phone, Building2, Truck, CarFront, ClipboardList, FileText, CalendarCheck, ShieldCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";
import Testimonials from "@/components/Testimonials";
import FleetForm from "@/components/FleetForm";
import { trpc } from "@/lib/trpc";
import { withJobSlugs } from "@shared/galleryJobs";
import { responsiveImage } from "@/lib/responsiveImage";

const BASE_URL = "https://www.skylinecustomshop.com";
export const FLEET_META = {
  path: "/fleet-ppf",
  title: "Fleet PPF, Tint & Ceramic Coating in Northern Virginia | Skyline Customs",
  description: "Paint protection film, window tint, and ceramic coating for fleets, dealerships, and company vehicles across Virginia, Maryland, and DC. Standing schedules, one invoice, one warranty file. Per-unit pricing in one business day.",
};

const WHO = [
  { icon: Building2, title: "Dealerships", desc: "Full front film on new inventory before delivery, or an add-on your desk sells and sends to us. Same patterns on every unit, back on your lot the next day." },
  { icon: Truck, title: "Service and trade fleets", desc: "HVAC, plumbing, electrical, landscaping, delivery. A chipped hood under your logo is the first thing a customer sees in their driveway." },
  { icon: CarFront, title: "Black car, limo, and rental", desc: "Vehicles that get washed every week and judged every day. Film on the front, coating everywhere, tint for the passengers." },
  { icon: ClipboardList, title: "Leasing, government, and contractor pools", desc: "Fewer paint repairs at return and a cleaner inspection on every unit, with the paperwork handled once for the whole pool." },
];

const GET = [
  { icon: FileText, title: "One contact, one invoice, one warranty file", body: "You deal with Mo. Every unit is logged by VIN with its film, coating, and tint, so a claim or a lease return takes one email, not a search through receipts." },
  { icon: CalendarCheck, title: "A standing schedule", body: "Several vehicles a week on fixed days, coordinated with your dispatcher. Drop at 9, back by end of day for film or tint; coatings take two days. Keys and paperwork handled at the counter." },
  { icon: ShieldCheck, title: "Uniform work, every unit", body: "Patterns are plotter-cut from the same file for every vehicle of a model, edges wrapped the same way, so the fleet looks like a fleet and not twelve different jobs." },
];

const MATH = [
  { title: "Lease returns and resale", body: "Front-end chips and bumper scuffs are what inspections charge for and what buyers haggle over. Film takes the hits instead of the paint and comes off clean when the unit is sold." },
  { title: "Downtime", body: "One day per vehicle for a full front install, done on a rolling schedule so you never park the fleet. Tint is two to three hours; a vehicle can be back on the road the same afternoon." },
  { title: "Washing and appearance", body: "A ceramic coating cuts wash time on vehicles that get cleaned weekly and keeps logos and paint from dulling in the sun. Drivers notice; so do customers." },
];

const STEPS = [
  { title: "Walk the fleet", desc: "Send us the vehicle list or we visit the yard. We confirm models, counts, and what each unit needs." },
  { title: "Per-unit quote", desc: "One price per model and package, written, within a business day. No pricing on this page: fleets are quoted on the actual list." },
  { title: "Pilot unit", desc: "We do one vehicle first so your team sees the edges, the finish, and the turnaround before committing the fleet." },
  { title: "Rolling schedule", desc: "Fixed days each week until the fleet is done, then the same slot for new units as they arrive." },
];

const FAQS = [
  { q: "What is the minimum fleet size?", a: "Two vehicles. The standing-schedule pricing starts to matter at around six, and dealerships usually send units as they land, so there is no upper limit. Tell us the real number and we quote on that." },
  { q: "Can you work at our lot instead of the shop?", a: "Film and coatings are done at our Chantilly shop, in a dust-controlled bay, because that is what the warranty and the finish require. We coordinate pickups so your vehicles move in batches on fixed days rather than one at a time." },
  { q: "Which package do fleets usually choose?", a: "Full front PPF: hood, bumper, both fenders, mirrors, and headlights, in STEK DYNOshield with the 12-year manufacturer warranty. Trucks and vans that carry ladders or tow often add full front extended for the rockers and door edges. Tint is a driver-comfort add-on; coating is for fleets that wash weekly." },
  { q: "How is a fleet invoiced?", a: "One invoice per batch, net terms for established accounts, card or ACH otherwise. Every unit is listed by VIN with its services, and the warranty paperwork for the whole batch comes in one file." },
  { q: "Do you handle dealership add-on sales?", a: "Yes. Your desk sells the protection package, the customer drops the car with us or you send it over, and the vehicle goes back to you or to the owner the next day with its warranty registered. Many of our customers first met us that way." },
  { q: "Can you match an existing fleet look, like a dark tint spec or a matte film?", a: "Yes, within what is legal where the vehicles are registered. Virginia, Maryland, and DC each have their own tint limits, and we spec the fleet to the state it lives in, so your drivers never have an inspection problem." },
];

export default function FleetPPF() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const { data: photos } = trpc.site.gallery.useQuery(undefined, { staleTime: 10 * 60 * 1000 });
  const jobs = withJobSlugs(photos ?? []).filter((p) => p.bodyType === "truck" || p.bodyType === "suv").slice(0, 4);
  const canonical = `${BASE_URL}${FLEET_META.path}`;

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <SEO
        title={FLEET_META.title}
        description={FLEET_META.description}
        canonical={canonical}
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Fleet paint protection film, window tint, and ceramic coating",
            "name": "Fleet Vehicle Protection",
            "description": FLEET_META.description,
            "url": canonical,
            "audience": { "@type": "BusinessAudience", "audienceType": "Fleet managers, dealerships, and company vehicle owners" },
            "areaServed": ["Northern Virginia", "Maryland", "Washington, DC"],
            "provider": { "@type": "AutoBodyShop", "name": "Skyline Customs", "telephone": "+1-703-775-4383", "address": { "@type": "PostalAddress", "streetAddress": "4215 Walney Rd Suite 1A & B", "addressLocality": "Chantilly", "addressRegion": "VA", "postalCode": "20151", "addressCountry": "US" } },
          },
          { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": FAQS.map((f) => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } })) },
        ]}
      />
      <Navbar />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-14 bg-[#0A0A0A]">
          <div className="container max-w-5xl">
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: "Fleet" }]} className="mb-6" />
            <p className="text-[#E85D04] text-xs font-bold tracking-[0.3em] uppercase mb-3">Fleets, dealerships &amp; company vehicles · Chantilly, VA</p>
            <h1 className="font-['Bebas_Neue',sans-serif] text-5xl md:text-7xl lg:text-8xl text-white leading-none mb-6">PAINT PROTECTION FOR THE WHOLE FLEET</h1>
            <p className="text-zinc-300 text-lg leading-relaxed max-w-3xl mb-4">If you manage the vehicles instead of driving one, the questions change. Not "is PPF worth it", but how many units a week, who signs the invoice, and what the lease-return bill looks like in three years. This page answers those.</p>
            <p className="text-zinc-300 text-lg leading-relaxed max-w-3xl">Skyline Customs installs STEK DYNOshield paint protection film, GeoShield ceramic tint, and Gtechniq coatings for fleets across Northern Virginia, Maryland, and DC from one shop in Chantilly, on a standing schedule, with one contact and one warranty file for everything you send us.</p>
            <div className="flex flex-wrap gap-3 mt-8">
              <a href="#fleet-quote" className="bg-[#E85D04] hover:bg-[#d14e00] text-black font-bold tracking-widest uppercase px-8 py-4 transition-colors inline-flex items-center gap-2">Get fleet pricing <ArrowRight className="w-4 h-4" /></a>
              <a href="tel:+17037754383" className="border border-zinc-700 hover:border-[#E85D04] text-white font-bold tracking-widest uppercase px-8 py-4 inline-flex items-center gap-2 transition-colors"><Phone className="w-4 h-4" /> Call and ask for Mo</a>
            </div>
          </div>
        </section>

        {/* Who */}
        <section className="py-16 bg-[#0D0D0D] border-t border-zinc-800">
          <div className="container max-w-5xl">
            <p className="text-[#E85D04] text-xs font-bold tracking-[0.3em] uppercase mb-2">Who we work with</p>
            <h2 className="font-['Bebas_Neue',sans-serif] text-4xl md:text-5xl text-white mb-8">FOUR KINDS OF FLEET</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-zinc-800">
              {WHO.map((w) => (
                <div key={w.title} className="bg-[#0D0D0D] p-6">
                  <w.icon className="w-5 h-5 text-[#E85D04] mb-3" />
                  <h3 className="text-white font-bold mb-2">{w.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What you get */}
        <section className="py-16 bg-[#0A0A0A] border-t border-zinc-800">
          <div className="container max-w-5xl">
            <p className="text-[#E85D04] text-xs font-bold tracking-[0.3em] uppercase mb-2">How a fleet account runs</p>
            <h2 className="font-['Bebas_Neue',sans-serif] text-4xl md:text-5xl text-white mb-8">WHAT CHANGES WHEN IT IS MORE THAN ONE CAR</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {GET.map((g) => (
                <div key={g.title}>
                  <g.icon className="w-6 h-6 text-[#E85D04] mb-3" />
                  <h3 className="font-['Bebas_Neue',sans-serif] text-2xl text-white mb-3">{g.title.toUpperCase()}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">{g.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* The math */}
        <section className="py-16 bg-[#0D0D0D] border-t border-zinc-800">
          <div className="container max-w-5xl">
            <p className="text-[#E85D04] text-xs font-bold tracking-[0.3em] uppercase mb-2">The numbers a fleet manager cares about</p>
            <h2 className="font-['Bebas_Neue',sans-serif] text-4xl md:text-5xl text-white mb-8">WHERE THE MONEY ACTUALLY IS</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-zinc-800">
              {MATH.map((m) => (
                <div key={m.title} className="bg-[#0D0D0D] p-6">
                  <h3 className="text-white font-bold mb-2">{m.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">{m.body}</p>
                </div>
              ))}
            </div>
            <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-sm text-zinc-300">
              {["STEK DYNOshield film, self-healing, 12-year manufacturer warranty", "GeoShield ceramic tint, metal-free, lifetime warranty, specced to each state's law", "Gtechniq coatings, 5-year or 7-year, over film and paint", "Walk-and-pay inspection on every unit before the batch invoice"].map((l) => (
                <li key={l} className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-[#E85D04] mt-0.5 shrink-0" />{l}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* Process */}
        <section className="py-16 bg-[#0A0A0A] border-t border-zinc-800">
          <div className="container max-w-5xl">
            <p className="text-[#E85D04] text-xs font-bold tracking-[0.3em] uppercase mb-2">From list to done</p>
            <h2 className="font-['Bebas_Neue',sans-serif] text-4xl md:text-5xl text-white mb-8">HOW A FLEET JOB GOES</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-zinc-800">
              {STEPS.map((s, i) => (
                <div key={s.title} className="bg-[#0A0A0A] p-5 md:p-6">
                  <div className="font-display text-4xl text-[#E85D04] mb-3">0{i + 1}</div>
                  <h3 className="font-['Bebas_Neue',sans-serif] text-xl md:text-2xl text-white mb-2">{s.title.toUpperCase()}</h3>
                  <p className="text-zinc-400 text-xs md:text-sm leading-relaxed">{s.desc}</p>
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
              <h2 className="font-['Bebas_Neue',sans-serif] text-4xl text-white mb-8">TRUCKS AND SUVS WE HAVE FILMED</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-zinc-800">
                {jobs.map((p) => (
                  <Link key={p.id} href={`/gallery/${p.slug}`} className="block bg-[#0D0D0D] group">
                    <img src={p.photoUrl} srcSet={responsiveImage(p.photoUrl).srcSet} sizes="(min-width: 768px) 25vw, 50vw" alt={`${p.alt} at Skyline Custom Shop in Chantilly, VA`} loading="lazy" decoding="async" width="480" height="360" className="w-full aspect-[4/3] object-cover group-hover:opacity-90 transition-opacity" />
                    <p className="p-3 text-zinc-400 text-xs"><span className="text-white font-semibold">{p.car}</span> · {p.services.join(" + ")}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FAQ */}
        <section className="py-16 bg-[#0A0A0A] border-t border-zinc-800">
          <div className="container max-w-3xl">
            <p className="text-[#E85D04] text-xs font-bold tracking-[0.3em] uppercase mb-2">Questions</p>
            <h2 className="font-['Bebas_Neue',sans-serif] text-4xl text-white mb-8">FLEET QUESTIONS</h2>
            <div className="divide-y divide-zinc-800 border-y border-zinc-800">
              {FAQS.map((f, i) => (
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

        <Testimonials title="WHAT OWNERS SAY ABOUT OUR WORK" focus={["ppf"]} />

        {/* Form */}
        <section id="fleet-quote" className="py-16 md:py-24 bg-[#140C07] border-y border-[#E85D04]/30 scroll-mt-20">
          <div className="container max-w-6xl grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
            <div className="lg:col-span-2">
              <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">Fleet pricing</p>
              <h2 className="font-['Bebas_Neue',sans-serif] text-5xl text-white leading-none mb-5">TELL US ABOUT THE FLEET</h2>
              <p className="text-zinc-300 leading-relaxed mb-6">Company, how many vehicles, what kinds. Mo calls back within one business day with per-unit pricing and a pilot-unit date. No pricing is published for fleets because every list is different.</p>
              <ul className="space-y-3 text-sm text-zinc-300">
                {["Per-unit written quote by model and package", "Standing weekly schedule around your dispatch", "One invoice and one warranty file per batch", "Pilot unit first, so your team sees the work before committing"].map((line) => (
                  <li key={line} className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-[#E85D04] mt-0.5 shrink-0" />{line}</li>
                ))}
              </ul>
              <a href="tel:+17037754383" className="inline-flex items-center gap-2 mt-8 text-zinc-300 hover:text-white text-sm"><Phone className="w-4 h-4 text-[#E85D04]" /> Prefer to talk? (703) 775-4383</a>
            </div>
            <div className="lg:col-span-3"><FleetForm /></div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
