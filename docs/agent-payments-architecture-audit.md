# Agent payments architecture audit

Round 35, Phase C. Audit date: 24 October 2026. This is a read-only audit. No site or diagram file was changed.

**What was audited**

- `docs/diagrams/agent-payments-aws.drawio`, both pages ("Current state" and "Target state"). Also the exports in `public/images/agentic-payouts/` (`aws-current.png`, `aws-target.png` and the SVGs the page loads).
- The `#pdd-build` Architecture, Flow, Verdict and Delivery tabs in `src/content/deep-dives/agentic-payouts-desk.md`. Also the player in `public/scripts/pdd.js` and the styles in `public/styles/pdd.css`.
- The round 34 persona gap list (`scratchpad/r34/persona-gaps.md`).
- The claims ledger (`cross-routine-insights/claims-ledger.json`).
- The deck slides in `scratchpad/deck/project/slides`.

**Severity**

| Severity | Meaning |
|---|---|
| Must | Wrong, unsafe or misleading as published. Fix before the next client showing. |
| Should | A real gap a reviewer would raise. Fix in Phase B where it is cheap, or list it as a known gap. |
| Could | Polish. |

**Owners:** diagram (the .drawio and its exports), page (the deep dive markdown, script and styles), deck (the slides) and doc (the design doc and source ledger).

**How findings are counted:** each finding is listed once, in the audit where it matters most. Later audits point back to it instead of repeating it, so the Must counts below are unique.

## Summary

| # | Audit | Must | Should | Top issue |
|---|---|---|---|---|
| 1 | Technical correctness | 5 | 9 | The rail is picked after release, but the release matrix depends on the rail |
| 2 | Validation and walkability | 2 | 6 | Reconciliation cannot be walked: there is no inbound path from the bank to the ledger |
| 3 | AWS Well-Architected, 6 pillars | 0 | 8 | No policy-as-code pipeline, alarms or detective controls are drawn |
| 4 | STRIDE per trust boundary | 0 | 6 | Approvals use a login step-up, not a passkey signature over the payment |
| 5 | Compliance mapping | 1 | 7 | OFAC screening is claimed on the page but not designed in the diagram |
| 6 | Failure modes and resilience | 0 | 6 | No Region-outage fallback is drawn. The fallback should be today's bank portal |
| 7 | FinOps | 0 | 3 | The page assumes $60K a year for AWS. A bottom-up estimate gives about $12K to $17K |
| 8 | Latency budget | 0 | 3 | The kill switch reaches the gateway only as fast as the flag poll, about 45 seconds |
| 9 | Data privacy and residency | 0 | 5 | Agent traces may hold bank details, and they land in a compliance-mode Object Lock bucket |
| 10 | Cross-artifact consistency | 2 | 6 | The deck still says "second person signs off" and uses the old fence wording |
| 11 | Accessibility (WCAG 2.2 AA) | 0 | 3 | The Full size link opens an SVG that animates forever with no pause |
| 12 | Diagram standards | 0 | 4 | Secrets Manager is drawn inside a subnet, and an AWS icon is recoloured |
| 13 | Client readability | 1 | 3 | Target text renders at about 4px at 1024 wide, and about 10px zoomed |
| 14 | Portability and lock-in | 0 | 3 | The KMS signing key cannot be exported, so moving off AWS means registering a new key |
| 15 | AI risk (NIST AI RMF) and autonomy | 0 | 6 | The LLM itself is not on the diagram, so it is not in the AI inventory |
| | **Total** | **11** | **78** | |

## 1. Technical correctness

Scope: AWS services, account and network boundaries, egress, identity, keys and the release path.

| ID | Finding | Severity | Evidence | Fix | Owner |
|---|---|---|---|---|---|
| 1.1 | **The rail is chosen after release, but the release matrix depends on the rail.** If the picker chooses RTP after a rule release judged against the ACH band, the lower instant-rail band is skipped. | Must | Edges `edge-policy-release`, then `edge-release-orch` (Rail picker). The diagram matrix notes "Instant rails drop one band". Page drawer 6 says "RTP and FedNow use a lower band". | Pick the rail before the release policy. Pass the rail into the Cedar context, and bind it into the release record. If failover changes the rail, run the policy again. | diagram, page |
| 1.2 | **Sending is not bound to release.** Anyone who can invoke the rail adapter, or read the bank mTLS secret, can send money and skip the guard, the matrix and the checker. Under UCC 4A the bank will honour it. | Must | `adapter`, `bankcred` (mTLS) and `edge-bankcred-adapter`. No resource policy, release token or check at the adapter is shown. | Let only the rail picker's role invoke the adapter. Let only the adapter role read the bank secret, with an SCP deny for every other principal. Have release sign an assertion with a KMS key (payment ID, amount, payee hash, rail, matrix cell, approver), and have the adapter verify it before sending. | diagram, page |
| 1.3 | **The signer and verifier story contradicts itself.** The payer's core checks the payer's own platform signature, using a key it fetches back from the Visa directory. No signed request ever leaves for a supplier portal or a bank. | Must | `verifier` sits in the Payment core. `keysync` fetches keys from the directory. The portal has a "Verifies signature" pill but no inbound request edge. The page intro says "The bank checks its signature". Drawer 4 names the owner as "You at the bank edge, or the supplier portal". | Split the role in two. (a) Inside the payer core, a mandate verifier checks the person's passkey mandate and the agent request against the local key (KMS GetPublicKey), with no directory round trip. (b) Outbound, a signing proxy adds the RFC 9421 Web Bot Auth signature to calls to supplier portals and agentic card endpoints. The counterparty verifies it against the directory. Draw that outbound edge, and fix the page intro. | diagram, page |
| 1.4 | **The API caller is the wrong principal, and the target type does not work across accounts.** An AgentCore Gateway "API Gateway" target must be in the same account and Region as the gateway, and needs a public REST endpoint. The caller is the gateway service role, not an "agent role". | Must | `pill-api-1` reads "Agent role only". Drawer 3 says "Only the agent role can call the API". The AgentCore docs list "Your API must be in the same account as your AgentCore Gateway". | Use an OpenAPI target with `GATEWAY_IAM_ROLE` SigV4 (`execute-api`). The resource policy should admit only that gateway role, with an `aws:SourceArn` condition. Relabel the pill "Gateway role only". | diagram, page |
| 1.5 | **No deterministic invoice-of-record check, duplicate check or idempotency key.** The agent's view of the ERP is untrusted. The guard checks the payee, not the amount or whether the invoice is already paid. A retry after a bank timeout can pay twice. | Must | The ERP feeds the agent only (`edge-erp-agent`, dashed untrusted). Flow tab step 6 promises an "Idempotency key", but no store is drawn. | Add an "Invoice match" Lambda in the Payment core. It reads the approved invoice from the ERP API and checks amount, payee and not-yet-paid. Keep a DynamoDB idempotency key per invoice and per payment, and pass it to the bank as the end-to-end ID. | diagram, page |
| 1.6 | KMS can hold the Web Bot Auth key. KMS supports `ECC_NIST_EDWARDS25519` with `ED25519_SHA_512` (message type RAW), and Visa TAP and Agent Pay use Ed25519 (C363). The diagram does not name the key spec. | Should | Signer pill reads "Platform signer KMS". | Name the key spec `ECC_NIST_EDWARDS25519` in the step 1 drawer. Only the signing proxy may call `kms:Sign`. The agent runtime may not. | diagram, page |
| 1.7 | The "signs" edge runs from the KMS signer to the Gateway policy. The gateway cannot call KMS Sign itself. | Should | `edge-signer-toolpol`. | Draw the signing proxy from 1.3 as the only signer. | diagram |
| 1.8 | The checker account calls SendTaskSuccess, but task tokens only work from principals in the same account as the execution. The diagram narration covers this ("Checker assumes a release role in Payment core"). The page drawer does not. | Should | Step Functions docs: "You must pass task tokens from principals within the same AWS account". Drawer 8. | Add to drawer 8: "the checker assumes a release role in the payment core account". | page |
| 1.9 | SendTaskSuccess has no resource-level permission, so the IAM deny must use `Resource: "*"`. The SCP pill on Agent runtime ("deny unless checker role") does not name an action. | Should | Service Authorization Reference lists no resource type for SendTaskSuccess. `pill-acct-agent`. | Pill text: "SCP: deny SendTaskSuccess, vendor master writes". The condition is `aws:PrincipalArn` not equal to the checker release role. | diagram |
| 1.10 | The release decision is passed along the chain, so an upstream component could forge it. | Should | `guard` to `policy` to `release` edges. | Let the Step Functions release state call `verifiedpermissions:IsAuthorized` itself through the SDK integration, and keep the response in the evidence pack. | diagram, page |
| 1.11 | Kill switch edges imply that AppConfig calls the external key directory and the gateway. AppConfig only serves flags. | Should | `edge-kill-directory`, `edge-kill-toolpol`. | Show the gateway disable as an AgentCore Policy forbid rule or a gateway interceptor that reads the flag. Show key revocation as a platform admin step through egress. | diagram |
| 1.12 | The US account check (Partner API) is drawn inside the Payment core and called directly. It is an internet service, so the call would skip the firewall. | Should | `acctval` sits in `gzone` with `edge-guard-acctval`. | Move it outside AWS and route it through the Rail VPC egress, or through PrivateLink if the partner offers it. | diagram |
| 1.13 | Lambdas in private subnets need VPC endpoints for Secrets Manager, Step Functions, KMS, CloudWatch Logs and STS. Otherwise AWS API calls go out through the firewall and NAT. | Should | No endpoints are drawn in the Rail VPC. | Add an interface endpoint group, plus free gateway endpoints for DynamoDB and S3. | diagram |
| 1.14 | The card lane uses Payment Cryptography as a "card vault". It is a managed payment HSM service, not a PAN vault. The card details come from the issuing partner. | Should | `vault` reads "Card keys, Payment Cryptography". Gap S7 says "a vault outside the agent runtime". C391. | Label it "Issuer or PCI vault (tokens)". Keep Payment Cryptography only if you encrypt PANs or verify CVVs yourself. | diagram, page |

