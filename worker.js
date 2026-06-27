// Cloudflare Worker entry point.
//
// This site deploys as a Worker with Static Assets (see wrangler.toml's
// [assets] block), not as Cloudflare Pages. Static files from the Astro build
// (dist/) are served by the ASSETS binding; the two analytics API routes are
// handled here. The handlers are the same ones the project already ships in
// functions/api/* — they take a Pages-style { request, env } context, which we
// construct from the Worker's (request, env, ctx) arguments, so the analytics
// logic is reused verbatim with no duplication.
import { onRequestPost as collectPost, onRequestOptions as collectOptions } from './functions/api/collect.js';
import { onRequestGet as eventsGet } from './functions/api/events.js';

export default {
  async fetch(request, env, ctx) {
    const { pathname } = new URL(request.url);
    const context = { request, env, ctx };

    if (pathname === '/api/collect') {
      if (request.method === 'OPTIONS') return collectOptions(context);
      if (request.method === 'POST') return collectPost(context);
      return new Response('Method Not Allowed', { status: 405, headers: { Allow: 'POST, OPTIONS' } });
    }

    if (pathname === '/api/events') {
      if (request.method === 'GET') return eventsGet(context);
      return new Response('Method Not Allowed', { status: 405, headers: { Allow: 'GET' } });
    }

    // Everything else: serve the static Astro build from dist/.
    return env.ASSETS.fetch(request);
  }
};
