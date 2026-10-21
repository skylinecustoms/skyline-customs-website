/**
 * Rock chip test: the grey Model 3 studio render, front half, "driving" (front wheel spins with motion blur,
 * streaks run past, light slides over the paint). A tap throws a rock at that spot. With PPF the film takes
 * the hit; without it the paint chips and the chip stays. Every hit on paint is worth one touch-up.
 */
export interface RockStats { hits: number; chips: number; saved: number; cost: number }
export interface RockApi { setFilm(on: boolean): void; setHighway(on: boolean): void; reset(): void; destroy(): void }

type Pt = [number, number];
interface Rock { sx: number; sy: number; tx: number; ty: number; t: number; spin: number; sh: number[]; tone: number; out: boolean; x: number; y: number; vx: number; vy: number; sz: number }
interface Bit { x: number; y: number; vx: number; vy: number; s: number; c: string }
interface Fx { x: number; y: number; t: number; kind: "film" | "chip"; p: Bit[] }
interface Money { x: number; y: number; t: number; txt: string; c: string }

// Traced on the 1216 x 760 image: the paint (hood, bumper, front fender), the headlight, the whole car, the front rim.
const GRID = 1216;
const PAINT: Pt[] = [[155, 298], [300, 230], [450, 195], [600, 172], [760, 160], [900, 158], [1000, 170], [1150, 195], [1160, 560], [1100, 560], [1090, 450], [1040, 360], [960, 310], [880, 295], [800, 305], [730, 340], [690, 390], [670, 470], [660, 560], [640, 690], [500, 700], [300, 660], [160, 630], [80, 580], [60, 480], [70, 360], [110, 320]];
const LAMP: Pt[] = [[360, 330], [420, 300], [520, 270], [640, 240], [700, 225], [705, 240], [640, 280], [560, 310], [480, 330], [400, 350], [370, 350]];
const CAR: Pt[] = [[60, 330], [155, 295], [300, 228], [450, 192], [600, 165], [700, 120], [860, 60], [950, 0], [1216, 0], [1216, 760], [700, 760], [640, 700], [500, 705], [300, 665], [160, 635], [70, 590], [55, 480]];
const RIM = { x: 877, y: 565, rx: 142, ry: 170 };

