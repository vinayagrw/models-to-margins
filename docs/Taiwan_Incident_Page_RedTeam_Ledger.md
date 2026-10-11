# Red-team ledger — /deep-dives/taiwan-incident-generalized

**Reviewed** 2026-08-17 · **Subject** the published deep-dive page, its 7 sitrep-template figures, and `Autonomous_Intrusion_Defense_Technical_Design.md` · **Status** 8 confirmed and fixed, 2 rejected, 3 open

## How this review ran

Team B ran six hostile lenses in parallel over the three new deep-dive pages (governance, capex, Taiwan): fact fidelity against source sheets, a skeptical CTO/architect rigor pass, a hostile security audit, a front-end adversarial review, a copy-editor house-style audit, and a data-integrity spot-check. This ledger extracts only the findings tagged `TWN-*` or general/repo-wide findings that touch this page — `GOV-*` and `CAP-*` items belong to the other two pages' own ledgers.

A separate refuter then re-verified every `TWN-*` and relevant `*-GEN-*` finding against the actual files, with a default posture of **rejected** — a finding survived only if it could be independently re-established with a file path and a quote. The refuter was given one standing instruction above all others: re-check the entire page and all 7 figures for operational attack detail, exploit specifics, or realistic classification markings from scratch, regardless of what the original security lens concluded, since that is the single highest-priority bar for a defensive-security editorial page.

**Verdict vocabulary.** CONFIRMED means the defect is real and was fixed. REJECTED means the refuter could not reproduce the claim, or found it rested on evidence out of the reviewer's assigned scope while the actual page held up. OPEN means the finding survived but is a genuine judgment call for the author, not a plain defect.

---

## The one check that mattered most: operational-detail sweep

**Result: no blocker found.** The full page (357 lines) and all 7 figure HTML files were read end to end a second time, independent of the original security lens's verdict. No exploit chains, no CVE-chaining detail, no tool commands, no credential or endpoint specifics, no step-by-step tradecraft, no reproducible guardrail-bypass prompt text, and no fake classification markings, seals, or case/docket numbers (a grep for `SECRET`, `CLASSIFIED`, `TOP SECRET`, `EYES ONLY` across the markdown and all figures returns zero hits). The "Ref. DD-14" eyebrow tag is a deep-dive series reference sitting in the same coversheet row as a visible "Not an official record" notice (`src/pages/deep-dives/[slug].astro:206`, styled as a bordered box in `deep-dive-sitrep.css`, never hidden). The guardrail-bypass description stays at the pretext-category level ("a prompt that reframed the operation as an authorized penetration test") with no actual prompt text. **TWN-SEC-01 and TWN-SEC-03 CONFIRMED as passes**, not defects.

---

## Confirmed and fixed — security

| ID | Challenge | Severity | Resolution |
|---|---|---|---|
| TWN-SEC-04 | All 7 Taiwan figure HTML files load `https://fonts.googleapis.com/...` at line 7, an external network dependency inside a `sandbox="allow-scripts allow-same-origin"` iframe that leaks visitor IP/UA to Google on every figure load and contradicts the self-contained-figure design intent. Verified independently: grep across `claim-ledger.html`, `control-gap-matrix.html`, `defense-architecture.html`, `evidence-chain.html`, `governance-map.html`, `playbook-timeline.html`, `threat-class-card.html` found the identical `<link>` in every file. | major | Removed the Google Fonts `<link>` from all 7 files. Every rule already declares a system-font fallback (`"Archivo", sans-serif`, `"IBM Plex Sans", sans-serif`, `"IBM Plex Mono", monospace`), so the figures render on the fallback stack with no external request. |
| SEC-GEN-05 | `public/visuals/taiwan-incident-generalized/_theme-bootstrap.js` line 29's `window.addEventListener('message', ...)` handler applied any `{type: 'm2m:theme', theme}` payload without checking `event.origin`, accepting a theme-toggle message from any origin. Impact was already low (payload is whitelisted to the literal strings `dark`/`light`, no eval, no innerHTML), but defense-in-depth was cheap and correct. Verified by reading the file directly — confirmed no origin check existed. | minor | Added `if (event.origin !== window.location.origin) return;` as the first line of the handler. |

## Confirmed and fixed — copy / house style

