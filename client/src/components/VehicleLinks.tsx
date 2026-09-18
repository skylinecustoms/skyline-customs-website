/**
 * "PPF by vehicle" link strip: Tesla + the brand pages from @/lib/modelPpf.
 * Used on /services/ppf, /tesla-ppf and each brand page for internal linking.
 */
import { Link } from "wouter";
import { VEHICLE_BRANDS } from "@/lib/modelPpf";

export default function VehicleLinks({ current }: { current?: string }) {
  const links = [
    { slug: "tesla", name: "Tesla" },
    ...VEHICLE_BRANDS.map((b) => ({ slug: b.slug, name: b.name })),
  ].filter((l) => l.slug !== current);
  return (
    <section className="py-10 bg-[#0A0A0A] border-t border-zinc-800">
      <div className="container">
        <p className="text-zinc-400 text-xs font-bold tracking-[0.3em] uppercase mb-4">PPF by vehicle</p>
        <div className="flex flex-wrap gap-3">
          {links.map((l) => (
            <Link key={l.slug} href={`/${l.slug}-ppf`} className="border border-zinc-700 hover:border-[#E85D04] text-zinc-300 hover:text-white text-sm px-4 py-2 transition-colors">
              {l.name} PPF
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
