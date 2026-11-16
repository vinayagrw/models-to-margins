# 07. How AI changes business models and economics

Date: 2026-10-27. Labels: **Verified** (checked against a source in this pass), **Plausible** (widely reported or from earlier reporting, not rechecked today), **Estimate** (our own judgement).

## 1. Seat pricing moves to outcome and usage pricing

- **Verified.** Intercom Fin charges $0.99 per outcome. An outcome counts when the customer confirms a fix, does not ask for more help, or Fin completes a workflow. One charge per conversation, monthly minimum applies. https://intercom.com/fin/pricing
- **Verified.** Salesforce Agentforce moved from $2 per conversation to Flex Credits: $500 per 100,000 credits, 20 credits per action, so about $0.10 per action. It also sells per user add-ons. Enterprise Edition customers can get 100,000 credits at no cost through Salesforce Foundations (not 200,000 as first written). Later 2026 guides describe pre-purchase, pre-commit and pay as you go rates, so the $0.10 figure is a list rate. https://www.salesforce.com/news/?p=87214 and https://www.constellationr.com/insights/news/salesforce-revamps-agentforce-pricing-flex-credits-what-you-need-know
- **Verified (trade press).** Salesforce signed a definitive agreement, announced around 15 June 2026, to buy Fin (Intercom renamed itself Fin) for about $3.6B, to fold into Agentforce. Reports differ on cash versus cash and stock and on whether it has closed. Salesforce press release not opened in this pass. https://techradar.com/pro/salesforce-snaps-up-customer-service-software-giant-fin-for-usd3-6bn and https://martech.org/salesforce-acquires-fin-formerly-known-as-intercom/
- **Estimate.** Hybrid models win in the near term: a platform fee plus metered work. Pure outcome pricing needs a clean, agreed definition of "done", which most workflows lack.
- Why it matters: if agents replace the humans who held the seats, seat revenue shrinks. Vendors must price the work, not the worker.

## 2. Small firms with high revenue per employee

- **Plausible.** AI native firms such as Cursor (Anysphere), Midjourney and Lovable report revenue per employee in the millions of dollars, far above the roughly $200k to $400k typical of SaaS. https://leanaileaderboard.com
- **Estimate.** The pattern holds for product firms with low support loads. It is weaker for firms that sell into regulated enterprises, where people still do sales, security review and change work.

## 3. Agents as digital labour and services-as-software

- **Plausible.** Salesforce frames Agentforce as "digital labor" and Sequoia and Foundation Capital frame "services as software" as a market sized by labour spend, not IT spend. https://foundationcapital.com/ai-service-as-software/
- **Estimate.** The addressable pool shifts from software budgets (low trillions) toward services and labour budgets (much larger). Most of that pool is captured slowly, task by task, not job by job.

## 4. Margin effects of inference cost

- **Verified.** Price per token at a given capability level has fallen roughly 10x per year (a16z "LLMflation", Epoch AI). https://a16z.com/llmflation-llm-inference-cost/
- **Plausible.** Usage per task has risen faster, driven by reasoning models and long agent loops that burn many more tokens. AI app gross margins often sit near 50 to 60 percent against 75 to 80 percent for classic SaaS.
- **Estimate.** Net effect: the unit cost of a token falls but cost per finished task can rise. Margin depends on routing, caching and model choice, not list price.

## 5. Jevons effect on compute demand

- **Plausible.** Cheaper inference has expanded total demand. Google and Microsoft have reported large jumps in tokens processed each month. https://blog.google/technology/ai/
- **Estimate.** Jevons holds while new use cases keep opening. It breaks if efficiency gains (smaller models, on device) outrun new demand, which would hurt the capex thesis.

## 6. IT services and BPO disruption (relevant to Ciklum)

- **Verified (corrected).** On 23 October 2026 Infosys revised FY27 revenue growth guidance to 1 to 2 percent in constant currency, down from 1.5 to 3.5 percent in April, and kept margin guidance at 20 to 22 percent. Linking the cut to AI deflation is analyst interpretation, one note also cites the West Asia war. https://www.sec.gov/Archives/edgar/data/0001067491/000106749126000042/exv99w02.htm
- **Plausible.** Accenture lowered the upper end of its revenue growth forecast on weak bookings (analyst report, Accenture filing not opened).
- **Plausible.** Large IT stocks fell nearly 30 percent from highs while some AI focused BPO firms neared highs. https://nearshoreamericas.com/new-tech-order-ai-fueled-bpos-outpace-legacy-it-firms/ and https://askfuzz.ai/discover/news/companies/infosys-cuts-fy27-guidance-while-tcs-posts-24-margin
- **Verified (commentary).** Analysts see 10 to 15 percent productivity giveback on renewals and muted 1 to 3 percent Indian IT growth. https://www.multibagg.ai/market-pulse/articles/indian-it-ai-cloud-2026-cmu1mjhp6000j2uqtmbg5rg6h
- **Estimate.** Time and materials engineering and contact centre work deflate first. Winners move to fixed price and outcome contracts, sell agent build and run, own data and evaluation work, and keep margin by delivering with fewer people. For a firm like Ciklum the risk is pyramid revenue. The upside is agent platforms and managed AI operations.

