/* The Agent Monetization Instrument: core behaviour, then one block per scene. */
(function () {
  const root = document.querySelector('.ami');
  if (!root) return;
  root.classList.add('ami-js');
  const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const READERS = ['owner', 'startup', 'services', 'buyer'];
  const subs = [];
  const store = { get() { try { return localStorage.getItem('ami-reader'); } catch (e) { return null; } }, set(v) { try { localStorage.setItem('ami-reader', v); } catch (e) { /* unavailable */ } } };
  const fromHash = () => { const m = /reader=([a-z]+)/.exec(location.hash); return m && READERS.includes(m[1]) ? m[1] : null; };
  const SRC = (() => { const el = root.querySelector('script[data-ami="sources"]'); try { return el ? JSON.parse(el.textContent) : {}; } catch (e) { return {}; } })();

  const AMI = window.AMI = {
    root, still, reader: '',
    onReader(fn) { subs.push(fn); if (AMI.reader) fn(AMI.reader); },
    setReader(v, opts) {
      if (!READERS.includes(v)) return;
      const first = !AMI.reader;
      AMI.reader = v; root.dataset.reader = v;
      root.querySelectorAll('[data-reader-btn]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.readerBtn === v)));
      if (!(opts && opts.silent)) { store.set(v); try { history.replaceState(null, '', '#reader=' + v); } catch (e) { /* ignore */ } }
      subs.forEach((fn) => fn(v));
      if (first && opts && opts.scroll) { const s = root.querySelector('.ami-scene:not(.ami-gate)'); if (s) requestAnimationFrame(() => s.scrollIntoView({ behavior: still ? 'auto' : 'smooth', block: 'start' })); }
    },
    data(name) { const el = root.querySelector('script[data-ami="' + name + '"]'); return el ? JSON.parse(el.textContent) : null; },
    svg(tag, attrs, parent) { const n = document.createElementNS('http://www.w3.org/2000/svg', tag); for (const k in (attrs || {})) n.setAttribute(k, attrs[k]); if (parent) parent.appendChild(n); return n; },
    el(tag, attrs, parent, text) { const n = document.createElement(tag); for (const k in (attrs || {})) n.setAttribute(k, attrs[k]); if (text != null) n.textContent = text; if (parent) parent.appendChild(n); return n; },
    onResize(el, fn) { let w = 0; const run = () => { const nw = Math.round(el.clientWidth); if (nw && nw !== w) { w = nw; fn(nw); } }; if ('ResizeObserver' in window) new ResizeObserver(run).observe(el); else window.addEventListener('resize', run); run(); },
    usd(v, d) { const a = Math.abs(v); const n = d == null ? 2 : d; return (v < 0 ? '-' : '') + '$' + a.toLocaleString('en-US', { minimumFractionDigits: n, maximumFractionDigits: n }); },
    fill(input) { const min = Number(input.min) || 0, max = Number(input.max) || 100; input.style.setProperty('--fill', ((Number(input.value) - min) / (max - min)) * 100 + '%'); },
  };

  // reader gate
  root.querySelectorAll('[data-reader-btn]').forEach((b) => b.addEventListener('click', () => AMI.setReader(b.dataset.readerBtn, { scroll: true })));
  const init = fromHash() || store.get();
  if (init) AMI.setReader(init, { silent: true });
  window.addEventListener('hashchange', () => { const h = fromHash(); if (h) AMI.setReader(h, { silent: true }); });

  // scenes: reveal and rail
  const scenes = [...root.querySelectorAll('.ami-scene')];
  scenes.forEach((s) => s.querySelectorAll('[data-rise]').forEach((n, i) => n.style.setProperty('--i', i)));
  const rail = root.querySelector('.ami-rail');
  const links = rail ? [...rail.querySelectorAll('a')] : [];
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-in'); e.target.dispatchEvent(new CustomEvent('ami:in')); } }), { threshold: 0, rootMargin: '0px 0px -15% 0px' });
    scenes.forEach((s) => io.observe(s));
    const io2 = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) links.forEach((a) => a.classList.toggle('is-on', a.getAttribute('href') === '#' + e.target.id)); }), { rootMargin: '-45% 0px -45% 0px' });
    scenes.forEach((s) => io2.observe(s));
  } else scenes.forEach((s) => s.classList.add('is-in'));
  setTimeout(() => scenes.forEach((s) => { const r = s.getBoundingClientRect(); if (r.top < innerHeight && r.bottom > 0) s.classList.add('is-in'); }), 1200);

  // range fills
  root.querySelectorAll('input[type="range"]').forEach((i) => { AMI.fill(i); i.addEventListener('input', () => AMI.fill(i)); });

  // evidence chips: <button class="ami-chip" data-src="G#38" data-note="optional caveat">
  let card = null, owner = null;
  const close = (refocus) => { const o = owner; if (card) { card.remove(); card = null; } if (o) { o.setAttribute('aria-expanded', 'false'); owner = null; if (refocus) o.focus(); } };
  const open = (chip, byKey) => {
    close();
    const ids = (chip.dataset.src || '').split(/[\s,]+/).filter(Boolean);
    card = AMI.el('div', { class: 'ami-card', role: 'dialog', 'aria-label': 'Source' }, root);
    const srcs = []; const seenU = new Set();
    ids.forEach((id) => { const s = SRC[id]; if (!s || seenU.has(s.u)) return; seenU.add(s.u); srcs.push(s); });
    const pubs = [...new Set(srcs.map((s) => s.p))];
    AMI.el('strong', null, card, !srcs.length ? 'Source' : pubs.length === 1 ? pubs[0] : srcs.length + ' sources');
    if (pubs.length === 1 && srcs[0].i) AMI.el('em', null, card, 'Interest: ' + srcs[0].i);
    if (pubs.length > 1) { const seenP = new Set(); srcs.forEach((s) => { if (s.i && !seenP.has(s.p)) { seenP.add(s.p); AMI.el('em', null, card, s.p + ': ' + s.i); } }); }
    if (chip.dataset.note) AMI.el('span', null, card, chip.dataset.note);
    srcs.forEach((s, n) => { const a = AMI.el('a', { href: s.u, rel: 'noopener', target: '_blank' }, card, pubs.length > 1 ? s.p : srcs.length > 1 ? 'Source ' + (n + 1) : 'Open source'); a.setAttribute('aria-label', 'Open source: ' + s.p); });
    const r = chip.getBoundingClientRect(), rr = root.getBoundingClientRect();
    let x = r.left - rr.left; const w = card.offsetWidth; if (x + w > rr.width) x = Math.max(0, rr.width - w);
    card.style.left = x + 'px'; card.style.top = (r.bottom - rr.top + 8) + 'px';
    owner = chip; chip.setAttribute('aria-expanded', 'true');
    const link = card.querySelector('a'); if (byKey && link) link.focus();
    card.addEventListener('focusout', (e) => { if (card && !card.contains(e.relatedTarget)) close(e.relatedTarget === null || e.relatedTarget === document.body ? false : true); });
  };
  if (getComputedStyle(root).position === 'static') root.style.position = 'relative';
  root.addEventListener('click', (e) => { const c = e.target.closest('.ami-chip'); if (c) { e.preventDefault(); if (owner === c) close(); else open(c, e.detail === 0); } else if (!e.target.closest('.ami-card')) close(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && card) close(true); });
  root.querySelectorAll('.ami-chip').forEach((c) => { c.setAttribute('type', 'button'); c.setAttribute('aria-expanded', 'false'); c.setAttribute('aria-haspopup', 'dialog'); });

  // segmented toggle: <div class="ami-seg" data-key="k"><button data-val="v">. Sets data-<key> on the closest [data-host] or scene.
  root.querySelectorAll('.ami-seg[data-key]').forEach((seg) => {
    const host = seg.closest('[data-host]') || seg.closest('.ami-scene') || root; const key = seg.dataset.key;
    const set = (v) => { host.setAttribute('data-' + key, v); seg.querySelectorAll('button[data-val]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.val === v))); host.dispatchEvent(new CustomEvent('ami:set', { detail: { key, value: v } })); };
    seg.querySelectorAll('button[data-val]').forEach((b) => b.addEventListener('click', () => set(b.dataset.val)));
    const f = seg.querySelector('button[aria-pressed="true"]') || seg.querySelector('button[data-val]'); if (f) set(f.dataset.val);
  });
})();

