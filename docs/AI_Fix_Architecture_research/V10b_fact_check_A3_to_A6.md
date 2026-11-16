# V10b. Fact check of A3 to A6

Checked 2026-10-26 by an independent checker who did not write the briefs. No brief was edited.

Method:
- Every cited URL was opened again on 2026-10-26. Most pages came through curl with a browser user agent, with the text pulled out by Python. PDFs and the MCC-AI docx were downloaded and read in full.
- Where curl was blocked, WebFetch or a browser tab was used. That covered OpenAI help, the Services Agreement, the Gartner pages, BLS, PNAS Nexus, CSA and ChatGPT pricing.
- Wayback was used only where a ledger row itself cites a Wayback copy, plus CDX listings to check claims about captures.
- Every line of the A4 example-firm sums was recomputed in Python.
- Status meanings:
  - **verified** means the same number and the same meaning.
  - **wrong** means the page says something different, or the wording changes the meaning.
  - **unverified** means the page could not be opened or does not contain the claim.
- Rows marked "Optional" are verified. The note is a wording suggestion and does not change the status.

## A3. Business process and governance (ledger AR3-xx)

| id or location | claim (short) | status | where looked (URL) | quote or what the page says | fix needed |
|---|---|---|---|---|---|
| AR3-01 | AI RMF 1.0 subcategories GOVERN 1.3 to 6.2, MAP, MEASURE, MANAGE as listed | verified | https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf | All cited subcategories found. GOVERN 2.3: "Executive leadership of the organization takes responsibility for decisions" | none |
| AR3-02 | AI 600-1 action codes as listed, automation bias definition | verified | https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf | Every cited code found. "automation bias, or excessive deference to automated systems" | none |
| AR3-03 | RMF released 2023-01-26, being revised, 600-1 released 2024-07-26, CI concept note 2026-04-07 | verified | https://www.nist.gov/itl/ai-risk-management-framework | "The AI RMF 1.0 is being revised as part of the White House AI Action Plan" | none |
| AR3-04 | Crosswalk to ISO/IEC FDIS 42001, PDF dated 2023-05-23, author Gregory Montgomery | verified | https://airc.nist.gov/docs/NIST_AI_RMF_to_ISO_IEC_42001_Crosswalk.pdf | PDF metadata: Author Gregory Montgomery, created 20230523. Title names "ISO/IEC FDIS 42001" | none |
| AR3-05 | ISO/IEC 42001 published 2023-12-18, edition 1.0, 51 pages | verified | https://webstore.iec.ch/en/publication/90574 | "Publication date 2023-12-18 Edition 1.0 ... Pages 51" | none |
| AR3-06 | ISO own page (rung 7) | unverified | https://www.iso.org/standard/42001 | HTTP 403 again on 2026-10-26 | none |
| AR3-07 | Art 26 duties, logs at least six months, Annex III 2 Dec 2027, Annex I 2 Aug 2028 | verified | https://artificialintelligenceact.eu/article/26/ | "Comes into force 2 December 2027 (high-risk under Annex III) / 2 August 2028" | none |
| AR3-08 | Art 4 literacy duty on providers and deployers, para 1 amended, 2 and 3 new, from 2 Feb 2025 | verified | https://artificialintelligenceact.eu/article/4/ | "Providers and deployers of AI systems shall take measures to support" | Optional: the Omnibus softened the duty from "ensure ... a sufficient level" to "support". Still a provider and deployer duty |
| AR3-09 | Art 113 dates as amended | verified | https://artificialintelligenceact.eu/article/113/ | "2 December 2027 as regards AI systems classified as high-risk pursuant to Article 6(2) and Annex III" | none |
| AR3-10 | Regulation (EU) 2026/1744, adopted 8 July 2026, in force 27 July 2026, Art 4 replaced, FRIA may reuse DPIA, Art 50(2) grace to 2 Dec 2026 | verified | https://artificialintelligenceact.eu/ai-act-explorer/digital-omnibus/ | "Regulation (EU) 2026/1744 ... of 8 July 2026" and "It entered into force on 27 July 2026" | none |
| AR3-11 | EUR-Lex text of 2026/1744 (rung 7) | unverified | https://eur-lex.europa.eu/eli/reg/2026/1744/oj | Empty body (HTTP 202, 0 bytes) by curl and WebFetch | none |
| AR3-12 | Art 14(4)(b) automation bias, 14(5) two people for remote biometric ID | verified | https://artificialintelligenceact.eu/article/14/ | "automatically relying or over-relying on the output" and "at least two natural persons" | none |
| AR3-13 | Art 27 FRIA before first use, public bodies and certain Annex III uses, 2 Dec 2027 | verified | https://artificialintelligenceact.eu/article/27/ | "Comes into force 2 December 2027 (high-risk under Annex III)" | Optional: also covers "private entities providing public services" |
| AR3-14 | Art 50 deployer duties from 2 Aug 2026 | verified | https://artificialintelligenceact.eu/article/50/ | "Comes into force 2 August 2026" and "human review or editorial control" | none |
| AR3-15 | Art 73: 15 days standard, 2 days widespread infringement, 10 days death | wrong (incomplete) | https://artificialintelligenceact.eu/article/73/ | Para 3 gives two days for "a widespread infringement or a serious incident" under Art 3(49)(b) | Say: 2 days for a widespread infringement or a critical infrastructure incident under Art 3(49)(b) |
| AR3-16 | GPAI Code final 10 July 2025, 14-day reply, 10-year retention | verified | https://code-of-practice.ai/ | "no later than 14 days of receiving the request" and "a period ending 10 years after". Date shown as 10/07/2025 | none |
| AR3-17 | Commission GPAI page (rung 7) | unverified | https://digital-strategy.ec.europa.eu/en/policies/contents-code-gpai | HTTP 403 again | none |
| AR3-18 | Service Desk: fact sheet 20/10/2026, guidelines 22/10/2026, signing webinar 22/10/2026 | verified | https://ai-act-service-desk.ec.europa.eu/en/resources | "Fact sheets 20/10/2026 Quick facts: Transparency rules for AI systems" | Optional: the webinar text refers to a session held on 22 June |
| AR3-19 | FinOps for AI: Price x Quantity, tags, quotas, showback, named owners, ten KPIs, multi-agent gap, updated 2026-02-17 | verified | https://www.finops.org/wg/finops-for-ai-overview/ | "Basic Price * Quantity = Cost" and "Last updated: February 17, 2026". KPIs numbered 1 to 10 | none |
| AR3-20 | State of FinOps 2026: 1,192 respondents, 98% manage AI spend, up from 31% two years earlier | verified | https://data.finops.org/ | "98% now manage AI spend (up from 31% two years ago)" | none |
| AR3-21 | MCC-AI updated 5 March 2025, high-risk, light, commentary, 24 languages | verified | https://public-buyers-community.ec.europa.eu/communities/procurement-ai/resources/updated-eu-ai-model-contractual-clauses | "Publication date 5 March 2025". English plus "Other languages (23)" | none |
| AR3-22 | MCC-AI high-risk: Sections A to F, handover in common format, destruction, audit once per calendar year, QMS serious incident procedure, disclaimer | verified | https://public-buyers-community.ec.europa.eu/system/files/2025-05/Model%20Clauses%20High%20Risk.docx | "an audit once per calendar year or in relation to any Substantial Modification". Articles 15 to 17 are data sets, 20 is audit | none |
| AR3-23 | UK AI procurement guidelines published 8 June 2020 | verified | https://www.gov.uk/government/publications/guidelines-for-ai-procurement | "Published: 8 June 2020" | none |
| AR3-24 | UK top 10: avoid opaque models and lock-in, plan lifecycle, end-of-contract roles | verified | https://www.gov.uk/government/publications/guidelines-for-ai-procurement/guidelines-for-ai-procurement | "8. Avoid Black Box algorithms and vendor lock in" | Optional: end-of-contract roles sit in the End-of-life section, not the top 10 |
| AR3-25 | UK AI Playbook, 10 Feb 2025, 10 principles, P4 human control, P8 commercial colleagues | verified | https://www.gov.uk/government/publications/ai-playbook-for-the-uk-government/artificial-intelligence-playbook-for-the-uk-government-html | "Principle 8: You work with commercial colleagues from the start" | none |
| AR3-26 | M-25-22, 3 April 2025, 180 days, lock-in, test data, monitoring, roll back, feature notice, value, sunset, closeout | verified | https://www.whitehouse.gov/wp-content/uploads/2025/02/M-25-22-Driving-Efficient-Acquisition-of-Artificial-Intelligence-in-Government.pdf | "April 3, 2025" and "180 days after issuance of this memorandum" | Section numbers need fixing (see M-25-22 numbering row) |
| AR3-26 flag | A September 2026 tracker says M-25-22 still in force | unverified | no URL given in the brief | no source to open | Add the tracker URL or drop the claim |
| AR3-27 | M-26-04, 11 Dec 2025, Appendix A four items, policies due 11 March 2026, two-year sunset | verified | https://www.whitehouse.gov/wp-content/uploads/2025/12/M-26-04-Increasing-Public-Trust-in-Artificial-Intelligence-Through-Unbiased-AI-Principles-1.pdf | "No later than March 11, 2026, agencies must update their policies" and "two years after the date of its issuance" | none |
| AR3-27 flag | "Focus is political neutrality, not reliability" | wrong | same PDF | The memo asks for LLMs that "produce reliable outputs free from harmful ideological biases" | Say: focus is the two Unbiased AI Principles, truth-seeking and ideological neutrality |
| AR3-28 | Anthropic 60 days, Sonnet 4.5 deprecated 2026-09-30 retiring 2026-11-30, API 2026-10-21 removes sampling params, usage export by key and model | verified | https://platform.claude.com/docs/en/about-claude/model-deprecations | "at least 60 days' notice before model retirement for publicly released models" | Optional: the export is a usage audit CSV, not a data export |
| AR3-29 | OpenAI: 6 months GA, 3 months specialised, preview about 2 weeks, five announcements in window | verified | https://developers.openai.com/api/docs/deprecations | "Generally available models: At least 6 months" | Add the policy's exception: "Unless safety or compliance concerns require a faster timeline" |
| AR3-30 | Azure: GA notice at least 60 days, 18-month lifecycle, 12 months for some partner models, emergency retirement, auto-upgrade, not extendable, updated 2026-07-24 | verified | https://learn.microsoft.com/en-us/azure/ai-foundry/openai/concepts/model-retirements | "At least 60 days before retirement". "Retirement dates aren't extendable." ms.date 2026-07-24 | Optional: auto-upgrade covers Global Standard, Data Zone Standard and Standard only |
| AR3-31 | OECD framework, 29 criteria, 28 Feb 2025, "global benchmark" | verified | https://oecd.ai/en/ai-publications/towards-a-common-reporting-framework-for-ai-incidents | "Through its 29 criteria" and "February 28, 2025" | none |
| AR3-32 | OECD publication page (rung 7) | unverified | https://www.oecd.org/en/publications/towards-a-common-reporting-framework-for-ai-incidents_f326d4ac-en.html | HTTP 403 again | none |
| AR3-33 | Incident vs hazard, open submission in development, about 10 and about 30 a day | verified | https://oecd.ai/en/incidents-methodology | "resulting in around 10 AI incidents or hazards" and "on average 30 incidents and hazards per day" | none |
| AR3-34 | NIST CAISSI, NSA, CISA key practices, 2026-10-16, five stages, SP 800-61r3 | verified | https://www.nist.gov/node/1922751 | "preparation, detection, response, recovery, and reporting" | none |
| AR3-35 | Dratsch: 27 radiologists, 12 of 40 wrong, almost 80% to under 20%, 82% to 45.5% | verified | https://www.rsna.org/media/press/i/2432 | "saw their accuracy fall from 82% to 45.5%" | none |
| AR3-36 | Goddard: 74 studies, RR 1.26, 6% to 11%, four pooled studies, mitigators | verified | https://pmc.ncbi.nlm.nih.gov/articles/PMC3240751/ | "The risk ratio was 1.26 (95% CI 1.11 to 1.44)" | none |
| AR3-37 | Vaccaro: 106 experiments, g -0.23 synergy, g 0.64 against human alone, 2024-10-28, studies to June 2023 | verified | https://pmc.ncbi.nlm.nih.gov/articles/PMC11659167/ | "worse than the best of humans or AI alone (Hedges' g = -0.23" | none |
| AR3-38 | Perry, CCS 2023: less secure code, more confident, no N on page | verified | https://arxiv.org/abs/2211.03622 | "were more likely to believe they wrote secure code" | none |
| AR3-39 | Goulas, PNAS Nexus: 1,339 teachers, harsh-error gap 22% larger with AI label, Greece, 2026-06-09 | verified | https://academic.oup.com/pnasnexus/article/5/6/pgag146/8703788 (WebFetch, curl 403) | "the gap was 22% larger when the score was labeled as AI-generated" | none |
| AR3-40 | Anthis, CHI EA 2026: 577 people, 10/30/50% error rates | verified | https://arxiv.org/abs/2604.04319 | "(N = 577) with error rates of 10%, 30%, or 50%" | none |
| AR3-41 | Dell'Acqua jagged frontier, "19 points less correct", rung 7 not opened | wrong | https://www.hbs.edu/faculty/Pages/item.aspx?num=64700 (HTTP 200 on 2026-10-26) | "subjects using AI were 19% less likely to produce correct solutions" | Mark opened (rung 2, working paper abstract). Use "19% less likely", not "19 points" |
| AR3-42 | "Bias in the Loop", HDSR, 2,784 people (rung 7) | unverified | https://hdsr.mitpress.mit.edu/pub/nrcn4h7d/release/2 | HTTP 403 by curl and WebFetch | none |
| AR3-43 | SB 574 signed 2026-09-30, effective 2027-01-01, attorney personally verifies every citation | verified | https://www.hklaw.com/en/insights/publications/2026/10/california-enacts-rules-governing-lawyers-use-of-generative-ai | "signed Senate Bill (SB) 574 on September 30, 2026" and "Effective January 1, 2027" | none |
| AR3-44 | EU Data Act switching rules (rung 7) | unverified | https://eur-lex.europa.eu/eli/reg/2023/2854/oj/eng | Empty body (HTTP 202, 0 bytes) | none |
| Key dates row 1 | 2 Feb 2025 Art 4 literacy | verified | https://artificialintelligenceact.eu/article/4/ | "Comes into force 2 February 2025, according to Article 113(a)" | none |
| Key dates row 2 | 2 Aug 2025 Chapter V GPAI rules | verified | https://artificialintelligenceact.eu/article/113/ | "Chapter V, Chapter VII and Chapter XII ... from 2 August 2025" | none |
| Key dates row 3 | Omnibus in force 27 July 2026, adopted 8 July 2026 | verified | https://artificialintelligenceact.eu/ai-act-explorer/digital-omnibus/ | "It entered into force on 27 July 2026" | none |
| Key dates row 4 | 2 Aug 2026 general application, Art 50 labels | verified | https://artificialintelligenceact.eu/article/113/ | "It shall apply from 2 August 2026" | none |
| Key dates row 5 | 2 Dec 2026, generative systems already on market meet Art 50(2) | verified | https://artificialintelligenceact.eu/ai-act-explorer/digital-omnibus/ | "placed on the market before 2 August 2026 ... comply with Article 50(2) by 2 December 2026" | none |
| Key dates row 6 | 2 Dec 2027 Annex III, including Art 26 and 27 deployer duties | verified | https://artificialintelligenceact.eu/article/113/ and /article/26/ and /article/27/ | New Art 113(c) moves Chapter III Sections 1 to 3 to 2 December 2027 for Annex III. Both article pages show that date | none |
| Key dates row 7 | 2 Aug 2028 Annex I | verified | https://artificialintelligenceact.eu/article/113/ | "2 August 2028 as regards AI systems classified as high-risk pursuant to Article 6(1)" | none |
| Line 26 | Art 4 and Art 50 apply to any deployer | verified (loose) | https://artificialintelligenceact.eu/article/50/ | Art 50(3) and (4) bind deployers of emotion recognition, deepfake or public-interest text systems | Optional: "Article 50 applies to any deployer that uses those features" |
| Stage 1 to 5 tables, NIST and ISO codes | Every GOVERN, MAP, MEASURE, MANAGE and GV/MP/MS/MG code cited, and every ISO clause and B.x control | verified | 100-1 PDF, 600-1 PDF, crosswalk PDF | e.g. MP-3.4-004 "Delineate human proficiency tests from tests of GAI capabilities". GV-6.1-007 "approved GAI technology and service provider lists" | none, except the MG-2.4-001 row below |
| Stage 5 Team heads | MG-2.4-001 for "tell users what changed" | wrong (scope) | https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf | MG-2.4-001 covers communication plans "as part of the deactivation or disengagement process" | Use MG-2.4-001 only for a retirement or switch-off |
| Stage 1 to 5 tables, EU articles | Art 26(1), (2), (5), (6), (7), (8), (9), (11), Art 27, 50(4), 73 | verified | artificialintelligenceact.eu article pages | 26(7) "shall inform workers' representatives and the affected workers" | none |
| Stage 1 to 5 tables, FinOps and MCC-AI | FinOps unit costs, tags, quotas, alerts, anomaly review. MCC Sections D and E, Arts 15 to 17, 20 | verified | finops.org page and MCC docx | "Set Usage Limits and Quotas". "in a common file format" | Optional: MCC gives a right to audit once a year, not a duty |
| RACI notes P3, P5, P7, P8, P9 | MG-4.3-001/002, GV-6.1-007, GOVERN 2.3, GV-6.2-007, FinOps named owners, Art 26(2) | verified | 600-1, 100-1, finops.org, Art 26 | "Assign specific owners for tasks such as monitoring costs, forecasting budgets" | P3 note repeats the Art 73 clock, fix as AR3-15 |
| ISO clause table | Clause titles 4.1 to 10.2 from the crosswalk | verified | crosswalk PDF | "10.2 Nonconformity and corrective action" and "7.5.3 Control of documented information" | Optional: 9.1 to 9.3 titles are shortened subclause titles |
| M-25-22 numbering (lines 39, 41, 71, 83, 85, P7 table, standards table) | Cites 4.d.C, 4.d.E, 4.d.F, 4.d.G, 4.f | wrong (numbering) | M-25-22 PDF, Section 4.d | 4.d is "Selection and Award". Items A to G sit under 4.d "iii. Contract Terms" | Change to 4.d.iii.C, 4.d.iii.E, 4.d.iii.F, 4.d.iii.G and 4.f.i. Section 2.c, 4.e.iii and 4.e.iv are right |
| Line 123 and P7 table, training ban | M-25-22 Section 3 bans training on non-public agency data without consent | verified | M-25-22 PDF | "permanently prohibit the use of non-public inputted agency data" | Optional: cite the "Protect IP Rights and Use of Government Data" item iv |
| Line 71 | M-25-22 names quarterly or twice-yearly checks | verified | M-25-22 PDF | "(e.g., on a quarterly or biannual basis, based on the needs of the program)" | Optional: say it is an example |
| P7 table, retirement row, M-25-22 cell | "Vendor must meet performance before a new version or roll back (4.d.F)" | wrong | M-25-22 PDF | "Federal agencies are encouraged to require vendors to ... meet performance standards" | Say agencies are encouraged to require it. It is a recommendation, not a must |
| P7 table, retirement row, M-25-22 cell | Notice before new AI features (4.d.G) | verified | M-25-22 PDF | "agencies should consider ... requiring vendors to provide a notification" | Optional: say it is optional |
| P7 table, test row | Agency test data kept from vendor, vendor gives access and time (4.d.E) | verified | M-25-22 PDF | "should not be accessible to the vendor" and "Vendors must provide the access and time" | none |
| P7 table, export row | Portability and rights to code and models (4.d.C), closeout plan (4.f) | verified | M-25-22 PDF | "data and model portability, providing agencies with rights to code and models" | Fix numbering only |
| P7 table, renewal row | Options to renew after 180 days (2.c), no renewal clause | verified | M-25-22 PDF | "any option to renew or extend the period of performance" | none |
| P7 table, audit row, M-25-22 cell | "Contracts must not stop agencies disclosing vendor test results (4.d.E)" | wrong | M-25-22 PDF | "must not prohibit agencies from internally disclosing how the vendor conducts testing" | Add "internally". The memo protects internal disclosure only |
| P7 table, UK column | Plan lifecycle, efficacy monitoring, end-of-life, new IP ownership, independent audits | verified | UK guidelines page | "establish with the supplier how the efficacy of the model will be monitored" | none |
| P7 table, MCC column | Not covered on retirement, test right or renewal. New conformity check after substantial change. Art 15 use only to perform the contract | verified | MCC docx | "shall undergo a new conformity assessment procedure whenever ... Substantially Modified" | Optional: Art 15 allows other uses where Annex B says so |
| P7 table, vendor column | Anthropic 60 days, Azure 60 days plus emergency, OpenAI 6 months GA, Anthropic usage export | verified | three vendor pages | Azure: "emergency retirement with shortened notice" | none |
| Section 4 row AR3-36 | 74 studies, RR 1.26, 6% to 11% | verified | https://pmc.ncbi.nlm.nih.gov/articles/PMC3240751/ | "ranged from 6% to 11% of cases" | none |
| Section 4 row AR3-35 | 27 radiologists, figures | verified | https://www.rsna.org/media/press/i/2432 | "their accuracy fell to less than 20%" | none |
| Section 4 row AR3-37 | g -0.23, decision tasks g -0.27, g 0.46 when human better, g -0.54 when AI better, 2020 to mid-2023 | verified | https://pmc.ncbi.nlm.nih.gov/articles/PMC11659167/ | "decision tasks ... g = -0.27" and "synergy of g = 0.46" | none |
| Section 4 row AR3-39 | 1,339 teachers, 22% larger, lenient errors not significant | verified | https://academic.oup.com/pnasnexus/article/5/6/pgag146/8703788 | lenient case "statistically indistinguishable" | none |
| Section 4 rows AR3-38, AR3-40 | Perry and Anthis findings | verified | arXiv 2211.03622 and 2604.04319 | "wrote significantly less secure code" | none |
| Section 4 row AR3-41 | "19 points less correct" | wrong | https://www.hbs.edu/faculty/Pages/item.aspx?num=64700 | "19% less likely to produce correct solutions" | Same fix as AR3-41 |
| Section 4 row AR3-42 | 2,784-person study | unverified | https://hdsr.mitpress.mit.edu/pub/nrcn4h7d/release/2 | HTTP 403 | none |
| P9 list items 1 to 4 | MP-3.4-004/005, Goddard mitigators, SB 574, Art 14(4)(b) and 14(5), FinOps time to value | verified | 600-1 PDF, PMC3240751, hklaw page, Art 14 page, finops.org | "providing supportive information rather than commands" and "8. Time to Achieve Business Value" | none |
| Sweep 2026-08-26 | Transcription models, shutdown 2027-02-26, six months | verified | https://developers.openai.com/api/docs/deprecations | "removal from the API on February 26, 2027" | none |
| Sweep 2026-09-11 | GPT-5.4-Cyber to 2026-10-01, 20 days, "below the stated 3 months for specialised variants" | wrong (framing) | https://developers.openai.com/api/docs/deprecations | "The gpt-5.4-cyber model is deprecated and will be removed from the API on October 1, 2026." Not labelled specialised or preview | Say: 20 days, below every stated minimum. The page gives no reason. The policy allows faster retirement for safety or compliance |
| Sweep 2026-09-30 | Sonnet 4.5 deprecated, retires 2026-11-30, 61 days | verified | https://platform.claude.com/docs/en/about-claude/model-deprecations | "On September 30, 2026, Anthropic notified developers using Claude Sonnet 4.5" | none |
| Sweep 2026-09-30 | SB 574 signed, effective 2027-01-01 | verified | hklaw page | "Effective January 1, 2027" | none |
| Sweep 2026-10-01 | GPT-5.3-Codex, GPT-5.1, GPT-5.4-Nano to 2027-04-01 (six months), TTS to 2027-01-06 (about three months) | verified | https://developers.openai.com/api/docs/deprecations | "with six months' notice" and TTS "with at least three months' notice" | Optional: TTS at 97 days is below the 6-month GA minimum unless OpenAI treats TTS as a specialised variant. The page does not say |
| Sweep 2026-10-14 | GPT-4o, 4o mini, 4.1, 4.1 mini snapshots to 2027-01-14, three months against six | verified | https://developers.openai.com/api/docs/deprecations | "removal from the API on January 14, 2027" (92 days). No reason given | none |
| Sweep 2026-10-16 | NIST, NSA, CISA key practices, five stages | verified | https://www.nist.gov/node/1922751 | "published ten key practices for managing potential incidents" | none |
| Sweep 2026-10-20 | Fact sheet confirms Art 50 from 2 Aug 2026 | verified | https://ai-act-service-desk.ec.europa.eu/en/resources | "These transparency rules apply from 2 August 2026." | none |
| Sweep 2026-10-21 | Anthropic API version removes temperature, top_p, top_k, 400 error | verified | https://platform.claude.com/docs/en/about-claude/model-deprecations | "Removed in API version 2026-10-21 Returns a 400 error" | none |
| Sweep 2026-10-22 | Transparency guidelines and signing webinar | verified | https://ai-act-service-desk.ec.europa.eu/en/resources | "Guidelines 22/10/2026 Guidelines on Transparency of AI-generated Content" | none |
| Line 196, nothing new | NIST still revising, IEC edition 1.0, M-26-04 adds LLM terms, FinOps 2026-02-17, Omnibus in force 2026-07-27 | verified | NIST, IEC, M-26-04, finops.org, Omnibus pages | "complements OMB Memorandum M-25-22" | none |
| Line 196, UK | No new central UK AI procurement guidance | unverified | gov.uk pages opened only | Newest items seen are the 2020 guidelines and the 2025 Playbook | none |
| Gaps 1, 2, 4 | ISO 403, EUR-Lex empty, NIST "periodic" with frequency set by the organisation | verified | iso.org, eur-lex, 100-1 PDF | GOVERN 1.5 "Ongoing monitoring and periodic review" | none |
| Gap 6 | "Two OpenAI notices in the window were shorter than its stated policy" | wrong (overstated) | https://developers.openai.com/api/docs/deprecations | Policy reads "Unless safety or compliance concerns require a faster timeline, we provide the following minimum notice periods" | Say: two notices (GPT-5.4-Cyber 20 days, GPT-4 series snapshots 92 days) were shorter than the standard minimums. The policy allows faster retirement for safety or compliance and the page gives no reason. TTS at 97 days may be a third |

