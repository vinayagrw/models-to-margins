# 23 Variables (sourced, 2026-10-27)

Each value was read in the opened source. Verified means seen there. Plausible means secondary. Blank means not found.

| Variable | Unit | 1820 | 1870 | 1900 | 1930 | 1965 | 2000 | 2024 | Source | Note |
|---|---|---|---|---|---|---|---|---|---|---|
| life_expectancy_US | years |  |  | 49.3 P) | 59.6 (V) | 70.25 (V) | 76.81 (V) | 79.3 (P) | https://ourworldindata.org/grapher/life-expectancy.csv?csvType=filtered&country=USA~GBR | US series starts 1880, so 1820 and 1870 blank |
| life_expectancy_UK | years | 40.84 P) | 40.61 (V) | 45.62 (V) | 60.77 (V) | 71.52 (V) | 77.85 (V) | 81.3 (P) | https://ourworldindata.org/grapher/life-expectancy.csv?csvType=filtered&country=USA~GBR | OWID labels this United Kingdom, early years are England and Wales |
| schooling_years_US | mean years |  | 4.26 (V) | 6.38 (V) | 7.9 (V) | 10.42 (V) | 13.1 (V) | 13.32 (P) | https://ourworldindata.org/grapher/mean-years-of-schooling-long-run.csv?country=USA~GBR |  |
| schooling_years_UK | mean years |  | 0.92 (V) | 2.55 (V) | 5.42 (V) | 7.65 (V) | 9.97 (V) | 12.9 (P) | https://ourworldindata.org/grapher/mean-years-of-schooling-long-run.csv?country=USA~GBR |  |
| retirement_years_US_men | expected years in retirement |  |  |  |  |  | 18.2 (P) | 18.6 (P) | https://conversableeconomist.com/2023/02/01/retirement-ages-some-international-comparisons/ | Blog citing OECD, OECD page returned 403. 1970 value 12.8. OECD avg 1970 men 11, women 15 |
| sleep_US | hours/week |  |  |  |  |  |  | 63.2 (P) | https://www.bls.gov/news.release/atus.t01.htm | 1965 sleep not separated in Aguiar-Hurst tables |
| sleep_eat_personal_care_US | hours/week |  |  |  |  | 71.64 (V) | 71.84 P) |  | https://www.bostonfed.org/economic/wp/wp2006/wp0602.pdf | Derived from two printed rows |
| personal_care_incl_sleep_US | hours/week |  |  |  |  |  |  | 68.6 (P) | https://www.bls.gov/news.release/atus.t01.htm |  |
| eating_drinking_US | hours/week |  |  |  |  |  |  | 8.47 (P) | https://www.bls.gov/news.release/atus.t01.htm |  |
| tv_watching_US | hours/week |  |  |  |  |  |  | 18.27 (P) | https://www.bls.gov/news.release/atus.t01.htm | 1965 Robinson-Godbey figure not found in an opened source |
| shopping_obtaining_goods_services_US | hours/week |  |  |  |  | 6.09 (V) | 5.27 P) | 4.83 (P) | https://www.bostonfed.org/economic/wp/wp2006/wp0602.pdf | 2024 row from https://www.bls.gov/news.release/atus.t01.htm |
| household_admin_US | hours/week |  |  |  |  |  |  | 1.19 (P) | https://www.bls.gov/news.release/atus.t01.htm |  |
| elder_care_nonhousehold_adults_US | hours/week |  |  |  |  |  |  | 0.49 (P) | https://www.bls.gov/news.release/atus.t01.htm | Household-adult care not split out in table 1 |

V = Verified, P = Plausible. 2024 column uses latest available (ATUS 2025 release, OWID 2023 or 2020), noted in the JSON.


Near-year values and ATUS 2025 (ages 15+) values retagged Plausible in file 26.

The Travel panel in "Where the hours went" reads the core per adult travel series documented in 24-core-series.md (Estimate), and the UK life expectancy and UK schooling series stay in the page data unused (2 Nov 2026).