/* s1: Is the claim true? Three parts, one chart area, a verdict stamp per part. */
(function () {
  const AMI = window.AMI; if (!AMI) return; const root = AMI.root;
  const scene = root.querySelector('.ami-s1-scene'); if (!scene) return;
  const stage = scene.querySelector('.ami-stage');
  const parts = [...scene.querySelectorAll('[data-s1-part]')];
  const panels = [...scene.querySelectorAll('[data-s1-panel]')];
  const nextBtn = scene.querySelector('[data-s1-next]');
  const status = scene.querySelector('[data-s1-status]');
  if (!stage || parts.length !== 3 || panels.length !== 3) return;
  const read = (name) => { try { return AMI.data(name); } catch (e) { return null; } };
  const still = !!AMI.still;

  let active = 0, auto = false, started = false;
  const timers = new Set();
  const later = (fn, ms) => { const t = setTimeout(() => { timers.delete(t); fn(); }, ms); timers.add(t); return t; };
  const clearTimers = () => { timers.forEach(clearTimeout); timers.clear(); };
  const verdict = (n) => { const s = panels[n].querySelector('.ami-stamp'); return s ? s.textContent.trim() : ''; };

  /* ---------- part 1: profit by firm type ---------- */
  const profit = read('s1-profit');
  const years = profit && Array.isArray(profit.years) ? profit.years : [];
  const chart = scene.querySelector('[data-s1-chart]');
  const range = scene.querySelector('[data-s1-year]');
  const playBtn = scene.querySelector('[data-s1-play]');
  const outT = scene.querySelector('[data-s1-out="t"]');
  const outS = scene.querySelector('[data-s1-out="s"]');
  const roS = scene.querySelector('[data-s1-g="s"]');
  const sLabel = scene.querySelector('[data-s1-slabel]');
  const flagFirms = scene.querySelector('[data-s1-firms]');
  const flagLoss = scene.querySelector('[data-s1-loss]');
  const flagRev = [...scene.querySelectorAll('[data-s1-rev]')];
  const stills = scene.querySelector('[data-s1-stills]');
  const halfNote = scene.querySelector('[data-s1-half]');
  const p1ok = !!(years.length && chart && range && outT && outS);
  const TMAX = years.reduce((m, y) => Math.max(m, Math.abs(y.t.v)), 1);
  let idx = Math.max(0, years.length - 1), playing = false, raf = 0, guard = 0;
  let cur = { t: 0, s: 0 };
  const g = { w: 0, h: 0, base: 0, cxT: 0, cxS: 0, k: 0 };
  let svg = null, cT = null, cS = null, baseLine = null, lead = null, mark = null, scaleTxt = null;
  const zOut = () => scene.getAttribute('data-zillow') === 'out';
  const sDat = (y) => (zOut() ? y.zout : y.zin);
  const sVal = (y) => sDat(y).v;
  const money = (v) => AMI.usd(Math.round(v), 0) + 'M';

  function build() {
    if (!p1ok || svg) return;
    if (stills) stills.remove();
    svg = AMI.svg('svg', { class: 'ami-s1-svg', 'aria-hidden': 'true', focusable: 'false' }, chart);
    const defs = AMI.svg('defs', null, svg);
    [['t', 'ami-s1-ht'], ['s', 'ami-s1-hs']].forEach((p) => {
      const pat = AMI.svg('pattern', { id: 'ami-s1-hatch-' + p[0], width: 9, height: 9, patternUnits: 'userSpaceOnUse', patternTransform: 'rotate(45)' }, defs);
      AMI.svg('path', { class: p[1], d: 'M0 0V9' }, pat);
    });
    baseLine = AMI.svg('path', { class: 'ami-s1-base' }, svg);
    cT = AMI.svg('circle', { class: 'ami-s1-ct' }, svg);
    lead = AMI.svg('path', { class: 'ami-s1-lead' }, svg);
    cS = AMI.svg('circle', { class: 'ami-s1-cs' }, svg);
    mark = AMI.svg('text', { class: 'ami-s1-mark', 'text-anchor': 'middle' }, svg);
    scaleTxt = AMI.svg('text', { class: 'ami-s1-scale', 'text-anchor': 'start' }, svg);
    scaleTxt.textContent = 'Area to scale';
  }
  function size(w) {
    if (!svg) return;
    g.w = w; g.h = Math.round(Math.max(200, Math.min(330, w * 0.52)));
    g.base = g.h - 8; g.cxT = w * (1.3 / 2.3) / 2; g.cxS = w * (1.3 / 2.3 + (1 / 2.3) / 2);
    const rmax = Math.min((g.h - 30) / 2, g.cxT - 4, w * 0.27);
    g.k = rmax / Math.sqrt(TMAX);
    svg.setAttribute('viewBox', '0 0 ' + w + ' ' + g.h); svg.setAttribute('height', g.h);
    baseLine.setAttribute('d', 'M0 ' + g.base + 'H' + w);
    scaleTxt.setAttribute('x', 0); scaleTxt.setAttribute('y', 14);
    paint();
  }
  function paint() {
    if (!svg || !g.w) return;
    const y = years[idx];
    const rT = Math.max(1.5, g.k * Math.sqrt(Math.abs(cur.t)));
    const rS = Math.max(2.5, g.k * Math.sqrt(Math.abs(cur.s)));
    cT.setAttribute('cx', g.cxT); cT.setAttribute('cy', g.base - rT); cT.setAttribute('r', rT);
    cS.setAttribute('cx', g.cxS); cS.setAttribute('cy', g.base - rS); cS.setAttribute('r', rS);
    const loss = cur.s < 0;
    svg.classList.toggle('is-loss', loss); svg.classList.toggle('is-half', !!y.half);
    cT.style.fill = y.half ? 'url(#ami-s1-hatch-t)' : '';
    cS.style.fill = y.half && !loss ? 'url(#ami-s1-hatch-s)' : '';
    const top = g.base - rS * 2;
    const my = Math.max(26, Math.min(top - 22, g.base - 70));
    lead.setAttribute('d', 'M' + g.cxS + ' ' + (top - 4) + 'V' + (my + 6));
    mark.setAttribute('x', g.cxS); mark.setAttribute('y', my);
    mark.textContent = loss ? 'Loss  −' : 'Profit  +';
    outT.textContent = money(cur.t); outS.textContent = money(cur.s);
    if (roS) roS.classList.toggle('is-loss', loss);
    if (flagLoss) flagLoss.classList.toggle('is-off', !loss);
  }
  function meta() {
    const y = years[idx]; const out = zOut();
    range.value = String(idx); AMI.fill(range);
    const sv = sVal(y);
    range.setAttribute('aria-valuetext', y.say + '. Transaction firms ' + money(y.t.v) + (y.flagSay ? ', ' + y.flagSay : '') + '. Software vendors ' + money(sv) + (out ? ', without Zillow' : '') + '.');
    outT.setAttribute('data-src', y.t.src.join(' ')); outT.setAttribute('data-note', y.t.note);
    outS.setAttribute('data-src', sDat(y).src.join(' ')); outS.setAttribute('data-note', sDat(y).note);
    if (sLabel) sLabel.textContent = out ? 'Three vendors, Zillow out' : 'Four property software vendors';
    if (flagFirms) { flagFirms.classList.toggle('is-off', !y.flag); if (y.flag) flagFirms.textContent = y.flag; }
    flagRev.forEach((f) => f.classList.toggle('is-off', !y.rev));
    if (halfNote) halfNote.hidden = !y.half;
  }
  function go(i, cb, instant) {
    if (!p1ok) { if (cb) cb(); return; }
    idx = Math.max(0, Math.min(years.length - 1, i));
    const y = years[idx]; const to = { t: y.t.v, s: sVal(y) }; const from = { t: cur.t, s: cur.s };
    cancelAnimationFrame(raf); clearTimeout(guard); meta();
    if (still || instant || !g.w) { cur = to; paint(); if (cb) cb(); return; }
    const t0 = performance.now(), dur = 700; let ended = false;
    const end = () => { if (ended) return; ended = true; clearTimeout(guard); cancelAnimationFrame(raf); cur = to; paint(); if (cb) cb(); };
    const step = (now) => {
      if (ended) return;
      const p = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - p, 3);
      cur = { t: from.t + (to.t - from.t) * e, s: from.s + (to.s - from.s) * e };
      paint();
      if (p < 1) raf = requestAnimationFrame(step); else end();
    };
    clearTimeout(guard); guard = setTimeout(end, dur + 350);
    raf = requestAnimationFrame(step);
  }
  function setPlaying(v) { playing = v; if (playBtn) { playBtn.classList.toggle('is-playing', v); playBtn.textContent = v ? 'Pause' : 'Play'; } }
  function stopPlay() { if (!playing) return; setPlaying(false); clearTimers(); }
  function play(cb) {
    if (!p1ok) { if (cb) cb(); return; }
    clearTimers(); setPlaying(true);
    panels[0].classList.remove('is-done');
    const run = (i) => go(i, () => {
      if (!playing) return;
      if (i >= years.length - 1) { setPlaying(false); if (cb) cb(); return; }
      later(() => { if (playing) run(i + 1); }, 520);
    }, false);
    cur = { t: 0, s: 0 }; run(0);
  }
  if (p1ok) {
    build(); cur = { t: years[idx].t.v, s: sVal(years[idx]) }; meta();
    AMI.onResize(chart, size);
    range.addEventListener('input', () => { auto = false; stopPlay(); go(Number(range.value), () => finish(0)); });
    if (playBtn) playBtn.addEventListener('click', () => { auto = false; if (playing) { stopPlay(); finish(0); } else play(() => finish(0)); });
    scene.addEventListener('ami:set', (e) => { if (e.detail && e.detail.key === 'zillow') { if (playing) { meta(); return; } go(idx, () => { if (active === 0 && started) finish(0); }); } });
  }

  /* ---------- part 3: access charges ---------- */
  const access = read('s1-access') || [];
  const detail = scene.querySelector('[data-s1-detail]');
  const owns = [...scene.querySelectorAll('[data-s1-own]')];
  let picked = false;
  function pick(id) {
    const d = access.find((a) => a.id === id); if (!d || !detail) return;
    owns.forEach((b) => b.setAttribute('aria-pressed', String(b.getAttribute('data-s1-own') === id)));
    detail.textContent = '';
    AMI.el('p', { class: 'ami-cap' }, detail, d.name).style.display = 'block';
    d.rows.forEach((r) => {
      const p = AMI.el('p', null, detail);
      AMI.el('span', { class: 'ami-label' }, p, r.k);
      AMI.el('button', { type: 'button', class: 'ami-chip', 'data-src': r.src.join(' '), 'aria-expanded': 'false' }, p, r.t);
    });
    if (!still) { detail.classList.remove('is-swap'); void detail.offsetWidth; detail.classList.add('is-swap'); }
  }
  owns.forEach((b) => b.addEventListener('click', () => { picked = true; pick(b.getAttribute('data-s1-own')); }));
  if (access.length) pick('servicenow');

  /* ---------- parts, stamps, auto-advance ---------- */
  function finish(n) {
    panels[n].classList.add('is-done'); parts[n].classList.add('is-done');
    if (status && n === active) status.textContent = 'Part ' + (n + 1) + ' verdict: ' + verdict(n) + '.';
    if (auto && n === active) { if (n < 2) later(() => { if (auto) show(n + 1, true); }, 1900); else auto = false; }
  }
  function show(n, isAuto) {
    clearTimers(); if (playing) setPlaying(false);
    active = n; started = true;
    parts.forEach((b, i) => b.setAttribute('aria-pressed', String(i === n)));
    panels.forEach((p, i) => p.classList.toggle('is-on', i === n));
    const p = panels[n];
    if (still) { p.classList.remove('is-run'); if (n === 0) go(idx, null, true); finish(n); return; }
    p.classList.remove('is-done', 'is-run'); void p.offsetWidth; p.classList.add('is-run');
    if (n === 0) {
      if (isAuto) play(() => finish(0)); else { cur = { t: 0, s: 0 }; go(idx, () => later(() => finish(0), 150)); }
    } else later(() => finish(n), n === 1 ? 1700 : 1500);
  }
  parts.forEach((b, i) => b.addEventListener('click', () => { auto = false; show(i, false); }));
  if (nextBtn) nextBtn.addEventListener('click', () => { auto = false; show((active + 1) % 3, false); });
  const touch = (e) => { if (!e.isTrusted || !auto) return; auto = false; if (playing) return; clearTimers(); finish(active); };
  stage.addEventListener('pointerdown', touch, true);
  stage.addEventListener('keydown', touch, true);

  function start() {
    if (started) return; started = true;
    if (still) { panels.forEach((p, i) => { p.classList.add('is-done'); parts[i].classList.add('is-done'); }); if (status) status.textContent = 'Part 1: ' + verdict(0) + '. Part 2: ' + verdict(1) + '. Part 3: ' + verdict(2) + '.'; return; }
    auto = true; show(0, true);
  }
  if (still) start();
  else {
    scene.addEventListener('ami:in', start, { once: true });
    if (scene.classList.contains('is-in')) start();
    setTimeout(() => { if (scene.classList.contains('is-in')) start(); }, 1600);
  }

  /* ---------- reader ---------- */
  const you = scene.querySelector('[data-s1-you]');
  const FIRST = { owner: 'atlassian', buyer: 'salesforce', startup: 'salesforce', services: 'servicenow' };
  AMI.onReader((r) => {
    if (!picked && access.length && FIRST[r]) pick(FIRST[r]);
    if (you && !still) { you.classList.remove('is-swap'); void you.offsetWidth; you.classList.add('is-swap'); }
  });
})();

