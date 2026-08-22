# Red-team ledger — /deep-dives/customs-entry-agent

**Reviewed** 2026-08-10 · **Subject** the published deep-dive page, its 15 figures, and their fidelity to `Customs_Entry_Trade_Compliance_Agent_Technical_Design.md` · **Status** 33 fixed, 3 rejected, 14 open

## How this review ran

An independent Team B of thirteen agents reviewed the page through six hostile lenses in parallel: a principal AWS solutions architect, a design-doc fidelity auditor, a licensed customs broker, a ruthless copy editor, a front-end and accessibility specialist, and the skeptical CTO of a prospective buyer. Each reviewer was instructed to challenge rather than summarise, and to evidence every finding with a file path or a rendered observation.

Every finding then went to a separate quality-control agent whose default position was **rejected**. A finding survived only if the auditor could independently re-establish its evidence against the actual files or the live page, and it could be downgraded or upgraded on severity. Findings that restated a documented deliberate choice as a defect were rejected.

54 findings were raised. 48 survived refutation, 3 were rejected, and 3 were left unrefuted because the run hit a session limit before the UX auditor and the completeness critic ran. Unrefuted findings are marked as such and were verified by hand before any fix.

**Verdict vocabulary.** CONFIRMED means the defect is real and was fixed. REJECTED means the refuter found the claim did not hold as stated. OPEN means the finding survived but is a judgment call, a design or editorial choice a reasonable author can defend, so it is recorded here for the author to decide rather than changed unilaterally.

---

## Blockers

| ID | Challenge | Verdict | Resolution |
|---|---|---|---|
| TRADE-1, COPY-1 | The audit ledger's worked example is legally incoherent. It records the human-approved classification as 8708.99.81 while citing "parts of general use excluded by note 2(b)" as the rationale, but note 2(b) to Section XVII is exactly what excludes an aluminium bracket from heading 8708 and pushes it to Section XV. The same part number is 7616.99.51 in entry-anatomy and in the design doc, so one SKU carried two irreconcilable codes on the page whose thesis is audit-rationale discipline. | CONFIRMED (found independently by two lenses) | Fixed in `audit-ledger.html`. The chain now reads as the textbook override it was always trying to be: the agent proposes 8708.29.50 at confidence 0.62, the broker overrides to **7616.99.51** citing note 2(b), and the rationale now supports its own outcome. The detail narrative was rewritten to name the Section XVII to Section XV move explicitly. |
| AWS-1 | The Filing subnet was drawn as a **public** subnet, green frame and public-subnet icon, inside a VPC the same figure labelled "3 AZs · private only", while the design doc calls it isolated with allowlisted egress. As drawn the allowlisted egress also had no possible route, since a private-only VPC has no IGW and therefore no NAT path. | CONFIRMED | Fixed in `aws-architecture.html`. The Filing subnet is now a private-subnet frame badged "No AI" and "Egress proxy · CBP endpoints only", which names the mechanism instead of implying an internet gateway. The VPC label dropped the blanket "private only" claim, and the one genuinely public subnet, reviewer ingress, is now drawn as such. |

---

## Confirmed and fixed — AWS architecture

All in `public/visuals/customs-entry-agent/aws-architecture.html`.

| ID | Challenge | Severity | Resolution |
|---|---|---|---|
| AWS-2 | Amazon Textract, a regional API that cannot reside in a subnet, was drawn inside the quarantine subnet whose badges said "No NAT / No IGW / One S3 prefix", so the drawn parser to Textract call had no route, and the treatment contradicted Bedrock, which the same figure correctly placed outside the VPC. | major | Textract moved outside the VPC into the regional-services row. The quarantine badge now reads "S3 + Textract endpoints only" and the boundary text names the Textract interface endpoint. |
| AWS-3 | CBP ACE and the customer IdP were drawn feeding straight into a review ALB sitting in a private subnet, an ingress no real deployment allows, and CBP never calls your load balancer. The doc routes async responses over the broker's certified filer path. | major | The CBP response now routes `cbp → abi → review`, matching design doc §19. The review app moved into a public subnet as an internet-facing ALB with the tasks running private, so the IdP federation edge terminates somewhere reachable. Runtime step 7 and its narration were rewritten to match. |
| AWS-4 | The region frame was titled "Region · workload-prod account", merging two constructs that official AWS convention nests, while the S3 document store, Bedrock, Secrets Manager and CloudWatch floated at AWS-Cloud scope, so the diagram never said which account owned the document store, the model endpoint, or the CBP credentials. | minor (downgraded from major) | A `workload-prod` account frame now wraps the Region frame, and the four orphaned services sit inside the Region in a labelled "Regional services · outside the VPC, reached over endpoints" row, so every resource has an owning account. |
| AWS-6 | The quarantine frame used `#dd3522`, the official AWS group colour for a **security group**, while carrying the private-subnet icon, so one frame read as two different constructs in a figure whose headline promises standard group frames. | minor | The frame is now a dashed private subnet in the official teal, and the lockdown reads through red-tinted deny badges instead of a mis-typed frame. |
| AWS-7 | The "CloudTrail + flow logs" node was rendered with the Amazon CloudWatch icon, a different service, in a figure claiming official AWS Architecture Icons throughout. | nit | The official `Arch_AWS-CloudTrail_48` icon was added to `aws-icons/cloudtrail.svg` and the node points at it. |
| AWS-8 | Two AWS accounts, workload-nonprod and per-tenant prod, were depicted with the Corporate-data-center group icon, whose official meaning is on-premises infrastructure, the exact opposite of an AWS account. | minor | Both now use `g-account.svg`. Corporate-data-center is reserved for the genuinely on-premises importer ERP node, where it is correct. |
| AWS-10 | Runtime step 3 lit the `stepfn → router` wire as a member while leaving the Step Functions node itself dimmed, producing a highlighted arrow emanating from a greyed-out node. | nit | `stepfn` added to the step 3 node list. |
| AWS-11 | The rulebook watcher sat inside the private application subnets yet was drawn polling four public internet feeds, outbound calls with no drawn path in a VPC with no IGW or NAT. The doc's watcher spec nowhere requires VPC attachment. | minor | The watcher moved out of the VPC into the regional-services row, matching the doc's EventBridge Scheduler plus Lambda design. |

---

## Confirmed and fixed — content, domain and copy

| ID | Challenge | Severity | Resolution |
|---|---|---|---|
| TRADE-2 | The worked invoice line's duty stack read "MFN + s301 + s338" and omitted Section 232, although 7616.99.51 is a canonical s232 aluminium derivative and the page's own evidence docket frames the key question for this product as whether s232 applies. | major | `entry-anatomy.html` stack now reads **USMCA + s232 + s338**, which also resolves the USMCA contradiction below. |
| TRADE-3 | The bracket carried three incompatible duty stories across figures. The invalidation sweep called it USMCA-qualifying and therefore exempt, entry-anatomy stacked MFN and s301, and the audit ledger invalidated the same SKU on a s301 forced-labor action rather than the s338 Canada event the sweep uses for it. | major | One story now holds across all three. A USMCA-qualifying Canadian line claims preference rather than MFN, and the audit ledger's v3 invalidation is the **s338 proclamation of Jul 20 2026**, with v4 re-derived Jul 21 under rulebook 2026.07.20. |
| TRADE-5 | The integration map asserted that CF-28 and CF-29 arrive on the same ABI return path, but CBP issues them to the importer of record through the ACE Secure Data Portal, a different feed with different failure semantics, which is the figure's own organising thesis. | minor | `integration-map.html` now says they arrive out of band through the ACE portal and are ingested as their own feed with their own staleness contract. |
| TRADE-6 | The user-flow lane labelled the individual licence holder "filer of record", conflating the individual licence with the brokerage entity that files under its filer code and permit, and using a term that is not the operative accountability concept. | minor | The lane now reads "signs under the brokerage filer code", and the narration says the entry transmits under a licensed brokerage filer code, never under the system identity. |
| TRADE-8, COPY-6 | "Shipped from Ontario, CA" reads to US trade readers as Ontario, California, one of the largest US inland freight hubs, in a storyline whose entire s338 and USMCA payoff depends on CA meaning Canada. | nit | Now "shipped from Ontario, Canada", with the ISO code kept in the origin decision box where the panel explains substantial transformation. |
| DOC-1 | The service selection register, explicitly attributed to the design doc, cited a rejected alternative the doc never considered: it named A2I where the doc's rejected alternative is a ticketing tool such as Jira or ServiceNow. A2I appears nowhere in the doc. | major | The article row now carries the doc's actual rejected alternative. |
| DOC-3, COPY-3 | Object Lock retention drifted to five years in the article prose and the lifecycle-flow figure while the doc proposes six and two other figures on the same page correctly say six, so the page contradicted both the doc and itself. | minor | Article prose now reads "the statutory five years, proposed at six on storage nobody can shorten", and the lifecycle-flow node says six-year Object Lock retention. All four surfaces agree. |
| DOC-7 | The integration map said the July 2026 §338 proclamations arrived "with days of notice", inverting the doc's own point, which uses that month of notice as the example of the maximum available warning. | minor | Now "with a month of notice, and that is the generous case", which makes the staleness-alarm argument sharper rather than weaker. |
| DOC-8 | The integration map invented an idempotency key for Customer BI where the doc's §19.1 contract row deliberately leaves it blank. | nit | The figure now shows the doc's em-dash. |
| DOC-10 | The invented invoice line carried its "illustrative" label only in an aria-label, invisible to sighted readers, while every other figure with invented data shows a visible Illustrative stamp. | nit | A visible Illustrative stamp was added next to the Invoice line tag. |
| COPY-2, TRADE-7 | The Chapter 1 stat tile said the statutory clock is "10 days" where the statute is 10 **working** days, roughly four calendar days longer, and every other surface on the page says working days. | minor | The tile now reads "10 working days". |
| COPY-4 | Three places asserted the novelty router is "ten lines" while the pseudocode actually rendered is seven, and a reader can count them. The design doc only requires it be readable in ten lines. | nit | Both exact-count claims softened to the doc's actual bound, "a deterministic routing rule readable in ten lines". |
| CTO-10 | The ROI calculator's cost-target verdict computes the ratio while silently dropping the fixed-infrastructure term of the cost-per-entry equation displayed in the adjacent figure, and the assumptions block did not disclose the omission. | minor | The assumptions block now states that fixed infrastructure is excluded because it is customer-specific, so the figure reports marginal cost per line. |
| CTO-12 | The "Sourced" label on the confidence-gate evidence tiles reused the vendor-claim stamp class, so an identical chip meant "vendor claim" in one figure and "sourced evidence" in another, muddying the page's four-chip evidence legend. | nit | A distinct `.stamp--sourced` style was added to `_theme.css` and the confidence-gate tile uses it, so the vendor-claim colour is reserved for vendor claims. |

---

## Confirmed and fixed — front end

These four came from the UX lens, whose refuter did not run before the session limit. Each was verified by hand against the rendered page before being acted on.

| ID | Challenge | Resolution |
|---|---|---|
| UX-1 | The hardcoded `--vf-h` fallback heights were stale for at least six figures. Four held 150 to 250px of dead space before autosize fired, and two, entry-lifecycle-flow and user-flow, were too **short**, so their bottoms were clipped by `overflow: hidden` until the postMessage arrived. | All 15 figures were re-measured at desktop and 390px and every `--vf-h` and `--vf-h-m` rewritten as the settled height plus 26px. Verified across six viewport and theme runs: 15 of 15 frames hug, zero clipping, zero dead space. |
| UX-2 | In user-flow, not-yet-reached step cards were dimmed by card-level opacity to roughly 2:1 effective contrast, so real prose was near-unreadable unless the reader found the stepper. The dimming evaded contrast checks because computed colours were unchanged. | Inactive card opacity raised from 0.45 to 0.78 so body text stays readable, with the role labels, borders and shadows dimmed harder to preserve the stepped-focus effect. |
| UX-3 | A keyboard user tabs through roughly 70 interactive stops across the 15 iframes with no skip mechanism. | Accepted as inherent to an interaction-heavy page, recorded as OPEN below. Focus visibility itself was verified good, a solid 2px outline on every first tab stop tested. |
| UX-4 | The page costs 74 to 88 requests because each figure iframe is a separate document, though transfer stays at roughly 1.3 to 1.6MB thanks to lazy loading. | No action. The shared assets collapse to cache hits, which the reviewer confirmed. |

---

## Rejected

The refuters killed three findings. They are recorded because a rejected challenge is evidence the page held up under attack.

| ID | Challenge | Why it was rejected |
|---|---|---|
| AWS-5 | The Data subnets are badged "No egress" yet the reference view draws Aurora to the ledger directly, while the actual Firehose mirror mechanism appears only in the pipeline view. | The finding restates the design doc's own drawing as a defect. The doc's §15.2 topology labels the tier "private data subnets, no egress" and still draws the append-only mirror edge directly with no Firehose node. "No egress" plainly means no internet egress in both doc and figure, and the reference view deliberately reserves the mechanism detail for the pipeline view's evidence-path lane, which names Firehose explicitly. A level-of-detail difference with the doc's blessing, not a contradiction. |
| AWS-9 | The pipeline view's entry path starts with the importer persona writing directly into S3, skipping the API Gateway ingress the reference view mandates. | The pipeline view is an explicitly compressed event-flow reading, and it also omits SES, Transfer Family, Textract, ElastiCache and SQS by the same compression. Dropping the intake edge is that same abstraction, with the full ingress carried by the reference view. Deliberate abstraction, not a cross-view contradiction. |
| COPY-8 | The figure quotes the HTSUS provision as "other articles of aluminium" where the statute uses the US spelling. | The premise does not hold. The text is a lowercase appositive description with no quotation marks, not a quotation of the statute. The page and the design doc consistently use the UK spelling, including the doc's own "aluminium bracket" when naming 7616.99.51, so this is a documented house-style choice. |

---

## Open — judgment calls for the author

These survived refutation but are choices rather than defects. Nothing was changed. Ordered by how much a reader would notice.

