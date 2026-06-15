# Visitor Intelligence + Hidden Analytics Dashboard Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Capture rich visitor data (geo, IP, page, referrer, device/browser fingerprint, clicks) on every public page and expose it through a hidden, secret-gated analytics dashboard with maps, charts, and advanced filtering.

**Architecture:** A client beacon posts to a Cloudflare Pages Function (`/api/collect`) that enriches each event with server-only geo/network truth and stores it. Storage is a pluggable layer: Cloudflare KV in production, a JSONL file in local `astro dev` (via a Vite dev middleware), and an in-memory ring buffer as the universal fallback that warns on failure. A secret-gated `/admin/insights` Astro page reads events back through `/api/events` and renders dependency-free SVG visualizations + client-side filtering.

**Tech Stack:** Astro 6 (static), Cloudflare Pages Functions (ESM `.js`, Workers runtime), Cloudflare KV, Node 24 `node:test` for unit tests, vanilla JS + inline SVG for the dashboard. No new runtime dependencies.

---

## Conventions

- **Cloudflare Functions and shared logic are ESM `.js`** (not `.ts`) so pure helpers run under `node --test` with zero build step. Endpoint files export `onRequest*` handlers per the Pages Functions contract.
- **Pure logic lives in `functions/_shared/`** and is imported by both the production endpoints and the dev middleware, so one implementation is tested once and reused everywhere.
- Run all tests with `npm test` (added in Task 1).
- Commit after every task.

## File Structure

```
wrangler.toml                          KV binding for `wrangler pages dev`
.analytics/.gitignore                  ignore local JSONL event data
package.json                           add "test" script
functions/_shared/enrich.js            UA parsing + geo/net extraction + field whitelist (PURE)
functions/_shared/storage.js           MemoryStore + KvStore + selectStore() (mostly pure)
functions/api/collect.js               POST: enrich + store an event
functions/api/events.js                GET: secret-gated read of events
src/integrations/analytics-dev.mjs     dev Vite middleware: JSONL file mirror + memory fallback
public/scripts/beacon.js               client collector
src/layouts/BaseLayout.astro           inject beacon on public pages only
src/pages/admin/insights.astro         hidden dashboard (data load + filters + viz + CSV)
astro.config.mjs                       register dev integration
test/enrich.test.js                    unit tests for enrich.js
test/storage.test.js                   unit tests for storage.js
docs/visitor-analytics-privacy.md      privacy/legal note
```

---

### Task 1: Scaffolding — test script, wrangler binding, gitignore

**Files:**
- Modify: `package.json` (scripts block)
- Create: `wrangler.toml`
- Create: `.analytics/.gitignore`

- [ ] **Step 1: Add a test script to package.json**

In `package.json`, add `"test"` to the `scripts` object so it reads:

```json
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "check": "astro check",
    "test": "node --test"
  },
```

- [ ] **Step 2: Create wrangler.toml for local Pages Functions + KV**

Create `wrangler.toml`:

```toml
name = "models-to-margins"
pages_build_output_dir = "dist"
compatibility_date = "2024-11-01"

# KV namespace for analytics events.
# For production, create a namespace in the Cloudflare dashboard
# (Workers & Pages > KV) and bind it as ANALYTICS on the Pages project.
# The id below is a local-dev placeholder; `wrangler pages dev` creates a
# local KV store automatically.
[[kv_namespaces]]
binding = "ANALYTICS"
id = "analytics_local_placeholder"
```

- [ ] **Step 3: Create the local data directory ignore file**

Create `.analytics/.gitignore` with:

```gitignore
# Local-only captured visitor events. Never commit.
*
!.gitignore
```

- [ ] **Step 4: Verify the test runner works (no tests yet = passes trivially)**

Run: `npm test`
Expected: exits 0 with "tests 0" (Node reports no test files found but does not fail).

- [ ] **Step 5: Commit**

```bash
git add package.json wrangler.toml .analytics/.gitignore
git commit -m "chore: scaffold analytics test script, wrangler KV binding, data gitignore"
```

---

### Task 2: Enrichment helpers (`functions/_shared/enrich.js`)

Pure functions: parse a User-Agent string into browser/OS/device, pull geo/network
fields from a Cloudflare request, and whitelist client-supplied fields. No I/O.