## 2. Validation: traceability and walkability

Each requirement from the persona gap list and the four recommendation changes was traced to a cell, an edge or a drawer. Each flow was then walked edge by edge in the .drawio.

**Requirement trace**

| Requirement | Status | Where |
|---|---|---|
| Rec 1 release matrix, two exits | Met | `matrix`, `edge-release-orch` "rule releases", `edge-release-checker` "person releases" |
| Rec 2 layered protocol stack | Met | `stack` cell, Verdict "Why this protocol stack" |
| Rec 3 signer and verifier, registration and owner | Partly met | Registration and owner are shown. The outbound verify path is missing, see 1.3 |
| Rec 4 fence wording, SR 26-2 | Met | `fence-badge`, drawer 6 |
| S1 identity chain | Partly met | Key, cache, nonce and mTLS are drawn. The person signing the mandate with a passkey is only a pill, with no flow from a person |
| S2 prompt injection boundary | Met, one gap | Boundary and "No release tools" are drawn. The rule that bank details go to the guard appears in the narration only |
| S3 no self-approval | Met | Checker account, passkey step-up, IAM deny |
| S4 kill switch and recall | Met | Control plane zone |
| S5 US payee validation and callback | Partly met | The check is drawn. The callback to the supplier on a known number is not drawn |
| S6 fence wording | Met | |
| S7 PCI scope | Met | See 1.14 for the vault label |
| S8 accounts, logging and shared responsibility | Partly met | The strip exists in the .drawio but is not in the exported image, see 2.2 |
| F6 SOX badges, two-approver policy change | Partly met | Badges are drawn. The two-approver mechanism is not, see 3.2 |
| F8 portability badges | Met | See 14 for gaps |
| F3, P3, P7 | Met | Rails zone, origination pills, policy gate 9b |

**Flow walks**

| Flow | Result |
|---|---|
| Rule release over ACH or RTP | Walkable from email to agent, gateway, API, verifier, guard, policy, release, picker, adapter, firewall, NAT, IGW and own bank |
| Person release | Walkable from release to checker and back with SendTaskSuccess |
| Card lane | Walkable from adapter to card fill, firewall b, NAT b, IGW and card partner |
| Stablecoin 9b | The edges join up, but the path ends at a policy node. There is no wallet, custody or screening hop, see 5.6 |
| Ledger and evidence | Walkable outbound only. It dead-ends for reconciliation, see 2.1 |
| Supplier portal payment (Visa pilot style) | Not walkable. No outbound edge exists, see 1.3 |

