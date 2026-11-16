# 13. Gemini gaps: time spent vs time saved

Tags. Verified means the primary page was opened in this pass. Plausible means the figure comes from search snippets or good secondary coverage but the primary was not opened. Estimate means our own arithmetic or judgement.

Researched 27 Oct 2026. About 22 web searches and 5 primary page opens.

## 1. Hidden AI use and who keeps the saved time

| Fact | Tag | Source |
|---|---|---|
| 75% of knowledge workers use AI at work. 78% of AI users bring their own AI tools. Survey of 31,000 people in 31 countries. The claim that over half are reluctant to admit use is not on the blog page and needs the full report. | Verified for 75%, 78% and sample (blog opened). Reluctance figure Unverified | https://blogs.microsoft.com/blog/2024/05/08/microsoft-and-linkedin-release-the-2024-work-trend-index-on-the-state-of-ai-at-work/ |
| 48% of desk workers would be uncomfortable telling their manager they used AI for at least one of 11 common tasks. Top reasons: feels like cheating (47%), seen as less competent (46%), seen as lazy (46%). Slack Fall 2024 Workforce Index. | Verified (page opened) | https://slack.com/intl/en-in/blog/news/the-fall-2024-workforce-index-shows-executives-and-employees-investing-in-ai-but-uncertainty-holding-back-adoption |
| KPMG and University of Melbourne 2025: 48,340 people, 47 countries, Nov 2024 to Jan 2025, 32,352 employees. Among employees who use AI, 66% relied on AI output without critically evaluating it and 56% made mistakes in their work from AI use (p. 75). | Verified (full PDF opened) | https://assets.kpmg.com/content/dam/kpmgsites/xx/pdf/2025/05/trust-attitudes-and-use-of-ai-global-report.pdf |
| Same study: 57% of AI-using employees admit non-transparent use, either presenting AI content as their own or avoiding revealing they used AI. Almost one in two (47%) say they used AI in ways that could be inappropriate, and the report says almost one in two use it in ways that contravene policy. 48% uploaded company information to public AI tools. 56% used AI at work without knowing if it is allowed (p. 75). These are self-reports that the authors say may be under-reported. | Verified (full PDF opened) | https://assets.kpmg.com/content/dam/kpmgsites/xx/pdf/2025/05/trust-attitudes-and-use-of-ai-global-report.pdf |
| Korea survey (Suh and Oh, 2026 working paper): 51.8% use generative AI at work, work time down 3.8%, correlation between time saved and output change near zero (the 0.008 value is not in the abstract). Authors read this as on-the-job leisure. | Verified (arXiv abstract opened) | https://arxiv.org/abs/2602.12695 |
| Zoom with Morning Consult, Mar 2026: 76% of AI-using knowledge workers save 30+ minutes a day (43% an hour or more), and 80% would use the time for a real break. Vendor survey. | Verified (Fortune article opened, not the Zoom release) | https://www.fortune.com/2026/03/25/workers-using-ai-reclaim-time-zoom-research-skipping-meetings-taking-gym-classes-time-back |
| Counter evidence: Upwork July 2024 found 77% of AI-using employees said AI added to their workload. Top cause: more time reviewing or moderating AI-generated content (39%), then learning the tools (23%). Base is AI-using full-time employees, a subset of 625. | Plausible (opened nothing primary. Tried upwork.com/research/ai-enhanced-work-models 403, investors.upwork.com release 403, investors.upwork.com/node/11011/pdf 403, prnewswire 404, web.archive.org snapshots 429 and 403, researchpool 403, moomoo copy empty. 77% of AI-using full-time employees and 39% reviewing or moderating AI content match unleash.ai and other coverage. Sample per coverage: 2,500 in US, UK, Australia and Canada, of whom 625 full-time employees) | https://investors.upwork.com/news-releases/news-release-details/upwork-study-finds-employee-workloads-rising-despite-increased-c |

Takeaway (Estimate). Hidden use is the norm, not the edge case. When use is hidden, saved time is invisible to the firm and stays with the worker as slack. The one study that measures both time and output (Korea) finds the time saving does not show up as output. Firms should expect most early savings to be kept by workers until work is redesigned openly.

## 2. Checking cost: where review cancels the saving

