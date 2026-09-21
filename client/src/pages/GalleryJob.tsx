/**
 * One page per real gallery job: /gallery/<car>-<services>
 * Content is generated from the gallery photo record (car + services parsed
 * from the alt text) so every install we post becomes an indexable page.
 * No prices on this page; every CTA goes to the free quote form.
 */
import { useState } from "react";
import { Link, useParams } from "wouter";
import { ArrowRight, CheckCircle, ChevronDown, Phone } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";
import NotFound from "@/pages/NotFound";
import { trpc } from "@/lib/trpc";
import { withJobSlugs, type GalleryJob as Job } from "@shared/galleryJobs";
import { PPF_PACKAGES } from "@/lib/ppf";
import { galleryJobNote } from "@shared/galleryJobNotes";
import { responsiveImage } from "@/lib/responsiveImage";

const BASE_URL = "https://www.skylinecustomshop.com";

const BRAND_PAGES: Record<NonNullable<Job["brandSlug"]>, { name: string; href: string }> = {
  tesla: { name: "Tesla PPF", href: "/tesla-ppf" },
  bmw: { name: "BMW PPF", href: "/bmw-ppf" },
  porsche: { name: "Porsche PPF", href: "/porsche-ppf" },
  corvette: { name: "Corvette PPF", href: "/corvette-ppf" },
  rivian: { name: "Rivian PPF", href: "/rivian-ppf" },
  bronco: { name: "Bronco PPF", href: "/bronco-ppf" },
};

const SERVICE_PAGES: { match: RegExp; label: string; href: string; city: string }[] = [
  { match: /ppf|paint protection/i, label: "Paint Protection Film", href: "/services/ppf", city: "/ppf-chantilly-va" },
  { match: /ceramic coat/i, label: "Ceramic Coating", href: "/services/ceramic-coating", city: "/ceramic-coating-chantilly-va" },
  { match: /tint/i, label: "Window Tinting", href: "/services/window-tinting", city: "/window-tinting-chantilly-va" },
];

const BODY_COPY: Record<Job["bodyType"], { why: string; tip: string }> = {
  truck: {
    why: "Trucks and off-road SUVs ride high and take the brunt of gravel, road salt, and trail debris on the hood, bumper, and rocker panels. Full front PPF stops rock chips on the panels that get hit first, and the Full Front Extended package adds rockers, door edges, and door cups for vehicles that see trails or a lot of passengers.",
    tip: "Hood and rocker panels take the most damage on a truck, so we recommend at least Full Front coverage with a look at rocker protection.",
  },
  suv: {
    why: "Family SUVs spend their life on I-66, Route 28, and the Toll Road behind trucks throwing gravel. The hood, bumper, and mirrors take constant chips, and door cups and door edges get scratched every time someone loads the back seat. Full front PPF covers the impact zones with no visible film line on the hood.",
    tip: "Door cups and door edges are the most common add-on for SUVs with kids in the back.",
  },
  sports: {
    why: "Low, wide sports cars catch everything the road kicks up. The bumper, hood, fenders, and mirrors chip fast, and factory paint on a performance car is expensive to repaint correctly. Self-healing PPF keeps the front end looking new, and a ceramic coating on top makes washing easy and keeps the gloss high.",
    tip: "We wrap the full front on sports cars so there is no film line across the hood at eye level.",
  },
  ev: {
    why: "EVs are quiet, quick, and heavy, and their factory paint is often thin. Instant torque means more time behind traffic throwing gravel, and single-stage repairs on EV paint are expensive. Full front PPF protects the bumper, hood, and fenders, and the self-healing top coat takes care of light swirls from washing.",
    tip: "EV front bumpers house sensors and cameras. We cut and tuck the film around them so nothing is covered or misaligned.",
  },
  sedan: {
    why: "Daily-driven sedans rack up highway miles, and the front end pays for it: rock chips on the bumper and hood, sandblasting on the mirrors and fenders. Full front PPF stops that damage before it starts and keeps resale value where it should be.",
    tip: "Most sedan owners choose Full Front so the hood has no visible film line and the headlights are covered too.",
  },
};

