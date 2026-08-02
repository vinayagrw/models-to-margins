# Site Audit: models-to-margins
**Standard:** WCAG 2.1 AA (+ WCAG 2.2 target-size noted) · content accuracy · narration · gap analysis
**Date:** 2026-07-26 · **Scope:** 19 pages, priority on the two flagship deep dives, all 6 briefs, homepage
**Method:** computed contrast matrix (56 token/surface pairs, both themes), keyboard walkthrough, ARIA inspection inside all 22 flagship visuals, 200% zoom + 375px reflow, target-size measurement, and full live web re-verification of 105 factual claims by three parallel research lanes (every verdict carries a URL).

## Summary

**Accessibility: 21 findings — 2 Critical, 8 Major, 11 Minor.**
**Accuracy: 105 claims checked — 78 confirmed, 4 contradicted, 13 partly right (drifted details), 7 unverifiable, 3 stale.**
**Narration: instrument counts and internal dates all match the prose; 3 integrity issues.**
**Gaps: 8 coverage gaps, 5 consistency gaps. Audience paths all resolve.**

The dark theme (site default) passes contrast almost everywhere. Nearly all contrast debt lives in the light theme. The single worst accessibility issue is not contrast: five harness-engineering visuals clip up to 312px of their own content at narrow widths. The single worst accuracy issue: the loop page's "20 actions ×2" headline tile has no underlying source, and the harness page's central five-layer framework is misattributed to Anthropic.

---

## A. Accessibility findings

### Perceivable

| # | Issue | WCAG | Severity | Recommendation |
|---|-------|------|----------|----------------|
| A1 | Harness visuals clip content at narrow widths: hero-equation hides 254px, without-vs-with 312px, failure-modes 196px, invest-first 155px, harness-explorer 55px (frame is `overflow: hidden`) | 1.4.10 Reflow / content loss | 🔴 Critical | Port the frame-autosize opt-in (already on all 12 loop visuals) to the 10 harness visuals |
| A2 | Light theme, visual families: `--muted-soft` 2.48:1 used for real text at 0.54–0.62rem (gauge scales, chip sublabels); `--accent-2` #f97316 2.76:1 used for stamps, tags, disclaimer chip | 1.4.3 Contrast | 🔴 Critical | Darken light-mode `--muted-soft` and `--accent-2` in both `_theme.css` files |
| A3 | Light theme, small colored text under 4.5:1: family `--muted` 4.33, `--accent` 3.95, `--warn` 4.49, `--T-cron` 3.23, violet 3.34; site `--accent` links 3.49, `.eyebrow.warm` 2.05, `.eyebrow.green` 3.64; console `--cr-ink-3` on panel-2 4.18 and on bg 3.8, amber V-badge 4.34; blueprint `--bp-ink-3` 4.37, `.bp-arrow` on raw accent 2.51 | 1.4.3 | 🟡 Major | Darken the light-mode values only (dark theme passes: worst dark value is muted-soft 3.79, all others 5.0+) |
| A4 | Fonts below the house 11px floor in embeds: loop-stack 0.52rem (8.3px), arc-timeline 0.54/0.56, playbook-ladder 0.58, loop-metrics scale 0.58, several 0.62 | 1.4.4 advisory + house rule | 🟢 Minor | Raise to ≥0.66rem; autosize absorbs the growth |
| A5 | `hero-loop-feed` and `since-april` expose no accessible name or ARIA at all — animated content is invisible to screen readers | 1.1.1 | 🟡 Major | `role="img"` + `aria-label` summary on hero; group label on since-april |
| A6 | Loop-page iframe `title` attributes run 200–400 characters — screen readers announce the full text on focus | 1.1.1 / SR verbosity | 🟡 Major | Shorten every title to one descriptive line |

200% zoom: **PASS** (zero horizontal overflow, page and all 12 loop frames). 375px reflow: **PASS** on the loop page (autosize), **FAIL** on harness (A1).

### Operable

