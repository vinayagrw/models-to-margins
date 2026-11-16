# 12. Forecast audit: McKinsey 2017 and WEF 2018

Audit date 2026-10-27. Tags: Verified (primary source opened this session), Plausible (known from secondary reporting or earlier reading, not opened today), Estimate (our own arithmetic or judgement).

Access note. Second pass on 2026-10-27. McKinsey live pages and direct mckinsey.com PDFs still time out, so McKinsey sources were opened as web.archive.org snapshots of the original pages and PDFs. WEF 2020 and 2023 PDFs opened from www3.weforum.org/docs. ILO, OECD and BLS figures were pulled from their own data APIs. See the Verification log at the end.

Covid note. 2020 to 2022 job losses and gains were driven by lockdowns, furlough schemes and the rebound, not by automation. Any net job count for that window cannot be pinned on machines, in either direction.

## A. McKinsey Global Institute, December 2017, "Jobs lost, jobs gained"

URL: https://www.mckinsey.com/featured-insights/future-of-work/jobs-lost-jobs-gained-what-the-future-of-work-will-mean-for-jobs-skills-and-wages

### What was forecast

- Between almost zero and one third of work activities could be displaced by 2030 across 46 countries, midpoint 15%. Verified, executive summary PDF via archive snapshot: https://web.archive.org/web/2020/https://www.mckinsey.com/~/media/mckinsey/industries/public%20and%20social%20sector/our%20insights/what%20the%20future%20of%20work%20will%20mean%20for%20jobs%20skills%20and%20wages/mgi-jobs-lost-jobs-gained-executive-summary-december-6-2017.pdf
- 400m (midpoint) to 800m (fastest) workers displaced worldwide by 2030. Verified, same PDF.
- 75m (midpoint) to 375m (fastest) workers may need to switch occupational category. Verified, same PDF.
- The report stressed these were adoption scenarios, not predictions, with a range wide enough that almost any outcome fits.

### Later McKinsey updates

- 2023, "Generative AI and the future of work in America" (MGI, July 2023): in the midpoint scenario automation could take over 29.5% of US hours worked by 2030 with generative AI, up from 21.5% without it. Verified via archive snapshot: https://web.archive.org/web/2024/https://www.mckinsey.com/mgi/our-research/generative-ai-and-the-future-of-work-in-america
- June 2023, "The economic potential of generative AI": midpoint adoption of today's work activities moved from about 2053 to 2045, range 2030 to 2060, "an acceleration of roughly a decade". Verified, PDF via archive snapshot: https://web.archive.org/web/2023/https://www.mckinsey.com/~/media/mckinsey/business%20functions/mckinsey%20digital/our%20insights/the%20economic%20potential%20of%20generative%20ai%20the%20next%20productivity%20frontier/the-economic-potential-of-generative-ai-the-next-productivity-frontier.pdf
- 2025, "Agents, robots, and us" (MGI, November 2025): currently demonstrated technologies could in theory automate activities making up about 57% of US work hours today, and agents and robots could generate about $2.9tn of US value per year by 2030 in the midpoint scenario. Verified via archive snapshot: https://web.archive.org/web/2025id_/https://www.mckinsey.com/mgi/our-research/agents-robots-and-us-skill-partnerships-in-the-age-of-ai
- Direction of travel: McKinsey moved technical potential up and the timeline earlier, while still calling the outcome a range. It has not published a scorecard against its 2017 numbers. Plausible.

### What happened so far (2018 to 2026)

- ILO modelled estimates (Nov 2025): global employment 3.29bn in 2018, 3.26bn in 2020, 3.56bn in 2024, 3.60bn in 2025. Global unemployment 5.8% in 2018, 4.9% in 2024 and 2025. Verified, ILOSTAT API: https://rplumber.ilo.org/data/indicator/?id=EMP_2EMP_SEX_AGE_NB_A&ref_area=X01&timefrom=2018&timeto=2025&type=label&format=.csv and https://rplumber.ilo.org/data/indicator/?id=UNE_2EAP_SEX_AGE_RT_A&ref_area=X01&timefrom=2018&timeto=2025&type=label&format=.csv
- OECD: OECD-wide unemployment 4.9% in 2023 and 4.9% in 2024. Verified, OECD data API: https://sdmx.oecd.org/public/rest/data/OECD.SDD.TPS,DSD_LFS@DF_IALFS_UNE_M,1.0/OECD..._Z.Y._T.Y_GE15..A?startPeriod=2023&endPeriod=2025&dimensionAtObservation=AllDimensions&format=csvfilewithlabels. The "record low" wording was not checked, so it is dropped.
- BLS CES total nonfarm (seasonally adjusted): 152.3m in Feb 2020, 154.3m in Dec 2022, 158.4m in Dec 2025, so the pre-Covid peak was passed in 2022 and payrolls kept rising to about 158m. Verified, BLS API series CES0000000001: https://api.bls.gov/publicAPI/v2/timeseries/data/CES0000000001?startyear=2018&endyear=2025. The point that occupational shifts were not at a scale implying tens of millions displaced by machines stays Estimate.
- No official series measures "share of hours automated". Estimate: with stable or rising total hours and no visible machine-driven drop in employment, realised automation of hours by 2026 sits well below the 15% midpoint path. Generative AI usage studies show wide task use, but measured hour displacement remains small.

