/**
 * The ceramic special, one orange band linking to /promo-ceramic. Shown on the
 * ceramic service page, the ceramic city pages, and the services overview.
 */
import { Link } from "wouter";
import { ArrowRight, Sparkles } from "lucide-react";

export default function CeramicPromoBanner({ cta = "ceramic-promo-banner" }: { cta?: string }) {
  return (
    <section className="bg-[#E85D04] text-black">
      <div className="container py-5 md:py-6 flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
        <div className="flex items-center gap-4">
          <Sparkles className="w-10 h-10 shrink-0" strokeWidth={1.75} />
          <div>
            <p className="font-display text-3xl md:text-4xl leading-none tracking-wide">$995 CERAMIC COATING, GLASS + WHEELS FREE</p>
            <p className="text-black/80 text-sm md:text-base mt-1">System X, 9H, 6-year transferable warranty. Limited install slots this month.</p>
          </div>
        </div>
        <Link href="/promo-ceramic" data-cta={cta} className="md:ml-auto shrink-0 inline-flex items-center justify-center gap-2 bg-black text-white font-display text-xl tracking-[0.1em] uppercase px-7 py-4 hover:bg-zinc-900 transition-colors">See the special <ArrowRight className="w-5 h-5" /></Link>
      </div>
    </section>
  );
}
