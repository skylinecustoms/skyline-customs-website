// The text-message consent line under every quote form. Skyline texts each lead within seconds
// (GoHighLevel), and carriers' texting registration (A2P 10DLC) expects this disclosure where the
// number is collected, with links to the terms and privacy policy.
export const SMS_CONSENT_EN = "By sending, you agree to get texts and calls from Skyline Customs about your request. Msg & data rates may apply. Reply STOP to opt out.";
const SMS_CONSENT_ES = "Al enviar, acepta recibir mensajes de texto y llamadas de Skyline Customs sobre su solicitud. Pueden aplicarse tarifas de mensajes y datos. Responda STOP para cancelar.";

export default function SmsConsent({ lang = "en", className = "" }: { lang?: "en" | "es"; className?: string }) {
  const es = lang === "es";
  return (
    <p className={`text-[11px] leading-relaxed text-zinc-500 ${className}`}>
      {es ? SMS_CONSENT_ES : SMS_CONSENT_EN}{" "}
      <a href="/sms-terms" className="underline underline-offset-2 hover:text-zinc-300">{es ? "Términos de mensajes" : "Text terms"}</a>
      {" · "}
      <a href="/privacy-policy" className="underline underline-offset-2 hover:text-zinc-300">{es ? "Privacidad" : "Privacy"}</a>
    </p>
  );
}
