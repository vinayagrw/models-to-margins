# A4 Cost per block (public prices only)

Researcher: A4. Pages opened: 2026-10-25. All prices in USD.

Read this first:

- Every vendor price below is a public list price, tagged [vendor] at rung 2. Rung 2 means the price exists on an opened page. It does not mean anyone pays it. Large buyers negotiate, and list prices are not what they pay.
- Wage figures come from US BLS pages, tagged [BLS] at rung 2. They are median gross wages. They leave out benefits, overhead and outside counsel rates.
- Every hour count, volume and token count is an assumption marked "illustrative". Change the assumption and the band moves.
- A price that could not be opened is rung 7 "not opened" and is not used in any sum.
- Vendors are listed, not ranked.

---

## 1. Price table per block

### P1 Check every claim (grounding or claim-check layer)

| Item | Public list price | Ledger |
|---|---|---|
| Amazon Bedrock Guardrails, contextual grounding check | $0.10 per 1,000 text units. A unit is up to 1,000 characters. Source, query and response characters all count. [vendor] | AR4-01, AR4-02 |
| Amazon Bedrock Guardrails, content filters and denied topics | $0.15 per 1,000 text units each [vendor] | AR4-01 |
| Amazon Bedrock Guardrails, Automated Reasoning checks | $0.17 per 1,000 text units per policy [vendor] | AR4-01 |
| Azure AI Content Safety, Standard text records (covers groundedness detection and Prompt Shields) | $0.375 per 1,000 text records. A record is up to 1,000 characters. The 5,000 free records a month are a separate Free tier with a hard stop, not an allowance on Standard. [vendor] | AR4-03, AR4-04 |
| Gemini API, Grounding with Google Search, Gemini 3 and newer | 5,000 free requests a month, then $14 per 1,000 requests [vendor] | AR4-05 |
| Gemini API, Grounding with Google Search, Gemini 2.5 Flash or Pro | 1,500 free requests a day, then $35 per 1,000 grounded prompts [vendor] | AR4-05 |
| Vertex AI Check Grounding API | $0.00075 per 1,000 count. The page does not define the unit further. Opened 2026-10-26, not used in any sum. [vendor] | AR4-06 |

### P2 Source and date rules

| Item | Public list price | Ledger |
|---|---|---|
| A product sold as "source and date rules" | no public price | none |

Note: source allow-lists and date rules can run inside the gateway (P6) or the claim-check layer (P1). Those costs sit in P1 and P6.

### P3 Failure log

| Item | Public list price | Ledger |
|---|---|---|
| Langfuse Cloud Hobby | $0 a month, 50k units, 30 days data access [vendor] | AR4-07 |
| Langfuse Cloud Core | $29 a month, 100k units, then $8 per 100k units [vendor] | AR4-07 |
| Langfuse Cloud Pro | $199 a month, 100k units, then $8 per 100k units, 3 years data access [vendor] | AR4-07 |
| Langfuse Cloud Enterprise | $2,499 a month [vendor] | AR4-07 |
| Langfuse overage tiers | $7 per 100k from 1M to 10M units, $6.50 from 10M to 50M, $6 above 50M [vendor] | AR4-07 |
| Langfuse self-hosted | Free licence. Page says "you can self-host it for free." Hosting cost not priced. [vendor] | AR4-07 |
| Helicone | Hobby free (10,000 requests), Pro $79 a month, Team $799 a month. Overage rate not shown. [vendor] | AR4-08 |
| Jira (as a ticket log) | rung 7 not opened (page text truncated) | AR4-09 |

### P4 Agent fence (identity, sandbox, approval steps, logs)

