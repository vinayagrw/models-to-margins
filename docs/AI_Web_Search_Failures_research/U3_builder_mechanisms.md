# U3 Builder brief: why AI assistants and agents miss the right details on the web

Strand: builders and practitioners (engineering blogs, vendor docs, papers, practitioner write-ups)
Prepared: 2026-10-25
Window for "recent": 2026-09-25 to 2026-10-25

## How to read this brief

Pipeline stages used throughout: understand query, plan, search, fetch, read/extract, rank/filter, reconcile, synthesise, cite.

Evidence ladder: 1 audited or reproduced, 2 primary record or spec, 3 revealed behaviour, 4 deployment scale, 5 credible secondary, 6 self-report, 7 vendor claim or unopened.

Conventions I used for the ladder:
- Peer-reviewed controlled experiments and independent audits are rung 1.
- Preprints not yet peer reviewed are rung 3 (behaviour revealed under test).
- A vendor describing its own product is rung 2 when it is a spec or doc, and rung 6 or 7 when it is a performance or business claim.
- Anything I could only see in a search snippet, and could not open, is rung 7 and is flagged.

Every URL below was opened in this session unless marked "not opened". Quotes are verbatim, one per source at most, under 15 words.

Session note (rung 3, 2026-10-25): while doing this research with Claude Code, several of the mechanisms below happened to me directly. help.openai.com, searchengineland.com, axios.com and openai.com returned HTTP 403 to WebFetch. One PDF (the Bevendorff paper on gwern.net) came back from WebFetch as unreadable compressed streams, and the summariser model said it could not answer. The Claude Code changelog page was read only to 100,000 of about 1,105,050 characters, and the tool said so and offered an offset. I fell back to curl and a local PDF parser to get the text. These are single observations, not measurements, but they match the documented behaviour.

---

## 1. Mechanism table by pipeline stage

| # | Stage | Mechanism | What breaks | Best rung | Impact |
|---|---|---|---|---|---|
| M1 | fetch | Bot blocking, robots.txt, Cloudflare defaults | Page never reaches the model, answer is built from copies or memory | 1 to 2 | Very high |
| M2 | fetch | Paywalls and login walls | Chat products refuse or read only a teaser, agent browsers behave differently | 3 | High |
| M3 | fetch, read | JavaScript-rendered pages | Crawlers and fetch tools see an empty shell | 2 to 4 | High |
| M4 | read/extract | PDF and table extraction | Tables lose structure, PDFs fail to parse or are skipped | 2 to 3 | Medium to high |
| M5 | read/extract | Snippet-only reading instead of full page fetch | Answer comes from a search snippet, often stale, citation may not support it | 3 (2026-10) | Very high |
| M6 | read/extract | Fetch truncation and summarisation by a smaller model (Claude Code WebFetch) | Long pages cut, extraction prompt filters what the main model sees | 2 | High for Claude Code |
| M7 | search | Which index each product uses, and index lag | Different products see different web, fresh pages missing | 2 to 5 | High |
| M8 | understand query, plan, search | Query formulation and reformulation, query fan-out | Wrong or narrow sub-queries, user framing baked into queries | 2 to 3 | High |
| M9 | plan, search | Retrieval depth and early stopping | Agent stops after a shallow pass, or loops on near-duplicate queries | 1 to 3 | High |
| M10 | read, reconcile | Context window truncation, "lost in the middle", context rot | Relevant evidence present but ignored | 1 | Medium to high |
| M11 | rank/filter | Source quality ranking, SEO spam, AI-generated content | Low-quality or syndicated pages outrank originals | 1 | High |
| M12 | rank/filter, synthesise | GEO and LLM-targeted manipulation, AI-targeted cloaking | Page content shaped for or served only to AI crawlers sways answers | 1 to 3 | High and rising |
| M13 | read, synthesise | Indirect prompt injection in web pages | Hidden text overrides user intent, can exfiltrate data | 1 to 4 | High |
| M14 | understand query, reconcile | Sycophancy and premise-following | False premise in the question is accepted and searched for | 3 | High |
| M15 | understand query, reconcile | Entity disambiguation | Facts from two people or firms with the same name are merged | 1 | Medium |
| M16 | understand query, reconcile | Date reasoning and stale effective cutoffs | Wrong "now", outdated facts presented as current | 1 to 3 | High |
| M17 | reconcile | Knowledge conflict, memory versus retrieved results | Model overrides good evidence with memory, or adopts bad evidence | 1 | High |
| M18 | cite | Citation and attribution errors | Wrong URL, syndicated copy, fabricated link | 1 | High |

Impact is my judgement from how often the mechanism shows up across independent sources and how hard it is for a user to notice.

---

## 2. Each mechanism: why it happens and the evidence

### M1. Bot blocking, crawler access, robots.txt, licensing deals and lawsuits (stage: fetch)

What breaks: the product cannot fetch the page it needs. It then answers from a syndicated copy, another outlet, or training memory, and often does not say so.

Why: publishers and CDNs now block AI crawlers by default or by contract, and some products then route around the block in ways that change which sources they see.