| Fact | Tag | Source |
|---|---|---|
| METR RCT, 16 experienced open source developers, 246 tasks in their own repos. With AI allowed, tasks took 19% longer. They forecast 24% faster and still believed afterwards they were 20% faster. | Verified | https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/ |
| BCG and Harvard jagged frontier, 758 consultants: inside the frontier 12.2% more tasks, 25.1% faster, 40% higher quality. Outside the frontier, AI users were 19 percentage points less likely to be correct. | Plausible | https://d3.harvard.edu/?p=18394 |
| DORA 2024: per 25% rise in AI adoption, documentation quality up 7.5%, code quality up 3.4%, review speed up 3.1%. Delivery throughput down an estimated 1.5% and delivery stability down 7.2%. 39% have little or no trust in AI code. | Verified | https://cloud.google.com/blog/products/devops-sre/announcing-the-2024-dora-report |
| DORA 2025: adoption about 90%. AI now links to higher throughput but still to higher instability (more change failures and rework). AI acts as an amplifier of existing strengths and weaknesses. | Plausible | https://www.infoq.com/news/2025/09/dora-state-of-ai-in-dev-2025 |
| GitClear 2025, 211M changed lines 2020 to 2024: cloned lines up from 8.3% to 12.3% of changes, moved (refactored) lines down from 25% to under 10%. Short term churn rose. | Verified | https://www.gitclear.com/ai_assistant_code_quality_2025_research |
| Stack Overflow 2025: 46% distrust AI accuracy (31% a year earlier), 3% highly trust. Top frustration (66%) is answers "almost right, but not quite". 45% say debugging AI code takes longer. | Plausible | https://www.infoworld.com/article/4031673/ai-use-among-software-developers-grows-but-trust-remains-an-issue-stack-overflow-survey.html |

### Break-even formula (Estimate, worked cases are illustrative)

Net saved per task = G x s minus R minus (p x F)

- G = time to do the task by hand
- s = share of generation time AI removes
- R = extra review time spent checking AI output
- p = chance the output is wrong and slips past review or needs a redo
- F = time to find and fix it later (rework)

Break even when G x s = R + p x F.

Illustrative worked cases, G = 60 minutes. These numbers are assumptions, not measurements.

