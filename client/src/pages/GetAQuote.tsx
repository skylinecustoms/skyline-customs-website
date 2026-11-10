/**
 * SKYLINE CUSTOMS — Get A Quote Page
 * Design: Industrial Brutalism | Dark matte black + burnt orange (#E85D04)
 * URL: /get-a-quote
 */

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatHappensNext from "@/components/WhatHappensNext";
import SEO from "@/components/SEO";
import { Shield, Clock, Star, ArrowRight, ArrowLeft, Sparkles, Check } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import { quoteAssistantStore } from "@/components/QuoteAssistant";
import { inferredService, leadJourney, track, trackLead } from "@/lib/analytics";
import { usePartialLead } from "@/lib/partialLead";
import SmsConsent from "@/components/SmsConsent";

// Order matters: people tap the first thing that looks right. Lead with what we sell most.
const SERVICE_OPTIONS = [
  { value: "PPF", label: "Full Front PPF (Paint Protection Film)" },
  { value: "Tints", label: "Window Tinting" },
  { value: "Ceramic Coating", label: "Ceramic Coating" },
  { value: "Multiple Services - Bundle & Save", label: "Multiple Services — Bundle & Save" },
  { value: "Not Sure Yet", label: "Not Sure Yet" },
];

// Map any service name/slug → the exact SERVICE_OPTIONS value
function normalizeService(raw: string): string {
  const lower = raw.toLowerCase();
  if (lower === "multiple" || lower.includes("bundle") || lower.includes("multiple")) return "Multiple Services - Bundle & Save";
  if (lower.includes("ppf") || lower.includes("paint protection") || lower.includes("film")) return "PPF";
  if (lower.includes("ceramic")) return "Ceramic Coating";
  if (lower.includes("tint") || lower.includes("window")) return "Tints";
  return raw;
}

