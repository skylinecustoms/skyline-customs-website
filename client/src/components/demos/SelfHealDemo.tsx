import { useEffect, useState } from "react";
import { Sun, Droplets } from "lucide-react";
import type { HealApi, HeatKind } from "./engines/heal";
import { DemoLayout, Hint, Stat, Toggle, useDemoEngine, useDemoTracking } from "./DemoBits";

/** Scratch the paint, add heat (sun or warm water); with self-healing PPF the scratches flow away. */
export default function SelfHealDemo() {
  const [film, setFilm] = useState(true);
  const [count, setCount] = useState(0);
  const [healed, setHealed] = useState(0);
  const [heating, setHeating] = useState<HeatKind | null>(null);
  const [note, setNote] = useState("");
  const played = useDemoTracking("self_healing");
  const { ref, api } = useDemoEngine<HealApi>(async (cv) => {
    const { mountHeal } = await import("./engines/heal");
    return mountHeal(cv, {
      onScratch: (n) => { setCount(n); if (n) played(); },
      onHeated: (didHeal, n) => {
        setHeating(null);
        if (didHeal) { setHealed((h) => h + n); setCount(0); setNote("Healed. The film's top coat flowed back into shape. Scratch it again."); }
        else setNote("Bare paint doesn't heal. Those scratches stay until they're polished out, if they can be.");
      },
    });
  });
  useEffect(() => { api?.setFilm(film); setNote(""); }, [api, film]);
  const heat = (k: HeatKind) => { if (api?.heat(k)) { setHeating(k); setNote(k === "sun" ? "The sun warms the film..." : "Warm water runs over the film..."); played(); } };

  return (
    <DemoLayout eyebrow="Self-healing film" title={film ? <>Scratch it. <span className="text-[#E85D04]">Heal it.</span></> : <>Now try it <span className="text-[#E85D04]">bare.</span></>}
      stage={
        <div className="relative w-full aspect-[16/10] overflow-hidden border border-zinc-800 bg-[#0a0a0a]">
          <canvas ref={ref} className="absolute inset-0 w-full h-full cursor-crosshair touch-none" role="img" aria-label="Close-up of the glossy orange front end of a Tesla Model 3. Drag to scratch it, then add heat." />
          <Hint show={count === 0 && !healed}>Drag to scratch the paint</Hint>
        </div>
      }>
      <p className="text-zinc-400 leading-relaxed" aria-live="polite">
        {note || (film ? "Drag across the paint to scratch it. Then add heat: the sun, or warm water from a wash. STEK's top coat flows back into shape and the scratches disappear." : "Same scratches on bare paint. Add all the heat you like.")}
      </p>
      <Toggle label="Film" value={film ? 1 : 0} onChange={(v) => setFilm(v === 1)} options={[{ v: 1, title: "With PPF", sub: "Self-healing" }, { v: 0, title: "No PPF", sub: "Bare paint" }]} />
      <div className="flex flex-wrap gap-2">
        <button type="button" disabled={!!heating || !count} onClick={() => heat("sun")} className="min-h-[44px] inline-flex items-center gap-2 px-4 bg-[#E85D04] text-white font-['Bebas_Neue',sans-serif] text-xl tracking-wider disabled:opacity-40"><Sun className="w-4 h-4" /> Add sun</button>
        <button type="button" disabled={!!heating || !count} onClick={() => heat("water")} className="min-h-[44px] inline-flex items-center gap-2 px-4 bg-[#1f6f8b] text-white font-['Bebas_Neue',sans-serif] text-xl tracking-wider disabled:opacity-40"><Droplets className="w-4 h-4" /> Warm water</button>
      </div>
      <div className="flex flex-wrap gap-2">
        <Stat label="Scratches" value={count} tone="accent" />
        <Stat label="Healed" value={healed} tone="good" />
      </div>
    </DemoLayout>
  );
}
