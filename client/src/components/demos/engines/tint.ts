/**
 * Tint shades: a close-up of the side glass of the orange Model 3. Picking a shade lays the film on like a
 * real install: a squeegee sweeps down the glass with a sheen of slip solution, the new shade following it.
 * Three views: from outside (can people see in?), from inside by day and at night (can you see out?).
 */
export type TintView = "out" | "in" | "night";
export interface TintApi { pick(v: number): void; setView(v: TintView): void; destroy(): void }

const IMG = "/images/demos/";
const TOP = 50, BOT = 245, BASE_W = 960; // top and bottom of the glass on the 960-wide close-up
// How much of the cabin the film hides from outside, for each shade (light let through: 100 = no film).
const DARK: Record<number, number> = { 100: 0, 70: .3, 50: .5, 35: .64, 20: .78, 5: .93 };
export const LIGHT: Record<number, number> = { 100: 1, 70: .69, 50: .55, 35: .34, 20: .22, 5: .06 };

function load(name: string) { const i = new Image(); i.decoding = "async"; i.src = IMG + name; return i; }
const ready = (i: HTMLImageElement) => i.complete && i.naturalWidth > 0;

export function mountTint(cv: HTMLCanvasElement): TintApi {
  const cx = cv.getContext("2d")!, film = document.createElement("canvas"), fcx = film.getContext("2d")!;
  const outside = load("tint-outside.webp"), glass = load("tint-glass.png"), refl = load("tint-reflections.webp");
  let inDay: HTMLImageElement | null = null, inNight: HTMLImageElement | null = null, glassIn: HTMLImageElement | null = null; // only fetched if someone opens an inside view
  let view: TintView = "out", fromV = 100, toV = 100, wipeStart = -1e9, W = 0, H = 0, K = 1, seen = false, run = false;

  // How dark the glass looks from where you stand. Outside, the film hides the cabin; inside, your eyes
  // adjust, so even dark film stays see-through by day, but at night it costs real visibility.
  function dk(v: number) {
    if (v === 100) return 0;
    if (view === "out") return DARK[v];
    return view === "in" ? 1 - (.38 + .62 * Math.sqrt(LIGHT[v])) : 1 - (.15 + .85 * Math.pow(LIGHT[v], .7));
  }
  function size() {
    const r = cv.getBoundingClientRect(), dpr = Math.min(devicePixelRatio || 1, 2), w = Math.round(r.width * dpr), h = Math.round(r.height * dpr);
    if (!w || (w === W && h === H)) return; W = cv.width = film.width = w; H = cv.height = film.height = h; K = w / BASE_W;
  }
  function shade(d: number, now: number) {
    if (d <= 0) return;
    fcx.fillStyle = `rgba(3,4,6,${d})`; fcx.fillRect(0, 0, W, H);
    if (view !== "out") return;
    // dark film turns the glass into a mirror: a slow glint of studio light drifts across it
    const x = ((now / 9000) % 1) * W * 1.6 - W * .3, g = fcx.createLinearGradient(x - W * .25, 0, x + W * .05, H);
    g.addColorStop(0, "rgba(190,200,215,0)"); g.addColorStop(.5, `rgba(190,200,215,${.04 + d * .16})`); g.addColorStop(1, "rgba(190,200,215,0)");
    fcx.fillStyle = g; fcx.fillRect(0, 0, W, H);
  }
  function frame(now: number) {
    if (!seen || document.visibilityState === "hidden") { run = false; return; }
    size();
    const base = view === "out" ? outside : view === "in" ? inDay! : inNight!, mask = view === "out" ? glass : glassIn!, from = dk(fromV), to = dk(toV);
    cx.fillStyle = "#0a0a0a"; cx.fillRect(0, 0, W, H);
    if (ready(base)) cx.drawImage(base, 0, 0, W, H);
    const e = Math.min(1, (now - wipeStart) / 1100), k = e < .5 ? 2 * e * e : 1 - Math.pow(-2 * e + 2, 2) / 2, line = (TOP - 6 + (BOT - TOP + 12) * k) * K;
    // the film on its own layer: new shade above the squeegee, old shade below, then cut to the glass
    fcx.globalCompositeOperation = "source-over"; fcx.clearRect(0, 0, W, H);
    fcx.save(); fcx.beginPath(); fcx.rect(0, 0, W, line); fcx.clip(); shade(to, now); fcx.restore();
    fcx.save(); fcx.beginPath(); fcx.rect(0, line, W, H - line); fcx.clip(); shade(from, now); fcx.restore();
    if (e < 1) { // slip solution: a wet sheen ahead of the blade, and the blade's bright edge
      const wet = fcx.createLinearGradient(0, line - 26 * K, 0, line + 4 * K); wet.addColorStop(0, "rgba(220,235,255,0)"); wet.addColorStop(1, "rgba(220,235,255,.22)");
      fcx.fillStyle = wet; fcx.fillRect(0, line - 26 * K, W, 30 * K);
      fcx.fillStyle = "rgba(255,255,255,.85)"; fcx.shadowColor = "rgba(255,255,255,.9)"; fcx.shadowBlur = 8 * K; fcx.fillRect(0, line - 1.2 * K, W, 2.4 * K); fcx.shadowBlur = 0;
    }
    if (ready(mask)) { fcx.globalCompositeOperation = "destination-in"; fcx.drawImage(mask, 0, 0, W, H); fcx.globalCompositeOperation = "source-over"; }
    if (ready(base)) cx.drawImage(film, 0, 0);
    // reflections sit on the outside of the glass, so the film doesn't dim them
    const rk = Math.max(from, to); if (view === "out" && rk > 0 && ready(refl)) { cx.globalAlpha = Math.min(1, rk * 1.1); cx.drawImage(refl, 0, 0, W, H); cx.globalAlpha = 1; }
    requestAnimationFrame(frame);
  }
  function start() { if (!run) { run = true; requestAnimationFrame(frame); } }
  const vis = () => { if (seen) start(); };
  document.addEventListener("visibilitychange", vis);
  const io = new IntersectionObserver((es) => { seen = es[0].isIntersecting; if (seen) start(); });
  io.observe(cv);

  return {
    pick(v) { fromV = toV; toV = v; wipeStart = performance.now(); start(); },
    setView(v) {
      if (v !== "out" && !inDay) { inDay = load("tint-inside-day.webp"); inNight = load("tint-inside-night.webp"); glassIn = load("tint-glass-inside.png"); }
      view = v; fromV = toV; wipeStart = -1e9; start();
    },
    destroy() { seen = false; io.disconnect(); document.removeEventListener("visibilitychange", vis); },
  };
}