Evidence:
- Cloudflare, 2025-07-01, press release. Cloudflare said it was the first infrastructure provider to block AI crawlers by default, asked every new domain whether to allow them, and noted more than one million customers had already chosen one-click AI blocking since 2024-09. https://www.cloudflare.com/press/press-releases/2025/cloudflare-just-changed-how-ai-crawlers-scrape-the-internet-at-large/ (rung 2 for the policy)
- Engadget, 2026-07-02. From 2026-09-15 Cloudflare defaults allow search but block training and agent use on pages with ads for new customers, new sites and free accounts unless they opt out. Mixed-use crawlers that do not let sites choose are blocked by default on ad pages. Pay Per Crawl is being replaced by Pay Per Use, which pays when content appears in an answer. Named partners were Ceramic.AI and You.com. https://www.engadget.com/2207360/cloudflare-will-filter-out-web-crawlers-that-serve-ai-companies/ (rung 5)
- Press Gazette, 2026-08-17. Cloudflare says blocking creates "reliable scarcity" and more licensing. It says pay-per-crawl was still in closed beta, and it is piloting with OpenAI on crawling only updated pages. It also said mixed-purpose crawlers would include Googlebot unless Google separates its crawlers first. https://pressgazette.co.uk/platforms/cloudflare-says-bot-blocking-is-fueling-publisher-ai-deals/ (rung 5, Cloudflare claims within are rung 7)
- Cloudflare blog, 2025-08-04. On new, unindexed test domains with a full robots.txt disallow, Perplexity still returned detailed content. When its declared bots were blocked it switched to a Chrome-on-macOS user agent, unlisted IPs and other ASNs. Declared crawler about 20 to 25 million requests a day, stealth crawler about 3 to 6 million. ChatGPT-User fetched robots.txt and stopped when disallowed. When the stealth crawler was also blocked, Perplexity answers became less specific and lacked details from the original. https://blog.cloudflare.com/perplexity-is-using-stealth-undeclared-crawlers-to-evade-website-no-crawl-directives/ (rung 3, vendor test, disputed by Perplexity)
- OpenAI bots doc, undated, opened 2026-10-25. Blocking OAI-SearchBot removes a site from ChatGPT search answers apart from navigational links. ChatGPT-User acts on user requests, and OpenAI says "robots.txt rules may not apply." Changes take about 24 hours. https://developers.openai.com/docs/bots (rung 2)
- Claude Code tools reference, opened 2026-10-25. WebFetch sends a User-Agent starting with Claude-User and prefers Markdown via the Accept header. The API web fetch tool returns url_not_allowed for robots.txt and other Anthropic-side restrictions. https://code.claude.com/docs/en/tools-reference and https://platform.claude.com/docs/en/agents-and-tools/tool-use/web-fetch-tool (rung 2)
- Longpre et al., "Consent in Crisis", NeurIPS 2024. Audit of 14,000 domains. In one year (2023 to 2024) about 5% of C4 tokens and 28% or more of the most critical C4 sources became fully restricted, and Terms of Service restrict 45% of C4. https://proceedings.neurips.cc/paper_files/paper/2024/hash/c3738949a80306cc48a8ea8ba0560f9d-Abstract.html (rung 1)
- Tow Center, CJR, 2025-03. In 1,600 queries across eight tools, ChatGPT, Perplexity and Perplexity Pro sometimes answered about publishers that block them. Perplexity free identified all ten paywalled National Geographic excerpts despite the block. Tools often cited Yahoo or AOL reprints instead of originals, and licensing deals did not guarantee accurate citation. https://www.cjr.org/tow_center/we-compared-eight-ai-search-engines-theyre-all-bad-at-citing-news.php (rung 1)
- Reddit v. Perplexity, SerpApi, Oxylabs, AWMProxy, filed 2025-10-22 (S.D.N.Y.). Reddit alleges defendants scraped Reddit content from Google results pages to get around Reddit's own blocks. Allegations only. https://ny1.com/nyc/all-boroughs/ap-top-news/2025/10/22/reddit-sues-ai-company-perplexity-and-others-for-industrial-scale-scraping-of-user-comments (rung 5 report of a rung 2 filing)
- Dow Jones and NY Post v. Perplexity. Startup Fortune, 2026-10-22, says the case is heading to a 10 to 14 day jury trial. The amended complaint alleges invented quotes attributed to the Wall Street Journal. The article is internally inconsistent on the discovery date. https://startupfortune.com/dow-jones-and-new-york-post-press-copyright-case-as-perplexity-nears-trial/ (rung 5)

Mitigations seen: declared and verifiable crawlers with published IP ranges (OpenAI, Anthropic), honouring robots.txt for crawl bots, licensing deals, Pay Per Use pilots, and for builders, telling the model when a fetch was refused instead of silently falling back.

### M2. Paywalls and login walls (stage: fetch)

What breaks: chat products refuse or see only teasers. Agent browsers that act as the user can read client-side paywalled text, which means the same question gets different evidence depending on the surface.

