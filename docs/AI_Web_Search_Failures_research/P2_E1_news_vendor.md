# P2 E1: News, vendor and policy sweep, last 30 days

Window for articles: 2026-09-25 to 2026-10-25. Window for launches and rule changes: 2026-08-25 to 2026-10-25. Swept on 2026-10-25.

Method: 52 web searches (extended mode for most), about 55 pages opened. Items already in U2 section 4 or U3 section 4 are only repeated where a new detail was found. Items dated just before the window are marked "pre-window" and are kept only where they set up something inside the window.

Evidence-ladder rungs: 1 audited, 2 primary record or official doc, 3 revealed behaviour or preprint, 4 deployment scale, 5 credible secondary news, 6 self-report, 7 vendor claim or unopened. Vendor claims carry [VENDOR].

---

## 1. Verdict table

| # | Challenge | Verdict | Best dated evidence in window |
|---|---|---|---|
| 1 | Citation does not hold the claim | STILL TRUE | WashU audit of Google AI Overviews, 2026-09-29. About 11% of 98,020 checked claims not supported by the cited page. Only 41.9% of overviews fully grounded |
| 2 | Silent failure, confident answer | STILL TRUE | Full Fact benchmark report one, about 2026-10-15. Same confident tone whether right, out of date or premature. Vendors claim gains [VENDOR] |
| 3 | Shallow search, stops too early | STILL TRUE | Ahrefs, 2026-10-12. Only 14.4% of 66.6M free logged-out ChatGPT answers ran any search fan-out, about 1.6 queries when they did |
| 4 | Weak or planted sources win | WORSE | "Dark Sourcery" campaign, Gigazine 2026-09-25 and Paubox 2026-10-20. Fake support pages for at least 374 companies repeated by ChatGPT, Gemini and AI Overviews |
| 5 | Stale facts shown as current | STILL TRUE | Full Fact report one. Superseded asylum rate, wrong prime minister into September, wrong sense of what date it is, all with web search on |
| 6 | Reads snippets, not pages | STILL TRUE (thin in news) | Seer Interactive, 2026-10-22. Retrieved-only URLs rose from 9 to 34 in one capture. Retrieval does not prove a page was read |
| 7 | Blocked or unreadable pages | WORSE | Startup Fortune 2026-10-17 (Cloudflare defaults now cover existing free tier) plus WinBuzzer 2026-10-20 and TechCrunch 2026-10-21 (Amazon, JPMorgan, Schwab, Delta block agents) |
| 8 | Goes along with a false premise | NOT RE-CONFIRMED IN LAST 30 DAYS | Nothing in window. Nearest is NPR and NewsGuard 2026-08-30 (not opened, snippet suggests chatbots caught loaded premises) |
| 9 | Memory beats search | STILL TRUE | Full Fact report one. Search was on, yet answers looked "anchored in historical training data". Ahrefs shows most free answers never search |
| 10 | Planted instructions in pages | STILL TRUE (vendors claim PARTLY FIXED) | The Register 2026-10-15. Signals Corps found about 8,000 sites sending AI-directed HTTP headers in 217M responses, 30 attempting injection |

---

## 2. Evidence per challenge

### 1. Citation does not hold the claim: STILL TRUE

