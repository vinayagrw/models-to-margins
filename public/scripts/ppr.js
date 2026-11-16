/* Source notes for evidence chips. Exposes window.pprKit = { root, el, json, still, closeCard, wireChips }.
   Call wireChips() after you add chips to the page from script. */
(function () {
  const root = document.querySelector('.ppr');
  if (!root) return;
  root.classList.add('ppr-js');
  const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const el = (tag, attrs, parent, text) => { const n = document.createElement(tag); for (const k in (attrs || {})) n.setAttribute(k, attrs[k]); if (text != null) n.textContent = text; if (parent) parent.appendChild(n); return n; };
  const json = (name) => { const s = root.querySelector('script[data-ppr="' + name + '"]'); try { return s ? JSON.parse(s.textContent) : null; } catch (e) { return null; } };
  const SRC = json('sources') || {};
  // source notes: <button class="ppr-chip" data-src="G#38" data-note="optional caveat">
  let card = null, owner = null;
  // clears both variables before removing the node, because removal fires focusout, which calls this again
  function closeCard(refocus) {
    const c = card, o = owner; card = null; owner = null;
    if (c && c.parentNode) c.parentNode.removeChild(c);
    if (o) { o.setAttribute('aria-expanded', 'false'); if (refocus && o.isConnected) o.focus(); }
  }
  const openCard = (chip, byKey) => {
    closeCard();
    const ids = (chip.dataset.src || '').split(/[\s,]+/).filter(Boolean);
    card = el('div', { class: 'ppr-card', role: 'dialog', 'aria-label': 'Source' }, root);
    const srcs = []; const seenU = new Set();
    ids.forEach((id) => { const s = SRC[id]; if (!s || seenU.has(s.u)) return; seenU.add(s.u); srcs.push(s); });
    const pubs = [...new Set(srcs.map((s) => s.p))];
    el('strong', null, card, !srcs.length ? 'Source' : pubs.length === 1 ? pubs[0] : srcs.length + ' sources');
    if (pubs.length === 1 && srcs[0].i) el('em', null, card, 'Interest: ' + srcs[0].i);
    if (pubs.length > 1) { const seenP = new Set(); srcs.forEach((s) => { if (s.i && !seenP.has(s.p)) { seenP.add(s.p); el('em', null, card, s.p + ': ' + s.i); } }); }
    if (chip.dataset.note) el('span', null, card, chip.dataset.note);
    srcs.forEach((s, n) => { const a = el('a', { href: s.u, rel: 'noopener', target: '_blank' }, card, pubs.length > 1 ? s.p : srcs.length > 1 ? 'Source ' + (n + 1) : 'Open source'); a.setAttribute('aria-label', 'Open source: ' + s.p); });
    const r = chip.getBoundingClientRect(), rr = root.getBoundingClientRect();
    let x = r.left - rr.left; const w = card.offsetWidth; if (x + w > rr.width) x = Math.max(0, rr.width - w);
    card.style.left = x + 'px'; card.style.top = (r.bottom - rr.top + 8) + 'px';
    owner = chip; chip.setAttribute('aria-expanded', 'true');
    const mine = card; const links = [...mine.querySelectorAll('a')];
    if (byKey && links[0]) links[0].focus();
    // Tab past either end of the note returns to its chip, so the reader keeps their place
    mine.addEventListener('keydown', (e) => {
      if (e.key !== 'Tab' || card !== mine) return;
      const edge = e.shiftKey ? links[0] : links[links.length - 1];
      if (document.activeElement === edge) { e.preventDefault(); closeCard(true); }
    });
    mine.addEventListener('focusout', (e) => { if (card !== mine) return; if (!mine.contains(e.relatedTarget)) closeCard(false); });
  };
  root.addEventListener('click', (e) => { const c = e.target.closest('.ppr-chip'); if (c) { e.preventDefault(); if (owner === c) closeCard(); else openCard(c, e.detail === 0); } else if (!e.target.closest('.ppr-card')) closeCard(); });
  document.addEventListener('click', (e) => { if (card && !root.contains(e.target)) closeCard(); });
  document.addEventListener('keydown', (e) => {
    if (!card) return;
    if (e.key === 'Escape') { closeCard(true); return; }
    if (e.key === 'Tab' && !e.shiftKey && document.activeElement === owner) { const a = card.querySelector('a'); if (a) { e.preventDefault(); a.focus(); } }
  });
  window.addEventListener('scroll', () => { if (card) closeCard(); }, { passive: true });
  let lastW = window.innerWidth;
  window.addEventListener('resize', () => { if (window.innerWidth !== lastW) { lastW = window.innerWidth; closeCard(); } });
  const wireChips = () => root.querySelectorAll('.ppr-chip').forEach((c) => { c.setAttribute('type', 'button'); c.removeAttribute('tabindex'); c.setAttribute('aria-expanded', 'false'); c.setAttribute('aria-haspopup', 'dialog'); });

  wireChips();
  window.pprKit = { root, el, json, still, closeCard, wireChips };
})();

