# G1 gap close, Agentic Commerce Protocols technical design

As of 2026-11-15. Inputs: W3_redteam.md (C1 to C20), the Gaps list in W3_K4.md, the claim table format in R4_risk.md and the rung ladder in R0_schema.md. The design doc was not edited.

Method. About 58 page fetches and about 60 web searches. Five fetches failed (TechRadar returned a stub, Zacks served a bot check, TechRepublic, Business Wire and the ICO consultation page returned HTTP 403) and nothing from them is cited. Every G row below cites a page that was opened in this run. News dated 2026-10-22 to 2026-11-15 was searched first. Vendor figures are tagged vendor.

Rung conventions follow R4. Specs, filings and network developer docs are rung 2. On chain analysis is rung 3. Live deployment statements are rung 4. Press, law firm analysis and independent surveys are rung 5. Company statements on earnings calls and industry positions are rung 6. Vendor numbers, modeled estimates and projections are rung 7.

## 1. Critique status

- C1. Partly answered. No source splits completed agent orders by protocol. One vendor panel splits them monthly by agent platform. Visa, Mastercard, Shopify and PayPal disclosed no agent order counts. G-01 to G-04, G-06, G-08, G-10 to G-12.
- C2. Partly answered. Visa Intelligent Commerce mandate fields were opened and set against the AP2 and ACP fields already in R1. A common core exists, but binding levels differ. Mastercard Verifiable Intent was not reopened. G-16, G-17.
- C3. Partly answered. The 2026 holiday split between agent paid and AI referred orders does not exist yet. Measures of referral against checkout, merchant demand and network outlook were found. G-02, G-04, G-06, G-42, G-44 to G-46.
- C4. Answered. Visa checks amount and merchant at credential retrieval. AP2 has the merchant check the cart. ACP leaves limits in the token scope. G-16, G-17.
- C5. Partly answered. Shop Pay in agents rides Visa and Mastercard agentic tokens. Whether Stripe processes those checkouts and how many merchants accept Shared Payment Tokens: not found. G-07, G-09.
- C6. Partly answered. No share of virtual cards against agentic tokens was found. Mastercard says virtual cards will not be supported long term and that stored cards hide the agent from the issuer. G-08, G-19.
- C7. Partly answered. No agent indicator exists in the authorization message yet. EMVCo is only exploring one. Agent payments map to neither customer nor merchant initiated cleanly. Account linking now exists in UCP and the Personal Agent Protocol. G-15, G-19 to G-23, G-37.
- C8. Not answerable. No 2027 disclosure commitment was found in the Visa, Mastercard, Shopify or PayPal calls. G-06, G-08, G-10, G-12.
- C9. Partly answered. Network tokens are not tied to one PSP, but reuse depends on the token requestor. Agentic token portability: not found. G-57.
- C10. Partly answered. Forrester, HFS and Oliver Wyman criteria were found. Gartner: not found. G-42 to G-44.
- C11. Partly answered. Surfaces carrying completed US agent orders in October 2026, by vendor panel. G-03, G-04.
- C12. Partly answered. ChatGPT's browser signs (already in R1). Cloudflare folded signed agents into Verified bots and publishes no list. Visa's live EU flows used Trusted Agent Protocol identity. G-34, G-36.
- C13. Not answerable. The specs were not reread. UCP release notes show buyer consent and identity linking moving to configurable maps and scopes. G-37, G-38.
- C14. Partly answered. Two 2026 UCP releases carried 12 and 11 breaking items. ACP, AP2 and Web Bot Auth were not counted. G-37 to G-39.
- C15. Partly answered. Stripe and Paradigm developed Tempo and put no money into its Series A. Exact stakes: not found. G-51.
- C16. Answered. The Trusted Agent Delegation coalition named no members. Deliverables are IETF side meetings and workshops with no dates. G-35.
- C17. Partly answered. Visa reports live EU agent payments under SCA with passkeys and no signed mandate. A live EU payment with an AP2, Verifiable Intent or bank mandate: not found. G-34.
- C18. Partly answered. Visa Intelligent Commerce says the purchase instruction is required as dispute evidence. A change to general compelling evidence rules: not found. ICO consultation on agent data is open. G-18, G-33, G-55.
- C19. Not answerable. No p95 latency for Web Bot Auth or TAP verification was found.
- C20. Not answerable. No money moved under Mastercard Agent Pay for Machines with a named partner after 2026-06-10 was found.

## 2. Findings

### 2.1 How many orders agents complete, and whether agents mostly refer (C1, C3, C11, named hole, K4 gap 4)

What we found
- The only monthly measure found is a modeled panel from First Page Sage, an SEO agency. It puts agent completed orders at 0.68% of US ecommerce orders in Q3 2026, up from 0.27% in Q2, then 1.35% in September and 1.52% in October (G-01, G-02). Vendor, rung 7, low confidence. Its definition is broad: any purchase where an AI platform "does more than answer a question".
- By platform in October 2026, the same panel puts agent completed purchases at Meta Muse 32.6%, Amazon Alexa for Shopping 30.4%, Google Gemini 22.6%, ChatGPT 8.9%, Copilot 2.8% and Claude 2.7%. Perplexity is not in the panel (G-03).
- The same table shows the referral and checkout split. ChatGPT drives 40.4% of AI referred visits but 8.9% of agent completed purchases. Muse drives 7.9% of referrals but 32.6% of completions (G-03). AI referred visits were 5.46% of US retail visits in October against 1.52% of orders agent completed (G-04).
- Almost a third of agent completed purchases in that panel run through Amazon's own agent. The panel does not say on which stores, but our inference is that Amazon's agent shops mainly on Amazon, where no outside protocol is involved.
- Visa said agentic is "a very small amount of Visa's business" and will stay small for four quarters (G-06). Mastercard called it early days (G-08). Shopify said Q3 was its first quarter of shoppers delegating purchases to agents, and its filed release gives no agent share (G-10, G-11).
- Adobe's 2026 holiday AI traffic metric counts link clicks only (G-45). Salesforce forecasts AI agents at 20% of holiday traffic, including scrapers, with no completed purchase share (G-46). Forrester says very few consumers let agents buy without oversight and most value comes from referrals (G-44).
- In China, Reuters reports JD's assistant drew nearly 80 million users for advice at Singles Day 2026, and Douyin AI drove about 5% of purchases through chatbot links. No agent completed order count was published (G-47).
- An unattributed figure says 3% of transactions involve agents (G-40). Source unknown, low confidence.

