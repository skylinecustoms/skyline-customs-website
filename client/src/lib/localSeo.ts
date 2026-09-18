/**
 * SKYLINE CUSTOMS — Local SEO data
 *
 * Single source of truth for the city × service landing pages
 * (/ppf-reston-va, /ceramic-coating-ashburn-va, ...). Each page is rendered by
 * <LocalServicePage city="..." service="..." /> from this data, so every city
 * gets service-correct FAQs, features, and copy, and adding a city is one entry.
 */

export type ServiceKey = "ppf" | "ceramic" | "tint";

export interface City {
  /** Display name, e.g. "Falls Church" */
  name: string;
  /** URL slug suffix, e.g. "falls-church-va" */
  slug: string;
  /** Sentence describing distance from the shop, used in the "Do you serve" FAQ. */
  driveSentence: string;
  /** Short phrase for the hero, e.g. "just 15 minutes from Reston via the Dulles Toll Road" */
  heroDrive: string;
  /** Local roads phrase used in questions, e.g. "the Dulles Toll Road and Route 7" */
  roads: string;
  /** Title of the local-roads feature card */
  roadsTitle: string;
  /** Service-neutral hazard sentence about the local roads (no service claims). */
  roadsDesc: string;
  /** Neighborhoods / towns shown as chips in the service-area section */
  nearby: string[];
  /** One-line description on the /service-areas hub */
  hubDescription: string;
  /** Neighboring cities (must be keys of CITIES) for the cross-link block */
  neighbors: string[];
  /** True for the shop's own city; changes a few phrasings */
  isHome?: boolean;
  /** Unique 90–130 word paragraph about driving and car ownership in this city (service-neutral). */
  localIntro: string;
}

export const SHOP_ADDRESS = "4215 Walney Rd Suite 1A & B, Chantilly, VA 20151";

