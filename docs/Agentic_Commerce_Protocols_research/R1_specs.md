# R1 Commerce and trust layer protocols and specs

Research strand R1. As of 2026-11-15. Schema: R0_schema.md (frozen 2026-11-15). Baseline: R0_R1_specs.md (verified rows to 2026-10-22).

How to read this brief. Every fact points to a claim id (R1-nn) in section 5. Claim rows cite only pages opened in this round. Where a block leans on a baseline row that was not reopened, it says "baseline Cnnn, not rechecked". Maturity words follow the schema: Live, Pilot, Spec, Unsettled, Absent. C is consumer checkout, B is B2B procurement, M is machine pay per call.

Search budget note. The shared web search budget for this run ran out part way through. After that point only pages already found were opened. Section 6 lists what this left unsearched.

## 1. Summary

- ChatGPT checkout: the do-not-regress item holds and is refined. OpenAI's own commerce docs now say "The journey moves to browser use or a plugin" on the retailer's existing checkout, with ChatGPT's cloud browser signing requests with Web Bot Auth and a ChatGPT Wallet handing the merchant a network token "where available". The docs do not mention ACP or Instant Checkout (R1-13 to R1-16, R1-17).
- ACP (OpenAI, Stripe, now Meta) has gone quiet. The latest stable spec is still 2026-04-17, still labelled beta, with no release since and no commit after 2026-07-18. No live ACP checkout dated in the last 90 days was found, so C is Spec (R1-01 to R1-04).
- UCP is the most active commerce protocol. Latest tag v2026-08-25, a Payments Technical Council of 8 formed 2026-09-02, Food Checkout merged 2026-11-10, and Google Universal Cart went live in the US on 2026-10-15 with UCP checkout. It is the only commerce protocol here with verified Live consumer checkout in the last 90 days (R1-19 to R1-31).
- AP2 v0.2 (2026-04-28) replaced the old Intent, Cart and Payment mandates with two SD-JWT mandates, Checkout and Payment, each open or closed. Work moved to the FIDO Payments Technical Working Group, chaired by Mastercard and Visa. No FIDO draft was found and the AP2 repo has been idle since 2026-04-29 (R1-35 to R1-40).
- Agent identity has converged on RFC 9421 HTTP message signatures: Visa TAP, Mastercard Agent Pay, OpenAI's cloud browser and UCP profiles all use them. The IETF Web Bot Auth working group draft (-01, 2026-10-29) says the tag "MUST be web-bot-auth", while Visa and Mastercard use their own browse and pay tags. The group missed its April 2026 milestone (R1-50 to R1-59).
- The intent and mandate layer now has at least five overlapping formats: AP2 mandates, Mastercard Verifiable Intent (Draft v0.1, field aligned to AP2), Amex Intent Intelligence, the EMVCo Intent Services draft framework and the ACP one-time allowance. None defines a dispute process. They only produce evidence (R1-05, R1-37, R1-61 to R1-66).
- Shopify is the clearest live implementer. It runs a hosted Shop MCP (2026-10-13), moved Storefront MCP onto UCP, and runs Checkout WebMCP. Checkout WebMCP states that a Web Bot Auth signature is not buyer permission, which other specs leave unsaid (R1-32 to R1-34).
- Know Your Agent is still unsettled. Skyfire's KYAPay draft reached -02 on 2026-11-02 with an Akamai co-author, but it is an individual draft. The Ant, Mastercard and Visa KYA framework has no spec and no timeline. Ant's AMP is open-sourced but reports no volumes (R1-67 to R1-70).
- MCP's 2026-07-28 spec is stateless and has no payment primitive. Pay per call over MCP runs through x402 or MPP wrappers and is Live through AWS AgentCore payments (GA 2026-08-18). W3C WebMCP (draft 2026-11-13) adds a consequentialHint annotation but no confirmation API (R1-44 to R1-48).
- Amex's Agent Purchase Protection is still worded "In the future" on Amex's page, and 2 of the 5 ACE specs are still in development (R1-65, R1-66).

## 2. Protocol blocks

20 blocks follow, plus one block on platform programmes that have no protocol of their own.

### 2.1 ACP, Agentic Commerce Protocol (OpenAI, Stripe, Meta)

Name clash. IBM BeeAI's older Agent Communication Protocol, also called ACP, is a different thing. Its repo was archived on 2025-08-27 with the notice that it "is now part of A2A under the Linux Foundation" (R1-43). In this study ACP means the commerce protocol only.

- Owner and governance: Founding Maintainers OpenAI and Stripe. Meta joined the Technical Steering Committee on 2026-04-24 and is listed as a lead maintainer (R1-03). The TSC has up to 7 seats appointed by the founders, who keep a last resort veto. There is no foundation (R1-04). Stripe's docs now call ACP "an open standard created by Stripe, OpenAI, and Meta" (R1-10).
- Licence: Apache 2.0.
- Latest version: 2026-04-17 stable, spec labelled beta. 2026-01-30 is deprecated (R1-01). No dated release after that, last commit 2026-07-18 (R1-02).
- Maturity, as_of 2026-11-15: C Spec. It was Live in ChatGPT Instant Checkout from September 2025 to March 2026 (R1-17). No ACP checkout dated after 2026-08-17 was verified. B Absent. M Absent, because Stripe sends per call charges to MPP and x402 instead.
- Layers: 1 (feed), 2 (checkout and allowance), 4 (delegated payment token), 7 partial (order and refund events).
- P1: human present. The buyer confirms in the agent interface and the allowance reason is only one_time (R1-05).
- P3: OAuth client. Bearer token from agent to merchant, plus OAuth 2.0 delegate authentication of the buyer account. ACP has no agent key scheme of its own. Visa said it is aligning TAP with ACP (R1-17).
- P4: token scoped limits (allowance: max_amount, currency, merchant_id, checkout_session_id, expires_at).
- P5: PSP scoped token (Stripe Shared Payment Token) or a card passed as fpan or network_token through delegate payment (R1-05, R1-11).
- P8: merchant.
- P9: PSP or platform policy and card reason codes. The spec defines no dispute flow.
- P11: REST checkout API, with an MCP binding (OpenRPC) in the 2026-04-17 folder.
- P12: HMAC on webhooks and a detached JSON signature header on requests, over TLS (R1-07).
- P13: product feed pushed by the merchant to an agent hosted Feed API. A /.well-known/acp.json discovery file is only a proposal (R1-08).
- Flow:
  1. Merchant pushes products to the agent's Feed API.
  2. Agent calls POST /checkout_sessions, then updates the session until it reaches ready_for_payment.
  3. Buyer confirms in the agent interface.
  4. Agent or PSP calls /agentic_commerce/delegate_payment with the card and an Allowance and gets a scoped token.
  5. Agent calls /checkout_sessions/{id}/complete with payment_data. The merchant charges through its PSP and sends order webhooks.
- Key objects and fields: CheckoutSession (id, protocol, capabilities, buyer, status, currency, line_items, fulfillment_options, totals, messages, links, authentication_metadata, order). Status values are incomplete, not_ready_for_payment, requires_escalation, authentication_required, ready_for_payment, pending_approval, complete_in_progress, completed, canceled, in_progress, expired (R1-06). DelegatePaymentRequest (payment_method, allowance, billing_address, risk_signals, metadata). Allowance (reason, max_amount, currency, checkout_session_id, merchant_id, expires_at). Headers Idempotency-Key (required on every POST), API-Version, Signature, Timestamp (R1-07). Stripe SPT: SharedPaymentIssuedToken with usage_limits[currency], usage_limits[max_amount], usage_limits[expires_at], seller_details[network_business_profile], states active, requires_action and deactivated, plus webhooks for used and deactivated (R1-11).
- Distinctive: the simplest merchant contract of the group. Idempotency is mandatory, and an intent traces RFC lets an agent tell the merchant why a cart was abandoned.
- Gaps: no agent identity, no signed user mandate, allowance limited to one_time, 3DS delegation only for browser 3DS2 (R1-09), discovery file still a proposal, no foundation, no release for seven months, and OpenAI's own commerce docs no longer cite it.
- ChatGPT checkout today. OpenAI's docs (undated, read 2026-11-15) send the journey to "browser use or a plugin" (R1-15). Browser use is ChatGPT's cloud browser completing the retailer's own checkout. It signs with Web Bot Auth, with the Signature-Agent header set to https://chatgpt.com (R1-16). For payment, a ChatGPT Wallet "can support account and payment steps where available". The merchant receives a network token and links it to the account through the PAR. The credential is single use for that purchase (R1-13, R1-14). This confirms the do-not-regress item (checkout moved to retailer sites in March 2026, R1-17) and adds the wallet and browser detail. No public launch date for ChatGPT Wallet was found.

### 2.2 UCP, Universal Commerce Protocol (Google, Shopify, partners)

