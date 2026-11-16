# V3 Table numbers check: design doc section 8.1 Comparison

Checked 2026-10-25 by a fresh fact checker. Scope is only the table under "### 8.1 Comparison" in `docs/AI_Web_Search_Failures_Technical_Design.md`. The source of truth is `P2_causes_fixes.md` (mainly section 11 and the section 13 source register). Ledgers searched: V1 and V2 (json and md). V2 has no row for any of these numbers.

"Opened by V3" means I opened the page myself in this check.

Count: verified 11, unverified 0, wrong 5.

| # | Number | Doc wording | Brief wording (section) | Status | Where checked | Fix for WRONG items (replacement doc wording) |
|---|---|---|---|---|---|---|
| 1 | 6% | "ChatGPT Search 6% ... on long live-web tasks (Mind2Web 2)" | "ChatGPT Search 6% and Perplexity Pro Search 8% on long live-web tasks" (s11, family A) | VERIFIED | P2 s11 and s3, tag P04. Ledger V32. Opened by V3 too, success rate 0.06. https://arxiv.org/html/2506.21506 | None |
| 2 | 8% | "Perplexity Pro Search 8% on long live-web tasks (Mind2Web 2)" | "Perplexity Pro Search 8% on long live-web tasks" (s11, family A) | VERIFIED | P2 s11, tag P04. V32 opened the page but its claim does not list Perplexity. Opened by V3, success rate 0.08. https://arxiv.org/html/2506.21506 | None |
| 3 | 34 points | "ReAct beat baselines by 34 points on ALFWorld ... [vendor]" | "ReAct beat imitation and RL baselines by 34 points on ALFWorld" (s11, family B) | WRONG | P2 s11, tag S51. No ledger row. Opened by V3: the abstract compares against "imitation and reinforcement learning methods". https://arxiv.org/abs/2210.03629 | "ReAct beat imitation and RL baselines by 34 points on ALFWorld and 10 on WebShop [vendor]." |
| 4 | 10 | "and 10 on WebShop [vendor]" | "34 points on ALFWorld and 10 on WebShop [VENDOR]" (s11, family B) | WRONG | Same as #3. Dropped qualifier "imitation and RL" makes the comparator read as any baseline. | Same fix as #3 |
| 5 | about 15 times | "About 15 times chat tokens [vendor]" | "About 15 times chat tokens" (s11, family C) | VERIFIED | P2 s11 and s3, tag S10. Ledger V99. https://www.anthropic.com/engineering/multi-agent-research-system | None |
| 6 | 28% | "Best measured: OpenAI Deep Research 28% ... (Mind2Web 2)" | "Best scores on Mind2Web 2 (OpenAI Deep Research 28%, human 54%)" (s11, family C) | VERIFIED | P2 s11, tag P04. Ledger V32. Opened by V3, success rate 0.28. | None |
| 7 | 54% | "against humans 54% (Mind2Web 2)" | "OpenAI Deep Research 28%, human 54%" (s11, family C) | VERIFIED | P2 s11, tag P04. Ledger V32. Opened by V3, 0.54. Note: the page says the human score is on a subset, not the full test set. Brief and doc both omit this. | None |
| 8 | 90.2% | "Anthropic reports 90.2% better than a single agent [vendor]" | "Anthropic reports 90.2% over single agent [VENDOR]" (s11, family C) | VERIFIED | P2 s11 and s3, tag S10. Ledger V99. Page says single-agent Claude Opus 4 on Anthropic's internal research eval. Optional tightening: add "on its internal eval". | None |
| 9 | 13.3% | "Gemini Deep Research invented 13.3% of URLs" | "More invented URLs (Gemini Deep Research 13.3%)" (s11, family C) | VERIFIED | P2 s11, tag P07. Ledger V04. Opened by V3: 13.3% is the hallucinated share of citation URLs for gemini-2.5-pro-deepresearch. https://arxiv.org/html/2604.03173 | None |
| 10 | 80 | "Synthesis hallucination in 80 traced tasks" | "One traced deep research agent showed synthesis hallucination in 80 traced tasks" (s11, family C) | WRONG | P2 s11, tag S48. V59 and V60 opened the same paper but checked other numbers. Opened by V3: Table 4 gives 80 for Step-DR only. https://arxiv.org/html/2610.29346v1 | "In one traced study, one deep research agent hallucinated during synthesis in 80 of 100 tasks and another drifted off goal in 51." |
| 11 | 51 | "goal drift in 51" | "another goal drift in 51" (s11, family C) | WRONG | Same source as #10. Opened by V3: 51 is Open-DR, a different agent from the 80. The doc joins two agents into one. | Same fix as #10 |
| 12 | 25% absolute | "STORM organisation up 25% absolute" | "Stanford STORM (organisation up 25% absolute, coverage up 10%)" (s11, family C) | VERIFIED | P2 s11, tag S42. No ledger row. Opened by V3: "a 25% absolute increase" against an outline-driven retrieval baseline. https://arxiv.org/abs/2402.14207 | None |
| 13 | 10% | "coverage up 10%" | "coverage up 10%" (s11, family C) | VERIFIED | P2 s11, tag S42. No ledger row. Opened by V3: broad in coverage "by 10%". | None |
| 14 | 70% | "about 70% of users preferred it to a search engine" | "about 70% of users preferred it to a search engine" (s11, family E) | VERIFIED | P2 s11, tag S43. No ledger row. Opened by V3: abstract says 70% of participants. https://arxiv.org/abs/2408.15232 | None |
| 15 | 78% | "and 78% to a RAG chatbot" | "and 78% to a RAG chatbot" (s11, family E) | VERIFIED | P2 s11, tag S43. No ledger row. Opened by V3: 78% favour it over a RAG chatbot. | None |
| 16 | 1% | "only 1% of users click a link inside an AI summary (Pew)" | "Pew: 1% click a link inside an AI summary, per Phase 1" (s11, family E) | WRONG | P2 s11, tag P34. Ledger V100. Opened by V3: the 1% is a share of visits to pages with an AI summary, not a share of users. https://www.pewresearch.org/short-reads/2025/07/22/google-users-are-less-likely-to-click-on-links-when-an-ai-summary-appears-in-the-results/ | "Yet Pew found a link inside an AI summary was clicked in only 1% of visits that showed one." |

Count: verified 11, unverified 0, wrong 5.
