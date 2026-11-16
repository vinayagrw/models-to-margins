/* Stablecoin B2B payouts: core behavior, then one block per scene. */
(function () {
  const root = document.querySelector('.pdd');
  if (!root) return;
  root.classList.add('pdd-js');
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  const READERS = ['buyer', 'builder', 'strategy'];
  const subs = [];
  const store = { get() { try { return localStorage.getItem('pdd-reader'); } catch (e) { return null; } }, set(v) { try { localStorage.setItem('pdd-reader', v); } catch (e) { /* unavailable */ } } };
  const fromHash = () => { const m = /reader=([a-z]+)/.exec(location.hash); return m && READERS.includes(m[1]) ? m[1] : null; };
  // the rail chooser view (rail=b) rides along when another control rewrites the address
  const railPart = () => { const m = /[#&]rail=(a|b)/.exec(location.hash); return m && m[1] === 'b' ? '&rail=b' : ''; };

  const PDD = window.PDD = {
    root, still: mq.matches, reader: '',
    onReader(fn) { subs.push(fn); if (PDD.reader) fn(PDD.reader); },
    setReader(v, opts) {
      if (!READERS.includes(v)) return;
      const first = !PDD.reader;
      PDD.reader = v; root.dataset.reader = v;
      root.querySelectorAll('[data-reader-btn]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.readerBtn === v)));
      if (!(opts && opts.silent)) { store.set(v); const bm = /[#&]build=([a-z]+)/.exec(location.hash), am = /[#&]arch=(current|today|year1|target)/.exec(location.hash); try { history.replaceState(null, '', '#reader=' + v + (bm ? '&build=' + bm[1] : '') + (bm && bm[1] === 'arch' && am ? '&arch=' + am[1] : '') + railPart()); } catch (e) { /* ignore */ } }
      subs.forEach((fn) => fn(v));
      if (first && opts && opts.scroll && !(/[#&]rail=/.test(location.hash) && !/[#&]build=/.test(location.hash))) { const s = root.querySelector('.pdd-scene:not(.pdd-gate)'); if (s) requestAnimationFrame(() => s.scrollIntoView({ behavior: PDD.still ? 'auto' : 'smooth', block: 'start' })); }
    },
    railPart,
    data(name) { const el = root.querySelector('script[data-pdd="' + name + '"]'); return el ? JSON.parse(el.textContent) : null; },
    svg(tag, attrs, parent) { const n = document.createElementNS('http://www.w3.org/2000/svg', tag); for (const k in (attrs || {})) n.setAttribute(k, attrs[k]); if (parent) parent.appendChild(n); return n; },
    el(tag, attrs, parent, text) { const n = document.createElement(tag); for (const k in (attrs || {})) n.setAttribute(k, attrs[k]); if (text != null) n.textContent = text; if (parent) parent.appendChild(n); return n; },
    onResize(el, fn) { let w = 0; const run = (byUser) => { const nw = Math.round(el.clientWidth); if (nw && nw !== w) { w = nw; fn(nw); } }; if ('ResizeObserver' in window) new ResizeObserver(run).observe(el); else window.addEventListener('resize', run); run(); },
    usd(v, d) { const a = Math.abs(v); const n = d == null ? 2 : d; return (v < 0 ? '-' : '') + '$' + a.toLocaleString('en-US', { minimumFractionDigits: n, maximumFractionDigits: n }); },
    fill(input) { const min = Number(input.min) || 0, max = Number(input.max) || 100; input.style.setProperty('--fill', ((Number(input.value) - min) / (max - min)) * 100 + '%'); },
  };

  // reduced motion is read live, so a change in system settings applies without a reload
  const onMotion = (e) => { PDD.still = e.matches; };
  if (mq.addEventListener) mq.addEventListener('change', onMotion); else if (mq.addListener) mq.addListener(onMotion);
  // reader gate
  root.querySelectorAll('[data-reader-btn]').forEach((b) => b.addEventListener('click', () => PDD.setReader(b.dataset.readerBtn, { scroll: true })));
  const hashed = fromHash();
  if (hashed) store.set(hashed);
  const init = hashed || store.get();
  if (init) PDD.setReader(init, { silent: true });
  window.addEventListener('hashchange', () => { const h = fromHash(); if (h) { store.set(h); PDD.setReader(h, { silent: true }); } });
  // in-page links (rail, skip link) scroll without replacing #reader= in the address
  root.addEventListener('click', (e) => {
    const a = e.target.closest ? e.target.closest('a[href^="#pdd-"]') : null; if (!a) return;
    const t = document.getElementById(a.getAttribute('href').slice(1)); if (!t || !root.contains(t)) return;
    e.preventDefault();
    t.scrollIntoView({ behavior: PDD.still ? 'auto' : 'smooth', block: 'start' });
    if (!t.hasAttribute('tabindex')) t.setAttribute('tabindex', '-1');
    try { t.focus({ preventScroll: true }); } catch (err) { /* ignore */ }
  });

  // scenes: reveal and rail
  const scenes = [...root.querySelectorAll('.pdd-scene')];
  scenes.forEach((s) => s.querySelectorAll('[data-rise]').forEach((n, i) => n.style.setProperty('--i', i)));
  const rail = root.querySelector('.pdd-rail');
  const links = rail ? [...rail.querySelectorAll('a')] : [];
  const seen = new WeakSet();
  const enter = (s) => { if (seen.has(s)) return; seen.add(s); s.classList.add('is-in'); s.dispatchEvent(new CustomEvent('pdd:in')); };
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { io.unobserve(e.target); enter(e.target); } }), { threshold: 0, rootMargin: '0px 0px -15% 0px' });
    scenes.forEach((s) => io.observe(s));
    const io2 = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) links.forEach((a) => { const on = a.getAttribute('href') === '#' + e.target.id; a.classList.toggle('is-on', on); if (on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current'); }); }), { rootMargin: '-45% 0px -45% 0px' });
    scenes.forEach((s) => io2.observe(s));
  } else scenes.forEach(enter);
  setTimeout(() => scenes.forEach((s) => { const r = s.getBoundingClientRect(); if (r.width && r.top < innerHeight && r.bottom > 0) enter(s); }), 1200);

  // range fills
  root.querySelectorAll('input[type="range"]').forEach((i) => { PDD.fill(i); i.addEventListener('input', () => PDD.fill(i)); });

  // evidence chips are plain highlighted text: <span class="pdd-chip" data-src="G#38">. The data-src keys trace to docs/agentic-payouts-desk-sources.md. Nothing opens.
  // r37: the note behind a chip is reachable again as a title on hover and focus. Chips drawn later get theirs on first hover.
  const noteOf = (c) => { if (c && c.dataset.note && !c.title) c.title = c.dataset.note; };
  root.querySelectorAll('.pdd-chip[data-note]').forEach(noteOf);
  const noteAt = (e) => { noteOf(e.target.closest ? e.target.closest('.pdd-chip[data-note]') : null); };
  root.addEventListener('mouseover', noteAt); root.addEventListener('focusin', noteAt);
  if ('MutationObserver' in window) new MutationObserver((ms) => ms.forEach((m) => m.addedNodes.forEach((n) => { if (n.nodeType !== 1) return; if (n.matches('.pdd-chip[data-note]')) noteOf(n); n.querySelectorAll('.pdd-chip[data-note]').forEach(noteOf); }))).observe(root, { childList: true, subtree: true });
  // r37: seat-scoped drawers. <details class="pdd-more" data-open-for="buyer strategy"> opens for those seats, "all" for every seat. Runs on every seat change.
  // Desktop and projector only. On a phone an open table or list makes the screen several viewports tall, so drawers stay closed there.
  PDD.onReader((r) => { const wide = window.matchMedia('(min-width: 1024px)').matches; root.querySelectorAll('details.pdd-more[data-open-for]').forEach((d) => { const l = (d.dataset.openFor || '').split(/\s+/); d.open = wide && (l.includes('all') || l.includes(r)); }); });
  // pass 2: <a href="#id" data-open="#id"> opens the drawer it points at, then the browser scrolls to it
  root.addEventListener('click', (e) => { const a = e.target.closest('a[data-open]'); if (!a) return; const d = root.querySelector(a.dataset.open); if (d && d.tagName === 'DETAILS') d.open = true; });
  // r37: screen-reader sentences announce changes and stay visually hidden
  root.querySelectorAll('.pdd-s2-sr, .pdd-s3-sr').forEach((p) => { if (!p.hasAttribute('aria-live')) p.setAttribute('aria-live', 'polite'); });

  // segmented toggle: <div class="pdd-seg" data-key="k"><button data-val="v">. Sets data-<key> on the closest [data-host] or scene.
  root.querySelectorAll('.pdd-seg[data-key]').forEach((seg) => {
    const host = seg.closest('[data-host]') || seg.closest('.pdd-scene') || root; const key = seg.dataset.key;
    const set = (v) => { host.setAttribute('data-' + key, v); seg.querySelectorAll('button[data-val]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.val === v))); host.dispatchEvent(new CustomEvent('pdd:set', { detail: { key, value: v } })); };
    seg.querySelectorAll('button[data-val]').forEach((b) => b.addEventListener('click', () => set(b.dataset.val)));
    const f = seg.querySelector('button[aria-pressed="true"]') || seg.querySelector('button[data-val]'); if (f) set(f.dataset.val);
  });
})();

/* s1: the answer for your seat */
(function () {
  const PDD = window.PDD; if (!PDD) return; const root = PDD.root;
  const scene = root.querySelector('.pdd-s1-scene'); if (!scene) return;
  // headline numbers count up once the screen is seen, and again when the seat changes
  let seen = scene.classList.contains('is-in');
  const count = (host) => {
    const chip = host.querySelector('.pdd-chip') || host; const full = chip.dataset.s1Full || chip.textContent; chip.dataset.s1Full = full;
    const m = /^(\D*)(\d+(?:\.\d+)?)(.*)$/.exec(full); if (!m || PDD.still) { chip.textContent = full; return; }
    const end = Number(m[2]); const dec = (m[2].split('.')[1] || '').length; const t0 = performance.now(); const dur = 800;
    const token = String(t0); chip.dataset.s1Run = token;
    const step = (t) => {
      if (chip.dataset.s1Run !== token) return;
      const p = Math.min(1, (t - t0) / dur); const e = 1 - Math.pow(1 - p, 3);
      chip.textContent = p >= 1 ? full : m[1] + (end * e).toFixed(dec) + m[3];
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const run = (byUser) => { if (!seen) return; scene.querySelectorAll('[data-s1-count]').forEach((n) => { if (n.offsetParent !== null) count(n); }); };
  scene.addEventListener('pdd:in', () => { seen = true; run(); });
  PDD.onReader(() => run());
  // the note audit: a strip of the 20 statements and verdict filters. r37: it lives on #pdd-rules now, so it is found by class anywhere on the page.
  const audit = root.querySelector('.pdd-s1-audit'); if (!audit) return;
  const strip = audit.querySelector('.pdd-s1-strip');
  const list = audit.querySelector('.pdd-s1-lines'); if (list) { list.setAttribute('tabindex', '0'); list.setAttribute('aria-label', 'The 20 statements and their verdicts'); }
  const lines = [...audit.querySelectorAll('.pdd-s1-line')];
  if (strip) lines.forEach((li, i) => { PDD.el('span', { 'data-k': li.dataset.k || '' }, strip, String(i + 1)); });
  const keys = [...audit.querySelectorAll('[data-s1-key]')];
  keys.forEach((b) => b.addEventListener('click', () => {
    const on = b.getAttribute('aria-pressed') === 'true';
    keys.forEach((k) => k.setAttribute('aria-pressed', String(!on && k === b)));
    if (on) audit.removeAttribute('data-show'); else audit.setAttribute('data-show', b.dataset.s1Key);
  }));
})();

/* Screen 4: the money path */
(function () {
  const PDD = window.PDD; if (!PDD) return; const root = PDD.root;
  const scene = root.querySelector('#pdd-path'); if (!scene) return;
  let data = null; try { data = PDD.data('s2-path'); } catch (e) { data = null; }
  if (!data || !data.states || !data.faults) return;
  const q = (s) => scene.querySelector(s), qa = (s) => [...scene.querySelectorAll(s)];
  const wrap = q('.pdd-s2-trackw'), drawer = q('.pdd-s2-drawer'), runBtn = q('.pdd-s2-run'), sr = q('.pdd-s2-sr');
  const steps = qa('.pdd-s2-step'), pills = qa('.pdd-s2-fault'), holders = qa('.pdd-s2-holders li');
  const part = { kick: q('.pdd-s2-dkt'), title: q('.pdd-s2-dt'), what: q('.pdd-s2-what'), h2: q('.pdd-s2-h2'), two: q('.pdd-s2-two'), h3: q('.pdd-s2-h3'), rule: q('.pdd-s2-rule'), rs: q('.pdd-s2-rs'), chips: q('.pdd-s2-chips') };
  if (!wrap || !drawer || steps.length !== data.states.length) return;
  const RAIL = { bank: 'Bank rail', coin: 'Stablecoin rail' };
  const lossBtns = qa('[data-loss]'), lossOut = q('.pdd-s2-lossout');
  const setLoss = (id) => {
    const L = (data.loss || {})[id] || null;
    lossBtns.forEach((b) => { const on = !!L && b.dataset.loss === id; b.setAttribute('aria-pressed', String(on)); const tr = b.closest('tr'); if (tr) tr.classList.toggle('is-on', on); });
    if (!lossOut) return; lossOut.textContent = '';
    if (!L) { lossOut.textContent = 'Choose a failure to see the proposal.'; return; }
    PDD.el('b', null, lossOut, 'Proposed: '); PDD.el('span', null, lossOut, L.b + '. ');
    PDD.el('b', null, lossOut, 'Evidence kept: '); PDD.el('span', null, lossOut, L.k + '. ');
    (L.ev || []).forEach((e) => { const c = PDD.el('span', { class: 'pdd-chip', 'data-src': [].concat(e.src).join(' ') }, lossOut, e.t); if (e.note) c.setAttribute('data-note', e.note); });
  };
  lossBtns.forEach((b) => b.addEventListener('click', () => setLoss(b.dataset.loss)));
  const LAST = data.states.length - 1, STEP = 400;
  let rail = scene.getAttribute('data-rail') === 'coin' ? 'coin' : 'bank';
  let sel = { k: 'fault', id: 'wrong' }, pos = 7, timer = 0, touched = false;
  const txt = (n, t) => { if (n) n.textContent = t; };
  // r37: four fault buttons show, the rest sit behind More faults. The pressed fault always stays visible.
  let fold = () => {};
  const faultsBox = q('.pdd-s2-faults');
  if (faultsBox && pills.length > 4) {
    const more = PDD.el('button', { type: 'button', class: 'pdd-pill pdd-s2-more', 'aria-expanded': 'false' }, faultsBox, 'More faults');
    let open = false;
    fold = () => { pills.forEach((b, i) => { b.hidden = !open && i >= 4 && b.getAttribute('aria-pressed') !== 'true'; }); more.textContent = open ? 'Fewer faults' : 'More faults'; more.setAttribute('aria-expanded', String(open)); };
    more.addEventListener('click', () => { open = !open; fold(); if (open && pills[4]) pills[4].focus({ preventScroll: true }); });
  }
  const pick = (v) => (v && typeof v === 'object' && !Array.isArray(v)) ? v[rail] : v;
  const view = () => {
    if (sel.k === 'fault') {
      const f = data.faults[sel.id]; const o = (rail === 'coin' && f.coin) ? Object.assign({}, f, f.coin) : f;
      return { kick: 'Fault at state ' + f.at, title: f.n, what: o.what, h2: 'Who bears the loss', two: o.bear, j: !!o.j, h3: 'Rule that prevents it', rule: o.rule || '', ev: o.ev || [], loss: o.loss || [], m: 'risk', at: f.at - 1 };
    }
    const s = data.states[sel.id];
    return { kick: 'State ' + (sel.id + 1) + ' of ' + data.states.length, title: s.n, what: pick(s.d), h2: 'Who holds the money', two: pick(s.h), j: false, h3: 'Rule', rule: s.r || '', ev: pick(s.ev) || [], m: s.diff ? rail : 'flow', at: sel.id };
  };
  const move = (p) => {
    pos = p; wrap.style.setProperty('--p', String(p));
    steps.forEach((b, i) => b.toggleAttribute('data-done', i <= p));
    holders.forEach((li) => { const r = (li.getAttribute('data-' + rail) || '').split('-').map(Number); li.classList.toggle('is-on', r.length === 2 && p >= r[0] && p <= r[1]); });
  };
  const flash = (i) => { const b = steps[i]; if (!b || PDD.still) return; b.classList.remove('is-flash'); void b.offsetWidth; b.classList.add('is-flash'); };
  const settle = () => { if (sel.k === 'fault') { wrap.setAttribute('data-end', 'fault'); flash(pos); } else if (pos === LAST) wrap.setAttribute('data-end', 'ok'); else wrap.removeAttribute('data-end'); };
  const paint = () => {
    const v = view();
    drawer.setAttribute('data-m', v.m);
    txt(part.kick, v.kick); txt(part.title, v.title); txt(part.what, v.what); txt(part.h2, v.h2); txt(part.two, v.two); txt(part.h3, v.h3); txt(part.rule, v.rule);
    if (part.two) part.two.classList.toggle('pdd-view', !!v.j);
    if (part.rs) part.rs.hidden = !v.rule;
    if (part.chips) {
      part.chips.textContent = ''; part.chips.hidden = !v.ev.length;
      v.ev.forEach((e) => { const b = PDD.el('span', { class: 'pdd-chip', 'data-src': [].concat(e.src).join(' ') }, part.chips, e.t); if (e.note) b.setAttribute('data-note', e.note); });
    }
    steps.forEach((b, i) => { b.setAttribute('aria-pressed', String(sel.k === 'state' && sel.id === i)); b.toggleAttribute('data-fault', sel.k === 'fault' && v.at === i); b.classList.remove('is-flash'); });
    pills.forEach((b) => b.setAttribute('aria-pressed', String(sel.k === 'fault' && b.getAttribute('data-fault') === sel.id)));
    fold();
    lossBtns.forEach((b) => { const tr = b.closest('tr'); if (tr) tr.classList.toggle('is-hit', (v.loss || []).includes(b.dataset.loss)); });
    txt(sr, RAIL[rail] + '. ' + v.kick + ', ' + v.title + '. ' + v.what + ' ' + v.h2 + ': ' + v.two + (v.rule ? ' ' + v.h3 + ': ' + v.rule : ''));
    return v;
  };
  const show = (byUser) => {
    clearTimeout(timer);
    const v = paint(); move(v.at); settle();
    if (byUser) { const r = drawer.getBoundingClientRect(); if (r.bottom < 60 || r.top > window.innerHeight - 60) drawer.scrollIntoView({ behavior: PDD.still ? 'auto' : 'smooth', block: 'nearest' }); }
  };
  const setRail = (v) => { if (v === rail) return; const b = q('.pdd-s2-rail button[data-val="' + v + '"]'); if (b) b.click(); };
  const selectFault = (id, byUser) => {
    const f = data.faults[id]; if (!f) return;
    sel = { k: 'fault', id };
    if (f.rail) setRail(f.rail); else if (!byUser) setRail('bank');
    show(byUser);
  };
  const run = (byUser) => {
    clearTimeout(timer);
    const end = sel.k === 'fault' ? data.faults[sel.id].at - 1 : LAST;
    wrap.removeAttribute('data-end'); steps.forEach((b) => b.classList.remove('is-flash'));
    if (PDD.still) { if (sel.k === 'fault' && byUser) show(true); else { move(end); settle(); } return; }
    move(0);
    const tick = () => { if (pos >= end) { settle(); if (sel.k === 'fault' && byUser) show(true); return; } move(pos + 1); flash(pos); timer = setTimeout(tick, STEP); };
    timer = setTimeout(tick, STEP);
  };
  scene.addEventListener('pdd:set', (e) => {
    if (e.detail && e.detail.key === 'view') { txt(sr, e.detail.value === 'comp' ? 'Components shown. Thirteen components in four lanes.' : 'States shown.'); return; }
    if (!e.detail || e.detail.key !== 'rail') return;
    rail = e.detail.value === 'coin' ? 'coin' : 'bank';
    if (sel.k === 'fault') { const f = data.faults[sel.id]; if (f.rail && f.rail !== rail) sel = { k: 'state', id: f.at - 1 }; }
    show(false);
  });
  steps.forEach((b, i) => b.addEventListener('click', () => { touched = true; sel = { k: 'state', id: i }; show(true); }));
  pills.forEach((b) => b.addEventListener('click', () => { touched = true; selectFault(b.getAttribute('data-fault'), true); }));
  qa('.pdd-s2-rail button').forEach((b) => b.addEventListener('click', (e) => { if (e.isTrusted) touched = true; }));
  if (runBtn) runBtn.addEventListener('click', () => { touched = true; run(true); });
  let ran = false;
  const first = () => { if (ran) return; ran = true; if (!PDD.still) run(); };
  PDD.onReader((r) => { if (touched) return; const id = data.defaults && data.defaults[r]; if (id) selectFault(id, false); if (ran && !PDD.still) run(); });
  show(false);
  if (scene.classList.contains('is-in')) first(); else scene.addEventListener('pdd:in', first, { once: true });
})();

/* Screen 5: rail chooser. Gates first, then the decision table, first match wins.
   Two views over one shared state: Pick a payout (a) and Compare costs (b). #rail=b opens Compare costs. */
(function () {
  const PDD = window.PDD; if (!PDD) return; const root = PDD.root;
  const scene = root.querySelector('.pdd-s3-scene'); if (!scene) return;
  let D = null; try { D = PDD.data('s3-rules'); } catch (e) { D = null; }
  if (!D || !D.rows || !D.gates) return;

  /*S3-LOGIC-START*/
  // Pure: inputs in, gate results and a decision-table row number out. No DOM, no data lookups.
  // i = { route: domestic|cross, country: us|br|other, status: established|new|changed, cap: instant|ach|hosted|self|card,
  //       consent: yes|no, amount: 0..3 (under $3,000, to $1 million, to $10 million, above), speed: minutes|same|next,
  //       day: hours|outside (weekend or holiday), health: normal|chain|bank, token: usdc|usdt, data: yes|no }
  // Gate states: info (always runs), pass, data (needs data), close (rules out one rail, later gates still run),
  // stop (the payout is held or declined). Every gate is evaluated on every route.
  // FINAL rows pay on a rail treated as final. A new or changed payee never lands on one.
  // bw: a plain reason for the base rail, shown as the deciding check when no gate decided.
  const FINAL = [3, 6, 7, 8, 9, 10, 11, 12, 21];
  const COIN = [10, 11];
  const WIRE = [6, 7, 8, 12]; // Fedwire, Fedwire after the weekend, correspondent wire, cross-border bank partner
  function choose(i) {
    const dom = i.route === 'domestic';
    const wallet = i.cap === 'hosted' || i.cap === 'self';
    const card = i.cap === 'card';
    const fresh = i.status !== 'established';
    const urgent = i.speed !== 'next';
    const weekend = i.day === 'outside';
    const usdt = wallet && i.token === 'usdt';
    const chainDown = i.health === 'chain', bankDown = i.health === 'bank';
    const ramp = !dom && i.cap === 'ach' && weekend && urgent && i.consent === 'yes';
    const token = !dom && (wallet || ramp);
    const bankAsk = dom && !wallet && !card && urgent;
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
      : bankAsk && i.amount === 2 ? ['close', 'Same Day ACH closed above $1 million', 'Same Day ACH: $1 million limit until 17 Sep 2027']
      : token ? ['data', 'Platform cap not yet set'] : ['pass', 'Rail limits checked'];
    const g7 = !token ? ['pass', 'No token leg'] : usdt ? ['stop', 'USDT is off the list'] : ['pass', 'USDC is on the list'];
    const tokenOpen = token && g2[0] !== 'close' && g3[0] !== 'close' && g4[0] !== 'close' && !usdt && !chainDown && !(ramp && bankDown);
    // base rail, before the first-payout rule and before holds
    let base, then = null, bw = '';
    if (dom) {
      if (card) { base = 21; bw = 'Payee gave only a card, and no agent push-to-card product exists, so a person keys it'; }
      else if (wallet) { base = 18; then = 1; bw = 'A US payout needs bank details'; }
      else if (!urgent) { base = 1; bw = 'Next day is enough, so the cheapest bank rail'; }
      else if (i.amount === 3) { base = weekend ? 7 : 6; bw = weekend ? 'Above $10 million at a weekend, and Fedwire is shut' : 'Above $10 million and urgent, so only Fedwire is left'; }
      else if (i.speed === 'same' && i.amount <= 1 && !weekend) { base = 2; bw = 'Same day, at $1 million or less'; }
      else if (i.cap === 'instant') { base = 3; bw = 'Urgent, and the payee bank takes instant payments'; }
      else if (i.amount <= 1) { base = weekend ? 15 : 5; bw = weekend ? 'Payee bank is not on an instant rail, and it is a weekend' : 'Payee bank is not on an instant rail'; }
      else { base = weekend ? 16 : 6; bw = weekend ? 'Above $1 million at a weekend, with no instant rail at the payee bank' : 'Above $1 million, with no instant rail at the payee bank'; }
    } else if (tokenOpen) { base = wallet ? 10 : 11; bw = wallet ? 'Payee abroad consents and holds a wallet' : 'Weekend, urgent, and the payee consents to a ramp'; }
    else if (wallet) { if (usdt) { base = 13; bw = 'USDT asked for'; } else if (chainDown) { base = 14; bw = 'Chain or ramp degraded'; } else { base = 18; then = i.amount >= 2 ? 8 : 12; bw = 'Wallet route closed, so bank details are needed'; } }
    else if (card) { base = 21; bw = 'Payee abroad gave only a card, and no agent push-to-card product exists, so a person keys it'; }
    else if (i.amount >= 2) { base = 8; bw = 'Above $1 million abroad'; }
    else if (i.cap === 'instant') { base = 9; bw = 'The payee bank abroad takes instant payments'; }
    else { base = 12; bw = 'No instant rail at the payee bank abroad'; }
    const g8 = bankDown ? (base === 10 ? ['close', 'Bank partner degraded, bank rails closed', 'Bank rails: partner degraded'] : base === 13 ? ['close', 'Bank partner degraded, bank rails closed'] : ['stop', 'Bank partner degraded, held'])
      : chainDown ? (!token ? ['pass', 'No token leg, bank partner normal'] : wallet ? ['stop', 'Chain or ramp degraded, no blind resend'] : ['close', 'Chain or ramp degraded, stablecoin closed', 'Stablecoin: chain or ramp degraded'])
      : ['pass', 'Partner and chain normal'];
    // r37: the Travel Rule (31 CFR 1010.100) attaches to wires and to transmitter stablecoin transfers. ACH, Same Day ACH,
    // RTP and FedNow are outside it, so G5 fires only when the base rail is a wire, a correspondent or partner transfer, or a token leg.
    const g5 = !(WIRE.indexOf(base) >= 0 || COIN.indexOf(base) >= 0) ? ['pass', 'Rule attaches to wires and stablecoin only'] : i.amount === 0 ? ['pass', 'Under $3,000'] : i.data === 'no' ? ['stop', 'Incomplete data, held'] : ['pass', 'Data complete'];
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
    return { row, then, gates, bw, stop: at >= 0 ? 'G' + (at + 1) : null, closed, needs: gates.filter((x) => x.s === 'data').map((x) => x.id), final: FINAL.indexOf(row) >= 0, coin: COIN.indexOf(row) >= 0 };
  }
  /*S3-LOGIC-END*/

  const ICONS = {
    bank: '<use href="#pdd-ar3-i-bank"/>',
    same: '<use href="#pdd-ar3-i-rtp"/>',
    instant: '<use href="#pdd-ar3-i-rtp"/>',
    wire: '<use href="#pdd-ar3-i-wire"/>',
    wait: '<use href="#pdd-ar3-i-trace"/>',
    globe: '<use href="#pdd-ar3-i-globe"/>',
    local: '<use href="#pdd-ar3-i-bank"/>',
    coin: '<use href="#pdd-ar3-i-coin"/>',
    ramp: '<use href="#pdd-ar3-i-coin"/>',
    partner: '<use href="#pdd-ar3-i-globe"/>',
    decline: '<use href="#pdd-ar3-i-wall"/>',
    hold: '<use href="#pdd-ar3-i-lock"/>',
    ask: '<use href="#pdd-ar3-i-doc"/>',
    card: '<use href="#pdd-ar3-i-card"/>',
  };
  const WORD = { info: 'Runs', pass: 'Pass', data: 'Needs data', close: 'Closes rail', stop: 'Stop', wait: 'Wait' };
  const LONG = { info: 'runs here', pass: 'pass', data: 'needs data', close: 'closes a rail', stop: 'stop', wait: 'waiting' };
  const TONE = { info: 'rule', pass: 'ok', data: 'rule', close: 'rule', stop: 'risk' };
  const KEYS = ['route', 'country', 'status', 'cap', 'consent', 'token', 'data', 'speed', 'day', 'health'];
  const q = (s) => scene.querySelector(s);
  const amt = q('#pdd-s3-amt'), amtOut = q('.pdd-s3-amt-out');
  const resEl = q('.pdd-s3-res'), sr = q('.pdd-s3-sr'), note = q('.pdd-s3-note'), notList = q('.pdd-s3-not');
  const R0 = resEl ? { ico: resEl.querySelector('.pdd-s3-ico'), role: resEl.querySelector('.pdd-s3-role span'), rf: resEl.querySelector('.pdd-s3-rf'), rs: resEl.querySelector('.pdd-s3-rs'), cost: resEl.querySelector('.pdd-s3-cost'), dg: resEl.querySelector('.pdd-s3-dg'), why: resEl.querySelector('.pdd-s3-why'), flags: resEl.querySelector('.pdd-s3-flags'), cq: resEl.querySelector('.pdd-s3-cq') } : null;
  const gateEls = D.gates.map((g) => q('.pdd-s3-g[data-g="' + g.id + '"]'));
  const gm = [...scene.querySelectorAll('.pdd-s3-gm i')];
  const chipBtns = [...scene.querySelectorAll('.pdd-s3-chip[data-scen]')];
  const sizeBtns = [...scene.querySelectorAll('.pdd-s3-size button[data-a]')];
  const selects = [...scene.querySelectorAll('select[data-key]')];
  const dw = q('.pdd-s3-dw'), opener = q('.pdd-s3-open');
  const st = Object.assign({ token: 'usdc', data: 'yes' }, D.presets['us-next']);
  let touched = false, timers = [], busy = false, cur = null, shown = 0;
  const rowOf = (n) => D.rows.find((r) => r.n === n);
  const band = () => Math.max(0, Math.min(3, st.amount || 0));

  const chip = (parent, text, src, noteText) => {
    const b = PDD.el('span', { class: 'pdd-chip', 'data-src': src.join(' ') }, parent, text);
    if (noteText) b.setAttribute('data-note', noteText);
    return b;
  };
  const setKey = (key, val) => {
    st[key] = val; scene.setAttribute('data-' + key, val);
    const sel = selects.find((s) => s.dataset.key === key); if (sel && sel.value !== val) sel.value = val;
  };
  const setAmount = (n) => {
    st.amount = Math.max(0, Math.min(3, Number(n) || 0));
    if (amt) { amt.value = String(st.amount); amt.setAttribute('aria-valuetext', D.bands[st.amount]); PDD.fill(amt); }
    if (amtOut) amtOut.textContent = D.bands[st.amount];
    sizeBtns.forEach((b) => b.setAttribute('aria-pressed', String(Number(b.dataset.a) === st.amount)));
  };
  // route and payee country move together
  const link = (key) => {
    if (key === 'route') { if (st.route === 'domestic' && st.country !== 'us') setKey('country', 'us'); if (st.route === 'cross' && st.country === 'us') setKey('country', 'other'); }
    if (key === 'country') { const r = st.country === 'us' ? 'domestic' : 'cross'; if (st.route !== r) setKey('route', r); }
  };

  // a gate paints its tile in the drawer and its mark in the result
  const paintGate = (k, g, waiting) => {
    const s0 = waiting ? 'wait' : g.s;
    if (gm[k]) gm[k].dataset.s = s0;
    const b = gateEls[k]; if (!b) return;
    b.dataset.s = s0;
    if (TONE[s0]) b.dataset.m = TONE[s0]; else b.removeAttribute('data-m');
    const s = b.querySelector('.pdd-s3-gs'); if (s) s.textContent = WORD[s0] || '';
    b.setAttribute('aria-label', g.id + ' ' + D.gates[k].name + ': ' + (LONG[s0] || ''));
  };
  // the note under the tiles: one gate at a time, with its sources
  const showNote = (k) => {
    if (!cur || !cur.gates[k]) return;
    shown = k;
    const g = cur.gates[k], meta = D.gates[k];
    gateEls.forEach((b, j) => { if (b) b.setAttribute('aria-pressed', String(j === k)); });
    if (!note) return;
    const nn = note.querySelector('.pdd-s3-nn'), gw = note.querySelector('.pdd-s3-gw');
    if (TONE[g.s]) note.dataset.m = TONE[g.s];
    if (nn) nn.textContent = g.id + ' ' + meta.name;
    if (gw) {
      gw.textContent = g.why || '';
      gw.setAttribute('data-src', (meta.src || []).join(' '));
      if (meta.note) { gw.setAttribute('data-note', meta.note); gw.title = meta.note; } else { gw.removeAttribute('data-note'); gw.removeAttribute('title'); }
    }
  };
  // the gate that decided most: the stop, else the first that closes a rail, else the first that needs data
  const pick = (res) => {
    if (res.stop) return Number(res.stop.slice(1)) - 1;
    let k = res.gates.findIndex((g) => g.s === 'close'); if (k >= 0) return k;
    k = res.gates.findIndex((g) => g.s === 'data'); return k >= 0 ? k : 0;
  };
  // the one deciding check shown in the result: a stop, else the first gate that closed a rail, else the rail logic
  const decide = (res) => {
    if (res.stop) { const k = Number(res.stop.slice(1)) - 1; return { g: res.stop, k, t: res.gates[k].why, m: 'risk' }; }
    if (res.closed.length) { const k = Number(res.closed[0].g.slice(1)) - 1; return { g: res.closed[0].g, k, t: res.gates[k].why, m: 'rule' }; }
    return { g: null, k: -1, t: res.bw, m: 'flow' };
  };

  // Published prices: the rows of the cost chart are the one source. Each row carries data-usd (fixed fees,
  // "lo-hi" segments split by spaces) or data-pct (percent, "lo-hi"). Tether redeems from $100,000 at the
  // greater of $1,000 or 0.1%. FedNow stops at $10 million. Every view reads its numbers from price().
  const lad = q('.pdd-s3-lad');
  const LAD = { amt: [1000, 20000, 5000000, 25000000], say: ['1,000', '20,000', '5 million', '25 million'] };
  // result row to chart rows. A hold or a "collect details first" row borrows the rail it leads to (res.then).
  // r34 c: one chart row per result, so "your rail" always names one rail. A correspondent wire has no published price, so nothing lights.
  const LADROW = { 1: ['ach'], 2: ['ach'], 3: ['fednow'], 4: ['ach'], 5: ['ach'], 6: ['fedwire'], 7: ['fedwire'], 8: [], 9: ['airwallex'], 10: ['coin'], 11: ['coin'], 12: ['sme'], 15: ['ach'], 16: ['ach'], 21: ['card'] };
  const ladRows = lad ? [...lad.querySelectorAll('.pdd-s3-lr')] : [];
  const segs = (v) => (v || '').trim().split(/\s+/).filter(Boolean).map((x) => x.split('-').map(Number)).map((a) => [a[0], a.length > 1 ? a[1] : a[0]]);
  const n0 = (v) => v.toLocaleString('en-US', { maximumFractionDigits: 0 });
  const money = (v) => (v >= 100 || Number.isInteger(v) ? n0(v) : v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: v < 1 ? 3 : 2 }));
  const axis = (e) => (e < 0 ? '$' + Math.pow(10, e).toFixed(-e) : e < 3 ? '$' + Math.pow(10, e) : e < 6 ? '$' + Math.pow(10, e - 3) + 'K' : '$' + Math.pow(10, e - 6) + 'M');
  const round = (v) => Math.round(v * 1000) / 1000;
  const say = (g) => g.map((x) => (x[0] === x[1] ? '$' + money(x[0]) : '$' + money(x[0]) + ' to $' + money(x[1]))).join(' plus ');
  // each chart row read once: its name, the words before its price chip, its no-price wording, and a "Your rail" tag
  const META = ladRows.map((r) => {
    const ln = r.querySelector('.pdd-s3-ln'), b = ln && ln.querySelector('b'), c = ln && ln.querySelector(':scope > .pdd-chip');
    let pre = '';
    if (b && c) { for (let n = b.nextSibling; n && n !== c; n = n.nextSibling) pre += n.textContent; pre = pre.trim(); pre = pre ? pre + ' ' : ''; }
    let none = '';
    if (ln) { const k = ln.cloneNode(true); k.querySelectorAll('b, .pdd-s3-nf, .pdd-s3-lx, .pdd-s3-lq').forEach((n) => n.remove()); none = k.textContent.replace(/\s+/g, ' ').trim(); none = none.charAt(0).toUpperCase() + none.slice(1); }
    const em = ln ? PDD.el('em', { class: 'pdd-s3-yr', hidden: '' }, ln, 'Your rail') : null;
    return { r, id: r.dataset.lid, ln, c, t0: c ? c.textContent : '', name: b ? b.textContent : r.dataset.lid, pre, none, em, track: r.querySelector('.pdd-s3-lt') };
  });
  const metaOf = (id) => META.find((m) => m.id === id);
  const limitOf = (id) => { const m = metaOf(id); const c = m && m.r.querySelector('.pdd-s3-lx .pdd-chip'); return c ? c.textContent : ''; };
  // r34 c: captions compare customer prices only. A network fee to a bank is named as such and never compared.
  const nfOf = (id) => { const m = metaOf(id); const c = m && m.r.querySelector('.pdd-s3-nf .pdd-chip'); return c ? c.textContent : ''; };
  const pctOf = (id) => { const m = metaOf(id); return m && m.r.dataset.pct ? m.r.dataset.pct.replace('-', '% to ') + '%' : ''; };

  const price = (res) => {
    const bd = band(), a = LAD.amt[bd];
    const rows = META.map((m) => {
      const r = m.r, x = { m, id: m.id, segs: [], pct: null, over: false, away: false, tether: 0 };
      if (r.dataset.usd) x.segs = segs(r.dataset.usd);
      else if (m.id === 'coin' && bd > 0) x.away = true; // r34 c: the 200 USDC test is drawn only in the band that holds its ticket
      else if (r.dataset.pct) { x.pct = segs(r.dataset.pct)[0]; x.segs = [[round(a * x.pct[0] / 100), round(a * x.pct[1] / 100)]]; }
      else if (m.id === 'tether' && a >= 100000) { const c = Math.max(1000, a * 0.001); x.segs = [[c, c]]; x.tether = c; }
      if (m.id === 'fednow' && a > 10000000) x.over = true;
      return x;
    });
    // axis from $0.01 to the next power of ten above the dearest bar
    let max = 1; rows.forEach((x) => x.segs.forEach((g) => { if (g[1] > max) max = g[1]; }));
    const top = Math.max(1, Math.ceil(Math.log10(max) - 1e-9)), dec = top + 2;
    const at = (v) => Math.max(0, Math.min(100, (Math.log10(v) + 2) / dec * 100));
    // the chosen rail lights up. Rows off the route, and stablecoin rows a gate closed, step back.
    const pickRow = LADROW[res.row] ? res.row : res.then;
    const lit = LADROW[pickRow] || [];
    const dom = st.route === 'domestic';
    const coinShut = res.closed.some((c) => ['G2', 'G3', 'G4', 'G8'].includes(c.g) && /^Stablecoin/.test(c.t));
    rows.forEach((x) => {
      const scope = x.m.r.dataset.scope;
      const shut = x.over || x.away || (x.id === 'tether' && !x.tether) || (scope === 'coin' && coinShut);
      x.on = lit.includes(x.id) && !shut;
      x.off = !x.on && (shut || (dom ? scope !== 'dom' : scope === 'dom'));
      x.val = x.segs.length ? x.m.pre + say(x.segs) : x.over ? 'Over its ' + limitOf('fednow') + ' limit' : x.away ? 'Drawn under $3,000 only' : x.m.none;
    });
    return { rows, band: bd, amt: a, top, dec, at, pickRow, lit };
  };
  const ticks = (P) => {
    const step = P.dec <= 6 ? 2 : P.dec % 3 === 0 ? 3 : 2;
    const marks = []; for (let e = -2; e < P.top; e += step) marks.push(e);
    if (P.top - marks[marks.length - 1] <= step / 2 && marks.length > 1) marks.pop(); // r34 c: never two adjacent decade labels
    marks.push(P.top);
    return marks;
  };
  // the dollar cost of the chosen rail, read from the chart rows
  const costLine = (res, P) => {
    const later = P.pickRow !== res.row;
    const x = P.rows.find((r) => r.id === P.lit[0]);
    if (!x) {
      if (res.row === 8 || P.pickRow === 8) return { t: 'No published price', sub: 'A correspondent wire has no published price', none: true };
      if ((rowOf(res.row) || {}).role === 'Declined') return { t: 'No rail cost', sub: 'Declined, so no rail runs', none: true };
      return { t: 'No rail cost yet', sub: 'Held, so no rail runs until the check clears', none: true };
    }
    if (x.segs.length && x.id === 'coin') return { t: say(x.segs), sub: 'A 200 USDC test spread, not a quote', test: true };
    if (x.segs.length) return { t: say(x.segs), sub: (later ? 'Once released, on the ' : 'On the ') + x.m.name + ' row' + (x.m.pre === 'bank fee ' ? ', a median bank fee' : '') };
    if (x.id === 'fednow') return { t: 'No published customer price', sub: 'FedNow charges the bank a ' + nfOf('fednow') + ' network fee. That is not a customer price', none: true };
    if (x.away) return { t: 'No price at this size', sub: 'The one stablecoin test used 200 USDC transfers', none: true };
    return { t: x.val, none: true };
  };
  const reasonOf = (row) => { const ex = LAD.amt[band()]; return row.reason.replace('{amt}', n0(ex)).replace('{cost}', row.pct ? money(ex * row.pct / 100) : ''); };

  // the result: rail, dollar cost and the one deciding check. View a shows it as a card, view b as one line.
  const paintResult = (res, P) => {
    const row = rowOf(res.row); if (!row || !resEl || !R0) return;
    const next = res.then ? rowOf(res.then) : null;
    const d = decide(res), c = costLine(res, P);
    resEl.dataset.m = row.m; resEl.dataset.row = String(row.n);
    if (R0.role) R0.role.textContent = row.role;
    if (R0.ico) R0.ico.innerHTML = ICONS[row.kind] || ICONS.bank;
    // r37: one result line. "ACH now. RTP or FedNow once the payee is confirmed (gate G6)." The later rail comes from
    // the row this one leads to, or from the gate that closed an instant rail for an unconfirmed payee.
    const WHEN = { G2: 'legality is checked', G3: 'bank details arrive', G4: 'a cap is set', G5: 'the data is complete', G6: 'the payee is confirmed', G7: 'the coin is on the list', G8: 'the partner recovers' };
    const railHead = (t) => t.split(':')[0].replace(/ now$/, '');
    const g6c = res.closed.find((cl) => cl.g === 'G6');
    const later = next ? (next.short || next.rail) : g6c ? railHead(g6c.t) : '';
    const gateFor = later ? (res.stop || (g6c || res.gates.find((g) => g.id === 'G6' && g.s !== 'pass') ? 'G6' : (res.gates.find((g) => g.s === 'data') || {}).id)) : null;
    const nowRail = (row.short || row.rail).replace(/,\s*(or|then)\b.*$/, '');
    const line = later ? nowRail + ' now. ' + later + ' once ' + (WHEN[gateFor] || 'the check clears') + (gateFor ? ' (gate ' + gateFor + ')' : '') + '.' : row.rail + '.';
    if (R0.rf) R0.rf.textContent = line;
    if (R0.rs) R0.rs.textContent = line;
    if (R0.cost) { R0.cost.textContent = c.t; R0.cost.classList.toggle('is-none', !!c.none); }
    if (R0.cq) R0.cq.hidden = !c.test;
    if (R0.dg) { R0.dg.textContent = d.g ? d.g + ' ' + D.gates[d.k].name : 'Deciding check'; R0.dg.dataset.m = d.m; }
    if (R0.why) R0.why.textContent = d.t;
    gm.forEach((x, k) => x.classList.toggle('is-key', k === d.k));
    const bits = [];
    if (res.needs.length) bits.push('Needs data at ' + res.needs.join(', '));
    (row.cond || []).forEach((t) => bits.push(t));
    if (R0.flags) { R0.flags.textContent = bits.length ? bits.join('. ') + '.' : ''; R0.flags.hidden = !bits.length; }
    // why not the others, in the drawer
    const lines = [];
    res.closed.forEach((cl) => { const g = D.gates.find((x) => x.id === cl.g); const alt = cl.k && D.closeSrc ? D.closeSrc[cl.k] : null; lines.push({ t: cl.t, src: alt ? alt.src : g ? g.src : null, note: alt ? alt.note : g ? g.note : null }); });
    const head = (t) => t.split(':')[0].replace(/ now$/, '');
    const seen = (l) => lines.some((x) => head(x.t) === head(l.t) || head(x.t).indexOf(head(l.t)) >= 0);
    (row.not || []).forEach((l) => { if (!seen(l)) lines.push(l); });
    if (notList) { notList.textContent = ''; lines.slice(0, 4).forEach((l) => { const li = PDD.el('li', null, notList); if (l.src && l.src.length) chip(li, l.t, l.src, l.note); else li.textContent = l.t; }); }
    const reason = reasonOf(row);
    const sg = res.stop ? res.gates.find((x) => x.id === res.stop) : null;
    if (sr) sr.textContent = 'Result: ' + row.rail + '.' + (next ? ' Then ' + next.rail + '.' : '') + ' Cost: ' + c.t + '. ' + reason + '.' + (sg ? ' Stopped at ' + sg.id + ': ' + sg.why + '.' : '') + res.closed.map((cl) => ' ' + cl.g + ' closes a rail. ' + cl.t + '.').join('') + (res.needs.length ? ' Needs data at ' + res.needs.join(', ') + '.' : '') + ' Our read.';
    [R0.rf, R0.rs, R0.cost, R0.why].forEach((e) => { if (!e) return; e.classList.remove('is-new'); void e.offsetWidth; e.classList.add('is-new'); });
    resEl.classList.remove('is-busy');
  };

  // view b: the cost chart. Bars, the price chips in dollars, "Your rail", and the top five rails for narrow screens.
  const allBtn = q('.pdd-s3-all');
  const paintChart = (res, P) => {
    if (!lad || !META.length) return;
    lad.style.setProperty('--dec', String(P.dec));
    const ax = lad.querySelector('.pdd-s3-ax');
    if (ax) {
      ax.textContent = '';
      const mk = ticks(P);
      mk.forEach((e, j) => { const i = PDD.el('i', j === mk.length - 1 ? { class: 'is-end' } : j === 0 ? { class: 'is-first' } : null, ax, axis(e)); i.style.setProperty('--a', P.at(Math.pow(10, e)).toFixed(1)); });
      // r37: a tick at every power of ten, labeled or not
      for (let e = -2; e <= P.top; e++) if (!mk.includes(e)) { const t = PDD.el('i', { class: 'is-tick' }, ax); t.style.setProperty('--a', P.at(Math.pow(10, e)).toFixed(1)); }
      let cap = lad.querySelector('.pdd-s3-lcap');
      if (!cap) { cap = PDD.el('p', { class: 'pdd-s3-lcap' }, null, 'Log scale, each tick is 10x'); ax.after(cap); }
    }
    const said2 = [];
    P.rows.forEach((x) => {
      const m = x.m, track = m.track;
      if (track) {
        const bars = [...track.querySelectorAll('i')];
        x.segs.forEach((g, k) => { let b = bars[k]; if (!b) { b = PDD.el('i', null, track); bars.push(b); } b.hidden = false; b.style.setProperty('--a', P.at(g[0]).toFixed(1)); b.style.setProperty('--b', P.at(g[1]).toFixed(1)); });
        bars.slice(x.segs.length).forEach((b) => { b.hidden = true; });
      }
      if (m.c) {
        m.c.textContent = x.segs.length ? say(x.segs) : m.t0;
        if (x.pct) {
          const base = m.c.dataset.base || '', g = x.segs[0];
          const sum = g[0] === g[1] ? 'Our arithmetic: ' + n0(P.amt) + ' x ' + (x.pct[0] / 100).toFixed(4).replace(/0+$/, '') + ' = $' + money(g[0]) + '.' : 'Our arithmetic: $' + money(g[0]) + ' to $' + money(g[1]) + ' on $' + n0(P.amt) + '.';
          m.c.setAttribute('data-note', (base ? base + ' ' : '') + sum);
        }
        if (x.id === 'tether') { const base = m.c.dataset.base || ''; m.c.setAttribute('data-note', x.tether ? base + ' Our arithmetic: $' + money(x.tether) + ' on $' + n0(P.amt) + '.' : base); }
      }
      if (x.id === 'tether') m.r.dataset.h = x.tether ? (x.tether > 1000 ? 'pct' : 'fee') : 'none';
      const lx = m.r.querySelector('.pdd-s3-lx'); if (lx) lx.hidden = !x.over;
      if (x.id === 'coin') { m.r.dataset.h = x.away ? 'none' : 'pct'; const lq = m.r.querySelector('.pdd-s3-lq'); if (lq) lq.hidden = !x.away; }
      // r37: a row with no price shows a chip where its bar would be, so it never reads as a zero cost
      if (!x.segs.length) m.r.dataset.h = 'none'; else if (!m.r.dataset.h || m.r.dataset.h === 'none') m.r.dataset.h = x.pct ? 'pct' : 'fee';
      if (m.ln) { let npc = m.ln.querySelector('.pdd-s3-npc'); if (!npc) npc = PDD.el('em', { class: 'pdd-s3-npc' }, m.ln, 'No public price'); npc.hidden = !!x.segs.length; }
      m.r.classList.toggle('is-on', x.on); m.r.classList.toggle('is-dim', x.off);
      if (m.em) m.em.hidden = !x.on;
      if (x.segs.length) said2.push(m.name + ' ' + x.val + (x.over ? ', over its limit' : ''));
    });
    // r37: three labeled groups. Per-item fees, percent-of-amount prices at this size, and rows with no public price,
    // read from the row data (data-usd, data-pct, the Tether rule) and the price() result. Rows move only when the order changes.
    const rowsBox = lad.querySelector('.pdd-s3-rows');
    if (rowsBox) {
      const GROUPS = [['fee', 'Per-item fee'], ['pct', 'Percent of amount at your size'], ['none', 'No public price']];
      const grp = (x) => (!x.segs.length ? 'none' : x.pct || x.tether ? 'pct' : 'fee');
      const want = [];
      GROUPS.forEach(([k, t]) => {
        let h = rowsBox.querySelector('.pdd-s3-lg[data-g="' + k + '"]');
        if (!h) h = PDD.el('p', { class: 'pdd-s3-lg', 'data-g': k }, null, t);
        const members = P.rows.filter((x) => grp(x) === k);
        h.hidden = !members.length;
        want.push(h); members.forEach((x) => want.push(x.m.r));
      });
      const have = [...rowsBox.children];
      if (want.length !== have.length || want.some((n, i) => n !== have[i])) want.forEach((n) => rowsBox.appendChild(n));
    }
    // top five: your rail, then priced rows on this route, then priced rows off it, then rows with no price
    const rank = (x) => (x.on ? 0 : x.segs.length && !x.off ? 1 : x.segs.length ? 2 : 3);
    const order = P.rows.map((x, k) => ({ x, k })).sort((a, b) => rank(a.x) - rank(b.x) || a.k - b.k);
    order.forEach((o, j) => o.x.m.r.classList.toggle('is-top', j < 5));
    const title = 'One $' + LAD.say[P.band] + ' payment, log scale';
    const lh = lad.querySelector('.pdd-s3-lh'); if (lh) lh.textContent = title;
    lad.setAttribute('aria-label', 'Published prices on one log scale, as the cost of a single $' + LAD.say[P.band] + ' payment. Percentage prices are placed by our arithmetic. No stablecoin payout price is published.');
    const lsr = lad.querySelector('.pdd-s3-lsr');
    const railRow = rowOf(P.pickRow) || rowOf(res.row);
    const onRow = P.rows.find((x) => x.on);
    if (lsr) lsr.textContent = title + '. ' + said2.join('. ') + '.' + (railRow ? ' Your rail: ' + railRow.rail + (onRow ? ', on the ' + onRow.m.name + ' row.' : ', no published price on this chart.') : '');
  };
  if (allBtn && lad) allBtn.addEventListener('click', () => {
    const on = !lad.hasAttribute('data-all');
    lad.toggleAttribute('data-all', on); allBtn.setAttribute('aria-expanded', String(on));
    allBtn.textContent = on ? 'Top 5' : 'Show all';
  });

  // view a: the slim cost strip. One log axis, every priced row as a mark, labels stacked in lanes above the line.
  const strip = q('.pdd-s3-strip'), sa = q('.pdd-s3-sa'), nop = q('.pdd-s3-nop');
  const marks = {};
  const paintStrip = (P) => {
    if (!strip || !sa) return;
    const lh = strip.querySelector('.pdd-s3-lh'); if (lh) lh.textContent = 'One $' + LAD.say[P.band] + ' payment, log scale';
    const onRow = P.rows.find((x) => x.on);
    const said = onRow && !onRow.segs.length ? onRow.m.name + ' is your rail and has no published customer price, so it has no mark here.' : !onRow ? 'Your rail has no published price on this scale.' : '';
    if (nop) { nop.textContent = said; nop.hidden = !said; }
    const W = sa.clientWidth; if (!W) return;
    const priced = P.rows.filter((x) => x.segs.length);
    Object.keys(marks).forEach((id) => { if (!priced.find((x) => x.id === id)) { marks[id].mk.remove(); marks[id].lb.remove(); marks[id].ld.remove(); delete marks[id]; } });
    priced.forEach((x) => {
      if (!marks[x.id]) {
        const ld = PDD.el('i', { class: 'pdd-s3-ld', 'data-m': x.m.r.dataset.m }, sa);
        const mk = PDD.el('i', { class: 'pdd-s3-mk', 'data-m': x.m.r.dataset.m }, sa);
        const lb = PDD.el('span', { class: 'pdd-s3-lb', 'data-m': x.m.r.dataset.m }, sa);
        marks[x.id] = { mk, lb, ld };
      }
      const k = marks[x.id];
      k.lb.hidden = false; k.ld.hidden = false; // measured below, so it must be laid out
      k.lb.textContent = ''; PDD.el('b', null, k.lb, x.m.name); k.lb.appendChild(document.createTextNode(x.val));
      ['mk', 'lb', 'ld'].forEach((n) => { k[n].classList.toggle('is-on', x.on); k[n].classList.toggle('is-off', x.off); });
    });
    // lanes: your rail first, then rows on this route, then the rest
    const order = priced.slice().sort((a, b) => (b.on - a.on) || (a.off - b.off));
    const lanes = [[], [], []], place = {};
    order.forEach((x) => {
      const a = P.at(x.segs[0][0]), b = P.at(x.segs[x.segs.length - 1][1]);
      const cpx = (a + b) / 200 * W, w = marks[x.id].lb.offsetWidth;
      const left = Math.max(0, Math.min(W - w, cpx - w / 2));
      const L = lanes.findIndex((ln) => ln.every((iv) => left + w + 8 <= iv[0] || left >= iv[1] + 8));
      if (L < 0) { place[x.id] = null; return; }
      lanes[L].push([left, left + w]); place[x.id] = { L, left, cpx };
    });
    const nL = Math.max(1, lanes.filter((l) => l.length).length), LH = 28, lineY = nL * LH + 8;
    sa.style.height = (lineY + 30) + 'px';
    let ln = sa.querySelector('.pdd-s3-bl'); if (!ln) { ln = PDD.el('i', { class: 'pdd-s3-bl' }); sa.prepend(ln); }
    ln.style.top = lineY + 'px';
    priced.forEach((x) => {
      const k = marks[x.id], p = place[x.id];
      const a = P.at(x.segs[0][0]), b = P.at(x.segs[x.segs.length - 1][1]);
      const h = x.on ? 18 : 10;
      k.mk.style.left = 'calc(' + a.toFixed(2) + '% - 5px)'; k.mk.style.width = 'calc(' + Math.max(0, b - a).toFixed(2) + '% + 10px)';
      k.mk.style.top = (lineY + 1 - h / 2) + 'px';
      if (!p) { k.lb.hidden = true; k.ld.hidden = true; return; }
      k.lb.hidden = false; k.ld.hidden = false;
      const y = (nL - 1 - p.L) * LH + 2;
      k.lb.style.left = p.left + 'px'; k.lb.style.top = y + 'px';
      k.ld.style.left = p.cpx + 'px'; k.ld.style.top = (y + 24) + 'px'; k.ld.style.height = Math.max(0, lineY - y - 24 - h / 2) + 'px';
    });
    let ax = sa.querySelector('.pdd-s3-sx'); if (!ax) ax = PDD.el('div', { class: 'pdd-s3-sx' }, sa);
    ax.style.top = (lineY + 12) + 'px'; ax.textContent = '';
    const mk = ticks(P);
    mk.forEach((e, j) => { const i = PDD.el('i', j === 0 ? { class: 'is-first' } : j === mk.length - 1 ? { class: 'is-end' } : null, ax, axis(e)); i.style.left = P.at(Math.pow(10, e)).toFixed(2) + '%'; });
  };
  if (sa) PDD.onResize(sa, () => { if (cur) paintStrip(price(cur)); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { if (cur) paintStrip(price(cur)); });

  // the five scenarios. Every number in a caption is read from the chart rows or the gate result, never typed in.
  const pbtn = { play: q('[data-play="play"]'), pause: q('[data-play="pause"]'), replay: q('[data-play="replay"]') };
  const pc = q('.pdd-s3-pc'), pk = q('.pdd-s3-pk'), pt = q('.pdd-s3-pt');
  const pdots = [...scene.querySelectorAll('.pdd-s3-pn i')];
  const costOf = (P, id) => { const x = P.rows.find((r) => r.id === id); return x ? x.val : ''; };
  const amtSay = (P) => '$' + LAD.say[P.band];
  const SCEN = [
    { p: 'us-next', o: { amount: 0 }, t: (res, P) => ['A ' + amtSay(P) + ' invoice to a US supplier, next day. ACH costs ' + costOf(P, 'ach') + '. FedNow has no published customer price.'] },
    { p: 'us-next', o: {}, t: (res, P) => ['The same supplier at ' + amtSay(P) + '. ACH still costs ' + costOf(P, 'ach') + ', since its fee does not grow with size. Percentage prices belong to cross-border rails, so they step back.'] },
    { p: 'us-next', o: { amount: 2, speed: 'same' }, t: (res, P) => { const c = res.closed[0]; return ['A ' + amtSay(P) + ' treasury payment, same day. ' + (c ? 'Gate ' + c.g + ' closes Same Day ACH above $1 million. ' : '') + 'RTP and FedNow allow up to ' + limitOf('fednow') + ' but publish no customer price. A Fedwire median bank fee is ' + costOf(P, 'fedwire').replace(metaOf('fedwire').pre, '') + '.']; } },
    { p: 'brazil', o: {}, t: (res, P) => { const c = res.closed.find((x) => /^Stablecoin/.test(x.t)); return ['A ' + amtSay(P) + ' payout to a Brazil payee at a weekend. ' + (c ? 'Gate ' + c.g + ' closes the stablecoin rail on Brazil eFX legs. ' : '') + 'The bank partner is priced at the ' + pctOf('sme') + ' SME average, ' + costOf(P, 'sme') + '. ', 'Wise lists from ' + pctOf('wise') + ', ' + costOf(P, 'wise').replace(metaOf('wise').pre, '') + ', and is worth a quote first.']; } },
    { p: 'contractor', o: { day: 'outside' }, t: (res, P) => ['After hours, ' + amtSay(P) + ' to a consenting payee abroad with a wallet. The lane opens 18 Jan 2027 at the earliest. ', 'It wins on after-hours reach, not on price.', ' Wise shows ' + costOf(P, 'wise') + '. The 200 USDC test ran from ' + pctOf('coin') + ', ' + costOf(P, 'coin') + ' here, not a quote.'] },
  ];
  const N = SCEN.length, HOLD = 4200;
  const scenOf = () => SCEN.findIndex((sc) => { const p = Object.assign({}, D.presets[sc.p], sc.o); return KEYS.every((k) => p[k] === st[k]) && p.amount === st.amount; });
  let pi = -1, ptimer = null, playing = false;
  const paintPlayer = () => {
    if (pc) pc.dataset.state = playing ? 'play' : pi < 0 ? 'idle' : 'pause';
    if (pbtn.play) pbtn.play.hidden = playing;
    if (pbtn.pause) pbtn.pause.hidden = !playing;
    pdots.forEach((d, j) => { d.classList.toggle('is-on', j === pi); d.classList.toggle('is-done', pi >= 0 && j < pi); });
  };
  // the caption under the result: the scenario story when the inputs match one, else the rail's sourced reason
  const paintCap = (res, P) => {
    const si = scenOf();
    if (!playing) pi = si;
    chipBtns.forEach((b) => b.setAttribute('aria-pressed', String(Number(b.dataset.scen) === si)));
    if (pt) {
      pt.textContent = '';
      if (si >= 0) {
        if (pk) pk.textContent = (si + 1) + ' of ' + N + '.';
        [].concat(SCEN[si].t(res, P)).forEach((x, j) => { if (j === 1) PDD.el('span', { class: 'pdd-view' }, pt, x); else pt.appendChild(document.createTextNode(x)); });
        scene.setAttribute('data-scen', String(si + 1));
      } else {
        const row = rowOf(res.row), c = costLine(res, P), reason = reasonOf(row);
        if (pk) pk.textContent = touched ? 'Your inputs.' : 'This payout.';
        if (row.src && row.src.length) chip(pt, reason, row.src, row.note); else pt.appendChild(document.createTextNode(reason));
        // r37: the cost basis is added only when there is no price to show, so the result is not stated twice
        pt.appendChild(document.createTextNode('.' + (c.none && c.sub ? ' ' + c.sub + '.' : '')));
        scene.removeAttribute('data-scen');
      }
    }
    paintPlayer();
  };

  const settle = (res) => {
    const P = price(res);
    res.gates.forEach((g, k) => paintGate(k, g)); showNote(pick(res));
    paintResult(res, P); paintChart(res, P); paintStrip(P); paintCap(res, P);
    busy = false;
  };
  const run = (animate) => {
    timers.forEach(clearTimeout); timers = [];
    const res = choose(st); cur = res;
    const n = res.gates.length;
    if (!animate || PDD.still || !scene.classList.contains('is-in')) { settle(res); return; }
    busy = true; if (resEl) resEl.classList.add('is-busy');
    res.gates.forEach((g, k) => paintGate(k, g, true));
    for (let k = 0; k < n; k++) timers.push(setTimeout(() => paintGate(k, res.gates[k]), 60 + k * 95));
    timers.push(setTimeout(() => settle(res), 60 + n * 95 + 80));
  };

  const apply = (name) => { const p = D.presets[name]; if (!p) return; KEYS.forEach((k) => { if (p[k] !== undefined) setKey(k, p[k]); }); setAmount(p.amount); run(true); };
  const showScen = (i) => {
    const sc = SCEN[i], p = sc && D.presets[sc.p]; if (!p) return;
    pi = i; touched = true;
    KEYS.forEach((k) => { const v = sc.o[k] !== undefined ? sc.o[k] : p[k]; if (v !== undefined) setKey(k, v); });
    setAmount(sc.o.amount !== undefined ? sc.o.amount : p.amount);
    run(true); paintPlayer();
  };
  const stopPlay = () => { clearTimeout(ptimer); ptimer = null; if (playing) { playing = false; paintPlayer(); } };
  const tick = () => { clearTimeout(ptimer); if (!playing) return; ptimer = setTimeout(() => { if (pi + 1 < N) { showScen(pi + 1); tick(); } else { playing = false; paintPlayer(); } }, HOLD); };
  if (pbtn.play) pbtn.play.addEventListener('click', () => { playing = true; showScen(pi < 0 || pi >= N - 1 ? 0 : pi + 1); tick(); if (pbtn.pause) pbtn.pause.focus(); });
  if (pbtn.pause) pbtn.pause.addEventListener('click', () => { stopPlay(); if (pbtn.play) pbtn.play.focus(); });
  if (pbtn.replay) pbtn.replay.addEventListener('click', () => { playing = true; showScen(0); tick(); if (pbtn.pause) pbtn.pause.focus(); });

  // a hand on any input stops the player. Chips, size and inputs all write the one shared state, so both views follow.
  chipBtns.forEach((b) => b.addEventListener('click', () => { stopPlay(); showScen(Number(b.dataset.scen)); }));
  selects.forEach((s) => s.addEventListener('change', () => {
    const k = s.dataset.key; if (!KEYS.includes(k) || st[k] === s.value) return;
    stopPlay(); setKey(k, s.value); touched = true; link(k); run(true);
  }));
  if (amt) amt.addEventListener('input', () => { stopPlay(); touched = true; setAmount(amt.value); run(true); });
  sizeBtns.forEach((b) => b.addEventListener('click', () => { stopPlay(); touched = true; setAmount(b.dataset.a); run(true); }));
  gateEls.forEach((b, k) => { if (b) b.addEventListener('click', () => { if (!busy) showNote(k); }); });
  // "Inputs and 8 gates" in the result opens the drawer below
  if (opener && dw) {
    opener.addEventListener('click', () => { dw.open = !dw.open; if (dw.open) requestAnimationFrame(() => dw.scrollIntoView({ behavior: PDD.still ? 'auto' : 'smooth', block: 'nearest' })); });
    dw.addEventListener('toggle', () => opener.setAttribute('aria-expanded', String(dw.open)));
  }

  // the view switch: .pdd-seg data-key="rv" sets data-rv on the scene. A reader's choice is written to the address as rail=b.
  const rvBtns = [...scene.querySelectorAll('.pdd-s3-rv button[data-val]')];
  const OWN = /^(reader|build|arch|rail)=/;
  const writeRail = (v) => {
    const bm = /[#&]build=([a-z]+)/.exec(location.hash), am = /[#&]arch=(current|today|year1|target)/.exec(location.hash);
    const parts = [];
    if (PDD.reader) parts.push('reader=' + PDD.reader);
    if (bm) parts.push('build=' + bm[1]);
    if (bm && bm[1] === 'arch' && am) parts.push('arch=' + am[1]);
    if (v === 'b') parts.push('rail=b');
    // keep key=value parts this page does not own, so other links survive the rewrite
    location.hash.replace(/^#/, '').split('&').forEach((x) => { if (x.includes('=') && !OWN.test(x)) parts.push(x); });
    try { history.replaceState(null, '', parts.length ? '#' + parts.join('&') : location.pathname + location.search); } catch (err) { /* ignore */ }
  };
  rvBtns.forEach((b) => b.addEventListener('click', (e) => { if (e.isTrusted) writeRail(b.dataset.val); }));
  scene.addEventListener('pdd:set', (e) => { if (e.detail && e.detail.key === 'rv' && cur) paintStrip(price(cur)); });
  const pickView = (v) => { const b = rvBtns.find((x) => x.dataset.val === v); if (b && b.getAttribute('aria-pressed') !== 'true') b.click(); };
  const hashRail = () => { const m = /[#&]rail=(a|b)/.exec(location.hash); return m ? m[1] : null; };
  const h0 = hashRail(); if (h0) pickView(h0);
  // a shared link with rail= and no build tab opens on this screen, after the reader has set its own scroll
  if (h0 && !/[#&]build=/.test(location.hash)) {
    const go = () => setTimeout(() => scene.scrollIntoView({ behavior: 'instant', block: 'start' }), 120);
    if (document.readyState === 'complete') go(); else window.addEventListener('load', go, { once: true });
  }
  // a state address without rail= means view A. Plain anchors such as #pdd-path leave the view alone.
  window.addEventListener('hashchange', () => { const h = hashRail(); if (h) pickView(h); else if (/[#&](reader|build)=/.test(location.hash)) pickView('a'); });

  // play the gate run once, on first view
  scene.addEventListener('pdd:in', () => { if (!busy) run(true); }, { once: true });
  PDD.onReader((r) => { if (touched) return; const name = D.readers && D.readers[r]; if (name) apply(name); });

  // start from the scene's own state so the page is right before a reader is set
  KEYS.forEach((k) => setKey(k, st[k])); setAmount(st.amount); run(false);
})();

/* Screen 2: where AI earns a place */
(function () {
  const PDD = window.PDD; if (!PDD) return;
  const root = PDD.root;
  const scene = root.querySelector('#pdd-ai'); if (!scene) return;
  let D = null, C = null;
  try { D = PDD.data('s4-cases'); C = PDD.data('s4-calc'); } catch (e) { return; }
  if (!D || !C) return;

  // ---- map and detail card
  const nodes = [...scene.querySelectorAll('.pdd-s4-node')];
  const detail = scene.querySelector('.pdd-s4-detail');
  const map = scene.querySelector('.pdd-s4-map');
  const byId = {}; D.cases.forEach((c) => { byId[c.id] = c; });
  const MOD = { pv: 'ok', pn: 'flow', pilot: 'rule' };
  const STEPS = { inv: [1], bank: [2], tax: [2], fraud: [3], sanc: [4], rail: [5], agent: [3, 4, 5, 6], exc: [6], rec: [7] };
  let current = '';
  const fillRow = (dd, parts) => {
    if (!dd) return;
    dd.textContent = '';
    parts.forEach((p, i) => {
      // a string followed by {tag:'judge'} is our view: it renders as a highlight, with no tag
      if (typeof p === 'string' && parts[i + 1] && parts[i + 1].tag === 'judge') { PDD.el('span', { class: 'pdd-view' }, dd, p.trim()); return; }
      if (typeof p === 'string') {
        const last = dd.lastChild; let t = p;
        if (/^[.,]/.test(p) && last && last.nodeType === 1 && last.classList.contains('pdd-chip')) { const nb = PDD.el('span', { class: 'pdd-nb' }); dd.replaceChild(nb, last); nb.appendChild(last); nb.appendChild(document.createTextNode(p[0])); t = p.slice(1); }
        if (t) dd.appendChild(document.createTextNode(t));
      }
      else if (p.tag === 'judge') { /* drawn as the highlight above */ }
      else { const a = { class: 'pdd-chip', 'data-src': p.src.join(' ') }; if (p.note) a['data-note'] = p.note; PDD.el('span', a, dd, p.t); }
    });
  };
  const sliders = {};
  scene.querySelectorAll('.pdd-s4-sl').forEach((s) => { sliders[s.dataset.k] = s; });
  const select = (id, quiet) => {
    const c = byId[id]; if (!c) return;
    current = id;
    scene.dataset.case = id;
    nodes.forEach((n) => { const on = n.dataset.id === id; n.setAttribute('aria-pressed', String(on)); if (on && map && map.scrollWidth > map.clientWidth + 4) map.scrollTo({ left: n.offsetLeft - (map.clientWidth - n.offsetWidth) / 2, behavior: PDD.still || quiet ? 'auto' : 'smooth' }); });
    Object.keys(sliders).forEach((k) => sliders[k].classList.toggle('is-lever', k === c.lever));
    if (!detail) return;
    detail.dataset.g = c.g;
    if (MOD[c.g]) detail.dataset.m = MOD[c.g]; else detail.removeAttribute('data-m');
    const name = detail.querySelector('.pdd-s4-dname'); if (name) name.textContent = c.name;
    const badge = detail.querySelector('.pdd-s4-badge'); if (badge) badge.textContent = D.grades[c.g];
    const lever = detail.querySelector('.pdd-s4-lever'); if (lever) lever.textContent = 'Moves: ' + (c.lever ? D.levers[c.lever] : 'no slider yet');
    ['p', 'a', 'k', 'e'].forEach((r) => fillRow(detail.querySelector('dd[data-row="' + r + '"]'), c[r]));
    if (!quiet && !PDD.still) { detail.classList.remove('is-pop'); void detail.offsetWidth; detail.classList.add('is-pop'); }
  };
  nodes.forEach((n) => n.addEventListener('click', () => select(n.dataset.id)));
  // links to the payee change guard open the bank detail case first, since the guard shows only for that case.
  // The listener sits on the link, so it runs before the root handler that scrolls.
  root.querySelectorAll('a[href="#pdd-guard"]').forEach((a) => a.addEventListener('click', () => { if (byId.bank) select('bank', true); }));
  const applyGrade = () => {
    const g = scene.getAttribute('data-grade') || 'all';
    let first = null, ok = false;
    const st = scene.getAttribute('data-step') || 'all';
    nodes.forEach((n) => { const inStep = st === 'all' || (STEPS[n.dataset.id] || []).includes(+st); n.hidden = !inStep; const on = inStep && (g === 'all' || n.dataset.g === g); n.classList.toggle('is-dim', !on); if (on && !first) first = n; if (on && n.dataset.id === current) ok = true; });
    if (!ok && first) select(first.dataset.id);
  };
  scene.addEventListener('pdd:set', (e) => { if (e.detail && e.detail.key === 'grade') applyGrade(); });
  const sbtns = [...scene.querySelectorAll('.pdd-s4-sbtn')];
  sbtns.forEach((b) => b.addEventListener('click', () => { scene.setAttribute('data-step', b.dataset.step); sbtns.forEach((x) => x.setAttribute('aria-pressed', String(x === b))); applyGrade(); }));
  const sdrawer = scene.querySelector('.pdd-s4-stepsd');
  if (sdrawer) sdrawer.addEventListener('toggle', () => { if (!sdrawer.open && scene.getAttribute('data-step') && scene.getAttribute('data-step') !== 'all') { const all = sbtns.find((x) => x.dataset.step === 'all'); if (all) all.click(); } });
  select((D.defaults && D.defaults[PDD.reader]) || 'inv', true);
  PDD.onReader((r) => {
    const g = scene.getAttribute('data-grade') || 'all';
    const want = D.defaults[r];
    if (want && byId[want] && (g === 'all' || byId[want].g === g)) select(want, true);
  });
  applyGrade();

  // ---- bottom-up calculator
  const inp = {}, out = {};
  C.inputs.forEach((i) => { inp[i.k] = scene.querySelector('#pdd-s4-' + i.k); out[i.k] = scene.querySelector('output[for="pdd-s4-' + i.k + '"]'); });
  if (C.inputs.some((i) => !inp[i.k])) return;
  const o = (k) => scene.querySelector('[data-out="' + k + '"]');
  const oTotal = o('total'), oProc = o('proc'), oFraud = o('fraud');
  const bar = scene.querySelector('.pdd-s4-bar');
  const segP = scene.querySelector('[data-seg="proc"]'), segF = scene.querySelector('[data-seg="fraud"]');
  const presets = [...scene.querySelectorAll('[data-preset]')];
  const sum = (v) => { const proc = v.pay * v.cost * (v.auto / 100) * (v.save / 100); const fraud = C.losses.v * (v.fraud / 100); return { proc, fraud, total: proc + fraud }; };
  const b2 = (x) => '$' + x.toFixed(2) + 'B', b1 = (x) => '$' + x.toFixed(1) + 'B';
  const show = { pay: (x) => x.toFixed(1) + 'B', cost: (x) => PDD.usd(x), auto: (x) => x + '%', save: (x) => x + '%', fraud: (x) => x + '%' };
  const say = { pay: (x) => x.toFixed(1) + ' billion payments a year', cost: (x) => PDD.usd(x) + ' per item', auto: (x) => x + ' percent automatable', save: (x) => x + ' percent of cost saved', fraud: (x) => x + ' percent of fraud loss addressable' };
  let shown = null, raf = 0;
  const read = () => { const v = {}; C.inputs.forEach((i) => { v[i.k] = Number(inp[i.k].value); }); return v; };
  const update = () => {
    const v = read(), s = sum(v);
    C.inputs.forEach((i) => { if (out[i.k]) out[i.k].textContent = show[i.k](v[i.k]); inp[i.k].setAttribute('aria-valuetext', say[i.k](v[i.k])); });
    if (oProc) oProc.textContent = b2(s.proc);
    if (oFraud) oFraud.textContent = b2(s.fraud);
    const scale = Math.max(30, Math.ceil(s.total / 10) * 10);
    if (segP) segP.style.width = (s.proc / scale) * 100 + '%';
    if (segF) segF.style.width = (s.fraud / scale) * 100 + '%';
    let name = 'Your inputs';
    presets.forEach((b) => { const p = C.presets.find((x) => x.id === b.dataset.preset); const on = !!p && C.inputs.every((i) => Math.abs(p.v[i.k] - v[i.k]) < 1e-9); b.setAttribute('aria-pressed', String(on)); if (on) name = b.textContent; });
    if (bar) bar.setAttribute('aria-label', name + ': processing value ' + s.proc.toFixed(2) + ' billion dollars and fraud value ' + s.fraud.toFixed(2) + ' billion dollars a year, ' + s.total.toFixed(1) + ' billion in total. Our arithmetic, an illustration for the United States.');
    if (oTotal) {
      cancelAnimationFrame(raf);
      const from = shown == null ? s.total : shown, to = s.total;
      if (PDD.still || shown == null || Math.abs(to - from) < 0.05) { oTotal.textContent = b1(to); shown = to; }
      else { const t0 = performance.now(); const step = (t) => { const k = Math.min(1, (t - t0) / 450), e = 1 - Math.pow(1 - k, 3); shown = from + (to - from) * e; oTotal.textContent = b1(k === 1 ? to : shown); if (k < 1) raf = requestAnimationFrame(step); else shown = to; }; raf = requestAnimationFrame(step); }
    }
  };
  C.inputs.forEach((i) => inp[i.k].addEventListener('input', update));
  presets.forEach((b) => b.addEventListener('click', () => {
    const p = C.presets.find((x) => x.id === b.dataset.preset); if (!p) return;
    C.inputs.forEach((i) => { inp[i.k].value = p.v[i.k]; PDD.fill(inp[i.k]); });
    update();
  }));
  update();
})();

/* Screen 6: rules, open questions and the copy link */
(function () {
  const PDD = window.PDD; if (!PDD) return; const root = PDD.root;
  const scene = root.querySelector('.pdd-s5-scene'); if (!scene) return;
  const track = scene.querySelector('.pdd-s5-track');
  const detail = scene.querySelector('.pdd-s5-detail');
  let data = null; try { data = PDD.data('s5-dates'); } catch (e) { data = null; }
  if (track && detail && Array.isArray(data)) {
    const home = detail.parentNode;
    const byId = {}; data.forEach((d) => { byId[d.id] = d; });
    const btns = [...track.querySelectorAll('button[data-id]')];
    let cur = 'ifr';
    const vertical = () => getComputedStyle(track).getPropertyValue('--pdd-s5-v').trim() === '1';
    const place = () => {
      const b = btns.find((x) => x.dataset.id === cur);
      if (vertical() && b && b.parentNode) { if (detail.parentNode !== b.parentNode) b.parentNode.appendChild(detail); }
      else if (detail.parentNode !== home) home.appendChild(detail);
    };
    const show = (id, animate) => {
      const d = byId[id]; if (!d) return; cur = id;
      btns.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.id === id)));
      detail.setAttribute('data-m', d.m);
      detail.textContent = '';
      PDD.el('span', { class: 'pdd-s5-st' }, detail, d.status);
      const p = PDD.el('p', null, detail);
      const attrs = { class: 'pdd-chip', 'data-src': d.src.join(' ') };
      if (d.note) attrs['data-note'] = d.note;
      PDD.el('span', attrs, p, d.when);
      p.appendChild(document.createTextNode(' ' + d.text));
      place();
      const drawer = home.closest ? home.closest('details') : null; if (animate && drawer) drawer.open = true;
      if (animate && !PDD.still) { detail.classList.remove('is-new'); void detail.offsetWidth; detail.classList.add('is-new'); }
    };
    btns.forEach((b, i) => {
      b.addEventListener('click', () => show(b.dataset.id, true));
      b.addEventListener('keydown', (e) => {
        const step = (e.key === 'ArrowRight' || e.key === 'ArrowDown') ? 1 : (e.key === 'ArrowLeft' || e.key === 'ArrowUp') ? -1 : 0;
        if (!step) return;
        const n = btns[i + step]; if (!n) return;
        e.preventDefault(); n.focus(); show(n.dataset.id, true);
      });
    });
    show(cur, false);
    PDD.onResize(track, place);
    // r37: the Today marker reads the real date, "1 Nov 2026", and sits between its dated neighbours inside its own slot
    const todayLi = track.querySelector('.pdd-s5-today');
    if (todayLi) {
      const now = new Date(), MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const label = now.getDate() + ' ' + MON[now.getMonth()] + ' ' + now.getFullYear();
      const span = todayLi.querySelector('span.pdd-today[data-today]') || todayLi.querySelector('span');
      if (span) { span.textContent = span.classList.contains('pdd-today') ? label : 'Today, ' + label; span.setAttribute('data-today', now.toISOString().slice(0, 10)); }
      const lis = [...track.children], k = lis.indexOf(todayLi);
      const dateOf = (li) => { const b = li.querySelector('button[data-id]'); const d = b && byId[b.dataset.id]; const t = d && Date.parse(d.when); return t && !isNaN(t) ? t : null; };
      let a = null, b = null, ia = k - 1, ib = k + 1;
      while (ia >= 0 && (a = dateOf(lis[ia])) == null) ia--;
      while (ib < lis.length && (b = dateOf(lis[ib])) == null) ib++;
      if (k >= 0 && a != null && b != null && b > a) {
        const f = Math.max(0, Math.min(1, (now.getTime() - a) / (b - a)));
        const n = k - 0.4 + 0.8 * f; // stays inside its slot so the pill never crosses a neighbour's label
        todayLi.style.setProperty('--n', n.toFixed(2)); track.style.setProperty('--today', (n + 0.5).toFixed(2));
      }
    }
  }
  const copyBtn = scene.querySelector('.pdd-s5-copybtn');
  const said = scene.querySelector('.pdd-s5-copied');
  if (copyBtn && said) {
    const SEAT = { buyer: 'finance buyer', builder: 'product builder', strategy: 'strategy reader' };
    const link = () => { if (!PDD.reader) return location.origin + location.pathname; const bm = /[#&]build=([a-z]+)/.exec(location.hash), am = /[#&]arch=(current|today|year1|target)/.exec(location.hash); return location.origin + location.pathname + '#reader=' + PDD.reader + (bm ? '&build=' + bm[1] : '') + (bm && bm[1] === 'arch' && am ? '&arch=' + am[1] : '') + PDD.railPart(); };
    const legacy = (text) => {
      const ta = document.createElement('textarea'); ta.value = text; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select(); let ok = false;
      try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
      document.body.removeChild(ta); return ok;
    };
    let timer = 0;
    const say = (ok, text) => {
      said.textContent = ok ? 'Link copied for the ' + (SEAT[PDD.reader] || 'current') + ' seat.' : 'Copy failed. The link is ' + text;
      clearTimeout(timer); if (ok) timer = setTimeout(() => { said.textContent = ''; }, 4000);
    };
    copyBtn.addEventListener('click', () => {
      const text = link();
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(() => say(true, text), () => say(legacy(text), text));
      else say(legacy(text), text);
    });
    PDD.onReader(() => { said.textContent = ''; });
  }
})();

/* Screen 3: how agent payments get built. The .pdd-seg sets data-tab on the scene, CSS shows one panel. Run steps the flow. */
(function () {
  const PDD = window.PDD; if (!PDD) return;
  const scene = PDD.root.querySelector('#pdd-build'); if (!scene) return;
  const steps = [...scene.querySelectorAll('.pdd-bd-step')];
  const runBtn = scene.querySelector('.pdd-bd-run');
  const status = scene.querySelector('.pdd-bd-fst');
  const tabs = [...scene.querySelectorAll('.pdd-bd-seg button[data-val]')];
  // r37: every seat lands on Verdict. Who gains, Who loses and Integrations may live as drawers inside the Verdict panel,
  // so a deep link to them selects Verdict and opens the drawer. If the old tab still exists, it is used as before.
  const DEF = { buyer: 'verdict', builder: 'verdict', strategy: 'verdict' }; // every seat lands on Verdict with its drawers closed
  const drawerFor = (v) => scene.querySelector('details[data-p="' + v + '"], details#pdd-bd-' + v + ', details[data-tab="' + v + '"], details[data-drawer="' + v + '"]');
  const STEP = 650;
  let timer = 0, touched = false, ran = false;
  const say = (t) => { if (status) status.textContent = t; };
  const name = (s) => { const b = s.querySelector('.pdd-bd-sh b'); return b ? b.textContent : ''; };
  const mark = (n) => steps.forEach((s, i) => { s.toggleAttribute('data-done', i < n); if (i === n - 1) s.setAttribute('aria-current', 'step'); else s.removeAttribute('aria-current'); });
  const flash = (s) => { if (PDD.still) return; s.classList.remove('is-flash'); void s.offsetWidth; s.classList.add('is-flash'); };
  const done = () => say('Released and reconciled. All seven checks passed.');
  const run = () => {
    clearTimeout(timer); ran = true; steps.forEach((s) => s.classList.remove('is-flash'));
    if (!steps.length) return;
    if (PDD.still) { mark(steps.length); done(); return; }
    let i = 0; mark(0);
    const tick = () => { mark(i + 1); flash(steps[i]); say('Step ' + (i + 1) + ' of ' + steps.length + ': ' + name(steps[i])); i++; timer = setTimeout(i < steps.length ? tick : done, STEP); };
    tick();
  };
  if (runBtn) runBtn.addEventListener('click', run);
  // a tab chosen by the reader is written to the address, so a reload or a copied link keeps it
  tabs.forEach((b) => b.addEventListener('click', (e) => {
    if (!e.isTrusted) return; touched = true;
    const a2 = scene.querySelector('.pdd-ar3');
    if (PDD.reader) { try { history.replaceState(null, '', '#reader=' + PDD.reader + '&build=' + b.dataset.val + (b.dataset.val === 'arch' && a2 ? '&arch=' + a2.dataset.arch : '') + PDD.railPart()); } catch (err) { /* ignore */ } }
  }));
  scene.addEventListener('pdd:set', (e) => {
    if (!e.detail || e.detail.key !== 'tab') return;
    if (e.detail.value !== 'flow') { clearTimeout(timer); return; }
    if (!ran && scene.classList.contains('is-in')) run();
  });
  // deep link: #reader=builder&build=flow opens that tab
  // open is true only for a hash the reader changed in session. A page that loads on a drawer link lands on Verdict with the drawer closed.
  const pick = (v, open) => {
    let b = tabs.find((x) => x.dataset.val === v);
    const d = b ? null : drawerFor(v);
    if (!b && d) { b = tabs.find((x) => x.dataset.val === 'verdict'); if (open && window.matchMedia('(min-width: 1200px)').matches) d.open = true; }
    if (!b) b = tabs.find((x) => x.dataset.val === 'verdict');
    if (b && b.getAttribute('aria-pressed') !== 'true') b.click();
    return !!b;
  };
  const hashed = /[#&]build=([a-z]+)/.exec(location.hash);
  if (hashed && pick(hashed[1], false)) touched = true;
  window.addEventListener('hashchange', () => { const h = /[#&]build=([a-z]+)/.exec(location.hash); if (h && pick(h[1], true)) touched = true; });
  PDD.onReader((r) => { if (!touched) pick(DEF[r]); });
})();

/* Who loses: a party picked in the heat strip lights its card */
(function () {
  const PDD = window.PDD; if (!PDD) return;
  const scene = PDD.root.querySelector('#pdd-build'); if (!scene) return;
  // Who loses: a party picked in the heat strip lights its card
  const wl = scene.querySelector('.pdd-wl');
  if (wl) {
    const cols = [...wl.querySelectorAll('.pdd-wl-col')];
    const cards = [...wl.querySelectorAll('.pdd-wl-card')];
    const pick = (k) => {
      if (k) wl.setAttribute('data-party', k); else wl.removeAttribute('data-party');
      cols.forEach((c) => c.setAttribute('aria-pressed', String(c.dataset.party === k)));
      cards.forEach((c) => c.classList.toggle('is-on', c.dataset.party === k));
    };
    cols.forEach((c) => c.addEventListener('click', () => pick(c.getAttribute('aria-pressed') === 'true' ? null : c.dataset.party)));
  }
})();

/* r34 c: Your AP desk, an illustration in the Delivery tab. Saving = payments released by rule x cost per payment, less AWS run cost and expected fraud loss.
   Released by rule = rule share x domestic share (ACH plus card). Cross-border always goes to a person. Hours use 250 working days. */
(function () {
  const PDD = window.PDD; if (!PDD) return;
  const box = PDD.root.querySelector('#pdd-build .pdd-apc'); if (!box) return;
  const inp = {}; box.querySelectorAll('input[data-k]').forEach((i) => { inp[i.dataset.k] = i; });
  if (!inp.sup || !inp.pay || !inp.ach || !inp.card) return;
  const outOf = (k) => box.querySelector('output[for="pdd-apc-' + k + '"]');
  const o = (k) => box.querySelector('[data-apc="' + k + '"]');
  const seg = (k) => box.querySelector('[data-seg="' + k + '"]');
  const line = box.querySelector('.pdd-apc-stp'), mix = box.querySelector('.pdd-apc-mix');
  const n0 = (v) => Math.round(v).toLocaleString('en-US');
  const k$ = (v) => { const a = Math.abs(v), sg = v < 0 ? '-$' : '$'; return a >= 1e6 ? sg + (a / 1e6).toFixed(a >= 1e7 ? 0 : 1).replace(/\.0$/, '') + 'M' : sg + Math.round(a / 1000) + 'K'; };
  const SHOW = { sup: n0, pay: n0, ach: (v) => v + '%', card: (v) => v + '%', cost: (v) => PDD.usd(v), rule: (v) => v + '%', min: (v) => String(v), build: k$, run: k$, loss: k$ };
  const SAY = { sup: (v) => n0(v) + ' suppliers', pay: (v) => n0(v) + ' payments a year', ach: (v) => v + ' percent by ACH', card: (v) => v + ' percent by card', cost: (v) => PDD.usd(v) + ' per payment', rule: (v) => v + ' percent released by rule', min: (v) => v + ' minutes per hold', build: (v) => '$' + n0(v) + ' build cost', run: (v) => '$' + n0(v) + ' AWS run cost a year', loss: (v) => '$' + n0(v) + ' expected fraud loss a year' };
  let perSup = Number(inp.pay.value) / Number(inp.sup.value);
  const v = (k) => Number(inp[k].value);
  const update = () => {
    const ach = v('ach'), card = v('card'), cross = Math.max(0, 100 - ach - card);
    const stp = (v('rule') / 100) * ((ach + card) / 100);
    const pay = v('pay'), held = pay * (1 - stp);
    const save = pay * stp * v('cost') - v('run') - v('loss');
    const back = save > 0 ? Math.ceil(v('build') / (save / 12)) : 0;
    const hrs = held * v('min') / 60 / 250;
    Object.keys(inp).forEach((k) => { const out = outOf(k); if (out) out.textContent = SHOW[k](v(k)); inp[k].setAttribute('aria-valuetext', SAY[k](v(k))); PDD.fill(inp[k]); });
    o('save').textContent = k$(save);
    o('back').textContent = back ? (back > 120 ? '120+' : String(back)) : 'None';
    o('hrs').textContent = hrs >= 100 ? n0(hrs) : hrs.toFixed(1);
    o('stp').textContent = Math.round(stp * 100) + '%';
    o('ach').textContent = ach + '%'; o('card').textContent = card + '%'; o('cross').textContent = cross + '%';
    if (seg('ach')) seg('ach').style.setProperty('--w', ach + '%');
    if (seg('card')) seg('card').style.setProperty('--w', card + '%');
    if (seg('cross')) seg('cross').style.setProperty('--w', cross + '%');
    if (line) line.style.setProperty('--w', (stp * 100).toFixed(1) + '%');
    if (mix) mix.setAttribute('aria-label', 'Payment mix: ' + ach + '% ACH, ' + card + '% card, ' + cross + '% cross-border. ' + Math.round(stp * 100) + '% released by rule. Illustration.');
    box.toggleAttribute('data-loss', save <= 0);
  };
  // the three shares always sum to 100: moving ACH or card takes from the other only when the two pass 100
  inp.ach.addEventListener('input', () => { if (v('ach') + v('card') > 100) inp.card.value = String(100 - v('ach')); update(); });
  inp.card.addEventListener('input', () => { if (v('ach') + v('card') > 100) inp.ach.value = String(100 - v('card')); update(); });
  // suppliers carry payments with them at the current payments per supplier
  inp.sup.addEventListener('input', () => { inp.pay.value = String(Math.round(v('sup') * perSup / 1000) * 1000); update(); });
  inp.pay.addEventListener('input', () => { perSup = v('pay') / v('sup'); update(); });
  ['cost', 'rule', 'min', 'build', 'run', 'loss'].forEach((k) => { if (inp[k]) inp[k].addEventListener('input', update); });
  update();
})();

/* r35: the Architecture tab. Today | Year 1 | Target, with AWS | Generic on Target. It opens on a simple layer view, and Full map shows the detailed drawing.
   Five stories play through either view: a token moves step by step, the payee guard runs its checks, release forks to a rule or a person, and returns come back to the ledger.
   #build=arch&arch=year1 links a state, and the older arch=current opens Today. Reduced motion steps through the stops with no movement. */
(function () {
  const PDD = window.PDD; if (!PDD) return;
  const scene = PDD.root.querySelector('#pdd-build');
  const ar = PDD.root.querySelector('.pdd-ar3'); if (!ar) return;
  const NODES = {
  today: [
    { id:'supplier', x:85, y:330, ico:'person', role:'slate', L:'Supplier', d:'Suppliers send invoices by email and change bank details by email or letter.' },
    { id:'bankchg', x:85, y:640, ico:'doc', role:'red', L:'Bank change', S:'Email or letter', d:'A bank detail change arrives the same way as a fraud attempt. Nothing tells them apart.' },
    { id:'email', x:300, y:450, ico:'email', role:'slate', L:'Shared AP inbox', step:'1', pain:[1,'Spoofable'], d:'Supplier invoices, and any bank detail change, land in a shared inbox.', fix:'Year 1: the agent drafts only from an approved invoice.' },
    { id:'human', x:300, y:200, ico:'person', role:'slate', L:'Invoice approver', S:'By email', d:'A budget owner approves the invoice by replying to an email.' },
    { id:'erp', x:520, y:450, ico:'erp', role:'slate', L:'AP clerk in ERP', step:'2', d:'A clerk keys the invoice and the payee into the ERP. About $9.40 to process one invoice.', fix:'Year 1: the agent codes and matches the invoice.' },
    { id:'registry', x:520, y:680, ico:'db', role:'slate', L:'Vendor master', S:'Edited by hand', d:'The clerk edits supplier bank details by hand, often straight from the email.', fix:'Year 1: a payee registry that only the guard can change.' },
    { id:'guard', x:740, y:450, ico:'phone', role:'slate', L:'Call-back', step:'3', pain:[2,'Skipped checks'], d:'Bank detail changes are checked by a phone call-back. Call-backs slip under deadline.', fix:'Year 1: a rule checks every change, with US account validation.' },
    { id:'pfile', x:920, y:450, ico:'sheet', role:'slate', L:'Payment file', S:'CSV export', d:'The ERP exports a payment file, or the clerk keys each payment again.' },
    { id:'cutoff', x:1110, y:200, ico:'rtp', role:'slate', L:'Cut-off clock', S:'Batch windows', d:'Batch windows and wire cut-offs decide when money moves, not the due date.' },
    { id:'bankapi', x:1110, y:450, ico:'portal', role:'slate', L:'Bank portal', step:'4', pain:[3,'Re-keying'], d:'The payment is uploaded or keyed again into the bank portal. There is no single audit trail.', fix:'Year 1: the adapter calls the bank API directly.' },
    { id:'token', x:1300, y:200, ico:'key', role:'slate', L:'Hardware token', S:'Checker login', d:'The checker signs in with a token. It proves who clicked, not what they saw.' },
    { id:'checker', x:1300, y:450, ico:'people', role:'slate', L:'Maker and checker', step:'4', pain:[4,'Blind approval'], d:'A maker and a checker approve in the portal. The checker sees the amount, not the payee source.', fix:'Year 1: the checker app shows the guard result.' },
    { id:'ach', x:1540, y:300, ico:'rails', role:'slate', L:'ACH batch', step:'5', pain:[5,'Batch rails'], d:'Batch ACH at the next window. Cut-offs, and no after-hours payouts.', fix:'Year 1: RTP runs 24/7 up to $10M.' },
    { id:'wire', x:1540, y:620, ico:'wire', role:'slate', L:'Wire', S:'Same day', d:'A same-day wire, only if every step beats the cut-off.' },
    { id:'payee', x:1790, y:450, ico:'bank', role:'slate', L:'Supplier bank', d:'Funds land at the account on file, right or wrong.' },
    { id:'stmt', x:1110, y:880, ico:'doc', role:'slate', L:'Bank statement', S:'Next day', d:'The statement comes back the next business day.' },
    { id:'ledger', x:740, y:880, ico:'sheet', role:'slate', L:'Spreadsheet recon', step:'6', pain:[6,'Slow close'], d:'The statement is matched by hand in a spreadsheet.', fix:'Year 1: an evidence ledger with a write-once record.' },
    { id:'evidence', x:300, y:880, ico:'archive', role:'slate', L:'Audit evidence', S:'Across inboxes', d:'Approvals live in email threads and portal logs. An audit means a hunt.', fix:'Year 1: one evidence record per payment.' },
  ],
  y1: [
    { id:'email', x:105, y:270, ico:'email', role:'slate', L:'Invoice email', layer:'base', d:'Invoices still arrive by email and portal. Nothing changes for suppliers.' },
    { id:'erp', x:105, y:560, ico:'erp', role:'slate', L:'ERP and AP', S:'Approves invoices', layer:'base', d:'The ERP stays the system of record. AP approves invoices as today, and the paid status comes back to it.' },
    { id:'human', x:1025, y:960, ico:'person', role:'slate', L:'AP checker', layer:'base', d:'The same checker as today, now with the payee source and the guard result in front of them.' },
    { id:'agent', x:315, y:450, ico:'agent', role:'coral', L:'Agent', S:'Proposes only', step:'1', layer:'agent', d:'The agent drafts a payout from an approved invoice. It holds no release tool.' },
    { id:'proxy', x:315, y:200, ico:'key', role:'violet', L:'Signing proxy', S:'RFC 9421 out', layer:'agent', d:'The only caller of the signing key. It adds RFC 9421 signatures to calls out to supplier portals and card networks, which check them against the directory.' },
    { id:'mkeys', x:545, y:200, ico:'db', role:'violet', L:'Mandate keys', S:'Keys and nonce', layer:'controls', d:'The platform public key, each passkey stored at enrollment, a nonce for replay and the revocation list. No directory round trip.' },
    { id:'mandate', x:545, y:450, ico:'key', role:'amber', L:'Mandate check', S:'Signature, passkey', step:'2', layer:'adapter', badges:['sox','port'], d:'Checks the platform signature against the public key (Ed25519, RFC 9421) and the passkey mandate against the key stored at enrollment. The adapter never checks itself.' },
    { id:'registry', x:705, y:200, ico:'db', role:'violet', L:'Payee registry', layer:'guard', d:'Known payees and their verified bank details.' },
    { id:'guard', x:705, y:450, ico:'shield', role:'amber', L:'Payee guard', S:'Rule, not model', step:'3', layer:'guard', badges:['sox'], d:'A rule checks every payment before anything else happens: the invoice of record, sanctions, and every new payee or bank detail change.' },
    { id:'invoice', x:545, y:700, ico:'doc', role:'amber', L:'Invoice match', S:'No double pay', layer:'guard', badges:['sox'], d:'Reads the approved invoice from the ERP and checks amount, payee and not yet paid. A duplicate stops here.' },
    { id:'sanctions', x:705, y:700, ico:'globe', role:'amber', L:'Sanctions screen', S:'SDN list feed', layer:'guard', badges:['sox'], d:'Screens every party against the SDN list feed before release. A hit goes to a queue for a person.' },
    { id:'acct', x:865, y:700, ico:'check', role:'amber', L:'US account check', S:'Ownership', layer:'guard', d:'A US account-ownership check. No scheme answer means a callback for a new or changed payee, never a neutral score.' },
    { id:'railpick', x:865, y:450, ico:'rails', role:'amber', L:'Rail picker', S:'ACH, RTP, wire', step:'4', layer:'guard', d:'Picks the rail before the release decision, so the matrix judges the real rail. The rail is written into the release record.' },
    { id:'matrix', x:1025, y:450, ico:'matrix', role:'amber', L:'Release matrix', S:'Rule or person', step:'5', layer:'controls', badges:['sox','port'], d:'Payee status crossed with amount band and rail. Each cell says rule releases or person releases. It writes a signed release.', matrix:true },
    { id:'idem', x:1025, y:200, ico:'db', role:'violet', L:'Idempotency key', S:'Payment ID', layer:'controls', d:'A one-time write per invoice and per payment. A retry checks the status first, so a timeout cannot pay twice.' },
    { id:'checker', x:1025, y:700, ico:'phoneapp', role:'amber', L:'Checker app', S:'Passkey step-up', step:'6', layer:'controls', badges:['sox'], d:'A person releases anything outside the matrix. They see the payee source and the guard result, then confirm with a passkey.' },
    { id:'adapter', x:1250, y:450, ico:'plug', role:'amber', L:'Bank connector', S:'OpenAPI adapter', step:'7', lab:'right', layer:'adapter', badges:['lock','port'], d:'One adapter in front of the bank API you already have. It checks the signed release before it sends. An explicit deny on the adapter and the bank secret blocks every principal except the release role.' },
    { id:'kill', x:1250, y:200, ico:'power', role:'red', L:'Kill switch', S:'All agents off', step:'9', layer:'controls', d:'Disable one agent, or switch all agent payments off. It takes effect within a minute. The adapter checks the flag on every send.' },
    { id:'evbus', x:1250, y:700, ico:'flow', role:'violet', L:'Event bus', S:'Returns, status', layer:'adapter', d:'Bank acknowledgements, returns and statements come back through the adapter onto the event bus.' },
    { id:'ledger', x:1395, y:700, ico:'ledger', role:'violet', L:'Evidence ledger', S:'Write-once', step:'8', layer:'controls', badges:['sox','port'], d:'Every payment gets an evidence record: payment ID, key ID, guard result, matrix cell, approver and rail reference. Paid status goes back to the ERP. A return opens an exception for a person.' },
    { id:'directory', x:1592, y:200, ico:'globe', role:'slate', L:'Key directory', S:'Card networks', layer:'agent', d:'The platform key is registered in the scheme directory. Counterparties check signed calls against it.' },
    { id:'bportal', x:1592, y:700, ico:'portal', role:'slate', L:'Bank portal', S:'Exceptions', layer:'rails', d:'The portal stays for exceptions and manual payments.' },
    { id:'bankapi', x:1592, y:450, ico:'bank', role:'slate', L:'Bank API', S:"Today's bank", layer:'rails', d:'The bank you already use. You stay the Originator. Acknowledgments, returns and statements come back to the adapter.' },
    { id:'ach', x:1825, y:250, ico:'rails', role:'teal', L:'ACH', S:'Same Day too', layer:'rails', d:'Batch and Same Day ACH. Low cost, not final at once.' },
    { id:'rtp', x:1825, y:450, ico:'rtp', role:'teal', L:'RTP', S:'Up to $10M', layer:'rails', d:'Instant and final, 24/7, up to $10M.' },
    { id:'wire', x:1825, y:650, ico:'wire', role:'teal', L:'Wire', S:'Fedwire', layer:'rails', d:'Fedwire for large or urgent payments. Final once processed.' },
    { id:'nocoin', x:1825, y:880, type:'note', L:'No stablecoin', S:'in Year 1', layer:'rails', d:'No stablecoin lane in Year 1. Cross-border goes to a person and the bank route.' },
  ],
  target: [
    { id:'portal', x:85, y:215, ico:'portal', aws:'portal', role:'slate', L:'Supplier portal', layer:'base', d:'Supplier portals are untrusted input. They check the platform signature on calls from the signing proxy.' },
    { id:'email', x:85, y:450, ico:'email', aws:'email', role:'slate', L:'Invoice email', layer:'base', d:'Email is untrusted input. Any bank detail in it goes to the payee guard.' },
    { id:'erp', x:85, y:700, ico:'erp', aws:'erp', role:'slate', L:'ERP', layer:'base', d:'Approved invoices come from the ERP. Invoice match reads the invoice of record from it, and the paid status comes back to it.' },
    { id:'human', x:85, y:960, ico:'person', aws:'human', role:'slate', L:'AP checker', layer:'base', d:'The person who releases anything outside the matrix.' },
    { id:'proxy', x:245, y:200, ico:'key', aws:'adapter', role:'violet', L:'Signing proxy', S:'Lambda', gS:'RFC 9421 out', layer:'agent', d:'The only caller of the signing key. It adds RFC 9421 signatures to calls out to supplier portals and card networks. The counterparty checks them against the directory.' },
    { id:'signer', x:405, y:200, ico:'hsm', aws:'signer', role:'violet', L:'Platform signer', S:'KMS', gS:'Ed25519 key', step:'1', layer:'agent', d:'The platform key, registered in the scheme directory. KMS holds it as an Ed25519 key, and only the signing proxy may sign with it.' },
    { id:'agent', x:245, y:450, ico:'agent', aws:'agent', role:'coral', L:'Agent runtime', S:'AgentCore', gS:'Agent host', layer:'agent', badges:['awsb'], d:'The agent drafts the payout from an approved invoice. Invoice PDFs, email and portals are untrusted input.' },
    { id:'gateway', x:405, y:450, ico:'gateway', aws:'toolpol', role:'coral', L:'Gateway policy', S:'AgentCore', S2:'No release tools', gL:'Agent gateway', gS:'No release tools', step:'2', layer:'agent', badges:['awsb'], d:'Tool policy denies vendor master writes and release tools. The gateway calls the payment API with its own IAM role.' },
    { id:'traces', x:245, y:700, ico:'trace', aws:'obs', role:'violet', L:'Agent traces', S:'CloudWatch', gS:'Trace store', layer:'controls', d:'Agent traces carry the payment ID and go to the log archive account. Agent-originated ACH entries are tagged for Nacha monitoring.' },
    { id:'api', x:575, y:450, ico:'lock', aws:'api', role:'amber', L:'API Gateway', S:'OpenAPI target', gL:'Payment API', gS:'OpenAPI', pill:'Gateway role only', step:'3', layer:'adapter', d:'An OpenAPI target with the gateway IAM role. The API resource policy admits only that role.' },
    { id:'mkeys', x:735, y:200, ico:'db', aws:'nonce', role:'violet', L:'Mandate keys', S:'DynamoDB', gS:'Keys and nonce', layer:'controls', d:'The KMS public key, each passkey stored at enrollment, a nonce with a conditional write, and the revocation list. No directory round trip.' },
    { id:'mandate', x:735, y:450, ico:'key', aws:'verifier', role:'amber', L:'Mandate check', S:'Lambda', gS:'Signature, passkey', step:'4', layer:'adapter', badges:['sox','port'], d:'Checks the platform signature against the KMS public key (Ed25519, RFC 9421) and the passkey mandate against the key stored at enrollment. Created, expires and a nonce block replay.' },
    { id:'registry', x:895, y:200, ico:'db', aws:'registry', role:'violet', L:'Payee registry', S:'DynamoDB', gS:'Database', layer:'guard', d:'Known payees and verified bank details.' },
    { id:'guard', x:895, y:450, ico:'shield', aws:'guard', role:'amber', L:'Payee guard', S:'Lambda', gS:'Rule service', step:'5', layer:'guard', badges:['sox'], d:'A rule, not a model, runs three checks on every payment: invoice match, sanctions screen and, for a new or changed payee, a US account check.' },
    { id:'invoice', x:750, y:700, ico:'doc', aws:'guard', role:'amber', L:'Invoice match', S:'Lambda', gS:'No double pay', layer:'guard', badges:['sox'], d:'Reads the approved invoice from the ERP and checks amount, payee and not yet paid. A duplicate or an invoice with no record stops here.' },
    { id:'sanctions', x:895, y:700, ico:'globe', aws:'guard', role:'amber', L:'Sanctions screen', S:'SDN list feed', layer:'guard', badges:['sox'], d:'Screens every party against the SDN list feed before release. A hit goes to a queue for a person. Records are kept for 10 years.' },
    { id:'acct', x:1040, y:700, ico:'check', aws:'acctval', role:'amber', L:'US account check', S:'Partner API', layer:'guard', d:'A US account-ownership check. No scheme answer means a callback for a new or changed payee, never a neutral score.' },
    { id:'railpick', x:1055, y:450, ico:'rails', aws:'adapter', role:'amber', L:'Rail picker', S:'Lambda', gS:'ACH, RTP, wire', step:'6', layer:'guard', d:'Picks the rail before the release matrix runs, and writes it into the release record. If failover moves to a stricter rail, the checker approves again.' },
    { id:'risk', x:1215, y:200, ico:'risk', aws:'risk', role:'coral', L:'ML risk score', S:'SageMaker AI', gL:'Risk model', gS:'Hold only', layer:'guard', d:'An ML score can only add a hold. It can move a cell to person, never back.' },
    { id:'policy', x:1215, y:450, ico:'policy', aws:'policy', role:'amber', L:'Release policy', S:'Verified Permissions', gL:'Policy engine', gS:'Cedar rules', step:'6', noBadge:true, layer:'guard', badges:['sox','port'], d:'No LLM on the approval path. The matrix runs as Cedar rules on payee status, amount and rail, and picks a rule or a person.', matrix:true },
    { id:'grid', x:1205, y:700, type:'grid', L:'Release matrix', layer:'guard', d:'Rows are established, new and changed payees. Columns are low and high bands for each rail. Green is rule releases, amber is person releases.', matrix:true },
    { id:'idem', x:1375, y:200, ico:'db', aws:'nonce', role:'violet', L:'Idempotency key', S:'DynamoDB', gS:'Payment ID', layer:'controls', d:'A conditional one-time write. The payment ID is the workflow execution name, and a retry checks the payment status first.' },
    { id:'release', x:1375, y:450, ico:'flow', aws:'release', role:'amber', L:'Release', S:'Step Functions', gL:'Workflow engine', gS:'Two exits', step:'7', layer:'guard', badges:['sox','awsb'], d:'Two exits. Inside the matrix a rule releases. Outside it the run waits for a person. Release signs an assertion: payment ID, amount, payee hash, rail, matrix cell and approver. An SCP on the payment core account denies SendTaskSuccess to the agent and orchestrator roles.' },
    { id:'checker', x:1295, y:960, ico:'phoneapp', aws:'checker', role:'amber', L:'Checker app', S:'Cognito', gS:'Passkey step', step:'8', layer:'guard', badges:['sox'], d:'A checker in the checker account sees the payee source and the guard result, approves with a passkey step-up, and assumes a release role in the payment core account.' },
    { id:'adapter', x:1685, y:450, ico:'plug', aws:'adapter', role:'amber', L:'Rail adapter', S:'Lambda', gS:'OpenAPI service', step:'9', layer:'adapter', badges:['lock','port'], d:'Checks the signed release with KMS Verify before it sends. A resource policy deny on the adapter and the bank secret blocks every principal except the release role. ACH and RTP first, through your own bank API.' },
    { id:'egress', x:1835, y:450, ico:'wall', aws:'egress', role:'slate', L:'Egress', S:'Network Firewall', gS:'One exit', layer:'adapter', d:'One controlled exit: a firewall endpoint and a NAT gateway with an allowlisted IP.' },
    { id:'cardfill', x:1835, y:700, ico:'card', aws:'cardfill', role:'teal', L:'Card fill', S:'Tokens only', step:'10', layer:'rails', d:'Secondary and pilot-ready. The agent handles only network tokens or single-use card references.' },
    { id:'evbus', x:1535, y:700, ico:'flow', aws:'evb', role:'violet', L:'Event bus', S:'EventBridge', gS:'Returns, status', layer:'adapter', d:'Bank acknowledgements, returns and statements come back through the adapter onto the event bus, one ordered stream per payment ID.' },
    { id:'ledger', x:575, y:700, ico:'ledger', aws:'ledger', role:'violet', L:'Ledger', S:'DynamoDB', gS:'Paid status', step:'11', layer:'adapter', badges:['port'], d:'Each payment is matched from bank events. Paid status goes back to the ERP. An ACH return (an R-code) opens an exception for a person.' },
    { id:'evidence', x:575, y:960, ico:'archive', aws:'s3', role:'violet', L:'Evidence', S:'S3 Object Lock', gL:'Log archive', gS:'Write-once', layer:'controls', badges:['sox'], d:'A write-once evidence pack: payment ID, mandate hash, key ID, guard result, matrix cell, approver and rail reference.' },
    { id:'trail', x:765, y:960, ico:'doc', aws:'trail', role:'violet', L:'Org trail', S:'CloudTrail', gL:'Audit trail', gS:'API call log', layer:'controls', d:'Every management call in the four accounts is logged to the log archive account.' },
    { id:'kill', x:1685, y:200, ico:'power', aws:'kill', role:'red', L:'Kill switch', S:'AppConfig', gS:'Feature flags', step:'12', layer:'controls', d:'Disable one agent, switch all agent payments off, or revoke the key in the directories. It takes effect within a minute. Recall: an ACH R17 return, a wire recall, or an RTP request for return.' },
    { id:'gate', x:1560, y:960, ico:'lock', aws:'policy', role:'violet', L:'Policy gate', S:'Wallet screen', step:'9b', layer:'controls', dash:true, d:'Lane 9b opens on 18 Jan 2027 at the earliest. All four must pass: a coin from a permitted issuer, the Treasury AML and sanctions rule with a wallet screen, a corridor price win, and payee consent.' },
    { id:'directory', x:2005, y:200, ico:'globe', aws:'directory', role:'slate', L:'Key directory', S:'Card networks', layer:'agent', d:'The platform key is registered here. Visa, Mastercard and Amex check signed calls against it.' },
    { id:'bankapi', x:2005, y:450, ico:'bank', aws:'ownbank', role:'teal', L:'Own bank API', S:'ACH, RTP first', layer:'rails', d:'Your own bank API makes you the Originator. A sponsor bank or a card-issuing partner are the other ways. Acknowledgments, returns and statements come back to the adapter.' },
    { id:'cardpartner', x:2005, y:700, ico:'card', aws:'cardpartner', role:'slate', L:'Card partner', S:'Secondary', layer:'rails', d:'A card-issuing partner for the secondary card lane.' },
    { id:'stable', x:2005, y:960, ico:'coin', aws:'stable', role:'violet', L:'Stablecoin', S:'Lane 9b', layer:'rails', dash:true, d:'Wins on cross-border and after-hours payouts. Loses on domestic dollars, where RTP runs 24/7.' },
  ]};

  const ZONES = {
  today: [
    { x:10, y:110, w:150, h:940, t:'Suppliers' },
    { x:175, y:110, w:815, h:940, t:'Your company' },
    { x:1010, y:110, w:390, h:940, t:'Bank portal', cls:'soft' },
    { x:1420, y:110, w:515, h:940, t:'Payment rails' },
  ],
  y1: [
    { x:15, y:110, w:185, h:950, t:'Today\'s systems', layer:'base' },
    { x:215, y:340, w:200, h:232, t:'Untrusted input', cls:'agent', layer:'agent' },
    { x:430, y:110, w:1040, h:740, t:'Thin adapter, one service', cls:'adapter', layer:'adapter' },
    { x:472, y:614, w:466, h:216, t:'', cls:'guardz', layer:'guard' },
    { x:1485, y:110, w:215, h:215, t:'Directory', layer:'agent' },
    { x:905, y:880, w:240, h:180, t:'AP team', cls:'soft', layer:'base' },
    { x:1485, y:340, w:215, h:510, t:"Today's bank", layer:'rails', bl:true },
    { x:1720, y:110, w:210, h:950, t:'Rails', layer:'rails' },
  ],
  target: [
    { x:10, y:100, w:150, h:1012, t:'Outside', layer:'base' },
    { x:170, y:100, w:320, h:750, t:'Agent runtime account', layer:'agent' },
    { x:180, y:355, w:300, h:275, t:'Untrusted input', cls:'agent', layer:'agent', top:true },
    { x:505, y:100, w:1090, h:750, t:'Payment core account', layer:'adapter' },
    { x:674, y:614, w:442, h:216, t:'', cls:'guardz', layer:'guard' },
    { x:1610, y:100, w:315, h:230, t:'Control plane', cls:'ctrl', layer:'controls' },
    { x:1610, y:345, w:315, h:505, t:'Rail VPC, two zones', layer:'adapter', bl:true },
    { x:1940, y:100, w:130, h:230, t:'Directory', layer:'agent' },
    { x:1940, y:345, w:130, h:505, t:'Rails', layer:'rails' },
    { x:505, y:862, w:395, h:250, t:'Log archive account', layer:'controls' },
    { x:1205, y:862, w:180, h:250, t:'Checker account', tf:'Checker', layer:'guard' },
    { x:1400, y:862, w:670, h:250, t:'Lane 9b', cls:'coin', layer:'rails' },
  ]};

  const BANNERS = {
    today: { x:40, y:28, t:'Days from invoice to cash. Six manual steps. Red marks the pain.', cls:'red' },
    y1: { x:430, y:28, t:'The agent only proposes. Only a signed release reaches the bank.', cls:'amber', layer:'agent' },
    target: { x:505, y:22, t:'No LLM on approval path. ML score can only add a hold.', cls:'red', layer:'guard' },
  };

  // Edges: [from, to, kind, pts|null, label, labelPos]
  const EDGES = {
  today: [
    ['supplier','email','manual', [[147,330],[205,330],[205,440],[237,440]]],
    ['bankchg','email','input', [[147,640],[205,640],[205,470],[237,470]], 'bank change', [214,668,'start']],
    ['human','erp','manual', [[362,200],[520,200],[520,388]], 'approves', [440,190]],
    ['email','erp','manual'], ['erp','guard','manual'], ['guard','pfile','manual'], ['pfile','bankapi','manual'], ['bankapi','checker','manual'],
    ['erp','registry','manual', [[520,560],[520,616]], 'edits details', [530,594,'start']],
    ['cutoff','bankapi','ctrl', [[1110,330],[1110,388]], 'cut-off', [1120,366,'start']],
    ['token','checker','ctrl', [[1300,330],[1300,388]], 'login', [1310,366,'start']],
    ['checker','ach','manual', [[1362,440],[1450,440],[1450,300],[1477,300]]],
    ['checker','wire','manual', [[1362,470],[1450,470],[1450,620],[1477,620]]],
    ['ach','payee','manual', [[1602,300],[1690,300],[1690,440],[1727,440]]],
    ['wire','payee','manual', [[1602,620],[1690,620],[1690,470],[1727,470]]],
    ['bankapi','stmt','manual', [[1110,560],[1110,816]], 'next day', [1120,700,'start']],
    ['stmt','ledger','manual'],
    ['ledger','evidence','manual', null, 'saved to inboxes', [520,868]],
  ],
  y1: [
    ['email','erp','input', [[105,392],[105,496]]],
    ['erp','agent','main', [[167,560],[207,560],[207,450],[253,450]]],
    ['erp','invoice','event', [[167,585],[190,585],[190,700],[482,700]], 'approved invoice', [335,728]],
    ['agent','mandate','main'],
    ['proxy','directory','id', [[315,137],[315,86],[1592,86],[1592,137]], 'signed calls', [1360,76]],
    ['mkeys','mandate','id', [[545,328],[545,386]], 'keys', [555,374,'start']],
    ['mandate','guard','main'],
    ['registry','guard','ctrl', [[705,328],[705,386]], 'lookup', [695,372,'end']],
    ['guard','invoice','ctrl', [[705,580],[705,598],[545,598],[545,636]]],
    ['guard','sanctions','ctrl', [[705,580],[705,636]]],
    ['guard','acct','ctrl', [[705,580],[705,598],[865,598],[865,636]]],
    ['guard','railpick','main'],
    ['railpick','matrix','main'],
    ['idem','matrix','ctrl', [[1025,328],[1025,386]], 'write once', [1035,372,'start']],
    ['matrix','adapter','rule', [[1087,450],[1187,450]], 'signed release', [1137,490], { seal:[1137,450] }],
    ['matrix','checker','person', [[1025,580],[1025,636]], 'person releases', [1035,614,'start'], { both:true }],
    ['human','checker','person', [[1025,896],[1025,830]], 'passkey', [1037,850,'start']],
    ['kill','adapter','ctrl', [[1250,328],[1250,386]], 'off flag', [1240,372,'end']],
    ['adapter','bankapi','main', [[1313,450],[1529,450]]],
    ['bankapi','adapter','event', [[1530,478],[1313,478]], 'returns and status', [1421,532]],
    ['adapter','evbus','event', [[1250,536],[1250,636]], 'events', [1260,596,'start']],
    ['evbus','ledger','event', [[1312,700],[1332,700]]],
    ['ledger','erp','event', [[1395,800],[1395,866],[1037,866],[1025,854],[1013,866],[105,866],[105,668]], 'paid status, recon', [700,892]],
    ['bankapi','ach','main', [[1654,430],[1700,430],[1700,250],[1762,250]]],
    ['bankapi','rtp','main'],
    ['bankapi','wire','main', [[1654,470],[1700,470],[1700,650],[1762,650]]],
  ],
  target: [
    ['portal','agent','input', [[147,232],[165,232],[165,428],[183,428]]],
    ['email','agent','input'],
    ['erp','agent','input', [[147,700],[165,700],[165,472],[183,472]]],
    ['agent','gateway','main'], ['gateway','api','main'], ['api','mandate','main'], ['mandate','guard','main'], ['guard','railpick','main'], ['railpick','policy','main'], ['policy','release','main'],
    ['release','adapter','rule', [[1437,450],[1621,450]], 'signed release', [1520,424], { seal:[1520,450] }],
    ['adapter','egress','main'], ['egress','bankapi','main'],
    ['signer','proxy','id', [[343,200],[308,200]]],
    ['proxy','portal','id', [[183,204],[149,204]], 'signed calls', [165,166]],
    ['signer','directory','id', [[405,137],[405,70],[2030,70],[2030,137]], 'register key', [1290,58]],
    ['signer','mkeys','id', [[467,200],[672,200]], 'public key', [570,188]],
    ['mkeys','mandate','id', [[735,328],[735,386]], 'keys', [745,374,'start']],
    ['registry','guard','ctrl', [[895,328],[895,386]], 'lookup', [885,372,'end']],
    ['guard','invoice','ctrl', [[895,580],[895,598],[750,598],[750,636]]],
    ['guard','sanctions','ctrl', [[895,580],[895,636]]],
    ['guard','acct','ctrl', [[895,580],[895,598],[1040,598],[1040,636]]],
    ['risk','policy','ctrl', [[1215,328],[1215,386]], 'hold only', [1205,372,'end']],
    ['idem','release','ctrl', [[1375,328],[1375,386]], 'one-time write', [1385,372,'start']],
    ['release','checker','person', [[1313,475],[1295,475],[1295,896]], 'person releases', [1285,640,'end'], { both:true }],
    ['release','gate','coin', [[1437,478],[1455,478],[1455,960],[1497,960]], '9b', [1465,604,'start']],
    ['gate','stable','coin', [[1623,960],[1943,960]]],
    ['kill','adapter','ctrl', [[1665,328],[1665,386]], 'off flag', [1655,372,'end']],
    ['kill','directory','ctrl', [[1747,182],[1943,182]], 'revoke key', [1845,168]],
    ['bankapi','adapter','event', [[2030,388],[2030,338],[1710,338],[1710,386]], 'returns and status', [1850,326]],
    ['adapter','evbus','event', [[1623,478],[1603,478],[1603,700],[1599,700]]],
    ['evbus','ledger','event', [[1535,804],[1535,840],[1467,840],[1455,828],[1443,840],[1307,840],[1295,828],[1283,840],[650,840],[650,716],[638,716]]],
    ['ledger','erp','event', [[513,716],[497,716],[497,862],[85,862],[85,795]], 'paid status', [300,888]],
    ['ledger','evidence','event', [[575,806],[575,896]]],
    ['trail','evidence','event'],
    ['adapter','cardfill','card', [[1748,478],[1762,478],[1762,700],[1772,700]]],
    ['cardfill','cardpartner','card'],
    ['human','checker','person', [[147,980],[165,980],[165,1100],[1295,1100],[1295,1068]], 'passkey', [990,1088]],
  ]};

  const STEPLIST = {
  today: [
    ['1','email','Shared AP inbox','Invoices and bank changes arrive by email.'],
    ['2','erp','AP clerk in ERP','Keys invoice and payee, edits vendor master.'],
    ['3','guard','Call-back','A phone call, when there is time.'],
    ['4','bankapi','Bank portal','Keyed again, then maker and checker.'],
    ['5','ach','ACH or wire','Batch rails with cut-offs.'],
    ['6','ledger','Reconcile','Matched by hand, evidence in inboxes.'],
  ],
  y1: [
    ['1','agent','Agent proposes','Drafts from an approved invoice.'],
    ['2','mandate','Mandate check','Platform signature and passkey mandate.'],
    ['3','guard','Payee guard','Invoice match, sanctions, account check.'],
    ['4','railpick','Rail picker','Picks the rail before release.'],
    ['5','matrix','Release matrix','Payee, amount and rail. Signs the release.'],
    ['6','checker','Checker app','Passkey step-up outside the matrix.'],
    ['7','adapter','Bank connector','Checks the signed release, then sends.'],
    ['8','ledger','Evidence ledger','Returns and status, recon to the ERP.'],
    ['9','kill','Kill switch','Takes effect within a minute.'],
  ],
  target: [
    ['1','signer','Key registration','Platform key. A signing proxy signs calls out.'],
    ['2','gateway','Agent and gateway','Untrusted input. No release tools.'],
    ['3','api','Signed request','The gateway calls with its own role.'],
    ['4','mandate','Mandate check','Platform signature and passkey mandate.'],
    ['5','guard','Payee guard','Invoice match, sanctions, account check.'],
    ['6','railpick','Rail and policy','Rail picked first, then the Cedar matrix.'],
    ['7','release','Release','Signs the release. One-time key.'],
    ['8','checker','Person releases','Checker account, passkey step-up.'],
    ['9','adapter','Bank rail','Checks the signed release, then sends.'],
    ['9b','gate','Stablecoin lane','Off until 18 Jan 2027. Four checks.'],
    ['10','cardfill','Card lane','Secondary. Tokens only.'],
    ['11','ledger','Ledger and returns','Returns and status back to the ERP.'],
    ['12','kill','Kill switch','Takes effect within a minute.'],
  ]};

  const INTRO = {
    today: 'Today: email, a clerk, a portal and batch rails. Six steps, six pain points.',
    y1: 'Year 1: one thin service in front of the bank you already use. <span class="op">Our read: build this first. It pays back before any platform work.</span>',
    target: 'Target: four accounts. A rule or a person releases, and only a signed release reaches the bank. <span class="op">Our read: keep ACH and RTP first until card and stablecoin show volume.</span>',
  };

  const STORY_META = [
    { k:'known', t:'Known supplier', c:'var(--k-rule)' },
    { k:'fraud', t:'New-payee fraud', c:'var(--red)' },
    { k:'wire', t:'$5M wire', c:'var(--k-person)' },
    { k:'xb', t:'Cross-border, 2027', c:'var(--k-coin)' },
    { k:'inject', t:'Injected invoice', c:'var(--coral)' },
  ];
  const ACH = { lo:0.26, hi:0.5 };
  const H = 3600;
  const STORIES = {
  today: {
    known: [
      { n:'supplier', say:'A known supplier emails an invoice.' },
      { n:'email', say:'It lands in the shared AP inbox.' },
      { n:'erp', say:'A clerk keys the invoice and the payee into the ERP.' },
      { n:'guard', say:'Payee details are checked by a phone call-back.', t:14*H, c:1, p:900 },
      { n:'pfile', say:'The ERP exports a payment file.', t:2*H },
      { n:'bankapi', say:'The file is uploaded, or keyed again, into the bank portal.', t:4*H },
      { n:'checker', say:'A maker and a checker approve in the portal.', t:28*H, c:1, p:900 },
      { n:'ach', say:'Batch ACH goes out at the next window.', cost:ACH },
      { n:'payee', say:'The supplier is paid.', end:'paid', spawn:['bankapi','stmt','ledger','evidence'], out:'Paid in about 2 days, then matched by hand.' },
    ],
    fraud: [
      { n:'bankchg', say:'An email changes the supplier bank account. It looks real.', bub:['Spoofed change','bad'] },
      { n:'email', say:'It lands in the shared inbox next to real invoices.' },
      { n:'erp', say:'The clerk opens it.' },
      { n:'registry', say:'The clerk edits the vendor master by hand.', bub:['Details changed','warn'] },
      { n:'erp', say:'The next invoice picks up the new account.' },
      { n:'guard', say:'The call-back slips under deadline. Nobody calls.', c:0, ring:'fail', bub:['Call-back skipped','bad'], t:2*H, p:1300 },
      { n:'pfile', say:'The payment file carries the new account.', t:1*H },
      { n:'bankapi', say:'Uploaded to the bank portal.', t:3*H },
      { n:'checker', say:'The checker sees the amount, not the payee source.', c:1, t:10*H, bub:['Blind approval','warn'] },
      { n:'ach', say:'Batch ACH goes out.', cost:ACH },
      { n:'payee', say:'The money lands in the fraudster account.', end:'lost', out:'Paid to the fraudster. Nobody verified the new account.' },
    ],
    wire: [
      { n:'supplier', say:'A $5M supplier invoice arrives.' },
      { n:'email', say:'It lands in the shared inbox.' },
      { n:'erp', say:'The clerk keys it into the ERP.' },
      { n:'guard', say:'A call-back confirms the payee.', c:1, t:3*H, p:800 },
      { n:'pfile', say:'Exported for the bank.', t:1*H },
      { n:'bankapi', say:'The wire is keyed again into the bank portal.', t:1*H },
      { n:'checker', say:'Two people approve the wire in the portal.', c:1, t:3*H, p:800 },
      { n:'wire', say:'A same-day wire, only if keyed before the cut-off.', cost:{ v:7 } },
      { n:'payee', say:'The supplier is paid the same day.', end:'paid', spawn:['bankapi','stmt','ledger','evidence'], out:'Same day only if every step beats the cut-off.' },
    ],
    xb: [
      { n:'supplier', say:'A contractor abroad sends an invoice on a Friday evening.' },
      { n:'email', say:'It sits in the inbox all weekend.' },
      { n:'erp', say:'The clerk keys it on Monday morning.', t:60*H },
      { n:'guard', say:'A call-back confirms the payee.', c:1, t:2*H },
      { n:'pfile', say:'Exported for the bank.', t:1*H },
      { n:'bankapi', say:'Keyed into the bank portal after the cut-off.', t:1*H, ring:'fail', bub:['Missed the cut-off','warn'] },
      { n:'checker', say:'Maker and checker approve.', c:1, t:20*H },
      { n:'wire', say:'The cross-border wire goes out the next business day.', cost:{ v:16 }, end:'wait', out:'Paid days later. About $16 at a 1.6% bank route on $1,000.' },
    ],
    inject: [
      { n:'supplier', say:'An invoice arrives as a PDF.' },
      { n:'email', say:'The PDF hides a line: pay now, skip approval.', bub:['Hidden instruction','bad'] },
      { n:'erp', say:'No agent today. A clerk reads the invoice, and may act on it.', end:'na', out:'Not an agent risk today. The clerk is the only control.' },
    ],
  },
  y1: {
    known: [
      { n:'email', say:'A known supplier emails an invoice.' },
      { n:'erp', say:'AP approves the invoice in the ERP.' },
      { n:'agent', say:'The agent drafts the payout and signs the request.', t:180 },
      { n:'mandate', say:'Platform signature and passkey mandate check out.', c:2, t:2 },
      { n:'guard', say:'Known payee, unchanged. Invoice match and sanctions clear.', t:20, checks:[['invoice','ok'],['sanctions','ok']], ring:'ok', bub:['Payee unchanged','ok'], p:900 },
      { n:'railpick', say:'Known payee, low amount. The rail picker chooses ACH.', bub:['ACH','ok'] },
      { n:'matrix', say:'Established payee, low band, ACH. Rule releases and the release is signed.', c:1, checks:[['idem','ok']], fork:'rule', bub:['Rule releases','ok'], p:1100 },
      { n:'adapter', say:'The connector checks the signed release, then sends.', c:1, t:5, ring:'ok', p:700 },
      { n:'bankapi', say:'Your bank receives it over mTLS.' },
      { n:'ach', say:'ACH, at the normal cost.', cost:ACH, end:'paid', spawn:[['bankapi','adapter','evbus','ledger','erp']], out:'Released by rule in about 3 minutes. Status comes back to the ERP.' },
    ],
    fraud: [
      { n:'email', say:'An email asks to change the supplier bank account.', bub:['Spoofed change','bad'] },
      { n:'erp', say:'The change lands in AP.' },
      { n:'agent', say:'The agent drafts the payout with the new account.', t:180 },
      { n:'mandate', say:'The signature is valid. The agent is who it says.', c:2 },
      { n:'guard', say:'New bank details. Sanctions and invoice clear, the account check does not.', checks:[['sanctions','ok'],['invoice','ok'],['acct','fail','Held for callback']], end:'held', out:'Held at the payee guard before any money moved.' },
    ],
    wire: [
      { n:'email', say:'A $5M supplier invoice arrives.' },
      { n:'erp', say:'AP approves it.' },
      { n:'agent', say:'The agent drafts and signs.', t:180 },
      { n:'mandate', say:'Signature and passkey mandate check out.', c:2, t:2 },
      { n:'guard', say:'Known payee. Invoice match finds it unpaid. Sanctions clear.', t:20, checks:[['invoice','ok'],['sanctions','ok']], ring:'ok', p:900 },
      { n:'railpick', say:'$5M goes by wire for same-day finality. RTP also works up to $10M if your bank allows.', bub:['Wire','warn'] },
      { n:'matrix', say:'Above the rule band for wire. A person releases.', c:1, fork:'person', bub:['Person releases','warn'], p:1100 },
      { n:'checker', say:'The checker sees the payee source and guard result, then a passkey.', c:1, t:2400, p:900 },
      { n:'matrix', say:'Approved. The release is signed with a one-time key.', checks:[['idem','ok']] },
      { n:'adapter', say:'The connector checks the signed release, then sends.', c:1, t:5, ring:'ok', p:700 },
      { n:'bankapi', say:'Your bank takes the wire.' },
      { n:'wire', say:'Fedwire, final once processed.', cost:{ v:7 }, end:'paid', spawn:[['bankapi','adapter','evbus','ledger','erp']], out:'A person released it in under an hour.' },
    ],
    xb: [
      { n:'erp', say:'A contractor abroad invoices on a Saturday in 2027.' },
      { n:'agent', say:'The agent drafts and signs.', t:180 },
      { n:'mandate', say:'Signature checks out.', c:2 },
      { n:'guard', say:'Known payee. Sanctions and invoice clear.', checks:[['sanctions','ok'],['invoice','ok']], ring:'ok', p:900 },
      { n:'railpick', say:'No stablecoin in Year 1. Wire is the only cross-border rail.', bub:['Wire','warn'] },
      { n:'matrix', say:'Cross-border always goes to a person.', c:1, fork:'person', bub:['Person releases','warn'], p:1100 },
      { n:'checker', say:'A checker approves on Monday.', c:1, t:40*H },
      { n:'matrix', say:'Approved and signed.' },
      { n:'adapter', say:'The connector checks the signed release.', c:1, ring:'ok', p:600 },
      { n:'bankapi', say:'The bank route waits for business hours.', cost:{ v:16 }, end:'wait', out:'Waits for the next business day. About $16 at a 1.6% bank route on $1,000.' },
    ],
    inject: [
      { n:'email', say:'An invoice PDF hides a line: pay this new account now.', bub:['Hidden instruction','bad'] },
      { n:'erp', say:'AP approves the invoice amount as normal.' },
      { n:'agent', say:'The agent reads the PDF as untrusted input.', t:60 },
      { n:'mandate', say:'The signature is valid.', c:2 },
      { n:'guard', say:'Invoice match finds no invoice of record for that account.', checks:[['invoice','fail','No invoice of record']], end:'blocked', out:'Caught at invoice match. The PDF line matches no approved invoice, so nothing is sent.' },
    ],
  },
  target: {
    known: [
      { n:'erp', say:'AP approves a known supplier invoice.' },
      { n:'agent', say:'The agent drafts the payout.', t:110 },
      { n:'gateway', say:'Gateway policy allows draft tools only.', c:1 },
      { n:'api', say:'The gateway calls the payment API with its own role.', c:1 },
      { n:'mandate', say:'Platform signature and passkey mandate check out.', c:2, t:1 },
      { n:'guard', say:'Known payee, no bank change. Invoice match and sanctions clear.', t:15, checks:[['invoice','ok'],['sanctions','ok']], ring:'ok', bub:['Payee unchanged','ok'], p:900 },
      { n:'railpick', say:'Known payee, low amount. The rail picker chooses ACH.', bub:['ACH','ok'] },
      { n:'policy', say:'Established payee, low band, ACH. The ML score adds no hold.', c:1 },
      { n:'release', say:'Rule releases. The release is signed and the one-time key is written.', c:1, checks:[['idem','ok']], fork:'rule', bub:['Rule releases','ok'], p:1100 },
      { n:'adapter', say:'The adapter checks the signed release, then sends.', c:1, t:3, ring:'ok', p:700 },
      { n:'egress', say:'Out through one controlled exit.' },
      { n:'bankapi', say:'ACH through your own bank API.', cost:ACH, end:'paid', spawn:[['bankapi','adapter','evbus','ledger','erp'],['ledger','evidence']], out:'Released by rule in about 2 minutes. Status comes back to the ERP.' },
    ],
    fraud: [
      { n:'email', say:'An email swaps the supplier bank account.', bub:['Spoofed change','bad'] },
      { n:'agent', say:'The agent drafts the payout with the new account.', t:110 },
      { n:'gateway', say:'Draft tools only.', c:1 },
      { n:'api', say:'Gateway role only.', c:1 },
      { n:'mandate', say:'The signature is valid. The agent is genuine.', c:2 },
      { n:'guard', say:'New bank details. Sanctions and invoice clear. No ownership match means a callback.', checks:[['sanctions','ok'],['invoice','ok'],['acct','fail','Held for callback']], end:'held', out:'Held at the payee guard. Nothing left the bank.' },
    ],
    wire: [
      { n:'erp', say:'A $5M supplier invoice is approved.' },
      { n:'agent', say:'The agent drafts the payout.', t:110 },
      { n:'gateway', say:'Draft tools only.', c:1 },
      { n:'api', say:'Gateway role only.', c:1 },
      { n:'mandate', say:'Signature, passkey mandate and nonce check out.', c:2, t:1 },
      { n:'guard', say:'Known payee. Invoice match finds it unpaid. Sanctions clear.', t:15, checks:[['invoice','ok'],['sanctions','ok']], ring:'ok', p:900 },
      { n:'railpick', say:'$5M goes by Fedwire for same-day finality. RTP also works up to $10M if your bank allows.', bub:['Fedwire','warn'] },
      { n:'policy', say:'Above the rule band for wire. The matrix picks a person.', c:1 },
      { n:'release', say:'Two exits. This one waits for a person.', c:1, fork:'person', bub:['Person releases','warn'], p:1100 },
      { n:'checker', say:'Checker account. Payee source, guard result, passkey step-up.', c:1, t:1000, p:900 },
      { n:'release', say:'Approved through a release role. The release is signed with a one-time key.', checks:[['idem','ok']] },
      { n:'adapter', say:'The adapter checks the signed release, then sends.', c:1, t:3, ring:'ok', p:700 },
      { n:'egress', say:'Out through one controlled exit.' },
      { n:'bankapi', say:'Fedwire through your own bank.', cost:{ v:7 }, end:'paid', spawn:[['bankapi','adapter','evbus','ledger','erp'],['ledger','evidence']], out:'A person released it in about 20 minutes.' },
    ],
    xb: [
      { n:'portal', say:'A contractor abroad invoices on a Saturday night in 2027.' },
      { n:'agent', say:'The agent drafts the payout.', t:110 },
      { n:'gateway', say:'Draft tools only.', c:1 },
      { n:'api', say:'Gateway role only.', c:1 },
      { n:'mandate', say:'Signature checks out.', c:2 },
      { n:'guard', say:'Known payee. Sanctions and invoice clear.', checks:[['sanctions','ok'],['invoice','ok']], ring:'ok', p:900 },
      { n:'railpick', say:'Cross-border after hours. The rail picker chooses lane 9b.', bub:['Lane 9b','coin'] },
      { n:'policy', say:'Cross-border always goes to a person.', c:1 },
      { n:'release', say:'The run waits for a person.', c:1, fork:'person', p:1100 },
      { n:'checker', say:'The on-call checker approves with a passkey.', c:1, t:900 },
      { n:'release', say:'Approved and signed for lane 9b.' },
      { n:'gate', say:'After 18 Jan 2027. Permitted issuer, AML and sanctions with a wallet screen, price win, payee consent.', c:4, ring:'ok', bub:['Gate open, 4 of 4','coin'], gateOpen:true, p:1600 },
      { n:'stable', say:'It wins on hours, not price. The firm quote must beat $2.30.', cost:{ v:2.3 }, end:'paid', out:'Paid after hours on lane 9b. The quote had to beat $2.30 to go.' },
    ],
    inject: [
      { n:'email', say:'An invoice PDF hides a line: pay this new account now.', bub:['Hidden instruction','bad'] },
      { n:'agent', say:'The agent treats the PDF as untrusted input.', t:30 },
      { n:'gateway', say:'Draft tools only. The agent cannot release.', c:1 },
      { n:'api', say:'Gateway role only.', c:1 },
      { n:'mandate', say:'The signature is valid.', c:2 },
      { n:'guard', say:'Invoice match finds no invoice of record for that account.', checks:[['invoice','fail','No invoice of record']], end:'blocked', out:'Caught at invoice match. The PDF line matches no approved invoice, so nothing is sent.' },
    ],
  }};

  /* ---------- state ---------- */
  const NS = 'http://www.w3.org/2000/svg';
  const VB = { today: [1940, 1100], y1: [1940, 1100], target: [2080, 1130] };
  const SEGV = { today: 'today', y1: 'year1', target: 'target' }; // internal key to the value in the address and the toggle
  const KEYV = { today: 'today', current: 'today', year1: 'year1', target: 'target' };
  const FULL = { today: '/images/agentic-payouts/aws-current.svg', y1: '/images/agentic-payouts/aws-year1.svg', target: '/images/agentic-payouts/aws-target.svg', gen: '/images/agentic-payouts/target-generic.svg' };
  const toKey = (v) => (v === 'year1' ? 'y1' : v === 'today' || v === 'current' ? 'today' : 'target');
  let state = toKey(ar.dataset.arch), view = ar.dataset.cloud === 'generic' ? 'gen' : 'aws', story = 'known', mode = 'simple';
  let buildLayers = null, building = false, buildIdx = -1;
  let RUN = 0, paused = false, playing = false;
  let nodeById = {};
  const reduce = () => PDD.still;
  const index = () => { nodeById = {}; NODES[state].forEach((n) => { nodeById[n.id] = n; }); };
  index();
  const isVis = (layer) => !buildLayers || buildLayers.includes(layer || 'base');
  const useAws = () => state === 'target' && view === 'aws';
  const raf = (cb) => (document.hidden ? setTimeout(() => cb(performance.now()), 16) : requestAnimationFrame(cb));
  const q = (s, r) => (r || ar).querySelector(s);
  const qa = (s, r) => [...(r || ar).querySelectorAll(s)];
  function el(tag, attrs, parent, text) {
    const e = document.createElementNS(NS, tag);
    if (attrs) for (const k in attrs) if (attrs[k] !== undefined && attrs[k] !== null) e.setAttribute(k, attrs[k]);
    if (text !== undefined) e.textContent = text;
    if (parent) parent.appendChild(e);
    return e;
  }
  function wait(ms, my) {
    return new Promise((res) => {
      let left = ms, last = performance.now();
      const tick = (now) => { if (my !== RUN) return res(); if (!paused) left -= (now - last); last = now; if (left <= 0) res(); else raf(tick); };
      raf(tick);
    });
  }

  /* ---------- shared readouts: now line, counters, outcome, drawers ---------- */
  const nowB = q('.pdd-ar3-nb'), nowT = q('.pdd-ar3-nt'), out = q('.pdd-ar3-out');
  const cT = q('.pdd-ar3-ctr[data-c="t"] b'), cC = q('.pdd-ar3-ctr[data-c="c"] b'), cR = q('.pdd-ar3-ctr[data-c="r"] b');
  const ppBtn = q('.pdd-ar3-pp'), rpBtn = q('.pdd-ar3-rp'), bdBtn = q('.pdd-ar3-bd'), fmBtn = q('.pdd-ar3-fm'), fullA = q('.pdd-ar3-full'), dgBtn = q('.pdd-ar3-dg');
  const diaBox = q('.pdd-ar3-dia');
  let diaImg = null;
  const chipBtns = qa('.pdd-ar3-chip');
  const mapBox = q('.pdd-ar3-map'), scroller = q('.pdd-ar3-scroll'), prog = q('.pdd-ar3-prog');
  const bump = (e) => { if (reduce()) return; e.classList.remove('is-bump'); void e.offsetWidth; e.classList.add('is-bump'); };
  const bar = (e, p) => e.parentElement.style.setProperty('--p', String(Math.max(0, Math.min(1, p))));
  const intro = () => INTRO[state].replace(/<span class="op">/, '<span class="pdd-view">');
  function setNow(b, t, isHtml) {
    nowB.textContent = b; bump(nowB);
    if (isHtml) nowT.innerHTML = t; else nowT.textContent = t;
  }
  let ctr = { c: 0 };
  function fmtT(s) {
    if (s < 1) return '0 s';
    if (s < 90) return Math.round(s) + ' s';
    if (s < 90 * 60) return Math.round(s / 60) + ' min';
    if (s < 36 * H) return Math.round(s / H) + ' h';
    const d = Math.round(s / 86400 * 2) / 2; return d + (d === 1 ? ' day' : ' days');
  }
  function fmtCost(c, k) {
    k = k == null ? 1 : k;
    if (!c) return '$0';
    if (c.lo !== undefined) return '$' + (c.lo * k).toFixed(2) + ' to $' + (c.hi * k).toFixed(2);
    return c.v === 0 ? '$0' : (c.v % 1 ? '$' + (c.v * k).toFixed(2) : '$' + Math.round(c.v * k));
  }
  function resetCounters() { ctr = { c: 0 }; cT.textContent = '0 s'; cC.textContent = '0'; cR.textContent = '$0'; [cT, cC, cR].forEach((e) => bar(e, 0)); }
  function addCheck(n) { ctr.c += n; cC.textContent = String(ctr.c); bump(cC); bar(cC, Math.min(1, ctr.c / 12)); }
  function tweenCost(c) {
    bar(cR, 1);
    if (reduce()) { cR.textContent = fmtCost(c); return; }
    const t0 = performance.now(), dur = 700;
    const step = (now) => { const k = Math.min(1, (now - t0) / dur); cR.textContent = fmtCost(c, 1 - Math.pow(1 - k, 3)); if (k < 1) raf(step); else cR.textContent = fmtCost(c); };
    raf(step); bump(cR);
  }
  const drawers = (st) => qa('.pdd-ar3-steps[data-st="' + SEGV[st || state] + '"] .pdd-ar3-dr');
  const stepOf = (id) => { const n = nodeById[id]; if (n && n.step) return n.step; const r = STEPLIST[state].find((s) => s[1] === id); return r ? r[0] : null; };
  function live(id) { const s = id ? stepOf(id) : null; if (!s && id) return; drawers().forEach((d) => d.classList.toggle('is-live', s != null && d.dataset.s === s)); }
  function openDrawer(id) { const s = stepOf(id); if (!s) return; const sw = q('.pdd-ar3-stepsd'); if (sw) sw.open = true; drawers().forEach((d) => { d.open = d.dataset.s === s; }); }

  /* ---------- simple layer view ---------- */
  const lay = () => q('.pdd-ar3-lay[data-st="' + SEGV[state] + '"]');
  const blockOf = (id) => { const L = lay(); return L ? L.querySelector('.pdd-ar3-b[data-nodes~="' + id + '"]') : null; };
  const chipOf = (id) => { const L = lay(); return L ? L.querySelector('.pdd-ar3-bc i[data-n="' + id + '"]') : null; };
  const centre = (b, L) => { const i = b.querySelector('.pdd-ar3-bi') || b, r = i.getBoundingClientRect(), o = L.getBoundingClientRect(); return [r.left - o.left + r.width / 2, r.top - o.top + r.height / 2]; };
  const S = {
    cur: null,
    clear() {
      qa('.pdd-ar3-lay').forEach((L) => {
        L.querySelectorAll('.pdd-ar3-b').forEach((b) => { b.classList.remove('is-on', 'is-done', 'is-fail', 'is-ok'); const f = b.querySelector('.pdd-ar3-flag'); if (f) { f.textContent = ''; f.removeAttribute('data-k'); } });
        L.querySelectorAll('.pdd-ar3-bc i, .pdd-ar3-seal, .pdd-ar3-lock').forEach((c) => c.classList.remove('is-chk', 'is-ok', 'is-fail', 'is-on', 'is-opt', 'is-dim'));
        L.querySelectorAll('.pdd-ar3-tk, .pdd-ar3-ev').forEach((t) => { t.classList.remove('is-on', 'is-ok', 'is-bad', 'is-coin'); });
        L.classList.remove('is-run');
      });
      S.cur = null;
    },
    layers() { qa('.pdd-ar3-lay').forEach((L) => L.querySelectorAll('.pdd-ar3-b').forEach((b) => b.classList.toggle('is-off', !isVis(b.dataset.layer)))); },
    tk() { return lay().querySelector('.pdd-ar3-tk'); },
    put(tk, b) { const L = lay(); const [x, y] = centre(b, L); tk.style.transform = 'translate(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px)'; },
    begin() { S.clear(); lay().classList.add('is-run'); if (story === 'xb' && state === 'target') S.tk().classList.add('is-coin'); },
    place(id) { const b = blockOf(id), tk = S.tk(); if (!b) return; tk.style.transition = 'none'; S.put(tk, b); void tk.offsetWidth; tk.style.transition = ''; tk.classList.add('is-on'); S.cur = b; },
    async move(a, id, my) {
      const b = blockOf(id); if (!b) return;
      const from = S.cur;
      if (from && from !== b && from.classList.contains('has-seal') && b.dataset.b === 'adapter') { const s = from.querySelector('.pdd-ar3-seal'); if (s) s.classList.add('is-on'); }
      if (from === b) { await wait(reduce() ? 250 : 260, my); return; }
      S.put(S.tk(), b); S.cur = b;
      await wait(reduce() ? 0 : 560, my);
    },
    lit(id) {
      const b = blockOf(id); if (!b) return;
      lay().querySelectorAll('.pdd-ar3-b.is-on').forEach((x) => { if (x !== b) { x.classList.remove('is-on'); x.classList.add('is-done'); } });
      b.classList.add('is-on'); b.classList.remove('is-done');
      const c = chipOf(id); if (c && id === 'checker') c.classList.add('is-on');
      if (b.dataset.b === 'adapter') { const l = b.querySelector('.pdd-ar3-lock'); if (l) l.classList.add('is-on'); }
    },
    ring(id, k) { const b = blockOf(id); if (!b) return; b.classList.remove('is-ok', 'is-fail'); if (k === 'ok' || k === 'fail') b.classList.add('is-' + k); },
    flag(id, text, cls) { const b = blockOf(id); if (!b) return; const f = b.querySelector('.pdd-ar3-flag'); if (!f) return; f.textContent = text; f.dataset.k = cls || ''; },
    async checks(st, my) {
      let fails = 0;
      await Promise.all(st.checks.map(async (c, k) => {
        const [id, r, txt] = c;
        await wait(k * 240, my); if (my !== RUN) return;
        const chip = chipOf(id);
        if (chip) chip.classList.add('is-chk');
        await wait(reduce() ? 500 : 700, my); if (my !== RUN) return;
        if (chip) { chip.classList.remove('is-chk'); chip.classList.add(r === 'fail' ? 'is-fail' : 'is-ok'); }
        if (r === 'fail') { fails++; if (txt) S.flag(id, txt, 'bad'); } else addCheck(1);
      }));
      return fails;
    },
    async fork(id, kind, my) {
      const b = blockOf(id); if (!b) return;
      const opts = [...b.querySelectorAll('.pdd-ar3-bc i[data-n="rule"], .pdd-ar3-bc i[data-n="checker"]')];
      opts.forEach((o) => o.classList.add('is-opt'));
      await wait(reduce() ? 600 : 1000, my);
      opts.forEach((o) => { o.classList.remove('is-opt'); const pick = (kind === 'rule') === (o.dataset.n === 'rule'); o.classList.add(pick ? 'is-on' : 'is-dim'); });
      S.tk().classList.toggle('is-ok', kind === 'rule');
    },
    bad() { S.tk().classList.add('is-bad'); },
    ok() { S.tk().classList.add('is-ok'); },
    gate() {},
    async spawn(paths, my) {
      const L = lay(), ev = L.querySelector('.pdd-ar3-ev');
      const last = paths[0][paths[0].length - 1];
      const from = blockOf(paths[0][0]), to = blockOf('ledger') || blockOf(last);
      if (!from || !to) return;
      ev.style.transition = 'none'; S.put(ev, from); void ev.offsetWidth; ev.style.transition = ''; ev.classList.add('is-on');
      await wait(reduce() ? 300 : 80, my); if (my !== RUN) return;
      S.put(ev, to); await wait(reduce() ? 300 : 700, my); if (my !== RUN) return;
      to.classList.add('is-on'); live('ledger');
      setNow(stepOf('ledger') || 'i', state === 'today' ? 'The statement comes back the next day.' : 'Returns and status come back through the adapter and the event bus to the ledger, then the ERP.');
      await wait(reduce() ? 500 : 600, my);
    },
    end(kind) { if (kind === 'lost') S.bad(); if (kind === 'paid') S.ok(); },
    resize() { if (S.cur) { const tk = S.tk(); tk.style.transition = 'none'; S.put(tk, S.cur); void tk.offsetWidth; tk.style.transition = ''; } },
  };

  /* ---------- full map: the detailed SVG, built on first open ---------- */
  const M = { ready: false, nodeEls: new Map(), edges: [], trail: [] };
  function mapInit() {
    if (M.ready) return;
    const svg = el('svg', { class: 'pdd-ar3-stage', viewBox: '0 0 2080 1130', role: 'img', 'aria-label': 'Full architecture map' }, scroller);
    const defs = el('defs', null, svg);
    defs.innerHTML = '<filter id="pdd-ar3-glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>' +
      '<filter id="pdd-ar3-blur" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="7"/></filter>' +
      '<radialGradient id="pdd-ar3-halo"><stop offset="0" class="pdd-ar3-h0"/><stop offset=".6" class="pdd-ar3-h1"/><stop offset="1" class="pdd-ar3-h2"/></radialGradient>';
    ['main', 'input', 'id', 'ctrl', 'rule', 'person', 'event', 'coin', 'card', 'manual'].forEach((k) => {
      const m = el('marker', { id: 'pdd-ar3-m-' + k, viewBox: '0 0 12 12', refX: '9', refY: '6', markerWidth: '5', markerHeight: '5', orient: 'auto-start-reverse', class: 'eg k-' + k }, defs);
      el('path', { d: 'M1 1 L11 6 L1 11 z', class: 'mk' }, m);
    });
    M.svg = svg; M.gZ = el('g', null, svg); M.gE = el('g', null, svg); M.gN = el('g', null, svg); M.gFx = el('g', null, svg);
    M.token = el('g', { class: 'tok hide' }, svg); el('circle', { class: 'tg', r: 24 }, M.token); M.trailG = el('g', null, M.token); el('circle', { class: 'tk', r: 12 }, M.token);
    M.ready = true;
  }
  function wrap(text, max) {
    if (!text) return [];
    const words = text.split(' '); const o = []; let cur = '';
    words.forEach((w) => { if (!cur) cur = w; else if ((cur + ' ' + w).length <= max) cur += ' ' + w; else { o.push(cur); cur = w; } });
    if (cur) o.push(cur);
    return o;
  }
  function roundPath(pts, r) {
    r = r || 14;
    if (pts.length < 2) return '';
    let d = 'M' + pts[0][0] + ' ' + pts[0][1];
    for (let i = 1; i < pts.length - 1; i++) {
      const [x0, y0] = pts[i - 1], [x1, y1] = pts[i], [x2, y2] = pts[i + 1];
      const l1 = Math.hypot(x1 - x0, y1 - y0), l2 = Math.hypot(x2 - x1, y2 - y1);
      const rr = Math.min(r, l1 / 2, l2 / 2);
      d += ' L' + (x1 - (x1 - x0) / l1 * rr).toFixed(1) + ' ' + (y1 - (y1 - y0) / l1 * rr).toFixed(1) + ' Q' + x1 + ' ' + y1 + ' ' + (x1 + (x2 - x1) / l2 * rr).toFixed(1) + ' ' + (y1 + (y2 - y1) / l2 * rr).toFixed(1);
    }
    const l = pts[pts.length - 1];
    return d + ' L' + l[0] + ' ' + l[1];
  }
  function lockBadge(g, x, y) {
    const b = el('g', { class: 'lockb', transform: 'translate(' + x + ' ' + y + ')' }, g);
    el('rect', { x: -15, y: -15, width: 30, height: 30, rx: 7 }, b);
    el('path', { d: 'M-6 -2v-3.5a6 6 0 0 1 12 0V-2M-7.5 -2h15v10h-15z' }, b);
    el('title', null, b, 'Locked: release role only');
  }
  function badge(g0, b, x, y) {
    // r37: badges ride in a .fz group so fit mode scales them with the labels instead of hiding them
    const g = el('g', { class: 'bdg fz' }, g0);
    if (b === 'sox') el('path', { class: 'sox', d: 'M' + x + ' ' + (y - 11) + ' L' + (x + 11) + ' ' + y + ' L' + x + ' ' + (y + 11) + ' L' + (x - 11) + ' ' + y + ' Z' }, g);
    if (b === 'port') el('circle', { class: 'port', cx: x, cy: y, r: 9 }, g);
    if (b === 'awsb') el('rect', { class: 'awsb', x: x - 9, y: y - 9, width: 18, height: 18, rx: 3 }, g);
    if (b === 'lock') lockBadge(g, x, y);
  }
  function nodeContent(n) {
    const g = el('g', { class: 'swap' });
    const aws = useAws() && n.aws;
    const label = (state === 'target' && !aws && n.gL) ? n.gL : n.L;
    const sub = (state === 'target' && !aws && n.gS !== undefined) ? n.gS : n.S;
    el('circle', { class: 'halo', r: 78 }, g);
    el('circle', { class: 'ring', r: 65 }, g);
    // r36: icons drawn at 0.81, text unchanged
    const iw = el('g', n.type === 'note' ? { class: 'ico-wrap' } : { class: 'ico-wrap', transform: 'scale(0.81)' }, g);
    if (n.type === 'grid') {
      el('rect', { class: 'grid-frame', x: -70, y: -50, width: 140, height: 100, rx: 10 }, iw);
      [['r', 'p'], ['p', 'p'], ['p', 'p']].forEach((row, ri) => row.forEach((c, ci) => el('rect', { class: 'cell-' + c, x: -62 + ci * 64, y: -42 + ri * 29, width: 60, height: 25, rx: 5 }, iw)));
    } else if (n.type === 'note') {
      const p = el('g', { class: 'note-pill fz' }, iw);
      el('rect', { x: -96, y: -26, width: 192, height: 52, rx: 26 }, p);
      el('text', { x: 0, y: 8, 'text-anchor': 'middle' }, p, n.L);
      el('line', { x1: -80, y1: 0, x2: 80, y2: 0 }, p);
    } else if (aws) {
      el('rect', { class: 'plate', x: -40, y: -40, width: 80, height: 80, rx: 12 }, iw);
      el('use', { href: '#pdd-ar3-a-' + n.aws, x: -34, y: -34, width: 68, height: 68 }, iw);
    } else {
      const r = el('g', { class: 'iso-' + (n.role || 'slate') }, iw);
      el('use', { href: '#pdd-ar3-i-' + n.ico, x: -63, y: -58, width: 126, height: 126 }, r);
    }
    if (n.type !== 'note') {
      const right = n.lab === 'right';
      const lines = [];
      wrap(label, fitted ? 10 : 13).forEach((t) => lines.push(['nl', t, 24]));
      wrap(sub, 14).forEach((t) => lines.push(['ns', t, 23]));
      if (aws && n.S2) lines.push(['nw', n.S2, 23]);
      if (n.pain) lines.push(['np', n.pain[1], 23]);
      if (n.type === 'grid') { lines.length = 0; lines.push(['nl', 'Release matrix', 24]); }
      const tx = el('text', { class: right ? 'lab right' : 'lab', x: right ? 72 : 0, 'text-anchor': right ? 'start' : 'middle' }, g);
      let y = right ? -84 + (3 - lines.length) * 12 : (n.type === 'grid' ? 63 : (aws ? 55 : 57));
      // r37: a space opens each line after the first, so a copied label reads "Supplier portal", not "Supplierportal". dx pulls the glyphs back by half a space.
      lines.forEach(([c, t, lh], i) => { el('tspan', { x: right ? 72 : 0, y, class: c, dx: i ? (right ? '-.27em' : '-.135em') : null }, tx, (i ? ' ' : '') + t); y += lh; });
    } else el('text', { x: 0, y: 58, 'text-anchor': 'middle', class: 'ns' }, g, n.S);
    if (n.pill) {
      const pg = el('g', { class: 'fz' }, el('g', { class: 'npill', transform: 'translate(0 -70)' }, g));
      const pw = Math.round(n.pill.length * 10.8 + 30);
      el('rect', { x: -pw / 2, y: -18, width: pw, height: 36, rx: 18 }, pg);
      el('text', { x: 0, y: 7, 'text-anchor': 'middle' }, pg, n.pill);
    }
    if (n.step && !n.noBadge) { const s = el('g', { class: 'fz' }, el('g', { class: 'stp', transform: 'translate(-50 -32)' }, g)); el('circle', { r: n.step.length > 1 ? 22 : 19 }, s); el('text', { y: 7, 'text-anchor': 'middle' }, s, n.step); }
    if (n.pain) { const s = el('g', { class: 'fz' }, el('g', { class: 'pnb', transform: 'translate(48 -46)' }, g)); el('circle', { r: 19 }, s); el('text', { y: 7, 'text-anchor': 'middle' }, s, String(n.pain[0])); }
    if (n.badges) {
      const bs = n.badges.filter((b) => b !== 'awsb' || aws);
      if (n.lab !== 'right') { let by = -41; const bx = aws ? 43 : 44; bs.forEach((b) => { badge(g, b, b === 'lock' ? bx + 2 : bx, b === 'lock' ? by - 4 : by); by += b === 'lock' ? 34 : 26; }); }
      else { let bx = -52; bs.forEach((b) => { badge(g, b, bx, 70); bx += b === 'lock' ? 34 : 26; }); }
    }
    el('title', null, g, label + (sub ? ', ' + sub : ''));
    return g;
  }
  function renderZones() {
    M.gZ.innerHTML = '';
    (ZONES[state] || []).forEach((z) => {
      const g = el('g', { class: 'zn layerable ' + (z.cls || '') + (isVis(z.layer) ? '' : ' is-off') }, M.gZ);
      g.__z = z;
      el('rect', { x: z.x, y: z.y, width: z.w, height: z.h, rx: 18 }, g);
      if (z.t) el('text', { x: z.x + (z.top ? 6 : 14), y: z.top ? z.y - 10 : (z.bl ? z.y + z.h - 16 : z.y + 28) }, g, (fitted && z.tf) || z.t);
    });
    const b = BANNERS[state];
    if (b) {
      const g = el('g', { class: 'bn layerable ' + b.cls + (isVis(b.layer) ? '' : ' is-off') }, M.gZ); g.__z = b;
      el('rect', { x: b.x, y: b.y, height: 40, width: Math.round(b.t.length * 10.9 + 32) }, g);
      el('text', { x: b.x + 16, y: b.y + 27 }, g, b.t);
    }
  }
  function edgePts(e) {
    if (e[3]) return e[3];
    const a = nodeById[e[0]], b = nodeById[e[1]], R = 62;
    if (Math.abs(a.y - b.y) < 2) { const s = Math.sign(b.x - a.x); return [[a.x + s * R, a.y], [b.x - s * (R + 1), b.y]]; }
    if (Math.abs(a.x - b.x) < 2) { const s = Math.sign(b.y - a.y); return [[a.x, a.y + s * R], [a.x, b.y - s * (R + 1)]]; }
    return [[a.x + R, a.y], [(a.x + b.x) / 2, a.y], [(a.x + b.x) / 2, b.y], [b.x - R, b.y]];
  }
  function renderEdges(animate) {
    M.gE.innerHTML = ''; M.edges = [];
    (EDGES[state] || []).forEach((e, i) => {
      const a = nodeById[e[0]], b = nodeById[e[1]]; if (!a || !b) return;
      const kind = e[2], o = e[6] || {}, d = roundPath(edgePts(e));
      const vis = isVis(a.layer) && isVis(b.layer);
      const g = el('g', { class: 'eg layerable k-' + kind + (vis ? '' : ' is-off') }, M.gE);
      const base = el('path', { class: 'e-base', d, 'marker-end': 'url(#pdd-ar3-m-' + kind + ')', 'marker-start': o.both ? 'url(#pdd-ar3-m-' + kind + ')' : null }, g);
      el('path', { class: 'e-flow', d }, g);
      if (e[4]) { const lp = e[5] || [0, 0]; el('text', { class: 'e-lbl', x: lp[0], y: lp[1], 'text-anchor': lp[2] || 'middle' }, g, e[4]); }
      if (o.seal) { const sg = el('g', { class: 'seal', transform: 'translate(' + o.seal[0] + ' ' + o.seal[1] + ')' }, g); el('circle', { r: 15 }, sg); el('path', { d: 'M-6 0l4 4 8-8' }, sg); el('title', null, sg, 'Signed release'); }
      M.edges.push({ from: e[0], to: e[1], kind, g, path: base, vis });
      if (animate && !reduce() && vis) { const L = base.getTotalLength(); base.animate([{ strokeDasharray: L + ' ' + L, strokeDashoffset: L }, { strokeDasharray: L + ' ' + L, strokeDashoffset: 0 }], { duration: 700, delay: 300 + i * 18, easing: 'cubic-bezier(.6,0,.3,1)', fill: 'backwards' }); }
    });
  }
  function renderNodes(animate) {
    const list = NODES[state], keep = new Set(list.map((n) => n.id));
    M.nodeEls.forEach((g, id) => { if (!keep.has(id)) { M.nodeEls.delete(id); if (reduce() || !animate) g.remove(); else { g.classList.add('leave'); setTimeout(() => g.remove(), 460); } } });
    const order = ['base', 'rails', 'adapter', 'guard', 'agent', 'controls'];
    list.forEach((n, i) => {
      let g = M.nodeEls.get(n.id);
      const content = nodeContent(n);
      if (g) {
        const inner = g.querySelector('.nd-in'), old = inner.querySelector('.swap');
        if (old && animate && !reduce()) { old.classList.add('out'); setTimeout(() => old.remove(), 260); content.style.opacity = '0'; inner.appendChild(content); raf(() => raf(() => { content.style.opacity = ''; })); }
        else { inner.innerHTML = ''; inner.appendChild(content); }
      } else {
        g = el('g', { class: 'nd enter', 'data-id': n.id, tabindex: '0', role: 'button' }, M.gN);
        el('g', { class: 'nd-in' }, g).appendChild(content);
        M.nodeEls.set(n.id, g);
        const delay = reduce() || !animate ? 0 : 200 + order.indexOf(n.layer || 'base') * 70 + (i % 6) * 30;
        setTimeout(() => raf(() => g.classList.remove('enter')), delay);
        g.addEventListener('click', () => select(g.dataset.id));
        g.addEventListener('keydown', (ev) => { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); select(g.dataset.id); } });
      }
      g.style.transform = 'translate(' + n.x + 'px, ' + n.y + 'px)';
      g.setAttribute('aria-label', ((state === 'target' && !useAws() && n.gL) ? n.gL : n.L) + (n.step ? ', step ' + n.step : ''));
      g.classList.toggle('is-off', !isVis(n.layer));
      g.classList.toggle('dash', !!n.dash);
      g.classList.remove('lit', 'checking', 'ok', 'fail', 'sel', 'new');
    });
  }
  function drawStatic() {
    if (state === 'target' && isVis('rails')) {
      const p = el('g', { class: 'fz' }, el('g', { class: 'gatepill', transform: 'translate(1783 960)' }, M.gFx));
      el('rect', { x: -125, y: -24, width: 250, height: 44, rx: 22 }, p);
      el('text', { x: 0, y: 6, 'text-anchor': 'middle' }, p, 'Off until 18 Jan 2027');
    }
  }
  function mapRender(animate) {
    if (!M.ready || mode !== 'full') return;
    M.svg.setAttribute('viewBox', '0 0 ' + VB[state][0] + ' ' + VB[state][1]);
    renderNodes(animate); renderZones(); renderEdges(animate);
    M.gFx.innerHTML = ''; drawStatic();
    M.token.classList.add('hide');
    M.svg.classList.toggle('stage-idle', !playing);
    applyZoom(); renderProgress();
  }
  function mapLayers() {
    if (!M.ready) return;
    NODES[state].forEach((n) => { const g = M.nodeEls.get(n.id); if (g) g.classList.toggle('is-off', !isVis(n.layer)); });
    [...M.gZ.children].forEach((g) => { if (g.__z) g.classList.toggle('is-off', !isVis(g.__z.layer)); });
    M.edges.forEach((e) => { const v = isVis(nodeById[e.from].layer) && isVis(nodeById[e.to].layer); e.vis = v; e.g.classList.toggle('is-off', !v); });
  }
  // r36: on wide screens the whole map fits the panel with no scroll. Text that
  // must stay readable grows by --a3-k so it still draws at 14px or more, and the
  // small text (sub lines, edge labels, side badges) moves to the tap drawer.
  let z = 1;
  const fitOk = () => !!(window.matchMedia && window.matchMedia('(min-width: 1200px)').matches);
  let fitted = fitOk();
  const baseW = () => Math.max(scroller.clientWidth, Math.round(VB[state][0] * 0.7));
  function applyZoom() {
    if (!M.ready) return;
    const w = fitted ? scroller.clientWidth : Math.round(baseW() * z);
    M.svg.style.width = w + 'px';
    M.svg.classList.toggle('fit', fitted);
    scroller.classList.toggle('is-fit', fitted);
    M.svg.style.setProperty('--a3-k', fitted ? Math.max(1, 0.7 * VB[state][0] / w).toFixed(3) : '1');
  }
  qa('.pdd-ar3-zoom button').forEach((b) => b.addEventListener('click', () => {
    const was = fitted;
    if (b.dataset.z === 'in') { if (fitted) { fitted = false; z = 1; } else z = Math.min(2.2, z * 1.2); }
    else if (b.dataset.z === 'out') { if (!fitted && z <= 1 && fitOk()) fitted = true; else z = Math.max(scroller.clientWidth / baseW(), z / 1.2); }
    else { z = 1; fitted = fitOk(); }
    if (was !== fitted) mapRender(false); else applyZoom();
  }));
  PDD.onResize(scroller, () => { if (fitted) applyZoom(); });
  function select(id) {
    M.nodeEls.forEach((g) => g.classList.remove('sel'));
    const g = M.nodeEls.get(id); if (g) g.classList.add('sel');
    const n = nodeById[id];
    if (n && !playing) {
      const gen = state === 'target' && !useAws(), sub = (gen && n.gS !== undefined) ? n.gS : n.S;
      // r36: the fitted map hides sub lines, so a tap says them here
      setNow(n.step || 'i', ((gen && n.gL) ? n.gL : n.L) + (fitted && sub ? ', ' + sub : '') + '. ' + (n.d || '')); openDrawer(id);
    }
  }
  function findEdge(a, b) {
    let e = M.edges.find((x) => x.from === a && x.to === b && x.vis !== false);
    if (e) return { e, rev: false };
    e = M.edges.find((x) => x.from === b && x.to === a);
    return e ? { e, rev: true } : null;
  }
  function placeToken(x, y) {
    M.token.setAttribute('transform', 'translate(' + x + ' ' + y + ')');
    M.trail.push([x, y]); if (M.trail.length > 9) M.trail.shift();
    M.trailG.innerHTML = '';
    M.trail.forEach(([tx, ty], i) => { if (i === M.trail.length - 1) return; el('circle', { class: 'tr', cx: tx - x, cy: ty - y, r: 3 + i * 0.9, opacity: (0.08 + i * 0.07).toFixed(2) }, M.trailG); });
    follow(x);
  }
  let lastFollow = 0;
  function follow(x) {
    const now = performance.now(); if (now - lastFollow < 250) return; lastFollow = now;
    if (scroller.scrollWidth <= scroller.clientWidth + 4) return;
    const px = x * (M.svg.getBoundingClientRect().width / VB[state][0]), cw = scroller.clientWidth, sl = scroller.scrollLeft;
    if (px < sl + 80 || px > sl + cw - 80) scroller.scrollTo({ left: Math.max(0, px - cw / 2), behavior: reduce() ? 'auto' : 'smooth' });
  }
  function travel(a, b, my, tFrom, tTo, tk) {
    tk = tk || M.token;
    return new Promise((res) => {
      const f = findEdge(a, b), nb = nodeById[b];
      if (!f) { if (tk === M.token) placeToken(nb.x, nb.y); return res(); }
      const { e, rev } = f;
      e.g.classList.add('hot');
      const L = e.path.getTotalLength(), dur = reduce() ? 0 : Math.max(420, L / 0.75);
      let t = 0, last = performance.now();
      const step = (now) => {
        if (my !== RUN) return res();
        if (!paused) t += now - last; last = now;
        const k = dur ? Math.min(1, t / dur) : 1;
        const ek = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
        const p = e.path.getPointAtLength(rev ? L * (1 - ek) : L * ek);
        if (tk === M.token) { placeToken(p.x, p.y); if (tTo !== undefined && tTo !== tFrom) { const tv = tFrom + (tTo - tFrom) * ek; cT.textContent = fmtT(tv); bar(cT, Math.pow(Math.min(1, tv / (48 * H)), 0.25)); } }
        else tk.setAttribute('transform', 'translate(' + p.x + ' ' + p.y + ')');
        if (k < 1) raf(step); else { setTimeout(() => e.g.classList.remove('hot'), 900); res(); }
      };
      raf(step);
    });
  }
  function bubble(id, text, cls) {
    const n = nodeById[id]; if (!n) return;
    const g = el('g', { class: 'bub ' + (cls || '') }, M.gFx);
    const w = Math.round(text.length * 11.2 + 36);
    let bx = n.x, by = n.y - 130; if (n.y < 300) by = n.y + 140;
    bx = Math.max(w / 2 + 8, Math.min(VB[state][0] - w / 2 - 8, bx));
    g.setAttribute('transform', 'translate(' + bx + ' ' + by + ')');
    el('rect', { x: -w / 2, y: -30, width: w, height: 46, rx: 12 }, g);
    el('text', { x: 0, y: 1, 'text-anchor': 'middle' }, g, text);
    if (!reduce()) g.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 300 });
  }
  function xmark(id) {
    const n = nodeById[id];
    const g = el('g', { class: 'xmark', transform: 'translate(' + (n.x + 58) + ' ' + (n.y - 58) + ')' }, M.gFx);
    el('circle', { r: 24 }, g); el('path', { d: 'M-9 -9 L9 9 M9 -9 L-9 9' }, g);
  }
  const F = {
    begin() { mapClear(); M.svg.classList.remove('stage-idle'); if (story === 'xb' && state === 'target') M.token.classList.add('coin'); },
    place(id) { const n = nodeById[id]; M.token.classList.remove('hide'); M.trail.length = 0; placeToken(n.x, n.y); },
    async move(a, id, my, t0, t1) { await travel(a, id, my, t0, t1); },
    lit(id) { const g = M.nodeEls.get(id); if (g) g.classList.add('lit'); },
    ring(id, k) { const g = M.nodeEls.get(id); if (!g) return; g.classList.remove('checking', 'ok', 'fail'); g.classList.add(k); if (k === 'fail') M.token.classList.add('bad'); },
    flag(id, text, cls) { bubble(id, text, cls); },
    async checks(st, my) {
      let fails = 0;
      await Promise.all(st.checks.map(async (c, k) => {
        const [id, r, txt] = c;
        await wait(k * 220, my); if (my !== RUN) return;
        const s = nodeById[st.n];
        const p = el('g', { class: 'probe' }, M.gFx); el('circle', { r: 10 }, p);
        p.setAttribute('transform', 'translate(' + s.x + ' ' + s.y + ')');
        await travel(st.n, id, my, undefined, undefined, p);
        p.remove(); if (my !== RUN) return;
        const cg = M.nodeEls.get(id); if (!cg) return;
        cg.classList.add('lit', 'checking');
        await wait(reduce() ? 450 : 650, my); if (my !== RUN) return;
        cg.classList.remove('checking'); cg.classList.add(r === 'fail' ? 'fail' : 'ok');
        if (r === 'fail') fails++; else addCheck(1);
        if (txt) bubble(id, txt, r === 'fail' ? 'bad' : 'ok');
      }));
      return fails;
    },
    async fork(id, kind, my) {
      const opts = M.edges.filter((e) => e.from === id && (e.kind === 'rule' || e.kind === 'person'));
      opts.forEach((e) => e.g.classList.add('opt'));
      await wait(reduce() ? 600 : 1100, my);
      opts.forEach((e) => { e.g.classList.remove('opt'); if (e.kind !== kind) e.g.classList.add('dim'); });
      M.token.classList.toggle('ok', kind === 'rule');
    },
    bad() { M.token.classList.add('bad'); },
    ok() { M.token.classList.add('ok'); },
    gate(open) { const p = M.gFx.querySelector('.gatepill'); if (p) { p.classList.toggle('open', open); p.querySelector('text').textContent = open ? 'Open in this 2027 story' : 'Off until 18 Jan 2027'; } },
    async spawn(paths, my) {
      for (const path of paths) {
        const g = el('g', { class: 'ev-tk' }, M.gFx); el('circle', { r: 9 }, g);
        const s = nodeById[path[0]]; g.setAttribute('transform', 'translate(' + s.x + ' ' + s.y + ')');
        for (let i = 1; i < path.length; i++) {
          if (my !== RUN) return;
          await travel(path[i - 1], path[i], my, undefined, undefined, g);
          const ng = M.nodeEls.get(path[i]); if (ng) ng.classList.add('lit');
          if (path[i] === 'ledger') { live('ledger'); setNow(stepOf('ledger') || 'i', 'Returns and status come back through the adapter and the event bus to the ledger, then the ERP.'); }
        }
        g.remove();
      }
    },
    end(kind, id) { if (kind === 'lost') { M.token.classList.add('bad'); } if (kind === 'paid') M.token.classList.add('ok'); },
    resize() {},
  };
  function mapClear() {
    if (!M.ready) return;
    M.gFx.innerHTML = ''; drawStatic();
    M.nodeEls.forEach((g) => g.classList.remove('lit', 'checking', 'ok', 'fail', 'new', 'sel'));
    M.edges.forEach((e) => e.g.classList.remove('hot', 'opt', 'dim'));
    M.token.setAttribute('class', 'tok hide'); M.trail.length = 0; M.trailG.innerHTML = '';
  }
  const V = () => (mode === 'full' && M.ready ? F : S);

  /* ---------- build it: layer by layer, Today, then Year 1, then Target ---------- */
  const BUILD = [
    { s: 'today', layers: null, t: 'Today' },
    { s: 'y1', layers: ['base', 'rails'], t: 'Rails' }, { s: 'y1', layers: ['base', 'rails', 'adapter'], t: 'Adapter' }, { s: 'y1', layers: ['base', 'rails', 'adapter', 'guard'], t: 'Guard' }, { s: 'y1', layers: ['base', 'rails', 'adapter', 'guard', 'agent'], t: 'Agent' }, { s: 'y1', layers: null, t: 'Controls' },
    { s: 'target', layers: ['base', 'rails'], t: 'Rails' }, { s: 'target', layers: ['base', 'rails', 'adapter'], t: 'Adapter' }, { s: 'target', layers: ['base', 'rails', 'adapter', 'guard'], t: 'Guard' }, { s: 'target', layers: ['base', 'rails', 'adapter', 'guard', 'agent'], t: 'Agent' }, { s: 'target', layers: null, t: 'Controls' },
  ];
  function renderProgress() {
    if (!prog) return;
    prog.innerHTML = '';
    const pip = (i, t, p) => { const s = document.createElement('span'); s.className = 'pdd-ar3-pip' + (buildIdx >= i ? ' is-on' : '') + (buildIdx === i ? ' is-cur' : ''); s.textContent = t; p.appendChild(s); };
    const lab = document.createElement('span'); lab.textContent = building ? 'Building' : 'Build order'; prog.appendChild(lab);
    pip(0, 'Today', prog);
    [['Year 1', 1, 5], ['Target', 6, 10]].forEach(([t, a, b]) => { const g = document.createElement('span'); g.className = 'pdd-ar3-pg'; const l = document.createElement('span'); l.textContent = t; g.appendChild(l); for (let i = a; i <= b; i++) pip(i, BUILD[i].t, g); prog.appendChild(g); });
  }
  function applyLayers() { S.layers(); mapLayers(); }
  async function runBuild() {
    stopPlay(true); const my = ++RUN;
    building = true; bdBtn.setAttribute('aria-pressed', 'true'); bdBtn.textContent = 'Stop';
    for (let i = 0; i < BUILD.length; i++) {
      if (my !== RUN) return;
      buildIdx = i; const b = BUILD[i];
      buildLayers = b.layers;
      if (state !== b.s) { pick(b.s, true); }
      else { applyLayers(); renderProgress(); }
      if (M.ready && mode === 'full' && i > 0) NODES[state].forEach((n) => { const g = M.nodeEls.get(n.id); if (g && isVis(n.layer)) { g.classList.add('new'); setTimeout(() => g.classList.remove('new'), 2000); } });
      setNow(String(i + 1), i === 0 ? 'Start from the manual desk of today.' : (b.s === 'y1' ? 'Year 1, layer ' + i + ' of 5: ' : 'Target, layer ' + (i - 5) + ' of 5: ') + b.t.toLowerCase() + '.');
      renderProgress();
      await wait(reduce() ? 1100 : 1700, my);
    }
    if (my !== RUN) return;
    stopBuild(); setNow('i', intro(), true);
  }
  function stopBuild() {
    if (!building && !buildLayers) return;
    building = false; buildLayers = null; buildIdx = -1;
    bdBtn.setAttribute('aria-pressed', 'false'); bdBtn.textContent = 'Build it';
    applyLayers(); renderProgress();
  }

  /* ---------- the story runner, shared by both views ---------- */
  async function runStory() {
    const my = ++RUN;
    if (building) stopBuild();
    paused = false; playing = true; syncPlay();
    { const sd = q('.pdd-ar3-storyd'); if (sd) sd.open = true; }
    const v = V();
    S.clear(); mapClear(); v.begin(); resetCounters(); live(null);
    const steps = STORIES[state][story];
    out.dataset.end = ''; out.textContent = 'Running: ' + STORY_META.find((s) => s.k === story).t + '.';
    let prev = null, T = 0, lastStep = null;
    for (let si = 0; si < steps.length; si++) {
      const st = steps[si];
      if (my !== RUN) return;
      const n = nodeById[st.n];
      const tNext = T + (st.t || 0);
      if (!prev) v.place(st.n);
      else { await v.move(prev, st.n, my, T, tNext); if (reduce()) await wait(500, my); }
      if (my !== RUN) return;
      T = tNext; cT.textContent = fmtT(T); if (st.t) { bump(cT); bar(cT, Math.pow(Math.min(1, T / (48 * H)), 0.25)); }
      v.lit(st.n); live(st.n);
      // a part with no step number keeps the last step shown, so the counter never shows a number that is not a step
      if (n.step) lastStep = n.step;
      setNow(lastStep || 'i', st.say);
      if (st.gateOpen) v.gate(true);
      if (st.c) addCheck(st.c);
      if (st.checks) { const fails = await v.checks(st, my); if (my !== RUN) return; if (fails) { v.ring(st.n, 'fail'); v.bad(); } }
      if (st.ring === 'check') { v.ring(st.n, 'checking'); await wait(st.p || 1200, my); }
      if (st.ring === 'ok') { v.ring(st.n, 'checking'); await wait((st.p || 1000) * 0.6, my); v.ring(st.n, 'ok'); }
      if (st.ring === 'fail') { v.ring(st.n, 'checking'); await wait(700, my); v.ring(st.n, 'fail'); v.bad(); }
      if (my !== RUN) return;
      if (st.bub) v.flag(st.n, st.bub[0], st.bub[1]);
      if (st.fork) await v.fork(st.n, st.fork, my);
      else await wait(st.p || (reduce() ? 700 : 450), my);
      if (my !== RUN) return;
      if (st.cost) tweenCost(st.cost);
      if (st.end) {
        const endTxt = { held: 'Held', blocked: 'Blocked', na: 'No agent' }[st.end];
        if (endTxt) { cT.textContent = endTxt; bump(cT); }
        if (!st.cost && (st.end === 'held' || st.end === 'blocked' || st.end === 'na')) { cR.textContent = '$0'; bar(cR, 0); }
        v.end(st.end, st.n);
        out.dataset.end = st.end; out.textContent = st.out || '';
        if (st.spawn) await v.spawn(Array.isArray(st.spawn[0]) ? st.spawn : [st.spawn], my);
        break;
      }
      prev = st.n;
    }
    if (my !== RUN) return;
    await wait(400, my);
    if (my !== RUN) return;
    playing = false; syncPlay();
    if (M.ready) M.svg.classList.add('stage-idle');
  }
  function stopPlay(silent) {
    RUN++; playing = false; paused = false; syncPlay();
    S.clear(); mapClear();
    if (M.ready) M.svg.classList.add('stage-idle');
    if (!silent) { resetCounters(); live(null); out.dataset.end = ''; out.textContent = 'Press Play to run the story through this stage.'; }
  }
  function syncPlay() {
    ppBtn.textContent = playing && !paused ? 'Pause' : (paused ? 'Resume' : 'Play');
    ppBtn.setAttribute('aria-pressed', String(playing && !paused));
    ar.toggleAttribute('data-playing', playing);
  }

  /* ---------- controls ---------- */
  const fullHref = () => (state === 'target' ? (view === 'gen' ? FULL.gen : FULL.target) : FULL[state]);
  // r35 close-out: the simple view shows real AWS icons and services when AWS is picked on Target
  const AWS_SIMPLE = { agent: ['agent', 'AgentCore'], mandate: ['verifier', 'API Gateway, Lambda'], guard: ['guard', 'Lambda, DynamoDB'], rail: ['verifier', 'Lambda'], release: ['release', 'Step Functions'], adapter: ['adapter', 'Lambda in a VPC'], bank: ['ownbank', 'Your bank API'], ledger: ['ledger', 'DynamoDB, S3'] };
  function simpleCloud() {
    const L = q('.pdd-ar3-lay[data-st="target"]'); if (!L) return;
    const aws = view === 'aws';
    L.querySelectorAll('.pdd-ar3-b').forEach((b) => {
      const m = AWS_SIMPLE[b.dataset.b]; if (!m) return;
      const svg = b.querySelector('.pdd-ar3-bi'), u = svg && svg.querySelector('use');
      if (u) {
        if (!u.dataset.g) u.dataset.g = u.getAttribute('href');
        if (aws) { u.setAttribute('href', '#pdd-ar3-a-' + m[0]); u.setAttribute('x', '22'); u.setAttribute('y', '22'); u.setAttribute('width', '76'); u.setAttribute('height', '76'); }
        else { u.setAttribute('href', u.dataset.g); ['x', 'y', 'width', 'height'].forEach((a) => u.removeAttribute(a)); }
        svg.classList.toggle('is-aws', aws);
      }
      let sv = b.querySelector('.pdd-ar3-svc');
      if (!sv) { sv = document.createElement('span'); sv.className = 'pdd-ar3-svc'; sv.textContent = m[1]; const bt = b.querySelector('.pdd-ar3-bt'); if (bt) bt.after(sv); else b.append(sv); }
      sv.hidden = !aws;
    });
  }
  // r37: Diagram is a pan and zoom viewer over the draw.io export. dz 1 is the SVG's natural size (100 percent), so node
  // names draw at their exported 32 to 44 px. The .svg loads first and the .png is the fallback. Mouse drag pans, touch scrolls natively.
  let dz = 1, dnat = 0, dnatH = 0;
  const DIA_ALT = {
    today: 'AWS architecture, today: supplier email and bank-detail changes land in a shared inbox, a clerk keys them into the ERP and the bank portal, a maker and checker approve, batch ACH or wire pays, and a spreadsheet reconciles the statement.',
    y1: 'AWS architecture, year one: the agent proposes a payout, one thin adapter checks the mandate, runs the payee guard and the release matrix, a checker app releases outside the matrix, and the bank connector sends over the bank API you already use to ACH, RTP or wire.',
    target: 'AWS architecture, target state: agent runtime and policy gateway in the agent account, payment API, mandate check, payee registry and guard, release matrix and workflow in the payment core account, rail adapter and egress in the rail VPC, evidence and trail in the log archive account, and the checker app in the checker account.',
    gen: 'Generic architecture, target state: agent host and gateway, payment API, mandate check, payee registry and rule service, policy engine and workflow engine, rail adapter and one exit, write-once evidence and audit trail, and a checker app, across core, log and checker accounts.',
  };
  const dscroll = diaBox ? diaBox.querySelector('.pdd-ar3-dscroll') : null;
  const dfit = () => (dnat && dscroll ? Math.max(0.02, (dscroll.clientWidth - 2) / dnat) : 1);
  const diaZoom = (fx, fy) => {
    if (!diaImg || !dscroll) return;
    if (!dnat) { diaImg.style.width = '100%'; return; }
    const w0 = Math.max(1, diaImg.clientWidth), h0 = Math.max(1, diaImg.clientHeight);
    if (fx == null) fx = (dscroll.scrollLeft + dscroll.clientWidth / 2) / w0;
    if (fy == null) fy = (dscroll.scrollTop + dscroll.clientHeight / 2) / h0;
    const w = Math.round(dnat * dz), h = Math.round(w * dnatH / dnat);
    diaImg.style.width = w + 'px';
    dscroll.scrollLeft = Math.max(0, fx * w - dscroll.clientWidth / 2);
    dscroll.scrollTop = Math.max(0, fy * h - dscroll.clientHeight / 2);
  };
  const diaLoaded = () => { dnat = diaImg.naturalWidth || 0; dnatH = diaImg.naturalHeight || 0; dz = 1; diaZoom(1 / 3, 0.5); };
  if (dscroll) {
    let drag = null;
    dscroll.addEventListener('pointerdown', (e) => { if (e.pointerType !== 'mouse' || e.button !== 0) return; drag = { x: e.clientX, y: e.clientY, l: dscroll.scrollLeft, t: dscroll.scrollTop }; dscroll.classList.add('is-drag'); try { dscroll.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ } e.preventDefault(); });
    dscroll.addEventListener('pointermove', (e) => { if (!drag) return; dscroll.scrollLeft = drag.l - (e.clientX - drag.x); dscroll.scrollTop = drag.t - (e.clientY - drag.y); });
    const endDrag = () => { drag = null; dscroll.classList.remove('is-drag'); };
    dscroll.addEventListener('pointerup', endDrag); dscroll.addEventListener('pointercancel', endDrag);
    const fitBtn = diaBox.querySelector('button[data-dz="reset"]'); if (fitBtn) { fitBtn.textContent = 'Fit'; fitBtn.setAttribute('aria-label', 'Fit the diagram to the panel'); }
  }
  function syncChrome() {
    if (fullA) fullA.href = fullHref();
    ar.dataset.cloud = view === 'gen' ? 'generic' : 'aws';
    simpleCloud();
    if (diaBox && mode === 'diagram') {
      const h = fullHref();
      if (!diaImg && h) {
        diaImg = document.createElement('img'); diaImg.className = 'pdd-ar3-dimg'; diaImg.decoding = 'async'; diaImg.alt = ''; diaImg.draggable = false;
        diaImg.addEventListener('load', diaLoaded);
        diaImg.addEventListener('error', () => { const s = diaImg.getAttribute('src') || ''; if (/\.svg$/.test(s)) diaImg.src = s.replace(/\.svg$/, '.png'); });
        dscroll.appendChild(diaImg);
      }
      if (diaImg && h && diaImg.dataset.want !== h) { diaImg.dataset.want = h; dnat = 0; dz = 1; diaImg.src = h; diaImg.alt = DIA_ALT[state === 'target' ? (view === 'aws' ? 'target' : 'gen') : state] + ' Drag to pan, or open Full size in a new tab.'; }
    }
    if (M.ready) M.svg.setAttribute('aria-label', state === 'today' ? 'Today, the manual payout desk' : state === 'y1' ? 'Year 1, the thin adapter' : 'Target platform, ' + (view === 'aws' ? 'AWS view' : 'generic view'));
  }
  // pick a state: from the toggle (pdd:set), from Build it, or from the address
  function pick(st, fromBuild) {
    if (!fromBuild) stopBuild();
    stopPlay(false);
    state = st; index(); syncChrome();
    const seg = q('.pdd-ar3-seg'), sv = SEGV[st];
    if (ar.dataset.arch !== sv) { ar.dataset.arch = sv; seg.querySelectorAll('button[data-val]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.val === sv))); }
    S.layers(); mapRender(true);
    if (!fromBuild) setNow('i', intro(), true);
  }
  ar.addEventListener('pdd:set', (e) => {
    if (!e.detail) return;
    if (e.detail.key === 'arch') { const st = toKey(e.detail.value); if (st !== state || building) pick(st); }
    if (e.detail.key === 'cloud') { const nv = e.detail.value === 'generic' ? 'gen' : 'aws'; if (nv !== view) { view = nv; syncChrome(); if (M.ready && mode === 'full' && state === 'target') { stopPlay(false); renderNodes(true); renderEdges(false); mapLayers(); M.gFx.innerHTML = ''; drawStatic(); } } }
  });
  const write = (v) => { if (!PDD.reader) return; try { history.replaceState(null, '', '#reader=' + PDD.reader + '&build=arch&arch=' + v + PDD.railPart()); } catch (err) { /* ignore */ } };
  q('.pdd-ar3-seg').querySelectorAll('button[data-val]').forEach((b) => b.addEventListener('click', (e) => { if (e.isTrusted) write(b.dataset.val); }));
  const pickArch = (v) => { const b = q('.pdd-ar3-seg button[data-val="' + KEYV[v] + '"]'); if (b && b.getAttribute('aria-pressed') !== 'true') b.click(); return !!b; };
  const hashArch = () => { const m = /[#&]arch=(current|today|year1|target)/.exec(location.hash); return m ? m[1] : null; };
  const h0 = hashArch(); if (h0) pickArch(h0);
  window.addEventListener('hashchange', () => { const h = hashArch(); if (h) pickArch(h); });
  chipBtns.forEach((b) => b.addEventListener('click', () => {
    story = b.dataset.k; chipBtns.forEach((c) => c.setAttribute('aria-pressed', String(c === b)));
    runStory();
  }));
  ppBtn.addEventListener('click', () => {
    if (playing && !paused) { paused = true; syncPlay(); return; }
    if (playing && paused) { paused = false; syncPlay(); return; }
    runStory();
  });
  rpBtn.addEventListener('click', () => runStory());
  bdBtn.addEventListener('click', () => { if (building) { RUN++; stopBuild(); setNow('i', intro(), true); } else runBuild(); });
  // Full map opens the detailed drawing in place of the layer view
  function setMode(m) {
    if (m === mode) return;
    stopPlay(false);
    mode = m; ar.dataset.mode = m;
    fmBtn.setAttribute('aria-pressed', String(m === 'full')); fmBtn.setAttribute('aria-expanded', String(m === 'full'));
    fmBtn.textContent = m === 'full' ? 'Simple view' : 'Full map';
    if (dgBtn) { dgBtn.setAttribute('aria-pressed', String(m === 'diagram')); dgBtn.setAttribute('aria-expanded', String(m === 'diagram')); dgBtn.textContent = m === 'diagram' ? 'Simple view' : 'Diagram'; }
    mapBox.hidden = m !== 'full';
    if (diaBox) diaBox.hidden = m !== 'diagram';
    if (m === 'full') { mapInit(); syncChrome(); mapRender(true); }
    if (m === 'diagram') { syncChrome(); if (dnat) { dz = 1; diaZoom(1 / 3, 0.5); } }
  }
  fmBtn.addEventListener('click', () => setMode(mode === 'full' ? 'simple' : 'full'));
  if (dgBtn) dgBtn.addEventListener('click', () => setMode(mode === 'diagram' ? 'simple' : 'diagram'));
  if (diaBox) diaBox.querySelectorAll('button[data-dz]').forEach((b) => b.addEventListener('click', () => { const k = b.dataset.dz; dz = k === 'in' ? Math.min(3, dz * 1.4) : k === 'out' ? Math.max(dfit(), dz / 1.4) : dfit(); diaZoom(); }));
  // the scene tab leaving Architecture pauses a running story
  if (scene) scene.addEventListener('pdd:set', (e) => { if (e.detail && e.detail.key === 'tab' && e.detail.value !== 'arch' && playing && !paused) { paused = true; syncPlay(); } });
  // an opened drawer lights its node on the map
  qa('.pdd-ar3-dr').forEach((d) => d.addEventListener('toggle', () => {
    if (d.open) drawers().forEach((x) => { if (x !== d && x.open) x.open = false; });
    if (!M.ready || mode !== 'full' || !d.open) return;
    const row = STEPLIST[state].find((s) => s[0] === d.dataset.s);
    M.nodeEls.forEach((g) => g.classList.remove('sel'));
    if (row) { const g = M.nodeEls.get(row[1]); if (g) g.classList.add('sel'); const n = nodeById[row[1]]; if (n) follow(n.x); }
  }));
  if ('ResizeObserver' in window) new ResizeObserver(() => { S.resize(); applyZoom(); }).observe(ar);
  syncChrome(); S.layers(); setNow('i', intro(), true); renderProgress();
  // r37: Architecture opens on the simple view at every width. Full map is one click away, and its legend drawer is open so it reads at 1440 in fit mode.
  const legd = q('.pdd-ar3-legd'); if (legd) legd.open = true;
  ar.classList.add('is-ready');
  window.__pddArch = { state: () => state, mode: () => mode, setMode, setStory: (k) => { story = k; chipBtns.forEach((c) => c.setAttribute('aria-pressed', String(c.dataset.k === k))); }, runStory, playing: () => playing, pick: (v) => pickArch(v) };
  // the verdict path links to the target design
  const go = scene && scene.querySelector('.pdd-vd-go');
  if (go) go.addEventListener('click', () => {
    const tab = scene.querySelector('.pdd-bd-seg button[data-val="arch"]'); if (tab) tab.click();
    const v = go.dataset.go || 'target'; pickArch(v); write(KEYV[v] || 'target');
    const stage = scene.querySelector('.pdd-stage') || scene;
    try { stage.scrollIntoView({ block: 'start', behavior: PDD.still ? 'auto' : 'smooth' }); } catch (err) { /* ignore */ }
    const on = q('.pdd-ar3-seg button[aria-pressed="true"]'); if (on) on.focus({ preventScroll: true });
  });
})();
