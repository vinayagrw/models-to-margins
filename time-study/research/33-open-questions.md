# Open questions on saved time: the five the researchers have not settled

Research note 33, compiled 2 November 2026 for the Time Spent vs Time Saved study.

Owner's question (2 November 2026): what are the top five questions researchers are still trying to answer about time spent against time saved, and about efficiency gains.

Method. Five researcher agents took one question each. Each searched the repo's evidence first and the web second, preferring sources dated 2025 or 2026. Their notes sit in `research_notes/Open questions on saved time/` (q1 to q5), and this file draws on them plus one recheck of the METR February 2026 page.
Every line below carries one tag. Verified means the primary page or PDF was opened and the number read there. Plausible means a search summary or a secondary report only, and the figure is written "about". Projection means a scenario or a forecast, never a fact. Not found means the search ran and came back empty, and the item must never be stated as a fact. Vendor figures name the vendor.

Order. The questions are numbered by theme in this file. The page shows the cards by the year each question opened: Rebound 1930, Stall 1980, Destination 2005, Measurement 2025, Capture 2026.

| Number | Theme | Source note |
|---|---|---|
| 1 | Rebound | q2-time-rebound-share.md |
| 2 | Destination | q1-where-saved-hours-go.md |
| 3 | Measurement | q3-ai-savings-measured.md |
| 4 | Capture | q4-who-captures-the-saving.md |
| 5 | Stall | q5-hours-stall-and-projections.md |

## Top 5 for a manager

| Question | What is known (one number with its year) | What nobody has measured | Who is working on it | Confidence |
|---|---|---|---|---|
| 1. How much of a saved hour refills with more work? | 85 percent of Danish AI chatbot users say the saving goes into other job tasks, under 10 percent into breaks (2026, shares of users by self report) | A share of saved minutes that refills, counted by diary or telemetry, in any field but road capacity | Humlum and Vestergaard, NBER 33777, revised March 2026. Suh and Oh, Korean worker survey, February 2026. Caltrans induced travel update, due November 2026 | Low. Only self reports exist, and Denmark and Korea disagree |
| 2. Where does a saved hour go, into free time or back into work? | AI exposed US workers logged about 3 more work hours and about 3 fewer leisure hours a week after ChatGPT (diaries to 2023) | A diary or telemetry study that follows the same workers' saved AI hours and splits them between free time and more work | Jiang, Park, Xiao and Zhang, NBER 33536, draft December 2025. Pabilonia and Vernon, US BLS, December 2025 (the commute). Bick, Blandin and Deming, quarterly | Low. One diary study to 2023, the rest self report |
| 3. Do self reported AI savings show up in anything measured? | Self reported saving is 2.1 percent of all US work hours (2026), flat between 2.0 and 2.2 percent for four quarters, none of it tied to output | A study that logs the same workers' time with and without AI and then asks them what they saved, person by person | Bick, Blandin and Deming tracker, October 2026. Atlanta and Richmond Fed CFO survey, March 2026. METR redesign, no result as of 2 November 2026 | Medium on the gap, low on its size. Every paired comparison finds self report above measurement |
| 4. Who keeps the saving, and does any of it reach the customer? | Danish AI users saw no change in pay or hours above 2 percent two years after ChatGPT (2026) | The customer's share as lower prices. Any signed contract that turns an AI saving into shorter hours. Any labour share projection past 2030 | Korinek and co-authors, Anthropic Institute, September 2026 (to 2030). Humlum and Vestergaard, 2026. AI Exposure union tracker, March 2026 | Medium for workers (a null), low for firms and customers |
| 5. Why did US hours stop falling after 1980, and what happens by 2050? | US leisure rose 4.5 hours a week from 1965 to 2013, over 8 hours for the least schooled and under 1 hour for graduates | A paper that weighs the competing causes of the 1980 to 2019 stall. Any official US hours figure for 2050 or 2075 | Birinci, Karabarbounis and See, St. Louis Fed, revised September 2026. World Inequality Lab, May 2025 (to 2100). Metaculus hub, April 2026 (to 2035) | Medium on the mechanism, low on any forecast |

## 1. Rebound: how much of a saved hour refills with more work?

When a tool saves time on a task, how much of the saving is lost to more of the same work or to new work, and does any field have a measured share for time the way energy economics has one for fuel?

### What is known

