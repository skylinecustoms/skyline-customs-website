/**
 * "Reserve my date" step shown after a promo lead submits: starts a Stripe
 * Checkout for the fully refundable 20% deposit. If online deposits are not
 * enabled on the server, the button simply does not render.
 */
import { useEffect, useState } from "react";
import { ArrowRight, Lock } from "lucide-react";
import { track } from "@/lib/analytics";

interface Props {
  contactId?: string | null;
  firstName: string;
  lastName?: string;
  email: string;
  phone?: string;
  promoTitle: string;
  vehicle?: string;
  lang?: "en" | "es";
}

const COPY = {
  en: { eyebrow: "Optional, but it locks your spot", heading: "Reserve your install date now", body: "Pay the fully refundable 20% deposit now and your spot is held while we call you with the exact price and open dates. It goes toward your total. Card, Klarna, Afterpay, or Affirm.", button: "Reserve my date", starting: "Opening secure checkout...", fail: "Could not open checkout. Call (703) 775-4383 and we will take the deposit by phone.", secure: "Secure checkout by Stripe. Refundable at any time." },
  es: { eyebrow: "Opcional, pero asegura su cupo", heading: "Reserve su fecha de instalación ahora", body: "Pague ahora el depósito del 20 por ciento, totalmente reembolsable, y su cupo queda apartado mientras le llamamos con el precio exacto y las fechas disponibles. Se aplica al total. Tarjeta, Klarna, Afterpay o Affirm.", button: "Reservar mi fecha", starting: "Abriendo el pago seguro...", fail: "No se pudo abrir el pago. Llame al (703) 775-4383 y tomamos el depósito por teléfono.", secure: "Pago seguro con Stripe. Reembolsable en cualquier momento." },
};

export default function DepositButton(p: Props) {
  const c = COPY[p.lang ?? "en"];
  const [enabled, setEnabled] = useState<boolean | null>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    fetch("/api/health").then((r) => r.json()).then((j) => setEnabled(Boolean(j?.integrations?.stripe))).catch(() => setEnabled(false));
  }, []);

  if (!enabled) return null;

  const start = async () => {
    setBusy(true); setErr("");
    track("deposit_start", { promo: p.promoTitle, lang: p.lang ?? "en" });
    try {
      const r = await fetch("/api/deposit/checkout", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(p) });
      const j = await r.json();
      if (!r.ok || !j.url) throw new Error(j.error || "no url");
      window.location.href = j.url;
    } catch {
      setErr(c.fail); setBusy(false);
      track("deposit_error", { promo: p.promoTitle });
    }
  };

  return (
    <div className="mt-6 border border-[#E85D04]/50 bg-[#E85D04]/10 p-6 text-left">
      <p className="text-[#E85D04] text-xs font-bold tracking-[0.3em] uppercase mb-2">{c.eyebrow}</p>
      <h4 className="font-display text-2xl text-white tracking-wide mb-2">{c.heading}</h4>
      <p className="text-zinc-300 text-sm leading-relaxed mb-5">{c.body}</p>
      <button type="button" onClick={start} disabled={busy} className="w-full inline-flex items-center justify-center gap-2 bg-[#E85D04] text-black font-display text-xl tracking-[0.1em] uppercase py-4 hover:bg-orange-600 transition-colors disabled:opacity-60">
        {busy ? c.starting : c.button}{!busy && <ArrowRight className="w-5 h-5" />}
      </button>
      {err && <p className="text-red-400 text-sm mt-3">{err}</p>}
      <p className="flex items-center justify-center gap-1.5 text-zinc-500 text-xs mt-3"><Lock className="w-3 h-3" /> {c.secure}</p>
    </div>
  );
}
