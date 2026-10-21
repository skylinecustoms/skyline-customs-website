/**
 * Shared pieces for the interactive demos (rock chips, self-healing film, water beading, tint shades,
 * heat rejection). Each demo's canvas code is its own chunk, downloaded only when the visitor scrolls near
 * it, so the pages load exactly as fast as before. Nothing renders into the canvas on the server.
 */
import { useEffect, useRef, useState, type ReactNode } from "react";
import { track } from "@/lib/analytics";

/** Mounts a demo engine once its canvas is within ~400px of the screen; destroys it on unmount. */
export function useDemoEngine<T extends { destroy(): void }>(load: (canvas: HTMLCanvasElement) => Promise<T>) {
  const ref = useRef<HTMLCanvasElement>(null);
  const [api, setApi] = useState<T | null>(null);
  useEffect(() => {
    const cv = ref.current; if (!cv) return;
    let engine: T | null = null, dead = false;
    const io = new IntersectionObserver((es) => {
      if (!es[0].isIntersecting) return;
      io.disconnect();
      load(cv).then((e) => { if (dead) e.destroy(); else { engine = e; setApi(e); } });
    }, { rootMargin: "400px 0px" });
    io.observe(cv);
    return () => { dead = true; io.disconnect(); engine?.destroy(); };
    // the loader is fixed for a demo's lifetime
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { ref, api };
}

/** One GA4 event the first time a visitor actually plays with a demo on this page. */
export function useDemoTracking(demo: string) {
  const sent = useRef(false);
  return () => { if (!sent.current) { sent.current = true; track("demo_interact", { demo }); } };
}

export function Toggle<V extends string | number>({ label, value, options, onChange }: { label: string; value: V; options: { v: V; title: string; sub?: string }[]; onChange(v: V): void }) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button key={String(o.v)} type="button" aria-pressed={value === o.v} onClick={() => onChange(o.v)}
          className={`min-h-[44px] px-4 py-2.5 border text-left transition-colors ${value === o.v ? "border-[#E85D04] bg-[#E85D04]/15 text-white" : "border-zinc-800 bg-[#111] text-zinc-300 hover:border-zinc-600"}`}>
          <span className="block font-['Bebas_Neue',sans-serif] text-xl leading-none tracking-wide">{o.title}</span>
          {o.sub && <span className="block mt-1 text-[10px] uppercase tracking-[0.15em] text-zinc-500">{o.sub}</span>}
        </button>
      ))}
    </div>
  );
}

export function Stat({ label, value, tone }: { label: string; value: ReactNode; tone?: "accent" | "good" | "bad" }) {
  const color = tone === "accent" ? "text-[#E85D04]" : tone === "good" ? "text-green-500" : tone === "bad" ? "text-red-500" : "text-white";
  return (
    <div className="border border-zinc-800 bg-[#111] px-3 py-2 min-w-[112px]">
      <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">{label}</p>
      <p className={`font-['Bebas_Neue',sans-serif] text-[26px] leading-none mt-1 tabular-nums ${color}`} aria-live="polite">{value}</p>
    </div>
  );
}

/** The two-column demo layout: copy and controls on one side, the demo on the other (demo first on phones). */
export function DemoLayout({ eyebrow, title, children, stage }: { eyebrow: string; title: ReactNode; children: ReactNode; stage: ReactNode }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
      <div className="lg:col-span-7 lg:order-2">{stage}</div>
      <div className="lg:col-span-5 lg:order-1 space-y-4">
        <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase">{eyebrow}</p>
        <h2 className="font-['Bebas_Neue',sans-serif] text-5xl md:text-6xl text-white leading-[0.95]">{title}</h2>
        {children}
      </div>
    </div>
  );
}

export function Hint({ show, children }: { show: boolean; children: ReactNode }) {
  return (
    <span aria-hidden="true" className={`pointer-events-none absolute left-1/2 bottom-3 -translate-x-1/2 whitespace-nowrap bg-black/70 border border-[#E85D04]/60 px-3.5 py-2.5 font-['Bebas_Neue',sans-serif] text-lg tracking-wider text-white transition-opacity duration-300 ${show ? "opacity-100" : "opacity-0"}`}>
      {children}
    </span>
  );
}
