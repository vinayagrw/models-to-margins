# Red-team ledger — /deep-dives/ai-governance-before-roi

**Reviewed** 2026-08-17 · **Subject** the published deep-dive page (`src/content/deep-dives/ai-governance-before-roi.md`), its six figures, and their fidelity to `docs/AI_Governance_Before_ROI_Technical_Design.md` · **Status** 6 confirmed and fixed, 2 rejected, 4 open

## How this review ran

An independent Team B of six agents reviewed the page and its companion design doc through six hostile lenses in parallel: fact fidelity against the weekly-report and SOTA source files, a skeptical CTO/architect rigor pass over the design doc, a hostile security audit, a front-end/CSS adversarial review, a copy editor auditing house style, and a data-integrity spot-check of the embedded figures.

Every finding then went to a separate refuter (this pass) whose default position was **rejected**. A finding survived only if it could be independently re-established against the actual files, with a file path, line, or grep result as evidence. This ledger covers only the findings tagged `GOV-*` or general/repo-wide findings (`SEC-GEN-*`) that apply to this page or its design doc; findings scoped to the capex and Taiwan pages are out of scope here.

**Verdict vocabulary.** CONFIRMED means the defect is real and was fixed. REJECTED means the refuter checked the claim against the files and found it did not hold as stated. OPEN means the finding is real but is a judgment call — an architectural or editorial choice a reasonable author can defend differently — recorded here for the author to decide rather than changed unilaterally.

---

## Confirmed and fixed — content / facts

| ID | Challenge | Severity | Resolution |
|---|---|---|---|
| GOV-FACT-01 | Chapter 3 body text ("Deloitte's 2026 edition... found only 6% of leaders already growing revenue from AI against 74% who aspire to") and Appendix 3's table row ("6% revenue growth from AI already, 66% report efficiency gains") both misattribute Deloitte's "6% see ROI inside a year" figure to the revenue-growth claim. The design doc itself (`docs/AI_Governance_Before_ROI_Technical_Design.md:100,197,498`) states the correct pairing: **20%** already growing revenue vs 74% aspiring, and 66% reporting productivity/efficiency gains, as a distinct statistic from the "6% ROI under a year" figure at line 225. Verified directly: line 140 and the Appendix 3 row (former line 161) of the shipped page both used 6% where the doc uses 20%, and the page's own stat-strip (line 137) correctly uses 6% for the ROI-timing claim elsewhere on the same page — an internal inconsistency as well as a source mismatch. | Major | Chapter 3 body now reads "found only 20% of leaders already growing revenue from AI against 74% who aspire to, while 66% report productivity or efficiency gains." Appendix 3's table row now reads "20% revenue growth from AI already, 66% report efficiency gains." |
| GOV-COPY-01 | Chapter 6 body, the "still owed" paragraph, strings five list items into one sentence with five semicolons: "...owed for a fourth run; ...owed for a fifth; ...owed for a twelfth; ...owed for an eleventh; ...owed for a thirteenth; and, after fourteen runs..." House style forbids semicolons in prose. Verified by direct read of the paragraph — five semicolons confirmed, the only prose semicolon violation in the file (all other semicolons are inside `style="--vf-h:...px; --vf-h-m:...px"` attributes or `<td>` cells). | Major | Rewritten as six separate sentences, preserving every figure and run-count, no semicolons. |

## Confirmed and fixed — docs / architecture

| ID | Challenge | Severity | Resolution |
|---|---|---|---|
| GOV-CTO-02 | `AI_Governance_Before_ROI_Technical_Design.md` §3 (line 114) and §12.2 (line 473) both pre-commit the CEO-report elevation trigger to "**two** independently computed, pre-registered, audited before/after results in different business units." But the §8.3 decision-tree's node Q2 (line 338, prior text) asked "**Any** pre-registered measured result yet?" — singular — and routed straight to CEO-level placement (P1c) on a "yes," a materially weaker bar than the prose commits to elsewhere. Verified by grepping all four locations directly: the "two...different business units" language is identical at lines 114 and 473, and the original Q2 node used "Any... measured result yet?" | Major | §8.3's Q2 node now reads "Two independently computed, pre-registered results in different BUs yet?" — matching the bar stated in §3 and §12.2. A reader following the diagram literally now gets the same threshold as the prose. |

