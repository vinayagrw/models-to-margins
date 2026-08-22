/* stencil-engine.js — icon-led AWS solution-architecture stencil with animated flow.
 *
 * The page defines window.STENCIL (see references/authoring.md for the contract)
 * and this file does everything else: layout, orthogonal routing, motion,
 * narration, detail cards, camera, fullscreen, embed autosize.
 *
 * Three ideas carry the whole thing, and they are the reason this looks like a
 * drawing an architect handed you rather than boxes an LLM emitted:
 *
 *  1. Frame boxes are COMPUTED from their members, never authored. A VPC
 *     rectangle cannot drift out of agreement with what it contains, because it
 *     has no independent existence.
 *  2. Connector routing is a SEARCH, not a nudge. For each edge a ladder of
 *     candidate shapes is generated cheapest-first and the first one that clears
 *     every node box wins. The last rung is a corridor route that is legal by
 *     construction, so the search always terminates with a drawable path.
 *  3. Long runs travel only in the corridors between grid rows and columns, so
 *     a wire can never cross a service it has nothing to do with.
 */
(() => {
  const D = window.STENCIL;
  if (!D) { console.error('[stencil] window.STENCIL is not defined'); return; }

  const $ = (id) => document.getElementById(id);
  const NS = 'http://www.w3.org/2000/svg';
  const mk = (t) => document.createElementNS(NS, t);
  const stage = $('stage'), world = $('world'), diagram = $('diagram'), svg = $('svg');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const S = D.nodes, LAYOUT = D.layout, GROUPS = D.groups, EDGES = D.edges;
  const ICONS = D.iconBase || './icons/';
  const TYPES = D.types || { flow: { color: 'var(--ink)', label: 'Flow' } };
  const ty = (t) => TYPES[t] || TYPES[Object.keys(TYPES)[0]];

  /* Steps may be plain strings; the engine supplies "Step i of N" so renumbering
     after an edit is not a manual chore that silently goes stale. `auto` records
     that we own the label, so a scenario can renumber it without overwriting a
     label the author wrote deliberately. */
  const STEPS = (D.steps || []).map((s, i, a) =>
    typeof s === 'string'
      ? { k: 'Step ' + (i + 1) + ' of ' + a.length, v: s, auto: true }
      : { k: s.k || 'Step ' + (i + 1) + ' of ' + a.length, v: s.v, auto: !s.k });

  /* Scenarios are an optional second axis over the same drawing: one topology,
     several journeys across it. Each scenario names the subset of steps its
     journey uses, and everything outside that subset is pushed back rather than
     removed — the reader keeps seeing the whole system, which is the point of
     drawing it once. Absent the key the engine behaves exactly as before. */
  const SCENS = Array.isArray(D.scenarios) && D.scenarios.length ? D.scenarios : null;
  if (SCENS) SCENS.forEach((sc, i) => {
    if (!Array.isArray(sc.steps) || !sc.steps.length) console.error('[stencil] scenario', sc.id || i, 'declares no steps');
  });

  /* ---------- head, legend, narration chrome ---------- */
  if (D.title) { $('h-title').innerHTML = D.title; document.title = D.title.replace(/<[^>]+>/g, ''); }
  if (D.intro) $('h-intro').innerHTML = D.intro;

  const legend = $('legend');
  Object.keys(TYPES).forEach((t) => {
    const T = TYPES[t];
    if (T.hide) return;
    const el = document.createElement('span');
    el.className = 'lg' + (T.dash ? ' dash' : '');
    el.style.setProperty('--k', T.color);
    el.innerHTML = '<i></i>' + T.label;
    legend.appendChild(el);
  });

  const WHERE = {};
  GROUPS.forEach((g) => (g.nodes || []).forEach((k) => {
    WHERE[k] = (WHERE[k] ? WHERE[k] + ' › ' : '') + String(g.label).replace(/&middot;/g, '·').replace(/<[^>]+>/g, '');
  }));

  /* ================= build DOM ================= */
  const NW = 164, NH = 154, GAPX = 74, GAPY = 48;
  const PITCHX = NW + GAPX, PITCHY = NH + GAPY;
  let MX = 0, MY = 0;                       /* set by the two-pass layout below */
  const cellX = (c) => MX + c * PITCHX;
  const cellY = (r) => MY + r * PITCHY;

  const gEls = {}, nEls = {};
  GROUPS.forEach((g) => {
    const el = document.createElement('div');
    el.className = 'g ' + (g.cls || 'plain');
    el.id = 'g-' + g.id;
    if (g.color) el.style.setProperty('--gc', g.color);
    const lb = document.createElement('span');
    lb.className = 'g-label';
    if (g.icon) {
      const im = document.createElement('img');
      im.src = ICONS + g.icon + '.svg';
      im.alt = '';
      im.addEventListener('error', () => im.remove());
      lb.appendChild(im);
    }
    const tx = document.createElement('b');
    tx.innerHTML = g.label;
    lb.appendChild(tx);
    el.appendChild(lb);
    diagram.appendChild(el);
    gEls[g.id] = el;
  });

  /* A missing icon must not read as a broken drawing. Fall back to a monogram
     tile so the stencil still parses at a glance and the gap is obvious to the
     author rather than to the reader. */
  const missing = new Set();
  const iconInto = (host, key, name) => {
    const im = document.createElement('img');
    im.src = ICONS + key + '.svg';
    im.alt = '';
    im.addEventListener('error', () => {
      missing.add(key);
      im.remove();
      const ph = document.createElement('span');
      ph.className = 'ic-ph';
      ph.textContent = (name || key).replace(/[^A-Za-z0-9 ]/g, '').split(/\s+/).slice(0, 2)
        .map((w) => w[0] || '').join('').toUpperCase() || '?';
      host.appendChild(ph);
    });
    host.appendChild(im);
    return im;
  };

  Object.keys(LAYOUT).forEach((k) => {
    const d = S[k];
    if (!d) { console.error('[stencil] layout references unknown node:', k); return; }
    const el = document.createElement('button');
    el.className = 'node';
    el.id = 'n-' + k;
    el.type = 'button';
    el.setAttribute('aria-pressed', 'false');
    el.setAttribute('aria-label', d.nm + ', ' + d.sv);
    const ic = document.createElement('span');
    ic.className = 'ic';
    iconInto(ic, d.ic, d.nm);
    el.appendChild(ic);
    const nm = document.createElement('span'); nm.className = 'nm'; nm.innerHTML = d.nm; el.appendChild(nm);
    const sv = document.createElement('span'); sv.className = 'sv'; sv.innerHTML = d.sv; el.appendChild(sv);
    diagram.appendChild(el);
    nEls[k] = el;
  });

  /* ---------- frame boxes: computed, innermost first ---------- */
  let boxes = {};
  const computeBox = (g) => {
    if (boxes[g.id]) return boxes[g.id];
    let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
    (g.nodes || []).forEach((k) => {
      if (!LAYOUT[k]) { console.error('[stencil] group', g.id, 'lists unplaced node:', k); return; }
      const [c, r] = LAYOUT[k];
      x0 = Math.min(x0, cellX(c)); y0 = Math.min(y0, cellY(r));
      x1 = Math.max(x1, cellX(c) + NW); y1 = Math.max(y1, cellY(r) + NH);
    });
    (g.kids || []).forEach((kid) => {
      const cg = GROUPS.find((z) => z.id === kid);
      if (!cg) { console.error('[stencil] group', g.id, 'lists unknown child:', kid); return; }
      const b = computeBox(cg);
      x0 = Math.min(x0, b.x); y0 = Math.min(y0, b.y);
      x1 = Math.max(x1, b.x + b.w); y1 = Math.max(y1, b.y + b.h);
    });
    const pad = g.pad == null ? 14 : g.pad, head = g.head == null ? 22 : g.head;
    const b = { x: x0 - pad, y: y0 - pad - head, w: (x1 - x0) + pad * 2, h: (y1 - y0) + pad * 2 + head };
    boxes[g.id] = b;
    return b;
  };

  /* Frames can nest several deep — Cloud wraps Region wraps VPC wraps subnet —
     so how far the outermost frame overhangs the grid is not knowable until the
     boxes exist. Lay out once at the origin, measure the overhang, then lay out
     again with exactly that margin. Skipping this clips the outermost label off
     the top of the world, and no assertion about node positions will catch it. */
  const EDGEPAD = 18;
  GROUPS.forEach(computeBox);
  let minX = Infinity, minY = Infinity;
  GROUPS.forEach((g) => { minX = Math.min(minX, boxes[g.id].x); minY = Math.min(minY, boxes[g.id].y); });
  /* Bare cells count too. A node in no frame, sitting in a row above every
     frame's top edge, is the case that breaks if you measure frames alone: the
     margin comes out negative, the node lands above the world origin, and the
     stage's overflow clip simply eats it. Nothing about the frames looks wrong,
     which is why this survived a green suite. */
  Object.keys(LAYOUT).forEach((k) => {
    const [c, r] = LAYOUT[k];
    minX = Math.min(minX, cellX(c)); minY = Math.min(minY, cellY(r));
  });
  MX = EDGEPAD - minX;
  MY = EDGEPAD - minY;
  boxes = {};
  GROUPS.forEach(computeBox);

  GROUPS.forEach((g) => {
    const b = boxes[g.id], el = gEls[g.id];
    el.style.left = b.x + 'px'; el.style.top = b.y + 'px';
    el.style.width = b.w + 'px'; el.style.height = b.h + 'px';
  });
  Object.keys(LAYOUT).forEach((k) => {
    if (!nEls[k]) return;
    const [c, r] = LAYOUT[k];
    nEls[k].style.left = cellX(c) + 'px';
    nEls[k].style.top = cellY(r) + 'px';
  });

  /* World size from true content extent, so there is never a dead band. */
  let WX = 0, WY = 0;
  GROUPS.forEach((g) => { const b = boxes[g.id]; WX = Math.max(WX, b.x + b.w); WY = Math.max(WY, b.y + b.h); });
  Object.keys(LAYOUT).forEach((k) => {
    const [c, r] = LAYOUT[k];
    WX = Math.max(WX, cellX(c) + NW); WY = Math.max(WY, cellY(r) + NH);
  });
  const WW = Math.round(WX + EDGEPAD), WH = Math.round(WY + EDGEPAD);
  world.style.setProperty('--ww', WW + 'px');
  world.style.setProperty('--wh', WH + 'px');
  diagram.style.width = WW + 'px';
  diagram.style.height = WH + 'px';
  svg.setAttribute('viewBox', '0 0 ' + WW + ' ' + WH);

  /* ================= orthogonal router ================= */
  const ICON = 46;
  const RECTS = {};
  Object.keys(LAYOUT).forEach((k) => {
    const [c, r] = LAYOUT[k];
    const x = cellX(c), y = cellY(r);
    RECTS[k] = { k, c, r, left: x, right: x + NW, top: y, bottom: y + NH, cx: x + NW / 2, icy: y + ICON / 2 };
  });
  const ALL = Object.keys(RECTS).map((k) => RECTS[k]);

  const seg = (a, b) => ({ x0: Math.min(a.x, b.x), y0: Math.min(a.y, b.y), x1: Math.max(a.x, b.x), y1: Math.max(a.y, b.y) });
  const hits = (pts, skip) => {
    const PAD = 7;
    for (let i = 0; i < pts.length - 1; i++) {
      const s = seg(pts[i], pts[i + 1]);
      for (const r of ALL) {
        if (skip.includes(r)) continue;
        if (s.x1 < r.left - PAD || s.x0 > r.right + PAD) continue;
        if (s.y1 < r.top - PAD || s.y0 > r.bottom + PAD) continue;
        return true;
      }
    }
    return false;
  };

  /* corridor centre lines — the only places a long run is allowed to travel */
  const gxR = (i) => cellX(i) + NW + GAPX / 2;
  const gxL = (i) => cellX(i) - GAPX / 2;
  const gyB = (j) => cellY(j) + NH + GAPY / 2;
  const gyT = (j) => cellY(j) - GAPY / 2;

  /* Horizontal runs attach at the icon, vertical ones at the labelled shape,
     which is how AWS's own stencils connect. */
  const PORT = {
    E: (r, o) => ({ x: r.cx + 30, y: r.icy + o }),
    W: (r, o) => ({ x: r.cx - 30, y: r.icy + o }),
    N: (r, o) => ({ x: r.cx + o, y: r.top - 2 }),
    S: (r, o) => ({ x: r.cx + o, y: r.bottom + 2 })
  };
  const clean = (pts) => pts.filter((p, i) =>
    i === 0 || Math.abs(p.x - pts[i - 1].x) > 0.5 || Math.abs(p.y - pts[i - 1].y) > 0.5);

  const candidates = (A, B) => {
    const out = [];
    const right = B.c > A.c, down = B.r > A.r;
    const sameR = A.r === B.r, sameC = A.c === B.c;
    const EA = right ? 'E' : 'W', EB = right ? 'W' : 'E';
    const VA = down ? 'S' : 'N', VB = down ? 'N' : 'S';
    const P = (s, r, o) => PORT[s](r, o);

    /* A straight run takes the SAME lane offset at both ends. Letting each end
       pick its own leaves the line a few pixels off level, which reads as a
       sloppy drawing rather than a stencil. */
    if (sameR) out.push({ sa: EA, sb: EB, pts: (a) => [P(EA, A, a), P(EB, B, a)] });
    if (sameC) out.push({ sa: VA, sb: VB, pts: (a) => [P(VA, A, a), P(VB, B, a)] });
    if (!sameR) out.push({ sa: EA, sb: VB, pts: (a, b) => { const p = P(EA, A, a), q = P(VB, B, b); return [p, { x: q.x, y: p.y }, q]; } });
    if (!sameC) out.push({ sa: VA, sb: EB, pts: (a, b) => { const p = P(VA, A, a), q = P(EB, B, b); return [p, { x: p.x, y: q.y }, q]; } });

    if (!sameC) {                                        /* Z through a vertical corridor */
      const lo = Math.min(A.c, B.c), hi = Math.max(A.c, B.c);
      for (let i = lo; i < hi; i++) {
        const X = gxR(i);
        out.push({ sa: EA, sb: EB, key: 'v' + i, pts: (a, b, g) => {
          const p = P(EA, A, a), q = P(EB, B, b);
          return [p, { x: X + g, y: p.y }, { x: X + g, y: q.y }, q];
        } });
      }
    }
    {                                                    /* Z through a horizontal corridor */
      const ys = [];
      const lo = Math.min(A.r, B.r), hi = Math.max(A.r, B.r);
      for (let j = lo; j < hi; j++) ys.push([gyB(j), 'h' + j]);
      if (sameR) { ys.push([gyB(A.r), 'h' + A.r]); ys.push([gyT(A.r), 'h' + (A.r - 1)]); }
      ys.forEach(([Y, key]) => {
        const va = Y > A.bottom ? 'S' : 'N', vb = Y > B.bottom ? 'S' : 'N';
        out.push({ sa: va, sb: vb, key, pts: (a, b, g) => {
          const p = P(va, A, a), q = P(vb, B, b);
          return [p, { x: p.x, y: Y + g }, { x: q.x, y: Y + g }, q];
        } });
      });
    }
    {                                                    /* legal by construction */
      const gA = down ? gyB(A.r) : gyT(A.r);
      const gB = down ? gyT(B.r) : gyB(B.r);
      const X = right ? gxL(B.c) : gxR(B.c);
      const va = down ? 'S' : 'N', vb = down ? 'N' : 'S';
      out.push({ sa: va, sb: vb, key: 'c' + A.r + '_' + B.r + '_' + B.c, safe: true, pts: (a, b, g) => {
        const p = P(va, A, a), q = P(vb, B, b);
        return [p, { x: p.x, y: gA + g }, { x: X + g, y: gA + g }, { x: X + g, y: gB - g }, { x: q.x, y: gB - g }, q];
      } });
    }
    return out;
  };

  /* Pass 1 — cheapest shape that clears every node. */
  const routed = EDGES.filter((e) => {
    if (RECTS[e.f] && RECTS[e.t]) return true;
    console.error('[stencil] edge references unplaced node:', e.f, '->', e.t);
    return false;
  }).map((e) => {
    const A = RECTS[e.f], B = RECTS[e.t];
    const list = candidates(A, B);
    for (const c of list) {
      const pts = clean(c.pts(0, 0, 0));
      if (!hits(pts, [A, B])) return { e, A, B, c, pts };
    }
    const last = list[list.length - 1];
    return { e, A, B, c: last, pts: clean(last.pts(0, 0, 0)), forced: true };
  });

  /* Pass 2 — fan connections out across each node side, and spread wires that
     share a corridor, keeping an offset only when it stays collision-free. */
  const sideMap = {}, corridor = {};
  routed.forEach((r) => {
    (sideMap[r.e.f + r.c.sa] = sideMap[r.e.f + r.c.sa] || []).push(r);
    (sideMap[r.e.t + r.c.sb] = sideMap[r.e.t + r.c.sb] || []).push(r);
    if (r.c.key) (corridor[r.c.key] = corridor[r.c.key] || []).push(r);
  });
  const spread = (bucket, r, step, cap) => {
    if (!bucket || bucket.length < 2) return 0;
    const i = bucket.indexOf(r), n = bucket.length;
    return Math.max(-cap, Math.min(cap, (i - (n - 1) / 2) * step));
  };
  routed.forEach((r) => {
    const sa = r.c.sa, sb = r.c.sb;
    const a = spread(sideMap[r.e.f + sa], r, (sa === 'E' || sa === 'W') ? 10 : 26, (sa === 'E' || sa === 'W') ? 16 : 40);
    const b = spread(sideMap[r.e.t + sb], r, (sb === 'E' || sb === 'W') ? 10 : 26, (sb === 'E' || sb === 'W') ? 16 : 40);
    const g = r.c.key ? spread(corridor[r.c.key], r, 14, 20) : 0;
    if (!a && !b && !g) return;
    const pts = clean(r.c.pts(a, b, g));
    if (!hits(pts, [r.A, r.B])) r.pts = pts;
  });

  /* Rounded elbows, drawio style. */
  const toPath = (pts) => {
    const R = 8;
    let d = 'M ' + pts[0].x.toFixed(1) + ' ' + pts[0].y.toFixed(1);
    for (let i = 1; i < pts.length - 1; i++) {
      const a = pts[i - 1], b = pts[i], c = pts[i + 1];
      const l1 = Math.hypot(b.x - a.x, b.y - a.y), l2 = Math.hypot(c.x - b.x, c.y - b.y);
      const r = Math.min(R, l1 / 2, l2 / 2);
      if (r < 1.5) { d += ' L ' + b.x.toFixed(1) + ' ' + b.y.toFixed(1); continue; }
      const p1 = { x: b.x + (a.x - b.x) / l1 * r, y: b.y + (a.y - b.y) / l1 * r };
      const p2 = { x: b.x + (c.x - b.x) / l2 * r, y: b.y + (c.y - b.y) / l2 * r };
      d += ' L ' + p1.x.toFixed(1) + ' ' + p1.y.toFixed(1) +
           ' Q ' + b.x.toFixed(1) + ' ' + b.y.toFixed(1) + ' ' + p2.x.toFixed(1) + ' ' + p2.y.toFixed(1);
    }
    const e = pts[pts.length - 1];
    d += ' L ' + e.x.toFixed(1) + ' ' + e.y.toFixed(1);
    return d;
  };

  const wires = [];
  let collisions = 0;

  routed.forEach((rt, idx) => {
    const { e, pts } = rt;
    const T = ty(e.ty);
    if (rt.forced) collisions++;
    const d = toPath(pts);

    const path = mk('path');
    path.setAttribute('d', d);
    path.setAttribute('class', 'wire' + (T.dash ? ' dashed' : ''));
    path.style.stroke = T.color;
    path.dataset.i = idx;
    path.dataset.ty = e.ty;
    svg.appendChild(path);

    const last = pts[pts.length - 1], prev = pts[pts.length - 2];
    const ang = Math.atan2(last.y - prev.y, last.x - prev.x) * 180 / Math.PI;
    const head = mk('path');
    head.setAttribute('d', 'M 0 0 L -8 -4 L -8 4 Z');
    head.setAttribute('transform', 'translate(' + last.x.toFixed(1) + ',' + last.y.toFixed(1) + ') rotate(' + ang.toFixed(1) + ')');
    head.setAttribute('class', 'head-a');
    head.style.fill = T.color;
    svg.appendChild(head);

    let bdg = null;
    if (e.n) {
      const mp = path.getPointAtLength(path.getTotalLength() * 0.5);
      bdg = mk('g');
      bdg.setAttribute('class', 'bdg');
      const c = mk('circle');
      c.setAttribute('cx', mp.x); c.setAttribute('cy', mp.y); c.setAttribute('r', 11);
      const t = mk('text');
      t.setAttribute('x', mp.x); t.setAttribute('y', mp.y);
      t.textContent = e.n;
      bdg.appendChild(c); bdg.appendChild(t);
      svg.appendChild(bdg);
    }

    /* A route that must not exist gets a cross at the boundary it never passes.
       Drawing the absence is far more convincing than omitting the line. */
    if (T.blocked) {
      const mp = path.getPointAtLength(path.getTotalLength() * 0.52);
      const g = mk('g');
      g.setAttribute('class', 'bdg xg');
      [[-6, -6, 6, 6], [-6, 6, 6, -6]].forEach(([x1, y1, x2, y2]) => {
        const ln = mk('line');
        ln.setAttribute('x1', mp.x + x1); ln.setAttribute('y1', mp.y + y1);
        ln.setAttribute('x2', mp.x + x2); ln.setAttribute('y2', mp.y + y2);
        ln.setAttribute('class', 'xmark');
        ln.style.stroke = T.color;
        g.appendChild(ln);
      });
      svg.appendChild(g);
    }

    wires.push({ e, T, path, head, bdg, d, len: path.getTotalLength(), pk: null, halo: null });
  });

  /* ---------- motion: packets ride the elbows, wires draw on in flow order ---------- */
  if (!reduced) {
    wires.forEach((w, i) => {
      if (w.e.s === 0 && !w.T.blocked) return;   /* always-on context stays quiet */
      const dur = Math.max(2.4, Math.min(7, w.len / 130));
      const halo = mk('circle'); halo.setAttribute('r', 7); halo.setAttribute('class', 'pk-halo');
      const pk = mk('circle'); pk.setAttribute('r', 3.6);
      pk.setAttribute('class', 'pk' + (w.T.blocked ? ' dead' : ''));
      [halo, pk].forEach((n) => {
        n.style.offsetPath = 'path("' + w.d + '")';
        n.style.setProperty('--wc', w.T.color);
        n.style.setProperty('--i', w.e.n || i % 8);
        n.style.setProperty('--dur', dur + 's');
      });
      if (w.T.blocked) { pk.style.setProperty('--dur', '3.6s'); svg.appendChild(pk); w.pk = pk; return; }
      svg.appendChild(halo); svg.appendChild(pk);
      w.pk = pk; w.halo = halo;
    });

    const maxN = wires.reduce((m, w) => Math.max(m, w.e.n || 0), 0);
    wires.forEach((w) => {
      const order = w.e.n ? w.e.n : maxN + 1;
      w.path.style.setProperty('--len', w.len);
      w.path.style.setProperty('--i', order);
      w.path.classList.add('draw');
      w.head.style.setProperty('--i', order);
      w.head.classList.add('draw');
      if (w.bdg) { w.bdg.style.setProperty('--i', order); w.bdg.classList.add('draw'); }
    });
  }

  /* ================= narration ================= */
  let step = 0;                                   /* 0 = show everything in scope */
  let scen = SCENS ? 0 : -1;                      /* index into SCENS, -1 = none */
  const scrub = $('scrub');
  let ticks = [];
  const ALLK = D.allLabel || 'All steps';
  const ALLV = D.allCaption || 'The whole architecture, every route live. Pick a step to walk one journey through it.';

  const activeSteps = () => (SCENS ? SCENS[scen].steps : STEPS.map((_, i) => i + 1));
  /* An always-on context edge (s === 0) belongs to every journey, so it stays in
     scope whichever scenario is selected. */
  const inScope = (e) => !SCENS || e.s === 0 || SCENS[scen].steps.includes(e.s);

  const buildTicks = () => {
    scrub.querySelectorAll('.tick').forEach((b) => b.remove());
    ticks = activeSteps().map((gs, i) => {
      const b = document.createElement('button');
      b.className = 'tick';
      b.textContent = i + 1;
      b.dataset.step = gs;
      b.setAttribute('aria-pressed', 'false');
      b.setAttribute('aria-label', 'Step ' + (i + 1));
      b.addEventListener('click', () => { stopPlay(); setStep(step === gs ? 0 : gs); });
      scrub.appendChild(b);
      return b;
    });
  };
  if (!STEPS.length) { scrub.hidden = true; $('narr').hidden = true; $('b-play').hidden = true; $('b-all').hidden = true; }

  /* Under a scenario the reader is walking that journey, so the counter has to
     count that journey. Only relabel steps whose label the engine generated. */
  const stepLabel = (s) => {
    const A = activeSteps(), i = A.indexOf(s);
    if (SCENS && i >= 0 && STEPS[s - 1].auto) return 'Step ' + (i + 1) + ' of ' + A.length;
    return STEPS[s - 1].k;
  };

  const setStep = (s) => {
    step = s;
    diagram.classList.toggle('stepping', s > 0);
    ticks.forEach((b) => b.setAttribute('aria-pressed', String(Number(b.dataset.step) === s)));
    $('n-num').textContent = s === 0 ? (scen >= 0 ? SCENS[scen].label : ALLK) : stepLabel(s);
    $('n-cap').textContent = s === 0 ? (scen >= 0 ? (SCENS[scen].ds || ALLV) : ALLV) : STEPS[s - 1].v;
    const live = new Set();
    wires.forEach((w) => {
      const on = s > 0 && w.e.s === s;
      w.path.classList.toggle('on', on);
      w.head.classList.toggle('on', on);
      if (w.bdg) w.bdg.classList.toggle('on', on);
      if (w.pk) w.pk.classList.toggle('on', on);
      if (w.halo) w.halo.classList.toggle('on', on);
      if (on) { live.add(w.e.f); live.add(w.e.t); }
    });
    Object.keys(nEls).forEach((k) => nEls[k].classList.toggle('on', live.has(k)));
  };

  /* ---------- scenario selector ---------- */
  const setScen = (i) => {
    scen = i;
    const touched = new Set();
    wires.forEach((w) => {
      const oos = !inScope(w.e);
      w.path.classList.toggle('oos', oos);
      w.head.classList.toggle('oos', oos);
      if (w.bdg) w.bdg.classList.toggle('oos', oos);
      if (w.pk) w.pk.classList.toggle('oos', oos);
      if (w.halo) w.halo.classList.toggle('oos', oos);
      if (!oos) { touched.add(w.e.f); touched.add(w.e.t); }
    });
    Object.keys(nEls).forEach((k) => nEls[k].classList.toggle('oos', !touched.has(k)));
    scenBtns.forEach((b, j) => b.setAttribute('aria-pressed', String(j === i)));
    buildTicks();
    setStep(0);
  };

  const scenBtns = [];
  if (SCENS) {
    /* Built here rather than in the template so a figure scaffolded before
       scenarios existed picks them up from an engine refresh alone. */
    let bar = $('scenbar');
    if (!bar) {
      bar = document.createElement('div');
      bar.className = 'bar';
      bar.id = 'scenbar';
      const lb = document.createElement('span');
      lb.className = 'lbl';
      lb.textContent = D.scenarioLabel || 'Scenario';
      bar.appendChild(lb);
      $('ctlbar').parentNode.insertBefore(bar, $('ctlbar'));
    }
    bar.hidden = false;
    diagram.classList.add('scoped');
    SCENS.forEach((sc, i) => {
      const b = document.createElement('button');
      b.textContent = sc.label;
      b.setAttribute('aria-pressed', 'false');
      b.addEventListener('click', () => { stopPlay(); setScen(i); });
      bar.appendChild(b);
      scenBtns.push(b);
    });
  }

  let timer = null;
  const stopPlay = () => {
    if (timer) { clearInterval(timer); timer = null; }
    $('b-play').setAttribute('aria-pressed', 'false');
    $('b-play').textContent = 'Play';
  };
  $('b-play').addEventListener('click', () => {
    if (timer) { stopPlay(); return; }
    $('b-play').setAttribute('aria-pressed', 'true');
    $('b-play').textContent = 'Pause';
    const A = activeSteps();
    if (step === 0) setStep(A[0]);
    timer = setInterval(() => {
      const i = A.indexOf(step);
      setStep(A[(i + 1) % A.length]);
    }, D.dwell || 4200);
  });
  $('b-all').addEventListener('click', () => { stopPlay(); setStep(0); });

  /* ================= detail cards ================= */
  const card = $('card');
  let openKey = null;
  const closeCard = () => {
    card.hidden = true;
    if (openKey && nEls[openKey]) nEls[openKey].setAttribute('aria-pressed', 'false');
    openKey = null;
  };
  const openCard = (k, el) => {
    if (openKey === k) { closeCard(); return; }
    closeCard();
    openKey = k;
    el.setAttribute('aria-pressed', 'true');
    const d = S[k];
    const ich = $('card-ic'); ich.innerHTML = ''; iconInto(ich, d.ic, d.nm);
    $('card-nm').textContent = d.nm;
    $('card-sv').textContent = d.sv;
    $('card-ds').textContent = d.ds;
    $('card-wh').textContent = WHERE[k] ? 'Sits in: ' + WHERE[k] : (D.outsideLabel || 'Outside the account boundary.');
    card.hidden = false;
    /* Anchor to the icon in screen space, then keep the card inside the shell. */
    const sr = stage.getBoundingClientRect(), er = el.getBoundingClientRect();
    const host = card.offsetParent.getBoundingClientRect();
    let x = er.left - host.left + er.width / 2 - card.offsetWidth / 2;
    let y = er.bottom - host.top + 8;
    if (y + card.offsetHeight > sr.bottom - host.top - 6) y = er.top - host.top - card.offsetHeight - 8;
    x = Math.max(6, Math.min(x, host.width - card.offsetWidth - 6));
    y = Math.max(sr.top - host.top + 6, y);
    card.style.left = x + 'px';
    card.style.top = y + 'px';
  };
  Object.keys(nEls).forEach((k) => nEls[k].addEventListener('click', (ev) => { ev.stopPropagation(); openCard(k, nEls[k]); }));
  $('card-x').addEventListener('click', closeCard);
  stage.addEventListener('pointerdown', (ev) => { if (!card.hidden && !ev.target.closest('.node')) closeCard(); });

  /* ================= camera ================= */
  const MINK = 0.14, MAXK = 2.6;
  let cam = { x: 0, y: 0, k: 0.5 };
  const stageSize = () => ({ w: stage.clientWidth, h: stage.clientHeight });
  const fitK = () => {
    const s = stageSize();
    return Math.min(MAXK, Math.max(MINK, Math.min((s.w - 20) / WW, (s.h - 20) / WH)));
  };
  const minK = () => Math.max(MINK, fitK() * 0.9);
  const clampCam = (c) => {
    const s = stageSize(), w = WW * c.k, h = WH * c.k;
    c.x = w <= s.w ? (s.w - w) / 2 : Math.min(0, Math.max(s.w - w, c.x));
    c.y = h <= s.h ? (s.h - h) / 2 : Math.min(0, Math.max(s.h - h, c.y));
    return c;
  };
  const setCam = (x, y, k) => {
    cam = clampCam({ x, y, k: Math.max(minK(), Math.min(MAXK, k)) });
    world.style.setProperty('--cx', cam.x + 'px');
    world.style.setProperty('--cy', cam.y + 'px');
    world.style.setProperty('--k', cam.k);
  };
  const fit = () => { const k = fitK(), s = stageSize(); setCam((s.w - WW * k) / 2, (s.h - WH * k) / 2, k); };
  const zoomAt = (px, py, nk) => {
    const k = Math.max(minK(), Math.min(MAXK, nk));
    setCam(px - (px - cam.x) * (k / cam.k), py - (py - cam.y) * (k / cam.k), k);
  };
  const zoomCentre = (f) => { const s = stageSize(); zoomAt(s.w / 2, s.h / 2, cam.k * f); };

  $('b-fit').addEventListener('click', fit);
  $('b-in').addEventListener('click', () => zoomCentre(1.28));
  $('b-out').addEventListener('click', () => zoomCentre(1 / 1.28));

  let drag = null;
  stage.addEventListener('pointerdown', (ev) => {
    if (ev.target.closest('.node, button')) return;
    drag = { x: ev.clientX, y: ev.clientY, cx: cam.x, cy: cam.y };
    stage.classList.add('dragging');
    stage.setPointerCapture(ev.pointerId);
  });
  stage.addEventListener('pointermove', (ev) => {
    if (!drag) return;
    setCam(drag.cx + (ev.clientX - drag.x), drag.cy + (ev.clientY - drag.y), cam.k);
  });
  const endDrag = () => { drag = null; stage.classList.remove('dragging'); };
  stage.addEventListener('pointerup', endDrag);
  stage.addEventListener('pointercancel', endDrag);

  /* Wheel must never hijack the host page's scroll: it zooms only with ctrl/cmd
     held, or once the reader has deliberately focused the stage. */
  stage.addEventListener('wheel', (ev) => {
    if (!ev.ctrlKey && !ev.metaKey && document.activeElement !== stage) return;
    ev.preventDefault();
    const r = stage.getBoundingClientRect();
    zoomAt(ev.clientX - r.left, ev.clientY - r.top,
      cam.k * Math.exp(-ev.deltaY * ((ev.ctrlKey || ev.metaKey) ? 0.011 : 0.0022)));
  }, { passive: false });

  let pinch = null;
  stage.addEventListener('touchstart', (ev) => {
    if (ev.touches.length !== 2) return;
    const [a, b] = ev.touches;
    pinch = { d: Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY), k: cam.k };
  }, { passive: true });
  stage.addEventListener('touchmove', (ev) => {
    if (!pinch || ev.touches.length !== 2) return;
    ev.preventDefault();
    const [a, b] = ev.touches;
    const d = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
    const r = stage.getBoundingClientRect();
    zoomAt((a.clientX + b.clientX) / 2 - r.left, (a.clientY + b.clientY) / 2 - r.top, pinch.k * (d / pinch.d));
  }, { passive: false });
  stage.addEventListener('touchend', () => { pinch = null; });

  stage.addEventListener('keydown', (ev) => {
    const P = 70;
    const map = { ArrowLeft: [P, 0], ArrowRight: [-P, 0], ArrowUp: [0, P], ArrowDown: [0, -P] };
    if (map[ev.key]) { ev.preventDefault(); setCam(cam.x + map[ev.key][0], cam.y + map[ev.key][1], cam.k); return; }
    if (ev.key === '+' || ev.key === '=') { ev.preventDefault(); zoomCentre(1.28); }
    else if (ev.key === '-') { ev.preventDefault(); zoomCentre(1 / 1.28); }
    else if (ev.key === '0') { ev.preventDefault(); fit(); }
    else if (ev.key === 'Escape') { closeCard(); stopPlay(); setStep(0); }
  });

  /* Fullscreen: nothing outside the fullscreen element is reachable, so every
     control has to move inside it and come home on exit. The scrubber must come
     too — stepping through the flow is the whole reason to go fullscreen. */
  const DOCK = ['#scenbar', '#ctlbar', '#scrub', '#narr'].map((s) => {
    const el = document.querySelector(s);
    return el ? { el, home: el.parentNode, after: el.nextSibling } : null;
  }).filter(Boolean);
  $('b-full').addEventListener('click', () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else if (stage.requestFullscreen) stage.requestFullscreen().catch(() => {});
  });
  document.addEventListener('fullscreenchange', () => {
    const on = document.fullscreenElement === stage;
    $('b-full').setAttribute('aria-pressed', String(on));
    $('b-full').textContent = on ? 'Exit full' : 'Fullscreen';
    DOCK.forEach((d) => { if (on) $('fsbar').appendChild(d.el); else d.home.insertBefore(d.el, d.after); });
    setTimeout(() => { sizeStage(); fit(); }, 80);
  });

  /* Stage takes its aspect from the world, so the drawing never floats in a band. */
  const sizeStage = () => {
    if (document.fullscreenElement === stage) return;
    const vw = document.documentElement.clientWidth;
    const sw = stage.clientWidth || vw;
    const ideal = sw * (WH / WW) + 24;
    /* `ideal` is already the height at which the world exactly fills the stage
       at full width, so a floor above it manufactures the dead band it was meant
       to prevent. A wide, flat drawing (a left-to-right pipeline is often 4:1)
       gets a short stage, and that is correct — the floor exists only to keep
       the controls and a card usable, not to reserve space nothing draws in. */
    const h = vw >= 760 ? Math.round(Math.min(760, Math.max(300, ideal)))
                        : Math.round(Math.min(600, Math.max(300, ideal)));
    document.documentElement.style.setProperty('--stage-h', h + 'px');
  };

  let rt = 0;
  window.addEventListener('resize', () => {
    clearTimeout(rt);
    rt = setTimeout(() => { closeCard(); sizeStage(); fit(); }, 140);
  });
  window.addEventListener('beforeprint', () => {
    document.documentElement.style.setProperty('--pk', Math.min(1, 1040 / WW));
  });

  sizeStage();
  fit();
  if (SCENS) setScen(0); else { buildTicks(); setStep(0); }
  /* A wide stencil fitted to a phone is unreadable and still leaves a band top
     and bottom. Open closer than fit so the world overflows both axes and the
     reader pans: legible, and no dead space either. */
  if (document.documentElement.clientWidth < 760) {
    /* Three constraints, and the largest wins: never smaller than fit, never
       below the legibility floor, and never so small that the world stops
       filling the stage vertically. That last term is what a wide flat world
       needs — 0.42 alone leaves a band above and below a 4:1 drawing. */
    const s = stageSize();
    const k = Math.min(MAXK, Math.max(fitK(), 0.42, s.h / WH));
    setCam((s.w - WW * k) / 2, 0, k);
  }

  if (collisions) console.warn('[stencil]', collisions, 'edge(s) fell through to the forced route');
  if (missing.size) console.warn('[stencil] missing icons:', [...missing].join(', '));

  /* Handle for headless verification — check_stencil.js reads this. */
  window.__stencil = {
    WW, WH, wires, routed, collisions, boxes, RECTS, groups: GROUPS,
    missingIcons: () => [...missing],
    fitK, cam: () => cam, setStep, step: () => step, steps: STEPS.length,
    scenarios: SCENS, setScen, scen: () => scen, activeSteps
  };

  if (document.documentElement.dataset.embedded === 'true') {
    const postSize = () => window.parent.postMessage({ type: 'm2m:frame-size', height: document.body.scrollHeight }, '*');
    if ('ResizeObserver' in window) new ResizeObserver(postSize).observe(document.body);
    window.addEventListener('load', postSize);
  }
})();
