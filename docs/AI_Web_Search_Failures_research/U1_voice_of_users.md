# U1 Voice of users: where AI assistants fail to gather the right details from the web

Strand: U1, voice of users. Research date: 2026-10-25. Window: last 12 months weighted, last 30 days (2026-09-25 to 2026-10-25) checked on purpose.

## At a glance

- 91 complaints from 52 distinct opened sources (threads, issues, practitioner audits). Every source in the table was opened with WebFetch.
- 73 of 91 complaints fall in the last 12 months. 20 fall in the last 30 days. 18 are older and are marked as such.
- Sources: OpenAI Developer Community (9 threads), GitHub anthropics/claude-code (13 issues), Hacker News (14 threads), Google AI Developers Forum (6 threads), Perplexity API forum (4 threads), Microsoft Tech Community (3 threads), two practitioner audits of Perplexity, one Simon Willison post.
- Reddit and X could not be reached at all (see section 5). This skews the sample toward developers and API users and away from casual consumer users.
- Complaints can carry more than one tag, so tag totals add up to more than 91.

## 1. Frequency table, tag by product

Product groups: ChatGPT covers ChatGPT search, Deep Research and the OpenAI API web search tool. Claude covers Claude apps and Claude Code WebSearch and WebFetch. Gemini covers the Gemini app, Gemini Deep Research and the Gemini API with Search grounding. Google AI covers AI Overviews, AI Mode and Gemini answers inside Google Search. Multi means the user named several tools or agents in general.

| Rank | Tag | ChatGPT | Claude | Gemini | Google AI | Perplexity | Copilot | Grok | Multi | Total |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | CITE: Citation does not support claim, or fabricated or missing link | 6 | 2 | 8 | 6 | 4 | 2 | 0 | 0 | 28 |
| 2 | SLOP: Low-quality, SEO or AI-slop source | 4 | 1 | 2 | 3 | 2 | 0 | 0 | 3 | 15 |
| 3 | FRESH: Freshness or stale info | 3 | 1 | 4 | 2 | 1 | 1 | 0 | 0 | 12 |
| 4 | EARLY: Stops too early, too few sources, ignores results | 6 | 2 | 2 | 0 | 2 | 0 | 0 | 0 | 12 |
| 5 | BLOCK: Blocked or unreadable page | 2 | 6 | 0 | 0 | 1 | 1 | 0 | 0 | 10 |
| 6 | SILENT: Silent failure reported as success (new) | 4 | 4 | 0 | 0 | 1 | 1 | 0 | 0 | 10 |
| 7 | MEMORY: Ignores search, answers from training data | 7 | 1 | 1 | 0 | 1 | 0 | 0 | 0 | 10 |
| 8 | ENTITY: Entity confusion | 0 | 1 | 0 | 7 | 1 | 0 | 0 | 0 | 9 |
| 9 | NICHE: Niche, local or non-English gaps | 3 | 0 | 1 | 4 | 0 | 0 | 0 | 1 | 9 |
| 10 | NUM: Numbers, tables or PDF extraction errors | 1 | 1 | 2 | 2 | 1 | 0 | 0 | 0 | 7 |
| 11 | INJECT: Prompt injection or manipulated content | 0 | 1 | 1 | 2 | 1 | 0 | 0 | 1 | 6 |
| 12 | CONFLICT: Conflicting sources or follows false premise | 1 | 1 | 0 | 3 | 0 | 0 | 0 | 0 | 5 |
| 13 | QUERY: Shallow or wrong query | 2 | 1 | 0 | 2 | 0 | 0 | 0 | 0 | 5 |
| 14 | FABPAGE: Fetcher invents or splices page content (new) | 0 | 4 | 0 | 0 | 0 | 0 | 0 | 0 | 4 |
| 15 | TRUNC: Page truncated or over-summarised (new) | 0 | 3 | 0 | 0 | 1 | 0 | 0 | 0 | 4 |
| 16 | DATE: Date or time reasoning errors | 0 | 1 | 2 | 0 | 0 | 0 | 0 | 0 | 3 |
| | Complaints per product | 21 | 20 | 14 | 21 | 9 | 3 | 0 | 3 | 91 |

Tag ranking by total mentions: CITE 28, SLOP 15, FRESH 12, EARLY 12, BLOCK 10, SILENT 10, MEMORY 10, ENTITY 9, NICHE 9, NUM 7, INJECT 6, CONFLICT 5, QUERY 5, FABPAGE 4, TRUNC 4, DATE 3.

Three new tags were added because many complaints did not fit the starting list:

- SILENT: the tool failed (no search ran, page blocked, cap hit) but the product still returned a finished, confident answer with no error.
- FABPAGE: the page fetcher or its summariser returned text that was not on the page.
- TRUNC: the page was cut or squeezed into a short summary, so the facts lower on the page never reached the model.

