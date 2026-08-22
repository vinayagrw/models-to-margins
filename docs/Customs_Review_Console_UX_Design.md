# Customs Review Console — UX Design

**The human-layer companion to the classification engine: how the review desk is designed, why the queue is a supervision instrument before it is a productivity tool, and what changed under red-team.**
Version 1.0 · 2026-08-17 · Audience: HITL/UX leads, front-end engineers, licensed brokers, and the build team

**This document is Track 1 of a three-track UX design cycle** (customs review console, the reading experience of the customs-entry-agent deep-dive, site-wide UX) run against `Customs_Entry_Trade_Compliance_Agent_Technical_Design.md` (the "TDD"). It exists because TDD §6.4 gives the review queue four bullets and calls the console "Alex's largest single work item... needs real UI engineering, not a generated admin panel" (TDD §16) without designing it. This document is that design.

---

## 0. How to read this document

### 0.1 Persona legend

Reused from the TDD panel, plus two added for this cycle.

| Persona | Role | Refuses to compromise on |
|---|---|---|
| 🧭 **Maya** | AI / solution architect | Simplicity and composability; expensive compute goes only where ambiguity actually lives. |
| 📋 **Rafael** | Licensed Customs Broker (domain SME) | The hard domain cases are modelled correctly, not flattened. **His licence is on the line for every filing.** |
| 📊 **Sam** | MLOps / evals lead | Nothing ships without measurable quality. Silent-failure rate is tracked, not just accuracy. |
| 🔒 **Priya** | Security / identity lead | Untrusted input is contained; credentials never reach a model sandbox; least privilege throughout. |
| 🧑‍💻 **Alex** | HITL / UX lead | The review queue is a product surface, not a dumping ground. Reviewer time is the scarcest resource in the system. |
| ⚖️ **Nadia** | Trade compliance counsel | Every filing survives a reasonable-care audit under 19 USC 1592. Defensibility beats throughput. |
| 🔎 **(new) UX researcher** | Evidence lead for this document | No interaction pattern ships on vibes. Every mechanism traces to a cited study, a competitor's shipped product, or a named [OPEN] gap. |
| 🎨 **(new) Product designer** | Screen and interaction author | The desk earns its five surfaces. A screen that duplicates another screen's job is cut, not kept for symmetry. |

### 0.2 Evidence markers legend

