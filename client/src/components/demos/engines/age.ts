/**
 * Years of sun: the glossy orange Model 3, split down the middle. Protected on the left; on the right the
 * paint fades and chalks (oxidation), then chips, water spots and a failing clear coat build up.
 */
export interface AgeApi { setYear(y: number): void; destroy(): void }

const SPLIT = 772 / 1600; // where the split falls on the 1600-wide photo (middle of the car)

export function mountAge(cv: HTMLCanvasElement): AgeApi {
  const cx = cv.getContext("2d")!, load = (n: string) => { const i = new Image(); i.decoding = "async"; i.src = "/images/demos/" + n; return i; };
  const fresh = load("age-new.webp"), faded = load("age-faded.webp"), damage = load("age-damage.webp");
  const ok = (i: HTMLImageElement) => i.complete && i.naturalWidth > 0;
  let year = 0, W = 0, H = 0;
  function draw() {
    const r = cv.getBoundingClientRect(), dpr = Math.min(devicePixelRatio || 1, 2), w = Math.round(r.width * dpr), h = Math.round(r.height * dpr);
    if (!w || !ok(fresh)) return;
    if (w !== W || h !== H) { W = cv.width = w; H = cv.height = h; }
    cx.drawImage(fresh, 0, 0, W, H);
    cx.save(); cx.beginPath(); cx.rect(W * SPLIT, 0, W, H); cx.clip();
    const fade = Math.pow(Math.min(1, year / 6), 1.15), dmg = Math.max(0, Math.min(1, (year - 1.2) / 4.6));
    if (ok(faded)) { cx.globalAlpha = fade; cx.drawImage(faded, 0, 0, W, H); }
    if (ok(damage)) { cx.globalAlpha = dmg; cx.drawImage(damage, 0, 0, W, H); if (dmg > .5) { cx.globalAlpha = (dmg - .5) * 1.2; cx.drawImage(damage, 0, 0, W, H); } }
    cx.restore();
    cx.fillStyle = "rgba(255,255,255,.85)"; cx.fillRect(W * SPLIT - dpr, 0, 2 * dpr, H);
  }
  [fresh, faded, damage].forEach((i) => { i.onload = draw; });
  addEventListener("resize", draw);
  return { setYear(y) { year = y; draw(); }, destroy() { removeEventListener("resize", draw); } };
}
