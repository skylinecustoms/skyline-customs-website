/**
 * SKYLINE CUSTOMS — Local SEO Landing Page template
 *
 * Renders every city × service page (/ppf-reston-va, /window-tinting-ashburn-va, ...)
 * from the data in @/lib/localSeo so each page gets service-correct, city-specific
 * copy, FAQs, and structured data. The page files in client/src/pages are thin
 * wrappers around this component.
 */

import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Testimonials from "@/components/Testimonials";
import SEO from "@/components/SEO";
import NearbyAreas from "@/components/NearbyAreas";
import ActivePromoBanner from "@/components/ActivePromoBanner";
import { Shield, MapPin, Phone, Star, CheckCircle, ArrowRight, ChevronDown } from "lucide-react";
import { useState } from "react";
import { CITIES, SERVICES, cityPath, type ServiceKey } from "@/lib/localSeo";
import { trpc } from "@/lib/trpc";
import { withJobSlugs } from "@shared/galleryJobs";
import { responsiveImage } from "@/lib/responsiveImage";
import { cityServiceNote } from "@/lib/localSeoNotes";

const SERVICE_MATCH: Record<ServiceKey, RegExp> = { ppf: /ppf|paint protection/i, ceramic: /ceramic coat/i, tint: /tint/i };
const FALLBACK_PHOTO = { photoUrl: "/images/ppf_1_c7c64665.webp", alt: "Paint protection film installation on a Corvette C8" };

function hash(s: string) { let h = 0; for (const ch of s) h = (h * 31 + ch.charCodeAt(0)) >>> 0; return h; }