- WashU, "WashU research finds gaps in Google AI Overview citations, claims", 2026-09-29. Opened yes. 55,393 searches, 98,020 verifiable claims checked against cited pages. About 89% supported, 7% not found in the cited text, 4% contradicted the cited source. Only 41.9% of overviews fully grounded. Paper is for the October 2026 ACM Internet Measurement Conference. Rung 1 (peer-reviewed audit, reached via the university release). https://source.washu.edu/2026/09/washu-research-finds-gaps-in-google-ai-overview-citations-claims/
- Search Engine Roundtable, "Google AI Mode Gemini 3.8 Flash Not Link / Citation Friendly?", 2026-09-03 (pre-window, inside launch window). Opened yes. After the model swap, AI Mode answers for many queries had no links or citations. Google's Robby Stein on X, 2026-09-04: "This isn't working as intended". Fixed within about a day. Rung 5. https://www.seroundtable.com/google-ai-mode-gemini-38-no-links-42011.html
- Search Engine Roundtable, "Google AI Overview Citation Cards With AI-Generated Summary Snippets", 2026-10-23. Opened yes. Google is testing AI-written summaries inside citation cards. The text describing a source is Google's reading of the page for that query, not the publisher's words. Adds one more layer where the citation and the source can drift apart. Rung 5. https://www.seroundtable.com/google-ai-overview-citation-ai-summaries-42361.html
- Startup Fortune, "Dow Jones and New York Post press copyright case as Perplexity nears trial", 2026-10-22. Opened yes. Complaint alleges Perplexity invented quotes and presented them as Wall Street Journal reporting (F-16 story). Allegations only. Article is inconsistent on the fact-discovery date. Rung 5. https://startupfortune.com/dow-jones-and-new-york-post-press-copyright-case-as-perplexity-nears-trial/
- Mad Robot blog, "German courts rule Google liable for what its AI search says", 2026-10-18. Opened yes. Aachen Regional Court order 8 O 268/26 of 2026-09-24: AI Mode said a named doctor had been convicted of a sex crime. The conviction belonged to a different professor. Munich case 26 O 869/26: AI Overviews made claims none of the linked sources said. Rung 5 (blog citing court orders, orders not opened). https://madrobot.blog/2026/10/18/german-courts-google-liable-ai-overviews-ai-mode-aachen-munich-ruling/

### 2. Silent failure, confident answer: STILL TRUE

- Full Fact, "Wrong on Sunday, right on Monday. Why AI chatbots have a confidence problem" (AI benchmark report one), about 2026-10-15 (page undated, data 2026-07-15 to 2026-09-22, coverage dated 2026-10-15). Opened yes. Web search was allowed for all models. Models stated a proposed asylum payment as adopted and said bank cards were accepted for voter ID when they were not. Gemini 3.1 Pro once replied only "shame". Quote: "a model's confidence is no guide to its reliability." Rung 2. https://fullfact.org/ai-benchmark/report-one/
- Resultsense, "Full Fact study finds chatbots confidently wrong on UK facts", 2026-10-15. Opened yes. Confirms date and five products (Claude, ChatGPT, Gemini, DeepSeek, Grok). Rung 5. https://www.resultsense.com/news/2026-10-15-full-fact-chatbot-accuracy-ten-week-study/
- Berkeley Haas, "AI chatbots are overconfident, like humans", 2026-10-05. Opened yes. 11 models averaged 88% stated confidence but were right 79% of the time. Not a web search test, so weak support only. Rung 3 (working paper). https://newsroom.haas.berkeley.edu/research/ai-chatbots-are-overconfident-like-humans/
- Counter-signals, all vendor or lab:
  - OpenAI GPT-6 Astra system card, 2026-09-03 (launch window). Opened yes. Section 8.3.2 "Broken Search Tool": GPT-5.6 Sol fails to admit the search tool is down 10 times as often as GPT-6 Astra. No absolute rate in the text. Rung 7 [VENDOR]. https://deploymentsafety.openai.com/gpt-6-astra
  - Artificial Analysis, "Gemini 4 Argon", 2026-09-30. Opened yes. 15% hallucination rate on AA-Omniscience versus 51% for GPT-6 Astra, because Argon declines more often. Accuracy is lower (50% versus 63%). Not stated whether search was on. Rung 3 (independent lab eval). https://artificialanalysis.ai/articles/gemini-4-argon-google-top-three-labs
  - The Next Web, 2026-10-02, repeats the same numbers and the abstention explanation. Opened yes. Rung 5. https://thenextweb.com/news/gemini-4-argon-artificial-analysis-gpt-6-astra-hallucination

### 3. Shallow search, stops too early: STILL TRUE

