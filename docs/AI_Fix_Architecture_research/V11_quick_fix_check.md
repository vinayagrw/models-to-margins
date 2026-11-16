# V11. Check of the interim quick-fix briefs

Check date 2026-10-26. Scope: every ledger row and every quick-fix claim in Q_interim_fixes_search.md (S1 to S10, Q-S01 to Q-S31) and Q_interim_fixes_frontier.md (F1 to F14, Q-F01 to Q-F24). Every URL was re-opened in this session. Most were read with WebFetch. Five pages returned 403 to WebFetch and were read in the built-in browser instead. Two PDFs (NIST AI 600-1 and OMB M-25-22) were downloaded and their text extracted before the phrase search.

Status meaning. Verified: the page opened and holds the claim and the quote. Unverified: the page would not open, or it does not say what the row says. Wrong: the page says something different from the row.

## Counts

| Brief | Rows | Verified | Unverified | Wrong |
|---|---|---|---|---|
| Q_interim_fixes_search (Q-S01 to Q-S31) | 31 | 30 | 0 | 1 |
| Q_interim_fixes_frontier (Q-F01 to Q-F24) | 24 | 24 | 0 | 0 |
| Quick-fix table claims, search (S1 to S10) | 10 | 10 | 0 | 0 |
| Quick-fix table claims, frontier (F1 to F14) | 14 | 14 | 0 | 0 |

## Wrong items and exact corrections

One item. It is a page-date drift, not a claim error. The help-center page shows a relative date and the label moved by one day since the brief was written. The claim and quote in the row are unchanged and hold.

| Id | Field | Old value | New value | Why |
|---|---|---|---|---|
| Q-S06 | Page date | Page says "Updated: 6 days ago" on 2026-10-26, about 2026-10-20 | Page says "Updated: 7 days ago" on 2026-10-26, about 2026-10-19 | Page label read on 2026-10-26 says 7 days |
| Q-S07 | Page date | About 2026-10-20 | About 2026-10-19 | Same page as Q-S06 |
| Q-S09 | Page date | About 2026-10-20 | About 2026-10-19 | Same page as Q-S06 |
| Q-S22 | Page date | About 2026-10-20 | About 2026-10-19 | Same page as Q-S06 |

Two gap notes in the search brief were updated because the check closed them:

| Section | Old text | New text |
|---|---|---|
| Gaps | The OpenAI open_page detail ("supported in reasoning models") came from a tool summary of the page, not a line read in full. | The OpenAI open_page detail was re-read on 2026-10-26 in the V11 check. The page line is "`open_page`, which represents a page being opened. Supported in reasoning models." |
| Gaps | Help center dates are relative ("6 days ago") | Help center dates are relative ("7 days ago") |

No claim text, quote, URL, rung or quick-fix wording was changed in either brief. The frontier brief was not edited.

## Still unverified

None. Every row opened and every quote was found on its page.

Notes that are not failures:

- Q-F11 URL (platform.claude.com/docs/en/about-claude/models/overview) redirects to /docs/en/models/overview. The content opened and holds the quote.
- Q-F18: the phrase "restrict pull request creation to collaborators only" appears in the image alt text of the GitHub changelog post, not in the body text. The post body describes the same setting.
- Q-F13: the page text reads "`NoAutoUpgrade` (never auto-upgrade, deployment stops working at retirement)". The ledger quote uses a comma where the page uses a dash. Same words.
- Q-F15: the page says setting organization and workspace limits "is in an early access preview". The ledger says "early access only". Same meaning.
- Q-S29: the OWASP page carries no article date, only a 2025 copyright. Matches the row.

## Full rows

Quotes are under 15 words. "Opened with" says how the page was read on 2026-10-26.

### Search brief ledger (Q-S01 to Q-S31)

