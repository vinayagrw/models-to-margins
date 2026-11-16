# A5. Closers for items left open in V9, SOL2 and R7

Researcher A5. Work done 2026-10-25 to 2026-10-26 (UTC). This file does not edit V9, R7 or SOL2. It adds ledgers that continue their numbering.

Evidence ladder: 1 peer reviewed, 2 primary record, 3 independent measurement, 4 independent survey, 5 vendor or consulting, 6 press or user post, 7 not opened. Flags: [vendor] sells the product or fix, [analyst] and [consulting] sell advice, [self-report] means the party reports on itself, [preprint] is not peer reviewed.

How pages were opened: `curl -sL` with a Chrome user agent, text pulled with Python. Where curl was blocked, the Claude browser pane was used (navigate, then page text or a DOM read). Wayback copies were read through the CDX index and the `id_` raw capture. Each row says which route worked.

## 1. V9 unverified items

### 1.1 Scope note

V9's own summary lists three unverified rows: Page 1 row 23 ("Many firms give staff no approved tool"), Page 1 row 44 (Gartner 71% and 21%) and Page 2 row 38 (Full Fact date). The brief named a different three: the Full Fact date, the OpenAI export page update date (LK-19) and a Netskope figure. All five are covered below. The Netskope recheck is the one SOL2 records as failed on 2026-10-25 (SF-75), plus the Netskope 47% that V9 row 21 uses.

### 1.2 Results

| Item | Status | Where I looked | What it shows |
|---|---|---|---|
| Full Fact report date, P2 row 38 | verified (15 Oct is the first public date) | Live page, sitemap, Wayback, one press copy | The page still carries no date. Wayback's first capture is 2026-10-15 07:07 UTC. A news write-up is dated 2026-10-15 09:07 UTC. No dated Full Fact release found |
| OpenAI export page, LK-19 "updated about 2026-10-22" | wrong | Live page in browser, two Wayback copies | The export limit was on the page by 2026-09-12, with an update stamp of 2026-08-25. The live page now shows an update at 2026-10-26 04:31 UTC (edited again 04:56 UTC). No copy shows a 22 Oct update |
| Netskope AI Report 2026, SF-75 | verified | Live page by curl, full text served | All SF-75 figures match |
| Netskope Cloud and Threat Report 2026, SF-73 and V9 row 21 | verified | Live page by curl, plus the Infosecurity copy | 78% to 47% personal app use matches. The report frames 223 two ways |
| Gartner 71% and 21%, P1 row 44 | verified for the numbers, tag wrong (minor) | gartner.com release in browser | Primary text read. Survey is Q2 2026, released 19 Oct |
| "Many firms give staff no approved tool", P1 row 23 | unverified (no source to open) | No ledger row exists | Nothing to reopen. Netskope's nearest figure is a different claim |

### 1.3 Detail

**Full Fact (V9R-01 to V9R-03).** The report page at fullfact.org/ai-benchmark/report-one/ has no visible date and no date metadata (checked 2026-10-26). The site sitemap gives `lastmod` 2026-10-16 for the page. That is the last edit, not the launch. The Wayback CDX index lists the first capture at 20261015070716 with HTTP 200. I opened that capture and it is the same report (it names the 15 July collection start and 7,625 answers). A Resultsense news item, "via The Independent", carries `datePublished` 2026-10-15T09:07:30Z. Keep 15 Oct on Page 2. Change the ledger note from "about" to "first public 2026-10-15 (Wayback and press), page undated". Does not tell you: the hour Full Fact published, or whether an embargoed copy went out earlier.

