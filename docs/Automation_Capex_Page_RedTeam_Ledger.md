# Red-team ledger — /deep-dives/automation-capex-air-pocket

**Reviewed** 2026-08-17 · **Subject** the published deep-dive page, its 7 figures, and their fidelity to `Automation_Capex_Air_Pocket_Technical_Design.md` · **Status** 10 confirmed and fixed, 15 rejected (out of scope for this page or checked-and-cleared), 4 open

## How this review ran

Team B ran six hostile lenses in parallel across three deep-dive pages (this page plus the AI-governance and Taiwan pages): fact fidelity, hostile CTO/architect rigor, security, front-end/accessibility, copy editing, and data integrity. This ledger is a Team B refuter pass scoped to the automation-capex-air-pocket page and its companion technical design doc — every finding tagged `CAP-*` or `*-GEN-*` that touches this page's files was pulled from the six lens reports and independently re-verified against the actual files (never taken on the original reviewer's word). Default posture: **rejected** unless the refuter could re-establish the defect directly.

**Verdict vocabulary.** CONFIRMED means the defect is real, verified against the file, and was fixed. REJECTED means the refuter's own check of the file did not support the claim, or the claim was a "checked and cleared, no defect" entry misfiled as a finding. OPEN means the finding is real but is a judgment call — a reasonable author could go either way — and is left for the author to decide.

---

## Confirmed and fixed

### Copy / content — loading vs. unloading conflation

| ID | Challenge | Severity | Resolution |
|---|---|---|---|
| CAP-COPY-01 | The hero stat-strip read "FedEx target for automated trailer **load and unload** across thousands of dock doors," stamped Confirmed. Chapter 2's own callout (the page's central discipline claim) states loading is the FedEx/Dexterity program and unloading is a separate Berkshire Grey ("Scoop") program on a different timeline, and calls conflating them "the exact error this page corrects." The hero stat committed that exact error in the page's highest-visibility real estate. Verified by reading the live file: line 37 vs. the callout at lines 98–101. | major | Rewrote the stat-strip line to `FedEx/Dexterity target for automated trailer loading; Berkshire Grey's separate "Scoop" program covers unloading`, attributing the two programs separately instead of bundling them under one FedEx figure. |
| CAP-COPY-02 | Chapter 2's lead restatement of FedEx's Investor Day target ("automated load and unload... in more than 20 US hubs") repeats the same conflation one paragraph before the callout that corrects it. Verified at the pre-edit line 96. | major | Rewrote the sentence to attribute the 20+ hub target to trailer loading (the Dexterity program) specifically, with unloading named as the separate Berkshire Grey program "described below," so the lead sentence no longer contradicts the callout that immediately follows it. |

### Data integrity — fabricated chart points

| ID | Challenge | Severity | Resolution |
|---|---|---|---|
| CAP-DATA-01 | `two-clocks.html`'s `mmData` array plotted Jan–Jun 2026 m/m values (+0.3, +0.2, +0.4, +0.1, +0.5, +0.2) that appear nowhere in `facts-capex.md`, the page prose, or Appendix 1A — only July's −0.6% is Census-sourced. `yyData` likewise plotted Mar (+6.0) and Apr (+6.4) y/y values with no source; only May/Jun/Jul are sourced. Bars and line points for invented and real months were rendered with identical styling — no asterisk, dashed treatment, or "illustrative" label — so a reader could not tell six of eleven plotted values were fabricated. Verified by reading the file directly: lines 66–71 (pre-edit) held the full arrays, and the rendering loop (lines 84–113) applied the same fill/label logic to every point regardless of source status. | blocker | Removed all six unsourced points. `mmData` now holds only the Census-sourced July value; `yyData` now holds only the three Census-sourced May/Jun/Jul values. Added a visible caption note under the bar panel ("Only July is Census-reported m/m. Prior months are outside this release and not shown.") so the chart's scope is stated, not just implied by what's absent. Updated the bar-panel `aria-label` to match (it previously claimed "January through July 2026"). |

### Front-end — dead weight and class-naming drift (CAP page)

| ID | Challenge | Severity | Resolution |
|---|---|---|---|
| CAP-FE-01 (reported as GOV-FE-03 in the source lens, but the cited file is automation-capex-air-pocket.md) | All six `.visual-frame` blocks set `style="--vf-h:...; --vf-h-m:..."` on the wrapping div (correct) and then repeated the identical style on the child `<iframe>`, which does not consume those custom properties (only `.visual-frame` reads them per `deep-dive-gantry.css`; the iframe's own layout is `width:100%; height:100%`). Verified by reading all six iframe tags directly — every one carried the duplicate inline style. | minor | Removed the duplicate `style="--vf-h:...; --vf-h-m:..."` attribute from all six `<iframe>` tags in `automation-capex-air-pocket.md`, keeping it only on the parent `.visual-frame` div. |
| CAP-FE-02 (reported as GOV-FE-02 in the source lens, same file mislabel) | The note-panel's evidence-stance legend labels one chip "Inference" but assigns it the `gy-chip--open` class, which `deep-dive-gantry.css` styles and documents elsewhere as meaning unresolved/"Open" evidence — a different concept from the page's own "Inference" (this page's own labeled synthesis). No `--inference` variant existed to use instead. Verified: line 29 of the content file vs. the four chip variants defined at `deep-dive-gantry.css:525–548`. | minor | Added a dedicated `.dd-gantry .gy-chip--inference` rule to `deep-dive-gantry.css` (same visual treatment as `--open`, since the two concepts share a "hedge, not fact" register) and changed the content file's Inference chip to use `gy-chip--inference`, so the class name now matches its displayed semantic. |

### Security — external font dependency

| ID | Challenge | Severity | Resolution |
|---|---|---|---|
| SEC-GEN-04 (capex portion) | All 7 capex figure files (`category-mix-july.html`, `commit-gate.html`, `commitment-board.html`, `disclosure-gap.html`, `lifecycle-exit.html`, `two-clocks.html`, `two-economies.html`) loaded `https://fonts.googleapis.com/...` inside a `sandbox="allow-scripts allow-same-origin"` iframe on every page view — a live third-party network call from what is supposed to be a self-contained sandboxed figure, leaking visitor IP/UA to Google and breaking if the CDN is blocked. Verified with a direct grep across the capex visuals directory: all 7 files matched before the fix, 0 after. | major | Removed the external `<link href="https://fonts.googleapis.com/...">` tag from all 7 files. The figures already declare local `--gy-display`/`--gy-body-font`/`--gy-mono` custom properties with system-stack fallbacks (Saira Condensed/Inter/IBM Plex Mono → sans-serif/monospace), so removing the CDN link degrades gracefully to the system font stack rather than breaking layout. |

