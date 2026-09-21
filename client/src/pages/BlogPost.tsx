/* ============================================================
   BLOG POST PAGE — Skyline Customs
   Design: High-Performance Editorial, dark/orange, Oswald headings
   ============================================================ */
import { useParams, Link } from "wouter";
import React, { useEffect, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO, { absoluteUrl } from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";
import AuthorBox from "@/components/AuthorBox";
import { getBlogPost, blogPosts as staticPosts, type BlogSection } from "@/lib/blogData";
import { trpc } from "@/lib/trpc";

/** Render inline [text](/path) links and **bold** inside blog text. Everything else stays plain text. */
/** "September 19, 2026" -> "2026-09-19" for schema.org dates; leaves other formats untouched. */
const isoDate = (d: string) => {
  const t = new Date(d);
  return isNaN(t.getTime()) ? d : t.toISOString().slice(0, 10);
};

function renderInline(text: string) {
  const parts: React.ReactNode[] = [];
  const re = /\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*/g;
  let last = 0; let m: RegExpExecArray | null; let k = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    if (m[1] !== undefined) {
      const href = m[2];
      parts.push(href.startsWith("/")
        ? <Link key={k++} href={href} className="text-[#e85d04] underline underline-offset-2 hover:text-white">{m[1]}</Link>
        : <a key={k++} href={href} target="_blank" rel="noopener noreferrer" className="text-[#e85d04] underline underline-offset-2 hover:text-white">{m[1]}</a>);
    } else {
      parts.push(<strong key={k++} className="text-white font-semibold">{m[3]}</strong>);
    }
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

function renderSection(section: BlogSection, idx: number) {
  switch (section.type) {
    case "h2":
      return (
        <h2 key={idx} className="blog-prose-h2">
          {section.content as string}
        </h2>
      );
    case "h3":
      return (
        <h3 key={idx} className="blog-prose-h3">
          {section.content as string}
        </h3>
      );
    case "p":
      return (
        <p key={idx} className="blog-prose-p">
          {renderInline(section.content as string)}
        </p>
      );
    case "blockquote":
      return (
        <blockquote key={idx} className="blog-prose-blockquote">
          {renderInline(section.content as string)}
        </blockquote>
      );
    case "ul":
      return (
        <ul key={idx} className="blog-prose-ul">
          {(section.content as string[]).map((item, i) => (
            <li key={i}>{renderInline(item)}</li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol key={idx} className="blog-prose-ol">
          {(section.content as string[]).map((item, i) => (
            <li key={i}>{renderInline(item)}</li>
          ))}
        </ol>
      );
    default:
      return null;
  }
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();

  // Try to get from DB first
  const { data: dbPost, isLoading } = trpc.blog.getBySlug.useQuery(
    { slug: slug || "" },
    { enabled: !!slug }
  );

  // Fall back to static post if not in DB
  const staticPost = getBlogPost(slug || "");

  const post = useMemo(() => {
    if (dbPost) {
      return {
        slug: dbPost.slug,
        title: dbPost.title,
        excerpt: dbPost.excerpt,
        date: dbPost.date,
        updated: undefined as string | undefined,
        readTime: dbPost.readTime,
        category: dbPost.category,
        heroImage: dbPost.heroImage,
        heroImageAlt: dbPost.heroImageAlt,
        content: JSON.parse(dbPost.content) as BlogSection[],
      };
    }
    return staticPost ?? null;
  }, [dbPost, staticPost]);

  // Related posts: database posts and static posts, same category first, so every
  // article links to others (crawlers follow these links to the newer posts).
  const { data: dbList } = trpc.blog.list.useQuery(undefined, { staleTime: 10 * 60 * 1000 });
  const relatedPosts = useMemo(() => {
    const all = [
      ...(dbList ?? []).map((p) => ({ slug: p.slug, title: p.title, excerpt: p.excerpt, date: p.date, category: p.category, heroImage: p.heroImage, heroImageAlt: p.heroImageAlt })),
      ...staticPosts.filter((p) => !(dbList ?? []).some((d) => d.slug === p.slug)),
    ].filter((p) => p.slug !== slug);
    const same = all.filter((p) => p.category === post?.category);
    const rest = all.filter((p) => p.category !== post?.category);
    return [...same, ...rest].slice(0, 3);
  }, [dbList, slug, post?.category]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Show loading state while DB is being checked (only if not in static data)
  if (isLoading && !staticPost) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] text-white flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-[#e85d04] border-t-transparent rounded-full animate-spin" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] text-white flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center flex-col gap-4 pt-20">
          <h1
            className="text-4xl font-bold text-white"
            style={{ fontFamily: "'Oswald', sans-serif", textTransform: "uppercase" }}
          >
            Post Not Found
          </h1>
          <Link href="/blog" className="text-[#e85d04] hover:underline">
            ← Back to Blog
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white">
      <SEO
        title={post.title}
        description={post.excerpt}
        canonical={`https://www.skylinecustomshop.com/blog/${post.slug}`}
        ogImage={post.heroImage}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": post.title,
          "description": post.excerpt,
          "image": {
            "@type": "ImageObject",
            "url": absoluteUrl(post.heroImage),
            "description": post.heroImageAlt
          },
          "datePublished": isoDate(post.date),
          "dateModified": isoDate(post.updated ?? post.date),
          "author": {
            "@type": "Organization",
            "name": "Skyline Customs",
            "alternateName": "The Skyline Customs Install Team",
            "url": "https://www.skylinecustomshop.com/about",
            "sameAs": ["https://www.instagram.com/skylinecustomshop", "https://www.youtube.com/@SkylineCustomsOfficial"]
          },
          "publisher": {
            "@type": "Organization",
            "name": "Skyline Customs",
            "url": "https://www.skylinecustomshop.com",
            "logo": {
              "@type": "ImageObject",
              "url": "https://www.skylinecustomshop.com/favicon-512.png"
            }
          },
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://www.skylinecustomshop.com/blog/${post.slug}`
          }
        }}
      />
      <Navbar />
      <main>

      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${post.heroImage})` }}
          role="img"
          aria-label={post.heroImageAlt}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/50 to-transparent" />
        <div className="relative container mx-auto px-4 lg:px-8 pb-12">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }, { label: post.title.length > 48 ? post.title.slice(0, 45) + "…" : post.title }]} className="text-white/60" />
          <Link href="/blog" className="inline-flex items-center gap-2 text-white/50 hover:text-[#e85d04] text-xs tracking-widest uppercase mb-4 transition-colors" style={{ fontFamily: "'Oswald', sans-serif" }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M11 7H3M6 3L2 7l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to Blog
          </Link>
          <div className="flex items-center gap-3 mb-3">
            <span
              className="bg-[#e85d04] text-white text-xs font-bold tracking-widest uppercase px-3 py-1"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              {post.category}
            </span>
          </div>
          <h1
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-4xl"
            style={{ fontFamily: "'Oswald', sans-serif", textTransform: "uppercase" }}
          >
            {post.title}
          </h1>
          <div className="flex items-center gap-3 mt-4 text-white/50 text-sm" style={{ fontFamily: "'Oswald', sans-serif", letterSpacing: "0.08em" }}>
            <span>{post.updated ? `Updated ${post.updated}` : post.date}</span>
            <span className="w-1 h-1 rounded-full bg-[#e85d04]" />
            <span>{post.readTime}</span>
          </div>
        </div>
      </section>

      {/* Content + Sidebar */}
      <div className="container mx-auto px-4 lg:px-8 py-14">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Article Body */}
          <article className="flex-1 min-w-0 max-w-3xl blog-prose">
            {post.content.map((section, idx) => renderSection(section, idx))}
          </article>

          {/* Sticky Sidebar */}
          <aside className="lg:w-72 flex-shrink-0">
            <div className="lg:sticky lg:top-24 space-y-6">
              {/* CTA Card */}
              <div className="bg-[#e85d04] p-6">
                <h3
                  className="text-white text-xl font-bold mb-2"
                  style={{ fontFamily: "'Oswald', sans-serif", textTransform: "uppercase" }}
                >
                  Protect Your Vehicle Today
                </h3>
                <p className="text-white/85 text-sm mb-5 leading-relaxed">
                  Get a free consultation from Northern Virginia's trusted auto protection specialists.
                </p>
                <a
                  href="https://www.skylinecustomshop.com/get-a-quote"
                  className="block bg-white text-[#e85d04] font-bold text-sm tracking-widest uppercase px-5 py-3 text-center hover:bg-[#0d0d0d] hover:text-white transition-colors duration-200"
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                >
                  GET A FREE QUOTE
                </a>
              </div>

              {/* Services */}
              <div className="bg-[#111] border border-white/10 p-6">
                <h4
                  className="text-white font-semibold text-sm tracking-widest uppercase mb-4"
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                >
                  Our Services
                </h4>
                <ul className="space-y-2">
                  {[
                    { label: "Ceramic Coating", href: "https://www.skylinecustomshop.com/services/ceramic-coating" },
                    { label: "Paint Protection Film", href: "https://www.skylinecustomshop.com/services/ppf" },
                    { label: "Window Tinting", href: "https://www.skylinecustomshop.com/services/window-tinting" },
                  ].map((s) => (
                    <li key={s.label}>
                      <a
                        href={s.href}
                        className="flex items-center gap-2 text-white/60 hover:text-[#e85d04] text-sm transition-colors duration-200"
                      >
                        <span className="w-1 h-1 rounded-full bg-[#e85d04] flex-shrink-0" />
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Service Areas */}
              <div className="bg-[#111] border border-white/10 p-6">
                <h4
                  className="text-white font-semibold text-sm tracking-widest uppercase mb-4"
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                >
                  Service Areas
                </h4>
                <div className="flex flex-wrap gap-2">
                  {["Fairfax", "Herndon", "Chantilly", "Centreville", "Reston", "McLean", "Vienna", "Tysons"].map((area) => (
                    <span
                      key={area}
                      className="text-xs text-white/50 border border-white/15 px-2 py-1"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Author / E-E-A-T */}
      <div className="container mx-auto px-4 lg:px-8 pb-6">
        <AuthorBox dateModified={post.updated ?? post.date} />
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="border-t border-white/10 py-14">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="orange-rule mb-6">MORE ARTICLES</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map((rp) => (
                <Link key={rp.slug} href={`/blog/${rp.slug}`}>
                  <article className="group flex gap-4 bg-[#111] border border-white/10 hover:border-[#e85d04]/50 transition-all duration-300 p-4 cursor-pointer">
                    <div className="w-24 h-20 flex-shrink-0 overflow-hidden">
                      <img
                        src={rp.heroImage}
                        alt={rp.heroImageAlt}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[#e85d04] text-xs font-semibold tracking-widest uppercase" style={{ fontFamily: "'Oswald', sans-serif" }}>
                        {rp.category}
                      </span>
                      <h3
                        className="text-white text-sm font-bold mt-1 group-hover:text-[#e85d04] transition-colors line-clamp-2 leading-snug"
                        style={{ fontFamily: "'Oswald', sans-serif", textTransform: "uppercase" }}
                      >
                        {rp.title}
                      </h3>
                      <span className="text-white/40 text-xs mt-1 block">{rp.date}</span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA */}
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

      </main>
      <Footer />
    </div>
  );
}
