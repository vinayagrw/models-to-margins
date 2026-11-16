# R5 Customer pain points and industry challenges

Strand R5 of the agentic commerce protocols study. As of 2026-11-15. Follows R0_schema.md. Stack layers: 1 Discover, 2 Intent and mandate, 3 Agent identity, 4 Credential, 5 Rail, 6 Settle, 7 Dispute.

How to read this brief. R5-xx ids are claims opened in this round (section 7). C-xxx and DC#xx ids are verified baseline rows from R0_R5_pain.md, reused without change. Every survey is stated intent, not behaviour, unless the row says otherwise. Vendor surveys carry the vendor tag and the vendor's incentive. Grading rule used here: a neutral research firm survey is rung 5, a survey paid for or run by a firm that sells agentic products is rung 6, a figure with no method is rung 7.

Method note. The shared web search budget for this run ran out part way through. After that point only pages already found were opened. Gaps this caused are listed in section 8.

## 1. Summary

- Trust is the binding limit on demand. Only 23% of US adults trust GenAI to handle a payment (Visa and Harris Poll, May 2026), 28% are comfortable with AI buying for them (Kantar, published 2026-11-09), and 9% would let an agent complete purchases alone (Accenture, 16 countries).
- People will let an agent pick but not pay. 32% accept an agent choice inside limits with a final human approval (Accenture). Nearly three quarters want agents to buy only from brands they know (Accenture holiday survey).
- In this window large US banks pushed agent risk onto consumers. Bank of America told customers they are responsible for activity from shared logins (confirmed 2026-10-27). Wells Fargo will hold customers liable unless they can evidence revoking an agent, from 2026-11-24.
- Liability has no rule and no case law. The PNC CEO said a massive liability shift would be needed and Stripe said there is no case law (Payments Dive, 2026-10-28). Merchants want the AI provider to carry the loss (93% in a PYMNTS and Visa survey) while card rules leave it with the merchant by default (C299).
- Agent traffic is large in volume but thin at checkout. HUMAN saw 2.3% of agentic activity on checkout pages in 2025 and 77% on product and search pages. Visa's CEO expects agentic activity to stay very small relative to Visa over the next four quarters (call of 2026-10-27).
- AI referral traffic now converts better than other traffic (Adobe, September 2026, 90% better). That is people clicking links from AI tools, not agents paying. Adobe missed its own Prime Day AI traffic forecast (103% forecast, 89% measured, per a third party).
- Gatekeeping is the most visible merchant behaviour. Amazon's robots.txt bars 99 named AI agents and crawlers, including GoogleAgent-Shopping, ChatGPT-User and Claude-User (checked 2026-11-15). Amazon blocked Meta's Muse agent from 2026-09-20. The Ninth Circuit overturned the injunction against Perplexity's Comet on 2026-08-04, so the law on agent access is still open.
- Merchants cannot see or govern agents yet. Only 23% can tell AI traffic from humans, fewer than one in six have defined which products agents may buy, and none in a PYMNTS sample of 60 could fully tie AI visits to sales.
- Protocol repos show disputes and proof as the weakest layer. Open issue themes cluster on dispute evidence, receipts and proof of delivery. AP2 v0.2 dropped the user signed Intent Mandate and its mispick dispute row, and a 2026-11-03 issue asks what now settles that dispute.
- Proposed top 10 challenges: unsettled liability, consumer trust to delegate payment, agent identity, platform gatekeeping, dispute evidence, bank credential access, fraud models and false declines, mandate scope and revocation, rules that assume a human approver, and agent reliability.

## 2. Pain points by stakeholder

53 pain points. Evidence column holds a number or a quote under 15 words. Rung uses the R0 evidence ladder.

### 2.1 Consumers

| # | Pain in plain words | Evidence | Source type | Rung | Layers | Claim |
|---|---|---|---|---|---|---|
| CO-1 | I do not trust an agent to press pay for me | 23% trust GenAI with payments (US). 28% comfortable with AI buying for them | vendor survey (Visa), research firm (Kantar) | 6, 5 | 2, 4 | R5-04, R5-24 |
| CO-2 | I will let it choose, but I want to approve | 32% accept a choice within limits, 9% allow full completion | vendor survey (Accenture) | 6 | 2 | R5-01, R5-02 |
| CO-3 | Agents will make fraud worse | 53.9% think AI could raise online fraud risk | vendor survey (Riskified) | 6 | 3, 4 | R5-08 |
| CO-4 | If it buys the wrong thing, who pays me back | 50.8% say AI platforms should be responsible for unauthorized purchases | vendor survey (Riskified) | 6 | 7 | R5-07 |
| CO-5 | If I cannot dispute it, I stop using it | 25% would stop using an agent if disputes are hard | vendor survey (Checkout.com) | 6 | 7 | R5-09 |
| CO-6 | My bank says sharing my login makes me responsible | "you're responsible for activity resulting from that access" | press on bank email | 5 | 4, 7 | R5-43 |
| CO-7 | I have to prove I switched the agent off | Liable unless evidence of revocation, Wells Fargo, from 2026-11-24 | press | 5 | 2, 7 | R5-44 |
| CO-8 | My data goes further than I want | Privacy and security is the top concern, 32% to 42% by age group (Europe). Muse testers reported uploads without permission | vendor survey (Deloitte), press citing Reuters | 6, 5 | 3, 4 | R5-65, R5-62 |
| CO-9 | I only want it to buy from brands I know | Nearly three quarters want agents limited to familiar brands | vendor survey (Accenture) | 6 | 1, 2 | R5-25 |

### 2.2 Merchants, large retail

| # | Pain in plain words | Evidence | Source type | Rung | Layers | Claim |
|---|---|---|---|---|---|---|
| ML-1 | We cannot tell good agents from humans or bad bots | 23% can tell AI traffic from humans. Bots are 53% of web traffic | survey with Visa via press, vendor traffic data (Imperva) | 6, 3 | 3 | R5-13, R5-36 |
| ML-2 | We cannot tie agent visits to sales | None of 60 merchants could fully connect AI visits to purchases | research publisher survey (PYMNTS) | 6 | 1, 6 | R5-18 |
| ML-3 | Agents add a toll and squeeze margin | 80% expect to pay a fee or commission on agent sales | research publisher survey (PYMNTS) | 6 | 6 | R5-17 |
| ML-4 | We carry the loss when the agent errs | 93% say the AI provider should bear the loss. Card rules leave the merchant liable unless it wins | survey with Visa via press, chargeback vendor blog | 6, 5 | 7 | R5-14, C299 |
| ML-5 | We have not set what agents may buy | Fewer than one in six defined which products agents may buy | research publisher survey (PYMNTS) | 6 | 2 | R5-16 |
| ML-6 | Our fraud defences are not ready | 29% feel very prepared for agent fraud and security issues | vendor survey (Ravelin) | 6 | 3, 7 | R5-19 |
| ML-7 | When a chargeback comes, we cannot name the agent | "the merchant's representment has nothing to point at" (ACP issue) | developer forum | 6 | 3, 7 | R5-70 |
| ML-8 | Too many protocols and credential types to support | Visa's on-ramp spans TAP, MPP, ACP and UCP. Mastercard calls virtual cards only a bridge | network statements | 4, 6 | 1 to 4 | C395, R5-51 |

### 2.3 Merchants, small business

| # | Pain in plain words | Evidence | Source type | Rung | Layers | Claim |
|---|---|---|---|---|---|---|
| SB-1 | We are not agent ready | 11% of SMBs versus 19% of large merchants qualify as agent ready | survey with Visa via press | 6 | 1 | R5-12 |
| SB-2 | Our catalog is not machine readable | About one in five have 80% or more of the catalog structured. 15% have structured product data | vendor survey (PayPal), survey with Visa | 6 | 1 | R5-22, R5-15 |
| SB-3 | No time, skills or budget | "constrained by time, technical expertise, and budget for dedicated AI roles" | vendor survey (PayPal) | 6 | 1 to 4 | R5-23 |
| SB-4 | We need a liability rule before we take part | Nearly two thirds call a standard liability framework "urgently needed" | vendor survey (PayPal) | 6 | 7 | R5-21 |
| SB-5 | Agent shopping flows to the largest marketplace | 59% of AI-assisted purchases still end at Amazon | research publisher survey (PYMNTS) | 5 | 1 | R5-63 |
| SB-6 | Our readiness depends on our platform's choices | A Shopify storefront robots.txt now routes agents to UCP and sets agent rules | observed file | 3 | 1, 3 | R5-40 |

