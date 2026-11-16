# D2 Draft sections 6, 9 and 11

Drafted 2026-11-15 for docs/Agentic_Commerce_Protocols_Technical_Design.md. Sources are the R0 to R5 briefs only. Ids in brackets point to their claim tables. R1 to R5 ids are this round. C, V#, W# and S# ids are verified baseline rows. "Proposal" marks a judgement of ours, not an observed fact.

## 6. Adoption, graded by evidence

### 6.1 What counts as live

- **Live** means real money in production, open to the public or to every merchant on a named platform, shown by a rung 2 to 4 source dated within 90 days.
- **Pilot** means real money with named partners or a closed group. **Spec** means a published spec or SDK with no verified real money for that use case.
- **Unsettled** means the rules, liability or market position are not decided. **Absent** means no product for that use case.
- Status is set per protocol and per use case (consumer checkout C, B2B procurement B, machine pay per call M) with an as_of date. The evidence tag (verified 2026, vendor, illustrative) is a separate label and never lifts a status.

### 6.2 The evidence, rung by rung

Rungs follow R0: 1 audited or reproduced, 2 primary record, 3 revealed behaviour, 4 deployment, 5 independent survey or press, 6 self report, 7 projection. No figure in this study reached rung 1. Nobody outside the companies has audited or reproduced an agent payment number.

| Figure | Protocol or company | Use case | Rung | Tag | as_of | Does not tell you | Ids |
|---|---|---|---|---|---|---|---|
| More than 50 active members by 2026-10-01. Launch count is 40 in Coinbase docs, 50 plus in our earlier record | x402 Foundation | M | 2 | verified 2026 | 2026-10-01 | Any usage | R2-33, R2-31 |
| Over 60 endorsing companies and 21 co-developers listed | UCP | C | 2 | vendor | 2026-11-15 | Who ships UCP checkout | R3-24, R1-31 |
| 12 payment method entries, no ACH | MPP | M | 2 | verified 2026 | 2026-11-15 | Which methods carry live traffic | R2-23 |
| 200,680,559 lifetime transactions, about 43.0M USD settled | x402 | M | 3 | verified 2026 | 2026-11-15 | How many payers are agents, tests or farms | R2-38 |
| 5.1M transactions worth about 274K USD, about 5 cents each | x402, October 2026 | M | 3 | verified 2026 | 2026-10-31 | Who the payers are | R2-39 |
| 48,585 lifetime events from 1,874 payers to 92 payees | MPP on Tempo | M | 3 | verified 2026 | 2026-11-15 | Off chain card MPP payments, value | R2-28 |
| 18.3M signed USDC payments in August, 2.59B USD, or 317M USD without one bridge contract | Signed USDC transfers on five EVM chains | M | 3 | verified 2026 | 2026-08-31 | Which payers are agents | R2-46 |
| No release since 2026-04-17, last commit 2026-07-18 | ACP | C | 3 | verified 2026 | 2026-11-15 | Deployments outside the repo | R1-01, R1-02 |
| 2.3% of agentic activity on checkout pages, 77% on product and search pages | HUMAN customer base | C | 3 | vendor | 2025 | Completed orders or value | R5-32 |
| AI referral visits converted 90% better than other traffic | Adobe retail data | C | 3 | vendor | 2026-09 | Agent completed checkouts | R5-27 |
| 99 named AI agents and crawlers disallowed | Amazon robots.txt | C | 3 | verified 2026 | 2026-11-15 | Technical enforcement | R5-37 |
| Universal Cart live in the US with UCP checkout | Google | C | 4 | verified 2026 | 2026-10-15 | Volume, AP2 use | C313, R1-29 |
| Shop Pay inside Muse, Claude Duet and Instinct with Mastercard, Visa and Discover tokens | Shopify | C | 4 | verified 2026 | 2026-10-28 | Number of agent purchases | R2-11 |
| 36 European banks completed controlled live agent transactions | Mastercard Agent Pay | C | 4 | vendor | 2026-06-02 | Volume, public availability | C360, R1-60 |
| Live pilot of agents paying approved invoices with tokenized credentials | Visa TAP with BILL and Billtrust | B | 4 | verified 2026 | 2026-10-20 | Participants, volume, liability terms | C349, R2-04, C351 |
| AgentCore payments GA with MPP and x402 | AWS | M | 4 | verified 2026 | 2026-08-18 | Any usage, none found | C384, R1-47 |
| First live UK agentic account to account payment, under a Direct Debit mandate | GoCardless | C | 4 | vendor | 2026-09-22 | Volume, whether others came first | R2-73 |
| 28% of US shoppers comfortable with AI buying for them | Kantar survey | C | 5 | verified 2026 | 2026-11-09 | Sample size | R5-24 |
| AI search orders up 3.3 times year on year | Shopify Q3 call | C | 5 | vendor | 2026-11-03 | Base volume, share of GMV | R3-21 |
| About half of x402 transactions judged artificial | Artemis via press | M | 5 | vendor | 2026-07-10 | Method, window | R2-47 |
| Nearly 50 AI partners live, expected to double | Visa Intelligent Commerce | C, B | 6 | vendor | 2026-10-27 | Transactions, volume, what live means | R2-01, R3-14 |
| Over 120M transactions in one February week, 300M to date by late May | Alipay AI Pay | C | 6 | vendor | 2026-05-26 | Value, agent versus assistant use | R2-66, R2-67 |
| Agentic purchases with Link up 38 times in a month | Stripe Link | C | 6 | vendor | 2026-09-29 | Base level | C312 |
| 75.41M transactions and 24.24M USD in 30 days | x402.org dashboard | M | 6 | vendor | 2026-08-25 | Method. The page no longer shows it | C369, C287, R3-27 |
| 3% of transactions involve agents | Checkout.com via press | C | 7 | vendor | 2026-07-20 | Base, definition. Not on Checkout.com's own page | R3-40, R5-11 |

