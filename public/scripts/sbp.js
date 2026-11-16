/* Stablecoin B2B payouts: core behaviour, then one block per scene. */
(function () {
  const root = document.querySelector('.sbp');
  if (!root) return;
  root.classList.add('sbp-js');
  const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const READERS = ['buyer', 'builder', 'strategy'];
  const subs = [];
  const store = { get() { try { return localStorage.getItem('sbp-reader'); } catch (e) { return null; } }, set(v) { try { localStorage.setItem('sbp-reader', v); } catch (e) { /* unavailable */ } } };
  const fromHash = () => { const m = /reader=([a-z]+)/.exec(location.hash); return m && READERS.includes(m[1]) ? m[1] : null; };
  const SRC = (() => { const el = root.querySelector('script[data-sbp="sources"]'); try { return el ? JSON.parse(el.textContent) : {}; } catch (e) { return {}; } })();

  const SBP = window.SBP = {
    root, still, reader: '',
    onReader(fn) { subs.push(fn); if (SBP.reader) fn(SBP.reader); },
    setReader(v, opts) {
      if (!READERS.includes(v)) return;
      const first = !SBP.reader;
      SBP.reader = v; root.dataset.reader = v;
      root.querySelectorAll('[data-reader-btn]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.readerBtn === v)));
      if (!(opts && opts.silent)) { store.set(v); try { history.replaceState(null, '', '#reader=' + v); } catch (e) { /* ignore */ } }
      subs.forEach((fn) => fn(v));
      if (first && opts && opts.scroll) { const s = root.querySelector('.sbp-scene:not(.sbp-gate)'); if (s) requestAnimationFrame(() => s.scrollIntoView({ behavior: still ? 'auto' : 'smooth', block: 'start' })); }
    },
    data(name) { const el = root.querySelector('script[data-sbp="' + name + '"]'); return el ? JSON.parse(el.textContent) : null; },
    svg(tag, attrs, parent) { const n = document.createElementNS('http://www.w3.org/2000/svg', tag); for (const k in (attrs || {})) n.setAttribute(k, attrs[k]); if (parent) parent.appendChild(n); return n; },
    el(tag, attrs, parent, text) { const n = document.createElement(tag); for (const k in (attrs || {})) n.setAttribute(k, attrs[k]); if (text != null) n.textContent = text; if (parent) parent.appendChild(n); return n; },
    onResize(el, fn) { let w = 0; const run = () => { const nw = Math.round(el.clientWidth); if (nw && nw !== w) { w = nw; fn(nw); } }; if ('ResizeObserver' in window) new ResizeObserver(run).observe(el); else window.addEventListener('resize', run); run(); },
    usd(v, d) { const a = Math.abs(v); const n = d == null ? 2 : d; return (v < 0 ? '-' : '') + '$' + a.toLocaleString('en-US', { minimumFractionDigits: n, maximumFractionDigits: n }); },
    fill(input) { const min = Number(input.min) || 0, max = Number(input.max) || 100; input.style.setProperty('--fill', ((Number(input.value) - min) / (max - min)) * 100 + '%'); },
  };

  // reader gate
  root.querySelectorAll('[data-reader-btn]').forEach((b) => b.addEventListener('click', () => SBP.setReader(b.dataset.readerBtn, { scroll: true })));
  const hashed = fromHash();
  if (hashed) store.set(hashed);
  const init = hashed || store.get();
  if (init) SBP.setReader(init, { silent: true });
  window.addEventListener('hashchange', () => { const h = fromHash(); if (h) { store.set(h); SBP.setReader(h, { silent: true }); } });
  // in-page links (rail, skip link) scroll without replacing #reader= in the address
  root.addEventListener('click', (e) => {
    const a = e.target.closest ? e.target.closest('a[href^="#sbp-"]') : null; if (!a) return;
    const t = document.getElementById(a.getAttribute('href').slice(1)); if (!t || !root.contains(t)) return;
    e.preventDefault();
    t.scrollIntoView({ behavior: still ? 'auto' : 'smooth', block: 'start' });
    if (!t.hasAttribute('tabindex')) t.setAttribute('tabindex', '-1');
    try { t.focus({ preventScroll: true }); } catch (err) { /* ignore */ }
  });

  // scenes: reveal and rail
  const scenes = [...root.querySelectorAll('.sbp-scene')];
  scenes.forEach((s) => s.querySelectorAll('[data-rise]').forEach((n, i) => n.style.setProperty('--i', i)));
  const rail = root.querySelector('.sbp-rail');
  const links = rail ? [...rail.querySelectorAll('a')] : [];
  const seen = new WeakSet();
  const enter = (s) => { if (seen.has(s)) return; seen.add(s); s.classList.add('is-in'); s.dispatchEvent(new CustomEvent('sbp:in')); };
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { io.unobserve(e.target); enter(e.target); } }), { threshold: 0, rootMargin: '0px 0px -15% 0px' });
    scenes.forEach((s) => io.observe(s));
    const io2 = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) links.forEach((a) => { const on = a.getAttribute('href') === '#' + e.target.id; a.classList.toggle('is-on', on); if (on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current'); }); }), { rootMargin: '-45% 0px -45% 0px' });
    scenes.forEach((s) => io2.observe(s));
  } else scenes.forEach(enter);
  setTimeout(() => scenes.forEach((s) => { const r = s.getBoundingClientRect(); if (r.width && r.top < innerHeight && r.bottom > 0) enter(s); }), 1200);

  // range fills
  root.querySelectorAll('input[type="range"]').forEach((i) => { SBP.fill(i); i.addEventListener('input', () => SBP.fill(i)); });

  // evidence chips: <button class="sbp-chip" data-src="G#38" data-note="optional caveat">
  let card = null, owner = null;
  // close clears both module variables before remove(), because remove() fires focusout, which calls close again
  const close = (refocus) => {
    const c = card, o = owner; card = null; owner = null;
    if (c && c.parentNode) c.parentNode.removeChild(c);
    if (o) { o.setAttribute('aria-expanded', 'false'); if (refocus && o.isConnected) o.focus(); }
  };
  const open = (chip, byKey) => {
    close();
    const ids = (chip.dataset.src || '').split(/[\s,]+/).filter(Boolean);
    card = SBP.el('div', { class: 'sbp-card', role: 'dialog', 'aria-label': 'Source' }, root);
    const srcs = []; const seenU = new Set();
    ids.forEach((id) => { const s = SRC[id]; if (!s || seenU.has(s.u)) return; seenU.add(s.u); srcs.push(s); });
    const pubs = [...new Set(srcs.map((s) => s.p))];
    SBP.el('strong', null, card, !srcs.length ? 'Source' : pubs.length === 1 ? pubs[0] : srcs.length + ' sources');
    if (pubs.length === 1 && srcs[0].i) SBP.el('em', null, card, 'Interest: ' + srcs[0].i);
    if (pubs.length > 1) { const seenP = new Set(); srcs.forEach((s) => { if (s.i && !seenP.has(s.p)) { seenP.add(s.p); SBP.el('em', null, card, s.p + ': ' + s.i); } }); }
    if (chip.dataset.note) SBP.el('span', null, card, chip.dataset.note);
    srcs.forEach((s, n) => { const a = SBP.el('a', { href: s.u, rel: 'noopener', target: '_blank' }, card, pubs.length > 1 ? s.p : srcs.length > 1 ? 'Source ' + (n + 1) : 'Open source'); a.setAttribute('aria-label', 'Open source: ' + s.p); });
    const r = chip.getBoundingClientRect(), rr = root.getBoundingClientRect();
    let x = r.left - rr.left; const w = card.offsetWidth; if (x + w > rr.width) x = Math.max(0, rr.width - w);
    card.style.left = x + 'px'; card.style.top = (r.bottom - rr.top + 8) + 'px';
    owner = chip; chip.setAttribute('aria-expanded', 'true');
    const mine = card; const cardLinks = [...mine.querySelectorAll('a')];
    if (byKey && cardLinks[0]) cardLinks[0].focus();
    // Tab past either end of the card goes back to the chip, so the reader keeps their place
    mine.addEventListener('keydown', (e) => {
      if (e.key !== 'Tab' || card !== mine) return;
      const edge = e.shiftKey ? cardLinks[0] : cardLinks[cardLinks.length - 1];
      if (document.activeElement === edge) { e.preventDefault(); close(true); }
    });
    mine.addEventListener('focusout', (e) => { if (card !== mine) return; if (!mine.contains(e.relatedTarget)) close(false); });
  };
  if (getComputedStyle(root).position === 'static') root.style.position = 'relative';
  root.addEventListener('click', (e) => { const c = e.target.closest('.sbp-chip'); if (c) { e.preventDefault(); if (owner === c) close(); else open(c, e.detail === 0); } else if (!e.target.closest('.sbp-card')) close(); });
  document.addEventListener('click', (e) => { if (card && !root.contains(e.target)) close(); });
  document.addEventListener('keydown', (e) => {
    if (!card) return;
    if (e.key === 'Escape') { close(true); return; }
    // card opened by pointer: Tab from its chip enters the card
    if (e.key === 'Tab' && !e.shiftKey && document.activeElement === owner) { const a = card.querySelector('a'); if (a) { e.preventDefault(); a.focus(); } }
  });
  let lastW = window.innerWidth;
  window.addEventListener('resize', () => { if (window.innerWidth !== lastW) { lastW = window.innerWidth; if (card) close(); } });
  root.querySelectorAll('.sbp-chip').forEach((c) => { c.setAttribute('type', 'button'); c.setAttribute('aria-expanded', 'false'); c.setAttribute('aria-haspopup', 'dialog'); });

  // segmented toggle: <div class="sbp-seg" data-key="k"><button data-val="v">. Sets data-<key> on the closest [data-host] or scene.
  root.querySelectorAll('.sbp-seg[data-key]').forEach((seg) => {
    const host = seg.closest('[data-host]') || seg.closest('.sbp-scene') || root; const key = seg.dataset.key;
    const set = (v) => { host.setAttribute('data-' + key, v); seg.querySelectorAll('button[data-val]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.val === v))); host.dispatchEvent(new CustomEvent('sbp:set', { detail: { key, value: v } })); };
    seg.querySelectorAll('button[data-val]').forEach((b) => b.addEventListener('click', () => set(b.dataset.val)));
    const f = seg.querySelector('button[aria-pressed="true"]') || seg.querySelector('button[data-val]'); if (f) set(f.dataset.val);
  });
})();

/* s1: verdict board */
(function () {
  const SBP = window.SBP; if (!SBP) return;
  const root = SBP.root;
  const scene = root.querySelector('#sbp-verdicts'); if (!scene) return;
  const wall = scene.querySelector('.sbp-s1-wall');
  const bar = scene.querySelector('.sbp-s1-bar');
  if (!wall || !bar) return;
  const cards = [...wall.querySelectorAll('.sbp-s1-card')];
  const segs = [...bar.querySelectorAll('.sbp-s1-seg')];
  const allBtn = scene.querySelector('.sbp-s1-all');
  const flipBtn = scene.querySelector('.sbp-s1-flip');
  const status = scene.querySelector('[data-s1-status]');
  const SEAT = { buyer: [5, 6, 8, 16, 19], builder: [3, 13, 14, 17, 18, 20], strategy: [1, 4, 11, 12, 15] };
  const ORDER = ['stale', 'open', 'opinion', 'part', 'yes'];
  const WORD = {}; segs.forEach((s) => { const l = s.querySelector('.sbp-s1-segl'); WORD[s.dataset.k] = l ? l.textContent : s.dataset.k; });
  const num = (c) => Number(c.dataset.n);
  let filter = '', flipped = false, timers = [];

  // order: seat first, note order, or by verdict. Reorders the DOM so tab order follows the eye.
  const sorted = () => {
    const mode = scene.dataset.sort || 'seat';
    const mine = SEAT[SBP.reader] || [];
    const key = (c) => mode === 'verdict' ? ORDER.indexOf(c.dataset.k) * 100 + num(c) : mode === 'seat' ? (mine.includes(num(c)) ? 0 : 100) + num(c) : num(c);
    return cards.slice().sort((a, b) => key(a) - key(b));
  };
  const arrange = (animate) => {
    const next = sorted();
    if (next.every((c, i) => wall.children[i] === c)) return;
    const move = animate && !SBP.still && scene.classList.contains('is-in');
    const before = move ? new Map(cards.map((c) => [c, c.getBoundingClientRect()])) : null;
    const focused = document.activeElement && wall.contains(document.activeElement) ? document.activeElement : null;
    next.forEach((c) => wall.appendChild(c));
    if (focused) focused.focus({ preventScroll: true });
    if (!move) return;
    cards.forEach((c) => {
      if (c.hidden) return;
      const a = before.get(c), b = c.getBoundingClientRect();
      const dx = a.left - b.left, dy = a.top - b.top;
      if (!dx && !dy) return;
      c.classList.remove('is-moving'); c.style.transform = 'translate(' + dx + 'px,' + dy + 'px)';
      requestAnimationFrame(() => requestAnimationFrame(() => { c.classList.add('is-moving'); c.style.transform = ''; }));
      setTimeout(() => c.classList.remove('is-moving'), 650);
    });
  };

  // reader: mark the seat's statements and bring them forward
  const mark = (reader) => {
    const mine = SEAT[reader] || [];
    cards.forEach((c) => {
      const on = mine.includes(num(c)); c.classList.toggle('is-mine', on);
      const btn = c.querySelector('.sbp-s1-open'); if (!btn) return;
      let tag = btn.querySelector('.sbp-s1-mine');
      if (on && !tag) { tag = SBP.el('span', { class: 'sbp-s1-mine' }, null, 'Your seat'); const note = btn.querySelector('.sbp-s1-note'); btn.insertBefore(tag, note); }
      else if (!on && tag) tag.remove();
    });
    arrange(true);
  };
  SBP.onReader(mark);
  scene.addEventListener('sbp:set', (e) => { if (e.detail && e.detail.key === 'sort') arrange(true); });

  // filter by verdict group
  const say = () => {
    if (!status) return;
    const n = cards.filter((c) => !c.hidden).length;
    status.textContent = (filter ? 'Showing ' + n + ' of 20: ' + WORD[filter] + '.' : 'Showing all 20 statements.') + (flipped ? ' Corrected wording shown.' : '');
  };
  const setFilter = (k) => {
    filter = k === filter ? '' : k;
    segs.forEach((s) => s.setAttribute('aria-pressed', String(s.dataset.k === filter)));
    bar.classList.toggle('is-filtered', !!filter);
    if (allBtn) allBtn.setAttribute('aria-pressed', String(!filter));
    cards.forEach((c) => {
      const hide = !!filter && c.dataset.k !== filter;
      if (c.hidden && !hide && !SBP.still) { c.classList.add('is-new'); setTimeout(() => c.classList.remove('is-new'), 400); }
      c.hidden = hide;
    });
    say();
  };
  segs.forEach((s) => s.addEventListener('click', () => setFilter(s.dataset.k)));
  if (allBtn) allBtn.addEventListener('click', () => { if (filter) setFilter(filter); });

  // open one card: correction plus evidence
  const toggle = (c, open) => {
    const btn = c.querySelector('.sbp-s1-open'); if (!btn) return;
    const on = open == null ? !c.classList.contains('is-open') : open;
    c.classList.toggle('is-open', on); btn.setAttribute('aria-expanded', String(on));
  };
  cards.forEach((c) => {
    const btn = c.querySelector('.sbp-s1-open');
    if (btn) btn.addEventListener('click', () => toggle(c));
    c.addEventListener('keydown', (e) => { if (e.key === 'Escape' && c.classList.contains('is-open') && !root.querySelector('.sbp-card')) { toggle(c, false); if (btn) btn.focus(); } });
  });

  // show what changed: every card turns from the note's wording to the corrected wording
  const flip = () => {
    flipped = !flipped;
    if (flipBtn) flipBtn.setAttribute('aria-pressed', String(flipped));
    timers.forEach(clearTimeout); timers = [];
    const want = flipped;
    const shown = [...wall.children].filter((c) => !c.hidden);
    cards.forEach((c) => { if (c.hidden || SBP.still) { c.classList.remove('is-turn'); c.classList.toggle('is-fixed', want); } });
    if (!SBP.still) shown.forEach((c, i) => {
      const t = i * 35;
      timers.push(setTimeout(() => c.classList.add('is-turn'), t));
      timers.push(setTimeout(() => c.classList.toggle('is-fixed', want), t + 250));
      timers.push(setTimeout(() => c.classList.remove('is-turn'), t + 520));
    });
    say();
  };
  if (flipBtn) flipBtn.addEventListener('click', flip);

  // meters and counts
  scene.querySelectorAll('.sbp-s1-meter i[data-w]').forEach((i) => i.style.setProperty('--w', i.dataset.w + '%'));
  const count = () => {
    setTimeout(() => scene.classList.add('is-ready'), 1100);
    if (SBP.still || document.hidden) return;
    scene.querySelectorAll('.sbp-s1-seg [data-count]').forEach((n) => {
      const to = Number(n.dataset.count); const t0 = performance.now(); const dur = 500 + to * 60;
      const step = (t) => { const p = Math.min(1, (t - t0) / dur); n.textContent = String(Math.round(to * (1 - Math.pow(1 - p, 3)))); if (p < 1) requestAnimationFrame(step); else n.textContent = String(to); };
      requestAnimationFrame((t) => { n.textContent = '0'; step(t); });
    });
  };
  if (scene.classList.contains('is-in')) count(); else scene.addEventListener('sbp:in', count, { once: true });
})();

/* Screen 2: the deals. Three-pole map with a time scrubber, pattern filter and a linked list. */
(function () {
  const SBP = window.SBP; if (!SBP) return; const root = SBP.root;
  const scene = root.querySelector('#sbp-deals'); if (!scene) return;
  const q = (k) => scene.querySelector('[data-s2="' + k + '"]');
  const map = q('map'), list = q('list'), detail = q('detail'), range = q('range'), out = q('out'), play = q('play'), playTxt = q('playtxt');
  let deals = null; try { deals = SBP.data('s2-deals'); } catch (e) { deals = null; }
  if (!map || !list || !detail || !Array.isArray(deals) || !deals.length) return;

  const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const monthLabel = (ym) => { const n = 5 + ym; return MONTHS[n % 12] + ' ' + (2024 + Math.floor(n / 12)); };
  const POLES = {
    W: { name: 'Workflow', m: 'flow', sub: ['Payables and', 'payout software'], icon: ['M22 12h26a4 4 0 0 1 4 4v34a4 4 0 0 1-4 4H22a4 4 0 0 1-4-4V16a4 4 0 0 1 4-4z', 'M26 24h18M26 32h18M26 40h9', 'M40 64h24M56 56l8 8-8 8'] },
    R: { name: 'Rail', m: 'coin', sub: ['Stablecoin infrastructure', 'and issuers'], icon: ['M40 24a16 16 0 1 0 0 32a16 16 0 1 0 0-32z', 'M40 32a8 8 0 1 0 0 16a8 8 0 1 0 0-16z', 'M6 40h18M56 40h18', 'M12 34v12M68 34v12'] },
    C: { name: 'Charter', m: 'bank', sub: ['Banks, trust banks', 'and networks'], icon: ['M14 32L40 14l26 18z', 'M22 38v20M34 38v20M46 38v20M58 38v20', 'M14 64h52M18 32h44'] },
  };
  const ORDER = ['W', 'R', 'C'];
  const byId = {}; deals.forEach((d) => { byId[d.id] = d; });
  const MAX = deals.reduce((a, d) => Math.max(a, d.ym), 0);
  const f = (n) => Math.round(n * 10) / 10;
  const unit = (a, b) => { const dx = b.x - a.x, dy = b.y - a.y, l = Math.hypot(dx, dy) || 1; return { x: dx / l, y: dy / l }; };

  let t = range ? Number(range.value) : MAX; if (!(t >= 0)) t = MAX;
  let filter = scene.getAttribute('data-s2f') || 'all';
  let sel = deals[deals.length - 1].id;
  let touched = false, timer = 0, raf = 0;
  const shown = {};            // id -> currently on the map
  let nodes = {};              // id -> { g, paths }
  const rows = {};             // id -> button
  let svg = null, labelEl = null, pulseDot = null, width = 0;

  // ---------- list rows (newest first) ----------
  deals.slice().reverse().forEach((d) => {
    const b = SBP.el('button', { type: 'button', class: 'sbp-s2-row', 'aria-pressed': 'false', 'data-id': d.id }, list);
    if (d.m) b.setAttribute('data-m', d.m);
    SBP.el('span', { class: 'sbp-dot', 'aria-hidden': 'true' }, b);
    SBP.el('span', { class: 'sbp-s2-row-d' }, b, d.date);
    SBP.el('span', { class: 'sbp-s2-row-t' }, b, (d.bs || d.buyer) + ' → ' + d.target);
    b.addEventListener('click', () => { touch(); select(d.id, false); });
    rows[d.id] = b;
  });
  const empty = SBP.el('p', { class: 'sbp-s2-empty' }, list, 'Nothing in view yet.'); empty.hidden = true;

  // ---------- detail panel ----------
  const chip = (text, d, parent) => { const c = SBP.el('button', { type: 'button', class: 'sbp-chip', 'data-src': d.src.join(' '), 'aria-expanded': 'false', 'aria-haspopup': 'dialog' }, parent, text); if (d.note) c.setAttribute('data-note', d.note); return c; };
  const renderDetail = () => {
    detail.textContent = '';
    const d = byId[sel];
    if (!d || !isVisible(d)) { detail.removeAttribute('data-m'); SBP.el('p', { class: 'sbp-s2-note' }, detail, 'Nothing in view yet. Move the slider forward.'); return; }
    if (d.m) detail.setAttribute('data-m', d.m); else detail.removeAttribute('data-m');
    const pat = SBP.el('p', { class: 'sbp-label sbp-s2-pat' }, detail); SBP.el('span', { class: 'sbp-dot', 'aria-hidden': 'true' }, pat); pat.appendChild(document.createTextNode(d.pat));
    const who = SBP.el('p', { class: 'sbp-s2-who' }, detail); who.appendChild(document.createTextNode(d.buyer)); SBP.el('span', { 'aria-label': 'to' }, who, ' → '); who.appendChild(document.createTextNode(d.target));
    const route = SBP.el('p', { class: 'sbp-s2-route' }, detail);
    const legs = []; d.p.forEach((pr) => { const s = pr[0] === pr[1] ? 'Inside ' + POLES[pr[0]].name : POLES[pr[0]].name + ' → ' + POLES[pr[1]].name; if (legs.indexOf(s) < 0) legs.push(s); });
    SBP.el('span', { class: 'sbp-cap' }, route, legs.join(', '));
    SBP.el('span', { class: 'sbp-tag', 'data-k': 'judge' }, route, 'Judgement');
    const dl = SBP.el('dl', { class: 'sbp-s2-facts' }, detail);
    const a = SBP.el('div', null, dl); SBP.el('dt', { class: 'sbp-label' }, a, 'Date'); chip(d.date, d, SBP.el('dd', null, a));
    const b = SBP.el('div', null, dl); SBP.el('dt', { class: 'sbp-label' }, b, 'Price as reported'); const dd = SBP.el('dd', null, b);
    if (d.price === 'Not applicable') dd.textContent = d.price; else chip(d.price, d, dd);
    if (d.note) SBP.el('p', { class: 'sbp-s2-note' }, detail, d.note);
  };

  // ---------- state ----------
  const isOn = (d) => d.ym <= t;
  const isMatch = (d) => filter === 'all' || d.g === filter;
  const isVisible = (d) => isOn(d) && isMatch(d);

  const drawIn = (d) => {
    const n = nodes[d.id]; if (!n || SBP.still) return;
    n.g.classList.add('is-new'); setTimeout(() => n.g.classList.remove('is-new'), 1300);
    if (d.kind !== 'buy' && d.kind !== 'none') return;
    n.paths.forEach((p) => {
      if (!p.getTotalLength) return;
      const L = p.getTotalLength();
      p.style.transition = 'none'; p.style.strokeDasharray = L; p.style.strokeDashoffset = L;
      p.getBoundingClientRect();
      p.style.transition = 'stroke-dashoffset .9s cubic-bezier(.3,.7,.2,1)'; p.style.strokeDashoffset = 0;
      setTimeout(() => { p.style.transition = ''; p.style.strokeDasharray = ''; p.style.strokeDashoffset = ''; }, 1000);
    });
  };

  const pulse = (d) => {
    const n = nodes[d.id]; const p = n && n.paths[0];
    if (SBP.still || !p || !p.getTotalLength || !pulseDot) return;
    cancelAnimationFrame(raf);
    const L = p.getTotalLength(), t0 = performance.now();
    if (d.m) pulseDot.setAttribute('data-m', d.m); else pulseDot.removeAttribute('data-m');
    pulseDot.style.display = 'block';
    const step = (now) => {
      const k = Math.min(1, (now - t0) / 900), e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
      const pt = p.getPointAtLength(L * e); pulseDot.setAttribute('cx', f(pt.x)); pulseDot.setAttribute('cy', f(pt.y));
      if (k < 1) raf = requestAnimationFrame(step); else pulseDot.style.display = 'none';
    };
    raf = requestAnimationFrame(step);
  };

  const placeLabel = () => {
    if (!labelEl) return;
    const d = byId[sel], n = d && nodes[d.id];
    if (!d || !n || !isVisible(d) || !n.mid) { labelEl.style.display = 'none'; return; }
    let txt = (d.bs || d.buyer) + ' → ' + d.target;
    if (txt.length * 8.2 > width - 16) txt = d.target;
    const half = txt.length * 4.1 + 6;
    const x = Math.min(width - half, Math.max(half, n.mid.x));
    const y = Math.max(16, n.mid.y - 14);
    labelEl.textContent = txt; labelEl.setAttribute('x', f(x)); labelEl.setAttribute('y', f(y)); labelEl.style.display = 'block';
  };

  const paint = () => {
    deals.forEach((d) => {
      const n = nodes[d.id], on = isOn(d), m = isMatch(d);
      if (n) { n.g.classList.toggle('is-off', !on); n.g.classList.toggle('is-dim', on && !m); n.g.classList.toggle('is-sel', d.id === sel && on && m); }
      const r = rows[d.id]; if (r) { r.hidden = !(on && m); r.setAttribute('aria-pressed', String(d.id === sel)); }
    });
    const any = deals.some(isVisible);
    empty.hidden = any;
    if (svg) svg.classList.toggle('has-sel', !!(byId[sel] && isVisible(byId[sel])));
    placeLabel();
  };

  const select = (id, fromMap) => {
    if (!byId[id]) return;
    sel = id; paint(); renderDetail();
    const n = nodes[id]; if (n && n.g.parentNode) n.g.parentNode.appendChild(n.g);
    pulse(byId[id]);
    const r = rows[id]; if (fromMap && r && !r.hidden) list.scrollTop = Math.max(0, r.offsetTop - 8);
  };

  // apply time and filter. animate: draw newly added arcs. follow: move selection to the newest arrival.
  const apply = (animate, follow) => {
    const fresh = [];
    deals.forEach((d) => { const on = isOn(d); if (on && !shown[d.id]) fresh.push(d); shown[d.id] = on; });
    let next = sel;
    if (follow && fresh.length) { const c = fresh.filter(isMatch); if (c.length) next = c[c.length - 1].id; }
    if (!byId[next] || !isVisible(byId[next])) { const vis = deals.filter(isVisible); if (vis.length) next = vis[vis.length - 1].id; }
    sel = next; paint(); renderDetail();
    if (animate) fresh.forEach(drawIn);
    if (out) out.textContent = monthLabel(t);
    if (range) range.setAttribute('aria-valuetext', 'Through ' + monthLabel(t));
  };

  // ---------- map ----------
  const draw = (w) => {
    width = w; cancelAnimationFrame(raf);
    map.textContent = ''; nodes = {};
    const narrow = w < 560, h = narrow ? 500 : 560, r = narrow ? 50 : 64, sp = narrow ? 9 : 19, ik = narrow ? 1.2 : 1.3;
    const px = narrow ? 60 : Math.max(140, w * 0.18);
    const P = { W: { x: px, y: h - (narrow ? 120 : 150) }, R: { x: w - px, y: h - (narrow ? 120 : 150) }, C: { x: w / 2, y: narrow ? 128 : 150 } };
    svg = SBP.svg('svg', { viewBox: '0 0 ' + w + ' ' + h, class: 'sbp-s2-svg', role: 'img', 'aria-label': 'Map of sampled deals between three poles. Arcs run in several directions between Workflow, Rail and Charter, and two large workflow purchases stay inside Workflow with no stablecoin angle. Pole placement is our judgement.' }, map);
    const gArcs = SBP.svg('g', { class: 'sbp-s2-arcs', 'aria-hidden': 'true' }, svg);
    const gPoles = SBP.svg('g', { class: 'sbp-s2-poles' }, svg);

    // slots: arcs sharing a pole pair fan out, loops at one pole nest
    const pairs = {}, loops = {};
    deals.forEach((d) => d.p.forEach((pr, i) => {
      if (pr[0] === pr[1]) (loops[pr[0]] = loops[pr[0]] || []).push({ d, i });
      else { const k = ORDER.filter((o) => o === pr[0] || o === pr[1]).join(''); (pairs[k] = pairs[k] || []).push({ d, i, from: pr[0], to: pr[1] }); }
    }));
    const geo = {}; // id -> [{ path, mid, tip, dir, loop, box }]
    const put = (d, i, g) => { (geo[d.id] = geo[d.id] || [])[i] = g; };
    Object.keys(pairs).forEach((k) => {
      const arr = pairs[k], a0 = P[k[0]], b0 = P[k[1]], cd = unit(a0, b0), nrm = { x: -cd.y, y: cd.x };
      arr.forEach((s, j) => {
        const off = (j - (arr.length - 1) / 2) * sp;
        const a = P[s.from], b = P[s.to];
        const c = { x: (a.x + b.x) / 2 + nrm.x * off * 2, y: (a.y + b.y) / 2 + nrm.y * off * 2 };
        const ua = unit(a, c), ub = unit(b, c);
        const st = { x: a.x + ua.x * (r + 12), y: a.y + ua.y * (r + 12) }, en = { x: b.x + ub.x * (r + 17), y: b.y + ub.y * (r + 17) };
        put(s.d, s.i, { path: 'M' + f(st.x) + ' ' + f(st.y) + 'Q' + f(c.x) + ' ' + f(c.y) + ' ' + f(en.x) + ' ' + f(en.y), mid: { x: 0.25 * st.x + 0.5 * c.x + 0.25 * en.x, y: 0.25 * st.y + 0.5 * c.y + 0.25 * en.y }, tip: en, dir: unit(c, en) });
      });
    });
    const deg = Math.PI / 180;
    const base = { W: (narrow ? -105 : -150) * deg, R: (narrow ? -75 : -30) * deg, C: -90 * deg };
    Object.keys(loops).forEach((k) => {
      const p = P[k];
      loops[k].forEach((s, j) => {
        const len = (narrow ? 24 : 38) + j * (narrow ? 20 : 30), al = 0.28 + 0.1 * j, be = 0.5 + 0.1 * j, b0 = base[k];
        const D = ((r + 12 + len) * 8 - 2 * (r + 12) * Math.cos(al)) / (6 * Math.cos(be));
        const at = (ang, dist) => ({ x: p.x + Math.cos(ang) * dist, y: p.y + Math.sin(ang) * dist });
        const st = at(b0 - al, r + 12), en = at(b0 + al, r + 17), c1 = at(b0 - be, D), c2 = at(b0 + be, D);
        const pt = (u) => { const v = 1 - u; return { x: v * v * v * st.x + 3 * v * v * u * c1.x + 3 * v * u * u * c2.x + u * u * u * en.x, y: v * v * v * st.y + 3 * v * v * u * c1.y + 3 * v * u * u * c2.y + u * u * u * en.y }; };
        const box = { x0: Infinity, y0: Infinity, x1: -Infinity };
        for (let u = 0; u <= 1.0001; u += 0.05) { const q0 = pt(u); box.x0 = Math.min(box.x0, q0.x); box.x1 = Math.max(box.x1, q0.x); box.y0 = Math.min(box.y0, q0.y); }
        put(s.d, s.i, { path: 'M' + f(st.x) + ' ' + f(st.y) + 'C' + f(c1.x) + ' ' + f(c1.y) + ' ' + f(c2.x) + ' ' + f(c2.y) + ' ' + f(en.x) + ' ' + f(en.y), mid: pt(0.5), tip: en, dir: unit(c2, en), loop: true, box, last: j === loops[k].length - 1 });
      });
    });

    // arcs
    deals.forEach((d) => {
      const g = SBP.svg('g', { class: 'sbp-s2-deal', 'data-kind': d.kind, 'data-id': d.id }, gArcs);
      if (d.m) g.setAttribute('data-m', d.m);
      const paths = []; let mid = null;
      (geo[d.id] || []).forEach((gm) => {
        if (!gm) return;
        SBP.svg('path', { class: 'sbp-s2-hit', d: gm.path }, g);
        const p = SBP.svg('path', { class: 'sbp-s2-arc', d: gm.path }, g);
        if (d.kind === 'broken') { p.setAttribute('pathLength', '100'); p.setAttribute('stroke-dasharray', '41 18 41'); }
        paths.push(p);
        if (d.kind === 'broken') {
          SBP.svg('path', { class: 'sbp-s2-x', d: 'M' + f(gm.mid.x - 7) + ' ' + f(gm.mid.y - 7) + 'l14 14M' + f(gm.mid.x + 7) + ' ' + f(gm.mid.y - 7) + 'l-14 14' }, g);
        } else {
          const u = gm.dir, n = { x: -u.y, y: u.x }, tp = { x: gm.tip.x + u.x * 4, y: gm.tip.y + u.y * 4 }, bx = gm.tip.x - u.x * 8, by = gm.tip.y - u.y * 8;
          SBP.svg('polygon', { class: 'sbp-s2-head', points: f(tp.x) + ',' + f(tp.y) + ' ' + f(bx + n.x * 6) + ',' + f(by + n.y * 6) + ' ' + f(bx - n.x * 6) + ',' + f(by - n.y * 6) }, g);
          SBP.svg('circle', { class: 'sbp-s2-mid', cx: f(gm.mid.x), cy: f(gm.mid.y), r: 5 }, g);
        }
        if (!narrow && gm.loop && gm.last && d.kind === 'none') {
          const tx = SBP.svg('text', { class: 'sbp-s2-mark', x: f(Math.max(6, gm.box.x0)), y: f(gm.box.y0 - 10) }, g); tx.textContent = 'No stablecoin angle';
        }
        if (!mid) mid = gm.mid;
      });
      g.addEventListener('click', () => { touch(); select(d.id, true); });
      nodes[d.id] = { g, paths, mid };
    });

    // poles
    ORDER.forEach((k) => {
      const pole = POLES[k], p = P[k];
      const g = SBP.svg('g', { class: 'sbp-s2-pole', 'data-m': pole.m }, gPoles);
      SBP.svg('circle', { class: 'sbp-s2-ring', cx: f(p.x), cy: f(p.y), r: r + 8 }, g);
      SBP.svg('circle', { class: 'sbp-s2-disc', cx: f(p.x), cy: f(p.y), r }, g);
      const ic = SBP.svg('g', { class: 'sbp-s2-icon', transform: 'translate(' + f(p.x - 40 * ik) + ' ' + f(p.y - 40 * ik) + ') scale(' + ik + ')' }, g);
      pole.icon.forEach((dd) => SBP.svg('path', { d: dd }, ic));
      const above = k === 'C';
      const anchor = !narrow || above ? 'middle' : k === 'W' ? 'start' : 'end';
      const tx = anchor === 'middle' ? p.x : k === 'W' ? 6 : w - 6;
      const lines = narrow || above ? pole.sub : [pole.sub.join(' ')];
      const subs = above && !narrow ? [pole.sub.join(' ')] : lines;
      const ny = above ? p.y - r - 18 - subs.length * 16 : p.y + r + 30;
      const nm = SBP.svg('text', { class: 'sbp-s2-name', x: f(tx), y: f(ny), 'text-anchor': anchor }, g); nm.textContent = pole.name;
      subs.forEach((s, i) => { const st = SBP.svg('text', { class: 'sbp-s2-sub-t', x: f(tx), y: f(ny + 19 + i * 16), 'text-anchor': anchor }, g); st.textContent = s; });
    });

    pulseDot = SBP.svg('circle', { class: 'sbp-s2-pulse', r: 7, cx: 0, cy: 0 }, svg); pulseDot.style.display = 'none';
    labelEl = SBP.svg('text', { class: 'sbp-s2-lbl', 'text-anchor': 'middle' }, svg);
    paint();
    const n = nodes[sel]; if (n && n.g.parentNode) n.g.parentNode.appendChild(n.g);
  };

  // ---------- controls ----------
  const setPlay = (on) => { detail.setAttribute('aria-live', on ? 'off' : 'polite'); if (play) { play.setAttribute('data-on', on ? '1' : '0'); play.setAttribute('aria-label', on ? 'Pause' : 'Play deals in date order'); } if (playTxt) playTxt.textContent = on ? 'Pause' : 'Play'; };
  const stop = () => { if (timer) { clearInterval(timer); timer = 0; } setPlay(false); };
  const setT = (v, animate) => { t = Math.max(0, Math.min(MAX, v)); if (range) { range.value = String(t); SBP.fill(range); } apply(animate, true); };
  const start = (ms) => {
    stop();
    if (t >= MAX) setT(0, true);
    setPlay(true);
    timer = setInterval(() => { if (t >= MAX) { stop(); return; } setT(t + 1, true); if (t >= MAX) stop(); }, ms);
  };
  function touch() { touched = true; if (timer) stop(); }

  if (range) {
    range.max = String(MAX);
    range.addEventListener('input', () => { touched = true; if (timer) stop(); t = Number(range.value); apply(true, true); });
    SBP.fill(range);
  }
  if (play) play.addEventListener('click', () => { touched = true; if (timer) stop(); else start(SBP.still ? 260 : 420); });
  scene.addEventListener('sbp:set', (e) => { if (!e.detail || e.detail.key !== 's2f') return; filter = e.detail.value; if (timer) stop(); apply(false, false); });

  deals.forEach((d) => { shown[d.id] = isOn(d); });
  SBP.onResize(map, draw);
  apply(false, false);
  setPlay(false);

  // first view: replay the sequence once, unless the reader has already taken over or prefers no motion
  let played = false;
  scene.addEventListener('sbp:in', () => { if (played || touched || SBP.still) return; played = true; setTimeout(() => { if (!touched) start(230); }, 350); });
})();

/* screen 3: the payout design */
(function () {
  const SBP = window.SBP; if (!SBP) return; const root = SBP.root;
  const scene = root.querySelector('.sbp-s3-scene'); if (!scene) return;
  let D = null; try { D = SBP.data('s3-design'); } catch (e) { D = null; }
  const map = scene.querySelector('.sbp-s3-map');
  if (!D || !map || !D.states || !D.comps) return;
  const q = (s) => scene.querySelector(s), qa = (s) => [...scene.querySelectorAll(s)];
  const nodes = {}; qa('.sbp-s3-node[data-c]').forEach((n) => { nodes[n.dataset.c] = n; });
  const bands = qa('.sbp-s3-band');
  const steps = qa('.sbp-s3-step[data-step]');
  const elNow = q('.sbp-s3-now'), elState = q('.sbp-s3-state'), elDesc = q('.sbp-s3-desc'), elOwn = q('.sbp-s3-own');
  const runBtn = q('.sbp-s3-run'), railBtns = qa('.sbp-s3-rail button[data-val]');
  const breakBtns = qa('[data-break]'), breakOut = q('.sbp-s3-breakout');
  const lensBtns = qa('[data-lens]'), lensOut = q('.sbp-s3-lensout');
  const info = q('.sbp-s3-info'), sr = q('.sbp-s3-sr');
  const holdEl = q('.sbp-s3-hold');
  const lossBtns = qa('[data-loss]'), lossOut = q('.sbp-s3-lossout');
  const decBtns = qa('[data-dec]'), decOut = q('.sbp-s3-decout');
  const tenBtns = qa('[data-ten]'), tenOut = q('.sbp-s3-tenout'), ring = q('.sbp-s3-ring');
  const mq = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
  const still = () => !!SBP.still || !!(mq && mq.matches);
  const LAST = D.states.length - 1, TRAVEL = 420, DWELL = 300;
  const RAILS = { bank: 'Bank rail', coin: 'Stablecoin rail' };

  const under = SBP.svg('svg', { class: 'sbp-s3-under', 'aria-hidden': 'true', focusable: 'false' });
  map.insertBefore(under, map.firstChild);
  const over = SBP.svg('svg', { class: 'sbp-s3-over', 'aria-hidden': 'true', focusable: 'false' });
  map.insertBefore(over, info || null);
  const token = SBP.svg('g', { class: 'sbp-s3-token', 'data-m': 'bank', opacity: '0' }, over);
  SBP.svg('circle', { class: 'sbp-s3-halo', r: 24 }, token);
  SBP.svg('circle', { class: 'sbp-s3-core', r: 12 }, token);
  let trailG = null;

  let rail = scene.getAttribute('data-rail') === 'coin' ? 'coin' : 'bank';
  let brk = null, brk0 = null, ten = null, cur = LAST, runId = 0, timer = 0, running = false, played = false, openC = null;

  // model
  const adapter = (r) => (r === 'coin' ? 'C7' : 'C6');
  const endIdx = (b) => (b ? Math.min(LAST, b.at - 1) : LAST);
  const resolve = () => { brk = brk0 ? Object.assign({}, brk0, brk0[rail] || {}) : null; };
  const sdesc = (st) => (st && typeof st.d === 'object' ? st.d[rail] : st.d) || '';
  const stepNodes = (i, r, b) => {
    const s = D.states[i]; let p = (s && s[r]) || [];
    if (b && b.path && i === endIdx(b)) return b.path;
    if (b && b.stop && i === endIdx(b)) { const k = p.indexOf(b.stop); if (k >= 0) p = p.slice(0, k + 1); }
    return p;
  };
  const hops = (i, r, b) => { const out = []; let prev = null; for (let s = 0; s <= i; s++) stepNodes(s, r, b).forEach((c) => { if (prev && prev !== c) out.push([prev, c]); prev = c; }); return out; };
  const key = (h) => (h[0] < h[1] ? h[0] + '>' + h[1] : h[1] + '>' + h[0]);
  const uniq = (list) => { const seen = new Set(); return list.filter((h) => { const k = key(h); if (seen.has(k)) return false; seen.add(k); return true; }); };
  const fails = (b, r) => (b ? (b.fail || []).map((c) => (c === 'adapter' ? adapter(r) : c)) : []);
  const cname = (c) => c + ' ' + (D.comps[c] ? D.comps[c].n : '');

  // geometry
  const cols = () => bands.length > 1 && Math.abs(bands[0].offsetTop - bands[1].offsetTop) < 4;
  const box = (c) => {
    const n = nodes[c]; if (!n) return null;
    let x = 0, y = 0, e = n; while (e && e !== map) { x += e.offsetLeft; y += e.offsetTop; e = e.offsetParent; }
    const w = n.offsetWidth, h = n.offsetHeight, band = n.closest('.sbp-s3-band');
    const sib = band ? [...band.querySelectorAll('.sbp-s3-node')] : [];
    return { l: x, t: y, r: x + w, b: y + h, cx: x + w / 2, cy: y + h / 2, band: bands.indexOf(band), idx: sib.indexOf(n), stag: !!(band && band.hasAttribute('data-stag')) };
  };
  const f = (v) => Math.round(v * 10) / 10;
  const pathD = (ca, cb) => {
    const a = box(ca), b = box(cb); if (!a || !b) return '';
    if (cols()) {
      if (a.band === b.band) {
        if (Math.abs(a.idx - b.idx) === 1) { const down = b.cy > a.cy; return 'M' + f(a.cx) + ' ' + f(down ? a.b : a.t) + 'L' + f(b.cx) + ' ' + f(down ? b.t : b.b); }
        return 'M' + f(a.l) + ' ' + f(a.cy) + 'C' + f(a.l - 40) + ' ' + f(a.cy) + ' ' + f(b.l - 40) + ' ' + f(b.cy) + ' ' + f(b.l) + ' ' + f(b.cy);
      }
      const dir = b.band > a.band ? 1 : -1, sx = dir > 0 ? a.r : a.l, ex = dir > 0 ? b.l : b.r;
      if (Math.abs(a.band - b.band) === 1 || (!a.stag && !b.stag)) { const mx = (sx + ex) / 2; return 'M' + f(sx) + ' ' + f(a.cy) + 'C' + f(mx) + ' ' + f(a.cy) + ' ' + f(mx) + ' ' + f(b.cy) + ' ' + f(ex) + ' ' + f(b.cy); }
      if (a.stag) { const kx = ex - dir * 36; return 'M' + f(sx) + ' ' + f(a.cy) + 'L' + f(kx) + ' ' + f(a.cy) + 'C' + f(kx + dir * 20) + ' ' + f(a.cy) + ' ' + f(ex - dir * 20) + ' ' + f(b.cy) + ' ' + f(ex) + ' ' + f(b.cy); }
      const kx = sx + dir * 36; return 'M' + f(sx) + ' ' + f(a.cy) + 'C' + f(sx + dir * 20) + ' ' + f(a.cy) + ' ' + f(kx - dir * 20) + ' ' + f(b.cy) + ' ' + f(kx) + ' ' + f(b.cy) + 'L' + f(ex) + ' ' + f(b.cy);
    }
    if (Math.abs(a.cy - b.cy) < 12) {
      if (a.band === b.band && Math.abs(a.idx - b.idx) === 1) { const right = b.cx > a.cx; return 'M' + f(right ? a.r : a.l) + ' ' + f(a.cy) + 'L' + f(right ? b.l : b.r) + ' ' + f(b.cy); }
      return 'M' + f(a.cx) + ' ' + f(a.t) + 'C' + f(a.cx) + ' ' + f(a.t - 38) + ' ' + f(b.cx) + ' ' + f(b.t - 38) + ' ' + f(b.cx) + ' ' + f(b.t);
    }
    const down = b.cy > a.cy, sy = down ? a.b : a.t, ey = down ? b.t : b.b, my = (sy + ey) / 2;
    return 'M' + f(a.cx) + ' ' + f(sy) + 'C' + f(a.cx) + ' ' + f(my) + ' ' + f(b.cx) + ' ' + f(my) + ' ' + f(b.cx) + ' ' + f(ey);
  };
  const anchor = (c) => { const b = box(c); if (!b) return null; return cols() ? { x: b.l, y: b.cy } : { x: b.cx, y: b.t }; };
  const edge = (a, b, cls, m, parent) => { const d = pathD(a, b); if (!d) return null; const attrs = { d, class: 'sbp-s3-edge ' + cls }; if (m) attrs['data-m'] = m; return SBP.svg('path', attrs, parent || under); };
  const place = (x, y) => { token.setAttribute('transform', 'translate(' + f(x) + ' ' + f(y) + ')'); token.setAttribute('opacity', '1'); };

  function draw() {
    const w = map.clientWidth, h = map.clientHeight; if (!w || !h) return false;
    [under, over].forEach((s) => { s.setAttribute('viewBox', '0 0 ' + w + ' ' + h); s.setAttribute('width', w); s.setAttribute('height', h); });
    while (under.firstChild) under.removeChild(under.firstChild);
    const other = rail === 'coin' ? 'bank' : 'coin';
    const main = uniq(hops(LAST, rail, null)), have = new Set(main.map(key));
    uniq(hops(LAST, other, null)).filter((h2) => !have.has(key(h2))).forEach((h2) => edge(h2[0], h2[1], 'is-off', other));
    (D.hints || []).forEach((h2) => edge(h2[0], h2[1], 'is-hint'));
    main.forEach((h2) => edge(h2[0], h2[1], 'is-main', rail));
    trailG = SBP.svg('g', { class: 'sbp-s3-trails' }, under);
    return true;
  }

  function show(i, announce) {
    i = Math.max(0, Math.min(endIdx(brk), i)); cur = i;
    const end = endIdx(brk), failed = !!brk && i === end, bad = failed ? fails(brk, rail) : [];
    const lit = stepNodes(i, rail, brk);
    const also = (D.states[i].also || []).concat(failed && brk.also ? brk.also : []);
    const done = new Set(); for (let s = 0; s < i; s++) stepNodes(s, rail, brk).forEach((c) => done.add(c));
    Object.keys(nodes).forEach((c) => {
      const n = nodes[c], isBad = bad.includes(c), isLit = lit.includes(c) && !isBad;
      n.classList.toggle('is-fail', isBad); n.classList.toggle('is-lit', isLit);
      n.classList.toggle('is-also', also.includes(c) && !isLit && !isBad);
      n.classList.toggle('is-done', done.has(c) && !isLit && !isBad);
    });
    steps.forEach((b, s) => {
      b.classList.toggle('is-done', s < i); b.classList.toggle('is-fail', failed && s === i);
      if (s === i) b.setAttribute('aria-current', 'step'); else b.removeAttribute('aria-current');
      b.disabled = s > end;
    });
    const st = D.states[i], owner = (failed ? bad : lit).map(cname).join(' and ');
    if (elNow) elNow.setAttribute('data-m', failed ? 'risk' : rail);
    if (elState) elState.textContent = failed ? brk.name : st.n;
    if (elDesc) elDesc.textContent = failed ? 'stopped at ' + st.n + ', state ' + (i + 1) : sdesc(st);
    const holder = markHold(i);
    if (elOwn) elOwn.textContent = owner;
    token.setAttribute('data-m', failed ? 'risk' : rail);
    if (trailG) {
      while (trailG.firstChild) trailG.removeChild(trailG.firstChild);
      let lastPath = null; hops(i, rail, brk).forEach((h2) => { lastPath = edge(h2[0], h2[1], 'is-trail', rail, trailG) || lastPath; });
      let pt = null;
      if (lastPath) { try { pt = lastPath.getPointAtLength(lastPath.getTotalLength()); } catch (e) { pt = null; } }
      if (!pt && lit.length) pt = anchor(lit[0]);
      if (failed && !cols()) { const fb = box(bad[0] || lit[0]); if (fb) pt = { x: fb.l, y: fb.cy }; }
      if (pt) place(pt.x, pt.y);
    }
    if (announce && sr) sr.textContent = RAILS[rail] + '. State ' + (i + 1) + ' of ' + D.states.length + ', ' + st.n + ': ' + sdesc(st) + '. ' + (holder ? 'Funds held by: ' + holder + '. ' : '') + (failed ? 'Fault: ' + brk.name + ' at ' + owner + '. ' + brk.text + (brk.who ? ' ' + brk.who : '') : 'Owner: ' + owner + '.');
  }

  function renderHold() {
    if (!holdEl || !D.hold || !D.hold[rail]) return; holdEl.textContent = '';
    D.hold[rail].forEach((h2) => {
      const li = SBP.el('li', { 'data-m': h2.m, 'data-a': h2.a, 'data-b': h2.b, 'data-n': h2.b - h2.a + 1 }, holdEl);
      SBP.el('b', null, li, h2.a === h2.b ? String(h2.a + 1) : (h2.a + 1) + ' to ' + (h2.b + 1)); SBP.el('span', null, li, h2.n);
    });
  }
  function markHold(i) {
    let name = ''; if (!holdEl) return name;
    [...holdEl.children].forEach((li) => { const on = i >= Number(li.dataset.a) && i <= Number(li.dataset.b); li.classList.toggle('is-on', on); if (on) { const s = li.querySelector('span'); name = s ? s.textContent : ''; } });
    return name;
  }

  function cancel() { runId++; clearTimeout(timer); running = false; scene.classList.remove('is-running'); }

  function travel(a, b, id, done) {
    const p = trailG ? edge(a, b, 'is-trail', rail, trailG) : null;
    let len = 0; if (p) { try { len = p.getTotalLength(); } catch (e) { len = 0; } }
    if (!p || !len || still()) { done(); return; }
    p.style.strokeDasharray = len; p.style.strokeDashoffset = len;
    const t0 = performance.now();
    const tick = (now) => {
      if (id !== runId) return;
      const u = Math.min(1, (now - t0) / TRAVEL), e = u < 0.5 ? 2 * u * u : 1 - Math.pow(-2 * u + 2, 2) / 2;
      let pt = null; try { pt = p.getPointAtLength(len * e); } catch (err) { pt = null; }
      if (pt) place(pt.x, pt.y);
      p.style.strokeDashoffset = len * (1 - e);
      if (u < 1) requestAnimationFrame(tick); else done();
    };
    requestAnimationFrame(tick);
  }

  function run() {
    cancel(); const id = runId, end = endIdx(brk); played = true;
    if (!draw()) return;
    if (still()) { show(end, true); return; }
    running = true; scene.classList.add('is-running');
    let i = 0, prev = null;
    const stepOnce = () => {
      if (id !== runId) return;
      const p = stepNodes(i, rail, brk); let k = 0;
      const next = () => {
        if (id !== runId) return;
        if (k >= p.length) {
          show(i, i === end);
          if (i >= end) { running = false; scene.classList.remove('is-running'); return; }
          i++; timer = setTimeout(stepOnce, DWELL); return;
        }
        const c = p[k++], from = prev; prev = c;
        if (!from || from === c) { next(); return; }
        token.setAttribute('data-m', rail);
        travel(from, c, id, next);
      };
      next();
    };
    stepOnce();
  }

  // controls
  function setRail(v) { rail = v === 'coin' ? 'coin' : 'bank'; resolve(); renderHold(); scene.setAttribute('data-rail', rail); railBtns.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.val === rail))); }
  function chip(parent, ev) { const attrs = { class: 'sbp-chip', type: 'button', 'data-src': ev.src, 'aria-expanded': 'false', 'aria-haspopup': 'dialog' }; if (ev.note) attrs['data-note'] = ev.note; return SBP.el('button', attrs, parent, ev.t); }
  function renderBreak() {
    if (!breakOut) return; breakOut.textContent = '';
    if (!brk) { breakOut.textContent = 'Choose a fault to see the response.'; return; }
    SBP.el('b', { 'data-m': 'risk' }, breakOut, brk.name); SBP.el('span', null, breakOut, brk.text + ' ');
    (brk.ev || []).forEach((ev) => chip(breakOut, ev));
    if (brk.who) { const w = SBP.el('span', { class: 'sbp-s3-who' }, breakOut); SBP.el('span', { class: 'sbp-tag', 'data-k': 'judge' }, w, 'Judgement'); SBP.el('span', null, w, brk.who); }
    const fc = fails(brk, rail)[0];
    if (fc && D.comps[fc]) SBP.el('span', { class: 'sbp-s3-lensof' }, breakOut, 'Lens: ' + D.comps[fc].l);
  }
  function markLoss() {
    const hit = (brk && brk.loss) || [];
    lossBtns.forEach((b) => { const tr = b.closest('tr'); if (tr) tr.classList.toggle('is-hit', hit.includes(b.dataset.loss)); });
    if (hit.length) setLoss(hit[0]);
  }
  function setLoss(id) {
    const L = (D.loss || {})[id] || null;
    lossBtns.forEach((b) => { const on = !!L && b.dataset.loss === id; b.setAttribute('aria-pressed', String(on)); const tr = b.closest('tr'); if (tr) tr.classList.toggle('is-on', on); });
    if (!lossOut) return; lossOut.textContent = '';
    if (!L) { lossOut.textContent = 'Choose a failure to see the proposal.'; return; }
    SBP.el('b', null, lossOut, 'Proposed: '); SBP.el('span', null, lossOut, L.b + '. ');
    SBP.el('b', null, lossOut, 'Evidence kept: '); SBP.el('span', null, lossOut, L.k + '. ');
    (L.ev || []).forEach((ev) => chip(lossOut, ev));
  }
  function setDec(id) {
    const d = (D.decs || []).find((x) => x.id === id) || null;
    decBtns.forEach((b) => b.setAttribute('aria-pressed', String(!!d && b.dataset.dec === d.id)));
    if (!decOut) return; decOut.textContent = '';
    if (!d) { decOut.textContent = 'Choose a decision to see the fork.'; return; }
    const fork = SBP.el('div', { class: 'sbp-s3-fork' }, decOut);
    const root0 = SBP.el('p', { class: 'sbp-s3-forkq' }, fork); SBP.el('i', null, root0, d.id); root0.appendChild(document.createTextNode(d.n));
    const ul = SBP.el('ul', null, fork);
    (d.o || []).forEach((o) => { const li = SBP.el('li', o.on ? { class: 'is-on' } : null, ul); SBP.el('span', null, li, o.t); SBP.el('em', null, li, o.s || (o.on ? 'Chosen' : 'Not chosen')); });
    if ((d.w || []).length) { const why = SBP.el('p', { class: 'sbp-s3-why2' }, decOut); SBP.el('b', null, why, 'Why'); d.w.forEach((ev) => chip(why, ev)); }
    const fl = SBP.el('p', { class: 'sbp-s3-flip' }, decOut); SBP.el('b', null, fl, 'Flips if'); SBP.el('span', null, fl, d.f + ' ');
    (d.fe || []).forEach((ev) => chip(fl, ev));
  }
  const lensName = (ids) => ids.map((id) => { const l = (D.lenses || []).find((x) => x.id === id); return l ? l.n : id; }).join(' and ');
  function drawRing() {
    if (!ring || !D.lenses) return; const w = ring.clientWidth; if (!w) return;
    while (ring.firstChild) ring.removeChild(ring.firstChild);
    const W = Math.min(w, 520), H = Math.round(Math.max(250, Math.min(330, W * 0.68)));
    const svg = SBP.svg('svg', { viewBox: '0 0 ' + W + ' ' + H, width: W, height: H, 'aria-hidden': 'true', focusable: 'false' }, ring);
    const n = D.lenses.length, cx = W / 2, cy = H / 2, rx = Math.max(40, W / 2 - 104), ry = H / 2 - 44, pos = {};
    D.lenses.forEach((l, i) => { const a = -Math.PI / 2 + (i * 2 * Math.PI) / n; pos[l.id] = { x: cx + rx * Math.cos(a), y: cy + ry * Math.sin(a), c: Math.cos(a), s: Math.sin(a) }; });
    const arcs = (t, on) => t.a.l.forEach((p) => t.b.l.forEach((r) => {
      const A = pos[p], B = pos[r]; if (!A || !B) return;
      const path = SBP.svg('path', { class: 'sbp-s3-arc' + (on ? ' is-on' : ''), d: 'M' + f(A.x) + ' ' + f(A.y) + 'Q' + f(cx) + ' ' + f(cy) + ' ' + f(B.x) + ' ' + f(B.y) }, svg);
      path.addEventListener('click', () => setTen(t.id));
    }));
    (D.tens || []).forEach((t) => { if (!ten || ten.id !== t.id) arcs(t, false); });
    if (ten) arcs(ten, true);
    D.lenses.forEach((l) => {
      const p = pos[l.id], side = p.c > 0.3 ? 1 : p.c < -0.3 ? -1 : 0, hot = !!ten && (ten.a.l.includes(l.id) || ten.b.l.includes(l.id));
      SBP.svg('circle', { class: 'sbp-s3-rn' + (hot ? ' is-on' : ''), cx: f(p.x), cy: f(p.y), r: hot ? 10 : 7 }, svg);
      const tx = SBP.svg('text', { class: 'sbp-s3-rt' + (hot ? ' is-on' : ''), x: f(p.x + side * 15), y: f(p.y + (side ? 5 : p.s < 0 ? -16 : 26)), 'text-anchor': side > 0 ? 'start' : side < 0 ? 'end' : 'middle' }, svg);
      tx.textContent = l.k || l.n;
    });
  }
  function setTen(id) {
    ten = (D.tens || []).find((t) => t.id === id) || null;
    tenBtns.forEach((b) => b.setAttribute('aria-pressed', String(!!ten && b.dataset.ten === ten.id)));
    drawRing();
    if (!tenOut) return; tenOut.textContent = '';
    if (!ten) { tenOut.textContent = 'Choose a disagreement to see how it settled.'; return; }
    [ten.a, ten.b].forEach((s) => { SBP.el('b', null, tenOut, lensName(s.l)); SBP.el('span', null, tenOut, (s.l.length > 1 ? ' want ' : ' wants ') + s.w + '. '); });
    SBP.el('b', { class: 'sbp-s3-set' }, tenOut, 'Settled'); SBP.el('span', null, tenOut, ten.s + ' ');
    (ten.ev || []).forEach((ev) => chip(tenOut, ev));
  }
  function setBreak(id, play) {
    cancel(); brk0 = (D.breaks || []).find((b) => b.id === id) || null; resolve();
    if (brk0 && brk0.rail && brk0.rail !== rail) setRail(brk0.rail);
    breakBtns.forEach((b) => b.setAttribute('aria-pressed', String(!!brk && b.dataset.break === brk.id)));
    renderBreak(); markLoss();
    if (play) run(); else if (draw()) show(endIdx(brk), false);
  }
  function setLens(id) {
    const L = (D.lenses || []).find((l) => l.id === id) || null;
    lensBtns.forEach((b) => b.setAttribute('aria-pressed', String(!!L && b.dataset.lens === L.id)));
    Object.keys(nodes).forEach((c) => nodes[c].classList.toggle('is-lens', !!L && L.comps.includes(c)));
    if (!lensOut) return; lensOut.textContent = '';
    if (!L) { lensOut.textContent = 'Choose a lens to see what it adds to the design.'; return; }
    [['Stake', L.s], ['Adds', L.c], ['Shapes', L.comps.join(', ')]].forEach((p) => { const s = SBP.el('span', { class: 'sbp-s3-fact' }, lensOut); SBP.el('b', null, s, p[0]); s.appendChild(document.createTextNode(p[1])); });
  }

  // component panel
  function closeInfo(refocus) {
    if (!openC || !info) return; const n = nodes[openC]; openC = null; info.hidden = true; info.textContent = '';
    if (n) { n.setAttribute('aria-expanded', 'false'); if (refocus) n.focus(); }
  }
  function openInfo(c) {
    const d = D.comps[c], n = nodes[c]; if (!info || !d || !n) return;
    if (openC === c) { closeInfo(true); return; }
    closeInfo(false); openC = c; n.setAttribute('aria-expanded', 'true');
    info.setAttribute('data-m', n.getAttribute('data-m') || 'flow'); info.setAttribute('aria-label', cname(c));
    const x = SBP.el('button', { type: 'button', class: 'sbp-s3-x', 'aria-label': 'Close' }, info);
    const xs = SBP.svg('svg', { viewBox: '0 0 18 18', 'aria-hidden': 'true' }, x); SBP.svg('path', { d: 'M4 4l10 10M14 4L4 14' }, xs);
    x.addEventListener('click', () => closeInfo(true));
    const h = SBP.el('h3', null, info); SBP.el('i', null, h, c); h.appendChild(document.createTextNode(d.n));
    const dl = SBP.el('dl', null, info);
    const row = (t, v) => { const w = SBP.el('div', null, dl); SBP.el('dt', null, w, t); return SBP.el('dd', null, w, v); };
    row('Purpose', d.p + '.'); row('Guards against', d.g + '.'); row('Lens', d.l);
    const ev = row('Evidence', null); ev.className = 'sbp-s3-chips'; (d.ev || []).forEach((e) => chip(ev, e));
    info.hidden = false;
    const b = box(c), W = map.clientWidth, H = map.clientHeight, w = info.offsetWidth, hh = info.offsetHeight;
    let px = 0, py = 0;
    if (b) {
      if (cols()) { px = b.r + 12; if (px + w > W) px = b.l - 12 - w; py = b.t; } else { px = b.cx - w / 2; py = b.b + 10; if (py + hh > H) py = b.t - 10 - hh; }
    }
    info.style.left = Math.max(0, Math.min(W - w, px)) + 'px'; info.style.top = Math.max(0, Math.min(H - hh, py)) + 'px';
    try { info.focus({ preventScroll: true }); } catch (e) { info.focus(); }
  }
  if (info) info.addEventListener('focusout', (e) => {
    const t = e.relatedTarget; if (!openC || !t || !t.closest) return;
    if (t.closest('.sbp-s3-info, .sbp-card') || t === nodes[openC]) return;
    closeInfo(false);
  });

  Object.keys(nodes).forEach((c) => nodes[c].addEventListener('click', () => openInfo(c)));
  document.addEventListener('click', (e) => { if (!openC) return; const t = e.target; if (t && t.closest && t.closest('.sbp-s3-info, .sbp-s3-node, .sbp-card, .sbp-chip')) return; closeInfo(false); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && openC && !root.querySelector('.sbp-card')) closeInfo(true); }, true);
  if (runBtn) runBtn.addEventListener('click', () => { closeInfo(false); if (brk0) { brk0 = null; resolve(); breakBtns.forEach((b) => b.setAttribute('aria-pressed', 'false')); renderBreak(); markLoss(); } run(); });
  scene.addEventListener('sbp:set', (e) => {
    if (!e.detail || e.detail.key !== 'rail') return; const v = e.detail.value === 'coin' ? 'coin' : 'bank'; if (v === rail) return;
    closeInfo(false); cancel(); rail = v;
    if (brk0 && brk0.rail && brk0.rail !== rail) { brk0 = null; breakBtns.forEach((b) => b.setAttribute('aria-pressed', 'false')); }
    resolve(); renderHold(); renderBreak(); markLoss();
    run();
  });
  breakBtns.forEach((b) => b.addEventListener('click', () => { closeInfo(false); setBreak(b.dataset.break, true); }));
  lensBtns.forEach((b) => b.addEventListener('click', () => setLens(b.dataset.lens)));
  lossBtns.forEach((b) => b.addEventListener('click', () => setLoss(b.dataset.loss)));
  decBtns.forEach((b) => b.addEventListener('click', () => setDec(b.dataset.dec)));
  tenBtns.forEach((b) => b.addEventListener('click', () => setTen(b.dataset.ten)));
  steps.forEach((b) => b.addEventListener('click', () => { cancel(); if (draw()) show(Number(b.dataset.step) || 0, true); }));

  // reader defaults, first play, resize
  SBP.onReader((r) => {
    const def = (D.defaults && D.defaults[r]) || {}; closeInfo(false); cancel(); played = false;
    setRail('bank'); setLens(def.lens || null); setLoss(def.loss || null); setDec(def.dec || null); setTen(def.ten || null); setBreak(def.brk || null, false);
    if (scene.classList.contains('is-in')) run();
  });
  scene.addEventListener('sbp:in', () => { if (!played && SBP.reader) run(); });
  if (ring) SBP.onResize(ring, drawRing);
  // looping motion runs only while the scene is on screen
  if ('IntersectionObserver' in window) new IntersectionObserver((es) => es.forEach((e) => scene.classList.toggle('is-off', !e.isIntersecting))).observe(scene);
  SBP.onResize(map, () => { const was = running; closeInfo(false); cancel(); if (draw()) show(was ? endIdx(brk) : cur, false); });
})();

