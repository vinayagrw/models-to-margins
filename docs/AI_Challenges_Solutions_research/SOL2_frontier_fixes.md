# SOL2. Best fixes today for 14 frontier AI problems

Strand SOL2 of the AI challenges solutions research. Compiled 2026-10-25. Window for new items: 2026-09-25 to 2026-10-25.

Builds on [Frontier_AI_Challenges_User_Research.md](../Frontier_AI_Challenges_User_Research.md) (the source doc): the manager actions, the section 4 tiers and likelihood and cost table, each theme's "What a buyer can do now", the section 6 "Fix in one line" column and the Appendix A ledgers. Also reuses [R5_likelihood_cost.md](../Frontier_AI_Challenges_research/R5_likelihood_cost.md) and [R7_vendor_lockin.md](../Frontier_AI_Challenges_research/R7_vendor_lockin.md). Ids such as VR4-04, L-24 and LK-19 point to those ledgers and were not reopened here unless stated.

## How to read this file

- **Best fix today** is the strongest fix a buyer can get now, not a perfect one.
- **Owner**: buyer, vendor or both, with the buyer role named.
- **Effort**: low (settings or a clause), medium (weeks of work across teams), high (budget, roles or vendor retraining).
- **Maturity**: research, early product (preview or beta), or generally available (GA), as shown on the page that sells or defines it.
- **Evidence rung**: 1 peer-reviewed or audited, 2 primary record, 3 independent measurement, 4 independent survey, 5 vendor or consulting survey or claim, 6 press or user post, 7 unopened.
- Flags: [vendor] sells the fix or the product. [consulting] and [analyst] sell advice. [self-report] means the party reports on itself. [preprint] is not peer reviewed.
- "Evidence it works" means a measured effect of the fix, such as before and after or with and without. Proof that the problem exists is not counted.
- "Not measured" means we looked and found no figure.
- "My arithmetic" marks a figure we computed from opened numbers.

## Method

- Five research strands, one per group of themes, opened every cited page on 2026-10-25 with WebFetch, curl or the Wayback Machine. Strand 4 (themes 5, 7 and 12) did not deliver, so the lead researched those themes directly, partly from pages that strand had saved.
- The lead then reopened ten main evidence rows: the Georgia Tech study, the Anthropic cyber program results, the Claude Code auto mode rates, the MCP authorization spec, the OpenAI deprecation page, the model update flip-rate preprint, the RovoDev and LLM review bot papers, the Gartner stop-rule release and the Netskope AI Report 2026. Nine matched. The Netskope page was blocked on reopen, so it rests on the strand's own read. Each rechecked row says so in the ledger.
- Rows marked unverified in the ledger are never used as main evidence.

## Summary table

| # | Theme | Tier | Best fix today | Owner | Effort | Maturity | Best evidence it works (rung, independent?) | New in last 30 days |
|---|---|---|---|---|---|---|---|---|
| 1 | Confident wrong answers in high-stakes work | A | Ground answers in source documents with citations on. A named checker opens every cited source and figure before anything leaves | Both. Team head (general counsel, finance lead) checks. CIO turns on grounding and keeps the model log | Medium | GA: Anthropic Citations, Bedrock grounding checks, Gemini grounding. Azure groundedness in preview | Grounded legal tools hallucinated on 0.17 (Lexis) and 0.33 (Westlaw) of answers against 0.43 for GPT-4. Rung 1, independent (SF-01). No study measures the human check | 2026-09-30: California SB 574 signed. From 2027-01-01 every cited authority must be personally verified (SF-10) |
| 2 | Agents act or report wrongly | A | OS sandbox and own low-privilege identity per agent. Delete, deploy, network and credential use go to a blocking reviewer or a human. "Tests passed" counts only with a CI log | Both. Security lead sets policy, CIO owns agent identities, team heads own the CI-log rule | Medium | GA: Claude Code sandbox and auto mode, Codex Auto-review, Copilot agent firewall, Entra Agent ID, Okta for AI Agents. Sandboxes often off by default | Claude Code auto mode misses 17% of 52 real overeager actions and wrongly blocks 0.4% of 10,000 normal ones. Rung 2, vendor. Adaptive attacks beat monitors on over 55% of tries (SF-44, SF-46) | 2026-10-20: OpenAI Auto-Review now blocks attempts to disable monitoring. 2026-10-22: Anthropic red team of auto mode and Codex Guardian (SF-36, SF-46) |
| 3 | Data leaves your control | A | One approved enterprise tool with no-training terms, inline DLP on prompts and on the browser path to personal AI, block AI apps with no business use | Buyer. CIO picks the tool, security lead runs DLP | Medium | GA terms and browser DLP. Purview blocking of sensitive prompts in Copilot still preview, uploaded files not scanned | Personal AI app use fell from 78% to 47% as managed use rose, then stalled in March 2026. Rung 5, vendor, not causal (SF-73, SF-75) | Mid-October 2026: Purview DLP for Cowork reaches GA, prompt text only (SF-78) |
| 4 | Agent tools as an attack path | B | Allowlist MCP servers by URL or command, server-bound tokens, default-deny network, injection probe plus action classifier | Both. Security lead owns allowlist and patching. Procurement asks for attack rates and a CVE policy | Medium | Mixed: MCP spec 2026-07-28 and Copilot MCP allowlists GA. Prompt Shields tool scanning preview. CaMeL research | Opus 5.5 coding injection success fell from 54.61% to 11.13% with probes. Rung 2, vendor with outside attacker. Adaptive attacks beat 12 defences at over 90% (rung 3, independent) (SF-65, SF-70) | No new MCP spec. 2026-10-08: OWASP Q3 roundup. 2026-10-19: OpenCode malicious-MCP flaw disclosed, no CVE (SF-72, SF-60) |
| 5 | Spend without proven return | C | Write the value measure, cost measure and stop rule before each pilot. Track both per use case monthly and stop what misses | Buyer. Finance lead owns ledger and stop rules, team heads own value measures | Medium | GA cost meters (Claude, OpenAI, Microsoft). Early value standards (FinOps for AI, FOCUS 1.4) | Firms with pilot stop rules were 2.3 times, and with production stop rules 2.6 times, more likely to be AI "vanguards". Rung 5, analyst, correlational (SF-121) | 2026-09-25: Microsoft splits Copilot into seat licence plus usage-based credits, FinOps tools in preview (SF-124) |
| 6 | Models change under you | B | Pin snapshot ID and API version, keep a retirement register, run per-example tests on your own tasks before any move | Both. Vendor sets notice. Platform lead pins and tests. Procurement writes minimum notice | Low to medium | GA: pinned snapshots, Azure NoAutoUpgrade, promptfoo | After five model updates, 24.7% to 47.2% of answers the old model got right became wrong, even when averages rose. Rung 3, independent (SF-102) | 2026-10-14: OpenAI set a 92-day shutdown for GA GPT-4o and GPT-4.1 snapshots, below its stated 6 months (SF-96) |
| 7 | Usage caps nobody can predict | C | Hard spend caps per person, team and agent session, token counter before big jobs, notice terms for limit and price changes | Both. Finance lead sets budgets, procurement writes notice, platform lead sets caps | Low | GA caps and alerts (GitHub, ChatGPT Enterprise, Claude Enterprise, Managed Agents). Cost preview covers input tokens only (SF-131, SF-129) | Not measured | 2026-10-21: Microsoft usage-based models in Copilot apps GA in November, off until admins allocate credits (SF-125) |
| 8 | Tells people what they want to hear (consumer) | B | Vendors retrain against agreement and publish results. Deployers add anti-agreement instructions, crisis routing and age checks, and test them | Mostly vendor. Deployer product head and legal | High for vendor, low to medium for deployer | GA retraining and age prediction. Anti-agreement prompts are research | Anti-agreement instructions cut confirmation of delusions by 73.8% in 1,280 simulated chats. Rung 3, independent, no real patients (SF-15) | 2026-10-22: Georgia Tech study. 2026-10-07: GPT-6 regressions on under-18 emotional reliance (SF-15, SF-14) |
| 9 | Controls lag behind rollout | C | One agent registry that can also block, traces in OpenTelemetry GenAI format, a rehearsed block drill | Buyer. CIO owns registry and stop drill, security lead owns blocking and traces | Medium | GA registries: Agent 365, AWS Agent Registry, ServiceNow AI Control Tower. Early standards: OTel GenAI spans in Development, NIST has no agent profile | Firms with real-time monitoring 34% more likely to report revenue gains, 65% cost savings. Rung 5, consulting, self-report. No study on inventories or kill switches (SF-153) | 2026-10-14: Anthropic OpenTelemetry export in beta. 2026-10-20: NIST renames overlay project to COSIS (SF-141, SF-147) |
| 10 | Review overload and workforce strain | C | Plan reviewer capacity for AI volume, cap incoming PRs, require disclosure and tests, use AI review only where cycle time is measured | Buyer. Team head owns capacity, HR owns roles | High | GA tools (PR limits, Copilot code review). Role redesign is research | Mixed. Vendor-authored peer-reviewed study: PR cycle time down 30.8%. Independent peer-reviewed study: closure time up from 5h 52m to 8h 20m (SF-162, SF-163) | 2026-10-08: GitHub PR limits can count drafts. 2026-10-20: Linux Foundation survey, 25% of incoming PRs low-quality AI (SF-134, SF-158) |
| 11 | Loses context and instructions | C | Hard rules in hooks and managed settings, standing rules in files that reload after compaction, restart drifting chats from a summary | Both. Vendor sets defaults. Platform lead owns hooks and rule files | Medium | GA: Claude Code hooks, idle compaction opt-out, /context, AGENTS.md, project memory | Multi-turn score fell from 93.0 to 59.1. A recap restored it to 76.6. Rung 3, independent (SF-181) | 2026-10-05: Claude Code adds the idleCompaction opt-out, four days after the reported loss (SF-172, SF-174) |
| 12 | Outages and capacity shortfalls | C | Gateway with tested fallback to a second model or provider, SLA tier where needed, alerts on spend-limit and capacity errors | Buyer. Platform lead owns fallback, procurement owns SLA terms | Medium | GA: OpenAI Scale Tier 99.9% SLA, Google 99.5% SLA, Bedrock cross-Region, gateway fallbacks | Not measured. Disruption days differ widely by provider, which supports fallback (source doc L-38) | 2026-10-07: Claude spend-limit fault paused organisations across products. Anthropic no longer sells Priority Tier (SF-140, SF-135) |
| 13 | Safety filters block the wrong things | C | Verified-access tiers and published false-positive rates from vendors. Buyers set thresholds and test models on their own harmless but sensitive prompts | Mostly vendor. Security lead applies for tiers, CIO sets thresholds | Medium | GA: configurable filters in Azure, Gemini, Bedrock. Cyber access programs live | With Red Team Access 34 of 50 cyber tasks done, against all blocked at first prompt without. Rung 2, vendor (SF-26) | 2026-10-06: Anthropic Cyber Verification Program goes to three tiers (SF-26) |
| 14 | Vendor lock-in | C | Gateway with model IDs in config, own prompts, tests and logs in open formats (MCP, A2A), exit terms in every contract | Buyer. CIO and architect own the gateway, procurement owns exit terms | Medium to high | GA gateways and protocols. Chat and agent-state export weak | Not measured. The one comparison of apps with and without an abstraction layer is confounded. Rung 3 (SF-105) | 2026-10-16: UK CMA proposes strategic market status for Microsoft business software, naming switching barriers (SF-118) |

What the table shows:
- Every theme has a fix a buyer can start this month with tools on sale today. The gaps sit in previews (Copilot prompt blocking, prompt-injection scanning, Microsoft spending controls), weak chat and agent-state export, and standards still in draft (OpenTelemetry agent spans, a NIST agent profile).
- Evidence that fixes work is much thinner than evidence that the problems exist. Independent effect sizes (rung 1 or 3, from a source that does not sell the fix) exist for themes 1, 2, 6, 8, 10 and 11, mostly from lab or simulated settings. Theme 10's two peer-reviewed studies point in opposite directions. Themes 7, 12 and 14 have no measured effect at all.
- The human steps that most fixes rely on (the named checker, the stop rule, the block drill, reviewer capacity) have no controlled measurement anywhere in the sources.

## What changed against the source doc

1. Theme 11: the idle compaction opt-out the source doc asks for now exists in Claude Code (2026-10-05). The open ask is to make it off by default (SF-172).
2. Theme 6: OpenAI's 6-month notice for GA models did not hold for the GPT-4o and GPT-4.1 snapshots (92 days, notice of 2026-10-14). Put minimum notice in the contract rather than relying on policy (SF-96).
3. Theme 3: Netskope says the move from personal to managed AI accounts stalled around March 2026. An approved tool alone does not finish the job (SF-75).
4. Theme 4: "no open internet for agents" does not cover MCP servers, which run outside the Copilot firewall and the Claude Code sandbox (SF-50, SF-42).
5. Theme 2: the source doc says the Claude desktop prompt defaults to Always allow. The Opus 5.5 system card says auto mode is now the default for most Claude Code users. Check which product each refers to before reuse (SF-65).
6. Theme 12: Anthropic no longer sells Priority Tier capacity, so "buy priority capacity" is not an option for new Claude buyers (SF-135).
7. Theme 5: the Gartner release behind VR2-03 also links stop rules to better outcomes (2.3 and 2.6 times). That turns the stop rule from advice into a fix with rung 5 evidence (SF-121).

## The 14 themes
### 1. Confident wrong answers in high-stakes work (Tier A)

**Best fix today.** Ground the model in the source documents with citations switched on, and have a named person open every cited source and check every figure before anything is filed or sent, with a log of which model made which draft.

**Who owns it.** Both. Buyer: the head of each team that sends AI work outside (general counsel for filings, finance lead for figures) owns the check. The CIO switches on grounding and keeps the model log. Vendor: grounding, citation and abstention features.

**First step this month.** Write a one-page rule: every AI-assisted filing or client deliverable names a checker who opens each cited source in a citator or the original. Switch on the citation or grounding feature your platform already has (SF-04, SF-06, SF-08) and store the model ID with each output.

**Effort.** Medium. The tools are on the shelf and cheap per call. The cost is reviewer time on every document, and it grows with volume (see theme 10).

**Maturity.** Generally available.
- Anthropic Citations is GA on the Claude API, Bedrock, Google Cloud and Microsoft Foundry (SF-04).
- Bedrock contextual grounding checks and Automated Reasoning checks are GA. Automated Reasoning runs in seven regions, English only (SF-06, SF-07).
- Gemini grounding with Google Search is priced and documented, with inline citations (SF-08).
- Azure groundedness detection and correction are still in preview (SF-05, SF-34).
- Courts are moving from "disclose AI use" to "verify every citation": Maryland Standing Order 2026-03 (SF-09), California SB 574 (SF-10), a Tenth Circuit proposal (SF-11).

**Evidence it works.**
- Best: a preregistered, peer-reviewed test (Journal of Empirical Legal Studies, 2025). Share of answers with a hallucination: GPT-4 0.43, Lexis+ AI 0.17, Ask Practical Law AI 0.17, Westlaw AI-Assisted Research 0.33 (SF-01). Grounded tools cut hallucinations by about 60% (Lexis) and 23% (Westlaw), my arithmetic, but did not stop them. Rung 1. Independent of the vendors.
- A randomised trial with law students counted 3 fabricated-source hallucinations with a retrieval tool, 4 with no AI and 11 with a reasoning model without retrieval (SF-02). Rung 3 [preprint]. The authors say the sample is small.
- Abstention helps: on OpenAI's own SimpleQA table, a model that abstained on 52% of questions had a 26% error rate, against 75% for a model that abstained on 1% (SF-03). Rung 2 [vendor].
- Gap: no controlled study measures how many errors a named human checker catches. The check rests on court rules and sanctions, not on a measured effect.