Read across. Machine pay per call is the only use case with rung 3 volume, and the amounts are small. Consumer checkout has real deployments at rung 4 but every count above that rung comes from the company itself. B2B procurement has one live pilot and no volume.

x402 membership, both counts with dates. The do not regress list says x402 moved under the Linux Foundation in April 2026 with 50 plus members. Coinbase docs give 40 members at the 2026-04-02 launch [R2-31]. The Linux Foundation's operational launch release of 2026-07-14 lists 40 members with 17 premier members [R2-32, R3-26]. More than 50 were active by 2026-10-01 [R2-33]. The lead decides which launch count to carry.

### 6.3 Demand side, what people say and what they do

Surveys carry the sponsor's incentive. A neutral research firm is rung 5. A firm that sells agentic products is rung 6. A figure with no method is rung 7 (R5 grading rule).

**Consumers say**

- 23% of US adults trust GenAI to handle a payment [R5-04]. Visa paid for the poll and gains if trust attaches to networks. The same poll has 61% trusting Visa itself [R5-05].
- 28% are comfortable with AI buying for them [R5-24]. Kantar is the one neutral firm in the set.
- 9% would let an agent start and finish a purchase within limits, and 32% would let it choose if they approve the payment [R5-01, R5-02]. Accenture sells AI and commerce consulting.
- 55.0% of US and UK consumers are not comfortable with agents buying for them [R5-06]. Riskified sells fraud guarantees, so worry helps it.
- 33% would let an agent spend up to 1,000 USD without prior approval [R5-26]. Mastercard gave no method, so this sits at rung 7.

**Consumers do**

- About 132 million US adults have bought with AI's help, and 59% of those purchases end at Amazon [R5-63]. That is AI assisted buying, not an agent paying.
- AI referral traffic to US retail sites rose 71% year on year in September 2026 and converted 90% better than other traffic, after converting 9% worse in August 2025 [R5-28, R5-27, R5-29]. These are people clicking links from AI tools.
- 2.3% of the agentic activity HUMAN saw in 2025 reached checkout pages [R5-32]. HUMAN sells bot defence.
- Alipay reports over 100 million AI Pay users, with explicit user approval for every payment [R2-66, vendor].

**Businesses say**

- 42% of merchants are testing agentic commerce [R5-10] (Checkout.com, a PSP selling agentic payments) and 44% say they are integrating protocols [R5-20] (Ravelin, a fraud vendor).
- 11% of small and 19% of large merchants count as agent ready, and 23% can tell AI traffic from human [R5-12, R5-13]. PYMNTS ran this with Visa.
- 93% of merchants think the AI provider should carry the loss [R5-14], and nearly two thirds want a standard liability framework urgently [R5-21, PayPal survey].
- 80% of a mid market sample expect to pay a fee or commission on agent sales [R5-17].

**Businesses do**

- Amazon disallows 99 named AI agents in robots.txt [R5-37] and blocked Meta's Muse from 2026-09-20 [R3-39], while ucp.dev lists it as a UCP co-developer [R3-24].
- One of four Shopify storefront files checked routes agents to UCP and asks them to identify themselves [R5-40].
- JPMorgan blocks outside agents that use customers' banking credentials [R2-65]. Wells Fargo makes customers liable for agent activity unless they can evidence revoking it, from 2026-11-24 [R5-44].
- Ramp's agentic bill pay is generally available on Visa [R2-02, vendor], and Visa runs a live invoice pilot with BILL and Billtrust [C349].

Read across. Willingness to let an agent pay runs from 9% to 33% depending on the wording. Measured behaviour shows discovery growing fast and checkout staying small. The clearest business behaviour is gatekeeping, by marketplaces and by banks.

### 6.4 x402 and machine payment volume, reconciled

Trackers disagree by up to about 4 times on counts and about 60 times on value. They agree when they count the same thing [R2-38, R2-46].

