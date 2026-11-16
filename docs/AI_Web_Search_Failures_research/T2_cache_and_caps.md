# T2: Claude Code WebFetch cache and WebSearch caps, measured test

## Purpose

Run the two checks that T1 skipped. Check 1 asks whether WebFetch really caches a URL for 15 minutes. Check 2 counts links per WebSearch call and looks for a cap on WebSearch calls in one turn.

## Version, date, tester

- Claude Code version: 2.1.296 (from `claude --version`)
- Date: 2026-10-25, run from 13:07 to 13:26 UTC
- Machine: one macOS machine, one network
- Tester: Claude Code itself (Opus 5.5) running as a subagent, using WebFetch and WebSearch from this install. The tools under test are the tester's own tools.
- Independence caveat: the test does not rely on vendor docs or third-party write-ups. It is not independent of the vendor, because the vendor's model ran the test and scored it.

## Protocol

- Ground truth: a `curl -s` call to the same URL right before each WebFetch call. The time is the Bash clock (`date -u +%H:%M:%S`) read just before that curl. WebFetch ran within about 10 seconds after. Curl and WebFetch make separate requests, so the curl value shows that the origin changes. It is not the body WebFetch received.
- Check 1 URLs. Five candidates were tried with two curl calls each. Three changed on every call and were kept: U1 httpbin.org/uuid, U2 uuidgenerator.net/api/version4, U3 random.org integers. time.now also changed but was held in reserve. worldtimeapi.org gave no response (curl HTTP code 000 on both calls) and was dropped.
- Check 1 schedule. Each URL was fetched at t0, about t0+2 min, about t0+8 min and about t0+16 min with the prompt "Return the exact value in the body, verbatim." At t0+2 min each URL was also fetched once with a harmless extra query parameter (`?cb=1` for U1 and U2, `&cb=1` for U3, which already had a query string). The U1 `?cb=1` variant was fetched twice more, just under and just over 15 minutes after its own first fetch. One last U1 call at 13:25:36 used a different prompt to see whether the cache is keyed on the URL or on the prompt. Waits used `python3` sleep in Bash.
- Check 1 headers and redirects. `curl -s -D -` on each URL recorded the status, redirect count and cache headers.
- Check 2a. Ten WebSearch queries in plain words, `mode: "standard"`, no domain filter: 2 news, 2 technical docs, 2 local, 3 non-English (French, German, Japanese) and 2 very niche. The count is the number of entries in the "Links" list each call returned.
- Check 2b. WebSearch calls in one subagent turn, numbered 1 to 30. Calls 1 to 10 are the 2a queries. Calls 11 to 30 are simple fact and how-to queries. All used `mode: "standard"`. The calls ran from about 13:10 to 13:18 UTC, mixed with Bash and the round 3 WebFetch calls, not strictly back to back. The plan was to stop at the first error, limit message or refusal.
- Budget: 30 WebSearch calls and 18 WebFetch calls in total.

## Results summary

| Check | n | Result |
|---|---|---|
| 1. WebFetch cache | 3 URLs, 18 WebFetch calls | Same value at t0, +2 min and +8 min for all 3 URLs. New value at +16 min for all 3. Curl gave a new value on every call. An extra query parameter gave a fresh value (3 of 3). The `?cb=1` variant was still cached at 14:02 after its first fetch and fresh at 15:15. A different prompt at 13:25:36 got the cached U1 body. |
| 2a. Links per call | 10 queries | Min 9, max 10, median 9. Eight calls gave 9 links, two gave 10. |
| 2b. Calls per turn | 30 calls | No cap hit at n = 30 within one subagent turn. No error, limit message or refusal. |

## Check 1. WebFetch cache

Elapsed time is counted from that URL's own first WebFetch call.

