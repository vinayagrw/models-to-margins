# W3 red team, Agentic Commerce Protocols technical design

Reviewer stance: an outside payments architect who wants this design to fail review. Doc read in full on 2026-11-15 (sections 0 to 11, sections 12 to 15 are placeholders). Scores were recomputed from the doc's own tables. Only the briefs in this folder were consulted, no web research.

Count: 20 critiques. 8 high, 10 medium, 2 low. Ordered by severity.

## High

### C1. The thesis cannot lose, and its exit trigger cannot be seen

- **Target:** section 3, ADR-1 (5.4), section 11.2
- **Critique:** Section 11.2 says the thesis "is meant to hold in all four" scenarios, so no future the doc imagines could prove it wrong. ADR-1 says to revisit "when one protocol passes a clear majority of agent orders", yet 6.5 says no network, Google or Shopify discloses agent orders at all, let alone by protocol. A thesis with no losing scenario and an exit nobody can measure is a preference, not a decision.
- **Why it matters to a client:** the client cannot tell when to stop paying for adapters and integrate one protocol directly (option A) or hand it all to the PSP (option C), so the gateway runs on with no review point.
- **Severity:** high
- **Research question:** Which public source (network, PSP, agent platform or independent tracker) reports completed agent orders split by protocol or checkout surface, and how often is it updated?

### C2. "Build to the mandate" puts the least settled layer in the stable core

- **Target:** section 3, 4.3 (P4 column), 5.3 (canonical model and adapters)
- **Critique:** Section 3 says to build to "the token and the mandate", but 4.3 calls P4 the most divided column, with at least five overlapping formats and none carrying live money. Open and closed mandates, network held instructions, a one_time ACP allowance and layered SD-JWT do not map one to one, so the canonical Authority record either drops detail (weaker evidence) or grows into the union of every format and changes whenever a spec does. That moves churn from the adapters into the core and breaks Maya's rule that adapters only translate. A UCP adapter is also a checkout session state machine with handoff and order events, not a thin translator.
- **Why it matters to a client:** ADR-1 rates option B as "Medium" cost with no estimate behind it, so a client will under budget both the core and the UCP adapter.
- **Severity:** high
- **Research question:** Which fields and meanings differ between AP2 v0.2 Checkout and Payment mandates, Mastercard Verifiable Intent v0.1 and Visa Intelligent Commerce purchase instructions, and can one schema hold all three without loss?

### C3. No "wait" option, no referral led scenario, no economics

- **Target:** ADR-1 options, section 11.2, the 6.3 read across
- **Critique:** The doc's own evidence describes a world it never names. Discovery grows fast and checkout stays small (6.3), ChatGPT moved checkout back to retailer sites [R1-17], AI referral visits rose 71% and convert 90% better [R5-28, R5-27], x402 settled about 274K USD in October 2026 [R2-39] and Visa expects agent activity to stay very small for four quarters [R3-14]. Yet ADR-1 has no "keep the PSP, fix feeds and attribution, wait" option, 11.2 has no stall or referral only scenario, and nothing sets the cost of a ten component gateway against any volume.
- **Why it matters to a client:** the leader's real question is how much to spend in 2027. Without this option the doc steers clients into payment plumbing while the near term return sits in catalog data, feeds and attribution.
- **Severity:** high
- **Research question:** In the 2026 US holiday season, what share of AI influenced retail orders was paid by an agent rather than by a person after an AI referral, per Adobe, Salesforce or a card network?

### C4. The gateway mixes buyer side and seller side duties

