# Design: Round 7. Deep study of how to fix the 24 problems, three new scenes on the site page, lock-in gaps ranked, every Not done closed, fresh fact check

## Context
The site deep dive `/deep-dives/what-breaks-in-ai` (boardroom template, three embed visuals from `drafts/deep/gen_site.py`) says what breaks and which four fixes to fund. It does not show how the fixes work as a system or who runs them. The user now asks for:
1. A deep study of the technical architecture and business process that fix the 24 problems, then state-of-the-art visuals that explain them.
2. Close every item in the last two "Not done" lists.
3. Rank the 3 open lock-in gaps (LK-31 to LK-44), each with a severity and a named source to look for.
4. When the research agents report, a fresh subagent checks every fact and number against its source (verified, unverified or wrong, with where it looked). Fix the wrong ones and list the unverified ones.

### Design (from brainstorming, user answers marked)
- **Reader (user):** both leaders and architects, in layers. Leader layer shows what happens, who owns it and what it takes to run. The architect layer, one tap deeper, shows components, data flows, standards and named options.
- **Scenes (user: all three, one per chapter):**
  1. **Follow one request.** A request moves through the controls, each lighting up as it acts. A "Play a bad answer" button shows which control stops a planted source, an unbacked figure or an agent overreach (my guess, liked in the mockup). Tapping a step opens the architect detail.
  2. **Explore the whole system.** Four layers: People, Controls, Platform, Contracts. Tapping a block shows its parts, the problems it fixes (S and F ids), owner, cost band and named options.
  3. **See who does what.** Swimlanes, one row per team (procurement, security, platform, finance, team heads, legal). Columns are buy, pilot, go live, run and change. Each cell is a task with a cadence. Tapping a cell shows the step, its standard (NIST AI RMF function, ISO 42001 clause, EU AI Act article) and its evidence tag.
- **Placement (user):** added to the existing page as new chapters after "One Platform, Not 24 Projects". Board sentences and unknowns move to the end. No new route.
- **Depth (user: go deeper):** compare named real-world reference designs, vendor and open source, for each building block.
- **Vendor names (user):** shown only in the architect layer, as examples with an evidence tag, never ranked. The leader layer stays vendor-neutral. The full comparison lives in the doc.
- **Non-goals:** no vendor ranking or pick, no new route, no change to the claude.ai artifacts unless asked, no deploy or push.
- **Anti-goals (my call):** a named product shown as a fix when no opened page says it does that job, any number on the page that the fact check did not verify, and a page that breaks the layout budget.
- **Constraints:** house rules (no em-dashes or semicolons, plain words, iso-tile icons 64px or more in scenes and 88 in heroes, no sources on the page, evidence tags `verified 2026`, `vendor` and `illustrative`, Space Grotesk in visuals). Layout gate on every state. The page budget is 9, 14 and 22 viewports and 1,800 words. It is now 5.1, 7.7 and 12.4 viewports and 789 words, so the three scenes get about 1 viewport each at 1440 and 2.5 at 375, with detail in drawers. If it still fails, I stop and ask rather than raise the budget.
- **Left to the builder:** colours within the existing family tokens, animation timing (honouring reduced motion), and the exact swimlane tasks, which come from research.

### Settled after the builder check (my calls, marked for the user to check)
- **The two Not done lists, in full:**
  - Round 6: three lock-in gaps (Step 0 and A5). V9 unverified items: Full Fact date, OpenAI help page date (LK-19), Netskope (A5). Fixes lack independent measures and the human steps are unmeasured (A6). Cost per block not priced (A4). SOL2 budget ran out on theme 6 (A5). Search #4 and #7 labelled differently on the merged page (Step 3).
  - Port round: the index card not checked, no `/present` route, the older boardroom page fails the gate, and the same "Worse" vs "New events" item (Step 5 and Step 3).
  - Blocked on the user and not closable by me: sharing, interviews, the cloud network setting, an outside Claude Code tester, deploy.