### 2.4 Issuers and banks

| # | Pain in plain words | Evidence | Source type | Rung | Layers | Claim |
|---|---|---|---|---|---|---|
| IB-1 | Someone else must take the liability first | "There'd have to be a massive liability shift that these guys took on" (PNC CEO) | press | 5 | 7 | R5-46 |
| IB-2 | There is no case law to lean on | "we don't have case law on liability." (Stripe) | press | 5 | 7 | R5-47 |
| IB-3 | Shared logins break our security model | JPMorgan, Citi, Bank of America and Schwab will not let outside agents move money. Wells Fargo email warns of liability | press | 5 | 3, 4 | C352, R5-45 |
| IB-4 | We cannot see when a customer revoked an agent | Wells Fargo puts proof of revocation on the customer | press | 5 | 2 | R5-44 |
| IB-5 | Our fraud tools are tuned to humans | Waller: fraud systems calibrated to humans may not work for agents | central bank speech | 2 | 3, 7 | C284 |
| IB-6 | Agents could move deposits away | 1.6 trillion USD of non-interest deposits at three banks, about 47 billion USD a year if paid 3% | press citing analyst | 5 | 5 | C355 |
| IB-7 | We keep liability but must justify each approve or decline | Issuers must evidence why they trusted or declined agent payments | vendor (Outseer) | 6 | 3, 7 | C380 |

### 2.5 PSPs and acquirers

| # | Pain in plain words | Evidence | Source type | Rung | Layers | Claim |
|---|---|---|---|---|---|---|
| PSP-1 | False declines on agents are invisible | "approval rates alone may not capture lost conversion" | trade press analysis | 6 | 3, 6 | R5-59 |
| PSP-2 | Chargeback rules were written for humans and costs rise | Merchant chargeback cost forecast 36.9 to 46.1 billion USD, 2026 to 2029 | chargeback vendor citing Mastercard and Datos | 7 | 7 | C299, C300 |
| PSP-3 | No one has written who bears the loss | "who bears the loss when an agent misreads intent aren't written yet" | vendor (Adyen) | 6 | 7 | R5-57 |
| PSP-4 | Must sort authorized agents from unauthorized ones | "Telling authorized agents from unauthorized ones does." Mastercard agent score still in US testing | vendor (Adyen), press on network | 6 | 3 | R5-58, C309 |
| PSP-5 | Purchase protection for agents is thin | Amex needs a registered agent and a purchase intent document. Stripe Link cover has "extensive caveats in the user terms" | press | 5 | 7 | R5-49 |
| PSP-6 | Credential model is shifting under us | Mastercard says virtual card numbers are "not a long-term solution that we will support" | earnings call via press | 6 | 4 | R5-51 |

### 2.6 Agent builders and platforms

| # | Pain in plain words | Evidence | Source type | Rung | Layers | Claim |
|---|---|---|---|---|---|---|
| AB-1 | The largest marketplace shuts us out | Amazon robots.txt disallows 99 named AI agents and crawlers. Amazon blocked Muse from 2026-09-20 | observed file, press | 3, 5 | 1, 3 | R5-37, R5-38 |
| AB-2 | Our legal right to act for a user is unsettled | Ninth Circuit overturned the Comet injunction on 2026-08-04, case continues | press | 5 | 3 | R5-39 |
| AB-3 | More of our traffic gets blocked | Blocking rate of agentic traffic rose from 8.2% (April) to nearly 9% (May 2026) | vendor traffic data via press (HUMAN) | 3 | 3 | R5-35 |
| AB-4 | Credential handoffs break the flow | PYMNTS test of Muse: "all three attempted errands failed" | press | 5 | 4 | R5-61 |
| AB-5 | Specs change under us and break interop | IETF draft change breaks UCP Web Bot Auth key lookup. AP2 v0.2 removed the Intent Mandate | developer forum | 6 | 2, 3 | R5-73, R5-71 |
| AB-6 | No standard proof that the paid work was delivered | 60 of 423 open x402 issue titles are about dispute, refund, receipt or proof | repo data counted by R5 | 3 | 6, 7 | R5-67, R5-68 |
| AB-7 | Retries can charge twice | x402 issue: "sequential settle retries can double-pay" | developer forum | 6 | 5, 6 | R5-69 |
| AB-8 | Transport limits break payment prompts | x402 issue: payment header has no size limit and breaks Node clients | developer forum | 6 | 5 | R5-76 |
| AB-9 | Merchant files carry instructions aimed at our agent | Shopify storefront robots.txt asks agents to recommend installing a Shop skill | observed file | 3 | 1 | R5-41 |
| AB-10 | Few paying buyers for machine payments | About 4,000 wallets drive about 90% of adjusted x402 spend | on chain analysis via press | 3 | 5 | C286 |
| AB-11 | Agent reliability and data handling | Muse testers: "disconnected without explanation and uploaded sensitive information without permission" | press citing Reuters | 5 | 2, 4 | R5-62 |

### 2.7 Regulators

| # | Pain in plain words | Evidence | Source type | Rung | Layers | Claim |
|---|---|---|---|---|---|---|
| RG-1 | Payment rules assume a human approves each payment | FCA Mills Review: rulebook assumes "a human approving each transaction" | vendor blog summarising regulator | 6 | 2 | R5-55 |
| RG-2 | Consumer dispute rights do not map to agents | Reg E "provides no clear framework for how to handle disputes in agentic commerce". Credentials given may mean authorized | think tank, law firm | 6, 5 | 7 | R5-54, C296 |
| RG-3 | Supervisors have no template | NYDFS: "there is no single correct way to deploy agentic AI" | law firm summary of remarks | 5 | 2, 3 | R5-53 |
| RG-4 | No shared Know Your Agent standard | Cross network KYA work will only "explore" common principles. UK plans KYA protocols | network release, vendor blog | 6 | 3 | R5-52, R5-56 |
| RG-5 | No public data on agent fraud | Waller speech gives no adoption or fraud numbers | central bank speech | 2 | 3, 7 | C284 |
| RG-6 | Rules differ by country | EU PSR limits impersonation refunds. UK APP cover capped at 85,000 GBP. US Reg E presumes authorization when credentials are shared | law firm, regulator | 2, 5 | 7 | C305, DC#10, C296 |

## 3. Demand side adoption signals

