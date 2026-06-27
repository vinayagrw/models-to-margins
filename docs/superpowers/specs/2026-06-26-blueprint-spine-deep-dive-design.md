# Blueprint Spine — flagship redesign of the metric-chain deep-dive

**Date:** 2026-06-26
**Status:** Approved (design), pending spec review
**Scope:** A bespoke "flagship" template applied to **one** deep-dive — `from-models-to-margins-metric-chain` — without changing any other deep-dive.

---

## 1. Problem & motivation

The deep-dive at `src/content/deep-dives/from-models-to-margins-metric-chain.md` currently renders through the shared `[slug].astro` + `global.css` system. Two issues:

1. **An accidental aesthetic.** `global.css` has a sweeping rule — `.article-body :not(pre > code) { display:inline-block; padding; border; background; font-family: monospace }` — that boxes nearly every element and renders the whole article in Cascadia Code. The page reads like a terminal printout by accident, not intent.
2. **Fragile label selectors.** Card labels use *descendant* selectors (`.thesis-card strong`, `.thesis-card em`, `.callout strong`) set to `display:block`. These also catch inline emphasis inside body `<p>`, turning words like *in advance* / *NOT* into full-width blocks. Three separate instances of this bug have already been hit and patched with `> child` scoping.

The page also now carries **11 interactive visuals** and a strong conceptual through-line: a five-layer metric pyramid joined by a leaky **chain**. The redesign should give it a deliberate, distinctive identity that *embodies* that chain.

## 2. Chosen direction: Blueprint Spine

A light **drafting-paper / technical-drawing** aesthetic in which a **vertical chain-spine** runs down the article and threads all nine scenes as nodes. The layout itself becomes the metric chain. Selected over an editorial-journal direction (A) and a dark telemetry-console direction (B) after a 3-way visual mockup comparison.

## 3. Architecture (isolation-first)

```
frontmatter:  template: blueprint           # opt-in flag, this article only
   │
[slug].astro: if data.template === 'blueprint'
   │             → wrap <article> in class "dd-blueprint"
   │             → <link> deep-dive-blueprint.css
   │             → include spine scroll-spy script
   ▼
deep-dive-blueprint.css   (all rules scoped under .dd-blueprint)
spine.js                  (scroll-spy + load orchestration, no-op if reduced-motion)
```

- **No global CSS edits** beyond what is already patched. Blueprint rules live in their own file, every selector prefixed `.dd-blueprint …`, so they cannot leak to other pages and they *override* the global chip/label rules within scope.
- **Reversible:** removing the frontmatter flag returns the page to the default system.

### Units (each independently understandable)

| Unit | Responsibility | Depends on |
|---|---|---|
| `template` frontmatter flag | Opt a single article into the template | content schema (already permissive) |
| `[slug].astro` branch | Apply wrapper class + assets when flag set | flag |
| `deep-dive-blueprint.css` | All visual styling, scoped to `.dd-blueprint` | design tokens below |
| `spine.js` | Scroll-spy node activation + load reveal | `.dd-blueprint` DOM, `prefers-reduced-motion` |
| Visual re-theme | Light palette + blueprint accent for the 11 embeds | `_theme.css` light mode, `_theme-bootstrap.js` theme param |

## 4. Design tokens

```
--bp-paper-1: #eef2f7;   --bp-paper-2: #e7edf4;   (page gradient)
--bp-ink:     #16233b;   --bp-ink-2:   #3c4a63;    (text)
--bp-line:    #1b3a6b;   (grid + spine, used at low alpha for grid)
--bp-accent:  #e0832a;   (nodes, arrow, live tags, key emphasis)
layer ticks:  --biz/--ux/--out/--mod/--sys reused from _theme.css, muted
fonts: Syne (display 700/800), IBM Plex Sans (body 400/500), IBM Plex Mono (labels)
```

Contrast: `--bp-ink` on paper ≈ 13:1; `--bp-ink-2` ≈ 7:1; accent reserved for non-text-critical emphasis. All clear WCAG AA.