| Fact | Number | Year | Country | Tag | URL |
|---|---|---|---|---|---|
| AI chatbot users report saving a share of their work hours | about 3 percent | 2024 round, revised Mar 2026 | Denmark | Verified | https://www.nber.org/papers/w33777 |
| Users who say the saving goes into other job tasks (a share of users, worded as an expectation in the questionnaire) | 85 percent | 2026 | Denmark | Verified | https://www.nber.org/papers/w33777 |
| Users who say they take more breaks or leisure (a share of users) | under 10 percent | 2026 | Denmark | Verified | https://www.nber.org/papers/w33777 |
| Users who spend more time on the very task they saved time on | about 30 percent | 2026 | Denmark | Verified | https://www.nber.org/papers/w33777 |
| Users who took on entirely new tasks, and the share where employers ran chatbot initiatives | about 8 percent, rising to 17 to 18 percent | 2026 | Denmark | Verified | https://www.nber.org/papers/w33777 |
| Generative AI cuts working time, and the gain shows up mainly as on the job leisure | 3.8 percent | Feb 2026 | South Korea | Verified (abstract) | https://arxiv.org/abs/2602.12695 |
| Share of AI time savings lost to rework (Workday, vendor, 3,200 full time AI users) | nearly 40 percent | fielded Nov 2025, released 14 Jan 2026 | Global | Verified, vendor | https://en-sg.newsroom.workday.com/2026-01-14-New-Workday-Research-Companies-Are-Leaving-AI-Gains-on-the-Table |
| Organisations that respond to the saving by raising workloads (Workday, vendor) | 32 percent | Jan 2026 | Global | Verified, vendor | https://en-sg.newsroom.workday.com/2026-01-14-New-Workday-Research-Companies-Are-Leaving-AI-Gains-on-the-Table |
| Workers who get no guidance on what to do with saved time (BCG, vendor, 11,749 workers) | about 66 percent | Jul 2026 | 14 markets | Plausible, vendor | https://www.bcg.com/news/6july2026-ai-saving-time-workers-strategically |
| Civil servants on Microsoft 365 Copilot saved minutes a day, and the report states it could not identify how the time was spent | about 26 minutes | Q4 2024, report Jun 2025 | UK | Plausible (PDF not opened) | https://assets.publishing.service.gov.uk/media/683db42bd23a62e5d32680d0/M365_Copilot_Experiment_Findings_Report.pdf |
| AI users' daily focus time fell while the average workday shrank (ActivTrak, vendor, 163,638 employees) | focus down 9 percent (23 minutes), workday down 2 percent | Mar 2026 | US centred | Verified, vendor | https://activtrak.com/news/state-of-the-workplace-ai-accelerating-work |
| Meetings starting after 8 pm, and messages per user outside core hours (Microsoft, vendor) | up 16 percent, 58 a day | Jun 2025 | Global tenants | Verified, vendor | https://www.microsoft.com/en-us/worklab/work-trend-index/breaking-down-infinite-workday |
| Long run elasticity of vehicle miles to lane miles, the one field with a settled time rebound number | about 1.0 within 3 to 10 years | Jan 2025 | US | Verified | https://escholarship.org/content/qt0kj840w2/qt0kj840w2_noSplash_98a302e4a4df35efd951177da0374a77.pdf |
| Hours spent travelling per person, so the travel time budget still holds | 362 a year | 2024, published Aug 2025 | England | Verified | https://www.gov.uk/government/statistics/national-travel-survey-2024/nts-2024-introduction-and-main-findings |
| Household time rebound in energy use, the only paper found that puts a number on the term "time rebound" | extra electricity at most 1.4 percent of daily use | 2018 | Japan | Verified (abstract) | https://ideas.repec.org/p/fae/wpaper/2018.20.html |
| AI users at one tech firm take on wider tasks and often work longer by choice, with no hours number | none | Apr to Dec 2025, HBR Feb 2026 | US | Verified for title and date, Plausible for the design | https://hbr.org/2026/02/ai-doesnt-reduce-work-it-intensifies-it |

### What nobody has measured

- A share of saved minutes that refills, counted by time diary or telemetry before and after a tool. The Danish 85 percent and the Workday nearly 40 percent are the closest, and both are self reports. Not found.
- A time rebound share for any field other than road capacity. Not found.
- An official report from the OECD or from a national government science office that uses the term time rebound or tracks where saved time goes. The nearest is the UK Copilot report, which says it could not identify how saved time was spent. Not found.
- A firm level study that reports the output of one time saving tool alongside the hours it saved. Not found.
- A study that tests the Danish result (the saving goes back into work) against the Korean result (the saving goes into on the job leisure). Not found.
- A 2025 or 2026 travel time budget update outside England. Not found.
- The Microsoft Work Trend Index 2026 meeting hours figure on a Microsoft page. Not found.

### Who is working on it

| Study | Authors or institution | Date | What it measures | URL |
|---|---|---|---|---|
| Still Waters, Rapid Currents (NBER 33777) | Humlum (Chicago Booth) and Vestergaard (Copenhagen) | revised Mar 2026 | Self reported saving and its stated use for about 25,000 workers, set against register pay and hours | https://www.nber.org/papers/w33777 |
| Generative AI and working time in Korea (arXiv 2602.12695) | Suh and Oh | 13 Feb 2026 | Working time reduction and its split between output and on the job leisure | https://arxiv.org/abs/2602.12695 |
| Field study at one US tech firm | Ranganathan and Ye, Berkeley Haas | Apr to Dec 2025, HBR 9 Feb 2026 | Task expansion and blurred boundaries after an AI rollout, no numeric split yet | https://hbr.org/2026/02/ai-doesnt-reduce-work-it-intensifies-it |
| Induced Travel Primer, and Caltrans Task 4491 | Handy and Volker, UC Davis, with Caltrans | Jan 2025, update due Nov 2026 | Elasticity of vehicle miles to road capacity | https://escholarship.org/content/qt0kj840w2/qt0kj840w2_noSplash_98a302e4a4df35efd951177da0374a77.pdf and https://dot.ca.gov/-/media/dot-media/programs/research-innovation-system-information/documents/research-notes/task4491-rns-10-2025-a11y.pdf |
| State of the Workplace (vendor) | ActivTrak Productivity Lab | 11 Mar 2026, annual | Workday length and focus time from telemetry, 180 days before and after AI adoption | https://activtrak.com/news/state-of-the-workplace-ai-accelerating-work |
| AI time savings survey (vendor) | Workday with Hanover Research | 14 Jan 2026 | Self reported hours saved and the share lost to rework | https://en-sg.newsroom.workday.com/2026-01-14-New-Workday-Research-Companies-Are-Leaving-AI-Gains-on-the-Table |
| Work Trend Index special report (vendor) | Microsoft WorkLab | 17 Jun 2025 | After hours meetings and messages from Microsoft 365 telemetry | https://www.microsoft.com/en-us/worklab/work-trend-index/breaking-down-infinite-workday |
| National Travel Survey | UK Department for Transport | 27 Aug 2025, annual | Hours and trips per person | https://www.gov.uk/government/statistics/national-travel-survey-2024/nts-2024-introduction-and-main-findings |

## 2. Destination: where does a saved hour go?

When a worker saves an hour, is it kept as free time or put back into paid work, and who measures that today?

### What is known

