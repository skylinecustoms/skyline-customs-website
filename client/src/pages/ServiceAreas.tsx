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
        title="Full Front PPF Across Northern Virginia | Fairfax, Loudoun & Prince William"
        description="One Chantilly shop for full front PPF, ceramic coating, and ceramic tint across Northern Virginia: Fairfax, Loudoun, Prince William, Arlington, Alexandria, Stafford, plus DC and Maryland. Drive times, dealer delivery, and every city page."
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
            <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">Service areas</p>
            <h1 className="font-['Bebas_Neue',sans-serif] text-6xl md:text-8xl lg:text-9xl leading-none text-white mb-4">
              FULL FRONT PPF ACROSS<br />
              <span className="text-[#E85D04]">NORTHERN VIRGINIA</span>
            </h1>
            <p className="text-zinc-300 text-lg md:text-xl max-w-2xl leading-relaxed mb-6">
              One shop in Chantilly, {CITY_ORDER.length} cities on the schedule. Full front paint protection film, ceramic coating, and ceramic window tint for drivers across Fairfax, Loudoun, Prince William, Arlington, Alexandria, and Stafford, plus Washington, DC and the Maryland suburbs. Every job is done in our bay off Route 28; the pages below cover the drive from your city, the roads that chip your paint there, and the questions we hear from your neighbors.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/get-a-quote"
                className="cta bg-[#E85D04] hover:bg-[#d14e00] text-black font-bold tracking-widest uppercase px-8 py-4 transition-all duration-200 hover:scale-105 inline-flex items-center gap-2"
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


      {/* Northern Virginia, county by county */}
      <section className="py-20 bg-[#0D0D0D] border-t border-zinc-800">
        <div className="container max-w-4xl">
          <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">Why one shop for all of Northern Virginia</p>
          <h2 className="font-['Bebas_Neue',sans-serif] text-4xl md:text-5xl text-white mb-6">THE SAME ROADS CHIP THE SAME PANELS</h2>
          <div className="space-y-5 text-zinc-300 leading-relaxed text-lg">
            <p>
              Northern Virginia is one road network. Whether you live in Ashburn or Alexandria, your commute runs on some mix of I-66, I-495, I-95, Route 28, Route 7, Route 50, and the Dulles Toll Road, behind the same dump trucks and the same construction zones. The damage lands on the same five places: the front bumper, the leading edge of the hood, the fenders, the mirrors, and the headlights. That is why most of our customers, from every county, choose <Link href="/full-front-ppf" className="text-[#E85D04] underline underline-offset-2 decoration-1 hover:decoration-2">full front PPF</Link>: STEK DYNOshield film over every one of those panels, with no film line across the hood, backed by a 12-year manufacturer warranty.
            </p>
            <p>
              We do every install at one location, 4215 Walney Rd in Chantilly, because paint protection film is a controlled-environment job. Dust in the air ends up under the film. A dedicated bay, the plotter that cuts the patterns for your exact year and model, and the lights we use for the final walkthrough do not travel. What does travel is you, and the shop sits at the center of the region: inside the Route 28 and Route 50 corridor, ten minutes from Dulles, and within 45 minutes of nearly every city listed on this page. A full front install takes one to two days, and most customers drop off on the way to work or have the car delivered straight from the dealer.
            </p>
          </div>

          <h3 className="font-['Bebas_Neue',sans-serif] text-3xl text-white mt-12 mb-4">FAIRFAX COUNTY</h3>
          <p className="text-zinc-300 leading-relaxed text-lg">
            Home turf. <Link href="/ppf-centreville-va" className="text-[#E85D04] underline underline-offset-2 decoration-1 hover:decoration-2">Centreville</Link> and <Link href="/ppf-fairfax-va" className="text-[#E85D04] underline underline-offset-2 decoration-1 hover:decoration-2">Fairfax</Link> are ten to fifteen minutes down Route 28 and I-66. <Link href="/ppf-herndon-va" className="text-[#E85D04] underline underline-offset-2 decoration-1 hover:decoration-2">Herndon</Link>, <Link href="/ppf-reston-va" className="text-[#E85D04] underline underline-offset-2 decoration-1 hover:decoration-2">Reston</Link>, <Link href="/ppf-oakton-va" className="text-[#E85D04] underline underline-offset-2 decoration-1 hover:decoration-2">Oakton</Link>, and <Link href="/ppf-vienna-va" className="text-[#E85D04] underline underline-offset-2 decoration-1 hover:decoration-2">Vienna</Link> come in on the Toll Road and Route 123. <Link href="/ppf-mclean-va" className="text-[#E85D04] underline underline-offset-2 decoration-1 hover:decoration-2">McLean</Link>, <Link href="/ppf-tysons-va" className="text-[#E85D04] underline underline-offset-2 decoration-1 hover:decoration-2">Tysons</Link>, <Link href="/ppf-falls-church-va" className="text-[#E85D04] underline underline-offset-2 decoration-1 hover:decoration-2">Falls Church</Link>, and <Link href="/ppf-great-falls-va" className="text-[#E85D04] underline underline-offset-2 decoration-1 hover:decoration-2">Great Falls</Link> drivers deal with the I-495 express lanes and Route 7 through the Tysons construction, which is where we see the heaviest bumper sandblasting in the county. South of the Beltway, <Link href="/ppf-annandale-va" className="text-[#E85D04] underline underline-offset-2 decoration-1 hover:decoration-2">Annandale</Link>, <Link href="/ppf-burke-va" className="text-[#E85D04] underline underline-offset-2 decoration-1 hover:decoration-2">Burke</Link>, <Link href="/ppf-springfield-va" className="text-[#E85D04] underline underline-offset-2 decoration-1 hover:decoration-2">Springfield</Link>, and <Link href="/ppf-lorton-va" className="text-[#E85D04] underline underline-offset-2 decoration-1 hover:decoration-2">Lorton</Link> get the Springfield interchange and I-95 gravel; the Fairfax County Parkway brings them to the shop in about half an hour. Fairfax County also has the densest cluster of dealerships in the state, and a large share of our new-car customers have the dealer deliver the car to Walney Road before it has seen a highway.
          </p>

          <h3 className="font-['Bebas_Neue',sans-serif] text-3xl text-white mt-10 mb-4">LOUDOUN COUNTY</h3>
          <p className="text-zinc-300 leading-relaxed text-lg">
            Loudoun is the fastest-growing part of our customer base and the one with the most new paint on the road. <Link href="/ppf-sterling-va" className="text-[#E85D04] underline underline-offset-2 decoration-1 hover:decoration-2">Sterling</Link> and <Link href="/ppf-south-riding-va" className="text-[#E85D04] underline underline-offset-2 decoration-1 hover:decoration-2">South Riding</Link> are next door on Route 28 and Route 50. <Link href="/ppf-ashburn-va" className="text-[#E85D04] underline underline-offset-2 decoration-1 hover:decoration-2">Ashburn</Link>, <Link href="/ppf-brambleton-va" className="text-[#E85D04] underline underline-offset-2 decoration-1 hover:decoration-2">Brambleton</Link>, and <Link href="/ppf-aldie-va" className="text-[#E85D04] underline underline-offset-2 decoration-1 hover:decoration-2">Aldie</Link> are fifteen to twenty minutes out, and most of those drivers live with the Loudoun County Parkway and Route 50 widening projects, which means fresh gravel on every lane for the foreseeable future. <Link href="/ppf-leesburg-va" className="text-[#E85D04] underline underline-offset-2 decoration-1 hover:decoration-2">Leesburg</Link> and <Link href="/ppf-purcellville-va" className="text-[#E85D04] underline underline-offset-2 decoration-1 hover:decoration-2">Purcellville</Link> come down Route 7 or the Greenway in about half an hour, often in trucks and SUVs that split time between the Beltway commute and gravel roads out west. The data-center construction traffic along Route 606 and Loudoun County Parkway is the single biggest source of chipped bumpers we see from this county.
          </p>

          <h3 className="font-['Bebas_Neue',sans-serif] text-3xl text-white mt-10 mb-4">PRINCE WILLIAM COUNTY</h3>
          <p className="text-zinc-300 leading-relaxed text-lg">
            <Link href="/ppf-manassas-va" className="text-[#E85D04] underline underline-offset-2 decoration-1 hover:decoration-2">Manassas</Link>, <Link href="/ppf-bristow-va" className="text-[#E85D04] underline underline-offset-2 decoration-1 hover:decoration-2">Bristow</Link>, <Link href="/ppf-gainesville-va" className="text-[#E85D04] underline underline-offset-2 decoration-1 hover:decoration-2">Gainesville</Link>, and <Link href="/ppf-haymarket-va" className="text-[#E85D04] underline underline-offset-2 decoration-1 hover:decoration-2">Haymarket</Link> reach us in twenty to thirty minutes by Route 28 or I-66, and they bring in the highest mileage of any group: the I-66 commute from Gainesville to Tysons is forty miles each way, most of it behind trucks. On the I-95 side, <Link href="/ppf-woodbridge-va" className="text-[#E85D04] underline underline-offset-2 decoration-1 hover:decoration-2">Woodbridge</Link> and <Link href="/ppf-dale-city-va" className="text-[#E85D04] underline underline-offset-2 decoration-1 hover:decoration-2">Dale City</Link> drivers take the Prince William Parkway across to Route 28, about forty minutes, and the Route 1 and I-95 mix there is the worst combination of road salt and gravel in the region. Prince William is also where we see the most trucks and off-road SUVs, which is why our <Link href="/truck-ppf" className="text-[#E85D04] underline underline-offset-2 decoration-1 hover:decoration-2">truck PPF</Link> and <Link href="/suv-ppf" className="text-[#E85D04] underline underline-offset-2 decoration-1 hover:decoration-2">SUV PPF</Link> pages talk so much about rocker panels and door edges.
          </p>

          <h3 className="font-['Bebas_Neue',sans-serif] text-3xl text-white mt-10 mb-4">ARLINGTON, ALEXANDRIA &amp; THE DISTRICT</h3>
          <p className="text-zinc-300 leading-relaxed text-lg">
            Inside the Beltway the problem changes from rock chips to everything else: parking-garage scrapes, door dings, bird droppings baked onto a car that sits outside, and the I-395 and GW Parkway commute. <Link href="/ppf-arlington-va" className="text-[#E85D04] underline underline-offset-2 decoration-1 hover:decoration-2">Arlington</Link> and <Link href="/ppf-alexandria-va" className="text-[#E85D04] underline underline-offset-2 decoration-1 hover:decoration-2">Alexandria</Link> customers are usually thirty to forty minutes out on I-66 or I-395 to I-495, and the pairing we recommend most there is full front film with a ceramic coating over the whole car, so the film takes the impacts and the coating makes a street-parked car easy to keep clean. <Link href="/ppf-washington-dc" className="text-[#E85D04] underline underline-offset-2 decoration-1 hover:decoration-2">Washington, DC</Link> drivers follow the same path; the shop is a straight run out I-66 and the drop-off is usually timed around a workday.
          </p>

          <h3 className="font-['Bebas_Neue',sans-serif] text-3xl text-white mt-10 mb-4">STAFFORD, FREDERICKSBURG, WARRENTON &amp; WINCHESTER</h3>
          <p className="text-zinc-300 leading-relaxed text-lg">
            The outer ring. <Link href="/ppf-stafford-va" className="text-[#E85D04] underline underline-offset-2 decoration-1 hover:decoration-2">Stafford</Link> and <Link href="/ppf-fredericksburg-va" className="text-[#E85D04] underline underline-offset-2 decoration-1 hover:decoration-2">Fredericksburg</Link> are forty-five minutes to an hour up I-95 and the Prince William Parkway, and a large share of those cars belong to Quantico families and I-95 commuters who put thirty thousand miles a year on a front bumper. <Link href="/ppf-warrenton-va" className="text-[#E85D04] underline underline-offset-2 decoration-1 hover:decoration-2">Warrenton</Link> comes in on Route 29 and I-66, and <Link href="/ppf-winchester-va" className="text-[#E85D04] underline underline-offset-2 decoration-1 hover:decoration-2">Winchester</Link> on I-66 or Route 7, each about an hour. For these drives we schedule the install as a single drop-off: the car arrives in the morning, the film goes on that day, the coating cures overnight, and the car is ready the next afternoon, so it is one round trip instead of two.
          </p>

          <h3 className="font-['Bebas_Neue',sans-serif] text-3xl text-white mt-10 mb-4">MARYLAND</h3>
          <p className="text-zinc-300 leading-relaxed text-lg">
            Montgomery County and Frederick drivers cross the American Legion Bridge or come down I-270 and the Beltway; Bethesda, Rockville, and Silver Spring are forty to fifty minutes, Frederick about an hour. The Beltway and I-270 carry the same truck traffic as the Virginia side, and Maryland's road salt is heavier, which is the main reason Maryland customers add the ceramic coating. Window tint is metered to Maryland law on Maryland-registered cars. Every Maryland city we serve is listed in the grid below.
          </p>

          <h3 className="font-['Bebas_Neue',sans-serif] text-3xl text-white mt-10 mb-4">HOW A VISIT WORKS FROM ANY OF THESE CITIES</h3>
          <ol className="space-y-3 text-zinc-300 leading-relaxed text-lg list-decimal list-inside">
            <li><Link href="/get-a-quote" className="text-[#E85D04] underline underline-offset-2 decoration-1 hover:decoration-2">Request a quote</Link> with your year, make, model, and city. We send the exact price for each package, usually within the hour during business hours.</li>
            <li>Pick a date. New cars can be delivered by the dealer directly to the shop; see our <Link href="/service-areas#bases" className="text-[#E85D04] underline underline-offset-2 decoration-1 hover:decoration-2">dealer delivery and base guides</Link> for the schedules we work around.</li>
            <li>Drop off in the morning. Full front PPF is a one-to-two-day job; tint is two to four hours; a ceramic coating adds an overnight cure.</li>
            <li>Walk every panel with us under the lights before you pay the balance, and leave with the warranty registered in your name.</li>
          </ol>
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
                  { label: "Hours", value: "Mon–Fri: 9AM – 6PM" },
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
                className="cta bg-[#E85D04] hover:bg-[#d14e00] text-black font-bold tracking-widest uppercase px-8 py-4 transition-all inline-flex items-center gap-2"
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
          <p className="text-black/90 text-lg mb-8 max-w-xl mx-auto">
            We serve all of Northern Virginia, Maryland, and Washington, DC. Call us or get a free quote and we will confirm your drive and the install dates.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/get-a-quote"
              className="bg-black hover:bg-zinc-900 text-white font-bold tracking-widest uppercase px-10 py-4 transition-colors inline-flex items-center gap-2"
            >
              GET MY FREE QUOTE <ArrowRight className="w-4 h-4" />
            </Link>
            <a href="tel:+17037754383"
              className="border-2 border-black/70 hover:bg-black hover:text-white text-black font-bold tracking-widest uppercase px-10 py-4 transition-colors inline-flex items-center gap-2"
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