| Figure | Window | Source type | Rung | Tag | Ids |
|---|---|---|---|---|---|
| 200,680,559 transactions, about 43.0M USD | Lifetime to 2026-11-15 | Independent on chain tracker (agenteconomy.to) | 3 | verified 2026 | R2-38 |
| 196M transactions, more than 42M USD | Lifetime to 2026-11-01 | Vendor blog citing the same tracker (Fireblocks) | 5 | vendor | R2-41 |
| 5.1M transactions, about 274K USD | October 2026 | Independent on chain tracker | 3 | verified 2026 | R2-39 |
| 17.9M transactions | August 2026 | Independent on chain tracker, monthly table | 3 | verified 2026 | R2-38 |
| 18.3M signed USDC payments, 2.59B USD, or 317M USD without one bridge contract | August 2026 | Independent on chain audit (Bitquery), wider definition | 3 | verified 2026 | R2-46 |
| 75.41M transactions, 24.24M USD | 30 days to late August 2026 | x402.org dashboard, the protocol's own figure | 6 | vendor | C369, C287 |
| 75.41M transactions, 24.24M USD | Reported as 30 days to mid October 2026 | Trade press citing x402.org | 3 in R3, 6 in R2 | vendor | R3-27 |
| More than 138M transactions on Base alone | Q3 2026 | Press reporting Chainalysis | 5 | vendor | R2-45 |
| 68.3M agent payments worth 3.7M USD | Q3 2026 | Vendor blog citing Allium, own classification | 5 | vendor | R2-44 |
| About 19M USD adjusted | Cumulative to 2026-04-21 | Press reporting Visa and Artemis | 5 | vendor | C285 |
| About half artificial, real daily settlement near 28,000 USD | To 2026-07-10 | Press citing Artemis and CoinDesk | 5 | vendor | R2-47 |
| One facilitator (Polygon) carried 60.1% of transactions | Five days to 2026-11-14 | Independent on chain tracker | 3 | verified 2026 | R2-40 |

**What the page uses.** The independent tracker: about 274K USD and 5.1M transactions in October 2026, and about 43.0M USD and 200.7M transactions over x402's life to 2026-11-15 [R2-38, R2-39]. Reasons: it is on chain and outside the protocol (rung 3), it is dated, it gives a monthly window, it uses the narrowest value definition, and its August count sits within about 2% of Bitquery's count where the two definitions match [R2-46]. Q3 2026 counts are carried as a range of about 37M to 138M because the higher counts use methods we could not open [R2-38, R2-44, R2-45]. The page also says that up to half may be artificial [R2-47], that one facilitator carried 60.1% of recent traffic [R2-40], and that about 4,000 wallets drove about 90% of adjusted spend in April [C286].

**Reconciling 24.24M USD per 30 days in August 2026.** The payouts page figure traces to the x402.org dashboard read in August (page updated 2026-08-25) [C369] and to a Crypto Briefing report on the 30 days to mid August [C287]. It is the protocol's own number, so it is vendor at rung 6. R3-27 repeats the identical pair, 75.41M transactions and 24.24M USD, for the 30 days to mid October. The same two figures two months apart point to one dashboard reading quoted twice, so this doc reads R3-27 as the August figure and does not use it for October. The dashboard and the tracker do not count the same thing: for August the dashboard shows 75.41M transactions and the tracker 17.9M [C369, R2-38]. The dashboard's one month value is also about 56% of the tracker's lifetime value (illustrative, 24.24 over 43.0). x402.org no longer shows the dashboard [R2-37]. Proposal: the payouts page keeps 24.24M only with the vendor tag and its August window, or switches to the tracker figures.

### 6.5 What the evidence does not show

- **Network volume.** No card network has published agent payment volume or an agentic token count. Visa expects agent activity to stay very small for four quarters and Mastercard calls it early days [R2-01, R2-09, R3-14, R3-17]. Google and Shopify give no transaction counts either [R3-23, R3-21].
- **Audit.** No figure reached rung 1. The only rung 3 volume is machine pay per call on chain [R2-38, R2-28].
- **Who the x402 payers are.** Trackers count payments, not agents, and up to half may be artificial [R2-38, R2-47].
- **Failure rates.** No agent specific decline, false decline, dispute or chargeback rate was found in any PSP, network or survey page searched (R5 section 8). Card dispute rules still describe a human cardholder's claim [C299].
- **Payouts.** Visa Direct and Mastercard Move had no agent payout product as of 1 Nov 2026 (R0 do not regress list). R2 found none either, by search only. Payouts stay on the payouts page.
- **Use of what is live.** AWS AgentCore payments has been GA since 2026-08-18 with no usage figure found [C384, R2 section 3], and no live ACP checkout dated in the last 90 days was found [R1-02].

## 9. Who is solving it

### 9.1 How we picked

Criteria and weights were frozen in R0 before research began. Each candidate scores 0 to 5 per criterion, the score is multiplied by the weight, and each score keeps the evidence id behind it.

| Criterion | Weight | Evidence needed |
|---|---|---|
| Authors or co-owns a protocol in this study | 25 | Spec or governance page |
| Live production evidence, verified and not a vendor claim | 25 | Rung 2 to 4 |
| Reach: merchants, issuers or agents connected | 20 | Disclosed count, tagged vendor if self reported |
| Moves in the last 90 days (2026-08-17 to 2026-11-15) | 15 | Dated launch or partnership |
| Startups only: verified funding and named customers | 15 | Filing, investor page or credible press |

