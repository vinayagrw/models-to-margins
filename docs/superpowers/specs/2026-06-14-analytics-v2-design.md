# Visitor Analytics v2 — Design Spec

> Status: **Approved design, pending implementation plan.** Date: 2026-06-14.
> Supersedes the v1 dashboard (`src/pages/admin/insights.astro`, `public/scripts/insights*.js`).
> Privacy posture unchanged: first-party only, "note it, no consent banner" (see `docs/visitor-analytics-privacy.md`), now extended for new fields (§9).

## 1. Goal

Turn the hidden visitor dashboard from a flat event table + a few bars into a
filterable analytics console covering four goal areas — **acquisition, engagement,
technical/performance, and data quality (bot filtering)** — without changing the
storage backend. Almost all intelligence is **derived in the browser from raw events**;
only four new low-impact signals require a richer beacon payload.

## 2. Non-goals (YAGNI)

- No server-side aggregation/rollup yet (documented as a future path, §8).
- No consent UI / cookie banner (unchanged posture).
- No new storage engine — events stay opaque JSON blobs in KV (prod) / JSONL (dev).
- No real-time streaming; dashboard is pull-on-load + re-filter.
- No multi-tenant / multi-site support.

## 3. Architecture — five layers (backend untouched)

```
beacon.js (collect)  ──POST──>  /api/collect ──> sanitizeClient ──> KV / JSONL
                                                                       │
/admin/insights  <──GET── /api/events (token-gated) ───────────────────┘
   │
   ├─ insights-derive.js   pure: raw events → annotated events + sessions + bot flags
   ├─ insights-store.js    central filter state (facets, presets, bot toggle, selection, URL sync)
   ├─ insights-viz.js      chart components: (rows, opts) → SVG/HTML + click→store
   └─ insights.astro       shell: sticky controls + sectioned/tabbed layout
```

1. **Collection** — `beacon.js`, extended payload (§5).
2. **Ingestion** — `functions/_shared/enrich.js` `sanitizeClient`, extended allowlist + caps.
3. **Derivation** *(new)* — `public/scripts/insights-derive.js`, pure + unit-tested.
4. **Cross-filter store** *(new)* — `public/scripts/insights-store.js`.
5. **Visualization** — `public/scripts/insights-viz.js` (expanded) + `insights.js` (filter wiring → store) + `insights.astro` (shell).

### Library delivery (resolves Gap 2)
`/public/scripts/*` are unbundled `is:inline` IIFEs — npm `import` does not resolve there.
The three libs below are **vendored as pinned minified files** under
`public/scripts/vendor/` and **lazy-loaded only on `/admin/insights`** (never shipped
to public pages). Each is loaded by injecting a `<script>` tag on demand, then the chart
renders once `window`-level globals are present.

| Lib | Use | Approx size |
|-----|-----|-------------|
| `d3-geo` (geoNaturalEarth1 + geoPath) | choropleth projection | ~30 KB |
| `topojson-client` + `countries-110m.json` | country polygons | ~110 KB |
| `web-vitals` (attribution build not needed) | LCP/INP/CLS/TTFB/FCP | ~2 KB |

`web-vitals` is the only lib also loaded on **public pages** (it must run there to
measure). It is tiny and loaded `async`. The geo libs are admin-only.

## 4. Derivation & classification (`insights-derive.js`, pure, tested)

Run **once** after `/api/events` load; annotate each event in place, then filters/charts
operate on annotated events (resolves Gap 3 — no per-keystroke re-derivation).

- **Visitor identity:** the beacon `session` field is a **permanent device id** →
  treat as `visitorId`. (Resolves Gap 1.)
- **Sessionization:** group by `visitorId`, order by `ts`, **start a new session after
  ≥30 min inactivity**. Per session derive: `sessionId`, page count, duration
  (last−first ts), `entryPath`, `exitPath`, `bounce` (1 pageview). Ignore beacon's
  `entry`/`visitCount` for these — derive them.
- **New vs returning:** `returning` if the `visitorId` appears in events older than the
  current window's start (or has >1 session in window).
- **Bot scoring** → `isBot` + `botReasons[]`: hosting/datacenter ASN, known-bot UA
  substrings, missing canvas+webgl fingerprint, and impossible timing (many events,
  ~0 ms apart). Confidence = count of reasons; `isBot` when ≥2.