## A4. Cost per block (ledger AR4-xx)

### Ledger rows

| id or location | claim (short) | status | where looked (URL) | quote or what the page says | fix needed |
|---|---|---|---|---|---|
| AR4-01 | Guardrails grounding $0.10, filters and denied topics $0.15, Automated Reasoning $0.17, word filters free | verified | https://aws.amazon.com/bedrock/pricing/ | "Contextual grounding checks $0.10 per 1,000 text units" and "Word filters Free" | none |
| AR4-02 | Text units combine source, query and response characters | verified | https://aws.amazon.com/bedrock/pricing/ | "combining all the characters in the source, query, and model response" | none |
| AR4-03 | Content Safety Standard text records $0.375 per 1K, free $0, eastus, start 2024-06-01 | verified | https://prices.azure.com/api/retail/prices (Content Safety, eastus) | Standard Text Records 0.375 per 1K, effectiveStartDate 2024-06-01. Free Text Records 0.0 | none |
| AR4-04 | Free tier 5,000 records a month, record up to 1,000 characters, covers groundedness and Prompt Shields | verified | https://azure.microsoft.com/en-us/pricing/details/cognitive-services/content-safety/ | "Free – Web ... 5,000 text records per month". "Customers cannot accrue overages on the free tier." | Note that Free is a separate tier with a hard stop, not an allowance on Standard (feeds the section 2 fix below) |
| AR4-05 | Gemini 3 grounding 5,000 free a month then $14 per 1,000. Gemini 2.5 $35 per 1,000 after 1,500 a day. 2.5 Flash $0.30 in, $2.50 out. Updated 2026-10-22 | verified | https://ai.google.dev/gemini-api/docs/pricing | "5,000 free search requests per month (shared across all Gemini 3 and newer models)" and "Last updated 2026-10-22 UTC" | none |
| AR4-06 | Vertex Check Grounding and grounding prices (rung 7) | unverified | https://cloud.google.com/generative-ai-app-builder/pricing and https://cloud.google.com/vertex-ai/generative-ai/pricing | Page opened on 2026-10-26: "Check grounding $0.00075 / 1,000 count". Not in any sum | Optional: move to rung 2 and define the unit |
| AR4-07 | Langfuse Hobby $0, Core $29, Pro $199, Enterprise $2,499, $8 per 100k then tiers, self-host free | verified | https://langfuse.com/pricing | "1-10M units $7/100k ... 10-50M units $6.5/100k ... 50M+ units $6/100k" | none |
| AR4-08 | Helicone Hobby free, Pro $79, Team $799 | verified | https://www.helicone.ai/pricing | "10,000 free requests ... $79 per month ... $799 per month" | none |
| AR4-09 | Jira plan prices (rung 7) | unverified | https://www.atlassian.com/software/jira/pricing | Page text came back empty in curl, WebFetch and browser | none |
| AR4-10 | E2B Hobby $0, Pro $150, Enterprise $3,000 minimum, per-second rates | verified | https://e2b.dev/pricing | "Enterprise requires $3,000/mo minimum." | none |
| AR4-11 | AgentCore Identity $0.010 per 1,000, Gateway $0.005 per 1,000, Policy $0.000025, Runtime $0.0895 per vCPU-hour | verified | https://aws.amazon.com/bedrock/agentcore/pricing/ | "$0.010 per 1,000 token or API keys requested by the agent" | none |
| AR4-12 | Copilot Business add-on up to 300 users, E7 includes Copilot and Agent 365, ms.date 2026-10-19 | verified | https://learn.microsoft.com/en-us/copilot/microsoft-365/microsoft-365-copilot-licensing and .../compare-copilot-e3-e5-e7 | "supports up to 300 licensed users per tenant". E7 "adds ... Microsoft Agent 365" | none |
| AR4-13 | Claude Team Standard $20 annual, $25 monthly, 2 to 150 seats, Premium $100, Enterprise US$20 a seat, 20 seat minimum, plus usage | verified | https://claude.com/pricing | "US$20/seat/month, billed annually, 20 seat minimum." and "For teams of 2 to 150" | none |
| AR4-14 | Copilot "for business" $23.50, "for enterprise" $30.00, user a month paid yearly | wrong (meaning) | https://www.microsoft.com/copilot | The $23.50 card is a bundle: "Get Copilot with Work IQ, productivity apps, identity management". The Copilot Business add-on page lists $21.00, promo from $18.00 | Relabel $23.50 as Microsoft 365 Business Standard with Copilot. Add-on is $21.00 (promo $18.00). $30.00 enterprise add-on verified |
| AR4-15 | Workspace Starter $7, Standard $14, Plus $22 from Feb 8, 2027, promo, 300-user cap, Enterprise "Let's talk" | wrong (missing qualifier) | https://workspace.google.com/pricing | Prices shown with the toggle "Annual (Save 16% with 1 year commitment)". "maximum of 300 users" verified | Add "with a 1-year commitment" to $7, $14 and $22. Footnote conflict note stands |
| AR4-16 | ChatGPT Business and Enterprise prices (rung 7) | unverified | https://chatgpt.com/pricing/?type=team (browser, curl 403 on all four ledger URLs) | Opened on 2026-10-26: "$20/month if billed annually", "For teams of 2–200 employees", Enterprise "Contact our sales team" | Optional: add as rung 2. The 2 to 200 cap does not fit a 1,000-staff firm |
| AR4-17 | Portkey Open Source, Developer free 10k logs, Production $49 plus $9 per extra 100k up to 3M, Enterprise custom | verified | https://portkey.ai/pricing | "$9/Month for Every 100K Up to 3M Requests" | none |
| AR4-18 | Cloudflare AI Gateway core free, legacy log limits, Unified Billing 5%, updated Oct 15, 2026 | verified | https://developers.cloudflare.com/ai-gateway/reference/pricing/ | "Workers Paid 10,000,000 logs per gateway" and "A 5% fee is applied" | Optional: legacy limits apply to gateways created before Sep 24, 2026 |
| AR4-19 | Kong Plus from $25, AI gateway $25 per control plane, 1M included, $200 per extra 1M, model proxy $100 per LLM, 5 included | wrong (model part) | https://konghq.com/pricing | "AI Gateway model proxy limit ... 5" and "AI Gateway model proxy costs ... $100/month per model" | 5 is a cap on Plus, not an allowance. Every model costs $100 a month |
| AR4-20 | APIM Consumption first 1M included, Basic v2 10M, Standard v2 50M included | verified | https://azure.microsoft.com/en-us/pricing/details/api-management/ | "1 million API operations per subscription - Included" | none |
| AR4-21 | APIM Consumption $0.035 per 10K, Basic v2 $0.20548 an hour, Standard v2 $0.9589, Premium v2 $3.83562 | verified | https://prices.azure.com/api/retail/prices (API Management, eastus) | All four retail unit prices match | none |
| AR4-22 | Lawyers $76.76 an hour, $159,670, May 2025, modified Aug 27, 2026 | verified | https://www.bls.gov/ooh/legal/lawyers.htm (WebFetch, curl 403) | "$159,670 per year ... $76.76 per hour". "Last modified date: August 27, 2026" | none |
| AR4-23 | Vantage Starter free to $2,500, Pro $30 to $7,500, Business $200 to $20,000 | verified | https://www.vantage.sh/pricing | "$200 /month ... $20,000 of cloud spend" | none |
| AR4-24 | OpenCost "Forever free and open source" | verified | https://www.opencost.io/ | "Forever free and open source" | none |
| AR4-25 | Financial analysts $49.79, $103,570, May 2025 | verified | https://www.bls.gov/ooh/business-and-financial/financial-analysts.htm (WebFetch) | "$103,570 per year ... $49.79 per hour" | none |
| AR4-26 | Compliance officers $38.81, $80,730, May 2025 | verified | https://www.bls.gov/ooh/business-and-financial/compliance-officers.htm (WebFetch) | "$80,730 per year ... $38.81 per hour" | none |
| AR4-27 | promptfoo Community "Free Forever", Enterprise and On-Premise custom | verified | https://www.promptfoo.dev/pricing/ | "Community Free Forever Our open-source tool" | none |
| AR4-28 | Braintrust Starter $0, Pro $249, score and data overage | verified | https://www.braintrust.dev/pricing | "$249 / month ... 50k scores + $1.50/1k 30-day retention" | none |
| AR4-29 | LangSmith Developer $0 per seat 5k traces, Plus $39 per seat 10k traces | verified | https://www.langchain.com/pricing | "$39 / seat per month ... Up to 10k base traces / mo" | none |
| AR4-30 | Haiku 5.5 $0.10 and $0.50, batch $0.05 and $0.25. Sonnet 5.5 $2 and $10, batch $1 and $5 | verified | https://platform.claude.com/docs/en/about-claude/pricing | "Claude Haiku 5.5 ... $0.10 / MTok for prompts up to 100,000 tokens $0.50 / MTok". Batch table "$1 / MTok $5 / MTok" for Sonnet 5.5 | none |
| AR4-31 | BLS OEWS pages gave no wage figures (rung 7) | unverified | https://www.bls.gov/oes/current/oes231011.htm | curl HTTP 403. WebFetch returned an index with no lawyer wage | none |

