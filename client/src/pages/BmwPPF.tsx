/* SKYLINE CUSTOMS — Bmw PPF landing page (URL: /bmw-ppf). Content: client/src/lib/modelPpf.ts */
import VehiclePPFPage from "@/components/VehiclePPFPage";
import { brandBySlug } from "@/lib/modelPpf";

export default function BmwPPF() {
  return <VehiclePPFPage brand={brandBySlug("bmw")!} />;
}
