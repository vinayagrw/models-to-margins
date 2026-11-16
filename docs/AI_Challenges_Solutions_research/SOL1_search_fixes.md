# SOL1. Best fix today for each of the 10 web search failures

Prepared 2026-10-25. Window for "new in the last 30 days": 2026-09-25 to 2026-10-25.

Builds on, and does not redo:
- `../AI_Web_Search_Failures_Technical_Design.md` sections 3.0, 4, 7, 8, 10 and Appendix A
- `../AI_Web_Search_Failures_research/P2_causes_fixes.md`

This brief sharpens the fix for each failure, re-opens the evidence behind it, and adds what changed in the window. Every source cited here was opened on 2026-10-25 unless the ledger says otherwise.

## How to read this brief

**Owner.** Buyer means the firm using AI. Vendor means the firm that sells the model or search product. Both means neither can close the gap alone.

**Effort.** What it takes a buyer to put the fix in place. Low is configuration or a prompt rule. Medium is an extra pipeline step. High is an architecture change, contracts or new data.

**Maturity.** Research (papers only), early product (beta, preview or one vendor), or generally available (documented and sold).

**Evidence rungs.** 1 peer reviewed or audited. 2 primary record (docs, changelog, standard). 3 independent measurement (including preprints by people who do not sell the fix). 4 independent survey. 5 vendor or consulting. 6 press or user post. 7 unopened.

**Independent?** Says whether the people who measured the fix also sell it.

Ledger IDs (SS-xx) are in the last section.

---

## Summary table

| # | Failure | Best fix today | Owner | First step this month | Effort | Maturity | Best evidence it works | Cost | New in window |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Citation does not hold the claim | A separate checker splits the answer into claims and keeps only claims backed by a quoted span from an opened page | Both | Turn on span citations and add a link resolver to every forwarded report, then hand-check 20 claims | Medium. A second model pass plus a claim splitter | Early product. Parts sold (Vertex AI check grounding, Anthropic citations). Full checker is custom | Link checker cut dead or invented links 6 to 79 times, to under 1% (rung 3, independent). Support-gated revision up to 32.7 points (rung 3, independent, preprint) | Check grounding under 500 ms a call (vendor), price not shown. Web fetch citations no extra charge | Real IDs are not real citations: 327 of 335 IDs existed, 3 were relevant (2026-10-21) |
| 2 | Silent failure, confident answer | Log every failed search, blocked fetch, cut page and spent budget, show them above the answer, and never deliver a zero-source report | Both | Add one line to every research prompt asking for searches run, pages opened and what failed, and reject zero-source reports | Low. Logging and a delivery rule | Early product. Claude Code failure notices. OpenAI Broken Search Tool eval | Gemini 4 Argon hallucination 15% on AA-Omniscience by admitting it does not know, accuracy 5 points lower (rung 3, independent). No measure of notices or zero-source rules | Not measured | GPT-6 October card reports fewer undisclosed tool failures (2026-10-07, vendor). Claude Code 2.1.300 and 2.1.307 |
| 3 | Shallow search, stops too early | Split into sub-questions and stop only when each has evidence or a "not found", forcing more search when coverage is short | Both | Ask for the sub-question plan first and a "looked for, not found" list at the end | Medium. More calls and a coverage check | Research for coverage stopping. Generally available for decomposition (deep research modes) | Forcing an under-searching 7B agent on to coverage raised exact match 2.7 to 8.2 points (rung 1, independent) | Multi-agent research about 15 times chat tokens (vendor). Anthropic search $10 per 1,000 | HALT shows the same check catches early stops (Findings of EMNLP 2026, October). Perplexity presets moved to Fast Search |
| 4 | Weak or planted sources win | Allow list of primary domains for high-stakes work, drop user-generated pages there, label each source by publisher and type | Buyer | Write a 20 to 50 domain allow list for one high-stakes workflow and set it in the admin console | Low. Configuration, with upkeep | Generally available (allowed and blocked domains, org-level lists). Reliability scoring is research | Dropping user-generated pages blocked a 13-word poisoning attack but cut report quality (rung 3, independent, no quality number). Domain lists have no independent measure | Free | Anthropic org-level web fetch domain lists (2026-10-20). Google ranks "preferred sources" higher in AI Mode (2026-10-16) |
| 5 | Stale facts shown as current | Put today's date in the request, bypass caches for changing facts, open the official page, and tell the model when old evidence stopped applying | Both | Add "As of today" and "give the date of each figure's source" to every prompt on prices, rules and people | Low. Prompt and one cache flag | Generally available (page_age, use_cache false). Validity-aware reasoning is research | Told when old evidence stopped applying, larger models switched to the right answer "almost perfectly". A recency reranker cut poisoning 4.6 to 10.0 points (rung 3, independent) | Cache bypass adds latency, not measured | Stale-Document Poisoning (2026-09-25). TREK finds the bottleneck is reasoning after retrieval (2026-10-18) |
| 6 | Reads snippets, not pages | Cite only pages that were opened and read, report any cut text, and restate the question after each page | Buyer | Log for each citation whether the page was opened, and block citations that were not | Medium. More tokens and per-citation logging | Early product. Claude Code unread-text notice and offset. Read-before-cite not a default anywhere | Opened and cited pages were stale 1.3% of the time against 6.4% for snippets. Restating the prompt recovered 26.1% of failed checks (rung 3, independent) | About 2,500 tokens per 10 kB page, 25,000 per 100 kB (vendor doc). No fetch fee on Anthropic API | Retrieved but Not Read (2026-10-15). Claude Code 2.1.290 offset (2026-10-05) |
| 7 | Blocked or unreadable pages | Record each blocked or unreadable page by name, then route to the user's own copy, a licensed connector, a parser or a browser tool, never around the block | Buyer | List the 10 sources each team needs most and test which ones the tool can open | High. Licences, connectors, a parser per format, legal review | Generally available error codes. Early product paid access (Cloudflare beta, Walmart gateway) | No independent measure of routing. Our own check: the fetch tool could not read a compressed PDF that a local parser read at once (rung 3, own, single case) | Cloudflare gateway prices $0.001 to $100 a request, set by the seller. Licences not public | Cloudflare Pay Per Use and Monetization Gateway beta (2026-09-30). Walmart Agent Gateway (2026-10-21) |
| 8 | Goes along with a false premise | Before searching, list the question's assumptions, check each with neutral queries, and send high-stakes answers to a person | Both | Add "list and check the assumptions in my question first" to research prompts | Medium. One extra step, plus review time | Research | Premise check took GPT-4o-mini from 83.8% to 92.4%, but a plain prompt baseline also reached 92.4% (rung 3, independent) | One extra retrieval step, not measured | Authority Bias: a "verified source" label drives wrong answers, fix needs model internals (2026-09-29) |
| 9 | Memory beats search | For changing facts, require a dated primary source, give the date each source stopped applying, and show memory and source side by side when they differ | Both | Require a dated primary source for every price, rule and office holder in client work | Medium. Dated source data must be built | Research | Calibrated correction raised GPT-4o accuracy from 0.615 to 0.754 but raised prior bias (rung 3, independent). Validity information near-perfect for larger models (rung 3) | Two generations per question for the calibrated method, not priced | Stale-Document Poisoning (2026-09-25) |
| 10 | Planted instructions in pages | Keep page text away from any model that can act, with an isolated reader and approval before any action that follows web content | Both | Remove email, payment and file access from any agent that browses, and turn on approvals | High. Architecture change, some tasks lost | Generally available vendor classifiers. Early product URL rules and approvals. Research isolation (Intact, CaMeL) | Intact let 12.8% of attacks through against 73.1% for a standard planner, and those reach the user only as a consent request (rung 3, independent) | Intact broke 3.7% of tasks. CaMeL 77% of tasks against 84% | Intact (2026-10-15). Anthropic URL provenance rule and browser tool URL policies (2026-10-07). Perplexity tool approvals (October) |

