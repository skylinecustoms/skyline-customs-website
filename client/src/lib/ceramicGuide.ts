/**
 * Content for the ceramic coating authority page at /ceramic-coating-guide.
 * Same shape as FULL_FRONT_GUIDE in client/src/lib/fullFrontGuide.ts. Coating
 * facts mirror client/src/pages/ServiceCeramic.tsx and the comparison rows in
 * client/src/lib/comparisons.ts; keep them in sync. No prices on this page.
 */
import type { GuideBlock, GuideSection } from "@/lib/fullFrontGuide";

export type { GuideBlock, GuideSection };

export const CERAMIC_GUIDE = {
  title: "Ceramic Coating in Northern Virginia: The Complete Guide",
  description: "What a ceramic coating does and does not do, why paint correction comes first, how a Gtechniq install works in Chantilly, VA, and how to care for it after.",
  eyebrow: "The ceramic coating guide",
  h1: "Everything We Know About Ceramic Coatings",
  intro: [
    "A ceramic coating is a liquid glass layer that bonds to your clear coat and stays there for years. It makes the paint deeper and glossier, sheds water and dirt so the car washes in minutes, and stands between the clear coat and everything that etches it: bird droppings, bug splatter, winter brine, spring pollen, and the sun. It does not stop a rock chip. That job belongs to film.",
    "Skyline Customs installs ceramic coatings in Chantilly, VA, off Route 28 near Dulles, for drivers from across Northern Virginia, Maryland, and DC. Gtechniq Crystal Serum Light and Crystal Serum Ultra, professional-only coatings applied by trained installers with a registered warranty, after the paint has been corrected under lights. This guide is what we tell customers at the counter; the short version is on our [ceramic coating page](/services/ceramic-coating).",
  ],
  sections: [
    {
      id: "what-a-ceramic-coating-is",
      heading: "What a ceramic coating actually is",
      blocks: [
        { type: "p", text: "A ceramic coating is a liquid polymer, mostly silicon dioxide carried in a solvent, wiped onto clean clear coat in a thin, even film. As the solvent flashes off, the silica cross-links and bonds to the paint. What is left is a hard, glass-like layer a few microns thick that does not wash off, soften in the sun, or come off with soap." },
        { type: "p", text: "That bond is the whole difference between a coating and anything in a bottle at the parts store. Wax sits on top of the paint and is held there by nothing. A sealant grips a little better and lasts a season. A professional coating becomes part of the surface, which is why it is measured in years and carries a registered warranty. The chemistry is set by the manufacturer. The surface is on us, which is why most of this guide is about preparation rather than product." },
      ],
    },
    {
      id: "what-it-does-and-does-not-do",
      heading: "What a coating does, and what it does not do",
      blocks: [
        { type: "p", text: "Half the cars that come to us for a second opinion were sold a coating as something it is not." },
        { type: "h3", text: "What it does" },
        { type: "ul", items: [
          "Gloss. A coating fills the microscopic texture of clear coat with a flat, hard layer, so light reflects instead of scattering. Dark paint looks wet.",
          "Hydrophobic surface. Water beads and rolls off instead of drying into spots, and dirt has less to hold onto.",
          "UV and oxidation resistance. The coating absorbs the ultraviolet that dulls clear coat and fades reds and blacks, so a car parked outside in Fairfax keeps its color.",
          "Chemical resistance. Bird droppings, bug acid, sap, and brine etch clear coat within hours on a hot day. On a coating they sit on the surface until you wash them off.",
          "Easy washing. The benefit owners mention most a year later. Road film rinses away and a two-bucket wash takes twenty minutes.",
        ] },
        { type: "h3", text: "What it does not do" },
        { type: "ul", items: [
          "Stop rock chips. A coating is a few microns thick, and a stone off a truck tire on Route 28 goes straight through it. Chip protection is paint protection film, covered below.",
          "Stop scratches. It resists wash marring and light swirls, not a key, a shopping cart, or a brush wash.",
          "Replace washing. A coated car still gets dirty, just slower, and it cleans up faster.",
          "Fix the paint. It locks in whatever is beneath it, which is why correction comes first.",
        ] },
        { type: "quote", text: "A coating keeps the paint you have looking its best for years. Film keeps the paint you have. They are different jobs, and the best cars we send out have both." },
      ],
    },
    {
      id: "coating-vs-wax-vs-sealant",
      heading: "Coating vs wax vs sealant",
      blocks: [
        { type: "p", text: "All three make a car shiny the day they go on. They separate fast." },
        { type: "ul", items: [
          "Carnauba wax. Sits on the paint and gives a warm gloss. It softens in heat, strips with detergent, and is gone in a few weeks through a Virginia summer. Fine on a garage-kept car, as long as you accept it is cosmetic and temporary.",
          "Paint sealant. A synthetic polymer that bonds a little to the clear coat and lasts a season. Better beading than wax, no real chemical resistance.",
          "Professional ceramic coating. Bonds to the clear coat and stays for years. Gloss, hydrophobics, UV and chemical resistance, and a registered warranty. It needs correction and a proper install, which is why it is a shop service.",
        ] },
        { type: "p", text: "The row-by-row version is at [ceramic coating vs wax](/ceramic-coating-vs-wax). Our one-line answer: wax if you love the process, a coating if you want the result to last." },
      ],
    },
    {
      id: "paint-correction-first",
      heading: "Paint correction comes first, always",
      blocks: [
        { type: "p", text: "A coating is optically clear, so it hides nothing. Whatever the paint looks like under the lights the minute before the coating goes on is what it will look like for the next five or seven years. Swirls become glossier swirls. Water spots stay." },
        { type: "p", text: "Correction is machine polishing under high-intensity lights to remove those defects first. Our Crystal package includes a Stage 1 correction, a single polishing step that removes light swirls on most paint. The Ultimate package includes a Stage 2 correction, compounding followed by polishing, for deeper swirls, etching, or holograms from a previous detail." },
        { type: "p", text: "New cars are not exempt. A car that came off a transport truck and through a dealer wash usually has light swirls and a few deeper marks on the hood, and dealers do not correct paint before delivery. We inspect every car at drop-off and tell you what it needs. We will not coat over defects to make a quote cheaper; the owner pays twice that way." },
      ],
    },
    {
      id: "the-coatings-we-install",
      heading: "The coatings we install",
      blocks: [
        { type: "p", text: "Our standard packages use Gtechniq, a professional-only coating line that is not sold to the public. Every install is done by a trained installer and registered with the manufacturer, so the warranty is tied to your car." },
        { type: "h3", text: "Gtechniq Crystal Serum Light" },
        { type: "p", text: "Crystal Serum Light is our five-year coating and the one most customers choose. It is hard, slick, and forgiving of the real world: brine on I-95 in January, pollen in April, whatever falls out of the trees in Reston in August. Our Crystal package pairs it with a Stage 1 correction and a glass coating." },
        { type: "h3", text: "Gtechniq Crystal Serum Ultra" },
        { type: "p", text: "Crystal Serum Ultra is the seven-year flagship for owners who want the hardest, longest-lasting coating Gtechniq makes. It goes on with a Stage 2 correction in our Ultimate package, which also coats the glass, trim, and wheels. Both coatings are finished with the Gtechniq EXO top layer for the slick surface you feel the first time you dry the car." },
        { type: "p", text: "This month we are also running a System X ceramic coating, 9H and SGS lab certified, with a six-year registered transferable warranty, and the glass coating and wheel coating are included. The details are on [this month's ceramic special](/promo-ceramic)." },
      ],
    },
    {
      id: "coating-over-ppf",
      heading: "Coating over film: the combination we recommend most",
      blocks: [
        { type: "p", text: "Paint protection film stops impacts on the panels it covers. A coating adds gloss, chemical resistance, and easy washing to every panel, but it stops no stone. The setup that covers both is film on the front and a coating over everything: STEK DYNOshield on the hood, bumper, fenders, mirrors, headlights, and A-pillars, then Gtechniq over the film and the bare paint together." },
        { type: "p", text: "Film goes on first, always. A cured coating is too slick for film adhesive to grip, so coating a car and filming it later means lifted edges within a year. The sequence is wash, correction, film, then coating over everything. Gtechniq bonds well to the DYNOshield top coat, and coated film sheds grit and bug splatter for years instead of weeks." },
        { type: "p", text: "Adding the coating usually turns a one-day full front install into two days. The coverage is in the [full front PPF guide](/full-front-ppf), the packages are on our [paint protection film](/services/ppf) page, and [PPF vs ceramic coating](/ppf-vs-ceramic-coating) lays the two side by side." },
      ],
    },
    {
      id: "glass-and-wheel-coating",
      heading: "Glass and wheel coating",
      blocks: [
        { type: "p", text: "A glass coating is a hydrophobic layer bonded to the windshield and every window. At speed on the Dulles Toll Road, rain beads and blows off before the wipers get to it, and oncoming headlights stop smearing across a wet windshield at night. Frost scrapes off in a couple of passes." },
        { type: "p", text: "A wheel coating goes on the face and barrel of all four wheels. Brake dust is hot iron that bakes onto a bare wheel and needs an acid cleaner to remove. On a coated wheel it rinses off, and the finish is protected from the pitting uncoated wheels show after a few winters of brine." },
        { type: "p", text: "The glass coating is included in both Gtechniq packages, and the wheel coating in the Ultimate package. Ask about adding wheels to the Crystal package; it is the add-on customers thank us for most." },
      ],
    },
    {
      id: "the-install-day",
      heading: "Install day, step by step",
      blocks: [
        { type: "p", text: "A coating is a one-day install at our Chantilly shop, with the car staying indoors overnight to cure. A Stage 2 correction adds a day." },
        { type: "ol", items: [
          "Decontamination wash. Foam, two-bucket hand wash, and a rinse. Anything left on the paint gets sealed under the coating for years.",
          "Iron decontamination. An iron remover dissolves the brake dust and fallout embedded in the clear coat. On a car that has lived near Route 28 for a few years, the panel turns purple.",
          "Clay. A clay bar lifts what the wash left behind: tar, sap, overspray, and the grit that makes a clean panel feel rough.",
          "Inspection under the lights. High-intensity lights across every panel to map swirls, water spots, scratches, and prior repaint. This is where we confirm Stage 1 or Stage 2.",
          "Paint correction. Machine polishing, one step or two, until the panel reads clean under the lights. The longest part of the day.",
          "Panel wipe. A solvent wipe strips the polishing oils so the coating bonds to bare clear coat.",
          "Coating. Applied panel by panel in small sections, leveled before it flashes, and checked for high spots. Glass, trim, and wheels get their own coatings in the same session.",
          "Indoor cure overnight. The coating hardens in the dust-controlled bay. Taking it outside too early is how water spots end up in a new coating for good.",
          "Walk-around. Before you pay the balance, you and the installer walk every panel under the lights, and any high spot gets fixed before you leave.",
        ] },
        { type: "p", text: "At pickup the car looks like it did at drop-off, only deeper and wetter. The first rain tells you the rest." },
      ],
    },
    {
      id: "the-first-week-and-aftercare",
      heading: "The first week, and how to wash it after that",
      blocks: [
        { type: "h3", text: "The first seven days" },
        { type: "p", text: "The coating keeps curing for about a week after pickup. Keep the car dry when you can and do not wash it. If a bird finds it, rinse the spot gently rather than scrubbing. Light rain is fine; a pressure washer, soap, or a brush is not." },
        { type: "h3", text: "Washing" },
        { type: "ul", items: [
          "Hand wash with two buckets, a pH-neutral soap, a clean microfiber mitt, and straight strokes, then dry with a microfiber towel or a blower.",
          "Touchless washes are fine. Automatic brush washes are not. The brushes carry grit from every car ahead of you and grind it in, which is how a coating ends up with the swirls it was supposed to prevent.",
          "A rinse after a salty drive matters more than a full wash. Brine left on a coating for weeks mutes the hydrophobics until it is rinsed off.",
          "Wash every two weeks or so. Bird droppings are easier to rinse off at day two than at day twenty.",
        ] },
        { type: "h3", text: "What not to put on it" },
        { type: "p", text: "No wax on top. Wax clogs the surface, kills the beading, and gains you nothing. No abrasive polishes or compounds, which remove the coating, and no wheel acids on the paint. A coating-safe spray detailer from the same manufacturer is the only thing we recommend between washes." },
        { type: "h3", text: "Yearly inspection" },
        { type: "p", text: "Bring the car back once a year. We check the coating under the lights, decontaminate the surface, and top it up where the hydrophobics have slowed, which keeps the warranty current." },
      ],
    },
    {
      id: "how-long-it-lasts-in-northern-virginia",
      heading: "How long a coating lasts in Northern Virginia",
      blocks: [
        { type: "p", text: "Crystal Serum Light is warrantied for five years and Crystal Serum Ultra for seven, and a properly installed coating on a hand-washed car reaches those numbers. What shortens the life is what lands on the car and how long it stays." },
        { type: "ul", items: [
          "Winter brine. VDOT pre-treats I-95, I-66, and the Beltway before every storm, and the brine dries into a white film that holds moisture against the paint. A rinse within a few days of each storm is the biggest thing a winter commuter can do.",
          "Spring pollen. The yellow dust that coats every car in Fairfax and Loudoun in April is mildly acidic when wet. On a coating it rinses off.",
          "Bird droppings. Cars parked under the trees in Reston and Burke collect them daily through summer. A coating buys you days instead of hours to deal with them.",
          "Sun. A car on a street in Arlington or Alexandria sees far more UV than one in a Loudoun garage. A garaged car will outrun its warranty; a street-parked car will reach it with proper care.",
          "Wash method. A coating washed by hand lasts years longer than the same coating run through a brush wash every Saturday.",
        ] },
        { type: "quote", text: "The coating does not care what year it is. It cares whether brine sat on it all winter and whether the car has ever been through a brush wash." },
      ],
    },
    {
      id: "mistakes-to-avoid",
      heading: "Mistakes we see every week",
      blocks: [
        { type: "p", text: "Cars come in to have a first coating fixed often enough that we keep a list." },
        { type: "ul", items: [
          "DIY spray coatings. A spray bottle with the word ceramic on the label is a sealant with a marketing budget. It beads for a season and is gone inside a year.",
          "Lifetime claims. No coating is permanent, and no manufacturer warranties one for the life of the car. Ask for the warranty term and the registration.",
          "Coating over swirls. A quote that skips correction is cheaper because it skips the part that takes all day. The swirls stay under the coating for five years, glossier than before.",
          "Dealer paint protection packages. The line item at the finance desk is usually a sealant applied by the lot crew, with a warranty written to exclude most of what happens to a car. Decline it.",
          "Coating before film. A coated panel is too slick for film to grip. If you want both, film goes on first.",
          "The two-hour coating. If a shop promises a coating by lunch with no correction, something above was skipped.",
        ] },
      ],
    },
    {
      id: "who-should-get-one",
      heading: "Who should get a coating, who should get film, and who should get both",
      blocks: [
        { type: "p", text: "The answer depends on what the car does all week, not on what it cost." },
        { type: "ul", items: [
          "Get a coating if the car is parked outside or lives under trees. Street parking in Arlington and Alexandria, a driveway in Burke, a commute down the Toll Road to Tysons: these cars take the chemical and UV punishment a coating is built for.",
          "Get film if the car runs I-66, Route 28, or I-95 behind trucks. A coating will not stop the chips. Full front STEK DYNOshield, with a 12-year warranty, keeps the hood and bumper factory. Start at [paint protection film](/services/ppf).",
          "Get both if the car commutes and you plan to keep it. Film on the front, coating over everything. It is what most of our customers in Fairfax, Loudoun, and Prince William choose.",
          "Skip the coating if the car is leaving in a few months, or if waxing it every few weeks is the point. A coating pays off over years.",
        ] },
        { type: "p", text: "Skyline Customs is at 4215 Walney Rd in Chantilly, off Route 28 near Dulles, with 140+ five-star Google reviews. If you are not sure which fits, send the year, make, and model and a line on how you drive and park through the [free quote form](/get-a-quote?service=ceramic). We reply with the package we recommend and the first open date, usually within the hour. A fully refundable 20% deposit reserves the date, and Klarna, Afterpay, and Affirm plans are available for the balance. Check [this month's ceramic special](/promo-ceramic) before you book." },
      ],
    },
  ] as GuideSection[],
  faqs: [
    { q: "What does a ceramic coating actually do?", a: "It bonds a hard, glass-like layer to the clear coat that adds gloss, makes water and dirt roll off, resists UV fading, and stops bird droppings, bug acid, brine, and sap from etching the paint. The car stays cleaner and washes in minutes. It does not stop rock chips or deep scratches." },
    { q: "Does a ceramic coating stop rock chips?", a: "No. A coating is a few microns thick and a stone goes straight through it. Rock chip protection is paint protection film, which is several times thicker than clear coat and absorbs the impact. For a car on I-66 or Route 28, the right setup is full front film with a coating over everything." },
    { q: "How long does a ceramic coating last?", a: "Gtechniq Crystal Serum Light is warrantied for five years and Crystal Serum Ultra for seven, both registered to your car. A hand-washed, garaged car reaches those numbers and usually passes them; a street-parked car run through brush washes will not." },
    { q: "Do I need paint correction before a ceramic coating?", a: "Yes, on almost every car including new ones. A coating is clear and hides nothing, so swirls, water spots, and dealer wash marks under it are sealed in for years. Our packages include a Stage 1 or Stage 2 correction, and we inspect the paint under lights at drop-off." },
    { q: "Can I put a ceramic coating over PPF?", a: "Yes, and it is the combination we recommend most. Film goes on first, then the coating goes over the film and the bare paint together. Gtechniq bonds well to the STEK DYNOshield top coat. Never coat first and film later; a coated panel is too slick for film adhesive to hold." },
    { q: "How long does a ceramic coating install take?", a: "One day at our Chantilly shop, with the car staying indoors overnight to cure and a walk-around under the lights before you pay the balance. A Stage 2 correction adds a day, and a coating over a full front film install is usually two days. Keep the car dry for seven days after pickup." },
    { q: "How do I wash a ceramic coated car?", a: "Two buckets, a pH-neutral soap, a clean microfiber mitt, and a microfiber drying towel, every two weeks or so. Touchless washes are fine; automatic brush washes grind grit into the surface. Do not put wax on top, and rinse the car after a salty winter drive." },
    { q: "Is a ceramic coating worth it on a new car?", a: "A new car is the ideal time, because the paint needs only a light correction and the coating protects it from the first season of pollen, brine, and sun. Most new cars still have transport and dealer wash swirls that we polish out first. If you are also getting film, we do both in one visit." },
    { q: "Is a ceramic coating worth it in Northern Virginia?", a: "For a car that is parked outside or kept for more than a couple of years, yes. Brine on I-95 in winter, pollen in April, bird droppings under the trees in Reston and Burke, and summer sun all etch and dull bare clear coat. A coating turns each of those into a rinse instead of a polish." },
  ],
};