### Verdict

Too early to score. The horizon is 2030, so four years remain. The range (0 to 30%, 400m to 800m) is so wide it is hard to falsify. On the evidence to date, the displacement path looks behind the midpoint. Confidence: medium on the direction, low on any final call.

## B. World Economic Forum, Future of Jobs 2018

URL: https://www3.weforum.org/docs/WEF_Future_of_Jobs_2018.pdf

### What was forecast (Verified, PDF opened and text extracted)

- "75 million jobs may be displaced by a shift in the division of labour between humans and machines, while 133 million new roles may emerge", for the period up to 2022. Net +58m is our arithmetic. Verified, net is Estimate.
- Exact wording on machines: in 2018 an average of 71% of task hours across the 12 industries covered were done by humans and 29% by machines. "By 2022 this average is expected to have shifted to 58% task hours performed by humans and 42% by machines." Verified. Note the scope: 12 industries, survey of large employers, not the whole economy.

### What happened

- WEF Future of Jobs 2020: by 2025 time spent on current tasks by humans and machines expected to be equal. New call of 85m displaced and 97m created by 2025. Verified, https://www3.weforum.org/docs/WEF_Future_of_Jobs_2020.pdf. The 2020 machine share of about 33% is derived from WEF 2023, which says 34% is a 1 point rise on the 2020 estimate. Verified by that derivation.
- WEF Future of Jobs 2023: "34% of all business-related tasks are performed by machines", a 1 point rise on the 2020 survey estimate. WEF says automation came in "at a slower pace than previously anticipated" and that 2020 respondents had expected almost half (47%) of tasks automated within five years. New forecast of 42% by 2027. New call of 83m lost and 69m created by 2027, net minus 14m. Verified, https://www3.weforum.org/docs/WEF_Future_of_Jobs_2023.pdf
- WEF 2025: 170m created, 92m displaced by 2030. Plausible, already in ledger.
- ILO: global employment grew by about 155m between 2018 (3.29bn) and 2022 (3.44bn) despite the 2020 drop. Verified, corrected from roughly 200m to 250m. Source: https://rplumber.ilo.org/data/indicator/?id=EMP_2EMP_SEX_AGE_NB_A&ref_area=X01&timefrom=2018&timeto=2025&type=label&format=.csv. That matches the positive net sign, but it is mostly population growth and the Covid rebound, not WEF's mechanism.

### Verdict

Missed on the 42% machine share (about 33% in 2020 and 34% in 2023 by the same survey, against 42% forecast for 2022. WEF 2023 now forecasts 42% for 2027, five years later than the 2018 call). Partly held on the jobs churn: total jobs did grow, so the positive net sign held, but the 75m and 133m flows were never measured and Covid swamps 2020 to 2022. Overall verdict: Partly held, leaning Missed. Confidence: medium. Why: WEF's own follow-up surveys show automation of tasks ran about 8 points behind its 2018 call, and its later editions reset numbers without scoring earlier ones.

## Verdicts

| Forecaster | Forecast | Verdict | Verdict date | Source |
|---|---|---|---|---|
| McKinsey MGI 2017 | 0 to about 33% of global work activities automated by 2030, 400m to 800m displaced, 75m to 375m switch occupation | Too early to score (tracking behind midpoint) | 2026-10-27 | https://www.mckinsey.com/featured-insights/future-of-work/jobs-lost-jobs-gained-what-the-future-of-work-will-mean-for-jobs-skills-and-wages |
| WEF 2018 | Machines do 42% of task hours by 2022 | Missed (about 34% in WEF 2023) | 2026-10-27 | https://www3.weforum.org/docs/WEF_Future_of_Jobs_2018.pdf |
| WEF 2018 | 75m displaced, 133m created by 2022, net +58m | Partly held (net sign right, flows untested, Covid confound) | 2026-10-27 | https://www3.weforum.org/docs/WEF_Future_of_Jobs_2018.pdf |

