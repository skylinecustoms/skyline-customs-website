/**
 * One line of real social proof under a price card: today's quote requests
 * and how long ago the last one came in. Renders nothing until there is at
 * least one request today, so it never shows an empty claim.
 */
import { trpc } from "@/lib/trpc";

function ago(min: number, es: boolean): string {
  if (min < 2) return es ? "hace un momento" : "just now";
  if (min < 60) return es ? `hace ${min} min` : `${min} min ago`;
  const h = Math.round(min / 60);
  return es ? `hace ${h} h` : `${h} h ago`;
}

export default function LeadPulse({ lang = "en", className = "" }: { lang?: "en" | "es"; className?: string }) {
  const { data } = trpc.contact.pulse.useQuery(undefined, { staleTime: 60 * 1000, refetchInterval: 5 * 60 * 1000 });
  if (!data || data.today < 1) return null;
  const es = lang === "es";
  const n = data.today;
  const requests = es ? (n === 1 ? "cotización pedida hoy" : "cotizaciones pedidas hoy") : (n === 1 ? "quote request today" : "quote requests today");
  return (
    <p className={`text-zinc-400 text-xs flex items-center justify-center gap-2 ${className}`} aria-live="polite">
      <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" /><span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" /></span>
      <span><span className="text-white font-semibold">{n}</span> {requests}{data.lastMinutesAgo !== null && <span> · {es ? "la última" : "last one"} {ago(data.lastMinutesAgo, es)}</span>}</span>
    </p>
  );
}
