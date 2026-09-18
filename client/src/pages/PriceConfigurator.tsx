import { useState, useCallback } from "react";
import { Link, useLocation } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { ChevronRight, ChevronLeft, Car, Shield, Droplets, Palette, CheckCircle, Star, Zap, Copy, Check } from "lucide-react";
import { quoteAssistantStore } from "@/components/QuoteAssistant";

// ─── Pricing Data (from official pricing guide) ───
const PRICING = {
  tint: {
    tintx: {
      name: "TintX Film",
      subtitle: "Ceramic Series",
      packages: {
        full_car: { name: "Full Car (All Windows)", price: 400 },
        front: { name: "Front Package", price: 325 },
        rear: { name: "Rear Package", price: 300 },
        frontseat: { name: "Frontseat Package", price: 250 },
        backseat: { name: "Backseat Package", price: 235, popular: true },
        base: { name: "Base (4 Windows)", price: 200 },
        windshield: { name: "Windshield Only", price: 130 },
        rear_glass: { name: "Rear Glass Only", price: 100 },
      },
    },
    geoshield: {
      name: "GeoShield",
      subtitle: "Pro Nano Ceramic",
      packages: {
        full_car: { name: "Premium Full Car", price: 575 },
        front: { name: "Premium Front", price: 450 },
        rear: { name: "Premium Rear", price: 425, popular: true },
        frontseat: { name: "Premium Frontseat", price: 350 },
        backseat: { name: "Premium Backseat", price: 325 },
        base: { name: "Premium Base", price: 280 },
        windshield: { name: "Windshield Only", price: 200 },
        rear_glass: { name: "Rear Glass Only", price: 150 },
      },
    },
    addons: { panoramic: { name: "Panoramic / Sunroof", price: 120 } },
  },
  ceramic: {
    sedan: {
      no_correction: { name: "Ceramic Coating (No Correction)", price: 800, warranty: "7 Year", correction: "None" },
      correction_only: { name: "Paint Correction Only (Stage 2)", price: 600, warranty: "—", correction: "Stage 2" },
      crystal: { name: "Crystal Package (5 Year)", price: 1300, warranty: "5 Year", correction: "Stage 2", savings: 100 },
      ultimate: { name: "Ultimate Coating (7 Year)", price: 1500, warranty: "7 Year", correction: "Stage 3", savings: 100 },
    },
    suv: {
      no_correction: { name: "Ceramic Coating (No Correction)", price: 900, warranty: "7 Year", correction: "None" },
      correction_only: { name: "Paint Correction Only (Stage 2)", price: 700, warranty: "—", correction: "Stage 2" },
      crystal: { name: "Crystal Package (5 Year)", price: 1500, warranty: "5 Year", correction: "Stage 2", savings: 100 },
      ultimate: { name: "Ultimate Coating (7 Year)", price: 1800, warranty: "7 Year", correction: "Stage 3", savings: 100 },
    },
    truck: {
      no_correction: { name: "Ceramic Coating (No Correction)", price: 950, warranty: "7 Year", correction: "None" },
      correction_only: { name: "Paint Correction Only (Stage 2)", price: 750, warranty: "—", correction: "Stage 2" },
      crystal: { name: "Crystal Package (5 Year)", price: 1600, warranty: "5 Year", correction: "Stage 2", savings: 100 },
      ultimate: { name: "Ultimate Coating (7 Year)", price: 1900, warranty: "7 Year", correction: "Stage 3", savings: 100 },
    },
  },
  ppf: {
    sedan: {
      full_front: { name: "Full Front", desc: "Bumper, hood, fenders, mirrors, headlights, A-pillars", price: 2400 },
      partial_front: { name: "Partial Front", desc: "Bumper + partial hood 18\"", price: 1800 },
      windshield_ppf: { name: "Front Windshield PPF", desc: "Full windshield protection", price: 350 },
      full_vehicle: { name: "Full Vehicle PPF", desc: "Complete paint protection", price: 5500 },
      rockers: { name: "Rocker Panels", desc: "Pair", price: 500 },
      door_edges: { name: "Door Edge Guards + Door Cups", desc: "All doors", price: 300 },
      rear_bumper: { name: "Rear Bumper / Trunk Ledge", desc: "Rear protection", price: 400 },
    },
    suv: {
      full_front: { name: "Full Front", desc: "Bumper, hood, fenders, mirrors, headlights, A-pillars", price: 2500 },
      partial_front: { name: "Partial Front", desc: "Bumper + partial hood 18\"", price: 2000 },
      windshield_ppf: { name: "Front Windshield PPF", desc: "Full windshield protection", price: 350 },
      full_vehicle: { name: "Full Vehicle PPF", desc: "Complete paint protection", price: 6500 },
      rockers: { name: "Rocker Panels", desc: "Pair", price: 600 },
      door_edges: { name: "Door Edge Guards + Door Cups", desc: "All doors", price: 400 },
      rear_bumper: { name: "Rear Bumper / Trunk Ledge", desc: "Rear protection", price: 500 },
    },
    truck: {
      full_front: { name: "Full Front", desc: "Bumper, hood, fenders, mirrors, headlights, A-pillars", price: 2750 },
      partial_front: { name: "Partial Front", desc: "Bumper + partial hood 18\"", price: 2500 },
      windshield_ppf: { name: "Front Windshield PPF", desc: "Full windshield protection", price: 350 },
      full_vehicle: { name: "Full Vehicle PPF", desc: "Complete paint protection", price: 7000 },
      rockers: { name: "Rocker Panels", desc: "Pair", price: 650 },
      door_edges: { name: "Door Edge Guards + Door Cups", desc: "All doors", price: 450 },
      rear_bumper: { name: "Rear Bumper / Trunk Ledge", desc: "Rear protection", price: 550 },
      bed: { name: "Bed Area / Tailgate", desc: "Truck bed protection", price: 500 },
    },
  },
  vinyl: {
    sedan: {
      full_wrap: { name: "Full Color Change Wrap", price: 3000 },
      hood: { name: "Hood Wrap", price: 400 },
      roof: { name: "Roof Wrap", price: 400 },
      trunk: { name: "Trunk Wrap", price: 350 },
      mirrors: { name: "Mirror Caps (pair)", price: 150 },
      combo: { name: "Roof + Hood + Mirrors Combo", price: 850 },
      chrome_full: { name: "Full Chrome Delete", price: 600 },
      chrome_partial: { name: "Partial Chrome Delete (window trim)", price: 300 },
    },
    suv: {
      full_wrap: { name: "Full Color Change Wrap", price: 4000 },
      hood: { name: "Hood Wrap", price: 500 },
      roof: { name: "Roof Wrap", price: 500 },
      trunk: { name: "Trunk / Hatch Wrap", price: 400 },
      mirrors: { name: "Mirror Caps (pair)", price: 150 },
      combo: { name: "Roof + Hood + Mirrors Combo", price: 1050 },
      chrome_full: { name: "Full Chrome Delete", price: 800 },
      chrome_partial: { name: "Partial Chrome Delete (window trim)", price: 400 },
    },
    truck: {
      full_wrap: { name: "Full Color Change Wrap", price: 4500 },
      hood: { name: "Hood Wrap", price: 550 },
      roof: { name: "Roof Wrap", price: 500 },
      trunk: { name: "Tailgate Wrap", price: 450 },
      mirrors: { name: "Mirror Caps (pair)", price: 150 },
      combo: { name: "Roof + Hood + Mirrors Combo", price: 1100 },
      chrome_full: { name: "Full Chrome Delete", price: 1000 },
      chrome_partial: { name: "Partial Chrome Delete (window trim)", price: 500 },
    },
  },
};