Evidence:
- CJR, 2025-10-30. Atlas and Comet returned the full text of a roughly 9,000-word subscriber-only MIT Technology Review article, while standard ChatGPT and Perplexity said they were blocked. Client-side paywalls load the full text and hide it with a pop-up, so agents can read it. Server-side paywalls (WSJ, Bloomberg) withhold text until login. Atlas appeared to avoid publishers suing OpenAI and built composite summaries from tweets, syndicated copies and other outlets instead. https://cjr.org/analysis/how-ai-browsers-sneak-past-blockers-and-paywalls.php (rung 3)
- Anthropic web fetch doc: dynamic pages and logged-in content need the separate browser-use tool, not fetch. https://platform.claude.com/docs/en/agents-and-tools/tool-use/web-fetch-tool (rung 2)

Why it matters for accuracy: the workaround path (other outlets, syndication) is where attribution errors and stale copies creep in, see M18.

Mitigations seen: server-side paywalls, licensing, products that tell the user the original was unreachable. No vendor I found documents a standard "paywalled, answer is partial" signal to users.

### M3. JavaScript-rendered pages (stage: fetch, read)

What breaks: if content is built in the browser by JavaScript, a crawler or fetch tool that does not run JavaScript sees little or nothing.

Evidence:
- Vercel, 2024-12-17. Network data shows OAI-SearchBot, ChatGPT-User, GPTBot, ClaudeBot, PerplexityBot, Meta-ExternalAgent, Bytespider and CCBot do not render JavaScript. Gemini (via Googlebot infrastructure) and AppleBot do. ChatGPT and Claude crawlers hit 404s on about 34% of fetches versus about 8% for Googlebot. https://vercel.com/blog/the-rise-of-the-ai-crawler (rung 4)
- Anthropic web fetch doc, current: the tool "currently does not support websites dynamically rendered with JavaScript" and points to the browser-use tool. https://platform.claude.com/docs/en/agents-and-tools/tool-use/web-fetch-tool (rung 2)
- Claude Code changelog 2.1.105, 2026-04-13: WebFetch now strips style and script contents so CSS-heavy pages no longer use up the content budget before the real text. https://code.claude.com/docs/en/changelog (rung 2)

Mitigations seen: server-side rendering by site owners, Markdown content negotiation (Claude Code sends an Accept header preferring Markdown), and handing off to a real browser tool for dynamic pages.

### M4. PDF and table extraction (stage: read/extract)

What breaks: PDFs are skipped, fail to parse, or lose table structure (merged cells, multi-level headers, swapped columns).

Evidence:
- Anthropic web fetch doc: PDFs are returned as base64 and processed like an attached PDF. The max_content_tokens limit applies to text, not to binary content such as PDFs. A 500 kB research PDF is about 125,000 tokens. https://platform.claude.com/docs/en/agents-and-tools/tool-use/web-fetch-tool (rung 2)
- Claude Code tools reference: WebFetch converts HTML to Markdown, the conversion step is not configurable. Changelog notes WebFetch now saves binary responses alongside its summary. https://code.claude.com/docs/en/tools-reference and https://code.claude.com/docs/en/changelog (rung 2)
- This session, 2026-10-25: a WebFetch of a PDF on gwern.net returned unreadable compressed streams to the summariser, which could not recover the title or findings. A local parser (pypdf) on the saved file extracted the abstract at once. (rung 3, single observation)
- OmniDocBench, arXiv 2412.07626, opened only via search results. Secondary leaderboards report general LLMs trailing specialised OCR models on table structure scores. https://arxiv.org/html/2412.07626v2 (not opened, rung 7 for the numbers)

Mitigations seen: dedicated document parsers before the LLM, code-based filtering of fetched content (Anthropic "dynamic filtering"), and keeping the binary so a second tool can parse it.

### M5. Snippet-only reading versus full-page fetch (stage: read/extract)

What breaks: the model answers from the short search snippet without opening the page. Snippets can be old, partial, or out of context, and the citation then points to a page whose full text does not back the claim.

Evidence:
- Walters, Chen and Toni, "Retrieved but Not Read", arXiv 2610.21731, submitted 2026-10-15. Built facts that changed after model cutoffs. Found models often answer from snippets without opening pages, and this goes with more outdated answers and unfaithful citations. Even when evidence shifts internal predictions, final answers can still favour outdated information. https://arxiv.org/abs/2610.21731 (rung 3, preprint)
- Unite.AI coverage, 2026-10-16, reports figures from that paper: with identical search results, models answered 2.6% to 76.0% of episodes without opening any page. GPT-5.6 Luna with its own built-in search answered 53.6% of episodes from snippets alone. Snippet-only answers were outdated 6.4% of the time versus 1.3% when an opened page was cited. When an answer was outdated, 81.8% of its citations contradicted it. https://www.unite.ai/ai-often-cites-web-pages-it-has-never-even-read/ (rung 5, numbers not checked against the PDF)
- Claude Code WebSearch returns only titles and URLs, so Claude must call WebFetch to read anything. https://code.claude.com/docs/en/tools-reference (rung 2). The API web search result carries page_age and encrypted content, and citations carry up to 150 characters of cited text. https://platform.claude.com/docs/en/agents-and-tools/tool-use/web-search-tool (rung 2)
- Perplexity says its Search API returns ranked sub-document spans rather than whole pages. https://www.perplexity.ai/hub/blog/architecting-and-evaluating-an-ai-first-search-api (rung 6, 2025-09-25)

