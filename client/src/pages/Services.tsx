import { Link } from "wouter";
import { ArrowRight, Check, Phone } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useBooking } from "@/contexts/BookingContext";
import type { BookingService } from "@/components/BookingModal";
import SEO from "@/components/SEO";

const TINT_IMAGE = "/images/tint_bmw_m2_847caa83.webp";
const CERAMIC_IMAGE = "/images/ceramic_1_53c9aefc.webp";
const PPF_IMAGE = "/images/ppf_1_c7c64665.webp";

const services: { id: string; number: string; title: string; subtitle: string; image: string; description: string; benefits: string[]; packages: { name: string; note: string }[]; bookingService: BookingService; href: string }[] = [
  {
    id: "ppf",
    number: "01",
    title: "Paint Protection Film",
    subtitle: "Self-Healing PPF",
    image: PPF_IMAGE,
    description: "Paint Protection Film (PPF) is the ultimate defense against physical damage. This thick, optically clear urethane film absorbs rock chips, scratches, and road debris before they reach your paint. Our self-healing film uses heat to repair minor scratches automatically — keeping your car looking showroom-perfect.",
    benefits: [
      "Absorbs rock chips and road debris",
      "Self-healing minor scratches",
      "Optically clear — invisible protection",
      "Gloss or matte finish available",
      "12-year manufacturer warranty",
      "Preserves factory paint and resale value",
    ],
    packages: [
      { name: "Partial Front", note: "Bumper + partial hood (18in) — budget-friendly front coverage" },
      { name: "Full Front", note: "Bumper, hood, fenders, mirrors, headlights, A-pillars" },
    ],
    bookingService: "ppf" as BookingService,
    href: "/services/ppf",
  },
  {
    id: "ceramic",
    number: "02",
    title: "Ceramic Coating",
    subtitle: "Permanent Paint Defense",
    image: CERAMIC_IMAGE,
    description: "Ceramic coating creates a permanent molecular bond with your vehicle's paint, forming a glass-like protective layer that repels water, dirt, and contaminants. Unlike wax or sealants that wear off in weeks, our ceramic coatings are a long-term investment in your vehicle's appearance and resale value — with warranty options up to 7 years.",
    benefits: [
      "Permanent hydrophobic protection",
      "Self-cleaning effect — dirt slides off",
      "Deep gloss enhancement",
      "Scratch and swirl resistance",
      "Chemical and UV resistance",
      "Warranty options up to 7 years",
    ],
    packages: [
      { name: "Ceramic (No Correction)", note: "Gtechniq CSL + Exo — new/like-new paint only, 7-year warranty" },
      { name: "Crystal Package (5 Year)", note: "Stage 2 correction + Gtechniq 5yr coating + paint & glass" },
      { name: "Ultimate Coating (7 Year)", note: "Stage 3 correction + Gtechniq/Exo 7yr + paint, glass, trim & wheels" },
    ],
    bookingService: "ceramic" as BookingService,
    href: "/services/ceramic-coating",
  },
  {
    id: "tinting",
    number: "03",
    title: "Window Tinting",
    subtitle: "Pro Nano Ceramic Film",
    image: TINT_IMAGE,
    description: "Our window tinting uses Pro Nano ceramic film technology — the highest-performing film on the market. Unlike dyed or metallic films, ceramic film blocks heat through infrared rejection rather than signal interference, meaning your GPS, phone, and key fob work perfectly.",
    benefits: [
      "Blocks 99% of harmful UV rays",
      "Reduces interior heat by up to 60%",
      "No signal interference (GPS, phone, key fob)",
      "Reduces glare for safer driving",
      "Protects interior from fading",
      "Lifetime warranty against bubbling and peeling",
    ],
    packages: [
      { name: "Frontseat Package", note: "Front 2 side windows only" },
      { name: "Rear Package", note: "Rear windshield + back windows — Most Popular" },
      { name: "Full Car", note: "Windshield + all sides + rear — GeoShield Pro Nano Ceramic" },
    ],
    bookingService: "tint" as BookingService,
    href: "/services/window-tinting",
  },
];