| ID | Finding | Severity | Evidence | Fix | Owner |
|---|---|---|---|---|---|
| 2.1 | **Reconciliation cannot be walked.** Nothing comes back from the bank: no acknowledgements, ACH returns, RTP status or statements. Paid status is never written back to the ERP. Drawer 11 says "Each payment is matched in the ledger", but nothing reaches the ledger to match against. | Must | The Target page has no inbound edge from `ownbank`, `sponsor` or `cardpartner`. The Current page has `stmt` to `recon`. | Add an inbound path: bank webhook or statement poll, through the adapter, to EventBridge and the ledger. Add ledger to ERP for paid status. R-code returns should open an exception or recall. | diagram, page |
| 2.2 | **The exported image drops the furniture layer.** The legend, the shared responsibility strip (requirement S8) and the narration are missing from the SVG and PNG the page shows. | Must | `shared`, `leg` and `narr` have parent `furn`. The page SVG has no `data-cell-id="shared…"` and its viewBox is `0 0 4702 2211`. The page has no legend text. | Export with the furniture layer, or render the legend and the three-owner strip as HTML under the diagram. | diagram, page |
| 2.3 | `adapter-b` in AZ b has no edges. It is an orphan node. | Should | `adapter-b` appears in no edge. | Draw its egress through `egress-b`, or label both adapters as one multi-AZ function. | diagram |
| 2.4 | There is no flow for how payees get into the payee registry, which is the vendor master change control. | Should | `registry` is only a lookup target. | Add a vendor master change path: request, guard, callback, second approver, then the registry. Badge it SOX. | diagram |
| 2.5 | The new-payee callback has no actor or path. | Should | Narration 5 only. | Add an edge from the guard to the AP checker labelled "callback on known number". | diagram |
| 2.6 | The page Flow tab has 7 checks and the Architecture tab has 12 steps plus 9b, with no mapping between them. | Should | Flow cards vs drawers t1 to t12. | Add the architecture step numbers to each Flow card, for example "Payee guard, step 5". | page |
| 2.7 | "Twelve steps carry one agent payment" is not accurate. There are 13 numbered items, and steps 1 (key registration) and 12 (kill switch) are not per-payment steps. | Should | Build intro. | Change to "Ten steps carry one payment, plus key setup and the kill switch". | page |
| 2.8 | The recall playbook and the directory key registration reach the internet without going through the controlled egress. | Should | `edge-playbook-railzone`, `edge-signer-directory`. | Route them through the egress, or label them "out of band, admin". | diagram |

## 3. AWS Well-Architected review

Also applies: 1.2 and 1.5 (Security, Reliability), 2.2 (Operational excellence).

| ID | Pillar | Finding | Severity | Evidence | Fix | Owner |
|---|---|---|---|---|---|---|
| 3.1 | Operational excellence | No alarms or runbooks are drawn. Only traces are shown. | Should | `obs` is the only monitoring node. | Add a CloudWatch alarm set: stuck callbacks, spikes in guard rejects, bank API errors, kill switch state and policy changes. | diagram |
| 3.2 | Operational excellence | "A policy change needs two approvers and a ticket", but no mechanism is drawn. | Should | Narration 6. | Draw a policy-as-code pipeline: Cedar files in git, two required reviewers, and a deploy role that is the only writer to the Verified Permissions and AgentCore Policy stores. | diagram, page |
| 3.3 | Security | No detective controls are shown (GuardDuty, Security Hub, Config). | Should | Not on the diagram. | Add them to the log archive account, or to a security tooling account. | diagram |
| 3.4 | Security | The mTLS client certificate has no rotation or expiry owner. | Should | `bankcred`. | Add rotation with a 30-day expiry alarm, and hold the key in ACM Private CA or Secrets Manager with rotation. | diagram, page |
| 3.5 | Reliability | Key sync and card fill are drawn in AZ b only. | Should | `keysync` and `cardfill` sit in AZ b subnets. | Draw them multi-AZ, or label them "Lambda, both AZs". | diagram |
| 3.6 | Reliability | The person-release callback has no timeout. A Standard workflow waits up to one year. | Should | Step Functions docs on HeartbeatSeconds. | Set `TimeoutSeconds`, for example 24 hours, so an unapproved payment fails closed. Show "expires" on the person exit. | diagram, page |
| 3.7 | Performance efficiency | A SageMaker real-time endpoint for about 100 scores a day is oversized. | Should | `risk`. | Use Serverless Inference, or a model inside the policy Lambda. | diagram |
| 3.8 | Cost optimization | Two Network Firewall endpoints are about 58% of AWS run cost at this volume. | Should | See 7. | Keep them for the payment path, but price the alternative: Route 53 Resolver DNS Firewall, security groups and a NAT allowlist. Use PrivateLink to the bank where offered. | doc |
| 3.9 | Sustainability | Fixed always-on resources (firewall, endpoints, real-time endpoint) dominate. LLM tokens scale with each invoice. | Could | See 7. | Use a smaller model for invoice extraction, and a larger one only for exceptions. | doc |

## 4. STRIDE threat model per trust boundary

Boundaries: B1 outside to agent runtime, B2 agent runtime to payment core, B3 payment core to checker account, B4 payment core to the rail egress and banks, B5 payment core to directories and partners, B6 everything to the log archive, B7 the control plane and admin.

**Coverage**

| Boundary | S | T | R | I | D | E |
|---|---|---|---|---|---|---|
| B1 untrusted input | Guard on bank changes | Prompt injection: tool deny is drawn. Amount tampering is open, see 1.5 | Agent traces | Invoice PII in prompts, see 9.1 | No rate limit | Release and vendor master tools denied |
| B2 gateway to API | IAM SigV4 plus mandate | Signed request, nonce | Mandate hash in evidence | TLS | No throttle drawn, see 4.5 | Principal mismatch, see 1.4 |
| B3 checker | Passkey step-up | Opaque task token | Login step-up only, see 4.1 | Guard result shown | Callback timeout, see 3.6 | Checker app can approve any token, see 4.2 |
| B4 rail egress | mTLS, allowlisted Elastic IP | TLS | Rail reference in evidence | Firewall domain allowlist | Bank outage, see 6 | Adapter bypass, see 1.2 |
| B5 directories and partners | TLS to directory | Key cache written by key sync only | Not logged | Partner gets payee data, see 9.3 | Cached keys, then fail closed | Not applicable |
| B6 evidence | Org trail | Object Lock compliance | Object Lock compliance | Not stated, see 4.6 | Not applicable | Management account access |
| B7 control plane | Not drawn | Policy change control not drawn, see 3.2 | Not drawn | Not applicable | Kill switch can be misused | Flag write can re-enable agents, see 4.4 |

| ID | Boundary and threat | Finding | Severity | Evidence | Fix | Owner |
|---|---|---|---|---|---|---|
| 4.1 | B3 Repudiation | The checker logs in with a passkey, but the approval is not a signature over the payment. "I approved a different amount" cannot be disproved. | Should | `pill-checker-0` reads "Passkey step-up". | Use a WebAuthn assertion whose challenge is the hash of payment ID, amount, payee and rail. Store it in the evidence pack. | diagram, page |
| 4.2 | B3 Elevation | The checker app holds the release role, so a compromised app can approve any pending token. | Should | `edge-checker-release`. | The app backend checks that the approver is not the mandate signer and that the approver has rights for that matrix cell before it calls SendTaskSuccess. | diagram, page |
| 4.3 | B3 Spoofing | Cognito is a customer identity service. SOX access reviews and leaver controls sit in the corporate workforce directory. | Should | `checker` uses Cognito. | Federate to the workforce identity provider (IAM Identity Center or Entra) with passkeys. Keep the step-up signature from 4.1. | diagram, page |
| 4.4 | B7 Elevation and tampering | Writing the kill switch flag or a Cedar policy can silently widen autonomy. | Should | `kill`, `policy`. | Only the pipeline role may write flags and policies. Alert on `CreatePolicy`, `UpdatePolicy` and AppConfig deployments. Default the flag to "off". | diagram |
| 4.5 | B2 Denial of service | No throttling on the payment API. A looping agent can flood the guard and the checker queue. | Should | `api`. | Set stage throttling, add an AWS WAF rate rule (C405), and cap agent velocity, see 15.3. | diagram |
| 4.6 | B6 Information disclosure and tampering | Evidence encryption and CloudTrail log file validation are not stated. | Should | `s3`, `trail`. | Use SSE-KMS with a log archive key, turn on log file validation, and block public access. | diagram, page |

