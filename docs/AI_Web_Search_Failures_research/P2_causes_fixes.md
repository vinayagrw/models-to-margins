# P2 Causes and fixes: why AI assistants miss the right details on the web, and what fixes them

Strand: Phase 2, causes and fixes. Prepared 2026-10-25.
Builds on the confirmed top 10 in `AI_Web_Search_Failures_User_Research.md` and the U1, U2, U3 briefs.

## How to read this brief

**Pipeline stages:** 1 understand, 2 plan, 3 search, 4 fetch, 5 read, 6 rank, 7 reconcile, 8 write and cite.

**Evidence ladder (R1 to R7):** R1 audited or reproduced (peer reviewed, controlled), R2 primary record or spec (vendor docs, standards drafts, benchmark specs), R3 revealed behaviour or preprint, R4 deployment scale, R5 credible secondary or survey, R6 self-report, R7 vendor claim or unopened.

**Claim tags.** Each claim carries a tag in this form: `[ID · ISO date · opened · rung]`. The ID points to the source register at the end, which gives the full URL.
- "opened" means I opened the page in this session.
- "opened P1" means it was opened in Phase 1 and I reused it without opening it again.
- "not opened" means I saw it only in search results or the page returned an error. Those claims sit at R7.

**[VENDOR]** marks a performance number produced by staff of a company that sells an AI assistant or search product (Anthropic, Google, OpenAI, Microsoft, Meta, Cloudflare), even when it appears in a peer-reviewed paper. Treat those numbers as indicative.

**Where a fix "breaks"** covers known limits from the sources. Where I found no independent measurement, I say so.

---

## Summary: root cause and best available fix per challenge

| # | Challenge | Main stage | Root cause in one line | Top fix today | How mature |
|---|---|---|---|---|---|
| 1 | Citation does not hold the claim | 8 write and cite | Links get attached after the text is written, from a pool of snippets and copies, and nothing checks that the cited text supports the sentence | A separate claim-level citation check: split the answer into claims, match each to a quoted span, and drop or flag anything unsupported | Parts are sold as products (Vertex check grounding, Anthropic Citations). End-to-end checking is mostly custom |
| 2 | Silent failure, confident answer | 4 fetch to 8 write | Training and scoring reward guessing over "I don't know", and tool errors come back inside a normal success response | Surface every tool failure to the model and the user, plus a hard rule that a report with zero opened sources is not delivered | Shipping now in Claude Code. Evals are starting at OpenAI. Abstention research is mature, products lag |
| 3 | Shallow search, stops too early | 2 plan, 3 search | Agents stop when they feel confident rather than when each sub-question has evidence, and they write poor queries | Query decomposition into sub-questions, with a coverage check per sub-question before stopping | Decomposition is mature. Coverage-based stopping (HALT) is peer reviewed but tested only on small models |
| 4 | Weak or planted sources win | 6 rank | Ranking rewards relevance and SEO, not reliability, and many planted pages look like agreement | Domain allow and block lists today. Reliability-aware filtering that checks independence of sources next | Lists are GA in APIs. Reliability scoring is research stage |
| 5 | Stale facts shown as current | 3 search, 6 rank, 7 reconcile | Snippets, caches and rerankers favour older pages, and the model's sense of "now" is off | Give today's date, open the page for any time-sensitive fact, and filter or rerank by date | Date grounding and filters are GA. Recency-aware reranking is research stage |
| 6 | Reads snippets, not pages | 5 read | Opening pages costs time and tokens, and snippets look good enough | A read-before-cite rule: only cite pages that were opened, with truncation reported | Partly shipped (Claude Code truncation notice, Anthropic dynamic filtering). Rule itself is not default anywhere I found |
| 7 | Blocked or unreadable pages | 4 fetch | Bot blocking, paywalls, JavaScript-only pages and PDFs stop the fetch, so the model falls back to copies or memory | Declare each blocked fetch, then route to a real browser tool, a document parser or a licensed source | Error codes are GA. Licensed grounding and signed agent identity are early |
| 8 | Goes along with a false premise | 1 understand | Tuning makes models agree with users, and the premise gets baked into the search queries | A premise check step before searching: list the question's assumptions and verify each | Research stage. Not a documented default in any product I found |
| 9 | Memory beats search | 7 reconcile | The model's confidence decides whether it trusts memory or the page, and that confidence is poorly calibrated | Source-aware reconciliation that compares memory and evidence and prefers dated primary sources for changeable facts | Research stage. Needs internals (token probabilities) that consumer products do not expose |
| 10 | Planted instructions in pages | 5 read, then any action | One model reads data and instructions in the same context and cannot reliably tell them apart | Isolation by design (dual LLM, CaMeL style) for any agent that can act, plus training and classifiers for reading-only use | Training and classifiers shipped by vendors. Isolation designs are research or custom |

---

## 1. Citation does not hold the claim

### (a) Root cause and stage

Stage: 8 write and cite, with roots in 5 read and 6 rank.

In plain words, the model writes the sentence first and attaches a link from whatever it retrieved. Nothing forces the linked text to say what the sentence says. Three things make this worse.
- The pool of links is often snippets or syndicated copies, not the original page. Tow Center found tools often cited Yahoo or AOL reprints and that over 60% of 1,600 citation tests were wrong `[P01 · 2025-03-06 · opened P1 · R1]`.
- Users reward volume. Search Arena found user preferences are influenced by the number of citations, even when they do not support the claim `[P23 · 2025-06-05 · opened P1 · R3]`.
- Even real, accessible citations can mislead. A 2026 preprint over 761,495 citation pairs from ten models found 30.6% of citations distort their sources and 27.1% come from domain-inappropriate sources. Provider-level differences explained 88% to 96% of citation quality variance, which points at system design, not model size `[S37 · 2026-05-27 · opened · R3]`.

The problem is old and still unsolved. On the ALCE benchmark, even the best models lacked complete citation support 50% of the time on ELI5 `[S01 · 2023-05-24 · opened · R1]`. In 2025 deep research products, citation accuracy ranged from 39.36% (Perplexity Sonar Reasoning Pro) to 93.68% (Claude 3.7 Sonnet with search) `[P06 · 2025-06-13 · opened P1 · R2]`.

### (b) Fixes

