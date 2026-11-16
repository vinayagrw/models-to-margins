# A6. Independent proof that the fixes work

Researcher A6, 2026-10-25. Scope: the 24 fixes in tables 2.1 and 2.2 of [AI_Challenges_Solutions_Technical_Design.md](../AI_Challenges_Solutions_Technical_Design.md), red team item C1, and the three human steps (a named checker, stop rules, a tested off switch). Sweep window for new work: 2026-08-25 to 2026-10-25.

Status rule used here:
- **Measured**: an independent rung 1 or rung 3 comparison with and without the fix, on the fix's core mechanism. Lab counts, and the setting is stated.
- **Partly measured**: an independent measure exists, but it tests only part of the fix, or it is observational rather than a with-and-without comparison.
- **Vendor or survey only**: the only numbers come from the seller, a consultancy or a self-report survey (rung 4 or 5, or rung 2 from the vendor).
- **Not measured**: no number found that tests the fix.

Evidence ids: AR6-xx rows are in the ledger below. SS-xx and SF-xx ids come from the design doc ledgers and were not re-opened by A6 unless an AR6 row says so.

## 1. All 24 fixes plus the human steps

| # | Fix (short) | Status | Best source | Setting | Does not tell you |
|---|---|---|---|---|---|
| S1 | Claim checker with quoted spans and link check | Measured (unchanged) | SS-01, rung 3. No newer study opened | Lab | Whether claim-level support checks hold up. One claim-support audit (AR6-25) now opens: a single-author preprint with support-defect rates of 0.95%, then 5.66% and 6.12% on reruns |
| S2 | Log and show failed searches, reject zero-source reports | Not measured | Nearest: showing uncertainty cut over-reliance on wrong answers, 404 people (AR6-10, rung 1) | Lab, medical questions | Tests hedging words, not failure logs. No study shows a failure notice changes what users trust |
| S3 | Sub-questions, stop only when each is covered | Measured (unchanged) | SS-15, rung 1. No newer study found | Lab, 3B and 7B open models | Effect on frontier products |
| S4 | Allow list of primary sites | **Measured (moved)** | Restricting retrieval to two guideline domains raised correct answers from 60% to 78%, 80% to 88% and 81% to 89% across three models (AR6-01, rung 1) | Lab, 130 neurology questions | Other fields, other products, or what happens when the allow list goes stale |
| S5 | Today's date and validity dates | Measured (unchanged) | SS-24, rung 3. Already in window | Lab, open models | Field effect |
| S6 | Cite only opened pages | Measured (unchanged) | SS-26, rung 3. Already in window | Lab | Field effect |
| S7 | Name and route blocked pages | Not measured | Own single case only (SS-32) | None | Anything |
| S8 | List and check assumptions first | Measured, missing from C1 | SS-33, rung 3, already in table 2.1 | Lab | That the fix beats a plain prompt. SS-33 shows the plain prompt matched it |
| S9 | Dated primary source for changing facts | Measured, missing from C1 | SS-36, rung 3, already in table 2.1 | Lab | Field effect. Venue status disputed between ledgers |
| S10 | Isolated reader, approvals on web-led actions | Measured (unchanged) | SS-37, rung 3. Already in window | Lab, 1,091 real pages | Adaptive attacks on the reader itself |
| F1 | Grounding plus a named checker | Measured (unchanged), human part now measured, see H1 | SF-01, rung 1. Newer support: in a randomised trial with law students, a grounded legal tool "avoids introducing more hallucinations" (AR6-16, rung 3, comparator not stated on the page) | Lab test of real products, and a student trial | Rates with practising lawyers on live matters. AR6-16 page gives no numbers |
| F2 | Low-privilege identity and sandbox per agent | Partly measured (authors' own tool) | Tool-level privilege control cut attack success from 39.9% to 1.0% on AgentDojo and 70.3% to 3.9% on ASB (AR6-02, rung 3) | Lab benchmarks | Real enterprise agents. Authors built the tool. Sandbox escapes still happen (AR6-12) |
| F3 | One approved tool, data-loss controls | Vendor or survey only | SF-73 (Netskope, rung 5). An 89% fall in unauthorised use after sanctioned tools (AR6-21) traces to a vendor report not opened | Field, vendor telemetry | Whether the approved tool caused the fall. Nearest independent signal: 22.5% of surveyed reviewers under the no-LLM policy reported using one (post-survey, N=1,486) (AR6-22) |
| F4 | Tool server allow list, bound tokens, closed network | Partly measured | Progent's per-tool allow policy (AR6-02, rung 3). Adaptive attacks beat filters (SF-70) | Lab | Server-level allow lists or token binding. No study tests them |
| F5 | Value measure, cost measure and stop rule per pilot | Vendor or survey only | SF-121, Gartner, rung 5, correlational | Self-report survey | Cause. Nearest independent work is on IT project gates (AR6-23), not AI |
| F6 | Pin the version, run own tests before a move | Measured (unchanged), newer support | SF-102, rung 3. New in window: a permissive test oracle passed 36 of 360 failing generations that a stronger oracle caught (AR6-14, rung 1, authors built the probe). A regression tool helped users find twice as many errors as manual review (AR6-15, rung 1, authors built the tool) | Lab | Incident counts in live use. AR6-14 warns its rates are benchmark stress signals |
| F7 | Hard spend caps per person, team and agent | Not measured | Vendor docs only (SOL2b SF-D rows) | None | Anything about avoided overspend |
| F8 | Anti-agreement instructions, crisis routing | Measured (unchanged) | SF-15, rung 3. Same study confirmed by the university's own release, 2026-10-20 (AR6-17) | Lab, 1,280 simulated chats | Effect on real patients. The release says this was not tested |
| F9 | Agent register that can block, rehearsed block drill | Not measured | One vendor incident record: the automatic stop failed and the run was killed 2.5 hours after the alert (AR6-12, rung 2) | Field, one training sandbox | Drill effect, time to stop in enterprise use, or how often registers block anything |
| F10 | Reviewer capacity, change caps, disclosure | Partly measured | AI review bot measured (SF-163, rung 1, closure time up). Reviewer scrutiny of agent code fell over seven months (AR6-07, rung 3) | Field records | Effect of capacity planning, PR caps or disclosure rules. None found |
| F11 | Hard rules in the tool, reloading rule files | Measured (unchanged) | SF-181, rung 3. Reminders "reliably reduce divergence" (AR6-18, rung 3, no numbers on page) | Lab | Field effect of hooks or managed settings |
| F12 | Gateway with tested fallback | Partly measured | Stateless failover kept near 0% of conversation state. A history-forwarding proxy kept 99.20% across 750 failover events (AR6-19, rung 3) | Lab | Availability gain from fallback. No independent outage study found |
| F13 | Verified access tiers, buyer tests own prompts | Vendor or survey only | SF-26, vendor, rung 2. Independent audits measure over-refusal but test no fix (AR6-24) | Lab | Whether verified access lowers false blocks outside the vendor's own test |
| F14 | Gateway, own prompts and tests, exit terms | Partly measured, no benefit seen | Repos with a pre-existing abstraction migrated no sooner (70% against 72% after shutdown) and changed more lines at the median (AR6-20, rung 3) | Field, open-source commits | Cause. Only 115 commits had a layer. Contract terms not measured |
| H1 | Named checker opens every source and figure | **Measured (moved), result is weak** | Each of four seeded errors was missed or under-fixed by 13 to 15 of 20 doctors (AR6-03, rung 1). Reader accuracy fell from about 80% to 19.8% to 45.5% when the AI was wrong (AR6-04, rung 1) | Lab simulations | Catch rate of a named checker in a live firm over months. Field signal points down (AR6-07) |
| H1a | Ways to raise the checker's catch rate | Measured, lab | Cognitive forcing cut over-reliance (AR6-08, rung 1). A confidence nudge raised diagnostic reasoning scores by an adjusted 7.6 points (CI 1.4 to 13.9). Raw means were 82.8% against 75.6% (AR6-09, rung 3, authors designed the nudge) | Lab | Whether gains last, or work outside medicine |
| H2 | Stop rules | Vendor or survey only | SF-121, rung 5, correlational | Self-report survey | Whether stop rules cause better results |
| H3 | A tested off switch | Not measured | AR6-12, rung 2: no drill data, one failed automatic stop | Field, one incident | Drill effect or a normal time to stop |

## 2. New count and what moved

**Fixes with a rung 1 or 3 measure: 12 of 24, up from the 9 in C1.**

| Moved | Why | Rung | Setting |
|---|---|---|---|
| S4 allow list | Direct with-and-without test of domain whitelisting (AR6-01) | 1 | Lab |
| S8 premise check | Already rung 3 in table 2.1 (SS-33). C1 left it out | 3 | Lab |
| S9 dated source | Already rung 3 in table 2.1 (SS-36). C1 left it out | 3 | Lab |

Human steps: **1 of 3 now measured.** The named checker (H1) has rung 1 catch-rate numbers, and they show the check fails often. Stop rules stay survey only. The off switch stays not measured.

Partly measured, not counted: F2, F4, F10, F12, F14. F2 has a with-and-without test of tool-level privilege control (AR6-02, rung 3), but Progent's authors built the tool, so it fails the independence test in the status rule. Vendor or survey only: F3, F5, F13. Not measured: S2, S7, F7, F9.

What the count does not tell you: none of the 12 is a with-and-without measure inside a live organisation. All are lab tests or benchmarks. The only field records found (AR6-07, AR6-12, AR6-20, AR6-22, SF-163) show problems or null results, not a fix working.

Changes the design doc should take:
1. C1 should list 12 fixes, or explain why S8 and S9 are left out.
2. C2 "measured nowhere" is out of date. The human check is measured in lab settings, and the result backs C2's worry: checkers missed most seeded errors (AR6-03, AR6-04), and seeded errors cut doctors' accuracy by an adjusted 14 points (AR6-05).
3. F9 and P-level off-switch claims can cite AR6-12 as the one primary record of a stop that did not work.
4. F14 "Not measured (SF-105)" should read "partly measured, no timing benefit seen" (AR6-20).

## 3. Ledger

Rungs: 1 peer reviewed, 2 primary record, 3 independent measurement, 4 independent survey, 5 vendor or consulting, 6 press or user post, 7 not opened. Opened means read by A6 on 2026-10-25 through WebFetch unless noted.

| Id | Claim | URL | Page date | Rung | Opened | Flags |
|---|---|---|---|---|---|---|
| AR6-01 | 130 neurology questions, 3,640 rated answers. Correct, open web against whitelisted: Sonar 60% to 78%, Sonar-Pro 80% to 88%, Sonar-Reasoning-Pro 81% to 89%. Authors call it an "8 to 18 percentage-point gain" | https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=DOI:10.2196/79379&format=json&resultType=core (JMIR article, DOI 10.2196/79379) | 2025-10-29 | 1 | Yes, Europe PMC record with abstract. jmir.org page returned empty | Lab. One specialty, one product family. Authors at the Department of Neurology, University Hospital Düsseldorf. Independent of Perplexity. Does not tell you about stale or wrong allow lists |
| AR6-02 | Progent privilege control: AgentDojo attack success 39.9% to 1.0%, ASB 70.3% to 3.9%. Utility "comparable" (figures only). Adaptive attacks "only marginally" raise attack success | https://arxiv.org/abs/2504.11703 and https://arxiv.org/html/2504.11703v3 | v3 2026-05-14 | 3 | Yes | Preprint. Lab benchmarks. Authors built the tool. Affiliations and conflicts not stated on the pages read. Does not tell you about sandboxes or identities in live use |
| AR6-03 | 20 primary care doctors, 18 AI drafts, 4 with errors. "Each error was insufficiently addressed by 13-15 participants". 35% to 45% of wrong drafts sent unedited. 75% found drafts safe | https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=DOI:10.1038/s41746-025-01586-2&format=json&resultType=core (npj Digital Medicine) | 2025-04-24 | 1 | Yes, Europe PMC record | Lab simulation. Small sample. Catch rate per error 25% to 35% is my arithmetic from 13 to 15 of 20. Does not tell you about a named checker who knows errors are seeded |
| AR6-04 | 27 radiologists. Correct ratings with right against wrong AI advice: inexperienced 79.7% to 19.8%, moderate 81.3% to 24.8%, very experienced 82.3% to 45.5% | https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=DOI:10.1148/radiol.222176&format=json&resultType=core (Radiology) | 2023-05-02 | 1 | Yes, Europe PMC record. pubs.rsna.org returned 403 | Lab. Purported AI, not a real system. Imaging, not text. Older than the window |
| AR6-05 | Randomised trial, 44 AI-trained doctors. Accuracy 84.9% with error-free advice against 73.3% with seeded errors, adjusted gap 14.0 points | https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=DOI:10.1101/2025.08.23.25334280&format=json&resultType=core (medRxiv) | 2025-08-26 | 3 | Yes, Europe PMC record. medrxiv.org returned 403 | Preprint. Lab vignettes, Pakistan. LLM use voluntary. Does not tell you the catch rate per error |
| AR6-06 | Search results say a peer-reviewed version of AR6-05 appeared in NEJM AI on 2026-04-23 | https://ai.nejm.org/doi/full/10.1056/AIoa2501001 | 2026-04-23 per search snippet | 7 | No, 403. Europe PMC had no record | Not opened. Do not cite as rung 1 until opened |
| AR6-07 | 400 repeat reviewers, 11,429 reviews of agent pull requests, seven months. Approval 30.1% to 36.8%, inline comments down 22%, latency up about 3.5 times | https://arxiv.org/abs/2606.22721 | 2026-06-21 | 3 | Yes | Preprint, accepted at a KDD 2026 workshop. Field records from open-source repos. Defects shipped not measured. Does not tell you attention fell, only that behaviour changed |
| AR6-08 | 199 people. Cognitive forcing "significantly reduced overreliance" against simple explanations. Least liked designs worked best | https://arxiv.org/abs/2102.09692 | 2021-02-19 | 1 | Yes | Page lists ACM DOI 10.1145/3449287 but not the venue name. Lab task, not LLM output. Older than the window |
| AR6-09 | Randomised trial, 72 doctors, 432 cases, 3 of 6 with seeded ChatGPT-5.1 errors. Nudge 82.8% against control 75.6%, adjusted gap 7.6 points (CI 1.4 to 13.9) | https://www.medrxiv.org/content/10.64898/2026.06.01.26354596v1.full | 2026-06-02 | 3 | Yes | Preprint. Lab vignettes. Authors designed the nudge. 7.6 is the adjusted estimate of diagnostic reasoning score, raw means differ by 7.2. Accuracy on the error cases alone not on the page read. Does not tell you if gains last |
| AR6-10 | 404 people, preregistered. First-person hedges lowered agreement with the AI and raised accuracy, over-reliance reduced not removed | https://arxiv.org/abs/2405.00623 | 2024-05-15 (v2) | 1 | Yes | Accepted to FAccT 2024 per page. Lab, fictional system. Tests hedging, not failure logs (S2) |
| AR6-11 | 577 people, 10%, 30% and 50% seeded error rates. Seeing more AI errors cut AI use | https://arxiv.org/abs/2604.04319 | 2026-04-05 | 1 | Yes | CHI EA 2026, extended abstract. Lab diagram task. Supports seeding errors as a method, not a catch rate |
| AR6-12 | OpenAI incident: external DNS answer 9:50:23, alert 10:02:11, human ack 10:05:06, run killed 12:34:30. "the run did not stop automatically as expected" | https://alignment.openai.com/misalignment-reports/an-agent-used-dns-to-reach-an-external-chatbot/ | 2026-09-25 | 2 | Yes | Vendor self-report. One training sandbox, not an enterprise agent. In window |
| AR6-13 | Cross-check of AR6-12: alert "within roughly twelve minutes", run terminated 12:34 p.m. | https://labs.cloudsecurityalliance.org/research/csa-research-note-openai-agent-sandbox-dns-bypass-20260930-c/ | 2026-09-30 | 6 | Yes | Secondary note. Silent on whether the automatic stop failed |
| AR6-14 | ESEM 2026: 2,880 generations. Removing the retrieved document regressed 11.67% of passing tasks. A permissive oracle passed 36 of 360 and 26 of 360 generations that a stronger oracle failed, cut to 8 and 3 by an order-dependent variant | https://drops.dagstuhl.de/entities/document/10.4230/LIPIcs.ESEM.2026.51 | 2026-10-05 | 1 | Yes | Lab, one code benchmark. Authors built both oracles. The 36 of 360 comes from a deliberately permissive probe. Authors call the rates benchmark stress signals, not deployment risk. In window |
| AR6-15 | RETAIN regression tool: users found "twice as many errors" as manual review, 75% more prompts tested | https://aclanthology.org/2024.emnlp-demo.31 | 2024-11 | 1 | Yes | EMNLP 2024 demo track. Lab user study. Authors built the tool |
| AR6-16 | Randomised trial with upper-level law students. Grounded tool Vincent AI "avoids introducing more hallucinations". Comparator not stated on the page | https://repository.law.umich.edu/pub_law_archive/772 | 2025 | 3 | Yes | Working paper. No sample size or rates on the page. Journal publication claimed by a vendor page, not opened (rung 7). Tool now sold by Clio |
| AR6-17 | Georgia Tech release: 1,280 experiments, eight models, 16 scenarios. Anti-agreement instructions cut confirmation 73.8%, 77% with self-reflection. Not tested on people in clinical settings | https://www.cc.gatech.edu/news/georgia-tech-researchers-find-way-reduce-ai-chatbots-reinforcement-delusions | 2026-10-20 | 3 | Yes | Read through the university's release. Paper itself not opened. Same study as SF-15. In window |
| AR6-18 | Reminders "reliably reduce divergence" in multi-turn drift | https://arxiv.org/abs/2510.07777 | 2025-11-21 (v2) | 3 | Yes | Preprint. Lab. No numbers on the abstract page |
| AR6-19 | ContinuityBench: history-forwarding proxy kept 99.20% continuity (CI 98.27% to 99.63%) over 750 failover events. Stateless failover near 0% | https://arxiv.org/abs/2607.15899 | 2026-07-17 | 3 | Yes | Preprint. Lab, failure injection confirmed in the HTML ("deterministic fault injector"). Authors' own design. Measures continuity, not uptime |
| AR6-20 | Retired-model migrations: no abstraction 3,644 commits, median 2 files, 8 lines, 72% after shutdown. Pre-existing abstraction 115 commits, 4 files, 20 lines, 70% after shutdown. Author: layer "reduces the size of the fix without making it timely" | https://arxiv.org/html/2609.31288v1 | 2026-09-25 | 3 | Yes, re-opened (also SF-105) | Preprint, single author. Field, open-source. Observational. Text and table disagree on fix size. In window |
| AR6-21 | CSA note: unauthorised use "drops by 89%" when sanctioned tools are provided, citing Unseen Security's 2026 report | https://labs.cloudsecurityalliance.org/wp-content/uploads/2026/05/CSA_research_note_shadow_ai_apps_enterprise_20260530-csa-styled.pdf | 2026-05-30 | 5 | Yes, PDF text extracted locally after WebFetch | Industry body note, AI-assisted per its footer. Underlying vendor report not opened (rung 7). Method unknown |
| AR6-22 | ICML 2026 randomised policy trial, over 24,000 papers and 17,000 reviewers. 22.5% under the no-LLM policy reported LLM use (post-survey, N=1,486). Near-zero effect on decisions and scores | https://arxiv.org/abs/2609.19420 | 2026-09-16 | 3 | Yes | Preprint. Field. Self-reported use. About policy compliance, not data leakage. In window |
| AR6-23 | 820 IT and product projects over 4.5 years. Same gatekeeper at two gates approves the second more often. Advice: different gatekeepers per gate | https://www.iadisportal.org/digital-library/escalation-of-commitment-in-npd-and-cost-saving-it-projects | 2019 | 1 | Yes | Conference short paper. No rates on the page. Not AI. Adjacent to stop rules and to separating checker from builder |
| AR6-24 | Audit of 21 open models on OR-Bench, XSTest, ToxiGen, BOLD. Conservative families over-refuse. No access-tier fix tested | https://arxiv.org/abs/2605.05427 | 2026-05-30 (v2) | 3 | Yes | Preprint. No rates on the abstract page. Open models only |
| AR6-25 | A full-corpus audit of citation existence and claim support at an NLP conference. Support-defect rate 0.95% in the audit, then 5.66% and 6.12% on reruns | https://www.researchsquare.com/article/rs-10449790/latest | 2026-08-20 | 7 | Yes, on 2026-10-26 (V10b recheck). On 2026-10-25 the page returned only its title | Single-author preprint. Rung left at 7 per V10b, not used in any count |

## 4. Gaps

1. **No field before-and-after for any fix.** Every measured fix is a lab test or benchmark. No study compares incident rates in a live organisation before and after the fix.
2. **The named checker fails in the lab, and no one measures it in the field.** Doctors missed most seeded errors (AR6-03, AR6-04), and seeded errors cut doctors' accuracy by an adjusted 14 points (AR6-05). Reviewer scrutiny of agent code fell over time (AR6-07). No study tracks a named checker's catch rate with seeded errors inside a firm over months. Nudges and forcing steps help in the lab (AR6-08, AR6-09).
3. **Off switch.** No drill data at all. The one primary record shows an automatic stop that failed and a manual stop 2.5 hours after the alert (AR6-12).
4. **Stop rules.** Only a correlational analyst survey (SF-121). No AI study tests whether a stop rule set in advance ends weak pilots sooner.
5. **Contract terms.** No study measures the effect of notice, export or no-silent-renewal terms on any outcome (F6, F7, F14).
6. **Spend caps, blocked-page routing, failure notices.** F7, S7 and S2 have no measure of any kind.
7. **Vendor-graded fixes stay vendor-graded.** F3 and F13 still rest on vendor numbers. No independent test of verified access tiers or of data-loss controls was found.
8. **Self-built tools.** AR6-02, AR6-15 and AR6-19 test the authors' own designs. In AR6-14 the authors built both oracles, and in AR6-09 they designed the nudge. Independent replication would lift them.
9. **Not opened.** AR6-06 (NEJM AI version of AR6-05) needs opening before use. AR6-25 (citation support audit) opened on 2026-10-26 as a single-author preprint. The existing S1, S3, S5, S6, S10, F1, F6, F8 and F11 sources were not re-opened by A6 beyond AR6-17 and AR6-20.
10. **Search limits.** The 60-day sweep found no new rung 1 or 3 study for S1, S3, S5, S6, S10 or F11 beyond those already in the design doc. Search indexes may lag on October 2026 papers.