What this changes
- ADR-1 needs an option D: keep the PSP, fix feeds, attribution and the evidence record, and wait for a dated trigger. Proposed trigger: the client's own agent completed share (new V17) passes 3% of orders for two months running, or any network or platform starts disclosing agent orders by surface. B (canonical model plus adapters) moves from default to the answer above the trigger.
- The ADR-1 revisit rule "when one protocol passes a clear majority of agent orders" should change to a surface rule, because the measurable split is by platform, not by protocol. Use the First Page Sage monthly table as a signpost, tagged vendor.
- Scenario S3 (closed platform wallets) has the strongest measured evidence today: about 86% of agent completed purchases in October sat in three platforms (Muse, Alexa for Shopping, Gemini). Add a fifth scenario, referral led stall, with ChatGPT's 40% referral and 9% completion gap as evidence.
- Section 6.5 should add that one vendor modeled figure for agent completed orders now exists and nothing audited does.

### 2.2 Card network rules, agent flags, CIT and MIT, account linking (C7, named hole)

What we found
- Mastercard's merchant guide says agents must not use cards on file: "Using stored credentials would prevent card issuers from recognizing the transaction as agentic." Without an agentic token "the network cannot apply appropriate risk controls". Certified agents go into a trusted agent registry. The guide names three network schemes: Mastercard Agent Pay, Visa TAP and Amex ACE (G-19, G-20).
- EMVCo's draft framework (September 2026) proposes Intent Services and is only "exploring" Agentic Transaction Indicators and Know Your Agent checks (G-21). So no agent flag exists in the authorization message standard today.
- A law firm analysis says an agent payment "fits neither category cleanly". Treating it as merchant initiated needs a first customer initiated payment to draw a Trace ID (Mastercard) or Original Transaction Identifier (Visa) from. It says Mastercard's public rules are silent on agentic terms, while Visa's Core Rules now carry agent provisions (G-22, G-23). The doc already cites Visa rule 4.1.23.
- Account linking now has two specs. UCP added identity linking with OAuth 2.0 scopes, marked breaking in both 2026 releases (G-37, G-38). Meta and Sierra's Personal Agent Protocol is OAuth based, with launch partners Shopify, Stripe and Walmart, a draft shared with 35 design partners including Visa and OpenAI, and payments left for a later extension (G-15). Adyen says it partnered on it (G-14).

What this changes
- Add P22 (agent signal in authorization), P23 (stored credential class for agent payments) and P24 (buyer identity and account linking), see section 3.
- Pattern 1 (network token) should state the rule plainly: the agent must present an agentic token, not a card on file. The agentic browser path with a stored card is an unrecognised agent payment that issuers score as an ordinary card not present sale.
- The canonical model needs a field for the network's agent header and the token requestor, not only the token.

### 2.3 Who checks the mandate and where spend caps live (C4, C2)

What we found
- Visa Intelligent Commerce checks each credential retrieval against the mandate's declineThreshold and preferred merchant name, and "Visa aggregates this check across the entire instruction". A mandate carries declineThreshold, effectiveUntilTime and recurringFrequency. An instruction holds at most 10 mandates, a consumer at most 50 tokens, and nothing can be modified, only cancelled and recreated (G-16, G-17).
- From R1, already in the doc: AP2 has the merchant check the closed Checkout Mandate against the cart. ACP puts max_amount, currency, merchant_id, checkout_session_id and expires_at into the token scope, so the PSP holding the token enforces it. Amex Intent Intelligence records merchant name, maximum budget, preferences and expiry (G-24 for status).
- Common core across Visa, AP2, ACP and Amex: amount cap, currency, merchant constraint, expiry and recurrence. The difference is what the authority is bound to: a cart (AP2 closed mandate), a checkout session (ACP), a merchant name and cap (Visa) or a budget (Amex).

What this changes
- C4 holds. Per agent spend caps across merchants (V1) and prepaid per agent budgets (ADR-5) belong to the buyer side or the network, not the merchant gateway. Under Visa the network already enforces the cap. The merchant gateway should keep only the cart to mandate binding check (AP2) and the evidence write.
- C2 is answerable with one rule: the canonical Authority record holds the five common fields plus a binding level (cart, session, merchant, amount only) plus the original signed artifact stored unchanged. Adapters translate into the common fields and never rewrite the artifact. Add P26 (mandate enforcement point) and P27 (amount drift tolerance).
- ADR-3's claim should be narrowed as the red team says.

### 2.4 Network and PSP results in the window (C5, C8, named holes PayPal and Adyen)

What we found
- Visa, fiscal Q4 call on 2026-10-27: nearly 50 AI partners live, Shop Pay among them, expected to double, no volume disclosed (G-06, G-07).
- Mastercard, Q3 call on 2026-10-29: Shop Pay uses Agent Pay and Mastercard network tokens, a new OpenAI agreement includes Agent Pay, and a virtual card "is a bridge", not "a long-term solution that we will support" (G-08, G-09).
- PayPal, Q3 call on 2026-10-27: working with Meta and other AI firms to put PayPal into personal agents, no agent volume, no merchant count, and branded checkout TPV growth stuck at 1% to 2% for four quarters (G-12, G-13). PayPal agent tools (Agent Ready, store sync) were not named on the call. Their 2026 status was not confirmed in this run.
- Adyen, Q3 update on 2026-10-28: partnered with Sierra and Meta on the Personal Agent Protocol. No agent volume (G-14).
- Shopify, Q3 on 2026-11-03: AI referred orders grew 3.3 times, first quarter of delegated purchasing, no share disclosed (G-10, G-11).

What this changes
- C5: Shop Pay agent checkouts count as live evidence for the token layer of both networks. They should not add to Stripe's live score without proof Stripe processes them. Shopify's live score is supported by both networks naming it.
- C8: no network or platform has committed to disclose agent metrics. Signposts in 11.3 that wait on network disclosure should be swapped for the vendor panel and the client's own tagged orders.
- PayPal's rank (9.2) should not rise: no agent numbers and flat branded checkout.

### 2.5 Amex agentic commerce (ACE) status (named hole)

What we found
- Amex published Intent Intelligence on 2026-10-13. Amex confirmed to Digital Commerce 360 that it "has no live integrations yet" and that Agent Purchase Protection is "not yet available" (G-24).
- On the Q3 call (2026-10-23) the CEO said Amex is "not going to allow agents to run rogue" and will be selective about agents (G-25).

What this changes
- Section 7.3's Amex row says "Amex covers agent errors for registered agents". It should read "promised, not yet available, needs Intent Intelligence, which has no live integration". Keep Amex ACE at Spec.