- **Target:** 5.1 to 5.4 (ADR-3, ADR-5), 7.6
- **Critique:** The gateway is deployed by a merchant, yet it enforces per agent spend caps (V1), prepaid per agent budgets (ADR-5), pre signing context capture (V11) and model version (V12), which only the buyer's agent platform can see or enforce across merchants. ADR-3's consequence, "a prompt injected agent that forges a cart cannot also approve it", does not hold, because the manipulation and the user's signature both happen on the buyer side before the merchant sees anything [R4-17]. The "Enterprise buying agents" box in 5.2 needs a buyer side spend control product, which runs the other way.
- **Why it matters to a client:** the client builds controls where they cannot work and leaves the top threat from section 7 open. A seller that holds prepaid agent balances may also be holding stored value, a licensing question the doc never asks.
- **Severity:** high
- **Research question:** Under the current AP2, UCP and Visa Intelligent Commerce specs, which party must check the cart against the mandate and enforce spend limits: the agent platform, the credential provider or the merchant?

### C5. The player ranking rewards spec authorship, contradicts the thesis and under scores Stripe

- **Target:** 9.1, 9.2, 9.5
- **Critique:** The heaviest criterion (25) rewards authoring a protocol, the layer the thesis says matters least, and no criterion scores control of the token layer the thesis says to build to. Visa gets P 5 for TAP (no versioned release, repo idle since 2025-10-28) and Mastercard P 5 for Verifiable Intent (Draft v0.1, idle since April), while Shopify gets P 4 for co-developing the only live commerce protocol, and Shop Pay's agent checkout [R3-20] counts as live evidence for Shopify, Visa and Mastercard at once. Stripe gets L 3 partly because OpenAI withdrew Instant Checkout, and its footprint is spread across ACP, MPP, Tempo, SPT riding network tokens, Link in 200 plus agents, Treasury for agents (2026-10-21), Issuing for agents, Privy wallets in AgentCore and a UCP Governing Council seat, which per protocol scoring cannot see. With vendor reach cut, Stripe and Shopify sit 25 points behind the top three, one step on one criterion.
- **Why it matters to a client:** a client picking a partner for the token layer reads "Google, Mastercard, Visa" and may skip the PSP that actually delivers agent tokens to its checkout.
- **Severity:** high
- **Research question:** Does Stripe process the Shop Pay agent checkouts inside Muse, Claude Duet and Instinct, and how many merchants could accept Shared Payment Tokens as of 2026-11?

### C6. The four patterns and the decision tree leave out what agents mostly use today

- **Target:** 8.1, 8.3
- **Critique:** Two live ways agents pay have no pattern. One is an agentic browser filling the merchant's normal checkout with a stored card (the ChatGPT browser path, the Guardio demo, the six banks' warning [R4-09, R4-33]). The other is the single use virtual card issued to an agent (Rain, Crossmint, Stripe's Issuing for agents preview [C371], the "bridge" Mastercard's CEO wants to retire [R2-09]). Neither carries a mandate or a protocol, so the tree never routes to them and the gateway never sees them.
- **Why it matters to a client:** the client gets no guidance for the flows it will meet most in 2026 and 2027, and the fight between networks and card issuers over virtual cards is a real credential choice it must make.
- **Severity:** high
- **Research question:** What share of agent initiated card payments in 2026 used single use virtual cards rather than network agentic tokens, per any network, issuer or PSP disclosure?

### C7. The parameter set misses decisions every builder hits in production