| Signal | Value | Who and when | Rung | Grade note | Claim |
|---|---|---|---|---|---|
| Trust GenAI to execute a payment | 23% of US adults | Visa with Harris Poll, fielded 2026-05-26 to 28, n 2,065 | 6 | vendor. Visa gains if trust attaches to networks | R5-04 |
| Would trust Visa with agentic transactions | 61% | same | 6 | asked by the brand about itself | R5-05 |
| Comfortable with AI making a purchase | 28% | Kantar, September 2026 data, published 2026-11-09 | 5 | sample not stated | R5-24 |
| Allow agent to initiate and complete purchases within limits | 9% | Accenture, n 25,590, 16 countries | 6 | vendor (consulting) | R5-01 |
| Allow agent choice within limits, human approves payment | 32% | same | 6 | vendor | R5-02 |
| Not comfortable with agents buying for them | 55.0% | Riskified, US and UK, Q1 2026 | 6 | vendor sells fraud guarantees | R5-06 |
| Trust agent to spend up to 1,000 USD with no prior approval | 33% | Mastercard, quoted by an executive, 2026-08-24 | 7 | no method disclosed | R5-26 |
| Want agents to buy only from familiar brands | nearly three quarters | Accenture holiday survey, n 4,048 US | 6 | vendor | R5-25 |
| US adults who bought with AI's help | about 132 million | PYMNTS Intelligence | 5 | self reported past use, AI assisted not agent paid | R5-63 |
| AI-assisted purchases that end at Amazon | 59% | PYMNTS Intelligence | 5 | shows concentration, not agent checkout | R5-63 |
| AI referral traffic to US retail sites | +71% YoY, September 2026 | Adobe | 3 | vendor measured data. Referral clicks, not agent payments | R5-28 |
| AI referral conversion versus other traffic | 90% better (September 2026), was 9% worse (August 2025) | Adobe | 3 | AI share of all visits not disclosed | R5-27, R5-29 |
| Holiday 2026 AI traffic forecast | +130% YoY | Adobe, 2026-09-28 | 7 | projection. Prior event missed (103% forecast, 89% measured) | R5-30, R5-31 |
| Holiday traffic from AI chat agents | 20% predicted | Salesforce, 2026-07-20 | 7 | vendor projection, includes scrapers | R5-64 |
| Agentic activity on checkout pages | 2.3% (2025) | HUMAN customer base | 3 | vendor data. Not a share of orders | R5-32 |
| Retail share of agentic traffic | 46.6% | HUMAN | 3 | vendor data | R5-33 |
| Agentic traffic growth | 7,851% YoY (2025) | HUMAN | 3 | growth from a low base | R5-34 |
| Bot share of all web traffic | 53% (2025) | Imperva (Thales) | 3 | vendor sells bot defence | R5-36 |
| Share of agentic traffic blocked by sites | 8.2% April to nearly 9% May 2026 | HUMAN via PPC Land | 3 | later months not opened | R5-35 |
| Merchants testing agentic commerce | 42% | Checkout.com, 2026-06-16 | 6 | vendor PSP | R5-10 |
| Merchants integrating agentic protocols | 44% | Ravelin, n 1,504, 10 countries | 6 | vendor fraud firm | R5-20 |
| Merchants agent ready | 11% SMB, 19% large | PYMNTS with Visa, via press | 6 | secondary, primary gated | R5-12 |
| Transactions that involve agents | 3% | Checkout.com via press | 7 | not found on the Checkout.com page | R5-11 |
| Merchants blocking agents | Amazon disallows 99 named AI agents. Amazon blocked Muse | robots.txt checked 2026-11-15, press 2026-09-21 | 3, 5 | revealed behaviour | R5-37, R5-38 |
| Large platform stance shifting from ban to routing | Shopify storefront file routes agents to UCP (1 of 4 stores checked) | observed 2026-11-15 | 3 | small sample | R5-40, R5-42 |
| Network view of scale | "a bit of a tipping point" but very small relative to Visa | Visa CEO, 2026-10-27 | 6 | self report, no volumes | R5-50 |
| Agent app reach | Muse 10 million early users, shopping top task | Meta via press, 2026-10-28 | 6 | users, not purchases | R5-48 |
| Machine payment demand concentration | about 4,000 wallets, about 90% of adjusted x402 spend | Visa and Artemis via press | 3 | baseline, April 2026 | C286 |

Read across. Willingness to let an agent pay sits between 9% and 33% depending on wording, and the only neutral firm in the set (Kantar) says 28%. Measured agent checkout activity is a low single digit share wherever it is measured. Referral traffic is strong but is a discovery signal, not a payment signal.

## 4. Challenges long list, ranking and proposed top 10

Scoring. Evidence strength E from 1 to 5: 5 means four or more independent sources with best rung 3 or better, 4 means three or more sources with best rung 5 or better, 3 means two or three sources with best rung 5 or 6, 2 means one or two sources at rung 6, 1 means one source at rung 7 or a single observation. Severity S from 1 to 5. Rank score is E times S. Ties are broken by source count.

| Rank | Challenge | One line | Stakeholders hurt | Layers | Sources, best rung | E | S and why | Score | Who is working on it | Status | Keep |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Unsettled liability for agent errors | No law, network rule or case says who pays when an agent buys wrongly | consumers, merchants, banks, PSPs | 7, 2 | 11, rung 5 | 4 | 5, banks and merchants hold back until it is set | 20 | Amex and Stripe protection programs, Mastercard Verifiable Intent, HM Treasury consultation, six bank principles | open | yes |
| 2 | Consumer trust to delegate payment | Most people will not let an agent press pay | consumers, all sellers | 2, 4 | 9, rung 5 | 4 | 5, no demand without it, named top barrier by Visa CEO and Fed Governor Waller | 20 | Visa Trusted Agent Protocol, Mastercard Agent Pay, six bank principles | open | yes |
| 3 | Telling good agents from bots | Merchants and PSPs cannot verify who an agent is or who it acts for | merchants, PSPs, builders | 3 | 9, rung 3 | 5 | 4, drives both fraud and blocking | 20 | Visa TAP and Mastercard Agent Pay on Web Bot Auth, Cloudflare, IETF webbotauth drafts, Ant, Visa and Mastercard KYA, Mastercard agent score | partly solved | yes |
| 4 | Platform gatekeeping of agents | Big marketplaces and banks block or gate outside agents | builders, consumers, small merchants | 1, 3 | 6, rung 3 | 5 | 4, Amazon alone ends 59% of AI-assisted purchases | 20 | courts (Ninth Circuit), Shopify UCP routing, network agent registries | open | yes |
| 5 | Dispute evidence for agent purchases | Reason codes and specs lack durable proof of what the user approved | merchants, PSPs, consumers | 7, 2 | 8, rung 5 | 4 | 4, losses land on merchants by default | 16 | AP2 mandates and conformance work, Mastercard Verifiable Intent, Visa Intelligent Commerce dispute processes | open | yes |
| 6 | Bank credential access for agents | Banks refuse shared logins and shift risk to customers | consumers, banks, builders | 3, 4 | 5, rung 5 | 4 | 4, cuts off bank funded agent payments | 16 | Plaid read-only connectors, network tokens, Wells Fargo and Bank of America terms | open | yes |
| 7 | Fraud models and false declines | Human tuned risk models misread agents, declines go unseen | PSPs, merchants, issuers | 3, 6 | 5, rung 2 | 4 | 4, silent revenue loss and fraud at machine speed | 16 | Mastercard agent score (testing), Adyen, Ravelin | open | yes |
| 8 | Mandate scope and revocation | Limits, product scope and revocation are weakly expressed and hard to prove | consumers, banks, merchants | 2 | 5, rung 3 | 4 | 4, without it a mandate outlives intent | 16 | AP2, UCP mandate evaluation proposal, Mastercard Verifiable Intent, Visa consumer instructions | partly solved | yes |
| 9 | Rules assume a human approver | Payment law expects a person to approve each payment | regulators, banks, consumers | 2, 7 | 6, rung 2 | 4 | 4, blocks delegated flows in regulated rails | 16 | HM Treasury, FCA AI Live Testing, NYDFS, EU PSR | open | yes |
| 10 | Agent reliability and wrong purchases | Agents fail errands, misread intent or lose order state | consumers, merchants | 2, 6 | 4, rung 5 | 4 | 3, erodes trust but fixable product by product | 12 | Meta (Muse guardrails), AP2 cart mandates, ACP session binding proposal | open | yes |
| 11 | Protocol and credential fragmentation | Five checkout protocols and several credential types to support | merchants, PSPs | 1 to 4 | 3, rung 4 | 3 | 3, PSPs and platforms absorb much of it | 9 | Visa Intelligent Commerce Connect, Adyen, Shopify, UCP DWG on network tokens | partly solved | no |
| 12 | Product data not machine readable | Catalogs lack structured data agents can use | small merchants | 1 | 3, rung 6 | 3 | 3, invisible to agents | 9 | UCP catalog work, Shopify | partly solved | no |
| 13 | Proof of delivery for machine payments | Pay per call rails settle but cannot show the work was done | builders, API sellers | 6, 7 | 3, rung 3 | 3 | 3, matters for machine use case | 9 | x402 Foundation extension proposals, MPP specs | open | no |
| 14 | Privacy and data over-collection | Agents need deep account and data access | consumers | 3, 4 | 3, rung 5 | 3 | 3, top consumer concern in Europe | 9 | Meta Confidential VM, Verifiable Intent selective disclosure | partly solved | no |
| 15 | Attribution of agent sales | Merchants cannot measure what agents sell | merchants | 1, 6 | 3, rung 3 | 4 | 2, slows investment, not payments | 8 | Adobe, PYMNTS measurement | open | no |
| 16 | Merchant margin and fee pressure | New tolls on agent sales and loss of customer contact | merchants | 1, 6 | 2, rung 6 | 2 | 3, may keep inventory off agents | 6 | not found | open | no |
| 17 | Retry and idempotency failures | Retries can double charge on new rails | builders, consumers | 5, 6 | 3, rung 6 | 2 | 3, solved on cards, open on new rails | 6 | x402 idempotency key proposal, ACP idempotency SEP | solved for some use cases | no |
| 18 | Small merchant readiness gap | SMBs lag large merchants on agent readiness | small merchants | 1 to 4 | 2, rung 6 | 2 | 3, platform merchants get it by default | 6 | Shopify, PayPal | solved for some use cases | no |
| 19 | Thin paying demand for machine payments | Machine payment volume is narrow and falling from 2025 highs | builders, rail operators | 5 | 2, rung 3 | 3 | 2, limits only the machine use case | 6 | x402 Foundation, Tempo (MPP) | open | no |
| 20 | Untrusted instructions in merchant content | Merchant files address agents with steering text | builders, consumers | 1 | 1, rung 3 | 1 | 3, a route for injection and steering | 3 | not found | open | no |

