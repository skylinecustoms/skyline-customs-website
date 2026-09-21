/**
 * Model-specific PPF pages (/tesla-model-y-ppf, /cybertruck-ppf, ...).
 * People search by model, not brand, so each page is written for one car:
 * where it gets hit, what each package covers on that body, sensors and
 * paint quirks, trims, and questions owners of that model actually ask.
 * No prices; three packages only (partial front, full front, full front extended).
 */
import type { PpfPackage } from "@/lib/ppf";

export interface ModelPage {
  /** URL slug: "tesla-model-y" -> /tesla-model-y-ppf */
  slug: string;
  name: string;
  make: string;
  brandPage: { name: string; href: string };
  seoTitle: string;
  seoDescription: string;
  eyebrow: string;
  h1: string;
  intro: string[];
  /** Where this model takes damage */
  hits: { title: string; desc: string }[];
  /** What each package means on this body */
  coverage: { pkg: PpfPackage["key"]; note: string }[];
  /** Model-specific install detail */
  details: { title: string; body: string }[];
  trims: { name: string; note: string }[];
  faqs: { q: string; a: string }[];
  /** Matched against gallery alt text for the "from the bay" strip */
  photoMatch: RegExp;
  videoIds: string[];
}

export const MODEL_PAGES: ModelPage[] = [
  {
    slug: "tesla-model-y",
    name: "Tesla Model Y",
    make: "Tesla",
    brandPage: { name: "Tesla PPF", href: "/tesla-ppf" },
    seoTitle: "Tesla Model Y PPF in Chantilly, VA | Full Front Paint Protection",
    seoDescription: "Paint protection film for the Tesla Model Y in Chantilly, VA. Full front STEK film cut around the cameras, the soft-paint problem explained, and what each package covers. Free quotes.",
    eyebrow: "Tesla Model Y",
    h1: "MODEL Y PAINT PROTECTION FILM",
    intro: [
      "The Model Y is the most common car in our bay and the one whose owners come back with chips soonest. Tesla's paint is thin, the front bumper sits low, and most Model Ys in Northern Virginia spend their day on the Toll Road, Route 28, or I-66 behind trucks. Full front PPF is the fix, and on a Model Y it goes on in one day.",
      "This page covers what actually happens to a Model Y's paint around here, what our three packages mean on this body, how the film works around the cameras and sensors, and what the Juniper refresh changed. If you already know you want full front, the quote form takes thirty seconds.",
    ],
    hits: [
      { title: "Front bumper, low and wide", desc: "The Model Y bumper sits close to the road and takes the gravel spray from the car ahead. Chips here show as white dots on every color except white." },
      { title: "The leading edge of the hood", desc: "Stones that clear the bumper land on the first six inches of the hood. This is where partial front stops and full front keeps going." },
      { title: "Mirror caps and headlights", desc: "Both face straight into the airstream. Pitted headlights yellow early, and mirror caps chip because they are plastic with thin paint." },
      { title: "Soft paint everywhere", desc: "Tesla paint swirls from one brush wash and marks from a careless towel. The self-healing STEK top coat is why so many Model Y owners film the front." },
    ],
    coverage: [
      { pkg: "partial", note: "Bumper, the leading 18 inches of the hood, the front edge of each fender, and the mirror caps. The film line sits partway up the hood; on white it disappears, on darker colors it is visible up close." },
      { pkg: "fullFront", note: "Whole hood as one piece, both fenders, the bumper, mirrors, headlights, and A-pillars. No line on the hood. This is what most Model Y owners choose, and it is the package we recommend for a daily-driven Y." },
      { pkg: "fullFrontPlus", note: "Adds the rocker panels, door edges, and door cups. Worth it for a Model Y with kids in the back, a garage with tight walls, or regular trips on gravel." },
    ],
    details: [
      { title: "Cameras and sensors stay clear", body: "The Model Y has a forward camera behind the windshield and, depending on year, ultrasonic sensors in the bumper. Our patterns are cut for the exact year so every sensor window stays open and Autopilot and parking assist work as before. Nothing is filmed over a lens." },
      { title: "Edges wrapped, not cut on the car", body: "The hood pattern wraps under the hood lip and the fender patterns tuck into the wheel-arch gap, so there is no exposed edge to catch dirt. We never cut film on the car; every piece is computer-cut before it touches the paint." },
      { title: "Juniper and pre-refresh differences", body: "The 2025 Juniper refresh changed the front bumper and added the light bar, so it uses a different pattern than a 2020 to 2024 car. We carry both. Tell us the year and we cut the right one." },
    ],
    trims: [
      { name: "Model Y Long Range RWD / AWD", note: "Same body as Performance; full front is the common choice." },
      { name: "Model Y Performance", note: "Adds a lip spoiler and lower ride; many owners take full front extended for the rockers." },
      { name: "Model Y Juniper (2025+)", note: "New bumper and light bar patterns; film goes on the same day as delivery for most customers." },
    ],
    faqs: [
      { q: "Should I get PPF before I pick up my Model Y?", a: "Book it for the week of delivery. New Tesla paint has no chips to hide and the film goes on invisibly. Many customers drive from the Tysons or Sterling delivery center straight to our Chantilly shop." },
      { q: "Does PPF on a Model Y affect the front camera or Autopilot?", a: "No. The film is cut around the camera housing and the bumper sensors, so nothing changes for Autopilot, Smart Summon, or parking assist." },
      { q: "Is white Model Y paint worth protecting?", a: "Yes. White hides chips better than black or blue, but the primer under a chip is gray and shows, and Tesla's white is still soft. Most of our Model Y jobs are white cars." },
      { q: "How long does full front PPF take on a Model Y?", a: "One day. Drop off at 9 AM and pick up in the afternoon. Adding a ceramic coating makes it two days." },
      { q: "Can you add a ceramic coating over the film?", a: "Yes, and most Model Y owners do. The coating goes over the film and the rest of the paint so the whole car sheds water and washes with a rinse." },
    ],
    photoMatch: /model y/i,
    videoIds: ["dI6_E2HSmmE"],
  },
  {
    slug: "tesla-model-3",
    name: "Tesla Model 3",
    make: "Tesla",
    brandPage: { name: "Tesla PPF", href: "/tesla-ppf" },
    seoTitle: "Tesla Model 3 PPF in Chantilly, VA | Full Front Paint Protection",
    seoDescription: "Paint protection film for the Tesla Model 3 in Chantilly, VA. Full front STEK film for the low bumper and thin paint, Highland and pre-refresh patterns, and what each package covers. Free quotes.",
    eyebrow: "Tesla Model 3",
    h1: "MODEL 3 PAINT PROTECTION FILM",
    intro: [
      "The Model 3 sits lower than the Model Y, which puts its bumper right in the gravel stream on I-66 and the Toll Road. Add Tesla's thin, soft paint and a Model 3 front end can look five years old after one winter. Full front PPF stops that, and on a Model 3 it is a one-day install.",
      "Below is what we see on Model 3s from Northern Virginia, how the three packages map onto this body, how the film works around the cameras, and what changed with the Highland refresh.",
    ],
    hits: [
      { title: "A bumper at gravel height", desc: "The Model 3's low nose takes stones head-on. Most Model 3s that come in unprotected have a peppered lower bumper within the first year." },
      { title: "Hood chips at eye level", desc: "The long, low hood catches stones that skip over the bumper. On a sedan you look down at the hood every time you approach the car." },
      { title: "Mirrors and headlights", desc: "The mirror caps chip and the headlights pit. Full front covers both; partial front covers the mirrors only." },
      { title: "Swirls from any wash", desc: "Model 3 paint marks from brush washes and drying towels. The self-healing top coat erases the light stuff in the sun." },
    ],
    coverage: [
      { pkg: "partial", note: "Bumper, first 18 inches of the hood, fender edges, and mirrors. Covers the impact zone on a budget with a visible line on the hood of darker cars." },
      { pkg: "fullFront", note: "Full hood, both fenders, bumper, mirrors, headlights, and A-pillars. No hood line, which matters on a low sedan. Our recommendation for a Model 3 that commutes." },
      { pkg: "fullFrontPlus", note: "Adds rockers, door edges, and door cups. Good for a Model 3 that street-parks or rides on gravel." },
    ],
    details: [
      { title: "Highland versus pre-refresh", body: "The 2024 Highland refresh changed the bumper, headlights, and hood, so it uses its own pattern set. We cut for the exact year, so tell us whether the car is Highland or earlier." },
      { title: "Cameras and sensors", body: "The forward camera behind the glass and, on older cars, the bumper sensors are all cut around. Autopilot and parking assist are unaffected." },
      { title: "Edges tucked under", body: "Hood edges wrap under the lip and fender edges tuck into the arch. No exposed film edge on the panels you see." },
    ],
    trims: [
      { name: "Model 3 RWD / Long Range", note: "Same body; full front is the common choice." },
      { name: "Model 3 Performance", note: "Lower front lip and carbon spoiler; many owners add the rockers with full front extended." },
      { name: "Model 3 Highland (2024+)", note: "New front-end patterns; film usually goes on within the delivery week." },
    ],
    faqs: [
      { q: "Is the Model 3's paint really that soft?", a: "Yes. It is one of the most common reasons owners choose PPF. The film takes the chips and the self-healing top coat takes the swirls." },
      { q: "Will full front PPF show a line on my black Model 3?", a: "No. Full front covers the whole hood as one piece, so there is no line. Partial front stops partway up the hood and shows on dark colors." },
      { q: "Does the film change how the car looks?", a: "Gloss film is invisible on a clean car. Owners who want a stealth look choose a satin film on the front, which turns gloss paint matte only where the film is applied." },
      { q: "How long does it take?", a: "Full front is one day. Full front extended or a ceramic coating on top adds a day." },
      { q: "Can you PPF a Model 3 that already has chips?", a: "Yes. Small chips are touched up so they stay stable, then the film goes on. Badly pitted bumpers are better repainted first so the film has a smooth surface." },
    ],
    photoMatch: /model 3/i,
    videoIds: ["dI6_E2HSmmE"],
  },
  {
    slug: "cybertruck",
    name: "Tesla Cybertruck",
    make: "Tesla",
    brandPage: { name: "Tesla PPF", href: "/tesla-ppf" },
    seoTitle: "Cybertruck PPF in Chantilly, VA | Stainless Steel Protection Film",
    seoDescription: "Paint protection film for the Tesla Cybertruck in Chantilly, VA. Clear or satin STEK film on the stainless panels stops scratches and fingerprints; what each package covers and why the coating matters. Free quotes.",
    eyebrow: "Tesla Cybertruck",
    h1: "CYBERTRUCK PROTECTION FILM",
    intro: [
      "There is no paint on a Cybertruck, so people ask why it needs PPF. The stainless steel panels cannot chip, but they scratch, show every fingerprint, and pick up rust-colored spots from road iron if they sit dirty. Film on the front takes the scratches instead of the steel, and a ceramic coating on top keeps the fingerprints off.",
      "We have filmed several Cybertrucks in our Chantilly shop, in clear and in satin. This page covers what the stainless actually does on Route 28, what each package means on a body with no curves, and why the coating is not optional on this truck.",
    ],
    hits: [
      { title: "Scratches, not chips", desc: "Gravel that would chip paint leaves bright scratches in the brushed stainless. There is no repainting them out; the film takes them and self-heals the light ones." },
      { title: "Fingerprints and water spots", desc: "Bare stainless shows every touch and every dried drop. A ceramic coating over the film and the exposed steel is what keeps the truck looking clean." },
      { title: "Road iron and rust spots", desc: "Brake dust and rail-line iron particles embed in the surface and rust in place. A coated surface releases them in a wash instead of holding them." },
      { title: "Flat panels, sharp edges", desc: "The Cybertruck's flat panels show any film edge, so the pattern has to be cut to the panel edges exactly. Our patterns are cut for the truck, not adapted from a car." },
    ],
    coverage: [
      { pkg: "partial", note: "The lower nose and the leading edge of the hood panel plus the mirror housings. Covers the strike zone but leaves a visible edge on the flat hood." },
      { pkg: "fullFront", note: "The full hood panel, the front fenders, the lower nose, mirrors, and the light bar surround. Edges land on the panel breaks, so nothing shows. This is the package every Cybertruck we have done has taken." },
      { pkg: "fullFrontPlus", note: "Adds the sail panels, door edges, and door cups. Recommended for trucks that see gravel or trailheads, which is most of them." },
    ],
    details: [
      { title: "Clear or satin", body: "Clear film disappears on the brushed finish and keeps the factory look. Satin film gives the truck the stealth look many owners want without a full wrap. Either way the stainless underneath stays as delivered and the film comes off cleanly later." },
      { title: "Cut for stainless panel edges", body: "The Cybertruck's panels meet at hard creases, so the patterns are cut to those creases rather than wrapped around curves. The film ends exactly on the panel edge and the seams disappear into the body lines." },
      { title: "Coating is part of the job", body: "Uncoated stainless fingerprints the moment it is touched. We coat the film and the exposed steel so the truck rinses clean and the brushed finish stays uniform." },
    ],
    trims: [
      { name: "Cybertruck AWD", note: "Full front with a coating is the standard job." },
      { name: "Cyberbeast", note: "Same panels; owners tend to add the sail panels and door edges." },
      { name: "Cybertruck RWD", note: "Same front end; full front covers it." },
    ],
    faqs: [
      { q: "Why does a truck with no paint need PPF?", a: "Because stainless scratches and cannot be repainted. The film takes the scratches, self-heals the light ones, and comes off cleanly later with the steel untouched." },
      { q: "Does clear film change the look of the stainless?", a: "No. Clear film is invisible on the brushed finish. Satin film is the choice if you want the stealth look." },
      { q: "Can you film the whole truck in satin?", a: "We focus on the front and the wear areas. Full front and full front extended cover the panels that take damage; for a full satin look on every panel, ask us and we will point you to the right shop." },
      { q: "How do I keep the fingerprints off?", a: "The ceramic coating we apply over the film and the steel. Coated stainless does not hold fingerprints or water spots; a rinse clears it." },
      { q: "How long does a Cybertruck take?", a: "Full front is one day; with the coating, plan on two." },
    ],
    photoMatch: /cybertruck/i,
    videoIds: ["dI6_E2HSmmE"],
  },
  {
    slug: "porsche-911",
    name: "Porsche 911",
    make: "Porsche",
    brandPage: { name: "Porsche PPF", href: "/porsche-ppf" },
    seoTitle: "Porsche 911 PPF in Chantilly, VA | Full Front Paint Protection Film",
    seoDescription: "Paint protection film for the Porsche 911 in Chantilly, VA. Full front STEK film for the 992 and 991, front-lift and sensor cutouts, PTS paint, and what each package covers. Free quotes.",
    eyebrow: "Porsche 911",
    h1: "911 PAINT PROTECTION FILM",
    intro: [
      "A 911 front end is the most expensive nose in Northern Virginia to repaint well: a three-stage color, a bumper that blends into the fenders, and paint-to-sample options that cannot be matched from a code. Full front PPF on a 911 is not a luxury add-on, it is the cheapest way to keep the factory paint you paid for.",
      "We film 992 and 991 cars in our Chantilly shop, from Carrera to GT3. This page covers where a 911 takes damage, what each package means on this body, how we handle the front-axle lift and sensors, and what to think about with PTS colors.",
    ],
    hits: [
      { title: "The bumper and the intakes", desc: "The 911's bumper is one wide face with cooling intakes at gravel height. Stones strike the painted lips between the intakes first." },
      { title: "The front trunk lid", desc: "The frunk lid is low and long, and stones that clear the bumper land across it. On a 911 you see this panel every time you walk up." },
      { title: "Fenders and headlights", desc: "The headlights sit high on the fenders and pit from road grit. Full front covers both; the lights on a 911 are expensive to replace." },
      { title: "Track and canyon miles", desc: "Tire pickup and marbles from a track day pepper the front end. The self-healing STEK top coat handles that kind of damage." },
    ],
    coverage: [
      { pkg: "partial", note: "Bumper, the leading part of the frunk lid, fender edges, and mirrors. On a 911 the line across the lid is visible, which is why few owners stop here." },
      { pkg: "fullFront", note: "Full frunk lid, both fenders, the bumper, mirrors, headlights, and A-pillars, with edges wrapped under the lid and into the arches. The standard 911 job." },
      { pkg: "fullFrontPlus", note: "Adds rocker panels, door edges, and door cups. Recommended for cars that see track days, canyon roads, or valet parking." },
    ],
    details: [
      { title: "Front-axle lift and sensors", body: "Cars with the front-axle lift and parking sensors have the sensor windows cut out precisely; nothing is filmed over. The film follows the bumper's intake edges so there is no lifting at speed." },
      { title: "Paint-to-sample and special colors", body: "PTS and Exclusive Manufaktur colors are the strongest case for film: a chip cannot be touched up from a paint code. Every 911 gets a panel-by-panel inspection and correction before film so nothing is locked in." },
      { title: "992 and 991 patterns", body: "The 992's wider body and different bumper use their own pattern set, as do the 991.1 and 991.2. GT3, Turbo, and GTS bumpers differ again. We cut for the exact trim." },
    ],
    trims: [
      { name: "911 Carrera / Carrera S / 4S", note: "Full front is the standard job; most add the rockers." },
      { name: "911 GTS", note: "Sport Design front with larger intakes; pattern differs from Carrera." },
      { name: "911 Turbo / Turbo S", note: "Wider body and unique bumper; full front extended is common." },
      { name: "911 GT3 / GT3 RS", note: "Track cars; full front extended with rockers, plus the front splitter face." },
    ],
    faqs: [
      { q: "Does PPF lift or peel at highway speed on a 911?", a: "No. The patterns are cut to the bumper's intake edges and every edge is wrapped or tucked, then heat-set. The film is rated well beyond any speed the car will see on I-66." },
      { q: "Can you film a GT3 with the front splitter?", a: "Yes. The painted bumper and the splitter face are covered in full front; the bare carbon or plastic splitter is left as is or coated." },
      { q: "Is the film visible on a light PTS color?", a: "Gloss film is invisible on a properly prepared surface, light or dark. The car is corrected before film so no swirls show through." },
      { q: "How long does a 911 take?", a: "Full front is one day; full front extended or a ceramic coating adds a day. We schedule 911s for a full inspection first." },
      { q: "Will the film affect the value when I sell?", a: "Kept factory paint under film is a selling point for a 911, and the film can be removed without harming the paint if a buyer prefers." },
    ],
    photoMatch: /911|porsche/i,
    videoIds: ["ZvVdjXH06ug"],
  },
];

export const modelPageBySlug = (slug: string) => MODEL_PAGES.find((m) => m.slug === slug);