type VehicleClass = "sedan" | "suv" | "truck";
type TintBrand = "tintx" | "geoshield";

const VEHICLE_TYPES: { id: VehicleClass; label: string; subtitle: string; icon: string }[] = [
  { id: "sedan", label: "Sedan / Coupe", subtitle: "Cars, sports cars, luxury sedans", icon: "🚗" },
  { id: "suv", label: "SUV / Crossover", subtitle: "SUVs, minivans, crossovers", icon: "🚙" },
  { id: "truck", label: "Truck", subtitle: "Pickup trucks, full-size trucks", icon: "🛻" },
];

const SERVICES = [
  { id: "tint", label: "Window Tinting", icon: <Droplets size={20} />, startingAt: 100, color: "oklch(0.6 0.15 240)" },
  { id: "ceramic", label: "Ceramic Coating", icon: <Shield size={20} />, startingAt: 800, color: "oklch(0.6 0.15 60)" },
  { id: "ppf", label: "Paint Protection Film", icon: <Car size={20} />, startingAt: 300, color: "oklch(0.6 0.15 150)" },
  { id: "vinyl", label: "Vinyl Wraps", icon: <Palette size={20} />, startingAt: 150, color: "oklch(0.6 0.15 300)" },
];

function formatPrice(n: number) {
  return "$" + n.toLocaleString();
}

// ─── Bundle Suggestion Logic ───
function getBundleSuggestions(
  vehicleClass: VehicleClass,
  selectedServices: string[],
  tintBrand: TintBrand | null,
  tintPkg: string | null,
  ceramicPkg: string | null,
  ppfSelections: Record<string, boolean>,
  vinylSelections: Record<string, boolean>,
  onApplyBundle: (bundle: BundleAction) => void
) {
  const ec = vehicleClass;
  const tier = PRICING.ceramic[ec];
  const ppfT = PRICING.ppf[ec];
  const geoFull = PRICING.tint.geoshield.packages.full_car.price;
  const geoRear = PRICING.tint.geoshield.packages.rear.price;

  const save2_tintCer = ec === "sedan" ? 75 : 100;
  const save2_ppfCer = ec === "truck" ? 200 : 150;
  const save3_triple = ec === "truck" ? 300 : 250;
  const save5_premium = ec === "sedan" ? 350 : ec === "suv" ? 400 : 450;

  const hasTint = !!tintPkg;
  const hasCeramic = !!ceramicPkg;
  const hasPPFFront = ppfSelections.full_front;
  const askedTint = selectedServices.includes("tint");
  const askedCeramic = selectedServices.includes("ceramic");
  const askedPPF = selectedServices.includes("ppf");

  const bundles: BundleSuggestion[] = [];

  const premiumBundle: BundleSuggestion = {
    id: "up_premium",
    label: "Premium Protection Bundle",
    sublabel: "Full Front PPF + Rockers + Door Edges + 7yr Ceramic + GeoShield Full Tint",
    desc: "Our most popular all-in-one package. Full front PPF guards against chips and rock strikes, rocker panels and door edges add daily-driver protection, Ultimate 7-year ceramic with Stage 3 correction delivers a showroom-level finish, and GeoShield full car tint blocks 70% of heat on every window.",
    price: ppfT.full_front.price + ppfT.rockers.price + ppfT.door_edges.price + tier.ultimate.price + geoFull - save5_premium,
    savings: save5_premium,
    tag: "MOST POPULAR",
    featured: true,
    action: () => onApplyBundle({ tintBrand: "geoshield", tintPkg: "full_car", ceramicPkg: "ultimate", ppf: ["full_front", "rockers", "door_edges"] }),
  };

  // Always show premium bundle first — it's the highest-value upsell
  bundles.push(premiumBundle);

  // Tint only → upsell ceramic + PPF
  if (askedTint && !askedCeramic && !askedPPF && !hasCeramic && !hasPPFFront) {
    bundles.push({
      id: "up_tint_cer",
      label: `Add Ceramic Coating — Save ${formatPrice(save2_tintCer)}`,
      sublabel: "Tint + Crystal Ceramic (5yr warranty + Stage 2 correction)",
      desc: "Already protecting your glass? Add 5-year ceramic coating with Stage 2 paint correction. Hydrophobic finish, deep gloss, and UV protection on every painted surface.",
      price: geoRear + tier.crystal.price - save2_tintCer,
      savings: save2_tintCer,
      tag: "ADD & SAVE",
      action: () => onApplyBundle({ tintBrand: "geoshield", tintPkg: "rear", ceramicPkg: "crystal" }),
    });
    bundles.push({
      id: "up_tint_ppf",
      label: `Add Full Front PPF — Save ${formatPrice(save2_ppfCer)}`,
      sublabel: "Tint + Full Front PPF",
      desc: "Pair your tint with full front PPF — bumper, hood, fenders, mirrors, and headlights all protected from rock chips and road debris. Bundle discount applied.",
      price: geoFull + ppfT.full_front.price - save2_ppfCer,
      savings: save2_ppfCer,
      tag: "CHIP SHIELD",
      action: () => onApplyBundle({ tintBrand: "geoshield", tintPkg: "full_car", ppf: ["full_front"] }),
    });
  }

  // Ceramic only → upsell tint + PPF
  if (askedCeramic && !askedTint && !askedPPF && !hasTint && !hasPPFFront) {
    bundles.push({
      id: "up_cer_tint",
      label: `Add GeoShield Full Car Tint — Save ${formatPrice(save2_tintCer)}`,
      sublabel: "Ceramic + GeoShield Pro Nano Ceramic Tint",
      desc: "Pair your ceramic coating with GeoShield window tint — 70% heat rejection, UV block, and a sleek look. Bundle pricing applied automatically.",
      price: tier.no_correction.price + geoFull - save2_tintCer,
      savings: save2_tintCer,
      tag: "ADD & SAVE",
      action: () => onApplyBundle({ tintBrand: "geoshield", tintPkg: "full_car", ceramicPkg: "no_correction" }),
    });
    bundles.push({
      id: "up_cer_ppf",
      label: `Add Full Front PPF — Save ${formatPrice(save2_ppfCer)}`,
      sublabel: "Ceramic + Full Front PPF",
      desc: "Ceramic protects the finish — PPF stops chips before they happen. Add full front PPF to your ceramic package and get the complete paint defense system.",
      price: tier.no_correction.price + ppfT.full_front.price - save2_ppfCer,
      savings: save2_ppfCer,
      tag: "CHIP SHIELD",
      action: () => onApplyBundle({ ceramicPkg: "no_correction", ppf: ["full_front"] }),
    });
  }

  // PPF only → upsell ceramic + tint
  if (askedPPF && !askedCeramic && !askedTint && !hasCeramic && !hasTint) {
    bundles.push({
      id: "up_ppf_cer",
      label: `Add Ceramic Coating — Save ${formatPrice(save2_ppfCer)}`,
      sublabel: "PPF + Ceramic (no correction)",
      desc: "PPF stops chips, ceramic adds gloss and hydrophobic protection on every panel. Together they're the complete paint defense — and you save ${formatPrice(save2_ppfCer)} when bundled.",
      price: ppfT.full_front.price + tier.no_correction.price - save2_ppfCer,
      savings: save2_ppfCer,
      tag: "ADD & SAVE",
      action: () => onApplyBundle({ ceramicPkg: "no_correction", ppf: ["full_front"] }),
    });
    bundles.push({
      id: "up_ppf_tint",
      label: `Add GeoShield Full Car Tint — Save ${formatPrice(save2_tintCer)}`,
      sublabel: "PPF + GeoShield window tint",
      desc: "Protect the paint with PPF and block heat with GeoShield ceramic tint. A natural combo for any driver who wants total exterior protection.",
      price: ppfT.full_front.price + geoFull - save2_tintCer,
      savings: save2_tintCer,
      tag: "HEAT BLOCK",
      action: () => onApplyBundle({ tintBrand: "geoshield", tintPkg: "full_car", ppf: ["full_front"] }),
    });
  }

  // Multi-service → show 3-service triple bundle
  if ((askedTint && askedCeramic) || (askedTint && askedPPF) || (askedCeramic && askedPPF)) {
    if (!hasPPFFront && !hasCeramic && !hasTint) {
      bundles.push({
        id: "up_multi_triple",
        label: `Full Front PPF + Ceramic + GeoShield Tint — Save ${formatPrice(save3_triple)}`,
        sublabel: "3-service bundle — most popular combo",
        desc: "Full front PPF stops chips, ceramic coating adds a deep gloss and hydrophobic finish, and GeoShield tint blocks 70% of heat. The go-to combo for daily drivers.",
        price: ppfT.full_front.price + tier.no_correction.price + geoFull - save3_triple,
        savings: save3_triple,
        tag: "BEST DEAL",
        action: () => onApplyBundle({ tintBrand: "geoshield", tintPkg: "full_car", ceramicPkg: "no_correction", ppf: ["full_front"] }),
      });
    }
  }

  // Vinyl only → upsell ceramic or tint
  const askedVinyl = selectedServices.includes("vinyl");
  if (askedVinyl && !askedCeramic && !askedTint && !hasCeramic && !hasTint) {
    bundles.push({
      id: "up_vinyl_cer",
      label: `Add Ceramic Coating — Save ${formatPrice(save2_tintCer)}`,
      sublabel: "Vinyl Wrap + Ceramic Coating",
      desc: "Protect your new wrap with a ceramic coating layer — adds UV resistance, hydrophobic properties, and extends the life of your vinyl. Bundle discount applied.",
      price: tier.no_correction.price - save2_tintCer,
      savings: save2_tintCer,
      tag: "PROTECT YOUR WRAP",
      action: () => onApplyBundle({ ceramicPkg: "no_correction" }),
    });
    bundles.push({
      id: "up_vinyl_tint",
      label: `Add GeoShield Full Car Tint — Save ${formatPrice(save2_tintCer)}`,
      sublabel: "Vinyl Wrap + Window Tinting",
      desc: "Complete the look — a fresh wrap pairs perfectly with GeoShield ceramic tint. Blocks 70% of heat, reduces glare, and matches the premium finish of your wrap.",
      price: geoFull - save2_tintCer,
      savings: save2_tintCer,
      tag: "COMPLETE THE LOOK",
      action: () => onApplyBundle({ tintBrand: "geoshield", tintPkg: "full_car" }),
    });
  }

  return bundles;
}