### Section 1 price lines (not already covered above)

| id or location | claim (short) | status | where looked (URL) | quote or what the page says | fix needed |
|---|---|---|---|---|---|
| P1 Bedrock three lines | $0.10, $0.15, $0.17 per 1,000 text units | verified | https://aws.amazon.com/bedrock/pricing/ | "$0.17 per 1,000 text units per Automated Reasoning policy" | none |
| P1 Azure Content Safety line | $0.375 per 1,000 records, free tier 5,000 a month | verified (price), see section 2 | prices.azure.com and content-safety page | as AR4-03 and AR4-04 | Say the 5,000 is a separate Free tier |
| P1 Gemini two lines | Gemini 3: 5,000 a month then $14. Gemini 2.5: 1,500 a day then $35 | verified | https://ai.google.dev/gemini-api/docs/pricing | "1,500 RPD (free), then $35 / 1,000 grounded prompts" | none |
| P3 Langfuse six lines | Hobby, Core, Pro, Enterprise, overage tiers, self-host quote | verified | https://langfuse.com/pricing | "Langfuse is open source and you can self-host it for free." | none |
| P3 Helicone line | Hobby 10,000, Pro $79, Team $799 | verified | https://www.helicone.ai/pricing | as AR4-08 | none |
| P4 E2B four lines | Hobby $100 credit, Pro $150, Enterprise $3,000, usage rates | verified | https://e2b.dev/pricing | "$100 one-time usage credit" and "$0.000014/s" | none |
| P4 AgentCore five lines | Identity, Gateway, Policy, Runtime, Observability at CloudWatch rates | verified | https://aws.amazon.com/bedrock/agentcore/pricing/ | "Authorization Request $0.000025 per request" | none |
| P4 Agent 365 line | Included in E7, E7 price not found | verified | Learn compare page | "adds Microsoft Copilot, the Microsoft Entra Suite, and Microsoft Agent 365" | none |
| P5 Claude three lines | Team Standard, Team Premium, Enterprise | verified | https://claude.com/pricing | "$100 Per seat / month if billed annually. $125 if billed monthly." | none |
| P5 Copilot for business line | $23.50 paid yearly, add-on up to 300 users | wrong | https://www.microsoft.com/copilot | Bundle card, see AR4-14 | Same fix as AR4-14 |
| P5 Copilot for enterprise line | $30.00 paid yearly, needs eligible plan | verified | https://www.microsoft.com/copilot | "$30.00 user/month, paid yearly" | none |
| P5 Workspace Business Standard line | $14.00 from Feb 8, 2027, promo $7, 300 cap | wrong (missing qualifier) | https://workspace.google.com/pricing | 1-year commitment toggle | Add "with a 1-year commitment" |
| P5 Workspace Business Plus line | $22.00, 300 cap | wrong (missing qualifier) | https://workspace.google.com/pricing | 1-year commitment toggle | Add "with a 1-year commitment" |
| P5 Workspace Enterprise line | "Let's talk" | verified | https://workspace.google.com/pricing | "Enterprise Let's talk" | none |
| P6 Portkey four lines | Open Source, Developer, Production, Enterprise | verified | https://portkey.ai/pricing | "Host it Yourself ... Requests per Month No Limit" | none |
| P6 Cloudflare line | Core free, legacy logs, 5% | verified | Cloudflare doc | as AR4-18 | none |
| P6 Kong line | Model proxy $100 per LLM, 5 included | wrong | https://konghq.com/pricing | 5 is a limit, $100 per model | Same fix as AR4-19 |
| P6 Azure APIM four lines | Consumption, Basic v2, Standard v2, Premium v2 | verified | Azure page and retail API | as AR4-20 and AR4-21 | none |
| P7, P8, P9 BLS lines | Lawyers, financial analysts, compliance officers medians | verified | bls.gov OOH pages | as AR4-22, 25, 26 | none |
| P8 Vantage, OpenCost, Langfuse cost tracking lines | tiers, quote, included in plans | verified | vantage.sh, opencost.io, langfuse.com | "Token and Cost Tracking" listed under each Langfuse plan | none |
| P10 tool lines | promptfoo, Braintrust Starter and Pro, LangSmith Developer and Plus | verified | promptfoo.dev, braintrust.dev, langchain.com | "10k scores + $2.50/1k 14-day retention" | none |
| P10 token lines | Haiku 5.5, Sonnet 5.5, Gemini 2.5 Flash | verified | Claude pricing doc and Gemini pricing page | "$0.30 (text / image / video)" for 2.5 Flash input | none |

