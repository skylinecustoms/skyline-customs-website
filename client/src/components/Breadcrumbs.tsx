import { Link } from "wouter";

export interface Crumb { label: string; href?: string }

/** Visible breadcrumb trail. Pair with BreadcrumbList JSON-LD in the page's SEO props. */
export default function Breadcrumbs({ items, className = "" }: { items: Crumb[]; className?: string }) {
  return (
    <nav aria-label="Breadcrumb" className={`flex flex-wrap items-center gap-2 text-xs text-zinc-500 mb-4 ${className}`}>
      {items.map((c, i) => (
        <span key={`${c.label}-${i}`} className="flex items-center gap-2">
          {i > 0 && <span aria-hidden="true">/</span>}
          {c.href ? <Link href={c.href} className="hover:text-white transition-colors">{c.label}</Link> : <span className="text-zinc-300">{c.label}</span>}
        </span>
      ))}
    </nav>
  );
}
