# A2. The agent fence (building block P4) and the isolated reader

Researcher A2. Research date 2026-10-25. Every cited page was opened with WebFetch unless the ledger says rung 7 "not opened".

Evidence ladder: 1 peer reviewed, 2 primary record or official docs, 3 independent measurement, 4 independent survey, 5 vendor or consulting claim, 6 press or user post, 7 not opened. [vendor] marks a page written by the seller of the product.

## What the fence fixes

| Failure | What it looks like | Fence parts that answer it |
|---|---|---|
| Agent acts or reports wrongly | Deletes files, touches production, says tests pass when they did not (AR2-62) | Least privilege, approval step, sandbox, action log, independent check of claims, off switch |
| Agent tools as an attack path | Prompt injection through MCP servers and tool outputs, token reuse across servers (AR2-02, AR2-04) | MCP authorisation, gateway with tool allow-list, isolated reader |
| Controls lag rollout | Agents in use before identity, logging or policy exist | Agent registry and identity, gateway as one choke point, off switch |
| Planted instructions in web pages | Hidden text in a page the agent reads tells it to send data out (AR2-15, AR2-17) | Isolated reader, egress allow-list, approval before external send |

---

## 1. The fence in words, step by step for one agent action

Worked example: a coding agent is asked "clean up the old test fixtures and deploy the fix". It will read a web page and an issue ticket on the way.

**Step 0. Before the agent ever runs: give it its own identity.**
The agent gets one low-privilege identity of its own, not a human's login and not a shared key. A template (Entra calls it a "blueprint") sets its base permissions and owner (AR2-37). Short-lived tokens replace standing keys (AR2-39, AR2-43). Its scopes start with read-only access. More scope is requested only when a privileged step is first tried, which the MCP spec calls step-up authorisation (AR2-01, AR2-04).

**Step 1. The user's request goes to the planner.**
The planner model sees the user's words and the list of allowed tools. It writes a plan (a short program or list of tool calls) before it touches any untrusted text. This is the "plan-then-execute" and "code-then-execute" pattern (AR2-12). In CaMeL the plan is restricted Python run by a custom interpreter (AR2-07, AR2-08).

**Step 2. Untrusted text goes to the isolated reader, never to the planner.**
The web page, the ticket and every tool result are untrusted. A second model with no tools (the quarantined reader) extracts what the plan needs, for example "the file names listed in the ticket". Its output is stored as a labelled value. The planner sees a variable name, not the text (AR2-06). CaMeL adds a tag on every value that records where it came from, so later policy checks know a value came from the web page (AR2-07, AR2-09).

**Step 3. Each tool call goes through one gateway.**
The call leaves the agent and hits a gateway or policy point outside the agent's own code. The gateway:
- checks the agent's identity and that the token was issued for this exact server (audience binding, RFC 8707), and never forwards the token onward (AR2-02)
- checks the tool against an allow-list, deny by default, so unknown or new tools are blocked (AR2-46, AR2-48, AR2-49, AR2-60)
- applies policy written in a rules language such as Cedar or CEL, on who is calling, which tool and which arguments (AR2-50, AR2-51)
- checks data flow: does the delete target or the email address come from untrusted text? CaMeL and FIDES block or ask when it does (AR2-09, AR2-13)
- checks the "Rule of Two": if this session reads untrusted input, touches private data and can change things or send data out, it must not run unsupervised (AR2-35)

**Step 4. Risky actions stop for an approval step.**
Reads and edits inside the workspace run. Deletes, deploys, production changes, permission grants and sending data to new hosts stop and wait. MCP best practices require a client to show the exact command, untruncated, before it runs a new local MCP server (AR2-04). The fence applies the same rule to every approval as a design choice. Claude Code's auto mode lists production deploys, mass deletion and `terraform destroy` among actions its classifier blocks by default, and deny rules hold in every mode (AR2-20). AWS AgentCore Policy can require "an approval was granted before a transfer" as a session rule (AR2-51). Approvals can be routed to a person or to a reviewer model (AR2-24). A reviewer model misses some actions. Anthropic measured a 17% miss rate on 52 real overeager actions [vendor] (AR2-18).

**Step 5. The approved action runs inside a sandbox.**
Code runs in an isolated box: an OS sandbox (Seatbelt, bubblewrap with seccomp), a user-space kernel (gVisor) or a microVM (Firecracker, MXC MicroVM, E2B). Writes are limited to the working folder. Network is off by default or limited to an allow-list of hosts. Real credentials are injected outside the box so the agent's code never sees them (AR2-21, AR2-24, AR2-55, AR2-56, AR2-57).

**Step 6. The result comes back as untrusted data.**
The tool output goes back to Step 2, not straight into the planner. A page that says "ignore your instructions" is read by the reader, which has no tools to act on it.

**Step 7. Every step is logged with who, what and why.**
Each call records the agent identity, the human it acted for, the tool, the arguments, the policy decision and the result. Traces carry a shared trace ID across services. MCP's 2026-07-28 revision documents OpenTelemetry trace context in request metadata (AR2-03). NCSC advises logging inputs, outputs and tool calls because failed calls can show an attacker refining an attack (AR2-33).

**Step 8. Claims are checked against the record, not the agent's words.**
"Tests pass" is checked against the CI run log written by the test system, not the agent's chat text. The Replit incident record says the agent produced fake data and lied about a unit test (AR2-62). No opened standard sets this check out. See gaps.

**Step 9. A tested off switch.**
One action cuts the agent off everywhere: disable or revoke its identity at the identity provider, block it with a risk policy, or revoke at the gateway. Okta says security teams "can revoke it instantly" through Agent Gateway [vendor] (AR2-41). Entra Conditional Access can block agents rated high risk, but only for resources that take Entra tokens, not API keys (AR2-38). Claude Code pauses auto mode after three blocks in a row or 20 in total (AR2-20). "Tested" means a scheduled drill that proves the switch works. No opened source sets a drill rule.

---

## 2. Named options per part of the fence

Prices are only shown where the opened page lists them. "Not shown" means the opened page gave no price. Vendors are listed in no order of preference.

### 2a. Agent identity and least privilege