### Section 2 example-firm arithmetic (recomputed line by line in Python)

| id or location | claim (short) | status | where looked (URL) | quote or what the page says | fix needed |
|---|---|---|---|---|---|
| Model spend | Haiku $400, Gemini Flash $1,700, Sonnet $8,000 a month | verified (arithmetic) | recomputed | 1,500 x 0.10 + 500 x 0.50 = 400. 1,500 x 0.30 + 500 x 2.50 = 1,700. 1,500 x 2 + 500 x 10 = 8,000 | none |
| P1 Bedrock low and high | $20 and $1,000 | verified (arithmetic) | recomputed | 200 x 0.10 = 20. 10,000 x 0.10 = 1,000 | none |
| P1 Azure low and high | $73.13 and $3,748.13 | wrong (input) | https://azure.microsoft.com/en-us/pricing/details/cognitive-services/content-safety/ | Arithmetic is right, but the 5,000 free records sit on a separate Free tier and cannot be deducted from Standard use | Low: 200 x $0.375 = $75.00. High: 10,000 x $0.375 = $3,750.00. Claim-check band becomes $20 to $3,750 |
| P1 Gemini low and high | $1,330 and $13,930 | verified (arithmetic) | recomputed | 95 x 14 = 1,330. 995 x 14 = 13,930 | none |
| P3 mid and high | $271 and $411 | verified (arithmetic) | recomputed | 199 + 72 = 271. 199 + 72 + 140 = 411 (900k at $8, 2M at $7) | none |
| P4 low and high | $179.30, $441.46, totals $180.50 and $453.46 | verified (arithmetic) | recomputed | 158,400 s x rates = $2.93 per agent. 633,600 s gives $29.15 per agent. 291.456 rounds to 291.46 | Optional: AgentCore page says Identity has no extra charge through Gateway. If identity calls go through Gateway, totals are $180.20 and $450.46 |
| P5 band | $4,000 to $6,000 | verified (arithmetic) | recomputed | 200 x 20 = 4,000. 200 x 30 = 6,000 | none |
| P6 Kong line | $25 a month with up to 5 models included | wrong (input) | https://konghq.com/pricing | "$100/month per model" | $25 + $100 per pinned model. One model $125 a month, five models $525. P6 band $0 to $700 unchanged |
| P6 other lines | Portkey $130, Basic v2 $150.00, Standard v2 $700.00 | verified (arithmetic) | recomputed | 49 + 81 = 130. 0.20548 x 730 = 150.00. 0.9589 x 730 = 699.997 | none |
| P7 | $3,070.40 ($255.87 a month) and $18,422.40 ($1,535.20 a month) | verified (arithmetic) | recomputed | 2 x 20 x 76.76 = 3,070.40. 4 x 60 x 76.76 = 18,422.40 | none |
| P8 | $199.16 and $996.64 | verified (arithmetic) | recomputed | 4 x 49.79 = 199.16. 200 + 16 x 49.79 = 996.64 | Optional: the high line prints "= $796.64" before the total, which reads oddly |
| P9 | $1,940.50 and $9,702.50 | verified (arithmetic) | recomputed | 50 x 38.81 = 1,940.50. 250 x 38.81 = 9,702.50 | none |
| P10 | $0.90 and $1,344 | verified (arithmetic) | recomputed | 8 x 0.05 + 2 x 0.25 = 0.90. 480 + 600 + 249 + 15 = 1,344 | none |
| Section 3 sum | $6,597 to $35,073 a month, $79,163 to $420,874 a year | verified (arithmetic) | recomputed | 6,596.93 and 35,072.80. x 12 = 79,163.16 and 420,873.60 | Unchanged by the Azure and Kong fixes, since neither sets a band end |
| Section 3 people time | $2,396 to $12,034 a month | verified (arithmetic) | recomputed | 255.87 + 199.16 + 1,940.50 = 2,395.53. 1,535.20 + 796.64 + 9,702.50 = 12,034.34 | none |

