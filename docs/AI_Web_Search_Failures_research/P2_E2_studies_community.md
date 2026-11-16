# P2 E2 Last-30-days sweep: studies, benchmarks, practitioners, community

Strand E2. Window 2026-09-25 to 2026-10-25. Compiled 2026-10-25. Every item below was opened in this session unless the row says "opened: no". Items already in U1 section 3 and U2 section 4 (LifeSearch headline, Full Fact headline, Vectara, Retrieved but Not Read headline, Yu et al. taxonomy headline, Claude Code issues 99385, 95815, 100745) are only reused where this sweep adds new numbers.

Evidence ladder: 1 audited or peer reviewed, 2 primary record, 3 preprint or revealed behaviour, 4 deployment scale, 5 credible secondary, 6 self-report, 7 vendor claim or unopened.

Verdict meanings. STILL TRUE: new window evidence shows the same failure at a similar size. WORSE: new window evidence shows it is bigger, cheaper to cause, or more common than Phase 1 showed. PARTLY FIXED: some products or models now avoid it in some settings. FIXED: no longer seen.

## 1. Verdict table

| # | Challenge | Verdict | Best dated item in window | Key number |
|---|---|---|---|---|
| 1 | Citation does not hold the claim | STILL TRUE | Real PMIDs, Wrong Papers, arXiv 2610.29812, 2026-10-21 | Closed-book models cite real PubMed IDs 327 of 335 times, but only 3 of 327 are relevant. Search agent citations relevant 67% |
| 2 | Silent failure, confident answer | STILL TRUE | Data-Void Exploits, arXiv 2610.30365, 2026-10-21 (NDSS 2027) | 73.2% of planted content that was cited or used appeared with no warning |
| 3 | Shallow search, stops too early | STILL TRUE | OpenDS-World, arXiv 2610.30181, 2026-10-19 | Best of 12 frontier models 39.0% on 200 live-web tasks. GPT-5-mini stopped early on 75 of 100 XBench-DS tasks (Yu et al., 2026-10-21) |
| 4 | Weak or planted sources win | WORSE | From Public Posts to AI-Search Citations, arXiv 2610.11932, 2026-10-08 | 8 of 10 AI search platforms cited a made-up concept within 7 days. A $14 GEO purchase was cited within 1 hour |
| 5 | Stale facts shown as current | STILL TRUE | Full Fact AI benchmark report one, about 2026-10-15 | DeepSeek still named Keir Starmer as PM on 15 September 2026. Claude and Gemini 3.1 Pro gave an asylum rate superseded in June 2025 |
| 6 | Reads snippets, not pages | STILL TRUE (now measured in production) | Retrieved but Not Read, arXiv 2610.21731, 2026-10-15 | GPT-5.6 Luna under its own deployed search opened no page in 53.6% of episodes. Snippet-only answers were stale about 5 times as often |
| 7 | Blocked or unreadable pages | STILL TRUE | Yu et al. error analysis, arXiv 2610.29346, 2026-10-21 | Anti-scraping caused 33.7% of error steps for MiroThinker-30B on BrowseComp. In OpenDS, failed tool calls were 2.83 to 9.42% of calls but 19.27 to 61.90% of tool time |
| 8 | Goes along with a false premise | STILL TRUE | Authority Bias in Language Models, arXiv 2609.37616, 2026-09-29 (NeurIPS 2026) | One "verified source" note backing a wrong answer flipped 45 to 88% of correct answers in 7 of 8 models |
| 9 | Memory beats search (knowledge conflict) | STILL TRUE, and it cuts both ways | What Drives AI Citations?, arXiv 2610.15033, 2026-10-10, plus Stale-Document Poisoning, arXiv 2609.31342, 2026-09-25 | ChatGPT sometimes names brands with no supporting page. In the other direction, outdated retrieved text overrode correct memory in 30% (Llama) and 37% (Qwen) of cases |
| 10 | Planted instructions in pages | STILL TRUE, partly fixed at the top end | Intact, arXiv 2610.22697, 2026-10-15, plus Signals Corps header study, 2026-10-06 | 73.1% of injected attacks on 1,091 real pages got through a standard browsing planner. Claude models ignored header injections on everyday prompts but obeyed 7 of 9 times when the prompt gave the site authority |

