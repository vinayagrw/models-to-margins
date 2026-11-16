# W5 panel: Who Pays When the Agent Buys

Review date 2026-11-15. Lens: design critique (first impression, usability, hierarchy, consistency, accessibility).

## What was reviewed

- Screens: `acx-s3` to `acx-s6` final `v*` captures at 1440 and 375, light and dark. `acx-s1` and `acx-s2` have no `v*` files, so the reader captures (`s1-reader=leader-*`, `s2-reader=leader-*`) stood in.
- Copy: `drafts/acx/data.json` (2,229 strings, 8,364 words across all readers and states) and the server-rendered text of `/deep-dives/agentic-commerce-protocols` (448 words, the scenes render on the client).
- Height assumption: 1440 x 900 viewport, so the scene budget is about 1,350px.

| Scene | Measured height at 1440 | Budget 1,350px |
|---|---|---|
| s1 Stack | about 1,270px | inside, small margin |
| s2 Compare | about 1,345px | at the limit |
| s3 Adoption | about 830px | inside |
| s4 Players | about 770px | inside, but cards are mostly empty |
| s5 Challenges | about 840px | inside |
| s6 2026 to 2030 | about 1,360px light, 1,520px dark | over |

Per-reader visible words could not be measured from the server HTML. Run the layout gate with `--readers=leader,architect` to confirm the 1,800 word budget.

## Capture problems to fix before sign-off

- The 375 capture of s5 shows challenge names that are not in `data.json` ("Fraud models misread agents", "Weak proof for disputes", "Good agents versus bots"). The s6 dark capture shows the old subhead "Four scenarios with kill tests" while light shows "Four ways this could go". The shot set mixes builds. Recapture every scene from one build.
- The s4 1440 light capture has a floating dev toolbar over the Visa card. Recapture with the toolbar off.

## What works

- The seven-layer spine (L1 to L7) carries through s1, s2 and s4 with the same colours and iso tiles. A reader learns it once.
- s1 path trace plus the right drawer answers "what happens at each step" without prose.
- s3 evidence ladder is the strongest idea on the page. "Audited: No figure" says more than a paragraph would.
- s5 heatmap with a ranked column is quick to read and the quote in the drawer lands.
- Copy hygiene: zero em-dashes, en-dashes or semicolons in `data.json` and the rendered text. Very few stock AI words.

## Reader 1: client CIO. Score 6/10

First impression: a credible map, but no scene states the answer in one line, and two scenes make me click before any number means anything.

1. **s1.** Replace the subhead "Every agent payment crosses the same layers. Pick a use case, then trace a path." with the verdict: "One protocol carries live consumer checkout today. Most are still specs." Removes the old subhead, so the word count stays the same.
2. **s3.** The chips are bare numbers ("99", "3.3x", "51", "-72%") with no noun, so the ladder means nothing until each one is clicked. Put a two-word noun under each chip ("bots blocked", "UCP endorsers"). To pay for it, cut the "How this was checked" band (6 stats, about 25 words, about 130px).
3. **s6.** The year grid is mostly empty. 2029 is blank in every row and 2028 and 2030 hold only faint diamonds. Collapse to three columns (2026, 2027, 2028 to 2030) and fold the "All worlds" row into a note above the grid. Removes two columns and one row, about 140px, which brings s6 under 1.5 viewports.
4. **s4.** Each company card is about 60 percent empty space, which breaks the 35 percent empty-space budget. Cut card height to about 150px and move the one-line strategy from the drawer onto the card. Removes about 200px and the duplicate strategy line in the drawer.
5. **s2.** The dots after each layer in "You must build" have no key. Add "Effort" to the panel title and drop the separate "Set by law or network" chip row (2 chips), which s1 already covers.

## Reader 2: payments architect. Score 6/10

First impression: the layer model is right, but the page treats enablers as payment protocols, and the comparison matrix spends half its rows on options that do not fit.

1. **s1 and s2, plus the summary.** MCP, A2A, Web Bot Auth and "FIDO, EMVCo, OpenID" do not move money, but the summary says "Nineteen protocols compete to carry those payments", and s2 lists MCP and Web Bot Auth under "Fits your setup" for card checkout. Split the s1 rows under two small labels ("Carries payment" and "Enables it"). In s2, list only payment-carrying protocols under Fits and send enablers to the L1 and L3 build items. Summary becomes "Nineteen specs and programs touch the payment. Few carry it." Removes 4 names from the Fits panel.
2. **s2.** 9 of 19 matrix rows are greyed as not fitting, yet they take full height. Hide them behind a "Show 9 that do not fit" toggle. Removes about 300px, so s2 drops from about 1.5 to about 1.2 viewports.
3. **s1.** The path arc runs 1, 3, 2 because step 2 (agent signs) sits at L3 and step 3 (shopper confirms) at L2, and the crossing loops read as an error. Put the step number inside the cells on the selected row and drop the arc row. Removes about 40px and the crossing lines.
4. **s3.** "274K settled in October" and "agentic share at most 7.5%" describe the same flow but sit on different rungs and read as two separate facts. Show them as one figure in the drawer ("274K USD settled, at most 7.5 percent by agents"). Removes one chip.
5. **s6.** The forecast strip mixes US and global, 2028 to 2030, and Gartner's "Over 15T global 2028" measures B2B spend that agents influence, not agent payments. Add a US or global tag to each value and drop the Gartner row, or set it apart as "different measure". Removes one row.

## Reader 3: merchant ecommerce head. Score 6/10

