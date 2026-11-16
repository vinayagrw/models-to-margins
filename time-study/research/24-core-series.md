# 24. Core time-use series, US, 1820 to 2024, plus projections

Basis: United States, average adult aged 18 to 64, hours per week (all 7 days averaged). One extra reference row gives hours per employed worker, because that is the only series with Verified points before 1965. Data file: 24-core-series.json.

Tags. Verified: figure read from the source in this pass or in files 15, 16, 19, 22. Plausible: credible source, not opened in this pass, or a near year. Estimate: no direct measure, value reasoned as stated below. Projection: derived only from 17-horizons.json.

## Past

| Variable | 1820 | 1870 | 1900 | 1930 | 1965 | 2000 | 2024 |
|---|---|---|---|---|---|---|---|
| Paid work per worker (reference) | 62 E | 59.5 V | 56.5 V | 44.5 P | 38.3 V | 36.3 V | 34.4 P |
| Paid work per adult | 45 E | 38 E | 36 E | 27 E | 27 E | 28 E | 30 E |
| Home work and care | 27 E | 26 E | 25 E | 25 E | 26 E | 23 E | 22 E |
| Travel (commute and errands) | 6 E | 6 E | 6 E | 7 E | 6 E | 8 E | 8 E |
| Free time | 16 E | 23 E | 26 E | 34 E | 34 E | 34 E | 33 E |
| Always rushed (% adults) | not measured | not measured | not measured | not measured | 24 P | 35 P | 25 E |

## Sources and reasoning

- Paid work per worker. OWID annual hours per worker (Huberman and Minns to 1938, PWT later), read from the OWID CSV on 2026-10-27: 3,096 (1870), 2,938 (1900), 2,316 (1929), 1,991.9 (1965), 1,887.6 (2000), 1,788.9 (2023), divided by 52. 1930 uses 1929 (Plausible). 2024 uses 2023 (Plausible). 1820 is an Estimate: OWID has no US value, set a little above 1870 on the trend. https://ourworldindata.org/grapher/annual-working-hours-per-worker
- Paid work per adult. Per worker hours times an assumed employment to adult ratio (about 0.75 in 1820 to 1900 with farm family labour counted, 0.6 in 1930 for Depression unemployment, 0.7 in 1965, 0.77 in 2000, about 0.87 of per worker hours in 2024 for 18 to 64). All Estimate. ATUS 2024 shows about 3.6 hrs a day for all people 15 and over (Plausible), lower than our figure because it includes retirees.
- Home work and care. Ramey (NBER w13985): women's home time down about 6 hrs a week 1900 to 1965, down 12 more by 2005, men up about 13 (3.9 to 16.8 hrs, ages 18 to 64). Full time housewives about 52 hrs early 1900s, 56 late 1960s (Mokyr, Verified in file 19). Adult averages blend men and women, so they are Estimates. 2024 from ATUS household, care and shopping time, about 3.1 hrs a day (Plausible). 1820 and 1870 set at the 1900 level plus a little for pre-appliance farm homes, Estimate. https://www.nber.org/papers/w13985
- Travel. Travel time budget near 1 hr a day (Zahavi, Marchetti, file 15, Verified as a constant). UK NTS gives 58 min a day in 2023, not used as a US value. US 1965 and 2024 from diary studies and ATUS, about 1.1 to 1.2 hrs a day (Plausible). Earlier years assume the walking budget, Estimate.
- Free time. 1985 diaries gave 40 hrs men, 39 women (file 16, Verified, not a target year). Robinson and Godbey 1965 about 35 hrs, Aguiar and Hurst show leisure rose 1965 to 2003 (Plausible). Pre 1965 values are residuals: 168 minus about 75 hrs sleep and personal care minus the rows above, Estimate. 2024 set below ATUS 15+ leisure (about 5.5 hrs a day) because retirees are excluded.
- Always rushed. Robinson and Godbey: 24% in 1965, 35% in the 1990s to 2004 (file 16, Plausible). 2024 is an Estimate: no 2024 reading found. Pew 23% (2005, Verified) and the UMD fall after 2004 suggest about a quarter. Do not join with Gallup "never enough time" (70% to 80%, employed, 2011 to 2018).

## Gaps

- No US time diaries before 1965, so all pre 1965 splits except per worker paid hours are Estimates.
- GSS RUSHED item not pulled, which would fill 1982 to 2018.
- ATUS 2024 tables not opened in this pass.

## Future (Projection, 17-horizons.json only)

Paid work per worker, hrs a week, 2026 anchor 34.4:

| Scenario | 2027 | 2029 | 2031 | 2036 | 2041 | 2051 | 2076 |
|---|---|---|---|---|---|---|---|
| Slow | 34.4 | 34.4 | 33.5 | 31.4 | 27.5 | 24.9 | 21.5 |
| Base | 34.4 | 34.4 | 33.4 | 30.1 | 28.0 | 25.8 | 19.4 |
| Fast | 34.4 | 34.4 | 34.4 | 34.4 | 34.4 | 34.4 | no number |
| Energy | 34.4 | 34.4 | 34.4 | 33.4 | 30.1 | 28.0 | 25.8 |

Derivation. Horizon text "hours flat" keeps 34.4. Base +5 uses the midpoint of "down 2% to 4%". Ranges for full time hours (38 to 40, 34 to 36, about 32, 28 to 30, 20 to 25) are scaled as a ratio to a 40 hr week. Slow +10 uses "leisure up 2 to 4 hrs". Fast says hours barely fall, and gives no figure at +50. Energy is base lagged one horizon, from "hour cuts arrive years later" and "lag a decade". Paid work per adult = per worker times 0.87. Free time = 33 plus 0.75 of the per worker cut. Base +15 text says leisure about a third higher than 2026, which would be about 44, above our formula (37.8), so read it as an upper bound. No numbers for home work, travel or felt pressure in 17-horizons.json, so no projection. Fast +5 "near 80%" refers to the Gallup measure, a different series.