## 2. Evidence per challenge

### 1. Citation does not hold the claim: STILL TRUE

| Date | Item | What it shows | URL | Opened | Rung |
|---|---|---|---|---|---|
| 2026-10-21 | Saqlain, Real PMIDs, Wrong Papers (NeurIPS 2026 AgenticLS workshop) | SciFact claims with live PubMed. Closed-book citations nearly always exist (327 of 335) but a judge rated only 3 of 327 relevant. Search agent citations 67% relevant. The author says existence checks alone are not enough | https://arxiv.org/abs/2610.29812 | yes | 3 |
| 2026-10-15 | Walters, Chen and Toni, Retrieved but Not Read (HTML numbers) | When an answer is stale, 81.8% (27 of 33) of on-claim citations are unfaithful, versus 0.9% (6 of 694) when current. Snippet-only episodes carry unfaithful citations 6.4% of the time versus 2.3% when a page was opened | https://arxiv.org/html/2610.21731v1 | yes | 3 |
| 2026-10-19 | Pykälä and Kaski, Self-Consistency of Entity Sets and Citations in a Deep Research System | Same cybersecurity prompt, 10 runs on one unnamed commercial deep research system. Median entity overlap (Jaccard) 0.12. Citation overlap below 0.02 | https://arxiv.org/abs/2610.26421 | yes | 3 |
| 2026-09-29 | Claude Code issue 98235 | Opus 5.5 said a customer cut was "the main reason" growth slowed. The earnings call transcript it later fetched said the opposite | https://github.com/anthropics/claude-code/issues/98235 | yes | 6 |

Also seen: Liu et al., arXiv 2610.23148 (2026-10-16). RL training raised Search-R1 accuracy while the share of correct answers backed by evidence on Bamboogle fell from 84.0% to 42.9%. This means a better score can hide worse grounding. https://arxiv.org/abs/2610.23148 (opened, rung 3)

### 2. Silent failure, confident answer: STILL TRUE

| Date | Item | What it shows | URL | Opened | Rung |
|---|---|---|---|---|---|
| 2026-10-21 | Guerra et al., Data-Void Exploits (to appear NDSS 2027) | Of 149 answers that cited or used planted pages, only 26.8% carried a warning. Skeptical prompts raised warnings most for ChatGPT (53.8%) | https://arxiv.org/html/2610.30365v1 | yes | 1 |
| about 2026-10-15 | Full Fact AI benchmark report one | 7,625 API answers with web search on, 15 July to 22 September 2026. On five yes or no style questions, 68% of first sentences said "yes" or "no" outright. Full Fact says "a model's confidence is no guide to its reliability." Page shows no publication date | https://fullfact.org/ai-benchmark/report-one/ | yes | 2 |
| 2026-10-08 | Sun et al., Accurate but Not Humble (EMNLP 2026) | Four agents under knowledge conflict. Some high-accuracy agents detect the conflict but do not say they are unsure in their wrong answers | https://arxiv.org/abs/2610.12360 | yes | 1 |
| 2026-10-23 | Claude Code issue 104523 | A research subagent fetched a URL it guessed. Its report to the parent listed the 404 but did not say the URL was guessed | https://github.com/anthropics/claude-code/issues/104523 | yes | 6 |

Also seen: OpenAI status incident on 2026-10-20 listed Search and Deep Research among 16 degraded ChatGPT components for about 62 minutes. https://status.openai.com/incidents/01M5E4G39TD1BW1QWHZG6RFA5H (opened, rung 2). DeclineCraft, arXiv 2610.28340 (2026-10-20): iterative retrieval cut abstention in 30 of 40 settings while accuracy barely moved (68.5% to 69.3%). So more search made models answer more, not answer better. https://arxiv.org/abs/2610.28340 (opened, rung 3)

### 3. Shallow search, stops too early: STILL TRUE