interface BundleSuggestion {
  id: string;
  label: string;
  sublabel: string;
  desc: string;
  price: number;
  savings: number;
  tag: string;
  featured?: boolean;
  action: () => void;
}

interface BundleAction {
  tintBrand?: TintBrand;
  tintPkg?: string;
  ceramicPkg?: string;
  ppf?: string[];
}

export default function PriceConfigurator() {
  const [, navigate] = useLocation();
  const [step, setStep] = useState(0); // 0=vehicle, 1=services, 2=options, 3=summary
  const [vehicleClass, setVehicleClass] = useState<VehicleClass | null>(null);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  // Vehicle details for pre-fill
  const [vehicleYear, setVehicleYear] = useState("");
  const [vehicleMake, setVehicleMake] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");

  // Copy quote state
  const [copied, setCopied] = useState(false);

  // Tint
  const [tintBrand, setTintBrand] = useState<TintBrand | null>(null);
  const [tintPkg, setTintPkg] = useState<string | null>(null);
  const [tintPano, setTintPano] = useState(false);

  // Ceramic
  const [ceramicPkg, setCeramicPkg] = useState<string | null>(null);

  // PPF
  const [ppfSelections, setPpfSelections] = useState<Record<string, boolean>>({});

  // Vinyl
  const [vinylSelections, setVinylSelections] = useState<Record<string, boolean>>({});

  const toggleService = (id: string) => {
    setSelectedServices(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const togglePPF = (key: string) => {
    setPpfSelections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleVinyl = (key: string) => {
    setVinylSelections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const applyBundle = useCallback((bundle: BundleAction) => {
    if (bundle.tintBrand) setTintBrand(bundle.tintBrand);
    if (bundle.tintPkg) setTintPkg(bundle.tintPkg);
    if (bundle.ceramicPkg) setCeramicPkg(bundle.ceramicPkg);
    if (bundle.ppf) {
      const newPPF: Record<string, boolean> = {};
      bundle.ppf.forEach(k => { newPPF[k] = true; });
      setPpfSelections(prev => ({ ...prev, ...newPPF }));
    }
    if (!selectedServices.includes("tint") && bundle.tintPkg) {
      setSelectedServices(prev => Array.from(new Set([...prev, "tint"])));
    }
    if (!selectedServices.includes("ceramic") && bundle.ceramicPkg) {
      setSelectedServices(prev => Array.from(new Set([...prev, "ceramic"])));
    }
    if (!selectedServices.includes("ppf") && bundle.ppf?.length) {
      setSelectedServices(prev => Array.from(new Set([...prev, "ppf"])));
    }
    setStep(3);
  }, [selectedServices]);

  // Calculate total
  const calcTotal = () => {
    let total = 0;
    if (!vehicleClass) return 0;

    if (tintPkg && tintBrand) {
      const pkg = PRICING.tint[tintBrand].packages[tintPkg as keyof typeof PRICING.tint.geoshield.packages];
      if (pkg) total += pkg.price;
    }
    if (tintPano) total += PRICING.tint.addons.panoramic.price;
    if (ceramicPkg) {
      const pkg = PRICING.ceramic[vehicleClass][ceramicPkg as keyof typeof PRICING.ceramic.sedan];
      if (pkg) total += pkg.price;
    }
    Object.entries(ppfSelections).forEach(([key, val]) => {
      if (val) {
        const pkg = PRICING.ppf[vehicleClass][key as keyof typeof PRICING.ppf.sedan];
        if (pkg) total += pkg.price;
      }
    });
    Object.entries(vinylSelections).forEach(([key, val]) => {
      if (val) {
        const pkg = PRICING.vinyl[vehicleClass][key as keyof typeof PRICING.vinyl.sedan];
        if (pkg) total += (pkg as { price: number }).price;
      }
    });
    return total;
  };

  const total = calcTotal();
  const hasSelections = total > 0;

  const bundles = vehicleClass && step >= 2
    ? getBundleSuggestions(vehicleClass, selectedServices, tintBrand, tintPkg, ceramicPkg, ppfSelections, vinylSelections, applyBundle)
    : [];

  const buildQuoteSummary = () => {
    if (!vehicleClass) return "";
    const vehicleLabel = VEHICLE_TYPES.find(v => v.id === vehicleClass)?.label ?? vehicleClass;
    const lines: string[] = [];
    lines.push(`Vehicle: ${vehicleLabel}`);

    if (tintPkg && tintBrand) {
      const pkg = PRICING.tint[tintBrand].packages[tintPkg as keyof typeof PRICING.tint.geoshield.packages];
      if (pkg) lines.push(`Window Tinting: ${PRICING.tint[tintBrand].name} — ${pkg.name} ($${pkg.price.toLocaleString()})`);
    }
    if (tintPano) lines.push(`  + Panoramic/Sunroof Add-on ($${PRICING.tint.addons.panoramic.price.toLocaleString()})`);

    if (ceramicPkg) {
      const pkg = PRICING.ceramic[vehicleClass][ceramicPkg as keyof typeof PRICING.ceramic.sedan];
      if (pkg) lines.push(`Ceramic Coating: ${pkg.name} ($${pkg.price.toLocaleString()})`);
    }

    Object.entries(ppfSelections).forEach(([key, val]) => {
      if (val) {
        const pkg = PRICING.ppf[vehicleClass][key as keyof typeof PRICING.ppf.sedan];
        if (pkg) lines.push(`PPF: ${pkg.name} ($${pkg.price.toLocaleString()})`);
      }
    });

    Object.entries(vinylSelections).forEach(([key, val]) => {
      if (val) {
        const pkg = PRICING.vinyl[vehicleClass][key as keyof typeof PRICING.vinyl.sedan];
        if (pkg) lines.push(`Vinyl: ${(pkg as { name: string }).name} ($${(pkg as { price: number }).price.toLocaleString()})`);
      }
    });

    lines.push(``);
    lines.push(`Estimated Total: $${total.toLocaleString()}`);
    lines.push(`(Final price confirmed after in-person inspection)`);
    return lines.join("\n");
  };

  const handleGetQuote = () => {
    // Store vehicle info so GetAQuote can pre-fill name/contact fields too
    quoteAssistantStore.formData = {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      year: vehicleYear,
      make: vehicleMake,
      model: vehicleModel,
      service: selectedServices[0] ?? "",
    };
    // Build the pre-fill query string
    // If 2+ services selected, use "multiple" so the form picks the bundle radio
    const service = selectedServices.length > 1 ? "multiple" : (selectedServices[0] ?? "");
    const summary = encodeURIComponent(buildQuoteSummary());
    navigate(`/get-a-quote?service=${service}&summary=${summary}&year=${encodeURIComponent(vehicleYear)}&make=${encodeURIComponent(vehicleMake)}&model=${encodeURIComponent(vehicleModel)}`);
  };

  const steps = ["Vehicle", "Services", "Options", "Summary"];

  return (
    <>
      <SEO
        title="Build Your Custom Quote | Skyline Customs — Chantilly VA"
        description="Get an instant price estimate for PPF, ceramic coating, window tinting, and vinyl wraps. Select your vehicle type and services to see real pricing with bundle savings."
        canonical="https://www.skylinecustomshop.com/configure"
      />
      <div className="min-h-screen bg-[oklch(0.07_0.005_285)] text-[oklch(0.92_0.008_285)]">
        <Navbar />

        <div className="pt-24 pb-20">
          <div className="max-w-3xl mx-auto px-4">

            {/* Header */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 bg-[oklch(0.12_0.008_285)] border border-[oklch(0.22_0.006_285)] rounded-full px-4 py-1.5 mb-4">
                <Zap size={13} className="text-brand-orange" />
                <span className="font-mono-brand text-xs text-[oklch(0.55_0.01_285)] uppercase tracking-widest">Instant Price Estimate</span>
              </div>
              <h1 className="font-display text-4xl md:text-5xl text-[oklch(0.96_0.008_85)] tracking-wider mb-3">
                BUILD YOUR QUOTE
              </h1>
              <p className="text-[oklch(0.55_0.01_285)] text-base max-w-md mx-auto">
                Select your vehicle and services for a personalized estimate — tailored to your exact needs.
              </p>
            </div>

            {/* Step Indicator */}
            <div className="flex items-center justify-center gap-0 mb-10">
              {steps.map((label, i) => (
                <div key={i} className="flex items-center">
                  <button
                    onClick={() => { if (i < step) setStep(i); }}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono-brand uppercase tracking-wider transition-all ${
                      i === step
                        ? "bg-brand-orange text-white"
                        : i < step
                        ? "text-brand-orange cursor-pointer hover:text-[oklch(0.96_0.008_85)]"
                        : "text-[oklch(0.35_0.008_285)] cursor-default"
                    }`}
                  >
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold border ${
                      i === step ? "bg-white text-brand-orange border-white" :
                      i < step ? "bg-brand-orange/20 border-brand-orange text-brand-orange" :
                      "border-[oklch(0.25_0.006_285)] text-[oklch(0.35_0.008_285)]"
                    }`}>{i < step ? "✓" : i + 1}</span>
                    <span className="hidden sm:inline">{label}</span>
                  </button>
                  {i < steps.length - 1 && (
                    <div className={`w-8 h-px mx-1 ${i < step ? "bg-brand-orange" : "bg-[oklch(0.20_0.006_285)]"}`} />
                  )}
                </div>
              ))}
            </div>

            {/* Step 0: Vehicle Type */}
            {step === 0 && (
              <div>
                <h2 className="font-display text-2xl text-[oklch(0.96_0.008_85)] tracking-wider mb-2">YOUR VEHICLE</h2>
                <p className="text-[oklch(0.55_0.01_285)] text-sm mb-6">Select your vehicle type and enter your vehicle details for accurate pricing</p>

                {/* Year / Make / Model */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div>
                    <label className="block text-xs text-[oklch(0.55_0.01_285)] uppercase tracking-wider mb-1.5">Year</label>
                    <input
                      type="text"
                      placeholder="e.g. 2023"
                      value={vehicleYear}
                      onChange={e => setVehicleYear(e.target.value)}
                      maxLength={4}
                      className="w-full bg-[oklch(0.10_0.005_285)] border border-[oklch(0.20_0.006_285)] text-[oklch(0.92_0.008_285)] placeholder-[oklch(0.35_0.008_285)] text-sm px-3 py-2.5 rounded-lg focus:outline-none focus:border-brand-orange transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[oklch(0.55_0.01_285)] uppercase tracking-wider mb-1.5">Make</label>
                    <input
                      type="text"
                      placeholder="e.g. BMW"
                      value={vehicleMake}
                      onChange={e => setVehicleMake(e.target.value)}
                      className="w-full bg-[oklch(0.10_0.005_285)] border border-[oklch(0.20_0.006_285)] text-[oklch(0.92_0.008_285)] placeholder-[oklch(0.35_0.008_285)] text-sm px-3 py-2.5 rounded-lg focus:outline-none focus:border-brand-orange transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[oklch(0.55_0.01_285)] uppercase tracking-wider mb-1.5">Model</label>
                    <input
                      type="text"
                      placeholder="e.g. M3"
                      value={vehicleModel}
                      onChange={e => setVehicleModel(e.target.value)}
                      className="w-full bg-[oklch(0.10_0.005_285)] border border-[oklch(0.20_0.006_285)] text-[oklch(0.92_0.008_285)] placeholder-[oklch(0.35_0.008_285)] text-sm px-3 py-2.5 rounded-lg focus:outline-none focus:border-brand-orange transition-colors"
                    />
                  </div>
                </div>

                {/* Vehicle Type */}
                <p className="text-xs text-[oklch(0.55_0.01_285)] uppercase tracking-wider mb-3">Vehicle Type</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  {VEHICLE_TYPES.map(v => (
                    <button
                      key={v.id}
                      onClick={() => setVehicleClass(v.id)}
                      className={`p-5 rounded-xl border text-left transition-all hover:border-brand-orange group ${
                        vehicleClass === v.id
                          ? "border-brand-orange bg-brand-orange/10"
                          : "border-[oklch(0.20_0.006_285)] bg-[oklch(0.10_0.005_285)] hover:bg-[oklch(0.12_0.005_285)]"
                      }`}
                    >
                      <div className="font-display text-base text-[oklch(0.96_0.008_85)] tracking-wider mb-1">{v.label}</div>
                      <div className="text-xs text-[oklch(0.45_0.008_285)]">{v.subtitle}</div>
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => { if (vehicleClass) setStep(1); }}
                  disabled={!vehicleClass}
                  className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-brand-orange text-white rounded-lg font-semibold text-sm hover:bg-brand-orange/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Continue <ChevronRight size={16} />
                </button>
              </div>
            )}

            {/* Step 1: Services */}
            {step === 1 && vehicleClass && (
              <div>
                <h2 className="font-display text-2xl text-[oklch(0.96_0.008_85)] tracking-wider mb-2">SELECT SERVICES</h2>
                <p className="text-[oklch(0.55_0.01_285)] text-sm mb-6">Choose one or more services — bundle discounts apply automatically</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {SERVICES.map(s => {
                    const isSelected = selectedServices.includes(s.id);
                    return (
                      <button
                        key={s.id}
                        onClick={() => toggleService(s.id)}
                        className={`p-5 rounded-xl border text-left transition-all ${
                          isSelected
                            ? "border-brand-orange bg-brand-orange/10"
                            : "border-[oklch(0.20_0.006_285)] bg-[oklch(0.10_0.005_285)] hover:border-[oklch(0.35_0.008_285)]"
                        }`}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isSelected ? "bg-brand-orange text-white" : "bg-[oklch(0.15_0.006_285)] text-[oklch(0.55_0.01_285)]"}`}>
                            {s.icon}
                          </div>
                          {isSelected && <CheckCircle size={18} className="text-brand-orange mt-1" />}
                        </div>
                        <div className="font-display text-base text-[oklch(0.96_0.008_85)] tracking-wider mb-1">{s.label}</div>
                        <div className="font-mono-brand text-xs text-brand-orange">Starting at {formatPrice(s.startingAt)}</div>
                      </button>
                    );
                  })}
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setStep(0)} className="flex items-center gap-2 px-5 py-3 border border-[oklch(0.25_0.006_285)] text-[oklch(0.55_0.01_285)] rounded-lg hover:text-[oklch(0.92_0.008_285)] transition-colors text-sm">
                    <ChevronLeft size={16} /> Back
                  </button>
                  <button
                    onClick={() => setStep(2)}
                    disabled={selectedServices.length === 0}
                    className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-brand-orange text-white rounded-lg font-semibold text-sm hover:bg-brand-orange/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Continue <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Options */}
            {step === 2 && vehicleClass && (
              <div>
                <h2 className="font-display text-2xl text-[oklch(0.96_0.008_85)] tracking-wider mb-2">CHOOSE PACKAGES</h2>
                <p className="text-[oklch(0.55_0.01_285)] text-sm mb-6">Select packages below — or apply a bundle to maximize your savings</p>

                {/* Bundle Suggestions — shown at TOP for maximum visibility */}
                {bundles.length > 0 && (
                  <div className="mb-8">
                    <div className="flex items-center gap-2 mb-3">
                      <Zap size={14} className="text-brand-orange" />
                      <span className="font-mono-brand text-xs text-brand-orange uppercase tracking-widest">Bundle Deals — Apply in One Click</span>
                    </div>
                    <div className="space-y-3">
                      {bundles.map(b => (
                        <div
                          key={b.id}
                          className={`rounded-xl border p-4 ${
                            b.featured
                              ? "border-brand-orange bg-gradient-to-br from-brand-orange/15 to-brand-orange/5 shadow-[0_0_20px_rgba(232,93,4,0.15)]"
                              : "border-brand-orange/30 bg-brand-orange/5"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3 mb-2">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1 flex-wrap">
                                <span className={`text-[10px] font-mono-brand font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                                  b.featured
                                    ? "bg-brand-orange text-white"
                                    : "bg-brand-orange/20 text-brand-orange"
                                }`}>{b.tag}</span>
                                {b.featured && <span className="text-[10px] text-emerald-400 font-mono-brand uppercase tracking-wider">Save {formatPrice(b.savings)}</span>}
                              </div>
                              <div className={`font-semibold mb-0.5 ${
                                b.featured ? "text-base text-white" : "text-sm text-[oklch(0.92_0.008_285)]"
                              }`}>{b.label}</div>
                              <div className="text-xs text-[oklch(0.55_0.01_285)]">{b.sublabel}</div>
                            </div>
                            <div className="text-right shrink-0">
                              <div className={`font-mono-brand font-bold text-brand-orange ${
                                b.featured ? "text-xl" : "text-base"
                              }`}>{formatPrice(b.price)}</div>
                              {!b.featured && <div className="text-xs text-emerald-400">Save {formatPrice(b.savings)}</div>}
                            </div>
                          </div>
                          {b.featured && <p className="text-xs text-[oklch(0.60_0.008_285)] mb-3 leading-relaxed">{b.desc}</p>}
                          <button
                            onClick={b.action}
                            className={`w-full py-2.5 px-4 text-xs font-bold rounded-lg transition-colors uppercase tracking-wider ${
                              b.featured
                                ? "bg-brand-orange text-white hover:bg-brand-orange/90"
                                : "bg-brand-orange/15 text-brand-orange border border-brand-orange/40 hover:bg-brand-orange hover:text-white"
                            }`}
                          >
                            {b.featured ? "Apply Bundle — Best Value" : "Apply Bundle"}
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center gap-3 mt-4 mb-2">
                      <div className="flex-1 h-px bg-[oklch(0.18_0.005_285)]" />
                      <span className="text-[10px] text-[oklch(0.35_0.008_285)] uppercase tracking-wider font-mono-brand">or customize individually</span>
                      <div className="flex-1 h-px bg-[oklch(0.18_0.005_285)]" />
                    </div>
                  </div>
                )}

                <div className="space-y-8">
                  {/* Tint Options */}
                  {selectedServices.includes("tint") && (
                    <div>
                      <h3 className="font-display text-lg text-[oklch(0.96_0.008_85)] tracking-wider mb-1 flex items-center gap-2">
                        <Droplets size={16} className="text-brand-orange" /> WINDOW TINTING
                      </h3>
                      <p className="text-xs text-[oklch(0.45_0.008_285)] mb-4">Choose your film brand, then select a package</p>

                      {/* Brand Selection */}
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        {(["tintx", "geoshield"] as TintBrand[]).map(brand => (
                          <button
                            key={brand}
                            onClick={() => { setTintBrand(brand); setTintPkg(null); }}
                            className={`p-4 rounded-lg border text-left transition-all ${
                              tintBrand === brand ? "border-brand-orange bg-brand-orange/10" : "border-[oklch(0.20_0.006_285)] bg-[oklch(0.10_0.005_285)] hover:border-[oklch(0.30_0.006_285)]"
                            }`}
                          >
                            <div className="font-semibold text-sm text-[oklch(0.92_0.008_285)]">{PRICING.tint[brand].name}</div>
                            <div className="text-xs text-[oklch(0.45_0.008_285)]">{PRICING.tint[brand].subtitle}</div>
                          </button>
                        ))}
                      </div>

                      {/* Package Selection */}
                      {tintBrand && (
                        <div className="space-y-2">
                          {Object.entries(PRICING.tint[tintBrand].packages).map(([key, pkg]) => (
                            <button
                              key={key}
                              onClick={() => setTintPkg(tintPkg === key ? null : key)}
                              className={`w-full flex items-center justify-between p-4 rounded-lg border transition-all ${
                                tintPkg === key ? "border-brand-orange bg-brand-orange/10" : "border-[oklch(0.18_0.005_285)] bg-[oklch(0.10_0.005_285)] hover:border-[oklch(0.28_0.006_285)]"
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${tintPkg === key ? "border-brand-orange bg-brand-orange" : "border-[oklch(0.30_0.006_285)]"}`}>
                                  {tintPkg === key && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                                </div>
                                <div className="text-left">
                                  <div className="text-sm text-[oklch(0.92_0.008_285)] font-medium">{pkg.name}</div>
                                  {"popular" in pkg && pkg.popular && <span className="text-[10px] text-brand-orange font-mono-brand uppercase tracking-wider">Most Popular</span>}
                                </div>
                              </div>
                              <span className="font-mono-brand text-sm text-brand-orange font-bold">{formatPrice(pkg.price)}</span>
                            </button>
                          ))}
                          <button
                            onClick={() => setTintPano(!tintPano)}
                            className={`w-full flex items-center justify-between p-4 rounded-lg border transition-all ${
                              tintPano ? "border-brand-orange bg-brand-orange/10" : "border-[oklch(0.18_0.005_285)] bg-[oklch(0.10_0.005_285)] hover:border-[oklch(0.28_0.006_285)]"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${tintPano ? "border-brand-orange bg-brand-orange" : "border-[oklch(0.30_0.006_285)]"}`}>
                                {tintPano && <div className="text-white text-[10px] font-bold">✓</div>}
                              </div>
                              <span className="text-sm text-[oklch(0.92_0.008_285)]">+ Panoramic / Sunroof Add-on</span>
                            </div>
                            <span className="font-mono-brand text-sm text-brand-orange font-bold">+{formatPrice(PRICING.tint.addons.panoramic.price)}</span>
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Ceramic Options */}
                  {selectedServices.includes("ceramic") && (
                    <div>
                      <h3 className="font-display text-lg text-[oklch(0.96_0.008_85)] tracking-wider mb-1 flex items-center gap-2">
                        <Shield size={16} className="text-brand-orange" /> CERAMIC COATING
                      </h3>
                      <p className="text-xs text-[oklch(0.45_0.008_285)] mb-4">Select a package for your {vehicleClass}</p>
                      <div className="space-y-2">
                        {Object.entries(PRICING.ceramic[vehicleClass]).map(([key, pkg]) => (
                          <button
                            key={key}
                            onClick={() => setCeramicPkg(ceramicPkg === key ? null : key)}
                            className={`w-full flex items-center justify-between p-4 rounded-lg border transition-all ${
                              ceramicPkg === key ? "border-brand-orange bg-brand-orange/10" : "border-[oklch(0.18_0.005_285)] bg-[oklch(0.10_0.005_285)] hover:border-[oklch(0.28_0.006_285)]"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${ceramicPkg === key ? "border-brand-orange bg-brand-orange" : "border-[oklch(0.30_0.006_285)]"}`}>
                                {ceramicPkg === key && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                              </div>
                              <div className="text-left">
                                <div className="text-sm text-[oklch(0.92_0.008_285)] font-medium">{pkg.name}</div>
                                <div className="text-xs text-[oklch(0.45_0.008_285)]">
                                  {pkg.correction !== "None" && pkg.correction !== "—" && `${pkg.correction} correction included`}
                                  {pkg.warranty !== "—" && ` · ${pkg.warranty} warranty`}
                                </div>
                                {"savings" in pkg && pkg.savings && (
                                  <span className="text-[10px] text-emerald-400 font-mono-brand uppercase tracking-wider">Save {formatPrice(pkg.savings)} vs. separate</span>
                                )}
                              </div>
                            </div>
                            <span className="font-mono-brand text-sm text-brand-orange font-bold">{formatPrice(pkg.price)}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* PPF Options */}
                  {selectedServices.includes("ppf") && (
                    <div>
                      <h3 className="font-display text-lg text-[oklch(0.96_0.008_85)] tracking-wider mb-1 flex items-center gap-2">
                        <Car size={16} className="text-brand-orange" /> PAINT PROTECTION FILM
                      </h3>
                      <p className="text-xs text-[oklch(0.45_0.008_285)] mb-4">Select one or more PPF zones for your {vehicleClass}</p>
                      <div className="space-y-2">
                        {Object.entries(PRICING.ppf[vehicleClass]).map(([key, pkg]) => (
                          <button
                            key={key}
                            onClick={() => togglePPF(key)}
                            className={`w-full flex items-center justify-between p-4 rounded-lg border transition-all ${
                              ppfSelections[key] ? "border-brand-orange bg-brand-orange/10" : "border-[oklch(0.18_0.005_285)] bg-[oklch(0.10_0.005_285)] hover:border-[oklch(0.28_0.006_285)]"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${ppfSelections[key] ? "border-brand-orange bg-brand-orange" : "border-[oklch(0.30_0.006_285)]"}`}>
                                {ppfSelections[key] && <div className="text-white text-[10px] font-bold">✓</div>}
                              </div>
                              <div className="text-left">
                                <div className="text-sm text-[oklch(0.92_0.008_285)] font-medium">{pkg.name}</div>
                                <div className="text-xs text-[oklch(0.45_0.008_285)]">{"desc" in pkg ? pkg.desc : ""}</div>
                              </div>
                            </div>
                            <span className="font-mono-brand text-sm text-brand-orange font-bold">{formatPrice(pkg.price)}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Vinyl Options */}
                  {selectedServices.includes("vinyl") && (
                    <div>
                      <h3 className="font-display text-lg text-[oklch(0.96_0.008_85)] tracking-wider mb-1 flex items-center gap-2">
                        <Palette size={16} className="text-brand-orange" /> VINYL WRAPS
                      </h3>
                      <p className="text-xs text-[oklch(0.45_0.008_285)] mb-4">Select one or more vinyl wrap options for your {vehicleClass}</p>
                      <div className="space-y-2">
                        {Object.entries(PRICING.vinyl[vehicleClass]).map(([key, pkg]) => (
                          <button
                            key={key}
                            onClick={() => toggleVinyl(key)}
                            className={`w-full flex items-center justify-between p-4 rounded-lg border transition-all ${
                              vinylSelections[key] ? "border-brand-orange bg-brand-orange/10" : "border-[oklch(0.18_0.005_285)] bg-[oklch(0.10_0.005_285)] hover:border-[oklch(0.28_0.006_285)]"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${vinylSelections[key] ? "border-brand-orange bg-brand-orange" : "border-[oklch(0.30_0.006_285)]"}`}>
                                {vinylSelections[key] && <div className="text-white text-[10px] font-bold">✓</div>}
                              </div>
                              <span className="text-sm text-[oklch(0.92_0.008_285)] font-medium">{pkg.name}</span>
                            </div>
                            <span className="font-mono-brand text-sm text-brand-orange font-bold">{formatPrice(pkg.price)}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex gap-3 mt-8">
                  <button onClick={() => setStep(1)} className="flex items-center gap-2 px-5 py-3 border border-[oklch(0.25_0.006_285)] text-[oklch(0.55_0.01_285)] rounded-lg hover:text-[oklch(0.92_0.008_285)] transition-colors text-sm">
                    <ChevronLeft size={16} /> Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-brand-orange text-white rounded-lg font-semibold text-sm hover:bg-brand-orange/90 transition-colors"
                  >
                    View Summary <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Summary */}
            {step === 3 && vehicleClass && (
              <div>
                <h2 className="font-display text-2xl text-[oklch(0.96_0.008_85)] tracking-wider mb-2">YOUR ESTIMATE</h2>
                <p className="text-[oklch(0.55_0.01_285)] text-sm mb-6">Review your selections — we'll pre-fill everything into your quote request</p>

                <div className="bg-[oklch(0.10_0.005_285)] border border-[oklch(0.20_0.006_285)] rounded-xl p-6 mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Car size={20} className="text-brand-orange flex-shrink-0" />
                    <div>
                      <div className="font-display text-lg text-[oklch(0.96_0.008_85)] tracking-wider">
                        {[vehicleYear, vehicleMake, vehicleModel].filter(Boolean).join(" ") || VEHICLE_TYPES.find(v => v.id === vehicleClass)?.label}
                      </div>
                      <div className="text-xs text-[oklch(0.45_0.008_285)]">{VEHICLE_TYPES.find(v => v.id === vehicleClass)?.label}</div>
                    </div>
                  </div>

                  <div className="space-y-3 border-t border-[oklch(0.18_0.005_285)] pt-4">
                    {/* Tint line items */}
                    {tintPkg && tintBrand && (() => {
                      const pkg = PRICING.tint[tintBrand].packages[tintPkg as keyof typeof PRICING.tint.geoshield.packages];
                      return pkg ? (
                        <div className="flex justify-between text-sm">
                          <span className="text-[oklch(0.70_0.008_285)]">{PRICING.tint[tintBrand].name} — {pkg.name}</span>
                          <span className="font-mono-brand text-brand-orange font-bold">{formatPrice(pkg.price)}</span>
                        </div>
                      ) : null;
                    })()}
                    {tintPano && (
                      <div className="flex justify-between text-sm">
                        <span className="text-[oklch(0.70_0.008_285)]">+ Panoramic / Sunroof</span>
                        <span className="font-mono-brand text-brand-orange font-bold">{formatPrice(PRICING.tint.addons.panoramic.price)}</span>
                      </div>
                    )}

                    {/* Ceramic line items */}
                    {ceramicPkg && (() => {
                      const pkg = PRICING.ceramic[vehicleClass][ceramicPkg as keyof typeof PRICING.ceramic.sedan];
                      return pkg ? (
                        <div className="flex justify-between text-sm">
                          <span className="text-[oklch(0.70_0.008_285)]">{pkg.name}</span>
                          <span className="font-mono-brand text-brand-orange font-bold">{formatPrice(pkg.price)}</span>
                        </div>
                      ) : null;
                    })()}

                    {/* PPF line items */}
                    {Object.entries(ppfSelections).filter(([, v]) => v).map(([key]) => {
                      const pkg = PRICING.ppf[vehicleClass][key as keyof typeof PRICING.ppf.sedan];
                      return pkg ? (
                        <div key={key} className="flex justify-between text-sm">
                          <span className="text-[oklch(0.70_0.008_285)]">PPF — {pkg.name}</span>
                          <span className="font-mono-brand text-brand-orange font-bold">{formatPrice(pkg.price)}</span>
                        </div>
                      ) : null;
                    })}

                    {/* Vinyl line items */}
                    {Object.entries(vinylSelections).filter(([, v]) => v).map(([key]) => {
                      const pkg = PRICING.vinyl[vehicleClass][key as keyof typeof PRICING.vinyl.sedan];
                      return pkg ? (
                        <div key={key} className="flex justify-between text-sm">
                          <span className="text-[oklch(0.70_0.008_285)]">Vinyl — {(pkg as { name: string }).name}</span>
                          <span className="font-mono-brand text-brand-orange font-bold">{formatPrice((pkg as { price: number }).price)}</span>
                        </div>
                      ) : null;
                    })}

                    {!hasSelections && (
                      <div className="text-sm text-[oklch(0.45_0.008_285)] text-center py-2">No packages selected yet — go back to choose options</div>
                    )}
                  </div>

                  {hasSelections && (
                    <div className="border-t border-[oklch(0.25_0.006_285)] mt-4 pt-4 flex justify-between items-center">
                      <span className="font-display text-lg text-[oklch(0.96_0.008_85)] tracking-wider">ESTIMATED TOTAL</span>
                      <span className="font-mono-brand text-2xl text-brand-orange font-bold">{formatPrice(total)}</span>
                    </div>
                  )}
                </div>

                {/* Bundle upsells on summary — premium bundle is dominant CTA */}
                {bundles.length > 0 && (
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Zap size={14} className="text-brand-orange" />
                      <span className="font-mono-brand text-xs text-brand-orange uppercase tracking-widest">Upgrade & Save More</span>
                    </div>
                    <div className="space-y-3">
                      {bundles.map((b, i) => (
                        <div
                          key={b.id}
                          className={`rounded-xl border p-4 ${
                            b.featured
                              ? "border-brand-orange bg-gradient-to-br from-brand-orange/15 to-brand-orange/5 shadow-[0_0_20px_rgba(232,93,4,0.15)]"
                              : "border-brand-orange/25 bg-brand-orange/5"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3 mb-2">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1 flex-wrap">
                                <span className={`text-[10px] font-mono-brand font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                                  b.featured ? "bg-brand-orange text-white" : "bg-brand-orange/20 text-brand-orange"
                                }`}>{b.tag}</span>
                                <span className="text-[10px] text-emerald-400 font-mono-brand">Save {formatPrice(b.savings)}</span>
                              </div>
                              <div className={`font-semibold mb-0.5 ${
                                b.featured ? "text-base text-white" : "text-sm text-[oklch(0.92_0.008_285)]"
                              }`}>{b.label}</div>
                              <div className="text-xs text-[oklch(0.50_0.008_285)]">{b.sublabel}</div>
                            </div>
                            <div className="text-right shrink-0">
                              <div className={`font-mono-brand font-bold text-brand-orange ${
                                b.featured ? "text-xl" : "text-sm"
                              }`}>{formatPrice(b.price)}</div>
                            </div>
                          </div>
                          {b.featured && (
                            <p className="text-xs text-[oklch(0.55_0.008_285)] mb-3 leading-relaxed">{b.desc}</p>
                          )}
                          <button
                            onClick={b.action}
                            className={`w-full py-2.5 px-4 text-xs font-bold rounded-lg transition-colors uppercase tracking-wider ${
                              b.featured
                                ? "bg-brand-orange text-white hover:bg-brand-orange/90"
                                : "bg-brand-orange/15 text-brand-orange border border-brand-orange/40 hover:bg-brand-orange hover:text-white"
                            }`}
                          >
                            {b.featured ? "Upgrade to Premium Bundle" : "Apply Bundle"}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Copy Quote */}
                {hasSelections && (
                  <div className="flex items-center justify-between bg-[oklch(0.10_0.005_285)] border border-[oklch(0.20_0.006_285)] rounded-lg px-4 py-3 mb-4">
                    <div>
                      <p className="text-xs font-semibold text-[oklch(0.75_0.008_285)] uppercase tracking-wider">Copy Your Quote</p>
                      <p className="text-[10px] text-[oklch(0.45_0.008_285)] mt-0.5">Copy the full estimate to your clipboard</p>
                    </div>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(buildQuoteSummary()).then(() => {
                          setCopied(true);
                          setTimeout(() => setCopied(false), 2500);
                        });
                      }}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                        copied
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                          : "bg-[oklch(0.15_0.006_285)] text-[oklch(0.75_0.008_285)] border border-[oklch(0.25_0.006_285)] hover:border-brand-orange hover:text-brand-orange"
                      }`}
                    >
                      {copied ? <Check size={14} /> : <Copy size={14} />}
                      {copied ? "Copied!" : "Copy"}
                    </button>
                  </div>
                )}

                {/* Disclaimer */}
                <p className="text-xs text-[oklch(0.40_0.008_285)] mb-6 leading-relaxed">
                  * This is an estimate based on standard pricing. Final price may vary based on vehicle condition, paint correction needs, and specific model dimensions. Contact us for an exact quote.
                </p>

                <div className="flex gap-3">
                  <button onClick={() => setStep(2)} className="flex items-center gap-2 px-5 py-3 border border-[oklch(0.25_0.006_285)] text-[oklch(0.55_0.01_285)] rounded-lg hover:text-[oklch(0.92_0.008_285)] transition-colors text-sm">
                    <ChevronLeft size={16} /> Edit
                  </button>
                  <button
                    onClick={handleGetQuote}
                    disabled={!hasSelections}
                    className="flex-1 flex items-center justify-center gap-2 px-5 py-4 bg-brand-orange text-white rounded-lg font-bold text-base hover:bg-brand-orange/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Submit for Quote <ChevronRight size={16} />
                  </button>
                </div>

                {/* View full pricing table link removed — pricing page temporarily hidden */}
              </div>
            )}
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