- A **company** is a public company or a private firm over 10 years old. Maximum score 425.
- A **startup** was founded in 2019 or later and is not majority owned by an incumbent. Maximum score 500. Founding years were not opened for most startups, so the test is assumed met for all except Lithic, which is likely older than 2019 (R3 section 10).
- Every candidate covers at least two stack layers or owns one outright.
- A vendor reported number never decides a ranking alone. As a check, R3 cut every vendor only reach score to 2. The top three in both lists kept the same members (R3 section 2.3).

### 9.2 Scores

Companies. P protocol, L live, R reach (v means vendor reported), M moves.

| Rank | Company | Layers | P | L | R | M | Score of 425 | Ids |
|---|---|---|---|---|---|---|---|---|
| 1 (tie) | Google | 1, 2, 4 | 5 | 4 | 5 v | 5 | 400 | C281, R3-24, C313, R3-21, R3-23 |
| 1 (tie) | Mastercard | 2, 3, 4, 5, 7 | 5 | 4 | 5 v | 5 | 400 | C366, C360, R3-17, C309 |
| 3 | Visa | 2, 3, 4, 5, 6 | 5 | 4 | 4 v | 5 | 380 | C364, C395, C349, R3-14, R3-15 |
| 4 | Shopify | 1, 2, 4 | 4 | 4 | 5 v | 5 | 375 | R3-24, R3-20, R3-22 |
| 5 | Stripe | 2, 4, 5, 6 | 5 | 3 | 3 v | 5 | 335 | R3-25, C312, R3-29, R3-30 |
| 6 | Ant Group (Alipay) | 2, 4, 5 | 3 | 3 | 5 v | 3 | 295 | R3-13, R3-38, C365 |
| 7 | OpenAI | 1, 2 | 4 | 2 | 4 v | 2 | 260 | R3-25, C359, R3-17 |
| 8 (tie) | Coinbase | 4, 5, 6 | 3 | 3 | 3 | 0 | 210 | R3-26, R3-28, R3-27, C285 |
| 8 (tie) | PayPal | 1, 4, 7 | 1 | 3 | 4 v | 2 | 210 | R3-32, R3-33, R3-34 |
| 10 | Amazon (AWS and retail) | 2, 3, 4 | 2 | 3 | 0 | 4 | 185 | R3-24, C384, R3-39 |

Startups. F is funding and named customers.

| Rank | Startup | Eligibility | Layers | P | L | R | M | F | Score of 500 | Ids |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Tempo | Provisional, incubated by Stripe and Paradigm | 5, 6, transport | 5 | 3 | 3 v | 1 | 4 | 335 | C370, R3-42, C384, R3-41 |
| 2 | Rain | Founding year not opened | 2, 4, 5 | 1 | 2 | 3 v | 3 | 5 | 255 | C416, C399, R3-43 |
| 3 | Skyfire | Founded 2024 per a secondary source | 3, 4, 5 | 4 | 2 | 0 | 3 | 3 | 240 | C367, R3-54, R3-53 |
| 4 | Crossmint | Founding year not opened | 4, 5, checkout | 1 | 2 | 0 | 4 | 3 | 180 | R3-52, C416, R3-51 |
| 5 | Kite AI | Founding year not opened | 3, 5 | 1 | 2 | 2 v | 0 | 3 | 160 | R3-48, R3-47 |
| 6 | Basis Theory | Founding year not opened | 2, 4 | 2 | 2 | 0 | 0 | 3 | 145 | R3-49 |
| 7 | Paid | Fails the two layer test (billing only) | 6 | 0 | 2 | 1 | 0 | 4 | 130 | R3-50 |
| 8 | Catena Labs | Founding year not opened | 2, 6 | 0 | 1 | 0 | 3 | 3 | 115 | R3-44, R3-45 |
| 9 | Natural | Founding year not opened | 4, 5, 6 | 0 | 2 | 0 | 0 | 3 | 95 | C398 |
| 10 | Sapiom | Founding year not opened | 2, 5 | 0 | 0 | 0 | 0 | 3 | 45 | R3-46 |

With vendor only reach cut to 2, companies become Google 340, Mastercard 340, Visa 340, Shopify 315 and Stripe 315. Startups become Tempo 315, Skyfire 240, Rain 235 and Crossmint 180 (R3 section 2.3).

### 9.3 Top three companies, read as one tier

Google and Mastercard tie at 400 and Visa scores 380. The gap rests on reach figures each company reports about itself, and with those cut all three score 340. We report them as one tier, not a ranking.

**Google (400 of 425)**

