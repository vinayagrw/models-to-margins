# V4 Gap audit: design doc against the user's asks

Audited 2026-10-25 by a fresh reviewer. Target: `docs/AI_Web_Search_Failures_Technical_Design.md` (698 lines). Read against the user research doc, U1, U2, U3, P2 causes and fixes, P2 D scorecard, P2 E1, P2 E2, V1, V2 and V3. The design doc was not edited.

V3 check: the 8.1 table carries all five V3 fixes (ReAct "imitation and RL baselines", the 80 and 51 split across two agents, the Pew 1% "of visits", plus the optional "on its internal eval" and "on a subset" tightenings). No action needed on ask 7.

## Gaps, most serious first

### 1. The scorecard ignores the 2026 per-model numbers the last-30-days sweep collected for it
- Severity: high
- Evidence: Section 5 says "34 of 53 evidence lines were collected before 2026" and "Copilot and Grok are almost absent from 2026 studies". Section 3.6 says "No independent study gives a per-product stale-fact rate". But P2_E2 section 3 is titled "New per-model numbers (for the scorecard)" and none of it reached the grid. TREK-Wild (arXiv 2610.25323, 2026-10-18, verified in V68) gives accuracy on fast-changing facts with web search on: GPT-5.4 70.1%, Gemini 3.1 Pro 64.6%, Claude Sonnet 4.6 51.4%, Claude Opus 4.6 49.3%. That is a row 5 comparison across three products, yet row 5 is all N. The made-up concept study (arXiv 2610.11932, V61 confirms Grok 93.7%) puts Grok 93.7%, Google AI 45.5%, Perplexity 37.1% and ChatGPT 35.0% on one metric, yet Grok row 4 is "N*". Data-Void Exploits gives warning rates by product (ChatGPT 21.4%, Sonar Pro 22.2%, Gemini 5.6%) for row 2. OpenDS-World gives row 3 numbers for GPT-6 Astra 39.0%, Claude Opus 5.5 38.0% and Gemini 3.8 Flash 36.5%.
- Fix: add E33 to E36 rows to P2_D for TREK-Wild, 2610.11932, Data-Void and OpenDS-World, regrade rows 2 to 5 under the doc's own rule (one study, product plus at least two peers, same metric), recount the totals line and the "34 of 53" figure, and delete or soften the 3.6 sentence to "TREK-Wild gives per-model accuracy on fast-changing facts, but no study gives a per-product stale-fact rate in a consumer app". Add ledger rows for each new number.

### 2. "Any other frontier model" is not covered and the exclusion is silent
- Severity: high
- Evidence: Line 5 scopes the doc to Claude, Claude Code, ChatGPT, Gemini, AI Overviews and AI Mode, Perplexity, Grok and Copilot. A search of the doc finds no mention of DeepSeek, Meta AI, Qwen, Kimi or Mistral. The research holds evidence for several: Full Fact named DeepSeek still calling Starmer prime minister on 2026-09-15 (V43). OpenDS-World scores DeepSeek-V4.1-Flash 20.5%, Kimi K3 17.5% and Qwen3.8-Max 25.5% (P2_E2 section 3). In 2610.11932 Qwen and DeepSeek did not cite the made-up concept within 7 days. Gurov's election-day audit has Meta AI citing RT-linked sites in 2 of 20 answers (P2_E1, rung 3). Which? scored Meta AI 55 (V41).
- Fix: add a short "Other models" table after Section 5 with these points, each with its rung, and add "DeepSeek, Meta AI, Qwen, Kimi" to the scope line. State plainly that Mistral and others have no evidence in the research ("name as open").

### 3. The recommendation, the decision tree and the red team disagree on whether the checker always runs
- Severity: high
- Evidence: 8.3 says "D always checks" and H2 says domain lists "join the always-on stage (8.3)". The 8.2 diagram sends single-fact questions to "A plus failure ledger" with no D, and sends B and C answers to "Deliver" without D unless they will be "forwarded or acted on". C2 says "Quick mode keeps pattern A ... Checking is sold as a mode, not hidden". 8.3 also never mentions pattern A, while 8.2 and C2 keep it for quick questions.
- Fix: pick one rule. If D is always on, redraw 8.2 so every path passes "D checker", and rewrite C2 to "Quick mode keeps pattern A with the failure ledger, zero-source rule and D". If D is conditional, change 8.3 to "D checks anything forwarded or acted on" and drop "always-on" from H2. Add one line to 8.3 saying where A fits.