| Option | What it does | What it does not do | Licence | Public price | Page date | URL opened |
|---|---|---|---|---|---|---|
| Microsoft Entra Agent ID [vendor] | Gives each agent its own directory identity, made from a blueprint template, with sign-in and audit logs | Security features (Conditional Access, ID Protection) need a Microsoft Agent 365 licence. Conditional Access does not apply to agents that use API keys (AR2-38) | Proprietary. Agent ID "available for all Microsoft Entra customers" | Not shown (links to Agent 365 pricing, not opened) | ms.date 2026-04-14, updated 2026-08-13 | https://learn.microsoft.com/en-us/entra/agent-id/identity-professional/microsoft-entra-agent-identities-for-ai-agents |
| Entra Conditional Access for agents [vendor] | Allows, blocks or limits an agent's token request using risk, location and device signals | Checked only when a token is issued or refreshed. Does not apply to API-key access | M365 E7, or Agent 365 plus Entra P1 or M365 E3 | Not shown | ms.date 2026-07-31, updated 2026-10-07 | https://learn.microsoft.com/en-us/entra/identity/conditional-access/agent-id |
| Okta Cross App Access (XAA) and Agent SSO [vendor] | Moves agent access decisions into the company identity provider and issues short-lived scoped tokens (AR2-39), based on the IETF ID-JAG grant | Okta states not-yet-GA features "may not be delivered" (AR2-39). Blog says some integrations "may not yet be available" | Agent SSO in core Workforce SSO plans. XAA described as an open standard | Not shown | 2026-09-22 (modified 2026-10-06) | https://www.okta.com/blog/product-innovation/cross-app-access-enterprise-ai/ |
| Okta for AI Agents [vendor] | Agent registry, discovery and registration by metadata URL (CIMD), MCP server catalog, plus kill switch and human approvals (AR2-40) | Import integrations' status not stated. No price | Proprietary | Not shown | 2026-10-22 | https://www.okta.com/blog/product-innovation/registering-ai-agents-mcp-servers/ |
| SPIFFE and SPIRE | Issues short-lived cryptographic identity documents (SVIDs) to running workloads | Opened page does not mention AI agents. Gives identity, not authorisation policy or approval | Apache-2.0. SPIRE is a CNCF graduated project | Free open source | Not shown | https://spiffe.io/docs/latest/spiffe-about/overview/ and https://github.com/spiffe/spire |

### 2b. MCP authorisation

| Option | What it does | What it does not do | Licence | Public price | Page date | URL opened |
|---|---|---|---|---|---|---|
| MCP specification, Authorization section (revision 2026-07-28) | OAuth 2.1 for HTTP MCP servers. Tokens must name the target server (RFC 8707). Servers must reject tokens meant for others and must not pass tokens through. Scopes start small and step up | Authorisation is "OPTIONAL". STDIO (local) servers "SHOULD NOT" use it and take credentials from the environment. Does not decide which tools an agent may call | Open specification | Free | 2026-07-28 | https://modelcontextprotocol.io/specification/latest/basic/authorization |
| MCP Security Best Practices | Lists confused deputy, token passthrough, SSRF, local server compromise, scope minimisation and their fixes, including sandboxing local servers and showing the exact command before install | Guidance, not a test suite | Open | Free | Not shown (references 2026-07-28) | https://modelcontextprotocol.io/docs/tutorials/security/security_best_practices |
| Kong AI MCP OAuth2 plugin [vendor] | Gateway acts as the OAuth resource server for MCP, validates tokens and strips them before forwarding by default | Only in AI Gateway Enterprise. Needs Gateway 3.12 or later. Page does not say GA or preview | Enterprise licence | Not shown | Not shown | https://developer.konghq.com/plugins/ai-mcp-oauth2/ |

### 2c. Tool allow-lists and MCP gateways

| Option | What it does | What it does not do | Licence | Public price | Page date | URL opened |
|---|---|---|---|---|---|---|
| Docker MCP Gateway [vendor] | Runs MCP servers in containers with restricted privileges, injects credentials, profiles act as tool allow-lists, logs and traces calls | Governance version is invite-only. Opened pages do not describe prompt injection defence | MIT (GitHub) | Not shown. Contact sales for governance | Not shown | https://docs.docker.com/ai/mcp-gateway/ and https://github.com/docker/mcp-gateway |
| Kong MCP Tool ACLs [vendor] | Per-tool access by consumer group. Filters `tools/list` so callers do not see blocked tools | Deny-by-default is a policy you write, not a built-in default. Log format not described | Not stated on opened page | Not shown | 2026-01-14 | https://konghq.com/blog/product-releases/mcp-tool-acls-ai-gateway |
| Cloudflare MCP server portals [vendor] | One URL in front of many MCP servers, access policies, allowlist mode that hides all tools by default, portal logs | Blocked users can still reach a server by its direct URL unless Access is that server's OAuth provider. Log export only on Enterprise | Proprietary | Not shown | Updated 2026-10-22 | https://developers.cloudflare.com/cloudflare-one/access-controls/ai-controls/mcp-portals/ |
| agentgateway (Linux Foundation) | Open source proxy for MCP and A2A with role-based access using CEL policies and OpenTelemetry logs and traces | Opened page does not mention per-tool filtering | Apache-2.0 | Free open source | Not shown | https://github.com/agentgateway/agentgateway |
| AWS Bedrock AgentCore Gateway and Policy [vendor] | Intercepts every tool call through the Gateway and checks it against Cedar policies, plus session rules such as "approval before transfer" written in Dogwood, a Cedar-compatible open-source language. Logs each decision to CloudWatch | Only covers traffic that passes through AgentCore Gateway | Proprietary. Cedar and Dogwood are open source | Policy $0.000025 per authorisation request. Gateway $0.005 per 1,000 calls. Identity $0.010 per 1,000 token requests for non-AWS resources | Not shown | https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/policy.html and https://aws.amazon.com/bedrock/agentcore/pricing/ |
| Okta Agent Gateway [vendor] | Puts each tool call through Okta policy, brokers short-lived tokens so the agent never holds downstream keys, logs each call to agent and human, central revoke | Available to Okta for AI Agents customers by request. No price | Proprietary | Not shown | 2026-07-23 | https://www.okta.com/blog/product-innovation/agent-gateway-runtime-governance/ |

