# Visitor Intelligence + Hidden Analytics Dashboard — Design

**Date:** 2026-06-14
**Status:** Approved direction, pending written-spec sign-off
**Project:** models-to-margins (Astro static site, deployed to Cloudflare Pages)

## 1. Goal

Add a hidden feature that captures rich information about visitors to the public
pages — geographic location, which page they are on, where they came from, and
their device/browser/network fingerprint — and a hidden, secret-gated analytics
dashboard that visualizes this data with advanced filtering.

## 2. Constraints & context

- The site is `output: 'static'` Astro, deployed to **Cloudflare Pages** (`dist`).
  There is **no** Astro SSR adapter and **no** `wrangler.toml` today.
- We keep the site static. Runtime capture is done with **Cloudflare Pages
  Functions** (`functions/` at repo root), which run as Workers and have access
  to `request.cf` geo data, request headers, and a KV binding — without
  converting the Astro build to SSR.
- Existing patterns to follow: hidden `/admin/*` routes (`src/pages/admin/visibility.astro`),
  glass-card visual style, dependency-light stack (only `astro` in deps).

## 3. Storage model (key decision)

A storage abstraction with three backends, selected by runtime environment.
Every write path falls back to in-memory with a `console.warn` if its primary
backend is unavailable or errors — satisfying the "if the file write fails,
warn and keep storing in memory" requirement.

| Environment | Primary backend | Fallback |
|---|---|---|
| Local dev (`astro dev`, Node) | **JSONL file** `.analytics/events.jsonl` (append) | in-memory ring buffer + warn |
| Production (Cloudflare Pages Function, Workers) | **Cloudflare KV** (binding `ANALYTICS`) | in-memory ring buffer + warn |

**Why the file is dev-only:** the Workers production runtime has no filesystem,
so a JSONL *file* is physically impossible in production. The file mirror is
therefore written by a **Vite dev middleware** that runs in Node during
`astro dev`. Production uses KV. Both honor the identical event schema, so the
dashboard reads the same shape regardless of source.

- KV key scheme: `evt:<reverse-timestamp>:<rand>` so newest sort first; values
  are JSON event objects. A rolling index key (or KV `list` with prefix) is used
  to page through events for the dashboard.
- In-memory ring buffer: capped (e.g. last 1000 events) to bound memory; it is
  ephemeral per worker isolate / dev process — it exists purely so the app never
  throws when the durable store is unavailable.

## 4. Data captured per event

Server-enriched fields come from Cloudflare and are hard to spoof; client fields
come from the beacon.

**Server (Pages Function, from `request.cf` + headers):**
IP, country, region, city, latitude, longitude (coarse), postal code, timezone,
ASN, ISP/org, Cloudflare colo, TLS version, HTTP protocol, raw User-Agent.

**Page context (beacon):**
full URL, path, document title, referrer, UTM params (source/medium/campaign/
term/content), landing page, entry-vs-repeat flag.

**Device / browser (beacon, derived):**
browser name + version, OS, device type (desktop/mobile/tablet), screen size,
viewport size, device pixel ratio, color depth, languages, hardware concurrency,
deviceMemory, touch support, network connection type.

**Fingerprint (beacon):**
canvas hash, WebGL vendor/renderer hash, first-party session id (localStorage,
random uuid), visit count.

**Behavior (beacon):**
event timestamp, time-on-page (sent on unload via `sendBeacon`), clicked links /
internal navigations.

### Event schema (logical)

```jsonc
{
  "id": "uuid",
  "ts": 1739491200000,
  "session": "uuid",
  "visitCount": 3,
  "page": { "url", "path", "title", "referrer", "landing", "utm": {…}, "entry": true },
  "geo":  { "ip", "country", "region", "city", "lat", "lng", "postal", "timezone", "asn", "isp", "colo" },
  "device": { "browser", "browserVersion", "os", "deviceType", "screen", "viewport",
              "dpr", "colorDepth", "languages", "cores", "memory", "touch", "connection" },
  "fingerprint": { "canvas", "webgl" },
  "net": { "tls", "httpProtocol" },
  "behavior": { "timeOnPage", "clicks": [ { "href", "text", "ts" } ] }
}
```

## 5. Components

1. **Beacon** — `public/scripts/beacon.js`, injected by `BaseLayout.astro` on
   every **public** page (excludes `/admin/*`). Collects client fields, generates/
   reads session id, computes fingerprint hashes, and `POST`s JSON to
   `/api/collect`. Sends a final `time-on-page` update via `navigator.sendBeacon`
   on `visibilitychange`/`pagehide`. Fails silent (never breaks the page).

2. **Collect endpoint** — `functions/api/collect.ts`. Accepts the beacon POST,
   enriches with server-only geo/net truth, validates/sanitizes, writes via the
   storage layer. Open for writes only; never returns stored data. CORS limited
   to the site origin.