**Files:**
- Create: `functions/_shared/enrich.js`
- Test: `test/enrich.test.js`

- [ ] **Step 1: Write the failing tests**

Create `test/enrich.test.js`:

```js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseUserAgent, extractGeo, sanitizeClient } from '../functions/_shared/enrich.js';

test('parseUserAgent detects Chrome on Windows desktop', () => {
  const ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
  const r = parseUserAgent(ua);
  assert.equal(r.browser, 'Chrome');
  assert.equal(r.browserVersion, '120');
  assert.equal(r.os, 'Windows');
  assert.equal(r.deviceType, 'desktop');
});

test('parseUserAgent detects Safari on iPhone as mobile', () => {
  const ua = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1';
  const r = parseUserAgent(ua);
  assert.equal(r.browser, 'Safari');
  assert.equal(r.os, 'iOS');
  assert.equal(r.deviceType, 'mobile');
});

test('parseUserAgent handles empty UA without throwing', () => {
  const r = parseUserAgent('');
  assert.equal(r.browser, 'Unknown');
  assert.equal(r.deviceType, 'desktop');
});

test('extractGeo reads cf object and headers', () => {
  const req = {
    headers: new Map([['cf-connecting-ip', '203.0.113.5']]),
    cf: { country: 'GB', region: 'England', city: 'London', latitude: '51.5', longitude: '-0.1', postalCode: 'EC1', timezone: 'Europe/London', asn: 5089, asOrganization: 'Virgin', colo: 'LHR', tlsVersion: 'TLSv1.3', httpProtocol: 'HTTP/2' }
  };
  // adapt Map.get to headers.get shape
  req.headers.get = (k) => new Map([['cf-connecting-ip', '203.0.113.5']]).get(k);
  const g = extractGeo(req);
  assert.equal(g.ip, '203.0.113.5');
  assert.equal(g.country, 'GB');
  assert.equal(g.city, 'London');
  assert.equal(g.isp, 'Virgin');
  assert.equal(g.colo, 'LHR');
});

test('sanitizeClient keeps only whitelisted fields and caps clicks', () => {
  const dirty = {
    page: { path: '/x', title: 't', referrer: 'r', url: 'u', landing: '/x', entry: true, utm: { source: 's' } },
    device: { browser: 'ignored-from-client', screen: '1920x1080', evil: 'drop-me' },
    fingerprint: { canvas: 'abc', webgl: 'def' },
    session: 'sess-1', visitCount: 2,
    behavior: { timeOnPage: 1234, clicks: new Array(500).fill({ href: '/a', text: 'a', ts: 1 }) },
    injected: 'nope'
  };
  const clean = sanitizeClient(dirty);
  assert.equal(clean.injected, undefined);
  assert.equal(clean.device.evil, undefined);
  assert.equal(clean.page.path, '/x');
  assert.ok(clean.behavior.clicks.length <= 100);
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test`
Expected: FAIL — `Cannot find module '../functions/_shared/enrich.js'`.

- [ ] **Step 3: Implement `functions/_shared/enrich.js`**

Create `functions/_shared/enrich.js`:

```js
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
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test`
Expected: PASS — all 5 enrich tests green.

- [ ] **Step 5: Commit**

```bash
git add functions/_shared/enrich.js test/enrich.test.js
git commit -m "feat: add visitor event enrichment helpers with tests"
```

---

### Task 3: Storage abstraction (`functions/_shared/storage.js`)

A memory ring buffer (universal fallback) and a KV-backed store, plus a selector.
Every durable write degrades to memory + `console.warn` on failure.

**Files:**
- Create: `functions/_shared/storage.js`
- Test: `test/storage.test.js`

- [ ] **Step 1: Write the failing tests**

Create `test/storage.test.js`:

```js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { MemoryStore, KvStore } from '../functions/_shared/storage.js';

test('MemoryStore stores and lists newest-first, capped', async () => {
  const m = new MemoryStore(3);
  await m.put({ id: 'a', ts: 1 });
  await m.put({ id: 'b', ts: 2 });
  await m.put({ id: 'c', ts: 3 });
  await m.put({ id: 'd', ts: 4 });
  const all = await m.list();
  assert.equal(all.length, 3);
  assert.equal(all[0].id, 'd'); // newest first
  assert.equal(all.some((e) => e.id === 'a'), false); // oldest evicted
});

test('KvStore falls back to memory + warns when KV.put throws', async () => {
  const warnings = [];
  const badKv = {
    put: async () => { throw new Error('kv down'); },
    list: async () => ({ keys: [] }),
    get: async () => null
  };
  const fallback = new MemoryStore(10);
  const store = new KvStore(badKv, fallback, (msg) => warnings.push(msg));
  await store.put({ id: 'x', ts: 1 });
  assert.equal(warnings.length, 1);
  const listed = await store.list();
  assert.equal(listed[0].id, 'x'); // served from memory fallback
});

test('KvStore writes to KV and lists from KV on success', async () => {
  const data = new Map();
  const goodKv = {
    put: async (k, v) => { data.set(k, v); },
    list: async () => ({ keys: [...data.keys()].map((name) => ({ name })) }),
    get: async (k) => data.get(k) || null
  };
  const store = new KvStore(goodKv, new MemoryStore(10), () => {});
  await store.put({ id: 'y', ts: 5 });
  const listed = await store.list();
  assert.equal(listed[0].id, 'y');
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test`
Expected: FAIL — `Cannot find module '../functions/_shared/storage.js'`.

- [ ] **Step 3: Implement `functions/_shared/storage.js`**

Create `functions/_shared/storage.js`:

```js
// Storage backends for visitor events. KvStore is primary in production;
// MemoryStore is the universal fallback that never throws.

export class MemoryStore {
  constructor(cap = 1000) {
    this.cap = cap;
    this.events = []; // newest-first
  }
  async put(evt) {
    this.events.unshift(evt);
    if (this.events.length > this.cap) this.events.length = this.cap;
  }
  async list({ limit = 1000 } = {}) {
    return this.events.slice(0, limit);
  }
}

// Reverse-timestamp key so KV list (lexicographic) returns newest first.
function kvKey(evt) {
  const rev = (1e15 - Number(evt.ts || 0)).toString().padStart(16, '0');
  const rand = Math.random().toString(36).slice(2, 8);
  return `evt:${rev}:${rand}`;
}

export class KvStore {
  constructor(kv, fallback, warn = console.warn) {
    this.kv = kv;
    this.fallback = fallback;
    this.warn = warn;
  }
  async put(evt) {
    try {
      await this.kv.put(kvKey(evt), JSON.stringify(evt));
    } catch (err) {
      this.warn(`[analytics] KV write failed, buffering in memory: ${err.message}`);
      await this.fallback.put(evt);
    }
  }
  async list({ limit = 1000 } = {}) {
    try {
      const { keys } = await this.kv.list({ prefix: 'evt:', limit });
      const values = await Promise.all(keys.map((k) => this.kv.get(k.name)));
      const fromKv = values.filter(Boolean).map((v) => JSON.parse(v));
      const fromMem = await this.fallback.list({ limit });
      return [...fromMem, ...fromKv].slice(0, limit);
    } catch (err) {
      this.warn(`[analytics] KV list failed, serving memory only: ${err.message}`);
      return this.fallback.list({ limit });
    }
  }
}

// Module-level singleton so the in-memory buffer survives across requests
// within the same worker isolate.
const sharedMemory = new MemoryStore(1000);

export function selectStore(env) {
  if (env && env.ANALYTICS && typeof env.ANALYTICS.put === 'function') {
    return new KvStore(env.ANALYTICS, sharedMemory);
  }
  console.warn('[analytics] No KV binding found; using in-memory store only.');
  return sharedMemory;
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test`
Expected: PASS — enrich + storage tests all green.

- [ ] **Step 5: Commit**

```bash
git add functions/_shared/storage.js test/storage.test.js
git commit -m "feat: add KV + in-memory storage with warn-and-degrade fallback"
```

---

### Task 4: Collect endpoint (`functions/api/collect.js`)

**Files:**
- Create: `functions/api/collect.js`

- [ ] **Step 1: Implement the endpoint**

Create `functions/api/collect.js`:

```js
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

    const event = {
      id: crypto.randomUUID(),
      ts: Date.now(),
      session: client.session,
      visitCount: client.visitCount,
      page: client.page,
      geo: extractGeo(request),
      device: { ...client.device, ...parseUserAgent(ua) },
      fingerprint: client.fingerprint,
      net: { tls: extractGeo(request).tls, httpProtocol: extractGeo(request).httpProtocol },
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
```

- [ ] **Step 2: Lint-check by import (no runtime test harness for Workers)**

Run: `node --check functions/api/collect.js`
Expected: no output, exit 0 (syntax valid).

- [ ] **Step 3: Commit**

```bash
git add functions/api/collect.js
git commit -m "feat: add /api/collect Pages Function with geo+UA enrichment"
```

---

### Task 5: Events endpoint with secret gating (`functions/api/events.js`)

**Files:**
- Create: `functions/api/events.js`

- [ ] **Step 1: Implement the endpoint**

Create `functions/api/events.js`:

```js
import { selectStore } from '../_shared/storage.js';

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
  const token = fromQuery || fromHeader || (fromCookie && decodeURIComponent(fromCookie));
  return token === expected;
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
```

- [ ] **Step 2: Syntax check**

Run: `node --check functions/api/events.js`
Expected: exit 0.

- [ ] **Step 3: Commit**

```bash
git add functions/api/events.js
git commit -m "feat: add secret-gated /api/events read endpoint"
```

---

### Task 6: Dev middleware — JSONL file mirror (`src/integrations/analytics-dev.mjs`)

Makes `/api/collect` and `/api/events` work under `astro dev` by writing/reading
`.analytics/events.jsonl` in Node, reusing the shared enrich logic. Inert in builds.

**Files:**
- Create: `src/integrations/analytics-dev.mjs`
- Modify: `astro.config.mjs`

- [ ] **Step 1: Implement the integration**

Create `src/integrations/analytics-dev.mjs`:

```js
import { appendFile, mkdir, readFile } from 'node:fs/promises';
import { randomUUID } from 'node:crypto';
import { extractGeo, parseUserAgent, sanitizeClient } from '../../functions/_shared/enrich.js';

const FILE = '.analytics/events.jsonl';
const memory = []; // fallback buffer if the file write fails

async function readBody(req) {
  const chunks = [];
  for await (const c of req) chunks.push(c);
  return Buffer.concat(chunks).toString('utf8');
}

// In dev there is no Cloudflare cf object; synthesize a minimal request shape.
function devRequestShape(req) {
  return {
    cf: { timezone: '', httpProtocol: req.httpVersion ? `HTTP/${req.httpVersion}` : '' },
    headers: { get: (k) => req.headers[k.toLowerCase()] || '' }
  };
}

export default function analyticsDev() {
  return {
    name: 'analytics-dev',
    hooks: {
      'astro:server:setup': ({ server }) => {
        server.middlewares.use(async (req, res, next) => {
          const url = req.url || '';
          if (req.method === 'POST' && url.startsWith('/api/collect')) {
            try {
              const client = sanitizeClient(JSON.parse((await readBody(req)) || '{}'));
              const shaped = devRequestShape(req);
              const ua = req.headers['user-agent'] || '';
              const event = {
                id: randomUUID(), ts: Date.now(),
                session: client.session, visitCount: client.visitCount,
                page: client.page, geo: extractGeo(shaped),
                device: { ...client.device, ...parseUserAgent(ua) },
                fingerprint: client.fingerprint,
                net: { tls: '', httpProtocol: shaped.cf.httpProtocol },
                behavior: client.behavior, userAgent: ua
              };
              try {
                await mkdir('.analytics', { recursive: true });
                await appendFile(FILE, JSON.stringify(event) + '\n');
              } catch (err) {
                console.warn(`[analytics] dev file write failed, buffering in memory: ${err.message}`);
                memory.unshift(event);
              }
              res.statusCode = 202;
              res.setHeader('Content-Type', 'application/json');
              return res.end('{"ok":true}');
            } catch (err) {
              console.warn(`[analytics] dev collect error: ${err.message}`);
              res.statusCode = 202; return res.end('{"ok":false}');
            }
          }
          if (req.method === 'GET' && url.startsWith('/api/events')) {
            const token = new URL(url, 'http://localhost').searchParams.get('key');
            if (!process.env.INSIGHTS_TOKEN || token !== process.env.INSIGHTS_TOKEN) {
              res.statusCode = 404; return res.end('Not found');
            }
            let fileEvents = [];
            try {
              const text = await readFile(FILE, 'utf8');
              fileEvents = text.split('\n').filter(Boolean).map((l) => JSON.parse(l)).reverse();
            } catch { /* no file yet */ }
            const events = [...memory, ...fileEvents].slice(0, 5000);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            return res.end(JSON.stringify({ events, count: events.length }));
          }
          return next();
        });
      }
    }
  };
}
```