export default function Services() {
  const { openBooking } = useBooking();
  return (
    <div className="min-h-screen bg-[oklch(0.10_0.005_285)]">
      <SEO
        title="Auto Protection Services | Chantilly VA"
        description="PPF, ceramic coating, and window tinting in Chantilly, VA. Lifetime craftsmanship warranty. Serving all of Northern Virginia."
        canonical="https://www.skylinecustomshop.com/services"
      />
      <Navbar />

      {/* Page Header */}
      <section className="pt-32 pb-16 bg-[oklch(0.10_0.005_285)]">
        <div className="container">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-[2px] w-12 bg-brand-orange" />
            <span className="font-mono-brand text-xs text-brand-orange uppercase tracking-[0.2em]">
              What We Offer
            </span>
          </div>
          <h1 className="font-display text-6xl md:text-8xl text-[oklch(0.96_0.008_85)] leading-none mb-6">
            OUR<br />
            <span className="text-brand-orange">SERVICES</span>
          </h1>
          <p className="text-[oklch(0.66_0.01_285)] text-lg max-w-2xl">
            Every service we offer is backed by premium materials, certified installers, and a commitment to perfection. We serve all of Northern Virginia from our Chantilly facility.
          </p>
        </div>
      </section>

      {/* Services */}
      {services.map((service, idx) => (
        <section
          key={service.id}
          id={service.id}
          className={`py-20 ${idx % 2 === 0 ? "bg-[oklch(0.10_0.005_285)]" : "bg-[oklch(0.12_0.005_285)]"}`}
        >
          <div className="container">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${idx % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
              {/* Image */}
              <div className={`relative ${idx % 2 === 1 ? "lg:order-2" : ""}`}>
                <div className="absolute -top-3 -left-3 w-full h-full border border-brand-orange opacity-20" />
                <img loading="lazy" decoding="async"
                  src={service.image}
                  alt={service.title}
                  className="w-full h-72 lg:h-[420px] object-cover"
                />
                <div className="absolute top-4 left-4 bg-brand-orange px-3 py-1">
                  <span className="font-mono-brand text-xs text-[oklch(0.10_0.005_285)] uppercase tracking-widest">
                    {service.number}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className={idx % 2 === 1 ? "lg:order-1" : ""}>
                <p className="font-mono-brand text-xs text-brand-orange uppercase tracking-widest mb-3">
                  {service.subtitle}
                </p>
                <h2 className="font-display text-5xl md:text-6xl text-[oklch(0.96_0.008_85)] leading-none mb-6">
                  {service.title}
                </h2>
                <p className="text-[oklch(0.65_0.008_85)] leading-relaxed mb-8">
                  {service.description}
                </p>

                {/* Benefits */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {service.benefits.map((benefit) => (
                    <div key={benefit} className="flex items-start gap-2">
                      <Check size={14} className="text-brand-orange mt-0.5 shrink-0" />
                      <span className="text-[oklch(0.65_0.008_85)] text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>



                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/get-a-quote"
                    className="inline-flex items-center gap-3 bg-brand-orange text-[oklch(0.10_0.005_285)] font-display text-sm tracking-widest px-6 py-3 hover:bg-[oklch(0.72_0.21_40)] transition-colors group"
                  >
                    GET A QUOTE
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    href={service.href}
                    className="inline-flex items-center gap-2 border border-[oklch(0.35_0.008_285)] text-[oklch(0.65_0.008_85)] font-display text-sm tracking-widest px-6 py-3 hover:border-brand-orange hover:text-brand-orange transition-colors"
                  >
                    LEARN MORE
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Which service */}
      <section className="py-20 bg-[oklch(0.12_0.005_285)]">
        <div className="container max-w-5xl">
          <p className="font-mono-brand text-xs text-brand-orange uppercase tracking-widest mb-3">Which one do you need?</p>
          <h2 className="font-display text-5xl md:text-6xl text-[oklch(0.96_0.008_85)] leading-none mb-8">PPF, CERAMIC, OR TINT?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[oklch(0.20_0.006_285)]">
            <div className="bg-[oklch(0.12_0.005_285)] p-6">
              <h3 className="font-display text-2xl text-[oklch(0.96_0.008_85)] mb-3">Start with PPF if you drive highways</h3>
              <p className="text-[oklch(0.65_0.008_85)] text-sm leading-relaxed">Rock chips on the bumper, hood, and mirrors are the damage Northern Virginia roads actually cause, and paint protection film is the only product that stops them. Full front is what most of our customers choose because it covers every panel that gets hit with no film line on the hood. New cars should get film in the first week; used cars with a few chips can still be filmed after a touch-up. See <Link href="/services/ppf" className="text-brand-orange underline underline-offset-2 decoration-1 hover:decoration-2">PPF packages</Link> or <Link href="/ppf-cost" className="text-brand-orange underline underline-offset-2 decoration-1 hover:decoration-2">what drives a PPF quote</Link>.</p>
            </div>
            <div className="bg-[oklch(0.12_0.005_285)] p-6">
              <h3 className="font-display text-2xl text-[oklch(0.96_0.008_85)] mb-3">Add a ceramic coating for easy care</h3>
              <p className="text-[oklch(0.65_0.008_85)] text-sm leading-relaxed">A coating does not stop chips, but it stops the chemical damage: pollen, bird droppings, sap, salt, and UV. It makes washing a rinse, adds gloss, and lasts five to seven years with Gtechniq. The ideal setup is film on the front and coating over everything, which we do in one two-day visit. Our <Link href="/ppf-vs-ceramic-coating" className="text-brand-orange underline underline-offset-2 decoration-1 hover:decoration-2">PPF vs ceramic guide</Link> explains which to pick if you can only do one.</p>
            </div>
            <div className="bg-[oklch(0.12_0.005_285)] p-6">
              <h3 className="font-display text-2xl text-[oklch(0.96_0.008_85)] mb-3">Tint for heat, glare, and privacy</h3>
              <p className="text-[oklch(0.65_0.008_85)] text-sm leading-relaxed">Ceramic window film blocks 99% of UV and most of the heat that turns a parked car into an oven, without the signal problems of metallic tint. We meter every window so the result is legal in Virginia: 50% on the front doors, 35% behind them on sedans, any darkness behind the front doors on SUVs and trucks. A rear package takes a few hours and fits the same day as a PPF install. Compare films in our <Link href="/ceramic-vs-carbon-vs-dyed-tint" className="text-brand-orange underline underline-offset-2 decoration-1 hover:decoration-2">ceramic vs carbon vs dyed guide</Link>.</p>
            </div>
          </div>
          <p className="text-[oklch(0.66_0.008_285)] text-sm mt-6">Every service is done at our shop at 4215 Walney Rd in Chantilly, VA, by STEK-certified installers, and every quote is written for your exact year, make, model, and coverage. Browse <Link href="/gallery" className="text-brand-orange underline underline-offset-2 decoration-1 hover:decoration-2">recent jobs</Link> to see the work.</p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-brand-orange">
        <div className="container text-center">
          <h2 className="font-display text-5xl md:text-6xl text-[oklch(0.10_0.005_285)] leading-none mb-6">
            NOT SURE WHAT YOU NEED?
          </h2>
          <p className="text-[oklch(0.10_0.005_285/0.75)] mb-8 max-w-lg mx-auto">
            Call us or book a free consultation. We'll assess your vehicle and recommend the best protection package for your budget.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+17037754383"
              className="inline-flex items-center justify-center gap-2 bg-[oklch(0.10_0.005_285)] text-[oklch(0.96_0.008_85)] font-display text-base tracking-widest px-8 py-4 hover:bg-[oklch(0.15_0.005_285)] transition-colors"
            >
              <Phone size={16} />
              FREE CONSULTATION
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
