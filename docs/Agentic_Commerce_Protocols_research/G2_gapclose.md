# G2 gap close: tracker, network status, UK law, Link, webhooks, x402 schemes

Second gap closer for the agentic commerce protocols design doc. As of 2026-11-15. Follows R0_schema.md (7 rung ladder) and the 13 column claim table from R4_risk.md. Claim ids G-101 to G-136. Topics covered by G1 (red team, Asian platforms, Amazon, Perplexity, PayPal, Amex, Coinbase, Adyen, CFPB and EU, CIT and MIT flags, account linking) are not repeated.

Rung ladder used: 1 audited or reproduced, 2 primary record (spec, law, terms), 3 revealed behaviour (on chain data), 4 deployment or live status, 5 independent survey or credible press, 6 stated intent or self report, 7 projection, vendor claim, unopened page.

Method. About 44 page opens, counting GitHub API reads. Every page cited below was opened in this run. Pages that returned 403 are named under "not opened" and carry no claim. Pages blocked: openai.com (all index pages), help.openai.com, mastercard.com and mastercard.us (press, stories, rules PDF), drcf.org.uk (statement page and PDF), benzinga.com.

## Q1. agenteconomy.to: who runs it, method, independence, trend

**What we found**

- One person runs it. The about page says it is built and maintained by @realdora_eth and calls itself "An independent project" that is "Independent of the protocols we track" (G-101). No company, funding or sponsor is named. No link to Coinbase or the x402 Foundation was found on the site or in the repo. Independence is self declared and cannot be checked.
- It does not filter. The repo README says raw counts "include ecosystem testing, self-dealing, and infrastructure activity" and that genuine commerce is a subset (G-102). Data comes from public Dune dashboards written by third parties plus the operator's own Tempo RPC indexer. The methodology page describes decoding and de-duplication only, with no wash or test filter (G-103).
- x402 fell from August to October, then turned up in November (G-104 to G-106).

| Month 2026 | Transactions | Value (USD) | Value per transaction |
|---|---|---|---|
| August | 17,855,635 | 437,476 | 2.5 cents |
| September | 13,003,306 | 417,033 | 3.2 cents |
| October | 5,087,812 | 274,220 | 5.4 cents |
| November 1 to 15, partial | 4,718,179 | 721,545 | 15.3 cents |

Counts fell 71.5% from August to October. November is on pace for about 10.1M transactions for the month, and its value after half a month is already 2.6 times October (G-106, our arithmetic). Daily counts rose from 134,165 on 2026-11-05 to 486,706 on 2026-11-14. The baseline already shows one facilitator (Polygon) carried 60.1% of transactions in the five days to 2026-11-14 (R2-40), so the November rise is concentrated.

- Independent filters show the agentic share is tiny. TRM Labs (2026-09-09) found about half of 52.68M USD of x402 settlements falls away once self payment, bulk flows and thin buyer sellers are removed, and put the agentic share at 0.6% to 7.5%, about 5,000 to 11,000 USD a month (G-107). Token Terminal data reported by Crypto Briefing (2026-11-09) shows monthly AI agent payment value fell 94.5% from 29M USD in November 2025 to 1.59M USD in October 2026, a wider scope than x402 (G-108). A Visa and Artemis analysis found about 4,000 wallets drive about 90% of adjusted x402 spending (G-109, undated).
- Trackers disagree on counts. A Major Matters tracker had x402 at over 200M transactions by June 2026 (G-110). agenteconomy.to implies about 154M by end of June (lifetime 200.68M less July to mid November, our arithmetic).

**What this changes**

- Doc table row at line 544 (and D2_sections.md line 91). Replace "Independent on chain tracker (agenteconomy.to) | 3 | verified 2026" with "Single operator tracker, self declared independent, raw counts incl. tests and self dealing (agenteconomy.to)" and keep rung 3 for the count but drop "verified". Add a second row: "Agentic share 0.6% to 7.5% of settled value, about 5K to 11K USD a month (TRM Labs, 2026-09-09)", rung 5 [G-107].
- Add the monthly trend: August 17.9M, September 13.0M, October 5.1M, November half month 4.7M. Say "fell 72% August to October, rebounding in November on one facilitator" [G-104, G-106, R2-40].

## Q2. Is Visa Intelligent Commerce live?

**What we found**