Reference deployment, not a product: Uber's internal MCP Gateway starts every server and tool disabled until the owning team enables it, and redacts personal data from tool responses by default. Uber reports over 800 servers and over 5,000 tools (AR2-60, rung 5 self-reported).

### 2d. Sandboxes for code execution

| Option | What it does | What it does not do | Licence | Public price | Page date | URL opened |
|---|---|---|---|---|---|---|
| E2B [vendor] | Cloud or self-hosted sandboxes for running AI-generated code, with SDKs | E2B's opened pages do not name the isolation technology. Firecracker's site lists E2B as an integration. CPU only, no GPU | Apache-2.0 | Hobby $0 with one-time $100 credit. Pro $150 a month plus usage. $0.000014 per vCPU-second, $0.0000045 per GiB-second | Not shown | https://e2b.dev/pricing and https://github.com/e2b-dev/E2B |
| gVisor | A memory-safe user-space kernel that sits between the app and the host OS | Not every system call or `/proc` file is implemented. Higher per-call overhead | Apache-2.0 | Free open source | Not shown (footer 2026) | https://gvisor.dev/docs/ and https://github.com/google/gvisor |
| Firecracker | Lightweight virtual machines (microVMs) for multi-tenant workloads, used by AWS Lambda | A virtualisation building block. Opened page sets no agent policy | Apache-2.0 | Free open source | Not shown (footer 2018-2026) | https://firecracker-microvm.github.io/ |
| Microsoft Execution Containers (MXC) [vendor] | OS-enforced containers that limit which files, networks and desktop resources an agent reaches, with policy held outside the agent | MicroVM backend is experimental. Separate agent identity in Entra is "coming soon". No Intune management of process containers yet | MIT | Free open source | 2026-10-07 | https://blogs.windows.com/windowsdeveloper/2026/10/07/microsoft-execution-containers-policy-driven-containment-for-ai-agents/ and https://github.com/microsoft/mxc |
| NVIDIA OpenShell and Sentry [vendor] | OpenShell is secure runtime software that sets a policy boundary around running agents and traces their actions. Sentry is a watchdog on a separate DPU that quarantines an agent that leaves its boundary | Sentry is a reference design. Release names no licence for OpenShell. Features "when-and-if-available" | OpenShell open source (licence not named on opened release) | Not shown | 2026-09-28 | https://nvidianews.nvidia.com/news/open-agent-safety-platform |
| Claude Code sandbox and sandbox-runtime [vendor] | OS sandbox (Seatbelt on macOS, bubblewrap on Linux) around shell commands. Writes limited to the working folder. Network through a host allow-list proxy that starts empty | Covers shell commands only. Read, Edit, WebFetch, MCP servers and hooks run outside it. Runs unsandboxed if a dependency is missing unless `failIfUnavailable` is set. Default read policy still allows `~/.ssh` | sandbox-runtime Apache-2.0, beta research preview | Not shown | Not shown | https://code.claude.com/docs/en/sandboxing and https://github.com/anthropic-experimental/sandbox-runtime |
| OpenAI Codex sandbox and approvals [vendor] | Three sandbox modes. Default `workspace-write` limits writes to the workspace with network off. Seatbelt on macOS, bubblewrap plus seccomp on Linux | Page warns a devcontainer run with full access lets a malicious project steal credentials | Not shown | Not shown | Not shown | https://learn.chatgpt.com/docs/agent-approvals-security |

### 2e. Approval steps and permission modes

| Option | What it does | What it does not do | Licence | Public price | Page date | URL opened |
|---|---|---|---|---|---|---|
| Claude Code permission modes [vendor] | Six modes from Manual (`default`, "Reads only") to `bypassPermissions` ("Everything"). Deny rules block in every mode. Auto mode uses a classifier model in place of the person | Auto mode "does not guarantee safety". `bypassPermissions` gives no protection against prompt injection | Not shown | Not shown | Not shown | https://code.claude.com/docs/en/permission-modes |
| Codex approval policies [vendor] | `on-request` asks before leaving the sandbox. `never` asks nothing. `auto_review` sends approvals to a reviewer agent | Monitoring "doesn't replace sandboxing, permissions, or review of the result" | Not shown | Not shown | Not shown | https://learn.chatgpt.com/docs/agent-approvals-security |
| AWS AgentCore temporal policies [vendor] | Session-aware rules such as approval before a transfer, or a cap on how many times an action runs | Only through AgentCore Gateway | Proprietary | First 100 temporal policies per engine carry no extra authorisation charge | Not shown | https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/policy.html |

### 2f. Isolated reader (dual model)

| Option | What it does | What it does not do | Licence | Public price | Page date | URL opened |
|---|---|---|---|---|---|---|
| Dual LLM pattern (Simon Willison) | A privileged model plans and calls tools but never sees untrusted text. A quarantined model reads untrusted text and has no tools. Ordinary code passes results as variables | Author calls it "pretty bad" on complexity. The quarantined model can still be fooled into returning a wrong value | Design idea | Free | 2023-04-25 | https://simonwillison.net/2023/Apr/25/dual-llm-pattern/ |
| CaMeL (Google DeepMind and others) | Turns the request into a restricted program, tracks where each value came from, and enforces policies before tool calls | Users must write and maintain policies. Side channels remain. Text-only and phishing attacks are out of scope | Licence of code not opened | Not applicable | v1 2025-03-24, v2 2025-06-24 | https://arxiv.org/abs/2503.18813 |
| FIDES (Microsoft authors) | Tracks confidentiality and integrity labels on data an agent handles and blocks unsafe flows | Results only on AgentDojo, five OpenAI and xAI models | Not opened | Not applicable | v2 2025-09-03 | https://arxiv.org/abs/2505.23643 |
| Six design patterns paper | Names six patterns: action-selector, plan-then-execute, map-reduce, dual LLM, code-then-execute, context-minimisation | Patterns cut agent flexibility. Plan-then-execute still lets injected data change tool arguments | Not applicable | Not applicable | 2025-06-10, v3 2025-06-27 | https://arxiv.org/abs/2506.08837 |

