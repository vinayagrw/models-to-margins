# T1: Claude Code WebSearch and WebFetch, measured test

## Purpose

Measure how well Claude Code's own web tools find, read and quote primary pages, using ground truth taken outside the tools.

## Version, date, tester

- Claude Code version: 2.1.296 (from `claude --version`)
- Date: 2026-10-25
- Machine: one macOS machine
- Tester: Claude Code itself (Opus 5.5), running WebSearch and WebFetch from this install. The tools under test are the tester's own tools.
- Independence caveat: the test is independent of vendor docs and third-party write-ups. It is not independent of the vendor, because the vendor's model ran the test and scored it.

## Protocol

- Ground truth: every probe page was downloaded with `curl -sL` and a Chrome user agent into an empty scratch folder. Text came from python `html.parser` for HTML and `pypdf` for PDFs (`pdftotext` was not installed). Python ran with `-I`. WebFetch output was never used as ground truth.
- A. Search accuracy (S01 to S20). 10 stable facts (2024 and 2025) and 10 dated 2026 facts, all from pages already in the V1, V2 and V_R2_R4 ledgers. Each answer was confirmed in the curl text first. Each question went to WebSearch in plain words with no URL. The primary counts as found when the same host and path appeared in the results (query string and trailing slash ignored). WebFetch then ran on the best result. If that fetch failed or lacked the answer, the next sensible URL was fetched and the count recorded. Search mode was not recorded. 19 of 20 queries named the publisher or the page title (all but S19). 7 of the 10 dated 2026 pages are cited in P2_E1, whose searches ran mostly in extended mode.
- B. Fetch fidelity (F01 to F12). 12 pages: 5 with more than 100,000 characters of text (including the Claude Code changelog), 2 PDFs and 2 JavaScript-heavy pages. One target sentence per page, 5 of them past character 100,000. WebFetch was asked to return the sentence verbatim from its first words. Offered offsets were followed.
- C. Quote cap (Q01 to Q04). WebFetch was asked for a 300-character verbatim passage from 2 documentation sites and 2 ordinary sites. Returned length was measured after removing markdown link markup.
- D. Backend (B01 to B04). The top results of 4 WebSearch queries were compared with Brave Search results fetched by curl.
- Budget: 20 WebSearch calls and 48 WebFetch calls in total.
- Swaps: two Gartner press releases and one BCG press release returned HTTP 403 to curl. The Gartner 2025 page was replaced by the KPMG 2025 trust report PDF (S10). The other two were dropped. ai.google.dev sent plain curl into a sign-in redirect loop, so its ground truth was taken with a curl cookie jar (S14).

## Results summary

| Probe group | n | Result |
|---|---|---|
| A. Search accuracy | 20 | Primary page in results: 7 of 20, Wilson 95% 18.1% to 56.7% (stable 5 of 10, 23.7% to 76.3%. Dated 2026 2 of 10, 5.7% to 51.0%. Gap p = 0.35, Fisher exact). Answer correct 15, 53.1% to 88.8%, of which 8 read from the primary page. Partly 2, wrong or none 3. Wrong numbers given: 1 as the answer (S19) and 1 as a labelled inference (S09). WebSearch's own summary misstated the page on 2 of 20 (S11, S13). Summaries were not saved, so 2 is a floor. |
| B. Fetch fidelity | 12 | Exact 4, paraphrased 5, missing 3, invented 0 (Wilson 95% upper bound 24.2%). The 5 paraphrased sentences matched word for word for their first 101 to 124 characters on sites with the 125-character quote cap, so they show a quote limit, not a reading failure. Sentences past 100,000 characters reached: 2 of 5 (2 of 3 on HTML pages), both only through offset calls. |
| C. Quote cap | 4 | Documentation sites returned 205 and 414 visible characters with no cap. News and blog returned 121 and 88 characters and cited a 125-character limit. All 4 matched ground truth. |
| D. Backend | 4 | Brave reachable by curl. Top-10 URL overlap 3, 1, 2 and 1, so 7 of 38 WebSearch results. |

## A. Search accuracy