- **Target:** 4.1, 4.2, 4.4
- **Critique:** Nothing covers the authorization message flags (customer or merchant initiated, stored credential, agent indicator, token requestor id), which decide SCA exemptions and chargeback rights. Also missing are buyer identity and account linking (Hana's "keeps the customer" stake, already a UCP capability), personal data passed to and kept about the agent, allowed drift between the mandated amount and the final total after tax, shipping and FX, protocol version negotiation (the premise of monthly churn) and the agent platform's fee, which 80% of a merchant sample expect [R5-17]. P7 also lacks bank rail recourse such as the Direct Debit guarantee, UK APP reimbursement and UPI disputes.
- **Why it matters to a client:** these are where integrations fail certification or lose disputes, and none of them has a home in the canonical model.
- **Severity:** high
- **Research question:** Do Visa, Mastercard or EMVCo define an agent transaction indicator in the authorization message, and do they treat agent payments as customer or merchant initiated under the stored credential framework?

### C8. The scenarios are not distinct and cannot be falsified

- **Target:** 11.2, 11.3
- **Critique:** S1 is about the credential layer and S2 about the commerce protocol layer, and the doc shows UCP already carries network tokens [R1-74], so the two co-occur rather than compete, while S4 is a separate lane. Only S3 is a true alternative, and no "what has to be true" line has a threshold or a date ("one time virtual cards fade", "organic payers grow beyond a narrow base"). Of 22 signposts, 10 are Proposals and 9 of those are undated, three point to two scenarios at once, and the scheduled facts (OCC rule, draft expiries) happen in every world, so they cannot tell worlds apart. Two axes would fix it: who holds the credential (network or platform wallet) and who owns the checkout surface (open protocol, platform or browser), each with a dated kill test.
- **Why it matters to a client:** in 2027 the client cannot tell which world it is in, so it cannot time spend or end a bet.
- **Severity:** high
- **Research question:** Which agent transaction metrics have Visa, Mastercard, Shopify or Google committed to disclose in 2027, per earnings calls or investor days?

## Medium

### C9. The token is not neutral, so the thesis moves lock in rather than removing it

- **Target:** section 3, 8.1 verdict, ADR-1 option C
- **Critique:** A merchant does not choose the agentic token. It receives whatever the PSP, wallet or network hands it, and 8.4 itself scores network token governance 2 of 5 on openness. In S3 the platform wallet owns both token and checkout, so the merchant's canonical model adds nothing, and for most merchants "build to the token" reduces to "keep your PSP", which is option C, graded medium to high lock in.
- **Why it matters to a client:** the client may believe it has hedged protocol risk when it has taken on network and PSP concentration risk instead.
- **Severity:** medium
- **Research question:** Can a merchant receive Visa and Mastercard agentic tokens through more than one PSP at once, and can those tokens move between PSPs?

### C10. The decision weights have no basis and miss two personas' stakes

- **Target:** 8.2
- **Critique:** The weights are set first and justified later ("FILL counts after Wave 3"), and no criterion covers fraud and attack exposure (Ravi), customer ownership and conversion (Hana) or fees and take rate. Liability clarity carries 20 but every option in both worked examples scores 2 or 3, so it barely separates anything and belongs as a gate, as ADR-6 already treats it. The same weights apply to a retailer and an API seller, "buyers' agents present" overlaps "maturity", and no issuer or bank persona sits on the panel although issuers rate high on four of ten challenges.
- **Why it matters to a client:** the weights decide the order in 8.4, and a client will read the top score as the recommendation.
- **Severity:** medium
- **Research question:** Which criteria and weights do 2026 decision frameworks for agentic commerce from PSPs or analysts (Adyen, Checkout.com, Worldpay, Gartner, Forrester) use?

### C11. The worked example scores different layers as rivals, and the order flips easily

- **Target:** 8.4, 8.1 side by side
- **Critique:** UCP is a checkout protocol, network tokens a credential, Web Bot Auth an identity check and AP2 a mandate. The doc concludes they are complements, which makes one weighted ranking across them meaningless, and the order is fragile: moving the 10 openness points to integration puts network tokens at 83, above UCP at 78. Comparisons should run inside a layer, such as UCP against ACP, Copilot Checkout and browser checkout for the surface, and network tokens against SPT and virtual cards for the credential.
- **Why it matters to a client:** a client may fund the top scorer and skip the complement it needs.
- **Severity:** medium
- **Research question:** Which agent checkout surfaces (UCP, ACP, Copilot Checkout, Shop Pay in agents, a browser on the merchant site) carried completed US orders in Q4 2026?

### C12. The tier 2 rule would block the only live consumer flows

- **Target:** 7.6 (Web Bot Auth row), ADR-2, 8.1 verdict item 3
- **Critique:** 7.6 says tier 2 needs "a valid agent signature and a valid mandate, never a signature alone". The live flows, ChatGPT's browser on retailer checkout and Shop Pay tokens inside agents, carry no mandate, and 8.1 accepts "token scoped limits where no mandate is offered", so the two rules conflict. Unsigned agentic browsers would also be refused at payment.
- **Why it matters to a client:** a merchant that builds 7.6 as written turns away paying agent traffic, against Hana's stake.
- **Severity:** medium
- **Research question:** Which consumer agents and agentic browsers sign their requests with Web Bot Auth or a network key directory as of 2026-11?

### C13. The parameter set is too big and mixes three kinds of thing

- **Target:** 4.1, 4.2, 4.4
- **Critique:** P1 to P21 and V1 to V16 make 37 rows, and the 4.3 matrix fills only 11 of them. P10 liability, P14 jurisdiction, P19 governance and P21 bank stance are context a builder cannot choose, which breaks R0's own definition of a parameter as a design choice, and V11 and V12 are evidence fields fixed once, not values set per payment. P17 overlaps P11 and P8, P18 overlaps P4, V14 overlaps V2, V13 overlaps V4 and V8, V15 overlaps P20 and P16 overlaps P13, so the list should split into design choices, context and evidence fields, keeping P15, which fills a real gap.
- **Why it matters to a client:** a builder cannot see which rows are its own decisions, and a client workshop will stall on 37 items.
- **Severity:** medium
- **Research question:** Which fields do the UCP, ACP and AP2 specs expose as merchant or platform configuration rather than fixing them in the protocol?

### C14. The challenge ranking is two tiers in disguise and leaves out the problem the design solves

- **Target:** 10.1, 10.2, 10.4
- **Critique:** E times S on 1 to 5 scales leaves four challenges at 20 and six at 16, ordered inside each set by source count, which measures search effort, not pain, and challenge 10 is scored E 4 then held last because its evidence is weaker, which contradicts its own score. Challenges 1, 5 and 8 are facets of liability and evidence, and 3 and 7 of agent recognition. Missing are protocol churn and breaking spec changes (the premise of the thesis and a builder pain listed in 10.4), catalog readiness (11 to 19% agent ready [R5-12]), attribution (none of 60 merchants could connect AI visits to sales [R5-18]) and agent fees.
- **Why it matters to a client:** a client funds the top of the list, and the list omits the risk the main design choice is built for.
- **Severity:** medium
- **Research question:** How many breaking changes did UCP, ACP, AP2 and the Web Bot Auth draft publish between 2026-01-01 and 2026-11-15, per their changelogs and repos?

### C15. Tempo as top startup double counts MPP and rests on small volume

- **Target:** 9.4
- **Critique:** Tempo gets P 5 for MPP, the same authorship Stripe already scores P 5 for, and MPP's IETF draft has expired. Its L 3 rests on 48,585 lifetime events from 1,874 payers [R2-28], and the eligibility test is unproven because Stripe's and Paradigm's stakes are undisclosed [R3-41], so the startup list may be led by an incumbent's arm.
- **Why it matters to a client:** a client looking for independent challengers is handed a name that may sit inside Stripe's orbit.
- **Severity:** medium
- **Research question:** What stakes do Stripe and Paradigm hold in Tempo, per any filing, investor disclosure or credible press as of 2026-11?

### C16. Cloudflare's move inside the window was missed

- **Target:** 9.2 (R3 rank 11, not shown in the doc), 9.5
- **Critique:** R3 scores Cloudflare M 0 ("none found"), yet the doc's own R4 row records the Trusted Agent Delegation coalition launch on 2026-11-05 [R4-68], inside the 90 day window. Cloudflare co-authors Web Bot Auth, partners on TAP and is where Buyer A's identity check runs, and an M of 4 or 5 lifts it from 170 to about 230 to 245, above Coinbase, PayPal and Amazon in the published top 10.
- **Why it matters to a client:** if identity checks sit at the CDN, the CDN vendor is a supplier choice the doc never ranks.
- **Severity:** medium
- **Research question:** Which members and deliverables has Cloudflare's Trusted Agent Delegation coalition announced since 2026-11-05?

### C17. The decision tree ends in leaves nobody can build today

- **Target:** 8.3
- **Critique:** T3 (EU consumer, human away) and T5 (B2B on a final rail) both depend on a signed mandate, which 8.1 shows is Spec with no live money, and no fallback leaf is given. The consumer branch never asks about rail or finality, so UPI, Pix, Alipay and stablecoin funded Link have no leaf. Question q5 asks whether the merchant must stay merchant of record, but the agent platform decides that, not the merchant.
- **Why it matters to a client:** an EU, India or Brazil client following the tree gets an answer it cannot ship in 2026.
- **Severity:** medium
- **Research question:** Is any signed user mandate (AP2, Verifiable Intent or a bank mandate) used in live EU agent payments under PSD2 SCA as of 2026-11?

### C18. "Every payment can be defended" overclaims, and the evidence store has no privacy owner

- **Target:** ADR-4, 1.2 (retention), 7.6
- **Critique:** Section 7.3 says no network has said it accepts a mandate as compelling evidence, so writing evidence first improves the odds but does not guarantee a defence. The store now holds the cart, offers seen, ranking, model version and key snapshots for the longest dispute window of any rail accepted, which collides with GDPR data minimisation and storage limits, and no persona owns privacy.
- **Why it matters to a client:** a client may count avoided chargeback losses it cannot win and take on a data protection exposure.
- **Severity:** medium
- **Research question:** Have Visa or Mastercard added agent evidence, such as a mandate or an agent id, to their compelling evidence or dispute rules in 2026?

## Low

### C19. Latency and duplicate targets are untested

- **Target:** 1.2, 5.5
- **Critique:** The 300 ms p95 must cover a key directory fetch, an SD-JWT chain check, a revocation check against an issuer or network registry, the policy engine and a durable evidence write before the PSP call, and only one 3.8 ms simulated step is measured [R4-12]. A duplicate rate of 0 cannot be enforced by a merchant idempotency key when the client signs a second final payment, which an open x402 issue reports [R5-69].
- **Why it matters to a client:** if the budget is blown, the doc's own reason ("agents abandon slow merchants") turns against the gateway.
- **Severity:** low
- **Research question:** What p95 latency do Cloudflare, Akamai or Visa report for Web Bot Auth or TAP signature checks in production?

### C20. Internal slips a checker should fix

- **Target:** 1.3, 2.3, 8.1, 8.4
- **Critique:** Section 2.3 rules Agent Pay for Machines M as Spec, not Pilot, but the 8.1 side by side says "M Pilot" and Buyer B scores the card token 3 for Pilot, and at 2 its score falls from 51 to 49. Section 1.3 calls UCP the only commerce protocol with live consumer checkout while the MCP and WebMCP rows, also of kind commerce, are Live for C. ADR-1's title drops "and the mandate" from the section 3 thesis.
- **Why it matters to a client:** small contradictions let a sceptical reviewer discount the whole document.
- **Severity:** low
- **Research question:** Has Mastercard Agent Pay for Machines moved real money with a named partner, per a primary source dated after 2026-06-10?

## Strongest parts

- The status rules in 2.3 and 6.1: Live needs a rung 2 to 4 source inside 90 days, and the evidence tag never lifts a status.
- The x402 reconciliation in 6.4, which shows its arithmetic and why it picked the independent tracker.
- Section 7: the liability table by jurisdiction and the finding to component map in 7.6 are specific and traceable.
- ADR-3 and ADR-6 as principles (keep authority apart from money, name the loss holder per route), even with C4 narrowing ADR-3's claim.
- Forecasts in 11.1 carried as ranges with each author's incentive and never averaged.
