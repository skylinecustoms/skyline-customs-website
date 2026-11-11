/**
 * Quote form embedded on the promo pages, so "Claim my spot" never leaves the page. It is the shared
 * three-step form (QuoteSteps) with the service locked to the deal: the visitor goes car -> contact.
 * Same backend as /get-a-quote (trpc.contact.submit, formId "promo"): the lead lands in GoHighLevel
 * tagged with the promo, with the visitor's page journey in the note.
 */
import { CheckCircle } from "lucide-react";
import WhatHappensNext from "@/components/WhatHappensNext";
import DepositButton from "@/components/DepositButton";
import QuoteSteps, { promoTagFor } from "@/components/QuoteSteps";

export { promoTagFor };

interface Props {
  promoTitle: string;
  /** Slug of the active promo, used for the CRM tag when there is no title. */
  promoSlug: string;
  /** What the deal includes, e.g. "Full Front PPF + Free Ceramic Coating"; goes into the prefilled message. */
  dealDescription: string;
  /** CRM service for the lead; drives the service tag. Defaults to PPF. */
  service?: "PPF" | "Ceramic Coating" | "Tints";
  /** Button text and the line under it. */
  buttonLabel?: string;
  footnote?: string;
  /** The deposit button only applies to the PPF promo. */
  showDeposit?: boolean;
}

export default function PromoQuoteForm({ promoTitle, promoSlug, dealDescription, service = "PPF", buttonLabel = "YES! PROTECT MY PAINT", footnote, showDeposit = true }: Props) {
  const leadService = service === "Ceramic Coating" ? "ceramic" : service === "Tints" ? "tint" : "ppf";
  // Same note the quote page prefilled from promo links, so the CRM note and text read the same.
  const promoNote = `I'm interested in the ${promoTitle} — ${dealDescription}. Please contact me to claim my spot.`;
  return (
    <QuoteSteps
      formId="promo"
      dataForm="promo-quote"
      leadService={leadService}
      presetService={service}
      lockService
      promoTag={promoTagFor(promoTitle, promoSlug)}
      defaultMessage={promoNote}
      title={promoTitle ? `CLAIM YOUR ${promoTitle.toUpperCase()} SPOT` : "CLAIM YOUR SPOT"}
      submitLabel={buttonLabel}
      tosCheckbox={false}
      footnote={footnote ?? "No catch. Just flawless paint, guaranteed 12 years. Nothing to pay now: a fully refundable 20% deposit locks your date only after you approve your exact quote. Pay over time with Klarna, Afterpay, or Affirm."}
      compact
      renderSuccess={(s) => (
        <div className="border border-emerald-800 bg-emerald-900/20 p-6 md:p-8">
          <div className="text-center">
            <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
            <h3 className="font-display text-3xl text-white tracking-wide mb-2">YOU'RE IN</h3>
            <p className="text-zinc-300 text-sm leading-relaxed max-w-md mx-auto">
              We have your request for the {promoTitle || "special"}.
            </p>
            {showDeposit && <DepositButton contactId={s.contactId} firstName={s.firstName} lastName={s.lastName} email={s.email} phone={s.phone} promoTitle={promoTitle || "Special"} vehicle={[s.year, s.make, s.model].filter(Boolean).join(" ")} />}
          </div>
          <WhatHappensNext service={service} className="mt-8 pt-8 border-t border-emerald-900/60" />
        </div>
      )}
    />
  );
}