| ID | Question | Ground truth source URL | Result | Note |
|---|---|---|---|---|
| S01 | Share of Google visits with a result click when no AI summary appeared | https://www.pewresearch.org/short-reads/2025/07/22/google-users-are-less-likely-to-click-on-links-when-an-ai-summary-appears-in-the-results/ | Primary yes (rank 9). Answer yes: 15% and 8% | Ranks 5 and 10 were truncated Pew slugs |
| S02 | Share of queries the eight AI search tools got wrong (Tow Center) | https://www.cjr.org/tow_center/we-compared-eight-ai-search-engines-theyre-all-bad-at-citing-news.php | Primary yes (rank 2). Answer yes: more than 60 percent | Rank 3 was the same URL with a trailing period |
| S03 | Share of responses with a significant issue (EBU and BBC) | https://www.ebu.ch/files/live/sites/ebu/files/Publications/Intelligence/open/EBU-Intelligence-BBC_News_Integrity_in_AI_Assistants_Report_2025.pdf | Primary no. Answer yes: 45% | Answered from the EBU press release |
| S04 | Multi-agent gain over single-agent Claude Opus 4 | https://www.anthropic.com/engineering/multi-agent-research-system | Primary yes (rank 1). Answer yes: 90.2% | |
| S05 | Daily requests from Perplexity's undeclared crawler (Cloudflare) | https://blog.cloudflare.com/perplexity-is-using-stealth-undeclared-crawlers-to-evade-website-no-crawl-directives/ | Primary no. Answer yes: 3 to 6 million | 3 fetches. Rank 1 gave HTTP 403, rank 2 gave HTTP 404 |
| S06 | Slowdown for experienced developers using AI (METR 2025) | https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/ | Primary no. Answer yes: 19% | Answered from The Register |
| S07 | GPTBot requests in a month on Vercel | https://vercel.com/blog/the-rise-of-the-ai-crawler | Primary yes (rank 2). Answer yes: 569 million | First fetch timed out, retry worked |
| S08 | Share of firms with AI model breaches and share lacking AI access controls (IBM 2025) | https://newsroom.ibm.com/2025-07-30-ibm-report-13-of-organizations-reported-breaches-of-ai-models-or-applications,-97-of-which-reported-lacking-proper-ai-access-controls | Primary yes (rank 6). Answer yes: 13% and 97% | |
| S09 | NewsGuard one-year audit false-claim rate against a year earlier | https://www.newsguardtech.com/press/newsguard-one-year-ai-audit-progress-report-finds-that-ai-models-spread-falsehoods-in-the-news-35-of-the-time/ | Primary no. Answer partly: 35% | Only the /embed/ copy appeared. Prior year given as about 17.5% by inference, page says 18 percent |
| S10 | Share who use AI regularly (KPMG 2025) | https://assets.kpmg.com/content/dam/kpmgsites/xx/pdf/2025/05/trust-attitudes-and-use-of-ai-global-report.pdf | Primary no. Answer yes: 66% | Swap for a Gartner page. Nine results were KPMG country pages |
| S11 | Share of AI Overviews correct and fully supported (Oumi 2026) | https://oumi.ai/blog/oumis-study-finds-50-of-ai-overviews | Primary yes (rank 9). Answer yes: 39% | WebSearch summary said Oumi did not report it and computed about 40% |
| S12 | Share of AI Overviews fully grounded (WashU 2026) | https://source.washu.edu/2026/09/washu-research-finds-gaps-in-google-ai-overview-citations-claims/ | Primary no. Answer yes: 41.9% | 2 fetches. First page lacked the figure and named the primary |
| S13 | Share of ChatGPT responses with fan-out queries (Ahrefs 2026) | https://ahrefs.com/blog/query-fan-out-chatgpt/ | Primary yes (rank 1). Answer yes: 14.4% of 66.6 million | WebSearch summary said the share was not stated |
| S14 | Gemini 3 Google Search grounding price | https://ai.google.dev/gemini-api/docs/google-search | Primary no. Answer yes: $14 per 1,000 | Eight of nine results were one pricing page in eight languages |
| S15 | Share of crime answers from police force websites (Press Gazette 2026) | https://pressgazette.co.uk/news/ai-answer-engines-bypass-local-news-outlets-going-straight-to-official-sources/ | Primary no. Answer no | All results off topic. Nothing fetched. No number invented |
| S16 | Model confidence against accuracy (Berkeley Haas 2026) | https://newsroom.haas.berkeley.edu/research/ai-chatbots-are-overconfident-like-humans/ | Primary no. Answer yes: 88% and 79% | Answered from a republication |
| S17 | Gemini 4 Argon hallucination rate (Artificial Analysis 2026) | https://artificialanalysis.ai/articles/gemini-4-argon-google-top-three-labs | Primary no. Answer no | WebSearch found no Gemini 4 page. Fetched page ended with a truncation marker and no offset |
| S18 | Share of election questions answered badly before the 2026 midterms (NBC) | https://www.nbcnews.com/tech/tech-news/ai-midterm-chatbot-voting-election-chatgpt-meta-google-rcna595735 | Primary no. Answer yes: 29% | Answered from a syndicated copy |
| S19 | Share of robots.txt files blocking GPTBot (Crawl Readiness, Oct 2026) | https://www.crawlreadiness.com/research/ai-crawler-access-october-2026 | Primary no. Answer no: 8.11% given, truth 18.5% | Fetched a different study |
| S20 | Perplexity web_search price drop under fast presets (2026) | https://docs.perplexity.ai/docs/resources/changelog | Primary no. Answer partly: $1.00 and $2.50 listed, no drop stated | Pricing page on the same host |

