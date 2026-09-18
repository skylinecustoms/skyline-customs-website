/**
 * SKYLINE CUSTOMS — Server-Side Meta Tag Injection
 *
 * Injects page-specific <title>, <meta name="description">, and <link rel="canonical">
 * into the HTML before it's sent to the browser/crawler.
 *
 * This ensures Google receives correct SEO data in raw HTML, not just after JS runs.
 */

import { getDb } from "../db";
import { blogPosts } from "../../drizzle/schema";
import { eq } from "drizzle-orm";

const BASE_URL = "https://www.skylinecustomshop.com";
const SITE_NAME = "Skyline Customs";

interface PageMeta {
  title: string;
  description: string;
  canonical: string;
}

// Static meta map for all local landing pages and core pages
const STATIC_META: Record<string, PageMeta> = {
  "/": {
    title: `${SITE_NAME} | PPF, Ceramic Coating & Window Tinting — Chantilly, VA`,
    description: "Northern Virginia's premier PPF, ceramic coating, window tinting & vinyl wrap shop. 500+ five-star reviews in Chantilly, VA. Free quotes.",
    canonical: `${BASE_URL}/`,
  },
  "/services": {
    title: `Services | PPF, Ceramic Coating, Window Tinting & Vinyl Wraps | ${SITE_NAME}`,
    description: "Explore Skyline Customs' full range of automotive protection services: PPF, ceramic coating, window tinting, and vinyl wraps in Chantilly, VA.",
    canonical: `${BASE_URL}/services`,
  },
  "/services/ppf": {
    title: `Paint Protection Film (PPF) | ${SITE_NAME}`,
    description: "Professional PPF installation in Chantilly, VA. STEK and XPEL films. Protect your car from rock chips, scratches, and road debris. Free quotes.",
    canonical: `${BASE_URL}/services/ppf`,
  },
  "/services/ceramic-coating": {
    title: `Ceramic Coating Services | ${SITE_NAME}`,
    description: "Professional ceramic coating in Chantilly, VA. Nano-ceramic protection, hydrophobic barrier, UV defense. 5.0 stars on Google. Free quotes.",
    canonical: `${BASE_URL}/services/ceramic-coating`,
  },
  "/services/window-tinting": {
    title: `Window Tinting Services | ${SITE_NAME}`,
    description: "Professional window tinting in Chantilly, VA. Ceramic, carbon, and dyed films. Virginia-legal tint. 5.0 stars on Google. Free quotes.",
    canonical: `${BASE_URL}/services/window-tinting`,
  },
  "/services/vinyl-wraps": {
    title: `Vinyl Wrap Services | ${SITE_NAME}`,
    description: "Professional vinyl wraps in Chantilly, VA. Color-change wraps, partial wraps, and commercial vehicle wraps. Free quotes.",
    canonical: `${BASE_URL}/services/vinyl-wraps`,
  },
  "/gallery": {
    title: `Gallery | Recent Work | ${SITE_NAME}`,
    description: "See our recent PPF, ceramic coating, window tinting, and vinyl wrap work. Serving Northern Virginia from Chantilly, VA.",
    canonical: `${BASE_URL}/gallery`,
  },
  "/about": {
    title: `About Us | ${SITE_NAME}`,
    description: "Learn about Skyline Customs — Northern Virginia's top-rated automotive protection shop in Chantilly, VA. 500+ five-star reviews.",
    canonical: `${BASE_URL}/about`,
  },
  "/contact": {
    title: `Contact Us | ${SITE_NAME}`,
    description: "Contact Skyline Customs in Chantilly, VA. Call (703) 775-4383 or get a free quote online. Serving all of Northern Virginia.",
    canonical: `${BASE_URL}/contact`,
  },
  "/get-a-quote": {
    title: `Get a Free Quote | ${SITE_NAME}`,
    description: "Request a free quote for PPF, ceramic coating, window tinting, or vinyl wraps from Skyline Customs in Chantilly, VA.",
    canonical: `${BASE_URL}/get-a-quote`,
  },
  "/service-areas": {
    title: `Service Areas | Northern Virginia | ${SITE_NAME}`,
    description: "Skyline Customs serves all of Northern Virginia including Chantilly, Herndon, Fairfax, Centreville, Reston, Vienna, McLean, and more.",
    canonical: `${BASE_URL}/service-areas`,
  },
  "/blog": {
    title: `Blog | Car Protection Tips & Guides | ${SITE_NAME}`,
    description: "Expert guides on PPF, ceramic coating, window tinting, and vinyl wraps for Northern Virginia drivers. Tips from Skyline Customs in Chantilly, VA.",
    canonical: `${BASE_URL}/blog`,
  },
  "/pricing": {
    title: `Pricing | ${SITE_NAME}`,
    description: "Transparent pricing for PPF, ceramic coating, window tinting, and vinyl wraps at Skyline Customs in Chantilly, VA.",
    canonical: `${BASE_URL}/pricing`,
  },
  // ===== CHANTILLY VA =====
  "/ppf-chantilly-va": {
    title: `PPF Chantilly VA | Paint Protection Film | ${SITE_NAME}`,
    description: "Expert PPF installation in Chantilly, VA. STEK and XPEL films protect your car from rock chips and road debris. 5.0 stars. Free quotes.",
    canonical: `${BASE_URL}/ppf-chantilly-va`,
  },
  "/ceramic-coating-chantilly-va": {
    title: `Ceramic Coating Chantilly VA | Car Detailing Near Me | ${SITE_NAME}`,
    description: "Professional ceramic coating in Chantilly, VA. Nano-ceramic protection, hydrophobic barrier, UV defense. 5.0 stars on Google. Free quotes.",
    canonical: `${BASE_URL}/ceramic-coating-chantilly-va`,
  },
  "/window-tinting-chantilly-va": {
    title: `Window Tinting Chantilly VA | Car Tinting Near Me | ${SITE_NAME}`,
    description: "Professional window tinting in Chantilly, VA. Ceramic, carbon, and dyed films. Virginia-legal tint. 5.0 stars on Google. Free quotes.",
    canonical: `${BASE_URL}/window-tinting-chantilly-va`,
  },
  "/vinyl-wraps-chantilly-va": {
    title: `Vinyl Wraps Chantilly VA | Car Wraps Near Me | ${SITE_NAME}`,
    description: "Professional vinyl wraps in Chantilly, VA. Color-change wraps, partial wraps. 5.0 stars on Google. Free quotes.",
    canonical: `${BASE_URL}/vinyl-wraps-chantilly-va`,
  },
  // ===== CENTREVILLE VA =====
  "/ppf-centreville-va": {
    title: `PPF Centreville VA | Paint Protection Film | ${SITE_NAME}`,
    description: "Expert PPF installation near Centreville, VA. STEK and XPEL films. Protect your car from rock chips and road debris. Free quotes.",
    canonical: `${BASE_URL}/ppf-centreville-va`,
  },
  "/ceramic-coating-centreville-va": {
    title: `Ceramic Coating Centreville VA | Car Detailing Near Me | ${SITE_NAME}`,
    description: "Professional ceramic coating near Centreville, VA. Nano-ceramic protection and showroom gloss. 5.0 stars on Google. Free quotes.",
    canonical: `${BASE_URL}/ceramic-coating-centreville-va`,
  },
  "/window-tinting-centreville-va": {
    title: `Window Tinting Centreville VA | Car Tinting Near Me | ${SITE_NAME}`,
    description: "Professional window tinting near Centreville, VA. Ceramic, carbon, and dyed films. Virginia-legal tint. Free quotes.",
    canonical: `${BASE_URL}/window-tinting-centreville-va`,
  },
  "/vinyl-wraps-centreville-va": {
    title: `Vinyl Wraps Centreville VA | Car Wraps Near Me | ${SITE_NAME}`,
    description: "Professional vinyl wraps near Centreville, VA. Color-change wraps and partial wraps. Free quotes.",
    canonical: `${BASE_URL}/vinyl-wraps-centreville-va`,
  },
  // ===== HERNDON VA =====
  "/ppf-herndon-va": {
    title: `PPF Herndon VA | Paint Protection Film | ${SITE_NAME}`,
    description: "Expert PPF installation near Herndon, VA. STEK and XPEL films protect your car from rock chips and road debris. Free quotes.",
    canonical: `${BASE_URL}/ppf-herndon-va`,
  },
  "/ceramic-coating-herndon-va": {
    title: `Ceramic Coating Herndon VA | Car Detailing Near Me | ${SITE_NAME}`,
    description: "Professional ceramic coating near Herndon, VA. Nano-ceramic protection, paint correction, and showroom gloss. 5.0 stars on Google. Free quotes.",
    canonical: `${BASE_URL}/ceramic-coating-herndon-va`,
  },
  "/window-tinting-herndon-va": {
    title: `Window Tinting Herndon VA | Car Tinting Near Me | ${SITE_NAME}`,
    description: "Professional window tinting near Herndon, VA. Ceramic, carbon, and dyed films. Virginia-legal tint. Free quotes.",
    canonical: `${BASE_URL}/window-tinting-herndon-va`,
  },
  "/vinyl-wraps-herndon-va": {
    title: `Vinyl Wraps Herndon VA | Car Wraps Near Me | ${SITE_NAME}`,
    description: "Professional vinyl wraps near Herndon, VA. Color-change wraps and partial wraps. Free quotes.",
    canonical: `${BASE_URL}/vinyl-wraps-herndon-va`,
  },
  // ===== FAIRFAX VA =====
  "/ppf-fairfax-va": {
    title: `PPF Fairfax VA | Paint Protection Film | ${SITE_NAME}`,
    description: "Expert PPF installation near Fairfax, VA. STEK and XPEL films. Protect your car from rock chips and road debris. Free quotes.",
    canonical: `${BASE_URL}/ppf-fairfax-va`,
  },
  "/ceramic-coating-fairfax-va": {
    title: `Ceramic Coating Fairfax VA | Car Detailing Near Me | ${SITE_NAME}`,
    description: "Professional ceramic coating near Fairfax, VA. Nano-ceramic protection and showroom gloss. 5.0 stars on Google. Free quotes.",
    canonical: `${BASE_URL}/ceramic-coating-fairfax-va`,
  },
  "/window-tinting-fairfax-va": {
    title: `Window Tinting Fairfax VA | Car Tinting Near Me | ${SITE_NAME}`,
    description: "Professional window tinting near Fairfax, VA. Ceramic, carbon, and dyed films. Virginia-legal tint. Free quotes.",
    canonical: `${BASE_URL}/window-tinting-fairfax-va`,
  },
  "/vinyl-wraps-fairfax-va": {
    title: `Vinyl Wraps Fairfax VA | Car Wraps Near Me | ${SITE_NAME}`,
    description: "Professional vinyl wraps near Fairfax, VA. Color-change wraps and partial wraps. Free quotes.",
    canonical: `${BASE_URL}/vinyl-wraps-fairfax-va`,
  },
  // ===== VIENNA VA =====
  "/ppf-vienna-va": {
    title: `PPF Vienna VA | Paint Protection Film | ${SITE_NAME}`,
    description: "Expert PPF installation near Vienna, VA. STEK and XPEL films. Protect your car from rock chips and road debris. Free quotes.",
    canonical: `${BASE_URL}/ppf-vienna-va`,
  },
  "/ceramic-coating-vienna-va": {
    title: `Ceramic Coating Vienna VA | Car Detailing Near Me | ${SITE_NAME}`,
    description: "Professional ceramic coating near Vienna, VA. Nano-ceramic protection and showroom gloss. 5.0 stars on Google. Free quotes.",
    canonical: `${BASE_URL}/ceramic-coating-vienna-va`,
  },
  "/window-tinting-vienna-va": {
    title: `Window Tinting Vienna VA | Car Tinting Near Me | ${SITE_NAME}`,
    description: "Professional window tinting near Vienna, VA. Ceramic, carbon, and dyed films. Virginia-legal tint. Free quotes.",
    canonical: `${BASE_URL}/window-tinting-vienna-va`,
  },
  "/vinyl-wraps-vienna-va": {
    title: `Vinyl Wraps Vienna VA | Car Wraps Near Me | ${SITE_NAME}`,
    description: "Professional vinyl wraps near Vienna, VA. Color-change wraps and partial wraps. Free quotes.",
    canonical: `${BASE_URL}/vinyl-wraps-vienna-va`,
  },
  // ===== RESTON VA =====
  "/ppf-reston-va": {
    title: `PPF Reston VA | Paint Protection Film | ${SITE_NAME}`,
    description: "Expert PPF installation near Reston, VA. STEK and XPEL films. Protect your car from rock chips and road debris. Free quotes.",
    canonical: `${BASE_URL}/ppf-reston-va`,
  },
  "/ceramic-coating-reston-va": {
    title: `Ceramic Coating Reston VA | Car Detailing Near Me | ${SITE_NAME}`,
    description: "Professional ceramic coating near Reston, VA. Nano-ceramic protection and showroom gloss. 5.0 stars on Google. Free quotes.",
    canonical: `${BASE_URL}/ceramic-coating-reston-va`,
  },
  "/window-tinting-reston-va": {
    title: `Window Tinting Reston VA | Car Tinting Near Me | ${SITE_NAME}`,
    description: "Professional window tinting near Reston, VA. Ceramic, carbon, and dyed films. Virginia-legal tint. Free quotes.",
    canonical: `${BASE_URL}/window-tinting-reston-va`,
  },
  "/vinyl-wraps-reston-va": {
    title: `Vinyl Wraps Reston VA | Car Wraps Near Me | ${SITE_NAME}`,
    description: "Professional vinyl wraps near Reston, VA. Color-change wraps and partial wraps. Free quotes.",
    canonical: `${BASE_URL}/vinyl-wraps-reston-va`,
  },
  // ===== MCLEAN VA =====
  "/ppf-mclean-va": {
    title: `PPF McLean VA | Paint Protection Film | ${SITE_NAME}`,
    description: "Expert PPF installation near McLean, VA. STEK and XPEL films. Protect your car from rock chips and road debris. Free quotes.",
    canonical: `${BASE_URL}/ppf-mclean-va`,
  },
  "/ceramic-coating-mclean-va": {
    title: `Ceramic Coating McLean VA | Car Detailing Near Me | ${SITE_NAME}`,
    description: "Professional ceramic coating near McLean, VA. Nano-ceramic protection and showroom gloss. 5.0 stars on Google. Free quotes.",
    canonical: `${BASE_URL}/ceramic-coating-mclean-va`,
  },
  "/window-tinting-mclean-va": {
    title: `Window Tinting McLean VA | Car Tinting Near Me | ${SITE_NAME}`,
    description: "Professional window tinting near McLean, VA. Ceramic, carbon, and dyed films. Virginia-legal tint. Free quotes.",
    canonical: `${BASE_URL}/window-tinting-mclean-va`,
  },
  "/vinyl-wraps-mclean-va": {
    title: `Vinyl Wraps McLean VA | Car Wraps Near Me | ${SITE_NAME}`,
    description: "Professional vinyl wraps near McLean, VA. Color-change wraps and partial wraps. Free quotes.",
    canonical: `${BASE_URL}/vinyl-wraps-mclean-va`,
  },
  // ===== TYSONS VA =====
  "/ppf-tysons-va": {
    title: `PPF Tysons VA | Paint Protection Film | ${SITE_NAME}`,
    description: "Expert PPF installation near Tysons, VA. STEK and XPEL films. Protect your car from rock chips and road debris. Free quotes.",
    canonical: `${BASE_URL}/ppf-tysons-va`,
  },
  "/ceramic-coating-tysons-va": {
    title: `Ceramic Coating Tysons VA | Car Detailing Near Me | ${SITE_NAME}`,
    description: "Professional ceramic coating near Tysons, VA. Nano-ceramic protection and showroom gloss. 5.0 stars on Google. Free quotes.",
    canonical: `${BASE_URL}/ceramic-coating-tysons-va`,
  },
  "/window-tinting-tysons-va": {
    title: `Window Tinting Tysons VA | Car Tinting Near Me | ${SITE_NAME}`,
    description: "Professional window tinting near Tysons, VA. Ceramic, carbon, and dyed films. Virginia-legal tint. Free quotes.",
    canonical: `${BASE_URL}/window-tinting-tysons-va`,
  },
  "/vinyl-wraps-tysons-va": {
    title: `Vinyl Wraps Tysons VA | Car Wraps Near Me | ${SITE_NAME}`,
    description: "Professional vinyl wraps near Tysons, VA. Color-change wraps and partial wraps. Free quotes.",
    canonical: `${BASE_URL}/vinyl-wraps-tysons-va`,
  },
  // ===== ALEXANDRIA VA =====
  "/ppf-alexandria-va": {
    title: `PPF Alexandria VA | Paint Protection Film | ${SITE_NAME}`,
    description: "Expert PPF installation near Alexandria, VA. STEK and XPEL films. Protect your car from rock chips and road debris. Free quotes.",
    canonical: `${BASE_URL}/ppf-alexandria-va`,
  },
  "/ceramic-coating-alexandria-va": {
    title: `Ceramic Coating Alexandria VA | Car Detailing Near Me | ${SITE_NAME}`,
    description: "Professional ceramic coating near Alexandria, VA. Nano-ceramic protection and showroom gloss. 5.0 stars on Google. Free quotes.",
    canonical: `${BASE_URL}/ceramic-coating-alexandria-va`,
  },
  "/window-tinting-alexandria-va": {
    title: `Window Tinting Alexandria VA | Car Tinting Near Me | ${SITE_NAME}`,
    description: "Professional window tinting near Alexandria, VA. Ceramic, carbon, and dyed films. Virginia-legal tint. Free quotes.",
    canonical: `${BASE_URL}/window-tinting-alexandria-va`,
  },
  "/vinyl-wraps-alexandria-va": {
    title: `Vinyl Wraps Alexandria VA | Car Wraps Near Me | ${SITE_NAME}`,
    description: "Professional vinyl wraps near Alexandria, VA. Color-change wraps and partial wraps. Free quotes.",
    canonical: `${BASE_URL}/vinyl-wraps-alexandria-va`,
  },
  // ===== ARLINGTON VA =====
  "/ppf-arlington-va": {
    title: `PPF Arlington VA | Paint Protection Film | ${SITE_NAME}`,
    description: "Expert PPF installation near Arlington, VA. STEK and XPEL films. Protect your car from rock chips and road debris. Free quotes.",
    canonical: `${BASE_URL}/ppf-arlington-va`,
  },
  "/ceramic-coating-arlington-va": {
    title: `Ceramic Coating Arlington VA | Car Detailing Near Me | ${SITE_NAME}`,
    description: "Professional ceramic coating near Arlington, VA. Nano-ceramic protection and showroom gloss. 5.0 stars on Google. Free quotes.",
    canonical: `${BASE_URL}/ceramic-coating-arlington-va`,
  },
  "/window-tinting-arlington-va": {
    title: `Window Tinting Arlington VA | Car Tinting Near Me | ${SITE_NAME}`,
    description: "Professional window tinting near Arlington, VA. Ceramic, carbon, and dyed films. Virginia-legal tint. Free quotes.",
    canonical: `${BASE_URL}/window-tinting-arlington-va`,
  },
  "/vinyl-wraps-arlington-va": {
    title: `Vinyl Wraps Arlington VA | Car Wraps Near Me | ${SITE_NAME}`,
    description: "Professional vinyl wraps near Arlington, VA. Color-change wraps and partial wraps. Free quotes.",
    canonical: `${BASE_URL}/vinyl-wraps-arlington-va`,
  },
  // ===== FALLS CHURCH VA =====
  "/ppf-falls-church-va": {
    title: `PPF Falls Church VA | Paint Protection Film | ${SITE_NAME}`,
    description: "Expert PPF installation near Falls Church, VA. STEK and XPEL films. Protect your car from rock chips and road debris. Free quotes.",
    canonical: `${BASE_URL}/ppf-falls-church-va`,
  },
  "/ceramic-coating-falls-church-va": {
    title: `Ceramic Coating Falls Church VA | Car Detailing Near Me | ${SITE_NAME}`,
    description: "Professional ceramic coating near Falls Church, VA. Nano-ceramic protection and showroom gloss. 5.0 stars on Google. Free quotes.",
    canonical: `${BASE_URL}/ceramic-coating-falls-church-va`,
  },
  "/window-tinting-falls-church-va": {
    title: `Window Tinting Falls Church VA | Car Tinting Near Me | ${SITE_NAME}`,
    description: "Professional window tinting near Falls Church, VA. Ceramic, carbon, and dyed films. Virginia-legal tint. Free quotes.",
    canonical: `${BASE_URL}/window-tinting-falls-church-va`,
  },
  "/vinyl-wraps-falls-church-va": {
    title: `Vinyl Wraps Falls Church VA | Car Wraps Near Me | ${SITE_NAME}`,
    description: "Professional vinyl wraps near Falls Church, VA. Color-change wraps and partial wraps. Free quotes.",
    canonical: `${BASE_URL}/vinyl-wraps-falls-church-va`,
  },
  // ===== SPRINGFIELD VA =====
  "/ppf-springfield-va": {
    title: `PPF Springfield VA | Paint Protection Film | ${SITE_NAME}`,
    description: "Expert PPF installation near Springfield, VA. STEK and XPEL films. Protect your car from rock chips and road debris. Free quotes.",
    canonical: `${BASE_URL}/ppf-springfield-va`,
  },
  "/ceramic-coating-springfield-va": {
    title: `Ceramic Coating Springfield VA | Car Detailing Near Me | ${SITE_NAME}`,
    description: "Professional ceramic coating near Springfield, VA. Nano-ceramic protection and showroom gloss. 5.0 stars on Google. Free quotes.",
    canonical: `${BASE_URL}/ceramic-coating-springfield-va`,
  },
  "/window-tinting-springfield-va": {
    title: `Window Tinting Springfield VA | Car Tinting Near Me | ${SITE_NAME}`,
    description: "Professional window tinting near Springfield, VA. Ceramic, carbon, and dyed films. Virginia-legal tint. Free quotes.",
    canonical: `${BASE_URL}/window-tinting-springfield-va`,
  },
  "/vinyl-wraps-springfield-va": {
    title: `Vinyl Wraps Springfield VA | Car Wraps Near Me | ${SITE_NAME}`,
    description: "Professional vinyl wraps near Springfield, VA. Color-change wraps and partial wraps. Free quotes.",
    canonical: `${BASE_URL}/vinyl-wraps-springfield-va`,
  },
  // ===== MANASSAS VA =====
  "/ppf-manassas-va": {
    title: `PPF Manassas VA | Paint Protection Film | ${SITE_NAME}`,
    description: "Expert PPF installation near Manassas, VA. STEK and XPEL films. Protect your car from rock chips and road debris. Free quotes.",
    canonical: `${BASE_URL}/ppf-manassas-va`,
  },
  "/ceramic-coating-manassas-va": {
    title: `Ceramic Coating Manassas VA | Car Detailing Near Me | ${SITE_NAME}`,
    description: "Professional ceramic coating near Manassas, VA. Nano-ceramic protection and showroom gloss. 5.0 stars on Google. Free quotes.",
    canonical: `${BASE_URL}/ceramic-coating-manassas-va`,
  },
  "/window-tinting-manassas-va": {
    title: `Window Tinting Manassas VA | Car Tinting Near Me | ${SITE_NAME}`,
    description: "Professional window tinting near Manassas, VA. Ceramic, carbon, and dyed films. Virginia-legal tint. Free quotes.",
    canonical: `${BASE_URL}/window-tinting-manassas-va`,
  },
  "/vinyl-wraps-manassas-va": {
    title: `Vinyl Wraps Manassas VA | Car Wraps Near Me | ${SITE_NAME}`,
    description: "Professional vinyl wraps near Manassas, VA. Color-change wraps and partial wraps. Free quotes.",
    canonical: `${BASE_URL}/vinyl-wraps-manassas-va`,
  },
  // ===== WOODBRIDGE VA =====
  "/ppf-woodbridge-va": {
    title: `PPF Woodbridge VA | Paint Protection Film | ${SITE_NAME}`,
    description: "Expert PPF installation near Woodbridge, VA. STEK and XPEL films. Protect your car from rock chips and road debris. Free quotes.",
    canonical: `${BASE_URL}/ppf-woodbridge-va`,
  },
  "/ceramic-coating-woodbridge-va": {
    title: `Ceramic Coating Woodbridge VA | Car Detailing Near Me | ${SITE_NAME}`,
    description: "Professional ceramic coating near Woodbridge, VA. Nano-ceramic protection and showroom gloss. 5.0 stars on Google. Free quotes.",
    canonical: `${BASE_URL}/ceramic-coating-woodbridge-va`,
  },
  "/window-tinting-woodbridge-va": {
    title: `Window Tinting Woodbridge VA | Car Tinting Near Me | ${SITE_NAME}`,
    description: "Professional window tinting near Woodbridge, VA. Ceramic, carbon, and dyed films. Virginia-legal tint. Free quotes.",
    canonical: `${BASE_URL}/window-tinting-woodbridge-va`,
  },
  "/vinyl-wraps-woodbridge-va": {
    title: `Vinyl Wraps Woodbridge VA | Car Wraps Near Me | ${SITE_NAME}`,
    description: "Professional vinyl wraps near Woodbridge, VA. Color-change wraps and partial wraps. Free quotes.",
    canonical: `${BASE_URL}/vinyl-wraps-woodbridge-va`,
  },
  // ===== STAFFORD VA =====
  "/ppf-stafford-va": {
    title: `PPF Stafford VA | Paint Protection Film | ${SITE_NAME}`,
    description: "Expert PPF installation near Stafford, VA. STEK and XPEL films. Protect your car from rock chips and road debris. Free quotes.",
    canonical: `${BASE_URL}/ppf-stafford-va`,
  },
  "/ceramic-coating-stafford-va": {
    title: `Ceramic Coating Stafford VA | Car Detailing Near Me | ${SITE_NAME}`,
    description: "Professional ceramic coating near Stafford, VA. Nano-ceramic protection and showroom gloss. 5.0 stars on Google. Free quotes.",
    canonical: `${BASE_URL}/ceramic-coating-stafford-va`,
  },
  "/window-tinting-stafford-va": {
    title: `Window Tinting Stafford VA | Car Tinting Near Me | ${SITE_NAME}`,
    description: "Professional window tinting near Stafford, VA. Ceramic, carbon, and dyed films. Virginia-legal tint. Free quotes.",
    canonical: `${BASE_URL}/window-tinting-stafford-va`,
  },
  "/vinyl-wraps-stafford-va": {
    title: `Vinyl Wraps Stafford VA | Car Wraps Near Me | ${SITE_NAME}`,
    description: "Professional vinyl wraps near Stafford, VA. Color-change wraps and partial wraps. Free quotes.",
    canonical: `${BASE_URL}/vinyl-wraps-stafford-va`,
  },
  // ===== FREDERICKSBURG VA =====
  "/ppf-fredericksburg-va": {
    title: `PPF Fredericksburg VA | Paint Protection Film | ${SITE_NAME}`,
    description: "Expert PPF installation near Fredericksburg, VA. STEK and XPEL films. Protect your car from rock chips and road debris. Free quotes.",
    canonical: `${BASE_URL}/ppf-fredericksburg-va`,
  },
  "/ceramic-coating-fredericksburg-va": {
    title: `Ceramic Coating Fredericksburg VA | Car Detailing Near Me | ${SITE_NAME}`,
    description: "Professional ceramic coating near Fredericksburg, VA. Nano-ceramic protection and showroom gloss. 5.0 stars on Google. Free quotes.",
    canonical: `${BASE_URL}/ceramic-coating-fredericksburg-va`,
  },
  "/window-tinting-fredericksburg-va": {
    title: `Window Tinting Fredericksburg VA | Car Tinting Near Me | ${SITE_NAME}`,
    description: "Professional window tinting near Fredericksburg, VA. Ceramic, carbon, and dyed films. Virginia-legal tint. Free quotes.",
    canonical: `${BASE_URL}/window-tinting-fredericksburg-va`,
  },
  "/vinyl-wraps-fredericksburg-va": {
    title: `Vinyl Wraps Fredericksburg VA | Car Wraps Near Me | ${SITE_NAME}`,
    description: "Professional vinyl wraps near Fredericksburg, VA. Color-change wraps and partial wraps. Free quotes.",
    canonical: `${BASE_URL}/vinyl-wraps-fredericksburg-va`,
  },
};

