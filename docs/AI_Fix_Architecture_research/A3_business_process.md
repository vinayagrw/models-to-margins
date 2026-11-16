# A3. Business process and governance that run the fixes

Researcher A3. Read on 2026-10-25. Scope: who does what, when, and under which standard, for building blocks P3 (failure log), P5 (one approved tool), P7 (contract terms), P8 (value ledger with stop rules) and P9 (named checkers and review capacity). The RACI also covers P1 to P10.

Every source below was opened with WebFetch on 2026-10-25 unless the ledger says "not opened" (rung 7). Ledger ids are in brackets, for example [AR3-02].

## How to read this file

- **Rows** are the six swimlanes: Leadership (CIO), Procurement and legal, Security, Platform and architecture (architect and evals lead), Finance, Team heads and HR.
- **Columns** are the five stages: Buy, Pilot, Go live, Run, Change.
- **Standard codes.** NIST codes such as GOVERN 2.3 come from AI RMF 1.0 [AR3-01]. Codes such as GV-6.1-004 are suggested actions in the Generative AI Profile, NIST AI 600-1 [AR3-02]. ISO/IEC 42001 clause numbers come from a NIST-hosted crosswalk that maps AI RMF to the draft (FDIS) text of ISO/IEC 42001 [AR3-04]. Clauses 4 to 10 follow the common ISO management system layout. The crosswalk numbers controls as "B.x" because it used the draft. The published 2023 standard puts its controls in an annex we could not open, so control numbers are given as the draft numbers and flagged.
- **EU AI Act** article text was read on the artificialintelligenceact.eu consolidated mirror, which shows the Digital Omnibus amendments. EUR-Lex returned empty pages [AR3-11].

## Key dates a buyer must plan around

| Date | What applies | Source |
|---|---|---|
| 2 February 2025 | AI literacy duty for providers and deployers (Article 4) | [AR3-08], [AR3-09] |
| 2 August 2025 | Rules for general-purpose AI model providers (Chapter V) | [AR3-09] |
| 27 July 2026 | Digital Omnibus on AI, Regulation (EU) 2026/1744, in force. Adopted 8 July 2026 | [AR3-10] |
| 2 August 2026 | General application. Deployer labelling duties in Article 50 | [AR3-09], [AR3-14] |
| 2 December 2026 | Providers of generative systems already on the market must meet Article 50(2) marking | [AR3-10] |
| 2 December 2027 | High-risk duties for Annex III systems, including deployer duties in Articles 26 and 27 | [AR3-07], [AR3-09], [AR3-13] |
| 2 August 2028 | High-risk duties for Annex I (product) systems | [AR3-09] |

Article 26 binds only deployers of high-risk systems. A general office assistant is high-risk only if its use falls in Annex III, which this pass did not open. Article 4 (literacy) and Article 50 (labels) apply to any deployer.

---

## 1. Swimlane task table

Cadence words: once, per change, weekly, monthly, quarterly. An empty cell means no opened source supports a task there.

### Stage 1. Buy

| Row | Task | Cadence | Standard | URL |
|---|---|---|---|---|
| Leadership (CIO) | Set AI policy and risk tolerance. Name one owner per block. Pick one approved tool (P5) | once | GOVERN 2.3, GOVERN 1.3. ISO 5.1, 5.2, 6.1.2 | [AR3-01], [AR3-04] |
| Procurement and legal | Write P7 terms into the contract: no training on your data, your right to test, notice of changes, incident notice, SLA, data handover in a common format, audit right, exit plan | once | GV-6.1-004, GV-6.1-006, GV-6.1-009, GV-6.2-007. ISO B.10.2, B.10.3 (draft numbering). MCC-AI Sections D and E. OMB M-25-22 Section 4.d.iii | [AR3-02], [AR3-04], [AR3-22], [AR3-26] |
| Security | Assess the supplier. Inventory every third party with access to your content. Keep an approved provider list. Threat model the use case | once | GV-6.1-007, GV-3.2-005. ISO B.10.3 (draft numbering) | [AR3-02], [AR3-04] |
| Platform and architecture | Write down the intended purpose. Build your own test set (P10) from data the vendor cannot see and that looks like live data | once | MAP 1.1, MEASURE 2.3. ISO 6.1.4. M-25-22 Section 4.d.iii.E | [AR3-01], [AR3-04], [AR3-26] |
| Finance | Write the business case with benefits and costs, including the cost of AI errors. Set the stop rule and the budget cap before any pilot (P8) | once | MAP 3.1, MAP 3.2. ISO 8.2 to 8.4. FinOps cost tracking and quotas. M-25-22 Section 4.e.iv sunset criteria | [AR3-01], [AR3-04], [AR3-19], [AR3-26] |
| Team heads and HR | Name the use case and who will check output (P9). Plan AI literacy for every user | once | Article 4. MAP 3.4, GOVERN 2.2. ISO 7.2 | [AR3-08], [AR3-01], [AR3-04] |

### Stage 2. Pilot