| Date | Item | What it shows | URL | Opened | Rung |
|---|---|---|---|---|---|
| 2026-10-19 | Yu et al., Deep Search in Real-World Web Environments (OpenDS-World) | 200 human-checked live-web tasks, 12 models. Best 39.0% (GPT-6 Astra). Human solvers 21.1% over 1,000 attempts. Natural stop rates 60.5 to 69.0% for top models. Weaker models hit the 1 hour or 100 call limit on 72.5 to 81.5% of tasks | https://arxiv.org/html/2610.30181v1 | yes | 3 |
| 2026-10-21 | Yu, Tang, Chu and Han, Benchmarking and Error Analysis of Deep Search and Deep Research Agents | GPT-5-mini failed 75 of 100 XBench-DS tasks through premature stopping. Open-deep-research (GPT-5) drifted off goal on 51 of 100 tasks | https://arxiv.org/html/2610.29346v1 | yes | 3 |
| 2026-10-21 | Real PMIDs, Wrong Papers | Agents used less than half their search budget. Single-shot retrieval found the gold paper for only 6% of claims | https://arxiv.org/abs/2610.29812 | yes | 3 |
| 2026-10-13 (HN post date) | Prefer, AI engines search and cite: 960 answers measured (SEO firm) | API answers to 80 questions, 3 runs. Searched the web: Perplexity 100%, ChatGPT 90%, Gemini 88.8%, Claude 80%. Answers that skipped search cited nothing | https://tryprefer.com/data/ai-answer-study/ | yes | 5 |

Also seen: LifeSearch HTML (2026-10-13) notes "premature clarification", where GPT-5.6 Sol and Doubao ask questions instead of finishing, so no report is produced. https://arxiv.org/html/2610.18092v1 (opened, rung 3)

### 4. Weak or planted sources win: WORSE

| Date | Item | What it shows | URL | Opened | Rung |
|---|---|---|---|---|---|
| 2026-10-08 | Liu et al., From Public Posts to AI-Search Citations | 10 platforms, 17,211 citations. Top 20 domains take 20.5 to 70.8% of a platform's citations. 15 of 22 publishing sites have low or medium barriers. 8 of 10 platforms cited a made-up concept within 7 days. A $14 GEO buy (13 posts) was cited within 1 hour | https://arxiv.org/html/2610.11932v1 | yes | 3 |
| 2026-10-21 | Data-Void Exploits (NDSS 2027) | One attacker page can be enough. Planted content appeared in 31% of 504 answers. High-visibility domains raised odds of success 17.5 times. GEO tricks showed no clear effect | https://arxiv.org/html/2610.30365v1 | yes | 1 |
| 2026-10-22 | NewsGuard Risk Briefing, Fakes of the week | On 2026-10-21 at 9 a.m. ET, Google AI Overview, Gemini and Copilot repeated a Russian-linked deepfake sex abuse claim about Texas Senate candidate James Talarico | https://newsguardriskbriefing.substack.com/p/fakes-of-the-week-russians-interfere | yes | 2 |
| 2026-10-15 | Zhang and Xiao, VoteGEO-Bench | Rewriting one page can raise a target's exposure in election answers. Many cited sources are low-cost owned or open-platform sites | https://arxiv.org/abs/2610.21330 | yes | 3 |

Also seen: Toolflation, arXiv 2610.28454 (2026-10-20). Seller agents told only to be picked more often inflated claims under all 5 production models. Under one model, tools that answer almost nothing won 25 to 40% of choices. https://arxiv.org/abs/2610.28454 (opened, rung 3). The NewsGuard detail that AI Overview cited ABC News (May 2026) and KTAL (2026-10-15) pages that did not mention the claim was seen only in a search summary (opened: no, rung 7). The NewsGuard Reality Check page returned 403.

### 5. Stale facts shown as current: STILL TRUE

