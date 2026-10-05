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

  "Washington DC": {
    ppf: {
      heading: "PPF for District cars that park on the street",
      body: "A car parked on a DC street takes hits from both directions: gravel and brine on I-66 and the Beltway during the commute, and bumper taps, bike pedals, and key scrapes at the curb in Dupont, Logan Circle, and Capitol Hill. Full front PPF covers the hood, bumper, fenders, mirrors, and headlights, which is where highway debris lands, and the STEK DYNOshield film self-heals the light scratches that come with parallel parking. For cars that squeeze into alley garages behind rowhouses, Full Front Extended adds door edges and door cups. Buyers who pick up a new car across the river in Arlington or out in Tysons often continue west on I-66 to Chantilly so the film goes on before the car ever sees a District curb. Plan about forty minutes each way, with free parking at the shop.",
      faqs: [
        { q: "I just bought a car in Arlington and live in DC. Should I get PPF before parking it on the street?", a: "Yes, ideally before it ever gets parallel parked. Factory paint that has never met a curb takes the film cleanly, with nothing underneath to show through. Full front covers the highway damage from I-66, and the self-healing top coat takes care of the light scuffs that come with curb parking in the District." },
        { q: "How far is Skyline Customs from downtown DC, and is it worth the trip?", a: "About forty minutes west on I-66, or the Toll Road to Route 28 south, exit toward Walney Rd. Most full front installs finish the same day, so you can leave the car at 9 AM, spend the day at Dulles-area meetings or work remotely nearby, and drive back before the evening rush." },
      ],
    },
    ceramic: {
      heading: "Ceramic coating for DC street parking and tree-lined blocks",
      body: "The District's best blocks are the shadiest ones, and the oaks and elms over the streets of Capitol Hill, Cleveland Park, and Shaw drop sap, pollen, and bird droppings on every car that parks beneath them. Add the morning dew, the summer humidity, and the salt brine spread before each snow, and uncoated paint in DC develops water spots and etching within a couple of seasons. A Gtechniq coating puts a hard, slick layer over the paint so those contaminants sit on top and rinse off at a touchless wash instead of bonding to the clear coat. Every coating starts with paint correction, which matters for cars that have been through the brush washes along New York Avenue. Owners choose Crystal Serum Light for a lease and Crystal Serum Ultra for a car they plan to keep through a few more winters on the street.",
      faqs: [
        { q: "My car lives on the street in Capitol Hill with no garage. Will a coating actually hold up?", a: "That is the car a coating helps most. Sap, droppings, and pollen stay on the coating instead of the paint, and the UV resistance slows fading on a car that never sees shade. Rinse it at a touchless wash every couple of weeks and the gloss stays." },
        { q: "Which coating should I pick if I ride Metro all week and only drive on weekends?", a: "A weekend car that sits outside the rest of the week needs protection as much as a commuter. Crystal Serum Ultra lasts 7 years with maintenance washes, so it covers the car's whole time with you. Crystal Serum Light is 5 years and a good fit if the car is leased." },
      ],
    },
    tint: {
      heading: "Window tint that stays legal under District of Columbia law",
      body: "The District of Columbia tint law is the strictest in the region: sedans registered in DC may go no darker than 70% VLT on the front side windows and 50% on the rear sides and back glass, while vans and SUVs may go to 35% behind the front doors. A windshield strip above the AS-1 line is the only windshield film allowed. GeoShield Pro Nano Ceramic is built for exactly this situation, because a light 70% film still blocks 99% of UV and a large share of infrared heat, so a car baking at a Navy Yard meter or in a Georgetown driveway stays cooler without looking dark. We only install film that is legal where the car is registered, so tell us the plate state when you book. The film carries a nationwide lifetime warranty from GeoShield against fading, bubbling, and peeling.",
      faqs: [
        { q: "What is the legal tint limit for a car registered in DC?", a: "For sedans registered in the District, 70% VLT on the front side windows and 50% on the rear side windows and back glass. A van or SUV registered in DC may run 35% behind the front doors. The windshield gets only a strip above the AS-1 line. We install to those numbers for DC plates." },
        { q: "Is a 70% ceramic tint even worth it on my Dupont Circle car that parks in the sun?", a: "Yes. The heat and UV rejection in GeoShield's ceramic film come from the nano-ceramic layer, not from darkness, so a 70% film cuts cabin heat and blocks 99% of UV while the glass still looks nearly clear. It also keeps the dash and leather from fading at the curb." },
      ],
    },
  },
  "Bethesda": {
    ppf: {
      heading: "PPF for Bethesda's Beltway crossings and garage ramps",
      body: "Bethesda drivers cross the American Legion Bridge more than anyone, and the Beltway approach on both sides of the river has been a work zone for years, with milled pavement, barrier walls, and trucks hauling fill. That is why the cars we see from Chevy Chase, Edgemoor, and Bradley Hills carry chips across the bumper and the front edge of the hood. Full front PPF covers the hood, bumper, both fenders, mirrors, and headlights with no film line to see. Cars that live in the tight garages under Bethesda Row and the Metro-area condos also get scuffed on the door edges by concrete pillars, and Full Front Extended adds those edges and the door cups. STEK DYNOshield self-heals the small scratches with a little heat from the sun, and the film carries a 12-year warranty. Bethesda is about thirty-five minutes from Walney Rd over the bridge and Route 7.",
      faqs: [
        { q: "I am picking up a new car and live near Wisconsin Avenue. When should the film go on?", a: "Within the first week, before the Beltway gets a chance at the bumper. Fresh paint takes film with no chips underneath, so the finish looks untouched. Many Bethesda owners drive straight from the dealership to Chantilly, about thirty-five minutes, and pick the car up the same afternoon." },
        { q: "Is the Beltway drive to Chantilly really only thirty-five minutes from Bethesda?", a: "Outside of rush hour, yes. Take I-495 across the American Legion Bridge, exit to Route 7 west, then Route 28 south to Walney Rd. Morning drop-offs after 9 AM and afternoon pickups before 3 PM avoid the worst of the bridge traffic. Parking at the shop is free." },
      ],
    },
    ceramic: {
      heading: "Ceramic coating for Bethesda's oaks, pollen, and Metro lots",
      body: "Bethesda's older neighborhoods in Chevy Chase, Battery Park, and the streets around Bradley Boulevard sit under a heavy canopy of oaks and tulip poplars, and cars parked in those driveways wear a yellow coat of pollen every April and sap all summer. Commuter cars left outside at the Grosvenor and Medical Center Metro lots bake in the sun and take the afternoon storms that leave mineral spots on dark paint. A Gtechniq coating makes the surface slick enough that pollen rinses off, sap wipes away, and water beads instead of drying flat. We correct the paint first, which removes the swirl marks that Bethesda cars pick up at the automated washes along Rockville Pike, and then apply Crystal Serum Light for a 5-year coating or Crystal Serum Ultra for 7 years. Either one makes the Saturday wash a ten-minute rinse.",
      faqs: [
        { q: "My car sits under big trees in Chevy Chase all week. Will the coating keep sap from damaging the paint?", a: "Yes. Sap lands on the hard coating layer rather than the clear coat, so it softens and wipes away with a detail spray instead of etching in. The same is true for bird droppings and the pollen that coats everything in Bethesda each spring." },
        { q: "Can I get the coating and PPF done in one trip across the bridge from Bethesda?", a: "Yes, and most Bethesda customers do. Full front PPF takes a day and the coating adds a day, so you drop off one morning and pick up the next afternoon. We coat right over the film so the whole front sheds water the same way." },
      ],
    },
    tint: {
      heading: "Window tint for Bethesda commuters under Maryland's 35% rule",
      body: "Maryland tint law allows 35% VLT on every window of a passenger car, front sides, rear sides, and back glass alike, and multipurpose vehicles such as SUVs may go darker behind the front doors. The windshield may carry nothing more than a strip above the AS-1 line, though medical exemptions are available to drivers who qualify. For Bethesda drivers that means a sedan can wear a uniform 35% ceramic all the way around and look factory. GeoShield Pro Nano Ceramic blocks 99% of UV and up to 83% of solar heat, which matters for cars parked in the open lots at Westfield Montgomery Mall and the surface lots near NIH. The film is metal-free, so the E-ZPass transponder for the I-270 express lanes and the Intercounty Connector keeps reading. GeoShield backs it with a nationwide lifetime warranty against fading, bubbling, and peeling.",
      faqs: [
        { q: "What is the darkest legal tint for my sedan registered in Bethesda?", a: "Maryland allows 35% VLT on the front side windows, rear side windows, and back glass for passenger cars, so front and rear can match. Multipurpose vehicles like SUVs and vans are allowed darker film behind the front doors. On the windshield, only a strip above the AS-1 line is allowed unless you have a medical exemption." },
        { q: "Will ceramic tint keep my car cooler when it sits at the Medical Center Metro all day?", a: "Noticeably. GeoShield's nano-ceramic layer rejects the infrared heat that cooks a parked interior, so the cabin and the steering wheel are far more bearable at 5 PM. It also blocks 99% of the UV that fades the dash and cracks leather on a car that parks outside every weekday." },
      ],
    },
  },
  "Potomac": {
    ppf: {
      heading: "PPF for Potomac's River Road commute and long driveways",
      body: "The paint damage on Potomac cars is different from the highway pattern we see elsewhere. River Road, Falls Road, and Seven Locks Road are two-lane roads with gravel shoulders where contractor trucks kick stone onto the hood of whatever is behind them, and the gravel and crushed-stone driveways off Glen Road sandblast rockers and door bottoms at walking speed. Full front PPF covers the hood, bumper, fenders, mirrors, and headlights for the road chips, and Full Front Extended adds the rockers, door edges, and door cups for anyone with a long driveway or a weekend car that gets trailered. The STEK DYNOshield film is optically clear on white and silver paint and self-heals light scratches. Many Potomac customers bring a new Porsche, Range Rover, or Lucid to us within days of delivery, which is about thirty minutes over the American Legion Bridge and out Route 7.",
      faqs: [
        { q: "My new car is being delivered to my house in Potomac next week. Can you fit it in before I start driving it?", a: "Usually, yes. Call as soon as you have the delivery date and we hold a slot. Fresh paint takes the film with no chips underneath, and a full front is finished in a day. The drive from Potomac is about thirty minutes via the Beltway and Route 7." },
        { q: "Does Full Front Extended make sense for a car that lives on a gravel driveway off River Road?", a: "That is exactly who it is for. The rockers, door edges, and door cups are where gravel driveways and parking at Potomac Village do their damage, and the extended package covers them with the same self-healing film and 12-year warranty as the full front." },
      ],
    },
    ceramic: {
      heading: "Ceramic coating for Potomac's tree canopy and outdoor cars",
      body: "Potomac has more tree cover than almost any part of Montgomery County, and the oaks, poplars, and pines over the driveways near Avenel, Falls Road, and the C&O Canal side of the neighborhood drop sap, pollen, and bird droppings in volume. Cars that live outside because the garage is full, often the family SUV or a teenager's first car, show water spots from the sprinkler overspray and the hard summer storms that roll up the Potomac River valley. A Gtechniq coating gives the paint a hard, glassy surface that those contaminants cannot bond to, and it deepens the gloss on the dark metallic paints that Potomac buyers favor. We start with paint correction to remove swirls, then apply Crystal Serum Light for 5 years or Crystal Serum Ultra for 7 years. Both make a hose rinse in the driveway do most of the work.",
      faqs: [
        { q: "Our SUV parks outside under pines in Potomac. Will a coating keep the sap and needles from ruining the paint?", a: "Yes. Pine sap softens and wipes off the coating with a detail spray instead of etching into the clear coat, and needles and pollen rinse away. The coating's UV resistance also slows the fading an uncovered car suffers through a Potomac summer." },
        { q: "Is the 7-year Crystal Serum Ultra worth it over the 5-year coating for a car I plan to keep?", a: "For a car you intend to keep, yes. Crystal Serum Ultra is a thicker, harder coating that holds its gloss and water behavior longer with routine washes. Crystal Serum Light is the better value for a lease or a car you expect to replace in a few years." },
      ],
    },
    tint: {
      heading: "Window tint for Potomac SUVs within Maryland's 35% limit",
      body: "Maryland lets passenger cars run 35% VLT on all windows, including the front doors, so a Potomac sedan can carry an even 35% ceramic all the way around without any question at inspection. Multipurpose vehicles such as the Suburbans, Range Rovers, and minivans that handle school runs to Churchill and Wootton may go darker behind the front doors, and many Potomac families choose 20% in the back for kids and cargo with 35% up front. The windshield gets a strip above the AS-1 line and nothing more, unless a medical exemption applies. GeoShield Pro Nano Ceramic blocks 99% of UV and up to 83% of solar heat, which keeps a car parked at Potomac Village or the swim club from turning into an oven. The metal-free film does not interfere with E-ZPass or satellite radio, and GeoShield's lifetime warranty is nationwide.",
      faqs: [
        { q: "What tint is legal on my Range Rover registered in Potomac?", a: "Maryland allows 35% VLT on the front side windows for any vehicle. As a multipurpose vehicle, your Range Rover can go darker than 35% on the rear side windows and back glass. The windshield is limited to a strip above the AS-1 line. Because the car is registered in Maryland, we install to Maryland's limits." },
        { q: "Will ceramic tint cut the glare on the River Road drive into Bethesda every morning?", a: "It helps a lot. The ceramic layer cuts both glare and infrared heat, and a 35% front film takes the edge off the low sun coming through the trees on River Road. For the windshield itself, a clear ceramic film adds heat and UV rejection without darkening the glass." },
      ],
    },
  },
  "Rockville": {
    ppf: {
      heading: "PPF for cars bought on Rockville Pike and driven on I-270",
      body: "Rockville Pike has one of the densest runs of dealerships in the region, and a new car bought there goes straight onto I-270 or the Beltway, where the express-lane work, dump trucks, and milled pavement start chipping a bumper on the first commute. That is why so many Rockville owners book full front PPF before delivery, or drive down to Chantilly within the first week. The package covers the hood, bumper, both fenders, mirrors, headlights, and A-pillars, with no film line on the hood. Cars that park in the Twinbrook and Rockville Metro garages every weekday or squeeze into the compact spaces at Rockville Town Square add Full Front Extended for door edges and door cups. STEK DYNOshield self-heals light scratches and is covered by a 12-year warranty. The drive from Rockville is about thirty-five minutes via I-270 south and I-495 across the river.",
      faqs: [
        { q: "I am buying a car on Rockville Pike this weekend. How soon can you put film on it?", a: "Call us with the delivery date and we will hold a weekday slot, usually within a few days. The sooner the film goes on, the cleaner the paint under it. Drive down I-270 and the Beltway, about thirty-five minutes, drop off at 9 AM, and the full front is done that afternoon." },
        { q: "My commute is I-270 from King Farm to the Beltway every day. Is partial front enough?", a: "For that commute we recommend full front. I-270's construction debris hits the whole hood, not just the first eighteen inches, and the full hood coverage means no visible film edge. Partial front suits a car that rarely leaves the surface streets around Rockville." },
      ],
    },
    ceramic: {
      heading: "Ceramic coating for Rockville's Metro garages and Pike car washes",
      body: "Rockville cars split their lives between covered Metro garages at Twinbrook and Rockville Station, open lots at Montgomery College and the county offices, and the automated washes along Rockville Pike that leave swirl marks in dark paint. Add the road brine on Veirs Mill Road and Route 28 every winter and the pollen from the older neighborhoods around Rockville Town Square, and most paint here is dull by the third year. A Gtechniq coating starts with paint correction to remove those swirls, then adds a hard, glossy layer that brine, pollen, and bird droppings sit on top of instead of bonding to. Crystal Serum Light is a 5-year coating that suits a lease or a car bought on the Pike that will be traded in; Crystal Serum Ultra lasts 7 years for a car you intend to keep. Either one means the car rinses clean at a touchless wash without the brushes.",
      faqs: [
        { q: "My car gets swirled by the brush washes on Rockville Pike. Does the coating fix that?", a: "The paint correction before the coating removes the existing swirls, and the coating itself is hard enough that a touchless wash afterward keeps the car clean without reintroducing them. Skip the brush washes after coating and the gloss holds for years." },
        { q: "Will the coating handle winter brine on I-270 and Veirs Mill Road?", a: "Yes. Road brine is one of the main reasons Rockville drivers coat their cars. It beads and rinses off the coating instead of drying into the paint, and the coating resists the chemical etching that salt causes on unprotected clear coat through a Montgomery County winter." },
      ],
    },
    tint: {
      heading: "Window tint for Rockville drivers under Maryland's 35% law",
      body: "Maryland tint law sets 35% VLT as the limit on the front side windows, rear side windows, and back glass of a passenger car, while multipurpose vehicles such as SUVs and vans may go darker behind the front doors. The windshield may only carry a strip above the AS-1 line, and medical exemptions are available. That makes Rockville an easy place to tint: a sedan from the Pike dealerships can wear 35% all the way around, and the family SUV can run 20% in back. GeoShield Pro Nano Ceramic blocks 99% of UV and up to 83% of solar heat, which is the difference between a tolerable and an unbearable car after a day in the open lot at Montgomery College or the surface parking around the county offices. The film is metal-free, so the E-ZPass for the I-270 express lanes and the ICC keeps working, and GeoShield's lifetime warranty is honored nationwide.",
      faqs: [
        { q: "What is the legal tint for a sedan registered in Rockville, Maryland?", a: "Maryland sets 35% VLT for the front side windows, the rear side windows, and the back glass of a sedan. That is darker on the front doors than Virginia allows, so a Rockville sedan can match all the way around. SUVs and vans may go darker behind the front doors, and the windshield is limited to a strip above the AS-1 line." },
        { q: "Will the tint interfere with the E-ZPass for the I-270 express lanes?", a: "No. GeoShield Pro Nano Ceramic contains no metal, so the transponder, GPS, satellite radio, and phone signals pass through normally. That is one of the main reasons we install a ceramic film rather than a metallic one for I-270 and ICC commuters." },
      ],
    },
  },
  "Gaithersburg": {
    ppf: {
      heading: "PPF for Gaithersburg's I-270 spur and Route 355 dealers",
      body: "The stretch of I-270 between Shady Grove and the Beltway is where Gaithersburg cars pick up their chips: the local-express split, the Sam Eig Highway and Shady Grove Road merges, and the trucks hauling fill to the job sites around Crown and Watkins Mill all throw stone at the front of whatever follows them. Full front PPF covers the hood, bumper, both fenders, mirrors, and headlights, which is the entire impact zone on that commute. Cars that park in the open at the Shady Grove Metro lot and the Rio garages often add Full Front Extended for the door edges. The STEK DYNOshield film self-heals light scratches with a little sun and carries a 12-year warranty. Gaithersburg buyers coming off the Route 355 dealerships often drive straight down I-270 and around the Beltway, about thirty-five minutes, so the film goes on while the paint is still untouched.",
      faqs: [
        { q: "I just took delivery from a dealer on Route 355 in Gaithersburg. How quickly should PPF go on?", a: "The sooner the better, ideally within the first week. Fresh paint has nothing to hide, so the film looks invisible once it is on. We can usually schedule a new delivery within a few days, and a full front is done the same day you drop it off." },
        { q: "What is the best route from Kentlands to your shop in Chantilly?", a: "I-270 south to the Beltway, across the American Legion Bridge into Virginia, then Route 7 west to Route 28 south and exit toward Walney Rd. About thirty-five minutes outside rush hour, and the same coming back. There is free parking on site, so leave the car and we call when it is ready." },
      ],
    },
    ceramic: {
      heading: "Ceramic coating for Gaithersburg's open lots and construction dust",
      body: "Gaithersburg is still growing, and the dust from the construction at Crown, Watkins Mill Town Center, and the sites along Great Seneca Highway settles as a gray film on every car in Rio, Washingtonian, and Montgomery Village that parks outside. Mix in the pollen from the mature trees in Olde Towne and Kentlands and the spring storms that leave mineral spots on dark paint, and an uncoated Gaithersburg car looks tired by the second year. A Gtechniq coating gives the paint a slick, hard surface that dust and pollen do not cling to, so a touchless wash on Route 355 brings the gloss right back. Paint correction comes first and removes the swirls from automated washes. Crystal Serum Light is the 5-year option that fits most leases and commuter cars; Crystal Serum Ultra lasts 7 years for a car you plan to keep through the I-270 widening and beyond.",
      faqs: [
        { q: "My car parks in an open lot at Rio all day. Does a coating protect against sun and dust?", a: "Yes. The coating adds UV resistance that slows fading and oxidation on a car with no shade, and the slick surface keeps construction dust from bonding so it rinses off. It is the most useful upgrade for a Gaithersburg car that never sees a garage." },
        { q: "How long after the coating can I take the car through a wash on Route 355?", a: "Wait a week for the coating to fully cure. After that, touchless washes are fine any time. Avoid brush washes, which are what scratch paint in the first place, and the gloss and water beading stay for the life of the coating." },
      ],
    },
    tint: {
      heading: "Window tint for Gaithersburg commuters and Maryland's 35% rule",
      body: "Maryland tint law permits 35% VLT on the front side windows, rear side windows, and back glass of a passenger car, with multipurpose vehicles allowed to go darker behind the front doors. Windshield film is limited to a strip above the AS-1 line, and medical exemptions exist. For Gaithersburg that means a commuter sedan from the Route 355 dealerships can run 35% ceramic all the way around, and the Kentlands family SUV can go to 20% in the back. GeoShield Pro Nano Ceramic blocks 99% of UV and up to 83% of solar heat, so a car left all day in the open at the Shady Grove Metro lot or the Lakeforest area stays bearable. The ceramic film contains no metal, so the E-ZPass for the I-270 express lanes and the ICC keeps reading. GeoShield's nationwide lifetime warranty covers fading, bubbling, and peeling.",
      faqs: [
        { q: "How dark can I legally tint my car registered in Gaithersburg?", a: "Maryland allows 35% VLT on all windows of a passenger car, including the front doors. SUVs, vans, and trucks may go darker on the rear side windows and back glass. The windshield may only carry a strip above the AS-1 line unless you hold a medical exemption. We install to those limits." },
        { q: "Will tint help with the morning sun on the I-270 spur into the Beltway?", a: "Yes. The southbound commute faces the low sun across the Montgomery County fields, and a 35% ceramic on the front doors takes the edge off side glare. For the windshield, a clear ceramic film adds heat and UV rejection without darkening the glass, which keeps it legal." },
      ],
    },
  },
  "Germantown": {
    ppf: {
      heading: "PPF for Germantown's upper I-270 and Route 118 truck traffic",
      body: "The upper stretch of I-270 through Germantown is faster and rougher than the lanes closer to the Beltway, and the trucks hauling stone from the quarries and fill to the subdivisions around Clarksburg leave gravel in every lane. Cars from Kingsview, Milestone, and the townhouses off Middlebrook Road arrive with chips across the bumper and the leading edge of the hood, and pickups show damage on the rockers from Route 118 and Clopper Road. Full front PPF covers the hood, bumper, both fenders, mirrors, headlights, and A-pillars; Full Front Extended adds the rockers and door edges for trucks and SUVs that run the two-lane roads toward Boyds and Darnestown. STEK DYNOshield self-heals the small scratches gravel dust leaves and carries a 12-year warranty. Germantown is about thirty-five minutes from Walney Rd by way of I-270, the Beltway, Route 7, and Route 28.",
      faqs: [
        { q: "I drive I-270 from Germantown to the Beltway every day. Which PPF package should I get?", a: "Full front. That commute puts chips on the whole hood and both fenders, not just the bumper, and full front covers all of it with no film edge to see. If you drive a truck or SUV and take Route 118 or Clopper Road past construction, add the rockers with Full Front Extended." },
        { q: "Can I get film on my new truck before it starts hauling on Route 27 and Clopper Road?", a: "Yes. Book as soon as you have the delivery date and we hold a weekday slot. Fresh paint takes film cleanest, and a full front or extended package on a truck is a one-day job. Drop off at 9 AM and pick up the same afternoon." },
      ],
    },
    ceramic: {
      heading: "Ceramic coating for Germantown townhouse lots and long commutes",
      body: "Most Germantown cars park in the open, in townhouse lots along Middlebrook Road, Father Hurley Boulevard, and Wisteria Drive, where there is no shade from the summer sun and no cover from the pollen that blows in from Seneca Creek State Park every spring. A long I-270 commute adds road brine in winter and bug splatter from the farm stretches north of Clarksburg in summer. A Gtechniq coating gives the paint a hard, glossy surface that those contaminants sit on instead of etching into, and its UV resistance slows the fading that hits an uncovered car first on the roof and hood. We correct the paint before coating to remove swirls from automated washes. Germantown owners who keep a car for ten years usually pick Crystal Serum Ultra for its 7-year life, while Crystal Serum Light at 5 years suits a lease or a commuter that will be traded sooner.",
      faqs: [
        { q: "My car has no garage and sits in a Germantown townhouse lot. Is a coating worth it without shade?", a: "That is where a coating earns its keep. UV, pollen, bird droppings, and brine all land on the coating rather than the paint, and the car rinses clean at a touchless wash. Uncoated paint parked in full sun year-round fades and oxidizes noticeably faster." },
        { q: "Does the coating stop bug splatter from the I-270 drive north of Clarksburg from etching the paint?", a: "Yes. Bug residue is acidic and etches unprotected clear coat within days in summer heat, but it stays on the coating's surface and comes off with a rinse or detail spray. Wash within a week or so and the paint underneath never sees it." },
      ],
    },
    tint: {
      heading: "Window tint for Germantown's sunny lots under Maryland law",
      body: "Maryland tint law allows 35% VLT on the front side windows, rear side windows, and back glass of a passenger car, and multipurpose vehicles such as SUVs, vans, and pickups may go darker behind the front doors. Windshield film stops at a strip above the AS-1 line, with medical exemptions for those who qualify. Germantown cars sit in open townhouse lots and the Germantown Transit Center and MARC lots all day, so heat rejection matters more here than privacy. GeoShield Pro Nano Ceramic blocks 99% of UV and up to 83% of solar heat, which keeps a dash from cracking and a cabin from reaching oven temperature by the afternoon pickup. Families with SUVs mostly choose 20% behind the front doors and 35% up front. The metal-free film keeps the E-ZPass working in the I-270 express lanes, and GeoShield backs it with a nationwide lifetime warranty.",
      faqs: [
        { q: "What tint is legal on my sedan registered in Germantown, MD?", a: "Maryland permits 35% VLT on the front side windows, rear side windows, and back glass for a passenger car, so all three can match. If you drive an SUV, van, or pickup, the windows behind the front doors may go darker. The windshield may only carry a strip above the AS-1 line." },
        { q: "I ride MARC from Germantown and my car sits in the lot all day. Will ceramic tint keep the interior from baking?", a: "Yes. The nano-ceramic film rejects the infrared heat that builds up in a parked car, so the cabin is noticeably cooler and the steering wheel is touchable at 6 PM. It also blocks 99% of UV, which is what fades seats and cracks the dashboard over years in the sun." },
      ],
    },
  },
  "Silver Spring": {
    ppf: {
      heading: "PPF for Silver Spring's Beltway loop and Georgia Avenue potholes",
      body: "Silver Spring cars take two kinds of punishment: high-speed debris on the Beltway between Georgia Avenue and the I-95 interchange, where the pavement is patched and trucks run heavy, and low-speed scrapes from the Purple Line work zones on Wayne Avenue and Bonifant Street, the bus traffic on Colesville Road, and the tight garages downtown. Full front PPF covers the hood, bumper, both fenders, mirrors, headlights, and A-pillars with no film line, and the STEK DYNOshield top coat self-heals the light scratches that come from street parking in Woodside and Takoma Park. For cars that use the downtown garages every day, Full Front Extended adds door edges and door cups. The film carries a 12-year warranty. Silver Spring is about forty minutes from Walney Rd around the Beltway and across the American Legion Bridge, and a full front install is done the same day.",
      faqs: [
        { q: "I loop the whole Beltway from Silver Spring to Tysons for work. Is PPF really necessary?", a: "That is one of the hardest commutes on paint in the region. The Beltway through Silver Spring and Bethesda is patched, under construction, and full of trucks, and the chips land across the whole hood and bumper. Full front PPF covers exactly those panels and self-heals the lighter scratches." },
        { q: "I bought a new car and live near the Silver Spring Metro. Should I get film before the first commute down Colesville Road?", a: "Yes. Paint that has not yet met the Beltway has nothing to hide, so the film lays flat and disappears. We can usually book a new delivery within a few days. Drive around the Beltway, about forty minutes, drop off at 9 AM, and pick up the same afternoon." },
      ],
    },
    ceramic: {
      heading: "Ceramic coating for Silver Spring's street parking and Sligo Creek oaks",
      body: "The oaks and tulip poplars over Sligo Creek Parkway, Woodside, and the streets of Takoma Park are what make Silver Spring pleasant to walk and hard on paint. Cars parked at the curb all week collect sap, pollen, bird droppings, and the grit kicked up by the Purple Line construction, and the summer storms leave mineral spots that bake in by the next afternoon. A Gtechniq coating puts a hard, slick layer over the clear coat so all of that sits on the surface and rinses off at a touchless wash on Georgia Avenue instead of etching in. We correct the paint first to remove the swirls that brush washes leave in dark colors. Crystal Serum Light is a 5-year coating well suited to a lease or a car that moves on in a few years; Crystal Serum Ultra lasts 7 years for a Silver Spring car that will see many more winters on the street.",
      faqs: [
        { q: "I park on the street in Takoma Park under big oaks. Can a coating really deal with the sap and droppings?", a: "Yes. Both soften and wipe away from the coating with a detail spray instead of etching into the paint, and the slick surface keeps pollen from building up. Rinse at a touchless wash every couple of weeks and the car stays glossy through the season." },
        { q: "Does the coating help with the salt brine the county spreads on Georgia Avenue and Colesville Road?", a: "It does. Brine dries into a crust on unprotected paint and etches the clear coat over a winter, but on a coated car it beads and rinses off. A quick touchless wash after each snow is all a coated Silver Spring car needs to come through winter clean." },
      ],
    },
    tint: {
      heading: "Window tint for Silver Spring drivers under Maryland's 35% law",
      body: "Maryland tint law allows 35% VLT on the front side windows, rear side windows, and back glass of a passenger car, and multipurpose vehicles may go darker behind the front doors. Windshield film is limited to a strip above the AS-1 line, and medical exemptions exist for drivers who qualify. Silver Spring drivers who commute into the District often ask about DC's stricter limits; the car's registration state sets the rule, and we only install film that is legal where the car is registered. GeoShield Pro Nano Ceramic blocks 99% of UV and up to 83% of solar heat, which keeps a car parked in the open at the Forest Glen Metro lot or on a Takoma Park street from cooking all day. The film is metal-free, so E-ZPass and phone signals pass through, and the glare reduction helps on the eastbound Beltway in the morning. GeoShield's lifetime warranty travels with the car anywhere in the country.",
      faqs: [
        { q: "What is the legal tint limit for my car registered in Silver Spring?", a: "Maryland allows 35% VLT on the front side windows, rear side windows, and back glass of a passenger car. Owners of SUVs and vans can go darker on the windows behind the front doors. The windshield may only carry a strip above the AS-1 line unless you qualify for a medical exemption. We install to Maryland's limits for Maryland plates." },
        { q: "I commute from Silver Spring into DC every day. Do I need to follow the District's tint rules?", a: "The tint law that applies is the one for the state where the car is registered, so a Maryland-registered car is held to Maryland's 35% limit. We install only film that is legal where the car is registered, so tell us the plate state when you book and we set the shades accordingly." },
      ],
    },
  },

  "Frederick": {
    ppf: {
      heading: "Full front PPF for Frederick's I-270 and US-15 commuters",
      body: "Frederick drivers who work in Northern Virginia already spend an hour each way on I-270 or US-15, and both roads are hard on a front end: quarry and gravel trucks on US-15 near Point of Rocks, construction through Clarksburg on I-270, and a winter cinder mix that Maryland spreads heavier than Virginia does. The damage we see from Frederick is a peppered bumper, chips in the first few inches of the hood, and sandblasted headlights. Full front PPF in STEK DYNOshield covers all of it with no line across the hood, backed by a 12-year warranty. A lot of Frederick customers are new-car delivery runs: buy on Buckeystown Pike on Saturday, drive down US-15 on Monday, and the car goes home protected. Weekend cars kept in Urbana garages often get Full Front Extended so the rockers and door edges are covered too.",
      faqs: [
        { q: "I just bought a car on Buckeystown Pike in Frederick. Should I drive it to Chantilly before anything else?", a: "Yes, as early as you can manage it. New paint has no chips to hide, so the film lays invisible and the 12-year warranty starts on a perfect surface. Plan the trip down US-15 through Leesburg during the first week of ownership; most full front installs are done the same day, so you drive home that evening." },
        { q: "Is the hour from Frederick worth it for PPF when there are shops closer to I-70?", a: "Frederick owners make the drive for STEK-certified full front work: computer-cut patterns, no hood line, a 12-year manufacturer warranty, and a 5.0 Google rating with 140+ five-star reviews behind it. If you already commute to Northern Virginia, drop the car off on your way in and pick it up on the way home, no extra trip." },
      ],
    },
    ceramic: {
      heading: "Ceramic coating for Frederick's salt, snow, and open driveways",
      body: "Frederick gets real winters. The first salt trucks run on I-270 and US-15 weeks before they do inside the Beltway, and brine and cinder dry onto paint in a gray crust that an open driveway in Ballenger Creek or Walkersville never gives you a chance to rinse. Spring brings pollen off the Monocacy and Catoctin tree lines, and summer brings bug season on I-70. A Gtechniq Crystal Serum Light coating puts a hard, slick layer between all of that and the clear coat, so salt and bugs rinse off at a touchless wash instead of etching in. Paint correction comes first on every job, which matters for a Frederick daily driver that has been through a winter of brush washes. Owners who keep a car past a lease often step up to the 7-year Crystal Serum Ultra, and many pair the coating with full front PPF so one trip covers both.",
      faqs: [
        { q: "My car sits outside all winter in Frederick. Does a coating actually help with salt?", a: "Yes. Salt brine dries flat on bare clear coat and holds moisture against the paint. On a coated car the brine beads and sheets off at the next rinse, and the coating resists the chemical etching that salt and cinder cause over a long Frederick winter. You still wash the car, but it takes minutes instead of an afternoon." },
        { q: "How many trips down I-270 does a coating take from Frederick?", a: "Just one. The coating is a two-day process, so drop the car off Monday morning at Walney Rd and pick it up Tuesday afternoon. Frederick customers who work in Northern Virginia usually drop off on the way to the office and collect the car after work the next day without making a separate trip." },
      ],
    },
    tint: {
      heading: "Maryland-legal window tint for Frederick cars already in the shop",
      body: "Frederick is about an hour from Chantilly, so we do not run tint pages for the city, but we can tint a Frederick car while it is here for PPF or a coating. Maryland law allows 35% VLT on the front side windows, rear side windows, and back glass of a passenger car; multipurpose vehicles may go darker behind the front doors; and the windshield may carry only a non-reflective strip above the AS-1 line. GeoShield Pro Nano Ceramic film is available in Maryland-legal shades with a nationwide lifetime warranty, and we only install film that is legal where the car is registered.",
      faqs: [
        { q: "What is the legal tint limit for a car registered in Frederick, Maryland?", a: "Maryland allows 35% VLT on all windows of a passenger car: front sides, rear sides, and back glass. If the vehicle is registered as multipurpose, an SUV or van for example, the glass behind the front doors can be darker. The windshield gets only a non-reflective strip above the AS-1 line, and Maryland grants medical exemptions for darker film." },
        { q: "Can you add tint to my Frederick car during the same trip as PPF?", a: "Yes. Tint takes a few hours and fits inside a PPF or coating visit, so one drive down US-15 or I-270 covers both. We meter every window against Maryland's 35% limit before you leave, and the GeoShield lifetime warranty travels with the car if you move." },
      ],
    },
  },
  "Columbia": {
    ppf: {
      heading: "Full front PPF for Columbia's Route 29 and I-95 runs",
      body: "Columbia sits between two of the busiest highways in Maryland, and the paint damage we see from Howard County tracks them exactly: lower-bumper sandblasting from the I-95 truck lanes near Route 100 and Route 32, hood and mirror chips from the Route 29 express run down to Silver Spring, and headlight pitting on anything that commutes to Fort Meade. Full front PPF in STEK DYNOshield covers the hood, bumper, both fenders, mirrors, headlights, and A-pillars with no visible edge on the hood and a 12-year warranty. Many Columbia customers are weekend-car owners from River Hill and Clarksville who want the film on before the first spring drive, and new-car delivery runs are routine: pick up the car, drive it straight down I-95 to Walney Rd, and the film goes on before the first commute. Full Front Extended adds rockers and door edges for cars that live in the garages at the Mall in Columbia.",
      faqs: [
        { q: "I take Route 29 and I-495 to a job in Northern Virginia from Columbia. Can PPF fit into a workday?", a: "Yes, and that is the easiest way to do it. Drop the car at 4215 Walney Rd on your way in, since Chantilly sits off Route 28 near I-66 and the Dulles Toll Road, and pick it up after work. Most full front installs are finished the same day, so one commute covers the whole job." },
        { q: "I picked up a new EV in Howard County. How soon should I bring it down for film?", a: "Within the first week or two if you can. Fresh paint has no chips to hide and the film goes on invisible. Tesla, Rivian, and Lucid patterns are computer-cut around every sensor and camera, so nothing is covered that should not be, and the self-healing top coat handles the light scratches that come with the Route 29 commute." },
      ],
    },
    ceramic: {
      heading: "Ceramic coating under Columbia's tree canopy and winter salt",
      body: "Columbia's planners left the trees standing, and decades later the oaks and tulip poplars over Wilde Lake, Oakland Mills, and Hickory Ridge rain sap, pollen, and bird droppings onto any car parked in a driveway or a village-center lot. On bare clear coat in July heat, a bird dropping etches in a day. A Gtechniq coating keeps all of that sitting on top of a hard, slick layer where a rinse or detail spray lifts it off, and it resists the salt that Howard County spreads on Route 29 and Route 108 every winter. Correction comes before the coating, so the swirls from the automatic washes along Dobbin Road get polished out before the gloss is locked in. Columbia owners who keep a car past a lease tend to choose the 7-year Crystal Serum Ultra, and most pair the coating with full front PPF so one trip down I-95 handles both.",
      faqs: [
        { q: "My car parks under big trees in Oakland Mills. Will a coating keep the sap from damaging the paint?", a: "Yes. Sap and bird droppings sit on the coating instead of bonding to the clear coat, so a quick detail spray or a touchless wash takes them off. Uncoated paint lets sap etch within a week in summer, and a Columbia cul-de-sac is about the worst place to park bare paint between April and October." },
        { q: "Is it realistic to get a coating done in one trip from Columbia?", a: "Yes, with an overnight stay for the car. Day one is the decontamination wash and paint correction, day two is the coating and an indoor cure. Columbia customers usually drop off Monday morning via I-95 and I-495 and pick up Tuesday afternoon, often on the way home from a Northern Virginia office." },
      ],
    },
    tint: {
      heading: "Maryland-legal tint for Columbia cars visiting for PPF",
      body: "Columbia is far enough from Chantilly that we do not promote tint there, but a Columbia car already in for PPF or a coating can be tinted in the same visit. Maryland permits 35% VLT on the front side windows, rear side windows, and back glass of a passenger car, lets multipurpose vehicles go darker behind the front doors, and limits the windshield to a non-reflective strip above the AS-1 line. GeoShield Pro Nano Ceramic blocks 99% of UV at a Maryland-legal shade and carries a nationwide lifetime warranty. Shades are matched to where the car is registered, never darker than that state allows.",
      faqs: [
        { q: "How dark can I legally tint a sedan registered in Columbia, Maryland?", a: "35% VLT on every window: front sides, rear sides, and back glass. Multipurpose vehicles may go darker behind the front doors, and the windshield can carry only a non-reflective strip above the AS-1 line. Maryland allows medical exemptions for darker film with the proper paperwork." },
        { q: "Does Maryland-legal 35% ceramic still cut the heat on the Route 29 commute?", a: "Yes. Heat rejection comes from the ceramic layer, not the darkness, so a 35% GeoShield film still rejects most infrared heat and 99% of UV while staying legal on every window of a Howard County car. It can go on during the same visit as PPF or a coating." },
      ],
    },
  },
  "Laurel": {
    ppf: {
      heading: "Full front PPF for Laurel's Route 1 and I-95 commuters",
      body: "Route 1 through Laurel is a working road: dump trucks, flatbeds, and delivery vans running between the warehouses in Savage and the Beltway, with gravel and construction grit in every lane. Add the I-95 and Baltimore-Washington Parkway runs to Fort Meade and the District and a Laurel front end takes hits from both directions. The pattern is a sandblasted lower bumper, chips at the front of the hood, and pitted headlights, which is precisely what full front PPF in STEK DYNOshield is cut to cover, with no line across the hood and a 12-year warranty. Laurel's dealership row on Route 1 sends us a steady stream of new-car delivery runs, where the owner drives straight from the lot to Walney Rd so the film is on before the first commute. Defense contractors who already work in Northern Virginia drop off on the way in; weekend cars from Montpelier and Russett add Full Front Extended for rockers and door cups.",
      faqs: [
        { q: "I am picking up a new car from a dealer on Route 1 in Laurel. Can I drive it straight to you?", a: "Yes, and that is the ideal plan. Call before pickup and we will hold a slot. Take I-95 south to I-495, then Route 28 and exit toward Walney Rd, about 50 minutes. Fresh paint takes the film perfectly, most full front installs finish the same day, and you drive home with the 12-year warranty already in place." },
        { q: "I commute from Laurel to Fort Meade on the Parkway. Is partial front enough?", a: "Partial front covers the bumper, the leading 18 inches of the hood, fender edges, and mirrors, which is where most Parkway chips land. If you want no visible edge on the hood and the headlights covered as well, full front is the package we recommend, and it is the one most Laurel drivers choose." },
      ],
    },
    ceramic: {
      heading: "Ceramic coating for Laurel's open lots and Route 1 grit",
      body: "Most Laurel cars live outside. Townhouse rows in Russett and Maryland City, the apartment lots around Laurel Lakes, and the open parking at Fort Meade and the MARC station all leave paint in the sun and the weather every day, with Route 1 construction dust and I-95 diesel soot settling in on top. A Gtechniq Crystal Serum Light coating gives the clear coat a hard, slick surface that dust does not cling to and water beads off, so a touchless wash on Route 198 is enough to bring the car back. It also blocks the UV that fades paint parked in a shadeless lot all summer. Before the coating goes on we correct the paint, removing the swirls from the brush washes along Route 1 so the finish underneath is clean. Because it is a 50-minute drive, most Laurel customers book the coating together with full front PPF so one round trip covers both.",
      faqs: [
        { q: "I park in an open lot in Russett with no shade. Does a coating stop the sun from dulling the paint?", a: "Yes. Gtechniq coatings are built to resist UV, which is what dulls and chalks paint on a car that sits in the open. The coating also keeps bird droppings, pollen, and lot dust from bonding to the clear coat, so the car looks washed longer and cleans up with a rinse instead of a scrub." },
        { q: "Can you coat my car the same trip as the PPF from Laurel?", a: "Yes. Plan on two days: full front PPF goes on the first day, and the coating with its indoor cure follows on the second. Drop off at 4215 Walney Rd Monday morning via I-95 and I-495, and pick up Tuesday afternoon with both done under one round trip." },
      ],
    },
    tint: {
      heading: "Maryland-legal tint for Laurel cars during a PPF visit",
      body: "We do not run tint pages for Laurel because of the 50-minute drive, but a Laurel car in for PPF or a coating can be tinted while it is here. Under Maryland law a passenger car may carry 35% VLT on the front side windows, rear side windows, and back glass; multipurpose vehicles may go darker behind the front doors; and only a non-reflective strip above the AS-1 line is allowed on the windshield. GeoShield Pro Nano Ceramic comes in Maryland-legal shades with a nationwide lifetime warranty, and we install only what is legal where the car is registered.",
      faqs: [
        { q: "What tint is legal on my Laurel-registered sedan?", a: "Maryland caps a Laurel-registered passenger car at 35% VLT on the front sides, rear sides, and back glass. SUVs, vans, and other multipurpose vehicles may run darker film behind the front doors. The windshield is limited to a non-reflective strip above the AS-1 line, and Maryland recognizes medical exemptions." },
        { q: "Can tint be added while my car is at the shop for PPF from Laurel?", a: "Yes. A rear package or four side windows takes two to three hours and fits inside the same visit, so the drive down I-95 covers tint and film together. Every window is metered to Maryland's limit before pickup, and the film carries GeoShield's nationwide lifetime warranty." },
      ],
    },
  },
  "Bowie": {
    ppf: {
      heading: "Full front PPF for Bowie's US-50 and Route 301 drivers",
      body: "US-50 between Bowie and the Beltway is fast, crowded, and under constant repair, and Route 301 carries the trucks that skip I-95 on the run between Richmond and the Delaware ports. Bowie cars come in with bumper and hood chips from US-50 and a sandblasted front end from following Route 301 freight through Upper Marlboro. Full front PPF in STEK DYNOshield covers the hood, bumper, fenders, mirrors, headlights, and A-pillars with no edge showing on the hood, and the film self-heals light scratches in the sun. Bowie sends us two kinds of customers: owners who work in Northern Virginia and drop the car off on the way to the office, and new-car delivery runs where the owner drives from the dealer to Walney Rd before the first week of commuting. Weekend cars kept in Fairwood and Mitchellville garages often step up to Full Front Extended for rockers and door cups.",
      faqs: [
        { q: "I work near Tysons and live in Bowie. Can I drop my car off on the way to work?", a: "Yes. US-50 to I-495 to Route 28 puts you at 4215 Walney Rd in about 55 minutes, and we open at 9 AM. Most full front installs are done the same day, so you collect the car on the way home. Plenty of Bowie customers do exactly this and never make a separate trip." },
        { q: "I am taking delivery of a new car soon in Prince George's County. How early should I book the film?", a: "Before the first week of US-50 commuting if at all possible. New paint is the perfect surface for film, and once chips exist they stay under the film forever. Book the install date around your delivery date and we will hold the slot, then drive straight from the dealer to Chantilly." },
      ],
    },
    ceramic: {
      heading: "Ceramic coating for Bowie's open driveways and Bay-bound summers",
      body: "Bowie's older neighborhoods around Belair and Old Town Bowie have open driveways under mature trees, and the newer streets in Fairwood have no shade at all, so paint takes sap and pollen in one part of town and raw sun in the other. Summer adds bug splatter and road tar from US-50 trips to the Bay, and winter adds the salt that Prince George's County lays down on US-50 and Route 450. A Gtechniq coating gives the clear coat a hard, hydrophobic surface that keeps all of it from bonding, so a quick rinse after a beach weekend does what a two-hour wash used to. We polish out existing swirls before the coating goes on so the gloss that gets sealed in is the real thing. Bowie owners who plan to keep a car for years choose the 7-year Crystal Serum Ultra, and most pair it with full front PPF so one trip west on US-50 handles both.",
      faqs: [
        { q: "My driveway in Belair is under oaks and the car is always covered in pollen. Does a coating help?", a: "Yes. Pollen and sap sit on the coating instead of the paint, and a rinse or a touchless wash lifts them off. Without a coating, sap and leaf tannins etch into the clear coat after a week of Bowie summer heat. The coating also keeps the car looking clean longer between washes." },
        { q: "Can I get the coating done in one round trip from Bowie?", a: "Yes. The coating is a two-day process, so the car stays overnight: paint correction on the first day, coating and cure on the second. Most Bowie customers drop off Monday morning via US-50 and I-495 and pick up Tuesday afternoon, which fits neatly around a Northern Virginia workday." },
      ],
    },
    tint: {
      heading: "Maryland-legal tint for Bowie cars already in for film",
      body: "Bowie is close to an hour from Chantilly, so tint is not a service we promote there, but we can tint a Bowie car in the same visit as PPF or a coating. Maryland sets the limit at 35% VLT on the front side windows, rear side windows, and back glass of a passenger car; multipurpose vehicles may go darker behind the front doors; the windshield may have only a non-reflective strip above the AS-1 line. GeoShield Pro Nano Ceramic is installed in Maryland-legal shades with a nationwide lifetime warranty, and we only fit film that is legal where the car is registered.",
      faqs: [
        { q: "What is the darkest legal tint for a car registered in Bowie, Maryland?", a: "35% VLT on all windows of a passenger car, front sides, rear sides, and back glass alike. Multipurpose vehicles may go darker behind the front doors. Only a non-reflective strip above the AS-1 line is permitted on the windshield, and Maryland allows medical exemptions." },
        { q: "Will 35% ceramic still handle the glare on the US-50 drive from Bowie?", a: "Yes. A 35% GeoShield ceramic film cuts glare noticeably and rejects most infrared heat and 99% of UV, and it stays legal on every window of a Maryland passenger car. Tint can be added while the car is here for PPF." },
      ],
    },
  },
  "Waldorf": {
    ppf: {
      heading: "Full front PPF for Waldorf's Route 301 and Route 5 commute",
      body: "Nobody in Waldorf drives a short commute. Route 5 and Route 301 north to the Beltway are an hour of trucks, construction, and gravel shoulders, and Route 210 through Accokeek is no better, so a Charles County front end collects chips on a schedule. We see peppered bumpers, hood chips above the grille, and hazed headlights on trucks, SUVs, and sedans alike. Full front PPF in STEK DYNOshield covers the hood, bumper, both fenders, mirrors, headlights, and A-pillars with no visible line on the hood, and it carries a 12-year warranty against yellowing and peeling. The dealership row on Crain Highway makes Waldorf a frequent new-car delivery run: owners pick up on a Saturday and bring the car up to Walney Rd before the first week of commuting. Pickups and SUVs that run the gravel roads toward Hughesville and Indian Head add Full Front Extended for rockers and door edges.",
      faqs: [
        { q: "I bought a truck on Crain Highway in Waldorf. Which PPF package fits a truck that runs Route 301 every day?", a: "Full Front Extended. A taller vehicle takes truck-thrown gravel on the rockers and door edges as well as the hood and bumper, and Extended adds those panels to the full front package. The film self-heals light scratches, the 12-year warranty covers it, and most trucks are finished in one to two days." },
        { q: "I drive from Waldorf to a job in Northern Virginia. Is there a way to do PPF without a separate trip?", a: "Yes. Come up Route 210 across the Wilson Bridge, continue on I-495 to Route 28 north, and 4215 Walney Rd is a few minutes from the exit. Drop off at 9 AM on your way in and pick up after work. Full front installs are usually same-day, so the commute does the driving for you." },
      ],
    },
    ceramic: {
      heading: "Ceramic coating for Waldorf's shadeless subdivisions and long hauls",
      body: "The newer sections of St. Charles and White Plains have young trees and wide open driveways, so cars bake in the Southern Maryland sun all summer and sit under frost and road brine all winter. An hour on Route 5 or Route 301 each way coats a car in diesel soot and tar, and the humidity off the Potomac makes water spots stubborn. A Gtechniq Crystal Serum Light coating adds a hard, hydrophobic layer that resists UV fading, keeps soot and tar from bonding, and lets water bead off before it spots, so the car cleans up at a touchless wash on Route 301 instead of a Saturday of scrubbing. The paint is machine-corrected first so the coating seals a clean finish rather than old swirls. Since Waldorf is an hour out, nearly every customer books the coating with full front PPF in one round trip, and many choose the 7-year Ultra for a truck they plan to keep.",
      faqs: [
        { q: "My driveway in St. Charles has zero shade. Can a coating protect paint that bakes all summer?", a: "Yes. UV resistance is one of the main reasons to coat a car that lives outside, and Gtechniq coatings are rated for years of it. The coating also keeps bird droppings and pollen from etching into hot paint, which happens fast on a dark car in a Waldorf driveway in July." },
        { q: "How do I plan a ceramic coating around the drive from Waldorf?", a: "Plan on a single round trip and an overnight stay for the car. Drop off Monday morning via Route 301 or Route 210 and I-495; paint correction happens that day, the coating and cure follow on Tuesday, and you pick up Tuesday afternoon. Pair it with full front PPF and both are done in the same two days." },
      ],
    },
    tint: {
      heading: "Maryland-legal tint for Waldorf trucks and SUVs in for PPF",
      body: "At an hour from Chantilly, Waldorf is outside the area where we promote tint, but a Charles County vehicle in for PPF or a coating can be tinted in the same visit. Maryland law caps passenger cars at 35% VLT on the front side windows, rear side windows, and back glass; multipurpose vehicles, which covers most of the pickups and SUVs in Waldorf, may go darker behind the front doors; and the windshield is limited to a non-reflective strip above the AS-1 line. GeoShield Pro Nano Ceramic is available in Maryland-legal shades with a nationwide lifetime warranty, and we only install film that is legal where the vehicle is registered.",
      faqs: [
        { q: "How dark can my Waldorf-registered pickup go behind the front doors?", a: "As a multipurpose vehicle, a pickup or SUV registered in Maryland may run darker film behind the front doors, while the front side windows stay at 35% VLT. Passenger cars are 35% on every window. The windshield allows only a non-reflective strip above the AS-1 line, and medical exemptions exist." },
        { q: "Can tint go on during the same visit as PPF for a Waldorf truck?", a: "Yes. Tint takes a few hours and fits inside the same drop-off as full front or Full Front Extended, so one trip up Route 301 or Route 210 covers both. Every window is metered against Maryland's limits before the truck leaves." },
      ],
    },
  },
  "Annapolis": {
    ppf: {
      heading: "Full front PPF for Annapolis cars on US-50 and Route 2",
      body: "The Annapolis stretch of US-50 is a high-speed run where resurfacing crews, Bay Bridge beach traffic, and boat trailers with gravel in the fenders throw debris at everything behind them. Add Route 2 through Parole and the chip pattern is predictable: bumper, hood nose, mirrors, and headlights. Full front PPF in STEK DYNOshield covers all of those panels plus the fenders and A-pillars, with no edge visible on the hood and a 12-year warranty, and the film's self-healing top coat shrugs off the scuffs that come with brick-street parking near City Dock. Annapolis owners who make the hour-plus drive tend to be particular: Navy families protecting a car they will sell at the next duty station, weekend sports cars from Severna Park and Davidsonville, and new-car delivery runs that go straight from the dealer to Walney Rd. Cars that live in downtown garages often add Full Front Extended for door edges and door cups.",
      faqs: [
        { q: "Is an hour on US-50 from Annapolis really worth it just for PPF?", a: "The customers who make the drive from Annapolis want full front work done to a STEK standard, with computer-cut patterns, no line across the hood, and a 12-year manufacturer warranty from a shop with a 5.0 Google rating. Most pair PPF with a coating so one trip covers both, and full front alone is usually finished the same day." },
        { q: "I am picking up a new car and heading back to Annapolis on US-50. Should I come to you first?", a: "Yes, if the timing works. The chips that US-50 puts in a hood start on the first drive, and film over fresh paint is invisible. Take I-495 to Route 28 north and exit toward Walney Rd before you head home. Call ahead and we hold the slot; most full front installs are done the same day." },
      ],
    },
    ceramic: {
      heading: "Ceramic coating for Annapolis salt air, gulls, and marina parking",
      body: "Nothing is harder on paint than a car that lives near the Chesapeake. Salt air settles on everything from Eastport to Cape St. Claire, gulls work the marina lots and the City Dock garages, and a summer of boat ramps at Sandy Point and Truxtun Park leaves brackish water spots that bake in by noon. A Gtechniq coating gives the clear coat a hard, slick, hydrophobic surface that salt and bird droppings cannot bond to, so a fresh-water rinse at the end of the day lifts them off instead of leaving etching behind. It also blocks the UV that fades paint parked in open driveways in Severna Park and Arnold. The swirls and water etching already in the finish get corrected before the coating is applied. Because Annapolis is more than an hour away, most customers book the 7-year Crystal Serum Ultra together with full front PPF so one trip west on US-50 covers both.",
      faqs: [
        { q: "My car sits at a marina in Eastport all summer. Will a coating stand up to the salt and the gulls?", a: "Yes. That environment is exactly what a coating is for. Salt spray and gull droppings sit on the coating instead of the clear coat, and a rinse removes them, where uncoated paint would etch within days. Rinse the car with fresh water after a day on the water and the gloss comes right back." },
        { q: "How does the two-day coating work with the drive from Annapolis?", a: "It takes a single round trip. Drop the car off Monday morning at 4215 Walney Rd via US-50 and I-495, we do the decontamination wash and paint correction that day, then coat and cure on Tuesday, and you pick up Tuesday afternoon. Pairing it with full front PPF keeps everything inside the same two days." },
      ],
    },
    tint: {
      heading: "Maryland-legal tint for Annapolis cars in the shop for film",
      body: "Annapolis is more than an hour from Chantilly, so we do not promote tint there, but an Anne Arundel County car in for PPF or a coating can be tinted during the same stay. Maryland allows a passenger car 35% VLT on the front side windows, rear side windows, and back glass, permits multipurpose vehicles to go darker behind the front doors, and restricts the windshield to a non-reflective strip above the AS-1 line. GeoShield Pro Nano Ceramic is offered in Maryland-legal shades with a nationwide lifetime warranty, and we only install film that is legal where the car is registered.",
      faqs: [
        { q: "What is the legal tint limit for a car registered in Annapolis, Maryland?", a: "Maryland passenger cars are limited to 35% VLT on the front side windows, rear side windows, and back glass. Multipurpose vehicles may run darker film behind the front doors. The windshield may carry only a non-reflective strip above the AS-1 line, and medical exemptions are available with documentation." },
        { q: "Does ceramic tint help with the Bay glare on US-50 out of Annapolis?", a: "Yes. GeoShield ceramic cuts glare and rejects most infrared heat and 99% of UV even at Maryland's 35% limit, and the metal-free film does not interfere with E-ZPass at the Bay Bridge. It can be added while the car is here for PPF." },
      ],
    },
  },

  "Annandale": {
    ppf: {
      heading: "PPF for Annandale's Beltway merge and Little River Turnpike",
      body: "Annandale cars live on the Beltway from the moment they leave the driveway, and the Exit 52 ramps at Little River Turnpike put a car directly into the truck lanes of I-495 where sand and gravel get thrown at the bumper every morning. Add the patched pavement and utility cuts on Route 236, Columbia Pike, and Gallows Road, and the result is a peppered lower bumper and chips across the front of the hood. Full front PPF covers the hood, bumper, fenders, mirrors, and headlights with STEK DYNOshield, a self-healing film backed by a 12-year warranty, so the car looks like it still lives in a showroom instead of inside the Beltway. Annandale buyers picking up new cars from the dealers on Little River Turnpike often drive straight to Walney Rd before the first Beltway commute, and families in SUVs that park on the street under the oaks add Full Front Extended for the door edges and rockers.",
      faqs: [
        { q: "I just bought a car from a dealer on Little River Turnpike in Annandale. Should I get PPF before I start commuting on I-495?", a: "Yes, and the sooner the better. Fresh paint has no chips to trap under the film, so the install looks invisible. We can usually fit a new delivery in within a few days, and the drive from Annandale to Walney Rd is about twenty-five minutes via I-495 and I-66, so many buyers come straight from the dealer lot before the first Beltway commute." },
        { q: "My Annandale commute is Columbia Pike and Route 236 stop-and-go rather than highway. Is partial front enough?", a: "For a slow in-town commute, partial front covers the bumper, leading edge of the hood, fender edges, and mirrors, which is where bumper-level grit lands. If you also use the Beltway or I-66 at speed, full front is the better choice because chips climb higher onto the hood and fenders at highway speeds, and there is no film line on the hood." },
      ],
    },
    ceramic: {
      heading: "Ceramic coating for Annandale's oak-shaded streets and apartment lots",
      body: "Annandale's older neighborhoods around Ravensworth, Pinecrest, and Lake Accotink are shaded by big oaks and tulip poplars, which is great for the house and bad for a car parked underneath it. Sap, pollen, bird droppings, and tannin stains from wet leaves all etch clear coat if they sit for a week, and many Annandale drivers park on the street or in open apartment lots along Little River Turnpike with no garage. A Gtechniq Crystal Serum Light coating puts a hard, slick layer over the paint so those contaminants rinse off at a touchless wash instead of bonding, and it adds UV protection for the hours spent in Beltway traffic. Every coating starts with paint correction to remove the swirls from years of tunnel washes. Owners who keep a car a long time step up to Crystal Serum Ultra for its 7-year life.",
      faqs: [
        { q: "My car sits on the street under oak trees in Annandale all year. Will a coating actually help with the sap and leaf stains?", a: "Yes. Sap and leaf tannins sit on top of the coating rather than etching the clear coat, so they come off with a rinse or detail spray even after a wet fall weekend. The coating also blocks the UV that fades paint on cars without a garage, which is most of Annandale's older neighborhoods." },
        { q: "How long will I be without the car if I drop it off from Annandale?", a: "Plan on two days. The first day is paint correction to remove swirls and light scratches, and the second is the coating application and cure. Most Annandale customers drop off at 9 AM on the way to work via I-495 and I-66, then pick up the next afternoon before the Beltway backs up." },
      ],
    },
    tint: {
      heading: "Window tint for Annandale's Beltway glare and Route 236 commute",
      body: "Annandale drivers heading to Tysons face the sun on the inner loop every morning and get it again coming home down Little River Turnpike, and cars parked in the open at the NOVA Annandale campus or the apartment lots off Columbia Pike bake all afternoon. GeoShield Pro Nano Ceramic tint cuts up to 83% of the heat, blocks 99% of UV, and reduces that glare without a mirrored look, and because the film has no metal it will not interfere with the Beltway express-lane E-ZPass or a phone signal. Virginia allows 50% on a sedan's front side windows and 35% on the rear sides and back glass, while SUVs, trucks, and vans can go darker behind the front doors, so Annandale families in SUVs usually pick 20% in back with a legal 50% ceramic up front. Every window is metered before the car leaves.",
      faqs: [
        { q: "What is the darkest legal tint for my sedan in Annandale, Virginia?", a: "In Virginia, a sedan can have 50% VLT on the front side windows and 35% on the rear side windows and back glass, with a windshield strip only above the AS-1 line. SUVs, trucks, and vans may go darker behind the front doors. Medical exemptions exist for darker film with the proper paperwork. We only install film that is legal where the car is registered." },
        { q: "Will ceramic tint help with the afternoon sun when my car is parked all day at NOVA Annandale?", a: "Noticeably. The ceramic film rejects most of the infrared heat before it reaches the cabin, so the seats and steering wheel are not scorching after a day in an open lot, and the 99% UV block keeps the dash and leather from fading. The lifetime warranty covers bubbling, peeling, and purpling." },
      ],
    },
  },
  "Lorton": {
    ppf: {
      heading: "PPF for Lorton's I-95 express lanes and Lorton Road",
      body: "The stretch of I-95 through Lorton between the Occoquan bridge and Newington is a constant stream of tractor-trailers and dump trucks, and the express-lane entrances at Lorton Road funnel cars into the gravel they leave behind. Lorton Road and Ox Road have been under construction for years as Laurel Hill and the neighborhoods around the Workhouse have built out, so even the surface streets throw stone. Cars from Lorton arrive with a sandblasted lower bumper and chips across the leading edge of the hood, and full front PPF in STEK DYNOshield covers exactly those panels, plus fenders, mirrors, headlights, and A-pillars, with no film line and a 12-year warranty. Fort Belvoir personnel driving trucks and SUVs on Richmond Highway usually add Full Front Extended for rockers and door edges. Lorton customers often combine PPF with a coating so one trip up the Fairfax County Parkway covers both.",
      faqs: [
        { q: "What is the best route from Lorton to Skyline Customs for a new-car PPF appointment?", a: "Take the Fairfax County Parkway north all the way to Route 28, then Route 28 north to Walney Rd, about thirty minutes without touching I-95. If you are coming from the Fort Belvoir side, I-95 north to I-495 and I-66 west works too. Parking is free on site and most full front installs finish the same day." },
        { q: "I take the I-95 express lanes from Lorton every day. Will PPF stand up to that much truck traffic?", a: "That is exactly what it is built for. STEK DYNOshield absorbs stone impacts that would chip paint, and the self-healing top coat clears light scratches with heat from the sun or warm water. Full front covers the hood, bumper, fenders, mirrors, and headlights, which is where I-95 gravel lands, and the film carries a 12-year manufacturer warranty." },
      ],
    },
    ceramic: {
      heading: "Ceramic coating for Lorton commuters and Laurel Hill driveways",
      body: "Lorton cars split their time between I-95 diesel soot and shadeless driveways in Laurel Hill, Lorton Valley, and the newer townhome rows near the VRE station, with weekend side trips to the gravel lots at Mason Neck and Pohick Bay. That mix of road film, construction dust from Lorton Road, pollen from the Occoquan woods, and hard well-water spotting in some older neighborhoods is tough on unprotected clear coat. A Gtechniq Crystal Serum Ultra coating is the 7-year answer for owners who plan to keep the car, giving the paint a slick, chemically resistant surface that soot and dust rinse off and that beads water before it dries into spots. Crystal Serum Light is the 5-year option. Every coating includes paint correction, and given the drive from Lorton most customers book it alongside full front PPF.",
      faqs: [
        { q: "My car sits in an open driveway in Laurel Hill and goes through I-95 traffic daily. What does a coating do for that?", a: "The coating takes the hit instead of the paint. Diesel film and road grime sit on the slick surface and rinse off at a touchless wash, water beads off before it spots, and the UV protection keeps the clear coat from fading on a car that never sees a garage. Washing takes a fraction of the time." },
        { q: "Can I get a coating and PPF done in one trip from Lorton?", a: "Yes, and most Lorton customers do. Full front PPF takes the first day, paint correction and the coating take the second, so plan on dropping off one morning and picking up the next afternoon. One round trip up the Fairfax County Parkway covers both, and the film and coating work together on the front end." },
      ],
    },
    tint: {
      heading: "Window tint for Lorton's I-95 commute and Fort Belvoir gates",
      body: "Lorton commuters drive I-95 north into the sunrise and home into a low western sun over the Occoquan, and cars parked at the Lorton VRE lot, the Fort Belvoir parking lots, and the Lorton Station townhouse rows sit uncovered all day. GeoShield Pro Nano Ceramic tint rejects up to 83% of solar heat and 99% of UV while cutting glare without a reflective finish, and the metal-free construction keeps the express-lane E-ZPass and base access passes working. Virginia law sets 50% on a sedan's front side windows and 35% on the rear sides and back glass, with SUVs, trucks, and vans allowed darker behind the front doors, and the gate guards at Belvoir expect legal, non-reflective film. Most Lorton families choose 20% behind the front doors on SUVs with a legal 50% ceramic in front; sedans take 35% in the back.",
      faqs: [
        { q: "What tint is legal for my sedan in Lorton, and will it pass at the Fort Belvoir gate?", a: "Virginia allows 50% VLT on front side windows and 35% on rear side windows and back glass for sedans, with only a strip above the AS-1 line on the windshield. Trucks, SUVs, and vans are allowed darker film behind the front doors. We install only Virginia-legal, non-reflective film and meter every window, so the car is ready for any base inspection." },
        { q: "Does ceramic tint interfere with the E-ZPass I use in the I-95 express lanes from Lorton?", a: "No. GeoShield Pro Nano Ceramic contains no metal layer, so the E-ZPass transponder, GPS, satellite radio, and phone signals pass through normally. You get the heat rejection of a ceramic film without the signal problems that older metallic tints caused, and the lifetime warranty covers the film against fading and purpling." },
      ],
    },
  },
  "Dale City": {
    ppf: {
      heading: "PPF for Dale City's I-95 slog and Dale Boulevard",
      body: "Dale City drivers log more highway miles than almost anyone we serve, and nearly all of them are on I-95 between Dale Boulevard and the Springfield interchange behind tractor-trailers that throw stone from the shoulders and the express-lane work zones. Dale Boulevard itself is patched and gritty, and the Prince William Parkway toward Manassas runs past active subdivision construction. The damage shows up as a peppered lower bumper, chips across the leading edge of the hood, and pitted headlights. Full front PPF in STEK DYNOshield covers the full hood, bumper, both fenders, mirrors, headlights, and A-pillars with no film line and a 12-year warranty, and the self-healing surface clears light scratches from the commuter-lot shuffle. Trucks and SUVs that run Hoadly Road add Full Front Extended for rockers and door edges. Because of the drive, most Dale City customers pair PPF with a coating in one visit.",
      faqs: [
        { q: "How long is the drive from Dale City to Skyline Customs, and what is the best route?", a: "About thirty-five minutes. The Prince William Parkway north to I-66 east, then Route 28 north to Walney Rd avoids I-95 entirely. I-95 north to I-495 and I-66 west is the alternative if you are already near the interstate. There is free parking on site, and a full front install is usually done the same day." },
        { q: "I slug from the Dale City commuter lot and sit on I-95 every day. Is full front PPF really enough?", a: "Yes. The impacts from I-95 gravel land on the bumper, hood, fenders, and headlights, and full front covers all of them. If you drive a truck or SUV, Full Front Extended adds the rockers and door edges that taller vehicles get hit on. That covers everything a commuter car actually gets hit on in the I-95 truck lanes." },
      ],
    },
    ceramic: {
      heading: "Ceramic coating for Dale City's open driveways and I-95 brine",
      body: "Most of Dale City's neighborhoods were built with driveways and no garages, so cars sit in full sun all summer and get coated in brine from I-95 and Dale Boulevard all winter, then collect construction dust from the new builds off Hoadly Road and the Prince William Parkway. That is a brutal combination for clear coat, and it shows up as faded hoods, water spots, and a dull, chalky finish on older cars. A Gtechniq Crystal Serum Light coating gives the paint a hard, slick layer that brine and dust rinse off before they bond, beads water so it does not dry into spots, and blocks the UV that does the fading. Crystal Serum Ultra extends that to 7 years for owners keeping the car long term. Every coating includes paint correction to remove swirls first, and Dale City customers usually book it with full front PPF so the long drive only happens once.",
      faqs: [
        { q: "My car has no garage in Dale City and sits in the sun all day. Will a coating keep the paint from fading?", a: "That is one of its main jobs. The coating blocks UV from reaching the clear coat and keeps the gloss from going chalky, and it also stops brine, pollen, and bird droppings from bonding to the paint. A quick rinse at a touchless wash brings the car back to clean, which matters when the driveway is the only parking." },
        { q: "How do I keep a coated car clean through a Dale City winter on I-95?", a: "Rinse the brine off at a touchless wash every couple of weeks rather than letting it sit, and avoid brush washes that swirl the finish. The coating's slick surface makes the salt let go easily, and the chemical resistance means the brine does not etch the paint while you wait for a warm day." },
      ],
    },
    tint: {
      heading: "Window tint for Dale City's sunrise commute and commuter lots",
      body: "The Dale City commute on I-95 north points straight into the sunrise, and the drive home down Dale Boulevard ends in a western glare, while cars left at the Horner Road and Dale City commuter lots or in open driveways bake for ten hours a day. GeoShield Pro Nano Ceramic tint rejects up to 83% of solar heat and 99% of UV, cuts glare without a reflective look, and contains no metal, so the E-ZPass for the I-95 express lanes keeps reading. Virginia permits 50% on a sedan's front side windows and 35% on the rear sides and back glass, and SUVs, trucks, and vans may go darker behind the front doors. Dale City families in SUVs and minivans mostly choose 20% in back with a legal 50% ceramic up front; sedans take 35% in back. A clear ceramic windshield film is a popular add-on for the I-95 sunrise.",
      faqs: [
        { q: "What is the legal tint limit for my car in Dale City, Virginia?", a: "Sedans can have 50% VLT on the front side windows and 35% on the rear side windows and back glass. If you drive an SUV, truck, or van, anything darker is fine behind the front doors. Windshield film is allowed only as a strip above the AS-1 line, and medical exemptions exist with documentation. Whatever shade you pick, we install only what is legal for the state the car is registered in." },
        { q: "Will the tint hold up with my car parked all day at the Dale City commuter lot?", a: "Yes. GeoShield Pro Nano Ceramic is built for exactly that exposure, and it carries a nationwide lifetime warranty against bubbling, peeling, fading, and purpling. The ceramic layer does the heat rejection, so the cabin is far cooler when you get back from the slug line in the evening." },
      ],
    },
  },
  "Haymarket": {
    ppf: {
      heading: "PPF for Haymarket's I-66 speeds and Route 15 gravel",
      body: "Haymarket is where I-66 runs at full speed, and the stretch east through the Route 29 interchange construction and the express-lane work has kept the pavement covered in stone for years, so the chips here land higher and harder than on a slow suburban commute. Route 15 north and Route 55 west add quarry trucks and loose gravel shoulders, and the back roads to the wineries around the Bull Run Mountains are worse. Cars from Dominion Valley and Piedmont come in with chips across the full hood and fender tops, not just the bumper, which is why we recommend full front PPF in STEK DYNOshield: full hood, bumper, both fenders, mirrors, headlights, and A-pillars with no film line and a 12-year warranty. Trucks and SUVs that run Route 15 or Thoroughfare Road regularly add Full Front Extended for rockers and door edges.",
      faqs: [
        { q: "I commute from Haymarket to Fairfax on I-66 at seventy miles an hour. Does PPF really stop chips at that speed?", a: "Yes. STEK DYNOshield is a thick urethane film that absorbs the impact of a stone instead of letting it crack the paint, and the self-healing top coat clears the light scratches from road grit with sun or warm water. At I-66 speeds chips climb the hood and fenders, so full front coverage is the right package rather than partial front." },
        { q: "I am picking up a new car and driving it home to Dominion Valley. When should the film go on?", a: "Before the first I-66 commute if you can. Fresh paint has no chips or embedded grit, so the film goes on perfectly clean and looks invisible, and the 12-year warranty starts on paint that is flawless. We can usually schedule a new delivery within a few days, and Walney Rd is about twenty minutes east on I-66." },
      ],
    },
    ceramic: {
      heading: "Ceramic coating for Haymarket's HOA driveways and winery dust",
      body: "Haymarket's planned communities have strict HOA rules about washing in the driveway, and most garages are full of bikes and golf carts, so a lot of cars in Dominion Valley and Piedmont live outside on long driveways with no shade. Pollen from the surrounding farmland, well water in the older neighborhoods off Route 15, and the fine dust kicked up on the gravel roads to the wineries all settle on the paint and stay there. A Gtechniq Crystal Serum Ultra coating makes the surface slick and chemically resistant for 7 years, so that dust and pollen rinse off at a touchless wash, water beads off before it spots, and the UV from a full day in the sun does not fade the clear coat. Crystal Serum Light covers the same ground for 5 years. Every coating includes paint correction to remove the swirls from dealer and tunnel washes first.",
      faqs: [
        { q: "My HOA in Dominion Valley does not allow driveway washing. Does a coating make it easier to keep the car clean?", a: "That is one of the best reasons to coat a car in Haymarket. Dirt and pollen cannot bond to the slick coated surface, so a touchless wash on the way home gets the car clean, and a quick detail spray handles bird droppings in between. You spend far less time and no water in the driveway." },
        { q: "Does a coating help with the well-water spots we get on cars in the older neighborhoods off Route 15?", a: "Yes. Water beads and runs off a coated car instead of drying flat and leaving mineral rings, and any spots that do form sit on the coating rather than etching into the clear coat, so they wipe away with detail spray. Dry the car after a rinse when you can to make it easier still." },
      ],
    },
    tint: {
      heading: "Window tint for Haymarket's I-66 sunrise and open driveways",
      body: "The Haymarket commute east on I-66 drives straight into the sunrise every morning and the return trip faces the sunset over the Bull Run Mountains, and cars parked in the open at the I-66 commuter lots or on long driveways in Piedmont and Dominion Valley sit in full sun all day. GeoShield Pro Nano Ceramic tint rejects up to 83% of solar heat and 99% of UV, cuts glare without a mirrored finish, and has no metal, so the I-66 express-lane E-ZPass keeps working. Virginia allows 50% on a sedan's front side windows and 35% on the rear sides and back glass, and SUVs, trucks, and vans may go darker behind the front doors. Haymarket families in SUVs usually choose 20% in back with a legal 50% ceramic in front; sedans take 35% in back, and the clear windshield film is the most common add-on for the sunrise.",
      faqs: [
        { q: "How dark can I legally tint my SUV in Haymarket, Virginia?", a: "On an SUV, truck, or van, Virginia allows 50% VLT on the front side windows and any darkness behind the front doors, so 20% or darker in the back is legal. Sedans are limited to 35% on the rear sides and back glass. Windshield film is permitted only above the AS-1 line. Film choices are limited to what is legal for your registration state." },
        { q: "Will a windshield film help with the sunrise glare on I-66 from Haymarket?", a: "Yes. A clear ceramic windshield film rejects heat and glare without darkening the glass, so it stays legal and you still see clearly at dawn on I-66. It takes the edge off the low sun and keeps the dash cooler, and many Haymarket commuters add it to a rear tint package." },
      ],
    },
  },
  "Bristow": {
    ppf: {
      heading: "PPF for Bristow's Route 28 dump trucks and Linton Hall Road",
      body: "Bristow is still being built, and the dump trucks that feed Braemar, Victory Lakes, and the new phases off Linton Hall Road drop stone on Route 28 and the Prince William Parkway every day. The commute to I-66 on Route 28 passes through the Manassas industrial stretch and the Route 234 Bypass interchange, and the Nokesville end of Route 28 adds gravel shoulders and farm trucks. The chips concentrate on the lower bumper and the front of the hood, and taller trucks and SUVs take hits on the rockers. Full front PPF in STEK DYNOshield covers the full hood, bumper, both fenders, mirrors, headlights, and A-pillars with no film line and a 12-year warranty, and the self-healing surface clears the light scratches from gravel lots at Jiffy Lube Live. Families in Braemar who drive pickups add Full Front Extended for rockers, door edges, and door cups.",
      faqs: [
        { q: "I drive Route 28 from Bristow to I-66 every morning behind dump trucks. Which PPF package should I get?", a: "Full front. Dump-truck gravel on Route 28 hits the bumper, the hood, the fender tops, and the headlights, and full front covers all of them with no film line. If you drive a truck or an SUV, Full Front Extended adds the rockers and door edges that take hits from stone kicked up by your own front tires." },
        { q: "How far is Skyline Customs from Bristow, and can I get PPF done the same day?", a: "About twenty minutes: Route 28 north through Manassas and Centreville, straight to Walney Rd in Chantilly. Most full front installs are finished the same day, so drop off at 9 AM and we call when it is ready, usually before the evening Route 28 backup. Parking at Walney Rd is free." },
      ],
    },
    ceramic: {
      heading: "Ceramic coating for Bristow's construction dust and new driveways",
      body: "Bristow's biggest paint problem is the neighborhood next door that is still being built. Construction dust from the new phases around Braemar and Victory Lakes settles on every car on Linton Hall Road, the driveways are new concrete with young trees that give no shade, and much of the area outside the planned communities is on well water that leaves mineral spots. A Gtechniq Crystal Serum Light coating puts a slick, hard 5-year layer over the paint so that dust and pollen rinse off at a touchless wash, water beads and runs off before it spots, and the UV from a full day in an open cul-de-sac does not fade the clear coat. Owners who plan to keep the car choose Crystal Serum Ultra for 7 years. Every coating includes paint correction to remove dealer swirls first, and many Bristow customers book it with full front PPF since the shop is twenty minutes up Route 28.",
      faqs: [
        { q: "My car sits in an open driveway in Braemar with construction dust everywhere. Will a coating keep it clean?", a: "It will make cleaning much easier. Dust cannot bond to the coated surface, so it rinses off at a touchless wash instead of needing a scrub that swirls the paint, and the coating blocks the UV that fades paint on a car with no shade. Bird droppings and pollen wipe away with detail spray." },
        { q: "Do you coat brand-new cars, or should I wait until it has a few miles on it?", a: "Coat it new. New cars still get a light paint correction to remove the swirls from the dealer wash, and then the coating locks in the new-car gloss before Bristow dust and Route 28 brine ever touch the clear coat. Pairing it with full front PPF the same visit protects the front end at the same time." },
      ],
    },
    tint: {
      heading: "Window tint for Bristow's Route 28 commute and Broad Run VRE",
      body: "Bristow commuters drive Route 28 and I-66 east into the morning sun and come home facing the sunset over the Linton Hall farmland, and cars parked at the Broad Run VRE lot or in shadeless new driveways sit in full sun for the whole day. GeoShield Pro Nano Ceramic tint rejects up to 83% of solar heat and 99% of UV, cuts glare without a reflective look, and contains no metal, so the I-66 express-lane E-ZPass reads normally. Virginia allows 50% on a sedan's front side windows and 35% on the rear sides and back glass, while SUVs, trucks, and vans may go darker behind the front doors. Bristow families in SUVs and pickups usually choose 20% in back with a legal 50% ceramic in front; sedans take 35% in back. Every window is metered before the car leaves so there are no surprises at inspection.",
      faqs: [
        { q: "What is the legal window tint for a sedan registered in Bristow, Virginia?", a: "Virginia allows 50% VLT on the front side windows and 35% on the rear side windows and back glass of a sedan, with a windshield strip only above the AS-1 line. Pickups, SUVs, and vans get more freedom behind the front doors. A medical exemption with documentation allows darker film. We will not install a shade that is not legal for the state on your registration." },
        { q: "Will tint keep my truck cooler when it sits at the Broad Run VRE lot all day?", a: "Yes. Ceramic film rejects most of the infrared heat before it enters the cabin, so the seats and steering wheel are not scorching when you get off the train, and the 99% UV block protects the dash and seats from fading. Trucks can run 20% or darker behind the front doors legally." },
      ],
    },
  },
  "South Riding": {
    ppf: {
      heading: "PPF for the Route 50 commute from South Riding to Chantilly",
      body: "South Riding drivers spend every morning on Route 50 east, where the widening work between the Loudoun County Parkway and Route 28 has kept loose stone on the road for years, and the Route 28 interchange at the Dulles end throws more of it. The Loudoun County Parkway north to the Greenway and the data-center corridor is lined with dump trucks and construction entrances, and Tall Cedars Parkway feeds the new phases in Dulles South. The chips land on the lower bumper and the leading edge of the hood, and full front PPF in STEK DYNOshield covers the full hood, bumper, both fenders, mirrors, headlights, and A-pillars with no film line and a 12-year warranty. Because South Riding is ten minutes from the shop, many customers pick up a new car from the dealers on Route 50 and drive it straight to Walney Rd before the first commute. SUVs headed out to Aldie add Full Front Extended.",
      faqs: [
        { q: "I am taking delivery of a new car this week and live in South Riding. Can you fit the PPF in before I start commuting?", a: "Usually, yes. New deliveries are the easiest installs because the paint has no chips or embedded grit, and we try to schedule them within a few days. South Riding is about ten minutes east on Route 50, so most buyers drive from the dealer straight to Walney Rd and have the car back the same day." },
        { q: "My whole commute is Route 50 from South Riding to Chantilly. Is partial front PPF enough for that?", a: "Partial front covers the bumper, the leading 18 inches of the hood, fender edges, and mirrors, which is where the Route 50 construction grit mostly lands at surface-road speeds. If you also use Route 28 or the Loudoun County Parkway at highway speed, full front is the better choice because it covers the whole hood with no film line." },
      ],
    },
    ceramic: {
      heading: "Ceramic coating for South Riding driveways and Dulles dust",
      body: "South Riding sits under the Dulles approach and next to some of the busiest construction in Loudoun, so a fine layer of dust from the airport, the data-center sites along the Loudoun County Parkway, and the new phases in Dulles South and Arcola settles on every car within a day of washing. Most families have more cars than garage bays, so the daily driver lives on the driveway in full sun with HOA rules that discourage washing at home. A Gtechniq Crystal Serum Light coating gives the paint a slick, hard 5-year surface that dust and pollen rinse off at a touchless wash, beads water before it spots, and blocks the UV that fades an uncovered car. Crystal Serum Ultra extends that to 7 years. Every coating includes paint correction first, and with the shop ten minutes away on Route 50, South Riding customers often add the coating to a full front PPF visit.",
      faqs: [
        { q: "My car lives on the driveway in South Riding and is always covered in dust. Does a coating help?", a: "Yes. The dust from Dulles and the construction along the Loudoun County Parkway sits on top of the coating instead of bonding to the paint, so it rinses off at a touchless wash without scrubbing. The coating also blocks the UV that fades an uncovered car and keeps pollen and bird droppings from etching the clear coat." },
        { q: "How many days do you need the car for a coating, and can I drop off from South Riding before work?", a: "Two days. Paint correction the first day, coating and cure the second. Drop off at 9 AM at Walney Rd on your way east on Route 50, and pick up the following afternoon. With the shop ten minutes from South Riding, the logistics are about as easy as a coating gets." },
      ],
    },
    tint: {
      heading: "Window tint for South Riding's Route 50 sunrise and open driveways",
      body: "The South Riding commute east on Route 50 looks straight into the sunrise, and the drive home faces the sun setting over the Bull Run Mountains, while cars parked on open driveways and at the South Riding Town Center lots sit in full sun with no shade from the young trees. GeoShield Pro Nano Ceramic tint rejects up to 83% of solar heat and 99% of UV, cuts glare without a mirrored look, and has no metal, so the Greenway and Dulles Toll Road E-ZPass reads normally. Under Virginia law a sedan may run 50% on the front side windows and 35% on the rear sides and back glass; SUVs, trucks, and vans can go darker behind the front doors. South Riding families in SUVs and minivans mostly choose 20% in back with a legal 50% ceramic in front; sedans take 35% in back. A clear windshield film is the most common add-on for the Route 50 glare.",
      faqs: [
        { q: "How dark can I legally go on my car's windows in South Riding, Virginia?", a: "For a sedan, Virginia allows 50% VLT on the front side windows and 35% on the rear sides and back glass. On an SUV, minivan, or truck the rear windows can be darker. Windshield film is limited to a strip above the AS-1 line, and Virginia does allow a medical exemption with a doctor's authorization. Every job is limited to film that is legal in the state where the car is registered." },
        { q: "How long does tint take, and can I wait at the shop since I live in South Riding?", a: "A rear package takes two to three hours, and a full car with the front doors and windshield strip takes a little longer. South Riding customers often drop off and run errands at the Route 50 shops or head home for a couple of hours, since the shop is ten minutes away, and we call when the car is ready." },
      ],
    },
  },

  "Aldie": {
    ppf: {
      heading: "PPF for Aldie's Route 50 two-lane and gravel driveways",
      body: "Route 50 west of Stone Ridge is a different road from the divided highway east of it: two lanes, no shoulders to speak of, and a steady run of dump trucks from the quarries near Gilberts Corner and construction crews building out Lenah and Willowsford. That traffic throws stone directly at the bumper and the leading edge of the hood, which is why full front PPF in STEK DYNOshield is the package we recommend for nearly every Aldie daily driver. Homes on gravel aprons and the farm lanes off Braddock Road add rocker and door-edge wear, so trucks and SUVs often step up to Full Front Extended. The film self-heals light scratches with heat and carries a 12-year manufacturer warranty. Our Walney Rd bay is about fifteen minutes east of Aldie on Route 50, close enough to drop off on the way to work.",
      faqs: [
        { q: "I just took delivery of a new SUV and I commute Route 50 east from Willowsford. When should I get it filmed?", a: "Book it before the first week of commuting if you can. Route 50 between Stone Ridge and Route 28 is the stretch that chips paint fastest, and film laid over an unchipped hood looks invisible. We can usually fit a new delivery within a few days, and the full front install is finished the same day you drop off." },
        { q: "Does PPF cover the lower bumper where the Gilberts Corner trucks throw stone?", a: "Yes. Every package, including partial front, wraps the full bumper down to the lower lip and around the edges. Full front adds the whole hood, both fenders, mirrors, headlights, and A-pillars, so there is no line partway up the hood where stone from a two-lane road tends to land." },
      ],
    },
    ceramic: {
      heading: "Ceramic coating for Aldie's long driveways and well water",
      body: "Many Aldie homes outside the Stone Ridge and Willowsford HOAs sit on well water, and the first thing owners notice after a driveway wash is mineral spotting baked into the paint by afternoon sun. A Gtechniq Crystal Serum Light coating changes that: water sheets off before it can dry, and whatever spots do form sit on the coating rather than etching the clear coat. The same slick surface keeps the dust from Route 50 construction and the pollen from the tree lines along Braddock Road from bonding, so a quick rinse brings the gloss back. Cars that live under the oaks on the larger lots get the most benefit, because sap and bird droppings wipe away instead of leaving marks. Owners planning to keep a vehicle through the next decade usually choose the 7-year Crystal Serum Ultra. We polish the paint before any coating goes on.",
      faqs: [
        { q: "My car sits outside on a gravel driveway in Lenah all year. Will a coating hold up?", a: "Yes. A coating is designed for exactly that exposure: sun, frost, dust, and pollen on a car with no garage. It will not stop stone chips from the gravel, which is a job for film, but it keeps the paint from oxidizing and makes the dust rinse off instead of grinding in when you wash." },
        { q: "Can I wash a coated car at home on well water without spotting it?", a: "You can, with one habit change: rinse and dry rather than letting the car air-dry in the sun. The coating makes water bead and run off, so a quick towel or blower pass gets most of it. Any spots that remain are on the coating, not in the paint, and wipe off with a detail spray." },
      ],
    },
    tint: {
      heading: "Window tint for Aldie's east-facing Route 50 commute",
      body: "The Route 50 commute out of Aldie runs straight into the sunrise, and the ride home up the hill past Gilberts Corner puts the setting sun in the windshield. GeoShield Pro Nano Ceramic film cuts that glare on the side glass, blocks 99% of UV, and rejects up to 83% of the heat that builds in a car parked on an open Stone Ridge driveway or the lots at the Dulles South shopping centers. Virginia allows 50% on the front doors and 35% on the rear sides and back glass for sedans, and SUVs and trucks, which make up most of what we see from Aldie, can go darker behind the front doors. The film is metal-free, so the Greenway and I-66 express-lane transponders keep working. GeoShield backs it with a nationwide lifetime warranty.",
      faqs: [
        { q: "What is the darkest legal tint for my family SUV in Virginia?", a: "On an SUV, truck, or van registered in Virginia, the front door windows must stay at 50% VLT or lighter, and anything behind the front doors may be darker, which is why most Aldie families choose 20% in back. A windshield strip is allowed above the AS-1 line only. Medical exemptions exist, and we install only what is legal where the car is registered." },
        { q: "Can I get tint done on the way to work from Stone Ridge?", a: "Yes. A rear package or four door windows takes about two to three hours, so drop off at 9 AM on your way east on Route 50 and the car is ready before lunch. We ask that you keep the windows up for a few days afterward while the film cures." },
      ],
    },
  },
  "Great Falls": {
    ppf: {
      heading: "PPF for Georgetown Pike, Route 7, and garage-kept cars",
      body: "Great Falls garages hold some of the best-kept cars we see, and the roads around them are unkind. Georgetown Pike has no shoulder to catch the gravel that washes down from the driveways and the Riverbend side, and Route 7 toward Tysons is a sixty-mile-an-hour construction zone most of the year. A car making that run picks up chips on the bumper and the front of the hood within a season. We fit full front PPF in STEK DYNOshield so the hood, bumper, fenders, mirrors, headlights, and A-pillars are covered in a single layer of self-healing film with no visible edge partway up the hood. Owners of a new delivery from the Tysons dealerships usually bring the car over before it sees Route 7 at speed. For a weekend car that only leaves the garage on Saturdays, partial front is often enough, and we will tell you so.",
      faqs: [
        { q: "I'm taking delivery at a Tysons dealership next week. Can I bring it straight to you before it goes home to Great Falls?", a: "That is the ideal plan. Route 7 from Tysons to Chantilly is the exact road the film is meant to handle, so ask the dealer to skip any paint sealant, drive it over, and we fit full front PPF the same day. The paint is at its cleanest on delivery day, and the install comes out invisible." },
        { q: "Will the film hold up on Georgetown Pike's gravel after a storm?", a: "Yes. STEK DYNOshield is thick enough to absorb stone strikes that would chip bare paint, and light scuffs in the top layer heal with warm sun or a hot rinse. It is backed by a 12-year manufacturer warranty against yellowing, cracking, and peeling, which covers the life of most daily drivers." },
      ],
    },
    ceramic: {
      heading: "Ceramic coating for Great Falls tree cover and estate driveways",
      body: "The trouble with Great Falls paint is the canopy. Cars parked on the driveway, or even under a carport near Great Falls Park and the Riverbend side, collect oak pollen in April, sap through the summer, and leaf tannin stains in October. Well water on the larger lots leaves mineral spots on top of that. A Gtechniq coating gives the paint a hard, slick layer that none of it bonds to, so a rinse with the hose brings back the gloss and sap lifts off with a detail spray instead of a polisher. Every coating starts with paint correction, which matters here because many of these cars have swirls from years of careful but imperfect hand washing. Owners keeping a car long term, or coating something they rarely drive, usually choose the 7-year Crystal Serum Ultra; daily drivers do well on the 5-year Crystal Serum Light.",
      faqs: [
        { q: "My SUV lives on the driveway under oaks off Walker Road. Will a coating stop the sap stains?", a: "It will keep them from becoming stains. Sap still lands, but it sits on top of the coating rather than bonding to the clear coat, so it comes off with a detail spray or a quick wash if you catch it within a week or two. Without a coating, that same sap etches into the paint by midsummer." },
        { q: "Is it worth coating a garage-kept car that only drives on weekends?", a: "Yes, for a different reason than a commuter. A weekend car gets washed often, and every wash on bare paint adds fine swirls. The coating takes that abuse instead of the clear coat, keeps the deep gloss a collector wants, and makes dust from Georgetown Pike rinse away without scrubbing." },
      ],
    },
    tint: {
      heading: "Window tint for Great Falls' Route 7 glare and open-air parking",
      body: "Route 7 toward Tysons runs east into the morning sun, and the drive home up Georgetown Pike means a low sunset through the trees. GeoShield Pro Nano Ceramic tint cuts that glare without a mirrored look, blocks 99% of the UV that fades leather and dash plastics, and rejects up to 83% of solar heat, which matters for a car left on the open driveway all day. Virginia allows 50% on sedan front doors and 35% on the rear sides and back glass, and SUVs and vans may go darker behind the front doors, which is what most Great Falls families choose. The film has no metal layer, so phone and GPS signals and the Beltway express-lane transponder are unaffected. It carries a nationwide lifetime warranty.",
      faqs: [
        { q: "What tint shade is legal on my sedan in Virginia?", a: "For a sedan registered in Virginia, the front door windows must be 50% VLT or lighter and the rear sides and back glass 35% or lighter. A windshield strip is allowed only above the AS-1 line. Medical exemptions exist, and we meter every window before the car leaves so you never have a problem at inspection." },
        { q: "How long will I be without the car for tint from Great Falls?", a: "A full set of side and rear windows takes about three hours. Drop off at 9 AM on your way out Route 7, and we call when it is done. Many Great Falls customers wait at the cafes near Route 28 and Westfields or run errands in the Dulles area." },
      ],
    },
  },
  "Brambleton": {
    ppf: {
      heading: "PPF for Brambleton's new homes, new cars, and new pavement",
      body: "Brambleton has more new cars per block than almost anywhere in Loudoun, and it also has more construction trucks. The dump trucks and concrete mixers feeding the next phase of homes off Evergreen Mills Road and Creighton Road share Loudoun County Parkway with the morning commute, and they leave gravel on every lane. A new vehicle picked up from the dealerships in Sterling, Dulles, or Chantilly can show its first bumper chip before the temporary tags come off. Full front PPF in STEK DYNOshield covers the hood, bumper, fenders, mirrors, headlights, and A-pillars with a single self-healing layer that carries a 12-year manufacturer warranty, and it goes on in one day. Families whose SUVs make the school and sports-field runs along Ryan Road and Belmont Ridge Road add rockers and door cups with Full Front Extended.",
      faqs: [
        { q: "We're picking up a new car from a dealer in Sterling this weekend. Should it come to you before it goes home to Brambleton?", a: "Yes, and the timing is easy: Route 28 south from the Sterling dealerships lands at Walney Rd in about ten minutes. Film laid on paint that has never seen Loudoun County Parkway goes on invisible, and the install is done the same day, so you still get the car home that evening." },
        { q: "My commute is the Parkway to Route 50 to Route 28 every day. Is partial front enough?", a: "Partial front covers the bumper, the leading eighteen inches of the hood, the fender edges, and the mirrors, which is where most of the Parkway gravel hits. The trade-off is a visible film line across the hood. If that would bother you, full front wraps the whole hood and both fenders with no line." },
      ],
    },
    ceramic: {
      heading: "Ceramic coating for Brambleton driveways and construction dust",
      body: "Brambleton's trees are young and its lots are open, so a car parked on the driveway gets full sun from morning to evening and a steady film of dust from the grading and paving going on a few streets over. Add the sprinkler overspray that leaves mineral spots on the hood by noon and the pollen from the new plantings along the Parkway, and paint dulls fast. A Gtechniq Crystal Serum Light coating keeps that dust and spotting on the surface instead of in the clear coat, so a touchless wash or a quick rinse restores the gloss. It also blocks UV, which is the main thing fading paint on a shadeless driveway. We correct the paint before coating, which removes the swirls dealer prep and automatic washes leave behind. Owners planning to keep a car through its second owner choose the 7-year Crystal Serum Ultra.",
      faqs: [
        { q: "Our second car sits on the driveway in full sun all day in Brambleton. Does a coating actually help?", a: "Yes. UV is what oxidizes and fades paint on an open driveway, and the coating absorbs that exposure instead of the clear coat. It also keeps the construction dust and sprinkler spotting from bonding, so the car looks washed longer and the gloss holds up year after year." },
        { q: "How should I wash a coated car at the washes around Brambleton Town Center?", a: "Use a touchless wash or hand wash with two buckets. Brush washes are the one thing we ask you to avoid, since the spinning brushes add swirls to any paint, coated or not. Between washes, a rinse with the hose takes most of the dust off a coated car." },
      ],
    },
    tint: {
      heading: "Window tint for Brambleton's open lots and Ashburn Metro parking",
      body: "Brambleton cars spend their days in the open: the Ashburn Metro garage fills early so many commuters park in surface lots, the Brambleton Town Center lot has no shade, and most driveways face the sun with nothing taller than a sapling nearby. GeoShield Pro Nano Ceramic tint rejects up to 83% of solar heat, blocks 99% of UV, and cuts the glare coming off Loudoun County Parkway on the evening drive west. Virginia law allows 50% on the front doors and 35% on the rear side windows and back glass for a sedan; SUVs, trucks, and vans can go darker behind the front doors. Because the film contains no metal, the Greenway toll transponder and phone signals are unaffected. It carries a nationwide lifetime warranty against bubbling, peeling, and color change.",
      faqs: [
        { q: "What's the legal tint limit for my Brambleton sedan versus my SUV in Virginia?", a: "A sedan registered in Virginia is limited to 50% VLT on the front doors and 35% on the rear sides and back glass. An SUV, truck, or van keeps the 50% front limit but can go darker behind the front doors. Windshield film is permitted only above the AS-1 line, and medical exemptions exist for darker front glass." },
        { q: "Can you tint the car the same day I get PPF so I only make one trip from Brambleton?", a: "Yes. Tint takes two to three hours and full front PPF is a one-day install, so both fit in a single drop-off. We do the tint first so the film has the rest of the day indoors to start curing before you drive home down the Parkway." },
      ],
    },
  },
  "Purcellville": {
    ppf: {
      heading: "PPF for Purcellville trucks on Route 7 and the farm roads",
      body: "A Purcellville vehicle gets hit from two directions. On Route 7 the gravel haulers and farm trucks heading toward Leesburg throw stone at highway speed, which peppers the bumper and the front of the hood. On Route 287, Hillsboro Road, and the gravel lanes around Lincoln and Hamilton, the damage moves lower: rockers, door bottoms, and the trailing edge of the front fenders get sandblasted by what the tires pick up. Full front PPF in STEK DYNOshield handles the first problem, and Full Front Extended, which adds rockers, door edges, and door cups, handles the second, so most trucks and SUVs from western Loudoun take the extended package. The film self-heals light scratches and carries a 12-year manufacturer warranty. Because the trip is about forty minutes, nearly every Purcellville customer books PPF and a coating together to make one round trip.",
      faqs: [
        { q: "I commute Route 7 to Tysons every day from Purcellville. How quickly does that road chip a new car?", a: "Usually within the first few months. The Route 7 stretch from Purcellville through Leesburg is where we see the heaviest hood and bumper damage in Loudoun, mainly from gravel trucks. If you have a new delivery, bring it over before the commute starts; film on unchipped paint looks like nothing is there." },
        { q: "Is it worth driving forty minutes from Purcellville for PPF?", a: "Customers tell us it is, for a STEK-certified install with computer-cut patterns, tucked edges, and the 12-year warranty behind it. To make the trip count, we schedule PPF and a coating or tint for the same visit, so one drive east on Route 7 covers everything the car needs." },
      ],
    },
    ceramic: {
      heading: "Ceramic coating for Purcellville's well water, mud, and open parking",
      body: "Purcellville is hard on a finish in ways the eastern suburbs are not. Almost every home outside town is on well water, so a driveway wash leaves mineral spots that bake in by afternoon. The farm roads coat the lower half of the car in mud and lime dust, and most vehicles park outside with no tree cover from the summer sun or the winter frost. A Gtechniq coating addresses all three: water beads and runs off before it dries, mud and dust sit on the slick surface and rinse away instead of grinding in, and the coating takes the UV instead of the clear coat. Paint correction comes first, so the swirls from years of pressure-washer rinses are polished out before the coating locks the finish in. Trucks that will be kept a long time get the 7-year Crystal Serum Ultra; daily drivers do well with the 5-year Crystal Serum Light.",
      faqs: [
        { q: "My truck sits outside on gravel in Round Hill through winter. Will the coating survive the frost and salt?", a: "Yes. Frost, brine from Route 7, and freeze-thaw cycles are the conditions a coating is built for; it is a hard glass-like layer, not a wax that strips off in a winter. The salt still needs rinsing off, but it rinses off cleanly and does not stain the paint underneath." },
        { q: "Can I pressure-wash a coated truck after a muddy day on Hillsboro Road?", a: "You can. Keep the nozzle a foot or two off the paint and use a wide fan pattern, as you would on any finish. Mud releases from a coated surface far more easily than from bare paint, so most of it comes off in the rinse before you touch the truck with a mitt." },
      ],
    },
    tint: {
      heading: "Window tint for Purcellville's Route 7 sunrise and open driveways",
      body: "The Route 7 commute from Purcellville heads straight into the sunrise, and the return over the hills from Leesburg lands the setting sun in the windshield. GeoShield Pro Nano Ceramic tint cuts that glare, blocks 99% of UV, and rejects up to 83% of heat in a truck that parks on an open gravel driveway all day. Virginia permits 50% on the front doors and 35% on the rear side windows and back glass for sedans, while trucks, SUVs, and vans may go darker behind the front doors, which suits the pickups that make up much of western Loudoun's traffic. The film is metal-free, so GPS, phones, and the Greenway transponder work normally, and it carries a nationwide lifetime warranty. Most Purcellville customers add tint to a PPF visit so one trip covers both.",
      faqs: [
        { q: "How dark can I go on my pickup in Virginia?", a: "On a pickup, SUV, or van registered in Virginia, the front door windows must be 50% VLT or lighter. Behind the front doors you can go darker, and many western Loudoun truck owners choose 20% there. A windshield strip is allowed above the AS-1 line only, and medical exemptions exist for the front glass." },
        { q: "Can you add tint to my PPF appointment so I only drive in from Purcellville once?", a: "Yes. Tint takes two to three hours and we schedule it alongside the full front PPF install, so one drop-off covers both. Drop off at 9 AM, spend the day in the Dulles area, and the car is ready that afternoon. Keep the windows up for a few days while the film cures." },
      ],
    },
  },
  "Warrenton": {
    ppf: {
      heading: "PPF for Warrenton's Route 29 commute and Fauquier gravel",
      body: "The Route 29 run from Warrenton to the I-66 interchange at Gainesville is where most Fauquier cars pick up their chips. It is four lanes at highway speed, the shoulders are gravel, and the quarry and livestock trucks that use it leave stone in every lane. Then there is home: gravel driveways in New Baltimore, farm roads around Vint Hill and Airlie, and the mud on Route 211 after a wet week. Full front PPF in STEK DYNOshield covers the hood, bumper, fenders, mirrors, headlights, and A-pillars against the highway damage, and Full Front Extended adds the rockers, door edges, and door cups that gravel driveways chew. Light scratches in the film heal with heat, and STEK backs it with a 12-year manufacturer warranty. Because Warrenton is about forty-five minutes out, we schedule PPF and a ceramic coating in the same visit whenever we can, so the round trip happens once.",
      faqs: [
        { q: "I bought a truck from a dealer on Broadview Avenue. Can I bring it up before I start commuting Route 29?", a: "That is the best possible timing. A truck that has not yet run Route 29 and I-66 has paint with nothing to hide, so the film goes on invisible and stays that way. Drive it up Route 29 and I-66 to Route 28, and full front or Full Front Extended is done the same day you drop off." },
        { q: "Does the film protect the rocker panels from my gravel driveway in New Baltimore?", a: "Only the Full Front Extended package does. Full front stops at the fenders; the extended version adds the rockers, the door edges, and the door cups where tires fling gravel and where boots and bags scrape getting in. For a truck on gravel, that is the package we recommend." },
      ],
    },
    ceramic: {
      heading: "Ceramic coating for Warrenton's open driveways and well water",
      body: "Fauquier County cars live outside. Most Warrenton homes outside the Old Town grid park on an open driveway or gravel pad with the sun on the hood all day, and the well water that comes out of the hose leaves mineral spots by the time the wash is done. Add road film from the Route 29 commute, mud from the horse-country lanes, and heavy spring pollen from the surrounding fields, and the paint on a two-year-old truck looks tired. A Gtechniq Crystal Serum Light coating puts a hard, slick layer over the clear coat so dust, mud, and water spots stay on the surface and rinse away, and it shields the paint from the UV that fades it. We polish out the existing swirls before the coating goes on, so the finish starts better than new. Owners keeping a truck for the long haul choose the 7-year Crystal Serum Ultra.",
      faqs: [
        { q: "My SUV parks in full sun on a gravel pad near Vint Hill. Which coating should I pick?", a: "For a vehicle that sees that much sun and no cover, we usually suggest Crystal Serum Ultra, the 7-year coating, because it has more thickness to absorb years of UV and dust abrasion. If you plan to trade in within a few years, the 5-year Crystal Serum Light covers that window comfortably." },
        { q: "Can I get the coating and PPF done in one trip from Warrenton?", a: "Yes, and most Warrenton customers do. Plan on two days: PPF goes on the first day, the coating and its indoor cure take the second. Drop off on your way into Fairfax one morning and pick up on the way home the next evening, so the whole job fits around two normal commutes." },
      ],
    },
    tint: {
      heading: "Window tint for Warrenton drivers on Route 29",
      body: "Warrenton is about forty-five minutes from our bay, so we usually fit GeoShield Pro Nano Ceramic tint only when a Fauquier customer is already in for PPF or a coating. The film blocks 99% of UV, rejects up to 83% of heat, and carries a nationwide lifetime warranty. Virginia allows 50% on the front doors and 35% on the rear sides and back glass for sedans; a truck, SUV, or van is allowed a darker shade behind its front doors. A windshield strip is permitted above the AS-1 line only, and medical exemptions exist.",
      faqs: [
        { q: "What's the legal tint limit for my car in Virginia?", a: "Sedans registered in Virginia are limited to 50% VLT on the front door windows and 35% on the rear sides and back glass. Anything registered as a truck, SUV, or van can run darker film behind the front doors. Windshield film may go above the AS-1 line only, and a medical exemption can allow darker front glass. Whatever state the car is registered in sets the limit we install to." },
        { q: "Can you add tint to my PPF visit from Warrenton?", a: "Yes. Tint takes two to three hours and fits inside a PPF or coating appointment, so you make the Route 29 and I-66 trip once. Keep the windows up for a few days afterward while the film cures, and any light haze clears on its own." },
      ],
    },
  },
  "Winchester": {
    ppf: {
      heading: "PPF for Winchester's I-81 freight and the Blue Ridge crossing",
      body: "Winchester paint takes the worst of two worlds. On I-81, tractor-trailers kick up stone, retread fragments, and winter cinders at a rate that leaves a bare bumper looking sandblasted in a year. On the Route 7 climb over Snickers Gap and the Route 50 crossing at Ashby Gap, the gravel shoulders and the salt and abrasive spread on the grades do the rest. Full front PPF in STEK DYNOshield covers the hood, bumper, both fenders, mirrors, headlights, and A-pillars in a single self-healing layer, and that is the package for most Winchester commuters and the new cars coming off the Valley Avenue and Route 11 dealership strip. Trucks that work the orchards and farm roads in Frederick and Clarke counties take Full Front Extended for the rockers and door edges. The film carries a 12-year manufacturer warranty, and because the drive is an hour, we pair PPF with a coating in one visit.",
      faqs: [
        { q: "I commute I-81 to I-66 into Fairfax from Winchester. Which PPF package makes sense?", a: "Full front. That commute is almost entirely highway behind trucks, so the damage lands on the hood, bumper, fenders, and headlights, and full front covers all of them with no film line across the hood. If the car also sees farm roads or gravel on weekends, Full Front Extended adds the rockers and door edges." },
        { q: "Is an hour's drive from Winchester worth it for PPF?", a: "Our Winchester customers plan it as a day in Northern Virginia: drop off at 9 AM, head to the Dulles or Tysons area, and pick up a car with STEK-certified full front film and a 12-year warranty that afternoon. Most add a ceramic coating to the same visit so the trip happens once." },
      ],
    },
    ceramic: {
      heading: "Ceramic coating for the Shenandoah Valley's dust, cinders, and sun",
      body: "The Valley is dusty in summer and gritty in winter. Orchard and farm traffic on Route 11 and Route 522 raises a lime dust that settles on everything parked outside in Stephens City or along the Valley Pike, and the cinders and brine on I-81 and the Blue Ridge grades leave a gray film that bonds to bare paint. Most Winchester cars park on open driveways or in the surface lots at Shenandoah University and Winchester Medical Center, with summer sun on the roof all day. A Gtechniq coating gives the paint a slick, hard surface so dust and road film rinse off, water beads before it spots, and the clear coat stops taking the UV. Paint correction comes first, which polishes out the swirls from years of winter washes. Long-term owners pick the 7-year Crystal Serum Ultra; the 5-year Crystal Serum Light suits a commuter you will trade in sooner.",
      faqs: [
        { q: "My car sits in the open lot at the hospital all day and on the driveway at night. Will a coating hold up to Winchester winters?", a: "Yes. The coating is a cured, glass-like layer rather than a wax, so freeze-thaw cycles, brine from I-81, and a winter of cinders do not strip it. It keeps that grit from bonding to the paint so a rinse at a touchless wash removes it, and it holds the gloss through the summer sun as well." },
        { q: "Can I get PPF and a coating in one trip from Winchester?", a: "Yes, and that is how nearly every Winchester customer does it. Plan on two days: full front PPF the first day, paint correction and coating the second, with an indoor cure overnight. Two round trips over Route 7, or one if you stay in the area, and the car comes home finished." },
      ],
    },
    tint: {
      heading: "Window tint for Winchester drivers on I-81 and Route 7",
      body: "Winchester is about an hour from our bay, so GeoShield Pro Nano Ceramic tint is something we fit for Shenandoah Valley customers who are already in for PPF or a coating. It blocks 99% of UV, rejects up to 83% of solar heat, and is covered by GeoShield's nationwide lifetime warranty. For sedans registered in Virginia the limits are 50% on the front doors and 35% on the rear sides and back glass; trucks, SUVs, and vans may go darker behind the front doors. Windshield film is allowed above the AS-1 line only, and medical exemptions exist.",
      faqs: [
        { q: "How dark can my Winchester sedan legally be tinted in Virginia?", a: "A sedan registered in Virginia may have 50% VLT on the front door windows and 35% on the rear sides and back glass. An SUV, truck, or van keeps the 50% front limit and may go darker behind the front doors. A windshield strip above the AS-1 line is allowed, and medical exemptions exist." },
        { q: "Can tint be added to my PPF appointment from Winchester?", a: "Yes. Tint takes two to three hours and runs alongside a PPF or coating install, so the hour's drive from Winchester happens once. Keep the windows up for a few days while the film cures; a little haze in that time is normal and clears on its own." },
      ],
    },
  },
};

export const cityServiceNote = (city: string, service: ServiceKey): CityServiceNote | undefined => CITY_SERVICE_NOTES[city]?.[service];
