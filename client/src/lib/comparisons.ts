/**
 * Content for the comparison pages. Prices mirror the service pages; keep them in sync.
 */
import type { ComparisonData } from "@/components/ComparisonPage";

export const PPF_VS_CERAMIC: ComparisonData = {
  path: "/ppf-vs-ceramic-coating",
  title: "Full Front PPF vs Ceramic Coating: Which Do You Need?",
  description: "PPF vs ceramic coating compared side by side: rock chips, scratches, gloss, cost, lifespan, and maintenance. Which one Chantilly, VA drivers need, and when to do both.",
  eyebrow: "PPF vs ceramic coating",
  h1: "PPF VS CERAMIC COATING: WHICH ONE DO YOU ACTUALLY NEED?",
  intro: "They get sold as if they were rivals, but paint protection film and ceramic coating solve different problems. Film is a physical barrier that stops rock chips and scratches. A coating is a chemical layer that makes paint glossier, slicker, and easier to wash. This is how we explain the difference to customers in our Chantilly bay every week, with the same numbers we quote them.",
  breadcrumb: "PPF vs Ceramic Coating",
  columns: [
    { key: "ppf", name: "Paint Protection Film", sub: "STEK DYNOshield", href: "/services/ppf", bestFor: "Stopping rock chips, gravel, and scratches on the front end. The only product that physically absorbs impacts." },
    { key: "ceramic", name: "Ceramic Coating", sub: "Gtechniq Crystal Serum", href: "/services/ceramic-coating", bestFor: "Gloss, easier washing, and protection from UV, bird droppings, and water spots across the whole car." },
    { key: "both", name: "PPF + Ceramic", sub: "Our most common combo", href: "/get-a-quote?service=ppf", bestFor: "New cars and anything you plan to keep. Film where chips happen, coating everywhere for gloss and maintenance." },
  ],
  rows: [
    { label: "Rock chips & gravel", cells: { ppf: { mark: "yes", text: "Yes. 8-mil urethane absorbs the impact." }, ceramic: { mark: "no", text: "No. A coating is microns thick and will not stop a chip." }, both: { mark: "yes", text: "Yes, on every filmed panel." } } },
    { label: "Light scratches & swirls", cells: { ppf: { mark: "yes", text: "Yes. Self-healing top coat closes light scratches with heat." }, ceramic: { mark: "partial", text: "Slightly harder surface, but still swirls from bad washing." }, both: { mark: "yes", text: "Film heals; coating resists new swirls." } } },
    { label: "Gloss & depth", cells: { ppf: { mark: "partial", text: "Clear film keeps the factory look; matte option available." }, ceramic: { mark: "yes", text: "Noticeably deeper gloss after paint correction." }, both: { mark: "yes", text: "Coating on top of film adds the gloss." } } },
    { label: "Easier washing & water beading", cells: { ppf: { mark: "partial", text: "DYNOshield is hydrophobic, but a coating beads better." }, ceramic: { mark: "yes", text: "Yes. Dirt releases with a rinse; no wax needed." }, both: { mark: "yes", text: "Best case: the whole car washes the same way." } } },
    { label: "UV, bird droppings, water spots", cells: { ppf: { mark: "yes", text: "Film takes the etching instead of the paint." }, ceramic: { mark: "yes", text: "Chemical resistance is what coatings are for." }, both: { mark: "yes", text: "Covered everywhere." } } },
    { label: "Coverage", cells: { ppf: { text: "Usually the front end (hood, bumper, fenders, mirrors). Full car is optional." }, ceramic: { text: "Whole car including glass, trim, and wheels on the Ultimate package." }, both: { text: "Front end filmed, entire car coated." } } },
    { label: "Lifespan & warranty", cells: { ppf: { text: "12-year STEK manufacturer warranty." }, ceramic: { text: "5-year (Crystal) or 7-year (Ultimate) warranty." }, both: { text: "Each layer carries its own warranty." } } },
    { label: "Install time", cells: { ppf: { text: "1 day for a full front; 2–3 days full car." }, ceramic: { text: "1–2 days including paint correction." }, both: { text: "2–3 days, done in one visit." } } },
    { label: "Removable?", cells: { ppf: { mark: "yes", text: "Yes, cleanly, with no damage to factory paint." }, ceramic: { mark: "no", text: "It is bonded; it wears off over years or is polished off." }, both: { text: "Film removable; coating permanent until worn." } } },
  ],
  verdicts: [
    { title: "Get PPF if…", body: "You commute on I-66, Route 28, or the Dulles Toll Road, you just bought a new car, or you already have chips on the bumper and hood. Nothing else stops the next one.", href: "/services/ppf", cta: "PPF packages" },
    { title: "Get ceramic if…", body: "The paint is in good shape, you mostly drive local, and what you want is gloss and a car that stays clean with a quick rinse instead of a weekend of waxing.", href: "/services/ceramic-coating", cta: "Coating packages" },
    { title: "Get both if…", body: "You plan to keep the car three years or more. Film on the front, coating on everything. Ask about this month's special when you request a quote; we often bundle full front PPF with a ceramic coating.", href: "/promo", cta: "This month's special" },
  ],
  faqs: [
    { q: "Does ceramic coating protect against rock chips?", a: "No. A ceramic coating is a few microns thick and cannot absorb an impact. It resists chemicals, UV, and light marring. If chips are the problem, you need paint protection film." },
    { q: "Can you put ceramic coating over PPF?", a: "Yes, and we recommend it. Coating bonds well to STEK DYNOshield, adds gloss, and makes the film easier to keep clean. It does not affect the film's self-healing or its warranty." },
    { q: "Which is cheaper, PPF or ceramic coating?", a: "A ceramic coating for the whole car costs less up front than film on the front end, because film is a thick physical layer that is cut and fitted panel by panel. They protect against different things, so the right question is which damage you are trying to prevent. Request a free quote and we will price both for your car." },
    { q: "How long does each one last?", a: "STEK DYNOshield PPF carries a 12-year warranty. Gtechniq coatings are warrantied for 5 years (Crystal) or 7 years (Ultimate). Both depend on washing the car properly and avoiding automatic brush washes." },
    { q: "Is PPF worth it on a leased car?", a: "Often yes. Chips on the bumper and hood are exactly what lease-return inspections charge for, and film is removable with no damage to the paint. A partial or full front usually costs less than one repaint." },
    { q: "Do I need paint correction before either one?", a: "Every ceramic coating package includes paint correction because the coating locks in whatever is under it. PPF also goes on after a decontamination wash and any needed correction so the film sits over clean, defect-free paint." },
  ],
  videoIds: ["kfzGx2IROLg", "ZvVdjXH06ug", "dI6_E2HSmmE", "euOKAH_QStE"],
  related: [
    { label: "PPF packages & pricing", href: "/services/ppf" },
    { label: "Ceramic coating packages", href: "/services/ceramic-coating" },
    { label: "Ceramic vs carbon vs dyed tint", href: "/ceramic-vs-carbon-vs-dyed-tint" },
    { label: "Tesla PPF", href: "/tesla-ppf" },
    { label: "Get a Quote", href: "/get-a-quote" },
    { label: "FAQ", href: "/faq" },
  ],
};