## 7. Capex wave and bubble risk

- **Verified (corrected).** After Q1 results Amazon, Microsoft, Alphabet and Meta guided about $725B of 2026 capex, up about 77 percent on about $410B in 2025. July updates lifted the total to about $735 to $750B: Amazon about $220B, Microsoft about $190B (calendar basis, fiscal year ends June), Alphabet $195 to $205B, Meta $130 to $145B. Q3 2026 updates not checked. https://platformonomics.com/2026/07/follow-the-capex-q2-2026-scoreboard/ and https://www.tomshardware.com/tech-industry/big-tech/big-techs-ai-spending-plans-reach-725-billion https://finance.yahoo.com/sectors/technology/articles/hyperscalers-hit-700-billion-2026-111243744.html and https://om.co/2026/04/30/what-i-learned-about-hyperscalers-ai-spend/
- **Plausible.** Bubble signs: circular deals between chip makers, labs and clouds, debt funded data centres, short GPU useful lives versus long depreciation schedules, and AI revenue still far below capex.
- **Estimate.** A pause or air pocket in 2027 to 2028 is likely if enterprise revenue lags. The assets stay useful, like fibre after 2001, so prices fall and users gain.

## 8. Link to Models to Margins

The site already covers this ground in docs/Automation_Capex_Air_Pocket_Technical_Design.md (capex air pocket) and the open weight TCO model (cost per token versus cost per task). This study adds three hooks: price the outcome not the seat, model cost per finished task not per token, and show the services deflation path for IT and BPO buyers. Each can become a brief or a lever in the TCO model.

## 9. Outlook

| Horizon | Outlook | Label |
|---|---|---|
| 1 year (2027) | Hybrid seat plus usage pricing becomes the norm. IT services growth stays low single digit. Capex keeps rising but guidance grows more cautious. | Estimate |
| 3 years (2029) | Outcome pricing standard in support, IT ops and back office. Likely capex digestion phase. Services firms reprice 15 to 25 percent of legacy work. | Estimate |
| 5 years (2031) | Agent labour is a budget line beside headcount. Small high revenue firms common. BPO volumes shrink, value shifts to oversight and exceptions. | Estimate |
| 10 years (2036) | Compute is a utility with thin margins. Value sits in data, distribution and trust. Services firms look like software and managed operations firms. | Estimate |
| 15 years (2041) | Most routine knowledge work priced as output. Labour market and pricing norms reset. Wide uncertainty about who captures the surplus. | Estimate |

## Verification log (27 October 2026)

| Claim | Result | Source opened |
|---|---|---|
| Fin $0.99 per outcome | Verified, wording matches | intercom.com/pricing |
| Agentforce Flex Credits | Verified $0.10 per action. Corrected free Foundations credits from 200,000 to 100,000 | Salesforce news, Constellation Research |
| Salesforce buys Intercom (Fin) for $3.6B | Confirmed by several trade outlets, June 2026. Kept, relabelled. Payment terms and close status unclear | TechRadar, MarTech |
| Token price fall 10x a year | Verified in a16z LLMflation | a16z.com |
| Infosys FY27 cut | Corrected to 1 to 2 percent from 1.5 to 3.5 percent. AI cause is analyst view | Infosys 6-K on sec.gov |
| Accenture guidance trim | Downgraded to Plausible, primary not opened | analyst report only |
| 2026 hyperscaler capex | Corrected to about $735 to $750B after July, per company figures updated | Platformonomics, Tom's Hardware |
| Revenue per employee, AI gross margins, Jevons token counts, IT stock falls, 10 to 15 percent giveback | Not rechecked, stay Plausible or commentary | none |

Missing claims worth adding: Fin resolution rate (reported about 76 percent at deal time), Microsoft and Google monthly token figures with dates, and a source for the 50 to 60 percent AI app gross margin figure.