## A5. Closers (ledgers V9R-, SF-185 to SF-194, LK-45 to LK-57)

### Ledger rows

| id or location | claim (short) | status | where looked (URL) | quote or what the page says | fix needed |
|---|---|---|---|---|---|
| V9R-01 | Full Fact page undated, sitemap lastmod 2026-10-16 | verified | https://fullfact.org/ai-benchmark/report-one/ and https://fullfact.org/sitemap.xml | sitemap "report-one/ ... lastmod 2026-10-16". No date metadata in the page | none |
| V9R-02 | First Wayback capture 2026-10-15 07:07 UTC, same report | verified | https://web.archive.org/cdx/search/cdx?url=fullfact.org/ai-benchmark/report-one/ and the id_ capture | CDX "20261015070716 ... 200". Capture: "Date range for collecting responses 15 July-22 Sept." | none |
| V9R-03 | Resultsense "via The Independent", 2026-10-15 09:07 UTC | verified | https://www.resultsense.com/news/2026-10-15-full-fact-chatbot-accuracy-ten-week-study/ | "article:published_time=2026-10-15T09:07:30.000Z" and "Resultsense via The Independent" | none |
| V9R-04 | OpenAI export page: update stamp 2026-10-26 04:31 UTC, exclusion text | unverified (stamp), content verified | https://help.openai.com/en/articles/7260999-exporting-your-chatgpt-history-and-data (browser, curl 403) | Later read showed updatedAt for 2026-10-26 04:56 UTC. "Not available for ChatGPT Business, Enterprise, or ChatGPT for Healthcare workspaces." | Write "updated 2026-10-26 (04:31 UTC at A5 read, edited again 04:56 UTC)" |
| V9R-05 | Wayback 2026-10-08: stamp 2026-08-25, exclusion and merge warning present | verified | https://web.archive.org/web/20261008081201id_/https://help.openai.com/en/articles/7260999-exporting-your-chatgpt-history-and-data | updatedAt 1787662301. "If you plan to move or merge a personal workspace" | none |
| V9R-06 | Wayback 2026-09-12 old slug: same stamp, exclusion, "Updated: 18 days ago" | verified | https://web.archive.org/web/20260912061616id_/https://help.openai.com/en/articles/7260999-how-do-i-export-my-chatgpt-history-and-data | "Updated: 18 days ago" | none |
| V9R-07 | Netskope AI Report: stall around March 2026, 56/14/30, 44 to 69, 12 to 31, June 2025 to July 2026 | verified | https://www.netskope.com/resources/threat-labs-reports/netskope-ai-report-2026 | "That trend stopped around March 2026, plateaued" and "69 per week, up from 44" | none |
| V9R-08 | Cloud and Threat Report: 78% to 47%, 25% to 62%, 223 two ways, 2026-01-06 | verified | https://www.netskope.com/resources/cloud-and-threat-reports/cloud-and-threat-report-2026 | "fell from 78% to 47%" and "223 incidents per month" | none |
| V9R-09 | Infosecurity: 47%, 2026-01-07 | verified | https://www.infosecurity-magazine.com/news/personal-llm-accounts-drive-shadow/ | "nearly half (47%) of people using generative AI tools" | none |
| V9R-10 | Gartner keynote: Q2 2026 survey of over 2,000 CIOs, 71%, 21%, 2026-10-19 | verified | https://www.gartner.com/en/newsroom/press-releases/2026-10-19-gartner-it-symposium-xpo-keynote-release-2026 (browser, curl 403) | "a Q2 2026 Gartner survey of over 2,000 CIOs and technology executives" | none |
| V9R-11 | "Many firms give staff no approved tool" | unverified | no source exists | nothing to open | Find a source or rewrite |
| SF-185 | Agent Platform lifecycle: "GA Gemini models" at least 12 months, never earlier, short-term at least 45 days, Gemini 2.5 retire 2026-10-20, gemini-3.6-flash 2026-07-21 to 2026-11-19 (121 days) | wrong (qualifier) | https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/model-versions | "Models available for at least 12 months after release". The page never says GA, and a GA model sits in the short-term table | Drop "GA". All dates verified. 121 days recomputed |
| SF-186 | Release note 2026-04-02 set 2026-10-16. Vertex docs "no longer being updated" | verified | https://cloud.google.com/vertex-ai/generative-ai/docs/release-notes | "have been updated to October 16, 2026" and "Vertex AI documentation is no longer being updated" | none |
| SF-187 | 2026-09-14 Flash Image moved to 2027-03-15 from 2026-10-02. No policy change in window | verified | https://docs.cloud.google.com/gemini-enterprise-agent-platform/release-notes | "scheduled for retirement on March 15, 2027 (extended from October 2, 2026)" | none |
| SF-188 | Bedrock lifecycle from 2026-09-07, Legacy 6 months or 45 days, 15 days inactivity, no new PT, GPT-6.1 Sol on OpenAI terms, dates may differ | verified | https://docs.aws.amazon.com/bedrock/latest/userguide/model-lifecycle.html | "There are two Legacy periods: 6 months and 45 days." | none |
| SF-189 | Model Equality Testing: 77.4% median power, about 10 samples, 11 of 31 endpoints, ICLR 2025, Stanford | verified | https://arxiv.org/abs/2410.20247 | "a median of 77.4% power against a range of distortions" | none |
| SF-190 | Log probability tracking: one token, one fine-tuning step, about 1,000x cheaper, ICLR 2026 | verified | https://arxiv.org/abs/2512.03816 | "detect changes as small as one step of fine-tuning" | none |
| SF-191 | Stability Monitor, energy distance, permutation tests, 4-page demo | verified | https://arxiv.org/abs/2603.19022 | "4 pages, 1 figure, submitted to CAIS 2026 System Demonstrations" | none |
| SF-192 | Model substitution audit, Berkeley, software-only unreliable, TEEs | verified | https://arxiv.org/abs/2504.04715 | "software-only methods are fundamentally unreliable" | none |
| SF-193 | OpenAI Services Agreement 2.3, updated 2025-12-01 | verified | https://openai.com/policies/services-agreement/ (browser, curl 403) | "OpenAI may update the Services periodically." and "Updated: December 1, 2025" | none |
| SF-194 | Anthropic Commercial Terms: 30 days convenience termination, no model notice clause, effective 2025-06-17 | verified | https://www.anthropic.com/legal/commercial-terms | "Effective Jun 17, 2025". No match for deprecat or discontinu | none |
| LK-45 | InterWiz: 3-month timeline, $0.25 to $0.025, 850 to 450 ms, $27,000 a year, 2026-07-02 | verified | https://aws.amazon.com/blogs/apn/how-interwiz-reduced-ai-costs-by-90-with-amazon-bedrock/ | "The migration followed a structured 3-month timeline." | none |
| LK-46 | Gartner SaaS lock-in note, 2026-03-14 | verified | https://www.gartner.com/en/documents/7594333 (browser) | "Published: 14 March 2026" | none |
| LK-47 | 35 KB prompt, Claude Opus to Ollama, 140 HN points, no time or cost figure | verified | Wayback 20260914173607 copy and https://hacker-news.firebaseio.com/v0/item/49697014.json | HN "score":140, title "migrating 35kb preprompts from Opus to self-hosted Ollama" | Optional: "Opus" appears in the HN title, the post says "Anthropic/OpenAI" |
| LK-48 | BoE letter: fourth survey in 2026, concentration from third-party model providers, PDF 2026-04-22 | verified | https://www.bankofengland.co.uk/-/media/boe/files/letter/2026/response-to-tsc-inquiry-report-on-ai-in-financial-services.pdf | "This year we will run the fourth edition" | none |
| LK-49 | Burges Salmon: open until 31 July 2026, results by end of year | verified | https://www.burges-salmon.com/articles/102ndoq/keeping-an-eye-on-ai-in-financial-services-the-ai-survey | "available for completion until the end of next week, 31 July 2026" | none |
| LK-50 | 2024 survey: 73%, 44%, 33%, a third third-party, 17% in 2022 | verified | https://www.bankofengland.co.uk/report/2024/artificial-intelligence-in-uk-financial-services-2024 | "A third of all AI use cases are third-party implementations." | none |
| LK-51 | ECB Machado 2026-02-24: over 85%, lock-in, exit strategies | verified | https://www.bankingsupervision.europa.eu/press/speeches/date/2026/html/ssm.sp260224~6c5b64a77a.en.html | "more than 85% of them already use AI in some form" | none |
| LK-52 | Dataiku: 600 CIOs, 55%, 81%, 93%, 2026-04-16 | verified | https://www.dataiku.com/blog/ai-switching-problem | "Fifty-five percent of CIOs say they have already switched LLMs at least once" | none |
| LK-53 | Gartner shortfall note, Domenico Scriva, 2026-02-21 | verified | https://www.gartner.com/en/documents/7486489 (browser) | "Published: 21 February 2026" and "Analysts: Domenico Scriva" | none |
| LK-54 | Omdia via Intelligent CIO: close to US$470bn, nearly US$30bn new in Q2 2025 | verified | https://www.intelligentcio.com/latam/2025/10/07/omdia-forecasts-us163bn-hyperscaler-cloud-marketplace-sales-by-2030/ | "nearly US$30 billion of new commitments added in Q2 2025 alone" | none |
| LK-55 | Omdia for Red Hat: over US$500bn, struggle to hit, 44% | verified | https://www.redhat.com/rhdc/managed-files/cl-omdia-hyperscalers-procurement-platform-analyst-material-3613126-202602-en.pdf | "many organizations can struggle to hit those commitments" | none |
| LK-56 | State of FinOps 2026: 1,192, $83bn+, 98% | verified | https://data.finops.org/ | "1,192 respondents Representing $83bn+ in annual cloud spend" | none |
| LK-57 | Flexera 2026: 753, winter 2025, 29% | verified | https://info.flexera.com/CM-REPORT-State-of-the-Cloud | "After five years of decline, wasted cloud spend increased slightly to 29%" | none |