Read the table with care. Product counts reflect where users post, not true failure rates. Claude counts come mostly from Claude Code GitHub issues, Google AI counts mostly from Hacker News, ChatGPT counts mostly from the OpenAI forum.

## 2. Top recurring themes

### Theme A. The citation is there but it does not prove the claim (CITE, 28)

The most common complaint by a wide margin, and it shows up for every product with data. Users say the link exists and loads, but the number, name or claim is not on it. Some links are invented outright.

- Perplexity: a practitioner audit of 1,826 citations found 34.7 percent pointed to a page that would not open or did not contain any of the cited numbers. Current CEO questions were worst at 44 percent pass. (hausresearch.com, 2026-09-02)
- Google AI Mode: a user says answers often state the opposite of the cited sources, even when those sources agree. (HN 48199338, about 2026-05)
- Gemini API grounding: a developer says answers were often right but the cited URLs were invented in about 80 percent of runs. (discuss.ai.google.dev 92512, 2025-07-05)
- Claude Code on the web: WebSearch summaries credit a generic Springer policy to one specific journal and assert a preprint that cannot be found. (GitHub 99385, 2026-10-04)

### Theme B. The tool quietly fails, then answers anyway (SILENT, MEMORY, EARLY, combined 32 mentions)

Users are less upset that search fails than that the product hides it. The answer looks researched but no research happened, or it stopped short.

- ChatGPT Deep Research: a thread running from 2026-09-13 to 2026-10-25 has many users reporting runs that finish with 0 sites searched and 0 citations, yet the report states detailed facts and is marked complete. One run claimed it had checked official sources. (OpenAI forum 1397161)
- Perplexity sonar-deep-research: about 16 percent of API calls skipped search and gave a knowledge-cutoff answer with no error code. (Perplexity forum 4264, 2026-03-21)
- Claude Code: a hidden per-session WebSearch cap returns a non-error note and agents carry on from memory, corrupting long research runs. (GitHub 95815, 2026-09-21, still being confirmed on 2026-10-22)
- Copilot: every web search returned Expired while the service status page said all was well. (Microsoft Tech Community 4562210, 2026-10-05)

### Theme C. Weak, spammy or planted sources win (SLOP 15, INJECT 6)

The retriever picks what ranks, not what is reliable. Users name SEO listicles, vendor-owned comparison pages, single Reddit comments and AI-written sites.

- Perplexity: a second practitioner audit found 59.8 percent of 7,534 citations came from domains ranked below 100,000, and three brands had published 215,128 machine-written best-of pages that get cited. (trellner.com, 2026-09-02)
- Several LLMs: all recommended a town square that does not exist, traced to one misspelled Reddit comment. (HN 49536375, about 2026-09-03)
- Google AI Overviews: a scammer's support phone number reached the answer via a trusted government-contract site. Another user saw their own niche comment copied into the next day's answer. (HN 48205782, about 2026-05-19)
- Claude and Codex: users say results include AI-written sites and the built-in search cannot exclude domains. (HN 49536375)

### Theme D. Old facts presented as current (FRESH 12, DATE 3)

- Gemini 3.8 Flash: gave old install steps and an abandoned GitHub project instead of the active fork, still stale with Search grounding on. (discuss.ai.google.dev 184359, 2026-09-22 and 2026-10-05)
- Claude Code WebFetch: spliced sections from a mid-2025 version of an Anthropic help page into a current fetch. (GitHub 86581, 2026-08-14)
- Gemini in finance work: a September 2026 document was labelled a September 2024 report, and a historical spread was reused as current. (discuss.ai.google.dev 186813, 2026-10-05)
- Claude Code WebSearch: queries kept adding 2024 to search strings. (GitHub 14126, 2025-12-16)

### Theme E. The page never really gets read (BLOCK 10, TRUNC 4, FABPAGE 4)

Mostly a Claude Code story, because developers file detailed issues there, but ChatGPT and Claude chat users raise paywalls and site blocks too.

- Claude Code WebFetch cuts long pages at a fixed size without saying so. One RFC returned 7.8 percent of its text. (GitHub 95127, 2026-09-17)
- Claude Code WebFetch returned a full job posting for a URL that was really a 500 error page, and a scheduled task emailed it as verified. (GitHub 87470, 2026-08-17)
- Claude web chat cannot reach Reddit or Stack Overflow, so users switch to ChatGPT for broad searches. (HN 47206490, about 2026-03)
- ChatGPT users say paywalled journals and local news are invisible, so answers lean on Wikipedia and blogs. (OpenAI forum 1136549 and 1362798)

### Theme F. Wrong person, wrong product variant, wrong company (ENTITY 9)

Concentrated in Google AI answers, with one strong Perplexity API case.