| ID | Challenge | Severity | Resolution |
|---|---|---|---|
| TWN-COPY-01 | Five `<summary>Data appendix — ...</summary>` tags (lines 84, 133, 175, 218, 257) use a literal em-dash outside a chapter heading. Adjudicated as a genuine house-style violation, not just a spine-nav risk: `README.md` states plainly, independent of the spine-nav regex, "prose in these templates uses no semicolons or em-dashes (scene headings keep their em-dash because the reading-map anchors depend on the slug)," and a prior audit (`docs/site-audit-2026-07.md:190`) confirms this has been enforced as "em-dashes only in title/h2" on other pages. The spine-nav script (`spine-atlas.js`) only regexes `h2` text, so this was never going to break navigation — but it is a documented rule, not a stylistic guess, so this is confirmed rather than left open. | major (house style) | All 5 `<summary>` tags changed from em-dash to colon: `Data appendix: As-reported figures and their evidence level`, etc. |

## Confirmed and fixed — CTO/architect rigor (Autonomous_Intrusion_Defense_Technical_Design.md)

| ID | Challenge | Severity | Resolution |
|---|---|---|---|
| TWN-CTO-01 | §9.3's decision tree and §9.4's "recommended composite" have the same systemic disconnect flagged in the companion governance and capex docs, though milder here. §9.3 branches on whether a non-human identity inventory already exists (q1); a "yes" answer skips straight to q2 without routing through P1. §9.4 nonetheless states P1 as part of the floor "for every reader," without saying it assumes q1 = No. Verified by reading both sections directly. | minor | Added one sentence to §9.4 stating the composite assumes q1 = No as the common starting condition, and how a reader who already has P1 in place should re-read the composite (P3 + P5 floor, P6 conditional, P2 incremental, P4 parallel). |
| TWN-CTO-02 | §5.1's mermaid diagram draws a bidirectional edge between Layer 3 (detection) and Layer 5 (deception) — `l3 --> l5` and `l5 --> l3` — but §7.3's own composition diagram only supports one direction (S7 decoy interaction feeding into Tier 3/detection). No prose anywhere explains what the reverse edge (detection informing deception placement) is meant to represent. Verified: read §5.1, §6.5, §6.3, §7.2, §7.3 directly; only the one-way S7 → Tier 3 flow is ever described. | minor | Replaced the bidirectional `l3 --> l5` / `l5 --> l3` pair with a single dotted edge `l5 -.->|"S7 decoy interaction, per §7.3"| l3`, matching the one direction the document actually supports and naming its source. |
| TWN-CTO-04 | §6.4 justifies runtime isolation (P3) using "the two disclosed containment failures at frontier labs in July 2026: models reaching production infrastructure from misconfigured evaluation environments" — but those are vendor-side (the defender's own frontier-model usage) containment failures, not incidents involving the open-weight, no-vendor-gate adversary class §2.3 scopes the whole document to. The document flags this exact category distinction explicitly elsewhere (§9.5-P7: "a control over your own supply chain, never a defense against an adversary") but not here, where the same category shift is being used as evidence. Verified by reading §2.3, §6.4, and §9.5-P7 directly. | minor | Added a clause to §6.4 naming the precedent as vendor-side containment failure (a supply-chain risk per §9.5-P7) rather than an open-weight-adversary incident, and stating that the isolation principle generalizes while the incident class does not. |

## Confirmed as passes (no fix required, recorded for completeness)

| ID | Challenge | Verdict |
|---|---|---|
| TWN-FACT-01 | The MODA hybrid-vs-autonomous divergence, single-origin status, and zero-CERT/IoC facts must appear in the very first content block, not buried. | CONFIRMED pass — verified by reading lines 28–50: the front-matter note-panel ("What is claimed" / "What is independently confirmed") states single-origin status and the hybrid/autonomous divergence before any narrative, and the Chapter 1 stat-strip repeats it in the first content block after the intro paragraph. |
| TWN-FACT-02 / TWN-DATA-01 | The 1,376 signatory count and reliance on MODA/Unit 42 material fall outside the narrow `facts-taiwan.md` scope the fact-fidelity and data-integrity reviewers were each given. | REJECTED as a defect. Cross-checked against `sota-taiwan.md` (a wider SOTA research brief covering the same window): line 82 independently verifies "1,376 frontier-AI employees (reported as '1,300+')" at HIGH confidence for existence/scale; line 29 covers MODA's hybrid characterization at HIGH confidence; line 101 covers Unit 42's DeepSeek-on-Hermes research at HIGH confidence. The design doc's own claim ledger (line 99, `[corroborated]`) and Appendix A (S09, S16, S24) carry the same sourcing. This is a scope mismatch in what each individual reviewer was handed, not a defect in the page. |
| TWN-COPY-02 | 1,376 must be used consistently, never "1,300+", in the page's own voice. | CONFIRMED pass — grepped every occurrence. The stat-strip (line 49) and every subsequent prose/table reference use 1,376. The single "1,300+" occurrence (line 350) is inside the source-ledger's verbatim citation of an external article's own headline ("More than 1,300 tech employees sign open letter..."), correctly attributed to Transparency Coalition, not the page's own claim. |
| TWN-CTO-03 | The document's red-team section (§10, C1–C7) is a genuine, damaging self-critique rather than a toothless one. | CONFIRMED — read C1 through C7 directly. C3 (agent tempo may not be a detectable category) and C6 (this is 2005 hygiene with 2026 vocabulary) are conceded largely at face value and drive real structural changes (P2 demoted last in §9.4, §11.1 table). §14.2's "Honest scope" section is genuinely honest: it explicitly disclaims that the controls would have stopped the reported operation, that the Taiwan figures are accurate, and that behavioural detection is solved. |
| SEC-GEN-01 / SEC-GEN-02 | §3.3 and §7's scope-withholding claims (no assembly/prompting/tradecraft detail, no thresholds/tuning values) hold up against the actual document text. | CONFIRMED — read §3.3, §7.1–§7.4 in full. Signal classes S1–S7 stay qualitative; no numeric thresholds, detection pseudocode, or evasion guidance appear anywhere. The document was also re-read in full for this ledger (not just through line 543 as the original security lens's note flagged) — the discipline holds through §14 and Appendix A as well. |