**OpenAI export page (V9R-04 to V9R-06).** The direct URL redirects to `/en/articles/7260999-exporting-your-chatgpt-history-and-data`. curl got 403. The browser pane opened it on 2026-10-26 at 04:49 UTC. It showed "Updated: 17 minutes ago". The page data holds `updatedAt` 1792989104, which converts to 2026-10-26 04:31 UTC (my arithmetic). The text still says self-service export is "Not available for ChatGPT Business, Enterprise, or ChatGPT for Healthcare workspaces". Wayback holds several readable copies. The new slug has HTTP 200 captures on 2026-06-22, 2026-07-25, 2026-08-31 and 2026-10-08, and the old slug has more. The 2026-09-12 copy (old slug) and the 2026-10-08 copy both carry `updatedAt` 1787662301, which is 2026-08-25 12:51 UTC (my arithmetic). Both already contain the Business, Enterprise and Healthcare exclusion and the warning to export before merging a personal workspace. A 2026-10-21 Wayback capture returned 403. So the content LK-19 relies on was live by 2026-08-25 at the latest, and no copy supports a 22 Oct update. V9 row 55's claim text stays verified. Only the date in LK-19 is wrong. The earlier captures answer when the exclusion first appeared. The 2026-06-22 capture already says "Not available for ChatGPT Business or Enterprise workspaces", with an update stamp of 2026-06-18. The Healthcare exclusion and the merge warning were added on 2026-08-25. Suggested LK-19 date: "Business and Enterprise exclusion since at least 2026-06-18, Healthcare and merge warning added 2026-08-25, page updated again 2026-10-26." Does not tell you: what changed in the 2026-10-26 edit.

**Netskope (V9R-07 to V9R-09).** The SF-75 page (netskope.com/resources/threat-labs-reports/netskope-ai-report-2026) returned HTTP 200 with the full report text on 2026-10-26. It is no longer serving the block page SOL2 met. `datePublished` 2026-07-28, `dateModified` 2026-08-04. The page says the move to managed apps "stopped around March 2026, plateaued". It gives 56% managed only, 14% both, 30% personal only. Upstream violations went from 44 to 69 per week. Downstream went from 12 to 31 per week. The data window is June 2025 to July 2026. All match SF-75. The SF-73 page (cloud-and-threat-report-2026) also returned 200 live, `datePublished` 2026-01-06. It shows personal app use falling "from 78% to 47%" and managed accounts rising from 25% to 62%. On 223, the report says two things. The summary says the "average organization seeing 223 incidents per month". The body says "an average of 3% of genAI users committing an average of 223" violations per month. SF-73 follows the body. The Infosecurity Magazine copy that V9 row 21 cites is dated 2026-01-07 and gives the same 47%. Rung 5 [vendor] for all. Does not tell you: how Netskope's customer base compares with firms that do not buy a security gateway. The data is customer telemetry, not a sample of all firms.

**Gartner 71% and 21% (V9R-10).** gartner.com returned 403 to curl. The browser pane opened the keynote release on 2026-10-26. It cites "a Q2 2026 Gartner survey of over 2,000 CIOs and technology executives". In it, 71% of organizations expect to deploy agentic AI within 12 months, and 21% have agentic AI governance capabilities in place. The Q3 2026 survey of 303 CIOs and IT risk leaders in the same release supports a different figure (25% align technology and business risk). This settles V9's base dispute. Page 1's "of organisations" matches the release. The tag "Analyst survey, Oct 2026" is the release date. The survey ran in Q2 2026, the same date shift as V9 row 4. Rung 5 [analyst]. Does not tell you: how "governance capabilities" was defined or asked.

**Page 1 row 23 (V9R-11).** No ledger row or source exists, so nothing could be reopened. The nearest opened figure is Netskope's "50% of organizations lack enforceable data protection policies for genAI apps" (SF-73). That is about policies, not about whether staff have an approved tool. The row stays unverified. Use V9's suggested fix or find a source with a share of firms that give no approved tool.

### 1.4 Ledger

