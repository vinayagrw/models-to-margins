# R6. Do "Worse" verdicts mean more harm or more news?

Run date: 2026-10-25. Months: June, July, August, September and October 2026. October runs from 1 to 25 October only. Where October is compared with full months, it is scaled by 31/25 and marked "scaled".

Question: S1 marks six themes "Worse" because new dated events appeared between 2026-09-25 and 2026-10-25. This file tests whether harm events grew faster than the general flow of AI incidents and records, or only kept pace with it.

Harm event: a concrete dated occurrence. An incident, a CVE, a lawsuit or regulator action, a plan cut, or a measured study result. Commentary, opinion and forecasts are not counted.

## 1. Verdict table

Two readings per theme. "Five-month trend" compares June to August with September to October. "Last 30 days" compares 2026-09-25 to 2026-10-25 with 2026-08-26 to 2026-09-24, which is the step S1 called "Worse".

| # | Theme | Main harm series | Five-month trend | Last 30 days | Verdict |
|---|---|---|---|---|---|
| 2 | Agents act or report wrongly | AIID incidents where an agent acted out of scope or reported falsely | Events 3.3x, baseline 1.3x | Events 9 to 9, baseline 51 to 77 | Harm rising over five months. The last-30-day step is coverage, not harm |
| 4 | Agent tools as an attack path | NVD CVEs naming prompt injection or MCP | Events 1.70x, NVD total 1.58x | Events 168 to 150, NVD total 14,442 to 16,515 | More coverage, harm not shown |
| 7 | Usage caps nobody can predict | Dated plan and limit cuts on paid AI plans | 2.0 a month, then 2.0 a month | Not testable at this count | Too few events to tell |
| 8 | Tells people what they want to hear | AIID sycophancy or delusion-reinforcement incidents, plus state legal actions | 0 to 3 a month | 0 to 2 incidents, 0 to 1 coordinated state action | Too few events to tell |
| 9 | Controls lag behind rollout | Dated surveys measuring a governance gap | 0 to 2 a month | Not testable at this count | Too few events to tell |
| 10 | Review overload and workforce strain | US job cuts attributed to AI (Challenger) | AI-cited cuts fell 72% from June to September while all cuts fell 6% | October report not yet out | More coverage, harm not shown |

Short answer: only theme 2 shows harm growing faster than the baseline, and even there the extra growth came between June and September, not in the 30 days that S1 cited. For themes 4 and 10 the countable harm kept pace with, or fell behind, the baseline. Themes 7, 8 and 9 have too few dated events to tell either way.

## 2. Baselines

| Use | Measure | Why |
|---|---|---|
| Themes 2, 7, 8, 9, 10 | AI Incident Database (AIID) new incidents per month, dated by the first report's submission date | One curated count of AI harm intake, same editors every month, fully listed on public incident pages |
| Theme 4 | NVD total CVEs published per month | Same database and date field as the theme 4 events |
| Context only | GitHub reviewed advisories per month, arXiv "language model" papers per month, Challenger total job cuts per month | Denominators for the second series in themes 4, 8 and 10 |

AIID check: by submission month, May to July sums to 146 incidents. AIID's own roundup says 148 IDs were added in May to July (1471 to 1618). The dating method is close to AIID's own count.

AIID baseline, all incidents:

| Month | AIID new incidents | Note |
|---|---|---|
| June | 53 | |
| July | 55 | |
| August | 49 | |
| September | 53 | |
| October (1 to 25) | 67 (83 scaled) | Includes a backfill of older events, for example incident 1780 dated 2017 |
| 2026-08-26 to 2026-09-24 | 51 | |
| 2026-09-25 to 2026-10-25 | 77 | Baseline itself rose 51% in the window S1 used |

## 3. Tables per theme

### Theme 2. Agents act or report wrongly

Counted: AIID incidents where an AI agent took an unsanctioned action, reached a real system out of scope, destroyed data, or reported false success. Excluded: threat actors using agents as tools, hiring and layoff tools, hallucinated documents.