| Fact | Number | Year | Country | Tag | URL |
|---|---|---|---|---|---|
| AI exposed US workers (25th to 75th percentile of exposure) logged more work and less leisure a week after ChatGPT, the loss concentrated in leisure away from screens | about 3 more work hours (3.15) and about 3 fewer leisure hours (3.20) | diaries 2004 to 2023, draft Dec 2025 | US | Direction Verified, magnitudes Plausible | https://www.nber.org/papers/w33536 and https://www.aeaweb.org/conference/2026/program/paper/69TEQ7rF |
| A work from home day removes commuting time | 52 minutes | 2023 to 2024 | US | Verified (full PDF) | https://www.aeaweb.org/conference/2026/program/paper/fnY372QS |
| Men put the saved commute mainly into leisure and sleep, women into chores and childcare. Paid hours no longer differ by work location | direction only | 2023 to 2024 | US | Verified | https://www.aeaweb.org/conference/2026/program/paper/fnY372QS |
| Sleep rose across all work arrangements | about 4 percent | 2023 to 2024 | US | Verified | https://www.aeaweb.org/conference/2026/program/paper/fnY372QS |
| Time saved by working from home, and where it went | 72 minutes a day, about 40 percent to work and about 34 percent to leisure | 2021 to 2022 | 27 countries | Plausible this round (paper not reopened). Already on the page as verified 2022 | https://bfi.uchicago.edu/insight/research-summary/time-savings-when-working-from-home |
| Hours saved by generative AI as a share of all US work hours, with nothing on where they go | 1.6 percent to 2.2 percent | Q3 2024 to Q2 2026 | US | Verified | https://fred.stlouisfed.org/blog/2026/08/does-generative-ai-save-time-at-work/ |
| Leisure and sports per day, and television within it, in a survey with no AI or saved time item | 5.16 hours, 2.61 hours | 2025, released 25 Jun 2026 | US | Verified | https://www.bls.gov/news.release/archives/atus_06252026.htm |
| Socialising per day, down on 2015 | 35 minutes (41 in 2015) | 2025 | US | Verified | https://www.bls.gov/news.release/archives/atus_06252026.htm |
| Workers estimate AI saves them hours a week, and spend hours supervising and fixing its output (Glean, vendor survey of about 6,000 digital workers) | about 11 hours saved, about 6.4 hours spent | Jun 2026 | US, UK and Australia | Plausible (trade press), vendor | https://itbrief.co.uk/story/ai-saves-workers-11-hours-but-botsitting-eats-gains |
| Users who say they take more breaks or leisure (a share of users) | under 10 percent | 2026 | Denmark | Verified | https://www.nber.org/papers/w33777 |
| ONS Time use in the UK waves 9 and 10 exist as spreadsheets with no bulletin. The latest published free time figure is from autumn 2023 | 3 hours 39 minutes a day | 2023 | UK | Verified that the release exists. 2026 figure Not found | https://www.ons.gov.uk/releases/timeuseintheuk |

### What nobody has measured

- A diary or telemetry study that follows the same workers' saved AI hours and splits them between free time and more paid work. Not found.
- A measured "lost to standards" share, meaning time absorbed by polishing or extra review of the same output. The Danish about 30 percent and the Workday nearly 40 percent are self reports. Not found.
- A 2025 or 2026 re-run of the commute allocation question by Aksoy, Barrero, Bloom and co-authors. Pabilonia and Vernon give direction by sex and no percentage split. Not found.
- An ATUS or ONS diary item that attributes any minute to AI or to time saved. Not found.
- A forward projection by a named institution of how free time will be used in 2030 or later, with hours or shares. Also empty in research/32-debate-map-gaps.md. Not found.
- Diary evidence on AI and leisure after 2023. Not found.
- A firm level evaluation after an AI rollout that reports where saved hours went in hours worked or in pay. Not found.

### Who is working on it

| Study | Authors or institution | Date | What it measures | URL |
|---|---|---|---|---|
| AI and the Extended Workday (NBER 33536) | Jiang, Park, Xiao and Zhang (Emory and co-authors) | draft 17 Dec 2025, AEA Jan 2026 | Work and leisure hours by occupational AI exposure in ATUS diaries, through 2023 | https://www.nber.org/papers/w33536 |
| How did the remote work revolution change our work and leisure time | Pabilonia (US BLS) and Vernon (SUNY Empire State) | 31 Dec 2025, AEA 2026 | ATUS diaries 2017 to 2018 and 2023 to 2024 linked to work from home intensity. The best template for following a saved hour home | https://www.aeaweb.org/conference/2026/program/paper/fnY372QS |
| Still Waters, Rapid Currents (NBER 33777) | Humlum and Vestergaard | revised Mar 2026 | The only study found that asks the kept or reinvested question directly | https://www.nber.org/papers/w33777 |
| Real-Time Population Survey and the FRED Generative AI Adoption Tracker | Bick (St. Louis Fed), Blandin (Vanderbilt) and Deming (Harvard) | quarterly, latest wave Aug 2026 | Adoption and hours saved as a share of all US work hours. Does not ask where the hours go | https://fred.stlouisfed.org/blog/2026/08/does-generative-ai-save-time-at-work/ |
| Global Survey of Working Arrangements | Aksoy, Barrero, Bloom, Davis, Dolls and Zarate | 2023 paper, no re-run of the allocation item found | Commute time saved and where it went | https://bfi.uchicago.edu/insight/research-summary/time-savings-when-working-from-home |
| American Time Use Survey | US BLS | annual, 2025 data released 25 Jun 2026 | Minutes per day by activity, no AI item | https://www.bls.gov/news.release/archives/atus_06252026.htm |
| Work AI Institute survey (vendor) | Glean | Jun 2026 | Self reported hours saved and hours spent supervising AI output | https://itbrief.co.uk/story/ai-saves-workers-11-hours-but-botsitting-eats-gains |

## 3. Measurement: do self reported AI savings show up in anything measured?

Do the hours workers say AI saves them appear in measured output or in pay and hours records, and by how much does self report run ahead of measurement?

### What is known

