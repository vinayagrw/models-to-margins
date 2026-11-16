# G4. Solutions for themes 5, 7 and 12: spend, usage caps, outages

Researched 2026-10-25. Window for "new" items: 2026-09-25 to 2026-10-25. Ledger ids SF-D-01 onward, table at the end.

Note on method: the shared web search budget ran out late in this run. Items I could not search further are marked "not checked". Every number below comes from a page I opened, unless it says "my arithmetic".

---

## Theme 5. Spend without proven return

**1. Best fix today.** Give every AI use case a value metric, a cost feed and a written stop rule before the pilot starts, and retire use cases that miss the rule.

**2. Who owns it.** Buyer. The CIO owns the stop rules. The finance lead (or FinOps lead) owns the cost feed. Each business team head owns the value metric for their use case. Vendors supply the cost side only.

**3. First step this month.** List the top ten AI use cases. For each one write down: the value metric and its baseline, the cost source, and a dated stop rule ("if metric X is below Y by date Z, stop"). Cost sources that exist now: Microsoft 365 admin center Copilot Cost Management (SF-D-11), the OpenAI Global Admin Console and Cost API for ChatGPT and Codex (SF-D-07), GitHub Copilot usage metrics API (SF-D-08), and the Claude Code Analytics API (SF-D-30).

**4. Effort.** Medium. The cost data now comes out of vendor consoles. The value data does not. No vendor tool measures business value, so each team head has to define and collect it, and someone has to enforce the stop.

**5. Maturity.** Cost tracking is GA. Value tracking is early product at best.
- GA: GitHub Copilot usage metrics, GA 2026-02-27. It covers adoption, lines and PR throughput, and the post says moving "from tracking adoption to measuring impact" is still ahead. No cost or ROI view (SF-D-08).
- GA: OpenAI usage analytics and credit spend by user, product and model, plus a unified Cost API, for ChatGPT Enterprise, dated 2026-06-18 (SF-D-07).
- GA: Microsoft Viva Copilot Analytics spend insights (Copilot credits by group or team, Cowork and Work IQ API only), GA June 2026 (SF-D-12). It does not link spend to outcomes.
- Preview: Microsoft announced on 2026-09-25 an Insights consumption dashboard that "connects credit consumption with outcomes". All listed FinOps capabilities are in preview (SF-D-10).
- Standard: FOCUS 1.4 is the latest published billing data spec. It covers cloud and SaaS, contract commitments and invoice detail, but has no AI or token columns (SF-D-01). FOCUS 1.5 adds model identification and token price labels in its working draft, with ratification set for 2026-12-03 (SF-D-02).
- Guidance: the FinOps Foundation FinOps for AI paper lists KPIs such as cost per inference, ROI, time to business value and model fit. Last updated 2026-02-17. Its numbers are illustrations only (SF-D-03).

**6. Evidence it works.** Weak and correlational. No controlled study found.
- Best: Gartner survey of 2,002 CIOs and technology executives (May to Jul 2026). CIOs with rules for when a pilot should not move to production are 2.3 times more likely to be "vanguards". Those with rules for abandoning low-value AI in production are 2.6 times more likely. Only 31% and 17% have these rules. Rung 4 to 5 [analyst] [self-report]. Gartner does not sell the tools, so it is independent of tool vendors. It is an association, not a before-and-after result (SF-D-04).
- KPMG Q3 2026 survey of 2,131 executives: 12% consistently assess AI value against cost, rising to 48% among firms that report established ROI. Rung 5 [consulting] [self-report], correlational (SF-D-05).
- BCG Applied AI Index, 1,330 leaders, 2026-09-30: the 7.5% "future-built" firms show 2.3x shareholder return of laggards and "measure the transformative impact directly in their P&L". No effect size for the measurement itself. Rung 5 [consulting] (SF-D-06).
- DORA ROI of AI-assisted software development (page updated 2026-04-22) offers a calculator and model, not a measured effect (SF-D-09).

**7. Cost of the fix.** Not measured. The vendor dashboards come with enterprise plans and I found no separate price. The real cost is staff time to define and collect value metrics, which no source measures.

**8. What it does not fix.** It does not create value, it only shows where value is missing. Value figures stay self-reported. Cost tools cover each vendor's own products only, so spend on personal cards and other SaaS stays out until FOCUS 1.5 normalises AI billing. The Gartner and KPMG links could run the other way: firms that already get value may be the ones that bother to measure.