| # | Issue | WCAG | Severity | Recommendation |
|---|-------|------|----------|----------------|
| A7 | No skip-to-content link anywhere; the loop page has 40 parent tab stops (11 spine links + 11 reading links) before the first instrument | 2.4.1 Bypass Blocks | 🟡 Major | Skip link in BaseLayout targeting main content |
| A8 | Sub-24px targets (WCAG 2.2 2.5.8; 2.5.5 AAA advisory): since-april log summaries 261×9, evidence-wall flips 106×19, loop-metrics toggles 87×18, loop-anatomy stations ~×23, playbook prev/next ~×23, standalone back-link 142×20 | 2.5.8 | 🟡 Major | Padding bumps to ≥24px min dimension |
| A9 | Visuals rely on the browser default focus ring (thin, sometimes low-contrast on tinted panels); zero `:focus-visible` rules in all 22 flagship visual files | 2.4.7 (passes minimally) | 🟢 Minor | Add explicit 2px `:focus-visible` outlines via each family `_theme.css` |
| A10 | Arrow-key support exists only in loop-stack and playbook-ladder; other multi-button widgets are Tab-only (acceptable for button groups, required only for tablists — the tablists have it) | 2.1.1 pattern advisory | 🟢 Minor | Optional: arrows on chip rows |
| A11 | Older families (procurement-ai, intelligence-engine, ai-led-sdlc, checklist) use `outline: none` on `:focus-visible` with replacement styling (border/box-shadow) — visible but sometimes faint | 2.4.7 | 🟢 Minor | Verify replacement visibility when those pages are next touched |

Keyboard walkthrough: focus order is DOM = visual order, every interactive element is a native `<button>`/`<a>`/`<summary>`, focus travels correctly into sandboxed iframes, nothing traps. Activation could not be exercised end-to-end by the automation harness (its synthesized Enter/Space do not trigger native default actions even on parent-document buttons — a tooling artifact); semantics guarantee real-keyboard activation, and no `preventDefault`/`keydown` interception exists in any visual.

### Understandable / Robust

| # | Issue | WCAG | Severity | Recommendation |
|---|-------|------|----------|----------------|
| A12 | `vocabulary-visual.html` buttons carry `role="listitem"` which overrides button semantics — SR users hear a list item, not a pressable control, and `aria-pressed` becomes invalid | 4.1.2 | 🟡 Major | Drop `role="listitem"` from the buttons |
| A13 | Sandbox inconsistency: future-of-work-2026 (4 iframes) and all 6 bespoke brief pages have no `sandbox` attribute; everything else uses `allow-scripts allow-same-origin` | robustness | 🟢 Minor | Add the same sandbox everywhere |
| A14 | Visuals internally default LIGHT while the site defaults DARK — a no-JS iframe would flash light inside a dark page | robustness | 🟢 Minor | Acceptable (bootstrap JS corrects on first paint); note only |

Structure passes: `lang="en"`, one `<main>`/`<nav>`/`<footer>`, exactly one h1 per page, h2 scene hierarchy, meta descriptions, aria-live regions all `polite`, JS-built harness tab widgets correctly assign `role="tab"` + `aria-selected` at runtime (a static grep suggests otherwise — runtime inspection confirms conformance).

### Contrast matrix (worst offenders; full 56-pair computation available)

| Element | Theme | Ratio | Required | Pass? |
|---------|-------|-------|----------|-------|
| Visual `--muted-soft` on surface | light | 2.48 | 4.5 | ❌ |
| Visual `--accent-2` #f97316 on surface | light | 2.76 | 4.5 | ❌ |
| Site `.eyebrow.warm` | light | 2.05 | 4.5 | ❌ |
| Blueprint `.bp-arrow` on paper | light | 2.51 | 3.0 | ❌ |
| Visual `--T-cron` corner labels | light | 3.23 | 4.5 | ❌ |
| Site `--accent` links | light | 3.49 | 4.5 | ❌ |
| Visual `--accent` labels | light | 3.95 | 4.5 | ❌ |
| Console `--cr-ink-3` on panel-2 | light | 4.18 | 4.5 | ❌ |
| Visual `--muted` labels | light | 4.33 | 4.5 | ❌ |
| Console V badge amber on dim | light | 4.34 | 4.5 | ❌ |
| Visual `--muted-soft` | dark | 3.79 | 4.5 | ❌ |
| Body text (all themes/templates) | both | 13.9–16.8 | 4.5 | ✅ |
| Console V badge amber on dim | dark | 7.08 | 4.5 | ✅ |
| Everything else measured, dark theme | dark | 5.0–18.5 | 4.5 | ✅ |