/* Screen 4: rail chooser. Gates first, then the decision table, first match wins. */
(function () {
  const SBP = window.SBP; if (!SBP) return; const root = SBP.root;
  const scene = root.querySelector('.sbp-s4-scene'); if (!scene) return;
  let D = null; try { D = SBP.data('s4-rules'); } catch (e) { D = null; }
  if (!D || !D.rows || !D.gates) return;

  /*S4-LOGIC-START*/
  // Pure: inputs in, gate results and a decision-table row number out. No DOM, no data lookups.
  // i = { route: domestic|cross, country: us|br|other, status: established|new|changed, cap: instant|ach|hosted|self,
  //       consent: yes|no, amount: 0..3 (under $3,000, to $1 million, to $10 million, above), speed: minutes|same|next,
  //       day: hours|outside (weekend or holiday), health: normal|chain|bank, token: usdc|usdt, data: yes|no }
  // Gate states: info (always runs), pass, data (needs data), close (rules out one rail, later gates still run),
  // stop (the payout is held or declined). Every gate is evaluated on every route.
  // FINAL rows pay on a rail treated as final. A new or changed payee never lands on one.
  const FINAL = [3, 6, 7, 8, 9, 10, 11, 12];
  const COIN = [10, 11];
  function choose(i) {
    const dom = i.route === 'domestic';
    const wallet = i.cap === 'hosted' || i.cap === 'self';
    const fresh = i.status !== 'established';
    const urgent = i.speed !== 'next';
    const weekend = i.day === 'outside';
    const usdt = wallet && i.token === 'usdt';
    const chainDown = i.health === 'chain' || i.health === 'degraded', bankDown = i.health === 'bank';
    const ramp = !dom && i.cap === 'ach' && weekend && urgent && i.consent === 'yes';
    const token = !dom && (wallet || ramp);
    const bankAsk = dom && !wallet && urgent;
    const g1 = ['info', 'Parties and addresses, again at submission'];
    const g2 = !token ? ['pass', 'No token leg']
      : i.country !== 'br' ? ['data', 'Legality checked for Brazil alone']
      : ramp ? ['close', 'Law firm reads Brazil as barring tokens on regulated eFX legs', 'Stablecoin: closed on Brazil eFX legs, per a law firm']
      : ['data', 'Wallet route to Brazil not checked'];
    const g3 = dom && wallet ? ['data', 'Bank details needed for a US payout']
      : !token ? ['pass', 'No token leg']
      : i.consent !== 'yes' ? ['close', 'No payee consent, stablecoin closed', 'Stablecoin: payee has not consented']
      : i.cap === 'self' ? ['data', 'Verify self-hosted wallet first'] : ['pass', 'Payee consents'];
    const g4 = token && i.amount >= 2 ? ['close', 'Stablecoin closed above $1 million, no cap set', 'Stablecoin: above $1 million, no cap set', 'coin']
      : bankAsk && i.amount === 3 ? ['close', 'RTP, FedNow and Same Day ACH closed above $10 million', 'RTP, FedNow, Same Day ACH: above their limits']
      : bankAsk && i.amount === 2 ? ['close', 'Same Day ACH closed above $1 million', 'Same Day ACH: $1 million limit until September 17, 2027']
      : token ? ['data', 'Platform cap not yet set'] : ['pass', 'Rail limits checked'];
    const g5 = i.amount === 0 ? ['pass', 'Under $3,000'] : i.data === 'no' ? ['stop', 'Incomplete data, held on any rail'] : ['pass', 'Data complete'];
    const g7 = !token ? ['pass', 'No token leg'] : usdt ? ['stop', 'USDT is off the list'] : ['pass', 'USDC is on the list'];
    const tokenOpen = token && g2[0] !== 'close' && g3[0] !== 'close' && g4[0] !== 'close' && !usdt && !chainDown && !(ramp && bankDown);
    // base rail, before the first-payout rule and before holds
    let base, then = null;
    if (dom) {
      if (wallet) { base = 18; then = 1; }
      else if (!urgent) base = 1;
      else if (i.amount === 3) base = weekend ? 7 : 6;
      else if (i.speed === 'same' && i.amount <= 1 && !weekend) base = 2;
      else if (i.cap === 'instant') base = 3;
      else if (i.amount <= 1) base = weekend ? 15 : 5;
      else base = weekend ? 16 : 6;
    } else if (tokenOpen) base = wallet ? 10 : 11;
    else if (wallet) { if (usdt) base = 13; else if (chainDown) base = 14; else { base = 18; then = i.amount >= 2 ? 8 : 12; } }
    else if (i.amount >= 2) base = 8;
    else if (i.cap === 'instant') base = 9;
    else base = 12;
    const g8 = bankDown ? (base === 10 ? ['close', 'Bank partner degraded, bank rails closed', 'Bank rails: partner degraded'] : base === 13 ? ['close', 'Bank partner degraded, bank rails closed'] : ['stop', 'Bank partner degraded, held'])
      : chainDown ? (!token ? ['pass', 'No token leg, bank partner normal'] : wallet ? ['stop', 'Chain or ramp degraded, no blind resend'] : ['close', 'Chain or ramp degraded, stablecoin closed', 'Stablecoin: chain or ramp degraded'])
      : ['pass', 'Partner and chain normal'];
    let row = base;
    let g6;
    if (!fresh) g6 = ['pass', 'Payee established'];
    else if (base === 3) { g6 = ['close', 'Instant rails closed until payee confirmed', 'RTP or FedNow now: payee unconfirmed']; row = 4; }
    else if (FINAL.indexOf(base) >= 0) { g6 = ['stop', 'Confirm out of band before a final rail']; row = 17; then = base; }
    else if (base === 18) g6 = ['data', 'Confirm payee once bank details arrive'];
    else g6 = ['pass', 'No final rail in use'];
    const g = [g1, g2, g3, g4, g5, g6, g7, g8];
    if (g5[0] === 'stop') { row = 19; then = null; }
    else if (g6[0] === 'stop') { /* row 17 set above */ }
    else if (g7[0] === 'stop') { row = 13; then = null; }
    else if (g8[0] === 'stop') { row = bankDown ? 20 : 14; then = null; }
    const gates = g.map((x, k) => ({ id: 'G' + (k + 1), s: x[0], why: x[1] }));
    const at = g.findIndex((x) => x[0] === 'stop');
    const closed = g.map((x, k) => (x[0] === 'close' && x[2] ? { g: 'G' + (k + 1), t: x[2], k: x[3] || '' } : null)).filter(Boolean);
    return { row, then, gates, stop: at >= 0 ? 'G' + (at + 1) : null, closed, needs: gates.filter((x) => x.s === 'data').map((x) => x.id), final: FINAL.indexOf(row) >= 0, coin: COIN.indexOf(row) >= 0 };
  }
  /*S4-LOGIC-END*/

  const ICONS = {
    bank: '<path d="M12 32 40 16l28 16M16 32h48M22 38v20M34 38v20M46 38v20M58 38v20M14 64h52"/>',
    same: '<path d="M8 30 32 16l24 14M12 30h40M17 36v18M27 36v18M37 36v18M10 60h34"/><circle cx="58" cy="54" r="14"/><path d="M58 46v8l6 4"/>',
    instant: '<circle cx="40" cy="40" r="28"/><path d="M44 18 28 44h12l-4 18 16-26H40z"/>',
    wire: '<path d="M16 28 40 14l24 14M20 28h40M25 34v16M35 34v16M45 34v16M55 34v16M18 56h44"/><path d="M10 68h58M60 62l8 6-8 6"/>',
    wait: '<circle cx="40" cy="40" r="28"/><path d="M40 24v16l10 8"/>',
    globe: '<circle cx="40" cy="40" r="28"/><path d="M12 40h56M40 12c-13 8-13 48 0 56M40 12c13 8 13 48 0 56"/>',
    local: '<path d="M40 70S20 50 20 34a20 20 0 0 1 40 0c0 16-20 36-20 36z"/><circle cx="40" cy="34" r="7"/>',
    coin: '<path d="M12 26h50a6 6 0 0 1 6 6v28a6 6 0 0 1-6 6H18a6 6 0 0 1-6-6zM12 26l36-12v12M48 46h20"/><circle cx="54" cy="46" r="2.5"/>',
    ramp: '<circle cx="18" cy="40" r="12"/><path d="M18 34v12M36 40h12M43 35l5 5-5 5M54 38l11-8 11 8M57 43v11M65 43v11M73 43v11M54 58h22"/>',
    partner: '<circle cx="40" cy="34" r="22"/><path d="M18 34h44M40 12c-10 7-10 37 0 44M40 12c10 7 10 37 0 44M10 68h58M60 62l8 6-8 6"/>',
    decline: '<circle cx="40" cy="40" r="28"/><path d="M20.5 20.5l39 39"/>',
    hold: '<circle cx="40" cy="40" r="28"/><path d="M32 28v24M48 28v24"/>',
    ask: '<path d="M20 12h30l12 12v44H20zM50 12v12h12M30 38h22M30 48h22M30 58h12"/>',
  };
  const WORD = { info: 'Runs here', pass: 'Pass', data: 'Needs data', close: 'Closes a rail', stop: 'Stop', wait: 'Waiting' };
  const TONE = { info: 'rule', pass: 'ok', data: 'rule', close: 'rule', stop: 'risk' };
  const KEYS = ['route', 'country', 'status', 'cap', 'consent', 'token', 'data', 'speed', 'day', 'health'];
  const q = (s) => scene.querySelector(s);
  const amt = q('#sbp-s4-amt'), amtOut = q('.sbp-s4-amt-out'), stack = q('.sbp-s4-stack'), tok = q('.sbp-s4-tok');
  const out = q('.sbp-s4-out'), sr = q('.sbp-s4-sr');
  const gateEls = D.gates.map((g) => q('.sbp-s4-g[data-g="' + g.id + '"]'));
  const presetBtns = [...scene.querySelectorAll('[data-preset]')];
  const st = Object.assign({ token: 'usdc', data: 'yes' }, D.presets['us-next']);
  let touched = false, timers = [], busy = false;
  const rowOf = (n) => D.rows.find((r) => r.n === n);

  const chip = (parent, text, src, note) => {
    const b = SBP.el('button', { class: 'sbp-chip', type: 'button', 'aria-expanded': 'false', 'aria-haspopup': 'dialog', 'data-src': src.join(' ') }, parent, text);
    if (note) b.setAttribute('data-note', note);
    return b;
  };
  const setSeg = (key, val) => {
    st[key] = val; scene.setAttribute('data-' + key, val);
    const seg = q('.sbp-seg[data-key="' + key + '"]'); if (!seg) return;
    seg.querySelectorAll('button[data-val]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.val === val)));
  };
  const setAmount = (n) => {
    st.amount = Math.max(0, Math.min(3, Number(n) || 0));
    if (amt) { amt.value = String(st.amount); amt.setAttribute('aria-valuetext', D.bands[st.amount]); SBP.fill(amt); }
    if (amtOut) amtOut.textContent = D.bands[st.amount];
  };
  // route and payee country move together
  const link = (key) => {
    if (key === 'route') { if (st.route === 'domestic' && st.country !== 'us') setSeg('country', 'us'); if (st.route === 'cross' && st.country === 'us') setSeg('country', 'other'); }
    if (key === 'country') { const r = st.country === 'us' ? 'domestic' : 'cross'; if (st.route !== r) setSeg('route', r); }
  };
  const markPreset = () => presetBtns.forEach((b) => { const p = D.presets[b.dataset.preset]; b.setAttribute('aria-pressed', String(!!p && Object.keys(p).every((k) => p[k] === st[k]))); });

  // The reason line always holds its final text, so a waiting gate keeps its height.
  const paintGate = (k, g, waiting) => {
    const li = gateEls[k]; if (!li) return;
    const s0 = waiting ? 'wait' : g.s;
    li.dataset.s = s0;
    if (TONE[s0]) li.dataset.m = TONE[s0]; else li.removeAttribute('data-m');
    const s = li.querySelector('.sbp-s4-gs'), w = li.querySelector('.sbp-s4-gw');
    if (s) s.textContent = WORD[s0] || '';
    if (w) w.textContent = g.why || '';
  };
  const moveTok = (k) => {
    const li = gateEls[k]; if (!tok || !li || !stack) return;
    tok.style.transform = 'translateY(' + Math.round(li.offsetTop + li.offsetHeight / 2 - 28) + 'px)';
    if (li.dataset.m) tok.dataset.m = li.dataset.m; else tok.removeAttribute('data-m');
  };
  const lastOf = (res) => (res.stop ? Number(res.stop.slice(1)) - 1 : res.gates.length - 1);
  const paintResult = (res) => {
    const row = rowOf(res.row); if (!row || !out) return;
    out.dataset.m = row.m; out.dataset.row = String(row.n);
    const role = out.querySelector('.sbp-s4-role span'), ico = out.querySelector('.sbp-s4-ico'), rail = out.querySelector('.sbp-s4-rail');
    const why = out.querySelector('.sbp-s4-why'), flags = out.querySelector('.sbp-s4-flags'), not = out.querySelector('.sbp-s4-not');
    const thenEl = out.querySelector('.sbp-s4-then'), cond = out.querySelector('.sbp-s4-cond');
    const next = res.then ? rowOf(res.then) : null;
    if (role) role.textContent = row.role;
    if (ico) ico.innerHTML = ICONS[row.kind] || ICONS.bank;
    if (rail) rail.textContent = row.rail;
    if (thenEl) { thenEl.textContent = next ? 'Then: ' + next.rail : ''; thenEl.hidden = !next; }
    if (why) { why.textContent = ''; if (row.src && row.src.length) chip(why, row.reason, row.src, row.note); else why.textContent = row.reason; }
    const bits = [];
    if (res.stop) bits.push((row.n === 13 ? 'Declined at ' : 'Held at ') + res.stop);
    if (res.needs.length) bits.push((res.stop ? 'Needs data at ' : 'Only once data is complete at ') + res.needs.join(', '));
    if (flags) { flags.textContent = bits.join('. '); flags.hidden = !bits.length; flags.dataset.m = res.stop ? 'risk' : 'rule'; }
    if (cond) { cond.textContent = ''; (row.cond || []).forEach((c) => SBP.el('li', null, cond, c)); cond.hidden = !(row.cond && row.cond.length); }
    const lines = [];
    res.closed.forEach((c) => { const g = D.gates.find((x) => x.id === c.g); const alt = c.k && D.closeSrc ? D.closeSrc[c.k] : null; lines.push({ t: c.t, src: alt ? alt.src : g ? g.src : null, note: alt ? alt.note : g ? g.note : null }); });
    const head = (t) => t.split(':')[0].replace(/ now$/, '');
    const seen = (l) => lines.some((x) => head(x.t) === head(l.t) || head(x.t).indexOf(head(l.t)) >= 0);
    (row.not || []).forEach((l) => { if (!seen(l)) lines.push(l); });
    if (not) { not.textContent = ''; lines.slice(0, 4).forEach((l) => { const li = SBP.el('li', null, not); if (l.src && l.src.length) chip(li, l.t, l.src, l.note); else li.textContent = l.t; }); }
    const sg = res.stop ? res.gates.find((x) => x.id === res.stop) : null;
    if (sr) sr.textContent = 'Result: ' + row.rail + '.' + (next ? ' Then ' + next.rail + '.' : '') + ' ' + row.reason + '.' + (sg ? ' Stopped at ' + sg.id + ': ' + sg.why + '.' : '') + res.closed.map((c) => ' ' + c.g + ' closes a rail. ' + c.t + '.').join('') + (res.needs.length ? ' Needs data at ' + res.needs.join(', ') + '.' : '') + ' This is a judgement.';
    out.classList.remove('is-busy', 'is-new'); void out.offsetWidth; out.classList.add('is-new');
  };

  const run = (animate) => {
    timers.forEach(clearTimeout); timers = [];
    const res = choose(st);
    const n = res.gates.length;
    markPreset();
    if (!animate || SBP.still || !scene.classList.contains('is-in')) {
      res.gates.forEach((g, k) => paintGate(k, g)); moveTok(lastOf(res)); paintResult(res); busy = false; return;
    }
    busy = true; if (out) out.classList.add('is-busy');
    res.gates.forEach((g, k) => paintGate(k, g, true));
    if (tok) { tok.classList.add('is-drop'); moveTok(0); }
    for (let k = 0; k < n; k++) timers.push(setTimeout(() => { paintGate(k, res.gates[k]); moveTok(k); }, 90 + k * 120));
    timers.push(setTimeout(() => { res.gates.forEach((g, k) => paintGate(k, g)); moveTok(lastOf(res)); paintResult(res); busy = false; }, 90 + n * 120 + 120));
  };

  const apply = (name) => { const p = D.presets[name]; if (!p) return; KEYS.forEach((k) => { if (p[k] !== undefined) setSeg(k, p[k]); }); setAmount(p.amount); run(true); };

  scene.addEventListener('sbp:set', (e) => {
    const d = e.detail || {}; if (!KEYS.includes(d.key) || st[d.key] === d.value) return;
    st[d.key] = d.value; touched = true; link(d.key); run(true);
  });
  if (amt) amt.addEventListener('input', () => { touched = true; setAmount(amt.value); run(true); });
  presetBtns.forEach((b) => b.addEventListener('click', () => { touched = true; apply(b.dataset.preset); }));
  // play the gate run once, on first view. Later visits keep the result card and any open source card.
  scene.addEventListener('sbp:in', () => { if (!busy) run(true); }, { once: true });
  if (stack) SBP.onResize(stack, () => { if (!busy) moveTok(lastOf(choose(st))); });
  SBP.onReader((r) => { if (touched) return; const name = D.readers && D.readers[r]; if (name) apply(name); });

  // start from the scene's own state so the page is right before a reader is set
  KEYS.forEach((k) => setSeg(k, st[k])); setAmount(st.amount); run(false);
})();

/* Scene 5: the rules timeline. */
(function () {
  const SBP = window.SBP; if (!SBP) return; const root = SBP.root;
  const scene = root.querySelector('#sbp-rules'); if (!scene) return;
  let D = null; try { D = SBP.data('s5-timeline'); } catch (e) { D = null; }
  if (!D || !Array.isArray(D.entries)) return;
  let SRCS = {}; try { SRCS = SBP.data('sources') || {}; } catch (e) { SRCS = {}; }
  const board = scene.querySelector('.sbp-s5-board');
  const chart = scene.querySelector('.sbp-s5-chart');
  const svg = scene.querySelector('.sbp-s5-svg');
  const marks = scene.querySelector('.sbp-s5-marks');
  const sweep = scene.querySelector('.sbp-s5-sweep');
  const flag = scene.querySelector('.sbp-s5-flag');
  const alwaysH = scene.querySelector('.sbp-s5-always-h');
  const detail = scene.querySelector('.sbp-s5-detail');
  const range = scene.querySelector('.sbp-s5-range input');
  const out = scene.querySelector('.sbp-s5-out');
  const playBtn = scene.querySelector('.sbp-s5-playbtn');
  const todayBtn = scene.querySelector('.sbp-s5-todaybtn');
  if (!board || !chart || !svg || !marks || !sweep || !detail) return;

  const DAY = 864e5;
  const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const T = (s) => { const p = String(s).split('-'); return Date.UTC(+p[0], +p[1] - 1, +p[2]); };
  const fmt = (ms) => { const d = new Date(ms); return MONTHS[d.getUTCMonth()] + ' ' + d.getUTCDate() + ', ' + d.getUTCFullYear(); };
  const TODAY = T(D.today), S0 = T(D.sweep[0]), S1 = T(D.sweep[1]), A0 = T(D.axis[0]), A1 = T(D.axis[1]);
  const MAX = Math.round((S1 - S0) / DAY), NOW = Math.round((TODAY - S0) / DAY);
  const LANES = D.lanes || [];
  const laneName = (id) => { const l = LANES.find((x) => x.id === id); return l ? l.name : ''; };
  const GLYPH = {
    force: '<circle cx="15" cy="15" r="10" fill="currentColor"/>',
    proposed: '<circle cx="15" cy="15" r="9" fill="none" stroke="currentColor" stroke-width="3"/>',
    target: '<circle cx="15" cy="15" r="9" fill="none" stroke="currentColor" stroke-width="2.5" stroke-dasharray="4 3.5"/>',
    limited: '<circle cx="15" cy="15" r="9" fill="none" stroke="currentColor" stroke-width="3"/><path d="M15 6a9 9 0 0 0 0 18z" fill="currentColor"/>',
    fixed: '<circle cx="15" cy="15" r="12" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="15" cy="15" r="6.5" fill="none" stroke="currentColor" stroke-width="3"/>',
  };
  const glyph = (st) => '<svg viewBox="0 0 30 30" aria-hidden="true">' + (GLYPH[st] || GLYPH.force) + '</svg>';
  const ROLE = { force: 'ok', proposed: 'rule' };

  const E = D.entries.map((e) => Object.assign({}, e, { tm: e.t ? T(e.t) : null }));
  const standing = E.filter((e) => e.tm == null);
  const dated = E.filter((e) => e.tm != null).sort((a, b) => a.tm - b.tm);
  const state = { lane: 'all', st: 'all', sel: 'eff', line: NOW, mode: 'h', playing: false };
  let geo = null, raf = 0;

  // markers
  const mk = (e) => {
    const b = SBP.el('button', { type: 'button', class: 'sbp-s5-mk', 'data-st': e.st, 'data-lane': e.lane, 'data-id': e.id, 'aria-pressed': 'false' }, marks);
    if (ROLE[e.st]) b.setAttribute('data-m', ROLE[e.st]);
    if (e.tm == null) b.classList.add('sbp-s5-mk-always');
    b.setAttribute('aria-label', e.when + ': ' + e.label + '. ' + e.status + '. Binds ' + e.binds + '.');
    const g = SBP.el('span', { class: 'sbp-s5-mk-g' }, b); g.innerHTML = glyph(e.g || e.st);
    const t = SBP.el('span', { class: 'sbp-s5-mk-t' }, b);
    SBP.el('span', { class: 'sbp-s5-mk-s' }, t, e.short || e.label);
    SBP.el('span', { class: 'sbp-s5-mk-l' }, t, e.label);
    SBP.el('span', { class: 'sbp-s5-mk-d' }, t, e.when + ' · ' + e.status);
    b.addEventListener('click', () => select(e.id, true));
    e.btn = b;
  };
  standing.forEach(mk); dated.forEach(mk);

  // detail card
  const chip = (text, ids, note) => {
    const c = SBP.el('button', { type: 'button', class: 'sbp-chip', 'data-src': ids.join(' '), 'aria-expanded': 'false', 'aria-haspopup': 'dialog' }, null, text);
    if (note) c.setAttribute('data-note', note);
    return c;
  };
  const renderDetail = () => {
    const e = E.find((x) => x.id === state.sel); if (!e) return;
    detail.textContent = '';
    const head = SBP.el('div', { class: 'sbp-s5-d-head' }, detail);
    const when = SBP.el('p', { class: 'sbp-s5-d-when' }, head); when.appendChild(chip(e.when, e.src, e.note));
    SBP.el('p', { class: 'sbp-cap sbp-s5-d-label' }, head, e.label);
    const badge = SBP.el('span', { class: 'sbp-s5-badge', 'data-st': e.st }, head); if (ROLE[e.st]) badge.setAttribute('data-m', ROLE[e.st]);
    if (e.g) badge.setAttribute('data-g', e.g); badge.innerHTML = glyph(e.g || e.st); badge.appendChild(document.createTextNode(e.status));
    const binds = SBP.el('p', { class: 'sbp-s5-d-binds' }, head); SBP.el('span', { class: 'sbp-label' }, binds, 'Binds'); binds.appendChild(document.createTextNode(' ' + e.binds));
    const body = SBP.el('dl', { class: 'sbp-s5-d-body' }, detail);
    const row = (k, v, m) => { const r = SBP.el('div', { 'data-m': m }, body); const dt = SBP.el('dt', { class: 'sbp-label' }, r); SBP.el('span', { class: 'sbp-dot' }, dt); dt.appendChild(document.createTextNode(k)); SBP.el('dd', null, r, v); };
    row('For a payer', e.payer, 'flow'); row('For a payout platform', e.plat, 'coin');
    const ev = SBP.el('div', { class: 'sbp-s5-d-ev' }, detail);
    SBP.el('span', { class: 'sbp-label' }, ev, 'Evidence');
    const groups = []; const seen = {};
    e.src.forEach((id, n) => { const s = SRCS[id]; const name = s && s.p ? s.p : 'Source ' + (n + 1); if (seen[name]) seen[name].push(id); else { seen[name] = [id]; groups.push(name); } });
    groups.forEach((name) => ev.appendChild(chip(name, seen[name])));
  };

  const matches = (e) => (state.lane === 'all' || e.lane === state.lane) && (state.st === 'all' || e.st === state.st);
  const lineMs = () => S0 + state.line * DAY;
  const paint = (ping) => {
    const lm = lineMs();
    E.forEach((e) => {
      const lit = e.tm == null || e.tm <= lm; const b = e.btn; if (!b) return;
      const was = b.classList.contains('is-lit');
      b.classList.toggle('is-lit', lit); b.classList.toggle('is-ahead', !lit);
      b.classList.toggle('is-off', !matches(e) && e.id !== state.sel);
      b.classList.toggle('is-sel', e.id === state.sel);
      b.setAttribute('aria-pressed', String(e.id === state.sel));
      if (ping && lit && !was && !SBP.still) { b.classList.add('is-ping'); setTimeout(() => b.classList.remove('is-ping'), 700); }
    });
    if (alwaysH) alwaysH.classList.toggle('is-empty', standing.every((e) => !matches(e) && e.id !== state.sel));
  };
  function select(id, user) {
    state.sel = id; paint(false); renderDetail();
    if (user && detail.scrollIntoView) detail.scrollIntoView({ block: 'nearest', behavior: SBP.still ? 'auto' : 'smooth' });
  }

  // filters
  const laneBtns = [...scene.querySelectorAll('.sbp-s5-lane[data-lane]')];
  const stBtns = [...scene.querySelectorAll('.sbp-s5-pills [data-st]')];
  const setLane = (v) => { state.lane = v; laneBtns.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lane === v))); board.setAttribute('data-lane', v); paint(false); };
  const setSt = (v) => { state.st = v; stBtns.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.st === v))); paint(false); };
  laneBtns.forEach((b) => b.addEventListener('click', () => setLane(state.lane === b.dataset.lane ? 'all' : b.dataset.lane)));
  stBtns.forEach((b) => b.addEventListener('click', () => setSt(state.st === b.dataset.st ? 'all' : b.dataset.st)));

  // sweep line
  const placeSweep = () => {
    const lm = lineMs();
    if (flag) flag.textContent = fmt(lm);
    if (state.mode === 'h' && geo) {
      const x = geo.x(lm);
      sweep.style.left = x + 'px'; sweep.style.height = geo.bottom + 'px'; sweep.style.order = '';
      if (flag) { const fw = flag.offsetWidth || 150; const shift = Math.min(0, geo.cw - 4 - (x + fw / 2)); flag.style.transform = 'translateX(calc(-50% + ' + shift + 'px))'; }
    } else {
      sweep.style.left = ''; sweep.style.height = '';
      if (flag) flag.style.transform = '';
      sweep.style.order = String(2 * dated.filter((e) => e.tm <= lm).length + 1);
    }
  };
  const setLine = (v, ping) => {
    state.line = Math.max(0, Math.min(MAX, Math.round(v)));
    const txt = fmt(lineMs());
    if (range) { range.value = String(state.line); SBP.fill(range); range.setAttribute('aria-valuetext', txt + ', ' + dated.filter((e) => e.tm <= lineMs()).length + ' of ' + dated.length + ' dated entries passed'); }
    if (out) out.textContent = txt;
    paint(ping); placeSweep();
  };
  const stop = () => { state.playing = false; if (raf) cancelAnimationFrame(raf); raf = 0; if (playBtn) { playBtn.textContent = 'Play'; playBtn.setAttribute('aria-pressed', 'false'); } };
  const play = () => {
    if (state.playing) { stop(); return; }
    if (SBP.still) { const lm = lineMs(); const nx = dated.find((e) => e.tm > lm); setLine(nx ? Math.round((nx.tm - S0) / DAY) : 0, false); return; }
    state.playing = true; if (playBtn) { playBtn.textContent = 'Pause'; playBtn.setAttribute('aria-pressed', 'true'); }
    setLine(0, false);
    const DUR = 11000; let start = 0;
    const tick = (now) => { if (!state.playing) return; if (!start) start = now; const p = Math.min(1, (now - start) / DUR); setLine(p * MAX, true); if (p < 1) raf = requestAnimationFrame(tick); else stop(); };
    raf = requestAnimationFrame(tick);
  };
  if (playBtn) playBtn.addEventListener('click', play);
  if (todayBtn) todayBtn.addEventListener('click', () => { stop(); setLine(NOW, false); });
  if (range) { range.max = String(MAX); range.addEventListener('input', () => { stop(); setLine(Number(range.value), false); }); }

  // layout
  const clear = (n) => { n.style.left = ''; n.style.top = ''; n.style.width = ''; n.style.height = ''; n.style.order = ''; };
  const layoutV = () => {
    geo = null; chart.style.height = ''; svg.textContent = '';
    laneBtns.forEach(clear); if (alwaysH) { clear(alwaysH); alwaysH.style.order = '-1'; }
    standing.forEach((e) => { clear(e.btn); e.btn.classList.remove('is-flip'); e.btn.style.order = '0'; });
    dated.forEach((e, i) => { clear(e.btn); e.btn.classList.remove('is-flip'); e.btn.style.order = String(2 * i + 2); });
  };
  const layoutH = () => {
    const cw = chart.clientWidth; if (!cw) return;
    const LW = 150, AW = Math.min(210, Math.max(170, Math.round(cw * 0.18))), HEAD = 52, ROW = 46, PAD = 10, MINH = 164, GAP = 6;
    const x0 = LW + AW + 30, x1 = cw - 28;
    const x = (ms) => x0 + ((Math.max(A0, Math.min(A1, ms)) - A0) / (A1 - A0)) * (x1 - x0);
    const tx = x(TODAY);
    dated.forEach((e) => { clear(e.btn); e.btn.classList.remove('is-flip'); });
    standing.forEach((e) => { clear(e.btn); e.btn.style.width = (AW - 12) + 'px'; });
    let y = HEAD; const bands = [];
    LANES.forEach((ln) => {
      const items = dated.filter((e) => e.lane === ln.id); const rows = [];
      items.forEach((e) => {
        const w = e.btn.offsetWidth || 160; const cx = x(e.tm);
        let a = cx - 21, b = a + w; const flip = b > cw - 4 || (e.tm < TODAY && b > tx - 6 && cx + 21 - w > x0 - 24);
        if (flip) { b = cx + 21; a = b - w; }
        e.btn.classList.toggle('is-flip', flip);
        let r = 0; while (rows[r] && rows[r].some((iv) => a < iv[1] + GAP && b > iv[0] - GAP)) r += 1;
        (rows[r] = rows[r] || []).push([a, b]); e._r = r; e._a = a;
      });
      const st = standing.filter((e) => e.lane === ln.id);
      const n = Math.max(rows.length, st.length, 1);
      const h = Math.max(n * ROW + PAD * 2, MINH); const off = y + (h - n * ROW) / 2;
      items.forEach((e) => { e.btn.style.left = Math.round(e._a) + 'px'; e.btn.style.top = Math.round(off + e._r * ROW + 2) + 'px'; });
      st.forEach((e, i) => { e.btn.style.left = (LW + 6) + 'px'; e.btn.style.top = Math.round(y + (h - st.length * ROW) / 2 + i * ROW + 2) + 'px'; });
      const lb = laneBtns.find((b) => b.dataset.lane === ln.id);
      if (lb) { lb.style.top = (y + 4) + 'px'; lb.style.height = (h - 8) + 'px'; lb.style.width = (LW - 10) + 'px'; }
      bands.push({ id: ln.id, y, h }); y += h;
    });
    const all = laneBtns.find((b) => b.dataset.lane === 'all'); if (all) { all.style.top = '4px'; all.style.height = '42px'; all.style.width = (LW - 10) + 'px'; }
    if (alwaysH) { alwaysH.style.left = (LW + 14) + 'px'; alwaysH.style.top = '20px'; }
    const H = y + 40; chart.style.height = H + 'px';
    svg.textContent = ''; svg.setAttribute('viewBox', '0 0 ' + cw + ' ' + H); svg.setAttribute('width', cw); svg.setAttribute('height', H);
    bands.forEach((b, i) => { SBP.svg('rect', { x: 0, y: b.y, width: cw, height: b.h, class: 'sbp-s5-band' + (i % 2 ? ' is-alt' : ''), 'data-lane': b.id }, svg); SBP.svg('line', { x1: 0, x2: cw, y1: b.y, y2: b.y, class: 'sbp-s5-rule' }, svg); });
    SBP.svg('line', { x1: 0, x2: cw, y1: y, y2: y, class: 'sbp-s5-axis' }, svg);
    SBP.svg('rect', { x: LW, y: 8, width: AW, height: y - 8, rx: 14, class: 'sbp-s5-alwayscol' }, svg);
    const y0 = new Date(A0).getUTCFullYear(), y1 = new Date(A1).getUTCFullYear();
    for (let yr = y0; yr <= y1; yr += 1) {
      const gx = x(Date.UTC(yr, 0, 1));
      SBP.svg('line', { x1: gx, x2: gx, y1: HEAD, y2: y + 8, class: 'sbp-s5-grid' }, svg);
      SBP.svg('text', { x: gx, y: y + 28, class: 'sbp-s5-year', 'text-anchor': yr === y0 ? 'start' : 'middle' }, svg).textContent = String(yr);
      for (let qn = 1; qn < 4; qn += 1) { const qx = x(Date.UTC(yr, qn * 3, 1)); if (Date.UTC(yr, qn * 3, 1) < A1) SBP.svg('line', { x1: qx, x2: qx, y1: y, y2: y + 6, class: 'sbp-s5-grid' }, svg); }
    }
    SBP.svg('line', { x1: tx, x2: tx, y1: HEAD - 4, y2: y, class: 'sbp-s5-today' }, svg);
    SBP.svg('text', { x: tx + 6, y: HEAD + 10, class: 'sbp-s5-todaytxt' }, svg).textContent = 'Today';
    geo = { x, cw, bottom: y };
  };
  const layout = () => {
    const w = board.clientWidth; if (!w) return;
    state.mode = w < 780 ? 'v' : 'h'; board.setAttribute('data-mode', state.mode);
    if (state.mode === 'h') layoutH(); else layoutV();
    placeSweep();
  };
  SBP.onResize(board, layout);
  scene.addEventListener('sbp:in', layout);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(layout).catch(() => {});

  setLane('all'); setSt('all'); setLine(NOW, false); select(state.sel, false);
  SBP.onReader(() => { setLane('all'); layout(); });
})();

