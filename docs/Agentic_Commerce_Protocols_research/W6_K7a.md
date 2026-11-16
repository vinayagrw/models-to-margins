# W6 K7a fact check

Checked 2026-11-15. 110 claims from W6_todo_a.json, 92 source urls, each opened once. Full results in W6_K7a.json.

| Mark | Count |
|---|---|
| verified | 104 |
| wrong | 2 |
| unverified | 4 |

## Wrong and unverified

| id | mark | claim | fix or reason |
|---|---|---|---|
| R1-64 | wrong | EMVCo's Agentic Payments Task Force drafted a framework with Intent Services, Know Your Agent checks and Agentic Transaction Indicators. Comments closed 2026-09-30. | EMVCo's Agentic Payments Task Force drafted a framework centred on Intent Services and is also exploring Know Your Agent checks and Agentic Transaction Indicators. Comments closed 2026-09-30. KYA and indicators are only being explored, not part of the draft |
| R1-25 | unverified | UCP main gained a return policy extension (2026-10-23), a completion boundary rule (2026-11-07) and a purchase options and subscription policy (2026-11-10). | PR 1057 only covers the completion boundary, merged 2026-11-07. Return policy and subscription items not on this page |
| R1-07 | unverified | ACP requires Idempotency-Key and API-Version on POSTs, uses a bearer token, and offers a detached JSON signature header for requests. | Idempotency-Key, API-Version and bearer confirmed. Signature header is optional and not described as detached JSON |
| R5-67 | unverified | 60 of 423 open x402 issue titles mention dispute, refund, receipt, proof, attestation or delivery | Our recount does not reproduce 60 |
| R5-66 | wrong | x402 has 423 open issues and 417 open PRs, the most of the five protocol repos | x402 has 423 open issues and 421 open PRs (live count on 2026-11-15). PR count differs from 417. Comparison with other four repos not checked here |
| G-136 | unverified | Searches for Mastercard rule text on agent liability, the DRCF statement text and an OpenAI ChatGPT Wallet launch returned 403 or nothing. No claim made on these | Claim is about the author's own searches, which no page can confirm. The release itself has no liability text |
