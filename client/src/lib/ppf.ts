/**
 * Single source of truth for PPF packages, prices, and FAQ used by the PPF
 * pillar page (/services/ppf), the cost page (/ppf-cost) and the vehicle pages.
 * Prices mirror the shop price list; confirm at inspection.
 */
import { PPF_PRICES, type VehicleClass } from "@/lib/modelPpf";

export interface PpfPackage {
  key: keyof (typeof PPF_PRICES)["sedan"];
  name: string;
  tagline: string;
  coverage: string[];
  bestFor: string;
  installTime: string;
  image: string;
  featured?: boolean;
}

export const PPF_PACKAGES: PpfPackage[] = [
  {
    key: "partial",
    name: "Partial Front",
    tagline: "High-impact zones only",
    coverage: ["Full front bumper", "Leading 18\" of the hood", "Leading edge of both fenders", "Side mirrors"],
    bestFor: "Budget protection for the panels that take the most rock chips.",
    installTime: "Half a day",
    image: "/images/NguTnAOoECcVqDUI.webp",
  },
  {
    key: "fullFront",
    name: "Full Front",
    tagline: "What most drivers choose",
    coverage: ["Full hood", "Full front bumper", "Both full fenders", "Side mirrors", "Headlights", "A-pillars"],
    bestFor: "Commuters on I-66, Route 28, and the Toll Road. No visible film line on the hood.",
    installTime: "One day",
    image: "/images/CfKThxbsmkQPistt.webp",
    featured: true,
  },
  {
    key: "fullFrontPlus",
    name: "Full Front Extended",
    tagline: "Front end plus the wear areas",
    coverage: ["Everything in Full Front", "Rocker panels", "Door edges and door cups", "Door strips", "A-pillars (halfway)"],
    bestFor: "Trucks, SUVs, and anything that sees gravel, trails, or lots of passengers.",
    installTime: "One to two days",
    image: "/images/CvygVrceuSyvFqPY.webp",
  },
  {
    key: "fullVehicle",
    name: "Full Vehicle",
    tagline: "Every painted panel",
    coverage: ["Every painted panel", "Full roof and pillars", "All doors and quarter panels", "Trunk and rear bumper", "Matte (stealth) finish available"],
    bestFor: "New exotics, collector cars, and anyone keeping the car for the long haul.",
    installTime: "Two to three days",
    image: "/images/lUHfbPByiOnODTUs.webp",
  },
];

export const VEHICLE_CLASSES: { key: VehicleClass; label: string; examples: string }[] = [
  { key: "sedan", label: "Sedan / coupe", examples: "Tesla Model 3, BMW 3 Series, Porsche 911, Corvette" },
  { key: "suv", label: "SUV / crossover", examples: "Model Y, X5, Macan, 4Runner, Grand Cherokee" },
  { key: "truck", label: "Truck / large SUV", examples: "Cybertruck, Rivian R1T, Tacoma, Escalade, G-Wagon" },
];

export const priceFor = (pkg: PpfPackage["key"], cls: VehicleClass) => PPF_PRICES[cls][pkg];