export const CITIES: Record<string, City> = {
  Chantilly: {
    name: "Chantilly", slug: "chantilly-va", isHome: true,
    driveSentence: "We are located at 4215 Walney Rd Suite 1A & B, Chantilly, VA 20151 — just off Route 28, minutes from Dulles Airport and easily accessible from I-66, I-495, and the Dulles Toll Road. Free parking on site.",
    heroDrive: "located right here at 4215 Walney Rd Suite 1A & B",
    roads: "Route 28, I-66, and the Dulles Toll Road",
    roadsTitle: "Route 28 & I-66 Defense",
    roadsDesc: "Chantilly sits at the intersection of Route 28, I-66, and the Dulles Toll Road — some of the highest-traffic roads in Northern Virginia, with constant gravel, construction debris, and highway chips.",
    nearby: ["Chantilly", "Dulles", "Centreville", "Herndon", "Reston", "Fairfax", "Sterling", "Ashburn"],
    hubDescription: "Our home base — serving the Chantilly and Dulles corridor.",
    neighbors: ["Centreville", "Herndon", "Sterling", "Reston", "Fairfax"],
    localIntro: "Chantilly is home base, and it shows in the cars that roll into the bay: daily drivers from the Route 28 tech corridor, weekend cars from Pleasant Valley and Poplar Tree, and plenty of new deliveries from the dealerships along Route 50. The commute here is defined by Route 28 construction traffic, Dulles Airport freight, and the I-66 merge at Centreville, all of which throw gravel and grit at a front bumper every single day. Because we're minutes from Fair Lakes, Greenbriar, and the Dulles Expo Center, most Chantilly customers drop off on the way to work and pick up the same afternoon.",
  },
  Centreville: {
    name: "Centreville", slug: "centreville-va",
    driveSentence: "Centreville is just 10 minutes away via Route 28 or I-66.",
    heroDrive: "just 10 minutes from Centreville via Route 28",
    roads: "I-66 and Route 28",
    roadsTitle: "I-66 Rock Chip Defense",
    roadsDesc: "I-66 and Route 28 near Centreville are notorious for construction debris and gravel trucks.",
    nearby: ["Centreville", "Chantilly", "Manassas", "Fairfax", "Herndon", "Reston", "Ashburn", "Sterling", "Gainesville", "Bristow"],
    hubDescription: "Serving Centreville and the Route 28 / I-66 corridor.",
    neighbors: ["Chantilly", "Fairfax", "Manassas", "Gainesville", "Vienna"],
    localIntro: "Centreville drivers put on serious highway miles. Most commutes funnel onto I-66 at Route 28 or Route 29, where the express-lane work zones and dump-truck traffic heading to the quarries have been chewing up paint for years. We see a lot of family SUVs from Little Rocky Run and Sully Station, commuter sedans parked at the Stone Road lots, and enthusiast cars that gather at the Centreville Cars and Coffee meets. The shop is ten minutes up Route 28, so a Centreville drop-off is easy before a day at Fair Oaks or a flight out of Dulles.",
  },
  Herndon: {
    name: "Herndon", slug: "herndon-va",
    driveSentence: "Herndon is just 10–15 minutes away via Route 28 or the Dulles Toll Road.",
    heroDrive: "just 10–15 minutes from Herndon",
    roads: "the Dulles Toll Road and Route 28",
    roadsTitle: "Dulles Corridor Defense",
    roadsDesc: "The Dulles Toll Road and Route 28 near Herndon are high-debris corridors with constant airport and freight traffic.",
    nearby: ["Herndon", "Reston", "Dulles", "Sterling", "Ashburn", "Chantilly", "Centreville", "Fairfax", "Vienna", "McLean"],
    hubDescription: "Serving Herndon and the Dulles Tech Corridor.",
    neighbors: ["Chantilly", "Reston", "Sterling", "Vienna", "McLean"],
    localIntro: "Herndon sits right on the Dulles Toll Road and Route 28, two of the fastest and dustiest commuter routes in Fairfax County. Cars from downtown Herndon, Worldgate, and the Monroe Street corridor pick up chips from airport freight and the constant construction along the Silver Line. We work on a lot of tech-corridor lease returns, where keeping the factory paint clean at turn-in matters, and on weekend cars stored in Herndon garages that only see sun on Saturday. From the Herndon Metro it's a straight shot down Route 28 to our bay.",
  },
  Fairfax: {
    name: "Fairfax", slug: "fairfax-va",
    driveSentence: "Fairfax is about 15 minutes away via I-66 or Route 50.",
    heroDrive: "just 15 minutes from Fairfax via I-66",
    roads: "I-66 and Route 50",
    roadsTitle: "I-66 Rock Chip Defense",
    roadsDesc: "I-66 and Route 50 near Fairfax are high-traffic corridors with heavy trucks and ongoing construction.",
    nearby: ["Fairfax", "Chantilly", "Centreville", "Herndon", "Vienna", "Reston", "McLean", "Tysons", "Annandale", "Springfield"],
    hubDescription: "Serving Fairfax City, Fair Oaks, and Fair Lakes.",
    neighbors: ["Centreville", "Vienna", "Oakton", "Burke", "Springfield", "Chantilly"],
    localIntro: "Fairfax City and the surrounding county are where Route 50, Route 123, and I-66 all meet, which means stop-and-go traffic mixed with 65-mph stretches within a single commute. We see everything from Mason students' first cars to Fair Oaks and Fairfax Corner shoppers' SUVs and the enthusiast crowd that meets around Fairfax Circle. Winter road treatment on the Fairfax County Parkway and summer pollen from the tree-lined neighborhoods near Burke Lake are the two seasonal enemies of paint here, and both are easier to fight with a coated, protected finish.",
  },
  Vienna: {
    name: "Vienna", slug: "vienna-va",
    driveSentence: "Vienna is about 15 minutes away via Route 123 or I-66.",
    heroDrive: "just 15 minutes from Vienna via Route 123",
    roads: "Route 123 and I-66",
    roadsTitle: "Route 123 Rock Chip Defense",
    roadsDesc: "Route 123 and I-66 near Vienna see heavy commuter traffic and frequent road work.",
    nearby: ["Vienna", "Chantilly", "Fairfax", "Herndon", "Reston", "McLean", "Tysons", "Centreville", "Oakton", "Merrifield"],
    hubDescription: "Serving Vienna and the Maple Avenue corridor.",
    neighbors: ["Fairfax", "Tysons", "McLean", "Oakton", "Herndon"],
    localIntro: "Vienna is a town of tree-lined streets and tight garages, where cars pick up sap, pollen, and bird droppings under the oaks along Maple Avenue and then take a beating on Route 123 and I-66 on the way to work. Vienna Metro commuters park outside all day in the garage lots, and the W&OD trail crowd hauls bikes on racks that scuff rear bumpers and hatches. A lot of our Vienna customers are protecting a new car bought at one of the dealerships on Maple Avenue, usually within the first week of ownership.",
  },
  Reston: {
    name: "Reston", slug: "reston-va",
    driveSentence: "Reston is about 15 minutes away via the Dulles Toll Road (Route 267).",
    heroDrive: "just 15 minutes from Reston via the Dulles Toll Road",
    roads: "the Dulles Toll Road and Route 7",
    roadsTitle: "Dulles Toll Road Defense",
    roadsDesc: "The Dulles Toll Road and Route 7 near Reston see heavy truck traffic and frequent construction.",
    nearby: ["Reston", "Chantilly", "Herndon", "Fairfax", "Vienna", "Sterling", "Ashburn", "Dulles", "Centreville", "McLean"],
    hubDescription: "Serving Reston and the Reston Town Center area.",
    neighbors: ["Herndon", "McLean", "Tysons", "Sterling", "Chantilly"],
    localIntro: "Reston drivers split their time between Reston Town Center's parking garages, the Wiehle-Reston Metro lot, and the Dulles Toll Road, which carries airport traffic, construction crews, and plenty of loose stone. Route 7 on the north side adds high-speed commuting toward Tysons and Leesburg. We see well-kept sedans and EVs from Lake Anne and South Lakes, plus a steady stream of Teslas charged at the Town Center Superchargers. With the Toll Road running straight to Route 28, Reston is one of the quickest drop-offs we have.",
  },
  McLean: {
    name: "McLean", slug: "mclean-va",
    driveSentence: "McLean is about 20 minutes from our Chantilly shop via I-66 or the Beltway (I-495).",
    heroDrive: "just 20 minutes from McLean via I-66 or the Beltway",
    roads: "I-495 and Route 123",
    roadsTitle: "Beltway & Route 123 Defense",
    roadsDesc: "The I-495 Capital Beltway and Route 123 near McLean see some of the heaviest commuter traffic in the region.",
    nearby: ["McLean", "Tysons", "Vienna", "Great Falls", "Langley", "Falls Church", "Arlington", "Reston", "Chantilly"],
    hubDescription: "Serving McLean and the Great Falls corridor.",
    neighbors: ["Tysons", "Vienna", "Reston", "Arlington"],
    localIntro: "McLean garages hold some of the nicest cars in Northern Virginia, and those cars still have to commute on I-495, Route 123, and the George Washington Parkway, where gravel from the Beltway express-lane projects and debris from Chain Bridge Road find every unprotected panel. Many McLean customers are protecting a new luxury purchase from the Tysons dealerships or preserving a low-mile weekend car. Between Langley, Great Falls, and the Potomac hills, we also see plenty of tree sap and pollen damage that a coating keeps from etching.",
  },
  Tysons: {
    name: "Tysons", slug: "tysons-va",
    driveSentence: "Tysons is about 20 minutes from our Chantilly shop via Route 7 or I-495.",
    heroDrive: "just 20 minutes from Tysons via Route 7",
    roads: "Route 7 and I-495",
    roadsTitle: "Route 7 & Beltway Defense",
    roadsDesc: "Route 7 and I-495 near Tysons Corner carry some of the heaviest traffic in Northern Virginia.",
    nearby: ["Tysons", "Tysons Corner", "McLean", "Vienna", "Falls Church", "Merrifield", "Dunn Loring", "Reston", "Chantilly"],
    hubDescription: "Serving Tysons Corner and the Beltway corridor.",
    neighbors: ["McLean", "Vienna", "Reston", "Falls Church"],
    localIntro: "Tysons is the busiest square mile in Virginia: Route 7, Route 123, the Beltway, and the Toll Road all converge there, and the Silver Line construction plus never-ending tower cranes keep the roads gritty. Cars from the Tysons high-rises spend their lives in shared garages, where door dings and scuffs are a daily risk, and their commutes involve some of the highest-speed merges in the region. Buyers coming off the Tysons dealership row often bring the car to us before it ever sees a highway mile.",
  },
  Alexandria: {
    name: "Alexandria", slug: "alexandria-va",
    driveSentence: "Alexandria is about 25 minutes from our Chantilly shop via I-66 or Route 50.",
    heroDrive: "just 25 minutes from Alexandria via I-66 or Route 50",
    roads: "I-395 and the GW Parkway",
    roadsTitle: "I-395 & GW Parkway Defense",
    roadsDesc: "I-395 and the GW Parkway near Alexandria see heavy commuter traffic and road debris.",
    nearby: ["Alexandria", "Chantilly", "Fairfax", "McLean", "Arlington", "Springfield", "Annandale", "Burke", "Lorton"],
    hubDescription: "Serving Alexandria and the Old Town / Kingstowne area.",
    neighbors: ["Arlington", "Springfield", "Falls Church", "Burke"],
    localIntro: "Alexandria driving means the George Washington Parkway, I-395, and Route 1, with tight Old Town parking on brick and cobblestone and long stretches of stop-and-go past the Pentagon. Salt spray and grit from the parkway in winter, then bugs and sun on Route 1 in summer, wear on paint fast. We serve Old Town, Del Ray, Kingstowne, and the West End, and many Alexandria customers pair a front-end film with a coating specifically because street parking makes hand washing hard to keep up with.",
  },
  Arlington: {
    name: "Arlington", slug: "arlington-va",
    driveSentence: "Arlington is about 25 minutes from our Chantilly shop via I-66 or Route 50.",
    heroDrive: "just 25 minutes from Arlington via I-66",
    roads: "I-66 and the GW Parkway",
    roadsTitle: "I-66 & GW Parkway Defense",
    roadsDesc: "I-66 and the GW Parkway near Arlington see heavy commuter traffic and road debris.",
    nearby: ["Arlington", "Alexandria", "McLean", "Falls Church", "Rosslyn", "Ballston", "Clarendon", "Pentagon City", "Crystal City"],
    hubDescription: "Serving Arlington and the Rosslyn–Ballston corridor.",
    neighbors: ["Alexandria", "McLean", "Falls Church", "Tysons"],
    localIntro: "Arlington cars live outdoors and in tight garages: Rosslyn and Ballston high-rises, Clarendon street parking, and the daily grind on I-66, Route 50, and the GW Parkway. Bumper scuffs from parallel parking, sap from the Custis Trail trees, and sandblasting from I-66 construction are the usual damage we repair or prevent. A lot of Arlington customers commute past the Pentagon and Crystal City and want a car that stays presentable without a weekly wash, which is exactly where a coating over film earns its keep.",
  },
  "Falls Church": {
    name: "Falls Church", slug: "falls-church-va",
    driveSentence: "Falls Church is about 20 minutes from our Chantilly location via I-66 or Route 7.",
    heroDrive: "just 20 minutes from Falls Church via I-66 or Route 7",
    roads: "Route 7 and I-66",
    roadsTitle: "Route 7 & I-66 Defense",
    roadsDesc: "The Route 7 and I-66 corridor near Falls Church carries heavy commuter and truck traffic with frequent construction debris.",
    nearby: ["Falls Church", "Arlington", "McLean", "Vienna", "Seven Corners", "Merrifield", "Annandale", "Tysons", "Fairfax"],
    hubDescription: "Serving Falls Church and the Route 7 / I-66 corridor.",
    neighbors: ["Arlington", "Alexandria", "Tysons", "Vienna"],
    localIntro: "Falls Church sits where Route 7, Route 50, and I-66 collide at Seven Corners, one of the most congested interchanges in the region, and where Route 29 carries a steady mix of trucks and commuters. The city's old trees are beautiful and brutal on paint, dropping sap and pollen on cars parked along the side streets near Broad Street and the East Falls Church Metro. We see a lot of family vehicles from Lake Barcroft and Sleepy Hollow, and plenty of new purchases from the dealerships on Route 7.",
  },
  Springfield: {
    name: "Springfield", slug: "springfield-va",
    driveSentence: "Springfield is about 25 minutes from our Chantilly location via I-66 or the Fairfax County Parkway.",
    heroDrive: "just 25 minutes from Springfield via the Fairfax County Parkway",
    roads: "the Springfield Interchange",
    roadsTitle: "I-95 & I-395 Defense",
    roadsDesc: "The Springfield Interchange is one of the busiest in Northern Virginia, with heavy truck traffic and construction debris on I-95, I-395, and I-495.",
    nearby: ["Springfield", "Burke", "Fairfax", "Annandale", "Alexandria", "Lorton", "Newington", "Fort Belvoir", "Kingstowne"],
    hubDescription: "Serving Springfield and the I-95 / I-395 / I-495 interchange.",
    neighbors: ["Burke", "Alexandria", "Fairfax", "Woodbridge", "Manassas"],
    localIntro: "Springfield drivers deal with the Mixing Bowl every day, where I-95, I-395, and I-495 interchange and freight traffic never stops. The express lanes, the constant construction, and the truck volume make Springfield one of the highest rock-chip areas we serve. We work on commuter sedans from West Springfield and Kingstowne, family SUVs from Springfield Town Center trips, and military and government vehicles from the Fort Belvoir side. The Fairfax County Parkway runs straight from Springfield to our door in Chantilly.",
  },
  Manassas: {
    name: "Manassas", slug: "manassas-va",
    driveSentence: "Manassas is about 20 minutes from our Chantilly location via I-66 or Route 28.",
    heroDrive: "just 20 minutes from Manassas via I-66 or Route 28",
    roads: "I-66 and Route 28",
    roadsTitle: "I-66 & Route 28 Defense",
    roadsDesc: "The I-66 and Route 28 corridor near Manassas carries heavy truck and construction traffic.",
    nearby: ["Manassas", "Manassas Park", "Gainesville", "Bristow", "Haymarket", "Centreville", "Chantilly", "Nokesville", "Dumfries"],
    hubDescription: "Serving Manassas and Prince William County via I-66 and Route 28.",
    neighbors: ["Centreville", "Gainesville", "Springfield", "Woodbridge", "Fairfax"],
    localIntro: "Manassas is I-66 and Route 28 country: long high-speed commutes into Fairfax and Arlington, freight heading to the Manassas Regional Airport industrial parks, and construction traffic that leaves gravel on every on-ramp. We see plenty of trucks and Jeeps from the Prince William Parkway side, commuter cars from the Manassas VRE lot, and weekend builds from the Old Town Manassas car-show crowd. Because the Route 28 corridor connects Manassas directly to Chantilly, a drop-off takes about twenty minutes.",
  },
  Woodbridge: {
    name: "Woodbridge", slug: "woodbridge-va",
    driveSentence: "Woodbridge is about 30 minutes from our Chantilly location via I-95 or the Prince William Parkway.",
    heroDrive: "just 30 minutes from Woodbridge via I-95 or the Prince William Parkway",
    roads: "I-95 and the Prince William Parkway",
    roadsTitle: "I-95 Rock Chip Defense",
    roadsDesc: "I-95 near Woodbridge carries some of the heaviest truck traffic in Virginia.",
    nearby: ["Woodbridge", "Dale City", "Lake Ridge", "Occoquan", "Lorton", "Dumfries", "Montclair", "Manassas", "Stafford"],
    hubDescription: "Serving Woodbridge, Dale City, and the I-95 South corridor.",
    neighbors: ["Springfield", "Manassas", "Stafford", "Alexandria"],
    localIntro: "Woodbridge is defined by I-95 and the Prince William Parkway: heavy truck traffic, express-lane construction, and long commutes to the Pentagon and DC that add up to tens of thousands of highway miles a year. Salt and brine treatment on I-95 in winter is aggressive, and the Potomac Mills and Route 1 stop-and-go adds bumper scuffs and bug damage. We serve Lake Ridge, Dale City, Occoquan, and Montclair, and Woodbridge customers often choose full-front film plus a coating precisely because their mileage is so high.",
  },
  Stafford: {
    name: "Stafford", slug: "stafford-va",
    driveSentence: "Stafford is about 35–40 minutes from our Chantilly location via I-95 South.",
    heroDrive: "serving Stafford and the Quantico military corridor",
    roads: "I-95",
    roadsTitle: "I-95 Rock Chip Defense",
    roadsDesc: "I-95 through Stafford County is one of the busiest freight corridors on the East Coast.",
    nearby: ["Stafford", "Quantico", "Aquia Harbour", "Garrisonville", "Brooke", "Fredericksburg", "Woodbridge", "Dumfries", "Triangle"],
    hubDescription: "Serving Stafford and the Quantico military corridor.",
    neighbors: ["Woodbridge", "Fredericksburg", "Manassas", "Springfield"],
    localIntro: "Stafford drivers commute farther than almost anyone in Northern Virginia, mostly on I-95 through the Quantico stretch, where freight traffic and express-lane work keep the pavement littered with debris. Many customers are military families from Quantico and Aquia Harbour who move often and want to protect a vehicle's resale value, plus long-haul commuters from Garrisonville and Brooke. The drive to our shop runs up I-95 and around the Beltway to Route 28, and Stafford owners usually plan the visit around a day in the Dulles area.",
  },
  Fredericksburg: {
    name: "Fredericksburg", slug: "fredericksburg-va",
    driveSentence: "Fredericksburg is about 45–50 minutes from our Chantilly location via I-95 North.",
    heroDrive: "serving Fredericksburg and the surrounding Rappahannock region",
    roads: "I-95",
    roadsTitle: "I-95 Rock Chip Defense",
    roadsDesc: "The I-95 corridor through Fredericksburg is one of the most heavily traveled freight routes on the East Coast.",
    nearby: ["Fredericksburg", "Spotsylvania", "Stafford", "Culpeper", "King George", "Locust Grove", "Massaponax", "Falmouth", "Quantico"],
    hubDescription: "Serving Fredericksburg and the Rappahannock region.",
    neighbors: ["Stafford", "Woodbridge", "Manassas", "Springfield"],
    localIntro: "Fredericksburg sits at the far end of the I-95 corridor, where the freight volume, the Rappahannock River crossings, and the Route 3 and Central Park shopping traffic combine into a hard life for paint. Commuters on the VRE and I-95 express lanes rack up more miles than nearly anyone else we serve, and Spotsylvania and Stafford County roads add gravel and mud in the wet months. Fredericksburg customers usually book a full day, and many pair the trip with a stop in the Dulles or Tysons area.",
  },
  // ---- Added September 2026 ----
  Ashburn: {
    name: "Ashburn", slug: "ashburn-va",
    driveSentence: "Ashburn is about 20 minutes away via Route 28 and the Dulles Greenway.",
    heroDrive: "just 20 minutes from Ashburn via Route 28",
    roads: "Route 7, the Dulles Greenway, and Loudoun County Parkway",
    roadsTitle: "Loudoun Corridor Defense",
    roadsDesc: "Route 7, the Dulles Greenway, and Loudoun County Parkway near Ashburn are lined with active construction and data-center truck traffic.",
    nearby: ["Ashburn", "Broadlands", "Brambleton", "One Loudoun", "Sterling", "Leesburg", "Herndon", "Dulles", "Chantilly"],
    hubDescription: "Serving Ashburn, Brambleton, and the Loudoun tech corridor.",
    neighbors: ["Sterling", "Leesburg", "Herndon", "Chantilly"],
    localIntro: "Ashburn has grown faster than its roads, so Loudoun County Parkway, the Dulles Greenway, and Route 7 are lined with active construction and the constant truck traffic that feeds the data-center corridor. New homes in Brambleton, Broadlands, and Ashburn Farm mean a lot of brand-new cars from the Dulles and Sterling dealerships, and One Loudoun's garages see plenty of enthusiast metal on weekends. Route 28 runs straight from Ashburn to our bay, which makes same-day drop-off and pickup easy.",
  },
  Sterling: {
    name: "Sterling", slug: "sterling-va",
    driveSentence: "Sterling is about 10 minutes away via Route 28.",
    heroDrive: "just 10 minutes from Sterling via Route 28",
    roads: "Route 28 and Route 7",
    roadsTitle: "Route 28 Defense",
    roadsDesc: "Route 28 and Route 7 near Sterling carry constant airport, freight, and construction traffic.",
    nearby: ["Sterling", "Dulles", "Cascades", "Potomac Falls", "Herndon", "Ashburn", "Chantilly", "Reston", "Great Falls"],
    hubDescription: "Serving Sterling, Cascades, and the Dulles Airport corridor.",
    neighbors: ["Herndon", "Ashburn", "Chantilly", "Reston", "Leesburg"],
    localIntro: "Sterling drivers live on Route 28 and Route 7, with Dulles Airport freight, Route 28 widening projects, and Cascades and Dulles Town Center traffic all throwing grit at the front of the car. It's a big commuter town, with Potomac Falls and Sugarland Run residents heading to Tysons and Reston every morning on roads that never seem finished. Sterling is our closest Loudoun neighbor, ten minutes down Route 28, so it's common for customers to drop off before a shift at the airport and pick up after.",
  },
  Leesburg: {
    name: "Leesburg", slug: "leesburg-va",
    driveSentence: "Leesburg is about 30 minutes away via Route 7 or the Dulles Greenway.",
    heroDrive: "just 30 minutes from Leesburg via Route 7 or the Dulles Greenway",
    roads: "Route 7, Route 15, and the Dulles Greenway",
    roadsTitle: "Route 7 & Greenway Defense",
    roadsDesc: "Route 7, Route 15, and the Dulles Greenway around Leesburg mix high-speed commuting with gravel and farm truck traffic.",
    nearby: ["Leesburg", "Lansdowne", "Purcellville", "Hamilton", "Ashburn", "Sterling", "Lucketts", "Round Hill", "Chantilly"],
    hubDescription: "Serving Leesburg, Lansdowne, and western Loudoun County.",
    neighbors: ["Ashburn", "Sterling", "Herndon", "Chantilly"],
    localIntro: "Leesburg blends a historic downtown with the fast, rural-edge driving of Route 7, Route 15, and the Dulles Greenway, where farm equipment, gravel shoulders, and high-speed commuting mix. Cars from Lansdowne, River Creek, and the older streets around King Street pick up chips on the way to Tysons and tree sap at home. We see a lot of trucks and SUVs headed out to western Loudoun on weekends, and plenty of enthusiast cars that gather for the area's car shows, all of which benefit from protected front ends and a coating that shrugs off dust.",
  },
  Gainesville: {
    name: "Gainesville", slug: "gainesville-va",
    driveSentence: "Gainesville is about 20 minutes away via I-66 West.",
    heroDrive: "just 20 minutes from Gainesville via I-66",
    roads: "I-66, Route 29, and Linton Hall Road",
    roadsTitle: "I-66 West Defense",
    roadsDesc: "I-66, Route 29, and Linton Hall Road near Gainesville see heavy commuter traffic and years of ongoing interchange construction.",
    nearby: ["Gainesville", "Haymarket", "Bristow", "Manassas", "Nokesville", "Warrenton", "Centreville", "Chantilly", "Linton Hall"],
    hubDescription: "Serving Gainesville, Haymarket, and western Prince William County.",
    neighbors: ["Manassas", "Centreville", "Chantilly", "Fairfax"],
    localIntro: "Gainesville and Haymarket are where I-66 opens up and speeds climb, right as the years-long interchange construction at Route 29 and Linton Hall Road keeps the pavement covered in debris. Virginia Gateway shopping traffic and the Jiffy Lube Live event crowds add stop-and-go wear. Many customers commute from Heritage Hunt, Piedmont, and Bristow into Fairfax and Arlington, and trucks and SUVs are common given the rural roads west of town. I-66 east runs directly to Route 28 and our Chantilly bay.",
  },
  Burke: {
    name: "Burke", slug: "burke-va",
    driveSentence: "Burke is about 20 minutes away via the Fairfax County Parkway.",
    heroDrive: "just 20 minutes from Burke via the Fairfax County Parkway",
    roads: "the Fairfax County Parkway, Burke Centre Parkway, and Braddock Road",
    roadsTitle: "Parkway Rock Chip Defense",
    roadsDesc: "The Fairfax County Parkway, Burke Centre Parkway, and Braddock Road near Burke are busy commuter routes with regular construction and gravel.",
    nearby: ["Burke", "Burke Centre", "Springfield", "Fairfax Station", "Lorton", "Fairfax", "Annandale", "Clifton", "Chantilly"],
    hubDescription: "Serving Burke, Burke Centre, and Fairfax Station.",
    neighbors: ["Springfield", "Fairfax", "Centreville", "Alexandria"],
    localIntro: "Burke is a commuter suburb built around the Fairfax County Parkway, Burke Centre Parkway, and Braddock Road, with the Burke Centre VRE station and Rolling Road carrying steady traffic toward Springfield and the Beltway. Mature trees over Burke's cul-de-sacs drop sap and pollen on cars that sit in driveways, and parkway construction adds the gravel. We see a lot of family SUVs from Burke Centre and Lake Braddock, plus new cars from the dealerships along Route 236 in Annandale, and the parkway makes Chantilly a straight twenty-minute drive.",
  },
  Oakton: {
    name: "Oakton", slug: "oakton-va",
    driveSentence: "Oakton is about 15 minutes away via I-66 or Route 123.",
    heroDrive: "just 15 minutes from Oakton via I-66",
    roads: "I-66, Route 123, and Hunter Mill Road",
    roadsTitle: "I-66 & Route 123 Defense",
    roadsDesc: "I-66, Route 123, and Hunter Mill Road near Oakton carry heavy commuter traffic and frequent road work.",
    nearby: ["Oakton", "Vienna", "Fairfax", "Fair Oaks", "Reston", "Tysons", "Chantilly", "Centreville", "Merrifield"],
    hubDescription: "Serving Oakton, Fair Oaks, and the I-66 / Route 123 corridor.",
    neighbors: ["Vienna", "Fairfax", "Reston", "Tysons"],
    localIntro: "Oakton drivers move between quiet, wooded neighborhoods off Hunter Mill Road and the high-speed grind of I-66 and Route 123 toward Vienna and Tysons. The Vienna and Dunn Loring Metro lots mean cars sit outside all day, and the tree canopy along Hunter Mill and Vale Road covers them in sap and pollen every spring. Oakton customers are often protecting a new car bought in Fairfax or Tysons, and with I-66 to Route 28 the drive to our bay is about fifteen minutes.",
  },
};

