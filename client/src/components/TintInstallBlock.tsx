/**
 * "What we install" block for the tint city pages: the film, the legal shades
 * for the state the car is registered in, the packages, and the warranty.
 * Written for the searches these pages get ("ceramic tint <city>").
 */
import { Link } from "wouter";
import { ArrowRight, CheckCircle } from "lucide-react";
import type { City } from "@/lib/localSeo";
import { cityLabel } from "@/lib/localSeo";

const SHADES: Record<City["state"], { heading: string; rows: [string, string][]; note: string }> = {
  VA: {
    heading: "Virginia-legal shades",
    rows: [
      ["Front side windows", "50% VLT or lighter"],
      ["Rear side windows (sedans)", "35% VLT or lighter"],
      ["Back glass (sedans)", "35% VLT or lighter"],
      ["Behind the front doors (SUVs, trucks, vans)", "Any darkness"],
      ["Windshield", "Non-reflective strip above the AS-1 line only"],
    ],
    note: "We meter every window before you leave, so the car passes inspection and a roadside check. Medical exemptions need the DMV form; we help with the paperwork.",
  },
  MD: {
    heading: "Maryland-legal shades",
    rows: [
      ["Front side windows", "35% VLT or lighter"],
      ["Rear side windows", "35% VLT or lighter"],
      ["Back glass", "35% VLT or lighter"],
      ["Behind the front doors (multipurpose vehicles)", "Darker allowed"],
      ["Windshield", "Non-reflective strip above the AS-1 line only"],
    ],
    note: "We install Maryland-legal film on Maryland-registered cars and meter every window before you leave.",
  },
  DC: {
    heading: "DC-legal shades",
    rows: [
      ["Front side windows", "70% VLT or lighter"],
      ["Rear side windows (sedans)", "50% VLT or lighter"],
      ["Back glass (sedans)", "50% VLT or lighter"],
      ["Behind the front doors (SUVs and vans)", "35% VLT or lighter"],
      ["Windshield", "Non-reflective strip above the AS-1 line only"],
    ],
    note: "We install DC-legal film on DC-registered cars and meter every window before you leave.",
  },
};

const PACKAGES = [
  { name: "Rear package", desc: "Rear side windows and back glass. The most popular package; the front doors stay factory or get a light legal shade." },
  { name: "Front doors", desc: "Both front side windows matched to the rear, metered to the legal limit for your state." },
  { name: "Full car", desc: "Every side window and the back glass, plus the windshield in a clear or light heat-rejecting film." },
  { name: "Windshield only", desc: "A near-clear ceramic film that cuts heat and glare without changing the look of the car." },
];

export default function TintInstallBlock({ city }: { city: City }) {
  const shades = SHADES[city.state];
  return (
    <section className="py-16 bg-[#0D0D0D] border-t border-zinc-800">
      <div className="container max-w-5xl">
        <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">What we install</p>
        <h2 className="font-['Bebas_Neue',sans-serif] text-4xl md:text-5xl text-white mb-5">CERAMIC TINT FOR {city.name.toUpperCase()} CARS</h2>
        <p className="text-zinc-300 leading-relaxed text-lg mb-4">
          Every car from {cityLabel(city)} gets the same film: GeoShield Pro Nano Ceramic. It is a metal-free ceramic film, so it blocks up to 83% of infrared heat and 99% of UV without interfering with phone, GPS, toll transponder, or key fob signals. It is computer-cut for your exact year, make, and model, installed in a dust-controlled bay, and backed by a nationwide lifetime warranty against bubbling, peeling, fading, and turning purple.
        </p>
        <p className="text-zinc-400 leading-relaxed mb-10">
          Not sure what the difference is between films? Our <Link href="/ceramic-vs-carbon-vs-dyed-tint" className="text-[#E85D04] underline underline-offset-2 decoration-1 hover:decoration-2">ceramic vs carbon vs dyed tint guide</Link> covers heat rejection, fading, and price side by side.
        </p>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <div>
            <h3 className="font-['Bebas_Neue',sans-serif] text-2xl text-white mb-4">{shades.heading.toUpperCase()}</h3>
            <dl className="divide-y divide-zinc-800 border-y border-zinc-800">
              {shades.rows.map(([k, v]) => (
                <div key={k} className="flex items-baseline justify-between gap-4 py-3 text-sm">
                  <dt className="text-zinc-400">{k}</dt>
                  <dd className="text-white font-semibold text-right">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="text-zinc-400 text-sm mt-4">{shades.note}</p>
            {city.state === "VA" && (
              <Link href="/blog/virginia-window-tint-laws-2026" className="inline-flex items-center gap-2 mt-4 text-[#E85D04] font-bold tracking-widest uppercase text-xs hover:text-white transition-colors">
                Virginia tint laws 2026, explained <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
          <div>
            <h3 className="font-['Bebas_Neue',sans-serif] text-2xl text-white mb-4">PACKAGES</h3>
            <ul className="space-y-4">
              {PACKAGES.map((p) => (
                <li key={p.name} className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-[#E85D04] mt-1 shrink-0" />
                  <div>
                    <p className="text-white font-semibold">{p.name}</p>
                    <p className="text-zinc-400 text-sm leading-relaxed">{p.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="text-zinc-400 text-sm mt-5">
              Most cars take two to four hours. Request a quote with your year, make, and model and we send the exact price for each package, usually within the hour during business hours.
            </p>
            <Link href="/get-a-quote?service=tint" className="inline-flex items-center gap-2 mt-4 bg-[#E85D04] hover:bg-[#d14e00] text-black font-bold tracking-widest uppercase text-sm px-6 py-3 transition-colors">
              Get a tint quote <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
