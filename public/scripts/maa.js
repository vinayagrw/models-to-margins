/* Monetizing AI Agents: page-only behaviour. Core first, then one block per section. */
(function () {
  const root = document.querySelector('.maa');
  if (!root) return;
  root.classList.add('maa-js');
  const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const READERS = ['owner', 'startup', 'services', 'buyer'];
  const subs = [];
  const store = {
    get() { try { return localStorage.getItem('maa-reader'); } catch (e) { return null; } },
    set(v) { try { localStorage.setItem('maa-reader', v); } catch (e) { /* storage unavailable */ } },
  };
  const fromHash = () => { const m = /reader=([a-z]+)/.exec(location.hash); return m && READERS.includes(m[1]) ? m[1] : null; };

  const MAA = window.MAA = {
    root, still, reader: root.dataset.reader || 'owner',
    onReader(fn) { subs.push(fn); fn(MAA.reader); },
    setReader(v, silent) {
      if (!READERS.includes(v)) return;
      MAA.reader = v; root.dataset.reader = v;
      root.querySelectorAll('.maa-switch [data-reader-btn]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.readerBtn === v)));
      if (!silent) { store.set(v); try { history.replaceState(null, '', '#reader=' + v); } catch (e) { /* ignore */ } }
      subs.forEach((fn) => fn(v));
    },
    data(name) { const el = root.querySelector('script[data-maa="' + name + '"]'); return el ? JSON.parse(el.textContent) : null; },
    svg(tag, attrs, parent) { const n = document.createElementNS('http://www.w3.org/2000/svg', tag); for (const k in (attrs || {})) n.setAttribute(k, attrs[k]); if (parent) parent.appendChild(n); return n; },
    el(tag, attrs, parent, text) { const n = document.createElement(tag); for (const k in (attrs || {})) n.setAttribute(k, attrs[k]); if (text != null) n.textContent = text; if (parent) parent.appendChild(n); return n; },
    onResize(el, fn) { let w = 0; const run = () => { const nw = Math.round(el.clientWidth); if (nw && nw !== w) { w = nw; fn(nw); } }; if ('ResizeObserver' in window) new ResizeObserver(run).observe(el); else window.addEventListener('resize', run); run(); },
    seen(el, fn) { if (!('IntersectionObserver' in window)) { fn(); return; } const io = new IntersectionObserver((es) => { es.forEach((e) => { if (e.isIntersecting) { io.disconnect(); fn(); } }); }, { threshold: 0.25 }); io.observe(el); },
    usd(v, d) { const a = Math.abs(v); return (v < 0 ? '-' : '') + '$' + a.toLocaleString('en-US', { minimumFractionDigits: d == null ? 2 : d, maximumFractionDigits: d == null ? 2 : d }); },
  };

  // keep the sticky reader switch clear of the site header
  const hdr = document.querySelector('.site-header');
  const place = () => { let t = 10; if (hdr && getComputedStyle(hdr).position === 'sticky') t = Math.round((parseFloat(getComputedStyle(hdr).top) || 0) + hdr.offsetHeight + 8); root.style.setProperty('--maa-top', t + 'px'); };
  place(); window.addEventListener('resize', place);

  // reader switch
  root.querySelectorAll('.maa-switch [data-reader-btn]').forEach((b) => b.addEventListener('click', () => MAA.setReader(b.dataset.readerBtn)));
  MAA.setReader(fromHash() || store.get() || MAA.reader, true);
  window.addEventListener('hashchange', () => { const h = fromHash(); if (h) MAA.setReader(h, true); });

  // stagger index for [data-rise]
  root.querySelectorAll('.mwf-fig').forEach((f) => f.querySelectorAll('[data-rise]').forEach((n, i) => n.style.setProperty('--i', i)));

  // segmented toggle: <div class="maa-seg" data-key="zillow"><button data-val="in">. Sets data-<key> on the closest figure.
  root.querySelectorAll('.maa-seg[data-key]').forEach((seg) => {
    const host = seg.closest('figure') || root;
    const key = seg.dataset.key;
    const set = (v) => {
      host.setAttribute('data-' + key, v);
      seg.querySelectorAll('button[data-val]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.val === v)));
      host.dispatchEvent(new CustomEvent('maa:set', { detail: { key, value: v } }));
    };
    seg.querySelectorAll('button[data-val]').forEach((b) => b.addEventListener('click', () => set(b.dataset.val)));
    const first = seg.querySelector('button[aria-pressed="true"]') || seg.querySelector('button[data-val]');
    if (first) set(first.dataset.val);
  });

  // pick: <div class="maa-pick"> with <button data-pick="x"> and <div data-panel="x">
  root.querySelectorAll('.maa-pick').forEach((box) => {
    const btns = [...box.querySelectorAll('[data-pick]')];
    const panels = [...box.querySelectorAll('[data-panel]')];
    const show = (id) => {
      btns.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.pick === id)));
      panels.forEach((p) => { p.hidden = p.dataset.panel !== id; });
      box.dispatchEvent(new CustomEvent('maa:pick', { detail: { id } }));
    };
    btns.forEach((b) => b.addEventListener('click', () => show(b.dataset.pick)));
    const init = btns.find((b) => b.getAttribute('aria-pressed') === 'true') || btns[0];
    if (init) show(init.dataset.pick);
  });

  // play: <div class="maa-play" data-ms="1500"> with [data-step] items in order and buttons [data-act=play|next|prev|reset]
  root.querySelectorAll('.maa-play').forEach((box) => {
    const steps = [...box.querySelectorAll('[data-step]')];
    const status = box.querySelector('[data-play-status]');
    let at = -1, timer = null;
    const paint = () => {
      box.classList.toggle('is-run', at >= 0);
      box.dataset.at = String(at);
      steps.forEach((s, i) => { s.classList.toggle('is-on', i === at); s.classList.toggle('is-done', at >= 0 && i < at); });
      if (status) status.textContent = at < 0 ? (status.dataset.idle || '') : 'Step ' + (at + 1) + ' of ' + steps.length + (steps[at].dataset.say ? ': ' + steps[at].dataset.say : '');
      box.dispatchEvent(new CustomEvent('maa:step', { detail: { at, step: steps[at] || null } }));
    };
    const stop = () => { if (timer) { clearInterval(timer); timer = null; } const p = box.querySelector('[data-act="play"]'); if (p) p.textContent = p.dataset.label || 'Play'; };
    const go = (n) => { at = Math.max(-1, Math.min(steps.length - 1, n)); paint(); };
    box.querySelectorAll('[data-act]').forEach((b) => b.addEventListener('click', () => {
      const a = b.dataset.act;
      if (a === 'next') { stop(); go(at + 1); }
      else if (a === 'prev') { stop(); go(at - 1); }
      else if (a === 'reset') { stop(); go(-1); }
      else if (a === 'play') {
        if (timer) { stop(); return; }
        if (!b.dataset.label) b.dataset.label = b.textContent;
        if (at >= steps.length - 1) go(-1);
        go(at + 1); b.textContent = 'Pause';
        timer = setInterval(() => { if (at >= steps.length - 1) stop(); else go(at + 1); }, Number(box.dataset.ms) || 1500);
      }
    }));
    steps.forEach((s, i) => { if (s.matches('button,[tabindex]')) s.addEventListener('click', () => { stop(); go(i); }); });
    paint();
  });

  // section bar and reference drawer
  (function () {
    const ref = root.querySelector('.maa-ref'); const links = [...root.querySelectorAll('.maa-nav a')];
    const openFor = (id) => { if (!ref || !id) return; let t = null; try { t = document.getElementById(id); } catch (e) { /* ignore */ } if (t && ref.contains(t) && !ref.open) { ref.open = true; requestAnimationFrame(() => t.scrollIntoView()); } };
    links.forEach((a) => a.addEventListener('click', () => openFor(a.getAttribute('href').slice(1))));
    window.addEventListener('hashchange', () => openFor(location.hash.slice(1))); if (location.hash && !/reader=/.test(location.hash)) openFor(location.hash.slice(1));
    root.addEventListener('click', (e) => { const a = e.target.closest('a[href^="#"]'); if (a) openFor(a.getAttribute('href').slice(1)); });
    if (ref) { ref.addEventListener('toggle', () => window.dispatchEvent(new Event('resize'))); if (window.matchMedia('print').matches) ref.open = true; window.addEventListener('beforeprint', () => { ref.open = true; root.querySelectorAll('.mwf-fig').forEach((f) => f.classList.add('is-seen', 'is-in')); }); }
    const ids = links.map((a) => a.getAttribute('href').slice(1));
    const mark = () => {
      const line = (parseFloat(getComputedStyle(root).getPropertyValue('--maa-top')) || 108) + 90; let cur = null;
      ids.forEach((id) => { const t = document.getElementById(id); if (t && t.getBoundingClientRect().top <= line) cur = id; });
      links.forEach((a) => { const on = a.getAttribute('href') === '#' + cur; a.classList.toggle('is-on', on); if (on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current'); });
    };
    addEventListener('scroll', mark, { passive: true }); mark();
    // a detail panel that opens off screen is brought into view
    root.addEventListener('click', (ev) => { const b = ev.target.closest('[aria-controls]'); if (!b || b.closest('.maa-switch')) return; setTimeout(() => { const p = document.getElementById(b.getAttribute('aria-controls')); if (!p || p.hidden || !p.offsetParent) return; const r = p.getBoundingClientRect(); if (r.top > innerHeight - 80 || r.bottom < 0) p.scrollIntoView({ behavior: MAA.still ? 'auto' : 'smooth', block: 'nearest' }); }, 80); });
  })();
})();

/* Group A: the claim in detail. Core seg and pick behaviours carry every interaction here. */
(function () { const MAA = window.MAA; if (!MAA) return; const root = MAA.root;
  // arrow keys move between the choices of one picker (access chips, moat evidence)
  root.querySelectorAll('.maa-a-access .maa-pick, .maa-a-moat .maa-pick').forEach((box) => {
    const btns = [...box.querySelectorAll('[data-pick]')];
    box.addEventListener('keydown', (e) => {
      const i = btns.indexOf(e.target);
      if (i < 0) return;
      const d = (e.key === 'ArrowRight' || e.key === 'ArrowDown') ? 1 : (e.key === 'ArrowLeft' || e.key === 'ArrowUp') ? -1 : 0;
      if (!d) return;
      e.preventDefault();
      const n = btns[(i + d + btns.length) % btns.length];
      n.focus(); n.click();
    });
  });
})();

/* Section B: detail on selection for tiles and chart rows, then the margin calculator. */
(function () { const MAA = window.MAA; if (!MAA) return; const root = MAA.root;
  const DEF = { p: 0.99, n: 50000, c: 0.44, h: 5, r: 3, t: 0, f: 24, k: 13 };
  const PRE = { base: {}, all: { f: 0 }, review: { h: 20 } };
  // One failed attempt costs the model cost and earns nothing, so model cost per billed unit is c / (1 - f).
  const math = (v) => {
    const f = Math.min(Math.max(v.f, 0), 99) / 100;
    const model = v.c;
    const unbilled = v.c / (1 - f) - v.c;
    const review = (v.h / 100) * v.r;
    const other = v.t;
    const cost = model + unbilled + review + other;
    // Rounded so that a price equal to cost reads as break-even and not as a loss of a fraction of a cent.
    const unit = Math.round((v.p - cost) * 1e6) / 1e6 || 0;
    const heavyCost = (v.k * v.c) / (1 - f) + review + other;
    return {
      model, unbilled, review, other, cost, unit, heavyCost,
      margin: v.p > 0 ? unit / v.p : null,
      profit: unit * v.n,
      heavy: v.p > 0 ? (v.p - heavyCost) / v.p : null,
      evenCost: (v.p - review - other) * (1 - f),
    };
  };
  MAA.marginMath = math;
  // Detail on selection. Panels are in the page and open by default, so they show with scripts off and in print.
  // Here they are closed, and a button opens the one it controls. Selecting it again closes it.
  (root.querySelectorAll ? root.querySelectorAll('[data-b-pick]') : []).forEach((box) => {
    const btns = [...box.querySelectorAll('[data-pick]')];
    const panels = [...box.querySelectorAll('[data-panel]')];
    const show = (id) => {
      btns.forEach((b) => b.setAttribute('aria-expanded', String(b.dataset.pick === id)));
      panels.forEach((p) => { p.hidden = p.dataset.panel !== id; });
    };
    btns.forEach((b) => b.addEventListener('click', () => show(b.getAttribute('aria-expanded') === 'true' ? null : b.dataset.pick)));
    box.addEventListener('keydown', (e) => { if (e.key === 'Escape') show(null); });
    show(null);
  });
  const fig = root.querySelector('.maa-b-margin');
  if (!fig) return;
  const keys = Object.keys(DEF);
  const rng = {}, num = {};
  keys.forEach((k) => { rng[k] = fig.querySelector('[data-in="' + k + '"]'); num[k] = fig.querySelector('[data-num="' + k + '"]'); });
  if (keys.some((k) => !rng[k] || !num[k])) return;
  const out = (k) => fig.querySelector('[data-out="' + k + '"]');
  const part = (k) => fig.querySelector('[data-part="' + k + '"]');
  const seg = (k) => fig.querySelector('[data-seg="' + k + '"]');
  const wrap = fig.querySelector('.maa-b-m-wrap');
  const bar = fig.querySelector('[data-bar]');
  const usd = MAA.usd;
  const pct = (x) => (x == null || !isFinite(x) ? 'n/a' : String(Math.round(x * 100) || 0) + '%');
  const lim = {};
  keys.forEach((k) => { lim[k] = { lo: parseFloat(rng[k].min) || 0, hi: parseFloat(rng[k].max) }; });
  const clamp = (k, x) => (isFinite(x) ? Math.min(Math.max(x, lim[k].lo), lim[k].hi) : lim[k].lo);
  const read = () => {
    const v = {};
    keys.forEach((k) => { v[k] = clamp(k, parseFloat(num[k].value)); });
    return v;
  };
  let sayTimer = 0;
  const paint = () => {
    const v = read();
    const m = math(v);
    const loss = m.unit < 0;
    const scale = Math.max(v.p, m.cost) || 1;
    const w = (x) => String(Math.max(0, (x / scale) * 100));
    seg('model').style.setProperty('--w', w(m.model));
    seg('unbilled').style.setProperty('--w', w(m.unbilled));
    seg('review').style.setProperty('--w', w(m.review));
    seg('other').style.setProperty('--w', w(m.other));
    seg('margin').style.setProperty('--w', w(Math.max(m.unit, 0)));
    wrap.style.setProperty('--x', String((v.p / scale) * 100));
    fig.setAttribute('data-loss', String(loss));
    part('price').textContent = usd(v.p);
    part('model').textContent = usd(m.model);
    part('unbilled').textContent = usd(m.unbilled);
    part('review').textContent = usd(m.review);
    part('other').textContent = usd(m.other);
    part('margin').textContent = usd(m.unit);
    // --n is the character count. The stylesheet uses it to size the number so it stays on one line.
    const set = (k, text, neg) => { const n = out(k); n.textContent = text; n.style.setProperty('--n', String(text.length)); n.setAttribute('data-neg', String(!!neg)); };
    set('cost', usd(m.cost), false);
    set('margin', pct(m.margin), loss);
    set('profit', usd(Math.round(m.profit) || 0, 0), m.profit < 0);
    set('heavy', pct(m.heavy), m.heavy != null && m.heavy < 0);
    let say;
    if (v.p <= 0) say = 'Set a price above zero to see a margin.';
    else if (!loss) say = 'Break-even at a ' + usd(m.cost) + ' price' + (m.evenCost > v.c ? ' or a ' + usd(m.evenCost) + ' model cost' : '') + '.';
    else say = 'Each unit loses ' + usd(-m.unit) + '. Break-even needs a price of ' + usd(m.cost) + (m.evenCost > 0 ? ' or a model cost of ' + usd(m.evenCost) : '') + '.';
    if (v.p > 0) say += ' A heavy task costs ' + usd(m.heavyCost) + '.';
    // The note is a live region, so it is written once the reader pauses and not on every slider tick.
    const note = out('note');
    clearTimeout(sayTimer);
    if (!note.hasAttribute('aria-live')) { note.textContent = say; note.setAttribute('aria-live', 'polite'); }
    else sayTimer = setTimeout(() => { note.textContent = say; }, 400);
    bar.setAttribute('aria-label', loss
      ? 'Cost of ' + usd(m.cost) + ' is above the ' + usd(v.p) + ' price by ' + usd(-m.unit) + '.'
      : 'Of a ' + usd(v.p) + ' price, ' + usd(m.cost) + ' is cost and ' + usd(m.unit) + ' is margin.');
  };
  keys.forEach((k) => {
    rng[k].addEventListener('input', () => { num[k].value = rng[k].value; paint(); });
    // An empty or partly typed field leaves the slider where it is. Out-of-range values are written back on change.
    num[k].addEventListener('input', () => { const x = parseFloat(num[k].value); if (isFinite(x)) rng[k].value = String(clamp(k, x)); paint(); });
    num[k].addEventListener('change', () => { const x = clamp(k, parseFloat(num[k].value)); num[k].value = String(x); rng[k].value = String(x); paint(); });
  });
  fig.querySelectorAll('[data-preset]').forEach((b) => b.addEventListener('click', () => {
    const v = Object.assign({}, DEF, PRE[b.dataset.preset] || {});
    keys.forEach((k) => { num[k].value = String(v[k]); rng[k].value = String(v[k]); });
    paint();
  }));
  paint();
})();

(function () { const MAA = window.MAA; if (!MAA) return; const root = MAA.root;
  // C: a step, slot or box opens its evidence line. One line open per group, closed at load.
  // Without this script every line stays visible, and print shows them all.
  root.querySelectorAll('.maa-c-acc').forEach((box) => {
    const togs = [...box.querySelectorAll('.maa-c-tog[aria-controls]')];
    const set = (b, on) => { const p = document.getElementById(b.getAttribute('aria-controls')); b.setAttribute('aria-expanded', String(on)); if (p) p.hidden = !on; };
    togs.forEach((b) => {
      set(b, false);
      b.addEventListener('click', () => { const open = b.getAttribute('aria-expanded') === 'true'; togs.forEach((o) => set(o, false)); set(b, !open); });
    });
  });
})();

/* d: the 101 section moved to the instrument. Nothing to wire here. */

(function () { const MAA = window.MAA; if (!MAA) return; const root = MAA.root;
  // decision ring: light the spoke of the selected question
  const wrap = root.querySelector('.maa-e-wrap');
  if (wrap) {
    const lines = [...wrap.querySelectorAll('.maa-e-spokes line')];
    const paint = (id) => lines.forEach((l) => l.classList.toggle('is-on', l.dataset.spoke === id));
    wrap.addEventListener('maa:pick', (e) => paint(e.detail.id));
    const cur = wrap.querySelector('[data-pick][aria-pressed="true"]');
    if (cur) paint(cur.dataset.pick);
    // each reader change opens the question where that reader starts (judgement), without announcing it
    const START = { owner: 'gate', startup: 'market', services: 'fixed', buyer: 'count' };
    const cards = wrap.querySelector('.maa-e-cards');
    let timer = 0;
    MAA.onReader((r) => {
      const b = wrap.querySelector('[data-pick="' + START[r] + '"]');
      if (!b || b.getAttribute('aria-pressed') === 'true') return;
      if (cards) cards.setAttribute('aria-live', 'off');
      b.click();
      clearTimeout(timer);
      timer = setTimeout(() => { if (cards) cards.setAttribute('aria-live', 'polite'); }, 600);
    });
  }
  // closed objections print with their answers
  window.addEventListener('beforeprint', () => root.querySelectorAll('.maa-e-ob').forEach((d) => { d.open = true; }));
})();