| Item | Public list price | Ledger |
|---|---|---|
| E2B Hobby | $0 plan fee, one-time $100 usage credit [vendor] | AR4-10 |
| E2B Pro | $150 a month plan fee plus usage [vendor] | AR4-10 |
| E2B Enterprise | Custom, $3,000 monthly minimum [vendor] | AR4-10 |
| E2B usage | $0.000014 per vCPU-second, $0.0000045 per GiB-second [vendor] | AR4-10 |
| AWS Bedrock AgentCore Identity | $0.010 per 1,000 token or API key requests. No extra charge through AgentCore Runtime or Gateway. [vendor] | AR4-11 |
| AWS Bedrock AgentCore Gateway | $0.005 per 1,000 invocations [vendor] | AR4-11 |
| AWS Bedrock AgentCore Policy | $0.000025 per authorization request [vendor] | AR4-11 |
| AWS Bedrock AgentCore Runtime (v1) | $0.0895 per vCPU-hour, $0.00945 per GB-hour [vendor] | AR4-11 |
| AgentCore Observability | Billed at Amazon CloudWatch rates. CloudWatch page rung 7 not opened. | AR4-11 |
| Microsoft Agent 365 | Included in Microsoft 365 E7. E7 price rung 7 not opened. | AR4-12 |
| Human approval step | Priced as people time in P9 | none |

### P5 One approved tool (enterprise AI seats)

| Item | Public list price | Ledger |
|---|---|---|
| Claude Team, Standard seat | $20 per seat a month billed annually, $25 monthly. For teams of 2 to 150. [vendor] | AR4-13 |
| Claude Team, Premium seat | $100 per seat a month billed annually, $125 monthly [vendor] | AR4-13 |
| Claude Enterprise | "US$20/seat/month, billed annually, 20 seat minimum." Plus usage at API rates. [vendor] | AR4-13 |
| Microsoft Copilot Business add-on | $21.00 per user a month, paid yearly, promo from $18.00 [vendor]. Learn page says the Business add-on supports up to 300 users. The $23.50 card on the same page is Microsoft 365 Business Standard with Copilot, a bundle with the Office apps. | AR4-14, AR4-12 |
| Microsoft Copilot, for enterprise | $30.00 per user a month, paid yearly [vendor]. Needs an eligible Microsoft 365 or Office 365 plan, not priced here. | AR4-14, AR4-12 |
| Google Workspace Business Standard (Gemini in Gmail, Docs, Meet) | $14.00 per user a month with a 1-year commitment, from Feb 8, 2027. Promo $7.00 shown. Capped at 300 users. [vendor] | AR4-15 |
| Google Workspace Business Plus | $22.00 per user a month with a 1-year commitment. Capped at 300 users. [vendor] | AR4-15 |
| Google Workspace Enterprise | "Let's talk". no public price | AR4-15 |
| ChatGPT Business and Enterprise | Business $20 per seat a month billed annually, for teams of 2 to 200 employees. Enterprise "Contact our sales team". Opened in a browser 2026-10-26 (curl got HTTP 403). [vendor] | AR4-16 |

### P6 Gateway with pinned models

| Item | Public list price | Ledger |
|---|---|---|
| Portkey Open Source | Self-hosted, no licence price shown, no request limit [vendor] | AR4-17 |
| Portkey Developer | Free, 10k recorded logs a month [vendor] | AR4-17 |
| Portkey Production | $49 a month, 100k recorded logs, then $9 per extra 100k requests up to 3M [vendor] | AR4-17 |
| Portkey Enterprise | Custom pricing | AR4-17 |
| Cloudflare AI Gateway | Core features "offered for free" on all plans. Legacy log limit 100,000 total on Workers Free, 10,000,000 per gateway on Workers Paid. Unified Billing adds 5%. [vendor] | AR4-18 |
| Kong Konnect Plus | From $25 a month. Serverless AI gateway $25 a month per control plane. 1M requests included, then $200 a month per extra 1M. Model proxy $100 a month per model, limit 5 models on Plus. [vendor] | AR4-19 |
| Azure API Management Consumption | First 1M operations included per subscription, then $0.035 per 10K [vendor] | AR4-20, AR4-21 |
| Azure API Management Basic v2 | $0.20548 per hour, 10M requests a month included [vendor] | AR4-20, AR4-21 |
| Azure API Management Standard v2 | $0.9589 per hour, 50M requests a month included [vendor] | AR4-20, AR4-21 |
| Azure API Management Premium v2 | $3.83562 per hour [vendor] | AR4-21 |

