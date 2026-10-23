/**
 * "Near me" block for the three service pages.
 *
 * Search Console shows "ppf near me", "car tint near me", and "ceramic coating
 * near me" landing on the home page or a random city page. This section gives
 * each service page the things a "near me" searcher wants before they call:
 * where the shop is, when it is open, how far it is from their town, and the
 * review count, plus a map and a directions link. Drive times come from the
 * city data so they match the city pages.
 */
import { Link } from "wouter";
import { MapPin, Clock, Star, Car, ArrowRight, Phone } from "lucide-react";
import { CITIES, SERVICES, cityPath, type ServiceKey } from "@/lib/localSeo";

const MAP_EMBED = "https://maps.google.com/maps?q=Skyline+Customs%2C+4215+Walney+Rd+Suite+1A+%26+B%2C+Chantilly%2C+VA+20151&t=&z=12&ie=UTF8&iwloc=B&output=embed";
const DIRECTIONS = "https://maps.google.com/?q=Skyline+Customs+4215+Walney+Rd+Suite+1A+%26+B+Chantilly+VA+20151";

/** Towns shown with a drive time, nearest first. Each has a city page for every service. */
const DRIVE_TIMES: { city: string; minutes: string }[] = [
  { city: "Centreville", minutes: "10 min" },
  { city: "South Riding", minutes: "10 min" },
  { city: "Herndon", minutes: "15 min" },
  { city: "Fairfax", minutes: "15 min" },
  { city: "Reston", minutes: "15 min" },
  { city: "Sterling", minutes: "15 min" },
  { city: "Ashburn", minutes: "20 min" },
  { city: "Manassas", minutes: "20 min" },
  { city: "Tysons", minutes: "20 min" },
  { city: "Vienna", minutes: "20 min" },
  { city: "Arlington", minutes: "30 min" },
  { city: "Alexandria", minutes: "35 min" },
  { city: "Woodbridge", minutes: "35 min" },
  { city: "Stafford", minutes: "40 min" },
];

const COPY: Record<ServiceKey, { heading: string; lead: string }> = {
  ppf: {
    heading: "PAINT PROTECTION FILM NEAR ME?",
    lead: "If you searched for PPF near you from anywhere in Northern Virginia, the shop is closer than you think. Every full front install happens in our bay in Chantilly, one turn off Route 28, with free parking and same-day pickup on most cars.",
  },
  ceramic: {
    heading: "CERAMIC COATING NEAR ME?",
    lead: "Searching for a ceramic coating shop near you? We are in Chantilly, one turn off Route 28 and minutes from Dulles. Every coating is applied indoors in our bay after paint correction, and most drivers from Fairfax and Loudoun are here in twenty minutes.",
  },
  tint: {
    heading: "WINDOW TINT NEAR ME?",
    lead: "Looking for a tint shop near you in Northern Virginia? Our bay is in Chantilly, one turn off Route 28. Most cars are tinted in two to four hours, so drivers from Fairfax, Loudoun, and Prince William come in, wait or run errands, and leave with legal ceramic film the same day.",
  },
};

