/* Decision replay console. One refund ticket, six steps, two modes. All figures are illustrative. */
(function () {
  const root = document.querySelector('.dcr');
  if (!root) return;
  root.classList.add('dcr-js');
  const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, p) => (p || root).querySelector(s);
  const $$ = (s, p) => [...(p || root).querySelectorAll(s)];
  let M = {};
  try { M = JSON.parse($('script[data-dcr="model"]').textContent); } catch (e) { return; }

  const DEF = { mode: 'df', fault: 'none', seat: 'buyer', vol: '100k', px: '1' };
  const ALLOWED = { mode: ['all', 'df'], fault: ['none', 'inject', 'low', 'high', 'conf'], seat: ['buyer', 'builder', 'strategy'], vol: ['10k', '100k', '1m'], px: ['1', '2'] };
  const get = (k) => { const v = root.getAttribute('data-' + k); return ALLOWED[k].includes(v) ? v : DEF[k]; };
  const VOL = { '10k': 10000, '100k': 100000, '1m': 1000000 };
  const FAULT_N = { none: 'No fault', inject: 'Injected text', low: 'Low confidence', high: 'Over limit', conf: 'Confident wrong' };
  const SEAT_N = { buyer: 'Buyer', builder: 'Builder', strategy: 'Strategy' };

  // s(engine, score or null, seconds, dollars, route, note, engine label override)
  const s = (e, c, t, d, r, n, en) => ({ e, c, t, d, r, n, en });
  function plan(mode, fault) {
    const amt = fault === 'high' ? 2400 : 42;
    if (mode === 'all') {
      const inj = fault === 'inject';
      const out = [
        s('front', null, 2.1, 0.012, 'route', 'Reads the full ticket'),
        s('front', null, 1.8, 0.010, 'route', fault === 'low' ? 'Guesses refund, no doubt shown' : fault === 'conf' ? 'Reads it as exchange' : 'Labels it a refund'),
        s('front', null, 2.6, 0.018, 'route', fault === 'high' ? 'Over $500, code gate set' : 'Reads policy as text'),
        s('screen', null, 38, 0.090, inj ? 'unflag' : 'route', inj ? 'Reads the hidden order note' : 'Drives the order screen'),
        s('front', null, 3.0, 0.020, inj ? 'unflag' : 'route', inj ? 'Follows the note, $900' : fault === 'low' ? 'Refunds a wanted exchange' : fault === 'conf' ? 'Approves the exchange' : 'Approves $' + amt.toLocaleString('en-US')),
        fault === 'high' ? s('human', null, 0, 1.5, 'stop', 'Person reviews, about 3 min') : s('screen', null, 41, 0.110, inj ? 'unflag' : 'route', inj ? 'Clicks $900 refund' : fault === 'conf' ? 'Clicks exchange on screen' : 'Clicks refund on screen')
      ];
      const res = { none: 'Correct, slow', inject: 'Wrong $900 sent', low: 'Wrong action sent', high: 'Held for a person', conf: 'Correct exchange, slow' }[fault];
      return { steps: out, out: res, ok: fault === 'none' || fault === 'high' || fault === 'conf', post: 0 };
    }
    const inj = fault === 'inject';
    const intent = fault === 'low'
      ? s('class', 0.91, 1.86, 0.0104, 'esc', 'Retry, then frontier', 'Classifier, Frontier')
      : fault === 'conf' ? s('class', 0.94, 0.03, 0.0002, 'route', 'Says refund, wrongly sure')
      : s('class', 0.96, 0.03, 0.0002, inj ? 'flag' : 'route', inj ? 'Refund, flag carried forward' : 'One label, refund');
    const out = [
      s('rules', null, 0.005, 0, inj ? 'flag' : 'route', inj ? 'Parses fields, flags odd text' : 'Parses fields'),
      intent,
      s('rules', null, 0.002, 0, inj ? 'flag' : 'route', inj ? "Note's $900 ignored" : fault === 'high' ? 'Over $500, needs a person' : 'Within limit'),
      s('api', null, 0.15, 0.0001, inj ? 'flag' : 'route', inj ? 'Typed fields, note is data' : 'Typed order record'),
      s('small', 0.93, 0.7, 0.002, 'route', inj ? 'Approves $42, note kept out of its context' : fault === 'low' ? 'Exchange, per frontier label' : 'Approves $' + amt.toLocaleString('en-US')),
      fault === 'high' ? s('human', null, 0, 1.5, 'stop', 'Person reviews, about 3 min') : s('api', null, 0.2, 0.0001, 'route', inj ? 'Refunds $42 by API' : fault === 'low' ? 'Exchange by API' : 'Refund API call, reversible')
    ];
    const res = { none: 'Correct $42 refund', inject: 'Correct $42, flagged', low: 'Correct exchange', high: 'Held for a person', conf: 'Wrong refund sent' }[fault];
    return { steps: out, out: res, ok: fault !== 'conf', post: inj ? 1 : 0 };
  }
  const tot = (p) => p.steps.reduce((a, x) => ({ d: a.d + x.d, t: a.t + x.t }), { d: 0, t: 0 });
  const BUILD = 60000; // illustrative one-off build cost
  const money = (d) => d >= 1000 ? '$' + Math.round(d).toLocaleString('en-US') : d >= 1 ? '$' + d.toFixed(2) : d >= 0.01 ? '$' + d.toFixed(3) : '$' + d.toFixed(4);
  const secs = (t) => t >= 10 ? Math.round(t) + ' s' : t >= 1 ? t.toFixed(1) + ' s' : Math.round(t * 1000) + ' ms';
  const ROUTE_N = { route: 'Route', esc: 'Escalate', stop: 'Stop', flag: 'Flagged', unflag: 'Unflagged' };
  const MODE_N = { all: 'All frontier', df: 'Decision first' };

  // build step cards
  const list = $('.dcr-steps');
  M.steps.forEach((st, i) => {
    const li = document.createElement('li');
    li.className = 'dcr-step'; li.dataset.i = i;
    li.innerHTML = '<span class="dcr-n dcr-mono">' + (i + 1) + '</span><svg class="dcr-ic" width="64" height="64" aria-hidden="true" focusable="false"><use href="#dcr-g-rules"/></svg>' +
      '<h3>' + st.n + '</h3><p class="dcr-eng"></p><dl class="dcr-met"><div class="dcr-conf"><dt>Illustrative score</dt><dd class="dcr-mono" data-m="c">-</dd></div><div><dt>Time</dt><dd class="dcr-mono" data-m="t">-</dd></div><div><dt>Cost</dt><dd class="dcr-mono" data-m="d">-</dd></div></dl>' +
      '<p class="dcr-note"></p><span class="dcr-b" data-r="route">Pending</span>';
    list.appendChild(li);
  });

  let timers = [];
  const clear = () => { timers.forEach(clearTimeout); timers = []; };
  const say = (t) => { $('.dcr-say').textContent = t; };

  function paintStatic() {
    const mode = get('mode'), fault = get('fault'), p = plan(mode, fault);
    $$('.dcr-opt').forEach((b) => b.setAttribute('aria-pressed', String(get(b.dataset.set) === b.dataset.v)));
    root.dataset.fault = fault;
    $('[data-o="amt"]').textContent = fault === 'inject' ? '$42, note says $900' : '$' + (fault === 'high' ? 2400 : 42).toLocaleString('en-US');
    $$('.dcr-step').forEach((li, i) => {
      const x = p.steps[i], e = M.engines[x.e];
      li.querySelector('use').setAttribute('href', '#dcr-g-' + e.g);
      li.querySelector('.dcr-eng').textContent = x.en || e.n;
    });
    memo();
  }
  function resetRun(announce) {
    clear(); root.removeAttribute('data-run'); root.dataset.state = 'ready';
    $$('.dcr-step').forEach((li) => {
      li.removeAttribute('data-done'); li.removeAttribute('data-r'); li.querySelector('.dcr-conf').hidden = false;
      $$('dd', li).forEach((d) => { d.textContent = '-'; });
      li.querySelector('.dcr-note').textContent = '';
      const b = li.querySelector('.dcr-b'); b.dataset.r = 'route'; b.textContent = 'Pending';
    });
    $('[data-t="cost"]').textContent = '$0'; $('[data-t="lat"]').textContent = '0 s'; $('[data-t="esc"]').textContent = '0';
    $('[data-t="costvs"]').textContent = 'Run to compare'; $('[data-t="latvs"]').textContent = 'Run to compare';
    $('[data-t="gate"]').textContent = 'No human gate'; $('[data-t="out"]').textContent = 'Not run';
    $('.dcr-stat-t').textContent = 'Ready';
    $('.dcr-banner').hidden = true; $('.dcr-post').hidden = true;
    $('.dcr-run').textContent = 'Run refund';
    if (announce) say('Reset. Ready to run.');
  }
  function fillStep(i, p) {
    const li = $$('.dcr-step')[i], x = p.steps[i];
    li.dataset.done = '1'; li.dataset.r = x.r;
    li.querySelector('[data-m="c"]').textContent = x.c == null ? 'n/a' : Math.round(x.c * 100) + '%';
    li.querySelector('.dcr-conf').hidden = x.c == null;
    li.querySelector('[data-m="t"]').textContent = x.e === 'human' ? 'Waits' : secs(x.t);
    li.querySelector('[data-m="d"]').textContent = money(x.d);
    li.querySelector('.dcr-note').textContent = x.n;
    const b = li.querySelector('.dcr-b'); b.dataset.r = x.r; b.textContent = ROUTE_N[x.r];
    const done = p.steps.slice(0, i + 1);
    const d = done.reduce((a, y) => a + y.d, 0), t = done.reduce((a, y) => a + y.t, 0);
    $('[data-t="cost"]').textContent = money(d);
    $('[data-t="lat"]').textContent = secs(t);
    $('[data-t="esc"]').textContent = String(done.filter((y) => y.r === 'esc').length);
    if (done.some((y) => y.r === 'stop')) $('[data-t="gate"]').textContent = 'One human gate';
    say('Step ' + (i + 1) + ', ' + M.steps[i].n + '. ' + (x.en || M.engines[x.e].n) + '. ' + ROUTE_N[x.r] + '. ' + x.n + '.');
  }
  function finish(p) {
    const mode = get('mode'), other = plan(mode === 'all' ? 'df' : 'all', get('fault'));
    const a = tot(p), b = tot(other);
    const on = MODE_N[mode === 'all' ? 'df' : 'all'];
    const r = a.d / Math.max(b.d, 0.0001);
    $('[data-t="costvs"]').textContent = r >= 1 ? Math.round(r) + 'x ' + on : '1/' + Math.round(1 / r) + ' of ' + on;
    const q = a.t / Math.max(b.t, 0.001);
    $('[data-t="latvs"]').textContent = q >= 1 ? Math.round(q) + 'x slower than ' + on : Math.round(1 / q) + 'x faster than ' + on;
    $('[data-t="out"]').textContent = p.out;
    if (p.post) { $('.dcr-post').hidden = false; $('[data-t="esc"]').textContent = String(p.steps.filter((y) => y.r === 'esc').length + p.post); }
    const bn = $('.dcr-banner'); bn.hidden = false; bn.dataset.ok = p.ok ? '1' : '0';
    $('.dcr-banner-t').textContent = (p.ok ? 'Right outcome. ' : 'Wrong outcome. ') + p.out + ', ' + MODE_N[mode] + '.';
    root.dataset.state = p.ok ? 'ok' : 'bad';
    $('.dcr-stat-t').textContent = p.ok ? 'Done' : 'Done, wrong';
    $('.dcr-run').textContent = 'Run again';
    timers.push(setTimeout(() => say('Run done. ' + p.out + '. Cost ' + money(a.d) + ', time ' + secs(a.t) + '.'), 30));
  }
  function run(instant) {
    resetRun(false);
    const p = plan(get('mode'), get('fault'));
    root.setAttribute('data-run', '1'); root.dataset.state = 'run';
    $('.dcr-stat-t').textContent = 'Running';
    writeHash();
    if (instant || still) { p.steps.forEach((_, i) => fillStep(i, p)); finish(p); return; }
    p.steps.forEach((_, i) => timers.push(setTimeout(() => { fillStep(i, p); if (i === p.steps.length - 1) finish(p); }, 380 * (i + 1))));
  }

  function memo() {
    const seat = get('seat'), fault = get('fault'), vol = VOL[get('vol')];
    const px = Number(get('px'));
    const a = tot(plan('all', fault)), b = tot(plan('df', fault));
    const save = (a.d - b.d) * px * vol;
    const mo = BUILD / Math.max(save, 0.01);
    $('[data-o="pay"]').textContent = save <= 0 ? 'does not pay back' : mo < 1 ? 'pays back in under a month' : 'pays back in about ' + Math.ceil(mo) + (Math.ceil(mo) === 1 ? ' month' : ' months');
    $('[data-o="seat"]').textContent = SEAT_N[seat];
    $('[data-o="fault"]').textContent = FAULT_N[fault];
    $('[data-o="vol"]').textContent = vol.toLocaleString('en-US');
    $('[data-o="mall"]').textContent = money(a.d * px * vol);
    $('[data-o="mdf"]').textContent = money(b.d * px * vol);
    const FIND = {
      buyer: 'Most of the bill sits in two screen steps. Pay for an API before you pay for a smarter model.',
      builder: 'Put code in the control path. Models answer bounded questions and say when they are unsure.',
      strategy: 'The cost gap is wide, but the risk gap decides. Gates on money matter more than model choice.'
    };
    const ACTS = {
      buyer: ['Ask vendors for cost per resolved ticket', 'Require a human gate on refunds over a limit', 'Ask for escalation rate, not only accuracy'],
      builder: ['Call the order API, keep screens as fallback', 'Add abstention to the intent classifier', 'Make the refund call idempotent in any mode'],
      strategy: ['Treat frontier calls as the exception path', 'Track escalations as a margin metric', 'Plan for screen text as an attack path']
    };
    $('[data-o="find"]').textContent = FIND[seat];
    const ol = $('[data-o="acts"]'); ol.innerHTML = '';
    ACTS[seat].forEach((t, i) => { const li = document.createElement('li'); li.innerHTML = '<b>' + (i + 1) + '</b><span></span>'; li.querySelector('span').textContent = t; ol.appendChild(li); });
  }

  function writeHash() {
    const parts = ['reader=' + get('seat'), 'mode=' + get('mode'), 'fault=' + get('fault'), 'vol=' + get('vol'), 'px=' + get('px')];
    if (root.getAttribute('data-run') === '1') parts.push('run=1');
    try { history.replaceState(null, '', '#' + parts.join('&')); } catch (e) {}
  }

  root.addEventListener('click', (e) => {
    const opt = e.target.closest('.dcr-opt');
    if (opt) {
      root.setAttribute('data-' + opt.dataset.set, opt.dataset.v);
      const runSet = opt.dataset.set === 'mode' || opt.dataset.set === 'fault';
      if (runSet) resetRun(false);
      paintStatic(); writeHash();
      say(opt.textContent + ' selected.');
      return;
    }
    if (e.target.closest('.dcr-run')) { run(false); return; }
    if (e.target.closest('.dcr-reset')) { resetRun(true); writeHash(); return; }
    const act = e.target.closest('[data-do]');
    if (act && act.dataset.do === 'print') { window.print(); return; }
    if (act && act.dataset.do === 'copy') {
      writeHash();
      const done = () => { $('.dcr-m-say').textContent = 'Link copied.'; act.textContent = 'Copied'; setTimeout(() => { act.textContent = 'Copy link'; }, 1600); };
      if (navigator.clipboard) navigator.clipboard.writeText(location.href).then(done, () => { $('.dcr-m-say').textContent = 'Copy failed. Use the address bar.'; });
    }
  });
  document.addEventListener('keydown', (e) => {
    if ((e.key === 'r' || e.key === 'R') && !e.metaKey && !e.ctrlKey && !e.altKey && !/INPUT|TEXTAREA|SELECT/.test((e.target.tagName || ''))) { resetRun(true); writeHash(); }
  });

  // the page seat gate owns the seat, see ddc.js
  document.addEventListener('ddc:reader', (e) => { root.setAttribute('data-seat', e.detail); memo(); });
  paintStatic();
  if (root.getAttribute('data-run') === '1') run(true); else resetRun(false);
})();