| Fact | Number | Year | Country | Tag | URL |
|---|---|---|---|---|---|
| Self reported time saved by generative AI as a share of all US work hours, non users counted as zero | 2.08 percent in Q3 2026 (between 1.99 and 2.17 across the four quarters since Q4 2025) | Q3 2026, FRED updated 20 Oct 2026 | US | Verified | https://fred.stlouisfed.org/series/RPSGENAITSALL |
| Employed adults using generative AI at work, and the share of all work hours saved | 40.5 percent, 2.1 percent | Aug 2026 | US | Verified | https://www.genaiadoptiontracker.com/ |
| Null effects on earnings and recorded hours for chatbot adopters, two years after ChatGPT | rules out average effects above 2 percent | 2026 (registers to Dec 2024) | Denmark | Verified | https://www.brookings.edu/articles/still-waters-rapid-currents-early-labor-market-transformation-under-generative-ai/ |
| Adopters who say chatbots have not changed their pay | 98 percent | 2026 | Denmark | Verified | https://www.brookings.edu/articles/still-waters-rapid-currents-early-labor-market-transformation-under-generative-ai/ |
| Returning developers in METR's second trial finished tasks faster with AI, with an interval that includes zero | 18 percent faster (38 percent faster to 9 percent slower) | Aug 2025 data, published 24 Feb 2026 | US | Verified (page reopened 2 Nov 2026) | https://metr.org/blog/2026-02-24-uplift-update/ |
| New developers in the same trial | 4 percent faster (15 percent faster to 9 percent slower) | Feb 2026 | US | Verified | https://metr.org/blog/2026-02-24-uplift-update/ |
| METR calls the new data "an unreliable signal" because developers held back tasks they did not want to do without AI | 30 to 50 percent of developers | Feb 2026 | US | Verified | https://metr.org/blog/2026-02-24-uplift-update/ |
| Median self reported speed change among technical workers, against METR's own 2025 finding that developers overestimated the time effect by 40 points | 3 times | Feb to Apr 2026, 349 workers, convenience sample | US | Verified | https://metr.org/blog/2026-05-11-ai-usage-survey/ |
| Randomised Copilot access at 66 firms: users spent less time on email, and the authors detect no shift in the quantity or composition of tasks (Microsoft authors, Microsoft tool) | about 2 fewer hours a week on email, 7,137 workers | revised Nov 2025 | US | Verified | https://www.nber.org/papers/w33795 |
| Executives report AI productivity gains above what their own revenue and headcount answers imply, which the authors name a productivity paradox | nearly 750 executives (about 750) | 25 Mar 2026 | US | Verified | https://www.atlantafed.org/research-and-data/publications/working-papers/2026/03/25/04-artificial-intelligence-productivity-and-the-workforce-evidence-from-corporate-executives |
| Reported AI driven labour productivity growth for 2025 against the implied figure | about 1.8 percent reported, about 0.6 percent implied (about 3 to 1) | Mar 2026 | US | Plausible (Richmond Fed commentary not opened) | https://www.richmondfed.org/research/national_economy/cfo_survey/research_and_commentary/2026/20260325_research_commentary |
| Logged productive hours rose while the workday shrank, and AI users lost focus time (ActivTrak, vendor) | productive hours up 5 percent to 6h36m, workday down 2 percent to 8h44m | Jan 2023 to Dec 2025, published 11 Mar 2026 | US centred | Verified, vendor | https://activtrak.com/news/state-of-the-workplace-ai-accelerating-work |
| Generative AI drafts in after sales chat raised speed and customer ratings on average, with no gain on the objective quality measure and worse quality for top performers | direction only | arXiv v2, 31 Jul 2026 | China | Verified (abstract) | https://arxiv.org/abs/2603.29888 |
| Three GitHub Copilot trials found more completed tasks, with gains concentrated in junior developers (Microsoft authors) | about 26 percent more, 4,867 developers | 2025 | US | Plausible (abstract via search) | https://pubsonline.informs.org/doi/fpi/10.1287/mnsc.2025.00535 |
| BLS attributes no share of productivity growth to AI and gives no method for doing so | none | notice last modified 8 May 2026 | US | Verified | https://www.bls.gov/productivity/notices/2026/productivity-and-artificial-intelligence.htm |
| Firms using AI in any business function. The question wording changed on 17 Nov 2025, so the series breaks | about 17 to 20 percent | Dec 2025 to May 2026 | US | Plausible | https://www.census.gov/library/stories/2026/05/ai-use-businesses.html |

Paired comparisons found this round, one per line:

- METR 2025 trial: developers felt 20 percent faster and measured 19 percent slower, a 40 point gap. Verified (METR restates it in May 2026). This is the 2025 result, and the 2026 trial supersedes its size.
- CFO survey, 2025 reporting year: about 1.8 percent reported against about 0.6 percent implied. Plausible.
- Denmark: about 3 percent of hours self reported as saved, against pay and hours effects bounded under 2 percent. Verified.

### What nobody has measured

- A study that logs the same workers' time with and without AI and also asks them how much they saved, then compares the two person by person. Not found.
- A Bick, Blandin and Deming wave that links the 2.1 percent to output or to pay. Not found.
- Any official BLS or Federal Reserve Board attribution of a share of 2025 or 2026 US productivity growth to AI. Not found.
- A field study of agents (tools that take actions on their own) that measures time saved against output. Every 2026 trial located studies a chat or drafting assistant or code completion. Not found.
- A METR redesigned result with a tight interval for 2026 tools, as of 2 Nov 2026. Not found.
- Any measured fall in hours worked tied to AI use at worker level. Not found.
- A 2026 extension of the Brynjolfsson, Li and Raymond customer support study, or a revision of Acemoglu's ten year bound. Not found.

### Who is working on it

