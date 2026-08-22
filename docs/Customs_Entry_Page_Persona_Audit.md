# Customs Entry Agent — Multi-Persona Audit

**Page:** `/deep-dives/customs-entry-agent`
**Audit date:** 2026-08-22
**Question put to the panel:** does this page communicate the problem, the challenges, and then the solution, correctly and efficiently, to someone with no customs and no AI background?

Six personas were run against the built page and its 22 figures. Each finding is tied to a file or a figure, and each carries a verdict. Findings that were page defects were fixed in this cycle and are marked **FIXED**. Findings that are judgment calls or carried debt are marked **OPEN** and were not silently changed.

Method note: claims below were checked against the files, not recalled. Where a check was a command, the command is named so it can be re-run.

---

## Verdict summary

| Persona | Verdict | Fixed this cycle | Left open |
|---|---|---|---|
| 1 · Non-expert reader | **Pass, with one stated exception** | 3 | 2 |
| 2 · Licensed customs broker | **Pass** | 1 | 0 |
| 3 · CFO / commercial buyer | **Pass** | 0 | 2 |
| 4 · ML engineer | **Pass** | 2 | 1 |
| 5 · Solution architect | **Pass with reservations** | 0 | 3 |
| 6 · Sceptical journalist | **Pass** | 2 | 1 |

**Overall: yes, with one exception the page states openly.** A reader with no background can state the problem, the challenge and the solution after one pass. Chapter 4 is not layman-readable and does not claim to be — it tells that reader to skip it.

---

## Persona 1 · Non-expert reader

*A graduate with no trade and no AI background. Test: after one pass, can they restate problem, challenge and solution unprompted?*

**Restatement produced from the plain layer alone**, with every figure and technical paragraph ignored:

> Things brought into the US get a number, the number sets the tax, and getting it wrong costs a multiple of the tax. Shipments get held up because the paperwork disagrees with itself and nobody notices until the goods are at the border. AI is not good enough to pick the number, and the rules change faster than software ships. So instead of asking the AI to name the goods, sort each item by whether you have shipped it before, and spend real effort only on the ones you have not. The bill is people's time, not computing.

That is the argument. It is reachable from the 174-word opener and six one-line chapter summaries, all under 25 words each. **Pass.**

**FIXED · P1-1 · Undefined vocabulary, 84 term/file pairs.** A lint across the prose and all 22 figures found 84 places where a term appeared with no gloss anywhere in the same file. Because each figure is read standalone inside an iframe, a definition in the prose above does not reach it. Closed by `public/visuals/customs-entry-agent/_glossary.js`, a shared module that reads the words each figure actually shows and appends a definitions strip naming only those. Verified live: `gap-map.html` reports exactly its seven terms (`CBP, SKU, ISF, liquidation, protest, prior disclosure, bond`), which includes all four the lint flagged as bare.

**FIXED · P1-2 · Coined names used as titles.** "Four workers, one gauntlet", "Invalidate on reasoning, not on rates", "Route on novelty, not difficulty", "one topology", "Append-only" all led with house vocabulary. Retitled to lead with the plain description. Figure `id`s and anchors were not touched, so no cross-reference broke.

**FIXED · P1-3 · SKU defined 200 lines after first use.** Defined at its first use in Chapter 3 instead.

**OPEN · P1-4 · Figure alt text still names terms bare.** `title=` attributes on six figures name ISF, liquidation, bond, Object-Lock, importer of record and materiality without gloss. A screen-reader user meets these before reaching the figure's own definitions strip. Not fixed because glossing inside alt text would roughly double its length, and alt text is written to be heard in one pass. The definitions are in the figure DOM and are reachable. **Judgment call, flagged not changed.**

**OPEN · P1-5 · Chapter 4 is not layman-readable.** It names Step Functions, EventBridge, Aurora, ElastiCache, Textract and Bedrock. These are proper nouns and renaming them would make the chapter useless to the people who need it. Its plain line now says: *"this is the actual wiring, on Amazon's cloud. Skip it if you are not the one building it."* That is honest, and it means **"completely layman" is true of five chapters out of six, not six.** Stated here rather than claimed away.

---

## Persona 2 · Licensed customs broker

*Tests whether the customs law is right. An error here discredits everything else.*

