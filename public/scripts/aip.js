/* AI in one payout: core behaviour, then one block per scene. */
(function () {
  const root = document.querySelector('.aip');
  if (!root) return;
  root.classList.add('aip-js');
  const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const READERS = ['buyer', 'builder', 'strategy'];
  const subs = [];
  const store = { get() { try { return localStorage.getItem('aip-reader'); } catch (e) { return null; } }, set(v) { try { localStorage.setItem('aip-reader', v); } catch (e) { /* unavailable */ } } };
  const fromHash = () => { const m = /reader=([a-z]+)/.exec(location.hash); return m && READERS.includes(m[1]) ? m[1] : null; };
  const SRC = (() => { const el = root.querySelector('script[data-aip="sources"]'); try { return el ? JSON.parse(el.textContent) : {}; } catch (e) { return {}; } })();

  const AIP = window.AIP = {
    root, still, reader: '', step: '',
    setStep(s) { AIP.step = String(s); try { history.replaceState(null, '', '#' + (AIP.reader ? 'reader=' + AIP.reader + '&' : '') + 'step=' + AIP.step); } catch (e) { /* ignore */ } },
    onReader(fn) { subs.push(fn); if (AIP.reader) fn(AIP.reader); },
    setReader(v, opts) {
      if (!READERS.includes(v)) return;
      const first = !AIP.reader;
      AIP.reader = v; root.dataset.reader = v;
      root.querySelectorAll('[data-reader-btn]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.readerBtn === v)));
      if (!(opts && opts.silent)) { store.set(v); try { history.replaceState(null, '', '#reader=' + v + (AIP.step ? '&step=' + AIP.step : '')); } catch (e) { /* ignore */ } }
      subs.forEach((fn) => fn(v));
      if (first && opts && opts.scroll) { const s = root.querySelector('.aip-scene:not(.aip-gate)'); if (s) requestAnimationFrame(() => s.scrollIntoView({ behavior: still ? 'auto' : 'smooth', block: 'start' })); }
    },
    data(name) { const el = root.querySelector('script[data-aip="' + name + '"]'); return el ? JSON.parse(el.textContent) : null; },
    svg(tag, attrs, parent) { const n = document.createElementNS('http://www.w3.org/2000/svg', tag); for (const k in (attrs || {})) n.setAttribute(k, attrs[k]); if (parent) parent.appendChild(n); return n; },
    el(tag, attrs, parent, text) { const n = document.createElement(tag); for (const k in (attrs || {})) n.setAttribute(k, attrs[k]); if (text != null) n.textContent = text; if (parent) parent.appendChild(n); return n; },
    onResize(el, fn) { let w = 0; const run = () => { const nw = Math.round(el.clientWidth); if (nw && nw !== w) { w = nw; fn(nw); } }; if ('ResizeObserver' in window) new ResizeObserver(run).observe(el); else window.addEventListener('resize', run); run(); },
    usd(v, d) { const a = Math.abs(v); const n = d == null ? 2 : d; return (v < 0 ? '-' : '') + '$' + a.toLocaleString('en-US', { minimumFractionDigits: n, maximumFractionDigits: n }); },
    fill(input) { const min = Number(input.min) || 0, max = Number(input.max) || 100; input.style.setProperty('--fill', ((Number(input.value) - min) / (max - min)) * 100 + '%'); },
  };

  // reader gate
  root.querySelectorAll('[data-reader-btn]').forEach((b) => b.addEventListener('click', () => AIP.setReader(b.dataset.readerBtn, { scroll: true })));
  const hashed = fromHash();
  if (hashed) store.set(hashed);
  const init = hashed || store.get();
  if (init) AIP.setReader(init, { silent: true });
  window.addEventListener('hashchange', () => { const h = fromHash(); if (h) { store.set(h); AIP.setReader(h, { silent: true }); } });
  // in-page links (rail, skip link) scroll without replacing #reader= in the address
  root.addEventListener('click', (e) => {
    const a = e.target.closest ? e.target.closest('a[href^="#aip-"]') : null; if (!a) return;
    const t = document.getElementById(a.getAttribute('href').slice(1)); if (!t || !root.contains(t)) return;
    e.preventDefault();
    t.scrollIntoView({ behavior: still ? 'auto' : 'smooth', block: 'start' });
    if (!t.hasAttribute('tabindex')) t.setAttribute('tabindex', '-1');
    try { t.focus({ preventScroll: true }); } catch (err) { /* ignore */ }
  });

  // scenes: reveal and rail
  const scenes = [...root.querySelectorAll('.aip-scene')];
  scenes.forEach((s) => s.querySelectorAll('[data-rise]').forEach((n, i) => n.style.setProperty('--i', i)));
  const rail = root.querySelector('.aip-rail');
  const links = rail ? [...rail.querySelectorAll('a')] : [];
  const seen = new WeakSet();
  const enter = (s) => { if (seen.has(s)) return; seen.add(s); s.classList.add('is-in'); s.dispatchEvent(new CustomEvent('aip:in')); };
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { io.unobserve(e.target); enter(e.target); } }), { threshold: 0, rootMargin: '0px 0px -15% 0px' });
    scenes.forEach((s) => io.observe(s));
    const io2 = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) links.forEach((a) => { const on = a.getAttribute('href') === '#' + e.target.id; a.classList.toggle('is-on', on); if (on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current'); }); }), { rootMargin: '-45% 0px -45% 0px' });
    scenes.forEach((s) => io2.observe(s));
  } else scenes.forEach(enter);
  setTimeout(() => scenes.forEach((s) => { const r = s.getBoundingClientRect(); if (r.width && r.top < innerHeight && r.bottom > 0) enter(s); }), 1200);

  // range fills
  root.querySelectorAll('input[type="range"]').forEach((i) => { AIP.fill(i); i.addEventListener('input', () => AIP.fill(i)); });

  // evidence chips: <button class="aip-chip" data-src="G#38" data-note="optional caveat">
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
    card = AIP.el('div', { class: 'aip-card', role: 'dialog', 'aria-label': 'Source' }, root);
    const srcs = []; const seenU = new Set();
    ids.forEach((id) => { const s = SRC[id]; if (!s || seenU.has(s.u)) return; seenU.add(s.u); srcs.push(s); });
    const pubs = [...new Set(srcs.map((s) => s.p))];
    AIP.el('strong', null, card, !srcs.length ? 'Source' : pubs.length === 1 ? pubs[0] : srcs.length + ' sources');
    if (pubs.length === 1 && srcs[0].i) AIP.el('em', null, card, 'Interest: ' + srcs[0].i);
    if (pubs.length > 1) { const seenP = new Set(); srcs.forEach((s) => { if (s.i && !seenP.has(s.p)) { seenP.add(s.p); AIP.el('em', null, card, s.p + ': ' + s.i); } }); }
    if (chip.dataset.note) AIP.el('span', null, card, chip.dataset.note);
    srcs.forEach((s, n) => { const a = AIP.el('a', { href: s.u, rel: 'noopener', target: '_blank' }, card, pubs.length > 1 ? s.p : srcs.length > 1 ? 'Source ' + (n + 1) : 'Open source'); a.setAttribute('aria-label', 'Open source: ' + s.p); });
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
  root.addEventListener('click', (e) => { const c = e.target.closest('.aip-chip'); if (c) { e.preventDefault(); if (owner === c) close(); else open(c, e.detail === 0); } else if (!e.target.closest('.aip-card')) close(); });
  document.addEventListener('click', (e) => { if (card && !root.contains(e.target)) close(); });
  document.addEventListener('keydown', (e) => {
    if (!card) return;
    if (e.key === 'Escape') { close(true); return; }
    // card opened by pointer: Tab from its chip enters the card
    if (e.key === 'Tab' && !e.shiftKey && document.activeElement === owner) { const a = card.querySelector('a'); if (a) { e.preventDefault(); a.focus(); } }
  });
  let lastW = window.innerWidth;
  window.addEventListener('resize', () => { if (window.innerWidth !== lastW) { lastW = window.innerWidth; if (card) close(); } });
  root.querySelectorAll('.aip-chip').forEach((c) => { c.setAttribute('type', 'button'); c.setAttribute('aria-expanded', 'false'); c.setAttribute('aria-haspopup', 'dialog'); });

  // segmented toggle: <div class="aip-seg" data-key="k"><button data-val="v">. Sets data-<key> on the closest [data-host] or scene.
  root.querySelectorAll('.aip-seg[data-key]').forEach((seg) => {
    const host = seg.closest('[data-host]') || seg.closest('.aip-scene') || root; const key = seg.dataset.key;
    const set = (v) => { host.setAttribute('data-' + key, v); seg.querySelectorAll('button[data-val]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.val === v))); host.dispatchEvent(new CustomEvent('aip:set', { detail: { key, value: v } })); };
    seg.querySelectorAll('button[data-val]').forEach((b) => b.addEventListener('click', () => set(b.dataset.val)));
    const f = seg.querySelector('button[aria-pressed="true"]') || seg.querySelector('button[data-val]'); if (f) set(f.dataset.val);
  });
})();

/* screen 1: the payout, step by step */
(function () {
  const AIP = window.AIP; if (!AIP) return;
  const root = AIP.root;
  const scene = root.querySelector('#aip-payout'); if (!scene) return;
  let D = null;
  try { D = AIP.data('s1-cases'); } catch (e) { return; }
  if (!D) return;
  const byId = {}; D.cases.forEach((c) => { byId[c.id] = c; });
  const MOD = { pv: 'ok', pn: 'flow', pilot: 'rule' };
  const nodes = [...scene.querySelectorAll('.aip-s1-node')];
  const detail = scene.querySelector('.aip-s1-detail');
  const two = scene.querySelector('.aip-s1-two');
  const coin = scene.querySelector('.aip-s1-coin');
  const back = scene.querySelector('[data-go="-1"]'), next = scene.querySelector('[data-go="1"]');
  const tally = [...scene.querySelectorAll('.aip-s1-tally li')];
  if (!detail || !nodes.length) return;
  // the walk: one state per AI role, in step order
  const WALK = []; D.steps.forEach((s) => s.cases.forEach((id, i) => WALK.push({ step: s, sub: i, id })));
  const key = (w) => w.step.n + (w.sub ? 'b' : '');
  let at = 0;
  const fillRow = (el, parts) => {
    if (!el) return;
    el.textContent = '';
    parts.forEach((p) => {
      if (typeof p === 'string') {
        // a mark right after a chip stays on the chip's line
        const last = el.lastChild; let t = p;
        if (/^[.,]/.test(p) && last && last.nodeType === 1 && last.classList.contains('aip-chip')) { const nb = AIP.el('span', { class: 'aip-nb' }); el.replaceChild(nb, last); nb.appendChild(last); nb.appendChild(document.createTextNode(p[0])); t = p.slice(1); }
        if (t) el.appendChild(document.createTextNode(t));
      }
      else if (p.tag === 'judge') AIP.el('span', { class: 'aip-tag', 'data-k': 'judge' }, el, 'Judgement');
      else { const a = { class: 'aip-chip', type: 'button', 'data-src': p.src.join(' '), 'aria-expanded': 'false', 'aria-haspopup': 'dialog' }; if (p.note) a['data-note'] = p.note; AIP.el('button', a, el, p.t); }
    });
  };
  const q = (s) => detail.querySelector(s);
  const show = (i, opts) => {
    if (i < 0 || i >= WALK.length) return;
    at = i; const w = WALK[i], c = byId[w.id], s = w.step, o = opts || {};
    nodes.forEach((n) => { const k = Number(n.dataset.step); n.setAttribute('aria-pressed', String(k === s.n)); n.classList.toggle('is-past', s.n === 8 ? k >= 3 && k <= 7 : k < s.n); });
    detail.dataset.g = c.g;
    if (MOD[c.g]) detail.dataset.m = MOD[c.g]; else detail.removeAttribute('data-m');
    const n = q('.aip-s1-n'); if (n) { n.textContent = s.n; n.hidden = s.n === 8; }
    const of = q('.aip-s1-of'); if (of) of.textContent = s.n === 8 ? 'Across steps 3 to 7' : 'Step ' + s.n + ' of 7, ' + s.name.toLowerCase();
    const name = q('.aip-s1-dname'); if (name) name.textContent = c.name;
    const badge = q('.aip-s1-badge'); if (badge) badge.textContent = D.grades[c.g];
    if (two) { two.hidden = s.cases.length < 2; two.querySelectorAll('button').forEach((b) => b.setAttribute('aria-pressed', String(Number(b.dataset.sub) === w.sub))); }
    ['p', 'a', 'k', 'e'].forEach((r) => fillRow(q('[data-row="' + r + '"]'), c[r]));
    if (coin) coin.hidden = s.n !== 5;
    const move = q('.aip-s1-move');
    if (move) { move.textContent = ''; if (c.lever) { move.appendChild(document.createTextNode(c.g === 'un' ? 'If proven, it would move: ' : 'Linked input of the sum: ')); AIP.el('b', null, move, D.levers[c.lever]); } else move.textContent = 'A pilot, so no input of the sum is linked yet.'; }
    // tally: roles met up to this state
    const met = {}; WALK.forEach((x, j) => { if (j <= i) met[byId[x.id].g] = (met[byId[x.id].g] || 0) + 1; });
    tally.forEach((li) => { const g = li.dataset.g, k = met[g] || 0, pips = li.querySelectorAll('.aip-s1-pips i'); pips.forEach((p, j) => p.classList.toggle('is-on', j < k)); const b = li.querySelector('b'); if (b) b.textContent = k + ' of ' + pips.length; });
    if (back) back.disabled = i === 0;
    if (next) next.textContent = i === WALK.length - 1 ? 'See the sum' : 'Next step';
    AIP.caseLever = c.lever || '';
    root.dispatchEvent(new CustomEvent('aip:step', { detail: { id: c.id, lever: c.lever || '' } }));
    if (!o.quiet) {
      if (AIP.setStep) AIP.setStep(key(w));
      if (!AIP.still) { detail.classList.remove('is-pop'); void detail.offsetWidth; detail.classList.add('is-pop'); }
      if (o.reveal) { const r = detail.getBoundingClientRect(); if (r.top > innerHeight * 0.6 || r.top < 0) window.scrollTo({ top: window.scrollY + r.top - 96, behavior: AIP.still ? 'auto' : 'smooth' }); }
    }
  };
  const first = (n) => WALK.findIndex((w) => w.step.n === n);
  nodes.forEach((n) => {
    n.addEventListener('click', () => show(first(Number(n.dataset.step)), { reveal: true }));
    n.addEventListener('keydown', (e) => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      const j = nodes.indexOf(n) + (e.key === 'ArrowRight' ? 1 : -1); if (j < 0 || j >= nodes.length) return;
      e.preventDefault(); nodes[j].focus(); show(first(Number(nodes[j].dataset.step)));
    });
  });
  if (two) two.querySelectorAll('button').forEach((b) => b.addEventListener('click', () => { const j = WALK.findIndex((w) => w.step === WALK[at].step && w.sub === Number(b.dataset.sub)); if (j >= 0) show(j); }));
  if (back) back.addEventListener('click', () => show(at - 1));
  if (next) next.addEventListener('click', () => {
    if (at < WALK.length - 1) { show(at + 1); return; }
    const t = root.querySelector('#aip-sum'); if (t) t.scrollIntoView({ behavior: AIP.still ? 'auto' : 'smooth', block: 'start' });
  });
  const fromHash = () => { const m = /step=([1-8])(b?)/.exec(location.hash); if (!m) return -1; return WALK.findIndex((w) => w.step.n === Number(m[1]) && w.sub === (m[2] ? 1 : 0)); };
  const h = fromHash();
  if (h >= 0) AIP.step = key(WALK[h]);
  show(h >= 0 ? h : 0, { quiet: true });
  window.addEventListener('hashchange', () => { const j = fromHash(); if (j >= 0 && j !== at) show(j, { quiet: true }); });
})();

/* screen 2: the sum */
(function () {
  const AIP = window.AIP; if (!AIP) return;
  const root = AIP.root;
  const scene = root.querySelector('#aip-sum'); if (!scene) return;
  let C = null;
  try { C = AIP.data('s2-calc'); } catch (e) { return; }
  if (!C) return;
  // the input moved by the step chosen on screen 1 is outlined
  const sliders = {};
  scene.querySelectorAll('.aip-s2-sl').forEach((s) => { sliders[s.dataset.k] = s; });
  const mark = (k) => Object.keys(sliders).forEach((x) => sliders[x].classList.toggle('is-lever', x === k));
  root.addEventListener('aip:step', (e) => mark(e.detail ? e.detail.lever : ''));
  mark(AIP.caseLever || '');
  // ---- bottom-up calculator
  const inp = {}, out = {};
  C.inputs.forEach((i) => { inp[i.k] = scene.querySelector('#aip-s2-' + i.k); out[i.k] = scene.querySelector('output[for="aip-s2-' + i.k + '"]'); });
  if (C.inputs.some((i) => !inp[i.k])) return;
  const o = (k) => scene.querySelector('[data-out="' + k + '"]');
  const oTotal = o('total'), oProc = o('proc'), oFraud = o('fraud'), oScale = o('scale');
  const bar = scene.querySelector('.aip-s2-bar');
  const segP = scene.querySelector('[data-seg="proc"]'), segF = scene.querySelector('[data-seg="fraud"]');
  const presets = [...scene.querySelectorAll('[data-preset]')];
  const sum = (v) => { const proc = v.pay * v.cost * (v.auto / 100) * (v.save / 100); const fraud = C.losses.v * (v.fraud / 100); return { proc, fraud, total: proc + fraud }; };
  const b2 = (x) => '$' + x.toFixed(2) + 'B', b1 = (x) => '$' + x.toFixed(1) + 'B';
  const show = { pay: (x) => x.toFixed(1) + 'B', cost: (x) => AIP.usd(x), auto: (x) => x + '%', save: (x) => x + '%', fraud: (x) => x + '%' };
  const say = { pay: (x) => x.toFixed(1) + ' billion payments a year', cost: (x) => AIP.usd(x) + ' per item', auto: (x) => x + ' percent automatable', save: (x) => x + ' percent of cost saved', fraud: (x) => x + ' percent of fraud loss addressable' };
  let shown = null, raf = 0;
  const read = () => { const v = {}; C.inputs.forEach((i) => { v[i.k] = Number(inp[i.k].value); }); return v; };
  const update = () => {
    const v = read(), s = sum(v);
    C.inputs.forEach((i) => { if (out[i.k]) out[i.k].textContent = show[i.k](v[i.k]); inp[i.k].setAttribute('aria-valuetext', say[i.k](v[i.k])); });
    if (oProc) oProc.textContent = b2(s.proc);
    if (oFraud) oFraud.textContent = b2(s.fraud);
    const scale = Math.max(30, Math.ceil(s.total / 10) * 10);
    if (oScale) oScale.textContent = '$' + scale + 'B';
    if (segP) segP.style.width = (s.proc / scale) * 100 + '%';
    if (segF) segF.style.width = (s.fraud / scale) * 100 + '%';
    let name = 'Your inputs';
    presets.forEach((b) => { const p = C.presets.find((x) => x.id === b.dataset.preset); const on = !!p && C.inputs.every((i) => Math.abs(p.v[i.k] - v[i.k]) < 1e-9); b.setAttribute('aria-pressed', String(on)); if (on) name = b.textContent; });
    if (bar) bar.setAttribute('aria-label', name + ': processing value ' + s.proc.toFixed(2) + ' billion dollars and fraud value ' + s.fraud.toFixed(2) + ' billion dollars a year, ' + s.total.toFixed(1) + ' billion in total. Our arithmetic, an illustration for the United States.');
    if (oTotal) {
      cancelAnimationFrame(raf);
      const from = shown == null ? s.total : shown, to = s.total;
      if (AIP.still || shown == null || Math.abs(to - from) < 0.05) { oTotal.textContent = b1(to); shown = to; }
      else { const t0 = performance.now(); const step = (t) => { const k = Math.min(1, (t - t0) / 450), e = 1 - Math.pow(1 - k, 3); shown = from + (to - from) * e; oTotal.textContent = b1(k === 1 ? to : shown); if (k < 1) raf = requestAnimationFrame(step); else shown = to; }; raf = requestAnimationFrame(step); }
    }
  };
  C.inputs.forEach((i) => inp[i.k].addEventListener('input', update));
  presets.forEach((b) => b.addEventListener('click', () => {
    const p = C.presets.find((x) => x.id === b.dataset.preset); if (!p) return;
    C.inputs.forEach((i) => { inp[i.k].value = p.v[i.k]; AIP.fill(inp[i.k]); });
    update();
  }));
  update();
})();

/* screen 3: your seat */
(function () {
  const AIP = window.AIP; if (!AIP) return;
  const root = AIP.root;
  const scene = root.querySelector('#aip-seat'); if (!scene) return;
  // a finding that points at a step opens that step on the way back up
  scene.querySelectorAll('a[data-step]').forEach((a) => a.addEventListener('click', () => {
    const n = root.querySelector('.aip-s1-node[data-step="' + a.dataset.step + '"]'); if (n) n.click();
  }));
  const btn = scene.querySelector('.aip-s3-copybtn'), said = scene.querySelector('.aip-s3-copied');
  if (!btn || !said) return;
  const legacy = (text) => {
    const ta = document.createElement('textarea'); ta.value = text; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select(); let ok = false;
    try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
    document.body.removeChild(ta); return ok;
  };
  let timer = 0;
  const say = (ok, text) => { said.textContent = ok ? 'Link copied.' : 'Copy failed. The link is ' + text; clearTimeout(timer); if (ok) timer = setTimeout(() => { said.textContent = ''; }, 4000); };
  btn.addEventListener('click', () => {
    const text = location.origin + location.pathname + '#' + [AIP.reader ? 'reader=' + AIP.reader : '', AIP.step ? 'step=' + AIP.step : ''].filter(Boolean).join('&');
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(() => say(true, text), () => say(legacy(text), text));
    else say(legacy(text), text);
  });
})();
