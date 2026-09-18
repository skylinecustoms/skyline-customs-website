/* SKYLINE CUSTOMS — Bronco PPF landing page (URL: /bronco-ppf). Content: client/src/lib/modelPpf.ts */
import VehiclePPFPage from "@/components/VehiclePPFPage";
import { brandBySlug } from "@/lib/modelPpf";

export default function BroncoPPF() {
  return <VehiclePPFPage brand={brandBySlug("bronco")!} />;
}
