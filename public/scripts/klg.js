/* Knowledge layer deep dive: seat gate, rail, hook, layers, sorter, replay, cost, chooser. */
(function () {
  // ------------------------------------------------------------------ NUMBERS
  // Every figure shown on the page lives here. Swap values to update the page.
  // Source ledger: docs/Knowledge_Layer_Technical_Design.md sections 15, 19, 20.
  const N = {
    poisonTexts: 5,        // planted texts per target question (Verified 2026)
    poisonRate: 90,        // about 90% answers steered (Verified 2026)
    singleRag: 64.8,       // single hop F1, RAG (Verified 2026)
    singleGraph: 63.0,     // single hop F1, GraphRAG local (Verified 2026)
    multiGraph: 70.3,      // multi-hop, graph retrieval (Verified 2026)
    multiRag: 67.0,        // multi-hop, RAG (Verified 2026)
    injBefore: 40.6,       // injection success before layered defence (Illustrative, one study)
    injAfter: 0.2,         // after full stack (Illustrative, one study)
    buildGraph: 5560,      // graph index build seconds (Verified 2026)
    buildRag: 135,         // vector index build seconds (Verified 2026)
    nolimaShort: 99.3,     // NoLiMa short context recall (Verified 2026)
    nolimaLong: 69.7,      // NoLiMa at 32K (Verified 2026)
    nolimaCtx: '32K',
    pilotDays: 60,         // pilot length (proposed)
    goldenSet: 200,        // golden set size (proposed)
    // cost model, Illustrative, section 15
    corpusM: 200,          // default corpus, million tokens
    qpmK: 100,             // default questions a month, thousands
    embedPerM: 0.02,       // $ per million tokens to embed
    llmPerM: 3,            // $ per million input tokens
    extractPasses: 2,      // LLM extraction passes for GraphRAG
    tokPerQ: 4000,         // retrieved tokens per question
    tokCompiled: 1000,     // tokens read from a compiled pack or graph answer (Illustrative assumption)
    // layers screen, Illustrative
    churnTrue: 4.1,        // churn with the measure in the data model (Illustrative)
    churnPrompt: 6.3,      // churn when the definition lives only in a prompt (Illustrative)
    // phase strip, Illustrative levels 1 low, 2 medium, 3 high. Order: build, each question, keeping fresh
    phase: { rag: [1, 2, 1], grag: [3, 2, 3], sem: [3, 1, 1], okf: [2, 1, 2], code: [1, 1, 1] },
  };
  // ---------------------------------------------------------------- /NUMBERS

  const root = document.querySelector('.klg');
  if (!root) return;
  root.classList.add('klg-js');
  const $ = (s, c) => (c || root).querySelector(s);
  const $$ = (s, c) => [...(c || root).querySelectorAll(s)];
  const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fmt = (v) => (typeof v === 'number' ? (Number.isInteger(v) ? v.toLocaleString('en-US') : v.toFixed(1)) : v);
  $$('[data-n]').forEach((el) => { const k = el.dataset.n; if (k in N && typeof N[k] !== 'object') el.textContent = k === 'injAfter' ? String(N[k]) : fmt(N[k]); });

  // seat gate
  const READERS = ['buyer', 'builder', 'strategy'];
  const store = { get() { try { return localStorage.getItem('klg-reader'); } catch (e) { return null; } }, set(v) { try { localStorage.setItem('klg-reader', v); } catch (e) { /* unavailable */ } } };
  const fromHash = () => { const m = /reader=([a-z]+)/.exec(location.hash); return m && READERS.includes(m[1]) ? m[1] : null; };
  let reader = '';
  const setReader = (v, opts) => {
    if (!READERS.includes(v)) return;
    const first = !reader;
    reader = v; root.dataset.reader = v;
    $$('[data-reader-btn]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.readerBtn === v)));
    if (!(opts && opts.silent)) { store.set(v); try { history.replaceState(null, '', '#reader=' + v); } catch (e) { /* ignore */ } }
    if (first && opts && opts.scroll) { const s = $('.klg-scene:not(.klg-gate)'); if (s) requestAnimationFrame(() => s.scrollIntoView({ behavior: still ? 'auto' : 'smooth', block: 'start' })); }
    scan();
  };
  $$('[data-reader-btn]').forEach((b) => b.addEventListener('click', () => setReader(b.dataset.readerBtn, { scroll: true })));
  window.addEventListener('hashchange', () => { const h = fromHash(); if (h) { store.set(h); setReader(h, { silent: true }); } });
  root.addEventListener('click', (e) => {
    const a = e.target.closest ? e.target.closest('a[href^="#klg-"]') : null; if (!a) return;
    const t = document.getElementById(a.getAttribute('href').slice(1)); if (!t) return;
    e.preventDefault(); t.scrollIntoView({ behavior: still ? 'auto' : 'smooth', block: 'start' });
  });

  // reveal and rail
  const scenes = $$('.klg-scene');
  const links = $$('.klg-rail a');
  const once = new WeakSet();
  const enter = (s) => { s.classList.add('is-in'); if (once.has(s)) return; once.add(s); if (s.id === 'klg-hook') drop(); };
  function scan() { scenes.forEach((s) => { const r = s.getBoundingClientRect(); if (r.width && r.top < innerHeight && r.bottom > 0) enter(s); }); }
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) enter(e.target); }), { threshold: 0 });
    scenes.forEach((s) => io.observe(s));
    const io2 = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) links.forEach((a) => a.classList.toggle('is-on', a.getAttribute('href') === '#' + e.target.id)); }), { rootMargin: '-45% 0px -45% 0px' });
    scenes.forEach((s) => io2.observe(s));
  } else scenes.forEach(enter);

  // 1 hook: a pile of passages, five planted ones drop in, the meter fills
  const pile = $('[data-pile]');
  const DOTS = 96, planted = [13, 31, 50, 66, 83].slice(0, N.poisonTexts);
  if (pile) for (let i = 0; i < DOTS; i++) { const d = document.createElement('i'); if (planted.includes(i)) { d.className = 'is-p'; d.style.setProperty('--d', planted.indexOf(i)); } pile.appendChild(d); }
  const rateEl = $('#klg-hook [data-to]'), hookCon = $('#klg-hook .klg-con');
  let raf = 0;
  function drop() {
    if (!hookCon || !rateEl) return;
    cancelAnimationFrame(raf);
    hookCon.classList.remove('is-drop'); void hookCon.offsetWidth; hookCon.classList.add('is-drop');
    if (still) { rateEl.textContent = N.poisonRate; return; }
    const t0 = performance.now(), dur = 1400;
    const tick = (t) => { const k = Math.min(1, (t - t0) / dur); rateEl.textContent = Math.round(N.poisonRate * k); if (k < 1) raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
  }
  const dropBtn = $('[data-do="drop"]'); if (dropBtn) dropBtn.addEventListener('click', drop);

  // 2 layers: one question, three layers. Clean or mixed. Illustrative.
  const lq = $('.klg-lq');
  const LQ = {
    clean: { h: 'What each layer adds', sr: { shape: 'Data model adds the table shape and the churn measure.', meaning: 'Ontology says what enterprise and EU mean.', facts: 'Graph links each account to its parent.' } },
    mix: { h: 'When a layer is skipped', sr: { shape: 'Measure kept in a prompt gives two churn numbers.', meaning: 'A schema field stands in for meaning.', facts: 'Without the graph one parent counts three times.' } }
  };
  const seen = new Set(['shape']);
  const drawLq = () => {
    const m = lq.dataset.mode, l = lq.dataset.layer;
    $$('[data-p]', lq).forEach((p) => { p.hidden = p.dataset.p !== l + '-' + m; });
    $$('[data-lq]', lq).forEach((b) => { b.setAttribute('aria-pressed', String(b.dataset.lq === l)); b.classList.toggle('is-lit', seen.has(b.dataset.lq)); });
    $$('[data-lqm]', lq).forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lqm === m)));
    $('[data-o="lq-h"]', lq).textContent = LQ[m].h;
    const ans = m === 'mix' ? fmt(N.churnTrue) + '% or ' + fmt(N.churnPrompt) + '%' : fmt(N.churnTrue) + '%';
    $('[data-o="lq-ans"]', lq).textContent = ans;
    lq.dataset.state = m === 'mix' ? 'bad' : (seen.size === 3 ? 'ok' : '');
    $('[data-o="lq-sr"]', lq).textContent = LQ[m].sr[l];
  };
  const SV = { rag: 'Vector RAG serves long text. It feeds none of the three layers on its own.', okf: 'OKF pack holds owned definitions. It feeds the ontology.', code: 'Code graph holds call links in code. It is a graph for software.', cat: 'Catalog holds IDs, grants and freshness. It feeds the data model.' };
  if (lq) {
    $$('[data-lq]', lq).forEach((b) => b.addEventListener('click', () => { lq.dataset.layer = b.dataset.lq; seen.add(b.dataset.lq); drawLq(); }));
    $$('[data-lqm]', lq).forEach((b) => b.addEventListener('click', () => { lq.dataset.mode = b.dataset.lqm; drawLq(); }));
    $$('[data-sv]', lq).forEach((b) => b.addEventListener('click', () => {
      $$('[data-sv]', lq).forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
      $('[data-o="sv"]', lq).textContent = SV[b.dataset.sv];
    }));
    (location.hash.slice(1) || '').split('&').forEach((h) => { const m = /^(lq|lqm)=([a-z]+)$/.exec(h); if (!m) return; if (m[1] === 'lq' && LQ.clean.sr[m[2]]) { lq.dataset.layer = m[2]; seen.add(m[2]); } if (m[1] === 'lqm' && LQ[m[2]]) lq.dataset.mode = m[2]; });
    drawLq();
  }

  // 3 sorter
  const ICO = { sem: 'klg-g-num', code: 'klg-g-code', okf: 'klg-g-okf', graph: 'klg-g-facts', grag: 'klg-g-cluster', rag: 'klg-g-rag' };
  const STORE = { sem: 'Semantic layer', graph: 'Graph', okf: 'OKF pack', rag: 'Vector RAG', code: 'Code graph', grag: 'GraphRAG' };
  const QS = [
    ['What was Q3 revenue in the EU?', 'sem', 'Numbers come from governed metrics.'],
    ['Which suppliers share a parent with Acme?', 'graph', 'Relations across entities need a graph.'],
    ['What does active customer mean here?', 'okf', 'A settled definition with an owner.'],
    ['What does the refund policy say about gifts?', 'rag', 'Long text, fetched as passages.'],
    ['Which services call the billing API?', 'code', 'Call edges come from parsed code.'],
    ['What themes run through all exit interviews?', 'grag', 'Whole corpus themes, one access group.'],
    ['How many tickets closed last week?', 'sem', 'A count is a metric, not a passage.'],
    ['Who approved the contract behind this project?', 'graph', 'Two hops: contract, then approver.'],
    ['What is our official churn definition?', 'okf', 'One owned file beats ten slides.'],
    ['Where is payment retry logic set?', 'code', 'Symbols and files, checked against HEAD.']
  ];
  let qi = 0, score = 0, answered = false;
  const showQ = () => {
    answered = false;
    $('[data-o="qi"]').textContent = String(qi + 1);
    $('[data-o="qtext"]').textContent = QS[qi][0];
    $('[data-o="fb"]').textContent = 'Pick the store built for it.';
    $$('.klg-store').forEach((b) => { b.removeAttribute('data-r'); b.setAttribute('aria-pressed', 'false'); });
  };
  $$('.klg-store').forEach((b) => b.addEventListener('click', () => {
    if (answered) return; answered = true;
    const q = QS[qi], ok = b.dataset.s === q[1];
    if (ok) score++;
    b.setAttribute('aria-pressed', 'true'); b.dataset.r = ok ? 'ok' : 'no';
    if (!ok) $('.klg-store[data-s="' + q[1] + '"]').dataset.r = 'ok';
    $('[data-o="fb"]').textContent = (ok ? 'Right. ' : STORE[q[1]] + '. ') + q[2];
    $('[data-o="score"]').textContent = score + ' of ' + QS.length;
    if (qi === QS.length - 1) { $('[data-o="fb"]').textContent += ' Done, ' + score + ' of ' + QS.length + '. Next starts again.'; }
  }));
  const nextBtn = $('[data-do="next"]');
  if (nextBtn) nextBtn.addEventListener('click', () => { qi = (qi + 1) % QS.length; if (qi === 0) { score = 0; $('[data-o="score"]').textContent = '0 of ' + QS.length; } showQ(); });

  // 4 replay console. Badges: route Pass, esc Flag, stop Block, unflag Leak. All illustrative.
  const rp = $('.klg-rp');
  const CHECKS = ['Fetch', 'Access', 'Freshness', 'Citation'];
  const LANES = ['rag', 'okf', 'graph'];
  const OK = { rag: 'Text says 4.1%', okf: 'Churn is lost ARR over start ARR', graph: '212 EU enterprise accounts' };
  const plan = (fault, chk) => {
    const s = (r, n) => ({ r, n });
    const P = { rag: CHECKS.map(() => s('route', 'Holds')), okf: CHECKS.map(() => s('route', 'Holds')), graph: CHECKS.map(() => s('route', 'Holds')) };
    const res = { rag: OK.rag, okf: OK.okf, graph: OK.graph };
    let out = '4.1%, cited three ways', vs = 'Correct', ok = true, cite = 3, leak = 0, asof = 'Today';
    const inStore = chk === 'store';
    if (fault === 'poison') {
      P.rag[0] = inStore ? s('stop', 'Held before ranking') : s('esc', 'Planted slide ranks');
      if (inStore) { P.rag[3] = s('stop', 'One new source, quarantined'); res.rag = 'Abstains'; cite = 2; out = '4.1%, from two stores'; vs = 'Planted slide held'; }
      else { P.rag[3] = s('unflag', 'Cites the planted slide'); res.rag = 'Text says 0.4%'; out = '0.4%, wrong'; vs = 'Steered by one slide'; ok = false; }
    } else if (fault === 'stale') {
      if (inStore) { P.graph[2] = s('esc', 'Built in June'); res.graph = '188 accounts, as of June'; asof = 'June'; out = '4.1%, graph stamped'; vs = 'Stale part is labelled'; }
      else { P.graph[2] = s('unflag', 'No freshness check'); res.graph = '188 accounts, no stamp'; out = 'Wrong segment size'; vs = 'Old facts read as new'; ok = false; asof = 'None'; }
    } else if (fault === 'leak') {
      if (inStore) { P.rag[1] = s('stop', 'US deck filtered'); res.rag = 'Text says 4.1%'; out = '4.1%, cited three ways'; vs = 'Filtered before ranking'; }
      else { P.rag[1] = s('unflag', 'Service account read'); res.rag = 'Quotes the US deck'; out = 'US board data shown'; vs = 'An EU analyst saw US data'; ok = false; leak = 1; }
    }
    if (!inStore && fault === 'none') vs = 'Correct, by luck';
    const lesson = LESSON[fault + '_' + (inStore ? 'store' : 'prompt')];
    return { P, res, out, vs, ok, cite, leak, asof, lesson };
  };
  const LESSON = {"none_store": "No fault. Checks ran in the store, so each citation is backed.", "none_prompt": "Right this time, but nothing checked the sources. Citations are names, not proof.", "poison_store": "The planted slide was held before ranking. Two clean sources carry the answer.", "poison_prompt": "Three citations, and one of them is the planted slide. A citation shows where text came from, not that it is true.", "stale_store": "The June graph is stamped, so the reader knows which part is old.", "stale_prompt": "Cited, but nothing said the graph was from June.", "leak_store": "The US deck was filtered by the reader’s own access before ranking.", "leak_prompt": "The citation even names the US deck. Access was checked too late."};
  const draw = () => {
    LANES.forEach((l) => {
      const ol = $('[data-lane="' + l + '"] .klg-steps'); ol.innerHTML = '';
      CHECKS.forEach((c, i) => { const li = document.createElement('li'); li.className = 'klg-step'; li.dataset.i = i; li.innerHTML = '<b></b><span class="dcr-b" data-r="route">Wait</span><em></em>'; li.querySelector('b').textContent = c; ol.appendChild(li); });
      $('[data-o="res-' + l + '"]').textContent = 'Not run';
    });
  };
  let timers = [];
  const setState = (st, t) => { rp.dataset.state = st; $('.klg-stat-t', rp).textContent = t; };
  const reset = () => {
    timers.forEach(clearTimeout); timers = []; draw(); setState('', 'Ready');
    $('[data-t="out"]').textContent = 'Not run'; $('[data-t="outvs"]').textContent = 'Run to see';
    $('[data-t="cite"]').textContent = '0 of 3'; $('[data-t="citevs"]').textContent = 'Named, not proof'; $('[data-t="leak"]').textContent = '0'; $('[data-t="asof"]').textContent = 'None';
    $('[data-t="lesson"]').textContent = 'The four tiles are the evidence packet. Add a fault and run.'; $('.klg-cite', rp).classList.remove('is-bad');
  };
  const run = () => {
    reset(); setState('run', 'Running');
    const p = plan(rp.dataset.fault, rp.dataset.chk);
    const fill = (i) => LANES.forEach((l) => { const li = $$('[data-lane="' + l + '"] .klg-step')[i], x = p.P[l][i]; li.dataset.done = ''; li.dataset.r = x.r; const b = li.querySelector('.dcr-b'); b.dataset.r = x.r; b.textContent = { route: 'Pass', esc: 'Flag', stop: 'Block', unflag: 'Leak' }[x.r]; li.querySelector('em').textContent = x.n; });
    const finish = () => {
      LANES.forEach((l) => { $('[data-o="res-' + l + '"]').textContent = p.res[l]; });
      $('[data-t="out"]').textContent = p.out; $('[data-t="outvs"]').textContent = p.vs;
      $('[data-t="cite"]').textContent = p.cite + ' of 3'; $('[data-t="citevs"]').textContent = p.ok ? 'Named, not proof' : 'Cited, still wrong'; $('[data-t="leak"]').textContent = String(p.leak); $('[data-t="asof"]').textContent = p.asof;
      setState(p.ok ? 'ok' : 'bad', p.ok ? 'Answered' : 'Failed');
      $('[data-t="lesson"]').textContent = p.lesson; $('.klg-cite', rp).classList.toggle('is-bad', !p.ok);
      $('.klg-sayr', rp).textContent = 'Answer: ' + p.out + '. ' + p.vs + '.';
    };
    if (still) { CHECKS.forEach((_, i) => fill(i)); finish(); return; }
    CHECKS.forEach((_, i) => timers.push(setTimeout(() => { fill(i); if (i === CHECKS.length - 1) finish(); }, 420 * (i + 1))));
  };
  if (rp) {
    (location.hash.slice(1) || '').split('&').forEach((h) => { const m = /^(fault|chk)=([a-z]+)$/.exec(h); if (m) rp.dataset[m[1]] = m[2]; });
    $$('[data-set]', rp).forEach((b) => { b.setAttribute('aria-pressed', String(rp.dataset[b.dataset.set] === b.dataset.v)); b.addEventListener('click', () => {
      rp.dataset[b.dataset.set] = b.dataset.v;
      $$('[data-set="' + b.dataset.set + '"]', rp).forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
      reset();
    }); });
    $('[data-do="run"]', rp).addEventListener('click', run);
    $('[data-do="reset"]', rp).addEventListener('click', reset);
    draw();
  }

  // 5 cost: build time hero, phase strip, people row, dollar estimate, break even. Illustrative except build time.
  const money = (v) => '$' + (v >= 100 ? Math.round(v).toLocaleString('en-US') : v.toFixed(v < 10 ? 1 : 0));
  const btRag = $('[data-o="bt-rag"]'); if (btRag) btRag.style.setProperty('--w', Math.max(1.5, (N.buildRag / N.buildGraph) * 100) + '%');
  const phg = $('.klg-ph-g');
  if (phg) {
    const LV = ['', 'Low', 'Medium', 'High'], PH = ['Build', 'Each question', 'Fresh'];
    ['rag', 'grag', 'sem', 'okf', 'code'].forEach((k) => {
      const r = document.createElement('div'); r.className = 'klg-ph-r'; r.setAttribute('role', 'row');
      r.innerHTML = '<span class="klg-cn" role="rowheader"><svg class="klg-ico klg-i44" width="44" height="44" aria-hidden="true" focusable="false"><use href="#' + ICO[k] + '"/></svg><b></b></span>';
      r.querySelector('b').textContent = STORE[k];
      N.phase[k].forEach((v, j) => { const c = document.createElement('span'); c.className = 'klg-lv'; c.setAttribute('role', 'cell'); c.dataset.v = v; c.dataset.l = PH[j]; c.innerHTML = '<i></i><i></i><i></i><em></em>'; c.querySelector('em').textContent = LV[v]; r.appendChild(c); });
      phg.appendChild(r);
    });
  }
  const cin = $('[data-in="corpus"]'), qin = $('[data-in="qpm"]');
  const cost = () => {
    const c = Number(cin.value), q = Number(qin.value) * 1000;
    const ixRag = c * N.embedPerM, ixG = c * N.llmPerM * N.extractPasses, qRag = (q * N.tokPerQ / 1e6) * N.llmPerM;
    const save = ((N.tokPerQ - N.tokCompiled) / 1e6) * N.llmPerM, beQ = ixG / save, beM = beQ / q;
    $('[data-o="corpus"]').textContent = c.toLocaleString('en-US') + 'M';
    $('[data-o="qpm"]').textContent = (q >= 1e6 ? (q / 1e6) + 'M' : (q / 1000) + 'k');
    $('[data-o="ix-rag"]').textContent = money(ixRag); $('[data-o="ix-grag"]').textContent = money(ixG); $('[data-o="q-rag"]').textContent = money(qRag);
    $('[data-o="be-q"]').textContent = beQ >= 1e6 ? (beQ / 1e6).toFixed(1) + 'M' : Math.round(beQ / 1000) + 'k';
    $('[data-o="be-m"]').textContent = beM < 10 ? beM.toFixed(1) : String(Math.round(beM));
    [cin, qin].forEach((i) => i.style.setProperty('--fill', ((i.value - i.min) / (i.max - i.min)) * 100 + '%'));
  };
  if (cin && qin) { cin.value = N.corpusM; qin.value = N.qpmK; cin.addEventListener('input', cost); qin.addEventListener('input', cost); cost(); }

  // 6 chooser, after decision tree 8.8
  const ans = { num: 'yes', code: 'no', def: 'yes', rel: 'no', theme: 'no' };
  const choose = () => {
    const set = [];
    if (ans.num === 'yes') set.push('sem');
    if (ans.code === 'yes') set.push('code');
    if (ans.def === 'yes') set.push('okf');
    if (ans.rel === 'yes') set.push('graph');
    if (ans.theme === 'yes') set.push('grag');
    set.push('rag');
    const ul = $('[data-o="set"]'); ul.innerHTML = '';
    set.forEach((k) => { const li = document.createElement('li'); li.innerHTML = '<svg class="klg-ico klg-i44" width="44" height="44" aria-hidden="true" focusable="false"><use href="#' + ICO[k] + '"/></svg><b></b>'; li.querySelector('b').textContent = STORE[k]; ul.appendChild(li); });
    $('[data-o="setwhy"]').textContent = set.length > 3 ? 'Phase them in. Add each one only when its slice fails.' : 'Add a store only when its test questions fail.';
  };
  $$('[data-q]').forEach((b) => b.addEventListener('click', () => {
    ans[b.dataset.q] = b.dataset.a;
    $$('[data-q="' + b.dataset.q + '"]').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
    choose();
  }));

  const init = fromHash() || store.get();
  if (init) setReader(init, { silent: true });
  setTimeout(scan, 600);
})();
