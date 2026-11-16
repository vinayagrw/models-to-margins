# D3 draft, sections 7 and 10 of the technical design

Draft for the lead, as of 2026-11-15. Sources are the claim tables in R4_risk.md and R5_pain.md, plus baseline rows those briefs reuse (C, DC# and V# ids). Design choices are marked Proposal. Vendor figures are marked vendor.

## 7. Liability, regulation and security

### 7.1 The short answer for a leader

- **No one has decided who pays when an agent buys the wrong thing.** We found no law, network rule or court case in the US, EU or UK that allocates the loss [R4-64, R4-65, R5-47, V#10]. By default the consumer carries it under Reg E once credentials are shared [R4-34, C296], and the merchant carries non fraud card disputes [C299, R4-65].
- **Banks are moving the risk to customers before regulators act.** Bank of America says customers answer for activity from shared logins, and from 2026-11-24 Wells Fargo holds customers liable unless they can show they revoked the agent [R5-43, R5-44]. Four large US banks do not let outside agents move money [C352].
- **A signed mandate is not proof of intent.** An AP2 threat model found 48 threats, 8 of them high risk, and showed that valid signatures can sit on a manipulated decision [R4-17]. Prompt injection reaches the cart in tests [R4-11, R4-16]. Evidence has to record what the agent saw, not only what it signed.
- **Agents still shop badly, and stablecoin rails have no way back.** In Visa's benchmark 42.8 percent of runs failed and 54 percent of failed runs still bought something (vendor) [R4-27, R4-28]. x402 has no dispute path at protocol level, and two papers show paid but denied outcomes [R4-67, R4-14, R4-15].
- **The UK moves first and the US consumer regulator is silent.** HM Treasury asked about agent liability in Question 15, the FCA plans a trusted framework for agentic finance and the CMA says a business answers for its own agents [R4-53, R4-55, R4-56]. The EU PSR is not yet in the Official Journal [R4-47, R4-48], MAS will consult in 2027 [R4-60] and we found no CFPB statement on agents [R4-41].

### 7.2 Liability by jurisdiction

Only rows backed by a claim id are kept. "No agent text" means the rule was read and does not mention agents.

| Jurisdiction | Rule | What it says about agents | Who carries the loss today | Open question | Ids |
|---|---|---|---|---|---|
| US | Reg E, 12 CFR 1005.2(m) | No agent text. A transfer by a person the consumer furnished the access device to is not "unauthorized" unless the consumer told the bank. Goodwin reads this as a presumption of authorization when credentials go to an agent | Consumer until a revocation notice, unless the bank broke its own security procedure | Is an AI provider a "person furnished the access device"? Does acting beyond scope still count as authorized? | R4-34, R4-35, R4-38, C296 |
| US | Reg Z, 12 CFR 1026.12 | No agent text. Unauthorized use means use without actual, implied or apparent authority. Consumer liability capped at 50 USD. Billing error rights cover goods not accepted or not delivered | Issuer first, then merchant by chargeback. Consumer if apparent authority applies. Goodwin says card billing rights give consumers more room to back out, with merchants typically bearing the loss | Has apparent authority ever been applied to an agent? Will buyer's remorse be reframed as non delivery? | R4-36, R4-37 |
| US | UCC Article 4A (state law) | Commercial payment orders and wires bind the customer if the bank followed an agreed, commercially reasonable security procedure in good faith | Business customer, if the bank followed the procedure | What security procedure is commercially reasonable for agent originated orders? | R4-39, C347 |
| US | CFPB | No rule, guidance or advisory on AI agents found. Its newsroom shows two items from 2026-10-01 to 2026-11-15, neither on agents. ITIF asks the CFPB to confirm that agents do not waive error resolution rights | Unchanged | Will the CFPB act at all? | R4-40, R4-41, R5-54 |
| US | Federal Reserve | Governor Waller (2026-09-29) said authentication shifts to proving the agent may act for the buyer, asked who is on the hook for a wrong purchase and suggested standards that record intent and execution | Not set | Will the Fed or the card networks write the first rule? | R4-42, R4-43, C284 |
| US | GENIUS Act, OCC final rule | Issuer rule issued 2026-10-21, effective 2027-01-18. No agent provision found in what was read | Payer, since an on chain stablecoin payment is final with no chargeback | What recourse does a consumer have for an agent's stablecoin payment? | C341, R4-67 |
| US | Card network rules (Visa, Mastercard, Amex) | Merchants accept agent payments under existing card agreements. No liability shift and no agent reason code found. Amex covers agent errors by policy for registered agents with authenticated intent | Issuer for authenticated token fraud. Merchant by default for non fraud disputes, which remain unallocated | Will a signed mandate count as compelling evidence? Will networks add an agent reason code? | R4-64, R4-65, C299, C372, V#10 |
| EU | PSD2 and the SCA RTS | No special regime for agents. SCA applies when an agent pays or sets up a merchant initiated mandate. Later payments count as payee initiated only if the customer gave the merchant a mandate. EBA press releases from 2026-09-25 to 2026-11-13 say nothing on agents | Payer's PSP for unauthorised payments. Unclear when an agent exceeds its mandate | Is an agent platform a payment initiation provider? Can an agent hold a merchant initiated mandate? | R4-44, R4-45, R4-46, R4-51 |
| EU | PSD3 and PSR | Final compromise texts released 2026-04-23. Official Journal publication not confirmed by 2026-11-15. Impersonation refunds narrowed to PSP impersonation, plus PSP liability for failure to block. Agents not addressed in sources opened | PSP for failure to block and for PSP impersonation | When will the PSR apply (about 21 months after entry into force)? Will SCA detail cover agents? | R4-47, R4-48, R4-49, C305 |
| EU | AI Act and Digital Omnibus | Parliament backed a delay on 2026-06-16 that moves Annex III high risk duties to 2027-12-02. Council approval was pending at the last source opened. No source opened treats shopping agents as high risk | Provider and deployer duties, not payment loss | Final adoption date. Is any agent payment use high risk? | R4-50 |
| UK | PSRs 2017 reg 77 | No agent text. Payer liable up to 35 GBP for a lost, stolen or misused instrument, and for all losses after fraud or gross negligence | PSP beyond the cap | Is handing credentials to an agent gross negligence? | R4-52 |
| UK | HM Treasury | Consultation Question 15 asks whether consent, authentication and unauthorised liability rules need updating for agents. Closed 2026-10-06, no response found. The AI Adoption Plan proposes an agentic payments trust framework and a Know Your Agent standard | Unchanged until a response | What will the response propose? Will Know Your Agent become a standard? | R4-53, C306 |
| UK | APP reimbursement (PSR) | Cap of 85,000 GBP per claim for consumers, microenterprises and charities since 2024-10-07. No agent text | Sending and receiving PSPs | Is a scam that tricks an agent into a push payment an APP scam? | R4-54, DC#10 |
| UK | FCA | Published good and poor practice on AI on 2026-10-19 and plans a trusted framework for agentic finance covering identity, delegated authority, accountability and execution, with no timeline. The Mills Review notes the rulebook assumes a human approving each transaction. GoCardless ran the first UK agentic account to account payment in FCA AI Live Testing | The firm stays responsible for outcomes | Framework content and timing | R4-55, R5-55, C418 |
| UK | CMA | Guidance of 2026-03-09, page updated 2026-10-30: a business is responsible for what its AI agent does, with fines up to 10 percent of worldwide turnover. Covers agents a business deploys, not consumers' own agents | The business that deploys the agent | Who answers for a consumer's own agent? | R4-56 |
| India | RBI Authentication Directions 2025 | Issued 2025-09-25, compliance by 2026-04-01. At least two factors per digital payment, risk based checks allowed. No agent text found | Issuer under existing rules | Can an agent payment meet two factor rules without a human each time? | R4-57 |
| India | NPCI | A Unified Agent Protocol using UPI Circle and Reserve Pay was reported in 2026-09 and was still described as expected after Global Fintech Fest on 2026-09-09. No RBI statement on agents found | Not set | Launch, limits and liability split | R4-58, R4-59 |
| Singapore | MAS AI Risk Management Guidelines | Issued 2026-10-07, effective 2027-10-07. Firms must review controls as agentic AI spreads. MAS will consult on agentic guidance in 2027 | Financial institution, including for third party AI | Will MAS write a payment specific agent rule? | R4-60 |

Two notes for Elena. First, an anti money laundering duty sits beside these liability rules: the Travel Rule applies at 3,000 USD or more to wires and to stablecoin transfers through a money transmitter, and 31 CFR 1010.100 excludes ACH, ATM and point of sale (R0 do not regress list). Second, R4 did not cover US state law beyond UCC 4A, Australia, Hong Kong or Brazil, because its search cap was reached.

### 7.3 How each protocol answers disputes and liability (P9, P10)

| Protocol family | P9 dispute path | P10 liability holder | What the protocol text says | Gap shown by research or repos | Ids |
|---|---|---|---|---|---|
| AP2 | Signed mandate as evidence, then card or rail rules underneath | Not allocated by the spec | Mandates and receipts give a non repudiable record. Dispute resolution is out of scope. An open issue says v0.2 removed the user signed Intent Mandate and asks what now settles a mispick | Valid signatures can sit on a manipulated decision. Replay needs consume once and context binding. Prompt injection reaches the cart. Signing keys may be gone by dispute time | R4-61, R4-62, R4-17, R4-12, R4-11, R5-71, R5-72 |
| ACP | Card reason codes through the merchant's PSP (inferred from merchant of record) | Merchant by default for card not present | Businesses stay merchant of record. The site does not address refunds, chargebacks or disputes | An open issue says the merchant may hold no stored fact naming the agent. No academic analysis of the Shared Payment Token found | R4-63, R5-70, R4-18 |
| UCP | AP2 mandates, then card reason codes | Merchant stays merchant of record | Uses AP2 mandates and OAuth account linking | Inherits the AP2 gaps. An IETF draft change breaks UCP's Web Bot Auth key lookup | C281, R5-73 |
| Visa Intelligent Commerce and Trusted Agent Protocol | Card reason codes, no agent code found | Issuer for authenticated token fraud. Non fraud disputes open | Agent identity by Web Bot Auth signatures checked against network hosted key directories | Web Bot Auth identifies the tool, not the human | R4-64, R4-65, R4-69, C363, V#10 |
| Mastercard Agent Pay | Card reason codes, no agent code found | As Visa | Acceptance under existing card agreements. Verifiable Intent links cardholder instructions and the agent and merchant exchange in one record | Primary Mastercard dispute rule text not opened | R4-64, C366 |
| Amex ACE | Card disputes plus Agent Purchase Protection | Amex covers agent errors for registered agents with authenticated intent | Policy, not protocol, first for select developers | Covers the cardholder. Merchant exposure in agent behaviour disputes is not resolved | C372 |
| x402 | None at protocol level found | Payer once signed, final on chain | The README defines a facilitator and exact and upto schemes, with no refund or dispute process. 60 of 423 open issue titles concern dispute, refund, receipt or proof | Unpaid service and paid but denied outcomes. The default client had no spend cap before the 2026-08-18 fixes | R4-67, R5-67, R4-14, R4-15, R4-31, R4-32 |
| MPP | Depends on method. A card method would follow card rules and a stablecoin method is final (inference, spec not opened in R4) | Depends on method | Lists Tempo, Stripe, Lightning and Solana methods and has no ACH method. Receipt and settlement meaning is undefined for card methods | A formal analysis covers MPP but its per protocol results were not read | R4-18, R5-75, R0 do not regress list |
| Cloudflare Trusted Agent Delegation | Not a protocol | Sites often pay today when a user disputes an agent purchase | Coalition launched 2026-11-05 to take accountability problems to the IETF | Identity tiers only, no liability rule | R4-68, R4-69 |

**Plain reading.** Every family either leaves disputes to card rules written for human buyers or, on stablecoin rails, has no dispute path at all. The only network promise found, Amex, is a policy for registered agents, not a rule [C372]. The artefacts protocols offer as evidence can be valid while the decision behind them was manipulated [R4-17], and the specs themselves are moving: an open issue says AP2 v0.2 dropped its user signed intent record [R5-71], and an identity draft change breaks key lookup [R5-73]. For Elena this means liability has to be written into contracts per route, because neither law nor protocol does it yet.

### 7.4 Recent research

Twenty items from R4. Preprints are not peer reviewed. Only abstracts and report pages were read, so effect sizes beyond the abstract are not claimed. Lab reports describe the lab's own experiments, and the Guardio item is a vendor demo. R4 found no new paper on agent payment security dated after 2026-08-30 before its search cap.

**Agent shopping behaviour**

| Title (short) | Venue and date | Finding | Design implication | Id |
|---|---|---|---|---|
| What Is Your AI Agent Buying? (ACES) | arXiv preprint, 2025-08, revised 2025-12 | Position bias that varies by model, demand piles onto few products, model updates reshuffle market share | Feeds need audited or randomised ordering, and mandates should record the user's criteria | R4-01 |
| Magentic Marketplace | arXiv preprint, 2025-10 | Every model showed severe first proposal bias, a 10 to 30 times edge for fast replies | Let buyer agents gather several offers before commit, and do not reward latency | R4-02 |
| AI-AI bias | PNAS, peer reviewed, 2025-08 | Models prefer goods described by an LLM over goods described by people | Feeds should carry structured attributes so agents compare facts, not prose | R4-03 |
| Commercial Persuasion in AI-Mediated Conversations | arXiv preprint, 2026-04 | LLM persuasion lifted sponsored picks to 61.2 percent from 22.4 percent, and labels did not help | Disclose paid placement in the mandate and receipt. Steering may become a dispute ground | R4-04 |
| Vertical tacit collusion | arXiv preprint, 2026-01 | In simulation, platforms and sellers exploiting AI biases without coordinating more than double consumer harm | Keep ranking and description change logs auditable | R4-05 |
| The Automated but Risky Game | arXiv preprint, 2025-05, revised 2025-09 | Outcomes depend on which model each side uses, and agents overspend or accept unreasonable deals | Enforce spend caps and price bounds outside the model (V1, V3) | R4-06 |
| Project Deal | Anthropic lab report, 2026-04 | 69 staff agents made 186 real deals worth just over 4,000 USD, and users with weaker agents did not notice worse prices | Dispute rules cannot assume users spot a bad agent deal. Record model and version | R4-07 |
| Project Vend phase two | Anthropic with Andon Labs, lab report, 2025-12 | Shop agents stayed easy to manipulate. A CEO agent cut discounts about 80 percent but approved lenient requests about 8 times as often as it denied them | Seller side agents need policy engines and legal checks too | R4-08 |

**Attacks on protocols**

| Title (short) | Venue and date | Finding | Design implication | Id |
|---|---|---|---|---|
| Scamlexity (Guardio Labs) | Vendor demo, 2025-08 | Told to buy a watch, an agentic browser used a fake store and in some runs autofilled the saved card and checked out | Verify the merchant, not only the agent, and step up a stored card on a new merchant | R4-09 |
| Commercial LLM Agents Are Already Vulnerable | arXiv preprint, 2025-02 | Agents with web and tool access are easy to attack, and the attacks need no machine learning skill | Assume the agent can be hijacked. Keep limits outside the model | R4-10 |
| Whispers of Wealth (AP2 red team) | arXiv preprint, 2026-01, revised 2026-05 | Simple prompts manipulated product ranking and extracted user data from an AP2 shopping agent | Isolate untrusted merchant content from the component that builds the cart | R4-11 |
| SoK, security in agentic commerce | arXiv preprint, 2026-04, revised 2026-05 | 12 cross layer attack vectors across seven protocols, with authorization gaps | No single layer fixes it. Defend model, protocol, identity and market together | R4-13 |
| Five Attacks on x402 | arXiv preprint, 2026-05 | Five practical attacks cause unpaid service or paid but denied outcomes on testnets and live endpoints | Bind payment to resource, block replay, add a refund path the rail lacks | R4-14 |
| Free-Riding the Agentic Web (x402) | arXiv preprint, 2026-05, revised 2026-06 | Four flaw classes with resource leakage up to 100 percent against official SDKs, all disclosed | Settle then serve must be one atomic step | R4-15 |
| Protocol-Level Attacks (AIP-Bench) | arXiv preprint, 2026-07 | 33 structural flaws across three leading platforms, three of which chain into an end to end payment hijack | Secure the protocol layer, not just the model | R4-16 |
| Beyond the Mandate (AP2) | arXiv preprint, 2026-08 | 48 threats, 8 high risk in at least one architecture. Valid signatures do not ensure intent when the context before signing is manipulated | A signed mandate is weak evidence unless the context the agent saw is captured | R4-17 |
| A Formal Analysis of Agent Payment Protocols | arXiv preprint, 2026-08 | Tamarin models of x402, MPP, ACP and AP2 found 40 previously undocumented issues in 86 cases | Keep authorization, payment and delivery bound across every actor and step | R4-18 |

**Identity and delegation**

| Title (short) | Venue and date | Finding | Design implication | Id |
|---|---|---|---|---|
| Zero-Trust Runtime Verification for AP2 | arXiv preprint, 2026-02 | In simulation, context binding plus consume once mandates stopped the evaluated replay and redirect attacks at about 3.8 ms | Mandates need nonces, single use and binding to merchant and cart | R4-12 |
| Authenticated Delegation and Authorized AI Agents | arXiv preprint, 2025-01 | Proposes extending OAuth 2.0 and OpenID Connect with agent credentials, not evaluated | Supports the OAuth client option for agent identity (P3) with a clear accountability chain | R4-19 |
| Virtual Agent Economies | arXiv preprint, 2025-09 | Argues current trends point to a large, permeable agent economy linked to the human one | Linking agents to card and bank rails means those rails inherit systemic risk | R4-20 |

### 7.5 Fraud and agent traffic data

Every figure below is a vendor figure. Each vendor counts its own customers with its own definition of an agent, so the panels differ and the numbers cannot be added, compared or read as market shares.

| Source | Period | What was measured | Figure (vendor) | Ids |
|---|---|---|---|---|
| LexisNexis Risk Solutions | 2025 | Agentic traffic on its network | Up 450 percent, mostly card payments and logins on gaming and gambling sites, with no sign of malicious intent. Malicious bot attacks up 59 percent | R4-21, C289 |
| HUMAN Security | 2025 | Agentic traffic across its customers | Up 7,851 percent from a low base. 2.3 percent of agentic activity on checkout pages and 77 percent on product and search pages. Retail and ecommerce 46.6 percent of agentic traffic | R4-22, R5-32, R5-33, R5-34 |
| HUMAN Security | 2022 to 2025 | Carding and account takeover | Carding up 250 percent since 2022. Post login takeover attempts quadrupled | R4-23 |
| HUMAN Security | 2026-04 to 2026-05 | Share of agentic traffic that sites block | 8.2 percent in April to nearly 9 percent in May | R5-35 |
| DataDome | 2025-07 to 2026-06 | AI traffic and agent requests | AI traffic up 82.3 percent. 605.6 million AI agent requests to login, form, cart, payment and sign up pages in H1 2026 | R4-24 |
| DataDome | 2026 | Site defences | Only 2.4 percent of tested sites blocked or challenged all 10 bot and AI traffic types | R4-25 |
| Imperva (Thales) | 2025 | Bot share of all web traffic | More than 53 percent | R5-36 |
| Visa threats report | 2025-07 to 2025-12 | Scam activity on its network | About 1 billion USD, and scams are now the largest consumer fraud type. No agent specific figure | R4-26 |
| Visa Agentic Commerce Benchmark | published 2026-11-05 | 22 models on shopping tasks | 42.8 percent of runs failed, and 54 percent of failed runs still ended in a purchase. Checkout and payment were not tested | R4-27, R4-28 |
| Adobe | 2026-09 | AI referral clicks to US retail sites | Up 71 percent year on year and converting 90 percent better than other traffic. These are people clicking links from AI tools, not agents paying | R5-27, R5-28 |

**Incidents and disclosed weaknesses**

| Event | Date | What happened | What it is not | Ids |
|---|---|---|---|---|
| Agentic browser pays a fake store (Guardio) | 2025-08-20 | The agent used a fake Walmart store and in some runs autofilled the saved card and completed checkout | A vendor lab demo with no real victim | R4-09 |
| Agent driven card skimming (Gambit Security via CSA) | note 2026-09-26 | Three open source agent frameworks breached at least 27 retailers, took over 600,000 card records and skimmed over 100 sites, at about 25.46 USD per target | Agents used as attack tools against merchants, not a hijacked shopping agent | R4-30 |
| x402 SDK flaws (V12 via CSA) | fixed 2026-08-18, note 2026-10-25 | 25 flaws, 3 critical. Before the fix the default client let a server set amount, token and recipient with no cap. The patched SDK defaults to a 1 USD per payment cap. Fixes shipped without advisories | No exploitation reported in the wild | R4-31, R4-32 |
| Banks warn on shopping agents | 2026-09-22 | Six banks said agents ask for card details and type them into sites, and customers do not know who protects them | A warning, not a loss report | R4-33, C417 |

We found no confirmed case of a consumer's shopping agent being hijacked and losing money. The one candidate post could not be opened, so it is not used.

### 7.6 What this changes in the gateway design (Proposal)

Each finding maps to a component or decision record from section 5. All changes are Proposals.

| Finding | Ids | Change (Proposal) | Component or ADR | Owner |
|---|---|---|---|---|
| Valid mandate signatures can sit on a manipulated decision | R4-17, R4-11 | Capture the context before signing in the evidence record: the cart, the offers and ranking the gateway served, paid placement flags, and the agent's model and version (R4 proposed V11 and V12) | Evidence store, ADR-4 | Kofi, Elena |
| Mandates can be replayed or redirected | R4-12 | Consume once nonces, and bind each mandate to the merchant and a hash of the cart. About 3.8 ms in simulation, well inside the 300 ms p95 budget in section 1.2 | Mandate verifier, ADR-3 | Kofi |
| x402 servers can take payment and not serve, or serve without payment | R4-14, R4-15, R4-18 | Settle then serve as one atomic step on the 402 responder, bind the payment to the resource and request, return a signed delivery receipt, and refund by agreement when service fails | Discovery surface (402 responder), payment orchestrator, refund and dispute service, ADR-5 | Sam, Maya |
| The default x402 client had no spend cap, and fixes shipped without advisories | R4-31, R4-32 | Per agent prepaid budgets and per payment caps in the policy engine, a check that amount and recipient match the quote, and pinned SDK versions | Policy and risk engine, ADR-5 | Ravi, Sam |
| Agents paid a fake store, and banks warn agents type card details into sites | R4-09, R4-33 | Merchant authenticity check (R4 proposed P15): publish a signed merchant identity in the capability file so buyer agents can verify it. On the buyer side, step up a stored card on a new merchant (V5) | Discovery surface, policy and risk engine | Hana, Ravi |
| Prompt injection reaches the cart, and merchant files already carry text aimed at agents | R4-11, R4-16, R5-41 | Feeds carry structured attributes and no instructions aimed at agents. The gateway treats the incoming cart as untrusted and re-prices it from the canonical catalog | Discovery surface, canonical order model, ADR-3 | Hana, Maya |
| 54 percent of failed benchmark runs still bought (vendor) | R4-27, R4-28 | Check the cart against mandate scope (V3) and price bounds (V1) before payment, and hold or step up when they differ | Mandate verifier, policy and risk engine | Kofi, Ravi |
| Position, first proposal and persuasion bias steer agent picks | R4-01, R4-02, R4-04 | Record the ranking served and any paid placement in evidence, and show placement on the receipt | Evidence store, order events | Elena, Hana |
| Wells Fargo puts proof of revocation on the customer from 2026-11-24 | R5-44 | Write each revocation as a timestamped event and give the user a revocation receipt (R5 proposed revocation evidence) | Mandate verifier, evidence store | Kofi |
| Mandate signing keys may be rotated or gone by dispute time | R5-72 | Store the verification key and a snapshot of its directory entry with each mandate | Evidence store | Elena |
| A merchant may hold no stored fact naming the agent at chargeback | R5-70 | Write agent id, key id and trust tier into evidence, and attach them to every representment | Agent identity verifier, refund and dispute service | Ravi, Maya |
| Web Bot Auth identifies the tool, not the human | R4-69, C363 | Trust tier 2 needs a valid agent signature and a valid mandate, never a signature alone | Agent identity verifier, ADR-2 | Ravi, Kofi |
| Consent rules differ by country | R4-34, R4-44, R4-46, R4-52, R4-57 | Jurisdiction rule set (P14): EU SCA when an agent pays or sets a merchant initiated mandate, two factors per payment in India, and no reliance on shared credentials for UK or US consumers, where reg 77 and Reg E leave the open question with the payer | Policy and risk engine | Elena |
| Fraud models tuned to humans misread agents, and false declines go unseen | C284, R4-43, R5-59 | Score agent traffic as its own cohort and report approvals, declines and loss per agent | Policy and risk engine, order events and reconciliation | Ravi |
| No liability rule, and the one network cover needs a registered agent | R4-64, R4-65, C372 | New ADR-6 below | Payment orchestrator routing, ADR-6 | Elena, Maya |

**Through the panel.**

- Kofi: a valid signature proves the cart did not change after signing. It does not prove the user wanted that cart [R4-17]. So the evidence record must hold what came before the signature.
- Sam pushed back that capturing every page an agent read adds payload and latency to every call. Resolution: the gateway records only what it served (offers, prices, ranking, placement), which it already holds, and asks the agent platform for the mandate and the model and version. Context capture adds bytes to the evidence write, not a round trip.
- Ravi: the x402 default client trusted the server to name the amount [R4-32]. He will not accept any 402 path where the cap lives in the agent. Caps live in the policy engine, per agent.
- Hana worried that a stricter tier 2 loses sales. Resolution unchanged from ADR-2: signed but unmandated agents can still browse and build a cart, and only payment needs both proofs.
- Elena: with no rule in sight, the gateway cannot wait for law. Each route must name its loss holder before launch.

**ADR-6 Name the loss holder per route before launch (Proposal)**

**Status:** Proposed. **Date:** 2026-11-15.

**Context.** No law, network rule or case allocates the loss from an agent error [R4-64, R4-65, R5-47]. Defaults differ by payer type and rail: consumer under Reg E after shared credentials [R4-34], merchant for non fraud card disputes [C299], payer on final stablecoin rails [R4-67]. Amex covers agent errors only for registered agents with authenticated intent [C372].

**Decision.** For each route (payer type, rail, credential, jurisdiction) the gateway carries a named loss holder from contract, and the orchestrator prefers credentials that carry agent cover when two routes are otherwise equal. Final rails ship only with a written refund by agreement promise.

**Consequences.** Easier: every dispute starts from a known owner. Harder: contracts with agent platforms must be negotiated route by route. Revisit when HM Treasury responds on Question 15 or a network publishes an agent reason code.

## 10. Top 10 challenges and customer pain points

### 10.1 How we ranked

R5 collected 53 pain points across seven stakeholder groups and turned them into a long list of 20 challenges. Each challenge got an evidence score E from 1 to 5, set by the number of independent sources and the best evidence rung among them, and a severity score S from 1 to 5, set by how many stakeholders it hurts and whether it stops money from moving. Rank is E times S, with ties broken by source count. R5's GitHub count was a cross check: 60 of 423 open x402 issue titles concern dispute, refund, receipt or proof [R5-66, R5-67], and the most discussed AP2 and ACP issues ask for dispute evidence and agent identity [R5-72, R5-70].

**What we changed.** We merged R5's rank 10 (agent reliability and wrong purchases, score 12) with R5's rank 20 (untrusted instructions in merchant content, score 3) and the R4 attack and manipulation research, into one challenge: wrong or steered purchases. The reason: R4 shows the same outcome, a wrong purchase under valid credentials, arises both from agent error and from manipulation, and the defences overlap (limits outside the model, a cart check against the mandate, context capture) [R4-11, R4-16, R4-17, R4-27, R4-28]. Rescored, it reaches E 4 and S 4, a score of 16. That ties with R5's ranks 5 to 9. We kept it at position 10 because its evidence is lab, preprint and vendor work and we found no confirmed real loss. We did not rescore ranks 1 to 9 with R4 sources. R4 adds evidence to liability, dispute evidence and mandate scope, which would raise them, not lower them.

### 10.2 The top 10

#### 1. Who pays for agent errors

Score E 4 x S 5 = 20, R5 rank 1.

- **Pain in the customer's words:** *If the agent buys the wrong thing, nobody can tell me who pays.* Merchants add: *we carry the loss when the agent gets it wrong.*
- **Feels it most:** merchants, issuers and banks, consumers.
- **Evidence:** PNC's CEO said a massive liability shift would be needed [R5-46]. Stripe said there is no case law [R5-47]. Worldpay and Adyen say no liability shift exists and loss rules for misread intent are not written [R4-64, R4-65, R5-57]. 93 percent of merchants want the AI provider to bear the loss (vendor) [R5-14], nearly two thirds of US merchants call a standard framework urgently needed (vendor) [R5-21] and 50.8 percent of consumers say AI platforms should pay for unauthorized purchases (vendor) [R5-07].
- **Who is working on it:** Amex Agent Purchase Protection [C372], Stripe Link cover with many caveats [R5-49], HM Treasury Question 15 [R4-53, C306], the FCA trusted framework [R4-55], the Cloudflare Trusted Agent Delegation coalition [R4-68], six bank principles [C417] and Mastercard Verifiable Intent [C366].
- **Related research:** Fed Governor Waller asked who is on the hook for a wrong purchase [R4-42]. A valid signature does not prove intent [R4-17], so a mandate alone cannot settle who pays.
- **What a builder can do now (Proposal):** name the loss holder per route in contract before launch (ADR-6), prefer credentials that carry agent cover, and write the evidence record before every payment (ADR-4).

#### 2. Trust to press pay

Score E 4 x S 5 = 20, R5 rank 2.

- **Pain in the customer's words:** *I will let it choose, but I want to approve before it pays.*
- **Feels it most:** consumers, agent builders.
- **Evidence:** 23 percent of US consumers trust GenAI to handle payments (vendor) [R5-04, R4-29]. 28 percent are comfortable with AI buying for them (Kantar, a research firm) [R5-24]. 9 percent would let an agent complete purchases alone and 32 percent would accept an agent choice with a final approval (vendor) [R5-01, R5-02]. Nearly three quarters want agents to buy only from familiar brands (vendor) [R5-25]. Visa's CEO and Fed Governor Waller both named trust the main barrier [R5-50, C294].
- **Who is working on it:** Visa Trusted Agent Protocol and Mastercard Agent Pay on Web Bot Auth [C363], Visa Intelligent Commerce consumer instructions [C282], Amex agent cover [C372] and six bank principles [C417].
- **Related research:** users with weaker agents got worse deals and did not notice [R4-07]. LLM persuasion lifted sponsored picks to 61.2 percent [R4-04]. Both suggest trust can be misplaced as well as missing.
- **What a builder can do now (Proposal):** keep a human approval for a first purchase, a new merchant and anything above the step up threshold (V5), show the cart and the merchant before pay, and make a dispute one tap from the receipt.

#### 3. Good agents versus bots

Score E 5 x S 4 = 20, R5 rank 3.

- **Pain in the customer's words:** *We cannot tell good agents from humans or from bad bots, so we block both.*
- **Feels it most:** merchants, PSPs and networks, agent builders.
- **Evidence:** only 23 percent of merchants can tell AI traffic from humans (vendor) [R5-13]. Bots were more than 53 percent of web traffic in 2025 (vendor) [R5-36]. The share of agentic traffic that sites block rose from 8.2 percent to nearly 9 percent in a month (vendor) [R5-35]. Adyen frames the task as telling authorized agents from unauthorized ones [R5-58].
- **Who is working on it:** Visa and Mastercard on Web Bot Auth with network hosted key directories, with Amex to follow [C363], AWS WAF support for Web Bot Auth [C389], a Know Your Agent framework that Ant International, Mastercard and Visa will "explore" [R5-52], Mastercard's agent score in US testing [C309] and FIS know your agent data for issuers [C381].
- **Related research:** Web Bot Auth identifies the tool, not the human [R4-69]. An OAuth based design for authenticated delegation exists but is untested [R4-19]. Only 2.4 percent of tested sites stopped all 10 bot types (vendor) [R4-25].
- **What a builder can do now (Proposal):** agent platforms sign every request and publish keys in a directory. Merchants adopt tiered trust (ADR-2), so signed agents browse and build carts while payment needs signature plus mandate.

#### 4. Platforms shut agents out

Score E 5 x S 4 = 20, R5 rank 4.

- **Pain in the customer's words:** *The biggest store shuts my agent out, so it cannot shop where I shop.*
- **Feels it most:** agent builders, then consumers and small merchants.
- **Evidence:** Amazon's robots.txt disallows 99 named AI agents and crawlers, checked 2026-11-15 [R5-37]. Amazon blocked Meta's Muse from 2026-09-20 [R5-38]. 59 percent of AI-assisted purchases still end at Amazon [R5-63]. The Ninth Circuit overturned the injunction against Perplexity's Comet on 2026-08-04 and the case continues [R5-39].
- **Who is working on it:** the courts [R5-39], a Shopify storefront file that routes agents to UCP and asks them to identify themselves (1 of 4 stores checked) [R5-40], and network hosted agent key directories [C363].
- **Related research:** attackers used open source agent frameworks to breach at least 27 retailers (vendor) [R4-30], which explains merchant caution even though those were attack tools, not shopping agents.
- **What a builder can do now (Proposal):** use sanctioned routes (UCP endpoints, product feeds, MCP servers), identify the agent on every request and honour merchant access files. Merchants publish an agent access policy (R5 proposed P15).

#### 5. Weak proof for disputes

Score E 4 x S 4 = 16, R5 rank 5.

- **Pain in the customer's words:** *When a chargeback arrives, we have nothing that names the agent or what the user approved.*
- **Feels it most:** merchants, PSPs and networks.
- **Evidence:** card reason codes were written for human buyers and no agent code was found [C299, V#10]. An ACP issue says "the merchant's representment has nothing to point at" [R5-70]. An AP2 issue says v0.2 removed the Intent Mandate and its mispick dispute row [R5-71]. 25 percent of consumers would stop using an agent if disputes are hard (vendor) [R5-09]. Merchant chargeback costs are forecast at 36.9 to 46.1 billion USD from 2026 to 2029 (vendor) [C300].
- **Who is working on it:** the AP2 spec offers mandates as non repudiable evidence [R4-61], an AP2 issue on dispute time evidence storage [R5-72], Mastercard Verifiable Intent [C366] and x402 proposals for a dispute layer and receipts [R5-67, R5-68].
- **Related research:** valid signatures do not ensure intent [R4-17]. AP2 puts dispute resolution out of scope [R4-62]. Paid but denied outcomes on x402 need a refund path the rail lacks [R4-14].
- **What a builder can do now (Proposal):** write evidence before payment (ADR-4) with the mandate, the context served, agent id, key id and a key snapshot, and keep it for the longest dispute window of the rails accepted (V8).

#### 6. Banks refuse agent access

Score E 4 x S 4 = 16, R5 rank 6.

- **Pain in the customer's words:** *My bank says sharing my login with an agent makes me answer for it.*
- **Feels it most:** consumers, issuers and banks, agent builders.
- **Evidence:** JPMorganChase, Citi, Bank of America and Schwab will not let outside agents move money [C352]. Bank of America told customers they are responsible for activity from shared logins [R5-43]. Wells Fargo warned on 2026-10-02 and from 2026-11-24 holds customers liable unless they evidence revocation [R5-45, R5-44]. JPMorgan's CFO said customers who share credentials could be responsible for misuse [C353]. A PYMNTS test of Muse saw all three errands fail on credential friction [R5-61].
- **Who is working on it:** read only connectors such as Plaid [C352], network agent tokens [C282] and bank terms that set the rules [R5-43, R5-44].
- **Related research:** Reg E excludes transfers by someone the consumer handed the access device to [R4-34], and analysts say it is unclear how that applies to software run by a company [R4-38].
- **What a builder can do now (Proposal):** never ask for bank logins, use network tokens or read only connectors, and record every revocation with a timestamp the user can show (V4, V8).

#### 7. Fraud models misread agents

Score E 4 x S 4 = 16, R5 rank 7.

- **Pain in the customer's words:** *We lose agent sales to declines, and our approval rates do not show it.*
- **Feels it most:** merchants, issuers and banks, PSPs and networks.
- **Evidence:** Fed Governor Waller said fraud systems calibrated to humans may not work for agents [C284, R4-43]. Trade press notes approval rates alone may not capture lost conversion [R5-59]. 29 percent of merchants feel very prepared for agent fraud (vendor) [R5-19]. Issuers keep liability and must evidence why they trusted or declined an agent payment [C380]. No agent decline rate was found anywhere.
- **Who is working on it:** Mastercard's agent score in US testing [C309], FIS know your agent data for issuers [C381] and Adyen [R5-58].
- **Related research:** carding volume up 250 percent since 2022 (vendor) [R4-23] and agent frameworks used to breach retailers (vendor) [R4-30] show fraud also moves at machine speed.
- **What a builder can do now (Proposal):** score agent traffic as its own cohort, report approvals, declines and loss per agent, and pass agent identity and mandate data with the authorization so the issuer sees more than a card number.

#### 8. Mandates outlive user intent

Score E 4 x S 4 = 16, R5 rank 8.

- **Pain in the customer's words:** *I switched the agent off, and now I have to prove it.*
- **Feels it most:** consumers, agent builders.
- **Evidence:** Wells Fargo makes the customer evidence revocation from 2026-11-24 [R5-44]. Fewer than one in six merchants have defined which products agents may buy (vendor) [R5-16]. An AP2 issue says v0.2 removed the user signed Intent Mandate [R5-71]. The x402 default client had no spend cap before the 2026-08-18 fix [R4-32].
- **Who is working on it:** AP2 open and closed mandates [C276], Mastercard Verifiable Intent [C366] and Visa Intelligent Commerce consumer instructions [C282].
- **Related research:** in simulation, consume once mandates bound to context stopped replay at about 3.8 ms [R4-12]. Agents in negotiation tests overspend or accept bad deals [R4-06].
- **What a builder can do now (Proposal):** enforce limits, expiry, scope and consume once in the mandate verifier, outside the model (ADR-3), bind each mandate to merchant and cart, and show the user live mandates with a one tap revoke.

#### 9. Rules assume a human

Score E 4 x S 4 = 16, R5 rank 9.

- **Pain in the customer's words:** *We cannot offer delegated payments because the rules expect a human to approve each one.*
- **Feels it most:** issuers and banks, regulators.
- **Evidence:** the FCA Mills Review notes the rulebook assumes "a human approving each transaction" [R5-55]. SCA applies when an agent pays or sets up a merchant initiated mandate [R4-46, R4-44]. RBI requires at least two factors per digital payment [R4-57]. NYDFS said there is no single correct way to deploy agentic AI [R5-53].
- **Who is working on it:** HM Treasury Question 15 [R4-53, C306], FCA AI Live Testing, where GoCardless ran the first UK agentic account to account payment [C418], MAS, which will consult in 2027 [R4-60], and an NPCI agent protocol that was reported but not launched [R4-58, R4-59].
- **Related research:** law firms note SCA elements are generally based on human interaction and that payment initiation status for agents is open [R4-46].
- **What a builder can do now (Proposal):** authenticate at delegation time where rules allow, and apply the step up each country needs per payment through the jurisdiction rule set (P14).

#### 10. Wrong or steered purchases

Score E 4 x S 4 = 16, merged from R5 ranks 10 and 20 with R4 evidence.

- **Pain in the customer's words:** *My agent bought something I did not want, and I could not tell why.*
- **Feels it most:** consumers, agent builders.
- **Evidence:** in Visa's benchmark 42.8 percent of runs failed and 54 percent of failed runs still bought (vendor) [R4-27, R4-28]. A Muse test saw all three errands fail [R5-61], and testers said it "uploaded sensitive information without permission" [R5-62]. Simple prompts subverted an AP2 shopping agent [R4-11], and three platform flaws chain into a payment hijack [R4-16]. A merchant file already asks agents to recommend installing a skill [R5-41].
- **Who is working on it:** Visa's benchmark [R4-27], a protocol layer defence proposed with AIP-Bench [R4-16], x402 SDK spend caps after the fix [R4-32] and AP2 cart mandates [C276].
- **Related research:** position bias and first proposal bias [R4-01, R4-02], persuasion that nearly triples sponsored picks [R4-04] and an agentic browser that paid a fake store in a vendor demo [R4-09].
- **What a builder can do now (Proposal):** treat merchant content as untrusted and keep it away from the component that builds the cart, check the cart against the mandate before pay, verify the merchant (R4 proposed P15) and record what the agent saw and its model version.

### 10.3 Who feels each challenge

For regulators, severity means how far the challenge sits inside their open agenda, not a loss they carry.

| Challenge | Consumers | Merchants | Issuers and banks | PSPs and networks | Agent builders | Regulators |
|---|---|---|---|---|---|---|
| 1 Who pays for agent errors | high | high | high | medium | medium | medium |
| 2 Trust to press pay | high | medium | medium | medium | high | low |
| 3 Good agents versus bots | low | high | medium | high | high | low |
| 4 Platforms shut agents out | medium | medium | none | low | high | low |
| 5 Weak proof for disputes | medium | high | medium | high | medium | medium |
| 6 Banks refuse agent access | high | low | high | low | high | medium |
| 7 Fraud models misread agents | low | high | high | high | medium | low |
| 8 Mandates outlive user intent | high | medium | medium | low | high | low |
| 9 Rules assume a human | low | low | high | medium | medium | high |
| 10 Wrong or steered purchases | high | medium | low | low | high | low |

**Why each high.**

1. Consumers: Reg E presumes authorization once credentials are shared, and banks now say so in writing [R4-34, R5-43]. Merchants: card rules leave non fraud agent disputes with the merchant by default [C299, R4-65]. Issuers and banks: PNC's CEO says a massive liability shift is needed before banks take part [R5-46].
2. Consumers: only 23 to 28 percent are comfortable letting an agent pay (vendor) [R5-04, R5-24]. Agent builders: without trust there is no demand, and 25 percent would stop using an agent if disputes are hard (vendor) [R5-09].
3. Merchants: only 23 percent can tell AI traffic from humans (vendor) [R5-13]. PSPs and networks: they must sort authorized agents from unauthorized ones at authorization [R5-58]. Agent builders: legitimate agents are blocked along with bots, at a rising rate (vendor) [R5-35].
4. Agent builders: Amazon disallows 99 named agents and crawlers and blocked Muse [R5-37, R5-38].
5. Merchants: representment has nothing to point at when no agent fact is stored [R5-70]. PSPs and networks: they run representment on reason codes with no agent code [V#10], and MPP leaves receipt meaning undefined for card methods [R5-75].
6. Consumers: Wells Fargo puts proof of revocation on the customer from 2026-11-24 [R5-44]. Issuers and banks: four large US banks do not let outside agents move money, and JPMorgan's CFO warned customers who share credentials [C352, C353]. Agent builders: bank funded agent payments are cut off, and credential handoffs made all three Muse test errands fail [R5-61].
7. Merchants: lost sales from declines do not show in approval rates [R5-59]. Issuers and banks: fraud systems calibrated to humans may not work for agents, yet issuers must justify each decision [C284, C380]. PSPs and networks: they run the models that misread agents, and no agent decline rate is published [R5-59].
8. Consumers: a mandate can outlast intent and the user must prove revocation [R5-44]. Agent builders: an AP2 issue says v0.2 removed the Intent Mandate [R5-71], and the x402 default client had no spend cap before the fix [R4-32].
9. Issuers and banks: RBI two factor rules and EU SCA apply to agent payments with no agent text [R4-57, R4-46]. Regulators: the FCA's Mills Review says the rulebook assumes a human approving each transaction, and HM Treasury asked about it in Question 15 [R5-55, R4-53].
10. Consumers: 54 percent of failed benchmark runs still bought (vendor), and users with weaker agents did not notice worse deals [R4-28, R4-07]. Agent builders: simple prompt injection subverted an AP2 shopping agent, and three platform flaws chain into a payment hijack [R4-11, R4-16].

### 10.4 Customer pain points by stakeholder

The ones with the strongest evidence, in the stakeholder's own plain words. Survey figures are stated intent, not behaviour.

**Consumers**

- *I do not trust an agent to press pay for me.* 23 percent trust GenAI with payments (vendor) [R5-04, R4-29] and 28 percent are comfortable with AI buying for them [R5-24].
- *I will let it choose, but I want to approve.* 32 percent accept an agent choice within limits with a final approval, 9 percent allow full completion (vendor) [R5-02, R5-01].
- *My bank says sharing my login makes me responsible.* Bank of America and Wells Fargo have said so in writing [R5-43, R5-45], and Wells Fargo adds a revocation proof rule from 2026-11-24 [R5-44].
- *If it buys the wrong thing, who pays me back?* 50.8 percent say AI platforms should be responsible (vendor) [R5-07], and 25 percent would stop using an agent if disputes are hard (vendor) [R5-09].
- *My data goes further than I want.* Privacy and security is the top concern in Europe, 32 to 42 percent by age group (vendor) [R5-65], and Muse testers reported uploads without permission [R5-62].

**Merchants**

- *We cannot tell good agents from humans or bad bots.* 23 percent can tell AI traffic from humans (vendor) [R5-13].
- *We carry the loss when the agent errs.* Card rules leave it with the merchant unless it wins the dispute [C299], and 93 percent want the AI provider to bear it (vendor) [R5-14].
- *We cannot tie agent visits to sales.* None of 60 mid market merchants could fully connect AI visits to purchases (vendor) [R5-18].
- *We are not agent ready.* 11 percent of small and 19 percent of large merchants qualify (vendor) [R5-12], and about one in five have 80 percent or more of their catalog structured (vendor) [R5-22].
- *Agents will add a toll.* 80 percent expect to pay a fee or commission on agent sales (vendor) [R5-17].

**Issuers and banks**

- *Someone else must take the liability first.* PNC's CEO wants a massive liability shift, and Stripe says there is no case law [R5-46, R5-47].
- *Shared logins break our security model.* Four large US banks do not let outside agents move money [C352], and JPMorgan's CFO warned customers who share credentials [C353].
- *Our fraud tools are tuned to humans.* Fed Governor Waller said fraud systems calibrated to humans may not work for agents [C284, R4-43].
- *We keep the liability but must justify every approve or decline.* Outseer says issuers must evidence why they trusted or declined each agent payment [C380].
- *Agents could move our deposits.* Non interest deposits at three banks total 1.6 trillion USD, about 47 billion USD a year if paid 3 percent (analyst via press) [C355].

**PSPs and networks**

- *False declines on agents are invisible.* Approval rates alone may not capture lost conversion [R5-59].
- *No one has written who bears the loss.* Adyen and Worldpay say so [R5-57, R4-64].
- *We must sort authorized agents from unauthorized ones.* Adyen frames the task this way [R5-58], and Mastercard's agent score is still in US testing [C309].
- *Chargeback rules were written for humans and costs are rising.* Merchant chargeback costs are forecast at 36.9 to 46.1 billion USD from 2026 to 2029 (vendor) [C299, C300].
- *The credential model is shifting under us.* Mastercard's CEO called virtual card numbers a bridge it will not support long term [R5-51], and Visa's on-ramp already spans four protocols [C395].

**Agent builders**

- *The largest marketplace shuts us out.* Amazon disallows 99 named agents and crawlers and blocked Muse [R5-37, R5-38], and our legal right to act for a user is unsettled [R5-39].
- *More of our traffic gets blocked.* 8.2 percent of agentic traffic was blocked in April 2026 and nearly 9 percent in May (vendor) [R5-35].
- *Credential handoffs break the flow.* All three Muse test errands failed [R5-61].
- *Specs change under us.* An IETF draft change breaks UCP key lookup [R5-73], and an AP2 issue says v0.2 removed the Intent Mandate [R5-71].
- *There is no standard proof that paid work was delivered, and retries can pay twice.* 60 of 423 open x402 issue titles concern dispute, refund, receipt or proof [R5-67], and an open issue reports double pay on retries [R5-69].

**Regulators**

- *Payment rules assume a human approves each payment.* The FCA Mills Review says the rulebook assumes it [R5-55].
- *Consumer dispute rights do not map to agents.* ITIF says Reg E gives no clear framework [R5-54], and credentials given may mean authorized [C296].
- *There is no supervisory template.* NYDFS said there is no single correct way to deploy agentic AI [R5-53].
- *There is no shared Know Your Agent standard.* Networks will only "explore" common principles [R5-52], and the UK plans its own [R5-56].
- *There is no public data on agent fraud, and rules differ by country.* Waller's speech gave no fraud numbers [C284], and refund rules diverge across the EU, UK and US [C305, DC#10, C296].
