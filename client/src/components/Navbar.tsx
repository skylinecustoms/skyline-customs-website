import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Phone, ChevronDown, Zap } from "lucide-react";
import { useBooking } from "@/contexts/BookingContext";
import { trpc } from "@/lib/trpc";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/videos", label: "Videos" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  // { href: "/pricing", label: "Pricing" }, // temporarily hidden
  { href: "/service-areas", label: "Areas" },
  { href: "/contact", label: "Contact" },
];

const serviceLinks = [
  { href: "/services/ppf", label: "Paint Protection Film" },
  { href: "/services/ceramic-coating", label: "Ceramic Coating" },
  { href: "/services/window-tinting", label: "Window Tinting" },
  { href: "/ppf-cost", label: "PPF Cost Guide" },
  { href: "/tesla-ppf", label: "Tesla PPF" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [location] = useLocation();
  const { openBooking } = useBooking();
  const servicesRef = useRef<HTMLDivElement>(null);
  const { data: activePromo } = trpc.promo.getActive.useQuery(undefined, {
    staleTime: 60_000,
  });

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setServicesOpen(false);
  }, [location]);

  // Derive a short promo label from the title (first word, e.g. "June" from "June Special")
  const promoLabel = activePromo?.title
    ? activePromo.title.split(" ").slice(0, 2).join(" ")
    : "Promo";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[oklch(0.10_0.005_285)]/95 backdrop-blur-sm shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <img
              src="/images/skyline-logo.webp"
              alt="Skyline Customs"
              width={108}
              height={120}
              className="h-10 w-auto object-contain"
            />
            <div className="flex flex-col leading-none">
              <span className="font-display text-xl text-[oklch(0.96_0.008_85)] tracking-wider">
                SKYLINE
              </span>
              <span className="font-mono-brand text-[10px] text-brand-orange tracking-[0.2em] uppercase">
                Customs
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-4 2xl:gap-7">
            {navLinks.map((link) =>
              link.label === "Services" ? (
                <div key={link.href} className="relative" ref={servicesRef}>
                  <button
                    onClick={() => setServicesOpen(!servicesOpen)}
                    className={`relative font-display text-sm 2xl:text-base tracking-wider transition-colors group flex items-center gap-1 ${
                      location.startsWith("/services")
                        ? "text-brand-orange"
                        : "text-[oklch(0.75_0.008_85)] hover:text-[oklch(0.96_0.008_85)]"
                    }`}
                  >
                    Services
                    <ChevronDown size={14} className={`transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`} />
                    <span className={`absolute -bottom-1 left-0 h-[2px] bg-brand-orange transition-all duration-300 ${location.startsWith("/services") ? "w-full" : "w-0 group-hover:w-full"}`} />
                  </button>
                  {servicesOpen && (
                    <div className="absolute top-full left-0 mt-2 w-56 bg-[#111] border border-zinc-800 shadow-2xl z-50">
                      <Link
                        href="/services"
                        onClick={() => setServicesOpen(false)}
                        className="block px-4 py-3 text-xs font-bold tracking-widest uppercase text-zinc-400 hover:text-[#E85D04] border-b border-zinc-800 transition-colors"
                      >
                        All Services
                      </Link>
                      {serviceLinks.map((sl) => (
                        <Link
                          key={sl.href}
                          href={sl.href}
                          onClick={() => setServicesOpen(false)}
                          className={`block px-4 py-3 text-sm font-display tracking-wide transition-colors hover:bg-[#1a0a00] hover:text-[#E85D04] ${
                            location === sl.href ? "text-[#E85D04] bg-[#1a0a00]" : "text-zinc-300"
                          }`}
                        >
                          {sl.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative font-display text-sm 2xl:text-base tracking-wider transition-colors group ${
                    location === link.href
                      ? "text-brand-orange"
                      : "text-[oklch(0.75_0.008_85)] hover:text-[oklch(0.96_0.008_85)]"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-[2px] bg-brand-orange transition-all duration-300 ${
                      location === link.href ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              )
            )}

            {/* Active promo link — only shown when a promo is live */}
            {activePromo && (
              <Link
                href="/promo"
                className={`relative font-display text-sm 2xl:text-base tracking-wider transition-colors group flex items-center gap-1.5 whitespace-nowrap ${
                  location === "/promo"
                    ? "text-brand-orange"
                    : "text-brand-orange/80 hover:text-brand-orange"
                }`}
              >
                <Zap size={13} className="fill-brand-orange text-brand-orange" />
                <span className="2xl:hidden">Special</span>
                <span className="hidden 2xl:inline">{promoLabel}</span>
                <span className={`absolute -bottom-1 left-0 h-[2px] bg-brand-orange transition-all duration-300 ${
                  location === "/promo" ? "w-full" : "w-0 group-hover:w-full"
                }`} />
              </Link>
            )}
          </div>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-4">
            {/* Phone + Book Now stacked group */}
            <div className="hidden lg:flex items-center gap-3 2xl:gap-4">
              <div className="hidden 2xl:flex flex-col items-end leading-none gap-0.5">
                <span className="block font-mono-brand text-[10px] text-[oklch(0.45_0.008_285)] uppercase tracking-widest">
                  Call Us
                </span>
                <a
                  href="tel:+17037754383"
                  className="flex items-center gap-1.5 text-[oklch(0.90_0.008_85)] font-mono-brand text-sm hover:text-brand-orange transition-colors whitespace-nowrap"
                >
                  <Phone size={13} className="text-brand-orange" />
                  (703) 775-4383
                </a>
              </div>
              <div className="hidden 2xl:block w-px h-8 bg-[oklch(0.25_0.006_285)]" />
              <Link
                href="/get-a-quote"
                className="bg-brand-orange text-[oklch(0.10_0.005_285)] font-display text-sm tracking-widest px-6 py-2.5 hover:bg-[oklch(0.72_0.21_40)] transition-colors whitespace-nowrap"
              >
                GET A QUOTE
              </Link>
            </div>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden text-[oklch(0.96_0.008_85)] p-1"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-[oklch(0.12_0.005_285)] border-t border-[oklch(0.25_0.006_285)]">
          <div className="container py-6 flex flex-col gap-4">
            {navLinks.map((link) =>
              link.label === "Services" ? (
                <div key={link.href}>
                  <Link
                    href="/services"
                    className={`font-display text-2xl tracking-wider block mb-2 ${
                      location === "/services" ? "text-brand-orange" : "text-[oklch(0.75_0.008_85)]"
                    }`}
                  >
                    Services
                  </Link>
                  <div className="pl-4 flex flex-col gap-2 border-l border-zinc-800">
                    {serviceLinks.map((sl) => (
                      <Link
                        key={sl.href}
                        href={sl.href}
                        className={`font-display text-base tracking-wide ${
                          location === sl.href ? "text-[#E85D04]" : "text-zinc-400 hover:text-zinc-300"
                        }`}
                      >
                        {sl.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
              <Link
                key={link.href}
                href={link.href}
                className={`font-display text-2xl tracking-wider ${
                  location === link.href
                    ? "text-brand-orange"
                    : "text-[oklch(0.75_0.008_85)]"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Active promo link — mobile */}
            {activePromo && (
              <Link
                href="/promo"
                onClick={() => setIsOpen(false)}
                className={`font-display text-2xl tracking-wider flex items-center gap-2 ${
                  location === "/promo" ? "text-brand-orange" : "text-brand-orange/80"
                }`}
              >
                <Zap size={20} className="fill-brand-orange text-brand-orange" />
                {promoLabel}
              </Link>
            )}

            <div className="pt-4 border-t border-[oklch(0.25_0.006_285)] flex flex-col gap-3">
              <a
                href="tel:+17037754383"
                className="flex items-center gap-2 text-brand-orange font-mono-brand text-sm"
              >
                <Phone size={14} />
                (703) 775-4383
              </a>
              <Link
                href="/get-a-quote"
                onClick={() => setIsOpen(false)}
                className="bg-brand-orange text-[oklch(0.10_0.005_285)] font-display text-sm tracking-widest px-6 py-3 text-center hover:bg-[oklch(0.72_0.21_40)] transition-colors"
              >
                GET A QUOTE
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
