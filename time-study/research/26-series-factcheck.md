# 26. Series fact-check (files 23, 24, 25)

Checked 2026-10-27. Sources opened: OWID life expectancy, schooling and annual hours CSVs, BLS ATUS table 1 (2025 annual), Aguiar and Hurst (Boston Fed wp0602, Tables 2 and 3), Conversable Economist retirement post. Every number checked matched its source. The changes below fix tags (year or basis mismatch) and one projection.

| File | Item | Old | New | Reason |
|---|---|---|---|---|
| 23 | life_expectancy_US 1900 | 49.3 Verified | 49.3 Plausible | Value is OWID 1901, not 1900 |
| 23 | life_expectancy_US, UK 2024 | 79.3, 81.3 Verified | Plausible | Values are OWID 2023 |
| 23 | life_expectancy_UK 1820 | 40.84 Verified | Plausible | Value is OWID 1818 |
| 23 | schooling_years_US, UK 2024 | 13.32, 12.9 Verified | Plausible | Values are OWID 2020 |
| 23 | All ATUS 2024 rows (sleep, personal care, eating, TV, shopping, household admin, elder care) | Verified | Plausible | Figures match BLS, but year is 2025 and basis is ages 15+, not 18 to 64 |
| 23 | sleep_eat_personal_care_US 2000 | 71.84 Verified | Plausible | 2003 value (107.49 minus 35.65), 1965 value 71.64 confirmed |
| 23 | shopping 2000 | 5.27 Verified | Plausible | 2003 value |
| 23 | retirement_years_US_men | 18.2, 18.6 Plausible | unchanged | Blog confirms 18.2 (2000), 18.6 (2020), OECD not opened |
| 24 | paid_work_per_worker past | 59.5, 56.5, 44.5, 38.3, 36.3, 34.4 | unchanged | OWID hours/52 confirmed (3096, 2938, 2316, 1991.9, 1887.6, 1788.9) |
| 24 | paid_work_per_worker slow 2031 | 33.7 | 33.5 | 17-horizons "38 to 40", 39/40 x 34.4 = 33.5 |
| 24 | paid_work slow 2031 | 29.3 | 29.1 | 33.5 x 0.87 |
| 24 | free_time slow 2031 | 33.5 | 33.7 | 33 + 0.75 x 0.9 |
| 24 | base 2041, base 2051, slow 2076 | no flag | note added | 17-horizons gives no hours number there, values are interpolated or borrowed from another scenario |
| 24 | home_work_and_care 2024 | 22 Plausible | Estimate | ATUS basis 15+, adjusted to 18 to 64 by judgement |
| 24 | travel 1965, 2024 | 6, 8 Plausible | Estimate | No diary source opened |
| 24 | free_time 1965 | 34 Plausible | Estimate | Robinson and Godbey 35 not opened, value is adjusted |
| 24 | felt_time_pressure 1965, 2000 | 24, 35 Plausible | unchanged | Robinson and Godbey not found online, stays secondary (file 16) |
| 25 | viz scan | no Verified values | unchanged | No numeric claims to check |