- On the fiscal Q4 call (2026-10-27) the Visa CEO said "nearly 50 AI partners live and in production", including Shop Pay, expected to double (G-111). He also said the number of agentic transactions is "albeit limited" and that it "remains very small" against Visa's business (G-112). No transaction count was given.
- Live named uses: Ramp's agentic bill pay "is now generally available". Airwallex is testing and ARRI Bill is piloting (G-113). These are B2B or wallet integrations.
- Intelligent Commerce Connect was announced 2026-04-08 as "Currently in pilot" with seven named partners (G-114). No GA statement for Connect was found.
- The only Visa item from 2026-11-01 to 2026-11-15 is the 2026-11-05 shopping benchmark, already in R4 (R4-27).

**What this changes**

- Keep "Live 2026-10-28" on the Visa row (line 156), but add the qualifier "Visa says volume is limited and very small, no count published" [G-112]. Keep Connect at Pilot. Add Ramp bill pay as the one named GA use [G-113].

## Q3. Mastercard Agent Pay: GA, where, and liability rule text

**What we found**

- No Mastercard source opened in this run says Agent Pay is generally available. The 2026-09-30 release calls itself "an expansion of Agent Pay" and says its new agent probability score is "rolling out for testing in the U.S." (G-115). Mastercard's developer guide says Mastercard "has completed live agentic transactions in multiple markets, including Thailand" (G-117). On the Q3 call (reported 2026-10-29) Mastercard said Shop Pay uses Agent Pay and network tokens and a new OpenAI agreement includes Agent Pay (G-118).
- Liability rule text: not found. The only Mastercard text on disputes says "Standard fraud detection, chargeback rights, and dispute resolution processes apply to agentic transactions" (G-116). That is the reverse of the Visa approach. It points to normal chargeback rights for the cardholder rather than making the cardholder responsible for an enrolled agent. The same guide says "Agents assume responsibility for consumer verification" (G-117). This is developer guidance, not rule text.
- Searched: mastercard.com newsroom and stories (403), Mastercard Rules PDF on mastercard.us (403), investor.mastercard.com, developer.mastercard.com, web search for Mastercard rules on agentic liability and chargebacks. Third party blogs say no network publishes an agent liability allocation, but these were not opened and are not cited.

**What this changes**

- Mastercard row (line 78). Keep "Not found" for GA. Add "Live transactions in several markets incl. Thailand per developer guide, US probability score in testing 2026-09-30" [G-115, G-117].
- Liability section. Add a contrast line: "Visa rule 4.1.23.10 makes the cardholder responsible for an enrolled agent. Mastercard publishes no equivalent rule found and its developer guide says standard chargeback rights apply" [G-116]. Mark Mastercard liability as "guidance only, rule text not found".

## Q4. ChatGPT Instant Checkout in November 2026

**What we found**

- Instant Checkout ended in March 2026. Forrester (2026-03-07), citing The Information and an OpenAI statement, says OpenAI "nixed its Instant Checkout functionality" and checkout moved to merchant apps inside ChatGPT or to merchant websites (G-119). About a dozen Shopify merchants were live per The Information, about 30 per Shopify.
- OpenAI's current developer guide for production says "Your business handles the order, fulfillment, customer support, and fraud decisions" and that OpenAI is relaying user signals through the Forwarded HTTP header (G-120). The checkout spec page now has no webhook section. This fits checkout on merchant sites, not in ChatGPT.
- OpenAI is moving to network credentials. Visa (2026-06-10) says its payment capabilities "will be integrated into OpenAI experiences" with tokenized credentials bound to agents and user spending limits, with no launch date (G-121). Mastercard said a new OpenAI agreement includes Agent Pay (G-118).
- Not verified: a "ChatGPT Wallet" for agent purchases. Search results claimed an OpenAI page and release note dated 2026-11-13, but openai.com and help.openai.com returned 403. No claim is made.

**What this changes**

- Keep "Withdrawn" for ChatGPT Instant Checkout. Date it 2026-03 (reported 2026-03-06 to 2026-03-07) [G-119]. Add to the OpenAI row: "now discovery in ChatGPT, checkout on merchant sites with risk signals in the Forwarded header, Visa and Mastercard token deals announced, not live" [G-120, G-121, G-118]. Add ChatGPT Wallet to the watch list as unverified.

## Q5. UK: DRCF statement and PSRs 2017 regulation 77(4)(c)

**What we found**