/** One real customer-car photo per city page, rotated deterministically so each page is different. */
function CityPhoto({ cityName, cityLabel, service }: { cityName: string; cityLabel: string; service: ServiceKey }) {
  const { data: photos } = trpc.site.gallery.useQuery(undefined, { staleTime: 10 * 60 * 1000 });
  const all = withJobSlugs(photos ?? []);
  const pool = all.filter((p) => SERVICE_MATCH[service].test(p.alt));
  const list = pool.length > 0 ? pool : all;
  const photo = list.length > 0 ? list[hash(`${cityName}-${service}`) % list.length] : FALLBACK_PHOTO;
  const svcLabel = SERVICES[service].label.toLowerCase();
  return (
    <section className="bg-[#0A0A0A]">
      <div className="container py-10">
        <figure className="relative overflow-hidden border border-zinc-800">
          <img
            src={photo.photoUrl}
            srcSet={responsiveImage(photo.photoUrl).srcSet}
            sizes="(min-width: 1280px) 1100px, 100vw"
            alt={`${photo.alt} at Skyline Custom Shop in Chantilly, VA, serving ${cityLabel}`}
            loading="lazy"
            decoding="async"
            className="w-full aspect-[21/9] object-cover"
          />
          <figcaption className="absolute left-0 right-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-5 py-4 text-sm text-zinc-200">
            <span className="text-[#E85D04] font-bold uppercase tracking-widest text-xs mr-2">Recent work</span>
            {photo.alt} — {svcLabel} done in our Chantilly bay, 
            {" "}{cityLabel} drivers welcome.
            {"slug" in photo && <Link href={`/gallery/${photo.slug}`} className="ml-2 text-[#E85D04] underline underline-offset-2 decoration-1 hover:decoration-2">See this job →</Link>}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

const BASE_URL = "https://www.skylinecustomshop.com";
const CARD_ICONS = [Shield, Star, CheckCircle, ArrowRight];

interface Props {
  city: string;
  service: ServiceKey;
}

export default function LocalServicePage({ city: cityName, service: serviceKey }: Props) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const city = CITIES[cityName];
  const svc = SERVICES[serviceKey];
  const path = cityPath(serviceKey, cityName);
  const canonical = `${BASE_URL}${path}`;
  const note = cityServiceNote(cityName, serviceKey);
  // The city-specific questions come first; of the shared service questions, each
  // city shows a different three (rotated by city) so pages do not repeat the same block.
  const shared = svc.faqs(city);
  const start = hash(cityName) % shared.length;
  const rotated = [0, 1, 2].map((i) => shared[(start + i) % shared.length]);
  const faqs = [...(note?.faqs ?? []), ...(note ? rotated : shared)];
  const cards = [
    { title: city.roadsTitle, desc: `${city.roadsDesc} ${svc.roadsBenefit}` },
    ...svc.features,
  ];
  const shopLine = city.isHome
    ? `Our shop is at 4215 Walney Rd Suite 1A & B, Chantilly, VA 20151 — just off Route 28, minutes from Dulles Airport. Free parking on site.`
    : `Our shop is at 4215 Walney Rd Suite 1A & B, Chantilly, VA 20151 — ${city.heroDrive}. Free parking on site.`;

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-['DM_Sans',sans-serif]">
      <SEO
        title={svc.seoTitle(city.name)}
        description={svc.seoDescription(city.name)}
        canonical={canonical}
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "AutoBodyShop",
            "name": "Skyline Custom Shop",
            "url": BASE_URL,
            "telephone": "+17037754383",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "4215 Walney Rd Suite 1A & B",
              "addressLocality": "Chantilly",
              "addressRegion": "VA",
              "postalCode": "20151",
              "addressCountry": "US",
            },
            "areaServed": [`${city.name}, VA`, "Chantilly, VA", "Northern Virginia"],
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "5",
              "reviewCount": "141",
              "bestRating": "5",
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": svc.label,
            "name": `${svc.label} near ${city.name}, VA`,
            "url": canonical,
            "areaServed": { "@type": "City", "name": `${city.name}, VA` },
            "provider": { "@type": "AutoBodyShop", "name": "Skyline Custom Shop", "url": BASE_URL, "telephone": "+17037754383" },
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map((f) => ({
              "@type": "Question",
              "name": f.q,
              "acceptedAnswer": { "@type": "Answer", "text": f.a },
            })),
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": `${BASE_URL}/` },
              { "@type": "ListItem", "position": 2, "name": "Services", "item": `${BASE_URL}/services` },
              { "@type": "ListItem", "position": 3, "name": svc.label, "item": `${BASE_URL}${svc.serviceHref}` },
              { "@type": "ListItem", "position": 4, "name": `${city.name}, VA`, "item": canonical },
            ],
          },
        ]}
      />
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[55vh] flex items-end pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0A] via-[#111] to-[#0a0d0a]" />
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 40px, #E85D04 40px, #E85D04 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, #E85D04 40px, #E85D04 41px)" }}
        />
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10"
          style={{ background: "radial-gradient(ellipse at top right, #E85D04, transparent 70%)" }}
        />
        <div className="container relative z-10 pt-32">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs text-zinc-400 mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <Link href={svc.serviceHref} className="hover:text-white">{svc.label}</Link>
            <span>/</span>
            <span className="text-zinc-300">{city.name}, VA</span>
          </nav>
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-4 h-4 text-[#E85D04]" />
            <span className="text-[#E85D04] text-sm font-bold tracking-widest uppercase">{city.name}, VA</span>
          </div>
          <div className="max-w-4xl">
            <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">{svc.heroLabel}</p>
            <h1 className="font-['Bebas_Neue',sans-serif] text-6xl md:text-8xl lg:text-9xl leading-none text-white mb-4">
              {svc.heroHeading}<br />
              <span className="text-[#E85D04]">{city.name.toUpperCase()}</span>
            </h1>
            <p className="text-zinc-300 text-lg md:text-xl max-w-2xl leading-relaxed mb-6">
              {svc.heroText(city)}
            </p>
            <div className="flex flex-wrap gap-3 mb-6">
              {svc.badges.map((b) => (
                <span key={b} className="flex items-center gap-1.5 text-sm text-zinc-300 border border-zinc-700 px-3 py-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-[#E85D04]" />{b}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-4">
              <Link href={`/get-a-quote?service=${svc.quoteParam}`}
                className="bg-[#E85D04] hover:bg-[#d14e00] text-black font-bold tracking-widest uppercase px-8 py-4 transition-all duration-200 hover:scale-105 inline-flex items-center gap-2"
              >
                GET A FREE QUOTE <ArrowRight className="w-4 h-4" />
              </Link>
              <a href="tel:+17037754383"
                className="border border-zinc-600 hover:border-[#E85D04] text-zinc-300 hover:text-white font-bold tracking-widest uppercase px-8 py-4 transition-all inline-flex items-center gap-2"
              >
                <Phone className="w-4 h-4" /> (703) 775-4383
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="h-1 bg-[#E85D04]" />

      {/* This month's special, one slim line (the home page shows the full block) */}
      <ActivePromoBanner compact />

      <CityPhoto cityName={cityName} cityLabel={`${city.name}, VA`} service={serviceKey} />

      {/* Why this service here */}
      <section className="py-20 bg-[#0D0D0D]">
        <div className="container">
          <div className="mb-12">
            <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">{svc.whyLabel(city.name)}</p>
            <h2 className="font-['Bebas_Neue',sans-serif] text-5xl text-white">{svc.whyHeading}</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-800">
            {cards.map((item, i) => {
              const Icon = CARD_ICONS[i % CARD_ICONS.length];
              return (
                <div key={item.title} className="bg-[#0D0D0D] p-8 hover:bg-[#111] transition-colors group">
                  <Icon className="w-8 h-8 text-[#E85D04] mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="font-['Bebas_Neue',sans-serif] text-2xl text-white mb-2">{item.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
          <p className="text-zinc-400 text-sm mt-8 max-w-3xl">
            Learn more about our{" "}
            <Link href={svc.serviceHref} className="text-[#E85D04] underline underline-offset-2 decoration-1 hover:decoration-2">{svc.label.toLowerCase()} packages</Link>
            {" "}or see recent work in the{" "}
            <Link href="/gallery" className="text-[#E85D04] underline underline-offset-2 decoration-1 hover:decoration-2">gallery</Link>.
          </p>
        </div>
      </section>

      {/* Local context: unique to this city */}
      <section className="py-16 bg-[#0A0A0A] border-t border-zinc-800">
        <div className="container max-w-4xl">
          <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">Driving in {city.name}</p>
          <h2 className="font-['Bebas_Neue',sans-serif] text-4xl md:text-5xl text-white mb-5">WHAT {city.name.toUpperCase()} DOES TO YOUR PAINT</h2>
          <p className="text-zinc-300 leading-relaxed text-lg">{city.localIntro}</p>
          <p className="text-zinc-400 text-sm mt-4">{svc.roadsBenefit}</p>
        </div>
      </section>

      {/* Service-specific notes for this city: written per city and per service */}
      {note && (
        <section className="py-16 bg-[#0D0D0D] border-t border-zinc-800">
          <div className="container max-w-4xl">
            <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">{svc.short} in {city.name}</p>
            <h2 className="font-['Bebas_Neue',sans-serif] text-4xl md:text-5xl text-white mb-5">{note.heading.toUpperCase()}</h2>
            <p className="text-zinc-300 leading-relaxed text-lg">{note.body}</p>
            <p className="text-zinc-400 text-sm mt-5">
              Every {svc.short.toLowerCase()} job is done at our shop, 4215 Walney Rd Suite 1A &amp; B, Chantilly, VA 20151. <Link href={svc.serviceHref} className="text-[#E85D04] underline underline-offset-2 decoration-1 hover:decoration-2">See the full {svc.short.toLowerCase()} page</Link> for packages and process.
            </p>
          </div>
        </section>
      )}

      {/* Service area */}
      <section className="py-20 bg-[#0A0A0A]">
        <div className="container text-center">
          <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">Service Area</p>
          <h2 className="font-['Bebas_Neue',sans-serif] text-4xl md:text-5xl text-white mb-8">
            SERVING {city.name.toUpperCase()} & ALL OF NOVA
          </h2>
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {city.nearby.map((area) => (
              <span key={area} className="border border-zinc-700 text-zinc-400 text-sm px-4 py-2 hover:border-[#E85D04] hover:text-white transition-colors">
                {area}, VA
              </span>
            ))}
          </div>
          <p className="text-zinc-400 text-sm max-w-xl mx-auto">{shopLine}</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-[#0D0D0D]">
        <div className="container max-w-3xl">
          <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">FAQ</p>
          <h2 className="font-['Bebas_Neue',sans-serif] text-4xl md:text-5xl text-white mb-10">
            {svc.faqHeading(city.name)}
          </h2>
          <div className="space-y-px">
            {faqs.map((faq, i) => (
              <div key={faq.q} className="bg-[#111] border-l-2 border-transparent hover:border-[#E85D04] transition-colors">
                <button
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                >
                  <span className="text-white font-medium">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-[#E85D04] shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-zinc-400 text-sm leading-relaxed">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Testimonials title={svc.testimonialsTitle(city.name)} />

      {/* CTA */}
      <section className="py-20 bg-[#E85D04]">
        <div className="container max-w-3xl text-center">
          <h2 className="font-['Bebas_Neue',sans-serif] text-5xl md:text-6xl text-white mb-4">
            {svc.ctaHeading}
          </h2>
          <p className="text-white text-lg mb-8 max-w-xl mx-auto">{svc.ctaText(city)}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href={`/get-a-quote?service=${svc.quoteParam}`}
              className="bg-white hover:bg-zinc-100 text-[#E85D04] font-bold tracking-widest uppercase px-10 py-4 transition-colors inline-flex items-center gap-2"
            >
              GET MY FREE QUOTE <ArrowRight className="w-4 h-4" />
            </Link>
            <a href="tel:+17037754383"
              className="border-2 border-white hover:bg-white/10 text-white font-bold tracking-widest uppercase px-10 py-4 transition-colors inline-flex items-center gap-2"
            >
              <Phone className="w-4 h-4" /> CALL NOW
            </a>
          </div>
        </div>
      </section>

      <NearbyAreas city={city.name} service={serviceKey} />

      {/* Other services in this city */}
      <section className="py-10 bg-[#0A0A0A] border-t border-zinc-800">
        <div className="container">
          <p className="text-zinc-400 text-xs font-bold tracking-[0.3em] uppercase mb-4">More services near {city.name}</p>
          <div className="flex flex-wrap gap-3">
            {(Object.keys(SERVICES) as ServiceKey[]).filter((k) => k !== serviceKey).map((k) => (
              <Link key={k} href={cityPath(k, city.name)} className="border border-zinc-700 hover:border-[#E85D04] text-zinc-300 hover:text-white text-sm px-4 py-2 transition-colors">
                {SERVICES[k].label} in {city.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 bg-[#111] border-t border-zinc-800">
        <div className="container text-center">
          <p className="text-zinc-400 text-sm">
            Serving all of Northern Virginia —{" "}
            <Link href="/service-areas" className="text-[#E85D04] underline underline-offset-2 decoration-1 hover:decoration-2 font-medium">
              view all service areas
            </Link>
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
