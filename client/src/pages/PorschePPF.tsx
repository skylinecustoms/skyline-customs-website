/* SKYLINE CUSTOMS — Porsche PPF landing page (URL: /porsche-ppf). Content: client/src/lib/modelPpf.ts */
import VehiclePPFPage from "@/components/VehiclePPFPage";
import { brandBySlug } from "@/lib/modelPpf";

export default function PorschePPF() {
  return <VehiclePPFPage brand={brandBySlug("porsche")!} />;
}