| Round | URL | Time (UTC) | Elapsed | curl value | WebFetch value | Same as WebFetch t0 |
|---|---|---|---|---|---|---|
| R1 t0 | U1 https://httpbin.org/uuid | 13:07:30 | 0:00 | 4eb851d7-0f33-412c-b98e-30cfe01b645b | 1d9074a3-ab18-486d-83ce-0ace685f672f | n/a |
| R1 t0 | U2 https://www.uuidgenerator.net/api/version4 | 13:07:37 | 0:00 | f22d21a1-6397-46e8-bcf5-ad161a7101b6 | fac6a7ef-64f1-4fb0-9e28-ce25044a8ece | n/a |
| R1 t0 | U3 https://www.random.org/integers/?num=1&min=1&max=1000000000&col=1&base=10&format=plain&rnd=new | 13:07:46 | 0:00 | 57793597 | 135457978 | n/a |
| R2 | U1 | 13:09:39 | 2:09 | 84888517-bada-4960-8d55-98cb64f90956 | 1d9074a3-ab18-486d-83ce-0ace685f672f | Yes |
| R2 | U1 + `?cb=1` | 13:09:45 | 0:00 (own t0) | 302378fa-2d2a-4778-abe1-79149d2c7d60 | c00886cd-7c96-44e1-822b-2ec6bb357b79 | No, fresh |
| R2 | U2 | 13:09:53 | 2:16 | 889fdcff-251c-48e7-a227-e2ad055966a3 | fac6a7ef-64f1-4fb0-9e28-ce25044a8ece | Yes |
| R2 | U2 + `?cb=1` | 13:10:00 | 0:00 (own t0) | fde3d55a-b0e5-4b27-8266-e60f2e76af17 | 26a4f913-4a18-4404-abaa-0962b2a9c01d | No, fresh |
| R2 | U3 | 13:10:06 | 2:20 | 725302164 | 135457978 | Yes |
| R2 | U3 + `&cb=1` | 13:10:14 | 0:00 (own t0) | 133474591 | 318297426 | No, fresh |
| R3 | U1 | 13:15:32 | 8:02 | dee94632-e4b9-46f8-9f78-62aa42b5e06e | 1d9074a3-ab18-486d-83ce-0ace685f672f | Yes |
| R3 | U2 | 13:15:41 | 8:04 | f9b9672d-5f95-4f15-9524-c9a778bb8473 | fac6a7ef-64f1-4fb0-9e28-ce25044a8ece | Yes |
| R3 | U3 | 13:15:49 | 8:03 | 683745672 | 135457978 | Yes |
| R4 | U1 | 13:23:35 | 16:05 | 6f90b82b-2140-41eb-b3a9-1456d55bbf6c | 4acfe3b8-c0ed-40b2-a660-de6e629b5831 | No, new |
| R4 | U1 + `?cb=1` | 13:23:47 | 14:02 | 5610bf48-ec32-481e-acc6-e52aefb7e282 | c00886cd-7c96-44e1-822b-2ec6bb357b79 | Yes, same as its own t0 |
| R4 | U2 | 13:23:54 | 16:17 | efba7fc7-91ba-4860-9513-8f60b1135bec | 62d97717-2c91-4f3b-b267-73435ba38df3 | No, new |
| R4 | U3 | 13:24:03 | 16:17 | 136387765 | 112720823 | No, new |
| R5 | U1 + `?cb=1` | 13:25:00 | 15:15 | 1d42573a-d4ce-45f0-81ae-4178f03d0581 | f957bc66-0d93-4e95-add9-20cbcdf1bfda | No, new |
| R5 | U1, different prompt | 13:25:36 | 2:01 after R4 | none taken | 4acfe3b8-c0ed-40b2-a660-de6e629b5831, with the full JSON body | Yes, same as R4 |

Headers and redirects (curl GET, 13:25 UTC):

| URL | Status | Redirects | Cache headers |
|---|---|---|---|
| U1 httpbin.org/uuid | HTTP/2 200 | 0 | none |
| U2 uuidgenerator.net | HTTP/2 200 | 0 | none |
| U3 random.org | HTTP/2 200 | 0 | `cache-control: no-store, no-cache, must-revalidate`, `pragma: no-cache`, `expires` in 1981 |

What this shows:

- The cache is real. Inside 15 minutes all three URLs gave the WebFetch t0 value again, while curl got a new value each time. After 15 minutes all three gave a new value.
- Expiry falls between 14:02 and 15:15 for the `?cb=1` URL, and between about 8 and 16 minutes for the three base URLs. This fits the 15 minutes in the tool description.
- The cache key is the full URL with its query string. One added parameter bypassed the cache on all 3 URLs. That variant then had its own 15-minute entry.
- The key does not include the prompt, on the 1 call that tested it. A different prompt at 13:25:36 got the U1 body cached at 13:23:35, and the model quoted the whole JSON body. So the cache holds page content, not only the earlier answer.
- WebFetch ignored the origin's cache headers on the 1 page that sent them. random.org sends `no-store, no-cache`, yet WebFetch served the same number for 8 minutes.
- WebFetch said nothing about caching in any of its 18 replies. No reply said "cached", gave an age or gave a fetch time. The only mention is in the tool description given to the model: "Responses are cached for 15 minutes per URL."
- Redirects do not explain the repeats. All three URLs answered curl with 200 and 0 redirects.
- A summarising model does not explain the repeats. Guessing the same 36-character UUID on four separate calls is not credible, and the query-string variants and the 16-minute calls gave new values through the same model.

## Check 2a. Links per WebSearch call

| Call | Type | Query | Links returned | Note |
|---|---|---|---|---|
| 1 | News | Federal Reserve interest rate decision October 2026 | 9 | 4 links from one real-estate blog, no federalreserve.gov link |
| 2 | Technical docs | Python asyncio TaskGroup documentation exception handling | 9 | No docs.python.org link. Summary said so |
| 3 | Local | best ramen restaurants near Shinjuku station Tokyo | 9 | 4 of 9 were one pelago.com article in different languages |
| 4 | Non-English (French) | recette traditionnelle du cassoulet de Castelnaudary | 9 | Answer written in French |
| 5 | Very niche | Hamamatsu R1924A photomultiplier tube dark current at 1000V | 9 | Datasheet found. Value only in a chart, so no number given |
| 6 | Technical docs | Kubernetes HorizontalPodAutoscaler behavior scaleDown stabilizationWindowSeconds | 9 | Only official link was a Chinese v1.33 page |
| 7 | Non-English news (German) | Bundesliga Ergebnisse heute Spieltag | 10 | All 10 were sportschau.de pages dated 2023 to 2026-05. None for today |
| 8 | Local | plumbers open Sunday in Boise Idaho | 9 | Included dev-azure and cu-azure hosts of rotorooter.com |
| 9 | Non-English news (Japanese) | 日本銀行 金融政策決定会合 2026年10月 結果 | 9 | No October 2026 result. Answer written in Japanese |
| 10 | Very niche | Coleophora alcyonipennella larval host plant case-bearer moth | 10 | |