- [ ] **Step 2: Register the integration in astro.config.mjs**

Modify `astro.config.mjs` to import and add the integration. The result:

```js
import { defineConfig } from 'astro/config';
import analyticsDev from './src/integrations/analytics-dev.mjs';

export default defineConfig({
  site: 'https://models-to-margins.vinayagrw.workers.dev',
  output: 'static',
  integrations: [analyticsDev()],
  server: {
    port: Number(process.env.PORT) || 4321
  },
  markdown: {
    shikiConfig: {
      theme: 'github-dark'
    }
  }
});
```

- [ ] **Step 3: Syntax check both files**

Run: `node --check src/integrations/analytics-dev.mjs && node --check astro.config.mjs`
Expected: exit 0.

- [ ] **Step 4: Commit**

```bash
git add src/integrations/analytics-dev.mjs astro.config.mjs
git commit -m "feat: dev middleware writes JSONL event mirror with memory fallback"
```

---

### Task 7: Client beacon + BaseLayout injection

**Files:**
- Create: `public/scripts/beacon.js`
- Modify: `src/layouts/BaseLayout.astro`

- [ ] **Step 1: Implement the beacon**

Create `public/scripts/beacon.js`:

```js
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
```

- [ ] **Step 2: Inject the beacon on public pages only**

In `src/layouts/BaseLayout.astro`, just before the closing `</body>` tag (after the existing theme `<script>` block, before `</body>`), add a conditional beacon tag keyed off the existing `currentPath` prop so it never loads on `/admin/*`:

```astro
    {!currentPath.startsWith('/admin') && (
      <script src="/scripts/beacon.js" defer is:inline></script>
    )}
  </body>
</html>
```

(Place the `{!currentPath...}` block immediately before `</body>`. The `is:inline` keeps Astro from bundling/transforming the public file.)

- [ ] **Step 3: Verify the beacon loads in dev and writes events**

Run: `npm run dev` (in a background shell), then in another shell:
`curl -s -X POST http://localhost:4321/api/collect -H "Content-Type: application/json" -d '{"session":"t","visitCount":1,"page":{"path":"/"}}'`
Expected: `{"ok":true}` and a new line in `.analytics/events.jsonl`.
Then stop the dev server.

- [ ] **Step 4: Commit**

```bash
git add public/scripts/beacon.js src/layouts/BaseLayout.astro
git commit -m "feat: add client beacon and inject on public pages only"
```

---

### Task 8: Hidden dashboard — data load, gating, filters, table, CSV (`src/pages/admin/insights.astro`)

This task builds the page shell, secret handling, client-side data fetch, the
advanced filter bar, the raw event table, and CSV export. Visualizations come in
Task 9. Keep markup minimal/semantic; `/frontend-design` will style it after.

**Files:**
- Create: `src/pages/admin/insights.astro`

- [ ] **Step 1: Create the page with gating + filter + table + CSV logic**

Create `src/pages/admin/insights.astro`:

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
---
<BaseLayout
  title="Insights | Models to Margins"
  description="Hidden visitor analytics."
  currentPath="/admin/insights"
