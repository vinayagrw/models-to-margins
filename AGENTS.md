# AGENTS.md

## Canonical Repo

- Work only in `C:\Users\viagr\Documents\Vinay\git\models-to-margins`
- Do not edit the older copy under `C:\Users\viagr\Documents\Personal\models-to-margins`
- Treat `https://models-to-margins.vinayagrw.workers.dev` as the current canonical public hostname
- Keep internal links, raw-visual paths, iframe sources, and back links root-relative unless a task explicitly requires an absolute URL

## Shared Site Rules

- Home page styling is the source of truth for theme, typography, spacing, and header behavior.
- Keep the shared header behavior aligned with the committed public pattern: `About` remains visible as a disabled grey nav pill unless a task explicitly changes that product choice.
- Reuse shared public components whenever possible:
  - `src/layouts/BaseLayout.astro`
  - `src/components/EntryMeta.astro`
  - `src/components/BackLink.astro`
  - `src/components/ThemeToggle.astro`
  - `src/components/SiteHeader.astro`

## Public Page Structure

- Public detail pages should keep this order near the top:
  - eyebrow
  - title
  - summary
  - back link
  - metadata chips
- Metadata chip order:
  - date
  - primary context
  - read time
  - optional extra chip only when needed

## Briefs And Deep Dives

- `/briefs` is the Brief collection
- `/deep-dives` is the Deep Dives collection
- Keep labels, links, and descriptions consistent with those routes
- Public collections are `/briefs` and `/deep-dives` only.
- There is no public `/visuals` collection right now. Do not add a public visual index, visual nav item, or `/visuals/[slug]` wrapper route unless a task explicitly asks for it.
- Interactive or immersive experiences should live under `/briefs/*`, not under a separate visual surface.
- Article briefs should use the shared standard brief shell by default.

## Current Public Model

- Raw files under `public/visuals/...` are implementation infrastructure and optional direct static files, not promoted app destinations by default.
- Do not treat a raw asset path under `/visuals/...` as the canonical public route when a brief route exists for the experience.
- Do not add a public visual discovery surface back into nav, homepage, indexes, or featured slots unless a task explicitly asks for that product reversal.

## Brief Route Ownership

- `governed-procurement-ai` must resolve to `/briefs/governed-procurement-ai`.
- `/briefs/governed-procurement-ai` is a full-takeover brief host for `public/visuals/procurement-ai/command-center.html?embed=1`.
- Do not reframe governed procurement back into a side-panel editorial live brief with supporting cards, article content, or a public raw-asset CTA unless explicitly requested.
- `private-ai-vs-public-ai` remains a framed custom live brief under `/briefs/private-ai-vs-public-ai`, not a raw-asset redirect.
- `ai-for-corporate-clarity` remains a framed custom live brief under `/briefs/ai-for-corporate-clarity`, not a raw-asset redirect.

## Linking Rules

- Managed app discovery must link interactive briefs through `getBriefHref(...)` or the equivalent brief-route helper, never directly to raw asset paths.
- Homepage featured cards, brief index cards, and any managed internal brief promos must point to the public brief route.
- Do not add public CTAs from app surfaces to `/visuals/procurement-ai/command-center.html`.
- Standalone raw assets must link back to their owning brief or deep dive, never to a visual index.

## Do Not Regress

- Do not reintroduce wrapped visual routes for governed procurement.
- Do not alternate between raw `/visuals/...` destinations and `/briefs/...` destinations for the same public experience.
- If a brief route is the intended public entry point, preserve that route as the app-facing destination and keep raw assets behind it.

## Visibility And Discovery

- App-level discovery visibility is controlled by `src/data/app-visibility.json`
- Use the shared helpers in `src/utils/site-data.ts` and `src/utils/routes.ts` for route IDs, hrefs, and effective visibility
- Do not add new app discovery surfaces with ad hoc `listed` filters; use the shared visibility helpers so nav, homepage sections, indexes, and featured slots stay consistent
- Hidden from app means removed from discovery surfaces only; direct URLs still remain live unless the route itself is removed
- Homepage featured surfaces should keep consistent card sizing and structure across the active public collections.

## Editorial Content Rules

- Prefer modern Markdown plus semantic HTML blocks inside collection content before introducing new runtime dependencies.
- For flagship Deep Dives, do not leave the page as plain long-form prose if the material supports stronger structure.
- The preferred pattern for state-of-the-art editorial pages is:
  - top note panel for run date / scope / source policy
  - signal or thesis cards near the top
  - reading map / jump links
  - callouts for core thesis and framing
  - collapsible `details/summary` sections for long ranked sections or source appendices
  - styled grids for decision frameworks such as durable vs hype or learn / build / invest / avoid