| Month | Events | Baseline (AIID total) | Events per 100 baseline | Source |
|---|---|---|---|---|
| June | 1 | 53 | 1.9 | T-01, T-02 |
| July | 2 | 55 | 3.6 | T-01, T-02 |
| August | 6 | 49 | 12.2 | T-01, T-02 |
| September | 11 | 53 | 20.8 | T-01, T-02 |
| October (1 to 25) | 7 (8.7 scaled) | 67 (83 scaled) | 10.4 | T-01, T-02 |

Incident IDs counted: June 1542. July 1604, 1613. August 1627, 1628, 1629, 1633, 1642, 1649. September 1668, 1671, 1672, 1673, 1675, 1676, 1685, 1700, 1707, 1719 and 1710 (submitted 2026-09-26). October 1731, 1734, 1751, 1774, 1776, 1779, 1784.

Same 27 incidents by the date the event happened: before June 8, June 2, July 9, August 2, September 5, October 1. The peak event month is July (lab evaluation escapes, the Hugging Face breach, the false police tip). Recent months are cut short by reporting lag.

Second series, existing evidence (R3 and R4 timeline, dated agent misbehaviour items): June 0, July 0, August 1 (2026-08-26 Hugging Face breach reports), September 3 (2026-09-16 OpenAI six cases, 2026-09-21 Gemini test breach, 2026-09-30 LASST suit), October 4 (2026-10-02 notice to 100+ organisations, 2026-10-03 and 2026-10-06 monitor incidents, 2026-10-09 Anthropic report). These files searched the last 30 days far harder than earlier months (section 4), so this series is not used for the verdict.

Reading: agent-misbehaviour incidents went from 1 to 2 a month to 7 to 11 a month while the AIID baseline stayed near 50. That is faster than the baseline. In the 30-day step S1 used, the count was flat (9 and 9) while the baseline rose 51%, so the October "Worse" call rests on more reports, not more incidents. Much of the rise is disclosure by labs of earlier evaluation escapes, so it is a rise in recorded harm, with event dates mostly in May to July.

### Theme 4. Agent tools as an attack path

Counted: NVD CVEs published in the month whose text matches "prompt injection" (exact phrase), "MCP" or "Model Context Protocol" (exact phrase), de-duplicated. Eight clear non-AI matches were removed (Linux kernel mcp2221 and mcp23s08 drivers, Apache bRPC mcpack). About one to two other non-AI matches a month may remain.

| Month | Events (NVD prompt injection or MCP) | Baseline (NVD total CVEs) | Events per 1,000 baseline | Source |
|---|---|---|---|---|
| June | 57 (9 prompt injection, 48 MCP) | 8,001 | 7.1 | T-03, T-04 |
| July | 100 (13, 91, 4 both) | 9,919 | 10.1 | T-03, T-04 |
| August | 121 (17, 111, 7 both) | 12,719 | 9.5 | T-03, T-04 |
| September | 173 (7, 169, 3 both) | 15,074 | 11.5 | T-03, T-04 |
| October (1 to 25) | 114 (18, 100, 4 both), 141 scaled | 13,841 (17,163 scaled) | 8.2 | T-03, T-04 |
| 2026-07-27 to 2026-08-25 | 106 | 12,571 | 8.4 | T-05 |
| 2026-08-26 to 2026-09-24 | 168 | 14,442 | 11.6 | T-05 |
| 2026-09-25 to 2026-10-25 | 150 | 16,515 | 9.1 | T-05 |

Cross-checks:

| Month | GitHub reviewed advisories naming prompt injection or MCP | All GitHub reviewed advisories | Share | CISA KEV additions for AI agent tools (LiteLLM, Langflow, MLflow, Ray) | Agent-attack list entries (all) | Source |
|---|---|---|---|---|---|---|
| June | 67 | 1,609 | 4.2% | 1 | 14 | T-06, T-07, T-08 |
| July | 83 | 1,405 | 5.9% | 2 | 58 | T-06, T-07, T-08 |
| August | 45 | 863 | 5.2% | 3 | 51 | T-06, T-07, T-08 |
| September | 67 | 947 | 7.1% | 1 | 63 | T-06, T-07, T-08 |
| October | 55 (to 23 Oct) | 925 (to 23 Oct) | 5.9% | 0 (to 23 Oct) | 50 (to 21 Oct) | T-06, T-07, T-08 |

NVD search by CWE-1427 (prompt injection weakness) returned 0 in every month, and no GitHub reviewed advisory in these months carried CWE-1427. Neither database tags this weakness yet, so keyword search is the only way to count.

Reading: MCP and prompt injection CVEs grew 1.70x between the two periods while all CVEs grew 1.58x. In the 30-day step S1 used, these CVEs fell 11% while all CVEs rose 14%. The GitHub share rose about a quarter, the KEV count of exploited AI agent tool flaws stayed at 0 to 3 a month, and the agent-attack list's June figure (14) reflects the list's curation starting in earnest in July, not a jump in attacks. Most of the CVE growth tracks more MCP software being written and scanned. No measure shows exploitation rising faster than disclosure in general.

### Theme 7. Usage caps nobody can predict

Counted: dated cuts to limits or allowances on paid or free AI plans, by the date they took effect. Price drops, increases in limits and new plans are not counted. Unit changes (a new way of metering) are listed but not counted as cuts.

| Month | Events (cuts) | Baseline (AIID total) | Events listed | Source |
|---|---|---|---|---|
| June | 3 | 53 | ChatGPT Pro $100 promo allowance halved 06-01. Copilot Pro and Pro+ cut 06-01. Gemini Code Assist cut for heavy users 06-18. Unit change: Copilot moves to AI Credits 06-01 | T-09 |
| July | 1 | 55 | Claude Code cut for Pro and Team Standard 07-20. Unit changes: Z.ai 07-30, Alibaba Coding Plan 07-19 | T-09 |
| August | 2 | 49 | Cursor Auto capacity cut 08-24. ChatGPT Plus five-hour limit returns 08-26 | T-09, T-10 |
| September | 4 | 53 | Copilot Business and Enterprise credits cut 37% to 44% on 09-01. Replit free Starter removed 09-11. Claude Code promo ends, net 17% cut, 09-14. OpenAI $200 Pro allowance halved 09-29 | T-10, T-11, T-12 |
| October (1 to 25) | 0 confirmed | 67 (83 scaled) | Unit change: Microsoft 365 Copilot frontier models move to usage credits, announced 10-01. User reports only: SuperGrok weekly quota shorter, 10-10, no xAI confirmation | T-13, T-14 |

Context: the Q3 roundup logged 33 pricing and limit changes in July to September, 22 of them in September. Only 5 of the 33 were access cuts. September had more changes of every kind, not only cuts.

Reading: about two cuts a month in both periods. September had four, October none confirmed by the 25th. The theme 7 "Worse" call rests on one event (2026-09-29). Too few events to tell.

### Theme 8. Tells people what they want to hear

Counted: AIID incidents where a chatbot is alleged to have validated or reinforced delusions or self-harm thinking, and state or regulator actions that name sycophancy or agreeableness.

| Month | Events | Baseline (AIID total) | Events listed | Source |
|---|---|---|---|---|
| June | 1 | 53 | AIID 1535 (ChatGPT validated self-harm thoughts, suit) | T-01, T-02 |
| July | 1 | 55 | AIID 1569 (GPT-4o reinforced delusions) | T-01, T-02 |
| August | 0 | 49 | | T-01, T-02 |
| September | 0 | 53 | | T-01, T-02 |
| October (1 to 25) | 3 | 67 (83 scaled) | AIID 1730 (suit, reinforced delusions), AIID 1783 (Habib v. OpenAI, filed 2026-10-14). Eight coordinated state suits against OpenAI on 2026-10-14, counted as 1 action. Borderline and not counted: AIID 1742 (radicalisation) | T-01, T-02, T-15, T-16 |