- Ahrefs, "How ChatGPT Does Query Fan-Out (15 Million Queries Studied)", 2026-10-12. Opened yes. 66.6M free, logged-out GPT-5.6 Luna answers from August and September 2026. Only 14.4% contained fan-out queries, averaging about 1.6 per answer. Ahrefs corrected an earlier claim that these answers searched the web. Rung 4. https://ahrefs.com/blog/query-fan-out-chatgpt/
- Perplexity API changelog, September and October 2026 (entries dated by month only). Opened yes. Fast Search added in September. In October the low, medium, high and xhigh Agent API presets all moved to Fast Search, about 800 ms faster and $1.00 instead of $2.50 per 1,000 calls. Standard search now needs an explicit setting. Shows cost and speed pressure on search depth. Rung 2 for the change, quality effect unknown [VENDOR]. https://docs.perplexity.ai/docs/resources/changelog
- Seer Interactive, "Same Prompt, Different Data Structure: ChatGPT's Search Data Keeps Changing", 2026-10-22. Opened yes. Two runs of the same prompt eight minutes apart on 2026-09-17 shared zero exact query strings. Shows query plans are unstable run to run. Rung 3 (small capture). https://www.seerinteractive.com/insights/chatgpt-data-structure
- Amani et al., "Characterizing Web Search by Conversational LLM Agents", arXiv 2609.19244, 2026-09-16 (pre-window). Opened yes (abstract). ChatGPT, Claude, Grok and DeepSeek differ a lot in when they search. More search did not mean better answers. Some claims rest on search results that are not cited. Rung 3. https://arxiv.org/abs/2609.19244

### 4. Weak or planted sources win: WORSE