- **Licence boundary — correct and sourced.** CBP HQ H350722 (16 Jan 2026): deriving tariff subheadings past six digits, where the output directs or influences an entry, is customs business requiring a broker licence. To six digits it is not. Carried as market gap 1 and in the Chapter 1 evidence table.
- **Reasonable care — correctly framed.** The page says the standard judges *how you decided*, not only whether you were right. That is the distinction most vendor material misses.
- **Section 1592 — correct.** 2x lost duties for negligence, 4x for gross negligence.
- **Ten working days from release to file — correct.**
- **Liability — correct.** The importer of record stays answerable regardless of the software. Market gap 8 makes the point that liability never actually moves.
- **Scope honesty — correct.** ISF, liquidation, protest, prior disclosure and bond sufficiency are declared out of scope on the lifecycle tab of `gap-map.html` rather than quietly omitted.

**FIXED · P2-1.** `gap-map.html` described a continuous bond in one 27-word sentence with no explanation of what a bond is. Split, and it now says a bond is a standing financial guarantee.

**No finding requires a change to the customs claims. Pass.**

---

## Persona 3 · CFO / commercial buyer

*Tests whether the money argument survives contact with a budget.*

- **Kill criteria are measurable before spending.** SKU repeat rate must clear 50%; staffing must support roughly one licensed reviewer per 2,000 reviewed lines a month. Both measurable in week one, which is the single most useful thing on the page commercially.
- **Straight-through target is honest.** 60 to 75% by month 12, against the 95% vendor material implies. Stated as a contrast, not buried.
- **Cost driver is named correctly.** Reviewer minutes dominate at any realistic token price, so tier mix wins the case, not model choice.

**OPEN · P3-1 · The ROI figure's cost-target lamp reads "not met".** With the repeat-rate default at 62%, cost per line lands at 16.1% of manual against a target of "under 15% of manual". Both numbers are honest: 62% is a defensible default and 15% is a defensible target. They simply do not meet. The options are to retune the target, retune the default, or leave the lamp reading "not met" as a deliberate demonstration that the model does not always flatter itself. **Owner's decision, unchanged.**

**OPEN · P3-2 · No annual-savings figure.** A CFO wants one number in currency per year. The figure gives cost per line and reviewer headcount and stops. Previously deferred as item S1; still deferred.

---

## Persona 4 · ML engineer

*Tests whether the AI claims are right and whether the benchmarks are being read correctly.*

**FIXED · P4-1 · The model roster was eleven months stale and missing whole families.** ATLAS is a one-off September 2025 paper with six models, no Claude, no Grok, no Qwen. **HSCodeComp** (arXiv 2510.19631, 22 Oct 2025; published ACL 2026) closes it: 632 products across 32 categories, graded by a panel of 26 tariff experts, **23 systems** made up of 14 foundation models, 6 open agent frameworks and 3 closed agents. Now the third board in `evidence-docket.html`.

The roster reconciles exactly against two independent renderings, and four anchor rows were confirmed twice before being drawn: GPT-5 29.27%, Gemini-2.5-Pro 24.21%, GPT-4o 18.51%, Claude Sonnet 4 11.23%, best agent 46.83%, human experts 95.0%.

**The board earns its place beyond filling the roster.** The same GPT-5 scores 29.3% asked directly and 46.8% inside an agent harness on the identical test set. Orchestration is worth 17.5 points where changing the model is worth less. That is this page's architecture, measured independently by someone else. The 95.0% human line is the licensed-reviewer argument as a single number.

**FIXED · P4-2 · Reveal animations would have died silently as figures grew.** Ten figures still used `IntersectionObserver` at `{ threshold: 0.2 }`. A threshold is a fraction of the observed element, so once a figure is taller than the viewport, a fifth of it is never on screen and the callback never fires. Adding the definitions strip made every figure taller. Swept to `{ threshold: 0 }` with the reason recorded in the file. This failure produces no console error and no layout fault, so it is only catchable by asserting a post-reveal value.

- **Benchmark comparability is stated, not fudged.** Three benchmarks, three different sets: 200 contested rulings, 632 shop-shelf products, 103 randomly drawn rulings. The page says explicitly that they must not be read bar against bar, and each board carries its own scale.
- **Reasoning drift is reported and used.** HSCodeComp finds more reasoning steps can lower accuracy. That supports the design's bounded Tier 1 rather than contradicting it.
- **The ATLAS Gemini figure remains 31.0%**, the paper's table value, not the 30% its abstract's arithmetic implies. The inconsistency stays in the red-team ledger and off the page.

**OPEN · P4-3 · Confidence-gate cold start is unaddressed.** The gate needs calibration data to be calibrated, and on day one there is none. The page does not say how the gate is set before there is history. Previously raised; still open.