| id | claim | URL | date | rung | opened | status |
|---|---|---|---|---|---|---|
| V9R-01 | Full Fact report one: page has no date. Sitemap lastmod 2026-10-16 | https://fullfact.org/ai-benchmark/report-one/ and https://fullfact.org/sitemap.xml | read 2026-10-26 | 2 | yes, curl | page undated |
| V9R-02 | First Wayback capture of the report 2026-10-15 07:07 UTC, same content | https://web.archive.org/web/20261015070716/https://fullfact.org/ai-benchmark/report-one/ | 2026-10-15 | 2 | yes, Wayback raw | verified |
| V9R-03 | Resultsense write-up "via The Independent", dated 2026-10-15 09:07 UTC | https://www.resultsense.com/news/2026-10-15-full-fact-chatbot-accuracy-ten-week-study/ | 2026-10-15 | 6 | yes, curl | verified, press |
| V9R-04 | OpenAI export page live: update stamp 2026-10-26 04:31 UTC. Export not available for Business, Enterprise or Healthcare workspaces | https://help.openai.com/en/articles/7260999-exporting-your-chatgpt-history-and-data | updated 2026-10-26 (04:31 UTC at A5 read, edited again 04:56 UTC) | 2 | yes, browser (curl 403) | content verified, LK-19 date wrong |
| V9R-05 | Wayback 2026-10-08: update stamp 2026-08-25, exclusion and merge warning already present | https://web.archive.org/web/20261008081201/https://help.openai.com/en/articles/7260999-exporting-your-chatgpt-history-and-data | 2026-10-08 capture | 2 | yes, Wayback | verified |
| V9R-06 | Wayback 2026-09-12 (old slug): same update stamp, exclusion present, "Updated: 18 days ago" | https://web.archive.org/web/20260912061616/https://help.openai.com/en/articles/7260999-how-do-i-export-my-chatgpt-history-and-data | 2026-09-12 capture | 2 | yes, Wayback | verified |
| V9R-07 | Netskope AI Report 2026: stall around March 2026, 56/14/30, upstream 44 to 69, downstream 12 to 31 per week, June 2025 to July 2026 | https://www.netskope.com/resources/threat-labs-reports/netskope-ai-report-2026 | 2026-07-28, modified 2026-08-04 | 5 | yes, curl live 2026-10-26 | verified [vendor] |
| V9R-08 | Netskope Cloud and Threat Report 2026: 78% to 47% personal, 25% to 62% managed, 223 framed two ways | https://www.netskope.com/resources/cloud-and-threat-reports/cloud-and-threat-report-2026 | 2026-01-06 | 5 | yes, curl live | verified [vendor] |
| V9R-09 | Infosecurity Magazine: 47% use personal accounts, 78% to 47% | https://www.infosecurity-magazine.com/news/personal-llm-accounts-drive-shadow/ | 2026-01-07 | 6 | yes, curl | verified, press on [vendor] data |
| V9R-10 | Gartner keynote: Q2 2026 survey of over 2,000 CIOs and tech executives, 71% expect agentic AI in 12 months, 21% have governance | https://www.gartner.com/en/newsroom/press-releases/2026-10-19-gartner-it-symposium-xpo-keynote-release-2026 | 2026-10-19 | 5 | yes, browser (curl 403) | numbers verified, tag date wrong (minor) [analyst] |
| V9R-11 | "Many firms give staff no approved tool" | none | none | 7 | no source exists | unverified |

## 2. SOL2 theme 6 rerun: "Models change under you"

### 2.1 What was missing

SOL2 says the shared web search budget ran out during theme 6. Its list of what was not searched is: Google Vertex deprecation policy changes in the window, Harmonic and Zscaler launches, and an independent shadow AI survey. The last two belong to theme 3 (data leaves your control), not theme 6, and were not searched here. This rerun covers the Vertex gap, the other cloud channel (Bedrock), tools that detect a silent change, and the contract terms SOL2 tells buyers to rely on.

### 2.2 Updated fix card

**Best fix today.** Keep SOL2's core: pin a snapshot ID and API version, keep a retirement register, and run per-example tests before any move. Add three things. (1) A scheduled black-box probe that checks the pinned endpoint still serves the same model, because a pinned ID can change behind the same name (SF-93, SF-189). (2) A written minimum notice period in the contract, because the standard terms opened here give none (SF-193, SF-194). (3) A register that records the channel, since the same model has different dates on the vendor API, Vertex and Bedrock (SF-185, SF-188).