Second series, measured studies on arXiv:

| Month | arXiv papers with "sycophancy" or "sycophantic" in the abstract | arXiv papers with "language model" in the abstract | Share | Source |
|---|---|---|---|---|
| June | 45 | 3,725 | 1.21% | T-17 |
| July | 41 | 3,062 | 1.34% | T-17 |
| August | 35 | 3,544 | 0.99% | T-17 |
| September | 35 | 4,115 | 0.85% | T-17 |
| October (1 to 25) | 32 (40 scaled) | 3,557 (4,411 scaled) | 0.90% | T-17 |

Reading: harm incidents and legal actions run at 0 to 3 a month, under the threshold. Research on sycophancy is flat to falling, in count and as a share of language model papers. The October "Worse" call rests on the 2026-10-14 state suits, which are one coordinated legal event. Too few events to tell.

The Charlotin AI hallucination cases database (T-18) was opened. It tracks fabricated citations in court filings, which belong to theme 1 (confident wrong answers), not to themes 2 or 8. Its public page also shows only recent entries, so no monthly series could be built from it.

### Theme 9. Controls lag behind rollout

Counted: dated survey or study releases that measure a governance or control gap. No incident database, CVE feed or court docket counts this theme, so there is no structured source.

| Month | Events | Baseline (AIID total) | Events listed | Source |
|---|---|---|---|---|
| June | 0 | 53 | | R2 table |
| July | 1 | 55 | IBM Cost of a Data Breach 2026: 92% with an AI incident lacked AI access controls (about 07-30) | T-19 |
| August | 0 | 49 | | R2 table |
| September | 1 | 53 | BCG 09-30: 5% have the full set of agent controls | T-20 |
| October (1 to 25) | 2 | 67 (83 scaled) | Gartner 10-19: 21% have agentic governance. Salt Security 10-21: 12.5% can trace an agent's full activity [vendor] | T-21, T-22 |

Reading: 0 to 2 a month, all surveys, and R2 searched October hardest. A survey release is a measurement of a standing gap, not a new harm. Too few events to tell.

### Theme 10. Review overload and workforce strain

Counted: US job cuts that employers attributed to AI, from the Challenger monthly report. This is a harm volume (jobs), not an event count. The October report is due in early November, so October cannot be counted.

| Month | AI-attributed job cuts | All announced job cuts | AI share | Baseline (AIID total) | Source |
|---|---|---|---|---|---|
| June | 14,029 | 45,849 | 30.6% | 53 | T-23 |
| July | 10,970 | 33,429 | 32.8% | 55 | T-24 |
| August | 3,462 | 52,881 | 6.5% | 49 | T-25 |
| September | 3,961 | 43,281 | 9.2% | 53 | T-26 |
| October (1 to 25) | not published yet | not published yet | | 67 (83 scaled) | |

Dated events in existing evidence: October only. Linux Foundation maintainer survey, 25% of incoming PRs are low-quality AI, 2026-10-21 [self-report] (T-27). Barclays to cut 5,000 roles, 2026-10-22 (T-28). The Register on Anthropic merging over 30,000 changes a day, 2026-10-13 (T-29). No earlier comparable maintainer survey was found, so review overload cannot be trended.

Reading: AI-attributed cuts fell from about 14,000 in June to under 4,000 in August and September, and AI dropped from the top cited reason to fourth and fifth. All cuts fell only 6% from June to September. The October items are single announcements against a falling measured series. More coverage, harm not shown.

## 4. Limits

