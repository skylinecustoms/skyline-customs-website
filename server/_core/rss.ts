/**
 * RSS 2.0 feed of published blog posts at /rss.xml. Feed readers aside, Google
 * and Bing both use feeds to discover new URLs quickly, and the <link
 * rel="alternate"> in index.html points crawlers here.
 */
import { getAllBlogPosts } from "../db";

const BASE_URL = "https://www.skylinecustomshop.com";
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

type Block = { type: string; content: string | string[] };

/** Markdown links and bold to HTML; everything else escaped. */
function inline(text: string): string {
  return esc(text)
    .replace(/\[([^\]]+)\]\((\/[^)]+)\)/g, (_m, t, href) => `<a href="${BASE_URL}${href}">${t}</a>`)
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
}

function blocksToHtml(raw: string): string {
  let blocks: Block[] = [];
  try { blocks = JSON.parse(raw); } catch { return ""; }
  return blocks.map((b) => {
    if (Array.isArray(b.content)) {
      const tag = b.type === "ol" ? "ol" : "ul";
      return `<${tag}>${b.content.map((li) => `<li>${inline(li)}</li>`).join("")}</${tag}>`;
    }
    const tag = ["h2", "h3", "blockquote"].includes(b.type) ? b.type : "p";
    return `<${tag}>${inline(b.content)}</${tag}>`;
  }).join("\n");
}

export async function buildRssFeed(): Promise<string> {
  const posts = await getAllBlogPosts();
  const items = posts.map((p) => {
    const url = `${BASE_URL}/blog/${p.slug}`;
    const published = Number.isNaN(Date.parse(p.date)) ? new Date(p.createdAt) : new Date(p.date);
    const image = p.heroImage.startsWith("http") ? p.heroImage : `${BASE_URL}${p.heroImage}`;
    return `    <item>
      <title>${esc(p.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${published.toUTCString()}</pubDate>
      <category>${esc(p.category)}</category>
      <description>${esc(p.excerpt)}</description>
      <enclosure url="${esc(image)}" type="${image.endsWith(".webp") ? "image/webp" : "image/jpeg"}" length="0" />
      <content:encoded><![CDATA[<img src="${image}" alt="${esc(p.heroImageAlt)}" />\n${blocksToHtml(p.content)}]]></content:encoded>
    </item>`;
  });
  const lastBuild = posts[0] ? new Date(posts[0].updatedAt).toUTCString() : new Date().toUTCString();
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Skyline Customs Blog</title>
    <link>${BASE_URL}/blog</link>
    <atom:link href="${BASE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    <description>Paint protection film, ceramic coating, and window tint answers for Northern Virginia, Maryland, and DC drivers, from the installers at Skyline Customs in Chantilly, VA.</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
    <image>
      <url>${BASE_URL}/favicon-512.png</url>
      <title>Skyline Customs Blog</title>
      <link>${BASE_URL}/blog</link>
    </image>
${items.join("\n")}
  </channel>
</rss>
`;
}
