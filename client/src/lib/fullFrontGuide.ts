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
  h1: "Full Front PPF, Explained by the Shop That Does It Daily",
  intro: [
    "Full front paint protection film covers every painted and lit surface that faces the road at highway speed: the full hood, the front bumper, both fenders, the mirror caps, the headlights, and the A-pillars. It is the right coverage for a car that commutes in the DMV because that is exactly where the stones land, and because the film edge sits under the hood lip instead of across the middle of a panel.",
    "Skyline Customs installs full front PPF in Chantilly, VA for drivers from Fairfax, Loudoun, Arlington, Montgomery County, and the District. We install STEK DYNOshield only, cut by computer for the exact year and model, by STEK-certified technicians, in one day. This guide is everything we tell a customer at the counter, written down. If you only need the short version, our [paint protection film packages](/services/ppf) are listed with what each one covers.",
    "Read it through and you will know more about full front coverage than most of the people selling it.",
  ],
  sections: [
    {
      id: "what-is-full-front",
      heading: "What full front PPF covers, panel by panel",
      blocks: [
        { type: "p", text: "Full front is not a marketing phrase. It is a specific list of panels, and every one of them is on the list for a reason." },
        { type: "ul", items: [
          "Full hood. One piece of film from the front lip to the cowl, with the edge wrapped under the lip where the pattern allows. No seam across the panel, so there is no line to see and no edge for dirt to collect on. The hood is the panel you look at every time you walk up to the car, and the one a buyer looks at first.",
          "Front bumper. The lowest and most forward painted surface, so it takes the most direct hits. Patterns are cut around sensors, cameras, and grille openings so nothing is covered that should not be.",
          "Both fenders. Not the leading edge, the whole panel. Stones thrown at an angle from the lane next to you land on the fender tops and arches, and the fender meets the hood in a seam that chips first on most cars.",
          "Mirror caps. Small, forward-facing, and painted. They chip faster than any other part of the car for their size.",
          "Headlights. Polycarbonate lenses pit and haze from sand long before paint does. Film keeps them clear and keeps the light output where it belongs.",
          "A-pillars. The pillars on either side of the windshield catch the high stones that clear the hood. They are narrow, highly visible, and expensive to repaint because of the glass around them.",
        ] },
        { type: "p", text: "Everything rearward of the A-pillars is not included. Doors, rockers, and the roof belong to the extended package, which we cover below." },
      ],
    },
    {
      id: "why-the-front",
      heading: "Why the front end takes the damage",
      blocks: [
        { type: "p", text: "A rock chip is simple physics. The tire of the vehicle ahead picks up a stone and flings it backward and upward. Your car drives into it. The faster both cars are going, the harder the hit, and the higher on your car the stone lands. At parking-lot speed a stone barely reaches the bumper. At highway speed it arcs over the bumper and lands on the upper hood, the fender tops, the mirrors, the A-pillars, and the windshield." },
        { type: "p", text: "That is why Northern Virginia is hard on paint. I-66 and Route 28 have been under construction for years, and the trucks hauling fill for those projects shed gravel every mile. Route 50, Route 7, the Dulles Toll Road, and the Beltway add sand after every winter storm. Follow a dump truck for one exit at 65 mph and you can come home with a dozen fresh chips. We wrote up what that looks like on real cars in [does PPF stop rock chips on I-66 and Route 28](/blog/does-ppf-stop-rock-chips-i-66-route-28-northern-virginia)." },
        { type: "p", text: "This is also why the partial front line is not enough for a commuter. Partial front covers the bumper and the leading 18 inches of the hood. That is the right zone for stones at low speed. At highway speed the stones clear that line. The chips land at inch 20, inch 30, and on the fender tops, and the film is not there. Worse, the edge of a partial hood piece sits in the open on a flat panel, where it collects a faint line of dirt and shows on light paint." },
        { type: "quote", text: "If the car sees I-66 or Route 28 more than a couple of times a week, the upper hood will chip. Covering the whole hood is the difference between film that works and film that almost works." },
      ],
    },
    {
      id: "partial-vs-full-vs-extended",
      heading: "Partial front vs full front vs full front extended",
      blocks: [
        { type: "p", text: "We install three packages and only three. Here is the honest version of who needs which." },
        { type: "ul", items: [
          "Partial front: bumper, leading 18 inches of the hood, fender edges, mirrors. About half a day. Right for a garage-kept car that drives local on weekends, a short lease where the bumper is the only worry, or a budget that has to be split across two visits. Just know the hood line will be visible up close, and that upgrading later means re-filming the hood as one piece.",
          "Full front: full hood, bumper, both fenders, mirrors, headlights, A-pillars. One day. Right for any car that commutes, road-trips, or sits in traffic behind trucks. This is what most of our customers choose and what we recommend to most daily drivers.",
          "Full front extended: everything in full front plus rocker panels, door edges, and the door cups behind the handles. One to two days. Right for lifted trucks, SUVs with wide rockers, anything that sees gravel, and cars that live in tight parking garages where door edges take dings. It is our most complete package.",
        ] },
        { type: "p", text: "If you want the three laid out row by row, with the lease and resale angles, read [partial front vs full front PPF](/partial-front-vs-full-front-ppf). If you want our answer in one line: full front, unless the car never leaves the neighborhood or the rockers get hit as often as the bumper." },
      ],
    },
    {
      id: "the-film",
      heading: "The film: STEK DYNOshield",
      blocks: [
        { type: "p", text: "DYNOshield is a thermoplastic polyurethane film roughly eight thousandths of an inch thick, several times thicker than a factory clear coat. That thickness is what absorbs a stone. The paint under it never feels the impact. The film takes a small dent, and most of those relax out on a warm day." },
        { type: "p", text: "On top of the urethane is a self-healing, hydrophobic top coat. Light scratches and wash swirls close up in the sun or under warm water. Water beads and rinses dirt away from the roll, before any coating is added. Under the urethane is a pressure-sensitive adhesive that bonds to clear coat and lifts cleanly with heat years later, which matters for leases and resale." },
        { type: "p", text: "STEK backs DYNOshield with a 12-year manufacturer warranty against yellowing, cracking, peeling, and delamination. We chose it after installing other premium films on Northern Virginia daily drivers and watching how they aged. The top coat stays clearer on dark paint, the warranty is one plain number, and the pattern library keeps up with new models the week they land. The full case is in [STEK vs XPEL PPF](/stek-vs-xpel-ppf). The short version is that we trust it on our own cars." },
      ],
    },
    {
      id: "computer-cut-vs-hand-cut",
      heading: "Computer-cut patterns vs hand-cut film",
      blocks: [
        { type: "p", text: "There are two ways to get film onto a hood. One is to lay bulk film over the panel and trim it with a razor blade on the car. The other is to plot a pattern for the exact year, model, and trim on a cutting table, then install the finished piece. We only do the second." },
        { type: "p", text: "Hand-cutting puts a blade on your clear coat. Even a careful installer leaves score lines you will find the day the film comes off. A hand-cut edge is also trimmed short of the panel edge so the blade does not slip, which leaves a visible margin of bare paint and an exposed edge that catches dirt and lifts." },
        { type: "p", text: "A computer-cut pattern is drawn from a scan of the actual panel. It includes the extra material to wrap under the hood lip, around fender edges, and into the gap between the bumper and the grille, plus relief cuts for sensors, cameras, washer nozzles, and badges. Edges wrap wherever the pattern allows, so from any normal viewing angle the film disappears. No blade touches the car. Where a panel cannot be wrapped, such as a sensor housing or a sharp body line, the pattern leaves a clean, straight edge in the least visible place, and we tell you where that is before we start." },
      ],
    },
    {
      id: "the-install-day",
      heading: "Install day, step by step",
      blocks: [
        { type: "p", text: "Full front is a one-day job at our Chantilly shop. You drop off in the morning and pick up that afternoon. Here is what happens in between." },
        { type: "ol", items: [
          "Decontamination wash. Foam, two-bucket hand wash, iron remover, tar remover, and a clay treatment on every panel getting film. Anything left on the paint ends up sealed under the film for twelve years, so nothing is left on the paint.",
          "Paint inspection. Under high-intensity lights we check every panel for chips, swirls, and prior repaint. A brand-new car usually needs nothing. A two-year-old daily driver often needs a light polish before film, because film locks in whatever is beneath it. We call you if we find anything you should know about.",
          "Panel prep. A solvent wipe removes polish oils and wax so the adhesive bonds to bare clear coat. Badges and sensors are masked or the pattern cuts around them.",
          "Patterns plotted. The DYNOshield patterns for your exact year, model, and trim are cut on the plotter, off the car.",
          "Slip solution and lay. Each piece is floated onto the panel on a slip solution, positioned, and locked with a tack solution at the anchor points. This is where the pattern fit shows: a good pattern lands with margin to wrap and no stretch marks.",
          "Squeegee. Firm, overlapping strokes push the solution out from the center to the edges. Done right, no moisture pockets remain. Done fast, the haze you see a week later is trapped solution.",
          "Edge wrapping. Heat and a glove tuck the extra material under the hood lip, around the fender edge, and into the bumper gaps. Wrapped edges are what keep the film down for a decade.",
          "Cure. The car sits in the dust-controlled bay under heat so the adhesive sets before the car sees weather.",
          "Lighting walk-around. Before you pay the balance, you and the installer walk every panel under high-intensity lighting. We point out every edge and every relief cut. If you can find a flaw, so can we, and it gets fixed before you leave.",
        ] },
        { type: "p", text: "At pickup you will see a car that looks exactly like it did at drop-off, only glossier. The film is invisible. The edges are under the panels. The only way to tell is to run a fingernail across the hood lip." },
      ],
    },
    {
      id: "by-body-type",
      heading: "Full front by body type",
      blocks: [
        { type: "p", text: "The panels in a full front are the same on every car. The way those panels take hits is not." },
        { type: "ul", items: [
          "Sedans and coupes. A low hood sits right in the arc of a highway stone, so the upper hood and A-pillars take more than their share. The hood seam at the fenders is the first place chips show. Full front with no hood line is the whole point on a dark sedan.",
          "SUVs and trucks. A tall, flat grille and hood face the stones head-on, and the bumper on a lifted truck sits at the height of the rear tires ahead of it. The front tires also throw spray and gravel straight back at the rockers, which is why most truck and SUV owners add the extended package. See [truck PPF](/truck-ppf) and [SUV PPF](/suv-ppf), or the model pages for the [Toyota 4Runner](/toyota-4runner-ppf) and the [Tesla Model Y](/tesla-model-y-ppf).",
          "EVs. Factory paint on most EVs is thin, and bumpers are full of ultrasonic sensors and cameras. Our patterns cut around every one of them, and film is thin enough that radar and cameras behind it work normally. The newest Model Y and Model 3 refreshes have their own patterns. Start at [EV PPF](/ev-ppf).",
          "Sports cars. A low splitter, wide fenders, and a nose that sits inches off the road put the bumper in the line of every stone. The frunk lid on a mid-engine car is really a hood, and it chips like one. We film the [Corvette C8](/corvette-c8-ppf) and the [Porsche 911](/porsche-911-ppf) every month and know where each one takes hits.",
        ] },
      ],
    },
    {
      id: "ceramic-over-film",
      heading: "Ceramic coating goes over the film, not under it",
      blocks: [
        { type: "p", text: "Film and coating do different jobs. Film stops impacts on the panels it covers. A ceramic coating adds gloss, chemical resistance, and easy washing to every panel, but it is microns thick and stops no stone. The best setup for a daily driver is both: full front film, then a Gtechniq coating over the film and the bare paint together." },
        { type: "p", text: "The order matters. Film goes on first, always. A ceramic coating cures into a slick surface that film adhesive cannot grip, so coating a panel and filming it afterward means lifted edges. The right sequence is wash, correction, film on the front, then coating over everything. The DYNOshield top coat is already hydrophobic, and Gtechniq bonds to it well, so the coated film sheds grit for years instead of weeks." },
        { type: "p", text: "We offer Gtechniq Crystal Serum Light with a 5-year warranty and Crystal Serum Ultra with a 7-year warranty. Details are on our [ceramic coating page](/services/ceramic-coating), and the full comparison is at [PPF vs ceramic coating](/ppf-vs-ceramic-coating). Adding a coating to a full front usually turns the one-day install into two." },
      ],
    },
    {
      id: "living-with-it",
      heading: "Living with full front PPF",
      blocks: [
        { type: "h3", text: "The first seven days" },
        { type: "p", text: "Do not wash the car. The adhesive is still setting, and water forced at an edge can lift it. You may see small moisture pockets or a faint haze under the film in the first few days; that is slip solution evaporating through the film, and it clears on its own. Do not press on it and do not pick at an edge." },
        { type: "h3", text: "Washing" },
        { type: "p", text: "After the cure, wash by hand: rinse, two buckets, pH-neutral soap, a clean microfiber mitt, straight strokes, and a microfiber drying towel. Touchless washes are fine. Brush washes are not; the spinning brushes drag grit across the top coat and can catch an edge. Keep a pressure washer tip at least a foot from any film edge. The full routine is in [how to wash and care for PPF](/blog/how-to-wash-and-care-for-ppf)." },
        { type: "h3", text: "What not to use" },
        { type: "p", text: "No rubbing compounds, no heavy polishes, no wool pads, no solvent-heavy bug or tar removers, and no waxes with dyes or abrasives. A film-safe sealant or a Gtechniq coating is how you add gloss." },
        { type: "h3", text: "Year five and year ten" },
        { type: "p", text: "At year five a properly installed full front looks like year one: clear, no yellowing, no lifted edges. The tell is usually a little pitting on the leading edge of the hood, which is sand doing what sand does to a surface that is not your paint. At year ten the film is still two years inside its warranty. If it has eaten a decade of stones you may decide to replace the hood or bumper piece. It lifts cleanly with heat, the paint underneath is still factory, and a fresh piece goes on. What that timeline looks like on real cars is in [how long PPF lasts in Northern Virginia](/blog/how-long-does-ppf-last-northern-virginia)." },
      ],
    },
    {
      id: "common-mistakes",
      heading: "Mistakes we see from other shops",
      blocks: [
        { type: "p", text: "We get cars in for a second opinion every week. These are the problems that come up again and again, and every one of them is avoidable." },
        { type: "ul", items: [
          "Hand-cut seams. Two pieces joined across a hood, or a hood piece trimmed short of the lip. The seam collects dirt, shows on light paint, and lifts within a year. Full front should be one piece per panel with the edge under the lip.",
          "Dirt under the film. A speck of dust or a fiber sealed in looks like a tiny bubble and never goes away. It comes from skipping the decontamination wash or installing in an open bay with the door up. We install in a dust-controlled bay for this reason.",
          "Unwrapped edges. An edge left on the face of a panel is an edge waiting to catch a wash mitt, a pressure washer, or a fingernail. Patterns include the material to wrap; using it takes time, which is why rushed installs skip it.",
          "Bulk film that yellows. Cheap film without a quality top coat goes amber on white paint in two or three Virginia summers. If a quote does not name the film, ask. If the answer is vague, walk.",
          "No paint inspection. Film over a swirled or chipped panel locks the defect in for twelve years. A shop that does not look at the paint under lights before filming is guessing at what you will be looking at in year three.",
          "Blade cuts on the car. Fine score lines in the clear coat along every edge. You find them the day the film comes off, usually at trade-in.",
          "The two-hour full front. If a quote promises a full front by lunch, something on the install list above was skipped. The film cannot be laid, wrapped, and cured that fast.",
        ] },
      ],
    },
    {
      id: "who-we-are",
      heading: "Who we are",
      blocks: [
        { type: "p", text: "Skyline Customs is a paint protection film, ceramic coating, and ceramic window tint shop at 4215 Walney Rd Suite 1A & B in Chantilly, VA, off Route 28 near Dulles. Full front PPF is what we do more than anything else, and being the full front specialist of the DMV is the whole plan. Our installers are STEK-certified. Our bay is dust-controlled. Our Google rating is 5.0 with 140+ five-star reviews, which you can read on our [reviews page](/reviews)." },
        { type: "p", text: "Customers drive in from across Northern Virginia, Maryland, and DC. Fairfax, Ashburn, Reston, Herndon, and Sterling are a few exits up Route 28 or Fairfax County Parkway. Arlington, Alexandria, McLean, and Tysons come out I-66 or Route 7. Bethesda, Rockville, and Silver Spring come around the Beltway. If you are searching for [PPF in Fairfax](/ppf-fairfax-va), [PPF in Ashburn](/ppf-ashburn-va), [PPF in Arlington](/ppf-arlington-va), [PPF in Bethesda](/ppf-bethesda-md), or [PPF in Washington DC](/ppf-washington-dc), we have a page for your drive, and the full list is on [service areas](/service-areas)." },
        { type: "p", text: "The [gallery](/gallery) has full fronts on Teslas, BMWs, a Corvette C8 Z06, a Porsche 911, a Rivian R1S, a Lucid Air, and a lineup of 4Runners, Tacomas, Broncos, and Wranglers. The [videos page](/videos) shows the install process and a gravel test on a filmed fender." },
      ],
    },
    {
      id: "next-step",
      heading: "How a full front quote works",
      blocks: [
        { type: "p", text: "Pricing depends on coverage and vehicle size, so we do not post a number on this page. What we do is reply to every free quote with an exact price, usually within the hour. The factors that move it are on [what drives PPF cost](/ppf-cost)." },
        { type: "ol", items: [
          "Send us the year, make, model, and trim, plus a line about how you drive: the roads, the commute, the parking situation. That tells us whether full front or extended is the right call. Use the [free quote form](/get-a-quote).",
          "We reply with an exact price for the package we recommend, usually within the hour, with the install time and the first open date.",
          "A fully refundable 20% deposit reserves your install date and goes toward the total. Klarna, Afterpay, and Affirm payment plans are available if you want to split the balance.",
          "Drop off in the morning, walk the car under the lights with us that afternoon, and pay the balance when you are satisfied with every edge.",
        ] },
        { type: "p", text: "Check the [current special](/promo) before you book; full front is usually where the best bundle lives. And if a friend is still deciding between packages, send them this [full front PPF guide](/full-front-ppf). It is the conversation we would have with them at the counter." },
      ],
    },
  ] as GuideSection[],
  faqs: [
    { q: "What does full front PPF cover?", a: "Full front PPF covers the full hood, the front bumper, both front fenders, the mirror caps, the headlights, and the A-pillars: every surface that faces forward at highway speed. It does not include the doors, rockers, or roof. Full front extended adds the rocker panels, door edges, and door cups. Partial front covers only the bumper, the leading 18 inches of the hood, fender edges, and mirrors." },
    { q: "How much does full front PPF cost?", a: "It depends on the vehicle and the package. Full front uses similar material on most cars, so the biggest variables are the body size, gloss or matte film, and whether you add a ceramic coating or extend the coverage to the rockers and doors. Send us the year, make, and model through the free quote form and we reply with an exact price, usually within the hour." },
    { q: "How long does a full front PPF install take?", a: "One day at our Chantilly shop. Drop off in the morning, pick up that afternoon after a walk-around under high-intensity lights. Every install starts with a decontamination wash and a paint inspection. Adding a Gtechniq ceramic coating over the film usually makes it a two-day job, and full front extended takes one to two days on its own." },
    { q: "Is full front PPF worth it?", a: "For a car that drives I-66, Route 28, the Toll Road, or the Beltway and that you plan to keep, yes. One chipped hood or bumper means a repaint that never matches factory and lowers trade-in value. Full front film in self-healing STEK DYNOshield takes those hits for 12 years under warranty, and the paint underneath stays factory. It is not worth it on a car you are selling in a few months." },
    { q: "Can you see full front PPF once it is installed?", a: "Not on a proper install. DYNOshield is optically clear with no orange peel or haze, so the only difference is slightly deeper gloss. Computer-cut patterns include extra material to wrap under the hood lip, around the fender edges, and into the bumper gaps, so there is no visible edge on the face of a panel. The seam you can see on a partial front, halfway up the hood, does not exist on a full front." },
    { q: "How long does full front PPF last?", a: "Ten to twelve years or more with hand washing. STEK DYNOshield carries a 12-year manufacturer warranty against yellowing, cracking, peeling, and delamination. At year five a properly installed full front looks like year one. At year ten you may see light pitting on the leading edge of the hood from sand, and the film still lifts cleanly with heat when it is time to replace it." },
    { q: "Does full front PPF cover the windshield or the roof?", a: "No. Full front stops at the A-pillars. It covers the hood, bumper, fenders, mirrors, headlights, and the pillars themselves, which catch the high stones that clear the hood. The windshield is glass and is not part of a paint protection package. The roof, doors, and rockers are behind the A-pillars; rockers and door edges are added by the extended package." },
    { q: "Should I get full front or full front extended?", a: "Full front if the car commutes on highways and parks in a driveway. Full front extended if it is a lifted truck, an SUV with wide rockers, a car that sees gravel, or a car that lives in a tight parking garage where door edges take dings. Extended adds the rocker panels, door edges, and door cups. Tell us how you drive and park and we will tell you which one." },
  ],
};