## Confirmed and fixed — front-end

| ID | Challenge | Severity | Resolution |
|---|---|---|---|
| GOV-FE-01 | Every evidence chip in `ai-governance-before-roi.md` (~35 occurrences, including all four legend chips in the opening note-panel, all table-cell verdict chips, and the vendor-claim chip in the stat strip) was authored as `class="chip chip--confirmed"` / `chip--proposed` / `chip--open` / `chip--vendor-claim`. `public/styles/deep-dive-boardroom.css` only defines `.br-chip` / `.br-chip--*` selectors (lines 478–526), scoped under `.dd-boardroom`. Verified directly: grepping the content file for `class="chip` found zero `.br-chip` occurrences pre-fix, and grepping the CSS confirmed no bare `.chip` rule exists anywhere in the boardroom sheet. This meant every "Confirmed / Proposed / Open / Vendor claim" chip on the page — the page's stated central design conceit ("every claim on this page carries a verdict") — rendered as unstyled inline text. | Blocker | Every `class="chip...` in the file was replaced with the correctly prefixed `class="br-chip br-chip--*"` (56 occurrences after the fix, 0 remaining unprefixed). Chips now render against the CSS contract the boardroom template already ships. |

## Confirmed and fixed — security

| ID | Challenge | Severity | Resolution |
|---|---|---|---|
| SEC-GEN-04 (governance instance) | All six `public/visuals/ai-governance-before-roi/*.html` figure files (`deadline-slip.html`, `delegation-drop.html`, `evidence-ladder.html`, `governance-docket.html`, `provenance-plot.html`, `reporting-lines.html`) loaded fonts from `https://fonts.googleapis.com/...` inside a `sandbox="allow-scripts allow-same-origin"` iframe — a live external network call on every page view, inconsistent with the figures' self-contained design intent, and it leaks visitor IP/UA to Google on every load. Verified by grep: all six files carried the identical `<link href="https://fonts.googleapis.com/...">` line before the fix. | Major | The external Google Fonts `<link>` was removed from all six files. They now fall back to the CSS variable's local/system font stack (self-hosting the actual font files was explicitly out of scope for this pass). |

---

## Rejected