| Id | Status | URL opened | Opened with | Quote found |
|---|---|---|---|---|
| Q-S01 | verified | https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf | WebFetch, PDF text extracted | "MS-2.5-003 Review and verify sources and citations in GAI system outputs" |
| Q-S02 | verified | https://platform.claude.com/docs/en/agents-and-tools/tool-use/web-search-tool | WebFetch | "Citations are always enabled for web search" |
| Q-S03 | verified | https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations | WebFetch | "If it can't find a quote, it must retract the claim." |
| Q-S04 | verified | https://platform.claude.com/docs/en/agents-and-tools/tool-use/web-search-tool | WebFetch | "the Claude API still returns a 200 (success) response" |
| Q-S05 | verified | https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf | WebFetch, PDF text extracted | "MG-4.3-002 ... record and track GAI system reported errors, near-misses" |
| Q-S06 | wrong (page date only, corrected) | https://help.openai.com/en/articles/10500283-deep-research-in-chatgpt | Browser (WebFetch 403) | "An activity history showing how the research progressed" |
| Q-S07 | verified | https://help.openai.com/en/articles/10500283-deep-research-in-chatgpt | Browser (WebFetch 403) | "You can review and modify it before the research begins." |
| Q-S08 | verified | https://support.google.com/gemini/answer/15719111?hl=en | WebFetch | "To update the research plan before you create a report, click Edit plan." |
| Q-S09 | verified | https://help.openai.com/en/articles/10500283-deep-research-in-chatgpt | Browser (WebFetch 403) | "go to Sites > Manage sites" and "restrict research to only the websites" |
| Q-S10 | verified | https://platform.claude.com/docs/en/agents-and-tools/tool-use/web-search-tool | WebFetch | "where they can also restrict which domains it searches" |
| Q-S11 | verified | https://developers.openai.com/api/docs/guides/tools-web-search | WebFetch | "configure up to 100 allowed_domains or up to 100 blocked_domains" |
| Q-S12 | verified | https://docs.perplexity.ai/guides/search-domain-filters | WebFetch | "You can add a maximum of 20 domains to the search_domain_filter list." |
| Q-S13 | verified | https://platform.claude.com/docs/en/agents-and-tools/tool-use/web-search-tool | WebFetch | "page_age: When the site was last updated" |
| Q-S14 | verified | https://platform.claude.com/docs/en/agents-and-tools/tool-use/web-fetch-tool | WebFetch | "Set "use_cache": false to bypass the cache and fetch fresh content." |
| Q-S15 | verified | https://docs.perplexity.ai/guides/date-range-filter-guide | WebFetch | "Recency filters use predefined values like "hour", "day", "week", "month", or "year"." |
| Q-S16 | verified | https://support.claude.com/en/articles/14546867-set-organization-instructions | WebFetch | "custom instructions that Claude follows in every conversation across your organization" |
| Q-S17 | verified | https://developers.openai.com/api/docs/guides/tools-web-search | WebFetch | "open_page, which represents a page being opened. Supported in reasoning models." |
| Q-S18 | verified | https://developers.openai.com/api/docs/guides/tools-web-search | WebFetch | "To view all URLs retrieved during a web search, use the sources field." |
| Q-S19 | verified | https://platform.claude.com/docs/en/agents-and-tools/tool-use/web-fetch-tool | WebFetch | "citations are optional for web fetch and disabled by default" |
| Q-S20 | verified | https://platform.claude.com/docs/en/agents-and-tools/tool-use/web-fetch-tool | WebFetch | "does not support websites dynamically rendered with JavaScript" |
| Q-S21 | verified | https://platform.claude.com/docs/en/agents-and-tools/tool-use/web-fetch-tool | WebFetch | "url_not_accessible: Failed to fetch content (HTTP error)" |
| Q-S22 | verified | https://help.openai.com/en/articles/10500283-deep-research-in-chatgpt | Browser (WebFetch 403) | "It can work with uploaded files, search the public web or specific sites" |
| Q-S23 | verified | https://arxiv.org/abs/2607.08456 | WebFetch | "disputes sound and false premises alike (57% false challenges)" |
| Q-S24 | verified | https://developers.openai.com/api/docs/guides/tools-web-search | WebFetch | "Use tool_choice: "required" or a specific web search tool choice when search must run." |
| Q-S25 | verified | https://support.claude.com/en/articles/13065128-claude-in-chrome-admin-controls | WebFetch | "The extension is on by default unless you've already disabled it." |
| Q-S26 | verified | https://support.claude.com/en/articles/13065128-claude-in-chrome-admin-controls | WebFetch | "Start with a more restrictive allowlist" |
| Q-S27 | verified | https://help.openai.com/en/articles/11750701-managing-feature-access-with-role-based-access-control-in-chatgpt | Browser (WebFetch 403) | "restrict network-enabled capabilities, including live web search, deep research, agent mode" |
| Q-S28 | verified | https://help.openai.com/en/articles/11750701-managing-feature-access-with-role-based-access-control-in-chatgpt | Browser (WebFetch 403) | "one role can allow access even if another turns it off" |
| Q-S29 | verified | https://genai.owasp.org/llmrisk/llm01-prompt-injection/ | WebFetch | "Require human approval for high-risk actions" |
| Q-S30 | verified | https://platform.claude.com/docs/en/agents-and-tools/tool-use/web-fetch-tool | WebFetch | "Only use this tool in trusted environments or when handling non-sensitive data." |
| Q-S31 | verified | https://help.openai.com/en/articles/20001264-chatgpt-enterprise-admin-quickstart | Browser (WebFetch 403) | "workspace identifiers, public display name, Workspace Instructions, and user-facing guidance" |