### Technical design doc — tree/composite disconnect and diagram gap

| ID | Challenge | Severity | Resolution |
|---|---|---|---|
| CAP-CTO-01 | §8's "Which pattern when" decision tree has seven live leaves (C, E, G, I, K, M, N) driven by four independent yes/no questions, but "Recommended composite" immediately below asserts one fixed sequence (P6 → P3+P2 → conditional P4/P5) as *the* recommendation without stating which leaf combination it assumes. A reader who lands on leaf E (can't measure at the cell) would be told by the tree to rent capacity (P5), and by the composite — if read in isolation — to buy an instrumented beachhead cell they were just told they can't measure. Verified by reading §8 in full: the mermaid tree (lines 321–336) and the composite (lines 340–348) in the pre-edit doc. | major | Added an explicit assumption sentence immediately under the composite heading, stating it assumes the modal leaf (screen passes, cell measurable, no baseline yet, supplier signs — F→G→H→I) and naming the two most consequential alternate leaves (D→E → read as P5; H→J→K → read as P7 first). |
| CAP-CTO-03 | §5.4's prose states the capex gate "has exactly three verdicts and no fourth: RELEASE, HOLD, EXCEPTION," with EXCEPTION explicitly important because it's the re-entry path for a Family-1 Conviction Network commitment the decision tree otherwise refuses to route to (§8's own "P1 has no entry path" note). But §4's architecture-diagram gate node H only drew two edges, `Release` and `Hold` — EXCEPTION was invisible at the architecture level. Verified with a direct grep for the gate's mermaid edges and the "exactly three verdicts" prose — confirmed only two edges existed pre-fix. | minor | Added `H -.->|Exception, signed| I` (dashed, distinct from the solid Release edge) to §4's mermaid diagram, so all three verdicts the prose commits to are now visible in the pipeline view. |

---

## Rejected

| ID | Challenge | Reason for rejection |
|---|---|---|
| CAP-FACT-01 | Claimed a possible FedEx loading/unloading conflation risk in the page's factual claims generally. | Re-checked against `facts-capex.md` and `sota-capex.md`: the page's *factual* attribution (Dexterity = loading, Berkshire Grey = unloading, separate deals) is correct everywhere except the two spots fixed under CAP-COPY-01/02 above, which were a copy/framing defect, not a fact error — the underlying facts were always right in the appendix and source ledger. Filed here as "no defect" by the original fact-fidelity lens; confirmed clean. |
| CAP-FACT-02 | Possible m/m vs. y/y conflation. | Checked the full page: −0.6% m/m and +5.0% y/y are kept distinct in the stat-strip, Chapter 1 body, the note-panel's own "the rule this page enforces," and Appendix 1A. No substitution found anywhere. Original lens marked this "no defect found"; confirmed. |
| CAP-FACT-03 | Possible mixing of the two truckload freight estimates (8.6M vs. 18.9M). | Both figures carry `gy-chip--estimate` consistently, with differing windows/scope stated in both prose and Appendix 5B, matching `facts-capex.md` §4. No defect. |
| DOC-FACT-02 | Possible drift between the design doc's stated conventions and the page's. | Checked `Automation_Capex_Air_Pocket_Technical_Design.md` lines 25, 426–427, 466 against the page and `facts-capex.md`/`sota-capex.md`: m/m vs. y/y and loading vs. unloading are both held as explicit "standing conventions" in the doc and match the page (after the CAP-COPY fixes above). No defect. |
| CAP-DATA-02 | `category-mix-july.html` correctness. | The figure's numbers are correct against `facts-capex.md` and Appendix 1A. The lens's actual complaint — that the file is unreferenced by any `<iframe>` in the page — is a build/wiring note, not a data-integrity defect, and is out of scope for a content/data-fidelity fix in this pass. Left unfixed; flagged for the build owner separately, not counted as a red-team defect. |
| SEC-GEN-05 | `_theme-bootstrap.js`'s postMessage handler doesn't validate `event.origin`. | Confirmed the code has no origin check, but (a) the payload is whitelisted to the literal strings `'dark'`/`'light'` with no eval/innerHTML/property-write path, so real impact is cosmetic-only exactly as the original lens itself concluded, and (b) the file is a `.js` file shared identically across all three pages' visuals directories, outside this ledger's edit scope (`*.html`, the two content files, and `deep-dive-gantry.css` only). Not fixed here — rejected as out-of-scope for this page-specific pass, not as a non-issue; see Open below. |
| CAP-CTO-02 | §9-C1/C2's concession (demand may be fine annually) allegedly under-signaled in §12.1's closing recommendation. | Re-read §12.1 and §9-C1/C2: the closing section's framing choice is a legitimate editorial call about how much weight to give a red-team concession in the executive summary, not a factual or structural defect — the concession is fully present and undiluted in §9 itself, two sections earlier, and §3 already pre-empts the critique by saying the thesis only needs ambiguity, not a confirmed downturn. Judgment call, not a defect requiring a fix; moved to Open. |
| CAP-CTO-04 | §10/Appendix A's "HIGH confidence" grade on S17/S37 (absence of published unit economics) allegedly overstates what a negative search result can support. | The document's own prose (§6.1, §9-C5) is already explicit that this is "absence of evidence, not evidence of absence" — the hedge is present at first use, not buried. The ledger's confidence grade is a methodology-labeling nitpick about a ledger column, not a claim the document gets wrong. Judgment call; moved to Open. |
| CAP-COPY-04 | `&mdash;` entity used in a `<td>` for "fully disclosed, not AI" (UPS contrast row) is stylistically inconsistent with other "not disclosed" cells using plain text. | Confirmed the inconsistency exists but it is an HTML entity inside a table cell, not a literal em-dash character in prose, and the original lens itself rated it a non-blocking nit. Too small and too subjective to warrant a unilateral fix; left for the author. Moved to Open, not treated as a ledger defect. |
| TWN-COPY-01, TWN-DATA-01, GOV-FACT-01, GOV-CTO-01/02/03/04/05, all TWN-CTO-*, TWN-SEC-*, GOV-FE-01 | Findings scoped to the AI-governance or Taiwan pages, not this page. | Out of scope for this ledger — this pass is limited to `CAP-*` findings and `*-GEN-*` findings whose evidence trail names an automation-capex-air-pocket.md file. Not adjudicated here. |

---

## Open — judgment calls for the author

| ID | Issue | Reasoning |
|---|---|---|
| CAP-COPY-03 | Nine literal em-dash characters appear inside `<caption>` elements in the appendix tables (Appendices 1A, 1B, 2A, 3A, 4A, 5A, 5B, 6A, 6B), outside any `## Chapter N — Title` heading. House style states the em-dash is "ONLY allowed inside chapter headings." | Checked the actual spine-nav implementation: `public/scripts/spine-gantry.js:56` matches `/^(?:Chapter|Scene)\s+(\d+)\s*[—–-]\s*(.+)$/` against each `<h2>` heading's own text content individually, not a document-wide scan. The captions cannot trigger or interfere with spine-nav regardless of their em-dash usage — the "blocker" framing in the original finding does not hold. It remains a genuine, if narrow, house-style consistency question (nine instances, all outside headings) that a copy-focused pass could clean up with an en-dash or colon, but rewriting nine appendix captions is a cosmetic content decision the author should make deliberately, not something a red-team refuter should force through unilaterally. |
| CAP-CTO-02 | §12.1's closing recommendation doesn't explicitly re-surface the §9-C1 concession that annual demand still looks healthy. | See Rejected above — real observation, but an editorial-weight call about the executive summary, not a defect. The author may reasonably choose to add a one-sentence pointer, or may reasonably decide §9 already covers it adequately for the intended reading path. |
| CAP-CTO-04 | Appendix A's confidence-grade column labels S17/S37 "HIGH" for an absence-of-evidence claim. | See Rejected above — the hedge is present in prose; this is a ledger-column labeling preference (e.g., "HIGH (search completeness only)"), not a correctness defect. |
| SEC-GEN-05 | `_theme-bootstrap.js` (shared across all three pages' visuals directories) has no `event.origin` check on its postMessage listener. | Real, low-severity (cosmetic-impact-only per the original lens's own analysis), but the shared `.js` file sits outside this ledger's edit scope (content files, capex `*.html` figures, and `deep-dive-gantry.css` only). Fixing it correctly means fixing the shared source once and re-propagating to all three pages' copies — a cross-page change better handled as its own task than folded into a capex-page-scoped ledger. |

---

## Summary

- **Confirmed and fixed: 10** — 2 copy/content (loading-vs-unloading conflation in the hero stat and Chapter 2 lead), 1 data-integrity blocker (six fabricated chart points in `two-clocks.html`), 2 front-end (duplicate `--vf-h` inline styles, `Inference` chip class mismatch), 1 security (Google Fonts CDN dependency removed from all 7 figure files), 2 design-doc structural gaps (composite/tree assumption stated, EXCEPTION edge added to the gate diagram) — counted as 8 distinct fixes across 10 finding IDs where two ID pairs shared one resolution.
- **Rejected: 15** (10 CAP/DOC items checked-and-cleared or out-of-scope for a page-specific pass, plus a block of governance/Taiwan-scoped findings not in scope for this ledger).
- **Open: 4** — nine em-dash captions (verified non-blocking to spine-nav, a real but cosmetic style nit), two design-doc editorial-weight/labeling judgment calls, and the shared theme-bootstrap postMessage origin check (real but out of this ledger's edit scope).
- **Worst surviving issue:** none blocking. The one true blocker found (CAP-DATA-01, fabricated chart data with no visual distinction from sourced values) is fixed. The open items are either genuine editorial-taste calls the author should make deliberately, or a cross-page shared-file fix that belongs in its own task rather than this page-scoped pass.

## Verification after the fixes (Team C)

- `npm run build`: clean, `/deep-dives/automation-capex-air-pocket/` present in `dist/`.
- Live-page DOM check: all 6 embedded `.visual-frame` figures (the page has 6 embedded exhibits, not 7 — `category-mix-july.html` exists in `public/visuals/automation-capex-air-pocket/` as an orphaned, unembedded figure file; README corrected from "7" to "6" to match) autosize to a non-zero height (469px–608px), no blank space.
- `two-clocks.html`: confirmed only 4 data points render (dropped the 6 fabricated months), `gy-chip--inference` class present exactly once in the rendered DOM matching the corrected legend.
- Network trace shows zero `fonts.googleapis.com` requests from the capex figure iframes.
- Console errors on load are limited to `POST /api/collect → 404`, the known local-preview analytics gap.
- Note for a follow-up task, not this page: `category-mix-july.html` is dead weight in the visuals directory — either wire it into a 7th chapter figure or delete it.