### P7 Contract terms (legal review time)

| Item | Public figure | Ledger |
|---|---|---|
| US lawyers, median pay, May 2025 | $76.76 per hour, $159,670 per year [BLS] | AR4-22 |
| Outside counsel hourly rates | no public price | none |

### P8 Value ledger (FinOps tooling or time)

| Item | Public figure | Ledger |
|---|---|---|
| Vantage Starter | Free, up to $2,500 of tracked cloud spend [vendor] | AR4-23 |
| Vantage Pro | $30 a month, up to $7,500 tracked spend [vendor] | AR4-23 |
| Vantage Business | $200 a month, up to $20,000 tracked spend [vendor] | AR4-23 |
| OpenCost | "Forever free and open source." Hosting not priced. [vendor] | AR4-24 |
| US financial analysts, median pay, May 2025 | $49.79 per hour, $103,570 per year [BLS] | AR4-25 |
| Langfuse cost tracking | Included in the P3 plans above [vendor] | AR4-07 |

### P9 Named checkers (reviewer hours)

| Item | Public figure | Ledger |
|---|---|---|
| US compliance officers, median pay, May 2025 | $38.81 per hour, $80,730 per year [BLS] | AR4-26 |
| US lawyers (for legal-domain checks) | $76.76 per hour [BLS] | AR4-22 |

### P10 Your own test set (eval tooling and run cost)

| Item | Public list price | Ledger |
|---|---|---|
| promptfoo Community | "Free Forever", open source. Licence not named on page. [vendor] | AR4-27 |
| promptfoo Enterprise and On-Premise | Custom | AR4-27 |
| Braintrust Starter | $0 a month, 1 GB data then $4 per GB, 10k scores then $2.50 per 1k, 14-day retention [vendor] | AR4-28 |
| Braintrust Pro | $249 a month, 5 GB then $3 per GB, 50k scores then $1.50 per 1k, 30-day retention [vendor] | AR4-28 |
| LangSmith Developer | $0 per seat, 5k base traces a month [vendor] | AR4-29 |
| LangSmith Plus | $39 per seat a month, 10k base traces a month. Overage rate not shown. [vendor] | AR4-29 |
| Claude Haiku 5.5 tokens (prompts up to 100k) | $0.10 input, $0.50 output per million tokens. Batch $0.05 and $0.25. [vendor] | AR4-30 |
| Claude Sonnet 5.5 tokens | $2 input, $10 output per million tokens. Batch $1 and $5. [vendor] | AR4-30 |
| Gemini 2.5 Flash tokens (paid tier) | $0.30 input (text), $2.50 output per million tokens [vendor] | AR4-05 |

---

## 2. Example firm model

### The example firm (all illustrative)

| Input | Value |
|---|---|
| Staff | 1,000 |
| Active AI users | 200 |
| Agents in production | 10 |
| Model calls a month | 1,000,000 |
| Tokens per call | 1,500 input, 500 output (illustrative) |

Model spend is outside the ten blocks. It is shown once because P8 tiers depend on it.
Model spend at 1M calls: Haiku 5.5 = 1,500 x $0.10 + 500 x $0.50 = $400 a month. Gemini 2.5 Flash = 1,500 x $0.30 + 500 x $2.50 = $1,700 a month. Sonnet 5.5 = 1,500 x $2 + 500 x $10 = $8,000 a month. (1M calls x 1,500 tokens = 1,500M tokens, so the per-million price multiplies by 1,500.)

### P1 Check every claim

Illustrative assumptions. Low: check 10% of calls (100,000), 2 text units each. High: check every call, 10 units each (source plus query plus response, about 10,000 characters).