| Row | Task | Cadence | Standard | URL |
|---|---|---|---|---|
| Leadership (CIO) | Hold the go or stop gate at pilot end, judged against the stop rule | once | MANAGE 1.1. ISO B.9.3, B.9.4 (draft numbering) | [AR3-01], [AR3-04] |
| Procurement and legal | Collect vendor papers: acceptable use policy, model or system card, user guides, feedback channel. If you build on a general-purpose model, ask for its model documentation | once | M-26-04 Appendix A (US federal buyers). GPAI Code, Transparency chapter (14-day reply) | [AR3-27], [AR3-16] |
| Security | Test the pilot set-up for prompt injection and data leaks. Turn logging on | once | GV-3.2-005, GOVERN 4.3 | [AR3-02], [AR3-01] |
| Platform and architecture | Run the test set. Plant known errors to measure how many the checkers catch. Start the failure log (P3) | weekly | MEASURE 2.3, MS-2.5-003, MG-4.3-002, MP-3.4-004 | [AR3-01], [AR3-02] |
| Finance | Track cost per unit (token, call or case) and one value measure. Compare with the stop rule | weekly | FinOps unit costs. MAP 3.1, MAP 3.2 | [AR3-19], [AR3-01] |
| Team heads and HR | Name the checkers. Train them. Time each review. Collect user feedback | weekly | Article 26(2) (high-risk only). GV-3.2-004, MP-3.4-005, MEASURE 3.3 | [AR3-07], [AR3-02], [AR3-01] |

### Stage 3. Go live

| Row | Task | Cadence | Standard | URL |
|---|---|---|---|---|
| Leadership (CIO) | Sign off residual risk, named owners and a plan to switch the tool off | once | GOVERN 2.3, GOVERN 1.7. ISO 5.1, 9.3 | [AR3-01], [AR3-04] |
| Procurement and legal | High-risk only: register (public bodies), fundamental rights impact assessment where required, data protection impact assessment, tell affected people. Any deployer: label deepfakes and AI text published on public-interest matters | once | Articles 26(8), 26(9), 26(11), 27, 50(4) | [AR3-07], [AR3-13], [AR3-14] |
| Security | Test the off switch. Agree an incident plan with the vendor. Keep logs at least six months (high-risk) | once | GV-1.7-001, GV-6.2-003, MANAGE 2.4. Article 26(6) | [AR3-02], [AR3-01], [AR3-07] |
| Platform and architecture | Pin the model version behind the gateway (P6). Add the system to the AI inventory with model version, oversight roles and known issues | once | GV-1.6-001, GV-1.6-003. ISO B.4.2 (draft numbering) | [AR3-02], [AR3-04] |
| Finance | Set caps, spend alerts and cost tags per team and project | once | FinOps tags, quotas and alerts | [AR3-19] |
| Team heads and HR | Checker roster in place and sized to volume. Training done. Tell workers' representatives before workplace use (high-risk) | once | Article 4, Article 26(7). GOVERN 2.2. ISO 7.2, 7.3 | [AR3-08], [AR3-07], [AR3-01], [AR3-04] |

### Stage 4. Run

| Row | Task | Cadence | Standard | URL |
|---|---|---|---|---|
| Leadership (CIO) | Review the value ledger, failure log and incidents. Decide continue, fix or stop | quarterly | GOVERN 1.5. ISO 9.3. M-25-22 Section 4.d.iii.E names quarterly or twice-yearly checks | [AR3-01], [AR3-04], [AR3-26] |
| Procurement and legal | Review vendor performance and terms. Watch deprecation notices. Use the audit right | quarterly (audit once a year in MCC-AI) | MANAGE 3.1, GV-6.2-004. MCC-AI Article 20 | [AR3-01], [AR3-02], [AR3-22] |
| Security | Watch logs and incidents. Report serious incidents to the provider and authority within the Article 73 clock: 15 days, 10 for a death, 2 for a widespread infringement or a serious incident under Article 3(49)(b) | weekly, and per incident | MG-4.3-003. Article 26(5), Article 73 | [AR3-02], [AR3-07], [AR3-15] |
| Platform and architecture | Run the test set. Watch for drift and made-up content. Keep the failure log current and show trends | weekly | MG-4.1-002, MG-4.3-002, MS-2.5-003 | [AR3-02] |
| Finance | Update the value ledger: cost per unit, value per use case, anomalies. Apply stop rules | monthly | FinOps anomaly detection and billing review. MAP 3.2. M-25-22 Section 4.e.iii | [AR3-19], [AR3-01], [AR3-26] |
| Team heads and HR | Sample approved output. Track catch rate and review backlog. Refresh training | monthly | MP-3.4-005, MEASURE 3.3. Article 4 | [AR3-02], [AR3-01], [AR3-08] |

### Stage 5. Change (new model, new feature, price or limit change, retirement)

| Row | Task | Cadence | Standard | URL |
|---|---|---|---|---|
| Leadership (CIO) | Approve a material change, a switch of vendor or a retirement | per change | MANAGE 2.4, GOVERN 1.7 | [AR3-01] |
| Procurement and legal | Act on the vendor notice. Enforce new-feature notice. At exit, get data back in a common format and proof of deletion | per change | M-25-22 Sections 4.d.iii.G and 4.f.i. MCC-AI Articles 15 to 17 (data sets). GV-6.2-007 | [AR3-26], [AR3-22], [AR3-02] |
| Security | Re-test the changed model and fallback. Update the threat model | per change | GV-6.2-006, GV-3.2-005 | [AR3-02] |
| Platform and architecture | Run the full test set before switching. Roll back if the new version scores below the bar. Update the inventory | per change | M-25-22 Section 4.d.iii.F. MANAGE 4.1. ISO 10.2 | [AR3-26], [AR3-01], [AR3-04] |
| Finance | Re-price the business case. Re-check the stop rule | per change | M-25-22 Section 4.e.iv. MAP 3.2 | [AR3-26], [AR3-01] |
| Team heads and HR | Tell users what changed. Retrain checkers. Adjust review capacity | per change | MG-2.4-001 (retirement or switch-off only). Article 4 | [AR3-02], [AR3-08] |

