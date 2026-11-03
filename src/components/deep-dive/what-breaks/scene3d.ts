/* Shared 3D boot for the What Breaks pages (round 10i). Lifted from the old cinematic stage (now in archive/what-breaks-in-ai/WhatBreaksStage.astro):
   the device checks, the lazy three.js import with one retry, the start-near-view observer,
   the renderer, lights and camera, the visibility pause and DOM label projection.
   All text stays DOM. Nothing here draws text in the canvas. */
type T3 = typeof import('three');

export const TONE: Record<string, number> = { 'iso-teal': 0x0f8a6b, 'iso-violet': 0x4b44a8, 'iso-amber': 0xb8740f, 'iso-coral': 0xd2552d, 'iso-slate': 0x5a6b82 };

export const webglOk = () => { try { const c = document.createElement('canvas'); return !!(c.getContext('webgl2') || c.getContext('webgl')); } catch { return false; } };

/** 3D runs only on wide screens, with motion allowed, WebGL on and not in print. */
export const can3d = () => !matchMedia('(prefers-reduced-motion: reduce)').matches && !matchMedia('(max-width: 767px)').matches && !matchMedia('print').matches && webglOk();

/** Import three when `el` comes near view. One retry covers a dev server still optimising. */
export function startNear(el: Element, boot: (THREE: T3) => void, fail: () => void, margin = '600px 0px') {
  let started = false; let cancelled = false;
  const load = (tries: number) => import('three').then((T) => { if (!cancelled) boot(T); }).catch((e) => { console.warn('3D off', e); if (tries > 0) setTimeout(() => load(tries - 1), 1500); else fail(); });
  const io = new IntersectionObserver((es) => { if (es.some((e) => e.isIntersecting) && !started) { started = true; io.disconnect(); load(1); } }, { rootMargin: margin });
  io.observe(el);
  return () => { cancelled = true; io.disconnect(); };
}

/** Renderer, scene, fog, lights and camera sized to `box`. */
export function makeWorld(THREE: T3, canvas: HTMLCanvasElement, box: HTMLElement, fog = 0x0b0f17, fov = 34) {
  const R = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  R.setPixelRatio(Math.min(1.75, devicePixelRatio));
  const S = new THREE.Scene(); S.fog = new THREE.FogExp2(fog, 0.028);
  const cam = new THREE.PerspectiveCamera(fov, 1, 0.1, 200);
  S.add(new THREE.AmbientLight(0xffffff, 0.55)); const key = new THREE.DirectionalLight(0xffffff, 0.9); key.position.set(6, 14, 6); S.add(key);
  const rim = new THREE.PointLight(0x86abdd, 30, 40); rim.position.set(-8, 6, -6); S.add(rim);
  const w = { R, S, cam, W: 1, H: 1, size: () => {} };
  w.size = () => { w.W = Math.max(1, box.clientWidth); w.H = Math.max(1, box.clientHeight); R.setSize(w.W, w.H, false); cam.aspect = w.W / w.H; cam.updateProjectionMatrix(); };
  w.size(); addEventListener('resize', w.size);
  return w;
}

/** rAF loop that pauses while `el` is off screen or the tab is hidden. Returns a stop function. */
export function runLoop(el: Element, frame: (now: number) => void) {
  let visible = true; let raf = 0; let alive = true;
  const io = new IntersectionObserver((es) => { visible = es.some((e) => e.isIntersecting); }, { threshold: 0 }); io.observe(el);
  const tick = (now: number) => { if (!alive) return; raf = requestAnimationFrame(tick); if (visible && !document.hidden) frame(now); };
  raf = requestAnimationFrame(tick);
  return () => { alive = false; cancelAnimationFrame(raf); io.disconnect(); };
}

/** Project a world point to pixels inside a W by H box. `off` is added to the point first. `behind` is true when the
 *  point is behind the camera. With `clamp`, `cx` is min(x1, max(x0, x + dx)) and `cy` is min(y1, max(y0, y)), the
 *  stage's label rules, kept in that exact order so positions match to the last digit. */