- Bedrock grounding check low: 100,000 x 2 = 200,000 units. 200 x $0.10 = $20 a month.
- Bedrock grounding check high: 1,000,000 x 10 = 10,000,000 units. 10,000 x $0.10 = $1,000 a month.
- Azure Content Safety low: 200,000 records. The 5,000 free records sit on a separate Free tier and cannot be deducted from Standard use. 200 x $0.375 = $75.00 a month.
- Azure Content Safety high: 10,000,000 records. 10,000 x $0.375 = $3,750.00 a month.
- Gemini 3 search grounding low: 100,000 requests minus 5,000 free = 95,000. 95 x $14 = $1,330 a month.
- Gemini 3 search grounding high: 1,000,000 minus 5,000 = 995,000. 995 x $14 = $13,930 a month.

Search grounding adds fresh sources. A claim check tests an answer against sources you already hold. They are different jobs, so both ends are shown.

### P2 Source and date rules

no public price.

### P3 Failure log

Illustrative assumptions. Low: log only flagged failures, under 50,000 units a month. High: log every call at 3 units each (3,000,000 units).

- Low: Langfuse Hobby $0, or self-hosted licence $0 (hosting not priced). Managed paid floor: Langfuse Core $29.
- Mid: Langfuse Pro, 1 unit per call. Overage 900,000 units / 100,000 x $8 = $72. $199 + $72 = $271 a month.
- High: Langfuse Pro, 3,000,000 units. First 900,000 overage units x $8 per 100k = $72. Next 2,000,000 units x $7 per 100k = $140. $199 + $72 + $140 = $411 a month.

### P4 Agent fence

Illustrative assumptions. Low: each agent sandbox 1 vCPU, 1 GiB, 2 hours a day, 22 days. High: 2 vCPU, 4 GiB, 8 hours a day, 22 days. Agent identity requests: low 100 per agent a day, high 1,000. Gateway tool calls and policy checks: low 30,000 a month, high 300,000.

- Low sandbox seconds: 2 x 22 x 3,600 = 158,400. vCPU 158,400 x $0.000014 = $2.22. RAM 158,400 x $0.0000045 = $0.71. Per agent $2.93. Ten agents $29.30. Plus E2B Pro $150. Total $179.30.
- High sandbox seconds: 8 x 22 x 3,600 = 633,600. vCPU 2 x 633,600 x $0.000014 = $17.74. RAM 4 x 633,600 x $0.0000045 = $11.40. Per agent $29.15. Ten agents $291.46. Plus $150. Total $441.46.
- Identity low: 10 x 100 x 30 = 30,000 requests. 30 x $0.010 = $0.30. High: 300,000. 300 x $0.010 = $3.00.
- Gateway low: 30 x $0.005 = $0.15. High: 300 x $0.005 = $1.50.
- Policy low: 30,000 x $0.000025 = $0.75. High: 300,000 x $0.000025 = $7.50.
- Logs: CloudWatch not opened, so not counted.
- Low total: $179.30 + $0.30 + $0.15 + $0.75 = $180.50 a month.
- High total: $441.46 + $3.00 + $1.50 + $7.50 = $453.46 a month.
- If identity calls go through AgentCore Gateway, Identity has no extra charge, so the totals are $180.20 and $450.46. The band below keeps the higher figures.

### P5 One approved tool

200 active users. The firm has 1,000 staff, so plans capped at 150, 200 or 300 users do not fit.

- Claude Team is for 2 to 150 seats. Not eligible.
- Claude Enterprise: 200 x $20 = $4,000 a month seat fee. Usage at API rates comes on top and is not counted here.
- Microsoft Copilot for enterprise: 200 x $30.00 = $6,000 a month. Prerequisite Microsoft 365 licence not counted.
- Google Workspace Business plans cap at 300 users. A 1,000-staff firm needs Enterprise, which has no public price.
- ChatGPT Business is for teams of 2 to 200 employees. Not eligible. ChatGPT Enterprise has no public price. Not counted.
- Band: $4,000 to $6,000 a month seat fees.