- **Referrer categorization** → `refClass`: `direct` (empty), `search`, `social`,
  `referral` (other host), `internal` (same host) — by referrer hostname lookup table.
- **Local hour** → `localHour` (0–23) from `geo.timezone` when present, else event tz
  falls back to the client-reported `tz` (new beacon field §5), else UTC. Drives the
  day×hour heatmap.
- **Outbound classification** (resolves Gap 7): each `behavior.clicks[]` href whose host
  ≠ site host is `outbound`. "Top outbound links" uses only those.

All functions are pure `(events) → annotated` / `(events) → sessions` with
`test/derive.test.js` covering: 30-min split, bounce, new/returning, bot reasons,
referrer classes, local-hour fallback chain, outbound detection.

## 5. New signals collected (`beacon.js` + `sanitizeClient`)

Added to the **`flush()`** payload (so vitals/scroll/active-time finalize on page-hide):

| Field | Source | Cap / note |
|-------|--------|-----------|
| `behavior.scrollDepth` | max % of page scrolled | 0–100; short pages flagged `fullViewport:true` (Gap 10) |
| `behavior.activeTime` | ms page was visible **and** focused | accumulates between visibility/focus events |
| `behavior.rageClicks` | ≥3 clicks within 1s within ~30px | count + up to 5 sample `{selector,text}` |
| `behavior.deadClicks` | clicks on non-link/non-button causing no nav/DOM change | heuristic; count + up to 5 samples |
| `perf` | `web-vitals`: `{ lcp, inp, cls, ttfb, fcp }` | numbers or `null`; INP/CLS often null on fast bounce |
| `errors[]` | `onerror` + `unhandledrejection` | cap 10; **sanitized** (§9): strip query strings & file paths, msg ≤200 chars |
| `tz` (top-level) | `Intl.DateTimeFormat().resolvedOptions().timeZone` | reliable client tz for heatmap fallback |

`sanitizeClient` extends its allowlist for `scrollDepth`, `activeTime`, `rageClicks`,
`deadClicks` (+ samples), `perf` (numeric-only pick), `errors` (sanitized, capped 10),
and top-level `tz`. All other fields rejected as today.

## 6. Cross-filter engine (`insights-store.js`)

Single source of truth (resolves Gap 10). State:

- multi-select facets: country, browser, device, OS, page, refClass
- date range + **presets**: Today / 7d / 30d / All
- search text (debounced ~150 ms)
- **exclude-bots** toggle (default on)
- time-series **group-by** + granularity (hour/day/week)
- **selection**: set added by clicking any chart segment

Behavior:
- Clicking a chart segment **filters the whole dashboard** (charts + table + KPIs).
- **Active-filter chips** above the grid; click a chip to remove that filter.
- **URL-encoded state** (`history.replaceState`) → shareable/bookmarkable views; active
  tab included.
- `applyFilters(annotatedEvents, state) → events` is pure, with `test/store.test.js`
  (facet AND/OR semantics, preset→range, bot exclusion, reducer add/remove/reset, URL
  round-trip).

`insights.js` is refactored so the existing `<select>`/date/search inputs and the new
chart-click filters both dispatch into this one store.

## 7. Chart catalog (hybrid build) & dashboard IA

Sticky global control bar (presets, exclude-bots, search, active-filter chips) above a
**sectioned/tabbed** layout: **Overview · Audience · Engagement · Technical · Performance ·
Data Quality**. Tab id is part of URL state. Every chart null-guards missing fields and
shows **"Not collected yet"** instead of misleading zeros (resolves Gap 8).

| Chart | Section | Source | Build |
|-------|---------|--------|-------|
| KPI band (events, visitors, **bounce %, avg session, pages/session, bot %, error count**) | Overview | derive | hand-roll |
| Visits over time (group-by + granularity) | Overview | ts | hand-roll |
| Geo choropleth + country→city drilldown | Audience | geo + d3-geo | **lib** |
| Day×hour activity heatmap (local time) | Audience | localHour | hand-roll |
| New vs returning donut | Audience | derive | hand-roll |
| Referrer sources (direct/search/social/referral) | Acquisition→Audience | refClass | hand-roll |
| Top pages / Top outbound links | Audience | clicks | hand-roll |
| Browser × OS matrix | Technical | device | hand-roll |
| Time-on-page + scroll-depth histograms | Engagement | behavior | hand-roll |
| Core Web Vitals (good/needs-work/poor bands, null-aware) | Performance | perf | hand-roll |
| JS errors (recent + trend) | Data Quality | errors | hand-roll |
| Bot share + reasons breakdown | Data Quality | derive | hand-roll |