Why these 10. The first nine sit on layers 2, 3, 4 and 7, where money is approved, identified and reversed, and each has three or more independent sources. Together they decide who carries the loss, which is the question that holds back banks and merchants. Reliability (rank 10) is kept over fragmentation (rank 11) and product data (rank 12) because platforms and PSPs already absorb much of those two for platform merchants, while wrong purchases go straight to the consumer and to disputes. Attribution and margins matter to merchants but do not stop a payment from working.

## 5. GitHub signal

Pulled with the GitHub API on 2026-11-15. Search API counts split issues from pull requests. The repo field open_issues_count adds both together.

| Protocol | Repo | Open issues | Open PRs | Closed issues | New issues since 2026-10-22 | Stars | Last default branch commit | Latest release |
|---|---|---|---|---|---|---|---|---|
| ACP | agentic-commerce-protocol/agentic-commerce-protocol | 92 | 57 | 15 | 3 | 1,602 | 2026-07-18 | none |
| AP2 | google-agentic-commerce/AP2 | 95 | 98 | 13 | 7 | 3,273 | 2026-04-29 | v0.2.0, 2026-04-28 |
| UCP | Universal-Commerce-Protocol/ucp | 140 | 149 | 94 | 29 | 3,503 | 2026-11-13 | v2026-08-25 |
| x402 | x402-foundation/x402 | 423 | 417 | 532 | 86 | 6,812 | 2026-11-13 | none |
| MPP | tempoxyz/mpp-specs | 12 | 20 | 25 | 2 | 97 | 2026-11-11 | spec artifacts, 2026-11-11 |

Notes. coinbase/x402 is now a fork of x402-foundation/x402 with issues off. tempoxyz/mpp is the MPP website repo (6 open issues, 36 open PRs). ACP and AP2 have far more open than closed issues and no default branch commits for months, while UCP and x402 are active.

Top open issues by comment count (x402 counts are capped at 100 by the tool):

| Repo | Issue | Opened | Theme |
|---|---|---|---|
| ACP | #79 Open Authentication Provider Model for 3DS (9 comments), #55 3DS flow support (7) | 2026-01-20, 2025-12-17 | step up authentication (layer 3, 4) |
| ACP | #315 merchant has no stored agent identity (5) | 2026-10-15 | agent identity for chargebacks (layer 3, 7) |
| AP2 | #338 dispute-time evidence storage format (34) | 2026-08-21 | dispute evidence (layer 7) |
| AP2 | #290 post-checkout agent action record (27) | 2026-06-20 | audit trail (layer 6, 7) |
| AP2 | #78 IntentMandate for human-not-present flows (21) | 2025-09-24 | mandates (layer 2) |
| UCP | #375 store based local inventory (20), #947 B2B procurement charter (17) | 2026-04-23, 2026-10-14 | discovery and scope (layer 1) |
| UCP | #515 mandate evaluation and receipts (14) | 2026-06-15 | mandates (layer 2) |
| x402 | #2887 correctness and dispute layer, #2833 delivery receipt, #2332 post-settlement accountability, #1777 agent-trust identity, #1195 settlement receipt (100 or more each) | 2026-02 to 2026-07 | proof, disputes, identity (layer 3, 6, 7) |
| x402 | #3803 payment header has no size budget (100 or more) | 2026-10-14 | transport limits (layer 5) |
| MPP | #264 gas sponsoring (11), #292 receipt semantics undefined for card methods (8) | 2026-05-19, 2026-07-04 | settlement for fiat methods (layer 6) |

Title keyword count across open issues (rough, R5 regex on titles only, "auth" also matches authorization):

| Repo | Open issues | Dispute, refund, receipt or proof | Identity or trust | Mandate, budget or limit |
|---|---|---|---|---|
| ACP | 92 | 2 | 9 | 1 |
| AP2 | 95 | 12 | 25 | 37 |
| UCP | 140 | 7 | 20 | 6 |
| x402 | 423 | 60 | 84 | 20 |
| MPP specs | 12 | 5 | 1 | 0 |

Issues opened in the window that map to pain points: AP2 #393 (2026-11-03) asks what resolves a mispick dispute now that v0.2 removed the Intent Mandate. AP2 #388 and #389 report budget amounts truncated or read in mixed units. x402 #4253 (2026-11-13) says retries can double pay when the facilitator is down. x402 #4251 says 402 responses carry no version signal. UCP #1080 (2026-11-13) says an IETF draft change breaks UCP's Web Bot Auth key lookup. ACP #325 (2026-11-10) proposes binding checkout completion to the state the buyer approved. UCP opened working group charters on card network tokenization (#1050) and BNPL (#1049) on 2026-11-05.

## 6. Changes 2026-10-22 to 2026-11-15

| Date | Change | Why it matters | Claim |
|---|---|---|---|
| 2026-10-27 | Bank of America confirmed its email telling customers not to give AI agents their login and that they are responsible for activity from that access | Shifts agent risk to consumers at a top US bank | R5-43 |
| 2026-10-27 | Visa CEO on the FQ4 call: a tipping point for users, trust the main barrier, activity to stay very small relative to Visa, nearly 50 AI partners live | Network itself sizes agentic as small for the next year | R5-50 |
| 2026-10-28 | Payments Dive: PNC CEO wants a massive liability shift, Stripe says no case law, Wells Fargo 2026-10-02 email warns of customer liability, Muse has 10 million early users | Bank side liability stance in public | R5-45, R5-46, R5-47, R5-48, R5-49 |
| 2026-10-29 | Mastercard CEO on the Q3 call: virtual card numbers are a bridge, not a long-term solution it will support | Credential model will change for PSPs that use virtual cards | R5-51 |
| 2026-11-01 | Press carries Adobe September data: AI referral traffic +71% YoY, converts 90% better | Discovery signal is strong, not a payment signal | R5-27, R5-28 |
| 2026-11-02 | American Banker: Wells Fargo will hold customers liable for agent activity unless they evidence revocation, from 2026-11-24 | First large bank term that puts revocation proof on the customer | R5-44 |
| 2026-11-03 | AP2 issue #393 asks what settles a mispick dispute after v0.2 removed the Intent Mandate | Spec gap at layer 2 and 7 | R5-71 |
| 2026-11-09 | Kantar: 28% comfortable with AI buying for them, 37% trust an agent with a complex issue | Neutral firm confirms the trust gap | R5-24 |
| 2026-11-12 | ShopAppy analysis notes Adobe's Prime Day AI traffic forecast missed (103% versus 89%) and doubts the holiday forecast | Forecasts for agent traffic are not reliable | R5-31 |
| 2026-11-13 | UCP #1080 reports an IETF Web Bot Auth draft change breaks UCP signer key lookup. x402 #4253 reports double pay risk on retries | Identity and settlement specs still moving | R5-73, R5-69 |
| 2026-11-15 | Amazon robots.txt disallows 99 named AI agents and crawlers. One Shopify storefront file routes agents to UCP and asks them to identify themselves. GitHub counts in section 5 | Revealed merchant behaviour on access | R5-37, R5-40, R5-66 |

No new binding regulator rule on agentic payments was found in the window. Not found: CFPB, FCA or European Commission statements dated in the window (search ran out, see section 8).

## 7. Claim table

