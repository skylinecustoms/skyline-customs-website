/**
 * SKYLINE CUSTOMS — Get A Quote Page
 * Design: Industrial Brutalism | Dark matte black + burnt orange (#E85D04)
 * URL: /get-a-quote
 */

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Shield, Clock, Star, ArrowRight, Sparkles } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { quoteAssistantStore } from "@/components/QuoteAssistant";
import { trackLead } from "@/lib/analytics";

const SERVICE_OPTIONS = [
  { value: "Ceramic Coating", label: "Ceramic Coating" },
  { value: "Tints", label: "Window Tinting" },
  { value: "PPF", label: "Paint Protection Film (PPF)" },
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
  // Promo context — set when visitor arrives from a promo CTA
  const [promoTitle, setPromoTitle] = useState("");
  const [promoTag, setPromoTag] = useState("");

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
    if (serviceParam) updates.service = normalizeService(serviceParam);
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
      console.error("[Quote form error]", err);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    if (!agreedToTos) {
      setErrorMsg("Please agree to the Terms of Service before submitting.");
      return;
    }
    submitContact.mutate({
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
    "w-full bg-[#1a1a1a] border border-zinc-700 text-zinc-100 px-4 py-3 text-sm focus:outline-none focus:border-[#E85D04] transition-colors placeholder:text-zinc-600";

  const labelClass =
    "block text-xs font-bold tracking-[0.2em] uppercase text-[#E85D04] mb-2";

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-['DM_Sans',sans-serif]">
      <SEO
        title="Get a Free Quote | Chantilly VA"
        description="Request a free quote for PPF, ceramic coating, or window tinting in Northern Virginia. A Skyline specialist will reach out within the hour."
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
          <div className="bg-[#111] border border-zinc-800 p-8 md:p-10">
            {submitted ? (
              <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
                <div className="w-16 h-16 bg-[#E85D04] flex items-center justify-center mb-6">
                  <span className="font-['Bebas_Neue',sans-serif] text-3xl text-[#0A0A0A]">✓</span>
                </div>
                <h3 className="font-['Bebas_Neue',sans-serif] text-4xl text-white mb-4 tracking-wider">
                  QUOTE REQUEST SENT
                </h3>
                <p className="text-zinc-400 max-w-sm">
                  Thank you! A Skyline specialist will reach out within the hour during business hours. For immediate assistance, call us at (703) 775-4383.
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-start justify-between mb-8 gap-4">
                  <h2 className="font-['Bebas_Neue',sans-serif] text-3xl text-white tracking-wider">
                    GET MY FREE QUOTE
                  </h2>
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

                <form onSubmit={handleSubmit} className="space-y-5">

                  {/* Row 1: First Name + Last Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className={labelClass}>First Name *</label>
                      <input
                        type="text"
                        required
                        value={form.firstName}
                        onChange={set("firstName")}
                        className={inputClass}
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Last Name *</label>
                      <input
                        type="text"
                        required
                        value={form.lastName}
                        onChange={set("lastName")}
                        className={inputClass}
                        placeholder="Smith"
                      />
                    </div>
                  </div>

                  {/* Row 2: Phone + Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className={labelClass}>Phone *</label>
                      <input
                        type="tel"
                        required
                        value={form.phone}
                        onChange={set("phone")}
                        className={inputClass}
                        placeholder="(703) 000-0000"
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Email *</label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={set("email")}
                        className={inputClass}
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  {/* Row 3: Make + Model + Year */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div>
                      <label className={labelClass}>Make *</label>
                      <input
                        type="text"
                        required
                        value={form.make}
                        onChange={set("make")}
                        className={inputClass}
                        placeholder="Tesla"
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Model *</label>
                      <input
                        type="text"
                        required
                        value={form.model}
                        onChange={set("model")}
                        className={inputClass}
                        placeholder="Model Y"
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Year *</label>
                      <input
                        type="number"
                        required
                        min={1990}
                        max={2030}
                        value={form.year}
                        onChange={set("year")}
                        className={inputClass}
                        placeholder="2024"
                      />
                    </div>
                  </div>

                  {/* Service Radio Buttons */}
                  <div>
                    <label className={labelClass}>Service *</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {SERVICE_OPTIONS.map((opt) => (
                        <label
                          key={opt.value}
                          className={`flex items-center gap-3 px-4 py-3 border cursor-pointer transition-colors ${
                            form.service === opt.value
                              ? "border-[#E85D04] bg-[#1a1a1a]"
                              : "border-zinc-700 bg-[#161616] hover:border-zinc-500"
                          }`}
                        >
                          <input
                            type="radio"
                            name="service"
                            value={opt.value}
                            checked={form.service === opt.value}
                            onChange={set("service")}
                            className="accent-[#E85D04] w-4 h-4 shrink-0"
                          />
                          <span className="text-zinc-300 text-sm">{opt.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className={labelClass}>Message / Additional Notes</label>
                    <textarea
                      value={form.message}
                      onChange={set("message")}
                      rows={4}
                      className={`${inputClass} resize-none`}
                      placeholder="Tell us about your vehicle and what you're looking for..."
                    />
                  </div>

                  {/* Terms of Service agreement checkbox — required */}
                  <label className={`flex items-start gap-3 cursor-pointer rounded p-2 transition-colors ${!agreedToTos ? 'border border-zinc-700' : 'border border-[#E85D04]/40 bg-[#E85D04]/5'}`}>
                    <input
                      type="checkbox"
                      required
                      checked={agreedToTos}
                      onChange={(e) => setAgreedToTos(e.target.checked)}
                      className="mt-0.5 w-4 h-4 accent-[#E85D04] flex-shrink-0 cursor-pointer"
                    />
                    <span className="text-xs text-zinc-400 leading-relaxed">
                      <span className="text-red-400 font-bold mr-1">*</span>
                      I have read and agree to Skyline Customs'{", "}
                      <a
                        href="/terms-of-service"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#E85D04] hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Terms of Service &amp; Warranty Policy
                      </a>
                      , including the aftercare guidelines and warranty terms for the selected service.
                    </span>
                  </label>

                  {errorMsg && (
                    <p className="text-red-400 text-sm">{errorMsg}</p>
                  )}

                  <button
                    type="submit"
                    disabled={submitContact.isPending || !agreedToTos}
                    className="w-full bg-[#E85D04] text-[#0A0A0A] font-['Bebas_Neue',sans-serif] text-xl tracking-widest py-4 hover:bg-[#d45200] transition-colors flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitContact.isPending ? "SENDING..." : "GET MY FREE QUOTE"}
                    {!submitContact.isPending && (
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