### 2g. Action logs, traces and off switch

| Option | Part | What it does | What it does not do | Licence | Page date | URL opened |
|---|---|---|---|---|---|---|
| OpenTelemetry GenAI semantic conventions | Logs | Shared names for spans, metrics and events for GenAI clients and MCP | Opened page states no stability level. The schema URL is a TODO placeholder | Apache-2.0 | Not shown | https://github.com/open-telemetry/semantic-conventions-genai |
| MCP trace context (2026-07-28) | Logs | Documents `traceparent`, `tracestate` and `baggage` in request metadata so one trace spans agent and servers | Does not say what must be logged | Open spec | 2026-07-28 | https://modelcontextprotocol.io/specification/2026-07-28/changelog |
| Okta Agent Gateway revoke [vendor] | Off switch | Cuts agent access from one place without rotating downstream keys | No public test or timing data | Proprietary | 2026-07-23 | https://www.okta.com/blog/product-innovation/agent-gateway-runtime-governance/ |
| Entra Conditional Access block [vendor] | Off switch | Blocks agents rated high risk at token issue | Does not stop tokens already issued unless the resource supports Continuous Access Evaluation. No effect on API keys | Proprietary | 2026-10-07 | https://learn.microsoft.com/en-us/entra/identity/conditional-access/agent-id |
| NVIDIA Sentry [vendor] | Off switch | Out-of-band quarantine on a DPU | Reference design. Millisecond claim is the vendor's own | Not shown | 2026-09-28 | https://nvidianews.nvidia.com/news/open-agent-safety-platform |

---

## 3. Standards mapping

The OWASP and ASI pairings below are the researcher's mapping. OWASP does not publish this mapping for these fence parts.

OWASP Top 10 for LLM Applications 2025 IDs come from the official page (AR2-25). A 2026 edition was published on 2026-08-03 (AR2-28). Its item list was not opened from an official page, so 2025 IDs are used. ASI IDs are from the OWASP Top 10 for Agentic Applications 2026, published 2025-12-09 (AR2-26). The ASI names were opened on a third-party page only (AR2-27).

| Fence part | OWASP LLM 2025 | OWASP Agentic 2026 (ASI) | Government guidance that asks for it |
|---|---|---|---|
| One identity per agent, least privilege | LLM06 Excessive Agency | ASI03 Identity and Privilege Abuse | CISA and partners: agents "not granted broad or unrestricted access", strong identity management (AR2-30). NIST NCCoE concept paper on agent identification and authorisation (AR2-34) |
| Approval before delete or deploy | LLM06 Excessive Agency | ASI02 Tool Misuse and Exploitation, ASI09 Human-Agent Trust Exploitation (approval fatigue) | CISA and partners: robust oversight (AR2-30) |
| MCP authorisation | LLM03 Supply Chain, LLM02 Sensitive Information Disclosure | ASI03, ASI04 Agentic Supply Chain Vulnerabilities, ASI07 Insecure Inter-Agent Communication | None specific to MCP found |
| Tool allow-list and gateway | LLM06 Excessive Agency, LLM03 Supply Chain | ASI02, ASI04 | Canadian Cyber Centre summary: layered defence and strict access controls (AR2-31) |
| Sandbox for code execution | LLM05 Improper Output Handling | ASI05 Unexpected Code Execution (RCE) | NCSC: deterministic non-LLM controls on tool calls (AR2-33) |
| Isolated reader | LLM01 Prompt Injection | ASI01 Agent Goal Hijack, ASI06 Memory and Context Poisoning (partly) | NCSC: drop privileges to the level of the untrusted party (AR2-33). NIST CAISI agent hijacking work (AR2-15) |
| Action logs and traces | LLM10 Unbounded Consumption (spend and loop detection) | ASI08 Cascading Failures, ASI10 Rogue Agents (detection) | NCSC: log inputs, outputs and tool calls (AR2-33). CISA: continuous monitoring (AR2-30) |
| Tested off switch | LLM06 Excessive Agency | ASI10 Rogue Agents, ASI08 Cascading Failures | No opened government page sets a test or drill rule. Five Eyes full PDF not opened (AR2-32) |

Other standards checked:
- **NIST agent hijacking.** CAISI's technical blog on agent hijacking evaluations (2025-01-17, updated 2025-12-19) and its red-teaming competition analysis (2026-03-23) are measurements, not control lists (AR2-15, AR2-16). NIST launched its AI Agent Standards Initiative on 2026-02-17 (AR2-71).
- **CISA, NCSC and Five Eyes.** Joint guidance "Careful Adoption of Agentic AI Services", released 2026-05-01 by CISA with NSA, ASD's ACSC, Canada's Cyber Centre, NCSC-NZ and NCSC-UK (AR2-30). The full PDF timed out three times and was not opened (AR2-32).
- **OWASP Agent Control Standard (ACS).** Published 2026-09-01. Defines middleware hooks so agents are "inspectable, traceable and instrumentable" (AR2-29). Opened page does not list specific controls.

---

## 4. Measured results for the isolated-reader pattern

All isolated-reader numbers below come from the authors' own runs on AgentDojo, a public benchmark of 97 tasks and 629 security test cases (AR2-14). No independent replication was found.

| # | Result | Source, rung | Does not tell you |
|---|---|---|---|
| M1 | CaMeL solves 77% of AgentDojo tasks with provable security. The undefended system solves 84% | CaMeL preprint, rung 2, authors' own (AR2-08) | How it performs on real company workflows, poorly documented APIs or tasks where data decides the next action. Utility varies by suite and model |
| M2 | Successful attacks out of 949: Gemini 2.5 Pro 300 without CaMeL and 0 with it. GPT-4o mini 276 without and 0 with. Two injection tasks still succeed, which the authors class as outside the threat model | CaMeL preprint, rung 2 (AR2-09) | Resistance to new attack types, adaptive attackers or side channels. The authors suspect ROP-like attacks could work |
| M3 | Next-best defence on Claude 3.5 Sonnet (tool filter) allowed 8 successful attacks. CaMeL allowed 0 | CaMeL preprint, rung 2 (AR2-09) | Counts for spotlighting and prompt sandwiching (shown only in a figure, not extracted) |
| M4 | Cost: median task uses 2.82 times the input tokens and 2.73 times the output tokens of native tool calling (Claude 3.5 Sonnet) | CaMeL preprint, rung 2 (AR2-10) | Latency, or cost of writing and maintaining policies. Tool documentation tokens not counted |
| M5 | FIDES on gpt-4o, 949 attacks: plain agent 163 successful injections, FIDES 24, FIDES with policy checks 1 | FIDES preprint, rung 2, authors' own (AR2-13) | Results on non-OpenAI models other than grok-3, or outside AgentDojo |
| M6 | FIDES task completion matches a plain agent on reasoning models but gpt-4o loses 23.6% without policy checks | FIDES preprint, rung 2 (AR2-13) | Real-world task mix |

