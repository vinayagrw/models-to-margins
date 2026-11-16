# D1. Our own scheduled runs could search but not open pages

Checked 2026-10-25 from the cloud run logs (RemoteTrigger get_run_log). Evidence rung 3: our own observation from primary logs.

## What the logs show

| Run session | Routine | Date | WebFetch calls | Failed | Error | WebSearch |
|---|---|---|---|---|---|---|
| cse_012HsKRe8eKYzy1N2NYvQrKv | Frontier Tech weekly | 2026-10-24 | 4 | 4 | getaddrinfo ENOTFOUND (www.digitalapplied.com, www.quantinuum.com, thequbitreport.com, www.therobotreport.com) | Worked |
| cse_018DkABRZPoFTaerb3713CwB | Industry weekly | 2026-10-24 | 4 | 4 | getaddrinfo ENOTFOUND | Worked |
| cse_01HmsDxawYtZ8vUNqeNvMEfD | Healthcare weekly | 2026-10-24 | 4 | 4 | getaddrinfo ENOTFOUND | Worked |
| cse_014wSp9P92VXWbvdpinLvURZ | Real estate weekly | 2026-10-24 | 5 | 5 | getaddrinfo ENOTFOUND. A Bash curl got "CONNECT tunnel failed, response 403" | Worked |
| cse_01PPR74nkecnuXLZdBdnnQvY | BFSI weekly | 2026-10-24 | 2 | 2 | getaddrinfo ENOTFOUND | Worked |
| cse_01Xqmgx1buXzvFihj2ffquXL | Frontier Tech weekly (older copy) | 2026-10-10 | 10 | 8 on DNS | getaddrinfo ENOTFOUND. Only anthropic.com pages were reached | Worked |
| cse_0154VLy7R8QFHwaqn4qvHVnh | Industry weekly (older copy) | 2026-10-10 | 13 | 13 | getaddrinfo ENOTFOUND. One subagent called it a "tool-level outage" | Worked |

On 2026-10-24, 19 of 19 page fetches failed across 5 runs. Every run still searched normally.

## Cause

- Every routine runs in the same cloud environment, env_01LvTE4wnXAstMtAF6VG8NFQ. The old and new copies of the routine use the same one.
- The sandbox sends traffic through a proxy. Its no-proxy list holds only localhost and Anthropic hosts. Other hosts fail to resolve, or the proxy refuses them with a 403.
- WebSearch runs on Anthropic's side, so it is not affected. WebFetch and curl run inside the sandbox, so they are.
- This is a network setting on the environment. It is not a model fault and not a service outage.

## Link to the top 10

| Top 10 item | How it shows up here |
|---|---|
| #7 Blocked or unreadable pages | The trigger. This time our own sandbox did the blocking, not the site |
| #6 Reads snippets, not pages | The effect. Each report was built from search snippets and tracker pages only |
| #5 Stale facts shown as current | The risk that follows. Snippets carry no reliable date. The 10-24 Frontier report says some items predate its 7-day window |
| #2 Silent failure, confident answer | Partly avoided. The 10-24 report warned the reader at the top. The 10-10 subagent misnamed the cause as an outage |

## Fix

1. The owner sets the environment's network access to full, or adds the needed news hosts to its allowlist, in the claude.ai cloud environment settings.
2. Done 2026-10-25 with the owner's approval: each of the 6 enabled routine prompts now fetches one known page first. If that fails, the report and its push notice open with "Pages could not be opened in this run, so every fact below rests on search snippets and is unverified".

## What this does not tell you

- It does not show how often this happens to other users' cloud sessions.
- It does not measure how many facts in the 10-24 reports are wrong. That needs a rerun with pages open.