/* Scene 2: what one unit earns. A money-flow diagram drawn at container width, with sliders as the accessible path. */
(function () { const AMI = window.AMI; if (!AMI) return; const root = AMI.root;
  const K13 = 13;
  const r6 = (x) => Math.round(x * 1e6) / 1e6;
  // One failed attempt costs the model cost and earns nothing, so model cost per billed unit is c / (1 - f).
  const math = (v, mult) => {
    const k = mult == null ? 1 : mult;
    const f = Math.min(Math.max(v.f, 0), 90) / 100;
    const model = v.c * k;
    const unbilled = model / (1 - f) - model;
    const review = (v.h / 100) * v.r;
    const access = v.t;
    const cost = model + unbilled + review + access;
    const unit = r6(v.p - cost);
    const heavyCost = (K13 * v.c) / (1 - f) + review + access;
    const heavyUnit = r6(v.p - heavyCost);
    return { model, unbilled, review, access, cost, unit, loss: unit < 0, margin: v.p > 0 ? unit / v.p : null, profit: unit * v.n, heavyCost, heavy: v.p > 0 ? heavyUnit / v.p : null };
  };
  AMI.unitMath = math;
  const scene = root.querySelector('.ami-s2-scene'); if (!scene) return;
  const stage = scene.querySelector('.ami-s2-stage'); const host = scene.querySelector('[data-flow]');
  if (!stage || !host) return;
  const KEYS = ['p', 'c', 'h', 'r', 't', 'f', 'n'];
  const DEF = { p: 0.99, c: 0.44, h: 5, r: 3, t: 0, f: 24, n: 50000 };
  const rng = {}, num = {};
  KEYS.forEach((k) => { rng[k] = scene.querySelector('[data-in="' + k + '"]'); num[k] = scene.querySelector('[data-num="' + k + '"]'); });
  if (KEYS.some((k) => !rng[k])) return;
  const usd = AMI.usd;
  // A value under one cent prints three decimals, so a visible ribbon never reads as $0.00.
  const usx = (x) => usd(x, x !== 0 && Math.abs(x) < 0.01 ? 3 : 2);
  // Shares of price as whole percentages that add up to 100 when there is no loss (largest remainder).
  const shares = (vals, p, loss) => {
    if (!(p > 0)) return vals.map(() => 'n/a');
    const raw = vals.map((x) => (x / p) * 100);
    if (loss) return raw.map((x) => Math.round(x) + '%');
    const fl = raw.map((x) => Math.floor(x + 1e-9));
    let rem = Math.min(Math.max(100 - fl.reduce((a, b) => a + b, 0), 0), vals.length);
    raw.map((x, i) => [x - fl[i], i]).sort((a, b) => b[0] - a[0]).forEach((o) => { if (rem > 0 && o[0] > 1e-9) { fl[o[1]] += 1; rem -= 1; } });
    return fl.map((x) => x + '%');
  };
  const pct = (x) => (x == null || !isFinite(x) ? 'n/a' : String(Math.round(x * 100) || 0) + '%');
  const lim = (k) => [Number(rng[k].min) || 0, Number(rng[k].max) || 0, Number(rng[k].step) || 1];
  const val = (k) => { const x = parseFloat(rng[k].value); const l = lim(k); return isFinite(x) ? Math.min(Math.max(x, l[0]), l[1]) : DEF[k]; };
  const read = () => { const v = {}; KEYS.forEach((k) => { v[k] = val(k); }); return v; };
  const vtext = (k, x) => (k === 'h' || k === 'f' ? x + ' percent' : k === 'n' ? x.toLocaleString('en-US') + ' units' : usd(x));
  const out = (k) => scene.querySelector('[data-out="' + k + '"]');
  const sum = scene.querySelector('[data-sum]');
  let who = 'Seller', rev = 'Human review';

  const ICON = {
    buyer: '<rect x="14" y="28" width="52" height="36" rx="6"/><path d="M30 28v-8a4 4 0 0 1 4-4h12a4 4 0 0 1 4 4v8M14 44h52M36 44v7h8v-7"/>',
    model: '<rect x="22" y="22" width="36" height="36" rx="6"/><rect x="33" y="33" width="14" height="14" rx="2"/><path d="M31 22v-9M40 22v-9M49 22v-9M31 67v-9M40 67v-9M49 67v-9M22 31h-9M22 40h-9M22 49h-9M67 31h-9M67 40h-9M67 49h-9"/>',
    fail: '<path d="M62 40a22 22 0 1 1-7-16"/><path d="M56 12v13H43"/><path d="M32 32l16 16M48 32L32 48"/>',
    review: '<circle cx="31" cy="25" r="10"/><path d="M11 64c0-12 9-20 20-20 6 0 11 2 15 6"/><path d="M46 58l8 8 15-17"/>',
    access: '<ellipse cx="40" cy="20" rx="24" ry="9"/><path d="M16 20v20c0 5 11 9 24 9s24-4 24-9V20"/><path d="M16 40v20c0 5 11 9 24 9s24-4 24-9V40"/>',
    seller: '<path d="M14 34l6-18h40l6 18"/><path d="M14 34c0 5 4 8 8.7 8s8.6-3 8.6-8c0 5 4 8 8.7 8s8.6-3 8.6-8c0 5 4 8 8.7 8S66 39 66 34"/><path d="M20 42v24h40V42"/><rect x="34" y="50" width="12" height="16"/>',
  };
  const NODES = [
    { k: 'model', m: 'model', t: 'Model cost', to: 'model provider', ico: 'model', h: 'c', per: 0.0075 },
    { k: 'unbilled', m: 'fail', t: 'Failed attempts', to: 'not billed', ico: 'fail', h: 'f', per: 0.3 },
    { k: 'review', m: 'review', t: 'Human review', to: 'reviewer', ico: 'review', h: 'h', per: 0.33 },
    { k: 'access', m: 'access', t: 'Access charge', to: 'record owner', ico: 'access', h: 't', per: 0.0033 },
    { k: 'margin', m: 'margin', t: 'Margin', to: 'keeps', ico: 'seller' },
  ];

  // input plumbing
  const setVal = (k, x, from) => {
    if (!isFinite(x)) return;
    const l = lim(k);
    const dec = (String(l[2]).split('.')[1] || '').length;
    const y = Math.min(Math.max(Math.round(x / l[2]) * l[2], l[0]), l[1]);
    rng[k].value = y.toFixed(dec);
    AMI.fill(rng[k]);
    if (num[k] && from !== 'num') num[k].value = String(Number(rng[k].value));
    paint();
  };
  KEYS.forEach((k) => {
    rng[k].addEventListener('input', () => { if (num[k]) num[k].value = String(Number(rng[k].value)); paint(); });
    if (!num[k]) return;
    // A cleared or unreadable field keeps the last good value. The clamped value is written back on change.
    num[k].addEventListener('input', () => { const x = parseFloat(num[k].value); if (isFinite(x)) setVal(k, x, 'num'); });
    const back = () => { num[k].value = String(val(k)); };
    num[k].addEventListener('change', back); num[k].addEventListener('blur', back);
  });

  // multiplier on model cost: heavy toggle, or one measured spread applied for a moment
  let mult = 1, raf = 0, hold = 0, active = null, heavyOn = false;
  const base = () => (heavyOn ? K13 : 1);
  const inOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const go = (to, ms, ease, done) => {
    cancelAnimationFrame(raf);
    if (AMI.still || !ms) { mult = to; paint(); if (done) done(); return; }
    const a = Math.log(mult), b = Math.log(to), t0 = performance.now();
    const step = (now) => {
      const t = Math.min(1, (now - t0) / ms);
      mult = t < 1 ? Math.exp(a + (b - a) * ease(t)) : to;
      paint();
      if (t < 1) raf = requestAnimationFrame(step); else if (done) done();
    };
    raf = requestAnimationFrame(step);
  };
  const release = () => {
    clearTimeout(hold);
    if (active) active.setAttribute('aria-pressed', 'false');
    active = null;
    go(base(), 800, inOut);
  };
  scene.querySelectorAll('[data-spread]').forEach((b) => b.addEventListener('click', () => {
    if (active === b) { release(); return; }
    clearTimeout(hold);
    if (active) active.setAttribute('aria-pressed', 'false');
    active = b; b.setAttribute('aria-pressed', 'true');
    const k = parseFloat(b.dataset.spread) || 1;
    // With reduced motion the spread stays on until pressed again, so nothing changes on a timer.
    go(k, 700, inOut, () => { if (!AMI.still) hold = setTimeout(release, 2600); });
  }));
  // phone: the seven sliders open and close as one group
  const adj = scene.querySelector('[data-adj]');
  if (adj) adj.addEventListener('click', () => { const on = stage.dataset.adj !== 'open'; stage.dataset.adj = on ? 'open' : 'closed'; adj.setAttribute('aria-expanded', String(on)); });
  const heavyBtn = scene.querySelector('[data-heavy]');
  // The page opens at 24% of attempts not billed (Intercom says 76% resolved). The preset sets zero. Pressing again returns to 24.
  const preBtn = scene.querySelector('[data-preset]');
  const preVal = preBtn ? parseFloat(preBtn.dataset.preset) || 0 : 0;
  if (preBtn) preBtn.addEventListener('click', () => setVal('f', val('f') === preVal ? DEF.f : preVal));
  if (heavyBtn) heavyBtn.addEventListener('click', () => {
    heavyOn = !heavyOn; heavyBtn.setAttribute('aria-pressed', String(heavyOn));
    if (!active) go(base(), 600, inOut);
  });

  // diagram
  let G = null, E = null, lastLoss = false, sumTimer = 0, runTimer = 0;
  // The flow marks move for a few seconds after a change, then rest. Nothing loops without end.
  const run = () => { if (AMI.still || !E) return; E.svg.classList.add('is-run'); clearTimeout(runTimer); runTimer = setTimeout(() => { if (E) E.svg.classList.remove('is-run'); }, 4200); };
  const f1 = (x) => Math.round(x * 10) / 10;
  const rib = (xa, a0, a1, xb, b0, b1) => { const mx = f1((xa + xb) / 2); return 'M' + xa + ',' + f1(a0) + 'C' + mx + ',' + f1(a0) + ' ' + mx + ',' + f1(b0) + ' ' + xb + ',' + f1(b0) + 'L' + xb + ',' + f1(b1) + 'C' + mx + ',' + f1(b1) + ' ' + mx + ',' + f1(a1) + ' ' + xa + ',' + f1(a1) + 'Z'; };
  const mid = (xa, ya, xb, yb) => { const mx = f1((xa + xb) / 2); return 'M' + xa + ',' + f1(ya) + 'C' + mx + ',' + f1(ya) + ' ' + mx + ',' + f1(yb) + ' ' + xb + ',' + f1(yb); };
  const show = (el, on) => { el.style.display = on ? '' : 'none'; };
  const icon = (name, parent) => { const g = AMI.svg('g', { class: 'ami-s2-ico' }, parent); g.innerHTML = ICON[name]; return g; };
  const handle = (parent, k, per, m) => {
    const g = AMI.svg('g', { class: 'ami-s2-h', 'data-m': m, 'aria-hidden': 'true' }, parent);
    AMI.svg('circle', { r: 22, class: 'ami-s2-hit' }, g); AMI.svg('circle', { r: 9, class: 'ami-s2-knob' }, g);
    g.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      const y0 = e.clientY, v0 = val(k);
      try { g.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }
      g.classList.add('is-drag');
      const mv = (ev) => setVal(k, v0 + (y0 - ev.clientY) * per);
      const up = () => { g.removeEventListener('pointermove', mv); g.removeEventListener('pointerup', up); g.removeEventListener('pointercancel', up); g.classList.remove('is-drag'); };
      g.addEventListener('pointermove', mv); g.addEventListener('pointerup', up); g.addEventListener('pointercancel', up);
    });
    return g;
  };
  const block = (parent, m, name) => {
    const g = AMI.svg('g', { class: 'ami-s2-blk', 'data-m': m }, parent);
    return { g, ico: icon(name, g), t1: AMI.svg('text', { class: 'ami-s2-t1' }, g), t2: AMI.svg('text', { class: 'ami-s2-t2' }, g) };
  };
  const build = (w) => {
    host.textContent = '';
    const compact = w < 640;
    // On a narrow screen the buyer block sits in the free corner above the ribbons, and the seller block in the corner below.
    G = compact ? { w, compact, x0: 12, bw: 10, x1: w - 126, Hf: 150, minH: 116, gap: 6, top: 8 } : { w, compact, x0: 150, bw: 12, x1: w - 270, Hf: 190, minH: 84, gap: 6, top: 8 };
    G.availH = 4 * G.minH + G.Hf + 4 * G.gap; G.H = G.top + G.availH + 8;
    const svg = AMI.svg('svg', { viewBox: '0 0 ' + w + ' ' + G.H, width: w, height: G.H, role: 'img', class: 'ami-s2-svg' + (compact ? ' is-compact' : '') }, host);
    const defs = AMI.svg('defs', null, svg);
    const pat = AMI.svg('pattern', { id: 'ami-s2-hatch', width: 8, height: 8, patternUnits: 'userSpaceOnUse', patternTransform: 'rotate(45)' }, defs);
    AMI.svg('rect', { width: 8, height: 8, class: 'ami-s2-hbg' }, pat); AMI.svg('line', { x1: 0, y1: 0, x2: 0, y2: 8, class: 'ami-s2-hln' }, pat);
    const gF = AMI.svg('g', { class: 'ami-s2-flows' }, svg), gN = AMI.svg('g', null, svg), gH = AMI.svg('g', null, svg);
    E = { svg, nodes: [] };
    NODES.forEach((n, i) => {
      const o = { n };
      o.ghost = AMI.svg('path', { class: 'ami-s2-ghost' }, gF);
      o.rib = AMI.svg('path', { class: 'ami-s2-rib', 'data-m': n.m }, gF);
      o.dash = AMI.svg('path', { class: 'ami-s2-dash' }, gF);
      if (i < 4) { o.loss = AMI.svg('path', { class: 'ami-s2-lossrib', fill: 'url(#ami-s2-hatch)' }, gF); o.ldash = AMI.svg('path', { class: 'ami-s2-dash' }, gF); }
      o.g = AMI.svg('g', { class: 'ami-s2-node', 'data-m': n.m }, gN);
      o.bar = AMI.svg('rect', { class: 'ami-s2-bar', x: G.x1, width: G.bw, rx: 3 }, o.g);
      o.ico = icon(n.ico, o.g);
      o.t1 = AMI.svg('text', { class: 'ami-s2-t1' }, o.g); o.t2 = AMI.svg('text', { class: 'ami-s2-t2' }, o.g); o.t3 = AMI.svg('text', { class: 'ami-s2-t3' }, o.g);
      if (compact) { o.t1.setAttribute('text-anchor', 'middle'); o.t2.setAttribute('text-anchor', 'middle'); }
      if (n.h) o.h = handle(gH, n.h, n.per, n.m);
      E.nodes.push(o);
    });
    E.bBar = AMI.svg('rect', { class: 'ami-s2-bar', 'data-m': 'price', x: G.x0, width: G.bw, rx: 3 }, gN);
    E.sBar = AMI.svg('rect', { class: 'ami-s2-bar', 'data-m': 'fail', x: G.x0, width: G.bw, rx: 3 }, gN);
    E.buyer = block(gN, 'price', 'buyer'); E.seller = block(gN, 'fail', 'seller');
    if (!compact) [E.buyer, E.seller].forEach((b) => { b.t1.setAttribute('text-anchor', 'end'); b.t2.setAttribute('text-anchor', 'end'); });
    E.hp = handle(gH, 'p', 0.0125, 'price');
    paint();
  };
  const place = (b, x, y, compact) => {
    if (compact) { b.ico.setAttribute('transform', 'translate(' + x + ',' + y + ')'); b.t1.setAttribute('x', x); b.t1.setAttribute('y', y + 98); b.t2.setAttribute('x', x); b.t2.setAttribute('y', y + 117); return; }
    b.ico.setAttribute('transform', 'translate(' + (x - 80) + ',' + f1(y - 65) + ')');
    b.t1.setAttribute('x', x); b.t1.setAttribute('y', f1(y + 33)); b.t2.setAttribute('x', x); b.t2.setAttribute('y', f1(y + 57));
  };
  const draw = (v, m) => {
    const scale = Math.max(v.p, m.cost, 1e-9), s = G.Hf / scale;
    const lossAmt = Math.max(-m.unit, 0);
    const vals = [m.model, m.unbilled, m.review, m.access, Math.max(m.unit, 0)];
    const ths = vals.map((x) => x * s);
    const shr = shares(vals, v.p, m.loss);
    const slots = ths.map((t) => Math.max(t, G.minH));
    const bshare = m.loss ? (m.cost > 0 ? v.p / m.cost : 0) : 1;
    const cy = G.top + G.availH / 2;
    const lt = (v.p + lossAmt) * s;
    const bTop = cy - lt / 2, sTop = bTop + v.p * s;
    const xa = G.x0 + G.bw, xb = G.x1;
    let y = G.top + (G.availH - (slots.reduce((a, b) => a + b, 0) + 4 * G.gap)) / 2, by = bTop, sy = sTop;
    E.nodes.forEach((o, i) => {
      const th = ths[i], c = y + slots[i] / 2, r0 = c - th / 2;
      const bp = i < 4 ? th * bshare : th, sp = th - bp;
      show(o.rib, bp >= 0.4); if (bp >= 0.4) o.rib.setAttribute('d', rib(xa, by, by + bp, xb, r0, r0 + bp));
      show(o.dash, bp >= 3); if (bp >= 3) { o.dash.setAttribute('d', mid(xa, by + bp / 2, xb, r0 + bp / 2)); o.dash.setAttribute('stroke-width', f1(Math.min(Math.max(bp * 0.3, 1.5), 6))); }
      show(o.ghost, th < 0.4); if (th < 0.4) o.ghost.setAttribute('d', mid(xa, i < 4 ? by : Math.min(by, sTop), xb, c));
      if (o.loss) {
        show(o.loss, sp >= 0.4); if (sp >= 0.4) o.loss.setAttribute('d', rib(xa, sy, sy + sp, xb, r0 + bp, r0 + th));
        show(o.ldash, sp >= 3); if (sp >= 3) { o.ldash.setAttribute('d', mid(xa, sy + sp / 2, xb, r0 + bp + sp / 2)); o.ldash.setAttribute('stroke-width', f1(Math.min(Math.max(sp * 0.3, 1.5), 6))); }
      }
      o.bar.setAttribute('y', f1(Math.min(r0, c - 1))); o.bar.setAttribute('height', f1(Math.max(th, 2)));
      const money = usx(vals[i]), share = shr[i];
      const none = i === 4 && m.loss;
      o.g.setAttribute('data-zero', String(vals[i] < 0.00005));
      if (G.compact) {
        const ix = G.w - 98;
        o.ico.setAttribute('transform', 'translate(' + ix + ',' + f1(c - 56) + ')');
        o.t1.setAttribute('x', ix + 40); o.t1.setAttribute('y', f1(c + 39)); o.t2.setAttribute('x', ix + 40); o.t2.setAttribute('y', f1(c + 56));
        o.t1.textContent = none ? 'No margin' : (o.n.k === 'review' ? rev : o.n.t); o.t2.textContent = money + ' · ' + share; o.t3.textContent = '';
      } else {
        const ix = G.x1 + G.bw + 12, tx = ix + 92;
        o.ico.setAttribute('transform', 'translate(' + ix + ',' + f1(c - 40) + ')');
        o.t1.setAttribute('x', tx); o.t1.setAttribute('y', f1(c - 14)); o.t2.setAttribute('x', tx); o.t2.setAttribute('y', f1(c + 12)); o.t3.setAttribute('x', tx); o.t3.setAttribute('y', f1(c + 31));
        o.t1.textContent = none ? 'No margin' : (o.n.k === 'review' ? rev : o.n.t); o.t2.textContent = money;
        o.t3.textContent = share + ' · ' + (i === 4 ? who.toLowerCase() + ' ' + o.n.to : o.n.k === 'review' && rev !== 'Human review' ? 'your staff' : o.n.to);
      }
      if (o.h) o.h.setAttribute('transform', 'translate(' + f1(G.x1 + G.bw / 2) + ',' + f1(Math.min(r0, c - 1)) + ')');
      by += bp; sy += sp; y += slots[i] + G.gap;
    });
    E.bBar.setAttribute('y', f1(bTop)); E.bBar.setAttribute('height', f1(Math.max(v.p * s, 2)));
    show(E.sBar, m.loss); E.sBar.setAttribute('y', f1(sTop + (v.p * s < 2 ? 2 : 0))); E.sBar.setAttribute('height', f1(Math.max(lossAmt * s, 2)));
    show(E.seller.g, m.loss);
    E.buyer.t1.textContent = 'Buyer pays'; E.buyer.t2.textContent = usd(v.p);
    E.seller.t1.textContent = who + ' pays'; E.seller.t2.textContent = usx(lossAmt);
    if (G.compact) { place(E.buyer, 2, 0, true); place(E.seller, 2, G.H - 124, true); }
    else {
      let bc = bTop + (v.p * s) / 2, sc = sTop + (lossAmt * s) / 2;
      if (m.loss && sc - bc < 140) { const mm = (bc + sc) / 2; bc = mm - 70; sc = mm + 70; }
      place(E.buyer, G.x0 - 14, bc, false); place(E.seller, G.x0 - 14, sc, false);
    }
    E.hp.setAttribute('transform', 'translate(' + f1(G.x0 + G.bw / 2) + ',' + f1(bTop) + ')');
    const t = Math.min(Math.max((Math.log10(v.n) - 3) / (Math.log10(500000) - 3), 0), 1);
    E.svg.style.setProperty('--ami-s2-dur', (3 - 2.5 * t).toFixed(2) + 's');
  };
  const summary = (v, m) => {
    const parts = 'model ' + usx(m.model) + ', failed attempts ' + usx(m.unbilled) + ', ' + rev.toLowerCase() + ' ' + usx(m.review) + ', access ' + usx(m.access);
    // Within one cent of break-even, three decimals keep cost, price and margin from reading as equal.
    const d = m.unit !== 0 && Math.abs(m.unit) < 0.01 ? 3 : 2;
    if (v.p <= 0) return 'No price is set. Cost per unit is ' + usd(m.cost) + ': ' + parts + '.';
    return m.loss
      ? 'Cost of ' + usd(m.cost, d) + ' is above the ' + usd(v.p, d) + ' price. The ' + who.toLowerCase() + ' pays ' + usd(-m.unit, d) + ' on each unit. Costs: ' + parts + '.'
      : 'Of a ' + usd(v.p, d) + ' price, ' + usd(m.cost, d) + ' is cost and ' + usd(m.unit, d) + ' is margin, ' + pct(m.margin) + '. Costs: ' + parts + '.';
  };
  function paint() {
    const v = read(), m = math(v, mult);
    KEYS.forEach((k) => rng[k].setAttribute('aria-valuetext', vtext(k, v[k])));
    const set = (k, text, neg) => { const n = out(k); if (!n) return; n.textContent = text; n.setAttribute('data-neg', String(!!neg)); };
    set('cost', usd(m.cost, m.unit !== 0 && Math.abs(m.unit) < 0.01 ? 3 : 2), false);
    if (preBtn) preBtn.setAttribute('aria-pressed', String(v.f === preVal));
    set('margin', pct(m.margin), m.loss);
    const pr = Math.round(m.profit) || 0;
    set('profit', Math.abs(pr) >= 1e6 ? usd(pr / 1e6, 2) + 'M' : usd(pr, 0), m.loss);
    set('heavy', pct(m.heavy), m.heavy != null && m.heavy < 0);
    stage.setAttribute('data-loss', String(m.loss));
    stage.setAttribute('data-x', mult > 1.0001 ? String(Math.round(mult * 10) / 10) : '1');
    if (m.loss !== lastLoss) { lastLoss = m.loss; if (m.loss && !AMI.still) { stage.classList.remove('is-flip'); void stage.offsetWidth; stage.classList.add('is-flip'); } }
    const text = summary(v, m);
    if (E && G) { draw(v, m); E.svg.setAttribute('aria-label', 'Money flow for one unit. ' + text); run(); }
    if (sum) { clearTimeout(sumTimer); sumTimer = setTimeout(() => { sum.textContent = text; }, 500); }
    scene.dispatchEvent(new CustomEvent('ami:unit', { detail: { v: v, m: m } }));
  }

  // who carries the risk: a judgement strip, never a recommendation
  let models = null; try { models = AMI.data('s2-models'); } catch (e) { models = null; }
  const WORD = ['Little', 'Shares', 'Carries'], RISK = ['volume', 'cost-spread', 'performance'];
  const grid = scene.querySelector('[data-risk]'), ex = scene.querySelector('[data-ex]'), rsum = scene.querySelector('[data-rsum]');
  let riskSeen = false;
  const risk = (key) => {
    const d = models && models[key]; if (!d) return;
    const say = [];
    ['buyer', 'seller'].forEach((side) => (d[side] || []).forEach((x, i) => {
      const c = scene.querySelector('[data-cell="' + side + '-' + i + '"]');
      if (c) { c.setAttribute('data-v', String(x)); c.textContent = WORD[x] || ''; }
      say.push(side + ' ' + (WORD[x] || '').toLowerCase() + ' ' + RISK[i] + ' risk');
    }));
    const label = 'Our judgement for this pricing model: ' + say.join(', ') + '.';
    if (grid) grid.setAttribute('aria-label', label);
    // Announced on a change only, not on first load.
    if (rsum && riskSeen) rsum.textContent = label + ' Listed price: ' + d.name + ', ' + d.price + '.';
    riskSeen = true;
    if (ex) { ex.textContent = d.name + ', ' + d.price; ex.setAttribute('data-src', d.src); if (d.note) ex.setAttribute('data-note', d.note); else ex.removeAttribute('data-note'); }
  };
  scene.addEventListener('ami:set', (e) => { if (e.detail && e.detail.key === 'model') risk(e.detail.value); });
  if (scene.dataset.model) risk(scene.dataset.model);

  AMI.setUnit = setVal;
  AMI.onReader((r) => { who = r === 'buyer' ? 'Supplier' : 'Seller'; rev = r === 'services' ? 'Delivery staff' : 'Human review'; paint(); });
  scene.addEventListener('ami:in', run);
  AMI.onResize(host, build);
  paint();
})();

