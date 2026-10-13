/**
 * Floating "Text us" button on phones. Opens the Messages app with a short
 * prefilled text, in Spanish on the /es pages. Sits above the page's sticky
 * bar when one is on screen (bars carry data-sticky-bar).
 */
import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { MessageSquare } from "lucide-react";

const PHONE = "+17037754383";

function bodyFor(path: string): string {
  const es = path.startsWith("/es");
  const svc = /tint/i.test(path) ? "tint" : /ceramic/i.test(path) ? "ceramic" : /ppf|promo|full-front|tesla|bmw|porsche|corvette|rivian|bronco|truck|suv|ev-/i.test(path) ? "ppf" : "";
  if (es) {
    const s = svc === "tint" ? "polarizado" : svc === "ceramic" ? "recubrimiento cerámico" : svc === "ppf" ? "PPF frontal completo" : "sus servicios";
    return `Hola Skyline Customs, quiero una cotización de ${s} para mi carro.`;
  }
  const s = svc === "tint" ? "window tint" : svc === "ceramic" ? "a ceramic coating" : svc === "ppf" ? "full front PPF" : "a quote";
  return `Hi Skyline Customs, I'd like a quote for ${s}. My car is a `;
}

export default function TextUsButton() {
  const [path] = useLocation();
  const [lift, setLift] = useState(false);
  const [hidden, setHidden] = useState(false);

  // Check for a sticky bar after each route change (the bars mount with their page).
  useEffect(() => {
    setHidden(/^\/(get-a-quote|contact|thank-you|admin)/.test(path));
    const check = () => {
      const bar = document.querySelector<HTMLElement>("[data-sticky-bar]");
      setLift(!!bar && getComputedStyle(bar).transform !== "matrix(1, 0, 0, 1, 0, 0)" ? false : !!bar);
    };
    check();
    const t1 = setTimeout(check, 600);
    const t2 = setTimeout(check, 2000);
    const onScroll = () => check();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { clearTimeout(t1); clearTimeout(t2); window.removeEventListener("scroll", onScroll); };
  }, [path]);

  if (hidden) return null;
  const es = path.startsWith("/es");
  return (
    <a
      href={`sms:${PHONE}?&body=${encodeURIComponent(bodyFor(path))}`}
      data-cta="text-us"
      aria-label={es ? "Envíenos un mensaje de texto" : "Text us"}
      className={`md:hidden fixed right-3 z-[45] inline-flex items-center gap-2 bg-[#E85D04] text-black font-bold text-sm tracking-wide px-4 py-3 rounded-full shadow-[0_6px_24px_rgba(0,0,0,0.5)] transition-[bottom] duration-300 ${lift ? "bottom-20" : "bottom-4"}`}
    >
      <MessageSquare className="w-4 h-4 fill-current" />
      {es ? "Escríbanos" : "Text us"}
    </a>
  );
}
