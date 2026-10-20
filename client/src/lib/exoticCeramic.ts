/**
 * /exotic-car-ceramic-coating: ceramic coating for exotic, luxury, and
 * performance cars across the DMV. Search Console shows "exotic car ceramic
 * coating dmv" and "ceramic coating service dmv" landing on the home page
 * with no dedicated answer; this page is that answer.
 *
 * Rules: no prices (the special's own price lives in its banner), Gtechniq
 * Crystal Serum Light (5-year) and Ultra (7-year) on the standard packages,
 * no full-body PPF wording.
 */

export interface ExoticBrand {
  name: string;
  note: string;
  /** Matched against gallery photo alt text to show real jobs. */
  match: RegExp;
  /** Brand PPF page, when one exists, for the "pair it with film" link. */
  ppfHref?: string;
}

export const EXOTIC_CERAMIC = {
  path: "/exotic-car-ceramic-coating",
  title: "Exotic & Luxury Car Ceramic Coating in the DMV | Chantilly, VA",
  description:
    "Ceramic coating for exotic, luxury, and performance cars across Northern Virginia, DC, and Maryland. Paint correction first, then Gtechniq Crystal Serum Ultra with a 7-year warranty, applied indoors in Chantilly. Porsche, Corvette, BMW M, AMG, Ferrari, Lamborghini, McLaren.",
  hero: "/images/ceramic_1_53c9aefc.webp",
  eyebrow: "Exotic, luxury & performance",
  h1: ["EXOTIC CAR", "CERAMIC COATING"],
  intro: [
    "An exotic or luxury car in the DMV lives a hard life for something that cost that much. It sits in a Tysons or Bethesda parking garage dripping with condensation, it crawls the Beltway behind dump trucks, it gets washed by whoever is closest, and it picks up swirls, water spots, and bug etching that show on a black or deep red finish from across the lot. A ceramic coating is the fix for all of that on a car that deserves better than wax.",
    "Skyline Customs coats Porsches, Corvettes, BMW M cars, AMGs, and the occasional Ferrari, Lamborghini, and McLaren at our shop in Chantilly, twenty minutes from Tysons and forty from downtown DC. Every coating starts with paint correction, the coating is Gtechniq Crystal Serum Ultra with a seven-year warranty, and the car cures indoors overnight before it goes back out.",
  ],
  brands: [
    { name: "Porsche", note: "911, Taycan, Cayman and Boxster, Macan, Cayenne. Soft paint that swirls at the first bad wash and shows every spot on black or Chalk.", match: /porsche|911|taycan|cayman|boxster|macan|cayenne/i, ppfHref: "/porsche-ppf" },
    { name: "Corvette C8", note: "Stingray, E-Ray, Z06. Wide flat panels and deep metallic colors that the coating turns to glass.", match: /corvette|c8|stingray|z06|e-ray/i, ppfHref: "/corvette-ppf" },
    { name: "BMW M", note: "M3, M4, M5, M8, M340i, X5 M. Thin modern clear coat and Frozen finishes that need a coating made for matte.", match: /bmw|m340i|m850|m3\b|m4\b|m5\b|z4/i, ppfHref: "/bmw-ppf" },
    { name: "Mercedes-AMG", note: "C63, E63, GT, GLE 53 and 63. Big painted surfaces that collect water spots in a garage.", match: /mercedes|amg|benz/i },
    { name: "Ferrari, Lamborghini, McLaren", note: "Rosso Corsa, Verde Mantis, Papaya: colors that fade in sun and show swirls under any light. Corrected and coated, they stay the color you paid for.", match: /ferrari|lamborghini|mclaren|huracan|urus|488|f8|720s|artura/i },
    { name: "Bentley, Rolls-Royce, Aston Martin", note: "Deep lacquer finishes and brightwork that chrome cleaners ruin. The coating protects paint and trim and makes the car a rinse-and-dry.", match: /bentley|rolls|aston/i },
  ] as ExoticBrand[],
  sections: [
    {
      heading: "Why an exotic needs a coating more than a daily driver",
      paragraphs: [
        "A daily driver gets washed at a tunnel and nobody looks twice at the swirls. On a Porsche in Jet Black or a Corvette in Torch Red, every swirl, water spot, and etched bird dropping is visible from ten feet, and the car is worth enough that the paint condition shows up in the resale number. Clear coat on these cars is also often softer than on a Toyota: Porsche and BMW paint marks easily, and single-stage and matte finishes cannot be polished back once they are damaged.",
        "A professional ceramic coating puts a hard, slick layer over corrected paint. Water beads off instead of drying into spots, bug acid and bird droppings sit on the coating instead of etching the clear coat, UV stops fading reds and blacks, and the car washes in a fraction of the time with a lot less chance of adding swirls. On a matte or Frozen finish, a matte-specific coating protects the paint without adding the gloss that would ruin the look.",
      ],
    },
    {
      heading: "What the process looks like at Skyline Customs",
      paragraphs: [
        "Day one is prep. The car gets a hand wash, an iron and tar decontamination, and a clay bar, then it comes inside under the lights. We measure paint thickness on every panel before correction, because exotics are often repainted or have thin factory clear, and we correct only as much as the paint can afford. Stage one removes light swirls; stage two and three take out deeper marks and holograms on a car that has been through a few bad details.",
        "Day two is the coating. Gtechniq Crystal Serum Ultra goes on panel by panel in a controlled environment, then the car sits indoors overnight to cure. Glass, wheels, and trim can be coated at the same time so the whole car behaves the same way in the rain. You walk every panel under the lights with us before you pay the balance, and you leave with care instructions and the warranty registered in your name.",
      ],
    },
    {
      heading: "Pairing the coating with paint protection film",
      paragraphs: [
        "A coating resists chemicals, UV, and light swirls. It does not stop a stone from chipping a front bumper at 70 mph on I-66. On a car you drive, the combination that works is full front paint protection film on the hood, bumper, fenders, mirrors, and headlights, with the ceramic coating over the film and the rest of the paint. The film takes the impacts, the coating keeps everything slick and easy to wash, and both are done in the same visit.",
        "Most exotic owners in the DMV book exactly that: full front STEK DYNOshield plus a full-car coating. If the car is a garage queen that only sees Cars and Coffee, the coating alone is often enough. Tell us how the car is used and we will say which one it needs.",
      ],
    },
    {
      heading: "Serving exotic owners across the DMV",
      paragraphs: [
        "Our bay is in Chantilly, Virginia, off Route 28. Owners drive in from McLean, Great Falls, Tysons, and Arlington in twenty to thirty minutes; from Bethesda, Potomac, and DC in about forty-five; and from Loudoun's horse country in fifteen. Drop-off and pickup are by appointment so the car never waits in an open lot, and enclosed transport can be arranged for a car that does not drive in the rain.",
      ],
    },
  ],
  faqs: [
    { q: "Which ceramic coating do you use on exotic and luxury cars?", a: "Gtechniq Crystal Serum Ultra, the professional-only coating with a seven-year warranty, over paint that has been machine corrected. For a car that will be sold within a few years, Crystal Serum Light with a five-year warranty is the lighter option. Matte and Frozen finishes get a matte-specific coating that does not add gloss." },
    { q: "How much does it cost to ceramic coat an exotic car in the DMV?", a: "It depends on the coating, the size of the car, and how much paint correction the finish needs, which we can only judge in person under the lights. Send the year, make, model, and color through the quote form, with a note about the paint's condition, and we reply with an exact price, usually within the hour." },
    { q: "Will paint correction damage my thin clear coat?", a: "Not when it is measured. We take paint thickness readings on every panel before any polishing and correct only as far as the paint allows. Soft Porsche and BMW paint, single-stage colors, and previously repainted panels all get a lighter touch, and we tell you up front which marks will come out and which should stay." },
    { q: "Can you coat a matte or Frozen finish?", a: "Yes. Matte paint cannot be polished, so the coating is the only real protection for it. We use a matte-specific coating that keeps the satin look while adding the same chemical, UV, and water-spot resistance as a gloss coating." },
    { q: "Do you coat the wheels, glass, and carbon fiber too?", a: "Yes. Wheels get a high-temperature coating that keeps brake dust from bonding, glass gets a hydrophobic coating that sheds rain at speed, and exposed carbon fiber and painted calipers can be coated along with the paint. Ask for the whole car and it is done in the same visit." },
    { q: "How long does the car stay with you?", a: "Two days for a coating alone, three when full front paint protection film is added. The car is inside the shop the entire time, including the overnight cure, and it is never left in the lot." },
    { q: "Do you serve Washington, DC and Maryland?", a: "Yes. Exotic owners come to Chantilly from DC, Bethesda, Potomac, Rockville, and Annapolis as well as every part of Northern Virginia. The drive from downtown DC is about forty-five minutes outside rush hour, and we can arrange enclosed transport for a car that should not drive in." },
    { q: "How do I maintain the coating on a car that rarely gets driven?", a: "Hand wash with a pH-neutral soap when it is dirty, never a brush car wash, and keep a ceramic-safe detail spray for dust and fingerprints. A coated car that sits in a garage between drives needs very little; we offer a maintenance detail once or twice a year that keeps the coating performing like new." },
  ],
};