## 5. Compliance mapping

Applicability first: SOX binds public companies. GLBA binds financial institutions, such as the agent platform or a TPSP, and does not usually bind a corporate payer. SR 26-2 binds banking organisations. For others it is the benchmark.

**Mapping**

| Regime | What it asks of this design | Where it is met | Gap |
|---|---|---|---|
| Nacha 2026 fraud monitoring (C344, C345, C346) | Risk-based monitoring for false pretenses by every Originator, TPSP and TPS since 19 June 2026 | Payee guard, internal tag on agent entries, evidence | Monitoring outputs and review are not drawn, see 5.3 |
| UCC 4A (C347) | A commercially reasonable security procedure binds the payer | mTLS and allowlisted IP, Verdict bank questions | One credential serves both agent and person payments, see 5.2 |
| PCI DSS v4.0.1 | Keep card data out of the agent, segment the CDE | Tokens only, CDE subnet, no PIN keys | The CDE shares a VPC with the rail adapter, see 5.4 |
| SOX ITGC and application controls | Access, change and operations controls, plus key controls with evidence | Badges, two-approver rule, evidence pack | Pipeline not drawn (3.2), pack fields thin (5.5) |
| GENIUS Act and the OCC rule (C341, C402) | Permitted issuers only, Treasury AML rule pending, effective 18 January 2027 | Gate 9b, off until that date | No wallet custody or screening, see 5.6 |
| OFAC | Screen every party before release, strict liability | Claimed in drawer 5 and the Integrations tab | Not designed, see 5.1 |
| GLBA Safeguards Rule | Encryption, MFA, access control, vendor oversight and breach notice, for financial institutions | Passkeys, KMS, accounts | Applicability and partner oversight are not stated, see 5.7 |
| SR 26-2 (C131) | Model risk management for the ML score. Generative AI is likely outside it (C132, unverified) | Drawer 6 | Overstated for non-banks, see 15.4 |

| ID | Finding | Severity | Evidence | Fix | Owner |
|---|---|---|---|---|---|
| 5.1 | **OFAC screening is claimed but not designed.** The page says sanctions are screened for "Every party, before release", but no list source, screening step or hit queue appears on the diagram. Wallet screening for 9b is also missing. | Must | Integrations card "Sanctions screening". Drawer 5 says "sanctions". The diagram has no node for it. | Add a sanctions screen inside the payee checks zone, with a list feed (SDN and the 50% rule) and a hit queue to a person. Keep screening records for 10 years, in line with OFAC's extended record keeping, and set Object Lock retention to match. | diagram, page |
| 5.2 | UCC 4A: payment orders from the agent and orders released by a person reach the bank with the same mTLS credential, so the bank cannot apply agent limits. | Should | One `bankcred`. | Use a separate bank channel credential or sub-user for rule-released payments, with bank-side limits written into the security procedure agreement. | diagram, page |
| 5.3 | Nacha does not define an "agent tag". The tag is internal. Monitoring review is not shown. | Should | Narration 11 says "tagged for Nacha monitoring". | Reword to "tagged internally for our Nacha fraud monitoring", and show a weekly review owner. | diagram, page |
| 5.4 | The PCI CDE subnet shares the Rail VPC with the ACH adapter, which pulls connected systems into scope. | Should | `pci` sits inside `vpc`. | Put card fill in its own VPC, or its own account. | diagram |
| 5.5 | The evidence pack lacks the invoice ID, policy version, model and score version, agent ID and session ID. | Should | `evpack`. | Add those fields. | diagram, page |
| 5.6 | Lane 9b has no wallet custody, signing or address screening hop. The Stablecoin tab says "plus wallet screening". | Should | `gate` to `egress` to `stable`. | Add a custody or on-ramp provider node and a wallet screen ahead of egress. | diagram |
| 5.7 | GLBA applicability and oversight of the partner API (the US account check) are not stated. | Should | `acctval`. | State in the doc which party is a financial institution, and list the partner contract and assessment. | doc |
| 5.8 | Retention is not set. Nacha needs about 2 years, SOX records usually 7 years, and OFAC 10 years. | Should | `pill-s3-1` says "Object Lock" with no period. | Set retention per record class, with the longest class (OFAC) for screening records. | diagram, doc |

## 6. Failure modes and resilience

**What happens when each part fails**

| Component | Failure | Behaviour today | Should be | Recovery |
|---|---|---|---|---|
| Agent runtime or model | Down or degraded | No proposals | No proposals. AP falls back to manual entry | Minutes, managed service |
| AgentCore Gateway or Policy | Down | Tool calls fail | Fail closed | Managed service |
| Signature or mandate verifier | Key cache stale | Rejects | Fail closed | Key sync refresh |
| Payee guard or partner API | Partner down | Not stated | Fail closed: established payees continue, new or changed payees go to a person | Partner SLA |
| ML risk score | Down | Not stated | A missing score adds a hold above the low band | Serverless retry |
| Verified Permissions | Down | Not stated | Fail closed | Managed service |
| Release (Step Functions) | Stuck callback | Waits up to 1 year | Timeout fails closed, see 3.6 | Re-propose |
| Rail adapter or bank API | Timeout after send | Unknown state | Idempotent retry with the end-to-end ID, see 1.5. Status query before resend | Bank status API |
| Network Firewall endpoint, one AZ | AZ loss | Other AZ path | Same | Automatic |
| Region us-east-1 | Outage | All agent payments stop | Documented fallback to today's bank portal with maker-checker | Manual, same day |
| AppConfig | Unreachable | Last known flag | Default off, and release checks the revocation list directly | Automatic |

| ID | Finding | Severity | Evidence | Fix | Owner |
|---|---|---|---|---|---|
| 6.1 | There is no Region-outage story. The honest fallback is today's process. | Should | The diagram has a single `us-east-1` box. | Add a "Fallback: bank portal, maker-checker" note. Replicate the evidence bucket to a second Region (Object Lock replicates). | diagram, page |
| 6.2 | Fail-open or fail-closed behaviour is not stated for the partner API, the ML score or Verified Permissions. | Should | Narration 5 and 6. | Add a fail-closed line to each drawer, as in the table above. | page |
| 6.3 | Unknown state after a bank timeout. | Should | `adapter`. | Query status by end-to-end ID before any retry. | diagram, page |
| 6.4 | A rail failover (RTP to same-day ACH) changes the matrix cell. | Should | Linked to 1.1. | Run the policy again on any rail change. | page |
| 6.5 | The kill switch is never tested. | Should | Control plane. | Run a quarterly game day: disable one agent, switch off globally, revoke a key, recall a test ACH. | doc |
| 6.6 | DynamoDB point-in-time recovery for the ledger and payee registry is not stated. | Should | `ledger`, `registry`. | Turn on PITR and deletion protection. | diagram |