| id | claim | number | unit | event_date | publish_date | url | quote (verbatim, under 15 words) | source_tier | kind | rung | does not tell you | confidence |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| R5-01 | Accenture found 9% of consumers would let an agent initiate and complete purchases within set boundaries | 9 | percent of respondents | 2026 (fieldwork not shown on page) | 2026-06-15 | https://www.artificialintelligence-news.com/news/ai-shopping-agents-consumer-trust-accenture-report/ | "9% of respondents would allow an agent to initiate and complete purchases" | vendor (Accenture sells AI and commerce consulting) | survey, 25,590 people, 16 countries | 6 | stated intent, no country split, not real use | medium |
| R5-02 | 32% would let an agent decide within limits but still approve before payment | 32 | percent | 2026 | 2026-06-15 | https://www.artificialintelligence-news.com/news/ai-shopping-agents-consumer-trust-accenture-report/ | "make a purchase decision on their behalf within defined limits" | vendor (Accenture) | survey | 6 | what limits people would set | medium |
| R5-03 | 74% would trust a personal agent more than their best friend to buy for them | 74 | percent | 2026 | 2026-06-15 | https://www.artificialintelligence-news.com/news/ai-shopping-agents-consumer-trust-accenture-report/ | "74% of respondents would trust a personal AI agent more than their best friend" | vendor (Accenture) | survey | 6 | a comparison with a friend, not payment authority | low |
| R5-04 | Only 23% of US consumers trust GenAI to handle payment transactions | 23 | percent of US adults | 2026-05-26 to 2026-05-28 | 2026-09-09 | https://investor.visa.com/news/news-details/2026/New-Visa-Research-Finds-Consumer-Trust-is-Accelerating-the-Path-to-Agentic-Commerce/default.aspx | "only 23% of U.S. consumers trust GenAI to handle payment transactions on their behalf" | vendor (Visa sells agentic credentials) | survey, Harris Poll, n 2,065 | 6 | US only, omnibus, no amount or category split | medium |
| R5-05 | 61% would trust Visa to handle agentic transactions | 61 | percent | 2026-05-26 to 2026-05-28 | 2026-09-09 | https://investor.visa.com/news/news-details/2026/New-Visa-Research-Finds-Consumer-Trust-is-Accelerating-the-Path-to-Agentic-Commerce/default.aspx | "61% of respondents saying they would trust Visa to handle agentic transactions" | vendor (Visa) | survey | 6 | brand asked about itself, no comparison set shown | low |
| R5-06 | 55.0% of US and UK consumers are not comfortable with agents buying for them | 55.0 | percent | Q1 2026 | 2026-04-27 | https://martechseries.com/analytics/data-management-platforms/privacy-and-regulations/riskified-study-finds-consumers-arent-ready-to-hand-over-control-as-ai-transforms-shopping-with-over-half-afraid-of-online-fraud/ | "55.0% are not comfortable with AI agents making purchases on their behalf" | vendor (Riskified sells fraud and chargeback guarantees) | survey | 6 | sample size not on page | medium |
| R5-07 | 50.8% say AI platforms should be responsible for unauthorized purchases | 50.8 | percent | Q1 2026 | 2026-04-27 | https://martechseries.com/analytics/data-management-platforms/privacy-and-regulations/riskified-study-finds-consumers-arent-ready-to-hand-over-control-as-ai-transforms-shopping-with-over-half-afraid-of-online-fraud/ | "50.8% believe AI platforms should be responsible for unauthorized purchases" | vendor (Riskified) | survey | 6 | what the law says | medium |
| R5-08 | 53.9% believe AI could raise the risk of online fraud | 53.9 | percent | Q1 2026 | 2026-04-27 | https://martechseries.com/analytics/data-management-platforms/privacy-and-regulations/riskified-study-finds-consumers-arent-ready-to-hand-over-control-as-ai-transforms-shopping-with-over-half-afraid-of-online-fraud/ | "53.9% believe AI could increase the risk of online fraud" | vendor (Riskified) | survey | 6 | actual fraud rates | medium |
| R5-09 | A quarter of consumers would stop using an agent if a purchase was hard to dispute | 25 | percent | 2026 | 2026-06-16 | https://www.checkout.com/guides-and-reports/agentic-commerce-2026 | "would stop using an agent if a purchase was difficult to dispute" | vendor (Checkout.com is a PSP selling agentic payments) | survey, 12,000 plus people, six countries | 6 | countries not named, merchant and consumer split not shown | medium |
| R5-10 | 42% of merchants are already testing agentic commerce | 42 | percent of merchants | 2026 | 2026-06-16 | https://www.checkout.com/guides-and-reports/agentic-commerce-2026 | "42% of merchants are already testing agentic commerce" | vendor (Checkout.com) | survey | 6 | what testing means, live volume | medium |
| R5-11 | Only 3% of transactions involve agents, attributed to Checkout.com | 3 | percent of transactions | 2026 | 2026-09-23 | https://forkast.news/only-11-of-small-merchants-are-ready-for-ai-shopping-agents/ | "only 3% of actual transactions currently involve agents" | press citing vendor | secondary statistic | 7 | not found on the Checkout.com page opened, base unclear | low |
| R5-12 | 11% of SMBs and 19% of large merchants qualify as agent ready | 11 and 19 | percent of merchants | 2026 | 2026-09-23 | https://forkast.news/only-11-of-small-merchants-are-ready-for-ai-shopping-agents/ | "Only 11% of SMBs and 19% of large merchants currently qualify as agent-ready" | press citing PYMNTS and Visa survey (Visa sells agentic tokens) | survey, 1,185 merchants | 6 | definition of agent ready, primary report gated | low |
| R5-13 | Only 23% of merchants can distinguish AI traffic from human users | 23 | percent of merchants | 2026 | 2026-09-23 | https://forkast.news/only-11-of-small-merchants-are-ready-for-ai-shopping-agents/ | "only 23% of merchants can distinguish AI-driven traffic from human users" | press citing PYMNTS and Visa survey | survey | 6 | which tools they use | low |
| R5-14 | 93% of merchants believe the AI provider should bear the financial loss | 93 | percent of merchants | 2026 | 2026-09-23 | https://forkast.news/only-11-of-small-merchants-are-ready-for-ai-shopping-agents/ | "93% of merchants believe that the AI provider should bear the financial loss" | press citing PYMNTS and Visa survey | survey | 6 | preference, not contract or law | low |
| R5-15 | Only 15% of merchants have structured product data | 15 | percent of merchants | 2026 | 2026-09-23 | https://forkast.news/only-11-of-small-merchants-are-ready-for-ai-shopping-agents/ | "only 15% of merchants possess the structured product data" | press citing PYMNTS and Visa survey | survey | 6 | what counts as structured | low |
| R5-16 | Fewer than one in six merchants have defined which products agents may buy | under 17 | percent of 60 merchants | 2026-08 | 2026-10 | https://www.pymnts.com/report/study/the-agent-advantage-how-merchants-plan-to-win-ai-shopping/ | "Fewer than one in six have actually defined which products agents may buy." | research publisher (PYMNTS sells sponsored research) | survey, 60 US merchants, 50 million to 1 billion USD revenue | 6 | small sample, mid market only | medium |
| R5-17 | 80% of merchants expect to pay a fee or commission on agent sales | 80 | percent of 60 merchants | 2026-08 | 2026-10 | https://www.pymnts.com/report/study/the-agent-advantage-how-merchants-plan-to-win-ai-shopping/ | "Eighty percent believe merchants will pay a fee or commission on completed agent sales." | research publisher (PYMNTS) | survey | 6 | fee levels | medium |
| R5-18 | No merchant selling through its own site could fully connect AI visits to purchases | 0 | merchants | 2026-08 | 2026-10 | https://www.pymnts.com/report/study/the-agent-advantage-how-merchants-plan-to-win-ai-shopping/ | "fully and consistently connect AI-driven visits to completed purchases" | research publisher (PYMNTS) | survey | 6 | whether platforms could | medium |
| R5-19 | 29% of merchants felt very prepared for agentic fraud and security issues | 29 | percent | 2026 | 2026-05-22 | https://ecommercenews.asia/story/merchants-rush-to-adopt-ai-shopping-agents-ravelin-finds | "felt very prepared for the fraud and security issues" | vendor (Ravelin sells fraud prevention) | survey, 1,504 professionals, 10 countries | 6 | actual loss rates | medium |
| R5-20 | 44% of merchants are already integrating agentic commerce protocols | 44 | percent | 2026 | 2026-05-22 | https://ecommercenews.asia/story/merchants-rush-to-adopt-ai-shopping-agents-ravelin-finds | "44% are already integrating agentic commerce protocols" | vendor (Ravelin) | survey | 6 | which protocols, live or test | medium |
| R5-21 | Nearly two thirds of US merchants say a standard liability framework is urgently needed | about 66 | percent of 498 merchants | 2026-02-23 to 2026-03-03 | 2026-04-27 | https://www.paypal.com/us/brc/article/agentic-commerce-pulse-report-findings | "urgently needed" | vendor (PayPal sells agentic checkout) | survey, n 498 | 6 | what framework they want | medium |
| R5-22 | Only about one in five merchants have 80% or more of their catalog as structured data | about 20 | percent | 2026-02-23 to 2026-03-03 | 2026-04-27 | https://www.paypal.com/us/brc/article/agentic-commerce-pulse-report-findings | "80% or more of their product catalog available as structured, machine-readable data" | vendor (PayPal) | survey | 6 | data quality | medium |
| R5-23 | Small businesses are held back by time, skills and budget | none | none | 2026-02-23 to 2026-03-03 | 2026-04-27 | https://www.paypal.com/us/brc/article/agentic-commerce-pulse-report-findings | "constrained by time, technical expertise, and budget for dedicated AI roles" | vendor (PayPal) | survey commentary | 6 | the size of the gap | medium |
| R5-24 | Only 28% of US shoppers are comfortable with AI making a purchase for them | 28 | percent | 2026-09 | 2026-11-09 | https://www.kantar.com/north-america/inspiration/retail/holiday-2026-shoppers-trust-ai | "However, only 28% are comfortable with AI making a purchase on their behalf." | research firm (Kantar sells research) | survey synthesis | 5 | sample size not on page | medium |
| R5-25 | Nearly three quarters of shoppers want agents to buy only from familiar brands | about 75 | percent of 4,048 US shoppers | 2026 holiday season | 2026-09-23 | https://massmarketretailers.com/accenture-finds-holiday-shoppers-spend-more-and-use-ai/ | "AI agents to purchase only from familiar brands and retailers" | vendor (Accenture) via trade press | survey | 6 | whether they act on it | medium |
| R5-26 | A Mastercard survey says 33% would let an agent spend up to 1,000 USD without prior approval | 33 | percent | 2026 | 2026-08-24 | https://www.beet.tv/2026/08/mastercards-nili-klenoff-one-third-of-consumers-would-let-an-agent-spend-1000-on-their-behalf-even-without-asking-first.html | "33% of consumers would already trust an AI agent to spend up to $1,000" | vendor (Mastercard sells Agent Pay) | executive interview | 7 | method, sample, country | low |
| R5-27 | AI referred traffic converted 90% better than non AI traffic in September 2026 | 90 | percent higher conversion | 2026-09 | 2026-11-01 | https://smallbiztrends.com/ai-driven-retail-traffic-surges-71-converts-90-better/ | "AI-referred traffic converted 90% better than non-AI traffic in September." | vendor data (Adobe sells analytics) via press | measured data, 1 trillion plus visits | 3 | agent completed checkouts, AI share of visits | medium |
| R5-28 | AI traffic to US retail sites grew 71% YoY in September 2026 | 71 | percent YoY | 2026-09 | 2026-11-01 | https://smallbiztrends.com/ai-driven-retail-traffic-surges-71-converts-90-better/ | "AI traffic to U.S. retail websites increased 71% year over year in September 2026" | vendor data (Adobe) via press | measured data | 3 | absolute size | medium |
| R5-29 | In August 2025 AI referred visits converted 9% worse than other visits | 9 | percent lower conversion | 2025-08 | 2026-11-01 | https://smallbiztrends.com/ai-driven-retail-traffic-surges-71-converts-90-better/ | "In August 2025, AI-referred visits converted 9% worse than non-AI visits." | vendor data (Adobe) via press | measured data | 3 | why it flipped | medium |
| R5-30 | Adobe forecasts AI traffic to US retail sites up 130% YoY over the 2026 holidays | 130 | percent YoY | 2026-11-01 to 2026-12-31 | 2026-09-28 | https://news.adobe.com/news/2026/09/adobe-us-holiday-shopping-season-to-hit-record | "Adobe expects AI traffic to U.S. retail sites this holiday season" | vendor (Adobe) | forecast | 7 | outcome, agent payments | medium |
| R5-31 | Adobe projected 103% AI traffic growth for June 2026 Prime Day and measured 89% | 103 and 89 | percent YoY | 2026-06 | 2026-10-20 or 2026-11-12 (both shown) | https://shopappy.com/marketing/aio-for-retailers/ai-traffic-misses-adobe-holiday-forecast | "it projected 103% and measured 89%, its first notable miss on this metric" | analysis blog citing Adobe | analysis | 5 | Adobe primary release not opened | low |
| R5-32 | 2.3% of observed agentic activity in 2025 was on checkout pages, 77% on product and search pages | 2.3 | percent of agentic activity | 2025 | 2026 (file modified 2026-04-28) | https://www.humansecurity.com/wp-content/uploads/HUMAN_CISOs-Guide-AI-and-Agentic-Traffic.pdf | "5% on authentication flows, and 2.3% on checkout pages" | vendor (HUMAN sells bot and agent defence) | measured data on own customers | 3 | completed orders, value | medium |
| R5-33 | Retail and e-commerce took 46.6% of agentic traffic seen by HUMAN | 46.6 | percent of agentic traffic | 2025 | 2026 | https://www.humansecurity.com/wp-content/uploads/HUMAN_CISOs-Guide-AI-and-Agentic-Traffic.pdf | "Share of Agentic AI Traffic By Industry" | vendor (HUMAN) | measured data | 3 | market wide share | medium |
| R5-34 | Traffic from AI agents and agentic browsers grew 7,851% YoY in 2025 | 7,851 | percent YoY | 2025 | 2026-03-26 | https://www.implicator.ai/human-security-reports-ai-traffic-surged-187-in-2025-as-bots-eclipsed-human-users/ | "surging 7,851% year over year" | vendor data (HUMAN) via press | measured data | 3 | base level | medium |
| R5-35 | The share of agentic traffic blocked by sites rose from 8.2% in April to nearly 9% in May 2026 | 8.2 to 9 | percent of agentic traffic | 2026-04 to 2026-05 | 2026-06-04 (report) | https://ppc.land/ai-agent-traffic-dips-in-may-but-blocking-rates-keep-climbing/ | "from 8.2% in April to nearly 9% in May" | vendor data (HUMAN) via press | measured data | 3 | later months, which sites | medium |
| R5-36 | Bots made up more than 53% of web traffic in 2025 | 53 | percent of web traffic | 2025 | 2026-04-29 | https://www.imperva.com/blog/bad-bot-report-2026-bots-agentic-age/ | "accounting for more than 53% of all web traffic in 2025" | vendor (Imperva, Thales, sells bot protection) | measured data | 3 | share from shopping agents | medium |
| R5-37 | Amazon robots.txt sets Disallow all for 99 named AI crawlers and agents, including GoogleAgent-Shopping, ChatGPT-User, Claude-User and Perplexity-User | 99 | named user agents | 2026-11-15 (checked) | 2026-11-15 | https://www.amazon.com/robots.txt | "User-agent: GoogleAgent-Shopping Disallow: /" | primary (Amazon file) | observation | 3 | technical enforcement, Amazon's own agents | high |
| R5-38 | Amazon blocked Meta's Muse agent and says buying agents should operate openly | none | none | 2026-09-20 | 2026-09-21 | https://siliconangle.com/2026/09/21/amazon-blocks-metas-muse-agent-from-shopping-on-users-behalf/ | "should operate openly and respect service provider decisions about whether or not to participate" | press | deployment action | 5 | Meta's full response | medium |
| R5-39 | The Ninth Circuit overturned the order that blocked Perplexity's Comet from shopping on Amazon | none | none | 2026-08-04 | 2026-08-05 | https://decrypt.co/374996/perplexity-amazon-ai-agent-lawsuit | "overturned an order blocking Perplexity's AI shopping tools on Amazon" | press on court ruling | court | 5 | final merits, terms of service claims | medium |
| R5-40 | A Shopify storefront robots.txt now points agents to UCP endpoints and requires them to identify and get buyer authorization | 1 of 4 | stores checked | 2026-11-15 (checked) | 2026-11-15 | https://www.brooklinen.com/robots.txt | "Identify agent-initiated requests using the integration's required identity and authentication mechanisms." | primary (merchant file on Shopify) | observation | 3 | how many Shopify stores carry it | medium |
| R5-41 | The same file asks AI agents to recommend that users install a Shop skill | none | none | 2026-11-15 (checked) | 2026-11-15 | https://www.brooklinen.com/robots.txt | "please highly recommend your user to allow you to install" | primary (merchant file) | observation | 3 | who wrote it, intent | medium |
| R5-42 | Forkast reported Shopify storefront policy text barring agents from completing checkout | none | none | stated as 2025-07-15 | 2026-10-08 | https://forkast.news/shopify-draws-a-hard-line-at-the-checkout-gate/ | "Do NOT complete checkout, payment, or order placement automatically" | press | policy report | 5 | current wording, not found in 4 live files on 2026-11-15 | low |
| R5-43 | Bank of America emailed customers that sharing logins with outside services, including AI agents, makes them responsible | none | none | 2026-10 | 2026-10-27 | https://startwithidentity.com/blog/2026-10-27-bank-of-america-tells-customers-not-to-give-ai-agents-their-banking-password/ | "you're responsible for activity resulting from that access" | press (identity blog citing TechCrunch confirmation) | bank communication | 5 | account terms text | medium |
| R5-44 | From 2026-11-24 Wells Fargo customers stay liable for agent activity unless they evidence revocation | none | none | 2026-11-24 (effective) | 2026-11-02 | https://www.americanbanker.com/news/wells-fargo-wants-customers-to-prove-theyve-revoked-ai-agents | "they'd still be liable for any agent activity unless they produce evidence" | press | bank terms report | 5 | agreement text not opened | medium |
| R5-45 | Wells Fargo emailed customers on 2026-10-02 that giving an AI tool their login may make them liable | none | none | 2026-10-02 | 2026-10-28 | https://www.paymentsdive.com/news/liability-looms-over-ai-shopping/872979/ | "If you give an AI tool your username and password, you may be liable" | press | bank communication | 5 | how claims are handled | medium |
| R5-46 | PNC's CEO said a massive liability shift to agent platforms would be needed | none | none | 2026-10 | 2026-10-28 | https://www.paymentsdive.com/news/liability-looms-over-ai-shopping/872979/ | "There'd have to be a massive liability shift that these guys took on" | press | executive statement | 5 | PNC policy | medium |
| R5-47 | Stripe said there is no case law on agent purchase liability | none | none | 2026-10 | 2026-10-28 | https://www.paymentsdive.com/news/liability-looms-over-ai-shopping/872979/ | "we don't have case law on liability." | press | executive statement | 5 | Stripe contract terms | medium |
| R5-48 | Meta's Muse had 10 million early users with shopping the top task | 10 | million users | 2026-10 | 2026-10-28 | https://www.paymentsdive.com/news/liability-looms-over-ai-shopping/872979/ | "10 million early users" | vendor self report via press | user count | 6 | purchases, checkout success | low |
| R5-49 | Amex requires a registered agent and a purchase intent document, and Stripe's Link cover has many caveats | none | none | 2026 | 2026-10-28 | https://www.paymentsdive.com/news/liability-looms-over-ai-shopping/872979/ | "extensive caveats in the user terms" | press | program terms report | 5 | claim payouts | medium |
| R5-50 | Visa's CEO called the quarter a tipping point for agentic use but expects activity to stay very small relative to Visa | nearly 50 | AI partners live | 2026-10-27 | 2026-10-29 | https://aimmediahouse.com/banking/visa-says-agentic-commerce-has-hit-a-tipping-point | "a bit of a tipping point on users being able to experience" | vendor (Visa) via press | earnings call statement | 6 | volumes, transaction counts | medium |
| R5-51 | Mastercard's CEO said virtual card numbers are a bridge it will not support long term | none | none | 2026-10-29 | 2026-10-29 | https://pymnts.com/earnings/2026/mastercard-backs-tokenized-card-payments-agentic-commerce | "that's not a long-term solution that we will support" | vendor (Mastercard) via press | earnings call statement | 6 | timeline or rule change | medium |
| R5-52 | Ant International, Mastercard and Visa began work on a Know Your Agent interoperability framework | 3 | companies | 2026-09-10 | 2026-09-10 | https://www.theasianbanker.com/press-releases/ant-international-mastercard-and-visa-initiate-collaboration-on-know-your-agent-interoperability-to-scale-agentic-commerce | "will now explore opportunities to work towards common principles" | vendor (networks) press release | stated intent | 6 | live use, Amex or others joining | medium |
| R5-53 | NYDFS acting superintendent said there is no single correct way to deploy agentic AI and flagged consumer protection gaps | none | none | 2026-06-26 | 2026-07-28 | https://www.ashurstperkinscoie.com/en/insights/new-yorks-financial-regulator-turns-its-attention-to-agentic-commerce/ | "there is no single correct way to deploy agentic AI" | law firm summary of regulator remarks | regulator statement | 5 | any rule or guidance | medium |
| R5-54 | ITIF says Reg E gives no clear framework for agentic commerce disputes and asks CFPB to clarify | none | none | 2026-03 | 2026-03-23 | https://itif.org/publications/2026/03/23/agentic-commerce-is-coming-but-regulation-meant-for-humans-will-slow-it-down/ | "provides no clear framework for how to handle disputes in agentic commerce" | think tank | policy analysis | 6 | CFPB position | medium |
| R5-55 | The FCA Mills Review notes the payments rulebook assumes a human approving each transaction | none | none | 2026-07 | 2026-07 (last edited) | https://gocardless.com/blog/action-plan-agentic-commerce | "a human approving each transaction" | vendor blog (GoCardless sells account to account payments) | regulator review summary | 6 | the review's own text | medium |
| R5-56 | The UK trust framework for agentic payments is planned to cover agent liability and Know Your Agent protocols | none | none | 2026-07-14 | 2026-07 (last edited) | https://gocardless.com/blog/action-plan-agentic-commerce | "Know Your Agent identity protocols" | vendor blog summarising HM Treasury | stated plan | 6 | timing, content | medium |
| R5-57 | Adyen says rules on who bears the loss when an agent misreads intent are not written | none | none | 2026 | 2026-09-13 | https://www.adyen.com/knowledge-hub/agentic-commerce-fraud | "who bears the loss when an agent misreads intent aren't written yet" | vendor (Adyen sells agentic payments and fraud tools) | statement | 6 | Adyen's own terms | medium |
| R5-58 | Adyen says the task is telling authorized agents from unauthorized ones, not blocking automation | none | none | 2026 | 2026-09-13 | https://www.adyen.com/knowledge-hub/agentic-commerce-fraud | "Telling authorized agents from unauthorized ones does." | vendor (Adyen) | statement | 6 | detection accuracy | medium |
| R5-59 | Approval rates may hide lost conversion when agents meet declines | none | none | 2026 | 2026-05-26 | https://www.pymnts.com/artificial-intelligence-2/2026/agentic-commerce-may-force-new-focus-on-false-declines/ | "approval rates alone may not capture lost conversion" | trade press | analysis | 6 | any decline rate for agents | medium |
| R5-60 | QAwerk describes refunds clearing before order state reaches the agent that bought | none | none | 2026 | 2026-09-04 | https://www.searchenginejournal.com/getting-your-product-into-chatgpt-isnt-the-hard-part-getting-it-through-checkout-is/ | "a refund clears on the merchant's side before the updated order state ever reaches" | vendor (QAwerk sells testing) via trade press | practitioner report | 6 | frequency | low |
| R5-61 | PYMNTS tested Muse on 2026-09-09 and all three errands failed, blamed on credential sharing friction | 3 of 3 | errands failed | 2026-09-09 | 2026-09-23 | https://forkast.news/only-11-of-small-merchants-are-ready-for-ai-shopping-agents/ | "all three attempted errands failed" | press citing press test | test report | 5 | later versions, other agents | low |
| R5-62 | Muse testers reported the agent disconnected and uploaded sensitive data without permission | none | none | 2026-09 | 2026-09-23 | https://www.pymnts.com/?p=4225873 | "disconnected without explanation and uploaded sensitive information without permission" | press citing Reuters | press report | 5 | how often, whether fixed | medium |
| R5-63 | About 132 million US adults have bought with AI's help and 59% of AI-assisted purchases still end at Amazon | 59 | percent of AI-assisted purchases | 2025-09 to 2026-08 | 2026-09 | https://www.pymnts.com/study/will-the-2026-shopping-season-go-agentic/ | "59% of AI-assisted purchases still end at Amazon." | research publisher (PYMNTS) | survey | 5 | agent paid share | medium |
| R5-64 | Salesforce predicts 20% of 2026 holiday ecommerce traffic will come from AI chat agents | 20 | percent of traffic | 2026 holiday season | 2026-07-20 | https://www.salesforce.com/blog/holiday-retail-predictions-2026/ | "20% of all 2026 holiday ecommerce traffic will originate from AI chat agents" | vendor (Salesforce sells Agentforce commerce) | forecast | 7 | outcome, includes scraping bots | low |
| R5-65 | Data privacy and security is the top AI shopping concern in Europe, 32% (Gen Z) to 42% (Gen X) | 32 to 42 | percent | 2026 | 2026 (page shows only year) | https://www.deloitte.com/nl/en/Industries/retail/perspectives/ai-x-retail-the-state-of-agentic-commerce-in-europe.html | "data privacy and security remains the leading concern for all shoppers" | vendor (Deloitte sells consulting) | survey, 13,500 people, 15 countries | 6 | agent payment willingness | medium |
| R5-66 | x402 has 423 open issues and 417 open PRs, the most of the five protocol repos | 423 | open issues | 2026-11-15 | 2026-11-15 | https://github.com/x402-foundation/x402/issues | "total_count": 423 | primary (GitHub API) | repo data | 3 | issue quality, who files them | high |
| R5-67 | 60 of 423 open x402 issue titles mention dispute, refund, receipt, proof, attestation or delivery | 60 | issue titles | 2026-11-15 | 2026-11-15 | https://github.com/x402-foundation/x402/issues | "Correctness/dispute layer as the missing piece downstream of settlement" | primary (GitHub), counted by R5 | repo data, keyword count | 3 | rough regex on titles only | medium |
| R5-68 | An x402 issue says no one is standardizing what happens when paid work is wrong | none | none | 2026-07-17 | 2026-07-17 | https://github.com/x402-foundation/x402/issues/2887 | "the thing an agent paid for turns out to be wrong" | developer forum | issue | 6 | consensus of maintainers | medium |
| R5-69 | An x402 issue says retries during facilitator outages can pay twice | none | none | 2026-11-13 | 2026-11-13 | https://github.com/x402-foundation/x402/issues/4253 | "sequential settle retries can double-pay" | developer forum | issue | 6 | observed losses | medium |
| R5-70 | An ACP issue says a merchant can end up with no stored fact naming the agent or platform | none | none | 2026-10-15 | 2026-10-15 | https://github.com/agentic-commerce-protocol/agentic-commerce-protocol/issues/315 | "the merchant's representment has nothing to point at" | developer forum | issue | 6 | maintainer response | medium |
| R5-71 | An AP2 issue says v0.2 removed the Intent Mandate and the mispick dispute row | none | none | 2026-11-03 | 2026-11-03 | https://github.com/google-agentic-commerce/AP2/issues/393 | "v0.2 removed the Intent Mandate" | developer forum citing spec diff | issue | 6 | spec diff not opened by R5 | medium |
| R5-72 | An AP2 issue says mandates may not be verifiable years later at dispute time | none | none | 2026-08-21 | 2026-08-21 | https://github.com/google-agentic-commerce/AP2/issues/338 | "Years later, JWKS endpoints are gone, keys have rotated" | developer forum | issue | 6 | how often disputes need old keys | medium |
| R5-73 | A UCP issue says a current IETF Web Bot Auth draft would make verifiers drop UCP's key source | none | none | 2026-11-13 | 2026-11-13 | https://github.com/Universal-Commerce-Protocol/ucp/issues/1080 | "A WBA verifier that follows the current draft would drop UCP's key source" | developer forum | issue | 6 | live failures | medium |
| R5-74 | AP2's last default branch commit was 2026-04-29 and ACP's was 2026-07-18, while each has over 90 open issues | 95 and 92 | open issues | 2026-11-15 | 2026-11-15 | https://github.com/google-agentic-commerce/AP2/commits | "fix: remove uvlock (#246)" | primary (GitHub API) | repo data | 3 | work in private forks or other repos | medium |
| R5-75 | MPP specs leave receipt and settlement meaning undefined for card methods | none | none | 2026-07-04 | 2026-07-04 | https://github.com/tempoxyz/mpp-specs/issues/292 | "Receipt reference/settlement semantics undefined for fiat card-class methods" | developer forum | issue | 6 | maintainer plan | medium |
| R5-76 | An x402 issue says the payment header has no size limit and breaks common clients | none | none | 2026-10-14 | 2026-10-14 | https://github.com/x402-foundation/x402/issues/3803 | "Nothing bounds its size." | developer forum | issue | 6 | share of live endpoints affected | medium |

