/**
 * Shown at the top of the promo page after Stripe sends the customer back
 * with ?deposit=paid&session_id=... (or ?deposit=cancelled). Confirms the
 * payment with the server, which also records it if the webhook was slow.
 */
import { useEffect, useState } from "react";
import { CheckCircle, Info } from "lucide-react";
import { track } from "@/lib/analytics";

const COPY = {
  en: { paidTitle: "Deposit received. Your spot is reserved.", paidBody: (amount: string | null, name: string | null) => `${name ? `${name}, thank` : "Thank"} you. ${amount ? `Your ${amount} deposit` : "Your deposit"} is in, fully refundable and applied to your total. We will call or text shortly to set your install date.`, checking: "Confirming your deposit...", cancelled: "No charge was made. Your quote request is still in, and we will call you shortly. You can reserve your date by phone whenever you are ready." },
  es: { paidTitle: "Depósito recibido. Su cupo está reservado.", paidBody: (amount: string | null, name: string | null) => `${name ? `${name}, gracias` : "Gracias"}. ${amount ? `Su depósito de ${amount}` : "Su depósito"} quedó registrado, es totalmente reembolsable y se aplica a su total. Le llamaremos o escribiremos pronto para fijar la fecha de instalación.`, checking: "Confirmando su depósito...", cancelled: "No se realizó ningún cargo. Su solicitud de cotización sigue en pie y le llamaremos pronto. Puede reservar su fecha por teléfono cuando guste." },
};

export default function DepositBanner({ lang = "en" }: { lang?: "en" | "es" }) {
  const c = COPY[lang];
  const [state, setState] = useState<{ kind: "none" | "checking" | "paid" | "cancelled" | "unknown"; amount?: string | null; name?: string | null }>({ kind: "none" });

  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const d = q.get("deposit");
    if (d === "cancelled") { setState({ kind: "cancelled" }); track("deposit_cancelled", {}); return; }
    if (d !== "paid") return;
    const id = q.get("session_id") ?? "";
    setState({ kind: "checking" });
    fetch(`/api/deposit/status?session_id=${encodeURIComponent(id)}`).then((r) => r.json()).then((j) => {
      if (j?.paid) { setState({ kind: "paid", amount: j.amount, name: j.name }); track("deposit_paid", { amount: j.amount ?? "" }); }
      else setState({ kind: "unknown" });
    }).catch(() => setState({ kind: "unknown" }));
    // Clean the URL so a refresh does not re-run this.
    try { window.history.replaceState(null, "", window.location.pathname); } catch { /* ignore */ }
  }, []);

  if (state.kind === "none") return null;
  if (state.kind === "cancelled") {
    return (
      <div className="container max-w-6xl pt-28 -mb-20 relative z-20">
        <div className="border border-zinc-700 bg-[#111] p-5 flex items-start gap-3"><Info className="w-5 h-5 text-[#E85D04] shrink-0 mt-0.5" /><p className="text-zinc-300 text-sm leading-relaxed">{c.cancelled}</p></div>
      </div>
    );
  }
  return (
    <div className="container max-w-6xl pt-28 -mb-20 relative z-20">
      <div className="border border-emerald-700 bg-emerald-900/30 p-5 md:p-6 flex items-start gap-3">
        <CheckCircle className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
        <div>
          <p className="font-display text-2xl text-white tracking-wide">{state.kind === "paid" ? c.paidTitle : c.checking}</p>
          {state.kind === "paid" && <p className="text-zinc-200 text-sm leading-relaxed mt-1">{c.paidBody(state.amount ?? null, state.name ?? null)}</p>}
          {state.kind === "unknown" && <p className="text-zinc-300 text-sm leading-relaxed mt-1">{lang === "es" ? "Recibimos su pago en Stripe; la confirmación puede tardar un minuto. Le llamaremos pronto." : "Stripe has your payment; confirmation can take a minute. We will call you shortly."}</p>}
        </div>
      </div>
    </div>
  );
}