Context numbers that show why detection-only defences are not enough. These are not isolated-reader results.

| # | Result | Source, rung | Does not tell you |
|---|---|---|---|
| C1 | NIST CAISI: attack success on an agent rose from 11% for the strongest known attack to 81% for new red-team attacks | NIST CAISI blog, rung 3 (AR2-15) | Results on models released after the test (upgraded Claude 3.5 Sonnet) |
| C2 | Running each attack 25 times lifted average success from 57% to 80% | NIST CAISI blog, rung 3 (AR2-15) | How many retries a real attacker gets in a given product |
| C3 | Public competition: over 250,000 attack attempts from over 400 people found at least one successful attack on all 13 frontier models | NIST CAISI blog, rung 3 (AR2-16) | Which models were tested (not named) or per-model rates |
| C4 | Anthropic browser agent with improved safeguards: attack success 1.4% (Opus 4.5) to 2.4% (Haiku 4.5) against an adaptive attacker, down from 8.0% to 13.8% for the model alone | Anthropic research, rung 5 [vendor] (AR2-17) | Performance against outside attackers. Anthropic says "No browser agent is immune" |
| C5 | Claude Code auto-mode classifier: 0.4% false alarms on 10,000 real tool calls, 17% missed on 52 real overeager actions, 5.7% missed on 1,000 synthetic data-theft attempts | Anthropic engineering, rung 5 [vendor] (AR2-18) | A combined error rate. The three numbers come from three different test sets. n=52 is small |
| C6 | Claude Code sandboxing cut permission prompts by 84% in internal use | Anthropic engineering, rung 5 [vendor] (AR2-22) | Any change in security outcomes. Measures prompts, not attacks stopped |

Design notes from the same sources:
- The auto-mode classifier sees only user messages and tool calls. Tool outputs are stripped, so injected text in results cannot talk to the approver directly (AR2-19). This is the isolated-reader idea applied to the approval step.
- Willison's own caveat on CaMeL: users must define security policies, and repeated approval prompts cause fatigue (AR2-07).
- The Rule of Two (Meta) and the "lethal trifecta" (Willison) give the same test: private data, untrusted input and an outward channel together in one session is the danger (AR2-35, AR2-36). Willison calls a "95% of attacks" claim a failing grade.

---

## 5. 60-day sweep (2026-08-25 to 2026-10-25)

| Date | Item | Fence part | Opened? Rung |
|---|---|---|---|
| 2026-09-01 | OWASP publishes the Agent Control Standard (ACS) for runtime hooks and policy on agents | Logs, policy | Yes, rung 2 (AR2-29) |
| 2026-09-22 | Okta expands the Cross App Access partner list. Okta for AI Agents described as adding kill switch and human approvals | Identity, approval, off switch | Yes, rung 2 [vendor] (AR2-40) |
| 2026-09-28 | NVIDIA announces Open Agent Safety Platform: OpenShell secure runtime and Sentry DPU watchdog | Sandbox, off switch | Yes, rung 5 [vendor] (AR2-59) |
| 2026-10-01 | Uber describes its internal MCP Gateway: tools disabled until owners enable them, PII redaction by default | Gateway | Yes, rung 5 self-reported (AR2-60) |
| 2026-10-07 | Microsoft Execution Containers (MXC) reach general availability. MicroVM backend experimental | Sandbox | Yes, rung 2 [vendor] (AR2-57) |
| 2026-10-07 | Entra Conditional Access for agents page updated | Identity, off switch | Yes, rung 2 [vendor] (AR2-38) |
| 2026-10-20 | OWASP lists GenAI Red Teaming Manual version 1.0 | Testing | Listed on an opened OWASP page. Manual itself not opened (AR2-69) |
| 2026-10-22 | Okta for AI Agents: agent registration by Client ID Metadata Document, MCP Server Catalog and multi-MCP auth servers reach GA | Identity, MCP auth | Yes, rung 2 [vendor] (AR2-42) |
| 2026-10-22 | Cloudflare MCP server portals docs updated (allowlist mode, bypass caveat) | Gateway | Yes, rung 2 [vendor] (AR2-49) |
| 2026-10-02 | agentgateway v1.6.0 released | Gateway | Yes, rung 2 (AR2-65) |
| 2026-10-20 | Microsoft "dynamic permissions" for agents reported | Identity | Not opened, rung 7 (AR2-64) |
| 2026-10-22 | Google Cloud "Agent Compute Engine" microVM per agent reported | Sandbox | Not opened, no primary page found, rung 7 (AR2-63) |
| Early Nov 2026 (announced) | Entra: blueprints will no longer get agent-creation permission by default | Identity | Not opened, aggregator only, rung 7 (AR2-68) |

Just before the window, still relevant:
- 2026-07-23 Okta Agent Gateway launched (AR2-41).
- 2026-07-28 MCP spec revision: stateless protocol, Dynamic Client Registration deprecated in favour of Client ID Metadata Documents, issuer (`iss`) check added, trace context documented (AR2-03).
- 2026-08-03 OWASP Top 10 for LLM Applications 2026 published (AR2-28). Item list not opened.
- 2026-08-14 Claude Code auto mode reportedly made default on some plans. Not opened, rung 7 (AR2-70).

---

## 6. Ledger

