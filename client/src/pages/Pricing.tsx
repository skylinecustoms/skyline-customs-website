import { useEffect } from "react";
import { Link } from "wouter";
import { Check, Phone, ArrowRight, Star, Shield, Zap } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export default function Pricing() {
  // Quote buttons on pricing page navigate to the quote form

  useEffect(() => {
    if (window.fbq) {
      window.fbq("track", "ViewContent", {
        content_name: "Pricing Page",
        content_category: "Pricing",
      });
    }
  }, []);

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Auto Protection Pricing | Skyline Customs — Chantilly VA",
    description:
      "Full pricing for PPF, ceramic coating, window tinting, and vinyl wraps in Chantilly VA. Transparent pricing for sedans, SUVs, and trucks. Bundle packages available.",
    url: "https://www.skylinecustomshop.com/pricing",
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.skylinecustomshop.com/" },
        { "@type": "ListItem", position: 2, name: "Pricing", item: "https://www.skylinecustomshop.com/pricing" },
      ],
    },
  };

  return (
    <div className="min-h-screen bg-[oklch(0.10_0.005_285)]">
      <SEO
        title="Auto Protection Pricing | PPF, Ceramic, Tint & Wraps — Chantilly VA"
        description="Transparent pricing for PPF, ceramic coating, window tinting, and vinyl wraps in Chantilly VA. Sedan, SUV, and truck pricing. Bundle packages available. Serving all of Northern Virginia."
        canonical="https://www.skylinecustomshop.com/pricing"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-16 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-[oklch(0.75_0.18_40)] text-sm font-semibold tracking-widest uppercase mb-4">
            Transparent Pricing
          </p>
          <h1 className="text-5xl md:text-6xl font-black text-white uppercase leading-none mb-6">
            No Surprises.<br />
            <span className="text-[oklch(0.75_0.18_40)]">Just Results.</span>
          </h1>
          <p className="text-[oklch(0.75_0.005_285)] text-lg max-w-2xl mx-auto mb-8">
            All prices listed below are our standard rates. Every vehicle is inspected in person before work begins — final pricing may vary based on paint condition, vehicle size, and coverage selected.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/get-a-quote"
              className="bg-[oklch(0.65_0.22_40)] hover:bg-[oklch(0.60_0.22_40)] text-white font-bold px-8 py-4 uppercase tracking-widest text-sm transition-colors"
            >
              Get a Free Quote
            </Link>
            <a
              href="tel:7037754383"
              className="border border-[oklch(0.35_0.005_285)] text-white hover:border-[oklch(0.75_0.18_40)] font-bold px-8 py-4 uppercase tracking-widest text-sm transition-colors flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              (703) 775-4383
            </a>
          </div>
        </div>
      </section>

      {/* Discounts Banner */}
      <section className="py-4 bg-[oklch(0.65_0.22_40)]">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-white font-bold text-sm tracking-wide uppercase">
            Military &amp; Law Enforcement: 5% Discount on All Services &nbsp;|&nbsp; Bundle Packages: Save Up to $450+ &nbsp;|&nbsp; All Work Backed by Our Installation Workmanship Guarantee
          </p>
        </div>
      </section>

      {/* PPF Pricing */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 bg-[oklch(0.65_0.22_40)] flex items-center justify-center font-black text-white text-lg">01</div>
            <div>
              <h2 className="text-3xl font-black text-white uppercase">Paint Protection Film</h2>
              <p className="text-[oklch(0.55_0.005_285)] text-sm">Hexis Body Fence — 12-Year Manufacturer Warranty</p>
            </div>
          </div>

          {/* PPF Table */}
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[oklch(0.25_0.005_285)]">
                  <th className="text-left py-3 px-4 text-[oklch(0.55_0.005_285)] font-semibold uppercase tracking-wider">Package</th>
                  <th className="text-center py-3 px-4 text-[oklch(0.55_0.005_285)] font-semibold uppercase tracking-wider">Sedan</th>
                  <th className="text-center py-3 px-4 text-[oklch(0.55_0.005_285)] font-semibold uppercase tracking-wider">SUV / Crossover</th>
                  <th className="text-center py-3 px-4 text-[oklch(0.55_0.005_285)] font-semibold uppercase tracking-wider">Truck</th>
                  <th className="text-left py-3 px-4 text-[oklch(0.55_0.005_285)] font-semibold uppercase tracking-wider">Coverage</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { pkg: "Full Front", sedan: "$2,400", suv: "$2,400", truck: "$2,400", note: "Bumper, hood, fenders, mirrors, headlights, A-pillars", popular: true },
                  { pkg: "Partial Front", sedan: "$1,800", suv: "$1,800", truck: "$1,800", note: "Bumper + partial hood (18in) — budget-friendly" },
                  { pkg: "Full Vehicle Wrap", sedan: "$4,500", suv: "$5,500", truck: "$6,000", note: "Complete paint protection" },
                  { pkg: "Rocker Panels (pair)", sedan: "$400", suv: "$450", truck: "$500", note: "High-impact zone" },
                  { pkg: "Door Edge Guards + Cups", sedan: "$200", suv: "$200", truck: "$250", note: "Common chip points" },
                  { pkg: "Rear Bumper / Trunk Ledge", sedan: "$250", suv: "$300", truck: "$350", note: "Cargo loading protection" },
                  { pkg: "Bed Area / Tailgate", sedan: "—", suv: "—", truck: "$400", note: "Truck-specific coverage" },
                ].map((row, i) => (
                  <tr key={i} className={`border-b border-[oklch(0.18_0.005_285)] ${row.popular ? "bg-[oklch(0.14_0.01_285)]" : ""}`}>
                    <td className="py-4 px-4 text-white font-medium">
                      {row.pkg}
                      {row.popular && (
                        <span className="ml-2 text-[oklch(0.75_0.18_40)] text-xs font-bold uppercase">Most Popular</span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-center text-[oklch(0.75_0.18_40)] font-bold">{row.sedan}</td>
                    <td className="py-4 px-4 text-center text-[oklch(0.75_0.18_40)] font-bold">{row.suv}</td>
                    <td className="py-4 px-4 text-center text-[oklch(0.75_0.18_40)] font-bold">{row.truck}</td>
                    <td className="py-4 px-4 text-[oklch(0.55_0.005_285)] text-xs">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[oklch(0.45_0.005_285)] text-xs mb-6">12-year Hexis manufacturer warranty (yellowing, bubbling, cracking, peeling). All prices subject to in-person inspection.</p>
          <Link href="/get-a-quote?service=ppf" className="text-[oklch(0.75_0.18_40)] font-bold text-sm uppercase tracking-wider hover:underline flex items-center gap-2">
            Get a PPF Quote <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Ceramic Coating Pricing */}
      <section className="py-20 px-4 bg-[oklch(0.12_0.005_285)]">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 bg-[oklch(0.65_0.22_40)] flex items-center justify-center font-black text-white text-lg">02</div>
            <div>
              <h2 className="text-3xl font-black text-white uppercase">Ceramic Coating</h2>
              <p className="text-[oklch(0.55_0.005_285)] text-sm">Gtechniq Crystal Serum Light + Exo — 5 or 7-Year Warranty</p>
            </div>
          </div>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[oklch(0.25_0.005_285)]">
                  <th className="text-left py-3 px-4 text-[oklch(0.55_0.005_285)] font-semibold uppercase tracking-wider">Package</th>
                  <th className="text-center py-3 px-4 text-[oklch(0.55_0.005_285)] font-semibold uppercase tracking-wider">Sedan</th>
                  <th className="text-center py-3 px-4 text-[oklch(0.55_0.005_285)] font-semibold uppercase tracking-wider">SUV / Crossover</th>
                  <th className="text-center py-3 px-4 text-[oklch(0.55_0.005_285)] font-semibold uppercase tracking-wider">Truck</th>
                  <th className="text-left py-3 px-4 text-[oklch(0.55_0.005_285)] font-semibold uppercase tracking-wider">Warranty / Correction</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { pkg: "Ceramic (No Correction)", sedan: "$800", suv: "$900", truck: "$950", note: "7-Year — new/like-new paint only" },
                  { pkg: "Paint Correction Only (Stage 2)", sedan: "$450", suv: "$600", truck: "$700", note: "Standalone — no coating applied" },
                  { pkg: "Crystal Package ★", sedan: "$1,300", suv: "$1,500", truck: "$1,600", note: "5-Year + Stage 2 Correction — Save $100", popular: true },
                  { pkg: "Ultimate Coating ★", sedan: "$1,500", suv: "$1,800", truck: "$1,900", note: "7-Year + Stage 3 Correction — Save $100" },
                ].map((row, i) => (
                  <tr key={i} className={`border-b border-[oklch(0.18_0.005_285)] ${row.popular ? "bg-[oklch(0.14_0.01_285)]" : ""}`}>
                    <td className="py-4 px-4 text-white font-medium">
                      {row.pkg}
                      {row.popular && (
                        <span className="ml-2 text-[oklch(0.75_0.18_40)] text-xs font-bold uppercase">Bundle — Save $100</span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-center text-[oklch(0.75_0.18_40)] font-bold">{row.sedan}</td>
                    <td className="py-4 px-4 text-center text-[oklch(0.75_0.18_40)] font-bold">{row.suv}</td>
                    <td className="py-4 px-4 text-center text-[oklch(0.75_0.18_40)] font-bold">{row.truck}</td>
                    <td className="py-4 px-4 text-[oklch(0.55_0.005_285)] text-xs">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[oklch(0.45_0.005_285)] text-xs mb-6">Bundle packages save vs buying correction + coating separately. All prices subject to in-person inspection.</p>
          <Link href="/get-a-quote?service=ceramic" className="text-[oklch(0.75_0.18_40)] font-bold text-sm uppercase tracking-wider hover:underline flex items-center gap-2">
            Get a Ceramic Quote <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Window Tint Pricing */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 bg-[oklch(0.65_0.22_40)] flex items-center justify-center font-black text-white text-lg">03</div>
            <div>
              <h2 className="text-3xl font-black text-white uppercase">Window Tinting</h2>
              <p className="text-[oklch(0.55_0.005_285)] text-sm">GeoShield Pro Nano Ceramic — Nationwide Lifetime Warranty</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Main packages */}
            <div>
              <h3 className="text-white font-bold uppercase tracking-wider text-sm mb-4 border-b border-[oklch(0.25_0.005_285)] pb-2">Packages — Same Price All Vehicle Types</h3>
              <div className="space-y-3">
                {[
                  { pkg: "Full Car (All Windows)", price: "$575", note: "Windshield + all sides + rear" },
                  { pkg: "Front Package", price: "$450", note: "Front Windshield + 4 side windows" },
                  { pkg: "Rear Package", price: "$425", note: "Rear windshield + 4 side windows", popular: true },
                  { pkg: "Frontseat Package", price: "$350", note: "Front 2 side windows and front windshield" },
                  { pkg: "Backseat Package", price: "$325", note: "Rear 2 side windows and rear windshield" },
                  { pkg: "Base (4 Windows)", price: "$280", note: "4 side windows, no windshield/rear" },
                  { pkg: "Windshield Only", price: "$200", note: "" },
                  { pkg: "Rear Glass Only", price: "$150", note: "" },
                ].map((row, i) => (
                  <div key={i} className={`flex items-center justify-between py-3 px-4 border-b border-[oklch(0.18_0.005_285)] ${row.popular ? "bg-[oklch(0.14_0.01_285)]" : ""}`}>
                    <div>
                      <span className="text-white font-medium text-sm">{row.pkg}</span>
                      {row.popular && <span className="ml-2 text-[oklch(0.75_0.18_40)] text-xs font-bold uppercase">Most Popular</span>}
                      {row.note && <p className="text-[oklch(0.45_0.005_285)] text-xs mt-0.5">{row.note}</p>}
                    </div>
                    <span className="text-[oklch(0.75_0.18_40)] font-bold text-lg ml-4 shrink-0">{row.price}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Add-ons + GeoShield benefits */}
            <div>
              <h3 className="text-white font-bold uppercase tracking-wider text-sm mb-4 border-b border-[oklch(0.25_0.005_285)] pb-2">Add-Ons</h3>
              <div className="space-y-3 mb-8">
                <div className="flex items-center justify-between py-3 px-4 border-b border-[oklch(0.18_0.005_285)]">
                  <div>
                    <span className="text-white font-medium text-sm">Panoramic / Sunroof</span>
                    <p className="text-[oklch(0.45_0.005_285)] text-xs mt-0.5">Additional glass panel</p>
                  </div>
                  <span className="text-[oklch(0.75_0.18_40)] font-bold text-lg ml-4 shrink-0">$120</span>
                </div>
              </div>

              <h3 className="text-white font-bold uppercase tracking-wider text-sm mb-4 border-b border-[oklch(0.25_0.005_285)] pb-2">The GeoShield Difference</h3>
              <div className="space-y-3">
                {[
                  "70% Total Heat Rejection — significantly cooler interior",
                  "Crystal Clear Optical Clarity — zero haze or electronic interference",
                  "Pro Nano-Ceramic Tech — maximum infrared blocking",
                  "EV & Eco Friendly — reduces AC usage by 20%",
                  "Nationwide Lifetime Warranty on all packages",
                ].map((benefit, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-[oklch(0.75_0.18_40)] shrink-0 mt-0.5" />
                    <span className="text-[oklch(0.65_0.005_285)] text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <Link href="/get-a-quote?service=tint" className="text-[oklch(0.75_0.18_40)] font-bold text-sm uppercase tracking-wider hover:underline flex items-center gap-2">
            Get a Tint Quote <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Vinyl Wraps Pricing */}
      <section className="py-20 px-4 bg-[oklch(0.12_0.005_285)]">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 bg-[oklch(0.65_0.22_40)] flex items-center justify-center font-black text-white text-lg">04</div>
            <div>
              <h2 className="text-3xl font-black text-white uppercase">Vinyl Wraps &amp; Chrome Delete</h2>
              <p className="text-[oklch(0.55_0.005_285)] text-sm">Standard gloss/matte/satin finishes — specialty finishes priced as upcharges</p>
            </div>
          </div>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[oklch(0.25_0.005_285)]">
                  <th className="text-left py-3 px-4 text-[oklch(0.55_0.005_285)] font-semibold uppercase tracking-wider">Service</th>
                  <th className="text-center py-3 px-4 text-[oklch(0.55_0.005_285)] font-semibold uppercase tracking-wider">Sedan</th>
                  <th className="text-center py-3 px-4 text-[oklch(0.55_0.005_285)] font-semibold uppercase tracking-wider">SUV / Crossover</th>
                  <th className="text-center py-3 px-4 text-[oklch(0.55_0.005_285)] font-semibold uppercase tracking-wider">Truck</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { pkg: "Full Color Change Wrap", sedan: "$3,000", suv: "$4,000", truck: "$4,500", popular: true },
                  { pkg: "Hood Wrap", sedan: "$400", suv: "$500", truck: "$550" },
                  { pkg: "Roof Wrap", sedan: "$400", suv: "$500", truck: "$500" },
                  { pkg: "Trunk / Hatch Wrap", sedan: "$350", suv: "$400", truck: "$450 (Tailgate)" },
                  { pkg: "Mirror Caps (pair)", sedan: "$150", suv: "$150", truck: "$150" },
                  { pkg: "Roof + Hood + Mirrors Combo", sedan: "$850", suv: "$1,050", truck: "$1,100" },
                  { pkg: "Full Chrome Delete", sedan: "$600", suv: "$800", truck: "$1,000" },
                  { pkg: "Partial Chrome Delete (window trim)", sedan: "$300", suv: "$400", truck: "$500" },
                ].map((row, i) => (
                  <tr key={i} className={`border-b border-[oklch(0.18_0.005_285)] ${row.popular ? "bg-[oklch(0.14_0.01_285)]" : ""}`}>
                    <td className="py-4 px-4 text-white font-medium">
                      {row.pkg}
                      {row.popular && <span className="ml-2 text-[oklch(0.75_0.18_40)] text-xs font-bold uppercase">Most Popular</span>}
                    </td>
                    <td className="py-4 px-4 text-center text-[oklch(0.75_0.18_40)] font-bold">{row.sedan}</td>
                    <td className="py-4 px-4 text-center text-[oklch(0.75_0.18_40)] font-bold">{row.suv}</td>
                    <td className="py-4 px-4 text-center text-[oklch(0.75_0.18_40)] font-bold">{row.truck}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Specialty Finishes */}
          <div className="border border-[oklch(0.25_0.005_285)] p-6 mb-6">
            <h3 className="text-white font-bold uppercase tracking-wider text-sm mb-4">Specialty Finish Upcharges</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { finish: "Metallic / Satin Finish", price: "+$500–$800" },
                { finish: "Color Shift / Chameleon", price: "+$1,500–$2,500" },
                { finish: "Chrome Finish", price: "+$2,500–$4,000" },
                { finish: "Carbon Fiber Accents (per panel)", price: "+$200–$500" },
              ].map((row, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-[oklch(0.18_0.005_285)]">
                  <span className="text-[oklch(0.65_0.005_285)] text-sm">{row.finish}</span>
                  <span className="text-[oklch(0.75_0.18_40)] font-bold text-sm ml-4">{row.price}</span>
                </div>
              ))}
            </div>
          </div>
          <p className="text-[oklch(0.45_0.005_285)] text-xs mb-6">Wrap longevity: 5–7 years with proper care. All prices subject to in-person inspection.</p>
          <Link href="/get-a-quote?service=wrap" className="text-[oklch(0.75_0.18_40)] font-bold text-sm uppercase tracking-wider hover:underline flex items-center gap-2">
            Get a Wrap Quote <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Bundle Packages */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[oklch(0.75_0.18_40)] text-sm font-semibold tracking-widest uppercase mb-3">Save More</p>
            <h2 className="text-4xl font-black text-white uppercase mb-4">Bundle Packages</h2>
            <p className="text-[oklch(0.55_0.005_285)] max-w-xl mx-auto">Combine services and save. Bundle savings are per vehicle type. Military/LE 5% discount applies on top of bundle pricing.</p>
          </div>

          {/* Sedan Bundles */}
          <div className="mb-12">
            <h3 className="text-[oklch(0.55_0.005_285)] font-bold uppercase tracking-widest text-xs mb-6 border-b border-[oklch(0.25_0.005_285)] pb-3">Sedans</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { name: "Full Front PPF + Ceramic (No Correction)", price: "$3,300", savings: "Save $150", includes: "Full front PPF + ceramic coating" },
                { name: "Full Front PPF + GeoShield Full Car Tint", price: "$3,000", savings: "Save $75", includes: "Full front PPF + premium tint" },
                { name: "Full Front PPF + Ceramic + GeoShield Tint", price: "$3,750", savings: "Save $200", includes: "Most popular combo", popular: true },
                { name: "Ceramic (No Correction) + GeoShield Tint", price: "$1,425", savings: "Save $100", includes: "Ceramic + premium full car tint" },
                { name: "Full Vehicle PPF + Ceramic (No Correction)", price: "$6,500", savings: "Save $450 + FREE Tint", includes: "Full wrap + ceramic + tint included FREE", best: true },
                { name: "Full Vehicle PPF + GeoShield Full Car Tint", price: "$6,200", savings: "Save $375", includes: "Full wrap + premium tint" },
              ].map((bundle, i) => (
                <div key={i} className={`border p-6 relative ${bundle.best ? "border-[oklch(0.75_0.18_40)] bg-[oklch(0.13_0.01_285)]" : bundle.popular ? "border-[oklch(0.45_0.10_40)] bg-[oklch(0.12_0.005_285)]" : "border-[oklch(0.22_0.005_285)]"}`}>
                  {bundle.best && (
                    <div className="absolute -top-3 left-4 bg-[oklch(0.65_0.22_40)] text-white text-xs font-bold uppercase px-3 py-1 flex items-center gap-1">
                      <Star className="w-3 h-3" /> Best Value
                    </div>
                  )}
                  {bundle.popular && !bundle.best && (
                    <div className="absolute -top-3 left-4 bg-[oklch(0.45_0.10_40)] text-white text-xs font-bold uppercase px-3 py-1">
                      Most Popular
                    </div>
                  )}
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h4 className="text-white font-bold text-sm leading-tight">{bundle.name}</h4>
                    <div className="text-right shrink-0">
                      <div className="text-[oklch(0.75_0.18_40)] font-black text-xl">{bundle.price}</div>
                      <div className="text-[oklch(0.65_0.22_40)] text-xs font-bold">{bundle.savings}</div>
                    </div>
                  </div>
                  <p className="text-[oklch(0.50_0.005_285)] text-xs">{bundle.includes}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Truck Bundles */}
          <div className="mb-10">
            <h3 className="text-[oklch(0.55_0.005_285)] font-bold uppercase tracking-widest text-xs mb-6 border-b border-[oklch(0.25_0.005_285)] pb-3">Trucks</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { name: "Full Front PPF + Ceramic (No Correction)", price: "$3,300", savings: "Save $150", includes: "Full front PPF + ceramic coating" },
                { name: "Full Front PPF + GeoShield Full Car Tint", price: "$3,000", savings: "Save $75", includes: "Full front PPF + premium tint" },
                { name: "Full Front PPF + Ceramic + GeoShield Tint", price: "$3,750", savings: "Save $200", includes: "Most popular combo", popular: true },
                { name: "Ceramic (No Correction) + GeoShield Tint", price: "$1,425", savings: "Save $100", includes: "Ceramic + premium full car tint" },
                { name: "Full Vehicle PPF + Ceramic (No Correction)", price: "$6,500", savings: "Save $450 + FREE Tint", includes: "Full wrap + ceramic + tint included FREE", best: true },
                { name: "Full Vehicle PPF + GeoShield Full Car Tint", price: "$6,200", savings: "Save $375", includes: "Full wrap + premium tint" },
              ].map((bundle, i) => (
                <div key={i} className={`border p-6 relative ${bundle.best ? "border-[oklch(0.75_0.18_40)] bg-[oklch(0.13_0.01_285)]" : bundle.popular ? "border-[oklch(0.45_0.10_40)] bg-[oklch(0.12_0.005_285)]" : "border-[oklch(0.22_0.005_285)]"}`}>
                  {bundle.best && (
                    <div className="absolute -top-3 left-4 bg-[oklch(0.65_0.22_40)] text-white text-xs font-bold uppercase px-3 py-1 flex items-center gap-1">
                      <Star className="w-3 h-3" /> Best Value
                    </div>
                  )}
                  {bundle.popular && !bundle.best && (
                    <div className="absolute -top-3 left-4 bg-[oklch(0.45_0.10_40)] text-white text-xs font-bold uppercase px-3 py-1">
                      Most Popular
                    </div>
                  )}
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h4 className="text-white font-bold text-sm leading-tight">{bundle.name}</h4>
                    <div className="text-right shrink-0">
                      <div className="text-[oklch(0.75_0.18_40)] font-black text-xl">{bundle.price}</div>
                      <div className="text-[oklch(0.65_0.22_40)] text-xs font-bold">{bundle.savings}</div>
                    </div>
                  </div>
                  <p className="text-[oklch(0.50_0.005_285)] text-xs">{bundle.includes}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[oklch(0.13_0.005_285)] border border-[oklch(0.25_0.005_285)] p-6 text-center">
            <p className="text-[oklch(0.55_0.005_285)] text-sm mb-2">Bundle savings are per vehicle type. All prices subject to in-person inspection.</p>
            <p className="text-[oklch(0.55_0.005_285)] text-sm font-bold">Military &amp; Law Enforcement: 5% discount applies on top of all bundle pricing.</p>
          </div>
        </div>
      </section>

      {/* Warranty Section */}
      <section className="py-16 px-4 bg-[oklch(0.12_0.005_285)]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-black text-white uppercase text-center mb-10">What's Covered</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { service: "Paint Protection Film", product: "Hexis Body Fence", warranty: "12-Year Manufacturer Warranty", detail: "Yellowing, bubbling, cracking, peeling", icon: Shield },
              { service: "Ceramic Coating", product: "Gtechniq Crystal Serum Light + Exo", warranty: "5 or 7-Year Warranty", detail: "Depending on package selected", icon: Zap },
              { service: "Window Tint", product: "GeoShield Pro Nano Ceramic", warranty: "Nationwide Lifetime Warranty", detail: "All packages included", icon: Check },
            ].map((item, i) => (
              <div key={i} className="border border-[oklch(0.25_0.005_285)] p-6">
                <item.icon className="w-8 h-8 text-[oklch(0.75_0.18_40)] mb-4" />
                <h3 className="text-white font-bold mb-1">{item.service}</h3>
                <p className="text-[oklch(0.55_0.005_285)] text-xs mb-3">{item.product}</p>
                <p className="text-[oklch(0.75_0.18_40)] font-bold text-sm">{item.warranty}</p>
                <p className="text-[oklch(0.45_0.005_285)] text-xs mt-1">{item.detail}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-[oklch(0.45_0.005_285)] text-sm mt-8">All work backed by our installation workmanship guarantee. If anything goes wrong on our end, we make it right.</p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-black text-white uppercase mb-4">Ready to Protect Your Vehicle?</h2>
          <p className="text-[oklch(0.55_0.005_285)] mb-8">Get a free, no-obligation quote. We'll inspect your vehicle and recommend the right package for your goals and budget.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/get-a-quote"
              className="bg-[oklch(0.65_0.22_40)] hover:bg-[oklch(0.60_0.22_40)] text-white font-bold px-10 py-4 uppercase tracking-widest text-sm transition-colors"
            >
              Get a Free Quote
            </Link>
            <Link
              href="/service-areas"
              className="border border-[oklch(0.35_0.005_285)] text-white hover:border-[oklch(0.75_0.18_40)] font-bold px-10 py-4 uppercase tracking-widest text-sm transition-colors"
            >
              View Service Areas
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