- The DRCF members (CMA, FCA, ICO, Ofcom) published a joint statement on 2026-10-30 (G-122). The statement page and PDF returned 403. As reported (2026-11-03), it says existing law applies to personal agents, a list that runs to "payments, financial services", that agents "could act for users by buying things", and it names fraud and scams as risks. It poses questions on how authority to act is given, who answers for an agent's decisions and how redress works (G-123). No payment specific rule or guidance was found in it.
- Regulation 77(4)(c) is relevant. Except where the payer acted fraudulently, the payer is not liable for losses from an unauthorised payment where regulation 100 requires strong customer authentication but the payer's provider does not require it (G-124). Regulation 77(4)(d) adds that the payer is not liable where the instrument was used for a distance contract, which covers most online agent purchases. Regulation 77(6) makes a payee or payee's provider that does not accept SCA compensate the payer's provider (G-125).
- How it bites for agents (our analysis, not a regulator view). Agent payments often run without SCA at the moment of purchase, using a stored credential or delegated token. If such a payment is later found unauthorised, for example a hijacked agent or one acting outside its mandate, the payer carries no loss and the cost moves to the issuer, which can recover from the merchant side under 77(6) if that side did not accept SCA. The hinge is whether a payment the agent makes inside the user's delegation counts as authorised. If it does, regulation 77 does not apply at all. That is the open point in HM Treasury Question 15 (R4-53).

**What this changes**

- UK regulation row. Add "DRCF joint statement 2026-10-30: existing law, including payments, applies to agents. No payment rule" [G-122, G-123].
- Liability section. Add a UK line: "If an agent payment is unauthorised, PSRs 2017 reg 77(4)(c) and (d) leave the UK payer with no loss for online purchases or where SCA was skipped, and 77(6) pushes cost to a merchant side that refused SCA. Whether an in-mandate agent payment is authorised is unsettled" [G-124, G-125].

## Q6. Stripe Link: buyer protection for agent purchases

**What we found**

- Link Purchase Protections (effective 2026-09-08) cover US residents only, are offered at Stripe's discretion, are insured by an AIG company and a CNA company and are administered by Cover Genius. Stripe says it "does not administer or adjudicate your claim". The page does not mention agents, the agent wallet or Shared Payment Tokens (G-126).
- The Link agent wallet FAQ is blunt: "You are responsible for all purchases your agent makes", and this holds even when the agent buys a different product than the one shown (G-127). For a wrong item the user is told to contact the agent platform and the merchant. Link reviews the case if the merchant does not respond within 48 hours. Overcharges above the approved spend request go to Link Support. Limits reset daily and cannot be raised. The wallet is open to accounts created in the US, Canada, Mexico, Japan and Singapore (G-128).
- Not found: any statement that Link Purchase Protections cover agent wallet or Shared Payment Token purchases. Searched link.com terms pages, the Link support FAQ, docs.stripe.com and stripe.com legal via search. "Link Agentic Terms" are referenced in search results but the page was not opened.

**What this changes**

- Stripe SPT and Link row (line 123 and line 165). Add "Link makes the user responsible for all agent purchases, including wrong items. Purchase protection is US only, discretionary and silent on agents" [G-126, G-127]. This sits next to Visa 4.1.23.10 as a second cardholder-bears-it rule, and against Amex's agent error cover.

## Q7. Webhook signing in ACP and UCP

**What we found**

- ACP (spec version 2026-04-17). Order webhooks from merchant to OpenAI "MUST be signed with an HMAC signature in the `Merchant-Signature` header". The scheme is HMAC-SHA256 over timestamp plus "." plus the raw body, with a recommended 300 second tolerance and 401 on failure (G-129). There are two event types, order_create and order_update. There is no separate payment event, and refunds and disputes travel as order adjustments. Checkout API request signing is only SHOULD (Signature plus Timestamp) (G-130). HMAC means a shared secret per merchant and platform pair.
- UCP (release v2026-08-25 and main). "Webhook notifications MUST be signed." Signing uses RFC 9421 HTTP Message Signatures with public keys from the signer's profile. All implementations must verify ES256, and Ed25519 is optional. Signatures are recommended, not required, for payment authorization responses and checkout completion responses (G-131). Order webhook headers follow Standard Webhooks, except signing, which follows RFC 9421 (G-132).

**What this changes**

