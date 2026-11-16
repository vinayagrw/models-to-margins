# arch_view.json fact check

Checked 2026-10-26 against A1 sections 1.1 to 1.3, A2 section 1, the status column of V10a, design doc section 6.2 and arch.json.

## Method

- A ledger id counts only if its V10a row status starts with "verified". Rows marked wrong or unverified in V10a are not used, even where the brief was fixed afterwards.
- Each node and flow claim was compared with the V10a row text, not only the brief.
- Status here is **verified** (every fact in the claim sits in a verified row), **design** (our framing, src empty) or **unsupported** (removed or changed, see the last section). No row in the final file is unsupported.
- The ev field in the JSON splits verified rows two ways. **verified** means at least one cited row comes from a standard, spec, paper or open project page. **vendor** means every cited row is a seller's page about its own product (flagged [vendor] in A1 or A2). Both count as verified below.
- A node can be verified while one of its parts is our design. Those parts are listed in the node's `design_parts` field and in the claim cell below.
- Mechanical checks also run on the file: JSON parses, names 3 words or fewer, roles 8 or fewer, flow labels 3 or fewer, parts 4 or fewer, no em-dash or semicolon, every flow end exists, every A1 step 1 to 13 and A2 fence step is covered, external rows use only the allowed ledger ranges.

## Planes, zones and outside systems

| id | claim | status | ledger id or section checked |
|---|---|---|---|
| plane control | Versioned settings, each change a release you test and roll back | design | A1 1.1 says the split is our framing. Kong (AR1-12) and Azure (AR1-15) use the term for their own products only |
| plane data | Live path that reads and enforces the settings | design | A1 1.1 |
| zone org | Your organisation, trust boundary | design | Our framing |
| zone sandbox | Agent sandbox inside the organisation | design | Our framing of A2 step 5 |
| zone vendor | Model providers, outside | design | Our framing |
| zone web | Web sources, untrusted | design | Our framing, A2 step 2 treats web text as untrusted |
| zone idp | Identity provider, outside | design | Our framing |
| zone obs | Trace store, outside | design | Our framing |
| ext providers | Anthropic, OpenAI, Google, AWS Bedrock each publish pin and notice rules | verified | AR1-47, AR1-48, AR1-49, AR1-50 |
| ext idp | Entra and Okta give agent identities, short-lived tokens, revoke | verified | AR2-37, AR2-38, AR2-39, AR2-40, AR2-41 |
| ext web | Five search and fetch tools, all with domain lists, some with page dates | verified | AR1-29 to AR1-33. Page dates from AR1-29 page_age and AR1-30 retrieved_at |
| ext traces | Langfuse stores traces, shared GenAI field names | verified | AR1-58 (tracing, evals, datasets), AR1-38 (field names) |

## Nodes