### P6 Gateway with pinned models

1,000,000 calls a month.

- Portkey open source or self-hosted: $0 licence. Hosting not priced.
- Azure API Management Consumption: 1M operations included, so $0 at this volume.
- Kong Konnect Plus: 1 serverless AI gateway $25. 1M requests included. Model proxy $100 a month per pinned model, limit 5 on Plus. $25 + $100 per pinned model: $125 a month for one model, $525 a month for five.
- Portkey Production: $49 + (1,000,000 - 100,000) / 100,000 x $9 = $49 + $81 = $130 a month.
- Azure API Management Basic v2: $0.20548 x 730 hours = $150.00 a month.
- Azure API Management Standard v2: $0.9589 x 730 hours = $700.00 a month.
- Cloudflare AI Gateway core features: $0. Workers Paid plan price not opened, so not counted.

### P7 Contract terms

Illustrative assumptions: 2 to 4 AI vendor contracts reviewed a year, 20 to 60 lawyer hours each, at the BLS median.

- Low: 2 x 20 x $76.76 = $3,070.40 a year ($255.87 a month).
- High: 4 x 60 x $76.76 = $18,422.40 a year ($1,535.20 a month).

### P8 Value ledger

Illustrative assumptions: 4 to 16 analyst hours a month. Tracked AI cloud spend $400 to $8,000 a month (model spend above).

- Low: Vantage Starter $0 (spend under $2,500) + 4 x $49.79 = $199.16 a month.
- High: Vantage Business $200 (spend under $20,000) + 16 x $49.79 = $796.64. Total $996.64 a month.
- OpenCost is a free alternative to the tool line. Hosting not priced.

### P9 Named checkers

Illustrative assumptions: 1,000 to 5,000 high-stakes outputs reviewed a month, 3 minutes each, at the compliance officer median.

- Low: 1,000 x 3 / 60 = 50 hours. 50 x $38.81 = $1,940.50 a month.
- High: 5,000 x 3 / 60 = 250 hours. 250 x $38.81 = $9,702.50 a month.

### P10 Your own test set

Illustrative assumptions. Each case is 1 model call plus 1 judge call, 2,000 input and 500 output tokens per call. Low: 500 cases, 4 runs a month. High: 2,000 cases, 30 runs a month.

- Low calls: 500 x 4 x 2 = 4,000. Tokens 8M input, 2M output. Haiku 5.5 batch: 8 x $0.05 + 2 x $0.25 = $0.40 + $0.50 = $0.90. Tool: promptfoo Community $0. Total $0.90 a month.
- High calls: 2,000 x 30 x 2 = 120,000. Tokens 240M input, 60M output. Sonnet 5.5 standard: 240 x $2 + 60 x $10 = $480 + $600 = $1,080.
- High tool: Braintrust Pro $249. Scores 2,000 x 30 = 60,000, minus 50,000 included = 10,000. 10 x $1.50 = $15. Data assumed under 5 GB. Tool $264.
- High total: $1,080 + $264 = $1,344 a month.
- Building and labelling the test set takes people time. Not counted here.

---

## 3. Band per block (illustrative, monthly, list prices)

| Block | Band (illustrative) |
|---|---|
| P1 Check every claim | $20 to $13,930 a month ($20 to $3,750 for a claim check, $1,330 to $13,930 for search grounding) |
| P2 Source and date rules | no public price |
| P3 Failure log | $0 to $411 a month (licence only, hosting excluded) |
| P4 Agent fence | $181 to $453 a month (logs excluded) |
| P5 One approved tool | $4,000 to $6,000 a month seat fees (usage and prerequisite licences excluded) |
| P6 Gateway with pinned models | $0 to $700 a month (hosting excluded) |
| P7 Contract terms | $3,070 to $18,422 a year ($256 to $1,535 a month) |
| P8 Value ledger | $199 to $997 a month |
| P9 Named checkers | $1,941 to $9,703 a month |
| P10 Your own test set | $1 to $1,344 a month (test set build time excluded) |
| Sum of blocks with a price | $6,597 to $35,073 a month, $79,163 to $420,874 a year. Illustrative. Ends do not belong to one coherent plan. |