export const PPF_FAQS: { q: string; a: string }[] = [
  { q: "How much does PPF cost in Northern Virginia?", a: "At Skyline Customs in Chantilly, partial front is $1,800, full front is $2,400 on any vehicle, full front extended (adds rockers and door edges) is $3,200, and full-vehicle coverage is $4,500 for sedans, $5,500 for SUVs, and $6,000 for trucks. Prices are confirmed at an in-person inspection and include decontamination, computer-cut STEK DYNOshield film, and the 12-year manufacturer warranty." },
  { q: "How long does PPF last?", a: "STEK DYNOshield carries a 12-year manufacturer warranty against yellowing, cracking, peeling, and delamination. With hand washing and no automatic brush washes, most installs look new well past ten years." },
  { q: "Is PPF worth it?", a: "If you drive Northern Virginia highways, yes. One bumper respray with fender blends costs real money, takes the car off the road, and never matches factory paint. Full-front film prevents that damage in the first place and comes off cleanly if you sell or return the car." },
  { q: "Will PPF change how my car looks?", a: "No. DYNOshield is optically clear with no orange peel or haze, so the only difference is a slightly deeper gloss. If you want a satin look, we also install matte (stealth) PPF that turns gloss paint into a factory-style matte finish." },
  { q: "Does PPF self-heal?", a: "Yes. DYNOshield's thermoplastic polyurethane top layer closes light scratches and swirl marks when it warms up in the sun or under hot water. Deep gouges from keys or impacts are not self-healing, but the film takes that damage instead of your paint." },
  { q: "Can I see the edges of the film?", a: "Not on a proper install. We wrap edges under the hood, fenders, and bumper wherever the panel allows instead of leaving a visible seam on the face of the panel. Computer-cut patterns for your exact year and model make that possible without cutting on the car." },
  { q: "How long does a PPF install take?", a: "Partial front is about half a day, full front is one day, full front extended one to two days, and full vehicle two to three days. Every install starts with a decontamination wash and paint inspection and ends with a walk-around under high-intensity lighting." },
  { q: "Can I wash my car normally after PPF?", a: "Yes, after a 7-day cure period. Hand wash or touchless wash only; automatic brush washes are what shorten film life. Avoid pressure-washing directly at film edges, and do not wax over the film; a ceramic coating on top is the right way to add gloss and easier cleaning." },
  { q: "Does PPF damage the paint when removed?", a: "No. Professionally removed film leaves factory paint intact, which is why PPF is popular on leases and cars people plan to sell. The paint under the film is usually in better shape than the uncovered panels around it." },
  { q: "Should I get PPF or a ceramic coating?", a: "They do different jobs. Film physically stops rock chips and scratches; a coating adds gloss, chemical resistance, and easy washing but cannot stop a chip. Most customers do both: film on the front end, coating on the whole car, and the coating bonds well to DYNOshield." },
  { q: "Does PPF affect Tesla Autopilot or parking sensors?", a: "No. Film is cut around cameras and ultrasonic sensors and is thin enough that it does not interfere with radar or cameras when installed correctly. We film Teslas, Rivians, and other camera-heavy EVs every week." },
  { q: "Do you offer PPF near Fairfax, Ashburn, Arlington, or Reston?", a: "Yes. Our shop is at 4215 Walney Rd Suite 1A & B in Chantilly, VA, off Route 28 near Dulles, and customers come from all of Fairfax and Loudoun County plus Arlington and Alexandria. Every install happens in our controlled, dust-free bay rather than in a driveway." },
];

export const PPF_COST_FACTORS = [
  { title: "How much you cover", body: "Coverage drives price more than anything else. Partial front is $1,800, full front $2,400, extended $3,200, and full vehicle $4,500 to $6,000. Most daily drivers land on full front because it protects every panel that actually takes chips." },
  { title: "Vehicle size", body: "Full front is the same $2,400 on a Model 3 or a Cybertruck. Full-vehicle coverage scales with panel area: $4,500 for a sedan or coupe, $5,500 for an SUV, $6,000 for a truck or large SUV." },
  { title: "Gloss vs. matte film", body: "Clear DYNOshield is the standard price. Matte (stealth) film that converts gloss paint to a satin finish is quoted per vehicle because it is normally installed on the whole car." },
  { title: "Paint condition", body: "Film locks in whatever is under it, so swirled or scratched paint needs correction first. A brand-new car usually needs none; a two-year-old daily driver may need a light polish before the film goes on." },
  { title: "Bundles", body: "Full front PPF plus a full-car ceramic coating is $3,300 without correction, and adding GeoShield ceramic tint brings it to $3,750, our most popular combo. Full vehicle PPF plus ceramic is $6,500 and includes tint." },
  { title: "Film brand and installer", body: "Cheaper quotes usually mean bulk film with hand-cut edges and a short warranty. We only install STEK DYNOshield with computer-cut patterns and a 12-year manufacturer warranty, in a dust-free bay, by certified installers." },
];