- **Observed fact** — cited to a primary or reputable source, logged in Appendix A.
- **[PROPOSED]** — a design recommendation, not an observed fact, and not yet built.
- **[OPEN]** — genuinely unresolved. Named rather than papered over.
- **[VENDOR CLAIM]** — self-reported by a supplier, excluded from any accuracy or ROI reasoning, used only where the interaction pattern itself is the evidence (e.g. Stripe Radar's screen layout).

### 0.3 Reading paths

| You are | Read |
|---|---|
| HITL/UX lead scoping the build | §1–§6 in full |
| Front-end engineer implementing the desk | §7 Technical direction, then §5–§6 for the *why* behind each component |
| Licensed broker / compliance reviewer of the design | §2, §4, §6a–§6b, §9 |
| Trade compliance counsel | §2 (thesis), §7 (WSP link), §9 Critique C1 |
| Anyone deciding whether this is safe to ship | §9 Critique and §10 Gap table first |

---

## 1. Why this document exists

TDD §6.4, "The review queue as a product," is four bullets: rank by expected value, present the decision not the document, one-keystroke accept/override, never show a bare confidence number. It is the only console design in a 1,747-line document, and TDD §16 calls the console "Alex's largest single work item... needs real UI engineering, not a generated admin panel."

That gap is this cycle's mandate. Twelve research agents ran across four evidence domains — competitor HITL patterns (Stripe Radar, Sift, Labelbox), trust-calibration literature (cognitive forcing, vigilance decrement, low-prevalence detection), the actual regulatory text governing brokers (19 CFR 111/141/142/151/152, 19 USC 1484/1592), and the front-end mechanics of the chosen stack (ALB Cognito auth, React Aria, TanStack Query). A synthesis pass turned that research into a concluded design (`track1-direction.md`). A separate Team B of six hostile lenses — a UX researcher, a licensed-broker domain reviewer, a front-end/accessibility specialist, a skeptical CTO, an evidence-fidelity auditor, and a completeness critic — then red-teamed the design, with a default-REJECTED refuter deciding what survived. This document is the result: the concluded design, with every place Team B changed it marked, and every place Team B left it alone marked as a documented risk rather than silently accepted.

---

## 2. Research findings

Full citations in Appendix A. Four claims carry the design.

**Escalation beats approval, and the gap is the business case.** Escalation-style workflows — AI handles the majority autonomously, humans review only exceptions — delivered 71% median productivity gains versus 30% for approval-style workflows where humans review every output [IND, med confidence, A66]. TDD §6.4 already cites this. It is why the desk is built around triage, not a linear review of everything the agent touches.

**Explanations raise acceptance whether or not the answer is right, and only sometimes help.** AI explanations increase the probability a human accepts a recommendation regardless of correctness, and produced no complementary team performance across three datasets in one study [PEER, high, A17]. A second line of work resolves the contradiction: explanations reduce over-reliance only when they lower the cost of verification relative to the cost of accepting [PEER, high, A18]. This is the load-bearing finding behind §5's "falsification, not persuasion" rule.

**Confidence numbers are the calibration winner and the riskiest to restore.** Numeric confidence measurably helps calibrate trust, and local prediction-level explanations show no comparable effect [PEER, high, A19]. But the same study found calibrated trust alone did not improve joint decision accuracy, and every study behind this claim used lay crowdworkers on short, low-stakes tasks, never licensed experts under production time pressure. This is the tension §4 exists to resolve, and it is why §4's resolution is marked [PROPOSED] rather than shipped as settled.

**Vigilance and low-prevalence detection set the session and instrumentation shape.** The vigilance decrement appears within roughly the first 30 minutes of sustained monitoring, effect size around 0.71 [PEER, high, A24]. Detection collapses at low prevalence: hit rate fell from 0.58 at 50% target prevalence to 0.40 at 10% [PEER, high, A25]. Applied to a good agent whose errors become genuinely rare, this is the argument for seeded-error instrumentation even in the lane with the lowest error rate (§6b).

Regulatory findings (19 CFR 111.1, 111.28, 111.32, 141.61, 142.12, 151.11, 152.2, 141.113, 19 USC 1484) are cited throughout §3–§7 and tabulated in Appendix A; they are [IND] tier because they are read directly from govinfo.gov rather than through a secondary summary, but they are not peer-reviewed literature and are treated as authoritative text, not as a claim requiring corroboration.

---

## 3. Information architecture — five surfaces, not four

TDD §6.4 implies two surfaces: Queue and Decision. Two more are legally compelled and one is compelled by the clock.

| # | Surface | Why it exists |
|---|---|---|
| S1 | **Desk** (queue) | The ranked worklist. Presented as lanes, never one re-sorted list. |
| S2 | **Line decision** | The single card. The whole business case lives here. |
| S3 | **Entry certification** | 19 CFR 141.61's true-and-correct certification is a distinct legal act from per-line accepts. Nobody signs for lines they never saw. |
| S4 | **Exception lanes** | Validator-failed, Tier-2 research, CF-28/29 live responses, post-release watchlist, suspected misconduct. |
| S5 | **Supervision view** | Per-reviewer reject rate, audit-of-transactions cadence, timeliness, CBP responsiveness, seeded-error catch rate. Built to mirror the 19 CFR 111.28(a) factors. |

Audit/history is not a sixth screen. It is a panel on S2 (what evidence was actually opened) and the record behind S5, retained on the same five-year US-region floor as the rest of the audit ledger (19 CFR 111.23).

---

## 4. The queue design — expected value under two hard pre-emptions

### 4.1 Ranking

Score is P(error) × exposure, where exposure is duty plus bond and redelivery exposure, because a CF-28 escalates to redelivery under 19 CFR 141.113 and duty alone under-prices that risk.

Two rules sit above the score, not inside it:

- **Deadline pre-emption.** Any line whose statutory clock (10 working days for entry summary, 19 CFR 142.12; the 20-day CF-29 fuse, 19 CFR 152.2; the 30/180-day conditional-release windows, 19 CFR 141.113) has less slack than its expected service time jumps to the head, regardless of value. Slack is not another weight — folding it into the score lets a high-value line out-compete a genuine fuse.
- **Max-wait guarantee.** Every item carries an age and a promised ceiling by lane: routine 4 working hours, PGA/conditional 2 hours, deadline-fused items never queue at all because they pre-empt. On breach the item is promoted to head irrespective of EV, and breaches are counted on S5 as a supervision metric. This mirrors a clinical-worklist result directly: prioritising a radiology worklist by AI-assessed urgency cut mean turnaround for the urgent condition from 80.1 to 35.6 minutes while pushing normal exams from 80.2 to 113.9 minutes, and the study's own authors added a maximum-waiting-time threshold specifically to bound that worst-case delay [PEER, high, A13].

### 4.2 Presentation

Named batches, not a continuously re-sorted list: *Fused* · *High exposure* · *Novel* · *Routine* · *Rework*. Batch-level priority is the explainable form of EV ranking and is far easier to defend in an audit conversation than "the algorithm decided the order." Claiming is pull-based with visible ownership and an unassigned filter, never push-assignment — Stripe Radar's review queue works the same way: self-assignment, visible ownership, an unassigned filter, and an explicit prohibition on assigning work to someone else [VENDOR, high, A6].

Every row shows two separate lines: why this is here (the named routing rule) and what the model thinks. They answer different questions and collapsing them into one line hides which one a reviewer should trust.

### 4.3 Rejected work

Rejected work routes to an explicit **Rework** lane, never back into the main queue. A filed entry is not a closed item — this is the same discipline Labelbox's review-workflow product enforces with an automatic Rework routing step for rejected annotations [VENDOR, high, A10].

---

## 5. The decision screen

One pre-rendered card, no navigation, auto-advance on commit. Reading order top to bottom:

1. **Uncertainty header** — banded label plus the reason string ("6-digit stable, 10-digit split between .51 and .60 across samples") plus the number, subordinate (see §6).
2. **Exposure badge** — duty at risk, bond exposure, clock remaining.
3. **The proposal or the question** — assistance is conditional. Above the confidence threshold the card shows the proposed code. Below it, the card shows evidence and candidates but no proposed code: a low-confidence line arrives as an unanswered question, not a weak answer to nod through.
4. **Candidates, 2 to 3**, each with the single fact that would settle it against the proposal.
5. **Controlling GRI**, stated as a test the reviewer can apply, not as a justification.
6. **Cited ruling**, passage highlighted, deep-linked to the span rather than the document.
7. **Related entries** — a network keyed on importer, HS code and supplier, not a single "nearest prior" row. Stripe Radar's risk-insights panel takes the same shape: named human-legible factors with progressive disclosure, plus a related-payments graph of other cases sharing an email, IP or card [VENDOR, high, A4].

### 5.1 Resolving TDD §6.4 bullet 2 — falsification, not persuasion

TDD §6.4 bullet 2 asks for explanation richness, and explanation richness is the intervention with the best evidence for *raising* acceptance whether or not the machine is right (§2, A17). It is rescued by one condition: explanations reduce over-reliance only when they lower the cost of verification relative to accepting (§2, A18). So the rule becomes:

> **Every element of the card must be usable to disagree faster than to agree.** Ship test for each element: can a reviewer falsify the proposal by reading it, faster than by ignoring it? If an element only supports the proposal, it is cut.

Concretely: each candidate carries its discriminating fact, the GRI is phrased as a test, the ruling passage is the span that would *change* the answer, and the competing candidate is one keystroke at equal visual weight to accept. No element is a badge of authority.

---

## 6. Confidence display — [PROPOSED], pending a pilot

TDD §6.4 bullet 4 ("never show a bare confidence number") is challenged here, not settled. Numeric confidence is the only display in the evidence set with a measured positive calibration result, and suppressing the number while keeping declarative phrasing is the worst combination — it removes the calibration signal and keeps the over-confidence cue (§2, A19). Stripe Radar itself ships a 0–99 risk score with fixed bands (65 elevated, 75 high) and tells operators to combine it with business knowledge, deliberately perturbing the reported score on a subset of payments to keep measuring model performance [VENDOR, high, A5].

**But the evidence does not clear the bar this design needs.** All of it comes from lay crowdworkers on short, low-stakes tasks. Nothing in the evidence base tests confidence display with licensed experts making consequential decisions under production time pressure, which is exactly the deployment context here. "Best of the studied set" is not the same claim as "safe to restore on a live regulated filing pipeline." TDD §6.4 bullet 4 was itself plausibly written with that exact risk in mind, so restoring the number cannot be treated as concluded design on crowdworker evidence alone.

### 6.1 The rule, marked [PROPOSED]

> [PROPOSED] Show a **banded, calibration-tested** confidence signal (band name primary, number subordinate and always present on the card), pending a pilot. Confidence must **never** be the only signal, **never** appear without at least one verification shortcut and one disagreement affordance, and **never** by itself gate routing or auto-accept. Phrasing is hedged, never declarative.

### 6.2 Pilot gate

The number stays **hidden by default in production** until a calibration test run on licensed reviewers, not crowdworkers, under realistic time pressure, on real or seeded-error lines, passes a pre-registered accuracy/calibration threshold set before the pilot runs. A deliberate score-perturbation holdout on a sampled slice keeps reviewer-versus-model agreement measurable, the same mechanism Stripe Radar uses for its own score. If the bands do not survive calibration testing, the number comes off and the band stays.

### 6.3 Fallback

If the pilot fails, or is never run, ship the softer position as the default and the concluded design until the pilot clears: **banded name only, foremost, number withheld.** This is the same `UncertaintyExplainer` component with the number affordance turned off — no new mechanism has to be built to fall back to it. This does not supersede TDD §6.4 bullet 4 outright. It holds the reversal open pending the pilot, with the number-off position as the operative default until then.

---

## 7. Interaction model

Keyboard-first stream. **A** accept · **X** take the competing candidate · **O** override (structured reason picker) · **E** escalate to Tier-2 · **D** open source document · **J/K** peek queue neighbours — the two-density paging model Stripe Radar's own queue ships, list view plus J/K detail paging [VENDOR, high, A2]. Accept and take-candidate are adjacent and equally weighted.

**Shortcuts are focus-scoped to the decision card** — this is a documented design intent for this cycle, not a compliance claim. WCAG 2.1 SC 2.1.4 requires single-character shortcuts to be remappable, disableable, or active only on focus [PEER, high, A41]. Only the third of those three is actually specified here, and even that collapses toward "always active" once every card auto-advances and the reviewer is continuously re-focused into the next card. The accurate framing: single-key shortcuts are the intended interaction model, focus-scoping is the intended mitigation, and the remap/disable settings surface (`ShortcutLegend`/settings) is **explicitly in Wave 1 scope, not deferred** — it must ship alongside the keystroke model. Until it ships, this document makes no WCAG 2.1.4 compliance claim, only a stated intent.

Override capture is **two-step**: the keystroke commits provisionally and advances, a non-blocking reason prompt completes the label. Reason codes come from a closed list (wrong heading / wrong subheading / GRI misapplied / evidence insufficient / origin-valuation) with an optional free-text field. The taxonomy is an ML contract co-owned with evals, not UI copy.

Dispositions are typed and consequence-bearing, with the downstream effect written on the button: *Accept* (no label), *Take candidate* (training label), *Override* (training label plus reason), *Escalate*, *Refuse and report* — the last being the 19 CFR 111.32 path for suspected client misconduct, neither accept nor override. Stripe's own disposition set is the same shape: deliberately asymmetric and consequence-bearing, where only the "refund and report fraud" action writes to a block list and feeds the model [VENDOR, high, A3].

**No bulk accept.** 19 USC 1484 attaches the duty to a named person, per line. Anything that accepts lines the reviewer did not see is the certification screen's job, and that screen shows the diff.

---

## 6a. Breaking the exposure-threshold circularity — closing BROKER-3

The forced-choice gate as first written is self-referential: exposure is computed in part from the model's own classification of the line under review, so a wrong low-confidence proposal that *understates* its own uncertainty can compute itself a low exposure score and route straight into the frictionless lane — exactly the lines most likely to be wrong escape the mechanism built to catch them.

The routing decision therefore draws on a signal the model cannot set by being wrong about itself:

- **Primary independent signal — classification volatility.** For each line, look up the last N (N=20, tune in Wave 2) prior entries sharing the same importer + HS heading family. If the accepted code varied across that set, or this importer's history shows a prior override on this heading, the line is volatile regardless of its own stated confidence, and it is routed to forced choice. Volatility is a property of the historical population, not of the model's self-report on this line, so a falsely-confident proposal cannot suppress it.
- **Fixed sampling floor.** Independent of both exposure and volatility, a minimum **5% of routine-lane volume**, chosen by a server-side random draw the model has no visibility into, is force-routed to the forced-choice/blind-trial treatment regardless of computed exposure. This is a floor, not a ceiling: it exists precisely to catch the case where every upstream signal — exposure, volatility, confidence — agrees with itself and is wrong together.
- Exposure (duty plus bond plus redelivery) stays in the ranking score as before. It is now one of three inputs to the forcing decision, never the sole gate, and the other two do not derive from the line's own model output.

N=20 and the 5% figure remain [OPEN] — no fetched source sizes them for a customs desk — but the *shape* of the fix (an independent, non-self-reported input plus an unconditional floor) is not optional, because the circularity fails by construction, not by mistuning.

---

## 6b. Routine-lane instrumentation — closing HF-3

The routine lane is EV-ranked as the low-P(error) population by construction, which is structurally where a good agent's rare true errors concentrate, and the low-prevalence literature (§2, A25) shows detection collapsing to a 0.40 hit rate once true prevalence falls to 10%. A lane with zero instrumentation cannot know whether that collapse is happening to it.

The fix is a **second, lower-rate seeded-error probe, distinct from §6a's forced-choice mechanism, run inside the routine lane itself:**

- **Rate: 1 in 500 routine-lane decisions (0.2%)**, not the higher rate the forced-choice-tail evidence used. The routine-lane probe answers one narrower question — is catch rate on this lane still above a floor, or has it silently collapsed — not to recreate forced-choice-grade calibration on every line.
- Presentation is unchanged from a normal routine card: no unranked candidates, no withheld suggestion, no visible flag. The only difference from a real line is that the proposed code is a known-wrong seed, hard-blocked from actually filing by the same client-and-server flag used in §6a, and the reviewer's accept/override is logged as a catch-rate sample on S5.
- **Cost stated honestly.** At 1-in-500, the probe adds no measurable drag to the median: it looks and reads exactly like a routine line, so it adds no card elements, forcing, or extra reading time to the 499 real lines around it. The cost is not latency, it is statistical power — at 0.2% injection rate the routine-lane catch-rate estimate is noisy over any single day and only becomes trustworthy aggregated over roughly a week of desk volume (rough order-of-magnitude, not a validated figure).
- This is distinct from §6a's fixed 5% sampling floor: §6a's floor decides *routing to forced choice within the exposure-ranked lanes*; this probe decides *whether the routine lane itself is silently failing*. They can share the same seeded-error content library and the same hard-block infrastructure, but they answer different questions and are tracked as separate S5 metrics.

---

## 8. Where cognitive forcing applies

Cognitive forcing functions significantly reduce over-reliance compared with plain explainable-AI displays, but participants rate the most effective designs least favourably, and the benefit concentrates in people high in Need for Cognition [PEER, high, A12/A15/A16]. A single global forcing step therefore disadvantages exactly the least-engaged reviewers it targets. Forcing is **conditional and stake-proportional**, in three places only:

- **Forced choice** above an exposure threshold: candidates render unranked, the reviewer picks. Threshold is [OPEN], tuned in Wave 2 — see §6a for the routing-integrity fix that keeps the threshold from being self-referential.
- **Blind-trial mode** on a random sampled slice: suggestion withheld, same evidence card. Reviewers know the practice exists.
- **Seeded errors** at a controlled prevalence, hard-blocked from filing by a client and server flag.

Seeding is not optional instrumentation. If the agent is good, real errors become rare, and at 10% prevalence hit rate collapses to 0.40 from 0.58 at 50% (§2, A25). Reviewers also cannot reliably self-calibrate from experience alone, so calibration must be supplied externally.

The routine lane gets **no cognitive forcing, no blind trials, and no exposure-threshold seeded errors**. That is the deal for those three mechanisms: the median stays fast, the tail gets genuine cognition. It does **not** mean the routine lane is uninstrumented — see §6b.

### 8.1 Exception handling

Five lanes, each with its own clock and its own disposition set:

| Lane | Clock | Disposition |
|---|---|---|
| Validator-failed | entry-summary slack | fix and re-run |
| Tier-2 research (novel) | none, excluded from N4 | research then decide |
| CF-28 / CF-29 live | 20-day fuse, visible countdown | respond, in the same ranked queue, not a mailbox |
| Post-release watchlist | 30 / 180-day conditional release | monitor, redelivery exposure shown |
| Suspected misconduct | none | refuse and report under 19 CFR 111.32 |

### 8.2 Session shape

Vigilance decays inside 30 minutes on high-event-rate discrimination tasks (§2, A24). So: capped continuous sessions with a break cue, highest-exposure lines front-loaded into the first half hour, and a small proportion of clean high-confidence lines interleaved to hold the base rate visible — [PROPOSED], low confidence, since no fetched source measures this specific interleaving effect in a customs context.

---

## 9. Technical direction (maps to TDD §16)

- **Stack.** Custom React SPA on headless accessible primitives of the React Aria class, Vite-built static assets plus a thin Node BFF, one container on ECS Fargate behind the ALB. React Aria's documented "focus moves when a list item is deleted" behaviour is the console's core loop [VENDOR, high, A42].
- **Auth.** ALB `authenticate-cognito` does the whole OIDC dance at the listener. It sets a sharded session cookie and forwards identity to the target as an `x-amzn-oidc-data` JWT signed with ES256 [VENDOR, high, A39]. The SPA holds zero tokens. The BFF verifies the signature and stamps the validated `sub` onto every decision event, which is the attributable-person requirement of 19 USC 1484 satisfied by the transport layer.
- **Three ALB sharp edges the desk must handle.** A 401 on an AJAX call means session expired — the docs specifically flag "single-page applications with JavaScript that loads every few seconds" as the affected case [VENDOR, high, A40] — so the fetch layer saves unsaved override text to sessionStorage *then* full-page redirects. Cognito group claims stay lean to avoid the 11K `ELBAuthUserClaimsSizeExceeded` 500. An explicit `/logout` landing route sits outside the auth rule.
- **Latency model.** Server owns queue order (EV ranking plus pre-emption is backend logic and must be auditable). Client prefetches the next 2–3 full decision payloads while the reviewer works the current one — TanStack Query's `prefetchQuery` pattern exists explicitly to flatten this kind of request waterfall [VENDOR, high, A43] — submits through an optimistic mutation with a retry outbox, advances instantly, refreshes the queue by polling. No WebSocket at Wave 2 scale.
- **Idempotency contract — closing CTO-4.** Every disposition the client submits (§7) carries a client-generated `decision_idempotency_key`, a UUIDv4 minted once when the reviewer opens the card and held for the card's lifetime, not regenerated on retry. The retry outbox and the §7 401 sessionStorage-recovery path both replay the *same* stored key, never a fresh one. The BFF's decision-event write is `INSERT ... ON CONFLICT (decision_idempotency_key) DO NOTHING RETURNING`: a duplicate submission — outbox retry after a flaky connection, or resubmission after the 401-redirect-and-relogin round trip — is a no-op against the ledger and the second write returns the first write's result rather than creating a second training label or a second certified disposition. This closes the gap the retry-outbox and sessionStorage-recovery paths left open independently: neither alone prevented duplicate submission, only the shared key across both paths does.
- **Components.** QueueList (virtualised) · DecisionCard + BlindVariant · EvidencePanel with span-level deep links · UncertaintyExplainer · OverrideCapture · CertificationDiff · ExceptionLane · SupervisionPanel · ShortcutLegend/settings.
- **Audit.** One immutable decision-event envelope per decision, emitted by the BFF, never trusting client timestamps alone: reviewer sub, disposition, reason code, latency, which evidence was actually opened, input modality, model and rulebook versions. Ledger and evidence blobs in US regions, 5-year floor (19 CFR 111.23).
- **Procedure link — closing BROKER-1.** 19 CFR 111.28 is a documented-procedure-and-evidence-of-correction test, not a dashboard test [IND, high, A29], and S5's live telemetry does not by itself satisfy it. The gap closes with a named artefact, not more chart panels: a **Written Supervision Procedure** document (WSP), version-controlled outside the console, that states in prose what each S5 metric means, what threshold breach requires the supervising broker to do, and what correction was actually taken. Each S5 metric row links to the WSP section it operationalises (reject rate to WSP §3, timeliness to WSP §4, seeded-error catch rate to WSP §5, and so on). When a threshold breach fires, S5 does not just log the number — it opens a **dated correction record** (who reviewed the breach, what action was taken, when), stored alongside the decision-event ledger with the same 5-year US-region retention floor. That correction record, not the live chart, is what a 111.28 audit actually asks to see: the telemetry is the trigger, the WSP is the standard, and the correction record is the evidence the standard was applied.

---

## 10. How the sub-60s N4 target survives, honestly

It survives narrowed and re-scoped.

1. **N4 applies to the routine lane only.** Tier-2 research items blow the budget by design, forced-choice lines are meant to cost more, blind trials cost more. All are excluded from the median. Reporting one median across all lanes lets the metric be gamed by lane-shuffling.
2. **It is a per-line budget, not a cadence.** A sustained 60s rhythm is the high-event-rate task the vigilance literature says fails within half an hour. Session caps are what keep the budget honest.
3. **The seconds are bought from machine time and navigation, not from thinking.** Prefetched payloads, no spinner on queue-to-detail, interaction-to-paint under 100ms, two-step override so labelling never blocks the flow.
4. **It is never reported alone.** Falling review time plus falling override rate is the rubber-stamp signature. The published pair is median decision time with seeded-error catch rate, plus the flip rate (cases where the reviewer's first instinct differed from the final call) — AI advice flipped initially-correct human assessments at 7% in one computational-pathology study, and time pressure worsened the *severity* of those flips rather than their frequency [PEER, high, A11]. Note this figure was measured on a visual pattern-recognition task, not a text/rules classification task, and needs a domain qualifier the next time it is quoted in published copy (see Critique C8).
5. **Honest caveat.** No fetched source measures decision latency in a comparable console, and no external baseline exists for what a broker spends per exception today. Sub-60s remains the TDD's own framing, now bounded, not a validated number.

---

## 11. Measures

- **N2 analogue — silent-failure rate on auto-accepted lines**, sampled and audited blind.
- **Seeded-error catch rate**, tracked separately for the §6a forced-choice/blind-trial mechanism and the §6b routine-lane 0.2% probe. Same content library and hard-block infrastructure, different S5 rows, different questions answered.
- **Median decision time**, routine lane only, reported paired with catch rate and flip rate, never alone (§10).
- **Max-wait breaches**, by lane, logged to S5 as a supervision metric.
- **WSP-linked correction records**, one per S5 threshold breach, dated, with reviewer identity and action taken.

---

## 12. Critique (Team B, resolved)

All 17 CONFIRMED Team B findings whose target is this design. Grouped in section order. Five (BROKER-1, BROKER-3, CTO-4, HF-2, HF-3) already produced a text fix earlier in this document and are referenced here rather than restated; the rest are accepted, named risks. Fixing all seventeen in one pass would rewrite the console design mid-cycle on evidence Team B itself rates high or medium, not blocker, once the three actual blockers (HF-2, HF-3, BROKER-3) were closed.

**C1.** §3's S5 claims to mirror 19 CFR 111.28(a) one-to-one, but a metrics panel is not the documented-procedure evidence 111.28 audits. S3 tests supervision by dashboard, not by written QC procedure. *Resolution:* fixed. §9 now names a version-controlled Written Supervision Procedure document, links each S5 metric to a WSP section, and requires a dated correction record on threshold breach — the telemetry is the trigger, the WSP is the standard, the correction record is the audit evidence (closes BROKER-1).

**C2.** §8.1 fuses CF-28 and CF-29 into one lane with one 20-day clock, but they are separate instruments that can run concurrently on one entry with different deadlines and different downstream exposure. *Resolution:* accepted as a documented risk, not fixed this cycle. §8.1 is [PROPOSED] scaffolding; splitting the lane into two clock instances is the next-cycle fix, added to the Wave 2 tuning list alongside the other [OPEN] thresholds in §6a.

**C3.** §4 and §8 make the forced-choice threshold self-referential: exposure derives partly from the model's own proposed classification, so a wrong low-confidence proposal can understate its own exposure and route itself to the frictionless lane. *Resolution:* fixed. §6a adds two inputs the model cannot set by misjudging itself — classification volatility across the last N same-importer/same-heading entries, and a fixed 5% server-side random sampling floor invisible to the model. Exposure stays in the ranking score but is no longer the sole gate. N=20 and the 5% figure remain [OPEN], the *shape* of the fix is not (closes BROKER-3).

**C4.** §3 (S3) and §7 assert the certification diff screen prevents signing for unseen lines, but no forcing, sampling, or role separation is specified for S3 itself — the same rubber-stamp risk §8 built machinery against for S2 is left unguarded on S3. *Resolution:* accepted as a documented risk. S3's forcing model is out of this cycle's scope; noted as a gap for Wave 2 design work, not retrofitted here because it would add new interaction surface to a screen this cycle treats as frozen scaffolding.

**C5.** §8.1 gives the post-release watchlist one table row inside exception lanes, with no dedicated aging-based worklist despite it being a legally significant, structurally distinct triage discipline from active-work lanes. *Resolution:* accepted as a documented risk. Splitting S4 into an aging-based S4a is real work with its own worklist logic; named here as a concrete Wave 2 item rather than folded into this cycle's edits.

**C6.** §9 names an optimistic-mutation retry outbox and a separate sessionStorage 401-recovery path for the same failure class (lost in-flight decision) with no reconciliation rule, so a retried submission and a re-authenticated resubmission could double-write. *Resolution:* fixed. §9 now specifies a client-generated `decision_idempotency_key`, minted once per card and reused, never regenerated, by both recovery paths, with the BFF write as `INSERT ... ON CONFLICT (decision_idempotency_key) DO NOTHING RETURNING` (closes CTO-4).

**C7.** §6 cites the confidence-calibration finding for numeric confidence's benefit but drops the same source's other half — calibrated trust alone did not improve joint decision accuracy — when using it to overturn a safety-motivated TDD rule. *Resolution:* accepted as a documented risk, softened by the HF-2 fix below. Since §6's reversal is now [PROPOSED] and pilot-gated rather than concluded design, the missing accuracy-null caveat matters less than it did when the rule read as settled; worth adding to §6's prose in the next editorial pass but not required to keep the design honest, because the pilot gate already carries the burden of proof.

**C8.** §10 imports the 7% automation-bias flip rate from a computational-pathology (visual pattern-recognition) study into an HS tariff classification (text/rules) task with no domain-transfer caveat, alongside the already-flagged crowdworker caveat. *Resolution:* accepted as a documented risk, now flagged inline in §10 point 4. The flip-rate metric's own logic (instinct-vs-final-call divergence) does not depend on the imported 7% figure to be useful; re-deriving the metric is not required.

**C9.** §8.2 paraphrases the vigilance-decrement effect size (~0.71) as if it were measured under high-event-rate successive-discrimination conditions, when the source names those as moderators that *worsen* the general baseline figure, not the condition it was measured under. *Resolution:* accepted as a documented risk. The practical conclusion (cap sessions at 30 minutes) is unchanged and lands on the conservative side either way, so this is a citation-precision issue, not a design defect; flagged for the next prose pass.

**C10.** §5.1's falsification ship test ("can a reviewer disagree faster than agree?") has no instrumentation anywhere in §7, §8, or S5 to actually measure it — a designer can claim the test is met by wording alone. *Resolution:* accepted as a documented risk. S5 already carries the audit-envelope hooks (which evidence was opened) that a future per-element falsification-latency metric would build on; adding that metric is Wave 2 work, not a text fix here.

**C11.** §6 presented the confidence-number reversal as concluded design while its own risk register admits the calibration evidence never covers licensed experts under production pressure, exactly the deployment context. *Resolution:* fixed. §6 is written as [PROPOSED], gated on a pre-registered pilot with licensed reviewers, number hidden by default in production until the pilot clears, softer position (banded name only, number withheld) named as the explicit fallback (closes HF-2).

**C12.** §8's "no forcing" exemption for the routine lane is circular: routine is the low-P(error) population by construction, structurally where a good agent's rare true errors concentrate, and the cited source shows detection collapsing to 0.40 at 10% prevalence — yet the routine lane had zero seeded-error instrumentation. *Resolution:* fixed. §6b adds a 0.2% (1-in-500) seeded-error probe inside the routine lane, presented as an indistinguishable normal card, hard-blocked from filing, logged to S5 as a catch-rate metric distinct from the forced-choice mechanism (closes HF-3).

**C13.** §10's own attack surface (lane-shuffling) has no named owner, versioning, or change-log for the thresholds that define lane membership, so "honest metric" is contingent on an unstated governance control. *Resolution:* accepted as a documented risk. Versioning the confidence-band cutoffs that gate routine-lane membership is a concrete, cheap addition for the next pass of this section; not applied here because it is a governance-process addition, and the underlying thresholds are already [OPEN] pending Wave 2 tuning.

**C14.** §5 withholds the proposed code below a confidence threshold to avoid "a weak answer to nod through," but this swaps a graded, calibrated signal (the number §6 restores) for an uncalibrated binary one ("no code shown" = "model is unsure"), for exactly the decisions where calibration matters most. *Resolution:* accepted as a documented risk. Because §6's number is now pilot-gated and hidden by default (C11), the tension is smaller than originally argued — in the fallback state neither the number nor the withheld-code cue is present, so the two mechanisms are not simultaneously fighting each other. Worth revisiting once the §6 pilot clears and the number is live.

**C15.** §7's WCAG 2.1.4 compliance claim is asserted for shortcuts whose required remap/disable settings surface ships nowhere in this cycle's implementation scope. *Resolution:* accepted as a documented risk, already partly addressed in the existing §7 text, which states plainly that no WCAG 2.1.4 compliance claim is made, only a stated intent, until `ShortcutLegend`/settings ships. No further text change required.

**C16.** §7's "focus-scoped to the decision card" claim collapses toward "always active" once the card auto-advances and holds focus for the whole session, with no described accessibility contract for inertness while the OverrideCapture free-text field has focus. *Resolution:* accepted as a documented risk. This is a component-level accessibility contract (OverrideCapture must provably disable single-key shortcuts the instant a text field inside the card has focus) that belongs in implementation, not in this design document; noted here so it is not lost before Wave 1 build.

**C17.** §6 specifies "band name primary, number subordinate" with no stated accessible-name requirement, so a colour-only band would recreate for assistive-technology users the exact "worst combination" failure §6 argues against for sighted users. *Resolution:* accepted as a documented risk. The fix (UncertaintyExplainer must expose the band name as programmatic text, not colour/icon alone) is a one-line component spec requirement for whoever builds S2; flagged here rather than added to design prose, which stays at the design-position level rather than a component API level.

---

## 13. Gap table

| Gap | Finding | Resolved? |
|---|---|---|
| S5 mirrors 111.28 without documented-procedure evidence | C1 / BROKER-1 | ✅ Resolved — WSP + dated correction records (§9) |
| Forced-choice threshold self-referential on the model's own output | C3 / BROKER-3 | ✅ Resolved — volatility signal + fixed 5% floor (§6a) |
| Routine lane has zero seeded-error instrumentation | C12 / HF-3 | ✅ Resolved — 0.2% probe (§6b) |
| Confidence-number reversal shipped as concluded design on crowdworker-only evidence | C11 / HF-2 | ✅ Resolved — marked [PROPOSED], pilot-gated, hidden by default (§6) |
| Retry outbox and 401 recovery path can double-write a decision | C6 / CTO-4 | ✅ Resolved — shared idempotency key (§9) |
| CF-28 and CF-29 fused into one lane with one clock | C2 | 🟠 Partial — accepted risk, Wave 2 fix named |
| Certification screen (S3) has no forcing/sampling of its own | C4 | 🟠 Partial — accepted risk, out of this cycle's scope |
| Post-release watchlist has no dedicated aging worklist | C5 | 🟠 Partial — accepted risk, Wave 2 item named |
| Flip-rate figure imported cross-domain without a qualifier | C8 | 🟠 Partial — flagged inline, not re-derived |
| Falsification ship test has no instrumentation | C10 | 🟠 Partial — audit-envelope hooks exist, metric is Wave 2 |
| Lane-membership thresholds have no versioning/change-log | C13 | 🟠 Partial — accepted risk, cheap Wave 2 addition named |
| WCAG 2.1.4 asserted without the required settings surface shipping | C15 | 🟠 Partial — no compliance claim made, only stated intent |
| OverrideCapture focus-inertness contract undescribed | C16 | 🟠 Partial — flagged for implementation, not this document |
| Band-name accessible-name requirement unstated | C17 | 🟠 Partial — flagged as component-spec requirement |
| All calibration evidence is lay crowdworkers, transfer to licensed experts unproven | Risk 1 (this doc's own register) | 🟠 Partial — resolved specifically for §6 via the pilot gate; the underlying evidence gap itself is not closable by this cycle |
| Two high-relevance sources missing by access, not neglect (Vaccaro/Almaatouq/Malone 2024, Jacobs 2021) | Risk 3 | ❌ Open |
| cbp.gov 403'd every fetch attempt | Risk 4 | ❌ Open |

---

## 14. Risks (carried forward)

1. **All calibration evidence is lay crowdworkers on short tasks.** No study tests confidence display with licensed experts under production time pressure. Transfer to a broker desk is an assumption this document names and does not resolve outside the §6 pilot gate.
2. **The exposure threshold for forced choice is invented.** [OPEN], no basis in the TDD. Must be labelled as such wherever it appears.
3. **Two high-relevance sources are missing by access, not neglect** — a 2024 paper on human-AI combination underperformance and a 2021 paper both went unfetched. The first in particular would bear directly on the whole design.
4. **cbp.gov 403'd every fetch**, so nothing here may claim a 7501 block number, an ACE screen, or a PGA hold taxonomy.
5. **Seeded errors are a governance hazard.** Injecting known-wrong suggestions into a regulated filing pipeline needs a hard, tested, two-sided block. Whether reviewers see their own catch rate is unresolved.
6. **The supervision view can become surveillance.** 111.28 telemetry aimed at CBP is also per-reviewer performance data, and mis-framing it will cost reviewer trust in the desk itself.
7. **The whole document is a design position, not a shipped product.** No code in this repo constrains it, so everything extending TDD §6.4 stays marked [PROPOSED].

---

## Appendix A — Source ledger

| # | Claim | Source (date) | Tier | Confidence | Red-team status |
|---|---|---|---|---|---|
| A2 | Stripe Radar ships two review modes on the same queue: a triage-density list view and a detail view with J/K keyboard paging between cases. | docs.stripe.com/radar/reviews (2026-08) | [VENDOR] | high | pending |
| A3 | Radar's disposition set is deliberately asymmetric and consequence-bearing: Approve, Refund, Refund-and-report, where only the last writes to block lists. | docs.stripe.com/radar/reviews (2026-08) | [VENDOR] | high | pending |
| A4 | Radar's risk-insights panel shows named human-legible factors with progressive disclosure, plus a related-payments graph. | docs.stripe.com/radar/reviews/risk-insights (2026-08) | [VENDOR] | high | pending |
| A5 | Radar publishes a 0-99 risk score with fixed bands, tells operators to combine it with business knowledge, and perturbs the score on a subset of payments. | docs.stripe.com/radar/risk-evaluation (2026-08) | [VENDOR] | high | pending |
| A6 | Radar supports self-assignment with visible ownership and an unassigned filter, forbids assigning to others. | docs.stripe.com/radar/reviews (2026-08) | [VENDOR] | high | pending |
| A10 | Labelbox models review as a configurable multi-step workflow with automatic Rework routing for rejected items, priority set at Batch level. | labelbox.com/guides/a-new-way-to-queue-review/ (2026-08) | [VENDOR] | high | pending |
| A11 | AI assistance raised overall performance but produced a 7% automation-bias flip rate in a computational-pathology study; time pressure worsened severity, not frequency. | arxiv.org/abs/2411.00998 (2024-11) | [PEER] | high | pending |
| A12 | Cognitive forcing functions significantly reduced overreliance versus plain XAI displays; the most effective designs were rated least favourably; benefit concentrated in high-NFC users. | eecs.harvard.edu/~kgajos/papers/2021/bucinca2021trust.shtml (2021-04) | [PEER] | high | pending |
| A13 | An AI-prioritised radiology worklist cut urgent turnaround from 80.1 to 35.6 minutes while pushing normal exams from 80.2 to 113.9 minutes; authors added a max-waiting-time threshold to bound the worst case. | pmc.ncbi.nlm.nih.gov/articles/PMC8128725/ (2021-05) | [PEER] | high | pending |
| A15/A16 | Cognitive forcing reduces over-reliance more than explanations alone but is rated less satisfying and less trusted; the effect is NFC-moderated. | eecs.harvard.edu/~kgajos/papers/2021/bucinca2021trust.shtml (2021-04) | [PEER] | high | pending |
| A17 | AI explanations increase acceptance regardless of correctness; no complementary team performance across three datasets. | arxiv.org/abs/2006.14779 (2021-05) | [PEER] | high | pending |
| A18 | Explanations reduce over-reliance only when they lower verification cost relative to accepting; N=731 across five studies. | arxiv.org/abs/2212.06823 (2023-04) | [PEER] | high | pending |
| A19 | Confidence scores measurably helped calibrate trust but did not by themselves improve joint decision accuracy; local explanations showed no calibration effect. | arxiv.org/abs/2001.02114 (2020-01) | [PEER] | high | pending |
| A24 | Vigilance decrement appears within roughly 30 minutes of sustained monitoring, effect size ~0.71, worsened by high event rate and successive discrimination. | frontiersin.org/journals/cognition/articles/10.3389/fcogn.2025.1632885/full (2025) | [PEER] | high | pending |
| A25 | Low-prevalence effect: hit rate fell from 0.58 at 50% prevalence to 0.40 at 10%. | pmc.ncbi.nlm.nih.gov/articles/PMC5281659/ (2017-01) | [PEER] | high | pending |
| A26 | 19 USC 1484(a)(1) reasonable-care duty attaches to a named importer of record, a duty of a person, not a filing system. | law.cornell.edu/uscode/text/19/1484 (2026-08-17) | [IND] | high | pending |
| A29 | 19 CFR 111.28(a) lists roughly thirteen factors CBP weighs on responsible supervision, including rejection rate, audit-of-transactions cadence, and CBP responsiveness. | govinfo.gov CFR-2024-title19-vol1-sec111-28 (2026-08-17) | [IND] | high | pending |
| A30 | 19 CFR 111.32 forbids filing any document known to be false, requires reporting deliberate client misconduct to CBP. | govinfo.gov CFR-2024-title19-vol1-sec111-32 (2026-08-17) | [IND] | high | pending |
| A31 | 19 CFR 141.61 requires electronic entry data to be certified true and correct by the importer or an authorised broker. | govinfo.gov CFR-2024-title19-vol2-sec141-61 (2026-08-17) | [IND] | high | pending |
| A33 | 19 CFR 152.2 sets the CF-29 notice mechanism; liquidation normally not withheld more than 20 days from the notice mail date. | govinfo.gov CFR-2024-title19-vol2-sec152-2 (2026-08-17) | [IND] | high | pending |
| A34 | 19 CFR 151.11 lets CBP demand redelivery under bond (141.113) after CF-28 non-compliance. | govinfo.gov CFR-2024-title19-vol2-sec151-11 (2026-08-17) | [IND] | high | pending |
| A35 | 19 CFR 141.113 sets conditional-release windows of 30 and 180 days with liquidated-damages exposure. | govinfo.gov CFR-2024-title19-vol2-sec141-113 (2026-08-17) | [IND] | high | pending |
| A36 | 19 CFR 142.12 sets the entry summary deadline at 10 working days after entry. | govinfo.gov CFR-2024-title19-vol2-sec142-12 (2026-08-17) | [IND] | high | pending |
| A38 | 19 CFR 111.23 requires records retained 5 years in the customs territory of the US. | govinfo.gov CFR-2024-title19-vol1-sec111-23 (2026-08-17) | [IND] | high | pending |
| A39 | ALB authenticate-cognito sets a session cookie and forwards identity as an ES256-signed x-amzn-oidc-data JWT. | docs.aws.amazon.com elasticloadbalancing listener-authenticate-users (2026-08-17) | [VENDOR] | high | pending |
| A40 | ALB auth's three SPA sharp edges: 401 on AJAX for expired sessions, 11K claims-size 500 error, manual logout redirect. | docs.aws.amazon.com elasticloadbalancing listener-authenticate-users (2026-08-17) | [VENDOR] | high | pending |
| A41 | WCAG 2.1 SC 2.1.4 requires single-character shortcuts to be remappable, disableable, or focus-scoped; called "disastrous for speech users" otherwise. | w3.org/WAI/WCAG21/Understanding/character-key-shortcuts.html (2026-08-17) | [PEER] | high | pending |
| A42 | React Aria implements ARIA APG semantics including focus moved when list items are deleted, tested against screen readers. | react-aria.adobe.com (2026-08-17) | [VENDOR] | high | pending |
| A43 | TanStack Query supports prefetchQuery/usePrefetchQuery explicitly to flatten request waterfalls. | tanstack.com/query/latest/docs/framework/react/guides/prefetching (2026-08-17) | [VENDOR] | high | pending |
| A66 | Escalation-style workflows delivered 71% median productivity gains versus 30% for approval models. | unstract.com/blog/ai-document-processing-with-unstract/ (2026) | [IND] | med | pending |

Tally for this document's citation set: 28 rows, [VENDOR] 12, [PEER] 10, [IND] 6. Full 66-row cross-track ledger, including rows cited only by Tracks 2 and 3, lives in the design cycle's working `evidence-ledger.md`.