Result list checks: 13 of 20 searches returned 9 links instead of 10. Of the 187 result URLs, curl got HTTP 200 from 142, 403 from 25, 404 from 9, a sign-in redirect from 8, the LinkedIn bot code 999 from 2 and no response from 1. At least 4 URLs were visibly damaged (2 truncated slugs, 1 trailing period, 1 date pasted into the path).

## B. Fetch fidelity

| ID | Page | Ground truth source URL | Result | Note |
|---|---|---|---|---|
| F01 | Claude Code changelog, 1,073,239 chars by curl, 1,105,050 by WebFetch. Sentence at 800,342 | https://code.claude.com/docs/en/changelog | Exact on call 3 | Calls 1 and 2 gave NOT FOUND with length and next offset. Call 3 used offset 780000 chosen by the tester. Offered offsets alone need 9 calls |
| F02 | EBU and BBC report PDF, 124,227 chars. Sentence at 112,426 | https://www.ebu.ch/files/live/sites/ebu/files/Publications/Intelligence/open/EBU-Intelligence-BBC_News_Integrity_in_AI_Assistants_Report_2025.pdf | Missing | No truncation note. Offset 100000 also failed. A sentence at 2,185 also failed. The model said it saw compressed PDF streams |
| F03 | KPMG trust report PDF, 304,744 chars. Sentence at 250,123 | https://assets.kpmg.com/content/dam/kpmgsites/xx/pdf/2025/05/trust-attitudes-and-use-of-ai-global-report.pdf | Missing | No truncation note, no offset offered |
| F04 | Wikipedia World War II, 192,800 chars by curl, 314,033 by WebFetch. Sentence at 130,059 | https://en.wikipedia.org/wiki/World_War_II | Missing | NOT FOUND in all 4 windows. The sentence sits in a quoted footnote. The extractor and WebFetch differ by 63% in length on this page, so this miss may come from how the footnote is rendered, not from WebFetch. Counted as missing, cause unresolved |
| F05 | Python stdtypes, 191,374 chars by curl, 265,241 by WebFetch. Sentence at 150,033 | https://docs.python.org/3/library/stdtypes.html | Exact on call 3 | Found at offset 200000 with markdown links kept |
| F06 | arXiv 2610.21731v1 HTML, 53,784 chars. Sentence at 27,205 | https://arxiv.org/html/2610.21731v1 | Exact, split in two | Tool split it into two quotes, citing a 125-character limit |
| F07 | Ramp AI Index, Next.js page (1.08 MB HTML, 13,845 chars). Sentence at 1,095 | https://ramp.com/data/ai-index-sept-2026 | Exact | 101 characters |
| F08 | Artificial Analysis article, Next.js page (5,463 chars). Sentence at 2,504 | https://artificialanalysis.ai/articles/gemini-4-argon-google-top-three-labs | Paraphrased | First 103 characters exact. Numbers in the paraphrase matched |
| F09 | Pew short read (10,716 chars). Sentence at 5,618 | https://www.pewresearch.org/short-reads/2025/07/22/google-users-are-less-likely-to-click-on-links-when-an-ai-summary-appears-in-the-results/ | Paraphrased | First 101 characters exact |
| F10 | CJR Tow Center (23,012 chars). Sentence at 11,502 | https://www.cjr.org/tow_center/we-compared-eight-ai-search-engines-theyre-all-bad-at-citing-news.php | Paraphrased | First 124 characters exact |
| F11 | Ahrefs fan-out study (21,676 chars). Sentence at 10,019 | https://ahrefs.com/blog/query-fan-out-chatgpt/ | Paraphrased | 106 of 121 characters exact, then a curly apostrophe became straight |
| F12 | Anthropic engineering post (26,765 chars). Sentence at 678 | https://www.anthropic.com/engineering/multi-agent-research-system | Paraphrased | First 115 characters exact. Paraphrase said "multi-step tasks" where the page says "complex tasks" |