**9. New in the last 30 days.**
- 2026-09-25: Microsoft MC1479276. Usage-based billing for Copilot rolls out from Q4 2026, with new FinOps capabilities in preview, including a dashboard to connect credit use with outcomes (SF-D-10).
- 2026-09-30: BCG Applied AI Index (SF-D-06).
- 2026-10-08: FOCUS 1.5 member approval closed. Consistency review ran 8 to 29 October (SF-D-02).
- 2026-10-19: Gartner stop-rule finding, 2.3x and 2.6x (SF-D-04).
- 2026-10-22: GitHub adds opt-in industry comparisons to the Copilot impact dashboard (agentic adoption and PR merge rates, no cost) (SF-D-13). 2026-10-22 and 2026-10-23: the usage metrics API adds custom skills, agents, MCP servers and usage from tools like OpenCode (SF-D-14).

---

## Theme 7. Usage caps nobody can predict

**1. Best fix today.** Turn on hard per-user and per-project spending caps with threshold alerts in every vendor console, and write notice periods for allowance cuts into contracts. A true per-task cost preview still does not exist.

**2. Who owns it.** Both. Vendors own the meter, the preview and the notice. On the buyer side, the finance lead sets caps, procurement writes notice clauses, and team heads set per-user limits.

**3. First step this month.** Switch on the hard stop where it is off by default.
- GitHub: enterprise, cost center and organization budgets only alert unless "Stop usage when budget limit is reached" is on. It is off by default. User-level budgets always hard stop (SF-D-15).
- OpenAI API: set a project spend limit and turn on "Enforce a hard limit". Alerts alone "do not enforce a cap" (SF-D-16).
- Microsoft 365 Copilot: create a spending policy with a per-user monthly limit and alerts under Copilot > Cost Management (SF-D-11).
- Claude: Enterprise organisations set per-user limits. Console organisation and workspace limits through the API are in early access (SF-D-17).
Then add a clause at the next renewal requiring written notice before any cut to included usage.

**4. Effort.** Low for caps (console settings). Medium for contract clauses, which need buying power. Small buyers on consumer plans cannot negotiate.

**5. Maturity.** Caps are GA. Cost preview is early product.
- GA: GitHub user-level budgets, GA with the move to AI Credits on 2026-06-01, with email alerts as users near limits (SF-D-18).
- GA: OpenAI organisation and project hard limits returning 429 `project_spend_limit_exceeded` or `organization_spend_limit_exceeded` (SF-D-16).
- GA: Microsoft spending policies at tenant, group and user level, with policy and user threshold emails. Users who hit the limit lose access until the first of the month. Doc updated 2026-10-13 (SF-D-11).
- Early access: Anthropic Console organisation and workspace spend limits via API (SF-D-17). GA earlier: Claude Managed Agents session budgets, a hard cap that pauses a session, from 2026-08-07 (SF-D-19).
- Cost preview, partial only: Claude token counting is free but counts input tokens only and is "an estimate" (SF-D-20). Claude Code now warns on Pro and Max plans when resuming a conversation would use "a noticeable share" of the 5-hour limit (version 2.1.304, 2026-10-19), and shows dollar spend against a gateway spend limit in `/usage` (2.1.284, 2026-09-28) (SF-D-21). OpenAI documents meter weights: Fast mode uses the allowance at 2.5 times and Ultrafast at 8 times the Standard rate (SF-D-22). No vendor I checked estimates what an agent task will cost before it runs.

**6. Evidence it works.** No measured study found that caps or previews reduce surprise bills. The best evidence is design-level, from vendor docs (rung 2, not independent):
- GitHub: user-level budgets "always enforce a hard stop" (SF-D-15).
- OpenAI: hard limits cut traffic, but "enforcement is not instantaneous, so recorded spend can slightly exceed the configured amount" (SF-D-16).
- Notice periods work only where the vendor grants them. OpenAI let Pro 200 subscribers who were active from 2026-09-22 to 2026-09-29 keep the old allowance through 2026-10-29, about 30 days (my arithmetic) (SF-D-22). That is a vendor choice, not a contract term.

**7. Cost of the fix.** The caps cost nothing extra. Microsoft requires a minimum user budget of 2,000 credits per user per month in a limited policy (SF-D-11). For new Copilot Business seats the default limit is reported as 4,000 Copilot Credits per user per month [consulting] (SF-D-23), while another partner reports a $10 per user default [consulting] (SF-D-24). These conflict and I could not open Microsoft's own message (MC1476200 returned 404).

