# W7 audit trace, client asks against the delivered doc and page

Audited 2026-11-15. Read only, except this file.

Inputs:
- Doc: docs/Agentic_Commerce_Protocols_Technical_Design.md (built 21:47)
- Page data: drafts/acx/data.json (edited 21:48)
- Scenes: drafts/acx/scenes/s1.html to s6.html
- Built page: dist/deep-dives/agentic-commerce-protocols/index.html (built 21:47), rendered at http://127.0.0.1:8741/deep-dives/agentic-commerce-protocols/
- Research and checks: docs/Agentic_Commerce_Protocols_research/

Hash keys by scene: s1 `use`, `flow`, `p`. s2 `view` (matrix, arch, tree), `cfg`. s3 `ev`. s4 `who`. s5 `ch`, `sh`. s6 `yr`, `sc`. All scenes also carry `reader` (leader, architect).

Rule for marks: Met means it is in the doc and visible on the page (or the ask is only about the doc or research). Partly means it is in the doc but not visible on the page, or it is present but thin. Missing means not found in either.

## Result

| Mark | Count |
|---|---|
| Met | 16 |
| Partly met | 8 |
| Missing | 0 |
| Total | 24 |

## Trace

| # | Ask, atomic | Doc | Page | Mark | Evidence |
|---|---|---|---|---|---|
| 1 | Find all protocols for agentic commerce and payment | 2.1 to 2.4 | s1, `#p=acp` to `#p=fido`, "Show all 19" in s2 | Met | 19 protocol chips in s1, each opens a drawer with status, layers and owner |
| 2 | Compare them | 2.3, 4.3, 8.1 Side by side | s2 `#view=matrix` | Met | Matrix compares the 19 on the core parameters, s1 drawers show layer coverage |
| 3 | Find the right parameters and variables to build them | 4.1 to 4.4 (P1 to P28, V1 to V19) | s1 parameter chips (Initiator presence, Mandate type, Rail, Finality, Dispute path), s2 `#cfg` configurator (Spend limit to Own agent completed share) | Met | Doc 4.4 names which P and V reach the page and which stay in the doc |
| 4 | How they will change the future | 11.1 to 11.4 | s6 `#yr=2026` to `#yr=2030`, `#sc=` four worlds, Forecasts and incentives | Met | Four scenarios with kill tests, forecasts paired with each author's incentive |
| 5 | Current challenges, top 10 problems and customer pain points | 10.1 to 10.4 | s5 `#ch=1` to `#ch=10`, `#sh=` six stakeholders heatmap | Met | Heatmap "Where each problem hurts", row drawer gives the pain and who is fixing it |
| 6 | Adoption | 6.1 to 6.5 | s3 `#ev=` evidence ladder | Met | Each adoption figure placed on rungs 1 to 7, vendor figures hollow |
| 7 | Deep review of the existing deep research | 0.2 (ledger ids from earlier rounds), 6.4 reconciles the payouts x402 figure, research/R0_*.md baseline slices | None on this page | Partly | The earlier research is used as the R0 baseline but the doc has no section that reviews it and states verdicts. The payouts page carries such a review (20 statements rechecked), this doc does not |
| 8 | Start with design and give technical directions | 3, 5.1 to 5.5 (ADR-1 to ADR-6), 15.2 | s2 `#view=arch` with ten components and owners, s2 "You must build" list | Met | Gateway diagram and build list visible, ADR text in doc |
| 9 | Play multiple personas to conclude design and architecture | 0.1 (seven personas), 5.3, 7.2 notes for Elena | s2 `#view=arch` shows owner names only (Maya, Kofi, Ravi, Sam, Hana, Noor) | Partly | Page shows no panel, no stakes and no settled tensions. Elena does not appear at all |
| 10 | Challenge the approach and find the gaps | 12 (RT1 to RT20, D1 to D21) | None. s6 kill tests are the only trace | Partly | Search of all rendered text across every state finds no critique, red team or RT content |
| 11 | Research to close the gaps and conclude | 13.1 to 13.6 | None as a section | Partly | Findings are folded into s3 and s4 figures but the page never says what the gap research changed |
| 12 | How decisions are made, what to weigh and why | 8.2, 8.3, 8.4 | s2 "What to weigh" weights plus liability gate, s2 `#view=tree` | Met | Seven weighted criteria plus a pass or fail liability gate, decision tree with yes and no branches |
| 13 | Go into multiple dimensions | 6 adoption, 7 liability, regulation and security, 9 players, 10 challenges, 11 future | Six scenes | Partly | Liability by jurisdiction (7.2) and per protocol dispute answers (7.3) reach the page only as fragments (s5 EU SCA line, s6 PSD3 and ICO signposts), although the page title is "Who Pays When the Agent Buys" |
| 14 | What we missed | 14 (22 Oct to 15 Nov 2026) | None | Partly | Doc table exists, no page surface |
| 15 | Completeness, correctness and truthiness check per statement | Appendix A ledger (455 AC rows with check column), 13.6 | s3 "How this was checked" card: 455 cited, 455 rechecked, 391 kept, 63 fixed, 1 unconfirmed | Met | Research files W3_K1 to K6, W6_K7a, W6_K7b, W7_K9 hold the per claim verdicts |
| 16 | Top 3 companies | 9.1 to 9.3 | s4 `#who=mastercard`, `#who=visa`, `#who=google` | Met | Company #1 to #3 cards with strategy, layers and latest moves |
| 17 | Top 3 startups | 9.4 | s4 Startup #1 to #3, for example `#who=crossmint` | Met | Startup cards with funding and moves |
| 18 | Recent research | 7.4 (twenty items) | Fragments in s5 drawers only (Visa benchmark, PCAT defence research) | Partly | No research list or finding cards on the page |
| 19 | Build a page and artifacts | Header line 5 links the page | dist page served, drafts/acx/out/artifact.html | Met | Page renders all six scenes. Note: dist is one field behind data.json (patterns[1].latency still "millisecond checks per payment") |
| 20 | Later: recheck all cited claims | 13.6 line 1832, Appendix A | s3 checks card | Partly | 15.3 line 1928 still says "133 cited claims were not rechecked in Wave 3", which contradicts 13.6 and the page's 455 of 455 |
| 21 | Later: clear tie-break for rank 2 | 9.1 line 1289 rule, 9.3 line 1341 | s4 `#who=visa` and `#who=google` "Ties break on the score with vendor reach cut, Visa leads 340 to 320" | Met | Rule stated once and applied in both places |
| 22 | Later: check every payouts page number | Payouts page is separate, linked at doc line 5 | Not on this page by design | Met | W6_K8 checked 143 numbers, W7_K10 rechecked. K10 fixes for "Money at risk ... our scores" and Meow wording are in src/content/deep-dives/agentic-payouts-desk.md. W#10 stays unverified with reworded text |
| 23 | Later: label the 3% trigger as our proposal | 4.4 V17 line 360, ADR-1 line 479, 11.3 line 1689, 15.3 line 1920 | s2 configurator V17 "Our proposed threshold, not sourced", s2 build list "our proposed 3% threshold", s6 signpost | Met | W7_K10 confirms every use carries the label |
| 24 | Later: add Stripe's OpenRouter deal to players | 9.3 line 1335, 9.5 line 1401, AC#390 to AC#396 | s4 `#who=stripe` "Agreed to buy OpenRouter" | Met | Card says the deal does not change Stripe's score of 325 |