export function project(v: any, cam: any, W: number, H: number, off?: any, clamp?: { x0: number; x1: number; dx?: number; y0: number; y1: number }) {
  const p = v.clone(); if (off) p.add(off); p.project(cam);
  const x = (p.x + 1) / 2 * W, y = (1 - p.y) / 2 * H;
  const cx = clamp ? Math.min(clamp.x1, Math.max(clamp.x0, x + (clamp.dx ?? 0))) : x;
  const cy = clamp ? Math.min(clamp.y1, Math.max(clamp.y0, y)) : y;
  return { x, y, cx, cy, behind: p.z > 1 };
}

/** Eased camera move over `ms`, cubic out, the stage's 1.2 s default. */
export function camEase(THREE: T3, cam: any) {
  let from = { pos: cam.position.clone(), look: new THREE.Vector3() }, to = from, t0 = 0, moving = false; const look = new THREE.Vector3();
  return {
    look,
    go(pos: number[], at: number[], now = performance.now(), jump = false) { const p = new THREE.Vector3(...pos), l = new THREE.Vector3(...at); if (jump) { cam.position.copy(p); look.copy(l); from = to = { pos: p, look: l }; moving = false; return; } from = { pos: cam.position.clone(), look: look.clone() }; to = { pos: p, look: l }; t0 = now; moving = true; },
    step(now: number, ms = 1200) { if (moving) { const k = Math.min(1, (now - t0) / ms), e = 1 - Math.pow(1 - k, 3); cam.position.lerpVectors(from.pos, to.pos, e); look.lerpVectors(from.look, to.look, e); if (k >= 1) moving = false; } cam.lookAt(look); return moving; },
    get moving() { return moving; }
  };
}

/** The stage's ambient scene: four translucent layer slabs, their blocks and green and red dots on the request route. */
export function layerScene(THREE: T3, S: any, D: any, layerTone: string[], dim = 1) {
  const blocks: Record<string, any> = {};
  D.layers.forEach((L: any, i: number) => {
    const col = TONE[layerTone[i]];
    const g = new THREE.Mesh(new THREE.BoxGeometry(10, 0.22, 5.4), new THREE.MeshStandardMaterial({ color: col, transparent: true, opacity: 0.22 * dim, roughness: 0.6, metalness: 0.1 }));
    g.position.y = i * 1.6; S.add(g);
    g.add(new THREE.LineSegments(new THREE.EdgesGeometry(g.geometry), new THREE.LineBasicMaterial({ color: col, transparent: true, opacity: 0.5 * dim })));
    L.blocks.forEach((id: string, j: number) => {
      const xs = L.blocks.length === 1 ? [0] : [-3, 0, 3];
      const m = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.7, 1.7), new THREE.MeshStandardMaterial({ color: col, emissive: col, emissiveIntensity: 0.18 * dim, roughness: 0.4, transparent: dim < 1, opacity: Math.min(1, 0.4 + dim) }));
      m.position.set(xs[j], i * 1.6 + 0.47, 0); S.add(m); blocks[id] = m;
    });
  });
  const up = (id: string) => blocks[id].position.clone().add(new THREE.Vector3(0, 0.75, 0));
  const curve = new THREE.CatmullRomCurve3(D.steps.filter((s: any) => blocks[s.block]).map((s: any) => up(s.block)), false, 'catmullrom', 0.2);
  S.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 120, 0.035, 8, false), new THREE.MeshBasicMaterial({ color: 0x86abdd, transparent: true, opacity: 0.55 * dim })));
  const dotGeo = new THREE.SphereGeometry(0.16, 14, 10); const dots: any[] = []; let last = 0;
  return (now: number) => {
    if (now - last > 900 && dots.length < 24) {
      last = now; const bad = Math.random() < 0.2;
      const m = new THREE.Mesh(dotGeo, new THREE.MeshBasicMaterial({ color: bad ? 0xff776c : 0x4edab5, transparent: true, opacity: dim })); m.userData = { t: 0, end: bad ? 0.35 + Math.random() * 0.4 : 1 }; S.add(m); dots.push(m);
    }
    for (let i = dots.length - 1; i >= 0; i--) { const d = dots[i]; d.userData.t += 0.0035; if (d.userData.t >= d.userData.end) { S.remove(d); dots.splice(i, 1); continue; } d.position.copy(curve.getPointAt(d.userData.t)); }
  };
}