- Keep the prose factual and high-signal, but use design structure to improve navigation and scanability.
- Reuse the shared article shell and shared CSS vocabulary; do not build one-off page-specific article layouts unless the page is intentionally immersive.
- Default to ASCII in Markdown content unless there is a clear reason not to.
- If semantic HTML is embedded inside Markdown, verify that Astro renders the surrounding Markdown lists and paragraphs as intended after build.

## Deep Dive Presentation

- `src/content/deep-dives/future-of-work-2026.md` is the reference style for a premium editorial deep dive backed by small inline data-vis iframes.
- `src/content/deep-dives/harness-engineering.md` is the reference style for a premium deep dive that embeds a family of larger interactive visuals (10x iframes between 520-680px tall) inline within the same article-shell pattern. Use it when the deep dive carries a coordinated visual narrative.
- Reuse these CSS patterns for future high-value deep dives:
  - `.note-panel`
  - `.signal-grid`
  - `.reading-map`
  - `.callout`
  - `.thesis-grid`
  - `.decision-grid`
  - `.action-grid`
  - `.stack-list`
  - `.visual-frame` with `style="--vf-h:<px>"` for inline iframes
- Keep section summaries and jump links useful, not decorative.
- Long source sections should use collapsible blocks to keep the main reading flow clean.
- For named principles, keep visible terminology consistent across the markdown and every embedded visual. The harness-engineering deep dive uses "The Agentic Principle" everywhere visible to the reader; CSS class names that reference an older term are kept for stability but visible text never reintroduces it.

### Optional slide-deck sub-route

- A deep dive may have an optional alternate presentation at `src/pages/deep-dives/<slug>/present.astro` (a static Astro route that lives in a sub-directory matching the slug).
- The article-shell page at `/deep-dives/<slug>` is always the canonical entry point — it stays in the site index, navigation, and OG metadata.
- The `/present` sub-route is for single-viewport, keyboard-navigable slide-deck consumption (talks, screen shares). It must:
  - Bypass `BaseLayout` to take the full viewport (slim custom chrome only).
  - Reuse the same `public/visuals/...` iframes as the canonical article — never fork the visuals.
  - Link back to the canonical article (`/deep-dives/<slug>`), not to the deep-dives listing, so users return where they came from.
  - Be discoverable from the article via a small inline link inside the article's `note-panel` block.
- Reference: `src/pages/deep-dives/harness-engineering/present.astro` and the matching link inside `src/content/deep-dives/harness-engineering.md`.
- Do not promote the `/present` URL as the canonical share URL; the article-shell page is canonical.

## Raw Visuals

- Raw HTML visuals live under `public/visuals/...`
- Raw visuals are embed infrastructure for live briefs and deep dives, not a public collection by default.
- Do not add `src/content/visuals` metadata or visual wrapper routes unless a task explicitly asks for that model.
- Standalone visuals should include the shared `Models to Margins / Business-first AI research and operating maps` header bar.
- Standalone visuals should include a back link
- Standalone visuals should link back to their owning brief or deep dive, not to a visual index.
- The back link is standalone-only chrome: it must be hidden in embed mode so it does not double up with the Astro host's own back nav. Use an embed-scoped rule next to the other chrome-hide rules — `:root[data-embedded="true"] .back-link{display:none}` (or `html[data-embedded="true"] .back-link{display:none}` for visuals that key embed state off `<html>`).
- Embedded chart fragments that are *only ever* iframed (e.g. the harness-engineering / future-of-work data-vis families) must NOT get a back link — the owning article/brief provides navigation. Only full standalone briefs get the inline `Back to Brief` link.
- `?embed=1` is the standard integration mode for brief-hosted visuals.
- Hide standalone-only chrome when `?embed=1` is present
- Embedded visuals should respond to the shared site theme
- Keep the raw asset directly available on disk, but do not surface it as the primary public experience when the brief route is the intended entry point.
- Do not place back links as fixed overlays on top of diagram content; place them inline above the main stage or poster.
- Keep zoom controls consistent across raw visuals:
  - `-`
  - `+`
  - `Reset`
- If a raw visual is embedded in another page, keep theme toggles out of the visual panel itself; the shared page shell is the theme control surface.
- Use the same surrounding UI typography as the home page and shared shell. Special SVG title treatments are optional, but the page chrome should not drift.

### Visual families (shared theme + bootstrap)

