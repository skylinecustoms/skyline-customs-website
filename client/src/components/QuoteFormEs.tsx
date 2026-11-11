/**
 * Spanish quote form: the shared three-step form (QuoteSteps) in Spanish. Same backend as every other
 * form (trpc.contact.submit): the lead lands in GoHighLevel with the usual tags plus "spanish-speaker",
 * so the shop knows to call back in Spanish. Half-finished forms are captured the same way as the English ones.
 */
import { CheckCircle, Phone } from "lucide-react";
import QuoteSteps, { promoTagFor } from "@/components/QuoteSteps";
import DepositButton from "@/components/DepositButton";
import type { EsUi } from "@/lib/es";

interface Props {
  ui: EsUi["form"];
  /** Value the CRM understands: "PPF" | "Ceramic Coating" | "Tints". */
  service: "PPF" | "Ceramic Coating" | "Tints";
  /** When set, the lead is a promo lead: tagged with the promo and prefilled. */
  promo?: { title: string; slug: string; note: string };
}

export default function QuoteFormEs({ ui, service, promo }: Props) {
  return (
    <QuoteSteps
      formId={promo ? "promo" : "quote"}
      dataForm={promo ? "promo-quote-es" : "quote-es"}
      leadService={service.toLowerCase()}
      presetService={service}
      lockService={!!promo}
      promoTag={promo ? promoTagFor(promo.title, promo.slug) : undefined}
      defaultMessage={promo?.note ?? ""}
      lang="es"
      esUi={ui}
      compact
      renderSuccess={(s) => (
        <div className="border border-emerald-800 bg-emerald-900/20 p-8 text-center">
          <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
          <h3 className="font-display text-3xl text-white tracking-wide mb-2">{ui.successTitle}</h3>
          <p className="text-zinc-300 text-sm leading-relaxed max-w-md mx-auto">{ui.successBody}</p>
          {promo && <DepositButton lang="es" contactId={s.contactId} firstName={s.firstName} lastName={s.lastName} email={s.email} phone={s.phone} promoTitle={promo.title} vehicle={[s.year, s.make, s.model].filter(Boolean).join(" ")} />}
          <a href="tel:+17037754383" className="inline-flex items-center gap-2 mt-6 text-[#E85D04] font-bold tracking-widest uppercase text-sm underline underline-offset-2 decoration-1 hover:decoration-2">
            <Phone className="w-4 h-4" /> (703) 775-4383
          </a>
        </div>
      )}
    />
  );
}
