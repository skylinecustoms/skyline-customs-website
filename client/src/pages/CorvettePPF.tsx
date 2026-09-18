/* SKYLINE CUSTOMS — Corvette PPF landing page (URL: /corvette-ppf). Content: client/src/lib/modelPpf.ts */
import VehiclePPFPage from "@/components/VehiclePPFPage";
import { brandBySlug } from "@/lib/modelPpf";

export default function CorvettePPF() {
  return <VehiclePPFPage brand={brandBySlug("corvette")!} />;
}
