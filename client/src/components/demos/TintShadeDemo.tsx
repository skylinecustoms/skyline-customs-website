import { useEffect, useState } from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import type { TintApi, TintView } from "./engines/tint";
import { DemoLayout, Stat, Toggle, useDemoEngine, useDemoTracking } from "./DemoBits";

const SHADES = [{ v: 100, title: "None", sub: "Factory" }, { v: 70, title: "70%", sub: "Clear" }, { v: 50, title: "50%", sub: "Light" }, { v: 35, title: "35%", sub: "Medium" }, { v: 20, title: "20%", sub: "Dark" }, { v: 5, title: "5%", sub: "Limo" }];
// Light let through, from our shade chart (Geoshield Pro Nano Ceramic).
const LIGHT_PCT: Record<number, number> = { 70: 69, 50: 55, 35: 34, 20: 22, 5: 6 };
const CAPTION: Record<TintView, string> = { out: "From outside: can people see in?", in: "From inside, by day: can you see out?", night: "From inside, at night: can you see out?" };

/** Pick a shade and watch it squeegee onto the glass; switch between outside, inside by day and at night. */
export default function TintShadeDemo() {
  const [shade, setShade] = useState(100);
  const [view, setView] = useState<TintView>("out");
  const played = useDemoTracking("tint_shades");
  const { ref, api } = useDemoEngine<TintApi>(async (cv) => (await import("./engines/tint")).mountTint(cv));
  useEffect(() => { api?.setView(view); }, [api, view]);
  const pick = (v: number) => { setShade(v); api?.pick(v); played(); };
  const front = shade >= 50, back = shade >= 35;

  return (
    <DemoLayout eyebrow="Ceramic window tint" title={<>Pick your <span className="text-[#E85D04]">shade.</span></>}
      stage={
        <div className="relative w-full aspect-[960/388] overflow-hidden border border-zinc-800 bg-[#0a0a0a]">
          <canvas ref={ref} className="absolute inset-0 w-full h-full" role="img" aria-label="Close-up of the side windows of an orange Tesla Model 3, with the seats visible inside. Pick a shade to tint the glass." />
          <span className="pointer-events-none absolute left-3 top-3 bg-black/70 border border-zinc-800 px-2.5 py-1.5 text-[10px] uppercase tracking-[0.16em] text-white" aria-live="polite">{CAPTION[view]}</span>
        </div>
      }>
      <p className="text-zinc-400 leading-relaxed">Tap a shade and watch the film go on. The number is how much light gets through, so lower is darker. Then look from inside, by day and at night.</p>
      <Toggle label="Tint shade" value={shade} onChange={pick} options={SHADES} />
      <Toggle label="View" value={view} onChange={(v) => { setView(v); played(); }} options={[{ v: "out", title: "Outside", sub: "Day" }, { v: "in", title: "Inside", sub: "Day" }, { v: "night", title: "Inside", sub: "Night" }]} />
      <div className="flex flex-wrap gap-2">
        <Stat label="Light in" value={shade === 100 ? "Factory" : LIGHT_PCT[shade] + "%"} />
        <Stat label="UV blocked" value={shade === 100 ? "Partial" : "99%"} tone="accent" />
        <Stat label="IR heat blocked" value={shade === 100 ? "—" : "80–83%"} />
      </div>
      <div className="border border-zinc-800 bg-[#111] px-4 py-3 text-sm space-y-1" aria-live="polite">
        {shade === 100 ? <p><b className="text-white">Factory glass.</b> <span className="text-zinc-400">Pick a shade to see it on the car.</span></p> : <>
          <p className="text-white font-semibold">{shade}% in Virginia:</p>
          <p className={front ? "text-green-500" : "text-amber-500"}>{front ? "Front doors: legal" : "Front doors: too dark (50% minimum)"}</p>
          <p className={back ? "text-green-500" : "text-amber-500"}>{back ? "Rear doors and back glass: legal" : "Rear doors and back glass: too dark on a sedan (35% minimum)"}</p>
        </>}
      </div>
      <Link href="/get-a-quote?service=tint" data-cta="demo_tint_shades" className="cta inline-flex items-center gap-2 bg-[#E85D04] hover:bg-[#c94f03] text-white font-['Bebas_Neue',sans-serif] text-xl tracking-wider px-6 py-3">
        {shade === 100 ? "Book your tint" : `Book ${shade}% tint`} <ArrowRight className="w-4 h-4" />
      </Link>
    </DemoLayout>
  );
}
