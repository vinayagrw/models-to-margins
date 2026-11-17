# W7 reader panel audit, "Who Pays When the Agent Buys"

Date: 2026-11-15. Read only review of the page at http://127.0.0.1:8741/deep-dives/agentic-commerce-protocols/ (built at dist/deep-dives/agentic-commerce-protocols/index.html), the scene drafts in drafts/acx/scenes, drafts/acx/data.json and docs/Agentic_Commerce_Protocols_Technical_Design.md.

The six panel members are roles, not real people. Nothing below quotes a real person.

## How the page was read

- Headless Chrome screenshots at 1440 wide in leader mode, in architect mode (`#reader=architect`), on the Architecture tab (`#view=arch`) and with Stripe open (`#who=stripe`). Files are in the session scratchpad under `w7-panel/` (d1440, A1440, arch1440, stripe1440, m375, A375).
- Headless Chrome cannot go below about 500 px wide, so the 375 screenshots were cropped and looked clipped. A second check in a real 375 x 812 mobile viewport gave a page scrollWidth of 375, so the page does not scroll sideways. Only the scene 1 layer header scrolls sideways, inside its own container. The mobile clipping in the headless shots is a capture artifact, not a page bug.
- Visible text came from the rendered DOM with scripts, styles and SVG stripped, for both reader modes.
- Leader and architect text differ in only a few places: the scene 1 protocol card (pitch versus mechanism and parameters), the scene 2 matrix columns, and the scene 4 intro line. Everything else is the same in both modes.

## Score table

| Persona | Clarity | Trust | Usefulness | Coverage of needs |
|---|---|---|---|---|
| 1. CIO, large retailer | 4 | 4 | 3 | 2 |
| 2. Payments architect, PSP | 4 | 4 | 4 | 4 |
| 3. Merchant ecommerce head | 4 | 4 | 3 | 3 |
| 4. Issuer risk lead, bank | 3 | 4 | 3 | 3 |
| 5. Fintech startup founder | 4 | 3 | 3 | 3 |
| 6. Editor | 4 | 4 | 4 | 3 |

## 1. CIO at a large retailer

Wants: what to decide this year, and cost and risk.

"The page tells me the market is small, the protocols are unsettled and I should not bet on one. That is useful. But nowhere on the page is there a short list of things to decide before the end of 2026. The doc has one, section 15.1, with five clear moves. The page leaves me to piece them together from the 'You must build' list in scene 2 and the kill tests in scene 6. There is no cost at all: no build range for a UCP adapter, no run cost for the evidence store, and only one fee figure (agent platforms charging up to 4 percent, in challenge 10). The title asks who pays, and I could not find a single view that answers it by route."

- **Most valuable:** scene 3, the evidence ladder. It shows at a glance that every agent order figure sits on a vendor rung, so I will not size a business case on any of them.
- **Top 3 fixes:**
  1. Scene 2 or a new leader strip at the top: show doc 15.1 as five moves for this year, each with an owner and a trigger.
  2. Scene 5, challenge 1, or a new panel: turn the ADR-6 route table (doc 5.4) into a "who pays by route" visual. Visa enrolled agent goes to the cardholder, Link to the user, Mastercard to standard chargeback rights, a non fraud dispute to the merchant, and a final stablecoin rail to the payer. This is the page title and it has no picture.
  3. Scene 2, "You must build": give each layer a rough effort band (small, medium, large) marked illustrative, or say plainly that the doc does not cost the build. Doc 15.3 should list cost as out of scope too.

## 2. Payments architect at a PSP

Wants: protocol detail, parameters, and a reference architecture.

"Scene 1 with the path tracer is the best thing here. I can see where the token checkout path crosses the layers and which hop handles disputes. In architect mode the protocol card swaps the pitch for identity method, credential, transport and crypto primitive, which is exactly what I need. The Architecture tab in scene 2 gives me a payment path, an edge and records, plus the variables to set. The 'Owner Ravi' and 'Maya' tags mean nothing without the doc's persona table. The 300 ms p95 target and the HMAC and RFC 9421 webhook rules are in the doc, and only the webhook rule reaches the page."

- **Most valuable:** scene 1, the seven layer stack with the traced path and the per protocol parameter card in architect mode.
- **Top 3 fixes:**
  1. Scene 2, Architecture tab: replace persona first names (Maya, Kofi, Ravi, Sam, Hana, Noor) with roles such as "payments architect" or "fraud and issuer risk". On the page the names read as real staff.
  2. Scene 2, Architecture tab: show the build order from doc 15.2 (edge trust tiers, evidence store, authority record, adapters, loss holder gate, pay per call path) as numbered steps on the diagram.
  3. Scene 2, Matrix in architect mode: add a column or a tooltip for the five common authority fields (amount cap, currency, merchant constraint, expiry, recurrence) and the binding level from doc section 3. That is the core of the thesis and it is missing from the page.

## 3. Merchant ecommerce head

Wants: what to switch on, and who pays for wrong orders.

