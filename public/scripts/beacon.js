(function () {
  try {
    var SKEY = 'm2m_session', VKEY = 'm2m_visits';
    function uuid() {
      return (crypto.randomUUID && crypto.randomUUID()) ||
        ('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
          var r = (Math.random() * 16) | 0; return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
        }));
    }
    var session = localStorage.getItem(SKEY) || uuid();
    localStorage.setItem(SKEY, session);
    var visits = (parseInt(localStorage.getItem(VKEY), 10) || 0) + 1;
    localStorage.setItem(VKEY, String(visits));

    function canvasHash() {
      try {
        var c = document.createElement('canvas');
        var ctx = c.getContext('2d');
        ctx.textBaseline = 'top'; ctx.font = "14px 'Arial'";
        ctx.fillStyle = '#069'; ctx.fillText('m2m-fp', 2, 2);
        var d = c.toDataURL(); var h = 0;
        for (var i = 0; i < d.length; i++) { h = (h * 31 + d.charCodeAt(i)) | 0; }
        return String(h);
      } catch (e) { return ''; }
    }
    function webglHash() {
      try {
        var gl = document.createElement('canvas').getContext('webgl');
        var dbg = gl.getExtension('WEBGL_debug_renderer_info');
        return dbg ? gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) : '';
      } catch (e) { return ''; }
    }
    function utm() {
      var p = new URLSearchParams(location.search), o = {};
      ['source', 'medium', 'campaign', 'term', 'content'].forEach(function (k) {
        var v = p.get('utm_' + k); if (v) o[k] = v;
      });
      return o;
    }

    var conn = navigator.connection || {};
    var start = Date.now();
    var clicks = [];
    document.addEventListener('click', function (e) {
      var a = e.target && e.target.closest && e.target.closest('a');
      if (a) clicks.push({ href: a.getAttribute('href') || '', text: (a.textContent || '').trim().slice(0, 80), ts: Date.now() });
    }, true);

    function payload(timeOnPage) {
      return {
        session: session, visitCount: visits,
        page: {
          url: location.href, path: location.pathname, title: document.title,
          referrer: document.referrer, landing: location.pathname, entry: visits === 1, utm: utm()
        },
        device: {
          screen: screen.width + 'x' + screen.height,
          viewport: window.innerWidth + 'x' + window.innerHeight,
          dpr: window.devicePixelRatio || 1, colorDepth: screen.colorDepth,
          languages: navigator.languages || [navigator.language],
          cores: navigator.hardwareConcurrency || null, memory: navigator.deviceMemory || null,
          touch: 'ontouchstart' in window, connection: conn.effectiveType || ''
        },
        fingerprint: { canvas: canvasHash(), webgl: webglHash() },
        behavior: { timeOnPage: timeOnPage || 0, clicks: clicks.slice(0, 100) }
      };
    }

    // Initial pageview.
    fetch('/api/collect', {
      method: 'POST', keepalive: true,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload(0))
    }).catch(function () {});

    // Final time-on-page + clicks on leave.
    function flush() {
      try {
        var body = JSON.stringify(payload(Date.now() - start));
        if (navigator.sendBeacon) navigator.sendBeacon('/api/collect', new Blob([body], { type: 'application/json' }));
      } catch (e) {}
    }
    document.addEventListener('visibilitychange', function () { if (document.visibilityState === 'hidden') flush(); });
    window.addEventListener('pagehide', flush);
  } catch (e) { /* never break the page */ }
})();