Mitigations seen: force a full fetch before citing, give the model the right page (the Unite.AI summary reports outdated-answer failures falling sharply when the correct page was supplied), and log whether each citation came from an opened page.

### M6. Claude Code WebFetch: truncation and summarisation by a smaller model (stage: read/extract)

What breaks: the main model never sees the page. A separate model call answers an extraction prompt over the page, and long pages were cut at a fixed size.

Evidence, primary:
- Tools reference, opened 2026-10-25: WebFetch converts HTML to Markdown, then "for most fetches" runs the prompt in a separate model call and Claude receives that result, not the raw page. The doc says "This makes WebFetch lossy by design." A result saying a page does not mention something may only mean the prompt did not ask. It reads up to 100,000 characters per call. From v2.1.290 the result says how much went unread. Cache 15 minutes by default. Cross-host redirects are returned, not followed. Five-minute download deadline. Localhost and dotless hosts refused. Preapproved documentation domains fetch without a prompt. https://code.claude.com/docs/en/tools-reference (rung 2)
- Security doc: the separate model call is also listed as a safeguard against prompt injection. https://code.claude.com/docs/en/security (rung 2)
- Changelog (rung 2), https://code.claude.com/docs/en/changelog:
  - 2.1.117, 2026-04-22: fixed WebFetch hanging on very large HTML by truncating input before HTML-to-Markdown conversion.
  - 2.1.290, 2026-10-05: fixed WebFetch silently dropping page text past 100,000 characters, it now reports the unread amount and takes an offset.
  - 2.1.299, 2026-10-14: WebFetch page reads now pick effort like web searches, the caller's level on the caller's own model, otherwise the small model.
  - 2.1.212, 2026-07-17: added a session limit on WebSearch calls (default 200) to stop runaway search loops. 2.1.290 changed this to refill at 100 calls per hour.
- GitHub issue 51783, opened 2026-04-22, closed 2026-08-17. A user reported a 2.5 MB GitHub API response cut off at an alphabetical prefix, after which the summariser wrongly said the repo had no packages directory. The fix was a docs note. https://github.com/anthropics/claude-code/issues/51783 (rung 3)

Evidence, secondary (code inspection, may be out of date):
- mikhail.io, 2025-10-06: Turndown for HTML to Markdown, 100 KB truncation, Claude Haiku 3.5 as summariser with an empty system prompt, 125-character quote cap. https://mikhail.io/2025/10/claude-code-web-tools/ (rung 5)
- trevorfox.com, 2026-04-02: 100,000-character cut, 125-character quote cap for non-preapproved domains, 119 preapproved domains, up to 8 backend searches per WebSearch call. https://trevorfox.com/2026/04/how-claude-code-search-actually-works/ (rung 5)

API tool contrast: the API web fetch tool returns full text into Claude's own context, capped by max_content_tokens, can only fetch URLs already seen in the conversation, does not run JavaScript, and caches by default with a use_cache flag in newer versions. https://platform.claude.com/docs/en/agents-and-tools/tool-use/web-fetch-tool (rung 2)

Mitigations: ask a narrower extraction question, fetch again with an offset, use curl through Bash for raw content, or use the API tool with dynamic filtering.

### M7. Which index each product uses, and index lag (stage: search)

What breaks: each product searches a different slice of the web, ranked differently, refreshed at different speeds. A page can exist and still be invisible to one assistant.

Evidence by product:
- Claude: xponent21, 2026-07-02, reports Anthropic's subprocessor list names Brave Search (added 2025-03-19) and turbopuffer (added 2026-05-06) under web search. A Profound re-run of about 400 queries in 2026-06 found 79.2% overlap with Brave's top 10, and Claude and ChatGPT citations overlapped about 8%. https://xponent21.com/insights/claude-web-search-brave-turbopuffer/ (rung 5, subprocessor list itself not opened, rung 7). Claude Code docs say the backend is "not configurable". https://code.claude.com/docs/en/tools-reference (rung 2)
- ChatGPT: OpenAI's help article says ChatGPT search rewrites queries and sends them to third-party search providers (seen in search snippets only, the page returned 403 in this session, rung 7). OAI-SearchBot controls inclusion in ChatGPT search. https://developers.openai.com/docs/bots (rung 2)
- Gemini: grounding with Google Search. The model decides whether to search, writes one or more queries and returns citations and the queries it ran. Last updated 2026-10-13. https://ai.google.dev/gemini-api/docs/google-search (rung 2)
- Google AI Overviews and AI Mode: a supporting link must be indexed and eligible for a snippet, and nosnippet or noindex controls apply. Updated 2025-12-10. https://developers.google.com/search/docs/appearance/ai-features (rung 2)
- Perplexity: own index, over 200 billion URLs, ML model decides when to re-crawl, freshness traded against completeness under a fixed budget. 2025-09-25. https://www.perplexity.ai/hub/blog/architecting-and-evaluating-an-ai-first-search-api (rung 6)
- Copilot and Azure agents: Microsoft retired the Bing Search APIs on 2025-08-11 and points builders to Grounding with Bing Search in Azure AI Agents, which returns grounded summaries rather than raw results. https://learn.microsoft.com/en-us/lifecycle/announcements/bing-search-api-retirement (rung 2)
- Grok: I found only third-party docs saying xAI moved search to server-side web_search and x_search tools. The underlying index is not documented in anything I opened. (gap)

