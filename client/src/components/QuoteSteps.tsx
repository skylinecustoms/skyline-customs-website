/**
 * The one quote form on the site: three short steps (1 service: one tap, 2 the car, 3 how to reach them).
 *
 * Built from the /get-a-quote form and used by every quote form on the site (the quote page, the contact
 * page, the promo pages, the Spanish pages, and the compact embeds on the home, city, brand and model
 * pages), so they all behave the same: `quote_step` tracking per step, the half-finished-form capture
 * (usePartialLead, tagged website-partial in the CRM), and the same trpc.contact.submit payload as before.
 * Each embed keeps its own formId (CRM source and tags) and data-form (analytics) values.
 */
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { Link } from "wouter";
import { ArrowRight, ArrowLeft, Sparkles, Check, ChevronDown, Star } from "lucide-react";
import { trpc } from "@/lib/trpc";
import WhatHappensNext from "@/components/WhatHappensNext";
import SmsConsent from "@/components/SmsConsent";
import { quoteAssistantStore } from "@/lib/quoteAssistantStore";
import { inferredService, leadJourney, track, trackLead, type LeadMethod } from "@/lib/analytics";
import { usePartialLead } from "@/lib/partialLead";
import { useGoogleRating } from "@/lib/reviews";
import { QUOTE_MAKES, modelsFor, quoteYears } from "@/lib/vehicles";
import type { EsUi } from "@/lib/es";

// Order matters: people tap the first thing that looks right. Lead with what we sell most.
export const SERVICE_OPTIONS = [
  { value: "PPF", label: "Full Front PPF (Paint Protection Film)", es: "PPF frontal completo (película de protección)" },
  { value: "Tints", label: "Window Tinting", es: "Polarizado de ventanas" },
  { value: "Ceramic Coating", label: "Ceramic Coating", es: "Recubrimiento cerámico" },
  { value: "Multiple Services - Bundle & Save", label: "Multiple Services — Bundle & Save", es: "Varios servicios: paquete con descuento" },
  { value: "Not Sure Yet", label: "Not Sure Yet", es: "Todavía no sé" },
];

/** Map any service name/slug ("ppf", "tint", "ceramic-coating", "Tints") to the exact SERVICE_OPTIONS value. */
export function normalizeService(raw: string): string {
  const lower = raw.toLowerCase();
  if (lower === "multiple" || lower.includes("bundle") || lower.includes("multiple")) return "Multiple Services - Bundle & Save";
  if (lower.includes("ppf") || lower.includes("paint protection") || lower.includes("film")) return "PPF";
  if (lower.includes("ceramic")) return "Ceramic Coating";
  if (lower.includes("tint") || lower.includes("window")) return "Tints";
  return raw;
}

/** Same tag rule everywhere: "September Special" -> "september-special-promo"; no title -> "<slug>-promo". */
export const promoTagFor = (title: string, slug: string) =>
  title ? `${title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")}-promo` : `${slug}-promo`;

export interface QuoteSnapshot {
  firstName: string; lastName: string; email: string; phone: string;
  year: string; make: string; model: string; service: string; contactId: string | null;
}

export interface QuoteStepsProps {
  /** What the server sees (CRM source and tags): unchanged per form so GHL workflows keep working. */
  formId: "quote" | "contact" | "promo";
  /** data-form attribute and the form_id on analytics events; defaults to formId. */
  dataForm?: string;
  /** GA4/Pixel lead method. */
  leadMethod?: LeadMethod;
  /** Overrides the service value sent with the lead event (the promo forms send "ppf"/"ceramic"/"tint"). */
  leadService?: string;
  /** Service picked up front: the form opens on the car step (the visitor can still change it). */
  presetService?: string;
  /** Promo forms: the service is the deal, so there is no service step at all. */
  lockService?: boolean;
  /** The car, when the page knows it (a Tesla Model Y page presets make + model). */
  presetVehicle?: { year?: string; make?: string; model?: string };
  promoTag?: string;
  /** Shown as a badge at the top of the form. */
  promoTitle?: string;
  /** Prefilled note (the promo's "I'm interested in..."); also the message when the visitor clears it. */
  defaultMessage?: string;
  /** /get-a-quote only: read ?service=&year=&make=&model=&summary=&promoTitle=&promoNote=&promo=, the AI assistant's answers, and the service last read about. */
  readUrlParams?: boolean;
  /** /get-a-quote only: link to this month's promo under the heading. */
  showActivePromo?: boolean;
  lang?: "en" | "es";
  /** Spanish form copy (ES_UI.form); required with lang="es". */
  esUi?: EsUi["form"];
  /** Smaller box and type for in-page embeds. */
  compact?: boolean;
  title?: string;
  subtitle?: ReactNode;
  submitLabel?: string;
  /** Line under the submit button. */
  footnote?: ReactNode;
  /** The promo forms used implied agreement ("By requesting a quote you agree..."); everything else a checkbox. */
  tosCheckbox?: boolean;
  /** Open the optional note field from the start (the contact page is a "send a message" form). */
  noteOpen?: boolean;
  /** Replaces the default success panel (WhatHappensNext). */
  renderSuccess?: (s: QuoteSnapshot) => ReactNode;
  id?: string;
  className?: string;
}