---

## B. Content accuracy — claims ledger highlights

105 claims re-verified against live primary sources (2026-07-26). Full per-claim tables with URLs are archived in the session's verification lanes; below are the rows that need action.

### CONTRADICTED (4)

| Page | Claim | Reality | Fix |
|------|-------|---------|-----|
| loop L54 | "Agents now average 20 autonomous actions before needing a human, doubled in six months" (V-badged hero tile) | No source exists. Anthropic's actual research (Feb 18 2026): interventions per session fell 5.4→3.3; 99.9th-percentile autonomous stretch doubled from under 25 to over 45 minutes in ~3 months | Replace tile with the real Anthropic metric |
| harness L122/L43 | Five-layer harness model attributed to "Anthropic's Managed Agent post" and "Anthropic shipped 3 of the 5" | Anthropic's April 8 announcement contains no five-layer model; the framework comes from third-party synthesis essays | Reattribute to the synthesis essays |
| harness L24/L299 + evidence-chart | "Vercel v0, 2026, −80% tools… 'dumb zone'" | The case is Vercel's internal **d0** data agent, published **Dec 22 2025**; "dumb zone" doesn't appear in the post | Rename, re-date, replace the phrase with real results (3.5× faster, 80→100% success) |
| ai-led-sdlc L40 | "$700B+ modernization prize" | Modernization-services market is ~$25–30B (2025) heading to $66–92B; $700B conflates digital-transformation spend | Re-anchor to the real market + 17.6% CAGR |

### PARTLY / drifted details (selected)

- loop L53: Spotify's prior pace was **six months** earlier, not "a year earlier".
- loop field-map: ghostty AGENTS.md is ~45 lines today (page says 39); Cherny quote was public **Jun 6** (chip says Jun 9); Huntley's $10.42/hr post is **Feb 27** (chip says Jan 17); Horthy's "Jan 6" date is unpinnable.
- loop evidence-wall: Steinberger's $1.3M/603B/100-agent month is real but run by a team of three with OpenAI footing the bill; the "3–8 agents at $1k/mo Oct 2025" and "6,600 commits in January" sub-details are unverifiable.
- loop evidence-wall + since-april: the "−20 to +35 percent scaffold swing" attributed to METR is unfindable (METR reports no major scaffold improvements); the real citable result is the GAIA scaffold study (arXiv 2606.08529, up to 28 points).
- since-april: "211-task open-weight parity study" — closest real study is a 30-task aggregate.
- harness L33: timeline off by a year (context was the 2025 conversation, prompts 2023–24).
- harness L38/107: "Four independent teams in 2026" — Vercel's is Dec 2025.
- harness L135: the P50 −60% / p95 −90% numbers come from Anthropic's June 10 engineering post, not the April launch.
- harness L214: the 2–3× claim is Cherny's, about verification feedback loops generally, not "one pre-stop hook".
- harness L225: ETH study is 138 benchmark **tasks** across 12 repos, not 138 agentfiles; the LLM-generated-file penalty is small (−3% avg) beside the +20% token cost.
- harness L86: the OSI blockquote has no locatable source; L249's "OpenAI-derived seven-component framing" isn't OpenAI's (they use three pillars); L294/299 references "the three synthesis articles above" which are never listed.
- loop L103: the "documented" three-week misdiagnosis case has no locatable source.
- briefs: ai-led-sdlc "+281% PRs / +40.7% throughput" match no source (its own visual cites Faros: +98% / +34%); "$1.5T/yr" is accumulated CISQ debt, not annual; private-ai prices stale (DeepSeek V3.1 now ~$0.25/$0.95 with V4 shipped; R1 typical ~$0.70/$2.50; Qwen3 hosted $0.455/$1.82); gpt-oss is Apache 2.0; DeepSeek weights are MIT; operator-grade labels unattributed archetype numbers "Measured payoff".

### Strongly CONFIRMED (highlights)