| Case | s | R | p | F | Net |
|---|---|---|---|---|---|
| Inside frontier, simple task (BCG style) | 0.25 | 5 min | 0.05 | 30 min | +8.5 min (about 14%) |
| Mature codebase, expert user (METR style) | 0.30 | 18 min | 0.20 | 45 min | minus 9 min (about 15% slower, close to METR's 19%) |
| Outside frontier | 0.25 | 10 min | 0.40 | 60 min | minus 19 min |

The inputs s, R, p and F are illustrative and set to match the measured outcomes above. They are not measured directly by any one study. The rule of thumb: the saving survives only when review is cheap and the error rate is low. Experts on familiar work have small G x s to gain and still pay full R.

## 3. Energy-limited scenario

| Fact | Tag | Source |
|---|---|---|
| IEA Energy and AI (Apr 2025): data centres used about 415 TWh in 2024 (about 1.5% of world power), rising to about 945 TWh by 2030, slightly more than Japan uses today. AI-optimised demand more than quadruples. About 1,200 TWh by 2035. US data centres take almost half of US demand growth to 2030. | Plausible (IEA page returned 403, figures consistent across coverage) | https://www.iea.org/reports/energy-and-ai/executive-summary |
| IEA also flags that around 20% of planned data centre projects could be at risk of delay from grid constraints. | Plausible (consistent secondary coverage, IEA primary not opened) | same |
| LBNL Queued Up 2024: nearly 2,600 GW of generation and storage waiting to connect at end 2023, more than twice installed US capacity. | Plausible (LBNL page returned 403, about 1,570 GW generation plus 1,030 GW storage confirmed in search extracts) | https://emp.lbl.gov/publications/queued-2024-edition-characteristics |
| LBNL 2025 edition: median time from request to operation rose from under 2 years (built 2000 to 2007) to over 4 years (built 2018 to 2024). Only 13% of capacity requested 2000 to 2019 was built. | Plausible (median over 4 years confirmed in LBNL search extract. 13% not reconfirmed) | https://eta-publications.lbl.gov/bibcite/reference/36607 |
| Ireland: data centres used 18% of metered electricity in 2022 and 21% in 2023 (5% in 2015). EirGrid effectively paused new Dublin connections until about 2028. Later CSO figures near 23%. | Verified for 18% in 2022 (CSO page opened). 21% for 2023 Plausible. Dublin pause and 23% Unverified | https://www.cso.ie/en/releasesandpublications/ep/p-dcmec/datacentresmeteredelectricityconsumption2022/keyfindings/ |
| Virginia: Dominion said in Aug 2024 that large (100 MW+) data centres could wait up to seven years for power. | Verified (article opened, citing Bloomberg 30 Aug 2024) | https://www.datacenterknowledge.com/energy-power-supply/data-centers-face-seven-year-wait-for-power-hookups-in-virginia |
| Netherlands: Amsterdam and Haarlemmermeer paused new data centres in July 2019. Later power caps of 670 MVA (Amsterdam) and 750 MVA (Haarlemmermeer) to 2030. National hyperscale rule caps sites at 10 ha and 70 MW. | Unverified (DCD page returned 403) | https://www.datacenterdynamics.com/en/analysis/the-ongoing-impact-of-amsterdams-data-center-moratorium |

What a power cap does (Estimate). If compute grows only as fast as new grid connections (4 to 7 years per large site), AI capacity is rationed. Price per token falls more slowly, so use spreads first to high value tasks and stays thin in low value ones. Adoption curves stretch rather than stop. Inference efficiency gains (smaller models, better chips) become the main source of new capacity. In a hard cap scenario, expect adoption to lag the unconstrained path by several years in power-tight regions, and the time-saved story to arrive unevenly by country.

## 4. Location chosen by power

| Fact | Tag | Source |
|---|---|---|
| Microsoft signed a 20-year PPA with Constellation to restart Three Mile Island Unit 1 (Crane Clean Energy Center), 835 MW, target 2028. | Verified for 20 years and 835 MW (Orrick page opened). 2028 target not on that page | https://www.orrick.com/en/News/2024/10/Microsoft-Signs-20-Year-PPA-with-Constellation |
| Stargate Abilene, Texas: about 1.2 GW planned by Q4 2026, powered by on-site gas and grid power including local wind. Seven US Stargate sites total over 9 GW. The 360 MW turbine figure and batteries and solar were not on the page. | Verified (Epoch page opened) | https://epoch.ai/blog/openai-stargate-where-the-us-sites-stand |
| Stargate UAE: 1 GW cluster inside a 5 GW Abu Dhabi campus, first 200 MW in 2026, powered by nuclear, solar and gas. | Verified for 1 GW inside 5 GW campus (article opened). 200 MW and power mix Unverified | https://www.thenationalnews.com/future/technology/2025/05/22/abu-dhabis-g42-teams-up-with-big-tech-companies-to-build-stargate-uae |
| Nordics (cheap hydro and cool climate, eg Stargate Norway) | Plausible, not searched in this pass | needs a source |

Takeaway (Estimate). The pattern is consistent. Sites follow firm power first (gas in Texas, nuclear in Pennsylvania and UAE, hydro in the Nordics) and fibre and talent second. Power-poor hubs (Dublin, Amsterdam, Loudoun) are being skipped for new large builds.

## 5. Skills over degrees

| Fact | Tag | Source |
|---|---|---|
| Burning Glass Institute and HBS (Feb 2024): actual hiring change reached fewer than 1 in 700 hires. About 45% of firms changed postings in name only. 37% of firms removed degree requirements and drove nearly all real change. Leader firms raised non-degree hiring by nearly 20%, and non-degree staff there had 10 points higher retention. The fourfold rise and 97,000 of 77M figures were not on the page. | Verified (page opened) | https://pw.hks.harvard.edu/post/skills-based-hiring-the-long-road-from-pronouncements-to-practice |
| LinkedIn: skills-first hiring expands talent pools by roughly 9x to 17x depending on group and sector (about 10x in manufacturing). No global or US multiplier is on the page. | Unverified as originally stated (page opened, 10x and 19x to 20x not found) | https://linkedin.github.io/skills-first-report |
| US registered apprentices about 680,000 in FY2024, up 114% from about 318,000 in FY2014. | Verified (CC Daily summary of DOL report, DOL primary not opened) | https://www.ccdaily.com/?p=31489 |

Takeaway (Estimate). Pronouncements are far ahead of practice. Degree removal is common, skills-based hiring in real numbers is tiny, and apprenticeships are growing from a small base.

## 6. Judging the Gemini claims

| Claim | Verdict | Evidence |
|---|---|---|
| (a) Top analysts predict a 30 to 32 hour standard week by 2045 | Unsupported | No analyst forecast for 2045 found. Nearest: Autonomy (2023) said 28% of UK workers could move to 32 hours by 2033. Dimon guessed 3.5 days in 20 to 40 years. Zoom CEO said maybe within 20 years. These are opinions, not a consensus forecast. (Plausible) https://www.euronews.com/2023/11/20/millions-could-be-working-a-four-day-week-by-2033-thanks-to-ai-report-claims |
| (b) AI adds 1.5% to 3% a year to labour productivity for two decades | Unsupported as stated | Goldman (2023) said about 1.5 points a year over 10 years, and only once widely adopted. McKinsey says 0.1% to 0.6% a year to 2040 from gen AI. No major source says 3% for 20 years. The low end matches one bank's 10-year scenario only. (Plausible) https://cfodive.com/news/generative-ai-annually-boost-productivity-through-2040-mckinsey-technology/653301 |
| (c) Net leisure change from technology is 0% | False | US annual hours per worker fell from about 3,100 in 1870 to about 1,789 in 2023 (OWID). Technology-led productivity has been taken partly as leisure over the long run. (Verified for 1870 at about 3,100 via OWID data) https://ourworldindata.org/grapher/annual-working-hours-per-worker |
| (d) Factory workers averaged 14 to 16 hours a day and over 3,000 hours a year in the mid 1800s | Partly supported | Over 3,000 hours a year is in line with Huberman and Minns style estimates (about 3,000 to 3,600 hours in 1850 to 1870). 14 to 16 hours a day as an average is overstated. That fits early 1800s textile mills, while mid century averages were nearer 10 to 12 hours over six days. (Plausible) |
| (e) Henry Ford introduced the 5-day week in 1926 | Supported | Ford factory workers moved to a five-day, 40-hour week on 1 May 1926, office staff from August. The 8-hour day came earlier, in 1914. (Verified, page opened) https://www.history.com/this-day-in-history/may-1/ford-factory-workers-get-40-hour-week |
| (f) US working hours unchanged since 1970 | False, though change is small | OWID (Penn World Table) series: about 1,915 hours in 1971 to about 1,789 in 2023, a fall of about 7%. Weekly hours for full-time workers have been flat near 40, which is probably what the claim confuses. (Verified, OWID data opened) https://ourworldindata.org/grapher/annual-working-hours-per-worker |

## Gaps to close next

- Open the Upwork report or release from a network that is not blocked.
- Open the IEA report PDF for the grid delay share.
- Find a Nordics primary source (eg Stargate Norway).
- Open Huberman and Minns (2007) for the 1850 to 1870 hours figure.

## Verification log (27 Oct 2026)

| Claim | Result | Source opened |
|---|---|---|
| Microsoft WTI 75% use, 78% BYOAI, 31,000 in 31 countries | Verified. Reluctance figure not on page | blogs.microsoft.com |
| Slack 48% uncomfortable, 47/46/46 reasons | Verified | slack.com |
| KPMG and Melbourne 57% non-transparent use, 66% no checking, close to half against policy | Verified. Full PDF p. 75, all three match. Base is AI-using employees, n=32,352 employees in 47 countries | https://assets.kpmg.com/content/dam/kpmgsites/xx/pdf/2025/05/trust-attitudes-and-use-of-ai-global-report.pdf |
| Suh and Oh, Korea, 3.8% less work time | Verified. Use is 51.8%. 0.008 not in abstract | arxiv.org |
| Zoom 2026, 76% save 30+ minutes | Verified via Fortune | fortune.com |
| Upwork 2024, 77% more workload, 39% review | Plausible. All Upwork URLs 403, archive 429 and 403, prnewswire 404. Matches unleash.ai coverage | https://www.unleash.ai/artificial-intelligence/ai-creates-more-work-for-77-of-employees-says-upwork |
| LBNL 2,600 GW, median over 4 years | Plausible. Page returned 403 | search |
| Dominion seven year wait | Verified | datacenterknowledge.com |
| Ireland CSO 21% | Corrected. 18% in 2022, 21% in 2023 | cso.ie |
| Amsterdam caps | Unverified. Page returned 403 | none |
| Three Mile Island 835 MW, 20 years | Verified. 2028 not on page | orrick.com |
| Stargate Abilene 1.2 GW | Verified. 360 MW turbines removed | epoch.ai |
| Stargate UAE 1 GW in 5 GW campus | Verified. 200 MW and power mix Unverified | thenationalnews.com |
| Burning Glass and HBS under 1 in 700 | Verified. 37% reworded, fourfold and 97,000 not found | pw.hks.harvard.edu |
| LinkedIn 10x talent pool | Downgraded to Unverified as stated | linkedin.github.io |
| US apprentices 680,000 | Verified via CC Daily summary | ccdaily.com |
| IEA 20% of projects at risk | Plausible. Secondary only | search |
| Ford five-day week 1 May 1926 | Verified | history.com |
| US annual hours 1971 vs 2023 | Corrected to 1,915 and 1,789 | ourworldindata.org |
| Break-even worked cases | Arithmetic checked. Labelled illustrative | none |