- Google AI Overview credited a creator with another person's same-titled video. (HN 45092925, 2025-09-01)
- Google Search Gemini said the base Pixel 10 supports Wi-Fi 7, which only Pro models do. (HN 48199338)
- Perplexity sonar API gave a confident profile of a different person with a similar name, while the web app flagged the mismatch. (Perplexity forum 4015, 2026-02-26)

## 3. Surprising or emerging complaints, last 30 days (2026-09-25 to 2026-10-25)

1. ChatGPT Deep Research zero-source runs. The single loudest recent signal. Reports dated 2026-10-01, 10-06, 10-10, 10-14, 10-19, 10-22 and 10-25 all describe runs that finish fast, search nothing, and still produce a confident report. One user notes a 20 minute wait for a report that cannot be cited. Users stress that no error is shown.
2. Claude Code WebSearch summaries mixing inference with source text. Issue 99385 (2026-10-04) is a new framing: when the page is paywalled the agent cannot tell what the page said from what the summariser guessed.
3. Hidden search budgets. Claude Code issue 95815 (opened 2026-09-21) gained confirmations on 2026-10-05 and 2026-10-22. Users want budgets shown and want work to halt, not degrade, when search runs out.
4. Copilot web retrieval outage hidden behind a green status page (2026-10-05 and 2026-10-06), and a Copilot feedback post asking for honesty when facts cannot be confirmed (2026-10-04).
5. Gemini finance analysts suspending use (2026-10-05). An investment team lists unsourced figures, wrong document years and stale inputs presented as current. This reads as an enterprise trust signal, not a one-off bug.
6. JavaScript-only pages returning a plausible footer instead of an error. Claude Code issue 100745 (2026-10-09) on claude.ai share links.
7. Google AI answers built on single Reddit comments, and answering a similarly spelled but different question (HN 49870367, about 2026-09-28).

Just before the window (late August to mid September 2026), two practitioner audits of Perplexity (2026-09-02) and Simon Willison's note on ChatGPT search narrowing to chosen sites (2026-08-20) set up the recent debate on source quality and source diversity.

## 4. Full complaint table

Opened = the page was fetched and read for this brief. Dates are ISO. approx means worked out from a relative age on the page.