First impression: s2 is the screen I would use, and the "UCP adapter once your agent order share passes 3 percent" trigger is exactly what I need. It is buried under a chip cloud and a long matrix.

1. **s2.** Show the build trigger line for every layer in "You must build" (only L1 is open), and cut the "Left to you" chip cloud (12 chips, about 60 words, about 220px), which repeats the build list in a weaker form.
2. **s1.** The "Supplier payouts" pill in the matrix legend is a consumer-checkout dead end, and s6 already ends with "B2B payouts have their own desk". Remove the s1 pill.
3. **s5.** Opening "Ranked by PSPs and networks" puts the merchant view one click away. Open the leader reader on Merchants and the architect reader on PSPs and networks. This is a state change only, no new words.
4. **s4.** All six players are networks, Google or wallet-and-chain startups. No merchant platform or PSP that a merchant actually integrates with appears. Swap Skyfire for Shopify or Stripe and keep the count at six. Removes Skyfire's moves.
5. **s6.** "Agents refer, people pay" is the merchant's base case, but its drawer only shows the generic signposts. Give it the one signpost a merchant can watch (agent-referred share of orders). Replace one illustrative signpost so the list stays at five.

## Reader 4: issuer risk lead. Score 5/10

First impression: the page says who pays in its title, but no scene puts the liability holder next to the path. Issuer data is absent and the page does not say so.

1. **s1 drawer.** Replace "Initiator presence" and "Mandate type" (already in the s2 matrix) with "Liability holder" and "What the issuer sees in authorization". Same number of rows.
2. **s2.** Rail and Finality are near duplicates in the matrix (identical marks in 15 of 19 rows). Replace the Finality column with "Agent flag in authorization", the signal an issuer scores on. Same column count.
3. **s5 at 375.** In the "Where it hurts" grid the labels overlap the bars ("Consumers" bars run into "Issuers and banks", "Agent builders" runs into "Regulators") and the right column clips. Switch it to one column under 768px. This is a layout fix, no new words.
4. **s3.** Rung 1 says only "No figure". Make it "No audited figure. No issuer has published agent fraud or dispute rates." About 12 words, paid for by cutting the s3 check band (CIO fix 2).
5. **s6.** "A network publishes an agent specific dispute reason code" is the signpost that changes my loss model, and it sits last. Move it first. Order only.

## Reader 5: editor (AI tells, jargon, filler, punctuation). Score 7/10

Punctuation passes: 0 em-dashes, 0 en-dashes and 0 semicolons across 8,364 words of copy and the rendered text.

1. **s3.** The "How this was checked" band ("reopened by a second checker", "split verdicts, stricter kept") is pipeline talk and reads like an AI process log. The numbers also do not reconcile: 192 kept plus 77 fixed plus 2 cut is 271, which is neither 450 nor 259. Cut the band. Removes about 25 words and about 130px.
2. **s6 architect copy.** "Kill test", "Thesis wins: canonical model plus adapters" and "Thesis holds: wait with readiness, never build the gateway" are house jargon. Use "Wrong if" and plain verbs ("Build one model with adapters"). Same length.
3. **s4.** The "Company" and "Startup" sublabels repeat the COMPANIES and STARTUPS headings, and the contrast is false because startups are companies too. Rename the heading "Incumbents" and drop the six sublabels.
4. **s1 and s6.** Two phrases snag: "Google and Shopify, with Stripe and councils" (what councils?) and "Edgar Dunn consultant, not the firm's official view". Rewrite as "Google and Shopify, with Stripe and two technical councils" and "Edgar Dunn (one consultant's view)". Same length.
5. **s3 and s6.** Evidence tags use a dotted underline in mono and look like links. Drop the underline and keep the colour. Style only.

## Top 8 fixes ranked by impact

| Rank | Scene | Fix | What it removes | Readers |
|---|---|---|---|---|
| 1 | s1, s2, summary | Split payment carriers from enablers. Fits lists only carriers. Rewrite the "Nineteen protocols compete to carry those payments" line | 4 names from Fits, nothing net in s1 | Architect, CIO |
| 2 | s2 | Hide the 9 rows that do not fit behind a toggle and cut the "Left to you" chip cloud. Show the build trigger line for every layer | About 520px and about 60 words. s2 goes from 1.5 to about 1.0 viewports | Architect, merchant, CIO |
| 3 | s6 | Collapse the year grid to 2026, 2027 and 2028 to 2030, and fold "All worlds" into a note | 2 columns, 1 row, about 140px. s6 gets under 1.5 viewports | CIO |
| 4 | s3 | Cut the "How this was checked" band. Put a two-word noun under every chip. Say plainly that no audited or issuer figure exists | About 25 words of pipeline talk and about 130px | CIO, editor, issuer |
| 5 | s5 | Fix the 375 "Where it hurts" overlap and clipping with one column under 768px | Overlapping text, an accessibility fault | Issuer |
| 6 | s1 drawer, s2 | Put "Liability holder" and the authorization agent flag on screen. Replace Initiator and Mandate drawer rows and the Finality column | Two duplicate drawer rows and one duplicate column | Issuer |
| 7 | s4 | Shrink the cards to about 150px, move strategy onto the card, drop the Company and Startup sublabels | About 200px of empty card, 6 labels, duplicate drawer line | CIO, editor |
| 8 | s6 | Tag each forecast US or global and drop or set apart the Gartner 15T B2B figure | 1 row | Architect |

Before sign-off: recapture all six scenes from one build with the dev toolbar off, then run the layout gate on every scene at 375, 1024 and 1440, light and dark, for both readers.
