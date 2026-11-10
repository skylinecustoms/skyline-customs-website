/**
 * Suggestions for the quote form's car step: the makes people bring to the shop most, and their common models.
 * They're suggestions only (a datalist), so any make or model can still be typed.
 */
export const QUOTE_MODELS: Record<string, string[]> = {
  Tesla: ["Model Y", "Model 3", "Model S", "Model X", "Cybertruck"],
  BMW: ["X5", "X3", "M3", "M4", "3 Series", "5 Series", "X7", "iX", "M5", "X6", "i4", "M2"],
  "Mercedes-Benz": ["GLE", "C-Class", "E-Class", "GLC", "S-Class", "G-Class", "AMG GT", "EQS", "GLS", "CLA"],
  Porsche: ["911", "Macan", "Cayenne", "Taycan", "Panamera", "718 Cayman", "718 Boxster"],
  Audi: ["Q5", "Q7", "A4", "RS5", "RS6", "e-tron GT", "Q8", "S4", "R8", "A6"],
  Lexus: ["RX", "NX", "GX", "IS", "ES", "LX", "LC", "TX"],
  Toyota: ["RAV4", "Camry", "Tacoma", "4Runner", "Highlander", "Tundra", "Supra", "Corolla", "Grand Highlander", "Sequoia"],
  Honda: ["CR-V", "Accord", "Civic", "Pilot", "Odyssey", "HR-V", "Passport"],
  Ford: ["F-150", "Bronco", "Mustang", "Explorer", "Mach-E", "Raptor", "Expedition", "Maverick", "Super Duty"],
  Chevrolet: ["Corvette", "Silverado", "Tahoe", "Suburban", "Camaro", "Equinox", "Traverse"],
  Jeep: ["Wrangler", "Grand Cherokee", "Gladiator", "Wagoneer", "Grand Wagoneer", "Compass"],
  Rivian: ["R1S", "R1T", "R2"],
  Lucid: ["Air", "Gravity"],
  Hyundai: ["Ioniq 5", "Ioniq 6", "Palisade", "Tucson", "Santa Fe", "Elantra N", "Sonata"],
  Kia: ["Telluride", "EV6", "EV9", "Sorento", "Sportage", "K5", "Carnival"],
  Genesis: ["GV80", "GV70", "G80", "G70", "GV60", "G90"],
  Acura: ["MDX", "RDX", "Integra", "TLX", "NSX"],
  "Land Rover": ["Range Rover", "Range Rover Sport", "Defender", "Range Rover Velar", "Discovery"],
  Volvo: ["XC90", "XC60", "XC40", "EX30", "S60"],
  Subaru: ["Outback", "Forester", "WRX", "Crosstrek", "Ascent", "BRZ"],
  Nissan: ["Rogue", "Pathfinder", "Altima", "Z", "GT-R", "Ariya", "Frontier"],
  Mazda: ["CX-5", "CX-50", "CX-90", "Mazda3", "MX-5 Miata"],
  Volkswagen: ["Atlas", "Tiguan", "GTI", "Golf R", "ID.4", "Jetta"],
  Cadillac: ["Escalade", "Lyriq", "CT5", "XT5", "XT6"],
  GMC: ["Sierra", "Yukon", "Hummer EV", "Acadia"],
  Ram: ["1500", "2500", "TRX"],
  Dodge: ["Charger", "Challenger", "Durango"],
  Infiniti: ["QX60", "QX80", "QX50", "Q50"],
  Polestar: ["Polestar 2", "Polestar 3", "Polestar 4"],
  "Alfa Romeo": ["Giulia", "Stelvio", "Tonale"],
  Mini: ["Cooper", "Countryman"],
  Maserati: ["Grecale", "Levante", "Ghibli", "MC20"],
  Lamborghini: ["Urus", "Huracán", "Revuelto"],
  Ferrari: ["296 GTB", "Roma", "Purosangue", "SF90", "F8"],
  McLaren: ["720S", "750S", "Artura", "GT"],
  Bentley: ["Bentayga", "Continental GT", "Flying Spur"],
  "Rolls-Royce": ["Cullinan", "Ghost", "Spectre", "Wraith"],
  "Aston Martin": ["DBX", "Vantage", "DB12"],
};
export const QUOTE_MAKES = Object.keys(QUOTE_MODELS);

/** The models for whatever make they typed (any casing, "mercedes" finds Mercedes-Benz). */
export function modelsFor(make: string): string[] {
  const m = make.trim().toLowerCase();
  if (!m) return [];
  const key = QUOTE_MAKES.find((k) => k.toLowerCase() === m) || QUOTE_MAKES.find((k) => k.toLowerCase().startsWith(m) || m.startsWith(k.toLowerCase().split(/[\s-]/)[0]));
  return key ? QUOTE_MODELS[key] : [];
}

/** Model years, newest first: next year down to 1990. */
export function quoteYears(now = new Date()): number[] {
  const top = now.getFullYear() + 1;
  return Array.from({ length: top - 1990 + 1 }, (_, i) => top - i);
}
