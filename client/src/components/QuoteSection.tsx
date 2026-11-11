/**
 * In-page quote section: a short pitch on the left, the shared three-step form (QuoteSteps, compact) on the
 * right, so a visitor on a city, brand, model or home page gets a price without leaving the page.
 * Anchor: #get-quote (the page's own "Get a quote" buttons scroll here).
 */
import type { ReactNode } from "react";
import { CheckCircle, Phone } from "lucide-react";
import QuoteSteps, { type QuoteStepsProps } from "@/components/QuoteSteps";

interface Props {
  eyebrow?: string;
  heading: ReactNode;
  text?: ReactNode;
  bullets?: string[];
  /** Analytics id for this embed (data-form); the server still gets formId "quote". */
  dataForm: string;
  presetService?: string;
  presetVehicle?: QuoteStepsProps["presetVehicle"];
  promoTag?: string;
}

const DEFAULT_BULLETS = [
  "A written price for your exact car, usually within the hour (Mon to Fri, 9 AM to 6 PM)",
  "Nothing to pay now; a refundable 20% deposit only after you approve the quote",
  "4215 Walney Rd, Suite 1A & B, Chantilly, VA 20151",
];

export default function QuoteSection({ eyebrow = "Free quote", heading, text, bullets = DEFAULT_BULLETS, dataForm, presetService, presetVehicle, promoTag }: Props) {
  return (
    <section id="get-quote" data-section="quote-embed" className="py-16 md:py-20 bg-[#140C07] border-y border-[#E85D04]/30 scroll-mt-20">
      <div className="container max-w-6xl grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10 items-start">
        <div className="lg:col-span-2">
          <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">{eyebrow}</p>
          <h2 className="font-['Bebas_Neue',sans-serif] text-4xl md:text-5xl text-white leading-none mb-4">{heading}</h2>
          {text && <p className="text-zinc-300 leading-relaxed mb-5">{text}</p>}
          <ul className="hidden sm:block space-y-3 text-sm text-zinc-300 mb-5">
            {bullets.map((line) => (
              <li key={line} className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-[#E85D04] mt-0.5 shrink-0" />{line}</li>
            ))}
          </ul>
          <a href="tel:+17037754383" className="inline-flex items-center gap-2 text-zinc-300 hover:text-white text-sm"><Phone className="w-4 h-4 text-[#E85D04]" /> Rather talk? (703) 775-4383</a>
        </div>
        <div className="lg:col-span-3">
          <QuoteSteps formId="quote" dataForm={dataForm} presetService={presetService} presetVehicle={presetVehicle} promoTag={promoTag} compact />
        </div>
      </div>
    </section>
  );
}