Truncation reporting: all 4 HTML pages over 100,000 characters (F01, F04, F05, Q01) carried a note with the total length, the unread amount and the next offset. Neither PDF carried any note. One HTML page in A (S17) ended with a truncation marker and no offset. WebFetch's character counts ran 3% to 63% above the curl text counts on the same pages, so the two do not share an offset scale.

## C. Quote cap

| ID | Page | Ground truth source URL | Result | Note |
|---|---|---|---|---|
| Q01 | Python built-in functions (docs) | https://docs.python.org/3/library/functions.html | 205 visible chars (300 with markdown), matched | No cap. It counted markdown link syntax toward the 300 |
| Q02 | MDN HTTP caching guide (docs) | https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Caching | 414 visible chars, matched | No cap. Added an unrequested page summary |
| Q03 | Press Gazette news article | https://pressgazette.co.uk/news/ai-answer-engines-bypass-local-news-outlets-going-straight-to-official-sources/ | 121 chars, matched | Cited a 125-character limit and paraphrased the rest |
| Q04 | Cloudflare blog post | https://blog.cloudflare.com/perplexity-is-using-stealth-undeclared-crawlers-to-evade-website-no-crawl-directives/ | 88 chars, matched | Cited a 125-character limit and stopped at the sentence end |

## D. Backend

Brave Search answered curl with HTTP 200, so D ran in full. Overlap counts host plus path, ignoring scheme, www, query string and trailing slash.

| ID | Query (same as) | Ground truth source URL | Result | Note |
|---|---|---|---|---|
| B01 | S01 Pew click question | https://search.brave.com/search?source=web&q=... | 3 of 10 URLs shared | Primary at Brave rank 1, WebSearch rank 9 |
| B02 | S04 Anthropic multi-agent question | https://search.brave.com/search?source=web&q=... | 1 of 10 URLs shared | Primary at rank 1 in both |
| B03 | S13 Ahrefs fan-out question | https://search.brave.com/search?source=web&q=... | 2 shared (WebSearch gave 9, Brave 10) | Primary at rank 1 in both |
| B04 | S19 GPTBot robots.txt question | https://search.brave.com/search?source=web&q=... | 1 shared (WebSearch gave 9, Brave 10) | Primary in neither |

Low overlap does not show which backend WebSearch uses. It shows only that WebSearch's lists are not Brave's lists for these 4 queries on this day.

## Errors, blocks and caps seen

- WebFetch HTTP 403 on techrepublic.com (S05). Curl got 403 too.
- WebFetch HTTP 404 on a geekflare.com URL that WebSearch returned (S05).
- WebFetch ETIMEDOUT on vercel.com once (S07). The retry worked.
- WebFetch read neither PDF and gave no truncation note (F02, F03).
- A 125-character quote limit on 8 probes (F06, F08 to F12, Q03, Q04). None on docs.python.org or MDN (F05, Q01, Q02).
- No WebSearch cap or error at 20 calls.

## Limits

- Small sample: 20 search questions, 12 pages, 4 quote probes, 4 backend queries.
- One machine, one network, one day. Search results and caches change.
- Claude was the tester. The same vendor's model picked the questions, chose the best result to fetch, ran the tools and scored the answers.
- Scoring of "best result" and "partly" is judgment by the tester. The JSON holds every result URL, curl status and final answer, so primary-page and overlap counts can be rescored by script. It does not hold the WebFetch prompts, WebFetch replies, WebSearch summaries or search mode, so the exact, paraphrased, missing, partly and correct scores cannot be rechecked. A rerun must save them.
- 3 candidate pages were removed because curl got HTTP 403. Blocked pages are the ones most likely to fail, so group A leaves out the hardest cases.
- Rung: URL counts are rung 3. Answer and fetch scores are rung 6 (self-report by the party measured) until a rater who is not a Claude model rescores them from saved replies.
- Curl status codes stand in for page health. A 403 or 404 to curl may differ in a browser.
- Ground truth text came from a simple extractor. Offsets are positions in that text, not in WebFetch's markdown.