const STEP_LABELS = { en: ["Service", "Car", "Contact"], es: ["Servicio", "Vehículo", "Contacto"] };

const EN = {
    title: "GET MY FREE QUOTE", s1: "What can we help with?", s1sub: "Tap one. You can change it later.",
    s2: "What are you driving?", for: "For:", change: "change", year: "Year", make: "Make", model: "Model",
    note: "Anything else? (optional)", addNote: "+ Add a note (optional)", notePh: "New car, how you drive, where you park...",
    next: "NEXT", back: "Back", needCar: "Add the year, make and model so we can price it.",
    s3: "Where should we send your quote?", first: "First name", last: "Last name", phone: "Mobile number", email: "Email",
    submit: "GET MY FREE QUOTE", sending: "SENDING...", tos: "Please agree to the Terms of Service before submitting.",
    error: "Something went wrong. Please call us at (703) 775-4383 or try again.",
    fine: "Nothing to pay now. A 20% deposit locks your date only after you approve your exact quote, goes toward your total, and is fully refundable at any time.",
    reply: "Reply within the hour", from: (n: number) => `from ${n} Google reviews`, google: "Rated on Google",
    fleet: true, prefilled: "Pre-filled by AI Assistant", thisMonth: "This month:",
};
type Text = typeof EN;

/** Spanish wording: the existing Spanish form copy (lib/es.ts, passed in so English pages don't load it) plus the step prompts. */
function esText(ui: EsUi["form"]): Text {
  return {
    title: ui.title, s1: "¿En qué le podemos ayudar?", s1sub: "Toque una opción. Puede cambiarla después.",
    s2: "¿Qué vehículo tiene?", for: "Para:", change: "cambiar", year: ui.year, make: ui.make, model: ui.model,
    note: `${ui.message} (opcional)`, addNote: "+ Agregar un comentario (opcional)", notePh: "Carro nuevo, cómo maneja, dónde se estaciona...",
    next: "SIGUIENTE", back: "Atrás", needCar: "Escriba el año, la marca y el modelo para darle el precio.",
    s3: "¿A dónde le enviamos su cotización?", first: ui.firstName, last: ui.lastName, phone: "Celular", email: ui.email,
    submit: ui.submit, sending: ui.sending, tos: ui.error,
    error: "Algo salió mal. Llámenos al (703) 775-4383 o intente de nuevo.",
    fine: ui.finePrint,
    reply: "Respondemos en menos de una hora", from: (n: number) => `en ${n} reseñas de Google`, google: "Calificación en Google",
    fleet: false, prefilled: "", thisMonth: "",
  };
}