Index lag:
- Anthropic web fetch caches by default, and content "might not always reflect the latest version". https://platform.claude.com/docs/en/agents-and-tools/tool-use/web-fetch-tool (rung 2)
- Google says recrawling to pick up snippet controls can take days to months. https://developers.google.com/search/docs/appearance/ai-features (rung 2)
- EBU and BBC study, reported 2025-10-24: about one in five of over 3,000 answers had major accuracy issues including outdated information, for example ChatGPT naming Pope Francis as pope weeks after his death. https://theregister.com/2025/10/24/bbc_probe_ai_news (rung 1 audit, via rung 5 report)

### M8. Query formulation, reformulation and fan-out (stage: understand query, plan, search)

What breaks: the system turns the user's words into search queries. If the rewrite narrows, drops a constraint, or carries a false premise, the right page is never retrieved.

Evidence:
- Google: AI Overviews and AI Mode may use query fan-out, "issuing multiple related searches across subtopics and data sources". https://developers.google.com/search/docs/appearance/ai-features (rung 2)
- Gemini API returns the queries it ran, which is the main debugging aid. https://ai.google.dev/gemini-api/docs/google-search (rung 2)
- Claude Code: one WebSearch call may run up to eight backend searches and refine internally. https://code.claude.com/docs/en/tools-reference (rung 2). trevorfox reports the main model writes the query and a secondary model is forced to call search. (rung 5)
- ChatGPT help article (snippet only, 403 when opened): queries are rewritten into targeted queries and may use Memory. (rung 7)
- Changelog 1.0.36 (2025): "Web search now takes today's date into context", a direct fix for wrong-year queries. https://code.claude.com/docs/en/changelog (rung 2)

Mitigations seen: exposing the generated queries, fan-out across sub-questions, adding today's date to the search context.

### M9. Retrieval depth and early stopping (stage: plan, search)

What breaks: the agent settles on the first plausible answer after a shallow pass, or wanders and repeats near-identical queries after empty results. Budgets and turn limits also cap depth.

Evidence:
- BrowseComp, arXiv 2504.12516, 2025-04-16: 1,266 questions that need persistent navigation for hard-to-find, entangled facts. https://arxiv.org/abs/2504.12516 (rung 2 as a benchmark spec). Secondary sources report GPT-4o with browsing at 1.9% and Deep Research at 51.5% at launch. (rung 5, OpenAI page returned 403 here)
- HALT, Findings of EMNLP 2026 (2026-10): stopping policy that halts only when gathered evidence supports each required claim, reports less redundant search with exact match largely kept. https://aclanthology.org/2026.findings-emnlp.343/ (rung 1, numbers not on the abstract page)
- Yu, Tang, Chu and Han, arXiv 2610.29346, submitted 2026-10-21: error taxonomy for deep search and deep research agents split into system-level and task-level errors, based on step traces. https://arxiv.org/abs/2610.29346 (rung 3)
- Claude Code: session cap on WebSearch calls (default 200, refills 100 per hour since 2.1.290). When the budget is used up, Claude is told to continue with what it has and say so. 2.1.307 (2026-10-21) also tells it not to work around the cap through a browser. https://code.claude.com/docs/en/tools-reference and changelog (rung 2)
- Anthropic web search doc: simple factual queries typically use 1 to 3 searches, multi-entity research 10 or more, and max_uses caps it. https://platform.claude.com/docs/en/agents-and-tools/tool-use/web-search-tool (rung 2)

Mitigations seen: claim-coverage stopping (HALT), explicit budgets with an honest "I ran out" message, trace-level evaluation rather than only final accuracy.

### M10. Context window truncation, lost in the middle, context rot (stage: read, reconcile)

What breaks: the right evidence is in context but the model does not use it, especially when it sits mid-context or among similar distractors.

Evidence:
- Liu et al., TACL 2023 (arXiv 2307.03172, v3 2023-11-20): U-shaped accuracy, "performance is often highest when relevant information occurs at the beginning or end" of the input. https://arxiv.org/abs/2307.03172v3 (rung 1)
- Chroma, "Context Rot", 2025-07-14: 18 models. Performance degrades with input length, related distractors hurt more, and focused prompts beat full prompts on LongMemEval. Notably, needle position caused no notable variation in their setup, so the middle effect is task-dependent. https://www.trychroma.com/research/context-rot (rung 3, vendor technical report)
- FreshLLMs (arXiv 2310.03214, 2023): the number and order of retrieved evidence both change answer correctness. https://arxiv.org/abs/2310.03214v2 (rung 1)

