/*
 * SKYLINE CUSTOMS — Service Areas Hub Page
 * URL: /service-areas
 * Lists every city (Virginia, Maryland, DC) with links to its service landing pages
 */

import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { MapPin, Shield, Droplets, Sun, ArrowRight, Phone } from "lucide-react";
import { CITIES, CITY_ORDER, STATE_NAMES, cityPath, cityServices } from "@/lib/localSeo";
import { AUDIENCE_PAGES } from "@/lib/audiencePages";

const SERVICE_LINKS = {
  ppf: { label: "Paint Protection Film", icon: Shield },
  ceramic: { label: "Ceramic Coating", icon: Droplets },
  tint: { label: "Window Tinting", icon: Sun },
} as const;

const cities = CITY_ORDER.map((name) => {
  const c = CITIES[name];
  return {
    name: c.name,
    state: c.state,
    description: c.hubDescription,
    services: cityServices(c).map((k) => ({ label: SERVICE_LINKS[k].label, href: cityPath(k, name), icon: SERVICE_LINKS[k].icon })),
  };
});
/** Grouped for the hub: Virginia first (the shop's own state), then Maryland, then DC. */
const STATE_GROUPS = (["VA", "MD", "DC"] as const).map((st) => ({ state: st, label: st === "DC" ? "Washington, DC" : STATE_NAMES[st], cities: cities.filter((c) => c.state === st) })).filter((g) => g.cities.length > 0);

const serviceIcons: Record<string, typeof Shield> = { Shield, Droplets, Sun };