| Study | Authors or institution | Date | What it measures | URL |
|---|---|---|---|---|
| GenAI Adoption Tracker | Bick (St. Louis Fed), Blandin (Vanderbilt) and Deming (Harvard) | quarterly, FRED updated 20 Oct 2026 | Self reported use and hours saved, by occupation | https://www.genaiadoptiontracker.com/ and https://fred.stlouisfed.org/series/RPSGENAITSALL |
| Still Waters, Rapid Currents | Humlum and Vestergaard, Brookings write up | 6 Oct 2026 | Self reported adoption and saving against Danish pay and hours registers | https://www.brookings.edu/articles/still-waters-rapid-currents-early-labor-market-transformation-under-generative-ai/ |
| Developer productivity programme | METR | RCT update 24 Feb 2026, survey 11 May 2026, redesign under way | Logged task time with and without AI against developers' own forecasts | https://metr.org/blog/2026-02-24-uplift-update/ and https://metr.org/blog/2026-05-11-ai-usage-survey/ |
| CFO Survey AI module (Atlanta Fed WP 2026-4, NBER w34984) | Atlanta Fed, Richmond Fed and Duke Fuqua | 25 Mar 2026 | Executive reported AI productivity against an implied figure from revenue and headcount | https://www.atlantafed.org/research-and-data/publications/working-papers/2026/03/25/04-artificial-intelligence-productivity-and-the-workforce-evidence-from-corporate-executives and https://www.richmondfed.org/research/national_economy/cfo_survey/research_and_commentary/2026/20260325_research_commentary |
| Shifting Work Patterns with Generative AI (NBER 33795) | Dillon, Jaffe and Immorlica (Microsoft Research) with Stanton (Harvard) | revised Nov 2025 | Time on email and the mix of tasks after randomised Copilot access | https://www.nber.org/papers/w33795 |
| Alibaba after sales chat experiment (arXiv 2603.29888) | Ni and co-authors | v2, 31 Jul 2026 | Speed and quality by agent skill under randomised AI drafting | https://arxiv.org/abs/2603.29888 |
| AI and productivity research | US BLS | notice 8 May 2026 | Software investment and industry exposure against official productivity | https://www.bls.gov/productivity/notices/2026/productivity-and-artificial-intelligence.htm |
| Business Trends and Outlook Survey, AI supplement | US Census Bureau | story 26 May 2026 | Firm AI use by function and size, no productivity question | https://www.census.gov/library/stories/2026/05/ai-use-businesses.html |

## 4. Capture: who keeps the saving?

When AI saves work time, who captures it, and does any of it reach the customer as a lower price? Three claimants are checked in turn below: workers, then firms, then customers.

### What is known

| Fact | Number | Year | Country | Tag | URL |
|---|---|---|---|---|---|
| Workers. Two years after ChatGPT, chatbot adoption had precise null effects on earnings and recorded hours at worker and workplace level | rules out effects above 2 percent | 2023 to 2025, paper 2026 | Denmark | Verified (abstract) | https://ideas.repec.org/p/crm/wpaper/26078.html |
| Workers. The change shows up in how work is organised, with tasks reassigned and new tasks added in AI oversight and content generation | direction | 2026 | Denmark | Verified (abstract) | https://ideas.repec.org/p/crm/wpaper/26078.html |
| Workers. The labour share sits above the wage maximising level in all 12 countries studied, so further automation should raise average wages. The falling share accounted for a slice of US real wage growth 1954 to 2019 | 16 percent | Jan 2026 (data to 2019) | US and 11 others | Verified (abstract) | https://arxiv.org/abs/2601.06343 |
| Workers. The cognitive wage in 2030 against its no AI path, and wages in all other occupations | 0.3 percent below (substantial) and 11.5 percent below (extreme), against 5.9 percent and 34 percent above | Sep 2026, horizon 2030 | US model | Projection | https://www-cdn.anthropic.com/files/4zrzovbb/website/cf58f84d46a4a76bf5a5b039ac695fba6b80041c.pdf |
| Firms. C.H. Robinson credits AI for lower headcount and a higher margin on its Q4 2025 call (management claim) | headcount down 12.9 percent, operating margin up 320 basis points | 28 Jan 2026 | US | Verified as a statement on the call, vendor claim | https://www.fool.com/earnings/call-transcripts/2026/01/28/ch-robinson-chrw-q4-2025-earnings-transcript |
| Firms. The same call puts a figure on manual work AI agents now do (management claim) | about 350 hours a day | 28 Jan 2026 | US | Verified as a statement, vendor claim | https://www.fool.com/earnings/call-transcripts/2026/01/28/ch-robinson-chrw-q4-2025-earnings-transcript |
| Firms. The Hackett Group booked AI transition charges for severance as roles move to GenAI platforms (management claim) | about 1 to 1.5 million dollars in Q1 2026 | 17 Feb 2026 | US | Plausible (transcript not opened), vendor claim | https://www.fool.com/earnings/call-transcripts/2026/02/17/hackett-group-hckt-earnings-call-transcript |
| Firms. In the extreme scenario the capital share rises while GDP ends about a third higher, so capital owners take the whole increase. The paper writes that "the labor share falls by a quarter while GDP rises by a third" | capital share 40 to 55 percent | Sep 2026, horizon 2030 | US model | Projection | https://www-cdn.anthropic.com/files/4zrzovbb/website/cf58f84d46a4a76bf5a5b039ac695fba6b80041c.pdf |
| Customers. Software price indexes, historically deflationary, have been flat to rising since generative AI arrived | direction | 2026 | US | Plausible (search summary) | https://www.minneapolisfed.org/article/2026/how-is-ai-influencing-interest-rates-investment-productivity-prices-and-more |
| Customers. Goldman Sachs (vendor view) expects AI to raise prices first through memory chips and electricity, with consumer electricity up year on year | about 4.6 percent | May 2026 | US | Plausible (Fortune report) | https://fortune.com/2026/05/04/is-ai-inflationary-goldman-sachs-gen-z/ |
| Labour share. BLS nonfarm business labour share, the latest published on 2 Nov 2026. The Q3 2026 release is scheduled for 5 Nov 2026 | 52.8 percent (Q2 2026) | Q2 2026 | US | 52.8 Verified in the repo (design doc section 24), schedule Plausible | https://www.bls.gov/news.release/prod2.nr0.htm |
| Labour share. Scenarios to 2030 from a national accounts base | 60.0 percent today. In 2030 the modest path gives 59.4 and the substantial path 56.1. The extreme path gives 45.2 | Sep 2026 | US model | Projection, Verified from the paper text | https://www-cdn.anthropic.com/files/4zrzovbb/website/cf58f84d46a4a76bf5a5b039ac695fba6b80041c.pdf and https://econpapers.repec.org/RePEc:cpr:ceprdp:21939 |
| Labour share. The substantial scenario's shift in four years is only slightly less than the whole fall in the US labour share over the four decades after 1980 | 4 points | Sep 2026 | US model | Projection | https://econpapers.repec.org/RePEc:cpr:ceprdp:21939 |
| Labour share. Under AGI with expanding compute the labour share of GDP converges to zero, and wages to the compute cost of reproducing human work | zero, no date | Oct 2025 | Long run model | Projection (undated) | https://www.nber.org/papers/w34423 |
| Labour share. An IMF scenario note suggests fiscal analysis could include a persistent decline in the labour income share, with no number | none | Apr 2026 | Global | Plausible (page returned 403) | https://www.elibrary.imf.org/view/journals/068/2026/002/article-A001-en.xml |
| Bargaining. US collective agreements with AI provisions that share profit or savings, and those with a shorter hours clause | about 23 percent share savings, none shorten hours (47 agreements) | 2023 to Mar 2026 | US | Plausible (single site, sample method not described) | https://www.aiexposure.org/analysis/union-ai-bargaining |
| Bargaining. The same agreements with advance notice, and with retraining rights | about 89 percent, about 76 percent | Mar 2026 | US | Plausible | https://www.aiexposure.org/analysis/union-ai-bargaining |
| Bargaining. Unions campaign for a four day week or a 35 hour week at full pay as the way to share AI gains. A demand, no signed deal | 38 hour standard today | 4 Jun 2026 | Australia | Verified as a report of a demand | https://anz.peoplemattersglobal.com/news/employee-value-proposition/australian-unions-eye-three-day-week-as-ai-reshapes-work-50097 |

