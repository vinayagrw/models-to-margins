# 09. Red team: the weakest parts of the approach

Reviewer stance: hostile. Weakest first. Numbers are not checked here (other agents do that). This file attacks method and framing only.

Tags: **Verified** means a primary or two agreeing sources. **Plausible** means one credible source. **Estimate** means our own reasoning.

## Top 10 gaps, weakest first

1. **"Time saved" has no owner.** Files 03 and 06 count paid work hours an employer could recover. They never say whose time it is, whether the employer or the worker keeps it, or whether people feel it. Measured minutes, paid minutes and felt time are three different things and the study blends them. File 02 shows freed time is usually re-spent (Parkinson, Jevons, Linder) yet the forecasts in 03 are still reported as "saved". The headline unit is undefined.

2. **No forecast track record.** Analysts in 03 are ranked as "top" by brand, not by past accuracy. Nobody asked how McKinsey, Goldman or the IMF scored on earlier automation calls. The best known test case, Frey and Osborne's 47%, scored poorly (see Finding B). Without a hit rate, giving these sources equal weight is a guess.

3. **Western and English-language frame.** File 01 says itself that rich world means Western Europe and the US, and nearly all pre-1950 series are rich-world only. China and India, about a third of humanity, appear only in passing in 06 to 08 and not at all in the history. No Chinese, Hindi, Japanese or Spanish language sources. The 200-year story is a Western story labelled as human.

4. **Unpaid and household time is a side note.** Gender and care sit in 05 as one of nine "missed" items, yet unpaid work is roughly as many hours as paid work in many countries. AI's effect on cooking, care, admin and child supervision is the bigger time question for most people and is not modelled.

5. **False precision in scenario confidence.** File 08 gives 80%, 70%, 60%, 45%, 35%, 25%, 15% for each horizon. These are smooth stepdowns with no method, no base rate and no calibration. File 08 even tags them Estimate. Percentages imply rigour that is not there. A 15% figure for 2076 is not distinguishable from 5% or 40%.

6. **Survivorship in picking challengers.** File 04 picks Acemoglu, Gordon, Autor, Brynjolfsson, Narayanan, Kapoor, Marcus. All US-based, all male, mostly MIT and Stanford. No labour unions, no Global South economists, no feminist economists, no disability scholars, no ecological economists. The "challenge" is an in-group debate.

7. **AI-written research with thin search.** The files were drafted by agents that ran few searches. Expect bias to well-indexed English sources, recycled headline numbers, and confident prose over weak evidence. Several 03 rows are "Plausible, not re-checked". The method itself needs a disclosure line and a human pass.

8. **Law, regulation and geopolitics missing.** Regulation appears almost nowhere (a word search found zero hits in 01, 02, 03 and 05). EU AI Act, working time law, liability, chip export controls and compute access decide who gets AI time savings and when. A country without frontier compute does not follow the base scenario.

9. **Children, education, disability and ageing thin.** Children's time (school, screens, tutoring) and disabled people, for whom AI may save the most time, are near absent. Demographics appear only as "care demand". The military, the largest historic driver of time technology, is absent.

10. **Time perception and meaning ignored.** Psychology of time (felt rush, boredom, the value people place on effortful tasks), religion and culture (Sabbath, rest norms, family time) and environment (heat cutting outdoor work hours is touched in 05, but energy use of AI is not linked back to time) shape what "more free time" means. Without them the study cannot answer whether people are better off.

## Research on the top 3 gaps

### Finding A. Whose time (gap 1, with gap 4)

- Oxford researchers applied automation estimates to 19 unpaid household tasks in UK and Japan time-use data and estimated 50% to 60% of unpaid work time could be saved in principle, unevenly split by gender and life stage. **Plausible.** https://domesticai.oii.ox.ac.uk/the-future-of-unpaid-work-simulating-the-effects-of-automation-on-time-spent-on-housework-and-care-work-in-the-uk-and-japan/
- A PLOS ONE expert survey (29 UK and 36 Japanese AI experts) put the average at 39% of household task time automatable within 10 years, with physical childcare only about 21%. Authors warn the sample is small. **Plausible.** https://sciencedaily.com/releases/2023/02/230222141125.htm
- The same Oxford team says adoption will depend on cultural values at least as much as technology, and freed time could go to paid work, rest or leisure. That is exactly the ownership question the study skips. **Plausible.** https://domesticai.oii.ox.ac.uk/a-new-paper-estimating-the-potential-for-changes-in-individual-daily-lives-once-some-domestic-work-is-automated-is-out/
- A PwC paper sponsored by Meta (2026) projects 18% to 42% cut in time on supported household tasks. Sponsored and not peer reviewed. **Plausible, low weight.** https://www.pwc.com/us/en/industries/tmt/library/household-ai-assistive-support.html
- Fix: split every "time saved" claim into four columns. Paid time to employer, paid time to worker, unpaid household time, felt time. Report each separately. **Estimate.**

### Finding B. Forecast track records (gap 2)

- Frey and Osborne (2013) said 47% of US jobs were at high risk within about 20 years. ITIF found insurance underwriters, the highest-risk job, grew 16.4% from 2013 to 2021, and the link between predicted risk and job change was weak (correlation about 0.26). ITIF is an advocacy think tank. **Plausible.** https://itif.org/publications/2022/09/30/oops-the-predicted-47-percent-of-job-loss-from-ai-didnt-happen/
- Coelli and Borland (Melbourne Institute, 2019) found the Frey and Osborne scores did not add value for predicting 2013 to 2018 job change compared with simpler task measures. **Plausible.** https://papers.ssrn.com/abstract=3472764
- OECD task-based work put high-risk US jobs near 9% to 10%, a fifth of the 47% headline, from similar data. Method choice moved the answer fivefold. **Plausible.** https://eleconomista.com.ar/economia/el-mito-desempleo-tecnologico-n5828
- Frey still defends the method, and the 20-year window has not closed. So this is a weak track record, not a proven miss. **Plausible.** https://www.newstatesman.com/?p=217153
- Fix: add a "past calls" column to 03 for each analyst, and weight measured studies (Denmark, Fed, METR) above exposure studies. **Estimate.**

### Finding C. Non-Western time use (gap 3)

- India's national Time Use Survey 2024 (MoSPI, released February 2025): women aged 15 to 59 spent about 305 minutes a day on unpaid domestic work, down from 315 in 2019. Men spent about 88. Only about a quarter of women were in paid employment. **Verified** (two outlets agree). https://www.orfonline.org/expert-speak/underlining-the-work-that-women-do-findings-from-time-use-survey-2024 and https://www.businesstoday.in/india/story/time-use-survey-women-take-on-most-of-household-and-caregiving-work-465946-2025-02-25
- Women's caregiving was about 137 to 140 minutes a day against about 75 for men. Sources differ slightly. **Plausible.** https://www.businesstoday.in/india/story/time-use-survey-women-take-on-most-of-household-and-caregiving-work-465946-2025-02-25
- Meaning for the study: in India the largest block of non-leisure time for half the adult population is unpaid and mostly physical. Office AI time savings barely touch it. A Western paid-work lens would miss the main story for over a billion people. **Estimate.**
- China was not researched in this pass. China has national time-use surveys (2008, 2018) that should be added. **Estimate, open item.**

## What to change before publishing

- Define "time saved" with the four columns above and use them everywhere.
- Replace percentage confidence with words (high, medium, low) or show the method.
- Add a track record column and a non-Western panel (India, China, one African and one Latin American source).
- Add a regulation and compute access lens to 07 and 08.
- Add a short disclosure that research was AI-drafted with limited search depth.
