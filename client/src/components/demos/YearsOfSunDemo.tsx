import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import type { AgeApi } from "./engines/age";
import { DemoLayout, Stat, useDemoEngine, useDemoTracking } from "./DemoBits";

const STAGES: [number, string][] = [
  [0, "Year 0. Both sides look the same: fresh, deep gloss."],
  [1.5, "Year 2. The unprotected side is losing its depth, and the first chips are showing up front."],
  [3.5, "Year 4. Oxidation: the color is chalking and fading where the sun hits hardest."],
  [5.5, "Year 6. The clear coat is failing on the hood. That's a repaint, not a polish."],
  [6.8, "Year 7. Unprotected: faded, chipped, peeling. Protected: still like new."],
];

/** One car split down the middle; drag through seven years of Virginia sun. */
export default function YearsOfSunDemo() {
  const [year, setYear] = useState(0);
  const playing = useRef(0);
  const played = useDemoTracking("years_of_sun");
  const { ref, api } = useDemoEngine<AgeApi>(async (cv) => (await import("./engines/age")).mountAge(cv));
  useEffect(() => { api?.setYear(year); }, [api, year]);
  useEffect(() => () => cancelAnimationFrame(playing.current), []);
  const stop = () => { cancelAnimationFrame(playing.current); playing.current = 0; };
  const play = () => {
    stop(); played();
    const from = year >= 6.99 ? 0 : year, t0 = performance.now(), dur = (7 - from) / 7 * 6000;
    const tick = (now: number) => { const k = Math.min(1, (now - t0) / dur); setYear(from + (7 - from) * k); playing.current = k < 1 ? requestAnimationFrame(tick) : 0; };
    playing.current = requestAnimationFrame(tick);
  };
  const shown = Math.floor(year + .001);
  let msg = STAGES[0][1]; for (const [y, m] of STAGES) if (year >= y) msg = m;

  return (
    <DemoLayout eyebrow="Ceramic coating + PPF" title={<>Fast-forward <span className="text-[#E85D04]">7 years.</span></>}
      stage={
        <div className="relative w-full aspect-[16/10] overflow-hidden border border-zinc-800 bg-[#0a0a0a]">
          <canvas ref={ref} className="absolute inset-0 w-full h-full" role="img" aria-label="A glossy orange Tesla Model 3 split in half: protected on the left, unprotected on the right." />
          <span className="pointer-events-none absolute left-3 top-3 bg-black/75 border border-zinc-800 px-2.5 py-1.5 text-[10px] uppercase tracking-[0.16em] text-green-500">Protected</span>
          <span className="pointer-events-none absolute right-3 top-3 bg-black/75 border border-zinc-800 px-2.5 py-1.5 text-[10px] uppercase tracking-[0.16em] text-amber-500">Unprotected</span>
        </div>
      }>
      <p className="text-zinc-400 leading-relaxed min-h-[3.25rem]" aria-live="polite">{msg}</p>
      <label className="block">
        <span className="block text-[10px] uppercase tracking-[0.2em] text-zinc-500 mb-2">Years in the sun</span>
        <input type="range" min={0} max={7} step={0.01} value={year} aria-valuetext={`Year ${shown}`} className="w-full accent-[#E85D04] min-h-[32px]"
          onChange={(e) => { stop(); setYear(+e.target.value); played(); }} />
      </label>
      <div className="flex flex-wrap gap-2 items-stretch">
        <Stat label="Year" value={shown} tone="accent" />
        <button type="button" onClick={play} className="min-h-[44px] inline-flex items-center gap-2 px-4 border border-zinc-700 text-zinc-200 text-sm hover:border-[#E85D04]"><Play className="w-4 h-4" /> Play 7 years</button>
      </div>
    </DemoLayout>
  );
}
