/**
 * Self-healing film: a close-up of the glossy orange Model 3's front end. Dragging scratches the paint (a
 * mask keeps scratches off glass, tires and floor). Heat, from the sun or warm water, then softens them:
 * with PPF they flow away, on bare paint they stay.
 */
export type HeatKind = "sun" | "water";
export interface HealApi { setFilm(on: boolean): void; heat(kind: HeatKind): boolean; destroy(): void }

type P = { x: number; y: number };

export function mountHeal(cv: HTMLCanvasElement, opts: { onScratch(n: number): void; onHeated(healed: boolean, n: number): void }): HealApi {
  const cx = cv.getContext("2d")!, img = new Image(), mask = new Image();
  img.src = "/images/demos/heal-car.webp"; mask.src = "/images/demos/heal-mask.png";
  const scr = document.createElement("canvas"), sx = scr.getContext("2d")!, m2 = document.createElement("canvas"), mc = m2.getContext("2d")!;
  let W = 0, H = 0, DPR = 1, film = true, heat: { kind: HeatKind; t0: number } | null = null, last: P | null = null, count = 0, run = false, seen = false, seed = 9;
  const rnd = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };

  function size() {
    const r = cv.getBoundingClientRect(); DPR = Math.min(devicePixelRatio || 1, 2);
    const w = Math.round(r.width * DPR), h = Math.round(r.height * DPR); if (!w || (w === W && h === H)) return;
    W = cv.width = scr.width = m2.width = w; H = cv.height = scr.height = m2.height = h;
  }
  // a scratch: a few fine parallel lines, bright where the clear coat is cut, with a dark hairline beside
  function scratch(a: P, b: P) {
    const len = Math.hypot(b.x - a.x, b.y - a.y); if (len < 1) return; const nx = -(b.y - a.y) / len, ny = (b.x - a.x) / len;
    for (let i = 0; i < 4; i++) {
      const o = (i - 1.5) * 2.2 * DPR + (rnd() - .5) * DPR;
      sx.lineCap = "round"; sx.strokeStyle = `rgba(255,240,225,${.55 + rnd() * .35})`; sx.lineWidth = (.7 + rnd() * .8) * DPR;
      sx.beginPath(); sx.moveTo(a.x + nx * o, a.y + ny * o); sx.lineTo(b.x + nx * o, b.y + ny * o); sx.stroke();
      sx.strokeStyle = "rgba(60,20,0,.35)"; sx.lineWidth = .6 * DPR; sx.beginPath(); sx.moveTo(a.x + nx * (o + DPR), a.y + ny * (o + DPR)); sx.lineTo(b.x + nx * (o + DPR), b.y + ny * (o + DPR)); sx.stroke();
    }
  }
  function frame(now: number) {
    if (!seen) { run = false; return; }
    size(); cx.fillStyle = "#0a0a0a"; cx.fillRect(0, 0, W, H);
    if (img.complete && img.naturalWidth) cx.drawImage(img, 0, 0, W, H);
    const k = heat ? Math.min(1, (now - heat.t0) / 2600) : 0, keep = heat ? (film ? 1 - k : 1 - .12 * k) : 1;
    // scratches, cut to the paint, softening as the heat works on them
    cx.save(); cx.globalAlpha = keep; if (heat && film) cx.filter = `blur(${(k * 2.5 * DPR).toFixed(1)}px)`;
    mc.globalCompositeOperation = "copy"; mc.drawImage(scr, 0, 0); mc.globalCompositeOperation = "source-over";
    if (mask.complete && mask.naturalWidth) { mc.globalCompositeOperation = "destination-in"; mc.drawImage(mask, 0, 0, W, H); mc.globalCompositeOperation = "source-over"; }
    cx.drawImage(m2, 0, 0); cx.restore();
    if (heat) {
      const a = Math.sin(k * Math.PI);
      if (heat.kind === "sun") { // a warm glow from above and heat haze rising off the paint
        const g = cx.createRadialGradient(W * .85, -H * .1, 0, W * .85, -H * .1, W * .9); g.addColorStop(0, `rgba(255,230,160,${.55 * a})`); g.addColorStop(1, "rgba(255,170,60,0)"); cx.fillStyle = g; cx.fillRect(0, 0, W, H);
        cx.strokeStyle = `rgba(255,240,210,${.14 * a})`; cx.lineWidth = 2 * DPR;
        for (let i = 0; i < 9; i++) { const x0 = W * (.1 + i * .1), off = (now / 14 + i * 40) % H; cx.beginPath(); for (let y = H; y > 0; y -= 8 * DPR) cx.lineTo(x0 + Math.sin((y + off) / 22) * 6 * DPR, y - off * .2); cx.stroke(); }
      } else { // warm water: a sheet runs down the panel, catching the light
        const yb = H * (k * 1.3 - .2), wg = cx.createLinearGradient(0, yb - H * .35, 0, yb); wg.addColorStop(0, "rgba(200,225,255,0)"); wg.addColorStop(.85, `rgba(215,235,255,${.28 * a})`); wg.addColorStop(1, `rgba(255,255,255,${.6 * a})`);
        cx.fillStyle = wg; cx.fillRect(0, 0, W, Math.max(0, yb));
        cx.fillStyle = `rgba(255,255,255,${.5 * a})`; for (let j = 0; j < 30; j++) { const dx = (j * 97.3) % W, dy = yb - ((j * 53.1) % (H * .35)); cx.beginPath(); cx.arc(dx, dy, (1 + (j % 3)) * DPR, 0, 6.28); cx.fill(); }
      }
      if (k >= 1) {
        const n = count;
        if (film) { sx.clearRect(0, 0, W, H); count = 0; }
        else { mc.globalCompositeOperation = "copy"; mc.globalAlpha = .88; mc.drawImage(scr, 0, 0); mc.globalAlpha = 1; mc.globalCompositeOperation = "source-over"; sx.clearRect(0, 0, W, H); sx.drawImage(m2, 0, 0); }
        heat = null; opts.onHeated(film, n);
      }
    }
    requestAnimationFrame(frame);
  }
  function start() { if (!run) { run = true; requestAnimationFrame(frame); } }
  const pt = (e: PointerEvent): P => { const r = cv.getBoundingClientRect(); return { x: (e.clientX - r.left) * W / r.width, y: (e.clientY - r.top) * H / r.height }; };
  const down = (e: PointerEvent) => { if (heat) return; cv.setPointerCapture(e.pointerId); last = pt(e); count++; opts.onScratch(count); };
  const move = (e: PointerEvent) => { if (!last) return; const p = pt(e); scratch(last, p); last = p; };
  const up = () => { last = null; };
  cv.addEventListener("pointerdown", down); cv.addEventListener("pointermove", move); cv.addEventListener("pointerup", up); cv.addEventListener("pointercancel", up);
  const io = new IntersectionObserver((es) => { seen = es[0].isIntersecting; if (seen) start(); });
  io.observe(cv);

  return {
    setFilm(on) { if (heat) return; film = on; sx.clearRect(0, 0, W, H); count = 0; opts.onScratch(0); },
    heat(kind) { if (heat || !count) return false; heat = { kind, t0: performance.now() }; return true; },
    destroy() { seen = false; io.disconnect(); cv.removeEventListener("pointerdown", down); cv.removeEventListener("pointermove", move); cv.removeEventListener("pointerup", up); cv.removeEventListener("pointercancel", up); },
  };
}