### Search brief quick-fix claims (S1 to S10)

| Problem | Status | Claim checked | Page evidence |
|---|---|---|---|
| S1 | verified | Claude web search returns cited text, web fetch citations must be turned on | Q-S02, Q-S19 quotes above |
| S2 | verified | Search errors arrive inside a 200 response, empty result is a list not an error, activity history exists | "A search that succeeds but matches no results returns an empty content list, not an error." |
| S3 | verified | ChatGPT and Gemini deep research show an editable plan | Q-S07, Q-S08 |
| S4 | verified | Sites > Manage sites, Console domain list, allowed_domains, Perplexity cap of 20 | Q-S09 to Q-S12 |
| S5 | verified | Organization instructions, page_age, use_cache false, search_recency_filter | Q-S13 to Q-S16 |
| S6 | verified | sources field, open_page reported for reasoning models, fetch citations off by default | Q-S17 to Q-S19 |
| S7 | verified | Web fetch cannot read JavaScript pages, names fetch errors, deep research takes uploads | Q-S20 to Q-S22 |
| S8 | verified | Organization instructions exist, premise-check preprint found 57% false challenges, Workspace Instructions exists | Q-S16, Q-S23, Q-S31 |
| S9 | verified | tool_choice required forces search, organization instruction, retract unsupported claims | Q-S24, Q-S16, Q-S03 |
| S10 | verified | Claude in Chrome on by default with allowlist, Lockdown Mode role, additive roles, OWASP human approval | Q-S25 to Q-S30 |

### Frontier brief ledger (Q-F01 to Q-F24)

