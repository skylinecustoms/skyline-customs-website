/**
 * Single source of truth for PPF packages and FAQ used by the PPF pillar page
 * (/services/ppf), the cost guide (/ppf-cost) and the vehicle pages.
 * The site does not publish prices; every page points to the free quote form.
 */
import type { VehicleClass } from "@/lib/modelPpf";

export interface PpfPackage {
  key: "partial" | "fullFront" | "fullFrontPlus";
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
    bestFor: "Trucks, SUVs, and anything that sees gravel, trails, or lots of passengers. Our most complete package.",
    installTime: "One to two days",
    image: "/images/CvygVrceuSyvFqPY.webp",
  },
];

export const VEHICLE_CLASSES: { key: VehicleClass; label: string; examples: string }[] = [
  { key: "sedan", label: "Sedan / coupe", examples: "Tesla Model 3, BMW 3 Series, Porsche 911, Corvette" },
  { key: "suv", label: "SUV / crossover", examples: "Model Y, X5, Macan, 4Runner, Grand Cherokee" },
  { key: "truck", label: "Truck / large SUV", examples: "Cybertruck, Rivian R1T, Tacoma, Escalade, G-Wagon" },
];

export const PPF_FAQS: { q: string; a: string }[] = [
  { q: "How much does PPF cost in Northern Virginia?", a: "Pricing depends on the vehicle and how much you cover, and we confirm every number at an in-person inspection. Send us the year, make, model, and the coverage you want through the free quote form and we reply with an exact price, usually within the hour. Every install includes decontamination, computer-cut STEK DYNOshield film, and the 12-year manufacturer warranty." },
  { q: "How long does PPF last?", a: "STEK DYNOshield carries a 12-year manufacturer warranty against yellowing, cracking, peeling, and delamination. With hand washing and no automatic brush washes, most installs look new well past ten years." },
  { q: "Is PPF worth it?", a: "If you drive Northern Virginia highways, yes. One bumper respray with fender blends takes the car off the road, and never matches factory paint. Full-front film prevents that damage in the first place and comes off cleanly if you sell or return the car." },
  { q: "Will PPF change how my car looks?", a: "No. DYNOshield is optically clear with no orange peel or haze, so the only difference is a slightly deeper gloss. If you want a satin look, we also install matte (stealth) PPF that turns gloss paint into a factory-style matte finish." },
  { q: "Does PPF self-heal?", a: "Yes. DYNOshield's thermoplastic polyurethane top layer closes light scratches and swirl marks when it warms up in the sun or under hot water. Deep gouges from keys or impacts are not self-healing, but the film takes that damage instead of your paint." },
  { q: "Can I see the edges of the film?", a: "Not on a proper install. We wrap edges under the hood, fenders, and bumper wherever the panel allows instead of leaving a visible seam on the face of the panel. Computer-cut patterns for your exact year and model make that possible without cutting on the car." },
  { q: "How long does a PPF install take?", a: "Partial front is about half a day, full front is one day, and full front extended one to two days. Every install starts with a decontamination wash and paint inspection and ends with a walk-around under high-intensity lighting." },
  { q: "Can I wash my car normally after PPF?", a: "Yes, after a 7-day cure period. Hand wash or touchless wash only; automatic brush washes are what shorten film life. Avoid pressure-washing directly at film edges, and do not wax over the film; a ceramic coating on top is the right way to add gloss and easier cleaning." },
  { q: "Does PPF damage the paint when removed?", a: "No. Professionally removed film leaves factory paint intact, which is why PPF is popular on leases and cars people plan to sell. The paint under the film is usually in better shape than the uncovered panels around it." },
  { q: "Should I get PPF or a ceramic coating?", a: "They do different jobs. Film physically stops rock chips and scratches; a coating adds gloss, chemical resistance, and easy washing but cannot stop a chip. Most customers do both: film on the front end, coating on the whole car, and the coating bonds well to DYNOshield." },
  { q: "Does PPF affect Tesla Autopilot or parking sensors?", a: "No. Film is cut around cameras and ultrasonic sensors and is thin enough that it does not interfere with radar or cameras when installed correctly. We film Teslas, Rivians, and other camera-heavy EVs every week." },
  { q: "Do you offer PPF near Fairfax, Ashburn, Arlington, or Reston?", a: "Yes. Our shop is at 4215 Walney Rd Suite 1A & B in Chantilly, VA, off Route 28 near Dulles, and customers come from all of Fairfax and Loudoun County plus Arlington and Alexandria. Every install happens in our controlled, dust-free bay rather than in a driveway." },
];

export const PPF_COST_FACTORS = [
  { title: "How much you cover", body: "Coverage drives your quote more than anything else. Partial front is the entry point, full front is what most daily drivers choose, and extended adds the rockers and door edges." },
  { title: "Vehicle size", body: "Full-front coverage uses similar material on most vehicles. Extended coverage scales with the size of the rockers and doors, so a truck or large SUV is quoted a little higher than a coupe." },
  { title: "Gloss vs. matte film", body: "Clear DYNOshield is the standard. Matte (stealth) film that converts gloss paint to a satin finish is quoted per vehicle." },
  { title: "Paint condition", body: "Film locks in whatever is under it, so swirled or scratched paint needs correction first. A brand-new car usually needs none; a two-year-old daily driver may need a light polish before the film goes on." },
  { title: "Bundles", body: "Adding a full-car ceramic coating or GeoShield ceramic tint to a PPF install is quoted as a package and costs less than booking each service separately. This month's special includes a free ceramic coating with every full front." },
  { title: "Film brand and installer", body: "Cheaper quotes usually mean bulk film with hand-cut edges and a short warranty. We only install STEK DYNOshield with computer-cut patterns and a 12-year manufacturer warranty, in a dust-free bay, by certified installers." },
];
