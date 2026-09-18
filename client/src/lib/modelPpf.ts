/**
 * Vehicle-specific PPF landing pages (/bmw-ppf, /porsche-ppf, ...).
 * Pricing follows the shop's standard classes; copy is brand-specific.
 */

export type VehicleClass = "sedan" | "suv" | "truck";

export interface VehicleBrand {
  slug: string;            // "bmw" -> /bmw-ppf
  name: string;            // "BMW"
  headline: string;        // hero second line
  seoTitle: string;
  seoDescription: string;
  intro: string;
  /** Regex matched against gallery photo alt text to show real jobs of this brand */
  photoMatch: RegExp;
  /** YouTube IDs from lib/videos.ts relevant to this brand */
  videoIds: string[];
  models: { name: string; cls: VehicleClass; note: string }[];
  reasons: { title: string; desc: string }[];
  faqs: { q: string; a: string }[];
}

const shared = {
  install: { q: "How long does the install take?", a: "Full front is usually one day; full front extended one to two days. Every job starts with a decontamination wash and ends with our walk-and-pay inspection under high-intensity lighting before you pay." },
  warranty: { q: "What warranty comes with the film?", a: "STEK DYNOshield carries a 12-year manufacturer warranty against yellowing, cracking, and peeling, and it self-heals light scratches and swirl marks with heat." },
  ceramic: { q: "Should I add a ceramic coating on top?", a: "Yes. A coating over the film keeps it hydrophobic, protects it from UV and bird droppings, and makes the whole car easier to wash. Our monthly specials often bundle the two." },
};

