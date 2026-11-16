# Analyst forecasts on AI, productivity, work hours and time saved

Status key. Verified means checked against the source or consistent primary coverage in this session (2026-10-27). Plausible means well known and widely cited but not re-checked here. Estimate means our own reading or rough figure.

## Big picture

Forecasts split into two camps. Top-down "exposure" studies (McKinsey, Goldman, IMF, WEF) give large numbers about tasks that could be automated. Bottom-up measured studies (Fed surveys, Denmark, call centres, METR) find small or mixed time savings today. Exposure is a ceiling, not a forecast of hours actually saved.

## Summary table

| Source | Headline | Horizon | Kind | Status |
|---|---|---|---|---|
| McKinsey MGI 2025 | Agents and robots could automate 57% of US work hours. $2.9tn value | Potential today, value by 2030 | Exposure | Verified |
| McKinsey 2023 | Gen AI adds $2.6tn to $4.4tn a year. Automation of 60% to 70% of time | To 2040s | Exposure | Plausible |
| Goldman Sachs 2023 | 300m full-time jobs exposed. Global GDP up 7% | 10 years | Exposure plus model | Plausible (primary blocked, secondary consistent) |
| IMF 2024 | 40% of global jobs exposed, 60% in advanced economies | Not dated | Exposure | Verified |
| OECD Employment Outlook 2023 | About 27% of jobs in high-risk occupations | Not dated | Exposure | Plausible (secondary consistent) |
| WEF Future of Jobs 2025 | 170m jobs created, 92m displaced, net plus 78m | 2025 to 2030 | Employer survey | Plausible (primary blocked, secondary consistent) |
| Stanford AI Index 2026 | Gen AI reached 53% of population. First signs of entry-level displacement | Retrospective | Data compilation | Plausible (secondary coverage) |
| Epoch AI | Full automation scenarios with explosive growth, GATE model | Decades | Model | Verified (model exists, framed as scenarios) |
| PwC Jobs Barometer 2025 | Productivity growth 27% vs 9% in exposed vs least exposed sectors. 56% AI skill wage premium | 2018 to 2024 | Job ads, correlation | Verified |
| Microsoft/LinkedIn WTI 2024 | 75% of knowledge workers use AI | Snapshot | Survey | Plausible |
| St Louis Fed, Bick Blandin Deming 2025 | Users save 5.4% of hours. About 1.4% of all hours. Implied 1.1% productivity | Nov 2024 snapshot | Survey | Verified |
| Humlum and Vestergaard 2025 | Time saved 2.8% to 3%. No effect on earnings or hours | 2023 to 2024 | Survey linked to Danish registers | Verified |
| Brynjolfsson, Li, Raymond 2023/2025 | 14% more issues resolved per hour, 34% for novices | Months | Field study, staggered rollout | Verified |
| METR 2025 | Experienced devs 19% slower with AI, while believing they were 20% faster | Early 2025 tools | RCT, 16 devs, 246 tasks | Verified |

## Each source

### McKinsey Global Institute
- Headline: "Agents, robots, and us" (Nov 2025). Today's technology could in theory automate about 57% of US work hours, 44% by agents and 13% by robots. About $2.9tn of US value a year by 2030 if workflows are redesigned. Verified. https://www.eweek.com/news/ai-could-automate-half-us-jobs/ and https://fortune.com/2025/11/25/why-ai-wont-take-your-job-partnership-agents-robots-mckinsey/
- Earlier: "Economic potential of generative AI" (June 2023). $2.6tn to $4.4tn a year from 63 use cases. Gen AI plus other tech could automate 60% to 70% of employee time. Half of today's work automated between 2030 and 2060, midpoint 2045. Plausible. https://www.mckinsey.com/capabilities/mckinsey-digital/our-insights/the-economic-potential-of-generative-ai-the-next-productivity-frontier
- Method: task-level scoring of about 2,000 work activities against technical capability, then adoption S-curves.
- Assumptions: full workflow redesign, adoption pace, redeployment of freed hours.
- Track record: the 2017 "A future that works" said about half of activities were automatable and up to 800m workers displaced by 2030. Measured displacement so far is far below that path. MGI has pulled its automation midpoint earlier by about a decade since 2017, so its timelines move with hype. Estimate.