---

## 2. RACI for blocks P1 to P10

R responsible, A accountable (one per block), C consulted, I informed. Block names follow the parent design doc.

| Block | Leadership (CIO) | Procurement and legal | Security | Platform and architecture | Finance | Team heads and HR |
|---|---|---|---|---|---|---|
| P1 Trust layer (claim checker, grounding) | I | I | C | A, R | I | C |
| P2 Source and freshness rules | I | C | C | A, R | I | C |
| P3 Failure log | I | C | R | A, R | I | R |
| P4 Agent fence | I | C | A, R | R | I | C |
| P5 One approved tool with data controls | A | R | R | C | C | C |
| P6 Gateway with pinned models | I | I | C | A, R | C | I |
| P7 Contract terms for change | I | A, R | C | C | C | I |
| P8 Value ledger with stop rules | C | I | I | R | A, R | R |
| P9 Named checkers and review capacity | C | I | I | C | C | A, R |
| P10 Test set on every change | I | I | C | A, R | I | C |

Why these choices, with the source that supports each:

- **P3.** NIST asks for a policy to record errors, near misses and harms (MG-4.3-002) and for after-action reviews (MG-4.3-001) [AR3-02]. The evals lead owns the log. Security and team heads feed it. Legal is consulted because high-risk serious incidents carry an Article 73 clock: 15 days as standard, 10 days for a death, and 2 days for a widespread infringement or a serious incident under Article 3(49)(b) (critical infrastructure disruption) [AR3-15].
- **P5.** NIST suggests an approved list of AI providers (GV-6.1-007) [AR3-02]. The CIO is accountable because AI RMF puts risk decisions with executive leadership (GOVERN 2.3) [AR3-01].
- **P7.** NIST names contract review as its own action (GV-6.2-007) and gives procurement as an actor task for GOVERN 6.1 [AR3-02].
- **P8.** FinOps asks for named owners for cost monitoring and forecasting [AR3-19]. Stop decisions go to the CIO at the quarterly review (GOVERN 1.5, MANAGE 1.1) [AR3-01].
- **P9.** Article 26(2) gives oversight to people with competence, training and authority [AR3-07]. Line managers and HR control those three things.

---

## 3. Standards mapping by block

| Block | NIST AI RMF and 600-1 | ISO/IEC 42001 (draft numbering, see note) | EU AI Act | Contract and cost sources |
|---|---|---|---|---|
| P3 Failure log | MG-4.3-001, MG-4.3-002, MG-4.3-003, GV-1.5-002, GV-6.2-002, GOVERN 4.3 | 10.2 nonconformity and corrective action, 9.3.2 review inputs, B.8.4 communication of incidents | Article 26(5) monitor and report, Article 73 timelines (high-risk): 15 days, 10 for a death, 2 for a widespread infringement or a serious incident under Article 3(49)(b) (critical infrastructure disruption) | OECD common reporting framework, 29 criteria [AR3-31] |
| P5 One approved tool | GV-6.1-007, GV-1.6-001, GV-3.2-003 (acceptable use) | 5.2 AI policy, B.10.3 suppliers | Article 4 literacy for all users | M-25-22 Section 3 (data handling, no training on agency data) [AR3-26] |
| P7 Contract terms | GV-6.1-004, GV-6.1-006, GV-6.1-009, GV-6.2-003, GV-6.2-007, MANAGE 3.1 | B.10.2 allocating responsibilities, B.10.3 suppliers | Article 26(1) use per provider instructions. GPAI Code 14-day documentation reply (for buyers who build on a model) | MCC-AI [AR3-22], M-25-22 [AR3-26], M-26-04 [AR3-27], UK guidelines [AR3-24] |
| P8 Value ledger | MAP 3.1, MAP 3.2, MANAGE 1.1, MANAGE 2.1 | 6.2 objectives, 8.2 to 8.4, 7.1 resources | none found | FinOps for AI [AR3-19], M-25-22 Section 4.e.iii and 4.e.iv [AR3-26] |
| P9 Named checkers | GOVERN 3.2, GV-3.2-004, MAP 3.4, MAP 3.5, MP-3.4-004, MP-3.4-005, MEASURE 3.3 | 5.3 roles, 7.2 competence, 7.3 awareness | Article 26(2), Article 14(4)(b) automation bias, Article 14(5) two-person check (biometric ID only), Article 4 | UK AI Playbook principle 4 [AR3-25] |

**ISO/IEC 42001 clauses that matter for a deployer.** Clause titles below appear in the NIST-hosted crosswalk [AR3-04]. ISO's own page returned 403 [AR3-06]. The IEC store confirms the standard: published 2023-12-18, edition 1.0, 51 pages [AR3-05].

