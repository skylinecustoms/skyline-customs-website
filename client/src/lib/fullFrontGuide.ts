/**
 * Content for the full front PPF authority page at /full-front-ppf.
 * Package facts mirror client/src/lib/ppf.ts and the short answers in
 * client/src/lib/ppfQuestions.ts; keep them in sync. No prices on this page.
 */
export type GuideBlock =
  | { type: "p"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "quote"; text: string };

export interface GuideSection {
  id: string;
  heading: string;
  blocks: GuideBlock[];
}

export const FULL_FRONT_GUIDE = {
  title: "Full Front PPF in Northern Virginia: The Complete Guide",
  description: "What full front PPF covers, why the front end takes the chips, how a one-day STEK DYNOshield install works in Chantilly, VA, and the mistakes to avoid.",
  eyebrow: "The full front PPF specialists",
  h1: "Everything We Know About Full Front PPF",
  intro: [
    "Full front paint protection film covers every surface that faces the road at highway speed: the full hood, front bumper, both fenders, mirror caps, headlights, and A-pillars. It is the right coverage for a DMV commuter because that is where the stones land, and because the film edge hides under the hood lip instead of crossing the middle of a panel.",
    "Skyline Customs installs full front PPF in Chantilly, VA for drivers from across Northern Virginia, Maryland, and DC. STEK DYNOshield only, computer-cut for the exact year and model, by STEK-certified technicians, in one day. This guide is what we tell customers at the counter. The short version is on our [paint protection film packages](/services/ppf) page.",
  ],
  sections: [
    {
      id: "what-is-full-front",
      heading: "What full front PPF covers, panel by panel",
      blocks: [
        { type: "p", text: "Full front is a specific list of panels, and each one is there for a reason." },
        { type: "ul", items: [
          "Full hood. One piece from the front lip to the cowl, edge wrapped under the lip where the pattern allows. No seam across the panel, no exposed edge to collect dirt. It is the panel a buyer checks first.",
          "Front bumper. The lowest, most forward painted surface, so it takes the most direct hits. Patterns cut around sensors, cameras, and grille openings.",
          "Both fenders. The whole panel, not just the leading edge. Stones from the next lane land on the fender tops, and the fender-to-hood seam chips first on most cars.",
          "Mirror caps. Small, forward-facing, painted. For their size they chip faster than anything else on the car.",
          "Headlights. Polycarbonate lenses pit and haze from sand long before paint does.",
          "A-pillars. They catch the high stones that clear the hood, and they are expensive to repaint because of the glass on both sides.",
        ] },
        { type: "p", text: "Doors, rockers, and the roof are not included. They belong to the extended package, covered below." },
      ],
    },
    {
      id: "why-the-front",
      heading: "Why the front end takes the damage",
      blocks: [
        { type: "p", text: "A rock chip is simple physics. The tire ahead of you flings a stone backward and upward, and your car drives into it. The faster both cars are moving, the harder the hit and the higher it lands. At parking-lot speed a stone barely reaches the bumper. At highway speed it clears the bumper and lands on the upper hood, the fender tops, the mirrors, and the A-pillars." },
        { type: "p", text: "Northern Virginia is hard on paint for that reason. I-66 and Route 28 have been under construction for years, and the trucks hauling fill shed gravel every mile. Route 50, Route 7, the Toll Road, and the Beltway add sand after every winter storm. Follow a dump truck for one exit at 65 mph and you can come home with a dozen fresh chips. See [does PPF stop rock chips on I-66 and Route 28](/blog/does-ppf-stop-rock-chips-i-66-route-28-northern-virginia)." },
        { type: "p", text: "This is why the partial front line fails a commuter. Partial front covers the bumper and the leading 18 inches of the hood, the right zone at low speed. At highway speed the stones clear that line and land at inch 20, inch 30, and on the fender tops, where there is no film. The partial hood edge also sits in the open on a flat panel, collecting a faint line of dirt that shows on light paint." },
        { type: "quote", text: "If the car sees I-66 or Route 28 more than a couple of times a week, the upper hood will chip. Covering the whole hood is the difference between film that works and film that almost works." },
      ],
    },
    {
      id: "partial-vs-full-vs-extended",
      heading: "Partial front vs full front vs full front extended",
      blocks: [
        { type: "p", text: "We install three packages and only three. Here is who needs which." },
        { type: "ul", items: [
          "Partial front: bumper, leading 18 inches of the hood, fender edges, mirrors. About half a day. Right for a garage-kept weekend car, a short lease where the bumper is the only worry, or a budget split across two visits. The hood line is visible up close, and upgrading later means re-filming the hood.",
          "Full front: full hood, bumper, both fenders, mirrors, headlights, A-pillars. One day. Right for any car that commutes, road-trips, or sits in traffic behind trucks. It is what most of our customers choose.",
          "Full front extended: everything in full front plus rocker panels, door edges, and door cups. One to two days. Right for lifted trucks, SUVs with wide rockers, anything that sees gravel, and cars parked in tight garages. Our most complete package.",
        ] },
        { type: "p", text: "The row-by-row version is at [partial front vs full front PPF](/partial-front-vs-full-front-ppf). Our one-line answer: full front, unless the car never leaves the neighborhood or the rockers get hit as often as the bumper." },
      ],
    },
    {
      id: "full-front-vs-full-body",
      heading: "Full front vs full body: why we steer most drivers to full front",
      blocks: [
        { type: "p", text: "Full body PPF covers every painted panel: doors, quarter panels, roof, trunk, rear bumper, all of it. It is the most protection you can put on a car, and for a few cars it is the right call. For the daily drivers that fill most of our bay, full front is the smarter buy. Here is the thinking behind that, from a shop that installs both." },
        { type: "h3", text: "Where the damage actually lands" },
        { type: "p", text: "Rock chips come from stones thrown by the tires ahead of you, so they hit the surfaces that face forward: hood, bumper, fenders, mirrors, headlights. Doors and quarter panels sit behind the front wheels and in the shadow of the mirrors, so they see a fraction of the strikes. What doors collect instead is parking-lot damage, door dings and shopping-cart scrapes, and no film stops a dent. Rear bumpers get scuffed by curbs and bumper-to-bumper parking in Arlington and DC, which is a repaint either way. When we inspect cars at pickup and again a year later, nearly every impact mark on a commuter is on the front end. Full front puts the film exactly where the hits are." },
        { type: "h3", text: "Diminishing returns on the back half" },
        { type: "ul", items: [
          "Full body uses several times the film and labor of full front, for panels that take a small share of the impacts. The protection per panel on the back half is real, but the protection per dollar is nowhere near the front.",
          "Every added panel is another set of edges, relief cuts, and trim pieces to work around: door handles, badges, fuel door, window trim. Done well they disappear. They are still edges you are paying for on panels that rarely get hit.",
          "Nothing about full front is wasted if you want more later. The film matches, the patterns exist for every panel, and we add rockers, door edges, or whole doors to a full front car all the time.",
          "A car with full front PPF and a Gtechniq ceramic coating over everything is protected from stones where stones land and easy to wash everywhere else. That combination is what most of our customers drive away with.",
        ] },
        { type: "h3", text: "When full body is the right call" },
        { type: "ul", items: [
          "A car that sees gravel roads, track days, or a long unpaved driveway every week, where stones hit the sides and rear too.",
          "Soft or exotic paint on a car you plan to keep for a decade and want to stay flawless on every panel.",
          "A matte or satin factory finish, where a single scratch cannot be polished out, so film on every panel is the only way to keep it uniform.",
          "You simply want everything covered and the budget is not the deciding factor. We do these, we do them well, and once a season we give one away: every completed [Fall Special](/promo) full front job is entered to win a full body install.",
        ] },
        { type: "quote", text: "Film goes where the stones go. On a commuter that is the front, and the front is where your money works hardest." },
        { type: "p", text: "Our advice: start with full front. If the car and the way you drive it call for more, add it. If you are weighing the three front packages against each other rather than against full body, the [partial vs full front comparison](/partial-front-vs-full-front-ppf) walks through where the lines fall." },
      ],
    },
    {
      id: "the-film",
      heading: "The film: STEK DYNOshield",
      blocks: [
        { type: "p", text: "DYNOshield is a thermoplastic polyurethane film roughly eight thousandths of an inch thick, several times thicker than a factory clear coat. That thickness is what absorbs a stone. The film takes a small dent, most of which relax out on a warm day, and the paint under it never feels the impact." },
        { type: "p", text: "On top is a self-healing, hydrophobic top coat. Light scratches and wash swirls close in the sun or under warm water, and water beads off the film before any coating is added. Underneath is an adhesive that bonds to clear coat and lifts cleanly with heat years later, which matters for leases and resale." },
        { type: "p", text: "STEK backs it with a 12-year manufacturer warranty against yellowing, cracking, peeling, and delamination. We chose DYNOshield after installing other premium films on Northern Virginia daily drivers and watching them age: the top coat stays clearer on dark paint, the warranty is one plain number, and the patterns keep up with new models. The full case is in [STEK vs XPEL PPF](/stek-vs-xpel-ppf)." },
      ],
    },
    {
      id: "computer-cut-vs-hand-cut",
      heading: "Computer-cut patterns vs hand-cut film",
      blocks: [
        { type: "p", text: "There are two ways to get film onto a hood. Lay bulk film over the panel and trim it with a razor blade on the car, or plot a pattern for the exact year, model, and trim on a cutting table and install the finished piece. We only do the second." },
        { type: "p", text: "Hand-cutting puts a blade on your clear coat, and even a careful installer leaves score lines you find the day the film comes off. A hand-cut edge is also trimmed short so the blade does not slip, leaving bare paint and an exposed edge that catches dirt and lifts." },
        { type: "p", text: "A computer-cut pattern is drawn from a scan of the actual panel. It includes the material to wrap under the hood lip, around fender edges, and into the bumper-to-grille gap, plus relief cuts for sensors, cameras, washer nozzles, and badges. Edges wrap wherever the pattern allows, so the film disappears, and no blade touches the car. Where a panel cannot be wrapped, such as a sensor housing, the pattern leaves a clean straight edge in the least visible place, and we show you where before we start." },
      ],
    },
    {
      id: "the-install-day",
      heading: "Install day, step by step",
      blocks: [
        { type: "p", text: "Full front is a one-day job at our Chantilly shop. Drop off in the morning, pick up that afternoon. Here is what happens in between." },
        { type: "ol", items: [
          "Decontamination wash. Foam, two-bucket hand wash, iron and tar removers, and clay on each panel getting film. Anything left on the paint gets sealed under the film for twelve years.",
          "Paint inspection. Under high-intensity lights we check for chips, swirls, and prior repaint. A new car usually needs nothing; a two-year-old daily driver often needs a light polish first, because film locks in whatever is beneath it.",
          "Panel prep. A solvent wipe removes polish oils and wax so the adhesive bonds to bare clear coat.",
          "Patterns plotted. The DYNOshield patterns for your exact year, model, and trim are cut on the plotter, off the car.",
          "Slip solution and lay. Each piece floats onto the panel on slip solution, gets positioned, and is locked at the anchor points with tack solution.",
          "Squeegee. Firm, overlapping strokes push the solution from the center to the edges. Done fast, the haze you see a week later is trapped solution.",
          "Edge wrapping. Heat and a glove tuck the extra material under the hood lip, around the fender edge, and into the bumper gaps. Wrapped edges are what keep film down for a decade.",
          "Cure. The car sits in the dust-controlled bay under heat so the adhesive sets before it sees weather.",
          "Lighting walk-around. Before you pay the balance, you and the installer walk each panel under high-intensity lighting. If there is a flaw, it gets fixed before you leave.",
        ] },
        { type: "p", text: "At pickup the car looks like it did at drop-off, only glossier. The only way to find the film is a fingernail across the hood lip." },
      ],
    },
    {
      id: "by-body-type",
      heading: "Full front by body type",
      blocks: [
        { type: "p", text: "The panels are the same on every car. The way they take hits is not." },
        { type: "ul", items: [
          "Sedans and coupes. A low hood sits right in the arc of a highway stone, so the upper hood and A-pillars take more than their share. Full front with no hood line is the whole point on a dark sedan.",
          "SUVs and trucks. A tall, flat grille and hood face the stones head-on, and the front tires throw gravel back at the rockers, which is why most owners add the extended package. See [truck PPF](/truck-ppf), [SUV PPF](/suv-ppf), the [Toyota 4Runner](/toyota-4runner-ppf), and the [Tesla Model Y](/tesla-model-y-ppf).",
          "EVs. Factory paint on most EVs is thin, and the bumpers are full of sensors and cameras. Our patterns cut around every one, and the film is thin enough that cameras and radar behind it work normally. Start at [EV PPF](/ev-ppf).",
          "Sports cars. A low splitter and a nose inches off the road put the bumper in the path of every stone, and the frunk lid on a mid-engine car chips like a hood. We film the [Corvette C8](/corvette-c8-ppf) and the [Porsche 911](/porsche-911-ppf) every month.",
        ] },
      ],
    },
    {
      id: "ceramic-over-film",
      heading: "Ceramic coating goes over the film, not under it",
      blocks: [
        { type: "p", text: "Film stops impacts on the panels it covers. A ceramic coating adds gloss, chemical resistance, and easy washing to all of the paint, but it is microns thick and stops no stone. The best setup for a daily driver is both: full front film, then a Gtechniq coating over the film and the bare paint together." },
        { type: "p", text: "Film goes on first, always. A cured coating is too slick for film adhesive to grip, so coating a panel and filming it afterward means lifted edges. The sequence is wash, correction, film, then coating over everything. Gtechniq bonds well to the DYNOshield top coat, and the coated film sheds grit for years instead of weeks." },
        { type: "p", text: "We offer Gtechniq Crystal Serum Light with a 5-year warranty and Crystal Serum Ultra with a 7-year warranty; see the [ceramic coating page](/services/ceramic-coating) and [PPF vs ceramic coating](/ppf-vs-ceramic-coating). Adding a coating usually makes the install two days." },
      ],
    },
    {
      id: "living-with-it",
      heading: "Living with full front PPF",
      blocks: [
        { type: "h3", text: "The first seven days" },
        { type: "p", text: "Do not wash the car. The adhesive is still setting, and water forced at an edge can lift it. Small moisture pockets or a faint haze under the film in the first days is slip solution evaporating through the film, and it clears on its own. Do not press on it or pick at an edge." },
        { type: "h3", text: "Washing" },
        { type: "p", text: "After the cure, hand wash: rinse, two buckets, pH-neutral soap, a clean microfiber mitt, straight strokes, and a microfiber drying towel. Touchless washes are fine. Brush washes drag grit across the top coat and can catch an edge. Keep a pressure washer tip a foot from any film edge. The full routine is in [how to wash and care for PPF](/blog/how-to-wash-and-care-for-ppf)." },
        { type: "h3", text: "What not to use" },
        { type: "p", text: "No rubbing compounds, heavy polishes, or wool pads, no solvent-heavy bug and tar removers, and no waxes with dyes or abrasives. A film-safe sealant or a Gtechniq coating is how you add gloss." },
        { type: "h3", text: "Year five and year ten" },
        { type: "p", text: "At year five a properly installed full front looks like year one: clear, no yellowing, no lifted edges. The tell is light pitting on the leading edge of the hood, which is sand hitting film instead of paint. At year ten the film is still two years inside its warranty. If it has eaten a decade of stones, the hood or bumper piece lifts cleanly with heat, the paint underneath is still factory, and a fresh piece goes on. See [how long PPF lasts in Northern Virginia](/blog/how-long-does-ppf-last-northern-virginia)." },
      ],
    },
    {
      id: "common-mistakes",
      heading: "Mistakes we see from other shops",
      blocks: [
        { type: "p", text: "Cars come in for a second opinion every week. These are the problems that keep showing up." },
        { type: "ul", items: [
          "Hand-cut seams. Two pieces joined across a hood, or a hood piece trimmed short of the lip. The seam collects dirt, shows on light paint, and lifts within a year.",
          "Dirt under the film. A speck of dust sealed in looks like a bubble and never goes away. It comes from skipping the decontamination wash or installing with the bay door up.",
          "Unwrapped edges. An edge left on the face of a panel is waiting to catch a wash mitt or a fingernail. The pattern includes the material to wrap; rushed installs skip it.",
          "Bulk film that yellows. Cheap film without a quality top coat goes amber on white paint in a few Virginia summers. If a quote does not name the film, ask.",
          "No paint inspection. Film over a swirled or chipped panel locks the defect in for twelve years.",
          "Blade cuts on the car. Fine score lines in the clear coat along every edge, found the day the film comes off, usually at trade-in.",
          "The two-hour full front. If a quote promises a full front by lunch, something above was skipped.",
        ] },
      ],
    },
    {
      id: "who-we-are",
      heading: "Who we are",
      blocks: [
        { type: "p", text: "Skyline Customs is a paint protection film, ceramic coating, and ceramic window tint shop at 4215 Walney Rd Suite 1A & B in Chantilly, VA, off Route 28 near Dulles. Full front PPF is what we do more than anything else. Our installers are STEK-certified, our bay is dust-controlled, and our Google rating is 5.0 with 140+ five-star reviews, which you can read on our [reviews page](/reviews)." },
        { type: "p", text: "Fairfax, Ashburn, Reston, and Sterling are a few exits up Route 28 or Fairfax County Parkway. Arlington, Alexandria, McLean, and Tysons come out I-66 or Route 7. Bethesda, Rockville, and Silver Spring come around the Beltway. We have pages for [PPF in Fairfax](/ppf-fairfax-va), [PPF in Ashburn](/ppf-ashburn-va), [PPF in Arlington](/ppf-arlington-va), [PPF in Bethesda](/ppf-bethesda-md), and [PPF in Washington DC](/ppf-washington-dc), and the full list is on [service areas](/service-areas)." },
        { type: "p", text: "The [gallery](/gallery) has full fronts on Teslas, BMWs, a Corvette C8 Z06, a Porsche 911, a Rivian R1S, a Lucid Air, and a lineup of 4Runners, Tacomas, Broncos, and Wranglers. The [videos page](/videos) shows the install and a gravel test on a filmed fender." },
      ],
    },
    {
      id: "next-step",
      heading: "How a full front quote works",
      blocks: [
        { type: "p", text: "Pricing depends on coverage and vehicle size, so there is no number on this page. What moves it is on [what drives PPF cost](/ppf-cost)." },
        { type: "ol", items: [
          "Send the year, make, model, and trim, plus a line on how you drive: roads, commute, parking. That tells us whether full front or extended is the right call. Use the [free quote form](/get-a-quote).",
          "We reply with an exact price for the package we recommend, usually within the hour, with the install time and the first open date.",
          "A fully refundable 20% deposit reserves your install date and goes toward the total. Klarna, Afterpay, and Affirm plans are available for the balance.",
          "Drop off in the morning, walk the car under the lights with us that afternoon, and pay the balance when every edge is right.",
        ] },
        { type: "p", text: "Check the [current special](/promo) before you book. And if a friend is still deciding, send them this [full front PPF guide](/full-front-ppf). It is the conversation we would have with them at the counter." },
      ],
    },
  ] as GuideSection[],
  faqs: [
    { q: "Should I get full front or full body PPF?", a: "Full front for almost every daily driver. Rock chips land on the hood, bumper, fenders, mirrors, and headlights, which is exactly what full front covers; doors and rear panels take a small share of the impacts and mostly collect dings that no film stops. Full body makes sense for gravel and track use, soft or exotic paint you want flawless everywhere, or matte finishes. You can always add panels to a full front car later." },
    { q: "What does full front PPF cover?", a: "Full front PPF covers the full hood, the front bumper, both front fenders, the mirror caps, the headlights, and the A-pillars: every surface that faces forward at highway speed. It does not include doors, rockers, or the roof. Full front extended adds rocker panels, door edges, and door cups. Partial front covers only the bumper, the leading 18 inches of the hood, fender edges, and mirrors." },
    { q: "How much does full front PPF cost?", a: "It depends on the vehicle and the package. Full front uses similar material on most cars, so the biggest variables are body size, gloss or matte film, and whether you add a ceramic coating or extend coverage to the rockers and doors. Send us the year, make, and model through the free quote form and we reply with an exact price, usually within the hour." },
    { q: "How long does a full front PPF install take?", a: "One day at our Chantilly shop. Drop off in the morning and pick up that afternoon after a walk-around under high-intensity lights. Every install starts with a decontamination wash and a paint inspection. Adding a Gtechniq ceramic coating over the film usually makes it a two-day job, and full front extended takes one to two days." },
    { q: "Is full front PPF worth it?", a: "For a car that drives I-66, Route 28, the Toll Road, or the Beltway and that you plan to keep, yes. One chipped hood or bumper means a repaint that never matches factory and lowers trade-in value. Full front film in self-healing STEK DYNOshield takes those hits for 12 years under warranty. It is not worth it on a car you are selling in a few months." },
    { q: "Can you see full front PPF once it is installed?", a: "Not on a proper install. DYNOshield is optically clear with no orange peel or haze, so the only difference is slightly deeper gloss. Computer-cut patterns include extra material to wrap under the hood lip, around the fender edges, and into the bumper gaps, so there is no visible edge on the face of a panel. The seam halfway up the hood on a partial front does not exist on a full front." },
    { q: "How long does full front PPF last?", a: "Ten to twelve years or more with hand washing. STEK DYNOshield carries a 12-year manufacturer warranty against yellowing, cracking, peeling, and delamination. At year five a properly installed full front looks like year one. At year ten you may see light pitting on the leading edge of the hood from sand, and the film still lifts cleanly with heat when it is time to replace it." },
    { q: "Does full front PPF cover the windshield or the roof?", a: "No. Full front stops at the A-pillars. It covers the hood, bumper, fenders, mirrors, headlights, and the pillars themselves, which catch the high stones that clear the hood. The windshield is glass and not part of a paint protection package. The roof, doors, and rockers sit behind the A-pillars; rockers and door edges are added by the extended package." },
    { q: "Should I get full front or full front extended?", a: "Full front if the car commutes on highways and parks in a driveway. Full front extended if it is a lifted truck, an SUV with wide rockers, a car that sees gravel, or a car that lives in a tight parking garage where door edges take dings. Extended adds the rocker panels, door edges, and door cups. Tell us how you drive and park and we will tell you which one." },
  ],
};