## 7. FinOps: rough monthly AWS run cost

Basis: 3,000 suppliers and about 36,000 payments a year, so about 3,000 payments a month. Region us-east-1. List prices were checked on 24 October 2026. **Every figure is an Illustration.** Volumes per payment are assumptions, shown in the table.

| Component | Assumption | Monthly | Pricing page |
|---|---|---|---|
| Network Firewall, 2 endpoints | 730 h x $0.395, plus about 2 GB at $0.065 | $577 | https://aws.amazon.com/network-firewall/pricing/ |
| NAT gateway, 2 | 730 h x $0.045, waived when chained with Network Firewall in the same path | $0 (list $66) | https://aws.amazon.com/network-firewall/pricing/ |
| Public IPv4, 2 Elastic IPs | 730 h x $0.005 | $7 | https://aws.amazon.com/vpc/pricing/ |
| Interface VPC endpoints, 6 services x 2 AZ | 730 h x $0.01 per AZ | $88 | https://aws.amazon.com/privatelink/pricing/ |
| Bedrock model tokens | 20K input and 2K output tokens a payment, at an assumed $3 and $15 per million. Check the chosen model | $270 | https://aws.amazon.com/bedrock/pricing/ |
| AgentCore Runtime | 30 s CPU at $0.1276 per vCPU-hour, 120 s x 2 GB at $0.0169 per GB-hour | $7 | https://aws.amazon.com/bedrock/agentcore/pricing/ |
| AgentCore Gateway | 20 tool calls a payment, $0.005 per 1,000 | $0.30 | https://aws.amazon.com/bedrock/agentcore/pricing/ |
| AgentCore Policy | 60K authorizations at $0.000025 | $1.50 | https://aws.amazon.com/bedrock/agentcore/pricing/ |
| API Gateway REST | About 15K calls | $0.05 | https://aws.amazon.com/api-gateway/pricing/ |
| Lambda | About 50K short invocations | $1 | https://aws.amazon.com/lambda/pricing/ |
| Step Functions Standard | 40 transitions a payment, $0.025 per 1,000 | $3 | https://aws.amazon.com/step-functions/pricing/ |
| Verified Permissions | 9K single requests at $0.000005 | $0.05 | https://aws.amazon.com/verified-permissions/pricing/ |
| DynamoDB on demand, 5 tables, PITR | Under 1 GB | $2 | https://aws.amazon.com/dynamodb/pricing/on-demand/ |
| SageMaker risk score, serverless | 3,000 x 1 s at $0.00004 | $0.12 | https://aws.amazon.com/sagemaker/ai/pricing/ |
| KMS | 8 keys at $1, plus requests | $9 | https://aws.amazon.com/kms/pricing/ |
| Payment Cryptography | 4 keys at $1, plus 6K calls at $2 per 10,000 | $5 | https://aws.amazon.com/payment-cryptography/pricing/ |
| Secrets Manager | 4 secrets at $0.40 | $2 | https://aws.amazon.com/secrets-manager/pricing/ |
| Cognito | Under the Essentials free tier | $0 | https://aws.amazon.com/cognito/pricing/ |
| AppConfig, Systems Manager | Polling and Automation inside free tiers | $1 | https://aws.amazon.com/systems-manager/pricing/ |
| EventBridge | About 30K events | $0.03 | https://aws.amazon.com/eventbridge/pricing/ |
| CloudWatch logs and traces | About 10 GB ingest, plus spans | $20 | https://aws.amazon.com/cloudwatch/pricing/ |
| CloudTrail org trail | First copy of management events free, some data events | $5 | https://aws.amazon.com/cloudtrail/pricing/ |
| S3 evidence, Object Lock | Grows about 0.6 GB a month | $2 | https://aws.amazon.com/s3/pricing/ |
| **Total as drawn** | | **About $1,000 a month** | |
| Option: SageMaker real-time, 2 x ml.c5.xlarge | 730 h x $0.204 x 2 | +$298 | https://aws.amazon.com/sagemaker/ai/pricing/ |
| Option: GuardDuty, Security Hub, Config across 5 accounts | Rough | +$100 to $200 | https://aws.amazon.com/guardduty/pricing/ |
| Not AWS: US account validation | About 100 new or changed payees at $0.50 to $1.50 | $50 to $150 | Partner quote |

**Reading it:** about $12K to $17K a year, or roughly $0.33 to $0.48 a payment. Fixed network cost (firewall, endpoints and IPv4) is about two thirds of the total. Model tokens are the largest variable line.

| ID | Finding | Severity | Evidence | Fix | Owner |
|---|---|---|---|---|---|
| 7.1 | The page's "AWS run a year" default of $60K is 3.5 to 5 times this bottom-up estimate. | Should | Calculator input "AWS run a year $60K". | Use $15K as the default, or keep $60K and label it "includes support, partner fees and headroom". | page |
| 7.2 | The calculator defaults to 72,000 payments a year for 3,000 suppliers. This audit's brief uses 36,000. | Should | Calculator input "Payments a year 72,000". | Choose one basis and state "payments per supplier a month" beside it. | page, doc |
| 7.3 | The saving counts the whole $9.40 invoice cost on payments released by rule, and does not net off checker time (15.8 hours a day). | Should | Calculator note. | Net off checker cost at a stated rate, or call the output "gross saving". | page |

## 8. Latency budget

All values are an Illustration of design targets, not measurements.

| Step | Component | p50 target | p95 target | Note |
|---|---|---|---|---|
| 2 | Agent drafts from the invoice | 15 s | 60 s | LLM time. Off the release path |
| 2 | Gateway policy check | 20 ms | 80 ms | Per tool call |
| 3 | Payment API | 30 ms | 120 ms | REST integration timeout 29 s by default |
| 4 | Signature and mandate verify, nonce write | 40 ms | 150 ms | Lambda plus one DynamoDB conditional write |
| 5 | Payee guard, registry, sanctions | 60 ms | 250 ms | Local |
| 5 | US account check (partner) | 400 ms | 2 s | New or changed payees only |
| 6 | Risk score and Verified Permissions | 80 ms | 400 ms | Serverless cold start adds about 1 s |
| 7 | Release state, revocation read | 100 ms | 400 ms | Standard transitions |
| 8 | Person releases | 30 min | 4 h | Human SLA. Time out at 24 h, see 3.6 |
| 9 | Adapter to bank acceptance | 500 ms | 3 s | Plus RTP settlement in seconds, ACH by window |
| | **Rule release, proposal to bank acceptance** | **about 1 s** | **about 5 s** | Excluding drafting and new-payee checks |
| 12 | Kill switch reaches the gateway | Up to the flag poll interval | | Release reads the revocation list directly, so release stops at once |