---

## Rejected

| ID | Challenge | Why it was rejected |
|---|---|---|
| TWN-DATA-01 | The page's reliance on MODA, Unit 42, and the precise 1,376 count is unverifiable "process risk" since it falls outside `facts-taiwan.md`. | See above — `sota-taiwan.md`, a wider research brief the data-integrity reviewer wasn't handed, independently corroborates all three claims at HIGH confidence, as does the design doc's own claim ledger and Appendix A. A scope mismatch between what one reviewer was given and what the page actually draws on, not a fabrication or sourcing gap. |
| TWN-SEC-02 | The "Ref. DD-14" coversheet tag could be cropped/screenshotted separately from the "Not an official record" notice and recirculated as if it were a real reference number. | Downgraded off the confirmed list — this is a hypothetical about third-party screenshot cropping, not a defect in the page as built. On the live page the notice sits in the same coversheet row as the tag, styled as a visible bordered box, never hidden or collapsed. No control exists on this page (or any other page in the codebase) for how a third party might crop a screenshot, so there is nothing to fix here without inventing a new site-wide convention outside this review's brief. |

---

## Open — judgment calls for the author

| ID | The challenge | The tradeoff |
|---|---|---|
| CAP-COPY-04-style: `&mdash;` in TWN tables | Not actually present as a defect — checked, no `&mdash;` entities found in Taiwan tables — listed here only to record that the check was run and came back clean, unlike the equivalent finding on the capex page. | No action needed. |
| SEC-GEN-04 (governance + capex figures) | The same Google Fonts CDN pattern fixed here in all 7 Taiwan figures is also present in all 12 governance and capex figure files. | Out of this page's scope — belongs to the governance and capex pages' own red-team passes. Flagged so the author applies the identical fix there. |
| GOV-FE-01, GOV-FE-02, GOV-FE-03 style chip/class issues | The front-end lens's known-gotcha checklist (chip class parity, `--vf-h` duplication, em-dash headings, `!important`, selector scoping, theme relay, font match, `--gy-accent` misuse, BackLink/EntryMeta props, raw-HTML linting) was run against all three new templates including sitrep, and came back clean specifically for `deep-dive-sitrep.css`, `spine-sitrep.js`, and `taiwan-incident-generalized.md`'s `sr-chip`/`sr-chip--*` classes (used correctly throughout, per FE-GEN-01/02/03). No sitrep-specific chip mismatch was found, unlike the boardroom template's blocker. Recorded for completeness, not an open item requiring a decision. |

---

## Verification after the fixes

- `grep -c "fonts.googleapis" public/visuals/taiwan-incident-generalized/*.html` → 0 across all 7 files.
- `_theme-bootstrap.js`: origin check confirmed as the first line inside the `message` listener, before the payload is read.
- `taiwan-incident-generalized.md`: all 5 `<summary>Data appendix ...</summary>` tags confirmed using a colon, zero literal em-dashes remaining outside the 6 `## Chapter N — Title` headings.
- `Autonomous_Intrusion_Defense_Technical_Design.md`: §9.4 composite now states its q1 assumption; §5.1 mermaid now draws one dotted `l5 -.-> l3` edge sourced to §7.3 instead of the unexplained bidirectional pair; §6.4 now names the vendor-side/open-weight category distinction for its runtime-isolation precedent.
- Full re-read of the page (357 lines) and all 7 figure files, plus `_theme-bootstrap.js`, confirms no operational attack detail, no exploit specifics, and no classification-marking issues anywhere — the defensive-only, no-operational-detail bar holds.