export default function NearMeBlock({ service }: { service: ServiceKey }) {
  const svc = SERVICES[service];
  const copy = COPY[service];
  const towns = DRIVE_TIMES.filter((t) => CITIES[t.city]);
  return (
    <section id="near-me" className="py-20 bg-[#0A0A0A] border-t border-zinc-800 scroll-mt-24" aria-labelledby="near-me-heading">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-7">
            <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">Find us</p>
            <h2 id="near-me-heading" className="font-['Bebas_Neue',sans-serif] text-5xl md:text-6xl text-white leading-none mb-5">
              {copy.heading}<br /><span className="text-[#E85D04]">WE'RE IN CHANTILLY, VA.</span>
            </h2>
            <p className="text-zinc-300 text-lg leading-relaxed mb-8 max-w-2xl">{copy.lead}</p>

            <dl className="grid sm:grid-cols-3 gap-px bg-zinc-800 mb-8">
              <div className="bg-[#0D0D0D] p-5">
                <dt className="flex items-center gap-2 text-[#E85D04] text-xs font-bold tracking-widest uppercase mb-2"><MapPin className="w-4 h-4" /> Address</dt>
                <dd className="text-white text-sm leading-relaxed">4215 Walney Rd Suite 1A &amp; B<br />Chantilly, VA 20151</dd>
              </div>
              <div className="bg-[#0D0D0D] p-5">
                <dt className="flex items-center gap-2 text-[#E85D04] text-xs font-bold tracking-widest uppercase mb-2"><Clock className="w-4 h-4" /> Hours</dt>
                <dd className="text-white text-sm leading-relaxed">Mon to Fri, 9 AM to 6 PM<br />Installs by appointment</dd>
              </div>
              <div className="bg-[#0D0D0D] p-5">
                <dt className="flex items-center gap-2 text-[#E85D04] text-xs font-bold tracking-widest uppercase mb-2"><Star className="w-4 h-4" /> Reviews</dt>
                <dd className="text-white text-sm leading-relaxed">5.0 stars, 140+ Google reviews<br /><Link href="/reviews" className="text-[#E85D04] underline underline-offset-2 decoration-1 hover:decoration-2">Read them</Link></dd>
              </div>
            </dl>

            <p className="flex items-center gap-2 text-zinc-400 text-xs font-bold tracking-[0.3em] uppercase mb-4"><Car className="w-4 h-4 text-[#E85D04]" /> Drive time to the shop</p>
            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mb-8">
              {towns.map((t) => (
                <li key={t.city}>
                  <Link
                    href={cityPath(service, t.city)}
                    className="flex items-center justify-between gap-2 border border-zinc-800 hover:border-[#E85D04] px-3 py-2 text-sm transition-colors group"
                  >
                    <span className="text-zinc-300 group-hover:text-white">{t.city}</span>
                    <span className="text-[#E85D04] font-mono text-xs">{t.minutes}</span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-4">
              <Link href={`/get-a-quote?service=${svc.quoteParam}`} data-cta={`${service}-near-me-quote`} className="cta bg-[#E85D04] hover:bg-[#d14e00] text-black font-bold tracking-widest uppercase px-8 py-4 transition-colors inline-flex items-center gap-2">
                Get a free quote <ArrowRight className="w-4 h-4" />
              </Link>
              <a href="tel:+17037754383" className="border border-zinc-600 hover:border-[#E85D04] text-zinc-300 hover:text-white font-bold tracking-widest uppercase px-8 py-4 transition-colors inline-flex items-center gap-2">
                <Phone className="w-4 h-4" /> (703) 775-4383
              </a>
            </div>
            <p className="text-zinc-500 text-xs mt-5">
              Not listed? We install {svc.label.toLowerCase()} for drivers across Northern Virginia, Maryland, and DC. <Link href="/service-areas" className="text-[#E85D04] underline underline-offset-2">See every service area</Link>.
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="relative overflow-hidden border border-zinc-800" style={{ height: "380px" }}>
              <iframe
                title="Skyline Customs on Google Maps, 4215 Walney Rd Suite 1A & B, Chantilly VA"
                src={MAP_EMBED}
                width="100%"
                height="100%"
                style={{ border: 0, filter: "grayscale(15%) contrast(1.05)" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/85 backdrop-blur-sm px-5 py-4 border-t border-[#E85D04]/40 flex items-center justify-between gap-4">
                <div>
                  <p className="text-[#E85D04] text-[10px] font-bold uppercase tracking-widest">Skyline Customs</p>
                  <p className="text-white text-sm">Off Route 28, 5 min from Dulles</p>
                </div>
                <a href={DIRECTIONS} target="_blank" rel="noopener noreferrer" className="shrink-0 text-[#E85D04] text-xs font-bold uppercase tracking-widest underline underline-offset-2 decoration-1 hover:decoration-2">
                  Directions →
                </a>
              </div>
            </div>
            <p className="text-zinc-500 text-xs mt-3 leading-relaxed">
              From I-66, take Route 28 north three miles to Walney Rd. From the Toll Road or Loudoun, Route 28 south past the airport. Free parking on site.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
