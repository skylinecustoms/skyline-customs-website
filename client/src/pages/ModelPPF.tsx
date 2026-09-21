import ModelPPFPage from "@/components/ModelPPFPage";
import NotFound from "@/pages/NotFound";
import { modelPageBySlug } from "@/lib/modelPages";

export default function ModelPPF({ slug }: { slug: string }) {
  const model = modelPageBySlug(slug);
  return model ? <ModelPPFPage model={model} /> : <NotFound />;
}