### Goldman Sachs
- Headline: Briggs and Kodnani (Mar 2023). Gen AI could expose the equivalent of 300m full-time jobs. Two thirds of US jobs exposed to some automation, a quarter to a third of work could be replaced. Global GDP up 7% (about $7tn) and US labour productivity growth up about 1.5 points a year over 10 years. Plausible. Goldman page returned 403. Secondary coverage (Investing.com, The Register, Mar 2023) matches 300m, two thirds, a quarter, 7% and about $7tn. The 1.5 point figure had thinner support. Note the 300m was extrapolated from US and European data. https://www.goldmansachs.com/insights/articles/generative-ai-could-raise-global-gdp-by-7-percent
- Method: O*NET task exposure mapped to occupations, then a productivity model.
- Assumptions: wide adoption within 10 years, displaced workers reemployed.
- Track record: Goldman later said the macro effect would mostly arrive after 2027 and its own economists (eg Jim Covello, 2024) questioned the capex payoff. Daron Acemoglu's 2024 estimate is far lower, no more than 0.66% total factor productivity over 10 years. Verified. https://www.nber.org/papers/w32487

### IMF
- Headline: Cazzaniga et al, "Gen-AI and the Future of Work" (Jan 2024). About 40% of global jobs exposed, 60% in advanced economies, 26% in low income (40% in emerging markets). About half of exposed jobs in advanced economies may benefit from complementarity. Verified. https://www.imf.org/en/Blogs/Articles/2024/01/14/ai-will-transform-the-global-economy-lets-make-sure-it-benefits-humanity and https://www.imf.org/en/Publications/Staff-Discussion-Notes/Issues/2024/01/14/Gen-AI-Artificial-Intelligence-and-the-Future-of-Work-542379
- Method: Felten AI occupational exposure index plus a complementarity index.
- Assumptions: exposure is not loss. No timeline.
- Track record: IMF growth forecasts have a known optimism bias in medium-term projections. Estimate.

### OECD Employment Outlook
- Headline: 2023 edition. Occupations at highest risk of automation account for about 27% of employment on average across OECD countries. High risk means jobs using more than 25 of 100 skills experts judge easy to automate. Plausible, consistent Reuters coverage (Jul 2023), primary not opened. https://www.rte.ie/news/business/2023/0711/1394003-oecd-on-risks-of-ai-to-jobs and https://www.oecd.org/employment-outlook/
- Method: expert and worker surveys, exposure indices.
- Track record: the 2016 Arntz, Gregory, Zierahn work put automatable jobs near 9%, against Frey and Osborne's 47% (2013). Neither came true as a loss of jobs. OECD numbers have been the more conservative and closer to outcomes. Estimate.

### WEF Future of Jobs 2025
- Headline: 170m new jobs and 92m displaced by 2030, net 78m. 39% of key skills change by 2030. Plausible. WEF pages returned 403. Secondary coverage matches all three numbers and the sample (over 1,000 employers, 14m workers, 22 industries, 55 economies). https://www.wionews.com/world/world-economic-forum-wef-report-78-million-new-jobs-added-by-2030-led-by-ai-big-data-and-cybersecurity-8602988 and https://www.weforum.org/publications/the-future-of-jobs-report-2025/
- Method: survey of over 1,000 employers covering 14m workers.
- Assumptions: employer intent, not observed hiring.
- Track record: 2018 report said 75m displaced and 133m created by 2022. 2020 report said 85m displaced and 97m created by 2025. Each edition restates the net-positive story with new numbers, and outcomes are hard to audit. Estimate.

