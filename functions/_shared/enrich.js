// Pure enrichment helpers shared by the collect endpoint and the dev middleware.

export function parseUserAgent(ua = '') {
  const s = String(ua);
  let browser = 'Unknown', browserVersion = '';
  const matchers = [
    [/Edg\/(\d+)/, 'Edge'],
    [/OPR\/(\d+)/, 'Opera'],
    [/Firefox\/(\d+)/, 'Firefox'],
    [/Chrome\/(\d+)/, 'Chrome'],
    [/Version\/(\d+).*Safari/, 'Safari']
  ];
  for (const [re, name] of matchers) {
    const m = s.match(re);
    if (m) { browser = name; browserVersion = m[1]; break; }
  }

  let os = 'Unknown';
  if (/Windows NT/.test(s)) os = 'Windows';
  else if (/iPhone|iPad|iPod/.test(s)) os = 'iOS';
  else if (/Mac OS X/.test(s)) os = 'macOS';
  else if (/Android/.test(s)) os = 'Android';
  else if (/Linux/.test(s)) os = 'Linux';

  let deviceType = 'desktop';
  if (/Mobi|iPhone|iPod|Android.*Mobile/.test(s)) deviceType = 'mobile';
  else if (/iPad|Tablet|Android(?!.*Mobile)/.test(s)) deviceType = 'tablet';

  return { browser, browserVersion, os, deviceType };
}

export function extractGeo(request) {
  const cf = request.cf || {};
  const h = request.headers;
  const ip = (h && h.get && (h.get('cf-connecting-ip') || h.get('x-forwarded-for'))) || '';
  return {
    ip,
    country: cf.country || '',
    region: cf.region || '',
    city: cf.city || '',
    lat: cf.latitude != null ? Number(cf.latitude) : null,
    lng: cf.longitude != null ? Number(cf.longitude) : null,
    postal: cf.postalCode || '',
    timezone: cf.timezone || '',
    asn: cf.asn || null,
    isp: cf.asOrganization || '',
    colo: cf.colo || '',
    tls: cf.tlsVersion || '',
    httpProtocol: cf.httpProtocol || ''
  };
}

function pick(obj, keys) {
  const out = {};
  if (!obj || typeof obj !== 'object') return out;
  for (const k of keys) if (obj[k] !== undefined) out[k] = obj[k];
  return out;
}

export function sanitizeClient(body) {
  const b = body && typeof body === 'object' ? body : {};
  const page = pick(b.page, ['url', 'path', 'title', 'referrer', 'landing', 'entry', 'utm']);
  if (page.utm) page.utm = pick(page.utm, ['source', 'medium', 'campaign', 'term', 'content']);
  const device = pick(b.device, [
    'browser', 'browserVersion', 'os', 'deviceType', 'screen', 'viewport',
    'dpr', 'colorDepth', 'languages', 'cores', 'memory', 'touch', 'connection'
  ]);
  const fingerprint = pick(b.fingerprint, ['canvas', 'webgl']);
  const behaviorRaw = b.behavior && typeof b.behavior === 'object' ? b.behavior : {};
  const clicks = Array.isArray(behaviorRaw.clicks)
    ? behaviorRaw.clicks.slice(0, 100).map((c) => pick(c, ['href', 'text', 'ts']))
    : [];
  return {
    session: typeof b.session === 'string' ? b.session.slice(0, 64) : '',
    visitCount: Number.isFinite(b.visitCount) ? b.visitCount : 1,
    page, device, fingerprint,
    behavior: { timeOnPage: Number(behaviorRaw.timeOnPage) || 0, clicks }
  };
}
