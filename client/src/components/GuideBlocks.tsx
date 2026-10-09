/**
 * Renders guide copy blocks (from @/lib/fullFrontGuide.ts) with inline
 * markdown links and bold. Shared by the full front guide and the PPF
 * service page so the same section reads the same everywhere.
 */
import React from "react";
import { Link } from "wouter";
import { CheckCircle } from "lucide-react";
import type { GuideBlock } from "@/lib/fullFrontGuide";

export function renderInline(text: string) {
  const parts: React.ReactNode[] = [];
  const re = /\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*/g;
  let last = 0; let m: RegExpExecArray | null; let k = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    if (m[1] !== undefined) parts.push(<Link key={k++} href={m[2]} className="text-[#E85D04] underline underline-offset-2 decoration-1 hover:decoration-2">{m[1]}</Link>);
    else parts.push(<strong key={k++} className="text-white font-semibold">{m[3]}</strong>);
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

export function GuideBlockView({ b }: { b: GuideBlock }) {
  switch (b.type) {
    case "h3": return <h3 className="font-['Bebas_Neue',sans-serif] text-2xl md:text-3xl text-white mt-8 mb-3 tracking-wide">{b.text}</h3>;
    case "p": return <p className="text-zinc-300 leading-relaxed mb-5">{renderInline(b.text)}</p>;
    case "quote": return <blockquote className="border-l-4 border-[#E85D04] pl-5 my-7 text-white text-lg leading-relaxed italic">{renderInline(b.text)}</blockquote>;
    case "ul": return <ul className="space-y-2 mb-6">{b.items.map((it) => <li key={it.slice(0, 40)} className="flex items-start gap-3 text-zinc-300 leading-relaxed"><CheckCircle className="w-4 h-4 text-[#E85D04] mt-1.5 shrink-0" /><span>{renderInline(it)}</span></li>)}</ul>;
    case "ol": return <ol className="space-y-3 mb-6">{b.items.map((it, i) => <li key={it.slice(0, 40)} className="flex items-start gap-4 text-zinc-300 leading-relaxed"><span className="font-display text-2xl text-[#E85D04] leading-none mt-0.5 w-8 shrink-0">{String(i + 1).padStart(2, "0")}</span><span>{renderInline(it)}</span></li>)}</ol>;
  }
}

export function GuideBlocks({ blocks }: { blocks: GuideBlock[] }) {
  return <>{blocks.map((b, i) => <GuideBlockView key={i} b={b} />)}</>;
}
