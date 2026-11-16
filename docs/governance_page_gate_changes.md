# Governance page, layout gate changes

Page: `/deep-dives/ai-governance-before-roi` (`src/content/deep-dives/ai-governance-before-roi.md`)
Date: 2026-10-26

Gate command:

```
node scripts/layout-check.mjs /deep-dives/ai-governance-before-roi --root=.article-shell --scene=.article-shell
```

## Result

| Measure | Before | After |
| --- | --- | --- |
| Faults | 536 | 0 |
| Warnings | 210 | 0 |
| Visible words | 2,439 (2,407 at 375) | 1,466 (1,428 at 375) |
| Page at 375 (limit 22) | 24.5 viewports | 18.1 viewports (14,670px) |
| Page at 1024 (limit 14) | 15.5 viewports | 12.2 viewports (9,746px) |
| Page at 1440 (limit 9) | 11.4 viewports | 9.0 viewports (8,082px, 18px under the 8,100px limit) |
| `npm run build` | not run | passes, 37 pages |

The gate counts only words that have a rendered box, so text inside a closed `<details>` block is not counted. Nothing was deleted from the page. Every move below is from visible prose into the chapter's existing appendix block, which opens on tap.

## Opt-in wiring (no change for other pages)

| File | Change |
| --- | --- |
| `src/content.config.ts` | `deep-dives` schema gains an optional boolean `gate`. |
| `src/pages/deep-dives/[slug].astro` | `gateReady = entry.data.gate === true \|\| pubDate >= 2026-10-23`. Opted-in pages render `data-gate="opt"`, date-gated pages keep `data-gate="2026"`. The existing presence-based `[data-gate]` rules apply to both. |
| `ai-governance-before-roi.md` frontmatter | `gate: true` added. |
| `public/styles/deep-dive-boardroom.css` | New block at the end, scoped to `.dd-boardroom[data-gate="opt"]` only, so `what-breaks-in-ai` (`data-gate="2026"`) is untouched. |

## Text moves (old text, new location)

No sentence was reworded. Each entry shows where the text was and where it now sits. In every case the moved text sits above the data table inside the named `<details>` block.

