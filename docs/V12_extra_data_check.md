# V12. Fact check of extra.json (timeline and scorecard)

Checked 2026-10-26 by a fresh checker with no prior context, desk check against V9 and the ledgers, no web fetches.

## Method

I read `drafts/deep/extra.json` and compared each of the 17 timeline events with the matching row in `docs/V9_pages_fact_check.md` (Page 1 rows 57 to 65 for the nine frontier events, Page 2 rows 34 to 41 for the eight search events), then with the ledger row V9 cites. For the search page the ledger is `docs/AI_Web_Search_Failures_Technical_Design.md` Appendix A (numbered rows) and section 9 (dated table). For the frontier page it is `docs/Frontier_AI_Challenges_User_Research.md` Appendix A (VR rows), A2 (L rows), A3 (LK rows) and section 8, plus the VR rows in `V_R1_R3.md` and `V_R2_R4.md` and the LK rows in `V7_lockin_verification.md` and `R7_vendor_lockin.md`. Where V9 said wrong, I checked that the extra.json text equals the V9 Fix wording. For each event I checked the ISO date against the V9 row and the ledger row, and the ids against the page label and any problem the text names. The 70 scorecard cells were compared one by one with the section 5 grid of the search design doc (letter and star), and 29 cells, including all of rows S1 and S4, with the wording in `P2_D_scorecard.md` section 1 and its addendum.

## Summary

| Check | Count |
|---|---|
| Timeline events verified | 17 of 17 (11 as on the page V9 checked, 6 after a V9 fix) |
| Timeline events unverified | 0 |
| Scorecard cells matching section 5 | 70 of 70 (letter and older flag) |
| Scorecard cells not matching | 0 |

Id check: all 17 events carry the id of their own label. The two extra ids (S9 on T08, S7 on T15) are backed by section 9 of the search design doc, which ties the Full Fact report to #5 and #9 and the 2.1.307 change to #2 and #7. No disagreement.

## Timeline