**8. What it does not fix.** A cap turns a cost surprise into a stopped user or a failed request, which feeds theme 12. On flat-fee plans (ChatGPT Pro, Claude Max) the vendor sets the cap and the buyer cannot raise it. Meter weighting is still opaque per task. Vendors can still cut allowances on their own terms. Enforcement lags, so spend can pass the cap a little.

**9. New in the last 30 days.**
- 2026-09-25: Microsoft MC1479276, usage-based billing in Copilot from Q4 2026, admin spending policies, and end-user views of remaining credits and limit banners in Cowork (SF-D-10).
- 2026-09-28: Claude Code shows dollar spend against the gateway spend limit (SF-D-21).
- 2026-09-29: OpenAI Pro 500 plan and lower Pro 200 allowance, with grandfathering to 2026-10-29 (SF-D-22).
- 2026-10-08: GitHub lets organisations bill Copilot code review to the org with an optional budget. With member billing, "If the member's quota is exhausted, the code review fails" (SF-D-25). 2026-10-13: search and filter across all budgets (SF-D-26).
- 2026-10-13: Microsoft spending policy doc updated (SF-D-11).
- 2026-10-19: Claude Code resume-cost warning (SF-D-21).
- Copilot Business default usage billing for new CSP seats moves to 2026-12-01, from 2026-11-02 [consulting] (SF-D-23).
- GitHub Copilot billing change on 2026-10-01: none found. I paged the GitHub changelog feed from 2026-09-17 to 2026-10-23 and found no billing change on that date. The switch to AI Credits was 2026-06-01 (SF-D-18).
- Cost-preview launch: none found beyond the Claude Code resume warning.

---

## Theme 12. Outages and capacity shortfalls

**1. Best fix today.** Route traffic through a gateway that fails over to a second provider or cloud, and alert on each vendor's actual spend-limit and billing error codes so an account fault is told apart from an outage.

**2. Who owns it.** Buyer. The platform or engineering lead builds the gateway and alerts. The CIO and procurement hold a second contract. Vendors own the SLA and status reporting.

**3. First step this month.** Pick the most critical workload and add a second route. Then fix alerting, because the existing fix line says "402" and that is too narrow:
- Anthropic returns 400 `invalid_request_error` when an organisation or workspace spend limit you set is reached, 429 for a tier spend cap with no `retry-after` header that "keeps failing until access resumes", and 402 `billing_error` for payment problems (SF-D-27).
- OpenAI returns 429 with `project_spend_limit_exceeded` or `organization_spend_limit_exceeded` (SF-D-16).
Subscribe to each vendor's status feed as well (SF-D-28).

**4. Effort.** Medium. A second provider means a second contract, a second evaluation, and prompts that may not transfer (theme 14). Keeping conversation state across a switch needs extra work (SF-D-35).

**5. Maturity.** Failover tooling is GA. SLAs exist for paid API tiers, mostly at 99.5% to 99.9%.
- GA: AWS Bedrock cross-Region inference, geographic or global profiles. AWS itself says "to meet an availability target, add bounded retries and multi-Region or multi-model fallback in your application" (SF-D-31).
- GA: Azure Foundry Global, Data Zone and Provisioned deployments. Microsoft says Standard types are best effort, and that with Global Standard and Data Zone Standard a primary region interruption affects all traffic routed there. Developer deployments have no SLA (SF-D-32).
- GA: gateway fallback in LiteLLM (retries, cooldowns, cross-provider fallbacks) (SF-D-33), Portkey (fallback on any non-2xx code by default) (SF-D-34), OpenRouter (provider failover on by default) (SF-D-36), and the Claude apps gateway, which fails over across Bedrock, Vertex and Foundry upstreams. Version 2.1.295 (2026-10-08) added an upstream first-byte timeout after which it "fails over or gets a 502" (SF-D-21).
- SLAs: Google Gemini Online Inference on the Agent Platform targets 99.5% monthly uptime, 95% for models marked for shorter availability. Credits are 10%, 25% and 50% of the monthly bill (SF-D-37). OpenAI Scale Tier offers a 99.9% uptime SLA and a 99% latency SLA, but only for models before GPT-5.6. Newer models use Reserved Tier, which I did not check (SF-D-38). Anthropic Priority Tier "targets 99.5 percent uptime" but is "no longer available for purchase" (SF-D-39). Azure: Microsoft's consolidated SLA download was blocked (403), so the Azure figure is unverified. No SLA found for consumer chat apps (not checked further).