/* s2 extension: hidden costs, target price and the buyer's return. Reads the unit sliders above and never changes their results. */
(function () { const AMI = window.AMI; if (!AMI) return; const root = AMI.root;
  const scene = root.querySelector('.ami-s2-scene'); if (!scene) return;
  const fall = scene.querySelector('[data-x-fall]'), cmp = scene.querySelector('[data-x-cmp]'); if (!fall || !cmp) return;
  const usd = AMI.usd;
  const XK = ['tl', 'ev', 'fee', 'dc', 'ob', 'pi', 'sc', 'su', 'tm', 'cw', 'cn', 'ck', 'bh', 'bn', 'bs', 'bo', 'bu', 'bk', 'pm', 'sp', 'mc', 'md', 'mu', 'dp', 'dm', 'sf', 'sr', 'sk', 'st', 'sg', 'bx'];
  const EX = { tl: 0.03, ev: 2000, fee: 3.6, dc: 2, ob: 3000, pi: 2000, sc: 1500, su: 4000, cw: 30000, pm: 0, sp: 0 };
  const HID = ['tl', 'ev', 'fee', 'dc', 'ob', 'pi', 'sc', 'su', 'cw', 'pm', 'sp'];
  const rng = {}, num = {};
  XK.forEach((k) => { rng[k] = scene.querySelector('[data-xin="' + k + '"]'); num[k] = scene.querySelector('[data-xnum="' + k + '"]'); });
  if (XK.some((k) => !rng[k])) return;
  const lim = (k) => [Number(rng[k].min) || 0, Number(rng[k].max) || 0, Number(rng[k].step) || 1];
  const val = (k) => { const x = parseFloat(rng[k].value); const l = lim(k); return isFinite(x) ? Math.min(Math.max(x, l[0]), l[1]) : l[0]; };
  const out = (k) => scene.querySelector('[data-x-out="' + k + '"]');
  const pct = (x) => (x == null || !isFinite(x) ? 'n/a' : String(Math.round(x * 100) || 0) + '%');
  const big = (x) => { const r = Math.round(x) || 0; return Math.abs(r) >= 1e6 ? usd(r / 1e6, 2) + 'M' : usd(r, 0); };
  const cents = (x) => usd(x, x !== 0 && Math.abs(x) < 0.01 ? 3 : 2);
  let last = null;
  const setVal = (k, x) => {
    const l = lim(k), dec = (String(l[2]).split('.')[1] || '').length;
    const y = Math.min(Math.max(Math.round(x / l[2]) * l[2], l[0]), l[1]);
    rng[k].value = y.toFixed(dec); AMI.fill(rng[k]); if (num[k]) num[k].value = String(Number(rng[k].value));
  };
  // Pure sums, exposed for checking.
  const hidden = (v, m, x) => {
    const fixed = x.ev + x.ob + x.pi + x.sc + x.su;
    const ok = 1 - Math.min(Math.max(v.f, 0), 90) / 100;
    const lines = [['Tools and APIs', x.tl / ok], ['Evaluation', x.ev / v.n], ['Billing and payment fees', v.p * x.fee / 100], ['Disputes and credits', v.p * x.dc / 100], ['Partner margin', v.p * (x.pm || 0) / 100], ['Sales pay', v.p * (x.sp || 0) / 100], ['Onboarding', x.ob / v.n], ['Unpaid pilots', x.pi / v.n], ['Security and compliance', x.sc / v.n], ['Support, upkeep and hosting', x.su / v.n]];
    const per = lines.reduce((a, b) => a + b[1], 0);
    const net = v.p - m.cost - per;
    const den = (100 - x.tm - x.fee - x.dc - (x.pm || 0) - (x.sp || 0)) / 100;
    return { lines, per, loaded: m.cost + per, net, margin: v.p > 0 ? net / v.p : null, need: den > 1e-6 ? (m.cost + x.tl / ok + fixed / v.n) / den : null, attempt: m.model + x.tl + m.access + m.review, billable: m.cost + x.tl / ok, full: m.cost + x.tl / ok + fixed / v.n };
  };
  const ret = (p, x) => {
    // Counted outcomes that fail the buyer's check are still billed and are redone in-house.
    const s = x.bs / 100, done = x.bn * s, real = done * (1 - (x.bx || 0) / 100);
    const before = x.bn * x.bh, agent = done * p, left = (x.bn - real) * x.bh, over = x.bn * x.bo;
    const kept = real * x.bh * (1 - x.bk / 100), saving = real * x.bh * x.bk / 100 - agent - over;
    const spend = 12 * (agent + over) + x.bu;
    return { before, agent, left, over, kept, saving, wrong: (done - real) * p, roi: spend > 0 ? (12 * saving - x.bu) / spend : null, payback: saving > 0 ? x.bu / saving : null };
  };
  // Commitment, cash timing and a headcount contract turned into a unit price. h is the result of hidden().
  const deal = (v, h, x, arr) => {
    const C = v.n * x.mc / 100, rate = v.p * (1 - x.md / 100), A = v.n * x.mu / 100;
    const bill = C * rate + Math.max(0, A - C) * v.p;
    const days = Math.max(0, arr ? 15 + x.dp - x.dm : -x.dm);
    const now = x.st > 0 ? x.sf * x.sr / x.st : 0, cut = now * (1 - x.sg / 100);
    return { bill, eff: A > 0 ? bill / A : null, unused: Math.max(0, C - A) * rate, days, cash: days / 30 * h.full * v.n,
      now, nowM: x.sr > 0 ? 1 - x.sk / x.sr : null, cut, cutM: cut > 0 ? (cut - h.full) / cut : null, pNow: x.sf * (x.sr - x.sk), pCut: x.st * (cut - h.full) };
  };
  let arrears = true;
  AMI.hiddenMath = hidden; AMI.returnMath = ret; AMI.dealMath = deal;
  const bar = (parent, label, amount, total, start, kind) => {
    const r = AMI.el('div', { class: 'ami-s2x-r', 'data-kind': kind }, parent);
    AMI.el('span', { class: 'ami-s2x-rl' }, r, label);
    const t = AMI.el('span', { class: 'ami-s2x-rt' }, r), b = AMI.el('i', null, t);
    const w = total > 0 ? Math.min(Math.max(amount / total, 0), 1) * 100 : 0, l = total > 0 ? Math.min(Math.max(start / total, 0), 1) * 100 : 0;
    b.style.left = l.toFixed(2) + '%'; b.style.width = Math.max(w, amount > 0 ? 0.8 : 0).toFixed(2) + '%';
    return r;
  };
  const paint = () => {
    if (!last) return;
    const v = last.v, m = last.m, x = {}; XK.forEach((k) => { x[k] = val(k); });
    const h = hidden(v, m, x);
    const set = (k, text, neg) => { const n = out(k); if (!n) return; n.textContent = text; if (neg != null) n.setAttribute('data-neg', String(!!neg)); };
    set('g', pct(m.margin)); set('net', pct(h.margin), h.net < 0);
    set('need', h.need == null ? 'None' : usd(h.need));
    const perCust = x.cn > 0 ? h.net * v.n / x.cn : 0, pb = x.cw > 0 && perCust > 0 ? x.cw / perCust : null;
    set('cwp', x.cw <= 0 ? 'n/a' : pb == null ? 'Never' : pb < 1 ? 'Under 1 month' : pb > 120 ? 'Over 10 years' : (Math.round(pb * 10) / 10) + ' months', x.cw > 0 && (pb == null || pb > x.ck));
    set('cwl', x.cw <= 0 ? 'n/a' : usd(perCust * x.ck / x.cw), x.cw > 0 && perCust * x.ck < x.cw);
    set('m1', cents(h.attempt)); set('m2', cents(h.billable)); set('m3', cents(h.full)); set('m4', h.need == null ? 'None' : usd(h.need)); set('m5', pct(h.margin), h.net < 0);
    const use = scene.querySelector('[data-x-act="use"]'); if (use) use.disabled = h.need == null || h.need > 5;
    const ex = scene.querySelector('[data-x-act="example"]'); if (ex) ex.setAttribute('aria-pressed', String(HID.every((k) => val(k) === EX[k])));
    // waterfall: gross margin, seven steps down, what is left
    fall.textContent = '';
    const gross = Math.max(m.unit, 0), total = Math.max(gross, h.per, 1e-9);
    const top = bar(fall, 'Margin before hidden costs', gross, total, 0, 'gross'); AMI.el('b', null, top, cents(m.unit) + ' · ' + pct(m.margin));
    let at = gross;
    h.lines.forEach((ln) => { if (ln[1] <= 0) return; at -= ln[1]; const r = bar(fall, ln[0], ln[1], total, Math.max(at, 0), 'cost'); AMI.el('b', null, r, '-' + cents(ln[1])); });
    if (h.per <= 0) AMI.el('p', { class: 'ami-s2x-none ami-say' }, fall, 'No hidden costs entered. Move a slider or try the example.');
    const end = bar(fall, 'After hidden costs', Math.max(h.net, 0), total, 0, h.net < 0 ? 'loss' : 'net'); AMI.el('b', null, end, cents(h.net) + ' · ' + pct(h.margin));
    const hs = scene.querySelector('[data-x-sum]');
    if (hs) hs.textContent = 'Margin before hidden costs ' + pct(m.margin) + '. Hidden costs ' + cents(h.per) + ' a unit. Margin after hidden costs ' + pct(h.margin) + '. Price needed for a ' + x.tm + ' percent margin: ' + (h.need == null ? 'none' : usd(h.need)) + '.';
    // buyer return
    const r = ret(v.p, x);
    set('sav', big(r.saving), r.saving < 0); set('roi', pct(r.roi), r.roi != null && r.roi < 0);
    const pay = r.payback == null ? 'Never' : r.payback < 1 ? 'Under 1 month' : r.payback > 120 ? 'Over 10 years' : (Math.round(r.payback * 10) / 10) + ' months';
    set('pay', pay, r.payback == null); set('pay2', pay);
    set('r1', big(r.before)); set('r2', big(r.agent + r.over)); set('r3', big(r.left)); set('r4', big(r.saving), r.saving < 0); set('r5', pct(r.roi), r.roi != null && r.roi < 0);
    set('bw', big(r.wrong), r.wrong > 0);
    const d = deal(v, h, x, arrears);
    set('cb', big(d.bill)); set('ce', d.eff == null ? 'n/a' : usd(d.eff)); set('ce2', d.eff == null ? 'n/a' : usd(d.eff)); set('cu', big(d.unused), d.unused > 0);
    set('cd', String(Math.round(d.days))); set('cc', big(d.cash), d.cash > 0); set('cc2', big(d.cash));
    set('sv1', usd(d.now)); set('sv2', pct(d.nowM), d.nowM != null && d.nowM < 0); set('sv3', usd(d.cut)); set('sv4', pct(d.cutM), d.cutM != null && d.cutM < 0); set('sv5', big(d.pNow), d.pNow < 0); set('sv6', big(d.pCut), d.pCut < 0);
    scene.querySelectorAll('[data-x-fee]').forEach((b) => b.setAttribute('aria-pressed', String(val('fee') === parseFloat(b.getAttribute('data-x-fee')))));
    scene.querySelectorAll('[data-x-bill]').forEach((b) => b.setAttribute('aria-pressed', String((b.getAttribute('data-x-bill') === 'arr') === arrears)));
    cmp.textContent = '';
    const tot = Math.max(r.before, r.agent + r.left + r.over + r.kept, 1e-9);
    const row = (label, parts, sumv) => { const d = AMI.el('div', { class: 'ami-s2x-c' }, cmp); AMI.el('span', { class: 'ami-s2x-rl' }, d, label); const t = AMI.el('span', { class: 'ami-s2x-ct' }, d); parts.forEach((p) => { if (p[1] <= 0) return; const i = AMI.el('i', { 'data-m': p[0], title: p[2] + ' ' + big(p[1]) }, t); i.style.width = (p[1] / tot * 100).toFixed(2) + '%'; }); AMI.el('b', null, d, big(sumv)); };
    row('In-house today', [['price', r.before, 'In-house']], r.before);
    row('With the agent', [['margin', r.agent, 'Agent invoices'], ['price', r.left, 'Unfinished tasks in-house'], ['review', r.over, 'Your oversight'], ['fail', r.kept, 'Staff cost not yet removed']], r.agent + r.left + r.over + r.kept);
    const rs = scene.querySelector('[data-x-rsum]');
    if (rs) rs.textContent = 'Net saving ' + big(r.saving) + ' a month. ROI over 12 months ' + pct(r.roi) + '. Payback ' + pay.toLowerCase() + '.';
  };
  XK.forEach((k) => {
    rng[k].addEventListener('input', () => { if (num[k]) num[k].value = String(Number(rng[k].value)); paint(); });
    if (!num[k]) return;
    num[k].addEventListener('input', () => { const y = parseFloat(num[k].value); if (isFinite(y)) { const keep = num[k].value; setVal(k, y); num[k].value = keep; paint(); } });
    const back = () => { num[k].value = String(val(k)); };
    num[k].addEventListener('change', back); num[k].addEventListener('blur', back);
  });
  scene.querySelectorAll('[data-x-act]').forEach((b) => b.addEventListener('click', () => {
    const a = b.getAttribute('data-x-act');
    if (a === 'example') HID.forEach((k) => setVal(k, EX[k]));
    else if (a === 'clear') HID.forEach((k) => setVal(k, 0));
    else if (a === 'use' && last) { const x = {}; XK.forEach((k) => { x[k] = val(k); }); const h = hidden(last.v, last.m, x); if (h.need != null && AMI.setUnit) { AMI.setUnit('p', h.need); return; } }
    paint();
  }));
  scene.querySelectorAll('[data-x-fee]').forEach((b) => b.addEventListener('click', () => { setVal('fee', parseFloat(b.getAttribute('data-x-fee')) || 0); paint(); }));
  scene.querySelectorAll('[data-x-bill]').forEach((b) => b.addEventListener('click', () => { arrears = b.getAttribute('data-x-bill') === 'arr'; paint(); }));
  scene.addEventListener('ami:unit', (e) => { last = e.detail; paint(); });
  if (AMI.unitMath) { const v = {}; ['p', 'c', 'h', 'r', 't', 'f', 'n'].forEach((k) => { const i = scene.querySelector('[data-in="' + k + '"]'); v[k] = i ? parseFloat(i.value) || 0 : 0; }); last = { v: v, m: AMI.unitMath(v, 1) }; paint(); }
  const roiBox = scene.querySelector('[data-s2x="roi"]');
  AMI.onReader((r) => { if (roiBox && r === 'buyer') roiBox.open = true; });
  const openHash = () => { const id = location.hash.replace('#', ''); const d = id && scene.querySelector('details#' + CSS.escape(id)); if (d) { d.open = true; d.scrollIntoView({ block: 'start' }); } };
  window.addEventListener('hashchange', openHash); openHash();
  root.addEventListener('click', (e) => { const a = e.target.closest('a[href="#ami-hidden"], a[href="#ami-roi"]'); if (a) { const d = scene.querySelector(a.getAttribute('href')); if (d) d.open = true; } });
})();

