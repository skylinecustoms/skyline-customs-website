/**
 * Spanish quote form. Same backend as every other form (trpc.contact.submit):
 * the lead lands in GoHighLevel with the usual tags plus "spanish-speaker",
 * so the shop knows to call back in Spanish. Half-finished forms are captured
 * the same way as the English ones.
 */
import { useState } from "react";
import { ArrowRight, CheckCircle, Phone } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { leadJourney, track, trackLead } from "@/lib/analytics";
import { usePartialLead } from "@/lib/partialLead";
import { promoTagFor } from "@/components/PromoQuoteForm";
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
  const [form, setForm] = useState({ firstName: "", lastName: "", phone: "", email: "", year: "", make: "", model: "", message: promo?.note ?? "" });
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [contactId, setContactId] = useState<string | null>(null);
  const promoTag = promo ? promoTagFor(promo.title, promo.slug) : undefined;
  usePartialLead(promo ? "promo" : "quote", { firstName: form.firstName, lastName: form.lastName, phone: form.phone, email: form.email, service, promoTag, language: "es" }, submitted);

  const submit = trpc.contact.submit.useMutation({
    onSuccess: (r) => { setContactId(r?.contactId ?? null); setSubmitted(true); setErrorMsg(""); trackLead("quote_form", service.toLowerCase()); },
    onError: (err) => { setErrorMsg(ui.error); track("form_error", { form_id: "quote-es", error_message: String(err?.message ?? err).slice(0, 100) }); },
  });

  const set = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm((p) => ({ ...p, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    if (!agreed) { setErrorMsg(ui.terms); return; }
    const journey = await leadJourney();
    submit.mutate({
      firstName: form.firstName, lastName: form.lastName, email: form.email,
      phone: form.phone || undefined, year: form.year || undefined, make: form.make || undefined, model: form.model || undefined,
      service, message: form.message.trim() || promo?.note || undefined,
      promoTag, formId: promo ? "promo" : "quote", language: "es", journey,
    });
  };

  const input = "w-full bg-[#111] border border-zinc-700 text-zinc-100 px-4 py-3 text-sm focus:outline-none focus:border-[#E85D04] transition-colors placeholder:text-zinc-500";
  const label = "block text-xs font-bold tracking-[0.2em] uppercase text-[#E85D04] mb-2";

  if (submitted) {
    return (
      <div className="border border-emerald-800 bg-emerald-900/20 p-8 text-center">
        <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
        <h3 className="font-display text-3xl text-white tracking-wide mb-2">{ui.successTitle}</h3>
        <p className="text-zinc-300 text-sm leading-relaxed max-w-md mx-auto">{ui.successBody}</p>
        {promo && <DepositButton lang="es" contactId={contactId} firstName={form.firstName} lastName={form.lastName} email={form.email} phone={form.phone} promoTitle={promo.title} vehicle={[form.year, form.make, form.model].filter(Boolean).join(" ")} />}
        <a href="tel:+17037754383" className="inline-flex items-center gap-2 mt-6 text-[#E85D04] font-bold tracking-widest uppercase text-sm underline underline-offset-2 decoration-1 hover:decoration-2">
          <Phone className="w-4 h-4" /> (703) 775-4383
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} data-form={promo ? "promo-quote-es" : "quote-es"} className="border border-zinc-800 bg-[#0D0D0D] p-6 md:p-8 space-y-5" lang="es">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div><label className={label}>{ui.firstName} *</label><input type="text" required autoComplete="given-name" value={form.firstName} onChange={set("firstName")} className={input} placeholder="Juan" /></div>
        <div><label className={label}>{ui.lastName} *</label><input type="text" required autoComplete="family-name" value={form.lastName} onChange={set("lastName")} className={input} placeholder="Pérez" /></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div><label className={label}>{ui.phone} *</label><input type="tel" required autoComplete="tel" value={form.phone} onChange={set("phone")} className={input} placeholder="(703) 000-0000" /></div>
        <div><label className={label}>{ui.email} *</label><input type="email" required autoComplete="email" value={form.email} onChange={set("email")} className={input} placeholder="juan@ejemplo.com" /></div>
      </div>
      <div className="grid grid-cols-3 gap-5">
        <div><label className={label}>{ui.year} *</label><input type="number" required min={1950} max={2030} value={form.year} onChange={set("year")} className={input} placeholder="2024" /></div>
        <div><label className={label}>{ui.make} *</label><input type="text" required value={form.make} onChange={set("make")} className={input} placeholder="Toyota" /></div>
        <div><label className={label}>{ui.model} *</label><input type="text" required value={form.model} onChange={set("model")} className={input} placeholder="Tacoma" /></div>
      </div>
      <div><label className={label}>{ui.message}</label><textarea rows={3} value={form.message} onChange={set("message")} className={input} /></div>
      <label className={`flex items-start gap-3 cursor-pointer p-2 border transition-colors ${agreed ? "border-[#E85D04]/40 bg-[#E85D04]/5" : "border-zinc-700"}`}>
        <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-0.5 w-4 h-4 accent-[#E85D04] shrink-0 cursor-pointer" />
        <span className="text-xs text-zinc-400 leading-relaxed">
          <span className="text-red-400 font-bold mr-1">*</span>{ui.terms}{" "}
          <a href="/terms-of-service" target="_blank" rel="noopener noreferrer" className="text-[#E85D04] underline underline-offset-2 decoration-1 hover:decoration-2" onClick={(e) => e.stopPropagation()}>{ui.termsLink}</a>
        </span>
      </label>
      {errorMsg && <p className="text-red-400 text-sm">{errorMsg}</p>}
      <button type="submit" disabled={submit.isPending || !agreed} className="w-full inline-flex items-center justify-center gap-2 bg-[#E85D04] text-black font-display text-xl tracking-[0.1em] uppercase py-4 hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
        {submit.isPending ? ui.sending : ui.submit}{!submit.isPending && <ArrowRight className="w-5 h-5" />}
      </button>
      <p className="text-center text-zinc-400 text-xs tracking-wide">{ui.finePrint}</p>
    </form>
  );
}
