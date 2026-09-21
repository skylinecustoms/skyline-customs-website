/**
 * Infinite logo strip (CSS-only, so it renders on the server and needs no JS).
 * The list is rendered twice; the track slides by half its width and loops.
 * Logos are shown monochrome in the site palette and brighten on hover.
 * Hover pauses it; reduced-motion users get a static scrollable row.
 */
import { Link } from "wouter";
import type { BrandLogo } from "@shared/brands";

interface Props {
  items: BrandLogo[];
  /** Seconds for one full loop. */
  duration?: number;
  /** Slide right-to-left (default) or left-to-right. */
  reverse?: boolean;
  ariaLabel: string;
}

function Logo({ item }: { item: BrandLogo }) {
  if (!item.logo) {
    return (
      <span className="font-display text-2xl italic tracking-[0.12em] text-zinc-400 group-hover:text-white transition-colors" role="img" aria-label={item.alt}>
        {item.name.toUpperCase()}
      </span>
    );
  }
  // Every logo is pushed into the site's monochrome palette with a CSS filter (see BrandLogo.mono).
  const mono = { flatten: "brightness-0 invert", invert: "grayscale invert", gray: "grayscale", none: "" }[item.mono ?? "flatten"];
  return (
    <img
      src={item.logo}
      alt={item.alt}
      width={item.width}
      height={item.height}
      loading="lazy"
      decoding="async"
      className={`h-7 w-auto max-w-[140px] object-contain ${mono} opacity-60 group-hover:opacity-100 transition-opacity`}
    />
  );
}

function Item({ item }: { item: BrandLogo }) {
  const external = item.href.startsWith("http");
  const cls = "group flex shrink-0 items-center gap-3 px-7 py-3";
  const inner = (
    <>
      <Logo item={item} />
      {item.logo && (
        <span className="font-mono-brand text-[10px] uppercase tracking-[0.2em] text-zinc-400 group-hover:text-brand-orange transition-colors whitespace-nowrap">
          {item.name}
        </span>
      )}
    </>
  );
  return external ? (
    <a href={item.href} target="_blank" rel="noopener" className={cls} title={item.alt}>{inner}</a>
  ) : (
    <Link href={item.href} className={cls} title={item.alt}>{inner}</Link>
  );
}

export default function BrandMarquee({ items, duration = 45, reverse = false, ariaLabel }: Props) {
  return (
    <div className="marquee relative overflow-hidden" aria-label={ariaLabel} role="region">
      <div className="marquee-track flex w-max" style={{ animationDuration: `${duration}s`, animationDirection: reverse ? "reverse" : "normal" }}>
        <div className="flex">
          {items.map((item) => <Item key={item.name} item={item} />)}
        </div>
        <div className="flex" aria-hidden="true">
          {items.map((item) => <Item key={`${item.name}-copy`} item={item} />)}
        </div>
      </div>
    </div>
  );
}
