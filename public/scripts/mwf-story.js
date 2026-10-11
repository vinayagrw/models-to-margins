/* Measured Workflow Factory — scroll-story behaviour for the ledger deep dive.
   Content lives in the HTML; this file only reveals, pins and animates it.
   No-ops if the story markup is absent. */
(() => {
  const article = document.querySelector('.dd-ledger');
  if (!article || !article.querySelector('.mwf-fig')) return;
  article.classList.add('mwf-js');

  const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $$ = (sel, root = article) => Array.from(root.querySelectorAll(sel));

  // Stagger indexes for list-style reveals.
  $$('.mwf-time, .mwf-fields, .mwf-dots, .mwf-cost').forEach((box) => {
    $$('li, .mwf-dot, td i', box).forEach((el, i) => el.style.setProperty('--i', i));
  });

  // ------------------------------------------------------------- Reveal --
  const figs = $$('.mwf-fig');
  const inView = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.target.classList.toggle('is-in', e.isIntersecting || e.target.classList.contains('is-seen'))),
    { rootMargin: '0px 0px -12% 0px', threshold: 0.12 }
  );
  const seen = new IntersectionObserver(
    (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('is-seen', 'is-in'); }),
    { rootMargin: '0px 0px -12% 0px', threshold: 0.12 }
  );
  figs.forEach((f) => (f.classList.contains('mwf-hero') ? inView : seen).observe(f));
  // Safety net: never leave a figure hidden if the observer is throttled.
  setTimeout(() => figs.forEach((f) => {
    const r = f.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) f.classList.add('is-seen', 'is-in');
  }), 1200);

  // ------------------------------------------------ D. Pinned factory --
  const pin = article.querySelector('.mwf-pin');
  if (pin) {
    const steps = $$('.mwf-step', pin);
    const chain = $$('.mwf-chain li', pin);
    const parts = $$('.mwf-part', pin);
    let cur = -1;
    const show = (i) => {
      if (i === cur) return;
      cur = i;
      const s = steps[i];
      const on = (s.dataset.on || '').split(' ');
      steps.forEach((el, j) => el.classList.toggle('on', j === i));
      chain.forEach((li) => li.classList.toggle('on', on.includes(li.dataset.k)));
      parts.forEach((p) => p.classList.toggle('on', p.dataset.p === s.dataset.part));
    };
    let tick = false;
    const onScroll = () => {
      if (tick) return;
      tick = true;
      requestAnimationFrame(() => {
        const line = window.innerHeight * 0.62;
        let best = 0;
        steps.forEach((s, i) => { if (s.getBoundingClientRect().top <= line) best = i; });
        show(best);
        tick = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    show(0);
  }

  // -------------------------------------------- E. Decision record -----
  const rec = article.querySelector('.mwf-rec');
  if (rec) {
    const fields = $$('.mwf-fields li', rec);
    const readers = $$('.mwf-reader', rec);
    const pick = (b) => {
      const f = b.dataset.f.split(',');
      readers.forEach((r) => r.setAttribute('aria-pressed', String(r === b)));
      fields.forEach((li) => li.classList.toggle('on', f.includes(li.dataset.f)));
    };
    readers.forEach((b) => b.addEventListener('click', () => pick(b)));
    if (readers[0]) pick(readers[0]);
  }
  // ---------------------------------------------- F. Outcome meter -----
  const chart = article.querySelector('.mwf-chart');
  if (chart) {
    const btns = $$('[data-mode-btn]');
    const note = article.querySelector('[data-mwf="mode-status"]');
    const TEXT = {
      before: 'Before and after: the whole drop is booked to the AI, including the part every case got.',
      holdout: 'Against a holdout: the cases left on the old process fell too. Only the gap between the two lines counts as a saving.'
    };
    const set = (m) => {
      chart.dataset.mode = m;
      btns.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.modeBtn === m)));
      if (note) note.textContent = TEXT[m];
    };
    btns.forEach((b) => b.addEventListener('click', () => set(b.dataset.modeBtn)));
    set('before');
  }

  // ----------------------------------------------- G. Switch drill -----
  const drill = article.querySelector('[data-mwf="drill"]');
  if (drill) {
    const grid = article.querySelector('.mwf-grid');
    const cells = [];
    for (let i = 0; i < 40; i += 1) cells.push(grid.appendChild(document.createElement('i')));
    const a = article.querySelector('[data-model="a"]');
    const b = article.querySelector('[data-model="b"]');
    const bar = article.querySelector('.mwf-notice-bar i');
    const status = article.querySelector('[data-mwf="drill-status"]');
    const CHECK = [13, 29];
    const label = (el, state, text) => { el.dataset.state = state; el.querySelector('small').textContent = text; };
    let timers = [];
    let done = false;
    const reset = () => {
      timers.forEach(clearTimeout); timers = [];
      cells.forEach((c) => { c.className = ''; });
      bar.classList.remove('run');
      label(a, 'in-use', 'In use'); label(b, 'qualified', 'Qualified');
      status.textContent = 'Model A is in use. Model B has passed qualification and waits.';
      drill.textContent = 'Run the switch drill'; done = false;
    };
    const finish = () => {
      cells.forEach((c, i) => c.classList.add(CHECK.includes(i) ? 'chk' : 'ok'));
      label(a, 'retired', 'Retired'); label(b, 'in-use', 'In use');
      status.textContent = 'Illustration: 38 of 40 regression cases pass on model B and 2 go to a person. A real drill records this count and the time it took.';
      drill.textContent = 'Reset'; done = true;
    };
    drill.addEventListener('click', () => {
      if (done || timers.length) return reset();
      label(a, 'retiring', 'Retirement notice');
      status.textContent = 'Drill: a retirement notice arrives. The regression set, built from reviewed cases, reruns on model B.';
      bar.classList.add('run');
      if (still) return finish();
      cells.forEach((c, i) => timers.push(setTimeout(() => c.classList.add(CHECK.includes(i) ? 'chk' : 'ok'), 500 + i * 45)));
      timers.push(setTimeout(() => { timers = []; finish(); }, 500 + 40 * 45 + 300));
    });
    reset();
  }

  // -------------------------------------------------- J. Gate track ----
  const gates = $$('.mwf-gate');
  if (gates.length) {
    const fill = article.querySelector('.mwf-rail90 i');
    const status = article.querySelector('[data-mwf="gate-status"]');
    let tripped = -1;
    const paint = () => {
      gates.forEach((g, i) => {
        g.classList.toggle('tripped', i === tripped);
        g.classList.toggle('blocked', tripped > -1 && i > tripped);
        const btn = g.querySelector('.mwf-btn');
        btn.setAttribute('aria-pressed', String(i === tripped));
        btn.textContent = i === tripped ? 'Clear' : 'Trip this stop';
      });
      if (fill) {
        fill.style.setProperty('--to', tripped < 0 ? 1 : tripped / 2);
        fill.style.background = tripped < 0 ? '' : 'var(--mwf-bad, var(--ld-stamp))';
      }
      status.textContent = tripped < 0
        ? 'No stop condition has tripped. All three checkpoints are attempted.'
        : `Stopped at day ${[30, 60, 90][tripped]}. ${tripped < 2 ? 'Later checkpoints are not attempted.' : 'The workflow does not continue as built.'}`;
    };
    gates.forEach((g, i) => g.querySelector('.mwf-btn').addEventListener('click', () => { tripped = tripped === i ? -1 : i; paint(); }));
    paint();
  }

  // ------------------------------------------------------- Count-ups ----
  $$('[data-count]').forEach((el) => {
    const to = Number(el.dataset.count);
    const settle = () => { el.textContent = String(to); };
    if (still || !('IntersectionObserver' in window)) return settle();
    el.textContent = '0';
    let done = false;
    const io = new IntersectionObserver((entries) => {
      if (done || !entries.some((e) => e.isIntersecting)) return;
      done = true; io.disconnect();
      const t0 = performance.now();
      const dur = 900;
      const step = (now) => {
        const k = Math.min(1, (now - t0) / dur);
        el.textContent = String(Math.round(to * (1 - Math.pow(1 - k, 3))));
        if (k < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      setTimeout(settle, dur + 300);
    }, { threshold: 0.4 });
    io.observe(el);
    setTimeout(() => { if (!done) settle(); }, 4000);
  });

  // ------------------------------------------------------------ Tabs ----
  $$('.mwf-tablist').forEach((tablist) => {
    const tabs = $$('[role="tab"]', tablist);
    const panels = tabs.map((tab) => document.getElementById(tab.getAttribute('aria-controls')));
    const select = (i, focus) => {
      tabs.forEach((tab, j) => {
        tab.setAttribute('aria-selected', String(i === j));
        tab.tabIndex = i === j ? 0 : -1;
        panels[j].hidden = i !== j;
      });
      $$('.mwf-fig', panels[i]).forEach((f) => f.classList.add('is-seen', 'is-in'));
      if (focus) tabs[i].focus();
    };
    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => select(i));
      tab.addEventListener('keydown', (e) => {
        const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
        if (!d) return;
        e.preventDefault();
        select((i + d + tabs.length) % tabs.length, true);
      });
    });
    select(0);
  });

  // -------------------------------------------------- Reading progress --
  const bar = document.createElement('div');
  bar.className = 'mwf-progress'; bar.setAttribute('aria-hidden', 'true');
  const barFill = bar.appendChild(document.createElement('i'));
  document.body.appendChild(bar);
  let pTick = false;
  const progress = () => {
    if (pTick) return;
    pTick = true;
    requestAnimationFrame(() => {
      const r = article.getBoundingClientRect();
      const span = r.height - window.innerHeight;
      const k = span > 0 ? Math.min(1, Math.max(0, -r.top / span)) : 0;
      barFill.style.transform = `scaleX(${k})`;
      pTick = false;
    });
  };
  window.addEventListener('scroll', progress, { passive: true });
  window.addEventListener('resize', progress);
  progress();

  // ------------------------------------------------------ Calculator ----
  const calc = article.querySelector('.mwf-calc');
  if (calc) {
    const inp = (k) => Math.max(0, Number(calc.querySelector(`[data-calc="${k}"]`).value) || 0);
    const out = (k) => calc.querySelector(`[data-calc-out="${k}"]`);
    const fmt = (v) => (Math.round(v) || 0).toLocaleString('en-US');
    const put = (k, v) => { out(k).textContent = fmt(v); out(k).classList.toggle('neg', v < 0); };
    const run = () => {
      const base = inp('n') * inp('c');
      const naive = (base * inp('a')) / 100;
      const gap = (base * (inp('a') - inp('h'))) / 100;
      const net = gap - inp('r');
      put('naive', naive); put('gap', gap); put('net', net);
      out('pay').textContent = net > 0 ? (inp('u') / net).toFixed(1) : 'None';
      out('pay').classList.toggle('neg', net <= 0);
      out('note').textContent = gap <= 0
        ? 'The holdout fell as much as the AI group or more. At these inputs there is no saving to report.'
        : net <= 0
          ? 'The saving against the holdout does not cover the added running cost, so the one-off cost is not paid back.'
          : `Before and after would report ${fmt(naive - gap)} more per month than the holdout supports.`;
    };
    calc.addEventListener('input', run);
    run();
  }

  // ----------------------------------------------------------- Sizer ----
  const sizer = article.querySelector('.mwf-sizer');
  if (sizer) {
    const picks = $$('[data-size-base]', sizer);
    const val = (k) => Math.max(0, Number(sizer.querySelector(`[data-size="${k}"]`).value) || 0);
    const out = (k) => sizer.querySelector(`[data-size-out="${k}"]`);
    const money = (v) => (v >= 1000 ? `$${(v / 1000).toFixed(v >= 10000 ? 0 : 1)}B` : `$${v >= 100 ? Math.round(v) : v.toFixed(1)}M`);
    const run = () => {
      const base = val('base');
      const reach = (base * Math.min(100, val('reach'))) / 100;
      const win = (reach * Math.min(100, val('win'))) / 100;
      out('reach').textContent = money(reach);
      out('win').textContent = money(win);
      out('note').textContent = `${money(base)} a year, of which you can address ${Math.min(100, val('reach'))}% and win ${Math.min(100, val('win'))}%, comes to ${money(win)} a year.`;
    };
    picks.forEach((b) => b.addEventListener('click', () => {
      picks.forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
      sizer.querySelector('[data-size="base"]').value = b.dataset.sizeBase;
      out('basis').textContent = b.dataset.sizeNote || '';
      run();
    }));
    sizer.addEventListener('input', run);
    run();
  }
})();
