(function () {
  var KEY = new URLSearchParams(location.search).get('key');
  if (KEY) document.cookie = 'm2m_insights=' + encodeURIComponent(KEY) + ';path=/;max-age=86400;samesite=strict';

  var ALL = [];
  var get = function (o, path) { return path.split('.').reduce(function (a, k) { return a && a[k]; }, o); };

  function load() {
    var url = '/api/events?limit=5000' + (KEY ? '&key=' + encodeURIComponent(KEY) : '');
    fetch(url, { headers: KEY ? { 'x-insights-key': KEY } : {} })
      .then(function (r) { if (!r.ok) throw new Error('gate'); return r.json(); })
      .then(function (d) { ALL = d.events || []; boot(); })
      .catch(function () { document.getElementById('gate-note').hidden = false; });
  }

  function uniq(key) {
    var s = {};
    ALL.forEach(function (e) { var v = get(e, key); if (v) s[v] = 1; });
    return Object.keys(s).sort();
  }
  function fillSelect(id, key) {
    var sel = document.getElementById(id);
    uniq(key).forEach(function (v) {
      var o = document.createElement('option'); o.value = v; o.textContent = v; sel.appendChild(o);
    });
  }

  function filtered() {
    var q = (document.getElementById('f-search').value || '').toLowerCase();
    var from = document.getElementById('f-from').value, to = document.getElementById('f-to').value;
    var country = document.getElementById('f-country').value, browser = document.getElementById('f-browser').value;
    var device = document.getElementById('f-device').value, page = document.getElementById('f-page').value;
    var fromTs = from ? new Date(from).getTime() : -Infinity;
    var toTs = to ? new Date(to).getTime() + 86400000 : Infinity;
    return ALL.filter(function (e) {
      if (e.ts < fromTs || e.ts > toTs) return false;
      if (country && get(e, 'geo.country') !== country) return false;
      if (browser && get(e, 'device.browser') !== browser) return false;
      if (device && get(e, 'device.deviceType') !== device) return false;
      if (page && get(e, 'page.path') !== page) return false;
      if (q) {
        var hay = [get(e, 'page.path'), get(e, 'geo.city'), get(e, 'geo.country'),
          get(e, 'page.referrer'), get(e, 'geo.ip'), get(e, 'device.browser')].join(' ').toLowerCase();
        if (hay.indexOf(q) === -1) return false;
      }
      return true;
    });
  }

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function renderTable(rows) {
    var tb = document.getElementById('rows');
    tb.innerHTML = rows.slice(0, 500).map(function (e) {
      return '<tr>' +
        '<td>' + esc(new Date(e.ts).toLocaleString()) + '</td>' +
        '<td>' + esc(get(e, 'geo.country')) + '</td>' +
        '<td>' + esc(get(e, 'geo.city')) + '</td>' +
        '<td>' + esc(get(e, 'page.path')) + '</td>' +
        '<td>' + esc(get(e, 'device.browser')) + '</td>' +
        '<td>' + esc(get(e, 'device.deviceType')) + '</td>' +
        '<td>' + esc(get(e, 'page.referrer')) + '</td>' +
        '<td>' + esc(get(e, 'geo.ip')) + '</td>' +
        '</tr>';
    }).join('');
    document.getElementById('f-count').textContent = rows.length + ' events';
  }

  function csv(rows) {
    var cols = ['ts', 'geo.country', 'geo.city', 'geo.ip', 'page.path', 'page.referrer',
      'device.browser', 'device.os', 'device.deviceType'];
    var lines = [cols.join(',')];
    rows.forEach(function (e) {
      lines.push(cols.map(function (c) {
        var v = c === 'ts' ? new Date(e.ts).toISOString() : (get(e, c) || '');
        return '"' + String(v).replace(/"/g, '""') + '"';
      }).join(','));
    });
    var blob = new Blob([lines.join('\n')], { type: 'text/csv' });
    var a = document.createElement('a'); a.href = URL.createObjectURL(blob);
    a.download = 'insights.csv'; a.click();
  }

  function apply() {
    var rows = filtered();
    renderTable(rows);
    if (window.__m2mRenderViz) window.__m2mRenderViz(rows);
  }

  function boot() {
    document.getElementById('dash').hidden = false;
    fillSelect('f-country', 'geo.country');
    fillSelect('f-browser', 'device.browser');
    fillSelect('f-device', 'device.deviceType');
    fillSelect('f-page', 'page.path');
    ['f-search', 'f-from', 'f-to', 'f-country', 'f-browser', 'f-device', 'f-page'].forEach(function (id) {
      document.getElementById(id).addEventListener('input', apply);
    });
    document.getElementById('f-clear').addEventListener('click', function () {
      ['f-search', 'f-from', 'f-to', 'f-country', 'f-browser', 'f-device', 'f-page'].forEach(function (id) {
        document.getElementById(id).value = '';
      });
      apply();
    });
    document.getElementById('f-csv').addEventListener('click', function () { csv(filtered()); });
    apply();
  }

  load();
})();
