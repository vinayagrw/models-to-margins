# R7. Candidate theme 14: Vendor lock-in

Research date: 2026-10-25. Last-30-days window: 2026-09-25 to 2026-10-25.

Scope: switching costs between model providers, price or plan changes buyers cannot avoid, data and memory export limits, proprietary agent and tool formats, contract terms, concentration on one or two providers, and cloud-marketplace bundling. View: the enterprise buyer.

Not repeated here: "Models change under you", "Usage caps nobody can predict" and "Spend without proven return". Items that belong to those themes are listed in section 6 and left out of the score.

## 1. What the existing files already hold

Searched R1 to R4, V_R1_R3.md and V_R2_R4.md for lock-in, switching, portability, export, multi-model and concentration.

| Existing item | What it says | Use here |
|---|---|---|
| R2 #27 a16z [consulting] | 81% of 100 Global 2000 leaders use three or more model families. Authors say switching costs are rising. No switching rate measured | Context only, not re-counted |
| R2 #14, VR2-20 Ramp | 43.8% of Ramp businesses paid Anthropic, 39.8% OpenAI (August data) | Superseded by the October edition (LK-16) |
| R2 #26 Menlo [consulting] | Enterprise LLM API share: Anthropic 40%, OpenAI 27%, Google 21% | Context only |
| R2 #4 Gartner [forecast] | Over 80% of neocloud providers to stop operating independently by 2030 | Context only |
| R2 row 10 | LOCKIN ranked 10th of 16 R2 tags, evidence weight 3 | Shows the theme was seen but not scored |
| R1 #18, #58, VR1-15 | Users say they will switch or did switch provider after regressions | Belongs to "Models change under you" |
| R4, community.openai.com 1403213 | In-chat model switching removed | Belongs to "Models change under you" |

No existing file holds an export-limit item, a regulator action on AI concentration, or a contract-term item. Those gaps are filled below.

## 2. Findings by sub-topic

### 2.1 Switching costs between providers

- Stacklok surveyed 520 technical leaders at North American firms with 500+ staff in September 2026. 81% say switching-cost concerns already made them delay, scale back or restructure a migration. 57% estimate a move off their current provider would take four months or more. Only 8% use a single model provider [vendor] [self-report] (LK-01, LK-02).
- The hardest parts to move are integrations to internal systems or MCP servers (53%) and multi-step agent workflows (52%), not the model call itself [vendor] [self-report] (LK-01).
- Zapier polled 500 US enterprise executives. 89% believe they could switch within four weeks. Of the 66% who tried a migration, 58% say it failed or took much more effort than expected [vendor] [self-report] (LK-03). The Register reports the same survey as 542 executives (LK-04). The sample size is not settled.
- Measured: an arXiv study of 22,555 migration commits in 17,703 GitHub repos found only 8% of migrations switch provider. Model IDs are hard-coded in 94% of migrating apps. About 3% of migrations ran through an abstraction layer. Median change grows from 6 lines for prompt-only apps to 693 lines for fine-tuned apps (LK-08). The study covers retirement-driven migrations, so its timing findings belong to "Models change under you".
- Measured: the best HumanEval prompt for GPT-5 scores 99.39% on GPT-5 but 68.70% when moved to Llama-3.1-70B, against 79.47% for Llama's own best prompt. A GPT-4o prompt moved to o3 scores 92.27% against 98.37% achievable [consulting] (Accenture authors) (LK-09). Prompts do not port without rework.

### 2.2 Price and plan changes buyers cannot avoid

- In window: Google launched Gemini 4 Argon on 2026-09-30 at $2 input and $10 output per million tokens, with a footnote that $4 and $20 apply after the introductory period [vendor] (LK-18). The pricing page, updated 2026-10-22, sets the end date: $2 and $10 through 30 November 2026, $4 and $20 from 1 December 2026 [vendor] (LK-17). Teams that build on the launch price face a doubling 48 days after general availability on 2026-10-13.
- Before window: Microsoft's commercial price reset took effect 2026-07-01. Microsoft 365 E5 moved from $57 to $60. Copilot Business moved from $18 to $21. Copilot bundles became permanent SKUs at $23.50 and $32. Existing customers keep current prices until renewal, which defers the rise but does not avoid it (LK-25).
- Before window: The Register reports that Anthropic moved Claude Enterprise from fixed to usage-based pricing on 2026-04-15. The source is The Information, not opened. The cost estimate of "double or triple" for heavy users comes from unnamed experts (LK-04).
- IDC's September 2026 C-Suite Tech Survey puts unclear pricing models at 31% of buyer frustrations [analyst] (LK-05).

### 2.3 Data, memory and chat-history export limits

- OpenAI's help page, updated 2026-08-25 and edited again on 2026-10-26, says self-service export is "not available for ChatGPT Business, Enterprise, or ChatGPT for Healthcare workspaces". Users who merge a personal workspace into a managed one may lose access to earlier exports [vendor] (LK-19).
- The Register reports that Enterprise admins get conversation logs through the Compliance Platform, which keeps them 30 days unless archived elsewhere. A journalist built an unofficial tool to scrape his own Business chats. A 600-chat archive takes "a few hours" because OpenAI throttles requests [self-report] (LK-20).
- Claude: Team and Enterprise members can export their own chats only after an owner enables it. Uploaded file contents are not included. Exports cannot be imported into another personal account [vendor] (LK-21).
- Claude memory import from other providers works by pasting the output of a prompt. Anthropic calls it "experimental" and says Claude may not keep imported personal details. No structured memory format exists between vendors [vendor] (LK-22).
- 37% of Stacklok respondents worry they cannot export agent state, memory or evals. In financial services this is the top concern at 52% [vendor] (LK-01).
- Developer side: an open Claude Code request (opened 2026-07-02, comments to 2026-10-22) says sessions are local JSONL tied to absolute paths with no supported export or import [self-report] (LK-29). Third-party converters fill the gap.