---

## Persona 5 · Solution architect

*Tests whether this could actually be built from what is drawn.*

- **Topology is complete enough to build from.** Quarantine subnet with no egress for the parser, decision subnet, endpoint subnet, credential proxy in front of the filing adapter, Object-Locked corpus in a separate account, append-only ledger. Fourteen build choices each carry the alternative rejected and what would flip it, with four marked load-bearing.
- **The two dashed red no-path routes are the most useful thing in the drawing** — they say what the design forbids by construction, not by policy.

**OPEN · P5-1 · No capacity or latency envelope.** Nothing states entries per hour, or the latency budget from document arrival to gate decision. An architect cannot size from this.

**OPEN · P5-2 · No disaster-recovery posture.** No RPO, no RTO, no statement of what happens to the ten-day statutory clock during an outage. That clock does not pause for an incident, which makes DR a compliance question here rather than an availability one.

**OPEN · P5-3 · SEC-GEN-05, `postMessage` accepted without an origin check.** `_theme-bootstrap.js` handles `m2m:theme` from any origin, across 17 files. Low severity as deployed: same-origin iframes, and the payload only sets a theme attribute. Still unfixed and still worth closing.

---

## Persona 6 · Sceptical journalist

*Tries to find the sentence that overclaims.*

All four banned statements verified absent by grep against the prose and all 22 figures:

1. **No absolute "can never reach the filing path" claim.** Zero matches.
2. **The staffing figure never drops its qualifiers.** All three occurrences read "one licensed reviewer per 2,000 **reviewed** lines a month".
3. **No past-tense silent-failure paraphrase** contradicting shadow mode.
4. **Every ~60% carries a qualifier** — "The best published model" in the prose, "Best-in-class autonomous classification" in `entry-anatomy.html`.

- **Vendor hygiene holds.** The Altana row is split: the acquisition is `Confirmed`, the deal value and customer count are a separate `Vendor claim` row, and the "5x more entries" claim is stamped and excluded from every calculation.
- **No vendor named in either gap figure.** `market-gaps.html` and `gap-map.html` both return zero matches against a vendor name list.
- **Illustrative versus sourced stays visible.** Figures that compute unmeasured numbers carry an `Illustrative` stamp.

**FIXED · P6-1 · A US spelling survived in a claim about forced labour.** `entry-anatomy.html` read "forced-labor action". Corrected.

**FIXED · P6-2 · "A license goes on the line"** in `confidence-gate.html` used the US noun. Corrected to "licence".

**OPEN · P6-3 · The market-gaps scorecard is the page's weakest evidence at close to its strongest visual weight.** It is correctly stamped `Proposed` and its lead says it is a synthesis of published product material rather than a benchmark run. But it is drawn at the same scale and polish as the three sourced benchmark boards, and a fast reader may not weight the stamp. **Judgment call, flagged not changed** — downgrading it visually would also bury the licence-boundary gap, which is the page's sharpest sourced finding.

---

## Conclusion

**Does the page communicate the problem, the challenges, and then the solution, to a layman?**

**Yes, for Chapters 1, 2, 3, 5 and 6.** A reader with no background can produce the restatement at the top of Persona 1 from the plain layer alone, and every word they might not know is now defined inside the same file they meet it in.

**No, for Chapter 4**, which is the build. That chapter names AWS services because an architect needs them named, and it now tells a non-expert reader to skip it. This is the one place where "completely layman" is not literally achieved, and the page says so rather than pretending otherwise.

**The strongest single improvement this cycle was not a wording change.** It was HSCodeComp: the page previously rested its central architectural claim — that orchestration beats raw model capability — on its own reasoning. It now rests it on an independent benchmark of 23 systems where the same model scores 29.3% alone and 46.8% in a harness, against 95.0% for people.

### Carried forward

| Item | Persona | Type |
|---|---|---|
| Alt text names terms bare | P1-4 | Judgment call |
| Chapter 4 not layman-readable | P1-5 | Stated exception |
| ROI cost-target lamp reads "not met" | P3-1 | Owner's decision |
| No annual-savings figure | P3-2 | Deferred (S1) |
| Confidence-gate cold start | P4-3 | Open design gap |
| No capacity or latency envelope | P5-1 | Open design gap |
| No DR posture against the statutory clock | P5-2 | Open design gap |
| `postMessage` origin check, 17 files | P5-3 | Open (SEC-GEN-05) |
| Scorecard weight versus its stamp | P6-3 | Judgment call |