| Technique | What it is | Evidence it works | Cost or latency | Where it breaks |
|---|---|---|---|---|
| Claim-level citation verification (post-hoc checker) | After the answer is written, split it into atomic claims and check each against the cited text or a fresh search | SAFE agreed with human raters 72% of the time on about 16,000 facts, was judged right in 76% of 100 disagreements, and was more than 20 times cheaper than humans [VENDOR] `[S02 · 2024-03-27 · opened · R1]`. Google's check grounding API returns a 0 to 1 support score with claim-to-fact citations. Partly supported claims count as ungrounded `[S44 · 2026-10-22 · opened · R2]` | Vertex check grounding is designed for under 500 ms per call, up to 200 facts of 10,000 characters each [VENDOR] `[S44 · 2026-10-22 · opened · R2]`. SAFE runs several searches per fact | It checks support, not truth. A planted or wrong page can "support" a false claim. Verified Misguidance shows real sources still distort or misfit `[S37 · 2026-05-27 · opened · R3]` |
| Research and revise (RARR) | A second pass finds evidence for each sentence, then edits only the parts the evidence does not support | Abstract reports a significant gain in attribution while keeping more of the original text than earlier editors. No number on the abstract page [VENDOR] `[S03 · 2022-10-17 · opened · R1]` | Extra search and model calls per sentence | Can only fix what it can find. Inherits all search failures in this brief |
| Span-level citations tied to fetched text | The API cites an exact character range or sentence in a document it actually holds | Anthropic says built-in citations raise recall accuracy "by up to 15%" over custom setups, and customer Endex reported source hallucinations falling from 10% to 0% [VENDOR] `[S05 · 2025-06-23 · opened · R6]`. Web fetch citations return start and end character indexes `[S23 · undated, opened 2026-10-25 · opened · R2]`. Gemini returns url_citation with start and end index `[S45 · 2026-10-13 · opened · R2]` | Anthropic does not charge output tokens for quoted text `[S05 · 2025-06-23 · opened · R6]`. Web search cited_text is capped at 150 characters `[S22 · undated, opened 2026-10-25 · opened · R2]` | The span is real but may not entail the sentence. 150 characters can lose context such as the year or unit |
| Separate citation agent | A dedicated agent reads the final report and the gathered documents and places each citation | Anthropic's research system uses a CitationAgent after research ends. No accuracy number given [VENDOR] `[S10 · 2025-06-13 · opened · R6]` | One more long-context pass over all documents | Placing a citation is not the same as checking entailment |
| URL liveness and existence checks | Resolve every cited URL and check web archives before showing it | A checking tool cut dead or invented links by 6 to 79 times, to under 1% `[P07 · 2026-04-03 · opened P1 · R2]` | Cheap. One HTTP request per link | A live link can still not support the claim |
| Training for grounded attribution and refusal | Fine-tune the model to cite well and to refuse when documents do not answer | Trust-Align improved 26 of 27 models. For LLaMA-3-8b it beat the FRONT baseline by 12.56 points on ASQA, 36.04 on QAMPARI and 17.69 on ELI5 `[S40 · 2024-09-17 · opened · R1]` | One-off training cost | Tested on open models up to 8B, not on the commercial assistants in scope |
| Chain-of-Verification | The model drafts, writes verification questions, answers them independently, then revises | Abstract reports fewer hallucinations on list, QA and long-form tasks. No numbers on the abstract page [VENDOR] `[S04 · 2023-09-20 · opened · R3]` | Three to four times the generation calls | Checks the model against itself, not against the source |

### (c) What a user or buyer can do today
- Ask for a short verbatim quote next to each key claim, then open two of the links and check the quote is there.
- For any report you will forward, run a second prompt: "For each claim, quote the supporting sentence from the cited page or mark it unsupported."
- Builders: turn on citations in the Anthropic web fetch tool (off by default) and show cited_text in the UI `[S23 · undated, opened 2026-10-25 · opened · R2]`. Add a URL resolver before display.
- Gemini app had a "Double-check response" feature that colours statements by whether Google Search found similar content. The help page I opened no longer described it, so treat it as unconfirmed `[S53 · undated · opened, feature not shown · R7]`.

---

## 2. Silent failure, confident answer

### (a) Root cause and stage

Stages: 4 fetch, 7 reconcile, 8 write.

In plain words, the model is trained and graded in ways that pay for a guess and never pay for "I could not find this". An OpenAI-authored paper argues hallucination persists because most benchmarks grade answers right or wrong, so guessing raises scores `[S15 · 2025-09-04 · opened · R3]`. On top of that, web tools often report errors inside a normal success reply. The Anthropic web search tool returns HTTP 200 with an error code inside the body, and a search with no matches returns an empty list, not an error `[S22 · undated, opened 2026-10-25 · opened · R2]`. If the agent loop or the model does not check, the run carries on as if it worked.

The outcome is measured. Refusals fell to 0.5% of 3,113 questions in the EBU study `[P02 · 2025-10-21 · opened P1 · R1]`. ChatGPT hedged in only 15 of 200 Tow Center tests and never declined `[P01 · 2025-03-06 · opened P1 · R1]`. OpenAI's own system card notes the chain of thought hallucinated access to tools it did not have `[S46 · 2025-02-25 · opened · R5]`.

### (b) Fixes

| Technique | What it is | Evidence it works | Cost or latency | Where it breaks |
|---|---|---|---|---|
| Tool failure surfacing | Every blocked fetch, truncation, empty search or budget stop is returned to the model as a plain message it must act on | Claude Code 2.1.290 (2026-10-05) stopped silently dropping page text past 100,000 characters and now reports the unread amount. Releases from 2026-10-19 to 2026-10-21 return robots.txt refusals as normal results and tell Claude to say so when the search budget runs out `[P09 · 2026-10-21 · opened P1 · R2]` | Near zero | Only works if the final answer is also required to mention the failure. No independent measure of the effect yet |
| Honesty evals for broken tools | Test the model with search switched off and score whether it admits it | OpenAI's "Broken Search Tool" eval reports statistically significant gains for GPT-6 models over GPT-5.6. Numbers appear only in an image [VENDOR] `[S17 · 2026-10-07 · opened · R6]` | Eval cost only | Vendor-run, no public numbers, no independent replication |
| Abstention and calibrated confidence | The model estimates whether it knows (P(IK)) or whether an answer is right (P(True)), and declines or flags below a threshold | Anthropic researchers found larger models are well calibrated on many formats, and P(IK) rises when relevant sources are in context, but calibration on new tasks is weaker [VENDOR] `[S41 · 2022-07-11 · opened · R3]`. A TACL survey maps abstention methods and says abstention is not yet a general skill across tasks `[S16 · 2024-07-25 · opened · R5]` | Low at run time | Over-refusal. Calibration drifts on new domains. Products rarely expose the score |
| Scoring that penalises confident errors | Change benchmarks so a wrong answer costs more than "I don't know" | Proposed as the main fix by Kalai and colleagues, not yet measured in products `[S15 · 2025-09-04 · opened · R3]` | None at run time | Needs the field's leaderboards to change |
| Evidence-coverage abstention | Stop and abstain when no evidence matches the required claims | HALT, in open-web pilots, fired on only 2.4% of Bamboogle questions, so it held back rather than stopping on weak evidence, with no exact-match loss `[S11 · 2026-10 · opened (PDF) · R1]` | A small verifier per loop | Tested with 3B and 7B models |
| Zero-source guard | Block delivery of any report with no opened sources | No independent measurement found. Motivated by ChatGPT Deep Research zero-source runs in Phase 1 user reports | Near zero | Gap: no study |

### (c) What a user or buyer can do today
- End research prompts with: "List the searches you ran, the pages you opened, and any page or search that failed."
- Treat any long report with no or few links as a failed run, not an answer.
- In Claude Code, read the budget and "unread characters" notices. They are the tool telling you the answer is partial.
- Builders: check `error_code` in every web tool result block and fail loudly in your own UI `[S22 · undated, opened 2026-10-25 · opened · R2]`.

---

## 3. Shallow search, stops too early

### (a) Root cause and stage

Stages: 2 plan and 3 search.

In plain words, the agent stops when it feels sure, not when each part of the question has evidence. It also writes queries that are too long or too narrow, then gives up. A trace study from 2026-10-21 counted failure types for GPT-5-mini across sampled tasks: premature stopping in 20 BrowseComp tasks, 38 BrowseComp-zh, 41 GAIA and 75 XBench-DeepSearch tasks, and ineffective queries in 41 BrowseComp tasks `[S48 · 2026-10-21 · opened (PDF) · R3]`. The same table shows an open model (MiroThinker-30B) stopped early far less often but wrote ineffective queries in 47 BrowseComp tasks, so the two failure types trade off by model. Anthropic reported its agents defaulted to long, specific queries that returned few results [VENDOR] `[S10 · 2025-06-13 · opened · R6]`. In BrowseComp-Plus, Gemini 2.5 Pro made about 7 search calls per question against about 23 for GPT-5 `[P05 · 2025-08-08 · opened P1 · R1]`.