**6. Evidence it works.** No measured uptime gain from failover found. The best related results:
- ContinuityBench preprint, 750 failover events. A stateful proxy kept conversation history in 99.20% of failovers (95% CI 98.27% to 99.63%), against near 0% for stateless failover. It measures state kept, not uptime. Rung 3 [preprint], independent of gateway vendors as far as the abstract shows (SF-D-35).
- FailureAtlas preprint: the worst multi-provider failures are silent. They "return HTTP 200, pass every standard health check" while corrupting state. Rung 3 [preprint] (SF-D-40).
- My arithmetic: two providers each at 99.58% that fail independently would give about 99.998% combined. Independence is not proven, and shared cloud regions or shared upstream capacity would cut the gain.

**7. Cost of the fix.** Bedrock cross-Region inference has no extra routing cost, and global profiles save about 10% (SF-D-31). OpenAI Scale Tier for GPT-5.5 is listed at $750.00 per 50,000 TPM input unit per day (SF-D-38). Gateway overhead and the cost of a second contract: not measured.

**8. What it does not fix.** Correlated failures across clouds that serve the same model. A fault in one vendor's account layer, unless the second route bills through a separate account (the 2026-10-07 fault hit the API, Claude.ai, Claude Code, Claude Security and Claude Cowork together). Consumer chat apps, where the user cannot reroute. Silent failures that return 200. Status pages that show green during an outage. Lost context on switch, unless the gateway forwards history.

**9. New in the last 30 days.**
- 2026-10-01: Claude Platform incident. Delayed credit purchases made "some requests failing for insufficient credit balance" (SF-D-28).
- 2026-10-07: Anthropic "Issue with spend limits". Some organisations were "incorrectly paused for having reached their spend limit", refusing requests across five products. The incident page has one resolved update at 21:23 UTC, no start time, no root cause and no postmortem (SF-D-29). I found no post-incident change in the Claude platform release notes from 2026-10-07 to 2026-10-22 (SF-D-30). The same day, usage data on the Console and the Admin API usage report failed from 00:00 to 01:40 UTC (SF-D-28).
- 2026-10-08: Gemini app outage, nearly 10,000 Downdetector reports by 9:40 a.m. PT, with Google's status page still showing "All systems operational" (SF-D-41, press). Google's Workspace status feed has no Gemini incident on that date, and the Google Cloud feed shows only a Cloud Storage incident from 2026-10-08 11:00 to 2026-10-09 16:46 UTC (SF-D-42). No post-incident note found.
- 2026-10-08: Claude apps gateway upstream timeouts that trigger failover (SF-D-21).
- 2026-10-22: Anthropic launches Claude Models on Google Cloud (Anthropic managed), another route to the same models (SF-D-30).
- Claude status feed: 13 incidents from 1 to 25 October 2026, my count of the feed (SF-D-28).

---

## Ledger

