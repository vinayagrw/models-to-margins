/* Agentic commerce protocols page. Shared core. Owned by the lead. Builders never edit this file.
   Exposes window.ACX: data, reader, hash state, icons, scene registry. */
(function () {
  'use strict';
  var root = document.getElementById('acx');
  if (!root) return;
  var raw = document.getElementById('acx-data');
  var D = {};
  try { D = JSON.parse(raw ? raw.textContent : '{}'); } catch (e) { D = {}; }
  var READERS = ['leader', 'architect'];
  var still = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  var subs = {};
  var readerSubs = [];

  function parseHash() {
    var out = {};
    (location.hash || '').replace(/^#/, '').split('&').forEach(function (p) {
      if (!p) return;
      var i = p.indexOf('=');
      if (i < 0) return;
      out[decodeURIComponent(p.slice(0, i))] = decodeURIComponent(p.slice(i + 1));
    });
    return out;
  }
  function writeHash(obj) {
    var parts = [];
    Object.keys(obj).forEach(function (k) {
      if (obj[k] !== undefined && obj[k] !== null && obj[k] !== '') parts.push(encodeURIComponent(k) + '=' + encodeURIComponent(obj[k]));
    });
    try { history.replaceState(null, '', parts.length ? '#' + parts.join('&') : location.pathname + location.search); } catch (e) { /* sandboxed */ }
  }
  var store = {
    get: function () { try { return localStorage.getItem('acx-reader'); } catch (e) { return null; } },
    set: function (v) { try { localStorage.setItem('acx-reader', v); } catch (e) { /* unavailable */ } }
  };

  var ACX = {
    root: root, data: D, still: still, reader: 'leader',
    esc: function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); },
    icon: function (id, tone, size, label) {
      var cls = 'acx-ic iso-' + (tone || 'slate') + (size ? ' is-' + size : '');
      return '<svg class="' + cls + '"' + (label ? ' role="img" aria-label="' + ACX.esc(label) + '"' : ' aria-hidden="true"') + '><use href="#' + id + '"/></svg>';
    },
    ev: function (tag) {
      var t = tag || 'verified 2026';
      var k = /^vendor/i.test(t) ? 'vendor' : (/^illus/i.test(t) ? 'illustrative' : 'verified');
      return '<span class="acx-ev" data-ev="' + k + '">' + ACX.esc(t) + '</span>';
    },
    chip: function (m) { return '<span class="acx-chip" data-m="' + ACX.esc(m) + '">' + ACX.esc(m) + '</span>'; },
    get: function (k) { return parseHash()[k]; },
    set: function (k, v) {
      var h = parseHash();
      if (v === undefined || v === null || v === '') delete h[k]; else h[k] = v;
      if (!h.reader) h.reader = ACX.reader;
      writeHash(h);
      (subs[k] || []).forEach(function (fn) { fn(v); });
    },
    on: function (k, fn) { (subs[k] = subs[k] || []).push(fn); },
    onReader: function (fn) { readerSubs.push(fn); fn(ACX.reader); },
    setReader: function (v, silent) {
      if (READERS.indexOf(v) < 0) return;
      ACX.reader = v;
      root.dataset.reader = v;
      root.querySelectorAll('[data-reader-btn]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.readerBtn === v)); });
      if (!silent) { store.set(v); var h = parseHash(); h.reader = v; writeHash(h); }
      readerSubs.forEach(function (fn) { fn(v); });
    },
    scene: function (id, fn) {
      var el = document.getElementById('acx-' + id);
      if (!el) return;
      try { fn(el, ACX); } catch (e) { if (window.console) console.error('acx scene ' + id, e); }
    },
    jump: function (id) {
      var el = document.getElementById('acx-' + id);
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
    }
  };
  window.ACX = ACX;

  var h0 = parseHash();
  var r0 = READERS.indexOf(h0.reader) >= 0 ? h0.reader : (READERS.indexOf(store.get()) >= 0 ? store.get() : 'leader');
  ACX.setReader(r0, true);
  root.querySelectorAll('[data-reader-btn]').forEach(function (b) {
    b.addEventListener('click', function () { ACX.setReader(b.dataset.readerBtn); });
  });
  window.addEventListener('hashchange', function () {
    var h = parseHash();
    if (h.reader && h.reader !== ACX.reader) ACX.setReader(h.reader, true);
    Object.keys(subs).forEach(function (k) { if (h[k] !== undefined) subs[k].forEach(function (fn) { fn(h[k]); }); });
  });
  // scene nav highlights the scene in view
  var links = root.querySelectorAll('.acx-nav a');
  if ('IntersectionObserver' in window && links.length) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        links.forEach(function (a) { a.setAttribute('aria-current', String(a.getAttribute('href') === '#' + e.target.id)); });
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    root.querySelectorAll('.acx-scene').forEach(function (s) { io.observe(s); });
  }
  links.forEach(function (a) {
    a.addEventListener('click', function (ev) { ev.preventDefault(); ACX.jump(a.getAttribute('href').slice(5)); });
  });
})();
