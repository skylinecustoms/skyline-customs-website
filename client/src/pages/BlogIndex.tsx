/* ============================================================
   BLOG INDEX PAGE — Skyline Customs
   Design: High-Performance Editorial, dark/orange, Oswald headings
   ============================================================ */
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { blogPosts as staticPosts } from "@/lib/blogData";
import { useEffect, useMemo } from "react";
import SEO from "@/components/SEO";
import { trpc } from "@/lib/trpc";
import type { BlogSection } from "@/lib/blogData";

export default function BlogIndex() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { data: dbPosts } = trpc.blog.list.useQuery();

  // Merge: DB posts first (newest), then static posts (deduplicated by slug)
  const allPosts = useMemo(() => {
    const dbMapped = (dbPosts ?? []).map((p) => ({
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt,
      date: p.date,
      readTime: p.readTime,
      category: p.category,
      heroImage: p.heroImage,
      heroImageAlt: p.heroImageAlt,
      content: JSON.parse(p.content) as BlogSection[],
    }));
    const dbSlugs = new Set(dbMapped.map((p) => p.slug));
    const staticFiltered = staticPosts.filter((p) => !dbSlugs.has(p.slug));
    return [...dbMapped, ...staticFiltered];
  }, [dbPosts]);

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white">
      <SEO
        title="Auto Detailing Blog | Ceramic Coating, PPF & Window Tinting Tips"
        description="Expert guides on ceramic coating, PPF, and window tinting for Northern Virginia drivers. Tips, comparisons, and local insights from Skyline Customs."
        canonical="https://www.skylinecustomshop.com/blog"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Blog",
          "name": "Skyline Customs Blog",
          "description": "Expert guides on ceramic coating, PPF, and window tinting for Northern Virginia drivers.",
          "url": "https://www.skylinecustomshop.com/blog",
          "publisher": {
            "@type": "Organization",
            "name": "Skyline Customs",
            "url": "https://www.skylinecustomshop.com",
            "logo": {
              "@type": "ImageObject",
              "url": "https://www.skylinecustomshop.com/favicon-512.png"
            }
          }
        }}
      />
      <Navbar />

      {/* Hero */}
      <section className="relative h-[55vh] min-h-[380px] flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(/images/blog-index-hero-ZUEp4Ahr7aYNec9uWoyAqt.webp)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/60 to-transparent" />
        <div className="relative container mx-auto px-4 lg:px-8 pb-12">
          <div className="orange-rule mb-4">SKYLINE CUSTOMS</div>
          <h1
            className="text-5xl lg:text-7xl font-bold text-white leading-none"
            style={{ fontFamily: "'Oswald', sans-serif", textTransform: "uppercase" }}
          >
            THE BLOG
          </h1>
          <p className="text-white/60 mt-3 text-lg max-w-xl">
            Expert guides on ceramic coating, PPF, window tinting, and paint protection for Northern Virginia drivers.
          </p>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {allPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <article className="group bg-[#111] border border-white/10 hover:border-[#e85d04]/60 transition-all duration-300 cursor-pointer overflow-hidden">
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={post.heroImage}
                    alt={post.heroImageAlt}
                    title={post.heroImageAlt}
                    loading="lazy"
                    width={600}
                    height={224}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent opacity-60" />
                  <div className="absolute top-4 left-4">
                    <span
                      className="bg-[#e85d04] text-white text-xs font-bold tracking-widest uppercase px-3 py-1"
                      style={{ fontFamily: "'Oswald', sans-serif" }}
                    >
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-3 text-white/40 text-xs mb-3" style={{ fontFamily: "'Oswald', sans-serif", letterSpacing: "0.1em" }}>
                    <span>{post.date}</span>
                    <span className="w-1 h-1 rounded-full bg-[#e85d04]" />
                    <span>{post.readTime}</span>
                  </div>
                  <h2
                    className="text-xl font-bold text-white group-hover:text-[#e85d04] transition-colors duration-200 leading-tight mb-3"
                    style={{ fontFamily: "'Oswald', sans-serif", textTransform: "uppercase" }}
                  >
                    {post.title}
                  </h2>
                  <p className="text-white/55 text-sm leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="mt-5 flex items-center gap-2 text-[#e85d04] text-sm font-semibold tracking-wider uppercase" style={{ fontFamily: "'Oswald', sans-serif" }}>
                    Read Article
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="#e85d04" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* Coming Soon */}
        <div className="mt-12 border border-dashed border-white/20 p-8 text-center">
          <div className="orange-rule justify-center mb-3">COMING SOON</div>
          <p className="text-white/40 text-sm">
            New articles published every Monday and Thursday. Topics include window tinting, paint correction, PPF, and more.
          </p>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-[#e85d04] py-12">
        <div className="container mx-auto px-4 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3
              className="text-white text-2xl lg:text-3xl font-bold"
              style={{ fontFamily: "'Oswald', sans-serif", textTransform: "uppercase" }}
            >
              Ready to Protect Your Vehicle?
            </h3>
            <p className="text-white/80 mt-1 text-sm">
              Serving Fairfax, Herndon, Chantilly, Centreville & Northern Virginia
            </p>
          </div>
          <a
            href="https://www.skylinecustomshop.com/get-a-quote"
            className="bg-white text-[#e85d04] font-bold text-sm tracking-widest uppercase px-8 py-3 hover:bg-[#0d0d0d] hover:text-white transition-colors duration-200 whitespace-nowrap"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            GET A FREE QUOTE
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