## 5. Components

**Header.** Eyebrow `DEEP DIVE / Metric Chain` with an orange underline; `FROM MODELS → MARGINS` in Syne uppercase (the `→` in accent); IBM Plex lead; a mono coordinate strip `SCALE 1:1 · LAYERS 5 · SCENES 9 · REV 2026.06`; back-link rendered as a blueprint tab. Replaces the generic `.eyebrow/.lead/EntryMeta` block for this template.

**Chain-spine + scroll-spy.** A 2px indigo rail down the left of `.article-body`. Each scene `h2` gets a node (`::before` ring) plus a mono scene-id. A sticky left-edge **scene index** lists the 9 scenes; `spine.js` uses `IntersectionObserver` to fill the active node/index entry in accent as the reader scrolls. Keyboard: the index entries are anchor links to scene ids (real navigation, not JS-only).

**Typography reset (scoped).** Within `.dd-blueprint .article-body`: neutralize the global `:not(pre > code)` chip rule; set body to IBM Plex Sans; restyle inline `code` as a proper mono chip; `strong` = ink-bold, `em` = accent or italic — both inline.

**Cards → annotation plates.** `signal-card / thesis-card / action-card / callout` re-skinned: square corners (≤2px radius), 1.5px `--bp-line` border, `8px 8px 0 -2px` offset shadow, mono uppercase labels (`FIG. / NOTE / SPEC`). `callout.warm/.green` get a colored left edge-tab. Card *labels* (the direct-child `> strong` / `> em`) stay block; inline emphasis stays inline.

**Visual plates.** Each `.visual-frame` iframe gets a square border + a mono caption bar (`FIG n — TITLE · LIVE`). Embeds load in **light** mode with accent tuned to blueprint. If `_theme-bootstrap.js` lacks a light/accent param, extend it (additive, backward-compatible).

## 6. Motion

One orchestrated load: spine line scales from `scaleY(0)` top-down (~600ms), nodes stagger-pop, title/lead rise+fade (`animation-delay`). Scroll: node/index activation only. Everything gated behind `@media (prefers-reduced-motion: no-preference)`; reduced-motion users get the final state immediately.

## 7. Responsive

≥960px: full spine + sticky scene index. <960px: spine collapses to a thin left tick; scene index hides (scenes still carry their inline node + id); cards stack; visuals already responsive. No horizontal scroll at 380px.

## 8. Testing / verification

- `npm run build` clean (16 pages).
- Chrome-devtools screenshots at 1280 + 380 widths: header, a spine scene, a card plate, two visual plates (light).
- DOM checks: scroll-spy activates correct node on scroll; inline `strong/em/code` compute to inline(-block), labels to block; each re-themed embed `scrollHeight <= frame height`.
- a11y: AA contrast spot-checks; focus-visible on scene-index links; reduced-motion path renders final state.

## 9. Risks & mitigations

- **Visuals in light mode may overflow** (text reflows). → Re-verify every embed height; bump `--vf-h` per-visual if needed.
- **Light-mode visual contrast** of layer colors. → Use `_theme.css` light tokens already tuned earlier; spot-check.
- **Scope leakage.** → Lint that every blueprint rule is prefixed `.dd-blueprint`; no edits to shared card rules.
- **Sticky index crowding narrow viewports.** → Hidden below 960px by design.

## 10. Out of scope

- Restyling other deep-dives or the global system (beyond already-applied bug fixes).
- Rewriting visual *interactions* (only their theme/framing changes).
- Content edits (prose and citations stay as-is).

## 11. Build sequence (for the plan)

1. Frontmatter flag + `[slug].astro` branch + empty scoped CSS/JS wired in (verify page still renders).
2. Typography reset + palette + header.
3. Spine + scroll-spy.
4. Cards → plates.
5. Visual re-theme + plate frames + height re-verify.
6. Motion + responsive + a11y pass.
7. Full build + screenshot verification; remove temp mockup file.