### Stanford AI Index 2025 and 2026
- 2025 edition: compiles studies showing AI narrows skill gaps and lifts productivity in controlled settings. 78% of organisations used AI in 2024. Plausible. https://hai.stanford.edu/ai-index/2025-ai-index-report
- 2026 edition (Apr 2026): gen AI reached 53% of population. First concrete evidence of entry-level displacement. Terminal-Bench success up from 20% to 77.3%. Plausible, several secondary write-ups agree on 53% and 77.3%. No figure found for entry-level displacement, so treat that line as a qualitative reading. Primary report not opened. https://www.unite.ai/stanford-ai-index-2026-reveals-a-field-racing-ahead-of-its-guardrails/
- Method: a compilation, not a forecast. Track record: not applicable. Useful as a neutral data source.

### Epoch AI
- Headline: GATE model and "explosive growth" work argue that full automation of work could lift growth rates many fold. Also tracks compute growth around 4x to 5x a year. GATE verified as an integrated assessment model run across scenarios. The 4x to 5x figure was not rechecked. Plausible. https://epoch.ai/gate and https://arxiv.org/abs/2503.04941 and https://epoch.ai/
- Method: growth models fed by compute scaling trends.
- Assumptions: AI can substitute for most labour, compute keeps scaling.
- Track record: compute and training-cost trend forecasts have held well. Macro growth claims are scenarios, untested. Estimate.

### PwC Global AI Jobs Barometer 2025
- Headline: productivity growth in most AI-exposed industries rose from 7% (2018 to 2022) to 27% (2018 to 2024). Least exposed went from 10% to 9%. AI skill wage premium 56%, up from 25%. Jobs in exposed roles grew 38% from 2019 to 2024. Verified. https://www.pwc.com/gx/en/news-room/press-releases/2025/ai-linked-to-a-fourfold-increase-in-productivity-growth.html
- Method: close to a billion job ads plus sector productivity data.
- Assumptions: correlation, not cause. Exposed sectors (finance, software) were growing fast anyway.
- Track record: a young series (since 2024). The 2024 and 2025 premium figures swung from 25% to 56%, which suggests sensitivity to method. Estimate.

### Microsoft and LinkedIn Work Trend Index
- 2024: 75% of knowledge workers use gen AI at work, 78% bring their own tools. Plausible. https://www.microsoft.com/en-us/worklab/work-trend-index/ai-at-work-is-here-now-comes-the-hard-part
- 2025: "Frontier Firm" framing, human-agent teams. Plausible. https://www.microsoft.com/en-us/worklab/work-trend-index/2025-the-year-the-frontier-firm-is-born
- Method: online survey of about 31,000 people in 31 countries plus Microsoft 365 telemetry.
- Track record: vendor research with a commercial interest. Self-reported use runs ahead of measured gains. Estimate.

### St Louis Fed and NBER, Bick, Blandin and Deming
- Headline: users saved 5.4% of work hours in the prior week. Across all workers about 1.4%. Implied productivity gain about 1.1%. Verified. https://www.stlouisfed.org/on-the-economy/2025/feb/impact-generative-ai-work-productivity
- Earlier: NBER w32966 (2024) found 39% of US adults aged 18 to 64 used gen AI, faster than PC and internet adoption. Plausible. https://www.nber.org/papers/w32966
- Method: Real-Time Population Survey, nationally representative, Nov 2024.
- Assumptions: self-reported time saved, value of saved time equal to output.
- Track record: new series. Best current measured estimate for the US. Note that a separate 1.3% to 5.4% range is share of hours assisted, not time saved.

