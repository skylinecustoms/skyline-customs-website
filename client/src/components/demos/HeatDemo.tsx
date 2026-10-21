import { useEffect, useRef, useState } from "react";
import type { HeatApi } from "./engines/heat";
import { DemoLayout, Stat, Toggle, useDemoEngine, useDemoTracking } from "./DemoBits";

// Cabin after an hour in direct sun on a 90°F day. Illustrative figures for the comparison, not a test result.
const FILMS = [
  { v: 0, title: "No film", sub: "Factory glass", level: .97, temp: 145, rej: "—", fill: 92 },
  { v: 1, title: "Regular", sub: "Dyed tint", level: .8, temp: 127, rej: "~30%", fill: 66 },
  { v: 2, title: "Ceramic", sub: "Our film", level: .55, temp: 104, rej: "~60%", fill: 34 },
];

/** A thermal-camera view of the car in the sun: the cabin cools as better film is chosen. */
export default function HeatDemo() {
  const [film, setFilm] = useState(0);
  const [temp, setTemp] = useState(FILMS[0].temp);
  const shown = useRef(FILMS[0].temp);
  const played = useDemoTracking("heat_rejection");
  const { ref, api } = useDemoEngine<HeatApi>(async (cv) => (await import("./engines/heat")).mountHeat(cv, FILMS[0].level));
  const f = FILMS[film];
  useEffect(() => {
    api?.setLevel(f.level);
    const from = shown.current, to = f.temp, t0 = performance.now(); let raf = 0;
    const tick = (now: number) => { const k = Math.min(1, (now - t0) / 900), v = Math.round(from + (to - from) * (1 - Math.pow(1 - k, 3))); shown.current = v; setTemp(v); if (k < 1) raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [api, f]);

  return (
    <DemoLayout eyebrow="Heat rejection" title={<>Feel the <span className="text-[#E85D04]">difference.</span></>}
      stage={
        <div className="relative w-full aspect-[960/388] overflow-hidden border border-zinc-800 bg-black">
          <canvas ref={ref} className="absolute inset-0 w-full h-full" role="img" aria-label="Thermal camera view of a car in the sun. The cabin cools as better film is chosen." />
          <div className="pointer-events-none absolute right-3 top-3 bottom-3 w-12 grid grid-rows-[1fr_auto] justify-items-center gap-1.5" aria-hidden="true">
            <div className="relative w-3.5 rounded-full bg-white/10 border border-white/30 overflow-hidden"><div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#ffe14d] via-[#ff8c1a] to-[#e0302b] transition-[height] duration-1000" style={{ height: f.fill + "%" }} /></div>
            <b className="font-['Bebas_Neue',sans-serif] text-2xl text-white [text-shadow:0_1px_3px_#000] tabular-nums">{temp}&deg;</b>
          </div>
          <div className="pointer-events-none absolute left-3 bottom-3 flex items-center gap-2 text-[9px] uppercase tracking-[0.15em] text-white [text-shadow:0_1px_2px_#000]" aria-hidden="true">
            <span>Cool</span><i className="block w-24 h-2 border border-white/30 bg-[linear-gradient(90deg,#000010,#2a0a5e,#8b1a8a,#e0302b,#ff8c1a,#ffe14d,#fff)]" /><span>Hot</span>
          </div>
        </div>
      }>
      <p className="text-zinc-400 leading-relaxed">An hour in direct sun on a 90&deg;F day, through a thermal camera. Pick a film and watch the cabin.</p>
      <Toggle label="Film" value={film} onChange={(v) => { setFilm(v); played(); }} options={FILMS} />
      <div className="flex flex-wrap gap-2">
        <Stat label="Cabin temp" value={temp + "°F"} tone="accent" />
        <Stat label="Heat rejected" value={f.rej} />
      </div>
      <p className="text-zinc-600 text-xs">Typical figures for illustration. Actual results depend on the car, the glass and the day.</p>
    </DemoLayout>
  );
}
