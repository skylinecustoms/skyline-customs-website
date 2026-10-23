import { useEffect, useRef, useState, type ComponentType } from "react";

// "One idea at a time": on large screens the heading stays put on the left with a 01 / 06 counter, and
// each point gets most of a screen on the right, coming into full brightness as it reaches the middle.
// On phones the points simply stack. Every point is in the HTML from the server, so nothing is hidden
// from search engines or from visitors who don't scroll.
type Item = { icon: ComponentType<{ className?: string }>; title: string; desc: string };

export default function OneIdea({ eyebrow, heading, items }: { eyebrow: string; heading: string; items: Item[] }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i)); }),
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [items.length]);
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    <section className="py-24 bg-[#0D0D0D]">
      <div className="container max-w-6xl lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div className="mb-12 lg:mb-0 lg:sticky lg:top-32 lg:self-start">
          <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">{eyebrow}</p>
          <h2 className="font-['Bebas_Neue',sans-serif] text-5xl md:text-6xl text-white leading-none">{heading}</h2>
          <div className="hidden lg:flex items-center gap-4 mt-10" aria-hidden="true">
            <span className="font-mono-brand text-sm text-[#E85D04] tabular-nums">{pad(active + 1)}</span>
            <div className="relative h-[2px] w-40 bg-zinc-800 overflow-hidden rounded-full">
              <div className="absolute inset-y-0 left-0 bg-[#E85D04] transition-[width] duration-500 ease-out" style={{ width: `${((active + 1) / items.length) * 100}%` }} />
            </div>
            <span className="font-mono-brand text-sm text-zinc-500 tabular-nums">{pad(items.length)}</span>
          </div>
        </div>
        <div className="space-y-4 lg:space-y-0">
          {items.map((b, i) => (
            <div
              key={b.title}
              ref={(el) => { refs.current[i] = el; }}
              data-i={i}
              className={`squircle border border-zinc-800 bg-[#111] p-8 lg:border-0 lg:bg-transparent lg:p-0 lg:rounded-none lg:min-h-[62vh] lg:flex lg:flex-col lg:justify-center transition-[opacity,transform] duration-500 ease-out motion-reduce:transition-none ${
                i === active ? "lg:opacity-100 lg:translate-y-0" : "lg:opacity-25 lg:translate-y-3"
              }`}
            >
              <b.icon className="w-8 h-8 lg:w-12 lg:h-12 text-[#E85D04] mb-4 lg:mb-6" />
              <h3 className="font-['Bebas_Neue',sans-serif] text-3xl lg:text-5xl text-white mb-3 lg:mb-5 leading-none">{b.title}</h3>
              <p className="text-zinc-400 leading-relaxed lg:text-xl lg:max-w-xl">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
