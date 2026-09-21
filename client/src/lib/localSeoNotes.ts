/**
 * City-and-service-specific copy for the local landing pages.
 * Every block is written for one city and one service so no two pages share
 * this section. Keep it factual: no prices, no full-body PPF, three PPF packages
 * (partial front, full front, full front extended), STEK DYNOshield with a
 * 12-year warranty, Gtechniq Crystal Serum Light (5-year) and Ultra (7-year),
 * GeoShield Pro Nano Ceramic tint with a lifetime warranty.
 */
import type { ServiceKey } from "@/lib/localSeo";

export interface CityServiceNote {
  heading: string;
  body: string;
  faqs: { q: string; a: string }[];
}

export const CITY_SERVICE_NOTES: Record<string, Record<ServiceKey, CityServiceNote>> = {
  Chantilly: {
    ppf: {
      heading: "PPF for cars that live on Route 28 and Route 50",
      body: "Chantilly drivers come in with the same damage pattern: a sandblasted lower bumper from Route 28 construction traffic and chips across the leading edge of the hood from the I-66 merge at Centreville. Full front PPF is the right answer for almost everyone here because it covers exactly those panels with no film line on the hood. Buyers picking up new cars from the dealerships along Route 50 often drive straight to Walney Rd so the film goes on before the first commute. If you head out toward Loudoun on gravel or take the family to the Expo Center lots every weekend, ask about Full Front Extended for the rockers and door edges.",
      faqs: [
        { q: "Can I drop my car off before work and pick it up the same day in Chantilly?", a: "Yes. Most full front installs are finished the same day. Drop off at 9 AM at 4215 Walney Rd, and we call when the car is ready, usually before the evening rush on Route 28." },
        { q: "I just bought a car from a dealer on Route 50. When should PPF go on?", a: "As soon as possible. New paint has no chips to hide, so the film goes on clean and looks invisible. We can usually schedule a new delivery within a few days." },
      ],
    },
    ceramic: {
      heading: "Ceramic coating for Chantilly commuters and weekend cars",
      body: "The Route 28 corridor is one long dust cloud in summer and a salt bath in winter, and the tree cover in Pleasant Valley and Poplar Tree drops pollen and sap on anything parked outside. A Gtechniq coating turns that into a two-minute rinse instead of a Saturday of scrubbing. Because we are the home shop, Chantilly customers get the most flexible scheduling for the two-day coating process, and many pair it with a full front PPF so the whole car sheds water the same way. Bring the car to Walney Rd after work and we walk you through the aftercare before you drive home.",
      faqs: [
        { q: "How long does a ceramic coating take at the Chantilly shop?", a: "Plan on two days. Day one is the decontamination wash and paint correction; day two is the coating and an indoor cure. You pick up the next afternoon." },
        { q: "Is a coating worth it if I park in a garage in Chantilly?", a: "Yes. The coating earns its keep on the road, not in the garage: Route 28 grime, bug etching on Route 50, and winter salt all wash off without scrubbing, and the gloss stays." },
      ],
    },
    tint: {
      heading: "Window tint for Chantilly's open lots and east-west commutes",
      body: "Most Chantilly office parks and the Fair Lakes and Greenbriar shopping centers have open surface lots, so cars sit in full sun all day. GeoShield Pro Nano Ceramic film keeps the cabin cooler and blocks 99% of UV without darkening past Virginia's legal limits. The Route 50 and I-66 commute runs east in the morning and west in the evening, straight into the sun both ways, which is why Chantilly drivers ask about a clear ceramic windshield strip as often as side windows. Because we are on Walney Rd, a rear-package tint fits between a morning drop-off and lunch.",
      faqs: [
        { q: "Can you tint my car while I wait in Chantilly?", a: "A rear package or four side windows takes about two to three hours. You are welcome to wait, or walk to the restaurants along Route 28 and Westfields Blvd and we call when it is done." },
        { q: "What shade do most Chantilly SUV owners choose?", a: "Most go 20% on the rear windows for privacy and heat, and a legal 50% ceramic on the front doors. Sedans are limited to 35% behind the front doors, and we meter every window before you leave." },
      ],
    },
  },
  Centreville: {
    ppf: {
      heading: "PPF for the I-66 and Route 28 merge",
      body: "Centreville is the funnel where I-66, Route 28, and Route 29 come together, and the express-lane construction has kept gravel trucks on the road for years. Cars from Sully Station, Virginia Run, and Little Rocky Run show up with chips concentrated on the bumper and the front of the hood, exactly the panels a full front PPF package covers. Families with SUVs that make the Braddock Road school run add door cups and rockers with Full Front Extended. We are ten minutes up Route 28, so most Centreville customers drop off in the morning and pick up the same afternoon.",
      faqs: [
        { q: "How far is Skyline Customs from Centreville?", a: "About ten minutes. Take Route 28 north to Walney Rd, or I-66 east to Route 28 north. We are at 4215 Walney Rd, Suite 1A and B, with free parking." },
        { q: "Is partial front enough for a Centreville commuter on I-66?", a: "Partial front covers the bumper, the leading edge of the hood, and the mirrors, which is where I-66 chips land. If you want no visible line on the hood, full front is the better choice." },
      ],
    },
    ceramic: {
      heading: "Ceramic coating for Centreville's tree-lined neighborhoods",
      body: "Centreville's older neighborhoods around Union Mill and Stone Road sit under mature oaks, which means pollen in April, sap in July, and leaves in October on any car parked in a driveway. A Gtechniq Crystal Serum Light coating keeps that from bonding to the paint and makes a hose rinse enough. Add the winter salt from I-66 and Route 28 and the case for a coating is easy. Most Centreville customers choose the 5-year coating on a daily driver and the 7-year Ultra on a car they plan to keep.",
      faqs: [
        { q: "Can I wash a coated car at the touchless washes on Route 28?", a: "Yes. Touchless washes are fine on a coating. Skip brush washes when you can; they add swirls to any paint, coated or not." },
        { q: "Do you do paint correction before coating a Centreville daily driver?", a: "Always. Every coating includes correction so swirls and light scratches are polished out first. The coating then locks in the corrected finish." },
      ],
    },
    tint: {
      heading: "Window tint for Centreville school runs and commutes",
      body: "Centreville families spend a lot of time in the car: Braddock Road school pickups, Route 29 errands, and the I-66 crawl toward Fairfax and Tysons. Ceramic tint keeps the back seat cooler for kids and car seats, and it blocks the UV that fades the interior of a car parked in a Sully Station driveway. On the evening drive west on I-66 the sun sits right at windshield height, so many Centreville drivers add a clear ceramic windshield film that cuts glare without darkening the glass.",
      faqs: [
        { q: "Can you tint just the rear windows on my minivan in Centreville?", a: "Yes. The rear package is our most popular option for family vehicles, and SUVs and vans can legally go dark behind the front doors in Virginia." },
        { q: "Will the tint bubble after a few summers on I-66?", a: "GeoShield Pro Nano Ceramic carries a lifetime warranty against bubbling, peeling, fading, and purpling, so no. Cheap dyed films are the ones that fail." },
      ],
    },
  },
  Herndon: {
    ppf: {
      heading: "PPF for the Dulles Toll Road and airport freight",
      body: "Herndon sits between the Toll Road and Route 28, with airport cargo trucks and data center construction traffic in both directions. That combination shreds a front bumper faster than almost anywhere in Fairfax County. Tech commuters from Worldgate and the Herndon Parkway corridor typically choose full front PPF so the hood, bumper, fenders, and mirrors are covered before the next Toll Road trip. Owners of EVs from the Silver Line neighborhoods like that STEK DYNOshield is computer-cut around sensors and cameras. We are ten to fifteen minutes away down Route 28.",
      faqs: [
        { q: "How do I get to Skyline Customs from Herndon?", a: "Take Route 28 south past the Toll Road to Walney Rd, or Centreville Road south to Route 28. It is about ten to fifteen minutes from Elden Street." },
        { q: "Does PPF cover the headlights on my Herndon commuter?", a: "Full front PPF includes the headlights, which take the same Toll Road gravel as the bumper. Partial front covers the bumper, hood edge, and mirrors only." },
      ],
    },
    ceramic: {
      heading: "Ceramic coating for Herndon's parking decks and townhouse rows",
      body: "A lot of Herndon cars live outside: townhouse streets around Sugarland Run, apartment lots off Elden Street, and long-term parking near Dulles. That means bird droppings, tree sap, and airport jet fallout on the paint every week. A Gtechniq coating keeps those from etching and turns cleanup into a rinse. Herndon customers often combine the coating with a full front PPF in one visit so the film and the paint shed water together. Ask about the 7-year Crystal Serum Ultra if you keep cars a long time.",
      faqs: [
        { q: "I park at Dulles for work trips. Does a coating help?", a: "Yes. Jet fuel residue and bird droppings sit on airport lots for days. A coating keeps them on the surface so they wash off instead of etching the clear coat." },
        { q: "Can you coat a car that already has swirls from an automatic wash?", a: "Yes. Every coating includes paint correction first, so the swirls are polished out and the coating seals a corrected finish." },
      ],
    },
    tint: {
      heading: "Window tint for Herndon Toll Road commuters",
      body: "The Toll Road runs almost due east-west, so Herndon commuters drive into the sunrise and home into the sunset. Ceramic tint on the side windows and a clear ceramic windshield film cut that glare and drop the cabin temperature in cars parked in the open lots around Worldgate and the Herndon Parkway offices. Because GeoShield film is metal-free, it does not interfere with E-ZPass transponders or phone signal. Most Herndon sedans go 35% in the back and a legal 50% up front; SUVs from the Silver Line neighborhoods often choose 20% behind the front doors.",
      faqs: [
        { q: "Will ceramic tint block my E-ZPass on the Toll Road?", a: "No. GeoShield Pro Nano Ceramic contains no metal, so toll transponders, GPS, and phone signals pass through normally." },
        { q: "How long should I keep the windows up after tinting in Herndon?", a: "Three to five days while the film cures. Slight haze or small water pockets during that time are normal and clear on their own." },
      ],
    },
  },
  Sterling: {
    ppf: {
      heading: "PPF for Route 28 and Loudoun data center traffic",
      body: "Sterling's stretch of Route 28 and Route 7 carries a constant stream of dump trucks and flatbeds feeding data center construction, and the gravel they drop lands on your hood at 60 mph. Drivers from Cascades, Potomac Falls, and Countryside come in with chips clustered on the bumper and the front six inches of the hood, which is the case for full front PPF. Pickup and SUV owners who run Route 7 toward Leesburg add Full Front Extended for the rockers. We are ten minutes down Route 28, past the airport.",
      faqs: [
        { q: "How long is the drive from Sterling to your shop?", a: "About ten minutes south on Route 28. Exit at Westfields Blvd or Willard Road toward Walney Rd. Free parking on site." },
        { q: "My truck runs Route 7 past construction every day. Which package?", a: "Full Front Extended. It adds the rocker panels, door edges, and door cups to the full front package, which is where truck-thrown gravel hits a taller vehicle." },
      ],
    },
    ceramic: {
      heading: "Ceramic coating for Sterling's dust and hard water",
      body: "Between the construction dust on Route 28 and the hard well water in parts of Loudoun, Sterling cars pick up a gray film and water spots faster than most. A Gtechniq coating gives the paint a slick surface that dust does not cling to and water beads off before it can spot. Cascades and Potomac Falls customers with HOA rules against driveway washing appreciate that a coated car stays clean between touchless washes. Pair it with a full front PPF and the whole car sheds water the same way.",
      faqs: [
        { q: "Does a ceramic coating stop water spots from well water?", a: "It helps a lot. Water beads and runs off instead of drying flat, and any spots that form sit on the coating and wipe away instead of etching the paint." },
        { q: "How soon can I wash the car after coating?", a: "Wait a week for the coating to fully cure, then wash as normal. Touchless washes on Route 7 are fine; avoid brush washes." },
      ],
    },
    tint: {
      heading: "Window tint for Sterling's open lots and Route 7 glare",
      body: "Sterling has more open parking than shade: Dulles Town Center, the retail strips along Route 7, and the townhouse lots in Cascades all leave cars in full sun. Ceramic tint from GeoShield keeps the cabin cooler and blocks 99% of UV so dashboards and seats stop fading. The Route 7 commute east toward Tysons faces the sunrise, so many Sterling drivers add a clear windshield film for glare. Sedans stay at 35% behind the front doors and 50% up front; SUVs can go darker in the back and most choose 20%.",
      faqs: [
        { q: "Can you match factory privacy glass on my SUV?", a: "Yes. Most factory privacy glass measures around 20%, so we install 20% on the front doors only where the law allows, or a legal 50% ceramic that still blocks the heat." },
        { q: "Is tinting legal on the windshield in Virginia?", a: "Only a non-reflective strip above the AS-1 line. A clear ceramic film that blocks heat and UV without darkening the glass is a legal alternative for the full windshield." },
      ],
    },
  },
  Ashburn: {
    ppf: {
      heading: "PPF for the Greenway, Waxpool Road, and endless construction",
      body: "Ashburn is still being built, and every new phase in Brambleton, Broadlands, and One Loudoun means more dump trucks on Loudoun County Parkway, Waxpool Road, and the Greenway. The paint damage we see from Ashburn is heavy on the lower bumper and fender edges. Full front PPF covers all of it with no line on the hood, and the STEK film self-heals the light scratches from gravel dust. Tesla and Rivian owners from Ashburn Village like that the film is cut around cameras and sensors. Plan on twenty minutes to Walney Rd via Route 28.",
      faqs: [
        { q: "How do I get from Ashburn to Skyline Customs?", a: "Take the Greenway or Waxpool Road to Route 28 south, then exit toward Walney Rd. About twenty minutes from Broadlands or One Loudoun." },
        { q: "Do you do PPF on new EVs from the Ashburn area?", a: "Yes, constantly. Tesla, Rivian, and Lucid patterns are computer-cut so nothing covers a sensor or camera, and the film goes on before the first Greenway commute." },
      ],
    },
    ceramic: {
      heading: "Ceramic coating for new Ashburn neighborhoods without shade",
      body: "New-build Ashburn streets have young trees and no shade, so cars in Brambleton and Broadlands driveways bake in the sun and collect construction dust from every direction. A Gtechniq coating adds UV protection and a slick surface that dust and pollen do not stick to, and the gloss makes a new car look new for years. HOA rules in much of Ashburn limit driveway washing, so a car that rinses clean at a touchless wash is a real convenience. Many Ashburn owners book the coating and a full front PPF together.",
      faqs: [
        { q: "How long does a Gtechniq coating last in Ashburn's sun?", a: "Crystal Serum Light is a 5-year coating and Crystal Serum Ultra is 7 years, both with maintenance washes. UV is what the coating is built to resist." },
        { q: "Can I get the coating done on a Saturday?", a: "We are open Monday through Friday, 9 AM to 6 PM. Most Ashburn customers drop off Monday morning and pick up Tuesday afternoon." },
      ],
    },
    tint: {
      heading: "Window tint for Ashburn's sun-soaked driveways and the Greenway",
      body: "With little tree cover in the newer sections of Ashburn, interiors take a beating from UV, and the Greenway commute east faces the morning sun head-on. GeoShield Pro Nano Ceramic blocks 99% of UV and most of the infrared heat, so a car parked all day at a Loudoun County Parkway office is bearable when you get in. Families in Brambleton and Broadlands mostly choose the rear package at 20% for kids and privacy, with a legal 50% ceramic on the front doors. Metal-free film keeps the Greenway toll transponder working.",
      faqs: [
        { q: "Will tint help the leather in my car that sits in an Ashburn driveway?", a: "Yes. The film blocks 99% of the UV that cracks leather and fades dashboards, which matters most on cars parked outside with no shade." },
        { q: "How long does a rear-package tint take?", a: "About two to three hours at our Chantilly shop. Many Ashburn customers grab lunch on Route 28 and pick up the car after." },
      ],
    },
  },
  Reston: {
    ppf: {
      heading: "PPF for Reston Town Center garages and the Toll Road",
      body: "Reston cars split their time between tight garages at Reston Town Center and the Wiehle-Reston Metro and the fast lanes of the Toll Road and Fairfax County Parkway. That means door-edge scuffs in the garage and rock chips on the highway. Full front PPF handles the highway damage, and Full Front Extended adds door edges and door cups for cars that park in garages every day. Reston owners of luxury EVs and German sedans make up a large share of our PPF customers, and the Toll Road puts us fifteen minutes away.",
      faqs: [
        { q: "Does PPF protect against door dings in Reston Town Center garages?", a: "PPF stops scratches and edge chips from doors and keys; it will not prevent a dent. Door edges and door cups are included in Full Front Extended." },
        { q: "How long is the drive from Reston?", a: "About fifteen minutes. Take the Toll Road or Reston Parkway to Route 28 south, exit toward Walney Rd. Free parking at the shop." },
      ],
    },
    ceramic: {
      heading: "Ceramic coating under Reston's tree canopy",
      body: "Reston was planned around trees, and cars parked on the cluster streets around Lake Anne, South Lakes, and Hunters Woods pay for it in sap, pollen, and bird droppings. A Gtechniq coating keeps those from bonding to the paint so a rinse takes care of them, and it adds the deep gloss that dark cars in Reston's shade tend to lose to swirl marks. Every coating starts with paint correction, so a car that has been through the Reston Parkway brush washes comes out looking new before the coating goes on.",
      faqs: [
        { q: "Can a coating handle sap from the trees on my Reston cluster street?", a: "Yes. Sap sits on the coating instead of the clear coat and comes off with a quick detail spray. Uncoated paint lets sap etch if it sits for a week." },
        { q: "Do you recommend the 5-year or 7-year coating for a leased car?", a: "For a lease, Crystal Serum Light at 5 years is plenty. Crystal Serum Ultra at 7 years is for cars you plan to keep." },
      ],
    },
    tint: {
      heading: "Window tint for Reston commuters and Town Center parking",
      body: "Reston commuters drive the Toll Road into the sunrise and home into the sunset, and cars parked in the open lots around Plaza America and the Wiehle-Reston station sit in full sun. Ceramic tint cuts the glare and the cabin heat without interfering with the Toll Road transponder. Reston drivers in luxury sedans mostly choose a factory-look 35% on the rear and a legal 50% ceramic on the front doors; SUV owners from South Lakes and Hunters Woods go darker behind the front doors. A clear ceramic windshield film is popular for the glare.",
      faqs: [
        { q: "What tint looks factory on a dark luxury sedan?", a: "35% ceramic on the rear windows with 50% on the front doors reads as factory privacy glass and stays inside Virginia law for sedans." },
        { q: "How does the lifetime warranty work if I move away from Reston?", a: "GeoShield's warranty is nationwide, honored by any GeoShield dealer, and covers bubbling, peeling, fading, and purpling for as long as you own the car." },
      ],
    },
  },
  Fairfax: {
    ppf: {
      heading: "PPF for Fairfax's I-66 and Route 50 commuters",
      body: "Fairfax cars run the busiest stretch of I-66 inside the Beltway and the Route 50 corridor past Fair Oaks and Fairfax Circle, where truck traffic and construction gravel are constant. Drivers from Old Town Fairfax, Fairfax Corner, and the GMU area come in with chips across the bumper and hood, which is what full front PPF is built for. Fairfax also has a dense cluster of dealerships along Route 50 and Route 29, so new-car owners often drive straight to Chantilly, fifteen minutes west, to get the film on before the first week of commuting.",
      faqs: [
        { q: "How far is your shop from Fairfax?", a: "About fifteen minutes west on I-66 or Route 50. Take Route 28 north to Walney Rd, or Route 50 west to Walney Rd. Free parking on site." },
        { q: "I commute inside the Beltway on I-66. Is full front overkill?", a: "No. I-66 inside the Beltway is where we see the worst bumper and hood chips. Full front covers those panels with no film line and a 12-year warranty." },
      ],
    },
    ceramic: {
      heading: "Ceramic coating for Fairfax street parking and old trees",
      body: "Older Fairfax neighborhoods around Old Town and Mantua have mature trees and plenty of street parking, so cars collect sap, pollen, and bird droppings that etch clear coat within days in summer. A Gtechniq coating keeps all of that on the surface and makes a hose rinse enough. GMU students and Fairfax commuters who wash at the brush tunnels on Route 50 also benefit from the paint correction that comes with every coating, which removes the swirls before the coating locks in the gloss. Many Fairfax customers combine it with full front PPF.",
      faqs: [
        { q: "I park on the street in Old Town Fairfax. Will a coating help with bird droppings?", a: "Yes. Droppings sit on the coating instead of the paint and wipe off with detail spray. On bare clear coat they etch within a day or two in summer heat." },
        { q: "How much of the car does the ceramic coating cover?", a: "All painted panels, plus trim and wheels if you want them. The coating is a full-vehicle chemical layer; PPF is the physical barrier for the front." },
      ],
    },
    tint: {
      heading: "Window tint for Fairfax parking lots and Route 50 glare",
      body: "Fair Oaks Mall, Fairfax Corner, and the GMU lots leave cars in the open sun for hours, and the Route 50 and I-66 commute runs straight into it morning and evening. GeoShield ceramic tint drops the cabin temperature, blocks 99% of UV, and does not interfere with the phone or GPS on the dash. Fairfax families mostly choose 20% on the rear windows of SUVs and minivans with a legal 50% ceramic up front; sedan owners take 35% in the back. A clear windshield film is the most requested add-on for the I-66 sunset drive.",
      faqs: [
        { q: "Can a GMU student get a same-day tint appointment?", a: "Usually, yes. A rear package takes two to three hours. Call in the morning and we can often fit the car in that day at our Chantilly shop." },
        { q: "Will the Virginia inspection station in Fairfax pass my tint?", a: "Yes. We meter every window before you leave so a sedan is at or above 50% front and 35% rear, and we only install legal shades." },
      ],
    },
  },
  Oakton: {
    ppf: {
      heading: "PPF for Hunter Mill Road and the I-66 Oakton exit",
      body: "Oakton driving is a mix of I-66 highway miles and winding two-lane roads like Hunter Mill and Vale Road, where loose gravel at the shoulders and low branches leave chips and light scratches. Full front PPF covers the highway damage, and the self-healing STEK top coat takes care of the branch scuffs on the hood and mirrors. Oakton has a high share of luxury SUVs and sports cars kept for years, so many owners choose Full Front Extended for the door edges and rockers. We are fifteen minutes away via I-66 or Route 123.",
      faqs: [
        { q: "How do I get to the shop from Oakton?", a: "I-66 west to Route 28 north, exit at Walney Rd. About fifteen minutes from the Oakton Shopping Center. Free parking on site." },
        { q: "Does PPF help with the branch scratches on Hunter Mill Road?", a: "Yes. STEK DYNOshield self-heals light scratches with heat from the sun, so the scuffs a low branch leaves on a hood or mirror disappear." },
      ],
    },
    ceramic: {
      heading: "Ceramic coating for Oakton's long, shaded driveways",
      body: "Oakton lots are big and wooded, which is beautiful and terrible for paint: sap, pollen, leaf tannins, and bird droppings land on a car every day it sits outside. A Gtechniq coating keeps them from bonding so a rinse removes them, and it protects against the well-water spots common in Oakton. Owners who keep a car ten years usually choose the 7-year Crystal Serum Ultra, and many book the coating with full front PPF so the whole car is easy to care for. Paint correction comes first on every job.",
      faqs: [
        { q: "Can you coat the wheels and trim too?", a: "Yes. Wheel and trim coatings are available as add-ons. Brake dust and road grime rinse off coated wheels instead of baking on." },
        { q: "Do you offer pickup from Oakton?", a: "We do not offer pickup, but we are fifteen minutes away and most Oakton customers drop off Monday and pick up Tuesday afternoon for a coating." },
      ],
    },
    tint: {
      heading: "Window tint for Oakton commuters heading east on I-66",
      body: "From Oakton, the morning commute east on I-66 or Route 123 toward Tysons and Arlington points straight into the sunrise. Ceramic tint on the side windows and a clear ceramic windshield film cut that glare and keep the car cool while it sits at the Vienna Metro garage or an open lot in Tysons. Oakton drivers in luxury SUVs mostly pick 20% behind the front doors with a legal 50% up front; sedans take 35% in the back. GeoShield's metal-free film does not affect the E-ZPass for the I-66 express lanes.",
      faqs: [
        { q: "Does tint affect the express-lane E-ZPass on I-66?", a: "No. GeoShield Pro Nano Ceramic has no metal, so transponders, GPS, and phone signals pass through normally." },
        { q: "Can you tint a car with a panoramic sunroof?", a: "Yes. A ceramic film on the sunroof cuts heat noticeably, and we can quote it with the side windows." },
      ],
    },
  },
  Vienna: {
    ppf: {
      heading: "PPF for Maple Avenue traffic and I-66",
      body: "Vienna cars spend their days in stop-and-go on Maple Avenue and Nutley Street, then merge onto I-66 at the Vienna Metro, where the express-lane construction has kept gravel on the road for years. Chips land on the bumper and the front of the hood, which is exactly what full front PPF covers. Vienna has a lot of families keeping cars a long time and plenty of Tesla, BMW, and Porsche owners, and the STEK film's 12-year warranty fits that. We are fifteen minutes west on I-66 or Route 123.",
      faqs: [
        { q: "How do I get to Skyline Customs from Vienna?", a: "I-66 west to Route 28 north, then Walney Rd, or Route 123 south to I-66. About fifteen minutes from Maple Avenue." },
        { q: "Can you PPF a car that already has a few chips from I-66?", a: "Yes. Small chips can be touched up before the film goes on so they stay stable. Film goes on cleanest when the paint is newest, so sooner is better." },
      ],
    },
    ceramic: {
      heading: "Ceramic coating under Vienna's mature trees",
      body: "The tree canopy along the W&OD and the streets off Church Street is a big part of why people live in Vienna, and it is why cars parked outside are covered in pollen in April and sap in July. A Gtechniq coating keeps that from etching the paint and makes a rinse enough. Vienna customers who wash at the brush tunnels on Maple Avenue benefit from the paint correction that comes with every coating. Pair it with a full front PPF and the film and paint shed water the same way.",
      faqs: [
        { q: "Does a coating protect against the pollen that coats Vienna every spring?", a: "Yes. Pollen sits on the coating instead of the clear coat and rinses off with a hose, and the coating's hydrophobic surface keeps morning dew from turning it acidic on the paint." },
        { q: "Is paint correction included on a brand-new car?", a: "Yes. Even new cars from the dealer have wash swirls and transport marks. We polish them out before the coating locks in the finish." },
      ],
    },
    tint: {
      heading: "Window tint for Vienna Metro parking and Maple Avenue",
      body: "Cars that park all day at the Vienna Metro garage or the open lots along Maple Avenue come back hot, and the I-66 commute east faces the sunrise. GeoShield ceramic tint keeps the cabin cooler, blocks 99% of UV, and cuts glare without a mirror finish. Vienna families in SUVs mostly choose 20% behind the front doors with a legal 50% ceramic on the front; sedans stay at 35% in the back. Because the film is metal-free, the I-66 express-lane transponder keeps working.",
      faqs: [
        { q: "What is the darkest legal tint for my sedan in Vienna?", a: "Front side windows must allow more than 50% of light through, rear side windows and rear windshield more than 35%. We meter every window and install only legal shades." },
        { q: "How long until I can roll the windows down?", a: "Three to five days while the film cures. Slight haze or small water pockets during that time are normal and clear on their own." },
      ],
    },
  },
  McLean: {
    ppf: {
      heading: "PPF for McLean's luxury fleet and the GW Parkway",
      body: "McLean has one of the highest concentrations of new luxury and performance cars in Virginia, and they all run the same roads: Route 123, Chain Bridge Road, the GW Parkway, and the Beltway, with gravel from the constant Tysons construction. A chip in a Porsche or Range Rover bumper is expensive to repaint correctly, which is why full front PPF is the standard choice from McLean, with Full Front Extended for the rockers on SUVs and low sports cars. Twenty minutes on I-66 or the Beltway gets you to Walney Rd.",
      faqs: [
        { q: "Do you install PPF on Porsche and other exotics from McLean?", a: "Yes. Porsche, Corvette, BMW M, and Tesla are our most common PPF jobs. Patterns are computer-cut for each model and every edge is wrapped or tucked where the panel allows." },
        { q: "How long is the drive from McLean?", a: "About twenty minutes. Take I-66 west to Route 28 north and exit at Walney Rd, or the Beltway to I-66. Free parking on site." },
      ],
    },
    ceramic: {
      heading: "Ceramic coating for McLean's shaded estates and Langley commutes",
      body: "McLean driveways sit under big trees and often use well water, so cars parked outside collect sap, pollen, and water spots, and dark paint shows every swirl. A Gtechniq coating with paint correction brings back the gloss and keeps those contaminants on the surface. McLean owners who keep cars for years choose the 7-year Crystal Serum Ultra, and many book the coating with full front PPF so the whole car is easy to maintain. Two days at our Chantilly shop, twenty minutes away.",
      faqs: [
        { q: "Can you coat a matte or satin finish?", a: "Yes. We use a matte-safe coating that protects without adding gloss, so the factory satin look stays." },
        { q: "How do I maintain the coating on a car that lives outside in McLean?", a: "A proper two-bucket or touchless wash every couple of weeks and a coating-safe detail spray. No wax, no brush washes." },
      ],
    },
    tint: {
      heading: "Window tint for McLean privacy and the Route 123 commute",
      body: "McLean drivers ask for tint for privacy as much as heat: a darker rear on an SUV parked in a Tysons Galleria garage or on a Langley office lot. GeoShield ceramic delivers both, with 99% UV protection for leather interiors and a factory look. Sedans stay at 35% in the back with a legal 50% ceramic up front; SUVs from McLean's neighborhoods usually choose 20% behind the front doors. The Route 123 and GW Parkway commute faces sunrise glare, so the clear ceramic windshield film is a common add-on.",
      faqs: [
        { q: "What tint looks right on a black luxury SUV?", a: "20% on the rear windows and a legal 50% ceramic on the front doors matches factory privacy glass and stays within Virginia law for SUVs." },
        { q: "Does tint void my car's warranty?", a: "No. Window film is an accepted aftermarket product, and GeoShield carries its own lifetime warranty against bubbling, peeling, fading, and purpling." },
      ],
    },
  },
  Tysons: {
    ppf: {
      heading: "PPF for Tysons construction and the Beltway",
      body: "Tysons has been under construction for a decade, and the gravel from every new tower ends up on Route 7, Route 123, and the Beltway ramps. Cars that commute into Tysons come back with a sandblasted bumper and chips on the hood, and the tight garages at Tysons Corner Center and the Galleria add door-edge scuffs. Full front PPF covers the highway damage; Full Front Extended adds the door edges and cups for daily garage parking. Route 7 or I-495 to I-66 gets you to our Chantilly shop in about twenty minutes.",
      faqs: [
        { q: "I park in a Tysons garage every day. Which coverage?", a: "Full Front Extended. It adds door edges, door cups, and rockers to the full front package, which is where garage and gravel damage meet." },
        { q: "How far is Chantilly from Tysons?", a: "About twenty minutes. Take Route 7 west or I-495 to I-66 west, then Route 28 north to Walney Rd. Free parking on site." },
      ],
    },
    ceramic: {
      heading: "Ceramic coating for Tysons garages and high-rise living",
      body: "Tysons residents in the new high-rises park in garages, which protects paint from sun but not from the construction dust and brake dust that settle in a parking deck. A Gtechniq coating keeps that grime from bonding so the car rinses clean, and it adds gloss that garage lighting shows off. Tysons commuters who wash at the brush tunnels on Route 7 benefit from the paint correction that comes with every coating. Book it with a full front PPF and the whole car is maintenance-light.",
      faqs: [
        { q: "My car lives in a Tysons parking deck. Is a coating still worth it?", a: "Yes. Deck dust and brake dust bond to bare paint and dull it; on a coating they rinse off. The coating also protects on the Beltway and Route 7 every day." },
        { q: "How long is the ceramic coating process?", a: "Two days: paint correction the first day, coating and an indoor cure the second. Pick up the next afternoon." },
      ],
    },
    tint: {
      heading: "Window tint for Tysons commutes and glass-tower glare",
      body: "Tysons is a glass city, and the reflected glare on Route 7 and Route 123 is real in the afternoon. GeoShield ceramic tint cuts glare and cabin heat and blocks 99% of UV without a mirror finish, and the metal-free film keeps the Beltway express-lane transponder working. Tysons drivers in luxury sedans mostly choose a factory-look 35% rear with a legal 50% ceramic front; SUV owners go 20% behind the front doors. The clear ceramic windshield film is popular for the westbound drive home into the sunset.",
      faqs: [
        { q: "Can you tint while I am at work in Tysons?", a: "The shop is in Chantilly, twenty minutes away. Most Tysons customers drop off in the morning and pick up on the way home; a rear package takes two to three hours." },
        { q: "Is reflective or mirror tint legal in Virginia?", a: "Tint may not be more than 20% reflective. GeoShield ceramic is non-reflective, so it is legal and looks factory." },
      ],
    },
  },
  "Falls Church": {
    ppf: {
      heading: "PPF for Route 7, Seven Corners, and I-66",
      body: "Falls Church cars run Route 7 through Seven Corners and Bailey's Crossroads, then jump on I-66 at the Route 7 interchange, one of the most chip-prone stretches inside the Beltway. Drivers from the City of Falls Church and the neighborhoods off Route 29 come in with bumper and hood chips that a full front PPF package covers with no film line. Street parking in the older neighborhoods adds door-edge scratches, so Full Front Extended is a common upgrade. It is about twenty minutes west on I-66 to Walney Rd.",
      faqs: [
        { q: "How do I get to Skyline Customs from Falls Church?", a: "I-66 west to Route 28 north, exit at Walney Rd. About twenty minutes from Broad Street. Free parking at the shop." },
        { q: "I street-park in Falls Church. Does PPF help with key scratches and door scuffs?", a: "Yes. Door edges and door cups are covered in Full Front Extended, and the STEK film self-heals light scratches with heat." },
      ],
    },
    ceramic: {
      heading: "Ceramic coating for Falls Church street parking",
      body: "A lot of Falls Church cars park on the street under old trees, which means bird droppings, sap, and pollen every day and no garage to hide in. A Gtechniq coating keeps those contaminants on the surface so they rinse off, and it blocks the UV that fades paint on a car that never sees shade in winter. Every coating includes paint correction, which removes the swirls from years of Route 7 brush washes. Falls Church customers often add full front PPF in the same visit.",
      faqs: [
        { q: "Can a coating handle a car that is never garaged?", a: "That is exactly what it is for. UV, bird droppings, sap, and acid rain sit on the coating instead of the clear coat, and a rinse removes them." },
        { q: "How often should a coated car be washed?", a: "Every two to three weeks with a touchless or two-bucket wash. Skip brush washes and wax; the coating replaces both." },
      ],
    },
    tint: {
      heading: "Window tint for Falls Church's Route 7 and I-66 glare",
      body: "The Falls Church commute runs east on Route 7 or I-66 into the sunrise and west into the sunset, with cars parked in open lots at Seven Corners and the Mosaic District in between. GeoShield ceramic tint cuts the glare, keeps the cabin cooler, and blocks 99% of UV. Falls Church families in SUVs mostly choose 20% behind the front doors with a legal 50% ceramic in front; sedans take 35% in the back. Metal-free film keeps the I-66 express-lane transponder working, and the clear windshield film is the most requested add-on.",
      faqs: [
        { q: "Will tint help my car that parks on the street in Falls Church?", a: "Yes. The film blocks the UV that fades seats and dashboards, drops the cabin temperature, and adds privacy for anything left inside." },
        { q: "Can I get tint and PPF done in one trip from Falls Church?", a: "Yes. Tint takes a few hours and full front PPF is a one-day job, so we schedule both in a single drop-off." },
      ],
    },
  },
  Arlington: {
    ppf: {
      heading: "PPF for Arlington's I-66, Route 50, and GW Parkway",
      body: "Arlington drivers put miles on I-66 inside the Beltway, Route 50, I-395, and the GW Parkway, where truck traffic and Pentagon-area construction keep gravel on the road. Add tight garages in Rosslyn, Ballston, and Clarendon and street parking in the neighborhoods, and a front bumper takes a beating. Full front PPF covers the highway chips, and Full Front Extended adds door edges and cups for daily garage and curb parking. Arlington is about twenty-five minutes east of Walney Rd on I-66.",
      faqs: [
        { q: "How long is the drive from Arlington?", a: "About twenty-five minutes west on I-66 to Route 28 north, exit at Walney Rd. Free parking at the shop." },
        { q: "I park on the street in Clarendon. What coverage makes sense?", a: "Full Front Extended. It adds door edges, door cups, and rockers to the full front, which is where curb and door damage happens on a street-parked car." },
      ],
    },
    ceramic: {
      heading: "Ceramic coating for Arlington's street-parked cars",
      body: "Most Arlington cars live on the street or in a shared garage, exposed to bird droppings, tree sap along Glebe Road and Columbia Pike, and the grime of a dense urban area. A Gtechniq coating keeps all of that on the surface so a rinse removes it, and it protects paint from the UV a car never escapes when it has no garage. Every coating includes paint correction, so the swirls from years of tunnel washes come out first. Arlington customers often add full front PPF the same visit.",
      faqs: [
        { q: "Is a ceramic coating worth it for a car that street-parks in Arlington?", a: "Yes. Street-parked cars take the most abuse from droppings, sap, and UV. The coating keeps those from etching and cuts wash time in half." },
        { q: "Can I wash a coated car at a self-serve bay?", a: "Yes. A pressure rinse and a foam wash are fine. Avoid the brush at the self-serve bay, which holds grit from the last car." },
      ],
    },
    tint: {
      heading: "Window tint for Arlington privacy and open-lot parking",
      body: "Arlington drivers ask about tint for privacy first: a car parked on a Ballston street or in a Pentagon lot is in view all day. GeoShield ceramic adds privacy, drops the cabin heat, and blocks 99% of UV without a reflective look, and the metal-free film does not interfere with phone or GPS. Sedans stay at 35% behind the front doors with a legal 50% ceramic in front; SUVs from Arlington neighborhoods mostly choose 20% in the back. Because we are twenty-five minutes out on I-66, most Arlington customers book a morning drop-off.",
      faqs: [
        { q: "Can you do tint the same day for someone driving from Arlington?", a: "Yes. A rear package or four side windows takes two to three hours. Book a morning slot and the car is done by early afternoon." },
        { q: "Does tint help with break-ins on a street-parked car?", a: "It adds privacy so items inside are harder to see, which helps. It does not make the glass unbreakable; keep valuables out of sight regardless." },
      ],
    },
  },
  Alexandria: {
    ppf: {
      heading: "PPF for I-395, Route 1, and Old Town streets",
      body: "Alexandria cars run I-395, Route 1, and the Beltway, with truck traffic from the Port and the Kingstowne construction throwing gravel, then squeeze into Old Town's brick-lined street parking and tight garages. The result is bumper chips from the highway and door-edge scratches from the curb. Full front PPF covers the highway damage, and Full Front Extended adds door edges, cups, and rockers for the street parkers. Alexandria is about twenty-five to thirty minutes from our Chantilly shop via I-66 or Route 50.",
      faqs: [
        { q: "How do I get to your shop from Alexandria?", a: "Take I-395 or the Beltway to I-66 west, then Route 28 north to Walney Rd. About twenty-five to thirty minutes from Old Town. Free parking on site." },
        { q: "Do you PPF trucks and SUVs from Fort Belvoir and Kingstowne?", a: "Yes. Trucks and SUVs usually take Full Front Extended for the rockers and door edges that gravel hits on a taller vehicle." },
      ],
    },
    ceramic: {
      heading: "Ceramic coating for Alexandria's humid, tree-lined streets",
      body: "Alexandria's river humidity and the trees along Old Town and Del Ray streets leave cars covered in dew, pollen, and bird droppings, and salt from the Beltway and Route 1 adds up in winter. A Gtechniq coating keeps that from bonding to the paint and makes a rinse enough. Because so many Alexandria cars park on the street, the UV protection matters too: it slows the fading that bare paint suffers without a garage. Every coating starts with paint correction, and many Alexandria customers add full front PPF in the same trip.",
      faqs: [
        { q: "Can a coating handle the salt on Route 1 and the Beltway in winter?", a: "Yes. Salt and brine rinse off a coated car instead of bonding, which is the whole point of a coating before winter." },
        { q: "How long should I plan for a coating trip from Alexandria?", a: "Two days. Drop off in the morning, pick up the next afternoon. Most Alexandria customers come out once and get PPF at the same time." },
      ],
    },
    tint: {
      heading: "Window tint for Alexandria street parking and the I-395 sun",
      body: "Cars parked on the street in Old Town, Del Ray, and Kingstowne sit in full sun most of the day, and the I-395 and Beltway commutes face glare in both directions. GeoShield ceramic tint drops the cabin temperature, blocks 99% of UV, and adds privacy for street-parked cars without a mirror finish. Alexandria sedans stay at 35% in the back with a legal 50% ceramic up front; SUV owners mostly choose 20% behind the front doors. The metal-free film keeps the I-395 express-lane transponder working.",
      faqs: [
        { q: "Is a trip to Chantilly worth it for tint from Alexandria?", a: "A rear package takes two to three hours, and many Alexandria customers combine it with PPF or a coating so one trip covers everything." },
        { q: "What is the legal tint for the back window of my sedan?", a: "Rear side windows and the rear windshield must allow more than 35% of light through on a sedan. SUVs and vans may go darker behind the front doors." },
      ],
    },
  },
  Burke: {
    ppf: {
      heading: "PPF for the Fairfax County Parkway and Burke Centre",
      body: "Burke commutes run the Fairfax County Parkway, Braddock Road, and Old Keene Mill Road to the Springfield interchange or I-66, and the Parkway's endless construction has kept gravel on the road for years. Chips land on the bumper and hood, exactly what full front PPF covers with no film line. Burke's family SUVs and trucks that head to Burke Lake or the VRE lot every day often add Full Front Extended for rockers and door cups. The Parkway north to Route 28 gets you to Walney Rd in about twenty minutes.",
      faqs: [
        { q: "How far is your shop from Burke?", a: "About twenty minutes. Take the Fairfax County Parkway north to Route 50 or I-66, then Route 28 north to Walney Rd. Free parking on site." },
        { q: "Does full front PPF cover the mirrors that get hit on the Parkway?", a: "Yes. Full front covers the hood, bumper, both fenders, mirrors, headlights, and A-pillars." },
      ],
    },
    ceramic: {
      heading: "Ceramic coating for Burke's wooded cul-de-sacs",
      body: "Burke neighborhoods are built into the woods around Burke Lake and Lake Braddock, which means pollen, sap, and bird droppings on any car parked in the driveway from March through October. A Gtechniq coating keeps those from bonding to the paint so a rinse removes them, and it protects the finish from the salt on Braddock Road in winter. Burke families that keep cars a long time usually choose the 7-year Crystal Serum Ultra and pair it with full front PPF for the Parkway commute.",
      faqs: [
        { q: "Will a coating stop the leaf stains on my car every fall in Burke?", a: "Yes. Leaf tannins sit on the coating instead of etching the paint and wash off, even after a wet weekend under the trees." },
        { q: "How long does the coating last on a family SUV?", a: "Crystal Serum Light is a 5-year coating and Crystal Serum Ultra is 7 years, with regular touchless or hand washes." },
      ],
    },
    tint: {
      heading: "Window tint for Burke school runs and VRE parking",
      body: "Burke cars spend their days at Robinson and Lake Braddock pickups, in the open VRE lot, and on the Parkway commute that faces the sun both ways. GeoShield ceramic tint keeps the back seat cooler for kids and car seats, blocks 99% of UV, and cuts glare without a reflective look. Most Burke families choose 20% on the rear of SUVs and minivans with a legal 50% ceramic on the front doors; sedans take 35% in the back. A clear ceramic windshield film is a popular add-on for the Braddock Road sunset.",
      faqs: [
        { q: "Can you tint a minivan's rear windows darker than a sedan's?", a: "Yes. Virginia allows any darkness behind the front doors on SUVs, vans, and trucks. Sedans are limited to 35% in the back." },
        { q: "Will tint keep the kids' car seats cooler?", a: "Noticeably. Ceramic film blocks most of the infrared heat, so the back seat is not an oven after a Burke Lake afternoon." },
      ],
    },
  },
  Springfield: {
    ppf: {
      heading: "PPF for the Springfield Interchange and I-95",
      body: "The Springfield Interchange is where I-95, I-395, and the Beltway meet, and the truck traffic through it is the heaviest in Northern Virginia. Cars from Springfield, Franconia, and Kingstowne come in with a peppered bumper and hood chips from Backlick Road and the Franconia-Springfield Parkway. Full front PPF covers those panels with no film line, and Fort Belvoir commuters in trucks and SUVs add Full Front Extended for rockers and door edges. Take the Fairfax County Parkway north or I-66 west to reach Walney Rd in about twenty-five minutes.",
      faqs: [
        { q: "How do I get to Skyline Customs from Springfield?", a: "Fairfax County Parkway north to Route 28, or I-395 to I-66 west to Route 28 north. Exit at Walney Rd. About twenty-five minutes." },
        { q: "I commute through the Mixing Bowl every day. Is partial front enough?", a: "Partial front covers the bumper, hood edge, and mirrors. For a daily I-95 commuter we recommend full front so the whole hood and fenders are covered." },
      ],
    },
    ceramic: {
      heading: "Ceramic coating for Springfield commuters and townhouse lots",
      body: "Springfield cars spend a lot of time parked in open townhouse lots off Old Keene Mill Road and at Springfield Town Center, then sit in I-95 traffic breathing diesel soot. A Gtechniq coating keeps that grime, plus pollen and bird droppings, from bonding to the paint so a rinse removes it, and it shrugs off the winter salt from the Beltway. Every coating includes paint correction to remove swirls first. Springfield customers often make one trip for the coating and full front PPF together.",
      faqs: [
        { q: "Does a coating help with the diesel film from I-95 traffic?", a: "Yes. Road film and soot sit on the coating's slick surface and rinse off instead of bonding to the clear coat." },
        { q: "Do you need the car for two days for a coating?", a: "Yes. Correction the first day, coating and cure the second. Springfield customers usually drop off Monday morning and pick up Tuesday afternoon." },
      ],
    },
    tint: {
      heading: "Window tint for Springfield's I-95 glare and open lots",
      body: "Springfield commuters face the sun on I-95 and I-395 both directions, and cars parked at the Franconia-Springfield Metro or the Town Center lots bake all day. GeoShield ceramic tint drops the cabin temperature, blocks 99% of UV, and cuts glare without a mirror finish, and the metal-free film keeps the I-95 express-lane E-ZPass working. Springfield families in SUVs mostly choose 20% behind the front doors with a legal 50% ceramic in front; sedans take 35% in the back. The clear windshield film is the most common add-on.",
      faqs: [
        { q: "Will ceramic tint interfere with my I-95 express-lane E-ZPass?", a: "No. GeoShield Pro Nano Ceramic contains no metal, so transponders, GPS, and phones work normally." },
        { q: "How long does a full tint job take for a Springfield customer?", a: "Two to three hours for most cars. Book a morning slot and pick up by early afternoon." },
      ],
    },
  },
  Manassas: {
    ppf: {
      heading: "PPF for Route 28 quarry trucks and I-66",
      body: "Manassas has something most cities do not: a working quarry on Route 28 and a steady stream of loaded gravel trucks heading north past Yorkshire toward Centreville. Cars from Manassas, Manassas Park, and Bristow come in with the worst bumper chipping we see, plus I-66 damage from the Route 234 and Sudley Road merges. Full front PPF covers the bumper, hood, fenders, mirrors, and headlights, and trucks that run Prince William Parkway add rockers with Full Front Extended. Route 28 north puts you at Walney Rd in about twenty minutes.",
      faqs: [
        { q: "How long is the drive from Manassas to your shop?", a: "About twenty minutes north on Route 28 to Walney Rd, or I-66 east to Route 28 north. Free parking on site." },
        { q: "My bumper is already chipped from the Route 28 gravel trucks. Can you still PPF it?", a: "Yes. Chips are touched up so they stay stable, then the film goes on. For a badly pitted bumper we can quote a repaint first so the film has a clean surface." },
      ],
    },
    ceramic: {
      heading: "Ceramic coating for Manassas dust and hard water",
      body: "Between the quarry dust on Route 28, the construction along Prince William Parkway, and well water in the outlying neighborhoods, Manassas cars pick up a gray film and water spots fast. A Gtechniq coating gives the paint a slick surface that dust does not cling to, and water beads off before it dries into spots. Old Town Manassas street parking adds bird droppings and sap, which the coating keeps on the surface. Every coating includes paint correction, and many Manassas customers add full front PPF the same visit.",
      faqs: [
        { q: "Does a coating protect against quarry dust from Route 28?", a: "Yes. Dust settles on the coating rather than bonding to the paint, and a rinse removes it. On bare paint it works into the clear coat and dulls the finish." },
        { q: "Can you coat a truck bed cover and trim too?", a: "Yes. Plastic trim and hard tonneau covers can be coated so they stop fading gray in the sun." },
      ],
    },
    tint: {
      heading: "Window tint for Manassas trucks and the I-66 commute",
      body: "Manassas has a lot of trucks and SUVs, and their owners want tint for heat and privacy on job sites, at the VRE lot, and on the I-66 commute east into the sunrise. GeoShield ceramic tint blocks 99% of UV and most infrared heat, so a truck parked in the sun all day at a Prince William Parkway site is bearable at 5 PM. Trucks and SUVs can legally go dark behind the front doors and most choose 20%, with a legal 50% ceramic on the front doors. Sedans stay at 35% in the back.",
      faqs: [
        { q: "Can you tint the rear window of my pickup?", a: "Yes. Trucks can go any darkness behind the front doors in Virginia, and the rear glass on a pickup is a common request for heat and privacy." },
        { q: "Will the tint hold up to a truck that lives outside in Manassas?", a: "Yes. GeoShield Pro Nano Ceramic carries a lifetime warranty against bubbling, peeling, fading, and purpling." },
      ],
    },
  },
  Gainesville: {
    ppf: {
      heading: "PPF for the I-66 rebuild and Linton Hall Road",
      body: "Gainesville drivers live with the I-66 and Route 29 interchange construction and the Linton Hall Road corridor, where dump trucks feed new subdivisions in Bristow and Haymarket. The chips concentrate on the bumper and the front of the hood, which full front PPF covers with no film line. Families in Heritage Hunt and Virginia Oaks with SUVs and trucks that run Route 29 add Full Front Extended for rockers and door edges. I-66 east to Route 28 north brings you to Walney Rd in about twenty minutes.",
      faqs: [
        { q: "How do I get from Gainesville to Skyline Customs?", a: "I-66 east to Route 28 north, exit at Walney Rd. About twenty minutes from Virginia Gateway. Free parking on site." },
        { q: "Is PPF worth it on a truck that sees gravel on Linton Hall Road?", a: "Yes, and Full Front Extended is the right package: it adds rockers, door edges, and door cups to the full front for gravel thrown at a taller vehicle." },
      ],
    },
    ceramic: {
      heading: "Ceramic coating for Gainesville's new subdivisions",
      body: "Gainesville's newer neighborhoods have little shade and a lot of construction dust from the next phase being built next door, and many homes use well water that spots paint. A Gtechniq coating adds UV protection for cars parked in open driveways and a slick surface that dust and water slide off. HOA rules in much of Gainesville limit driveway washing, so a car that rinses clean at a touchless wash is a real convenience. Many Gainesville customers book the coating and full front PPF in one visit.",
      faqs: [
        { q: "How does a coating handle well-water spots?", a: "Water beads and runs off a coated car instead of drying flat, and any spots that form sit on the coating and wipe off with detail spray." },
        { q: "Do you coat brand-new cars from the Gainesville dealerships?", a: "Yes. New cars still get paint correction first to remove dealer wash swirls, then the coating locks in the new-car gloss." },
      ],
    },
    tint: {
      heading: "Window tint for Gainesville commutes and open driveways",
      body: "The Gainesville commute east on I-66 faces the sunrise every morning, and cars parked in shadeless driveways in Heritage Hunt and Bristow bake all day. GeoShield ceramic tint drops the cabin temperature, blocks 99% of UV, and cuts glare without a mirror finish, and the metal-free film keeps the I-66 express-lane E-ZPass working. Gainesville families in SUVs mostly choose 20% behind the front doors with a legal 50% ceramic in front; sedans take 35% in the back. The clear windshield film is popular for the I-66 glare.",
      faqs: [
        { q: "Does tint work with the I-66 express-lane E-ZPass?", a: "Yes. GeoShield Pro Nano Ceramic has no metal, so transponders work normally." },
        { q: "How long does a rear-package tint take?", a: "About two to three hours. Gainesville customers usually drop off in the morning and pick up around lunch." },
      ],
    },
  },
  Leesburg: {
    ppf: {
      heading: "PPF for Route 7, Route 15, and Loudoun's country roads",
      body: "Leesburg driving mixes the Route 7 bypass and the Greenway with two-lane roads like Route 15 and Route 9 where farm trucks and gravel shoulders throw stones. Cars from Lansdowne, Leesburg's historic district, and the Route 15 corridor come in with bumper and hood chips, which full front PPF covers with no film line. Trucks and SUVs that run the gravel roads toward Lucketts and Purcellville add Full Front Extended for rockers and door edges. Leesburg is about thirty minutes from Walney Rd via Route 7 or the Greenway.",
      faqs: [
        { q: "How far is Skyline Customs from Leesburg?", a: "About thirty minutes. Take the Greenway or Route 7 east to Route 28 south, exit toward Walney Rd. Free parking on site." },
        { q: "Do you PPF trucks that drive gravel roads in western Loudoun?", a: "Yes. Full Front Extended is the package for gravel: it adds rockers, door edges, and door cups to the full front." },
      ],
    },
    ceramic: {
      heading: "Ceramic coating for Leesburg's well water and rural dust",
      body: "Many Leesburg homes outside town are on well water, and the dust from Route 15 and the gravel roads of western Loudoun settles on every car. A Gtechniq coating gives paint a slick surface that dust does not cling to and water beads off before it spots. Cars parked on the historic district's tree-lined streets get sap and bird droppings that the coating keeps on the surface. Because the drive is thirty minutes, Leesburg customers usually book the coating with full front PPF so one trip covers both.",
      faqs: [
        { q: "Can I do PPF and a coating in one trip from Leesburg?", a: "Yes. Full front PPF is a one-day job and the coating adds a day, so plan on two days total and one round trip." },
        { q: "Does the coating help with the dust on the gravel roads near Lucketts?", a: "Yes. Dust rinses off a coated car instead of working into the clear coat, and the gloss stays." },
      ],
    },
    tint: {
      heading: "Window tint for Leesburg's Greenway commute and open lots",
      body: "Leesburg commuters drive the Greenway and Route 7 east into the sunrise, and cars parked at the Leesburg Outlets or the county government lots sit in the open all day. GeoShield ceramic tint drops the cabin temperature, blocks 99% of UV, and cuts glare, and the metal-free film keeps the Greenway toll transponder working. Leesburg families in SUVs and trucks mostly choose 20% behind the front doors with a legal 50% ceramic in front; sedans take 35% in the back. A clear ceramic windshield film is a common add-on for the Route 7 glare.",
      faqs: [
        { q: "Will tint affect the Greenway toll transponder?", a: "No. GeoShield Pro Nano Ceramic contains no metal, so E-ZPass, GPS, and phone signals pass through normally." },
        { q: "Is it worth the drive from Leesburg for tint?", a: "A rear package takes two to three hours and carries a lifetime warranty. Many Leesburg customers pair it with PPF so one trip covers both." },
      ],
    },
  },
  Woodbridge: {
    ppf: {
      heading: "PPF for the I-95 express lanes and Route 1",
      body: "Woodbridge commuters spend hours on I-95 and Route 1 behind trucks heading to and from the Port and the Potomac Mills distribution centers, and the express-lane construction has kept gravel on the road for years. Cars from Lake Ridge, Dale City, and Occoquan come in with peppered bumpers and hood chips that full front PPF covers with no film line. Trucks that run Prince William Parkway add Full Front Extended for rockers and door edges. Woodbridge is about thirty minutes from Walney Rd via the Parkway and Route 28.",
      faqs: [
        { q: "How do I get to your shop from Woodbridge?", a: "Prince William Parkway west to Route 28 north, or I-95 to the Fairfax County Parkway north. Exit at Walney Rd. About thirty minutes." },
        { q: "I commute I-95 every day. How long does full front PPF take?", a: "One day. Drop off in the morning and the car is ready that afternoon with the hood, bumper, fenders, mirrors, headlights, and A-pillars covered." },
      ],
    },
    ceramic: {
      heading: "Ceramic coating for Woodbridge's long commutes and open lots",
      body: "A Woodbridge car spends a lot of time in I-95 traffic breathing diesel soot and then sits in an open townhouse lot in Dale City or Lake Ridge collecting bird droppings and sap. A Gtechniq coating keeps that grime from bonding to the paint so a rinse removes it, and it shrugs off the winter salt on Route 1 and the Parkway. Every coating includes paint correction to remove the swirls first. Because the drive is thirty minutes, most Woodbridge customers book the coating and full front PPF together.",
      faqs: [
        { q: "Does a coating help with the road film from I-95 traffic?", a: "Yes. Soot and road film sit on the coating and rinse off instead of bonding to the clear coat and dulling it." },
        { q: "How long does the coating process take?", a: "Two days. Correction the first day, coating and an indoor cure the second. Drop off Monday, pick up Tuesday afternoon." },
      ],
    },
    tint: {
      heading: "Window tint for Woodbridge commuters and townhouse lots",
      body: "Woodbridge commuters face the sun on I-95 both directions, and cars parked in open lots at Potomac Mills, the VRE, and townhouse communities bake all day. GeoShield ceramic tint drops the cabin temperature, blocks 99% of UV, and cuts glare without a mirror finish, and the metal-free film keeps the I-95 express-lane E-ZPass working. Woodbridge families in SUVs and trucks mostly choose 20% behind the front doors with a legal 50% ceramic in front; sedans take 35% in the back. The clear windshield film is a common add-on.",
      faqs: [
        { q: "Will tint block my I-95 express-lane E-ZPass?", a: "No. GeoShield Pro Nano Ceramic has no metal, so transponders, GPS, and phones work normally." },
        { q: "Can you tint and PPF the car in one trip from Woodbridge?", a: "Yes. Tint takes a few hours and full front PPF is a one-day job, so both fit in one drop-off." },
      ],
    },
  },
  Stafford: {
    ppf: {
      heading: "PPF for Stafford's I-95 slog and Garrisonville Road",
      body: "Stafford has some of the longest commutes in Virginia, and every mile of I-95 north is behind trucks throwing gravel from the express-lane and Rappahannock bridge construction. Cars from Aquia Harbour, Embrey Mill, and the Garrisonville Road corridor arrive with peppered bumpers and hood chips that full front PPF covers with no film line. Quantico personnel in trucks and SUVs add Full Front Extended for rockers and door edges. Stafford is about forty minutes from Walney Rd, so most customers make one trip for PPF and a coating together.",
      faqs: [
        { q: "How far is Skyline Customs from Stafford?", a: "About thirty-five to forty minutes. I-95 north to the Fairfax County Parkway or I-66 west, then Route 28 north to Walney Rd. Free parking on site." },
        { q: "Can I get PPF and a ceramic coating done in one trip from Stafford?", a: "Yes. Full front PPF is one day and the coating adds a day, so plan on two days and one round trip." },
      ],
    },
    ceramic: {
      heading: "Ceramic coating for Stafford commuters and new subdivisions",
      body: "Stafford cars spend hours in I-95 traffic collecting diesel soot, then park in shadeless new subdivisions like Embrey Mill where construction dust and well-water spots are constant. A Gtechniq coating keeps that grime and dust from bonding to the paint so a rinse removes it, beads off the water before it spots, and blocks the UV that fades paint in an open driveway. Every coating includes paint correction. Given the drive, most Stafford customers book the coating with full front PPF in a single visit.",
      faqs: [
        { q: "Does a coating help with well-water spots in Stafford?", a: "Yes. Water beads and runs off instead of drying flat, and any spots that form sit on the coating and wipe away." },
        { q: "How long does the coating last on a daily I-95 commuter?", a: "Crystal Serum Light is a 5-year coating and Crystal Serum Ultra is 7 years, with regular touchless or hand washes." },
      ],
    },
    tint: {
      heading: "Window tint for Stafford's commute and Quantico parking",
      body: "Stafford commuters face the sun on I-95 both directions, and cars parked at the Quantico lots, the VRE, and shadeless subdivisions sit in full sun all day. GeoShield ceramic tint drops the cabin temperature, blocks 99% of UV, and cuts glare without a mirror finish, and the metal-free film keeps the I-95 express-lane E-ZPass working. Stafford families in SUVs and trucks mostly choose 20% behind the front doors with a legal 50% ceramic in front; sedans take 35% in the back. Base access requires legal, non-reflective tint, which is what we install.",
      faqs: [
        { q: "Is your tint legal for driving onto Quantico?", a: "Yes. We install only Virginia-legal, non-reflective shades and meter every window before you leave." },
        { q: "How long should I plan for tint coming from Stafford?", a: "A rear package takes two to three hours. Many Stafford customers pair it with PPF so one trip covers both." },
      ],
    },
  },
  Fredericksburg: {
    ppf: {
      heading: "PPF for Fredericksburg's I-95, Route 3, and Route 17",
      body: "Fredericksburg drivers put serious miles on I-95, Route 3, and Route 17, with truck traffic from the distribution centers along I-95 and construction on the Rappahannock crossings throwing gravel the whole way. Cars from Central Park, Spotsylvania, and downtown come in with peppered bumpers and hood chips that full front PPF covers with no film line. Trucks and SUVs that run Route 3 west toward the lake add Full Front Extended for rockers and door edges. Fredericksburg is about fifty minutes from Walney Rd, so plan one trip for PPF and a coating together.",
      faqs: [
        { q: "How far is your shop from Fredericksburg?", a: "About forty-five to fifty minutes. I-95 north to I-66 west or the Fairfax County Parkway, then Route 28 north to Walney Rd. Free parking on site." },
        { q: "Is the drive from Fredericksburg worth it for PPF?", a: "Customers make the trip for STEK-certified installs with a 12-year warranty, and most combine PPF with a coating or tint so one visit covers everything." },
      ],
    },
    ceramic: {
      heading: "Ceramic coating for Fredericksburg's long commutes and open lots",
      body: "Fredericksburg cars spend hours on I-95 collecting diesel soot and then park in open lots at the VRE, Central Park, and Spotsylvania Towne Centre, or in shadeless subdivisions on well water. A Gtechniq coating keeps grime and dust from bonding to the paint, beads off water before it spots, and blocks the UV that fades paint parked in the open. Every coating includes paint correction to remove swirls first. Because of the drive, nearly every Fredericksburg customer books the coating with full front PPF in one visit.",
      faqs: [
        { q: "Can I drop the car off for both PPF and coating in one trip?", a: "Yes. Plan on two days: full front PPF the first day, coating and cure the second. One round trip from Fredericksburg." },
        { q: "How do I maintain the coating with well water at home?", a: "Rinse and dry the car rather than letting it air-dry, or use a touchless wash. The coating keeps spots from etching either way." },
      ],
    },
    tint: {
      heading: "Window tint for Fredericksburg's I-95 commute and open lots",
      body: "Fredericksburg commuters drive I-95 north into the morning glare and home into the sunset, and cars parked at the VRE, Central Park, and the UMW lots sit in full sun all day. GeoShield ceramic tint drops the cabin temperature, blocks 99% of UV, and cuts glare without a mirror finish, and the metal-free film keeps the I-95 express-lane E-ZPass working. Fredericksburg families in SUVs and trucks mostly choose 20% behind the front doors with a legal 50% ceramic in front; sedans take 35% in the back.",
      faqs: [
        { q: "Can you do tint and PPF the same day for a Fredericksburg customer?", a: "Yes. Tint takes a few hours and full front PPF is a one-day job, so both fit in one drop-off and one round trip." },
        { q: "What warranty comes with the tint?", a: "GeoShield's nationwide lifetime warranty against bubbling, peeling, fading, and purpling, honored by GeoShield dealers anywhere you move." },
      ],
    },
  },
};

export const cityServiceNote = (city: string, service: ServiceKey): CityServiceNote | undefined => CITY_SERVICE_NOTES[city]?.[service];