/**
 * Resolves meta tags for a given URL path.
 * For blog posts, fetches title/description from the database.
 */
export async function resolveMetaForPath(urlPath: string): Promise<PageMeta> {
  // Strip query string
  const cleanPath = urlPath.split("?")[0].split("#")[0];

  // Check static map first
  if (STATIC_META[cleanPath]) {
    return STATIC_META[cleanPath];
  }

  // Handle blog post pages: /blog/:slug
  const blogMatch = cleanPath.match(/^\/blog\/([a-z0-9-]+)$/);
  if (blogMatch) {
    const slug = blogMatch[1];
    try {
      const database = await getDb();
      if (!database) throw new Error('No DB');
      const posts = await database
        .select({
          title: blogPosts.title,
          excerpt: blogPosts.excerpt,
          heroImage: blogPosts.heroImage,
        })
        .from(blogPosts)
        .where(eq(blogPosts.slug, slug))
        .limit(1);

      if (posts.length > 0) {
        const post = posts[0];
        return {
          title: `${post.title} | ${SITE_NAME}`,
          description: post.excerpt ?? `Read this article from Skyline Customs in Chantilly, VA.`,
          canonical: `${BASE_URL}/blog/${slug}`,
        };
      }
    } catch (e) {
      // Fall through to default
    }
  }

  // Default fallback
  return {
    title: `${SITE_NAME} | PPF, Ceramic Coating & Window Tinting — Chantilly, VA`,
    description: "Northern Virginia's premier PPF, ceramic coating, window tinting & vinyl wrap shop. 500+ five-star reviews in Chantilly, VA.",
    canonical: `${BASE_URL}${cleanPath}`,
  };
}