- **Cost bands (my call):** the page shows a cost number only if it is a verified public price (`vendor`), or a band modelled from verified prices with the model stated in the doc (`illustrative`). Any number the fact check marks unverified stays off the page. A block with neither shows "Price at first funding gate".
- **`/present` (my call):** in scope as the last step. "No new route" meant no new deep-dive page. Each slide passes the gate at one viewport. If it does not fit the budget, it is dropped and reported.
- **Swimlane rows (my call), six rows matching the doc's owners:** Leadership (CIO), Procurement and legal, Security, Platform and architecture (architect, evals lead), Finance, Team heads and HR. The doc's owner names are mapped to these rows in the doc so both agree.
- **Existing chapters (my call):** they change only when the fact check marks a published number wrong, or when new opened evidence changes it (for example "9 of 24 measured"). Every such change is listed in the report with old and new values.

## Step 0. Lock-in gaps, ranked (answer to ask 3; also written into R7 section 8.9)
| Rank | Gap | Severity | Why | Evidence that would close it | Named sources to look for |
|---|---|---|---|---|---|
| 1 | No measured switching cost in money or engineer-weeks between frontier providers (only LK-35, within one provider) | High | A board cannot weigh exit terms against cost without it. Theme 14's confidence note rests on this gap | A rung 1 to 3 case or study with a measured migration between two providers, giving engineer-weeks or money and the scope moved | AWS and Google Cloud customer case studies on OpenAI to Bedrock or Vertex moves with customer-stated figures. Engineering post-mortems on company blogs. Gartner research on LLM switching cost. arXiv practitioner studies after "Don't Start Over" (AAAI 2026) |
| 2 | No quantitative independent survey of frontier AI buyers on lock-in (best is EBA banks LK-31 and CMA interviews LK-33) | Medium-high | Reports scoring leans on sector regulators and qualitative work, which limits how far the finding generalises | A rung 4 survey with a stated sample of AI buyers, asking about switching or dependence | Bank of England and FCA fourth AI survey (announced for 2026). EIOPA follow-up. ECB supervisory AI survey. IDC or ETR multi-model surveys with method notes. Stanford AI Index 2027 enterprise chapter if out |
| 3 | No measure of cloud commitment left unspent after moving AI work (LK-37 18% MACC shortfall is consulting self-report, not AI-specific) | Medium | It is one cost mechanism inside the larger lock-in, mainly for buyers with large cloud commits | A dated figure for commitment shortfall linked to AI workloads, with a sample | Gartner "Mitigate the Financial Burden of a Cloud Contract Shortfall" (LK-43, open in the built-in browser). Omdia marketplace burn-down release (LK-44). FinOps Foundation State of FinOps 2027. Flexera State of the Cloud 2027 |

## Step 1. Deep study (6 background research subagents in parallel, opened pages only, evidence ladder, house rules in every prompt)
Each one writes a brief to `docs/AI_Fix_Architecture_research/` with ids per strand, quotes under 15 words, and a "does not tell you" column. Window: anything plus a 60-day SOTA sweep (2026-08-25 to 2026-10-25).
- **A1 Control plane** (P1, P2, P6, P10). Gateways, grounding and claim checks, guardrails, eval and test pipelines, tracing. Named options to test against an opened page, for example LiteLLM, Portkey, Kong AI Gateway, Cloudflare AI Gateway, Azure API Management AI gateway, Bedrock Guardrails grounding check, Vertex grounding check, NeMo Guardrails, Guardrails AI, Llama Guard, promptfoo, Inspect, Langfuse, and OpenTelemetry GenAI conventions. For each: which block it fills, what it does not do, licence, and public price.
- **A2 Agent security** (P4, S10, F2, F4, F9). Agent identity and least privilege, MCP authorisation, sandboxes, the isolated-reader pattern (dual model, CaMeL), action logs, off switch. Standards: OWASP LLM Top 10 2025 and the OWASP agentic list. Named options: Entra Agent ID, Okta for AI agents, SPIFFE, MCP gateways, E2B, gVisor or Firecracker sandboxes.
- **A3 Business process** (P3, P7, P8, P9, P5). NIST AI RMF with the GenAI profile (AI 600-1), ISO/IEC 42001 clauses, EU AI Act deployer duties (Art. 26 and the GPAI code), FinOps for AI, AI contract terms (EU model contractual clauses for AI, UK and US public procurement guidance), and review-capacity practice. Output: a RACI by team and a stage-by-stage task list for the swimlane.
- **A4 Cost per block.** Public list prices and people-hour bands for each P1 to P10, tagged `vendor` or `illustrative` where modelled. This closes "cost per block not priced" as far as public data allows.
- **A5 Not-done closers.** Reopen the OpenAI chat-export help page date (LK-19) and Full Fact and Netskope (V9 unverified), using the built-in browser if WebFetch is blocked. Rerun SOL2 theme 6 research, which ran out of budget. Hunt the named sources in Step 0.
- **A6 Fix proof.** Look for independent before-and-after measures of the fixes and of human steps (named checker catch rates, off-switch drills, stop rules), so that "9 of 24 measured" can move with evidence or stay as stated.

