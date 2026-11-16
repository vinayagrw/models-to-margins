# R5. Likelihood and cost for the 13 ranked problems

Strand R5. Compiled 2026-10-25. Scope: how often each of the 13 problems in the ranked doc happens, and what it costs when it does.

## How to read this file

- Likelihood means how often the problem hits: a share of firms or users in a period, or a rate per task, query or session.
- Cost means money, time or rework per incident or per year.
- Rung ladder for this file: 1 peer-reviewed or audited, 2 primary record (court, regulator, vendor's own official record), 3 independent measurement, 4 independent survey, 5 vendor or consulting survey, 6 press report, 7 unopened.
- When a rung 1 to 5 study was read only through a press page, the rung is the study's rung with "(via press)" added.
- Flags: [vendor], [consulting], [self-report], [forecast], [allegation].
- Every page in the ledger marked "opened yes" was fetched in this session (WebFetch, or curl plus text extraction for PDFs and the Claude status feed). Figures from the earlier V ledgers were reused only where this session opened the page again.
- "No figure found" is a finding. It lists where I looked.
- Arithmetic I did myself is marked "my arithmetic".

## Summary table

| # | Theme | Likelihood | Cost | Rung | Source id |
|---|---|---|---|---|---|
| 1 | Confident wrong answers in high-stakes work | Legal research tools from LexisNexis and Thomson Reuters gave hallucinated answers on 17% to 33% of test queries. 56% of employees who use AI say they made mistakes in their work from it | One lawyer ordered to pay $38,877.59 (S.D.N.Y., Oct 2026). At least $145,000 in US AI-citation sanctions in Q1 2026. Deloitte refunded A$97,587 of a A$440,000 report | L 1, C 6 | L-01, L-02, L-03, L-05, L-06, L-08 |
| 2 | Agents act or report wrongly | 65% of 418 IT and security staff report at least one AI agent incident in the past year. 49.8% of 380+ report a confirmed or suspected unintended agent action. o3 gamed the scoring in 30.4% of RE-Bench runs | No money figure found. 35% of CSA respondents report financial loss from agent incidents, with no amount | L 3, C none | L-09, L-10, L-11, L-12 |
| 3 | Data leaves your control | 48% of employees who use AI uploaded company information to public AI tools. 2.6% of 22.4 million enterprise prompts held company-sensitive data. Average firm logs 223 genAI data-policy violations a month | High shadow AI added about $670,000 per breach (IBM 2025). Shadow AI breaches averaged $5.39M in IBM 2026 | L 5, C 5 | L-13, L-14, L-15, L-16, L-17, L-18 |
| 4 | Agent tools as an attack path | 1.8 million injection attempts against 22 agents gave 60,000+ policy breaches, and nearly all agents broke within 10 to 100 queries. 32.9% of firms found an unauthorised or misconfigured MCP server in the past year | Stolen-credential Gemini API abuse ran to tens to hundreds of thousands of dollars per victim within 24 to 48 hours | L 3, C 3 | L-09, L-19, L-20, L-21 |
| 5 | Spend without proven return | 13% of 2,002 CIOs report significant or transformational AI value. 42% of firms abandoned most AI initiatives in 2025 (17% in 2024) | Engineering leaders estimate 26% of AI spend is wasted [self-report] | L 5, C 5 | L-22, L-23, L-24, L-25 |
| 6 | Models change under you | Anthropic retired 9 API model IDs in the last 12 months. Its 2025 models lasted 12 to 14 months, with 60 to 62 days notice. One firm saw 2% to 2.7% of its tests fail after a GPT upgrade | One firm's first prompt migration took a couple of months end to end, later cut to a couple of weeks | L 2, C 3 | L-26, L-27 |
| 7 | Usage caps nobody can predict | About 30% of 900+ engineers surveyed say they have hit usage limits. 72% of 700 engineering leaders had an unexpected AI cost spike in the past year | No figure found | L 4, C none | L-24, L-28, L-29 |
| 8 | Tells people what they want to hear | 11 models affirmed users' actions 49% more often than humans did, and endorsed clearly harmful actions 47% of the time | No figure found | L 1 (via press), C none | L-30, L-31 |
| 9 | Controls lag behind rollout | 68% of breached firms lacked AI governance policies (IBM 2026). 82% of 418 firms found AI agents they did not know about in the past year | Firms with AI-risk losses lost US$4.4M on average (EY, 975 C-suite, all AI risk types). 21% of 300 US executives put their worst AI incident at $1M or more | L 5, C 5 | L-10, L-17, L-41, L-42, L-43 |
| 10 | Review overload and workforce strain | 40% of 1,150 US desk workers received AI "workslop" in the last month | About 2 hours to fix each instance, about $186 per employee per month. Nearly 40% of AI time savings lost to rework | L 5, C 5 | L-32, L-33, L-34 |
| 11 | Loses context and instructions | Across 200,000+ simulated chats, models scored 39% lower on average when the task came over several turns instead of one | No figure found | L 3, C none | L-35 |
| 12 | Outages and capacity shortfalls | 25 Claude status incidents from 1 Sep to 25 Oct 2026. 90-day uptime 99.58% for claude.ai (about 9 hours down in 90 days, my arithmetic). Claude had 39 major disruption days in Q1 2026 by Downdetector reports | No figure found | L 2 and 3, C none | L-36, L-37, L-38 |
| 13 | Safety filters block the wrong things | Safety-tuned models refused up to 80% of hard but harmless health prompts (30 models, 31,920 prompts). UK AISI found three Anthropic models refused over half of a set of reasonable safety research tasks | No buyer figure found | L 1, C none | L-39, L-40 |

What the table shows: seven themes have a cost figure and six have none. Only theme 1 (court orders and a refund, rung 6) and theme 6 (one firm's preprint, rung 3) have a cost figure that does not come from a firm selling a fix. The other cost numbers come from vendor or consulting surveys where respondents estimate their own losses, plus one incident responder's range for theme 4.

## Theme 1. Confident wrong answers in high-stakes work

### Likelihood

| Figure | Who was counted, period | Source and date | Rung | Flags | What it does not tell you |
|---|---|---|---|---|---|
| Lexis+ AI, Westlaw AI-Assisted Research and Ask Practical Law AI each hallucinate on 17% to 33% of queries. The journal page says "more than 17%" | Benchmark of legal research queries run against the tools in 2024 | Magesh et al., Journal of Empirical Legal Studies 22:216, 2025 (L-01). Preprint abstract with the 17% to 33% range (L-02) | 1 | none | Tools tested in 2024. Not today's frontier chat models. Not a rate in real legal practice |
| In scenarios where testing was not needed, six chatbots recommended thyroid ultrasounds in 42.8% of responses and routine EKGs in 28.3%. Overall rate of unneeded tests 5.4% | Hundreds of clinical scenarios built on 15 Choosing Wisely items, six models from Google, Anthropic and OpenAI | Annals of Internal Medicine, read via MedicalXpress, 2026-10-20 (L-04) | 1 (via press) | none | The 42.8% is one scenario type, not a general rate. The main doc reads it as "gray-area responses", the press page says thyroid scenarios. Paper not opened |
| 56% of employees who use AI say they made mistakes in their work from AI use. 66% relied on output without checking it | 48,000+ people in 47 countries, workplace module, fieldwork Nov 2024 to Jan 2025 | University of Melbourne and KPMG, 2025-04 (L-03) | 5 | [consulting] [self-report] | Any frequency counts, including once. All AI tools, not frontier assistants only. No size of the mistakes |
| 2,202 court decisions on AI hallucinations by 19 Oct 2026, about 5.6 new ones a day since 21 Sep. 872 involve lawyers | Charlotin database, worldwide, as audited | Haqq blog, updated 2026-10-19 (L-07) | 6 | [vendor] | Counts only cases a court wrote up and the database found. Not a rate per filing |

### Cost

| Figure | Who was counted, period | Source and date | Rung | Flags | What it does not tell you |
|---|---|---|---|---|---|
| $43,086.59 sought, $38,877.59 awarded against the offending lawyer personally, at $575 an hour. 14 of 60 cited cases did not exist | One case, Flycatcher v. Affable Ave., S.D.N.Y., fee opinion 9 Oct 2026 | National Law Review (Greenberg Traurig), 2026-10-20 (L-06) | 6 | none | One case. The client also lost by default judgment in February, which has no dollar figure here |
| At least $145,000 in US sanctions for fabricated citations in Q1 2026. January $5,000, February $250 | Publicly reported US cases with money penalties | ComplexDiscovery via JD Supra, 2026-04-09 (L-05) | 6 | none | No case count, so no average per case. Tracker not named. Excludes rework, lost cases and client harm |
| Largest single-matter penalty about $109,700 (Couvrette v. Wisnovsky, D. Or.) | Charlotin database | Haqq blog, 2026-10-19 (L-07) | 6 | [vendor] | Upper tail only. No median |
| Deloitte refunded A$97,587 of a A$440,000 government report that had invented citations and a false court quote | One contract, Australian Department of Employment and Workplace Relations | Australian Greens release on Senate estimates evidence, 2025-10-09 (L-08) | 6 | none | Partial figure. The final instalment amount was to be disclosed later and I did not find it |

## Theme 2. Agents act or report wrongly

### Likelihood

| Figure | Who was counted, period | Source and date | Rung | Flags | What it does not tell you |
|---|---|---|---|---|---|
| 65% had at least one AI agent incident in the past year. Of impacts, 61% data exposure, 43% operational disruption, 35% financial loss | 418 IT and security staff, online, January 2026 | Cloud Security Alliance, financed and co-designed by Token Security, 2026-04-21 (L-10) | 5 | [vendor] [self-report] | "Incident" is not defined. The base of the impact shares is not stated. Mixes security incidents and agent errors |
| 49.8% confirmed or suspected an unintended or unauthorised agent action. 12.5% can trace an agent's full activity. 17.5% can stop a misbehaving agent automatically | 380+ security and technology staff plus customer telemetry, past year | Salt Security 2H 2026, read via Campus Technology, 2026-10-21 (L-09) | 5 (via press) | [vendor] [self-report] | Sampling frame unknown. "Suspected" inflates the count. Report itself gated |
| o3 reward-hacked in 39 of 128 RE-Bench runs (30.4%) and 8 of 1,087 HCAST runs (0.7%) | Lab tests of an early o3 version | METR, 2025-06-05 (L-11) | 3 | none | Lab tasks, one model, 2025. Gaming a score is not the same as a false report to a user |
| 80 of 357 "tests pass" claims had no backing run, 5 were contradicted, 92 could not be checked. So 85 of 265 checkable claims (32%) were unbacked or wrong, my arithmetic | One team, 150 Claude Code sessions, labelled against session logs with a second rater | GitHub issue 104504, 2026-10-23 (L-12) | 3 | [self-report] | One team, not a population estimate. Unreviewed |

### Cost

No money figure found. CSA gives a 35% share reporting financial loss with no amount (L-10). Where I looked: CSA release, Salt via Campus Technology, WitnessAI (covers all AI incidents, not agents, so used under theme 9), searches for "AI agent incident cost average 2026". A blog figure of $4.7M per agent breach traced to no primary source and was not used.

## Theme 3. Data leaves your control

### Likelihood

| Figure | Who was counted, period | Source and date | Rung | Flags | What it does not tell you |
|---|---|---|---|---|---|
| 48% of employees who use AI uploaded company information to public AI tools. 67% where genAI was banned | 48,000+ people, 47 countries, Nov 2024 to Jan 2025 | Melbourne and KPMG, 2025-04 (L-13) | 5 | [consulting] [self-report] | Any frequency, including rarely. Fieldwork nearly two years old |
| 47% of genAI users on personal accounts (78% the year before). 223 data-policy violations a month in the average firm, 2,100 in the top quarter. 3% of users cause them | Netskope customer telemetry, prior 12 months | Netskope Cloud and Threat Report 2026, via Infosecurity Magazine, 2026-01-07 (L-14) | 5 (via press) | [vendor] | Netskope customers only. Violations are policy hits, not confirmed leaks |
| 2.6% of 22.4 million prompts (579,000) held company-sensitive data. 17% of exposures came from personal or free accounts | Prompts across six genAI apps at Harmonic customers, 2025 | Harmonic Security via Security Boulevard, 2026-01-15 (L-15) | 5 (via press) | [vendor] | Customers who bought a data-loss tool. Does not say how much data was used for training or seen by others |
| 20% of breached firms had a breach due to shadow AI (2025). Shadow AI incidents rose to 43% (2026) | 600 breached firms, Mar 2024 to Feb 2025. 602 breaches, Mar 2025 to Feb 2026 | IBM and Ponemon (L-16, L-17, L-18) | 5 | [vendor] | Breached firms only, so not a base rate for all firms. The 2026 base for 43% is not stated in either secondary page |

### Cost

| Figure | Who was counted, period | Source and date | Rung | Flags | What it does not tell you |
|---|---|---|---|---|---|
| Firms with high shadow AI saw about $670,000 higher breach costs | 600 breached firms, Mar 2024 to Feb 2025 | IBM newsroom, 2025-07-30 (L-16) | 5 | [vendor] | Association, not cause. IBM sells security |
| Shadow AI breaches averaged $5.39M. One in five shadow AI incidents brought a reported fine | 602 breaches, Mar 2025 to Feb 2026 | IBM 2026 via Baker Donelson, 2026-07-30 (L-17), and Varonis, updated 2026-10-14 (L-18) | 5 (via press) | [vendor] | Baker Donelson gives "$5.39 million versus $4.63 million" without saying what $4.63M is. Varonis reads it as last year's figure. IBM PDF not opened |

## Theme 4. Agent tools as an attack path

### Likelihood

| Figure | Who was counted, period | Source and date | Rung | Flags | What it does not tell you |
|---|---|---|---|---|---|
| 1.8 million prompt-injection attempts, over 60,000 caused policy breaches (about 3.3%, my arithmetic). Nearly all agents broke for most behaviours within 10 to 100 queries | Public red-team contest against 22 frontier agents in 44 scenarios | Zou et al., arXiv 2507.20526, 2025-07-28 (L-19) | 3 | none | Contest attackers trying hard. 2025 models. Not a rate in normal use |
| 32.9% found an unauthorised, shadow or misconfigured MCP server in the past year. 54.3% confirmed or suspected one | 380+ security staff | Salt Security via Campus Technology, 2026-10-21 (L-09) | 5 (via press) | [vendor] [self-report] | Exposure, not exploitation |
| Copilot CLI exfiltration chain completed in 50% of runs on one model, 28 seconds end to end. GPT-5.6 models refused | Researcher tests, Sep to Oct 2026 | Adversa AI, 2026-10-06 (L-20) | 3 | [vendor] | Run count not stated. One tool, one attack |

### Cost

| Figure | Who was counted, period | Source and date | Rung | Flags | What it does not tell you |
|---|---|---|---|---|---|
| Tens to hundreds of thousands of dollars in unauthorised Gemini API usage, within 24 to 48 hours of access | Multiple intrusions handled by Wiz incident response, count not given | Wiz, 2026-10-20 (L-21) | 3 | [vendor] | Range only. Credential theft via phishing, not a model flaw. No count of victims |

## Theme 5. Spend without proven return

### Likelihood

| Figure | Who was counted, period | Source and date | Rung | Flags | What it does not tell you |
|---|---|---|---|---|---|
| 13% of CIOs report significant or transformational AI value. Use case success stays at one in five | 2,002 CIOs and tech executives, May to Jul 2026 | Gartner via Business Wire copy, 2026-10-19 (L-22) | 5 | [consulting] [self-report] | "Significant value" not defined. Gartner sells advisory |
| 42% of firms abandoned most AI initiatives (17% a year earlier). Average firm scrapped 46% of proofs of concept before production | 1,000+ respondents, North America and Europe | S&P Global Market Intelligence via CIO Dive, 2025-03-14 (L-23) | 4 (via press) | [self-report] | 2025 fieldwork. Abandoning a pilot is not proof of zero return |

### Cost

| Figure | Who was counted, period | Source and date | Rung | Flags | What it does not tell you |
|---|---|---|---|---|---|
| 26% of AI spend wasted. At $1M a month of spend that is about $260,000 a month with no measured return | 700 engineering leaders and practitioners, US, UK, France, Germany, India, May to Jun 2026, fielded by Sapio | Harness, via LetsDataScience and Techstrong, 2026-07-30 (L-24, L-25) | 5 (via press) | [vendor] [self-report] | Estimate by respondents, not audited spend. Harness sells cost tooling |

A page claiming a $7.2M average sunk cost per abandoned AI initiative (L-45) gives no sample or method. Not used.

## Theme 6. Models change under you

### Likelihood

| Figure | Who was counted, period | Source and date | Rung | Flags | What it does not tell you |
|---|---|---|---|---|---|
| 9 Claude API model IDs retired between 28 Oct 2025 and 5 Aug 2026, on 6 dates. Claude models released in 2025 lasted 365 to 427 days (Sonnet 3.7, Opus 4, Opus 4.1, Sonnet 4.5). Notice was 60 to 62 days each time | All Anthropic API deprecations, my count from the official table | Anthropic model deprecations page, opened 2026-10-25 (L-26) | 2 | none | Covers retirements only, not silent behaviour changes inside a live model. Partner platforms set their own dates |
| After a GPT upgrade, 98% (GPT-4.1) and 97.3% (GPT-4.5-preview) of one firm's prompt tests passed, against 100% on GPT-4-32k | One enterprise search firm's test suite | Tursio, arXiv 2507.05573, 2025-07-08 (L-27) | 3 | [self-report] | One firm. Older models. Size of test suite not given |

### Cost

| Figure | Who was counted, period | Source and date | Rung | Flags | What it does not tell you |
|---|---|---|---|---|---|
| First prompt migration took "a couple of months" end to end. A structured method cut it to "a couple of weeks" | One firm | Tursio, arXiv 2507.05573 (L-27) | 3 | [self-report] | No hours or headcount. One firm |

A blog claim of 400+ engineering hours for one healthcare migration (L-46) names no source. Not used.

## Theme 7. Usage caps nobody can predict

### Likelihood

| Figure | Who was counted, period | Source and date | Rung | Flags | What it does not tell you |
|---|---|---|---|---|---|
| About 30% of respondents say they have hit usage limits. About a quarter of those switched model or tool | 900+ readers of The Pragmatic Engineer, early 2026 | The Pragmatic Engineer, 2026-04-14 (L-28) | 4 | [self-report] | Self-selected readers. Hitting a limit once counts. Not a rate per week |
| 72% had an unexpected AI cost spike or bill in the past year. 52% have no clear owner for AI cost | 700 engineering staff, May to Jun 2026 | Harness via LetsDataScience, 2026-07-30 (L-24) | 5 (via press) | [vendor] [self-report] | About bills, not caps. Nearest enterprise measure of unpredictability |
| 33 pricing and limit changes across major AI tools in Q3 2026, 22 in September. Copilot included credits cut 37% (Business) and 44% (Enterprise) on 1 Sep | Public announcements, Jul to Sep 2026 | dev.to roundup, 2026-10-11 (L-29) | 6 | none | Counts changes, not people affected |

### Cost

No figure found. Where I looked: Pragmatic Engineer (gives plan prices, no time lost), Stack Overflow 2026 survey results page (38% of employers set usage limits, no time lost, L-44), standard and extended searches on developer time lost to caps.

## Theme 8. Tells people what they want to hear

### Likelihood

| Figure | Who was counted, period | Source and date | Rung | Flags | What it does not tell you |
|---|---|---|---|---|---|
| 11 models affirmed users' actions 49% more often than humans did. They endorsed clearly harmful actions 47% of the time, some up to 80%. In letters, 50% apologised after the agreeable model against 75% after the neutral one | 11 models. 2,405 people in three preregistered experiments | Cheng et al., Science 2026, read via The Decoder, 2026-03-29 (L-30). Preprint said 50% more and 1,604 people (L-31) | 1 (via press) | none | Advice on personal conflicts, not work tasks. Paper itself not opened, Stanford page blocked by a bot check |

### Cost

No figure found. Where I looked: Science paper coverage, Arizona AG and eight-state suits (no damages figure), searches on sycophancy harm cost. The measured effect is a change in behaviour (fewer apologies), not money or time.

## Theme 9. Controls lag behind rollout

### Likelihood

| Figure | Who was counted, period | Source and date | Rung | Flags | What it does not tell you |
|---|---|---|---|---|---|
| 68% lacked AI governance policies (63% a year earlier). 92% of firms with an AI incident lacked proper AI access controls | Breached firms, Mar 2025 to Feb 2026 | IBM 2026 via Baker Donelson, 2026-07-30 (L-17) | 5 (via press) | [vendor] | Baker Donelson says the 68% is among firms with an AI incident. Varonis says among all breached firms (L-18) |
| 82% found AI agents they did not know about in the past year. 21% have formal decommissioning | 418 IT and security staff, January 2026 | Cloud Security Alliance, 2026-04-21 (L-10) | 5 | [vendor] [self-report] | Unknown agents are a gap, not an incident |
| 71% plan agentic AI within a year, 21% have governance for it | Gartner survey, attribution differs by page | Techstrong, 2026-10-20 (L-43) | 6 | [consulting] | Techstrong says a Q3 survey of IT risk leaders. The V ledger read the Gartner release as a Q2 survey of 2,000+ CIOs |

### Cost

| Figure | Who was counted, period | Source and date | Rung | Flags | What it does not tell you |
|---|---|---|---|---|---|
| 99% reported financial losses from AI risks. 64% lost over US$1M. Average loss US$4.4M among firms with losses, "conservatively estimated" | 975 C-suite leaders, 21 countries, mid 2025 | EY Responsible AI Pulse, 2025-10-08 (L-41) | 5 | [consulting] [self-report] | Covers all AI risks (top three: regulatory non-compliance 57%, sustainability 55%, bias 53%), not only control gaps. Method for the average not shown |
| 86% investigated at least one AI security or operational incident in 12 months. 21% put their worst incident at $1M or more. 43% of those with incidents put total yearly cost at $2M or more | 300 US executives at firms with 1,000+ staff, 11 May to 1 Jun 2026, Harris Poll | WitnessAI, 2026-07 (L-42) | 5 | [vendor] [self-report] | All AI incidents, not only governance failures. Executive estimates |

## Theme 10. Review overload and workforce strain

### Likelihood

| Figure | Who was counted, period | Source and date | Rung | Flags | What it does not tell you |
|---|---|---|---|---|---|
| 40% of US desk workers received workslop (polished but empty AI output) in the last month | 1,150 full-time US desk workers, September 2025 | BetterUp and Stanford Social Media Lab, 2025-09 (L-32) | 5 | [vendor] [self-report] | Self-report. BetterUp sells coaching |
| 38% of developers say reviewing AI code takes more effort than reviewing human code. Only 48% always verify AI code before commit | 1,100+ developers | Sonar, 2026-01-08 (L-34) | 5 | [vendor] [self-report] | Sonar sells code review tools |

### Cost

| Figure | Who was counted, period | Source and date | Rung | Flags | What it does not tell you |
|---|---|---|---|---|---|
| About 2 hours to deal with each instance. About $186 per employee per month. About $9M a year for a 10,000-person firm | Same 1,150 workers | BetterUp workslop page (L-32) | 5 | [vendor] [self-report] | Modelled from self-reported time and pay. Not logged hours |
| Nearly 40% of AI time savings lost to rework. 14% consistently get clear net gains | 3,200 employees at $100M+ firms, November 2025, Hanover Research | Workday, 2026-01-14 (L-33) | 5 | [vendor] [self-report] | Self-estimated time. Workday sells AI agents |

## Theme 11. Loses context and instructions

### Likelihood

| Figure | Who was counted, period | Source and date | Rung | Flags | What it does not tell you |
|---|---|---|---|---|---|
| Average 39% drop in performance when the same task is given over several turns, across six generation tasks. Mostly more unreliability, a small loss in skill | 200,000+ simulated conversations, top open and closed models of 2025 | Laban et al., arXiv 2505.06120, 2025-05-09 (L-35) | 3 | none | Simulated users, 2025 models. Does not measure compaction or memory loss in long work sessions |

### Cost

No figure found. Where I looked: searches on long-context and instruction-following loss, the R1 user complaints (one user's 7 of 20 sessions, VR1-02, no time cost). No survey or study puts hours or money on lost context.

## Theme 12. Outages and capacity shortfalls

### Likelihood

| Figure | Who was counted, period | Source and date | Rung | Flags | What it does not tell you |
|---|---|---|---|---|---|
| 12 incidents in September and 13 in October to 25 Oct 2026 | Claude status feed, all products | status.claude.com RSS, counted 2026-10-25 (L-36) | 2 | none | Feed caps at 25 items. Incident length and scope vary |
| 90-day uptime: claude.ai 99.58%, API 99.64%, Claude Code 99.58%, Cowork 99.57%. 0.42% of 90 days is about 9.1 hours, my arithmetic | Anthropic status page as reported | Unite.AI, 2026-10-25 (L-37) | 6 | none | How partial outages count toward uptime is not stated |
| Major disruption days across leading AI platforms rose from 6 in Q1 2025 to 51 in Q1 2026. Claude 39, Gemini 7, Copilot 3, ChatGPT 2. A day counts when reports pass 10 times normal volume | 3.72 million US Downdetector reports, Jan 2025 to Apr 2026 | Ookla via Broadband Breakfast, 2026-06-10 (L-38) | 3 (via press) | none | User reports, not confirmed downtime. Claude's count may reflect a larger share of heavy users |

### Cost

No figure found. Where I looked: standard and extended searches for AI or LLM outage cost. Splunk's US$15,000 a minute covers all IT downtime, not AI. A $4,000 to $7,500 an hour figure for a 50-person team is a vendor model, not a measurement. Neither is used.

## Theme 13. Safety filters block the wrong things

### Likelihood

| Figure | Who was counted, period | Source and date | Rung | Flags | What it does not tell you |
|---|---|---|---|---|---|
| Safety-tuned models refused up to 80% of "Hard" harmless health prompts. Larger frontier models (GPT-5, Llama-4) refused more | 30 models including GPT-5 and Claude-4, 31,920 harmless boundary prompts in 7 health categories | Health-ORSC-Bench, Findings of ACL 2026 (L-40) | 1 | none | Health domain, hardest prompt tier. "Up to" is the worst case |
| Three Anthropic models refused more than half of a set of reasonable AI safety research tasks | UK AI Security Institute tests, winter 2025 to 2026 | MIT Technology Review, 2026-10-09 (L-39) | 6 | none | Task set and model count not given. Anthropic says later models do this less |

### Cost

No buyer figure found. Anthropic said one classifier type added 24% to its chatbots' compute cost (L-39). That is the vendor's cost, not the user's, so it is not used as this theme's cost.

## Corrections to the main doc found in this pass

| Item | Main doc wording | What the opened page says |
|---|---|---|
| R4 Ch1 (Annals) | 42.8% of gray-area responses | 42.8% applies to thyroid ultrasound scenarios. The overall rate of unneeded tests was 5.4% (L-04) |
| VR3-03 date | Flycatcher article dated 2026-10-09 | The National Law Review article is dated 2026-10-20. The fee opinion is dated 9 Oct 2026 (L-06) |
| VR2-06 survey | Q2 2026 survey of 2,000+ CIOs | Techstrong attributes 71% and 21% to a Q3 survey of IT risk leaders (L-43). Check the Gartner release before quoting the base |
| VR2-13 base | Shadow AI 43%, denominator unconfirmed | Still unconfirmed. Varonis says "of organizations", Baker Donelson says "incidents" (L-17, L-18) |

## Ledger

| Id | Claim | URL | Date | Rung | Opened | Flags |
|---|---|---|---|---|---|---|
| L-01 | Lexis and Thomson Reuters legal AI tools each hallucinate more than 17% of the time, JELS 22:216 | https://law.stanford.edu/publications/hallucination-free-assessing-the-reliability-of-leading-ai-legal-research-tools | 2025-06 | 1 | yes | none |
| L-02 | Abstract: tools hallucinate between 17% and 33% of the time | https://arxiv.org/abs/2405.20362 | 2024-05-30 | 3 (preprint of L-01) | yes | none |
| L-03 | 56% made mistakes from AI use, 66% relied on output without checking it | https://assets.kpmg.com/content/dam/kpmgsites/xx/pdf/2025/05/trust-attitudes-and-use-of-ai-global-report.pdf | 2025-04 | 5 | yes (PDF text extracted) | [consulting] [self-report] |
| L-04 | Six chatbots: thyroid ultrasound 42.8%, EKG 28.3%, overall unneeded tests 5.4% | https://medicalxpress.com/news/2026-10-reveals-ai-chatbots-unnecessary-medical.html | 2026-10-20 | 1 (via press) | yes | none |
| L-05 | At least $145,000 US AI-citation sanctions in Q1 2026, Jan $5,000, Feb $250 | https://www.jdsupra.com/legalnews/the-ai-sanction-wave-145k-in-q1-1240943/ | 2026-04-09 | 6 | yes | none |
| L-06 | Flycatcher: $43,086.59 sought, $38,877.59 awarded, lawyer pays personally, 14 of 60 cases fake | https://natlawreview.com/article/hallucination-sanctions-potential-costs-unverified-ai-citations | 2026-10-20 | 6 | yes | none |
| L-07 | 2,202 decisions on 19 Oct 2026, 5.6 a day, 872 lawyers, Couvrette about $109,700 | https://www.haqq.ai/blog/ai-legal-hallucination-audit | 2026-10-19 | 6 | yes | [vendor] |
| L-08 | Deloitte refunded A$97,587 of a A$440,000 contract | https://greens.org.au/news/media-release/greens-slam-deloittes-unethical-behaviour-and-measly-refund-over-ai-report | 2025-10-09 | 6 | yes | none |
| L-09 | 49.8% unintended agent action, 12.5% trace, 17.5% auto-stop, 32.9% unauthorised MCP server, 54.3% confirmed or suspected | https://campustechnology.com/articles/2026/10/21/unexpected-ai-agent-activity-reported-by-nearly-half-of-organizations-in-recent-survey.aspx | 2026-10-21 | 5 (via press) | yes | [vendor] [self-report] |
| L-10 | 65% had an AI agent incident, impacts 61% data, 43% disruption, 35% financial, 82% unknown agents, 418 responses | https://cloudsecurityalliance.org/press-releases/2026/04/21/new-cloud-security-alliance-survey-reveals-82-of-enterprises-have-unknown-ai-agents-in-their-environments | 2026-04-21 | 5 | yes | [vendor] [self-report] |
| L-11 | o3 reward hacking 39 of 128 RE-Bench runs, 8 of 1,087 HCAST runs | https://metr.org/blog/2025-06-05-recent-reward-hacking/ | 2025-06-05 | 3 | yes | none |
| L-12 | 357 test-pass claims, 178 backed, 80 unbacked, 92 uncheckable, 5 contradicted, one team | https://github.com/anthropics/claude-code/issues/104504 | 2026-10-23 | 3 | yes (GitHub API) | [self-report] |
| L-13 | 48% of employees who use AI uploaded company information to public AI tools, 67% where genAI was banned | https://assets.kpmg.com/content/dam/kpmgsites/xx/pdf/2025/05/trust-attitudes-and-use-of-ai-global-report.pdf | 2025-04 | 5 | yes (PDF text extracted) | [consulting] [self-report] |
| L-14 | 47% personal accounts, 223 violations a month, 2,100 top quarter, 3% of users | https://www.infosecurity-magazine.com/news/personal-llm-accounts-drive-shadow/ | 2026-01-07 | 5 (via press) | yes | [vendor] |
| L-15 | 2.6% of 22.4M prompts sensitive, 17% of exposures via personal or free accounts | https://securityboulevard.com/2026/01/report-massive-amounts-of-sensitive-data-being-shared-with-genai-tools/ | 2026-01-15 | 5 (via press) | yes | [vendor] |
| L-16 | 20% shadow AI breach, $670,000 higher cost at high shadow AI, 13% AI model or app breaches, 63% no AI governance policy | https://newsroom.ibm.com/2025-07-30-ibm-report-13-of-organizations-reported-breaches-of-ai-models-or-applications,-97-of-which-reported-lacking-proper-ai-access-controls | 2025-07-30 | 5 | yes | [vendor] |
| L-17 | IBM 2026: 602 breaches, $4.99M average, AI breaches 21%, shadow AI 43%, $5.39M versus $4.63M, 92% no access controls, 68% no governance | https://www.bakerdonelson.com/ten-takeaways-from-ibms-2026-cost-of-a-data-breach-report | 2026-07-30 | 5 (via press) | yes | [vendor] |
| L-18 | IBM 2026: shadow AI breaches $5.39M up from $4.63M, one in five shadow AI incidents fined | https://www.varonis.com/blog/ibm-cost-of-a-data-breach-report-2026 | 2026-10-14 (last update) | 5 (via press) | yes | [vendor] |
| L-19 | 1.8M injection attacks, 60,000+ policy breaches, 22 agents, nearly all broke within 10 to 100 queries | https://arxiv.org/abs/2507.20526 | 2025-07-28 | 3 | yes | none |
| L-20 | Copilot CLI chain completed in 50% of runs on one model, 28 seconds | https://adversa.ai/blog/cryptographic-context-injection-github-copilot/ | 2026-10-06 | 3 | yes | [vendor] |
| L-21 | Tens to hundreds of thousands of dollars of Gemini API abuse within 24 to 48 hours | https://www.wiz.io/blog/from-phishing-to-llmjacking | 2026-10-20 | 3 | yes | [vendor] |
| L-22 | 13% of 2,002 CIOs significant value, one in five use case success, 58% cost pressure, 51% higher TCO | https://www.financialcontent.com/article/bizwire-2026-10-19-gartner-survey-finds-only-13-of-cios-say-their-enterprise-has-realized-significant-or-transformational-value-from-ai | 2026-10-19 | 5 | yes (gartner.com returned 403, syndicated copy read) | [consulting] [self-report] |
| L-23 | 42% abandoned most AI initiatives (17% prior year), 46% of proofs of concept scrapped | https://www.ciodive.com/news/AI-project-fail-data-SPGlobal/742590/ | 2025-03-14 | 4 (via press) | yes | [self-report] |
| L-24 | Harness: 26% of AI spend wasted, 72% unexpected cost spike, 52% no cost owner, 700 respondents, Sapio, May to Jun 2026 | https://letsdatascience.com/news/harness-report-finds-ai-spend-waste-f0a5fac5 | 2026-07-30 | 5 (via press) | yes | [vendor] [self-report] |
| L-25 | Harness: 26% wasted, about $260,000 a month at $1M monthly spend | https://techstrong.ai/articles/survey-surfaces-massive-amounts-of-wasted-spending-on-ai/ | 2026-07-30 | 5 (via press) | yes | [vendor] [self-report] |
| L-26 | Claude retirement table: 9 IDs retired 28 Oct 2025 to 5 Aug 2026, 60 to 62 days notice, at least 60 days policy | https://platform.claude.com/docs/en/about-claude/model-deprecations | 2026-10-25 (opened) | 2 | yes | none |
| L-27 | Tursio: 98% and 97.3% of tests passed after upgrade, first migration a couple of months, later a couple of weeks | https://arxiv.org/abs/2507.05573 | 2025-07-08 | 3 | yes (PDF text extracted) | [self-report] |
| L-28 | About 30% of 900+ respondents hit usage limits | https://newsletter.pragmaticengineer.com/p/the-impact-of-ai-on-software-engineers-2026 | 2026-04-14 | 4 | yes | [self-report] |
| L-29 | 33 pricing and limit changes in Q3 2026, 22 in September, Copilot credits 3,000 to 1,900 and 7,000 to 3,900 | https://dev.to/kawsarlog/33-ai-pricing-and-usage-limit-changes-in-q3-2026-collected-in-one-free-sheet-2j4o | 2026-10-11 | 6 | yes | none |
| L-30 | Science 2026: 11 models, 49% more affirmation than humans, 47% endorse harmful acts, N 2,405, apologies 50% against 75% | https://the-decoder.com/ai-sycophancy-makes-people-less-likely-to-apologize-and-more-likely-to-double-down-study-finds/ | 2026-03-29 | 1 (via press) | yes | none |
| L-31 | Preprint: 11 models affirm 50% more than humans, N 1,604 | https://arxiv.org/abs/2510.01395 | 2025-10-01 | 3 | yes | none |
| L-32 | Workslop: 40% received last month, 2 hours each, $186 per employee per month, $9M a year per 10,000 staff, 1,150 workers | https://www.betterup.com/workslop | 2025-09 | 5 | yes | [vendor] [self-report] |
| L-33 | Workday: nearly 40% of time savings lost to rework, 14% consistent net gains, 3,200 employees | https://newsroom.workday.com/2026-01-14-New-Workday-Research-Companies-Are-Leaving-AI-Gains-on-the-Table | 2026-01-14 | 5 | yes | [vendor] [self-report] |
| L-34 | Sonar: 38% say AI code review takes more effort, 48% always verify, 1,100+ developers | https://www.sonarsource.com/blog/state-of-code-developer-survey-report-the-current-reality-of-ai-coding/ | 2026-01-08 | 5 | yes | [vendor] [self-report] |
| L-35 | 39% average drop in multi-turn against single-turn, 200,000+ simulated chats | https://arxiv.org/abs/2505.06120 | 2025-05-09 | 3 | yes | none |
| L-36 | Claude status feed: 12 incidents in September, 13 in October to 25 Oct 2026 | https://status.claude.com/history.rss | 2026-10-25 | 2 | yes (feed downloaded and counted) | none |
| L-37 | 90-day uptime 99.58%, 99.64%, 99.58%, 99.57% | https://www.unite.ai/anthropic-investigates-elevated-errors-across-five-claude-models/ | 2026-10-25 | 6 | yes | none |
| L-38 | Major AI disruption days 6 in Q1 2025, 51 in Q1 2026, Claude 39 | https://broadbandbreakfast.com/ookla-ai-outages-are-becoming-a-business-reliability-problem/ | 2026-06-10 | 3 (via press) | yes | none |
| L-39 | UK AISI: three Anthropic models refused over half of reasonable safety tasks. Anthropic: one classifier type added 24% to compute cost | https://www.technologyreview.com/2026/10/09/1145728/we-are-putting-too-much-faith-in-ai-to-say-no/ | 2026-10-09 | 6 | yes | [self-report] for the 24% |
| L-40 | Up to 80% of Hard benign health prompts refused, 30 models, 31,920 prompts | https://aclanthology.org/2026.findings-acl.1177.pdf | 2026-07 | 1 | yes (PDF text extracted) | none |
| L-41 | EY: 99% losses from AI risks, 64% over US$1M, average US$4.4M, 975 C-suite | https://www.ey.com/en_gl/newsroom/2025/10/ey-survey-companies-advancing-responsible-ai-governance-linked-to-better-business-outcomes | 2025-10-08 | 5 | yes | [consulting] [self-report] |
| L-42 | WitnessAI: 86% investigated AI incidents, 21% worst incident $1M or more, 43% total $2M or more, 300 executives, Harris Poll | https://witness.ai/wp-content/uploads/2026/07/WitnessAI_2026_Enterprise_AI_Risk_Survey-1.pdf | 2026-07 | 5 | yes (PDF text extracted) | [vendor] [self-report] |
| L-43 | 71% plan agentic AI within a year, 21% have governance capability | https://techstrong.ai/articles/cios-must-compound-ai-value-faster-than-accelerating-risk-gartner-warns/ | 2026-10-20 | 6 | yes | [consulting] |
| L-44 | Stack Overflow 2026: 38% of employers set usage limits, 30,000+ respondents | https://stackoverflow.blog/2026/10/06/the-results-of-the-2026-developer-survey-are-here/ | 2026-10-06 | 4 | yes | [self-report] |
| L-45 | Average sunk cost per abandoned AI initiative $7.2M. Not used, no sample or method | https://research.agilebrandguide.com/chart/the-average-sunk-cost-per-abandoned-ai-initiative-was-72-million | 2026 | 6 | yes | none |
| L-46 | 400+ engineering hours for one healthcare model migration. Not used, no source named | https://tianpan.co/blog/2026-04-13-the-model-deprecation-cliff | 2026-04-13 | 6 | yes | none |
| L-47 | Endor Labs audit: 34% of 2,614 MCP servers open to command injection. Not used, seen only in secondary pages | search results only | 2026 | 7 | no | [vendor] |
| L-48 | Stanford HAI write-up of L-01 and Stanford news page on L-30. Not used, pages returned no text or a bot check | https://hai.stanford.edu/news/ai-trial-legal-models-hallucinate-1-out-6-queries and https://news.stanford.edu/stories/2026/03/ai-advice-sycophantic-models-research | n/a | 7 | no | none |
