/**
 * One small panel for visitors who are about to leave the promo page without
 * asking for a price: name + phone, "text me the price". Desktop: the cursor
 * heads for the tab bar. Phone: a fast scroll back toward the top after reading
 * a good part of the page. Shown once per week per browser, never once a lead
 * (partial or full) has been captured on this visit, and never while the form
 * section is on screen.
 */
import { useEffect, useRef, useState } from "react";
import { ArrowRight, X, CheckCircle } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { leadJourney, track } from "@/lib/analytics";
import { isValidPhone, leadCapturedThisSession, markLeadCaptured } from "@/lib/partialLead";

interface Props {
  promoTitle: string;
  promoTag: string;
  /** Section id to leave alone: no prompt while it is in view. */
  formSectionId?: string;
}

const STORAGE_KEY = "sc-exit-prompt-at";
const WEEK = 7 * 24 * 60 * 60 * 1000;

function shownRecently(): boolean {
  try { const t = Number(localStorage.getItem(STORAGE_KEY) ?? 0); return Date.now() - t < WEEK; } catch { return false; }
}
function rememberShown(): void {
  try { localStorage.setItem(STORAGE_KEY, String(Date.now())); } catch { /* private mode */ }
}

export default function ExitPrompt({ promoTitle, promoTag, formSectionId = "claim" }: Props) {
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [err, setErr] = useState("");
  const armed = useRef(false);
  const submit = trpc.contact.partial.useMutation({
    onSuccess: () => { setDone(true); markLeadCaptured(); track("exit_prompt_submit", { form_id: "exit" }); },
    onError: () => setErr("Could not send. Call or text (703) 775-4383 and we'll get you the price."),
  });

  useEffect(() => {
    if (shownRecently() || leadCapturedThisSession()) return;
    armed.current = true;
    const formInView = () => {
      const el = formSectionId ? document.getElementById(formSectionId) : null;
      if (!el) return false;
      const r = el.getBoundingClientRect();
      return r.top < window.innerHeight && r.bottom > 0;
    };
    const fire = (trigger: string) => {
      if (!armed.current || leadCapturedThisSession() || formInView()) return;
      armed.current = false;
      rememberShown();
      setOpen(true);
      track("exit_prompt_shown", { trigger });
    };
    // Desktop: cursor leaves through the top of the window.
    const onLeave = (e: MouseEvent) => { if (e.clientY <= 0 && e.relatedTarget === null) fire("mouse_leave"); };
    // Phone: scrolled a good way down, then a fast flick back up.
    let maxDepth = 0, lastY = window.scrollY, lastT = Date.now(), upDistance = 0;
    const onScroll = () => {
      const y = window.scrollY, now = Date.now();
      const depth = (y + window.innerHeight) / Math.max(document.body.scrollHeight, 1);
      maxDepth = Math.max(maxDepth, depth);
      if (y < lastY && now - lastT < 400) upDistance += lastY - y; else upDistance = 0;
      lastY = y; lastT = now;
      if (maxDepth > 0.35 && upDistance > 500 && y < 240) fire("scroll_up");
    };
    document.addEventListener("mouseout", onLeave);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { document.removeEventListener("mouseout", onLeave); window.removeEventListener("scroll", onScroll); };
  }, [formSectionId]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (!open) return null;

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    if (name.trim().length < 2) { setErr("Your first name, please."); return; }
    if (!isValidPhone(phone)) { setErr("That phone number does not look right."); return; }
    const journey = await leadJourney();
    submit.mutate({ firstName: name.trim(), phone: phone.trim(), service: "PPF", promoTag, formId: "exit", page: window.location.pathname, journey });
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-black/70 p-4" role="dialog" aria-modal="true" aria-labelledby="exit-prompt-title" onClick={() => setOpen(false)}>
      <div className="w-full max-w-md bg-[#0D0D0D] border border-[#E85D04]/50 p-6 sm:p-8 relative" onClick={(e) => e.stopPropagation()}>
        <button type="button" onClick={() => setOpen(false)} aria-label="Close" className="absolute top-3 right-3 w-9 h-9 inline-flex items-center justify-center text-zinc-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>
        {done ? (
          <div className="text-center py-2">
            <CheckCircle className="w-10 h-10 text-emerald-400 mx-auto mb-3" />
            <p className="font-display text-3xl text-white tracking-wide mb-2">ON ITS WAY</p>
            <p className="text-zinc-300 text-sm leading-relaxed">We'll text you the {promoTitle || "special"} price shortly, during business hours. No spam, just the number.</p>
          </div>
        ) : (
          <form onSubmit={send} data-form="exit-prompt" className="space-y-4">
            <p className="text-[#E85D04] text-xs font-bold tracking-[0.3em] uppercase">Before you go</p>
            <h2 id="exit-prompt-title" className="font-display text-3xl sm:text-4xl text-white leading-none">WANT THE PRICE<br />TEXTED TO YOU?</h2>
            <p className="text-zinc-400 text-sm leading-relaxed">First name and number. We text you the exact {promoTitle || "special"} price for your car, and the open install dates. Nothing else.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input type="text" required autoComplete="given-name" placeholder="First name" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-[#111] border border-zinc-700 text-zinc-100 px-4 py-3 text-sm focus:outline-none focus:border-[#E85D04] placeholder:text-zinc-500" />
              <input type="tel" required autoComplete="tel" placeholder="(703) 000-0000" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full bg-[#111] border border-zinc-700 text-zinc-100 px-4 py-3 text-sm focus:outline-none focus:border-[#E85D04] placeholder:text-zinc-500" />
            </div>
            {err && <p className="text-red-400 text-sm">{err}</p>}
            <button type="submit" disabled={submit.isPending} className="w-full inline-flex items-center justify-center gap-2 bg-[#E85D04] text-black font-display text-lg tracking-[0.1em] uppercase px-6 py-4 hover:bg-orange-600 transition-colors disabled:opacity-50">
              {submit.isPending ? "Sending..." : "Text me the price"} {!submit.isPending && <ArrowRight className="w-5 h-5" />}
            </button>
            <p className="text-zinc-500 text-[11px] leading-relaxed">By sending, you agree to receive a text from Skyline Customs about this request. Reply STOP any time.</p>
          </form>
        )}
      </div>
    </div>
  );
}
