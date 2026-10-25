/* Decide, don't chat: seat gate, rail, hype filter, chooser. */
(function () {
  const root = document.querySelector('.ddc');
  if (!root) return;
  root.classList.add('ddc-js');
  const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const READERS = ['buyer', 'builder', 'strategy'];
  const store = { get() { try { return localStorage.getItem('ddc-reader'); } catch (e) { return null; } }, set(v) { try { localStorage.setItem('ddc-reader', v); } catch (e) { /* unavailable */ } } };
  const fromHash = () => { const m = /reader=([a-z]+)/.exec(location.hash); return m && READERS.includes(m[1]) ? m[1] : null; };
  let reader = '';
  const setReader = (v, opts) => {
    if (!READERS.includes(v)) return;
    const first = !reader;
    reader = v; root.dataset.reader = v;
    root.querySelectorAll('[data-reader-btn]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.readerBtn === v)));
    if (!(opts && opts.silent)) { store.set(v); const h = location.hash.slice(1); const rest = h.split('&').filter((p) => p && !/^(reader|seat)=/.test(p) && !/^ddc-/.test(p)); try { history.replaceState(null, '', '#' + ['reader=' + v].concat(rest).join('&')); } catch (e) { /* ignore */ } }
    const rp = root.querySelector('.dcr'); if (rp) rp.setAttribute('data-seat', v);
    document.dispatchEvent(new CustomEvent('ddc:reader', { detail: v }));
    if (first && opts && opts.scroll) { const s = root.querySelector('.ddc-scene:not(.ddc-gate)'); if (s) requestAnimationFrame(() => s.scrollIntoView({ behavior: still ? 'auto' : 'smooth', block: 'start' })); }
    scan();
  };
  root.querySelectorAll('[data-reader-btn]').forEach((b) => b.addEventListener('click', () => setReader(b.dataset.readerBtn, { scroll: true })));
  window.addEventListener('hashchange', () => { const h = fromHash(); if (h) { store.set(h); setReader(h, { silent: true }); } });

  // in-page links scroll without replacing #reader= in the address
  root.addEventListener('click', (e) => {
    const a = e.target.closest ? e.target.closest('a[href^="#ddc-"], a[href^="#dcr-"]') : null; if (!a) return;
    const t = document.getElementById(a.getAttribute('href').slice(1)); if (!t || !root.contains(t)) return;
    e.preventDefault();
    const d = t.closest('details'); if (d) d.open = true;
    t.scrollIntoView({ behavior: still ? 'auto' : 'smooth', block: 'center' });
    if (!t.hasAttribute('tabindex')) t.setAttribute('tabindex', '-1');
    try { t.focus({ preventScroll: true }); } catch (err) { /* ignore */ }
  });

  // reveal and rail
  const scenes = [...root.querySelectorAll('.ddc-scene')];
  scenes.forEach((s) => s.querySelectorAll('[data-rise]').forEach((n, i) => n.style.setProperty('--i', i)));
  const links = [...root.querySelectorAll('.ddc-rail a')];
  const enter = (s) => { s.classList.add('is-in'); document.dispatchEvent(new CustomEvent('ddc:in', { detail: s })); };
  function scan() { scenes.forEach((s) => { const r = s.getBoundingClientRect(); if (r.width && r.top < innerHeight && r.bottom > 0) enter(s); }); }
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) enter(e.target); }), { threshold: 0 });
    scenes.forEach((s) => io.observe(s));
    const io2 = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) links.forEach((a) => { const on = a.getAttribute('href') === '#' + e.target.id; a.classList.toggle('is-on', on); if (on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current'); }); }), { rootMargin: '-45% 0px -45% 0px' });
    scenes.forEach((s) => io2.observe(s));
  } else scenes.forEach(enter);
  setTimeout(scan, 1200);

  // hype filter
  const vfs = [...root.querySelectorAll('[data-vf]')];
  vfs.forEach((b) => b.addEventListener('click', () => {
    const v = b.dataset.vf;
    vfs.forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
    root.querySelectorAll('.ddc-claim').forEach((c) => { c.hidden = v !== 'all' && c.dataset.v !== v; });
  }));


  // hook count-up, with a settle fallback so the true value always lands
  const counted = new WeakSet();
  const countUp = (el) => {
    if (counted.has(el)) return; counted.add(el);
    const to = Number(el.dataset.to), dur = 1400, fmt = (v) => v.toFixed(1) + '%';
    if (still) { el.textContent = fmt(to); return; }
    const t0 = performance.now();
    const settle = () => { el.textContent = fmt(to); };
    const step = (t) => { const k = Math.min(1, (t - t0) / dur); el.textContent = fmt(to * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(step); };
    el.textContent = fmt(0); requestAnimationFrame(step); setTimeout(settle, dur + 300);
  };

  // escalation funnel, prices from the replay (per ticket)
  const PER = { df: 0.0024, esc: 0.0126, all: 0.26 };
  const slider = root.querySelector('[data-esc]');
  const lane = (k) => root.querySelector('.ddc-lane[data-l="' + k + '"]');
  const fillDots = (k, n) => { const box = lane(k).querySelector('.ddc-dots'); box.textContent = ''; for (let j = 0; j < n; j++) { const i = document.createElement('i'); i.style.setProperty('--d', j); box.appendChild(i); } lane(k).querySelector('b').textContent = String(n); };
  const money = (d) => d >= 10 ? '$' + Math.round(d) : '$' + d.toFixed(2);
  const funnel = () => {
    if (!slider) return;
    const r = Number(slider.value), hu = 2, dm = 100 - r - hu;
    slider.style.setProperty('--fill', (r / 40 * 100) + '%');
    root.querySelector('[data-o="rate"]').textContent = r + '%';
    fillDots('dm', dm); fillDots('fr', r); fillDots('hu', hu);
    const df = (100 - r) * PER.df + r * PER.esc, all = 100 * PER.all;
    root.querySelector('[data-o="c-df"]').textContent = money(df);
    root.querySelector('[data-o="c-all"]').textContent = money(all);
    root.querySelector('[data-o="c-x"]').textContent = Math.round(all / df) + 'x';
  };
  if (slider) slider.addEventListener('input', funnel);
  funnel();

  // screen vs API race, 10x faster than real time
  const race = root.querySelector('[data-race]');
  let raceT = [];
  const runRace = () => {
    if (!race) return;
    raceT.forEach(cancelAnimationFrame); raceT = [];
    race.querySelectorAll('[data-clock]').forEach((c) => {
      const real = Number(c.dataset.clock), bar = c.parentNode, fmt = (v) => (real >= 10 ? Math.round(v) : v.toFixed(1)) + ' s';
      if (still) { bar.style.setProperty('--p', 1); c.textContent = fmt(real); return; }
      const dur = real * 100, t0 = performance.now();
      const step = (t) => { const k = Math.min(1, (t - t0) / dur); bar.style.setProperty('--p', k); c.textContent = fmt(real * k); if (k < 1) raceT.push(requestAnimationFrame(step)); };
      bar.style.setProperty('--p', 0); raceT.push(requestAnimationFrame(step));
      setTimeout(() => { bar.style.setProperty('--p', 1); c.textContent = fmt(real); }, dur + 300);
    });
  };
  if (race) race.querySelector('[data-do="race"]').addEventListener('click', runRace);

  // reversibility gate
  const gb = root.querySelector('.ddc-gatebox');
  root.querySelectorAll('[data-gate]').forEach((b) => b.addEventListener('click', () => {
    gb.dataset.g = b.dataset.gate;
    root.querySelectorAll('[data-gate]').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
  }));

  // first entry of a scene starts its animation
  const once = new WeakSet();
  document.addEventListener('ddc:in', (e) => {
    const s = e.detail; if (once.has(s)) return; once.add(s);
    s.querySelectorAll('[data-to]').forEach(countUp);
    if (s.id === 'ddc-api') runRace();
  });

  // chooser
  const NAMES = ['Rules', 'Decision model', 'Small LLM', 'Frontier LLM', 'Computer-use agent'];
  const tpl = root.querySelector('#ddc-icons');
  const icons = tpl ? [...tpl.content.querySelectorAll('svg')] : [];
  const ans = { rev: 'yes', lat: 'sec', vol: 'high', chk: 'yes', cal: 'no' };
  const decide = (a) => {
    const why = [];
    if (a.rev === 'no') {
      why.push('It cannot be undone, so code decides and a person signs off.');
      if (a.cal === 'yes') why.push('No decision model has published calibration data yet.');
      return { r: 0, why };
    }
    if (a.lat === 'fast') {
      why.push('Under one second rules out a chat model call.');
      if (a.vol === 'high' || a.cal === 'yes') { why.push('A bounded choice at volume suits a decision model.'); return { r: 1, why }; }
      why.push('Low volume, so a rule is cheaper to keep.');
      return { r: 0, why };
    }
    if (a.cal === 'yes' && a.vol === 'high') { why.push('High volume with a confidence need suits a decision model.'); why.push('Test its calibration on your own data first.'); return { r: 1, why }; }
    if (a.lat === 'min' && a.chk === 'yes' && a.vol === 'low') { why.push('Minutes and a check allow a screen agent if no API exists.'); why.push('Prefer an API whenever there is one.'); return { r: 4, why }; }
    if (a.chk === 'yes') { why.push('An external check catches errors cheaply.'); why.push('Start small and escalate only when the check fails.'); return { r: 2, why }; }
    why.push('No check exists, so use the strongest model.'); why.push('Add a person to review its output.');
    return { r: 3, why };
  };
  const out = root.querySelector('.ddc-out');
  const render = () => {
    if (!out) return;
    const d = decide(ans);
    out.querySelector('.ddc-pname').textContent = NAMES[d.r];
    const slot = out.querySelector('.ddc-pico'); slot.textContent = '';
    if (icons[d.r]) slot.appendChild(icons[d.r].cloneNode(true));
    const ul = out.querySelector('.ddc-why'); ul.textContent = '';
    d.why.forEach((w) => { const li = document.createElement('li'); li.textContent = w; ul.appendChild(li); });
    out.querySelectorAll('.ddc-mini li').forEach((li, i) => li.classList.toggle('is-on', i === d.r));
  };
  root.querySelectorAll('[data-q]').forEach((b) => b.addEventListener('click', () => {
    ans[b.dataset.q] = b.dataset.a;
    root.querySelectorAll('[data-q="' + b.dataset.q + '"]').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
    render();
  }));
  render();

  const init = fromHash() || store.get();
  if (fromHash()) store.set(fromHash());
  if (init) setReader(init, { silent: true });
})();