| id | claim | URL | date | rung | opened | flags |
|---|---|---|---|---|---|---|
| SF-D-01 | FOCUS 1.4 is the latest published version. Covers SaaS, contract commitments, invoice detail. No AI or token mention. Home page says FOCUS normalises billing "across AI, cloud, SaaS" | https://focus.finops.org/docs/specification/v1-4/ and https://focus.finops.org/ | 2026 (no release date on page) | 2 | verified, WebFetch | standards body |
| SF-D-02 | FOCUS 1.5 working draft: model identification and token price label properties, worked AI billing examples incl. prepayment drawdown. Member approval closed 8 Oct, consistency review 8 to 29 Oct, ratification 3 Dec 2026 | https://focus.finops.org/?p=19885 | page updated Oct 2026 | 2 | verified, WebFetch | standards body, draft |
| SF-D-03 | FinOps for AI KPIs (cost per inference, ROI, time to value, model fit). Numbers illustrative only. Updated 2026-02-17 | https://www.finops.org/wg/finops-for-ai-overview/ | 2026-02-17 | 2 | verified, WebFetch | standards body, guidance |
| SF-D-04 | Pilot stop rules: 2.3x more likely to be vanguards. Production abandon rules: 2.6x. Only 31% and 17% have them. 2,002 CIOs and tech executives, May to Jul 2026. Vanguards are 11% | Gartner release (403) read via Business Wire reprint https://finviz.com/news/404126/gartner-survey-finds-only-13-of-cios-say-their-enterprise-has-realized-significant-or-transformational-value-from-ai and https://informationweek.com/responsible-ai/cios-winning-the-ai-race-know-when-to-slow-down | 2026-10-19 | 5 | verified, curl of verbatim wire reprint and press. Gartner page itself 403 | [analyst] [self-report], correlational |
| SF-D-05 | 12% consistently assess AI value against cost, 48% among firms reporting established ROI. 2,131 executives, 20 countries | https://kpmg.com/xx/en/media/press-releases/2026/09/new-kpmg-ai-pulse-survey-as-ai-maturity-converges-leading-organizations-show-what-ai-at-scale-requires.html | 2026-09-24 | 5 | verified, WebFetch | [consulting] [self-report] |
| SF-D-06 | 1,330 leaders. 7.5% future-built: 2.3x TSR, 2.4x revenue growth, 2.8x EBITDA growth vs laggards. Leaders measure impact in their P&L | https://www.bcg.com/press/30september2026-ai-starting-to-pay-off-companies-generate-value | 2026-09-30 | 5 | verified, WebFetch | [consulting] [self-report] |
| SF-D-07 | OpenAI: Global Admin Console shows ChatGPT and Codex credit use by user, product, model. Unified Cost API. Granular credit limits for custom roles | https://openai.com/index/chatgpt-enterprise-spend-controls/ | 2026-06-18 | 2 | verified, Wayback capture 2026-08-13 via curl (live page 403) | [vendor] |
| SF-D-08 | GitHub Copilot usage metrics GA. Adoption, lines, PR throughput. No cost or ROI view. Impact measurement named as future work | https://github.blog/changelog/2026-02-27-copilot-metrics-is-now-generally-available | 2026-02-27 | 2 | verified, WebFetch | [vendor] |
| SF-D-09 | DORA ROI report landing page, calculator, last updated 2026-04-22. No measured effect on page | https://dora.dev/ai/roi/ | 2026-04-22 | 5 | verified, WebFetch (landing page only, full report not opened) | [vendor] (Google) |
| SF-D-10 | MC1479276: UBB rolls out in Copilot from Q4 CY2026. FinOps capabilities in preview Sept 2026. Insights consumption dashboard to connect credit use with outcomes. End-user credit visibility GA Sept 2026. UBB not functional in Enterprise tenants until an admin creates a spending policy | https://mc.merill.net/message/MC1479276 | 2026-09-25 | 2 | verified, WebFetch (mirror of Microsoft message center) | [vendor] |
| SF-D-11 | Microsoft spending policies: tenant, group, user scope. Monthly limits, policy and user threshold emails. Users at limit lose access until the first of the month. Minimum 2,000 credits per user per month. Doc updated 2026-10-13 | https://learn.microsoft.com/en-us/microsoft-365/copilot/usage-based-billing-manage-copilot-credits | 2026-10-13 | 2 | verified, WebFetch | [vendor] |
| SF-D-12 | RM566302: Viva Copilot Analytics spend insights for Cowork and Work IQ API, by group or team. Launched, GA June 2026. No outcome link | https://mc.merill.net/message/RM566302 | 2026-06-19 | 2 | verified, WebFetch (roadmap mirror) | [vendor] |
| SF-D-13 | Copilot impact dashboard adds opt-in industry comparisons of agentic adoption and leverage (PR merge rates). Not in the API | https://github.blog/changelog/2026-10-22-industry-comparisons-in-the-copilot-impact-dashboard | 2026-10-22 | 2 | verified, WebFetch | [vendor] |
| SF-D-14 | Usage metrics API adds custom skills, agents and MCP servers (10-22) and usage from tools like OpenCode (10-23) | https://github.blog/changelog/feed/ (items dated 2026-10-22 and 2026-10-23) | 2026-10-22, 2026-10-23 | 2 | verified, curl of feed (titles only) | [vendor] |
| SF-D-15 | GitHub: "Stop usage when budget limit is reached" off by default for enterprise, cost center and org budgets. User-level budgets "always enforce a hard stop" | https://docs.github.com/en/copilot/concepts/billing/budgets-for-usage-based-billing | current | 2 | verified, WebFetch | [vendor] |
| SF-D-16 | OpenAI: org and project hard limits return 429 with named codes. Alerts do not enforce a cap. Enforcement not instantaneous | https://developers.openai.com/api/docs/guides/spend-limits | current, undated | 2 | verified, WebFetch | [vendor] |
| SF-D-17 | Anthropic: Enterprise orgs set user limits. Console orgs set organization and workspace limits, monthly, in early access preview | https://platform.claude.com/docs/en/api/beta/organization/spend_limits.md | current | 2 | verified, WebFetch | [vendor] |
| SF-D-18 | GitHub user-level budgets GA, email alerts near budget. As of June 1 all Copilot plans bill on AI Credits | https://github.blog/changelog/2026-05-29-updates-to-github-copilot-billing-and-plans | 2026-05-29 (page shows 2026-06-01) | 2 | verified, WebFetch | [vendor] |
| SF-D-19 | Claude Managed Agents session budgets: hard cap at list rates, session pauses with `budget_reached` | https://platform.claude.com/docs/en/release-notes/overview.md (entry 2026-08-07) | 2026-08-07 | 2 | verified, curl | [vendor] |
| SF-D-20 | Claude token counting is free, gives an estimate of input tokens | https://platform.claude.com/docs/en/build-with-claude/token-counting.md | current | 2 | verified, curl | [vendor] |
| SF-D-21 | Claude Code changelog: 2.1.284 dollar spend vs gateway spend limit in /usage (npm 2026-09-28). 2.1.295 gateway upstream first-byte timeout then failover (npm 2026-10-08). 2.1.304 warning when resuming would use a noticeable share of 5-hour limit (npm 2026-10-19) | https://raw.githubusercontent.com/anthropics/claude-code/main/CHANGELOG.md with dates from https://registry.npmjs.org/@anthropic-ai/claude-code | 2026-09-28 to 2026-10-19 | 2 | verified, curl | [vendor] |
| SF-D-22 | OpenAI Pro tiers: Pro 100, 200, 500. Pro 200 grandfathering for subscribers active 2026-09-22 to 2026-09-29, old allowance through 2026-10-29. Fast 2.5x and Ultrafast 8x allowance rates | https://help.openai.com/en/articles/9793128-about-chatgpt-pro-tiers | capture 2026-10-11 | 2 | verified, Wayback via curl (live page 403) | [vendor] |
| SF-D-23 | Copilot Business UBB default for new CSP seats on 2026-12-01 (moved from 2026-11-02), default limit 4,000 Copilot Credits per user per month | https://www.2tolead.com/insights/microsoft-365-copilot-licensing-changes-december-2026 | Oct 2026 | 5 | verified, curl | [consulting] (Microsoft partner) |
| SF-D-24 | Same change, default spending limit $10 per user per month (conflicts with SF-D-23) | https://stoneridgesoftware.com/automatic-usage-based-billing-is-coming-to-microsoft-365-copilot-business/ | 2026-09-21 | 5 | verified, curl | [consulting] (Microsoft partner) |
| SF-D-25 | Copilot code review billing to org with optional budget. Member billing: review fails when quota is exhausted | https://github.blog/changelog/2026-10-08-copilot-code-review-new-organization-billing-options-and-controls | 2026-10-08 | 2 | verified, WebFetch | [vendor] |
| SF-D-26 | Budgets and alerts page: search and filter all budgets, including user-level | https://github.blog/changelog/2026-10-13-search-and-filter-for-budgets-now-available | 2026-10-13 | 2 | verified, WebFetch | [vendor] |
| SF-D-27 | Anthropic errors: 400 when an org or workspace spend limit you set is reached. 429 for tier spend cap, no retry-after. 402 billing_error for payment | https://platform.claude.com/docs/en/api/errors.md | current | 2 | verified, curl | [vendor] |
| SF-D-28 | Claude status feed: 13 incidents 1 to 25 Oct 2026. Incidents 2026-10-01 delayed credits causing insufficient balance failures, 2026-10-07 usage data errors 00:00 to 01:40 UTC | https://status.claude.com/history.rss | 2026-10-25 | 2 | verified, curl, my count | [vendor] |
| SF-D-29 | "Issue with spend limits": some orgs incorrectly paused for spend limit, refused requests on API, Claude.ai, Claude Code, Claude Security, Claude Cowork. One resolved update 21:23 UTC, no root cause | https://status.claude.com/incidents/vmys9qn874h4 | 2026-10-07 | 2 | verified, WebFetch and RSS | [vendor] |
| SF-D-30 | Claude platform release notes 2026-09-28 to 2026-10-22: no spend-limit change listed. 2026-10-22 Claude Models on Google Cloud (Anthropic managed). Earlier entry: Claude Code Analytics API with cost data | https://platform.claude.com/docs/en/release-notes/overview.md | 2026-10-22 | 2 | verified, curl | [vendor] |
| SF-D-31 | Bedrock cross-Region inference: geographic and global profiles, no extra routing cost, global about 10% savings, add retries and multi-Region or multi-model fallback to meet availability targets | https://docs.aws.amazon.com/bedrock/latest/userguide/cross-region-inference.html | current | 2 | verified, WebFetch | [vendor] |
| SF-D-32 | Foundry deployment types: SLA varies by type, Standard best effort, Developer no SLA, primary region interruption affects all Global Standard and Data Zone Standard traffic routed there | https://learn.microsoft.com/en-us/azure/ai-foundry/openai/how-to/deployment-types | 2026-08-12 | 2 | verified, WebFetch | [vendor] |
| SF-D-33 | LiteLLM fallbacks across providers, retries, cooldowns. No measured availability | https://docs.litellm.ai/docs/proxy/reliability | current | 2 | verified, WebFetch | [vendor] |
| SF-D-34 | Portkey fallback triggers on any non-2xx by default. No measured availability | https://portkey.ai/docs/product/ai-gateway/fallbacks | current | 2 | verified, WebFetch | [vendor] |
| SF-D-35 | ContinuityBench: 750 failover events, stateful proxy 99.20% continuity (CI 98.27% to 99.63%), stateless near 0%. No uptime figure | https://arxiv.org/abs/2607.15899 | 2026-07-17 | 3 | verified, WebFetch (abstract) | [preprint] |
| SF-D-36 | OpenRouter: provider failover automatic and on by default. No measured success rates. Updated 2026-09-24 | https://openrouter.ai/blog/insights/reliability-failover/ | 2026-09-24 | 2 | verified, WebFetch | [vendor] |
| SF-D-37 | Gemini Online Inference API SLA: 99.5% monthly uptime, 95% for shorter-availability models, credits 10% / 25% / 50%. Provisioned Throughput has a latency SLO | https://cloud.google.com/vertex-ai/generative-ai/sla?hl=en | last modified 2026-06-30 | 2 | verified, curl | [vendor] |
| SF-D-38 | OpenAI Scale Tier: 99.9% uptime SLA, 99% latency SLA, GPT-5.5 50,000 TPM input unit $750.00 per unit per day. Only models before GPT-5.6, newer use Reserved Tier | https://openai.com/api-scale-tier/ | capture 2026-10-15 | 2 | verified, Wayback via curl | [vendor] |
| SF-D-39 | Anthropic Priority Tier targets 99.5% uptime, no longer available for purchase, existing commitments run to contract end | https://platform.claude.com/docs/en/api/service-tiers.md | current, date of change not stated | 2 | verified, curl | [vendor] |
| SF-D-40 | FailureAtlas: most severe multi-provider failures are silent, return HTTP 200 and pass health checks | https://arxiv.org/abs/2607.17525 | 2026-07-20 | 3 | verified, WebFetch (abstract) | [preprint] |
| SF-D-41 | Gemini outage 2026-10-08, nearly 10,000 Downdetector reports by 9:40 a.m. PT, status page showed all systems operational, no Google acknowledgement | https://ascendants.in/industry_events/is-google-gemini-down-outage-today-october-8-2026/ | 2026-10-08 | 6 | verified, WebFetch | press |
| SF-D-42 | Google Workspace status feed: no Gemini incident on 2026-10-08. Google Cloud feed: Cloud Storage incident 2026-10-08 11:00 to 2026-10-09 16:46 UTC | https://www.google.com/appsstatus/dashboard/incidents.json and https://status.cloud.google.com/incidents.json | 2026-10-25 | 2 | verified, curl | [vendor] |
| SF-D-43 | Azure OpenAI 99.9% uptime SLA and credit ladder | https://www.microsoft.com/licensing/docs/view/Service-Level-Agreements-SLA-for-Online-Services | Oct 2026 version listed | 7 | unverified, SLA docx download returned 403. Figures seen only in search snippets of a third-party advisor. Not used as evidence | [vendor] |