The cost shows in live tasks. On Mind2Web 2 the best agent reached 28% against 54% for humans, and ChatGPT Search scored 6% `[P04 · 2025-06-26 · opened P1 · R1]`. Stanford found retrieval, not reasoning, drove over 70% of errors in same-day news questions `[P03 · 2026-05-21 · opened · R3]`.

### (b) Fixes

| Technique | What it is | Evidence it works | Cost or latency | Where it breaks |
|---|---|---|---|---|
| Query decomposition and self-ask | Split the question into sub-questions and search each one | Self-ask narrows the gap where a model knows each piece but fails the combined question, and plugs into a search engine easily `[S12 · 2022-10-07 · opened · R1]`. FRAMES reports accuracy of 0.40 with no retrieval and 0.66 with multi-step retrieval [VENDOR] `[P26 · 2024-09-19 · opened P1 · R2]`. Google AI Mode uses query fan-out across subtopics `[P31 · 2025-12-10 · opened P1 · R2]` | More searches per question | Bad decomposition repeats the user's framing (see #8). More results means more distractors |
| Interleaved retrieval with reasoning (IRCoT) | Each reasoning step triggers a new search based on what was just learned | Up to 21 points better retrieval and up to 15 points better QA on four multi-hop datasets `[S13 · 2022-12-20 · opened · R1]` | Several sequential calls, slower | Tested with GPT-3 era models on Wikipedia-style corpora |
| Coverage-based stopping (HALT) | A small verifier checks the gathered evidence against the claims each hop must establish, and the agent stops only when all are matched | Peer reviewed. Reduces redundant searching while keeping exact match on HotpotQA, 2WikiMultihopQA and MuSiQue. A 3B Self-Ask agent ran to its budget on 78% to 88% of questions without it `[S11 · 2026-10 · opened (PDF) · R1]` | Light, the host agent is unchanged | Built mainly to stop over-searching. With hop claims generated from the question, savings are smaller. In open-web pilots it fires rarely. The same coverage check could block early stopping, but that use is not tested |
| RL-trained search policies | Train the model with reinforcement learning to decide when and what to search | Search-R1 reports 41% (Qwen2.5-7B) and 20% (Qwen2.5-3B) gains over RAG baselines [VENDOR co-authors] `[S14 · 2025-03-12 · opened · R3]` | Training cost, then normal run cost | Recent work cited in HALT finds RL agents still over-search or under-search `[S11 · 2026-10 · opened (PDF) · R1]` |
| Parallel sub-agents | A lead agent plans and sends 3 to 5 sub-agents to search different angles | Multi-agent beat single-agent Opus 4 by 90.2% on Anthropic's internal eval. Token use alone explained 80% of BrowseComp performance variance [VENDOR] `[S10 · 2025-06-13 · opened · R6]` | About 15 times the tokens of a chat. Parallel calls cut research time up to 90% [VENDOR] `[S10 · 2025-06-13 · opened · R6]` | Early versions spawned 50 sub-agents for simple questions and searched for sources that did not exist `[S10 · 2025-06-13 · opened · R6]` |
| Better retriever and multi-index search | Use a stronger retriever, or more than one index, under the same model | With a better retriever, GPT-5 rose from 55.9% to 70.1% on BrowseComp-Plus `[P05 · 2025-08-08 · opened P1 · R1]`. Claude and ChatGPT citations overlapped only about 8% in a 400-query rerun, so each index sees a different web `[P27 · 2026-07-02 · opened P1 · R5]` | More API spend and merge logic | Merging indexes adds duplicates and copies. Not measured for consumer products |

### (c) What a user or buyer can do today
- For multi-part or multi-company questions, use the deep research mode, not quick search.
- Ask for a plan first: "List the sub-questions you will answer and the source type for each." Gemini Deep Research lets you edit the plan before it starts `[S52 · undated, opened 2026-10-25 · opened · R2]`.
- Name the must-have items ("must include the 2026 annual report and the latest press release").
- Close with: "What did you look for and not find?"

---

## 4. Weak or planted sources win

### (a) Root cause and stage

Stage: 6 rank, with spillover into 7 reconcile.

In plain words, search ranks pages that match the words and attract clicks. It does not rank how trustworthy a page is. Product review search on Google, Bing and DuckDuckGo had significant problems with optimised affiliate content `[P21 · 2024 · opened P1 · R1]`. Content written to win AI citations can raise visibility by up to 40% `[P19 · 2024-06-28 · opened P1 · R1]`. Anthropic found its own agents chose SEO content farms over authoritative sources [VENDOR] `[S10 · 2025-06-13 · opened · R6]`.

The hardest case is fake agreement. A 2026 poisoning study across 10 deep search agents found that evidence recognition got worse when planted pages appeared to corroborate each other. Defence prompting increased checking but "rarely converts verification into recovery" `[S34 · 2026-09-05 · opened · R3]`.

### (b) Fixes

| Technique | What it is | Evidence it works | Cost or latency | Where it breaks |
|---|---|---|---|---|
| Domain allow and block lists | Restrict search to, or exclude, named domains | Available in the Anthropic API as allowed_domains and blocked_domains `[S22 · undated, opened 2026-10-25 · opened · R2]`, in Perplexity as search_domain_filter `[S55 · undated · not opened · R7]`, and in ChatGPT Deep Research as "Manage sites" `[S54 · undated · not opened (403) · R7]`. No independent accuracy measure found | Free | Removes niche and local sources. User content on trusted domains still gets in. Long lists can hit request size errors `[S22 · undated, opened 2026-10-25 · opened · R2]` |
| Reliability-aware retrieval | Estimate each source's reliability by cross-checking facts across sources, then weight or filter | RA-RAG reports it beats baselines when source reliability varies `[S36 · 2024-10-30 · opened · R3]`. Credibility-aware generation (EMNLP 2024) trains models to discount low-credibility documents `[S27 · 2024-04-10 · opened · R1]`. No numbers on either abstract page | Extra retrieval and scoring | Planted networks can fake the cross-check |
| Consistency graph filtering | Link documents that contradict each other, keep the largest set that agrees, weighted by rank | ReliabilityRAG (NeurIPS 2025) claims provable resistance to a bounded number of bad documents and keeps accuracy when there is no attack. No numbers on the abstract page `[S35 · 2025-09-27 · opened · R1]` | Exact solution is expensive, the paper offers a sampled version | If attackers outnumber honest pages, the "majority" is the attack |
| Source-quality rules in the prompt | Tell the agent to prefer primary, official and dated sources | Used by Anthropic to fix SEO bias. No number given [VENDOR] `[S10 · 2025-06-13 · opened · R6]` | Free | Soft. The model can still be fooled by a page that looks official |
| Origin independence check | Count distinct original publishers, not pages, and collapse syndicated copies | No measurement found. Motivated by Tow Center's finding that tools cited reprints over originals `[P01 · 2025-03-06 · opened P1 · R1]` | Light | Gap: no study |

### (c) What a user or buyer can do today
- Ask: "Use primary sources only. For each source, say who published it and whether they sell the product discussed."
- Be wary when every source is a "best of" list or a vendor page.
- In APIs and ChatGPT Deep Research, set a short list of trusted domains for high-stakes work.
- For vendor or product questions, ask for at least one independent source per claim.

---

## 5. Stale facts shown as current

### (a) Root cause and stage

Stages: 3 search, 6 rank, 7 reconcile.

In plain words, the model reads old copies and old snippets, rerankers prefer older pages, and the model's own sense of "today" can be wrong.
- Fetch caches can return an older version of a page `[S23 · undated, opened 2026-10-25 · opened · R2]`.
- Rerankers show "a strong bias toward older, semantically rich documents" even when they are out of date [VENDOR] `[S50 · 2026-04-14 · opened · R3]`.
- A model's effective knowledge cutoff is often older than its stated one `[P29 · 2025-10-24 · opened P1 · R5]`.
- Full Fact's 70-day test found old figures and wrong office holders, for example an old asylum support rate `[P25 · 2026-10-15 · opened P1 · R1]`.

