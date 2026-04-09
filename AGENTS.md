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

- `src/content/deep-dives/future-of-work-2026.md` is the reference style for a premium editorial deep dive.
- Reuse these CSS patterns for future high-value deep dives:
  - `.note-panel`
  - `.signal-grid`
  - `.reading-map`
  - `.callout`
  - `.thesis-grid`
  - `.decision-grid`
  - `.action-grid`
  - `.stack-list`
- Keep section summaries and jump links useful, not decorative.
- Long source sections should use collapsible blocks to keep the main reading flow clean.

## Raw Visuals

- Raw HTML visuals live under `public/visuals/...`
- Raw visuals are embed infrastructure for live briefs and deep dives, not a public collection by default.
- Do not add `src/content/visuals` metadata or visual wrapper routes unless a task explicitly asks for that model.
- Standalone visuals should include the shared `Models to Margins / Business-first AI research and operating maps` header bar.
- Standalone visuals should include a back link
- Standalone visuals should link back to their owning brief or deep dive, not to a visual index.
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

## Private AI Control Plane

- The branch layout should read left-to-right, not top-to-bottom
- Keep the routing explicit:
  - `Model Router -> Private Inference -> Private GPU`
  - `Model Router -> Premium Inference -> Managed APIs`
- Preserve theme sync, focus sync, zoom, and pan behavior
- Keep the supporting visual free of any panel-level dark/light toggle
- In standalone mode, use the shared site header and an inline `Back to Brief` link above the poster

## Docs

- Canonical Cloudflare guide: `docs/cloudflare-pages-setup.md`
- Visibility guide: `docs/admin-visibility-how-to.md`

## Validation

- Run `npm run build` from `C:\Users\viagr\Documents\Vinay\git\models-to-margins` before closing the task
- If the change touches theme, metadata, routing, visibility, or raw visuals, verify the affected pages after the build
- If the change touches visibility, verify `/admin/visibility` and any affected discovery surfaces after the build
- If the change touches long-form Markdown content, inspect the built HTML for malformed list rendering, broken `details/summary` blocks, or encoding artifacts