export default function QuoteSteps(props: QuoteStepsProps) {
  const {
    formId, dataForm = formId, leadMethod = formId === "contact" ? "contact_form" : "quote_form", leadService,
    presetService, lockService = false, presetVehicle, defaultMessage = "", readUrlParams = false, showActivePromo = false,
    lang = "en", esUi, compact = false, title, subtitle, submitLabel, footnote, tosCheckbox = true, noteOpen = false, renderSuccess, id, className = "",
  } = props;
  const t = lang === "es" && esUi ? esText(esUi) : EN;
  const uid = useId().replace(/:/g, "");
  const boxRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState({
    firstName: "", lastName: "", phone: "", email: "",
    year: presetVehicle?.year ?? "", make: presetVehicle?.make ?? "", model: presetVehicle?.model ?? "",
    service: presetService ? normalizeService(presetService) : "",
    message: defaultMessage,
  });
  const [step, setStep] = useState(presetService || lockService ? 2 : 1);
  const [showNote, setShowNote] = useState(noteOpen);
  const [agreedToTos, setAgreedToTos] = useState(!tosCheckbox);
  const [submitted, setSubmitted] = useState(false);
  const [contactId, setContactId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [preFilledByAI, setPreFilledByAI] = useState(false);
  // From the URL on /get-a-quote (promo CTAs pass promoTitle); otherwise from props.
  const [urlPromoTitle, setUrlPromoTitle] = useState("");
  const [urlPromoTag, setUrlPromoTag] = useState("");
  const promoTitle = urlPromoTitle || props.promoTitle || "";
  const promoTag = urlPromoTag || props.promoTag || "";
  const { data: activePromo } = trpc.promo.getActive.useQuery(undefined, { enabled: showActivePromo });
  const { rating, total } = useGoogleRating();

  // Name + valid phone typed but never submitted still reaches the CRM (tagged website-partial), with the car for the alert.
  usePartialLead(formId, {
    firstName: form.firstName, lastName: form.lastName, phone: form.phone, email: form.email, service: form.service,
    promoTag: promoTag || undefined, language: lang === "es" ? "es" : undefined, year: form.year, make: form.make, model: form.model,
  }, submitted);

  const scrollToBox = () => {
    const el = boxRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top;
    // Only move when the top of the form is out of view (an embed mid-page should not jump).
    if (top < 0 || top > window.innerHeight * 0.6) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const goTo = (n: number) => {
    setErrorMsg("");
    setStep(n);
    track("quote_step", { form_id: dataForm, step: n });
    setTimeout(scrollToBox, 50);
  };

  // /get-a-quote: (1) URL params, (2) the AI assistant's answers.
  useEffect(() => {
    if (!readUrlParams) return;
    const params = new URLSearchParams(window.location.search);
    const serviceParam = params.get("service");
    const summaryParam = params.get("summary");
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
    for (const k of ["year", "make", "model"] as const) { const v = params.get(k); if (v) updates[k] = decodeURIComponent(v); }
    if (promoTitleParam) {
      const decoded = decodeURIComponent(promoTitleParam);
      setUrlPromoTitle(decoded);
      setUrlPromoTag(promoTagFor(decoded, ""));
    } else if (promoSlugParam) {
      setUrlPromoTag(decodeURIComponent(promoSlugParam) + "-promo");
    }
    if (updates.service) setStep(2);
    if (Object.keys(updates).length > 0) {
      setForm((prev) => ({ ...prev, ...updates }));
      if (summaryParam && !promoNoteParam) setPreFilledByAI(true);
      if (updates.message) setShowNote(true);
      setTimeout(() => boxRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 300);
    }
    const data = quoteAssistantStore.formData;
    if (data) {
      setForm((prev) => ({
        ...prev,
        firstName: data.firstName || "", lastName: data.lastName || "", phone: data.phone || "", email: data.email || "",
        make: data.make || prev.make || "", model: data.model || prev.model || "", year: data.year || prev.year || "",
        service: normalizeService(data.service || "") || prev.service,
      }));
      if (data.service) setStep(2);
      setPreFilledByAI(true);
      quoteAssistantStore.formData = null; // so it doesn't re-fill on the next visit
    }
  }, [readUrlParams]);

  const submit = trpc.contact.submit.useMutation({
    onSuccess: (r) => {
      setContactId(r?.contactId ?? null);
      setSubmitted(true);
      setErrorMsg("");
      trackLead(leadMethod, leadService ?? form.service);
    },
    onError: (err) => {
      setErrorMsg(t.error);
      track("form_error", { form_id: dataForm, error_message: String(err?.message ?? err).slice(0, 100) });
      console.error("[Quote form error]", err);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    if (step !== 3) return; // Enter on the car step must not submit
    if (!agreedToTos) { setErrorMsg(t.tos); return; }
    const journey = await leadJourney();
    submit.mutate({
      journey,
      formId,
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      phone: form.phone || undefined,
      make: form.make || undefined,
      model: form.model || undefined,
      year: form.year || undefined,
      service: form.service || undefined,
      message: form.message.trim() || defaultMessage || undefined,
      promoTag: promoTag || undefined,
      ...(lang === "es" ? { language: "es" as const } : {}),
    });
  };

  const set = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const serviceLabel = (v: string) => { const o = SERVICE_OPTIONS.find((x) => x.value === v); return o ? (lang === "es" ? o.es : o.label) : v; };
  const inputClass = "w-full bg-[#1a1a1a] border border-zinc-700 text-zinc-100 px-4 py-3 text-base sm:text-sm focus:outline-none focus:border-[#E85D04] transition-colors placeholder:text-zinc-400";
  const labelClass = "block text-xs font-bold tracking-[0.2em] uppercase text-[#E85D04] mb-2";
  const ctaClass = `cta w-full bg-[#E85D04] text-[#0A0A0A] font-['Bebas_Neue',sans-serif] ${compact ? "text-lg py-3.5" : "text-xl py-4"} tracking-widest hover:bg-[#d45200] transition-colors flex items-center justify-center gap-2`;
  const visibleSteps = lockService ? [2, 3] : [1, 2, 3];
  const years = quoteYears();

  const box = compact
    ? "border border-zinc-800 bg-[#0D0D0D] p-5 sm:p-7"
    : "squircle bg-[#111] border border-zinc-800 p-6 sm:p-8 md:p-10";

  if (submitted) {
    const snap: QuoteSnapshot = { ...form, contactId };
    return (
      <div ref={boxRef} id={id} className={`${renderSuccess ? "" : box} scroll-mt-24 ${className}`} lang={lang === "es" ? "es" : undefined}>
        {renderSuccess ? renderSuccess(snap) : <WhatHappensNext service={form.service} name={form.firstName.trim() || undefined} />}
      </div>
    );
  }

  return (
    <div ref={boxRef} id={id} className={`${box} scroll-mt-24 ${className}`} lang={lang === "es" ? "es" : undefined}>
      <div className={`flex items-start justify-between gap-4 ${compact ? "mb-5" : "mb-8"}`}>
        <div>
          <h2 className={`font-['Bebas_Neue',sans-serif] ${compact ? "text-2xl" : "text-3xl"} text-white tracking-wider`}>{title ?? t.title}</h2>
          {subtitle && <div className="text-zinc-400 text-sm mt-1">{subtitle}</div>}
          {showActivePromo && !promoTitle && activePromo?.title && (
            <p className="text-zinc-400 text-xs mt-2">
              {t.thisMonth} <Link href="/promo" data-cta="quote-page-promo" className="text-[#E85D04] underline underline-offset-2 decoration-1 hover:decoration-2">{activePromo.title}: {(activePromo.tagline ?? "Full Front PPF + free ceramic coating").replace(/\s*[—-]\s*Spots Are Limited\.?$/i, "")}</Link>
            </p>
          )}
        </div>
        {(promoTitle || preFilledByAI) && (
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
                {t.prefilled}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Progress: three short steps (two when the service is the deal) */}
      <ol className={`flex items-center gap-2 ${compact ? "mb-6" : "mb-8"}`} aria-label={lang === "es" ? "Pasos" : "Quote steps"}>
        {visibleSteps.map((n, i) => {
          const label = STEP_LABELS[lang][n - 1];
          const done = step > n, here = step === n;
          return (
            <li key={label} className="flex-1" aria-current={here ? "step" : undefined}>
              <div className={`h-1.5 rounded-full ${step >= n ? "bg-[#E85D04]" : "bg-zinc-800"}`} />
              <p className={`mt-2 text-xs font-bold tracking-[0.15em] uppercase whitespace-nowrap flex items-center gap-1 ${here ? "text-white" : done ? "text-[#E85D04]" : "text-zinc-500"}`}>
                {done ? <Check className="w-3.5 h-3.5" /> : <span>{i + 1}.</span>} {label}
              </p>
            </li>
          );
        })}
      </ol>

      <form onSubmit={handleSubmit} data-form={dataForm} data-step={step} className="space-y-5" lang={lang === "es" ? "es" : undefined}>
        {step === 1 && (
          <div>
            <h3 className="text-white text-xl font-semibold mb-1">{t.s1}</h3>
            <p className="text-zinc-400 text-sm mb-5">{t.s1sub}</p>
            <div className="grid grid-cols-1 gap-3">
              {SERVICE_OPTIONS.map((opt) => (
                <button
                  type="button"
                  key={opt.value}
                  data-service={opt.value}
                  onClick={() => { setForm((prev) => ({ ...prev, service: opt.value })); goTo(2); }}
                  className={`text-left flex items-center justify-between gap-3 px-5 ${compact ? "py-3.5 min-h-[52px]" : "py-4 min-h-[56px]"} border transition-colors ${
                    form.service === opt.value ? "border-[#E85D04] bg-[#1a1a1a]" : "border-zinc-700 bg-[#161616] hover:border-[#E85D04]"
                  }`}
                >
                  <span className="text-zinc-100 text-base">{lang === "es" ? opt.es : opt.label}</span>
                  <ArrowRight className="w-4 h-4 text-[#E85D04] shrink-0" />
                </button>
              ))}
            </div>
            {t.fleet && (
              <p className="text-zinc-400 text-xs mt-4">Managing more than one vehicle, or a dealership? <Link href="/fleet-ppf" className="text-[#E85D04] underline underline-offset-2 decoration-1 hover:decoration-2">Use the fleet form</Link> for per-unit pricing.</p>
            )}
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <div>
              <h3 className="text-white text-xl font-semibold mb-1">{t.s2}</h3>
              <p className="text-zinc-400 text-sm">
                {t.for} <span className="text-white">{serviceLabel(form.service)}</span>
                {!lockService && <>{" "}<button type="button" onClick={() => goTo(1)} className="text-[#E85D04] underline underline-offset-2 decoration-1">{t.change}</button></>}
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className={labelClass} htmlFor={`${uid}-year`}>{t.year}</label>
                <div className="relative">
                  <select id={`${uid}-year`} name="year" required value={form.year} onChange={set("year")} className={`${inputClass} appearance-none pr-8 ${form.year ? "" : "text-zinc-400"}`}>
                    <option value="" disabled>{t.year}</option>
                    {years.map((y) => <option key={y} value={String(y)}>{y}</option>)}
                    {form.year && !years.includes(Number(form.year)) && <option value={form.year}>{form.year}</option>}
                  </select>
                  <ChevronDown aria-hidden="true" className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#E85D04]" />
                </div>
              </div>
              <div className="col-span-2">
                <label className={labelClass} htmlFor={`${uid}-make`}>{t.make}</label>
                <input id={`${uid}-make`} name="make" type="text" required list={`${uid}-makes`} value={form.make} onChange={set("make")} className={inputClass} placeholder="Tesla, BMW..." autoComplete="off" autoCapitalize="words" />
                <datalist id={`${uid}-makes`}>{QUOTE_MAKES.map((m) => <option key={m} value={m} />)}</datalist>
              </div>
            </div>
            <div>
              <label className={labelClass} htmlFor={`${uid}-model`}>{t.model}</label>
              <input id={`${uid}-model`} name="model" type="text" required list={`${uid}-models`} value={form.model} onChange={set("model")} className={inputClass} placeholder={modelsFor(form.make)[0] ? `e.g. ${modelsFor(form.make)[0]}` : "Model Y"} autoComplete="off" autoCapitalize="words" />
              <datalist id={`${uid}-models`}>{modelsFor(form.make).map((m) => <option key={m} value={m} />)}</datalist>
            </div>
            {showNote || form.message ? (
              <div>
                <label className={labelClass} htmlFor={`${uid}-note`}>{t.note}</label>
                <textarea id={`${uid}-note`} name="message" value={form.message} onChange={set("message")} rows={3} className={`${inputClass} resize-none`} placeholder={defaultMessage || t.notePh} />
              </div>
            ) : (
              <button type="button" onClick={() => setShowNote(true)} className="text-[#E85D04] text-sm underline underline-offset-2 decoration-1">{t.addNote}</button>
            )}
            {errorMsg && <p className="text-red-400 text-sm" role="alert">{errorMsg}</p>}
            <div>
              <button
                type="button"
                data-action="next"
                onClick={() => (form.year && form.make.trim() && form.model.trim() ? goTo(3) : setErrorMsg(t.needCar))}
                className={ctaClass}
              >
                {t.next} <ArrowRight size={18} />
              </button>
              {!lockService && <button type="button" onClick={() => goTo(1)} className="mt-3 text-zinc-400 hover:text-white text-sm flex items-center gap-1"><ArrowLeft size={14} /> {t.back}</button>}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-5">
            <div>
              <h3 className="text-white text-xl font-semibold mb-1">{t.s3}</h3>
              <p className="text-zinc-400 text-sm">{[form.year, form.make, form.model].filter(Boolean).join(" ")} · {serviceLabel(form.service)}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass} htmlFor={`${uid}-first`}>{t.first}</label>
                <input id={`${uid}-first`} name="given-name" type="text" required value={form.firstName} onChange={set("firstName")} className={inputClass} placeholder={lang === "es" ? "Juan" : "John"} autoComplete="given-name" />
              </div>
              <div>
                <label className={labelClass} htmlFor={`${uid}-last`}>{t.last}</label>
                <input id={`${uid}-last`} name="family-name" type="text" required value={form.lastName} onChange={set("lastName")} className={inputClass} placeholder={lang === "es" ? "Pérez" : "Smith"} autoComplete="family-name" />
              </div>
            </div>
            <div>
              <label className={labelClass} htmlFor={`${uid}-phone`}>{t.phone}</label>
              <input id={`${uid}-phone`} name="tel" inputMode="tel" type="tel" required value={form.phone} onChange={set("phone")} className={inputClass} placeholder="(703) 000-0000" autoComplete="tel" />
            </div>
            <div>
              <label className={labelClass} htmlFor={`${uid}-email`}>{t.email}</label>
              <input id={`${uid}-email`} name="email" inputMode="email" type="email" required value={form.email} onChange={set("email")} className={inputClass} placeholder={lang === "es" ? "juan@ejemplo.com" : "john@example.com"} autoComplete="email" />
            </div>

            {tosCheckbox ? (
              <label className={`flex items-start gap-3 cursor-pointer rounded p-3 transition-colors ${!agreedToTos ? "border border-zinc-700" : "border border-[#E85D04]/40 bg-[#E85D04]/5"}`}>
                <input type="checkbox" required checked={agreedToTos} onChange={(e) => setAgreedToTos(e.target.checked)} className="mt-0.5 w-5 h-5 accent-[#E85D04] flex-shrink-0 cursor-pointer" />
                {lang === "es" ? (
                  <span className="text-xs text-zinc-400 leading-relaxed">
                    {esUi?.terms}{" "}
                    <a href="/terms-of-service" target="_blank" rel="noopener noreferrer" className="text-[#E85D04] underline underline-offset-2 decoration-1 hover:decoration-2" onClick={(e) => e.stopPropagation()}>{esUi?.termsLink}</a>
                  </span>
                ) : (
                  <span className="text-xs text-zinc-400 leading-relaxed">
                    I agree to Skyline Customs'{" "}
                    <a href="/terms-of-service" target="_blank" rel="noopener noreferrer" className="text-[#E85D04] underline underline-offset-2 decoration-1 hover:decoration-2" onClick={(e) => e.stopPropagation()}>
                      Terms of Service &amp; Warranty Policy
                    </a>
                    , including the aftercare guidelines and warranty terms for the selected service.
                  </span>
                )}
              </label>
            ) : (
              <p className="text-xs text-zinc-500 leading-relaxed">
                By requesting a quote you agree to Skyline Customs'{" "}
                <a href="/terms-of-service" target="_blank" rel="noopener noreferrer" className="text-[#E85D04] underline underline-offset-2 decoration-1 hover:decoration-2">Terms of Service &amp; Warranty Policy</a>.
                Nothing is booked and nothing is charged until you approve your quote.
              </p>
            )}

            {errorMsg && <p className="text-red-400 text-sm" role="alert">{errorMsg}</p>}

            <div>
              {/* Proof right where the decision happens: the live Google rating (Places API), never a hardcoded count. */}
              <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm text-zinc-300 mb-3" data-proof="google-rating">
                <span className="inline-flex items-center gap-1">
                  <Star aria-hidden="true" className="w-4 h-4 fill-[#E85D04] text-[#E85D04]" />
                  {rating && total ? <span><b className="text-white">{rating.toFixed(1)}</b> {t.from(total)}</span> : <span>{t.google}</span>}
                </span>
                <span aria-hidden="true" className="text-zinc-600">·</span>
                <span>{t.reply}</span>
              </p>
              <button type="submit" disabled={submit.isPending || !agreedToTos} className={`${ctaClass} group disabled:opacity-50 disabled:cursor-not-allowed`}>
                {submit.isPending ? t.sending : submitLabel ?? t.submit}
                {!submit.isPending && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
              </button>
              <button type="button" onClick={() => goTo(2)} className="mt-3 text-zinc-400 hover:text-white text-sm flex items-center gap-1"><ArrowLeft size={14} /> {t.back}</button>
            </div>
            <SmsConsent lang={lang} className="mt-3" />
            <p className="text-center text-zinc-400 text-xs leading-relaxed">{footnote ?? t.fine}</p>
          </div>
        )}
      </form>
    </div>
  );
}
