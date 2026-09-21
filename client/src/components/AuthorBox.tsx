/**
 * Author / E-E-A-T box for blog posts. The shop is the author; the credentials
 * listed here are the same certifications shown on /about.
 */
import { Link } from "wouter";
import { CERTIFICATIONS } from "@/lib/certifications";

export default function AuthorBox({ dateModified }: { dateModified?: string }) {
  return (
    <aside className="mt-12 border border-white/10 bg-[#111] p-6 md:p-8 flex flex-col md:flex-row gap-6" aria-label="About the author">
      <img
        src="/images/shop-front-raptor_e24391f2.jpeg"
        alt="Skyline Customs shop in Chantilly, Virginia"
        loading="lazy"
        width={112}
        height={112}
        className="w-28 h-28 object-cover shrink-0 border border-white/10"
      />
      <div className="min-w-0">
        <p className="text-[#e85d04] text-xs font-semibold tracking-widest uppercase" style={{ fontFamily: "'Oswald', sans-serif" }}>Written by</p>
        <h3 className="text-white text-xl font-bold mt-1" style={{ fontFamily: "'Oswald', sans-serif" }}>The Skyline Customs Install Team</h3>
        <p className="text-white/60 text-sm leading-relaxed mt-3">
          Written and reviewed by the installers at Skyline Customs in Chantilly, VA, the paint protection division of Skyline Auto Body.
          We are {CERTIFICATIONS.map((c) => c.short).join(", ")} installers with 140+ five-star Google reviews, and everything in this
          article comes from work done in our own bay, not a manufacturer brochure.
        </p>
        <div className="flex flex-wrap gap-x-5 gap-y-2 mt-4 text-xs">
          {CERTIFICATIONS.map((c) => (
            <a key={c.name} href={c.url} target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-[#e85d04] transition-colors">{c.short} certified</a>
          ))}
          <Link href="/about" className="text-[#e85d04] underline underline-offset-2 decoration-1 hover:decoration-2">About the shop</Link>
          <Link href="/reviews" className="text-[#e85d04] underline underline-offset-2 decoration-1 hover:decoration-2">Read our reviews</Link>
          {dateModified && <span className="text-white/30">Last reviewed {dateModified}</span>}
        </div>
      </div>
    </aside>
  );
}