/* Fit finder: five answers pick one of six models. Our judgement, first match wins. */
(function () {
  const AMI = window.AMI; if (!AMI) return;
  const box = AMI.root.querySelector('[data-fit]'); if (!box) return;
  let data = {}; try { data = AMI.data('s2-fit') || {}; } catch (e) { data = {}; }
  const pick = (q) => q[5] ? 'fixed' : (!q[1] && !q[2]) ? 'seat' : !q[1] ? 'credits' : !q[2] ? 'conversation' : (!q[3] || !q[4]) ? 'hybrid' : 'outcome';
  AMI.fitPick = pick;
  const name = box.querySelector('[data-fname]'), why = box.querySelector('[data-fwhy]'), use = box.querySelector('[data-fuse]');
  const read = () => { const q = {}; box.querySelectorAll('[data-fq][aria-pressed="true"]').forEach((b) => { q[b.dataset.fq] = b.dataset.a === '1'; }); return q; };
  const paint = () => {
    const k = pick(read()); box.dataset.model = k;
    box.querySelectorAll('[data-ft]').forEach((t) => t.setAttribute('data-on', String(t.dataset.ft === k)));
    const on = box.querySelector('[data-ft="' + k + '"]'); if (on && use.parentNode !== on) on.appendChild(use);
    use.disabled = k === 'fixed'; use.title = use.disabled ? 'Fixed price has no risk split in the grid' : '';
  };
  box.addEventListener('click', (e) => {
    const b = e.target.closest('[data-fq]');
    if (b) { box.querySelectorAll('[data-fq="' + b.dataset.fq + '"]').forEach((x) => x.setAttribute('aria-pressed', String(x === b))); paint(); return; }
    if (e.target.closest('[data-fuse]') && !use.disabled) { const t = AMI.root.querySelector('.ami-s2-risk .ami-seg [data-val="' + box.dataset.model + '"]'); if (t) { t.click(); t.scrollIntoView({ block: 'center' }); } }
  });
  paint();
})();