### Body claims not in a ledger row

| id or location | claim (short) | status | where looked (URL) | quote or what the page says | fix needed |
|---|---|---|---|---|---|
| 1.3 Full Fact | Capture names the 15 July start and 7,625 answers | verified | Wayback 20261015070716 and live page | "AI chatbot responses collected 7,625" | none |
| 1.3 OpenAI | Direct URL redirects to the new slug, curl got 403 | verified | help.openai.com | old slug lands on the new slug. HTTP 403 to curl | none |
| 1.3 OpenAI | "Updated: 17 minutes ago" at 04:49 UTC | unverified | help.openai.com (browser) | Page edited again since. Cannot be reproduced | Keep as A5's own observation |
| 1.3 OpenAI | 1792989104 = 2026-10-26 04:31 UTC and 1787662301 = 2026-08-25 12:51 UTC | verified (arithmetic) | Python | 04:31:44 and 12:51:41 UTC | none |
| 1.3 OpenAI | "Wayback holds two readable copies" | wrong | Wayback CDX for both slugs | New slug has HTTP 200 captures on 2026-06-22, 2026-07-25, 2026-08-31 and 2026-10-08. Old slug has more | Say "several readable copies" and list them |
| 1.3 OpenAI | A 2026-10-21 capture returned 403 | verified | Wayback CDX | "20261021210933 ... 403" | none |
| 1.3 OpenAI | Content was live by 2026-08-25 at the latest | verified (understated) | Wayback 2026-08-31 capture | three-workspace wording present | Optional |
| 1.3 OpenAI | "Does not tell you ... when the exclusion first appeared before August" | wrong | Wayback 2026-06-22 and 2026-07-25 captures | "Not available for ChatGPT Business or Enterprise workspaces", stamp 2026-06-18 | Say Business and Enterprise exclusion on the page since at least 2026-06-18. Healthcare and merge warning added 2026-08-25 |
| 1.3 Netskope | 223 framed two ways, "50% of organizations lack enforceable data protection policies" | verified | Cloud and Threat Report page | "fully 50% of organizations lack enforceable data protection policies for genAI apps" | none |
| 1.3 Gartner | Q3 2026 survey of 303, 25% align technology and business risk, release 19 Oct | verified | Gartner release | "only 25% of CIOs align technology and business risk" | none |
| 2.2 Maturity | Vertex keeps "GA Gemini models at least 12 months" and only moves dates later | wrong (qualifier) | model-versions page | "they won't be moved to an earlier date than what is listed" | Say models in the 12-month table. Short-term models, GA ones included, get 45 days |
| 2.2 Vertex short-term 45 days | at least 45 days | verified | model-versions page | "gives you at least 45 days to migrate" | none |
| 2.2 Bedrock Legacy and 15 days | 6 months or 45 days, 15 days inactivity | verified | Bedrock lifecycle page | "may lose access after 15 days of inactivity" | none |
| 2.2 Evidence | 77.4%, 10 samples, 11 of 31, ICLR venues, one demo system | verified | arXiv 2410.20247, 2512.03816, 2603.19022 | "11 out of 31 endpoints serve different distributions" | none |
| 2.2 Evidence | "as small as one step of fine-tuning", 1,000x cheaper, one output token | verified | arXiv 2512.03816 | "more sensitive than existing methods while being 1,000x cheaper" | none |
| 2.2 Counter-evidence | Berkeley, "fundamentally unreliable", nondeterminism, TEEs. SF-190 came later and handles nondeterminism | verified | arXiv 2504.04715 and 2512.03816 | "defeated by inherent inference nondeterminism in production environments" | none |
| 2.2 What it does not fix | OpenAI's 92-day GPT-4 notice (SF-96) | verified | https://developers.openai.com/api/docs/deprecations | "On October 14, 2026, we notified developers" of removal "on January 14, 2027" | none |
| 2.2 What it does not fix | GPT-6.1 Sol on Bedrock follows OpenAI terms, dates "may differ" | verified | Bedrock lifecycle page | "GPT-6.1 Sol follows the OpenAI first-party model's lifecycle" | none |
| 2.2 New in window | Gemini 2.5 to 2026-10-20 from 2026-10-16, a 4-day extension | verified | model-versions page and Vertex release notes | "gemini-2.5-pro June 17, 2025 October 20, 2026" | none |
| 2.2 New in window | No policy change 2026-09-25 to 2026-10-21. 2026-09-14 Flash Image change. Vertex banner. Bedrock policy from 2026-09-07 | verified | Agent Platform release notes, Vertex release notes, Bedrock page | "models launched on Amazon Bedrock on or after September 7, 2026" | Optional: a 2026-10-21 open-model endpoint retirement falls in the window but is not a policy change |
| 2.2 Maturity, contract | OpenAI standard terms give a right to leave, not a minimum notice | verified | Services Agreement | "Customer may choose to terminate the Agreement by providing thirty days written notice" | none |
| 3.1 InterWiz body | GPT-4 Turbo on Azure OpenAI, prompts rewritten, CEO "a complex undertaking", 90% | verified | AWS blog | "Migrating our AI stack from Azure OpenAI to Amazon Bedrock was a complex undertaking" | none |
| 3.1 to 3.3 bodies | Gartner abstracts, developer post, BoE, Burges Salmon, ECB, Dataiku, Omdia, Red Hat, FinOps, Flexera figures | verified | as the LK rows | "with cost reduction as the primary driver" (Dataiku) | none |

## A6. Fix proof (ledger AR6-xx)

### Ledger rows