export const TINT_COMPARISON: ComparisonData = {
  path: "/ceramic-vs-carbon-vs-dyed-tint",
  title: "Ceramic vs Carbon vs Dyed Window Tint: Which Is Worth It?",
  description: "Ceramic, carbon, and dyed window tint compared: heat rejection, UV and glare, fading, signal interference, and Virginia tint law. Which film is worth it in Chantilly, VA.",
  eyebrow: "Window tint compared",
  h1: "CERAMIC VS CARBON VS DYED TINT: WHAT YOU'RE ACTUALLY PAYING FOR",
  intro: "Two cars can look identically dark and feel completely different in July traffic on Route 28. The shade is the same; the film is not. Dyed film blocks light. Carbon film blocks some heat. Ceramic film blocks most of the infrared heat without going darker or interfering with your phone, GPS, or Tesla's connectivity. Here is what separates them, and why we only install ceramic.",
  breadcrumb: "Ceramic vs Carbon vs Dyed Tint",
  columns: [
    { key: "dyed", name: "Dyed Tint", sub: "Entry-level film", bestFor: "Looks only. Cheapest way to get a dark car; fades, turns purple, and does little for heat." },
    { key: "carbon", name: "Carbon Tint", sub: "Mid-tier film", bestFor: "A step up: no purple fade and moderate heat rejection, but still well short of ceramic on infrared." },
    { key: "ceramic", name: "Ceramic Tint", sub: "GeoShield Pro Nano Ceramic", href: "/services/window-tinting", bestFor: "Real heat rejection, 99% UV, signal-safe, lifetime warranty. The only film we install." },
  ],
  rows: [
    { label: "Heat (infrared) rejection", cells: { dyed: { mark: "no", text: "Low. Dyed film absorbs light, not infrared heat; the glass still radiates into the cabin." }, carbon: { mark: "partial", text: "Moderate, roughly 40–60% IR depending on the film." }, ceramic: { mark: "yes", text: "80–83% IR rejection on GeoShield Pro Nano Ceramic." } } },
    { label: "UV rejection", cells: { dyed: { mark: "partial", text: "Most block UV early on, but the dye breaks down." }, carbon: { mark: "yes", text: "Around 99%." }, ceramic: { mark: "yes", text: "99% UV, stable for the life of the film." } } },
    { label: "Glare reduction", cells: { dyed: { mark: "yes", text: "Yes, by going dark." }, carbon: { mark: "yes", text: "Yes." }, ceramic: { mark: "yes", text: "Yes, at any shade, including light legal front windows." } } },
    { label: "Fading / turning purple", cells: { dyed: { mark: "no", text: "Yes, within 2–5 years in Virginia sun." }, carbon: { mark: "yes", text: "Does not turn purple." }, ceramic: { mark: "yes", text: "Color-stable; lifetime warranty against fading and bubbling." } } },
    { label: "Phone, GPS, key fob, EV signal", cells: { dyed: { mark: "yes", text: "No interference (no metal)." }, carbon: { mark: "yes", text: "No interference." }, ceramic: { mark: "yes", text: "Non-metalized, signal-safe." } } },
    { label: "Clarity & night visibility", cells: { dyed: { mark: "partial", text: "Can look hazy; darker shades hurt night vision." }, carbon: { mark: "partial", text: "Slight matte look on some films." }, ceramic: { mark: "yes", text: "Clearest of the three; blocks heat without needing to be dark." } } },
    { label: "Virginia-legal options", cells: { dyed: { text: "Must be 50% front / 35% rear on sedans, same as any film." }, carbon: { text: "Same limits." }, ceramic: { text: "Same limits, but a 50% ceramic front window still rejects most heat." } } },
    { label: "Warranty", cells: { dyed: { text: "Often 1–3 years, if any." }, carbon: { text: "Usually limited lifetime on the film only." }, ceramic: { text: "GeoShield nationwide lifetime warranty on film and labor at Skyline." } } },
  ],
  verdicts: [
    { title: "Skip dyed tint", body: "It is the film that turns purple and bubbles on cars you see around Fairfax County. The savings disappear the first time it has to be stripped and redone, which costs more than tinting it right once.", href: "/services/window-tinting", cta: "See ceramic tint options" },
    { title: "Carbon: fine, but ask why", body: "Carbon is a reasonable middle option at a shop that carries it. The step up to ceramic is small on a sedan, and the heat difference on a black interior in August is not small.", href: "/faq", cta: "Tint FAQ" },
    { title: "Ceramic: what we install", body: "Every car at Skyline gets GeoShield Pro Nano Ceramic. Real IR rejection, signal-safe for Teslas and EVs, and a lifetime warranty backed by us in Chantilly. Add the windshield for the full effect.", href: "/get-a-quote?service=tint", cta: "Get a tint quote" },
  ],
  faqs: [
    { q: "Is ceramic tint worth the extra cost over carbon?", a: "For most Northern Virginia drivers, yes. Ceramic rejects roughly 80% of infrared heat versus about half for carbon, so the cabin cools faster and the AC works less. The difference in price is small next to the difference in comfort, and ceramic carries a lifetime warranty." },
    { q: "Does ceramic tint have to be dark to block heat?", a: "No. Heat rejection comes from the nano-ceramic layer, not the shade. A 50% front-window ceramic film that is legal in Virginia still blocks most infrared heat and 99% of UV." },
    { q: "Does ceramic tint interfere with phone signal, GPS, or Tesla connectivity?", a: "No. GeoShield Pro Nano Ceramic is non-metalized, so it does not affect cell, GPS, satellite radio, key fobs, toll transponders, or EV connectivity. Metalized films were the ones that caused problems." },
    { q: "What tint is legal in Virginia?", a: "On sedans, front side windows must let in at least 50% of light and rear side and back windows at least 35%. SUVs, trucks, and vans may go darker behind the front doors. Only a non-reflective strip above the AS-1 line is allowed on the windshield. We install to these limits and can help with medical exemption paperwork." },
    { q: "Why does cheap tint turn purple?", a: "Dyed film uses a layer of dye to darken the glass, and UV breaks the dye down over a few years. Carbon and ceramic films get their color and performance from carbon or ceramic particles that do not degrade, so they stay the same shade for the life of the film." },
    { q: "How much does ceramic window tint cost in Chantilly, VA?", a: "It depends on how many windows you tint and the shade you choose. Every package is GeoShield Pro Nano Ceramic with a lifetime warranty. Send us your vehicle through the free quote form and we reply with an exact price, usually within the hour." },
  ],
  videoIds: ["C3k3BF33d7o", "SugVScEKEWM", "284uuWTiKAg", "pxpi-uF0eO0", "FsQ8yZxh4Es"],
  related: [
    { label: "Window tinting packages", href: "/services/window-tinting" },
    { label: "PPF vs ceramic coating", href: "/ppf-vs-ceramic-coating" },
    { label: "Tint FAQ", href: "/faq" },
    { label: "Videos", href: "/videos" },
    { label: "Get a Quote", href: "/get-a-quote" },
    { label: "Chantilly window tinting", href: "/window-tinting-chantilly-va" },
  ],
};