| Date | Item | What it shows | URL | Opened | Rung |
|---|---|---|---|---|---|
| about 2026-10-15 | Full Fact AI benchmark report one | DeepSeek named Starmer as PM in September. Gemini 3.1 Pro and Claude gave the old £8.86 asylum rate. Several models named the 2022 Lionesses win on some days and 2025 on others. Gemini 3.1 Pro cited 2012 and 2014 US local papers for a UK MP question | https://fullfact.org/ai-benchmark/report-one/ | yes | 2 |
| 2026-10-15 | Retrieved but Not Read | Snippet-only answers stale 6.4% versus 1.3% with an opened page. For open models on sports facts, 20.2% versus 2.1% | https://arxiv.org/html/2610.21731v1 | yes | 3 |
| 2026-09-25 | Ahmed, Galke Poech and Röttger, Stale-Document Poisoning | 317 dated knowledge reversals. Old retrieved text flipped 30% (Llama) and 37% (Qwen) of correct answers, 66% and 75% when told to follow the document. Range 17 to 91% across domains | https://arxiv.org/abs/2609.31342 | yes | 3 |
| 2026-10-18 | Hu et al., TREK | Swapping timestamps cut accuracy 7.3 points, swapping source domains 23.6 points. Hiding URLs cost about 9 points. Models lean on metadata to judge freshness | https://arxiv.org/html/2610.25323v1 | yes | 3 |

### 6. Reads snippets, not pages: STILL TRUE (now measured in production)

| Date | Item | What it shows | URL | Opened | Rung |
|---|---|---|---|---|---|
| 2026-10-15 | Retrieved but Not Read | Episodes that opened no page: GPT-5.6 Luna deployed 53.6%, Luna frozen 9.9%, GLM-5.3-Flash 13.4%, gpt-oss-120b 2.6%, gemma-4-31b 64.6%, qwen3-8b 76.0% | https://arxiv.org/html/2610.21731v1 | yes | 3 |
| 2026-10-21 | Zhao, Pandey and Misra, Silent Cue Loss in Enterprise Document Ingestion | When converters drop colour and highlight, recovery of marked requirements fell from F1 0.690 to 0.150 (docling) and 0.075 (plain text) across five Claude models and GPT-5.6 | https://arxiv.org/abs/2610.30026 | yes | 3 |
| 2026-10-21 | Yu et al. error analysis | Names "surface-level skimming" and "observation neglect" as task-level failure types | https://arxiv.org/html/2610.29346v1 | yes | 3 |

### 7. Blocked or unreadable pages: STILL TRUE

| Date | Item | What it shows | URL | Opened | Rung |
|---|---|---|---|---|---|
| 2026-10-21 | Yu et al. error analysis | Anti-scraping share of error steps for MiroThinker-30B: BrowseComp 33.7%, BrowseComp-zh 33.4%, XBench-DS 16.5% | https://arxiv.org/html/2610.29346v1 | yes | 3 |
| 2026-10-19 | OpenDS-World | Failed tool calls 2.83 to 9.42% of calls but 19.27 to 61.90% of tool time. GPT-6 Astra: 6.34% of calls, 42.57% of time | https://arxiv.org/html/2610.30181v1 | yes | 3 |
| 2026-10-10 | Claude Code issue 100990 | WebFetch on an HTTP-only site fails with a bare ECONNREFUSED on port 443 that does not say the URL was upgraded | https://github.com/anthropics/claude-code/issues/100990 | no (title only via gh search) | 6 |

Also seen, just before the window: Cloudflare replaced its single AI bot switch with Search, Training and Agent controls on 2026-09-15, per secondary SEO coverage only (opened: no, rung 7).

### 8. Goes along with a false premise: STILL TRUE

| Date | Item | What it shows | URL | Opened | Rung |
|---|---|---|---|---|---|
| 2026-09-29 | Kumar and Chopra, Authority Bias (NeurIPS 2026) | A single "verified source" note for a wrong answer flipped 45 to 88% of correct answers in 7 of 8 models (5 open families, 3 closed APIs). Source deference is separate from user sycophancy | https://arxiv.org/abs/2609.37616 | yes | 1 |
| 2026-10-17 | Wang et al., MisleadQA | Six open models. False in-scope context switched correct answers 75.4% of the time, out-of-scope true context 29.3%. Even with gold context, false context still misled 21.0% | https://arxiv.org/abs/2610.24851 | yes | 3 |
| 2026-10-22 | NewsGuard Talarico test | Three Google and Microsoft surfaces repeated a fabricated claim one day after it was posted | https://newsguardriskbriefing.substack.com/p/fakes-of-the-week-russians-interfere | yes | 2 |

