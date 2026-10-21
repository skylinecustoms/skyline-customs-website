import { useEffect, useState } from "react";
import type { WaterApi, WaterStats } from "./engines/water";
import { Hint, Stat, Toggle, useDemoEngine, useDemoTracking } from "./DemoBits";

/**
 * Coated vs bare paint, up close. Coated: deep gloss, water beads up and rolls off, a wipe leaves no mark.
 * Bare: hazy and swirled, water smears, every wipe scratches. `compact` drops the heading for use inside
 * another section (the promo's "What you get").
 */
export default function WaterDemo({ compact = false }: { compact?: boolean }) {
  const [coated, setCoated] = useState(true);
  const [stats, setStats] = useState<WaterStats>({ rolled: 0, scratches: 0, beading: true });
  const [touched, setTouched] = useState(false);
  const played = useDemoTracking("water_beading");
  const touch = () => { setTouched(true); played(); };
  const { ref, api } = useDemoEngine<WaterApi>(async (cv) => {
    const { mountWater } = await import("./engines/water");
    return mountWater(cv, { onStats: setStats, onTouch: touch });
  });
  useEffect(() => { api?.setCoated(coated); }, [api, coated]);

  const stage = (
    <div className="relative w-full aspect-[16/10] overflow-hidden border border-zinc-800 bg-[#050506]">
      <canvas ref={ref} className="absolute inset-0 w-full h-full cursor-grab touch-none" role="img" aria-label="Close-up of glossy dark paint covered in water drops. Drag across it to push the water." />
      <Hint show={!touched}>Drag across the paint &rarr;</Hint>
    </div>
  );
  const controls = (
    <>
      <p className="text-zinc-400 leading-relaxed">
        {coated ? "Coated paint, up close: deep gloss, sharp reflections. Drag across it and the water beads up and rolls off, and the wipe leaves no marks."
          : "Bare paint: duller, with swirl marks in the light. Drag across it and the water smears instead of rolling off, and every wipe adds new scratches."}
      </p>
      <Toggle label="Paint" value={coated ? 1 : 0} onChange={(v) => { setCoated(v === 1); touch(); }} options={[{ v: 1, title: "Ceramic coated", sub: "Hydrophobic" }, { v: 0, title: "No coating", sub: "Bare clear coat" }]} />
      <div className="flex flex-wrap gap-2">
        <Stat label="Rolled off" value={stats.rolled} tone="accent" />
        <Stat label="Water" value={coated ? "Beading" : "Sticking"} />
        <Stat label="New scratches" value={coated ? "None" : stats.scratches} tone={coated ? "good" : "bad"} />
      </div>
      <button type="button" onClick={() => api?.spray()} className="min-h-[44px] px-4 border border-zinc-700 text-zinc-200 text-sm hover:border-[#E85D04]">Spray it again</button>
    </>
  );
  if (compact) return <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"><div className="lg:col-span-7">{stage}</div><div className="lg:col-span-5 space-y-4">{controls}</div></div>;
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
      <div className="lg:col-span-7 lg:order-2">{stage}</div>
      <div className="lg:col-span-5 lg:order-1 space-y-4">
        <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase">Ceramic coating</p>
        <h2 className="font-['Bebas_Neue',sans-serif] text-5xl md:text-6xl text-white leading-[0.95]">{coated ? <>Wipe the <span className="text-[#E85D04]">water.</span></> : <>Now try it <span className="text-[#E85D04]">bare.</span></>}</h2>
        {controls}
      </div>
    </div>
  );
}