## Verification log

Second pass, 2026-10-27.

| Figure | Old | New | Tag | URL opened |
|---|---|---|---|---|
| McKinsey 2017 share automated by 2030 | 0 to 30%, midpoint 15% | almost zero to one third, midpoint 15% | Verified | https://web.archive.org/web/2020/https://www.mckinsey.com/~/media/mckinsey/industries/public%20and%20social%20sector/our%20insights/what%20the%20future%20of%20work%20will%20mean%20for%20jobs%20skills%20and%20wages/mgi-jobs-lost-jobs-gained-executive-summary-december-6-2017.pdf |
| McKinsey 2017 displaced | 400m to 800m | 400m to 800m | Verified | same |
| McKinsey 2017 switch occupation | 75m to 375m | 75m to 375m | Verified | same |
| McKinsey 2023 US hours by 2030 | up to 30% | 29.5% midpoint, 21.5% without gen AI | Verified, corrected wording | https://web.archive.org/web/2024/https://www.mckinsey.com/mgi/our-research/generative-ai-and-the-future-of-work-in-america |
| McKinsey 2023 midpoint shift | about a decade, 2053 to 2045 | same | Verified | https://web.archive.org/web/2023/https://www.mckinsey.com/~/media/mckinsey/business%20functions/mckinsey%20digital/our%20insights/the%20economic%20potential%20of%20generative%20ai%20the%20next%20productivity%20frontier/the-economic-potential-of-generative-ai-the-next-productivity-frontier.pdf |
| McKinsey 2025 US work hours | 57% | 57%, plus $2.9tn a year by 2030 | Verified | https://web.archive.org/web/2025id_/https://www.mckinsey.com/mgi/our-research/agents-robots-and-us-skill-partnerships-in-the-age-of-ai |
| WEF 2020 parity, 85m and 97m | Plausible | same | Verified | https://www3.weforum.org/docs/WEF_Future_of_Jobs_2020.pdf |
| WEF 2023 machine share | about 34% | 34%, 1 point over 2020 | Verified | https://www3.weforum.org/docs/WEF_Future_of_Jobs_2023.pdf |
| ILO global employment 2018 to 2024 | 3.3bn to 3.6bn | 3.29bn to 3.56bn | Verified | https://rplumber.ilo.org/data/indicator/?id=EMP_2EMP_SEX_AGE_NB_A&ref_area=X01&timefrom=2018&timeto=2025&type=label&format=.csv |
| ILO global unemployment 2024 | about 5.0% | 4.9% | Verified, corrected | https://rplumber.ilo.org/data/indicator/?id=UNE_2EAP_SEX_AGE_RT_A&ref_area=X01&timefrom=2018&timeto=2025&type=label&format=.csv |
| ILO employment growth 2018 to 2022 | 200m to 250m | about 155m | Verified, corrected | https://rplumber.ilo.org/data/indicator/?id=EMP_2EMP_SEX_AGE_NB_A&ref_area=X01&timefrom=2018&timeto=2025&type=label&format=.csv |
| OECD unemployment | about 4.9% in 2024 and 2025 | 4.9% in 2023 and 2024 | Verified, corrected years | https://sdmx.oecd.org/public/rest/data/OECD.SDD.TPS,DSD_LFS@DF_IALFS_UNE_M,1.0/OECD..._Z.Y._T.Y_GE15..A?startPeriod=2023&endPeriod=2025&dimensionAtObservation=AllDimensions&format=csvfilewithlabels |
| BLS payrolls 2025 | about 159m | 158.4m Dec 2025 | Verified, corrected | https://api.bls.gov/publicAPI/v2/timeseries/data/CES0000000001?startyear=2018&endyear=2025 |

Routes that failed: direct mckinsey.com ~/media PDFs and live MGI pages (timeout), a guessed agents report PDF path (timeout), the first OECD query form (404).

Verdict check. McKinsey 2017 stays Too early. WEF 42% stays Missed. WEF 75m and 133m stays Partly held, since ILO shows net global job growth of about 155m from 2018 to 2022 even after Covid.
