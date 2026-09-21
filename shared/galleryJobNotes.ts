/**
 * Written copy for each gallery job page (/gallery/<slug>), keyed by job slug.
 * A job page is only indexable (in the sitemap, no noindex) when it has a note,
 * so template-only pages never go to Google. Write a note here whenever a new
 * gallery photo is added. No prices, no full-body PPF.
 */
export interface GalleryJobNote {
  /** One or two sentences that open the page: what this car is and why it came in. */
  intro: string;
  /** 90-130 words on why this coverage fits this exact car. Replaces the generic body-type copy. */
  why: string;
  /** One question specific to this car. */
  faq: { q: string; a: string };
}

export const GALLERY_JOB_NOTES: Record<string, GalleryJobNote> = {
  "bmw-m340i-full-front-ppf-ceramic-coating": {
    intro: "A BMW M340i in for full front PPF and a ceramic coating before its first winter on I-66. The owner wanted the M Sport bumper protected without a visible film line on the hood.",
    why: "The M340i sits low, and the M Sport front bumper has a wide lower intake that acts like a scoop for gravel on I-66 and Route 28. BMW's clear coat is hard but thin, so chips show white against dark paint fast. Full front covers the entire hood, both fenders, the bumper, mirrors, and headlights in one piece per panel, with the edges wrapped under the hood lip so nothing shows. The ceramic coating over the film and the rest of the body keeps brake dust and road film from sticking, which matters on a car with big M brakes that dust the rear quarters every week.",
    faq: { q: "Does the film cover the kidney grille surround on an M340i?", a: "The bumper pattern covers the painted bumper skin around the grilles and intakes. The grille itself is plastic and not filmed, and the sensors in the lower bumper are cut around so parking assist keeps working." },
  },
  "2027-mini-countryman-s-full-front-ppf-ceramic-coating": {
    intro: "A brand-new 2027 Mini Countryman S, delivered a week earlier, in for full front PPF and a ceramic coating before the first commute.",
    why: "The new Countryman is bigger than the old one, with a tall, flat front bumper and a wide hood that take chips head-on at highway speed. The two-tone roof and contrast mirror caps are part of the look, so the mirrors were filmed to keep them chip-free rather than repainted later. Full front covers the hood, fenders, bumper, mirrors, and headlights, and the film self-heals the light scratches that a Countryman picks up in tight parking garages. The ceramic coating went on the film and the rest of the paint so the whole car beads water the same way and washes in minutes.",
    faq: { q: "Can PPF go on a two-tone Mini without covering the color split?", a: "Yes. The film is clear and the patterns follow each panel, so the contrast roof and mirror caps look exactly as delivered. Only the painted front panels are covered." },
  },
  "tesla-model-3-full-front-ppf-ceramic-coating": {
    intro: "A Tesla Model 3 in for full front PPF and a ceramic coating. Model 3 owners are our most frequent PPF customers for one reason: the paint.",
    why: "Tesla paint is thin and soft, and the Model 3's low front bumper takes chips from the first week on the Toll Road. Full front covers the hood, bumper, fenders, mirrors, and headlights, and the pattern is cut around the front camera and the ultrasonic sensor locations so Autopilot and parking assist are unaffected. The self-healing top coat is a real benefit on a Model 3 because the soft paint swirls from any brush wash. The ceramic coating over the film and the rest of the car makes it easy to keep clean without a dealer wash, and it adds gloss that Tesla paint lacks from the factory.",
    faq: { q: "Will the PPF interfere with the Model 3's cameras or sensors?", a: "No. The film is cut around the front camera housing and the sensor positions in the bumper. Nothing painted over a sensor, nothing covering a lens." },
  },
  "tesla-cybertruck-full-front-ppf-ceramic-coating": {
    intro: "A Tesla Cybertruck in for full front PPF and a ceramic coating on the stainless steel. There is no paint to protect here; the film and coating do a different job.",
    why: "Cybertruck panels are bare stainless steel, which does not chip like paint but scratches, shows fingerprints, and picks up rust-colored surface spots from road iron if it sits dirty. Full front PPF on the hood, front panels, and lower nose keeps rock strikes from leaving bright scratches in the brushed finish, and it stops the sandblasting effect on the leading edges. The ceramic coating over the film and the exposed stainless is what keeps fingerprints and water spots from marking the truck every time someone touches it. Many Cybertruck owners choose a matte or satin film for a stealth look; this one stayed clear to keep the factory finish.",
    faq: { q: "Does stainless steel need PPF if it cannot chip?", a: "It cannot chip, but it scratches and shows every mark. The film takes the scratches instead of the steel and self-heals the light ones; the coating stops fingerprints and water spots." },
  },
  "2026-corvette-c8-z06-full-front-ppf-ceramic-coating": {
    intro: "A 2026 Corvette C8 Z06 in for full front PPF and a ceramic coating before its first track day. The Z06's front end is wide, low, and expensive to repaint.",
    why: "The Z06 has a splitter inches off the ground, wide fenders, and big side intakes that pull air and gravel toward the paint. A single chip in the front clip means blending across multiple panels because of the shape. Full front covers the hood, both fenders, the bumper and splitter face, mirrors, and headlights, with the pattern following the carbon aero pieces so nothing lifts at speed. The self-healing STEK top coat handles the light scratches from track-day tire pickup. The ceramic coating over the film and the rest of the body means rubber marbles and brake dust rinse off after a session instead of baking on.",
    faq: { q: "Does PPF hold up to track days on a Z06?", a: "Yes. The film absorbs the tire pickup and small debris that pepper a front end at track speed, and the coating makes the rubber marks rinse off. Many track cars also add the rockers with Full Front Extended." },
  },
  "bmw-ix-2026-full-front-ppf-ceramic-coating": {
    intro: "A 2026 BMW iX in for full front PPF and a ceramic coating. The iX's flat front panel is packed with sensors and its paint is as thin as any EV's.",
    why: "The iX has a large, flat nose panel in place of a grille, with radar and camera hardware behind it, and it takes chips across its whole face on the Toll Road. Full front covers the hood, that nose panel, the bumper, both fenders, mirrors, and headlights, and the pattern is cut so every sensor window stays clear. BMW's EV paint marks easily, so the self-healing top coat earns its keep on the first automatic wash. The ceramic coating over the film and the rest of the body gives the flat iX panels the deep gloss the factory finish lacks and keeps the car clean with a rinse.",
    faq: { q: "Can PPF cover the iX's sensor panel without blocking radar?", a: "The painted parts of the nose panel are covered; the radar and camera windows are cut out precisely so driver assistance works exactly as before." },
  },
  "bmw-x5-full-front-ppf-ceramic-coating": {
    intro: "A BMW X5 in for full front PPF and a ceramic coating. A family SUV that spends its days on Route 28 and its weekends at soccer fields.",
    why: "The X5's tall hood and upright bumper take gravel square on at highway speed, and the wide kidney grille surround chips on its painted edges. Full front covers the hood, bumper, both fenders, mirrors, and headlights, with the mirror caps filmed because they get hit by everything from bugs to shopping carts. The X5's dark paint shows swirls from dealer washes, so the car got paint correction before the ceramic coating went on over the film and the rest of the body. The result is an SUV that rinses clean and keeps its gloss through winter salt.",
    faq: { q: "Is full front enough for an X5 that sees gravel lots?", a: "Full front covers the panels that chip on the highway. For regular gravel roads or trails, Full Front Extended adds the rockers, door edges, and door cups." },
  },
  "kia-seltos-full-front-ppf-ceramic-coating": {
    intro: "A Kia Seltos in for full front PPF and a ceramic coating. Protection is not only for luxury cars; this owner plans to keep the Seltos a long time.",
    why: "The Seltos has a tall hood and a big, upright grille surround, so the painted bumper edges and hood chip quickly on Route 28. Kia's paint is on the thinner side, and a repaint costs a large share of what the car is worth, which makes the math on PPF easy. Full front covers the hood, bumper, fenders, mirrors, and headlights, and the self-healing top coat takes care of the light scratches a commuter car collects. The ceramic coating over the film and the rest of the paint keeps the car looking new with a rinse and protects the resale value the owner cares about.",
    faq: { q: "Is PPF worth it on a Kia Seltos?", a: "If you plan to keep the car, yes. A repaint costs a large share of the car's value, and the film plus coating keeps the factory paint intact for the 12-year warranty period." },
  },
  "jeep-grand-cherokee-2026-full-front-ppf-ceramic-coating": {
    intro: "A 2026 Jeep Grand Cherokee in for full front PPF and a ceramic coating, delivered new and filmed before the first week of Route 28 commuting.",
    why: "The Grand Cherokee has a wide hood, a tall seven-slot grille surround, and a chrome-trimmed bumper with a lot of painted surface at gravel height. Full front covers the hood, bumper skin, both fenders, mirrors, and headlights, with the pattern cut around the parking sensors and the front camera. Jeep's paint is soft enough that brush washes leave swirls, so the self-healing top coat matters on a daily driver. The ceramic coating over the film and the rest of the body makes a big SUV quick to wash and keeps winter salt from bonding to the paint.",
    faq: { q: "Does the film cover the Grand Cherokee's chrome trim?", a: "The film goes on painted panels. Chrome and black plastic trim are not filmed, but they can be ceramic coated so they stop water spotting and fading." },
  },
  "acura-integra-type-s-2023-full-front-ppf-ceramic-coating": {
    intro: "A 2023 Acura Integra Type S in for full front PPF and a ceramic coating. The Type S has wide fenders and a low splitter that the owner wanted protected before the first canyon drive.",
    why: "The Integra Type S rides low with flared fenders, a front splitter, and big intakes that funnel debris toward the paint. Acura's paint is high quality but the Type S colors are hard to blend, so a chip repair on a fender means repainting more than one panel. Full front covers the hood, both flared fenders, the bumper, mirrors, and headlights, and the pattern follows the fender flares so the edges stay tucked. The self-healing top coat handles tire pickup from spirited driving, and the ceramic coating over the film and the rest of the body keeps brake dust from the Brembo front brakes rinsing off instead of etching.",
    faq: { q: "Can the splitter on the Type S be covered?", a: "The painted bumper face down to the splitter is covered in full front. The black splitter itself is unpainted and left as is, though it can be coated." },
  },
  "acura-mdx-full-front-ppf-ceramic-coating": {
    intro: "An Acura MDX in for full front PPF and a ceramic coating. A three-row family SUV that commutes the Toll Road and hauls kids on weekends.",
    why: "The MDX has a long hood and a wide, upright grille surround with plenty of painted bumper at gravel height, and its light metallic paint shows every chip as a dark speck. Full front covers the hood, bumper, both fenders, mirrors, and headlights, and the pattern is cut around the sensors and camera in the bumper. The self-healing top coat takes care of the light scratches a family SUV collects in school pickup lines. The ceramic coating over the film and the rest of the body keeps the light paint looking clean between washes and stops bird droppings and sap from etching while the car sits in the driveway.",
    faq: { q: "Does PPF protect the MDX's headlights too?", a: "Yes. Full front includes the headlights, which yellow and pit from the same gravel that chips the bumper. The film keeps them clear and can be replaced if ever damaged." },
  },
  "bmw-z4-m40i-2026-full-front-ppf-ceramic-coating": {
    intro: "A 2026 BMW Z4 M40i in for full front PPF and a ceramic coating. A roadster with a long hood and a nose that sits inches above the road.",
    why: "The Z4's long hood is the biggest single painted surface on the car and it faces the road at a shallow angle, so gravel skips across it and leaves chips from the nose to the windshield. The low front bumper with its wide M intakes takes the rest. Full front covers the entire hood, both fenders, the bumper, mirrors, and headlights with the edges wrapped so nothing shows on a panel this visible. The self-healing top coat keeps the hood free of the light swirls that show on a roadster you look down on every time you get in. The ceramic coating over the film and body keeps the car glossy with the top down all summer.",
    faq: { q: "Is the whole hood covered on a Z4, or just the front edge?", a: "The whole hood. Full front uses a single piece for the hood so there is no film line across a panel you see every time you sit in the car." },
  },
  "nissan-gt-r-2021-full-front-ppf-ceramic-coating": {
    intro: "A 2021 Nissan GT-R in for full front PPF and a ceramic coating. GT-R paint is famously soft, and the wide front end collects everything the road throws.",
    why: "The GT-R has a broad, flat nose with huge intakes, wide fenders, and a hood that runs almost level with the road, so it takes chips across its whole width. Nissan's paint on the GT-R is soft enough to mark from a careless towel, which makes the self-healing STEK top coat a genuine benefit rather than a feature on a list. Full front covers the hood, both fenders, the bumper, mirrors, and headlights, with the pattern following the intake openings so the edges stay tucked. The ceramic coating over the film and the rest of the body adds the depth the special-order colors deserve and keeps brake dust from the big Brembos rinsing off.",
    faq: { q: "Will PPF stop the swirl marks GT-R paint is known for?", a: "On the filmed panels, yes. The film's top coat self-heals light swirls with heat, and the ceramic coating on the rest of the body makes washing safer so fewer swirls form." },
  },
  "bmw-x5-2026-full-front-ppf-ceramic-coating": {
    intro: "A 2026 BMW X5 in for full front PPF and a ceramic coating, delivered new and filmed the same week. The second X5 in the bay this month.",
    why: "The refreshed X5 has a taller grille surround with illuminated edges and a wider lower bumper opening, both of which put painted edges right in the gravel stream on Route 28. Full front covers the hood, both fenders, the bumper, mirrors, and headlights, and the pattern is cut precisely around the grille lighting and the sensor windows so nothing is covered. New BMW paint still arrives with dealer wash swirls, so the car got paint correction before the ceramic coating went on over the film and the rest of the body. The coating keeps the dark metallic paint deep and makes the SUV a quick rinse to clean.",
    faq: { q: "Does the film go around the illuminated grille on the new X5?", a: "Yes. The bumper pattern is cut around the grille surround and the lighting so the illuminated edge is untouched and the painted bumper around it is covered." },
  },
  "ford-bronco-full-front-ppf-ceramic-coating": {
    intro: "A Ford Bronco in for full front PPF and a ceramic coating. Built for trails, but it commutes I-66 every weekday and both need protection.",
    why: "The Bronco's flat hood and upright grille take gravel square on, and the fender flares stick out into the debris stream from the front tires. Full front covers the hood, both fenders including the painted flares, the bumper, mirrors, and headlights, with the pattern cut around the trail-sight tie-downs on the hood corners. The self-healing top coat takes care of the brush scratches that come with trails. The ceramic coating over the film and the rest of the body means mud and trail dust rinse off instead of bonding to the paint, and salt from winter commutes does the same.",
    faq: { q: "Are the Bronco's fender flares covered by full front PPF?", a: "Painted flares are covered as part of the fender pattern. Bare black plastic flares are not filmed but can be coated so they stop fading gray." },
  },
  "toyota-tacoma-trd-2026-full-front-ppf-ceramic-coating": {
    intro: "A 2026 Toyota Tacoma TRD in for full front PPF and a ceramic coating. The new-generation Tacoma has a tall hood scoop and a lot of painted surface up front.",
    why: "The 2026 Tacoma's hood is tall and flat with a functional scoop, and the TRD bumper has painted corners that stick out where gravel lands from the truck ahead on Route 28. Full front covers the hood including the scoop, both fenders, the painted bumper corners, mirrors, and headlights, with the pattern cut around the front camera and parking sensors. Toyota's truck paint is hard but chips show as bare metal, so the film matters on a vehicle meant to be kept ten years. The ceramic coating over the film and the rest of the body means trail dust and job-site grime rinse off, and the coated bed cover stops fading in the sun.",
    faq: { q: "Can PPF cover the hood scoop on the new Tacoma?", a: "Yes. The hood pattern includes the scoop as a separate piece so the whole hood, scoop included, is covered with no gap at the base." },
  },
  "toyota-4runner-trailhunter-2026-full-front-ppf-ceramic-coating": {
    intro: "A 2026 Toyota 4Runner Trailhunter in for full front PPF and a ceramic coating. A first-year truck with a front end designed for trails and a commute on I-66.",
    why: "The new 4Runner Trailhunter has a tall hood, a large upright grille surround, and a high-clearance bumper with painted corners that catch gravel from every truck ahead on the highway. Full front covers the hood, both fenders, the painted bumper corners, mirrors, and headlights, with the pattern cut around the front camera, sensors, and the Trailhunter's snorkel-style intake on the hood. The self-healing top coat handles trail brush scratches. The ceramic coating over the film and the rest of the body keeps mud and pollen from bonding to the matte-look trim and makes a big SUV quick to rinse.",
    faq: { q: "How does the PPF work around the Trailhunter's hood intake?", a: "The hood pattern is cut around the intake so the film sits flat on the hood and the intake stays exactly as delivered. The fenders and bumper are unaffected." },
  },
  "honda-pilot-elite-2026-full-front-ppf-ceramic-coating": {
    intro: "A 2026 Honda Pilot Elite in for full front PPF and a ceramic coating, filmed a few days after delivery before the first school-run week.",
    why: "The Pilot's hood is wide and flat and the grille surround and lower bumper have a lot of painted edge at gravel height, which is where chips land on Route 28 and the Toll Road. Full front covers the hood, both fenders, the bumper, mirrors, and headlights, and the pattern is cut around the parking sensors and front camera. Honda's paint is thin enough that brush washes leave swirls, so the self-healing top coat is a practical benefit on a family SUV. The ceramic coating over the film and the rest of the body keeps the three-row Pilot a five-minute rinse to clean and protects the paint parked in a driveway all summer.",
    faq: { q: "How long did full front PPF and a coating take on the Pilot?", a: "Two days. The film went on the first day, and the paint correction, coating, and indoor cure happened the second day before pickup." },
  },
  "2022-lucid-air-full-front-ppf-ceramic-coating": {
    intro: "A 2022 Lucid Air in for full front PPF and a ceramic coating. The Air's nose is low, wide, and full of sensors, and its paint is not cheap to repair.",
    why: "The Lucid Air has one of the lowest front ends of any sedan on the road, with a wide flat hood and a bumper that sits at gravel height. Full front covers the hood, both fenders, the bumper, mirrors, and headlights, and the pattern is cut around the lidar, radar, and camera windows so DreamDrive works exactly as before. Lucid's paint is soft and marks from any automatic wash, so the self-healing top coat is a real benefit. The ceramic coating over the film and the rest of the body adds the gloss the Air's flat surfaces show off and keeps the car clean with a rinse instead of a brush.",
    faq: { q: "Does PPF affect the Lucid Air's driver-assistance sensors?", a: "No. Every sensor window in the bumper and grille area is cut out precisely, so lidar, radar, and cameras see exactly what they did before the film." },
  },
  "2023-cadillac-escalade-full-front-ppf-ceramic-coating": {
    intro: "A 2023 Cadillac Escalade in for full front PPF and a ceramic coating. The biggest hood we see in the bay, and the one that catches the most gravel.",
    why: "The Escalade's hood is enormous and nearly flat, so gravel from the truck ahead lands across its whole surface, and the tall grille surround has painted edges at every level. Full front covers the entire hood, both fenders, the painted bumper, mirrors, and headlights, with the pattern cut around the cameras and sensors that Super Cruise depends on. Black Escalades show every chip as a white dot, which is why the owner had the film on before the first winter. The ceramic coating over the film and the rest of the body keeps the black paint deep and makes a full-size SUV a quick rinse rather than an hour with a bucket.",
    faq: { q: "Can one piece of film cover the whole Escalade hood?", a: "Yes. STEK film comes in wide rolls, so the hood is done in a single piece with no seam, and the edges are wrapped under the hood lip." },
  },
  "2024-mercedes-gle-53-amg-coupe-full-front-ppf-ceramic-coating": {
    intro: "A 2024 Mercedes-AMG GLE 53 Coupe in for full front PPF and a ceramic coating. The AMG bumper has more painted surface at gravel height than almost any SUV.",
    why: "The GLE 53's AMG front bumper is one wide, low intake with painted splitter edges that sit exactly where gravel from the car ahead lands, and the Panamericana grille surround chips on its painted lip. Full front covers the hood, both fenders, the bumper including the splitter edges, mirrors, and headlights, with the pattern cut around the sensors and the front camera. Mercedes paint is hard but the AMG colors are expensive to blend, so a chip means a costly repair. The ceramic coating over the film and the rest of the body keeps brake dust from the AMG brakes rinsing off the paint and the big wheels.",
    faq: { q: "Are the AMG splitter edges covered by full front PPF?", a: "Yes. The bumper pattern extends down to the painted splitter edges, which take the most gravel on an AMG bumper. Unpainted black trim is left as is." },
  },
  "2018-ford-shelby-gt350-full-front-ppf": {
    intro: "A 2018 Ford Shelby GT350 in for full front PPF. The owner drives it hard and wanted the front end protected without a film line on the hood.",
    why: "The GT350's front end is all intake: a low splitter, wide openings, and hood vents that funnel air and debris toward the paint at speed. A chip on the front clip means repainting across the bumper and fender blend, and Shelby colors are not cheap to match. Full front covers the hood including the vent surrounds, both fenders, the bumper, mirrors, and headlights, with the pattern following the vents so the edges stay tucked. The self-healing STEK top coat handles tire pickup from track days and canyon drives, and the film comes off clean years later with the original paint underneath.",
    faq: { q: "Does PPF go around the hood vents on a GT350?", a: "Yes. The hood pattern is cut to follow the vent openings so the film sits flat and the vents stay open. Nothing is covered that needs to breathe." },
  },
  "1994-toyota-supra-full-front-ppf": {
    intro: "A 1994 Toyota Supra in for full front PPF. Protecting original panels on a car that has become impossible to find in this condition.",
    why: "A fourth-generation Supra with straight original panels is worth protecting because there are no more of them. The long hood, pop-up headlight covers, and low bumper take chips from any highway drive, and matching thirty-year-old paint on a repair is difficult. Before the film went on, the paint was inspected panel by panel to make sure it was sound and corrected so the film would not lock in swirls. Full front covers the hood, both fenders, the bumper, mirrors, and headlight covers, and the self-healing top coat keeps the front end looking the way it did the day it arrived. The film also comes off cleanly later without harming the original paint.",
    faq: { q: "Can PPF go on a 30-year-old car's original paint?", a: "Yes, if the paint is sound. We inspect and correct the panels first; the film then protects the original finish and can be removed years later without damaging it." },
  },
  "2026-tesla-cybertruck-full-front-ppf": {
    intro: "A 2026 Tesla Cybertruck in for full front PPF. Stainless steel cannot chip, but it scratches, and the owner wanted the front kept in delivery condition.",
    why: "Cybertruck's stainless panels take scratches from gravel and show every mark in the brushed grain, and there is no repainting a scratch out of stainless. Full front PPF on the hood, front panels, and lower nose puts a self-healing layer between the road and the steel, so rock strikes and light scratches disappear with heat instead of staying forever. The pattern is cut to the truck's sharp panel edges and around the front camera and light bar. This owner kept the film clear to preserve the factory look; others choose a satin film for a stealth finish. Either way the steel underneath stays as delivered.",
    faq: { q: "Does PPF look different on stainless steel than on paint?", a: "Clear film disappears on the brushed finish just as it does on paint. The grain shows through and the panel edges stay sharp; a satin film changes the look to stealth if that is the goal." },
  },
  "2026-mazda-cx-90-full-front-ppf": {
    intro: "A 2026 Mazda CX-90 in for full front PPF, delivered new and filmed before its first week on Route 28.",
    why: "The CX-90's long hood and tall grille put a lot of painted surface in the gravel stream, and Mazda's Soul Red and Machine Gray paints are among the hardest to touch up because of their layered finish. Full front covers the hood, both fenders, the bumper, mirrors, and headlights, and the pattern is cut around the front radar, camera, and parking sensors. The self-healing STEK top coat takes care of the light scratches a three-row family SUV collects in parking lots. Filmed on delivery, the front end will still be chip-free at the end of the 12-year warranty, which is exactly what the owner wanted for a car they plan to keep.",
    faq: { q: "Is PPF worth it on Mazda's Soul Red paint?", a: "Especially on Soul Red. The layered finish is expensive to repair and hard to match, so keeping chips off the factory paint is far cheaper than fixing them later." },
  },
  "2023-jeep-wrangler-sahara-full-front-ppf": {
    intro: "A 2023 Jeep Wrangler Sahara in for full front PPF. Trails on the weekend, Route 28 during the week, and a hood that catches everything.",
    why: "The Wrangler's flat, upright hood and grille take gravel head-on, and the body-color fender flares on a Sahara stick out into the spray from the front tires. Full front covers the hood, both fenders including the painted flares, the painted bumper, mirrors, and headlights, with the pattern cut around the hood latches and the windshield hinges. The self-healing top coat handles the brush scratches that come with tight trails. Because the doors come off and the fenders get touched constantly, the film also stops the fingernail scratches around the flares and latches that every Wrangler collects.",
    faq: { q: "Can PPF go around the Wrangler's hood latches and hinges?", a: "Yes. The hood pattern is cut around the latches and the windshield hinges so everything opens and closes normally with the film in place." },
  },
  "2025-jeep-rubicon-full-front-ppf": {
    intro: "A 2025 Jeep Wrangler Rubicon in for full front PPF. Steel bumpers and rock rails handle the rocks; the film handles the paint.",
    why: "A Rubicon spends its weekends on trails where branches, rocks, and gravel hit the hood and fenders, and its weekdays on the highway where trucks throw stones at the same panels. Full front covers the hood, both fenders including the painted flares, the painted bumper surfaces, mirrors, and headlights, with the pattern cut around the hood latches, vents, and windshield hinges. The self-healing STEK top coat is the reason to film a trail rig: brush scratches on the hood and fenders disappear in the sun. Filmed new, the paint stays factory under the film and the owner can wheel it without watching the hood.",
    faq: { q: "Does full front PPF cover the Rubicon's steel bumper?", a: "The film covers painted body panels. Steel bumpers are powder-coated and not filmed; the painted hood, fenders, flares, and mirrors are where the film goes." },
  },
};

export const galleryJobNote = (slug: string): GalleryJobNote | undefined => GALLERY_JOB_NOTES[slug];