### 4. "User research first" was desk research only, and the doc does not say so
- Severity: high
- Evidence: Section 2 is headed "What users told us". Section 1 lists "User research: Three parallel strands: user complaints, independent studies, builder mechanisms". No interviews or surveys were run. The user research doc section 7 offers an "Optional interview guide", unused. The four personas in Section 2 are inferred from public posts, and U1 notes the sample leans to developers because Reddit and X were unreachable.
- Fix: rename Section 2 to "What users say in public forums and studies". Add one line to Section 1: "No interviews or surveys were run. Findings come from 91 public complaints, 33 studies and 18 builder mechanisms. The interview guide in the user research file is ready but unused. Personas are inferred, not interviewed." Add "primary interviews" to Section 10 as an open gap.

### 5. A closed-book result is used as web-search evidence for #1, against the doc's own scope
- Severity: medium
- Evidence: 3.2 says "models cited PubMed IDs that exist 327 of 335 times, but only 3 of those were relevant". P2_E2 shows those were closed-book models with no search. Section 1 puts "offline model knowledge with search switched off" out of scope. The same paper found search-agent citations relevant 67% of the time, which the doc leaves out.
- Fix: replace with "With live search, only 67% of a search agent's citations were relevant to the claim (Real PMIDs, Wrong Papers, 2026-10-21)", or add "with search switched off" to the 327 of 335 line. Better in-window items for #1 already verified: Retrieved but Not Read, 81.8% of citations unfaithful when the answer is stale (V17), and Search-R1 evidence-backed correct answers falling from 84.0% to 42.9% (V67). Update ledger row 6 to match.

### 6. The WashU audit is presented as new in-window evidence, and the ledger note on its date is wrong
- Severity: medium
- Evidence: 3.0 row 1 headlines "WashU, 2026-09-29". 3.2 and ledger row 3 say "findings first reported in August". V1 row V21 shows the same 11.03% and 41.9% figures in arXiv 2605.14021, dated 2026-05-13. V2 VT1 adds that NPR cited it on 2026-08-30. Only the press release falls in the window.
- Fix: change to "paper first posted 2026-05-13, university release 2026-09-29", cite arXiv 2605.14021 in ledger row 3, and lead the #1 status with a truly in-window item (see gap 5).

### 7. Two runner-up fixes are not carried through to the sections they affect
- Severity: medium
- Evidence: 10.0b says evals now run "on every model or version change and on a small weekly canary set, not only monthly". Section 12 still says "Ongoing evals. Monthly reruns as models and crawler rules change". 10.0b also says "Model versions are pinned where the API allows. High-stakes answers store the pages and quotes used". Neither appears in the Section 7 components, the 7.3 evals or the Section 11 gates. Only C8 repeats it, and C8 points back to 10.0b.
- Fix: change Section 12 to "Evals on every model change, a weekly canary set and a quarterly build-or-buy review". Add an "Evidence store" row to 7.1 (pages and quotes kept for high-stakes answers) and add "model version pinned" to the gate 2 "What ships" cell.

### 8. Section 6 sets speed targets that no source backs and that clash with the buyer-agreed ceiling
- Severity: medium
- Evidence: Section 6 says "answer within 30 seconds for quick mode and 15 minutes for deep mode". No research file gives these numbers, and they are not marked as proposals. 7.3 and gate 0 say the cost and time ceiling is "agreed with the buyer before release", and H3 made that the fix.
- Fix: replace with "Time and cost per run measured in quick and deep mode, with a ceiling agreed at gate 0 (7.3)", or keep the numbers and label them "proposed, not sourced".

### 9. How each product searches, including Claude Code, is never shown in one place
- Severity: medium
- Evidence: The user named "claude (and code), chatgpt, gemini". The doc mentions Claude Code mechanics only in scattered lines (3.7 "lossy by design", 3.3 hidden cap, 3.11 CVE). U3 M6 and M7 hold the per-product mechanics the "why" depends on: Claude web search reported to use Brave (rung 5) with a backend that is "not configurable" (rung 2), ChatGPT sends rewritten queries to third-party providers (rung 7), Gemini grounds on Google Search and bills per query, Perplexity runs its own index of over 200 billion URLs (rung 6), Copilot grounds on Bing after the Bing API retirement, Grok's index is undocumented. Claude Code specifics in U3: WebFetch summarised by a smaller model, 100,000 characters per call, 15-minute cache, 125-character quote cap for non-preapproved domains (rung 5), WebSearch cap of 200 then 100 per hour. Section 5 also folds Claude Code into the Claude column.
- Fix: add a compact "How each product searches" table after 3.1 with one row per product (index, who reads the page, known caps), each cell tagged with its U3 rung. Grok's index row says "not documented (open)".

