import { Link } from "wouter";
import { ArrowRight, Shield, Award, Users, Zap } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { CERTIFICATIONS } from "@/lib/certifications";

const SHOP_FRONT = "/images/shop-front-raptor_e24391f2.jpeg";
const HERO_IMAGE_UNUSED = "/images/hero-bg.webp";
const CERAMIC_IMAGE_UNUSED = "/images/ceramic-service.webp";

const values = [
  {
    icon: Shield,
    title: "Protection First",
    desc: "Every decision we make is guided by one question: what gives this vehicle the best long-term protection? We never cut corners.",
  },
  {
    icon: Award,
    title: "Certified Excellence",
    desc: "Our installers are certified by the top film and coating manufacturers. We invest in ongoing training to stay at the forefront of the industry.",
  },
  {
    icon: Users,
    title: "Customer Transparency",
    desc: "No hidden fees, no upsells, no surprises. We explain every option clearly and let you make the decision that's right for your vehicle and budget.",
  },
  {
    icon: Zap,
    title: "Efficiency Without Compromise",
    desc: "We respect your time. Most tint jobs are completed same-day. We never rush quality, but we never waste your time either.",
  },
];

export default function About() {
  return (
    <div className="min-h-screen bg-[oklch(0.10_0.005_285)]">
      <SEO
        title="About Us | Auto Protection Chantilly VA"
        description="Skyline Customs is Northern Virginia's trusted PPF, ceramic coating & window tinting shop. 140+ five-star reviews. Division of Skyline Auto Body."
        canonical="https://www.skylinecustomshop.com/about"
      />
      <Navbar />

      {/* Page Header */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src={SHOP_FRONT} alt="Skyline Customs shop front with Ford Raptor in Chantilly Virginia" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.08_0.005_285)] to-transparent" />
        </div>
        <div className="relative z-10 container">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-[2px] w-12 bg-brand-orange" />
            <span className="font-mono-brand text-xs text-brand-orange uppercase tracking-[0.2em]">
              Our Story
            </span>
          </div>
          <h1 className="font-display text-6xl md:text-8xl text-[oklch(0.96_0.008_85)] leading-none mb-6">
            ABOUT<br />
            <span className="text-brand-orange">SKYLINE</span>
          </h1>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-[oklch(0.10_0.005_285)]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[oklch(0.65_0.008_85)] leading-relaxed text-lg mb-6">
                Skyline Custom Shop is the automotive protection division of Skyline Auto Body Shop — one of Northern Virginia's most trusted automotive businesses. We were founded on a simple belief: your vehicle deserves the same level of care and precision that goes into building it.
              </p>
              <p className="text-[oklch(0.65_0.008_85)] leading-relaxed mb-6">
                Located in Chantilly, VA, we serve drivers across Northern Virginia, including Fairfax, Herndon, Reston, Ashburn, and the greater Washington D.C. metro area. Our team of certified installers has protected thousands of vehicles — from daily drivers to exotic supercars — with the same uncompromising attention to detail.
              </p>
              <p className="text-[oklch(0.65_0.008_85)] leading-relaxed mb-8">
                We specialize in the three pillars of automotive protection: window tinting, ceramic coating, and paint protection film (PPF). Every service we offer is backed by premium materials from the industry's top manufacturers and a warranty that gives you peace of mind for years to come.
              </p>
              <div className="flex gap-8">
                <div>
                  <div className="font-display text-4xl text-brand-orange">140+</div>
                  <div className="font-mono-brand text-xs text-[oklch(0.66_0.008_285)] uppercase tracking-widest">5-Star Reviews</div>
                </div>
                <div>
                  <div className="font-display text-4xl text-brand-orange">8+</div>
                  <div className="font-mono-brand text-xs text-[oklch(0.66_0.008_285)] uppercase tracking-widest">Years in Business</div>
                </div>
                <div>
                  <div className="font-display text-4xl text-brand-orange">10+</div>
                  <div className="font-mono-brand text-xs text-[oklch(0.66_0.008_285)] uppercase tracking-widest">Year Warranties</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -top-4 -right-4 w-full h-full border border-brand-orange opacity-20" />
              <img loading="lazy" decoding="async"
                src={SHOP_FRONT}
                alt="Skyline Custom Shop — Ford Raptor in front of the shop in Chantilly, VA"
                className="w-full h-80 lg:h-[460px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-[oklch(0.12_0.005_285)]">
        <div className="container">
          <p className="section-number mb-3">Our Values</p>
          <h2 className="font-display text-5xl md:text-6xl text-[oklch(0.96_0.008_85)] leading-none mb-16">
            HOW WE<br />
            <span className="text-brand-orange">OPERATE</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[oklch(0.20_0.006_285)]">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-[oklch(0.12_0.005_285)] p-8">
                <div className="w-12 h-12 border border-brand-orange flex items-center justify-center mb-5">
                  <Icon size={20} className="text-brand-orange" />
                </div>
                <h3 className="font-display text-2xl text-[oklch(0.96_0.008_85)] tracking-wider mb-3">{title}</h3>
                <p className="text-[oklch(0.66_0.01_285)] leading-relaxed text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications & Partners */}
      <section className="py-20 bg-[oklch(0.10_0.005_285)]" id="certifications">
        <div className="container">
          <p className="section-number mb-3">Certified Installers</p>
          <h2 className="font-display text-5xl md:text-6xl text-[oklch(0.96_0.008_85)] leading-none mb-6">
            THE BRANDS<br />
            <span className="text-brand-orange">WE'RE CERTIFIED ON</span>
          </h2>
          <p className="text-[oklch(0.65_0.008_85)] leading-relaxed max-w-2xl mb-12">
            We install three product lines and we're trained and certified on all three. That matters because the manufacturer
            warranty only applies when the film or coating is installed by a certified shop, and because pattern software,
            training, and support come with the certification, not the roll of film.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[oklch(0.20_0.006_285)]">
            {CERTIFICATIONS.map((c) => (
              <div key={c.name} className="bg-[oklch(0.10_0.005_285)] p-8 flex flex-col">
                <p className="font-mono-brand text-xs text-brand-orange uppercase tracking-widest mb-2">Certified installer</p>
                <h3 className="font-display text-3xl text-[oklch(0.96_0.008_85)] tracking-wider mb-1">{c.name}</h3>
                <p className="text-[oklch(0.75_0.008_85)] text-sm mb-4">{c.product}</p>
                <p className="text-[oklch(0.66_0.01_285)] leading-relaxed text-sm flex-1">{c.what}</p>
                <p className="text-[oklch(0.65_0.008_85)] text-sm mt-4">{c.warranty}</p>
                <a href={c.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-brand-orange text-xs font-bold tracking-widest uppercase mt-6 hover:text-white transition-colors">
                  {c.short} website <ArrowRight size={14} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Area */}
      <section className="py-20 bg-[oklch(0.10_0.005_285)]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <p className="section-number mb-3">Service Area</p>
              <h2 className="font-display text-5xl text-[oklch(0.96_0.008_85)] leading-none mb-6">
                WE SERVE ALL OF<br />
                <span className="text-brand-orange">NORTHERN VIRGINIA</span>
              </h2>
              <p className="text-[oklch(0.65_0.008_85)] leading-relaxed mb-6">
                Our Chantilly facility is conveniently located off Route 50, easily accessible from all of Northern Virginia. We regularly serve customers from Fairfax, Herndon, Reston, Ashburn, Sterling, Leesburg, McLean, Vienna, and the greater Washington D.C. metro area.
              </p>
              <div className="grid grid-cols-2 gap-2 mb-8">
                {["Chantilly", "Fairfax", "Herndon", "Reston", "Ashburn", "Sterling", "Leesburg", "McLean", "Vienna", "Tysons", "Centreville", "Manassas"].map((city) => (
                  <div key={city} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-brand-orange" />
                    <span className="text-[oklch(0.65_0.008_85)] text-sm">{city}</span>
                  </div>
                ))}
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-brand-orange text-[oklch(0.10_0.005_285)] font-display text-sm tracking-widest px-6 py-3 hover:bg-[oklch(0.72_0.21_40)] transition-colors group"
              >
                GET DIRECTIONS <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="bg-[oklch(0.14_0.006_285)] border border-[oklch(0.20_0.006_285)] p-8">
              <h3 className="font-display text-2xl text-[oklch(0.96_0.008_85)] tracking-wider mb-6">VISIT US</h3>
              <div className="space-y-4">
                <div>
                  <p className="font-mono-brand text-xs text-brand-orange uppercase tracking-widest mb-1">Address</p>
                  <p className="text-[oklch(0.75_0.008_85)]">4215 Walney Rd. Suite 1A &amp; B<br />Chantilly, VA 20151</p>
                </div>
                <div>
                  <p className="font-mono-brand text-xs text-brand-orange uppercase tracking-widest mb-1">Hours</p>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-[oklch(0.65_0.008_85)] text-sm">Monday – Friday</span>
                      <span className="font-mono-brand text-xs text-[oklch(0.75_0.008_85)]">9:00 AM – 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[oklch(0.65_0.008_85)] text-sm">Weekends</span>
                      <span className="font-mono-brand text-xs text-[oklch(0.66_0.008_285)]">Closed</span>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="font-mono-brand text-xs text-brand-orange uppercase tracking-widest mb-1">Phone</p>
                  <a href="tel:+17037754383" className="text-[oklch(0.75_0.008_85)] hover:text-brand-orange transition-colors">
                    (703) 775-4383
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
