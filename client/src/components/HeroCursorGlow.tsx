import { useEffect, useRef } from "react";

// A soft orange glow that follows the mouse over the home hero. Desktop with a mouse only, and off when
// the visitor asks for reduced motion. Moves with CSS variables, so React doesn't re-render on mousemove.
export default function HeroCursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    const section = el?.parentElement;
    if (!el || !section) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const move = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const r = section.getBoundingClientRect();
        el.style.setProperty("--x", `${e.clientX - r.left}px`);
        el.style.setProperty("--y", `${e.clientY - r.top}px`);
        el.dataset.on = "1";
      });
    };
    const leave = () => { cancelAnimationFrame(frame); el.dataset.on = "0"; };
    section.addEventListener("pointermove", move);
    section.addEventListener("pointerleave", leave);
    return () => { cancelAnimationFrame(frame); section.removeEventListener("pointermove", move); section.removeEventListener("pointerleave", leave); };
  }, []);
  return <div ref={ref} className="hero-cursor-glow z-[1]" aria-hidden="true" />;
}