| id | claim | status | ledger id or section checked |
|---|---|---|---|
| ask | App calls one internal endpoint, never the provider. Covers A1 steps 1 and 9 | design | A1 1.2 step 1 and step 9 cite nothing. Design doc 6.2 step 1 |
| gate | Gateway checks the caller and applies its policies. Per-key limits. Policy set is design | verified (vendor) | AR1-14 quota per counter key. AR1-15 central routing, segmentation, quota governance. Choosing a policy set per caller is A1 design |
| budget | Refuses calls over spend cap or token rate. Pre-counts prompt tokens | verified (vendor) | AR1-14 token limit and prompt pre-count. AR1-60 exhausted budget returns 422 |
| screen_in | Masks personal data and screens harmful prompts. No block (A1 says related block, out of scope) | verified (vendor) | AR1-17 PII masking via a function. AR1-44 flag or block harmful prompts. AR1-12 AI Sanitizer and AI Prompt Guard named |
| read | Domain allow lists, page dates, recency filter. Cite opened pages only is design | verified (vendor) | AR1-29, AR1-31, AR1-33 domain lists. AR1-29 page_age, AR1-30 retrieved_at. AR1-33 recency filter. A1 gap 5: no tool blocks citing an unopened page, so that part is our rule |
| route | Exact version ID, no floating alias, same-version fallback only | verified (vendor) | AR1-16 same model same version, no X to X+1. AR1-47 pinned snapshots. AR1-48 use a specific stable model |
| model | Pinned snapshot answers with source passages. Sits in the provider zone | verified (vendor) | AR1-47 pinned snapshot. AR1-49 aliases map to dated snapshots. AR1-24 exact source passage per cited line |
| check | Separate checker splits claims, scores each with its cited chunk, then blocks, flags or corrects | verified | AR1-25 claims split and scored (Ragas, not vendor). AR1-18 claim-level scores and cited chunks. AR1-07 blocks below threshold. AR1-19 flags and preview correction. "Separate model" is A1 design |
| screen_out | Safety classifiers on the answer. Every claim cited is design | verified (vendor) | AR1-44 flag or block harmful answers. AR1-28 Llama Guard labels answers safe or unsafe. Citation coverage check has no ledger row |
| human | Named person signs off work that leaves | design | Design doc 6.2 step 6. P9 evidence is outside A1 and A2 |
| log | Every step writes one trace span. Model asked and answered, tokens and cost. Claim score and policy decisions are design | verified | AR1-38 request.model, response.model, usage tokens. AR1-39 text capture opt-in. AR1-60 spend logs. AR2-03 MCP trace context. AR2-33 NCSC log tool calls. OTel has no claim score or policy field |
| settings | Versioned store of model versions, source lists, thresholds, budgets, test set | design | A1 1.1 |
| change | New model, prompt, threshold or source list | design | A1 1.3 step 11 lists the change types, no cite |
| testset | Your own questions with planted errors and injections | design | Design doc 6 P10 row: custom build, no product |
| testgate | Change ships only above the pass bar | verified (vendor) | AR1-36 fail CI below a pass rate. 95% is an example, no bar is set here |
| canary | Small fixed set runs daily on production | verified (vendor) | AR1-36 daily scheduled workflow. AR1-56 provider changed a classifier in October 2026, which is why. Running it on production is our design |
| act | Planner writes the plan before it sees untrusted text | verified | AR2-12 plan-then-execute (paper). AR2-08 CaMeL. V10a Step 1 row |
| agentid | Own low-privilege identity, short-lived tokens, step-up scopes | verified | AR2-01 step-up (MCP spec). AR2-37 Entra blueprint identity. AR2-39 short-lived scoped tokens. V10a Step 0 row |
| reader | Model with no tools reads untrusted text, returns labelled values with an origin tag | verified | AR2-06 dual LLM. AR2-07 and AR2-09 CaMeL origin tags. V10a Step 2 row |
| toolgw | Every tool call checked against written policy. Audience-bound token, deny-by-default list, policy rules, data-flow check | verified | AR2-02 audience binding. AR2-49 allowlist mode hides all tools. AR2-46 profiles as allow lists. AR2-50 CEL. AR2-51 Cedar on every Gateway call. AR2-09, AR2-13 data-flow blocks (CaMeL blocks or asks, FIDES blocks) |
| approval | Delete, deploy or send waits for a person or reviewer model. Deny rules always hold. Exact command shown is design | verified (vendor) | AR2-20 blocks prod deploys and mass deletes, deny rules in every mode. AR2-51 approval before transfer. AR2-24 reviewer agent option |
| sandbox | Code runs boxed, writes to workspace only, network off or host allow list, credentials kept outside | verified | AR2-56 gVisor (open project). AR2-21 and AR2-24 write and network limits. AR2-45 credentials injected by the gateway. AR2-57 MXC. V10a Step 5 row |
| offswitch | Cuts the agent off from one place: block at the identity provider, revoke at the gateway. Scheduled drill is design | verified (vendor) | AR2-38 Conditional Access blocks at token issue. AR2-40 kill switch. AR2-41 central revoke. A2 gap 1: no source sets a drill rule |

## Flows