/** Cities in display order for hubs, footers, and link blocks. */
export const CITY_ORDER: string[] = [
  "Chantilly", "Centreville", "Herndon", "Sterling", "Ashburn", "Reston", "Fairfax", "Oakton", "Vienna", "McLean", "Tysons",
  "Falls Church", "Arlington", "Alexandria", "Burke", "Springfield", "Manassas", "Gainesville", "Leesburg", "Woodbridge",
  "Stafford", "Fredericksburg",
];

export interface ServiceContent {
  key: ServiceKey;
  /** "Paint Protection Film" */
  label: string;
  /** "PPF" — used in headings */
  short: string;
  /** URL prefix, e.g. "ppf" -> /ppf-reston-va */
  slugPrefix: string;
  /** Main service page */
  serviceHref: string;
  /** Value passed to /get-a-quote?service= */
  quoteParam: string;
  badges: string[];
  seoTitle: (city: string) => string;
  seoDescription: (city: string) => string;
  heroLabel: string;
  heroHeading: string; // e.g. "PPF NEAR"
  heroText: (c: City) => string;
  whyLabel: (city: string) => string;
  whyHeading: string;
  /** Sentence appended to the city road hazard, explaining how this service helps. */
  roadsBenefit: string;
  features: { title: string; desc: string }[];
  faqHeading: (city: string) => string;
  faqs: (c: City) => { q: string; a: string }[];
  testimonialsTitle: (city: string) => string;
  ctaHeading: string;
  ctaText: (c: City) => string;
}