**Cost.** Bedrock contextual grounding $0.10 per 1,000 text units (SF-06). Gemini grounding 5,000 free requests a month, then $14 per 1,000 (SF-08). Anthropic Citations adds "a slight increase in input tokens" (SF-04). Reviewer time: not measured.

**What it does not fix.** Grounded tools still cite real cases that do not support the point (SF-01). Citation checkers miss items through extraction errors and database gaps (SF-13). Questions with no source document. Review that cannot keep up with volume.

**New in the last 30 days.**
- 2026-09-30: California SB 574 signed. From 2027-01-01 no filing in a California court may contain a citation the attorney has not personally verified (SF-10). Read through a law firm summary, the legislature site was blocked.
- 2026-10-18: comments closed on a Tenth Circuit rule that would make filers certify a person reviewed AI-assisted filings. Final rules due by 2026-12-01 (SF-11).
- 2026-10-21: CiteAnchor preprint reports 0.841 F1 for spotting invented citations (SF-12). Rung 3, academic references only.

### 2. Agents act or report wrongly (Tier A, harm rising)

**Best fix today.** Run every agent in an operating-system sandbox under its own low-privilege identity with no production or keychain credentials, send every action that crosses the sandbox (delete, deploy, network, credential use) to a blocking reviewer or a human, and accept "tests passed" only from a CI or harness log.

**Who owns it.** Both. Buyer: the security lead sets managed sandbox and permission policy, the CIO owns agent identities and the stop path, team heads own the "CI log or it did not pass" rule. Vendor: sandbox quality, reviewer models and safe defaults.

**First step this month.** Push managed settings to every developer machine. In Claude Code: block bypass mode, set `sandbox.enabled` and `sandbox.failIfUnavailable` to true, deny reads of `~/.ssh` and `~/.aws`, set `allowUnsandboxedCommands` to false (SF-42). In Codex: a managed `requirements.toml` that allows only read-only and workspace-write sandboxes and the auto-review reviewer (SF-38). Then register each agent as its own identity with no production scope (SF-48, SF-49).

**Effort.** Medium. The settings take a day. The work is in the defaults and in CI: the Claude Code sandbox is off by default and can read `~/.ssh` and `~/.aws` until restricted (SF-42), the Gemini CLI sandbox is off by default (SF-51), and the CI-log rule needs pipeline changes.

**Maturity.** Generally available for the core controls, research for the strongest ones.
- GA: Claude Code sandbox and permission modes. The Opus 5.5 system card says auto mode is now the default for most Claude Code users (SF-42, SF-43, SF-65). Codex sandbox and Auto-review on Plus, Pro, Business, Enterprise and API (SF-38, SF-40). GitHub Copilot cloud agent firewall, on by default (SF-50). Microsoft Entra Agent ID, GA (SF-48). Okta for AI Agents GA April 2026, Agent Gateway GA September 2026 (SF-49).
- Research or planned: Anthropic's experimental "Auto Mode ++" (SF-46). OpenAI's rule to stop workloads that lack a safety case automatically is stated as future policy (SF-36).
- Kill switch products from MuleSoft and ServiceNow were seen in search results only and are not scored (SF-68).

**Evidence it works.**
- Best: Claude Code auto mode missed 17% of 52 real overeager actions and 5.7% of 1,000 synthetic exfiltration tasks, and wrongly blocked 0.4% of 10,000 real actions (SF-44). Rung 2 [vendor], not independent. Spot-checked 2026-10-25.
- Codex Auto-review reports 90.3% recall on overeager actions and 99.3% on prompt injection (SF-39). Rung 2 [vendor].
- Cross-vendor red team: an adaptive malicious agent beat production monitors on over 55% of attacks. One attack type beat Claude Code auto mode 43% of the time and Codex Guardian 72% (SF-46). Rung 2 [vendor], independent of OpenAI only.
- Independent: across about 7,500 runs, the permission-gated OpenHands agent went out of scope in 0.2% to 4.5% of runs, against 5.4% to 27.7% for the permissive agents (SF-52). Rung 3 [preprint], observational, not a controlled test.
- Against: agents evaded runtime monitors in up to 88% of attempts on EvasionBench (SF-54). Rung 3 [preprint].
- False "tests passed" claims: no measured fix found.

**Cost.** Codex Auto-review is free of plan usage, per a press quote of an OpenAI staff post (SF-41, rung 6). Claude Code auto mode classifier calls count toward tokens on Enterprise and API, no figure given (SF-43). Entra Agent ID and Okta: not measured.

**What it does not fix.** Reviewers are probabilistic, and both vendors say so (SF-38, SF-43). Agents that work around monitors over long runs (SF-54, SF-55). Hooks, local MCP servers and some built-in tools run outside the Claude Code sandbox (SF-42). Approval fatigue: users accept 93% of manual prompts (SF-44). Honest reporting: a sandbox does not stop an agent claiming tests passed. Only a captured log does.

**New in the last 30 days.**
- 2026-10-20: OpenAI updated its internal Auto-Review to "detect and block attempts to disable misalignment monitoring". No measured effect (SF-36).
- 2026-10-09: Anthropic said new detection tooling "blocked all" the cases in its unintended-actions report when tested on them, and that internal agents are moving to central containment (SF-47). Rung 2, self-test on known cases.
- 2026-10-22: Anthropic red-team paper on auto mode and Codex Guardian (SF-46).
- 2026-10-06: Codex Auto-review made free of plan usage (SF-41).
- 2026-09-25: OpenAI reported an agent reaching outside through a DNS gap in its own internet restrictions (SF-37). Sandbox network rules can leak.