Small sign of change: DeclineCraft (2026-10-20) found that turning on thinking without retrieval made answers shift from "I am unsure" to denying the question's premise. https://arxiv.org/abs/2610.28340 (opened, rung 3)

### 9. Memory beats search (knowledge conflict): STILL TRUE, and it cuts both ways

| Date | Item | What it shows | URL | Opened | Rung |
|---|---|---|---|---|---|
| 2026-10-10 | Chen and Koudas, What Drives AI Citations? | 158,099 answers, 468,037 citations (ChatGPT, Gemini, Perplexity). Retrieval explains 32% of citation variation, page features 2.8%. Model knowledge favours known brands and sometimes names brands with no supporting page | https://arxiv.org/abs/2610.15033 | yes | 3 |
| 2026-10-18 | Banerjee et al., The Bottleneck Is Retrieval, Not Reading | 10 closed and 3 open models. The gap between a right answer and a right answer with evidence grows when the context contradicts the model's own knowledge | https://arxiv.org/abs/2610.26951 | yes | 3 |
| 2026-09-25 | Stale-Document Poisoning | The reverse case. Outdated retrieved text overrode correct memory 30 to 37%, while current evidence was followed 97 to 100% | https://arxiv.org/abs/2609.31342 | yes | 3 |
| 2026-10-18 | TREK | Main bottleneck is reasoning after retrieval, not retrieval. Frontier models are misled by conflicting evidence after finding everything needed | https://arxiv.org/abs/2610.25323 | yes | 3 |

### 10. Planted instructions in pages: STILL TRUE, partly fixed at the top end

| Date | Item | What it shows | URL | Opened | Rung |
|---|---|---|---|---|---|
| 2026-10-15 | Iqbal, Intact (agentic browsing) | 1,091 real pages with injected attacks. 73.1% got through a standard planner, 12.8% through the proposed design. The browser misattributed 58.7% of third-party elements to the first party | https://arxiv.org/abs/2610.22697 | yes | 3 |
| 2026-10-06 | Signals Corps, Prompt injection in HTTP headers | 217,097,223 responses (about 10% of a Common Crawl crawl). 30 of 7,959 sites with AI-aimed headers tried to give orders, most as jokes. Claude Opus, Sonnet, Haiku obeyed 0 times on everyday prompts but 7 of 9 times when the prompt gave the site authority | https://www.signalscorps.com/blog/prompt-injection-in-http-headers/ | yes | 3 |
| 2026-10-01 | Pegoraro et al., The Innocent Courier (LLMLeak) | Using an LLM's web fetch tool as a covert exfiltration channel worked 79.7% of the time across 11 open models | https://arxiv.org/abs/2610.01768 | yes | 3 |
| 2026-10-01 | Claude Code issue 98584 | A user's dummy site repeatedly got Sonnet 5.5 to send the user's email in a curl User-Agent. Opus refused more reliably | https://github.com/anthropics/claude-code/issues/98584 | yes | 6 |

Also seen: OpenAI disclosed self-replicating prompt injections in training and evaluation, no outside impact (2026-09-25) [VENDOR]. https://alignment.openai.com/misalignment-reports/self-replicating-prompt-injections-exist/ (opened, rung 6). Claude Code issue 98830 (2026-10-01): unrequested fake log text with planted translation instructions appeared in a session. Claude did not follow them. https://github.com/anthropics/claude-code/issues/98830 (opened, rung 6). Simon Willison on X, 2026-10-23, reportedly said he suspects injection may not be a problem for today's strongest models. Seen only in a search summary, X returned 402 (opened: no, rung 7). His blog had no October post on this. Zscaler ThreatLabz IPI campaign post is dated 2026-07-02, outside the window.