### 2.4 Proprietary agent and tool formats

- Integrations and MCP servers (53%) and agent workflows (52%) are the hardest parts to move (LK-01). Among firms on five or more providers, 76% built such integrations, against 42% on one or two [vendor].
- Counter-signal: OpenAI released Agent Plugins on 2026-08-06 as an open packaging standard across ChatGPT, GitHub Copilot, Cursor and VS Code (LK-30). Whether Anthropic adopts it is not stated. Open protocols lower the format cost but not the workflow and eval cost.

### 2.5 Contract terms

- 30% of Zapier respondents say clearer pricing, features and contract terms would do most to reduce lock-in. 29% negotiate shorter contracts to keep leverage [vendor] (LK-03).
- A real contract case, not a frontier vendor: DK Law says AI phone vendor ConnexAI auto-renewed its contract from 2025-10-08 without the written notice New York law requires, then kept invoicing. ConnexAI rejects the claims. Two cases are open [allegation] (LK-28).
- Claude Platform on AWS: "Discounts cannot be applied retroactively" before a private offer is accepted [vendor] (LK-24).

### 2.6 Concentration on one or two providers

- Ramp, October 2026 edition (September data): 43.8% of Ramp businesses paid Anthropic and 40.6% paid OpenAI. Mistral is under 1% (LK-16).
- Cambridge CCAF 2026 global survey: OpenAI is the most-used foundation model provider, at 76% of financial industry firms. The top three clouds serve more than 80% of industry. Regulators are more concerned about concentration than industry, 43% against 28% (LK-06).
- In window: FSB final report, 2026-10-15. Sound Practice 12 asks firms to manage third-party AI concentration risk and build exit strategies. It names "substitutability, or lack thereof" of AI models as a risk factor (LK-13). FSB Secretary General John Schindler warned on 2026-10-21 that reliance on a few AI providers could let one disruption hit many firms at once (LK-14).
- In window: FCA chief Nikhil Rathi, 2026-10-22, listed concentration in a few hyperscale cloud and AI providers among AI threats. The wording is the reporter's, not a direct quote (LK-15).

### 2.7 Cloud-marketplace bundling

- Claude in Microsoft Foundry counts toward Microsoft Azure Consumption Commitments (MACC) [vendor] (LK-23). Claude Platform on AWS bills on one AWS invoice that "fully retires against existing commitments" [vendor] (LK-24).
- Mechanism, not a measured harm: pre-paid cloud commitments pull model spend toward whatever that cloud sells, so switching to a model outside the cloud can leave commitment unspent. No source measured this.
- In window: the CMA proposed on 2026-10-16 to designate Microsoft with strategic market status in business software. It will assess whether customers can "freely choose the best AI tools" and whether rival AI providers can compete with Copilot, and it names switching barriers as the source of Microsoft's strength. The final decision is due by February 2027. The same release reports AWS and Microsoft removed data transfer fees for customers changing cloud providers (LK-10).
- In window: TNW, citing Bloomberg, reported on 2026-10-02 that the European Commission plans to name AWS and Azure as DMA gatekeepers, decision expected November 2026. The Commission's preliminary view says the firms keep much new AI compute demand inside their own ecosystems (LK-12).

## 3. Score

Enterprise buyer view.

| Lens | Score | Why |
|---|---|---|
| Reports | 2 | Several surveys: Stacklok 520 [vendor], Zapier 500 [vendor], IDC [analyst] 34% name lock-in as a top frustration, CCAF on concentration (rung 4). Few complaint rows in R1. Not a top complaint, so not 3 |
| Impact | 2 | Work blocked and money at risk: 81% delayed or cut back migrations (LK-01), 58% of attempted migrations failed or overran (LK-03), unavoidable price resets and a scheduled doubling (LK-17, LK-25). No real case of legal action or harm tied to frontier lock-in. The CMA step is a regulator proposal, the ConnexAI suit is a small vendor [allegation] |
| Hidden harm | 2 | Often missed. Avoiding single-vendor dependence ranked last of eight buying criteria (LK-01). 89% think they can switch in four weeks while most attempts overran (LK-03). Model IDs hard-coded in 94% of apps (LK-08). Gartner names lock-in a CIO blind spot [analyst] (LK-07). Not missed by design |
| **Total** | **6 of 9** | Tier C on the S1 CIO re-score scale |
| Confidence | 2 | Primary records for regulator steps, prices and export rules. Survey base is mostly vendor and self-report. Switching cost is measured in lines of code and benchmark points, not money or weeks |

30-day verdict: **Worse.** New dated events in window: Gemini 4 Argon price doubling set for 1 December (2026-09-30, 2026-10-22), EU DMA cloud report (2026-10-02), Ramp concentration (2026-10-14), FSB concentration practice (2026-10-15), CMA Copilot and switching review (2026-10-16), IDC survey (2026-10-20), Stacklok survey write-up (2026-10-21). Caveat: these are regulator steps, surveys and a scheduled price rise. No new buyer-harm case was found in window.

Best dated item in window: **2026-10-16, CMA proposes strategic market status for Microsoft business software, citing switching barriers and reviewing whether rival AI providers can compete with Copilot (LK-10, rung 2).**