export const VEHICLE_BRANDS: VehicleBrand[] = [
  {
    slug: "bmw", name: "BMW", headline: "PPF",
    seoTitle: "BMW PPF Northern Virginia | 3 Series, 5 Series, X3, X5, iX & M Paint Protection",
    seoDescription: "BMW paint protection film in Chantilly, VA. Self-healing STEK DYNOshield, computer-cut for 3 Series, M3, 5 Series, X3, X5, iX, and M models. 12-year warranty.",
    intro: "BMW's modern clear coat is thin, the front bumpers are large and low, and the kidney grilles and lower intakes take the brunt of every highway mile on I-66 and the Toll Road. Film on the front end is the single most common request we get from BMW owners in Northern Virginia, from M340i daily drivers to iX EVs.",
    photoMatch: /bmw/i,
    videoIds: ["ZvVdjXH06ug"],
    models: [
      { name: "3 Series / M3", cls: "sedan", note: "Low nose and wide kidney grille surround chip first." },
      { name: "5 Series / M5", cls: "sedan", note: "Long hood collects highway debris on the Toll Road." },
      { name: "4 Series / M4", cls: "sedan", note: "Aggressive front bumper edges and splitters." },
      { name: "X3 / X4", cls: "suv", note: "Tall front end takes hits square on." },
      { name: "X5 / X6 / X7", cls: "suv", note: "Big hood, big mirrors, big targets." },
      { name: "iX / i4 / i5", cls: "suv", note: "Protect the paint and the resale on a new EV." },
    ],
    reasons: [
      { title: "M-Specific Patterns", desc: "Computer-cut patterns for M bumpers, splitters, and mirror caps, not generic templates trimmed on the car." },
      { title: "Frozen & Matte Finishes", desc: "Stealth film keeps BMW Individual frozen paints matte and protected instead of glossing them over." },
      { title: "Lease-Return Ready", desc: "Film peels off cleanly at turn-in, so a leased BMW goes back with factory paint and no chip charges." },
    ],
    faqs: [
      { q: "Does PPF affect BMW's warranty?", a: "No. Paint protection film is a removable product that does not alter the vehicle or its paint. It has no effect on BMW's new-vehicle or paint warranty." },
      { q: "Can you protect frozen or matte BMW paint?", a: "Yes. We use stealth (matte) STEK film that preserves the satin look of BMW Individual frozen colors while adding the same self-healing protection." },
      { q: "How much does BMW PPF cost?", a: "Pricing depends on the vehicle and how much you cover, and we confirm every number at an in-person inspection. Send us the year, make, model, and the coverage you want through the free quote form and we reply with an exact price, usually within the hour." },
      shared.install, shared.warranty, shared.ceramic,
    ],
  },
  {
    slug: "porsche", name: "Porsche", headline: "PPF",
    seoTitle: "Porsche PPF Northern Virginia | 911, Cayman, Taycan, Macan & Cayenne Paint Protection",
    seoDescription: "Porsche paint protection film in Chantilly, VA. Self-healing STEK DYNOshield, computer-cut for 911, Cayman, Boxster, Taycan, Macan, and Cayenne. Full front and full front extended coverage. 12-year warranty. Free quotes.",
    intro: "Porsche owners in Northern Virginia drive their cars, whether that means a Cayenne on the Beltway every day, a 911 to Skyline Drive on Sunday, or a GT car to Summit Point for a track day. Wide front bumpers, exposed radiator intakes, and painted rocker panels mean the film needs to cover more than a partial kit does, and most Porsche customers choose full front with rockers.",
    photoMatch: /porsche/i,
    videoIds: ["ZvVdjXH06ug"],
    models: [
      { name: "911 (992 / 991)", cls: "sedan", note: "Wide front with three intakes; rockers and rear arches see track debris." },
      { name: "718 Cayman / Boxster", cls: "sedan", note: "Low nose, side intakes ahead of the rear wheels chip badly." },
      { name: "Taycan", cls: "sedan", note: "Long, low hood and big front bumper on a daily-driven EV." },
      { name: "Macan", cls: "suv", note: "The daily Porsche; full front is the usual choice." },
      { name: "Cayenne", cls: "suv", note: "Tall front and large hood on Northern Virginia highways." },
      { name: "Panamera", cls: "sedan", note: "Long hood and wide fenders; full front covers a lot of paint." },
    ],
    reasons: [
      { title: "Track-Day Coverage", desc: "Full front, rockers, and rear-arch pieces for cars that see Summit Point, Dominion, or VIR." },
      { title: "Precision Around Intakes", desc: "Patterns wrap the front intakes and lower lip so there are no exposed edges in the airflow." },
      { title: "Protects Value", desc: "Porsche resale rewards original paint. Film keeps it original." },
    ],
    faqs: [
      { q: "Can you wrap the front intakes and lower lip on a 911?", a: "Yes. Our computer-cut patterns wrap the intake edges and lower lip, and we hand-finish the tight radii so the edges are tucked, not trimmed short." },
      { q: "Is PPF worth it on a Porsche that only sees weekends?", a: "Weekend cars often see the worst roads: Skyline Drive gravel, Route 211 construction, and track paddocks. Film on the front and rockers is the difference between a clean car and a respray at resale." },
      { q: "How much does Porsche PPF cost?", a: "Pricing depends on the vehicle and how much you cover, and we confirm every number at an in-person inspection. Send us the year, make, model, and the coverage you want through the free quote form and we reply with an exact price, usually within the hour." },
      shared.install, shared.warranty, shared.ceramic,
    ],
  },
  {
    slug: "corvette", name: "Corvette", headline: "PPF",
    seoTitle: "Corvette PPF Northern Virginia | C8 Stingray, Z06 & E-Ray Paint Protection Film",
    seoDescription: "Corvette paint protection film in Chantilly, VA. Full-front STEK DYNOshield for C8 Stingray, Z06, E-Ray, and C7, computer-cut and self-healing with a 12-year warranty. Free quotes.",
    intro: "The mid-engine C8 puts a low, wide nose and a front splitter inches off the pavement, right where every pebble on I-66 and Route 28 lands. We've filmed C8 Stingrays, Z06s, and E-Rays in the Chantilly bay, and Corvette owners are the group most likely to protect the front end from day one.",
    photoMatch: /corvette|c8/i,
    videoIds: ["euOKAH_QStE", "U0hjC5pdMZM"],
    models: [
      { name: "C8 Stingray", cls: "sedan", note: "Low nose and splitter; side intakes ahead of the rear wheels." },
      { name: "C8 Z06", cls: "sedan", note: "Wider body, bigger intakes, carbon aero worth protecting." },
      { name: "C8 E-Ray", cls: "sedan", note: "All-wheel drive means it gets driven in the rain and the grit." },
      { name: "C7 Stingray / Z06", cls: "sedan", note: "Long hood and front fascia chip quickly on highway miles." },
    ],
    reasons: [
      { title: "C8 Specialists", desc: "We know where a C8 chips: the splitter, the nose, the fender tops, and the rockers behind the front tires. Full front extended covers all of it." },
      { title: "Splitter & Intake Coverage", desc: "Film on the front splitter, rocker extensions, and side intakes where the paint gets sandblasted." },
      { title: "Gloss or Stealth", desc: "Keep the factory gloss or convert to a satin look with stealth film while protecting the paint underneath." },
    ],
    faqs: [
      { q: "Can you film the Corvette's front splitter and side intakes?", a: "Yes. Those are the first pieces to chip, and our C8 patterns include the splitter, rocker extensions, and the side intake surrounds." },
      { q: "What should I cover on a C8?", a: "Full front at minimum: nose, splitter, hood, fenders, mirrors, and headlights. Most C8 owners add the extended package because the rockers and lower doors sit right behind the front tires and catch what they throw." },
      { q: "How much does Corvette PPF cost?", a: "Pricing depends on the vehicle and how much you cover, and we confirm every number at an in-person inspection. Send us the year, make, model, and the coverage you want through the free quote form and we reply with an exact price, usually within the hour." },
      shared.install, shared.warranty, shared.ceramic,
    ],
  },
  {
    slug: "rivian", name: "Rivian", headline: "PPF",
    seoTitle: "Rivian PPF Northern Virginia | R1T & R1S Paint Protection Film in Chantilly, VA",
    seoDescription: "Rivian R1T and R1S paint protection film in Chantilly, VA. Self-healing STEK DYNOshield, computer-cut around the cameras and sensors. Full front and full front extended coverage. 12-year warranty. Free quotes.",
    intro: "Rivians get used the way they were designed to be: gravel roads out past Leesburg, trailheads in Shenandoah, and daily commutes on the Dulles Toll Road. The tall front end, wide fenders, and painted rocker area on the R1T and R1S take constant abuse, and because Rivian paint is only available in a handful of colors, keeping the original finish matters for resale.",
    photoMatch: /rivian/i,
    videoIds: [],
    models: [
      { name: "R1T", cls: "truck", note: "Tall nose, gear tunnel, and painted bedsides that catch trail debris." },
      { name: "R1S", cls: "suv", note: "Family SUV that still sees gravel; full front is the baseline." },
      { name: "R2 / R3", cls: "suv", note: "We'll have patterns ready as deliveries begin." },
    ],
    reasons: [
      { title: "Sensor-Safe Patterns", desc: "Film is cut around every camera, sensor, and the charge port door so Driver+ and the gear tunnel work normally." },
      { title: "Adventure Coverage", desc: "Rocker, fender-flare, and lower-door pieces for owners who use the off-road modes." },
      { title: "Matte Options", desc: "Stealth film for a satin look on Rivian's flat colors, with the same self-healing protection." },
    ],
    faqs: [
      { q: "Does PPF interfere with Rivian's cameras or sensors?", a: "No. Our patterns are trimmed around every camera, ultrasonic sensor, and the charge port door, so nothing that needs a clear view is covered." },
      { q: "What coverage makes sense for off-road use?", a: "Full front plus rockers and lower doors at minimum. Owners who run trails regularly choose full front extended so the rockers and door edges take the branch scratches and self-heal instead of scarring paint." },
      { q: "How much does Rivian PPF cost?", a: "Pricing depends on the vehicle and how much you cover, and we confirm every number at an in-person inspection. Send us the year, make, model, and the coverage you want through the free quote form and we reply with an exact price, usually within the hour." },
      shared.install, shared.warranty, shared.ceramic,
    ],
  },
  {
    slug: "bronco", name: "Bronco", headline: "PPF",
    seoTitle: "Ford Bronco PPF Northern Virginia | Rocker, Fender & Full Front Paint Protection",
    seoDescription: "Ford Bronco paint protection film in Chantilly, VA. Self-healing STEK DYNOshield for Bronco, Bronco Raptor, and Bronco Sport: full front with rocker and fender-flare coverage for trail use. 12-year warranty.",
    intro: "Broncos live two lives in Northern Virginia: commuting on I-66 during the week and running trails, beaches, and gravel on the weekend. Fender flares, rocker panels, and the flat hood take the abuse, and with the doors and roof coming off, the door edges and jambs get more wear than on any other vehicle we see. We've filmed and tinted Broncos in the Chantilly bay, and the same STEK DYNOshield film covers all of it.",
    photoMatch: /bronco/i,
    videoIds: ["FsQ8yZxh4Es"],
    models: [
      { name: "Bronco 2-Door / 4-Door", cls: "suv", note: "Flat hood and tall grille take direct hits; rockers see trail damage." },
      { name: "Bronco Raptor", cls: "suv", note: "Wider flares and more paint exposed to gravel." },
      { name: "Bronco Sport", cls: "suv", note: "Crossover duty; full front is the usual pick." },
    ],
    reasons: [
      { title: "Trail Coverage", desc: "Rocker panels, fender flares, lower doors, and the tailgate area, where branches and rocks actually hit." },
      { title: "Door & Roof Removal Ready", desc: "Film on door edges, jambs, and the hard-top seams so taking it apart doesn't leave marks." },
      { title: "Matte Ready", desc: "Stealth film for Broncos with matte or satin finishes, protected without adding gloss." },
    ],
    faqs: [
      { q: "Can you protect the fender flares and rocker panels?", a: "Yes, and on a Bronco we recommend it. Trail scratches on the flares and rockers self-heal on film instead of gouging paint." },
      { q: "Does the film hold up if I take the doors and roof off?", a: "Yes. The film is bonded to the paint, not the seams. We film door edges and jambs so repeated removal doesn't chip them." },
      { q: "How much does Bronco PPF cost?", a: "Pricing depends on the vehicle and how much you cover, and we confirm every number at an in-person inspection. Send us the year, make, model, and the coverage you want through the free quote form and we reply with an exact price, usually within the hour. Raptor flares are quoted separately." },
      shared.install, shared.warranty, shared.ceramic,
    ],
  },
];

export const brandBySlug = (slug: string) => VEHICLE_BRANDS.find((b) => b.slug === slug);