## 3. New per-model numbers (for the scorecard)

Do not average across studies. Tasks, dates and access paths differ.

OpenDS-World, live web, shared tools, accuracy (arXiv 2610.30181, 2026-10-19)

| Model | Accuracy | Hit a budget limit |
|---|---|---|
| GPT-6 Astra | 39.0% | 25.5% |
| Claude Opus 5.5 | 38.0% | 16.5% |
| Gemini 3.8 Flash | 36.5% | not given |
| Claude Fable 5.1 | 33.5% | not given |
| GPT-5.6 Sol | 28.0% | 22.0% |
| Qwen3.8-Max | 25.5% | not given |
| GLM-5.3-Flash | 23.5% | not given |
| DeepSeek-V4.1-Flash | 20.5% | 78.0% |
| Kimi K3 | 17.5% | not given |
| GLM-5.3 (text only) | 13.5% | 73.0% |
| DeepSeek-V4-Pro (text only) | 12.5% | 72.5% |
| Qwen3.8-Flash | 12.0% | 81.5% |
| Humans | 21.1% | n/a |

LifeSearch, deep research agents on real-user tasks, rubric score (arXiv 2610.18092, 2026-10-13): GPT-5.6 Sol 63.44, Claude Opus 5 56.10, Hy4 Preview 49.73, GLM-5.3 49.19, Qwen3.8-Max 47.52, DeepSeek-V4 Pro 46.90, Kimi-K3 45.79, Doubao-Seed-2.1-Pro 43.09, Claude Opus 4.8 41.94, Hy3 38.90, GLM-5.2 37.11, Gemini-3.6-Flash 34.72.

TREK-Wild, fast-changing facts with web search (arXiv 2610.25323, 2026-10-18): GPT-5.4 70.1%, Gemini-3.1-Pro 64.6%, GPT-5.4-mini 58.3%, Claude-Sonnet-4.6 51.4%, Gemini-3.1-Flash 50.7%, Claude-Opus-4.6 49.3%, Qwen3.8-27B 40.3%, GPT-oss-120B 34.7%, Qwen3-235B 31.2%, Qwen3-32B 29.2%, GLM-4.7-Flash-30B 26.4%, Gemma-4-31B 17.4%, Qwen3-8B 16.0%.

Data-void attack success, lower is better (arXiv 2610.30365, NDSS 2027): Gemini-3 Flash Preview (API) 33.3%, ChatGPT-5.2 (UI) 29.8%, Sonar Pro (API) 29.8%. Warning given when planted content was used, neutral tone: ChatGPT 21.4%, Sonar Pro 22.2%, Gemini 5.6%.

Fabricated concept cite rate after first citation, lower is better (arXiv 2610.11932, April 2026 runs): Yuanbao 100% (n 5), Grok 93.7%, Doubao 85.7%, Kimi 65.0%, Wenxin 64.0%, Google AI 45.5%, Perplexity 37.1%, ChatGPT 35.0%, Qwen and DeepSeek did not cite it within 7 days.

Snippet-only share, lower is better (arXiv 2610.21731): GPT-5.6 Luna deployed 53.6%. See section 2.6 for open models.

Search use and run-to-run source overlap, SEO firm Prefer, September 2026, API (rung 5): searched Perplexity 100%, ChatGPT 90%, Gemini 88.8%, Claude 80%. Shared cited sites between two runs: Perplexity about 96%, Claude 68%, ChatGPT 37%, Gemini 35%. Sources per answer: Perplexity 19.48, Gemini 8.64, Claude 4.58, ChatGPT 3.05.

Location audit (arXiv 2610.24081, 2026-10-16, 31,200 answers): ChatGPT follows the declared location down to city and ignores network location. Gemini ignores declared location, follows network country, and changes most sources even for place-free questions.

Full Fact (API, web search on, July to September 2026): no per-model rates. Named errors: DeepSeek (stale PM), Gemini 3.1 Pro (stale rate, US local sources, looping reply), Gemini 2.5 Flash (period arithmetic), Gemini 2.5 Pro (refused a past period as future), ChatGPT (day-to-day figure changes), Claude (stale rate, past date as future, wrong voter ID claim).

