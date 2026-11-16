# Builder brief for the agentic commerce protocols page

Repo root: the `models-to-margins` folder. Page: `/deep-dives/agentic-commerce-protocols`. A dev server is already running at http://localhost:4321. Do not start, stop or restart servers.

## What you own

Only your own scene files: `drafts/acx/scenes/sN.html`. Never edit `drafts/acx/shell/*`, `gen.py`, `data.json`, `SCHEMA.md`, the Astro files or another builder's scene. If you need a data field that does not exist, say so in your reply. Do not invent it in the HTML.

Each scene file holds, in this order:

```html
<section class="acx-scene" id="acx-sN" aria-labelledby="acx-sN-h">
  <header class="acx-head"><span class="acx-num">0N</span><h2 id="acx-sN-h">...</h2>
    <p class="acx-dek" data-for="leader">...</p><p class="acx-dek" data-for="architect">...</p></header>
  ... markup ...
</section>
<style id="acx-sN-css">/* every selector starts with #acx-sN */</style>
<script>ACX.scene('sN', function (el, A) { /* render from A.data */ });</script>
```

## How the page works

- `A.data` is `drafts/acx/data.json` (shape in `drafts/acx/SCHEMA.md`). Render facts from it. Headings and short UI labels may be written in HTML. Never hard code a number.
- Every number you show gets its evidence tag next to it: `A.ev(item.ev)`. Never render `src`. Sources never appear on the page.
- Two readers. Leader copy uses `one`, architect copy uses `arch`. Use `A.onReader(fn)` to re render, or `data-for="leader"` and `data-for="architect"` twins. The architect copy replaces the leader copy. Never show both.
- State lives in the URL hash so the gate can measure every state: `A.get(k)`, `A.set(k, v)`, `A.on(k, fn)`. Keys per scene are in SCHEMA.md. Read the initial state from the hash on load.
- Drawers and detail views go in a fixed `.acx-panel` inside `.acx-split`, so opening one never changes page length. One open at a time. The panel always has content (a default item is selected), so it is never empty.
- Shared parts in `shell/acx-tokens.css`: `.acx-card`, `.acx-split`, `.acx-panel`, `.acx-seg` (segmented buttons with `aria-pressed`), `.acx-btn`, `.acx-chip[data-m]` via `A.chip(m)`, `.acx-ev` via `A.ev(t)`, icons via `A.icon(id, tone, size, label)` with size `hero` 88, `sec` 64, default 44, `chip` 32. Use only `var(--acx-*)` colours so light and dark both work.
- Diagram icons are at least 80px, so icons inside a diagram use `hero`. No emoji anywhere.

## Design direction

Enterprise and quiet. Visual first: diagrams, charts, heat maps, chips and toggles carry the story, text is short. Copper accent for action, teal for the second series, mono numerals for figures, the dot grid background is already on the root. Every scene has at least one real interaction (filter, toggle, slider or drawer) that changes what the picture shows, not only text.

## Hard limits the gate enforces

Read the rule list at the top of `scripts/layout-check.mjs` (lines 1 to 60). The ones that bite most:

- Scene height in every state: at most 1.5 viewports at 1440x900, 2.5 at 1024x800, 4 at 375x812.
- Text at least 14px. Tap targets at least 42px high and wide. h2 to h4 balanced, p pretty (already in the tokens).
- No orphan last lines (LB1), no label squeezed onto 3 lines (LB2), no overlap (CR2), no text within 8px of a painted edge (CR1), no sideways scroll at 375 (CR5), no empty strip in a panel (SP1), sibling cards on one row within 25 percent height (SP3), content using at least 60 percent of the scene width at 1024 and up (SP2).
- Words: stay inside your scene's budget in SCHEMA.md for each reader.
- Visible text has no em-dash and no semicolon. Code semicolons are fine.
- Motion: respect `A.still` (reduced motion). No infinite animation. Finite animations must end within 2 seconds.

## Test loop

```bash
python3 drafts/acx/gen.py
node scripts/layout-check.mjs /deep-dives/agentic-commerce-protocols --root=.acx --scene=.acx-scene --only=acx-sN --readers=leader,architect --states=<every state of your scene, comma separated, hash parts joined with &> --widths=375,1024,1440 --themes=light,dark --shots=/private/tmp/claude-501/-Users-vinayagrawal--claude-spares-spare-rGU9hb/c0f7499c-3782-4ad6-ad78-4f24efc18366/scratchpad/acx-sN-shots
```

`gen.py` composes every scene that exists, so running it while another builder works is safe. Your scene is done when the gate reports 0 faults for every state, and you have looked at one screenshot at 1440 and one at 375 (light and dark) and they look finished. Also check the browser console has no errors from your script (`node -e` is not enough, load the page).

Reply with: states you gated, the final fault count, word count per reader, and anything you need from the lead.
