/**
 * Quote form embedded on the promo page, so "Claim my spot" never leaves the
 * page. Same backend as /get-a-quote (trpc.contact.submit): the lead lands in
 * GoHighLevel tagged with the promo, with the visitor's page journey in the note.
 */
import { useState } from "react";
import { ArrowRight, CheckCircle, Phone } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { leadJourney, track, trackLead } from "@/lib/analytics";
import { usePartialLead } from "@/lib/partialLead";
import DepositButton from "@/components/DepositButton";

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

/** Same tag rule as the quote page: "September Special" -> "september-special-promo". */
export const promoTagFor = (title: string, slug: string) =>
  title ? `${title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")}-promo` : `${slug}-promo`;

export default function PromoQuoteForm({ promoTitle, promoSlug, dealDescription, service = "PPF", buttonLabel = "YES! PROTECT MY PAINT", footnote, showDeposit = true }: Props) {
  const leadService = service === "Ceramic Coating" ? "ceramic" : service === "Tints" ? "tint" : "ppf";
  // Same note the quote page prefilled from promo links, so the CRM note and text read the same.
  const promoNote = `I'm interested in the ${promoTitle} — ${dealDescription}. Please contact me to claim my spot.`;
  const [form, setForm] = useState({ firstName: "", lastName: "", phone: "", email: "", year: "", make: "", model: "", message: promoNote });
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [contactId, setContactId] = useState<string | null>(null);
  usePartialLead("promo", { firstName: form.firstName, lastName: form.lastName, phone: form.phone, email: form.email, service, promoTag: promoTagFor(promoTitle, promoSlug) }, submitted);

  const submit = trpc.contact.submit.useMutation({
    onSuccess: (r) => {
      setContactId(r?.contactId ?? null);
      setSubmitted(true);
      setErrorMsg("");
      trackLead("quote_form", leadService);
    },
    onError: (err) => {
      setErrorMsg("Something went wrong. Please call us at (703) 775-4383 or try again.");
      track("form_error", { form_id: "promo-quote", error_message: String(err?.message ?? err).slice(0, 100) });
    },
  });

  const set = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm((p) => ({ ...p, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    const journey = await leadJourney();
    submit.mutate({
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      phone: form.phone || undefined,
      year: form.year || undefined,
      make: form.make || undefined,
      model: form.model || undefined,
      service,
      message: form.message.trim() || promoNote,
      promoTag: promoTagFor(promoTitle, promoSlug),
      formId: "promo",
      journey,
    });
  };

  const input = "w-full bg-[#111] border border-zinc-700 text-zinc-100 px-4 py-3 text-sm focus:outline-none focus:border-[#E85D04] transition-colors placeholder:text-zinc-500";
  const label = "block text-xs font-bold tracking-[0.2em] uppercase text-[#E85D04] mb-2";

  if (submitted) {
    return (
      <div className="border border-emerald-800 bg-emerald-900/20 p-8 text-center">
        <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
        <h3 className="font-display text-3xl text-white tracking-wide mb-2">YOU'RE IN</h3>
        <p className="text-zinc-300 text-sm leading-relaxed max-w-md mx-auto">
          We have your request for the {promoTitle || "special"}. Expect a call or text from the shop, usually within the hour during business hours, with your exact price and open install dates.
        </p>
        {showDeposit && <DepositButton contactId={contactId} firstName={form.firstName} lastName={form.lastName} email={form.email} phone={form.phone} promoTitle={promoTitle || "Special"} vehicle={[form.year, form.make, form.model].filter(Boolean).join(" ")} />}
        <a href="tel:+17037754383" className="inline-flex items-center gap-2 mt-6 text-[#E85D04] font-bold tracking-widest uppercase text-sm underline underline-offset-2 decoration-1 hover:decoration-2">
          <Phone className="w-4 h-4" /> Or call (703) 775-4383
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} data-form="promo-quote" className="border border-zinc-800 bg-[#0D0D0D] p-6 md:p-8 space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className={label}>First Name *</label>
          <input type="text" required autoComplete="given-name" value={form.firstName} onChange={set("firstName")} className={input} placeholder="John" />
        </div>
        <div>
          <label className={label}>Last Name *</label>
          <input type="text" required autoComplete="family-name" value={form.lastName} onChange={set("lastName")} className={input} placeholder="Smith" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className={label}>Phone *</label>
          <input type="tel" required autoComplete="tel" value={form.phone} onChange={set("phone")} className={input} placeholder="(703) 000-0000" />
        </div>
        <div>
          <label className={label}>Email *</label>
          <input type="email" required autoComplete="email" value={form.email} onChange={set("email")} className={input} placeholder="john@example.com" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-5">
        <div>
          <label className={label}>Year</label>
          <input type="number" min={1950} max={2030} value={form.year} onChange={set("year")} className={input} placeholder="2024" />
        </div>
        <div>
          <label className={label}>Make *</label>
          <input type="text" required value={form.make} onChange={set("make")} className={input} placeholder="Tesla" />
        </div>
        <div>
          <label className={label}>Model *</label>
          <input type="text" required value={form.model} onChange={set("model")} className={input} placeholder="Model Y" />
        </div>
      </div>

      <div>
        <label className={label}>Message / Notes</label>
        <textarea rows={3} value={form.message} onChange={set("message")} className={input} placeholder={promoNote} />
      </div>

      <p className="text-xs text-zinc-500 leading-relaxed">
        By requesting a quote you agree to Skyline Customs'{" "}
        <a href="/terms-of-service" target="_blank" rel="noopener noreferrer" className="text-[#E85D04] underline underline-offset-2 decoration-1 hover:decoration-2">Terms of Service &amp; Warranty Policy</a>.
        Nothing is booked and nothing is charged until you approve your quote.
      </p>

      {errorMsg && <p className="text-red-400 text-sm">{errorMsg}</p>}

      <button
        type="submit"
        disabled={submit.isPending}
        className="w-full bg-[#E85D04] text-black font-display text-xl tracking-[0.1em] py-4 hover:bg-orange-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {submit.isPending ? "SENDING..." : buttonLabel}
        {!submit.isPending && <ArrowRight className="w-5 h-5" />}
      </button>
      <p className="text-center text-zinc-400 text-xs tracking-wide">{footnote ?? "No catch. Just flawless paint, guaranteed 12 years. Nothing to pay now: a fully refundable 20% deposit locks your date only after you approve your exact quote. Pay over time with Klarna, Afterpay, or Affirm."}</p>
    </form>
  );
}