| Clause | Title (from crosswalk) | Deployer use |
|---|---|---|
| 4.1 | Understanding the organization and its context | Legal and contract duties in scope |
| 5.1, 5.2, 5.3 | Leadership and commitment. AI policy. Roles, responsibilities and authorities | CIO sign-off, block owners |
| 6.1.2, 6.1.3, 6.1.4 | AI risk assessment. AI risk treatment. AI system impact assessment | Buy-stage risk and impact work |
| 6.2 | AI objectives and planning to achieve them | Value measure per use case (P8) |
| 7.1 to 7.4 | Resources. Competence. Awareness. Communication | Checker capacity and training (P9) |
| 7.5.3 | Control of documented information | Failure log and inventory records |
| 8.2, 8.3, 8.4 | Operation: risk assessment, risk treatment, impact assessment | Re-run on every change |
| 9.1, 9.2, 9.3 | Monitoring. Internal audit. Management review | Monthly ledger, yearly audit, quarterly CIO review |
| 10.1, 10.2 | Continual improvement. Nonconformity and corrective action | Failure log closes the loop |

Note: these numbers come from the draft text. Clause 4 to 10 headings follow the common ISO layout and are unlikely to move, but we did not open the final text. Annex control numbers (B.x in the draft) are not the published numbers.

**What the contract sources say about the five P7 terms**

| Term | MCC-AI high-risk (EU, Feb 2025) [AR3-22] | OMB M-25-22 (US federal, April 2025) [AR3-26] | UK guidelines (2020) [AR3-24] | Vendor practice (read 2026-10-25) |
|---|---|---|---|---|
| Notice before model retirement | Not covered. New conformity check after any substantial change | Notice before new AI features (4.d.iii.G). Agencies are encouraged to require vendors to meet performance standards before a new version, or roll back (4.d.iii.F) | Plan the full lifecycle | Anthropic at least 60 days [AR3-28]. Azure GA models at least 60 days, emergency retirement can be shorter [AR3-30]. OpenAI at least 6 months for GA models, unless safety or compliance concerns require a faster timeline [AR3-29] |
| Your right to test | Not covered | Agency test data kept from vendor, vendor gives access and time (4.d.iii.E) | Agree how model efficacy is monitored | none found |
| Data export | Handover of data sets in a common file format on request, proof of destruction (Articles 15 to 17) | Data and model portability, rights to code and models (4.d.iii.C). Closeout plan for data transfer (4.f.i) | Plan end-of-life for system and data | Anthropic usage export by key and model [AR3-28] |
| No training on your data | Supplier may use your data sets only to perform the contract (Article 15) | Permanent ban on training with non-public agency data without consent (Section 3) | Decide who owns new IP | none found |
| No silent renewal | Not covered | Applies to options to renew after the 180-day start date (Section 2.c). No renewal clause found | Not covered | none found |
| Audit | Once per calendar year or on any substantial change (Article 20) | Contracts must not stop agencies internally disclosing how the vendor tests or the test results (4.d.iii.E) | Independent audits suggested | none found |

---

## 4. Review-capacity evidence

The question: how many errors do human reviewers catch in AI output, and how much reviewer time is needed? No opened source gives a catch rate for reviewers of general LLM text, or a reviewer throughput norm. What exists:

| Id | Finding | Rung | Does not tell you |
|---|---|---|---|
| AR3-36 | Systematic review, 74 studies. In four pooled health studies, wrong advice raised the risk of a wrong decision, risk ratio 1.26. Correct decisions switched to wrong after advice in 6% to 11% of cases | 1 | Studies predate LLMs. Pooled analysis covers only four studies |
| AR3-35 | 27 radiologists, 12 of 40 mammograms carried a wrong AI suggestion. Inexperienced readers fell from almost 80% to under 20% correct. Experienced readers fell from 82% to 45.5% | 2 (journal press release) | Simulated AI, small sample. Not about text or code |
| AR3-37 | Meta-analysis of 106 experiments, 370 effect sizes. Human plus AI did worse than the best of either alone, Hedges g of -0.23. Decision tasks g -0.27. Gains when the human alone beat the AI (g 0.46), losses when the AI alone was better (g -0.54) | 1 | Studies from 2020 to mid-2023. Possible publication bias. Not a catch rate |
| AR3-39 | 1,339 teachers reviewed a wrongly scored exercise. When the harsh score was labelled AI, the fairness gap was 22% larger than with a human label. No significant difference for lenient errors | 1 | One exercise per teacher. Grading, not document review |
| AR3-38 | People with an AI coding assistant wrote less secure code and were more likely to think it was secure | 1 | Participant count not shown on the abstract page. 2022 model |
| AR3-40 | 577 people. Seeing more AI errors (10%, 30%, 50%) reduced use of the AI | 3 | Extended abstract. No effect sizes on the page |
| AR3-41 | BCG consultant study. Outside the frontier, subjects using AI were 19% less likely to produce correct solutions | 2 | Working paper abstract only. Full paper not opened |
| AR3-42 | 2,784-person study on checking AI-extracted values | 7 | Not opened (403) |

**What the evidence supports for P9**