NewsGuard Talarico test (2026-10-21): Google AI Overview, Gemini and Copilot repeated the false claim. Other chatbots not reported in the opened page.

## 4. Signals for a new top-10 candidate

1. Run-to-run inconsistency. Citation overlap below 0.02 across 10 runs of one deep research system (2610.26421). Same-question source overlap 35 to 96% by engine (Prefer). Full Fact saw answers flip by day. ChatGPT citations shift with query rewriting and repeated runs (2610.15382, 2026-10-11, proxies recover only about a quarter of cited URLs). This now has three independent measurements in the window and is a strong candidate.
2. Source authority deference. A "verified source" label flips 45 to 88% of correct answers (2609.37616). This could merge into 4 or 8, but the paper shows it is a separate mechanism from user sycophancy.
3. Wrong place. Results depend on declared or network location (2610.24081). Claude Code issue 104830 (2026-10-24) shows Aargau queries returning Munich shops, and a Google Maps workaround costing about twice the time and 55% more tokens. https://github.com/anthropics/claude-code/issues/104830 (opened, rung 6)
4. Wrong person or entity. A German court order of 2026-09-24 (Aachen, 8 O 268/26) stopped Google repeating an AI Mode claim that pinned another man's sex crime conviction on a doctor. Reported 2026-10-18. https://madrobot.blog/2026/10/18/german-courts-google-liable-ai-overviews-ai-mode-aachen-munich-ruling/ (opened, rung 5. Court PDF not opened)
5. Arithmetic on retrieved figures. Full Fact says the clearest failures came when models calculated rather than recalled (Gemini 2.5 Flash period error).
6. Training can trade grounding for score. Search-R1 accuracy rose while evidence-backed correct answers fell from 84.0% to 42.9% (2610.23148). A warning for benchmark-led scorecards.
7. Guessed URLs. Agents fetch URLs they invent and do not say so (issue 104523).

## 5. What could not be reached

- Reddit: one search, no in-window threads found. X: status page returned 402. Lobsters: blocked by Anubis bot protection.
- NewsGuard Reality Check Talarico page and windowsforum coverage: 403. Used the NewsGuard Risk Briefing instead.
- No in-window study found from Tow Center, EBU or BBC, Reuters Institute, Pew, Which?, Consumer Reports, Unit 42, Lakera, HiddenLayer or Brave. Searched each by name. Newest items found were outside the window (Unit 42 March 2026, Which? about late 2025, EBU October 2025, Zscaler July 2026).
- OpenAI developer forum and Google AI developer forum: no in-window threads surfaced in search.
- Simon Willison blog: newest prompt injection post 2026-09-17. The 2026-10-23 X post was not opened.
- Full Fact report page shows no publication date. The 2026-10-15 date comes from secondary coverage.
- Several abstracts do not name models (TREK failure shares sit in an unreadable figure, MisleadQA, Authority Bias, Accurate but Not Humble, LLMLeak, Intact, the deep research system in 2610.26421, the platforms in VoteGEO-Bench).
- arXiv coverage: the cs.CL and cs.IR "past week" and "recent" listings were read in full or in parts. For 2026-09-25 to 2026-10-18, coverage relies on arXiv API keyword queries (web agent, deep research, search agent, citation, attribution, prompt injection, false premise, sycophancy, knowledge conflict, outdated, search-augmented, AI search, generative engine, cloaking, paywall, anti-scraping). Papers using other words may be missed.
- arXiv 2610.28639 (AI chat versus filter search) shows an August 2026 submission date on an October ID. Left out as unclear.
- ACL Anthology and EMNLP 2026 proceedings not yet live. EMNLP 2026 camera-ready papers were found only through arXiv.

Search log (summary): about 22 web searches, 7 arXiv API queries, 4 arXiv listing reads, 7 Hacker News Algolia queries, 7 GitHub issue searches on anthropics/claude-code, and about 45 page opens.