## Step 2. Fact check (fresh subagent after all six report, answer to ask 4)
- `docs/V10_fix_architecture_fact_check.md`: every fact, number and named-product claim in the new briefs, the doc sections and the page text. Each is verified, unverified or wrong, with the URL opened and the quote.
- I fix every wrong item before building. Unverified items stay off the page or carry `illustrative`. The final report lists them.

## Step 3. Doc updates
- `docs/AI_Challenges_Solutions_Technical_Design.md`: new sections for the reference architecture per block (named options table), the request path, the process RACI and swimlane, cost per block, and standards mapping. Mermaid is validated (`validate_mermaid.py`). Ledger rows added (AR- ids).
- The design written here is copied to `docs/superpowers/specs/2026-10-25-fix-architecture-scenes-design.md`.
- R7 gets section 8.9 (the Step 0 ranking).
- Search doc: apply the same three-label rule to #4 and #7 ("New events", with a short reason), so the site page and doc agree. This closes the "Worse vs New events" item.

## Step 4. Build the three scenes
- Data goes in `drafts/deep/arch.json`, built from the doc and verified rows only. Extend `drafts/deep/gen_site.py` (reuse `page()`, `sprite()`, `SIZE_JS`, the theme files and the `#open=` pattern) to write `request-path.html`, `system-map.html` and `who-does-what.html` in `public/visuals/what-breaks-in-ai/`.
- Detail opens inline in the same frame, as the challenge map does, with `showInHost` scrolling. Animations use transform and opacity only, with a reduced-motion fallback and a settle timeout so the final state always shows.
- `src/content/deep-dives/what-breaks-in-ai.md`: three new chapters (short intro plus visual-frame each), renumbered chapters, updated note panel "How to read", readTime.

## Step 5. Other Not done items
- Check the `/deep-dives` index card for the page in the built site.
- Add `src/pages/deep-dives/what-breaks-in-ai/present.astro` (the optional slide route, modelled on `harness-engineering/present.astro`, reusing the same iframes, linked from the note panel).
- Opt the older boardroom page (`ai-governance-before-roi`) into `data-gate` and fix its faults, only if the fixes are CSS-only and keep its content. Otherwise report the counts and leave it.

## Verification
- Layout gate (0 faults) on the article (`--root=.article-shell --scene=.article-shell`), every visual in embed mode, and every open state of the new scenes (`--states=open=…`, plus `play=bad` if the request scene exposes a state). Also on `/present` and the governance page if touched.
- Browser check: frames autosize, the theme follows the site toggle, scenes animate and settle, drawers open and back.
- `npm run build` passes. Grep finds no em-dashes, semicolons or filler words in the new prose. validate_mermaid passes on the doc.
- Screenshots at 1440 and 375 sent to the user.
- Memory note and work_state updated. Report: Changed, Not done, Blocked on me (sharing, interviews, cloud network setting, outside tester, deploy stay with the user).