- Owner and governance: the Governing Council has permanent members Google and Shopify, joined by Stripe on 2026-04-28, plus elected open seats (R1-22). A Tech Council of 16 seats includes Amazon, Meta, Microsoft, Salesforce and Stripe members since 2026-04-24 (R1-23). Domain councils cover Food (2026-07-16), Lodging (2026-08-11) and Payments (2026-09-02). The Payments council has 8 inaugural members: Adyen, Ant International, Coinbase, Global Payments, Google, PayPal, Shopify and Stripe (R1-21). ucp.dev lists 21 co-developers, among them Amazon, Microsoft, Meta, Walmart and Target (R1-31).
- Licence: Apache 2.0.
- Latest version: tag v2026-08-25, published 2026-08-25. No newer tag as of 2026-11-15 (R1-19, R1-20, R1-74). Unreleased work on main since 2026-10-22 is listed in section 4.
- Maturity, as_of 2026-11-15: C Live. Google Universal Cart launched in the US on 2026-10-15 with checkout "powered by" UCP through Google Pay (R1-29). Shopify serves UCP MCP endpoints (R1-32). B Absent. M Absent.
- Layers: 1 (profile and catalog), 2 (checkout, buyer consent, optional AP2 mandates), 3 partial (signed profiles and requests), 4 (payment handlers and token exchange), 7 partial (order, return policy).
- P1: human present by default. Human not present is possible through the AP2 extension. requires_buyer_review marks a session that needs buyer authorisation (R1-27).
- P3: signed HTTP requests with a key directory. The profile publishes keys[] (EC P-256, P-384, Ed25519), signatures follow RFC 9421, and the UCP-Agent header carries the platform profile URI. OAuth 2.0 handles identity linking (R1-26).
- P4: none by default. A signed cart mandate (closed AP2 Checkout Mandate) applies when the AP2 extension is negotiated (R1-28).
- P5: wallet account (Google Pay, Shop Pay), PSP token, network token. Since v2026-08-25, PAN and network token are separate credential types (R1-74).
- P8: merchant. "The business remains the Merchant of Record (MoR)" (R1-27). The same holds in Universal Cart and Food Checkout (R1-24, R1-29).
- P9: card reason codes. A signed mandate becomes evidence when the AP2 extension is on.
- P11: REST, MCP, A2A and embedded checkout (R1-26).
- P12: RFC 9421 signatures, a detached JWS over JCS canonical JSON (ap2.merchant_authorization) and SD-JWT with key binding (ap2.checkout_mandate) (R1-28).
- P13: well-known capability file at /.well-known/ucp, plus catalog search and lookup capabilities (R1-26).
- Flow:
  1. Platform reads the business profile at /.well-known/ucp and negotiates capabilities and payment handlers.
  2. Platform creates and updates a checkout (dev.ucp.shopping.checkout) until the status is ready_for_complete.
  3. If the business needs buyer input it returns requires_escalation with a continue_url, and the platform hands the buyer over (R1-27).
  4. Platform gets a credential from a handler, for example Google Pay, Shop Pay or the Stripe Payments handler (R1-30).
  5. Platform sends Complete Checkout with the same idempotency key on retry. The status becomes completed with an order, or complete_in_progress.
- Key objects and fields: profile ucp {version, services, payment_handlers, capabilities} and keys[]. Checkout {ucp, id, line_items, buyer, context, signals, attribution, status, currency, totals, actions, messages, links, policies, expires_at, continue_url, payment, order}. Status values incomplete, requires_escalation, ready_for_complete, complete_in_progress, completed, canceled (R1-27). Payment handler entry {id, version, spec, schema, available_instruments, config}. AP2 extension dev.ucp.common.payment.ap2_mandate with ap2.merchant_authorization and ap2.checkout_mandate, with the payment mandate carried in payment.instruments[*].credential.token (R1-28).
- Distinctive: governance with domain councils, the most vertical coverage (retail, grocery, food, lodging draft), date versioned capabilities, and an opt-in mandate extension that locks the session once used.
- Gaps: no tag since August, so most recent work is unreleased. B2B and pay per call are absent. A maintainer PR notes that "A checkout ID does not by itself bind authorization to a particular checkout state" (R1-25). Liability is left to card rules.

### 2.3 AP2, Agent Payments Protocol (Google, moving to FIDO)

- Owner and governance: Google authored it. Standardisation continues in the FIDO Alliance Agentic Authentication and Payments Technical Working Groups (R1-40). The repo is still under the google-agentic-commerce GitHub organisation.
- Licence: Apache 2.0.
- Latest version: v0.2.0, released 2026-04-28. v0.1.0 came out 2025-09-16. Last commit 2026-04-29 (R1-35).
- Maturity, as_of 2026-11-15: C Spec, B Spec, M Spec. No real money AP2 transaction was verified. The x402 sample covers machine payments only as a sample. Baseline row C357 notes card and x402 samples.
- Layers: 2 (mandates), 3 partial (agent key bound in the open mandate), 4 (credential provider issues the token), 7 (receipts as dispute evidence).
- P1: human present and human not present (R1-39).
- P3: verifiable credential. The agent key (agent_pk) is bound in the open Payment Mandate. There is no agent directory.
- P4: signed intent mandate (open Checkout and Payment Mandates) and signed cart mandate (closed) (R1-37, R1-38).
- P5: instrument agnostic. Cards come first, with push payments and digital currencies on the roadmap.
- P8: merchant, named as a role.
- P9: signed mandate as evidence. The spec says mandates and receipts support dispute resolution, but retention is out of scope.
- P11: not defined. Transport is "outside the scope of AP2" (R1-36). It runs inside UCP (R1-28) or as an A2A extension.
- P12: SD-JWT verifiable credentials, ES256 in examples.
- P13: not defined.
- Flow, human not present:
  1. User approves open Checkout and Payment Mandates on a Trusted Surface, which signs them with the user key and binds the agent key.
  2. Agent builds a cart with the merchant on its own.
  3. Agent signs closed Checkout and Payment Mandates with its agent key, bound by the checkout hash.
  4. Credential Provider checks the Payment Mandates and issues a payment token.
  5. Merchant checks the closed Checkout Mandate against the cart, and the Merchant Payment Processor verifies the bindings and returns signed receipts.
- Key objects and fields: Closed Payment Mandate (vct mandate.payment.1: transaction_id, payee, pisp, payment_amount {amount, currency}, payment_instrument, execution_date, risk_data, iat, exp). Open Payment Mandate (vct mandate.payment.open.1) with constraints payment.amount_range, payment.budget, payment.agent_recurrence, payment.allowed_payees, payment.allowed_payment_instruments, payment.allowed_pisps, payment.reference and payment.execution_date (R1-37). Closed Checkout Mandate (vct mandate.checkout.1: checkout_jwt, checkout_hash, iat, exp). Open Checkout Mandate (vct mandate.checkout.open.1) with checkout.line_items and checkout.allowed_merchants (R1-38). Receipts carry payment_id, psp_confirmation_id and network_confirmation_id. Roles are Shopping Agent, Credential Provider, Merchant, Merchant Payment Processor and Trusted Surface (R1-36).
- Distinctive: the only commerce spec with a full signed delegation chain for human not present purchases, and the base for Verifiable Intent and the UCP extension.
- Gaps: the v0.1 names (IntentMandate, CartMandate) are gone, so older write-ups are stale. The vct value conflicts between the schema table and the type text (R1-38). There is no expiry constraint beyond exp, no dispute procedure, no FIDO draft yet, and the repo has been idle for 6 months.

### 2.4 A2A, Agent2Agent (Linux Foundation) as a commerce transport

- Owner and governance: Linux Foundation project, Google originated it (R1-42). It joined the Agentic AI Foundation in September 2026 (baseline C262, not rechecked).
- Licence: Apache 2.0.
- Latest version: v1.0.0 (2026-03-12), v1.0.1 (2026-05-28). Since 2026-10-22 only docs commits, such as partner list additions on 2026-11-13 (R1-42).
- Maturity, as_of 2026-11-15: C Spec (UCP A2A binding), B Spec, M Spec (x402 extension, block 2.5). No verified real money flow over A2A was found.
- Layers: 1 (Agent Card discovery), 3 (signed Agent Cards). Payment layers come only through extensions.
- P1: machine to machine or delegated. P3: signed agent card (proposed new value, section 7). P11: A2A messages. P12: JWS on Agent Cards. P13: Agent Card. P4, P5, P8 and P9 are not defined by A2A.
- Flow: client fetches the merchant agent's Agent Card. It opens a task. The task moves through states and extensions carry commerce data, AP2 mandates or x402 payloads.
- Distinctive: cross-organisation agent messaging with a long-running task model. LF reports more than 150 supporting organisations (R1-42).
- Gaps: no commerce semantics in core, and the extension URIs are still vendor hosted.

### 2.5 A2A x402 extension (Google agentic commerce org)

- Owner and governance: google-agentic-commerce GitHub organisation. The canonical URI sits under github.com/google-a2a. It did not move with x402 to the Linux Foundation (x402 move is a do-not-regress item, April 2026).
- Licence: Apache 2.0.
- Latest version: spec v0.1. The only release is v0.1.0 (2025-09-16). Last commit 2026-05-24 (R1-41).
- Maturity, as_of 2026-11-15: C Absent, B Absent, M Spec.
- Layers: 4, 5, 6 (on chain), through x402.
- P1 machine to machine. P3 none (payment is identity). P4 none. P5 stablecoin key. P8 not defined. P9 none. P11 A2A messages. P12 on chain signatures through x402. P13 Agent Card.
- Flow:
  1. Merchant agent sets the task to input-required with x402.payment.status payment-required and x402.payment.required.
  2. Client agent signs a payload and returns it with status payment-submitted and x402.payment.payload.
  3. Merchant verifies and settles on chain. The status moves to payment-verified, then payment-completed, and x402.payment.receipts is appended. On failure the status is payment-failed with x402.payment.error.
- Key fields: x402.payment.status (payment-required, payment-submitted, payment-rejected, payment-verified, payment-completed, payment-failed), x402.payment.required, x402.payment.payload, x402.payment.receipts, x402.payment.error, header X-A2A-Extensions (R1-41).
- Distinctive: an append-only receipts array per task.
- Gaps: stale (one release in 14 months), no spend limits, no mandate link.

### 2.6 MCP as a commerce transport, and MCP payment flows

- Owner and governance: Model Context Protocol project. Baseline row C262 places A2A and MCP in the Agentic AI Foundation. The MCP spec has its own SEP process and a deprecation policy (R1-44).
- Licence: not checked this round.
- Latest version: 2026-07-28, the first revision since 2025-11-25 (R1-44).
- Maturity, as_of 2026-11-15: C Live (Shopify Shop MCP checkout, R1-33). B Absent (none found in this lane). M Live (AWS AgentCore payments GA 2026-08-18, paying for MCP tools over x402 and MPP, R1-47). That evidence is 89 days old on the as_of date, so recheck it next round.
- Layers: 1 (tool discovery, server/discover). Payment layers come only from wrappers.
- P1: human present (client confirmation) or machine to machine. P3: OAuth client (MCP authorization, with Client ID Metadata Documents replacing Dynamic Client Registration). P11: MCP tool calls. P12: none in core. With x402 it is on chain signatures. P13: MCP server. P4, P5, P8 and P9 are not defined in core.
- MCP payment flow under x402 (R1-46):
  1. A paid tool calls an HTTP endpoint that answers 402 with a PAYMENT-REQUIRED header.
  2. The client wrapper picks an entry from accepts and applies spend policy (default cap 1 USD).
  3. A wallet signs. The client retries with a PAYMENT-SIGNATURE header.
  4. The data comes back "once payment is verified".
