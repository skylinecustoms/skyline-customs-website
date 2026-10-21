/**
 * Watch the water: a close-up of dark grey metallic paint covered in water. Coated, it's deep gloss with
 * crisp reflections; beads of mixed size slide slowly down, merge when they touch, and a drag pushes them
 * off without leaving a mark. Bare, the paint is hazy and swirled, water smears, and every wipe scratches.
 */
export interface WaterStats { rolled: number; scratches: number; beading: boolean }
export interface WaterApi { setCoated(on: boolean): void; spray(): void; destroy(): void }

interface Drop { x: number; y: number; r: number; vx: number; vy: number; run: boolean; stop: number; a: number; wob: number; ph: number; tr: number; j: number; mvx: number; mvy: number }
interface Finger { x: number; y: number; sx: number; sy: number; vx: number; vy: number }
interface Glint { x0: number; y0: number; x1: number; y1: number; life: number }
interface Mist { x: number; y: number; vx: number; vy: number; life: number; r: number }

const BANDS: [number, number, number, number][] = [[.28, -.1, .09, .5], [.72, .2, .05, .3]];
const FLOW = .2, GAP = 34; // slide speed of a mid-size bead (css px per frame), spacing new beads land at

export function mountWater(cv: HTMLCanvasElement, opts: { onStats(s: WaterStats): void; onTouch(): void }): WaterApi {
  const cx = cv.getContext("2d")!;
  let W = 0, H = 0, DPR = 1, drops: Drop[] = [], rolled = 0, coated = true, finger: Finger | null = null, running = false, seen = false, now = 0, seed = 11, lastEmit = 0;
  let paint = document.createElement("canvas"), bandMask = document.createElement("canvas"), marks = document.createElement("canvas"), marksView = document.createElement("canvas");
  let marksDirty = false, scratches = 0, glints: Glint[] = [], hose: { t0: number } | null = null, mist: Mist[] = [];
  const rnd = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
  const ctx2 = (c: HTMLCanvasElement) => c.getContext("2d")!;

  function bands(p: CanvasRenderingContext2D, soft: number, crisp: boolean) {
    BANDS.forEach((b) => {
      p.save(); p.translate(W * b[0], H * .5); p.rotate(b[1]);
      const w = W * b[2] * soft, lg = p.createLinearGradient(-w, 0, w, 0);
      lg.addColorStop(0, "rgba(255,150,60,0)"); lg.addColorStop(.5, `rgba(255,165,80,${b[3] * (crisp ? .7 : .62)})`); lg.addColorStop(1, "rgba(255,150,60,0)");
      p.fillStyle = lg; p.fillRect(-w, -H, w * 2, H * 2);
      if (crisp) { // the light strip mirrored sharp in the clear coat
        const c = W * b[2] * .14, k = p.createLinearGradient(-c, 0, c, 0), a1 = Math.min(.95, b[3] * 1.7);
        k.addColorStop(0, "rgba(255,190,120,0)"); k.addColorStop(.32, `rgba(255,200,140,${a1 * .55})`); k.addColorStop(.47, `rgba(255,238,215,${a1})`);
        k.addColorStop(.53, `rgba(255,238,215,${a1})`); k.addColorStop(.68, `rgba(255,200,140,${a1 * .55})`); k.addColorStop(1, "rgba(255,190,120,0)");
        p.fillStyle = k; p.fillRect(-c, -H, c * 2, H * 2);
      }
      p.restore();
    });
  }
  function makePaint() {
    [paint, bandMask, marks, marksView].forEach((c) => { c.width = W; c.height = H; });
    const p = ctx2(paint), g = p.createLinearGradient(0, 0, W * .3, H);
    if (coated) { g.addColorStop(0, "#050506"); g.addColorStop(.45, "#30333a"); g.addColorStop(.7, "#18191d"); g.addColorStop(1, "#040405"); }
    else { g.addColorStop(0, "#17181b"); g.addColorStop(.45, "#383a40"); g.addColorStop(.7, "#2a2c30"); g.addColorStop(1, "#151619"); }
    p.fillStyle = g; p.fillRect(0, 0, W, H);
    for (let i = 0; i < W * H / 90; i++) { const fv = 170 + rnd() * 85 | 0; p.fillStyle = `rgba(${fv},${fv},${fv + 8},${rnd() * (coated ? .12 : .1)})`; p.fillRect(rnd() * W, rnd() * H, 1.2 * DPR, 1.2 * DPR); }
    bands(p, coated ? 1 : 1.6, coated);
    // where light lands: swirls and scratches only show up there
    const bm = ctx2(bandMask); bm.fillStyle = "rgba(0,0,0,.07)"; bm.fillRect(0, 0, W, H); bands(bm, 1.7, false); bands(bm, 1.7, false);
    if (coated) { // a clear-coat sheen: the depth that makes coated paint look wet
      const sh = p.createLinearGradient(0, 0, W * .6, H * .7); sh.addColorStop(0, "rgba(255,255,255,.07)"); sh.addColorStop(.5, "rgba(255,255,255,0)"); p.fillStyle = sh; p.fillRect(0, 0, W, H);
    } else { // haze, and the swirl marks every car wash leaves, catching the light
      p.fillStyle = "rgba(205,205,215,.05)"; p.fillRect(0, 0, W, H);
      const sw = document.createElement("canvas"); sw.width = W; sw.height = H; const sc = ctx2(sw); sc.lineWidth = DPR;
      for (let k = 0; k < 12; k++) { const cx0 = rnd() * W, cy0 = rnd() * H; for (let j = 0; j < 45; j++) { const r = (10 + rnd() * 170) * DPR, a0 = rnd() * 6.28; sc.strokeStyle = `rgba(255,240,225,${.18 + rnd() * .32})`; sc.beginPath(); sc.arc(cx0, cy0, r, a0, a0 + .3 + rnd() * .9); sc.stroke(); } }
      sc.globalCompositeOperation = "destination-in"; sc.drawImage(bandMask, 0, 0); p.drawImage(sw, 0, 0);
    }
    marksDirty = false; scratches = 0; glints = [];
  }
  // Wiping bare paint scratches it (fine parallel lines that stay); coated paint shows only a glint that fades.
  function wipeMark(x0: number, y0: number, x1: number, y1: number) {
    const len = Math.hypot(x1 - x0, y1 - y0); if (len < .5 * DPR) return;
    if (coated) { glints.push({ x0, y0, x1, y1, life: 1 }); return; }
    const nx = -(y1 - y0) / len, ny = (x1 - x0) / len, m = ctx2(marks); m.lineWidth = .8 * DPR;
    for (let i = 0; i < 6; i++) { const o = (rnd() - .5) * 34 * DPR; m.strokeStyle = `rgba(255,240,225,${.35 + rnd() * .5})`; m.beginPath(); m.moveTo(x0 + nx * o, y0 + ny * o); m.lineTo(x1 + nx * o, y1 + ny * o); m.stroke(); }
    marksDirty = true; scratches += len / DPR / 40;
  }
  function drawMarks() {
    if (marksDirty) { const v = ctx2(marksView); v.globalCompositeOperation = "copy"; v.drawImage(marks, 0, 0); v.globalCompositeOperation = "destination-in"; v.drawImage(bandMask, 0, 0); v.globalCompositeOperation = "source-over"; marksDirty = false; }
    if (!coated) cx.drawImage(marksView, 0, 0);
    for (let i = glints.length - 1; i >= 0; i--) {
      const gl = glints[i]; gl.life -= .04; if (gl.life <= 0) { glints.splice(i, 1); continue; }
      cx.strokeStyle = `rgba(255,255,255,${gl.life * .22})`; cx.lineWidth = 10 * DPR * gl.life; cx.lineCap = "round"; cx.beginPath(); cx.moveTo(gl.x0, gl.y0); cx.lineTo(gl.x1, gl.y1); cx.stroke();
    }
  }

  // Real beading: mostly small beads, some medium, a few big ones.
  const bead = () => (coated ? (2.6 + 9.5 * Math.pow(rnd(), 2.3)) * DPR : (10 + rnd() * 26) * DPR);
  const target = () => Math.round(W * H / Math.pow(GAP * DPR, 2) / 1.15);
  const mk = (x: number, y: number, r: number, extra: Partial<Drop> = {}): Drop => ({ x, y, r, vx: 0, vy: 0, run: false, stop: 0, a: rnd() * Math.PI, wob: .75 + rnd() * .25, ph: rnd() * 6.28, tr: 0, j: 0, mvx: 0, mvy: 0, ...extra });
  // The emptiest spot in a region: best of a dozen tries, scored by distance to the nearest bead.
  function spot(x0: number, x1: number, y0: number, y1: number) {
    let best = { x: x0, y: y0 }, bd = -1;
    for (let t = 0; t < 12; t++) {
      const x = x0 + rnd() * (x1 - x0), y = y0 + rnd() * (y1 - y0); let m = 1e9;
      for (const d of drops) { const dy = (d.run ? d.stop : d.y) - y, dx = d.x - x, q = dx * dx + dy * dy; if (q < m) m = q; }
      if (m > bd) { bd = m; best = { x, y }; }
    }
    return best;
  }
  function addRunner(x: number, y: number, stop: number) { const r = bead(); drops.push(mk(x, y - r, r, { vy: (coated ? 2.2 + rnd() * 1.2 : 1 + rnd() * .8) * DPR, stop, run: true })); }
  // Water runs in from the top, each drop to its own spot, staggered so it arrives over a few seconds.
  function fill(n: number) {
    for (let i = 0; i < n; i++) {
      if (coated) { const s = spot(0, W, H * .02, H * .98); addRunner(s.x, -rnd() * H * .9, s.y); }
      else addRunner(rnd() * W, -rnd() * H, H * (.03 + rnd() * .95));
    }
  }
  function size() {
    const r = cv.getBoundingClientRect(); DPR = Math.min(devicePixelRatio || 1, 2);
    const w = Math.round(r.width * DPR), h = Math.round(r.height * DPR); if (!w || (w === W && h === H)) return;
    W = cv.width = w; H = cv.height = h; makePaint(); drops = []; fill(coated ? target() : 40);
  }

  function drawDrop(d: Drop) {
    // idle shimmer: each bead breathes a touch and its highlight swims
    const s = Math.sin(now * .0021 + d.ph), r = d.r * (1 + .035 * s);
    if (!coated) { // flat, smeared water on bare clear coat: low and irregular, no shine
      cx.save(); cx.translate(d.x, d.y); cx.rotate(d.a); cx.fillStyle = "rgba(255,255,255,.07)"; cx.beginPath(); cx.ellipse(0, 0, r * 1.6, r * d.wob, 0, 0, Math.PI * 2); cx.fill();
      cx.strokeStyle = "rgba(255,255,255,.12)"; cx.lineWidth = DPR; cx.stroke(); cx.restore(); return;
    }
    // moving beads stretch along their path; a bead that just swallowed another wobbles for a moment
    const sp = Math.hypot(d.mvx, d.mvy), st = 1 + Math.min(.5, sp / DPR * .1), jg = d.j * Math.sin(now * .05 + d.ph) * .16;
    const ux = sp ? d.mvx / sp : 0, uy = sp ? d.mvy / sp : 1, k = st - 1, n = 1 / Math.sqrt(st);
    cx.save(); cx.translate(d.x, d.y); cx.transform(n * (1 + k * ux * ux) * (1 + jg), n * k * ux * uy, n * k * ux * uy, n * (1 + k * uy * uy) * (1 - jg), 0, 0);
    cx.fillStyle = "rgba(0,0,0,.35)"; cx.beginPath(); cx.ellipse(r * .18, r * .3, r * .95, r * .8, 0, 0, Math.PI * 2); cx.fill();
    const g = cx.createRadialGradient(-r * .25, -r * .3, r * .1, 0, 0, r);
    g.addColorStop(0, "rgba(220,225,235,.10)"); g.addColorStop(.75, "rgba(8,9,12,.2)"); g.addColorStop(1, "rgba(0,0,0,.55)");
    cx.fillStyle = g; cx.beginPath(); cx.arc(0, 0, r, 0, Math.PI * 2); cx.fill();
    cx.fillStyle = "rgba(255,255,255,.92)"; cx.beginPath(); cx.ellipse(-r * (.38 + .05 * s), -r * (.42 - .04 * s), r * .26, r * .17, -.6 + .15 * s, 0, Math.PI * 2); cx.fill();
    cx.fillStyle = "rgba(255,170,100,.32)"; cx.beginPath(); cx.arc(r * .25, r * .45, r * .32, 0, Math.PI); cx.fill();
    cx.restore();
  }

  function step() {
    const g = coated ? .015 * DPR : 0, fr = coated ? .975 : .6, R = 40 * DPR, flow = FLOW * DPR;
    if (coated) { // keep the panel full: new beads slide in at the top, and water refills a swiped patch
      const n = drops.length, N = target();
      if (n < N) {
        if (n < N * .92 && !finger && rnd() < .25) { const s = spot(0, W, H * .05, H * .95); addRunner(s.x, 0, s.y); }
        else if (rnd() < N * flow / H * 1.2) { const t = spot(0, W, -GAP * DPR, 0); drops.push(mk(t.x, -GAP * DPR * .5, bead(), { a: 0, wob: 1 })); }
      }
    }
    // the finger is smoothed so the water follows it in one fluid sweep
    if (finger) { const ox = finger.sx, oy = finger.sy; finger.sx += (finger.x - finger.sx) * .4; finger.sy += (finger.y - finger.sy) * .4; finger.vx = finger.sx - ox; finger.vy = finger.sy - oy; wipeMark(ox, oy, finger.sx, finger.sy); }
    for (let i = drops.length - 1; i >= 0; i--) {
      const d = drops[i], px = d.x, py = d.y;
      if (d.tr) { d.r += (d.tr - d.r) * .22; if (Math.abs(d.tr - d.r) < .05 * DPR) { d.r = d.tr; d.tr = 0; } } // swell after a merge
      if (d.j) { d.j *= .93; if (d.j < .02) d.j = 0; }
      if (d.run) { // running in from the top: a slight weave, slowing to a stop at its spot
        d.y += d.vy; d.x += Math.sin(d.y * .02 + d.ph) * .2 * DPR;
        if (d.y > d.stop) { d.vy *= coated ? .88 : .8; if (d.vy < flow) { d.run = false; d.vy = 0; } }
        d.mvx = d.x - px; d.mvy = d.y - py;
        if (d.y > H + d.r * 2) drops.splice(i, 1);
        continue;
      }
      if (finger) {
        const dx = d.x - finger.sx, dy = d.y - finger.sy, dist = Math.hypot(dx, dy), reach = R + d.r;
        if (dist < reach) {
          const push = (reach - dist) / reach, nx = dist ? dx / dist : 0, ny = dist ? dy / dist : 1;
          if (coated) { d.vx += (nx * push * 4.2 * DPR + finger.vx * .7 - d.vx) * .32; d.vy += (ny * push * 4.2 * DPR + finger.vy * .7 - d.vy) * .32; } // ease into the push so it glides
          else { d.x += finger.vx * .3; d.y += finger.vy * .3; d.r = Math.min(d.r * 1.006, 60 * DPR); d.wob = Math.max(.35, d.wob * .995); } // smears and spreads
        }
      }
      const sp = Math.abs(d.vx) + Math.abs(d.vy), heavy = coated && d.r >= 15 * DPR;
      if (sp > .12 * DPR || heavy) { // pushed, or heavy enough to break loose: real rolling, with gravity
        d.vy += heavy ? g * 2.2 : g; d.vx *= fr; d.vy *= fr; const sp2 = Math.hypot(d.vx, d.vy), cap = 9 * DPR; if (sp2 > cap) { d.vx *= cap / sp2; d.vy *= cap / sp2; }
        d.x += d.vx; d.y += d.vy;
        if (heavy && sp2 > .8 * DPR && rnd() < .12) { const tr = (1.4 + rnd() * 1.4) * DPR; drops.push(mk(d.x + (rnd() - .5) * d.r * .6, d.y - d.r * 1.1, tr, { a: 0, wob: 1 })); d.r = Math.sqrt(Math.max(d.r * d.r - tr * tr, 1)); } // trail of tiny droplets
      } else { // settled: slide down with everything else; heavier beads slide faster, catch and swallow smaller ones
        d.vx = 0; d.vy = 0;
        if (coated) { const m = Math.max(.12, Math.min(2.6, Math.pow(d.r / (7 * DPR), 1.7))); d.y += flow * m * (1 + .25 * Math.sin(now * .0012 + d.ph)); d.x += Math.sin(now * .0009 + d.ph * 3) * .06 * DPR; }
      }
      d.mvx = d.x - px; d.mvy = d.y - py;
      if (d.x < -d.r * 2 || d.x > W + d.r * 2 || d.y > H + d.r * 2) { drops.splice(i, 1); rolled++; }
    }
    if (coated) { // beads that touch join into one bigger bead: it swells into place and wobbles
      for (let a = 0; a < drops.length; a++) for (let b = a + 1; b < drops.length; b++) {
        let p = drops[a], q = drops[b], pr = p.tr || p.r, qr = q.tr || q.r;
        if (Math.abs(p.x - q.x) > pr + qr || Math.abs(p.y - q.y) > pr + qr || p.run || q.run) continue;
        if (Math.hypot(p.x - q.x, p.y - q.y) < (pr + qr) * .82) {
          if (qr > pr) { [p, q] = [q, p]; drops[a] = p; drops[b] = q; [pr, qr] = [qr, pr]; } // the bigger bead keeps going
          const A = pr * pr, B = qr * qr;
          p.x = (p.x * A + q.x * B) / (A + B); p.y = (p.y * A + q.y * B) / (A + B); p.vx = (p.vx * A + q.vx * B) / (A + B); p.vy = (p.vy * A + q.vy * B) / (A + B);
          p.tr = Math.min(Math.sqrt(A + B), 30 * DPR); p.j = Math.min(1, p.j + .6 + qr / pr * .4); drops.splice(b, 1); b--;
        }
      }
    }
  }

  // "Spray it again": mist fans out from a nozzle sweeping across the top; where it lands, water runs down.
  function mistFrame() {
    if (hose) {
      const k = (now - hose.t0) / 1900;
      if (k >= 1) hose = null;
      else {
        const nx = W * (-.05 + 1.1 * (k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2)), ny = -H * .08;
        const cone = cx.createRadialGradient(nx, ny, 0, nx, ny, H * .7); cone.addColorStop(0, "rgba(225,235,245,.11)"); cone.addColorStop(1, "rgba(225,235,245,0)");
        cx.save(); cx.fillStyle = cone; [.16, .26, .36].forEach((wd) => { cx.beginPath(); cx.moveTo(nx, ny); cx.lineTo(nx - H * wd, H * .62); cx.lineTo(nx + H * wd, H * .62); cx.closePath(); cx.fill(); }); cx.restore();
        for (let i = 0; i < 9; i++) { const a = Math.PI / 2 + (rnd() - .5) * .9, sp = (5 + rnd() * 6) * DPR; mist.push({ x: nx, y: ny, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, life: 14 + rnd() * 26 | 0, r: (.6 + rnd() * 1.6) * DPR }); }
      }
    }
    for (let j = mist.length - 1; j >= 0; j--) {
      const m = mist[j]; m.x += m.vx; m.y += m.vy; m.vx *= .97; m.vy *= .97;
      cx.fillStyle = `rgba(230,238,248,${Math.min(.5, m.life / 30)})`; cx.beginPath(); cx.arc(m.x, m.y, m.r, 0, 6.28); cx.fill();
      if (--m.life <= 0) {
        if (m.y > 0 && rnd() < .22 && (!coated || drops.length < target() * 1.3)) { const s = coated ? spot(m.x - 60 * DPR, m.x + 60 * DPR, m.y, H * .97) : { x: m.x, y: m.y + rnd() * (H - m.y) }; addRunner(s.x, m.y, s.y); }
        mist.splice(j, 1);
      }
    }
  }

  function frame(t: number) {
    now = t; size(); step(); cx.drawImage(paint, 0, 0); drawMarks(); drops.forEach(drawDrop); mistFrame();
    if (t - lastEmit > 200) { lastEmit = t; opts.onStats({ rolled, scratches: Math.round(scratches), beading: coated }); }
    const moving = finger || seen || hose || mist.length || glints.length;
    if (moving && document.visibilityState !== "hidden") requestAnimationFrame(frame); else running = false;
  }
  function start() { if (!running) { running = true; requestAnimationFrame(frame); } }
  const pt = (e: PointerEvent) => { const r = cv.getBoundingClientRect(); return { x: (e.clientX - r.left) * W / r.width, y: (e.clientY - r.top) * H / r.height }; };
  const down = (e: PointerEvent) => { cv.setPointerCapture(e.pointerId); const p = pt(e); finger = { x: p.x, y: p.y, sx: p.x, sy: p.y, vx: 0, vy: 0 }; opts.onTouch(); start(); };
  const move = (e: PointerEvent) => { if (!finger) return; const p = pt(e); finger.x = p.x; finger.y = p.y; start(); };
  const lift = () => { finger = null; };
  const vis = () => { if (document.visibilityState === "visible" && seen) start(); };
  cv.addEventListener("pointerdown", down); cv.addEventListener("pointermove", move); cv.addEventListener("pointerup", lift); cv.addEventListener("pointercancel", lift);
  document.addEventListener("visibilitychange", vis);
  const io = new IntersectionObserver((es) => { seen = es[0].isIntersecting; if (seen) start(); });
  io.observe(cv); size();

  return {
    setCoated(on) { coated = on; rolled = 0; drops = []; if (W) { makePaint(); fill(coated ? target() : 40); } start(); },
    spray() { hose = { t0: performance.now() }; opts.onTouch(); start(); },
    destroy() { seen = false; finger = null; io.disconnect(); document.removeEventListener("visibilitychange", vis); cv.removeEventListener("pointerdown", down); cv.removeEventListener("pointermove", move); cv.removeEventListener("pointerup", lift); cv.removeEventListener("pointercancel", lift); },
  };
}