Stripe Minions 1,300+/wk with the two-CI-run cap · Spotify 1 merge/14 min and review-as-bottleneck · OpenAI 1M lines / ~1,500 PRs / 0 hand-written / 3→7 · LangChain 52.8→66.5 harness-only · TB 2.1 +12.1 environment-only · METR 14.5h / ~89-day doubling · Greptile 1.19 vs 2.72 reverts · GitClear 3.3→7.1% churn · LangChain survey 89%/37.3% · MSR 33,707 PRs / 28.3% instant-merge / ghosting · all five repo star counts (within rounding) · all four arXiv papers incl. 2604.25850 · /goal in v2.1.139 May 12 · Steinberger tweet + ~5M views · the $7–70 / 2.5× cost benchmark · Anthropic June 30 loops guide · Weng July 4 · Willison Sep 30 2025 · ETH agentfile cost finding · HumanLayer <60-line CLAUDE.md · Managed Agents feature list.

---

## C. Narration correctness

Every prose count matches its instrument (verified programmatically): 11 timeline chips, 10 people + 5 repos, 6 claims + 4 counterweights, 6 thesis cards, 6 lamps, 6 gauges, 6 stations, 4 quadrants, 5 rungs. Dates are internally consistent across arc-timeline ↔ field-map ↔ prose. Reading-map paths (engineer/leader) resolve to real scenes. Illustrative labels are visible in-visual (loop-metrics chip, failure-wall meter), not just in title attributes.

Three integrity issues:
1. The evidence-stance promise ("every such figure carries a V badge") over-promises: the $7–70 cost claim and misdiagnosis anecdote carry no badge. Reword the stance or extend the badges.
2. The harness Sources section references "the three synthesis articles above" that are never listed, and omits Hashimoto while quoting him verbatim.
3. ai-led-sdlc's md "What it shows" describes figures (−40% ops, −75% MTTR) that no longer appear in the current visual.

---

## D. Gap analysis

### Coverage gaps (researched, not on any page)
1. Anthropic dynamic workflows GA (May 28) + ultracode — a major loop-era milestone missing from the timeline.
2. Cursor v3.11 cloud-agent hooks (Jul 10) and its staff-acknowledged over-aggressive loop detector — the best documented loop-breaker false-positive story; would strengthen Scene 10.
3. Google's unified Antigravity harness + ADK 2.0 dynamic-to-deterministic slider — the field map has zero Google presence.
4. swyx's "Meta-Harness Summer" (Databricks Omnigent) — the emerging next wave beyond loops.
5. Enterprise proof points outside dev-tooling: Azure SRE Agent 35,000+ incidents, Meta Ranking Engineer Agent.
6. The 61% pushback share on the Steinberger tweet — the page presents the tweet as pure signal; the majority-skeptical reception is itself a counterweight datum.
7. Anthropic's long-running-agents two-agent harness pattern (Nov 2025) — the initializer/coding-agent handoff.
8. OpenAI Codex internals (prompt-cache append-only discipline, tool-ordering cache poisoning) — quotable harness-mechanics detail.

### Consistency gaps
1. Harness page keeps `## Sources` while the loop page dropped it (pending decision).
2. Harness visuals lack the details-data-table pattern entirely (loop has 4).
3. Harness visuals lack autosize (= finding A1).
4. Briefs carry numbers with no evidence-stance discipline (no V badges, no illustrative labels).
5. Site light-theme token debt concentrated in `_theme.css` light blocks (= findings A2/A3).

---

## E. Priority fixes (all applied in this pass)

1. **Critical:** harness-family autosize port (A1); light-theme contrast tokens (A2); the four CONTRADICTED claims corrected.
2. **Major:** remaining light contrast (A3); skip link (A7); accessible names (A5); role="listitem" (A12); target sizes (A8); iframe titles (A6); all PARTLY/stale claim corrections; evidence-stance rewording; dangling Sources reference.
3. **Minor:** focus-visible outlines (A9); font floors (A4); sandbox attrs (A13); brief stance labels.

---
---

# Post-restructure re-audit — 2026-07-26 (evening)

**Trigger:** since the morning audit above, the loop-engineering page was restructured (since-April scene removed, scenes 11→10, the researched four-week ledger folded into Scene 6), console-template fonts were raised ~6–9%, and arc-timeline got a selection fix. This pass audits the changed state deeply and checks that the morning's fixes persisted. Method: 2 research lanes (13 primary sources re-fetched), programmatic contrast/keyboard/reflow checks in-browser (both themes, 375px + 640px viewports), file-level narration and gap greps. **Findings are reported only — no fixes applied in this pass.**