### 2.6 Amazon Buy for Me and outside agents (named hole)

What we found
- On 2026-10-29 Amazon said over 400 million customers used Alexa for Shopping in 12 months, and that it will be "the primary shopping agent" for Amazon. Amazon has blocked ChatGPT and Meta's Muse agents (G-26, G-27).
- Buy for Me: no 2026 product news found. In January 2026 brands objected to being listed without consent. Amazon's answer was an email opt out (G-28).

What this changes
- Amazon's live score in 9.2 is understated if Alexa for Shopping is about 30% of agent completed purchases (G-03, vendor). Amazon is a closed platform agent on its own store, so it supports S3, not the gateway.
- Challenge 4 (platforms shut agents out) gains a dated primary statement.

### 2.7 Perplexity shopping and payments (named hole)

What we found
- An agency estimate puts Perplexity Commerce near a 2 billion USD annual GMV run rate. Perplexity has not confirmed it and the article calls it "a directional signal rather than an audited result". Its merchant program charges no transaction fee per the same source (G-54).
- Perplexity is not in the First Page Sage panel (G-03). R5 already records the Ninth Circuit ruling on Comet. Instant Buy merchant counts were seen in search only and are not used.

What this changes
- No change to rankings. Perplexity has no audited checkout figure.

### 2.8 Alibaba, JD, Tencent, Ant and Alipay (named hole)

What we found
- Alibaba said its Qwen app produced more than 120 million orders in six days (2026-02-06 to 2026-02-11), with payment authorised inside the chat (G-48). No Qwen agent order count was published for Singles Day 2026.
- Reuters on 2026-11-11: JD's assistant had nearly 80 million users seeking advice, Tmall AI token sales rose over 700%, and no AI completed order figure was given (G-47).
- Alipay AI Pay opened to OpenClaw type agents including Claude Code in April 2026, with identity check at activation and "explicit user authorisation" for every payment. It reports 100 million users and 120 million transactions in one February week (G-49, vendor).
- Tencent: the Visa and Mastercard MoUs (2026-10-29, 2026-11-02) are already in the doc. Nothing newer was found.

What this changes
- China remains the largest reported agent checkout volume, all vendor reported, all human confirmed per payment. That fits P1 human present, not human away. The decision tree should give China a leaf: platform wallet with per payment confirmation.

### 2.9 Coinbase x402 and Base (named hole)

What we found
- Chainalysis (2026-10-14): over 138 million x402 transactions on Base by the end of June 2026, and over 87% of payments between a hundredth of a cent and a dime. No dollar total. Early activity was "predominately fads" (G-50).

What this changes
- No change. It fits the doc's reconciled figure of about 274 thousand USD in October 2026. Counts are large and value is tiny, so Buyer B's case still rests on sub dollar pricing.

### 2.10 Regulators: CFPB, EU, UK (named hole, K4 gap privacy)

What we found
- CFPB newsroom checked 2026-11-15: the latest item is dated 2026-10-14 and nothing touches AI agents or agent payments (G-31).
- European Commission: no statement on agents making payments was found in the window. The search found only industry and law firm items.
- An industry group, the Local Payments Council for Agentic Commerce (PPRO, BLIK, Bancontact, EPI which runs Wero, and DIAS), formed on 2026-10-26 to set standards for authorising agents, bank verification, merchant identification, disputes and refunds (G-32).
- The UK ICO opened a call for evidence on agentic AI on 2026-10-08, closing 2026-11-20. It says controller should be read broadly and lists payment protocols among components that widen agent access to data (G-33).

What this changes
- Keep "no CFPB position" in 7.2, now with a dated check.
- Add a privacy owner to the panel (a data protection lead) and give the evidence store a retention rule tied to the rail's dispute window (V18). Watch for ICO guidance after 2026-11-20 as a dated signpost.
- Add an EU account to account leaf to the decision tree as Watch, citing the council.

### 2.11 Banks close the door to outside agents (C6, P21, challenge 6)

What we found
- Citi "does not allow third-party AI agents or assistants to log into customer accounts" and allows read only access through open banking. Bank of America says a human should stay in the loop on money leaving an account. JPMorgan will block agents until its tools are ready (G-29, G-30).

What this changes
- P21 gets dated values: login and transact blocked, read only via open banking allowed. Agents that scrape bank logins are out. This raises the weight of tokenized network credentials and wallets, and supports challenge 6.

### 2.12 Agent identity, Cloudflare and latency (C12, C16, C19)

What we found
- Cloudflare's docs say "Signed agents are now Verified" and, from 2026-07-01, mark each as Direct or Intermediary. The page names no signing agents (G-36).
- The Trusted Agent Delegation post (2026-11-05, edited 2026-11-10) names no members, proposes four identity tiers (nothing, session, account, unique) and says when a user disputes an agent purchase "the Site pays" (G-35).
- Visa's live EU flows identified agents with Trusted Agent Protocol and authenticated with Visa Payment Passkeys (G-34).
- Latency: no measured p95 found. Only vendor words like "minimal".

What this changes
- 7.6 tier 2 rule: accept "network registered agent plus agentic token plus passkey" as equal to "signature plus mandate". Do not refuse unsigned agentic browsers at payment. Route them to normal card not present risk scoring instead.
- Add the Direct or Intermediary flag to P3 values.
- C16: give Cloudflare M 3, not 5. A coalition with no named members is a move, not a delivery. It stays outside the top 10.
- Keep the 300 ms p95 as untested and say so.

### 2.13 Protocol churn and fragmentation cost (C14, K4 gap 2)

What we found
- UCP shipped four protocol releases in 2026 (2026-01-11, 2026-01-23, 2026-04-08, 2026-08-25) (G-39). The April release has 12 items marked breaking, including Order changes and identity linking. The August release lists 11 backward incompatible items, including a buyer consent overhaul and removal of signing_keys from the profile (G-37, G-38).
- Checkout.com backs ACP, AP2 and Mastercard Agent Pay for Machines and runs its own MCP server. The article quotes 5 thousand to 500 thousand USD per standard for integration, with no source given (G-40, G-41).

What this changes
- Add "protocol churn" to the challenge list. Proposed E 4 (23 breaking items in two releases, primary), S 3.
- ADR-1 option B cost should be costed per breaking release, not "Medium". Use the 5 to 500 thousand range only as an unverified bound.
- Whether hosted platforms absorb UCP breaking changes for their merchants was not confirmed in this run. If they do, that is an argument for option C on hosted platforms.