const FAQS = (job: Job) => {
  const hasCeramic = job.services.some((s) => /ceramic coat/i.test(s));
  return [
    {
      q: `How long does ${job.services.join(" + ").toLowerCase()} take on a ${job.car}?`,
      a: hasCeramic
        ? `Full front PPF is a one-day install. Adding a ceramic coating means a full paint decontamination and cure time, so plan on two days for the ${job.car}. We confirm the schedule when you book.`
        : `Most full front PPF installs on a ${job.car} are done in one day. Extended coverage or paint correction can add a day; we confirm timing when you book.`,
    },
    {
      q: "Which film do you use, and what is the warranty?",
      a: "We install STEK paint protection film with a 12-year manufacturer warranty against yellowing, cracking, peeling, and bubbling. The top coat self-heals light scratches with heat from the sun or warm water.",
    },
    {
      q: `Can I get a quote for my own ${job.car}?`,
      a: `Yes. Use the quote form and tell us the year, trim, and coverage you want. We reply the same business day with a written quote for your ${job.car}, and there is no obligation.`,
    },
  ];
};

const svcLabel = (services: string[]) => services.join(" + ");

export default function GalleryJob() {
  const { slug } = useParams<{ slug: string }>();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const { data: photos, isLoading } = trpc.site.gallery.useQuery(undefined, { staleTime: 10 * 60 * 1000 });
  const jobs = withJobSlugs(photos ?? []);
  const job = jobs.find((j) => j.slug === slug);

  if (!job) {
    if (isLoading || !photos) {
      return (
        <div className="min-h-screen bg-[#0A0A0A] text-white">
          <Navbar />
          <div className="container pt-40 pb-24">
            <div className="h-8 w-2/3 bg-zinc-900 animate-pulse mb-4" />
            <div className="aspect-[4/3] max-w-3xl bg-zinc-900 animate-pulse" />
          </div>
        </div>
      );
    }
    return <NotFound />;
  }

  const services = svcLabel(job.services);
  const title = `${job.car} ${services} in Chantilly, VA`;
  const canonical = `${BASE_URL}/gallery/${job.slug}`;
  const brand = job.brandSlug ? BRAND_PAGES[job.brandSlug] : undefined;
  const servicePages = SERVICE_PAGES.filter((s) => job.services.some((j) => s.match.test(j)));
  const primaryService = servicePages[0] ?? SERVICE_PAGES[0];
  const hasPpf = job.services.some((s) => /ppf/i.test(s));
  const hasCeramic = job.services.some((s) => /ceramic coat/i.test(s));
  const copy = BODY_COPY[job.bodyType];
  const ppfService = job.services.find((s) => /ppf/i.test(s)) ?? "";
  const pkg = PPF_PACKAGES.find((p) => p.key === (/extended|plus/i.test(ppfService) ? "fullFrontPlus" : /partial/i.test(ppfService) ? "partial" : "fullFront"));
  const make = job.car.replace(/^\d{4}\s+/, "").split(" ")[0];
  const quoteHref = `/get-a-quote?service=${hasPpf ? "ppf" : hasCeramic ? "ceramic" : "tint"}&make=${encodeURIComponent(make)}`;
  const related = jobs.filter((j) => j.slug !== job.slug && (j.bodyType === job.bodyType || (job.brandSlug && j.brandSlug === job.brandSlug))).slice(0, 4);
  const more = related.length < 4 ? jobs.filter((j) => j.slug !== job.slug && !related.includes(j)).slice(0, 4 - related.length) : [];
  const relatedJobs = [...related, ...more];
  const note = galleryJobNote(job.slug);
  const faqs = [...(note ? [note.faq] : []), ...FAQS(job)];
  const description = `${services} on a ${job.car} at Skyline Customs in Chantilly, VA. What we covered and why it fits this car. STEK film, 12-year warranty. Free quotes.`;
  const dateCreated = job.createdAt ? new Date(job.createdAt).toISOString().slice(0, 10) : undefined;

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-['DM_Sans',sans-serif]">
      <SEO
        title={title}
        description={description}
        canonical={canonical}
        ogImage={job.photoUrl}
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": title,
            "url": canonical,
            "description": description,
            ...(dateCreated ? { datePublished: dateCreated } : {}),
            "primaryImageOfPage": {
              "@type": "ImageObject",
              "contentUrl": `${BASE_URL}${job.photoUrl}`,
              "url": `${BASE_URL}${job.photoUrl}`,
              "name": `${job.car} ${services}`,
              "description": `${job.alt} at Skyline Customs in Chantilly, VA`,
              "creator": { "@type": "Organization", "name": "Skyline Custom Shop" },
              "copyrightNotice": "Skyline Custom Shop",
              "creditText": "Skyline Custom Shop, Chantilly VA",
              "acquireLicensePage": `${BASE_URL}/contact`,
            },
            "about": { "@type": "Service", "serviceType": services, "provider": { "@type": "AutoBodyShop", "name": "Skyline Custom Shop", "url": BASE_URL, "telephone": "+17037754383" } },
          },
          { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": faqs.map((f) => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } })) },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": `${BASE_URL}/` },
              { "@type": "ListItem", "position": 2, "name": "Gallery", "item": `${BASE_URL}/gallery` },
              { "@type": "ListItem", "position": 3, "name": title, "item": canonical },
            ],
          },
        ]}
      />
      <Navbar />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-12 bg-[#0A0A0A]">
          <div className="container max-w-5xl">
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Gallery", href: "/gallery" }, { label: job.car }]} className="mb-6" />
            <p className="text-[#E85D04] text-xs font-bold tracking-[0.3em] uppercase mb-3">Real job · Chantilly, VA</p>
            <h1 className="font-['Bebas_Neue',sans-serif] text-5xl md:text-7xl text-white leading-none mb-6">{job.car} {services} in Chantilly, VA</h1>
            <p className="text-zinc-300 text-lg leading-relaxed max-w-3xl">
              {note ? note.intro : `A ${job.car} came into our Chantilly bay for ${services.toLowerCase()}. Here is what we covered, why this coverage fits the ${job.car}, and how the install went.`}
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <Link href={quoteHref} className="bg-[#E85D04] hover:bg-[#d14e00] text-black font-bold tracking-widest uppercase px-8 py-4 transition-all duration-200 hover:scale-105 inline-flex items-center gap-2">
                Quote my {make} <ArrowRight className="w-4 h-4" />
              </Link>
              <a href="tel:+17037754383" className="border border-zinc-700 hover:border-[#E85D04] text-white font-bold tracking-widest uppercase px-8 py-4 inline-flex items-center gap-2 transition-colors">
                <Phone className="w-4 h-4" /> (703) 775-4383
              </a>
            </div>
          </div>
        </section>

        {/* Photo */}
        <section className="pb-12 bg-[#0A0A0A]">
          <div className="container max-w-5xl">
            <figure className="border border-zinc-800 bg-[#0D0D0D]">
              <img
                src={job.photoUrl}
                {...responsiveImage(job.photoUrl)}
                sizes="(min-width: 1024px) 960px, 100vw"
                alt={`${job.alt} at Skyline Custom Shop in Chantilly, VA`}
                fetchPriority="high"
                decoding="async"
                className="w-full aspect-[4/3] object-cover"
              />
              <figcaption className="px-5 py-4 text-sm text-zinc-400 flex flex-wrap items-center justify-between gap-2">
                <span>{job.car} · {services}</span>
                <span className="text-[#E85D04] text-xs font-bold tracking-widest uppercase">Installed at 4215 Walney Rd, Chantilly</span>
              </figcaption>
            </figure>
          </div>
        </section>

        {/* What we did + why */}
        <section className="py-16 bg-[#0D0D0D] border-t border-zinc-800">
          <div className="container max-w-5xl grid grid-cols-1 md:grid-cols-5 gap-10">
            <div className="md:col-span-2">
              <p className="text-[#E85D04] text-xs font-bold tracking-[0.3em] uppercase mb-2">What we did</p>
              <h2 className="font-['Bebas_Neue',sans-serif] text-4xl text-white mb-6">THE JOB</h2>
              <ul className="space-y-3">
                {job.services.map((s) => (
                  <li key={s} className="flex items-start gap-3 text-zinc-200">
                    <CheckCircle className="w-5 h-5 text-[#E85D04] mt-0.5 shrink-0" />
                    <span>{s}</span>
                  </li>
                ))}
                {hasPpf && pkg && pkg.coverage.map((c) => (
                  <li key={c} className="flex items-start gap-3 text-zinc-400 text-sm pl-8">
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
              <dl className="mt-8 grid grid-cols-2 gap-4 text-sm">
                <div className="border border-zinc-800 p-4">
                  <dt className="text-zinc-400 text-xs uppercase tracking-widest mb-1">Vehicle</dt>
                  <dd className="text-white font-semibold">{job.car}</dd>
                </div>
                <div className="border border-zinc-800 p-4">
                  <dt className="text-zinc-400 text-xs uppercase tracking-widest mb-1">Location</dt>
                  <dd className="text-white font-semibold">Chantilly, VA</dd>
                </div>
                {hasPpf && (
                  <div className="border border-zinc-800 p-4">
                    <dt className="text-zinc-400 text-xs uppercase tracking-widest mb-1">Film</dt>
                    <dd className="text-white font-semibold">STEK, 12-year warranty</dd>
                  </div>
                )}
                {hasCeramic && (
                  <div className="border border-zinc-800 p-4">
                    <dt className="text-zinc-400 text-xs uppercase tracking-widest mb-1">Coating</dt>
                    <dd className="text-white font-semibold">Gtechniq ceramic</dd>
                  </div>
                )}
              </dl>
            </div>
            <div className="md:col-span-3">
              <p className="text-[#E85D04] text-xs font-bold tracking-[0.3em] uppercase mb-2">Why this coverage</p>
              <h2 className="font-['Bebas_Neue',sans-serif] text-4xl text-white mb-6">WHY {services.toUpperCase()} FITS THE {job.car.toUpperCase()}</h2>
              <p className="text-zinc-300 leading-relaxed mb-5">{note ? note.why : copy.why}</p>
              {hasCeramic && !note && (
                <p className="text-zinc-300 leading-relaxed mb-5">
                  The ceramic coating goes on after the film cures. It bonds to the PPF and the exposed paint, adds a slick hydrophobic layer that sheds water and road grime, and makes the {job.car} much easier to wash. Coated film also resists the water spotting and bug etching that dull uncoated film over time.
                </p>
              )}
              {!note && <p className="text-zinc-400 text-sm border-l-2 border-[#E85D04] pl-4 mb-8">{copy.tip}</p>}

              <h3 className="font-['Bebas_Neue',sans-serif] text-2xl text-white mb-3">HOW THE INSTALL WENT</h3>
              <ol className="space-y-3 text-zinc-300 text-sm">
                <li><span className="text-[#E85D04] font-bold mr-2">01</span>Two-bucket wash, iron decontamination, and clay bar so nothing is trapped under the film.</li>
                {hasPpf && <li><span className="text-[#E85D04] font-bold mr-2">02</span>Computer-cut STEK patterns for the {job.car}, with edges wrapped or tucked where the panel allows so there is no visible edge.</li>}
                {hasPpf && <li><span className="text-[#E85D04] font-bold mr-2">03</span>Wet install, squeegee-out, and a heat set on every edge so the film stays put through Virginia summers and car washes.</li>}
                {hasCeramic && <li><span className="text-[#E85D04] font-bold mr-2">{hasPpf ? "04" : "02"}</span>Panel wipe and ceramic coating applied to the film and the paint, then cured indoors before the car goes home.</li>}
                <li><span className="text-[#E85D04] font-bold mr-2">{hasPpf && hasCeramic ? "05" : hasPpf || hasCeramic ? "03" : "02"}</span>Final inspection under our lights, aftercare walkthrough, and warranty registration.</li>
              </ol>
            </div>
          </div>
        </section>

        {/* Links to service / brand pages */}
        <section className="py-12 bg-[#0A0A0A] border-t border-zinc-800">
          <div className="container max-w-5xl">
            <p className="text-[#E85D04] text-xs font-bold tracking-[0.3em] uppercase mb-4">Learn more</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {servicePages.map((s) => (
                <Link key={s.href} href={s.href} className="border border-zinc-800 bg-[#111] p-5 hover:border-[#E85D04] transition-colors">
                  <p className="text-white font-bold">{s.label}</p>
                  <p className="text-zinc-400 text-xs mt-1">Service page</p>
                </Link>
              ))}
              {brand && (
                <Link href={brand.href} className="border border-zinc-800 bg-[#111] p-5 hover:border-[#E85D04] transition-colors">
                  <p className="text-white font-bold">{brand.name}</p>
                  <p className="text-zinc-400 text-xs mt-1">Coverage and FAQ for {brand.name.replace(" PPF", "")}</p>
                </Link>
              )}
              {hasPpf && (
                <Link href="/ppf-cost" className="border border-zinc-800 bg-[#111] p-5 hover:border-[#E85D04] transition-colors">
                  <p className="text-white font-bold">What drives PPF cost</p>
                  <p className="text-zinc-400 text-xs mt-1">Coverage, film, and vehicle size</p>
                </Link>
              )}
              <Link href={primaryService.city} className="border border-zinc-800 bg-[#111] p-5 hover:border-[#E85D04] transition-colors">
                <p className="text-white font-bold">{primaryService.label} in Chantilly</p>
                <p className="text-zinc-400 text-xs mt-1">Our home shop page</p>
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-[#0D0D0D] border-t border-zinc-800">
          <div className="container max-w-3xl">
            <p className="text-[#E85D04] text-xs font-bold tracking-[0.3em] uppercase mb-2">Questions</p>
            <h2 className="font-['Bebas_Neue',sans-serif] text-4xl text-white mb-8">{job.car.toUpperCase()} FAQ</h2>
            <div className="divide-y divide-zinc-800 border-y border-zinc-800">
              {faqs.map((f, i) => (
                <div key={f.q}>
                  <button type="button" onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between gap-4 py-5 text-left text-white font-semibold">
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

        {/* Related jobs */}
        {relatedJobs.length > 0 && (
          <section className="py-16 bg-[#0A0A0A] border-t border-zinc-800">
            <div className="container max-w-5xl">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
                <div>
                  <p className="text-[#E85D04] text-xs font-bold tracking-[0.3em] uppercase mb-2">More from the bay</p>
                  <h2 className="font-['Bebas_Neue',sans-serif] text-4xl text-white">SIMILAR JOBS</h2>
                </div>
                <Link href="/gallery" className="text-[#E85D04] text-xs font-bold tracking-widest uppercase hover:text-white inline-flex items-center gap-2">Full gallery <ArrowRight className="w-3 h-3" /></Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-zinc-800">
                {relatedJobs.map((r) => (
                  <Link key={r.slug} href={`/gallery/${r.slug}`} className="block bg-[#0A0A0A] group">
                    <img src={r.photoUrl} srcSet={responsiveImage(r.photoUrl).srcSet} sizes="(min-width: 768px) 240px, 45vw" alt={`${r.alt} at Skyline Custom Shop in Chantilly, VA`} loading="lazy" decoding="async" width="600" height="450" className="w-full aspect-[4/3] object-cover group-hover:opacity-90 transition-opacity" />
                    <p className="text-white text-sm font-semibold px-3 pt-3">{r.car}</p>
                    <p className="text-zinc-400 text-xs px-3 pb-3">{svcLabel(r.services)}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="py-20 bg-[#E85D04] text-black">
          <div className="container max-w-4xl text-center">
            <h2 className="font-['Bebas_Neue',sans-serif] text-5xl md:text-6xl leading-none mb-4">PROTECT YOUR {make.toUpperCase()} LIKE THIS ONE</h2>
            <p className="text-black/80 text-lg mb-8">Tell us your year, trim, and the coverage you want. Written quote the same business day, no obligation. Serving Chantilly, Centreville, Herndon, Reston, Fairfax, and all of Northern Virginia.</p>
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