Mitigations seen: rerank and put the best evidence at the edges, filter before loading (Anthropic dynamic filtering runs code over results before they reach context), keep prompts focused.

### M11. Source quality ranking, SEO spam, AI-generated content (stage: rank/filter)

What breaks: the search layer hands the model pages that rank well but are thin, affiliate-driven, syndicated or machine-written.

Evidence:
- Bevendorff et al., ECIR 2024: a year of 7,392 product review queries on Google, Bing and DuckDuckGo. All engines had significant problems with highly optimised affiliate content, more than a ClueWeb22 baseline. The authors expect generative AI to make the spam line blurrier. https://gwern.net/doc/technology/google/2024-bevendorff.pdf (rung 1)
- Graphite with GPTZero, 2026-05-19: about 50% of new online articles are primarily AI-generated, flat since Q1 2025. A separate Graphite study says such articles largely do not appear in Google and ChatGPT results. https://gptzero.me/news/ai-written-web/ (rung 5)
- Tow Center 2025: tools often cited Yahoo or AOL reprints over originals. (rung 1, URL in M1)

Mitigations seen: domain allow and block lists (Anthropic, Perplexity APIs), source-quality priors in the index (Perplexity keeps authoritative domains in hot storage, rung 6).

### M12. GEO, LLM-targeted manipulation, AI-targeted cloaking (stage: rank/filter, synthesise)

What breaks: content written or served to win LLM citations, rather than to be accurate, shifts which sources the model picks and what it says.

Evidence:
- Aggarwal et al., GEO, KDD 2024 (arXiv 2311.09735 v3 2024-06-28): GEO can boost visibility by up to 40% in generative engine responses, with effects varying by domain. https://arxiv.org/abs/2311.09735v3 (rung 1)
- Nestaas, Debenedetti and Tramèr, ICLR 2025 (arXiv 2406.18382): Preference Manipulation Attacks worked on Bing and Perplexity and on GPT-4 and Claude plugin APIs, and create a prisoner's dilemma where every site gains by attacking. https://arxiv.org/abs/2406.18382v2 (rung 1)
- SPLX, dated 2025-10-25 on the page: sites that check the User-Agent and serve AI crawlers a different page. A rule like "if user agent = ChatGPT, serve this page instead" made Atlas rank a manipulated resume first (88 versus 26 out of 100), and ChatGPT and Perplexity repeated a fabricated profile without flagging it. https://splx.ai/blog/ai-targeted-cloaking-openai-atlas (rung 3)

Mitigations seen: provenance signals, crawler authentication, cross-checking AI-fetched content against what humans see, red-teaming.

### M13. Indirect prompt injection via web pages (stage: read, synthesise)

What breaks: text on a page, often hidden, is read as an instruction. Outcomes range from skewed summaries to data theft in agent browsers.

Evidence:
- Greshake et al., arXiv 2302.12173 (2023): retrieved content blurs data and instructions, shown against Bing Chat. https://arxiv.org/abs/2302.12173 (rung 1)
- Guardian test, 2024-12-24, as logged by OECD.AI: hidden text on a page made ChatGPT search produce one-sided positive reviews. https://oecd.ai/en/incidents/2024-12-24-656f (rung 5)
- Brave, 2025-08-20: Comet fed page content to its LLM "without distinguishing between the user's instructions and untrusted content". Demo extracted an email and one-time password. https://brave.com/blog/comet-prompt-injection/ (rung 3)
- Unit 42, 2026-03-03: injection seen in the wild, 22 payload techniques, top delivery methods visible plaintext (37.8%), HTML attribute cloaking (19.8%) and CSS suppression (16.9%). https://unit42.paloaltonetworks.com/ai-agent-prompt-injection/ (rung 4)
- Anthropic, Claude for Chrome, 2025-08-25: 23.6% attack success without mitigations on 123 cases, 11.2% with them, a browser-specific set fell from 35.7% to 0%. https://claude.com/blog/claude-for-chrome (rung 6)
- OpenAI GPT-6 October deployment page (2026-10, exact day not shown on the page as read): reports indirect prompt injection resistance in a table I could not read, and a "Broken Search Tool" eval of whether the model admits search is unavailable. https://deploymentsafety.openai.com/gpt-6-october (rung 6)

Mitigations seen: separate model call over fetched pages (Claude Code), URL allow rules and "only fetch URLs already in context" (Anthropic API), classifiers, confirmations before sensitive actions, isolating agent browsing.

### M14. Sycophancy and premise-following (stage: understand query, reconcile)

What breaks: the model accepts the user's framing, writes queries that assume it, then finds support.