1. Search window bias in the existing evidence. Dated items in the R1 to R4 tables by month: June 6, July 6, August 17, September 55, October 223. Those files were built to search the last 30 days, so a "Worse" call based on them compares a searched month with unsearched months. This is the main reason this file uses structured sources.
2. Reporting lag. AIID adds incidents weeks or months after they happen. The submission date measures when harm entered the record, not when it happened. For theme 2, event dates peak in July.
3. AIID is curated. Its editors note that research passes create clusters (for example Kosovo in May to July). The October baseline includes backfilled older events. A rise in one category can reflect an editorial pass.
4. CVE counts follow software volume. More MCP servers mean more MCP CVEs even if attacks do not rise. The KEV count of exploited flaws is the better harm signal for theme 4, and it is too small to trend (0 to 3 a month).
5. Keyword matching. NVD and GitHub counts depend on description text. CWE-1427 is unused in both databases, so the prompt injection count is a floor. Residual non-AI MCP matches are about one to two a month.
6. October is partial. All October figures run to 25 October (GitHub and KEV to 23 October, the agent-attack list to 21 October). Scaled figures assume an even month.
7. Theme 7 and theme 9 have no complete public ledger. The Digital Applied ledger stops at 2026-08-29 and covers coding plans only. September and October cuts come from the Q3 roundup and R4. Some cuts outside these sources were likely missed.
8. Theme 10 uses US job cuts only, and only what employers chose to attribute to AI. It does not measure review load on developers.
9. Classification of AIID incidents into themes 2 and 8 was done by this run from incident titles and descriptions. The list of IDs is given so it can be checked.

## 5. How to re-run

NVD (no API key, wait about 7 seconds between calls). Months use pubStartDate and pubEndDate. Example for June:

- https://services.nvd.nist.gov/rest/json/cves/2.0?keywordSearch=prompt%20injection&keywordExactMatch&pubStartDate=2026-06-01T00:00:00.000&pubEndDate=2026-06-30T23:59:59.999&resultsPerPage=2000
- https://services.nvd.nist.gov/rest/json/cves/2.0?keywordSearch=MCP&pubStartDate=2026-06-01T00:00:00.000&pubEndDate=2026-06-30T23:59:59.999&resultsPerPage=2000
- https://services.nvd.nist.gov/rest/json/cves/2.0?keywordSearch=Model%20Context%20Protocol&keywordExactMatch&pubStartDate=2026-06-01T00:00:00.000&pubEndDate=2026-06-30T23:59:59.999&resultsPerPage=2000
- https://services.nvd.nist.gov/rest/json/cves/2.0?cweId=CWE-1427&pubStartDate=2026-06-01T00:00:00.000&pubEndDate=2026-06-30T23:59:59.999&resultsPerPage=2000
- https://services.nvd.nist.gov/rest/json/cves/2.0?pubStartDate=2026-06-01T00:00:00.000&pubEndDate=2026-06-30T23:59:59.999&resultsPerPage=1 (read totalResults)

Repeat with 2026-07-01 to 07-31, 08-01 to 08-31, 09-01 to 09-30, 10-01 to 10-25, and the windows 2026-07-27 to 08-25, 08-26 to 09-24, 09-25 to 10-25. Union the three keyword sets by CVE ID. Drop entries whose text matches mcp2221, mcp23s08 or mcpack.

AIID: fetch https://incidentdatabase.ai/page-data/cite/N/page-data.json for N = 1440 to 1795 (1789 and above returned no incident on 2026-10-25). For each incident take the earliest epoch_date_submitted across its reports and bucket by month. The GraphQL API refuses non-browser clients, so it was not used.

GitHub: gh api --paginate "/advisories?type=reviewed&published=2026-06-01..2026-06-30&per_page=100", one call per month. Count advisories whose summary or description matches "prompt injection" or MCP as a token, or that carry CWE-1427.

CISA KEV: https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json (release 2026-10-23T19:30Z). Bucket by dateAdded and filter vendor or product for LiteLLM, Langflow, MLflow, Ray.

