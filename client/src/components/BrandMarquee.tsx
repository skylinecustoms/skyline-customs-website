/**
 * Infinite logo carousel (CSS-only, so it renders on the server and needs no JS).
 * The list is rendered twice; the track slides by half its width and loops.
 * Hover pauses it; reduced-motion users get a static scrollable row.
 */
import { Link } from "wouter";
import type { BrandLogo } from "@shared/brands";

interface Props {
  items: BrandLogo[];
  /** "light" tiles for supplier logos (dark artwork), "dark" tiles for white vehicle glyphs. */
  tone: "light" | "dark";
  /** Seconds for one full loop. */
  duration?: number;
  ariaLabel: string;
}

function Tile({ item, tone }: { item: BrandLogo; tone: Props["tone"] }) {
  const external = item.href.startsWith("http");
  const box =
    tone === "light"
      ? "bg-white border border-zinc-200 hover:border-[#E85D04]"
      : "bg-[#111] border border-zinc-800 hover:border-[#E85D04]";
  const inner = (
    <>
      <span className="flex h-14 items-center justify-center">
        {item.logo ? (
          <img
            src={item.logo}
            alt={item.alt}
            width={item.width}
            height={item.height}
            loading="lazy"
            decoding="async"
            className={`max-h-12 w-auto object-contain ${tone === "dark" ? "h-10" : "max-w-[150px]"} ${item.invertOnLight && tone === "light" ? "invert" : ""}`}
          />
        ) : (
          <span className={`font-display text-3xl tracking-wider ${tone === "light" ? "text-zinc-900" : "text-white"}`} role="img" aria-label={item.alt}>
            {item.name}
          </span>
        )}
      </span>
      <span className={`mt-2 block text-center text-[11px] leading-tight ${tone === "light" ? "text-zinc-600" : "text-zinc-400"}`}>
        <span className={`block font-semibold ${tone === "light" ? "text-zinc-900" : "text-white"}`}>{item.name}</span>
        {item.caption}
      </span>
    </>
  );
  const cls = `group flex w-[168px] shrink-0 flex-col justify-center px-4 py-4 transition-colors ${box}`;
  return external ? (
    <a href={item.href} target="_blank" rel="noopener" className={cls} title={item.alt}>{inner}</a>
  ) : (
    <Link href={item.href} className={cls} title={item.alt}>{inner}</Link>
  );
}

export default function BrandMarquee({ items, tone, duration = 45, ariaLabel }: Props) {
  return (
    <div className="marquee relative overflow-hidden" aria-label={ariaLabel} role="region">
      <div className="marquee-track flex w-max" style={{ animationDuration: `${duration}s` }}>
        <div className="flex gap-3 pr-3">
          {items.map((item) => (
            <Tile key={item.name} item={item} tone={tone} />
          ))}
        </div>
        <div className="flex gap-3 pr-3" aria-hidden="true">
          {items.map((item) => (
            <Tile key={`${item.name}-copy`} item={item} tone={tone} />
          ))}
        </div>
      </div>
    </div>
  );
}
