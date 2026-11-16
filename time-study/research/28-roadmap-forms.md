# 28. Roadmap and time-journey forms (researched 2026-10-27)

## Part 1. Shutterstock references
I could not open any of the Shutterstock pages because every one returned HTTP 403. The patterns below are guesses from each title and ID. They are not verified.

| ID | Title cue | Inferred pattern |
|---|---|---|
| 2561932215 | roadmap design template, business timeline | Winding road with map pins at milestones (the usual "roadmap template") |
| 2614446031 | same title, later set | Winding or zigzag road with numbered pins, a variant of the one above |
| 2626104205 | 6 milestones | S-curve road with 6 flag or pin stops |
| 2637745211 | 7 milestones | Serpentine road or climbing path with 7 stops |
| 2635827955 | 6 arrow | 6 chevron arrows in a row, each with a label |

The brief said six pages but listed only five URLs.

## Part 2. Open-gallery forms
"Opened" means I fetched the page and confirmed the form. "Not opened" means the URL returned 404 or was not tried, so the description comes from my own knowledge.

| # | Form | URL | Status | Pattern | Best fit for the time-rebound study |
|---|---|---|---|---|---|
| 1 | Timeline | https://datavizproject.com/data-type/timeline/ | Opened | Events placed in order along one axis, on a true time scale or in plain sequence | The spine for invention, adoption, rebound across 200 years |
| 2 | Streamgraph | https://datavizproject.com/data-type/stream-graph/ | Opened | Stacked layers that flow around a central axis | "River" of hours by activity (work, leisure, care) over 200 years |
| 3 | Stacked area | https://datavizproject.com/data-type/stacked-area-chart/ | Opened | Layers stacked from a baseline | Hours budget split over time, with exact totals |
| 4 | Slope chart | https://datavizproject.com/data-type/slope-chart/ | Opened | Two time points joined by one line per item | Before and after: hours saved at invention vs hours at rebound |
| 5 | Sankey | https://datavizproject.com/data-type/sankey-diagram/ | Opened | Flows whose width matches their size | Where the saved hours went (more output, more work, leisure) |
| 6 | Line time series (OWID) | https://ourworldindata.org/grapher/annual-working-hours-per-worker | Opened | Line chart of annual hours per worker by country, 1870 to 2023 | The data backbone for the long-run hours trend |
| 7 | Priestley timeline (FT) | https://github.com/Financial-Times/chart-doctor/tree/main/visual-vocabulary | Opened (category list) | Bars that span each item's start to end on a time axis, like a Gantt chart | Swimlane per invention, bar from invention to rebound, for 1 to 50 year horizons |
| 8 | Circle timeline (FT) | same | Opened (category list) | Circles on a time line, sized by value | Milestones sized by hours saved |
| 9 | Fan chart, projection (FT) | same | Opened (category list) | A widening band of uncertainty around a forecast | 1 to 50 year forecast of the rebound |
| 10 | Connected scatterplot (FT) | same | Opened (category list) | A path through x/y space with time marking each point | Efficiency vs hours worked, so a rebound shows up as a loop back |
| 11 | Calendar heatmap (FT) | same | Opened (category list) | A grid of days or years coloured by value | Decade-by-year grid of hours |
| 12 | Spiral or clock | datavizproject spiral page | Not opened (404) | Time wound into a spiral | Repeating cycles, a poor fit for 200 linear years |
| 13 | Metro line | not found | Not opened | Parallel coloured lines with stations | One line per technology, with stations at invention, adoption and rebound |
| 14 | Stairs or milestone mountain | not found | Not opened | Steps rising to a peak | The climb in productivity, then the slide back down |
| 15 | Chevron process | from the Shutterstock title only | Not opened | Arrows in a chain | Stages: invent, adopt, save, rebound |

## Recommendation
- Main view: a Priestley or Gantt swimlane with one lane per invention, marking invention to rebound.
- Long-run context: an OWID-style line, or a stream river for 200 years of hours.
- Payoff: a slope chart for before and after, or a Sankey for where the hours went.
- Horizon: a fan chart for the 1 to 50 year forecast.
- Avoid: spiral and clock forms, because the study is linear and not cyclical.