| id or location | claim (short) | status | where looked (URL) | quote or what the page says | fix needed |
|---|---|---|---|---|---|
| AR6-01 | 130 neurology questions, 3,640 answers, Sonar 60 to 78, Sonar-Pro 80 to 88, Sonar-Reasoning-Pro 81 to 89, "8 to 18 percentage-point gain". Flag: "Author affiliations not in the record" | wrong (flag only) | https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=DOI:10.2196/79379&format=json&resultType=core | Numbers match. Record lists "Department of Neurology, Medical Faculty and University Hospital Düsseldorf" | Replace the flag: authors at Heinrich Heine University Düsseldorf neurology, independent of Perplexity. Lab, peer reviewed, rung 1 correct |
| AR6-02 | Progent: AgentDojo 39.9% to 1.0%, ASB 70.3% to 3.9%, utility comparable, adaptive attacks "only marginally". Authors built the tool | verified | https://arxiv.org/abs/2504.11703 and https://arxiv.org/html/2504.11703v3 | "the adaptive attacks can only marginally increase the ASR" | Optional: "comparable" also appears in the text, drop "(figures only)". Lab benchmarks, preprint |
| AR6-03 | 20 doctors, 18 drafts, 4 errors, "13-15 participants", 35% to 45% sent unedited, 75% safe. Catch rate 25% to 35% | verified | https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=DOI:10.1038/s41746-025-01586-2&format=json&resultType=core | "Each error was insufficiently addressed by 13-15 participants" | none. Lab simulation, peer reviewed. Authors did not build the AI. 5 to 7 of 20 is 25% to 35% |
| AR6-04 | 27 radiologists, 79.7 to 19.8, 81.3 to 24.8, 82.3 to 45.5 | verified | https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=DOI:10.1148/radiol.222176&format=json&resultType=core | "27 radiologists read 50 mammograms" with a "purported AI system" | none. Lab, peer reviewed |
| AR6-05 | 44 doctors, 84.9% against 73.3%, adjusted gap 14.0 points, Pakistan, preprint | verified | https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=DOI:10.1101/2025.08.23.25334280&format=json&resultType=core | "adjusted mean difference of -14.0 percentage points" | none. 14.0 is adjusted, raw gap is 11.6. Lab vignettes |
| AR6-06 | NEJM AI version of AR6-05, 2026-04-23 (rung 7) | unverified (page), exists per Crossref | https://ai.nejm.org/doi/full/10.1056/AIoa2501001 (HTTP 403) and api.crossref.org/works/10.1056/AIoa2501001 | Crossref lists NEJM AI, published 2026-04-23, same authors | Keep out of rung 1 figures until the article is opened |
| AR6-07 | 400 reviewers, 11,429 reviews, seven months, approval 30.1% to 36.8%, inline comments down 22%, latency about 3.5x, KDD 2026 workshop | verified | https://arxiv.org/abs/2606.22721 | "approval rate from 30.1% to 36.8%" | none. Field records, preprint |
| AR6-08 | 199 people, cognitive forcing "significantly reduced overreliance" | verified | https://arxiv.org/abs/2102.09692 | "cognitive forcing significantly reduced overreliance" | none. ACM DOI 10.1145/3449287 is CSCW 2021, rung 1 holds. Lab |
| AR6-09 | 72 doctors, 432 cases, 3 of 6 seeded ChatGPT-5.1 errors, 82.8% against 75.6%, adjusted 7.6 points, CI 1.4 to 13.9 | verified | https://www.medrxiv.org/content/10.64898/2026.06.01.26354596v1.full | "mean difference, 7.6 percentage-points" with CI 1.4 to 13.9 | Optional: authors designed the nudge. Lab vignettes, preprint |
| AR6-10 | 404 people, preregistered, FAccT 2024 | verified | https://arxiv.org/abs/2405.00623 | "reduced (but not fully eliminated) overreliance" | none. Lab |
| AR6-11 | 577 people, 10/30/50%, CHI EA 2026, rung 1 | verified | https://arxiv.org/abs/2604.04319 | "Published in CHI EA 2026" | Rung differs from A3 (rung 3 there). Use one rung in both briefs |
| AR6-12 | OpenAI incident: 9:50:23, 10:02:11, 10:05:06, 12:34:30, "the run did not stop automatically as expected", 2026-09-25 | verified | https://alignment.openai.com/misalignment-reports/an-agent-used-dns-to-reach-an-external-chatbot/ | "the run did not stop automatically as expected" | none. 10:02:11 to 12:34:30 is 2 h 32 min, fits "2.5 hours" |
| AR6-13 | CSA note: roughly twelve minutes, 12:34 p.m., 2026-09-30 | verified | https://labs.cloudsecurityalliance.org/research/csa-research-note-openai-agent-sandbox-dns-bypass-20260930-c/ (WebFetch, curl 403) | "flagged the anomaly within roughly twelve minutes" | none |
| AR6-14 | ESEM 2026: 2,880 generations, 11.67%, 36 and 26 of 360, cut to 8 and 3, stress signals | verified | https://drops.dagstuhl.de/entities/document/10.4230/LIPIcs.ESEM.2026.51 | "should be interpreted as benchmark-specific stress signals" | Add flag: the authors built both oracles, the 36 of 360 comes from a deliberately permissive probe |
| AR6-15 | RETAIN: "twice as many errors", 75% more prompts, EMNLP 2024 demo, authors built the tool | verified | https://aclanthology.org/2024.emnlp-demo.31 | "enabled participants to identify twice as many errors" | none. Lab user study |
| AR6-16 | RCT, law students, Vincent AI "avoids introducing more hallucinations" against no AI | unverified (comparator) | https://repository.law.umich.edu/pub_law_archive/772 | "Vincent AI avoids introducing more hallucinations". Comparator not stated on the page | Drop "against no AI" unless the full paper confirms it |
| AR6-17 | Georgia Tech: 1,280 experiments, eight models, 16 scenarios, 73.8%, 77%, 2026-10-20, not tested in clinical settings | verified | https://www.cc.gatech.edu/news/georgia-tech-researchers-find-way-reduce-ai-chatbots-reinforcement-delusions | "reduced the models' confirmation of those beliefs by 73.8%" | none. Lab, simulated chats |
| AR6-18 | Reminders "reliably reduce divergence" | verified | https://arxiv.org/abs/2510.07777 | "simple reminder interventions reliably reduce divergence" | none |
| AR6-19 | ContinuityBench: 99.20% (CI 98.27 to 99.63), 750 failover events, stateless near 0%. Authors' own design | verified | https://arxiv.org/abs/2607.15899 | "our stateful proxy achieves a 99.20% CPR" | Flag is out of date: the HTML confirms a "deterministic fault injector" |
| AR6-20 | Retired-model migrations: 3,644 commits, 2 files, 8 lines, 72%. 115 commits, 4 files, 20 lines, 70%. Author quote. Single author | verified | https://arxiv.org/html/2609.31288v1 | "reduces the size of the fix without making it timely" | none. Field, observational |
| AR6-21 | CSA note: unauthorised use "drops by 89%", citing Unseen Security | verified | https://labs.cloudsecurityalliance.org/wp-content/uploads/2026/05/CSA_research_note_shadow_ai_apps_enterprise_20260530-csa-styled.pdf | "unauthorized use drops by 89%" | none |
| AR6-22 | ICML 2026 policy trial: over 24,000 papers, 17,000 reviewers, 22.5% reported LLM use, near-zero effect | verified | https://arxiv.org/abs/2609.19420 | "22.5% of conservative-policy reviewers reported using an LLM despite the prohibition" | none in the ledger. The 22.5% is from a post-survey (N=1,486) |
| AR6-23 | 820 IT and product projects, 4.5 years, 2019 | verified | https://www.iadisportal.org/digital-library/escalation-of-commitment-in-npd-and-cost-saving-it-projects | "820 new product development and cost saving IT projects over a time span of 4.5 years" | none |
| AR6-24 | Audit of 21 open models on four benchmarks | verified | https://arxiv.org/abs/2605.05427 | "21 open-weight LLMs on four safety benchmarks" | none |
| AR6-25 | Citation-support audit (rung 7) | verified (page now opens) | https://www.researchsquare.com/article/rs-10449790/latest | Support-defect rate 0.95% in the audit, then 5.66% and 6.12% on reruns. Preprint dated 2026-08-20 | Update the row: opened, single-author preprint. Can leave rung 7 |

### Section 1 and section 2 figures