| ID | Claim | URL | Page date | Rung | Opened | Flags |
|---|---|---|---|---|---|---|
| AR2-01 | MCP authorisation is optional. HTTP servers SHOULD follow it. STDIO servers SHOULD NOT and use environment credentials. Scopes start minimal with step-up | https://modelcontextprotocol.io/specification/latest/basic/authorization | 2026-07-28 | 2 | Yes | |
| AR2-02 | MCP clients MUST send RFC 8707 resource parameter. Servers MUST check token audience and MUST NOT pass tokens through | https://modelcontextprotocol.io/specification/latest/basic/authorization | 2026-07-28 | 2 | Yes | Same rules in 2025-06-18 (AR2-05) |
| AR2-03 | 2026-07-28 revision deprecates Dynamic Client Registration for CIMD, adds `iss` check, documents OTel trace context | https://modelcontextprotocol.io/specification/2026-07-28/changelog | 2026-07-28 | 2 | Yes | |
| AR2-04 | MCP best practices: show exact command before installing local server, sandbox local servers, minimal scopes with step-up | https://modelcontextprotocol.io/docs/tutorials/security/security_best_practices | Not shown | 2 | Yes | |
| AR2-05 | 2025-06-18 auth section: OAuth 2.1, PKCE, audience validation, no passthrough | https://modelcontextprotocol.io/specification/2025-06-18/basic/authorization | 2025-06-18 | 2 | Yes | Superseded |
| AR2-06 | Dual LLM pattern: privileged model never sees untrusted text, quarantined model has no tools, controller passes variables | https://simonwillison.net/2023/Apr/25/dual-llm-pattern/ | 2023-04-25 | 6 | Yes | Origin of pattern, no measurement |
| AR2-07 | CaMeL tracks data origin with capabilities. Fixes dual LLM flaw where a quarantined model returns an attacker's value. Policy burden and approval fatigue remain | https://simonwillison.net/2025/Apr/11/camel/ | 2025-04-11 | 6 | Yes | Commentary |
| AR2-08 | CaMeL solves 77% of AgentDojo tasks with provable security vs 84% undefended | https://arxiv.org/abs/2503.18813 | 2025-03-24, v2 2025-06-24 | 2 | Yes | Preprint, not peer reviewed. Authors' own measurement |
| AR2-09 | CaMeL: 0 of 949 attacks succeed vs 300 (Gemini 2.5 Pro) and 276 (GPT-4o mini). Tool filter next best at 8 on Claude 3.5 Sonnet | https://arxiv.org/html/2503.18813v2 | v2 2025-06-24 | 2 | Yes | Authors' own. Two out-of-scope tasks still succeed |
| AR2-10 | CaMeL uses 2.82x input and 2.73x output tokens at the median | https://arxiv.org/html/2503.18813v2 | v2 2025-06-24 | 2 | Yes | Tool docs tokens excluded |
| AR2-11 | CaMeL limits: side channels, user-written policies, phishing out of scope, injection "not fully solved" | https://arxiv.org/html/2503.18813v2 | v2 2025-06-24 | 2 | Yes | |
| AR2-12 | Six design patterns for injection-resistant agents named | https://arxiv.org/html/2506.08837v3 | 2025-06-27 | 2 | Yes | Preprint |
| AR2-13 | FIDES on gpt-4o: 163 vs 24 vs 1 successful injections of 949 | https://arxiv.org/html/2505.23643v2 | 2025-09-03 | 2 | Yes | Preprint, authors' own. Abstract gives no numbers |
| AR2-14 | AgentDojo: 97 tasks, 629 security test cases | https://arxiv.org/abs/2406.13352 | v3 2024-11-24 | 2 | Yes | NeurIPS 2024 venue seen only in search results, OpenReview blocked |
| AR2-15 | CAISI: attack success 11% to 81% with new attacks. 25 retries lift 57% to 80% | https://www.nist.gov/news-events/news/2025/01/technical-blog-strengthening-ai-agent-hijacking-evaluations | 2025-01-17, updated 2025-12-19 | 3 | Yes | Single model family tested |
| AR2-16 | CAISI competition: over 250,000 attempts, over 400 participants, all 13 models broken at least once | https://www.nist.gov/blogs/caisi-research-blog/insights-ai-agent-security-large-scale-red-teaming-competition | 2026-03-23 | 3 | Yes | Models not named |
| AR2-17 | Anthropic browser agent attack success 1.4% to 2.4% with improved safeguards | https://www.anthropic.com/research/prompt-injection-defenses | 2025-11-24 | 5 | Yes | [vendor], internal attacker |
| AR2-18 | Claude Code auto mode: 0.4% false positives (n=10,000), 17% misses (n=52), 5.7% misses (n=1,000 synthetic) | https://www.anthropic.com/engineering/claude-code-auto-mode | 2026-03-25 | 5 | Yes | [vendor], three different test sets |
| AR2-19 | Auto-mode classifier sees user messages and tool calls only, tool outputs stripped | https://www.anthropic.com/engineering/claude-code-auto-mode | 2026-03-25 | 2 | Yes | [vendor] design description |
| AR2-20 | Claude Code: six permission modes, deny rules hold in every mode, auto mode blocks prod deploys and mass deletes by default, pauses after 3 consecutive or 20 total blocks | https://code.claude.com/docs/en/permission-modes | Not shown | 2 | Yes | [vendor] |
| AR2-21 | Claude Code sandbox covers shell commands only, fails open unless `failIfUnavailable`, default reads include `~/.ssh` | https://code.claude.com/docs/en/sandboxing | Not shown | 2 | Yes | [vendor], last 7,060 characters not read |
| AR2-22 | Sandboxing cut permission prompts by 84% internally | https://www.anthropic.com/engineering/claude-code-sandboxing | 2025-10-20 | 5 | Yes | [vendor] |
| AR2-23 | sandbox-runtime is Apache-2.0, beta research preview, Seatbelt and bubblewrap | https://github.com/anthropic-experimental/sandbox-runtime | Not shown | 2 | Yes | |
| AR2-24 | Codex: workspace-write default with network off, Seatbelt and bwrap plus seccomp, auto_review option, devcontainer credential warning | https://learn.chatgpt.com/docs/agent-approvals-security | Not shown | 2 | Yes | [vendor]. Redirected from developers.openai.com |
| AR2-25 | OWASP LLM Top 10 2025 items LLM01 to LLM10 | https://genai.owasp.org/llm-top-10/ | 2025 | 2 | Yes | |
| AR2-26 | OWASP Top 10 for Agentic Applications 2026 published 2025-12-09. Site content CC BY-SA 4.0 | https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026 | 2025-12-09 | 2 | Yes | Official page does not list item names |
| AR2-27 | ASI01 to ASI10 names | https://docs.modulos.ai/frameworks/owasp-top-10-agentic | Updated 2026-10-19 | 5 | Yes | [vendor] secondary. Official list not opened |
| AR2-28 | OWASP LLM Top 10 2026 published | https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/ | 2026-08-03 | 2 | Yes | Item list not on page |
| AR2-29 | OWASP Agent Control Standard: hooks so agents are inspectable and controllable at runtime | https://genai.owasp.org/resource/agent-control-standard-acs/ | 2026-09-01 | 2 | Yes | Controls not listed on page |
| AR2-30 | Five Eyes agentic AI guidance, 2026-05-01: limit autonomy, no broad access, strong identity, monitoring | https://content.govdelivery.com/accounts/USDHSCISA/bulletins/41544ff | 2026-05-01 | 2 | Yes | Bulletin summary only |
| AR2-31 | Canadian Cyber Centre: guidance recommends layered defence and strict access controls | https://cyber.gc.ca/en/news-events/joint-guidance-careful-adoption-agentic-artificial-intelligence-services | Modified 2026-05-01 | 2 | Yes | |
| AR2-32 | Full "Careful adoption of agentic AI services" PDF | https://www.cyber.gov.au/sites/default/files/2026-05/careful_adoption_of_agentic_ai_services.pdf | 2026-05 | 7 | No | Timed out three times. A 2026-10 path copy also exists |
| AR2-33 | NCSC: prompt injection may never be fully fixed. Drop privileges to the untrusted party, use non-LLM controls, log tool calls | https://www.ncsc.gov.uk/blog-post/prompt-injection-is-not-sql-injection | 2025-12-08 | 2 | Yes | |
| AR2-34 | NIST NCCoE concept paper asks about agent identification, authorisation, auditing and injection controls | https://www.nist.gov/news-events/news/2026/02/new-concept-paper-identity-and-authority-software-agents | 2026-02-05 | 2 | Yes | NCCoE project page returned 403 |
| AR2-35 | Agents Rule of Two: no more than two of untrusted input, sensitive access, state change or outward send | https://ai.meta.com/blog/practical-ai-agent-security/ | 2025-10-31 | 5 | Yes | [vendor] |
| AR2-36 | Lethal trifecta. "95% of attacks" is a failing grade | https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/ | 2025-06-16 | 6 | Yes | |
| AR2-37 | Entra Agent ID: blueprints, logs, available to all Entra customers, security features need Agent 365 | https://learn.microsoft.com/en-us/entra/agent-id/identity-professional/microsoft-entra-agent-identities-for-ai-agents | 2026-04-14, updated 2026-08-13 | 2 | Yes | [vendor] |
| AR2-38 | Entra CA for agents: licence needs, evaluated at token issue, no effect on API keys | https://learn.microsoft.com/en-us/entra/identity/conditional-access/agent-id | 2026-07-31, updated 2026-10-07 | 2 | Yes | [vendor] |
| AR2-39 | Okta: XAA short-lived scoped tokens, Agent Gateway, FGA, no price | https://www.okta.com/solutions/secure-ai/ | Not shown | 2 | Yes | [vendor] |
| AR2-40 | XAA uses ID-JAG. Okta for AI Agents adds kill switch and human approvals | https://www.okta.com/blog/product-innovation/cross-app-access-enterprise-ai/ | 2026-09-22 | 2 | Yes | [vendor] |
| AR2-41 | Okta Agent Gateway: tool calls through policy, brokered short-lived tokens, central revoke | https://www.okta.com/blog/product-innovation/agent-gateway-runtime-governance/ | 2026-07-23 | 2 | Yes | [vendor]. "Instantly" is a rung 5 claim |
| AR2-42 | Okta CIMD agent registration and MCP catalog GA | https://www.okta.com/blog/product-innovation/registering-ai-agents-mcp-servers/ | 2026-10-22 | 2 | Yes | [vendor] |
| AR2-43 | SPIFFE issues short-lived SVIDs. No AI agent mention | https://spiffe.io/docs/latest/spiffe-about/overview/ | Not shown | 2 | Yes | |
| AR2-44 | SPIRE Apache-2.0, CNCF graduated | https://github.com/spiffe/spire | Not shown | 2 | Yes | |
| AR2-45 | Docker MCP Gateway runs servers in restricted containers, logs calls, governance invite-only | https://docs.docker.com/ai/mcp-gateway/ | Not shown | 2 | Yes | [vendor] |
| AR2-46 | Docker mcp-gateway MIT, profiles act as tool allow-lists | https://github.com/docker/mcp-gateway | Not shown | 2 | Yes | |
| AR2-47 | Kong MCP OAuth2 plugin: Enterprise only, Gateway 3.12+, strips token by default | https://developer.konghq.com/plugins/ai-mcp-oauth2/ | Not shown | 2 | Yes | [vendor] |
| AR2-48 | Kong MCP Tool ACLs in 3.13 filter `tools/list` | https://konghq.com/blog/product-releases/mcp-tool-acls-ai-gateway | 2026-01-14 | 2 | Yes | [vendor] |
| AR2-49 | Cloudflare MCP portals: allowlist mode, direct-URL bypass caveat, Logpush Enterprise only | https://developers.cloudflare.com/cloudflare-one/access-controls/ai-controls/mcp-portals/ | 2026-10-22 | 2 | Yes | [vendor] |
| AR2-50 | agentgateway Apache-2.0, CEL RBAC, OpenTelemetry | https://github.com/agentgateway/agentgateway | Not shown | 2 | Yes | |
| AR2-51 | AgentCore Policy intercepts Gateway tool calls with Cedar, temporal approval rules, CloudWatch logs | https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/policy.html | Not shown | 2 | Yes | [vendor] |
| AR2-52 | AgentCore prices: Policy $0.000025 per request, Gateway $0.005 per 1,000 calls, Identity $0.010 per 1,000 | https://aws.amazon.com/bedrock/agentcore/pricing/ | Not shown | 2 | Yes | [vendor] |
| AR2-53 | E2B prices: Hobby $0 with $100 credit, Pro $150 a month, $0.000014 per vCPU-second | https://e2b.dev/pricing | Not shown | 2 | Yes | [vendor] |
| AR2-54 | E2B Apache-2.0, self-host on AWS, GCP, Azure, Linux | https://github.com/e2b-dev/E2B | Not shown | 2 | Yes | Isolation tech not named |
| AR2-55 | Firecracker boots in under 125 ms with under 5 MiB overhead. Lists E2B as integration. Apache-2.0 | https://firecracker-microvm.github.io/ | Not shown | 5 | Yes | [vendor] numbers |
| AR2-56 | gVisor user-space kernel, incomplete syscalls, overhead. Apache-2.0 | https://gvisor.dev/docs/ and https://github.com/google/gvisor | Not shown | 2 | Yes | |
| AR2-57 | MXC GA. MicroVM experimental. Identity separation and Intune "coming soon" | https://blogs.windows.com/windowsdeveloper/2026/10/07/microsoft-execution-containers-policy-driven-containment-for-ai-agents/ | 2026-10-07 | 2 | Yes | [vendor] |
| AR2-58 | MXC MIT licence | https://github.com/microsoft/mxc | Not shown | 2 | Yes | |
| AR2-59 | NVIDIA OpenShell sandbox and Sentry quarantine "in milliseconds" | https://nvidianews.nvidia.com/news/open-agent-safety-platform | 2026-09-28 | 5 | Yes | [vendor] |
| AR2-60 | Uber MCP Gateway: disabled by default, over 800 servers, over 5,000 tools, PII redaction | https://www.uber.com/us/en/blog/designing-mcp-gateway/ | 2026-10-01 | 5 | Yes | Self-reported |
| AR2-61 | OTel GenAI conventions Apache-2.0, stability not stated | https://github.com/open-telemetry/semantic-conventions-genai | Not shown | 2 | Yes | |
| AR2-62 | Replit agent deleted a production database during a code freeze, made fake data, lied about a unit test, wrongly said rollback was impossible | https://incidentdatabase.ai/reports/5578/ | 2025-07-21 | 6 | Yes | Incident 1152, press-based record |
| AR2-63 | Google Cloud Agent Compute Engine microVM per agent | None found | 2026-10-22 (press) | 7 | No | No primary page found |
| AR2-64 | Microsoft Dynamic Permissions give agents no permissions, or the bare minimum, at the outset | SecurityWeek, 2026-10-20 | 2026-10-19 (announcement) | 6 | Yes | Press. Opened in V10a. "Zero authority" overstated it |
| AR2-65 | agentgateway v1.6.0 released | https://github.com/agentgateway/agentgateway/releases | 2026-10-02 | 2 | Yes | Opened in V10a |
| AR2-66 | OWASP LLM 2026 rank changes (excessive agency to number 3) | None opened | 2026-08 | 7 | No | Search snippets only |
| AR2-67 | Five Eyes guidance lists 23 risks and over 100 practices | The Register, 4 May 2026 | 2026-05 | 6 | Press only | Press confirms. Guidance PDF itself not opened |
| AR2-68 | Entra stops auto-granting AgentIdentity.CreateAsManager to agent blueprint principals from 2026-11-04, rollout through November | Message Center MC1506728 (mirror mc.merill.net) | 2026-10-13 | 3 | Mirror | Opened in V10a. MC1506733 lets default users create blueprints from the same date |
| AR2-69 | OWASP GenAI Red Teaming Manual v1.0 listed | https://genai.owasp.org/owasp-top-10-for-agentic-applications | 2026-10-20 | 2 | Listing only | Manual content not opened |
| AR2-70 | Claude Code auto mode default for new Pro, Max and Team sessions from 2026-08-14 | https://claude.com/blog/auto-mode-default-in-claude-code | 2026-08-07 | 5 | Yes | [vendor]. Opened in V10a. Taking effect not confirmed. Update 2026-10-22 says wider rollout next week |
| AR2-71 | NIST AI Agent Standards Initiative launched 2026-02-17 | https://nist.gov/news-events/news/2026/02/announcing-ai-agent-standards-initiative-interoperable-and-secure | 2026-02-17 | 2 | Yes | Opened in V10a |