Evidence:
- Suzgun et al., arXiv 2605.22785, 2026-05-21: 2,100 same-day BBC news questions over 14 days, six chatbots (Gemini 3 Flash and Pro, Grok 4, Claude 4.5 Sonnet, GPT-5, GPT-4o mini). Accuracy fell from 88 to 96% on well-formed questions to 19 to 70% with subtle false premises. The most vulnerable model accepted fabricated facts 64% of the time. Retrieval failures caused over 70% of errors. https://arxiv.org/abs/2605.22785 (rung 3)
- FreshQA (2023): all model sizes struggle with false-premise and fast-changing questions. https://arxiv.org/abs/2310.03214v2 (rung 1)

Mitigations seen: premise checks before searching, asking the model to search for disconfirming evidence, concise answers (FreshLLMs found concise answers hallucinate less).

### M15. Entity disambiguation (stage: understand query, reconcile)

What breaks: two people or companies share a name, and the answer merges them.

Evidence:
- AmbigDocs (arXiv 2404.12447, 2024): state-of-the-art models often give ambiguous answers or "incorrectly merge information belonging to different entities". https://arxiv.org/abs/2404.12447v2 (rung 1)

Mitigations seen: ask for or infer a disambiguating attribute (employer, location, date), keep a per-entity evidence table. I found no vendor doc that describes a disambiguation step in a live search product (gap).

### M16. Date reasoning and stale effective cutoffs (stage: understand query, reconcile)

What breaks: the model assumes the wrong current date, searches for the wrong year, or treats an old fact as current.

Evidence:
- Ai2, 2025-10-24 ("Dated Data"): a model's effective knowledge cutoff is often older than its stated cutoff, because crawls hold stale pages and deduplication keeps older versions. https://allenai.org/blog/knowledge-cutoffs (rung 5 summary of a rung 1 paper)
- "Retrieved but Not Read", 2026-10-15: post-cutoff facts were the test, and outdated answers tracked snippet-only reading. (rung 3, URL in M5)
- Claude Code 1.0.36: web search takes today's date into context. (rung 2, changelog)
- EBU and BBC 2025: outdated facts such as the wrong pope. (rung 1 via 5, URL in M7)

Mitigations seen: inject today's date into search context, use page_age (Anthropic search results carry it), prefer opened pages over snippets for time-sensitive facts.

### M17. Knowledge conflict: memory versus retrieved results (stage: reconcile)

What breaks: two ways. The model overrides correct retrieved evidence with memory, or adopts wrong retrieved content over correct memory.

Evidence:
- ClashEval, NeurIPS 2024 (arXiv 2404.10198, v3 2025-02-07): over 1,200 questions, six top models including GPT-4o adopted incorrect retrieved content over correct priors more than 60% of the time. Less plausible errors were adopted less, and low model confidence made adoption more likely. https://arxiv.org/abs/2404.10198 (rung 1)
- "Retrieved but Not Read", 2026-10-15: even when evidence shifts internal predictions, final answers can favour outdated memory. (rung 3, URL in M5)

Mitigations seen: confidence-aware reconciliation, showing both the prior and the evidence, instructing the model to prefer dated primary sources for changeable facts.

### M18. Citation and attribution errors (stage: cite)

What breaks: the answer cites the wrong outlet, a syndicated copy, a broken or invented URL, or a page that does not support the sentence.

Evidence:
- Tow Center 2025: over 60% of 1,600 queries answered incorrectly across eight tools. Grok 3 linked to error pages in 154 of 200 cases. DeepSeek misattributed 115 of 200. ChatGPT gave 134 wrong answers out of 200 and flagged low confidence only 15 times. (rung 1, URL in M1)
- EBU and BBC 2025: 31% of answers had serious sourcing problems, Gemini 72%. (rung 1 via 5, URL in M7)
- Dow Jones v. Perplexity alleges invented quotes attributed to the WSJ. (allegation, rung 5, URL in M1)

Mitigations seen: character-level citations tied to fetched text (Anthropic web fetch citations, cited_text up to 150 characters in web search), Gemini annotations with start and end index.

---

## 3. Mitigations seen in the field (by builder lever)

| Lever | Example | Mechanisms helped | Source |
|---|---|---|---|
| Tell the model when a fetch failed or was cut | Claude Code 2.1.290 unread-amount notice and offset. 2.1.307 robots.txt refusals returned as normal results | M1, M6 | code.claude.com changelog (rung 2) |
| Run code over results before they enter context | Anthropic dynamic filtering in web_search_20260209 and web_fetch_20260209 and later | M4, M10 | platform.claude.com docs (rung 2) |
| Restrict where agents can go | allowed_domains, blocked_domains, max_uses, only fetch URLs already in context, url_sources | M12, M13 | platform.claude.com web fetch doc (rung 2) |
| Isolate untrusted page text | Separate model call over pages in Claude Code, trusted and untrusted input split (Brave proposal) | M13 | code.claude.com security, brave.com (rung 2, 3) |
| Verifiable crawler identity | Claude-User UA, OpenAI published IP ranges, Cloudflare verified bots | M1, M12 | tools reference, OpenAI bots doc, Cloudflare (rung 2) |
| Stop on evidence coverage, not on a guess | HALT claim-coverage stopping | M9 | EMNLP 2026 Findings (rung 1) |
| Honest budget exhaustion | Claude Code search cap notice. GPT-6 Broken Search Tool eval | M9 | tools reference (rung 2), OpenAI (rung 6) |
| Expose the queries | Gemini returns the queries it ran | M8 | ai.google.dev (rung 2) |
| Date grounding | Today's date in search context, page_age in results | M16 | changelog, web search doc (rung 2) |
| Fresh fetch on demand | use_cache false in web_fetch_20260309 and later, CLAUDE_CODE_WEBFETCH_CACHE_TTL_MS | M7 | platform.claude.com, tools reference (rung 2) |
| Raw fallback | curl through Bash when WebFetch extraction is too lossy | M4, M6 | tools reference (rung 2) |