export default function GetAQuote() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    make: "",
    model: "",
    year: "",
    service: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [preFilledByAI, setPreFilledByAI] = useState(false);
  const [agreedToTos, setAgreedToTos] = useState(false);
  // Three short steps instead of one long form: 1 service (one tap), 2 the car, 3 how to reach them.
  const [step, setStep] = useState(1);
  const [showNote, setShowNote] = useState(false);
  const goTo = (n: number) => {
    setErrorMsg("");
    setStep(n);
    track("quote_step", { form_id: "quote", step: n });
    setTimeout(() => document.getElementById("quote-form-section")?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  };
  // Promo context — set when visitor arrives from a promo CTA
  const [promoTitle, setPromoTitle] = useState("");
  const [promoTag, setPromoTag] = useState("");
  const { data: activePromo } = trpc.promo.getActive.useQuery();
  // Name + valid phone typed but never submitted still reaches the CRM (tagged website-partial).
  usePartialLead("quote", { firstName: form.firstName, lastName: form.lastName, phone: form.phone, email: form.email, service: form.service, promoTag: promoTag || undefined }, submitted);

  // On mount: (1) check URL params, (2) check AI assistant pre-filled data
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const serviceParam = params.get("service");
    const summaryParam = params.get("summary");
    const yearParam = params.get("year");
    const makeParam = params.get("make");
    const modelParam = params.get("model");
    const promoTitleParam = params.get("promoTitle");
    const promoNoteParam = params.get("promoNote");
    const promoSlugParam = params.get("promo");

    const updates: Partial<typeof form> = {};
    // No ?service= param (came through the nav): pre-select what they were just reading about.
    const fromJourney = serviceParam ? undefined : inferredService();
    if (serviceParam) updates.service = normalizeService(serviceParam);
    else if (fromJourney) updates.service = normalizeService(fromJourney);
    // promoNote takes priority over summary for the message field
    if (promoNoteParam) updates.message = decodeURIComponent(promoNoteParam);
    else if (summaryParam) updates.message = decodeURIComponent(summaryParam);
    if (yearParam) updates.year = decodeURIComponent(yearParam);
    if (makeParam) updates.make = decodeURIComponent(makeParam);
    if (modelParam) updates.model = decodeURIComponent(modelParam);

    // Store promo context for badge display and GHL tagging
    if (promoTitleParam) {
      const decoded = decodeURIComponent(promoTitleParam);
      setPromoTitle(decoded);
      // Build a clean GHL tag from the promo title: "July Special" -> "july-special-promo"
      const tag = decoded.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") + "-promo";
      setPromoTag(tag);
    } else if (promoSlugParam) {
      // Fallback: derive tag from slug
      setPromoTag(decodeURIComponent(promoSlugParam) + "-promo");
    }

    if (updates.service) setStep(2);
    if (Object.keys(updates).length > 0) {
      setForm((prev) => ({ ...prev, ...updates }));
      if (summaryParam && !promoNoteParam) setPreFilledByAI(true);
      // Scroll smoothly to the form after a short delay so the user sees the pre-fill
      setTimeout(() => {
        const formEl = document.getElementById("quote-form-section");
        if (formEl) formEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);
    }

    // 2. Check if the AI assistant pre-filled data is available
    const data = quoteAssistantStore.formData;
    if (data) {
      setForm((prev) => ({
        ...prev,
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        phone: data.phone || "",
        email: data.email || "",
        make: data.make || prev.make || "",
        model: data.model || prev.model || "",
        year: data.year || prev.year || "",
        service: normalizeService(data.service || "") || prev.service,
      }));
      if (data.service) setStep(2);
      setPreFilledByAI(true);
      // Clear the store so it doesn't re-fill on next visit
      quoteAssistantStore.formData = null;
    }
  }, []);

  const submitContact = trpc.contact.submit.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      setErrorMsg("");
      // GA4 generate_lead + Facebook Pixel Lead
      trackLead("quote_form", form.service);
    },
    onError: (err) => {
      setErrorMsg("Something went wrong. Please call us at (703) 775-4383 or try again.");
      track("form_error", { form_id: "quote", error_message: String(err?.message ?? err).slice(0, 100) });
      console.error("[Quote form error]", err);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    if (!agreedToTos) {
      setErrorMsg("Please agree to the Terms of Service before submitting.");
      return;
    }
    const journey = await leadJourney();
    submitContact.mutate({
      journey,
      formId: "quote",
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      phone: form.phone || undefined,
      make: form.make || undefined,
      model: form.model || undefined,
      year: form.year || undefined,
      service: form.service || undefined,
      message: form.message || undefined,
      promoTag: promoTag || undefined,
    });
  };

  const set = (field: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const inputClass =
    "w-full bg-[#1a1a1a] border border-zinc-700 text-zinc-100 px-4 py-3 text-sm focus:outline-none focus:border-[#E85D04] transition-colors placeholder:text-zinc-400";

  const labelClass =
    "block text-xs font-bold tracking-[0.2em] uppercase text-[#E85D04] mb-2";

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-['DM_Sans',sans-serif]">
      <SEO
        title="Get a Free Quote | Chantilly VA"
        description="Request a free full front PPF, ceramic coating, or window tint quote in Northern Virginia. A Skyline specialist replies with an exact price, usually within the hour."
        canonical="https://www.skylinecustomshop.com/get-a-quote"
      />
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0A] via-[#111] to-[#1a0a00]" />
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 40px, #E85D04 40px, #E85D04 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, #E85D04 40px, #E85D04 41px)",
          }}
        />
        <div
          className="absolute top-0 right-0 w-1/2 h-full opacity-10"
          style={{ background: "radial-gradient(ellipse at top right, #E85D04, transparent 70%)" }}
        />
        <div className="container relative z-10 max-w-5xl">
          <p className="text-[#E85D04] text-sm font-bold tracking-[0.3em] uppercase mb-3">
            Free Quote
          </p>
          <h1 className="font-['Bebas_Neue',sans-serif] text-6xl md:text-8xl leading-none text-white mb-4">
            PROTECT YOUR<br />
            <span className="text-[#E85D04]">INVESTMENT</span>
          </h1>
          <p className="text-zinc-400 text-lg max-w-xl leading-relaxed">
            Fill out the form below and we'll reach out to walk you through the best protection package for your vehicle and budget. No pressure, no obligation.
          </p>

          {/* Trust bar */}
          <div className="flex flex-wrap gap-8 mt-8">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-[#E85D04]" />
              <span className="text-zinc-400 text-sm">140+ Five-Star Reviews</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#E85D04]" />
              <span className="text-zinc-400 text-sm">Response Within the Hour</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#E85D04]" />
              <span className="text-zinc-400 text-sm">Lifetime Craftsmanship Warranty</span>
            </div>
          </div>
        </div>
      </section>

      {/* Orange divider */}
      <div className="h-1 bg-[#E85D04]" />

      {/* Form Section */}
      <section id="quote-form-section" className="py-16 bg-[#0D0D0D]">
        <div className="container max-w-3xl">
          <div className="squircle bg-[#111] border border-zinc-800 p-8 md:p-10">
            {submitted ? (
              <WhatHappensNext service={form.service} name={form.firstName.trim() || undefined} />
            ) : (
              <>
                <div className="flex items-start justify-between mb-8 gap-4">
                  <div>
                    <h2 className="font-['Bebas_Neue',sans-serif] text-3xl text-white tracking-wider">
                      GET MY FREE QUOTE
                    </h2>
                    {!promoTitle && activePromo?.title && (
                      <p className="text-zinc-400 text-xs mt-2">
                        This month: <Link href="/promo" data-cta="quote-page-promo" className="text-[#E85D04] underline underline-offset-2 decoration-1 hover:decoration-2">{activePromo.title}: {(activePromo.tagline ?? "Full Front PPF + free ceramic coating").replace(/\s*[—-]\s*Spots Are Limited\.?$/i, "")}</Link>
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-2 flex-shrink-0">
                    {promoTitle && (
                      <div className="flex items-center gap-2 bg-[#E85D04] text-[#0A0A0A] text-xs font-bold px-3 py-2 tracking-widest uppercase">
                        <span>&#9889;</span>
                        {promoTitle}
                      </div>
                    )}
                    {preFilledByAI && (
                      <div className="flex items-center gap-2 bg-[#E85D04]/10 border border-[#E85D04]/30 text-[#E85D04] text-xs font-semibold px-3 py-2 rounded-lg">
                        <Sparkles className="w-3.5 h-3.5" />
                        Pre-filled by AI Assistant
                      </div>
                    )}
                  </div>
                </div>

                {/* Progress: three short steps */}
                <ol className="flex items-center gap-2 mb-8" aria-label="Quote steps">
                  {["Service", "Car", "Contact"].map((label, i) => {
                    const n = i + 1, done = step > n, here = step === n;
                    return (
                      <li key={label} className="flex-1">
                        <div className={`h-1.5 rounded-full ${step >= n ? "bg-[#E85D04]" : "bg-zinc-800"}`} />
                        <p className={`mt-2 text-xs font-bold tracking-[0.15em] uppercase whitespace-nowrap flex items-center gap-1 ${here ? "text-white" : done ? "text-[#E85D04]" : "text-zinc-500"}`}>
                          {done ? <Check className="w-3.5 h-3.5" /> : <span>{n}.</span>} {label}
                        </p>
                      </li>
                    );
                  })}
                </ol>

                <form onSubmit={handleSubmit} data-form="quote" data-step={step} className="space-y-5">

                  {step === 1 && (
                    <div>
                      <h3 className="text-white text-xl font-semibold mb-1">What can we help with?</h3>
                      <p className="text-zinc-400 text-sm mb-5">Tap one. You can change it later.</p>
                      <div className="grid grid-cols-1 gap-3">
                        {SERVICE_OPTIONS.map((opt) => (
                          <button
                            type="button"
                            key={opt.value}
                            onClick={() => { setForm((prev) => ({ ...prev, service: opt.value })); goTo(2); }}
                            className={`text-left flex items-center justify-between gap-3 px-5 py-4 min-h-[56px] border transition-colors ${
                              form.service === opt.value ? "border-[#E85D04] bg-[#1a1a1a]" : "border-zinc-700 bg-[#161616] hover:border-[#E85D04]"
                            }`}
                          >
                            <span className="text-zinc-100 text-base">{opt.label}</span>
                            <ArrowRight className="w-4 h-4 text-[#E85D04] shrink-0" />
                          </button>
                        ))}
                      </div>
                      <p className="text-zinc-400 text-xs mt-4">Managing more than one vehicle, or a dealership? <Link href="/fleet-ppf" className="text-[#E85D04] underline underline-offset-2 decoration-1 hover:decoration-2">Use the fleet form</Link> for per-unit pricing.</p>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-5">
                      <div>
                        <h3 className="text-white text-xl font-semibold mb-1">What are you driving?</h3>
                        <p className="text-zinc-400 text-sm">
                          For: <span className="text-white">{SERVICE_OPTIONS.find((o) => o.value === form.service)?.label || form.service}</span>{" "}
                          <button type="button" onClick={() => goTo(1)} className="text-[#E85D04] underline underline-offset-2 decoration-1">change</button>
                        </p>
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <label className={labelClass} htmlFor="q-year">Year</label>
                          <input id="q-year" type="number" inputMode="numeric" required min={1990} max={2030} value={form.year} onChange={set("year")} className={inputClass} placeholder="2024" />
                        </div>
                        <div className="col-span-2">
                          <label className={labelClass} htmlFor="q-make">Make</label>
                          <input id="q-make" type="text" required value={form.make} onChange={set("make")} className={inputClass} placeholder="Tesla" autoComplete="off" />
                        </div>
                      </div>
                      <div>
                        <label className={labelClass} htmlFor="q-model">Model</label>
                        <input id="q-model" type="text" required value={form.model} onChange={set("model")} className={inputClass} placeholder="Model Y" autoComplete="off" />
                      </div>
                      {showNote || form.message ? (
                        <div>
                          <label className={labelClass} htmlFor="q-note">Anything else? (optional)</label>
                          <textarea id="q-note" value={form.message} onChange={set("message")} rows={3} className={`${inputClass} resize-none`} placeholder="New car, how you drive, where you park..." />
                        </div>
                      ) : (
                        <button type="button" onClick={() => setShowNote(true)} className="text-[#E85D04] text-sm underline underline-offset-2 decoration-1">+ Add a note (optional)</button>
                      )}
                      {errorMsg && <p className="text-red-400 text-sm">{errorMsg}</p>}
                      <div>
                        <button
                          type="button"
                          onClick={() => (form.year && form.make.trim() && form.model.trim() ? goTo(3) : setErrorMsg("Add the year, make and model so we can price it."))}
                          className="cta w-full bg-[#E85D04] text-[#0A0A0A] font-['Bebas_Neue',sans-serif] text-xl tracking-widest py-4 hover:bg-[#d45200] transition-colors flex items-center justify-center gap-2"
                        >
                          NEXT <ArrowRight size={18} />
                        </button>
                        <button type="button" onClick={() => goTo(1)} className="mt-3 text-zinc-400 hover:text-white text-sm flex items-center gap-1"><ArrowLeft size={14} /> Back</button>
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-5">
                      <div>
                        <h3 className="text-white text-xl font-semibold mb-1">Where should we send your quote?</h3>
                        <p className="text-zinc-400 text-sm">{[form.year, form.make, form.model].filter(Boolean).join(" ")} · {SERVICE_OPTIONS.find((o) => o.value === form.service)?.label || form.service}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className={labelClass} htmlFor="q-first">First name</label>
                          <input id="q-first" type="text" required value={form.firstName} onChange={set("firstName")} className={inputClass} placeholder="John" autoComplete="given-name" />
                        </div>
                        <div>
                          <label className={labelClass} htmlFor="q-last">Last name</label>
                          <input id="q-last" type="text" required value={form.lastName} onChange={set("lastName")} className={inputClass} placeholder="Smith" autoComplete="family-name" />
                        </div>
                      </div>
                      <div>
                        <label className={labelClass} htmlFor="q-phone">Mobile number</label>
                        <input id="q-phone" type="tel" required value={form.phone} onChange={set("phone")} className={inputClass} placeholder="(703) 000-0000" autoComplete="tel" />
                      </div>
                      <div>
                        <label className={labelClass} htmlFor="q-email">Email</label>
                        <input id="q-email" type="email" required value={form.email} onChange={set("email")} className={inputClass} placeholder="john@example.com" autoComplete="email" />
                      </div>

                      {/* Terms of Service agreement checkbox — required */}
                      <label className={`flex items-start gap-3 cursor-pointer rounded p-3 transition-colors ${!agreedToTos ? 'border border-zinc-700' : 'border border-[#E85D04]/40 bg-[#E85D04]/5'}`}>
                        <input
                          type="checkbox"
                          required
                          checked={agreedToTos}
                          onChange={(e) => setAgreedToTos(e.target.checked)}
                          className="mt-0.5 w-5 h-5 accent-[#E85D04] flex-shrink-0 cursor-pointer"
                        />
                        <span className="text-xs text-zinc-400 leading-relaxed">
                          I agree to Skyline Customs'{" "}
                          <a
                            href="/terms-of-service"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#E85D04] underline underline-offset-2 decoration-1 hover:decoration-2"
                            onClick={(e) => e.stopPropagation()}
                          >
                            Terms of Service &amp; Warranty Policy
                          </a>
                          , including the aftercare guidelines and warranty terms for the selected service.
                        </span>
                      </label>

                      {errorMsg && <p className="text-red-400 text-sm">{errorMsg}</p>}

                      <div>
                        <button
                          type="submit"
                          disabled={submitContact.isPending || !agreedToTos}
                          className="cta w-full bg-[#E85D04] text-[#0A0A0A] font-['Bebas_Neue',sans-serif] text-xl tracking-widest py-4 hover:bg-[#d45200] transition-colors flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {submitContact.isPending ? "SENDING..." : "GET MY FREE QUOTE"}
                          {!submitContact.isPending && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
                        </button>
                        <button type="button" onClick={() => goTo(2)} className="mt-3 text-zinc-400 hover:text-white text-sm flex items-center gap-1"><ArrowLeft size={14} /> Back</button>
                      </div>
                      <SmsConsent className="mt-3" />
                      <p className="text-center text-zinc-400 text-xs leading-relaxed">Nothing to pay now. A 20% deposit locks your date only after you approve your exact quote, goes toward your total, and is fully refundable at any time.</p>
                    </div>
                  )}
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      {/* What happens next */}
      <section className="py-16 bg-[#0D0D0D] border-t border-zinc-800">
        <div className="container max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <p className="text-[#E85D04] text-xs font-bold tracking-[0.3em] uppercase mb-2">Step 1</p>
            <h2 className="font-['Bebas_Neue',sans-serif] text-2xl text-white mb-2">WE READ YOUR REQUEST</h2>
            <p className="text-zinc-400 text-sm leading-relaxed">Year, make, model, and the coverage you want are all we need. Add a note about how you drive, where you park, or whether the car is new, and the quote gets more precise. Requests during business hours usually get a reply within the hour; every request gets one the same business day.</p>
          </div>
          <div>
            <p className="text-[#E85D04] text-xs font-bold tracking-[0.3em] uppercase mb-2">Step 2</p>
            <h2 className="font-['Bebas_Neue',sans-serif] text-2xl text-white mb-2">YOU GET A WRITTEN QUOTE</h2>
            <p className="text-zinc-400 text-sm leading-relaxed">Not a range and not a starting-at number. The quote lists the package, what it covers panel by panel, the film or coating, and the warranty. If two options make sense for your car we send both so you can compare. No obligation, and the quote is good for 30 days.</p>
          </div>
          <div>
            <p className="text-[#E85D04] text-xs font-bold tracking-[0.3em] uppercase mb-2">Step 3</p>
            <h2 className="font-['Bebas_Neue',sans-serif] text-2xl text-white mb-2">BOOK A DAY THAT WORKS</h2>
            <p className="text-zinc-400 text-sm leading-relaxed">Approve the quote and a 20% deposit locks your date and your price; it goes toward your total and is fully refundable at any time. Most PPF and tint jobs are same-day at our Chantilly shop, and a ceramic coating is two days. Drop off at 9 AM at 4215 Walney Rd, Suite 1A and B, and we call when the car is ready. Free parking on site, and we walk you through aftercare and register the warranty before you leave.</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