export default function ServiceAreas() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-['DM_Sans',sans-serif]">
      <SEO
        title="Service Areas | PPF, Ceramic Coating & Tint Across the DMV"
        description={`Skyline Customs serves ${CITY_ORDER.length} cities across Northern Virginia, Maryland, and Washington, DC: Chantilly, Fairfax, Arlington, Alexandria, Bethesda, Rockville, Silver Spring, and more. Find your city and book a free quote.`}
        canonical="https://www.skylinecustomshop.com/service-areas"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "AutoBodyShop",
            "name": "Skyline Custom Shop",
            "url": "https://www.skylinecustomshop.com",
            "telephone": "+17037754383",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "4215 Walney Rd Suite 1A & B",
              "addressLocality": "Chantilly",
              "addressRegion": "VA",
              "postalCode": "20151",
              "addressCountry": "US"
            },
            "areaServed": cities.map(c => ({ "@type": "City", "name": `${c.name}, ${c.state}` })),
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "5",
              "reviewCount": "146",
              "bestRating": "5"
            }
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.skylinecustomshop.com/" },
              { "@type": "ListItem", "position": 2, "name": "Service Areas", "item": "https://www.skylinecustomshop.com/service-areas" }
            ]
          }
        ]}
      />
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[45vh] flex items-end pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0A] via-[#111] to-[#0a0d0a]" />
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 40px, #E85D04 40px, #E85D04 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, #E85D04 40px, #E85D04 41px)" }}
        />
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10"
          style={{ background: "radial-gradient(ellipse at top right, #E85D04, transparent 70%)" }}
        />
        <div className="container relative z-10 pt-32">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-4 h-4 text-[#E85D04]" />
            <span className="text-[#E85D04] text-sm font-bold tracking-widest uppercase">Virginia, Maryland &amp; DC</span>
          </div>
          <div className="max-w-4xl">
            <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">Coverage Map</p>
            <h1 className="font-['Bebas_Neue',sans-serif] text-6xl md:text-8xl lg:text-9xl leading-none text-white mb-4">
              SERVICE<br />
              <span className="text-[#E85D04]">AREAS</span>
            </h1>
            <p className="text-zinc-300 text-lg md:text-xl max-w-2xl leading-relaxed mb-6">
              Skyline Customs serves {CITY_ORDER.length} cities across the DMV: Northern Virginia from Chantilly and Ashburn to Woodbridge and Winchester, Washington, DC, and Maryland from Bethesda and Rockville to Frederick and Annapolis. Every job is done at our Chantilly shop. Find your city below and book a free quote.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/get-a-quote"
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

      {/* Stats bar */}
      <section className="py-10 bg-[#111] border-b border-zinc-800">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: String(CITY_ORDER.length), label: "Cities Served" },
              { value: "140+", label: "Happy Customers" },
              { value: "5.0 ★", label: "Google Rating" },
              { value: "3", label: "Services Offered" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-['Bebas_Neue',sans-serif] text-4xl text-[#E85D04]">{stat.value}</div>
                <div className="text-zinc-400 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* City grid */}
      <section className="py-20 bg-[#0A0A0A]">
        <div className="container">
          <div className="mb-12">
            <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">Find Your City</p>
            <h2 className="font-['Bebas_Neue',sans-serif] text-4xl md:text-5xl text-white">
              ALL SERVICE LOCATIONS
            </h2>
            <p className="text-zinc-400 mt-3 max-w-2xl">
              Click any city to view available services and get a free quote. All services are performed at our Chantilly shop — conveniently located off Route 28 near Dulles Airport.
            </p>
          </div>

          {STATE_GROUPS.map((g) => (
            <div key={g.state} className="mb-12 last:mb-0">
              <h3 className="font-['Bebas_Neue',sans-serif] text-3xl text-[#E85D04] tracking-wide mb-4">{g.label}</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-zinc-800">
                {g.cities.map((city) => (
              <div key={city.name} className="bg-[#0D0D0D] p-6 hover:bg-[#111] transition-colors group">
                {/* City header */}
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-8 h-8 bg-[#E85D04]/10 border border-[#E85D04]/30 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#E85D04]/20 transition-colors">
                    <MapPin className="w-4 h-4 text-[#E85D04]" />
                  </div>
                  <div>
                    <h3 className="font-['Bebas_Neue',sans-serif] text-2xl text-white leading-none">
                      {city.name}
                    </h3>
                    <span className="text-zinc-400 text-xs">{city.state}</span>
                  </div>
                </div>

                <p className="text-zinc-400 text-xs mb-4 leading-relaxed">{city.description}</p>

                {/* Service links */}
                <div className="space-y-1.5">
                  {city.services.map((svc) => (
                    <Link
                      key={svc.href}
                      href={svc.href}
                      className="flex items-center gap-2 text-zinc-400 hover:text-white text-sm transition-colors group/link"
                    >
                      <svc.icon className="w-3.5 h-3.5 text-[#E85D04] shrink-0" />
                      <span className="group-hover/link:underline underline-offset-2">{svc.label}</span>
                      <ArrowRight className="w-3 h-3 ml-auto opacity-0 group-hover/link:opacity-100 transition-opacity text-[#E85D04]" />
                    </Link>
                  ))}
                </div>
              </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bases, federal workplaces, dealer delivery */}
      {AUDIENCE_PAGES.length > 0 && (
      <section id="bases" className="py-16 md:py-20 bg-[#0D0D0D] border-t border-zinc-800 scroll-mt-24">
        <div className="container">
          <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">Where you work, where you bought the car</p>
          <h2 className="font-['Bebas_Neue',sans-serif] text-4xl md:text-5xl text-white mb-3">BASES, FEDERAL WORKPLACES &amp; DEALER DELIVERY</h2>
          <p className="text-zinc-400 max-w-2xl mb-6">PPF guides written for the schedules people actually have: a PCS move, a deployment, a delivery appointment at a dealer across town.</p>
          <Link href="/fleet-ppf" className="inline-flex items-center gap-2 mb-10 border border-[#E85D04]/50 text-[#E85D04] hover:bg-[#E85D04]/10 font-bold tracking-widest uppercase text-sm px-5 py-3 transition-colors">Managing a fleet or a dealership? Fleet pricing <ArrowRight className="w-4 h-4" /></Link>
          {(["base", "dealer"] as const).map((kind) => (
            <div key={kind} className="mb-10 last:mb-0">
              <h3 className="font-['Bebas_Neue',sans-serif] text-2xl text-[#E85D04] tracking-wide mb-4">{kind === "base" ? "Military & federal" : "New-car delivery"}</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-800">
                {AUDIENCE_PAGES.filter((a) => a.kind === kind).map((a) => (
                  <Link key={a.path} href={a.path} className="bg-[#0D0D0D] p-6 hover:bg-[#111] transition-colors group block">
                    <p className="font-['Bebas_Neue',sans-serif] text-2xl text-white leading-none mb-2 group-hover:text-[#E85D04] transition-colors">{a.name}</p>
                    <p className="text-zinc-400 text-xs leading-relaxed">{a.drive}</p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      )}

      {/* Shop info */}
      <section className="py-20 bg-[#0D0D0D] border-t border-zinc-800">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">Our Shop</p>
              <h2 className="font-['Bebas_Neue',sans-serif] text-4xl md:text-5xl text-white mb-4">
                CONVENIENTLY LOCATED<br />IN CHANTILLY, VA
              </h2>
              <p className="text-zinc-400 leading-relaxed mb-6">
                Our shop is located at <strong className="text-white">4215 Walney Rd Suite 1A &amp; B, Chantilly, VA 20151</strong> — just off Route 28, minutes from Dulles Airport, and easily accessible from I-66, I-495, and the Dulles Toll Road. Free parking on site.
              </p>
              <div className="space-y-3 mb-8">
                {[
                  { label: "Phone", value: "(703) 775-4383", href: "tel:+17037754383" },
                  { label: "Hours", value: "Mon–Sat: 8am–6pm" },
                  { label: "Address", value: "4215 Walney Rd Suite 1A & B, Chantilly, VA 20151" },
                ].map((item) => (
                  <div key={item.label} className="flex gap-3 text-sm">
                    <span className="text-zinc-400 w-16 shrink-0">{item.label}</span>
                    {item.href ? (
                      <a href={item.href} className="text-white hover:text-[#E85D04] transition-colors">{item.value}</a>
                    ) : (
                      <span className="text-white">{item.value}</span>
                    )}
                  </div>
                ))}
              </div>
              <Link href="/get-a-quote"
                className="bg-[#E85D04] hover:bg-[#d14e00] text-black font-bold tracking-widest uppercase px-8 py-4 transition-all inline-flex items-center gap-2"
              >
                GET A FREE QUOTE <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-px bg-zinc-800">
              {[
                { icon: Shield, label: "Paint Protection Film", desc: "Self-healing PPF with 12-year warranty" },
                { icon: Droplets, label: "Ceramic Coating", desc: "3–7 year hydrophobic protection" },
                { icon: Sun, label: "Window Tinting", desc: "Virginia-legal ceramic & carbon films" },
              ].map((svc) => (
                <div key={svc.label} className="bg-[#0D0D0D] p-6 hover:bg-[#111] transition-colors">
                  <svc.icon className="w-6 h-6 text-[#E85D04] mb-3" />
                  <div className="font-['Bebas_Neue',sans-serif] text-lg text-white mb-1">{svc.label}</div>
                  <div className="text-zinc-400 text-xs">{svc.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#E85D04]">
        <div className="container max-w-3xl text-center">
          <h2 className="font-['Bebas_Neue',sans-serif] text-5xl md:text-6xl text-white mb-4">
            DON'T SEE YOUR CITY?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
            We serve all of Northern Virginia, Maryland, and Washington, DC. Call us or get a free quote and we will confirm your drive and the install dates.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/get-a-quote"
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

      <Footer />
    </div>
  );
}