/**
 * Injects SSR meta tags into the HTML string.
 * Replaces the static title, canonical, and description in index.html
 * with page-specific values before sending to the browser.
 */
export function injectMetaIntoHtml(html: string, meta: PageMeta): string {
  let result = html;

  // Replace <title>
  result = result.replace(
    /<title>[^<]*<\/title>/,
    `<title>${escapeHtml(meta.title)}</title>`
  );

  // Replace <meta name="description">
  result = result.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${escapeHtml(meta.description)}" />`
  );

  // Replace <link rel="canonical">
  result = result.replace(
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/,
    `<link rel="canonical" href="${escapeHtml(meta.canonical)}" />`
  );

  // Replace og:title
  result = result.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:title" content="${escapeHtml(meta.title)}" />`
  );

  // Replace og:description
  result = result.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:description" content="${escapeHtml(meta.description)}" />`
  );

  // Replace og:url
  result = result.replace(
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:url" content="${escapeHtml(meta.canonical)}" />`
  );

  // Replace twitter:title
  result = result.replace(
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/,
    `<meta name="twitter:title" content="${escapeHtml(meta.title)}" />`
  );

  // Replace twitter:description
  result = result.replace(
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="twitter:description" content="${escapeHtml(meta.description)}" />`
  );

  return result;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
