/**
 * Heat rejection: the tint close-up through a thermal camera. Paint is hot from the sun; the cabin behind
 * the glass is as hot as the film lets it get. Choosing a film eases the cabin to its new temperature.
 */
export interface HeatApi { setLevel(t: number): void; destroy(): void }

const W = 480, H = 194;
const STOPS: [number, [number, number, number]][] = [[0, [0, 0, 16]], [.2, [42, 10, 94]], [.4, [139, 26, 138]], [.6, [224, 48, 43]], [.78, [255, 140, 26]], [.92, [255, 225, 77]], [1, [255, 255, 255]]];
const LUT: [number, number, number][] = [];
for (let i = 0; i < 256; i++) {
  const v = i / 255; let j = 1; while (j < STOPS.length - 1 && STOPS[j][0] < v) j++;
  const a = STOPS[j - 1], b = STOPS[j], u = (v - a[0]) / (b[0] - a[0]);
  LUT.push([0, 1, 2].map((c) => Math.round(a[1][c] + (b[1][c] - a[1][c]) * u)) as [number, number, number]);
}
function blur(f: Float32Array, r: number) {
  const t = new Float32Array(f.length);
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) { let s = 0, n = 0; for (let k = -r; k <= r; k++) { const xx = x + k; if (xx >= 0 && xx < W) { s += f[y * W + xx]; n++; } } t[y * W + x] = s / n; }
  for (let x = 0; x < W; x++) for (let y = 0; y < H; y++) { let s = 0, n = 0; for (let k = -r; k <= r; k++) { const yy = y + k; if (yy >= 0 && yy < H) { s += t[yy * W + x]; n++; } } f[y * W + x] = s / n; }
}

export function mountHeat(cv: HTMLCanvasElement, level: number): HeatApi {
  const cx = cv.getContext("2d")!, src = new Image(), glass = new Image();
  src.src = "/images/demos/tint-outside.webp"; glass.src = "/images/demos/tint-glass.png";
  let base: Float32Array | null = null, cab: Float32Array | null = null, out: ImageData | null = null, cur = level, goal = level, seen = false, run = false;
  cv.width = W; cv.height = H;
  function build() {
    if (base || !src.complete || !src.naturalWidth || !glass.complete || !glass.naturalWidth) return;
    const c = document.createElement("canvas"); c.width = W; c.height = H; const g = c.getContext("2d")!;
    g.drawImage(src, 0, 0, W, H); const px = g.getImageData(0, 0, W, H).data;
    g.clearRect(0, 0, W, H); g.drawImage(glass, 0, 0, W, H); const mk = g.getImageData(0, 0, W, H).data;
    base = new Float32Array(W * H); cab = new Float32Array(W * H);
    for (let i = 0; i < W * H; i++) {
      const r = px[i * 4], gg = px[i * 4 + 1], bb = px[i * 4 + 2], lum = (r + gg + bb) / 765, y = Math.floor(i / W) / H;
      const paint = r > 55 && r - bb > 40 && r > gg * 1.15 ? 1 : 0; // sunlit paint runs hot, the upper panels hottest
      base[i] = .1 + lum * .12 + paint * (.4 + (1 - y) * .14); cab[i] = mk[i * 4 + 3] / 255;
    }
    blur(base, 3); blur(cab, 2); out = cx.createImageData(W, H);
  }
  function render(now: number) {
    const d = out!.data, b = base!, c = cab!, flick = now * .002;
    for (let i = 0; i < W * H; i++) {
      const v = b[i] * (1 - c[i]) + (cur + Math.sin(flick + i * .013) * .01) * c[i], q = LUT[Math.max(0, Math.min(255, Math.round(v * 255)))];
      d[i * 4] = q[0]; d[i * 4 + 1] = q[1]; d[i * 4 + 2] = q[2]; d[i * 4 + 3] = 255;
    }
    cx.putImageData(out!, 0, 0);
    // the sun, beating down from the top left
    const sx = W * .06, sy = H * .02, g = cx.createRadialGradient(sx, sy, 0, sx, sy, H * .9);
    g.addColorStop(0, "rgba(255,255,230,.85)"); g.addColorStop(.25, "rgba(255,230,140,.35)"); g.addColorStop(1, "rgba(255,200,80,0)");
    cx.fillStyle = g; cx.fillRect(0, 0, W, H);
    cx.strokeStyle = "rgba(255,240,180,.25)"; cx.lineWidth = 1;
    for (let k = 0; k < 7; k++) { const a = .25 + k * .17 + Math.sin(now * .001 + k) * .03; cx.beginPath(); cx.moveTo(sx, sy); cx.lineTo(sx + Math.cos(a) * W, sy + Math.sin(a) * W); cx.stroke(); }
  }
  function frame(now: number) {
    if (!seen) { run = false; return; }
    build(); if (base) { cur += (goal - cur) * .045; render(now); }
    requestAnimationFrame(frame);
  }
  const io = new IntersectionObserver((es) => { seen = es[0].isIntersecting; if (seen && !run) { run = true; requestAnimationFrame(frame); } });
  io.observe(cv);
  return { setLevel(t) { goal = t; }, destroy() { seen = false; io.disconnect(); } };
}