| Id | Status | URL opened | Opened with | Quote found |
|---|---|---|---|---|
| Q-F01 | verified | https://genai.owasp.org/llmrisk/llm092025-misinformation/ | WebFetch | "Implement human oversight and fact-checking processes" |
| Q-F02 | verified | https://code.claude.com/docs/en/permission-modes | WebFetch | "Deny rules block in every mode, including bypassPermissions." |
| Q-F03 | verified | https://code.claude.com/docs/en/permission-modes | WebFetch | "setting permissions.disableBypassPermissionsMode to "disable" in managed settings" |
| Q-F04 | verified | https://learn.chatgpt.com/docs/agent-approvals-security | WebFetch | "workspace-write sandbox mode keeps network access turned off unless you enable it" |
| Q-F05 | verified | https://openai.com/enterprise-privacy/ | Browser (WebFetch 403) | "We do not train our models on your data by default" |
| Q-F06 | verified | https://knowledge.workspace.google.com/admin/gemini/generative-ai-in-google-workspace-privacy-hub | WebFetch | "does not use customer data for training models without customer's prior permission" |
| Q-F07 | verified | https://learn.microsoft.com/en-us/purview/dlp-microsoft365-copilot-location-learn-about | WebFetch | "DLP can't scan the contents of files that you upload directly into prompts" |
| Q-F08 | verified | https://code.claude.com/docs/en/managed-mcp | WebFetch | "set allowedMcpServers and allowManagedMcpServersOnly: true together" |
| Q-F09 | verified | https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-enterprise-policies | WebFetch | "The MCP servers in Copilot policy controls use where MCP server support is" |
| Q-F10 | verified | https://www.finops.org/wg/finops-for-ai-overview/ | WebFetch | "Assign specific owners for tasks such as monitoring costs" |
| Q-F11 | verified | https://platform.claude.com/docs/en/about-claude/models/overview (redirects to /docs/en/models/overview) | WebFetch | "Every Claude model ID is a pinned snapshot" |
| Q-F12 | verified | https://ai.google.dev/gemini-api/docs/models | WebFetch | "Most production apps should use a specific stable model." |
| Q-F13 | verified | https://learn.microsoft.com/en-us/azure/ai-foundry/openai/concepts/model-retirements | WebFetch | "NoAutoUpgrade (never auto-upgrade, deployment stops working at retirement)" |
| Q-F14 | verified | https://developers.openai.com/api/docs/guides/spend-limits | WebFetch | "returns a 429 error with the project_spend_limit_exceeded code" |
| Q-F15 | verified | https://platform.claude.com/docs/en/api/http/beta/organization/spend_limits/set.md | WebFetch | "A Claude Enterprise organization sets user limits." |
| Q-F16 | verified | https://openai.com/index/sycophancy-in-gpt-4o/ | Browser (WebFetch 403) | "users can give the model specific instructions to shape its behavior" |
| Q-F17 | verified | https://learn.microsoft.com/en-us/microsoft-365/admin/manage/agent-actions | WebFetch | "Restrict access to an agent across the organization, preventing any user from using it." |
| Q-F18 | verified | https://github.blog/changelog/2026-02-13-new-repository-settings-for-configuring-pull-request-access/ | WebFetch | "restrict pull request creation to collaborators only" (image alt text) |
| Q-F19 | verified | https://code.claude.com/docs/en/memory | WebFetch | "Claude treats them as context, not enforced configuration." |
| Q-F20 | verified | https://status.claude.com/ | WebFetch | "Get email notifications whenever Claude creates, updates or resolves an incident." |
| Q-F21 | verified | https://docs.aws.amazon.com/bedrock/latest/userguide/cross-region-inference.html | WebFetch | "Cross-Region inference routes your requests by using compute across different AWS Regions." |
| Q-F22 | verified | https://ai.google.dev/gemini-api/docs/safety-settings | WebFetch | "Test carefully to find the level of blocking that supports your use case" |
| Q-F23 | verified | https://www.whitehouse.gov/wp-content/uploads/2025/02/M-25-22-Driving-Efficient-Acquisition-of-Artificial-Intelligence-in-Government.pdf | WebFetch, PDF text extracted | "clear data and model portability practices, clear licensing terms, and pricing transparency" |
| Q-F24 | verified | https://public-buyers-community.ec.europa.eu/communities/procurement-ai/resources/updated-eu-ai-model-contractual-clauses | WebFetch | "a light version, customisable to specific needs for non-high-risk AI" |

### Frontier brief quick-fix claims (F1 to F14)

| Problem | Status | Claim checked | Page evidence |
|---|---|---|---|
| F1 | verified | OWASP names human oversight and fact-checking | Q-F01 |
| F2 | verified | disableBypassPermissionsMode setting, Codex workspace-write default with network off | Q-F03, Q-F04 |
| F3 | verified | OpenAI and Google no-training defaults, Purview DLP Copilot location, uploads not scanned | Q-F05 to Q-F07 |
| F4 | verified | allowedMcpServers with allowManagedMcpServersOnly, Copilot MCP policy | Q-F08, Q-F09 |
| F5 | verified | FinOps names cost owners and cost per inference | Q-F10 |
| F6 | verified | Pinned snapshots, "specific stable model", NoAutoUpgrade and OnceCurrentVersionExpired | Q-F11 to Q-F13 |
| F7 | verified | OpenAI project hard limit is monthly and returns 429, Claude Enterprise user limits | Q-F14, Q-F15 |
| F8 | verified | OpenAI says custom instructions shape behaviour | Q-F16 |
| F9 | verified | Agent Registry Block action, export to Excel noted on page | Q-F17, page note "Export to Excel" |
| F10 | verified | Restrict pull request creation to collaborators | Q-F18 |
| F11 | verified | Memory files are context, page points to a PreToolUse hook | Q-F19 |
| F12 | verified | Status page channels (email, SMS, Slack, Teams, webhook, RSS), Bedrock cross-Region profiles, AWS still advises app fallback | Q-F20, Q-F21 |
| F13 | verified | Gemini safety settings adjustable, Google advises testing | Q-F22 |
| F14 | verified | OMB lock-in wording, EU clauses full and light | Q-F23, Q-F24 |

## Use in sol.json

All 24 problems (S1 to S10, F1 to F14) received a "quick" object in drafts/deep/sol.json, since every row they rest on is verified. No problem was set to "quick": null.

ev tags. "verified" where the fix rests on a standard, regulator, study or independent page: S1 (NIST), F1 (OWASP), F5 (FinOps), F14 (OMB and EU). "vendor" for the other 20, where the named setting is described on the vendor's own page.