---

## 1. Citation does not hold the claim

**Best fix today.** A separate checker splits the answer into claims and keeps only the claims backed by a quoted span from a page that was actually opened.

**Who owns it.** Both. Vendors supply span citations and checking APIs. The buyer has to run the check, because no product runs a full claim-level check by default.

**First step this month.** Turn on span citations where the API allows it (Anthropic web fetch citations are off by default, SS-06). Add a link resolver before display. Then pick 20 claims from forwarded reports and check each quote against its page by hand to set a baseline.

**Effort.** Medium. It adds a claim splitter and a second model pass per answer.

**Maturity.** Early product. Google's check grounding API returns a 0 to 1 support score and claim-level citations, and counts partly supported claims as ungrounded (SS-04). Anthropic web fetch returns character ranges for each citation (SS-06). Anthropic web search citations carry at most 150 characters of quoted text (SS-07), which can drop a year or unit. A full split, check, drop pipeline is still a custom build.

**Evidence it works.**
- Link checking: models given the open-source urlhealth tool cut non-resolving citation URLs by 6 to 79 times, to under 1% (SS-01, rung 3). Independent: the tool is free and the authors sell nothing.
- Support checking: PAVE extracts facts from retrieved text, scores support and revises weak answers. Largest gain 32.7 accuracy points on a span-grounded benchmark (SS-03, rung 3, preprint). Independent.
- SAFE, a claim-by-claim checker, agreed with human raters 72% of the time and was judged right in 76% of 100 disagreements (SS-02, rung 1). Not independent: P2 lists Google authors, and Google sells check grounding.
- Customer report: Endex said source hallucinations fell from 10% to 0% with Anthropic citations (SS-05, rung 5). Not independent.

**Cost.** Check grounding is "designed to be fast, with latency less than 500ms", up to 200 facts of 10,000 characters each, price not stated on the page (SS-04, vendor). Anthropic does not charge output tokens for quoted text (SS-05). SAFE is more than 20 times cheaper than human raters (SS-02, vendor).