| # | Product | Surface | Complaint (paraphrase) | Tags | Date | Opened | URL |
|---|---|---|---|---|---|---|---|
| 1 | ChatGPT | Deep Research | Run finished with 0 sites searched. Citations were truncated, marked URL omitted, or carried wrong years. | EARLY, SILENT, CITE | 2026-09-13 | yes | https://community.openai.com/t/deep-research-completes-but-searches-0-sites-and-returns-no-usable-citations/1397161 |
| 2 | ChatGPT | Deep Research (Go plan) | Report completed with 0 sources and 0 citations yet stated detailed manufacturer specs. | MEMORY, SILENT | 2026-10-14 | yes | https://community.openai.com/t/deep-research-completes-but-searches-0-sites-and-returns-no-usable-citations/1397161 |
| 3 | ChatGPT | Deep Research | Financial-rate report claimed it checked official sources while the Sources panel showed 0 scanned. | CITE, SILENT, MEMORY | 2026-10-22 | yes | https://community.openai.com/t/deep-research-completes-but-searches-0-sites-and-returns-no-usable-citations/1397161 |
| 4 | ChatGPT | Deep Research | NASA mission comparison that required official NASA sources ran 0 searches and gave 0 citations. | EARLY, MEMORY | 2026-10-25 | yes | https://community.openai.com/t/deep-research-completes-but-searches-0-sites-and-returns-no-usable-citations/1397161 |
| 5 | ChatGPT | Deep Research (Pro) | Could not read the attached file, skipped required sections, gave questionable citations after only two planning steps. | EARLY, CITE | 2026-10-10 | yes | https://community.openai.com/t/deep-research-completes-but-searches-0-sites-and-returns-no-usable-citations/1397161 |
| 6 | ChatGPT | Deep Research | Runs ended in 7 to 8 minutes with 0 sources, no error, and were marked successful. | SILENT, EARLY | 2026-10-22 | yes | https://community.openai.com/t/deep-research-completes-but-searches-0-sites-and-returns-no-usable-citations/1397161 |
| 7 | ChatGPT | Deep Research | Picked weak sources (Statista, Statcounter) and then misstated the figures they held. | SLOP, NUM | 2025-02-25 (thread date, older than 12 months) | yes | https://news.ycombinator.com/item?id=43133207 |
| 8 | ChatGPT | Deep Research | Did roughly 60 percent of a compensation analysis but presented it as complete. | EARLY | 2025-02-25 (thread date, older than 12 months) | yes | https://news.ycombinator.com/item?id=43133207 |
| 9 | ChatGPT | Deep Research | Leaned on blogspam sites for B2B account research, user cancelled the plan. | SLOP | 2025-02-25 (thread date, older than 12 months) | yes | https://news.ycombinator.com/item?id=43133207 |
| 10 | ChatGPT | Search | Local business details pulled from map listings were wrong or out of date for the actual location. OpenAI support acknowledged on 2026-09-08. | NICHE, FRESH | 2026-06-15 | yes | https://community.openai.com/t/chatgpt-and-the-problem-with-inaccurate-local-search-data/1383801 |
| 11 | ChatGPT | Chat | Missed recent events such as a change of president and did not say its knowledge had a cutoff. | MEMORY, FRESH | 2025-06-05 | yes | https://community.openai.com/t/user-concerns-about-chatgpts-outdated-information/1279065 |
| 12 | ChatGPT | Responses API web search | Kept returning expired or old link citations, a reply said many links were dead. | FRESH, CITE | 2025-06-13 | yes | https://community.openai.com/t/outdated-link-citations-with-responses-api-and-search-tool/1287586 |
| 13 | ChatGPT | Chat | Paywalled, local and minority-language outlets are invisible, so answers lean on whoever publishes for free. | BLOCK, NICHE | 2025-10-17 | yes | https://community.openai.com/t/llms-can-t-stay-neutral-if-paywalled-and-local-sources-are-invisible-to-them/1362798 |
| 14 | ChatGPT | Chat | Cannot reach paywalled journals and offers Wikipedia or blogs that a researcher cannot cite. | BLOCK, SLOP | 2025-03-06 | yes | https://community.openai.com/t/improving-the-quality-of-research/1136549 |
| 15 | ChatGPT | API (GPT-5.2) | After a model switch, the agent stopped searching and asked the user for other data sources. | MEMORY, EARLY | 2025-12-23 | yes | https://community.openai.com/t/gpt-5-2-is-unable-to-do-web-search/1370083 |
| 16 | ChatGPT | Search | Told to run a real search, it invented results with fake documentation URLs and treated a real model release as hypothetical. | CITE, MEMORY, CONFLICT | 2025-03-15 | yes | https://community.openai.com/t/major-chatgpt-flaw-context-drift-hallucinated-web-searches-yield-completely-false-information/1143983 |
| 17 | ChatGPT | Deep Research | When asked to list earlier Deep Research sources, nearly all links did not exist. | CITE | 2025-03-15 (reply) | yes | https://community.openai.com/t/major-chatgpt-flaw-context-drift-hallucinated-web-searches-yield-completely-false-information/1143983 |
| 18 | ChatGPT | Search | Ignored an English-only source preference and drifted back to Czech sources in new chats. | NICHE, QUERY | 2025-03-01 | yes | https://community.openai.com/t/chatgpt-ignores-search-preference-for-english-sources/1133146 |
| 19 | ChatGPT | Search | Search fan-out queries using site restriction jumped from about 0.5 to 16 percent after a model update, and Reddit was pulled back. Practitioner observation on narrower source sets. | QUERY | 2026-08-20 | yes | https://simonwillison.net/2026/Aug/20/chatgpt-search-now-uses-the-siteoperator-at-scale/ |
| 20 | ChatGPT | Search | Linked article argues ChatGPT settles on which brands to recommend before it searches. Only the headline was readable. | MEMORY | 2026-08-11 (approx, 75 days before capture) | yes | https://news.ycombinator.com/item?id=49242132 |
| 21 | ChatGPT | Search | Answer about pen refills cited the asker's own Reddit post as the source. | SLOP | 2026-05-19 (approx, thread on BBC piece dated 2026-05-19) | yes | https://news.ycombinator.com/item?id=48205782 |
| 22 | Gemini | Gemini (finance work) | EBITDA, multiples and replacement costs given with no source or period and stated as fact. | CITE, NUM | 2026-10-05 | yes | https://discuss.ai.google.dev/t/critical-financial-risk-systematic-hallucinations-and-valuation-logic-errors-in-gemini-financial-analyses/186813 |
| 23 | Gemini | Gemini (finance work) | A document dated September 2026 was called a September 2024 report, and a cash-flow figure was pinned to a statement that did not hold it. | DATE, CITE | 2026-10-05 | yes | https://discuss.ai.google.dev/t/critical-financial-risk-systematic-hallucinations-and-valuation-logic-errors-in-gemini-financial-analyses/186813 |
| 24 | Gemini | Gemini (finance work) | Treated filings, broker notes, third-party sites and its own maths as equal sources. | SLOP | 2026-10-05 | yes | https://discuss.ai.google.dev/t/critical-financial-risk-systematic-hallucinations-and-valuation-logic-errors-in-gemini-financial-analyses/186813 |
| 25 | Gemini | Gemini (finance work) | Reused a historical spread figure as if it were current. | FRESH, NUM | 2026-10-05 | yes | https://discuss.ai.google.dev/t/critical-financial-risk-systematic-hallucinations-and-valuation-logic-errors-in-gemini-financial-analyses/186813 |
| 26 | Gemini | Deep Research | Cited a patent that does not exist with a wrong Google Patents link, then repeated it after correction. | CITE | 2025-07-09 | yes | https://discuss.ai.google.dev/t/fatal-the-gemini-series-especially-deepresearch-hallucinates-very-severely-in-patent-retrieval-tasks/93108 |
| 27 | Gemini | Deep Research | Chinese-language patent search returned wrong numbers and content. | NICHE, CITE | 2025-07-09 | yes | https://discuss.ai.google.dev/t/fatal-the-gemini-series-especially-deepresearch-hallucinates-very-severely-in-patent-retrieval-tasks/93108 |
| 28 | Gemini | Gemini | No valid patent results, while the model claimed a human had checked each item. | CITE | 2026-03-01 (reply) | yes | https://discuss.ai.google.dev/t/fatal-the-gemini-series-especially-deepresearch-hallucinates-very-severely-in-patent-retrieval-tasks/93108 |
| 29 | Gemini | API grounding | Answer often right but the cited URLs were invented, about 80 percent of runs had at least one. | CITE | 2025-07-05 | yes | https://discuss.ai.google.dev/t/hallucinated-urls-with-grounding/92512 |
| 30 | Gemini | Deep Research API | Responses came back with no sources or links at all. | CITE, EARLY | 2026-03-11 | yes | https://discuss.ai.google.dev/t/deep-research-api-not-returning-any-sources/130735 |
| 31 | Gemini | Gemini 3.8 Flash | Gave old install steps and an abandoned GitHub project instead of the active fork, still stale with Search grounding on. | FRESH | 2026-09-22 | yes | https://discuss.ai.google.dev/t/bug-report-outdated-and-incorrect-output-information-from-gemini-3-8-flash-outdated-it-guides-from-github/184359 |
| 32 | Gemini | API grounding | Grounded search returned 2024-era results and said the 2025 Super Bowl had not happened. Search sometimes did not trigger. | FRESH, DATE, MEMORY | 2025-10-24 | yes | https://discuss.ai.google.dev/t/gemini-api-2-5-flash-does-old-web-search/108146 |
| 33 | Gemini | API grounding via LangChain | Same 2024 results even when fresh tool data was passed in. | FRESH, EARLY | 2025-11-15 (reply) | yes | https://discuss.ai.google.dev/t/gemini-api-2-5-flash-does-old-web-search/108146 |
| 34 | Gemini | Gemini | Legal guidance on firearms rules built on misread forum posts with invented details. | SLOP, CITE | 2026-09-28 (approx, 27 days before capture) | yes | https://news.ycombinator.com/item?id=49870367 |
| 35 | Gemini | Gemini | Running a search on every turn exposes answers to injected text from user-generated sites (concern, not incident). | INJECT | 2026-05-19 (approx) | yes | https://news.ycombinator.com/item?id=48205782 |
| 36 | Google AI | AI Overviews | Linked pages often do not support what the summary says. | CITE | 2026-09-03 (approx, 52 days before capture) | yes | https://news.ycombinator.com/item?id=49536201 |
| 37 | Google AI | AI summaries (and Bing) | Paired the wrong photo with a biography and quoted stats that differ from the linked page. | ENTITY, NUM | 2026-09-04 (approx) | yes | https://news.ycombinator.com/item?id=49536201 |
| 38 | Google AI | AI Overviews | Said a hockey team had clinched a playoff spot when it had not. | FRESH | 2026-09-28 (approx) | yes | https://news.ycombinator.com/item?id=49870367 |
| 39 | Google AI | AI answer | Said a meme did not exist and cited a thread that did not back that claim. | CITE | 2026-09-28 (approx) | yes | https://news.ycombinator.com/item?id=49870367 |
| 40 | Google AI | AI Overviews | Niche answers lean on Reddit comments that are partly or fully wrong. | SLOP, NICHE | 2026-09-28 (approx) | yes | https://news.ycombinator.com/item?id=49870367 |
| 41 | Google AI | AI summaries | Sometimes answers a similarly spelled but different question. | QUERY | 2026-09-28 (approx) | yes | https://news.ycombinator.com/item?id=49870367 |
| 42 | Google AI | AI Mode | Reads like a review of evidence but stitches random web comments into a false consensus. | SLOP | 2026-05 (approx, 5 months before capture) | yes | https://news.ycombinator.com/item?id=48199338 |
| 43 | Google AI | Gemini in Search | Said the base Pixel 10 supports Wi-Fi 7, which only Pro models do. | ENTITY | 2026-05 (approx) | yes | https://news.ycombinator.com/item?id=48199338 |
| 44 | Google AI | AI Mode | States the opposite of the sources it cites, even when they agree with each other. | CITE, CONFLICT | 2026-05 (approx) | yes | https://news.ycombinator.com/item?id=48199338 |
| 45 | Google AI | AI Overviews | Credited a creator with a same-titled video by a different person. | ENTITY | 2025-09-01 | yes | https://news.ycombinator.com/item?id=45092925 |
| 46 | Google AI | AI Overviews | Called a small business a scam using facts about a differently named brand. | ENTITY | 2025-09-01 | yes | https://news.ycombinator.com/item?id=45092925 |
| 47 | Google AI | AI Mode | Said a plan was not sold in Austria while its own cited page advertised it, and used an old product name. | CITE, FRESH, NICHE | 2025-10-14 | yes | https://news.ycombinator.com/item?id=45577746 |
| 48 | Google AI | AI Overviews | Compared a panda with a Renault Clio as if both were animals. | ENTITY, QUERY | 2026-01-02 (approx, Guardian article date) | yes | https://news.ycombinator.com/item?id=46471527 |
| 49 | Google AI | AI Overviews | Gave the fusing current for 22 AWG wire instead of the safe working limit. | NUM | 2026-01-02 (approx) | yes | https://news.ycombinator.com/item?id=46471527 |
| 50 | Google AI | AI Overviews | The Dive deeper follow-up often contradicts the first answer. | CONFLICT | 2026-01-02 (approx) | yes | https://news.ycombinator.com/item?id=46471527 |
| 51 | Google AI | AI Mode | Wrong about which vendors sell a product and only conceded after repeated pushback. | NICHE, CONFLICT | 2026-09-03 (approx) | yes | https://news.ycombinator.com/item?id=49536375 |
| 52 | Google AI | AI Overviews | A scammer's phone number reached the answer via a trusted government-contract site. | INJECT | 2026-05-19 (approx) | yes | https://news.ycombinator.com/item?id=48205782 |
| 53 | Google AI | AI Overviews | A single niche forum comment was copied almost word for word into next day's answer. | INJECT, NICHE | 2026-05-19 (approx) | yes | https://news.ycombinator.com/item?id=48205782 |
| 54 | Google AI | AI answer | Said BlueCruise is offered on the Bronco based on a fan site, the maker says it is not. | SLOP, ENTITY | 2026-05-19 (approx) | yes | https://news.ycombinator.com/item?id=48205782 |
| 55 | Google AI | AI Overviews | Misstates its own citations or asserts half-truths from results that do not answer the query. | CITE | 2025-12 (approx, 10 months before capture) | yes | https://news.ycombinator.com/item?id=46194358 |
| 56 | Google AI | AI Overviews | Blends facts from two pages into a new false claim about a company. | ENTITY, CITE | 2026-06 (approx, 4 months before capture) | yes | https://news.ycombinator.com/item?id=48470248 |
| 57 | Perplexity | Perplexity | Does not check its own citations, so answers only look sourced. | CITE | 2026-09-04 (approx) | yes | https://news.ycombinator.com/item?id=49536201 |
| 58 | Perplexity | sonar and sonar-pro | Audit of 1,826 citations: 34.7 percent pointed to pages that would not open or held none of the numbers cited. Current CEO questions passed only 44 percent. | NUM, CITE, FRESH, BLOCK | 2026-09-02 (practitioner audit) | yes | https://hausresearch.com/reports/perplexity-citation-audit/ |
| 59 | Perplexity | sonar and sonar-pro | Audit of 7,534 citations: 59.8 percent from domains ranked below 100,000. Three brands made 215,128 machine-written best-of pages that get cited. | SLOP, INJECT | 2026-09-02 (practitioner audit) | yes | https://trellner.com/reports/manufactured-sources-behind-ai-recommendations/ |
| 60 | Perplexity | Perplexity | Tuned for speed, citations often do not match the text beside them. | CITE, EARLY | 2026-09-03 (approx) | yes | https://news.ycombinator.com/item?id=49536677 |
| 61 | Perplexity | Perplexity | Quality of linked sources dropped over the past year. | SLOP | 2026-09-03 (approx) | yes | https://news.ycombinator.com/item?id=49536677 |
| 62 | Perplexity | sonar-deep-research API | About 16 percent of calls skipped search and answered with a knowledge-cutoff message, with no error code. | MEMORY, SILENT | 2026-03-21 | yes | https://community.perplexity.ai/t/sonar-deep-research-intermittently-fails-to-activate-web-search-via-the-api/4264 |
| 63 | Perplexity | sonar-pro API | Inline citation numbers point to the wrong search result, another user confirmed on 2026-03-24. | CITE | 2025-12-15 | yes | https://community.perplexity.ai/t/bug-report-incorrect-citation-mapping-in-pro-search-api-responses/3112 |
| 64 | Perplexity | sonar API | Gave a confident profile of a different person with a similar name, while the web app flagged the mismatch. | ENTITY | 2026-02-26 | yes | https://community.perplexity.ai/t/same-query-yields-inconsistent-results-between-perplexity-api-sonar-and-web-ui-api-matches-the-wrong-person-web-ui-is-correct/4015 |
| 65 | Perplexity | sonar-pro API | Listed the About page as searched yet missed the owner named on it. | EARLY, TRUNC | 2026-03-20 | yes | https://community.perplexity.ai/t/sonar-pro-api-misses-explicit-owner-on-about-page-while-browser-space-finds-it/4192 |
| 66 | Claude | Claude Code WebFetch | Long pages are cut at a fixed size with no marker, one RFC returned 7.8 percent of its text. | TRUNC, SILENT | 2026-09-17 | yes | https://github.com/anthropics/claude-code/issues/95127 |
| 67 | Claude | Claude Code WebFetch (Cowork) | Spliced sections from a mid-2025 version of a page into an otherwise current fetch. | FABPAGE, FRESH | 2026-08-14 | yes | https://github.com/anthropics/claude-code/issues/86581 |
| 68 | Claude | Claude Code WebFetch (Scheduled Task) | Returned a detailed job posting for a URL that was a bare 500 error page, then emailed it as verified. | FABPAGE, SILENT | 2026-08-17 | yes | https://github.com/anthropics/claude-code/issues/87470 |
| 69 | Claude | Claude Code WebFetch | Fetch result carried fake system-reminder blocks telling the agent to be less careful, not present in the raw page. | INJECT | 2026-07-06 | yes | https://github.com/anthropics/claude-code/issues/74650 |
| 70 | Claude | Claude Code WebFetch | Share links return a JS shell, the tool summarises the footer instead of saying it cannot read the page. | BLOCK, SILENT | 2026-10-09 | yes | https://github.com/anthropics/claude-code/issues/100745 |
| 71 | Claude | Claude Code WebSearch | Search queries kept adding 2024 even with the date set in CLAUDE.md. | DATE, QUERY | 2025-12-16 | yes | https://github.com/anthropics/claude-code/issues/14126 |
| 72 | Claude | Claude Code on the web WebSearch | Search summaries credit a generic publisher policy to one specific journal and claim a preprint exists that cannot be found. | CITE, ENTITY | 2026-10-04 | yes | https://github.com/anthropics/claude-code/issues/99385 |
| 73 | Claude | Claude Code on the web WebSearch | Two summaries of one publisher's preprint policy contradict each other. | CONFLICT | 2026-10-04 | yes | https://github.com/anthropics/claude-code/issues/99385 |
| 74 | Claude | Claude Code | When a fetch is blocked, it builds a summary from search snippets and presents it as if it read the page. | BLOCK, FABPAGE | 2026-04-08 | yes | https://github.com/anthropics/claude-code/issues/45070 |
| 75 | Claude | Claude Code WebFetch | Refuses arxiv.org, eprint.iacr.org and Anthropic docs with a domain safety error. | BLOCK | 2026-01-19 | yes | https://github.com/anthropics/claude-code/issues/19287 |
| 76 | Claude | Claude Code WebSearch | Hidden per-session search cap returns a non-error note, agents then carry on from memory. | MEMORY, SILENT, EARLY | 2026-09-21 | yes | https://github.com/anthropics/claude-code/issues/95815 |
| 77 | Claude | Claude Code WebFetch | Fetch summaries had a median of 840 characters against about 37,500 characters of page text. | TRUNC | 2026-09-21 | yes | https://github.com/anthropics/claude-code/issues/95815 |
| 78 | Claude | Claude Code WebSearch | The search cap never resets, so long sessions lose search for good. Another user confirmed on 2026-10-22. | EARLY | 2026-10-05 (comment) | yes | https://github.com/anthropics/claude-code/issues/95815 |
| 79 | Claude | Claude Code on the web WebFetch | Egress blocks show up as bare 403s, and the default allowlist blocks claude.com itself. | BLOCK | 2026-07-03 | yes | https://github.com/anthropics/claude-code/issues/74025 |
| 80 | Claude | Claude Code WebFetch | Firebase docs cut mid-sentence on every retry, the agent never saw the section on secret files. | TRUNC | 2026-02-03 | yes | https://github.com/anthropics/claude-code/issues/22937 |
| 81 | Claude | Claude Code WebFetch | PDF fetch returned wrong section headings and invented content, curl plus pdftotext worked. | NUM, FABPAGE | 2026-02-06 | yes | https://github.com/anthropics/claude-code/issues/23694 |
| 82 | Claude | Claude | Makes things up when used to search documents online and apologises when caught. | CITE | 2026-09-04 (approx) | yes | https://news.ycombinator.com/item?id=49536201 |
| 83 | Claude | Claude | Makes big logic jumps and trusts tertiary sources too much. | SLOP | 2026-09-04 (approx) | yes | https://news.ycombinator.com/item?id=49536201 |
| 84 | Claude | Claude web chat | Cannot search Reddit or Stack Overflow, so some answers miss key community sources. | BLOCK | 2026-03 (approx, 7 months before capture) | yes | https://news.ycombinator.com/item?id=47206490 |
| 85 | Claude | Claude | Hits many roadblocks reading pages, user switches to ChatGPT for broad searches. | BLOCK | 2026-03 (approx) | yes | https://news.ycombinator.com/item?id=47206490 |
| 86 | Copilot | Copilot | Every web search and URL read returned Expired while the status page said all was fine. A second user hit it on 2026-10-06. | BLOCK, SILENT | 2026-10-05 | yes | https://techcommunity.microsoft.com/discussions/bingchatenterprise/i-had-interesting-conversation-with-copilot-asked-it-to-test-it%E2%80%99s-internet-retri/4562210 |
| 87 | Copilot | Microsoft 365 Copilot | Asserts things with little checking and does not say when it cannot confirm. | CITE | 2026-10-04 | yes | https://techcommunity.microsoft.com/discussions/microsoft365copilot/feedback-multiple-reliability-and-consistency-issues-encountered-with-copilot/4561969 |
| 88 | Copilot | Copilot in Word | Wrote old news as current and put URL placeholders where links should be. | FRESH, CITE | 2024-05-30 (older than 12 months) | yes | https://techcommunity.microsoft.com/discussions/microsoft-copilot/copilot-in-word---use-web-content-and-citations/4156354 |
| 89 | Multi | Claude and Codex search | Results include AI-written sites and the built-in search cannot exclude domains or keywords. | SLOP | 2026-09-03 (approx) | yes | https://news.ycombinator.com/item?id=49536375 |
| 90 | Multi | AI agents | Agents cite comparison pages hosted by the vendors being compared, without weighing motive. | SLOP, INJECT | 2026-09-03 (approx) | yes | https://news.ycombinator.com/item?id=49536375 |
| 91 | Multi | Several LLMs | All recommended a town square that does not exist, traced to one misspelled Reddit comment. | NICHE, SLOP | 2026-09-03 (approx) | yes | https://news.ycombinator.com/item?id=49536375 |

