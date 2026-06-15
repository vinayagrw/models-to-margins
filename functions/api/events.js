import { selectStore } from '../_shared/storage.js';

// Constant-time string compare so the gate doesn't leak the secret via a
// timing oracle. Length is compared first (length itself is not secret here).
function safeEqual(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string' || a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

function safeDecode(value) {
  try { return decodeURIComponent(value); } catch { return value; }
}

// Shared-secret gate. Token comes from env.INSIGHTS_TOKEN (Pages env var)
// supplied via ?key=, an x-insights-key header, or the m2m_insights cookie.
function isAuthorized(request, env) {
  const expected = env && env.INSIGHTS_TOKEN;
  if (!expected) return false;
  const url = new URL(request.url);
  const fromQuery = url.searchParams.get('key');
  const fromHeader = request.headers.get('x-insights-key');
  const cookie = request.headers.get('cookie') || '';
  const fromCookie = (cookie.match(/(?:^|;\s*)m2m_insights=([^;]+)/) || [])[1];
  const token = fromQuery || fromHeader || (fromCookie && safeDecode(fromCookie));
  return safeEqual(token || '', expected);
}

export async function onRequestGet({ request, env }) {
  if (!isAuthorized(request, env)) {
    return new Response('Not found', { status: 404 });
  }
  const url = new URL(request.url);
  const limit = Math.min(Number(url.searchParams.get('limit')) || 1000, 5000);
  const store = selectStore(env);
  const events = await store.list({ limit });
  return new Response(JSON.stringify({ events, count: events.length }), {
    status: 200,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }
  });
}
