# R3 Players and market

as_of: 2026-11-15. Lane: who is solving agent payments, how they score, market size, funding. Follows R0_schema.md. Baseline rows (C, V, W, S ids) come from R0_R3_players.md and R0_R5_pain.md. New rows carry R3 ids and are listed in section 9.

Evidence tags: verified 2026 means a page opened this round, vendor means the number comes from the company itself, illustrative is not used here.

## 1. Summary

- Top companies by weighted score: Google 400 of 425, Mastercard 400, Visa 380. Shopify (375) and Stripe (335) are next. The order inside the top three rests partly on vendor counts, so read the three as one tier.
- Top startups: Tempo 335 of 500, Rain 255, Skyfire 240. Tempo counts as a startup only provisionally, because Stripe and Paradigm incubated it and their stakes are not public. If Tempo is ruled out, Crossmint (180) takes third place.
- Every leader says agent payment volume is still small. Visa expects it to stay a very small part of its business for four quarters (R3-14). Mastercard's CEO said "It is still early days" (R3-17). Shopify said the volume is still small (R3-21).
- Measured activity is tiny next to the forecasts. x402 settled about 24.24 million USD in the 30 days to mid October 2026 (R3-27). Juniper sizes all of 2026 at 8 billion USD (R3-07).
- Forecasts for 2030 run from 190 billion USD (Morgan Stanley base case, US) to 5 trillion USD (McKinsey global high). ARK's 8 trillion USD, reported by a secondary source, would widen the range further. Scope drives the gap, so this brief carries them as ranges and never averages them.
- The nine verified startup rounds in 2025 and 2026 add up to about 941 million USD. Tempo and Rain take about 80 percent of that. The protocol-owning startup Skyfire has no verified round since October 2024.
- Moves in the window: Mastercard named OpenAI a strategic partner for Agent Pay (R3-17), Shopify put Shop Pay inside third-party agents using network tokens (R3-20), and Google said UCP gives direct checkout for hundreds of thousands of brands and will be combined with AP2 (R3-23).
- Visa's own shopping benchmark found a 57.2 percent pass rate, and 54 percent of failed runs still ended in a purchase (R3-15). Wrong purchases are a live risk, not a theory.
- Platforms can still refuse agents. Amazon blocked Meta's Muse agent from 2026-09-20 (R3-39), even though Amazon is listed as a UCP co-developer (R3-24). Reach claims depend on platform consent.
- Networks want agentic tokens, not single-use virtual cards (R3-18). That sets up a fight over the credential layer with Stripe, Crossmint, Rain and Prava, which all issue cards to agents.

## 2. Score table for all candidates

### 2.1 How the scores were set

Weights and criteria come from R0_schema section 3. Companies are scored on four criteria (maximum 425). Startups add the funding criterion (maximum 500). Weighted score is the 0 to 5 score times the weight, summed. Percent is the weighted score divided by the maximum.

Anchors used for each 0 to 5 score:

| Criterion | 5 | 4 | 3 | 2 | 1 | 0 |
|---|---|---|---|---|---|---|
| P Protocol (25) | sole or lead author of two protocols, or lead author of one with live use | co-author or co-maintainer | originator that handed it to a foundation, or author of an adjacent identity or regional protocol | listed co-developer or premier member of a governing body | endorser or implementer | none |
| L Live production (25) | independent proof of real money at scale in the last 90 days | public live product plus an independent source confirming it | public GA or rollout stated by the company, or on-chain data | vendor self report only, or a pilot with a named partner | beta, demo or closed preview | none found |
| R Reach (20) | 100 million users, all issuers in a region, or 100,000 merchants | tens of millions of users, 50 live partners, or 1 million merchants | 100 or more partners, services or 10,000 users | tens of partners | named partners, no count | nothing disclosed |
| M Moves in 90 days, 2026-08-17 to 2026-11-15 (15) | three or more own dated moves | two | one | minor own update | only a third party move involving them | none found |
| F Funding and customers, startups only (15) | verified large round plus named customers | verified round plus named partners | verified round only | round seen in credible press, not opened | aggregator data only | none |

Layers use R0_schema section 4: 1 Discover, 2 Intent and mandate, 3 Agent identity, 4 Credential, 5 Rail, 6 Settle, 7 Dispute.

### 2.2 Companies

| Rank | Candidate | Layers | P | L | R | M | Weighted (of 425) | Percent | Evidence ids |
|---|---|---|---|---|---|---|---|---|---|
| 1 (tie) | Google | 1, 2, 4 | 5 | 4 | 5 (vendor) | 5 | 400 | 94.1 | P: C276, C281, R3-24. L: C313, R3-21. R: R3-23, R3-24. M: C313, R3-21, R3-23 |
| 1 (tie) | Mastercard | 2, 3, 4, 5, 7 | 5 | 4 | 5 (vendor) | 5 | 400 | 94.1 | P: C366, W#16, C356. L: R3-20, C360. R: C360, V#6. M: R3-17, R3-19, C309 |
| 3 | Visa | 2, 3, 4, 5, 6 | 5 | 4 | 4 (vendor) | 5 | 380 | 89.4 | P: C364, V#5, C395. L: R3-20, C349, C351, R3-14. R: R3-14, C361, C362. M: C349, R3-14, R3-16, R3-15 |
| 4 | Shopify | 1, 2, 4 | 4 | 4 | 5 (vendor) | 5 | 375 | 88.2 | P: R3-24, R3-21. L: R3-20, R3-22. R: R3-20. M: C310, C311, R3-20 |
| 5 | Stripe | 2, 4, 5, 6 | 5 | 3 | 3 (vendor) | 5 | 335 | 78.8 | P: C278, C370, S#2, R3-25. L: C312, C371, R3-29. R: R3-29. M: R3-29, R3-30, C420 |
| 6 | Ant Group (Alipay) | 2, 4, 5 | 3 | 3 | 5 (vendor) | 3 | 295 | 69.4 | P: R3-13. L: R3-38. R: R3-38. M: C365 |
| 7 | OpenAI | 1, 2 | 4 | 2 | 4 (vendor) | 2 | 260 | 61.2 | P: C278, R3-25. L: C359. R: R3-13. M: R3-17, C104 |
| 8 (tie) | Coinbase | 4, 5, 6 | 3 | 3 | 3 | 0 | 210 | 49.4 | P: R3-26, R3-28. L: R3-27, C285. R: R3-27. M: none found |
| 8 (tie) | PayPal | 1, 4, 7 | 1 | 3 | 4 (vendor) | 2 | 210 | 49.4 | P: R3-32, R3-33. L: R3-34. R: R3-32. M: W#6 |
| 10 | Amazon (AWS and retail) | 2, 3, 4 | 2 | 3 | 0 | 4 | 185 | 43.5 | P: R3-24. L: C384. R: none disclosed. M: C384, R3-39 |
| 11 | Cloudflare | 3 | 3 | 3 | 1 | 0 | 170 | 40.0 | P: C363, R3-26. L: C363, C389. R: C363. M: none found |
| 12 | Microsoft | 1, checkout surface | 2 | 3 | 1 | 0 | 145 | 34.1 | P: R3-24. L: R3-34. R: R3-21. M: none found |
| 13 | American Express | 3, 4, 7 | 2 | 1 | 0 | 3 | 120 | 28.2 | P: C372, C316, R3-26. L: C372. R: none disclosed. M: C316 |
| 14 | Fiserv | 3, 5 | 2 | 1 | 1 | 0 | 95 | 22.4 | P: R3-26. L: C414, C415. R: C414. M: none found |
| 15 | Adyen | 1, 4, 7 | 2 | 1 | 0 | 0 | 75 | 17.6 | P: R3-35, R3-26. L: R3-35. R: none disclosed. M: none found |
| 16 | Worldpay | 4, 5 | 1 | 1 | 0 | 0 | 50 | 11.8 | P: R3-24 (endorser). L: R3-13. R: none. M: none found |
| 17 | JPMorgan Payments | 4, 5 | 0 | 1 | 0 | 1 | 40 | 9.4 | P: none. L: R3-36. R: none. M: C355 (restrictive move) |