3. **Events endpoint** — `functions/api/events.ts`. **Secret-gated** GET that
   returns stored events as JSON (KV in prod). Supports basic server-side paging;
   filtering is done client-side in the dashboard.

4. **Storage abstraction** — `functions/_shared/storage.ts` (KV + memory) and a
   Node file backend used by the dev middleware. Single `putEvent` / `listEvents`
   interface; each backend logs a warn + degrades to memory on failure.

5. **Enrichment helpers** — `functions/_shared/enrich.ts`: UA parsing
   (browser/OS/device), geo extraction from `request.cf`, field whitelisting.

6. **Dev middleware** — small Astro integration (`src/integrations/analytics-dev.ts`)
   that adds Vite middleware handling `POST /api/collect` and `GET /api/events`
   during `astro dev`, writing/reading `.analytics/events.jsonl` (Node `fs`), with
   the same in-memory fallback + warn. This is what makes the JSONL file mirror real
   locally; it is inert in production builds.

7. **Hidden dashboard** — `src/pages/admin/insights.astro`. Secret-gated page that
   fetches `/api/events` and renders the visualization + filtering UI. Not linked
   in nav; follows the existing `/admin` page conventions.

## 6. Dashboard / visualization

Rendered client-side from the fetched event set. **No chart library** — hand-rolled
inline SVG + vanilla JS to keep the dependency-light stack. `/frontend-design`
pass will style it to match the site's glass-card aesthetic.

- **KPI tiles:** total events, unique visitors (by session), distinct countries,
  top page, events in last 24h.
- **World map:** dependency-free inline SVG world outline with visitor points
  plotted by lat/lng, sized by frequency.
- **Time series:** visits over time (hand-rolled SVG line/area, range-selectable).
- **Breakdown bars:** top pages, referrers, browsers, OS, device types, countries,
  ISPs.
- **Behavior:** most-clicked links, landing-page distribution.
- **Raw event table + advanced filtering:** date-range, country, page, browser,
  device type, referrer, free-text search; facets combine (AND); sortable columns;
  **CSV export** of the current filtered set. Filtering is instant, client-side over
  the loaded dataset.

## 7. Security / hidden access

- `/admin/insights` and `/api/events` require a shared secret `INSIGHTS_TOKEN`
  (Cloudflare Pages env var; local `.dev.vars` / env for dev).
- Flow: visiting `/admin/insights?key=<token>` validates and sets a session cookie;
  the page and the events API check the cookie/header. Wrong/absent token → minimal
  "not found"-style response (no data, no hint).
- `/api/collect` stays open (it must accept anonymous beacons) but is write-only and
  rate-limit-friendly (small body cap, origin check).
- Route is unlisted — not added to nav, sitemap, or discovery surfaces.

## 8. Privacy (decision: note it, no consent UI)

- Collection is silent. IP + geo + fingerprint are personal data under GDPR/
  ePrivacy; the site owner accepts responsibility.
- Deliverable: `docs/visitor-analytics-privacy.md` documenting what is collected,
  the legal exposure, a recommended privacy-policy paragraph, and how to disable
  collection (remove the beacon line) or anonymize IPs later if desired.

## 9. Files

```
functions/api/collect.ts              new  — capture + enrich + store (prod)
functions/api/events.ts               new  — secret-gated read (prod)
functions/_shared/storage.ts          new  — KV + in-memory backends
functions/_shared/enrich.ts           new  — UA/geo parsing + field whitelist
src/integrations/analytics-dev.ts     new  — dev Vite middleware (JSONL file mirror)
public/scripts/beacon.js              new  — client collector
src/layouts/BaseLayout.astro          edit — inject beacon on public pages only
src/pages/admin/insights.astro        new  — hidden dashboard (viz + filters)
astro.config.mjs                      edit — register dev integration
wrangler.toml                         new  — KV binding for `wrangler pages dev`
.analytics/.gitignore                 new  — ignore local event data
docs/visitor-analytics-privacy.md     new  — privacy/legal note
```

## 10. Out of scope (YAGNI)

- Real authentication / user accounts (shared secret is sufficient).
- Real-time streaming dashboard / websockets (dashboard fetches on load).
- Bot filtering, GeoIP beyond Cloudflare's, server-side aggregation jobs.
- Consent banner (explicitly declined for now).

## 11. Testing / verification

- Dev: run `astro dev`, load public pages, confirm `.analytics/events.jsonl` grows
  with correctly-shaped events; force a file error and confirm warn + in-memory
  continuation.
- Dashboard: load `/admin/insights?key=…`, verify tiles/map/charts/table render and
  that each filter + CSV export works against seeded events.
- Prod path: `wrangler pages dev dist` with a KV binding, confirm collect writes to
  KV and events reads back; confirm geo fields populate from `request.cf`.
- Secret gating: confirm wrong/missing token yields no data on both the page and
  the events API.