| id | date | text (first 60 characters) | ids | V9 row | ledger row | status | note |
|---|---|---|---|---|---|---|---|
| T01 | 2026-09-15 | A major bot network starts blocking AI agents on ad pages by | S7 | P2 row 34 (line 149), wrong | ledger row 24, section 9 row 2026-09-15 | verified | after V9 fix. First sentence equals the row 34 fix wording. The second sentence is the band note V9 asked for, folded into the event. Row 24 carries the article date 2026-10-17. Section 9 dates the launch 2026-09-15, marks #7 worse, and keeps pre-window launches with a note |
| T02 | 2026-09-25 | Fake support numbers planted for 374+ companies reach AI ans | S4 | P2 row 35 (line 150), verified | ledger row 17 | verified | Text equals the page text V9 checked. Row 17 dated 2026-09-25, 374+ companies. Section 9 row 2026-09-25, #4 worse |
| T03 | 2026-09-29 | OpenAI halves what its $200 Pro plan includes | F7 | P1 row 57 (line 97), verified | VR4-04 | verified | Text equals the page text V9 checked. VR4-04 dated 2026-09-29, $200 Pro cut from 20x to 10x Plus. Section 8 row 2026-09-29, Usage caps |
| T04 | 2026-10-05 | Claude Code starts reporting unread page text instead of dro | S6 | P2 row 36 (line 151), verified | ledger row 22 | verified | Text equals the page text V9 checked. Row 22 covers 2.1.290 of 2026-10-05. Section 9 row 2026-10-05 says partial fix for #6 and #2. The event carries S6 only, which follows the rule, since the text does not name #2 |
| T05 | 2026-10-07 | A spending-limit fault pauses some paying organisations acro | F12 | P1 row 58 (line 98), wrong (minor) | VR3-22 | verified | after V9 fix. Text equals the row 58 fix wording (adds some, every Claude product). VR3-22 dated 2026-10-07. Section 8 row 2026-10-07, Outages |
| T06 | 2026-10-08 | 8 of 10 AI search platforms cite a made-up concept within a | S4 | P2 row 37 (line 152), verified | ledger row 16 | verified | Text equals the page text V9 checked. Row 16 dated 2026-10-08. Section 9 row 2026-10-08, #4 measured. The label says worse, which is the doc 3.0 verdict for #4 (V9 P2 row 7) |
| T07 | 2026-10-09 | A lawyer is ordered to pay $38,877.59 personally over AI-inv | F1 | P1 row 59 (line 99), wrong (minor) | VR3-03, VR3-04, L-06 | verified | after V9 fix. Text equals the row 59 fix wording (ordered to pay). VR3-03 dates the fee order 2026-10-09 and the article 2026-10-20. L-06 carries the article date only. Section 8 row 2026-10-09. The event date is the order date, which is right |
| T08 | 2026-10 | Full Fact: stale figures and wrong office holders with searc | S5, S9 | P2 row 38 (line 153), unverified (date only) | ledger row 20 | verified | after V9 fix. V9 found the content matched and only the 15 Oct day unsupported, and offered month precision. Row 20 says about 2026-10-15, undated page. V1 row V42 and V2 rows VT2, VT5 and VT9a say the date comes from secondary coverage dated 2026-10-15. Month precision is supported by the ledger through that coverage. The day is not. Section 9 row marks #5 and #9 re-confirmed, so S9 fits |
| T09 | 2026-10-13 | A hidden instruction could run code through Copilot in Visua | F4 | P1 row 60 (line 100), verified | VR4-06 | verified | Text equals the page text V9 checked. VR4-06 dated 2026-10-13, CVSS 8.8, patched. Section 8 row 2026-10-13, Attack path |
| T10 | 2026-10-14 | Eight US states sue OpenAI over ChatGPT safety | F8 | P1 row 61 (line 101), verified | VR3-07 | verified | Text equals the page text V9 checked. VR3-07 dated 2026-10-14. Section 8 row 2026-10-14 |
| T11 | 2026-10-15 | One leading model opened no page in over half its searches | S6 | P2 row 39 (line 154), verified | ledger row 21 | verified | Text equals the page text V9 checked. Row 21 dated 2026-10-15, one model 53.6% of episodes. Section 9 row 2026-10-15, #6 measured live |
| T12 | 2026-10-15 | The FTC subpoenas OpenAI and Anthropic | F9 | P1 row 62 (line 102), verified | VR4-17 | verified | Text equals the page text V9 checked. VR4-17 dated 2026-10-15. Section 8 row 2026-10-15, Controls lag |
| T13 | 2026-10-16 | A UK regulator says switching barriers keep customers on Mic | F14 | P1 row 63 (line 103), verified | LK-10 | verified | Text equals the page text V9 checked. LK-10 dated 2026-10-16 in Appendix A3, verified in V7, named the best dated item in window in R7. The section 8 table has no CMA row, the lock-in theme is kept in A3 and R7 instead |
| T14 | 2026-10-19 | Gartner finds only 13% of CIOs see significant or transforma | F5 | P1 row 64 (line 104), verified | VR2-01 | verified | Text equals the page text V9 checked. VR2-01 release dated 2026-10-19. Section 8 row 2026-10-19, Spend |
| T15 | 2026-10-21 | Claude Code cloud sessions now return blocked fetches as nor | S2, S7 | P2 row 40 (line 155), wrong | ledger row 22 | verified | after V9 fix. Text equals the row 40 fix wording (cloud sessions, as local sessions already did). Row 22 covers 2.1.307 of 2026-10-21. Section 9 row 2026-10-21 now carries the Cowork cloud sessions qualifier and says partial fix for #2 and #7, so S7 fits |
| T16 | 2026-10-21 | OpenAI says its agents muted alerts and removed a monitor | F2 | P1 row 65 (line 105), verified | VR4-03 | verified | Text equals the page text V9 checked. VR4-03 dated 2026-10-21. The V_R2_R4 row says 2026-10-21/22 because two outlets are cited. Section 8 row 2026-10-21, Agents act wrongly |
| T17 | 2026-10-22 | Publisher copyright suit that alleges invented quotes heads | S1 | P2 row 41 (line 156), wrong | ledger row 41 | verified | after V9 fix. Text equals the row 41 fix wording (copyright suit that alleges invented quotes). Row 41 dated 2026-10-22. Section 9 row 2026-10-22 still reads heading to jury trial on fabricated quotes, so the doc keeps the wording V9 corrected on the page |

Status fields in extra.json (worse, part, true) were read as page labels and not checked beyond the ids.

## Scorecard

Reference: `docs/AI_Web_Search_Failures_Technical_Design.md` section 5 (lines 317 to 349). Letter as in the doc, star where the doc marks all evidence as pre-2026 (equals older=true in extra.json), X where the doc shows a dash (no independent evidence). "ok" means letter and older flag both match.

