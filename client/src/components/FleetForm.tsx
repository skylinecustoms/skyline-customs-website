/**
 * Fleet inquiry form (/fleet-ppf). Same backend as the other forms
 * (trpc.contact.submit, formId "fleet"): the lead lands in GoHighLevel tagged
 * website-contact + website-fleet + fleet-lead with the company on the contact,
 * so it is obvious this is a business call and not a single car.
 */
import { useState } from "react";
import { ArrowRight, CheckCircle, Phone } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { leadJourney, track, trackLead } from "@/lib/analytics";
import { usePartialLead } from "@/lib/partialLead";

const FLEET_SIZES = ["2–5", "6–15", "16–50", "50+"];
const INTERESTS = [
  { value: "PPF", label: "Full front PPF on every unit" },
  { value: "Tints", label: "Window tint for drivers" },
  { value: "Ceramic Coating", label: "Ceramic coating for easy washing" },
  { value: "Multiple Services - Bundle & Save", label: "A mix, tell us below" },
];

export default function FleetForm() {
  const [form, setForm] = useState({ firstName: "", lastName: "", company: "", phone: "", email: "", fleetSize: "", vehicleTypes: "", service: "PPF", message: "" });
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  usePartialLead("fleet", { firstName: form.firstName, lastName: form.lastName, phone: form.phone, email: form.email, service: form.service }, submitted);

  const submit = trpc.contact.submit.useMutation({
    onSuccess: () => { setSubmitted(true); setErrorMsg(""); trackLead("contact_form", "fleet"); },
    onError: (err) => { setErrorMsg("Something went wrong. Call (703) 775-4383 and ask for Mo, or try again."); track("form_error", { form_id: "fleet", error_message: String(err?.message ?? err).slice(0, 100) }); },
  });

  const set = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setForm((p) => ({ ...p, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    if (!agreed) { setErrorMsg("Please agree to the Terms of Service before submitting."); return; }
    const journey = await leadJourney();
    submit.mutate({
      firstName: form.firstName, lastName: form.lastName, email: form.email, phone: form.phone || undefined,
      company: form.company || undefined, fleetSize: form.fleetSize || undefined, vehicleTypes: form.vehicleTypes || undefined,
      service: form.service, message: form.message.trim() || undefined, formId: "fleet", journey,
    });
  };

  const input = "w-full bg-[#111] border border-zinc-700 text-zinc-100 px-4 py-3 text-sm focus:outline-none focus:border-[#E85D04] transition-colors placeholder:text-zinc-500";
  const label = "block text-xs font-bold tracking-[0.2em] uppercase text-[#E85D04] mb-2";

  if (submitted) {
    return (
      <div className="border border-emerald-800 bg-emerald-900/20 p-8 text-center">
        <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
        <h3 className="font-display text-3xl text-white tracking-wide mb-2">GOT IT</h3>
        <p className="text-zinc-300 text-sm leading-relaxed max-w-md mx-auto">Mo will call you within one business day with per-unit pricing for your fleet, a schedule that fits your dispatch, and a sample unit date if you want to see one done first.</p>
        <a href="tel:+17037754383" className="inline-flex items-center gap-2 mt-6 text-[#E85D04] font-bold tracking-widest uppercase text-sm underline underline-offset-2 decoration-1 hover:decoration-2"><Phone className="w-4 h-4" /> Or call (703) 775-4383</a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} data-form="fleet" className="border border-zinc-800 bg-[#0D0D0D] p-6 md:p-8 space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div><label className={label}>First Name *</label><input type="text" required autoComplete="given-name" value={form.firstName} onChange={set("firstName")} className={input} placeholder="Dana" /></div>
        <div><label className={label}>Last Name *</label><input type="text" required autoComplete="family-name" value={form.lastName} onChange={set("lastName")} className={input} placeholder="Lee" /></div>
      </div>
      <div><label className={label}>Company *</label><input type="text" required autoComplete="organization" value={form.company} onChange={set("company")} className={input} placeholder="Company or dealership" /></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div><label className={label}>Phone *</label><input type="tel" required autoComplete="tel" value={form.phone} onChange={set("phone")} className={input} placeholder="(703) 000-0000" /></div>
        <div><label className={label}>Work Email *</label><input type="email" required autoComplete="email" value={form.email} onChange={set("email")} className={input} placeholder="dana@company.com" /></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className={label}>Fleet size *</label>
          <select required value={form.fleetSize} onChange={set("fleetSize")} className={input}>
            <option value="">Select</option>
            {FLEET_SIZES.map((s) => <option key={s} value={s}>{s} vehicles</option>)}
          </select>
        </div>
        <div><label className={label}>Vehicle types *</label><input type="text" required value={form.vehicleTypes} onChange={set("vehicleTypes")} className={input} placeholder="e.g. 12 Transit vans, 4 F-150s" /></div>
      </div>
      <div>
        <label className={label}>Interested in *</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {INTERESTS.map((opt) => (
            <label key={opt.value} className={`flex items-center gap-3 px-4 py-3 border cursor-pointer transition-colors ${form.service === opt.value ? "border-[#E85D04] bg-[#1a1a1a]" : "border-zinc-700 bg-[#161616] hover:border-zinc-500"}`}>
              <input type="radio" name="service" value={opt.value} checked={form.service === opt.value} onChange={set("service")} className="accent-[#E85D04] w-4 h-4 shrink-0" />
              <span className="text-zinc-300 text-sm">{opt.label}</span>
            </label>
          ))}
        </div>
      </div>
      <div><label className={label}>Anything else</label><textarea rows={3} value={form.message} onChange={set("message")} className={input} placeholder="Timing, where the vehicles are based, whether you need a sample unit first" /></div>
      <label className={`flex items-start gap-3 cursor-pointer p-2 border transition-colors ${agreed ? "border-[#E85D04]/40 bg-[#E85D04]/5" : "border-zinc-700"}`}>
        <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-0.5 w-4 h-4 accent-[#E85D04] shrink-0 cursor-pointer" />
        <span className="text-xs text-zinc-400 leading-relaxed"><span className="text-red-400 font-bold mr-1">*</span>I have read and agree to Skyline Customs' <a href="/terms-of-service" target="_blank" rel="noopener noreferrer" className="text-[#E85D04] underline underline-offset-2 decoration-1 hover:decoration-2" onClick={(e) => e.stopPropagation()}>Terms of Service &amp; Warranty Policy</a>.</span>
      </label>
      {errorMsg && <p className="text-red-400 text-sm">{errorMsg}</p>}
      <button type="submit" disabled={submit.isPending || !agreed} className="w-full inline-flex items-center justify-center gap-2 bg-[#E85D04] text-black font-display text-xl tracking-[0.1em] uppercase py-4 hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
        {submit.isPending ? "SENDING..." : "GET FLEET PRICING"}{!submit.isPending && <ArrowRight className="w-5 h-5" />}
      </button>
      <p className="text-center text-zinc-400 text-xs tracking-wide">Per-unit pricing within one business day. One contact, one invoice, one warranty file for the whole fleet.</p>
    </form>
  );
}
