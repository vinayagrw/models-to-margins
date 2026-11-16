# R2 Payment rails, credentials and machine payments for agents

Strand R2 of the agentic commerce protocols study. Written 2026-11-15. Follows R0_schema.md. Builds on R0_R2_rails.md (baseline rows to 2026-10-22, cited here by their baseline id such as C395 or W#4). New claims carry ids R2-01 onward and are listed in section 5. Every new claim comes from a page opened in this round. Pages seen only in search results are not cited as sources. They are listed as leads in section 6.

Note on method. The shared web search budget ran out during this round. Remaining gaps were filled only by opening known URLs. Section 6 lists what is still open.

## 1. Summary

1. Machine pay per call is the only use case with independent, on chain numbers, and they are small. x402 shows about 200.7M lifetime transactions and about 43.0M USD lifetime value (agenteconomy.to, 2026-11-15). October 2026 settled 5.1M transactions worth about 274K USD, about 5 cents each (R2-38, R2-39).
2. Trackers disagree by up to about 4 times on counts and about 60 times on value. They agree when they count the same thing. For August 2026 two independent trackers gave 17.9M and 18.3M payments. The value gap comes from counting every USDC transfer that uses the same signed transfer primitive, including one bridge contract (R2-46).
3. Activity is concentrated and spiky. More than half of all x402 transactions came from November and December 2025 (R2-42). In the five days to 14 Nov 2026 one facilitator (Polygon) carried 60.1% of x402 transactions and the daily run rate was about 3 times October's (R2-40, our arithmetic).
4. MPP is much smaller on chain. Tempo MPP shows 48,585 lifetime events from 1,874 payers to 92 payees (R2-28). Its IETF draft has expired (R2-25). mpp.dev now lists 12 payment method entries and still no ACH (R2-23), which matches the do not regress rule.
5. Card network agentic tokens are live in consumer checkout on named platforms. Shop Pay now pays inside personal agents with Mastercard, Visa and Discover tokens (R2-11) and Visa says nearly 50 AI partners are live (R2-01). Neither network has published an agentic volume, and both call it small.
6. The credential fight is now explicit. Mastercard calls one time virtual cards a bridge it will not support long term (R2-09). Stripe's new Link balance spends a USDC balance through a virtual card (R2-21). Stripe's Shared Payment Tokens can ride network agentic tokens underneath (R2-16).
7. B2B procurement moved from talk to pilots on card rails. Visa, BILL and Billtrust run a live pilot with tokenized credentials (R2-04). Visa says Ramp's agentic bill pay is generally available (R2-02, vendor).
8. Banks are gatekeepers. JPMorgan blocks outside agents that log in with customer credentials (R2-65). This pushes agents toward tokens and open banking rather than screen scraping.
9. Regional rails differ in maturity. Alipay AI Pay reports the largest base (100M users, 300M transactions, vendor) with explicit user authorisation for every payment (R2-66, R2-67). India UPI and Brazil Pix agent payments are pilots or launches without volume. India's Unified Agent Protocol is unconfirmed (R2-69). The UK's first live agentic bank payment used a Direct Debit mandate (R2-73).
10. Only crypto rails publish fees and latency. Coinbase's facilitator charges 0.001 USD per settlement after 1,000 free per month and targets 900 ms P95 settlement on Base (R2-34, R2-35). Stripe's minimum is 0.50 USD for a card token and 0.01 USDC for stablecoins (R2-18). Card networks publish no agentic fee or latency.

## 2. Rail and credential blocks

Maturity codes: C consumer checkout, B B2B procurement, M machine pay per call. Status words follow R0 section 2. "Below bar" means the best evidence found is weaker or older than the schema minimum for that status. Field codes P5, P6, P7, P11, P12, V9 and V10 follow R0 section 1.

### B1. Visa Intelligent Commerce, agentic network tokens and Trusted Agent Protocol

- Owner: Visa.
- What it is: APIs that let an agent pay with a Visa token provisioned for that agent, after the cardholder sets up a passkey and an approved purchase instruction (R2-05, C282).
- P5 credential: agentic network token, provisioned through Visa Token Service (R2-05).
- P6 rail: card network.
- P7 finality: reversible by chargeback.
- P11 transport: REST APIs, a Visa MCP server (C383), and signed HTTP requests at the merchant edge through Trusted Agent Protocol (C364).
- P12 crypto primitive: passkey or FIDO assertion (Visa Payment Passkey), a JWE encrypted purchase instruction (R2-05), and RFC 9421 HTTP message signatures with Ed25519 for Trusted Agent Protocol (C363, C364).
- V9 fees: not published for agentic flows. V10 latency: not published.
- Maturity: C Live, as_of 2026-10-28 (Shop Pay in personal agents uses Visa tokens, R2-11, and nearly 50 AI partners live, R2-01). B Pilot, as_of 2026-10-21 (BILL and Billtrust live pilot, R2-04. Ramp GA is a vendor statement, R2-02). M Pilot, as_of 2026-04-08, below bar because stale (Intelligent Commerce Connect supports MPP, C395).
- Live numbers: nearly 50 AI partners live and in production, expected to double (R2-01, vendor, rung 6). No transaction count, token count or volume disclosed. December 2025 baseline said hundreds of agent transactions and over 20 agents and enablers integrating (C362, vendor).
- Related: Visa's own benchmark found models failed 42.8% of shopping test runs (R2-06). Only 23% of US consumers trust generative AI to pay for them (R2-07).

### B2. Visa Intelligent Commerce Connect

- Owner: Visa.
- What it is: an on ramp for agent builders that is agnostic of network, protocol and token vault. It supports Trusted Agent Protocol, MPP, ACP and UCP (C395).
- P5: agentic network tokens, including non Visa cards per C395. P6: card network. P7: reversible by chargeback. P11: REST APIs (not rechecked). P12: as B1 (not rechecked).
- V9, V10: not published.
- Maturity: C, B and M Pilot, as_of 2026-04-08 with AWS, Highnote, Mesh and Payabli (C395). Below bar because stale. Not rechecked this round.
- Live numbers: none found.

### B3. Mastercard Agent Pay and agentic tokens

- Owner: Mastercard.
- What it is: agentic tokens bound to a registered agent, with passkey authentication, an acceptance framework for merchants and a Verifiable Intent record of what the user asked for (C360, C366, W#16).
- P5: agentic network token.
- P6: card network.
- P7: reversible by chargeback.
- P11: REST token APIs. Web Bot Auth signed requests at the merchant edge (C363).
- P12: passkey or FIDO assertion, RFC 9421 Ed25519 signatures through Web Bot Auth (C363), and Verifiable Intent with selective disclosure, Draft v0.1 (C366, W#16).
- V9, V10: not published.
- Maturity: C Live, as_of 2026-10-28 (Mastercard tokens in Shop Pay agent checkout, R2-11. All European issuers enabled at network level and 36 banks completed live transactions, C360). B not found. M see B4.
- Live numbers: no agentic transaction or token count disclosed on the Q3 2026 call (R2-09, R2-10). Europe: 36 banks with live transactions (C360, vendor).
- Position: the CEO calls one time virtual cards "a bridge" and not a long term solution Mastercard will support (R2-09).

### B4. Mastercard Agent Pay for Machines

- Owner: Mastercard.
- What it is: a layer on the Mastercard network for small, high frequency agent payments across cards, accounts and stablecoins, with programmatic spending limits and agent credentialing (R2-13).
- P5: agentic token or account credential (detail not published). P6: card network, account to account and stablecoin (R2-13). P7: mixed by rail. P11: not stated. The Block names x402 and MPP only as other protocols, not as supported (R2-13). P12: not stated.
- V9, V10: not published.
- Maturity: M Pilot, as_of 2026-06-10, launched with more than 30 partners including Adyen, Coinbase, Tempo, Cloudflare and Checkout.com (R2-13, R2-14). C and B Absent for this product.
- Live numbers: none. Baseline W#3 described signed vouchers between agents. This round's re-read of the same PYMNTS page did not show that wording, so treat the voucher mechanism as unconfirmed.

### B5. American Express agentic tokens (other)

- Owner: American Express.
- What it is: ACE Developer Kit with agent registration, tokenized credentials and purchase protection for registered agents (C372).
- P5: network token. P6: card network. P7: reversible by chargeback. P11, P12: not rechecked.
- Maturity: C Pilot, as_of 2026-04-14 for select developers (C372). Shopify lists Amex tokens as "coming soon" for Shop Pay in agents (R2-11).
- Live numbers: none found.

### B6. Stripe Shared Payment Tokens, Link agent wallet, Link balance and agent toolkit

- Owner: Stripe.
- What it is: a Shared Payment Token is a scoped grant of the buyer's saved payment method to one seller, limited by currency, maximum amount and expiry, and revocable at any time (R2-15). Link's agent wallet hands an agent a token or a one time card (C371). Link balance, rolled out from 2026-10-26 with the Instinct agent, holds USDC with Bridge as custodian and lets the agent spend under a per purchase ceiling (R2-21).
- P5: PSP scoped token, virtual card, and a stablecoin balance spent through a virtual card (Link balance).
- P6: card network, wallets and buy now pay later (Klarna, Affirm) for tokens (R2-15). Link balance is funded in stablecoin but reaches the merchant as a card payment (R2-21).
- P7: reversible by chargeback for card payments.
- P11: REST checkout and PaymentIntents APIs. Stripe also offers MCP and agent skills (docs header, not detailed here).
- P12: no agent signature in the token flow. Stripe may trigger 3D Secure step up (R2-15). For cards Stripe may use Mastercard Agent Pay and Visa Intelligent Commerce tokens underneath (R2-16).
- V9: fee rate not stated in the pages opened. Minimum card payment through a token is 0.50 USD (R2-18). V10: not published.
- Availability: the token API still uses a preview version (2026-09-30.preview) and runs under preview service terms (R2-15). The docs list 34 countries (US, Canada and 32 European countries).
- Maturity: C Live, as_of 2026-09-29 (Muse, Grok Bot and Instinct use Link's agent wallet, C312) and 2026-10-26 for Link balance (R2-21). B Spec, as_of 2026-10-21 (Treasury for agents moves money with human confirmation, W#4, no procurement product found). M Live, as_of 2026-11-15 (cards through tokens inside MPP, R2-17).
- Live numbers: agentic Link purchases rose 38 times in a month (C312, vendor, no base). OUSD on Stripe has more than 800M USD in circulation (R2-20, vendor). No absolute token or transaction count.

### B7. MPP, Machine Payments Protocol

- Owner: co-authored by Tempo and Stripe (R2-23).
- What it is: an HTTP 402 payment scheme. The server sends a payment challenge and the client retries with a payment credential (C370). Intents are charge, session (metered pay as you go) and subscription (R2-22, R2-24).
- P5: depends on method. Stablecoin key for Tempo, Solana, EVM and other chains, PSP scoped token for Stripe, card for the card method, Lightning wallet (R2-23).
- P6: stablecoin on chain, card network, Lightning, wallet (RedotPay) (R2-23). No ACH method (R2-22, R2-23).
- P7: final with refund by agreement on chain. Card methods reversible by chargeback.
- P11: HTTP 402 with WWW-Authenticate Payment and Authorization Payment headers (C370).
- P12: method specific. Sessions on Tempo use payment channels (R2-26). Signature format not opened.
- V9: Stripe settles sessions in sub cent increments with a 0.01 USDC minimum settlement (R2-18). Tempo charges network fees in stablecoins (R2-26). V10: Tempo claims deterministic sub second finality, no number (R2-26).
- Spec status: maintained on GitHub (no release tag) and mpp.dev. The IETF core draft (draft-ryan-httpauth-payment-01, last revised 2026-03-17) is expired and was never adopted by a working group (R2-25).
- Maturity: M Live, as_of 2026-11-15 (on chain events R2-28, Stripe accepts MPP R2-17). C Spec (card tokens can ride MPP, no verified consumer checkout found). B Absent (none found).
- Live numbers: 48,585 lifetime Tempo MPP events, 1,874 unique payers, 92 unique payees (R2-28, rung 3). Card and token payments over MPP settle off chain and are not in this count.

### B8. Tempo (payments chain)

- Owner: Tempo, MPP co-author with Stripe.
- What it is: a payments blockchain that charges fees in USD stablecoins and claims deterministic sub second finality (R2-26).
- P5: stablecoin key. P6: stablecoin on chain. P7: final. P11: MPP over HTTP 402. P12: on chain signatures (format not opened).
- V9: fee charged in stablecoins, amount not stated on the developer page (R2-26). V10: sub second finality claimed, no figure.
- Maturity: M Live, as_of 2026-11-15 (MPP events, R2-28). Link balance holds USDC on Tempo per trade press (R2-21).
- Live numbers: more than 1B USD rolling 30 day stablecoin transfer volume as of 2026-09-02 (R2-27, press, data source not named). This is mostly payouts and treasury flows per the same coverage, not agent payments.

### B9. x402

- Owner: x402 Foundation under the Linux Foundation. Incubated at Coinbase, which now keeps a development fork (R2-29, R2-31).
- What it is: HTTP 402 payments. The server rejects an unpaid request with 402, the client pays and retries (C274).
- Spec version: v2 is current. The spec folder holds v1 and v2 files (R2-30). v2 shipped 2025-12-11 (C368).
- Schemes: exact, upto and batch-settlement in the Foundation repo (R2-29). Coinbase's Wallet MCP also uses auth-capture (R2-48). batch-settlement is EVM only on Coinbase's facilitator (R2-36).
- Facilitators: 18 tracked by agenteconomy.to (R2-38). Coinbase's facilitator settles on Base, Polygon, Arbitrum, Monad, World and Solana (R2-36). Polygon's facilitator carried 60.1% of recent transactions (R2-40).
- P5: stablecoin key in a wallet. P6: stablecoin on chain, mostly USDC. P7: final with refund by agreement. No chargeback path in the protocol (escrow sits in separate layers, DC#11, unverified).
- P11: HTTP 402 and headers. The spec also has a transports v2 folder (contents not opened).
- P12: on chain signatures. EIP 712 and EIP 3009 per the R0 schema default. The scheme file itself was not opened this round.
- V9: Coinbase facilitator free for the first 1,000 settlements a month, then 0.001 USD each, with no processor or chargeback fee (R2-34). V10: Coinbase targets P95 settlement of 900 ms on Base and 1,500 ms on Solana, and P95 verification of 60 ms and 275 ms (R2-35, target not measurement).
- Governance: launched under the Linux Foundation on 2026-04-02 with 40 members (R2-31). Operational launch 2026-07-14 with 40 members including Adyen, AWS, Amex, Circle, Cloudflare, Coinbase, Fiserv, Google, Mastercard, Shopify, Stripe and Visa (R2-32). More than 50 members by 2026-10-01 (R2-33).
- Maturity: M Live, as_of 2026-11-15 (R2-38). C Spec (AP2 has x402 samples, C357, no verified consumer checkout). B Spec (none found).
- Live numbers: see section 3. The x402.org home page no longer shows a dashboard. It now says only that x402 has processed millions of transactions (R2-37), so baseline C369 cannot be re-read there.

### B10. L402 and Lightning for agents

- Owner: Lightning Labs.
- What it is: HTTP 402 with a token and a Lightning invoice. The client pays and retries with the token and the payment preimage as proof (R2-53).
- P5: Lightning wallet. Stablecoin support through Taproot Assets is "coming soon" in Wavelength (R2-55). P6: Lightning. P7: final. P11: HTTP 402 with an L402 header, plus MCP tool calls (R2-54, R2-55). P12: macaroons and a sha256 payment preimage, verified locally (R2-53).
- V9: Wavelength charges a 1 basis point service fee during its closed alpha, plus normal routing fees (R2-55). V10: described as instant, no figure.
- Maturity: M Pilot, as_of 2026-07-21 (Wavelength alpha, mainnet by invite, R2-55). L402 has run inside Lightning Loop through Aperture (R2-53, no date). C and B Absent.
- Live numbers: none found. The agent tools repo has 61 stars (R2-54). MPP also lists a Lightning method (R2-22).

### B11. Coinbase (AgentKit, Agentic Wallets, Wallet MCP, facilitator)

- Owner: Coinbase.
- What it is: wallets and tools so agents can hold and spend stablecoins, plus the most documented x402 facilitator. The old Payments MCP docs URL now serves a page for Wallet MCP, which connects Coinbase Wallet to Claude, ChatGPT, Perplexity, Cursor and other assistants (R2-48).
- P5: stablecoin key (custody model not confirmed this round). P6: stablecoin on chain. P7: final. P11: MCP tool calls and HTTP 402. P12: on chain signatures. Every write action needs user approval and each x402 request has a maxPayment cap (R2-48).
- V9, V10: as x402 facilitator (R2-34, R2-35). AWS lists 0.005 USD per wallet operation as an example provider fee (R2-57).
- Maturity: M Live, as_of 2026-11-15 (facilitator on mainnets, R2-36). C and B Absent (none found).
- Live numbers: none published by Coinbase in pages opened. The Agentic Wallets launch page could not be opened.

### B12. Circle (USDC, Arc, Agent Stack, Nanopayments)

- Owner: Circle.
- What it is: Arc is Circle's chain. Its public mainnet went live on 2026-09-16 with permissioned validators including Visa and Mastercard, USDC as the gas token, and agent wallets, spending limits and nanopayments at launch (R2-51). Nanopayments let an agent pay x402 services in tiny USDC amounts that Circle Gateway batches into one on chain settlement (R2-52).
- P5: stablecoin key (agent wallet). P6: stablecoin on chain. P7: final. P11: HTTP 402 (x402). P12: batched payment authorizations settled on chain (signature format not opened).
- V9: no per payment gas for the agent, down to 0.000001 USD per payment (R2-52). Circle fee not stated. V10: not stated.
- Maturity: M Live, as_of 2026-09-16 (R2-51). Availability of Agent Stack on each chain not confirmed. C and B Absent for agent products.
- Live numbers: more than 100 partners at Arc launch per Decrypt (R2-51, vendor via press).

### B13. Stablecoin rails generally

- Market: about 300B USD, 99% dollar pegged (FSB, C340). Visa stablecoin settlement passed a 20B USD annualized run rate (C401, vendor). Open USD went live about 2026-09-30 (C421). Stripe made OUSD its default stablecoin and says more than 800M USD is in circulation (R2-20, vendor).
- Rules: OCC GENIUS Act final rule effective 2027-01-18 (C341). Four large US banks plan a tokenized deposit network for the first half of 2027 (C422).
- P5: stablecoin key. P6: stablecoin on chain. P7: final with refund by agreement.
- Maturity for agent use: M Live through x402 and MPP (B7, B9). Regulation Unsettled in the US until the rule takes effect (C341).

### B14. AWS AgentCore payments

- Owner: Amazon Web Services.
- What it is: managed payments for agents buying APIs, MCP servers and content. It supports MPP and the x402 upto scheme, works with Coinbase and Stripe Privy wallets, and enforces limits at the infrastructure layer (R2-56). Each payment session has a budget and an expiry (C385).
- P5: stablecoin key through a wallet provider. P6: stablecoin on chain. P7: final. P11: MCP tool calls through AgentCore Gateway and HTTP 402. P12: wallet provider signatures, plus Cedar based policy checks (C386).
- V9: no AWS charge. The wallet provider charges per wallet operation, with 0.005 USD used as the worked example (R2-57). V10: not published.
- Maturity: M Live, as_of 2026-08-18 GA (R2-56). C and B Absent.
- Live numbers: none found.

### B15. Google (AP2, UCP, Google Cloud)

- Owner: Google.
- What it is: AP2 is a mandate based payments protocol, now at v0.2 and donated to FIDO working groups (C357). UCP is Google's checkout protocol. Alphabet says UCP gives direct checkout for hundreds of thousands of brands and is being combined with AP2 (R2-58).
- P5: wallet account (Google Pay rails, per Checkout.com, R2-63) and signed mandates. P6: card network through Google Pay. P7: reversible by chargeback. P11: REST checkout, A2A and MCP. P12: signed mandates (C357, detail in R1).
- Maturity: C Live below bar, as_of 2026-10-28 (vendor statement on an earnings call, R2-58). AP2 Spec (C357). M Spec (AP2 x402 sample, C357). B Absent.
- No Google Cloud managed agent payment service like AgentCore payments was found.

### B16. Microsoft (Copilot Checkout, Azure)

- Owner: Microsoft.
- What it is: Copilot Checkout lets US users buy inside Copilot.com. Payments run through PayPal, Shopify and Stripe on ACP, and the merchant stays merchant of record (R2-59).
- P5: PSP token or wallet account. P6: card network and wallet. P7: reversible by chargeback.
- Maturity: C Live below bar, as_of 2026-01-10 (stale). M and B Absent. No Azure AI Foundry agent payment product was found.

### B17. Cloudflare (Pay per crawl, Monetization Gateway, Wallets, NET Dollar)

- Owner: Cloudflare.
- What it is: Monetization Gateway charges agents per request with HTTP 402 and x402. It is in closed beta for eligible US sellers and buyers, settles in USDC on Base and uses Coinbase's x402 facilitator (R2-49). Cloudflare Wallets were announced with owner set allowances and allow lists, but payments are "soon" (R2-50). NET Dollar was announced in 2025. No launch evidence was found.
- P5: stablecoin key. P6: stablecoin on chain. P7: final. P11: HTTP 402. P12: on chain signatures, and Web Bot Auth signatures for agent identity (C363).
- V9: Cloudflare fee not stated. V10: not stated.
- Maturity: M Pilot, as_of 2026-09-30 (closed beta, R2-49). C and B Absent.
- Live numbers: none published.

### B18. PayPal (agent tools, agentic commerce services, Venmo)

- Owner: PayPal.
- What it is: an agent toolkit of 30 merchant tools in 7 groups (orders, refunds, invoices, subscriptions, disputes, catalog, shipping) plus 3 gift card checkout tools on a remote MCP server (R2-60). PayPal is a processor for Copilot Checkout (R2-59).
- P5: wallet account. P6: wallet balance and card. P7: PSP or platform policy (not checked). P11: MCP and REST. P12: not checked.
- Maturity: C Live below bar as a Copilot Checkout processor, as_of 2026-01-10. PayPal's own Agent Ready product status not confirmed (search only). B and M Absent. Venmo: no agent product found.
- Conflict: baseline W#6 recorded 50 tools on the same page dated 29 Oct 2026. This round counted 33 (R2-60).

### B19. Adyen

- Owner: Adyen.
- What it is: Adyen Agentic, three API layers (Feed, Cart, Payments) with token portability and merchant of record kept with the merchant. Compatible with Meta's AI checkout. Limited availability for US enterprise merchants (R2-61). Adyen also works with Sierra and Meta on a Personal Agent Protocol (R2-62).
- P5: PSP token and network tokens (detail not published). P6: card network. P7: reversible by chargeback. P11: REST APIs.
- Maturity: C Pilot, as_of 2026-06-16 (named merchants ESW, Scheels, Sezane, SharkNinja per Digital Transactions). M Spec (x402 Foundation premier member R2-32, Agent Pay for Machines partner R2-14). B Absent.
- Live numbers: no agentic figures in the Q3 2026 update (R2-62).

### B20. Worldpay (Global Payments)

- Owner: Worldpay.
- What it is: collaboration with Google on UCP checkout for US retailers. The release said checkout "launches soon" (R2-64).
- P5: PSP and network tokens (not detailed). P6: card network. P7: reversible by chargeback.
- Maturity: C Spec below bar, as_of 2026-01-28. No later dated live evidence found. Worldpay is in Arc's founding cohort (R2-51).

### B21. Checkout.com

- Owner: Checkout.com.
- What it is: a certified ACP payment handler, UCP processing over Google Pay rails, and agent scoped tokens held in the Checkout.com vault (R2-63).
- P5: PSP scoped token. P6: card network. P7: reversible by chargeback. P11: REST.
- Maturity: C Pilot, as_of 2026-11-15 page read ("early access for selected partners", R2-63). M Spec (Agent Pay for Machines partner, R2-13). B Absent.

### B22. Fiserv

- Owner: Fiserv.
- What it is: deploys Visa Intelligent Commerce and Trusted Agent Protocol (C414) and the Mastercard Agent Pay Acceptance Framework (C415). x402 Foundation premier member (R2-32). Agentic Payments Alliance founding member (C416).
- P5: network tokens as token requester for merchants. P6: card network. P7: reversible by chargeback.
- Maturity: C Spec, as_of 2025-12-22 (announcements, no dated live evidence found). B and M Absent.

### B23. JPMorgan Payments

- Owner: JPMorgan Chase.
- What it is: payments, tokenization for agents and fraud tools for Mirakl's agentic commerce platform (C382). Plans for high agent autonomy in treasury with maker checker controls (C354). A shared tokenized deposit network with three other banks planned for the first half of 2027 (C422). The retail bank blocks outside agents that use customer credentials (R2-65).
- P5: network token (merchant side). Bank account access for agents only through open banking data sharing (R2-65). P6: card network and, later, tokenized deposits. P7: by rail.
- Maturity: C Spec, as_of 2026-03-10 (agreement, no live evidence found). B Unsettled, as_of 2026-10-07 (C354).

### B24. India UPI and NPCI agentic payments

- Owner: NPCI with Razorpay and AI platforms.
- What it is: users approve one spending limit per merchant through UPI Reserve Pay and the agent then orders without repeated PIN prompts. Pilot on Claude with Zomato, Swiggy and Zepto (R2-68). Reserve Pay lets users block funds for multiple debits, about 10,000 rupees for up to 90 days (R2-69).
- P5: bank account mandate (UPI Reserve Pay). P6: real time account to account. P7: final, refund by merchant (dispute rules not checked). P11: integration inside the AI app (protocol not stated). P12: UPI PIN at limit approval (implied by the release), no agent signature.
- V9, V10: not checked.
- Maturity: C Pilot, as_of 2026-02-20 (R2-68), below bar because stale. Unified Agent Protocol Unsettled, as_of 2026-09-09: NPCI has not confirmed it and limits and liability are pending (R2-69). NPCI's AiNxt and AtOM platforms are not agent payment products (R2-70). B and M Absent.
- Live numbers: none disclosed.

### B25. Brazil Pix (Pix Automatico, agent pilots)

- Owner: Banco Central do Brasil (rail). Iniciador and others (agent layer).
- What it is: Pix Automatico is a recurring Pix mandate. Iniciador offers an MCP server so bank and fintech agents can start Pix payments that the user approves by device biometric each time, through Pix Biometria (R2-72).
- P5: bank account mandate (Pix Automatico) or per payment biometric authorisation (Pix Biometria). P6: real time account to account. P7: final, refund by agreement (fraud return rules not checked). P11: MCP tool calls (Iniciador). P12: device biometric (Face ID, Touch ID or equivalent) per payment.
- Maturity: C Spec for agent payments, as_of 2026-05-21 (launch with no stated status, R2-72). Pix Automatico Live as a rail, as_of 2026-10-27 (R2-71). No central bank rule on agents found. B and M Absent.
- Live numbers: Pix Automatico moved 3.5B reais in 9.5M transactions in Q2 2026 (R2-71). These are not agent payments.

### B26. China Alipay, Ant and Tencent

- Owner: Ant Group (Alipay), Tencent (Weixin Pay).
- What it is: Alipay AI Pay installs into agents such as JVS Claw, DTClaw, Claude Code and Hermes Agent. Users verify identity once and approve each payment (R2-66). AI Wallet is a control layer between user and agent, and Token Pay serves AI model companies (R2-67). Tencent and Visa signed an MoU to explore agentic payments (R2-08).
- P5: wallet account. P6: wallet balance and linked accounts. P7: not checked. P11: agent plug in. P12: identity verification at activation and explicit user authorisation per payment (method not stated).
- Maturity: C Live below bar, as_of 2026-05-26 (vendor figures, stale). Tencent C Spec, as_of 2026-10-29 (MoU, R2-08). B and M Absent. Ant International, Visa and Mastercard know your agent work in C365.
- Live numbers: more than 100M users by February 2026, 120M transactions in one week in February 2026, and 300M transactions to date by late May 2026 (R2-66, R2-67, vendor). The two transaction figures do not reconcile easily (section 3).

### B27. UK open banking, VRP and agent payments

- Owner: UK Payments Initiative (commercial VRP scheme), FCA, banks and payment firms.
- What it is: commercial VRP lets a merchant pull variable recurring bank payments within user set limits. GoCardless made what it calls the UK's first live agentic account to account payment, a recurring charity donation set up by an AI agent under a Direct Debit mandate, inside the FCA AI Live Testing programme (R2-73).
- P5: bank account mandate (VRP or Direct Debit). P6: real time account to account (VRP) or Direct Debit (GoCardless case). P7: not checked. P11: open banking REST APIs. P12: bank strong authentication at consent (not checked).
- Maturity: C Pilot, as_of 2026-09-22 (R2-73). Rules Unsettled: the FCA plans to consult on a long term open banking framework by end 2026 (R2-74). B and M Absent.
- Live numbers: VRPs are about 16% of open banking payments per the FCA (R2-74). No agent volume.

### B28. Virtual and stablecoin card issuing for agents (other)

- Owners: Stripe Issuing for agents (C371), Rain (C399, C400, C416), Natural (C398).
- What it is: single use or scoped virtual cards, some funded by stablecoins, that an agent spends on normal card rails.
- P5: virtual card. P6: card network. P7: reversible by chargeback.
- Maturity: C Live below bar (Rain says agents have used its cards in production for months, C399, vendor, undated). Not rechecked this round. Mastercard's stance on virtual cards (R2-09) is the main new risk to this model.

## 3. Adoption numbers table

| metric | value | as_of | source type | rung | evidence tag | does not tell you |
|---|---|---|---|---|---|---|
| x402 lifetime transactions | 200,680,559 (R2-38) | 2026-11-15 | independent on chain tracker (agenteconomy.to) | 3 | verified 2026 | How many are agents, tests or incentive farming. Filtering method not read |
| x402 lifetime settled value | about 43.0M USD (R2-38) | 2026-11-15 | independent on chain tracker | 3 | verified 2026 | Value net of self dealing |
| x402 lifetime transactions, second read | 196M across 12 chains, more than 42M USD (R2-41) | 2026-11-01 | vendor blog citing the same tracker (Fireblocks) | 5 | vendor | Independent of agenteconomy.to (it is not) |
| x402 transactions, October 2026 | 5.1M, about 274K USD (R2-39) | 2026-10-31 | independent on chain tracker | 3 | verified 2026 | Whether payers are AI agents |
| x402 average payment, October 2026 | about 0.054 USD (our arithmetic from R2-39) | 2026-10-31 | derived | 3 | verified 2026 | Distribution, only the mean |
| x402 share from Nov and Dec 2025 | 106.8M of 200.7M, about 53% (our arithmetic from R2-38 monthly table, matches R2-42) | 2026-11-15 | derived | 3 | verified 2026 | Why the spike happened |
| x402 facilitator concentration | Polygon facilitator 1,856,674 of 2,597,871 transactions, 60.1%, in 5 days to 14 Nov (R2-40) | 2026-11-14 | independent on chain tracker | 3 | verified 2026 | Whether the surge is organic |
| x402 daily run rate, mid November vs October | about 520K per day vs about 165K per day (our arithmetic) | 2026-11-14 | derived | 3 | verified 2026 | Whether it lasts |
| x402 chain share of transactions | Base about 45%, Solana about 34% (R2-43) | 2026-11-01 | vendor blog citing tracker | 5 | vendor | Share by value |
| x402 transactions on Base, Q3 2026 | more than 138M (R2-45) | 2026-09-30 | press reporting Chainalysis | 5 | vendor | Method. Chainalysis report not opened |
| Agent payments, Q3 2026 (broad definition) | 68.3M payments worth 3.7M USD (R2-44) | 2026-09-30 | vendor blog citing Allium | 5 | vendor | Allium's classification rules |
| USDC signed transfer payments, five EVM chains | 18.3M payments worth 2.59B USD in August, 317M USD without one bridge contract (R2-46) | 2026-08-31 | independent on chain audit (Bitquery) | 3 | verified 2026 | Which of these are agent payments (inference) |
| Share of x402 transactions judged artificial | about 50% (R2-47) | 2026-07-10 | press citing Artemis | 5 | vendor | Method and time window |
| Real daily x402 settlement | about 28,000 USD (R2-47) | 2026-07-10 | press citing CoinDesk | 5 | vendor | Date range of the estimate |
| x402 adjusted cumulative volume | about 19M USD (C285) | 2026-04-21 | press reporting Visa and Artemis | 5 | vendor | Transaction count and exclusion method |
| x402 30 day dashboard (baseline) | 75.41M transactions, 24.24M USD (C369) | 2026-08-25 | protocol site | 6 | vendor | No longer shown on x402.org (R2-37) |
| MPP on Tempo, lifetime | 48,585 events, 1,874 payers, 92 payees (R2-28) | 2026-11-15 | independent on chain tracker | 3 | verified 2026 | Card and token MPP payments off chain, value |
| x402 to MPP on chain ratio | about 4,100 to 1 by count (our arithmetic) | 2026-11-15 | derived | 3 | verified 2026 | Relative value or off chain MPP use |
| Tempo stablecoin transfers | more than 1B USD rolling 30 days (R2-27) | 2026-09-02 | press | 5 | vendor | Agent share. Data source not named |
| Visa AI partners live | nearly 50, expected to double (R2-01) | 2026-10-27 | press reporting earnings call | 6 | vendor | Transactions, volume, definition of live |
| Mastercard European banks with live agent transactions | 36 (C360) | 2026-06-02 | network newsroom | 6 | vendor | Volume, consumer reach |
| Shop Pay users | more than 400M people (R2-12) | 2026-10-28 | vendor newsroom | 6 | vendor | How many pay through agents |
| Link agentic purchases growth | 38 times month over month (C312) | 2026-09-29 | vendor blog | 6 | vendor | Base level |
| OUSD on Stripe | more than 800M USD in circulation (R2-20) | 2026-10-22 | vendor blog | 6 | vendor | Agent use of OUSD |
| Alipay AI Pay users | more than 100M (R2-66) | 2026-02 | press reporting vendor | 6 | vendor | Active users, agent vs assistant use |
| Alipay AI Pay transactions | 120M in one week of February 2026 (R2-66), 300M to date by late May 2026 (R2-67) | 2026-05-26 | press reporting vendor | 6 | vendor | Why a weekly figure is 40% of the later cumulative one |
| Pix Automatico | 9.5M transactions, 3.5B reais in Q2 2026 (R2-71) | 2026-06-30 | press reporting central bank data | 5 | verified 2026 | Any agent share |
| UK VRP share of open banking payments | about 16% (R2-74) | 2026-06-11 | law firm citing FCA | 5 | vendor | Agent use |
| x402 Foundation members | 40 at launch (R2-31), more than 50 (R2-33) | 2026-10-01 | governance records | 2 | verified 2026 | Usage |
| Mastercard Agent Pay for Machines partners | more than 30 (R2-13) | 2026-06-10 | press | 5 | vendor | Live use |
| Arc partners at launch | more than 100 (R2-51) | 2026-09-16 | press | 5 | vendor | Agent use on Arc |
| MPP payment method entries | 12 including custom (R2-23) | 2026-11-15 | spec site | 2 | verified 2026 | Which have live traffic |
| AWS AgentCore payments usage | not found | 2026-11-15 | none | none | none | Anything about use |
| Visa or Mastercard agentic volume or token count | not disclosed (R2-01, R2-09) | 2026-10-29 | earnings coverage | none | none | Anything about scale |

### Why the x402 trackers disagree

- Counts agree when definitions match. For August 2026 agenteconomy.to shows 17.9M x402 transactions across chains and Bitquery counted 18.3M signed USDC payments on five EVM chains (R2-38, R2-46). That is within about 2%.
- Value does not agree. Bitquery's 2.59B USD for August includes every USDC payment that uses the same signed transfer instruction, including one bridge contract. Without it the figure is 317M USD (R2-46). agenteconomy.to shows about 43M USD for the whole life of x402 (R2-38). The gap is a scope choice, not a data error.
- Wider counts come from wider definitions. Chainalysis reports more than 138M x402 transactions on Base alone in Q3 2026 (R2-45) against about 36.9M across all chains on agenteconomy.to for July to September (our arithmetic). Allium's 68.3M agent payments for Q3 uses its own classification (R2-44). The x402.org dashboard showed 75.41M transactions in 30 days to late August (C369) against 17.9M for August on agenteconomy.to. We could not open the methods behind the higher counts, so we carry them as a range of about 37M to 138M for Q3.
- Chain share differs by metric. Fireblocks gives Base about 45% and Solana about 34% of lifetime transactions (R2-43). Baseline C287 gave Solana about 70% of 30 day volume in August. One is lifetime count and the other is a 30 day value share.
- Quality filters cut deep. Artemis judged about half of transactions artificial and CoinDesk put real daily settlement near 28,000 USD (R2-47). Visa and Artemis adjusted cumulative volume was about 19M USD in April (C285).
- Use the independent tracker for counts and the narrowest definition for value. Carry Q3 2026 x402 counts as 37M to 138M and lifetime value as about 43M USD, with the note that up to half may be artificial.

## 4. Changes 2026-10-22 to 2026-11-15

- 2026-10-22. Stripe says OUSD has more than 800M USD in circulation and describes purchase protections on Link's agent wallet (R2-20).
- 2026-10-26. Instinct starts US rollout of a prepaid Link balance. USDC custodied by Bridge, a per purchase ceiling, and approval above it (R2-21, trade press, Stripe's own page not found).
- 2026-10-27. Visa fiscal Q4 call. Nearly 50 AI partners live, expected to double. Ramp agentic bill pay GA (R2-01, R2-02). The CEO says trust is the next growth vector and disputes need a clear path (R2-03).
- 2026-10-27. Banco Central data: Pix Automatico 3.5B reais in 9.5M transactions in Q2 2026 (R2-71).
- 2026-10-27. x402.org page updated. It no longer shows dashboard figures (R2-37).
- 2026-10-28. Shopify Fall 26 Edition. Shop Pay checkout inside personal agents (Muse, Claude Duet, Instinct) with Mastercard, Visa and Discover tokens. Amex coming soon (R2-11).
- 2026-10-28. Adyen Q3 update names a Personal Agent Protocol with Sierra and Meta (R2-62). No agentic figures.
- 2026-10-28. Alphabet Q3 call. UCP checkout for hundreds of thousands of brands, being combined with AP2 (R2-58).
- 2026-10-29. Mastercard Q3 call. One time virtual cards are "a bridge", not a long term solution (R2-09, R2-10). No agentic volume figure.
- 2026-10-29. Tencent and Visa MoU to explore agentic payments with Visa Intelligent Commerce (R2-08).
- 2026-10-29. PayPal agent tools page updated. 33 tools counted, no payout or Venmo tool (R2-60).
- 2026-10-30. Visa and Morning Consult survey. 54% of US adults used AI for a shopping task. 23% trust generative AI to pay for them (R2-07).
- 2026-11-01 to 2026-11-03. Fireblocks publishes x402 at 196M lifetime transactions and more than 42M USD, citing agenteconomy.to (R2-41 to R2-44).
- 2026-11-05. Visa Agentic Commerce Benchmark. Models failed 42.8% of shopping test runs (R2-06).
- 2026-11-14. One facilitator (Polygon) carries 60.1% of x402 transactions over five days (R2-40).
- 2026-11-15. x402 at 200.7M lifetime transactions. MPP on Tempo at 48,585 lifetime events (R2-38, R2-28).

Dated before 22 Oct but missing from the baseline:

- 2026-09-09. NPCI Unified Agent Protocol reported as planned, not confirmed (R2-69).
- 2026-09-16. Circle Arc mainnet live with agent wallets and nanopayments (R2-51).
- 2026-09-18. MPP IETF draft listed as expired (R2-25).
- 2026-09-22. GoCardless first live agentic account to account payment in the UK (R2-73).
- 2026-09-30. Cloudflare Monetization Gateway enters closed beta, USDC on Base (R2-49).
- 2026-10-13. JPMorgan blocks outside agents that use customer credentials (R2-65).
- 2026-10-21. Visa Commercial Payment Controls available. Commercial virtual card authentication and supplier validation in pilot, GA expected 2027 (R2-04).

Do not regress check:

- MPP methods. Confirmed. mpp-specs lists Tempo, Stripe, Lightning and Solana and others, and mpp.dev lists 12 entries with no ACH (R2-22, R2-23). Baseline row C370 still says "Tempo, Stripe and ACH". That row is wrong on ACH and should be corrected to match S#2.
- x402 and the Linux Foundation. Confirmed with a nuance. Coinbase docs give 2026-04-02 and 40 members at launch (R2-31). The Linux Foundation gives more than 50 members on 2026-10-01 (R2-33). See section 7.
- Visa Direct and Mastercard Move. No agent payout product found in this round either (search found none, not a fresh primary check).

## 5. Claim table

Source tier key: T2 spec, official docs or governance record. T3 vendor newsroom or blog. T4 independent on chain tracker or audit. T5 trade or general press, or law firm. Rungs follow R0 section 6.

| id | claim | number | unit | event_date | publish_date | url | quote | source_tier | kind | rung | does not tell you | confidence |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| R2-01 | On its fiscal Q4 call Visa said nearly 50 AI partners are live in production, including Shop Pay, and expects the number to double | 50 | partners | 2026-10-27 | 2026-10-29 | https://aimmediahouse.com/banking/visa-says-agentic-commerce-has-hit-a-tipping-point | "Visa has nearly 50 AI partners live and in production on the platform" | T5 | adoption count | 6 | Transactions, volume or what live means | medium |
| R2-02 | Visa said Ramp's agentic bill pay is generally available and BILL's payment agent pays invoices through Visa Intelligent Commerce | | | 2026-10-27 | 2026-10-29 | https://aimmediahouse.com/banking/visa-says-agentic-commerce-has-hit-a-tipping-point | "Ramp's agentic bill pay is now generally available" | T5 | product status | 6 | Number of customers using it or volume | medium |
| R2-03 | Visa's CEO called trust the next growth vector and wants a clear path to resolve problems in agent payments | | | 2026-10-27 | 2026-10-28 | https://www.paymentsdive.com/news/visa-adapts-to-tech-innovations/873045/ | "a clear path to resolution in the event of a problem" | T5 | policy statement | 6 | Any published dispute rule for agents | high |
| R2-04 | Visa's BILL and Billtrust agent pilot is live and processing end to end with tokenized credentials. Commercial virtual card authentication and supplier validation are in pilot with GA expected in 2027 | | | 2026-10-21 | 2026-10-21 | https://usa.visa.com/about-visa/newsroom/press-releases.releaseId.22866.html | "The pilot is currently live and processing end-to-end transactions" | T3 | product status | 4 | Count, volume or number of participants | high |
| R2-05 | Visa Intelligent Commerce provisions an agentic token, needs a Visa Payment Passkey before a purchase instruction, and takes instructions as a JWE payload up to 512,000 bytes | 512000 | bytes | | checked 2026-11-15 | https://developer.visa.com/capabilities/visa-intelligent-commerce | "Visa returns a provisioned agentic token to you" | T2 | spec | 2 | How many tokens exist or which regions are live | high |
| R2-06 | Visa's benchmark of 22 models from 12 labs on 15 shopping tasks found models failed 42.8% of runs | 42.8 | percent of runs failed | 2026-11-05 | 2026-11-05 | https://investor.visa.com/news/news-details/2026/Visa-Releases-First-of-Its-Kind-Industry-Benchmark-for-AI-Shopping-Almost-Half-of-Test-Runs-Fail/default.aspx | "models failed 42.8% of test runs" | T3 | test result | 6 | Error rate in live purchases | medium |
| R2-07 | A Visa and Morning Consult poll of 1,016 US adults found 54% used AI for a shopping task, while the Visa Trust Index finds 23% trust generative AI to pay for them | 23 | percent who trust AI to pay | 2026-10-02 | 2026-10-30 | https://usa.visa.com/about-visa/newsroom/press-releases.releaseId.22886.html | "trust GenAI to handle payment transactions on their behalf" | T3 | survey | 5 | Actual agent payment use | medium |
| R2-08 | Tencent and Visa signed an MoU to explore agentic payments using Visa Intelligent Commerce | | | 2026-10-29 | 2026-10-29 | https://www.tencent.com/tencent-and-visa-announce-strategic-partnership-to-enhance-global-payment-and-commerce-experiences/ | "Tencent and Visa will also explore next-generation agentic payments" | T3 | partnership | 6 | Dates, markets or Weixin Pay integration | high |
| R2-09 | Mastercard's CEO said one time virtual cards in agent payments are a processor bridge, not a long term solution Mastercard will support. Shop Pay uses Agent Pay and network tokens. No agentic volume given | | | 2026-10-29 | 2026-10-29 | https://pymnts.com/earnings/2026/mastercard-backs-tokenized-card-payments-agentic-commerce | "A VCN is a processor decision that is a bridge" | T5 | policy statement | 6 | Whether network rules will restrict virtual cards | high |
| R2-10 | American Banker reports Mastercard is not keen on one time virtual cards for agents and that networks see tokens as the best way to capture intent | | | 2026-10-29 | 2026-10-29 | https://www.americanbanker.com/payments/news/mastercard-touts-the-importance-of-agentic-tokens | "Mastercard isn't too keen on using one-time virtual cards" | T5 | policy statement | 6 | Any agentic figure (none given) | high |
| R2-11 | Shop Pay checkout now runs inside personal agents (Muse, Claude Duet, Instinct). The card is never shared with the agent and tokens come from Mastercard, Visa and Discover, with Amex coming | | | 2026-10-28 | 2026-10-28 | https://www.shopify.com/news/fall-26-edition-merchant | "Shop Pay stays secure with tokens from Mastercard, Visa, Discover" | T3 | deployment | 4 | Number of agent purchases | high |
| R2-12 | Shopify says more than 400 million people trust Shop Pay | 400 | million people | | 2026-10-28 | https://www.shopify.com/news/fall-26-edition-merchant | "More than 400 million people already trust Shop Pay" | T3 | adoption count | 6 | How many use it through agents | medium |
| R2-13 | Mastercard Agent Pay for Machines works across cards, accounts and stablecoins with programmatic spend limits and more than 30 tech partners. No GA date | 30 | partners (more than) | 2026-06-10 | 2026-06-10 | https://www.theblock.co/post/404288/mastercard-agent-pay-machines-support-autonomous-ai-transactions-stablecoins | "works across cards, accounts, and stablecoins" | T5 | product status | 6 | Live volume, pricing or protocol support | high |
| R2-14 | PYMNTS names Adyen as an initial Agent Pay for Machines partner and says Mastercard works with more than 30 initial partners | 30 | partners (more than) | 2026-06-10 | 2026-06-10 | https://www.pymnts.com/mastercard/2026/mastercard-enables-ai-agents-to-pay-each-other/ | "collaborating with more than 30 initial partners" | T5 | partnership | 6 | The voucher mechanism in baseline W#3 (not found on re-read) | medium |
| R2-15 | A Stripe Shared Payment Token carries currency, maximum amount and expiry limits, can be revoked, may trigger 3D Secure, uses API version 2026-09-30.preview and is offered in 34 listed countries | 34 | countries | | checked 2026-11-15 | https://docs.stripe.com/agentic-commerce/concepts/shared-payment-tokens.md?agent-seller=agent | "Set usage limits, including currency, maximum amount, and expiration window." | T2 | spec | 2 | Token volume or fee | high |
| R2-16 | For card tokens Stripe may use Mastercard Agent Pay and Visa Intelligent Commerce network tokens on the agent's behalf | | | | checked 2026-11-15 | https://docs.stripe.com/agentic-commerce/concepts/shared-payment-tokens.md?agent-seller=agent | "Stripe might use tokens issued through network programs such as Mastercard's Agent Pay" | T2 | spec | 2 | Share of token payments that use network agentic tokens | high |
| R2-17 | Stripe machine payments accept MPP (cards and stablecoins) and x402. Networks are MPP on Tempo with USDC.e, MPP on Solana with USDC and x402 on Base with USDC | | | | checked 2026-11-15 | https://docs.stripe.com/payments/machine.md | "Machine payments on Stripe works best with the Machine Payments Protocol (MPP)" | T2 | spec | 2 | Live volume | high |
| R2-18 | Stripe minimums are 0.50 USD for card payments through tokens and 0.01 USDC for stablecoins. MPP sessions charge sub cent amounts but settle in at least 0.01 USDC | 0.01 | USDC minimum settlement | | checked 2026-11-15 | https://docs.stripe.com/payments/machine.md | "the minimum settlement amount is 0.01 USDC" | T2 | fee | 2 | Stripe's percentage fee | high |
| R2-19 | Stripe stablecoin payments are open to businesses in all US states except New York, and in 30 plus countries on request | 30 | countries (more than) | | checked 2026-11-15 | https://docs.stripe.com/payments/machine.md | "Stablecoin payments are available to businesses in all US states, except New York." | T2 | availability | 2 | Uptake | high |
| R2-20 | Stripe says OUSD has more than 800M USD in circulation and Link's agent wallet gives purchase protections on eligible agent purchases | 800 | million USD | 2026-10-22 | 2026-10-22 | https://stripe.com/blog/trends-from-money20-20-2026-the-rise-of-hidden-financial-services | "With more than $800 million in circulation, OUSD allows businesses" | T3 | adoption count | 6 | Agent use of OUSD | medium |
| R2-21 | Instinct began a US rollout of a prepaid Link balance on 26 Oct. USDC is custodied by Bridge, the user sets a per purchase ceiling, and a ceiling of 0 USD forces approval every time | | | 2026-10-26 | 2026-10-28 | https://www.letsmoney.com.br/ia/instinct-link-balance-agente-ia-teto-por-compra/ | "O limite se aplica a cada operação, e não a um gasto acumulado." | T5 | product status | 5 | Stripe's own terms or volume | medium |
| R2-22 | The MPP specs repo lists methods for Tempo, Stripe, Lightning, Solana and others, and intents charge, session and subscription. No ACH | | | | checked 2026-11-15 | https://github.com/tempoxyz/mpp-specs | "Concrete implementations for specific networks and rails (Tempo, Stripe, Lightning, Solana, and others)." | T2 | spec | 2 | Which methods carry live payments | high |
| R2-23 | mpp.dev lists 12 method entries: Tempo, EVM, Stripe, Card, Lightning, Solana, XRP Ledger, Stellar SEP-41, Monad, NEAR Intents, RedotPay and custom. No ACH | 12 | method entries | | checked 2026-11-15 | https://mpp.dev | "the open standard for machine-to-machine payments via HTTP 402, co-authored by Tempo and Stripe" | T2 | spec | 2 | Production use per method | high |
| R2-24 | MPP's session intent covers metered pay as you go payments | | | | checked 2026-11-15 | https://mpp.dev | "Session intent defines metered pay-as-you-go payments in MPP." | T2 | spec | 2 | Session volumes | high |
| R2-25 | The MPP core IETF draft (draft-ryan-httpauth-payment-01, last revised 2026-03-17) is an expired individual draft, never working group adopted | 1 | revision | 2026-03-17 | 2026-09-18 | https://datatracker.ietf.org/doc/draft-ryan-httpauth-payment/ | "This Internet-Draft is no longer active." | T2 | standards status | 2 | Whether a successor draft exists under another name | high |
| R2-26 | Tempo charges network fees in USD stablecoins, claims deterministic sub second finality and supports MPP sessions through payment channels | | | | checked 2026-11-15 | https://tempo.xyz/developers | "Tempo charges network fees in USD stablecoins, not a gas token." | T2 | spec | 2 | Fee amount or measured finality | high |
| R2-27 | Tempo passed 1B USD in rolling 30 day stablecoin transfer volume, about 3.7B USD annualized, with more than 1.2B USD cumulative | 1 | billion USD per 30 days | 2026-09-02 | 2026-09-02 | https://cryptobriefing.com/tempo-1b-stablecoin-transfer-volume/ | "has crossed $1 billion in rolling 30-day stablecoin transfer volume" | T5 | volume | 5 | Agent share. Data source not named | medium |
| R2-28 | MPP on Tempo shows 48,585 lifetime events, 1,874 unique payers and 92 unique payees | 48585 | events | 2026-11-15 | 2026-11-15 | https://agenteconomy.to | "48,585" | T4 | on chain count | 3 | Off chain card MPP payments, value, filtering | medium |
| R2-29 | The x402 repo moved under the x402 Foundation and the Coinbase repo is now a development fork. Schemes listed are exact, upto and batch-settlement | 3 | schemes | | checked 2026-11-15 | https://github.com/coinbase/x402 | "We've moved the x402 repo under the x402 Foundation repo." | T2 | spec | 2 | Release dates | high |
| R2-30 | The Foundation spec folder holds x402 specification v1 and v2 files, plus transports v1 and v2 | 2 | spec version | | checked 2026-11-15 | https://github.com/x402-foundation/x402/tree/main/specs | "x402-specification-v2.md" | T2 | spec | 2 | v2 release date (C368 gives 2025-12-11) | high |
| R2-31 | Coinbase docs say the x402 Foundation launched under the Linux Foundation on 2 April 2026 with forty members | 40 | members at launch | 2026-04-02 | checked 2026-11-15 | https://docs.cdp.coinbase.com/x402/support/x402-foundation | "Forty organizations joined as members at launch." | T2 | governance | 2 | Later member count | high |
| R2-32 | The Linux Foundation announced the x402 Foundation's operational launch with 40 members, premier members including Adyen, AWS, Amex, Circle, Cloudflare, Coinbase, Fiserv, Google, Mastercard, Shopify, Stripe and Visa | 40 | members | 2026-07-14 | 2026-07-14 | https://www.linuxfoundation.org/press/linux-foundation-announces-operational-launch-of-x402-foundation-to-standardize-internet-native-payments-for-ai-agents-and-applications | "40 organizations have joined as members" | T3 | governance | 2 | Usage | high |
| R2-33 | By 1 Oct 2026 the x402 Foundation had more than 50 active members | 50 | members (more than) | 2026-10-01 | 2026-10-01 | https://www.linuxfoundation.org/press/linux-foundation-appoints-michael-hursta-as-executive-director-of-the-x402-foundation | "working with its more than 50 active members" | T3 | governance | 2 | Usage | high |
| R2-34 | Coinbase's x402 facilitator is free for the first 1,000 settlements a month, then 0.001 USD each, with no processor or chargeback fees | 0.001 | USD per settlement | | checked 2026-11-15 | https://docs.cdp.coinbase.com/x402/support/faq.md | "each one after that costs $0.001" | T2 | fee | 2 | Gas costs or other facilitators' prices | high |
| R2-35 | Coinbase targets P95 settlement of 900 ms on Base and 1,500 ms on Solana, P95 verification of 60 ms and 275 ms, and 99.9% availability | 900 | ms P95 settlement on Base | | checked 2026-11-15 | https://docs.cdp.coinbase.com/x402/support/faq.md | "P95 settlement at 900ms on Base and 1500ms on Solana." | T2 | latency | 6 | Measured latency (these are targets) | medium |
| R2-36 | Coinbase's facilitator settles on Base, Polygon, Arbitrum, Monad, World and Solana mainnets, supports exact and upto, and keeps batch-settlement EVM only | 6 | mainnets | | checked 2026-11-15 | https://docs.cdp.coinbase.com/x402/support/faq.md | "The CDP Facilitator settles on Base, Polygon, Arbitrum, Monad, World, and Solana mainnets." | T2 | spec | 2 | Coinbase's share of x402 traffic | high |
| R2-37 | The x402.org home page no longer shows dashboard figures and says only that x402 has processed millions of transactions. Page last updated 2026-10-27 | | | 2026-10-27 | 2026-10-27 | https://www.x402.org/ | "has processed millions of transactions" | T3 | self report | 6 | Any current count | high |
| R2-38 | agenteconomy.to shows x402 at 200,680,559 lifetime transactions and about 43.0M USD settled across 12 chains and 18 facilitators | 200680559 | transactions | 2026-11-15 | 2026-11-15 | https://agenteconomy.to | "200,680,559" | T4 | on chain count | 3 | Agent share or wash filtering (method page not read) | medium |
| R2-39 | agenteconomy.to monthly table: October 2026 settled 5.1M x402 transactions worth about 274K USD. Peak month was December 2025 at 54.2M | 5.1 | million transactions | 2026-10-31 | 2026-11-15 | https://agenteconomy.to | "5.1M" | T4 | on chain count | 3 | Who the payers are | medium |
| R2-40 | In the five days to 14 Nov one facilitator (Polygon) handled 1,856,674 x402 transactions, 60.1% of the total, leaving 741,197 | 60.1 | percent of transactions | 2026-11-14 | 2026-11-15 | https://agenteconomy.to | "1,856,674" | T4 | concentration | 3 | Whether the surge is organic | medium |
| R2-41 | Fireblocks, citing agenteconomy.to, gives 196M lifetime x402 transactions across 12 chains and more than 42M USD settled as of 1 Nov | 196 | million transactions | 2026-11-01 | 2026-11-03 | https://www.fireblocks.com/?p=32426 | "Lifetime x402 transactions across 12 chains as of November 1, 2026" | T3 | on chain count | 5 | An independent second source | medium |
| R2-42 | Fireblocks says more than half of lifetime x402 transactions came from a two month frenzy in late 2025 | 50 | percent (more than) | 2025-12-31 | 2026-11-03 | https://www.fireblocks.com/?p=32426 | "came from a two-month frenzy in late 2025" | T3 | trend | 5 | Cause of the frenzy | medium |
| R2-43 | Fireblocks says Base carried about 45% and Solana about 34% of x402 transactions to date | 45 | percent on Base | 2026-11-01 | 2026-11-03 | https://www.fireblocks.com/?p=32426 | "Base has carried about 45% of all x402 transactions to date" | T3 | chain share | 5 | Share by value | medium |
| R2-44 | Allium found agent payments doubled to 68.3M in Q3 2026 while value fell to 3.7M USD, about five cents each | 68.3 | million payments | 2026-09-30 | 2026-11-03 | https://www.fireblocks.com/?p=32426 | "Allium found agent payments doubled to 68.3 million in Q3 2026" | T3 | on chain count | 5 | Allium's classification | medium |
| R2-45 | Payments Journal reports Chainalysis data of more than 138M x402 transactions on Base in Q3 2026, with more than 87% of payments between 0.0001 USD and 0.10 USD over 16 months | 138 | million transactions | 2026-09-30 | not shown (about Oct 2026) | https://www.paymentsjournal.com/agentic-commerce-transactions-on-x402-protocol-are-picking-up/amp/ | "processed more than 138 million discrete transactions on the Base blockchain in Q3 2026" | T5 | on chain count | 5 | Method. Chainalysis report not opened | low |
| R2-46 | Bitquery counted 18.3M signed USDC payments worth 2.59B USD on five EVM chains in August 2026, or 317M USD without one contract | 18.3 | million payments | 2026-08-31 | 2026-09-06 | https://bitquery.io/investigations/x402-ai-agent-payments-audit | "Take that one contract out and the rail moved $317 million in August" | T4 | on chain audit | 3 | Which payers are agents (inference) | medium |
| R2-47 | Forkast cites Artemis that about half of x402 transactions are artificial and CoinDesk that real daily settlement was near 28,000 USD | 50 | percent artificial | 2026-07-10 | 2026-07-10 | https://forkast.news/the-giants-are-building-on-x402-the-transaction-count-is-the-least-interesting-part/ | "Artemis Analytics notes that approximately 50% of transactions are artificial" | T5 | quality estimate | 5 | Method or window | medium |
| R2-48 | Coinbase's Wallet MCP pays USDC on Base with x402 exact, upto and auth-capture, caps each request with maxPayment and needs approval for every write. The old Payments MCP URL serves this page | 3 | schemes | | checked 2026-11-15 | https://docs.cdp.coinbase.com/payments-mcp/welcome | "using the x402 exact, upto, and auth-capture schemes" | T2 | spec | 2 | Whether Payments MCP was formally renamed | medium |
| R2-49 | Cloudflare Monetization Gateway is in closed beta for eligible US sellers and buyers, settles USDC on Base and uses Coinbase's x402 facilitator | | | 2026-09-30 | 2026-09-30 | https://blog.cloudflare.com/monetization-gateway-beta/ | "available in closed beta to eligible U.S.-based sellers and buyers" | T3 | product status | 4 | Fees, sellers or volume | high |
| R2-50 | Cloudflare Wallets were announced with owner allowances, allow lists and maximum transaction size, but payments are not yet live | | | 2026-08-04 | 2026-08-04 | https://blog.cloudflare.com/wallets/ | "Soon, you will be able to set up and use your Cloudflare Wallet" | T3 | product status | 6 | Launch date | high |
| R2-51 | Circle's Arc mainnet went live 16 Sep 2026 with permissioned validators including Visa and Mastercard, USDC as gas token, more than 100 partners, and agent wallets, limits and nanopayments | 100 | partners (more than) | 2026-09-16 | 2026-09-16 | https://decrypt.co/378374/circle-launches-arc-mainnet-with-blackrock-dtcc-and-visa-as-validators | "ships with agent wallets, spending limits and nanopayments" | T5 | product status | 4 | Agent payment volume on Arc | medium |
| R2-52 | Circle Nanopayments let agents pay x402 services gas free, down to 0.000001 USD, with Gateway batching many authorizations into one settlement | 0.000001 | USD minimum | | checked 2026-11-15 | https://developers.circle.com/agent-stack/agent-nanopayments | "Gasless USDC micropayments down to $0.000001 via x402 and batched settlement" | T2 | spec | 2 | Settlement time, fees or chains live | high |
| R2-53 | L402 returns 402 with a token and Lightning invoice, the client retries with the preimage, and verification is local. An agent pays once per endpoint | | | 2026-03-11 | 2026-03-11 | https://lightning.engineering/posts/2026-03-11-L402-for-agents/ | "L402 verification is a local computation" | T3 | spec | 2 | Adoption | high |
| R2-54 | Lightning Labs' agent toolkit has seven skills and an MCP server, a remote signer that keeps keys off the agent machine, and scoped macaroons. 61 stars | 61 | GitHub stars | | checked 2026-11-15 | https://github.com/lightninglabs/lightning-agent-tools | "The toolkit consists of seven composable skills and an MCP server." | T2 | spec | 2 | Production use | high |
| R2-55 | Wavelength is an alpha wallet toolkit, mainnet by invite, exposing payments to agents through MCP, with a 1 basis point service fee during alpha | 1 | basis point fee | 2026-07-21 | 2026-07-21 | https://lightning.engineering/posts/2026-07-21-wavelength-launch/ | "Lightning transactions will have a minimal (1 basis point) service fee" | T3 | fee | 6 | Users or volume | high |
| R2-56 | AWS AgentCore payments GA supports MPP and the x402 upto scheme, integrates Coinbase and Stripe Privy wallets and enforces limits at the infrastructure layer | | | 2026-08-18 | 2026-08-18 | https://aws.amazon.com/about-aws/whats-new/2026/08/bedrock-agentcore-payments-ga/ | "enforces configurable payment limits at the infrastructure layer" | T3 | product status | 4 | Usage | high |
| R2-57 | AWS charges nothing extra for AgentCore payments. Wallet providers bill per wallet operation, with 0.005 USD used in the worked example | 0.005 | USD per wallet operation (example) | | checked 2026-11-15 | https://aws.amazon.com/bedrock/agentcore/pricing/ | "AgentCore payments is provided at no additional charge by AWS." | T2 | fee | 2 | Coinbase free tier or gas | high |
| R2-58 | Alphabet says UCP gives direct checkout for hundreds of thousands of brands and is being combined with the Agent Payments Protocol | | | 2026-10-28 | 2026-10-28 | https://www.pymnts.com/earnings/2026/google-pushes-ai-agents-into-commerce-as-spending-pressures-cash-flow/ | "We're combining this with the Agent Payments Protocol" | T5 | product status | 6 | Transactions or AP2 deployment | medium |
| R2-59 | Copilot Checkout began rolling out in the US on Copilot.com with PayPal, Shopify and Stripe on ACP, and merchants stay merchant of record | | | 2026-01-08 | 2026-01-10 | https://ppc.land/microsoft-launches-checkout-inside-copilot-as-ai-commerce-battle-intensifies/ | "The implementation begins rolling out in the United States on Copilot.com" | T5 | product status | 5 | Current status or volume | medium |
| R2-60 | PayPal's agent tools page lists 30 toolkit tools in 7 groups and 3 gift card checkout tools on its remote MCP server, with no payout or Venmo tool | 33 | tools | 2026-10-29 | 2026-10-29 | https://developer.paypal.com/ai-tools/agent-tools/ | "These tools are for gift cards only." | T2 | spec | 2 | Consumer agent payments through the PayPal wallet | high |
| R2-61 | Adyen Agentic (Feed, Cart, Payments with token portability) is in limited availability for US enterprise merchants and compatible with Meta's AI checkout | | | 2026-06-16 | 2026-06-16 | https://www.adyen.com/press-and-media/adyen-agentic | "limited availability for enterprise merchants operating in the U.S." | T3 | product status | 4 | Volume or merchant count | high |
| R2-62 | Adyen's Q3 2026 update names a Personal Agent Protocol with Sierra and Meta and gives no agentic figures | | | 2026-10-28 | 2026-10-28 | https://www.adyen.com/press-and-media/adyen-publishes-q3-2026-business-update-6r9vz0 | "Personal Agent Protocol to help shape the emerging standard for AI agents." | T3 | partnership | 6 | Spec content | high |
| R2-63 | Checkout.com's agentic offer is a certified ACP handler, processes UCP over Google Pay rails, stores agent scoped tokens in its vault and is in early access | | | | checked 2026-11-15 | https://www.checkout.com/agentic-commerce | "Agentic Commerce is in early access for selected partners." | T3 | product status | 6 | Named live merchants | high |
| R2-64 | Worldpay said its UCP powered checkout with Google for US retailers launches soon | | | 2026-01-28 | 2026-01-28 | https://worldpay.com/en/news/worldpay-continues-collaboration-with-google | "The new checkout feature, powered by UCP, launches soon" | T3 | product status | 6 | Whether it launched | high |
| R2-65 | JPMorgan's CEO said the bank will not let outside agents in, and a spokesperson said it blocks third party agents that use customers' banking credentials | | | 2026-10-13 | 2026-10-15 | https://fortune.com/2026/10/15/jamie-dimon-ai-agents-meta-muse-jpmorgan/ | "We're not going to allow just any outside agent to come inside the company" | T5 | policy statement | 6 | Timeline for a sanctioned agent channel | high |
| R2-66 | Alipay AI Pay installs into agents, needs identity verification and explicit user authorisation for every payment, passed 100M users in Feb 2026 and processed over 120M transactions in one week | 120 | million transactions in one week | 2026-02-11 | 2026-04-23 | https://fintech.global/2026/04/23/alipay-expands-ai-pay-to-openclaw-type-agents/ | "every payment requires explicit user authorisation" | T5 | adoption count | 6 | Agent share vs assistant use | medium |
| R2-67 | Alipay said AI Pay has processed 300M transactions to date and launched AI Wallet as a control layer and Token Pay for model companies | 300 | million transactions | 2026-05-26 | 2026-05-28 | https://techwireasia.com/2026/05/alipay-ai-wallet-token-pay-agentic-commerce-payments/ | "has processed 300 million transactions to date" | T5 | adoption count | 6 | How it reconciles with the February weekly figure | medium |
| R2-68 | Razorpay and NPCI launched agentic UPI payments on Claude with Zomato, Swiggy and Zepto using UPI Reserve Pay, in pilot with a small group of users | | | 2026-02-20 | 2026-02-20 | https://razorpay.com/newsroom/razorpay-npci-launch-agentic-payments-on-claude-powering-zomato-swiggy-zepto-at-the-india-ai-impact-summit/ | "the platform is in the pilot phase with a small group of users" | T3 | product status | 4 | Users or volume | high |
| R2-69 | NPCI's Unified Agent Protocol for small payments without per payment approval is reported but not confirmed, with limits, liability and timing pending. Reserve Pay caps about 10,000 rupees for up to 90 days | 10000 | rupees cap | 2026-09-09 | 2026-09-09 | https://forkast.news/india-eyes-ai-driven-upi-payments-as-npci-weighs-agent-protocol/ | "Details on final transaction limits, liability allocation, and rollout timeline remain pending." | T5 | regulation status | 5 | Final design | medium |
| R2-70 | NPCI's AiNxt and AtOM, launched at Global Fintech Fest 2026, are AI build and UPI operations platforms, not agent payment products | | | 2026-09-09 | 2026-09-10 | https://www.angelone.in/news/economy/npci-launches-ainxt-and-atom-agentic-ai-platforms-for-upi-ecosystem | "AtOM, or Agentic Orchestration and Messaging, addresses a different problem." | T5 | product status | 5 | Future agent payment plans | medium |
| R2-71 | Central bank data: Pix Automatico moved 3.5B reais in 9.5M transactions in Q2 2026, and recipients rose to 14,000 by August | 9.5 | million transactions | 2026-06-30 | 2026-10-28 | https://finsidersbrasil.com.br/giro-noticias/pix-automatico-cresce-no-1o-semestre-de-2026-diz-bc/ | "movimentou R$ 3,5 bilhões em 9,5 milhões de transações no segundo trimestre de 2026" | T5 | volume | 5 | Any agent share | medium |
| R2-72 | Iniciador launched an MCP for agentic Pix payments where the user approves each payment by device biometric through Pix Biometria | | | 2026-05-21 | 2026-05-21 | https://www.letsmoney.com.br/pagamentos/iniciador-lanca-o-primeiro-mcp-de-pagamentos-agenticos-via-pix/ | "o agente nunca move dinheiro sozinho" | T5 | product status | 6 | Live status or volume | medium |
| R2-73 | GoCardless says it made the UK's first live agentic account to account payment, a recurring donation to Trussell set up by an AI agent under a Direct Debit mandate, in the FCA AI Live Testing programme | 1 | payment flow | 2026-09-22 | 2026-09-22 | https://fintech.global/2026/09/22/gocardless-completes-uks-first-agentic-bank-payment/ | "the UK's first live agentic account-to-account payment" | T5 | deployment | 4 | Volume or whether others came first | medium |
| R2-74 | Per the FCA, VRPs are about 16% of open banking payments, and the FCA will consult on a long term open banking framework by end 2026 | 16 | percent of open banking payments | 2026-06-11 | 2026-06-11 | https://www.lewissilkin.com/insights/2026/06/11/uk-payments-initiative-launches-new-open-banking-recurring-payments-scheme-102n1ql | "According to the FCA, VRPs already account for around 16% of open banking payments." | T5 | adoption share | 5 | Agent use or consent rules for agents | medium |

## 6. Not found and open questions

Where we looked: Visa, Stripe and Cloudflare newsrooms and blogs, Mastercard newsroom (several pages returned 403), PayPal developer pages, Adyen press pages, Coinbase CDP docs, Circle developer docs, Lightning Labs blog and GitHub, AWS What's New and pricing, IETF datatracker, GitHub repos for x402 and MPP, mpp.dev, Tempo developer site, agenteconomy.to, Fireblocks, Bitquery, trade press, and web search (standard mode) until the shared search budget ran out.

- Visa and Mastercard agentic volume, token count or transaction count. Not found in earnings coverage or newsrooms. Both describe agentic as small.
- Mastercard Agent Pay for Machines primary page and the Mastercard Latin America release (live transactions with 17 processors and issuers) returned 403. Figures from them are left out.
- Signed voucher mechanism for Agent Pay for Machines (baseline W#3). Not found on re-read of PYMNTS.
- Stripe's own page for Link balance. Not found. The block relies on trade press (R2-21). Search summaries also mention a Lead Bank issued card and conflicting custody details. Unresolved.
- Stripe fee rate for Shared Payment Tokens and machine payments. Not stated in docs opened.
- PayPal Agent Ready general availability. Seen only in search summaries, not confirmed. The tool count on PayPal's agent tools page (33) conflicts with baseline W#6 (50) for the same page date.
- Venmo agent product. Not found (PayPal search and PayPal agent tools page).
- Coinbase Agentic Wallets launch page and Circle Agent Stack press release could not be opened (TLS errors). Search summaries date them to 2026-02-11 and 2026-05-11. Not cited.
- Alipay's Business Wire release returned 403. Figures come from trade press reporting Alipay.
- Cloudflare NET Dollar. Search shows only a 2025 announcement. Cloudflare's 2026 payments blog posts do not mention it. Launch not found.
- Cloudflare pay per crawl current status. Not rechecked. The 2026 posts describe Monetization Gateway and Pay Per Use instead.
- AWS AgentCore payments usage. Not found. Search summaries say Coinbase wallets need an AWS Marketplace subscription. Not opened.
- Google Cloud or Azure managed agent payment service equivalent to AgentCore payments. Not found.
- x402 scheme files and transports v2 contents. Not opened, so the crypto primitive for x402 follows the R0 schema default.
- agenteconomy.to methodology page. Not read. We do not know if it filters wash or test traffic.
- Chainalysis Q3 2026 x402 report. Not opened. Only the Payments Journal summary.
- Tempo mainnet date. Search summaries say 2026-03-18. No opened primary.
- NPCI Unified Agent Protocol. No NPCI release found. Search summaries say RBI approval may be needed.
- Pine Labs P3P agentic protocol on UPI (search summary dates it 2026-06-11). Not opened.
- Banco Central do Brasil rule on agents in Pix. Not found.
- UK commercial VRP launch date (search summaries say 2026-06-02), FCA payments priorities report (2026-03-25), HM Treasury AI adoption plan and payments consultation closing 2026-10-06. Seen in search only, not opened.
- Fees and latency for card agentic flows, UPI and Pix. Not found.
- Open question: will card networks change rules to restrict virtual cards in agent payments, as Mastercard's CEO implied (R2-09)?
- Open question: is the mid November x402 surge through one facilitator organic, and will it fade like late 2025 (R2-40, R2-42)?
- Open question: how much MPP traffic is card based and off chain? No public figure exists.

## 7. Proposed additions to the schema

| proposal | type | allowed values or definition | why |
|---|---|---|---|
| V11 Settlement mode | variable | per payment, metered session or payment channel, batched or deferred, authorize then capture | x402 now has upto, batch-settlement and auth-capture (R2-29, R2-48), MPP has sessions (R2-24) and Circle batches nanopayments (R2-52). Cost and latency depend on this more than on the rail |
| V12 Minimum ticket | variable | smallest amount the operator will settle | Stripe needs 0.50 USD for card tokens but 0.01 USDC for stablecoins (R2-18). Circle goes to 0.000001 USD (R2-52). This decides which use cases are possible |
| P15 Settlement intermediary | parameter | network, PSP, facilitator, wallet provider, none | x402 traffic depends on 18 facilitators and one carried 60.1% in a recent window (R2-40). Concentration and fees sit here |
| P16 Bank stance on outside agents | parameter | allows agents, allows only through tokens or open banking, blocks credential use | JPMorgan blocks credential based agents (R2-65). This decides which credential paths work |
| P5 new value | value | stablecoin balance spent through a virtual card | Link balance funds in USDC but pays merchants by card (R2-21). It does not fit one P5 value today |
| Measurement field for volume claims | metadata | tracker, definition (protocol only, all signed transfers, vendor classification), chains, filters | x402 counts range about 37M to 138M for Q3 2026 and value from 43M to 2.59B USD because of definitions (section 3) |
| Spec status nuance | status model | add "Spec, standards draft expired" | MPP's IETF draft expired while the spec lives on GitHub (R2-25). Readers should not treat an IETF name as standing |
| Do not regress wording | rule text | "x402 moved under the Linux Foundation in April 2026 with 40 members at launch, more than 50 by 1 Oct 2026" | Current wording says 50 plus at the April move. Coinbase docs say 40 at launch (R2-31) and the Linux Foundation says more than 50 on 1 Oct (R2-33). Lead to decide |
| Baseline correction | ledger | C370 should drop ACH from MPP methods | Conflicts with S#2, the do not regress list, and R2-22 and R2-23 |