### Humlum and Vestergaard, Denmark
- Headline: "Large Language Models, Small Labor Market Effects" (NBER w33777, 2025). Average time saved 2.8% to 3%. Earnings and hours effects ruled out above 1%. Only 3% to 7% of gains passed to workers. Verified. https://bfi.uchicago.edu/wp-content/uploads/2025/04/BFI_WP_2025-56-3.pdf
- Method: surveys of 25,000 workers in 11 exposed occupations at 7,000 workplaces, linked to registry data, difference in differences.
- Assumptions: 2023 to 2024 chatbot era. Freed time often goes to new AI-related tasks.
- Track record: not applicable. Strong design. Strongest counterweight to exposure studies.

### Brynjolfsson, Li and Raymond, call centre
- Headline: 14% more issues resolved per hour, 34% for novice and low-skill agents, little gain for top agents. Verified (QJE 2025, abstract rechecked 2026-10-27). https://www.nber.org/papers/w31161
- Method: staggered rollout across 5,179 support agents at a Fortune 500 software firm.
- Assumptions: narrow, scripted task. Hard to extend to the whole economy.
- Track record: Brynjolfsson's "productivity J-curve" view predicted slow measured gains then a pickup, which is so far consistent with data. Estimate.

### METR developer study
- Headline: RCT (July 2025). 16 experienced open-source developers on 246 tasks in their own repos were 19% slower with early-2025 AI tools (Cursor with Claude 3.5 and 3.7 Sonnet). They expected 24% speed-up and afterwards believed they had been 20% faster. Verified. https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/
- Method: random assignment of tasks to AI allowed or not.
- Assumptions: mature large codebases, expert devs, tools of early 2025.
- Track record: METR's task horizon metric (length of tasks AI can do doubles about every 7 months) has tracked new model releases well so far. Estimate.

## What this means for a time study

1. Use measured studies for today's baseline. About 1% to 3% of all hours saved economy-wide, 5% to 15% for active users on suited tasks. Estimate.
2. Treat exposure numbers (40%, 57%, 300m) as ceilings, not plans.
3. Self-reported time saved runs ahead of measured output (METR gap of about 40 points between belief and result). Measure with logs, not surveys.
4. Gains are biggest for novices and narrow, structured tasks.
5. Saved time does not become output by default. Denmark shows little shows up in earnings or hours.

## Verification log (2026-10-27)

| Claim | Action | Source opened |
|---|---|---|
| Goldman 300m jobs, 7% GDP, 1.5 pts | Kept Plausible. Primary blocked (403). Secondary matches. 1.5 pts thinly supported | goldmansachs.com (403), uk.investing.com, theregister.com |
| Acemoglu TFP in Goldman section | Corrected from about 0.7% to no more than 0.66% (0.7% matches the older April 2024 draft) | nber.org/papers/w32487 |
| IMF 40%, 60%, 26%, half benefit | Upgraded to Verified. Added 40% for emerging markets | imf.org blog, Jan 14 2024 |
| OECD 27% | Kept Plausible. Reuters coverage consistent, added definition | rte.ie, Jul 2023 |
| WEF 170m, 92m, 78m, 39% | Kept Plausible. Primary blocked (403). Secondary consistent | wionews.com, eweek.com |
| Stanford AI Index 2026 | Kept Plausible. 53% and 77.3% in several write-ups. Entry-level line is qualitative | unite.ai, medium.com |
| Epoch GATE | Upgraded. Model and scenario framing confirmed. Compute 4x to 5x not rechecked | epoch.ai/gate, arxiv 2503.04941 |
| METR 19% slower, 24% expected, 20% believed, 16 devs, 246 tasks | Upgraded to Verified | metr.org blog |
| Brynjolfsson 14%, 34%, 5,179 agents | Verified, confirmed | nber.org/papers/w31161 |

Not rechecked in this pass: McKinsey 2023 and 2025, PwC, Microsoft WTI, St Louis Fed, Humlum. Missing claims worth adding: the Brynjolfsson and Gordon Long Bet as a live scoreboard (US productivity rose 2.7% in 2024), and the Bick, Blandin, Deming update if a 2025 or 2026 wave exists.