**A11y + mobile (resolves Gap 9):** heatmap and choropleth each ship an `aria-label`
summary and a visually-hidden data table; under ~720px the choropleth collapses to a
ranked country list and the heatmap to a top-active-hours list.

## 8. Volume ceiling (resolves Gap 5)

`/api/events?limit=5000` still caps history. The dashboard **displays "showing N of M
events"** and flags when the window is truncated (no silent skew). Future path documented,
**not built now:** a daily rollup written to a second KV key (`rollup:YYYY-MM-DD`) that the
dashboard prefers for old ranges and uses raw events only for the recent window.

## 9. Privacy delta (resolves Gap 6) — update `docs/visitor-analytics-privacy.md`

Add to the "what's collected" table: persistent `visitorId` (now explicitly an identity),
`perf`, `scrollDepth`, `activeTime`, rage/dead clicks, and **`errors[]`**. Mitigations:

- **Errors sanitized at the beacon**: strip query strings and absolute file paths, cap
  message length, drop stack traces; never send input values.
- **Clicks/rage/dead samples** store selector + visible text only, never field values.
- **Honor GPC**: if `navigator.globalPrivacyControl === true`, the beacon **skips
  collection** entirely (cheap good-faith signal; documented).
- Reaffirm: no cross-site identifiers, no third parties, IP shown only in the gated
  dashboard.

## 10. File structure

**New**
- `public/scripts/insights-derive.js` — annotation + sessions + bot/referrer/local-hour/outbound
- `public/scripts/insights-store.js` — filter state, reducer, URL sync, `applyFilters`
- `public/scripts/vendor/d3-geo.min.js`, `topojson-client.min.js`, `countries-110m.json`, `web-vitals.iife.js` (pinned)
- `test/derive.test.js`, `test/store.test.js`

**Modified**
- `public/scripts/beacon.js` — new signals (§5), web-vitals hookup, GPC skip, tz
- `functions/_shared/enrich.js` — `sanitizeClient` allowlist + caps for new fields
- `public/scripts/insights-viz.js` — expanded chart catalog, choropleth/heatmap, null-aware
- `public/scripts/insights.js` — filter wiring → store, derivation call, debounce, "N of M"
- `src/pages/admin/insights.astro` — sticky controls, tabs/sections, chip bar, lazy lib loader, styles
- `docs/visitor-analytics-privacy.md` — §9 additions

## 11. Delivery phases (each independently shippable)

- **Phase A — Intelligence from existing data (no beacon change):** derivation module +
  store + reorganized shell + exclude-bots toggle + cross-filtering + every chart needing
  no new signal (choropleth+drilldown, heatmap, sessions/bounce KPIs, referrer split,
  new/returning, browser×OS, top pages/outbound, bot share). Huge upgrade, zero risk to
  public pages. Vendored geo libs land here.
- **Phase B — New signals + their charts:** extend `beacon.js` + `sanitizeClient`; add
  scroll/active-time engagement histograms, Core Web Vitals, JS errors, rage/dead-click
  friction; web-vitals vendored; privacy doc updated.

## 12. Testing

- `node --test` (already configured). New: `test/derive.test.js`, `test/store.test.js`
  (pure-function coverage per §4/§6). Existing `enrich` tests extended for new
  `sanitizeClient` fields. Manual dashboard verification via Preview MCP against seeded
  mock data.

## 13. Mock data (temporary)

The dev JSONL is seeded with synthetic events (cities w/ coords, varied UA/pages/referrers,
timestamps across days) so charts render on localhost where `request.cf` geo is absent.
**This is a temporary dev aid and will be removed** before the branch is finished; it is
git-ignored (`.analytics/`). Phase B mock events will also carry the new signal fields so
the new charts render locally.

## 14. Open gaps explicitly accepted

- Dead-click detection is heuristic and may under/over-count; scoped narrowly and labeled.
- Volume ceiling remains until rollups are built (§8); surfaced in UI, not hidden.
- Bot scoring is heuristic (no server-side bot DB); reasons shown for transparency.