>
  <section class="article-shell admin-shell" id="insights-root">
    <header>
      <span class="eyebrow warm">Hidden Analytics</span>
      <h1>Visitor intelligence dashboard.</h1>
      <p class="lead">Geographic, device, referral, and behavior data for public-page visitors.</p>
    </header>

    <div class="note-panel section-block" id="gate-note" hidden>
      <p>Provide the access key: <code>/admin/insights?key=YOUR_TOKEN</code></p>
    </div>

    <div id="dash" hidden>
      <div class="kpi-row section-block" id="kpis"></div>
      <div class="section-block" id="viz"></div>

      <div class="filter-bar section-block">
        <input id="f-search" type="search" placeholder="Search (path, city, referrer…)" />
        <input id="f-from" type="date" />
        <input id="f-to" type="date" />
        <select id="f-country"><option value="">All countries</option></select>
        <select id="f-browser"><option value="">All browsers</option></select>
        <select id="f-device"><option value="">All devices</option></select>
        <select id="f-page"><option value="">All pages</option></select>
        <button id="f-clear" type="button" class="button secondary">Clear</button>
        <button id="f-csv" type="button" class="button secondary">Export CSV</button>
        <span id="f-count"></span>
      </div>

      <div class="table-wrap section-block">
        <table class="event-table">
          <thead><tr>
            <th data-sort="ts">Time</th><th data-sort="geo.country">Country</th>
            <th data-sort="geo.city">City</th><th data-sort="page.path">Page</th>
            <th data-sort="device.browser">Browser</th><th data-sort="device.deviceType">Device</th>
            <th data-sort="page.referrer">Referrer</th><th data-sort="geo.ip">IP</th>
          </tr></thead>
          <tbody id="rows"></tbody>
        </table>
      </div>
    </div>
  </section>

  <script src="/scripts/insights.js" is:inline></script>