1. Reviewers follow wrong AI output often enough that "a human checks it" is not a control until it is measured. Plant known errors in the P10 test set and measure each checker's catch rate. NIST says to keep human skill tests separate from AI tests (MP-3.4-004) and to track outcomes of human and AI set-ups (MP-3.4-005) [AR3-02].
2. Mitigators with some support: a sense of personal accountability, advice given as information rather than as a command, and less prominent advice [AR3-36]. These are design choices for the checker screen.
3. The law already names the checker in places. California SB 574, signed 2026-09-30 and effective 2027-01-01, has the responsible lawyer personally verify every citation in a court filing [AR3-43]. The EU AI Act asks that oversight staff stay aware of "automatically relying or over-relying on the output" (Article 14(4)(b)) [AR3-12]. For remote biometric ID it needs two people to confirm (Article 14(5)) [AR3-12].
4. Capacity has no standard. Size it from the pilot: measured review minutes per item times expected volume. FinOps lists "time to achieve business value" but no reviewer metric [AR3-19].

---

## 5. 60-day sweep (2026-08-25 to 2026-10-25)

| Date | Item | Effect on the process | Id |
|---|---|---|---|
| 2026-08-26 | OpenAI announced retirement of transcription models, shutdown 2027-02-26 | Six months notice, in line with stated policy | AR3-29 |
| 2026-09-11 | OpenAI announced retirement of GPT-5.4-Cyber, shutdown 2026-10-01 | 20 days notice. Below every stated minimum. Not labelled specialised or preview. The page gives no reason. The policy allows faster retirement for safety or compliance concerns | AR3-29 |
| 2026-09-30 | Anthropic deprecated Claude Sonnet 4.5, retirement 2026-11-30 | 61 days, close to the 60-day floor. P7 should ask for more | AR3-28 |
| 2026-09-30 | California SB 574 signed, effective 2027-01-01 | Named human verification for lawyers using AI | AR3-43 |
| 2026-10-01 | OpenAI announced retirement of GPT-5.3-Codex, GPT-5.1, GPT-5.4-Nano for 2027-04-01, and TTS models for 2027-01-06 | Six months notice, and 97 days for TTS. The page does not label TTS a specialised variant, so 97 days may fall below the 6-month GA minimum | AR3-29 |
| 2026-10-14 | OpenAI announced shutdown of GPT-4o, GPT-4o mini, GPT-4.1 and GPT-4.1 mini snapshots for 2027-01-14 | Three months notice against a stated six months for GA models. Could not confirm whether an exception applied | AR3-29 |
| 2026-10-16 | NIST CAISSI, NSA and CISA published key practices for incident readiness in super intelligence training and evaluation, five stages from preparation to reporting | Voluntary. Aimed at frontier developers. A template for P3 stages, not for deployer logs | AR3-34 |
| 2026-10-20 | EU AI Act Service Desk fact sheet on transparency rules | Confirms Article 50 applies from 2 August 2026 | AR3-18 |
| 2026-10-21 | Anthropic API version 2026-10-21 removed temperature, top_p and top_k, which now return a 400 error | A breaking change that is not a model retirement. P7 notice terms should cover API changes too | AR3-28 |
| 2026-10-22 | EU Guidelines on Transparency of AI-generated Content published, plus a webinar on signing the code | Deployer labelling under Article 50(4) | AR3-18 |

Checked and found nothing new in the window: NIST AI RMF revision (page still says "being revised", no draft) [AR3-03], ISO/IEC 42001 amendment (ISO page 403, IEC page shows edition 1.0) [AR3-05], OMB replacement for M-25-22 (none found, M-26-04 of 2025-12-11 adds LLM terms) [AR3-27], FinOps Foundation AI guidance (overview last updated 2026-02-17) [AR3-19], UK central government AI procurement guidance (none found). The Digital Omnibus (in force 2026-07-27) falls just before the window but sets every EU date above [AR3-10].

---

## 6. Ledger

Rungs: 1 peer reviewed, 2 primary record or official text, 3 independent measurement, 4 independent survey, 5 vendor or consulting, 6 press or user post, 7 not opened.