- **Building.** UCP, co-developed with Shopify, for discovery, cart and checkout, and AP2, which it wrote, for signed mandates [C281, R3-24, R1-35]. Universal Cart puts UCP checkout inside Search and the Gemini app [C313].
- **Layers.** 1 Discover, 2 Intent and mandate, 4 Credential through UCP payment handlers [R3-24].
- **Latest moves.** 2026-01-11 UCP published, with PayPal support the same day [R3-21, R3-33]. 2026-09-02 a UCP Payments Technical Council of 8 formed [R1-21]. 2026-10-15 Universal Cart live in the US [C313, R1-29]. 2026-10-28 Google said UCP gives direct checkout for hundreds of thousands of brands and is being combined with AP2 [R3-23, vendor].
- **Weak spot.** AP2 work moved to FIDO with no draft found, the AP2 repo has been idle since 2026-04-29, and v0.2 dropped the user signed Intent Mandate [R1-35, R1-40, R5-71]. A May count found 26 UCP implementations and no large brands [R3-21]. Amazon is a listed co-developer and blocks outside agents on its store [R3-24, R3-39]. No volume is disclosed [R3-23].
- **Watch.** AP2 mandates inside a tagged UCP release, Gemini agents for consumers "later this year" [R3-23], and any checkout volume.

**Mastercard (400 of 425)**

- **Building.** Agent Pay with agentic tokens, Verifiable Intent for signed purchase records, Agent Pay for Machines across cards, accounts and stablecoins, and an agent transaction score [R3-18, C366, C419, C309].
- **Layers.** 2 Intent, 3 Agent identity through Web Bot Auth keys in a Mastercard directory [R1-53], 4 Credential, 5 Rail, 7 Dispute support.
- **Latest moves.** 2026-06-02 all European issuers enabled and 36 banks completed controlled live transactions [C360, vendor]. 2026-09-10 a know your agent framework begun with Ant International and Visa [C365, R1-68]. 2026-10-29 a broad partnership with OpenAI that includes Agent Pay, disclosed on the Q3 call, where the CEO called one time virtual cards a bridge it will not support long term [R3-17, R2-09].
- **Weak spot.** Volume, which the CEO called early days [R3-17]. Verifiable Intent is Draft v0.1 with no commit since 2026-04-20 [R1-61, R1-63]. The agent score's accuracy and price are not disclosed [C309]. Only Mastercard has described the OpenAI deal [R3-17].
- **Watch.** Whether network rules restrict virtual cards for agents (R2 open question), and whether ChatGPT checkout uses Agent Pay tokens.

**Visa (380 of 425)**

- **Building.** Trusted Agent Protocol for signed agent requests under RFC 9421, Intelligent Commerce for agentic tokens and consumer instructions held by Visa, and Intelligent Commerce Connect, an on-ramp that accepts TAP, MPP, ACP and UCP [C364, R2-05, C395].
- **Layers.** 2 Intent, 3 Agent identity, 4 Credential, 5 Rail, 6 Settle.
- **Latest moves.** 2026-10-20 a live pilot with BILL and Billtrust where agents pay approved invoices [C349, R1-54]. 2026-10-27 nearly 50 AI partners live and Ramp agentic bill pay generally available [R3-14, R2-02, vendor]. 2026-11-05 a benchmark of 22 models found a 57.2% pass rate, and 54% of failed runs still bought something [R3-15].
- **Weak spot.** The CEO expects agent activity to stay very small for four quarters [R3-14]. The B2B pilot has no formal liability framework and no disclosed volume [C351]. The TAP sample repo has had no commit since 2025-10-28 [R1-52]. Only 23% of US adults trust AI to pay [R5-04].
- **Watch.** The partner count doubling [R2-01], commercial virtual card authentication reaching GA, expected in 2027 [R2-04], and the "clear path to resolution" the CEO asked for [R2-03].

### 9.4 Top three startups

Tempo leads on score, but its place is provisional. Stripe and Paradigm incubated it and their stakes are not disclosed, so it may fail the "not majority owned by an incumbent" test [R3-41]. If Tempo is excluded, Crossmint (180) moves up to third [R3-52, R3-51].

**Tempo (335 of 500, provisional)**

- **Building.** A payments chain with fees in USD stablecoins and claimed sub second finality, plus MPP, which pays over HTTP 402 [R2-26, C370]. MPP lists Tempo, Stripe, Lightning, Solana and other methods, and no ACH [R2-23].
- **Layers.** 5 Rail, 6 Settle, and the HTTP transport.
- **Latest moves.** 2025-10-17 a 500 million USD Series A at about 5 billion USD [R3-41]. 2026-03-18 mainnet and MPP live with more than 100 compatible services and design partners including Visa, Mastercard, OpenAI and Anthropic [R3-42, vendor]. 2026-08-18 AWS AgentCore payments GA with MPP support [C384].
- **Weak spot.** MPP on Tempo shows 48,585 lifetime events, about one for every 4,100 x402 transactions (illustrative ratio) [R2-28, R2-38]. The MPP IETF draft has expired [R2-25]. Payments are final, so refunds depend on agreement.
- **Watch.** Disclosure of Stripe's and Paradigm's stakes, and MPP's on chain counts.

**Rain (255 of 500)**