</BaseLayout>
```

- [ ] **Step 2: Create the dashboard logic file**

Create `public/scripts/insights.js`:

```js
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

  function renderTable(rows) {
    var tb = document.getElementById('rows');
    tb.innerHTML = rows.slice(0, 500).map(function (e) {
      return '<tr>' +
        '<td>' + new Date(e.ts).toLocaleString() + '</td>' +
        '<td>' + (get(e, 'geo.country') || '') + '</td>' +
        '<td>' + (get(e, 'geo.city') || '') + '</td>' +
        '<td>' + (get(e, 'page.path') || '') + '</td>' +
        '<td>' + (get(e, 'device.browser') || '') + '</td>' +
        '<td>' + (get(e, 'device.deviceType') || '') + '</td>' +
        '<td>' + (get(e, 'page.referrer') || '') + '</td>' +
        '<td>' + (get(e, 'geo.ip') || '') + '</td>' +
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
    if (window.__m2mRenderViz) window.__m2mRenderViz(rows); // Task 9
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
```

- [ ] **Step 3: Verify gating + table render in dev**

Run: `npm run dev` with `INSIGHTS_TOKEN` set (PowerShell: `$env:INSIGHTS_TOKEN='devsecret'; npm run dev`). Seed a few events via the curl in Task 7. Open `http://localhost:4321/admin/insights?key=devsecret`.
Expected: table shows seeded events, filters populate, "Export CSV" downloads a file. Opening without `?key=` shows the gate note. Stop the server.

- [ ] **Step 4: Commit**

```bash
git add src/pages/admin/insights.astro public/scripts/insights.js
git commit -m "feat: hidden insights dashboard with gating, filters, table, CSV"
```

---

### Task 9: Dashboard visualizations — KPIs, world map, time series, breakdown bars

**Files:**
- Create: `public/scripts/insights-viz.js`
- Modify: `src/pages/admin/insights.astro` (add one script tag)

- [ ] **Step 1: Implement the visualization renderer**

Create `public/scripts/insights-viz.js`. It defines `window.__m2mRenderViz(rows)` which
the dashboard calls on every filter change. Uses inline SVG, no libraries.

```js
(function () {
  function el(id) { return document.getElementById(id); }
  function get(o, p) { return p.split('.').reduce(function (a, k) { return a && a[k]; }, o); }

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
      return '<div class="kpi"><span class="kpi-label">' + t[0] + '</span><span class="kpi-value">' + t[1] + '</span></div>';
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
      return '<div class="bar-row"><span class="bar-label">' + e[0] + '</span>' +
        '<span class="bar"><span class="bar-fill" style="width:' + (e[1] / max * 100) + '%"></span></span>' +
        '<span class="bar-val">' + e[1] + '</span></div>';
    }).join('');
    return '<div class="bar-card"><h3>' + title + '</h3>' + (rowsHtml || '<p class="muted">No data</p>') + '</div>';
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
```

- [ ] **Step 2: Load the viz script before the dashboard script**

In `src/pages/admin/insights.astro`, change the script tags at the bottom so the viz
renderer is defined before `insights.js` runs:

```astro
  <script src="/scripts/insights-viz.js" is:inline></script>
  <script src="/scripts/insights.js" is:inline></script>
```

- [ ] **Step 3: Verify visuals render and react to filters**

Run: `npm run dev` with `INSIGHTS_TOKEN` set, seed events including ones with geo
lat/lng (or hand-add lines to `.analytics/events.jsonl`). Open the dashboard.
Expected: KPI tiles, world map points, time-series line, and breakdown bars render
and update when filters change. Stop the server.

- [ ] **Step 4: Commit**

```bash
git add public/scripts/insights-viz.js src/pages/admin/insights.astro
git commit -m "feat: add KPIs, world map, time series, and breakdown charts"
```

---

### Task 10: Privacy/legal note

**Files:**
- Create: `docs/visitor-analytics-privacy.md`

- [ ] **Step 1: Write the privacy note**

Create `docs/visitor-analytics-privacy.md`:

```markdown
# Visitor Analytics — Privacy & Legal Note

This site captures visitor data on every public page via `/api/collect` and stores
it (Cloudflare KV in production, a local JSONL file in dev). A hidden dashboard at
`/admin/insights` (secret-gated by `INSIGHTS_TOKEN`) visualizes it.

## What is collected
IP address, approximate gelocation (country/region/city/coords from Cloudflare),
ISP/ASN, timezone, full URL + referrer + UTM params, browser/OS/device, screen and
viewport, language, a canvas/WebGL fingerprint, a first-party session id, visit
count, time-on-page, and clicked links.

## Legal reality
IP address, gelocation, and device fingerprints are **personal data** under GDPR and
similar laws, and fingerprinting/analytics cookies fall under ePrivacy. Collecting
this without consent carries legal risk depending on your visitors' jurisdictions.
You, the site owner, are the data controller and accept that responsibility.

## Recommended privacy-policy line
> "We collect technical and usage data — including IP address, approximate location,
> device and browser characteristics, and pages visited — to understand site traffic.
> Contact <email> to request access or deletion."

## How to disable or reduce collection
- **Disable entirely:** remove the beacon `<script>` block from
  `src/layouts/BaseLayout.astro` and redeploy.
- **Anonymize IPs:** in `functions/_shared/enrich.js`, truncate the last octet/hextet
  of `ip` inside `extractGeo` before storing.
- **Drop fingerprinting:** remove `canvas`/`webgl` from the beacon payload and the
  `fingerprint` whitelist in `sanitizeClient`.
```

- [ ] **Step 2: Commit**

```bash
git add docs/visitor-analytics-privacy.md
git commit -m "docs: add visitor analytics privacy and legal note"
```

---

## Production deployment checklist (manual, post-implementation)

These are Cloudflare-dashboard steps, not code:

1. **Workers & Pages → KV →** create a namespace (e.g. `m2m-analytics`).
2. **Pages project → Settings → Functions → KV namespace bindings →** bind it as
   `ANALYTICS`.
3. **Pages project → Settings → Environment variables →** set `INSIGHTS_TOKEN` to a
   long random secret (Production + Preview).
4. Redeploy. Verify `/api/collect` receives beacons (KV namespace fills) and
   `/admin/insights?key=<token>` renders. Confirm geo fields populate (they only
   appear on the real Cloudflare edge, not in `wrangler pages dev` without `--remote`).

---

## Self-Review Notes

- **Spec coverage:** capture (Tasks 4,6,7) ✓; geo/IP/fingerprint/clicks (Tasks 2,7) ✓;
  KV + file + memory fallback (Tasks 3,6) ✓; secret-gated hidden dashboard (Tasks 5,8) ✓;
  map + charts + advanced filtering + CSV (Tasks 8,9) ✓; privacy note (Task 10) ✓.
- **Type/name consistency:** event schema keys (`geo.*`, `device.*`, `page.*`,
  `behavior.clicks`, `session`, `ts`) are identical across enrich, storage, endpoints,
  dev middleware, beacon, and dashboard. `selectStore(env)`, `MemoryStore`, `KvStore`,
  `window.__m2mRenderViz` names match every call site.
- **No placeholders:** all code is concrete; the only deferred items are Cloudflare
  dashboard actions, isolated in the manual checklist above.
```