| Id | Claim | URL | Page date | Rung | Opened | Flags and what it does not tell you |
|---|---|---|---|---|---|---|
| AR3-01 | AI RMF 1.0 subcategories: GOVERN 1.3 to 1.7, 2.1 to 2.3, 3.2, 4.3, 6.1, 6.2. MAP 1.1, 3.1, 3.2, 3.4, 3.5, 4.1. MEASURE 1.1, 2.3, 3.1, 3.3, 4.1. MANAGE 1.1, 1.3, 2.1, 2.4, 3.1, 4.1 to 4.3 | https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf | January 2023 | 2 | yes, WebFetch plus local text extraction | Voluntary. Gives no cadence beyond "periodic" |
| AR3-02 | AI 600-1 actions: GV-1.5-002, GV-1.6-001 and -003, GV-1.7-001 and -002, GV-3.2-001 to -005, GV-6.1-004, -006, -007, -009, GV-6.2-001 to -007, MP-3.4-004 and -005, MS-2.5-003, MG-2.4-001 to -004, MG-4.1-002, MG-4.3-001 to -003. Defines automation bias as "excessive deference to automated systems" | https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf | July 2024 | 2 | yes, WebFetch plus local text extraction | Suggested actions, not required. No numbers |
| AR3-03 | AI RMF released 2023-01-26, "being revised" under the AI Action Plan. 600-1 released 2024-07-26. Critical infrastructure profile concept note 2026-04-07 | https://www.nist.gov/itl/ai-risk-management-framework | no date shown, read 2026-10-25 | 2 | yes, WebFetch | No revision draft or date published |
| AR3-04 | Crosswalk maps AI RMF to ISO/IEC FDIS 42001 clauses 4.1 to 10.2 and draft controls B.x | https://airc.nist.gov/docs/NIST_AI_RMF_to_ISO_IEC_42001_Crosswalk.pdf | 2023-05-23 (PDF metadata) | 2 | yes, WebFetch plus local text extraction | [draft text]. Author per metadata Gregory Montgomery, contributor not confirmed. Control numbers differ from the published standard |
| AR3-05 | ISO/IEC 42001:2023 published 2023-12-18, edition 1.0, 51 pages. Abstract: requirements for an AI management system | https://webstore.iec.ch/en/publication/90574 | 2023-12-18 | 2 | yes, WebFetch | Store page. No clause text |
| AR3-06 | ISO's own 42001 page | https://www.iso.org/standard/42001 | n/a | 7 | no, HTTP 403 (also /standard/81230.html and AI management systems page) | Clause text not opened |
| AR3-07 | Article 26 deployer duties 26(1) to 26(12). Logs at least six months. Annex III date 2 December 2027, Annex I 2 August 2028 | https://artificialintelligenceact.eu/article/26/ | no date shown, read 2026-10-25 | 2 | yes, WebFetch | [unofficial consolidated mirror]. Applies to high-risk systems only |
| AR3-08 | Article 4: providers and deployers take measures to support AI literacy. Paragraph 1 amended, 2 and 3 new. Applies from 2 February 2025 | https://artificialintelligenceact.eu/article/4/ | no date shown, read 2026-10-25 | 2 | yes, WebFetch | [mirror]. No level or certificate defined |
| AR3-09 | Article 113 application dates as amended | https://artificialintelligenceact.eu/article/113/ | no date shown, read 2026-10-25 | 2 | yes, WebFetch | [mirror]. Article 50 date inferred from general date, confirmed by AR3-14 |
| AR3-10 | Regulation (EU) 2026/1744 adopted 8 July 2026, in force 27 July 2026. Article 4 replaced. FRIA may reuse a DPIA. Article 50(2) grace to 2 December 2026 | https://artificialintelligenceact.eu/ai-act-explorer/digital-omnibus/ | no date shown, read 2026-10-25 | 2 | yes, WebFetch (first 100,000 characters) | [mirror]. OJ publication date (24 July 2026) only from secondary search results |
| AR3-11 | EUR-Lex text of Regulation 2026/1744 | https://eur-lex.europa.eu/eli/reg/2026/1744/oj | n/a | 7 | no, empty page returned | Official text not opened |
| AR3-12 | Article 14(4)(b) names automation bias. Article 14(5) needs two people to confirm remote biometric ID results | https://artificialintelligenceact.eu/article/14/ | no date shown, read 2026-10-25 | 2 | yes, WebFetch | [mirror]. Duty is on provider design. Deployer link is via Article 26(2) |
| AR3-13 | Article 27 fundamental rights impact assessment before first use, for public bodies and certain Annex III uses. Applies 2 December 2027 | https://artificialintelligenceact.eu/article/27/ | no date shown, read 2026-10-25 | 2 | yes, WebFetch | [mirror]. Template not yet opened |
| AR3-14 | Article 50 deployer duties: emotion recognition notice, deepfake label, AI text on public interest unless human editorial control. From 2 August 2026 | https://artificialintelligenceact.eu/article/50/ | no date shown, read 2026-10-25 | 2 | yes, WebFetch | [mirror] |
| AR3-15 | Article 73 serious incidents: 15 days standard, 2 days for a widespread infringement or a serious incident under Article 3(49)(b) (critical infrastructure disruption), 10 days death | https://artificialintelligenceact.eu/article/73/ | no date shown, read 2026-10-25 | 2 | yes, WebFetch | [mirror]. Page says from 2 August 2026, but high-risk duties start 2 December 2027 |
| AR3-16 | GPAI Code final 10 July 2025. Transparency chapter: reply to downstream requests within 14 days, keep past documentation 10 years | https://code-of-practice.ai/ | 2025-07-10 | 6 | yes, WebFetch (first 100,000 characters) | [unofficial mirror]. Binds signatory model providers, not buyers |
| AR3-17 | Official Commission GPAI code page | https://digital-strategy.ec.europa.eu/en/policies/contents-code-gpai | n/a | 7 | no, HTTP 403 | Not opened |
| AR3-18 | AI Act Service Desk: transparency fact sheet 20/10/2026, Guidelines on Transparency of AI-generated Content 22/10/2026, signing webinar 22/10/2026 | https://ai-act-service-desk.ec.europa.eu/en/resources | read 2026-10-25 | 2 | yes, WebFetch (first results page) | Guideline text not opened |
| AR3-19 | FinOps for AI: Price times Quantity, tags, quotas, alerts, showback, named cost owners. Ten KPIs incl. cost per inference, cost per token, cost per API call, ROI, time to business value | https://www.finops.org/wg/finops-for-ai-overview/ | last updated 2026-02-17 | 5 | yes, WebFetch | [practitioner body]. Says no accepted way to split multi-agent costs. No "cost per outcome" metric |
| AR3-20 | State of FinOps 2026: 1,192 respondents, 98% manage AI spend, up from 31% two years earlier | https://data.finops.org/ | 2026 | 4 | yes, WebFetch | Self-selected FinOps practitioners. Does not show whether spend pays back |
| AR3-21 | MCC-AI updated 5 March 2025: high-risk version, light version, commentary, 24 languages | https://public-buyers-community.ec.europa.eu/communities/procurement-ai/resources/updated-eu-ai-model-contractual-clauses | 2025-03-05 | 2 | yes, WebFetch | Voluntary template |
| AR3-22 | MCC-AI high-risk text: Sections A to F. Data handover in common format, destruction on request, audit once per calendar year or on substantial change, supplier QMS includes serious incident procedure | https://public-buyers-community.ec.europa.eu/system/files/2025-05/Model%20Clauses%20High%20Risk.docx | Version February 2025 | 2 | yes, WebFetch plus local text extraction | Disclaimer: "does not reflect an official position". No retirement notice or renewal clause |
| AR3-23 | UK Guidelines for AI procurement published 8 June 2020 | https://www.gov.uk/government/publications/guidelines-for-ai-procurement | 2020-06-08 | 2 | yes, WebFetch | Old. Predates generative AI |
| AR3-24 | UK top 10 considerations incl. avoid opaque models and single-supplier dependence, plan the full lifecycle, end-of-contract roles | https://www.gov.uk/government/publications/guidelines-for-ai-procurement/guidelines-for-ai-procurement | 2020-06-08 | 2 | yes, WebFetch | No model-change terms |
| AR3-25 | UK AI Playbook, 10 principles, published 10 February 2025. Principle 4 meaningful human control. Principle 8 involve commercial colleagues early | https://www.gov.uk/government/publications/ai-playbook-for-the-uk-government/artificial-intelligence-playbook-for-the-uk-government-html | 2025-02-10 | 2 | yes, WebFetch (first 100,000 characters) | No renewal, export or retirement terms in the part read |
| AR3-26 | OMB M-25-22, 3 April 2025: applies from 180 days after issue, lock-in protections, test data kept from vendor, quarterly or twice-yearly monitoring, roll back if new version fails, new feature notice, value evaluation, sunset criteria, closeout data transfer | https://www.whitehouse.gov/wp-content/uploads/2025/02/M-25-22-Driving-Efficient-Acquisition-of-Artificial-Intelligence-in-Government.pdf | 2025-04-03 | 2 | yes, WebFetch plus local text extraction | US federal agencies only |
| AR3-27 | OMB M-26-04, 11 December 2025: LLM solicitations must request acceptable use policy, model or system cards, user resources, feedback channel. Policies due 11 March 2026. Sunset after two years | https://www.whitehouse.gov/wp-content/uploads/2025/12/M-26-04-Increasing-Public-Trust-in-Artificial-Intelligence-Through-Unbiased-AI-Principles-1.pdf | 2025-12-11 | 2 | yes, WebFetch plus local text extraction | US federal only. Focus is the Unbiased AI Principles, truth-seeking and ideological neutrality. The memo asks for "reliable outputs" |
| AR3-28 | Anthropic: at least 60 days notice before retiring public models. Sonnet 4.5 deprecated 2026-09-30, retires 2026-11-30. API version 2026-10-21 removed sampling parameters. Usage export by key and model | https://platform.claude.com/docs/en/about-claude/model-deprecations | read 2026-10-25 | 5 | yes, WebFetch | [vendor]. Notice for partner platforms set by partners |
| AR3-29 | OpenAI: "Unless safety or compliance concerns require a faster timeline", at least 6 months for GA models, 3 months for specialised variants, preview can be about 2 weeks. Five announcements in the window | https://developers.openai.com/api/docs/deprecations | read 2026-10-25 | 5 | yes, WebFetch (via redirect from platform.openai.com) | [vendor]. The page gives no reason why two notices fell short of the standard minimums |
| AR3-30 | Azure Foundry: GA retirement notice at least 60 days, 18-month standard lifecycle (12 months for some partner models), emergency retirement with shorter notice, Standard deployments auto-upgrade, retirement dates not extendable | https://learn.microsoft.com/en-us/azure/ai-foundry/openai/concepts/model-retirements | updated 2026-07-24 | 5 | yes, WebFetch | [vendor] |
| AR3-31 | OECD common reporting framework for AI incidents, 29 criteria, published 28 February 2025, a "global benchmark" | https://oecd.ai/en/ai-publications/towards-a-common-reporting-framework-for-ai-incidents | 2025-02-28 | 2 | yes, WebFetch | Criteria list and groupings not on the page. Built for national reporting, not internal logs |
| AR3-32 | OECD publication page for the same paper | https://www.oecd.org/en/publications/towards-a-common-reporting-framework-for-ai-incidents_f326d4ac-en.html | n/a | 7 | no, HTTP 403 | PDF not opened |
| AR3-33 | OECD AI Incidents Monitor: incident means actual harm, hazard means plausible harm. Open submission under development | https://oecd.ai/en/incidents-methodology | no date shown, read 2026-10-25 | 2 | yes, WebFetch | Built from news, a subset of incidents. Page gives about 10 and about 30 per day in two places |
| AR3-34 | NIST CAISSI, NSA and CISA key practices for incident readiness, 2026-10-16, five lifecycle stages, builds on SP 800-61r3 | https://www.nist.gov/node/1922751 | 2026-10-16 | 2 | yes, WebFetch | Ten practices not listed on the page. Aimed at frontier developers |
| AR3-35 | Dratsch et al., Radiology, 27 radiologists, 12 of 40 wrong AI suggestions, accuracy almost 80% to under 20% (inexperienced), 82% to 45.5% (experienced) | https://www.rsna.org/media/press/i/2432 | 2023-05-02 | 2 | yes, WebFetch | [press release of peer-reviewed paper, paper not opened]. Simulated AI |
| AR3-36 | Goddard et al., JAMIA, 74 studies, risk ratio 1.26, 6% to 11% negative consultations, mitigators | https://pmc.ncbi.nlm.nih.gov/articles/PMC3240751/ | 2011 online, 2012 issue | 1 | yes, WebFetch | Pre-LLM. Four pooled studies |
| AR3-37 | Vaccaro, Almaatouq, Malone, Nature Human Behaviour, 106 experiments, g -0.23 synergy, g 0.64 against human alone | https://pmc.ncbi.nlm.nih.gov/articles/PMC11659167/ | 2024-10-28 | 1 | yes, WebFetch | Studies to June 2023 |
| AR3-38 | Perry et al., CCS 2023: AI assistant users wrote less secure code and felt more confident | https://arxiv.org/abs/2211.03622 | 2022-11-07, revised 2023-12-18 | 1 | yes, WebFetch (abstract) | No participant count on page |
| AR3-39 | Goulas et al., PNAS Nexus: 1,339 teachers, harsh-error gap 22% larger with AI label | https://academic.oup.com/pnasnexus/article/5/6/pgag146/8703788 | 2026-06-09 | 1 | yes, WebFetch (first 100,000 characters) | Single task, Greece |
| AR3-40 | Anthis et al., CHI EA 2026: 577 people, more observed errors reduced AI use | https://arxiv.org/abs/2604.04319 | 2026-04-05 | 3 | yes, WebFetch (abstract) | [extended abstract]. No effect sizes |
| AR3-41 | Dell'Acqua et al. jagged frontier study. Outside the frontier, subjects using AI were 19% less likely to produce correct solutions | https://www.hbs.edu/faculty/Pages/item.aspx?num=64700 | n/a | 2 | yes, HTTP 200 on 2026-10-26 (V10b recheck). HTTP 403 on 2026-10-25, SSRN and HBS PDF also 403 | [working paper abstract]. Full paper not opened |
| AR3-42 | "Bias in the Loop", HDSR Spring 2026 | https://hdsr.mitpress.mit.edu/pub/nrcn4h7d/release/2 | n/a | 7 | no, HTTP 403 | Not used |
| AR3-43 | California SB 574 signed 2026-09-30, effective 2027-01-01, responsible attorney must personally verify every citation | https://www.hklaw.com/en/insights/publications/2026/10/california-enacts-rules-governing-lawyers-use-of-generative-ai | 2026-10-01 | 6 | yes, WebFetch | [law firm]. Bill text not opened |
| AR3-44 | EU Data Act switching rules (notice periods, data export, switching charges) | https://eur-lex.europa.eu/eli/reg/2023/2854/oj/eng | n/a | 7 | no, empty page returned | Could support "data export" and "no lock-in" in P7 once opened |

