# Knowledge Layer page audit

Page: `http://localhost:4321/deep-dives/knowledge-layer`. Date: 2026-10-25. All scores come from simulated personas scored by Claude, not from user data. The research plan sessions have not run yet.

## How it was scored

**Personas.** Four are the seats from `Knowledge_Layer_User_Research_Plan.md`. The fifth is a sceptic, because the hostile review found the CFO objections the hardest to answer.

| Persona | Wants from the page |
|---|---|
| Business buyer | A decision and a budget line |
| Data builder | A design that holds up in production |
| Strategy reader | Where the market is going |
| First-time reader | To understand the idea with no graph background |
| Sceptic CFO | Cost and proof before any spend |

**Criteria.** Each is scored 1 to 5. A persona's total is the sum of weight times score, divided by 5.

| Criterion | Weight | Measures |
|---|---|---|
| Thesis clarity | 15 | The title question is answered within 10 seconds |
| Visual first | 15 | Charts and diagrams lead, with little text |
| Interactive value | 15 | The sorter, replay and chooser work and teach something |
| Evidence trust | 15 | Verified and Illustrative tags, and no sources on the page |
| Decision aid | 15 | The reader leaves with a store choice |
| Plain words | 10 | Jargon and acronyms |
| Layout and mobile | 10 | Layout gate result at 375, 1024 and 1440, light and dark |
| Post to page match | 5 | The LinkedIn posts land on their payoff |

## Scores (simulated)

| Persona | Thesis | Visual | Interactive | Trust | Decision | Plain | Layout | Match | **Total** |
|---|---|---|---|---|---|---|---|---|---|
| Business buyer | 3.5 | 4.5 | 4 | 4 | 3.5 | 2.5 | 5 | 2.5 | **76.0** |
| Data builder | 4 | 4.5 | 4.5 | 4.5 | 4 | 3.5 | 5 | 3 | **84.5** |
| Strategy reader | 3.5 | 4.5 | 4 | 4.5 | 3.5 | 3.5 | 5 | 3 | **80.0** |
| First-time reader | 2.5 | 4 | 3.5 | 3.5 | 3 | 2 | 5 | 2.5 | **66.0** |
| Sceptic CFO | 3 | 4 | 3 | 3.5 | 3 | 3.5 | 5 | 2.5 | **69.0** |
| **Average** | | | | | | | | | **75.1** |

The layout gate was measured, not simulated: `layout-check.mjs` with buyer, builder and strategy, 18 runs, 0 faults and 0 warnings.

## What is wrong, ranked by impact

| # | Finding | Where on the page | Fix |
|---|---|---|---|
| 1 | The hook opens on poisoned texts, a security story, while the title and the posts are about routing | Screen 1, "Five planted texts can steer the answer" | Open on the routing question, for example the four-question sorter or "one question, wrong layer". Move the 5 planted texts to the replay. |
| 2 | The page contradicts itself. Screen 2 says "One question needs all three layers", but rule 1 says "A router picks one store per question type" | Screen 2 and screen 7 | Change rule 1 to "Route each part of a question to the store that owns it". This also answers the engineer's mixed-question objection. |
| 3 | The opener post W1 promises ownership, but the page never shows who owns a question | Sorter and chooser | Add an "Owner" line to each sorter answer, such as finance, the data team or legal. |
| 4 | A wrong route is never shown | Replay faults | Add a "Wrong route" fault, where a policy question is sent to the graph |
| 5 | The CFO has no people cost. "People time to curate is real but not shown" | Screen 5 | Add an illustrative row for owner hours each month, tagged Illustrative |
| 6 | Too much jargon for buyers and first-time readers: CDM, ARR, OKF pack, F1, GraphRAG local | Screens 2, 3 and 5 | Use plain labels and put the term in a tap drawer |
| 7 | There is no first-time reader seat. The page has 3 seats and the research plan has 4 | Screen 0 | Add the seat, or test whether the buyer seat covers that reader |

Strengths to keep: every number is tagged Verified or Illustrative, "Cited 0 of 3, Named, not proof" teaches the citation lesson, and the layout is clean at every width.

Nothing in the page code was changed.

## Update 2026-10-25: findings 1 and 2 fixed

- Finding 1: the hook now opens on routing. It shows four questions, each sent to its owning store, plus one wrong route in red. The planted texts stay in the replay.
- Finding 2: rule 1 is now "Route each part. Split a question by type. Send each part to the store that owns it." The summary and the story nav match.
- Layout gate: 0 faults across 18 runs. Build passes. No console errors.