### 10. Evidence rungs in the doc are higher than the verifiers and briefs gave
- Severity: medium
- Evidence: Ledger rows 1 (Tow), 2 (EBU) and 19 (NewsGuard) say rung 1. V1 rows V10, V12 and V24 and P2_D rows E5, E6 and E10 all say rung 2. Ledger row 20 and 3.6 give Full Fact rung 2, while V2 VT2 says "rung 3 fits better". 3.4 gives Ahrefs rung 5 while ledger row 15 and V2 VT3 say rung 4. 3.5 gives the trellner audit rung 6 while ledger row 18 says 5.
- Fix: align each rung to the verifier value, or add one line under the evidence ladder explaining why the doc rates journalism audits as rung 1.

### 11. Several numbers in the body have no Appendix A row
- Severity: medium
- Evidence and rows to add (all from files already in the research folder):
  - 3.9 "accuracy fell from 88% to 96%": from P2 causes P03, not in ledger row 11 and not checked by V1. V40 shows multiple-choice scores of 90.4% to 95.6%, so the 88% end is unverified. Add a row or say "about 90% to 96%".
  - 3.12 "Hindi accuracy 79% against 89% to 91%": V40 confirms 79.3% only. Add a row and mark the 89% to 91% as from U2.
  - 3.12 "Citation overlap below 0.02 across 10 runs": arXiv 2610.26421 (P2_E2). V67 checked only the 0.12 entity figure.
  - 3.12 "Claude Code returning Munich shops for Aargau queries": issue 104830 (V74).
  - 3.8 SearchViu "only Gemini read a JavaScript-inserted price" (V45). 3.8 "blocked by default since 2025-07-01" (P2 P11).
  - 3.9 Which? ISA test (V41). 3.10 "5.8% to 9.7%" (V38).
  - 3.6 Full Fact "7,625 answers", "five chatbots", "70 days" (V42 and Resultsense in P2_E1).
  - 3.7 "100,000 characters per call" and "lossy by design" (V92).
  - Section 2 "28 of 91" and Section 1 "about 110 new sources" (no file gives 110. P2_E1 opened about 55 pages and P2_E2 about 45). Replace 110 with a traceable count or drop it.
  - 10.0b and C6 "CaMeL completed 77% of tasks against 84%" drives the isolation rule but ledger row 42 says it was not re-checked. Flag it as unverified next to the rule.
  - C9 "100,000 of 1.1 million characters": U3 line 21 says about 1,105,050. Add a row.

### 12. The #8 in-window evidence measures a different failure
- Severity: low
- Evidence: 3.0 row 8 uses Authority Bias (2026-09-29) as the dated item. P2_E2 says that paper shows source deference "is a separate mechanism from user sycophancy". P2_E1 marks #8 "NOT RE-CONFIRMED IN LAST 30 DAYS". 3.9 says "Not re-confirmed in news coverage", which is softer than E1.
- Fix: in 3.9 status write "The user-premise form was not re-confirmed in the window. The nearest in-window studies measure deference to a source label (Authority Bias) and false context (MisleadQA, 75.4%, V68)."

### 13. Section 9 is titled "Last 30 days" but four rows fall before the window, and one date is off
- Severity: low
- Evidence: Rows dated 2026-08-31, 2026-09-02, 2026-09-03 and 2026-09-15 are before 2026-09-25, with no label. P2_E1 used a 60-day launch window, which the doc does not explain. The row "2026-10-19 to 10-21 ... robots.txt refusals and 4xx errors" should be 2026-10-21, because V91 found both changes in 2.1.307 and says 2.1.304 and 2.1.305 only fix approval waits. Ledger row 22 repeats "2.1.304 to 2.1.307".
- Fix: add "(pre-window, launches tracked from 25 Aug)" to the four rows or a note under the table. Change the Claude Code row and ledger row 22 to 2.1.307, 2026-10-21.

### 14. The persona panel and hostile reviewers read as real people
- Severity: low
- Evidence: Section 0 names Priya, Marcus, Lena, Omar, Grace and Tom and 7.1 quotes them. 10.0 says "A sceptical client, a principal engineer and a CFO argued against the recommendation". These are role-played lenses. The house rule bars an invented named reviewer.
- Fix: add to Section 0 "These are fictional lenses used to argue the design, not real reviewers", and in 10.0 write "argued, in simulation, against the recommendation".

