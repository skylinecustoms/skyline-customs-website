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
  /** Two-letter state; drives the ", VA" labels and the tint-law copy. */
  state: "VA" | "MD" | "DC";
  /** Services with a page for this city. Omitted = all three. Far cities skip tint. */
  services?: ServiceKey[];
  /** Unique 90–130 word paragraph about driving and car ownership in this city (service-neutral). */
  localIntro: string;
}

export const SHOP_ADDRESS = "4215 Walney Rd Suite 1A & B, Chantilly, VA 20151";

export const STATE_NAMES: Record<City["state"], string> = { VA: "Virginia", MD: "Maryland", DC: "the District of Columbia" };
/** "Fairfax, VA" / "Washington, DC" */
export const cityLabel = (c: City) => `${c.name}, ${c.state}`;
/** Which services have a page in this city. */
export const cityServices = (c: City): ServiceKey[] => c.services ?? ["ppf", "ceramic", "tint"];
/** Legal tint answer for the state the car is registered in. */
export function tintLawAnswer(state: City["state"]): { q: string; a: string } {
  if (state === "MD") return { q: "What is the legal tint limit in Maryland?", a: "Maryland allows 35% VLT on every window of a passenger car: front sides, rear sides, and the back glass. Multipurpose vehicles such as SUVs and vans may go darker behind the front doors. Windshields may only have a non-reflective strip above the AS-1 line. We only install Maryland-legal film on Maryland-registered cars and can help with medical exemption paperwork." };
  if (state === "DC") return { q: "What is the legal tint limit in Washington, DC?", a: "The District allows 70% VLT on the front side windows and 50% on the rear side and back glass of a sedan. Vans and SUVs may go to 35% behind the front doors. Windshields may only have a non-reflective strip above the AS-1 line. We only install DC-legal film on DC-registered cars." };
  return { q: "What is the legal tint limit in Virginia?", a: "For sedans, Virginia allows 50% VLT on the front side windows and 35% on the rear side and back windows. SUVs, trucks, and vans may go darker behind the front doors. Windshields may only have a non-reflective strip above the AS-1 line. We only install Virginia-legal tint and can help with medical exemption paperwork." };
}