- When a deep dive or brief embeds a coordinated family of visuals (e.g. the 10 visuals under `public/visuals/harness-engineering/`), put the shared CSS tokens and shared theme bootstrap into two underscore-prefixed files in the same directory:
  - `_theme.css` — color tokens, body background, base typography, layer/tone variables, embed-mode shell rules
  - `_theme-bootstrap.js` — the synchronous theme/embed-init IIFE that reads `?theme=`, `?embed=1`, and `localStorage`, then sets `data-theme` and `data-embedded` on `<html>`
- Each visual in the family loads them via `<link rel="stylesheet" href="./_theme.css">` and `<script src="./_theme-bootstrap.js">` — eliminates ~200 lines of duplicated theme code per visual.
- Use `:root[data-embedded="true"]` selectors with `clamp(min, vh-based, max)` font sizes and padding so each visual scales fluidly inside whatever iframe height the host page assigns. Do not hard-code pixel sizes that assume a single iframe height.
- Family visuals must use the site's typography (`Space Grotesk` for body and headings) — do not introduce display fonts that the rest of the site does not use.

## Private AI Control Plane

- The branch layout should read left-to-right, not top-to-bottom
- Keep the routing explicit:
  - `Model Router -> Private Inference -> Private GPU`
  - `Model Router -> Premium Inference -> Managed APIs`
- Preserve theme sync, focus sync, zoom, and pan behavior
- Keep the supporting visual free of any panel-level dark/light toggle
- In standalone mode, use the shared site header and an inline `Back to Brief` link above the poster

## Content Pipeline — Margin Reckoning & Next Candidates

This section captures the active AI-led-SDLC content line so the next brief or deep dive can build on it instead of re-deriving it.

### Shipped: The Margin Reckoning (brief)
- Raw visual: `public/visuals/ai-led-sdlc/the-margin-reckoning.html` (self-contained interactive brief; Fraunces display + Space Grotesk body + DM Mono numerals; light/dark tokens).
- Thesis: *"AI multiplied the output. The margin didn't move."* Output was never the scarce thing — AI moved the bottleneck onto human review; value only reaches the P&L when work is governed, reviewed, and measured at business altitude.
- Host page: `src/pages/briefs/ai-led-sdlc.astro` frames the raw visual at `?embed=1`.
- **Scroll model (do not regress): the BROWSER owns the scroll — one scrollbar, not two.** The host script grows the iframe to its full content height (`sizeToContent` reads the same-origin `contentDocument.scrollHeight` on load + after fonts/count-ups settle + via a `ResizeObserver`), so the whole page scrolls as a single document. The brief must NOT keep its own inner scrollbar:
  - In embed mode the brief's hero is `min-height:auto` (NOT `100vh`) — a `100vh` hero re-inflates the frame and brings back the inner/double scrollbar feedback loop.
  - The host `.sdlc-brief-host__stage` keeps `overflow:hidden`; the iframe's `height:100vh` is only a pre-JS fallback.
  - Do not switch this host back to a pinned-viewport / iframe-owns-scroll model (that reverses an explicit product decision and reintroduces the double scrollbar).
- Hero summary on the host stretches to full container width (`justify-self:stretch; max-width:100%; text-wrap:pretty`) so it wraps into the fewest lines instead of a narrow column — the hero grid is `justify-items:start`, so any prose that should run full-width needs the `justify-self:stretch` override.
- Companion LinkedIn assets:
  - `public/content/linkedin-the-margin-reckoning-post.md` — the developed "house" post (the voice/quality bar).
  - `public/content/linkedin-the-margin-reckoning-options.md` — five alternate post shapes (short / story-led / CFO / concede-then-deny / counter-metric-led) for different audiences and posting moments.
  - `public/content/linkedin-post-playbook.md` — writing rules (refreshed for 2026 distribution: interest-graph, dwell time, ≥15-word comment weight, saves, and the link/first-comment penalty). Now also carries reusable hook frameworks — **Concede-then-deny** ("AI genuinely accelerates three things. None of them is the margin.") and **Story-specificity beats the stat**.