Min 9, max 10, median 9. Across all 30 calls in 2b, 23 gave 9 links and 7 gave 10 (277 links). No call gave more than 10 or fewer than 9.

## Check 2b. WebSearch calls in one turn

| Call | Query | Links | Outcome |
|---|---|---|---|
| 1 to 10 | The 2a queries above | 9 to 10 | OK |
| 11 | capital of Australia | 9 | OK |
| 12 | boiling point of water at 2000 meters altitude | 9 | OK |
| 13 | how many moons does Jupiter have | 10 | OK |
| 14 | git rebase onto another branch example | 9 | OK |
| 15 | population of Canada 2026 | 9 | OK |
| 16 | Rust borrow checker lifetime elision rules | 9 | OK |
| 17 | weather forecast Chicago this week | 10 | OK. No current forecast, newest item from January 2026 |
| 18 | PostgreSQL VACUUM FULL vs VACUUM difference | 9 | OK |
| 19 | what year did the Berlin Wall fall | 9 | OK |
| 20 | tallest building in the world | 9 | OK |
| 21 | Docker compose healthcheck syntax | 9 | OK |
| 22 | speed of light in vacuum meters per second | 9 | OK |
| 23 | how to make sourdough starter | 9 | OK. 8 of 9 were comment pages of one recipe |
| 24 | TypeScript satisfies operator example | 9 | OK |
| 25 | largest desert in Africa | 10 | OK |
| 26 | nginx reverse proxy websocket configuration | 9 | OK |
| 27 | who wrote Pride and Prejudice | 10 | OK |
| 28 | Mount Kilimanjaro height | 9 | OK |
| 29 | JavaScript Array.prototype.toSorted browser support | 10 | OK |
| 30 | photosynthesis light dependent reactions summary | 9 | OK |

Result: no cap hit at n = 30 within one subagent turn. Every call returned links and a summary. None returned an error, a limit or cap message or a refusal. Every reply ended with the same appended reminder to cite the sources as markdown links.

Tool schema. The WebSearch schema given to the model has four parameters: `query` (required, "minLength": 2), `mode` (required), `allowed_domains` and `blocked_domains`. It has no `max_uses`, limit or result-count parameter, and its text names no per-turn or per-session cap. The description begins "Search the web. Returns result blocks with titles and URLs. US-only." The `mode` text offers "standard" or "extended", where extended is described as "a thorough, fresh search at several times the cost and latency." Only "standard" was tested.

Side observations from the 30 result lists, judged from URL and title only, pages not opened:

- Keyword pages on unrelated university and company subdomains showed up in at least 7 of 30 calls (11, 12, 13, 15, 19, 22, 27), for example shibboleth.idm.home.nyu.edu (4 calls), myshare-cms.siemens.com (2 calls), face.meei.harvard.edu, aptraining.csc.com and evri-delivery.blogto.com (3 links in call 19). The WebSearch summary itself called some of these low quality.
- Staging or admin hosts showed up in 4 calls: dev-azure.rotorooter.com and cu-azure.rotorooter.com (call 8), wpadmin.middleware.io (call 21), 2ality-com.onrender.com (call 24), ls.sandbox2.aheadworks.com (call 25).
- Time-bound queries came back stale in 3 calls: Bundesliga results (call 7), BoJ October 2026 meeting (call 9), Chicago weather (call 17). In each case the summary said so.

## What this does not tell you

- Where the cache lives. It may be in this Claude Code process, in this session or on a server. A second session or machine was not tried within 15 minutes.
- Which URL changes count as a new key. Only an added query parameter was tested. Case, trailing slash, fragment and parameter order were not.
- The exact expiry. It is bounded between 14:02 and 15:15 for one URL and between about 8 and 16 minutes for three others.
- The body WebFetch actually received. Curl makes its own request, so it proves the origin changes, not that WebFetch quoted its copy exactly. A summarising model could still misquote a page.
- Whether a cached reply still costs a network fetch or tokens. WebFetch gives no timing or cache flag.
- A WebSearch cap above 30 calls, or a cap that applies only to a main session, a longer session or `mode: "extended"`. The 30 calls also ran over about 8 minutes with other tools in between, not in a tight loop.
- Results per call beyond these 30 queries. The count is the "Links" list only, not the URLs named inside the summary.
- Behaviour on another machine, network, day or Claude Code version.
- Independence from the vendor. Claude picked the URLs and queries, ran the tools and scored the results. The JSON file holds every value so others can recheck.