**Who owns it.** Both. Vendor: lifecycle dates and notice. Buyer: the platform lead runs the probe and the register, procurement writes notice into the contract, and the cloud account owner watches Bedrock Legacy and inactivity rules.

**First step this month.** Add a "channel" and "earliest retirement" column to the register. On Vertex, list any short-term model (at least 45 days' notice) separately from 12-month models (SF-185). On Bedrock, check each model card for the Legacy period (6 months or 45 days) and keep at least light traffic on any Legacy model you still need, since access may go after 15 days of inactivity (SF-188).

**Effort.** Low for the register and contract clause. Medium for a probe: a fixed prompt set, a daily job and a statistical test. The methods are published (SF-189, SF-190) but need an engineer to wire them in.

**Maturity.**
- Lifecycle policy: generally available on all three clouds. Vertex (now Gemini Enterprise Agent Platform) keeps the models in its 12-month table "at least 12 months", while short-term models, GA ones included, get at least 45 days. It only moves dates later (SF-185). Bedrock gives a Legacy period of 6 months or 45 days (SF-188).
- Drift probes: research. Two peer-reviewed methods exist (SF-189 at ICLR 2025, SF-190 at ICLR 2026) and one demo system (SF-191). I found no generally available product page with measured results in this pass.
- Contract notice: available only by negotiation. The standard OpenAI agreement gives a right to leave after a material reduction, not a minimum notice before a model goes (SF-193).

**Evidence it works.**
- Best: Model Equality Testing detected distribution changes with a median power of 77.4% using about 10 samples per prompt. Applied to Summer 2024 APIs, 11 of 31 Llama endpoints served outputs that differed from Meta's reference weights (SF-189). Rung 1, independent of the sellers (Stanford authors). Does not tell you: anything about closed models from OpenAI, Anthropic or Google, or how often a change caused harm.
- Log probability tracking detected changes "as small as one step of fine-tuning" at about 1,000 times lower cost than earlier audits (SF-190). Rung 1, independent. Does not tell you: the false alarm rate in production, or what to do when an API does not return log probabilities.
- Counter-evidence: a Berkeley team found software-only detection "fundamentally unreliable" against subtle swaps, with log probability methods defeated by inference nondeterminism. They propose trusted hardware instead (SF-192). Rung 3 [preprint]. SF-190 came later and claims to handle nondeterminism. The two have not been tested against each other in one study that I found.
- Still missing: no study measures incidents avoided by probes, pinning or tests in a real firm. SOL2's flip-rate evidence (SF-102) remains the best case for per-example tests.

**Cost.** Pinning and the register: no direct cost. Probes: SF-190 needs one output token per check, so query cost is small. No absolute figure is published. Engineer time: not measured. Contract notice: negotiation time, not measured. Keeping a Legacy model warm on Bedrock costs whatever traffic you send.

**What it does not fix.**
- Retirement itself. Every date still comes. Vertex and Bedrock only promise a floor (SF-185, SF-188).
- Short notice on some routes. Vertex short-term models get at least 45 days (SF-185). Bedrock models with the short Legacy period get 45 days (SF-188). GPT-6.1 Sol on Bedrock follows OpenAI's own terms, so OpenAI's 92-day GPT-4 notice (SF-96) shows what that can mean (inference from SF-188 and SF-96).
- Changes the probe was not built to see. A probe flags a shift. It does not say whether the new behaviour is worse for your task. Per-example tests still do that.
- Chat products. Users of consumer and team chat apps cannot pin or probe. The vendor moves everyone at once (SF-98).
- Dates that differ by channel. Bedrock says its dates "may differ from dates published by model providers" (SF-188). A register keyed only on model name will be wrong.

**New in the window, 2026-09-25 to 2026-10-25.**
- 2026-10-20: Gemini 2.5 Pro, Flash and Flash-Lite retire on Vertex (SF-185). A 2026-04-02 release note had set 2026-10-16 (SF-186). The table now shows 2026-10-20, a 4-day extension (my reading of the two pages). That fits Google's "extend, never earlier" rule.
- No change to Vertex or Agent Platform deprecation policy found in the window. Agent Platform release notes from 2026-09-25 to 2026-10-21 list feature and model launches, not policy changes (SF-187). The last retirement change before the window was on 2026-09-14, when Gemini 2.5 Flash Image moved from 2026-10-02 to 2027-03-15.
- The Vertex AI documentation now says it "is no longer being updated" and points to Agent Platform (SF-186). Registers and monitoring that scrape the old Vertex pages will go stale.
- Just before the window: Bedrock's new lifecycle policy covers models launched on or after 2026-09-07 (SF-188).

Change to SOL2: add drift probes and channel-specific dates to the theme 6 fix. Keep "write minimum notice into the contract", now backed by the opened standard terms (SF-193, SF-194).

### 2.3 Ledger, continuing SOL2 (last id SF-184)

| id | claim | URL | date | rung | opened | flags |
|---|---|---|---|---|---|---|
| SF-185 | Agent Platform (ex Vertex) model lifecycle: Gemini models in the 12-month table available at least 12 months after release. Some GA models sit in the short-term table with at least 45 days' notice. Dates "may be extended" but never earlier. Short-term models get at least 45 days. Gemini 2.5 Pro, Flash, Flash-Lite retire 2026-10-20. gemini-3.6-flash released 2026-07-21, retires 2026-11-19 (121 days, my arithmetic) | https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/model-versions | updated 2026-10-23 | 2 | yes, curl | [vendor] |
| SF-186 | Vertex release note 2026-04-02: Gemini 2.5 retirement set to 2026-10-16. Vertex docs banner: "no longer being updated", moved to Agent Platform | https://cloud.google.com/vertex-ai/generative-ai/docs/release-notes | updated 2026-10-22 | 2 | yes, curl | [vendor] |
| SF-187 | Agent Platform release notes: 2026-09-14 Gemini 2.5 Flash Image retirement extended to 2027-03-15 from 2026-10-02. Window entries to 2026-10-21 show no lifecycle policy change | https://docs.cloud.google.com/gemini-enterprise-agent-platform/release-notes | updated 2026-10-22 | 2 | yes, curl | [vendor] |
| SF-188 | Bedrock lifecycle for models launched on or after 2026-09-07: Active, Legacy, EOL. Legacy period 6 months (most) or 45 days. Legacy blocks new customers, and existing ones may lose access after 15 days of inactivity. No new Provisioned Throughput. GPT-6.1 Sol follows OpenAI's terms. Bedrock dates may differ from provider dates | https://docs.aws.amazon.com/bedrock/latest/userguide/model-lifecycle.html | undated, read 2026-10-26 | 2 | yes, curl | [vendor] |
| SF-189 | Model Equality Testing: MMD test, 77.4% median power at about 10 samples per prompt. 11 of 31 commercial Llama endpoints (Summer 2024) served different distributions from reference weights | https://arxiv.org/abs/2410.20247 | 2024-10-26, v2 2025-04-08, ICLR 2025 | 1 | yes, abstract page | independent (Stanford) |
| SF-190 | Log probability tracking: one output token per check, detects one fine-tuning step, about 1,000x cheaper than prior audits. TinyChange benchmark | https://arxiv.org/abs/2512.03816 | 2025-12-03, v2 2026-02-27, ICLR 2026 | 1 | yes, abstract page | independent, needs log probabilities |
| SF-191 | Stability Monitor: black-box fingerprinting with energy distance and permutation tests. Detects family, version, inference stack and quantization changes in controlled tests. Sees provider-to-provider stability differences | https://arxiv.org/abs/2603.19022 | 2026-03-19 | 3 | yes, abstract page | [preprint], 4-page demo, no figures in abstract, independence not checked |
| SF-192 | Model substitution audit: software-only detection unreliable against subtle swaps, log probability methods defeated by nondeterminism. Proposes TEEs | https://arxiv.org/abs/2504.04715 | 2025-04-07, v2 2025-09-29 | 3 | yes, abstract page | [preprint], independent (Berkeley) |
| SF-193 | OpenAI Services Agreement 2.3: "OpenAI may update the Services periodically." Material reduction gives email notice and a right to terminate within five business days on 30 days' notice. Beta features excluded. No minimum notice before a model is removed in this clause | https://openai.com/policies/services-agreement/ | updated 2025-12-01 | 2 | yes, browser (curl 403) | [vendor] standard terms |
| SF-194 | Anthropic Commercial Terms: Anthropic may terminate for convenience on 30 days' notice. A text search for deprecation, discontinuation and modification found no model notice clause. Model notice sits in docs (SF-91) | https://www.anthropic.com/legal/commercial-terms | effective 2025-06-17 | 2 | yes, curl | [vendor] standard terms, negotiated terms not seen |

## 3. Lock-in gap sources

### 3.1 Gap 1: measured switching cost between frontier providers

**Status: partly filled, below the bar.** The bar in R7 8.9 is a rung 1 to 3 study with engineer-weeks or money. Nothing found meets it. One vendor-published case gives elapsed time and run-cost change for a move across providers.

- **InterWiz on the AWS partner blog (LK-45).** An AI recruiting firm moved from Azure OpenAI (GPT-4 Turbo) to Claude 3.5 Sonnet and Llama 3.3 70B on Bedrock. The move "followed a structured 3-month timeline". Cost per interview went from $0.25 to $0.025, and latency from 850 to 450 milliseconds, measured over 90 days after the move. The blog projects $27,000 a year saved at 10,000 interviews a month. Prompts had to be rewritten for each model. The CEO calls the move "a complex undertaking". Rung 5 [vendor] [self-report]: written by AWS and the partner that ran the job. Does not tell you: engineer count, engineer-weeks, the partner's fee, or how much of the 90% came from cheaper models rather than the move itself. The source was Azure OpenAI, not OpenAI direct.
- **Gartner on switching cost (LK-46).** The only Gartner note found that names switching cost is about SaaS, not LLMs. Abstract only, no figure. Rung 5 [analyst].
- **Developer write-up (LK-47).** A September 2026 post on moving a 35 KB system prompt from Claude Opus to self-hosted Ollama drew 140 points on Hacker News. The live page showed a WordPress error on 2026-10-26. The Wayback copy opened. A text search found no hours, days, weeks or dollar figure for the move. Rung 6 [self-report]. Does not tell you: any cost.
- Searched with nothing usable: Google Cloud customer stories for an OpenAI to Vertex move (only how-to guides and a partner story that did not start from OpenAI), and arXiv for a 2026 cross-provider effort study (only R7's LK-35, LK-36 and the AAAI soft-prompt paper again).

### 3.2 Gap 2: quantitative independent survey of AI buyers on lock-in

**Status: still open.** The best candidate, the fourth Bank of England and FCA survey, has not published. Results are expected by the end of 2026.

- **Bank of England letter to the Treasury Committee (LK-48).** Says "This year we will run the fourth edition" of the Bank and FCA AI survey. The AI Consortium has work on "concentration risks including from third-party model providers". Rung 2. Does not tell you: any finding yet.
- **Burges Salmon note (LK-49).** The 2026 survey was open until 31 July 2026, with results "anticipated by the end of the year". Rung 6 (law firm). I found no published results on the Bank of England site.
- **Third survey, 2024 (LK-50).** The top three providers held 73% of named cloud providers, 44% of model providers and 33% of data providers. A third of use cases were third-party, up from 17% in 2022. Rung 4. Does not tell you: anything about switching. A text search of the page found no switching question.
- **ECB speech, 2026-02-24 (LK-51).** Pedro Machado said more than 85% of large supervised banks use AI. Supervisory concerns about generative AI include "concentration risk, vendor lock-in" and exit strategies. Rung 2. Does not tell you: any share of banks that tried or failed to switch.
- **Dataiku and Harris Poll (LK-52).** 600 CIOs worldwide. 55% say they "have already switched LLMs at least once", mainly to cut cost. 81% expect to use two or more LLM providers in 2026. Rung 5 [vendor]: Dataiku sells a multi-model platform. The full report is gated and the method was not opened. Does not tell you: what switching cost, how long it took, or fieldwork dates.
- Searched with nothing usable: IDC and ETR multi-model surveys with method notes. None surfaced. EIOPA has no follow-up beyond R7's LK-32.

### 3.3 Gap 3: cloud commitment left unspent after moving AI work

**Status: still open.** Both R7 primaries are now opened in some form, and neither measures a shortfall or ties one to AI.

- **Gartner shortfall note, abstract (LK-53, supersedes LK-43).** Published 21 February 2026, analyst Domenico Scriva. Summary: hyperscalers "demand larger commitments", firms "miscalculate consumption, leading to shortfalls". Opened in the browser. Rung 5 [analyst], abstract only, full note paywalled. Does not tell you: any share or size of shortfall, or any link to AI.
- **Omdia release, syndicated copy (LK-54, supersedes LK-44).** BusinessWire still returned Access Denied in the browser, and Omdia's own page gave 403. The Intelligent CIO copy of 2025-10-07 opened. Omdia estimates "close to US$470 billion in cloud commitments" across AWS, Azure and Google Cloud. Nearly US$30 billion of new commitments came in Q2 2025. Customers are moving from using marketplace buys "to burn down unused commitments" to planned buying. Rung 5 [analyst]. Does not tell you: how much commitment goes unspent, or whether AI moves cause any of it.
- **Omdia piece hosted by Red Hat (LK-55).** Puts commitments at over US$500 billion and says many firms "can struggle to hit those commitments". 44% of enterprise customers plan to start or increase marketplace buying in 18 months. Rung 5 [analyst], sponsored by a marketplace seller. Does not tell you: a shortfall figure.
- **State of FinOps 2026 (LK-56).** 1,192 respondents, over $83 billion in cloud spend. 98% now manage AI spend. A text search of the report page found no question on unspent commitments. Rung 4, self-selected FinOps community sample. Does not tell you: anything about shortfalls.
- **Flexera 2026 State of the Cloud (LK-57).** 753 respondents from a panel, winter 2025. Estimated wasted cloud spend rose to 29%, ending a five-year fall. Fewer than half use any one commitment discount per provider. Rung 5 [vendor]: Flexera sells cost tools. Does not tell you: unspent commitment, or anything tied to AI moves. Waste here means idle or oversized resources as respondents estimate it.

### 3.4 Effect on R7 8.9

- Gap 1 stays rank 1. LK-45 is the first cross-provider case with elapsed time and money, but it is vendor-written and gives no engineer effort.
- Gap 2 stays open until the Bank of England and FCA publish, expected by end 2026. Recheck then.
- Gap 3 stays open. LK-43 and LK-44 move from rung 7 to rung 5 as LK-53 and LK-54, and neither has a shortfall number.

### 3.5 Ledger, continuing R7 (last id LK-44)

| id | claim | URL | date | rung | opened | flags |
|---|---|---|---|---|---|---|
| LK-45 | InterWiz: Azure OpenAI GPT-4 Turbo to Claude 3.5 Sonnet and Llama 3.3 70B on Bedrock. 3-month timeline. $0.25 to $0.025 per interview, 850 to 450 ms over 90 days. Projected $27,000 a year saved. Partner-led | https://aws.amazon.com/blogs/apn/how-interwiz-reduced-ai-costs-by-90-with-amazon-bedrock/ | 2026-07-02 | 5 | yes, curl | [vendor] [self-report], no engineer-weeks |
| LK-46 | Gartner "Escape SaaS Lock-In and Switching Costs With Negotiation Tactics": negotiate provisions for switching costs. SaaS, not LLM | https://www.gartner.com/en/documents/7594333 | 2026-03-14 | 5 | yes, browser, abstract only | [analyst] |
| LK-47 | Developer post on moving a 35 KB prompt from Claude Opus to self-hosted Ollama. 140 HN points. No time or money figure in the text | https://web.archive.org/web/20260914173607/https://patrickmccanna.net/notes-on-migrating-large-prompts-away-from-anthropic-openai-to-self-hosted-llms/ (HN: https://news.ycombinator.com/item?id=49697014) | 2026-09-14 | 6 | yes, Wayback (live page error) | [self-report] |
| LK-48 | Bank of England letter to TSC: fourth Bank and FCA AI survey runs in 2026. AI Consortium work on concentration risk from third-party model providers | https://www.bankofengland.co.uk/-/media/boe/files/letter/2026/response-to-tsc-inquiry-report-on-ai-in-financial-services.pdf | PDF created 2026-04-22 | 2 | yes, curl | regulator |
| LK-49 | Burges Salmon: 2026 AI survey open until 31 July 2026, results expected by end of year | https://www.burges-salmon.com/articles/102ndoq/keeping-an-eye-on-ai-in-financial-services-the-ai-survey | 2026-07-22 | 6 | yes, curl | law firm note |
| LK-50 | Bank and FCA 2024 survey: top three providers 73% cloud, 44% model, 33% data. A third of use cases third-party, from 17% in 2022. No switching question found | https://www.bankofengland.co.uk/report/2024/artificial-intelligence-in-uk-financial-services-2024 | 2024-11 (third survey) | 4 | yes, curl | regulator survey |
| LK-51 | ECB, Pedro Machado, 2026-02-24: over 85% of large supervised banks use AI. Concerns include concentration, vendor lock-in, exit strategies | https://www.bankingsupervision.europa.eu/press/speeches/date/2026/html/ssm.sp260224~6c5b64a77a.en.html | 2026-02-24 | 2 | yes, curl | supervisor speech, no switching figure |
| LK-52 | Dataiku and Harris Poll, 600 CIOs: 55% switched LLMs at least once, 81% expect two or more providers in 2026, 93% say models differ by use case | https://www.dataiku.com/blog/ai-switching-problem | 2026-04-16 | 5 | yes, curl, report gated | [vendor] |
| LK-53 | Gartner "Mitigate the Financial Burden of a Cloud Contract Shortfall", analyst Domenico Scriva: firms miscalculate consumption, leading to shortfalls. Replaces LK-43 | https://www.gartner.com/en/documents/7486489 | 2026-02-21 | 5 | yes, browser, abstract only | [analyst], no figure |
| LK-54 | Omdia via Intelligent CIO: close to US$470bn cloud commitments, nearly US$30bn new in Q2 2025, shift from burning down unused commitments to planned marketplace buys. Replaces LK-44 | https://www.intelligentcio.com/latam/2025/10/07/omdia-forecasts-us163bn-hyperscaler-cloud-marketplace-sales-by-2030/ | 2025-10-07 | 5 | yes, curl (BusinessWire and Omdia blocked) | [analyst], syndicated |
| LK-55 | Omdia for Red Hat: over US$500bn committed, many firms struggle to hit commitments, 44% plan more marketplace use | https://www.redhat.com/rhdc/managed-files/cl-omdia-hyperscalers-procurement-platform-analyst-material-3613126-202602-en.pdf | PDF created 2025-12-12 | 5 | yes, curl and PDF text | [analyst], vendor-sponsored |
| LK-56 | State of FinOps 2026: 1,192 respondents, $83bn+ spend, 98% manage AI spend. No unspent commitment question found | https://data.finops.org/ | 2026 | 4 | yes, curl | community survey |
| LK-57 | Flexera 2026: 753 respondents, winter 2025. Wasted cloud spend 29%. Fewer than half use any one commitment discount per provider | https://info.flexera.com/CM-REPORT-State-of-the-Cloud | 2026 | 5 | yes, curl | [vendor] |

## 4. Still open after this pass

- V9 Page 1 row 23 has no source. It needs one or a rewrite.
- No drift probe has a measured effect in a real firm. Both rung 1 results are lab or audit settings.
- Lock-in gaps 1, 2 and 3 stay open at the bar R7 set. Recheck gap 2 when the Bank of England and FCA publish, expected by end 2026.
- Not searched in this pass: the theme 3 items SOL2 also lists (Harmonic and Zscaler launches, an independent shadow AI survey).