Notes on company scores:

- Google and Mastercard tie. Their lead over Visa comes from reach, which is vendor reported for all three. Under the rule that vendor numbers never decide a ranking alone, the three are reported as one tier. Visa beats Shopify on protocol authorship (spec evidence), not on vendor numbers.
- Stripe gets L 3, not 4. Its recent live claims (Link in 200 plus agents, Link purchases up 38 times) are self reported, and its flagship ACP deployment, ChatGPT Instant Checkout, was withdrawn in March 2026 (C359).
- Coinbase gets P 3 because x402 now sits in the x402 Foundation under the Linux Foundation, with Coinbase as one of 17 premier members (R3-26, R3-28).
- Amazon is listed as a UCP co-developer on ucp.dev (R3-24) while blocking third-party shopping agents on its own store (R3-39).

### 2.3 Startups

Startup test: founded 2019 or later and not majority owned by an incumbent. Founding years were not opened this round unless noted.

| Rank | Candidate | Age and ownership check | Layers | P | L | R | M | F | Weighted (of 500) | Percent | Evidence ids |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Tempo | public launch 2025, incubated by Stripe and Paradigm, stakes not disclosed. Provisional | 5, 6, transport | 5 | 3 | 3 (vendor) | 1 | 4 | 335 | 67.0 | P: C370, S#2. L: R3-42, C371, C384. R: R3-42. M: C384. F: R3-41, R3-42 |
| 2 | Rain | founding year not opened | 2, 4, 5 | 1 | 2 | 3 (vendor) | 3 | 5 | 255 | 51.0 | P: C416. L: C399. R: R3-43. M: C400, C416. F: R3-43 |
| 3 | Skyfire | founded 2024 per R3-54 | 3, 4, 5 | 4 | 2 | 0 | 3 | 3 | 240 | 48.0 | P: C367. L: R3-54. R: none disclosed. M: C367. F: R3-53 |
| 4 | Crossmint | founding year not opened | 4, 5, checkout | 1 | 2 | 0 | 4 | 3 | 180 | 36.0 | P: R3-52, C416. L: R3-52. R: none opened. M: R3-52, C416. F: R3-51 |
| 5 | Kite AI | founding year not opened | 3, 5 | 1 | 2 | 2 (vendor) | 0 | 3 | 160 | 32.0 | P: R3-48. L: R3-48. R: R3-48. M: none found. F: R3-47 |
| 6 | Basis Theory | founding year not opened | 2, 4 | 2 | 2 | 0 | 0 | 3 | 145 | 29.0 | P: R3-49. L: R3-49. R: none. M: none found. F: R3-49 |
| 7 | Paid | founded with a 2025 pre-seed per R3-50 | 6 only (billing). Fails the two layer test | 0 | 2 | 1 | 0 | 4 | 130 | 26.0 | L: R3-50. R: R3-50. F: R3-50 |
| 8 | Catena Labs | founding year not opened | 2, 6 | 0 | 1 | 0 | 3 | 3 | 115 | 23.0 | L: R3-44. M: R3-45. F: R3-44 |
| 9 | Natural | founding year not opened | 4, 5, 6 | 0 | 2 | 0 | 0 | 3 | 95 | 19.0 | L: C398. F: C398 |
| 10 | Sapiom | founding year not opened | 2, 5 | 0 | 0 | 0 | 0 | 3 | 45 | 9.0 | F: R3-46. Usage claims seen in search only |
| 11 | Prava | not verified | 4 only. Fails the two layer test | 0 | 1 | 0 | 0 | 0 | 25 | 5.0 | L: R3-55 |
| n/a | Lithic | grew out of Privacy.com, likely older than 2019, not re-verified. Treated as ineligible | 4 | 1 | 0 | 0 | 0 | 0 | 25 | 5.0 | P: C416 (alliance member) |
| n/a | Nekuda | not verified | 2, 4 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 5M USD seed seen in search only, page blocked |
| n/a | Payman | not verified | 2, 5 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | aggregator figures conflict, nothing opened |
| n/a | GrailPay | not verified | 3 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 10.5M USD Series A seen in search only, page returned 402 |

Sensitivity check. If every vendor-only reach score is cut to 2, companies become Google 340, Mastercard 340, Visa 340, Shopify 315, Stripe 315. Startups become Tempo 315, Skyfire 240, Rain 235, Crossmint 180. The top three in both lists keep the same members.

## 3. Top 3 companies

### Google (400 of 425)