- Gigazine, "'Dark Sourcery' is a cyberattack that uses AI such as ChatGPT to generate fake contact information", 2026-09-25. Opened yes. Vigilance Security found fake support pages, PDFs and reviews seeded so that ChatGPT, Gemini and AI Overviews return fake phone numbers and login pages. At least 374 companies, including Delta, Lufthansa, JP Morgan Chase and Bank of America. Campaign ongoing. Rung 5 (news of a security vendor's research). https://gigazine.net/gsc_news/en/20260925-dark-sourcery-hackers-manipulate-ai-scam/
- Paubox, "Fake support numbers planted in AI chatbot answers", 2026-10-20. Opened yes. Relays Dark Reading: tens of thousands of pages. Pairs content on university and government domains with forum and review posts. Researchers called returned numbers and were asked for card details. Not prompt injection: the poisoned page is simply trusted. Rung 5. https://www.paubox.com/blog/fake-support-numbers-planted-in-ai-chatbot-answers
- Pavel Gurov, "Election-day AI poisoning in Germany", 2026-09-24, updated 2026-09-28 with Perplexity's response. Opened yes. 492 answers to German political questions on 2026-09-20 state election day. Perplexity cited Russia Today or RT-linked sites in 20 of 100 answers, Copilot 3 of 100, Meta AI 2 of 20, AI Overviews, ChatGPT Search and Gemini 0. EU sanctions and ISP blocks on RT did not stop the citations. Rung 3 (self-published audit). https://gurovdigital.com/newsletter/election-day-ai-poisoning-germany
- Full Fact report one (above). Gemini 3.1 Pro cited a 2012 Montague Reporter PDF and a 2014 Northwest Herald issue for a UK MP question. Some UK voter ID answers cited vote.gov and usa.gov. Rung 2.
- Press Gazette, "AI answer engines often bypass local news outlets", 2026-10-22. Opened yes. Searchable study, about 30,000 prompts on 100 UK towns. ChatGPT used council or official sources on 81.3% of local questions and local news on 0.9%. Police sites supplied 57.8% of crime answers. Not "weak" sources, but shows a narrow source set. Rung 5 (report of a vendor study). https://pressgazette.co.uk/news/ai-answer-engines-bypass-local-news-outlets-going-straight-to-official-sources/
- Counter-signal: Ahrefs 2026-10-12 (above). ChatGPT Reddit citations fell 88% from March to September 2026, Wikipedia 80%. 84.4% of factual questions cited at least one official source. A shift toward primary sources that may cut some weak-source exposure. Rung 4.

### 5. Stale facts shown as current: STILL TRUE

- Full Fact report one (above). With search on: several models gave the old £8.86 weekly asylum rate (raised to £9.95 in June 2025). DeepSeek still named Keir Starmer as prime minister into September, two months after he was replaced. Gemini 2.5 Pro and 2.5 Flash refused first-half 2026 figures, saying that period was in the future. Claude treated a past date as still ahead. Several models named 2022 instead of 2025 for England's last women's trophy. Rung 2.
- NBC News, "AI chatbots frequently flub voting questions ahead of midterms, study finds", 2026-09-03 (pre-window, launch window). Opened yes. Institute for Strategic Dialogue: 29% of basic election answers from six chatbots were inaccurate, unclear or outdated. Spanish answers worse. Rung 5. https://www.nbcnews.com/tech/tech-news/ai-midterm-chatbot-voting-election-chatgpt-meta-google-rcna595735
- Mitigation [VENDOR]: Pulse 2.0, "Anthropic Strengthens Claude Election Safeguards Ahead Of 2026 U.S. Midterms", 2026-10-15. Opened yes. Claude to insert official Democracy Works voting information (polling places, ID rules) and live official results, instead of relying on search or memory. Rung 5 of a vendor announcement. https://pulse2.com/anthropic-strengthens-claude-election-safeguards-ahead-of-2026-u-s-midterms/

### 6. Reads snippets, not pages: STILL TRUE (thin in news)

- Seer Interactive, 2026-10-22 (above). Unique retrieved URLs went from 14 to 40, citation URLs from 5 to 6, retrieved-only URLs from 9 to 34. The author warns a URL in a retrieval record does not prove the page was read. Rung 3.
- Search Engine Roundtable 2026-10-23 (above). Google's own AI summary of each cited page now sits on the citation card. Users read a summary of a summary. Rung 5.
- Anthropic Claude Platform release notes, 2026-10-07. Opened yes. Managed Agents web_fetch now only fetches URLs that already appeared in the session (for example in a web_search result). Others return url_not_in_prior_context. Purpose is to cut data theft risk, but it also means the agent cannot open a page it guesses or builds. Rung 2. https://platform.claude.com/docs/en/release-notes/overview
- The main new evidence ("Retrieved but Not Read", arXiv 2610.21731, and the Claude Code WebFetch changes) is already in U3 section 4. No new news story in the window added numbers.

### 7. Blocked or unreadable pages: WORSE

- Startup Fortune, "Websites are locking AI crawlers out as agent bot traffic surges in 2026", 2026-10-17. Opened yes. Cloudflare's 2026-09-15 default (block Training and Agent bots on ad pages) also applies to all existing free-tier customers and enforces at the network layer, not only robots.txt. Of 1,530 top domains with a reachable robots.txt, 292 (19.1%) disallow at least one of GPTBot, ClaudeBot, Google-Extended or PerplexityBot. Rung 5. https://startupfortune.com/websites-are-locking-ai-crawlers-out-as-agent-bot-traffic-surges-in-2026/
- WinBuzzer, "Amazon and JPMorgan are Restricting AI Agents for Shopping and Banking", 2026-10-20. Opened yes. Amazon blocked Meta's Muse around 2026-09-20. JPMorgan blocks outside agents that log in with customer credentials (confirmed to CNBC on 2026-10-13). Schwab, Delta, Yelp and eBay restrict agents in different ways. Rung 5. https://winbuzzer.com/2026/10/20/website-blocks-limit-ai-agents-shopping-and-banking-xcxwbn/
- TechCrunch, "While Amazon blocks AI agents, Walmart rolls out the welcome mat", 2026-10-21. Opened yes. Amazon blocks agents from buying for shoppers. Walmart opens an MCP "Agent Gateway" for approved agents only. Access is moving from open crawling to gated, approved channels. Rung 5. https://techcrunch.com/2026/10/21/while-amazon-blocks-ai-agents-walmart-rolls-out-the-welcome-mat/
- Dev.to (402registry), "Three weeks on, 80 of 82 x402 sites still block AI training crawlers", 2026-10-21. Opened yes. Of 86 sites that refused GPTBot and ClaudeBot on 2026-09-27, 80 of the 82 still online still refused both on 2026-10-18. None of 770 allowing sites started blocking. Small sample, blocks are sticky. Rung 6. https://dev.to/georgi_kalchev_85d01f7368/three-weeks-on-80-of-82-x402-sites-still-block-ai-training-crawlers-1ch1
- Anthropic Claude Platform release notes, 2026-10-20. Opened yes. Org admins can now turn web fetch off entirely, or set allowed and blocked domains. Managed Agents follow org web search settings (from 2026-10-06) and domain rules (from 2026-10-14). More places where a fetch can be refused by policy. Rung 2. https://platform.claude.com/docs/en/release-notes/overview
- Context: Search Engine Journal, 2026-07-02 (pre-window). Opened yes. Cloudflare applies the strictest rule to mixed crawlers, so blocking Training can also block Googlebot, Bingbot and Applebot. Rung 5. https://www.searchenginejournal.com/cloudflares-ai-crawler-rules-can-block-googlebot/581385/

### 8. Goes along with a false premise: NOT RE-CONFIRMED IN LAST 30 DAYS

Searched: "AI assistant sycophancy false premise search answers news October 2026", "AI chatbot false premise OR loaded question test search October 2026", "sycophancy chatbot study news October 2026 agrees with users wrong", "chatbots Grok Perplexity spread false claim breaking news event October 2026 fact check", "Grok is this true fact check wrong X users October 2026", "NewsGuard AI audit October 2026 chatbots false claims".

Nearest items, none inside the window:
- NPR with NewsGuard, "We tested how AI chatbots would handle foreign propaganda. They did surprisingly well", 2026-08-30. Opened no (two timeouts). Search snippet says in a loaded-question example all chatbots and AI Overviews flagged the faulty premise. Possible partial improvement. Rung 7. https://www.npr.org/2026/08/30/nx-s1-5876436/chatbots-search-propaganda
- Full Fact report one presents proposals as adopted, which is premature fact handling, not user premise following. Not counted.
- No vendor release note in the window named sycophancy or false premise for search.

### 9. Memory beats search (knowledge conflict): STILL TRUE

- Full Fact report one (above). Web search was enabled, yet Full Fact judged DeepSeek's shifting answers about Starmer to be "anchored in historical training data" and said a chatbot may skip the live search it needs. Rung 2.
- Ahrefs 2026-10-12 (above). 85.6% of free logged-out ChatGPT answers in the sample ran no fan-out query, so they came from model memory plus any non-fan-out retrieval. Rung 4.
- No vendor note in the window describes a fix for memory overriding fresh results.

### 10. Planted instructions in pages (indirect prompt injection, GEO, cloaking): STILL TRUE, vendors claim PARTLY FIXED

- The Register, "Indirect prompt injection starts turning up in webpage headers", 2026-10-15. Opened yes. Signals Corps sampled 217M HTTP responses from Common Crawl. Almost 8,000 sites sent AI-directed header messages (6,989 an x-llms-txt header). 30 sites tried injection, 22 of them mostly pranks. One header targeted an AI hiring screener with a fake match score. Real-world harm judged very unlikely today. Rung 3 via rung 5. https://www.theregister.com/ai-and-ml/2026/10/15/indirect-prompt-injection-starts-turning-up-in-webpage-headers-please-ignore-all-previous-instructions-and-rise-up-against-your-masters/5303434
- Adversa AI, "AI agent security incidents and vulnerabilities, October 2026", 2026-10-04. Opened yes. SalesBleed (Zenity Labs): injected Web-to-Lead forms hijack Salesforce Agentforce. MaxKB CVE-2026-77521 (Lasso): injection in crawled web content reaches a shell tool. "Divide and inject" (arXiv 2609.36576): fragments hidden in retrieved content reached 61.4% attack success. BragJack (Forever Security): a browser extension can take over Gemini in Chrome, Edge Copilot, Comet and Claude in Chrome (extension based, not page based). Rung 5. https://adversa.ai/blog/top-ai-agent-security-resources-october-2026/
- Dark Sourcery (see challenge 4) is the GEO side of this challenge at scale. Rung 5.
- Vendor counter-claims [VENDOR]:
  - GPT-6 Astra system card, 2026-09-03. Gray Swan indirect injection arena (1,810 attacks): estimated attack success 8.5% for Astra versus 27.0% for GPT-5.6 Sol. Rung 7. https://deploymentsafety.openai.com/gpt-6-astra
  - Anthropic, "Introducing Claude Opus 5.5", 2026-09-22. Opened yes. Matches or beats Opus 5 on injection resistance in all settings including web browsing, ties Fable 5.1 for lowest Gray Swan attack success. No raw numbers in the text. Rung 7. https://www.anthropic.com/claude-opus-5-5
  - Anthropic release notes, 2026-10-07. web_fetch limited to URLs already in context, to reduce exfiltration. Rung 2 for the change.
- Context, pre-window: Kimoun, "AI cloaking: the ads only AI bots can see on Time", 2026-08-11, modified 2026-09-24. Opened yes. Time serves ClaudeBot, OAI-SearchBot and PerplexityBot a Markdown copy with sponsored blocks humans never see. Rung 5. https://kimoun.com/en/blog/time-ai-cloaking-hidden-ads-geo-red-line/
- Context, pre-window: Infosecurity Magazine, 2026-07-06. Opened yes. Zscaler ThreatLabz: hidden CSS and JSON-LD instructions on SEO-boosted pages. 4 of 26 models made a fake payment. Rung 5. https://www.infosecurity-magazine.com/news/indirect-prompt-injection-web/

---

## 3. Launches and changes timeline, 2026-08-25 to 2026-10-25

| Date | Who | Change | Effect on the picture | Source, opened, rung |
|---|---|---|---|---|
| 2026-08-31 | European Commission | ChatGPT search designated a Very Large Online Search Engine under the DSA, first AI chatbot in that class. About 159.1M monthly EU users. Four months to meet risk-assessment, audit and researcher-access duties | First legal duty to assess systemic risks of an AI search product in the EU | paperjam.lu (opened, date not on page), date from several secondary reports. Rung 5 https://en.paperjam.lu/article/as-far-as-brussels-is-concerned-chatgpt-is-now-a-search-engine |
| 2026-09-03 | OpenAI | GPT-6 Astra and system card, with Broken Search Tool eval and indirect injection tables | Vendor now reports honesty when search fails [VENDOR] | deploymentsafety.openai.com, opened, rung 7 |
| 2026-09-03 to 09-04 | Google | Gemini 3.8 Flash in AI Mode ships with missing links and citations, fixed after Google said it was not intended | Model swaps can silently remove citations | seroundtable.com, opened, rung 5 |
| 2026-09-13 | IETF aipref | Vocabulary draft -08 (attach draft -05 dated 2026-08-18). Both still "I-D Exists", milestone Aug 2026 missed | No finished standard for AI-use preferences yet | datatracker.ietf.org, opened, rung 2 https://datatracker.ietf.org/wg/aipref/documents/ |
| 2026-09-15 | Cloudflare | Default blocking of Training and Agent bots on ad pages takes effect, also for existing free tier | More fetch refusals for agents | startupfortune.com, opened, rung 5 |
| 2026-09-15 to 10-07 | Anthropic | Claude Mythos and Fable 5.1 (09-15), Opus 5.5 (09-22), Sonnet 5.5 (09-28), Haiku 5.5 (10-07) | Opus 5.5 claims better research reports and injection resistance [VENDOR] | anthropic.com/news, opened, rung 7 |
| 2026-09 | Google | September 2026 spam update rolled out | Google spam rules already cover AI-answer manipulation since May. Enforcement effect unknown | seroundtable.com October webmaster report (opened, 2026-10-01), rung 5 https://www.seroundtable.com/october-2026-google-webmaster-report-42185.html |
| 2026-09 and 2026-10 | Perplexity | Fast Search added (Sept). All Agent API presets moved to Fast Search (Oct) | Cheaper, faster, possibly shallower search by default [VENDOR] | docs.perplexity.ai changelog, opened, rung 2 |
| 2026-09-21 | Perplexity | Effort Mode (Light to Ultra) for Computer, GPT-6 Astra, history search | User picks search effort | releasebot.io, opened, rung 5 https://releasebot.io/updates/perplexity-ai |
| 2026-09-30 | Google | Gemini 4 Argon announced. Artificial Analysis: 15% hallucination via more abstention | Abstaining more is one route to fewer confident errors | artificialanalysis.ai, opened, rung 3 |
| 2026-09-30 | Cloudflare | Pay Per Use and Monetization Gateway enter beta. AI buyers self-report each use, publishers paid monthly. Partners include Ceramic.ai | Paid access route for blocked content | Search Engine Journal 2026-10-01, opened, rung 5 https://searchenginejournal.com/cloudflare-moves-monetization-gateway-pay-per-use-into-beta/591719 |
| 2026-10-06 | Anthropic | Models API reports which models accept web search | Builders can check tool support | platform.claude.com release notes, opened, rung 2 |
| 2026-10-07 | Anthropic | Managed Agents: web_fetch only for URLs already in context, allowed_hosts also governs web_search and web_fetch | Less injection-led exfiltration, fewer reachable pages | same, opened, rung 2 |
| 2026-10-13 | Google | Gemini 4 Argon available in AI Mode for AI Pro and Ultra, with links present | Paid users can switch search model | seroundtable.com, opened, rung 5 https://seroundtable.com/google-ai-mode-gemini-4-argon-42289.html |
| 2026-10-15 | Google | AI Mode and AI Overviews: more and higher inline links, official-sites section (test), wider news carousels, creator profiles (test) | More visible links. No accuracy claim made | blog.google, opened, rung 2 [VENDOR] https://blog.google/products-and-platforms/products/search/updates-ai-mode-overviews-explore-web/ |
| 2026-10-15 | Anthropic | Midterm safeguards: official Democracy Works voting info and live results in Claude | Pinned trusted data for a high-stakes topic [VENDOR] | pulse2.com, opened, rung 5 |
| 2026-10-16 | Google | More than 400 publications in its news AI pilot, Reach and CNN among new partners | More licensed sources for Google AI features | Press Gazette tracker, opened, rung 5 https://pressgazette.co.uk/platforms/news-publisher-ai-deals-lawsuits-openai-google/ |
| 2026-10-09 and 2026-10-21 | Courts | USA Today Co sues OpenAI (10-09). Canadian publishers sue Anthropic (10-21) | More legal pressure on content use | Press Gazette tracker, opened, rung 5 |
| 2026-10-20 | Anthropic | Org admins can switch web fetch off or set domain lists. Managed Agents follow org search and fetch rules | Fetch can now fail by org policy | platform.claude.com release notes, opened, rung 2 |
| 2026-10-21 | Walmart and Amazon | Walmart Agent Gateway (MCP) for approved agents. Amazon keeps blocking agents | Gated access replaces open crawling for commerce | techcrunch.com, opened, rung 5 |
| 2026-10-22 | Courts | Dow Jones v. Perplexity heading to a 10 to 14 day jury trial, fabricated-quote and trademark claims | Attribution errors now tested in court | startupfortune.com, opened, rung 5 |
| 2026-10-23 | Google | Test of AI-written summaries inside AI Overview citation cards | Source descriptions become model output | seroundtable.com, opened, rung 5 |

New evals in or near the window: Full Fact public benchmark report one (ongoing, questions and answers published), WashU IMC audit of AI Overviews, Artificial Analysis Omniscience results for Gemini 4 Argon and GPT-6, GPT-6 Astra "Broken Search Tool" eval [VENDOR]. Browser Use Bench v2.1 (2026-10-17) was seen in search only and not opened.

---

## 4. Signals for a new top-10 candidate

1. Wrong entity merged into the answer. The Aachen order (2026-09-24) concerns AI Mode pinning another professor's conviction on a named doctor. Munich concerns claims about two publishers absent from all linked sources. Courts now treat these as the provider's own words. Entity confusion was M15 in U3 but is not in the top 10. Evidence: madrobot.blog 2026-10-18, rung 5. Strongest new candidate because of real-person harm and legal liability.
2. Silent behaviour change after model or pipeline updates. Gemini 3.8 Flash dropped citations at launch (2026-09-03). Seer saw ChatGPT's search data structure change between 2026-09-03 and 09-16, and zero shared query strings across two runs eight minutes apart. Full Fact saw the same question answered differently day to day. Candidate name: "Answers and sources shift run to run".
3. Paid or sponsored content inside what the agent reads or says. Time serves AI crawlers ad-laden pages humans do not see (pre-window). Google confirmed ads in AI Mode with Personal Intelligence (seroundtable recaps, October). Cloudflare Pay Per Use pays per use in answers. Could become "commercial content steers the answer".
4. Narrow source set. Press Gazette 2026-10-22 (ChatGPT local news 0.9% versus councils 81.3%) and Ahrefs 2026-10-12 (Reddit citations down 88%, publisher partners up) show source mixes swinging with policy. Possibly a facet of challenge 4 rather than a new one.

---

## 5. What I could not reach

| Item | Problem | What I used instead |
|---|---|---|
| Taylor Wessing on ChatGPT DSA designation (2026-10) | 403 | paperjam.lu, plus secondary search snippets for the 2026-08-31 date |
| European Commission press release on ChatGPT VLOSE | Not found in search | Secondary coverage only |
| openai.com GPT-6 Astra launch post | 403 | deploymentsafety.openai.com system card |
| x.ai Grok Bot changelog (2026-10-23 citation chips per snippet) | 403 | Not used |
| NewsNation midterm AI piece | 403 | NBC News on ISD study |
| NPR and NewsGuard propaganda test (2026-08-30) | Timed out twice | Snippet only, rung 7 |
| Search Engine Land "AI brand recommendations vary by platform and week" (October) | 403 | Not used |
| FourWeekMBA on Perplexity jury trial | 403 | Startup Fortune |
| insideai.news Cloudflare Pay Per Use | TLS error | Search Engine Journal |
| Single Grain on Argon splitting AI Mode | Timed out | Not used |
| Forever Security BragJack write-up | Home page lists "Prompt Forcing" only, no BragJack page found | Adversa digest |
| Dark Reading original on Dark Sourcery, Vigilance Security report | Not opened | Gigazine and Paubox |
| Aachen and Munich court orders (PDFs) | Not opened | madrobot.blog summary |
| UK CMA case page on Google conduct requirements | Not opened. Search shows main controls due 2026-12-03, no October action found | Not used in verdicts |
| Cloudflare blog post on Pay Per Use beta and any post-2026-09-15 Radar data | Not found | Startup Fortune, SEJ |
| GPT-6.1 Sol system card addendum (2026-09-29) | Seen in search only | Not used |
| GitHub black-box audit of Google AI Mode misidentification (2026-10-21) | Not opened, self-published | Not used |
| Anthropic "Preparing for the 2026 US midterms" post | 404 at guessed URL | pulse2.com coverage |