- Key protocol changes that matter for payments: no sessions and no initialize handshake. Version and client identity travel in _meta on each request. Multi round-trip requests replace server-initiated elicitation, and the elicitationId and completion notice are removed, so a server learns the result of an out-of-band step, such as a payment page, only when the client retries (R1-44, R1-45). The extensions field exists, but there is no official payments extension (section 6).
- Distinctive: the de facto shop and tool interface. Shopify, Visa (baseline C383), Stripe (baseline C420) and AWS all ship MCP servers.
- Gaps: no payment primitive, no mandate object, no standard for human confirmation of a paid tool call.

### 2.7 WebMCP (W3C Web Machine Learning Community Group)

- Owner and governance: W3C community group report, not a W3C standard. Editors are from Microsoft and Google (R1-48).
- Licence: W3C community group terms, not checked.
- Latest version: Draft Community Group Report dated 2026-11-13 (R1-48).
- Maturity, as_of 2026-11-15: C Live on Shopify checkout for eligible merchants since 2026-09-28 (R1-34). The browser API itself is still experimental, as Shopify's docs note Chrome version specific behaviour. B Absent. M Absent.
- Layers: 1 (in-page tool discovery).
- P1 human present. P11 agentic browser. P13 open web (tools declared by the page). P3, P4, P5 and P12 are not defined.
- API: document.modelContext with registerTool, getTools and executeTool, events ontoolchange, ontoolactivated and ontoolcancel, and a consequentialHint annotation for actions that are "significant, real-world, or non-reversible" (R1-48).
- Gaps: a hint is not a confirmation. No payment or consent object exists.

### 2.8 Shopify agent surfaces (Shop MCP, UCP MCP, Checkout WebMCP)

This is a vendor implementation profile, not a separate standard. It is included because it is the largest verified live use of MCP and WebMCP for checkout.

- Owner: Shopify. Licence: proprietary service on open protocols.
- Versions and dates: Shop MCP at mcp.shop.com, 2026-10-13 (R1-33). Checkout WebMCP, 2026-09-28 (R1-34). Storefront MCP catalog and cart tools removed in favour of /api/ucp/mcp, with no date shown on the page (R1-32).
- Maturity, as_of 2026-11-15: C Live. B Absent. M Absent.
- Layers: 1, 2 (buyer confirmation rules), 4 (saved Shop Pay instruments).
- P1 human present. P3 OAuth client (Sign in with Shop, device flow). P4 none, with an explicit buyer confirmation rule. P5 wallet account (saved Shop Pay card). P8 merchant. P11 MCP tool calls and agentic browser. P13 MCP server (Shopify Catalog, more than 1 billion products, vendor figure).
- Flow, Shop MCP: search_catalog, then get_product, then build cart and checkout at the selling store, then get_checkout (polling, no webhooks at launch), then complete_checkout only after "the shopper confirms the total and payment method" (R1-33).
- Flow, Checkout WebMCP: navigate_to_storefront, get_checkout, update_checkout, then complete_checkout after explicit buyer permission. Only a status of completed confirms the order. New card entry is blocked (R1-34).
- Distinctive: it states that "WBA and ready_for_complete don't grant" buyer permission. Agent identity is kept apart from consent.
- Gaps: Shop Pay centric, and the exclusions for B2B and embedded checkout come from third party summaries only.

### 2.9 Visa Trusted Agent Protocol (TAP)

- Owner and governance: Visa, developed with Cloudflare, launched 2025-10-14. Visa called it ecosystem led and named the IETF, the OpenID Foundation and EMVCo for alignment. 12 early partners gave feedback (R1-50).
- Licence: the GitHub repo links a LICENSE.md, but its type was not read.
- Latest version: no versioned release. The sample repo's last commit is 2025-10-28 (R1-52).
- Maturity, as_of 2026-11-15: C Pilot, through Visa Intelligent Commerce and Agentic Ready with live cards and named partners (baseline C361, C362, not rechecked). B Pilot: Visa, BILL and Billtrust live pilot on 2026-10-20, with the BILL agent registered through TAP and the Agentic Directory (R1-54). M Absent.
- Layers: 3 (agent identity), 2 partial (intent tag), 4 partial (payment info, PAR).
- P1 human present or delegated. P3 signed HTTP requests with a key directory and network registered agent. P4 consumer instructions held by the network (in Visa Intelligent Commerce, not TAP itself). P5 agentic network token through Visa Intelligent Commerce. P8 merchant. P9 card reason codes. P11 agentic browser and HTTP. P12 RFC 9421 with Ed25519. P13 open web.
- Flow:
  1. Agent registers with Visa and its public key goes into a directory Visa hosts.
  2. On each request the agent signs with RFC 9421, adding created, expires, keyid, nonce and a tag for browsing or paying.
  3. Merchant or CDN rebuilds the signature base, fetches the key, verifies it and checks the nonce against a replay cache (R1-51, R1-53).
  4. Optional consumer recognition and payment data travel with the request.
- Key fields: Signature-Input and Signature headers, keyid, created, expires, nonce, tag values agent-browser-auth and agent-payer-auth (R1-53). The repo describes PARs, loyalty numbers, emails and phones passed with consent. The field level merchant specification did not render for fetch (section 6).
- Distinctive: three signals in one signature (agent intent, consumer recognition, payment information). It is the first agent identity scheme in a live B2B invoice pilot.
- Gaps: its tags differ from the IETF draft's single web-bot-auth tag (R1-56). The sample repo has been idle for 12 months and has no versioned spec.

### 2.10 Web Bot Auth (IETF) and HTTP Message Signatures (RFC 9421)

- Owner and governance: IETF Web Bot Auth working group (webbotauth, Web and Internet Transport area). The WG document draft-ietf-webbotauth-httpsig-protocol has authors from Cloudflare and Google (R1-56). RFC 9421 was published February 2024 on the Standards Track (R1-59).
- Licence: IETF Trust.
- Latest version: draft-ietf-webbotauth-httpsig-protocol-01, 2026-10-29, expiring 2027-05-02 (R1-56). The WG milestones targeted the IESG for April and August 2026. Nothing had been sent by 2026-11-15 (R1-57).
- Maturity, as_of 2026-11-15: as an agent identity signal for checkout traffic, C Live. OpenAI's cloud browser signs, and Akamai, Cloudflare, HUMAN and Vercel verify (R1-16). AWS WAF supports it (baseline C389). It moves no money. B Spec. M Spec.
- Layers: 3.
- P3 signed HTTP requests with a key directory. P11 any HTTP. P12 RFC 9421 (Ed25519 and RSASSA-PSS in examples). P13 /.well-known/http-message-signatures-directory and the Signature-Agent header. P1, P4, P5, P8 and P9 are not defined.
- Flow:
  1. Agent publishes a JWKS directory at a well-known URI.
  2. Agent signs each request covering @authority or @target-uri and signature-agent, with created, expires, keyid and tag.
  3. Verifier fetches the directory named in Signature-Agent and verifies the signature.
- Key fields: tag "MUST be web-bot-auth", expires recommended within 24 hours of created, keyid is the JWK SHA-256 thumbprint, and shared HMAC secrets are forbidden (R1-56).
- Distinctive: the only agent identity method in this study on an IETF standards track.
- Gaps: it is not yet an RFC, the network tags are incompatible, and it proves who the agent is but not what the user allowed.

### 2.11 Mastercard Agent Pay Acceptance Framework and agentic tokens

