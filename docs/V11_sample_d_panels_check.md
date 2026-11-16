# V11 sample D panels check

Scope: the three panels added to src/components/deep-dive/WhatBreaksFloor.astro (#wbf-grid, #wbf-build, cost chart in #wbf-costs). Checked on 2026-10-27 against model.ts, src/data/what-breaks/*.json (byte identical to drafts/deep arch, data and sol), WhatBreaksStage.astro and docs/AI_Challenges_Solutions_Technical_Design.md (section 6.4 and block short names). No source file was edited.

Result: 0 wrong, 0 made up. One wording note on P6.

| Item | Page value | Source value | Status | Where checked | Fix |
|---|---|---|---|---|---|
| Grid title | All 24 problems | 10 search plus 14 frontier rows = 24 | verified | data.json, Stage | none |
| Lane 1 label | Web search, 10 | 10 S rows, same label on Stage line 48 | verified | data.json, Stage | none (label is hard coded, count is not derived) |
| Lane 2 label | Wider AI use, 14 | 14 F rows, same label on Stage | verified | data.json, Stage | none |
| S1 to S10 names | Citation does not hold, Silent failure, Stops too early, Planted sources win, Stale facts, Snippets, not pages, Blocked pages, False premise, Memory beats search, Planted instructions | data.json sn fields, same tile code as Stage | verified | data.json | none |
| F1 to F14 names | Confident wrong answers, Agents act wrongly, Data leaves your control, Agent tools attacked, Spend without return, Models change, Surprise usage caps, Tells you what you want, Controls lag rollout, Review overload, Loses context, Outages, Misfiring safety filters, Vendor lock-in | data.json sn fields | verified | data.json, design doc table | none |
| Status labels | Still true, New events, Harm rising | arch.labels true, new, worse | verified | arch.json | none |
| Status per problem | New events: S4, S7, F7, F8, F9, F14. Harm rising: F2. Still true: the other 17 | data.json st fields | verified | data.json | none |
| Build title and sub | Four layers, built contracts first. Each layer rests on the one before it. tag design | Stage lines 146 to 147, arch.build.ev design | verified | Stage, arch.json | none |
| Build summary | 4 layers, 10 blocks | 4 layers, 10 blocks P1 to P10, none orphaned | verified | arch.json | none |
| Layer 1 | Contracts. Change terms at the next renewal, before anything is built on them. | arch.build.why | verified | arch.json | none |
| Layer 2 | Platform. One tool, a gateway with pinned models, your own test set. | arch.build.why | verified | arch.json | none |
| Layer 3 | Controls. Claim check, source rules and the agent fence, on the gateway. | arch.build.why | verified | arch.json | none |
| Layer 4 | People and money. Named checkers, a value ledger and the failure log. | arch.build.why | verified | arch.json | none |
| Blocks in Contracts | Contract terms (P7) | arch.layers | verified | arch.json, Stage | none |
| Blocks in Platform | One approved tool (P5), Gateway, pinned models (P6), Your own test set (P10) | arch.layers | verified | arch.json | none |
| Blocks in Controls | Check every claim (P1), Source and date rules (P2), Agent fence (P4) | arch.layers | verified | arch.json | none |
| Blocks in People and money | Named checkers (P9), Value ledger (P8), Failure log (P3) | arch.layers | verified | arch.json | none |
| P6 name | Gateway, pinned models | arch.json and Stage say the same. Design doc says Gateway with pinned models | verified (wording differs) | arch.json, doc line 138 and 410 | optional, align doc or data on one short name |
| Layer tile tone | LAYER_TONE by arch layer index | same rule as Stage and layerOf | verified | model.ts, Stage | none |
| Cost title and tag | Cost to run, a month, illustrative | Stage line 66, all costev illustrative, doc 6.4 Illustrative only | verified | arch.json, Stage, doc 6.4 | none |
| Cost count | 9 blocks | 9 priced. P2 has no public price and is left out | verified | arch.json, doc 6.4 | none |
| P1 cost | $20 to $13,930 | $20 to $13,930 | verified | doc 6.4 | none |
| P3 cost | $0 to $411 | $0 to $411 | verified | doc 6.4 | none |
| P4 cost | $181 to $453 | $181 to $453 | verified | doc 6.4 | none |
| P5 cost | $4,000 to $6,000 | $4,000 to $6,000 | verified | doc 6.4 | none |
| P6 cost | $0 to $700 | $0 to $700 | verified | doc 6.4 | none |
| P7 cost | $256 to $1,535 | $256 to $1,535 | verified | doc 6.4 | none |
| P8 cost | $199 to $997 | $199 to $997 | verified | doc 6.4 | none |
| P9 cost | $1,941 to $9,703 | $1,941 to $9,703 | verified | doc 6.4 | none |
| P10 cost | $1 to $1,344 | $1 to $1,344 | verified | doc 6.4 | none |
| Grid tile clicks | data-prob set to p.id (S1 to F14) | openProblem finds probs by the same id | verified | Floor lines 84, 596, 552 | none |
| Build tile clicks | data-open set to block id | openBlock reads D.blocks by the same id | verified | Floor lines 83, 598, 546 | none |
| Cost bar clicks | data-open set to x.id | same handler, ids P1 to P10 less P2 | verified | Floor line 82, model.ts costRows | none |

Fixes applied, 2026-10-27: the grid lane labels now count from data (Web search and Wider AI use, on sample D and the stage page). P6 now reads "Gateway, pinned models" in the design doc short-name list (line 138) and cost table (line 410). The block table, heading and controls rows keep the longer wording because they are running description, not short labels.