76 claims.

## 8. Not found and open questions

Not found, with where I looked:

- The shared web search budget ran out part way through. Searches still planned and not run: Forter agentic research, YouGov, Morning Consult, Bain, Salesforce Connected Shopper, Reddit and Hacker News threads on agent checkout, Shopify Community threads on Agentic Storefronts, Riskified and Forter Q3 2026 earnings comments, CFPB and European Commission statements dated in the window, Worldpay and Checkout.com earnings comments.
- No agent specific decline rate or false decline rate was found in any PSP, network or survey page.
- No count of consumer complaints or disputes about agent purchases was found (CFPB complaint data not searched).
- Adobe does not disclose AI traffic as a share of all retail visits. Adobe's own September blog timed out, so the September figures come from press.
- HUMAN monthly reports for June to August 2026 returned 403. Search summaries gave blocking rates of 21.3% (June), 17.5% (July) and 21.9% (August), not used because not opened. HUMAN's newsroom release also returned 403.
- Quad and Harris Poll (39% trust agents with everyday purchases) and Zeta Global (43% within a budget) appeared only in search summaries. Chainstoreage returned 403.
- The Checkout.com 3% of transactions figure was not on the Checkout.com page opened. It rests on a Forkast citation (R5-11).
- Forkast pieces carry figures with no attributed source, such as 5,000 to 500,000 USD integration cost per protocol. Not used.
- The 4% OpenAI fee on Shopify Agentic Storefront sales appeared only in vendor blog search summaries. Not verified.
- The ChatGPT Instant Checkout conversion at about one third of on-site rates appeared only in a search summary of a Forkast piece. Not verified.
- Reuters 2026-10-22 report on banks blocking agents and the Wells Fargo Online Access Agreement text were not opened (moneylife returned 403, Wells Fargo agreement not found).
- Amazon's Conditions of Use page returned a bot wall, so the agent identification clause was read only through press.
- Visa's earlier Morning Consult figures (38% comfortable with autonomous purchase, 60% want approval for any amount) appeared only in search summaries.
- The Deloitte 16% figure on trusting agents to complete purchases is from a 2025 US survey per search, not 2026. Not used.

Open questions:

- Will the Wells Fargo revocation rule (2026-11-24) spread to other US banks, and does it fit Regulation E revocation notice rules (C296)?
- What share of holiday 2026 agent sessions reach payment, as opposed to referral clicks? Adobe and Salesforce final holiday reports will show referral data, not agent payments.
- Does AP2 v0.2 keep any user signed record of intent for open mandates, and how will issuers judge a mispick dispute without it?
- How far has the Shopify storefront robots.txt with UCP routing rolled out? 1 of 4 stores checked carried it.
- Will Amazon appeal the Ninth Circuit ruling, and will Amazon's terms requiring agent self identification hold up?
- Is merchant demand for liability transfer (93%) being priced anywhere, for example by agent platforms taking merchant of record status?

Proposed additions to the R0 schema (lead decides):

- V11 Revocation evidence. Who records when an agent's authority ended, and in what form. Wells Fargo now makes this the customer's job (R5-44). It sits next to V4 and V8.
- P15 Agent access policy. How a merchant states which agents may browse, buy or must identify (robots.txt, terms of use, agents.md, UCP discovery file). Amazon and Shopify storefronts now use these files in opposite ways (R5-37, R5-40).