/* s3: the billing stack as a deterministic state machine. State is (fault, step). Same fault, same result. */
(function () {
  const AMI = window.AMI; if (!AMI) return; const root = AMI.root;
  const scene = root.querySelector('.ami-s3-scene'); if (!scene) return;
  const map = scene.querySelector('.ami-s3-map');
  const svg = scene.querySelector('.ami-s3-wires');
  const log = scene.querySelector('.ami-s3-log');
  const nodes = [...scene.querySelectorAll('.ami-s3-node')].sort((a, b) => Number(a.dataset.i) - Number(b.dataset.i));
  let STEPS = null, FAULTS = null;
  try { STEPS = AMI.data('s3-steps'); FAULTS = AMI.data('s3-faults'); } catch (e) { return; }
  if (!map || !svg || !log || !STEPS || !FAULTS || nodes.length !== STEPS.length) return;
  // The clean-path lines live once, as static markup in the log. They are read here, then the log is redrawn by render().
  const stat = [...log.querySelectorAll('[data-t]')];
  const parse = (n) => [...n.childNodes].map((c) => (c.nodeType === 3 ? c.textContent : c.nodeType === 1 && c.classList.contains('ami-chip') ? { c: c.textContent, src: (c.getAttribute('data-src') || '').split(/\s+/).filter(Boolean), note: c.getAttribute('data-note') || '' } : '')).filter(Boolean);
  STEPS.forEach((st, i) => { if (!st.t && stat[i]) st.t = parse(stat[i]); });
  if (STEPS.some((st) => !st.t)) return;
  const N = STEPS.length, INV = N - 1, PRICE = 0.99, COST = 0.44, GATE = 2;
  const q = (s) => scene.querySelector(s);
  const out = (k) => q('[data-out="' + k + '"]');
  const el = { more: q('[data-lines]'), why: q('.ami-s3-why'), inv: q('.ami-s3-inv'), fix: q('.ami-s3-fix'), fixt: q('.ami-s3-fixt'), il: q('.ami-s3-il'), counts: q('.ami-s3-counts'), diff: q('.ami-s3-diff'), sr: q('.ami-s3-sr'), go: q('[data-act="play"]') };

  const KIND = nodes.map((n) => { const k = n.querySelector('.ami-s3-k'); return (k ? k.textContent : '') + (n.querySelector('.ami-s3-first') ? '. Needed first' : ''); });
  const state = { fault: FAULTS[scene.dataset.fault] ? scene.dataset.fault : 'none', step: -1, playing: false };
  let gen = 0, timer = 0, flying = false, byUser = false, segs = [], token = null, shown = 0, shownFault = null, shownWhy = null;
  const LAB = {}; scene.querySelectorAll('[data-lab]').forEach((n) => { LAB[n.dataset.lab] = { n, t: n.textContent }; });

  // pure result of a fault: what the invoice says, what it should say
  const result = (f) => { const d = FAULTS[f]; return d ? { billed: d.billed, expected: d.expected, status: d.status, seller: d.seller, yours: d.yours, at: d.at, kind: 'fault' } : { billed: PRICE, expected: PRICE, status: 'Clean invoice line', seller: 1, yours: 1, at: [], kind: 'clean' }; };
  const lineFor = (f, i) => { const d = FAULTS[f]; const o = d && d.lines && d.lines[String(i)]; if (!o) return { parts: STEPS[i].t, bad: false }; return Array.isArray(o) ? { parts: o, bad: true } : { parts: o.t, bad: !o.ok }; };
  const flagFor = (d, i) => (d.flags && d.flags[String(i)]) || d.flag;

  const put = (parent, parts) => {
    (parts || []).forEach((p) => {
      if (typeof p === 'string') parent.appendChild(document.createTextNode(p));
      else if (p.tag === 'illus') AMI.el('span', { class: 'ami-tag', 'data-k': 'illus' }, parent, 'Illustration');
      else if (p.c) { const a = { class: 'ami-chip', type: 'button', 'aria-expanded': 'false', 'data-src': [].concat(p.src).join(' ') }; if (p.note) a['data-note'] = p.note; AMI.el('button', a, parent, p.c); }
    });
  };
  const money = (node, v, src, note) => {
    if (!node) return;
    node.textContent = ''; node.removeAttribute('data-pending');
    if (v == null) { node.textContent = 'pending'; node.setAttribute('data-pending', ''); node.removeAttribute('data-value'); return; }
    node.setAttribute('data-value', v.toFixed(2));
    if (src && v > 0) put(node, [{ c: AMI.usd(v), src, note }]); else node.textContent = AMI.usd(v);
  };
  const count = (node, v) => { if (!node) return; if (v == null) { node.textContent = 'pending'; node.setAttribute('data-pending', ''); } else { node.textContent = String(v); node.removeAttribute('data-pending'); } };
  const flag = (node, name, on) => { if (!node) return; if (on) node.setAttribute(name, ''); else node.removeAttribute(name); };

  // connectors, drawn from node positions at the current container width
  const box = (n, m) => { const r = n.getBoundingClientRect(); const l = r.left - m.left, t = r.top - m.top; return { l, t, r: l + r.width, b: t + r.height, cx: l + r.width / 2, cy: t + r.height / 2 }; };
  const rounded = (pts, rad) => {
    const p = pts.filter((v, i) => i === 0 || Math.abs(v[0] - pts[i - 1][0]) > 0.5 || Math.abs(v[1] - pts[i - 1][1]) > 0.5);
    let d = 'M' + p[0][0].toFixed(1) + ' ' + p[0][1].toFixed(1);
    for (let i = 1; i < p.length; i++) {
      const a = p[i - 1], b = p[i], c = p[i + 1];
      if (!c) { d += 'L' + b[0].toFixed(1) + ' ' + b[1].toFixed(1); break; }
      const l1 = Math.hypot(b[0] - a[0], b[1] - a[1]), l2 = Math.hypot(c[0] - b[0], c[1] - b[1]);
      const r = Math.min(rad, l1 / 2, l2 / 2);
      const x1 = b[0] - ((b[0] - a[0]) / l1) * r, y1 = b[1] - ((b[1] - a[1]) / l1) * r;
      const x2 = b[0] + ((c[0] - b[0]) / l2) * r, y2 = b[1] + ((c[1] - b[1]) / l2) * r;
      d += 'L' + x1.toFixed(1) + ' ' + y1.toFixed(1) + 'Q' + b[0].toFixed(1) + ' ' + b[1].toFixed(1) + ' ' + x2.toFixed(1) + ' ' + y2.toFixed(1);
    }
    return d;
  };
  const draw = () => {
    const w = map.clientWidth, h = map.clientHeight; if (!w || !h) return;
    const m = map.getBoundingClientRect();
    const lanes = [...map.querySelectorAll('.ami-s3-lane')];
    const stacked = lanes.length > 1 && lanes[1].getBoundingClientRect().top > lanes[0].getBoundingClientRect().bottom - 4;
    scene.dataset.flow = stacked ? 'down' : 'across';
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    svg.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
    segs = [];
    for (let i = 0; i < N - 1; i++) {
      const a = box(nodes[i], m), b = box(nodes[i + 1], m);
      let pts;
      if (Math.abs(a.cx - b.cx) < 4 && b.t >= a.b - 2) pts = [[a.cx, a.b], [b.cx, b.t]];
      else if (b.l >= a.r - 2) { const gx = (a.r + b.l) / 2; pts = Math.abs(a.cy - b.cy) < 4 ? [[a.r, a.cy], [b.l, b.cy]] : [[a.r, a.cy], [gx, a.cy], [gx, b.cy], [b.l, b.cy]]; }
      else { const gy = (a.b + b.t) / 2; pts = [[a.cx, a.b], [a.cx, gy], [b.cx, gy], [b.cx, b.t]]; }
      segs.push(AMI.svg('path', { class: 'ami-s3-wire', d: rounded(pts, 14) }, svg));
    }
    token = AMI.svg('circle', { class: 'ami-s3-token', r: 8, cx: 0, cy: 0 }, svg);
    paint();
  };
  const rest = () => {
    if (!token) return;
    const s = state.step;
    if (s < 0 || !segs.length) { token.setAttribute('hidden', ''); return; }
    const path = s === 0 ? segs[0] : segs[s - 1]; if (!path) return;
    let pt; try { pt = path.getPointAtLength(s === 0 ? 0 : path.getTotalLength()); } catch (e) { return; }
    token.removeAttribute('hidden'); token.setAttribute('cx', pt.x); token.setAttribute('cy', pt.y);
  };
  const paint = () => {
    const r = result(state.fault);
    segs.forEach((p, i) => { p.classList.toggle('is-lit', state.step >= i + 1); p.classList.toggle('is-now', state.step === i + 1); });
    if (token) token.classList.toggle('is-bad', r.at.includes(state.step));
    if (!flying) rest();
  };

  // render: a pure function of (fault, step)
  const render = () => {
    const f = state.fault, s = state.step, r = result(f), d = FAULTS[f] || null, done = s === N - 1;
    scene.dataset.fault = f; scene.dataset.step = String(s); scene.dataset.done = String(done);
    nodes.forEach((n, i) => {
      const bad = r.at.includes(i) && s >= i;
      n.classList.toggle('is-lit', s >= i); n.classList.toggle('is-now', s === i); n.classList.toggle('is-bad', bad);
      n.setAttribute('aria-current', s === i ? 'step' : 'false');
      const fl = n.querySelector('.ami-s3-flag'); if (fl) fl.textContent = bad && d ? flagFor(d, i) : '';
      n.setAttribute('aria-label', 'Step ' + (i + 1) + ': ' + STEPS[i].n + '. ' + (KIND[i] || '') + (bad && d ? '. Fault: ' + flagFor(d, i) : ''));
    });
    // ledger lines, appended one at a time so a screen reader hears only the new one
    if (shownFault !== f) { log.textContent = ''; shown = 0; shownFault = f; }
    while (shown > s + 1 && log.lastChild) { log.removeChild(log.lastChild); shown--; }
    for (; shown <= s; shown++) {
      const ln = lineFor(f, shown); const li = AMI.el('li', null, log); if (ln.bad) li.setAttribute('data-bad', '');
      AMI.el('span', { class: 'ami-s3-ln' }, li, String(shown + 1).padStart(2, '0'));
      const body = AMI.el('span', null, li); AMI.el('b', null, body, STEPS[shown].s || STEPS[shown].n); put(body, ln.parts);
    }
    // phone: the last three lines show unless the reader asks for all
    if (el.inv) el.inv.setAttribute('data-many', String(shown > 3));
    // read-outs
    const billedShown = s >= INV;
    money(out('cost'), s >= GATE ? COST : null, 'J#1', 'Median cost per task on an airline customer service benchmark. Test tasks, list API fees.');
    money(out('billed'), billedShown ? r.billed : null, 'A#5', (d && d.billedNote) || "Intercom's list price per outcome");
    Object.keys(LAB).forEach((k) => { const t = (d && d.labels && d.labels[k]) || LAB[k].t; if (LAB[k].n.textContent !== t) LAB[k].n.textContent = t; });
    money(out('expected'), billedShown ? r.expected : null, 'A#5', "Intercom's list price per outcome");
    const wrong = billedShown && r.billed !== r.expected;
    const cb = out('billed'), ce = out('expected'), cc = out('cost');
    if (cb) { flag(cb.parentNode, 'data-bad', wrong); flag(cb.parentNode, 'data-ok', billedShown && !wrong); }
    if (ce) flag(ce.parentNode, 'data-ok', billedShown);
    if (cc) flag(cc.parentNode, 'data-bad', !!(d && d.costBad) && s >= GATE);
    const st = out('status');
    if (st) { st.textContent = s < 0 ? 'Ready' : done ? r.status : 'Running'; st.dataset.state = s < 0 ? 'ready' : done ? r.kind : 'running'; }
    if (el.il) el.il.hidden = !(done && d);
    count(out('seller'), billedShown ? r.seller : null); count(out('yours'), billedShown ? r.yours : null);
    const differ = billedShown && r.seller !== r.yours;
    flag(el.counts, 'data-bad', differ); if (el.diff) el.diff.hidden = !differ;
    // the documented behaviour, then the part that prevents it
    if (el.why && shownWhy !== f) { el.why.textContent = ''; if (el.fixt) el.fixt.textContent = ''; if (d) { put(el.why, d.why); if (el.fixt) put(el.fixt, d.fix); } shownWhy = f; }
    if (el.why) el.why.hidden = !d;
    if (el.fix) el.fix.hidden = !(d && s >= r.at[0]);
    if (el.go) el.go.textContent = state.playing ? 'Pause' : 'Run one request';
    if (el.sr) el.sr.textContent = done ? 'Result. ' + ((d && d.labels && d.labels.billed) || 'Billed') + ' ' + AMI.usd(r.billed) + ', ' + ((d && d.labels && d.labels.expected) || 'should be').toLowerCase() + ' ' + AMI.usd(r.expected) + '. ' + r.status + '.' + (AMI.reader === 'buyer' ? ' Seller counts ' + r.seller + ', you count ' + r.yours + '.' : '') : '';
    paint();
  };

  // transitions
  // The state changes at once on every transition. The token flight is decoration, so a click or a timer never waits for an animation frame.
  const halt = () => { gen++; clearTimeout(timer); flying = false; };
  const fly = (i, my) => {
    const path = segs[i]; let len = 0; try { len = path.getTotalLength(); } catch (e) { return 0; }
    const dur = Math.max(320, Math.min(760, len * 2.4)); let t0 = 0;
    flying = true; if (token) token.removeAttribute('hidden');
    const end = () => { if (my !== gen) return; flying = false; rest(); };
    const frame = (ts) => {
      if (my !== gen) return;
      if (!t0) t0 = ts;
      const k = Math.min(1, (ts - t0) / dur), e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
      const p = segs[i];
      if (p && token && flying) { try { const pt = p.getPointAtLength(p.getTotalLength() * e); token.setAttribute('cx', pt.x); token.setAttribute('cy', pt.y); } catch (err) { /* path replaced mid-flight */ } }
      if (k < 1) requestAnimationFrame(frame); else end();
    };
    requestAnimationFrame(frame);
    setTimeout(end, dur + 120);
    return dur;
  };
  const advance = () => {
    if (state.step >= N - 1) return 0;
    const my = ++gen; flying = false;
    state.step += 1;
    const dur = AMI.still || state.step === 0 || !segs[state.step - 1] || document.hidden ? 0 : fly(state.step - 1, my);
    render();
    return dur;
  };
  const settle = () => { if (byUser && scene.dataset.flow === 'down' && el.inv && el.inv.scrollIntoView) el.inv.scrollIntoView({ behavior: AMI.still ? 'auto' : 'smooth', block: 'nearest' }); };
  const loop = () => {
    if (!state.playing) return;
    if (state.step >= N - 1) { state.playing = false; render(); settle(); return; }
    const dur = advance();
    timer = setTimeout(loop, dur + (AMI.still ? 750 : 460));
  };
  const act = {
    play(auto) { if (state.playing) { halt(); state.playing = false; render(); return; } halt(); byUser = auto !== true; if (state.step >= N - 1) state.step = -1; state.playing = true; loop(); },
    step() { halt(); state.playing = false; if (state.step >= N - 1) render(); else advance(); },
    back() { halt(); state.playing = false; state.step = Math.max(-1, state.step - 1); render(); },
    reset() { halt(); state.playing = false; state.step = -1; render(); },
  };
  scene.querySelectorAll('[data-act]').forEach((b) => b.addEventListener('click', () => { const fn = act[b.dataset.act]; if (fn) fn(); }));
  nodes.forEach((n, i) => n.addEventListener('click', () => { halt(); state.playing = false; state.step = i; render(); }));
  if (el.more) el.more.addEventListener('click', () => { const on = el.inv.getAttribute('data-all') !== 'true'; el.inv.setAttribute('data-all', String(on)); el.more.setAttribute('aria-expanded', String(on)); el.more.textContent = on ? 'Show last three' : 'Show all lines'; });
  scene.addEventListener('ami:set', (e) => {
    if (!e.detail || e.detail.key !== 'fault') return;
    const v = FAULTS[e.detail.value] ? e.detail.value : 'none';
    if (v === state.fault) return;
    halt(); state.playing = false; state.fault = v; state.step = -1; render();
  });

  AMI.onResize(map, draw);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(draw).catch(() => {});
  AMI.onReader(() => { requestAnimationFrame(() => { draw(); render(); }); });
  let started = false;
  scene.addEventListener('ami:in', () => {
    draw();
    if (started) return; started = true;
    if (state.step !== -1 || state.playing) return;
    if (AMI.still) { state.step = N - 1; render(); } else act.play(true);
  });
  render();
})();