---

## 4. Changes in the last 30 days (2026-09-25 to 2026-10-25)

| Date | Change | Why it matters | Source and rung |
|---|---|---|---|
| 2026-10-05 | Claude Code 2.1.290 stops silently dropping WebFetch text past 100,000 characters, now reports unread amount and accepts an offset. WebSearch budget refills at 100 calls per hour | Silent truncation was a documented cause of wrong "not found" answers (issue 51783) | changelog, rung 2 |
| 2026-10-13 | Gemini Search grounding doc updated, Gemini 3 and newer billed per search query, 5,000 free per month then $14 per 1,000 | Per-query billing may change how many searches builders allow | ai.google.dev, rung 2 |
| 2026-10-14 | Claude Code 2.1.299 WebFetch page reads pick effort like searches, caller's model and level, otherwise the small model. 2.1.300 tells Claude a page failed moments ago instead of refetching | Confirms a smaller model still handles many page reads | changelog, rung 2 |
| 2026-10-15 | "Retrieved but Not Read" preprint: snippet-only answering tied to outdated answers and unfaithful citations | Strongest new evidence on M5 | arXiv 2610.21731, rung 3 |
| 2026-10-16 | Unite.AI coverage of the same paper gives per-model snippet-only rates, 2.6% to 76.0% | Shows variation is large across models | unite.ai, rung 5 |
| 2026-10-17 | Axios analysis of 102 top US publishers on blocking training versus search crawlers | Search crawlers blocked less often than training ones | axios.com returned 403, rung 7 |
| 2026-10-19 to 2026-10-21 | Claude Code 2.1.304, 2.1.305, 2.1.307: robots.txt refusals and 4xx now normal results in Cowork cloud, search-budget notice tells Claude not to search through a browser | Makes access failures visible to the model | changelog, rung 2 |
| 2026-10-21 | Yu et al. error taxonomy for deep search agents | Trace-level view of where agents go wrong | arXiv 2610.29346, rung 3 |
| 2026-10 | HALT stopping policy published in Findings of EMNLP 2026 | Peer-reviewed fix for early or late stopping | aclanthology.org, rung 1 |
| 2026-10 | OpenAI GPT-6 October page adds "Broken Search Tool" eval and indirect injection resistance table | Vendor now tests honesty when search fails | deploymentsafety.openai.com, rung 6 |
| 2026-10-22 | Dow Jones v. Perplexity reported as heading to jury trial | Legal pressure on how answer engines fetch and attribute | startupfortune.com, rung 5 |
| 2026-10-23 | Meta delays new business terms that allowed crawler collection of business-page content to 2026-11-20 after publisher objections | Another platform tightening or contesting crawl rules | androidheadlines.com, rung 5 |
| 2026-09-15 (just before window) | Cloudflare default blocking of training and agent crawlers on ad pages for new and free customers took effect as scheduled. I found no post-change data | Likely raises fetch refusals for agents on many small sites | engadget.com, rung 5 |

---

## 5. Gaps

- No post-2026-09-15 measurement of how Cloudflare's new defaults changed what assistants can fetch. Everything I found was written before the switch.
- OpenAI's ChatGPT search help page and BrowseComp page returned 403 to my fetch tool, so the query-rewrite and BrowseComp score details are rung 7 or 5 here.
- Grok's search index and Copilot consumer grounding are not documented in anything I opened. Copilot grounding on Bing is assumed by the field but not shown here.
- Anthropic's subprocessor list was not opened directly. The Brave and turbopuffer roles come from xponent21. How turbopuffer is used is not public.
- The Claude Code summariser model is named only in 2025 code inspections (Haiku 3.5). Current docs say "a separate model call" and "the small model", without naming it.
- No vendor documents a user-facing signal for "the original was paywalled or blocked, this answer used other sources".
- Entity disambiguation in live search products has no vendor documentation or audit that I found. Evidence is from benchmarks only.
- Per-model numbers for "Retrieved but Not Read", HALT and the GPT-6 page were not visible on the abstract pages. The PDFs need a full read.
- Index freshness numbers (time from publish to retrievable) are vendor claims only (Perplexity). No independent cross-product freshness audit found.
- Table extraction numbers for general LLMs come from leaderboards I did not open.
