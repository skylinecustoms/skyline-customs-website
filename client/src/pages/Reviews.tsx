/**
 * SKYLINE CUSTOMS — Reviews page
 * URL: /reviews
 */

import { Link } from "wouter";
import { ArrowRight, Star, Quote, ExternalLink, PenLine } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";
import { ALL_REVIEWS } from "@/components/Testimonials";
import { GOOGLE_MAPS_URL, GOOGLE_REVIEW_URL } from "@/lib/social";
import { trpc } from "@/lib/trpc";

const COLORS = ["#7C3AED", "#0891B2", "#D97706", "#DB2777", "#16A34A", "#2563EB"];
const initialsOf = (n: string) => n.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();

export default function Reviews() {
  const { data: live } = trpc.site.googleReviews.useQuery(undefined, { staleTime: 60 * 60 * 1000 });
  const liveReviews = (live?.reviews ?? []).map((r, i) => ({ name: r.author, initials: initialsOf(r.author), avatarColor: COLORS[i % COLORS.length], rating: r.rating, date: r.when, service: "Google review", text: r.text }));
  const staticNames = new Set(liveReviews.map((r) => r.name));
  const reviews = [...liveReviews, ...ALL_REVIEWS.filter((r) => !staticNames.has(r.name))];
  const total = live?.total ? `${live.total} Google reviews` : "140+ Google reviews";
  const rating = live?.rating ? live.rating.toFixed(1) : "5.0";
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-['DM_Sans',sans-serif]">
      <SEO
        title="Reviews | What Northern Virginia Drivers Say About Skyline Customs"
        description="Read real Google reviews of Skyline Customs in Chantilly, VA: 5.0-star rated for paint protection film, ceramic coating, and ceramic window tint. Then leave your own."
        canonical="https://www.skylinecustomshop.com/reviews"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.skylinecustomshop.com/" },
              { "@type": "ListItem", "position": 2, "name": "Reviews", "item": "https://www.skylinecustomshop.com/reviews" },
            ],
          },
        ]}
      />
      <Navbar />

      <section className="relative pt-32 pb-14 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0A] via-[#111] to-[#0a0d0a]" />
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10" style={{ background: "radial-gradient(ellipse at top right, #E85D04, transparent 70%)" }} />
        <div className="container relative z-10">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Reviews" }]} />
          <div className="flex items-center gap-2 mb-4">
            <div className="flex">{[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-[#E85D04] text-[#E85D04]" />)}</div>
            <span className="text-white font-bold">{rating} on Google</span>
            <span className="text-zinc-500 text-sm">· {total}</span>
          </div>
          <h1 className="font-['Bebas_Neue',sans-serif] text-6xl md:text-8xl leading-none text-white mb-4">
            DON'T TAKE<br /><span className="text-[#E85D04]">OUR WORD FOR IT</span>
          </h1>
          <p className="text-zinc-300 text-lg max-w-2xl leading-relaxed mb-8">
            Real Google reviews from Northern Virginia drivers who trusted us with their paint, glass, and clear coat. Every one is public on our Google Business Profile.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href={GOOGLE_REVIEW_URL} target="_blank" rel="noopener noreferrer" className="bg-[#E85D04] hover:bg-[#d14e00] text-black font-bold tracking-widest uppercase px-8 py-4 inline-flex items-center gap-2 transition-colors">
              <PenLine className="w-4 h-4" /> Write a Review
            </a>
            <a href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer" className="border border-zinc-600 hover:border-[#E85D04] text-zinc-300 hover:text-white font-bold tracking-widest uppercase px-8 py-4 inline-flex items-center gap-2 transition-colors">
              Read All on Google <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      <div className="h-1 bg-[#E85D04]" />

      <section className="py-20 bg-[#0D0D0D]">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-800">
            {reviews.map((r) => (
              <article key={`${r.name}-${r.date}`} className="bg-[#0D0D0D] p-8 flex flex-col">
                <Quote className="w-6 h-6 text-[#E85D04] mb-4" />
                <div className="flex mb-3">{[...Array(r.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-[#E85D04] text-[#E85D04]" />)}</div>
                <p className="text-zinc-300 text-sm leading-relaxed flex-1">"{r.text}"</p>
                <div className="mt-6 flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${r.avatarColor}`}>{r.initials}</div>
                  <div>
                    <p className="text-white text-sm font-semibold">{r.name}</p>
                    <p className="text-zinc-500 text-xs">{r.service} · Google · {r.date}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <p className="text-zinc-500 text-sm mt-8 text-center">
            Showing a selection of recent reviews. <a href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer" className="text-[#E85D04] hover:underline">See every review on Google</a>.
          </p>
        </div>
      </section>

      <section className="py-20 bg-[#E85D04]">
        <div className="container max-w-3xl text-center">
          <h2 className="font-['Bebas_Neue',sans-serif] text-5xl md:text-6xl text-white mb-4">READY TO JOIN THEM?</h2>
          <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">Get a free quote and see why Chantilly drivers keep coming back.</p>
          <Link href="/get-a-quote" className="bg-white hover:bg-zinc-100 text-[#E85D04] font-bold tracking-widest uppercase px-10 py-4 inline-flex items-center gap-2 transition-colors">
            GET MY FREE QUOTE <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
