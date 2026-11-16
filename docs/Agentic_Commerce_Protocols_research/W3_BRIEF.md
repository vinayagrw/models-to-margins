# Wave 3 brief: red team and section checkers

Repo root: the `models-to-margins` folder. Today is 2026-11-15.

Inputs
- The design doc: `docs/Agentic_Commerce_Protocols_Technical_Design.md`
- The research briefs and their claim tables: `docs/Agentic_Commerce_Protocols_research/R1_specs.md`, `R2_rails.md`, `R3_players.md`, `R4_risk.md`, `R5_pain.md` (13 columns: id, claim, number, unit, event_date, publish_date, url, quote, source_tier, kind, rung, does not tell you, confidence)
- Baseline rows `C###` and `X#n` live in `R0_R1.md` to `R0_R5.md`
- The page data: `drafts/acx/data.json` (items cite claim ids in `src`)

Write only your own output files. Never edit the doc, the briefs, data.json or another agent's file.

House rules for everything you write: no em-dash, no semicolon, plain words, ISO dates. Never invent a source, a person or a quote.

## Section checker (K1 to K6)

You check one or two sections. For every statement in your sections that carries a number, a date, a regulator, a law, a company, a product status or a ranking:

1. Find the claim ids it cites. Look each id up in the claim tables with `grep -h "| <id> |" docs/Agentic_Commerce_Protocols_research/*.md`. Read only those rows, not whole briefs.
2. Open the source URL yourself with WebFetch. You are not the finder, so do not trust the row's quote. If the page will not open, is paywalled, or does not clearly say it, the verdict defaults to "does not support".
3. Judge three things.
   - Correct: the number, date, name and status match the page.
   - True: the doc's wording does not overstate the page (a pilot called live, a vendor figure stated as fact, a plan called a launch, a forecast called a result).
   - Complete: the section does not leave out something a client would need to avoid a wrong decision. List at most 5 gaps per section, each with a research question.
4. Give a verdict per claim id: `keep` (supported as worded), `fix` (supported once reworded, give the new wording), `cut` (not supported or not openable).

Budget: open at most 45 pages. Check the highest stakes first: numbers on the page data, statuses, regulation, rankings. If you run out, list what you did not check.

Write two files.

`W3_K<n>.md`
- a header line naming your sections and counts (statements checked, keep, fix, cut, not checked)
- a table: `| # | Section | Statement (short) | Claim ids | Verdict | Fix wording | Why | Opened (yes or no) | Page says (under 20 words) |`
- a "Gaps" list: gap, why it matters, research question
- a "Not checked" list

`W3_K<n>.json`, keyed by claim id:
```json
{ "R2-14": { "verdict": "fix", "fix": "new wording", "why": "page says pilot, doc says live", "opened": true, "checker": "K2" } }
```

Reply in under 150 words: counts, the three most serious problems, and gaps.

## Red team (one agent)

Read the whole doc. You are a sharp external reviewer who wants this design to fail review. Attack the thesis (section 3), the parameter and variable set (section 4), the reference architecture and ADRs (section 5), the pattern choice and decision tree (section 8), the rankings of players (section 9), the top 10 challenges (section 10), the scenarios and signposts (section 11) and the decision criteria and weights.

Write `W3_redteam.md` with numbered critiques C1 to Cn (aim for 15 to 20, no padding). Each has:
- target section
- the critique in two to four sentences
- why it matters to a client decision
- severity: high, medium or low
- what evidence would settle it, as one research question a gap closer can answer with web search

End with "Strongest parts" (at most 5 lines) so the lead knows what to keep. Do not do web research yourself beyond a handful of quick checks. Reply in under 150 words with the top five critiques by severity.