- **Building.** Scoped virtual cards for agents, funded by stablecoins and accepted where Visa is, with an Agent Control Layer that enforces limits at card issuance and transfer start [C399, R3-43].
- **Layers.** 2 Intent, 4 Credential, 5 Rail. No protocol of its own.
- **Latest moves.** 2026-01-09 a 250 million USD Series C led by ICONIQ at 1.95 billion USD, reporting over 200 partners and over 3 billion USD in annualized transactions [R3-43, vendor]. 2026-08-18 the Agentic Payments Alliance launched with 26 founding members including Visa, Mastercard, Fiserv and Circle [C416].
- **Weak spot.** The agent product is in beta and agent volume is not split from card volume [C399, R3-43]. The alliance has no published spec [C416]. Mastercard's stance on virtual cards goes straight at its model [R2-09].
- **Watch.** Network rules on virtual cards, and a first alliance spec.

**Skyfire (240 of 500)**

- **Building.** Know your agent identity tokens with payment attached. A KYA token carries agent, platform and human principal claims from an issuer that did KYC or KYB [C367, R1-67].
- **Layers.** 3 Agent identity, 4 Credential, 5 Rail with stablecoin settlement [R3-54].
- **Latest moves.** 2024-10-24 funding reached 9.5 million USD in total [R3-53]. 2026-10-02 KYAPay draft 01 at the IETF [C367]. 2026-11-02 draft 02 with an Akamai co-author [R1-67].
- **Weak spot.** KYAPay is an individual draft with no formal standing [C367]. A secondary analysis says checkout adoption is basically zero and API billing is the main use [R3-54, low confidence]. No 2025 or 2026 round was found.
- **Watch.** The Ant, Mastercard and Visa know your agent framework [C365], which could make a startup identity layer redundant.

### 9.5 Runners up and ones to watch

- **Shopify (375).** Co-developed UCP and put Shop Pay inside Muse, Claude Duet and Instinct with network tokens [R3-20]. Misses the top tier only on protocol authorship.
- **Stripe (335).** Co-authors ACP and MPP, but its live claims are self reported and ChatGPT Instant Checkout ended in March 2026 [C359, R3-29].
- **Ant Group (295).** Over 120 million Alipay AI Pay transactions in one week [R3-38, vendor], outside the Western protocol stack.
- **OpenAI (260).** ACP co-author, now a partner of both networks, with checkout moved to retailer sites [C359, R3-17].
- **Coinbase (210).** x402 originator, now one of 17 premier members of the x402 Foundation [R3-26].
- **Amazon (185).** AgentCore payments GA with MPP and x402 while blocking outside agents on its store [C384, R3-39].
- **Crossmint (180, startup).** Live self serve toolkit using both networks' agent tokens [R3-52]. First in line if Tempo is ruled out.
- **Catena Labs (115, startup).** OCC preliminary conditional approval for an agent focused trust bank on 2026-09-18 [R3-45]. Watch for the final charter.
- **Tencent.** Exploratory agent payment agreements with Visa (2026-10-29) and Mastercard (2026-11-02) [R3-16, R3-19]. Not scored, nothing is live.

## 11. How this changes the future, 2026 to 2030

### 11.1 Forecasts, as ranges with the author's incentive

All forecasts are rung 7 projections. They are carried as ranges and never averaged.

| Author | Figure | Year | Scope | Geography | Author's incentive | Ids |
|---|---|---|---|---|---|---|
| Morgan Stanley | About 190 billion USD (base) to about 385 billion USD (bull) | 2030 | Agentic GMV from AI shopping assistants | US | Investment bank covering and advising e-commerce and payments firms | R3-02, R3-03 |
| Bain | 300 to 500 billion USD | 2030 | Purchases agents initiate, influence or complete | US | Sells retail and technology consulting | R3-04 |
| McKinsey | Up to 1 trillion USD (US), 3 to 5 trillion USD (global) | 2030 | "Orchestrated" retail revenue, term not defined | US and global | Sells transformation consulting to retailers and payment firms | R3-01 |
| Juniper Research | 8 billion USD in 2026 to 1.5 trillion USD | 2030 | Spending where agents handle discovery to payment | Global | Sells the paywalled report | R3-07 |
| Juniper Research | 8 billion USD in 2026 to 3.5 trillion USD | 2031 | Total agentic transaction value | Global | Sells the paywalled report | R3-08 |
| Edgar Dunn | 2.9 trillion USD | 2030 | Retail transaction flows | Not stated | Advises acquirers, and the article urges them to act now | R3-06 |
| WARC and PHD | 944 billion USD in 2026 to 3.35 trillion USD | 2030 | Spending agents influence or complete | Global | Sells marketing research, and PHD is a media agency | R3-11 |
| eMarketer | 20.9 billion USD in 2026 to 144 billion USD | 2029 | Sales through AI platforms | US | Sells research subscriptions to marketers and retailers | R3-09 |
| Gartner | More than 15 trillion USD of B2B spend intermediated | 2028 | B2B buying intermediated by agents | Global | Sells research and advice to IT buyers and vendors | R3-05 |
| BCG | 12.5 trillion JPY in 2026 to 15.6 trillion JPY | 2030 | Purchases where AI materially shapes the choice | Japan | Sells consulting | R3-12 |
| ARK Invest | 8 trillion USD, read through a secondary source | 2030 | Online consumer spending facilitated by agents | Not stated | Markets innovation themed funds | R3-10 |
| Forrester | No number. Adoption "low and relatively stagnant" | None | Consumer agentic payments | None | Sells research subscriptions | R3-13 |