---

## 7. Gaps

1. **ISO/IEC 42001 clause text not opened.** ISO pages return 403. Clause titles come from a 2023 crosswalk to the draft. Annex control numbers in the final standard are unknown here.
2. **EUR-Lex not readable.** All EU AI Act text is from the artificialintelligenceact.eu mirror. The Official Journal date of 24 July 2026 for Regulation 2026/1744 is from search results only.
3. **No reviewer catch rate for LLM text or code.** No opened study measures what share of LLM errors a trained reviewer catches at work, or how many items a reviewer can check per hour. P9 capacity must be measured in the pilot.
4. **No source sets cadences.** NIST says "periodic" and asks the organisation to set the frequency (GOVERN 1.5). Weekly, monthly and quarterly in the table are design choices, except the MCC-AI yearly audit and the M-25-22 example of quarterly or twice-yearly checks.
5. **No silent renewal.** No opened source has a clause against automatic renewal. M-25-22 ties its rules to option renewals but does not ban auto-renewal.
6. **Model retirement notice.** MCC-AI and the UK guidelines do not cover vendor model retirement. Only vendor policies (60 days to 6 months) and M-25-22's feature-notice rule exist. Two OpenAI notices (GPT-5.4-Cyber at 20 days, GPT-4 series snapshots at 92 days) were shorter than the standard minimums in its policy. The policy allows faster retirement for safety or compliance concerns, and the page gives no reason. TTS at 97 days may be a third if TTS is not a specialised variant.
7. **OECD 29 criteria not listed.** The PDF did not open, so the field list for an internal failure log cannot be copied from OECD yet.
8. **Finance row has no EU AI Act duty.** The value ledger maps to NIST MAP 3.1 and 3.2, FinOps and M-25-22 only.
9. **Annex III not opened.** Whether a given use of a frontier tool is high-risk, and so triggers Articles 26 and 27, depends on that list.
10. **Data Act switching rules not opened.** Could give P7 a legal basis for export and exit terms for cloud-delivered AI in the EU.