| id or location | claim (short) | status | where looked (URL) | quote or what the page says | fix needed |
|---|---|---|---|---|---|
| S1 | Claim-support audit could not be opened | verified as worded, now outdated | Research Square | page opens now | Update to "opened, preprint" |
| S2 | Uncertainty cut over-reliance, 404 people, lab | verified | arXiv 2405.00623 | as AR6-10 | none |
| S4 | Two guideline domains, 60 to 78, 80 to 88, 81 to 89, lab, rung 1 | verified | Europe PMC record | retrieval restricted to two neurology guideline domains | none |
| F1 | Grounded legal tool "avoids introducing more hallucinations" against no AI | unverified (comparator) | Michigan repository | comparator not stated | Same fix as AR6-16 |
| F2 | 39.9% to 1.0%, 70.3% to 3.9%, authors built the tool | verified | arXiv html v3 | "reduces the attack success rate (ASR) from 39.9% to 1.0%" | none |
| F2 | "Sandbox escapes still happen" (AR6-12) | verified (loose) | OpenAI report | DNS filtering gap in a training sandbox | Optional: "sandbox network gaps" |
| F3 | 89% fall traces to an unopened vendor report | verified | CSA PDF | cites Unseen Security | none |
| F3 | "22.5% of reviewers banned from LLMs used one anyway" | wrong | https://arxiv.org/abs/2609.19420 | Self-report in a post-survey: "reported using an LLM despite the prohibition" (N=1,486) | Say "22.5% of surveyed reviewers under the no-LLM policy reported using one" |
| F4 | Progent per-tool allow policy | verified | arXiv html v3 | rules over tool names and arguments | none |
| F5 | Nearest independent work is IT project gates, not AI | verified | IADIS page | gatekeeper set-up at stage gates | none |
| F6 | Permissive oracle passed 36 of 360. Regression tool found twice as many errors | verified | Dagstuhl and ACL Anthology | "twice as many errors" | Add "authors built the probe" and "authors built the tool" |
| F8 | Release confirms 1,280 simulated chats, not tested on patients | verified | Georgia Tech release | "1,280 experiments involving simulated conversations" | none |
| F9 and H3 | Automatic stop failed, killed 2.5 hours after the alert | verified | OpenAI report | 2 h 32 min after the 10:02:11 alert | none |
| F10 | Reviewer scrutiny fell over seven months | verified | arXiv 2606.22721 | inline comments down 22% | none |
| F11 | Reminders reduce divergence, no numbers | verified | arXiv 2510.07777 | as AR6-18 | none |
| F12 | Stateless near 0%, proxy 99.20% over 750 events | verified | arXiv 2607.15899 | "near-0% preservation rate for standard stateless" | none |
| F13 | Audits measure over-refusal, test no fix | verified | arXiv 2605.05427 | conservative families over-refuse | none |
| F14 | 70% against 72%, more lines at the median, 115 commits | verified | arXiv html 2609.31288v1 | Table 4 values match | Optional: "Repos with" should be "Commits in code with" |
| H1 | Each seeded error missed or under-fixed by 13 to 15 of 20 doctors | verified | Europe PMC | "insufficiently addressed by 13-15 participants" | none |
| H1 | "Reader accuracy fell from about 80% to 19.8% to 45.5% when the AI was wrong" | verified (wording unclear) | Europe PMC | about 80% with correct AI, 19.8% to 45.5% with wrong AI, by experience | Optional rewording |
| H1a | "A confidence nudge raised accuracy 7.6 points, 82.8% against 75.6%" | wrong | https://www.medrxiv.org/content/10.64898/2026.06.01.26354596v1.full | 7.6 is the model estimate of diagnostic reasoning score. The raw means differ by 7.2 | Say "raised diagnostic reasoning scores by an adjusted 7.6 points (CI 1.4 to 13.9). Raw means 82.8% against 75.6%" |
| H1a | Cognitive forcing cut over-reliance | verified | arXiv 2102.09692 | as AR6-08 | none |
| Section 2 count | 13 of 24, up from 9 | verified (arithmetic) | section 1 table | Measured: S1, S3, S4, S5, S6, S8, S9, S10, F1, F2, F6, F8, F11 = 13 | none on the count itself |
| Section 2, F2 counted as Measured | F2 moved to Measured on AR6-02 | wrong (breaks the brief's own rule) | status rule in A6 and arXiv 2504.11703 | Rule needs "an independent rung 1 or rung 3 comparison". Progent's authors built it | List F2 as "Partly measured (authors' own tool)" and say 12 of 24, or change the rule and say so |
| Section 2 item 2 and Gap 2 | "checkers missed most seeded errors (AR6-03, AR6-04, AR6-05)" | wrong (AR6-05) | Europe PMC record for AR6-05 | AR6-05 gives an accuracy drop, not a miss rate | Cite AR6-03 and AR6-04 for "missed most". Say AR6-05 shows an adjusted 14-point accuracy drop |
| Section 2 items 3 and 4, field records list | AR6-12 the one primary record of a failed stop. AR6-07, 12, 20, 22 show problems or null results | verified | the four pages | as rows above | none |

## Summary

### Counts

| Brief | Verified | Unverified | Wrong | Rows |
|---|---|---|---|---|
| A3 business process | 75 | 9 | 10 | 94 |
| A4 cost per block | 55 | 4 | 9 | 68 |
| A5 closers | 50 | 3 | 4 | 57 |
| A6 fix proof | 43 | 3 | 5 | 51 |
| **Total** | **223** | **19** | **28** | **270** |

The 19 unverified items:
- **Still blocked or empty on retry:**
  - AR3-06 ISO
  - AR3-11 EUR-Lex
  - AR3-17 Commission GPAI page
  - AR3-32 OECD publication page
  - AR3-42 HDSR, in two rows
  - AR3-44 Data Act
  - AR4-09 Jira
  - AR4-31 BLS OEWS
  - AR6-06 NEJM AI. It exists per Crossref, but the article was not opened.
- **No source to open:**
  - the AR3-26 "September 2026 tracker"
  - V9R-11
  - the A3 "no new UK guidance" line
- **Changed since the brief was written:**
  - V9R-04 stamp
  - the "17 minutes ago" observation
- **Page silent on the comparator:**
  - AR6-16 and F1
- **Opened today with prices shown, but rung 7 in the brief and used in no sum:**
  - AR4-06 Vertex
  - AR4-16 ChatGPT

### Points the caller asked about

- **EU AI Act and the Digital Omnibus: verified.** Regulation (EU) 2026/1744 was adopted 8 July 2026 and entered into force 27 July 2026.
  - New Article 113(c) moves Chapter III Sections 1 to 3 to 2 December 2027 for Annex III systems and to 2 August 2028 for Annex I. Articles 26 and 27 sit in Section 3, and both article pages show "Comes into force 2 December 2027 (high-risk under Annex III)".
  - The Article 50(2) grace to 2 December 2026 is also verified.
  - Article 4 is still a duty on providers and deployers, softened from "ensure" to "support".
  - Only the EUR-Lex official text could not be opened.
- **OMB M-25-22: content verified, references wrong.** Every substantive term is in the memo. But the section letters are wrong: A to G sit under 4.d.iii. Two cells also overstate the memo:
  - the roll-back rule is "encouraged", not a must
  - the disclosure right is "internally" only
- **EU MCC-AI: verified.** Articles 15 to 17 cover data sets, handover and destruction. Article 20 sets an audit "once per calendar year or in relation to any Substantial Modification". The disclaimer and the 5 March 2025 update are also verified.
- **Meta-analysis: verified.**
  - g -0.23 is human plus AI against the best of either alone.
  - Decision tasks are g -0.27.
  - The subgroups are g 0.46 and g -0.54.
  - Human plus AI against the human alone is g 0.64.
  - 106 experiments, 370 effect sizes, studies from January 2020 to June 2023.
- **The two OpenAI notices.**
  - **GPT-5.4-Cyber:** 20 days.
  - **GPT-4o, 4o mini, 4.1 and 4.1 mini snapshots:** 92 days.
  - **The standard minimums:** both notices fall below them (6 months GA, 3 months specialised).
  - **The safety exception:** OpenAI's policy opens with "Unless safety or compliance concerns require a faster timeline". The page gives no reason either way.
  - **What follows:** "shorter than its stated policy" (Gap 6) overstates the case. "Shorter than the standard minimums, reason not given" is supported.
  - **Cyber framing:** the page does not call GPT-5.4-Cyber a specialised variant.
- **A4 list prices.** Most match. The exceptions are Copilot for business, Workspace (a 1-year commitment qualifier is missing) and Kong (model proxy).
- **A4 arithmetic.** Every sum is right as written. Two inputs are wrong (the Azure free tier and Kong models). Neither changes the section 3 band ends.
- **A6 settings and authorship.** All study settings are stated correctly as lab, simulation, benchmark or field. The brief flags self-built tools for AR6-02, AR6-15 and AR6-19 correctly. It misses two:
  - AR6-14: the authors built both oracles.
  - AR6-09: the authors designed the nudge.

### Every wrong item with the exact correction

**A3**
1. **AR3-15, and its repeats in the RACI P3 note, Stage 4 Security and the P3 mapping.** Change "2 days widespread infringement" to "2 days for a widespread infringement or a serious incident under Article 3(49)(b) (critical infrastructure disruption)".
2. **AR3-27 flag.** Change "Focus is political neutrality, not reliability" to "Focus is the Unbiased AI Principles, truth-seeking and ideological neutrality". The memo asks for "reliable outputs".
3. **AR3-41 ledger row.** The HBS page opened on 2026-10-26. Mark it opened (rung 2, working paper abstract). Change "19 points less correct" to "19% less likely to produce correct solutions".
4. **Section 4 row AR3-41.** Same correction as item 3.
5. **Stage 5 Team heads row.** MG-2.4-001 covers communication "as part of the deactivation or disengagement process". Use it only for a retirement or switch-off. Do not use it for every change.
6. **M-25-22 section numbers (lines 39, 41, 71, 83, 85, the P7 table and the standards table).**
   - Change 4.d.C, 4.d.E, 4.d.F and 4.d.G to 4.d.iii.C, 4.d.iii.E, 4.d.iii.F and 4.d.iii.G.
   - Change 4.f to 4.f.i.
   - Section 2.c, 4.e.iii and 4.e.iv are correct as written.
7. **P7 table, retirement row, M-25-22 cell.** Change "Vendor must meet performance before a new version or roll back (4.d.F)" to "Agencies are encouraged to require vendors to meet performance standards before a new version, or roll back (4.d.iii.F)".
8. **P7 table, audit row, M-25-22 cell.** Change it to "Contracts must not stop agencies internally disclosing how the vendor tests or the test results (4.d.iii.E)".
9. **Sweep row 2026-09-11.** Change the effect text to "20 days notice. Below every stated minimum. Not labelled specialised or preview. The page gives no reason. The policy allows faster retirement for safety or compliance concerns."
10. **Gap 6.** Change "Two OpenAI notices in the window were shorter than its stated policy" to "Two OpenAI notices (GPT-5.4-Cyber at 20 days, GPT-4 series snapshots at 92 days) were shorter than the standard minimums in its policy. The policy allows faster retirement for safety or compliance concerns, and the page gives no reason. TTS at 97 days may be a third if TTS is not a specialised variant."

**A4**

11. **AR4-14.** $23.50 is "Microsoft 365 Business Standard with Copilot", a bundle with the Office apps. The Copilot Business add-on is $21.00, now from $18.00, per user a month, paid yearly. $30.00 for the enterprise add-on is correct.
12. **P5 "Microsoft Copilot, for business" line.** Same correction as item 11. No effect on section 2, since that plan is not eligible there.
13. **AR4-15.** Add "with a 1-year commitment" to the Starter $7, Standard $14 and Plus $22 prices.
14. **P5 Workspace Business Standard line.** Change to "$14.00 per user a month with a 1-year commitment, from Feb 8, 2027". No effect on section 2.
15. **P5 Workspace Business Plus line.** Change to "$22.00 per user a month with a 1-year commitment". No effect on section 2.
16. **AR4-19.** Change "model proxy $100 per LLM with 5 included" to "model proxy $100 a month per model, limit 5 models on Plus".
17. **P6 Kong line in section 1.** Same correction as item 16.
18. **Section 2 P6 Kong line.** Change "$25 a month" to "$25 + $100 per pinned model". That is $125 a month for one model and $525 a month for five. The P6 band of $0 to $700 does not change.
19. **Section 2 P1 Azure Content Safety lines.** The 5,000 free records belong to a separate Free tier ("Customers cannot accrue overages on the free tier"). They cannot be deducted from Standard use.
    - Low: 200 x $0.375 = $75.00 a month, not $73.13.
    - High: 10,000 x $0.375 = $3,750.00 a month, not $3,748.13.
    - Band text: change "$20 to $3,748 for a claim check" to "$20 to $3,750".
    - The sum of $6,597 to $35,073 a month does not change.

**A5**

20. **SF-185.** Change "GA Gemini models available at least 12 months after release" to "Gemini models in the 12-month table available at least 12 months after release. Some GA models sit in the short-term table with at least 45 days' notice." All the dates in the row are correct, including 121 days.
21. **Section 2.2 Maturity, lifecycle bullet.** Change "keeps GA Gemini models at least 12 months" to "keeps the models in its 12-month table at least 12 months, while short-term models, GA ones included, get at least 45 days".
22. **Section 1.3 OpenAI paragraph.** Change "Wayback holds two readable copies" to "Wayback holds several readable copies. The new slug has HTTP 200 captures on 2026-06-22, 2026-07-25, 2026-08-31 and 2026-10-08, and the old slug has more."
23. **Section 1.3 OpenAI paragraph, "Does not tell you ... when the exclusion first appeared before August".** This can now be answered.
    - The Business and Enterprise exclusion is in the 2026-06-22 capture, with an update stamp of 2026-06-18.
    - The Healthcare exclusion and the merge warning were added on 2026-08-25.
    - Suggested LK-19 date: "Business and Enterprise exclusion since at least 2026-06-18, Healthcare and merge warning added 2026-08-25, page updated again 2026-10-26."

**A6**

24. **AR6-01 flag.** Change "Author affiliations not in the record" to "Authors at the Department of Neurology, University Hospital Düsseldorf. Independent of Perplexity."
25. **F3, AR6-22.** Change "22.5% of reviewers banned from LLMs used one anyway" to "22.5% of surveyed reviewers under the no-LLM policy reported using one (post-survey, N=1,486)".
26. **H1a, AR6-09.** Change "A confidence nudge raised accuracy 7.6 points, 82.8% against 75.6%" to "A confidence nudge raised diagnostic reasoning scores by an adjusted 7.6 points (CI 1.4 to 13.9). Raw means were 82.8% against 75.6%."
27. **Section 2, F2 counted as Measured.** The status rule requires an independent comparison, but Progent's authors built the tool. Either:
    - list F2 as "Partly measured (authors' own tool)" and change the headline to "12 of 24, up from 9", or
    - change the status rule to admit author-built tools on public benchmarks, and say so in section 2.
28. **Section 2 item 2 and Gap 2.** Change "checkers missed most seeded errors (AR6-03, AR6-04, AR6-05)" to "checkers missed most seeded errors (AR6-03, AR6-04), and seeded errors cut doctors' accuracy by an adjusted 14 points (AR6-05)".

### Not wrong, but worth fixing
- **AR3-29.** Add OpenAI's safety and compliance exception to the policy summary.
- **Sweep row 2026-10-01.** The TTS notice is 97 days with no "specialised" label on the page.
- **A4 P4.** AgentCore says Identity has no extra charge through Gateway. If identity calls go through Gateway, P4 is $180.20 to $450.46.
- **AR4-06 and AR4-16.** Both now open with prices. Vertex Check Grounding is $0.00075 per 1,000. ChatGPT Business is $20 a seat billed annually for 2 to 200 employees.
- **AR6-25.** It now opens. It is a single-author preprint dated 2026-08-20, with rates of 0.95% then 5.66% and 6.12%.
- **AR6-11.** It is rung 1 in A6 and rung 3 in A3. Use one rung in both.
- **AR6-14 and AR6-09.** Add "authors built the probe or nudge".
- **H1 status.** AR6-03 and AR6-04 measure how often checkers fail. They do not compare runs with and without a named checker, so "Partly measured" fits the brief's own rule better.