| row | Claude | ChatGPT | Gemini | AI Overviews | Perplexity | Grok | Copilot |
|---|---|---|---|---|---|---|---|
| S1 | B ok | M ok | W ok | N ok | M ok | W* ok | M* ok |
| S2 | N* ok | M* ok | W ok | N ok | W* ok | N ok | B* ok |
| S3 | M ok | M ok | M ok | X ok | W* ok | M* ok | X ok |
| S4 | B ok | W ok | B* ok | N ok | M ok | W ok | N* ok |
| S5 | W ok | B ok | M ok | N ok | X ok | X ok | N* ok |
| S6 | X ok | N ok | X ok | X ok | X ok | X ok | X ok |
| S7 | N ok | N ok | B ok | X ok | N ok | X ok | X ok |
| S8 | B ok | W ok | B ok | N ok | X ok | M ok | N* ok |
| S9 | N ok | N ok | W ok | X ok | X ok | N ok | X ok |
| S10 | B ok | M ok | W ok | X ok | N ok | X ok | N ok |

Totals in extra.json: 9 B, 12 M, 11 W, 19 N, 19 X, 12 cells with older=true. The doc section 5 totals are 9 B, 12 M, 11 W, 19 N, 19 dash, and it carries 12 stars. V9 Page 2 row 42 (line 157) reached the same result on the page the data was copied from.

Mismatches: none.

Wording check against `docs/AI_Web_Search_Failures_research/P2_D_scorecard.md` section 1 (lines 13 to 28), 29 cells:

- Rows S1 and S4, all 14 cells. 13 match the section 1 wording and STALE flag directly (Better than peers = B, Mixed = M, Worse than peers = W, Not enough data = N, STALE = older). S4 Grok reads "Not enough data. STALE" in section 1, and the addendum at lines 115 to 127 (line E55) regrades it to Worse than peers on the 2026 made-up concept study. extra.json carries W with older=false, which is the addendum value and the section 5 value.
- 15 other cells: S2 Copilot (B, STALE), S3 Perplexity (W, STALE), S3 Grok (M, STALE), S5 Copilot (N, STALE), S6 ChatGPT (N), S7 Gemini (B), S8 Claude (B), S8 Copilot (N, STALE), S9 Gemini (W), S10 Claude (B), S10 Gemini (W) match section 1 directly. S2 Gemini, S5 Claude, S5 ChatGPT and S5 Gemini read Not enough data in section 1 and are regraded in the addendum (E56 Gemini N* to W, E54 Claude N to W, ChatGPT N to B, Gemini N to M). extra.json carries the addendum values, which are also the section 5 values.
- So 24 of 29 cells match the section 1 text as written, and the other 5 match the P2_D addendum and section 5. The section 1 grid in P2_D was not rewritten after the addendum. Its grade count line (8 B, 11 M, 8 W, 24 N, 19 none) is the pre-addendum count. The addendum totals (9 B, 12 M, 11 W, 19 N, 19 dash) equal extra.json. This is a stale table in the research file, not an error in extra.json.
- Key wording: extra.json says X is "No independent data". The doc and P2_D say "no independent evidence". Same meaning, not a cell.

## Where I looked for unverified items

No event is unverified. These are the places I checked for the four items that needed a second look.

- T08 date. `docs/AI_Web_Search_Failures_Technical_Design.md` Appendix A row 20 and row 49 (about 2026-10-15, undated page) and section 9 row 2026-10-15. `docs/AI_Web_Search_Failures_research/V1_verification.md` row V42 (page shows no publication date, the 2026-10-15 date comes from secondary coverage). `V2_verification.md` rows VT2, VT5, VT9a (undated page, coverage 2026-10-15). `U2_studies_benchmarks.md` row 4 (2026-10-15 per Resultsense, page itself undated). `P2_E2_studies_community.md` line 184 (same). No ledger holds a dated Full Fact release, so the day stays unsupported and the month rests on the coverage date.
- T13 absence from the dated table. `docs/Frontier_AI_Challenges_User_Research.md` section 8 table (no CMA row), Appendix A3 row LK-10. `docs/Frontier_AI_Challenges_research/V7_lockin_verification.md` rows LK-10 and 2.7c (verified, 2026-10-16). `R7_vendor_lockin.md` lines 73, 88, 90 and 123.
- T07 article date. Appendix A rows VR3-03 (order 2026-10-09, article 2026-10-20), VR3-04 (2026-10-09) and A2 row L-06 (2026-10-20). `V_R1_R3.md` rows VR3-03 and VR3-04. Section 8 row 2026-10-09. V9 drift table notes the same disagreement on the article date. The event uses the order date.
- T01 pre-window date. Appendix A row 24 (article 2026-10-17), section 9 row 2026-09-15 and the note under the table about launches tracked from 25 August. V9 Page 2 row 34 read the source as a 15 Sep 2026 start.
- Scorecard. Section 5 of the search design doc, P2_D section 1 and addendum, V9 Page 2 row 42.