| # | Chapter | Old text (visible paragraph) | New location |
| --- | --- | --- | --- |
| 1 | 1 | "Around them, four more AI moves landed with no disclosed economics at all: Deloitte and Ivalua announced a strategic alliance for agentic source-to-pay on August 12, Exiger was named a 2026 Great Supply Chain Partner by SupplyChainBrain on August 10 (the report's own author calls this a trade-press award, not a result), USPS disclosed it is evaluating AI for dynamic routing (coverage August 13), and Crocs signed an AI vendor deal to simplify operations with no figures attached. On the regulatory side, OSHA extended its warehousing and distribution-center National Emphasis Program from three years to five, a second governance move with no economic disclosure of its own." (second half of the Target paragraph) | Details: "Appendix 1, more moves (7 rows)" |
| 2 | 1 | Pull quote: "The AI story this week was governance, not capability. Fourteen runs in, no operator in this sector has published an audited, facility-level AI ROI figure." with cite "Industry weekly deep-dive, Run #14, executive summary, 2026-08-15" | Details: "Appendix 1, more moves (7 rows)", kept as a blockquote with its cite |
| 3 | 2 | "Elsewhere the appointment pace continues without any published tenure data: Bank of Ireland's Prag Sharma is set to become CAIO in October 2026, HSBC has confirmed David Rice as its first CAIO, Lloyds named Sameer Gupta Chief Data and AI Officer in April 2026, and Orange is reported to be adding a CAIO in September 2026 on low-confidence secondary sourcing." (second half of the churn paragraph) | Details: "Appendix 2, CAIO moves (6 rows)" |
| 4 | 3 | "Sage puts about 10% of retail and wholesale operators with AI live in workflows. MIT's Project NANDA, published August 2025 and never updated for 2026, found 95% of generative AI pilots show no measurable profit-and-loss impact, and its methodology has been publicly criticized. JLL's figures, 88% piloting with only 5% hitting all their AI goals, come from an October 2025 survey and must not be read as a 2026 data point. Stord found enterprise AI adoption rising from 78% in 2024 to 88% in 2025 while only 7% reached full scale. Deloitte's 2026 edition, fieldwork from August to September 2025, found only 20% of leaders already growing revenue from AI against 74% who aspire to, while 66% report productivity or efficiency gains. Gartner's supply-chain release, published August 5, 2026, is the sixth independent confirmation: 55% of chief supply chain officers are unclear on the ROI of their own AI investments while 67% of supply-chain digital spend is now allocated to AI, drawn from 394 professionals surveyed November 2025 to February 2026 plus 135 senior leaders surveyed January to April 2026." (whole paragraph) | Details: "Appendix 3, survey detail (10 rows)" |
| 5 | 3 | "Two reinforcements landed inside this window. KPMG's Global AI Pulse for Q2 2026, a sample of over 2,000 leaders, found only 7% report established ROI, and that leaders with strong AI cost visibility are five times likelier to report established ROI, 15% versus 3%, while 42% cannot see where their AI money goes at all. Gartner separately found only about one quarter of AI customer-service use cases produce ROI." (whole paragraph) | Details: "Appendix 3, survey detail (10 rows)" |
| 6 | 4 | "What still took effect on August 2 were Article 50 transparency obligations, the Article 4 AI-literacy duty, GPAI enforcement powers, the full penalty regime, and a new Article 5 prohibition on AI-generated non-consensual intimate imagery and CSAM added through the same Omnibus." (second sentence of the Digital Omnibus paragraph) | Details: "Appendix 4, rulebook detail (6 rows)" |
| 7 | 4 | "The softening is not confined to Europe. Colorado paused enforcement of its AI Act on April 27, 2026 and narrowed SB 24-205 into a replacement, SB 26-189, effective January 1, 2027. US federal preemption of state AI laws remains a stated policy push, not enacted law, through the window. Texas TRAIGA has been the exception in the other direction, live and enforceable since January 1, 2026." (first half of the softening paragraph; the NACD sentence "Against that state-level drift, board-level governance hardened on schedule: ..." stays visible) | Details: "Appendix 4, rulebook detail (6 rows)" |
| 8 | 5 | "Croud is a digital-marketing agency that sells AI-commerce services, so its headline is displayed as stated intent, not measured behavior. The same release found only 44% actually trust AI tools, against 59% who trust friends and family, 35% who want a human to review before an agent buys, and delegation concentrating in groceries at 41% and household supplies at 31%." (middle of the Croud paragraph; the 69% sentence and the Checkout.com 63% / 4% sentence stay visible, now adjacent) | Details: "Appendix 5, consumer detail (7 rows)" |
| 9 | 5 | "Stord's earlier survey found 30% of consumers would never allow AI to handle shopping or access payment information at all, a hard refusal that caps the addressable population before any execution risk is even priced in. Salesforce reported roughly 200% growth in AI-chat-originated shopping traffic, another vendor claim from a company that sells the software generating that traffic." (whole paragraph) | Details: "Appendix 5, consumer detail (7 rows)" |
| 10 | 5 | "The same governance-before-proof pattern shows up in the plumbing underneath agentic commerce. The Model Context Protocol's 2026-07-28 specification aligned its authorization model with OAuth 2.1, the change enterprise security teams had been waiting for, GitHub shipped support for it July 23, and 6sense moved its MCP server from open beta on July 14 to general availability folded into its August 10 Summer release. A standardization artifact, arriving before any agentic-checkout ROI has been proven." (whole paragraph) | Details: "Appendix 5, consumer detail (7 rows)" |
| 11 | 6 | "Applied consistently, the market has bifurcated by what gets measured, not by what gets claimed. Vendors touching money movement, like HappyRobot, can show retention and recovery figures. Vendors touching physical throughput, like Dexterity's FedEx rollout or Amazon's robotic-arm fleet, show deployment counts. Vendors touching decision support show nothing at all. The honest procurement order follows that ladder until someone publishes an audit." (whole paragraph) | Details: "Appendix 6, still owed (6 rows)" |
| 12 | 6 | "The cost side is just as undisclosed. Amazon's $400M retrofit of two Florida fulfillment centers displaced 1,110 workers under WARN notices despite a "temporary" framing, while warehousing employment fell 34,700 year over year even as truck transportation held flat. Nobody is measuring that side of the ledger either." (whole paragraph) | Details: "Appendix 6, still owed (6 rows)" |
| 13 | 6 | "The series carries a standing "still owed" list across fourteen runs. Altana and Cervo's operating metrics, entries per hour, error rate, classification accuracy, are owed for a fourth run. Agility Robotics' audited S-4 filing is owed for a fifth. Returns-fraud AI accuracy and false-positive rates are owed for a twelfth. Amazon's agentic-commerce customers beyond Kate Spade and Tapestry are owed for an eleventh. Stord and Wiliot's facility-level audited ROI is owed for a thirteenth. And, after fourteen runs, any audited facility-level AI ROI figure from any operator in this sector at all is still owed." (whole paragraph) | Details: "Appendix 6, still owed (6 rows)" |