## Summary

**Accessibility: 1 finding — 0 Critical, 1 Major, 0 Minor. Everything else re-checked passes.**
**Accuracy: 13 sources re-fetched — 2 Major mischaracterizations, 1 Major propagation regression, 3 Minor. All 7 ledger primaries and 5 of 6 sampled claims verify; all 22 morning fixes still present in the files they touched.**
**Narration: 1 Major restructure fallout, 1 Minor same-file label conflict. Structure fully consistent (10 scenes, 15/15 anchors resolve).**
**Gaps: the recurring pattern is incomplete propagation — three md-level fixes never reached the visual HTML beside them.**

## R-A. Accessibility (delta)

| # | Issue | WCAG | Severity | Recommendation |
|---|-------|------|----------|----------------|
| RA1 | Light theme only: `four-week-wire` type badges (`.r-badge`, 10.6px/700) render `var(--tc)` text over a 10% tc tint — computed composites: Release 4.20:1, Signal 4.31:1, Press 4.36:1, Paper 4.55:1 (white base; the actual cream base pulls all slightly lower). Needs 4.5:1. Dark theme passes at ~11.6:1 | 1.4.3 Contrast | 🟡 Major | In the light block, darken badge text (`color-mix(in srgb, var(--tc) 75%, var(--text-strong))`) or drop the tint to ~5% |

**Re-checked and passing:** 375px reflow — 0 horizontal overflow, all 12 frames autosize within 2px; 640px (200%-zoom equivalent) — 0 overflow anywhere; keyboard/ARIA on both changed visuals — four-week-wire 7 rows and arc-timeline 11 chips are native buttons with `aria-pressed` (exactly one pressed), `aria-live="polite"` detail panels, `:focus-visible` rules, reduced-motion guards, labeled `role="group"`, targets 52–93px; resized-text contrast everywhere else in both themes — body 17.9px at 9.7:1 dark / 8.2:1 light, lamps 11.5px at 5.0/5.7, summary/th 12px at 15.8/13.9, tiles and reading links 14.1px at 5.0/5.7; the dark-theme h2 "1.2:1" was a tooling false positive (transparent ancestor chain; opaque gradient stops are navy, effective ≈15:1); zero console errors.

## R-B. Accuracy