| ID | Challenge | Refuter's finding |
|---|---|---|
| GOV-CTO-05 | Claimed the document's title and §0 framing are never walked back even though §12.3 concedes "the thesis is weaker than the title," so a board reader following the stated reading path (§0, §3, §9, §12) never resolves the gap. | REJECTED as stated. §0 itself — the very first section on the board's own reading path — contains an explicit, prominent callout at line 29: "**A warning about the title.** The thesis — governance arrives before ROI — is *weaker than it looks*... Read the title as a description of *what enterprises are doing*, not a claim that regulation is racing ahead." The concession the finding says is buried at §12.3 is in fact stated up front, before §3, exactly where the board reading path starts. The underlying observation (the title overstates §9/§12's conclusion) has some truth to it, but the specific claim — that the reading path never surfaces the caveat — does not survive a direct read of §0. |
| GOV-DATA (governance spot checks) | The data-integrity lens flagged no defects specific to this page; its spot checks of `delegation-drop.html`, `governance-docket.html`, `evidence-ladder.html`, and `provenance-plot.html` against `facts-governance.md` all passed. Recorded here only to confirm the lens covered this page and found nothing to reject. | N/A — no defect was raised for this page by this lens; nothing to confirm or reject. |

---

## Open — judgment calls for the author

| ID | Challenge | Why it's left open |
|---|---|---|
| GOV-CTO-01 | The §8.3 decision tree in the design doc has six live leaves (routing to different P-pattern combinations depending on the reader's answers), but §8.4's "recommended composite" asserts one fixed sequence (P4+P3+P2, then P1, P6 parallel, P7 year-one ambition) without stating which tree leaf it represents. A reader whose answers route them to a different leaf (e.g. P6a, compliance-dominant) gets a composite that doesn't match their own tree output. Verified: §8.3's mermaid (lines 334–348) does branch into P1b/P1c/P6a/P2a/P5a/P2b, and §8.4 (line 352) asserts the composite as a flat, unconditional recommendation with no leaf reference. This is a real gap, but fixing it is an authorial choice between two different repairs (annotate the composite's assumed leaf, vs. restructure the tree so every leaf funnels through the same spine) — not a mechanical correction, so left for the author. |
| GOV-CTO-03 | F8 (§1.1, line 44) and §5.7 (line 208) state the "88% of agent pilots never reach production" and "vendor-led ~67% vs internal ~33%" figures as the basis for a hard deployment-ration requirement, but Appendix A's own source ledger (S8, line 497) says "Underlying study not named in the corpus — **[OPEN]**." Verified: neither line 44 nor line 84 nor line 208 carries an inline [OPEN] or [S8, unsourced] flag at first use; only the appendix, several sections later, discloses the sourcing gap. Real, but the fix (where exactly to add the flag, and how to phrase C9's existing "unevidenced" concession earlier) is an editorial judgment call about how much hedging to carry into a functional requirement's first statement, not a factual correction. |
| GOV-CTO-04 | The §4.1 architecture diagram (lines ~140–153) draws `risk -. "obligations" .-> caio` and `meas --> board`, but no edge from risk to board, even though §5.5's NACD-driven argument treats board-level ERM integration of AI risk obligations as central. Verified directly in the mermaid block: no `risk --> board` or `risk -.-> board` edge exists. Real diagram/prose gap, but which edge style (solid vs. dotted) and label to add is a diagramming choice best left to whoever maintains the architecture figure, not corrected unilaterally here. |
| SEC-GEN-05 | `_theme-bootstrap.js`'s `message` event listener (line 29) applies `event.data` without checking `event.origin`, so a theme-toggle postMessage from any origin is accepted. Verified directly: no `event.origin` check exists in the file, and the same file is byte-identical across nine `public/visuals/*/` directories (grepped for `_theme-bootstrap.js` site-wide). Impact is low — the payload is normalized to only `'dark'`/`'light'` and applied as a `dataset`/`style.colorScheme` value, no injection surface — but it is a real gap. Left open because this file is a shared, site-wide asset, not specific to this page, and this review's file-edit scope was limited to the governance page's own content, doc, CSS, and visuals HTML; patching only the governance copy would leave the other eight identical copies unfixed and create drift. Recommend a single coordinated fix to the shared source, re-copied to all nine instances, as its own follow-up. |

---

## Summary

Six confirmed defects were fixed: a real Deloitte-statistic misattribution (20% vs 6%) in both prose and appendix table, a five-semicolon house-style violation, a diagram/prose contradiction on the CEO-elevation bar (tree loosened "two results" to "any result"), a site-breaking chip-class mismatch that silently defeated the boardroom page's entire evidence-chip design, and an external Google Fonts dependency removed from all six figure files. One finding (GOV-CTO-05, the title/reading-path gap) was rejected outright — the document's own §0 already carries the concession the finding said was missing. Four findings (three CTO-lens diagram/sourcing rigor gaps in the design doc, plus the shared theme-bootstrap postMessage origin check) are real but left open as author judgment calls or out-of-scope shared-file fixes.

## Verification after the fixes (Team C)

- `npm run build`: clean, `/deep-dives/ai-governance-before-roi/` present in `dist/`.
- Live-page DOM check: `document.querySelectorAll('.br-chip')` → 59, `document.querySelectorAll('.chip')` (bare, unstyled) → 0 — the chip-class blocker is confirmed fixed in the rendered page, not just the source file.
- All 6 `.visual-frame` elements report a non-zero, autosized `style.height` (333px–649px) after load — the postMessage autosize path fires correctly for every figure, no blank space.
- Network trace of a full page load shows zero `fonts.googleapis.com` / `fonts.gstatic.com` requests originating from the 6 figure iframes.
- Mobile viewport (375×812) re-check: no horizontal overflow, spine nav still renders, figures still autosize.
- Console errors on load are limited to `POST /api/collect → 404`, the known local-preview analytics-KV gap (documented, unrelated to this page).