### What nobody has measured

- The customer's share of AI gains as lower prices. Only commentary surfaced. Not found.
- A labour share projection to 2040 or 2050 by a named institution. The longest dated projection is 2030, and Restrepo's zero is undated. Not found.
- A signed union contract that converts an AI time saving into shorter hours at full pay. Demands exist (Australia, June 2026). Not found.
- An independent split of one firm's AI saving from audited accounts, as against management attributions on earnings calls. Not found.
- A 2026 update of the share of AI gains passed to workers. The 2026 Danish paper bounds the earnings effect at 2 percent and does not restate a pass through share, so the 3 to 7 percent from 2025 (already in the study) stays the latest. Not found.
- The US labour share for Q3 2026, due 5 Nov 2026. Not found yet.
- The full text of IMF Notes 2026/002. Not opened, so its labour share line rests on a search summary.

### Who is working on it

| Study | Authors or institution | Date | What it measures | URL |
|---|---|---|---|---|
| Economic Scenarios for Transformative AI (Anthropic Institute WP 2026-02, CEPR DP 21939) | Korinek, Jones, Sacher, Cotter and McCrory | Sep 2026 | Paths of AI capability mapped to the labour share and wages for 2026 to 2030, plus a survey of US adults | https://www-cdn.anthropic.com/files/4zrzovbb/website/cf58f84d46a4a76bf5a5b039ac695fba6b80041c.pdf and https://econpapers.repec.org/RePEc:cpr:ceprdp:21939 |
| Still Waters, Rapid Currents (ROCKWOOL Foundation Berlin DP 26078) | Humlum and Vestergaard | 2026 | Danish register earnings and hours against adoption surveys, difference in differences | https://ideas.repec.org/p/crm/wpaper/26078.html |
| Resolving the automation paradox (arXiv 2601.06343) | Autor and Kausik | Jan 2026 | Whether a falling labour share lowers wages, with data for 12 industrialised countries | https://arxiv.org/abs/2601.06343 |
| We Won't Be Missed (NBER 34423) | Restrepo (Yale) | Oct 2025 | Long run growth model in which the labour share converges to zero | https://www.nber.org/papers/w34423 |
| Lessons from a Scenario Planning Exercise (IMF Notes 2026/002) | IMF | Apr 2026 | Qualitative scenarios, including a persistent labour share decline, no number yet | https://www.elibrary.imf.org/view/journals/068/2026/002/article-A001-en.xml |
| Productivity and Costs | US BLS | quarterly, Q3 2026 due 5 Nov 2026 | Nonfarm business labour share | https://www.bls.gov/news.release/prod2.nr0.htm |
| Unions vs. AI: The New Collective Bargaining Frontier | AI Exposure (TheDataProject.ai) | 5 Mar 2026 | AI clauses in 47 US collective agreements | https://www.aiexposure.org/analysis/union-ai-bargaining |

## 5. Stall: why did US hours stop falling after 1980?

Why did US paid hours per worker stop falling after about 1980 while output per hour kept rising, and how sure can anyone be about hours in 2050 and 2076?

### What is known

