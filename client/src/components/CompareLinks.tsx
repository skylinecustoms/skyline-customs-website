/**
 * "Not sure which?" strip linking to the comparison pages.
 */
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

const LINKS = [
  { href: "/ppf-vs-ceramic-coating", label: "PPF vs ceramic coating", sub: "Chips vs gloss: which one you actually need" },
  { href: "/ceramic-vs-carbon-vs-dyed-tint", label: "Ceramic vs carbon vs dyed tint", sub: "Heat rejection, fading, price, and Virginia law" },
];

export default function CompareLinks({ exclude }: { exclude?: string }) {
  const links = LINKS.filter((l) => l.href !== exclude);
  return (
    <section className="py-12 bg-[#0D0D0D] border-t border-zinc-800">
      <div className="container">
        <p className="text-[#E85D04] text-xs font-bold tracking-[0.3em] uppercase mb-4">Not sure which?</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="group border border-zinc-800 hover:border-[#E85D04] p-5 flex items-center justify-between gap-4 transition-colors">
              <span>
                <span className="block text-white font-bold">{l.label}</span>
                <span className="block text-zinc-400 text-sm mt-1">{l.sub}</span>
              </span>
              <ArrowRight className="w-5 h-5 text-zinc-400 group-hover:text-[#E85D04] shrink-0" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