- Owner and governance: Mastercard. The framework is published on Mastercard Developers. Mastercard's framework page returned 403, so its details were not opened (section 6).
- Licence: proprietary network rules.
- Latest version: not found.
- Maturity, as_of 2026-11-15: C Pilot. All European issuers were enabled at network level and 36 banks completed controlled live transactions with passkeys (2026-06-02, R1-60). US cardholder enablement dates from the 2025 holiday season (baseline V#6, not rechecked). Press coverage of the Q3 2026 earnings call reports that volumes remain limited (R1-18). B Absent (none found in this lane). M Spec: Agent Pay for Machines was announced 2026-06-10 with more than 30 partners (baseline C419, not rechecked), and no real money was verified.
- Layers: 3 (registration, Web Bot Auth), 4 (agentic tokens), 2 and 7 partial (intent data through Verifiable Intent).
- P1 present and delegated. P3 network registered agent plus signed HTTP requests (R1-53). P4 consumer instructions held by the network, with Verifiable Intent as proof. P5 agentic network token. P8 merchant. P9 card reason codes, with intent data as an audit trail. P11 agentic browser using existing checkout forms. P12 RFC 9421, plus SD-JWT through Verifiable Intent. P13 open web.
- Flow: agent registers with Mastercard. It signs requests with Web Bot Auth and a pay or browse tag. It submits an agentic token through the merchant's normal card form. The issuer authorises, with a passkey where needed.
- Distinctive: no merchant code change is claimed, since verification can sit at the CDN. Stripe can use Agent Pay tokens under SPTs (R1-12).
- Gaps: the merchant spec could not be opened, the field names are unverified, and there is no public B2B profile.

### 2.12 Mastercard Verifiable Intent (VI)

- Owner and governance: maintained by Mastercard and open to multi-stakeholder contribution (R1-61). It was contributed to the FIDO Payments TWG with AP2 (R1-40).
- Licence: Apache 2.0.
- Latest version: Draft v0.1. The last breaking field alignment to AP2 landed 2026-04-18 and the last commit was 2026-04-20 (R1-63).
- Maturity, as_of 2026-11-15: C Spec, B Absent, M Absent. Mastercard says VI plays a "critical role" in its European live transactions (R1-60), but those transactions were not shown to carry VI credentials.
- Layers: 2, 3 (agent key binding), 7 (evidence).
- P1 present (immediate mode) and delegated (autonomous mode). P3 verifiable credential with agent key binding (cnf.jwk). P4 signed cart mandate (immediate) or signed intent mandate (autonomous). P5 card (pan_last_four, scheme). P9 signed mandate as evidence. P11 maps onto AP2, ACP and UCP. P12 SD-JWT with key binding, JWS and RFC 7800 cnf. P13 not defined.
- Flow:
  1. L1: the credential provider issues the user an SD-JWT bound to a device key (about 1 year).
  2. L2: the user signs the final checkout and payment (immediate, about 15 minutes) or constraints bound to the agent key (autonomous, 24 hours to 30 days).
  3. L3, autonomous only: the agent signs L3a for the network and L3b for the merchant (about 5 minutes). The L3a transaction_id must equal the L3b checkout_hash (R1-62).
- Distinctive: selective disclosure, so the network sees payment data and the merchant sees checkout data, with "no novel cryptography" (R1-62).
- Gaps: still v0.1, one maintainer, and no verified production use.

### 2.13 American Express ACE developer kit and Agent Purchase Protection

- Owner: American Express. Licence: proprietary.
- Latest version: the Account Enablement, Intent Intelligence and Payment Credentials specs have been available since 2026-04-14. Agent Registration and Cart Context are "still under development" as of 2026-11-15 (R1-65). A tracker dates the Intent Intelligence framework to 2026-10-13 (baseline C316, not rechecked).
- Maturity, as_of 2026-11-15: C Spec, B Absent, M Absent.
- Layers: 2 (Intent Intelligence), 3 (Agent Registration), 4 (tokenized credentials), 7 (Agent Purchase Protection).
- P1 present and delegated. P3 network registered agent, with Web Bot Auth per Cloudflare (R1-53). P4 consumer instructions held by the network (purchase intents managed in the Amex App). P5 agentic network token, "Issuing tokenized agentic payment credentials only to verified agents" (R1-65). P8 merchant. P9 issuer protection for agent error on top of normal disputes. P10 issuer by commitment.
- Flow: agent registers. The card member links the card to the agent and approves a purchase intent. The agent pays with a tokenized credential and sends authenticated intent and cart context. Amex uses that intent in authorisation and disputes.
- Distinctive: the only network to promise to absorb agent error, at least on paper.
- Gaps: the protection is still described "In the future", the registered agent list is "coming soon" (R1-66), and the terms are not published.

### 2.14 Skyfire KYAPay (IETF individual draft)

- Owner: Skyfire, with co-authors from Self-Issued Consulting and Akamai on -02 (R1-67). Governance: individual Internet-Draft discussed on the OAuth list, "not endorsed by the IETF".
- Latest version: draft-skyfire-oauth-using-kyapay-tokens-02, 2026-11-02, expiring 2027-05-06.
- Maturity, as_of 2026-11-15: C Spec, B Absent, M Spec. Skyfire's own live product claims were not checked this round.
- Layers: 3 (KYA token), 4 (PAY token).
- P1 delegated or machine to machine. P3 verifiable credential or KYA token. P4 token scoped limits (amt, cur in PAY tokens). P5 PSP or wallet value held by the token issuer. P9 none. P11 HTTP header KYAPay-Token. P12 JWS. With cnf present, requests are signed with RFC 9421. P13 not defined.
- Flow: the issuer performs KYC or KYB and mints a KYA, PAY or KYA-PAY JWT. The agent sends it in KYAPay-Token. The service checks the issuer against a trusted list, fetches the JWKS from iss and validates exp, iat, jti, aud and env.
- Key claims: hid (human principal), apd (agent platform), aid (agent instance), aud, tsi, tdm, env, iss, exp, iat, jti, ori, cnf, amt, cur, stp, sti, tpr, tps, amr, ivm, aml (R1-67).
- Gaps: no WG adoption, and the trusted issuer list is out of scope.

### 2.15 Ant International, Mastercard and Visa KYA interoperability framework

- Owners: Ant International, Mastercard and Visa, working through BuildFin.ai, convened by the Monetary Authority of Singapore, and building on the SAFR framework (R1-68).
- Started: 2026-09-10. No version, spec or timeline.
- Maturity, as_of 2026-11-15: C, B and M Unsettled.
- Layers: 3.
- Scope: cross-network operator traceability, shared certification requirements and continuous transaction monitoring, "preserving each network's own verification and decisioning processes" (R1-68).
- Gaps: no published spec and no merchants named (R1-70).

### 2.16 Ant International Agentic Mobile Protocol (AMP)

- Owner and governance: Ant International. It "remains under Ant International's control", with no move to a neutral body announced (R1-70).
- Licence: not found. Ant says AMP is open-sourced on GitHub, but no repo URL was found (R1-69).
- Latest version: launched April 2026. Phase I rollout was announced 2026-09-11.
- Maturity, as_of 2026-11-15: C Spec (10 Alipay+ wallets and 7 acquirers integrating, no volumes disclosed). B Absent. M Spec (agent to agent settlement claimed).
- Layers: 2, 3, 4, 7.
- P1 delegated (tasks with budgets). P3 KYA identity with an Agent Trust Rating. P4 token scoped limits. P5 wallet account. P9 AgentSafePay, a money-back guarantee to merchants for agent-specific errors (vendor claim). P11 mobile wallet and super app interfaces. P12 not found. P13 not found.
- Distinctive: wallet rails, not card rails, with a merchant-side guarantee.
- Gaps: no spec read, no licence, no volumes, no go-live dates (R1-70).

### 2.17 FIDO Alliance agentic working groups

- Owner: FIDO Alliance. Two groups announced 2026-04-28: the Agentic Authentication TWG (chairs from CVS Health, Google and OpenAI, vice chairs from Amazon, Google and Okta) and the Payments TWG (chairs from Mastercard and Visa). Initial contributions are AP2 and Verifiable Intent (R1-40).
- Version: no public draft found.
- Maturity, as_of 2026-11-15: C, B and M Unsettled.
- Layers: 2, 3.
- Scope: verifiable user instructions, agent authentication and trusted delegation for commerce. P12 passkey or FIDO assertion is the expected primitive.
- Gaps: no timeline. "Work has commenced" is the only status given.

### 2.18 EMVCo Agentic Payments framework

- Owner: EMVCo Agentic Payments Task Force, chaired by Clinton Allen (R1-64).
- Version: draft "Framework for Specifications", reported 2026-09-04. Comments closed 2026-09-30. No follow-up was found.
- Maturity, as_of 2026-11-15: C, B and M Unsettled.
- Layers: 2 (Intent Services), 3 (Know Your Agent checks, Agentic Transaction Indicators), 4 (may touch EMV tokenisation).
- P4 consumer instructions held by the network (Intent Services as a shared registry of authorised intent).
- Gaps: framework only. The text was read through trade press, not EMVCo's own page.

### 2.19 OpenID Foundation AuthZEN agent profiles

- Owner: OpenID Foundation AuthZEN working group. The Access Request and Approval Profile (AARP) and the MCP tool authorization profile (COAZ) became WG Drafts on 2026-06-15 (R1-49).
- Maturity, as_of 2026-11-15: Spec for authorization only. There is no payment flow, so C, B and M are Spec.
- Layers: 2 (approval prerequisites), 3.
- P3 OAuth client with a policy decision point. P11 MCP tool calls (COAZ).
- Distinctive: AARP models the case of "not yet, and here is what is required", which matches step up approval before a purchase.
- Gaps: no commerce profile and no link to AP2 or ACP.

### 2.20 Klarna Agentic Product Protocol

- Owner: Klarna. It is called a "new open technical standard", served through a hosted API Klarna operates (R1-71).
- Version: launched 2025-12-15 or 2025-12-16, depending on the source.
- Maturity, as_of 2026-11-15: C Spec (discovery only, no payment), B Absent, M Absent.
- Layers: 1.
- P13 product feed. Vendor figures: more than 100 million products, about 400 million prices, 12 markets.
- Gaps: the spec itself was not opened, and it depends on Klarna's opted-in merchant network.

### 2.21 Platform programmes without their own protocol

- Google Universal Cart (2026-10-15, US): a UCP deployment, covered in 2.2 (R1-29).
- Microsoft Copilot Checkout (2026-01-09, US): runs with PayPal, Shopify and Stripe, and merchants "remain the seller of record". The opened article names no protocol (R1-72). Microsoft holds a UCP Tech Council seat and co-edits WebMCP (R1-23, R1-48).
- Amazon: listed as a UCP co-developer with a Tech Council seat (R1-23, R1-31). No Amazon commerce protocol was found. Buy for Me was not verified this round.
- Perplexity and PayPal: PayPal's agentic services release of 2025-10-28 promised Perplexity discoverability and "Agent ready" for early 2026. It names no protocol (R1-73).
- Visa Agentic Commerce Benchmark (2026-11-05): 22 models scored 57.2 percent overall on 15 shopping tasks. It does not yet test checkout or payment (R1-55). Context only, not a protocol.

## 3. Comparison table

As of 2026-11-15. Layers use the schema numbering 1 to 7. "n/d" means the spec does not define it.

| Protocol | Layers | P1 | P3 | P4 | P5 | P11 | P12 | C | B | M |
|---|---|---|---|---|---|---|---|---|---|---|
| ACP | 1, 2, 4, 7p | present | OAuth client, bearer key | token scoped limits (one_time) | PSP scoped token or network token | REST, MCP binding | HMAC, detached JSON signature | Spec | Absent | Absent |
| UCP | 1, 2, 3p, 4, 7p | present, delegated with AP2 ext | signed requests with key directory, OAuth linking | none or signed cart mandate (ext) | wallet, PSP token, network token | REST, MCP, A2A, embedded | RFC 9421, detached JWS, SD-JWT | Live | Absent | Absent |
| AP2 | 2, 3p, 4, 7 | present, not present | VC with agent key | signed intent and cart mandates | instrument agnostic | n/d (via UCP or A2A) | SD-JWT | Spec | Spec | Spec |
| A2A | 1, 3 | machine or delegated | signed agent card | n/d | n/d | A2A messages | JWS on cards | Spec | Spec | Spec |
| A2A x402 ext | 4, 5, 6 | machine to machine | none | none | stablecoin key | A2A messages | on chain signatures | Absent | Absent | Spec |
| MCP (+ x402 or MPP) | 1, (4, 5 via wrapper) | present or machine | OAuth client | n/d | stablecoin key via wrapper | MCP tool calls | none in core | Live | Absent | Live |
| WebMCP | 1 | present | n/d | n/d | n/d | agentic browser | n/d | Live (Shopify) | Absent | Absent |
| Shopify surfaces | 1, 2, 4 | present | OAuth (Sign in with Shop) | none, explicit confirm rule | wallet (Shop Pay) | MCP, agentic browser | n/d | Live | Absent | Absent |
| Visa TAP | 2p, 3, 4p | present or delegated | signed requests, network registered | network held instructions (VIC) | agentic network token | agentic browser, HTTP | RFC 9421 Ed25519 | Pilot | Pilot | Absent |
| Web Bot Auth, RFC 9421 | 3 | n/d | signed requests with key directory | n/d | n/d | HTTP | RFC 9421 | Live (identity only) | Spec | Spec |
| Mastercard Agent Pay | 2p, 3, 4, 7p | present, delegated | network registered plus WBA | network held instructions, VI | agentic network token | agentic browser | RFC 9421, SD-JWT | Pilot | Absent | Spec |
| Mastercard VI | 2, 3, 7 | present, delegated | VC with agent key | signed cart or intent mandate | card | maps to AP2, ACP, UCP | SD-JWT KB | Spec | Absent | Absent |
| Amex ACE | 2, 3, 4, 7 | present, delegated | network registered, WBA | network held instructions | agentic network token | not found | not found | Spec | Absent | Absent |
| KYAPay | 3, 4 | delegated, machine | KYA token | token scoped limits | issuer held value | HTTP header | JWS, optional RFC 9421 | Spec | Absent | Spec |
| KYA framework (Ant, MC, Visa) | 3 | n/d | network registered | n/d | n/d | n/d | n/d | Unsettled | Unsettled | Unsettled |
| Ant AMP | 2, 3, 4, 7 | delegated | KYA, trust rating | token scoped limits | wallet account | mobile wallet | not found | Spec | Absent | Spec |
| FIDO TWGs | 2, 3 | n/d | VC (expected) | signed user instructions | n/d | n/d | passkey or FIDO | Unsettled | Unsettled | Unsettled |
| EMVCo framework | 2, 3, 4 | n/d | network registered (KYA) | network held instructions | network token | n/d | n/d | Unsettled | Unsettled | Unsettled |
| OIDF AuthZEN profiles | 2, 3 | present | OAuth client, PDP | approval prerequisite | n/d | MCP tool calls | n/d | Spec | Spec | Spec |
| Klarna APP | 1 | n/d | n/d | n/d | n/d | REST feed API | n/d | Spec | Absent | Absent |

"p" after a layer means partial.

## 4. Changes 2026-10-22 to 2026-11-15

| Date | Change | Claim |
|---|---|---|
| 2026-10-22 | IETF: draft-illyes-webbotauth-cbcp-01, draft-illyes-webbotauth-jafar-01 and draft-kelley-webbotauth-sail-00 posted | R1-58 |
| 2026-10-22 | UCP: cart-only checkout creation allowed (main branch) | R1-25 |
| 2026-10-23 | UCP: return policy extension dev.ucp.shopping.policy.return merged | R1-25 |
| 2026-10-27 | IETF: draft-meunier-webbotauth-registry-04 | R1-58 |
| 2026-10-29 | IETF: WG draft draft-ietf-webbotauth-httpsig-protocol-01 (Cloudflare and Google authors, expires 2027-05-02) | R1-56 |
| 2026-10-31 | UCP: identity linking allows email matching when the issuer is the mailbox authority | R1-25 |
| 2026-11-02 | IETF: draft-skyfire-oauth-using-kyapay-tokens-02 with an Akamai co-author | R1-67 |
| 2026-11-02 | IETF: draft-vilgalys-webbotauth-signed-agent-metadata-00 | R1-58 |
| 2026-11-03 | The Paypers reports Mastercard disclosed an OpenAI partnership covering Agent Pay on its Q3 2026 earnings call | R1-18 |
| 2026-11-05 | Visa publishes the Agentic Commerce Benchmark (context, not a protocol) | R1-55 |
| 2026-11-07 | UCP: "Complete Checkout is a command, not an update" clarification merged | R1-25 |
| 2026-11-10 | UCP: Food Checkout capability with fulfillment and tip extensions, and purchase options extension with subscription policy, merged to main (not yet in a tagged release) | R1-24, R1-25 |
| 2026-11-11 | ucp.dev updated for the Food Checkout launch | R1-24 |
| 2026-11-13 | W3C WebMCP Draft Community Group Report dated 13 November 2026 | R1-48 |
| 2026-11-15 | IETF: draft-meunier-webbotauth-capacity-management-00 | R1-58 |

No change found in the window for ACP (last commit 2026-07-18), AP2 (2026-04-29), the A2A x402 extension (2026-05-24), Visa TAP sample repo (2025-10-28), Verifiable Intent (2026-04-20), the Amex ACE page (still "coming soon"), FIDO, EMVCo, OpenID AuthZEN or A2A core (docs only). Just before the window, on 2026-10-20, Visa, BILL and Billtrust started a live B2B pilot using TAP (R1-54).

Do-not-regress check. "ChatGPT moved checkout to retailer sites in March 2026" is confirmed by R1-17 (secondary, 2026-06-12) and refined by R1-13 to R1-16 (OpenAI docs, undated). "In the payouts context AP2 and ACP are Spec" is unchanged.

## 5. Claim table

| id | claim | number | unit | event_date | publish_date | url | quote | source_tier | kind | rung | does not tell you | confidence |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| R1-01 | ACP latest stable spec is 2026-04-17. It deprecated 2026-01-30 and the README calls the spec beta. | 2026-04-17 | spec version | 2026-04-17 | 2026-04-17 | https://github.com/agentic-commerce-protocol/agentic-commerce-protocol/blob/main/changelog/2026-04-17.md | Previous version `2026-01-30` deprecated | primary | fact | 2 | Whether any agent runs this version in production | high |
| R1-02 | ACP has no dated release after 2026-04-17. The last commit on main is 2026-07-18. | 0 | releases since 2026-04-17 | 2026-07-18 | not shown | https://github.com/agentic-commerce-protocol/agentic-commerce-protocol/commits/main | SEP: Optional product URL on checkout Item (#281) | primary | fact | 3 | Private work or deployments outside the repo | high |
| R1-03 | Meta joined the ACP Technical Steering Committee as seat 3 and is listed as lead maintainer with OpenAI and Stripe. | 3 | lead maintainers | 2026-04-24 | 2026-04-24 | https://github.com/agentic-commerce-protocol/agentic-commerce-protocol/blob/main/changelog/unreleased/add-meta-tsc-member.md | Meta joins the ACP TSC to help advance the protocol’s development | primary | fact | 2 | Whether Meta deploys ACP in its apps | high |
| R1-04 | The ACP TSC has up to 7 seats appointed by founders OpenAI and Stripe, who hold a last resort veto. No foundation exists. | 7 | seats | not shown | not shown | https://github.com/agentic-commerce-protocol/agentic-commerce-protocol/blob/main/docs/governance.md | The TSC has up to 7 seats. | primary | fact | 2 | Timeline for neutral stewardship | high |
| R1-05 | The ACP delegate payment Allowance has reason, max_amount, currency, checkout_session_id, merchant_id and expires_at. Only one_time is allowed. Cards pass as fpan or network_token. | 1 | allowance reason value | 2026-04-17 | 2026-04-17 | https://github.com/agentic-commerce-protocol/agentic-commerce-protocol/blob/main/spec/2026-04-17/openapi/openapi.delegate_payment.yaml | currently only one_time is supported | primary | fact | 2 | How PSPs enforce the allowance | high |
| R1-06 | The ACP CheckoutSession status has 11 values, including authentication_required, pending_approval and requires_escalation. | 11 | status values | 2026-04-17 | 2026-04-17 | https://github.com/agentic-commerce-protocol/agentic-commerce-protocol/blob/main/spec/2026-04-17/openapi/openapi.agentic_checkout.yaml | Current status of the checkout session | primary | fact | 2 | Which agents or merchants implement each status | high |
| R1-07 | ACP requires Idempotency-Key and API-Version on POSTs, uses a bearer token, and offers a detached JSON signature header for requests. | not applicable | not applicable | 2026-04-17 | 2026-04-17 | https://github.com/agentic-commerce-protocol/agentic-commerce-protocol/blob/main/spec/2026-04-17/openapi/openapi.agentic_checkout.yaml | MUST be present on all POST requests. | primary | fact | 2 | Any agent identity scheme, since none is defined | high |
| R1-08 | An ACP RFC proposes a discovery file at /.well-known/acp.json. Status Proposal, version unreleased. | not applicable | not applicable | not shown | not shown | https://github.com/agentic-commerce-protocol/agentic-commerce-protocol/blob/main/rfcs/rfc.discovery.md | This RFC introduces a well-known discovery document | primary | fact | 2 | Whether it will be accepted | high |
| R1-09 | ACP delegate authentication (draft 2026-01-28) covers browser 3DS2 only. | 1 | method covered | 2026-01-28 | not shown | https://github.com/agentic-commerce-protocol/agentic-commerce-protocol/blob/main/rfcs/rfc.delegate_authentication.md | 3D Secure 2 (3DS2) authentication only | primary | fact | 2 | Passkey or app based step up support | high |
| R1-10 | Stripe docs describe ACP as created by Stripe, OpenAI and Meta. | 3 | creators named | not shown | not shown | https://docs.stripe.com/agentic-commerce/protocols/acp.md | an open standard created by Stripe, OpenAI, and Meta | primary | fact | 2 | Meta's actual contribution | medium |
| R1-11 | Stripe SPTs are issued with usage_limits currency, max_amount and expires_at on API version 2026-09-30.preview, in 34 listed countries. | 34 | countries | not shown | not shown | https://docs.stripe.com/agentic-commerce/concepts/shared-payment-tokens.md?agent-seller=agent | Set usage limits, including currency, maximum amount, and expiration window. | vendor | fact | 2 | Volume or number of agents issuing SPTs | high |
| R1-12 | Stripe may use Mastercard Agent Pay and Visa Intelligent Commerce network tokens for SPT card payments (rechecks baseline C280). | not applicable | not applicable | not shown | not shown | https://docs.stripe.com/agentic-commerce/concepts/shared-payment-tokens.md?agent-seller=agent | Stripe might use tokens issued through network programs such as Mastercard’s Agent Pay | vendor | fact | 2 | Share of SPT payments that use agentic tokens | high |
| R1-13 | OpenAI's commerce docs say shoppers pay on the merchant website or with a saved method, and the ChatGPT Wallet works with existing checkout pages. | not applicable | not applicable | not shown | not shown | https://developers.openai.com/commerce/guides/accept-payments.md | ChatGPT Wallet works out of the box with existing checkout pages | vendor | fact | 2 | Launch date or share of users with the wallet | medium |
| R1-14 | With ChatGPT Wallet the merchant gets a network token, links it by PAR, and must not reuse the credential. | not applicable | not applicable | not shown | not shown | https://developers.openai.com/commerce/guides/accept-payments.md | You receive a network token instead. | vendor | fact | 2 | Which network token programme or issuer | medium |
| R1-15 | OpenAI's partner playbook says the ChatGPT purchase journey moves to browser use or a plugin, with Wallet support where available. | not applicable | not applicable | not shown | not shown | https://developers.openai.com/commerce/guides/overview.md | The journey moves to browser use or a plugin. | vendor | fact | 2 | Whether any in-chat ACP checkout remains | medium |
| R1-16 | ChatGPT's cloud browser signs requests with Web Bot Auth (Signature-Agent https://chatgpt.com, keys at chatgpt.com/.well-known/http-message-signatures-directory). Akamai, Cloudflare, HUMAN and Vercel verify it. | 4 | verifying vendors | not shown | not shown | https://developers.openai.com/commerce/agent-access.md | This guidance applies to signed cloud browser requests, not web crawlers. | vendor | fact | 4 | Whether it uses Visa or Mastercard pay tags | medium |
| R1-17 | OpenAI moved Instant Checkout into individual apps by March 2026. Visa said it is aligning TAP with OpenAI's protocol (Visa and OpenAI partnership, June 2026, no launch date). | not applicable | not applicable | 2026-03 | 2026-06-12 | https://www.digitalcommerce360.com/2026/06/12/visa-openai-agent-led-payments/ | moving Instant Checkout into individual apps | secondary | fact | 5 | Exact retirement date or OpenAI's own wording | medium |
| R1-18 | Mastercard disclosed a partnership with OpenAI covering Agent Pay on its Q3 2026 earnings call. Volumes remain limited. | not applicable | not applicable | Q3 2026 earnings call, date not shown | 2026-11-03 | https://thepaypers.com/payments/news/mastercard-partners-with-openai-on-agent-pay-and-ai-transformation | early days | secondary | fact | 5 | Terms, products or launch dates | medium |
| R1-19 | UCP's latest tagged release is v2026-08-25 (published 2026-08-25). No newer tag as of 2026-11-15. | 2026-08-25 | spec version | 2026-08-25 | 2026-08-25 | https://ucp.dev/documentation/announcements/ | We have released version v2026-08-25 of the protocol. | primary | fact | 2 | Adoption of that version | high |
| R1-20 | UCP v2026-08-25 adds 3DS2 payments security, structured request constraints, independent capability versioning and grocery readiness. | not applicable | not applicable | 2026-08-25 | 2026-08-25 | https://ucp.dev/documentation/announcements/ | payments security improvements (3DS2), structured request constraints | primary | fact | 2 | Which platforms upgraded | high |
| R1-21 | The UCP Payments Technical Council formed with 8 inaugural members: Adyen, Ant International, Coinbase, Global Payments, Google, PayPal, Shopify and Stripe. | 8 | members | 2026-09-02 | 2026-09-02 | https://ucp.dev/documentation/announcements/ | Google, PayPal, Shopify, and Stripe to the Payments TC. | primary | fact | 2 | Its decisions or outputs so far | high |
| R1-22 | Stripe joined the UCP Governing Council beside permanent members Google and Shopify, and two elected open seats were added. | 3 | named council members | 2026-04-28 | 2026-04-28 | https://ucp.dev/documentation/announcements/ | Stripe has joined the UCP Governing Council as a new member | primary | fact | 2 | Voting rules or whether Stripe is permanent | high |
| R1-23 | The UCP Tech Council grew to 16 seats with members from Amazon, Meta, Microsoft, Stripe and Salesforce. | 16 | seats | 2026-04-24 | 2026-04-24 | https://ucp.dev/documentation/announcements/ | The Tech Council has expanded its seats to 16, welcoming five new members: | primary | fact | 2 | Whether Amazon deploys UCP | high |
| R1-24 | The UCP Food Checkout capability (dev.ucp.food.checkout) with fulfillment and tip extensions merged on 2026-11-10. The business keeps MoR duties. | not applicable | not applicable | 2026-11-10 | 2026-11-10 | https://github.com/Universal-Commerce-Protocol/ucp/pull/897 | Merchant of Record (MoR) responsibilities with the business | primary | fact | 2 | Release date or live food platforms | high |
| R1-25 | UCP main gained a return policy extension (2026-10-23), a completion boundary rule (2026-11-07) and a purchase options and subscription policy (2026-11-10). | 3 | merged changes | 2026-11-10 | 2026-11-10 | https://github.com/Universal-Commerce-Protocol/ucp/pull/1057 | Complete Checkout is a command, not an update. | primary | fact | 3 | When these ship in a tagged release | high |
| R1-26 | UCP businesses publish a profile at /.well-known/ucp with version, services, payment_handlers and keys. Platforms send UCP-Agent. Transports are REST, MCP, A2A and embedded. | 4 | transports | 2026-08-25 | not shown | https://ucp.dev/latest/specification/overview/ | /.well-known/ucp | primary | fact | 2 | How many businesses publish profiles | high |
| R1-27 | UCP checkout has 6 statuses and requires continue_url with requires_escalation. The business stays merchant of record. | 6 | statuses | 2026-08-25 | not shown | https://ucp.dev/latest/specification/shopping/checkout/ | The business remains the Merchant of Record (MoR) | primary | fact | 2 | Liability split for agent error | high |
| R1-28 | The UCP AP2 mandates extension (dev.ucp.common.payment.ap2_mandate) adds ap2.merchant_authorization (detached JWS) and ap2.checkout_mandate (SD-JWT+kb) and locks the session once negotiated. | not applicable | not applicable | not shown | not shown | https://ucp.dev/latest/specification/payment/extensions/ap2-mandates/ | Neither party may revert to a standard (unprotected) checkout flow. | primary | fact | 2 | Whether any live merchant negotiates it | high |
| R1-29 | Google Universal Cart launched in the US across Search and the Gemini app with UCP checkout and Google Pay. Merchants remain seller of record. | not applicable | not applicable | 2026-10-15 | 2026-10-15 | https://blog.google/products-and-platforms/products/shopping/universal-cart-launch/ | effortless checkout powered by the Universal Commerce Protocol (UCP) | vendor | fact | 4 | Volumes, or whether AP2 mandates are used | high |
| R1-30 | Stripe is a UCP Tech Council member and offers a Stripe Payments handler for card and Apple Pay in UCP checkouts. | not applicable | not applicable | not shown | not shown | https://docs.stripe.com/agentic-commerce/protocols/ucp.md | Stripe is a member of the UCP Tech Council | vendor | fact | 2 | Live UCP volume through Stripe | high |
| R1-31 | ucp.dev lists 21 co-developers, including Google, Shopify, Amazon, Microsoft, Meta, Walmart, Target and Stripe. | 21 | co-developers | not shown | not shown | https://ucp.dev/ | Co-developed by industry leaders | primary | vendor_claim | 6 | What each co-developer built or deployed | medium |
| R1-32 | Shopify removed Storefront MCP catalog and cart tools in favour of UCP endpoints at /api/ucp/mcp. | not applicable | not applicable | not shown | not shown | https://shopify.dev/docs/apps/build/storefront-mcp | Use the Universal Commerce Protocol (UCP) instead. | vendor | fact | 2 | Date of removal | high |
| R1-33 | Shopify launched Shop MCP at mcp.shop.com over more than 1 billion catalog products, completing checkout only after shopper confirmation (rechecks baseline C311). | 1000000000 | products (vendor) | 2026-10-13 | 2026-10-13 | https://shopify.dev/changelog/posts/add-shopping-and-shop-pay-checkout-to-any-agent-with-shop-mcp | the shopper confirms the total and payment method | vendor | fact | 4 | Order volume through Shop MCP | high |
| R1-34 | Shopify Checkout WebMCP exposes four tools. A Web Bot Auth signature or ready status does not grant buyer permission, and new card entry is blocked. | 4 | tools | 2026-09-28 | 2026-09-28 | https://shopify.dev/docs/agents/carts-and-checkout/checkout-webmcp.md | WBA and ready_for_complete don't grant it. | vendor | fact | 2 | Usage by browser agents | high |
| R1-35 | AP2 v0.2.0 was released on 2026-04-28 (v0.1.0 on 2025-09-16). Last repo commit 2026-04-29. | 0.2.0 | version | 2026-04-28 | 2026-04-28 | https://github.com/google-agentic-commerce/AP2/blob/main/CHANGELOG.md | 0.2.0 (2026-04-28) | primary | fact | 2 | Work happening inside FIDO | high |
| R1-36 | AP2 v0.2 defines five roles, including a Trusted Surface, and leaves transport to the surrounding commerce protocol. | 5 | roles | 2026-04-28 | not shown | https://ap2-protocol.org/ap2/specification/index.md | outside the scope of AP2 | primary | fact | 2 | Who may act as Trusted Surface in practice | high |
| R1-37 | The AP2 Payment Mandate has closed fields and open constraints: amount_range, budget, agent_recurrence, allowed_payees, allowed_payment_instruments, allowed_pisps, reference and execution_date. | 8 | constraint types | 2026-04-28 | not shown | https://ap2-protocol.org/ap2/payment_mandate/index.md | MAY optionally include any property from the closed Payment Mandate | primary | fact | 2 | How issuers use it in authorisation | high |
| R1-38 | The AP2 Checkout Mandate is an SD-JWT with checkout_jwt and checkout_hash. The schema table says vct mandate.checkout but the type section says mandate.checkout.1. | 2 | conflicting vct values | 2026-04-28 | not shown | https://ap2-protocol.org/ap2/checkout_mandate/index.md | Verifiable Credential Type claim as defined in SD-JWT. | primary | fact | 2 | Which value implementations use | medium |
| R1-39 | AP2 supports human present and human not present flows. In human not present, the agent signs closed mandates with its own key within user signed open mandates (flows page). | 2 | flow types | 2026-04 | not shown | https://ap2-protocol.org/ | both human-present and human-not-present transactions | primary | fact | 2 | Any real money use | high |
| R1-40 | FIDO formed an Agentic Authentication TWG (chairs from CVS Health, Google, OpenAI) and a Payments TWG (chairs from Mastercard, Visa), seeded by AP2 and Verifiable Intent (rechecks baseline C356). | 2 | working groups | 2026-04-28 | 2026-04-28 | https://fidoalliance.org/fido-alliance-to-develop-standards-for-trusted-ai-agent-interactions/ | Work has commenced within these workstreams | primary | fact | 2 | Timeline or first draft | high |
| R1-41 | The A2A x402 extension is v0.1, with canonical URI github.com/google-a2a/a2a-x402/v0.1. Its only release is v0.1.0 (2025-09-16) and its last commit is 2026-05-24. | 0.1 | version | 2025-09-16 | 2025-09-16 | https://github.com/google-agentic-commerce/a2a-x402/blob/main/spec/v0.1/spec.md | The canonical URI for this version of the extension is | primary | fact | 2 | Live use by any merchant agent | high |
| R1-42 | A2A v1.0.0 shipped 2026-03-12 and v1.0.1 on 2026-05-28. The Linux Foundation called v1.0 the first stable specification, with more than 150 organisations. | 150 | organisations (vendor) | 2026-04-09 | 2026-04-09 | https://www.linuxfoundation.org/press/a2a-protocol-surpasses-150-organizations-lands-in-major-cloud-platforms-and-sees-enterprise-production-use-in-first-year | first stable specification | primary | fact | 2 | Commerce traffic over A2A | high |
| R1-43 | IBM BeeAI's Agent Communication Protocol repo was archived 2025-08-27 and says ACP is now part of A2A. | not applicable | not applicable | 2025-08-27 | not shown | https://github.com/i-am-bee/acp | ACP is now part of A2A under the Linux Foundation! | primary | fact | 2 | Which features carried into A2A | high |
| R1-44 | MCP spec 2026-07-28 removes sessions and the initialize handshake, adds an extensions field and moves tasks to an extension. It defines no payment primitive. | 2026-07-28 | spec version | 2026-07-28 | 2026-07-28 | https://modelcontextprotocol.io/specification/2026-07-28/changelog | Make MCP stateless | primary | fact | 2 | Whether a payments extension is in progress | high |
| R1-45 | Under MCP 2026-07-28 the client learns an out-of-band step's result by retrying, and URL elicitation's elicitationId was removed. | not applicable | not applicable | 2026-07-28 | 2026-07-28 | https://modelcontextprotocol.io/specification/2026-07-28/changelog | the client learns the outcome of an out-of-band interaction by retrying the original request | primary | fact | 2 | How payment pages should be wired | high |
| R1-46 | x402 docs describe paid MCP tools: 402 with PAYMENT-REQUIRED, wallet signs, retry with PAYMENT-SIGNATURE, default 1 USD policy cap. | 1 | USD default cap | not shown | not shown | https://docs.x402.org/guides/mcp-server-with-x402.md | once payment is verified | primary | fact | 2 | Settlement timing or volume | medium |
| R1-47 | AWS AgentCore payments became generally available, letting agents pay for paid APIs and MCPs over x402 and MPP (rechecks baseline C384). | not applicable | not applicable | 2026-08-18 | 2026-08-18 | https://aws.amazon.com/about-aws/whats-new/2026/08/bedrock-agentcore-payments-ga/ | now generally available in Amazon Bedrock AgentCore | vendor | fact | 4 | Transaction volume | high |
| R1-48 | W3C WebMCP is a Draft Community Group Report dated 2026-11-13, editors from Microsoft and Google, API on document.modelContext with a consequentialHint. | 2026-11-13 | draft date | 2026-11-13 | 2026-11-13 | https://webmachinelearning.github.io/webmcp/ | significant, real-world, or non-reversible | primary | fact | 2 | Browser shipping status | high |
| R1-49 | OpenID AuthZEN approved AARP and COAZ (MCP tool authorization) as Working Group Drafts. | 2 | drafts | 2026-06-15 | 2026-06-15 | https://openid.net/openid-foundation-advances-authorization-for-the-agent-era-with-new-authzen-working-group-drafts/ | not yet, and here is what is required | primary | fact | 2 | Any commerce profile | high |
| R1-50 | Visa launched TAP with Cloudflare on 2025-10-14, carrying agent intent, consumer recognition and payment information, with 12 named early feedback partners. | 12 | early partners | 2025-10-14 | 2025-10-14 | https://usa.visa.com/about-visa/newsroom/press-releases.releaseId.21716.html | user experience (UX) changes | vendor | fact | 2 | Live merchant count | high |
| R1-51 | The Visa TAP spec page says the merchant rebuilds the signature base and verifies with the agent's public key under RFC 9421 (rechecks baseline C364). | not applicable | not applicable | not shown | not shown | https://developer.visa.com/capabilities/trusted-agent-protocol/trusted-agent-protocol-specifications | reconstruct the signature_base string using attributes from the request | primary | fact | 2 | Field names, which did not render | high |
| R1-52 | The Visa TAP sample repo has no releases and its last commit was 2025-10-28. | 0 | releases | 2025-10-28 | not shown | https://github.com/visa/trusted-agent-protocol | Adding nonce validation sample code. | primary | fact | 3 | Visa's internal spec revisions | high |
| R1-53 | Cloudflare says Visa TAP and Mastercard Agent Pay use Web Bot Auth with tags agent-browser-auth and agent-payer-auth plus a nonce, with directories hosted by Visa and Mastercard. Amex will use Web Bot Auth (rechecks baseline C363). | 2 | tag values | 2025-10-24 | 2026-07-15 | https://blog.cloudflare.com/secure-agentic-commerce/ | agent-payer-auth | vendor | fact | 5 | Whether tags will converge on the IETF value | high |
| R1-54 | Visa, BILL and Billtrust started a live pilot of AI agents paying buyer approved invoices, the agent registered through TAP and the Agentic Directory (rechecks baseline C349). | not applicable | not applicable | 2026-10-20 | 2026-10-20 | https://usa.visa.com/about-visa/newsroom/press-releases.releaseId.22856.html | Businesses should not have to choose between automation and control when making payments | vendor | fact | 4 | Pilot volume or number of buyers | high |
| R1-55 | The Visa Agentic Commerce Benchmark tested 22 models from 12 labs on 15 shopping tasks with a 57.2 percent overall pass rate. | 57.2 | percent pass rate (vendor) | 2026-11-05 | 2026-11-05 | https://investor.visa.com/news/news-details/2026/Visa-Releases-First-of-Its-Kind-Industry-Benchmark-for-AI-Shopping-Almost-Half-of-Test-Runs-Fail/default.aspx | complementary research designed to benefit the wider industry | vendor | vendor_claim | 6 | Checkout or payment success, not yet tested | medium |
| R1-56 | IETF WG draft draft-ietf-webbotauth-httpsig-protocol-01 (Cloudflare and Google authors) requires tag web-bot-auth, recommends expires within 24 hours and expires 2027-05-02. | 24 | hours max recommended validity | 2026-10-29 | 2026-10-29 | https://datatracker.ietf.org/doc/draft-ietf-webbotauth-httpsig-protocol/ | MUST be web-bot-auth | primary | fact | 2 | When it becomes an RFC | high |
| R1-57 | Web Bot Auth WG milestones set April and August 2026 for IESG submission. As of 2026-11-15 no document had reached the IESG. | 2026-04-30 | milestone date | 2026-11-15 | not shown | https://datatracker.ietf.org/wg/webbotauth/about/ | Standards track specification(s) describing authentication technique(s) sent to the IESG | primary | fact | 2 | Revised milestone dates | high |
| R1-58 | Six Web Bot Auth related drafts were posted or updated in the window, including registry-04, signed-agent-metadata-00 and capacity-management-00. | 6 | drafts | 2026-11-15 | 2026-11-15 | https://datatracker.ietf.org/wg/webbotauth/documents/ | draft-vilgalys-webbotauth-signed-agent-metadata-00 | primary | fact | 3 | Which will be adopted | high |
| R1-59 | RFC 9421 HTTP Message Signatures was published February 2024 on the Standards Track. | 9421 | RFC number | 2024-02 | 2024-02 | https://www.rfc-editor.org/rfc/rfc9421.html | a mechanism for creating, encoding, and verifying digital signatures | primary | fact | 2 | Key discovery, which RFC 9421 leaves out | high |
| R1-60 | Mastercard said all European issuers are enabled at network level for Agent Pay and 36 banks completed controlled live transactions with passkeys (rechecks baseline C360). | 36 | banks | 2026-06-02 | 2026-06-02 | https://newsroom.mastercard.com/news/europe/en/perspectives/en/2026/europe-is-building-the-foundations-for-trusted-agentic-commerce/ | all Mastercard issuers in Europe are enabled at a network level for Agent Pay | vendor | fact | 4 | Volume or public availability | high |
| R1-61 | Verifiable Intent is Draft v0.1 under Apache 2.0, maintained by Mastercard, with mappings to AP2, ACP and UCP. | 0.1 | version | not shown | not shown | https://github.com/agent-intent/verifiable-intent | Draft (v0.1). Maintained by Mastercard | primary | fact | 2 | Production use | high |
| R1-62 | VI chains three SD-JWT layers: L1 about 1 year, L2 about 15 minutes (immediate) or 24 hours to 30 days (autonomous), L3 about 5 minutes. | 30 | days max L2 autonomous lifetime | not shown | not shown | https://github.com/agent-intent/verifiable-intent | no novel cryptography | primary | fact | 2 | How revocation works before expiry | high |
| R1-63 | VI made a breaking field alignment to AP2 on 2026-04-18. Last commit 2026-04-20. | not applicable | not applicable | 2026-04-18 | 2026-04-18 | https://github.com/agent-intent/verifiable-intent/commits/main | BREAKING: field alignment per AP2 schema updates | primary | fact | 3 | Whether FIDO will keep VI as a separate spec | high |
| R1-64 | EMVCo's Agentic Payments Task Force drafted a framework with Intent Services, Know Your Agent checks and Agentic Transaction Indicators. Comments closed 2026-09-30. | not applicable | not applicable | 2026-09-30 | 2026-09-04 | https://fintech.global/2026/09/04/emvco-drafts-framework-for-agentic-card-payments/ | Agentic Transaction Indicators | secondary | fact | 5 | Spec timeline after comments | medium |
| R1-65 | Amex ACE has five services. Three specs have been available since 2026-04-14, and Agent Registration and Cart Context are still in development as of 2026-11-15. | 3 | of 5 specs available | 2026-04-14 | not shown | https://www.americanexpress.com/en-us/company/agentic-commerce/ | Agent Registration and Cart Context specifications are still under development. | vendor | fact | 2 | Spec contents, behind the developer portal | high |
| R1-66 | Amex Agent Purchase Protection is still described as future, and the registered agent list is coming soon. | not applicable | not applicable | 2026-11-15 | not shown | https://www.americanexpress.com/en-us/company/agentic-commerce/ | In the future, if a Card Member authorizes a registered AI agent | vendor | vendor_claim | 6 | Terms, limits or start date | high |
| R1-67 | KYAPay draft -02 (individual, Skyfire, Self-Issued Consulting and Akamai authors) defines KYA, PAY and KYA-PAY JWTs in a KYAPay-Token header with hid, apd and aid claims. It expires 2027-05-06. | 3 | token types | 2026-11-02 | 2026-11-02 | https://datatracker.ietf.org/doc/draft-skyfire-oauth-using-kyapay-tokens/ | not endorsed by the IETF | primary | fact | 2 | Who runs trusted issuers | high |
| R1-68 | Ant International, Mastercard and Visa began a KYA interoperability framework on 2026-09-10 through MAS convened BuildFin.ai, with no timeline or spec (rechecks baseline C365). | 3 | networks | 2026-09-10 | 2026-09-10 | https://www.theasianbanker.com/press-releases/ant-international-mastercard-and-visa-initiate-collaboration-on-know-your-agent-interoperability-to-scale-agentic-commerce | preserving each network's own verification and decisioning processes | vendor | fact | 6 | Output date or format | medium |
| R1-69 | Ant AMP Phase I covers 10 Alipay+ wallets and 7 acquirers, and Ant says AMP is open-sourced on GitHub. | 10 | wallets | 2026-09-11 | 2026-09-11 | https://www.theasianbanker.com/press-releases/ant-international-expands-agentic-mobile-protocol-rollout-begins-kya-interoperability-framework-collaboration-with-mastercard-and-visa | officially open-sourced on GitHub | vendor | vendor_claim | 6 | Repo location, licence or volumes | medium |
| R1-70 | TechWire Asia notes AMP stays under Ant's control, with no volumes and no go-live dates disclosed. | 0 | volumes disclosed | 2026-09-11 | 2026-09-15 | https://techwireasia.com/2026/09/agentic-payments-ant-international-amp-phase-one-wallets/ | remains under Ant International's control | secondary | opinion | 5 | Later disclosures | medium |
| R1-71 | Klarna's Agentic Product Protocol is a product data standard served by a Klarna hosted API covering more than 100 million products in 12 markets. | 100000000 | products (vendor) | 2025-12-15 | 2025-12-16 | https://thepaypers.com/payments/news/klarna-unveils-agentic-product-protocol-for-ai-commerce | new open technical standard | secondary | vendor_claim | 6 | Spec contents or agent uptake | medium |
| R1-72 | Microsoft Copilot Checkout launched in the US with PayPal, Shopify and Stripe, and merchants remain seller of record. The article names no protocol. | not applicable | not applicable | 2026-01-08 | 2026-01-09 | https://www.digitalcommerce360.com/2026/01/09/microsoft-copilot-checkout-agentic-ai-tools/ | remain the seller of record | secondary | fact | 5 | Which protocol runs underneath | medium |
| R1-73 | PayPal's agentic commerce services promised Agent ready for early 2026 and Perplexity discoverability, naming no protocol. | not applicable | not applicable | 2025-10-28 | 2025-10-28 | https://newsroom.paypal-corp.com/2025-10-28-PayPal-Launches-Agentic-Commerce-Services-to-Power-AI-Driven-Shopping | Agent ready will become available in early 2026. | vendor | vendor_claim | 6 | Whether it shipped | medium |
| R1-74 | The v2026-08-25 release notes split PAN and network token into distinct credential types, add split payments across instruments and add capability-driven OAuth 2.0 scopes for account linking. | 2 | credential types (PAN, network token) | 2026-08-25 | 2026-08-25 | https://newreleases.io/project/github/Universal-Commerce-Protocol/ucp/release/v2026-08-25 | distinct credential types | secondary | fact | 2 | Which handlers support each type | medium |

## 6. Not found and open questions

- Mastercard Agent Pay Acceptance Framework merchant spec and the Dynamic Token Verification Code. Mastercard pages (mastercard.com stories and Business Wire) returned HTTP 403 to fetch. Only search snippets described it, so no claim row was written. Field names for agentic tokens are therefore unverified.
- ChatGPT Wallet launch date. OpenAI's commerce docs mention it but carry no dates. Search found only secondary reports of an unreleased wallet. Open question: is it live, and for which users?
- Whether any ChatGPT purchase still runs over ACP. The OpenAI commerce index, accept payments guide, partner playbook and agent access page do not mention ACP.
- Copilot Checkout protocol. Search snippets say ACP, but the opened Digital Commerce 360 article names none. GeekWire returned 403.
- Visa TAP field level spec. The developer.visa.com specification and merchant specification pages rendered without field tables. Tags come from Cloudflare (R1-53). The TAP repo licence type was not read.
- FIDO Payments TWG output. No draft or report was found on fidoalliance.org or in search, as of 2026-11-15.
- EMVCo follow-up after the 2026-09-30 comment close. Not found. EMVCo's own page was not opened, only Fintech Global and FIDO's repost.
- AMP repo and licence. Not found in search or in the Asian Banker and Fintech Global releases.
- MCP payments extension or SEP. None found in the 2026-07-28 changelog or in search.
- AP2 real money use. None verified. The AP2 repo has had no commits since 2026-04-29, and FIDO work is not public.
- UCP release timing. Food Checkout, return policy and purchase options sit on main without a tag after v2026-08-25.
- Trulioo KYA ("Digital Agent Passport"), Sumsub and ERC-8004 appeared only in search snippets and were not opened.
- Not searched, because the shared web search budget of 200 calls ran out: Alibaba (Qwen app, Taobao), JD, Tencent and other Chinese platforms. Amazon Buy for Me and Alexa shopping status. Perplexity Comet and Instant Buy after 2025. Checkout.com ACP adoption. The OpenID Foundation and W3C beyond the pages listed. Any October or November 2026 Visa or Mastercard spec updates. A follow-up run can pick these up.
- Open question: will Visa and Mastercard move from agent-browser-auth and agent-payer-auth to the single IETF web-bot-auth tag (R1-53, R1-56)?
- Open question: who holds liability when a signed mandate exists but the agent was wrong? No spec in this lane answers it. Amex's promise is the only one and it is not in force.

## 7. Proposed additions to the schema

| Proposed ID | Name | Allowed values | Why | Evidence |
|---|---|---|---|---|
| P15 | Checkout location | native in agent, embedded merchant checkout, merchant site through an agent browser, handoff URL to buyer | ChatGPT moved from native to merchant site plus browser, UCP uses continue_url, Shopify uses WebMCP. P11 does not capture where the buyer's final page lives. | R1-15, R1-27, R1-34 |
| P16 | Consent capture surface | agent interface, trusted surface (wallet or OS), merchant page, network app | AP2 names a Trusted Surface, Amex uses its app, Shopify forbids treating WBA as consent. This decides who can prove consent. | R1-34, R1-36, R1-66 |
| P17 | Governance model | single vendor, vendor consortium with veto, multi-council, standards body | ACP has a founders' veto, UCP has councils, AP2 moved to FIDO, AMP stays with Ant. It affects lock-in risk. | R1-04, R1-21, R1-40, R1-70 |
| V11 | Credential and signature lifetime by layer | minutes to a year | WBA expires within 24 hours, VI layers run from 5 minutes to 1 year, ACP and SPT use expires_at. V2 covers only the mandate expiry. | R1-11, R1-56, R1-62 |
| Status word | Withdrawn | deployment once Live, now discontinued | ChatGPT Instant Checkout on ACP was Live and then ended. Calling it Spec hides that history. | R1-17 |
| P3 value | signed agent card | add to P3 | A2A v1.0 signs Agent Cards. | R1-42 |
| P11 value | in-page tools (WebMCP), embedded checkout (OpenRPC) | add to P11 | WebMCP and UCP embedded transport do not fit "agentic browser" or "REST". | R1-26, R1-48 |
| P12 value | detached JWS over canonical JSON, HMAC | add to P12 | UCP merchant_authorization and ACP webhooks use these. | R1-07, R1-28 |
| Evidence field | last spec activity date | ISO date | Several specs are idle: ACP since July, AP2 since April, the TAP repo since October 2025. Readers need staleness next to maturity. | R1-02, R1-35, R1-52 |