How to read them:

- For 2030, the band runs from 190 billion USD (Morgan Stanley base, US) to 5 trillion USD (McKinsey high, global), about 25 times [R3-02, R3-01]. Scope and geography drive most of the gap.
- ARK's 8 trillion USD would widen the band to about 42 times. It was read through a secondary source, so it is logged and not applied [R3-10].
- Juniper moved from 1.5 trillion USD by 2030 to 3.5 trillion USD by 2031 within three months [R3-07, R3-08].
- Even 2026 differs: 8 billion USD globally (Juniper), 20.9 billion USD through US AI platforms (eMarketer), and 944 billion USD that agents influence or complete (WARC and PHD) [R3-07, R3-09, R3-11].
- Most scopes count purchases agents influence or orchestrate, which is wider than agent paid checkout. The measured anchor is small: x402 settled about 274K USD in October 2026 [R2-39], and Visa calls agent activity very small [R3-14].

### 11.2 Four scenarios to 2030 (Proposal)

The scenarios are not exclusive. Machine payments can split off while networks absorb consumer checkout. The thesis in section 3, build to the token and the mandate rather than the protocol, is meant to hold in all four.

**S1 Networks absorb agents**

- **What has to be true.** Agentic network tokens become the default credential in agents. Networks publish agent indicators and a dispute path. One time virtual cards fade.
- **Evidence today.** Mastercard calls virtual cards a bridge [R2-09]. Shop Pay inside agents uses network tokens [R2-11]. Stripe tokens can ride network agentic tokens [R2-16]. Visa's Connect accepts four protocols [C395]. EMVCo drafted Agentic Transaction Indicators [R1-64].
- **Merchants (Hana).** Keep their PSP and chargeback rules they know. Agent fees may appear.
- **Issuers.** Keep interchange and gain agent risk signals, and carry agent fraud where authentication shifts liability to them [C299].
- **Builders (Sam).** Integrate token provisioning and passkey step up through a PSP. Card fees still rule out sub dollar sales [R2-18].
- **Protocols that gain.** Visa TAP and Intelligent Commerce, Mastercard Agent Pay and Verifiable Intent, Web Bot Auth.

**S2 Open protocols fragment, then converge**

- **What has to be true.** UCP and AP2 merge as Google said they would [R3-23]. FIDO publishes a mandate draft [R1-40]. Web Bot Auth reaches an RFC [R1-56]. ACP folds in or fades [R1-02].
- **Evidence today.** At least five overlapping intent formats exist, and none defines a dispute process [R1-05, R1-37, R1-61, R1-64, R1-65]. UCP is the most active commerce protocol, with a Food Checkout capability merged on 2026-11-10 [R1-24]. The Web Bot Auth group missed its April and August milestones [R1-57].
- **Merchants (Hana).** One adapter serves most agents and the merchant stays merchant of record [R1-27].
- **Issuers.** A signed mandate becomes dispute evidence, if networks accept it.
- **Builders (Sam).** Build once to UCP with AP2 mandates and RFC 9421 signatures.
- **Protocols that gain.** UCP, AP2 under FIDO, Web Bot Auth, MCP as a transport.

**S3 Closed platform wallets win**

- **What has to be true.** Agents pay through the wallet of the platform they live in. Marketplaces keep blocking outside agents. Merchants accept platform fees to reach agent shoppers.
- **Evidence today.** Shop Pay reports over 400 million users [R2-12, vendor]. Alipay AI Pay reports over 100 million [R2-66, vendor]. ChatGPT Wallet hands merchants a network token [R1-14]. Amazon bars 99 named agents [R5-37]. 80% of a merchant sample expect agent fees [R5-17].
- **Merchants (Hana).** Pay for reach and risk losing the customer relationship to the platform.
- **Issuers.** Sit behind the wallet's token and see less of the agent.
- **Builders (Sam).** Integrate one wallet per platform, and reach is capped by platform consent [R3-39].
- **Protocols that gain.** Shopify surfaces, Ant's AMP, Stripe Link, platform specific checkout.

**S4 Machine payments split off onto stablecoin rails**

- **What has to be true.** Pay per call for APIs, data and content settles over HTTP 402 in stablecoins, apart from card checkout. Organic payers grow beyond a narrow base.
- **Evidence today.** x402 averages about 5 cents a payment [R2-39]. Circle nanopayments go down to 0.000001 USD [R2-52]. AWS AgentCore payments supports MPP and x402 [C384]. Against it: about 4,000 wallets drove about 90% of adjusted spend [C286], and more than half of lifetime transactions came in two months of late 2025 [R2-42].
- **Merchants (API sellers).** Price per call in cents. Settlement is final, so refunds need terms written in advance.
- **Issuers.** Largely bypassed, unless networks carry stablecoin flows such as Agent Pay for Machines [C419].
- **Builders (Sam).** Give each agent a wallet with spend caps and idempotent retries, since retries during facilitator outages can pay twice [R5-69].
- **Protocols that gain.** x402, MPP, L402.