### 2.14 Customer relationship, fees, returns and disputes (K4 section 10 gaps)

What we found
- Customer relationship: HFS (101 leaders, US and Canada, 2026-07-06) found 78% say first party data matters more with agents, and "only 37% have a credible plan to keep the direct relationship". Identity, authentication and fraud risk was the top barrier at 41% (G-43). Oliver Wyman with the Merchant Advisory Group found 84% of merchants had no customer demand for agentic commerce, only 6% want to lead, and direct customer relationship ranked lowest among concerns (G-42). The two surveys disagree on how much the relationship worries merchants.
- Agent fees: OpenAI charged 4% on Instant Checkout sales from late January 2026, on top of processing (G-52). The doc already records the March 2026 move back to retailer checkout. Google has not published a fee for UCP checkout in AI Mode or Gemini (G-53). Perplexity's merchant program is reported as free (G-54).
- Returns: "Return patterns for agent-selected orders are still unmeasured by any major study" (G-05). Not found elsewhere.
- Dispute rates: no agent dispute or chargeback rate was found from any network, PSP or issuer. Chargebacks911 gives no data and advises recording authorisation at the moment of delegation (G-55). Signifyd reports referral growth, not agent dispute data (G-56).

What this changes
- Add V9 values for platform fees: 0% to 4% per sale, or undisclosed (P25).
- Add challenge "customer relationship and attribution" below the top four, since one survey ranks it high and another lowest.
- Keep challenge 10 at E 3 as K4 suggests. Dispute data is still absent.
- Add V19 (return and cancellation rate for agent orders) as a field to measure, not a known value.

### 2.15 EU live agent payments and the tree's dead leaves (C17)

What we found
- Visa said on 2026-07-02 that agents completed live transactions at merchant sites in Europe with 31 named issuers, secured with Visa Payment Passkeys and SCA compliant, "explicitly authorised by the consumer" within consumer defined parameters. No volume. Merchants called it early (G-34).

What this changes
- T3 (EU consumer, human away) gets a buildable fallback leaf: Visa Intelligent Commerce with a passkey at instruction set up, graded Pilot. Signed AP2 or Verifiable Intent mandates stay Spec for EU live money.

### 2.16 Tempo (C15)

What we found
- Fortune (2025-10-17): Tempo was developed by Stripe and Paradigm, "Paradigm and Stripe did not contribute capital to the round", and Paradigm's Matt Huang leads Tempo and sits on Stripe's board (G-51). Stakes: not found.

What this changes
- Tempo should leave the top three startups or carry a flag that it sits inside Stripe's orbit. The MPP authorship score should not count twice.

### 2.17 Token portability and virtual cards (C9, C6)

What we found
- Network tokens "are not tied exclusively to a single provider environment", but reuse at a new PSP depends on the token requestor and may need re tokenizing (G-57). Nothing specific to agentic tokens was found.
- Share of agent payments on single use virtual cards: not found. Mastercard says it will not support virtual cards long term (G-08).

What this changes
- C9 holds. Add a contract question to option C: who is the token requestor for agentic tokens, and can it move. Add Pattern 5 (virtual card, interim) and Pattern 6 (unrecognised agent with stored card) to 8.1 so the tree can route them.

### 2.18 Decision frameworks (C10)

What we found
- Forrester (2026-05-28) uses four steps: agentic fit, machine advantage, organisational adaptability and operational readiness (G-44). HFS and Oliver Wyman barrier rankings are in 2.14. Gartner: not found (paywalled or absent).

What this changes
- Add two criteria to 8.2: fraud and identity exposure (top barrier at 41%) and data and catalog readiness (34%). Move liability clarity to a gate, as the red team says.

### 2.19 Not found and what was searched

- Completed agent orders split by protocol: not found. Searched Visa, Mastercard, Shopify, PayPal results and agentic share trackers.
- 2026 holiday split of agent paid against AI referred orders (Adobe, Salesforce, networks): not published yet. Adobe and Salesforce define AI traffic as visits or influence.
- Share of agent card payments on virtual cards: not found (Rain, Crossmint, Lithic pages are product pages).
- Stripe Shared Payment Token merchant count, and whether Stripe processes Shop Pay agent checkouts: not found.
- 2027 disclosure commitments by Visa, Mastercard, Shopify, Google: not found.
- Agent dispute, chargeback or friendly fraud rate: not found.
- p95 latency for Web Bot Auth or TAP: not found.
- Mastercard Agent Pay for Machines money moved with a named partner: not found.
- European Commission statement on agents making payments in the window: not found.
- Alibaba Qwen order count for Singles Day 2026: not found.
- Gartner agentic commerce criteria: not found.
- Breaking changes in ACP, AP2 and Web Bot Auth for 2026: not counted.
- Seen in search but not opened, so not used: Alipay's April 2026 Business Wire release (HTTP 403), the ICO consultation page (HTTP 403), Amazon's Buy for Me product count, Perplexity Instant Buy merchant count, Shopify's note on taking UCP 2026-08-25 without changes.

## 3. New parameters and variables

| ID | Parameter or variable | Allowed values | Who decides | Why it matters | Evidence |
|---|---|---|---|---|---|
| P22 | Agent signal at authorization | none (card on file), agentic network token with network agent header (Agent Pay, TAP, ACE), PSP token riding an agentic token, single use virtual card | Network and PSP, agent platform picks | Stored cards hide the agent from the issuer and lose agent risk controls | G-19, G-20, G-21 |
| P23 | Stored credential class for agent payments | customer initiated with agent present, merchant initiated under a prior authenticated mandate (needs Trace ID or OTID), unclassified card not present | Networks (unsettled), PSP sets the flag | Decides SCA exemption and chargeback rights | G-22, G-23 |
| P24 | Buyer identity and account linking | guest, OAuth account link (UCP identity linking, Personal Agent Protocol), platform wallet identity (Shop Pay, Link, Alipay), network enrolment (Visa, Amex account enablement) | Merchant offers, agent platform chooses, user consents | Keeps loyalty and the customer record with the merchant | G-15, G-37, G-38 |
| P25 | Agent platform fee model | none, per sale percent (0% to 4% seen), checkout module fee, undisclosed | Agent platform | Sets margin and which surfaces pay off | G-52, G-53, G-54 |
| P26 | Mandate enforcement point | network at credential retrieval, merchant against the cart, PSP by token scope, agent platform only | Protocol | Tells the merchant which checks it must run and which it cannot | G-16, G-17 |
| P27 | Amount drift tolerance | exact cart match, cap only, cap plus allowance for tax, shipping and FX | Protocol, then merchant | Final totals move after tax and shipping | G-16 |
| P28 | Agent order attribution tag | none, referral tag only, agent completed flag with platform id | Merchant and PSP | Without it the client cannot measure its own trigger for ADR-1 | G-01 to G-04 |
| V17 | Own agent completed share of orders | below 1%, 1% to 3%, above 3% for two months | Merchant (measured) | Trigger for moving from option D to B | G-02 |
| V18 | Evidence retention by rail | longest dispute window of the rail used, then delete | Data protection lead | GDPR storage limits and ICO scope | G-33 |
| V19 | Agent order return and cancel rate | measured per platform | Merchant (measured) | No study measures it yet | G-05 |