export function mountRock(cv: HTMLCanvasElement, img: HTMLImageElement, opts: { chipCost: number; onStats(s: RockStats): void }): RockApi {
  const cx = cv.getContext("2d")!;
  let W = 0, H = 0, DPR = 1, SC = 1, film = true, highway = false, visible = false, t0 = 0, nextAuto = 0, shake = 0, seed = 5, spin = 0, raf = 0;
  let rocks: Rock[] = [], fx: Fx[] = [], money: Money[] = [];
  const stats: RockStats = { hits: 0, chips: 0, saved: 0, cost: 0 };
  let paint = new Path2D(), lamp = new Path2D(), car = new Path2D();
  const dmg = document.createElement("canvas"), dctx = dmg.getContext("2d")!;
  const rnd = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
  const poly = (pts: Pt[]) => { const p = new Path2D(), k = W / GRID; pts.forEach((q, i) => (i ? p.lineTo(q[0] * k, q[1] * k) : p.moveTo(q[0] * k, q[1] * k))); p.closePath(); return p; };
  const onPaint = (x: number, y: number) => cx.isPointInPath(paint, x, y) && !cx.isPointInPath(lamp, x, y);
  const emit = () => opts.onStats({ ...stats });

  function size() {
    const r = cv.getBoundingClientRect(); DPR = Math.min(devicePixelRatio || 1, 2);
    const w = Math.round(r.width * DPR), h = Math.round(r.height * DPR); if (!w || (w === W && h === H)) return;
    W = cv.width = dmg.width = w; H = cv.height = dmg.height = h; SC = W / 900;
    paint = poly(PAINT); lamp = poly(LAMP); car = poly(CAR); stats.chips = 0; emit();
  }

  function drawScene(t: number) {
    shake = Math.sin(t * .031) * .45 * DPR + Math.sin(t * .113) * .3 * DPR;
    cx.fillStyle = "#0a0a0a"; cx.fillRect(0, 0, W, H);
    const ok = img.complete && img.naturalWidth > 0;
    if (ok) cx.drawImage(img, 0, 0, W, H);
    // speed streaks rushing past behind the car (it's heading left, so the world slides right)
    cx.save(); const bg = new Path2D(); bg.rect(0, 0, W, H); bg.addPath(car); cx.clip(bg, "evenodd");
    for (let s = 0; s < 22; s++) {
      const row = (s * .618) % 1, y = H * (row < .55 ? row * .5 : .8 + (row - .55) * .45), len = W * (.08 + (s % 5) * .04), x = ((t * (y > H * .7 ? 1.6 : .7) * W / 1000 + s * W * .37) % (W * 1.4)) - W * .2;
      const sg = cx.createLinearGradient(x, 0, x + len, 0); sg.addColorStop(0, "rgba(255,255,255,0)"); sg.addColorStop(1, `rgba(235,235,240,${y > H * .7 ? .16 : .07})`);
      cx.fillStyle = sg; cx.fillRect(x, y, len, Math.max(1, DPR * (y > H * .7 ? 1.5 : 1)));
    }
    cx.restore();
    cx.save(); cx.translate(0, shake);
    if (ok) {
      // the body bobs a touch: redraw it over the streaks
      cx.save(); cx.clip(car); cx.drawImage(img, 0, 0, W, H); cx.restore();
      // Spin the rim like a real one at speed. It's seen at an angle, so squash the ellipse to a circle,
      // rotate, stretch it back; average 8 copies across the frame for motion blur, then lay the still photo
      // back over it in "screen" so the reflections stay put.
      const k = W / GRID, wx = RIM.x * k, wy = RIM.y * k, rx = RIM.rx * k, ry = RIM.ry * k, step = .2, N = 8;
      spin -= step;
      cx.save(); cx.beginPath(); cx.ellipse(wx, wy, rx, ry, 0, 0, Math.PI * 2); cx.clip();
      for (let b = 0; b < N; b++) { cx.save(); cx.globalAlpha = 1 / (b + 1); cx.translate(wx, wy); cx.scale(1, ry / rx); cx.rotate(spin + step * b / N); cx.scale(1, rx / ry); cx.translate(-wx, -wy); cx.drawImage(img, 0, 0, W, H); cx.restore(); }
      cx.globalAlpha = .45; cx.globalCompositeOperation = "screen"; cx.drawImage(img, 0, 0, W, H);
      cx.restore();
    }
    // light sliding over the paint, about once every 2.6 s
    const bx = -W * .4 + ((t / 2600) % 1) * W * 1.8;
    cx.save(); cx.clip(paint); cx.globalCompositeOperation = "screen";
    const g = cx.createLinearGradient(bx - W * .18, 0, bx + W * .18, H * .35); g.addColorStop(0, "rgba(255,235,215,0)"); g.addColorStop(.5, "rgba(255,235,215,.22)"); g.addColorStop(1, "rgba(255,235,215,0)");
    cx.fillStyle = g; cx.fillRect(0, 0, W, H); cx.restore();
    cx.drawImage(dmg, 0, 0); // chips stay in the paint
    cx.restore();
    const v = cx.createRadialGradient(W * .45, H * .55, H * .35, W * .45, H * .55, W * .75); v.addColorStop(0, "rgba(0,0,0,0)"); v.addColorStop(1, "rgba(0,0,0,.55)");
    cx.fillStyle = v; cx.fillRect(0, 0, W, H);
  }

  // A real chip: color and clear knocked down to light-grey primer, sometimes bare metal, a dark broken edge
  // and a few tiny nicks. Squashed on the hood, which is seen at an angle.
  function chip(x: number, y: number) {
    const r = (2.4 + Math.pow(rnd(), 2) * 6) * SC * DPR / (DPR > 1 ? 1.3 : 1), pts: Pt[] = [];
    for (let i = 0; i < 9; i++) { const a = i / 9 * Math.PI * 2 + rnd() * .3; pts.push([Math.cos(a) * r * (.5 + rnd() * .6), Math.sin(a) * r * (.5 + rnd() * .6)]); }
    const path = (s: number, ox: number, oy: number) => { dctx.beginPath(); pts.forEach((q, k) => (k ? dctx.lineTo(q[0] * s + ox, q[1] * s + oy) : dctx.moveTo(q[0] * s + ox, q[1] * s + oy))); dctx.closePath(); };
    dctx.save(); dctx.translate(x, y); if (y < H * .38) dctx.scale(1, .62); dctx.rotate(rnd() * 6.28);
    const halo = dctx.createRadialGradient(0, 0, r * .5, 0, 0, r * 2); halo.addColorStop(0, "rgba(210,215,225,.18)"); halo.addColorStop(1, "rgba(210,215,225,0)");
    dctx.fillStyle = halo; dctx.beginPath(); dctx.arc(0, 0, r * 2, 0, Math.PI * 2); dctx.fill();
    dctx.fillStyle = "rgba(0,0,0,.8)"; path(1.18, -.4 * DPR, -.4 * DPR); dctx.fill();
    const pg = dctx.createLinearGradient(-r, -r, r, r); pg.addColorStop(0, "#9a9a9c"); pg.addColorStop(.55, "#dcdcdc"); pg.addColorStop(1, "#f3f2f0"); dctx.fillStyle = pg; path(1, 0, 0); dctx.fill();
    if (rnd() < .5) { dctx.fillStyle = "#5e6168"; path(.38, r * .08, r * .05); dctx.fill(); dctx.fillStyle = "rgba(255,255,255,.75)"; dctx.fillRect(r * .1, -r * .05, DPR, DPR); }
    dctx.strokeStyle = "rgba(230,235,245,.5)"; dctx.lineWidth = .6 * DPR; path(1.05, 0, 0); dctx.stroke();
    for (let s = 0, m = rnd() * 3 | 0; s < m; s++) { const a2 = rnd() * 6.28, d = r * (1.5 + rnd()); dctx.fillStyle = "rgba(230,228,226,.9)"; dctx.beginPath(); dctx.arc(Math.cos(a2) * d, Math.sin(a2) * d, (.5 + rnd() * .6) * DPR, 0, 6.28); dctx.fill(); }
    dctx.restore();
  }

  // Rocks come from our side (kicked up by the truck ahead) and shrink as they fly at the car.
  function throwAt(x: number, y: number) {
    const sh: number[] = []; for (let i = 0; i < 7; i++) sh.push(.65 + rnd() * .45);
    rocks.push({ sx: x + (rnd() - .5) * W * .35, sy: H + 40 * DPR, tx: x, ty: y, t: 0, spin: rnd() * 6, sh, tone: 95 + rnd() * 40 | 0, out: false, x: 0, y: 0, vx: 0, vy: 0, sz: 0 });
  }
  function drawRock(r: Rock, x: number, y: number, sz: number, alpha: number) {
    cx.save(); cx.globalAlpha = alpha; cx.translate(x, y); cx.rotate(r.spin);
    const g = cx.createRadialGradient(-sz * .3, -sz * .3, 0, 0, 0, sz * 1.1); g.addColorStop(0, `rgb(${r.tone + 70},${r.tone + 62},${r.tone + 50})`); g.addColorStop(1, `rgb(${r.tone - 55},${r.tone - 58},${r.tone - 62})`);
    cx.fillStyle = g; cx.beginPath(); r.sh.forEach((k, i) => { const a = i / r.sh.length * Math.PI * 2; if (i) cx.lineTo(Math.cos(a) * sz * k, Math.sin(a) * sz * k); else cx.moveTo(Math.cos(a) * sz * k, Math.sin(a) * sz * k); }); cx.closePath(); cx.fill(); cx.restore();
  }
  function puff(x: number, y: number, c: string, n: number): Bit[] { const a: Bit[] = []; for (let i = 0; i < n; i++) { const an = rnd() * 6.28, sp = (.6 + rnd() * 2.2) * DPR; a.push({ x, y, vx: Math.cos(an) * sp, vy: Math.sin(an) * sp - DPR, s: (.8 + rnd() * 1.4) * DPR, c }); } return a; }
  function impact(r: Rock) {
    r.out = true; r.t = 0; r.vx = (rnd() - .5) * 5 * DPR; r.vy = -(1 + rnd() * 2) * DPR; r.x = r.tx; r.y = r.ty; r.sz = 3.5 * SC * DPR / (DPR > 1 ? 1.3 : 1);
    if (!onPaint(r.tx, r.ty)) return; // bounced off glass, tire or trim
    stats.hits++;
    if (film) { stats.saved += opts.chipCost; fx.push({ x: r.tx, y: r.ty, t: 0, kind: "film", p: puff(r.tx, r.ty, "170,165,160", 7) }); money.push({ x: r.tx, y: r.ty, t: 0, txt: "+$" + opts.chipCost, c: "34,197,94" }); }
    else { chip(r.tx, r.ty); stats.chips++; stats.cost += opts.chipCost; fx.push({ x: r.tx, y: r.ty, t: 0, kind: "chip", p: puff(r.tx, r.ty, "75,78,84", 6).concat(puff(r.tx, r.ty, "235,235,235", 4)) }); money.push({ x: r.tx, y: r.ty, t: 0, txt: "−$" + opts.chipCost, c: "239,68,68" }); }
    emit();
  }
  function drawMoney() { // the dollar amount floats up off each hit, pops in, then fades
    for (let i = money.length - 1; i >= 0; i--) {
      const m = money[i]; m.t += 1 / 66; if (m.t >= 1) { money.splice(i, 1); continue; }
      const pop = m.t < .12 ? .6 + m.t / .12 * .5 : 1.1 - Math.min(.1, (m.t - .12) * .5), a = m.t < .7 ? 1 : 1 - (m.t - .7) / .3;
      const y = m.y - 14 * DPR - m.t * 46 * DPR, fs = Math.round(31 * DPR * pop * Math.max(.8, Math.min(1.3, SC)));
      cx.save(); cx.font = `${fs}px "Bebas Neue", Impact, "Arial Narrow", sans-serif`; cx.textAlign = "center"; cx.textBaseline = "bottom";
      cx.lineJoin = "round"; cx.lineWidth = 4 * DPR; cx.strokeStyle = `rgba(0,0,0,${a * .75})`; cx.strokeText(m.txt, m.x, y);
      cx.fillStyle = `rgba(${m.c},${a})`; cx.fillText(m.txt, m.x, y); cx.restore();
    }
  }

  function frame(now: number) {
    if (!visible) { t0 = 0; raf = 0; return; }
    if (!t0) t0 = now; const t = now - t0;
    size();
    if (highway && now > nextAuto) { for (let tr = 0; tr < 15; tr++) { const ax = W * (.05 + rnd() * .75), ay = H * (.2 + rnd() * .72); if (onPaint(ax, ay)) { throwAt(ax, ay); break; } } nextAuto = now + 220 + rnd() * 420; }
    drawScene(t);
    cx.save(); cx.translate(0, shake);
    for (let i = rocks.length - 1; i >= 0; i--) {
      const r = rocks[i];
      if (!r.out) {
        r.t += 1 / 20; const k = Math.min(1, r.t), maxS = 24 * SC * DPR / (DPR > 1 ? 1.3 : 1);
        for (let gh = 2; gh >= 0; gh--) { const kk = Math.max(0, k - gh * .05), ee = 1 - Math.pow(1 - kk, 1.6); drawRock(r, r.sx + (r.tx - r.sx) * ee, r.sy + (r.ty - r.sy) * ee - Math.sin(kk * Math.PI) * 25 * DPR, maxS * (1 - kk) + 3.5 * SC * DPR * kk, gh ? .18 : 1); }
        r.spin += .25; if (k >= 1) impact(r);
      } else {
        r.t += 1 / 26; r.x += r.vx; r.y += r.vy; r.vy += .25 * DPR; r.sz *= 1.04; r.spin += .3;
        drawRock(r, r.x, r.y, r.sz, Math.max(0, 1 - r.t)); if (r.t >= 1) rocks.splice(i, 1);
      }
    }
    for (let j = fx.length - 1; j >= 0; j--) {
      const f = fx[j]; f.t += 1 / 32; if (f.t >= 1) { fx.splice(j, 1); continue; }
      const al = 1 - f.t;
      if (f.t < .25) { const fl = cx.createRadialGradient(f.x, f.y, 0, f.x, f.y, 10 * DPR); fl.addColorStop(0, `rgba(255,255,255,${(1 - f.t * 4) * .9})`); fl.addColorStop(1, "rgba(255,255,255,0)"); cx.fillStyle = fl; cx.beginPath(); cx.arc(f.x, f.y, 10 * DPR, 0, 6.28); cx.fill(); }
      if (f.kind === "film") { cx.strokeStyle = `rgba(150,225,255,${al * .7})`; cx.lineWidth = 1.5 * DPR; cx.beginPath(); cx.ellipse(f.x, f.y, (3 + f.t * 16) * DPR, (2 + f.t * 10) * DPR, 0, 0, 6.28); cx.stroke(); }
      f.p.forEach((q) => { q.x += q.vx; q.y += q.vy; q.vy += .12 * DPR; cx.fillStyle = `rgba(${q.c},${al * (f.kind === "film" ? .45 : .95)})`; cx.fillRect(q.x, q.y, q.s, q.s); });
    }
    drawMoney();
    cx.restore();
    raf = requestAnimationFrame(frame);
  }

  const down = (e: PointerEvent) => { const r = cv.getBoundingClientRect(); throwAt((e.clientX - r.left) * W / r.width, (e.clientY - r.top) * H / r.height - shake); };
  cv.addEventListener("pointerdown", down);
  const io = new IntersectionObserver((es) => { const v = es[0].isIntersecting; if (v && !visible) { visible = true; raf = requestAnimationFrame(frame); } else if (!v) visible = false; });
  io.observe(cv); size();

  return {
    setFilm(on) { film = on; emit(); },
    setHighway(on) { highway = on; },
    reset() { dctx.clearRect(0, 0, W, H); stats.hits = stats.chips = stats.saved = stats.cost = 0; money = []; emit(); },
    destroy() { visible = false; cancelAnimationFrame(raf); io.disconnect(); cv.removeEventListener("pointerdown", down); },
  };
}