## Text rewrites (summary labels only)

The appendix labels were shortened to six words or fewer so they fit on one line at 375 and describe the prose now inside them. Row counts are kept. The only words dropped are label words, no data.

| Old summary | New summary |
| --- | --- |
| Appendix 1, Governance events, Jul 2 to Aug 24 2026 (7 rows) | Appendix 1, more moves (7 rows) |
| Appendix 2, CAIO appointments and exits in and near the window (6 rows) | Appendix 2, CAIO moves (6 rows) |
| Appendix 3, Survey provenance ledger (10 rows) | Appendix 3, survey detail (10 rows) |
| Appendix 4, Regulatory and board-governance timeline (6 rows) | Appendix 4, rulebook detail (6 rows) |
| Appendix 5, Consumer and protocol datapoints (7 rows) | Appendix 5, consumer detail (7 rows) |
| Appendix 6, The still-owed ledger (6 rows) | Appendix 6, still owed (6 rows) |

Note on label 1: the date range "Jul 2 to Aug 24 2026" left the label. The same period is in the header coords ("Period · 2026-06-17 to 2026-08-17") and every row in the table carries its own date.

Text that stays visible and unchanged: the note panel (all three paragraphs and the four verdict chips), both stat strips, every chapter's opening sentence, every exhibit, every callout (Open, Caveat, Counter-signal, Resolution, The zero-disclosure capex problem, Avoid), the Chapter 4 pull quote, the three actions paragraph, the HappyRobot net-dollar-retention paragraph, and all seven tables including the source ledger.

## Layout changes (CSS, all under `.dd-boardroom[data-gate="opt"]`)

| Rule | Why |
| --- | --- |
| `summary` 14px, min-height 44px, `text-wrap: balance` | CR4 small text (was 11.5px) and tap size |
| `blockquote cite` 14px | CR4 small text (was 11.2px) |
| `.article-body > p`, `.note-panel p`, `.callout p`, `blockquote p` get `text-wrap: balance` | LB1 orphan last lines in 2 to 6 line paragraphs (balance only acts on short blocks in Chrome, longer paragraphs wrap as before) |
| `details > p` and `details > blockquote` padding inside the block | moved prose sits clear of the block border |
| `.callout > strong` padding 5px 10px | CR1, label ink was 6px from the label's own bottom edge |
| `.br-title` at 720px and under: `clamp(1.5rem, 7vw, 2.8rem)` | LB2, the seven-word title ran to three lines at 375 |
| Tighter vertical spacing: details, exhibits, blockquotes, callouts, stat strips, note panel, h2, header rows, shell padding 32px | LN2 page length at 1440 (limit 9 viewports) and 1024 (limit 14) |

## Not fixed, and caveats

- The 1440 page length passes by 18px (8,082px against 8,100px). Six exhibits autosize to their content and take 3,987px of that, so any added visible text at 1440 will fail LN2 again. More headroom needs shorter exhibits, which is a visual change and out of scope here.
- The chapter headings keep their original em-dashes ("Chapter 1, ..."). They were not rewritten because the task was to cut and move, and the no-em-dash rule applies to new prose.
- The dev server did not pick up the new `gate` schema field until `src/content.config.ts` received a real edit followed by an edit to the content file. The server was not restarted. If the field ever reads as undefined in dev, save both files again.
- Gate runs failed twice with "Inspected target navigated or closed" because another session was editing `src/components/deep-dive/WhatBreaksStage.astro`, which the shared `[slug].astro` imports. Reruns passed.