/* s6: Your brief. Links back to screens, evidence limits, copy and print. */
(function () {
  const SBP = window.SBP; if (!SBP) return; const root = SBP.root;
  const scene = root.querySelector('.sbp-s6-scene'); if (!scene) return;
  const sheet = scene.querySelector('.sbp-s6-sheet');
  const status = scene.querySelector('[data-s6-status]');
  const urlBox = scene.querySelector('[data-s6-url]');

  // Announce a result. The text is cleared first so a repeat is read again.
  const takeStatus = scene.querySelector('[data-s6-takestatus]');
  let sayT = 0;
  const say = (t, where) => {
    const el = where || status; if (!el) return;
    el.textContent = '';
    clearTimeout(sayT);
    sayT = setTimeout(() => { el.textContent = t; }, 60);
  };

  // Links back to the screen that answers a question. The seat stays in the address.
  scene.querySelectorAll('a[data-s6-go]').forEach((a) => a.addEventListener('click', (e) => {
    const id = (a.getAttribute('href') || '').replace(/^#/, '');
    const target = id ? document.getElementById(id) : null;
    if (!target || !root.contains(target)) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: SBP.still ? 'auto' : 'smooth', block: 'start' });
    const head = target.querySelector('.sbp-q') || target;
    if (!head.hasAttribute('tabindex')) head.setAttribute('tabindex', '-1');
    try { head.focus({ preventScroll: true }); } catch (err) { head.focus(); }
  }));

  // Limits of the evidence: four counters, one list open at a time.
  const gaps = Array.from(scene.querySelectorAll('[data-s6-gap]'));
  const panelOf = (b) => { const id = b.getAttribute('aria-controls'); return id ? document.getElementById(id) : null; };
  const openGap = (which) => gaps.forEach((b) => {
    const on = b === which;
    b.setAttribute('aria-expanded', String(on));
    const p = panelOf(b); if (p) p.hidden = !on;
  });
  gaps.forEach((b) => b.addEventListener('click', () => openGap(b.getAttribute('aria-expanded') === 'true' ? null : b)));
  if (gaps.length) openGap(gaps[0]);

  // Seat change: the sheet resets with a short pop.
  let first = true;
  SBP.onReader(() => {
    if (status) status.textContent = '';
    if (takeStatus) takeStatus.textContent = '';
    if (urlBox) urlBox.hidden = true;
    if (!first && sheet && !SBP.still) { sheet.classList.remove('is-tune'); void sheet.offsetWidth; sheet.classList.add('is-tune'); }
    first = false;
  });

  // Copy: async clipboard first, then a hidden text area, then a visible field to copy by hand.
  const legacyCopy = (text) => {
    let ok = false; let ta = null;
    try {
      ta = document.createElement('textarea');
      ta.value = text; ta.setAttribute('readonly', ''); ta.setAttribute('aria-hidden', 'true');
      ta.style.position = 'fixed'; ta.style.top = '0'; ta.style.left = '0'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.focus(); ta.select(); ta.setSelectionRange(0, text.length);
      ok = document.execCommand('copy');
    } catch (e) { ok = false; }
    if (ta && ta.parentNode) ta.parentNode.removeChild(ta);
    return ok;
  };
  const copyText = (text) => new Promise((resolve) => {
    const fallback = () => resolve(legacyCopy(text));
    try {
      if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') navigator.clipboard.writeText(text).then(() => resolve(true), fallback);
      else fallback();
    } catch (e) { fallback(); }
  });
  const link = () => String(location.href).split('#')[0] + '#reader=' + (SBP.reader || 'buyer');
  const takeText = () => {
    const out = [];
    scene.querySelectorAll('[data-s6-take] [data-s6-list]').forEach((list) => {
      const gate = list.classList.contains('sbp-s6-gates');
      out.push(list.getAttribute('data-s6-list'));
      Array.from(list.children).forEach((li, i) => {
        const name = li.querySelector('b'); const what = li.querySelector('span');
        out.push((gate ? 'G' + (i + 1) : String(i + 1)) + '. ' + (name ? name.textContent.trim() : '') + ': ' + (what ? what.textContent.trim() : ''));
      });
      out.push('');
    });
    out.push('A design sketch and a judgement. Research only.');
    return out.join('\n');
  };

  scene.querySelectorAll('[data-s6-act]').forEach((b) => b.addEventListener('click', () => {
    const act = b.getAttribute('data-s6-act');
    if (act === 'print') { window.print(); return; }
    if (act === 'take') {
      copyText(takeText()).then((ok) => { b.focus(); say(ok ? 'States and gates copied' : 'Copy failed. Select the list above to copy it.', takeStatus); });
      return;
    }
    const url = link();
    copyText(url).then((ok) => {
      if (ok) { if (urlBox) urlBox.hidden = true; b.focus(); say('Link copied'); return; }
      if (urlBox) {
        urlBox.value = url; urlBox.hidden = false;
        try { urlBox.focus(); urlBox.select(); } catch (e) { /* ignore */ }
        say('Copy failed. The link is selected in the field, ready to copy.');
      } else say('Copy failed. Link: ' + url);
    });
  }));
})();
