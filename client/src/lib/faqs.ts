/**
 * FAQ content for the /faq hub page. Grouped by topic; each group also feeds
 * FAQPage structured data so answers can appear directly in Google results.
 */

export interface FaqItem { q: string; a: string }
export interface FaqGroup { key: string; label: string; heading: string; intro: string; href?: string; hrefLabel?: string; items: FaqItem[] }

export const FAQ_GROUPS: FaqGroup[] = [
  {
    key: "general",
    label: "The Basics",
    heading: "VISITING THE SHOP",
    intro: "Where we are, when we're open, and how booking works.",
    items: [
      { q: "Where is Skyline Customs located?", a: "4215 Walney Rd Suite 1A & B, Chantilly, VA 20151 — just off Route 28, minutes from Dulles Airport and easy to reach from I-66, I-495, and the Dulles Toll Road. Free parking on site." },
      { q: "What are your hours?", a: "Monday through Friday, 9 AM to 6 PM. We're closed on weekends, but you can request a quote online any time and we'll follow up the next business day." },
      { q: "Do I need an appointment?", a: "Yes. Every install is scheduled so the bay is ready and dust-free when your car arrives. Request a free quote and we'll offer dates, or call (703) 775-4383." },
      { q: "Do you offer mobile service or do I come to you?", a: "We operate from our controlled-environment facility in Chantilly, VA. Proper installation of PPF and ceramic coatings requires a dust-free environment that can't be replicated outdoors — this is how we guarantee quality." },
      { q: "How do I get a quote?", a: "Use the online quote form with your year, make, model, and the service you're interested in, and we'll reply with pricing, usually within the hour during business hours. Prices are confirmed at an in-person inspection." },
      { q: "What warranties do you offer?", a: "STEK DYNOshield PPF carries a 12-year manufacturer warranty against yellowing, cracking, and peeling. GeoShield ceramic tint has a nationwide lifetime warranty. Ceramic coatings are warrantied for 5 or 7 years depending on the package." },
    ],
  },
  {
    key: "ppf",
    label: "Paint Protection Film",
    heading: "PPF QUESTIONS",
    intro: "Self-healing film that stops rock chips before they reach your paint.",
    href: "/services/ppf",
    hrefLabel: "PPF packages and pricing",
    items: [
      { q: "How long does PPF last?", a: "High-quality PPF installed by certified professionals typically lasts 10–12+ years with proper care. Our STEK DYNOshield film comes with a 12-year manufacturer warranty." },
      { q: "Will PPF change how my car looks?", a: "No. Our optically clear PPF is virtually invisible. The only difference you'll notice is a deeper, protected gloss. We also offer stealth/matte PPF if you want a satin finish." },
      { q: "How much does PPF cost?", a: "It depends on coverage: partial front (bumper plus partial hood), full front (bumper, hood, fenders, mirrors, headlights, and A-pillars), or full front extended, and on vehicle size for extended work. Request a free quote with your year, make, and model and we reply with an exact price, confirmed at inspection." },
      { q: "Can I wash my car normally after PPF?", a: "Yes — after a 7-day cure period you can wash normally. We recommend hand washing or touchless washes for the longest film life." },
      { q: "Does PPF damage my paint when removed?", a: "No. When removed by a professional, PPF leaves factory paint completely intact. We use computer-cut patterns wherever possible to avoid hand cutting on the vehicle." },
      { q: "Should I get PPF or ceramic coating — or both?", a: "Both, ideally. PPF provides physical protection from chips and impacts; ceramic coating adds chemical resistance, hydrophobic properties, and gloss. The best setup is PPF first, then ceramic coating on top." },
      { q: "What areas do you cover with PPF?", a: "Partial coverage of high-impact zones (hood, bumper, mirrors), full front end, and full front extended (rocker panels and door edges). We'll recommend the right package for how and where you drive." },
      { q: "Does PPF self-heal?", a: "Yes. STEK DYNOshield uses a thermoplastic polyurethane top layer that self-heals light scratches and swirl marks when warmed by the sun or hot water." },
    ],
  },
  {
    key: "ceramic",
    label: "Ceramic Coating",
    heading: "CERAMIC COATING QUESTIONS",
    intro: "A hard, hydrophobic layer that keeps paint glossy and easy to wash for years.",
    href: "/services/ceramic-coating",
    hrefLabel: "Ceramic coating packages",
    items: [
      { q: "How long does ceramic coating last?", a: "A professionally applied ceramic coating lasts 2–7+ years depending on the product tier and maintenance. We offer warranty options up to 7 years." },
      { q: "Does ceramic coating prevent scratches?", a: "Ceramic coating adds hardness and chemical resistance but is not a substitute for PPF against rock chips and deep scratches. For maximum protection, we recommend PPF first, then ceramic coating on top." },
      { q: "How much does ceramic coating cost?", a: "It depends on the package (Crystal with a 5-year warranty or Ultimate with a 7-year warranty), how much paint correction your paint needs, and vehicle size. Request a free quote and we reply with an exact price for your car." },
      { q: "How do I maintain a ceramic-coated car?", a: "Hand wash or touchless wash only — no automatic brushes. Use a pH-neutral shampoo and avoid parking under trees for long stretches. That's it; the coating does the rest." },
      { q: "Can I wash my car right after ceramic coating?", a: "Wait 7 days so the coating fully cures. After that, regular washing is fine — the hydrophobic surface makes it easier than ever." },
      { q: "Can ceramic coating be applied to a new car?", a: "Yes — and it's the ideal time. New cars still benefit from paint correction to remove transport scratches and dealer swirls before coating." },
      { q: "What's the difference between the 5-year and 7-year coating?", a: "Higher-tier coatings use more advanced formulations with greater hardness, thicker layering, and stronger hydrophobic properties. The 7-year tier is our flagship for clients who want maximum long-term protection." },
    ],
  },
  {
    key: "tint",
    label: "Window Tinting",
    heading: "WINDOW TINT QUESTIONS",
    intro: "GeoShield Pro Nano Ceramic film: heat and UV rejection without signal interference.",
    href: "/services/window-tinting",
    hrefLabel: "Tint packages and shades",
    items: [
      { q: "What are Virginia's window tint laws?", a: "For sedans, Virginia allows 50% VLT on the front side windows and 35% on the rear side and back windows. SUVs, trucks, and vans may go darker behind the front doors. Windshields may only carry a non-reflective strip above the AS-1 line. We only install Virginia-legal tint and can help with medical exemption paperwork." },
      { q: "What is ceramic tint vs. regular tint?", a: "Ceramic tint uses nano-ceramic particles instead of metal or dye. It rejects far more heat and UV, doesn't interfere with electronics, and doesn't fade or turn purple over time." },
      { q: "How much does window tinting cost?", a: "It depends on how many windows you tint: four side windows, the rear package (most popular), every window including the windshield, or windshield only. All packages are GeoShield Pro Nano Ceramic with a nationwide lifetime warranty. Request a free quote for an exact price." },
      { q: "How long does window tinting take?", a: "Most cars are done in 2–4 hours. We use computer-cut patterns for a precise fit with no trimming on the glass, which reduces install time and improves quality." },
      { q: "Can I roll my windows down after tinting?", a: "Keep the windows up for at least 3 days after installation so the film cures and adheres fully to the glass." },
      { q: "Will tint affect my visibility at night?", a: "Darker tints can reduce nighttime visibility. We'll guide you to the VLT percentage that balances privacy, heat rejection, and safe night driving for your vehicle." },
      { q: "Do you tint the windshield?", a: "Yes — legal windshield strips and ceramic windshield film that rejects heat and UV without darkening your forward view beyond legal limits." },
      { q: "Does ceramic tint block phone, GPS, or toll transponder signals?", a: "No. GeoShield ceramic film is metal-free, so cell, GPS, satellite radio, and E-ZPass signals pass through normally." },
    ],
  },
];

export const ALL_FAQS: FaqItem[] = FAQ_GROUPS.flatMap((g) => g.items);
