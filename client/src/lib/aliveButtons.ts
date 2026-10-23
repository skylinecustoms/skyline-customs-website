// The details that make the orange buttons (class "cta") feel alive, as on runonsystems.com: a light that
// follows the cursor across the button and a slight magnetic lean toward it. One listener for the whole
// site, so no button needs its own code. Mouse only; nothing runs on touch or with reduced motion.
export function installAliveButtons() {
  if (typeof window === "undefined") return () => {};
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return () => {};
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return () => {};
  let current: HTMLElement | null = null;
  const reset = (el: HTMLElement) => { el.style.removeProperty("translate"); };
  const move = (e: PointerEvent) => {
    const el = (e.target as Element | null)?.closest?.<HTMLElement>(".cta") ?? null;
    if (current && current !== el) reset(current);
    current = el;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
    // lean less on wide buttons (full-width form submits) so they don't wander
    const k = r.width > 360 ? 0.04 : 0.15;
    el.style.translate = `${(e.clientX - (r.left + r.width / 2)) * k}px ${(e.clientY - (r.top + r.height / 2)) * 0.25}px`;
  };
  const leave = () => { if (current) reset(current); current = null; };
  document.addEventListener("pointermove", move, { passive: true });
  document.documentElement.addEventListener("pointerleave", leave);
  return () => { document.removeEventListener("pointermove", move); document.documentElement.removeEventListener("pointerleave", leave); };
}