/* s5: Recipe. Renders one step card for the chosen seat and year, keeps ticks in the browser, and names the next step on the brief. */
(function () {
  const AMI = window.AMI; if (!AMI) return; const root = AMI.root;
  const scene = root.querySelector('.ami-s5-scene'); if (!scene) return;
  const data = AMI.data('recipe'); if (!data || !data.steps) return;
  const steps = data.steps;
  const card = scene.querySelector('[data-s5-card]');
  const nodes = Array.from(scene.querySelectorAll('.ami-s5-node'));
  const count = scene.querySelector('[data-s5-count]');
  const nextLine = root.querySelector('[data-s5-next]');
  const KEY = 'ami-recipe-done';
  let done = new Set();
  try { JSON.parse(localStorage.getItem(KEY) || '[]').forEach((k) => done.add(k)); } catch (e) { /* unavailable */ }
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify([...done])); } catch (e) { /* unavailable */ } };
  let cur = Math.max(0, steps.findIndex((s) => !done.has(s.k)));
  const year = () => scene.getAttribute('data-year') === 'y27' ? 'y27' : 'today';

  const block = (parent, label, judge) => {
    const b = AMI.el('div', { class: 'ami-s5-blk' }, parent);
    const l = AMI.el('p', { class: 'ami-label' }, b, label + ' ');
    if (judge) AMI.el('span', { class: 'ami-tag', 'data-k': 'judge' }, l, 'Judgement');
    return b;
  };
  const marks = () => {
    nodes.forEach((n, i) => {
      n.setAttribute('aria-pressed', String(i === cur));
      const isDone = done.has(steps[i].k);
      n.parentElement.classList.toggle('is-done', isDone);
      n.setAttribute('aria-label', 'Step ' + (i + 1) + ': ' + steps[i].name + (isDone ? ', done' : '') + (steps[i].y27 ? ', changes in 2027' : ''));
    });
    if (count) count.textContent = String(steps.filter((s) => done.has(s.k)).length);
    if (nextLine) {
      nextLine.textContent = '';
      const i = steps.findIndex((s) => !done.has(s.k));
      if (i < 0) nextLine.textContent = 'All eight recipe steps are ticked.';
      else { nextLine.appendChild(document.createTextNode('Your next step: ')); AMI.el('a', { href: '#ami-recipe' }, nextLine, (i + 1) + '. ' + steps[i].name); }
    }
  };
  const render = (swap) => {
    const s = steps[cur], y = year(), seat = AMI.reader || 'owner';
    const changed = y === 'y27' && !!s.y27;
    card.textContent = ''; card.setAttribute('data-m', s.m);
    const head = AMI.el('div', { class: 'ami-s5-head' }, card);
    AMI.el('h3', { class: 'ami-s5-title' }, head, (cur + 1) + '. ' + s.name);
    const yr = AMI.el('span', { class: 'ami-s5-yr' }, head, y === 'today' ? 'Today' : changed ? '2027' : '2027: no dated change');
    if (y === 'y27' && !changed) yr.setAttribute('data-same', '');
    const left = AMI.el('div', null, card), right = AMI.el('div', null, card);
    const act = (changed ? s.y27 : s.today)[seat];
    AMI.el('p', { class: 'ami-s5-do' }, block(left, 'Do', true), act);
    AMI.el('p', { class: 'ami-s5-txt' }, block(left, 'Done when'), s.done);
    const f = (changed && s.fact.y27) || s.fact.today;
    const fp = AMI.el('p', { class: 'ami-s5-txt' }, block(right, 'Evidence'), f.pre);
    const chip = AMI.el('button', { class: 'ami-chip', type: 'button', 'data-src': f.src.join(' '), 'aria-expanded': 'false', 'aria-haspopup': 'dialog' }, fp, f.chip);
    if (f.note) chip.setAttribute('data-note', f.note);
    fp.appendChild(document.createTextNode(f.post));
    const pick = (changed && s.pick.y27) || s.pick.today;
    AMI.el('p', { class: 'ami-s5-txt ami-s5-pick' }, block(right, 'What I would do', true), pick);
    if (s.k === 'cost') AMI.el('a', { class: 'ami-s5-more', href: seat === 'buyer' ? '#ami-roi' : '#ami-hidden' }, right, seat === 'buyer' ? 'Open the return calculator' : 'Open hidden costs and target price');
    const bar = AMI.el('div', { class: 'ami-ctl ami-s5-act' }, card);
    const isDone = done.has(s.k);
    AMI.el('button', { type: 'button', 'data-s5': 'done', 'aria-pressed': String(isDone) }, bar, isDone ? 'Done' : 'Mark done');
    if (cur > 0) AMI.el('button', { type: 'button', 'data-s5': 'prev' }, bar, 'Back');
    if (cur < steps.length - 1) AMI.el('button', { type: 'button', 'data-s5': 'next' }, bar, 'Next step');
    if (swap && !AMI.still) { card.classList.remove('is-swap'); void card.offsetWidth; card.classList.add('is-swap'); }
    marks();
  };
  const go = (i, focusCard) => {
    cur = Math.max(0, Math.min(steps.length - 1, i)); render(true);
    if (focusCard) { const r = card.getBoundingClientRect(); if (r.bottom > innerHeight || r.top < 0) card.scrollIntoView({ behavior: AMI.still ? 'auto' : 'smooth', block: 'nearest' }); }
  };
  nodes.forEach((n, i) => n.addEventListener('click', () => go(i, true)));
  card.addEventListener('click', (e) => {
    const b = e.target.closest('[data-s5]'); if (!b) return;
    const a = b.getAttribute('data-s5');
    if (a === 'done') { const k = steps[cur].k; if (done.has(k)) done.delete(k); else done.add(k); save(); render(false); const nb = card.querySelector('[data-s5="done"]'); if (nb) nb.focus(); }
    else { go(cur + (a === 'next' ? 1 : -1), false); const nb = card.querySelector('[data-s5="' + a + '"]') || card.querySelector('[data-s5="done"]'); if (nb) nb.focus(); }
  });
  scene.addEventListener('ami:set', (e) => { if (e.detail && e.detail.key === 'year') render(true); });
  AMI.onReader(() => render(false));
  render(false);
})();

