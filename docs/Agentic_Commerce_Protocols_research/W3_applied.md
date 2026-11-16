# W3 applied: checker verdicts and lead decisions

Applied 2026-11-15 to `docs/Agentic_Commerce_Protocols_Technical_Design.md` and `drafts/acx/frag/d1a.json`, `d1b.json`, `d2.json`, `d3.json`. Order: sections 5 to 11, then 0, 1 and 3, then K1 (sections 2 and 4, plus its status copies). Sections 12 to 15 and Appendix A were not touched. `drafts/acx/data.json` was not touched.

Counts of fix and cut rows applied: K1 12 of 13 (10 fixes, 2 cuts, 1 fix not applied), K2 13 of 13, K3 15 of 15, K4 7 of 7, K5 12 of 12 (one with a workaround), K6 17 of 17 (one in wording only). Lead decisions 1 to 5 and the parameter set decisions applied.

Checks after editing: `python3 drafts/acx/merge.py` gives 0 hard faults and 2 soft faults (status without ev or src on `visa-tap` C and `amex-ace` C, both expected, see below). Mermaid validator: 7 of 7 blocks render. No em-dash and no semicolon in the doc or the fragments.

## Changes

| Claim id | Where | Old gist | New gist |
|---|---|---|---|
| R2-33 | 6.2 table, 6.2 membership note, 8.1 P3, 8.4 Buyer B, 2.2 x402, d2 a1 | More than 50 members, tagged verified 2026 | Tagged vendor (the foundation's own count). LF calls April an intent to launch, operational launch 2026-07-14 |
| R3-24 | 6.2 table, d2 a2 | Over 60 endorsers, rung 2 | ucp.dev lists 51 endorsers and 21 co-developers, endorsement is stated support not use, rung 6 vendor. a2 value 51, unit endorsers listed |
| R2-23 | 6.2 table, 2.2 MPP, 8.1 P3, d2 a3 | 12 payment method entries | 11 named payment methods plus a custom method option, no ACH or bank debit. a3 value 11 |
| C360, R1-60 | 6.2 table, d2 a10, d2 mastercard move 2026-06-02 | 36 European banks with live agent payments | Mastercard's footnote names 36 banks in controlled live Agent Pay tests (pilot). All European issuers enabled at network level |
| R2-11 | 6.2 table | Shop Pay inside three agents, verified 2026 | Shopify says Shop Pay checkout is starting in Muse, Claude Duet and Instinct, Amex tokens coming. Tagged vendor |
| R3-21 | 6.2 table, d2 a13 | Shopify AI search orders 3.3 times, rung 5 | From Shopify's investor deck, president says volume still small. Rung 6, row moved to the rung 6 group |
| R3-40, R5-11 | 6.2 table, d2 a17 | 3% of transactions involve agents, rung 7, as_of 2026-07-20, not on Checkout.com's page | Checkout.com newsroom release says UK and US merchants estimate 3%, no method. Rung 6, as_of 2026-06-09. "Not on Checkout.com's own page" deleted |
| C369 | 6.2 table, 6.4 table | 75.41M and 24.24M for 30 days to late August, as_of 2026-08-25 | Same pair quoted unchanged from 2026-07-10 to mid October, window ends on or before 2026-07-10, as_of 2026-07-10 |
| C287 | 6.4 table and reconciling note | Crypto Briefing, 30 days to mid August | Repeats the 24.24M figure as mid August, but it was already published on 2026-07-10 |
| R3-27 | 6.4 table and reconciling note | Trade press, 30 days to mid October, read as the August figure | Same stale x402.org reading, not used for October or August. Rung set to 6 per K2's label rule |
| C369, R2-38 | 6.4 reconciling note | August pairing 75.41M against tracker 17.9M, and 24.24 is 56% of 43.0 | Matching period about mid June to early July: dashboard 75.41M, tracker 4.8M (June) and 6.0M (July). 56% line dropped |
| R2-46, R2-38 | 6.4 intro and "What the page uses" | Trackers differ up to 4x on counts, 60x on value, agree within about 2% | Tracker and Bitquery close for August but count different things, so the match validates neither. Dashboard and tracker differ about 12 to 16 times |
| R2-73 | 6.2 table, 8.1 P2 | First live UK agentic account to account payment | GoCardless says it made the first, a Trussell donation by Direct Debit inside FCA AI Live Testing (supervised test, so pilot) |
| R5-63 | 6.3, 10.2 #4 | About 132 million, 59% end at Amazon | Nearly 132 million, 59% of AI assisted purchases end at Amazon (PYMNTS survey, base not stated) |
| R4-64, R4-65, R5-47, V#10 | 7.1 bullet 1 | No law, network rule or court case allocates the loss | No US, EU or UK law or court case does. Visa's rules make the cardholder responsible for an enrolled agent's actions (4.1.23.10). Mastercard's rule text not yet checked. No agent dispute condition, so disputes run on reason codes built for humans (lead decision 3) |
| R4-34, C296 | 7.1 bullet 1, 10.3 #1, ADR-6 context | Consumer carries the loss under Reg E as settled default | Under Goodwin's reading of Reg E, until the bank is told of revocation or unless the bank broke its own security procedure |
| C299, R4-65 | 7.1 bullet 1, ADR-6 context | Merchant carries non fraud card disputes | By default, unless it wins the dispute |
| R4-17 | 7.1, 8.1 P2 | 48 threats, 8 high risk | 8 high risk in at least one deployment architecture, preprint |
| R4-27, R4-28 | 7.1, 7.6 table, 8.1 P1, 9.3 Visa (R3-15), 10.2 #10, 10.3 #10, d3 ch10 research | 54% of failed runs still bought something, a valid token would have paid each | 22 models, 54% of failed runs still ended in a purchase decision, checkout and payment not tested, a valid token would not have stopped those purchases |
| R4-47, R4-48 | 7.1 | EU PSR not yet in the Official Journal | Plus Council position late October 2026, Parliament vote planned 2026-12-14, publication expected 2027-01 (payment-law.eu 2026-11-03) |
| R4-36, R4-37 | 7.2 Reg Z row | 1026.12, cap 50 USD, billing errors cover goods not delivered | Rule cell adds 1026.13(a)(3). Cap is the lesser of 50 USD or the amount obtained before notice. Billing error rights in 1026.13(a)(3) cover goods not accepted or not delivered as agreed |
| R4-64, R4-65, C299, C372, V#10 | 7.2 card network row | Existing agreements, no shift, no agent reason code, Amex policy | Mastercard under existing agreements, Visa once the agent enrols in VIC. Visa 4.1.23 defines an Agentic Transaction, requires cardholder acknowledgement and makes the cardholder responsible (4.1.23.10). Mastercard text not yet checked. 10.4 Compelling Evidence accepts the agent provider's login ID. Loss column adds cardholder on Visa (lead decision 3) |
| R4-47, R4-48, R4-49, C305 | 7.2 PSD3 and PSR row | Texts 2026-04-23, OJ not confirmed | Council first reading position late October 2026, Parliament second reading 2026-12-14, OJ expected 2027-01, PSR applies about 2028-11. Open question now whether the vote holds |
| R4-50 | 7.2 AI Act row | Council approval pending | Regulation (EU) 2026/1744 adopted 2026-07-08, OJ 2026-07-24, in force 2026-07-27. Annex III to 2027-12-02, product embedded to 2028-08-02 |
| C418 | 7.2 FCA row, 10.2 #9 | GoCardless ran the first UK agentic A2A payment | GoCardless says it processed the first, a Direct Debit mandate set up inside a chat, in FCA AI Live Testing |
| R4-58, R4-59 | 7.2 NPCI row, 10.2 #9 | Still expected after GFF 2026-09-09 | Reported 2026-09 on unnamed sources, expected at GFF in a 2026-09-09 report, no launch confirmation found by 2026-11-15 |
| R4-60 | 7.2 MAS row | Effective 2027-10-07, firms must review controls | Sections 5 and 6 due by 2028-10-07, firms should review controls |
| R4-64, R4-65, V#10 | 7.3 Visa row, 7.3 Mastercard row | Card reason codes, issuer for token fraud, Mastercard "as Visa" | Visa: no agent dispute condition, 10.4 Compelling Evidence accepts the agent login ID, cardholder answers for the agent under 4.1.23.10. Mastercard: issuer for token fraud, rule text not yet checked (lead decision 3) |
| C372, R4-17, R5-71 | 7.3 plain reading | Every family leaves disputes to human card rules, Amex the only network promise | Adds Visa's cardholder rule, which narrows the fraud route without an agent dispute condition, and Mastercard not yet checked |
| R4-64, R4-65, C372 | 7.6 last row, 7.6 Elena, ADR-6 context | No liability rule | No liability law. Visa's rule puts an enrolled agent's actions on the cardholder. Disputes still on human reason codes |
| R4-04 | 7.4 table, 7.6 row, 10.2 #2, 10.2 #10, d3 ch10 one | Persuasion lifted agents' sponsored picks to 61.2% | Human participants steered by an LLM shopping assistant nearly tripled sponsored picks, labels did not significantly reduce it. 7.6 row: agent picks steered by position bias, users by LLM persuasion (lead decision 5) |
| R4-18 | 7.4 table | 40 previously undocumented issues in 86 cases | 40 previously undocumented formal consistency findings across 86 verification cases |
| R4-30 | 7.5 incidents, 10.2 #4, 10.2 #7, d3 ch4 research | Breached at least 27 retailers | 27 online retailers and other companies, figures by the operator's own records (Gambit 2026-09-22 via CSA 2026-09-26) |
| R4-31 | 7.5 incidents, 7.6 row, 8.1 P3 | Fixed 2026-08-18, fixes shipped without advisories | 3 critical flaws fixed 2026-08-18, no security advisory published as of 2026-10-23 |
| R5-61 | 10.2 #10, d3 ch10 src | Muse test saw all errands fail, used as wrong purchase evidence | Removed from challenge 10 and from ch10 src (lead decision 5). Kept in 10.2 #6 and 10.4 as failures on credential sharing and app connection friction (PYMNTS test, 2026-09-09) |
| R5-62 | 10.2 #10, 10.4 consumers | Testers said it uploaded data without permission | Meta employees testing Muse at launch said so in internal posts reviewed by Reuters |
| R5-71 | 7.3 AP2 row, 7.3 plain reading, 9.3 Google, 10.2 #5, 10.2 #8, 10.3 #8, 10.4 builders, 11.4 | v0.2 removed or dropped the user signed Intent Mandate | v0.2 replaced the Intent Mandate with user signed open mandates, and an open issue says the mispick dispute row went with it (lead decision 4) |
| C313, R1-29 | 1.3, 2.2 UCP, 6.2 table, 8.4 Buyer A, 9.3 Google, d2 google move | Universal Cart live in the US | Began rolling out in the US across Search and the Gemini app |
| R1-35 | 2.2 AP2, 8.1 P2, 8.4 Buyer A, 9.3 Google, d1a ap2 gaps | Repo idle since 2026-04-29 | Last AP2 release is v0.2.0 of 2026-04-28 |
| R1-40 | 8.1 P2 | FIDO working groups chaired by Mastercard and Visa | The FIDO Payments working group is chaired by Mastercard and Visa, seeded by Google and Mastercard contributions |
| R2-05 | 8.1 P2, 9.3 Visa, d2 visa arch | VIC keeps the purchase instruction at the network | VIC takes the instruction through Visa's own API after a passkey, before it releases credentials |
| K6 row 20 | 8.1 P1 Mermaid | Merchant authorises straight with the network | Merchant charges through its own PSP, PSP authorises, alt branch for requires_action and 3D Secure |
| K6 row 34 | 8.1 P2 text and Mermaid, d1b mandate arch | User signs the cart, note says signature proves consent to the cart | Agent sends user signed open mandate and agent signed closed mandate. Note: the user signs the limits, the agent key signs the cart inside them |
| R4-67 | 8.1 P3, side by side table, verdict, 4.3 x402 P10, 4.3 bullets, 7.3 x402 P10, 8.4 Buyer B, ADR-6, d1b h402, d1a x402 gaps | Final, no refund path, payer carries the loss once signed | No protocol refund path. A refund is a voluntary transfer back, so the payer carries the loss unless the seller agrees |
| K6 row 50 | 8.1 P3 text and Mermaid, d1a x402 arch, d1a h402 flow, d1b h402 arch | Verify and settle before serving | Verify, do the work, settle, then 200 with PAYMENT-RESPONSE. PAYMENT-REQUIRED and PAYMENT-SIGNATURE headers named |
| R1-26 | 8.1 P4, 4.3 bullet 1, d1a ucp arch | UCP profiles publish keys and requests are signed under RFC 9421 | JWK set at /.well-known/ucp, RFC 9421 one option, Web Bot Auth lookup optional, platform webhooks must be signed |
| R1-15, R1-17 | 8.1 P4, 2.2 ACP | ChatGPT moved checkout to retailer sites [R1-15, R1-17] | C359 added to the citation |
| K6 row 63 | 8.1 P4 Mermaid, d1b agent arch | Verify signature, nonce and expiry | Key fetched from the Signature-Agent URL and matched on keyid. Verify signature and expiry, and the nonce where the network requires one |
| K6 rows 66, 67 | 8.3 tree, Mermaid, leaves, d1b tree q6 | T4 scoped token with no mandate, "the only live option today" | T4 Network token + mandate check (d1b q6 no: token+mandate). Claim removed. Mandate can be signed, a network instruction after a passkey, or a bank mandate (lead decision 1). Verdict step 3 now consistent |
| K6 row 68 | 8.3 tree, Mermaid, leaves, d1b tree q4, d1b build | T5 names no credential, B2B card drops spend limits | q4 "Is the chosen rail final?". T5 names bank transfer with approval step or stablecoin wallet. New leaf T8 Registered agent + card token, buyer set limits (d1b q4 no: agent+token+mandate). Line that the mandate verifier enforces V1 on every B2B route, SCA can apply to EU and UK B2B card payments unless exempt, UCC 4A coverage of stablecoins open. d1b adds two B build items and rewords the UCC 4A why (lead decision 2) |
| K6 row 69 | 8.3 question table | SCA asked only for consumers away | Table row now says SCA can still apply per payment to present EU, UK and India payers and to business payers outside the corporate exemption, so the PSP step up stays in every token leaf. Tree shape kept |
| K6 row 75 | 8.4 scale | Web Bot Auth scored 4, off the scale | Scale now lists Live as identity only 4 |
| R2-27 | d2 tempo move 2026-09-02 | Passed 1 billion USD monthly, mostly not agent payments | Rolling 30 day transfers, agent share undisclosed |
| R1-67 | 9.4 Skyfire, d2 skyfire move | Draft 02 adds an Akamai co-author | Draft 02, same three authors, expires 2027-05-06 |
| R1-21, C384 | 9.2 table, 9.5 Coinbase | Coinbase M 0, score 210, tied 8th | M 3, score 255, rank 8. PayPal now rank 9. Moves: AgentCore wallet 2026-08-18, UCP Payments council 2026-09-02 |
| R3-07 | 11.1 table, d2 forecast | Discovery to payment spending, global | Agentic commerce spending, scope and geography not defined in the source |
| R3-07, R3-08 | 11.1 how to read | Juniper moved from 1.5T by 2030 to 3.5T by 2031 | Different end year and measure, not a like for like revision |
| R3-06 | 11.1 table, d2 forecast | Edgar Dunn | Edgar Dunn consultant, not the firm's official opinion |
| R3-09 | 11.1 table and how to read, 11.3 signpost, d2 forecast | eMarketer US | Geography not stated by the secondary source (eMarketer is US based) |
| R3-02, R3-01 | 11.1 how to read | About 25 times | About 26 times |
| R2-74 | d2 signpost FCA | ev vendor | ev verified 2026, text adds subject to legislation |
| R3-02, R3-03 | d2 signpost Morgan Stanley 2030 | Scenario wallets | Scenario set to empty. merge.py rejects "all", see below |
| R1-29, R2-59 | 1.3, 2.2 UCP, 8.4 Buyer A, d1a ucp one, d1b UCP build why | Only commerce protocol with verified live checkout | Only one inside the 90 day window. Copilot Checkout launched 2026-01-08 with Stripe sellers on ACP, protocol today unconfirmed |
| R1-01, R1-02, R1-15 | 2.2 ACP, 2.3 calls, d1a acp arch | ACP Spec with no deployment named | Stays Spec. Shipped once in Copilot Checkout for Stripe sellers, Microsoft and Stripe pages now name UCP not ACP |
| R1-72, R2-59 | 2.2 PSP paragraph | PayPal processes Copilot Checkout | PayPal, Shopify and Stripe launched as Copilot Checkout partners, Stripe sellers on ACP, Microsoft page names UCP as future support and no ACP or PayPal |
| R1-42 | 2.1 A2A row, 2.2 A2A | A2A v1.0.1, 2026-05-28 | A2A v1.0, first stable specification, more than 150 organisations (LF, 2026-04-09). v1.0.1 dropped |
| R1-34 | 2.1 Shopify row, 2.2 MCP, 2.3 row and calls | WebMCP C Live 2026-09-28 | WebMCP C Pilot 2026-11-15, Chrome origin trial 149 to 156, shipping planned 157. Shopify page undated |
| R1-16 | 2.2 Web Bot Auth, 2.3 row and calls, d1a wba C | C Live 2026-09-28 | C Live 2026-11-15, identity only |
| R1-50, R1-51 | 2.2 Visa, 2.3 row and calls, 8.1 table, d1a visa-tap C | TAP C Spec, no source ties TAP to live consumer payment | TAP C Pilot 2026-07-02, Visa says live European agent purchases were enabled through TAP. d1a C ev vendor, src empty |
| R2-11, R2-09 | 2.2 Mastercard, 2.3 calls | Agent Pay C Live on Shopify's page | Shopify's page shows Mastercard tokens but does not name Agent Pay. Mastercard's CEO said on 2026-10-29 Shop Pay uses Agent Pay |
| R1-65 (cut) | 2.1 Amex row, 2.2 Amex, 2.3 row and calls, 4.3 Amex row and bullet 1, 8.1 P4, 11.2 S2 | 3 of 5 Amex specs out, registration in development, five intent formats | Removed. 2.1 version "not confirmed". Intent format count now "at least four" with R1-65 dropped |
| R1-66 (cut) | 2.2 Amex, 2.3 row, 2.4 Mermaid, 4.3 bullet 2, 4.4 P18, d1a amex-ace | Amex protection still future tense | Removed. Mermaid "Amex cover, by policy". 4.3 and 2.2 rest on C372 (policy for registered agents). P18 drops "Amex uses its own app" |
| amex-ace C | 2.2, 2.3, d1a amex-ace status, one, arch, gaps, params | Spec, src R1-65, R1-66 | Unsettled 2026-11-15, ev and src empty (lead rule). Text and params rebuilt on C372, other cells "not confirmed" |
| R2-15, R2-21 | 2.2 Stripe, 2.3 row and calls, d1a spt C | SPT C Pilot 2026-10-26 on R2-21 | SPT C Live 2026-11-15 under preview terms. d1a C ev vendor, src R2-15 only. R2-21 kept as a Link fact |
| R2-64 | 2.2 PSP paragraph, 2.3 row and calls | Worldpay C Spec 2026-01-28 | Worldpay C Absent 2026-11-15 as a shipped product, announced 2026-01-28 as launching soon |
| status:mcp:C | d1a mcp C src | R1-33, R1-34 | R1-33 only |
| status:kya:B, status:alipay:M | 2.3 calls, d1a alipay name | Merged page rows did not match split doc rows | New calls bullet explains each merged cell takes the status of the member that has one. d1a alipay name now "Alipay and AMP" |
| Lead, params | 4.4 intro and closing line, d1a params | P17 to P21 and V14 to V16 all Proposal | One line lists the final set (P1 to P18, V1 to V13, V15, V16). P17 and P18 added to d1a params (areas E and B). P19, P20, P21 rows removed, one line says where each went |
| Lead, vars | 4.2 V2, 4.4 V15, d1a vars | V14 separate, P20 separate, V15 and V16 Proposal only | V2 widened to say lifetimes differ by layer (R1-56, R1-62). V15 now Settlement mode and intermediary with R2-40. V15 and V16 added to d1a vars |
| Lead decision 3 | d1b build, consumer card item | Card rules leave non fraud disputes unallocated | Visa makes cardholders answer for enrolled agents, disputes still use human reason codes |
| R4-64 (decision 3) | 4.3 bullet 2 | One network promise still future tense | Visa cardholder rule, Mastercard not yet checked, Amex a policy not a rule |
| R1-54, R2-04 | 8.1 table maturity | TAP B Pilot | TAP C and B Pilot |
| K3 row 31 copy | d3 ch9 working | NPCI planned agent protocol | NPCI reported agent protocol |
| K3 rows 1, 20 | d3 ch1 one and arch | No law, network rule or court case says who pays | No law or court case. Visa's rules make cardholders answer for enrolled agents. Mastercard text not yet checked. Disputes use reason codes built for humans |

## Verdicts not applied, or applied differently

1. K1 row 51, `status:alipay:C` (Alipay AI Pay C Live 2026-05-26, stale). Not applied, kept Pilot. Live needs a rung 2 to 4 source dated within 90 days (section 6.1 and the 2.3 header), and these are rung 6 vendor figures from May. K1's own row 19 lowers Visa TAP to Pilot for being past 90 days, so the two rows conflict. Lead to decide whether the 90 day rule should flag age instead of lowering maturity, then change 6.1, 2.3 and every status together.
2. K1 `status:alipay:M` asked to split the merged page row. Not split. The d1a row is renamed "Alipay and AMP" and 2.3 explains the merge, so page and doc agree without a new protocol item.
3. K5 row 55, Morgan Stanley 2030 signpost scenario "all". merge.py treats any scenario not in `scenarios` as a hard fault, so the field is set to empty. The lead can add "all" to merge.py and the s6 builder if wanted.
4. K6 row 69 (ask SCA for every EU, UK and India payer). Applied in the question table wording, not as new tree nodes, to keep the tree's six questions. Lead decision 2 covers the B2B line.
5. New sources with no claim id, cited as plain text in the doc and not added to any fragment `src`: Visa Core Rules 2026-10-24 (K3), payment-law.eu 2026-11-03 (K3), EUR-Lex Regulation (EU) 2026/1744 (K3), Checkout.com newsroom release 2026-06-09 (K2, a17 `src_add`), Stripe newsroom 2026-01-08 on Copilot Checkout (K1), Microsoft merchant page (K1), Visa UK press release 2026-07-02 (K1), Chromium WebMCP intent thread (K1), A2A GitHub release page for v1.0.1 (K1, not cited, v1.0.1 dropped). They need claim ids before ledger.py runs. Until then `visa-tap` C has an empty src (soft fault).
6. Cuts left an item with no source: `amex-ace` C in d1a. Set to Unsettled with empty ev and src, as the lead asked, not deleted (soft fault). No fragment item was removed, and merge.py reports no broken cross reference.
7. Residual, not a verdict: the generic P4 value "network held instructions" (2.4 Mermaid, 3, 4.1, 4.3, d1a layers and params) still implies networks hold instructions. K6 row 27 corrected only the VIC sentences. Lead may want to rename the value.

## Lead decisions applied

Applied 2026-11-15 by F2 to sections 0 to 11 of the doc and to `d1a.json`, `d1b.json`, `d2.json` and `d3.json`, from `L_decisions.md` (D1 to D21), `G1_gapclose.md` and `G2_gapclose.md`. Sections 12 to 15 and Appendix A were not touched (checked by diff). `drafts/acx/data.json` was not touched, so it still cites the cut ids R1-65 and R1-66 until the lead runs `merge.py --write`.

New claim file `G3_checker_sources.md`, ids G-201 to G-207, for the sources item 5 above listed without ids: G-201 Visa Core Rules edition 2026-10-24, G-202 Regulation (EU) 2026/1744 on EUR-Lex, G-203 payment-law.eu 2026-11-03, G-204 Stripe newsroom 2026-01-08, G-205 Microsoft merchant page, G-206 Chromium WebMCP intent, G-207 Checkout.com newsroom 2026-06-09. Every plain text citation of those sources in sections 0 to 11 now cites the id, and `visa-tap` C src is G-34.

Not given a new id: the Visa UK release of 2026-07-02 is the same release as G-34 (release 3457328), so the doc cites G-34. The A2A v1.0.1 release page has no recorded URL and is no longer cited.

Corrections found while opening the pages for G3: the Stripe newsroom does not say where SPTs are available, so that line now cites R2-15 (Stripe's SPT docs), and current Copilot Checkout availability rests on G-205.

| Decision | Doc | Data |
|---|---|---|
| D1 thesis | Section 3 rewritten: spend first on product data, order tags and evidence, build to the token and a thin authority record only above the trigger, losing world `walled`, RT1, RT2, RT3, RT9 answered | none |
| D2 option D | ADR-1 retitled "Wait with readiness, then build to the token and a thin authority record". Option D added as default below the trigger (V17 above 3 percent for two months, or orders published by surface). Option B costed per breaking release (G-37, G-38), 5K to 500K USD quoted as unverified (G-41). Option C token requestor question (G-57). Revisit rule now surface based. 5.1 and 8.2 say what applies below the trigger | d1b UCP build item now "once your agent order share passes 3 percent" |
| D3 authority record | 5.3 canonical model: five common fields, binding level, signed original unchanged, agent header and token requestor. Adapters never rewrite the artifact. UCP adapter is a checkout state machine | d1b `canon`, `adapt` |
| D4 ADR-3 narrowed | ADR-3, 4.2 V1 who decides, 5.2 note and box label (buyer side), 7.6 rows, 8.3 B2B line. Forged cart claim removed | d1a V1 `who`, d1b `mandv`, `policy`, two build items |
| D5 ADR-5 | No seller held prepaid balances, facilitator with upto or batch-settlement (G-133 to G-135). V15 text, 7.3 x402 row, 7.6, 8.1 pattern 3 and verdict, 8.3 machine leaf | d1b new build item, d1a `x402` arch and h402 flow |
| D6 tier 2 | ADR-2, 5.3, 7.6, 8.1 verdict item 1, patterns 4 and 6. P3 gets the Direct or Intermediary value (G-36) | d1a P3 value, d1b edge build why, new stored card build item |
| D7 ADR-4 and Noor | 0.1 seventh persona Noor, Ravi widened to issuer risk. 1.2 retention row (V18). ADR-4 says odds improve, no guarantee (G-18, G-201). 5.3 evidence store owner Noor | d1b `evid` persona Noor, new delete evidence build item |
| D8 ADR-6 | Moved to 5.4 with a route table: Visa G-201, Mastercard G-116, Link G-127, Amex G-24, UK reg 77 G-124 and G-125, Cloudflare G-35. 7.1, 7.2 card and UK rows, 7.3 Mastercard, Amex and new Stripe rows | d3 challenge 1 |
| D9 webhooks | 5.3 adapters and a 7.6 row (G-129, G-131) | d1b new build item |
| D10 latency | 1.2 row and 5.5 say untested, no production p95 found | none |
| D11 kinds and final set | Kind column in 4.1 and 4.2, who decides column in 4.2. 4.4 adds P22 to P28 and V17 to V19 from G1 section 3, and one table of the final set by kind. P10 adds "Amex protection promised, not live" and the Visa cardholder value. P21 note gets the Citi, Bank of America and JPMorgan stances | `kind` on every d1a param and var, `who` on every var. P22, P24, P26 and V17 added |
| D12 patterns 5 and 6 | 8.1 renamed "The six patterns", pattern 5 vcard (note), pattern 6 browser (sequence), two new side by side columns | d1b `vcard`, `browser` with all fields |
| D13 tree | 8.3: q0 token or mandate present (no leads to `browser`), q5 reworded, q7 added so EU human away has the buildable `agent+token` fallback (G-34), platform wallets with per payment confirmation end on `token` (G-49). Mermaid and question table updated | d1b `tree`, every leaf resolves |
| D14 criteria | 8.2 gate plus seven weights summing to 100, basis stated (G-42, G-43), sensitivity line | d1b `criteria`, gate item `weight 0, gate true` |
| D15 worked examples | 8.4 now compares inside a layer: checkout surface (UCP 74, ACP 46, Copilot Checkout 68, agentic browser 79) and credential (network token 76, SPT 67, virtual card 61), plus Buyer B rescored (x402 72, MPP 66, L402 49, card token 49). Every score has an id or is marked illustrative. Slips fixed: Agent Pay for Machines Spec in 8.1 and 8.4, 1.3 wording against MCP and WebMCP, ADR-1 title | none |
| D16 x402 | Tracker tagged vendor, rung 3 kept (G-101 to G-103). Monthly trend and TRM share added in 2.2, 6.2, 6.4, 8.1, 11. 6.4 "What the page uses" now the trend and the agentic share. Q3 range corrected to 37M to 68M, since Chainalysis dates 138M to the year to June (G-50) | d2 a4 now the trend, a5 the agentic share, a6 vendor |
| D17 demand | 2.1, 2.2, 2.3 and 6.2: Visa qualifier (G-112), Ramp GA (G-113), Mastercard no GA and Thailand (G-115, G-117), Instant Checkout ended (G-119), ChatGPT Wallet unverified (G-136). Amex ACE C Spec on G-24 and G-20 | d2 a18 (1.52 percent) and a19 (86 percent), d1a `amex-ace` C Spec with src G-24 and G-20, qualifiers in `visa-ic`, `mc-agentpay` |
| D18 players | 9.1 to 9.5: P 15 plus T 10, anchors and T basis per candidate, arithmetic shown for every scored candidate, Coinbase M 3, Cloudflare M 3, Amazon R 2, Shop Pay counted for the networks and Shopify only, Tempo out with its reason (G-51), token layer partner line | d2 companies `mastercard` 400, `google` 380, `visa` 380. Startups `rain` 265, `skyfire` 220, `crossmint` 180 (new). `tempo` removed |
| D19 challenges | 10.1 to 10.4: 1 and 5 merged, 3 and 7 merged, churn and customer and margin added at E 4 x S 3, ties broken by S then the merchant and builder columns then the total, next five listed, bank stances added | d3 ten items, ids 1 to 10 in the new order, sev for all six |
| D20 scenarios | 11.2 rebuilt on two axes with `open`, `walled`, `referral`, `machines`, each with a dated condition, a kill test and how the thesis fares. 11.3 signposts switched from network disclosure to the vendor panel and V17 | d2 `scenarios` with the four ids, `signposts` rebuilt, every scenario matches or is empty |
| D21 smaller items | China (G-47, G-48, G-49) in 6.2 and 9.5. Banks (G-29, G-30) in 6.3, 7.1, 10. Local Payments Council (G-32) and ICO (G-33) in 7.2 and 11.3. DRCF (G-122, G-123) in 7.2. Personal Agent Protocol (G-15) in 2.1 as Watch | none |

Notes on decisions applied differently:

1. Alipay stays Pilot, as the lead decided. The 2.3 note says K1 found live use, but the newest evidence is a vendor statement of 2026-05-26 (R2-67) and the weekly figure dates from February 2026. The decision text said February only, which would have contradicted R2-67 in the same section, so both dates are given.
2. Challenge order changed inside the score ties under the new tie rule: mandates 5th, wrong purchases 6th, banks 7th, rules 8th, churn 9th, customer and margin 10th. Cross references (4.4 P21 note, challenge 7 for banks) were updated.
3. The 5.2 Mermaid node ids C1 to C8 were renamed GC1 to GC8, so the doc carries no token a reader could take for a critique id.
4. Residual item 7 above (the generic P4 value "network held instructions") is still not renamed. No decision covered it.

Checks after editing: `merge.py` 0 hard and 0 soft faults. `ledger.py --check` no unknown ids (R1-65 and R1-66 are cited only by the old data.json). Mermaid validator 8 of 8 blocks render. No em-dash and no semicolon in the doc, the fragments or G3_checker_sources.md.
