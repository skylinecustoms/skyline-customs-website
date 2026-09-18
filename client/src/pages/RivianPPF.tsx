/* SKYLINE CUSTOMS — Rivian PPF landing page (URL: /rivian-ppf). Content: client/src/lib/modelPpf.ts */
import VehiclePPFPage from "@/components/VehiclePPFPage";
import { brandBySlug } from "@/lib/modelPpf";

export default function RivianPPF() {
  return <VehiclePPFPage brand={brandBySlug("rivian")!} />;
}