### Source policy for this content line
- **2026-dated sources only, with METR (2025) as the single deliberately-labelled exception** (the only published randomised trial on the question).
- Widely-cited figures that lack a 2026 primary (e.g. the MIT ~95% pilot-failure stat) are **named inline as context, not added to the numbered source list.**
- Interactive-panel magnitudes are labelled **illustrative**; cited hero/stat numbers must match the source they footnote (e.g. Faros hero = epics +66% / throughput +34%, not illustrative figures).
- Canonical 2026 source set already vetted: NVIDIA *State of AI 2026* (88% feel revenue lift / small-minority P&L), Deloitte *State of AI in the Enterprise 2026*, DORA *ROI of AI-Assisted Software Development 2026.01* (~39% Y1 ROI, 8-month payback, J-curve), Stack Overflow *Closing the AI trust gap, Feb 2026* (trust ~40%→29%, 66% fixing almost-right code), Faros *AI Engineering Report 2026 — Acceleration Whiplash* (22k devs; review time ~+200%; 31% more code ships unreviewed; churn +861%), plus METR 2025 (~19% slower vs. expectation).
- **METR currency caveat (verified June 2026):** the "~19% slower" figure is the *2025* RCT and is now stale. METR's own early-2026 continuation (posts 2026-02-24 and 2026-05-11) narrowed the measured effect to ~−4% (CI −15% to +9%, not statistically significant) and concluded AI "likely provides productivity benefits." Do **not** state "~19% slower" as the current magnitude in new content. The durable, defensible claim is the **perception-vs-measurement gap** (developers' felt speedup ran ahead of the measured result in both cohorts) — anchor on that, not the size. `linkedin-...-options.md` Option 7 is the corrected reference build; Options 1–6 and the brief's perception-gap scene keep the 2025 figure but must be read as historical/2025-labelled.

### Next brief / deep-dive candidates (from this research)
> **Update (June 2026):** three of these were built directly into the Margin Reckoning brief as new interactive scenes — **15 *The Translation Story*** (tabbed code walkthrough: AI translates a legacy tax engine, silently drops a 1999 edge case, a human restores it — "Copilot, not Autopilot"), **16 *The Reality Check*** (opportunity bars vs. a governance/risk matrix, with a "Run the reckoning" simulation that lands output at 100% and verified value at ~69%), and **17 *Empirical Outcomes*** (an ROI J-curve SVG plus governed-vs-ungoverned case cards). Each remains viable as a *standalone* deep dive if expanded beyond the in-brief scene.
- **The Review Bottleneck** (deep dive): reviewer capacity as the true rate-limiter of fleet throughput — anchored on Faros (+200% review time, 31% unreviewed). Seeded by scene 16's governance matrix; a deep dive could go past the single panel.
- **The Measurement Trap** (brief): every speed metric paired with a counter-metric; instrument the margin not the output. Anchored on METR's perception-vs-fact gap and DXI.
- **The J-Curve / Tuition Cost** (brief or data-vis): DORA's first-year dip before the ~39% ROI; why weak platforms lose the gains "in downstream chaos." Now visualized in scene 17's ROI payback curve — a standalone data-vis could deepen it.
- **Trust Debt** (brief): Stack Overflow's falling-trust-amid-rising-adoption curve and the cost of "almost-right" AI code on the junior rung.
- **Interactive decision/story patterns**: shipped as scene 14 (*The AI Dilemma* — meter-based pick-a-path) and scene 15 (*The Translation Story* — code-walkthrough storyline) of the brief; both are reusable patterns for future briefs (style cue from thegreatmodernization.pages.dev's interactive storyline).

### Editorial cues carried forward
- Keep the credibility layer (footnote `sup.fn` markers → numbered source list + glossary links) on any brief making quantified claims.
- Keep the exec scannability layer (TL;DR band, dot-nav, counter-metric pairs) — it is what makes these briefs CFO-readable.
- Interactive scene controls must carry real a11y wiring. Tabbed walkthroughs (e.g. scene 15's code story) use `role="tab"`/`role="tablist"` triggers paired to `role="tabpanel"` panels via matching `id` ↔ `aria-controls` ↔ `aria-labelledby`, with `tabindex="0"` on panels and `aria-selected` tracking the active tab. Animated count-ups and width fills must guarantee final values even if rAF is throttled — every rAF tween needs a `setTimeout(settle, dur+~300ms)` fallback (the canonical `runCount` pattern), so a reader who scrolls away mid-animation still lands on the true number.
- New `.reveal` / `[data-count]` / `[data-w]` elements auto-wire into the existing IntersectionObserver; new scenes only need a unique `id` and a matching `NAV` entry to join the dot-nav. Scene order in the DOM must match the `NAV` array order.

## Docs

- Canonical Cloudflare guide: `docs/cloudflare-pages-setup.md`
- Visibility guide: `docs/admin-visibility-how-to.md`

## Validation

- Run `npm run build` from `C:\Users\viagr\Documents\Vinay\git\models-to-margins` before closing the task
- If the change touches theme, metadata, routing, visibility, or raw visuals, verify the affected pages after the build
- If the change touches visibility, verify `/admin/visibility` and any affected discovery surfaces after the build
- If the change touches long-form Markdown content, inspect the built HTML for malformed list rendering, broken `details/summary` blocks, or encoding artifacts
