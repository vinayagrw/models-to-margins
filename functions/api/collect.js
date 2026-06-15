import { extractGeo, parseUserAgent, sanitizeClient } from '../_shared/enrich.js';
import { selectStore } from '../_shared/storage.js';

function corsHeaders(origin) {
  return {
    'Access-Control-Allow-Origin': origin || '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };
}

export async function onRequestOptions({ request }) {
  return new Response(null, { status: 204, headers: corsHeaders(request.headers.get('origin')) });
}

export async function onRequestPost({ request, env }) {
  const origin = request.headers.get('origin');
  try {
    const raw = await request.text();
    if (raw.length > 32_000) return new Response('payload too large', { status: 413 });
    const client = sanitizeClient(JSON.parse(raw || '{}'));
    const ua = request.headers.get('user-agent') || '';
    const geo = extractGeo(request);

    const event = {
      id: crypto.randomUUID(),
      ts: Date.now(),
      session: client.session,
      visitCount: client.visitCount,
      page: client.page,
      geo,
      device: { ...client.device, ...parseUserAgent(ua) },
      fingerprint: client.fingerprint,
      net: { tls: geo.tls, httpProtocol: geo.httpProtocol },
      behavior: client.behavior,
      userAgent: ua
    };

    const store = selectStore(env);
    await store.put(event);
    return new Response(JSON.stringify({ ok: true }), {
      status: 202,
      headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) }
    });
  } catch (err) {
    console.warn(`[analytics] collect error: ${err.message}`);
    // Never fail loudly to the visitor's browser.
    return new Response(JSON.stringify({ ok: false }), {
      status: 202,
      headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) }
    });
  }
}