### (b) Fixes

| Technique | What it is | Evidence it works | Cost or latency | Where it breaks |
|---|---|---|---|---|
| Date grounding | Put today's date into the search and answer context | Claude Code added it in 1.0.36 to fix wrong-year queries `[P09 · 2025 · opened P1 · R2]`. No independent measure | Free | The model may still trust a dated page over the date |
| Freshness metadata and filters | Return page dates (page_age) and let callers filter by recency or skip caches | Anthropic search results carry page_age, and web fetch offers use_cache false `[S22 · undated, opened 2026-10-25 · opened · R2]` `[S23 · undated, opened 2026-10-25 · opened · R2]`. Perplexity offers a recency filter by day, week, month or year `[S55 · undated · not opened · R7]` | Cache bypass adds latency `[S23 · undated, opened 2026-10-25 · opened · R2]` | page_age is when the site was last updated, not when the fact changed. Filters drop older pages that are still the authority |
| Open the page for time-sensitive facts | Do not answer changing facts from snippets | Outdated answers were 6.4% from snippets alone against 1.3% when an opened page was cited `[S20 · 2026-10-16 · opened · R5]` | More tokens and time | Opened pages can also be old |
| Restate the question after each page | Repeat the original question after every opened page | Corrected 26.1% of previously failed fact-sheet checks `[S20 · 2026-10-16 · opened · R5]` | Small | Single study, open-weight models |
| Recency-aware reranking | Tune the reranker instructions for questions about changing facts | FRESCO reports gains up to 27% on evolving-knowledge tasks while keeping stable-knowledge results [VENDOR] `[S50 · 2026-04-14 · opened · R3]` | Offline tuning | Tested on Wikipedia revision pairs |
| FreshPrompt | Put many dated search results in the prompt, newest last, and ask for concise answers | Beat Self-Ask and Perplexity on FreshQA. Number and order of evidence both changed accuracy [VENDOR] `[S21 · 2023-10-05 · opened · R3]` | Longer prompts | 2023 models |

### (c) What a user or buyer can do today
- Start time-sensitive prompts with "As of today, 25 October 2026".
- Ask for the date next to every figure and the date of its source page.
- For office holders, prices, rates and rules, ask it to open the official page, not a news story.
- Builders: show page_age in your UI and bypass the cache for fast-changing pages.

---

## 6. Reads snippets, not pages

### (a) Root cause and stage

Stage: 5 read.

In plain words, opening a page is slow and uses tokens, and the snippet often looks like enough. A 2026 preprint found models answered from snippets without opening any page in 2.6% to 76.0% of episodes, and GPT-5.6 Luna did so in 53.6% under its own search `[S20 · 2026-10-16 · opened · R5]` `[S19 · 2026-10-15 · opened · R3]`. The trace study above counted "surface skimming" in 17 to 20 BrowseComp tasks per model `[S48 · 2026-10-21 · opened (PDF) · R3]`.

Some tools add a second layer. Claude Code's WebFetch passes the page to a separate model call and the main model gets that result, which the docs call "lossy by design" `[P08 · undated, opened 2026-10-25 in P1 · opened P1 · R2]`. A user report showed a cut-off 2.5 MB response led the summariser to deny a directory existed `[P33 · 2026-04-22 · opened P1 · R3]`.

### (b) Fixes

| Technique | What it is | Evidence it works | Cost or latency | Where it breaks |
|---|---|---|---|---|
| Read-before-cite rule | The answer may only cite pages that were opened in full | Snippet-only answers were outdated 6.4% vs 1.3% for opened pages, and misleading citations 6.4% vs 2.3% `[S20 · 2026-10-16 · opened · R5]` | About 2,500 tokens for a 10 kB page and 25,000 for a 100 kB page `[S23 · undated, opened 2026-10-25 · opened · R2]` | Larger context invites "context rot", where related distractors hurt more `[P17 · 2025-07-14 · opened P1 · R3]` |
| Dynamic filtering by code | The model writes code that filters the page before it enters the context | Shipped in web_search_20260209 and web_fetch_20260209 and later. Anthropic says it cuts tokens. No accuracy number `[S22 · undated, opened 2026-10-25 · opened · R2]` | No extra charge beyond tokens | Code can filter out the one line that mattered |
| Truncation transparency and offsets | The tool says how much it did not read and lets the model continue | Claude Code 2.1.290, 2026-10-05 `[P09 · 2026-10-05 · opened P1 · R2]` | Free | Only helps if the model reads on |
| Markdown content negotiation | Sites serve a clean Markdown version when the client asks | Cloudflare's example fell from 16,180 to 3,150 tokens, about 80% less [VENDOR] `[S49 · 2026-02-12 · opened · R6]` | Free for Pro and above in beta | Lets a site serve agents a different page than humans, the same shape as cloaking (#10) |
| Evidence placement | Put the strongest evidence at the start or end of context | Accuracy is often highest when relevant text is at the start or end `[P16 · 2023-11-20 · opened P1 · R1]` | Free | Chroma found position mattered little in its setup, so the effect depends on task `[P17 · 2025-07-14 · opened P1 · R3]` |

### (c) What a user or buyer can do today
- Ask: "Open each source you cite and quote the sentence you rely on."
- In Claude Code, give WebFetch a narrow question, read on with an offset when told text was unread, or fetch raw text with curl.
- Builders: log for each citation whether the page was opened, and block citations that were not.

---

## 7. Blocked or unreadable pages

### (a) Root cause and stage

Stage: 4 fetch.

In plain words, the best page often cannot be read by the bot. Cloudflare blocks AI crawlers by default for new domains since 2025-07-01 `[P11 · 2025-07-01 · opened P1 · R2]`. Most AI crawlers do not run JavaScript, and ChatGPT and Claude crawlers hit 404s on about 34% of fetches against 8% for Googlebot `[P10 · 2024-12-17 · opened P1 · R4]`. The Anthropic fetch tool does not support JavaScript-rendered sites `[S23 · undated, opened 2026-10-25 · opened · R2]`. When blocked, tools build answers from copies, other outlets or memory `[P12 · 2025-10-30 · opened P1 · R3]`.

### (b) Fixes