People time (P7, P8 hours, P9) is $2,396 to $12,034 a month of that sum. P5 seats are the largest fixed tool line.

---

## 4. Ledger

Rung 2 = the price exists on the opened page. Rung 7 = not opened, not used.

| id | Claim | URL | Page date | Rung | Opened | Flags |
|---|---|---|---|---|---|---|
| AR4-01 | Bedrock Guardrails contextual grounding $0.10 per 1,000 text units, content filters and denied topics $0.15, Automated Reasoning $0.17, word filters free | https://aws.amazon.com/bedrock/pricing/ | no date shown | 2 | 2026-10-25 | [vendor] list price |
| AR4-02 | Grounding text units combine "all the characters in the source, query, and model response" | https://aws.amazon.com/bedrock/pricing/ | no date shown | 2 | 2026-10-25 | [vendor] |
| AR4-03 | Azure Content Safety Standard text records $0.375 per 1K, free tier $0 | https://prices.azure.com/api/retail/prices?$filter=productName eq 'Content Safety' and armRegionName eq 'eastus' | effectiveStartDate 2024-06-01 | 2 | 2026-10-25 | [vendor] list price, East US region. Product page showed "$-" placeholders |
| AR4-04 | Content Safety free tier 5,000 text records a month, record up to 1,000 characters, text covers groundedness detection and Prompt Shields | https://azure.microsoft.com/en-us/pricing/details/cognitive-services/content-safety/ | no date shown | 2 | 2026-10-25 | [vendor]. Free is a separate tier with a hard stop ("Customers cannot accrue overages on the free tier"), not an allowance on Standard |
| AR4-05 | Gemini 3 search grounding 5,000 free a month then $14 per 1,000. Gemini 2.5 $35 per 1,000 after 1,500 a day. Gemini 2.5 Flash $0.30 in, $2.50 out per M tokens | https://ai.google.dev/gemini-api/docs/pricing | Last updated 2026-10-22 | 2 | 2026-10-25 | [vendor] Gemini API, not Vertex |
| AR4-06 | Vertex AI Check Grounding $0.00075 per 1,000 count | https://cloud.google.com/vertex-ai/generative-ai/pricing and https://cloud.google.com/generative-ai-app-builder/pricing | unknown | 2 | 2026-10-26 (V10b recheck). Truncated on 2026-10-25 | [vendor] unit "1,000 count" not defined on the page. Not used in any sum |
| AR4-07 | Langfuse Hobby $0, Core $29, Pro $199, Enterprise $2,499, overage $8 per 100k then tiered, self-host free | https://langfuse.com/pricing | no date shown | 2 | 2026-10-25 | [vendor] Self-host pricing subpage not opened |
| AR4-08 | Helicone Hobby free, Pro $79, Team $799 | https://www.helicone.ai/pricing | no date shown | 2 | 2026-10-25 | [vendor] overage not shown |
| AR4-09 | Jira plan prices | https://www.atlassian.com/software/jira/pricing | unknown | 7 | not opened | Page text truncated, not used |
| AR4-10 | E2B Hobby $0, Pro $150 a month, Enterprise $3,000 minimum, $0.000014 per vCPU-second, $0.0000045 per GiB-second | https://e2b.dev/pricing | no date shown | 2 | 2026-10-25 | [vendor] |
| AR4-11 | AgentCore Identity $0.010 per 1,000, Gateway $0.005 per 1,000, Policy $0.000025 per request, Runtime $0.0895 per vCPU-hour | https://aws.amazon.com/bedrock/agentcore/pricing/ | no date shown | 2 | 2026-10-25 | [vendor] Observability billed at CloudWatch rates, not opened |
| AR4-12 | Copilot Business add-on supports up to 300 users. E7 includes Copilot and Agent 365. | https://learn.microsoft.com/en-us/copilot/microsoft-365/microsoft-365-copilot-licensing and https://learn.microsoft.com/en-us/copilot/microsoft-365/compare-copilot-e3-e5-e7 | ms.date 2026-10-19 | 2 | 2026-10-25 | [vendor] no prices on these pages. E7 price not found |
| AR4-13 | Claude Team Standard $20 annual, $25 monthly, 2 to 150 seats. Premium $100 annual. Enterprise US$20 per seat a month, 20 seat minimum, plus usage at API rates | https://claude.com/pricing | no date shown | 2 | 2026-10-25 | [vendor] excludes tax |
| AR4-14 | $23.50 card is Microsoft 365 Business Standard with Copilot, a bundle with the Office apps. Copilot Business add-on $21.00, promo from $18.00. Copilot for enterprise add-on $30.00. All per user a month paid yearly | https://www.microsoft.com/copilot | no date shown | 2 | 2026-10-25 | [vendor] four other microsoft.com Copilot URLs timed out |
| AR4-15 | Workspace Starter $7, Standard $14, Plus $22 with a 1-year commitment, from Feb 8, 2027, promo prices shown, 300-user cap, Enterprise "Let's talk" | https://workspace.google.com/pricing | promo dated Nov 8, 2026 to Feb 8, 2027 | 2 | 2026-10-25 | [vendor] promo footnote conflicts with label |
| AR4-16 | ChatGPT Business $20 per seat a month billed annually, for teams of 2 to 200 employees. Enterprise "Contact our sales team" | https://chatgpt.com/pricing/?type=team (also https://openai.com/chatgpt/pricing/, https://chatgpt.com/pricing/, https://openai.com/business/chatgpt-pricing/, https://chatgpt.com/business/) | unknown | 2 | 2026-10-26, browser (V10b recheck). curl HTTP 403 on all four URLs | [vendor] Not used in any sum. The 2 to 200 cap does not fit a 1,000-staff firm |
| AR4-17 | Portkey Open Source self-host, Developer free 10k logs, Production $49 plus $9 per extra 100k up to 3M, Enterprise custom | https://portkey.ai/pricing | no date shown | 2 | 2026-10-25 | [vendor] |
| AR4-18 | Cloudflare AI Gateway core features free, legacy log limits, Unified Billing 5% fee | https://developers.cloudflare.com/ai-gateway/reference/pricing/ | Last updated Oct 15, 2026 | 2 | 2026-10-25 | [vendor] Workers Paid price not opened |
| AR4-19 | Kong Konnect Plus from $25, serverless AI gateway $25 per control plane, 1M requests included, $200 per extra 1M, model proxy $100 a month per model, limit 5 models on Plus | https://konghq.com/pricing | no date shown | 2 | 2026-10-25 | [vendor] |
| AR4-20 | APIM Consumption first 1M operations included. Basic v2 10M and Standard v2 50M requests included | https://azure.microsoft.com/en-us/pricing/details/api-management/ | no date shown | 2 | 2026-10-25 | [vendor] dollar values showed "$-" placeholders |
| AR4-21 | APIM Consumption $0.035 per 10K, Basic v2 $0.20548 per hour, Standard v2 $0.9589 per hour, Premium v2 $3.83562 per hour | https://prices.azure.com/api/retail/prices?$filter=serviceName eq 'API Management' and armRegionName eq 'eastus' | not shown | 2 | 2026-10-25 | [vendor] East US region. 730 hours a month is my assumption |
| AR4-22 | Lawyers median $76.76 per hour, $159,670 a year, May 2025 | https://www.bls.gov/ooh/legal/lawyers.htm | Last modified August 27, 2026 | 2 | 2026-10-25 | [BLS] median, no benefits or overhead |
| AR4-23 | Vantage Starter free to $2,500 spend, Pro $30 to $7,500, Business $200 to $20,000 | https://www.vantage.sh/pricing | no date shown | 2 | 2026-10-25 | [vendor] |
| AR4-24 | OpenCost "Forever free and open source" | https://www.opencost.io/ | no date shown | 2 | 2026-10-25 | [vendor] licence not named on page |
| AR4-25 | Financial analysts median $49.79 per hour, $103,570 a year, May 2025 | https://www.bls.gov/ooh/business-and-financial/financial-analysts.htm | Last modified August 27, 2026 | 2 | 2026-10-25 | [BLS] proxy for a FinOps analyst |
| AR4-26 | Compliance officers median $38.81 per hour, $80,730 a year, May 2025 | https://www.bls.gov/ooh/business-and-financial/compliance-officers.htm | Last modified August 27, 2026 | 2 | 2026-10-25 | [BLS] proxy for a named checker |
| AR4-27 | promptfoo Community "Free Forever", Enterprise and On-Premise custom | https://www.promptfoo.dev/pricing/ | no date shown | 2 | 2026-10-25 | [vendor] |
| AR4-28 | Braintrust Starter $0, Pro $249, scores and data overage rates | https://www.braintrust.dev/pricing | no date shown | 2 | 2026-10-25 | [vendor] |
| AR4-29 | LangSmith Developer $0 per seat 5k traces, Plus $39 per seat 10k traces | https://www.langchain.com/pricing | no date shown | 2 | 2026-10-25 | [vendor] overage rate not shown |
| AR4-30 | Haiku 5.5 $0.10 in, $0.50 out, batch $0.05 and $0.25. Sonnet 5.5 $2 in, $10 out, batch $1 and $5, per M tokens | https://platform.claude.com/docs/en/about-claude/pricing | no date shown | 2 | 2026-10-25 | [vendor] |
| AR4-31 | BLS OEWS occupation pages for 23-1011 and 13-1041 | https://www.bls.gov/oes/current/oes231011.htm and https://www.bls.gov/oes/2025/may/oes231011.htm | unknown | 7 | not opened | Pages returned no wage figures. OOH pages used instead |