- Add a row to the security and integration table: "Order webhooks: ACP MUST, HMAC-SHA256 shared secret (Merchant-Signature). UCP MUST, RFC 9421 public key, ES256 baseline. Neither requires signed payment authorization responses" [G-129, G-131]. Add to build guidance: verify webhook signatures and timestamps, and keep HMAC secrets per platform for ACP.

## Q8. x402 upto and batch settlement

**What we found**

- Both are in the spec, not just proposed. `upto` was merged on 2026-03-04 (PR #1074) with EVM, SVM and XRPL bindings (G-133). `batch-settlement` was merged on 2026-05-05 (PR #2051) with EVM, SVM and Cloudflare bindings and two trust models, capital backed and credit backed (G-134). Both have reference code in the TypeScript, Go and Python SDKs of x402-foundation/x402.
- Facilitators. Coinbase CDP lists exact, upto and batch-settlement on Base, Polygon, Arbitrum, Monad and World, and exact and upto on Solana (G-135). The baseline has AWS AgentCore supporting upto (R2-56). Support at other facilitators was not checked.

**What this changes**

- Line 336 (V15) and line 617. Change "x402 has upto, batch settlement and auth capture schemes" to "upto (spec 2026-03-04) and batch-settlement (spec 2026-05-05) are merged spec with SDK code. Coinbase CDP supports both on five EVM mainnets" [G-133 to G-135]. Line 617 says the README defines exact and upto only, so add batch-settlement there.

## Claim table

| id | claim | number | unit | event_date | publish_date | url | quote | source_tier | kind | rung | does not tell you | confidence |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| G-101 | agenteconomy.to is built and maintained by one pseudonymous person and says it is independent of the protocols it tracks. No funding or sponsor named | 1 | operator | 2026-11-15 | 2026-11-15 | https://agenteconomy.to/about | "Independent of the protocols we track" | independent tracker (self description) | operator and independence | 6 | Who funds it, any undisclosed ties to Coinbase, Polygon or the x402 Foundation | medium |
| G-102 | The tracker's raw counts include testing, self dealing and infrastructure activity. Data comes from third party Dune dashboards plus its own Tempo RPC indexer | | | 2026-11-15 | 2026-11-15 | https://github.com/realdora/agenteconomy | "Raw counts include ecosystem testing, self-dealing, and infrastructure activity" | independent tracker (repo README) | method | 6 | How large the non commerce share is | high |
| G-103 | The methodology page describes Dune and RPC sourcing, decoding and de-duplication, with no wash or test filter | | | 2026-11-15 | 2026-11-15 | https://agenteconomy.to/methodology | "sourced from public on-chain data" | independent tracker (method page) | method | 6 | Which facilitators and contracts are counted | medium |
| G-104 | x402 monthly transactions: August 17,855,635, September 13,003,306, October 5,087,812, November 1 to 15 partial 4,718,179 | 5087812 | transactions (October 2026) | 2026-10-31 | 2026-11-15 | https://agenteconomy.to/data.json | "5087812" | independent tracker (data feed) | on chain count | 3 | Agent share, wash share, who the payers are | medium |
| G-105 | x402 monthly value: August 437,476, September 417,033, October 274,220, November 1 to 15 partial 721,545. Field unit not labelled, October matches the page's 274K USD | 274220 | USD (October 2026) | 2026-10-31 | 2026-11-15 | https://agenteconomy.to/data.json | "vol" | independent tracker (data feed) | on chain value | 3 | Whether value is organic, how much is self dealing | medium |
| G-106 | Our arithmetic from G-104 and G-105: counts fell 71.5% August to October. November is on pace for about 10.1M and its value is already 2.6 times October. Daily counts rose from 134,165 (2026-11-05) to 486,706 (2026-11-14) | 71.5 | percent fall in count, Aug to Oct | 2026-11-14 | 2026-11-15 | https://agenteconomy.to/data.json | "486706" | derived | trend | 3 | Whether the November rise is organic, given one facilitator held 60.1% (R2-40) | medium |
| G-107 | TRM Labs screens remove about half of 52.68M USD of x402 settlements and put the agentic share at 0.6% to 7.5%, about 5,000 to 11,000 USD a month | 0.6 to 7.5 | percent of settled value | 2026-09-09 | 2026-09-09 | https://www.trmlabs.com/trm-tech-blog/whos-actually-paying-measuring-ai-agent-payments-onchain | "between 0.6% and 7.5%" | analytics firm blog | filtered share | 5 | Monthly figures after August, whether single purpose agents were missed | medium |
| G-108 | Token Terminal data, as reported, shows monthly AI agent payment value fell 94.5% from 29M USD (November 2025) to 1.59M USD (October 2026) | 1.59 | million USD (October 2026) | 2026-10-31 | 2026-11-09 | https://cryptobriefing.com/ai-agent-payment-value-drops-94-percent/ | "Monthly AI agent payment value dropped 94.5%" | crypto press citing data vendor | on chain value | 5 | x402 only figure, filtering method, why it is far above agenteconomy.to's 274K | medium |
| G-109 | A joint Visa and Artemis analysis finds about 4,000 wallets drive about 90% of x402 adjusted spending, headline adjusted volume 19M | 4000 | wallets | not shown | not shown | https://thedefiant.io/converge/infrastructure/visa-s-sheffield-pegs-adjusted-x402-volume-at-19m | "roughly 4,000 wallets drive about 90% of x402's adjusted spending" | crypto press | concentration | 5 | Period, unit and adjustment method of the 19M figure | low |
| G-110 | A Major Matters tracker counted over 200M x402 transactions by June 2026 and Artemis found more than 95% was protocol signalling. agenteconomy.to implies about 154M by end June (our arithmetic) | 200 | million transactions | 2026-06 | not shown | https://glenbrook.com/payments_news/the-x402-foundation-activated-a-27-year-old-internet-code-200-million-transactions-later-the-real-volume-is-still-tiny/ | "more than 95% of that activity is protocol signaling" | payments press repost | tracker disagreement | 5 | Which tracker's definition is right | low |
| G-111 | Visa CEO: nearly 50 AI partners live and in production, including Shop Pay, expected to double | 50 | partners | 2026-10-27 | 2026-10-27 | https://www.webull.com/news/15822495508279296 | "nearly 50 AI partners live and in production" | earnings call transcript | live status | 6 | Transactions, volume, consumer reach | medium |
| G-112 | Visa CEO: agentic transactions are limited today and remain very small against Visa's business | | | 2026-10-27 | 2026-10-27 | https://www.webull.com/news/15822495508279296 | "it all remains very small" | earnings call transcript | scale | 6 | Any count or share | medium |
| G-113 | Ramp's agentic bill pay on Visa Intelligent Commerce is generally available. Airwallex is testing and ARRI Bill is piloting | | | 2026-10-27 | 2026-10-27 | https://www.webull.com/news/15822495508279296 | "Ramp's agentic bill pay use case is now generally available" | earnings call transcript | live status | 6 | Volume, markets, consumer availability | medium |
| G-114 | Visa Intelligent Commerce Connect launched in pilot with seven named partners | 7 | pilot partners | 2026-04-08 | 2026-04-08 | https://usa.visa.com/about-visa/newsroom/press-releases.releaseId.22276.html | "Currently in pilot with select partners" | vendor press release | status | 6 | Whether GA happened later | medium |
| G-115 | Mastercard announced an expansion of Agent Pay on 2026-09-30, with its agent probability score in US testing. No GA, market or liability statement | | | 2026-09-30 | 2026-09-30 | https://investor.mastercard.com/investor-news/investor-news-details/2026/Mastercard-Advances-Agentic-Commerce-With-New-Trust-and-Intelligence-Services/default.aspx | "rolling out for testing in the U.S." | vendor press release | status | 6 | Whether Agent Pay is GA anywhere | medium |
| G-116 | Mastercard developer guide says standard chargeback and dispute processes apply to agentic transactions. No rule text allocating agent liability was found | | | not shown | 2026-11-15 | https://developer.mastercard.com/merchant-cloud/documentation/tutorials-and-guides/agentic-commerce-guide/21/ | "Standard fraud detection, chargeback rights, and dispute resolution processes apply" | vendor developer docs | liability guidance | 6 | Binding rule text, reason codes, who wins an agent error dispute | medium |
| G-117 | Mastercard says it has completed live agentic transactions in several markets including Thailand and that agents take on consumer verification | | | not shown | 2026-11-15 | https://developer.mastercard.com/merchant-cloud/documentation/tutorials-and-guides/agentic-commerce-guide/21/ | "completed live agentic transactions in multiple markets, including Thailand" | vendor developer docs | live status | 6 | Which markets, volume, GA | medium |
| G-118 | Mastercard Q3 call: Shop Pay uses Agent Pay and network tokens, and a new OpenAI agreement includes Agent Pay. Consumer use expected to build over the holidays | | | 2026-10-29 | 2026-10-29 | https://pymnts.com/earnings/2026/mastercard-backs-tokenized-card-payments-agentic-commerce | "is using Agent Pay and Mastercard network tokens" | trade press on earnings call | live status and intent | 6 | Launch dates, scope, volume | medium |
| G-119 | OpenAI ended Instant Checkout in early March 2026. Checkout moved to merchant apps in ChatGPT or merchant websites. About 12 to 30 Shopify merchants had been live | 12 to 30 | merchants | 2026-03-06 | 2026-03-07 | https://www.forrester.com/blogs/what-it-means-that-the-leader-in-agentic-commerce-just-pulled-back/ | "nixed its Instant Checkout functionality" | analyst blog citing press | withdrawal | 5 | OpenAI's own wording, whether any merchants still run native checkout | medium |
| G-120 | OpenAI's production guide puts order, fulfilment, support and fraud with the business and relays user risk signals in the Forwarded HTTP header | | | not shown | 2026-11-15 | https://developers.openai.com/commerce/guides/production | "Your business handles the order, fulfillment, customer support, and fraud decisions" | vendor developer docs | design | 2 | Whether native checkout returns, dates of the change | medium |
| G-121 | Visa says its payment capabilities will be integrated into OpenAI experiences, using tokenized credentials bound to agents with user set limits. No launch date | | | 2026-06-10 | 2026-06-10 | https://corporate.visa.com/en/sites/visa-perspectives/innovation/visa-openai-partnership.html | "will be integrated into OpenAI experiences" | vendor article | intent | 6 | Whether it is live in November 2026 | medium |
| G-122 | GOV.UK records the DRCF joint statement on agentic AI, published 2026-10-30, covering how existing frameworks apply to personal agents | | | 2026-10-30 | 2026-10-30 | https://www.gov.uk/government/publications/agentic-ai-and-consumers | "DRCF joint statement on agentic AI published" | regulator page | regulation | 2 | The statement's own text (DRCF site returned 403) | high |
| G-123 | As reported, the DRCF statement lists payments and financial services among applicable law, says agents could buy things for users, names fraud and scams, and asks who answers for agent decisions and how redress works | | | 2026-10-30 | 2026-11-03 | https://www.resultsense.com/news/2026-11-03-drcf-regulators-personal-ai-agents-statement | "could act for users by buying things" | press | regulation | 5 | Any payment specific rule or guidance | medium |
| G-124 | PSRs 2017 reg 77(4)(c): except for fraud, a payer is not liable for unauthorised transaction losses where reg 100 requires SCA but the payer's provider does not require it | | | 2018-01-13 | 2026-11-14 | https://www.legislation.gov.uk/uksi/2017/752/regulation/77 | "does not require strong customer authentication" | law text | rule text | 2 | Whether an in-mandate agent payment is authorised under reg 67 | high |
| G-125 | PSRs 2017 reg 77(4)(d) and 77(6): no payer liability for unauthorised use in a distance contract, and a payee side that does not accept SCA must compensate the payer's provider | | | 2018-01-13 | 2026-11-14 | https://www.legislation.gov.uk/uksi/2017/752/regulation/77 | "used in connection with a distance contract" | law text | rule text | 2 | How courts or the FOS treat agent payments | high |
| G-126 | Link Purchase Protections cover US residents only, are discretionary, insured by AIG and CNA companies and run by Cover Genius. Silent on agents and Shared Payment Tokens | | | 2026-09-08 | 2026-09-08 | https://link.com/terms/purchase-protections | "does not administer or adjudicate your claim" | provider terms | buyer protection | 2 | Whether agent wallet purchases qualify, claim limits (in PDFs not read) | medium |
| G-127 | Link agent wallet FAQ makes the user responsible for all purchases the agent makes, including a different product from the one shown | | | not shown | 2026-11-15 | https://support.link.com/questions/link-agent-wallet-faq | "You are responsible for all purchases your agent makes" | provider support page | liability | 2 | How this interacts with card chargeback rights at the issuer | medium |
| G-128 | Link agent wallet: merchant first, Link review after 48 hours, overcharges above the approved spend request go to Link Support, daily limits, accounts from US, Canada, Mexico, Japan, Singapore | 5 | countries | not shown | 2026-11-15 | https://support.link.com/questions/link-agent-wallet-faq | "Contact Link Support if you were charged more than the spend request you approved" | provider support page | redress | 2 | Outcome rates, refund timelines | medium |
| G-129 | ACP order webhooks MUST carry an HMAC-SHA256 Merchant-Signature over timestamp and raw body, 300 second tolerance recommended, events order_create and order_update | 300 | seconds tolerance | 2026-04-17 | 2026-04-17 | https://github.com/agentic-commerce-protocol/agentic-commerce-protocol/blob/main/spec/2026-04-17/openapi/openapi.agentic_checkout_webhook.yaml | "Requests MUST be signed with an HMAC signature in the `Merchant-Signature` header" | spec | security | 2 | Key rotation, how secrets are exchanged | high |
| G-130 | ACP checkout API request signing is SHOULD only (Signature over canonical JSON with Timestamp) | | | 2025-09-12 | 2026-11-15 | https://github.com/agentic-commerce-protocol/agentic-commerce-protocol/blob/main/rfcs/rfc.agentic_checkout.md | "client **SHOULD** sign requests" | spec | security | 2 | Algorithms, which platforms sign in practice | high |
| G-131 | UCP webhooks MUST be signed with RFC 9421 HTTP Message Signatures, ES256 verification required, Ed25519 optional. Payment authorization and checkout completion responses only RECOMMENDED | | | 2026-08-25 | 2026-08-25 | https://github.com/Universal-Commerce-Protocol/ucp/blob/v2026-08-25/docs/specification/signatures.md | "Webhook notifications **MUST** be signed" | spec | security | 2 | Adoption, key directory uptime | high |
| G-132 | UCP order event webhook headers follow Standard Webhooks except signing, which follows RFC 9421. Payload is the full order snapshot | | | 2026-11-15 | 2026-11-15 | https://github.com/Universal-Commerce-Protocol/ucp/blob/main/docs/specification/shopping/order/index.md | "except for request signing, which follows RFC 9421" | spec (main branch) | security | 2 | Whether this text is in the latest tagged release | medium |
| G-133 | x402 `upto` scheme is merged spec since 2026-03-04 (PR #1074), with EVM, SVM and XRPL bindings and SDK code in TypeScript, Go and Python | | | 2026-03-04 | 2026-08-25 | https://github.com/x402-foundation/x402/blob/main/specs/schemes/upto/scheme_upto.md | "authorizes a transfer of up to a maximum amount" | spec | protocol scope | 2 | Live volume using upto | high |
| G-134 | x402 `batch-settlement` is merged spec since 2026-05-05 (PR #2051), with EVM, SVM and Cloudflare bindings, capital backed or credit backed, value moves after the request | | | 2026-05-05 | 2026-05-05 | https://github.com/x402-foundation/x402/blob/main/specs/schemes/batch-settlement/scheme_batch_settlement.md | "settlement stores it rather than executing a transfer" | spec | protocol scope | 2 | Credit risk on credit backed bindings, live use | high |
| G-135 | Coinbase CDP facilitator supports exact, upto and batch-settlement on Base, Polygon, Arbitrum, Monad and World, and exact and upto on Solana | 5 | EVM mainnets with all three | not shown | 2026-11-15 | https://docs.cdp.coinbase.com/x402/network-support | "All three run on the EVM networks" | vendor developer docs | live support | 4 | Volume by scheme, other facilitators | medium |
| G-136 | Searches for Mastercard rule text on agent liability, the DRCF statement text and an OpenAI ChatGPT Wallet launch returned 403 or nothing. No claim made on these | | | 2026-11-15 | 2026-11-15 | https://investor.mastercard.com/investor-news/investor-news-details/2026/Mastercard-Advances-Agentic-Commerce-With-New-Trust-and-Intelligence-Services/default.aspx | | gap record | not found | 7 | Anything about those three items | low |

## Not opened or not found

- Mastercard: newsroom, stories and the Mastercard Rules PDF returned 403. No agent liability rule text found.
- DRCF: statement page and PDF returned 403. Content taken from GOV.UK and press only.
- OpenAI: openai.com index pages and help.openai.com returned 403. "ChatGPT Wallet" (claimed 2026-11-13 in search results) is unverified.
- Link Agentic Terms: referenced in search results, page not opened.
- Benzinga transcript returned 403. The Webull copy of the same transcript was used.
- Facilitators other than Coinbase CDP were not checked for upto or batch settlement support.