| Technique | What it is | Evidence it works | Cost or latency | Where it breaks |
|---|---|---|---|---|
| Declared fetch failures | Return a clear code for each block so the model and user know | Anthropic fetch returns url_not_allowed (including robots.txt), url_not_accessible and unsupported_content_type `[S23 · undated, opened 2026-10-25 · opened · R2]` | Free | Useless if the answer does not pass it on (#2) |
| Full-page fetch with headless rendering | Hand JavaScript pages to a real browser tool | Anthropic points to its browser use tool for JavaScript pages `[S23 · undated, opened 2026-10-25 · opened · R2]`. Agent browsers Atlas and Comet read a 9,000-word client-side paywalled article that chat products could not `[P12 · 2025-10-30 · opened P1 · R3]` | Slower and more tokens. No independent cost number found | Raises the prompt injection risk in #10. May read content the publisher meant to withhold |
| Licensed content and publisher deals | Pay publishers for real-time access or grounding | Market exists, for example Perplexity's publisher program and OpenAI deals `[S33 · 2026-07-09 · opened · R5]`. But licensing deals did not guarantee accurate citation in Tow Center's tests `[P01 · 2025-03-06 · opened P1 · R1]` | Contract cost | Covers big publishers only. Licensing does not guarantee the source is used or cited `[S33 · 2026-07-09 · opened · R5]` |
| Verified agent identity | The agent signs each request so sites can allow it on purpose | IETF Web Bot Auth working group draft, 2026-09-01, defines signed requests and a key directory `[S32 · 2026-09-01 · opened · R2]` | Low once built | Draft only. Sites still choose to block |
| Markdown for agents | The CDN converts pages to Markdown for agents that ask | Cloudflare beta, 2026-02-12 [VENDOR] `[S49 · 2026-02-12 · opened · R6]` | Free in beta | Depends on site owners opting in |
| Document parsers for PDFs | Parse PDFs and tables with a dedicated tool, keep the binary | Phase 1 saw WebFetch fail on a PDF that a local parser read at once `[U3 M4 · 2026-10-25 · opened P1 · R3]` | Small | Tables still lose structure in many parsers |

### (c) What a user or buyer can do today
- If the source matters, download or paste it yourself and ask the assistant to work from that.
- Ask: "Which sources could you not open, and what did you use instead?"
- Buyers: favour tools with connectors to your licensed databases (news, filings, research) over open web search for paid content.

---

## 8. Goes along with a false premise

### (a) Root cause and stage

Stage: 1 understand, with spillover into 2 plan.

In plain words, models are tuned to please, and they turn the user's wrong fact into the search query, which then finds something that seems to agree. Google researchers found scaling and instruction tuning increase sycophancy, up to agreeing with wrong sums when the user does [VENDOR] `[S30 · 2023-08-07 · opened · R3]`. In 2,100 same-day news questions, accuracy fell from 88% to 96% on well-formed questions to 19% to 70% with subtle false premises, and the weakest model accepted fabricated facts 64% of the time `[P03 · 2026-05-21 · opened · R3]`. The same study found the best false-premise detector was not the best at recovering the right answer, so spotting a premise and fixing the answer are partly separate skills `[P03 · 2026-05-21 · opened · R3]`.

### (b) Fixes

| Technique | What it is | Evidence it works | Cost or latency | Where it breaks |
|---|---|---|---|---|
| Premise checking before answering | Turn the question into its claims, check each against sources, and feed the result back before writing | On KG-FPQ, detection reached 95.24% accuracy against 69.20% for direct prompting. GPT-4o-mini answer accuracy rose from 83.8% to 92.4% (TMLR 2026) `[S29 · 2025-04-08 · opened · R1]` | One extra retrieval and check step | Tested on yes or no questions and a curated knowledge graph. On FEVER the logical-form setup scored 86% against 89% for plain queries `[S29 · 2025-04-08 · opened · R1]` |
| Anti-sycophancy training | Fine-tune on synthetic data where the user's view is irrelevant to the right answer | Significantly reduced sycophancy on held-out prompts [VENDOR] `[S30 · 2023-08-07 · opened · R3]` | One-off training | Only vendors can apply it |
| Concise answers | Ask for short, direct answers | FreshLLMs found concise answers hallucinate less than verbose ones [VENDOR] `[S21 · 2023-10-05 · opened · R3]` | Free | Not a premise check as such |
| Neutral query rewriting and disconfirming search | Rewrite queries without the premise, and also search for evidence against it | No independent measurement found | One or two more searches | Gap: no study |

### (c) What a user or buyer can do today
- Ask neutral questions ("Did X happen?") before loaded ones ("Why did X happen?").
- Add: "First list the assumptions in my question and check each one. Tell me if any are wrong."
- When the answer agrees with you too neatly, ask for the best evidence against your view.

---

## 9. Memory beats search (knowledge conflict)

### (a) Root cause and stage

Stage: 7 reconcile.

In plain words, when the page and the model's memory disagree, the model picks by gut feel. When it is unsure it adopts the page, even a wrong page, and when it is sure it can ignore a correct page. ClashEval found models overrode their own correct knowledge more than 60% of the time when retrieved content was wrong, and less confident models were more likely to adopt it `[S31 · 2024-04-16 · opened · R3]`. The 2026 "Retrieved but Not Read" preprint found evidence can shift the model's internal prediction while the final answer still favours outdated memory `[S19 · 2026-10-15 · opened · R3]`.

### (b) Fixes

| Technique | What it is | Evidence it works | Cost or latency | Where it breaks |
|---|---|---|---|---|
| Calibrated token-probability correction | Compare how confident the model is with and without the retrieved context, using calibrated percentiles, and keep the stronger answer | For GPT-4o, accuracy rose from 0.615 to 0.754, about 14%, and context bias fell 20%, but prior bias rose to 0.085 `[S31 · 2024-04-16 · opened · R3]` | Two generations per question | Needs token probabilities, which consumer products do not expose |
| Source-aware knowledge consolidation (Astute RAG) | Draw out what the model knows, merge it with retrieved text while tracking where each piece came from, and pick the most reliable | ACL 2025. Beat earlier RAG methods on Gemini and Claude and was the only one to match plain LLM use in the worst case [VENDOR] `[S25 · 2024-10-09 · opened · R1]` | Several extra calls | No numbers on the abstract page |
| Context-faithful prompting | Frame the context as a narrator's statement and show counterfactual examples | EMNLP 2023 Findings, significant faithfulness gains on three datasets, no numbers on the abstract `[S24 · 2023-03-20 · opened · R1]` | Free | Makes the model more faithful to bad pages too. Pair with #4 |
| Self-reflective retrieval (Self-RAG) | Train the model to decide when to retrieve and to critique passages with special tokens | Abstract claims gains in factuality and citation accuracy over ChatGPT and Llama2-chat with retrieval `[S18 · 2023-10-17 · opened · R3]` | Training | Older models |
| Show both sides | Present what the model believed, what the source says, and the source date | No measurement found | Free | Gap: no study |

### (c) What a user or buyer can do today
- Add: "Use only what you find in sources. If your own knowledge disagrees with a source, say so and show both."
- For prices, rules and people in roles, require a dated primary source.
- Watch for answers with no citations on fast-changing topics. That usually means memory.

---

## 10. Planted instructions in pages (indirect prompt injection, GEO, cloaking)

### (a) Root cause and stage

Stage: 5 read, then any later action.

In plain words, the model reads the user's request and the web page in the same stream and cannot reliably tell instructions from data. Brave showed Comet fed page content to its model "without distinguishing between the user's instructions and untrusted content" `[P14 · 2025-08-20 · opened P1 · R3]`. Unit 42 saw 22 injection techniques in the wild, mostly visible plain text (37.8%), HTML attribute cloaking (19.8%) and CSS hiding (16.9%) `[P13 · 2026-03-03 · opened P1 · R4]`. Sites can also serve AI crawlers a different page from humans, and that made Atlas rank a manipulated resume first `[P18 · 2025-10-25 · opened P1 · R3]`.

### (b) Fixes

| Technique | What it is | Evidence it works | Cost or latency | Where it breaks |
|---|---|---|---|---|
| Spotlighting | Mark or encode untrusted text so the model always knows where it came from | Cut attack success from above 50% to below 2% on GPT models with little task loss [VENDOR] `[S07 · 2024-03-20 · opened · R3]` | Free, prompt only | A heuristic. Adaptive attackers were not the main test |
| Dual LLM isolation | A privileged model with tools never sees untrusted text. A quarantined model with no tools reads pages and returns values held as variables | Pattern described in 2023. The author calls it "pretty bad" for complexity and says it is not 100% reliable `[S09 · 2023-04-25 · opened · R5]` | More engineering, worse user experience | Leaks through new features and social engineering `[S09 · 2023-04-25 · opened · R5]` |
| Control and data flow isolation (CaMeL) | Build the program from the trusted request only, so web data cannot change what the agent does, and tag data with capabilities | Solved 77% of AgentDojo tasks with provable security, against 84% for the undefended system [VENDOR co-authors] `[S08 · 2025-03-24 · opened · R3]` | About 7 points of task completion | Research code. AgentDojo has 97 tasks and 629 security tests `[S28 · 2024-06-19 · opened · R3]` |
| Design patterns for agents | Six patterns such as plan-then-execute, map-reduce and dual LLM | The authors conclude general-purpose agents are unlikely to get reliable guarantees with today's models, and recommend narrow agents with clear trust boundaries `[S26 · 2025-06-10 · opened · R3]` | Less flexibility | Each pattern limits what the agent can do |
| Adversarial training plus classifiers | Train on simulated injections and scan untrusted content as it enters context | Opus 4.5 browser attack success fell from 8.0% (model only) to 1.4% with improved safeguards, against a Best-of-N attacker with 100 tries [VENDOR] `[S38 · 2025-11-24 · opened · R6]`. Anthropic says this is "far from a solved problem" `[S38 · 2025-11-24 · opened · R6]`. OpenAI describes RL-driven automated red teaming for Atlas `[S39 · 2025-12-22 · not opened (403) · R7]` | Vendor cost | 1% of many pages is still many attacks. Later Anthropic posts say the November method is not comparable to newer models `[S38 · 2025-11-24 · opened · R6]` |
| Separate reader model and URL limits | A second model reads pages for the main agent, and the agent may only fetch URLs already in context | Claude Code lists the separate model call as an injection safeguard `[P32 · undated · opened P1 · R2]`. Anthropic fetch blocks URLs that appear only in Claude's own output `[S23 · undated, opened 2026-10-25 · opened · R2]` | Free | The reader model can itself be steered. It also causes #6 |
| Cloaking checks | Compare the page served to the AI agent with the page served to a normal browser | No tool measured. Recommended after SPLX tests `[P18 · 2025-10-25 · opened P1 · R3]` | Two fetches per page | Gap: no study |

### (c) What a user or buyer can do today
- Do not give a browsing agent access to email, payments or private files while it reads untrusted pages.
- Keep confirmation prompts on for any action the agent takes after reading the web.
- Builders: use allowed_domains, cap max_uses, and restrict which URLs can be fetched `[S23 · undated, opened 2026-10-25 · opened · R2]`.
- Treat a sudden, glowing recommendation from a single page as a warning sign.

---

## 11. Architecture families for reliable web research agents

| Family | How it works | When it wins | Where it breaks | Maturity | Named real examples |
|---|---|---|---|---|---|
| A. Single search-call RAG ("answer engine") | Rewrite the question, run one or a few searches, read snippets or spans, write one answer with links | Simple, current, single-fact questions. Fast and cheap | Mind2Web 2: ChatGPT Search 6% and Perplexity Pro Search 8% on long live-web tasks `[P04 · 2025-06-26 · opened P1 · R1]`. Most exposed to #1, #5, #6 | Highest. Runs at consumer scale | Google AI Overviews, ChatGPT search, Perplexity Sonar (listed as Perplexity's grounded search model) `[S56 · undated, opened 2026-10-25 · opened · R2]`, Gemini API grounding with Google Search `[S45 · 2026-10-13 · opened · R2]` |
| B. Iterative ReAct search agent | One model loops think, search, read, then decides to stop | Developer and documentation tasks, targeted lookups where the agent can follow links. ReAct beat imitation and RL baselines by 34 points on ALFWorld and 10 on WebShop [VENDOR] `[S51 · 2022-10-06 · opened · R1]` | Premature stops and ineffective queries `[S48 · 2026-10-21 · opened (PDF) · R3]`. Context grows, budgets cap depth | Production in coding agents | Claude Code WebSearch and WebFetch `[P08 · undated · opened P1 · R2]`, Anthropic API web search with max_uses `[S22 · undated, opened 2026-10-25 · opened · R2]`, Search-R1 (research) `[S14 · 2025-03-12 · opened · R3]` |
| C. Deep research orchestrator with sub-agents | A lead agent plans, sub-agents search in parallel, the lead writes the report, sometimes with a citation pass | Broad, multi-entity research. Best scores on Mind2Web 2 (OpenAI Deep Research 28%, human 54%) `[P04 · 2025-06-26 · opened P1 · R1]`. Anthropic reports 90.2% over single agent [VENDOR] `[S10 · 2025-06-13 · opened · R6]` | About 15 times chat tokens `[S10 · 2025-06-13 · opened · R6]`. More invented URLs (Gemini Deep Research 13.3%) `[P07 · 2026-04-03 · opened P1 · R2]`. One traced deep research agent showed synthesis hallucination in 80 traced tasks, another goal drift in 51 `[S48 · 2026-10-21 · opened (PDF) · R3]`. Leaves out what the searches never found `[S46 · 2025-02-25 · opened · R5]` | In production since 2025, still young | Claude Research `[S10 · 2025-06-13 · opened · R6]`, OpenAI Deep Research, Gemini Deep Research `[S52 · undated, opened 2026-10-25 · opened · R2]`, Stanford STORM (organisation up 25% absolute, coverage up 10%) `[S42 · 2024-02-22 · opened · R1]` |
| D. Retrieve-then-verify pipeline with a separate checker | Any of A to C writes a draft, then a separate stage checks each claim and link and revises or flags | Reports that will be forwarded, regulated or client-facing work, where every claim must be backed | Checks support, not truth `[S37 · 2026-05-27 · opened · R3]`. Adds cost per claim. Cannot add facts the search never found | Parts are GA. Full pipelines are custom builds | Google check grounding API `[S44 · 2026-10-22 · opened · R2]`, Anthropic CitationAgent `[S10 · 2025-06-13 · opened · R6]`, RARR `[S03 · 2022-10-17 · opened · R1]`, SAFE `[S02 · 2024-03-27 · opened · R1]`, URL checker by Rao and colleagues `[P07 · 2026-04-03 · opened P1 · R2]` |
| E. Human-in-the-loop research desk | People approve the plan, steer during the run and check key claims before release | High-stakes briefs and anything said out loud to a client. In Co-STORM, about 70% of users preferred it to a search engine and 78% to a RAG chatbot `[S43 · 2024-08-27 · opened · R1]` | Slow and costly. People rarely check sources (Pew: 1% click a link inside an AI summary, per Phase 1) `[P34 · 2025-07-22 · opened P1 · R2]` | Plan approval is GA. A full desk is a process, not a product | Gemini Deep Research "Edit plan" `[S52 · undated, opened 2026-10-25 · opened · R2]`, ChatGPT Deep Research stop and adjust sources `[S54 · undated · not opened (403) · R7]`, Co-STORM `[S43 · 2024-08-27 · opened · R1]` |

Reading across the families:
- No single family fixes all ten. A is weakest on #1, #5 and #6. B and C fix #3 but raise #10 exposure and cost. D is the only family that targets #1 directly. E is the only one that reliably catches #8.
- The trace evidence argues for splitting stages. Yu and colleagues recommend separate planning, verification and repair stages, adaptive stopping with coverage checks for deep search, and staged synthesis for deep research `[S48 · 2026-10-21 · opened (PDF) · R3]`.
- A practical stack for a buyer is C or B for gathering, D as a fixed checking stage, and E's plan approval for high-stakes work.

---

## 12. Gaps

- No independent study measures the effect of tool failure notices (#2) or zero-source guards in a live product.
- Headless rendering cost and accuracy gain for AI agents (#7) has no independent numbers that I found.
- Disconfirming search, origin independence checks and cloaking checks have no measured studies.
- HALT has been tested only with 3B and 7B models, mostly on closed corpora.
- Most fix numbers come from abstracts. RARR, Self-RAG, context-faithful prompting, ReliabilityRAG and RA-RAG give no numbers on the abstract pages I opened.
- OpenAI pages (Atlas hardening, Deep Research help, the hallucination blog) returned 403, so their claims sit at R7 or rely on the arXiv version.
- I could not confirm that Gemini's "Double-check response" still exists. The help page I opened did not show it.
- No source tested any fix on Grok or Copilot specifically.

---

## 13. Source register

New sources opened in this session (2026-10-25) unless marked.

| ID | Source | Date | Opened | Rung | URL |
|---|---|---|---|---|---|
| S01 | Gao et al., Enabling LLMs to Generate Text with Citations (ALCE), EMNLP 2023 | 2023-05-24 | yes | R1 | https://arxiv.org/abs/2305.14627 |
| S02 | Wei et al., Long-form factuality (SAFE), NeurIPS 2024 [VENDOR] | 2024-03-27 | yes | R1 | https://arxiv.org/abs/2403.18802 |
| S03 | Gao et al., RARR, ACL 2023 [VENDOR] | 2022-10-17 | yes | R1 | https://arxiv.org/abs/2210.08726 |
| S04 | Dhuliawala et al., Chain-of-Verification [VENDOR] | 2023-09-20 | yes | R3 | https://arxiv.org/abs/2309.11495 |
| S05 | Anthropic, Introducing Citations on the API [VENDOR] | 2025-06-23 (as shown on page) | yes | R6 | https://claude.com/blog/introducing-citations-api |
| S07 | Hines et al., Spotlighting [VENDOR] | 2024-03-20 | yes | R3 | https://arxiv.org/abs/2403.14720 |
| S08 | Debenedetti et al., CaMeL, Defeating Prompt Injections by Design | 2025-03-24 | yes | R3 | https://arxiv.org/abs/2503.18813 |
| S09 | Willison, The Dual LLM pattern | 2023-04-25 (updated 2025-04-11) | yes | R5 | https://simonwillison.net/2023/Apr/25/dual-llm-pattern/ |
| S10 | Anthropic, How we built our multi-agent research system [VENDOR] | 2025-06-13 | yes | R6 | https://www.anthropic.com/engineering/multi-agent-research-system |
| S11 | Roh and Han, HALT, Findings of EMNLP 2026 | 2026-10 | yes (abstract and PDF) | R1 | https://aclanthology.org/2026.findings-emnlp.343/ |
| S12 | Press et al., Self-Ask, Findings of EMNLP 2023 | 2022-10-07 | yes | R1 | https://arxiv.org/abs/2210.03350 |
| S13 | Trivedi et al., IRCoT, ACL 2023 | 2022-12-20 | yes | R1 | https://arxiv.org/abs/2212.10509 |
| S14 | Jin et al., Search-R1 | 2025-03-12 | yes | R3 | https://arxiv.org/abs/2503.09516 |
| S15 | Kalai et al., Why Language Models Hallucinate (OpenAI authors) | 2025-09-04 | yes | R3 | https://arxiv.org/abs/2509.04664 |
| S16 | Wen et al., Know Your Limits: survey of abstention, TACL | 2024-07-25 | yes | R5 | https://arxiv.org/abs/2407.18418 |
| S17 | OpenAI, GPT-6 October deployment safety page [VENDOR] | 2026-10-07 | yes | R6 | https://deploymentsafety.openai.com/gpt-6-october |
| S18 | Asai et al., Self-RAG | 2023-10-17 | yes | R3 | https://arxiv.org/abs/2310.11511 |
| S19 | Walters, Chen and Toni, Retrieved but Not Read | 2026-10-15 | yes | R3 | https://arxiv.org/abs/2610.21731 |
| S20 | Unite.AI coverage of Retrieved but Not Read | 2026-10-16 | yes | R5 | https://www.unite.ai/ai-often-cites-web-pages-it-has-never-even-read/ |
| S21 | Vu et al., FreshLLMs and FreshPrompt [VENDOR] | 2023-10-05 | yes | R3 | https://arxiv.org/abs/2310.03214 |
| S22 | Anthropic, Web search tool docs | undated, read 2026-10-25 | yes | R2 | https://platform.claude.com/docs/en/agents-and-tools/tool-use/web-search-tool |
| S23 | Anthropic, Web fetch tool docs | undated, read 2026-10-25 | yes | R2 | https://platform.claude.com/docs/en/agents-and-tools/tool-use/web-fetch-tool |
| S24 | Zhou et al., Context-faithful Prompting, Findings of EMNLP 2023 | 2023-03-20 | yes | R1 | https://arxiv.org/abs/2303.11315 |
| S25 | Wang et al., Astute RAG, ACL 2025 [VENDOR] | 2024-10-09 | yes | R1 | https://arxiv.org/abs/2410.07176 |
| S26 | Beurer-Kellner et al., Design Patterns for Securing LLM Agents | 2025-06-10 | yes | R3 | https://arxiv.org/abs/2506.08837 |
| S27 | Pan et al., Credibility-aware Generation, EMNLP 2024 | 2024-04-10 | yes | R1 | https://arxiv.org/abs/2404.06809 |
| S28 | Debenedetti et al., AgentDojo | 2024-06-19 | yes | R3 | https://arxiv.org/abs/2406.13352 |
| S29 | Qin et al., Premise Verification via Retrieval-Augmented Logical Reasoning, TMLR 2026 | 2025-04-08 | yes (abstract and HTML) | R1 | https://arxiv.org/abs/2504.06438 |
| S30 | Wei et al., Simple synthetic data reduces sycophancy [VENDOR] | 2023-08-07 | yes | R3 | https://arxiv.org/abs/2308.03958 |
| S31 | Wu, Wu and Zou, ClashEval (arXiv page lists no venue) | 2024-04-16 | yes (abstract and HTML) | R3 | https://arxiv.org/abs/2404.10198 |
| S32 | IETF Web Bot Auth, HTTP Message Signatures for Bots, draft 00 | 2026-09-01 | yes | R2 | https://datatracker.ietf.org/doc/html/draft-ietf-webbotauth-httpsig-protocol-00 |
| S33 | LLM Pulse, AI content licensing deals (sells a visibility tool) | 2026-07-09 (updated 2026-09-28) | yes | R5 | https://llmpulse.ai/blog/ai-content-licensing-deals/ |
| S34 | Bi et al., Deep-Search Agents under Hierarchical Web Evidence Poisoning | 2026-09-05 | yes | R3 | https://arxiv.org/abs/2609.06027 |
| S35 | Shen et al., ReliabilityRAG, NeurIPS 2025 | 2025-09-27 | yes | R1 | https://arxiv.org/abs/2509.23519 |
| S36 | Hwang et al., RAG with Estimation of Source Reliability (RA-RAG) | 2024-10-30 | yes | R3 | https://arxiv.org/abs/2410.22954 |
| S37 | Seo et al., Verified Misguidance (CITETRACE) | 2026-05-27 | yes | R3 | https://arxiv.org/abs/2605.28565 |
| S38 | Anthropic, Prompt injection defenses for browser use [VENDOR] | 2025-11-24 | yes | R6 | https://www.anthropic.com/research/prompt-injection-defenses |
| S39 | OpenAI, Continuously hardening ChatGPT Atlas against prompt injection | 2025-12-22 | no (403) | R7 | https://openai.com/index/hardening-atlas-against-prompt-injection |
| S40 | Song et al., Trust-Score and Trust-Align, ICLR 2025 | 2024-09-17 | yes | R1 | https://arxiv.org/abs/2409.11242 |
| S41 | Kadavath et al., Language Models (Mostly) Know What They Know [VENDOR] | 2022-07-11 | yes | R3 | https://arxiv.org/abs/2207.05221 |
| S42 | Shao et al., STORM, NAACL 2024 | 2024-02-22 | yes | R1 | https://arxiv.org/abs/2402.14207 |
| S43 | Jiang et al., Co-STORM, EMNLP 2024 | 2024-08-27 | yes | R1 | https://arxiv.org/abs/2408.15232 |
| S44 | Google Cloud, Check grounding with RAG docs | 2026-10-22 (last updated) | yes | R2 | https://docs.cloud.google.com/generative-ai-app-builder/docs/check-grounding |
| S45 | Google, Gemini API grounding with Google Search docs | 2026-10-13 (last updated) | yes | R2 | https://ai.google.dev/gemini-api/docs/google-search |
| S46 | Willison, notes on OpenAI deep research system card | 2025-02-25 | yes | R5 | https://simonwillison.net/2025/Feb/25/deep-research-system-card/ |
| S47 | Zhan et al., Why Your Deep Research Agent Fails (PING taxonomy) | 2026-01-30 | yes | R3 | https://arxiv.org/abs/2601.22984 |
| S48 | Yu, Tang, Chu and Han, Benchmarking and Error Analysis of Deep Search and Deep Research Agents, ICML 2026 FAGEN workshop | 2026-10-21 | yes (abstract and PDF) | R3 | https://arxiv.org/abs/2610.29346 |
| S49 | Cloudflare, Markdown for Agents [VENDOR for savings] | 2026-02-12 | yes | R2 feature, R6 savings | https://blog.cloudflare.com/markdown-for-agents/ |
| S50 | An et al., FRESCO (Meta and UCLA) [VENDOR] | 2026-04-14 | yes | R3 | https://arxiv.org/abs/2604.14227 |
| S51 | Yao et al., ReAct, ICLR 2023 [VENDOR] | 2022-10-06 | yes | R1 | https://arxiv.org/abs/2210.03629 |
| S52 | Google, Use Deep Research in Gemini Apps (help page) | undated, read 2026-10-25 | yes | R2 | https://support.google.com/gemini/answer/15719111 |
| S53 | Google, View related sources and double-check responses (help page) | undated, read 2026-10-25 | yes, feature not shown | R7 | https://support.google.com/gemini/answer/14143489 |
| S54 | OpenAI, Deep research in ChatGPT (help page, Manage sites) | undated | no (403), search snippet only | R7 | https://help.openai.com/en/articles/10500283-deep-research-in-chatgpt |
| S55 | Perplexity, OpenAI compatibility docs (search_domain_filter, recency filter) | undated | no, search snippet only | R7 | https://docs.perplexity.ai/docs/sonar/openai-compatibility |
| S56 | Perplexity, Models page (Sonar) | undated, read 2026-10-25 | yes | R2 | https://docs.perplexity.ai/getting-started/models |

Phase 1 sources reused (opened in Phase 1, not reopened unless noted).

| ID | Source | Date | Opened | Rung | URL |
|---|---|---|---|---|---|
| P01 | Tow Center, AI search has a citation problem | 2025-03-06 | P1 | R1 | https://www.cjr.org/tow_center/we-compared-eight-ai-search-engines-theyre-all-bad-at-citing-news.php |
| P02 | EBU and BBC, News Integrity in AI Assistants | 2025-10-21 | P1 | R1 | https://www.ebu.ch/research/open/report/news-integrity-in-ai-assistants |
| P03 | Suzgun et al., Evaluating Commercial AI Chatbots as News Intermediaries | 2026-05-21 | yes (reopened) | R3 | https://arxiv.org/abs/2605.22785 |
| P04 | Mind2Web 2, NeurIPS 2025 D&B | 2025-06-26 | P1 | R1 | https://arxiv.org/html/2506.21506 |
| P05 | BrowseComp-Plus | 2025-08-08 | P1 | R1 | https://arxiv.org/html/2508.06600 |
| P06 | DeepResearch Bench (FACT) | 2025-06-13 | P1 | R2 | https://arxiv.org/html/2506.11763 |
| P07 | Rao, Wong and Callison-Burch, reference hallucinations in deep research agents | 2026-04-03 | P1 | R2 | https://arxiv.org/html/2604.03173 |
| P08 | Claude Code tools reference | undated, read 2026-10-25 in P1 | P1 | R2 | https://code.claude.com/docs/en/tools-reference |
| P09 | Claude Code changelog | entries 2025 to 2026-10-21 | P1 | R2 | https://code.claude.com/docs/en/changelog |
| P10 | Vercel, The rise of the AI crawler | 2024-12-17 | P1 | R4 | https://vercel.com/blog/the-rise-of-the-ai-crawler |
| P11 | Cloudflare press release, AI crawlers blocked by default | 2025-07-01 | P1 | R2 | https://www.cloudflare.com/press/press-releases/2025/cloudflare-just-changed-how-ai-crawlers-scrape-the-internet-at-large/ |
| P12 | CJR, How AI browsers sneak past blockers and paywalls | 2025-10-30 | P1 | R3 | https://cjr.org/analysis/how-ai-browsers-sneak-past-blockers-and-paywalls.php |
| P13 | Unit 42, AI agent prompt injection in the wild | 2026-03-03 | P1 | R4 | https://unit42.paloaltonetworks.com/ai-agent-prompt-injection/ |
| P14 | Brave, Comet prompt injection | 2025-08-20 | P1 | R3 | https://brave.com/blog/comet-prompt-injection/ |
| P16 | Liu et al., Lost in the Middle, TACL | 2023-11-20 (v3) | P1 | R1 | https://arxiv.org/abs/2307.03172v3 |
| P17 | Chroma, Context Rot | 2025-07-14 | P1 | R3 | https://www.trychroma.com/research/context-rot |
| P18 | SPLX, AI-targeted cloaking and Atlas | 2025-10-25 | P1 | R3 | https://splx.ai/blog/ai-targeted-cloaking-openai-atlas |
| P19 | Aggarwal et al., GEO, KDD 2024 | 2024-06-28 (v3) | P1 | R1 | https://arxiv.org/abs/2311.09735v3 |
| P21 | Bevendorff et al., Is Google getting worse?, ECIR 2024 | 2024 | P1 | R1 | https://gwern.net/doc/technology/google/2024-bevendorff.pdf |
| P23 | Search Arena, ICLR 2026 | 2025-06-05 | P1 | R3 | https://arxiv.org/abs/2506.05334 |
| P25 | Full Fact, AI benchmark report one | 2026-10-15 | P1 | R1 | https://fullfact.org/ai-benchmark/report-one/ |
| P26 | Google, FRAMES [VENDOR] | 2024-09-19 | P1 | R2 | https://arxiv.org/abs/2409.12941 |
| P27 | xponent21, Claude web search uses Brave and turbopuffer (reports Profound rerun) | 2026-07-02 | P1 | R5 | https://xponent21.com/insights/claude-web-search-brave-turbopuffer/ |
| P29 | Ai2, knowledge cutoffs ("Dated Data") | 2025-10-24 | P1 | R5 | https://allenai.org/blog/knowledge-cutoffs |
| P31 | Google Search Central, AI features and your website | 2025-12-10 | P1 | R2 | https://developers.google.com/search/docs/appearance/ai-features |
| P32 | Claude Code security docs | undated | P1 | R2 | https://code.claude.com/docs/en/security |
| P33 | GitHub issue 51783, WebFetch truncation | 2026-04-22 | P1 | R3 | https://github.com/anthropics/claude-code/issues/51783 |
| P34 | Pew Research, Google users less likely to click links with AI summary | 2025-07-22 | P1 | R2 | https://www.pewresearch.org/short-reads/2025/07/22/google-users-are-less-likely-to-click-on-links-when-an-ai-summary-appears-in-the-results/ |

Also referenced: Phase 1 U3 brief mechanism M4 (PDF extraction session note), `AI_Web_Search_Failures_research/U3_builder_mechanisms.md`, 2026-10-25, R3.