"Scene 2 with my setup (consumer checkout, card, US, human present) gives a clear answer. UCP, Visa Intelligent Commerce, Agent Pay and Stripe SPT fit, and the list of what I must build is in plain words. 'Score unsigned agent payments as ordinary card not present sales, do not refuse them' is the line I will take to my fraud team. But the condition for building the UCP adapter, 'our proposed 3% threshold', appears only inside the L1 item. In challenge 9 it becomes 'passes the trigger' with no number, and the 'for two months running' part from the doc is gone. On who pays for a wrong order, the page gives one sentence in challenge 1 and leaves out the line that matters most to me: a non fraud dispute lands on the merchant by default."

- **Most valuable:** scene 2, "You must build", read with the decision tree. It turns my setup into a short checklist ordered by layer.
- **Top 3 fixes:**
  1. Scene 2 and scene 5, challenge 9: state the trigger in full everywhere it appears: "agents complete more than 3 percent of your orders for two months running, our proposed threshold".
  2. Scene 5, challenge 1: add the merchant default for non fraud disputes and Cloudflare's "the site pays" line from the ADR-6 table, or link to the who pays visual asked for by the CIO.
  3. Scene 2, leader mode: move "Tag every agent order with the agent platform id" to the top of the build list. Without that tag the merchant cannot measure the trigger, as doc ADR-1 says.

## 4. Issuer risk lead at a bank

Wants: liability, fraud and agent identity.

"The trust tier idea is clear: a signature plus mandate, or registered agent plus agentic token plus passkey. So is the point that stored cards hide the agent from me. Challenge 7 on banks refusing agent access, with the Reg E reading and the Wells Fargo date, is the most issuer aware part of the page. What I miss is my own side of the loss. The page says Visa puts enrolled agent purchases on the cardholder, but not what that means for my dispute queue, and it does not say that no agent reason code or agent indicator exists yet in authorization. The heatmap rates issuers high on four challenges, yet the page does not say what an issuer should switch on."

- **Most valuable:** scene 5, the severity heatmap ranked by the "Issuers and banks" column, with challenge 7's design response.
- **Top 3 fixes:**
  1. Scene 5, challenge 3: say plainly that EMVCo is only exploring an agent indicator in the authorization message, so the issuer cannot see the agent today on a stored card (doc 10.2, challenge 3).
  2. Scene 4 or scene 5: add an issuer row to "what to switch on": accept agentic tokens, read the agent transaction score in testing, and record revocation timestamps. The page speaks to merchants and builders, not to banks.
  3. Scene 2, Decision tree: the end node "Unrecognised agent, stored card" should carry a note on who carries the loss there (Reg E reading, doc ADR-6), because that is where issuer losses will sit.

## 5. Fintech startup founder

Wants: where the gaps and openings are.

"Scene 5 is my map. Every row has a 'Who is working on it' list, and the empty or thin ones are my openings: agent dispute evidence, mandate revocation proof, merchant attribution. The startup cards in scene 4 are honest about weak spots. Rain's virtual card model meets Mastercard's 'bridge' remark, and Skyfire's KYA meets the network KYA framework. But the page never says 'here are the open gaps' in one place. The doc's 'next five below the top 10' (catalog data, proof of delivery for machine payments, privacy, double pay on retries, thin machine demand) is a better list of openings than anything on the page."

- **Most valuable:** scene 5, each challenge's "Who is working on it" next to its design response, which shows where nobody is building yet.
- **Top 3 fixes:**
  1. Scene 5: add an "open ground" marker on challenges where no company or startup ships a fix, for example agent dispute reason codes, revocation proof and attribution.
  2. Scene 4: one line under the startup list naming the runner up startups (Kite AI, Paid, Basis Theory, Catena Labs) and the score gap, so founders see the field is thin.
  3. Scene 3: make the x402 story one card, not four separate chips (minus 72 percent, 274K USD, 7.5 percent at most, 50+ members). Read together they say machine pay is a small and falling market with a growing foundation, which is the real signal for a founder.

## 6. Editor

Checks plain words, AI tells, em-dashes and semicolons, and whether the visuals carry the message.

Measured on the rendered text in both modes: zero em-dashes, zero semicolons, and zero hits for delve, robust, seamless, leverage, unlock, landscape, navigate, crucial, pivotal, furthermore and moreover. The doc also has zero em-dashes and zero semicolons. Sentences are short and concrete. The visuals do most of the work. Scene 1, scene 3 and the scene 5 heatmap each make their point with little text.

Problems found:

- Spelling is mixed on the page: "Authorises" and "authorisation" next to "authorization" and "authorized", and "honour". Pick US spelling to match "Global, vendor-neutral" and the US default jurisdiction, or UK spelling throughout.
- Leader mode still shows engineering terms with no gloss: "ACP signs with HMAC-SHA256, UCP with RFC 9421", "SD-JWT" in the Mastercard and Google cards, and "idempotency key".
- The quotes in scene 5 ("If the agent buys the wrong thing, I cannot tell who pays me back.") sit in quote marks with no label. They are composite pain statements from research, not quotes from named people. The doc calls them "in the customer's words". Both should say they are paraphrased.
- The "verified 2026" tag reads like a date, not a status. "Verified" alone, or "checked Nov 2026", is clearer.
- The hero chip "0 to 4 years" does not say what it measures.
- The Stripe card says "in the design doc". That points readers to a document they cannot open.
- Scene 4's leader intro says "Three incumbents and three startups", but four company cards show.
- Layout: in leader mode, the scene 2 Matrix panel ends about 120 px above the "You must build" column. That leaves a dead band at 1440.

- **Most valuable:** scene 3. The rung ladder is a chart that does the job of a methods section.
- **Top 3 fixes:**
  1. Scene 4: fix the intro count and the "in the design doc" wording on the Stripe card.
  2. Scene 5: label the pain quotes as paraphrased composites, on the page and in doc 10.2.
  3. Page wide: one spelling standard, and a plain words gloss for HMAC, RFC 9421, SD-JWT and idempotency in leader mode.

## Specific checks

### Stripe card in scene 4 (`#who=stripe`)

- **Reads as number 5?** Partly. The list card says "Company #5" in small grey text and the detail says "Shown for its OpenRouter deal. Shopify is number 4 at 375, in the design doc." The number and the reason are there. But both only show at full strength once the card is opened.
- **Shown for its OpenRouter deal?** Yes in the detail panel: the first two moves are the 2026-08-19 OpenRouter deal, and "Watch for" is about OpenRouter billing. The closed list card gives no hint of the reason.
- **Out of place next to the top three?** Yes. It sits straight under Google with the same card style, height and layer bar, and no gap or label. Read top to bottom, the list says Mastercard, Visa, Google, Stripe, so a reader takes Stripe as fourth. The jump from #3 to #5 is the only signal. The leader intro ("Three incumbents and three startups") does not match the four cards. Fix: put a small divider labelled "Also shown, for its OpenRouter deal" above Stripe, with a dashed or muted card border. Change the intro to "Three top companies, three top startups, and Stripe for its OpenRouter deal". Replace "in the design doc" with "not shown here".
- **Layers match the doc?** Yes. Stripe shows L2, L4, L5, L6, matching doc 9.2. The note that the deal does not change the score matches the doc's Stripe note (M already 5, total 325).
- At 375 in a real mobile viewport the card stacks cleanly and the detail panel follows the list.

### Rank order, Mastercard then Visa then Google

- The page order is Mastercard (#1), Visa (#2), Google (#3). This matches doc 9.2 and 9.3 (400, 380, 380, with the tie broken to Visa on vendor cut reach, 340 to 320).
- The Visa and Google cards both carry the tie note, so the order is explained.
- Gap: Mastercard's 400 is not shown anywhere on the page, so a reader sees "tied at 380" with no top score to compare. Add "400 of 425" to Mastercard's detail, or show all three totals on the list cards.

### The 3% trigger

- Scene 2, "You must build", L1: "UCP adapter once agent orders pass our proposed 3% threshold". This is correctly marked as our proposal.
- Scene 5, challenge 9: "Wait with readiness until your agent share passes the trigger." No number and no "proposed", and the reader has not been told what "the trigger" is.
- "For two months running" (doc sections 3, 4.4, ADR-1 and 15.1) does not appear on the page at all.
- Confusion risk: scene 3 shows a vendor "3% of transactions merchants say involve agents" (Checkout.com, rung 6). A reader can take our proposed threshold for that sourced number. Doc section 3 says the figure is not sourced. The page should say so next to the threshold, for example "our proposed threshold, not an industry figure".
- The doc is consistent. Every mention of 3 percent (sections 3, 4.4 V17, ADR-1, 15.1, 15.2 diagram, 15.3 table) says "our proposed threshold".

## The six fixes that recur or matter most

1. **Show who pays by route (scene 5 or a new panel).** Turn the ADR-6 table into a visual. This was raised by the CIO, the merchant and the issuer, and it is the page title.
2. **State the trigger in full everywhere (scene 2, scene 5 challenge 9).** Use "more than 3 percent of your orders for two months running, our proposed threshold, not an industry figure", so it is never confused with the vendor 3 percent in scene 3.
3. **Set the Stripe card apart (scene 4).** Add a divider label, a muted border and an intro that names it, and drop "in the design doc". Show Mastercard's 400 so the rank order reads on its own.
4. **Add a "decide this year" strip for leaders (top of page or scene 2).** Use doc 15.1's five moves, with an effort band or a plain note that build cost is not estimated.
5. **Plain words in leader mode.** Gloss HMAC, RFC 9421, SD-JWT and idempotency. Replace persona first names with roles on the Architecture tab. Use one spelling standard.
6. **Label the scene 5 quotes as paraphrased composites,** on the page and in doc 10.2. Add an "open ground" marker for gaps nobody is building into, which also serves the founder and the issuer.
