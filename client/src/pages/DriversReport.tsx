import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Link } from "wouter";
import report from "@/data/driversReport.json";

// /northern-virginia-car-protection-report: what Northern Virginia drivers who asked us for a quote want
// protected, on which cars, and how soon. Original data other sites and AI answers can quote. Every number
// comes from client/src/data/driversReport.json (scripts/drivers-report.mjs, from GoHighLevel, totals only).

const URL = "https://www.skylinecustomshop.com/northern-virginia-car-protection-report";
const YEAR = report.updated.slice(0, 4);
const monthName = (ym: string) => new Date(`${ym}-15T12:00:00Z`).toLocaleString("en-US", { month: "long", timeZone: "UTC" });
const fmt = (n: number) => n.toLocaleString("en-US");
const pct = (n: number, of: number) => Math.round((n / of) * 100);
const TITLE = `Northern Virginia Car Protection Report ${YEAR}`;
const DESCRIPTION = `What ${fmt(report.leads)} Northern Virginia drivers asked to protect, on which cars, and how soon: real quote data from Skyline Customs in Chantilly, VA.`;

// Model pages for the makes people ask about most.
const MODEL_LINKS: [string, string][] = [
  ["/tesla-model-y-ppf", "Tesla Model Y"], ["/bmw-x5-ppf", "BMW X5"], ["/toyota-rav4-ppf", "Toyota RAV4"], ["/honda-pilot-ppf", "Honda Pilot"],
  ["/mercedes-gle-ppf", "Mercedes GLE"], ["/lexus-rx-ppf", "Lexus RX"], ["/jeep-wrangler-ppf", "Jeep Wrangler"], ["/ford-f-150-ppf", "Ford F-150"],
];