| Fact | Number | Year | Country | Tag | URL |
|---|---|---|---|---|---|
| Global annual hours per worker fell from about 3,200 in 1800 to about 2,100 in 2025, with most of the fall between 1860 and 1980 | 34 percent fall, 57 territories | 1800 to 2025, paper May 2025 | Global | Verified (paper text) | https://rloubes.github.io/Website/files/WP_LabourHours.pdf |
| Share of two centuries of productivity gains taken as fewer hours, the rest as more output | 35 to 40 percent | 1800 to 2025 | Global | Verified (paper text) | https://ideas.repec.org/p/hal/wilwps/halshs-05500182.html |
| Weekly hours per worker across the OECD fell, and the pace of decline slowed | about 8 hours between 1970 and the 2010s, from about 0.9 percent a year to about 0.2 | 2021 report | OECD | Plausible (page refused connection) | https://www.oecd.org/en/publications/oecd-employment-outlook-2021_5a700c4b-en/full-report/working-time-and-its-regulation-in-oecd-countries-how-much-do-we-work-and-how_bfff25bb |
| US weekly leisure rose on average, against market work of 33 to 37 hours a week | 4.5 hours | 1965 to 2013, published 2021 | US | Verified (paper text) | https://personal.lse.ac.uk/ngai/Boppart-Ngai.pdf |
| Adults with under 12 years of schooling gained leisure, college graduates almost none | slightly over 8 hours a week, against under 1 hour | 1965 to 2013 | US | Verified (paper text) | https://personal.lse.ac.uk/ngai/Boppart-Ngai.pdf |
| Leisure and market hours did not diverge across education groups until wages did, in the 1980s. After 1985 the more educated raised market hours and the less educated cut them, which held the average flat | direction | 1965 to 2013 | US | Verified (paper text) | https://personal.lse.ac.uk/ngai/Boppart-Ngai.pdf |
| Long hours became more common in the top fifth of earners and less common in the bottom fifth | about 14 points more, about 7 points less | 1979 to the mid 2000s, paper 2005 | US | Plausible (secondary summary) | https://www.nber.org/papers/w11895 |
| About half the 1990s gap between US hours per person and other rich countries has closed. US hours per person fell after 2000 mainly because health benefits for people not in work expanded | about half | posted 24 Mar 2026, revised 21 Sep 2026 | US and comparison countries | Verified (abstract page) | https://econpapers.repec.org/RePEc:fip:fedlwp:102929 |
| Seven reasons the 15 hour week did not arrive, from needs met by work to employment tied health insurance | 7 explanation families | Mar 2025 | US and rich countries | Verified | https://www.cambridge.org/core/journals/industrial-and-organizational-psychology/article/revisiting-keynes-predictions-about-work-and-leisure-a-discussion-of-fundamental-questions-about-the-nature-of-modern-work/311DE1B2CED69DC226AF5DD9AB04FD90 |
| Euro area hours per person employed keep falling, with a slow recovery of zero hours workers and fewer very long weeks | direction | ECB Economic Bulletin 3/2025 | Euro area | Verified (abstract) | https://ideas.repec.org/a/ecb/ecbbox/202500033.html |
| Euro area potential output growth falls as labour input growth turns negative, with no hours per worker figure | 0.8 percent in the early 2030s | 2024 Ageing Report, via the ECB | Euro area | Verified | https://www.ecb.europa.eu/press/economic-bulletin/focus/2024/html/ecb.ebbox202405_08~5f9531042f.en.html |
| Leisure and sports per day by sex, and full time workers' hours on days worked. Fieldwork stopped 1 Oct to 12 Nov 2025 | men 5.6 hours, women 4.8, full time workers 8.1 hours | 2025, released 25 Jun 2026 | US | Verified | https://www.bls.gov/news.release/archives/atus_06252026.htm |
| Scenario. World Inequality Lab central path: annual hours per worker by 2100, with a share of productivity gains taken as time | about 1,000 hours, 45 percent of gains | 2100 | Global | Projection, Verified from the paper text | https://rloubes.github.io/Website/files/WP_LabourHours.pdf |
| Scenario. World Inequality Lab less ambitious path | about 1,260 hours, 31 percent of gains | 2100 | Global | Projection | https://rloubes.github.io/Website/files/WP_LabourHours.pdf |
| The same authors write "Our objective here is not to predict the future" | quote | May 2025 | Global | Verified (paper text) | https://rloubes.github.io/Website/files/WP_LabourHours.pdf |
| Scenario. Crowd forecast of US average weekly hours, with "dark leisure" flagged as a reason reported hours may understate change (Metaculus, vendor) | 38 to 34 | horizon 2035, hub launched 21 Apr 2026 | US | Projection, vendor | https://www.lesswrong.com/posts/So7wrd6djpQcoP4rz/introducing-the-labor-automation-forecasting-hub-1 |
| Scenario. Goldman Sachs analysts put a share of current work hours as automatable over the next decade, a share of tasks rather than an hours forecast | about 25 percent | 2025 | Global | Plausible (press summary), vendor | https://finance.yahoo.com/sectors/technology/articles/goldman-sachs-ceo-says-ai-151700968.html |
| Scenario. OECD working age population by 2060, with no hours per worker projection in the Outlook | down about 8 percent | Jul 2025 | OECD | Plausible (press release) | https://www.oecd.org/en/about/news/press-releases/2025/07/oecd-job-markets-remain-resilient-but-population-ageing-will-cause-significant-labour-shortages-and-fiscal-pressures.html |

### What nobody has measured

- Any US annual hours per worker figure for 2050 or 2075 from an official body such as the BLS or the OECD. The World Inequality Lab gives 2100 only. Not found.
- A bank forecast of hours worked for 2035 or 2050. Only the Goldman automatable share and the Dimon opinion (already in research/32) came back. Not found.
- The source for a figure circulating as "Vocelka" (1,749 hours in 2019 falling to 1,421 in 2050, with 333 done by AI). The arXiv page cited for it carries neither the name nor the numbers. Not found, treat as unsupported.
- A paper that weighs the competing US explanations for the 1980 to 2019 stall and says how much each carries. Birinci and co-authors test explanations for the post 2000 fall in hours per person, which is a different question. Not found.
- An update of the Aguiar and Hurst leisure series past 2013 in its own method. Not found.
- An ILO working time report dated 2025 or 2026. The last is January 2023. Not found.
- Any national survey measure of "dark leisure", time at work spent not working. Not found.
- Any 2025 or 2026 follow up by Boppart and Ngai, or any new hours paper by Bick, Fuchs-Schuendeln and Lagakos. Not found.
- The EU 2024 Ageing Report's total hours path to 2070 at the Commission's own page. Not found.

### Who is working on it

