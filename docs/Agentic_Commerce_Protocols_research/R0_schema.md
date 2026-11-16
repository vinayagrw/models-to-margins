# R0 Frozen schema for the agentic commerce protocols study

Frozen 2026-11-15 by the lead before Wave 1. Research agents fill this schema. They do not change it. If an agent finds a parameter that is missing, it adds a row under "Proposed additions" at the end of its own brief and the lead decides.

## 1. Parameters and variables

A parameter is a design choice the protocol or the builder makes once. A variable is a value a builder sets per agent, per user or per payment.

### A. Who acts

| ID | Parameter | Allowed values | Who decides | Why it matters |
|---|---|---|---|---|
| P1 | Initiator presence | human present in session, human not present (delegated), machine to machine | Protocol and merchant | Sets whether step up is possible and how disputes are judged |
| P2 | Payer type | consumer, business, agent owned wallet | Agent platform | Picks the legal regime (Reg E for consumers, UCC 4A or contract for business) |
| P3 | Agent identity method | none (payment is identity), signed HTTP requests with a key directory, network registered agent, verifiable credential or KYA token, OAuth client | Protocol and network | Lets a merchant tell a trusted agent from a bot |

### B. What the agent may do

| ID | Parameter | Allowed values | Who decides | Why it matters |
|---|---|---|---|---|
| P4 | Mandate type | none, implicit (credential handed over), token scoped limits, signed intent mandate (open), signed cart mandate (closed), consumer instructions held by the network | Protocol | Decides what proof exists that the user agreed |
| V1 | Spend limit | per payment, per period, per merchant | User or admin | Caps loss when the agent is wrong or hijacked |
| V2 | Expiry | minutes to months | User or platform | Shorter expiry lowers the stolen credential window |
| V3 | Scope | merchant, category, product, SKU list | User or admin | Stops an agent buying the wrong thing in the right amount |
| V4 | Revocation | user revokes, platform revokes, network revokes | Protocol | Without it a mandate outlives the user's intent |
| V5 | Step up threshold | amount or risk score that forces a passkey, 3DS or human approval | Issuer, merchant, platform | Balances friction against fraud |

### C. What pays

| ID | Parameter | Allowed values | Who decides | Why it matters |
|---|---|---|---|---|
| P5 | Credential | agentic network token, PSP scoped token, wallet account, stablecoin key, bank account mandate (UPI, Pix, VRP), virtual card | Payer and PSP | Decides who can see and reuse the payment detail |
| P6 | Rail | card network, real time account to account, stablecoin on chain, Lightning, wallet balance | Payer and merchant | Sets cost, speed, reach and reversibility |
| P7 | Finality | reversible by chargeback, final with refund by agreement | Rail | Decides who absorbs a bad purchase |

### D. Who is on the hook

| ID | Parameter | Allowed values | Who decides | Why it matters |
|---|---|---|---|---|
| P8 | Merchant of record | merchant, agent platform, marketplace | Contract | Owns tax, refunds and customer service |
| P9 | Dispute path | card reason codes, PSP or platform policy, signed mandate as evidence, none | Network and protocol | Card reason codes were written for human buyers |
| P10 | Liability holder | issuer when authenticated, merchant by default for card not present, agent platform by contract, user under an authorised presumption | Law, network rules, contract | The open question that slows adoption |

### E. How messages move

| ID | Parameter | Allowed values | Who decides | Why it matters |
|---|---|---|---|---|
| P11 | Transport | REST checkout API, HTTP 402 status and headers, MCP tool calls, A2A messages, agentic browser | Protocol | Sets who must change their stack |
| P12 | Crypto primitive | HTTP message signatures (RFC 9421, Ed25519), JWS or SD-JWT verifiable credentials, on chain signatures (EIP 712, EIP 3009), passkey or FIDO assertion, macaroons | Protocol | Decides what can be verified offline and by whom |
| P13 | Discovery | product feed, well known capability file, MCP server, open web | Merchant | An agent cannot buy what it cannot find |

### F. Where and under what rules

| ID | Parameter | Allowed values | Who decides | Why it matters |
|---|---|---|---|---|
| P14 | Jurisdiction | US, EU, UK, India, Singapore, Brazil, China, other | Law | Consent, refund and liability rules differ by country |