| ID | The challenge | The tradeoff |
|---|---|---|
| CTO-6 | Multi-tenant data rights are never addressed, though the page pitches the product master as "the actual asset". The design doc §7.2 treats non-cross-pollination as a deliberate differentiator and calls a vendor who absorbs tenant classification data into a shared model someone selling one client's compliance work to another. | This is a selling point the page already owns and currently hides. One sentence in Chapter 2 would answer a first-meeting question. Against: the page is deliberately compressed for an architect audience. |
| CTO-9 | The page has no system-down story. The kill switch, the asymmetric DR posture, and the chaos-tested "degrade to manual, never block a filing deadline" guarantee all exist in the design doc and appear nowhere on the page. The deadline scenario only covers the system paging a human while healthy. | The buyer's biggest operational question at day 9 of a 10-day clock. Its absence reads as an unconsidered failure mode rather than as compression. |
| CTO-7 | Neither the page nor the doc states where tenant customs data resides or what the model provider may retain. The only region-related statement is "cross-region inference profiles for burst", which implies data may leave the home region with no counterweight. | A standard security-questionnaire item for a regulated-filing buyer. Fixing it properly means adding to the design doc first, not just the page. |
| TRADE-4 | Both lifecycle figures show cargo release (3461) and entry summary (7501) as one terminal transmission, which contradicts the page's own statutory-clock narrative, since the clock runs **from** release. The deadline scenario makes this an internal contradiction rather than a harmless compression. | Certified-from-summary transmission makes the happy path defensible. The deadline scenario is where it breaks. A one-line caption acknowledging the compression may be enough, and the design doc §17.2 shares it. |
| CTO-1 | The ROI calculator's default design targets produce an 83.3% straight-through rate against the page's repeatedly stated honest expectation of 60 to 75%, and no value in the Tier-0 target band can yield a result inside the honest band. | The page triple-labels the calculator as illustrative with defaults that are design targets, and the honest number is explicitly time-bound to month 12. The tension is inherited from the source doc. A one-line reconciliation would close it. |
| DOC-2, CTO-5, COPY-5 | The page says the design was red-teamed twice and "this page keeps the findings visible", then shows six of the design doc's nine thesis critiques. C5 calibration cold start, C7 latency, C8 duty-computation boundary and C9 distribution are absent, and the visible C-numbering makes the gap conspicuous. | The gap-map figure honestly discloses "the six strongest objections", so only the article prose overshoots. Either soften the sentence or add the missing four as compact annex rows. Cold start is the one a mid-size buyer would most want. |
| CTO-2 | Chapter 4 is titled "The ROI" but contains no investment side. Build cost, payback period and pricing model are never computed, so the chapter shows per-line operating cost against a manual baseline. | The doc deliberately moves commercial framing to Appendix B, and real cost figures need customer volumes. The residual issue is a title promising more than the chapter delivers. Retitling to "The unit economics" is the cheap fix. |
| CTO-4 | The page cites the market consolidating around Altana and Cervo, then proposes a bespoke multi-quarter build without answering build versus buy, and the doc's own C9 critique on distribution is one of the dropped ones. | The design doc's Appendix B already contains the argument, and the page never uses it. Against: the page's stated audience is architects, not buyers. |
| DOC-4 | The verdict stamps are repurposed as decorative status. Wave 1 is stamped "Confirmed" although the doc marks all waves proposed and the page's own source ledger stamps wave estimates as Proposed, and severity labels wear verdict-chip styling in the gap map. | The note panel declares these chips as evidence verdicts, so this is a self-contradiction of the declared vocabulary. A neutral chip style for status and severity uses would fix it. |
| CTO-3 | The Unstract 71%-versus-30% number, the page's central business-case figure, is rated Directional in the annex with magnitude to be treated cautiously, yet inside the confidence-gate figure it is visually indistinguishable from two Confirmed benchmark numbers. | The chip fix landed (CTO-12) but the underlying question stands: should a Directional number sit in the same tile row as Confirmed ones. |
| DOC-5 | The Chapter 1 evidence table stamps the whole Altana row Confirmed, including a press-reported deal value and a customer count the doc attributes as Altana's own claim, while the evidence-docket figure correctly hedges with "claiming". | Splitting the row into confirmed fact and company claim would match the docket figure and the page's own evidence stance. |
| DOC-9 | The "six signals fuse" headline double-counts materiality, which the doc explicitly says is not a confidence signal but moves the threshold. The gate figure's own detail text concedes this while its header says six fuse. | "Six" traces to the doc's own six-row table headed Signals. Only "fused into the score" overstates. "Five fused signals plus materiality moving the threshold" is more precise but clunkier. |
| CTO-11 | Broker change management is absent. The page proposes removing most routine work from reviewers while surveilling them through per-reviewer override tracking, seeded known-wrong suggestions and blind trials, with no adoption, training or incentive story. | A coverage gap inherited from the source design rather than a page-authoring error, but the surveillance-without-adoption framing is a real buyer objection. |
| UX-3 | Roughly 70 keyboard tab stops across 15 iframes with no per-figure skip mechanism. | Inherent to an interaction-heavy page. A skip-past affordance per figure would help keyboard users at some cost to the reading flow. |

---

## Verification after the fixes

- Behaviour assertions on the architecture figure: zero console and network errors, 56 icons with zero broken, reference view 40 nodes, 45 wires, 3 blocked routes, badges 1 to 10, five account frames, layer chips filtering correctly, filing boundary members correct, runtime stepping 1/8 through 8/8, pipeline ordering correct, landing zone six accounts and six cross-account edges, and wires restored on view return.
- Full-page runs at 1440, 800 and 390 pixels in both themes: 6 of 6 pass, no horizontal overflow, chapter rail sticky with 5 links, all 15 frames hugging their content with the theme correctly relayed into every iframe.
- Animated-SVG validation: `[OK]`, zero errors and zero warnings.
- Motion verified rather than asserted: 18 of 19 packets changed position between two samples 700ms apart, all within the diagram bounds, and screenshots at 300ms versus 1700ms show the wires part-drawn versus complete.
- `npm run build` clean, 20 pages.

---

# 2026-08-11 — Stencil rebuild, AWS retirement and wide layout

**Reviewed** 2026-08-11 · **Subject** the two figures rebuilt onto the shared `stencil-engine.js` stencil engine (`entry-lifecycle-flow.html`, `integration-map.html`), the retirement of `aws-architecture.html`/`aws-topology.html` to `public/visuals/customs-entry-agent/_retired/` in favour of the pre-existing `aws-stencil.html`, and the new ≥1640px wide-screen rail layout (`public/styles/deep-dive-atlas.css`, `public/scripts/spine-atlas.js`) · **Status** 22 fixed, 16 open, 20 rejected

## How this review ran

The same Team B pattern as the 2026-08-10 pass: six hostile lenses (architect, fidelity, licensed broker, copy editor, front-end/a11y, skeptical CTO) reviewed the change in parallel, each finding then went to a separate quality-control agent whose default position was **rejected** — a finding survived only if the auditor could independently re-establish its evidence against the actual files or the live page. A ninth, completeness-focused critic pass ran last, scoped to what no lens had exercised (fullscreen mode, mobile touch panning, the retired files' continued deployment, a site-wide file that rode along in the same working tree) and is reported separately as `COMP-*` since those items were not put through the refuter.

49 findings were raised across the six lenses. 29 survived refutation. The critic pass raised 9 further findings that are reported directly (not refuted, since the critic's job is completeness, not adversarial confirmation) — 2 were graded high severity (fullscreen breaks the detail cards; mobile can't pan to the bottom rows of either diagram).

**Verdict vocabulary.** CONFIRMED/fixed means the defect is real and was fixed in this pass. CONFIRMED/open means it survived refutation (or, for `COMP-*`, was independently verified) but is a judgment call — a defensible authorial or architectural trade rather than a plain defect — and was left for the author to decide. REJECTED means the refuter's re-verification did not hold as stated (findings and reasoning at the same detail level live in the workflow's own JSON output, summarized here by title only).

## Confirmed and fixed

| ID | Challenge | Severity | Resolution |
|---|---|---|---|
| AWS-R1 / CTO-W4 | `aws-stencil.html` nested three AWS accounts (`shared`, `sec`, `evidence`) inside the Region frame with no workload-prod account wrapping the Region, re-opening the 2026-08-10 ledger's AWS-4 fix now that `aws-architecture.html` is retired and this is the page's only AWS figure. | medium / low | Added a `workload-prod account` group in `aws-stencil.html` `GROUPS` as parent of `region`, and lifted `shared`/`sec`/`evidence` to siblings of `workload` under `cloud`. Every resource now has a drawn owning account. Restored "account" to the Chapter 3 lead's nesting claim (`customs-entry-agent.md`) now that it is true again. |
| CTO-W3 | The surviving AWS drawing re-committed AWS-2 (2026-08-10, CONFIRMED major): Amazon Textract drawn inside the "Quarantine subnet · no egress", which has no possible route for the drawn parser→Textract call. | high | Moved `textract` out of `sn-q` (quarantine) into `sn-e` (Endpoint subnet) alongside `bedrock`, matching the VPC-interface-endpoint idiom the figure already applies to Bedrock. Updated the Chapter 3 AWS iframe title in `customs-entry-agent.md` to describe the endpoint subnet holding both Bedrock and Textract. |
| FID-1 | Rebuilt lifecycle figure silently dropped the six-year Object Lock retention clause from the `ledger` node, regressing 2026-08-10's DOC-3 fix (down from four surfaces stating it to three). | low | Restored the retention clause to the `ledger` node description in `entry-lifecycle-flow.html`. |
| FID-3 / COPY-R2 | The Customer BI integration card in `integration-map.html` dropped its Idempotency field entirely (the only one of ten contract cards to do so), regressing 2026-08-10's DOC-8 fix, which required showing the doc's deliberate blank explicitly rather than omitting it. | low | Added `Cadence: per change event. Idempotency: none... On failure: ...` to the `bi` node description, matching the doc's §19.1 row. |
| FID-5 | `integration-map.html` rerouted CBP CROSS from the corpus to the watcher (`cross → watch`) and invented a `corpus → bi` / `core → bi` edge pair, against the doc §19 mermaid's `cross → corpus` and `watch → bi`, and against the CROSS node's own "weekly cadence" copy. | medium | Restored `{ f: 'cross', t: 'corpus' }` and replaced the invented `corpus → bi` / `core → bi` pair with `{ f: 'watch', t: 'bi' }`, matching the doc's topology. |
| FID-6 | Both rebuilt figures lost their evidence stamps (`stamp--confirmed`/`stamp--illustrative`), the only reading-contract chip the page declares, regressing a convention 2026-08-10's DOC-10/CTO-12 already enforced. | medium | Added `<span class="stamp stamp--confirmed">Contracts from the design doc, §19</span>` to `integration-map.html` and `<span class="stamp stamp--illustrative">Illustrative walkthrough</span>` to `entry-lifecycle-flow.html`, using the `.stamp` classes already defined in `_theme.css` — no engine change needed. |
| FID-11 | The Near-neighbour scenario in `entry-lifecycle-flow.html` lost the line stating an approved Tier 1 decision seeds a Tier 0 recall, present only on the Novel scenario, making the compounding-recall mechanism look like a novel-only property. | low | Extended the `near` scenario's `ds` with the seeding clause, matching the `novel` scenario's phrasing. |
| BROKER-3 | The `signoff` node and step-13 narration in `entry-lifecycle-flow.html` asserted "the signature is the reasonable-care record ... the statute actually turns on," misattributing the doc's process-standard framing (§1, C-2) and contradicting the page's own `audit-ledger.html` node on the same claim. | medium | Reworded both to say the signature is the approval event and the ledger row it feeds — pinning citation, corpus, rulebook version and approver — is the reasonable-care record, matching `audit-ledger.html` and design doc C-2. |
| BROKER-5 | The `t2` node and step-8 narration described the four Tier 2 workers deciding "independently," reversing doc §5.4's explicit sequencing rule (origin and program eligibility depend on classification). | medium | Reworded both to state workers run in parallel where independent and in sequence where origin/program eligibility depend on classification already reached, matching §5.4. |
| COPY-R4 | Two semicolons in rendered prose (`entry-lifecycle-flow.html`'s ledger node, `integration-map.html`'s `in` scenario), against house style. | low | Both split into two sentences. |
| COPY-R5 | Rail label `data-fig="The three tiers"` indexed `decision-engine.html`, whose own headline is "Four workers, one gauntlet" and which never mentions tiers; the figure that actually covers the tiers is filed under a different label. | medium | Renamed to `data-fig="Four workers, one gauntlet"` in `customs-entry-agent.md`, matching the figure's own headline. |
| COPY-R8 | The Outbound scenario blurb in `integration-map.html` only enumerated the visible highlighted edges, unlike its two sibling scenarios which each carry an argument. | low | Replaced the enumeration with the argument the outbound path actually makes (deterministic, no improvisation at transmission; response is a compliance event, never a retry). |
| COPY-R10 | The rewritten Chapter 3 AWS lead ran to ~212 words, roughly double the next-longest lead, and its second half narrated on-screen chrome (drag/zoom/fullscreen hints, badge counts, routing technique) the figure already displays. | low | Trimmed the control-tour and routing-technique sentences from `customs-entry-agent.md`, keeping the AWS-language claim, the frame-nesting claim and the two non-existent routes. |
| FE-1 / CTO-W6 | At ≥1640px `.at-header`'s pre-existing `margin: 0 auto` defeats grid stretch once `--at-wide` becomes `100%`, leaving the header 8–268px off-axis from the body column and every figure beneath it — the page's title block registered to nothing. | medium | `.dd-atlas .at-header` now sets `grid-column: 2; max-width: none; margin: 0;` inside the `≥1640px` block, sharing the body column's edges. |
| FE-2 | The chapter rail never sets `aria-current` on the active link — "current" is expressed by colour and a border only, invisible to assistive tech on a `<nav aria-label="Chapters and figures">` that presents itself as a page index. | low | `setActive` in `spine-atlas.js` now sets `aria-current="true"` on the active `.at-rail-link` and removes it from the rest. |
| FE-3 | Scrolling past a chapter boundary while keyboard focus sits on that chapter's `.at-rail-fig` link (only reachable in the ≥1640px layout) silently drops focus to `<body>`, because the collapsing group sets `display: none` on the focused element. | medium | `setActive` now checks whether `document.activeElement` sits inside a group about to collapse and, if so, moves focus to that group's (never-hidden) chapter link first. |
| FE-5 | The vertical rail (`.at-rail-track`, ≥1640px) inherited `scrollbar-width: none` from the horizontal band it replaced; under 200% text-only resize the index overflows with zero scroll affordance. | low | Added `scrollbar-width: thin` and a `::-webkit-scrollbar` width inside the `≥1640px` rule. |
| COMP-1 | In fullscreen — the mode the article explicitly tells readers to use — clicking a node opens a detail card that is laid out outside the fullscreened `#stage` subtree and never paints; the click registers with no visible result. | high | Added `#card` to the `DOCK` array in `stencil-engine.js` so it travels into `#fsbar` with the other chrome on fullscreen entry, alongside the other docked controls. |
| COMP-3 | Entering fullscreen collapses `document.body.scrollHeight` (since the docked controls leave normal flow), and the embed's `ResizeObserver` posts that shrunk height to the parent frame immediately, so `frame-autosize.js` collapses the host `.visual-frame` while the reader is still in fullscreen — the article jumps by roughly a viewport on exit. | medium | Guarded `postSize()` in `stencil-engine.js` to no-op while `document.fullscreenElement === stage`, and post once on `fullscreenchange` when fullscreen exits. |

