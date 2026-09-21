import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import { withJobSlugs } from "@shared/galleryJobs";
import { responsiveImage } from "@/lib/responsiveImage";

// ─── Static non-PPF photos (only real confirmed jobs) ───────────────────────
const STATIC_ITEMS = [
  {
    id: "s1",
    category: "Window Tinting",
    image: "/images/tint_1_fa203376.webp",
    alt: "Window tinting on a Cadillac Lyriq EV at Skyline Custom Shop in Chantilly, VA",
    vehicle: "Cadillac Lyriq EV",
    service: "Window Tinting",
  },
  {
    id: "s2",
    category: "Window Tinting",
    image: "/images/tint_2_9df4da50.webp",
    alt: "Window tinting on a BMW X6 at Skyline Custom Shop in Chantilly, VA",
    vehicle: "BMW X6",
    service: "Window Tinting",
  },
];

const CATEGORIES = ["All", "PPF", "Window Tinting", "Ceramic Coating"];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const { data: dbPhotos = [], isLoading } = trpc.site.gallery.useQuery();

  // Convert DB photos to the same shape as static items
  const dbItems = withJobSlugs(dbPhotos).map((p) => ({
    id: `db-${p.id}`,
    category: p.category,
    image: p.photoUrl,
    alt: p.alt,
    vehicle: p.car,
    service: p.services.join(" + "),
    href: `/gallery/${p.slug}` as string | undefined,
  }));

  // Merge: DB photos first (PPF promo shots), then static non-PPF photos
  const allItems = [
    ...dbItems,
    ...STATIC_ITEMS.filter((s) => !dbItems.some((d) => d.image === s.image)).map((s) => ({ ...s, href: undefined as string | undefined })),
  ];

  const filtered =
    activeCategory === "All"
      ? allItems
      : allItems.filter((item) => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-[oklch(0.10_0.005_285)]">
      <SEO
        title="Gallery | Real PPF, Window Tinting & Ceramic Coating Work | Skyline Custom Shop"
        description="Browse Skyline Customs' portfolio of real PPF, window tinting, and ceramic coating jobs on luxury and performance vehicles in Chantilly, VA and Northern Virginia."
        canonical="https://www.skylinecustomshop.com/gallery"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "ImageGallery",
          "name": "Skyline Custom Shop Gallery",
          "description": "Real PPF, window tinting, and ceramic coating work by Skyline Custom Shop in Chantilly, VA",
          "url": "https://www.skylinecustomshop.com/gallery",
          "provider": {
            "@type": "LocalBusiness",
            "name": "Skyline Custom Shop",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "4215 Walney Rd",
              "addressLocality": "Chantilly",
              "addressRegion": "VA"
            }
          }
        }}
      />
      <Navbar />

      {/* Page Header */}
      <section className="pt-32 pb-16">
        <div className="container">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-[2px] w-12 bg-brand-orange" />
            <span className="font-mono-brand text-xs text-brand-orange uppercase tracking-[0.2em]">
              Our Work
            </span>
          </div>
          <h1 className="font-display text-6xl md:text-8xl text-[oklch(0.96_0.008_85)] leading-none mb-6">
            THE<br />
            <span className="text-brand-orange">GALLERY</span>
          </h1>
          <p className="text-[oklch(0.66_0.01_285)] text-lg max-w-2xl">
            Real jobs. Real results. Browse our recent work across PPF, window tinting, and ceramic coating — all performed at our Chantilly, VA shop.
          </p>
        </div>
      </section>

      {/* Filter */}
      <section className="pb-12">
        <div className="container">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`font-display text-sm tracking-widest px-5 py-2 transition-colors ${
                  activeCategory === cat
                    ? "bg-brand-orange text-[oklch(0.10_0.005_285)]"
                    : "border border-[oklch(0.25_0.006_285)] text-[oklch(0.66_0.01_285)] hover:border-brand-orange hover:text-brand-orange"
                }`}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="pb-24">
        <div className="container">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-[oklch(0.20_0.006_285)]">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="bg-[oklch(0.10_0.005_285)] h-64 animate-pulse" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-[oklch(0.66_0.01_285)] text-lg">No photos in this category yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-[oklch(0.20_0.006_285)]">
              {filtered.map((item) => {
                const cardClass = "group relative block overflow-hidden bg-[oklch(0.10_0.005_285)]";
                const inner = (
                  <>
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={item.image}
                      srcSet={responsiveImage(item.image).srcSet}
                      sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      alt={item.alt}
                      title={`${item.service} on ${item.vehicle} | Skyline Custom Shop – Chantilly, VA`}
                      loading="lazy"
                      width="600"
                      height="400"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.08_0.005_285/0.9)] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <p className="font-mono-brand text-xs text-brand-orange uppercase tracking-widest mb-1">
                        {item.category}
                      </p>
                      <p className="font-display text-lg text-[oklch(0.96_0.008_85)]">
                        {item.vehicle}
                      </p>
                      <p className="text-[oklch(0.65_0.008_85)] text-xs">{item.service}</p>
                    </div>
                  </div>
                  <div className="p-4 border-t border-[oklch(0.20_0.006_285)]">
                    <p className="font-display text-base text-[oklch(0.96_0.008_85)] tracking-wider">
                      {item.vehicle}
                    </p>
                    <div className="flex items-center justify-between mt-1">
                      <p className="font-mono-brand text-xs text-[oklch(0.66_0.008_285)]">
                        {item.service}
                      </p>
                      <span className="font-mono-brand text-xs text-brand-orange">
                        {item.href ? "View job →" : "Chantilly, VA"}
                      </span>
                    </div>
                  </div>
                  </>
                );
                return item.href ? (
                  <Link key={item.id} href={item.href} aria-label={`${item.vehicle}: ${item.service} in Chantilly, VA`} className={cardClass}>{inner}</Link>
                ) : (
                  <div key={item.id} className={cardClass}>{inner}</div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Instagram CTA */}
      <section className="py-16 bg-[oklch(0.12_0.005_285)]">
        <div className="container text-center">
          <p className="section-number mb-3 text-center">Follow Our Work</p>
          <h2 className="font-display text-4xl md:text-5xl text-[oklch(0.96_0.008_85)] mb-4">
            SEE MORE ON <span className="text-brand-orange">INSTAGRAM</span>
          </h2>
          <p className="text-[oklch(0.66_0.01_285)] mb-8">
            We post new work daily. Follow us for the latest builds, transformations, and behind-the-scenes content from our Chantilly, VA shop.
          </p>
          <a
            href="https://www.instagram.com/skylinecustomshop/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-brand-orange text-[oklch(0.10_0.005_285)] font-display text-sm tracking-widest px-8 py-4 hover:bg-[oklch(0.72_0.21_40)] transition-colors"
          >
            @SKYLINECUSTOMSHOP
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