### 15. Hostile review H1 claims dated checkpoints that Section 11 does not give
- Severity: low
- Evidence: H1 says "Dated checkpoints replace '8 to 12 weeks'". Section 11 dates only gates 0 and 1. Gate 2 is "Next checkpoint" and gate 3 is "Later", and line 614 says those dates are set after gate 0.
- Fix: change H1 to "Gates 0 and 1 are dated. Dates for gates 2 and 3 are set from gate 0 measurements."

### 16. Small claims that overreach the evidence
- Severity: low
- Evidence: 8.1 option E speed says "Hours", but the brief says only "Slow and costly". Section 12 says licensed routing makes "blocked pages stop being a blind spot", while Section 11 says the design "does not solve #7". The 7.2 diagram labels the reader "isolated" for all runs, while 7.1 limits isolation to agents that can act.
- Fix: change "Hours" to "Slowest. Not measured". Change Section 12 to "so licensed sources fill some of the gaps left by blocked pages". Relabel the diagram node "Reader, isolated if the agent can act".

### 17. The doc does not link the artifact page the user asked for
- Severity: low
- Evidence: Ask 2 was "Design doc + artifact page". The doc links the user research file and the research folder but not the published page.
- Fix: add the artifact link under the status line.

## Ledger spot checks

Rows checked against V1, V2, V3 and the briefs: 1, 2, 3, 6, 7, 9, 11, 12, 13, 14, 15, 16, 19, 20, 21, 22, 27, 28, 30, 31, 33, 34, 35, 38, 40, 41.

| Row | Result |
|---|---|
| 1 Tow | Numbers match V10 and V11. Rung 1 differs from V10 rung 2 (gap 10) |
| 2 EBU | Numbers match V12 to V14. Rung 1 differs from V12 rung 2 (gap 10) |
| 3 WashU | Numbers match VT1 and V21. "First reported in August" is wrong, the arXiv paper is dated 2026-05-13 (gap 6) |
| 6 Real PMIDs | Numbers match V55. The doc drops "closed-book" (gap 5) |
| 7 Data-Void | Matches V56 (26.8% warned, so 73.2% did not) |
| 9 Issue 95815 | Matches V79, opened 2026-09-21 |
| 11 Suzgun | 71.5%, 36%, 64%, 78%, 80%, 21.2% match V37 to V39. The 88% to 96% baseline used in 3.9 is not in the row or in V1 (gap 11) |
| 12 Mind2Web 2 | Matches V32. Perplexity 8% confirmed by V3, not V32 |
| 13 OpenDS-World | Matches V57 |
| 14 Yu et al. | Matches V59 and V60, with the "partly" wording fixed |
| 15 Ahrefs | Matches VT3. Body text rung differs (gap 10) |
| 16 Made-up concept | Matches V61 |
| 19 NewsGuard | Matches V24. Rung 1 differs from V24 rung 2 (gap 10) |
| 20 Full Fact | Matches V42 to V44 and VT2, VT5, VT9a. V2 prefers rung 3 (gap 10) |
| 21 Retrieved but Not Read | Matches V15 to V18 |
| 22 Claude Code changelog | Matches V89 to V91, but V91 places the robots.txt change in 2.1.307 on 2026-10-21 only (gap 13) |
| 27 Authority Bias | Matches V62 |
| 28 Stale-Document Poisoning | Matches V64 |
| 30 Intact | Matches V65 |
| 31 Signals Corps | Matches V66 and VT10 |
| 33 CVE-2026-54316 | Matches V54 |
| 34 Pew | Matches V100 and the V3 fix |
| 35 Gemini 3.8 Flash | Matches T3 with the date corrected to 2026-09-02 |
| 38 GPT-6 Astra | Matches T2. The C2.4 "maximum effort" caveat is in the row |
| 40 Aachen | Matches C1.5 and C1.5b |
| 41 Dow Jones | Matches T21 |

## Asks checked and found met

- Each of the ten has a "Why it happens" paragraph.
- Fixes (Section 4) and architecture (Sections 6 to 8) are present.
- Every one of the ten has at least one dated item in 2026-09-25 to 2026-10-25, subject to gaps 5, 6 and 12 on quality.
- The 8.1 table has the five options and the four asked columns, with every number from P2 causes section 11.
- The hostile review gives three objections from the three asked voices with a change for each and no praise.
- Runner-ups "answer less", "rubber-stamp", "vendors are fixing it", "isolation contradicts itself", "licence and people costs" and "scorecard too old" are reflected where they point, apart from gap 7.
- Scorecard totals (8 B, 11 M, 8 W, 24 N, 19 dash) recount correctly from the grid and match P2_D.
- No em-dashes, semicolons or listed filler words were found in the prose sections read.
