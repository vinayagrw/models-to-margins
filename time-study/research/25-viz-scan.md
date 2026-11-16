# 25 Viz scan: time use and multi-variable change over time

Scan date: 2026-10-27. Window: 2026-09-27 to 2026-10-27.

## In-window examples (last 30 days)

None verified. Two web searches (general time-use viz, and outlet-specific: Pudding, FlowingData, FT, Economist) returned no dated piece inside the window. Do not cite any in-window example until a targeted per-outlet check (site search plus publish date) confirms one.

Nearest recent item, outside window: Jake Cuth, "Time Use Lab", May 2026, https://jakecuth.pages.dev/work/time-use-lab/ (Older, discretionary hours per weekday vs weekend). Not counted in the 5 below.

## Older (max 5)

| # | Outlet, title | URL | Chart type | Animation | Why it works |
|---|---|---|---|---|---|
| 1 | FlowingData, A Day in the Life of Americans (2015) | https://flowingdata.com/2015/12/15/a-day-in-the-life-of-americans/ | Simulated dot swarm by activity | Dots move between activity clusters by clock time | One dot per person makes shares feel human. Time of day is the clock |
| 2 | FlowingData, How men and women spend their days | https://flowingdata.com/ (ATUS series) | Stacked area by hour, small multiples by sex | Static or hover | Same scale side by side makes the gap obvious |
| 3 | Our World in Data, Time use | https://ourworldindata.org/time-use | Stacked bar by country, line by year | Timeline slider | Fixed 24 h total, comparable categories |
| 4 | OWID, Hours per week spent in leisure, US | https://ourworldindata.org/grapher/hours-per-week-spent-in-leisure-united-states | Multi-line, hours per week | Slider replay | Unit matches the reader's own week |
| 5 | NYT, How Different Groups Spend Their Day (2009) | https://archive.nytimes.com/www.nytimes.com/interactive/2009/07/31/business/20080801-metrics-graphic.html | Streamgraph by minute of day | Hover filter by group | Streams show share and rhythm in one shape |

## Recommended 3 forms for: hours per week across 8 activities, 1820 to 2076, scenario futures, saved vs spent

1. **Stacked area (or normalized streamgraph) on a 168 h week, 1820 to 2076.** Eight bands, fixed total so every gain is a visible loss elsewhere. Solid fill to 2026, hatched or lighter fill after. A scenario toggle swaps the post-2026 bands with an animated morph (600 to 800 ms), never overlaying all futures at once.
2. **Small multiples, one panel per activity, with scenario fan.** Eight panels on a shared y-axis. History as one line, futures as a fan or 2 to 3 lines labelled at the right edge. Best for reading each activity's own trend and the spread between scenarios.
3. **Diverging bar or slope for saved vs spent, at chosen years.** Hours freed (saved) to the left, hours newly absorbed (spent) to the right, per activity, for 1820, 1920, 2026, 2076 per scenario. A scrubber steps through years, bars animate in place. This is the payoff chart for the saved vs spent question.

Skip: bump chart (ranks hide hours), Marimekko (hard across 256 years), animated bubble (weak for exact hours). Scrollytelling is a wrapper, use it to sequence 1 then 2 then 3.

## Sources
- https://flowingdata.com/2015/12/15/a-day-in-the-life-of-americans/
- https://ourworldindata.org/time-use
- https://staging-owid.netlify.app/grapher/hours-per-week-spent-in-leisure-united-states
- https://jakecuth.pages.dev/work/time-use-lab/
- https://www.nature.com/nature-index/news-blog/data-visualization-day-in-the-life-women-men