const serveAnswer = (c: City, svc: string) =>
  c.isHome
    ? c.driveSentence
    : `Yes — we install ${svc} for ${c.name} drivers at our shop at ${SHOP_ADDRESS}. ${c.driveSentence}`;

const ctaDrive = (c: City) => (c.isHome ? "Right here in Chantilly." : `${c.heroDrive.charAt(0).toUpperCase()}${c.heroDrive.slice(1)}.`);

export const SERVICES: Record<ServiceKey, ServiceContent> = {
  ppf: {
    key: "ppf",
    label: "Paint Protection Film",
    short: "PPF",
    slugPrefix: "ppf",
    serviceHref: "/services/ppf",
    quoteParam: "ppf",
    badges: ["5.0 ★ Google Rating", "Free Quotes", "Lifetime Warranty", "STEK DYNOshield Film"],
    seoTitle: (city) => `PPF ${city} VA | Paint Protection Film Near Me`,
    seoDescription: (city) =>
      `Top-rated paint protection film installer serving ${city}, VA. Self-healing STEK PPF, rock chip protection, and full-front or full-body coverage. Free quotes. 5.0 stars on Google.`,
    heroLabel: "Paint Protection Film",
    heroHeading: "PPF NEAR",
    heroText: (c) => `Northern Virginia's top-rated PPF installer, ${c.heroDrive}. Protect your paint from rock chips and road debris with self-healing film.`,
    whyLabel: (city) => `Why PPF in ${city}`,
    whyHeading: "PROTECT YOUR PAINT ON NOVA ROADS",
    roadsBenefit: "PPF absorbs rock chips and road debris before they reach your paint.",
    features: [
      { title: "Self-Healing Film", desc: "Light scratches and swirl marks disappear on their own when the film warms up — keeping your car showroom-fresh." },
      { title: "12-Year Warranty", desc: "Our STEK DYNOshield film comes with a manufacturer-backed 12-year warranty against yellowing, cracking, and peeling." },
      { title: "Invisible Protection", desc: "High-clarity film is virtually undetectable — your car's color and finish look exactly the same, just protected." },
    ],
    faqHeading: (city) => `PPF QUESTIONS FROM ${city.toUpperCase()} DRIVERS`,
    faqs: (c) => [
      { q: `Do you serve ${c.name}, VA for PPF?`, a: serveAnswer(c, "paint protection film") },
      { q: `How much does PPF cost near ${c.name}?`, a: "PPF pricing depends on coverage level. Partial front packages start at $1,800 (bumper + partial hood). Full front coverage — including bumper, hood, fenders, mirrors, headlights, and A-pillars — is $2,400. Full vehicle wraps start at $4,500 for sedans. All prices subject to in-person inspection. Contact us for a free, no-obligation quote." },
      { q: `Is PPF worth it driving on ${c.roads} near ${c.name}?`, a: `Absolutely. ${c.roadsDesc} PPF is one of the best investments to protect your paint from rock chips and road debris and to preserve resale value.` },
      { q: "How long does PPF installation take?", a: "A partial front-end install typically takes one day. Full-vehicle coverage may take 2–3 days depending on vehicle complexity. We'll give you a firm timeline at your consultation." },
      { q: `Do you offer PPF for Tesla, BMW, and luxury vehicles near ${c.name}?`, a: "Absolutely. We specialize in high-end and exotic vehicles. Our computer-cut patterns are precision-fit for every make and model, including Tesla, BMW, Mercedes, Porsche, and more." },
      { q: "Does PPF self-heal?", a: "Yes — our premium STEK DYNOshield film features thermoplastic polyurethane that self-heals light scratches and swirl marks when exposed to heat, keeping your paint looking pristine for years." },
    ],
    testimonialsTitle: (city) => `WHAT ${city.toUpperCase()} DRIVERS SAY ABOUT OUR PPF`,
    ctaHeading: "PROTECT YOUR PAINT TODAY",
    ctaText: (c) => `Get a free PPF quote from Northern Virginia's top-rated installer. ${ctaDrive(c)}`,
  },
  ceramic: {
    key: "ceramic",
    label: "Ceramic Coating",
    short: "Ceramic Coating",
    slugPrefix: "ceramic-coating",
    serviceHref: "/services/ceramic-coating",
    quoteParam: "ceramic",
    badges: ["5.0 ★ Google Rating", "Free Quotes", "Up to 7-Year Coatings", "Graphene & SiO2 Coatings"],
    seoTitle: (city) => `Ceramic Coating ${city} VA | Car Ceramic Coating Near Me`,
    seoDescription: (city) =>
      `Professional ceramic coating for ${city}, VA drivers. Gtechniq graphene and SiO2 coatings with paint correction, 5–7 year protection, and a hydrophobic finish. Free quotes. 5.0 stars on Google.`,
    heroLabel: "Ceramic Coating",
    heroHeading: "CERAMIC COATING NEAR",
    heroText: (c) => `Northern Virginia's top-rated ceramic coating installer, ${c.heroDrive}. Paint correction plus Gtechniq coatings for a deep gloss that lasts for years.`,
    whyLabel: (city) => `Why Ceramic Coating in ${city}`,
    whyHeading: "LASTING GLOSS FOR NOVA ROADS",
    roadsBenefit: "A ceramic coating keeps road grime, salt, tar, and bug residue from bonding to your clear coat so it rinses off instead of etching in.",
    features: [
      { title: "Hydrophobic Shine", desc: "Water beads and sheets off, pulling dirt with it — your car stays cleaner longer and washes in half the time." },
      { title: "Up to 7-Year Coatings", desc: "Gtechniq Crystal Serum Light and EXO deliver 5–7 years of UV, chemical, and swirl resistance with proper care." },
      { title: "Paint Correction First", desc: "Every coating starts with a decontamination wash and Stage 1–3 machine correction, so you lock in flawless paint, not swirls." },
    ],
    faqHeading: (city) => `CERAMIC COATING QUESTIONS FROM ${city.toUpperCase()} DRIVERS`,
    faqs: (c) => [
      { q: `Do you serve ${c.name}, VA for ceramic coating?`, a: serveAnswer(c, "ceramic coatings") },
      { q: `How much does ceramic coating cost near ${c.name}?`, a: "Ceramic coating starts at $800 for sedans (no correction, Gtechniq CSL + Exo, 7-year warranty). The Crystal Package (Stage 2 correction + 5-year coating) starts at $1,300. The Ultimate Coating (Stage 3 correction + 7-year coating) starts at $1,500. SUV and truck pricing is slightly higher. Contact us for a free, no-obligation quote." },
      { q: `Is ceramic coating worth it for ${c.name} drivers on ${c.roads}?`, a: `Yes. ${c.roadsDesc} Add winter road salt, spring pollen, and summer bug season, and unprotected clear coat dulls fast. A professional ceramic coating adds a hard, hydrophobic layer that resists chemical etching and UV fading and makes every wash easier.` },
      { q: "How long does a ceramic coating last?", a: "Our Gtechniq coatings are rated for 5–7 years depending on the package, with proper maintenance. That is years longer than a wax or sealant, which typically last a few months." },
      { q: "Does ceramic coating protect against rock chips?", a: "No — a ceramic coating resists chemicals, UV, and light swirls, but it is microns thick and will not stop impacts. For rock chip protection on the front end we recommend pairing your coating with paint protection film, which we also install." },
      { q: "How do I maintain a ceramic-coated car?", a: "Hand wash with a pH-neutral soap using the two-bucket method, avoid automatic brush car washes, and use a ceramic-safe detail spray between washes. We include care instructions with every coating and offer maintenance details." },
    ],
    testimonialsTitle: (city) => `WHAT ${city.toUpperCase()} DRIVERS SAY ABOUT OUR CERAMIC COATING`,
    ctaHeading: "LOCK IN THE SHINE",
    ctaText: (c) => `Get a free ceramic coating quote from Northern Virginia's top-rated installer. ${ctaDrive(c)}`,
  },
  tint: {
    key: "tint",
    label: "Window Tinting",
    short: "Window Tinting",
    slugPrefix: "window-tinting",
    serviceHref: "/services/window-tinting",
    quoteParam: "tint",
    badges: ["5.0 ★ Google Rating", "Free Quotes", "Lifetime Warranty", "Ceramic Film Available"],
    seoTitle: (city) => `Window Tinting ${city} VA | Car Tint Near Me`,
    seoDescription: (city) =>
      `Ceramic window tinting near ${city}, VA. GeoShield Pro Nano Ceramic film with 99% UV and up to 83% heat rejection, Virginia-legal shades, and a nationwide lifetime warranty. Free quotes.`,
    heroLabel: "Window Tinting",
    heroHeading: "WINDOW TINT NEAR",
    heroText: (c) => `Northern Virginia's top-rated window tinting shop, ${c.heroDrive}. Ceramic film that blocks heat and UV without the signal interference of metallic tint.`,
    whyLabel: (city) => `Why Tint in ${city}`,
    whyHeading: "BEAT THE NOVA HEAT AND GLARE",
    roadsBenefit: "Ceramic window film cuts glare and cabin heat on long stop-and-go commutes and blocks 99% of UV for you and your interior.",
    features: [
      { title: "99% UV Rejection", desc: "Blocks the UV rays that fade dashboards, crack leather, and damage skin — on every window we tint." },
      { title: "Up to 83% Heat Rejection", desc: "GeoShield Pro Nano Ceramic rejects 80–83% of infrared heat so your car cools faster and the AC works less." },
      { title: "Nationwide Lifetime Warranty", desc: "Every package is covered against bubbling, peeling, fading, and purpling for as long as you own the car." },
    ],
    faqHeading: (city) => `TINTING QUESTIONS FROM ${city.toUpperCase()} DRIVERS`,
    faqs: (c) => [
      { q: `Do you serve ${c.name}, VA for window tinting?`, a: serveAnswer(c, "window tint") },
      { q: `How much does window tinting cost near ${c.name}?`, a: "GeoShield Pro Nano Ceramic tint packages start at $280 (4 side windows), $350 (front 2 windows), $425 (rear package — most popular), or $575 for full car (all windows including windshield). Windshield-only is $200. All packages include a Nationwide Lifetime Warranty. Contact us for a free, no-obligation quote." },
      { q: "What is the legal tint limit in Virginia?", a: "For sedans, Virginia allows 50% VLT on the front side windows and 35% on the rear side and back windows. SUVs, trucks, and vans may go darker behind the front doors. Windshields may only have a non-reflective strip above the AS-1 line. We only install Virginia-legal tint and can help with medical exemption paperwork." },
      { q: "Does ceramic tint interfere with phone, GPS, or radio signals?", a: "No. GeoShield Pro Nano Ceramic is metal-free, so it blocks heat and UV without affecting cell, GPS, satellite radio, or toll transponder signals the way older metallic films can." },
      { q: `How long does tinting take, and when can I roll the windows down?`, a: `Most cars take 2–3 hours at our Chantilly shop. Keep the windows up for 3–5 days while the film cures; you may see slight haze or small water pockets that clear on their own during that time.` },
      { q: "What warranty comes with the tint?", a: "Every GeoShield package carries a nationwide lifetime warranty against bubbling, peeling, cracking, fading, and purpling, honored by GeoShield dealers across the country." },
    ],
    testimonialsTitle: (city) => `WHAT ${city.toUpperCase()} DRIVERS SAY ABOUT OUR TINTING`,
    ctaHeading: "TINT IT RIGHT THE FIRST TIME",
    ctaText: (c) => `Get a free window tinting quote from Northern Virginia's top-rated installer. ${ctaDrive(c)}`,
  },
};

export const cityPath = (service: ServiceKey, cityName: string) => `/${SERVICES[service].slugPrefix}-${CITIES[cityName].slug}`;