| Study | Authors or institution | Date | What it measures | URL |
|---|---|---|---|---|
| Global Labour Hours in Paid and Unpaid Work 1800 to 2100 (WIL WP 2025/08) | Andreescu, Loubes, Piketty and Robilliard, World Inequality Lab | 14 May 2025, feeding a Global Justice Report due 2026 | Hours by gender and sector for 57 territories 1800 to 2025, with two scenarios to 2100 | https://ideas.repec.org/p/hal/wilwps/halshs-05500182.html and https://rloubes.github.io/Website/files/WP_LabourHours.pdf |
| Why Do Americans No Longer Work So Much More Than Non-Americans? (St. Louis Fed WP 2026-002) | Birinci, Karabarbounis and See | posted 24 Mar 2026, revised 21 Sep 2026 | US hours per person against other rich countries, with the full tax and benefit system for non workers | https://econpapers.repec.org/RePEc:fip:fedlwp:102929 |
| Labor Automation Forecasting Hub (vendor) | Metaculus | launched 21 Apr 2026, horizon 2035 | Crowd forecasts of US employment and hours | https://www.lesswrong.com/posts/So7wrd6djpQcoP4rz/introducing-the-labor-automation-forecasting-hub-1 |
| Rising inequality and trends in leisure (Journal of Economic Growth 2021) | Boppart (IIES Stockholm) and Ngai (LSE) | 2017 paper, published 2021, no follow up found | US time use 1965 to 2013 by education group | https://personal.lse.ac.uk/ngai/Boppart-Ngai.pdf |
| Revisiting Keynes' predictions about work and leisure | Kaplan and co-authors, Industrial and Organizational Psychology 18(1) | Mar 2025 | A research agenda with seven explanation families, measures nothing new | https://www.cambridge.org/core/journals/industrial-and-organizational-psychology/article/revisiting-keynes-predictions-about-work-and-leisure-a-discussion-of-fundamental-questions-about-the-nature-of-modern-work/311DE1B2CED69DC226AF5DD9AB04FD90 |
| Who wants to work more? (ECB Economic Bulletin 3/2025) | Berson and Weissler | 2025 | Euro area hours per person employed, and the shares at zero and at very long hours | https://ideas.repec.org/a/ecb/ecbbox/202500033.html |
| American Time Use Survey | US BLS | annual, 25 Jun 2026 | Daily minutes by activity | https://www.bls.gov/news.release/archives/atus_06252026.htm |
| Employment Outlook 2025 | OECD | Jul 2025 | Ageing and employment, no hours trend chapter | https://www.oecd.org/en/about/news/press-releases/2025/07/oecd-job-markets-remain-resilient-but-population-ageing-will-cause-significant-labour-shortages-and-fiscal-pressures.html |

## Card years

The page section "What nobody has measured yet" gives each card a year the question opened, bound to the year clock. The basis for each year, so the page copy carries nothing this file does not hold.

| Card | Year | Basis | Tag |
|---|---|---|---|
| Rebound | 1930 | Electric appliances reached ordinary homes and the housework week did not shrink with them (research/01-history.md row 1930, research/15-time-rebound.md case 3) | Verified in the repo |
| Destination | 2005 | US time diaries showed leisure up 4 to 5 hours a week over the century (design doc ledger, NBER w12264) | Verified in the repo |
| Measurement | 2025 | The first randomised trial found developers felt faster with AI than the clock showed (METR, July 2025, design doc ledger). Changed from the suggested 2023 because the gap between felt and measured saving was first measured in 2025 | Verified |
| Capture | 2026 | Danish pay records show no gain for AI users two years on (March 2026) and the US labour share hit a record low of 52.8 percent (Q2 2026) | Verified |
| Stall | 1980 | US paid hours per worker stopped falling while output per hour kept rising (design doc section 2, research/02-paradoxes.md) | Verified in the repo |

## Cautions for any page or post text

1. Labour share series. Korinek and co-authors (September 2026) start from a labour share of 60.0 percent, a national accounts base, while the page's 52.8 percent is the BLS nonfarm business series. The two never sit in one comparison without naming the series.
2. Danish shares. The 85 percent (other tasks) and the under 10 percent (breaks or leisure) are shares of users by self report, as is the about 30 percent (same task). The survey item is worded as an expectation. None of them is a share of minutes.
3. Denmark against Korea. Denmark says the saving goes back into work. Korea (February 2026) says it goes into on the job leisure. Both are self reports from 2024 to 2026, so the page names the disagreement and picks neither as the fact.
4. METR. The 2025 "19 percent slower" is history and never the current size. The February 2026 trial found developers faster with intervals that include zero, and METR calls the data unreliable. METR writes a speedup as a negative number (a speedup of minus 18 percent means 18 percent faster), so copy the words "faster" or "slower" and never the sign. The durable claim is the gap between felt and measured.
5. Diaries. NBER 33536 is a correlation on diaries that end in 2023, and its magnitudes are Plausible, so the page writes "about 3 hours" each way.
6. CFO survey. The 1.8 and 0.6 are Plausible (from the Richmond Fed commentary as surfaced in search) and are written "about". The 750 executives is Verified at the Atlanta Fed page ("nearly 750").
7. Vendors. The figures below are vendor figures and carry the vendor tag on the page. C.H. Robinson and Hackett figures are management claims on earnings calls.
   - Workday (rework, workloads), BCG (guidance), Glean (botsitting)
   - ActivTrak (focus time, workday length), Microsoft (after hours meetings)
   - Metaculus (crowd hours forecast), Goldman Sachs (automatable share, prices)
8. Projections. The World Inequality Lab scenarios are not predictions, in the authors' own words. No official body gives a US hours figure for 2050 or 2075. The "Vocelka" figure is unsupported and never appears.
9. Two Bick numbers. The 2.1 percent counts non users as zero. The user only figure already on the page (5.4 percent) has a different base. Never mix the two.
10. Timing. The BLS Q3 2026 labour share is due 5 November 2026, so 52.8 percent may be superseded within days of this note.
11. Aksoy shares. The about 40 percent and about 34 percent are 2021 to 2022 data, Plausible this round (paper not reopened), and already on the page as "verified 2022" from an earlier round. Do not retag the existing card.
12. Not found. No study prices the customer's share, no contract converts an AI saving into shorter hours, and no institution forecasts how free time will be used. These appear only as "nobody has measured" lines, never as facts.
13. Denmark bound. The 2026 paper's 2 percent bound replaces the 2025 paper's 1 percent bound. Use 2 percent.
14. Card years. The years 1930 and 2005 and 1980 are the repo's own markers for when each question opened, with the basis in the Card years table above. They are not findings of this round.
