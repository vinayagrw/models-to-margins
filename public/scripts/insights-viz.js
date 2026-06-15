(function () {
  function el(id) { return document.getElementById(id); }
  function get(o, p) { return p.split('.').reduce(function (a, k) { return a && a[k]; }, o); }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function kpis(rows) {
    var sessions = {}, countries = {}, pages = {};
    var dayAgo = Date.now() - 86400000, last24 = 0;
    rows.forEach(function (e) {
      if (e.session) sessions[e.session] = 1;
      if (get(e, 'geo.country')) countries[get(e, 'geo.country')] = 1;
      var p = get(e, 'page.path'); if (p) pages[p] = (pages[p] || 0) + 1;
      if (e.ts >= dayAgo) last24++;
    });
    var topPage = Object.keys(pages).sort(function (a, b) { return pages[b] - pages[a]; })[0] || '—';
    var tiles = [
      ['Events', rows.length], ['Unique visitors', Object.keys(sessions).length],
      ['Countries', Object.keys(countries).length], ['Top page', topPage], ['Last 24h', last24]
    ];
    el('kpis').innerHTML = tiles.map(function (t) {
      return '<div class="kpi"><span class="kpi-label">' + esc(t[0]) + '</span><span class="kpi-value">' + esc(t[1]) + '</span></div>';
    }).join('');
  }

  // Equirectangular projection onto a 360x180 viewBox.
  function worldMap(rows) {
    var pts = rows.filter(function (e) { return get(e, 'geo.lat') != null && get(e, 'geo.lng') != null; })
      .map(function (e) {
        var x = (Number(get(e, 'geo.lng')) + 180) / 360 * 360;
        var y = (90 - Number(get(e, 'geo.lat'))) / 180 * 180;
        return '<circle cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="1.6" class="geo-pt"/>';
      }).join('');
    return '<svg viewBox="0 0 360 180" class="world-map" preserveAspectRatio="xMidYMid meet">' +
      '<rect x="0" y="0" width="360" height="180" class="world-bg"/>' + pts + '</svg>';
  }

  function bars(title, rows, key, n) {
    var counts = {};
    rows.forEach(function (e) { var v = get(e, key); if (v) counts[v] = (counts[v] || 0) + 1; });
    var entries = Object.keys(counts).map(function (k) { return [k, counts[k]]; })
      .sort(function (a, b) { return b[1] - a[1]; }).slice(0, n || 8);
    var max = entries.length ? entries[0][1] : 1;
    var rowsHtml = entries.map(function (e) {
      return '<div class="bar-row"><span class="bar-label">' + esc(e[0]) + '</span>' +
        '<span class="bar"><span class="bar-fill" style="width:' + (e[1] / max * 100) + '%"></span></span>' +
        '<span class="bar-val">' + esc(e[1]) + '</span></div>';
    }).join('');
    return '<div class="bar-card"><h3>' + esc(title) + '</h3>' + (rowsHtml || '<p class="muted">No data</p>') + '</div>';
  }

  function timeSeries(rows) {
    if (!rows.length) return '<div class="bar-card"><h3>Visits over time</h3><p class="muted">No data</p></div>';
    var byDay = {};
    rows.forEach(function (e) { var d = new Date(e.ts).toISOString().slice(0, 10); byDay[d] = (byDay[d] || 0) + 1; });
    var days = Object.keys(byDay).sort();
    var max = Math.max.apply(null, days.map(function (d) { return byDay[d]; }));
    var w = 360, h = 80, step = days.length > 1 ? w / (days.length - 1) : 0;
    var pts = days.map(function (d, i) { return (i * step).toFixed(1) + ',' + (h - byDay[d] / max * h).toFixed(1); }).join(' ');
    return '<div class="bar-card"><h3>Visits over time</h3>' +
      '<svg viewBox="0 0 ' + w + ' ' + h + '" class="ts-chart" preserveAspectRatio="none">' +
      '<polyline points="' + pts + '" class="ts-line"/></svg></div>';
  }

  window.__m2mRenderViz = function (rows) {
    kpis(rows);
    el('viz').innerHTML =
      '<div class="map-card">' + worldMap(rows) + '</div>' +
      '<div class="bar-grid">' +
        timeSeries(rows) +
        bars('Top pages', rows, 'page.path') +
        bars('Countries', rows, 'geo.country') +
        bars('Browsers', rows, 'device.browser') +
        bars('Devices', rows, 'device.deviceType') +
        bars('Referrers', rows, 'page.referrer') +
        bars('ISPs', rows, 'geo.isp') +
      '</div>';
  };
})();