Segments: Enterprise (main), Developer. Consumer is minor (chat and memory export).

Journey stage: **Production.** Lock-in forms in pilots through hard-coded IDs and vendor tools, and is felt when a production workload must move or a renewal reprices.

Fix: keep model IDs in config behind a gateway, own the eval suite and prompts per model, keep logs and agent state in your own store, use open tool formats (MCP, Agent Plugins), and write exit terms into contracts: full export in a standard format, price-change notice, no silent auto-renewal, commitment drawdown that covers more than one model vendor.

Who acts, first step: **The CIO with procurement. At the next AI renewal, add an exit schedule (full chat, log and agent-state export in a standard format within 30 days, 90 days' notice of price or plan change, written notice before auto-renewal), and run a two-week drill that moves one production use case to a second provider on your own evals.**

## 4. Key figures

1. 81% of 520 technical leaders say switching costs made them delay, cut back or restructure a migration. 57% expect a move to take four months or more [vendor] [self-report] (LK-01).
2. 89% of executives believe they could switch AI vendor in four weeks, yet 58% of those who tried say it failed or took much more effort [vendor] [self-report] (LK-03).
3. Gemini 4 Argon API price doubles on 1 December 2026, from $2 and $10 to $4 and $20 per million tokens (LK-17, primary).

Measured backup: 8% of 22,555 migration commits switch provider, and 94% of migrating apps hard-code the model ID (LK-08).

## 5. Ledger

Rungs: 1 peer-reviewed or audited, 2 primary record, 3 independent measurement, 4 independent survey, 5 vendor or consulting survey, 6 press, 7 unopened.

| id | claim | URL | date | rung | opened | flags |
|---|---|---|---|---|---|---|
| LK-01 | Stacklok survey, 520 technical leaders, fielded by Dimensional Research, September 2026. 8% single provider, 81% delayed or restructured migrations over switching cost, 84% say avoiding lock-in matters, 53% integrations and MCP and 52% agent workflows hardest to move, 37% fear they cannot export agent state, memory or evals (52% in financial services), avoiding single-vendor dependence ranked last of eight criteria | https://stacklok.com/blog/the-model-is-easy-to-swap-the-agent-layer-isnt/ | 2026-10-13 | 5 | yes | [vendor] [self-report] |
| LK-02 | Same survey on the Stack Overflow blog, by Stacklok's CEO. 81% agree frontier labs and hyperscalers make it hard to move between vendors. 57% estimate four months or more to migrate | https://stackoverflow.blog/2026/10/21/survey-says-you-ll-swap-the-model-but-everything-you-build-around-it-is-staying-put/ | 2026-10-21 | 5 | yes | [vendor] [self-report] |
| LK-03 | Zapier survey, 500 US enterprise executives. 81% at least a little concerned, 29% very concerned. 47% say a key function would stop if the vendor went. 89% think they could switch in four weeks. 58% of attempted migrations failed or overran. 41% fear sudden price hikes. 30% want clearer contract terms | https://zapier.com/blog/ai-vendor-lock-in-survey/ | 2026-04-01 | 5 | yes | [vendor] [self-report] |
| LK-04 | Register opinion column. Reports Zapier sample as 542. Says Anthropic moved Claude Enterprise to usage-based pricing on 2026-04-15, citing The Information. Unnamed experts estimate double or triple cost for heavy users | https://www.theregister.com/software/2026/04/28/locked-stocked-and-losing-budget-ai-vendor-lock-in-bites/5229050 | 2026-04-28 | 6 | yes | opinion, second-hand |
| LK-05 | IDC September 2026 C-Suite Tech Survey: vendor lock-in concerns at 34% of buyer frustrations, tied with integration and transparency. Unclear pricing models 31%. Sample size not stated | https://www.idc.com/resource-center/blog/the-enterprise-ai-deal-has-changed-heres-what-vendors-need-to-prove/ | 2026-10-20 | 4 | yes | [analyst] |
| LK-06 | Cambridge CCAF 2026 Global AI in Financial Services: OpenAI used by 76% of industry, top three clouds serve over 80% of industry, regulators more concerned with concentration than industry (43% against 28%). 130 regulators, industry count not stated | https://www.jbs.cam.ac.uk/faculty-research/centres/alternative-finance/publications/2026-global-ai-in-financial-services-report/ | about 2026-04-28 (PDF name) | 4 | yes | none |
| LK-07 | Gartner names vendor lock-in among GenAI blind spots. Deep dependency can weaken negotiation power "on pricing, terms or service levels" | https://www.gartner.com/en/newsroom/press-releases/2025-11-19-gartner-identifies-critical-genai-blind-spots-that-cios-must-urgently-address0 | 2025-11-19 | 5 | yes (browser, plus reprint https://insurance-canada.ca/2025/12/23/gartner-critical-genai-blind-spots/) | [analyst] [forecast] |
| LK-08 | arXiv preprint, 22,555 commits in 17,703 repos. 8% of migrations switch provider, model IDs hard-coded in 94%, about 3% already used an abstraction layer, median 6 lines (prompt-only) to 693 lines (fine-tuned) | https://arxiv.org/html/2609.31288v1 | 2026-09-25 | 3 | yes | preprint, single author |
| LK-09 | PromptBridge preprint. GPT-5's best HumanEval prompt: 99.39% on GPT-5, 68.70% on Llama-3.1-70B (Llama's own best 79.47%). GPT-4o prompt on o3: 92.27% against 98.37% | https://arxiv.org/html/2512.01420v1 | 2025-12-01 | 3 | yes | [consulting] (Accenture authors), preprint |
| LK-10 | CMA proposes SMS designation for Microsoft business software. Strength "comes from the barriers customers face when switching". Will assess free choice of AI tools and rival AI providers against Copilot, security bundling and cloud licence portability. Final decision by February 2027. AWS and Microsoft removed data transfer fees for customers changing cloud | https://www.gov.uk/government/news/cma-takes-first-steps-to-ensure-choice-in-business-software | 2026-10-16 | 2 | yes | none |
| LK-11 | Consultation on the CMA proposal closes 13 November 2026 | https://www.computerweekly.com/news/366652472/CMA-to-decide-Microsoft-strategic-market-status-by-February-2027 | 2026-10 | 7 | no (403, search snippet only) | none |
| LK-12 | EU set to name AWS and Azure DMA gatekeepers, expected November 2026. Commission says the firms keep much new AI compute demand inside their ecosystems. Customers find switching costly | https://thenextweb.com/news/eu-set-to-name-aws-and-azure-dma-gatekeepers-in-november | 2026-10-02 | 6 | yes | relies on Bloomberg, not opened |
| LK-13 | FSB final report, 12 sound practices. Sound Practice 12 covers third-party AI concentration risk, business continuity and exit strategies. Lists "substitutability, or lack thereof" of AI models as a risk | https://www.fsb.org/uploads/P151026-1.pdf (release: https://www.fsb.org/2026/10/fsb-finalises-sound-practices-for-the-responsible-adoption-of-artificial-intelligence-ai/) | 2026-10-15 | 2 | yes | none |
| LK-14 | FSB Secretary General Schindler: reliance on a small number of AI providers or models could let one disruption hit many institutions | https://www.tokenpost.com/news/regulation/36630 | 2026-10-21 | 6 | yes | paraphrase, speech text not opened |
| LK-15 | FCA chief Rathi lists concentration in a few hyperscale cloud and AI providers among AI threats, cites a Google Cloud UK outage | https://www.techtimes.com/articles/329420/20261023/fca-chief-names-ai-greatest-ever-financial-crime-risk-uses-ai-stop-it.htm | 2026-10-22 (speech), 2026-10-23 (article) | 6 | yes | reporter wording |
| LK-16 | Ramp AI Index, September data: 43.8% paid Anthropic, 40.6% paid OpenAI, Mistral under 1%. Overall adoption 55.9% | https://ramp.com/data/ai-index-oct-2026 | 2026-10-14 | 3 | yes | Ramp customers only, sample not stated |
| LK-17 | Gemini API pricing page: Gemini 4 Argon $2 input and $10 output per million through 2026-11-30, $4 and $20 from 2026-12-01. Not on Free tier | https://ai.google.dev/gemini-api/docs/pricing | updated 2026-10-22 | 2 | yes | [vendor] |
| LK-18 | Gemini 4 Argon launch post. Introductory $2 and $10. Footnote: $4 and $20 apply after the introductory period | https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-4-argon/ | 2026-09-30 | 2 | yes | [vendor] |
| LK-19 | OpenAI help: self-service export not available for ChatGPT Business, Enterprise or Healthcare workspaces. Export personal data before merging into a managed workspace | https://help.openai.com/en/articles/7260999-how-do-i-export-my-chatgpt-history-and-data | updated 2026-08-25 (Wayback copies of 2026-09-12 and 2026-10-08). Business and Enterprise exclusion since at least 2026-06-18. Live page updated again 2026-10-26 (A5, V10b) | 2 | yes (browser) | [vendor] |
| LK-20 | Business user built a scraper to get his own chats. Compliance Platform keeps logs 30 days. 600 chats take "a few hours" | https://www.theregister.com/ai-and-ml/2026/07/23/openai-wont-let-some-customers-export-their-chats-but-this-tool-will/5277795 | 2026-07-23 | 6 | yes | [self-report] |
| LK-21 | Claude export: Team and Enterprise members export own chats only if an owner enables it. File contents excluded. No import into another personal account | https://support.claude.com/en/articles/9450526-how-can-i-export-my-claude-data | undated ("over a week ago") | 2 | yes | [vendor] |
| LK-22 | Claude memory import from other providers is prompt-based and "experimental" | https://support.claude.com/en/articles/12123587-import-and-export-your-memory-from-claude | undated ("yesterday") | 2 | yes | [vendor] |
| LK-23 | Claude in Microsoft Foundry is eligible for MACC and works with current Azure agreements and billing | https://www.anthropic.com/news/claude-in-microsoft-foundry | 2025-11-18 | 2 | yes | [vendor] |
| LK-24 | Claude Platform on AWS bills on one AWS invoice that "fully retires against existing commitments". Discounts not retroactive before a private offer is accepted | https://claude.com/blog/claude-platform-on-aws | 2026-05-11 | 2 | yes | [vendor] |
| LK-25 | Microsoft 365 commercial price reset 2026-07-01: E5 $57 to $60, Copilot Business $18 to $21, Copilot bundles permanent at $23.50 and $32. Existing customers keep prices until renewal | https://letsdatascience.com/news/microsoft-raises-microsoft-365-prices-while-bundling-copilot-42dc3b9a | 2026-07-02 | 6 | yes | Microsoft source cited, not opened |
| LK-26 | FTC staff report on AI partnerships flags potential to raise "contractual and technical switching costs" for AI developer partners | https://www.ftc.gov/news-events/news/press-releases/2025/01/ftc-issues-staff-report-ai-partnerships-investments-study | 2025-01-17 | 2 | yes | developer partners, not end buyers |
| LK-27 | X Corp opposes OpenAI summary judgment, argues the Apple and OpenAI deal is de facto exclusive | https://mlex.com/mlex/articles/2540794/x-corp-opposes-openai-motion-for-judgment-on-us-antitrust-claims | 2026-10 (search snippet) | 7 | no (connection refused) | [allegation] |
| LK-28 | DK Law says ConnexAI auto-renewed its AI phone contract without required notice and kept invoicing. ConnexAI rejects it. Cases open in California and New York | https://www.theregister.com/legal/2026/09/04/us-law-firm-accuses-uk-ai-software-firm-of-unwanted-contract-renewal-when-it-tried-to-leave/5293995 | 2026-09-04 | 6 | yes | [allegation], not a frontier vendor |
| LK-29 | Claude Code request: no supported session export or import, sessions tied to absolute paths. 7 comments, latest 2026-10-22 | https://github.com/anthropics/claude-code/issues/73639 | 2026-07-02 | 6 | yes | [self-report] |
| LK-30 | OpenAI Agent Plugins, an open packaging standard for skills and MCP configs across ChatGPT, GitHub Copilot, Cursor and VS Code | https://themodelwire.com/article/openai-launches-cross-platform-agent-plugin-standard-01KZBYT4XF2JSZWR7DPKMP2PQW | 2026-08-06 | 6 | yes | counter-evidence |