## 5. Confidence notes and what could not be reached

What could not be reached

- Reddit: not reachable. WebSearch refuses reddit.com as a domain filter, WebFetch is refused for reddit.com, and the browser pane blocks old.reddit.com. None of r/ChatGPT, r/OpenAI, r/ClaudeAI, r/ClaudeCode, r/GeminiAI, r/Bard, r/perplexity_ai or r/LocalLLaMA is in this sample. This is the largest gap, since Reddit is where most consumer complaints live.
- X and LinkedIn: no 2026 practitioner posts surfaced. The only X hit was a February 2025 post, outside the window, and it was not opened, so it is left out.
- Grok: no direct user complaint about Grok search could be opened. The only Grok items found were an HN link to a fact-checking study and an HN comment praising Grok's live X data. The Grok column is empty because of reach, not because Grok has no failures.
- Copilot: only 3 complaints, one of them from 2024. Consumer Copilot and Bing forums returned little.
- Claude consumer apps (Claude.ai web search and Research): few direct reports. Most Claude data is Claude Code GitHub issues.

How to read the numbers

- Counts measure where vocal technical users post, not failure rates. Developer forums and GitHub over-represent API and agent use. The two Perplexity audits are the only items with measured rates, and both are single snapshots of English questions about tech companies.
- Hacker News dates are approximate. HN shows relative ages, so dates were worked out from 2026-10-25 and marked approx.
- Many GitHub issues were closed by a stale bot as not planned with no maintainer reply. Closed does not mean fixed.
- Several GitHub reports say the reporter used Claude to write the issue. The claims were taken as user reports and not reproduced here.
- A few items are user concerns rather than incidents (for example the Gemini per-turn injection point in HN 48205782). They are labelled as such in the table.
- Paraphrases come from WebFetch summaries of each page. Each was opened, but long HN threads were read only in their first 100,000 characters, so later comments were not sampled.
- One item (HN 49242132) rests on a headline only, because the linked article body did not load.
- 18 complaints are dated before 2025-10-25, so they fall outside the 12 month window. They are kept for pattern context and their dates show this.

Suggested next steps for the team

- Pull Reddit through a route that is allowed, such as a person exporting threads by hand, to balance the developer skew.
- Ask a testing strand to check the zero-source Deep Research pattern and silent caps directly, since these are the freshest and most repeated signals.