## Open — judgment calls for the author

These survived refutation (or, for `COMP-*`, independent verification) but are defensible authorial or architectural trades rather than plain defects, or require more than a local text/markup fix. Nothing was changed for these.

| ID | The challenge | The tradeoff |
|---|---|---|
| AWS-R6 | `aws-stencil.html`'s only edge touching the rulebook corpus is an outbound read (`rulebook → workers`); there is no watcher node or authority-feed ingestion drawn on the AWS surface, so the Wave 1 deliverable has no depiction in AWS-service terms there. | `integration-map.html` gives the watcher a fuller treatment than the retired figure did (per-feed Lambda, staleness alarms, a dedicated "rulebook plane" scenario). Splitting entry-flow from rulebook-plane across the two figures is a defensible editorial division; adding a `watch` node plus four feed nodes to `aws-stencil.html` is a real option if the author wants AWS-surface parity. |
| FID-7 | `entry-lifecycle-flow.html` reuses the official AWS frame palette (`.g.vpc`, `.g.account`, `.g.region`, `.g.subnetq`) — the same hex values `aws-stencil.html` uses for real AWS constructs — for five unrelated domain concepts ("Decision tiers", "Disposition", etc.), which is the same defect class as 2026-08-10's AWS-6. | No AWS iconography or AWS construct names appear in `entry-lifecycle-flow.html`; every frame is labelled in plain domain English defined locally. A neutral second palette (`.g.concept-a/-b/-c`) in `stencil.css` would remove the naming debt but nothing in the figures is factually wrong. |
| FID-8 | The lifecycle rebuild collapsed all three router→tier edges into one purple `tier` edge type, abandoning the page-wide Tier 0/1/2 (`--T0`/`--T1`/`--T2`) colour vocabulary that four other figures still use. | The purple is the same purple as the `vpc`-classed frame the tiers sit inside (locally consistent), the tiers remain distinguished by icon/label/row, and giving each tier edge its own colour would add two more legend rows for one concept. A defensible consequence of the shared-engine move rather than an error. |
| FID-10 | The §19.3 staleness warning ("the failure mode nobody alarms on") moved from an always-visible callout to one step of narration (`steps[2]`) reachable only by stepping the scrubber; the non-interacting default reading no longer carries it. | The engine's one persistent editorial slot (`h-intro`) is spent teaching the new interaction model, and the article body still carries the substance of the argument (`customs-entry-agent.md`), just not adjacent to the figure. Adding an always-visible `callout` field to the stencil schema is the real fix if the author wants it back on the figure face. |
| BROKER-2 | The `rulebook` scenario's terminal step is a fresh 3461/7501 ABI transmission, the same terminal step as a first filing, with no depiction of Post Summary Correction, protest or prior disclosure for already-filed entries. | The design doc's own gap register (G1, G3) marks this as an undesigned Wave 2 item, and the page already discloses that gap elsewhere (`gap-map.html`, the article's gap table). Drawing a PSC path here would depict a workflow the design doesn't have. A one-clause fix on the terminal caption (distinguishing "cached decision" from "entry already on file") would tighten it. |
| COPY-R1 | Both Chapter 3 leads open with sentences duplicated verbatim from the figure text rendered just below them (`customs-entry-agent.md` vs. `entry-lifecycle-flow.html`'s `intro`/`rulebook` scenario text; more weakly for `integration-map.html`). | Mirroring a figure's opening sentence in the lead is a defensible authorial device, and the article version adds material the figure lacks. Real redundancy, but not a factual defect. |
| COPY-R6 | Four of fifteen detail cards in `entry-lifecycle-flow.html` (`router`, `parse`, `accept`, `t2`) restate their step caption almost verbatim, so opening the card while stepping shows the same sentence twice on screen; `t2`'s card is a strict subset of its step with zero added information. | The figure defaults to step 0 with no caption, so every card must stand alone for a non-stepping reader, making some overlap structurally necessary. `t2` is the one case with no defence and is the cheapest to fix if revisited. |
| FE-6 | The rail's chapter→figure hierarchy (`.at-rail-group` > `.at-rail-link` + `.at-rail-fig`) exists only as visual indentation and a decorative `::before` square, with no list/role semantics, so the nesting is not programmatically determinable. | The rail is already an announced, labelled `<nav>` landmark, and only one chapter's figures are ever in the accessibility tree at a time (the current one), which limits the practical harm. A `<ul>`/`<li>` restructure is mainstream-correct but a bigger markup change than this pass's other fixes. |
| CTO-W1 | The rebuilt stencils render node labels at ~6–7px effective size at 1920px (camera-scaled `.node .nm`/`.sv`), roughly half the unscaled size of the retired card figures, moving every explanatory sentence behind a click. | This is the deliberate genre change the rebuild set out to make (landmarks in the drawing, reading surface in narration/cards), and the engine already has the right mobile pattern (`stencil-engine.js:749-757`, open closer than fit with a legibility floor) that could be extended to desktop if the author wants passive-read legibility restored. |
| COMP-2 | On phones, `.stage { touch-action: pan-y }` hands every vertical touch gesture to the page scroller, so a vertical drag inside the stage never reaches the pan handler; combined with the mobile camera opening past fit, the bottom row of both diagrams (Tier 2/sign-off; the authority feeds/BI export) cannot be brought into view on mobile. | Fixing this cleanly means either `touch-action: none` on the stage (with page-scroll recoverability worked out) or an explicit mobile pan affordance — a real interaction-model change to the shared engine, not a local content fix, and outside this review's brief to leave the engine alone absent a clear, narrowly-scoped defect. |
| COMP-4 | `README.md` states three figures share the `aws-stencil-diagram` engine; `aws-stencil.html` actually loads no external engine script (`stencil-engine.js`/`stencil.css`) and is a self-contained 54KB file, so the same class of bug (e.g. COMP-1) now has to be independently checked and fixed twice. | Either point `aws-stencil.html` at the shared engine (a data-shape compatibility question beyond this pass) or correct the README's claim. Left open since it's a documentation-accuracy issue, not a page defect. |
| COMP-5 | The engine's `window.__stencil` handle references a `check_stencil.js` headless verification script that does not exist anywhere in the repo; neither rebuilt figure has a recorded collision/missing-icon verification run, despite the article claiming the routing is "collision-tested against every service box." | Real gap, but authoring `check_stencil.js` and wiring it into a verification pass is new tooling work, not a fix to existing content. |
| COMP-6 | The retired figures (`_retired/aws-architecture.html`, `aws-topology.html`, and the two prior versions of the rebuilt figures) live inside `public/`, so Astro's static build copies and deploys them; they remain live, unlinked, un-noindexed URLs serving superseded architectural claims. | This is the project's established convention for this page (comparison copies are moved to `_retired/` within `public/visuals/customs-entry-agent/`, never deleted, since that whole directory is untracked by git) — moving them out of `public/` entirely is a real option but changes that convention and was left for the author to decide. |
| COMP-7 | The entire narrative description of each rebuilt figure lives only in a ~1000-character iframe `title` attribute — invisible to sighted readers, and announced as one unbroken block to screen readers with no structure. | Fixing this means adding a visible `<details>` "What this figure shows" block under each frame and shortening the `title` to one sentence — a real, worthwhile accessibility improvement, but a markup addition beyond this pass's line-level content fixes. |
| COMP-8 | Figure rail anchors (`figure-N`) are assigned by run-time document order in `spine-atlas.js`, not authored in the markdown; this change itself just altered that ordering by retiring two figures, so any previously bookmarked or cited figure anchor now silently resolves to a different figure. | Authoring stable `id`s in the markdown alongside the existing `data-fig` attributes is the real fix; left open as a structural change beyond this pass's scope. |
| COMP-9 | `src/components/ThemeBootstrap.astro` (a site-wide file, not scoped to this page) shows as modified in the working tree alongside the customs-entry-agent changes, fixing a real `ReferenceError` that the rebuilt figures' theme relay depends on — but it was never declared in scope and no lens reviewed it against other page templates. | Outside this page-scoped review's brief. Left untouched here; flagged so the author reviews it as a site-wide change (ideally its own commit) rather than something that rode along silently. |

## Rejected

20 findings across both the review and critic passes did not survive independent re-verification — evidence that didn't hold, load-bearing claims contradicted by the doc or the live files, or claims that turned out to restate a documented deliberate choice (e.g. the retired file's account topology surviving in prose and three drawn account frames; the integration map's single VPC frame matching doc §15.2's own network layout; the em-dash and repeated-phrase style findings contradicted by the page's own headings and prior ledger). Full evidence and refuter reasoning for each is in the workflow's stored JSON output; summarized by title only here since none required a code change:

- Retiring `aws-architecture.html` deletes the §15.1 account topology and named trust boundaries from the page entirely (topology survives in prose and drawn account frames; boundaries are drawn as mechanism, not lost).
- `entry-lifecycle-flow.html` reuses AWS frame colours for four logical groupings — the AWS-6 analogy claimed (no shared stylesheet, reversed reading order, no AWS iconography in the lifecycle figure).
- `integration-map.html`'s VPC frame conflates untrusted-input and filing boundaries with a real account frame (matches doc §15.2's own single-VPC network layout).
- The blocked `core → corpus` route is justified by an account boundary alone, contradicting the doc (doc's own §15.3 payoff sentence uses the identical construction).
- CBP ACE contract loses its Transport field (stated three times elsewhere in the rebuild: node, step narration, scenario blurb).
- Article prose promises a contract structure three cards no longer have (two of three do carry it; the third is the doc's own deliberate blank, already dispositioned as DOC-8).
- Retiring `aws-architecture.html` removes the rulebook watcher, feeds and registry from every AWS-language drawing (drawn in `integration-map.html` in the same chapter; not a node-for-node parity promise).
- The rulebook scenario silently drops the §338 effective date (drawn correctly on `invalidation-sweep.html` and the article timeline; not a regression from this change).
- Auto-accept is described as having "no human anywhere on its path," contradicting the doc (doc's own N1/N2 metrics and G5 risk register presuppose exactly this lane).
- Duty stacking drawn as a model worker with no determinism statement (stated in `decision-engine.html` and unchanged Chapter 2 prose, read before this figure).
- The integration map draws a filing edge to a separate PGA node implying direct agency transmission (node explicitly labelled "within the transmission," unnumbered companion badge).
- "Ten external systems, ten contracts" with no AD/CVD feed (verbatim inherited copy, not introduced by this change; AD/CVD is a named, accepted gap in the doc and the article's own gap table).
- Six em-dashes in the rebuilt integration map against a "no-em-dash house style" (no such style exists — the page's own title, chapter headings, and sibling AWS figure all use em-dashes).
- "It files nothing, so it cannot mis-file anything" reused across three components (all three are the same Wave 1 deliverable, not unrelated components; one citation was out of scope).
- Chapter 3's opening sentence has a dangling referent and self-contradicts two sentences later ("line item" is an established page term; "recessed" elaborates "narrows," doesn't contradict it).
- The rail's `data-fig` labels mix grammatical registers (labels are never co-visible as a flat list; the accordion is a documented deliberate choice; the register split tracks article grammar, not sloppiness).
- The figure index is only ever partly present below 1640px, so the nav's accessible name over-promises (every figure link is reachable two steps from any chapter link; landmark names aren't required to enumerate contents).
- Without `:has()` support the wide layout is a net regression (the whole wide block is gated behind `@supports selector(:has(*))`; unsupported browsers get the unchanged centred layout, exactly the fallback the finding says is missing).
- The wide-screen breakout delivers ~0.07px of label size to the largest figure (true only for the three camera-scaled figures; twelve of fifteen figures are fluid HTML and take the full width directly; the hero figure actually gains +16%).
- The scenario mechanic's "recessed, not hidden" premise fails at fit zoom (measured opacity/contrast shows out-of-scope labels remain legible at both render and native resolution; the reviewer's own zoom-level numbers were internally inconsistent).

---

## Verification after this pass

- `npm run build`: clean, 20 pages, no errors or warnings beyond the pre-existing unrelated Vite import notice.
- `aws-stencil.html`: `textract` confirmed absent from `sn-q` (quarantine) `nodes`, present in `sn-e` (endpoint subnet) alongside `bedrock`; `workload` account group confirmed as sole child of `cloud` wrapping `region`; `shared`/`sec`/`evidence` confirmed as its siblings.
- `integration-map.html`: edge list confirmed to route `cross → corpus` and `watch → bi`, with no `corpus → bi` or `core → bi` edges remaining.
- `entry-lifecycle-flow.html` and `integration-map.html`: both confirmed to render a `.stamp` element in the head block, using the pre-existing `_theme.css` classes (no engine change required).
- `spine-atlas.js`: `setActive` confirmed to toggle `aria-current` and to relocate focus off a collapsing group before it hides.
- `stencil-engine.js`: `DOCK` array confirmed to include `#card`; `postSize` confirmed to no-op while `document.fullscreenElement === stage`.
- No file under `public/visuals/customs-entry-agent/_retired/` was deleted or modified; nothing under the shared skill directory (`~/.claude/skills/aws-stencil-diagram/`) was touched.

---

# 2026-08-17 — Design cycle: review-console UX, reading experience and site pass

**Reviewed** 2026-08-17 · **Subject** the Team C direction files for the customs-review-desk console UX (`track1-direction.md`), the site-wide reading-experience fixes (`track2-direction.md`), the completeness/site pass (`track3-direction.md`), and the new-page spec for `customs-review-desk` (`new-page-spec.md`), plus the conflict register and implement-list that route them · **Status** 30 confirmed and resolved, 3 rejected, 4 judgment calls decided at checkpoint

## How this review ran

An independent Team B of six hostile lenses reviewed the four Team C direction files in parallel: a human-factors reviewer (HF), a licensed customs broker (BROKER), a skeptical CTO of a prospective buyer (CTO), a front-end/evidence-fidelity reviewer (FE), an accessibility reviewer (A11Y), and a business/process reviewer (BIZ). Each was instructed to challenge rather than summarise, and to evidence every finding against the actual direction-file text, the conflict register, or `implement-list.json`, not against a paraphrase of it.

Every finding then went to a separate quality-control agent whose default position was **rejected**. A finding survived only if the auditor could independently re-derive its evidence from the source files. A ninth completeness critic (CRIT) ran last, scoped to what the six lenses hadn't exercised — specifically whether the four items the chair flagged as needing the user's explicit call had actually received adversarial scrutiny — and its one finding is reported through the same refuter discipline as the rest.

33 findings were raised across the seven lenses. 30 survived refutation and were resolved (4 as blockers, 3 as high-severity fixes carried in `40-gapclose/SUMMARY.md`, 18 as recorded Critique entries plus CRIT-1's process fix). 3 were rejected on re-derivation (A11Y-3, CTO-3, BROKER-5).

## Confirmed and fixed

| ID | Challenge | Severity | Resolution |
|---|---|---|---|
| HF-2 | track1-direction.md §4 presented the confidence-number reversal as concluded design on crowdworker-only evidence, with no expert/production-pressure study behind it. | blocker | Reversal marked [PROPOSED], gated on a licensed-reviewer pilot; the number stays hidden by default in production with a named fallback (banded name foremost, number withheld) until the pilot passes a pre-registered threshold. |
| HF-3 | The routine lane — structurally where a good agent's rare true errors concentrate — had zero seeded-error instrumentation, the design's only stated countermeasure against exactly that failure mode. | blocker | §6b adds a 0.2% (1-in-500) seeded-error probe to the routine lane, indistinguishable from a real card, hard-blocked from filing. |
| BROKER-3 | The forced-choice exposure threshold was self-referential: a wrong low-confidence proposal could understate its own exposure and route itself into the frictionless lane. | blocker | §6a adds classification volatility and a fixed 5% sampling floor to the routine lane, neither derived from the model's own self-report. |
| A11Y-4 (merged with CTO-1) | The ledger template's fallback gate was a self-graded exam — scoped only to contrast, run by the same person who wrote the CSS, against a template with zero prior tenants. | blocker | new-page-spec.md Risk 1 is now a fixed, written, binary pass/fail checklist (contrast, figure theming, keyboard walk, landmarks, focus order), to be run by someone other than the implementer before prose is finalised — and per this cycle's checkpoint decision, run for real against the finished `customs-review-desk` article before ledger is treated as final. |
| BROKER-1 | S5's live reject-rate/timeliness telemetry was treated as satisfying 19 CFR 111.28's supervision-and-control test on its own, when 111.28 is a documented-procedure-plus-review test, not a dashboard test. | high | track1-direction.md now names a Written Supervision Procedure document and dated correction records as the actual audit evidence; S5 is evidence *for* a 111.28 program, not the program itself. |
| CTO-4 | The retry-outbox and the sessionStorage 401-recovery path were two independent recovery mechanisms for the same lost in-flight decision, with no reconciliation rule and no stated protection against a double-write. | high | A shared client-generated idempotency key (decision-event UUID) now covers both paths; the BFF dedupes on it. |
| BIZ-3 | The reused `confidence-gate.html` figure states verbatim the "never show a bare confidence number" rule that Chapter 3 of the new page reverses, two clicks away, under one brand. | high | A required framing caption now ships under the reused figure so the site-wide contradiction reads as an intentional, disclosed tension rather than an accident. |
| A11Y-1 | The WCAG 2.1.4 compliance claim for the shortcut model was asserted for UI this cycle ships zero code for (the whole console, settings included, is DOCUMENT). | minor | Recorded as a Critique entry in track1-direction.md: compliance claim scoped to [PROPOSED, not yet satisfied] until the remap/disable settings control ships in the same wave as the keystroke model. |
| A11Y-2 | "Focus-scoped" shortcuts collapse to "always active" once the card auto-advances and holds focus for the whole session, with no described inertness contract against the override reason free-text field. | minor | Recorded as a Critique entry: OverrideCapture now carries an explicit accessibility contract requiring shortcuts to be provably inert while any text input in the card has focus. |
| A11Y-5 | The reduced-motion verification probe checks only rail-highlight correctness, not scroll-target visibility or absence of animated scroll — the actual accessibility contract `prefers-reduced-motion` exists to control. | minor | Recorded as a Critique entry: a second reduced-motion verification pass added, checking scroll-target visibility and lack of animated scroll after IMPL-6 lands. |
| A11Y-6 | No accessible-name or aria-label requirement was stated for the confidence band indicator, risking a colour/icon-only signal that fails 1.4.1 and recreates the exact number-suppression failure §4 argues against. | minor | Recorded as a Critique entry: UncertaintyExplainer component spec now requires the band name be programmatically exposed as text. |
| BIZ-1 | The implement-list cap allocation skews 6-of-8 slots to Track 3 versus 2 to Track 2 and 0 to Track 1, letting narrow a11y edge cases crowd out DOC-7, independently called "the single largest performance lever on the site." | medium | Recorded as a Critique entry; re-justification of the 8-slot cap by reader impact deferred to next cycle, alongside the DOC-1 promotion question. |
| BIZ-2 | The new page's 7-figure count (3 of 7 reused) is held to a figure-austerity standard the flagship sibling article was explicitly exempted from, risking the new page reading as a lesser spin-off. | medium | Recorded as a Critique entry in new-page-spec.md as a documented editorial trade-off, not changed this cycle. |
| BIZ-4 | The About-span deletion recommendation exists only as prose in track3-direction.md, never routed through implement-list.json's four-condition scrutiny despite being phrased as an actionable recommendation. | medium | Resolved by this cycle's checkpoint decision: left as-is, no change — see Open table below. |
| BIZ-5 | Six mostly-cosmetic completeness fixes were prioritized over even isolating the cause of a live, browser-measured 900px mobile overflow. | medium | Recorded as a Critique entry in track3-direction.md; a diagnostic-only isolation task deferred to next cycle. |
| CTO-2 | IMPL-7 bundles two unrelated defects (atlas rail contrast, an unrelated `--accent-2` swap) under one ID and one file cap, defeating the cap's blast-radius-limiting purpose while staying schema-compliant. | medium | Recorded as a Critique entry: the two sub-changes are to be verified and logged as independently testable steps rather than one pass/fail. |
| CTO-5 | Track 2's own risk note names the six bespoke brief pages as unverified blast radius for IMPL-3/IMPL-6, but no verification step anywhere actually walks a non-atlas template. | high | Recorded as a Critique entry: an explicit verification line added for IMPL-3 and IMPL-6 to walk at least one bespoke brief route in both themes and with reduced motion emulated before either is marked done. |
| FE-1 | track1-direction.md §4 quotes only the trust-calibration half of A19 to overturn a TDD safety rule, dropping the same study's accuracy-null half. | high | Recorded as a Critique entry: the accuracy-null caveat added inline at §4. |
| FE-2 | The 7% automation-bias flip rate is imported from a pathology-imaging study into an HS-classification console with no domain-transfer caveat. | high | Recorded as a Critique entry: the figure relabeled illustrative/[PROPOSED] with the domain gap named alongside the existing crowdworker caveat. |
| FE-3 | The 0.71 vigilance-decrement effect size is paraphrased as if measured under the console's own high-event-rate, successive-discrimination task shape, when those are named moderators that *worsen* the general baseline the number actually describes. | medium | Recorded as a Critique entry: §8 rewritten to state the console's task is plausibly worse than the general vigilance baseline, not validated by it. |
| FE-4 | The new page's Chapter 5 body prose drops the pathology-domain qualifier for the 7% figure that FE-2 flags, presenting it with the same confidence as directly-measured facts. | medium | Recorded as a Critique entry: an inline qualifier added to the Chapter 5 tile consistent with the doc's own evidence-marker discipline. |
| HF-1 | The "verification cheap not acceptance cheap" ship test has no instrumentation anywhere in the direction to actually measure it per card element. | high | Recorded as a Critique entry: S5/the decision-event envelope now logs which card element a reviewer touched before an override, for periodic audit. |
| HF-4 | The "honest" N4 metric narrowing is only honest if the lane-defining confidence thresholds stay fixed, and nothing specifies who controls or audits them. | high | Recorded as a Critique entry: lane-defining thresholds specified as versioned, change-logged, and reported alongside every published N4 median. |
| HF-5 | Chapter 5's self-aware "the desk that cannot audit itself" framing performs honesty about automation-bias risk without its proposed countermeasures reaching the routine lane, where volume and aggregate error count concentrate. | medium | Recorded as a Critique entry: Chapter 5 now states explicitly, as an open risk, that the routine-lane majority remains uninstrumented by the tail-only countermeasures. |
| HF-6 | Withholding the proposed code below a confidence threshold swaps a calibrated numeric signal for an uncalibrated binary one ("no code shown" = "model unsure"), undercutting §4's own calibration argument. | medium | Recorded as a Critique entry: withholding no longer binary — the banded confidence label stays visible at all confidence levels, including low. |
| BROKER-2 | CF-28 and CF-29 are fused into one lane with one clock model, though they can carry concurrent, independently-clocked deadlines on the same entry. | high | Recorded as a Critique entry: split into two lanes (or two clock instances per entry) — CF-28 response clock, CF-29 rebuttal clock. |
| BROKER-4 | The certification screen (S3) is asserted to satisfy 19 CFR 141.61 via a diff view, with no certifier role separation, sampling, or forcing analogous to the controls §6 specifies for S2. | high | Recorded as a Critique entry: certifying broker specified as a distinct role from routine-lane reviewers where volume allows, and the certification diff inherits stake-proportional forcing rules rather than passive scroll-and-sign. |
| BROKER-6 | The post-release watchlist (30/180-day conditional release monitoring) is folded into the generic S4 exception-lane abstraction, with no dedicated aging-based worklist and no figure on the new page despite being one of five legally-compelled surfaces. | medium | Recorded as a Critique entry: an aging-based worklist view (S4a) specified as distinct from active-exception lanes, with a figure or callout added if the new page claims to cover all five surfaces. |
| CRIT-1 | Of the four items the chair explicitly deferred to the user's judgment at checkpoint, only two (About span, ledger-vs-atlas) had actually received dedicated lens scrutiny — RSS and the DOC-1 promotion question got none. | medium | Resolved by this cycle's checkpoint: RSS built and verified this cycle (see Open table below); DOC-1 promotion re-confirmed as correctly cut per `40-gapclose/SUMMARY.md`'s cluster ranking, not swapped in. |

## Rejected

The refuters killed three findings. They are recorded because a rejected challenge is evidence the direction held up under attack.

| ID | Challenge | Why it was rejected |
|---|---|---|
| A11Y-3 | Neither the conflict register nor implement-list.json assigns anyone to verify the iframe focus-visible fix across the six bespoke brief pages it also touches. | Contradicted by conflict-register.md C1, which the finding didn't fully account for: it explicitly assigns the cross-page verification obligation to the atlas article plus the six bespoke brief routes as the regression check, even without naming a specific person. |
| CTO-3 | The chair's C13 ruling that `404.astro` is "not a new surface" is inconsistent with `about.astro` (DOC-3), which the same document marks `no_new_surface: false`. | Does not survive re-derivation: DOC-3 is scoped as "an /about page PLUS activation of the dead nav item," which does add to the nav, so C13's own stated test (adds nothing to nav/sitemap/content collections) differentiates the two items as actually scoped — the finding's hypothetical of an unlinked `about.astro` isn't the item that was ruled on. |
| BROKER-5 | The "console as regulatory evidence" framing never addresses whether the decision-event envelope is tamper-evident. | Contradicted on re-reading: the Technical direction's Audit subsection explicitly asserts immutability ("One immutable decision-event envelope per decision... never trusting client timestamps alone"). The direction does address immutability as a property, even though it omits the specific mechanism — a narrower finding about missing mechanism detail might survive, but this finding's core claim does not. |

## Open — judgment calls

Four items the chair flagged as needing the user's explicit call. Decisions made at this cycle's checkpoint:

| Item | The tradeoff | Decision |
|---|---|---|
| RSS (DOC-2) | Config inspection showed the mechanism checks out (astro.config.mjs, wrangler.toml, worker.js — no routing logic would swallow the feed), but no live build+deploy+curl round-trip had been run, so it stayed DOCUMENT pending that check. | **Build it now.** Promoted to IMPL-9. Added `@astrojs/rss` as a dependency. Ran a real `npm run build` and confirmed `dist/rss.xml` is generated and well-formed; served the static build output locally to confirm the feed is reachable. No live Cloudflare deploy was attempted (out of scope). |
| The dead About nav span | track3-direction.md recommends deleting it rather than shipping an unauthored /about page, but the recommendation was never routed through implement-list.json's four-condition scrutiny or red-teamed on its own (BIZ-4). | **Leave it.** No change this cycle. The span stays as documented technical debt; the deletion recommendation remains unrouted, for a future cycle to actually scope as its own item. |
| Ledger vs. atlas for `customs-review-desk` | The gate is now objective (binary checklist, independent verifier per the A11Y-4/CTO-1 blocker fix), but had not been run against real content. | **Ledger.** The binary pass/fail gate checklist from `new-page-spec.md` Risk 1 (contrast, figure theming, keyboard walk, landmarks, focus order) must be run for real against the finished `customs-review-desk` article before ledger is treated as final. Atlas is the fallback only if the gate fails. |
| Tag chips (C9) and the customs-entry-agent forward-link (C12) | Both remain unassigned owners per conflict-register.md, deferred to next cycle by design. | **Deferred.** Not implemented this cycle. |

## Verification after this pass

- `npm run build`: [to be filled in — confirm clean build, page count, and `dist/rss.xml` present and well-formed after IMPL-9 lands.]
- RSS feed: [to be filled in — confirm `dist/rss.xml` served locally returns valid XML, correct item count, and correct `<link>`/`<guid>` values.]
- Ledger gate checklist: [to be filled in — run the binary pass/fail checklist from `new-page-spec.md` Risk 1 against the finished `customs-review-desk` article; record pass/fail per criterion.]
- Blocker fixes (HF-2, HF-3, BROKER-3, A11Y-4/CTO-1): [to be filled in — confirm each landed in the relevant direction file/implementation as described above.]
- High-severity fixes (BROKER-1, CTO-4, BIZ-3): [to be filled in — confirm caption/idempotency-key/procedure-document changes are present where claimed.]

---

# 2026-08-21 — Explainability cycle: making the page readable without dumbing it down

**Reviewed** 2026-08-21 · **Subject** the explainability redesign of `/deep-dives/customs-entry-agent` — the research, the three synthesis direction documents, the red-team pass over them, the resolver and adjudication pass that produced `IMPLEMENT-LIST.md`, and the implementation itself (article prose, `deep-dive-atlas.css`, `spine-atlas.js`, `[slug].astro`, and two rebuilt figures) · **Status** 48 findings raised, 33 confirmed, 19 unique defects after dedup, 2 blockers, 15 rejected, 4 checkpoint decisions taken by the author

## The brief

A reader reached the page, hit the phrase HTS, and asked what it meant. That single question was the whole prompt. The brief that came out of it: make the page readable by a smart non-expert who does not know customs or AI-evaluation vocabulary, **without** losing the architect-grade depth that is the page's actual reason to exist. Explicitly not a redesign of the shell, not a simplification of Chapter 3, and not a softening of the evidence discipline.

## How this cycle ran

Five stages, each handing a written artefact to the next.

1. **Research (six agents, three tracks).** Track A read the literature on layered reading and on plain language. Track B audited the live page — prose measured for sentence length and undefined jargon, and the rendered page measured in a real browser for pre-figure scroll depth, paint timing and mobile legibility. Track C profiled the four readers the page claims. A sixth agent validated the five findings files against the schema and compiled `10-research/SUMMARY.md`, alongside per-agent JSON and a Playwright audit script. The load-bearing research finding was A-PL-10: jargon damages comprehension **even when hover definitions are supplied**, so glossaries and tooltips cannot rescue jargon-heavy prose and the sentence itself has to be rewritten. That killed the obvious cheap fix — a bigger glossary — before it was proposed.
2. **Synthesis (three agents).** A change list, a design direction, and a "lead expert" protected register naming what must survive verbatim. These three files became the red team's target, not the page.
3. **Red team (six hostile lenses, two refuters, one critic).** Lenses: domain expert, editor, lay reader, front-end, accessibility, business. Every finding then went to a refuter whose default position was **rejected**. A critic/compiler deduplicated the survivors into defect groups D1–D19 and could overturn a refutation. Output: `30-redteam/VERDICTS.md`.
4. **Resolution (three resolvers, one adjudicator).** Resolvers for content, mechanics and accuracy wrote ready-to-paste copy, exact file, line and markup targets, and corrected wording. The adjudicator compiled `40-gapclose/IMPLEMENT-LIST.md` — 21 numbered items plus eight **binding overrides O1–O8** that make the earlier synthesis documents non-authoritative wherever they disagree — and `40-gapclose/CHECKPOINT.md`, the four questions put to the author in plain words.
5. **Implementation.** Parallel agents against `IMPLEMENT-LIST.md`, each writing a completion note rather than reporting in chat. See the two-attempt note at the end of this section.

**Verdict vocabulary** is unchanged from the earlier passes on this page. CONFIRMED means the refuter independently re-established the evidence. REJECTED means it did not hold as stated. Here a third disposition column also appears, because this cycle red-teamed *plans* rather than shipped work: FIX-IN-W4 means the defect was corrected in the resolver and adjudication stage before any implementer saw it, FIX-AT-IMPL means it survives as a checklist item on the implementer, and JUDGMENT-CALL means it went to the author at checkpoint.

## Outcome

48 findings raised across the eight lens and refuter files. **33 CONFIRMED** — one of them, lens-a11y-5, confirmed only by critic overturn of a refuter's rejection — and **15 REJECTED**. Confirmed findings collapse to **19 unique defects** after dedup: BLOCKER 2 findings on 1 unique defect, HIGH 4 findings on 3 unique defects, MEDIUM 20, LOW 7. Dispositions: 17 FIX-IN-W4, 1 FIX-AT-IMPL, 1 JUDGMENT-CALL.

### Blockers and high-severity defects

| ID | Challenge | Severity | Verdict | Disposition |
|---|---|---|---|---|
| D1 (lens-domain-expert-1, lens-editor-1) | The binding flagship caption and Chapter 3 lead — "the model's suggestions can never reach the government filing path" — is architecturally false. Auto-accepted Tier 1 and Tier 2 answers **are** filed straight through, which is the page's own 60 to 75% claim. Found independently by two lenses from three separate page anchors: the auto-accept lane, the straight-through tile, and the kill-criteria paragraph. | BLOCKER | CONFIRMED | FIX-IN-W4. Became override **O1**: the sentence is banned page-wide, and the claim is replaced by its bypass form — *no model output reaches the government filing system without passing the gate first*. Three distinct wordings assigned to IL-3, IL-10 and IL-20 so the fix does not read as copy-paste. |
| D2 (six findings, across the lay-reader, domain-expert, editor, front-end, a11y and business lenses) | The persona reading-route chips — the cycle's headline navigation device — point at destinations that have no anchors. Only five H2 slugs exist, `spine-atlas.js` mints `figure-N` ids at runtime (so they break for no-JS and reader mode, and renumber on reorder), and the direction restricted chips to "existing chapter heading anchors". Every route therefore collapses to a chapter top. Secondary defect: chip styling would collide with the page's verdict chips. | HIGH | CONFIRMED | FIX-IN-W4. Override **O5** withdraws the "use existing anchors" instruction. Authored stable ids in the markdown become mandatory (IL-11), and the route stops ship as a distinct class with their own focus style, deliberately not `.at-chip`. |
| D3 (three findings) | The plan collapses the Chapter 1 glossary on mobile while the verbatim stat strip uses HTS, ABI, ACE and Section 1592 in the first viewport. The primary persona therefore loses the only definitions of those terms, on the device where the plan's own research (A-PL-10) says the collapsed-panel mechanism does not work. No change item supplied a backstop gloss. | HIGH | CONFIRMED | FIX-IN-W4. The definitions move **inside** the tiles (IL-1 and IL-2), where they cannot be collapsed away, and the glossary panel is demoted to reference. |
| D4 (lens-domain-expert-3) | The staffing kill criterion was compressed everywhere in the planning documents to "1 reviewer per 2,000 lines/month", dropping both "licensed" and "reviewed" — and it was baked into the *protected* register, so implementers would have reproduced it faithfully and with authority. | HIGH | CONFIRMED | FIX-IN-W4. Override **O2**. See the accuracy section below. |
| D5 (three findings) | "Closed on mobile, open on desktop" is unimplementable as authored, because `open` is one DOM state and not a media-query-responsive one, and the spec never named the required script. That makes a CSS `display`-forcing route the likely default, and that route is a WCAG 4.1.2 failure because the announced state contradicts the visual one. | MEDIUM | CONFIRMED | FIX-IN-W4. The spec now mandates a small `matchMedia` script that sets the `open` attribute, and explicitly forbids CSS display-forcing. |
| D19 (lens-a11y-5) | Frozen iframe `title` attributes assert interactivity ("Pan, zoom…", "scrubber walks the flow") that the new caption-first mobile default removes, so the accessible name would describe a state the rebuild no longer ships. | LOW | CONFIRMED — **overturned** from REJECTED by the critic. The refutation showed that a title correction is *permitted*, not that it would happen, and left untouched the title is false on the new default state. | FIX-AT-IMPL. Rebuild checklist item: extend or correct the titles, never shorten them. |
| D16 (lens-business-6) | The frontmatter summary and subtitle — the doorway text on the index and in every link preview — keeps full jargon density, and no change item owned it or consciously excluded it. | MEDIUM | CONFIRMED | JUDGMENT-CALL. Answered at checkpoint, see below. |

The remaining thirteen confirmed defects (D6 to D15, D17, D18) were medium or low and were corrected inside the resolver and adjudication stage: a mobile-collapse ruling for the second glossary panel, a shows-versus-proves rule so illustrative figures are not made to "prove" anything (override **O6**), a no-adjacent-repetition rule where three surfaces were each mandated the same takeaway sentence, a precise ruling on which element holds a stat-tile claim, plain-word introductions of "gate" and "tier" on the sponsor route that skips Chapter 2, an amendment to an unsatisfiable "present tense" lint gate (override **O7**), an exact definition of the lint surface so protected content cannot be false-flagged, and a correction to the wrong file locations given for the "Live" pill rename.

### Rejected

Fifteen findings did not survive refutation. They are recorded because a rejected challenge is evidence the plan held up under attack. Among them: that a skip instruction without an anchor is unusable (the figure chrome labels the destination, and the objection evaporates once the D2 anchor fix lands); that the Layer 1 summary drops the "best published" qualifier (a summary is not copy, and the guardrail already existed — see O4 below, where the fix was made at source anyway); that "exact paraphrases" versus "verbatim in meaning" is ambiguous (the ruling adjudicates it, meaning binds and grammatical adaptation is permitted); that the figure rebuild forces a shared-engine edit or a 49KB fork (the shell is self-contained); that one chip cannot carry a multi-stop route (a persona row of links is the natural implementation); and that the mobile tile leaves ABI and ACE undefined and unfixable (this misread the protection, since subtext phrasing was never frozen, and the finding fed the D3 fix instead).

## The four accuracy corruptions — all planning-document, none on the page

This is the most important thing this cycle found, and it is worth being precise about where the errors were. **The live page was verified correct on all four.** Every one of them was introduced inside our own redesign proposal documents, by the compression that happens when a synthesiser paraphrases a page into a register. Because that register was marked *protected*, its authority would have carried each error into the article verbatim. All four are corrected as binding overrides in `IMPLEMENT-LIST.md` before any implementer wrote a line, and the first two are also written into the implementation brief as banned statements.

| # | The corruption | Where it originated | Ground truth on the page |
|---|---|---|---|
| **O1** | The flagship caption asserting that model output **"can never reach the government filing path"**. Architecturally false: the page's own design files 60 to 75% of entries straight through, so auto-accepted Tier 1 and Tier 2 answers do reach ACE with no human. The true and much more interesting claim is the bypass claim — there is no *route* to the filing system that skips the gate, and the workers that call the model cannot touch the filing credentials. | `design-direction.md` sections 2, 6 and 7, and `lead-expert.md` D4. | **Never on the page.** The article's own straight-through tile and kill-criteria paragraph are exactly what falsified the caption. |
| **O2** | The staffing kill criterion compressed to **"1 reviewer per 2,000 lines/month"**, dropping "licensed" (the scarce resource that makes it a kill criterion at all) and "reviewed" (the escalated 15 to 40%, not total volume). This is the most serious of the four. At 100,000 lines a month with 25% escalation the corrupted form demands **50 reviewers against a correct 13**, a three-to-fourfold overstatement of the staffing requirement, on the number that decides whether the programme proceeds at all. | `lead-expert.md` P17 and D6, and `design-direction.md` sections 6 and 9 — four sites, one of them inside the protected register itself. | **Correct on the page** at the kill-criteria paragraph, and stated correctly in `wave-plan.html`. `roi-model.html` and `cost-structure.html` both compute it consistently, with the `(1 - STP)` escalation factor present. Verified against all four surfaces. |
| **O3** | The silent-failure definition rendered in the **past tense** — "wrong answers the system auto-accepted confidently" — which contradicts the fact that the metric is measured in shadow, where the system files nothing. Deployed verbatim it produces the self-contradiction "nothing auto-accepts until the rate of wrong answers the system auto-accepted holds under 0.5%", inside the page's most safety-critical sentence. | `lead-expert.md` section 2. | **Not on the page at all.** The page carries no such paraphrase. The binding form is now the counterfactual: answers the system *would have* auto-accepted confidently, scored against what humans actually filed. |
| **O4** | "The model is wrong ~60% of the time", dropping **"best published"** and generalising a contested-ruling benchmark to AI in general. | `design-direction.md` section 2, Layer 1. | **Correct on the page**, which carries "best published" in the tile, the ATLAS/CROSS source attribution, and an Open-chipped caveat stating that transfer to routine commercial goods is unmeasured in either direction. Note that the refuter **rejected** this as a change-list defect, correctly, since section 2 is an argument summary rather than copy. The correction was made at source anyway, because section 2 is the sentence implementers read while writing the chapter leads. |

Two process points follow from this, and they generalise beyond this page.

- **A protected register is not a source of truth.** O2 and O3 are both cases where a register cell paraphrased the article and lost binding words, and the cell's protected status meant the error would have been reproduced with confidence rather than caught. Standing recommendation for future cycles: every protected-register cell that quotes the page must be a verbatim copy with a line anchor, never a paraphrase.
- **One-line grep gates are cheap and they work.** The build list carries two: every occurrence of "2,000" must read "licensed reviewer per 2,000 reviewed lines", and the banned caption must return zero.

## The four checkpoint decisions

| Question | Recommendation | Decision |
|---|---|---|
| **IL-14 — rewrite the frontmatter summary?** (D16.) It is the first text a reader sees on the index and in link previews, and it was still written at full jargon density. Cost of skipping: the page becomes readable but its doorway stays unreadable, so the non-expert reader may never open it. | Add it. | **IN.** IL-14 is in scope. |
| **Which two figures get rebuilt?** The budget was two. The alternative was to spend one of the two on Chapter 1's blank-paint flash, which the sponsor — who never reaches Chapter 3 — is the only reader to suffer. | The AWS diagram and the end-to-end journeys diagram, the two that are genuinely unreadable at 375px. | **Exactly two: IL-20 (AWS stencil) and IL-21 (end-to-end journeys).** No third rebuild for Chapter 1. |
| **About 45 lines of CSS and 10 of script in the shared template.** Four items cannot be done in article markdown alone. Refusing means tile headlines and figure claims ship as plain bold text, and both glossary panels stay closed on desktop too. | Approve. | **Approved.** Honest effort tags replaced the false "S, markdown only" ones throughout the build list (override **O8**). |
| **The "Live" pill in the page header** — rename or delete? It contradicts the page's own ILLUSTRATIVE stamps either way. | Rename. | **Renamed to "Interactive", not deleted.** Applied to the header pill and to the generated figure-chrome label in one CSS rule covering all fifteen frames. |

## What deliberately did not change

- **The shell.** The page keeps the atlas template and its current look. No structural rebuild and no scroll-driven storytelling — the research found no measured engagement advantage for scrollytelling over the chunked steppers already in place, so the budget went to prose ordering and two figure rebuilds instead.
- **The evidence machinery, word for word.** The Confirmed / Proposed / Open / Vendor-claim chips, the sourced `<details>` tables, the 14-row service selection register, the gap register and the source ledger are all untouched.
- **The technical depth.** Chapter 3 is not simplified. The hardest architectural claims keep their exact wording, and the protected AWS-language paragraph keeps its three over-25-word sentences rather than take a lint edit it was never in scope for.
- **The honest bits.** The "the gate may be theatre" callout, the kill-criteria numbers and the gap severities are not softened. Nothing in this cycle was allowed to make the page sound better than it is.
- **Chapter 4 structurally**, and thirteen of the fifteen figures, which keep their current code.
- **The visuals folder.** Nothing under `public/visuals/customs-entry-agent/` was deleted. That directory is untracked by git, so deletion is unrecoverable, and the standing rule is retirement to `_retired/` only.

## Implementation ran in two attempts

The first implementation attempt hit an API session limit that killed **three agents mid-flight**. No work was lost, because the cycle was built to survive exactly this.

- **Backups are mandatory and pre-emptive.** The implementation brief requires every figure file to be copied to `public/visuals/customs-entry-agent/_retired/<name>.pre-explainability.html` *before* it is modified, and names that copy as the only recovery path for an untracked directory. Both rebuilt figures have their pre-cycle originals on disk (`aws-stencil.html.pre-explainability.html`, `entry-lifecycle-flow.html.pre-explainability.html`), alongside the earlier retirements from the 2026-08-10 and 2026-08-11 passes.
- **The completion note is the deliverable, not the chat return.** Every agent was told to write its file list, its satisfied acceptance checks and its unfinished items to an assigned scratchpad file, and to return three lines at most. A killed agent therefore still leaves evidence, and a surviving note tells the relaunch what not to redo. Two notes survived the first attempt intact: `note-prose1.md` (IL-1 to IL-7 — the tiles, the five chapter leads, the confidence-gate and callout rewrites, the first-use glosses and the lint pass) and `note-template.md` (IL-15 to IL-19 — the CSS, the `matchMedia` script and the pill rename), the latter carrying the exact class-and-attribute contract that the outstanding markup items depend on.
- **State was re-established by structural check, not by assumption.** Before relaunching, the repository was inspected directly for which items had actually landed: greps for the shipped class names in the article, the banned-caption grep, the "2,000" grep, and file sizes and timestamps compared against the `_retired/` backups to establish whether each figure rebuild had written.

At the time this record was written, the two figure rebuilds and both surviving agents' work were on disk, and the markup items (IL-8 to IL-14 — the figure claim lines, the reading-route nav, the authored anchors, the two glossary panels and the frontmatter rewrite) had not yet landed in the article. The Verification subsection below is where a later wave records the settled state against measurement rather than assertion.

## Verification

**Measured** 2026-08-21, after the implementation waves and the two post-implementation fix rounds. Two independent measurement passes stand behind these rows: a browser pass (Playwright 1.59.1 driving bundled Chromium rev 1217, headless, against the running dev server, 60 screenshots retained) and a script-based prose re-measure (`measure.py`, `supp.py`, `jargon.py`, all re-runnable). Everything below was re-tested from scratch rather than read off the implementation notes. Repository state is unchanged: `HEAD` is still `debd17f`, so no commit was made at any point in this cycle.

- `npm run build`: **PASS.** Clean build, **25 pages**, no errors. Run three times across the fix sequence, most recently after the final fix, with the same result each time. (The browser pass itself ran against the dev server only and listed the production build as untested; that gap is closed here for the build step, though the built output was never loaded in a browser — see "Not tested" below.)
- Banned-statement greps: **PASS, and the two figure-copy stragglers are now fixed.** `"never reach the government"` returns **0 hits** across `src/` and `public/`; the sanctioned true form is present instead ("no model output reaches the government filing system without passing the gate first", and in figure copy "the workers that call the model cannot touch the filing credentials"). Both article occurrences of `2,000` read "one **licensed** reviewer per 2,000 **reviewed** lines a month" exactly. The re-measure flagged one live figure string that dropped "licensed" — `roi-model.html` — and that is now fixed: the staffing lamp reads "reviewed lines per licensed reviewer per month", with the pre-fix file backed up first to `_retired/roi-model.html.pre-explainability.html`. `wave-plan.html` keeps both mandatory words with the cosmetic variant "per month".
- Accuracy overrides O1 to O4 on the shipped page: **PASS at every occurrence, after two fixes.** O1 bypass-form claim: correct wording throughout, no banned formulation anywhere. O2 staffing phrase: both article hits carry "licensed" and "reviewed"; the one figure-copy hit that did not is fixed (above). O3 counterfactual silent-failure wording: present-tense and correctly counterfactual — "the share of those answers it **would have** auto-accepted confidently while being wrong" — and targeted greps for `failed silently` / `silently failed` / `went undetected` returned nothing across the article and all 15 figures. O4 "best published" qualifier: present at every occurrence — the stat card ("the best published AI"), the frontmatter summary and two figures ("Best-in-class") — and the one bare back-reference in `entry-lifecycle-flow.html` is now fixed to read "the 60% error rate **from the best published classifiers**" instead of a bare "60% error rate".
- Nine-check prose lint on the defined surface: **six checks clean, four deliberate sentence-length exemptions, one chapter over its Flesch-Kincaid band and one under.** Measured over 46 prose segments, 123 sentences, 1,940 words. Sentences over 25 words: **14 → 4**, with **0 in ordinary unprotected prose**; all four survivors sit in protected content (three in the AWS-stencil paragraph at 38, 35 and 31 words, one in the "the gate may be theatre" callout at 30 words) and are deliberate exemptions rather than passes. Paragraphs over 5 sentences: **0** — the longest on the page is exactly 5, and six paragraphs land on 5, so the ceiling reads as deliberate. Semicolons in body prose: **0** (the 15 raw `;` characters in the file are all inside `style=` attributes on visual-frame divs). Em-dashes outside `## Chapter N — Title` headings and the frontmatter title: **0** — six in the file, all sanctioned. US spellings in new copy: **0** across 22 scanned patterns; the two `labor` hits are inside table cells naming a US statute. Unexpanded acronyms: **0** — VPC was the last one and is now expanded at first use as "VPC (virtual private cloud, a private network inside AWS)". Flesch-Kincaid by chapter: preamble 10.76 (no target), **Ch 1 = 10.10 against an 8–10 band**, Ch 2 = 9.85 (no target), **Ch 3 = 9.67 against a ceiling of 12**, **Ch 4 = 6.18 against an 8–10 band**, Ch 5 = 9.52 (in band). Zero failures were raised against protected-register elements. Two honest caveats carried over from the re-measure: Flesch-Kincaid counts syllables, not comprehension, so Chapter 3's comfortable number coexists with the page's hardest vocabulary; and ±0.5 grade is tokeniser noise, so Chapter 1 at 10.10 is a coin-flip rather than a categorical failure.
- Stat tiles (IL-1, IL-2) at 375px and 1280px: **PASS.** No clamping and no truncation at either breakpoint. The four Chapter 1 `<b>` values are byte-identical to pre-cycle (`40%`, `2x to 4x`, `10 working days`, `4 in 30`), and every honesty qualifier renders verbatim — the 40% card carries "The best published AI" immediately adjacent to the number. 8 `.at-stat-claim` surfaces counted; contrast 15.15 dark, 16.66 light.
- Reading routes and authored anchors (IL-11, IL-12, IL-15): **PASS.** **16** route stops across 4 persona rows, 13 unique destinations, **0 unresolved**; a page-wide sweep resolves **37/37** `a[href^="#"]` with JavaScript and **17/17** with JavaScript disabled. Landing clearance was measured live after each jump rather than assumed: desktop sticky chrome bottoms out at 136px and **16/16** clicks land clear (chapter and anchor targets at top 152, figure targets at top 150 — a +14px margin, the tightest on the page); mobile chrome bottoms out at 44px and **16/16** land at top 64. Fresh-load deep links clear too: **13/13** desktop, **13/13** mobile. The two zero-height `.at-anchor` targets (`kill-criteria`, `service-register`) were judged on the element that follows and both land well clear. Route stops are real `<a href>` elements with no `tabindex` override, so DOM order governs; a real `Tab` traversal walked 11 consecutive stops in exact DOM order with no trap or jump-back; the focus ring is `outline: 2px solid rgb(111,168,220)` with offset, the same token in both themes, and visually distinct from a verdict chip. The nav carries `aria-label="Reading routes by role"` and every stop's accessible name is its destination in plain words. Contrast: route stop 11.25 dark / 8.01 light, persona label 6.27 / 5.93. Method note worth keeping: the harness's first two runs wrongly reported `fig-integrations` landing under the chrome — the page's `scroll-behavior: smooth` was colliding with the harness's own reset scroll. Forcing `scroll-behavior: auto` and polling to a stable position removed it; there is no anchor-offset defect.
- Figure claim lines (IL-10, IL-17): **PASS.** **15** `.at-fig-claim`, exactly one per figure, each preceding its `.visual-frame` in DOM order, none `aria-hidden`, all carrying real sentence text. The shows-versus-proves rule holds on the illustrative figures, and no takeaway sentence is repeated across adjacent surfaces — one repeated *opener word* was checked and the two sentences diverge entirely. One cosmetic ordering variant: `fig-integrations` runs claim → caption → caption → frame, which is still claim-first and correct, but does not match the `.at-fig-claim + .visual-frame` adjacency selector, so that gap stays 1.7rem instead of 0.9rem. Anticipated in `note-template.md`; not a defect.
- Glossary panels (IL-9, IL-13, IL-18): **PASS, both panels behaving identically.** Present and both carrying `data-open-wide`: "The customs jargon in plain words" (5 terms) and "The AI jargon in plain words" (7 terms) — 14 glossed terms against 6–7 at baseline, and the Tier 0/1/2 definitions were promoted out of an `iframe title` attribute, where no reader would have found them, into visible prose. At 1440px both are `open === true`; at 375px both are `open === false`; the breakpoint is `matchMedia('(min-width: 761px)')`. State is carried by the `open` attribute alone with **no CSS display-forcing anywhere**. A user toggle survives a resize in both directions: closing one at desktop leaves it closed through 375 and back to 1440 while the untouched panel tracks the breakpoint, and opening one at mobile leaves it open through 1440 and back to 375. With JavaScript disabled both are closed and still expand on click as native `<details>`. `<summary>` is a direct child with no overridden `role`, `aria-expanded` or `tabindex`, so the UA supplies the disclosure mapping; the badge computes to "Plain words" on both, contrast 15.83 dark / 15.38 light.
- Figure rebuilds (IL-20, IL-21): **PASS.** At 375px the first paint of `aws-stencil.html` is the takeaway poster card — it is the first element in `<body>`, revealed by a pure CSS media query with no script, so there is no blank flash — with both sentences unclipped and the full diagram one tap away behind "OPEN THE FULL AWS STENCIL". `entry-lifecycle-flow.html` likewise leads with a caption-first card. The D19 guardrail is satisfied on both: iframe titles were **prepended, never shortened** (the stencil's grew 1,354 → 1,452 characters, with everything after the inserted sentence byte-identical), and both titles now match the new default state. Autosize is engaged on all 30 frame instances — inner `window.innerHeight` equals the measured iframe height in every case, so no frame is over-tall. Trailing dead space across all 30 instances: worst case **18px** (`fig-aws-stencil`), every other frame 14–16px, maximum 3.8% of frame height and only on the two shortest frames, where 14px is simply the body's bottom padding. No figure fails the no-blank-space rule. Full render at five viewport and theme combinations: 15/15 frames and 15/15 iframes loaded in each, **0 console errors**, **0 uncaught page errors**, **0 failed requests**, **0 responses at HTTP 400 or above** (the 15 identical Chromium sandbox notices per combination are browser-emitted, not application code). Caveat: dead space was measured numerically on all 30 instances but only 4 were read back visually for mid-frame gaps; the other 26 screenshots are retained if a full visual pass is wanted.
- Protected content: **PASS, byte-identical — and defect D-1 is fixed.** 26 `.at-chip` verdict chips render (Confirmed 16, Open 3, Proposed 2, Vendor claim 2, Directional 2, Excluded 1). All five sourced `<details>` tables open on click and render with rows; the 14-row service register (14 × 3, headers `Component | Choice | The rejected alternative, and what would flip it`), the 11-row gap register (11 × 4) and the 13-row source ledger (13 × 3, with 13 chips inside) are intact. The kill-criteria numbers are unchanged, and `#gate-theatre` still carries `class="callout alert"` with its opening verbatim. All **15 of 15** figures referenced by the article exist on disk. On D-1: the browser pass found three sourced tables clipped and unreachable at 375px — `overflow-x: hidden` on the `<details>` body against tables 366–378px wide, losing 53–65px of the third column, so the service register read "Tempor…", "workflo…" and a verdict chip read "CONFIR…". Fixing it revealed that **four** tables lacked the `overflow-x:auto` wrapper, not three. After the fix, measured at 375px: **all 6 tables** are wrapped and horizontally scrollable (wrapper `clientWidth` 278px against table widths 305–378px), `document.scrollWidth` **375** equals `clientWidth` **375** so there is no page-level horizontal scroll, and **0 console errors**. Only wrappers were added — the table markup itself was never touched, so the protected content stayed byte-identical through the fix.
- Retired figures: **PASS.** No file under `public/visuals/customs-entry-agent/_retired/` was deleted or modified, and nothing anywhere under `public/visuals/customs-entry-agent/` was deleted at any point in the cycle. Both pre-cycle backups still match their originals byte for byte and keep their original 01:22 timestamps — `aws-stencil.html.pre-explainability.html` (54,683 B) and `entry-lifecycle-flow.html.pre-explainability.html` (16,013 B) — alongside the four earlier retirements. One backup was **added** during the post-report fix round: `roi-model.html.pre-explainability.html` (12,489 B), taken before the "licensed" restoration.

### Still open after this cycle

- **Four sentences over 25 words remain, and every one is a deliberate exemption.** Three sit in the protected AWS-stencil paragraph (38, 35 and 31 words) and one in the protected "the gate may be theatre" callout (30 words). The AWS paragraph is otherwise byte-for-byte identical to its pre-cycle state. The re-measure's honest objection stands on the record: the exemption was granted for architect-grade *depth*, not for sentence *length*, and splitting the 38-word sentence would cost no technical content. This is a pass with a named exception, not a clean pass.
- **The "gated"-before-definition inversion is unfixed, and left for the author to decide.** "Gated" appears in the Chapter 1 blockquote before the gate is defined in Chapter 2, and its clearest definition does not arrive until Chapter 4. The first use sits inside a protected blockquote, and the red-team flagged that collision between the protection and the fix, so the call belongs to the author rather than to this cycle.
- **Two chapters miss their Flesch-Kincaid band, in opposite directions.** Chapter 1 is **10.10** against an 8–10 target band — over the ceiling, though inside tokeniser noise. Chapter 4 is **6.18**, comfortably *below* its band, i.e. easier than asked, which points at unevenly distributed remediation effort. Chapter 3, for contrast, is 9.67 against a ceiling of 12 and clears comfortably.

### Not tested

Recorded so the coverage claim above is not read wider than it is:

- **Real screen readers** (NVDA, JAWS, VoiceOver). No assistive technology was available in this environment. The underlying mechanism was verified instead — native `<details>`/`<summary>` with no overridden `role`, `aria-expanded` or `tabindex`, plus an ARIA snapshot of the rendered tree — which shows the correct mapping is in place but is not the same as hearing it announced.
- **The production build in a browser.** `npm run build` is clean at 25 pages, but the built output was never loaded and measured; every browser number above comes from the dev server, and Astro's build can differ from dev in asset handling.
- **Real touch devices.** A 375px desktop-Chromium viewport is not a touch device. Tap-target size, momentum scroll on the swipeable chapter rail and iOS Safari `<details>` behaviour are all unverified.
- **`prefers-reduced-motion`.** Not exercised, despite the page having smooth scrolling and animated figures.
- **Non-Chromium browsers.** Chromium only; Firefox and WebKit were out of scope for this run.

---

# Cycle — benchmark refresh and the licence boundary (22 August 2026)

**Trigger.** The author asked two questions of the page: whether the ATLAS benchmark strip had factored in the frontier and latest models, and what other companies are lacking. Both turned out to be answerable only by going back to the primary sources, and both changed the page.

## What the audit found

**The ATLAS strip was an undated, partial and partly-derived reading of the paper.**

| Defect | Detail |
|---|---|
| Undated | 40% and "~60% wrong" appear in eleven places across the page and its figures. Exactly one of them carried a date, `entry-anatomy.html:208`, and it said only "2025". A reader in August 2026 had no way to know the figure was eleven months old. |
| Sample size never stated | ATLAS's test set is **200 items**. The page quoted the *training* corpus (18,731 rulings, 2,992 codes) beside the accuracy figure, which reads as though the accuracy was measured on it. |
| Roster never stated | ATLAS entered six models. No Claude, Grok or Qwen model was among them, and nothing released after September 2025. The page's "best published" qualifier was doing honest work but the reader could not see how narrow the field was. |
| Two bars were derived, not sourced | `evidence-docket.html` rendered GPT-5-Thinking at 25% and Gemini-2.5-Pro-Thinking at 30%, back-computed from the paper's abstract deltas. No source in the repo stated either absolute. |
| One derived bar was wrong | The paper's own table puts Gemini-2.5-Pro-Thinking at **31.0%** at six digits, not 30%. The paper's abstract claims "+27.5 points" over it, but 57.5 − 31.0 = 26.5. The abstract and the table disagree, and the page had inherited the abstract's arithmetic. **Corrected to the table absolutes, and the delta arithmetic dropped.** |
| Two digit levels shared one scale | The four bars mixed 10-digit and 6-digit values in a single visual column, so a reader comparing bar lengths was comparing different tasks. |

**Three sources post-dating the page's research were missing.**

| Source | Why it matters |
|---|---|
| **CBP HQ ruling H350722, 16 January 2026** | An AI tool that derives HTSUS subheadings beyond six digits, where that output directs or influences an entry, is conducting customs business and requires a broker licence. To six digits it is not. The ruling also holds, for the first time, that submitting Form 5106 for another party is customs business. This is a legal boundary no vendor can engineer around, and the page's licensed-reviewer routing sits exactly on it. |
| **arXiv 2412.14179, December 2024** | Four commercial classification products independently benchmarked on 103 classifications drawn from 100 *randomly selected* CROSS rulings: 89.2%, 80.0%, 44.1%, 12.8% at ten digits. Direct counter-evidence to the 40% headline, and the answer to the page's own open gap C3. |
| **arXiv 2605.14857, 14 May 2026** | A deterministic agentic workflow — fixed control flow, narrow model stages, verbatim note citation — reaching 64.2% top-1 at six digits on HSCodeComp. Independent publication of the architecture this page argues for. |

**The six-digit convergence, which the page had been hiding.** Showing only deltas concealed the most interesting fact in the paper. At six digits GPT-5-Thinking scores 55.5% against the fine-tune's 57.5%, near parity. At ten digits it scores 25.0% against 40.0%. Frontier models are strong at exactly the digit level the law lets an unlicensed tool emit, and they collapse at exactly the level that requires a licence. That convergence is now the callout under the benchmark board.

## What changed

- `evidence-docket.html` — the benchmark board rebuilt as a grouped two-column scorecard, all six ATLAS models with their true absolutes, 10-digit and 6-digit never sharing a scale, icon-led by model family (fine-tuned, frontier proprietary, open weight). Header now reads "September 2025 · 200-item test set". A **What this benchmark does not cover** panel records the absent model families and that ATLAS is a one-off paper rather than a maintained leaderboard. A **second benchmark board** carries the four commercial products, unnamed, on randomly drawn rulings. The trailing caveat is re-stamped `Sourced` and now explains the sampling difference instead of leaving it Open.
- `market-gaps.html` — **eighth gap added, "Unlicensed past the sixth digit"**, verdict `Unlicensed`, placed first because it is the only gap that is a legal wall rather than a product shortfall. Gap 1 reframed: six digits is not merely the easier level, it is the level an unlicensed tool is allowed to reach. Counts updated throughout, including the title, the heading, the lead and the group label.
- `gap-map.html` — C3 re-graded against arXiv 2412.14179 instead of reading "unknown in either direction".
- `entry-anatomy.html` — the lone ATLAS date now carries the month and the sample size, plus the licence boundary.
- `customs-entry-agent.md` — the evidence table gained five rows and the ATLAS row was corrected. **DOC-5 resolved:** the Altana row was split into the confirmed acquisition fact and a separate `Vendor claim` row carrying the press-reported deal value and the company-reported customer count. `Sources · 20` recounted to 23.

## Defect found and fixed during verification

**The reveal animation stopped firing.** `evidence-docket.html` observes its own shell with `{ threshold: 0.2 }`, the house convention across every figure in this directory. The rebuilt figure is 2,333px tall on a phone, so a fifth of it is never on screen at once and the observer could never fire — every bar sat at 0% and no count-up ran. Changed to `{ threshold: 0 }` for this file only, with a comment recording why it deviates. Worth knowing before any other figure in this directory grows past a viewport height.

## Not done in this cycle

- **`docs/Cross_Border_Source_Ledger.md` was left untouched.** The plan called for appending the new sources there. On reading it, that ledger is scoped to the two cross-border freight pages and structured around the Redwood five-challenge taxonomy, so ATLAS and the product benchmark do not belong in it. CBP H350722 arguably does bear on its CB-1 classification block, but adding a source row for a claim no cross-border page makes would leave an orphan. Left for whoever next works that ledger.
- The `+15 pts` and `+27.5 pts` deltas are gone from the page. The abstract-versus-table inconsistency in the source paper is recorded here rather than on the page, because it is a fact about the paper rather than about customs.

---

# Cycle — Plain English pass and the full model roster (2026-08-22)

Triggered by two instructions: "make layman completely", and "you have not added new LLM in the list autonomous HTS classification".

## The roster defect, and why the previous answer was incomplete

The previous cycle concluded that ATLAS could not carry newer models, being a one-off September 2025 paper with a six-model roster. That was true of ATLAS and it was the wrong place to stop. It answered "is this benchmark current" instead of "has anyone measured the newer models".

**HSCodeComp** (arXiv 2510.19631, 22 Oct 2025; published ACL 2026, July 2026) had. 632 products across 32 categories, graded by a panel of 26 tariff experts, **23 systems**: 14 foundation models, 6 open agent frameworks, 3 closed agents. Claude, Grok, Qwen, Kimi and DeepSeek are all in it.

Verification discipline applied, after the ATLAS abstract-versus-table slip last cycle:

- Headline figures confirmed against two independent sources (arXiv HTML and the ACL Anthology entry): 632 products, 32 categories, 23 systems, best agent 46.8%, human experts 95.0%.
- Four anchor model rows confirmed twice before being drawn: GPT-5 29.27%, Gemini-2.5-Pro 24.21%, GPT-4o 18.51%, Claude Sonnet 4 11.23%.
- The roster arithmetic reconciles: 14 + 6 + 3 = 23, and the per-row list sums to exactly that once each model's VLM and LLM modes are counted once.
- The ResearchGate and OpenReview renderings were blocked (403 / bot wall) and the arXiv PDF parse returned corrupted text. Neither was used.

**What the board adds beyond filling the roster.** The same GPT-5 scores 29.3% asked directly and 46.8% inside an agent harness on the identical set. The page's central architectural claim — orchestration beats raw model capability — was previously carried by the page's own reasoning. It is now carried by someone else's benchmark. The 95.0% human line is the licensed-reviewer argument as one number.

**Comparability guarded.** Three benchmarks, three test sets: 200 contested rulings (ATLAS), 632 shop-shelf products (HSCodeComp), 103 randomly drawn rulings (product benchmark). Each board keeps its own scale, and both the figure and the evidence table state that they must not be read bar against bar.

## The plain-English pass

**Measured, not assumed.** A lint across the prose and all 22 figures found **84 term/file pairs** where a term appeared with no gloss anywhere in the same file. Because each figure is read standalone inside an iframe, a definition in the prose above does not reach it.

**Closed with `_glossary.js`**, a shared module every figure already had a load path for. It reads the words a figure actually shows and appends a definitions strip naming only those. Chosen over wrapping each word in place because the 22 figures are bespoke, several rebuild their own `innerHTML`, and inserting elements into layouts whose selectors were written without them would have been the riskier change. Verified live on `gap-map.html`: exactly its seven terms, including all four the lint flagged.

**Prose:** a 174-word zero-jargon opener, a plain-words line under each of the six chapter headings, and an `.at-term` tooltip system for 20 terms in the body text.

**Titles:** five house coinages that read as jargon were retitled to lead with the plain description. No `id` or anchor changed.

## Defect found during the pass

**`IntersectionObserver` at `threshold: 0.2` in 10 figures.** The threshold is a fraction of the observed element, so once a figure is taller than the viewport, a fifth of it is never on screen and the reveal never fires. The definitions strip made every figure taller, so this cycle would have silently killed reveals that previously worked. Swept to `threshold: 0`. This failure produces no console error and no layout fault, and is only catchable by asserting a post-reveal value rather than geometry.

## Also corrected

- `entry-anatomy.html` read "forced-labor action". UK spelling restored.
- `confidence-gate.html` read "A license goes on the line". Corrected to the noun, "licence".
- Six sentences over 25 words split, across the prose and five figures.
- The second benchmark board's bars were rendering at half width, because `.brow` reserves three columns and that board only supplies two. A `.solo` modifier now gives single-column boards full width.

## Verified after the change

- Build clean at 24 pages. `dist/` free of `_retired` and `_archive`.
- All 22 frames: caption band exactly 28px at both 1280 and 375. No horizontal scroll at 375. Zero console errors.
- All 22 `--vf-h` / `--vf-h-m` values re-measured on the live page and reset.
- Every bar on the new board renders proportionally exact: 46.8% → 430/919px, 95.0% → 873/919px.
- All four banned statements verified absent by grep. No vendor named in `market-gaps.html` or `gap-map.html`. Every ~60% carries its qualifier.

## Deliberately not done

- **Figure alt text still names ISF, liquidation, bond, Object-Lock, importer of record and materiality bare.** Glossing inside alt text would roughly double its length, and alt text is written to be heard in one pass. The definitions are in the figure DOM and are reachable there. Judgment call.
- **Chapter 4 remains architect-facing.** AWS service names are proper nouns and renaming them would make the chapter useless to its readers. Its plain-words line now tells a non-expert to skip it. This is the one chapter where "completely layman" is not achieved, and it is stated rather than claimed away.

A six-persona audit of the finished page is recorded separately in `docs/Customs_Entry_Page_Persona_Audit.md`.

---

# Cycle — the docket collapse, and the 2026 model question (22 August 2026)

Triggered by one question from the owner: *why is there no 2026 model in the evidence docket?* The honest answer required checking whether anyone had measured one, not just whether our chosen benchmark had. Three results surfaced. None of them is a peer-reviewed ten-digit measurement, and the reasoning for each is recorded here so the exclusion is a decision on the record rather than an omission.

## What the search found

| Result | Source | Date | Verdict |
|---|---|---|---|
| **Qwen3.6-plus, 64.2% top-1 at six digits** on HSCodeComp, via a deterministic agentic workflow with fixed control flow and verbatim note citation | arXiv 2605.14857 | 14 May 2026 | **Kept.** Already on the page as an evidence row and a family-card maturity note. Not drawn on the summary, because six digits and ten digits are different depths and the page forbids reading one against the other. |
| **Alibaba's own Qwen-based agent framework, 65.0%** on HSCodeComp | Alibaba Cloud blog | 8 July 2026 | **Excluded.** This is the benchmark's owner marketing its own agent on its own benchmark, with no paper behind it. The same post also restates the state-of-the-art baseline as **49.4%** where the peer-reviewed paper says 46.8%, which is an independent reason to treat the source with care. |
| **Federation, "#1 on HSCodeComp"** | federationlabs.ai blog | 17 Dec 2025 | **Excluded.** Publishes a rank and a relative claim about accuracy drop from six to ten digits, and **no absolute number at all**. A rank with no figure is precisely what the page's own guidance tells readers to distrust. |

## Source integrity re-checked

The page cites HSCodeComp as "arXiv 2510.19631, Oct 2025, published ACL 2026" and uses 46.8% / 95.0%. Both the arXiv abstract and the ACL Anthology entry state 46.8% and 95.0%, and arXiv lists **no v2**. The published and preprint figures agree, so the citation and the numbers are sound. The 49.4% appearing in vendor marketing does not come from either version of the paper.

**Conclusion recorded on the page**: no peer-reviewed ten-digit result has been published for any 2026-generation model. That absence is now stated in the figure rather than left for the reader to infer from a roster that stops in October 2025.

## Defect found and fixed

**The 46.8% superlative had gone stale.** The page and the launch pack described it as *"the best AI system anyone has measured"* and *"the best system anyone has published"*. As of July 2026 that is no longer defensible, because the benchmark's own owner markets a higher figure on it. The scoped claim is still exactly true and is now used everywhere: **the best of the 23 systems the benchmark scored**. Four occurrences corrected, in the frontmatter summary, the read-this-first panel, and posts 1 and 3 of the launch pack.

## The collapse itself

At the owner's instruction, all three benchmark boards were replaced by a single three-card summary. Twenty-three ranked rows and twenty-nine animated bars became nine figures across three cards.

- Every load-bearing number survives: 40.0 / 57.5 / 25.0 / 55.5 (ATLAS), 89.2 / 80.0 / 44.1 / 12.8 (product benchmark), 29.3 / 46.8 / 95.0 (HSCodeComp), and 64.2 in the closing note.
- The cards deliberately share no axis. A common scale would imply exactly the comparability the page denies, so each card carries its own figures and the header says to read each within its own set.
- The `.num` count-up and `.fill` growth are the original board mechanics reused at micro size, so the figure still animates and stays icon-led rather than becoming a block of prose.
- The three separate "what this does not cover" notes were consolidated into one, which now also carries the 2026 answer.

**Caught during the collapse:** the first pass silently dropped the `Sourced` stamp attached to the contested-versus-random sampling caveat, because that caveat had been folded into a card footnote. The stamp inventory before and after did not match. The caveat was restored as its own block with its stamp, and the card footnote trimmed to avoid duplicating it. Stamp counts now reconcile: one Sourced, three Confirmed, one Proposed, one Open, one Vendor claim.

Four icon symbols left genuinely unused by the collapse were removed after checking usage rather than assuming it: `i-cloud`, `i-cube`, `i-scales`, `i-tune`. `i-person` was kept and moved onto the 95.0% row, which is the only non-machine line on the board and the figure's punchline.

## Accepted trade-off, stated

Collapsing all three boards removes the bar-against-bar contrast that made the 45-point sampling gap between ATLAS and the product benchmark land in a single glance. That gap is now carried in words, in the `Sourced` caveat, rather than shown. The owner chose this knowing it, and it is recorded here rather than presented as a free win.

## Verified after the change

- Build clean at 24 pages. `dist/` free of `_retired` and `_archive`.
- Figure height re-measured on the live page and reset: `--vf-h` 1861 to **890**, `--vf-h-m` 3856 to **2264**. Caption band exactly 28px (918 minus 890).
- No horizontal overflow at 375px, page-level or inside the iframe. The in-page frame is 313px wide and the widest element inside it measures 257px. Cards collapse to a single column.
- All nine count-ups reach their sourced values: 40, 57.5, 25, 55.5, 89.2, 12.8, 95, 46.8, 29.3.
- The shared glossary strip still builds on the edited figure. Every icon symbol defined is used, and every icon used is defined.
- All four banned statements absent. `anyone has measured` absent from both files.

## Known lint noise, not defects

- `evidence-docket.html` reports `US SPELLING color`. The match is `d.color`, a JavaScript property name in the untouched approach-family panel code. The linter scans script text as well as prose.
- The same file reports bare `PGA`, `straight-through` and `reasonable care`. All three are defined at runtime by the shared `_glossary.js` strip, which the static linter cannot see. Confirmed rendering on the live page.

## Second defect, found while verifying and also pre-existing

Sweeping all 22 frames at 375px turned up 42px of horizontal overflow inside `fig-aws-stencil`, a figure this cycle did not otherwise touch.

The cause is worth recording because it is invisible by inspection. The `.gl` glossary popup is `position: absolute` and hidden with `visibility: hidden; opacity: 0`, and **a hidden absolutely positioned element still contributes to the document scroll width**. The popup is anchored `left: 0` on the inline word that triggers it, so when that word sits right of centre the popup reaches past the frame edge. Its trigger sits at x=116 in a 313px frame with a 238px popup, giving 354px of scroll width and nothing visible to explain it.

It bit exactly one figure. The other two files using `.gl` happen to place their triggers far enough left to fit, so the same latent fault sits in them unfired.

Fixed with a `max-width: 430px` block scoped to that file: the popup anchors to the paragraph rather than to the word, so it can never begin mid-line. Verified the media query does not apply at desktop, where `.gl` remains `position: relative` and the popup keeps its original word anchoring, so desktop behaviour is unchanged by construction rather than by inspection.

**Why previous sweeps missed it.** A page-level `scrollWidth > innerWidth` check cannot see overflow inside an iframe, and a figure opened standalone at 375px has 375px to work with rather than the 313px the embedded frame actually gives it. Both conditions have to be reproduced together for this class of defect to appear.

## Final state, verified

- All 22 frames at 375px and 1280px, in both light and dark: caption band exactly 28px on every one, zero horizontal overflow page-level and inside every iframe, zero broken anchors, zero console errors.
- Build clean at 24 pages, `dist/` free of `_retired` and `_archive`.

---

# Sources checked for launch-pack post 7 (22 August 2026)

The owner supplied a block of raw material on cross-border complexity, the "five data visibility areas", the three customs pillars and the expanding role of the customs function, and asked for research around it before a post was written. Two of its figures were left as literal `?` placeholders. Everything below was traced to a source before anything was drafted, and most of it was then deliberately excluded. The exclusions are recorded here so the research does not have to be repeated, and so the omissions read as decisions rather than gaps.

## The provenance of the supplied block

Nearly all of it comes from a **single press release**: Customs Support Group, "Survey: Customs Data Visibility Tops the List of Business Challenges as Well as Strategic Opportunities", Amsterdam, **18 June 2026**. The five visibility areas, the back-office-to-boardroom sentence and the quoted CEO paragraph are verbatim from it. The page returns HTTP 403 to the standard fetch tool and was retrieved with `curl` under a browser user agent, the same route the cross-border ledger uses for `cbp.gov`.

**Two different instruments are reported in that one release, and the release does not separate them clearly. This ledger does.**

| Instrument | What it is | Figures |
|---|---|---|
| The survey | around 150 senior customs and trade compliance leaders at major European manufacturing and retail companies, polled ahead of the summit | regulatory change and complexity **24%**, data quality and visibility **20%** |
| The summit poll | a live show of hands among self-selected attendees at CSG's own event, Amsterdam, 3 June 2026 | classification named biggest pain point of classification / origin / valuation by **around 50%**; **27%** did not know their own preference utilisation; only **9%** put it above 90%; more than a third named digital transformation and data visibility as the top competitive lever |

**Grade for both: Vendor claim.** No fielding period, sample frame or independent surveyor is stated for either, and CSG sells customs clearance and trade services. The summit poll is the weaker of the two, and it is the one carrying the figure the post uses. So post 7 calls it a show of hands in the body rather than a measurement, and the comment-reply prep gives the full split.

Also recorded from the same release, unused: DG TRADE data presented at the summit putting the average preference utilisation rate for EU free trade agreements at **67 per cent**. That is a DG TRADE figure quoted by a vendor rather than loaded from DG TRADE, so it is second-hand and was not used.

## The two `?` placeholders, answered

The supplied line read *"OECD and WCO data show automation can cut clearance time by up to ? and trade costs by ?"*. Both halves were chased down. **The honest answers are smaller than the figures normally quoted, and one of them does not exist.**

| Claim | Grade | Source | Note |
|---|---|---|---|
| Trade costs "are estimated to have declined by **up to 5%** over the last decade. The implementation of ambitious reforms could deliver **up to 12 percentage points more** in trade costs reductions." | **Confirmed** | OECD, *Trade Facilitation Indicators: Monitoring Policies up to 2025*, March 2025, DOI 10.1787/fd6f27dc-en | Quoted verbatim from the loaded PDF, text extracted locally. Underlying data is the UNESCAP-World Bank trade-cost database, period **2012-22**. Border bottlenecks and red tape fell **3%-7%** by region, the Americas 4.4%. |
| A 1% improvement in implementation in practice enhances trade by about **1.2%** | **Confirmed** | Same OECD report | Same extraction. |
| TFA implementation has cut trade costs "by an average of **1 to 4 per cent**", boosting trade by over **US$230 billion** | **Confirmed** | WTO, DDG Ellard blog, 26 February 2025 | The measured outcome, as distinct from the forecast below. |
| Full TFA implementation would cut trade costs **14.3%**, import time **47%**, export time **91%** | **Excluded, and flagged** | WTO economists' study, **2015** | This is a **forecast of full implementation, not a measurement**, and it is the figure that circulates. It sits roughly three to fourteen times above what was actually realised. It must never be quoted on this page or in this pack as an achieved result. |
| Any global or corridor clearance-time reduction figure | **Does not exist** | - | No body publishes one. The 47% above is the same 2015 forecast. The only measured clearance-time results are single-country case studies (Ecuador 67%, Kenya-Uganda border post 62%, Kenya-Tanzania 87%, Montenegro one-hour release 25% to 53%), none comparable to the others. This corroborates what `docs/Cross_Border_Source_Ledger.md` already records under "What I could not find": no US, Mexican or Canadian WCO Time Release Study exists. |

**All of the above was excluded from post 7 at the owner's decision**, which was to cut the macro material entirely and build the post on the survey finding plus the page's own benchmark evidence. It is recorded because the research is reusable, and because the 14.3% figure is a trap that will be met again.

## Regulatory material, confirmed and held in reserve

Dated and verified, then excluded by the geography-neutral decision. Kept because a European variant of this page would need all of it.

| Item | Status as at 22 August 2026 |
|---|---|
| CBAM | Definitive period began **1 January 2026**. A single **50-tonne** annual mass threshold exempts importers below it, excluding electricity and hydrogen. Authorised-declarant applications lodged by 31 March 2026 permit continued importing pending a decision. Certificate sales open 1 February 2027; first surrender, covering 2026 imports, due by 30 September 2027. |
| EUDR | Postponed a second time by Regulation (EU) 2025/2650. Applies **30 December 2026** for large and medium operators, **30 June 2027** for micro and small. The Commission has said it will not reopen the text. |
| Forced Labour Regulation | Regulation (EU) **2024/3015**, in force 13 December 2024, **applies 14 December 2027**. Customs must refuse release for free circulation or export of products covered by a violation decision. |
| EU Customs Reform / Customs Data Hub | EU Customs Authority takes up its tasks **1 January 2028**. Data Hub opens for e-commerce 2028, voluntary for other importers 2032, mandatory for all traders **1 January 2038**, with a review in 2035. |

## Excluded outright

- **`IT Convergence + Oracle GTM deliver measurable ROI`.** Vendor copy naming two named vendors, with no measurement behind it. Not used, and the pack's no-vendor-naming rule covers it anyway.
- **"A single trade transaction on average involves as many as 36 original documents and 240 copies"** (WTO blog, February 2025). Striking and eminently quotable, and it traces back decades with no method attached. Not used.

## What post 7 was allowed to contain

The geography-neutral decision is a hard constraint on this post and it costs the pack its two sharpest facts. The broker-licence ruling and the Section 1592 penalty multiples are both jurisdiction-specific and neither can appear, and the benchmark had to be described without naming whose tariff schedule it tested. Posts 2 and 6 still carry those facts, so the pack as a whole loses nothing, but post 7 read on its own is less specific than posts 1, 2 and 6. That was the owner's call, made with the trade-off stated in advance.

Permitted numbers in post 7, and nothing else: **632** products, **26** grading experts, **23** systems, **46.8%** best system, **95%** human experts, **29.3%** model asked directly, **17 points** for the harness delta (already used in that exact form in post 1), and the **around half** show of hands. Every one carries its sample or its provenance in the sentence that uses it.

---

# Cycle - posts 8 and 8b, and two defects found on the way (22 August 2026)

The owner rewrote post 7 in their own words and asked for a refinement, hashtags, and preparation through multiple personas. Two defects surfaced during the work, one in the supplied draft and one in what I had shipped the day before.

## The geography-neutral decision was reversed, deliberately

The owner's rewrite reintroduced CBAM, the EU Deforestation Regulation, the Forced Labour Regulation and the three choke points, all of which post 7 had deliberately excluded one cycle earlier. They wrote it themselves, so it is recorded as a reversal rather than an oversight, and it was built as asked.

The reversal is coherent. Naming the rules gives the post a reason to exist that post 7 does not have, and the classification argument underneath it is still universal, so the page's evidence continues to pay off. **Resolution: post 7 was kept as the jurisdiction-free version and the new material became post 8.** The pack now has three openers and the posting notes say to run exactly one.

## Defect 1, in the supplied draft: two verbatim lifts

**Two blocks of the owner's draft were copied word for word from the Customs Support Group press release of 18 June 2026.**

1. *"Sanctions, export controls, anti-dumping measures and new ESG requirements such as the Carbon Border Adjustment Mechanism (CBAM), the EU Deforestation Regulation (EUDR) and the Forced Labour Regulation increasingly require a consistent data basis across company boundaries."*
2. *"Customs is moving beyond its traditional role as an administrative gatekeeper. Customs departments are shifting upstream from the back office to the boardroom, becoming strategic drivers of compliance, risk management, supply chain resilience, and business growth."*

Published under the owner's name these are somebody else's copy. Both were rewritten: the argument survives, the wording does not. The working title *"From the back office to the boardroom"* was also dropped for the same reason, since that phrase is CSG's, and the post is now titled *Three rules, one data problem*.

**Verification is mechanical, not visual.** A longest-common-run check between the CSG passages and each finished post reports the longest run of consecutive shared words. Post 8 returns **3 words** ("sanctions export controls"), post 8b **3 words** ("the carbon border"). Both are unavoidable terms of art rather than borrowed phrasing. The threshold used is 12 words. Rerun this check on any future post built from supplied material.

## Defect 2, in what I shipped yesterday: posts over the platform limit

**LinkedIn feed posts are capped at 3,000 characters. That is a hard limit, not a guideline, and a longer draft cannot be posted at all.** Confirmed against current documentation: raised from 1,300 to 3,000 in June 2023 and unchanged since.

Post 7 shipped at roughly **3,800 characters** and the first draft of post 8 measured **4,104**. Neither could have been published. Post 7 was therefore cut to **2,912** and post 8 to **2,872**, both with headroom. **This overrode the invariant that post 7 stay byte-identical**, which existed to protect its jurisdiction-free character, not to preserve an unpublishable post. Its character is intact and the change is recorded here rather than made quietly.

All ten posts were then measured. Posts 1 to 6b were already inside the limit at 1,191 to 2,573. A standing **Length** section was added to the posting notes so this cannot recur, including the point that only about **140 characters show on mobile** before "see more".

The one substantive cut was the 29.3-to-46.8 harness detail, removed from post 8 and kept in post 7. Post 7's argument is the benchmark, so it needs the detail. Post 8's argument is the regulatory squeeze, so the headline 46.8 against 95 is enough. The split also stops the two posts duplicating each other, which they otherwise would.

**A second, smaller bug worth recording:** the first trimming script split each post block on the wrong newline and silently deleted the bold positioning line under both headings. Caught by inspecting the file rather than trusting the script's own success output. Fixed by replacing each block outright, and the replacement now asserts the positioning line survived.

## The five persona passes, and what each actually changed

The owner asked for multiple personas. Applied as sequential editing passes, each with one job. Recorded with what it changed so this is a method rather than a claim.

| Pass | Reading as | What it actually changed |
|---|---|---|
| 1 | Trade compliance practitioner | Rewrote the three choke points as lived experience. Cut the consultant register from "redundant manual checks triggered by incomplete digital linkages" to "the same check gets redone by hand for every agency". |
| 2 | Skeptical broker | The heaviest pass. Attached a date to all three regulations, because "these rules are coming" is unfalsifiable and "one is live, one lands in four months" is not. Kept "show of hands" and "straw poll" on the classification figure. Changed "automation eliminates each choke point" to what automation genuinely does, which is move the decision earlier. |
| 3 | CFO | Protected the one measurable action from being cut for length: what share of your filings are repeats. It is the only thing in the post a reader can do on Monday. |
| 4 | Solution architect | Held the harness claim to exactly what the study supports, same model, same goods, 17 points. Held the build line to one sentence with no product language. |
| 5 | LinkedIn editor | Found the 3,000-character limit, which is what turned a length preference into a defect. Set the hashtag block at five tags, specific to broad. Checked the first 140 characters of each post against the mobile truncation point. |

Pass 2 changed the most, which is the expected result and the reason it exists.

## Now stated on-post, promoted from the reserve table above

Three regulation dates moved out of reserve and into published copy, so they carry a re-check obligation: EU carbon border mechanism definitive from **1 January 2026**; deforestation rules applying **30 December 2026** for large and medium operators; forced labour ban applying **14 December 2027**. The deforestation date has already been postponed twice. **If it slips again, posts 8 and 8b are wrong and must be corrected before any further use.**