## 6. Left out because they belong to other themes

| Item | Belongs to |
|---|---|
| OpenAI halves the $200 Pro allowance and adds a $500 plan, 2026-09-29 (VR4-04) | Usage caps nobody can predict |
| Copilot included credits cut on Business and Enterprise, 2026-09-01 (VR3-35) | Usage caps nobody can predict |
| OpenAI shuts about 29 model IDs on 2026-10-23, Google gives 23 days' notice (VR1-25, VR3-29) | Models change under you |
| LK-08 timing finding: 82% of migrations away from retired models land after shutdown | Models change under you |
| Stacklok: 39% cite product or API deprecation as a concern | Models change under you |
| Users threaten to switch provider after regressions (R1 #18, #58, VR1-15) | Models change under you |
| IDC: 69% see a gap between AI spend and outcomes, 15% above 100% ROI. Ramp: 80% of OpenAI and Anthropic spend comes from 1% of firms | Spend without proven return |
| Claude Code 30-day transcript deletion (R1 #27) | Loses context and instructions |

## 7. Gaps

- No independent survey (rung 4) asks the lock-in question directly with a stated sample. IDC gives no sample size. CCAF covers concentration, not switching.
- No study measures switching cost in money or engineer-weeks. LK-08 counts lines of code. LK-09 counts benchmark points.
- No in-window case of a buyer harmed by a frontier vendor's lock-in, and no in-window lawsuit over an AI price or export term from a frontier vendor.
- Cloud-commitment lock-in (MACC, EDP) is a mechanism read from vendor pages. No source measures stranded commitments.
- Primaries not opened: Bloomberg on the EU DMA decision, The Information on Claude Enterprise pricing, the Microsoft licensing page, the FSB speech text, the X Corp filing, and the Computer Weekly consultation date.
- Reddit not reached. User complaints on moving chats and memory come from press and GitHub.

## 8. Addendum 2026-10-25: gaps filled

Scope: the five gaps in section 7. Every row below was opened on 2026-10-25 unless marked rung 7. Items already in sections 1 to 6 are not repeated. Quotes are under 15 words.

### 8.1 Gap 1: independent survey with a stated sample

Partly filled. Two regulator surveys and one regulator-commissioned study ask about switching or provider dependence. None is a quantitative survey of frontier AI buyers on lock-in.

- **EBA Risk Assessment Questionnaire, Autumn 2025 (LK-31).** 85 EU banks, answers received September 2025. Asked for their top 3 challenges in reducing AI third-party dependency, 42% chose "Technical difficulty to switch providers or move services in-house". Only transparency of models ranked higher (64%). Data security was 41%, keeping pace with third-party innovation 29%, cost 9%. 67% use third parties for AI to keep pace with innovation. Rung 4. Verified (chart read from the PDF). Does not tell you: which providers, whether the AI is generative or classic machine learning, or any switching attempt or outcome. Banks only.
- **EIOPA Gen AI survey (LK-32).** 347 insurers in 25 countries, fieldwork 8 May to 22 July 2025, published 2026-02-02. EIOPA concludes "high dependency on a reduced number of third-party Gen AI providers". Mitigation is mostly contract clauses, SLAs and testing. Some insurers build middleware to connect to several providers or run small models on premises to avoid dependence. Rung 4. Verified. Does not tell you: any percentage on switching, lock-in or provider count. The dependency finding is stated in words, not measured.
- **CMA-commissioned customer research by Jigsaw (LK-33).** 80 hour-long interviews with UK IT decision-makers, recruited from 11,217 Microsoft customers. Report dated September 2026, published with the 16 October 2026 documents. The main concern was "a sense of being "locked in" even though they recognised the many benefits". On AI assistants: Copilot Chat is commonly used, many are also testing Claude and ChatGPT. "Switching away from Copilot could increase IT workload and security risks." Some block AI assistants other than Copilot. Paid Copilot was called expensive, with a fear that cost "would continue to rise". Rung 4 [self-report]. Verified. Does not tell you: any share or count. The report says findings are "indicative of the market rather than representative". Microsoft customers only, UK only.

### 8.2 Gap 2: measured switching cost in money or time

Not filled for a move between providers. One case gives migration time within one provider. One case moves across providers but reports no time or money.

- **Tursio case study, arXiv (LK-35).** An enterprise search app moved GPT-4-32k to GPT-4.5-preview to GPT-4.1, all OpenAI. Old prompts passed 98% and 97.3% of regression tests on the new models. The first migration took "a couple of months end-to-end". With their framework it "reduces it down to a couple of weeks". Rung 3 [self-report] [vendor] (authors are Tursio staff), preprint. Verified. Does not tell you: engineer count, cost, or anything about a move to another provider. This is upgrade cost, closer to "Models change under you".
- **Verint case study, arXiv (LK-36).** A contact-center QA system with 5.3M chats a month moved off Claude 3 Haiku (end of life) and selected Nova 2 Lite and Qwen3-32B, so the move crossed providers. Manual, automated and DSPy prompt rewrites gave no statistically significant gain, and "the baseline prompt generalizes surprisingly well across models". The authors say migrations recur "roughly every 12 months". Rung 3 [self-report] [vendor], preprint. Verified. Does not tell you: hours, weeks or money. It is counter-evidence to LK-09 for one RAG task, not a general result.

### 8.3 Gap 3: unspent cloud commitment after moving AI workloads

Not filled. No source measures commitment left unspent because AI workloads moved.

- **Buyer-side negotiation firm, MACC guide (LK-37).** "Average shortfall on under-built MACCs we audited in 2025: 18% of contracted value." The firm cites a "500+ engagement dataset" and says 2026 is the first MACC cycle where AI capacity is a separate negotiation item. Rung 5 [consulting] [self-report]. Verified that the page shows the claim. Does not tell you: how many contracts the 18% covers, any method, or whether AI spend caused any shortfall. The firm sells negotiation services.
- **CMA roadmap, 16 October 2026 (LK-34).** Rival AI providers told the CMA that Microsoft's discounted bundling through E7 and Enterprise Agreements makes it hard for them to compete. This is the bundling side of the commitment mechanism in section 2.7, stated by rivals [allegation]. Rung 2. Verified. Does not tell you: any amount of unspent commitment.
- Not opened: a Gartner note found in search, "Mitigate the Financial Burden of a Cloud Contract Shortfall" (February 2026, bot check blocked it), and an Omdia release saying customers used marketplace buys to burn down unused commitments (403). Both are rung 7 (LK-43, LK-44).

### 8.4 Gap 4: dated buyer-harm case, 2026-09-25 to 2026-10-25

Not filled with a new case that starts in the window. One ongoing contract case has an in-window primary update, and one in-window regulator record adds customer evidence.

- **OpenAI winds down Cursor's model contract (LK-38, LK-39).** After SpaceX acquired Cursor, OpenAI gave notice on 2026-08-28 that it will end the contract, using a change-of-control right (LK-39, consulting summary). OpenAI's help page, updated about 2026-10-24, says "We have proposed a transition period of November 12, 2026." The termination date is still not confirmed. Cursor users can bring their own key, but not in Cursor Tab, Auto, Cloud or Background Agents, Automations, the CLI or the API. Cursor's CEO put OpenAI at about 5% of traffic (press, not opened). Rung 2 [vendor]. Verified. Does not tell you: what Cursor or its customers lose in money. The notice is dated before the window, so this is an ongoing case, not a new one.
- **CMA roadmap customer evidence (LK-34).** Customers worry about a high Copilot licence cost and future price rises. The CMA will check "whether they are felt because customers are unable to switch". Rung 2. Verified. This is a proposal stage record (LK-10 covers the press release), not a finding of harm.
- **CMA consumer probe of Microsoft 365 Copilot plans (LK-42).** The CMA blog of 2026-10-14 restates the probe opened 2026-07-27. No finding yet. The case page lists the next update by the end of 2026. Rung 2. Verified.

### 8.5 Gap 5: consumers unable to move chat history or memory

Not filled with measured data. No survey or test measures how many users fail to move chats or memory between assistants. Two new records sit next to the gap.

- **Gemini import help page (LK-40).** Import "isn't available if you sign in to a work, school, or supervised Google Account". It is also "currently not available in: The EEA, Switzerland, or the United Kingdom". Limits: .zip up to 5 GB, 5 files a day, up to a day to process. Export steps are given for ChatGPT and Claude. Rung 2 [vendor]. Verified. Does not tell you: how many users try or fail. With LK-19 and LK-21, all three large vendors now limit export or import for managed or regional accounts.
- **AI tool shutdown tracker (LK-41).** "61% gave users an export window (14 of 23 with a public notice that settles it)." So 9 of 23 closures with a clear notice gave no export. 42 shutdowns tracked since January 2023, updated 2026-10-10. Rung 5 [vendor] (run by an AI agent vendor, built from news it pulls each week). Verified that the page shows the claim. Does not tell you: anything about moving between live assistants, or user counts.

### 8.6 New ledger rows

| id | claim | URL | date | rung | opened | flags |
|---|---|---|---|---|---|---|
| LK-31 | EBA RAQ Autumn 2025, 85 banks. Top-3 challenges in reducing AI third-party dependency: transparency 64%, technical difficulty to switch providers or move in-house 42%, data security 41%, pace of innovation 29%, cost 9%. 67% use third parties to keep pace with innovation, 49% to cut cost | https://eba.europa.eu/sites/default/files/2025-12/063a8860-830a-49e6-9515-7003db629d89/RAQ%20Booklet%20graphs%20Autumn%202025.pdf | 2025-11-26 (PDF), answers September 2025 | 4 | yes (chart read from PDF) | regulator survey, all AI not only GenAI |
| LK-32 | EIOPA Gen AI survey, 347 insurers, 25 countries. "High dependency on a reduced number of third-party Gen AI providers". Mitigation by contracts, SLAs, testing, some multi-provider middleware | https://www.eiopa.europa.eu/document/download/bec886e2-dea0-4bbe-9624-d5f23f85700a_en?filename=EIOPA-BoS-25-679-GenAI-Report.pdf (release: https://www.eiopa.europa.eu/eiopa-survey-generative-ai-shows-swift-cautious-adoption-among-europes-insurers-2026-02-02_en) | 2026-02-02, fieldwork May to July 2025 | 4 | yes (PDF via curl) | no lock-in percentage |
| LK-33 | CMA-commissioned Jigsaw research, 80 interviews from 11,217 Microsoft customers. Main concern "locked in". Copilot switching barriers are IT workload and security. Some block other assistants. Copilot seen as expensive, fear of rising cost | https://assets.publishing.service.gov.uk/media/6ad0f8e6dfa45fcb6753ca97/_Customer_research__.pdf | September 2026 (report), PDF created 2026-10-15 | 4 | yes | [self-report], qualitative, no percentages |
| LK-34 | CMA SMS roadmap for Microsoft. Rivals say E7 and Enterprise Agreement discount bundling hurts AI rivals. Customers fear Copilot price rises. CMA will test if this is because they cannot switch | https://assets.publishing.service.gov.uk/media/6ad1d1e7a89985bb97026787/Roadmap_of_possible_interventions.pdf | 2026-10-16 | 2 | yes | rival claims are [allegation], proposal stage |
| LK-35 | Tursio: GPT-4-32k to GPT-4.5-preview to GPT-4.1. Old prompts pass 98% and 97.3% of tests. First migration a couple of months, cut to a couple of weeks with a framework | https://arxiv.org/abs/2507.05573v1 | 2025-07-09 | 3 | yes (PDF) | [self-report] [vendor], preprint, same provider |
| LK-36 | Verint: production QA system moved off Claude 3 Haiku to Nova 2 Lite and Qwen3-32B. Prompt rewrites gave no significant gain over the baseline prompt. Migrations recur about every 12 months. No time or money given | https://arxiv.org/abs/2604.27082 | 2026-04-29 | 3 | yes (PDF) | [self-report] [vendor], preprint |
| LK-37 | Negotiation firm: average shortfall on under-built MACCs audited in 2025 was 18% of contracted value, from a 500+ engagement dataset. 2026 is the first MACC cycle with AI capacity as a separate item | https://microsoftnegotiations.com/guides/microsoft-azure-macc-negotiation | undated (copyright 2016 to 2026) | 5 | yes | [consulting] [self-report], not AI-specific |
| LK-38 | OpenAI help: wind-down of the Cursor contract, proposed transition to 2026-11-12, date not confirmed. Bring-your-own-key not supported in Tab, Auto, Cloud or Background Agents, Automations, CLI, API or SDK | https://help.openai.com/en/articles/20001506-using-openai-models-in-cursor | updated about 2026-10-24 | 2 | yes (browser) | [vendor] |
| LK-39 | Cutoff ledger: OpenAI notice to SpaceX on 2026-08-28 using a change-of-control right. Earlier cutoffs: Windsurf (June 2025, under five days' notice, per Windsurf), OpenAI by Anthropic (July 2025), OpenCode (January 2026) | https://www.digitalapplied.com/blog/ai-model-supply-cutoffs-ledger | 2026-08-28 | 6 | yes | [consulting], second-hand |
| LK-40 | Gemini import: personal accounts only, not work, school or supervised accounts. Not in EEA, Switzerland or UK. .zip up to 5 GB, 5 a day | https://support.google.com/gemini/answer/16868299 | undated (copyright 2026) | 2 | yes | [vendor] |
| LK-41 | AI tool shutdown tracker: 14 of 23 closures with a clear notice (61%) gave an export window. 42 shutdowns since January 2023 | https://gravity.fast/data/ai-tool-shutdown-tracker/ | updated 2026-10-10 | 5 | yes | [vendor], automated news pull |
| LK-42 | CMA blog: Microsoft consumer probe on Copilot plan changes, opened July 2026, no finding yet. Case page: next update by end of 2026 | https://competitionandmarkets.blog.gov.uk/2026/10/14/direct-consumer-enforcement-18-months-on/ (case: https://www.gov.uk/cma-cases/microsoft-consumer-protection-enforcement-case) | 2026-10-14 | 2 | yes | no finding |
| LK-43 | Gartner note "Mitigate the Financial Burden of a Cloud Contract Shortfall": firms miscalculate consumption, leading to shortfalls | https://www.gartner.com/en/documents/7486489 | February 2026 (search snippet) | 7 | no (bot check, Wayback rate-limited) | [analyst] |
| LK-44 | Omdia: customers moving from using marketplace buys to burn down unused commitments to planned marketplace buying | https://www.businesswire.com/news/home/20251006925215/en/ | 2025-10-06 | 7 | no (403, search snippet only) | [analyst] |

### 8.7 Where I looked and found nothing usable

- Gap 1: Gartner, IDC, 451 Research, ETR and Foundry pages for a 2025 or 2026 multi-model or switching survey with a sample. The Bank of England and FCA fourth AI survey is announced for 2026 but not found published. arXiv for practitioner surveys on provider choice. The Parallels survey (540 IT staff, 94% fear lock-in) covers cloud and end-user computing, not AI, and is a vendor survey.
- Gap 2: AWS, Google Cloud and partner case studies on OpenAI to Bedrock or Vertex moves (partner pages promise "four to five weeks" but no customer measured it). Engineering blogs. The AAAI 2026 paper "Don't Start Over" cuts compute for moving personalized soft prompts "up to 98%", but measures compute, not engineer time, and does not cover API providers.
- Gap 3: FinOps Foundation State of FinOps 2026, Flexera 2026, Harness 2026, Tackle 2025, Directions on Microsoft (2026-06-15, says the commitment is owed whether or not capacity arrives, with no AI data).
- Gap 4: ACCC v Microsoft (filed 2025-10-27, no judgment found), Italy AGCM case PS13129 on Copilot pricing (opened 2026-06-26, no outcome found), EU WhatsApp interim measures (2026-06-09, outside window), Anthropic Max plan class action (June 2026, consumer usage limits, belongs to "Usage caps nobody can predict"), Nextgov column of October 2026 (opinion), The Register on forward deployed engineers (2026-10-22, a Gartner warning, not a case), noyb and data protection authorities on chatbot portability.
- Gap 5: Pew, YouGov, Consumer Reports, Data Transfer Initiative, and tests of Claude and Gemini memory import. Only how-to guides and vendor blogs, no measurement.

### 8.8 Gaps still open

- No quantitative independent survey asks frontier AI buyers about lock-in or switching. The best rung 4 items are a bank survey covering all AI (LK-31) and qualitative interviews (LK-33).
- No measured money or engineer-weeks for moving between frontier providers. The only time figure is within one provider (LK-35).
- No measure of cloud commitment stranded by moving AI workloads. The 18% MACC shortfall (LK-37) is consulting self-report and not tied to AI.
- No new buyer-harm case that starts inside 2026-09-25 to 2026-10-25. The Cursor cutoff (LK-38) began 2026-08-28 and its end date is unconfirmed. The Microsoft consumer cases in Australia, the UK and Italy have no outcome yet.
- No measured consumer data on failed chat or memory transfers. Vendor pages show the limits (LK-19, LK-21, LK-22, LK-40) but not how many people hit them.
- Primaries still not opened: the Gartner shortfall note (LK-43), the Omdia release (LK-44), the OpenAI announcement on Cursor and Cursor's response, plus those listed in section 7.

Effect on section 3: none proposed. LK-31 and LK-33 add rung 4 support to Reports. LK-36 weakens the prompt-porting cost in LK-09 for one task. The confidence note in section 3 still holds, since switching cost is still not measured in money or weeks.

### 8.9 Open gaps ranked, 2026-10-25

Ranked by how much each gap weakens a board decision on lock-in. Sources named here are leads to open, not evidence yet.

| Rank | Gap | Severity | Why it matters | Evidence that would close it | Named sources to look for |
|---|---|---|---|---|---|
| 1 | No measured switching cost in money or engineer-weeks between frontier providers. LK-35 is within one provider | High | A board cannot weigh exit terms against the cost of leaving without it. The theme 14 confidence note rests on this gap | A rung 1 to 3 case or study of a measured move between two providers, with engineer-weeks or money and the scope moved | AWS and Google Cloud customer case studies on OpenAI to Bedrock or Vertex moves with customer-stated figures. Engineering post-mortems on company blogs. Gartner research on LLM switching cost. arXiv practitioner studies after "Don't Start Over" (AAAI 2026) |
| 2 | No quantitative independent survey of frontier AI buyers on lock-in. The best are EBA banks (LK-31) and CMA interviews (LK-33) | Medium-high | Reports scoring leans on sector regulators and qualitative work, so the finding generalises only so far | A rung 4 survey of AI buyers with a stated sample, asking about switching or dependence | Bank of England and FCA fourth AI survey (announced for 2026). EIOPA or ECB follow-up surveys. IDC or ETR multi-model surveys with method notes. Stanford AI Index 2027 enterprise chapter |
| 3 | No measure of cloud commitment left unspent after moving AI work. The 18% MACC shortfall (LK-37) is consulting self-report and not tied to AI | Medium | One cost mechanism inside lock-in, mainly for buyers with large cloud commitments | A dated shortfall figure linked to AI workloads, with a sample | Gartner "Mitigate the Financial Burden of a Cloud Contract Shortfall" (LK-43). Omdia marketplace burn-down release (LK-44). FinOps Foundation State of FinOps 2027. Flexera State of the Cloud 2027 |

## 9. Corrections from V7 (2026-10-25)

Applied in the research doc. Earlier sections above are kept as written.
- 2.1d: the Zapier sample is 542 (method note, fielded 30 Jan to 6 Feb 2026). 500 was a rounded figure.
- 2.2a: Gemini 4 Argon was announced on 2026-09-30 to trusted cyber defenders, not launched to all.
- 2.2c: general availability 2026-10-13 to the 2026-12-01 price change is 49 days, not 48. Source: https://ai.google.dev/gemini-api/docs/changelog
- 4.1: the 57% figure comes from LK-02.
- 4.4: 8% is a share of migrations in a study of 22,555 commits, not of all commits.
- LK-11: the consultation closing date, 13 November 2026, is confirmed on gov.uk (rung 2).
- LK-25: Microsoft's own page excludes Copilot SKUs from the July 2026 price update, so the Copilot Business move rests on press only.