Counts: Met 16 (rows 1 to 6, 8, 12, 15 to 17, 19, 21 to 24). Partly 8 (rows 7, 9, 10, 11, 13, 14, 18, 20). Missing 0. The no em-dash or semicolon ask is checked in the next section and passes.

## House rules, by script

Page: rendered at 127.0.0.1:8741, scrolled end to end, then every scene button clicked in both reader modes (154 controls, 917 distinct visible lines, 39,751 characters). Also scanned all text nodes, aria-label, title and alt values, and every string in drafts/acx/data.json (2,264 strings).

| Check | Page visible text | aria, title, alt | data.json strings | Doc prose |
|---|---|---|---|---|
| Em-dash U+2014 | 0 | 0 | 0 | 0 (also 0 raw, 0 en-dashes) |
| Semicolon | 0 | 0 | 0 | 0 in prose (0 raw, code and entities excluded) |
| URLs or domains | 0 | 0 | 0 | Allowed, in Appendix A only |
| Source ids (G-n, Rn-n, Cn, V#n, AC#n, Kn, Sn) | 0 | 0 | src arrays exist but no scene renders them | Allowed |

All house rules pass.

## Top 5 gaps and fixes

1. Red team, gap research and "what we missed" (doc 12, 13, 14) have no page surface. Fix: add a `critique` key to drafts/acx/data.json with the eight high RTs, verdict, decision and what changed, plus the section 14 rows, and render it as a "How we challenged it" band in drafts/acx/scenes/s6.html under the scenarios.
2. Liability by jurisdiction and by protocol (doc 7.2, 7.3) is missing from a page titled "Who Pays When the Agent Buys". Fix: add a `liability` key to drafts/acx/data.json (route, who carries the loss, rule, date) and a loss holder strip in drafts/acx/scenes/s5.html tied to challenge 1 (`#ch=1`).
3. Recheck statement contradicts itself. Fix: in docs/Agentic_Commerce_Protocols_Technical_Design.md 15.3 line 1928, replace the "133 cited claims were not rechecked" line with the final W6 and W7 result (455 rechecked, 1 unconfirmed, G-136), matching 13.6 line 1832 and the s3 card.
4. Personas are names only on the page. Fix: add a `panel` key to drafts/acx/data.json (seven personas, stake, one settled tension each) and show it in drafts/acx/scenes/s2.html as a strip above `#view=arch`, so Elena and the tensions appear.
5. Recent research (doc 7.4) is thin on the page. Fix: add a `research` key to drafts/acx/data.json with the strongest six items (finding, preprint or lab flag, date) and render them as cards in drafts/acx/scenes/s5.html, linked from the challenges they inform.

Further items, below the top 5:
- Deep review of the earlier research has no named section. Add doc section 0.4 that lists the R0 baseline reviewed, rows kept, fixed and dropped.
- dist/deep-dives/agentic-commerce-protocols/index.html is one field behind drafts/acx/data.json (patterns[1].latency). Rebuild with drafts/acx/splice.py.
- Doc 11.3 line 1689 kill test adds "or the vendor panel passes 3 percent of US orders" without the proposal label. Add "(our proposed threshold)" there too.