| ID | Finding | Severity | Evidence | Fix | Owner |
|---|---|---|---|---|---|
| 8.1 | The kill switch reaches the gateway only as fast as the flag poll, about 45 seconds by default for the AppConfig agent extension. | Should | `kill` to `toolpol`. | State it. Rely on the release-time revocation read as the hard stop. Lower the poll interval for the agent flag. | page |
| 8.2 | Phase B plans a "time to release" counter, with no stated budget. | Should | Plan, live counters. | Use this table, and label the counter Illustration. | page |
| 8.3 | Value date and bank cut-offs dominate real time to cash for ACH. They do not appear in the budget. | Should | Flow step 6 mentions value date. | Add the cut-off to the rail picker drawer. | page |

## 9. Data privacy and residency

**Where each data class lives**

| Data class | Where it sits | Retention | Note |
|---|---|---|---|
| Supplier bank details | Payee registry (DynamoDB), invoices, prompts | Life of the supplier, plus 7 years | Confidential |
| Invoice PDFs and email | Agent runtime input | Not stated | May hold sole-trader personal data |
| Mandates and passkey public keys | Payment core, checker identity provider | 7 years for evidence | Personal data of staff |
| Agent traces | CloudWatch, exported to the evidence bucket | Object Lock period | May contain prompt text |
| Card tokens | CDE subnet, issuer | Per issuer | Tokens only |
| Evidence packs | S3 Object Lock compliance mode | Per record class, see 5.8 | Cannot be deleted early |

| ID | Finding | Severity | Evidence | Fix | Owner |
|---|---|---|---|---|---|
| 9.1 | Agent traces can include prompt text with bank details. They are exported into a compliance-mode Object Lock bucket, where nothing can be deleted before the retention period ends. | Should | `edge-obs-s3`, `pill-s3-1`. | Redact or hash account numbers in traces before export. Keep raw traces in CloudWatch for a short period only. | diagram, page |
| 9.2 | Bedrock cross-Region inference profiles can process prompts in other Regions. A global profile can leave the US. | Should | No model is drawn, see 15.1. | Pin a US geographic profile, or a single-Region model, and say so. | diagram, doc |
| 9.3 | The partner API and the card directories are third-party processors of payee data. | Should | `acctval`, `directory`. | List the processors and their contracts in the doc. | doc |
| 9.4 | Retention is unset for invoices and traces. | Should | Linked to 5.8. | Set it per class. | doc |
| 9.5 | Residency is us-east-1 only. Card scheme directories are global services. | Should | `region`. | State "payment data stays in us-east-1. Directory lookups send public keys and agent IDs only". | page |

## 10. Cross-artifact consistency

| ID | Finding | Severity | Evidence | Fix | Owner |
|---|---|---|---|---|---|
| 10.1 | **The account count differs.** Drawer 11 says "Three accounts under Organizations". The diagram draws four, with a separate Checker account. Drawer 8 says the checker sits in "a separate account". | Must | Drawer 11. `acct-checker` cell. | "Four accounts under Organizations with SCPs: agent runtime, payment core, checker and log archive." | page |
| 10.2 | **The deck predates the round 34 changes.** It says "second person signs off" and "Release rule, maker-checker". It uses the old fence wording "No LLM on the authorisation path" and puts the signature check at the "Agent gateway" edge. | Must | `slides/flow.html` step 5, `slides/build.html`. | Apply the release matrix, the new fence wording, the layered stack and the signer and verifier story. | deck |
| 10.3 | Who catches each failure differs. The deck says Agent for the AI score and "Agent, Person" for reconcile. The page says AI and Rule. | Should | `slides/flow.html` vs the page Flow tab. | Align on the page's wording. | deck |
| 10.4 | The Stablecoin tab says "plus wallet screening", but the diagram has none. | Should | Linked to 5.6. | Draw it. | diagram |
| 10.5 | The idempotency key in Flow step 6 and the sanctions screen in Integrations are not on the diagram. | Should | Linked to 1.5 and 5.1. | Draw them. | diagram |
| 10.6 | The ledger marks C156 (AgentCore Policy GA on 3 March 2026) unverified. The AWS What's New post confirms it. | Should | `claims-ledger.json` C156. | Mark it verified with the AWS URL. | doc |
| 10.7 | C407 says EventBridge supports "ordered delivery". That is true only for the enhanced custom bus (24 September 2026) with a FIFO subscriber and an EventGroupId. | Should | Drawer 11 chip note. | Say "an enhanced event bus with a FIFO subscriber per payment ID". | page, doc |
| 10.8 | The deck shows source IDs on its slides, while pages keep sources in the design doc only. | Should | `slides/*.html` footers. | Confirm whether the deck is exempt. If it is not, move the source IDs to the speaker notes. | deck |

Checked and consistent: the .drawio in `docs/` and `public/` is byte-identical. The page drawers match the diagram narration for steps 2, 5, 7, 9, 9b, 10 and 12. Release matrix cells match between the Verdict, drawer 6 and the diagram, which leaves out the cross-border column. That is acceptable, because cross-border always goes to a person.

## 11. Accessibility (WCAG 2.2 AA) of the animated diagram

**What passes**

- **1.1.1:** the slotted image keeps its alt text, and the overlay is `aria-hidden`.
- **2.1.1:** the diagram box is a focusable scroll region, and the drawers are `details` elements.
- **2.2.2:** Play is started by the user and can be paused.
- **2.3.1:** the ring pulse is 1.1 s, so nothing flashes.
- **2.4.7:** `:focus-visible` has a 3px outline.
- **4.1.3:** `role="status"` and `aria-live="polite"` announce each step.
- **Reduced motion:** read live. The token steps between stops with holds of at least 1.2 s, and dashes and pulses stop.

Also applies: 2.2 (no legend, so 1.4.1 use of colour fails for the meaning of the edges) and 13.1 (text size).

| ID | Finding | Severity | Evidence | Fix | Owner |
|---|---|---|---|---|---|
| 11.1 | "Full size" opens the raw SVG, whose draw.io flow animation runs forever with no pause control (2.2.2). | Should | `.pdd-ar2-full` links `aws-target.svg`, which has `flowAnimation=1` on edges. | Link a static export, or a small HTML wrapper with a pause button that honours reduced motion. | page, diagram |
| 11.2 | If the inline SVG fetch fails, the slotted image keeps animating with no pause. | Should | The `load()` catch leaves the image in place. | Use a static SVG export for the image, with no flow animation. | diagram, page |
| 11.3 | The status line updates every 0.3 to 1 s during Play, which is noisy for screen reader users. | Should | `say()` on every arrival. | Announce only steps that have a drawer, and the end. | page |
| 11.4 | The target alt text is one 90-word sentence. | Could | `img alt`. | A short alt, plus "Steps listed below". | page |

## 12. Diagram standards