---

## 5. Gaps

1. ChatGPT Business and Enterprise: four OpenAI URLs returned HTTP 403 to curl. A browser read on 2026-10-26 showed Business at $20 a seat a month billed annually for 2 to 200 employees, and Enterprise at "Contact our sales team". Business does not fit a 1,000-staff firm and Enterprise has no public price, so no price is used.
2. Vertex AI grounding and Check Grounding API: page text came back truncated on 2026-10-25. A recheck on 2026-10-26 showed Check grounding at $0.00075 per 1,000 count, with the unit not defined. Not used in any sum. Only the Gemini API grounding price is used.
3. Google Workspace Enterprise and Gemini for a 1,000-staff firm: "Let's talk". no public price.
4. Microsoft 365 E7 price and the prerequisite E3 or E5 licence for Copilot: not found on opened pages. P5 Copilot cost excludes them.
5. Claude Enterprise usage at API rates: depends on usage, not counted in P5.
6. Hosting cost for self-hosted options (Langfuse, Portkey open source, OpenCost, promptfoo): not priced. The $0 low ends are licence only.
7. Logs and observability for P4 (CloudWatch) and Cloudflare Workers Paid: not opened.
8. Jira price for a ticket-style failure log: page truncated, not opened.
9. Wage figures are US medians. No UK ONS ASHE page was opened. No loaded rate (benefits plus overhead) was opened, so people-time bands are gross wage only.
10. P2 has no product with a public price. Its cost lands inside P1, P6 and staff time that is not priced here.
11. Test set build and labelling time (P10) and approval-step time (P4) are not priced separately.
12. Azure retail prices are East US list rates. Other regions differ.
13. All volumes, hours and token counts are illustrative assumptions. None is measured.