| # | Claim as published | Location | What the source says | Severity |
|---|---|---|---|---|
| RB1 | COMFYCLAW "+8.44 points over a frozen-skill baseline" | loop-engineering.md ledger row Jul 2 + four-week-wire DATA[1] | 8.44 is Table-1 arithmetic (75.52−67.08) for ONE of six agent configurations vs a "Base" lacking both skill evolution and VLM verifier refinement — it does not isolate the self-evolving skill library; per-config gains run ~4 to 14.78. The held-out gating sentence is confirmed verbatim ("accepted only if it does not degrade validation performance"). arxiv.org/html/2607.01709v1 | 🟡 Major |
| RB2 | "Faros AI telemetry, April 2026: +98% merged PRs and +34% task throughput" | ai-led-sdlc.md "What it shows" | Conflates two reports: +98% PRs (with +21% tasks) is the Jul 23 2025 "AI Productivity Paradox"; +33.7% throughput is the separate Apr 2026 "Acceleration Whiplash". One date stamped on both numbers. faros.ai/blog/ai-software-engineering + /ai-acceleration-whiplash-takeaways. (This wording was itself the morning audit's replacement — the conflation shipped with the fix.) | 🟡 Major |
| RB3 | "a $700B+ modernization market growing 17.6% a year" | the-margin-reckoning.html:895 | The morning fix corrected the brief md to "~$90B at 17.6% CAGR" but never reached this visual — the page now contradicts itself | 🟡 Major |
| RB4 | Jul 13 row: press cycle "led by the Self-Harness result" | loop md ledger + wire DATA[4] | Article gives Self-Harness and HarnessX roughly equal weight; date, author, and the 40.5→61.9% retelling verify exactly | 🟢 Minor |
| RB5 | "Measured payoff" labels on archetype numbers | operator-grade-intelligence-engine.html:283,484 | The md now disclaims "illustrative archetypes, not attributed cases" but the visual still says Measured, unqualified | 🟢 Minor |
| RB6 | Qwen3 hosted $0.20/$0.60 | private-ai-vs-public-ai.md model table | Audited current figure $0.455/$1.82; covered only by the blanket April-snapshot disclaimer | 🟢 Minor |

**Verified clean:** all seven four-week-ledger primaries (Ant 2607.01120 — position paper, no benchmarks, not Web-Conference framing; Weng — exact URL, verbatim ladder, 39 refs counted; RSI survey 1,250 papers; PR Newswire capability list matches item-for-item; Microsoft "stable, batteries-included harness … Python and .NET" verbatim, background agents opt-in); the Self-Harness antecedent (all five facts + the three stage names); window discipline (every in-window entry ≥ Jun 28, antecedents explicitly labeled); V-badge discipline (all self-reported figures badged, non-self-reported correctly b-ok); all 22 morning accuracy fixes persist (none reverted, including through the restructure); sampled re-verification — LangChain 52.8→66.5 (+13.7) exact, Vercel d0 exact, Hashimoto quote exact, MIT NANDA paraphrase-ok, gpt-oss Apache 2.0 exact.

## R-C. Narration

| # | Issue | Location | Severity |
|---|---|---|---|
| RC1 | **Restructure fallout:** the T4 lamp "Open-weight parity — One study" still points at Scene 6, but the parity study left the page with the deleted since-april visual — the lamp now asserts a thesis no scene supports | loop-engineering.md:48 | 🟡 Major |
| RC2 | arc-timeline's May 12 chip carries era label "Loop era opens" while the same file's era band says "Loop eng. from Jun 2026" and Scene 1 prose says "named in June 2026" | arc-timeline.html:124,165 | 🟢 Minor |

**Passing:** 10 h2 scenes, reading map (10 entries) and 5 lamps — all 15 hrefs resolve against the 10 generated ids; nested windows consistent (master head Apr 30→Jul 26; ledger sub-window Jun 28→Jul 26 framed as "the last four weeks of this window"); both remaining "eleven" strings correctly describe the timeline's 11 chips; mission-brief audience paths (3–5 / 2, 8, 10 / 6, 9) match scene content; Scene 6's two-beat sequence (grade the wall → freshest rows) reads coherently; sequel cross-links exist in both directions; house punctuation rules hold on all changed text (em-dashes only in title/h2, semicolons only in code).

## R-D. Gap analysis

1. **Propagation pattern (the real lesson):** three morning fixes were applied to md but not to the visual HTML embedded on the same page (RB3, RB5; RB6 partially). Recommend making it a rule: any accuracy fix greps the page's `public/visuals/**` files for the same figure before closing.
2. **Restructure fallout is contained:** zero orphaned file references to since-april in src/ or public/ (only this report's own historical rows); the single semantic orphan is the T4 lamp (RC1).
3. The July self-evolving wave lives only on the loop page — acceptable: harness-engineering's sequel banner forwards readers there.
4. The page summary's clause list names 9 of 10 scene subjects (omits Scene 8 gauges and Scene 10 playbook) — stylistic ellipsis, no action proposed.
5. The morning coverage gaps (D1–D8 above) remain open by design; nothing in this pass changed their status.

## R-E. Priority fixes (NOT applied — awaiting approval)

1. **RB1** — reword the COMFYCLAW anchor detail in both md and wire to what the table supports (e.g. "best average score across six agent configurations, gains of 4 to 15 points vs no-evolution baselines").
2. **RB2** — split the Faros pairing into two attributed figures with their own dates.
3. **RB3** — align the-margin-reckoning.html:895 with the corrected ~$90B market figure.
4. **RC1** — retitle/rewire the T4 lamp to a thesis Scene 6 actually carries (e.g. the self-evolving-harness wave), or restore a parity datum to the evidence wall.
5. **RA1** — darken light-theme badge text in four-week-wire.
6. **Minor batch:** RB4 "led by" → "retold alongside HarnessX"; RC2 era label; RB5 "Illustrative payoff"; RB6 Qwen3 price row.