The AWS icons page (https://aws.amazon.com/architecture/icons/) permits use of the icons in architecture diagrams and asks for current icon sets. The detailed do's and don'ts ship inside the icon package and were not re-checked online for this audit.

| ID | Finding | Severity | Evidence | Fix | Owner |
|---|---|---|---|---|---|
| 12.1 | Secrets Manager is drawn inside a private subnet. It is a Regional service, not a VPC resource. | Should | `bankcred` sits in `sn-priv-a`. | Move it to the account level, with an edge through a VPC endpoint. | diagram |
| 12.2 | The AgentCore icon is recoloured red for "Gateway policy" and teal for the runtime. AWS service icons should keep their category colour. | Should | `toolpol` fill `#DD344C`, `agent` fill `#01A88D`. | Use the standard colour on both, and tell them apart by label. | diagram |
| 12.3 | Third-party nodes (partner API, banks, card partner, directory) use dark AWS general icons, so they read as AWS services. | Should | `acctval`, `ownbank`, `cardpartner`, `directory`. | Give external nodes a neutral outline style, and keep AWS icons for AWS services. | diagram |
| 12.4 | Short service names (Lambda, DynamoDB) are used throughout. AWS naming uses "AWS Lambda" and "Amazon DynamoDB". The directory label shortens Mastercard to "MC". | Should | Labels. | Full names in the legend or on first use, and spell out Mastercard. | diagram |
| 12.5 | Narration text is 13px, below the 14px floor. It appears only in the .drawio download. | Could | `narr-x1` to `narr-x12`. | Set it to 14px. | diagram |
| 12.6 | Icon size is 90 x 90 everywhere, which meets the 80px minimum. Group shapes for Organizations, Region, account, VPC and subnet follow the AWS style. | Could | Shape list. | None. | diagram |

## 13. Client readability: a CFO and a CISO in 60 seconds

| Reader | What they need in 60 seconds | What the target diagram gives | Verdict |
|---|---|---|---|
| CFO | Who releases money, what share is automatic, cost, loss exposure | Two exit labels. No dollars, release share or cost on the drawing | Fails at diagram level. The Verdict tab and calculator answer it |
| CISO | Trust boundaries, identity chain, keys, egress, evidence | All present, but no legend on the page and text too small to read | Partly passes, after zooming and opening drawers |

| ID | Finding | Severity | Evidence | Fix | Owner |
|---|---|---|---|---|---|
| 13.1 | **Target diagram text is unreadable at default size.** The 4,702-unit drawing renders at about 0.21 scale in a 1,000px box, so 20px labels show at about 4px. Zoom (2,400px) gives about 10px. 14px needs about 3,300px. | Must | `pdd.css`: target `min-width:900px`, zoom `width:2400px`. Label font is 20px in the .drawio. | Default to a simplified layer view (agent, guard, matrix, bank, evidence) with 14px or larger text. Keep the full drawing behind Zoom at 3,300px or more, and Full size. | page, diagram |
| 13.2 | There is no CFO view: no dollars or release share on the drawing. | Should | Target page. | Add a layer-reveal state with "60% released by rule", "$0.33 to $0.48 AWS cost a payment, Illustration" and "Person releases new payees". | page |
| 13.3 | 45 icons and 50 edges are shown at once. | Should | Dump. | Use the planned layer reveal: rails, then adapter, then guard, then agent, then controls. | page |
| 13.4 | The person-release return edge loops around the whole drawing. | Should | `edge-human-checker` route. | Put the checker account next to Release. | diagram |

## 14. Portability and lock-in

| Component | Badge | What moves cheaply | What does not |
|---|---|---|---|
| Cedar policy files | Portable | Cedar is open source. Dogwood adds temporal rules and is a superset of Cedar | The Verified Permissions and AgentCore Policy stores |
| RFC 9421 verifier | Portable | The code | Not applicable |
| Rail adapter (OpenAPI) | Portable | The code | The Lambda packaging |
| Ledger schema | Portable | The schema | DynamoDB access patterns |
| Agent runtime, Release, Rail picker | AWS-bound | Prompts and tools | AgentCore, Step Functions ASL |
| KMS signing key | Not badged | Nothing | The private key cannot be exported |
| Payment Cryptography keys | Not badged | Keys move by TR-31 and TR-34 key exchange | Not applicable |
| AppConfig flags | Not badged | Flag values (OpenFeature) | The service |
| EventBridge events | Not badged | CloudEvents payloads | Rules and subscribers |

| ID | Finding | Severity | Evidence | Fix | Owner |
|---|---|---|---|---|---|
| 14.1 | The signing key cannot leave KMS, so a move off AWS means registering a new key in every scheme directory. | Should | `signer`. | Badge it "AWS-bound, re-register on exit" and add it to the exit plan. | diagram, page |
| 14.2 | Step Functions ASL holds the release logic. It is badged AWS-bound, but no portable form is named. | Should | `release`, `orch`. | Keep the release rules in Cedar, so the workflow only orchestrates. Name Temporal as the generic equivalent. | page |
| 14.3 | The Phase B generic view needs a named equivalent for each AWS node. | Should | Plan. | Map them: KMS to an HSM or Vault, AgentCore to any agent runtime with an MCP gateway, Verified Permissions to the Cedar agent, Step Functions to Temporal, DynamoDB to Postgres, S3 Object Lock to any WORM store, and Network Firewall to an egress proxy. | page, diagram |

## 15. AI risk: NIST AI RMF and agent autonomy controls

**Mapping to the four functions**

| Function | Subcategory | Design element | Status |
|---|---|---|---|
| Govern | 1.1 legal requirements | Section 5 | Gaps listed |
| Govern | 1.6 AI inventory | LLM agent, ML score | The LLM is not drawn, see 15.1 |
| Govern | 2.1 roles and accountability | Shared responsibility strip | Not shown on the page, see 2.2 |
| Govern | 6.1 third-party AI risk | Model provider, agent platform | Not stated, see 15.5 |
| Map | 3.5 human oversight | Release matrix | Met |
| Map | 5.1 impact likelihood and size | Calculator fraud loss | Illustration only |
| Measure | 2.5 validity and reliability | Shadow mode, weeks 6 to 12 | Met in Delivery |
| Measure | 2.7 security and resilience | Prompt injection tests | No red-team gate, see 15.2 |
| Measure | 3.1 tracking emergent risk | Score drift | Not stated, see 15.6 |
| Manage | 2.4 supersede, disengage or deactivate | Kill switch | Met, untested, see 6.5 |
| Manage | 4.1 post-deployment monitoring | Recall playbook, traces | Met |

**Agent autonomy controls**

| Control | Present | Gap |
|---|---|---|
| Tool allowlist and deny on release and vendor master tools | Yes | None |
| Mandate cap and expiry | Yes | None |
| Person releases by matrix | Yes | None |
| Velocity and cumulative value caps per agent | No | See 15.3 |
| Evaluation gate before widening autonomy | No | See 15.2 |
| Criteria for moving a matrix cell from Person to Rule | No | See 15.2 |
| Kill switch at three levels | Yes | Test cadence, see 6.5 |

| ID | Finding | Severity | Evidence | Fix | Owner |
|---|---|---|---|---|---|
| 15.1 | The LLM (Bedrock model) and any guardrails are not drawn. The fence names "no LLM", but the inventory has no LLM node. | Should | Target page. | Add a Bedrock model node inside the untrusted boundary, with a prompt attack guardrail. Name the model version in the evidence pack. | diagram, page |
| 15.2 | There is no evaluation or red-team gate, and no rule for when a cell moves from Person to Rule. | Should | Delivery tab. | Add AgentCore Evaluations, plus a prompt injection test suite, as a gate. Moving a cell needs evidence and the two-approver policy change. | page, doc |
| 15.3 | No velocity or cumulative caps per agent. | Should | `toolpol`. | Use AgentCore Policy temporal (Dogwood) rules: N proposals an hour and a daily value cap per agent (C386). | diagram, page |
| 15.4 | "Model risk falls under SR 26-2" overstates the case for non-banks. | Should | Drawer 6, Verdict. | "If you are a bank, SR 26-2 applies. Otherwise use it as the benchmark." | page |
| 15.5 | Third-party AI risk (the model provider and the agent platform) is not addressed. | Should | Not stated. | Add model retirement notice (C157) and the platform contract to the doc. | doc |
| 15.6 | ML score drift and false-hold rate are not monitored. | Should | `risk`. | Track the hold rate and false holds weekly, and retrain on a trigger. | page |

## AWS behaviour checked online (24 October 2026)

| Claim | Result | Source |
|---|---|---|
| KMS supports Ed25519 signing | Yes, `ECC_NIST_EDWARDS25519` with `ED25519_SHA_512` | https://docs.aws.amazon.com/kms/latest/developerguide/symm-asymm-choose-key-spec.html |
| Task tokens across accounts | Not supported. They must come from the same account | https://docs.aws.amazon.com/step-functions/latest/dg/connect-to-resource.html |
| SendTaskSuccess resource scope | No resource type listed | https://docs.aws.amazon.com/service-authorization/latest/reference/list_awsstepfunctions.html |
| AgentCore Gateway API Gateway target | Same account and Region, public REST endpoint, IAM or API key outbound | https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/gateway-target-api-gateway.html |
| OpenAPI target with SigV4 | Supported through `GATEWAY_IAM_ROLE` with `execute-api` | https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/gateway-building-adding-targets-authorization.html |
| AgentCore Policy GA | 3 March 2026 | https://aws.amazon.com/about-aws/whats-new/2026/03/policy-amazon-bedrock-agentcore-generally-available/ |
| Dogwood temporal policies | Supported in AgentCore Policy, and a superset of Cedar | https://aws.amazon.com/blogs/opensource/introducing-dogwood-runtime-verification-for-ai-agents/ |
| EventBridge ordered delivery | Enhanced custom bus with FIFO subscribers, 24 September 2026 | https://aws.amazon.com/about-aws/whats-new/2026/09/eventbridge-relaunches-custom-event-buses/ |
| NAT charges waived alongside Network Firewall | Yes, in the same Region and path | https://aws.amazon.com/network-firewall/pricing/ |

## Verification pass (24 October 2026)
A second agent tried to refute the technical findings against current AWS docs. None was refuted. These corrections replace the earlier fix text.

| Finding | Verdict | Corrected fix |
|---|---|---|
| 1.1 | Confirmed | No change. If failover moves to a stricter rail band, ask the checker to approve again. |
| 1.2 | Corrected | An Allow for the picker role restricts nobody. Put an explicit Deny on the adapter Lambda and the bank secret, keyed on `aws:PrincipalArn`, in their resource policies. The adapter checks the signed release assertion with `kms:Verify` or a cached public key. |
| 1.3 | Confirmed, wording fixed | The platform signature uses a KMS Ed25519 key (`ED25519_SHA_512`), which fits RFC 9421. The passkey mandate is checked against the WebAuthn public key stored at enrolment, not a KMS key. |
| 1.4 | Corrected | Use an OpenAPI target with `GATEWAY_IAM_ROLE`. The API resource policy names the gateway role ARN, with no `aws:SourceArn`. The endpoint must be public. Turn off "no authorization". |
| 1.5 | Corrected | EndToEndId does not stop a duplicate at the bank. Use a DynamoDB conditional write, use the payment ID as the Step Functions execution name, check payment status before any retry, and send the bank API's idempotency header. EndToEndId is up to 35 characters on RTP and FedNow. ACH needs its own mapping. |
| 1.8 | Confirmed | Task tokens only work in the same account, so the checker assumes a release role in the payment core account. |
| 1.9 | Corrected | Put the SCP on the payment core account, which must not be the management account. A deny in the agent account adds nothing. |

Doc pages checked: Lambda resource policies, KMS Sign, AgentCore Gateway outbound auth, Step Functions task tokens, Organizations SCPs, and the `states.json` service reference.

## Must status after Round 35 (24 October 2026)
Each Must was checked against the built page, the draw.io export and the deck.

| Must | Page | draw.io | Deck | Status |
|---|---|---|---|---|
| 1.1 Rail before release | Rail picker sits before the release policy in Year 1 and Target | Yes, on all pages | n/a | Fixed |
| 1.2 Sending tied to release | Signed release seal on the release to adapter edge, lock on the adapter | Signed release token, release role only | n/a | Fixed |
| 1.3 Signer and verifier | Mandate check in Year 1 and Target, Signing proxy outbound | Yes, "Signature verifier" removed | n/a | Fixed |
| 1.4 Gateway call | "Gateway role only" on Target, OpenAPI target | Yes | n/a | Fixed |
| 1.5 No double pay | Invoice match, Idempotency key with a one-time write | Yes | n/a | Fixed |
| 2.1 Return path | Returns and status path to the event bus, ledger and ERP | Yes, with the R-code exception | n/a | Fixed |
| 2.2 Export furniture | n/a | Legend, shared responsibility strip and steps are in the SVG and PNG | n/a | Fixed |
| 5.1 Sanctions screen | Drawn with the SDN list feed. Hit queue in the drawer. | Drawn with hits to a person | n/a | Fixed |
| 10.1 Four accounts | Yes | Yes | n/a | Fixed |
| 10.2 Deck wording | n/a | n/a | Release matrix wording and Our view highlights on 6 slides, plus Year 1 and Target slides | Fixed, deck version 5 published |
| 13.1 Simple default view | Changed at the owner's request (Round 36): from 1200px up the Full map opens fitted to the panel with no inner scroll. Kept text grows so it still draws at 14px or more, and sub lines, edge labels and side badges move to the tap line. Below 1200px the tab opens on the simple view. Zoom in brings back the scrolling detail view. The Architecture screen may reach 1.9 viewports at 1440 (gate option `--scene-allow=build=arch\|builder+rail=b:1.9`, which also covers the builder reader landing on that tab from a rail link) | n/a | n/a | Fixed, then changed by owner |

The Shoulds 1.8, 1.9 and the kill switch "within a minute" are in the drawers and the draw.io notes.