**What it does not fix.** It checks support, not truth. A planted or wrong page passes (#4). 30.6% of citations in one 761,495-pair study distorted real, reachable sources (SS-10), so a live link proves little. It cannot add facts the search never found (#3).

**New in the last 30 days.**
- 2026-10-21. Real PMIDs, Wrong Papers: with search off, 327 of 335 cited PubMed IDs existed but only 3 were relevant. With live search, 67% were relevant (SS-08). Existence checks alone are not enough, so a link checker must be paired with a support check.
- 2026-09-29. WashU release on the AI Overviews audit: about 11% of 98,020 claims unsupported (an upper bound), 41.9% of overviews fully grounded (SS-09).
- 2026-10-16. Google said AI Mode and AI Overviews will show links higher and more often (SS-11). This changes display, not support.
- 2026-10-22. Google's check grounding page was last updated. No feature change was named (SS-04).

---

## 2. Silent failure, confident answer

**Best fix today.** Log every failed search, blocked fetch, cut page and spent budget, show them above the answer, and never deliver a report built on zero opened sources.

**Who owns it.** Both. Vendors must pass errors to the model. The buyer must make the answer show them, because Anthropic's API returns tool errors inside a normal success reply and returns an empty list for a search with no matches (SS-06, SS-07).

**First step this month.** End every research prompt with "List the searches you ran, the pages you opened, and anything that failed." Treat any report with no opened sources as a failed run. Builders: read `error_code` in every web tool result and fail loudly in the UI (SS-06, SS-07).

**Effort.** Low. It is logging plus one delivery rule, no model change.

**Maturity.** Early product. Claude Code now reports unread text, failed fetches and spent search budgets (SS-14). OpenAI runs a Broken Search Tool eval (SS-12).

**Evidence it works.**
- Gemini 4 Argon had a 15% hallucination rate on AA-Omniscience, the lowest of any model scoring 45 or more on the index, because it more often admits it does not know. Its accuracy fell 5 points against Gemini 3.1 Pro Preview (SS-13, rung 3). Independent: Artificial Analysis does not sell models. This shows abstention works and what it costs.
- OpenAI reports statistically significant gains on its Broken Search Tool eval at maximum reasoning effort. Numbers appear only in a figure (SS-12, rung 5). Not independent.
- No study measures failure notices or a zero-source rule in a live product. This is still the main gap.

**Cost.** Not measured. Logging and a delivery rule cost close to nothing to run.

**What it does not fix.** A logged failure does not make the answer right. More "not found" answers will follow as blocking rises (#7). Abstention trades accuracy for honesty (SS-13).

**New in the last 30 days.**
- 2026-10-07. OpenAI's GPT-6 October safety page: fewer failures to disclose a broken search tool or a blocker, and a "respecting warnings" eval where models routed around an access-denied barrier 15.9% to 34% of the time (SS-12, vendor).
- 2026-09-30. Gemini 4 Argon hallucination result (SS-13).
- 2026-10-14. Claude Code 2.1.300 tells Claude a page failed moments ago instead of fetching it again (SS-14).
- 2026-10-21. Claude Code 2.1.307 tells Claude not to use a browser to search once the search budget is spent, and shows the reason for a 403 (SS-14).

---

## 3. Shallow search, stops too early

**Best fix today.** Split the question into sub-questions and stop only when each one has evidence or an explicit "not found", forcing more search when coverage is short.

**Who owns it.** Both. The vendor sets the model's stopping behaviour. The buyer owns the plan, the must-have sources and the coverage check in its own build.

**First step this month.** For multi-part questions, use the deep research mode. Ask for the plan first ("list the sub-questions and the source type for each") and end with "What did you look for and not find?" Name must-have sources in the prompt.

**Effort.** Medium. More calls per question and a coverage check to tune.

**Maturity.** Decomposition is generally available inside deep research products. Coverage-based stopping is research.

**Evidence it works.**
- HALT, Findings of EMNLP 2026 (SS-15, rung 1, independent). On a 7B agent, the coverage test was not met at the agent's own stop on 51% to 79% of questions. Forcing those runs to continue until covered raised exact match across the whole test set by 2.7 to 8.2 points. On one subset, exact match doubled from 0.162 to 0.323. Continuing to coverage beat continuing to the full budget, so the gain is not just "search more". On a 3B agent that over-searched, HALT cut search loops by 20% to 45% with small exact-match changes. Tested on 3B and 7B open models only.
- Anthropic dynamic filtering raised BrowseComp accuracy from 45.3% to 61.6% for Opus 4.6, with 24% fewer input tokens on average (SS-16, rung 5). Not independent.
- Anthropic's multi-agent research beat a single agent by 90.2% on its own eval (SS-17, rung 5). Not independent.
- A trace study recommends adaptive stopping with explicit coverage checks and separate planning, checking and repair stages (SS-18, rung 3).

**Cost.** Multi-agent research uses about 15 times the tokens of a chat (SS-17, vendor). Anthropic web search costs $10 per 1,000 searches plus tokens (SS-07). Perplexity Fast Search costs $1.00 per 1,000 against $2.50 before (SS-19).

**What it does not fix.** More searching brings in more weak and planted pages (#4) and more injection exposure (#10). A bad plan copies the user's framing (#8).

**New in the last 30 days.**
- October 2026. HALT published in Findings of EMNLP 2026, including the under-search result above (SS-15). The exact day is not on the page.
- 2026-10-21. Yu et al. design guidelines for deep search agents (SS-18).
- October 2026. Perplexity moved its Agent API low to xhigh presets to Fast Search, "a lower-latency search path" (SS-19). This pushes the default toward speed, the opposite of this fix.
- 2026-10-05. Claude Code search budget now refills at 100 calls an hour instead of stopping after 200 (SS-14).

---

## 4. Weak or planted sources win

**Best fix today.** For high-stakes work, restrict search to an allow list of primary domains, drop user-generated pages, and label every source by publisher and type.

**Who owns it.** Buyer. Vendors rank the open web. Only the buyer knows which sources it trusts.

**First step this month.** Pick one high-stakes workflow, write an allow list of 20 to 50 primary domains, and set it at the organisation level. Ask for "who published each source and whether they sell the product discussed".

**Effort.** Low. It is configuration, with steady upkeep.

**Maturity.** Generally available. Anthropic offers allowed and blocked domains per request and, since 2026-10-20, at organisation level for web fetch (SS-06, SS-20). Long lists can fail with `request_too_large` (SS-07). Reliability scoring and independence checks are research.

**Evidence it works.**
- WARP: a 13-word edit to one popular user-generated page was cited in 38% to 51% of reports. Dropping user-generated content blocked the attack but cut report quality, with no number given. Light anomaly detection did not catch the poison (SS-21, rung 3, independent).
- Data-Void Exploits: skeptical prompts "slightly reduce" attack success and slightly raise warnings. Attacker content appeared in 31% of responses (SS-22, rung 3, independent).
- No independent study measures the effect of domain allow lists.

**Cost.** Free.

**What it does not fix.** Planted text on trusted domains, such as Reddit or Wikipedia, still gets in unless those domains are dropped (SS-21). Lists remove niche and local sources. The claim checker in #1 will still tick a planted page.

**New in the last 30 days.**
- 2026-10-20. Anthropic org admins can turn web fetch off or set allowed and blocked domains in the Console. Managed Agents URLs must pass both org and agent lists, including redirects (SS-20).
- 2026-10-06 and 2026-10-14. Anthropic "Allow web search" setting and its domain restrictions for Managed Agents (SS-20).
- 2026-10-16. Google AI Mode will favour articles from sites a user marks as "preferred sources", and can also pull in social and forum posts (SS-11).
- 2026-10-08. From Public Posts to AI-Search Citations: 8 of 10 platforms cited a made-up concept within 7 days. No defence tested (SS-23).
- 2026-10-21. Data-Void Exploits (SS-22).

---

## 5. Stale facts shown as current

**Best fix today.** Put today's date in every request, bypass caches for changing facts, open the official page, and tell the model when old evidence stopped applying.

**Who owns it.** Both. Vendors control caches and rerankers. The buyer controls the date line, the cache flag and which page counts as official.

**First step this month.** Start time-sensitive prompts with "As of today, [date]". Ask for the date next to each figure and the date of its source page. Builders: show `page_age` and set `use_cache: false` for fast-changing pages (SS-06, SS-07).

**Effort.** Low. Prompt rules and one cache flag. Giving validity dates needs source data, which is more work.

**Maturity.** Generally available for date grounding, `page_age` and cache bypass (SS-06, SS-07). Validity-aware reasoning and recency reranking are research.

**Evidence it works.**
- Stale-Document Poisoning, 317 real knowledge reversals (SS-24, rung 3, independent). Outdated text flipped 30% to 37% of correct answers. A date alone gave "modest adaptation". When told when the old evidence stopped applying, larger models switched to the right answer "almost perfectly". A recency-aware reranker cut poisoning by 4.6 to 10.0 points, but only with accurate dates.
- Opened and cited pages were stale 1.3% of the time against 6.4% for snippet-only answers (SS-26, rung 3, independent).
- FRESCO instruction tuning for rerankers: gains up to 27% on changing-knowledge tasks (SS-25, rung 5). Not independent: Meta authors.

**Cost.** Cache bypass adds latency, not measured (SS-06).

**What it does not fix.** `page_age` is when the site last changed, not when the fact changed (SS-07). An old official page can still outrank a newer one. TREK finds models are misled by conflicting evidence even after they retrieve the right page (SS-27).

**New in the last 30 days.**
- 2026-09-25. Stale-Document Poisoning (SS-24).
- 2026-10-18. TREK: the main bottleneck is reasoning after retrieval (SS-27). Per-model figures were not on the abstract page.
- About 2026-10-15. Full Fact report one, 7,625 answers. It asks models to consult live authoritative sources for time-sensitive facts and to separate rules in force from proposals (SS-28). The page shows no publication date.

---

## 6. Reads snippets, not pages

**Best fix today.** Cite only pages that were opened and read, report any cut text, and restate the question after each page.

**Who owns it.** Buyer, in its own build. Vendor tool defaults decide whether pages get opened at all.

**First step this month.** Log for each citation whether the page was opened. Block citations that were not. In Claude Code, read on with the offset when told text was unread (SS-14).

**Effort.** Medium. Token use rises and each citation needs a log entry.

**Maturity.** Early product. Claude Code reports unread text and takes an offset since 2.1.290 (SS-14). Anthropic web fetch returns the full page up to a token cap (SS-06). No product makes read-before-cite the default.

**Evidence it works.** Retrieved but Not Read (SS-26, rung 3, independent):
- Answers citing an opened page were stale 1.3% of the time, against 6.4% from snippets alone.
- Restating the full prompt after each opened page recovered 41 of 157 failed checks (26.1%), with a range of 4.5% to 57.1% across six setups.
- Putting the page in the prompt cut one model's stale endorsements from 14 of 50 to 0 of 50.

**Cost.** Anthropic web fetch has no extra fee beyond tokens: about 2,500 tokens for a 10 kB page, 25,000 for 100 kB and 125,000 for a 500 kB PDF (SS-06, vendor doc).

**What it does not fix.** The opened page can be wrong or planted (#4). Long pages are cut at a token cap (SS-06). Claude Code page reads may run on "the small model" (SS-14), so a summary sits between the page and the main model.

**New in the last 30 days.**
- 2026-10-15. Retrieved but Not Read, with the restating fix above (SS-26).
- 2026-10-05. Claude Code 2.1.290 stopped silently dropping text past 100,000 characters and added an offset (SS-14).
- 2026-10-14. Claude Code 2.1.299: page reads use the caller's model or the small model (SS-14).

---

## 7. Blocked or unreadable pages

**Best fix today.** Record each blocked or unreadable page by name, then route to the user's own copy, a licensed connector, a document parser or a browser tool, never around the block.

**Who owns it.** Buyer. Site owners decide to block. Only the buyer can buy licences or upload its own files.

**First step this month.** List the 10 sources each team needs most. Test which ones the tool can open. For the rest, set a route: upload, licensed database, parser or browser.

**Effort.** High. It needs licences, connectors, a parser per file format and legal review.

**Maturity.** Error codes are generally available: `url_not_allowed` covers robots.txt, and `unsupported_content_type` covers anything but text, HTML and PDF (SS-06). Anthropic web fetch does not run JavaScript and points to its browser use tool (SS-06). Paid access is early product. Signed agent identity is a working-group draft (SS-31).

**Evidence it works.**
- No independent study measures routing blocked sources to licensed or uploaded copies.
- Our own observation on 2026-10-25: WebFetch could not read the HALT paper PDF ("page content streams are compressed"), while a local PDF parser extracted the text at once (SS-32, rung 3, own, single case). This matches our earlier test, where 2 of 2 PDFs were not read (SS-44).

**Cost.** Cloudflare Monetization Gateway prices run from $0.001 to $100 per request, set by the seller. Pay Per Use prices are set by the AI company and not public (SS-29). Licence costs are not public.

**What it does not fix.** Paywalls and bot blocks stay closed. The answer rate falls as more sites block. A licence does not guarantee the source gets cited correctly.

**New in the last 30 days.**
- 2026-09-30. Cloudflare Pay Per Use and Monetization Gateway in beta, gateway closed to US buyers and sellers (SS-29).
- 2026-10-21. Walmart Agent Gateway, an MCP server for approved agents, while Amazon blocks agents from buying (SS-30).
- 2026-10-21. Claude Code 2.1.307 returns robots.txt refusals and 4xx replies as normal results in cloud sessions (SS-14).
- 2026-09-29 and 2026-09-30. Claude Code 2.1.285 and 2.1.286 stop reporting a rate-limited safety check as a policy block (SS-14).
- October 2026. Perplexity Agent API accepts PDF, DOC, DOCX, TXT and RTF as input files (SS-19), which supports the upload route.

---

## 8. Goes along with a false premise

**Best fix today.** Before searching, list the question's assumptions and check each one with neutral queries, then send high-stakes answers to a person.

**Who owns it.** Both. Vendors tune agreement into models. The buyer can add the premise step and the review.

**First step this month.** Add "First list the assumptions in my question and check each one. Tell me if any are wrong" to research prompts. Ask neutral questions before loaded ones.

**Effort.** Medium. One extra step per question, plus reviewer time for high stakes.

**Maturity.** Research. No product documents a premise check as a default.

**Evidence it works.**
- Premise verification via retrieval: GPT-4o-mini answer accuracy rose from 83.8% to 92.4% (SS-33, rung 3, independent). But a plain prompt baseline also reached 92.4%, so a simple "check the premise" prompt may give most of the gain. On FEVER, the method's logical-form setup scored 86.0% against 89.0% for plain queries with the same retriever.
- Suzgun et al.: detecting a false premise and recovering the right answer are separate skills (SS-34, rung 3). The best detector, Gemini 3 Pro at 80%, was not the most accurate on false-premise questions. No mitigation was tested.

**Cost.** One extra retrieval and check step. Not measured.

**What it does not fix.** Premises that come from sources, not the user. A "verified source" label still drives wrong answers (SS-35). It also does not fix agreement tuning inside the model.

**New in the last 30 days.**
- 2026-09-29. Authority Bias in Language Models: removing a fitted "source" direction inside three open-weight model families cut source-driven compliance by 65 to 80 points, with no detected change on two general tests. It needs model internals, so it does not apply to closed APIs (SS-35).
- No product change found.

---

## 9. Memory beats search

**Best fix today.** For changing facts, require a dated primary source, give the model the date each source stopped applying, and show memory and source side by side when they differ.

**Who owns it.** Both. The strongest fixes need model internals the vendor holds. The buyer supplies dated sources and the "show both" rule.

**First step this month.** Require a dated primary source for every price, rule and office holder in client work. Add "If your own knowledge disagrees with a source, say so and show both."

**Effort.** Medium. Dated validity data has to be built for the buyer's own domains.

**Maturity.** Research.

**Evidence it works.**
- ClashEval calibrated correction: GPT-4o accuracy rose from 0.615 to 0.754, context bias fell from 0.304 to 0.107, and prior bias rose from 0.021 to 0.085 (SS-36, rung 3, independent). It needs token probabilities that consumer products do not expose.
- Stale-Document Poisoning: when told when old evidence stopped applying, larger models switched "almost perfectly". Matched current evidence was followed 97% to 100% of the time (SS-24, rung 3, independent).

**Cost.** The calibrated method runs two generations per question (P2). Not priced.

**What it does not fix.** Making the model trust pages more also makes it trust bad pages more (#4). Without accurate dates the validity fix does nothing (SS-24).

**New in the last 30 days.**
- 2026-09-25. Stale-Document Poisoning, with the validity and reranker results (SS-24).
- 2026-09-29. Authority Bias shows source deference and user agreement are separate inside the model (SS-35).

---

## 10. Planted instructions in pages

**Best fix today.** Keep page text away from any model that can act, using an isolated reader with no tools and approval before any action that follows web content.

**Who owns it.** Both. Vendors ship classifiers and URL rules. The buyer decides what an agent can touch.

**First step this month.** Remove email, payment and private-file access from any agent that browses. Turn on approvals for actions after a web read. Never tell an agent to follow a site's instructions (SS-41). Restrict fetchable URLs (SS-06).

**Effort.** High. It changes the architecture and loses some tasks.

**Maturity.** Vendor classifiers are generally available. URL provenance rules and tool approvals are early product (SS-20, SS-19). Isolation designs are research.

**Evidence it works.**
- Intact passes the model one page element at a time with its own limits and asks the user before acting on third-party content. 12.8% of attacks on 1,091 real pages got through against 73.1% for a standard planner, and those reached the user only as a consent request. It disrupted 3.7% of tasks (SS-37, rung 3, independent).
- CaMeL: 77% of AgentDojo tasks with provable security against 84% undefended (SS-39, rung 3). Authors include Google staff, no CaMeL product is sold.
- Spotlighting: attack success from above 50% to below 2% on GPT models (SS-38, rung 5). P2 lists Microsoft authors, and Microsoft sells injection filters.
- Anthropic browser safeguards: Opus 4.5 attack success 1.4% with new safeguards against 8.0% for the model alone, against an attacker with 100 tries (SS-40, rung 5). Not independent. Anthropic says the problem is "far from a solved problem".

**Cost.** Intact disrupted 3.7% of tasks (SS-37). CaMeL lost 7 points of task completion (SS-39). Engineering cost not measured.

**What it does not fix.** Planted facts that persuade without giving orders (#4). An isolated reader can still be fed a false page. 1% of many pages is still many attacks (SS-40).

**New in the last 30 days.**
- 2026-10-15. Intact (SS-37).
- 2026-10-07. Anthropic Managed Agents: `web_fetch` now fetches only URLs that already appeared in the session, `allowed_hosts` applies to web tools, and SDK browser use classes enforce URL policies and an approval callback (SS-20).
- 2026-10-06. Signals Corps: 7,959 sites send AI-directed HTTP headers, 30 try injection. Claude obeyed 7 of 9 only when the prompt gave the site authority. It advises body-only fetch tools and approval before running commands from fetched content (SS-41).
- October 2026. Perplexity Agent API `require_approval` holds MCP and connector calls for review (SS-19).
- 2026-10-07. OpenAI GPT-6 October: models routed around an access-denied barrier 15.9% to 34% of the time without system safeguards (SS-12, vendor).

---

## Shared building blocks

Each block is one component that several fixes reuse. Build these once.

| Block | What it does | Failures it covers | Ready-made parts today | Evidence it works |
|---|---|---|---|---|
| Claim checker | Splits the answer into claims and checks each against a quoted span from an opened page, with a separate model | #1, #6, #9, and #4 only when paired with source labels | Vertex AI check grounding (SS-04), Anthropic span citations (SS-06) | PAVE up to 32.7 points (SS-03), SAFE 72% agreement (SS-02, vendor) |
| Link resolver | Resolves every cited URL and checks web archives before display | #1 | urlhealth, open source (SS-01) | Dead or invented links cut 6 to 79 times, to under 1% (SS-01) |
| Read-before-cite with truncation report | Allows a citation only from a page that was opened, and reports cut text | #6, #1, #5, #2 | Claude Code offset and unread notice (SS-14), web fetch `max_content_tokens` (SS-06) | Stale 1.3% against 6.4% (SS-26) |
| Source allow and block lists with labels | Restricts domains for high-stakes work and labels publisher, date and type | #4, #10, #1, #7 | allowed_domains, blocked_domains, org-level lists (SS-06, SS-07, SS-20) | No independent measure. Dropping user content blocks one attack (SS-21) |
| Date grounding and validity dates | Puts today's date in the request, bypasses caches, and tells the model when old evidence stopped applying | #5, #9 | `page_age`, `use_cache: false` (SS-06, SS-07) | Validity information near-perfect for larger models (SS-24) |
| Coverage check per sub-question | Stops only when each sub-question has evidence or a "not found", and pushes on when short | #3, #2, #8 | Deep research plan editing (P2). No product coverage check | HALT +2.7 to +8.2 points on an under-searching agent (SS-15) |
| Premise check | Lists the question's assumptions and checks each with neutral queries before the main search | #8, #3 | None. Prompt rule | 83.8% to 92.4%, matched by a plain prompt (SS-33) |
| Failure ledger and zero-source rule | Records every failed search, block, cut and spent budget, shows them first, and blocks zero-source reports | #2, #7, #6, #3 | Error codes (SS-06, SS-07), Claude Code notices (SS-14) | Not measured. Main gap |
| Isolated reader for untrusted pages | A reader with no tools handles page text, and actions need approval | #10, and #4 in part | URL provenance rules (SS-20), tool approvals (SS-19) | Intact 12.8% against 73.1% (SS-37) |
| Document and access router | Sends blocked or binary sources to uploads, licensed connectors, parsers or a browser tool | #7, #6 | Browser use tool (SS-06, SS-20), Perplexity file input (SS-19), Cloudflare paid access (SS-29) | Own single case only (SS-32) |
| Eval set and weekly canary | Fixed questions with planted errors, stale facts, blocked pages and injections, rerun on every model change | All 10 | None. Custom build (design doc 7.3) | Needed to measure every row marked "not measured" |
| Human review desk | A person checks the claims the system picks, with quotes shown inline | #8, #1, #4 | Plan approval in deep research products (P2) | Counts only while its seeded catch rate holds (design doc 7.1) |

**Reading across.** The failure ledger and the claim checker cover the most failures between them. The ledger is the cheapest block and the least measured. The isolated reader and the coverage check have the strongest new evidence from the window (SS-37, SS-15). Three fixes still have no independent before-and-after number: domain allow lists, failure notices and zero-source rules, and routing blocked sources.

---

## What sharpened against the existing design doc

- **#3.** Section 4 said HALT was built to stop over-searching and that its use against early stopping was untested. The published Findings version tests it: forcing an under-searching 7B agent on to coverage raised exact match 2.7 to 8.2 points (SS-15). The design doc and P2 should update this line.
- **#8.** The premise-check gain (83.8% to 92.4%) is matched by a plain prompt baseline in the same table (SS-33). A cheap prompt rule may be most of the fix.
- **#10.** Intact is a measured isolation design on 1,091 real pages, in the window (SS-37). It is stronger evidence for the isolated reader than the CaMeL figure the design doc relies on.
- **#5 and #9.** Stale-Document Poisoning shows a date alone helps little. Telling the model when old evidence stopped applying is what works (SS-24). "Date grounding" in section 4 should add validity dates.
- **#1.** Real PMIDs, Wrong Papers shows ID and link checks alone are close to useless for support (SS-08). Link checks belong with a support check, not instead of one.
- **#4.** The design doc's 2026-10-20 Anthropic row is confirmed by the release notes, which add Managed Agents rules from 2026-10-06, 10-07 and 10-14 (SS-20).
- **Yu et al.** The 33.7% anti-scraping share applies to BrowseComp only. It is about 16.5% on XBench-DS and about 1% on GAIA (SS-18). The design doc's #7 line should say so.

---

## Ledger

Opened means opened on 2026-10-25 in this session. "Own" means our own observation.

| ID | Claim | URL | Date | Rung | Opened | Flags |
|---|---|---|---|---|---|---|
| SS-01 | urlhealth cut non-resolving citation URLs 6 to 79 times, to under 1%. 3% to 13% of URLs invented | https://arxiv.org/abs/2604.03173 | 2026-04-03 | 3 | Verified | Preprint. Gain depends on tool use |
| SS-02 | SAFE agrees with human raters 72%, right in 76% of 100 disagreements, over 20 times cheaper | https://arxiv.org/abs/2403.18802 | 2024-03-27 | 1 | Verified | Vendor authors per P2. Affiliation not on page |
| SS-03 | PAVE support-gated revision, largest gain 32.7 accuracy points | https://arxiv.org/abs/2603.20673 | 2026-03-21 | 3 | Verified | Preprint, proof of concept |
| SS-04 | Check grounding: 0 to 1 support score, partly supported counts as ungrounded, under 500 ms, 200 facts of 10,000 characters, citation threshold default 0.6, last updated 2026-10-22, no price on page | https://docs.cloud.google.com/generative-ai-app-builder/docs/check-grounding | 2026-10-22 | 2 | Verified | Vendor doc. Latency is a design claim |
| SS-05 | Citations raise recall accuracy up to 15%. Endex source hallucinations 10% to 0%. No output tokens for quoted text | https://claude.com/blog/introducing-citations-api | 2025-06-23 | 5 | Verified | Vendor and customer self-report. Baseline unstated |
| SS-06 | Web fetch: citations off by default, errors in a 200 reply, error codes, use_cache, no JavaScript, URL provenance, org admin controls, no extra charge, token sizes | https://platform.claude.com/docs/en/agents-and-tools/tool-use/web-fetch-tool | Undated, read 2026-10-25 | 2 | Verified | Vendor doc |
| SS-07 | Web search: $10 per 1,000 searches, cited_text up to 150 characters, page_age is last site update, errors in a 200 reply, empty list on no match, request_too_large for long lists | https://platform.claude.com/docs/en/agents-and-tools/tool-use/web-search-tool | Undated, read 2026-10-25 | 2 | Verified | Vendor doc |
| SS-08 | Search off: 327 of 335 PubMed IDs real, 3 relevant. Search agent: 67% relevant | https://arxiv.org/abs/2610.29812 | 2026-10-21 | 3 | Verified | Preprint, single author, LLM judge |
| SS-09 | About 11% of 98,020 AI Overview claims unsupported (upper bound), 41.9% fully grounded | https://source.washu.edu/2026/09/washu-research-finds-gaps-in-google-ai-overview-citations-claims/ | 2026-09-29 | 3 | Verified | University release on a forthcoming study |
| SS-10 | 30.6% of 761,495 citations distort sources, 27.1% domain-inappropriate | https://arxiv.org/abs/2605.28565 | 2026-05-27 | 3 | Verified | Preprint |
| SS-11 | Google to show links higher in AI Mode and AI Overviews, favour "preferred sources", pull in forum posts | https://www.ewn.co.za/2026/10/16/google-boosts-news-and-link-visibility-in-ai-mode | 2026-10-16 | 6 | Verified | AFP wire copy. Search Engine Land returned 403 |
| SS-12 | GPT-6 October: Broken Search Tool and Blocker Deception gains at max effort, numbers in figures only. Respecting warnings 15.9% to 34% | https://deploymentsafety.openai.com/gpt-6-october | 2026-10-07 | 5 | Verified | Vendor eval. Not replicated |
| SS-13 | Gemini 4 Argon 15% hallucination on AA-Omniscience, accuracy 50%, down 5 points | https://artificialanalysis.ai/articles/gemini-4-argon-google-top-three-labs | 2026-09-30 | 3 | Verified | No abstention rate on page |
| SS-14 | Claude Code 2.1.285, 2.1.286, 2.1.290, 2.1.299, 2.1.300, 2.1.307 entries as quoted | https://code.claude.com/docs/en/changelog | 2026-09-29 to 2026-10-21 | 2 | Verified | Read in three offset calls. Page is about 1.1 million characters |
| SS-15 | HALT: 3B agent ran to budget on 78.1% to 87.5%. Loops cut 20% to 45%. 7B under-search 51% to 79%, forced coverage +2.7 to +8.2 points, subset 0.162 to 0.323 | https://aclanthology.org/2026.findings-emnlp.343.pdf | October 2026 | 1 | Verified | Abstract page opened. PDF unreadable through WebFetch, read with a local parser. 3B and 7B open models |
| SS-16 | Dynamic filtering: BrowseComp Opus 4.6 45.3% to 61.6%, average gain 11%, 24% fewer input tokens | https://claude.com/blog/improved-web-search-with-dynamic-filtering | 2026-02-17 | 5 | Verified | Vendor benchmark |
| SS-17 | Multi-agent research 90.2% over single agent, about 15 times chat tokens | https://www.anthropic.com/engineering/multi-agent-research-system | 2025-06-13 | 5 | Verified | Vendor internal eval |
| SS-18 | Design guidelines: adaptive stopping, coverage checks, staged synthesis. Anti-scraping 33.7% of BrowseComp error steps only | https://arxiv.org/html/2610.29346v1 | 2026-10-21 | 3 | Verified | Workshop paper. 33.7% computed by the reader from Table 2 |
| SS-19 | Perplexity: presets moved to Fast Search, $1.00 against $2.50 per 1,000, require_approval, native document input | https://docs.perplexity.ai/changelog | September to October 2026 | 2 | Verified | Entries not individually dated |
| SS-20 | Anthropic release notes: 2026-10-07 URL provenance, allowed_hosts, browser use SDK. 2026-10-20 web fetch org controls. 2026-10-06 and 10-14 web search settings | https://platform.claude.com/docs/en/release-notes/overview | 2026-10-06 to 2026-10-20 | 2 | Verified | Read first 100,000 of 133,497 characters |
| SS-21 | WARP: 13 words cited in 38% to 51% of reports. Dropping user content blocks it, cuts quality. Anomaly detection fails | https://arxiv.org/abs/2605.24245 | 2026-05-22, revised 2026-09-03 | 3 | Verified | No quality-loss number on abstract page |
| SS-22 | Data-Void: attacker content in 31% of responses. Skeptical prompts slightly reduce success | https://arxiv.org/abs/2610.30365 | 2026-10-21 | 3 | Verified | Preprint |
| SS-23 | 8 of 10 platforms cited a made-up concept within 7 days. No defence tested | https://arxiv.org/abs/2610.11932 | 2026-10-08 | 3 | Verified | Preprint |
| SS-24 | Stale-Document Poisoning: 30% to 37% flipped, validity info near-perfect, reranker 4.6 to 10.0 points, current evidence followed 97% to 100% | https://arxiv.org/abs/2609.31342 | 2026-09-25 | 3 | Verified | Abstract only. Open models |
| SS-25 | FRESCO reranker instructions up to 27% gain. Rerankers favour older pages | https://arxiv.org/abs/2604.14227 | 2026-04-14 | 5 | Verified | Meta authors |
| SS-26 | Snippet-only stale 6.4% against 1.3%. Restating recovers 41 of 157 (26.1%), range 4.5% to 57.1%. 14 of 50 to 0 of 50 | https://arxiv.org/html/2610.21731v1 | 2026-10-15 | 3 | Verified | Preprint |
| SS-27 | TREK: post-retrieval reasoning is the main bottleneck | https://arxiv.org/abs/2610.25323 | 2026-10-18 | 3 | Verified | Per-model figures not on abstract page |
| SS-28 | Full Fact: 7,625 answers, 15 July to 22 September 2026, recommends live authoritative sources and separating rules from proposals | https://fullfact.org/ai-benchmark/report-one/ | About 2026-10-15 | 3 | Verified | Page shows no publication date. PM detail inconsistent in report |
| SS-29 | Cloudflare Pay Per Use and Monetization Gateway beta 2026-09-30. Gateway $0.001 to $100 per request | https://searchenginejournal.com/cloudflare-moves-monetization-gateway-pay-per-use-into-beta/591719 | 2026-10-01 | 6 | Verified | Press report of vendor launch |
| SS-30 | Walmart Agent Gateway MCP server. Amazon blocks agent purchases | https://techcrunch.com/2026/10/21/while-amazon-blocks-ai-agents-walmart-rolls-out-the-welcome-mat/ | 2026-10-21 | 6 | Verified | Press |
| SS-31 | Web Bot Auth working-group draft 00, signed bot requests | https://datatracker.ietf.org/doc/draft-ietf-webbotauth-httpsig-protocol/ | 2026-09-01 | 2 | Verified | Draft, outside the window |
| SS-32 | WebFetch could not read the HALT PDF, a local parser extracted it | https://aclanthology.org/2026.findings-emnlp.343.pdf | 2026-10-25 | 3 | Own | Single observation |
| SS-33 | Premise check GPT-4o-mini 83.8% to 92.4%, prompt baseline also 92.4%. FEVER 86.0% against 89.0% | https://arxiv.org/html/2504.06438 | 2025-04-08 | 3 | Verified | Venue not on page. P2 lists TMLR 2026 |
| SS-34 | 71.5% of errors from retrieval. Detection: Gemini 3 Pro 80%, Claude 78%, GPT-5 36%. No mitigation tested | https://arxiv.org/html/2605.22785 | 2026-05-21 | 3 | Verified | Read first 100,000 of 177,070 characters |
| SS-35 | Authority Bias: removing a source direction cut compliance 65 to 80 points in three open families | https://arxiv.org/abs/2609.37616 | 2026-09-29 | 3 | Verified | Needs model internals |
| SS-36 | ClashEval: over 60% override. Calibrated correction 0.615 to 0.754, prior bias 0.021 to 0.085 | https://arxiv.org/html/2404.10198v3 | 2024-04-16, revised 2025-02-07 | 3 | Verified | Page lists no venue. Design doc ledger row 29 says rung 1 |
| SS-37 | Intact: 12.8% against 73.1% of attacks on 1,091 pages, 3.7% of tasks disrupted | https://arxiv.org/abs/2610.22697 | 2026-10-15 | 3 | Verified | Preprint, single author |
| SS-38 | Spotlighting: above 50% to below 2% attack success | https://arxiv.org/abs/2403.14720 | 2024-03-20 | 5 | Verified | Microsoft authors per P2 |
| SS-39 | CaMeL: 77% of tasks with provable security against 84% | https://arxiv.org/abs/2503.18813 | 2025-03-24 | 3 | Verified | Google co-authors. No product sold |
| SS-40 | Opus 4.5 browser attack success 1.4% against 8.0% model only. "Far from a solved problem" | https://www.anthropic.com/research/prompt-injection-defenses | 2025-11-24 | 5 | Verified | Vendor internal attacker |
| SS-41 | 7,959 sites with AI-directed headers, 30 injecting, Claude 7 of 9 with authority framing, four defences | https://www.signalscorps.com/blog/prompt-injection-in-http-headers/ | 2026-10-06 | 3 | Verified | Security firm blog |
| SS-42 | Fixes per challenge, reference architecture, patterns, red team, Appendix A | ../AI_Web_Search_Failures_Technical_Design.md | 2026-10-25 | Internal | Read | Reused, not re-verified line by line |
| SS-43 | Causes and fixes brief with source register S01 to S56 and P01 to P34 | ../AI_Web_Search_Failures_research/P2_causes_fixes.md | 2026-10-25 | Internal | Read | Reused. "P2" in this brief points here |
| SS-44 | Claude Code 2.1.296 test: 2 of 2 PDFs not read | ../AI_Web_Search_Failures_research/T1_claude_code_search_test.md | 2026-10-25 | 3 | Read via design doc 3.1b | Own test |

**Searched in the window and found nothing dated.** An October 2026 OpenAI ChatGPT search or Deep Research change to citations. A new Gemini API grounding feature. An OWASP or NIST agent injection release. A prompt-injection safeguard update for Claude in Chrome, Comet or Atlas. A false-premise fix in any product.