| id | claim | status | ledger id or section checked |
|---|---|---|---|
| F01 | ask to gate: one internal endpoint (order 1) | design | A1 step 1 |
| F02 | gate to budget: known caller (order 2) | verified (vendor) | AR1-14 limits per counter key |
| F03 | budget to ask: refused over cap | verified (vendor) | AR1-14 pre-count avoids wasted call. AR1-60 422 on exhausted budget |
| F04 | budget to screen_in: under the cap (order 3) | design | A1 step order |
| F05 | screen_in to read: screened prompt (order 4) | design | A1 step order |
| F06 | read to web: allow-listed search | verified (vendor) | AR1-29, AR1-31, AR1-33 |
| F07 | web to read: pages with dates | verified (vendor) | AR1-29 page_age, AR1-30 retrieved_at |
| F08 | read to route: opened sources only (order 5) | design | A1 read-before-cite rule, A1 gap 5 |
| F09 | route to model: exact version ID (order 6) | verified (vendor) | AR1-47, AR1-16 |
| F10 | model to check: answer with citations (order 7) | verified (vendor) | AR1-24 |
| F11 | check to screen_out: checked claims (order 8) | design | A1 step order |
| F12 | screen_out to ask: answer and warnings (order 9) | design | A1 step 9 |
| F13 | screen_out to human: outbound work | design | Design doc 6.2 step 6 |
| F14 | human to ask: signed off | design | Design doc 6.2 step 6 |
| F15 | route to log: models and tokens (order 10) | verified | AR1-38 request.model, response.model, usage tokens |
| F16 | toolgw to log: who, what, why | verified | AR2-03 trace context. AR2-33 NCSC log tool calls. "Why" (policy decision) is A2 step 7 design |
| F17 | log to traces: OTel export | verified | AR1-38 field names. AR1-59 Langfuse takes OTLP over HTTP |
| F18 | read to act: if action needed | design | Design doc 6.2 step 4 |
| F19 | web to reader: untrusted page text | verified | AR2-06 quarantined model reads untrusted text |
| F20 | reader to act: labelled values only | verified | AR2-06 planner sees variables. AR2-07 origin tracking |
| F21 | act to toolgw: each tool call | verified (vendor) | AR2-51 every Gateway tool call checked. AR2-41 all tool calls through policy |
| F22 | idp to agentid: short-lived token | verified (vendor) | AR2-39, AR2-41 |
| F23 | agentid to toolgw: audience-bound token | verified | AR2-02 RFC 8707 audience |
| F24 | toolgw to approval: risky action | verified (vendor) | AR2-20, AR2-51 |
| F25 | toolgw to sandbox: safe action runs | design | A2 step 4, reads and edits run without approval |
| F26 | approval to sandbox: approved action | design | A2 step 5 |
| F27 | sandbox to reader: result as untrusted | design | A2 step 6 cites nothing |
| F28 | act to check: claims vs records | design | A2 step 8. A2 gap 4: no standard sets this check |
| F29 | offswitch to idp: block or revoke | verified (vendor) | AR2-38 block, AR2-40 kill switch |
| F30 | offswitch to toolgw: revoke at gateway | verified (vendor) | AR2-41 central revoke |
| F31 | settings to gate: policies and budgets | design | A1 1.1 |
| F32 | settings to read: source lists | design | A1 1.1 |
| F33 | settings to route: pinned versions | design | A1 1.1 |
| F34 | settings to check: thresholds | design | A1 1.1 |
| F35 | change to testgate: run test set | verified (vendor) | AR1-36 |
| F36 | testgate to settings: ship if pass | verified (vendor) | AR1-36 |
| F37 | testgate to change: blocked below bar | verified (vendor) | AR1-36 exit 1 below the pass rate |
| F38 | testset to testgate: your own cases | design | Design doc 6 P10 |
| F39 | canary to gate: daily probe | design | A1 step 12, our schedule |
| F40 | log to testset: failures become cases | design | A1 step 13 cites nothing |

## Unsupported items found and what changed

The first draft followed the A1 and A2 wording. The check found these items with no verified support.

| item | draft said | problem | fix |
|---|---|---|---|
| gate src | AR1-34b (LiteLLM budgets per key, team, user) | V10a marks AR1-34b wrong. The brief was fixed, but the row is not marked verified | AR1-34b removed. Gate rests on AR1-14 and AR1-15 |
| screen_in part | Topic rules | A1 step 3 names it with no ledger row | Removed |
| screen_in role and part | Screens prompt attacks | No verified row describes a prompt-attack screen. AR1-12 only names Prompt Guard | Reworded to harmful prompts, backed by AR1-44 |
| approval part | Exact command shown, cited AR2-04 | V10a Step 4 is wrong: the MCP rule covers starting a new local server, not approvals | AR2-04 removed. The part is now design |
| offswitch role | Revokes the agent instantly | "Instantly" is Okta's own claim, rung 5 (AR2-41 flag) | "Instantly" removed. Role now says cuts the agent off from one place |
| offswitch part | Revoke at identity provider | AR2-38 blocks at token issue and does not revoke issued tokens | Changed to block at identity provider |
| offswitch part | Scheduled drill | A2 gap 1: no source sets a drill rule | Kept as design |
| canary role | Catches silent provider changes | No source measures what a canary catches. AR1-56 shows only that a change happened | Changed to small fixed set runs daily on production |
| check role and part | Ties claims to quoted sentences | Vendor rows give claim scores and cited chunks, not quoted sentences. A1 2.1 says Bedrock does not name the supporting sentence | Changed to scores each claim against sources, part cited source chunk |
| log parts | Claim score and policy decisions, cited AR1-38 | OTel defines model and token fields, not these | Kept as design parts |
| agentid src | AR2-43 SPIFFE | V10a says the SPIFFE page does not mention AI agents | AR2-43 removed |
| F40 | Failures become cases, cited AR1-58 | AR1-58 lists datasets and evals. It does not say production failures become test cases. arch.json repeats this Langfuse claim | Changed to design, src emptied |
| traces example | Arize Phoenix, AR1-62 | Outside the allowed outside-system rows (AR1-38, AR1-58) | Removed |
| flow budget to log | Tokens and cost | 41 flows, over the 40 cap | Removed. Tokens and cost stay as log parts (AR1-38, AR1-60) |
| read and testset labels | Two parts over 4 words, test set name 4 words | Label limits | Shortened |

One item in arch.json itself fails this check: the P3 option says Langfuse "turns failures into new test cases". AR1-58 does not support that wording. arch_view.json does not repeat it.

## Totals

| | verified (neutral) | verified (vendor) | design | total |
|---|---|---|---|---|
| Nodes | 7 | 11 | 5 | 23 |
| Flows | 6 | 14 | 20 | 40 |