// One series per chart, one colour, the number written beside each bar; the rows are the table.
function Bars({ rows, of, label }: { rows: { name: string; n: number }[]; of: number; label: string }) {
  const max = Math.max(...rows.map((r) => r.n));
  return (
    <table className="w-full my-6 text-sm">
      <thead>
        <tr className="text-left text-[11px] uppercase tracking-[0.15em] text-[oklch(0.55_0.008_285)]">
          <th className="py-2 font-normal w-[38%]">{label}</th><th className="py-2 font-normal">Quote requests</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.name} className="border-t border-[oklch(0.20_0.006_285)]">
            <td className="py-3 pr-3 text-[oklch(0.85_0.008_85)]">{r.name}</td>
            <td className="py-3">
              <div className="flex items-center gap-3">
                <div className="h-2.5 flex-1 max-w-[380px] rounded-full bg-[oklch(0.18_0.005_285)] overflow-hidden">
                  <div className="h-full rounded-full bg-brand-orange" style={{ width: `${Math.max(2, Math.round((r.n / max) * 100))}%` }} />
                </div>
                <span className="w-24 text-right tabular-nums text-[oklch(0.85_0.008_85)]">{fmt(r.n)} <span className="text-[oklch(0.55_0.008_285)]">({pct(r.n, of)}%)</span></span>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const H2 = "font-display text-3xl md:text-4xl text-[oklch(0.96_0.008_85)] tracking-wide mt-14 mb-3";

export default function DriversReport() {
  const s = report.services, m = report.makes, t = report.timing;
  const soon = t.counts.filter((c) => ["This week", "As soon as possible"].includes(c.name)).reduce((a, c) => a + c.n, 0);
  const top3 = m.top.slice(0, 3).map((x) => x.name);
  return (
    <div className="min-h-screen bg-[oklch(0.10_0.005_285)]">
      <SEO
        title={TITLE}
        description={DESCRIPTION}
        canonical={URL}
        jsonLd={[
          { "@context": "https://schema.org", "@type": "Article", headline: TITLE, description: DESCRIPTION, datePublished: "2026-10-23", dateModified: report.updated,
            author: { "@type": "Organization", name: "Skyline Customs" }, mainEntityOfPage: URL },
          { "@context": "https://schema.org", "@type": "Dataset", name: `Skyline Customs quote requests, ${monthName(report.since)} ${report.since.slice(0, 4)} to ${monthName(report.updated.slice(0, 7))} ${YEAR}`,
            description: DESCRIPTION, creator: { "@type": "Organization", name: "Skyline Customs" }, spatialCoverage: "Northern Virginia",
            temporalCoverage: `${report.since}/${report.updated.slice(0, 7)}`, isAccessibleForFree: true, license: "https://creativecommons.org/licenses/by/4.0/",
            variableMeasured: ["Service requested", "Car make", "When the driver wants the work done"] },
        ]}
      />
      <Navbar />

      <section className="pt-32 pb-12">
        <div className="container max-w-4xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-[2px] w-12 bg-brand-orange" />
            <span className="font-mono-brand text-xs text-brand-orange uppercase tracking-[0.2em]">Original data</span>
          </div>
          <h1 className="font-display text-5xl md:text-7xl text-[oklch(0.96_0.008_85)] leading-none mb-6">
            NORTHERN VIRGINIA<br /><span className="text-brand-orange">CAR PROTECTION REPORT {YEAR}</span>
          </h1>
          <p className="text-[oklch(0.75_0.008_285)] text-lg leading-relaxed max-w-2xl">
            What {fmt(report.leads)} drivers who asked us for a quote since {monthName(report.since)} {report.since.slice(0, 4)} wanted protected, on which cars, and how soon. Real numbers from our shop in {report.place}.
          </p>
        </div>
      </section>

      <div className="h-[2px] bg-brand-orange" />

      <section className="py-14">
        <div className="container max-w-4xl text-[oklch(0.70_0.008_85)] leading-relaxed">
          <h2 className={H2}>THE SHORT VERSION</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong className="text-white">Window tint and paint protection film are asked for almost equally</strong>: {fmt(s.counts.find((c) => c.name === "Window tint")?.n ?? 0)} and {fmt(s.counts.find((c) => c.name === "Paint protection film")?.n ?? 0)} requests. Ceramic coating is a smaller, often add-on, request.</li>
            <li><strong className="text-white">The most common cars are everyday ones</strong>: {top3.join(", ")} lead the list, not just luxury and sports cars.</li>
            {t.answered > 0 && <li><strong className="text-white">{pct(soon, t.answered)}% want it done this week or as soon as possible</strong>, which is why we answer quote requests in seconds.</li>}
          </ul>

          <h2 className={H2}>WHAT DRIVERS WANT PROTECTED</h2>
          <p>The service each quote request was about ({fmt(s.answered)} requests; some ask for more than one).</p>
          <Bars rows={s.counts} of={s.answered} label="Service" />
          <p className="text-sm">
            More on each: <Link href="/services/ppf" className="text-brand-orange underline underline-offset-2">paint protection film</Link>,{" "}
            <Link href="/services/window-tinting" className="text-brand-orange underline underline-offset-2">window tint</Link>,{" "}
            <Link href="/services/ceramic-coating" className="text-brand-orange underline underline-offset-2">ceramic coating</Link>.
          </p>

          <h2 className={H2}>THE CARS</h2>
          <p>The top {m.top.length} makes among the {fmt(m.answered)} requests that named their car.</p>
          <Bars rows={m.top} of={m.answered} label="Make" />
          <p className="text-sm">
            Popular model pages:{" "}
            {MODEL_LINKS.map(([href, name], i) => (
              <span key={href}>{i ? ", " : ""}<Link href={href} className="text-brand-orange underline underline-offset-2">{name}</Link></span>
            ))}.
          </p>

          {t.answered > 0 && (
            <>
              <h2 className={H2}>HOW SOON THEY WANT IT</h2>
              <p>What drivers told us when we asked about timing ({fmt(t.answered)} answers).</p>
              <Bars rows={t.counts} of={t.answered} label="Timing" />
            </>
          )}

          <h2 className={H2}>WHERE THE NUMBERS COME FROM</h2>
          <ul className="list-disc pl-5 space-y-2 text-sm">
            <li>Every quote request to Skyline Customs since {monthName(report.since)} {report.since.slice(0, 4)}, from our CRM (GoHighLevel). Spam, tests, suppliers and installers asking for work are taken out.</li>
            <li>Service comes from the request itself; the car from what the driver typed; timing from their answer to our question.</li>
            <li>Totals only: no names or contact details are shared. Updated {report.updated}.</li>
          </ul>

          <h2 className={H2}>USING THIS DATA</h2>
          <p>You're welcome to quote these numbers. Please credit "Skyline Customs, Northern Virginia Car Protection Report {YEAR}" and link to this page.</p>

          <div className="mt-10">
            <Link href="/get-a-quote" className="cta inline-flex items-center gap-3 bg-brand-orange text-black font-display text-lg tracking-widest px-8 py-4 hover:bg-orange-600 transition-colors">
              GET A FREE QUOTE
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
