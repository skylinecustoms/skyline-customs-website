/**
 * SKYLINE CUSTOMS — Server-Side Meta Tag Injection
 *
 * Injects page-specific <title>, <meta name="description">, and <link rel="canonical">
 * into the HTML before it's sent to the browser/crawler.
 *
 * This ensures Google receives correct SEO data in raw HTML, not just after JS runs.
 */

import { getDb } from "../db";
import { blogPosts, promos } from "../../drizzle/schema";
import { blogPosts as staticBlogPosts } from "../../client/src/lib/blogData";
import { eq } from "drizzle-orm";

const BASE_URL = "https://www.skylinecustomshop.com";
const SITE_NAME = "Skyline Customs";

export interface PageMeta {
  title: string;
  description: string;
  canonical: string;
  /** Optional robots directive, e.g. "noindex, follow" for pages that should not be indexed. */
  robots?: string;
}

// Static meta map for all local landing pages and core pages
export const STATIC_META: Record<string, PageMeta> = {
  "/": {
    title: `${SITE_NAME} | PPF, Ceramic Coating & Window Tinting — Chantilly, VA`,
    description: "Northern Virginia's premier PPF, ceramic coating, window tinting shop. 500+ five-star reviews in Chantilly, VA. Free quotes.",
    canonical: `${BASE_URL}/`,
  },
  "/services": {
    title: `Services | PPF, Ceramic Coating, Window Tinting | ${SITE_NAME}`,
    description: "Explore Skyline Customs' full range of automotive protection services: PPF, ceramic coating, window tinting in Chantilly, VA.",
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
  "/reviews": {
    title: `Reviews | What Northern Virginia Drivers Say | ${SITE_NAME}`,
    description: "Real Google reviews of Skyline Customs in Chantilly, VA: 5.0-star rated for paint protection film, ceramic coating, and ceramic window tint.",
    canonical: `${BASE_URL}/reviews`,
  },
  "/faq": {
    title: `FAQ | PPF, Ceramic Coating & Window Tint Questions Answered | ${SITE_NAME}`,
    description: "Straight answers on paint protection film, ceramic coating, and window tinting in Chantilly, VA: pricing, how long each lasts, Virginia tint law, care, and warranties.",
    canonical: `${BASE_URL}/faq`,
  },
  "/tesla-ppf": {
    title: `Tesla PPF Northern Virginia | Model 3, Y, S, X & Cybertruck Paint Protection | ${SITE_NAME}`,
    description: "Tesla paint protection film in Chantilly, VA. Full front from $2,400 with self-healing STEK DYNOshield, computer-cut for Model 3, Y, S, X, and Cybertruck. 12-year warranty. Free quotes.",
    canonical: `${BASE_URL}/tesla-ppf`,
  },
  "/videos": {
    title: `Videos | Window Tint, PPF & Ceramic Coating Explained | ${SITE_NAME}`,
    description: "Short videos from Skyline Customs in Chantilly, VA: ceramic vs dyed tint, is PPF worth it, Virginia tint law, customer stories, and recent installs.",
    canonical: `${BASE_URL}/videos`,
  },
  "/gallery": {
    title: `Gallery | Recent Work | ${SITE_NAME}`,
    description: "See our recent PPF, ceramic coating, and window tinting work. Serving Northern Virginia from Chantilly, VA.",
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
    description: "Request a free quote for PPF, ceramic coating, window tinting from Skyline Customs in Chantilly, VA.",
    canonical: `${BASE_URL}/get-a-quote`,
  },
  "/service-areas": {
    title: `Service Areas | Northern Virginia | ${SITE_NAME}`,
    description: "Skyline Customs serves all of Northern Virginia including Chantilly, Herndon, Fairfax, Centreville, Reston, Vienna, McLean, and more.",
    canonical: `${BASE_URL}/service-areas`,
  },
  "/blog": {
    title: `Blog | Car Protection Tips & Guides | ${SITE_NAME}`,
    description: "Expert guides on PPF, ceramic coating, window tinting for Northern Virginia drivers. Tips from Skyline Customs in Chantilly, VA.",
    canonical: `${BASE_URL}/blog`,
  },
  "/pricing": {
    title: `Pricing | ${SITE_NAME}`,
    description: "Transparent pricing for PPF, ceramic coating, window tinting at Skyline Customs in Chantilly, VA.",
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
  "/ppf-sterling-va": {
    title: `PPF Sterling VA | Paint Protection Film Near Me | ${SITE_NAME}`,
    description: "Top-rated paint protection film installer serving Sterling, VA. Self-healing STEK PPF, rock chip protection, full-front or full-body coverage. Free quotes. 5.0 stars on Google.",
    canonical: `${BASE_URL}/ppf-sterling-va`,
  },
  "/ceramic-coating-sterling-va": {
    title: `Ceramic Coating Sterling VA | Car Ceramic Coating Near Me | ${SITE_NAME}`,
    description: "Professional ceramic coating for Sterling, VA drivers. Gtechniq graphene and SiO2 coatings with paint correction and 5–7 year protection. Free quotes.",
    canonical: `${BASE_URL}/ceramic-coating-sterling-va`,
  },
  "/window-tinting-sterling-va": {
    title: `Window Tinting Sterling VA | Car Tint Near Me | ${SITE_NAME}`,
    description: "Ceramic window tinting near Sterling, VA. GeoShield Pro Nano Ceramic film, 99% UV and up to 83% heat rejection, Virginia-legal shades, lifetime warranty. Free quotes.",
    canonical: `${BASE_URL}/window-tinting-sterling-va`,
  },
  "/ppf-ashburn-va": {
    title: `PPF Ashburn VA | Paint Protection Film Near Me | ${SITE_NAME}`,
    description: "Top-rated paint protection film installer serving Ashburn, VA. Self-healing STEK PPF, rock chip protection, full-front or full-body coverage. Free quotes. 5.0 stars on Google.",
    canonical: `${BASE_URL}/ppf-ashburn-va`,
  },
  "/ceramic-coating-ashburn-va": {
    title: `Ceramic Coating Ashburn VA | Car Ceramic Coating Near Me | ${SITE_NAME}`,
    description: "Professional ceramic coating for Ashburn, VA drivers. Gtechniq graphene and SiO2 coatings with paint correction and 5–7 year protection. Free quotes.",
    canonical: `${BASE_URL}/ceramic-coating-ashburn-va`,
  },
  "/window-tinting-ashburn-va": {
    title: `Window Tinting Ashburn VA | Car Tint Near Me | ${SITE_NAME}`,
    description: "Ceramic window tinting near Ashburn, VA. GeoShield Pro Nano Ceramic film, 99% UV and up to 83% heat rejection, Virginia-legal shades, lifetime warranty. Free quotes.",
    canonical: `${BASE_URL}/window-tinting-ashburn-va`,
  },
  "/ppf-oakton-va": {
    title: `PPF Oakton VA | Paint Protection Film Near Me | ${SITE_NAME}`,
    description: "Top-rated paint protection film installer serving Oakton, VA. Self-healing STEK PPF, rock chip protection, full-front or full-body coverage. Free quotes. 5.0 stars on Google.",
    canonical: `${BASE_URL}/ppf-oakton-va`,
  },
  "/ceramic-coating-oakton-va": {
    title: `Ceramic Coating Oakton VA | Car Ceramic Coating Near Me | ${SITE_NAME}`,
    description: "Professional ceramic coating for Oakton, VA drivers. Gtechniq graphene and SiO2 coatings with paint correction and 5–7 year protection. Free quotes.",
    canonical: `${BASE_URL}/ceramic-coating-oakton-va`,
  },
  "/window-tinting-oakton-va": {
    title: `Window Tinting Oakton VA | Car Tint Near Me | ${SITE_NAME}`,
    description: "Ceramic window tinting near Oakton, VA. GeoShield Pro Nano Ceramic film, 99% UV and up to 83% heat rejection, Virginia-legal shades, lifetime warranty. Free quotes.",
    canonical: `${BASE_URL}/window-tinting-oakton-va`,
  },
  "/ppf-burke-va": {
    title: `PPF Burke VA | Paint Protection Film Near Me | ${SITE_NAME}`,
    description: "Top-rated paint protection film installer serving Burke, VA. Self-healing STEK PPF, rock chip protection, full-front or full-body coverage. Free quotes. 5.0 stars on Google.",
    canonical: `${BASE_URL}/ppf-burke-va`,
  },
  "/ceramic-coating-burke-va": {
    title: `Ceramic Coating Burke VA | Car Ceramic Coating Near Me | ${SITE_NAME}`,
    description: "Professional ceramic coating for Burke, VA drivers. Gtechniq graphene and SiO2 coatings with paint correction and 5–7 year protection. Free quotes.",
    canonical: `${BASE_URL}/ceramic-coating-burke-va`,
  },
  "/window-tinting-burke-va": {
    title: `Window Tinting Burke VA | Car Tint Near Me | ${SITE_NAME}`,
    description: "Ceramic window tinting near Burke, VA. GeoShield Pro Nano Ceramic film, 99% UV and up to 83% heat rejection, Virginia-legal shades, lifetime warranty. Free quotes.",
    canonical: `${BASE_URL}/window-tinting-burke-va`,
  },
  "/ppf-gainesville-va": {
    title: `PPF Gainesville VA | Paint Protection Film Near Me | ${SITE_NAME}`,
    description: "Top-rated paint protection film installer serving Gainesville, VA. Self-healing STEK PPF, rock chip protection, full-front or full-body coverage. Free quotes. 5.0 stars on Google.",
    canonical: `${BASE_URL}/ppf-gainesville-va`,
  },
  "/ceramic-coating-gainesville-va": {
    title: `Ceramic Coating Gainesville VA | Car Ceramic Coating Near Me | ${SITE_NAME}`,
    description: "Professional ceramic coating for Gainesville, VA drivers. Gtechniq graphene and SiO2 coatings with paint correction and 5–7 year protection. Free quotes.",
    canonical: `${BASE_URL}/ceramic-coating-gainesville-va`,
  },
  "/window-tinting-gainesville-va": {
    title: `Window Tinting Gainesville VA | Car Tint Near Me | ${SITE_NAME}`,
    description: "Ceramic window tinting near Gainesville, VA. GeoShield Pro Nano Ceramic film, 99% UV and up to 83% heat rejection, Virginia-legal shades, lifetime warranty. Free quotes.",
    canonical: `${BASE_URL}/window-tinting-gainesville-va`,
  },
  "/ppf-leesburg-va": {
    title: `PPF Leesburg VA | Paint Protection Film Near Me | ${SITE_NAME}`,
    description: "Top-rated paint protection film installer serving Leesburg, VA. Self-healing STEK PPF, rock chip protection, full-front or full-body coverage. Free quotes. 5.0 stars on Google.",
    canonical: `${BASE_URL}/ppf-leesburg-va`,
  },
  "/ceramic-coating-leesburg-va": {
    title: `Ceramic Coating Leesburg VA | Car Ceramic Coating Near Me | ${SITE_NAME}`,
    description: "Professional ceramic coating for Leesburg, VA drivers. Gtechniq graphene and SiO2 coatings with paint correction and 5–7 year protection. Free quotes.",
    canonical: `${BASE_URL}/ceramic-coating-leesburg-va`,
  },
  "/window-tinting-leesburg-va": {
    title: `Window Tinting Leesburg VA | Car Tint Near Me | ${SITE_NAME}`,
    description: "Ceramic window tinting near Leesburg, VA. GeoShield Pro Nano Ceramic film, 99% UV and up to 83% heat rejection, Virginia-legal shades, lifetime warranty. Free quotes.",
    canonical: `${BASE_URL}/window-tinting-leesburg-va`,
  },
  "/privacy-policy": {
    title: `Privacy Policy | ${SITE_NAME}`,
    description: "How Skyline Customs collects, uses, and protects your information when you use our website or request a quote.",
    canonical: `${BASE_URL}/privacy-policy`,
  },
  "/terms-of-service": {
    title: `Terms of Service | ${SITE_NAME}`,
    description: "Terms and conditions for using the Skyline Customs website and services in Chantilly, VA.",
    canonical: `${BASE_URL}/terms-of-service`,
  },
  "/promo": {
    title: `This Month's Special | PPF & Ceramic Deals | ${SITE_NAME}`,
    description: "See this month's limited-slot special on paint protection film and ceramic coating at Skyline Customs in Chantilly, VA.",
    canonical: `${BASE_URL}/promo`,
  },
  "/thank-you": {
    title: `Thank You | ${SITE_NAME}`,
    description: "Thanks for contacting Skyline Customs. We'll be in touch shortly.",
    canonical: `${BASE_URL}/thank-you`,
    robots: "noindex, follow",
  },
  "/price-sheet": {
    title: `Price Sheet | ${SITE_NAME}`,
    description: "Internal price reference for Skyline Customs services.",
    canonical: `${BASE_URL}/price-sheet`,
    robots: "noindex, nofollow",
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
    description: "Northern Virginia's premier PPF, ceramic coating, window tinting shop. 500+ five-star reviews in Chantilly, VA.",
    canonical: `${BASE_URL}${cleanPath}`,
  };
}

/** Static routes that should appear in the sitemap (indexable, non-redirect). */
export const STATIC_PATHS: string[] = Object.keys(STATIC_META).filter(
  (p) => p !== "/pricing" && !STATIC_META[p].robots?.includes("noindex")
);

// Paths handled by client-side redirects or utility routes in App.tsx
const OTHER_KNOWN_PATHS = new Set([
  "/pricing", "/configure", "/contact-us", "/booking-page", "/home", "/404", "/privacy-policy-112467",
]);

/**
 * Whether a path maps to a real page. Used to send a true 404 status for
 * unknown URLs instead of a "soft 404" (200 + not-found content).
 */
export async function isKnownPath(urlPath: string): Promise<boolean> {
  const cleanPath = urlPath.split("?")[0].split("#")[0];
  if (STATIC_META[cleanPath] || OTHER_KNOWN_PATHS.has(cleanPath)) return true;

  const blogMatch = cleanPath.match(/^\/blog\/([a-z0-9-]+)$/);
  if (blogMatch) {
    const slug = blogMatch[1];
    if (staticBlogPosts.some((b) => b.slug === slug)) return true;
    try {
      const database = await getDb();
      if (!database) return true; // can't verify without a DB; don't risk a false 404
      const rows = await database.select({ id: blogPosts.id }).from(blogPosts).where(eq(blogPosts.slug, slug)).limit(1);
      return rows.length > 0;
    } catch {
      return true;
    }
  }

  // Archived promo pages: /june-special, /july-2026 ...
  const archived = cleanPath.match(/^\/([a-z]+-special|[a-z]+-\d{4})$/);
  if (archived) {
    try {
      const database = await getDb();
      if (!database) return true;
      const rows = await database.select({ id: promos.id }).from(promos).where(eq(promos.archivedSlug, archived[1])).limit(1);
      return rows.length > 0;
    } catch {
      return true;
    }
  }

  return false;
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

  // Replace robots directive when a page asks for one (e.g. noindex)
  if (meta.robots) {
    result = result.replace(
      /<meta\s+name="robots"\s+content="[^"]*"\s*\/?>/,
      `<meta name="robots" content="${escapeHtml(meta.robots)}" />`
    );
  }

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
