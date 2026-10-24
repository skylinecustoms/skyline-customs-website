import { useEffect, useState } from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import type { RockApi, RockStats } from "./engines/rock";
import { DemoLayout, Hint, Stat, Toggle, useDemoEngine, useDemoTracking } from "./DemoBits";

/** What one rock chip costs to touch up. Used for the running "repair bill" and "saved by PPF" totals. */
export const CHIP_COST = 100;
const CTA = "cta inline-flex items-center gap-2 bg-[#E85D04] hover:bg-[#c94f03] text-white font-['Bebas_Neue',sans-serif] text-xl tracking-wider px-6 py-3";
const money = (n: number) => "$" + n.toLocaleString("en-US");

/**
 * Throw rocks at the car. With PPF the film takes every hit (+$100 saved each); without it every hit chips
 * the paint and adds to the repair bill. `cta` sets where the button below it goes; `highwayOnStart` starts
 * it with highway mode on, so rocks are already flying when it scrolls into view.
 */
export default function RockChipDemo({ eyebrow = "Paint protection film", cta = { href: "/get-a-quote?service=ppf", label: "Get a PPF quote" }, highwayOnStart = false }: { eyebrow?: string; cta?: { href: string; label: string }; highwayOnStart?: boolean }) {
  const [film, setFilm] = useState(true);
  const [highway, setHighway] = useState(highwayOnStart);
  // highway mode starts on where asked, except for visitors who ask for reduced motion
  useEffect(() => { if (highwayOnStart && window.matchMedia("(prefers-reduced-motion: reduce)").matches) setHighway(false); }, [highwayOnStart]);
  const [stats, setStats] = useState<RockStats>({ hits: 0, chips: 0, saved: 0, cost: 0 });
  const [touched, setTouched] = useState(false);
  const played = useDemoTracking("rock_chips");
  const { ref, api } = useDemoEngine<RockApi>(async (cv) => {
    const [{ mountRock }, img] = await Promise.all([import("./engines/rock"), new Promise<HTMLImageElement>((ok) => { const i = new Image(); i.onload = i.onerror = () => ok(i); i.src = "/images/demos/rock-car.webp"; })]);
    return mountRock(cv, img, { chipCost: CHIP_COST, onStats: setStats });
  });
  useEffect(() => { api?.setFilm(film); }, [api, film]);
  useEffect(() => { api?.setHighway(highway); }, [api, highway]);
  const touch = () => { if (!touched) setTouched(true); played(); };

  return (
    <DemoLayout eyebrow={eyebrow} title={film ? <>Throw a <span className="text-[#E85D04]">rock at it.</span></> : <>Now without <span className="text-[#E85D04]">the film.</span></>}
      stage={
        <div className="relative w-full aspect-[16/10] overflow-hidden border border-zinc-800 bg-[#0a0a0a]">
          <canvas ref={ref} onPointerDown={touch} className="absolute inset-0 w-full h-full cursor-crosshair touch-manipulation" role="img" aria-label="The front end of a grey Tesla Model 3 driving. Tap the paint to throw rocks at it." />
          {/* While rocks fly on their own, a pulsing target on the hood invites the visitor to throw one too. */}
          {highway && !touched && (
            <span aria-hidden="true" className="pointer-events-none absolute left-[42%] top-[46%] -translate-x-1/2 -translate-y-1/2">
              <span className="tap-ring" />
              <span className="tap-ring" style={{ animationDelay: "0.7s" }} />
              <span className="relative block h-4 w-4 rounded-full bg-[#E85D04] shadow-[0_0_18px_rgba(232,93,4,0.8)]" />
            </span>
          )}
          <Hint show={!touched}>{highway ? "Your turn: tap the car to throw a rock" : "Tap the car to throw a rock"}</Hint>
        </div>
      }>
      <p className="text-zinc-400 leading-relaxed">
        {film ? `Tap the car to throw a rock, or turn on highway mode. The film takes every hit, and every hit is a ${money(CHIP_COST)} touch-up you don't pay for.`
          : `Same rocks, bare paint. Every hit leaves a chip that stays, and every chip is about ${money(CHIP_COST)} to touch up. Watch the bill add up.`}
      </p>
      <Toggle label="Film" value={film ? 1 : 0} onChange={(v) => { setFilm(v === 1); touch(); }} options={[{ v: 1, title: "With PPF", sub: "STEK film" }, { v: 0, title: "No PPF", sub: "Bare paint" }]} />
      <div className="flex flex-wrap gap-2">
        <Stat label="Rocks hit" value={stats.hits} />
        <Stat label="Chips in paint" value={stats.chips} tone="accent" />
        {film ? <Stat label="Saved by PPF" value={"+" + money(stats.saved)} tone="good" /> : <Stat label="Repair bill" value={stats.cost ? "−" + money(stats.cost) : "$0"} tone="bad" />}
      </div>
      <div className="flex flex-wrap gap-2">
        <button type="button" aria-pressed={highway} onClick={() => { setHighway(!highway); touch(); }} className="cta cta-alt min-h-[44px] px-4 border border-zinc-700 text-zinc-200 text-sm hover:border-[#E85D04]">Highway mode: {highway ? "on" : "off"}</button>
        <button type="button" onClick={() => api?.reset()} className="cta cta-alt min-h-[44px] px-4 border border-zinc-700 text-zinc-200 text-sm hover:border-[#E85D04]">Fix the paint</button>
      </div>
      {cta.href.startsWith("#") ? (
        <a href={cta.href} data-cta="demo_rock_chips" className={CTA}>{cta.label} <ArrowRight className="w-4 h-4" /></a>
      ) : (
        <Link href={cta.href} data-cta="demo_rock_chips" className={CTA}>{cta.label} <ArrowRight className="w-4 h-4" /></Link>
      )}
    </DemoLayout>
  );
}