### 11.3 Signposts, 2026 to 2030

Scheduled facts carry ids. Proposed signposts are events we would watch for and are marked Proposal. A proposed signpost's year is our estimate.

| Year | Date | Signpost | Points to | Type | Ids |
|---|---|---|---|---|---|
| 2026 | 2026-11-24 | Wells Fargo customers stay liable for agent activity unless they evidence revocation | S1, banks steer agents to tokens | Scheduled fact | R5-44, R2-65 |
| 2026 | By end 2026 | FCA consults on a long term open banking framework | S2 | Scheduled plan | R2-74 |
| 2026 | Late 2026 | Google brings Gemini agents to consumers | S2 or S3 | Vendor plan | R3-23 |
| 2026 | Nov to Dec | Adobe and Salesforce holiday reports, which will show referral traffic, not agent payments | Calibrates forecasts | Expected reports | R5-30, R5-64 |
| 2027 | 2027-01-18 | OCC GENIUS Act rule for stablecoin issuers takes effect | S4 | Scheduled fact | C341 |
| 2027 | First half 2027 | Four large US banks plan a shared tokenized deposit network | S4 or S1 | Plan reported by press | C422 |
| 2027 | 2027 | Visa commercial virtual card authentication and supplier validation reach GA | S1 | Vendor expectation | R2-04 |
| 2027 | 2027-05-02 | Web Bot Auth working group draft 01 expires. A newer draft or an IESG submission shows progress | S2 | Scheduled fact | R1-56, R1-57 |
| 2027 | 2027-05-06 | KYAPay draft 02 expires unless renewed or adopted | S2 | Scheduled fact | R1-67 |
| 2027 | About late 2027 | Visa's four quarter "very small" window closes. A network discloses agent volume | S1 | Proposal | R3-14 |
| 2027 | None | A network publishes an agent dispute reason code or indicator rule | S1 | Proposal | C299, R1-64, R2-03 |
| 2027 | None | Network rules restrict one time virtual cards for agents | S1 | Proposal | R2-09 |
| 2027 | None | EU PSR final text appears in the Official Journal, with refund rules agents inherit | S2 | Proposal, date not in our briefs | C305 |
| 2028 | None | FIDO payments group publishes a mandate draft | S2 | Proposal | R1-40 |
| 2028 | None | UCP and AP2 ship in one tagged release | S2 | Proposal | R3-23, R1-19 |
| 2028 | None | CFPB clarifies Regulation E for agent initiated transfers | S2 | Proposal | R5-54, C296 |
| 2028 | None | Amazon still blocks named outside agents, or admits them through UCP | S3 or S2 | Proposal | R5-37, R3-24 |
| 2028 | 2028 | Gartner's B2B checkpoint, more than 15 trillion USD intermediated | Calibrates forecasts | Forecast checkpoint | R3-05 |
| 2029 | None | x402 monthly value grows with no facilitator above half | S4 | Proposal | R2-39, R2-40 |
| 2029 | 2029 | eMarketer's checkpoint, 144 billion USD of US AI platform sales | S3 | Forecast checkpoint | R3-09 |
| 2030 | 2030 | The 190 billion to 5 trillion USD band is tested | All | Forecast checkpoint | R3-02, R3-01 |
| 2030 | None | A network reports agent share of card not present volume | S1 | Proposal | R3-14, R2-09 |

### 11.4 How protocols change the shape of commerce

- **Discovery moves from search pages to feeds, MCP servers and capability files.** Shop MCP covers over 1 billion products [R1-33, vendor], UCP businesses publish a profile at /.well-known/ucp [R1-26], and Klarna's product protocol covers over 100 million products [R1-71, vendor]. Access becomes a permission: Amazon bars 99 named agents while one Shopify storefront file routes them to UCP [R5-37, R5-40].
- **Checkout becomes an API call with a credential the agent never sees.** UCP keeps the business as merchant of record [R1-27], Shop Pay never shares the card with the agent [R2-11], and Stripe tokens carry amount, expiry and revocation [R2-15]. The browser path stays too: ChatGPT moved checkout back to retailer sites [C359, R1-15].
- **Identity moves to the agent.** Visa TAP, Mastercard Agent Pay and ChatGPT's cloud browser sign requests under RFC 9421 [R1-16, R1-53]. Shopify states that a valid signature is not buyer permission [R1-34], so merchants will check the agent and its principal as well as the card [R1-67, R1-68].
- **Disputes need evidence of intent.** Card dispute rules describe a human cardholder's claim [C299]. Mandate formats produce evidence but define no dispute process [R1-37, R1-61], AP2 v0.2 dropped the user signed Intent Mandate [R5-71], and banks now ask customers to prove revocation [R5-44]. Proposal: the evidence store (ADR-4) becomes the merchant's main defence.
- **Prices can fall to cents and below.** x402 averaged about 5 cents a payment in October [R2-39], Circle nanopayments reach 0.000001 USD [R2-52], and Stripe settles stablecoins from 0.01 USDC against 0.50 USD for card tokens [R2-18]. Proposal: per call pricing for APIs, data and content becomes viable where card fees ruled it out.