export const CITIES: Record<string, City> = {
  Chantilly: {
    name: "Chantilly", slug: "chantilly-va", state: "VA", isHome: true,
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
    name: "Centreville", slug: "centreville-va", state: "VA",
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
    name: "Herndon", slug: "herndon-va", state: "VA",
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
    name: "Fairfax", slug: "fairfax-va", state: "VA",
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
    name: "Vienna", slug: "vienna-va", state: "VA",
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
    name: "Reston", slug: "reston-va", state: "VA",
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
    name: "McLean", slug: "mclean-va", state: "VA",
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
    name: "Tysons", slug: "tysons-va", state: "VA",
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
    name: "Alexandria", slug: "alexandria-va", state: "VA",
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
    name: "Arlington", slug: "arlington-va", state: "VA",
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
    name: "Falls Church", slug: "falls-church-va", state: "VA",
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
    name: "Springfield", slug: "springfield-va", state: "VA",
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
    name: "Manassas", slug: "manassas-va", state: "VA",
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
    name: "Woodbridge", slug: "woodbridge-va", state: "VA",
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
    name: "Stafford", slug: "stafford-va", state: "VA",
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
    name: "Fredericksburg", slug: "fredericksburg-va", state: "VA",
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
    name: "Ashburn", slug: "ashburn-va", state: "VA",
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
    name: "Sterling", slug: "sterling-va", state: "VA",
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
    name: "Leesburg", slug: "leesburg-va", state: "VA",
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
    name: "Gainesville", slug: "gainesville-va", state: "VA",
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
    name: "Burke", slug: "burke-va", state: "VA",
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
    name: "Oakton", slug: "oakton-va", state: "VA",
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

  "Washington DC": {
    name: "Washington", slug: "washington-dc", state: "DC",
    driveSentence: "Washington is about 40 minutes away via I-66, or via the Dulles Toll Road and I-66. Free parking on site, which is more than most DC garages can say.",
    heroDrive: "about 40 minutes from the District via I-66",
    roads: "I-66, the Beltway, and Rock Creek Parkway",
    roadsTitle: "I-66 & Beltway Defense",
    roadsDesc: "I-66 inside the Beltway, I-495, and DC-295 funnel commuter and freight traffic through constant lane work, and the District's potholed streets and narrow alleys add their own scrapes.",
    nearby: ["Georgetown", "Capitol Hill", "Dupont Circle", "Navy Yard", "Adams Morgan", "Foggy Bottom", "Petworth", "Tenleytown", "Columbia Heights", "Arlington"],
    hubDescription: "Serving the District, from Georgetown to Capitol Hill and Navy Yard.",
    neighbors: ["Arlington", "Alexandria", "Bethesda", "Silver Spring", "McLean"],
    localIntro: "Owning a car in the District means living with street parking. Cars in Georgetown, Dupont Circle, Capitol Hill, and Columbia Heights sit at the curb under mature trees, get nudged by parallel parkers, and collect everything the city throws at them, from pollen on Massachusetts Avenue to the brine spread on Connecticut Avenue every January. Commutes head out of town on I-66, over the Roosevelt and Key Bridges, or around the Beltway, and reverse commuters bound for Tysons and Reston share those lanes with construction trucks. Plenty of DC residents ride Metro all week and keep a car mainly for weekend trips, so that car spends most of its life parked outside. The drive to our Chantilly shop is about forty minutes out I-66, against the rush.",
  },
  "Bethesda": {
    name: "Bethesda", slug: "bethesda-md", state: "MD",
    driveSentence: "Bethesda is about 35 minutes away via Route 28, Route 7, and I-495 over the American Legion Bridge.",
    heroDrive: "about 35 minutes from Bethesda via Route 7 and the American Legion Bridge",
    roads: "I-495, Wisconsin Avenue, and River Road",
    roadsTitle: "Beltway & Wisconsin Ave Defense",
    roadsDesc: "The Beltway between the American Legion Bridge and the I-270 spur is a construction zone most years, and Wisconsin Avenue, Old Georgetown Road, and River Road carry Bethesda's traffic through constant utility work and tight garage ramps.",
    nearby: ["Bethesda", "Chevy Chase", "Downtown Bethesda", "Cabin John", "Glen Echo", "North Bethesda", "Kensington", "Friendship Heights", "Potomac", "Rockville"],
    hubDescription: "Serving Bethesda, Chevy Chase, and the Wisconsin Ave corridor.",
    neighbors: ["Washington DC", "Potomac", "Rockville", "Silver Spring", "McLean"],
    localIntro: "Bethesda sits where the Beltway, Wisconsin Avenue, and River Road meet, so a typical day in the car mixes the stop-and-go of Old Georgetown Road with a sprint across the American Legion Bridge toward Tysons. Many Bethesda households run two cars: a commuter that parks in the garages near the Bethesda or Medical Center Metro and a nicer car that stays in a garage in Chevy Chase or Edgemoor until the weekend. The hospital traffic around NIH and Walter Reed, the delivery trucks feeding Bethesda Row, and the Beltway widening work all leave their mark on paint and glass. Chantilly is about thirty-five minutes away by way of the Beltway, Route 7, and Route 28, and most customers come over on a weekday morning.",
  },
  "Potomac": {
    name: "Potomac", slug: "potomac-md", state: "MD",
    driveSentence: "Potomac is about 30 minutes away via Route 7 and I-495 over the American Legion Bridge.",
    heroDrive: "about 30 minutes from Potomac via the American Legion Bridge",
    roads: "River Road, Falls Road, and I-495",
    roadsTitle: "River Road & Beltway Defense",
    roadsDesc: "River Road and Falls Road wind through Potomac with gravel shoulders, overhanging trees, and landscaping trucks, and the Beltway at the American Legion Bridge adds high-speed construction debris.",
    nearby: ["Potomac", "Potomac Village", "Cabin John", "Travilah", "North Potomac", "Darnestown", "Bethesda", "Rockville", "Great Falls", "Glen Echo"],
    hubDescription: "Serving Potomac, Potomac Village, and the River Road corridor.",
    neighbors: ["Bethesda", "Rockville", "Great Falls", "McLean", "Gaithersburg"],
    localIntro: "Potomac is the kind of place where the garage has three doors and at least one of them hides a car that only comes out on dry days. The daily drivers run River Road and Falls Road into Bethesda or down to the Beltway, two-lane roads lined with stone walls, old trees, and landscaping trailers that drop grit at every curve. Pickup lines along Democracy Boulevard mean plenty of low-speed bumper contact, and the long wooded driveways off Glen Road and Seven Locks Road shower cars in sap and pollen. New luxury cars and EVs from the Rockville Pike and Tysons dealerships make up a big share of what we see from Potomac. We are about thirty minutes away across the American Legion Bridge and out Route 7.",
  },
  "Rockville": {
    name: "Rockville", slug: "rockville-md", state: "MD",
    driveSentence: "Rockville is about 35 minutes away via I-495 and I-270.",
    heroDrive: "about 35 minutes from Rockville via I-495 and I-270",
    roads: "I-270 and Rockville Pike",
    roadsTitle: "I-270 & Rockville Pike Defense",
    roadsDesc: "I-270 through Rockville is a wide, fast freight and commuter corridor with endless lane shifts, and Rockville Pike adds stop-and-go traffic, delivery trucks, and some of the tightest garage ramps in Montgomery County.",
    nearby: ["Rockville", "Twinbrook", "King Farm", "Rockville Town Square", "North Bethesda", "Fallsgrove", "Derwood", "Garrett Park", "Montrose", "Wheaton"],
    hubDescription: "Serving Rockville, Twinbrook, King Farm, and the I-270 corridor.",
    neighbors: ["Bethesda", "Potomac", "Gaithersburg", "Silver Spring"],
    localIntro: "Rockville is the county seat and the center of Montgomery County's car culture, with the dealership row along Rockville Pike, the Rockville and Twinbrook Metro garages, and I-270 running straight through the middle of it all. Commuters from King Farm, Fallsgrove, and Twinbrook merge onto an I-270 that is always being widened, shifted, or repaved, and the local lanes carry a steady run of dump trucks toward Shady Grove. Older neighborhoods near Rockville Town Square and Montgomery College have street parking under big trees, while the newer apartments along the Pike use shared garages. Much of what we see from Rockville is a car bought on the Pike within the past month. Chantilly is about thirty-five minutes away down I-270 and around the Beltway.",
  },
  "Gaithersburg": {
    name: "Gaithersburg", slug: "gaithersburg-md", state: "MD",
    driveSentence: "Gaithersburg is about 35 minutes away via I-495 and I-270.",
    heroDrive: "about 35 minutes from Gaithersburg via I-270 and the Beltway",
    roads: "I-270 and Route 355",
    roadsTitle: "I-270 & Route 355 Defense",
    roadsDesc: "I-270 at Shady Grove and Route 355 through Gaithersburg carry heavy truck traffic to the warehouses and job sites along Route 124 and Quince Orchard Road, and the pavement is constantly being torn up and repaved.",
    nearby: ["Gaithersburg", "Kentlands", "Crown", "Rio", "Montgomery Village", "North Potomac", "Shady Grove", "Washingtonian", "Quince Orchard", "Olde Towne Gaithersburg"],
    hubDescription: "Serving Gaithersburg, Kentlands, Crown, and the Shady Grove corridor.",
    neighbors: ["Rockville", "Germantown", "Potomac", "Frederick"],
    localIntro: "Gaithersburg drivers live on I-270. The Shady Grove Metro lot fills before 7 AM, and everyone who missed it merges onto the spur where the local and express lanes split, surrounded by trucks running to the warehouses along Route 124 and the job sites at Crown and Watkins Mill. Kentlands and Lakelands have garages tucked behind the houses, but Montgomery Village, Washingtonian, and the apartments around Rio mostly park in the open, in full sun and under the sycamores. The run of dealerships along Route 355 between Gaithersburg and Rockville means a lot of what we see is a car still wearing its paper tags. Chantilly is about thirty-five minutes away down I-270 and around the Beltway over the American Legion Bridge.",
  },
  "Germantown": {
    name: "Germantown", slug: "germantown-md", state: "MD",
    driveSentence: "Germantown is about 35 minutes away via Route 28, Route 7, I-495, and I-270.",
    heroDrive: "about 35 minutes from Germantown via I-270 and the Beltway",
    roads: "I-270, Route 118, and Clopper Road",
    roadsTitle: "I-270 & Route 118 Defense",
    roadsDesc: "I-270 north of Gaithersburg narrows and speeds up through Germantown, and Route 118, Route 27, and Clopper Road carry the gravel trucks and construction traffic from the new subdivisions out toward Clarksburg.",
    nearby: ["Germantown", "Milestone", "Germantown Town Center", "Clarksburg", "Boyds", "Darnestown", "Montgomery Village", "Kingsview", "Neelsville", "Seneca Creek"],
    hubDescription: "Serving Germantown, Milestone, and the upper I-270 corridor.",
    neighbors: ["Gaithersburg", "Frederick", "Rockville", "Potomac"],
    localIntro: "Germantown is one of the longest commutes in Montgomery County, and it shows in the odometers. Most mornings start at the Germantown MARC station, the Germantown Transit Center, or the I-270 on-ramp at Route 118, where the highway drops to fewer lanes and the trucks from the quarries and job sites around Clarksburg and Boyds hold the right lane. The townhouse neighborhoods off Middlebrook Road and Father Hurley Boulevard park in open lots with no shade, and the streets near Seneca Creek and Black Hill get sap and pollen from the woods. Germantown owners tend to keep a car longer than most, which makes protecting the paint early worth it. The shop is about thirty-five minutes down I-270 and around the Beltway over the American Legion Bridge.",
  },
  "Silver Spring": {
    name: "Silver Spring", slug: "silver-spring-md", state: "MD",
    driveSentence: "Silver Spring is about 40 minutes away via I-495.",
    heroDrive: "about 40 minutes from Silver Spring via the Beltway",
    roads: "I-495, Georgia Avenue, and Colesville Road",
    roadsTitle: "Beltway & Georgia Avenue Defense",
    roadsDesc: "The Beltway between Georgia Avenue and New Hampshire Avenue is one of its most congested and patched stretches, and Georgia Avenue, Colesville Road, and University Boulevard add potholes, bus traffic, and years of Purple Line construction.",
    nearby: ["Silver Spring", "Downtown Silver Spring", "Takoma Park", "Wheaton", "Four Corners", "White Oak", "Forest Glen", "Woodside", "Kensington", "Langley Park"],
    hubDescription: "Serving Silver Spring, Takoma Park, Wheaton, and the Georgia Ave corridor.",
    neighbors: ["Washington DC", "Bethesda", "Rockville", "Laurel", "Columbia"],
    localIntro: "Silver Spring drives like a city. Downtown has the garages around Ellsworth Drive and the Silver Spring Metro, but the neighborhoods of Woodside, Sligo Park Hills, and Takoma Park are street parking under old oaks, with the Purple Line construction along Wayne Avenue and Bonifant Street tearing up pavement for years. Commutes run down Georgia Avenue and Colesville Road into the District or around the Beltway, and that stretch of I-495 between Georgia Avenue and New Hampshire Avenue is as patched and congested as any in the region. The FDA campus at White Oak adds daily highway miles. Chantilly is about forty minutes away around the Beltway and across the American Legion Bridge, and most Silver Spring customers make it a weekday morning drop-off.",
  },

  "Frederick": {
    name: "Frederick", slug: "frederick-md", state: "MD", services: ["ppf", "ceramic"],
    driveSentence: "Frederick is about 55 minutes away via I-270, or via Route 7 and US-15 through Leesburg and Point of Rocks. Free parking on site.",
    heroDrive: "about 55 minutes from Frederick via I-270 or Route 7 and US-15",
    roads: "I-270, US-15, and I-70",
    roadsTitle: "I-270 & US-15 Chip Defense",
    roadsDesc: "I-270 south of Frederick is a high-speed truck and commuter corridor, and US-15 and I-70 add quarry trucks, farm traffic, and winter cinder to the mix.",
    nearby: ["Frederick", "Urbana", "Ballenger Creek", "Walkersville", "New Market", "Brunswick", "Middletown", "Mount Airy", "Point of Rocks"],
    hubDescription: "Serving Frederick, Urbana, and the I-270 corridor.",
    neighbors: ["Germantown", "Gaithersburg", "Leesburg", "Purcellville"],
    localIntro: "Frederick sits where I-270, I-70, and US-15 meet, which makes it a crossroads for commuters headed to Montgomery County and the District, freight bound for Baltimore and Hagerstown, and weekend drivers heading up toward Catoctin Mountain. Winters here are colder and snowier than inside the Beltway, so the state salts and cinders early and often. Car ownership runs deep in Frederick County, from garage-kept weekend cars in Urbana and Ballenger Creek to new deliveries from the dealerships along Buckeystown Pike, and Fort Detrick and Hood College bring in families who keep a vehicle a long time. Downtown drivers use the Carroll Creek garages; everyone else parks in an open driveway. Frederick owners reach our Chantilly shop in about 55 minutes via I-270, or down US-15 through Leesburg.",
  },
  "Columbia": {
    name: "Columbia", slug: "columbia-md", state: "MD", services: ["ppf", "ceramic"],
    driveSentence: "Columbia is about 55 minutes away via I-95 and I-495, or via Route 29 south to the Beltway. Free parking on site.",
    heroDrive: "about 55 minutes from Columbia via I-95 and I-495 or Route 29",
    roads: "Route 29, I-95, and Route 32",
    roadsTitle: "Route 29 & I-95 Chip Defense",
    roadsDesc: "Route 29, I-95, and Route 32 around Columbia carry fast commuter traffic to Baltimore, Fort Meade, and the District, with constant lane work and truck debris along the way.",
    nearby: ["Columbia", "Ellicott City", "Clarksville", "Elkridge", "Fulton", "Savage", "River Hill", "Wilde Lake", "Long Reach"],
    hubDescription: "Serving Columbia, Ellicott City, and Howard County.",
    neighbors: ["Laurel", "Silver Spring", "Rockville", "Bowie"],
    localIntro: "Columbia was planned around village centers and tree-lined parkways, and that shows in how people drive: short hops on Little Patuxent Parkway and Route 108 between Wilde Lake, Harper's Choice, and the Mall in Columbia, then long runs on Route 29, I-95, or Route 32 to Baltimore, the District, or Fort Meade. The mature trees that make Columbia's cul-de-sacs so pleasant also drop sap, pollen, and bird droppings on every car in an open driveway, and Howard County winters bring plenty of salt. Luxury sedans and EVs are common in River Hill and Clarksville, and a good share of owners already commute to jobs in Northern Virginia. Columbia drivers reach our Chantilly shop in about 55 minutes via I-95 and I-495, or Route 29 south to the Beltway.",
  },
  "Laurel": {
    name: "Laurel", slug: "laurel-md", state: "MD", services: ["ppf", "ceramic"],
    driveSentence: "Laurel is about 50 minutes away via I-95 and I-495. Free parking on site.",
    heroDrive: "about 50 minutes from Laurel via I-95 and I-495",
    roads: "Route 1, I-95, and the Baltimore-Washington Parkway",
    roadsTitle: "Route 1 & I-95 Chip Defense",
    roadsDesc: "Route 1 through Laurel is a working truck corridor lined with warehouses and dealerships, and I-95 and the Baltimore-Washington Parkway add high-speed commuter traffic to Fort Meade, Baltimore, and the District.",
    nearby: ["Laurel", "Russett", "Maryland City", "Savage", "Beltsville", "Montpelier", "Konterra", "Fort Meade", "South Laurel"],
    hubDescription: "Serving Laurel, Russett, and the Route 1 corridor.",
    neighbors: ["Columbia", "Bowie", "Silver Spring", "Washington DC"],
    localIntro: "Laurel sits at the seam of four counties, and its drivers use every road out of town: Route 1 through the warehouse and dealership strip, I-95 and the Baltimore-Washington Parkway toward Fort Meade and the District, Route 198 to the ICC, and Route 197 toward Bowie. Many residents are federal and defense employees who rotate between Fort Meade, NASA Goddard, and contractors in Northern Virginia, so the commute changes with every assignment. Townhouse and apartment parking around Russett, Laurel Lakes, and Main Street is mostly open lots, and Route 1 construction dust settles on everything that sits still. Laurel owners reach our Chantilly shop in about 50 minutes via I-95 and I-495.",
  },
  "Bowie": {
    name: "Bowie", slug: "bowie-md", state: "MD", services: ["ppf", "ceramic"],
    driveSentence: "Bowie is about 55 minutes away via US-50 and I-495. Free parking on site.",
    heroDrive: "about 55 minutes from Bowie via US-50 and I-495",
    roads: "US-50, Route 301, and Route 450",
    roadsTitle: "US-50 & Route 301 Chip Defense",
    roadsDesc: "US-50 through Bowie is the main run between the District and Annapolis, and Route 301 is a heavy truck bypass where gravel and tire debris are constant.",
    nearby: ["Bowie", "Mitchellville", "Fairwood", "Old Town Bowie", "Crofton", "Glenn Dale", "Upper Marlboro", "Lanham", "Largo"],
    hubDescription: "Serving Bowie, Mitchellville, and the US-50 corridor.",
    neighbors: ["Annapolis", "Laurel", "Waldorf", "Washington DC"],
    localIntro: "Bowie is a US-50 town. Most residents run that highway west to the District or east toward Annapolis every day, and Route 301 along the east side of town is the truck route for freight skipping I-95 between Richmond and Delaware. The neighborhoods tell the story of car ownership here: Levitt-built homes in Belair with open driveways, newer houses in Fairwood and Mitchellville with two-car garages, and a strong community of weekend cars that gather around Bowie Town Center and Allen Pond. Prince George's County salts US-50 hard in winter, and summer brings the Bay Bridge crowds through town. Bowie owners reach our Chantilly shop in about 55 minutes via US-50 and I-495.",
  },
  "Waldorf": {
    name: "Waldorf", slug: "waldorf-md", state: "MD", services: ["ppf", "ceramic"],
    driveSentence: "Waldorf is about 60 minutes away via Route 301 and I-495, or via Route 210 and I-95. Free parking on site.",
    heroDrive: "about 60 minutes from Waldorf via Route 301 or Route 210 and I-495",
    roads: "Route 301, Route 5, and Route 210",
    roadsTitle: "Route 301 & Route 5 Chip Defense",
    roadsDesc: "Route 301 through Waldorf is a major truck bypass, and Route 5 and Route 210 toward the Beltway are long, fast commuter runs lined with construction and gravel shoulders.",
    nearby: ["Waldorf", "St. Charles", "White Plains", "La Plata", "Brandywine", "Clinton", "Hughesville", "Bryans Road", "Indian Head"],
    hubDescription: "Serving Waldorf, St. Charles, and Charles County.",
    neighbors: ["Bowie", "Washington DC", "Alexandria", "Annapolis"],
    localIntro: "Waldorf has some of the longest commutes in the Washington region: Route 5 north to the Branch Avenue Metro and the Beltway, Route 301 past the dealership row on Crain Highway, and Route 210 up through Accokeek for anyone headed to Northern Virginia across the Wilson Bridge. Many residents are tied to Joint Base Andrews, Indian Head, or Patuxent River, and pickups and SUVs outnumber sedans in the St. Charles and White Plains driveways. Most of those driveways are open, the subdivisions are new and short on shade, and Charles County road crews lay salt early on Route 301. Waldorf owners reach our Chantilly shop in about an hour via Route 301 or Route 210 to I-495.",
  },
  "Annapolis": {
    name: "Annapolis", slug: "annapolis-md", state: "MD", services: ["ppf", "ceramic"],
    driveSentence: "Annapolis is about 65 minutes away via US-50 and I-495. Free parking on site.",
    heroDrive: "about 65 minutes from Annapolis via US-50 and I-495",
    roads: "US-50, Route 2, and the Bay Bridge approach",
    roadsTitle: "US-50 & Bay Bridge Chip Defense",
    roadsDesc: "US-50 between Annapolis and the Beltway is one of the fastest, most crowded highways in Maryland, and the Bay Bridge approaches add summer beach traffic, boat trailers, and salt air to everything that drives them.",
    nearby: ["Annapolis", "Eastport", "Parole", "Severna Park", "Arnold", "Edgewater", "Crofton", "Cape St. Claire", "Davidsonville"],
    hubDescription: "Serving Annapolis, Severna Park, and the Bay Bridge corridor.",
    neighbors: ["Bowie", "Columbia", "Laurel", "Washington DC"],
    localIntro: "Annapolis cars live by the water. Salt air off the Severn and the Chesapeake, gulls over the marinas in Eastport, and boat trailers on every road in summer make it one of the harshest places in the region to own a nice car. Downtown's brick streets and the tight garages near City Dock mean parallel parking and door dings, while Severna Park, Arnold, and Davidsonville drivers keep cars in open driveways under big trees. The commute runs west on US-50 toward the District or north on I-97 toward Baltimore, and Navy families rotate through with cars they want to protect before the next move. Annapolis owners reach our Chantilly shop in about 65 minutes via US-50 and I-495.",
  },

  "Annandale": {
    name: "Annandale", slug: "annandale-va", state: "VA",
    driveSentence: "Annandale is about 25 minutes away via I-495 and I-66. Free parking on site at Walney Rd.",
    heroDrive: "about 25 minutes from Annandale via I-495 and I-66",
    roads: "I-495, Little River Turnpike, and Columbia Pike",
    roadsTitle: "Beltway & Little River Turnpike Defense",
    roadsDesc: "I-495 at the Little River Turnpike exit is one of the Beltway's busiest stretches, and the stop-and-go on Route 236 and Columbia Pike adds bumper scuffs, bug strikes, and gravel from constant utility work.",
    nearby: ["Annandale", "Ravensworth", "Mason District", "Lake Barcroft", "Pinecrest", "Bailey's Crossroads", "Falls Church", "Springfield", "Fairfax"],
    hubDescription: "Serving Annandale, Mason District, and the Little River Turnpike corridor.",
    neighbors: ["Fairfax", "Falls Church", "Springfield", "Burke", "Alexandria", "Arlington"],
    localIntro: "Annandale sits inside the Beltway at Exit 52, so a typical day means merging onto I-495 behind trucks, crawling down Little River Turnpike past the Koreatown restaurants, and threading Columbia Pike or Gallows Road toward Tysons and the Pentagon. The neighborhoods are older and heavily wooded, with Ravensworth, Pinecrest, and Lake Accotink Park shaded by mature oaks that drop sap, pollen, and acorns onto cars parked in driveways and on the street. Many residents are in apartment and townhouse lots along Route 236 with no cover. New cars come off the dealer lots on Little River Turnpike, and students park in the open at the NOVA Annandale campus. From Annandale, the Beltway to I-66 west and Route 28 north puts you at our Chantilly bay in about twenty-five minutes.",
  },
  "Lorton": {
    name: "Lorton", slug: "lorton-va", state: "VA",
    driveSentence: "Lorton is about 30 minutes away via the Fairfax County Parkway, or I-95 to I-495 and I-66.",
    heroDrive: "about 30 minutes from Lorton via the Fairfax County Parkway",
    roads: "I-95, Richmond Highway, and the Fairfax County Parkway",
    roadsTitle: "I-95 & Richmond Highway Defense",
    roadsDesc: "I-95 through Lorton carries nonstop truck traffic between the express-lane ramps and the Occoquan bridge, and Richmond Highway and Lorton Road add quarry trucks, construction debris, and stop-and-go wear.",
    nearby: ["Lorton", "Laurel Hill", "Fort Belvoir", "Newington", "Mason Neck", "Gunston", "Occoquan", "Springfield", "Woodbridge"],
    hubDescription: "Serving Lorton, Laurel Hill, and the Fort Belvoir side of I-95.",
    neighbors: ["Springfield", "Woodbridge", "Burke", "Alexandria", "Fairfax"],
    localIntro: "Lorton is where I-95 meets the Occoquan, and most residents spend their mornings on it: the express-lane ramps near Lorton Road, the merge from Richmond Highway, and the slow crawl past Newington toward the Springfield interchange. Fort Belvoir personnel, Lorton VRE riders, and families from Laurel Hill and the newer homes near the Workhouse Arts Center all share the same roads, which also carry quarry and construction trucks feeding the development along Lorton Road and Ox Road. Weekend trips run out to Mason Neck, Pohick Bay, and Occoquan Regional Park, where gravel lots and tree cover are the norm. The Fairfax County Parkway runs from Lorton straight north to Route 28 and our Chantilly shop in about thirty minutes.",
  },
  "Dale City": {
    name: "Dale City", slug: "dale-city-va", state: "VA",
    driveSentence: "Dale City is about 35 minutes away via I-95 and I-495 to I-66, or the Prince William Parkway to I-66.",
    heroDrive: "about 35 minutes from Dale City via the Prince William Parkway and I-66",
    roads: "I-95, Dale Boulevard, and the Prince William Parkway",
    roadsTitle: "I-95 & Dale Boulevard Defense",
    roadsDesc: "I-95 at Dale City is one of the heaviest truck corridors on the East Coast, and Dale Boulevard, Minnieville Road, and the Prince William Parkway add commuter-lot traffic, winter brine, and construction gravel.",
    nearby: ["Dale City", "Lake Ridge", "Woodbridge", "Montclair", "Dumfries", "Potomac Mills", "Hoadly", "Manassas", "Occoquan"],
    hubDescription: "Serving Dale City, Lake Ridge, and the Dale Boulevard corridor.",
    neighbors: ["Woodbridge", "Manassas", "Lorton", "Stafford", "Springfield"],
    localIntro: "Dale City is a commuter town: the slug lines form before dawn at the Horner Road and Dale City commuter lots, and everyone else funnels down Dale Boulevard to I-95 and the express lanes for the long haul to the Pentagon and DC. Minnieville Road, Hoadly Road, and the Prince William Parkway carry the rest of the traffic toward Manassas, past new subdivisions still under construction. Most homes here are 1970s and 1980s houses with driveways but no garages, so cars sit out in full sun and under the winter brine spray that I-95 throws for months. Weekend errands mean Potomac Mills and the Route 1 strip. From Dale City, the Prince William Parkway to I-66 east and Route 28 north reaches our Chantilly shop in about thirty-five minutes.",
  },
  "Haymarket": {
    name: "Haymarket", slug: "haymarket-va", state: "VA",
    driveSentence: "Haymarket is about 20 minutes away via I-66 west.",
    heroDrive: "about 20 minutes from Haymarket via I-66",
    roads: "I-66, Route 15, and Route 55",
    roadsTitle: "I-66 & Route 15 Defense",
    roadsDesc: "I-66 at Haymarket is where the interstate opens up to full speed, and Route 15 and Route 55 bring farm equipment, gravel shoulders, and quarry trucks into the mix.",
    nearby: ["Haymarket", "Dominion Valley", "Piedmont", "Gainesville", "Bull Run Mountain", "Catharpin", "Thoroughfare", "Warrenton", "Bristow"],
    hubDescription: "Serving Haymarket, Dominion Valley, and the Route 15 corridor.",
    neighbors: ["Gainesville", "Bristow", "Manassas", "Warrenton", "Centreville"],
    localIntro: "Haymarket is the last exit before I-66 heads into the Fauquier countryside, which means every commute east starts at full highway speed and runs through the Route 29 interchange work and the express-lane corridor toward Fairfax. Route 15 north toward Leesburg and Route 55 along the base of the Bull Run Mountains add farm trucks, gravel shoulders, and deer at dusk. The big planned communities, Dominion Valley, Piedmont, and Regency, have garages but also long shadeless driveways and HOA rules that limit washing at home, while the historic blocks of Old Town Haymarket park on the street. Weekend traffic to the wineries and mountain trails keeps the SUVs busy. I-66 east to Route 28 north brings a Haymarket car to our Chantilly bay in about twenty minutes.",
  },
  "Bristow": {
    name: "Bristow", slug: "bristow-va", state: "VA",
    driveSentence: "Bristow is about 20 minutes away via Route 28 south.",
    heroDrive: "about 20 minutes from Bristow via Route 28",
    roads: "Route 28, Linton Hall Road, and the Prince William Parkway",
    roadsTitle: "Route 28 & Linton Hall Defense",
    roadsDesc: "Route 28 through Bristow and Linton Hall Road are lined with active construction and dump-truck traffic feeding new subdivisions, with gravel on every shoulder and intersection.",
    nearby: ["Bristow", "Braemar", "Victory Lakes", "Nokesville", "Linton Hall", "Broad Run", "Gainesville", "Manassas", "Haymarket"],
    hubDescription: "Serving Bristow, Braemar, and the Linton Hall Road corridor.",
    neighbors: ["Gainesville", "Manassas", "Haymarket", "Warrenton", "Centreville"],
    localIntro: "Bristow grew up along Linton Hall Road, and the roads have been catching up ever since: Route 28 south of Manassas, Linton Hall Road, and the Prince William Parkway are all lined with dump trucks and new-phase construction feeding Braemar, Victory Lakes, and the subdivisions toward Nokesville. Commuters either ride the VRE from Broad Run or drive Route 28 and I-66 east, and the Nokesville end of Route 28 is still a two-lane road with gravel shoulders and farm equipment in places. Homes are new with garages, but the driveways are long, the trees are young, and many cul-de-sacs get full sun all day. Concerts at Jiffy Lube Live fill the gravel lots on summer weekends. Route 28 north runs straight to our Chantilly bay in about twenty minutes.",
  },
  "South Riding": {
    name: "South Riding", slug: "south-riding-va", state: "VA",
    driveSentence: "South Riding is about 10 minutes away via Route 50 west.",
    heroDrive: "about 10 minutes from South Riding via Route 50",
    roads: "Route 50, the Loudoun County Parkway, and Tall Cedars Parkway",
    roadsTitle: "Route 50 & Loudoun County Parkway Defense",
    roadsDesc: "Route 50 between South Riding and Chantilly is a high-speed commuter road with ongoing widening work, and the Loudoun County Parkway and Tall Cedars Parkway carry constant construction traffic from the new neighborhoods of Dulles South.",
    nearby: ["South Riding", "Stone Ridge", "Arcola", "Dulles South", "Aldie", "Chantilly", "Brambleton", "Dulles Landing", "Sterling"],
    hubDescription: "Serving South Riding, Stone Ridge, and Dulles South.",
    neighbors: ["Chantilly", "Aldie", "Brambleton", "Sterling", "Centreville", "Ashburn"],
    localIntro: "South Riding is a planned community on the Loudoun side of Route 50 where nearly every household commutes east toward Chantilly, Dulles, and Tysons or north up the Loudoun County Parkway to the data-center corridor and Route 267. Route 50 has been under widening and interchange work for years, Tall Cedars Parkway and Riding Center Drive carry dump trucks to the new phases in Dulles South and Arcola, and the Dulles flight path adds fine dust from airport construction to everything. Most homes have two-car garages, but with two or three cars per family at least one usually lives on the driveway. Shopping runs go to South Riding Town Center and Dulles Landing. Route 50 east to Route 28 puts you at our Walney Rd bay in about ten minutes.",
  },

  "Aldie": {
    name: "Aldie", slug: "aldie-va", state: "VA",
    driveSentence: "Aldie is about 15 minutes away via Route 50. Pull into the open lot at 4215 Walney Rd and park anywhere out front.",
    heroDrive: "about 15 minutes from Aldie via Route 50",
    roads: "Route 50, Route 15, and Gum Spring Road",
    roadsTitle: "Route 50 & Gilberts Corner Defense",
    roadsDesc: "Route 50 through Aldie and the Gilberts Corner roundabouts at Route 15 carry quarry trucks, farm equipment, and construction traffic from the Dulles South subdivisions, with loose stone on every shoulder.",
    nearby: ["Aldie", "Stone Ridge", "Willowsford", "Lenah", "Arcola", "South Riding", "Middleburg", "Gilberts Corner", "Dulles South"],
    hubDescription: "Serving Aldie, Stone Ridge, Willowsford, and the Route 50 corridor.",
    neighbors: ["South Riding", "Brambleton", "Chantilly", "Leesburg", "Haymarket"],
    localIntro: "Aldie is where Loudoun's new subdivisions end and the horse country begins, and the driving reflects it. Route 50 narrows from a divided highway at Stone Ridge to a two-lane road through the historic village, with the Gilberts Corner roundabouts at Route 15 funneling quarry trucks, horse trailers, and weekend traffic bound for Middleburg. Homes in Willowsford, Lenah, and along Braddock Road sit on larger lots with long driveways, so cars are often parked outside under oaks or on gravel aprons that kick stone into the wheel wells. Most commuters head east on Route 50 toward Chantilly, Tysons, and Dulles, so a drop-off at our Walney Rd bay is on the way to work, about fifteen minutes door to door.",
  },
  "Great Falls": {
    name: "Great Falls", slug: "great-falls-va", state: "VA",
    driveSentence: "Great Falls is about 25 minutes away via Route 7 and Route 28. There is open parking right at the bay door on Walney Rd.",
    heroDrive: "about 25 minutes from Great Falls via Route 7 and Route 28",
    roads: "Georgetown Pike, Route 7, and Walker Road",
    roadsTitle: "Georgetown Pike & Route 7 Defense",
    roadsDesc: "Georgetown Pike winds through Great Falls with no shoulders, overhanging trees, and gravel washed onto the pavement after every storm, while Route 7 adds high-speed commuter traffic and construction toward Tysons.",
    nearby: ["Great Falls", "Great Falls Village Centre", "Riverbend", "Seneca Road", "Colvin Run", "McLean", "Reston", "Herndon", "Sterling"],
    hubDescription: "Serving Great Falls, Georgetown Pike, and the Potomac side of Fairfax County.",
    neighbors: ["McLean", "Reston", "Herndon", "Sterling", "Tysons"],
    localIntro: "Great Falls is one of the few places in Fairfax County where a daily drive still means two-lane roads with no streetlights. Georgetown Pike, Walker Road, and Seneca Road twist through tree cover and past estate driveways, and after every storm gravel and branches end up on the pavement. Most households keep a serious car or two in the garage and a family SUV on the driveway, and the commute runs either down Georgetown Pike to the Beltway or out Route 7 toward Tysons and Reston. Spring pollen off the oaks and summer sap on anything parked outside near Great Falls Park are a constant. The shop is about twenty-five minutes away: Route 7 west to Route 28 south, exit at Walney Rd.",
  },
  "Brambleton": {
    name: "Brambleton", slug: "brambleton-va", state: "VA",
    driveSentence: "Brambleton is about 15 minutes away via Loudoun County Parkway and Route 50.",
    heroDrive: "about 15 minutes from Brambleton via Loudoun County Parkway",
    roads: "Loudoun County Parkway, Belmont Ridge Road, and Ryan Road",
    roadsTitle: "Loudoun County Parkway Defense",
    roadsDesc: "Loudoun County Parkway, Belmont Ridge Road, and Ryan Road around Brambleton are still being widened, with construction trucks, fresh gravel, and new-subdivision traffic in every direction.",
    nearby: ["Brambleton", "Brambleton Town Center", "Broadlands", "Ashburn", "Stone Ridge", "Dulles South", "Loudoun Station", "Evergreen Mills Road", "Belmont Ridge"],
    hubDescription: "Serving Brambleton, Broadlands, and the Loudoun County Parkway corridor.",
    neighbors: ["Ashburn", "Aldie", "South Riding", "Sterling", "Leesburg"],
    localIntro: "Brambleton is a planned community that is still being built, and the roads show it. Loudoun County Parkway and Belmont Ridge Road have been under widening for years, Ryan Road and Evergreen Mills Road carry dump trucks to the next phase of homes, and every new section means another stretch of fresh gravel and mud tracked onto the pavement. Nearly every household has a garage, but with two or three cars per house one usually sleeps on the driveway facing the open sky. Commutes run down the Parkway to Route 50 and Route 28, out the Greenway, or to the Ashburn Metro station at Loudoun Station. The shop is about fifteen minutes away down Loudoun County Parkway, so a drop-off fits into a normal morning.",
  },
  "Purcellville": {
    name: "Purcellville", slug: "purcellville-va", state: "VA",
    driveSentence: "Purcellville is about 40 minutes away via Route 7 and Route 28. The lot in front of the bay has room for a truck and trailer.",
    heroDrive: "about 40 minutes from Purcellville via Route 7",
    roads: "Route 7, Route 287, and Hillsboro Road",
    roadsTitle: "Route 7 West Defense",
    roadsDesc: "Route 7 between Purcellville and Leesburg is a high-speed divided highway shared with farm trucks and gravel haulers, and Route 287 and Hillsboro Road add mud, loose stone, and tractor traffic from the surrounding farms.",
    nearby: ["Purcellville", "Hamilton", "Round Hill", "Hillsboro", "Lovettsville", "Lincoln", "Bluemont", "Leesburg", "Western Loudoun"],
    hubDescription: "Serving Purcellville, Hamilton, Round Hill, and western Loudoun County.",
    neighbors: ["Leesburg", "Winchester", "Ashburn", "Brambleton"],
    localIntro: "Purcellville driving is a mix of a fast divided highway and farm lanes. Route 7 is the only practical way east, and the stretch to Leesburg runs at highway speed behind gravel haulers, horse trailers, and the trucks serving the wineries and breweries out toward Hillsboro and Bluemont. Closer to home, Route 287, Hillsboro Road, and the roads to Lincoln and Hamilton are two-lane, shoulderless, and often coated in mud or loose stone from the fields. Trucks and SUVs outnumber sedans here, many vehicles park outside on gravel, and well water is the norm. The drive to our Chantilly bay is about forty minutes: Route 7 east through Leesburg, then Route 28 south to Walney Rd.",
  },
  "Warrenton": {
    name: "Warrenton", slug: "warrenton-va", state: "VA", services: ["ppf", "ceramic"],
    driveSentence: "Warrenton is about 45 minutes away via Route 29 and I-66. Park anywhere in the open lot in front of the bay on Walney Rd.",
    heroDrive: "about 45 minutes from Warrenton via Route 29 and I-66",
    roads: "Route 29, Route 17, and the Warrenton Bypass",
    roadsTitle: "Route 29 & Fauquier Defense",
    roadsDesc: "Route 29 from Warrenton to Gainesville runs at highway speed behind gravel and livestock trucks, and Route 17, Route 211, and the Fauquier back roads add mud, loose stone, and tractor traffic from the surrounding farms.",
    nearby: ["Warrenton", "Old Town Warrenton", "New Baltimore", "Vint Hill", "Bealeton", "Marshall", "The Plains", "Fauquier County", "Broadview Avenue"],
    hubDescription: "Serving Warrenton, New Baltimore, Vint Hill, and Fauquier County.",
    neighbors: ["Gainesville", "Haymarket", "Manassas", "Bristow"],
    localIntro: "Warrenton sits at the hub of Fauquier County's roads: Route 29 heading northeast to Gainesville and I-66, Route 17 toward Fredericksburg and Winchester, Route 211 out to the Blue Ridge, and the bypass that ties them together. Commuters from New Baltimore, Vint Hill, and the subdivisions off Route 17 run forty miles each way into Fairfax and Arlington, much of it behind gravel haulers and livestock trucks. Closer in, the farm lanes and horse-country roads around Airlie and The Plains leave mud and stone on everything. Trucks and SUVs dominate, parking is mostly open driveways and gravel, and well water is common. The trip to our Chantilly bay is about forty-five minutes: Route 29 to I-66 east, then Route 28 north to Walney Rd.",
  },
  "Winchester": {
    name: "Winchester", slug: "winchester-va", state: "VA", services: ["ppf", "ceramic"],
    driveSentence: "Winchester is about 60 minutes away via Route 7, or via I-81 and I-66. We have open parking at the bay on Walney Rd, with room for a trailer.",
    heroDrive: "about 60 minutes from Winchester via Route 7 or I-66",
    roads: "I-81, Route 7, and Route 50",
    roadsTitle: "I-81 & Snickers Gap Defense",
    roadsDesc: "I-81 through Winchester is one of the heaviest truck corridors on the East Coast, and Route 7 over Snickers Gap and Route 50 over the Blue Ridge add mountain grades, gravel shoulders, and winter cinders.",
    nearby: ["Winchester", "Old Town Winchester", "Stephens City", "Berryville", "Frederick County", "Clarke County", "Shenandoah University", "Apple Blossom", "Valley Pike"],
    hubDescription: "Serving Winchester, Stephens City, Berryville, and the northern Shenandoah Valley.",
    neighbors: ["Purcellville", "Leesburg", "Warrenton", "Ashburn"],
    localIntro: "Winchester is a trucking town as much as a college and hospital town. I-81 carries freight through the Shenandoah Valley at a volume few interstates match, Route 11 and Route 522 feed it, and the Route 7 and Route 50 climbs over the Blue Ridge toward Loudoun and Fauquier mix mountain grades with gravel shoulders and winter cinders. Commuters to Northern Virginia leave before dawn, and many households run a truck for the orchards and farms of Frederick and Clarke counties alongside a car for the daily drive. Parking is open driveways and the surface lots at Shenandoah University, Winchester Medical Center, and Apple Blossom Mall. Our Chantilly bay is about an hour away: Route 7 east to Route 28 south, or I-81 to I-66 east and Route 28 north.",
  },
};

/** Cities in display order for hubs, footers, and link blocks. */
export const CITY_ORDER: string[] = [
  "Chantilly", "Centreville", "Herndon", "Sterling", "Ashburn", "Reston", "Fairfax", "Oakton", "Vienna", "McLean", "Tysons",
  "Falls Church", "Arlington", "Alexandria", "Burke", "Springfield", "Manassas", "Gainesville", "Leesburg", "Woodbridge",
  "Stafford", "Fredericksburg",
  // Added Oct 2026: the rest of the DMV. Virginia first, then DC, then Maryland.
  "Annandale", "Lorton", "Dale City", "Haymarket", "Bristow", "South Riding", "Aldie", "Great Falls", "Brambleton", "Purcellville", "Warrenton", "Winchester",
  "Washington DC",
  "Bethesda", "Potomac", "Rockville", "Gaithersburg", "Germantown", "Silver Spring", "Frederick", "Columbia", "Laurel", "Bowie", "Waldorf", "Annapolis",
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
  seoTitle: (c: City) => string;
  seoDescription: (c: City) => string;
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
    badges: ["5.0 ★ Google Rating", "Full Front Specialists", "12-Year Film Warranty", "STEK DYNOshield Film"],
    seoTitle: (c) => `Full Front PPF ${c.name} ${c.state} | Paint Protection Film Near Me`,
    seoDescription: (c) =>
      `Full front paint protection film for ${cityLabel(c)} drivers: hood, bumper, fenders, mirrors, and headlights in self-healing STEK DYNOshield, 12-year warranty. 5.0 stars on Google. Free quotes.`,
    heroLabel: "Full Front Paint Protection Film",
    heroHeading: "FULL FRONT PPF NEAR",
    heroText: (c) => `Northern Virginia's top-rated full front PPF installer, ${c.heroDrive}. Hood, bumper, fenders, mirrors, and headlights wrapped in self-healing STEK DYNOshield, so rock chips never reach your paint.`,
    whyLabel: (city) => `Why full front PPF in ${city}`,
    whyHeading: "PROTECT YOUR PAINT ON NOVA ROADS",
    roadsBenefit: "Full front PPF absorbs rock chips and road debris on the panels that actually get hit, before they reach your paint.",
    features: [
      { title: "Self-Healing Film", desc: "Light scratches and swirl marks disappear on their own when the film warms up — keeping your car showroom-fresh." },
      { title: "12-Year Warranty", desc: "Our STEK DYNOshield film comes with a manufacturer-backed 12-year warranty against yellowing, cracking, and peeling." },
      { title: "Invisible Protection", desc: "High-clarity film is virtually undetectable — your car's color and finish look exactly the same, just protected." },
    ],
    faqHeading: (city) => `PPF QUESTIONS FROM ${city.toUpperCase()} DRIVERS`,
    faqs: (c) => [
      { q: `Do you serve ${cityLabel(c)} for PPF?`, a: serveAnswer(c, "paint protection film") },
      { q: `How much does PPF cost near ${c.name}?`, a: "PPF pricing depends on how much you cover: partial front (bumper plus partial hood), full front (bumper, hood, fenders, mirrors, headlights, and A-pillars), or full front extended. Full front is what most Northern Virginia drivers choose. Every price is confirmed at an in-person inspection. Request a free, no-obligation quote and we reply with an exact number, usually within the hour." },
      { q: `Is PPF worth it driving on ${c.roads} near ${c.name}?`, a: `Absolutely. ${c.roadsDesc} PPF is one of the best investments to protect your paint from rock chips and road debris and to preserve resale value.` },
      { q: "How long does PPF installation take?", a: "A partial or full front install typically takes one day. Full front extended may take up to two days depending on the vehicle. We'll give you a firm timeline at your consultation." },
      { q: `Do you offer PPF for Tesla, BMW, and luxury vehicles near ${c.name}?`, a: "Absolutely. We specialize in high-end and exotic vehicles. Our computer-cut patterns are precision-fit for every make and model, including Tesla, BMW, Mercedes, Porsche, and more." },
      { q: "Does PPF self-heal?", a: "Yes — our premium STEK DYNOshield film features thermoplastic polyurethane that self-heals light scratches and swirl marks when exposed to heat, keeping your paint looking pristine for years." },
      { q: "Do you take a deposit?", a: "Yes. Once you approve your quote, a 20% deposit reserves your install date and locks in your price. It goes toward your total, so you pay the remaining balance at pickup after you've walked every panel with us. The deposit is fully refundable at any time, no questions asked." },
    ],
    testimonialsTitle: (city) => `WHAT ${city.toUpperCase()} DRIVERS SAY ABOUT OUR PPF`,
    ctaHeading: "FULL FRONT PPF, DONE RIGHT",
    ctaText: (c) => `Get a free full front PPF quote from Northern Virginia's top-rated installer, and ask about this month's special. ${ctaDrive(c)}`,
  },
  ceramic: {
    key: "ceramic",
    label: "Ceramic Coating",
    short: "Ceramic Coating",
    slugPrefix: "ceramic-coating",
    serviceHref: "/services/ceramic-coating",
    quoteParam: "ceramic",
    badges: ["5.0 ★ Google Rating", "Free Quotes", "Up to 7-Year Coatings", "Graphene & SiO2 Coatings"],
    seoTitle: (c) => `Ceramic Coating ${c.name} ${c.state} | Car Ceramic Coating Near Me`,
    seoDescription: (c) =>
      `Professional ceramic coating for ${cityLabel(c)} drivers. Gtechniq graphene and SiO2 coatings with paint correction, 5–7 year protection, and a hydrophobic finish. Free quotes. 5.0 stars on Google.`,
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
      { q: `Do you serve ${cityLabel(c)} for ceramic coating?`, a: serveAnswer(c, "ceramic coatings") },
      { q: `How much does ceramic coating cost near ${c.name}?`, a: "Ceramic coating pricing depends on the package (Crystal with a 5-year warranty or Ultimate with a 7-year warranty), the level of paint correction your paint needs, and vehicle size. Request a free, no-obligation quote with your year, make, and model and we reply with an exact price." },
      { q: `Is ceramic coating worth it for ${c.name} drivers on ${c.roads}?`, a: `Yes. ${c.roadsDesc} Add winter road salt, spring pollen, and summer bug season, and unprotected clear coat dulls fast. A professional ceramic coating adds a hard, hydrophobic layer that resists chemical etching and UV fading and makes every wash easier.` },
      { q: "How long does a ceramic coating last?", a: "Our Gtechniq coatings are rated for 5–7 years depending on the package, with proper maintenance. That is years longer than a wax or sealant, which typically last a few months." },
      { q: "Does ceramic coating protect against rock chips?", a: "No — a ceramic coating resists chemicals, UV, and light swirls, but it is microns thick and will not stop impacts. For rock chip protection on the front end we recommend pairing your coating with paint protection film, which we also install." },
      { q: "How do I maintain a ceramic-coated car?", a: "Hand wash with a pH-neutral soap using the two-bucket method, avoid automatic brush car washes, and use a ceramic-safe detail spray between washes. We include care instructions with every coating and offer maintenance details." },
      { q: "Do you take a deposit?", a: "Yes. Once you approve your quote, a 20% deposit reserves your install date and locks in your price. It goes toward your total, so you pay the remaining balance at pickup after you've walked every panel with us. The deposit is fully refundable at any time, no questions asked." },
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
    seoTitle: (c) => `Window Tinting ${c.name} ${c.state} | Car Tint Near Me`,
    seoDescription: (c) =>
      `Ceramic window tinting near ${cityLabel(c)}. GeoShield Pro Nano Ceramic film with 99% UV and up to 83% heat rejection, ${c.state === "DC" ? "DC" : STATE_NAMES[c.state]}-legal shades, and a nationwide lifetime warranty. Free quotes.`,
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
      { q: `Do you serve ${cityLabel(c)} for window tinting?`, a: serveAnswer(c, "window tint") },
      { q: `How much does window tinting cost near ${c.name}?`, a: "Window tint pricing depends on how many windows you tint: four side windows, the rear package (most popular), full car including the windshield, or windshield only. Every package is GeoShield Pro Nano Ceramic with a nationwide lifetime warranty. Request a free, no-obligation quote for an exact price." },
      tintLawAnswer(c.state),
      { q: "Does ceramic tint interfere with phone, GPS, or radio signals?", a: "No. GeoShield Pro Nano Ceramic is metal-free, so it blocks heat and UV without affecting cell, GPS, satellite radio, or toll transponder signals the way older metallic films can." },
      { q: `How long does tinting take, and when can I roll the windows down?`, a: `Most cars take 2–3 hours at our Chantilly shop. Keep the windows up for 3–5 days while the film cures; you may see slight haze or small water pockets that clear on their own during that time.` },
      { q: "What warranty comes with the tint?", a: "Every GeoShield package carries a nationwide lifetime warranty against bubbling, peeling, cracking, fading, and purpling, honored by GeoShield dealers across the country." },
      { q: "Do you take a deposit?", a: "Yes. Once you approve your quote, a 20% deposit reserves your install date and locks in your price. It goes toward your total, so you pay the remaining balance at pickup after you've walked every panel with us. The deposit is fully refundable at any time, no questions asked." },
    ],
    testimonialsTitle: (city) => `WHAT ${city.toUpperCase()} DRIVERS SAY ABOUT OUR TINTING`,
    ctaHeading: "TINT IT RIGHT THE FIRST TIME",
    ctaText: (c) => `Get a free window tinting quote from Northern Virginia's top-rated installer. ${ctaDrive(c)}`,
  },
};

export const cityPath = (service: ServiceKey, cityName: string) => `/${SERVICES[service].slugPrefix}-${CITIES[cityName].slug}`;