/* Payment replay console with the memo as its ending.
   One state: fault, rail, run, seat, vol, preset. It lives on the root as data attributes and in the URL hash. */
(function () {
  const K = window.pprKit; if (!K) return;
  const root = K.root, S = K.json('memo');
  const $ = (s) => root.querySelector(s), $$ = (s) => [...root.querySelectorAll(s)];
  const FAULTS = ['bank', 'dup', 'sanc', 'none'], RAILS = ['ach', 'wire', 'instant', 'stable'];
  const STEP = 500, N = 10;
  const steps = $$('[data-step]');
  const lane = $('.ppr-lane'), scroller = $('.ppr-scroll');
  const marker = $('.ppr-marker'), fill = $('.ppr-fill');
  const sayN = $('.ppr-say'), has = (o, k) => Object.prototype.hasOwnProperty.call(o, k);
  let wt = null;
  const stat = $('.ppr-stat-t'), runB = $('.ppr-run'), runT = $('.ppr-run-t'), resetB = $('.ppr-reset');
  if (!lane || !runB) return;
  const st = { fault: 'bank', rail: 'wire', run: 'idle', seat: 'buyer', vol: 120000, preset: 'a' };
  if (S && S.default) { st.seat = S.default.seat; st.vol = S.default.vol; st.preset = S.default.preset; }
  let at = 0, timer = null;

  // ---- memo helpers
  const fmt = (n) => Math.round(n).toLocaleString('en-US');
  const clamp = (v) => Math.min(1000000, Math.max(1000, Math.round(v) || 120000));
  const toPos = (v) => Math.round(90 * Math.log10(v / 1000) / 3);
  const fromPos = (p) => { const x = Math.pow(10, 3 + 3 * p / 90), m = Math.pow(10, Math.floor(Math.log10(x)) - 1); return clamp(Math.round(x / m) * m); };
  function money(x) {
    if (x >= 1e9) return '$' + (x / 1e9).toFixed(1) + ' billion';
    if (x >= 1e6) return '$' + (x / 1e6).toFixed(2) + ' million';
    const step = x >= 1e5 ? 1000 : x >= 1e4 ? 100 : x >= 1000 ? 10 : 1;
    return '$' + fmt(Math.round(x / step) * step);
  }
  const slot = (k) => $('[data-o="' + k + '"]');
  const last = {};
  function flash(n, quiet) {
    if (quiet || K.still || !n) return;
    n.classList.remove('ppr-m-flash'); void n.offsetWidth; n.classList.add('ppr-m-flash');
  }
  // writes a slot only when its value changed, and marks the change
  function put(key, val, quiet, html) {
    if (last[key] === val) return;
    const first = !(key in last); last[key] = val;
    const n = slot(key); if (!n) return;
    if (html) n.innerHTML = val; else n.textContent = val;
    flash(n.closest('.ppr-chip') ? n.parentNode : n, quiet || first);
  }
  function memo(quiet) {
    if (!S) return;
    const seat = S.seat[st.seat], p = S.presets[st.preset];
    $$('.ppr-m-seg button').forEach((b) => b.setAttribute('aria-pressed', String(String(st[b.dataset.k]) === b.dataset.v)));
    put('seat', seat.name, quiet);
    put('find', seat.find, quiet, true);
    put('acts', seat.acts, quiet, true);
    $$('.ppr-m-c').forEach((c) => {
      const k = seat.picks.indexOf(c.dataset.id) + 1, was = +(c.dataset.pick || 0);
      if (k === was) return;
      if (k) c.dataset.pick = k; else delete c.dataset.pick;
      c.querySelector('.ppr-m-n').setAttribute('data-n', k || '');
      if (k) flash(c, quiet);
    });
    const share = st.vol / (p.pay * 1e9);
    const procN = p.pay * 1e9 * p.cost * p.auto / 100 * p.save / 100, fraudN = S.losses * 1e9 * p.fraud / 100;
    const proc = procN * share, fraud = fraudN * share;
    put('vol', fmt(st.vol), quiet);
    put('pname', S.pname[st.preset], quiet);
    put('tot', money(proc + fraud), quiet);
    put('proc', money(proc), quiet);
    put('fraud', money(fraud), quiet);
    put('nat', money(procN + fraudN), quiet);
    put('auto', p.auto + '%', quiet); put('save', p.save + '%', quiet); put('fr', p.fraud + '%', quiet);
    put('date', new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }), true);
    const num = $('.ppr-m-num'), rng = $('.ppr-m-rng');
    if (num && document.activeElement !== num) num.value = fmt(st.vol);
    if (rng) {
      if (fromPos(+rng.value) !== st.vol) rng.value = toPos(st.vol);
      rng.setAttribute('aria-valuetext', fmt(st.vol) + ' payments a year');
      rng.style.setProperty('--f', (toPos(st.vol) / 0.9) + '%');
    }
    root.dataset.seat = st.seat; root.dataset.vol = String(st.vol); root.dataset.preset = st.preset;
    K.wireChips();
  }

  // ---- the run
  const nodeAt = (i) => lane.querySelector('[data-step="' + i + '"]');
  function place(follow) {
    const n = nodeAt(Math.max(0, at - 1)); if (!n) return;
    const x = at ? n.offsetLeft + n.offsetWidth / 2 : nodeAt(0).offsetLeft + nodeAt(0).offsetWidth / 2;
    marker.style.left = x + 'px'; fill.style.width = (at ? x : 0) + 'px';
    if (follow && scroller.scrollWidth > scroller.clientWidth + 1) scroller.scrollTo({ left: Math.max(0, x - scroller.clientWidth / 2), behavior: K.still ? 'auto' : 'smooth' });
  }
  function paint(follow, quiet) {
    root.dataset.fault = st.fault; root.dataset.rail = st.rail; root.dataset.run = st.run;
    $$('[data-set]').forEach((b) => b.setAttribute('aria-pressed', String(st[b.dataset.set] === b.dataset.v)));
    let now = '';
    steps.forEach((e) => {
      const s = +e.dataset.step;
      e.classList.toggle('is-on', s < at);
      e.classList.toggle('is-now', st.run === 'live' && s === at - 1);
      e.classList.toggle('is-met', (e.dataset.m || '').split(' ').indexOf(st.fault) > -1);
      if (st.run === 'live' && s === at - 1 && e.parentNode === lane) now = (e.textContent || '').replace(/^!/, '').replace(/Evidence:.*$/, '').trim();
    });
    const t = st.run === 'done' ? 'Run complete' : st.run === 'live' ? 'Running' + (now ? ', ' + now : '') : 'Ready';
    if (stat.textContent !== t) stat.textContent = t;
    const say = st.run === 'done' ? 'Run complete' : st.run === 'live' ? 'Running' : '';
    if (sayN && sayN.textContent !== say) sayN.textContent = say;
    runT.textContent = st.run === 'idle' ? 'Run payout' : 'Run again';
    place(follow);
    memo(quiet);
  }
  function write() {
    const parts = ['fault=' + st.fault, 'rail=' + st.rail]; if (st.run === 'done') parts.push('run=done');
    parts.push('seat=' + st.seat, 'vol=' + st.vol, 'preset=' + st.preset);
    const h = '#' + parts.join('&'); if (location.hash !== h) history.replaceState(null, '', h);
  }
  function stop() { if (timer) { clearTimeout(timer); timer = null; } }
  function finish() { stop(); at = N; st.run = 'done'; paint(false, true); write(); }
  function tick() {
    timer = setTimeout(() => { at += 1; paint(true, true); if (at >= N) timer = setTimeout(finish, STEP); else tick(); }, STEP);
  }
  function run() {
    stop(); K.closeCard();
    if (K.still) { finish(); return; }
    at = 0; st.run = 'live'; paint(true, true); write(); tick();
  }
  function reset() { stop(); K.closeCard(); at = 0; st.run = 'idle'; paint(true, true); write(); }
  function fromHash() {
    const h = {}; location.hash.slice(1).split('&').forEach((p) => { const m = /^([a-z]+)=([a-z0-9]+)$/.exec(p); if (m) h[m[1]] = m[2]; });
    if (FAULTS.indexOf(h.fault) > -1) st.fault = h.fault;
    if (RAILS.indexOf(h.rail) > -1) st.rail = h.rail;
    if (S) {
      if (has(S.seat, h.seat)) st.seat = h.seat;
      if (has(S.presets, h.preset)) st.preset = h.preset;
      if (/^\d+$/.test(h.vol || '')) st.vol = clamp(+h.vol);
    }
    if (h.run === 'done') { stop(); at = N; st.run = 'done'; } else if (st.run === 'done') { at = 0; st.run = 'idle'; }
    paint(false, false);
  }

  root.addEventListener('click', (e) => {
    const b = e.target.closest('[data-set]');
    if (b) {
      const k = b.dataset.set, changed = st[k] !== b.dataset.v;
      st[k] = b.dataset.v; K.closeCard(); paint(false, false); write();
      if (changed) flash(slot(k === 'fault' ? 'fault' : 'railsec'), false);
      return;
    }
    if (e.target.closest('.ppr-run')) { run(); return; }
    if (e.target.closest('.ppr-reset')) { reset(); return; }
    const m = e.target.closest('.ppr-m-seg button');
    if (m) { st[m.dataset.k] = m.dataset.v; K.closeCard(); write(); memo(false); return; }
    const d = e.target.closest('[data-do]'); if (!d) return;
    if (d.dataset.do === 'print') { K.closeCard(); window.print(); return; }
    if (d.dataset.do === 'memo') { const m = $('.ppr-memo'); if (m) m.scrollIntoView({ behavior: K.still ? 'auto' : 'smooth', block: 'start' }); return; }
    write();
    const done = () => { d.textContent = 'Link copied'; setTimeout(() => { d.textContent = 'Copy link'; }, 1600); };
    const old = () => { const t = K.el('textarea', null, root); t.value = location.href; t.select(); try { document.execCommand('copy'); } catch (err) { /* no clipboard */ } t.remove(); done(); };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(location.href).then(done, old); else old();
  });
  const rng = $('.ppr-m-rng'), num = $('.ppr-m-num');
  if (rng) {
    rng.addEventListener('input', (e) => { st.vol = fromPos(+e.target.value); memo(false); clearTimeout(wt); wt = setTimeout(write, 200); });
    rng.addEventListener('change', () => { clearTimeout(wt); write(); });
  }
  if (num) {
    const take = () => { const d = num.value.replace(/\D/g, ''); if (d) { st.vol = clamp(+d); write(); memo(false); } num.value = fmt(st.vol); };
    num.addEventListener('change', take);
    num.addEventListener('keydown', (e) => { if (e.key === 'Enter') { take(); num.blur(); } });
  }
  root.addEventListener('keydown', (e) => {
    if (e.key !== 'r' && e.key !== 'R') return;
    if (e.metaKey || e.ctrlKey || e.altKey || /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName)) return;
    e.preventDefault(); reset(); resetB.focus();
  });
  window.addEventListener('hashchange', fromHash);
  window.addEventListener('resize', () => place(false));
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => place(false));
  fromHash();
  requestAnimationFrame(() => root.classList.add('ppr-live'));
})();