Also extend P3 with the Cloudflare Direct or Intermediary flag (G-36), P10 with "Amex protection promised, not live" (G-24) and P21 with "login and transact blocked, read only via open banking" (G-29).

## 4. Claim table

| id | claim | number | unit | event_date | publish_date | url | quote | source_tier | kind | rung | does not tell you | confidence |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| G-01 | First Page Sage puts agent completed orders at 0.68% of US ecommerce orders in Q3 2026, up from 0.27% in Q2 | 0.27 to 0.68 | percent of US ecommerce orders | 2026-07 to 2026-09 | 2026-11-02 | https://www.firstpagesage.com/seo-blog/agentic-commerce-statistics | "from 0.27% to 0.68%" | marketing agency research (vendor) | market measure, modeled | 7 | Audited counts, how agent completed is separated from assisted purchases, panel bias from 46 brands | low |
| G-02 | Monthly agent completed share rose from 0.36% in August to 1.35% in September and 1.52% in October 2026 | 0.36, 1.35, 1.52 | percent of US ecommerce orders | 2026-08 to 2026-10 | 2026-11-02 | https://www.firstpagesage.com/seo-blog/agentic-commerce-statistics | "nearly quadrupled from 0.36% to 1.35%" | marketing agency research (vendor) | market measure, modeled | 7 | Whether the jump lasts beyond Muse's launch, any non US market | low |
| G-03 | In October 2026 agent completed purchases split Muse 32.6%, Alexa for Shopping 30.4%, Gemini 22.6%, ChatGPT 8.9%, while ChatGPT had 40.4% of AI referrals, under a broad definition of agentic purchase | 32.6, 30.4, 22.6, 8.9 | percent of agent completed purchases | 2026-10 | 2026-11-02 | https://www.firstpagesage.com/seo-blog/agentic-commerce-statistics | "any purchase in which an AI platform does more than answer a question" | marketing agency research (vendor) | market measure, modeled | 7 | Protocol used, payment credential, Perplexity (not tracked) | low |
| G-04 | AI referred visits were 5.46% of US retail visits in October 2026 and converted at 1.6 times other traffic | 5.46, 1.6 | percent of visits, times | 2026-10 | 2026-11-02 | https://www.firstpagesage.com/seo-blog/agentic-commerce-statistics | "converted at 1.6 times the rate of all other retail traffic in our dataset" | marketing agency research (vendor) | market measure, modeled | 7 | Order value, returns, whether the agent or the person paid | low |
| G-05 | ClickPost states no major study measures return rates for agent placed orders | none | none | 2026-11-13 | 2026-11-13 | https://www.clickpost.ai/en-us/blog/agentic-commerce-statistics | "Return patterns for agent-selected orders are still unmeasured by any major study" | vendor blog | absence statement | 7 | Whether private PSP or retailer data exists | medium |
| G-06 | Visa's CEO said agentic commerce is a very small part of Visa's business and Visa disclosed no agent volume | none | none | 2026-10-27 | 2026-10-29 | https://aimmediahouse.com/banking/visa-says-agentic-commerce-has-hit-a-tipping-point | "a very small amount of Visa's business" | trade press on earnings call | earnings statement | 6 | Any count, any split by product or protocol | medium |
| G-07 | Visa reported nearly 50 AI partners live in production, including Shop Pay, and expects that to double | 50 | partners (nearly) | 2026-10-27 | 2026-10-29 | https://aimmediahouse.com/banking/visa-says-agentic-commerce-has-hit-a-tipping-point | "a bit of a tipping point on users being able to experience" | trade press on earnings call | earnings statement | 6 | Volume per partner, which partners carry live money | medium |
| G-08 | Mastercard's CEO said virtual card numbers are a bridge Mastercard will not support long term | none | none | 2026-10-29 | 2026-10-29 | https://pymnts.com/earnings/2026/mastercard-backs-tokenized-card-payments-agentic-commerce | "that's not a long-term solution that we will support." | trade press on earnings call | earnings statement | 6 | Share of agent payments on virtual cards today, any rule change date | medium |
| G-09 | Mastercard said Shop Pay uses Agent Pay and Mastercard network tokens, and a new OpenAI agreement includes Agent Pay | none | none | 2026-10-29 | 2026-10-29 | https://pymnts.com/earnings/2026/mastercard-backs-tokenized-card-payments-agentic-commerce | "Shopify's Shop Pay is using Agent Pay and Mastercard network tokens" | trade press on earnings call | earnings statement | 6 | Which PSP processes these checkouts, volume | medium |
| G-10 | Shopify said AI referred orders grew 3.3 times and Q3 2026 was the first quarter of shoppers delegating purchases to agents | 3.3 | times year on year | 2026-11-03 | 2026-11-04 | https://aimmediahouse.com/retail/ai-orders-on-shopify-grew-33x-now-agents-are-completing-the-purchase | "Orders are growing even faster at 3.3x." | trade press on earnings call | earnings statement | 6 | Base size, share of GMV, agent completed against referred | medium |
| G-11 | Shopify's Q3 2026 filed press release discloses no agent order share | 119,145 | million USD GMV | 2026-11-03 | 2026-11-03 | https://www.sec.gov/Archives/edgar/data/0001594805/000159480526000067/exhibit991pressreleaseq320.htm | "continuing to build commerce into every surface, every agent" | company filing (8-K exhibit) | filing, absence of disclosure | 2 | Anything about agent volume | high |
| G-12 | PayPal's CEO said PayPal is working with Meta and other AI firms to integrate PayPal into personal agents, with no agent volume given | none | none | 2026-10-27 | 2026-10-27 | https://singjupost.com/?p=64870 | "collaborating with Meta and other AI companies to integrate PayPal into AI personal agents" | earnings call transcript (third party) | earnings statement | 6 | Terms, launch date, any volume | medium |
| G-13 | PayPal branded checkout TPV growth stayed at 1% to 2% for four quarters | 1 to 2 | percent growth | 2026-07 to 2026-09 | 2026-10-27 | https://singjupost.com/?p=64870 | "Branded checkout TPV growth has remained relatively stable in the 1% to 2% range" | earnings call transcript (third party) | disclosed volume growth | 3 | Agent share of that volume | medium |
| G-14 | Adyen's Q3 2026 update says it partnered with Sierra and Meta on the Personal Agent Protocol and reports no agent volume | none | none | 2026-10-28 | 2026-10-28 | https://www.adyen.com/press-and-media/adyen-publishes-q3-2026-business-update-6r9vz0 | "help shape the emerging standard for AI agents to interact with businesses" | company release | stated intent | 6 | Product dates, merchant uptake | medium |
| G-15 | Personal Agent Protocol is an OAuth based standard for personal agents and businesses, with payments a future extension and a draft shared with 35 design partners | 35 | design partners | 2026-10-06 | 2026-10-06 | https://sierra.ai/blog/introducing-personal-agent-protocol | "The session is built on OAuth, an established standard for authorizing access." | protocol author blog | spec announcement | 6 | Final spec, adoption, payment binding | medium |
| G-16 | A Visa Intelligent Commerce mandate carries declineThreshold, effectiveUntilTime and recurringFrequency, up to 10 mandates per instruction, and cannot be modified | 10 | mandates per instruction | not shown | not shown (read 2026-11-15) | https://developer.visa.com/docs/visa-intelligent-commerce/concepts | "There is no endpoint to modify an existing instruction or mandate." | network developer docs | spec | 2 | Line item binding, how drift after tax is handled | high |
| G-17 | Visa checks each credential retrieval against the mandate threshold and preferred merchant, summed across the instruction | none | none | not shown | not shown (read 2026-11-15) | https://developer.visa.com/docs/visa-intelligent-commerce/concepts | "Visa aggregates this check across the entire instruction." | network developer docs | spec | 2 | Whether the issuer also checks at authorization | high |
| G-18 | Visa says a purchase instruction is required to evidence the specific authorized transaction for disputes | none | none | not shown | not shown (read 2026-11-15) | https://developer.visa.com/docs/visa-intelligent-commerce/concepts | "Required to evidence the specific authorized transaction for disputes" | network developer docs | spec | 2 | Whether the instruction wins a dispute, which reason codes | high |
| G-19 | Mastercard's merchant guide says stored credentials stop issuers recognizing a payment as agentic | none | none | not shown | not shown (read 2026-11-15) | https://developer.mastercard.com/merchant-cloud/documentation/tutorials-and-guides/agentic-commerce-guide/21/ | "Using stored credentials would prevent card issuers from recognizing the transaction as agentic." | network developer docs | network guidance | 2 | Authorization field names, Visa's equivalent rule | high |
| G-20 | Mastercard's guide says without an agentic token the network cannot apply risk controls, and certified agents enter a trusted registry | none | none | not shown | not shown (read 2026-11-15) | https://developer.mastercard.com/merchant-cloud/documentation/tutorials-and-guides/agentic-commerce-guide/21/ | "without an Agentic Token, the network cannot apply appropriate risk controls" | network developer docs | network guidance | 2 | Certification criteria, registry size | high |
| G-21 | EMVCo's draft agentic payments framework proposes Intent Services and is only exploring Agentic Transaction Indicators and Know Your Agent | none | none | 2026-09 | 2026-09-04 | https://fintech.global/2026/09/04/emvco-drafts-framework-for-agentic-card-payments/ | "exploring additional concepts including Know Your Agent checks and Agentic Transaction Indicators" | trade press on standards body | standard draft | 5 | Dates for a specification, field definitions | medium |
| G-22 | A law firm analysis says agent payments fit neither customer nor merchant initiated cleanly, since MIT needs a prior CIT Trace ID or OTID | none | none | 2026-05-05 | 2026-05-05 | https://fbtgibbons.com/the-payment-infrastructure-layer-how-network-rules-already-govern-agentic-commerce/ | "An AI agent-initiated transaction fits neither category cleanly" | law firm analysis | legal analysis | 5 | How networks will classify them, rule dates | medium |
| G-23 | The same analysis says Mastercard's public rules are silent on agentic terms while Visa's Core Rules carry agent provisions | none | none | 2026-05-05 | 2026-05-05 | https://fbtgibbons.com/the-payment-infrastructure-layer-how-network-rules-already-govern-agentic-commerce/ | "Mastercard's public Transaction Processing Rules remain silent on agentic terminology." | law firm analysis | legal analysis | 5 | Private Mastercard bulletins, changes after May 2026 | medium |
| G-24 | Amex's Intent Intelligence has no live integrations and Agent Purchase Protection is not yet available | none | none | 2026-10-13 | 2026-10-16 | https://www.digitalcommerce360.com/2026/10/16/american-express-ai-framework/ | "Intent Intelligence has no live integrations yet." | trade press with company confirmation | deployment status | 5 | Launch date for protection, eligible agents | high |
| G-25 | Amex's CEO said Amex will be selective about which agents it lets transact | none | none | 2026-10-23 | 2026-10-23 | https://www.digitaltransactions.net/amex-keeps-a-tight-rein-on-ai-as-it-posts-record-revenue/ | "We're not going to allow agents to run rogue through our system." | trade press on earnings call | earnings statement | 6 | Which agents qualify, timeline | medium |
| G-26 | Amazon said over 400 million customers used Alexa for Shopping in 12 months and it will be the primary agent for shopping Amazon | 400 | million customers (over) | 2026-10-29 | 2026-10-29 | https://www.modernretail.co/technology/amazon-says-more-than-400m-customers-have-used-alexa-for-shopping-in-the-last-12-months/ | "we believe Alexa for Shopping is going to be the primary shopping agent" | trade press on earnings call | earnings statement | 6 | How many purchases the agent completed | medium |
| G-27 | Amazon has blocked ChatGPT and Meta's Muse shopping agents from its site | none | none | 2026-10-29 | 2026-10-29 | https://www.modernretail.co/technology/amazon-says-more-than-400m-customers-have-used-alexa-for-shopping-in-the-last-12-months/ | "has blocked platforms like ChatGPT and Meta's Muse shopping agent from scraping its site" | trade press | press report | 5 | Whether blocks cover all agents, legal basis | medium |
| G-28 | Amazon's answer to brands listed in Buy for Me without consent was an email opt out | none | none | 2026-01-06 | 2026-01-06 | https://www.modernretail.co/platforms/brands-are-upset-that-buy-for-me-is-featuring-their-products-on-amazon-without-permission/ | "Businesses can opt out at any time by emailing branddirect@amazon.com" | trade press | press report | 5 | 2026 product changes, order counts, returns handling | medium |
| G-29 | Citi does not let third party AI agents log in or transact and allows read only access through open banking providers | none | none | 2026-10 | 2026-10-19 | https://thepaypers.com/fintech/news/citi-and-bank-of-america-restrict-ai-agents-from-accessing-accounts | "does not allow third-party AI agents or assistants to log into customer accounts" | trade press | press report | 5 | Policies at other banks in writing, effect on token based agents | medium |
| G-30 | Bank of America said a human should stay in the loop to approve money leaving an account | none | none | 2026-10-14 | 2026-10-19 | https://thepaypers.com/fintech/news/citi-and-bank-of-america-restrict-ai-agents-from-accessing-accounts | "a human should remain in the loop to approve money leaving an account" | trade press | press report | 5 | Whether card tokens in agents are affected | medium |
| G-31 | The CFPB newsroom shows no item on AI agents or agent payments through its latest item dated 2026-10-14 | none | none | 2026-10-14 | checked 2026-11-15 | https://www.consumerfinance.gov/about-us/newsroom/ | "CFPB Announces New Initiative to Address OCC-Uncovered Debanking by Large Banks" | regulator newsroom | absence check | 2 | Speeches, supervisory letters, Federal Register items | medium |
| G-32 | PPRO, BLIK, Bancontact, EPI and DIAS formed a Local Payments Council for Agentic Commerce covering agent authorisation, bank verification, disputes and refunds | 5 | founding members named | 2026-10-26 | 2026-10-26 | https://www.paymentsjournal.com/european-payments-firms-form-council-for-agentic-commerce/ | "aims to establish standards for how AI agents are authorized by users" | trade press | industry body | 6 | Timeline, deliverables, Commission involvement | medium |
| G-33 | The ICO opened a 37 page call for evidence on agentic AI on 2026-10-08, closing 2026-11-20, reading the controller concept broadly | 37 | pages | 2026-10-08 | 2026-10-21 | https://ppc.land/uk-ico-gives-ai-agent-firms-until-november-20-to-submit-evidence/ | "organisations should interpret the concept of a controller broadly" | trade press on regulator document | regulator consultation | 5 | Final guidance, retention rules for payment evidence | medium |
| G-34 | Visa reported live agent transactions at European merchant sites with 31 named issuers, secured with Visa Payment Passkeys under SCA | 31 | issuers | 2026-07-02 | 2026-07-02 | https://www.mynewsdesk.com/uk/visa/pressreleases/visa-and-banks-across-europe-reach-the-next-phase-of-agentic-commerce-unlocking-secure-access-to-merchants-3457328 | "explicitly authorised by the consumer" | network press release (vendor) | deployment | 4 | Volume, whether open to all cardholders, mandate format | medium |
| G-35 | Cloudflare's Trusted Agent Delegation post names no members, proposes four identity tiers and says the site pays when users dispute agent purchases | 4 | identity tiers | 2026-11-05 | 2026-11-05 | https://blog.cloudflare.com/trusted-agent-delegation/ | "In practice, when the User disputes it, the Site pays." | vendor blog | industry position | 6 | Members, deliverable dates, dispute data | medium |
| G-36 | Cloudflare says signed agents are now Verified bots, marked Direct or Intermediary from 2026-07-01, and lists no signing agents | none | none | 2026-07-01 | 2026-11-12 | https://developers.cloudflare.com/bots/concepts/bot/signed-agents | "Signed agents are now Verified" | vendor developer docs | program rule | 2 | Which consumer agents sign today | high |
| G-37 | UCP release v2026-04-08 marks 12 items as breaking, including Order changes and OAuth 2.0 identity linking | 12 | breaking items | 2026-04-08 | 2026-04-08 | https://newreleases.io/project/github/Universal-Commerce-Protocol/ucp/release/v2026-04-08 | "feat!: identity linking OAuth 2.0 foundation with capability-driven scopes" | release notes mirror | spec change log | 2 | Effort to absorb each change | medium |
| G-38 | UCP release v2026-08-25 lists 11 backward incompatible items, including a buyer consent overhaul and removal of signing_keys | 11 | breaking items | 2026-08-25 | 2026-08-25 | https://newreleases.io/project/github/Universal-Commerce-Protocol/ucp/release/v2026-08-25 | "backward-incompatible and require schema updates" | release notes mirror | spec change log | 2 | How many adopters were affected | medium |
| G-39 | ucp.dev lists four protocol releases in 2026 and a Payments Technical Council formed 2026-09-02 | 4 | protocol releases | 2026-01-11 to 2026-09-25 | read 2026-11-15 | https://ucp.dev/documentation/announcements/ | "key structural refactorings to support multi-vertical expansion" | protocol site | spec change log | 2 | Breaking items in the January releases | high |
| G-40 | An article says only 3% of transactions involve agents, with no source given | 3 | percent of transactions | not shown | 2026-09-23 | https://forkast.news/checkout-com-is-building-its-own-agent-infrastructure-while-backing-three-rival-protocols/ | "a mere 3% of transactions actually involve agents" | crypto trade press | unsourced figure | 7 | Who measured it, denominator, market | low |
| G-41 | The same article says Checkout.com backs ACP, AP2 and Agent Pay for Machines, and puts integration at 5 thousand to 500 thousand USD per standard | 5,000 to 500,000 | USD per standard | 2026-09-01 | 2026-09-23 | https://forkast.news/checkout-com-is-building-its-own-agent-infrastructure-while-backing-three-rival-protocols/ | "creates a financial burden for processors" | crypto trade press | press report | 7 | Source of the cost range, merchant side cost | low |
| G-42 | Oliver Wyman with the Merchant Advisory Group found 84% of enterprise merchants had no customer demand for agentic commerce | 84 | percent of merchants | 2026 | 2026-09 (URL path) | https://www.oliverwyman.com/our-expertise/insights/2026/sep/merchant-payment-operations-trends.html | "84% of merchants say they have not had any customer demand" | consultancy survey | survey | 5 | Sample size, region | medium |
| G-43 | HFS found 78% think first party data matters more with agents but only 37% have a plan to keep the relationship, and identity and fraud risk is the top barrier at 41% | 78, 37, 41 | percent of 101 leaders | 2026 | 2026-07-06 | https://www.hfsresearch.com/?p=206781 | "only 37% have a credible plan to keep the direct relationship" | analyst survey (sponsored by Cognizant) | survey | 5 | Europe, smaller merchants | medium |
| G-44 | Forrester says very few consumers let agents buy without oversight and frames readiness in four steps | 4 | steps | 2026-05-28 | 2026-05-28 | https://www.forrester.com/blogs/the-state-of-agentic-commerce-in-mid-2026/ | "Very few consumers allow agents to complete tasks or purchases without direct oversight" | analyst blog | analyst view | 5 | Scoring weights, data behind the view | medium |
| G-45 | Adobe forecasts holiday 2026 AI traffic to US retail sites up 130%, measured as link clicks, with no purchase share | 130 | percent year on year | 2026-11-01 to 2026-12-31 | 2026-09-28 | https://news.adobe.com/news/2026/09/adobe-us-holiday-shopping-season-to-hit-record | "measured by shoppers clicking on a link" | vendor research | forecast | 7 | Orders paid by agents, base size | medium |
| G-46 | Salesforce predicts 1 in 3 ecommerce sites will run a shopper agent by Cyber Week 2026 and gives no agent completed purchase share | 33 | percent of sites (1 in 3) | 2026-11 to 2026-12 | 2026-07-20 | https://www.salesforce.com/blog/holiday-retail-predictions-2026/ | "1 in 3 ecommerce sites will have a personal, site-specific shopper agent" | vendor research | forecast | 7 | Purchases completed by agents | medium |
| G-47 | Reuters reports JD's assistant drew nearly 80 million users for Singles Day 2026 advice, and Douyin AI drove about 5% of purchases through chatbot links | 80, 5 | million users, percent of purchases | 2026-11-11 | 2026-11-11 | https://www.thestar.com.my/business/2026/11/11/china039s-singles-day-shopping-festival-puts-ai-selling-power-to-the-test | "AI drove roughly 5% of purchases through chatbot links in October" | wire press | press report | 5 | Orders completed by agents, Alibaba and Tencent figures | medium |
| G-48 | Alibaba said its Qwen app generated more than 120 million orders in six days, with payment authorised in the chat | 120 | million orders (over) | 2026-02-06 to 2026-02-11 | 2026-03-30 | https://kr-asia.com/alibabas-latest-qwen-subsidies-are-a-bet-on-agentic-commerce | "generated more than 120 million orders in six days" | regional tech press (vendor figure) | company claim | 6 | Subsidy effect, Singles Day 2026 figures, order value | medium |
| G-49 | Alipay AI Pay opened to OpenClaw type agents including Claude Code, with explicit authorisation for every payment, and reports 100 million users | 100 | million users | 2026-04 | 2026-04-23 | https://fintech.global/2026/04/23/alipay-expands-ai-pay-to-openclaw-type-agents/ | "every payment requires explicit user authorisation" | trade press (vendor figure) | deployment, company claim | 6 | Human away flows, limits, volume after February | medium |
| G-50 | Chainalysis counted over 138 million x402 transactions on Base by end June 2026, with over 87% between 0.01 cent and 10 cents | 138, 87 | million transactions, percent of payments | 2025-07 to 2026-06 | 2026-10-14 | https://www.chainalysis.com/blog/north-america-crypto-adoption-2026/ | "Over 87% of payments fall between a hundredth of a cent and a dime" | on chain analytics firm | on chain measure | 3 | Dollar value, share that is real commerce, other chains | medium |
| G-51 | Stripe and Paradigm developed Tempo but put no money into its 500 million USD Series A at a 5 billion USD valuation | 500 | million USD | 2025-10-17 | 2025-10-17 | https://fortune.com/crypto/2025/10/17/stripe-paradigm-tempo-series-a-5-billion-thrive-capital-greenoaks-joshua-kushner/ | "Paradigm and Stripe did not contribute capital to the round." | national press | funding | 5 | Stripe and Paradigm stake size, later rounds | medium |
| G-52 | OpenAI charged a 4% fee on ChatGPT Instant Checkout sales from late January 2026, on top of processing fees | 4 | percent per sale | 2026-01 | 2026-02-03 | https://ecommercenews.com.au/story/openai-to-charge-4-fee-on-shopify-chatgpt-checkout | "The 4% charge applies to each sale completed in these transactions." | trade press | press report | 5 | Fee after the March 2026 checkout change | medium |
| G-53 | Google has not published fees, reporting or data sharing terms for UCP checkout in AI Mode | none | none | 2026-01-11 | 2026-01-12 | https://www.searchenginejournal.com/googles-ucp-checkout-brings-new-tradeoffs-for-retailers/564854/ | "hasn't detailed reporting, fees, or data-sharing for AI Mode checkout" | trade press | absence statement | 5 | Terms set after January 2026 | medium |
| G-54 | Agency estimates put Perplexity Commerce near a 2 billion USD annual GMV run rate, unconfirmed by Perplexity | 2 | billion USD run rate | 2026-06 | 2026-06-29 | https://www.thekeyword.co/news/perplexity-commerce-gmv-run-rate | "a directional signal rather than an audited result" | trade press citing unnamed agencies | unverified estimate | 7 | What GMV counts, agent paid share | low |
| G-55 | Chargebacks911 gives no agent dispute data and advises recording authorisation at the point of delegation | none | none | 2026-05-15 | 2026-05-15 | https://thepaypers.com/fraud-and-fincrime/news/chargebacks911-warns-of-dispute-risk-gap-in-agentic-payments | "documenting authorisation at the point of delegation rather than reconstructing it after a dispute" | trade press (vendor view) | industry position | 6 | Dispute rates, win rates | medium |
| G-56 | Signifyd reported orders from AI agent referrals up 1,247% year on year in October 2025, a referral not an agent payment measure | 1,247 | percent year on year | 2025-10 | 2026-05-18 | https://signifyd.com/blog/agentic-commerce | "orders from AI agent referrals in Signifyd's Commerce Network were up 1,247%" | vendor blog | market measure | 7 | Agent completed share, dispute rate | low |
| G-57 | Network tokens are not tied to one provider, but reuse at a new PSP depends on the token requestor and may need re tokenizing | none | none | 2026-07-03 | 2026-07-03 | https://thepaypers.com/payments/interviews/what-makes-token-portability-so-operationally-difficult-for-merchants | "are not tied exclusively to a single provider environment" | trade press interview | expert view | 5 | Agentic token specific rules, multi PSP use at once | medium |