/* s4: Your brief. Draws the 90-day route through its three stations, replays it on a seat change, and wires print and change seat. */
(function () {
  const AMI = window.AMI; if (!AMI) return; const root = AMI.root;
  const scene = root.querySelector('.ami-s4-scene'); if (!scene) return;
  const sheets = Array.from(scene.querySelectorAll('.ami-s4-sheet'));
  const r1 = (n) => Math.round(n * 10) / 10;

  // One path per sheet, through the centres of the station dots. Horizontal on a wide sheet, vertical on a narrow one.
  const draw = (route) => {
    const dots = Array.from(route.querySelectorAll('.ami-s4-dot'));
    const w = route.clientWidth, h = route.clientHeight;
    if (dots.length < 2 || !w || !h) return;
    let svg = route.querySelector('.ami-s4-line');
    if (!svg) {
      svg = AMI.svg('svg', { class: 'ami-s4-line', 'aria-hidden': 'true', focusable: 'false' }, route);
      AMI.svg('path', { class: 'ami-s4-base' }, svg);
      AMI.svg('path', { class: 'ami-s4-fill' }, svg);
    }
    svg.setAttribute('width', w); svg.setAttribute('height', h); svg.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
    const pts = dots.map((d) => ({ x: d.offsetLeft + d.offsetWidth / 2, y: d.offsetTop + d.offsetHeight / 2 }));
    const a = pts[0], z = pts[pts.length - 1];
    const wide = Math.abs(z.x - a.x) > Math.abs(z.y - a.y);
    let d = wide ? 'M0 ' + r1(a.y) + ' L' + r1(a.x) + ' ' + r1(a.y) : 'M' + r1(a.x) + ' ' + r1(a.y);
    for (let i = 0; i < pts.length - 1; i++) {
      const p = pts[i], q = pts[i + 1];
      if (wide) d += ' Q' + r1((p.x + q.x) / 2) + ' ' + r1((p.y + q.y) / 2 + (i % 2 ? 26 : -26)) + ' ' + r1(q.x) + ' ' + r1(q.y);
      else d += ' L' + r1(q.x) + ' ' + r1(q.y);
    }
    if (wide) d += ' L' + w + ' ' + r1(z.y);
    svg.querySelectorAll('path').forEach((p) => p.setAttribute('d', d));
    const fill = svg.querySelector('.ami-s4-fill');
    let len = 0; try { len = fill ? fill.getTotalLength() : 0; } catch (e) { len = 0; }
    if (len) route.style.setProperty('--len', String(Math.ceil(len) + 2));
    route.classList.add('is-drawn');
  };
  const routes = sheets.map((s) => s.querySelector('.ami-s4-route')).filter(Boolean);
  routes.forEach((route) => AMI.onResize(route, () => draw(route)));
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => routes.forEach(draw)).catch(() => {});

  // The route fills and the stations light once the scene is in view, and again when the seat changes.
  const go = () => scene.classList.add('is-go');
  scene.addEventListener('ami:in', go);
  if (AMI.still || scene.classList.contains('is-in')) go();
  setTimeout(() => { if (scene.classList.contains('is-in')) go(); }, 1500);
  let first = true;
  AMI.onReader((v) => {
    sheets.forEach((s) => {
      const on = s.getAttribute('data-for') === v;
      s.classList.remove('is-tune');
      if (!on) return;
      const route = s.querySelector('.ami-s4-route');
      if (route) requestAnimationFrame(() => draw(route));
      if (!first && !AMI.still) { void s.offsetWidth; s.classList.add('is-tune'); }
    });
    if (!first && !AMI.still && scene.classList.contains('is-go')) {
      scene.classList.remove('is-go');
      requestAnimationFrame(() => requestAnimationFrame(go));
    }
    first = false;
  });
  window.addEventListener('beforeprint', go);

  // Controls
  scene.querySelectorAll('[data-s4-act]').forEach((b) => b.addEventListener('click', () => {
    if (b.getAttribute('data-s4-act') === 'print') { go(); window.print(); return; }
    const gate = root.querySelector('#ami-gate'); if (!gate) return;
    gate.scrollIntoView({ behavior: AMI.still ? 'auto' : 'smooth', block: 'start' });
    const btn = gate.querySelector('[data-reader-btn][aria-pressed="true"]') || gate.querySelector('[data-reader-btn]');
    if (btn) { try { btn.focus({ preventScroll: true }); } catch (e) { btn.focus(); } }
  }));
})();
