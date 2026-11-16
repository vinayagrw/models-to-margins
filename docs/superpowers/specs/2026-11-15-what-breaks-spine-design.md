# Design: "24 ways AI breaks" as one spine (page, post, GIF)

## Intent
The goal is thought leadership. Clients and the wider LinkedIn audience should come away knowing what breaks in AI and why, how real companies are being hit, and what the industry is doing about it, with our honest view on each. Success is a reader who can name the three chapters and remembers one case and one industry response per chapter.

- **Non-goal:** a budget pitch. The budget ask, payback line and 90-day gates leave the page.
- **Anti-goal:** a catalogue of 24 names with no story, or vendor marketing passed off as an industry fix.

## Approaches considered
- **A. One spine, three sizes. Picked.** The page, one LinkedIn post and one GIF all tell the same three chapters. One research pass, one message.
- **B. Page plus a three-post series.** Rejected for now. It is about three times the work, and the existing incident posts would need re-slotting.
- **C. A 24-row table.** Dropped. The persona audit already rejected a catalogue.

## The spine
Every medium tells three chapters in the same order. Each chapter answers: what breaks and why, a real case, what the industry is doing, and Our read.

| Chapter | Count | Case (already sourced) | Industry response (new research) | Our read |
|---|---|---|---|---|
| 1. Answers you can't trust | 11 | Air Canada chatbot refund, Feb 2024 | Examples to research: citation and grounding checks from vendors, human review rules in law and health, court sanctions for fake citations | Named checkers |
| 2. Agents that act wrongly | 7 | Replit agent deleted live data, Jul 2025 | Examples to research: agent identity and permission standards, MCP security guidance, OWASP agentic top 10, EU AI Act duties | Agent fence |
| 3. Vendors you don't control | 6 | Anthropic Aug 2025 serving bugs | Examples to research: model version pinning and deprecation notices, multi-model gateways, contract terms, Gartner rehiring | Pinned models, Contract terms |

The industry-response examples are hypotheses until research confirms them. Each confirmed response needs a date, an actor and a source in the ledger. Anything vendor-sourced gets the vendor tag.

## Page (models-to-margins, What Breaks in AI)
1. **Retag (approved).** In arch.json, move the 8 search failures from Pinned models only to Named checkers first, with Pinned models second. That gives chapters of 11, 7 and 6. Update the s3 fix rows, the proof counts and ledger rows ST-05 and ST-13.
2. **Screens:**
   1. Hook: "24 ways AI breaks", with three chapter links.
   2. Chapters 1 to 3. Each has its tiles with a "why" line in the drawer, a case card, an "Industry is doing" strip of 2 or 3 items and an Our read line.
   3. "What still breaks": the gaps no one has solved yet.
   4. How sure: the evidence bar.
   5. Reference map, optional for technical readers.
3. **Remove:** the why-now ask, the payback line, the s3 cost total framed as an ask, and the s5 90-day gates. The four-fixes table stays as an Our read summary, without the budget line.
4. **Rules:** at most 9 viewports at 1440, each screen at most 1.5 viewports, 0 gate faults, labels of 3 words or fewer, no em-dashes or semicolons, no sources on the page.
5. **Page meta:** change "Board briefing, November 2026" to a thought-leadership eyebrow, and change the summary to match.

## LinkedIn post (docs/linkedin/posts/what-breaks-in-ai.md, new post 6)
- Plain text, opening "I built a page where".
- One line for the 24, then one short block per chapter: the failure, the case and what the industry is doing.
- It closes with the main Our read and no URL in the body.
- Do the 10-day LinkedIn scan first and log it in the playbook. Run post_check.py on the post text alone.

## GIF (v5, scratchpad/gif/v5, built from the v4 pipeline)
- Four beats in the v4 style: "24 ways AI breaks", then each chapter as headline, one case number and one industry response.
- The end card shows the three chapter names.
- Frame 0 shows the finished hero. Under 3 MB, with a 3.5 s end hold.
- The Gartner v4 GIF stays for its own post.

## Builder calls
- **My call:** the exact wording of the industry-response items, the "What still breaks" items and the GIF beat timing.
- **My call:** whether to keep the four-fixes table or fold it into the chapter Our read lines. Keep it if it fits the viewport budget.

## Order and checks
1. Research subagent: industry responses per chapter, written to the ledger.
2. Page subagent: retag and rebuild.
3. Post and GIF subagents, run in parallel once the research is in.
4. Build and gate. Rerun the 4 personas. A persona passes if it can name the 3 chapters, one case and one industry response each.
5. Copy this design to docs/superpowers/specs/2026-11-15-what-breaks-spine-design.md. No commit.