- Problem they are solving: an agent needs one common way to find products, build a cart and pay at any merchant, with proof that the user agreed.
- How: layer 1 Discover (UCP catalog and checkout), layer 2 Intent and mandate (AP2 signed mandates, C276), and payment handoff through UCP payment handlers (R3-24). Backs AP2 as author and UCP as co-developer with Shopify (C281, R3-24).
- Strategy in one line: make Search AI Mode and Gemini the place where agents shop, and make Google's open protocols the default plug for merchants.
- Three most important moves:
  - 2025-09-16: AP2 announced with signed mandates (V#7, C276).
  - 2026-01-11: UCP published with Shopify, with PayPal support the same day (R3-21, R3-33).
  - 2026-10-15: Universal Cart rolled out in the US across Search and Gemini, with UCP checkout (C313). On 2026-10-28 Google said UCP gives direct checkout for hundreds of thousands of brands and is being combined with AP2 (R3-23, vendor).
- Not solved: large brand adoption (a May count found 26 UCP implementations and no large brands, R3-21). No transaction volume disclosed (R3-23). No card dispute rule yet treats an AP2 mandate as evidence (schema P9, see R4).
- Risk to position: large retailers can block agents (R3-39). ACP, UCP and Alipay's own protocol split merchant effort (R3-13). The brand count is a vendor claim from an earnings call.

### Mastercard (400 of 425)

- Problem they are solving: let an agent pay with a card while issuer and merchant can see that a real cardholder authorised that agent and that purchase.
- How: layer 3 Agent identity (agent keys in a Mastercard directory via Web Bot Auth, C363), layer 2 Intent (Verifiable Intent, C366), layer 4 Credential (agentic tokens, R3-18), layer 5 Rail (card network, and Agent Pay for Machines across cards, accounts and stablecoins, C419), layer 7 support (agent transaction score in US testing, C309). Backs its own Agent Pay and Verifiable Intent, co-chairs the FIDO payments group (C356), and is an MPP design partner (R3-42) and x402 premier member (R3-26).
- Strategy in one line: make the agentic token, not a one-time virtual card, the standard credential inside every agent (R3-18).
- Three most important moves:
  - 2026-03-05: Verifiable Intent spec and reference code open sourced (C366, W#16).
  - 2026-06-02: all European issuers enabled at network level and 36 banks completed controlled live agent transactions (C360, vendor).
  - 2026-10-29: broad strategic partnership with OpenAI that includes Agent Pay, disclosed on the Q3 call (R3-17).
- Not solved: volume, which the CEO called not yet significant (R3-17). Accuracy and pricing of the agent score are not disclosed (C309). No published rule on who pays when an agent buys the wrong thing (none found for Mastercard).
- Risk to position: machine payments may settle on stablecoin rails it does not run (R3-27, R3-42). Single-use virtual card issuers such as Stripe offer a path around the agentic token (R3-18). The OpenAI deal was described by Mastercard only, so its terms are unknown.

### Visa (380 of 425)

- Problem they are solving: the same consumer problem as Mastercard, plus agents that pay business invoices.
- How: layer 3 Agent identity (Trusted Agent Protocol with RFC 9421 signatures, C364, and Agentic Directory, C104), layer 4 Credential (Intelligent Commerce tokens, C282), layer 2 Intent (consumer instructions held by Visa, C282), layer 5 Rail. Intelligent Commerce Connect is a protocol-agnostic on-ramp that supports TAP, MPP, ACP and UCP (C395).
- Strategy in one line: be the neutral trust layer that every agent protocol routes through ("Visa's role is clear: delivering trust.", R3-14).
- Three most important moves:
  - 2026-04-08: Intelligent Commerce Connect launched in pilot with AWS, Highnote, Mesh and Payabli (C395).
  - 2026-10-20: live pilot with BILL and Billtrust for agent-paid invoices (C349).
  - 2026-10-27: CEO said nearly 50 AI partners are live in production and Ramp agentic bill pay is generally available (R3-14, vendor).
- Not solved: the B2B pilot has no formal liability framework and no disclosed volumes (C351). Its own benchmark shows 54 percent of failed runs still bought something, and only 23 percent of US consumers trust AI with payments (R3-15).
- Risk to position: the CEO expects agent activity to stay a very small part of the business over the next four quarters (R3-14), so spend runs ahead of revenue. Machine payments are moving onto x402 and MPP, though Visa is an x402 premier member and an MPP extension author (R3-26, R3-42).

## 4. Top 3 startups

### Tempo (335 of 500, eligibility provisional)

- Problem they are solving: agents paying per API call need cheap, fast and final settlement that card rails do not offer.
- How: layer 5 Rail and layer 6 Settle on the Tempo payments chain, with MPP carrying payment over HTTP 402 (C370). MPP lists Tempo, Stripe, Lightning and Solana methods and has no ACH method (S#2).
- Strategy in one line: pair an open HTTP payment protocol with a payments chain and Stripe's merchant reach.
- Three most important moves:
  - 2025-10-17: 500 million USD Series A at about 5 billion USD, led by Thrive Capital and Greenoaks (R3-41).
  - 2026-03-18: mainnet and MPP went live with more than 100 MPP-compatible services and design partners including Visa, Mastercard, OpenAI and Anthropic (R3-42).
  - 2026-08-18: AWS made AgentCore payments generally available with MPP support (C384).
- Not solved: no public transaction volume (R3-42). Stablecoin settlement is final, so refunds depend on agreement (schema P7). No bank debit method (S#2).
- Risk to position: independence is unclear. Stripe and Paradigm incubated Tempo and their stakes are not disclosed, so it may fail the startup test (R3-41). x402 has a broader foundation with 17 premier members that include Stripe itself (R3-26).

### Rain (255 of 500)

- Problem they are solving: businesses want to give agents real spending power with hard limits, on cards that work wherever Visa works, funded by stablecoins.
- How: layer 4 Credential (scoped virtual cards), layer 2 Intent (Agent Control Layer limits enforced at card issuance and transfer start, C399), layer 5 Rail (stablecoin-funded Visa cards, R3-43). No protocol of its own. Convenes the Agentic Payments Alliance (C416).
- Strategy in one line: be the card issuing and stablecoin platform for agent builders, and host the standards conversation.
- Three most important moves:
  - 2026-01-09: 250 million USD Series C led by ICONIQ at 1.95 billion USD (R3-43).
  - 2026 (date not shown): Agent Control Layer beta, with agents already spending on its scoped cards and Sponge named as a partner (C399, vendor).
  - 2026-08-18: launched the Agentic Payments Alliance with 26 founding members including Visa, Mastercard, Fiserv and Circle (C416).
- Not solved: the agent product is in beta and agent volume is not split out from card volume (C399, R3-43). The alliance has no published spec yet (C416).
- Risk to position: it depends on Visa's network and on stablecoin rules. Stripe's Issuing for agents (C371) and the networks' own tokens (R3-18) compete for the same credential layer.

### Skyfire (240 of 500)

- Problem they are solving: a merchant or API cannot tell which agent is calling or who stands behind it.
- How: layer 3 Agent identity (KYA tokens with agent, platform and human principal claims, C367), layer 4 Credential and layer 5 Rail (KYAPay with stablecoin settlement, R3-54). Backs its own KYAPay, an individual IETF draft (C367).
- Strategy in one line: own "know your agent" identity and attach payment to it.
- Three most important moves:
  - 2024-10-24: Coinbase Ventures and a16z CSX funding took the total to 9.5 million USD (R3-53).
  - 2026-04-09 (report date): publicly confirmed AP2 support, per a secondary analysis (R3-54).
  - 2026-10-02: KYAPay draft -01 published at the IETF (C367).
- Not solved: KYAPay has no formal standing (C367). Checkout adoption was described as basically zero, with developer API billing as the main use (R3-54). Reach is not disclosed.
- Risk to position: Visa and Mastercard run their own agent directories (C104, C363), and Ant, Mastercard and Visa are building a shared know-your-agent framework (C365), which could make a startup identity layer redundant. No 2025 or 2026 round was found.

## 5. Runners up and ones to watch

- Shopify (375): co-developed UCP, put Shop Pay inside Muse, Claude Duet and Instinct with network tokens (R3-20). Misses the top three only on protocol authorship.
- Stripe (335): co-authors ACP and MPP, but its live claims are self reported and ChatGPT Instant Checkout ended (C359, R3-29).
- Ant Group (295): 120 million Alipay AI Pay transactions in one week (R3-38, vendor) and its own China protocol (R3-13). Largest reported volume anywhere, outside the Western protocol stack.
- OpenAI (260): ACP co-author, but checkout moved to retailer sites in March 2026 (C359). Now a partner of both networks (C104, R3-17).
- Coinbase (210): x402 originator, now one of 17 premier members of the x402 Foundation (R3-26). No own move found in the window.
- PayPal (210): no protocol of its own, but supports ACP and UCP and sits in Copilot Checkout (R3-32, R3-33, R3-34).
- Amazon (185): AgentCore payments GA with MPP and x402 (C384) while blocking outside agents on its store (R3-39).
- Cloudflare (170): Web Bot Auth underpins Visa TAP and Mastercard Agent Pay identity checks (C363).
- Crossmint (180, startup): live self-serve toolkit using both networks' agent tokens (R3-52). First in line if Tempo is ruled out.
- Kite AI (160, startup): mainnet and Agent Passport live with 90 plus providers (R3-48, vendor).
- Catena Labs (115, startup): OCC preliminary conditional approval for an agent-focused trust bank on 2026-09-18 (R3-45). Watch for the final charter.
- Tencent: signed exploratory agent payment MoUs with Visa (2026-10-29) and Mastercard (2026-11-02) (R3-16, R3-19). Not scored, as nothing is live.

## 6. Forecasts

Carried as ranges. Not averaged. All are projections (rung 7).

| Author | Number | Target year | Scope definition | Geography | Published | Author's commercial incentive | Claim |
|---|---|---|---|---|---|---|---|
| McKinsey | up to 1 trillion USD (US), 3 to 5 trillion USD (global) | 2030 | "orchestrated" retail revenue through AI agents. The opened article does not define the term | US and global | 2025-10-20 (via Digital Commerce 360) | sells strategy and transformation consulting to retailers and payment firms | R3-01 |
| Morgan Stanley | about 190 billion USD (base) to about 385 billion USD (bull), 10 to 20 percent of US e-commerce | 2030 | agentic gross merchandise value from AI shopping assistants | US | 2025-11-29 and 2025-12-09 | investment bank whose research covers e-commerce and payments stocks, and whose banking arm earns fees from those sectors | R3-02, R3-03 |
| Bain | 300 to 500 billion USD, 15 to 25 percent of online retail | 2030 | purchases agents initiate, influence or complete. Excludes AI-only search and discovery | US | 2025-12-22 | sells retail and technology consulting | R3-04 |
| Gartner | more than 15 trillion USD of B2B spend intermediated | 2028 | B2B buying intermediated by AI agents (90 percent of B2B buying) | global | 2025-11-28 (press release itself blocked) | sells research subscriptions and advice to IT buyers and vendors | R3-05 |
| Edgar Dunn | 2.9 trillion USD, 29 percent of e-commerce, 185 percent yearly growth 2026 to 2030 | 2030 | retail transaction flows only | not stated | 2026-04-01 | payments strategy consultancy that advises acquirers and payment firms. The article urges acquirers to act now | R3-06 |
| Juniper Research (April) | 8 billion USD in 2026 to 1.5 trillion USD | 2030 | spending where agents handle discovery to payment | global | 2026-04-08 | sells the paywalled forecast report | R3-07 |
| Juniper Research (June) | 8 billion USD in 2026 to 3.5 trillion USD | 2031 | total agentic commerce transaction value | global | 2026-07-09 | sells the paywalled forecast report | R3-08 |
| eMarketer | 20.9 billion USD in 2026 to 144 billion USD, 8.8 percent of e-commerce | 2029 | sales through AI platforms such as ChatGPT, Google and Perplexity | US (per secondary source) | 2026-01-27 (secondary) | sells research subscriptions to marketers and retailers | R3-09 |
| ARK Invest | 8 trillion USD | 2030 | online consumer spending facilitated by AI agents | not stated | 2026-05-10 (secondary) | asset manager that markets innovation-themed funds | R3-10 |
| WARC and PHD | 944 billion USD in 2026 to 3.35 trillion USD, 1.3 to 3.8 percent of global consumer spending | 2030 | spending AI agents facilitate, meaning influence or complete | global | 2026-07-22 | WARC sells marketing research, PHD is a media agency | R3-11 |
| BCG | 12.5 trillion JPY in 2026 to 15.6 trillion JPY, 18 to 21 percent of spending in 14 categories | 2030 | purchases where AI materially shapes the choice (level L2 and above), from a survey of 3,606 people | Japan | 2026-11-02 | sells consulting | R3-12 |
| Forrester | no number | none | consumer adoption low and stagnant | none | 2026-04-09 | sells research subscriptions | R3-13 |

How to read the ranges:

- US 2030: 190 billion USD (Morgan Stanley base) to 1 trillion USD (McKinsey). About a fivefold spread.
- Global 2030: 1.5 trillion USD (Juniper) to 5 trillion USD (McKinsey high). If ARK's secondary-reported 8 trillion USD counts, the high end rises.
- Do not regress: the 190 billion to 5 trillion USD band for 2030 (about 25 times) stays. ARK would widen it to about 42 times, but it was read through a secondary source, so it is logged for the lead and not applied.
- Even the 2026 base differs. Juniper says 8 billion USD globally, eMarketer says 20.9 billion USD for US AI platforms. Different scopes again.

Measured activity, not forecasts:

| Measure | Value | Date | Claim |
|---|---|---|---|
| x402 settled volume, 30 days | 24.24 million USD, 75.41 million transactions | to mid October 2026 | R3-27 |
| x402 adjusted volume (Visa and Artemis) | about 19 million USD | 2026-04-21 | C285 |
| Alipay AI Pay transactions | over 120 million in one week, value not given (vendor) | 2026-02-05 to 2026-02-11 | R3-38 |
| Share of transactions involving agents (Checkout.com data) | 3 percent, undefined | 2026-07 | R3-40 |
| Visa agent volumes | not disclosed, "very small" for four quarters | 2026-10-27 | R3-14 |

## 7. Funding

Verified rounds in 2025 and 2026, pages opened this round or in the R0 baseline.

| Company | Round | Amount | Date | Lead | Source type | Claim |
|---|---|---|---|---|---|---|
| Tempo | Series A | 500 million USD, about 5 billion USD valuation | 2025-10-17 | Thrive Capital, Greenoaks | trade press citing Fortune, anonymous sources | R3-41 |
| Rain | Series C | 250 million USD, 1.95 billion USD valuation | 2026-01-09 | ICONIQ | trade press | R3-43 |
| Sapiom | Series A | 35 million USD | 2026-08-05 | Dragonfly | trade press, partly paywalled | R3-46 |
| Basis Theory | Series B | 33 million USD | 2025-10-14 | Costanoa Ventures | company blog | R3-49 |
| Catena Labs | Series A | 30 million USD | 2026-05-20 | a16z crypto, Acrew Capital | trade press | R3-44 |
| Natural | Series A | 30 million USD | 2026-07-20 | Forerunner | trade press | C398 |
| Crossmint | round type not stated | 23.6 million USD | 2025-03-18 | Ribbit Capital | trade press | R3-51 |
| Paid | Seed | 21.6 million USD | 2025-09-28 | Lightspeed | national tech press | R3-50 |
| Kite AI | Series A | 18 million USD | 2025-09-02 | PayPal Ventures, General Catalyst | national press | R3-47 |

Total of the nine verified rounds: about 941 million USD. Tempo and Rain are about 80 percent of it.

Seen in search but not opened, so not counted: Nekuda 5 million USD seed led by Madrona with Amex Ventures and Visa Ventures (2025-05), GrailPay 10.5 million USD Series A led by MissionOG (2026-06-25), Rain 58 million USD Series B led by Sapphire (2025-08), Sapiom 15 million USD seed led by Accel (2026-02). Payman figures conflict across aggregators. Prava shows only a small grant in one profile. Skyfire's last verified funding is October 2024 (R3-53).

## 8. Changes 2026-10-22 to 2026-11-15

| Date | Change | Who | Claim |
|---|---|---|---|
| 2026-10-27 | Visa CEO said agent payments hit "a bit of a tipping point", nearly 50 AI partners live, Ramp agentic bill pay GA, Anthropic commerce blueprints coming. Volumes not disclosed | Visa | R3-14 |
| 2026-10-28 | Shopify Fall '26: Shop Pay inside Muse, Claude Duet and Instinct, purchases from brands off Shopify use Mastercard, Visa and Discover tokens, Amex coming | Shopify | R3-20 |
| 2026-10-28 | Alphabet Q3: UCP direct checkout for hundreds of thousands of brands, UCP to be combined with AP2, Gemini agents later this year | Google | R3-23 |
| 2026-10-29 | Mastercard Q3: broad strategic partnership with OpenAI including Agent Pay. CEO said single-use virtual cards are not a lasting answer | Mastercard, OpenAI | R3-17, R3-18 |
| 2026-10-29 | Tencent and Visa MoU to explore agent payments with Visa Intelligent Commerce | Visa, Tencent | R3-16 |
| 2026-10-29 | PayPal agent tools catalog updated, 50 tools, no payouts tool | PayPal | W#6 |
| 2026-11-02 | Tencent and Mastercard proposed MoU, agent payments as a later phase | Mastercard, Tencent | R3-19 |
| 2026-11-02 | BCG sizes Japan's agentic commerce at 12.5 trillion JPY for 2026 | BCG | R3-12 |
| 2026-11-03 | Shopify Q3: AI search orders up 3.3 times, first delegated purchasing through personal agents | Shopify | R3-21, R3-22 |
| 2026-11-05 | Visa benchmark: 57.2 percent pass rate, 54 percent of failed runs still bought | Visa | R3-15 |

Just before the window, kept for context: 2026-10-20 Visa, BILL and Billtrust pilot (C349), 2026-10-21 Stripe Treasury for agents and Link in Claude Duet (R3-29, R3-30).

No change found in the window: no new protocol, no status change for ACP, AP2, UCP, MPP or x402, and no new startup round among the names searched. Stripe's newsroom has no MPP, ACP or Tempo release in October or November 2026 (R3-31).

## 9. Claim table

| id | claim | number | unit | event_date | publish_date | url | quote | source_tier | kind | rung | does not tell you | confidence |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| R3-01 | McKinsey forecasts up to 1 trillion USD of orchestrated US retail revenue through agents by 2030, and 3 to 5 trillion USD globally | 1 (US), 3 to 5 (global) | trillion USD | 2030 | 2025-10-20 | https://www.digitalcommerce360.com/2025/10/20/mckinsey-forecast-5-trillion-agentic-commerce-sales-2030/ | "could generate as much as $1 trillion in orchestrated U.S. retail revenue by 2030" | analyst via trade press | forecast | 7 | what "orchestrated" means, method, whether services or B2B count | medium |
| R3-02 | Morgan Stanley puts US agentic GMV at about 190 billion USD (base) and about 385 billion USD (bull) in 2030, 10 to 20 percent of US e-commerce | 190 to 385 | billion USD | 2030 | 2025-11-29 | https://finance.yahoo.com/news/morgan-stanley-sees-multi-path-093502239.html | "Morgan Stanley stresses that consumer behavior still sits in its early stages" | analyst via trade press | forecast | 7 | assumptions behind each case, category mix | medium |
| R3-03 | Morgan Stanley says agentic shoppers could drive up to 385 billion USD of US online sales by 2030 | 385 | billion USD | 2030 | 2025-12-09 | https://www.digitalcommerce360.com/2025/12/09/morgan-stanley-ai-agentic-shoppers-385-billion-online-sales/ | "potentially driving up to $385 billion in U.S. online sales by 2030" | analyst via trade press | forecast | 7 | the base case and method | medium |
| R3-04 | Bain sizes US agentic commerce at 300 to 500 billion USD by 2030, 15 to 25 percent of online retail, counting purchases agents initiate, influence or complete | 300 to 500 | billion USD | 2030 | 2025-12-22 | https://www.digitalcommerce360.com/2025/12/22/bain-agentic-ai-us-ecommerce-sales-2030/ | "could reach $300 billion to $500 billion by 2030" | analyst via trade press | forecast | 7 | how "influence" is measured | medium |
| R3-05 | Gartner says AI agents will intermediate more than 15 trillion USD of B2B spend by 2028, 90 percent of B2B buying | 15 | trillion USD | 2028 | 2025-11-28 | https://www.digitalcommerce360.com/2025/11/28/gartner-ai-agents-15-trillion-in-b2b-purchases-by-2028/ | "AI agents will intermediate more than $15 trillion in B2B spending by 2028" | analyst via trade press | forecast | 7 | how much of that an agent actually pays, method. Gartner release returned 403 | medium |
| R3-06 | Edgar Dunn projects 2.9 trillion USD of retail transaction flows through agents by 2030, 29 percent of e-commerce, 185 percent yearly growth from 2026 | 2.9 | trillion USD | 2030 | 2026-04-01 | https://www.edgardunn.com/articles/acquirers-should-act-now-to-position-as-agentic-commerce-native | "will reach $2.9 trillion in retail transaction flows alone by 2030" | consultancy primary | forecast | 7 | geography, method. The article says it is not the firm's official opinion | medium |
| R3-07 | Juniper projects agentic commerce spending rising from 8 billion USD in 2026 to 1.5 trillion USD by 2030 | 1.5 | trillion USD | 2030 | 2026-04-08 | https://technode.global/2026/04/08/agentic-commerce-spending-can-reach-1-5-trillion-by-2030-study-finds/ | "projects that spending on agentic commerce will reach $1.5 trillion by 2030" | analyst via trade press | forecast | 7 | method, regional split. Report is paywalled | medium |
| R3-08 | Juniper's later study projects transaction value from 8 billion USD in 2026 to 3.5 trillion USD by 2031, users from under 300 million to 1.3 billion | 3.5 | trillion USD | 2031 | 2026-07-09 | https://hellopartner.com/agentic-commerce-users-could-reach-1-3-billion-globally-by-2031-new-research-forecasts/ | "total agentic commerce transaction value will rise to $3.5tn in five years' time" | analyst via trade press | forecast | 7 | why it differs from Juniper's April figure | medium |
| R3-09 | eMarketer projects AI platform sales of 144 billion USD by 2029, 8.8 percent of e-commerce, and 20.9 billion USD in 2026 | 144 | billion USD | 2029 | 2026-01-27 | https://stellagent.ai/insights/emarketer-ai-commerce-2026-forecast | "AI commerce is set to account for 8.8% of total e-commerce sales" | analyst via aggregator blog | forecast | 7 | checkout inside AI platforms versus referrals. eMarketer pages returned 403 | low |
| R3-10 | ARK Invest says AI agents could facilitate 8 trillion USD of online consumer spending by 2030 | 8 | trillion USD | 2030 | 2026-05-10 | https://finance.yahoo.com/sectors/technology/articles/ai-agents-coming-online-shopping-133434129.html | "AI agents could facilitate $8 trillion in online consumer spending by 2030" | asset manager via press | forecast | 7 | geography, method. ARK's own page not opened | low |
| R3-11 | WARC and PHD project global consumer agentic AI spending from 944 billion USD in 2026 to 3.35 trillion USD in 2030, 1.3 to 3.8 percent of consumer spending | 3.35 | trillion USD | 2030 | 2026-07-22 | https://manifest-media.in/advertising/220726/ai-agents-to-influence-usd-335-trillion-in-consumer-spending-by-2030-s.html | "AI agents are increasingly becoming intermediaries in the purchase journey" | agency research via trade press | forecast | 7 | split between influenced and completed purchases | low |
| R3-12 | BCG sizes Japan's agentic commerce at 12.5 trillion JPY in 2026 and 15.6 trillion JPY in 2030, counting purchases where AI materially shapes the choice, survey of 3,606 | 12.5 | trillion JPY | 2026 | 2026-11-02 | https://www.bcg.com/ja-jp/publications/2026/the-future-of-agentic-commerce-in-japan | "AI is beginning to play a meaningful role in how consumers shop." | consultancy primary | forecast | 7 | how much AI actually executes, as opposed to shapes | high |
| R3-13 | Forrester gives no number. It says consumer adoption is low, UCP and ACP lead, Alipay launched its own protocol, ChatGPT had 900 million weekly users in February 2026 | 900 | million weekly users | 2026-02 | 2026-04-09 | https://www.forrester.com/blogs/agentic-payments-in-b2c-commerce-where-we-are-now/ | "Consumer adoption of agentic commerce remains low and relatively stagnant." | analyst primary | statement | 5 | survey base, protocol adoption counts | high |
| R3-14 | Visa's CEO said nearly 50 AI partners are live in production and should double, Ramp agentic bill pay is GA, and agent activity will stay a very small part of the business for four quarters | 50 (nearly) | AI partners live | 2026-10-27 | 2026-10-29 | https://aimmediahouse.com/banking/visa-says-agentic-commerce-has-hit-a-tipping-point | "Visa's role is clear: delivering trust." | trade press reporting an earnings call (vendor) | statement | 6 | transaction counts or value, which partners are live | medium |
| R3-15 | Visa's benchmark ran 22 models from 12 labs on 15 shopping tasks. The pass rate was 57.2 percent, 54 percent of failed runs still bought, and 23 percent of US consumers trust AI with payments | 57.2 | percent pass rate | 2026-11-05 | 2026-11-05 | https://investor.visa.com/news/news-details/2026/Visa-Releases-First-of-Its-Kind-Industry-Benchmark-for-AI-Shopping-Almost-Half-of-Test-Runs-Fail/default.aspx | "About 1-in-2 (54%) of failed runs still ended in the AI making a purchase." | vendor primary | count | 6 | which models failed, whether real money moved | medium |
| R3-16 | Tencent and Visa signed an MoU to explore agent payments using Visa Intelligent Commerce. Plans are exploratory | none | none | 2026-10-29 | 2026-10-29 | https://www.tencent.com/tencent-and-visa-announce-strategic-partnership-to-enhance-global-payment-and-commerce-experiences/ | "trust and consumer control at the heart of how we innovate" | vendor primary | event | 6 | launch dates, markets | high |
| R3-17 | Mastercard signed a broad strategic partnership with OpenAI covering Agent Pay, disclosed on its Q3 call. Agent volumes are growing but not yet significant | none | none | 2026-10-29 | 2026-11-02 | https://aimmediahouse.com/banking/mastercard-signs-partnership-with-openai-ceo-says-agentic-commerce-is-still-in-early-days | "It is still early days" | trade press reporting an earnings call | event | 5 | contract terms, OpenAI's own confirmation, launch timing | medium |
| R3-18 | Mastercard's CEO said single-use virtual cards are not a lasting answer for agent payments. Visa, Mastercard and Amex favour tokenization | none | none | 2026-10-29 | 2026-10-29 | https://www.americanbanker.com/payments/news/mastercard-touts-the-importance-of-agentic-tokens | "tokenization is the best technology to capture consumer intent and maintain trust" | trade press | statement | 6 | whether merchants or agent platforms agree, cost | medium |
| R3-19 | Tencent and Mastercard proposed an MoU with agent payments (Agent Pay, Agent Connect) as an exploratory later phase | none | none | 2026-11-02 | 2026-11-02 | https://thepaypers.com/payments/news/tencent-and-mastercard-partner-on-cross-border-and-agentic-payments | "The companies describe the collaboration as proposed" | trade press | event | 5 | timing, volumes | medium |
| R3-20 | Shopify put Shop Pay checkout in Muse, Claude Duet and Instinct. Purchases from brands off Shopify use Mastercard, Visa and Discover tokens, Amex coming. Shop Pay has over 400 million users | 400 | million Shop Pay users (vendor) | 2026-10-28 | 2026-10-28 | https://www.shopify.com/news/fall-26-edition-merchant | "their card is never shared with the agent." | vendor primary | event | 4 | agent order volume, who carries liability | high |
| R3-21 | Shopify Q3: AI search orders up 3.3 times year on year, AI traffic up 2.6 times. The same article says Google enabled native checkout for Shopify merchants on 2026-09-18 with an opt-out default, Microsoft auto-enrolled them in Copilot Checkout, and a May count found 26 UCP implementations with no large brands | 3.3 | times year on year (AI search orders) | 2026-11-03 | 2026-11-03 | https://ppc.land/shopify-revenue-gains-32-to-3-7bn-as-ai-referred-orders-rise-3-3x/ | "While the volume is still small here, adoption is growing" | trade press reporting an earnings call | count | 5 | base volume, share of GMV | medium |
| R3-22 | Shopify said Q3 was the first time shoppers used delegated purchasing through personal agents | none | none | 2026-11-03 | 2026-11-03 | https://ppc.land/shopify-revenue-gains-32-to-3-7bn-as-ai-referred-orders-rise-3-3x/ | "the first time we saw shoppers experimenting with delegated purchasing through personal agents" | trade press reporting an earnings call | statement | 5 | volume of delegated purchases | medium |
| R3-23 | Google said UCP enables direct checkout for hundreds of thousands of brands, UCP is being combined with AP2, and Gemini agents for consumers come later this year | hundreds of thousands | brands (vendor) | 2026-10-28 | 2026-10-28 | https://www.pymnts.com/earnings/2026/google-pushes-ai-agents-into-commerce-as-spending-pressures-cash-flow/ | "We're combining this with the Agent Payments Protocol." | trade press reporting an earnings call | statement | 6 | how many brands see live checkout traffic | medium |
| R3-24 | ucp.dev lists co-developers including Google, Shopify, Walmart, Amazon, Microsoft, Meta, Salesforce and Stripe, over 60 endorsers including Adyen, Amex, Mastercard, PayPal, Visa, Worldpay and Fiserv, and uses AP2 for payment | 60 (over) | endorsing companies | none | not shown (2026 copyright) | https://ucp.dev/ | "The common language for platforms, agents, and businesses." | spec site | spec | 2 | who ships UCP checkout, governance rules | high |
| R3-25 | agenticcommerce.dev says Stripe and OpenAI developed ACP under Apache 2.0, OpenAI is the first platform and Stripe the first payment provider. No other maintainers are named | none | none | none | not shown | https://www.agenticcommerce.dev/ | "Developed to create standards for open and secure AI commerce." | spec site | spec | 2 | current version, live merchants after March 2026 | high |
| R3-26 | The Linux Foundation launched the x402 Foundation on 2026-07-14 with 17 premier members, including Adyen, AWS, Amex, Cloudflare, Coinbase, Fiserv, Google, Mastercard, Shopify, Stripe and Visa. 40 organisations joined after the April intent announcement | 40 | organisations | 2026-07-14 | 2026-07-14 | https://x402.org/linux-foundation-announces-operational-launch-of-x402-foundation-to-standardize-internet-native-payments-for-ai-agents-and-applications/ | "AI agents and automated systems are becoming active participants in the global economy." | foundation primary | event | 2 | volume, decision rules | high |
| R3-27 | x402 processed 75.41 million transactions and settled 24.24 million USD in the 30 days to mid October 2026, with 43,100 monthly active senders, up 152 percent | 24.24 | million USD settled in 30 days | 2026-10 (30 days to mid October) | 2026-10-15 | https://cryptobriefing.com/x402-stablecoin-payments-active-senders-surge/ | "That means the user base more than doubled in a single month." | trade press citing x402.org | count | 3 | how much is test or wash traffic (see C285) | medium |
| R3-28 | The coinbase/x402 repo is now a development fork. Issues and pull requests moved to the x402-foundation repo | none | none | none | not shown | https://github.com/coinbase/x402 | "x402 is an open standard for internet native payments." | code repository | spec | 2 | Coinbase's share of maintainers | high |
| R3-29 | Anthropic put Stripe's Link wallet for agents and the Stripe MCP server in Claude Duet. Users approve each purchase. Link powers payments for more than 200 personal agents including Muse, Grok Bot and Instinct | 200 (more than) | personal agents (vendor) | 2026-10-21 | 2026-10-21 | https://stripe.com/newsroom/news/anthropic-and-stripe | "Business owners are asking agents to take on more of their work." | vendor primary | event | 6 | payment volume through Link | medium |
| R3-30 | Stripe Treasury for agents lets agents check balances, pay invoices, move funds and convert currencies, with the business choosing when a person must approve | none | none | 2026-10-21 | 2026-10-21 | https://stripe.com/newsroom/news/treasury-for-agents | "Every founder wants to spend more time building and less time on admin," | vendor primary | event | 4 | adoption, liability for agent error | high |
| R3-31 | Stripe's newsroom lists no MPP, ACP, Tempo, Link or Issuing for agents release from 2026-10-01 to 2026-11-15 | 0 | releases | 2026-10-01 to 2026-11-15 | checked 2026-11-15 | https://stripe.com/newsroom/news | "Introducing Stripe Treasury for agents" | vendor primary | absence | 2 | changes made in docs or blogs outside the newsroom | medium |
| R3-32 | PayPal launched Agent Ready (for early 2026) and Store Sync. Merchants stay merchant of record. Available to millions of existing PayPal merchants | millions | merchants (vendor) | 2025-10-28 | 2025-10-28 | https://newsroom.paypal-corp.com/2025-10-28-PayPal-Launches-Agentic-Commerce-Services-to-Power-AI-Driven-Shopping | "Our agentic commerce services support leading payments protocols and AI platforms" | vendor primary | event | 6 | live agent volume, protocols by name | high |
| R3-33 | PayPal announced support for Google's UCP | none | none | 2026-01-11 | 2026-01-11 | https://investor.pypl.com/news-and-events/news-details/2026/From-Search-to-Checkout-PayPal-Supports-Trusted-AI-Checkout-with-Google/default.aspx | "Protocols like UCP turn agentic commerce into something merchants can actually adopt at scale." | vendor primary | event | 6 | launch date inside Google checkout | high |
| R3-34 | Microsoft launched Copilot Checkout in the US with PayPal, Stripe, Shopify and Etsy as launch partners. The retailer stays merchant of record | none | none | 2026-01-08 | 2026-01-09 | https://www.retailtouchpoints.com/news/etsy-shopify-among-early-partners-for-microsofts-copilot-checkout/156346/ | "Copilot Checkout can move a customer from intent to transaction in seconds" | trade press | event | 4 | current status, volume | medium |
| R3-35 | Adyen launched Adyen Agentic (Feed, Cart, Payments) for US enterprise merchants in limited availability. It is an early endorser of UCP, AP2 and ACP | none | none | 2026-06-16 | 2026-06-16 | https://www.adyen.com/en_GB/press-and-media/adyen-agentic | "Every new agentic surface asks merchants to rebuild from scratch" | vendor primary | event | 6 | live merchants, volume | high |
| R3-36 | Mirakl and J.P. Morgan Payments are running a closed beta with select retailers, with wider availability planned for 2026 | none | none | 2026-03-10 | 2026-03-10 | https://www.mirakl.com/news/mirakl-and-j-p-morgan-payments-to-power-agentic-commerce-at-enterprise-scale | "Agentic commerce requires both intelligent commerce infrastructure and trusted payment infrastructure working in concert." | vendor primary | event | 6 | whether the beta reached GA | high |
| R3-37 | J.P. Morgan Payments gives no market forecast and says agent-embedded commerce will take time to scale | none | none | none | 2026-02-02 | https://www.jpmorgan.com/payments/newsroom/agentic-commerce-ai-future-shopping | "will take time to scale" | vendor primary | statement | 6 | J.P. Morgan's own sizing | high |
| R3-38 | Alipay AI Pay processed over 120 million transactions in the week of 2026-02-05 to 2026-02-11 and reached 100 million users. Every transaction is confirmed by the user | 120 | million transactions in one week (vendor) | 2026-02-11 | 2026-04-21 | https://letsdatascience.com/news/alipay-enables-ai-agents-to-complete-user-approved-payments-5389ae58 | "Every transaction must be confirmed by the user" | trade press reporting vendor | count | 6 | value, how many are agent initiated | medium |
| R3-39 | Amazon began blocking Meta's Muse shopping agent from its store on 2026-09-20 | none | none | 2026-09-20 | 2026-09-22 | https://www.thestar.com.my/tech/tech-news/2026/09/22/amazon-blocks-metas-muse-ai-agent-from-its-retail-site | "Agentic third-party applications such as Muse have the same obligations" | press | event | 5 | whether other agents are blocked | high |
| R3-40 | Checkout.com data says 89 percent of merchants are preparing for agentic commerce and 3 percent of transactions involve AI agents. No definition or sample is given | 3 | percent of transactions | 2026-07 | 2026-07-20 | https://forkast.news/89-of-merchants-prepare-for-agentic-commerce-only-3-see-agent-transactions/ | "Eighty-nine percent of merchants are actively preparing for agentic commerce." | trade press citing vendor data | count | 6 | count or value, sample, meaning of "involve" | low |
| R3-41 | Tempo raised a 500 million USD Series A at about 5 billion USD, led by Thrive Capital and Greenoaks. Stripe and Paradigm incubated it but did not invest in the round. Stakes are not disclosed | 500 | million USD | 2025-10-17 | 2025-10-17 | https://www.theblock.co/post/375152/stripe-tempo-500-million-series-a-thrive | "the payments-oriented L1, optimized for real-world financial-services applications." | trade press citing Fortune | funding | 5 | ownership stakes | medium |
| R3-42 | Tempo mainnet and MPP went live with more than 100 MPP-compatible services. Design partners include Anthropic, DoorDash, Mastercard, Nubank, OpenAI, Ramp, Revolut, Shopify, Standard Chartered and Visa. No volume given | 100 (more than) | services (vendor) | 2026-03-18 | 2026-03-18 | https://www.theblock.co/post/394131/tempo-mainnet-goes-live-with-machine-payments-protocol-for-agents | "real payment workloads onto stablecoins." | trade press | event | 4 | volume, active payers | medium |
| R3-43 | Rain raised a 250 million USD Series C led by ICONIQ at 1.95 billion USD. It reports over 200 partners and over 3 billion USD in annualized transactions | 250 | million USD | 2026-01-09 | 2026-01-09 | https://www.theblock.co/post/384910/rain-valuation-nears-2-billion-usd-series-c-250-million-raise | "Stablecoins are quickly becoming the way money moves in the 21st century" | trade press | funding | 5 | agent share of volume | high |
| R3-44 | Catena Labs raised a 30 million USD Series A co-led by a16z crypto and Acrew Capital. Its trust bank charter application was accepted for filing | 30 | million USD | 2026-05-20 | 2026-05-20 | https://theblock.co/post/402029/catena-labs-lands-30-million-series-a-files-for-national-trust-bank-charter-to-underpin-agentic-finance | "a new category of regulated financial infrastructure purpose-built for autonomous software" | trade press | funding | 5 | customers, live products | high |
| R3-45 | The OCC gave preliminary conditional approval to Catena Trust Bank, N.A. on 2026-09-18 | none | none | 2026-09-18 | 2026-09-21 | https://forkast.news/catena-trust-bank-secures-preliminary-occ-approval-for-ai-agent-financial-infrastructure/ | "provided it satisfies remaining regulatory requirements" | trade press | event | 5 | the conditions, final approval date | medium |
| R3-46 | Sapiom raised a 35 million USD Series A led by Dragonfly, six months after its seed | 35 | million USD | 2026-08-05 | 2026-08-05 | https://runtimewire.com/article/sapiom-raises-35m-series-a-agent-infrastructure | "Dragonfly led the round six months after Sapiom's seed" | trade press, partly paywalled | funding | 5 | total raised, customers, transaction claims | medium |
| R3-47 | Kite raised an 18 million USD Series A led by PayPal Ventures and General Catalyst, 33 million USD in total | 18 | million USD | 2025-09-02 | 2025-09-02 | https://fortune.com/crypto/2025/09/02/kite-ai-blockchain-paypal-general-catalyst-18-million/ | "I'm very excited about the future, rather than worried about competition at the moment" | national press | funding | 5 | customers | high |
| R3-48 | Kite launched its mainnet and Kite Agent Passport with over 90 service providers integrated, positioning itself as a hub for x402 and AP2 | 90 (over) | service providers (vendor) | 2026-04-30 | 2026-04-30 | https://www.theblock.co/post/399534/kite-launches-kite-chain-and-kite-agent-passport-enabling-autonomous-ai-agent-payments | "The launch is just the beginning." | press release | event | 6 | volume, users | low |
| R3-49 | Basis Theory raised a 33 million USD Series B led by Costanoa. It launched basistheory.ai in June 2025 and formed the Agentic Commerce Consortium | 33 | million USD | 2025-10-14 | 2025-10-14 | https://blog.basistheory.com/series-b-announcement | "Basis Theory is not just keeping up with the future of commerce" | company blog | funding | 6 | customers, consortium output | medium |
| R3-50 | Paid raised a 21.6 million USD seed led by Lightspeed, 33.3 million USD in total, valuation over 100 million USD, customers Artisan and IFS. It bills for agent results, it does not move agent spending | 21.6 | million USD | 2025-09-28 | 2025-09-28 | https://techcrunch.com/2025/09/28/paid-the-ai-agent-results-based-billing-startup-from-manny-medina-raises-huge-21m-seed | "Paid just closed an oversubscribed $21.6 million seed round led by Lightspeed." | national tech press | funding | 5 | any role in agent spending | high |
| R3-51 | Crossmint raised 23.6 million USD led by Ribbit Capital, with Franklin Templeton, Nyca, First Round, Lightspeed Faction and HF0 | 23.6 | million USD | 2025-03-18 | 2025-03-18 | https://www.theblock.co/post/346863/ribbit-capital-leads-23-6-million-funding-round-for-enterprise-blockchain-platform-crossmint | "We're seeing adoption across every sector," | trade press | funding | 5 | named customers, agent revenue | high |
| R3-52 | Crossmint's Agent Commerce Toolkit is live and self-serve. It uses Visa Intelligent Commerce and Mastercard Agent Pay tokens where a card is eligible, and checks out through UCP, Shop Pay or browser automation | none | none | 2026-10-08 | 2026-10-08 | https://crossmint.com/announcement/agent-commerce-toolkit-launch | "They don't want to become payment experts," | vendor primary | event | 6 | customers, volume | medium |
| R3-53 | Skyfire's total funding reached 9.5 million USD after Coinbase Ventures and a16z CSX joined | 9.5 | million USD | 2024-10-24 | 2024-10-24 | https://www.theblock.co/post/322742/coinbase-ventures-and-a16zs-csx-bring-skyfires-tal-funding-to-9-5million | "Skyfire is essentially Visa for the AI economy." | trade press | funding | 5 | any 2025 or 2026 round | high |
| R3-54 | A secondary analysis says Skyfire was founded in 2024, supports AP2, that developer API billing is its largest use, and that its checkout adoption is basically zero | none | none | none | 2026-04-09 | https://stellagent.ai/insights/skyfire-kyapay-know-your-agent | "Skyfire isn't trying to take merchant volume away from Visa and Mastercard." | aggregator blog | statement | 6 | volume, production customers | low |
| R3-55 | Prava Pay gives agents one-time Visa cards, with each purchase approved by passkey. It was announced on X | none | none | 2026-05-26 | 2026-05-26 | https://runtimewire.com/article/prava-launches-prava-pay-ai-agents-one-time-cards | "let bots buy things safely" | trade press citing a social post | event | 6 | customers, funding, issuing bank | low |

## 10. Not found and open questions

Not found, and where we looked:

- Search budget. The shared web search limit ran out partway through this round. Checks after that point used direct page fetches on known URLs only. Not checked as a result: PayPal's Q3 2026 call (Zacks returned a bot wall), Amex, Coinbase and Adyen moves inside the window, and November Stripe docs outside the newsroom.
- Primary forecast pages for McKinsey and Morgan Stanley timed out. Gartner, Bain and eMarketer returned 403. Their numbers come through trade press (R3-01 to R3-05, R3-09).
- A search snippet credited J.P. Morgan with "15 to 25 percent of US e-commerce by 2030". The J.P. Morgan page opened (R3-37) has no forecast, so it is not used.
- A Semafor piece dated 2026-11-10, "Agentic commerce is slow to catch on", appeared only as an aggregator headline. Not opened, not used.
- No agent transaction counts or values from Visa, Mastercard, Google, Stripe or Shopify. All five say volume is small or give none.
- Founding years for Rain, Crossmint, Kite, Catena Labs, Natural, Basis Theory and Tempo were not opened. The startup test is assumed met for all except Lithic, which is likely older than 2019.
- Nekuda, GrailPay, Payman and Prava funding: no page opened that confirms a round.
- Sapiom's claim of 270 million transactions and its Fewsats acquisition were seen in search only.
- The primary page for Alipay's own agent trust protocol was not opened. Only Forrester mentions it (R3-13).
- Walmart Agent Profiles with spend caps (announced 2026-10-21) were seen in a news digest only.
- No 2026 announcement of a Skyfire round or a new Skyfire and Visa launch was found.

Open questions for the lead:

- x402 membership. The x402 Foundation release (R3-26, 2026-07-14) says 40 organisations joined after the April announcement and lists 17 premier members. The do-not-regress list says "50 plus members" in April 2026. Not changed. The lead should confirm which count and date to carry.
- ARK's 8 trillion USD forecast (R3-10) would widen the 2030 spread from about 25 times to about 42 times. Not applied, because the source is secondary.
- Tempo ownership. Should Tempo stay in the startup list while Stripe's and Paradigm's stakes are unknown? If it is removed, Crossmint becomes third.
- Mastercard and OpenAI. The deal terms and whether ChatGPT will use Agent Pay tokens at checkout are unknown. Only Mastercard has described it.
- Amazon is listed as a UCP co-developer (R3-24) but blocks third-party agents on its store (R3-39). Which agents and protocols will Amazon accept?

Proposed additions (for the lead to decide, schema not changed):

- P15 Platform access stance: the merchant or marketplace allows, requires opt-in for, or blocks third-party agents. Who decides: merchant. Why it matters: an agent's reach is capped by which stores let it in (R3-39, R3-21).