### G. Operations

| ID | Variable | Typical values | Why it matters |
|---|---|---|---|
| V6 | Idempotency key and retry policy | key per order, retry limits | Stops double charges when an agent retries |
| V7 | Order events | webhooks for created, updated, fulfilled, refunded | The agent must tell the user what happened |
| V8 | Evidence retention | signed mandate, cart, agent id, logs, kept N days | Needed to win a dispute |
| V9 | Fees | card fees, gas, protocol or platform fee | Decides which use cases pay off |
| V10 | Latency budget | milliseconds to seconds per payment | Pay per call needs sub second settlement |

## 2. Status model

Status is per protocol, per use case, with an `as_of` date.

Use cases: consumer checkout (C), B2B procurement (B), machine pay per call (M), payouts (P, covered by the payouts page, link only).

| Maturity | Meaning | Minimum evidence |
|---|---|---|
| Live | Real money in production, open to the public or to all merchants of a named platform | Rung 2 to 4 source dated within 90 days |
| Pilot | Real money with named partners or a closed group | Named partner, dated |
| Spec | Published spec or SDK, no verified real money use for this use case | Spec page |
| Unsettled | Rules, liability or market position not decided | Regulator or network statement |
| Absent | No product for this use case | Search noted as absence |

Evidence tags shown on the page are separate: verified 2026, vendor, illustrative.

## 3. Selection criteria for top 3 companies and top 3 startups

Score each candidate 0 to 5 on each criterion, multiply by the weight, and keep the evidence row id for every score.

| Criterion | Weight | Evidence needed |
|---|---|---|
| Authors or co-owns a protocol in this study | 25 | Spec or governance page |
| Live production evidence (verified, not vendor claim) | 25 | Rung 2 to 4 |
| Reach: merchants, issuers or agents connected | 20 | Disclosed count, tagged vendor if self reported |
| Moves in the last 90 days | 15 | Dated launch or partnership |
| Startups only: verified funding and named customers | 15 | Filing, investor page or credible press |

Company means a public company or a private firm over 10 years old. Startup means founded 2019 or later and not majority owned by an incumbent. Candidates must cover at least two stack layers or own one layer outright.

## 4. Stack layers used everywhere

1. Discover (catalog, capability discovery)
2. Intent and mandate (what the user allowed)
3. Agent identity (who the agent is)
4. Credential (what pays)
5. Rail (how money moves)
6. Settle (finality, reconciliation)
7. Dispute (refunds, chargebacks, liability)

## 5. Do not regress

These were checked against primary sources in earlier rounds. Change one only with a newer opened primary source, and log the change.

- The Travel Rule applies at 3,000 USD or more to wires and to stablecoin transfers through a money transmitter. 31 CFR 1010.100 excludes ACH, ATM and point of sale.
- MPP lists Tempo, Stripe, Lightning and Solana methods. It has no ACH method.
- In the payouts context AP2 and ACP are Spec.
- ChatGPT moved checkout to retailer sites in March 2026.
- Visa Direct and Mastercard Move had no agent payout product as of 1 Nov 2026.
- x402 moved under the Linux Foundation in April 2026 with 50 plus members.
- Analyst forecasts for agentic commerce in 2030 diverge about 25 times (190 billion to 5 trillion USD). Carry them as ranges with the author's incentive.

## 6. Rules for every research agent

- No em-dash and no semicolon anywhere in your brief.
- Plain wording a non specialist can follow.
- Only cite pages you opened. Give the URL, the date shown on the page, and a verbatim quote under 15 words.
- ISO dates. Tag vendor self reported figures as vendor.
- Never invent a source, a person, a number or a quote. If you cannot find it, say "not found" and where you looked.
- Grade each claim on the evidence ladder: 1 audited or reproduced, 2 primary record (spec, law, filing), 3 revealed behaviour (disclosed volume, on chain data), 4 deployment or live status, 5 independent survey or credible press, 6 stated intent or self report, 7 projection, vendor claim, unopened page. Add a "does not tell you" note per claim.
- Return a markdown brief, not JSON.