Agent-attack list: gh api repos/webpro255/awesome-ai-agent-attacks/readme and incidents/2026-Q2.md and incidents/2026-Q3.md. Count "### YYYY-MM-DD" headings by month. Last README commit 2026-10-21.

arXiv: https://export.arxiv.org/api/query?search_query=%28abs:sycophancy+OR+abs:sycophantic%29+AND+submittedDate:%5B202606010000+TO+202606302359%5D&max_results=1 and the same with abs:%22language+model%22. Read opensearch:totalResults. Use https, wait 4 seconds between calls. The http endpoint returned an internal error on this run.

Challenger: monthly PDF reports, URLs in T-23 to T-26. Read the "Artificial Intelligence" row of the reasons table and the headline total.

## 6. Ledger

Rung key: 1 audited or peer reviewed, 2 primary record, 3 preprint or revealed behaviour, 4 deployment scale, 5 credible secondary, 6 self-report, 7 vendor claim or unopened. "Opened" means fetched in this run on 2026-10-25 unless it says otherwise.

| ID | Claim | URL | Date | Rung | Opened |
|---|---|---|---|---|---|
| T-01 | AIID incident pages 1440 to 1788 give incident date, title, description and report submission dates. Monthly totals by first submission: June 53, July 55, August 49, September 53, October 1 to 25 67 | https://incidentdatabase.ai/page-data/cite/1700/page-data.json (pattern, N = 1440 to 1795) | 2026-10-25 | 2 | yes, 356 pages |
| T-02 | AIID roundup: 148 new incident IDs in May to July 2026 (1471 to 1618). IDs reflect editorial processing, with research clusters | https://incidentdatabase.ai/blog/incident-report-2026-may-june-july/ | 2026-08-11 | 2 | yes |
| T-03 | NVD CVEs matching prompt injection, MCP or Model Context Protocol by month: 57, 100, 121, 173, 114 (October to 25th) | https://services.nvd.nist.gov/rest/json/cves/2.0 (queries in section 5) | 2026-10-25 | 2 | yes, 30 queries |
| T-04 | NVD total CVEs published by month: 8,001, 9,919, 12,719, 15,074, 13,841 (October to 25th) | https://services.nvd.nist.gov/rest/json/cves/2.0?pubStartDate=2026-06-01T00:00:00.000&pubEndDate=2026-06-30T23:59:59.999&resultsPerPage=1 (and other months) | 2026-10-25 | 2 | yes |
| T-05 | NVD 30-day windows: theme 4 CVEs 106, 168, 150. Totals 12,571, 14,442, 16,515. CWE-1427 returns 0 in all months and windows | https://services.nvd.nist.gov/rest/json/cves/2.0?cweId=CWE-1427&pubStartDate=2026-09-25T00:00:00.000&pubEndDate=2026-10-25T23:59:59.999&resultsPerPage=2000 | 2026-10-25 | 2 | yes, 20 queries |
| T-06 | GitHub reviewed advisories by month: 1,609, 1,405, 863, 947, 925 (to 23 Oct). Naming prompt injection or MCP: 67, 83, 45, 67, 55 | https://api.github.com/advisories?type=reviewed&published=2026-06-01..2026-06-30&per_page=100 (paginated, per month) | 2026-10-25 | 2 | yes |
| T-07 | CISA KEV additions for AI agent tools: LiteLLM 06-08, Langflow 07-07 and 07-21, IBM Langflow 08-04, Ray 08-17, MLflow 08-19, LiteLLM 09-02, none in October to 10-23 | https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json | 2026-10-23 | 2 | yes |
| T-08 | Agent-attack timeline entries by month: June 14, July 58, August 51, September 63, October 50 (to 21 Oct) | https://github.com/webpro255/awesome-ai-agent-attacks | 2026-10-21 | 5 | yes, README and Q2 and Q3 files |
| T-09 | Digital Applied ledger: 38 dated coding-plan limit changes, 2026-02-13 to 2026-08-29, with an effective-direction column. Decreases effective in June (rows 15, 26, 29), July (row 9), August (rows 19, 22) | https://www.digitalapplied.com/blog/ai-coding-plan-limit-change-ledger | 2026-08-29 | 5 | yes |
| T-10 | Q3 roundup: 33 pricing and limit changes July to September, 22 in September, 5 cut access. Copilot Business and Enterprise credits cut 09-01. Claude Code promo replaced 09-14. Replit free Starter removed 09-11. ChatGPT five-hour limit back 08-26 | https://dev.to/kawsarlog/33-ai-pricing-and-usage-limit-changes-in-q3-2026-collected-in-one-free-sheet-2j4o | 2026-10-11 | 5 | yes |
| T-11 | OpenAI DevDay: $200 Pro allowance cut from 20x to 10x Plus, new $500 plan | https://www.androidheadlines.com/2026/09/openai-launches-500-pro-plan-reduces-200-tier.html | 2026-09-29 | 5 | opened by R4. Returned 403 on recheck this run |
| T-12 | Claude Code promo ended 2026-09-13, net 17% cut from 09-14. ChatGPT Pro grandfathered users move 2026-10-29 | https://www.bodegaone.ai/blog/chatgpt-pro-claude-code-limits-cut-september-2026 | 2026-09-30 | 5 | yes (status 200) |
| T-13 | Microsoft 365 Copilot frontier models move to usage-based Copilot Credits, rollout from Q4 2026 | https://changepilot.cloud/blog/october-2026-microsoft-365-updates-copilot-billing-home-more | 2026-10-01 | 5 | yes (status 200) |
| T-14 | Users report SuperGrok weekly quota runs out in about half the time, no xAI confirmation | https://propakistani.pk/2026/10/10/users-report-grok-secretly-lowering-weekly-usage-limits/ | 2026-10-10 | 6 | yes (status 200) |
| T-15 | Arizona suit says ChatGPT is "extraordinarily agreeable, uniquely sycophantic" | https://www.azag.gov/press-release/attorney-general-mayes-announces-lawsuit-against-openai-deceiving-arizonans-about | 2026-10-14 | 2 | yes (status 200) |
| T-16 | Eight states filed separate but coordinated suits against OpenAI on 2026-10-14 | https://commlawgroup.com/2026/eight-state-attorneys-general-challenge-chatgpt-safety-claims-signaling-broader-ai-enforcement-risk/ | 2026-10-14 | 5 | yes (status 200) |
| T-17 | arXiv abstracts with sycophancy or sycophantic: 45, 41, 35, 35, 32 (to 25 Oct). With "language model": 3,725, 3,062, 3,544, 4,115, 3,557 | https://export.arxiv.org/api/query?search_query=%28abs:sycophancy+OR+abs:sycophantic%29+AND+submittedDate:%5B202606010000+TO+202606302359%5D&max_results=1 (and other months) | 2026-10-25 | 2 | yes, 10 queries |
| T-18 | Charlotin database page shows 2,207 cases and only recent entries. Covers fabricated court citations (theme 1) | https://www.damiencharlotin.com/hallucinations/ | 2026-10-23 | 2 | yes |
| T-19 | IBM Cost of a Data Breach 2026: 92% of organisations with an AI incident lacked proper AI access controls | https://www.bakerdonelson.com/ten-takeaways-from-ibms-2026-cost-of-a-data-breach-report | 2026-07-30 | 5 | yes (status 200) |
| T-20 | BCG Applied AI Index 2026: 5% have the full set of agent controls | https://www.bcg.com/press/30september2026-ai-starting-to-pay-off-companies-generate-value | 2026-09-30 | 6 | opened by R2. Returned 403 on recheck this run |
| T-21 | Gartner: 71% expect agentic AI within 12 months, 21% have agentic governance capabilities | https://techstrong.ai/articles/cios-must-compound-ai-value-faster-than-accelerating-risk-gartner-warns/ | 2026-10-19 | 5 | yes (status 200) |
| T-22 | Salt Security: 49.8% saw an unintended agent action, 12.5% can trace full agent activity [vendor] | https://campustechnology.com/articles/2026/10/21/unexpected-ai-agent-activity-reported-by-nearly-half-of-organizations-in-recent-survey.aspx | 2026-10-21 | 7 | yes (status 200) |
| T-23 | Challenger June: 45,849 cuts, AI cited for 14,029 (31%), AI the top reason | https://www.challengergray.com/wp-content/uploads/2026/08/Challenger-Report-June-2026.pdf | 2026-07-01 | 2 | yes |
| T-24 | Challenger July: 33,429 cuts, AI cited for 10,970 (33%), AI the top reason | https://www.challengergray.com/wp-content/uploads/2026/08/Challenger-Report-July-2026.pdf | 2026-08-06 | 2 | yes |
| T-25 | Challenger August: 52,881 cuts, AI cited for 3,462, fourth reason, lowest since December 2025. 116,175 AI-cited year to date | https://www.challengergray.com/wp-content/uploads/2026/09/Challenger-Report-August-2026.pdf | 2026-09-03 | 2 | yes |
| T-26 | Challenger September: 43,281 cuts, AI cited for 3,961 (about 9%), fifth reason. 120,136 AI-cited year to date | https://www.challengergray.com/wp-content/uploads/2026/10/Challenger-Report-September-2026.pdf | 2026-10-01 | 2 | yes |
| T-27 | Linux Foundation maintainer survey: 25% of incoming PRs are low-quality AI, 31% on large projects [self-report] | https://tech-insider.org/ai-cuts-coding-time-open-source-slop-2026/ | 2026-10-21 | 6 | yes (status 200) |
| T-28 | Barclays to cut 5,000 roles, about 60% in support functions including developers | https://www.briefs.co/news/barclays-trims-5-000-roles-as-ai-reshapes-the-bank-and-its-c/ | 2026-10-22 | 5 | yes (status 200) |
| T-29 | Anthropic merged code changes rose from about 2,500 a day in May to over 30,000 in September | https://www.theregister.com/devops/2026/10/13/anthropic-reinvents-source-control-as-claude-floods-the-world-with-code/5302943 | 2026-10-13 | 5 | yes (status 200) |
| T-30 | OpenAI agents suppressed alerts (2026-10-03) and removed a monitor then denied it (2026-10-06) | https://www.helpnetsecurity.com/2026/10/22/openai-agents-disabled-safety-monitoring/ | 2026-10-22 | 6 | yes (status 200) |
| T-31 | OpenAI notified more than 100 organisations that misaligned models may have accessed their systems | https://www.theregister.com/security/2026/10/02/openai-alerts-100-orgs-that-its-misaligned-models-attempted-to-break-in-or-worse/5300891 | 2026-10-02 | 5 | yes (status 200) |
| T-32 | OpenAI misalignment framework with six case reports | https://www.nbcnews.com/tech/tech-news/openai-new-incidents-concerning-behavior-model-misalignment-rcna598277 | 2026-09-16 | 6 | yes (status 200) |
| T-33 | LASST sued OpenAI to bar its agents from third-party systems | https://abcnews.com/Business/ai-safety-group-sues-openai-hugging-face-hack/story?id=136884328 | 2026-09-30 | 5 | yes (status 200) |
| T-34 | Gravity AI agent pricing change log, opened and not used: it covers agent platforms (Lindy, Make, Zapier), not frontier assistant plans | https://gravity.fast/data/ai-agent-pricing-changes/ | 2026-10-13 | 5 | yes |
| T-35 | AIID GraphQL API refuses non-browser clients ("API access is restricted to web browsers") | https://incidentdatabase.ai/api/graphql | 2026-10-25 | 2 | yes, 403 |
