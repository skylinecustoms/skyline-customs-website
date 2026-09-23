/**
 * Wall of real Google reviews with filter chips, so a visitor can find
 * "someone like me": same service, same kind of car. Live reviews from the
 * Google Places feed come first, then the curated set from Testimonials.
 */
import { useMemo, useState } from "react";
import { Star, ExternalLink } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { ALL_REVIEWS } from "@/components/Testimonials";
import { GOOGLE_MAPS_URL } from "@/lib/social";
import { track } from "@/lib/analytics";

interface WallReview { name: string; date: string; text: string; rating: number; tags: string[] }

const SERVICE_TAGS: [string, RegExp][] = [
  ["PPF", /\bppf\b|paint protection|\bfilm\b|clear bra/i],
  ["Ceramic Coating", /ceramic coat|\bcoating\b/i],
  ["Window Tint", /\btint/i],
];
const CAR_TAGS: [string, RegExp][] = [
  ["Tesla", /tesla|model [3syx]\b|cybertruck/i],
  ["BMW", /\bbmw\b|\bm[2-8]\b/i],
  ["Porsche", /porsche|911|cayenne|macan|taycan/i],
  ["Corvette", /corvette|c8\b|stingray|z06/i],
  ["Mercedes", /mercedes|benz|\bamg\b/i],
  ["Audi", /\baudi\b/i],
  ["Trucks & SUVs", /\btruck\b|silverado|f-?150|\bram\b|tahoe|suburban|4runner|tacoma|bronco|jeep|escalade|\bsuv\b/i],
];

function tagsFor(service: string, text: string): string[] {
  const hay = `${service} ${text}`;
  const tags = SERVICE_TAGS.filter(([, re]) => re.test(hay)).map(([t]) => t);
  for (const [t, re] of CAR_TAGS) if (re.test(text)) tags.push(t);
  return tags;
}

const PAGE = 9;

export default function ReviewWall({ total = "140+" }: { total?: string }) {
  const { data: live } = trpc.site.googleReviews.useQuery(undefined, { staleTime: 60 * 60 * 1000 });
  const [filter, setFilter] = useState("All");
  const [shown, setShown] = useState(PAGE);

  const reviews = useMemo<WallReview[]>(() => {
    const fromLive = (live?.reviews ?? []).filter((r) => r.rating >= 4 && r.text?.trim()).map((r) => ({ name: r.author, date: r.when, text: r.text, rating: r.rating, tags: tagsFor("", r.text) }));
    const names = new Set(fromLive.map((r) => r.name));
    const fromStatic = ALL_REVIEWS.filter((r) => !names.has(r.name)).map((r) => ({ name: r.name, date: r.date, text: r.text, rating: r.rating, tags: tagsFor(r.service, r.text) }));
    return [...fromLive, ...fromStatic];
  }, [live]);

  const chips = useMemo(() => {
    const counts = new Map<string, number>();
    for (const r of reviews) for (const t of r.tags) counts.set(t, (counts.get(t) ?? 0) + 1);
    const order = [...SERVICE_TAGS, ...CAR_TAGS].map(([t]) => t);
    return ["All", ...order.filter((t) => (counts.get(t) ?? 0) > 0)];
  }, [reviews]);

  const visible = (filter === "All" ? reviews : reviews.filter((r) => r.tags.includes(filter)));
  const ratingLabel = live?.rating ? live.rating.toFixed(1) : "5.0";
  const totalLabel = live?.total ? `${live.total}` : total;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-[#E85D04] text-[#E85D04]" />)}</div>
          <span className="text-white text-sm font-bold">{ratingLabel}</span>
          <span className="text-zinc-400 text-sm">· {totalLabel} Google reviews</span>
        </div>
        <a href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[#E85D04] text-xs font-bold tracking-wider uppercase underline underline-offset-2 decoration-1 hover:decoration-2">
          Read them on Google <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      <div className="flex flex-wrap gap-2 mb-8" role="tablist" aria-label="Filter reviews">
        {chips.map((c) => (
          <button
            key={c}
            type="button"
            role="tab"
            aria-selected={filter === c}
            onClick={() => { setFilter(c); setShown(PAGE); track("review_filter", { review_filter: c }); }}
            className={`px-4 py-2 text-xs font-bold tracking-[0.15em] uppercase border transition-colors ${filter === c ? "bg-[#E85D04] border-[#E85D04] text-black" : "border-zinc-700 text-zinc-300 hover:border-[#E85D04] hover:text-white"}`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {visible.slice(0, shown).map((r) => (
          <figure key={`${r.name}-${r.date}`} className="border border-zinc-800 bg-[#0D0D0D] p-6 flex flex-col">
            <div className="flex items-center gap-0.5 mb-3">{[...Array(r.rating)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-[#E85D04] text-[#E85D04]" />)}</div>
            <blockquote className="text-zinc-200 text-sm leading-relaxed flex-1">{r.text}</blockquote>
            <figcaption className="mt-5 pt-4 border-t border-zinc-800">
              <p className="text-white font-bold text-sm">{r.name}</p>
              <p className="text-zinc-400 text-xs mt-0.5">
                Verified Google review{r.tags.length > 0 ? ` · ${r.tags.slice(0, 2).join(" · ")}` : ""}{r.date ? ` · ${r.date}` : ""}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>

      {visible.length === 0 && <p className="text-zinc-400 text-sm">No reviews mention that yet. Try another filter.</p>}

      {shown < visible.length && (
        <div className="text-center mt-8">
          <button type="button" onClick={() => setShown((n) => n + PAGE)} className="border border-zinc-600 hover:border-[#E85D04] text-white font-bold tracking-widest uppercase text-sm px-8 py-3 transition-colors">
            Show more reviews ({visible.length - shown} more)
          </button>
        </div>
      )}
    </div>
  );
}