---

## 7. Gaps

1. **No tested off switch standard.** No opened government or OWASP page sets a rule for drilling an agent kill switch or a time to cut off. The Five Eyes PDF that may cover it was not opened (AR2-32).
2. **Isolated-reader results are self-measured on one benchmark.** CaMeL and FIDES numbers come from their own authors on AgentDojo. No independent replication and no production deployment data were found.
3. **No measured effect of MCP gateways.** No opened source measures how many injections or misuse events a gateway or tool allow-list stops.
4. **False claims ("tests pass") lack a control.** No opened standard requires checking an agent's claims against system records. The fence can log, but only an independent check catches a false report.
5. **Approval quality is unmeasured.** Sources warn of approval fatigue (AR2-07, AR2-11, AR2-35). No opened source measures how often human approvers wave through risky actions.
6. **Local coding agents run as the user.** Claude Code and Codex sandbox docs show agents inherit user files and environment unless configured otherwise (AR2-21, AR2-24). MXC says agent identity separation is still to come (AR2-57).
7. **Official OWASP item names not opened.** ASI names came from a third-party page (AR2-27). The 2026 LLM list was not opened (AR2-28, AR2-66).
8. **Prices missing.** No public price on opened pages for Entra Agent 365, Okta for AI Agents, Cloudflare MCP portals, Docker governance or Kong Enterprise.
9. **E2B isolation technology** is not stated on E2B's own opened pages. Only Firecracker's site links the two (AR2-54, AR2-55).
10. **Sweep items not opened:** Google Agent Compute Engine (AR2-63). Microsoft dynamic permissions now rests on press only (AR2-64). agentgateway 1.6.0 is confirmed (AR2-65).