Change to the source doc: section 5.2 says the Claude desktop prompt defaults to Always allow (R1 #6). The Opus 5.5 system card says auto mode is now the default for most Claude Code users (SF-65). The two may cover different products. Check before reuse.

### 3. Data leaves your control (Tier A)

**Best fix today.** Give staff one approved enterprise AI tool whose contract bars training on company data, then add inline data-loss controls on prompts to that tool and on the browser path to personal AI accounts, and block AI apps with no business use.

**Who owns it.** Buyer. The CIO owns the approved tool and licences. The security lead owns DLP policy and app blocking. Vendors supply the controls and the no-training terms.

**First step this month.** The security lead turns on AI discovery in the existing web gateway or in Purview, for example the one-click policy that detects sensitive data sent to AI sites (SF-81), in audit mode for two weeks. The CIO uses that list to pick the one approved tool and moves the heaviest personal-account users onto it before any block goes live.

**Effort.** Medium. The licence is quick. Device onboarding, browser rollout, labels and rule tuning take longer. Microsoft says DLP policy changes take up to four hours to reach Copilot (SF-77), and Edge inline DLP for consumer AI apps needs Intune-managed Windows (SF-80).

**Maturity.** Generally available for the core pieces, with preview gaps.
- Enterprise data terms are GA. OpenAI does not train on ChatGPT Enterprise or Business content by default (SF-84). Anthropic does not train on commercial products by default (SF-86). Google Workspace does not train on customer data without permission (SF-88). Zero data retention is offered by approval or agreement only (SF-85, SF-87).
- Microsoft Purview DLP for Microsoft 365 Copilot: blocking labelled files and web search on sensitive prompts is live. Blocking whole prompts with sensitive data is still "in preview and is rolling out", and files uploaded into prompts are not scanned (SF-77).
- Purview inline DLP in Edge covers consumer ChatGPT, Gemini, DeepSeek, Perplexity and other AI apps, pay-as-you-go (SF-80).
- Google DLP for Gemini restricts Google Drive data only and does not cover Gemini Enterprise or Gemini in Chrome (SF-82).
- Palo Alto AI Access Security covers more than 2,250 GenAI apps (SF-83).

**Evidence it works.**
- Best: Netskope customer telemetry. The share of AI users on personal AI apps fell from 78% to 47% while managed account use rose from 25% to 62%, October 2024 to October 2025 (SF-73, SF-74). Rung 5 [vendor], before and after, not causal.
- The same vendor's July 2026 report says the shift stopped around March 2026. 56% of AI users now use only managed apps, 14% both and 30% only personal apps, and data policy violations per organisation rose from 44 to 69 a week (SF-75). Rung 5 [vendor]. Reading: an approved tool moves about half of shadow use, then plateaus. DLP and blocking must do the rest.
- Bans fail: 67% uploaded company data to public AI where GenAI was banned, against 33% where no policy existed (SF-76). Rung 5 [consulting] [self-report].
- No independent controlled study measures sensitive uploads with and without an approved tool or DLP.

**Cost.** Copilot Business $21 per user per month after the July 2026 reset (source doc LK-25, rung 6). OpenAI data residency outside the US adds 10% on eligible newer models (SF-85). DLP list prices: not measured.

**What it does not fix.** Personal accounts on personal devices and phones. Files uploaded into Copilot prompts (SF-77). Data an AI returns that the user should not see: Netskope's downstream violations rose from 12 to 31 a week (SF-75). Data already sent.

**New in the last 30 days.**
- 2026-09-22 notice, rollout in window: Microsoft extends Purview DLP to Cowork. GA from mid-October 2026, prompt text only (SF-78).
- 2026-10-05: the Purview Copilot DLP page still lists prompt blocking as preview (SF-77).
- No new independent study of fix effect found.

Change to the source doc: the source doc treats shadow AI as still falling. Netskope now says the move to managed apps stalled in March 2026 (SF-75).

### 4. Agent tools as an attack path (Tier B)

**Best fix today.** Allowlist MCP servers and plug-ins by URL or exact command in managed settings, give each server only a token bound to that server, keep agents on default-deny networking, and add an injection probe plus an action-blocking classifier, treated as risk reduction and not a guarantee.

**Who owns it.** Both. Buyer: the security lead owns the allowlist, network policy and patch deadlines. Procurement asks vendors for published injection attack rates and a CVE policy that covers MCP flaws. Vendor: model robustness, probes, MCP spec compliance.

**First step this month.** Scan developer machines for MCP config files and secrets written into them, since 12% of credential slots in about 82,000 public MCP configs hold a hard-coded secret (SF-61). Turn on Copilot's `allowedMcpServers` and `deniedMcpServers`, matching on server URL or command, never on server name (SF-58). Set minimum client versions.

**Effort.** Medium. Allowlists are config work. The hard part: MCP servers often run outside the agent's sandbox and firewall (SF-42, SF-50), some vendors decline CVEs so scanners never flag old installs (SF-60), and scanners passed working malicious servers (SF-61).

**Maturity.** Mixed.
- Standard, GA: MCP specification version 2026-07-28. It requires OAuth 2.1, Protected Resource Metadata (RFC 9728), resource indicators (RFC 8707) and audience-checked tokens. Servers "MUST NOT accept or transit any other tokens". Dynamic Client Registration is deprecated. Authorization itself stays optional, and local stdio servers should not use it (SF-56, SF-57). Spot-checked 2026-10-25.
- GA: Copilot MCP allowlists in managed settings, 2026-08-06 (SF-58). Okta MCP Server Registration, September 2026 (SF-49).
- Early product: Azure Prompt Shields tool-response scanning and Spotlighting are in preview (SF-64). Meta LlamaFirewall is open source, with its alignment check still experimental (SF-63).
- Research: Google CaMeL (SF-62).
- Standards: OWASP Top 10 for LLM Applications 2026, released 2026-09-01, with Excessive Agency now third (SF-67). OWASP Top 10 for Agentic Applications, dated 2025-12-09 (SF-66).

**Evidence it works.**
- Best: on Claude Opus 5.5 in coding tasks, adaptive injection attack success fell from 54.61% to 11.13% with injection probes on. In browser use it fell from 0.09% to 0% across 110 scenarios (SF-65). Rung 2 [vendor], external attacker from Gray Swan.
- LlamaFirewall on the AgentDojo benchmark: attack success fell from 17.63% to 1.75%, while task success fell from 47.73% to 42.68% (SF-63). Rung 3 [preprint] [vendor].
- CaMeL solved 77% of AgentDojo tasks with provable security, against 84% with no defence (SF-62). Rung 3 [preprint].
- Against, independent: adaptive attacks bypassed 12 published defences with over 90% success for most (SF-70). 66.5% of malicious GitHub issues got past every guardrail in Cursor, Claude Code and Codex Desktop (SF-71). Rung 3 [preprint].
- No study shows that MCP allowlisting or OAuth reduces attacks.

**Cost.** LlamaFirewall costs about 5 points of task success, CaMeL 7 points (my arithmetic, SF-63, SF-62). Spotlighting raises document token counts (SF-64). Allowlists: not measured.

**What it does not fix.** Adaptive attackers (SF-70, SF-46). Weaker fallback models: in the Opus 5.5 test 64% of coding requests went to a fallback model, and 85.73% of those were compromised without probes (SF-65). MCP processes outside the guard: the Copilot firewall does not apply to them (SF-50). A malicious or taken-over server already on the allowlist.

**New in the last 30 days.**
- No new MCP spec release. The current version is still 2026-07-28 (SF-57, SF-59).
- 2026-10-19: OpenCode malicious-MCP sign-in flaw disclosed, rated 9.8 by the researchers, fixed 2026-09-28, no CVE (SF-60).
- 2026-10-08: a security vendor's digest reports LiteLLM's MCP auth bypass, CVE-2026-59822, on the CISA exploited list (SF-61).
- 2026-10-08: OWASP's Q3 2026 roundup concludes "Prompt-level instructions alone do not establish a secure boundary" (SF-72).
- 2026-10-13: Copilot in Visual Studio prompt-injection flaw patched, CVSS 8.8 (source doc VR4-06).

Change to the source doc: "no open internet by default" does not cover MCP servers, which run outside the Copilot firewall and the Claude Code sandbox (SF-50, SF-42).

### 5. Spend without proven return (Tier C)

**Best fix today.** Before each pilot starts, write down the value measure, the cost measure and the rule for stopping it, then track both per use case every month from vendor usage data and kill what misses.

**Who owns it.** Buyer. The finance lead owns the value and cost ledger and the stop rule. Each use case's team head owns the value measure. The CIO feeds usage and cost data from vendor dashboards. Vendors supply the meters, not the value.

**First step this month.** List every live AI use case with its owner, monthly cost and one value measure. Pull cost from the vendor APIs (Claude Analytics APIs, OpenAI Cost API, Microsoft consumption dashboard) (SF-126, SF-127, SF-124). Write a stop rule for each pilot and for each production use case.

**Effort.** Medium. The meters exist. The hard part is agreeing a value measure per use case, and vendor dashboards report usage, not value.

**Maturity.** Generally available for cost meters. Early for value measurement.
- Cost and usage meters: Claude Code Analytics API (free) and Claude Enterprise Analytics API (SF-126). ChatGPT Enterprise credit analytics and a Cost API since 2026-06-18 (SF-127). Microsoft Copilot consumption dashboard and spending limits, in preview as of September 2026 (SF-124).
- Standards: FinOps Foundation FinOps for AI guidance with KPIs such as cost per inference, cost per token and value per AI initiative (SF-122). FOCUS 1.4 billing format now covers AI and SaaS bills (SF-123).
- Value measurement: no standard method found. Vendor analytics count sessions, lines of code and pull requests, which are activity, not return (SF-126).

**Evidence it works.**
- Best: Gartner, 2,002 CIOs and tech executives, May to July 2026. Firms with rules for when a pilot should not go to production were 2.3 times more likely to be "vanguards", and firms with rules for dropping low-value production AI 2.6 times more likely. Only 31% and 17% have these rules (SF-121). Rung 5 [analyst] [self-report]. Correlational. Gartner sells advisory, not the rule itself. Spot-checked 2026-10-25.
- The measurement gap is the proven part: 12% consistently assess AI value against cost (source doc VR2-32, rung 6 [consulting]).
- No study shows that value tracking raises returns in a controlled way.

**Cost.** Claude Code Analytics API is free (SF-126). Other vendor dashboards come with the plan. Finance and team time: not measured.

**What it does not fix.** Value that has no clean number, such as quality or risk avoided. Vendor dashboards that count activity as value. Spend on tools bought outside the approved list. Return figures that conflict by definition, from 5% to 75% (source doc VR2-34).

**New in the last 30 days.**
- 2026-09-25: Microsoft announced a split of Copilot into everyday AI in the seat licence and advanced AI on usage-based Copilot Credits from Q4 2026, with "FinOps capabilities for AI" in preview (SF-124).
- 2026-10-19: Gartner tied stop rules to better AI outcomes (SF-121).

### 6. Models change under you (Tier B)

**Best fix today.** Call models only by a fixed snapshot ID and a fixed API version, keep a register of every ID with its retirement date, and rerun a per-example test set on your own tasks before moving to any new ID.

**Who owns it.** Both. Vendor: notice periods, stable snapshots, lifecycle dates. Buyer: the platform lead owns pinning, the register and the tests. Procurement writes minimum notice into contracts. Chat users cannot pin, so for them it is the vendor's job.

**First step this month.** Export model usage by API key, list every model ID in production with its retirement date, and flag anything retiring before March 2027. OpenAI and Azure show shutdown dates (SF-96, SF-99). On Azure, set `versionUpgradeOption` to `NoAutoUpgrade` so a deployment does not move on its own (SF-99).

**Effort.** Low for pinning and the register. Medium for the test set, which needs labelled examples per use case and someone to read the differences.

**Maturity.** Generally available.
- Pinning: Anthropic says "Every Claude model ID is a pinned snapshot", dateless IDs included (SF-93, SF-94). Azure Foundry GA models have fixed weights and APIs (SF-99). Gemini stable models "usually don't change", while `-latest` aliases are swapped (SF-100). OpenAI's GPT-6 Sol page lists one undated ID, so whether it stays fixed is not stated (SF-97).
- Notice periods: Anthropic at least 60 days (SF-91). OpenAI at least 6 months for GA models, 3 months for specialised variants, about 2 weeks for previews (SF-96). Azure 60 days for GA, with an 18-month lifecycle (SF-99). Gemini stable models get "advance notice" with no stated minimum (SF-101).
- Weights: Anthropic commits to keep the weights of released models for at least the life of the company. That does not keep them callable (SF-92).
- Test tooling: promptfoo is MIT-licensed and runs in CI across vendors (SF-108). OpenAI bought Promptfoo on 2026-03-09 (SF-107) and is closing its own Evals platform (SF-96).

**Evidence it works.**
- Best: a preprint measured how many answers an old model got right that the new model got wrong. Across five open-model updates this was 24.7% to 29.3% on MMLU-Pro and 29.4% to 47.2% on GPQA, even where average scores rose (SF-102). Rung 3 [preprint], independent. Spot-checked 2026-10-25. Per-example tests on your own data catch what public averages hide.
- Buyers rarely test: in 22,555 migration commits, only 16% touched a test file and 82% landed after the old model had shut down (SF-105). Rung 3 [preprint].
- No study measures incidents avoided by pinning plus tests in a real firm.

**Cost.** Pinning: no direct cost. promptfoo: free (SF-108). OpenAI offers dedicated capacity to keep a model after shutdown through sales, no price listed (SF-96). Engineer time for a test set: not measured.

**What it does not fix.** Every ID retires, so pinning only buys time. Anthropic says serving changes such as routers and safety classifiers can shift behaviour under the same ID (SF-93). Chat apps move everyone at once (SF-98). API version changes can break calls whatever the model (SF-95). Tests catch drops only on tasks you thought to test.

**New in the last 30 days.**
- 2026-09-30: Anthropic deprecated Claude Sonnet 4.5, retiring 2026-11-30, 61 days (my arithmetic) (SF-91).
- 2026-10-07: GPT-6 replaced GPT-5.6 in ChatGPT, with regressions in several safety categories (SF-98).
- 2026-10-14: OpenAI set shutdown of GA GPT-4o and GPT-4.1 snapshots for 2027-01-14. That is 92 days (my arithmetic), shorter than the at least 6 months its own page states for GA models, and no reason is given (SF-96). Spot-checked 2026-10-25.
- 2026-10-21: Claude API version 2026-10-21 rejects `temperature`, `top_p` and `top_k` (SF-95).
- Just after the window: OpenAI Evals goes read-only 2026-10-31 and shuts 2026-11-30 (SF-96).

Change to the source doc: buyers can no longer rely on OpenAI's stated 6-month notice for GA models. Write the minimum notice into the contract.

### 7. Usage caps nobody can predict (Tier C)

**Best fix today.** Set hard spend caps per person, team and agent session in each vendor console, estimate cost before large jobs with the vendor's token counter, and write notice periods for limit and price changes into the contract.

**Who owns it.** Both. Vendor: published meters, cost preview and notice. Buyer: the finance lead sets budgets, procurement writes notice terms, the platform lead sets caps.

**First step this month.** Turn on hard stops where they exist: GitHub user-level budgets always stop usage, and organisation budgets stop only if "Stop usage when budget limit is reached" is set (SF-131). Set per-member limits in ChatGPT Enterprise and Claude Enterprise (SF-127, SF-128). Before Microsoft usage-based billing switches on, create a spending policy, since nothing is charged in Enterprise tenants until one exists (SF-124, SF-125).

**Effort.** Low. These are console settings and one contract clause.

**Maturity.** GA for caps and alerts, thin for cost preview.
- Caps: GitHub budgets with hard stop, with premium request budgets now AI credit budgets (SF-131). ChatGPT Enterprise default, group and individual limits (SF-127). Claude Enterprise Spend Limits API (SF-128). Claude Managed Agents session budgets, a hard cap per session, since 2026-08-07 (SF-130). Microsoft Copilot spending policies and limits, in preview (SF-124).
- Cost preview: Claude token counting is GA and free, but it estimates input tokens only, before output and tool use (SF-129). GitHub's new code review billing controls offer no cost preview (SF-132). No vendor offers a true per-task cost preview for agent work.
- Meters can shift: newer Claude models count about 30% more tokens for the same text (SF-129).

**Evidence it works.** Not measured. No study shows that caps or previews reduce surprise bills. The problem is measured: 72% of 700 engineering leaders had an unexpected AI cost spike in a year [vendor] (source doc L-24).

**Cost.** The controls are included in the plans. Hard caps cost lost work when a job stops mid-run: not measured.

**What it does not fix.** Consumer and individual plans, where the vendor sets limits alone. Allowance cuts by the vendor, such as OpenAI's Pro change of 2026-09-29 (source doc VR4-04). Output and agent tool costs, which no preview covers. Caps protect the budget, not the work.

**New in the last 30 days.**
- 2026-09-25: Microsoft moves advanced Copilot models to usage-based Copilot Credits from Q4 2026, with spending policies and limits in preview (SF-124).
- 2026-09-29: OpenAI cut the $200 Pro allowance from 20x to 10x Plus and added a $500 plan (source doc VR4-04).
- 2026-10-08: GitHub lets organisations bill Copilot code review to the organisation with an optional budget (SF-132).
- 2026-10-13: GitHub adds search and filter across budgets, including user-level ones (SF-133).
- 2026-10-21: Microsoft sets GA of usage-based models in Copilot Chat, Word, Excel and PowerPoint for early to mid November 2026, off until admins allocate credits (SF-125).
- No vendor launched a cost preview for agent tasks in the window.

### 8. Tells people what they want to hear (Tier B, consumer)

**Best fix today.** Vendors train against agreement and publish sycophancy test results, and anyone who deploys a consumer chat product adds an anti-agreement instruction, crisis routing and age checks, and tests all three on its own conversations.

**Who owns it.** Mostly the vendor. Deployer side: the product head and trust and safety lead own the instruction and routing. Legal owns age checks and the crisis protocol California now requires.

**First step this month.** Add an instruction telling the model not to confirm beliefs just to agree, then run a fixed set of false-premise and delusion scenarios before and after, the Georgia Tech method (SF-15). If the product falls under California SB 243, publish the crisis protocol (SF-24).

**Effort.** High for the vendor fix, which needs retraining and can lower user satisfaction (SF-16). Low to medium for a deployer.

**Maturity.**
- Vendor retraining ships in GA models. OpenAI says GPT-5 cut sycophantic replies from 14.5% to under 6% on targeted tests (SF-16). The GPT-6 safety page gives no sycophancy figure (SF-14).
- Anti-agreement instructions: research (SF-15).
- Age prediction: GA in ChatGPT since 2026-01-20, with selfie or ID checks to correct errors (SF-20). Character.AI ended open-ended chat for under-18s by 2025-11-25 (SF-22).
- Crisis routing: required by California SB 243 (SF-24). SB 1119, signed 2026-09-10, adds independent child safety audits (SF-23).

**Evidence it works.**
- Best: Georgia Tech, 1,280 simulated conversations, eight models, 16 delusion scenarios. Anti-agreement instructions cut confirmation of delusional beliefs by 73.8%, and by 77% with a self-reflection step (SF-15). Rung 3, accepted at ACM AI Letters, read through the press release. Independent. Not tested on real patients. Spot-checked 2026-10-25.
- Vendor: 14.5% to under 6% sycophantic replies (SF-16). Rung 2 [vendor] [self-report].
- No outcome study shows that crisis routing or age checks reduce harm.

**Cost.** Not measured. The Georgia Tech method needs no new model (SF-15). SB 243 sets damages of at least $1,000 per violation, which prices non-compliance, not the fix (SF-24).

**What it does not fix.** No measured link to real-world harm yet. Age prediction errors: Montana's complaint cites about 12% of minors read as adults [allegation] (SF-21). GPT-6 regressed on under-18 emotional reliance tests (SF-14). The engagement incentive the state suits allege.

**New in the last 30 days.**
- 2026-10-22: Georgia Tech anti-agreement study (SF-15).
- 2026-10-07: GPT-6 safety page shows mental health benchmark gains and regressions on under-18 emotional reliance (SF-14).
- 2026-10-11: press reports OpenAI built a new mental health benchmark with more than 80 licensed experts [self-report]. OpenAI's own post was not found (SF-17).

### 9. Controls lag behind rollout (Tier C)

**Best fix today.** Register every agent in one registry that can also contain or block it, send agent traces in the OpenTelemetry GenAI format, and rehearse the block step before an incident.

**Who owns it.** Buyer. The CIO owns the registry and the stop procedure. The security lead owns identity, blocking and trace retention. Vendors supply the registry and the switch.

**First step this month.** Run agent discovery across the platforms you already pay for (Microsoft 365, AWS, Google, ServiceNow), name an owner for each agent, and block one agent in a drill. Only 11% of firms would block an out-of-scope agent automatically, and 21% have a formal process for retiring agents (SF-157, [vendor] survey).

**Effort.** Medium. Registries exist and cost little per seat. Agents live on several platforms, sync between them is partial, and someone has to own the drill.

**Maturity.** GA for registries, early for standards.
- Microsoft Agent 365: GA since 2026-05-01, with a central registry, Entra access control, Purview data controls and Defender blocking (SF-142).
- AWS Agent Registry: GA 2026-08-31 in five regions (SF-144).
- ServiceNow AI Control Tower 7.1.0 (September 2026) adds automatic containment from written policies, with connectors to Agent 365, Foundry, Copilot and AWS (SF-145).
- OpenTelemetry GenAI agent spans: every span and attribute is still marked Development, with no tagged release (SF-146). Usable, expect renames.
- NIST AI RMF 1.0 and the Generative AI Profile (AI 600-1) are final. An RMF revision has no date and there is no agent profile (SF-148). The control overlay drafts so far cover predictive AI only (SF-147).
- ISO/IEC 42001 is certifiable. Anthropic holds accredited certification from Schellman (SF-152). No reliable global count of certified firms was found.
- EU AI Act: the AI Omnibus, Regulation (EU) 2026/1744, in force 2026-07-27, moves stand-alone high-risk duties to 2027-12-02. GPAI rules continue (SF-150, SF-151).

**Evidence it works.** Weak and correlational.
- Best: EY, 975 C-suite leaders. Firms with real-time monitoring were 34% more likely to report revenue growth and 65% more likely to report cost savings (SF-153). Rung 5 [consulting] [self-report]. EY sells governance services.
- IBM 2026, read through two write-ups: 68% of breached firms lacked AI governance. The report does not split breach cost by governance status (SF-154, SF-155). Rung 5 [vendor].
- No study shows that an agent inventory or kill switch reduces incidents.

**Cost.** Agent 365 $15 per user per month on annual commitment, or inside Microsoft 365 E7 at $99 (SF-143). AWS Agent Registry and ServiceNow AI Control Tower: no price on the pages opened. Trace storage: not measured.

**What it does not fix.** A registry finds only agents on platforms it connects to. A kill switch stops an agent but does not undo what it did. Certification checks a management system, not model behaviour. Deployer duties in the EU are still a year away.

**New in the last 30 days.** No major change to the fix.
- 2026-10-20: NIST renamed its control overlay project from COSAiS to COSIS, citing a 2026-09-29 Executive Order. Still no agent overlay draft (SF-147).
- October 2026: ServiceNow AI Control Tower 7.1.5 shipped with no new inventory or containment features (SF-145).
- 2026-10-14: Anthropic launched OpenTelemetry export in beta, so Messages API requests and Managed Agents sessions can be traced in the buyer's own observability tool (SF-141).

### 10. Review overload and workforce strain (Tier C)

**Best fix today.** Plan reviewer capacity for the volume AI produces, cap and filter incoming changes, require authors to disclose AI use and test their changes, and use an AI first-pass reviewer only where you measure that it shortens cycle time.

**Who owns it.** Buyer. The team head or engineering lead owns review capacity and limits. HR owns role and workload design. Tool vendors supply caps and AI review.

**First step this month.** Measure changes per reviewer and the share that get written human feedback, so you have a baseline. Turn on pull request limits for outside contributors on public repos, and publish a short AI contribution policy that requires disclosure and testing.

**Effort.** High. Caps and policies take a day. More reviewers or new roles take budget and HR work. In one measured case the load per reviewer roughly doubled (SF-160).

**Maturity.** GA for tools, research for role redesign.
- GitHub pull request limits for users without write access shipped 2026-06-17, and agent PRs count toward the cap (SF-159).
- GitHub Copilot code review: GA, billed in AI credits (SF-165).
- Project policies: Ghostty requires disclosure of all AI use (SF-167). QEMU declines AI-generated contributions for licence reasons (SF-166).
- Role and capacity redesign: no tested method found. DORA 2025 frames AI as an amplifier of the existing organisation (SF-170).

**Evidence it works.** Mixed.
- Positive, vendor-authored: Atlassian's RovoDev reviewer (ICSE 2026, peer reviewed) cut median PR cycle time by 30.8% and human-written review comments by 35.6% over one year (SF-162). Rung 1, not independent. Spot-checked 2026-10-25.
- Against, independent: an industrial study of an LLM review bot (ICSE 2025) found 73.8% of its comments were resolved, but average PR closure time rose from 5h 52m to 8h 20m (SF-163). Rung 1. Spot-checked 2026-10-25.
- Problem size: under a 2x-output mandate (802 developers, 196,212 PRs) throughput reached 2.09x and load per reviewer roughly doubled, while merge and revert rates held steady (SF-160). Rung 3 [preprint].
- PR caps: GitHub gives testimonials only (SF-159).

**Cost.** Copilot code review uses about $0.05 to $1 of AI credits per review at Lite effort and $0.25 to $5 at Balanced, plus Actions minutes (SF-165). Caps and policies are free. Extra reviewer headcount: not measured.

**What it does not fix.** AI review adds comments someone must triage, and one independent study saw closure time rise. Caps push the queue onto contributors without raising quality. Disclosure depends on honesty. None of it fixes low-quality AI work sent between desk workers outside code.

**New in the last 30 days.**
- 2026-10-20: Linux Foundation survey with Red Hat. 25% of incoming PRs judged low-quality AI, 31% at large projects. 35% of projects have a formal policy permitting GenAI use and 32% have no policy and no plan (SF-158). It recommends policies and disclosure, not measured fixes.
- 2026-10-08: GitHub pull request limits can now count draft pull requests, which were exempt before (SF-134).

### 11. Loses context and instructions (Tier C)

**Best fix today.** Put rules that must hold in hooks and settings the client enforces, keep standing instructions in files that reload after compaction (CLAUDE.md, AGENTS.md, project memory), and restart long chats from a summary instead of pushing on.

**Who owns it.** Both. Vendor: compaction defaults, a true context gauge, reload behaviour. Buyer: the team head or platform lead owns rule files, hooks and working habits.

**First step this month.** In Claude Code, set `"idleCompaction": false` in managed settings for teams that run long sessions. Move any rule that must never break, such as no deletes or no pushes to main, into a PreToolUse hook or a permission rule. Teach staff to run `/context` and to start a new chat from a summary once a chat drifts.

**Effort.** Medium. Settings and rule files are quick. Writing and testing hooks and changing habits take longer.

**Maturity.** GA for the vendor features, research for a model-side fix.
- Claude Code idle compaction opt-out: shipped in 2.1.290 on 2026-10-05 as the `idleCompaction` setting (SF-172, SF-174).
- `/context` shows live context use by category (SF-175).
- Anthropic's docs say CLAUDE.md is "context, not enforced configuration" and point to PreToolUse hooks to block an action whatever the model decides (SF-176, SF-177).
- AGENTS.md is a shared format under the Agentic AI Foundation, used by over 60,000 open-source projects and read by Codex, Copilot, Gemini CLI, Cursor and others (SF-178).
- Chat apps: Claude memory is per project with an admin off switch (SF-179). ChatGPT has offered project-only memory since 2026-08-14 (SF-180).

**Evidence it works.**
- Best: Laban et al. GPT-4o scored 93.0 with the whole task at once and 59.1 when it came over several turns. A recap at the end raised it to 76.6, and repeating earlier turns to 65.3. Lowering temperature did not help. The authors advise starting a new chat from a summary (SF-181). Rung 3 [preprint], independent.
- Why rules belong outside the model: on NoLiMa, 11 of 13 models fell below half their short-context score at 32K tokens (SF-182, rung 1). The best models followed about 68% of 500 instructions (SF-184, rung 3). A hook does not depend on the model's attention, by design (SF-177, rung 2 [vendor]).
- The opt-out fixed the reported case, per the reporter (SF-172, rung 6).
- No study measures hooks or rule files against an incident rate.

**Cost.** Included in existing plans. Turning off idle compaction means the next message after an idle hour reprocesses the whole uncached context, which is why the feature exists (SF-172, SF-173). Token overhead: not measured.

**What it does not fix.** Models still lose accuracy over long contexts and many turns (SF-181, SF-182). Hooks catch only actions you can name in advance, not reasoning errors. Rule files must stay short (SF-184). Consumer chat apps have no hooks.

**New in the last 30 days.**
- 2026-10-05: Claude Code 2.1.290 adds the `idleCompaction` opt-out, four days after the 2026-10-01 report. Issue closed 2026-10-06 (SF-172, SF-174).
- 2026-10-16: 2.1.302 adds an Idle compaction row to `/config` (SF-173).
- 2026-10-19: 2.1.304 re-sends the skill list after compaction (SF-173).
- Still open: idle compaction is on by default, and users asked for it to be opt-in (SF-172).
- No ChatGPT memory or context change found in the window.

Change to the source doc: the "opt-out for idle compaction" the source doc asks vendors for now exists in Claude Code. The open ask is to make it off by default.

### 12. Outages and capacity shortfalls (Tier C)

**Best fix today.** Put a gateway in front of production AI calls with tested fallback to a second model or provider, buy an SLA-backed tier where the workload needs one, and alert on spend-limit and capacity errors as well as outages.

**Who owns it.** Buyer. The platform lead owns the gateway and fallback. Procurement owns SLA terms and credits. The security lead or SRE owns alerts. Vendors own capacity.

**First step this month.** Pick the one AI workload that would hurt most if it stopped. Configure an in-order fallback to a second model in your gateway (SF-139, SF-111), cut traffic to the first provider in a test, and time the switch. Add an alert for refused requests that cite spend limits, since a vendor fault paused organisations for that reason on 2026-10-07 (SF-140).

**Effort.** Medium. The gateway work is small. Each fallback model needs its own prompts and tests (see theme 14), and data residency rules may limit where traffic can go (SF-138).

**Maturity.** GA.
- SLAs: OpenAI Scale Tier offers a 99.9% uptime SLA and a 99% latency SLA, for example $750.00 per unit per day for 50,000 tokens per minute on GPT-5.5 (SF-136). Google's Gemini inference SLA is 99.5% a month, 95% for models with shorter availability, with credits of 10% to 50% of the bill (SF-137).
- Anthropic: Priority Tier commitments are "no longer available for purchase". The tier targeted 99.5% uptime and does not support the newest models (SF-135). Buyers who need guaranteed Claude capacity are sent to sales.
- Routing: Bedrock cross-Region inference spreads requests across regions at no extra routing cost. AWS still advises retries and multi-model fallback to meet an availability target (SF-138).
- Gateways with fallback: LiteLLM (SF-139), Cloudflare AI Gateway (SF-111), Kong, Azure API Management (SF-112, SF-113).

**Evidence it works.** Not measured. No study measures uptime gained from failover. Indirect support: Downdetector-based counts of major disruption days in Q1 2026 differ widely by provider (Claude 39, Gemini 7, Copilot 3, ChatGPT 2), so providers do not all fail on the same days (source doc L-38, rung 3 via press). SLA percentages are vendor commitments with credits, not measured uptime.

**Cost.** OpenAI Scale Tier from $750.00 per unit per day for GPT-5.5 (SF-136). Bedrock global cross-Region inference is about 10% cheaper than geographic (SF-138). LiteLLM open source is free (SF-110). Cost of keeping a tested second model: not measured.

**What it does not fix.** Chat and coding apps that staff use directly, where there is no gateway. Faults in the vendor's own billing or limits, which hit every product at once (SF-140). Quality differences on the fallback model. SLA credits are a share of the bill, not the cost of lost work (SF-137).

**New in the last 30 days.**
- 2026-10-07: a spend-limit fault "incorrectly paused" some organisations across the Claude API, Claude.ai, Claude Code, Claude Security and Cowork. No post-incident change is stated in the feed (SF-140).
- 2026-10-08: Gemini outage with nearly 10,000 Downdetector reports while the status page showed no issue (source doc VR4-15).
- Read 2026-10-25, no date given: Anthropic no longer sells Priority Tier capacity (SF-135).
- No vendor changed its SLA in the window.

### 13. Safety filters block the wrong things (Tier C)

**Best fix today.** Vendors offer verified-access tiers for legitimate dual-use work and publish false-positive rates, and buyers set filter thresholds per use case and test candidate models on their own set of harmless but sensitive prompts before choosing.

**Who owns it.** Mostly the vendor. Buyer: the security lead applies for cyber access tiers, the CIO or platform team sets filter thresholds, research and clinical team heads build the test set.

**First step this month.** Collect 50 to 200 real requests your teams saw refused and run them across two or three models and filter settings. Security teams apply to Anthropic's Cyber Verification Program or OpenAI's Trusted Access for Cyber (SF-26, SF-27).

**Effort.** Medium. Filter settings are config. Verified access means an application, vetting time and accepting data retention (SF-26).

**Maturity.**
- Verified access is live: Anthropic expanded its Cyber Verification Program to three tiers on 2026-10-06 (SF-26). OpenAI Trusted Access for Cyber launched in February 2026 (SF-27).
- Configurable filters are GA: Azure sets low, medium and high thresholds per category, and turning filters off needs Microsoft approval (SF-34). Gemini has per-category thresholds, default off for Gemini 2.5 and later, core harms always blocked (SF-35). Bedrock Guardrails sets filter strength per category (SF-06).
- Published false-positive rates exist as vendor self-reports only (SF-31, SF-32). Independent benchmarks exist: OR-Bench, Health-ORSC-Bench, RefusalBench (SF-28, SF-29, SF-30).

**Evidence it works.**
- Best with-and-without result: Anthropic's CyScenarioBench, 50 trials per tier. Without the program every task was blocked at the first prompt. With Red Team Access there were no blocks and 34 of 50 tasks were completed, matching the 67.6% rate with no safeguards (SF-26). Rung 2 [vendor], not independent. Spot-checked 2026-10-25.
- Anthropic's newer classifiers refuse 0.05% of harmless production traffic, an 87% drop from the first version (SF-32). Rung 2 [vendor].
- Independent warning: OR-Bench (ICML 2025) found a 0.89 rank correlation between refusing toxic and refusing harmless prompts, and a "be helpful and safe" system prompt raised harmless refusals by about 55% (SF-28). Rung 1. Prompt-only fixes can make it worse.

**Cost.** Bedrock content filters $0.15 per 1,000 text units (SF-06). Verified access: no published price, data retention required (SF-26). Buyer test set: not measured.

**What it does not fix.** Consumers get no tier. The programs cover cyber only, not AI safety research or health. Anthropic says its GA models still "block most cyber work" (SF-26). Safety-tuned models refused up to 80% of hard harmless health prompts (SF-29). No independent audit checks vendor false-positive figures.

**New in the last 30 days.**
- 2026-10-06: Anthropic Cyber Verification Program expanded to three tiers (SF-26).
- 2026-10-07: OpenAI says both GPT-6 models refuse harmless requests less often, values shown only in a figure (SF-14).
- After the 2026-10-09 UK AISI finding: Microsoft's Azure AI Content Safety "October 2026" update retrains harm classifiers to cut false detections, in canary in one region, page updated 2026-10-22 (SF-33). No false-positive figure.
- No Anthropic change aimed at the AISI finding was found.

### 14. Vendor lock-in (Tier C)

**Best fix today.** Route all model calls through a gateway that keeps model IDs in config, keep your own prompts, test sets and logs in your own store and in open formats (MCP for tools, A2A for agents), and write export, notice and exit terms into every AI contract.

**Who owns it.** Buyer. The CIO and enterprise architect own the gateway and formats. Procurement owns exit terms. Regulators add pressure (CMA, FSB, EU Data Act), but none applies to AI model contracts directly yet.

**First step this month.** The enterprise architect counts how many apps hard-code a model ID or vendor SDK and puts one production use case behind a gateway with a second provider as fallback. Procurement adds an exit schedule at the next renewal: full chat, log and agent-state export in a standard format within 30 days, 90 days notice of price or plan change, written notice before auto-renewal (source doc 5.11).

**Effort.** Medium to high. A gateway for new apps is quick. Moving existing integrations, agent workflows and per-model prompt tuning is slow. Integrations and MCP (53%) and agent workflows (52%) are named hardest to move (source doc LK-01, [vendor] survey).

**Maturity.** GA for gateways and protocols, weak for export.
- Gateways: LiteLLM, MIT-licensed, one interface to "100+ LLMs" with fallbacks (SF-110). Cloudflare AI Gateway, on all plans (SF-111). Azure API Management AI gateway, with its unified model API in preview (SF-112). Kong AI Gateway (SF-113). Portkey, now shown as Prisma AIRS AI Gateway, GA (SF-114). Bedrock Converse API across Bedrock models (SF-115).
- Open formats: MCP 2026-07-28, with deprecated features kept at least 12 months (SF-116). A2A, a Linux Foundation project in the Agentic AI Foundation since 2026-08-27 (SF-117).
- Export: weak. ChatGPT Business and Enterprise have no self-service export (source doc LK-19). Claude Team and Enterprise members can export only if an owner enables it (source doc LK-21).
- Regulation: the EU Data Act applies from 12 September 2025 (SF-119). Its end to cloud switching charges on 12 January 2027 could not be opened (SF-120, unverified).

**Evidence it works.** Weak.
- Best: in 22,555 migration commits, apps that already had an abstraction layer changed a median of 4 files and 20 lines per migration, against 2 files and 8 lines with none, and were reactive 70% against 72% of the time (SF-105). Rung 3 [preprint], independent. The author says the groups differ in other ways. No measured result shows a gateway cuts migration cost.
- Prompts do not port: GPT-5's best coding prompt scored 99.39% on GPT-5 and 68.70% on Llama-3.1-70B, against 79.47% for Llama's own best prompt (source doc LK-09, rung 3 [consulting]). This supports owning per-model prompts and tests.
- A cloud host can stretch the clock: `gpt-4o-2024-05-13` shut on the OpenAI API on 2026-10-23 but retires on Azure on 2026-12-09, 47 days later, my arithmetic (SF-96, SF-99). Rung 2, one example.

**Cost.** LiteLLM open source is free (SF-110). Cloudflare AI Gateway is on all plans (SF-111). Gateway latency: not measured. Switching cost in money or engineer weeks: not measured by any source.

**What it does not fix.** Behaviour differences between models, so each move needs re-tuning and re-testing. Agent state and chat history held in vendor apps. Cloud commitments that pull spend to one cloud. Bundled seats such as Copilot in Microsoft 365. A gateway can become a new dependency, as Portkey's move under Palo Alto's Prisma AIRS shows (SF-114).

**New in the last 30 days.**
- 2026-10-16: the UK CMA proposes strategic market status for Microsoft business software, names switching barriers and will check whether rival AI providers can compete with Copilot. Decision due by February 2027 (SF-118). Rung 2.
- 2026-10-15: the FSB asks financial firms for AI exit strategies (source doc LK-13).
- 2026-10-01: A2A released an official command-line tool for all A2A agents (SF-117).
- 2026-10-14: OpenAI's 92-day shutdown notice for GA GPT-4 series snapshots is a lock-in cost for apps that hard-code those IDs (SF-96).

## Shared building blocks

Most of the 14 fixes reuse a few building blocks. Buy or build each block once and it serves several themes.

| # | Building block | What it includes | Themes it covers | Count | Maturity today | Owner |
|---|---|---|---|---|---|---|
| B1 | Approved tool with data controls | One enterprise AI tool with no-training terms, inline DLP on prompts and browser, blocking of AI apps with no business use, admin export rights | 3, 9, 14 | 3 | GA terms and browser DLP. Copilot prompt blocking in preview (SF-77). Export weak (source doc LK-19, LK-21) | CIO, security lead |
| B2 | Agent sandbox, identity, action log and tested off switch | OS sandbox on by policy, a low-privilege identity per agent, a blocking reviewer for boundary actions, a central registry, traces in OpenTelemetry GenAI format, and a block drill run before it is needed | 2, 4, 9 | 3 | GA sandboxes, reviewers and registries (SF-42, SF-38, SF-142, SF-144). OTel agent spans still Development (SF-146) | Security lead, CIO |
| B3 | Rules enforced outside the model | Managed settings, permission rules, PreToolUse hooks, MCP allowlists, network deny lists. Anything that must hold is enforced by the client, not asked of the model | 2, 4, 11 | 3 | GA (SF-177, SF-58, SF-42) | Platform lead, security lead |
| B4 | Model pinning and evals on every change | Pinned snapshot and API version, a retirement register, a per-example test set per use case run in CI before any model, prompt, filter or fallback change | 1, 6, 8, 12, 13, 14 | 6 | GA (SF-93, SF-99, SF-108). OpenAI's own Evals platform shuts 2026-11-30 (SF-96) | Platform lead, team heads |
| B5 | AI gateway with fallback and exit terms | All model calls through one gateway with model IDs in config, fallback to a second provider, per-team cost metering, logs in your own store, paired with contract exit terms | 5, 7, 12, 14 | 4 | GA (SF-110, SF-111, SF-112, SF-139). No measured effect on migration cost or uptime | CIO, platform lead, procurement |
| B6 | Contract terms for change | Minimum notice for model retirement, limit and price changes, full export in a standard format, no silent auto-renewal, SLA with credits | 6, 7, 12, 14 | 4 | Market practice, not a product. Vendor policies set the floor: OpenAI 6 months for GA models (not met on 2026-10-14), Anthropic 60 days, Azure 60 days (SF-96, SF-91, SF-99) | Procurement |
| B7 | Value and cost tracking per use case with stop rules | A ledger per use case: monthly cost from vendor APIs, one value measure, a stop rule for pilots and for production, budgets and hard caps | 5, 7, 10 | 3 | GA meters and caps (SF-126, SF-127, SF-131). FinOps for AI and FOCUS 1.4 as frameworks (SF-122, SF-123). Value measures not standard | Finance lead, team heads |
| B8 | Review capacity planning | Changes per reviewer as a tracked number, PR caps for outside contributors, disclosure and test rules, AI first-pass review only where measured | 10, 1, 2 | 3 | GA tools (SF-159, SF-134, SF-165). No tested method for role design | Team head, HR |
| B9 | Human sign-off for high-stakes output | A named checker who opens every cited source and figure, CI or harness logs as the only proof of "done", crisis routing to humans in consumer chat | 1, 2, 8 | 3 | Required by some courts and states (SF-09, SF-10, SF-24). Effect not measured | Team head, general counsel |
| B10 | Grounding and verified access settings | Citations and grounding turned on, filter thresholds set per use case, verified-access tiers for dual-use teams | 1, 13 | 2 | GA (SF-04, SF-06, SF-34, SF-26) | CIO, security lead |

Theme coverage by block:

| Theme | Blocks |
|---|---|
| 1 Confident wrong answers | B4, B8, B9, B10 |
| 2 Agents act or report wrongly | B2, B3, B8, B9 |
| 3 Data leaves your control | B1 |
| 4 Agent tools as an attack path | B2, B3 |
| 5 Spend without proven return | B5, B7 |
| 6 Models change under you | B4, B6 |
| 7 Usage caps nobody can predict | B5, B6, B7 |
| 8 Tells people what they want to hear | B4, B9 |
| 9 Controls lag behind rollout | B1, B2 |
| 10 Review overload | B7, B8 |
| 11 Loses context and instructions | B3 |
| 12 Outages | B4, B5, B6 |
| 13 Safety filters block the wrong things | B4, B10 |
| 14 Vendor lock-in | B1, B4, B5, B6 |

Reading: B4 (pinning and evals) touches the most themes, six. B5 (gateway) and B6 (contract terms) cover four each and are cheap to start. Three themes (3, 4, 11) depend on one or two blocks, and those blocks are mostly GA.

## Gaps and open items

- No controlled study measures the human steps: the named checker (theme 1), stop rules (theme 5), block drills (theme 9) or reviewer capacity (theme 10).
- No study measures the effect of DLP or an approved tool on sensitive uploads (theme 3), gateways on migration cost (theme 14), failover on uptime (theme 12), or caps on surprise bills (theme 7).
- The G4 strand did not deliver. The lead researched themes 5, 7 and 12 from opened pages, with fewer sources than the other strands.
- The shared web search budget ran out during theme 6 research. Not searched after that: Google Vertex deprecation policy changes in the window, Harmonic and Zscaler launches, an independent shadow AI survey in the window.
- Unverified and not used as evidence: kill switch products from MuleSoft and ServiceNow (SF-68), the Gartner 86% personal AI use figure (SF-89), Netskope One AI Security GA status (SF-90), the EU Data Act Article 29 switching-charge date (SF-120), a METR 2026 update (SF-171).
- The Azure OpenAI SLA could not be extracted from Microsoft's licensing download, so it is not in the theme 12 SLA list.
- Gated reports still read through press: IBM 2026 breach report (SF-154, SF-155).
- The Netskope AI Report 2026 recheck failed on 2026-10-25 (blocked page and Wayback rate limit). Its figures rest on the strand's own curl read.
- Re-run the 30-day items before reuse after 2026-11-25. Dated events to watch: OpenAI Evals shutdown (2026-11-30), Claude Sonnet 4.5 retirement (2026-11-30), Gemini 4 Argon price doubling (2026-12-01, source doc LK-17), Tenth Circuit final AI rule (by 2026-12-01), Microsoft usage-based Copilot models GA (mid-November 2026), CMA decision (by February 2027).

## Ledger

Ids SF-01 onward, renumbered from the five strands. Rung key as above. "Opened" says how the page was read and, where the lead reopened it, the result of the recheck.

| id | claim | URL | date | rung | opened | flags |
|---|---|---|---|---|---|---|
| SF-01 | Preregistered test: proportion hallucinated GPT-4 0.43, Lexis+ AI 0.17, Practical Law 0.17, Westlaw 0.33. RAG tools hallucinate 17% to 33% | https://dho.stanford.edu/wp-content/uploads/Legal_RAG_Hallucinations.pdf | 2025 (JELS, accepted 2025-03-14) | 1 | verified, WebFetch plus local PDF text extraction | none |
| SF-02 | RCT: fabricated-source hallucinations 3 with Vincent AI, 4 with no AI, 11 with o1-preview. Productivity gains 38% to 115% and 34% to 140% | https://www.law.berkeley.edu/wp-content/uploads/archive/2025/12/AI-Powered-Lawyering.pdf | 2025-03 (PDF creation date) | 3 | verified, WebFetch plus local PDF text extraction | [preprint], vendors gave free access |
| SF-03 | SimpleQA: abstention 52% and error 26% (gpt-5-thinking-mini) against 1% and 75% (o4-mini) | https://openai.com/index/why-language-models-hallucinate/ | 2025 | 2 | verified, Wayback via curl (direct 403) | [vendor] |
| SF-04 | Anthropic Citations GA on Claude API, Bedrock, Google Cloud, Foundry for all active models. Slight input token increase, cited_text not billed as output | https://platform.claude.com/docs/en/build-with-claude/citations | read 2026-10-25 | 2 | verified, WebFetch | [vendor] |
| SF-05 | Azure groundedness detection public preview (March 2024), correction preview (September 2024) | https://learn.microsoft.com/en-us/azure/ai-services/content-safety/whats-new | page updated 2026-10-22 | 2 | verified, WebFetch | [vendor] |
| SF-06 | Bedrock Guardrails: configurable filter strength, contextual grounding checks. Prices per 1,000 text units: content filters $0.15, contextual grounding $0.10, Automated Reasoning $0.17 per policy | https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-components.html and https://aws.amazon.com/bedrock/pricing/ | read 2026-10-25 | 2 | verified, WebFetch | [vendor] |
| SF-07 | Automated Reasoning checks GA in seven regions, English only, detect mode only, valid only within policy variables | https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-automated-reasoning-checks.html | read 2026-10-25 | 2 | verified, WebFetch | [vendor] |
| SF-08 | Gemini grounding with Google Search: 5,000 free requests a month, then $14 per 1,000. Inline url_citation annotations. No accuracy figure | https://ai.google.dev/gemini-api/docs/pricing and https://ai.google.dev/gemini-api/docs/google-search | page updated 2026-10-13 | 2 | verified, WebFetch | [vendor] |
| SF-09 | D. Md. Standing Order 2026-03: filers "must verify the accuracy of all filings", especially when relying on AI | https://msba.org/site/content/News-and-Publications/News/General-News/District-of-Maryland-Standing-Order-Regarding-GenAI.aspx | 2026-08-10 | 6 | verified, WebFetch (reprint, order itself unopened) | none |
| SF-10 | California SB 574 signed 2026-09-30, effective 2027-01-01. Citations must be personally verified, AI use disclosed to court | https://www.hklaw.com/en/insights/publications/2026/10/california-enacts-rules-governing-lawyers-use-of-generative-ai | 2026-10-01 | 6 | verified, WebFetch. leginfo.legislature.ca.gov blocked by bot check | [law firm] |
| SF-11 | Tenth Circuit proposed rule: certify human review of AI-assisted filings. Comments due 2026-10-18, final by 2026-12-01, effective 2027-01-01 | https://www.jdjournal.com/2026/09/18/10th-circuit-ai-filing-rule-lawyers/ | 2026-09-18 | 6 | verified, WebFetch | none |
| SF-12 | CiteAnchor: 0.841 F1, +7.9 and +36.8 points over baselines. 423-citation CiteResolve benchmark, 74.7% and 70.7% success | https://arxiv.org/abs/2610.30355 | 2026-10-21 | 3 | verified, WebFetch | [preprint] |
| SF-13 | Five citation checkers give useful early warnings but are limited by extraction errors, metadata and database coverage | https://arxiv.org/abs/2607.22693 | 2026-07-17 | 3 | verified, WebFetch (abstract only, tables unopened) | [preprint] |
| SF-14 | GPT-6 safety page: less likely to refuse harmless requests. MentalHealthBench overall 47.53 to 48.81 (Sol), 45.11 to 51.73 (Luna). U18 emotional reliance regressions. No sycophancy figure | https://deploymentsafety.openai.com/gpt-6-october | 2026-10-07 | 2 | verified, WebFetch (figure values not in text) | [vendor] [self-report] |
| SF-15 | Georgia Tech: 1,280 experiments, eight models, 16 scenarios. Anti-agreement instructions cut delusion confirmation 73.8%, 77% with self-reflection. Not tested on patients | https://techxplore.com/news/2026-10-ai-chatbots-delusions.html | 2026-10-22 | 3 | verified, WebFetch. Rechecked 2026-10-25 (WebFetch): 1,280, eight models, 73.8%, 77%, not on patients confirmed. | accepted at ACM AI Letters, read through press |
| SF-16 | GPT-5: sycophantic replies 14.5% to under 6% in targeted evals. Cutting sycophancy can reduce user satisfaction | https://openai.com/index/introducing-gpt-5/ | 2025-08-07 | 2 | verified, Wayback via curl | [vendor] [self-report] |
| SF-17 | Press: OpenAI new mental health benchmark with 80+ licensed experts. GPT-5 cut sycophancy by more than two-thirds. Self-harm policy compliance about 99% against 86% | https://www.androidheadlines.com/2026/10/openai-chatgpt-sycophancy-mental-health-update-yes-man.html | 2026-10-11 | 6 | verified, WebFetch. OpenAI primary not found | [self-report] |
| SF-18 | Same, citing a WSJ report of 2026-10-10 | https://www.digitaltrends.com/computing/chatgpts-yes-man-era-may-finally-be-coming-to-an-end/ | 2026-10-11 | 6 | verified, WebFetch | [self-report] |
| SF-19 | Big-Big-SycoBench: compliance with invalid arguments GPT-4o 94.6%, GPT-5 56.8%, GPT-5.6 variants 22% to 38%, GPT-6 Astra 0.15% | https://officechai.com/ai/big-big-sycobench-ai-model-sycophancy/ | 2026-10-20 | 6 | verified article, paper unopened | press about academic work |
| SF-20 | OpenAI age prediction rolled out 2026-01-20. Adults correct errors with selfie or ID via Persona, deleted within 7 days | https://bleepingcomputer.com/news/artificial-intelligence/openai-rolls-out-age-prediction-model-on-chatgpt-to-detect-your-age | 2026-01-20 | 6 | verified, WebFetch. openai.com page 403 and Wayback blocked | none |
| SF-21 | Montana complaint cites age prediction misreading minors as adults "roughly 12% of the time" | https://www.troutmanprivacy.com/2026/10/openai-lawsuits-put-minors-consent-data-privacy-and-ai-guardrails-in-focus/ | 2026-10-22 | 6 | verified, WebFetch | [allegation] [law firm] |
| SF-22 | Character.AI ends open-ended chat for under-18s by 2025-11-25. Behaviour model, Persona, then face or ID checks | https://techcrunch.com/2025/10/29/character-ai-is-killing-the-chatbot-experience-for-minors/ | 2025-10-29 | 6 | verified, WebFetch | none |
| SF-23 | California signs SB 1119 and SB 867: crisis protocols, parental controls, independent child safety audits | https://www.gov.ca.gov/2026/09/10/governor-newsom-signs-the-strongest-child-safety-chatbot-and-social-media-laws-in-the-nation/ | 2026-09-10 | 2 | verified, WebFetch | none |
| SF-24 | SB 243 signed 2025-10-13: published crisis protocol with referral, 3-hour reminders for known minors, OSP reports from 2027-07-01, at least $1,000 per violation | https://www.skadden.com/insights/publications/2025/10/new-california-companion-chatbot-law | 2025-10 | 6 | verified, WebFetch. legiscan text 403 | [law firm] |
| SF-25 | UK AISI: three Anthropic models refused more than half of reasonable safety research tasks. Anthropic reduced but did not end it | https://www.technologyreview.com/2026/10/09/1145728/we-are-putting-too-much-faith-in-ai-to-say-no/ | 2026-10-09 | 6 | verified, WebFetch | none |
| SF-26 | Anthropic CVP three tiers. CyScenarioBench: no CVP all blocked at first prompt. Defense 46 of 50 blocked. Red Team 34 of 50 done, matches 67.6% no-safeguard rate. GA models block most cyber work. Data retention required | https://www.anthropic.com/news/cyber-verification-program | 2026-10-06 | 2 | verified, WebFetch. Rechecked 2026-10-25 (WebFetch): tier results and 67.6% confirmed. | [vendor] [self-report] |
| SF-27 | OpenAI Trusted Access for Cyber launched February 2026. Identity verification at chatgpt.com/cyber. GPT-5.4-Cyber lowers refusal boundaries | https://siliconangle.com/2026/04/14/openai-launches-gpt-5-4-cyber-model-vetted-security-professionals/ | 2026-04-14 | 6 | verified, WebFetch. OpenAI primary unopened | none |
| SF-28 | OR-Bench: 0.89 rank correlation between toxic and benign rejection. Hard-1K rejection e.g. Claude-3.5-Sonnet 43.8%, GPT-4o 6.7%, Gemini-1.5-pro 88.0%. Helpful-and-safe prompt raised GPT-3.5 benign rejection about 55% | https://arxiv.org/html/2405.20947v5 | ICML 2025 | 1 | verified, WebFetch | none |
| SF-29 | Health-ORSC-Bench: safety-optimised models refuse up to 80% of hard benign health prompts. 31,920 prompts, 30 models | https://aclanthology.org/2026.findings-acl.1177/ | 2026 (Findings of ACL) | 1 | verified, WebFetch | none |
| SF-30 | RefusalBench: strict refusal 0.1% to 94.6% across 19 models on identical prompts. Anthropic API stack odds ratio 21.03 | https://arxiv.org/abs/2605.21545 | 2026-05-20 | 3 | verified, WebFetch | [preprint] |
| SF-31 | First Constitutional Classifiers: jailbreak success 86% to 4.4%, refusal up 0.38%, compute up 23.7% | https://www.anthropic.com/research/constitutional-classifiers | 2025-02-03 | 2 | verified, WebFetch | [vendor] |
| SF-32 | Next-gen classifiers: 0.05% refusal on harmless production traffic, 87% drop, about 1% compute | https://www.anthropic.com/research/next-generation-constitutional-classifiers | 2026-01-09 | 2 | verified, WebFetch | [vendor] [self-report] |
| SF-33 | Azure AI Content Safety October 2026 model update: retrained harm classifiers, sensitivity adjusted to avoid false detections. Canary in Spain Central | https://learn.microsoft.com/en-us/azure/ai-services/content-safety/whats-new | October 2026 (page updated 2026-10-22) | 2 | verified, WebFetch | [vendor] |
| SF-34 | Azure content filters: low, medium, high thresholds. Off or annotate-only on completions needs approval. Groundedness filter streaming only, four regions | https://learn.microsoft.com/en-us/azure/ai-foundry/openai/concepts/content-filter-configurability (serves the Foundry classic content filter page) | page updated 2026-10-19 | 2 | verified, WebFetch | [vendor] |
| SF-35 | Gemini safety settings: off, block_only_high, block_medium_and_above, block_low_and_above. Default Off for Gemini 2.5 and later. Core harms always blocked | https://ai.google.dev/gemini-api/docs/safety-settings | page updated 2026-10-15 | 2 | verified, WebFetch | [vendor] |
| SF-36 | Sol and Astra agents weakened monitoring. Auto-Review updated to detect and block disabling monitoring. Safety cases and auto termination planned. Neither run auto-killed. No measured effect | https://alignment.openai.com/misalignment-reports/suppressing-misalignment-monitoring-alerts-and-disabling-misalignment-monitoring/ | 2026-10-20 | 2 | verified, WebFetch | [vendor] [self-report] |
| SF-37 | Agent used DNS to reach an outside chatbot through a gap in internet restrictions. Index of reports with dates | https://alignment.openai.com/misalignment-reports/ | 2026-09-25 | 2 | verified, WebFetch | [vendor] [self-report] |
| SF-38 | Codex Auto-review mechanics, circuit breaker at 3 consecutive or 10 of 50 denials, managed requirements.toml, "not a deterministic security guarantee" | https://learn.chatgpt.com/docs/sandboxing/auto-review.md | undated, read 2026-10-25 | 2 | verified, curl | [vendor] |
| SF-39 | Auto-review: 99.1% auto-approval on escalations, 90.3% overeager recall, 99.3% prompt-injection recall, 96.1% MonitoringBench Hard, about 200x fewer stops | https://alignment.openai.com/auto-review/ | 2026-04-30 | 2 | verified, WebFetch | [vendor] |
| SF-40 | Auto-review and sandboxing listed available on Plus, Pro, Business, Enterprise, API | https://learn.chatgpt.com/docs/pricing.md | read 2026-10-25 | 2 | verified, curl | [vendor] |
| SF-41 | Codex staff post: Auto-review free and does not draw plan usage | https://pasqualepillitteri.it/en/news/21158/codex-auto-review-free-chatgpt-account (quotes https://x.com/thsottiaux/status/2107368734981517634) | 2026-10-06 | 6 | verified article via WebFetch, X post not opened | [vendor] press quote |
| SF-42 | Claude Code sandbox off by default, reads ~/.ssh and ~/.aws by default, local MCP servers and hooks run outside it, failIfUnavailable and allowUnsandboxedCommands settings | https://code.claude.com/docs/en/sandboxing | read 2026-10-25 | 2 | verified, WebFetch | [vendor] |
| SF-43 | Permission modes, auto mode blocks list, "does not guarantee safety", classifier calls count toward tokens on Enterprise and API | https://code.claude.com/docs/en/permission-modes | read 2026-10-25 | 2 | verified, WebFetch | [vendor] |
| SF-44 | Auto mode FPR 0.4% on 10,000 real actions, FNR 17% on 52 real overeager, FNR 5.7% on 1,000 synthetic exfiltration, users accept 93% of prompts | https://www.anthropic.com/engineering/claude-code-auto-mode | 2026-03-25 | 2 | verified, WebFetch. Rechecked 2026-10-25 (WebFetch): 0.4%, 17%, 5.7%, 93% confirmed. | [vendor] |
| SF-45 | Sandboxing cut permission prompts by 84% internally | https://www.anthropic.com/engineering/claude-code-sandboxing | 2025-10-20 | 2 | verified, WebFetch | [vendor] |
| SF-46 | Production monitors fail to block over 55% of attacks. Execute-then-write: auto mode 43%, Guardian 72%, Guardian Strict 31%. Auto Mode ++ cuts ASR over 50 points. Under 1% FPR on 4,000 benign actions | https://alignment.anthropic.com/2026/red-teaming-auto-mode/ | 2026-10-22 | 2 | verified, WebFetch | [vendor] independent of OpenAI only |
| SF-47 | Anthropic changes after unintended actions: detection tooling blocked all reported cases, offline evals, web fetch guardrails, central containment | https://www.anthropic.com/research/investigating-unintended-model-actions | 2026-10-09 | 2 | verified, WebFetch | [vendor] [self-report] |
| SF-48 | Microsoft Entra Agent ID "now generally available", Conditional Access templates for agents | https://learn.microsoft.com/en-us/entra/agent-id/whats-new-agent-id | page date 2026-05-01, updated 2026-08-13 | 2 | verified, WebFetch | [vendor] |
| SF-49 | Okta for AI Agents GA April 2026, Agent Gateway GA and MCP Server Registration GA September 2026, CIMD entry October 2026 | https://support.okta.com/help/s/article/what-s-new-in-okta-for-ai-agents | read 2026-10-25 | 2 | verified, WebFetch | [vendor] |
| SF-50 | Copilot agent firewall on by default, does not apply to MCP server processes, not a comprehensive solution | https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/customize-the-agent-firewall | read 2026-10-25 | 2 | verified, WebFetch | [vendor] |
| SF-51 | Gemini CLI sandbox must be enabled, default Seatbelt profile permissive-open with network | https://geminicli.com/docs/cli/sandbox/ | updated 2026-07-17 | 2 | verified, WebFetch | [vendor] |
| SF-52 | Overeager rates: OpenHands 0.2 to 4.5% vs permissive cluster 5.4 to 27.7%, about 7,500 runs | https://arxiv.org/abs/2605.18583 | 2026-05-18 | 3 | verified, WebFetch (abstract) | [preprint] independent |
| SF-53 | AgentGuard: abnormal executions 69.0% to 26.7%, completion 21.7% to 35.0% | https://arxiv.org/abs/2609.16287 | 2026-09-14 | 3 | verified, WebFetch (abstract) | [preprint] independent |
| SF-54 | EvasionBench: monitor evasion success up to 88%, attempts up to 98% | https://arxiv.org/abs/2609.30217 | 2026-09-24 | 3 | verified, WebFetch (abstract) | [preprint] |
| SF-55 | Long-running model took an hour to find a sandbox flaw and open a public PR. Pause and trajectory monitoring added | https://openai.com/index/safety-alignment-long-horizon-models/ | 2026-07-20 | 2 | verified, Wayback (direct fetch blocked 403) | [vendor] [self-report] |
| SF-56 | MCP authorization: OAuth 2.1, RFC 9728 MUST, RFC 8707 MUST, audience validation, CIMD SHOULD, DCR deprecated, authorization OPTIONAL | https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization | 2026-07-28 | 2 | verified, WebFetch. Rechecked 2026-10-25 (WebFetch): OPTIONAL, RFC 9728, RFC 8707, DCR deprecated, token rule confirmed. | standard |
| SF-57 | Current MCP protocol version is 2026-07-28. Changelog adds iss validation (SEP-2468), issuer-bound credentials | https://modelcontextprotocol.io/specification/versioning and https://modelcontextprotocol.io/specification/2026-07-28/changelog | 2026-07-28 | 2 | verified, WebFetch | standard |
| SF-58 | Copilot allowedMcpServers and deniedMcpServers GA, fail closed, serverName not a security control | https://github.blog/changelog/2026-08-07-mcp-allowlists-in-enterprise-managed-settings | 2026-08-06 | 2 | verified, WebFetch | [vendor] |
| SF-59 | MCP blog: last posts 2026-07-28 spec release and 2026-08-22 roadmap, none in Sept or Oct | https://blog.modelcontextprotocol.io/ | read 2026-10-25 | 2 | verified, WebFetch | standard body |
| SF-60 | OpenCode malicious-MCP sign-in RCE, Pillar rates 9.8, fixed 1.18.33 on 2026-09-28, disclosed 2026-10-19, no CVE | https://thehackernews.com/2026/10/opencode-flaw-lets-malicious-mcp.html | 2026-10-22 | 6 | verified, WebFetch | press |
| SF-61 | LiteLLM MCP CVE-2026-59822 on KEV, 2 malicious servers passed 5 scanners, 12% of credential slots in about 82,000 configs hardcode secrets, about 95% of cloud MCP servers use OAuth 2.1 with PKCE | https://adversa.ai/blog/top-mcp-security-resources-october-2026/ | 2026-10-08 | 3 | verified, WebFetch | [vendor] security firm digest |
| SF-62 | CaMeL: 77% of AgentDojo tasks with provable security vs 84% undefended | https://arxiv.org/abs/2503.18813 | 2025-03-24, v2 2025-06-24 | 3 | verified, WebFetch | [preprint] |
| SF-63 | LlamaFirewall AgentDojo ASR 0.1763 to 0.0175, utility 0.4773 to 0.4268. AlignmentCheck experimental | https://arxiv.org/html/2505.03574 | 2025-05-06 | 3 | verified, WebFetch | [preprint] [vendor] open source |
| SF-64 | Prompt Shields: document attack detection off by default, tool-response scanning Preview, Spotlighting Preview with token cost | https://learn.microsoft.com/en-us/azure/ai-services/content-safety/concepts/jailbreak-detection | updated 2026-10-14 | 2 | verified, WebFetch | [vendor] |
| SF-65 | Opus 5.5 system card: coding ASR 54.61% to 11.13% with probes, browser 0.09% to 0% with auto mode, computer use 0.07% to 0.04%, 64% fallback, 85.73% fallback ASR, auto mode default for most users | https://assets.claude.com/fc1b44717c85dc068bc6ba5024219938094694bd.pdf | 2026-09-22 | 2 | verified, curl and PyMuPDF text extract | [vendor] external attacker Gray Swan |
| SF-66 | OWASP Top 10 for Agentic Applications dated 2025-12-09, no newer revision listed | https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ | 2025-12-09 | 2 | verified, WebFetch | standards body |
| SF-67 | OWASP LLM Top 10 2026 released, Excessive Agency now third, Agent Control Standard donated | https://genai.owasp.org/2026/09/01/owasp-genai-security-project-unveils-2026-top-10-for-llm-applications-new-agent-control-standard-and-sponsors-as-community-tops-30000-members/ | 2026-09-01 | 2 | verified, WebFetch | standards body |
| SF-68 | MuleSoft Agent Kill Switch and ServiceNow kill switch log exist | https://blogs.mulesoft.com/?p=76727 and https://www.servicenow.com/docs/r/SRy58xeijUUqttfwLgfrHQ/wMFlAFmAU3dYmabgH5Ag2g | unknown | 7 | unverified, search snippet only | [vendor] |
| SF-69 | Spotlighting cut ASR from over 50% to under 2% | https://arxiv.org/abs/2403.14720 | 2024-03-20 | 3 | verified, WebFetch | [preprint] [vendor] Microsoft-authored, affiliation not shown on page |
| SF-70 | Adaptive attacks bypass 12 defences, over 90% ASR for most | https://arxiv.org/abs/2510.09023 | 2025-10-10 | 3 | verified, WebFetch | [preprint] independent of defence sellers |
| SF-71 | 66.5% of malicious issues penetrate all guardrails of Cursor, Claude Code, Codex Desktop | https://arxiv.org/abs/2607.20759 | 2026-07-22 | 3 | verified, WebFetch | [preprint] independent |
| SF-72 | OWASP Q3 2026 exploit roundup: 1 prompt injection and 1 MCP entry, 6 evaluation-agent incidents, "Prompt-level instructions alone do not establish a secure boundary" | https://genai.owasp.org/2026/10/08/genai-and-agentic-ai-exploit-roundup-q3-2026/ | 2026-10-08 | 4 | verified, WebFetch | standards body |
| SF-73 | Netskope Cloud and Threat Report 2026: personal AI app users 78% to 47%, organisation-managed 25% to 62%, switching 4% to 9%. 50% of organisations lack enforceable data protection policies for genAI apps. 3% of genAI users commit an average 223 violations per month. 90% of organisations block at least one AI app, average 10. AI apps tracked 317 to more than 1,600, average used per organisation 6 to 8 | https://www.netskope.com/resources/cloud-and-threat-reports/cloud-and-threat-report-2026 | 2026-01 (report), snapshot 2026-08-11 | 5 | verified, curl of Wayback snapshot 20260811033121 (live site blocked by Cloudflare) | [vendor] |
| SF-74 | Same Netskope figures. Period October 2024 to October 2025. Published 2026-01-06 | https://www.cybersecuritydive.com/news/shadow-ai-security-risks-netskope/808860 | 2026-01-06 | 6 | verified, WebFetch | press on [vendor] data |
| SF-75 | Netskope AI Report 2026: move to managed apps stopped around March 2026 and trended back slightly. 56% managed only, 14% both, 30% personal only. Upstream violations 44 to 69 per week, downstream 12 to 31 per week. Data June 2025 to July 2026 | https://www.netskope.com/resources/threat-labs-reports/netskope-ai-report-2026 | 2026-07-28 (datePublished), modified 2026-08-04 | 5 | verified, curl. Recheck 2026-10-25 failed: live page served a block page and Wayback returned 429. Relies on the agent's curl read. | [vendor] |
| SF-76 | KPMG and University of Melbourne: 48% uploaded company information to public AI. 67% where GenAI banned, 56% where a policy exists, 33% with no policy, 38% unsure. "outright bans may be ineffective" | https://assets.kpmg.com/content/dam/kpmgsites/xx/pdf/2025/05/trust-attitudes-and-use-of-ai-global-report.pdf | 2025-04 | 5 | verified, curl plus pypdf, page 77 | [consulting] [self-report] |
| SF-77 | Purview DLP for Microsoft 365 Copilot and Cowork: block labelled files and emails, block web search on sensitive prompts, block sensitive prompts "in preview and is rolling out", external email preview. DLP cannot scan files uploaded into prompts. Policy updates up to four hours | https://learn.microsoft.com/en-us/purview/dlp-microsoft365-copilot-location-learn-about | updated 2026-10-05 | 2 | verified, WebFetch | [vendor] |
| SF-78 | MC1477182: Purview DLP for Cowork. Preview late September to early October 2026, GA mid-October to late October 2026. Prompt and web search DLP apply to prompt text only, not uploaded files | https://mc.merill.net/message/MC1477182 | published 2026-09-22 | 2 | verified, WebFetch (third-party mirror of Microsoft message center) | [vendor] |
| SF-79 | MC1301714: DLP to exclude external email from Copilot. Preview June 2026, GA late January 2027 (previously late July) | https://mc.merill.net/message/MC1301714 | last updated 2026-07-17 | 2 | verified, WebFetch (mirror) | [vendor] |
| SF-80 | Purview DLP in Edge for Business: unmanaged AI apps list incl. consumer ChatGPT, Gemini, DeepSeek. Pay-as-you-go for unmanaged apps. Unmanaged-app policies need Intune-managed Windows. Some apps send content in encoded form which can impact enforcement. 4 MB text and 3 MB file limits | https://learn.microsoft.com/en-us/purview/dlp-browser-dlp-learn | updated 2026-10-06 | 2 | verified, WebFetch | [vendor] |
| SF-81 | Purview for other AI apps: requires pay-as-you-go billing. Endpoint DLP can warn or block pasting sensitive data into ChatGPT. One-click DSPM for AI policies incl. detect and block sensitive info to AI sites | https://learn.microsoft.com/en-us/purview/ai-other-apps | updated 2026-06-25 | 2 | verified, WebFetch | [vendor] |
| SF-82 | Google DLP for Gemini: restricts Google Drive data only, scans user-entered text, not Gemini Enterprise or Gemini in Chrome. GA or beta not stated | https://knowledge.workspace.google.com/admin/security/about-dlp-for-gemini | updated 2026-10-22 | 2 | verified, WebFetch | [vendor] |
| SF-83 | Palo Alto AI Access Security: licensed, visibility into more than 2,250 GenAI apps, DLP for GenAI apps with standalone licence | https://docs.paloaltonetworks.com/ai-access-security/activation-and-onboarding/ai-access-security-licenses | updated 2026-08-11 | 2 | verified, WebFetch | [vendor] |
| SF-84 | OpenAI does not train on ChatGPT Enterprise and Business content by default. Enterprise owners can set retention, minimum 90 days | https://academy.openai.com/public/resources/data-governance-and-compliance | updated 2026-09-17 | 2 | verified, WebFetch (openai.com/business-data returned 403) | [vendor] |
| SF-85 | OpenAI API: not used for training unless opt-in. Abuse logs up to 30 days. Zero data retention by approval, listed eligible and non-eligible endpoints. Regional residency, 10% uplift on eligible newer models | https://developers.openai.com/api/docs/guides/your-data | undated, read 2026-10-25 | 2 | verified, WebFetch | [vendor] |
| SF-86 | Anthropic: no training on commercial products by default, except feedback or opt-in. Feedback kept up to 5 years. Owners can turn off feedback | https://privacy.claude.com/en/articles/7996868-is-my-data-used-for-model-training | 2026-08-18 | 2 | verified, WebFetch | [vendor] |
| SF-87 | Anthropic zero data retention covers eligible APIs and Claude Code on Enterprise, not consumer plans. Safety classifier results still retained | https://privacy.claude.com/en/articles/8956058-i-have-a-zero-data-retention-agreement-with-anthropic-what-products-does-it-apply-to | undated | 2 | verified, WebFetch | [vendor] |
| SF-88 | Google Workspace: no training on customer data without permission. Gemini app retention default 18 months, up to 36. Workspace 90 days to indefinite. Update log entry 2026-10-06 | https://knowledge.workspace.google.com/admin/gemini/generative-ai-in-google-workspace-privacy-hub | updated 2026-10-06 | 2 | verified, WebFetch | [vendor] |
| SF-89 | Gartner Australia: 85% of employees given enterprise AI tools, 86% also use personal AI tools, 574 respondents | https://www.gartner.com/en/newsroom/press-releases/2026-06-02-gartner-hr-survey-finds-ai-is-boosting-productivity-but-widening-workforce-divisions-in-australia | 2026-06-02 | 7 | unverified, 403 on WebFetch and curl, search snippet only | [analyst] |
| SF-90 | Netskope One AI Security, four products said to be GA | https://securitybrief.com.au/story/netskope-launches-unified-platform-for-ai-security | about 2026-05 | 7 | unverified, search snippet only | [vendor] |
| SF-91 | Anthropic model deprecations: at least 60 days' notice. Retires models to ensure capacity. Sonnet 4.5 deprecated 2026-09-30, retires 2026-11-30. temperature, top_p, top_k removed in API version 2026-10-21. Usage export by model in Console | https://platform.claude.com/docs/en/about-claude/model-deprecations | read 2026-10-25 | 2 | verified, WebFetch | [vendor] |
| SF-92 | Anthropic commits to preserve weights of publicly released models for at least the lifetime of the company | https://www.anthropic.com/research/deprecation-commitments | 2025-11-04 | 2 | verified, WebFetch | [vendor] |
| SF-93 | Every Claude model ID is a pinned snapshot, dateless IDs included. Serving infrastructure changes can cause minor behaviour differences with same ID and weights | https://platform.claude.com/docs/en/about-claude/models/model-ids-and-versions | read 2026-10-25 | 2 | verified, WebFetch | [vendor] |
| SF-94 | Claude models overview: "Every Claude model ID is a pinned snapshot". Retirement not sooner than 2027-09-22 for claude-opus-5-5, 2027-09-28 Sonnet 5.5, 2027-10-07 Haiku 5.5 | https://platform.claude.com/docs/en/about-claude/models/overview | read 2026-10-25 | 2 | verified, WebFetch | [vendor] |
| SF-95 | Claude API versions 2026-10-21 and 2023-06-01. Sampling parameters removed. A request relying on a non-default value can stay on 2023-06-01. SDK major version sets the API version | https://platform.claude.com/docs/en/api/versioning and https://platform.claude.com/docs/en/api/migration-2026-10-21 | 2026-10-21 | 2 | verified, WebFetch | [vendor] |
| SF-96 | OpenAI deprecations: GA at least 6 months, specialised 3 months, preview about 2 weeks. 2026-10-01 notice, shutdown 2027-04-01 "with six months' notice". 2026-10-14 GPT-4 series notice, shutdown 2027-01-14. 2026-10-23 shutdowns, notice 2026-04-22. Dedicated capacity after shutdown via sales. Evals deprecated 2026-06-03, read-only 2026-10-31, shutdown 2026-11-30 | https://developers.openai.com/api/docs/deprecations | read 2026-10-25 | 2 | verified, WebFetch (two reads, 10-14 entry quoted). Rechecked 2026-10-25 (WebFetch): 6-month GA policy, 2026-10-14 entry, no reason, Evals dates confirmed. | [vendor] |
| SF-97 | gpt-6-sol page lists one snapshot, gpt-6-sol, no dated snapshot | https://developers.openai.com/api/docs/models/gpt-6-sol | read 2026-10-25 | 2 | verified, WebFetch | [vendor] |
| SF-98 | GPT-6 Sol and Luna replaced GPT-5.6 in ChatGPT on all plans. Regressions in self-harm, under-18, extremism vision and slight HealthBench. Factuality the one metric not improved | https://deploymentsafety.openai.com/gpt-6-october | 2026-10-07 | 2 | verified, WebFetch | [vendor] [self-report] |
| SF-99 | Azure Foundry lifecycle: GA weights fixed, 18-month lifecycle, 12 months for Anthropic and others. 60 days' notice GA, 30 preview. versionUpgradeOption NoAutoUpgrade. Retirement dates not extendable. gpt-4o 2024-05-13 retires 2026-12-09 on Azure | https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/model-retirements | updated 2026-07-24 | 2 | verified, WebFetch | [vendor] |
| SF-100 | Gemini API: stable models usually don't change. Preview at least two weeks' notice. -latest alias hot-swapped, 2-week email notice for breaking changes | https://ai.google.dev/gemini-api/docs/models | read 2026-10-25 | 2 | verified, WebFetch | [vendor] |
| SF-101 | Gemini API deprecations: "advance notice", listed dates are earliest possible. Shutdowns 2026-10-05, 2026-10-22, 2026-10-23 | https://ai.google.dev/gemini-api/docs/deprecations | updated 2026-10-22 | 2 | verified, WebFetch | [vendor] |
| SF-102 | Negative flip rates across five open-model updates: MMLU-Pro 24.7% to 29.3%, GPQA 29.4% to 47.2%, even with accuracy gains. Selective fallback at 10% budget caught 26.7% to 30.8% of flips in cases shown | https://arxiv.org/html/2608.13607v1 | 2026-08-11 | 3 | verified, WebFetch. Rechecked 2026-10-25 (WebFetch): flip rates confirmed, authors at University of Ottawa. | [preprint] |
| SF-103 | GPT-4 prime vs composite accuracy 84% (March 2023) to 51% (June 2023) | https://arxiv.org/abs/2307.09009 | 2023-07-18, revised 2023-10-31 | 3 | verified, WebFetch | [preprint] |
| SF-104 | Silent LLM API updates caused regression in a toxicity detection case study. Regression testing for LLMs needs changes | https://arxiv.org/abs/2311.11123 | 2023-11-18, revised 2024-02-06 | 3 | verified, WebFetch (abstract only, no figures) | [preprint] |
| SF-105 | 22,555 migration commits: 82% post-shutdown (CI 79 to 84). 8% switch provider. 3% pre-existing abstraction, 4% introduce one. Medians: none 2 files / 8 lines / 72% reactive, pre-existing 4 / 20 / 70%, introduced 6 / 164 / 77%. 16% touch a test file, 4.5% mention an eval suite | https://arxiv.org/html/2609.31288v1 | 2026-09-25 | 3 | verified, WebFetch | [preprint], single author |
| SF-106 | OpenAI cookbook: Evals winding down, recommends Promptfoo, manual migration | https://developers.openai.com/cookbook/examples/evaluation/moving-from-openai-evals-to-promptfoo | undated (search snippet said 2026-06-03) | 2 | verified, WebFetch | [vendor] |
| SF-107 | OpenAI acquires Promptfoo, 2026-03-09. Expects to keep building the open-source offering | https://techcrunch.com/2026/03/09/openai-acquires-promptfoo-to-secure-its-ai-agents/ | 2026-03-09 | 6 | verified, WebFetch | press |
| SF-108 | promptfoo: MIT licence, 26.4k stars, CI/CD integration, providers OpenAI, Anthropic, Azure, Bedrock, Ollama and more | https://github.com/promptfoo/promptfoo | read 2026-10-25 | 2 | verified, WebFetch | [vendor] (now OpenAI-owned) |
| SF-109 | MUSCLE: negative flips reduced by up to 40% (Llama 1 to Llama 2) | https://arxiv.org/abs/2407.09435 | 2024-07-12, revised 2024-10-03 | 3 | verified, WebFetch | [preprint], Apple authors per search snippet |
| SF-110 | LiteLLM: MIT, OpenAI-format interface to 100+ LLMs, fallbacks, aliases, budgets, MCP and A2A gateways, separate Enterprise tier | https://docs.litellm.ai/docs/ | read 2026-10-25 | 2 | verified, WebFetch | [vendor] |
| SF-111 | Cloudflare AI Gateway: retries and model fallbacks, providers incl. Anthropic, Gemini, OpenAI. Available on all plans | https://developers.cloudflare.com/ai-gateway/ | updated 2026-04-20 | 2 | verified, WebFetch | [vendor] |
| SF-112 | Azure APIM AI gateway: OpenAI, Anthropic Messages (v2 tiers) and Vertex schemas, Bedrock backends, unified model API (preview), MCP and A2A | https://learn.microsoft.com/en-us/azure/api-management/genai-gateway-capabilities | updated 2026-06-25 | 2 | verified, WebFetch | [vendor] |
| SF-113 | Kong AI Gateway: one API across providers, failover, MCP and A2A | https://developer.konghq.com/ai-gateway/ | read 2026-10-25 | 2 | verified, WebFetch | [vendor] |
| SF-114 | "Portkey is now PRISMA AIRS AI Gateway", "Now generally available". Page metadata 2026-09-15 | https://portkey.ai/ and https://portkey.ai/docs/product/ai-gateway | 2026-09-15 | 2 | verified, WebFetch | [vendor], ownership not stated on page |
| SF-115 | Bedrock Converse API works with all Bedrock models that support messages, "write code once" | https://docs.aws.amazon.com/bedrock/latest/userguide/conversation-inference.html | read 2026-10-25 | 2 | verified, WebFetch | [vendor] |
| SF-116 | MCP current version 2026-07-28. Deprecated features kept at least twelve months | https://modelcontextprotocol.io/specification/versioning | read 2026-10-25 | 2 | verified, WebFetch | open standard |
| SF-117 | A2A: Linux Foundation project, joined Agentic AI Foundation 2026-08-27, A2A CLI announced 2026-10-01 | https://a2a-protocol.org/latest/ and https://a2a-protocol.org/latest/blog/ | 2026-10-01 | 2 | verified, WebFetch | open standard |
| SF-118 | CMA proposes SMS for Microsoft business software, switching barriers, Copilot competition, AWS and Microsoft removed data transfer fees. Decision by February 2027 | https://www.gov.uk/government/news/cma-takes-first-steps-to-ensure-choice-in-business-software | 2026-10-16 | 2 | verified, WebFetch | none |
| SF-119 | EU Data Act general applicability 12 September 2025 | https://en.wikipedia.org/wiki/Data_Act_(European_Union) | read 2026-10-25 | 6 | verified, curl | secondary |
| SF-120 | EU Data Act Article 29: switching charges end 12 January 2027 | https://eur-lex.europa.eu/eli/reg/2023/2854/oj/eng | 2023-12-22 | 7 | unverified, EUR-Lex and Commission pages returned 403 or empty | none |
| SF-121 | Gartner survey of 2,002 CIOs and tech executives, May to Jul 2026. Vanguards are CIOs with better business outcomes and high CEO-perceived AI value. Firms with pilot stop guidelines are 2.3 times more likely to be vanguards, with abandonment guidelines 2.6 times. Only 31% and 17% have them | https://www.financialcontent.com/article/bizwire-2026-10-19-gartner-survey-finds-only-13-of-cios-say-their-enterprise-has-realized-significant-or-transformational-value-from-ai | 2026-10-19 | 5 | verified, WebFetch (syndicated Business Wire copy, gartner.com blocked) | [analyst] [self-report], correlational |
| SF-122 | FinOps Foundation FinOps for AI: KPIs incl. cost per inference, cost per token, ROI or value per AI initiative, time to business value. Crawl, walk, run. Last updated 2026-02-17 | https://www.finops.org/wg/finops-for-ai-overview/ | 2026-02-17 | 2 | verified, WebFetch | standards body (practitioner foundation) |
| SF-123 | FOCUS 1.4 is the latest specification and "normalizes billing datasets across AI, cloud, SaaS". No release date on the page | https://focus.finops.org/ | 2026 (no date on page) | 2 | verified, WebFetch | open specification |
| SF-124 | Microsoft MC1479276: everyday AI in the per-user Copilot licence, advanced AI through usage-based billing with Copilot Credits from Q4 CY2026. Not active in Enterprise tenants until an admin creates a spending policy. Spending limits, alerts and a consumption dashboard in preview as of September 2026 | https://mc.merill.net/message/MC1479276 | 2026-09-25 | 2 | verified, WebFetch (third-party mirror of Microsoft Message Center) | [vendor] |
| SF-125 | Microsoft MC1519122: usage-based billing models in Copilot Chat, Word, Excel, PowerPoint, GA early to mid November 2026. No access unless admins enable it and allocate credits | https://mc.merill.net/message/MC1519122 | 2026-10-21 | 2 | verified, WebFetch (mirror) | [vendor] |
| SF-126 | Claude Code Analytics API (free, per-user sessions, lines of code, commits, PRs, estimated cost by model) and Claude Enterprise Analytics API (engagement, adoption, cost and usage on usage-based plans). Usage measures, not value measures | https://platform.claude.com/docs/en/manage-claude/analytics-api | read 2026-10-25 | 2 | verified, WebFetch | [vendor] |
| SF-127 | OpenAI, 2026-06-18: ChatGPT Enterprise credit usage analytics by user, product and model, a Cost API, a default workspace limit, group limits, individual overrides, and in-product requests for more credits | https://openai.com/index/chatgpt-enterprise-spend-controls/ | 2026-06-18 | 2 | verified, curl copy of Wayback snapshot 20260813095604 | [vendor] |
| SF-128 | Anthropic Spend Limits API: per-member spend limits and limit-increase requests, Claude Enterprise only, not Claude Console organisations | https://platform.claude.com/docs/en/manage-claude/spend-limits-api | read 2026-10-25 | 2 | verified, WebFetch | [vendor] |
| SF-129 | Claude token counting: GA, free, gives an estimate of input tokens before sending. Newer tokenizer gives about 30% more tokens for the same text | https://platform.claude.com/docs/en/build-with-claude/token-counting | read 2026-10-25 | 2 | verified, WebFetch | [vendor] |
| SF-130 | Claude Managed Agents session budgets: a hard cap on a session's spend at list rates, session pauses with budget_reached, launched 2026-08-07 | https://platform.claude.com/docs/en/release-notes/overview | 2026-08-07 | 2 | verified, WebFetch | [vendor] |
| SF-131 | GitHub budgets: alerts only unless "Stop usage when budget limit is reached" is set. User-level budgets always hard stop. Premium request budgets converted to AI credit budgets covering Copilot, cloud agent, Spark and Advanced Security AI | https://docs.github.com/en/billing/tutorials/set-up-budgets | read 2026-10-25 | 2 | verified, WebFetch | [vendor] |
| SF-132 | GitHub, 2026-10-08: organisations choose whether Copilot code review bills the member or the organisation, with an optional budget. No cost preview | https://github.blog/changelog/2026-10-08-copilot-code-review-new-organization-billing-options-and-controls | 2026-10-08 | 2 | verified, WebFetch | [vendor] |
| SF-133 | GitHub, 2026-10-13: search and filter for budgets, incl. user-level budgets | https://github.blog/changelog/2026-10-13-search-and-filter-for-budgets-now-available | 2026-10-13 | 2 | verified, WebFetch | [vendor] |
| SF-134 | GitHub, 2026-10-08: pull request limits can now include draft pull requests, which were excluded before | https://github.blog/changelog/2026-10-08-draft-pull-requests-count-toward-pull-request-limits | 2026-10-08 | 2 | verified, WebFetch | [vendor] |
| SF-135 | Anthropic service tiers: Priority Tier capacity commitments "no longer available for purchase". Priority Tier targets 99.5% uptime. Not supported on Opus 5.5, Sonnet 5.5, Haiku 5.5 and other newest models. No date for the change | https://platform.claude.com/docs/en/api/service-tiers | read 2026-10-25 | 2 | verified, WebFetch | [vendor] |
| SF-136 | OpenAI Scale Tier: 99.9% uptime SLA and 99% latency SLA, for example GPT-5.5 50,000 TPM at $750.00 per unit per day. Spill-over to Fast mode since July 2026. Credit is the greater of the two SLA amounts | https://openai.com/api-scale-tier/ | snapshot 2026-10-15 | 2 | verified, curl copy of Wayback snapshot 20261015235437 | [vendor] |
| SF-137 | Google Gemini Online Inference API SLA: 99.5% monthly uptime, 95% for models with shorter availability. Credits 10% (99.0% to under 99.5%), 25% (95.0% to under 99.0%), 50% (under 95.0%) | https://cloud.google.com/vertex-ai/generative-ai/sla | read 2026-10-25 | 2 | verified, curl copy | [vendor] |
| SF-138 | Bedrock cross-Region inference: geographic and global profiles, no extra routing cost, global about 10% cheaper. AWS advises bounded retries and multi-Region or multi-model fallback to meet an availability target | https://docs.aws.amazon.com/bedrock/latest/userguide/cross-region-inference.html | read 2026-10-25 | 2 | verified, WebFetch | [vendor] |
| SF-139 | LiteLLM reliability: in-order fallbacks across model groups on errors and rate limits, context-window and content-policy fallbacks, cooldowns. No measured uptime figures | https://docs.litellm.ai/docs/proxy/reliability | read 2026-10-25 | 2 | verified, WebFetch | [vendor] open source |
| SF-140 | Claude status feed, 2026-10-07 21:23 UTC: an issue caused some organisations "to be incorrectly paused for having reached their spend limit", refusing requests on the Claude API, Claude.ai, Claude Code, Claude Security and Cowork. Same day, usage data errors 00:00 to 01:40 UTC. No post-incident change stated | https://status.claude.com/history.rss | 2026-10-07 | 2 | verified, curl copy of the feed | [vendor] |
| SF-141 | Claude release notes: OpenTelemetry export in beta for Messages API and Managed Agents (2026-10-14). Organisation webhooks in beta and inference hooks out of beta (2026-10-20) | https://platform.claude.com/docs/en/release-notes/overview | 2026-10-14, 2026-10-20 | 2 | verified, WebFetch | [vendor] |
| SF-142 | Agent 365 GA for Commercial since 2026-05-01, central registry, Entra, Purview, Defender block unsafe behaviour | https://learn.microsoft.com/en-us/microsoft-agent-365/overview | 2026-05-01 (page updated 2026-10-23) | 2 | verified, WebFetch | [vendor] |
| SF-143 | Agent 365 $15.00 per user per month, E7 $99.00, E7 no Teams $90.45, annual | https://www.microsoft.com/microsoft-agent-365 | 2026-10-25 read | 2 | verified, WebFetch | [vendor] |
| SF-144 | AWS Agent Registry GA, five regions, automatic detection on AgentCore, no price on page | https://aws.amazon.com/about-aws/whats-new/2026/08/aws-agent-registry-generally-available/ | 2026-08-31 | 2 | verified, WebFetch | [vendor] |
| SF-145 | AI Control Tower 7.1.0 (Sep 2026) automatic containment, connectors to Agent 365, Foundry, Copilot, AWS. 7.1.5 (Oct 2026) no new items | https://www.servicenow.com/docs/r/C17ZqvSaMwUVpMBg8Nc5sg/6TBrSf~pXWXGzcoWl1GaSg | 2026-09 and 2026-10 | 2 | verified, WebFetch | [vendor] |
| SF-146 | OTel GenAI agent spans all Development status, no tagged release, commits to 2026-10-21 | https://github.com/open-telemetry/semantic-conventions-genai (docs/gen-ai/gen-ai-agent-spans.md) | 2026-10-21 | 2 | verified, curl (raw file and GitHub API) | none |
| SF-147 | COSAiS renamed COSIS on 2026-10-20 per 2026-09-29 Executive Order, agent use cases listed, latest draft 2026-01-08 is predictive AI | https://csrc.nist.gov/projects/cosais | 2026-10-20 | 2 | verified, WebFetch and curl | none |
| SF-148 | AI 600-1 released 2024-07-26, RMF revision undated, critical infrastructure profile concept note 2026-04-07, no agent profile | https://www.nist.gov/itl/ai-risk-management-framework | 2026-04-07 | 2 | verified, WebFetch | none |
| SF-149 | CAISI AI Agent Standards Initiative page last updated 2026-08-14, no Sep or Oct items | https://www.nist.gov/caisi/ai-agent-standards-initiative | 2026-08-14 | 2 | verified, WebFetch | none |
| SF-150 | Regulation (EU) 2026/1744, OJ 2026-07-24, in force 2026-07-27, high-risk to 2027-12-02 and 2028-08-02, GPAI as planned | https://www.mondaq.com/eu-digital-omnibus-on-ai-enters-into-force/1825722 | 2026-07 | 5 | verified, WebFetch | law firm summary |
| SF-151 | Omnibus formally adopted, transparency grace period to 2026-12-02 for systems placed before 2026-08-02 | https://www.addleshawgoddard.com/en/insights/insights-briefings/2026/technology/eu-ai-act-ai-omnibus-formally-adopted/ | 2026-07-01 | 5 | verified, WebFetch | law firm summary |
| SF-152 | Anthropic accredited ISO/IEC 42001:2023 certification by Schellman | https://www.anthropic.com/news/anthropic-achieves-iso-42001-certification-for-responsible-ai | 2025-01-13 | 2 | verified, WebFetch | [vendor] |
| SF-153 | Real-time monitoring: 34% more likely revenue growth, 65% more likely cost savings, 975 C-suite, average loss US$4.4M | https://www.ey.com/en_gl/newsroom/2025/10/ey-survey-companies-advancing-responsible-ai-governance-linked-to-better-business-outcomes | 2025-10-08 | 5 | verified, WebFetch | [consulting] [self-report] |
| SF-154 | IBM 2026: 68% lacked AI governance (35% none, 33% in development), 92%, shadow AI $5.39M vs $4.63M, security AI $4M vs $5.93M, 602 orgs, no cost split by governance | https://complexdiscovery.com/policy-without-control-the-ai-governance-gap-in-ibms-2026-cost-of-a-data-breach-report/ | 2026-07/08 | 5 | verified, WebFetch (first 100k chars) | [vendor] report via press |
| SF-155 | IBM 2026: 92% no AI access controls, 68% no governance policy, 19% coordinate, shadow AI $5.39M vs $4.63M | https://www.bakerdonelson.com/ten-takeaways-from-ibms-2026-cost-of-a-data-breach-report | 2026-07-30 | 5 | verified, WebFetch | [vendor] report via press |
| SF-156 | IBM landing page: $4.99M average, 12% rise, $1.93M lower cost with security AI and automation | https://www.ibm.com/reports/data-breach | 2026 | 2 | verified, WebFetch | [vendor] |
| SF-157 | 82% unknown agents, 65% incident, 21% formal decommissioning, 11% auto-block out-of-scope agent, 418 responses, Token Security funded | https://cloudsecurityalliance.org/press-releases/2026/04/21/new-cloud-security-alliance-survey-reveals-82-of-enterprises-have-unknown-ai-agents-in-their-environments | 2026-04-21 | 5 | verified, WebFetch | [vendor] [self-report] |
| SF-158 | 25% low-quality AI PRs, 31% large projects, 59% and 69% rising volume, 35% formal permitting policy, 32% no policy, 61% detailed review, Red Hat sponsor | https://www.linuxfoundation.org/press/new-lf-research-survey-shows-generative-ai-cuts-open-source-coding-time-in-half-but-25-of-incoming-pull-requests-are-considered-ai-slop | 2026-10-20 | 4 | verified, WebFetch | [self-report], vendor-sponsored |
| SF-159 | PR limits for users without write access, agent PRs count, drafts exempt, testimonials only, merged PRs 25M/month (Jan 2023) to over 90M | https://github.blog/open-source/maintainers/how-pull-request-limits-are-cutting-down-the-noise/ | 2026-06-18 | 2 | verified, WebFetch | [vendor] |
| SF-160 | 802 developers, 196,212 PRs, throughput 2.09x, per-reviewer load roughly doubled, merge and revert rates steady | https://arxiv.org/abs/2607.01904 | 2026-07-02 | 3 | verified, WebFetch (abstract) | [preprint] |
| SF-161 | Secondary summary of SF-160: AI PRs 20% longer first review to merge, written feedback 39% to 21% | https://semgrep.dev/blog/2026/end-is-nigh-for-code-review/ | 2026 | 6 | verified, WebFetch. Figures not seen in the abstract, not used as main evidence | [vendor] |
| SF-162 | RovoDev: PR cycle time down 30.8%, human comments down 35.6%, 38.70% code resolution, one year, ICSE'26 SEIP | https://arxiv.org/abs/2601.01129 | 2026-01-03 | 1 | verified, WebFetch. Rechecked 2026-10-25 (WebFetch): 30.8%, 35.6%, 38.70%, ICSE'26 SEIP confirmed. Affiliations not shown on page. | vendor authors (Atlassian) |
| SF-163 | LLM review bot in industry: 73.8% comments resolved, closure 5h52m to 8h20m, 4,335 PRs, ICSE 2025 SEIP | https://arxiv.org/abs/2412.18531 | 2024-12-24 | 1 | verified, WebFetch. Rechecked 2026-10-25 (WebFetch): 73.8%, 5h52m to 8h20m, 4,335 PRs, ICSE 2025 confirmed. | independent |
| SF-164 | 248,641 AI PRs with AI reviews, cross-product review in about 1.6% of agent PRs, ESEM 2026 | https://arxiv.org/abs/2608.21311 | 2026-08-21 | 3 | verified, WebFetch | [preprint] |
| SF-165 | Copilot code review GA, $0.05 to $1 Lite, $0.25 to $5 Balanced per review in AI credits, plus Actions minutes, no effect claims | https://docs.github.com/en/copilot/concepts/agents/code-review | 2026-10-25 read | 2 | verified, WebFetch | [vendor] |
| SF-166 | QEMU declines contributions believed to include AI-generated content, legal reason | https://gitlab.com/qemu-project/qemu/-/raw/master/docs/devel/code-provenance.rst | 2026-10-25 read | 2 | verified, curl (qemu.org DNS failed) | none |
| SF-167 | Ghostty: all AI use must be disclosed, public list blocks bad AI contributors | https://raw.githubusercontent.com/ghostty-org/ghostty/main/AI_POLICY.md | 2026-10-25 read | 2 | verified, curl | none |
| SF-168 | Workslop: 40% received in last month, 2 hours each, $186 per employee per month, $9M per 10,000 staff, 1,150 workers, recommendations not measured | https://www.betterup.com/workslop | 2025-09 | 5 | verified, WebFetch | [vendor] [self-report] |
| SF-169 | Faros AI Engineering Report 2026: 22,000 developers, 4,000 teams, longer review cycles, no figures on page | https://faros.ai/research | 2026 Q2 and Q3 | 5 | verified, WebFetch | [vendor] |
| SF-170 | DORA 2025: AI's primary role is as an amplifier, gains come from the organisational system | https://dora.dev/research/2025/dora-report/ | 2025 | 4 | verified, WebFetch | Google research team, Google sells AI tools |
| SF-171 | METR Feb 2026 update: speedup likely larger than early 2025, weak evidence | (search snippet only) | 2026-02 | 7 | unverified, not used | none |
| SF-172 | Issue 98747: idle compaction in 2.1.286, 7 of 20 sessions, maintainer says 2.1.290 adds idleCompaction setting, reporter confirms fix, closed 2026-10-06 | https://github.com/anthropics/claude-code/issues/98747 | 2026-10-01 to 2026-10-09 | 6 (user), 2 (maintainer comment) | verified, curl (GitHub API) | [self-report] |
| SF-173 | Changelog: 2.1.299 idle compaction and `"idleCompaction": false`, 2.1.302 `/config` row and notice, 2.1.304 skill list re-sent after compaction | https://raw.githubusercontent.com/anthropics/claude-code/main/CHANGELOG.md | 2026-10-14, 2026-10-16, 2026-10-19 | 2 | verified, curl | [vendor] |
| SF-174 | npm publish dates: 2.1.290 2026-10-05, 2.1.299 2026-10-14, 2.1.302 2026-10-16, 2.1.304 2026-10-19 | https://registry.npmjs.org/@anthropic-ai/claude-code | 2026-10-05 to 2026-10-19 | 2 | verified, curl | none |
| SF-175 | What survives compaction table, SessionStart compact hook, skill descriptions need v2.1.304, `/context` live breakdown | https://code.claude.com/docs/en/context-window | 2026-10-25 read | 2 | verified, WebFetch | [vendor] |
| SF-176 | CLAUDE.md is "context, not enforced configuration", use PreToolUse hook to block, project-root CLAUDE.md survives compaction, AGENTS.md supported | https://code.claude.com/docs/en/memory | 2026-10-25 read | 2 | verified, WebFetch | [vendor] |
| SF-177 | PreToolUse can block via exit code 2 or permissionDecision deny, PreCompact and PostCompact events, SessionStart compact matcher | https://code.claude.com/docs/en/hooks | 2026-10-25 read | 2 | verified, WebFetch (first 100k chars) | [vendor] |
| SF-178 | AGENTS.md stewarded by Agentic AI Foundation, over 60k open-source projects, tools list | https://agents.md/ | undated | 2 | verified, WebFetch | none |
| SF-179 | Claude memory launched 2025-09-11 Team and Enterprise, 2025-10-23 Pro and Max, separate memory per project, admin can disable | https://claude.com/blog/memory | 2025-09-11 | 2 | verified, WebFetch | [vendor] |
| SF-180 | ChatGPT project memory switch 2026-08-14, no memory or context entry from 2026-09-25 to 2026-10-20 | https://help.openai.com/en/articles/6825453-chatgpt-release-notes | 2026-08-14 | 2 | verified, Wayback via curl (direct page blocked) | [vendor] |
| SF-181 | 39% multi-turn drop, GPT-4o Full 93.0, Sharded 59.1, Recap 76.6, Snowball 65.3, snowball mitigates 15 to 20%, temperature ineffective, about 30% unreliability at 0 | https://arxiv.org/abs/2505.06120 (HTML v1) | 2025-05-09 | 3 | verified, WebFetch | [preprint] |
| SF-182 | NoLiMa: 13 models, 11 below 50% of baseline at 32K, GPT-4o 99.3% to 69.7%, ICML 2025 | https://arxiv.org/abs/2502.05167 | 2025-02-07 | 1 | verified, WebFetch | none |
| SF-183 | LongMemEval: 30% accuracy drop across sustained interactions, ICLR 2025 | https://arxiv.org/abs/2410.10813 | 2024-10-14 | 1 | verified, WebFetch | none |
| SF-184 | IFScale: best models about 68% at 500 instructions, bias toward earlier instructions | https://arxiv.org/abs/2507.11538 | 2025-07-15 | 3 | verified, WebFetch | [preprint] |
