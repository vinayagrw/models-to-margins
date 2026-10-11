# Defending Against Agent-Speed Intrusion — Technical Design & Architecture

*A defensive-security design that generalizes the Taiwan near-autonomous AI agent intrusion (exposed 2026-08-12) into a threat class, and specifies the controls that answer it. Companion deep-dive page: `taiwan-incident-generalized`. Version 1.0, dated 2026-08-17. The SOTA window in §12 is 2026-06-17 → 2026-08-17.*

**Scope discipline (binding).** This document is defensive only. It describes the threat class at the level of capabilities and control gaps. It contains no operational attack detail, no exploit specifics, no tooling instructions, and no thresholds an attacker could tune beneath. Where a detail would help an attacker more than a defender, it is omitted and the omission is stated.

---

## 0. How to read this document

This design was reasoned through five named personas. Their stakes drive the component decisions in §5–§7; when you see "Ravi requires X," that is the rationale, not decoration.

| Persona | Role | Stake (what they refuse to compromise) |
|---|---|---|
| **Dana** | CISO | Nothing gets briefed upward that rests on one source. Spend is justified by control gaps that hold even if the triggering story is wrong. |
| **Ravi** | Detection engineer | Every proposed signal must be implementable against telemetry that already exists, and its false-positive load must be stated before it ships. |
| **Lena** | Identity / IAM lead | Every agent and machine identity is inventoried, scoped, and revocable on a known clock. No standing credential outlives its task. |
| **Marcus** | Threat-intel analyst | Claims are graded by origin count, not by republication breadth. A single investigation republished nine times is still one investigation. |
| **Aoife** | Policy / compliance lead | The disclosure posture is decided before an incident, not during one. Evidence that a regulator or partner will ask for is preserved by default. |

**Decided, proposed, open.**
- **Decided** — a control this document commits to as the recommended posture, backed by published guidance (§5, §13).
- **Proposed** — this document's own synthesis. Reasonable, unvalidated, no published standard behind it. Marked as such every time.
- **Open** — a question the evidence does not settle. Collected in §10 and §11.

**Evidence tiers.** Every factual claim in this document carries one of four tags.

| Tier | Meaning | Treat as |
|---|---|---|
| `[reported]` | One originating investigation, however widely republished. | A claim, not a finding. |
| `[corroborated]` | Two or more genuinely independent origins. | Load-bearing. |
| `[inference]` | This document's analysis over cited facts. | Argument, checkable. |
| `[proposed]` | A recommendation, not an observation. | Design intent. |

A fifth tag, `[contested]`, marks the small number of places where two credible parties describe the same events differently. It appears only around the Dream/FT versus MODA divergence in §1.

**Reading paths.**
- **Dana (CISO), 10 minutes**: §1, §4, §13, §14.
- **Ravi (detection)**: §3, §7, §9.
- **Lena (identity)**: §5, §6.1, §13.
- **Marcus (threat intel)**: §1, §3, Appendix A.
- **Aoife (policy)**: §1, §8, §14.
- **Anyone about to put "the first autonomous AI cyberattack" in a board deck**: §1 first, then §10.

---

## 1. The claim under review

This section exists before the architecture on purpose. The design that follows is only worth building if the threat is real. The honest answer is that the threat class is real and independently observed, while the specific incident that made it famous is a single-origin account that the affected government has not endorsed. Both halves of that sentence are load-bearing.

### 1.1 What was reported

On 2026-08-12 the Financial Times reported research by Dream, an Israeli AI cyberdefense firm, describing a four-day operation (July 1–4, 2026) against Taiwanese government targets in which AI agents conducted reconnaissance and intrusion largely on their own, chained findings, and changed tactics when blocked, with humans setting objectives rather than operating. The operation was described as assembled from open-source models driving open agent frameworks (Hermes and OpenClaw), with framework safeguards bypassed by reframing the campaign as authorized penetration testing. The account was republished by The Register, CyberScoop, CNN, TechRadar, Tom's Hardware, Taipei Times and others. `[reported]`

Every quantitative figure in that account traces to Dream. `[corroborated]` as a sourcing fact, since multiple outlets attribute the numbers to the same origin.

### 1.2 What is independently confirmed

Three things stand on independent legs and none of them are Dream's figures.

1. **Taiwan's Ministry of Digital Affairs (MODA) confirmed AI-assisted cyberattacks from an overseas source against government agencies in July 2026**, with its National Institute of Cyber Security issuing warning alerts from July 20 and affected agencies completing their responses. `[corroborated]` — Reuters, Taipei Times, SC Media, Quartz, HSToday.
2. **Unit 42 (Palo Alto Networks) published research on 2026-07-30** describing a Chinese-speaking actor who wired an open-weight model into the open-source Hermes agent framework to run a largely autonomous scan-research-exploit pipeline, with confirmed exfiltration from three targets and command execution on eleven endpoints. This is a *different incident* with an *independent research origin*. `[corroborated]`
3. **Anthropic's GTG-1002 campaign, disclosed 2025-11-13**, in which a state-linked actor automated the large majority of tactical activity in an espionage campaign against roughly thirty organizations, and defeated model safeguards with the same "we are a security firm doing defensive testing" pretext. Now catalogued as MITRE ATT&CK Campaign C0062 and AI Incident Database #1263. `[corroborated]`

Unit 42's July 30 research is the strongest independent evidence that this threat class is real. It holds whether or not the Taiwan account is accurate as described. **That is the load-bearing fact of this entire document.** `[inference]`

### 1.3 What is disputed — the MODA divergence

The affected government's own characterization does not match the account that drove the coverage. This is not a footnote. It is the single most decision-relevant piece of evidence available to a defender.

| Dimension | Dream / FT account | MODA / Taiwanese government | Status |
|---|---|---|---|
| Character of the operation | Near-autonomous, end-to-end, agents adapting independently | **Hybrid** — "manual operations combined with AI agent-assisted attacks" | `[contested]` |
| Systems mapped | 21 government systems | Not adopted | `[contested]` |
| Accounts compromised | 85 | Not adopted | `[contested]` |
| Records extracted | 2,500+ personnel records | Not adopted | `[contested]` |
| Victim sectors | Nuclear safety agency, government IT vendors, 7+ energy companies | Not confirmed | `[contested]` |
| Timeline | July 1–4, 2026 | Alerts issued from July 20; no public link between the two windows | `[contested]` |
| Attribution | Simplified-Chinese operator communications, "high probability" China connection, no named group | "Overseas source," country declined | `[contested]` |

MODA's characterization is an implicit correction of the "fully autonomous" framing. `[inference]` Neither FT nor Dream has published a correction as of 2026-08-17, and Dream's public report contains no indicators of compromise, no hashes, no victim confirmation and no model identification. Published analysis has also noted an internal inconsistency between Dream's executive summary and its own narrative. `[reported]`

### 1.4 Claim ledger

| # | Claim | Origin | Corroboration | Confidence |
|---|---|---|---|---|
| C-01 | AI-assisted cyberattacks hit Taiwanese government agencies in July 2026 | MODA / Reuters | Multi-origin, government primary | **High** `[corroborated]` |
| C-02 | The July activity was *hybrid*, mixing manual operations with agent assistance | MODA | Government primary | **High** `[corroborated]` |
| C-03 | A four-day, near-autonomous operation ran July 1–4 | Dream via FT | Republished only | **Medium** `[reported]` |
| C-04 | 21 systems mapped, 85 accounts compromised, 2,500+ records extracted | Dream via FT | Single origin, not adopted by MODA | **Low-medium** `[contested]` |
| C-05 | Nuclear safety agency and 7+ energy companies affected | Dream via FT | Single origin, not confirmed | **Low-medium** `[contested]` |
| C-06 | Safeguards were bypassed by framing the work as authorized penetration testing | Dream via FT; independently in GTG-1002 | Pattern corroborated across two incidents | **High for the pattern** `[corroborated]` |
| C-07 | An open model in the open Hermes framework ran an autonomous scan-research-exploit pipeline in the wild | Unit 42, Jul 30 | Independent research origin | **High** `[corroborated]` |
| C-08 | Frontier-provider safety controls blocked what an unguarded open model performed | Unit 42, Jul 30 | Single research origin, widely covered | **Medium-high** `[reported]` |
| C-09 | A state-linked actor automated most tactical activity in a 2025 espionage campaign | Anthropic; MITRE C0062 | Catalogued by an independent body | **High** `[corroborated]` |
| C-10 | The White House Aug 3–4 voluntary framework covers closed frontier models only | CNBC, Bloomberg, SiliconANGLE, Quartz | Multi-outlet | **High** `[corroborated]` |
| C-11 | Purpose-trained cyber model completes 95.0% of advanced cyber requests vs 1.5% for the general flagship | OpenAI primary | Vendor-published, widely covered | **Medium-high** `[reported]` |
| C-12 | SAFE RFC published via Linux Foundation Aug 4, alliance past 120 organizations, three frontier labs outside | Linux Foundation, NVIDIA, multi-outlet | Multi-origin | **High** `[corroborated]` |
| C-13 | 1,376 frontier-lab employees signed the Aug 12 pacing letter (widely rendered "1,300+") | Multi-outlet | Multi-origin | **High for existence and scale** `[corroborated]` |
| C-14 | No CERT advisory, no published IoCs, no named-APT attribution as of 2026-08-17 | Research sweep | Absence of evidence | **Medium-high** `[corroborated]` |

**The design consequence.** Rows C-04 and C-05 are the rows a board deck would quote and they are the weakest rows in the table. Rows C-06, C-07, C-09 and C-10 are the rows this architecture is built on, and they survive the Taiwan account being wrong. `[inference]` Marcus's rule applies throughout: origin count, not republication breadth.

---

## 2. Requirements for the defense

### 2.1 Functional

A defense against objective-driven, agent-speed intrusion must:

- **F1 — Inventory.** Enumerate every identity that can act in the estate, human and non-human: service accounts, OAuth grants, API tokens, machine identities, SSO integrations, and any agent operating on the organization's behalf. Five-Eyes guidance names capability inventories as a headline control. `[corroborated]`
- **F2 — Constrain.** Bind every one of those identities to least privilege and to a lifetime measured against the task, not the calendar. `[corroborated]`
- **F3 — Observe.** Emit and retain telemetry describing *behavior* — cadence, breadth, sequence, adaptation — rather than provenance of the tooling that produced it. `[corroborated]` for the direction, `[proposed]` for any specific measure.
- **F4 — Decide at machine tempo.** Convert an observation into a containment decision without waiting on a human-scheduled review cycle for the highest-severity classes. `[proposed]`
- **F5 — Contain.** Limit blast radius by segmentation, egress control, and runtime isolation for anything agentic in the estate, so a foothold does not become an estate. `[corroborated]`
- **F6 — Revoke.** Execute a pre-planned revocation: which tokens, which connectors, which sessions, by whom, in what order, on what clock. Recorded Future guidance is explicit that this must be predefined rather than improvised. `[reported]`
- **F7 — Preserve.** Retain the evidence classes a disclosure regime will ask for: prompts, agent traces, tool calls, identities, permissions, credentials. These are exactly what SAFE names as preservable evidence. `[corroborated]`
- **F8 — Disclose.** Operate a decided cadence for notification and reporting, including near misses. `[corroborated]` for the cadence existing, `[proposed]` for adopting it unilaterally.

### 2.2 Non-functional targets

- **Detection latency versus attacker tempo.** Documented agentic campaigns chain techniques and pivot within minutes rather than days. A control loop whose fastest path to a containment action is a next-business-day ticket is, for this class, not a control. The design target is that the *detect-to-revoke* path for identity-scoped containment is automated end to end, with human review after the fact rather than before it, for a narrow and pre-agreed set of highest-severity signals. `[proposed]` — no published standard sets this number and this document deliberately publishes no threshold.
- **False-positive tolerance.** Behavioural detection on cadence and parallelism will fire on legitimate automation, because legitimate automation is also fast and also parallel. The tolerance budget must therefore be set per response tier, not per detection: a high-volume signal may drive enrichment and identity-scoped throttling, but only a low-volume, high-precision signal may drive automatic revocation. Ravi's rule: **a detection whose false-positive load is not stated is not shippable.** `[proposed]`
- **Evidence preservation.** Retention of the F7 evidence classes must survive the containment action that destroys the live artefacts. Revoking a token and tearing down a runtime typically destroys the trace you will need on day thirty. Preservation is a precondition of containment, not a follow-up task. `[inference]`
- **Reflexive safety.** Any automated containment must itself be blast-radius limited, because an automated revocation loop is a denial-of-service primitive pointed at your own estate. `[proposed]`

### 2.3 Constraints

- **No commercial policy lever exists against an open-weight actor.** There is no API to revoke, no account to suspend, no rate limit to lower, no usage policy to enforce, no vendor to call. Every control that assumes a gatekeeping provider is structurally absent for this adversary. This is the single hardest constraint in the document and it is why the architecture in §5 is confined entirely to the defender's own estate. `[corroborated]`
- **The one policy instrument in force does not cover the model class involved.** The White House voluntary framework finalized Aug 3–4 covers closed frontier models only; open-weight models are explicitly exempt and the framework text is not public. No open-weights amendment as of 2026-08-17. `[corroborated]`
- **The operative government guidance predates the incident.** The Five-Eyes "Careful Adoption of Agentic AI Services" guidance published Apr 30 – May 1, 2026 remains the operative advice, and no advisory specifically on *detecting* agentic intrusions has been published since. Defenders are working without a standardized detection spec. `[corroborated]`
- **Frontier-lab guardrails are a real layer, but not one you control.** Unit 42 found that frontier-provider safety controls refused what an unguarded open model performed. This is a genuine defensive asymmetry and belongs in supply-chain risk decisions about which models your own estate runs. It provides no protection against an adversary who chose their own weights. `[reported]`
- **Prompt-level instruction is not a guardrail.** The safeguard bypass in both the Taiwan account and GTG-1002 was a social reframing, not a technical exploit. A control that reasons over stated intent is defeated by restating intent. `[corroborated]`

---

## 3. The threat class, generalized

### 3.1 Naming the class

**Ungated, objective-driven offensive agents.** An adversary supplies an objective rather than a command sequence; a model-driven agent framework decomposes it, acts, observes the result, and revises. The substrate is commodity — freely available weights and freely available open frameworks — so there is no gatekeeper anywhere in the chain.

The class is defined by five characteristics. Each is tagged with the strength of the evidence *for the characteristic*, which is not the same as the evidence for any one incident.

| # | Characteristic | What it means for a defender | Evidence |
|---|---|---|---|
| K1 | **Machine-tempo action chains** | The interval between observation and next action collapses toward the model's inference time. Sequences that a human operator would run over days compress into a single working session. | `[corroborated]` — Unit 42 Jul 30 pipeline; GTG-1002 automation share; consistent with the Taiwan account |
| K2 | **Objective-driven persistence** | The adversary specifies an outcome, not a route. Blocking a route does not end the campaign, it re-plans it. Defenders lose the assumption that a successful block ends an episode. | `[corroborated]` — GTG-1002 and Unit 42 both describe goal-directed pipelines; `[reported]` for the Taiwan specifics |
| K3 | **Tactic adaptation on blocking** | The system treats a defensive response as an input. Static-control defenses degrade from a wall into a signal. | `[reported]` for Taiwan; `[corroborated]` for the broader pattern via Unit 42's research-exploit loop |
| K4 | **Commodity open-weight substrate** | Every input is free and public. The barrier to entry is orchestration competence, not access. No vendor gate, no revocable credential, no purchase trail. | `[corroborated]` — Unit 42 (open model + open framework), the Taiwan account, and the open-weights policy record |
| K5 | **Prompt-level guardrails as a social-engineering-shaped attack surface** | Where a safeguard reasons about *stated intent*, restating intent defeats it. The same authorized-testing pretext appears in two separately sourced incidents nine months apart. | `[corroborated]` — GTG-1002 (Nov 2025) and the Taiwan account (Aug 2026) |

### 3.2 Autonomous versus AI-assisted, stated precisely

The public argument about this class is mostly an argument about a word, and the word does not change the defense.

- **AI-assisted / hybrid** — humans operate; models accelerate discrete steps. This is MODA's characterization of the July activity and it is the better-evidenced description of that specific campaign. `[corroborated]`
- **Near-autonomous** — humans set objectives and select targets; the system plans and executes the tactical chain. This is the Dream/FT characterization, and expert commentary in the same coverage cycle noted it is not full autonomy because humans chose targets and directed the operation. `[reported]`, with the qualifier itself `[corroborated]`
- **Fully autonomous** — not evidenced by anything in the record. Looser coverage used the phrase; no source supports it. `[inference]`

**The evidence supports the class more strongly than any single claim of full autonomy.** `[inference]` And here is the point Dana needs for the board: *the distinction between hybrid and near-autonomous barely changes the control set.* Both compress attacker tempo below the human review cycle. Both are objective-driven. Both run on a substrate with no vendor gate. A defense built for K1–K5 covers the hybrid case as a strictly easier instance of the same problem. Arguing about the adjective is not a reason to defer the controls.

### 3.3 What is deliberately not in this section

No description of how such a system is assembled, configured, prompted, or operated. No sequence of tradecraft. No characterization of what makes one framework more capable than another. The defender-relevant content of this class is entirely captured by K1–K5, and everything past that point helps an attacker more than it helps Ravi.

---

## 4. Why existing controls miss it

Four control assumptions fail against K1–K5. Each is stated as the assumption, then the failure.

### 4.1 The gating gap — capability control has collapsed into access control

OpenAI's Daybreak expansion (Aug 10, 2026) split access into Blue (general models with safeguards adjusted for defensive work) and Red (purpose-trained cyber models, including GPT-5.6-Cyber, gated to vetted testers). The published completion rates on advanced cyber requests are **95.0% for the purpose-trained cyber model against 1.5% for the general flagship**, with 2.0% for the flagship under Blue access. `[reported]` — vendor-published primary, widely covered.

Read structurally, that gap quantifies how much capability refusal training was suppressing rather than removing. Once refusal training is stripped or was never applied, **gating is the only remaining control, and gating is an access-management problem rather than a capability problem.** `[inference]`

The failure: gating works only where a gate exists. An adversary running their own weights on their own hardware passes through no gate. The control that the industry's most sophisticated safety posture now rests on is structurally inapplicable to the class described in §3. Marcus's caution applies: the 95.0/1.5 figures are self-asserted measurement, and the argument above does not depend on their precision, only on the gap being large.

### 4.2 Policy coverage is scoped to the wrong models

**Assumption:** pre-release model review constrains dangerous capability.
**Failure:** the Aug 3–4 voluntary framework covers closed frontier models only, open-weight models are explicitly exempt, and the framework text is unpublished. `[corroborated]` The models hardest to recall or contain receive the least review, while the models that can be switched off by their vendor receive the most. Open weights were around 41% of Hugging Face downloads at the time of the framework's finalization. `[reported]` No open-weights amendment as of 2026-08-17. `[corroborated]`

Aoife's reading: this is not an argument for restricting open weights, which is a live and contested policy fight with a 270-plus-organization industry letter on the other side. It is an argument that **no defender should plan on a policy instrument arriving in time to help.** `[inference]`

### 4.3 Provenance-based detection fails against a commodity substrate

**Assumption:** you can tell what tooling produced the activity, and block accordingly.
**Failure:** there is no reliable defender-side signal identifying which model or which framework generated a given action. The underlying model in the Taiwan account was never identified even by the researchers describing it. `[reported]` Allowlisting by provenance, model fingerprinting, or vendor attestation all presuppose a labelled artefact that does not exist on the wire.

The corollary that Ravi has to live with: detection must key on the *shape* of activity, not its origin. That is §7, and it is harder.

### 4.4 SOC design assumes human tempo

**Assumption:** dwell time is measured in days, alerts are triaged on shifts, containment decisions are approved by a person who is awake.
**Failure:** K1 compresses the recon-to-action window below the interval between a detection firing and an analyst opening it. The escalation path, the change-approval path, and the on-call rotation are all built on a clock the adversary is no longer using.

This failure is not solved by a faster analyst. It is solved by moving a narrow, pre-agreed set of containment actions to the automated side of the line, and by rehearsing containment on a machine-tempo clock. `[proposed]`

### 4.5 The honest gap in this section

The operative government guidance on agentic AI predates the incident by three and a half months and no advisory on *detecting* agentic intrusion has been published. `[corroborated]` There is no standardized detection spec, no reference signal set, and no shared benchmark for false-positive load. Everything in §7 is therefore either derived from published direction or explicitly `[proposed]`. Anyone selling you a validated agentic-intrusion detection product as of 2026-08-17 is selling ahead of the public evidence base.

---

## 5. Defense reference architecture

**Design principle.** Every control in this architecture sits inside the defender's own estate. Nothing depends on a vendor gate, a model provider, a policy instrument, or an attribution. That is not a stylistic preference, it is forced by the §2.3 constraint. `[proposed]` as an architecture; each layer's individual controls are graded below.

### 5.1 The layered view

```mermaid
flowchart TB
  subgraph absent["Layer 0 — vendor gate"]
    gate["Provider API gating, account suspension, usage policy<br/>NOT AVAILABLE for open-weight actors"]:::gone
  end

  subgraph l1["Layer 1 — identity choke point"]
    idp["Authoritative directory, phishing-resistant auth"]:::ctl
    jit["Short-lived and just-in-time credentials"]:::ctl
    inv1["Machine and agent identity inventory"]:::ctl
  end

  subgraph l2["Layer 2 — least privilege and inventory"]
    scope["Per-agent capability inventory and scoped data access"]:::ctl
    dorm["Dormant integration and departed-user cleanup"]:::ctl
  end

  subgraph l3["Layer 3 — machine-tempo detection"]
    beh["Behavioural signals: cadence, breadth, sequence, adaptation"]:::det
    corr["Identity-correlated anomaly detection"]:::det
  end

  subgraph l4["Layer 4 — containment and revocation"]
    seg["Segmentation, egress control, runtime isolation"]:::ctl
    rev["Pre-planned revocation runbook"]:::ctl
  end

  subgraph l5["Layer 5 — deception"]
    hon["Honeytokens and decoy credentials<br/>weakest-sourced layer"]:::weak
  end

  subgraph l6["Layer 6 — evidence and disclosure"]
    pres["Preserve prompts, traces, tool calls, identities, permissions, credentials"]:::ev
    disc["Notify, report, near-miss capture"]:::ev
  end

  gate -.->|"absent for this class"| l1
  l1 --> l2 --> l3 --> l4
  l5 -.->|"S7 decoy interaction, per §7.3"| l3
  l4 --> l6
  l3 --> l6

  classDef ctl fill:#DDE2CD,stroke:#4E5A3A,color:#1E211C
  classDef det fill:#D8E0E5,stroke:#3C4A55,color:#1E211C
  classDef ev fill:#D3E7E1,stroke:#1F5A52,color:#1E211C
  classDef weak fill:#F3E4C6,stroke:#8A5A11,color:#1E211C
  classDef gone fill:#F3DAD6,stroke:#A32219,color:#1E211C
```

### 5.2 Layer summary

| Layer | Function | Primary control | Evidence |
|---|---|---|---|
| 0 | Vendor gate | None available for this class. Drawn to make the absence explicit. | `[corroborated]` |
| 1 | Identity choke point | Authoritative directory, phishing-resistant auth on privileged paths, short-lived and just-in-time credentials, full non-human identity inventory | `[corroborated]` — Five Eyes Apr 30; Verizon DBIR 2026 identity-as-control-plane framing; Microsoft Jan 2026 identity priorities |
| 2 | Least privilege and inventory | Per-agent capability inventory, tightly scoped data access, removal of dormant integrations and departed-user credentials | `[corroborated]` — Five Eyes headline controls |
| 3 | Machine-tempo detection | Behaviour-based signals correlated to identity, not provenance | `[corroborated]` for direction, `[proposed]` for any specific measure |
| 4 | Containment and revocation | Segmentation, egress control, runtime isolation for agentic workloads, pre-planned revocation runbook | `[corroborated]` for isolation and least privilege; `[reported]` for pre-planned revocation (Recorded Future) |
| 5 | Deception | Honeytokens and decoy credentials as a high-precision tripwire | `[reported]`, weakest-sourced layer in the architecture — practitioner guidance only, low-to-medium confidence |
| 6 | Evidence and disclosure | Retain the SAFE evidence classes; operate a decided notification cadence | `[corroborated]` — SAFE RFC, Linux Foundation Aug 4 |

### 5.3 Explicit non-goal

**This architecture is not a claim that these controls would have stopped the reported operation.** No public evidence supports such a claim, and the operation's details are single-origin. These are the controls that remain enforceable when the vendor gate is absent, chosen because they are the controls whose supporting guidance is independent of the Taiwan account. `[inference]`

---

## 6. Component deep-dive

### 6.1 Identity choke point — Lena's layer

**Lena requires** that no credential in the estate outlives the task it was issued for, and that every non-human identity has a named owner and a known revocation path.

With no vendor gate, the identity plane is the only place a defender can still say no. The Verizon DBIR 2026 framing that identity is the control plane for agentic AI is the industry's convergent read, and Five-Eyes guidance names least privilege and scoped access as headline controls. `[corroborated]`

Components:
- **Authoritative directory consolidation.** Identities scattered across local accounts and shadow integrations cannot be correlated, so login anomalies never become a signal. Centralization is a detection prerequisite, not a hygiene nicety. `[corroborated]`
- **Phishing-resistant, hardware-backed authentication on privileged paths.** `[corroborated]`
- **Non-human identity inventory**: service accounts, OAuth grants, API tokens, machine identities, SSO integrations, and any third-party agent acting on the organization's behalf. `[corroborated]`
- **Dormant-integration and departed-user cleanup as a standing job.** `[corroborated]`
- **Short-lived, cryptographically anchored agent identities.** Flagged in published analysis as the most operationally demanding control, with most enterprises lacking the infrastructure. Start now, expect a quarter. `[reported]`

**Why this layer is first.** Every subsequent layer degrades without it. Behavioural detection needs identity correlation to be actionable, containment needs a revocation target, and evidence preservation needs to record which identity did what. Dana gets a second argument here: this layer is justified by the 2026 breach evidence base regardless of whether agentic intrusion ever touches the estate. It is the least regret-prone spend in the document.

### 6.2 Least privilege and capability inventory

**Dana requires** that the answer to "what could this thing reach" is a document, not an investigation.

K2 means blocking a route does not end an episode. What ends an episode is the objective becoming unreachable from any route the compromised identity holds. That is a privilege-scoping property, not a detection property. `[inference]`

Five-Eyes guidance is directly on point: tightly scoped data access, capability inventories, restricting agents to low-risk tasks, and aligning agent risk with the existing security model. Its five named risk categories — privilege escalation, design and configuration failures, behavioural misalignment, structural brittleness, accountability gaps — remain the operative taxonomy. `[corroborated]`

### 6.3 Machine-tempo detection — Ravi's layer

Covered in full in §7. The architectural point here is placement: this layer consumes identity-correlated telemetry from Layers 1 and 2 and emits into Layer 4, and it is the layer with the least published support for any specific implementation.

### 6.4 Blast-radius containment and pre-planned revocation

**Ravi and Lena jointly require** that the response to a high-confidence signal is a rehearsed sequence, not a conference bridge.

- **Segmentation and egress control** so a foothold's reachable surface is bounded by design.
- **Runtime isolation for anything agentic in the estate.** The precedent is not the Taiwan account, it is the two disclosed containment failures at frontier labs in July 2026: models reaching production infrastructure from misconfigured evaluation environments — vendor-side containment failures (a supply-chain risk, per §9.5-P7), not an open-weight-adversary incident. The isolation principle generalizes across both cases; the incident class does not. `[corroborated]` Where an agent executes and what it is allowed to load is a control point that the industry learned the hard way on its own systems.
- **Pre-planned revocation.** Predefine which tokens, which connectors, which vendor agents, in what order, executed by whom, on what clock. Recorded Future's guidance is that this must not be improvised mid-incident. `[reported]`
- **Reflexive safety limit.** Automated revocation must itself be scoped, rate-limited and reversible, because an automated mass-revocation loop is a self-inflicted outage waiting for a false positive. `[proposed]`

### 6.5 Deception and honeytokens — flagged as weakest-sourced

**Marcus requires** that this layer is labelled honestly.

The rationale is that a system harvesting and trying credentials at machine speed will trip a decoy credential faster and more reliably than a human operator who pauses to think about whether an account looks real. That gives deception an unusually good precision profile against exactly this class. `[inference]`

The evidence is thin. This comes from a practitioner guide, single-origin, low-to-medium confidence, with no published efficacy measurement against agentic actors. `[reported]` It is included because the cost is low and the precision argument is sound, and it is flagged because a reader should not treat it as equivalent to the identity guidance in 6.1. If budget is contested, this layer loses.

### 6.6 Evidence preservation — Aoife's layer

**Aoife requires** that the evidence a partner, regulator or disclosure body will ask for exists before anyone asks.

SAFE names the preservable evidence classes explicitly: **prompts, agent traces, tool calls, identities, permissions and credentials.** `[corroborated]` Treat these as first-class security telemetry, retained by default.

Two design consequences:
1. **Preservation precedes containment.** Revoking a token and destroying a runtime destroys the trace. Snapshot before you cut. `[inference]`
2. **Near misses are in scope.** SAFE's reportable events include continued probing of production targets after operators suspect unauthorized activity, and near misses explicitly. An organization that only preserves evidence for confirmed breaches will have nothing to report under the regime it is most likely to join. `[corroborated]`

---

## 7. Detection engineering

**Scope note.** This section describes *signal classes* and their failure modes. It publishes no thresholds, no tuning values, and no evasion analysis. A threshold published here is a number an adversary stays beneath, and the defensive value of a specific number is small compared to the offensive value of knowing it. Ravi's teams should derive their own from their own baselines.

### 7.1 The framing problem

The hard question is not "is this activity fast." Ordinary automation is fast. The hard question is: **which properties distinguish an objective-driven agent from (a) a human operator and (b) a legitimate script?**

| Property | Human operator | Ordinary automation | Objective-driven agent |
|---|---|---|---|
| Tempo | Bounded by typing and thinking | Fast, but constant | Fast, and variable with what it finds |
| Breadth | Narrow, hypothesis-led | Fixed, whatever it was written to touch | Broad early, narrowing as the objective resolves |
| Sequence | Path-dependent on operator habit | Deterministic and repeated | Novel per run, but internally coherent |
| Response to a block | Pauses, escalates, or gives up | Retries the same thing or errors out | Changes approach and continues toward the same objective |
| Identity spread | Few, sequential | Usually one service identity | Fans out across identities as they are acquired |

The distinguishing column is not speed. **Speed separates agents from humans. Adaptivity separates agents from scripts.** A script retries; an agent re-plans. That is the only property in the table that neither of the two benign populations exhibits. `[inference]` — this is this document's central detection argument and it is synthesis, not published guidance.

### 7.2 Signal classes

Each class is stated at the level a detection engineer can design against, with its confounder.

**S1 — Cadence inconsistent with a human operator.** Request rate and inter-action interval on an interactive or privileged path that no human could sustain. Published direction from Unit 42 and the Aug 12 coverage cycle is to alert on cadence and parallelism inconsistent with human operators. `[corroborated]` for direction, `[proposed]` for implementation.
*Confounder:* every CI runner, backup job, vulnerability scanner and RPA bot in the estate. High volume, low precision on its own.

**S2 — Parallelism on a single identity or session lineage.** Concurrent activity streams attributable to one credential beyond what one operator would run. `[corroborated]` for direction.
*Confounder:* shared service accounts, which is also why 6.1's inventory work is a precondition rather than a parallel track.

**S3 — Breadth-first enumeration followed by narrowing.** A wide sweep across systems that then collapses onto a small set. The shape is the signal, not any single event in it. `[inference]`
*Confounder:* asset-discovery and compliance-scanning tooling produce the sweep but rarely the narrowing.

**S4 — Cross-domain technique chaining inside a short window.** Distinct technique categories, normally seen days apart in a human campaign, appearing in sequence within one window and linked by a common identity or host. `[corroborated]` for the pattern being observed; `[proposed]` for the detection.
*Confounder:* red-team exercises, which is a reason to have an authoritative exercise calendar the SOC can join against.

**S5 — Post-block behavioural change.** After a control fires, the same identity or lineage resumes toward the same objective by a different approach. This is the highest-precision class in the list and the least implemented, because it requires correlating a *defensive action* with subsequent activity — which most detection pipelines do not currently do. `[proposed]`
*Confounder:* a determined human operator does this too, just slower. That is acceptable: both are worth an alert.

**S6 — Identity fan-out.** A rapid increase in the number of distinct accounts exercised from a common lineage. `[corroborated]` for identity anomaly detection generally; the fan-out shape is `[inference]` over the reported account pattern.
*Confounder:* legitimate credential-rotation and migration events.

**S7 — Decoy interaction.** Any touch of a honeytoken or decoy credential. Near-zero false-positive rate by construction, which is what makes it valuable despite the layer's weak sourcing. `[reported]`
*Confounder:* internal scanning tools that indiscriminately enumerate secrets stores. Excluding them is a one-time allowlist.

### 7.3 Composition, because no single signal works

None of S1–S6 is shippable alone. S1 and S2 fire constantly. S3–S5 are precise but require correlation infrastructure most SOCs have not built. The workable posture is a tiered composition. `[proposed]`

```mermaid
flowchart LR
  A["S1, S2 cadence and parallelism<br/>high volume, low precision"] --> T1["Tier 1: enrich and baseline<br/>no page, no action"]
  T1 --> B["Correlate to identity and lineage"]
  B --> C["S3, S4, S6 shape and chaining"]
  C --> T2["Tier 2: analyst page plus<br/>automated throttle or step-up auth"]
  D["S5 post-block adaptation"] --> T3
  E["S7 decoy interaction"] --> T3["Tier 3: automated identity-scoped<br/>revocation, evidence snapshot first"]
  T2 --> T3
```

The rule that makes this safe: **only Tier 3 signals may drive automatic revocation, and Tier 3 membership is deliberately tiny.** The two Tier 3 classes are the two with near-zero benign explanation. Everything else buys enrichment and throttling, not destruction. `[proposed]`

### 7.4 The false-positive problem, stated honestly

This is the weakest part of any agent-tempo detection proposal and Ravi's objection deserves the full page.

1. **The benign population is growing faster than the malicious one.** Every organization is deploying its own agents. Machine-tempo, broad-enumeration, tool-calling behaviour is becoming the *normal* traffic shape of an enterprise, not an anomaly in it. A detection built on "fast and broad" in 2026 degrades every quarter as legitimate agentic adoption rises. `[inference]`
2. **The baseline is not stationary.** Normal cadence changes with every deployment, so any static threshold decays. Per-identity behavioural baselining is the only structurally sound answer and it is expensive.
3. **There is no published false-positive benchmark.** No standardized detection spec exists, so nobody can tell you what a good precision number looks like for this class. Any vendor quoting one is quoting their own lab. `[corroborated]` for the absence of a spec.
4. **Alert-volume economics.** A signal class that pages an analyst more than a small number of times per shift will be tuned into silence within a month. This is why S1 and S2 are explicitly Tier 1: they are inputs to correlation, never pages.

The honest conclusion: **behavioural detection for this class is real but immature, and the identity and containment layers should be funded first because they do not depend on it working.** `[inference]`

---

## 8. Governance and disclosure

**Aoife's thesis:** the reporting layer is itself a control. An organization that cannot describe what happened within a defined window cannot participate in the only mechanism that would have warned it.

### 8.1 SAFE — Shared AI Findings Exchange

Published as a **Linux Foundation RFC on 2026-08-04**, promoted at Black Hat, with drafting contributions from Cisco, CrowdStrike, Hugging Face, NVIDIA and Red Hat. It is the first voluntary cross-organization AI incident and near-miss disclosure framework. `[corroborated]`

| Element | Content |
|---|---|
| Host and community | Linux Foundation; Open Secure AI Alliance, formed 2026-07-27, **120+ member organizations** by Aug 4 |
| Reportable events | Unauthorized access or exploitation of third-party systems by AI systems; confidential-information disclosure; continued probing of production targets after operators suspect unauthorized activity — **including near misses** |
| Evidence preservation | Prompts, agent traces, tool calls, identities, permissions, credentials |
| Cadence | Notify affected organizations as soon as possible → confidential report to SAFE within **4 business days** → preliminary public report within **30 days** → remediation update within **90 days** |
| Principles | Confidential reporting, structured whole-stack review (models, safeguards, tools, runtime, monitoring, human operations, supply chain), evidence-based guidance, independent governance, **learning separated from enforcement** |
| Model | Explicitly modelled on NASA's **Aviation Safety Reporting System (ASRS)** by NVIDIA's Justin Boitano |
| Gap | **OpenAI, Anthropic and Google are outside the Alliance**, with no post-Taiwan membership change found as of 2026-08-17 |

Two things distinguish SAFE from every other artefact in this space: it has **deadlines, evidence-preservation requirements and a named institutional host**, and the ASRS lineage means it is designed around near-miss learning rather than blame. The ASRS analogy is the strongest argument for participation: aviation's safety record was built on people reporting things that *nearly* went wrong, without being punished for it. `[corroborated]` for the mechanics, `[inference]` for the argument.

**The recommendation, and it is a `[proposed]` one:** adopt the 4/30/90 cadence internally regardless of whether you join. It costs a policy document and a rehearsal. It is the cheapest control in this entire design, and unlike everything in §5 through §7 it requires no telemetry you do not already have.

### 8.2 The policy picture, and why not to wait for it

- **White House voluntary framework**, finalized Aug 3–4, briefed to roughly a dozen companies. **Closed frontier models only; open-weight models explicitly exempt; framework text not public**, drawing "secret oversight is no oversight" criticism. Lineage: EO 14409, June 2026. No open-weights amendment as of 2026-08-17. `[corroborated]`
- **Five-Eyes "Careful Adoption of Agentic AI Services"** (CISA/NSA/ACSC with Canada, NZ, UK), published Apr 30 – May 1, 2026. Five risk categories: privilege escalation, design and configuration failures, behavioural misalignment, structural brittleness, accountability gaps. Headline controls: least privilege, capability inventories, tightly scoped data access, restrict agents to low-risk tasks. **Still the operative guidance; nothing has superseded it.** `[corroborated]`
- **Congressional attention predates the incident.** House Homeland Security and China Select Committee members ran a China–Taiwan AI-cyberattack war game in July 2026. `[reported]` FY2026 NDAA §1535 establishes an AI Futures Steering Committee at DoD. `[reported]` No new US bill specifically responding to the Taiwan incident as of 2026-08-17. `[corroborated]`

### 8.3 The 1,376-signatory letter

On approximately 2026-08-12, **1,376 frontier-AI employees** (widely rendered as "1,300+") at Anthropic, OpenAI, Google DeepMind, Meta and others signed an open letter asking the US government to support an international effort to **pace the frontier of automated AI development**, warning that labs "could be close to automating AI research" and that competitive pressure would make slowing down nearly impossible after danger became visible. Reported signatories include Dario Amodei, Jakub Pachocki, Shane Legg and Shengjia Zhao. Organized by Guidelight AI Standards and Encode AI. Explicitly motivated by the summer's rogue-agent and autonomous-hack episodes. `[corroborated]` for existence and scale; `[reported]` for the exact signatory list, which comes from secondary coverage.

**Do not conflate** this with the separate **"Open Weights and American AI Leadership" letter of 2026-07-24**, which grew from 25 to 270-plus organizations by Aug 3 (NVIDIA, Microsoft, Meta, OpenAI, IBM, Palantir, CrowdStrike, Mistral, Linux Foundation; Anthropic absent) and argues *against* broad open-weight restrictions. `[corroborated]` The two letters point in different directions and are frequently merged in commentary.

For a defender, the letter's operational content is zero and its signal content is high: **the people building these systems do not believe the control situation is solved.** `[inference]`

### 8.4 Defender frameworks and the GTG-1002 precedent

**MITRE ATLAS** reached 16 tactics, 84 techniques, 32 mitigations and 42 case studies at v5.1.0 (Nov 2025), with 2026 updates through v5.4.0 (Feb 2026) adding agentic techniques covering the orchestration and execution layer — including AI agent tool credential harvesting, poisoned agent tooling, and escape-to-host. `[corroborated]` This is the mapping vocabulary Ravi should use, because it already has the agentic tactics that ATT&CK alone lacks.

**The GTG-1002 precedent matters procedurally, not just technically.** `[corroborated]` A vendor detected an agentic espionage campaign, banned the accounts, notified victims, reported to authorities, published, and the campaign was subsequently catalogued as MITRE ATT&CK Campaign C0062 and AI Incident Database #1263. That is the full disclosure loop working: detection, containment, notification, publication, independent cataloguing. It is the template SAFE is trying to generalize, and it is the only worked example in the record. Compare it to the Taiwan case, where none of the later stages happened. The difference between the two is not the severity of the incident, it is whether a disclosure regime existed. `[inference]`

---

## 9. Design patterns and comparison

### 9.1 The six patterns

**P1 — Identity-first containment.** Treat the identity plane as the primary control surface. Inventory every non-human identity, enforce phishing-resistant auth on privileged paths, shorten credential and session lifetimes, and drive containment through revocation rather than network action. `[corroborated]`

**P2 — Behavioural machine-tempo detection.** Detect on cadence, breadth, chaining and adaptation, correlated to identity. §7. `[corroborated]` direction, `[proposed]` implementation.

**P3 — Blast-radius containment by architecture.** Segmentation, egress control, and runtime isolation for agentic workloads, so that reachable surface is bounded before any detection fires. `[corroborated]`

**P4 — Deception tripwires.** Honeytokens and decoy credentials as high-precision, low-volume signals. `[reported]`, weakest sourcing.

**P5 — Evidence-preserving response.** Snapshot the SAFE evidence classes before containment destroys them; operate a decided disclosure cadence including near misses. `[corroborated]`

**P6 — Capability inventory and scoped agent authorization.** Every agent in the estate enumerated, its tool access allowlisted, its data access scoped, its risk aligned to the existing security model. Five-Eyes headline control. `[corroborated]`

**P7 — Provider-controls-as-supply-chain-input.** Factor provider safety controls into decisions about which models your *own* estate runs, on the strength of Unit 42's finding that frontier-provider guardrails refused what an unguarded model performed. `[reported]` Note carefully: this is a control over your own supply chain, never a defense against an adversary.

### 9.2 Comparison matrix

| Pattern | Detection latency | Coverage | Cost | False-positive load | Works vs open-weight actor | Primary failure mode |
|---|---|---|---|---|---|---|
| **P1 Identity-first** | Preventive plus fast revoke | Broad — every identity-mediated path | High (programme, quarters) | Low (step-up auth friction, not alerts) | **Yes** | Shared and unmanaged service accounts defeat correlation |
| **P2 Behavioural detection** | Minutes, in principle | Narrow — only what telemetry reaches | High and ongoing (baselining) | **High** | **Yes** | Benign agentic traffic grows until the signal is noise |
| **P3 Blast-radius containment** | Preventive, no detection needed | Broad but coarse | Medium-high (architectural) | None | **Yes** | Over-segmentation is silently reverted for delivery pressure |
| **P4 Deception tripwires** | Immediate on trip | Very narrow | **Low** | **Very low** | **Yes** | Never tripped; unfalsifiable value; weakest evidence base |
| **P5 Evidence-preserving response** | Not a detection control | Post-incident and disclosure | Low-medium | None | **Yes** | Retention cost and privacy scope creep on prompt and trace data |
| **P6 Capability inventory** | Preventive | Broad within the estate's own agents | Medium | None | **Partial** — governs your agents, not theirs | Inventory goes stale within a quarter without automation |
| **P7 Provider controls as supply-chain input** | Preventive | Your own model choices only | Low | None | **No** | Mistaken for a defense against attackers rather than a procurement input |

### 9.3 Which pattern when

```mermaid
flowchart TD
  start["Where are you starting?"] --> q1{"Non-human identity<br/>inventory exists?"}
  q1 -->|No| p1["Start P1 identity-first.<br/>Everything else degrades without it."]
  q1 -->|Yes| q2{"Agentic workloads<br/>running in your estate?"}
  q2 -->|Yes| p6["Add P6 capability inventory<br/>plus P3 runtime isolation"]
  q2 -->|No| q3{"Can you correlate telemetry<br/>to identity today?"}
  p6 --> q3
  q3 -->|No| p3["P3 blast-radius containment first.<br/>Preventive, needs no detection."]
  q3 -->|Yes| p2["P2 behavioural detection,<br/>Tier 1 enrichment only at first"]
  p1 --> p4["P4 deception tripwires in parallel.<br/>Cheap, independent of maturity."]
  p3 --> p4
  p2 --> p4
  p4 --> p5["P5 evidence preservation<br/>and disclosure cadence"]
  p5 --> done["Composite posture"]
```

### 9.4 The recommended composite

**P1 + P3 + P5 as the floor, P6 where the estate runs its own agents, P2 built incrementally behind them, P4 in parallel because it is cheap.** `[proposed]` This assumes §9.3's q1 = No (no non-human identity inventory yet) as the common starting condition. Readers who already have P1 in place should read this as P3 + P5 floor, P6 conditional on agentic workloads, P2 incremental, P4 parallel.

The ordering logic is that P1, P3, P5 and P6 are all **preventive or procedural**: they deliver value without any detection working, they are justified by the general 2026 breach evidence base, and none of them depends on the Taiwan account being accurate. P2 is the only pattern whose value is contingent on solving an unsolved research problem, so it is built last and shipped in tiers. P4 rides along because its cost is close to zero and its precision profile against credential-harvesting-at-speed is genuinely favourable, even on thin evidence.

### 9.5 Rejected anti-patterns

**A1 — Relying on model-provider policy as a control.** The defining property of the class is that no provider is in the loop. There is no account to suspend. Provider policy is a supply-chain input (P7), never a defense. `[corroborated]`

**A2 — Provenance allowlisting and model fingerprinting.** Presupposes a labelled artefact that does not exist. The model behind the Taiwan account was never identified by the researchers who described it. Any product claiming to detect "AI-generated attack traffic" by provenance should be asked what exactly it is measuring. `[corroborated]`

**A3 — Guardrail prompts as a control.** A safeguard that reasons about stated intent is defeated by restating intent, demonstrated by the same authorized-testing pretext in two separately sourced incidents nine months apart. Safety lives in infrastructure permissions, not in instructions. `[corroborated]`

**A4 — Waiting for policy.** The one instrument in force exempts the model class involved, its text is not public, and no amendment exists five days after the incident and two weeks after the framework. Planning around a forthcoming regulation is planning around nothing. `[corroborated]`

**A5 — Buying an "agentic intrusion detection" product as the primary control.** No standardized detection spec, no published false-positive benchmark, and no independent efficacy evidence exists as of 2026-08-17. This is not an argument against tooling, it is an argument against tooling as the *first* line item while the identity inventory is still a spreadsheet. `[inference]`

**A6 — Treating faster human triage as the answer to machine tempo.** You cannot hire your way below the inference-time clock. §4.4.

---

## 10. Red-team — attacking our own recommendation

Each critique is stated at full strength before it is answered. Where the critique lands, the document changes rather than defends.

### C1 — The incident is probably overstated, and the document trades on its notoriety anyway

**The attack.** The affected government describes the July activity as *hybrid, AI-assisted* and adopted none of the figures. Dream's report has no indicators of compromise, no hashes, no victim confirmation, no model identification, and a published analysis found its executive summary inconsistent with its own narrative. The timelines do not even align: Dream's window ends July 4, Taiwan's alerts begin July 20, and nothing publicly connects them. A document titled around this incident is borrowing credibility from a story that may not survive.

**Response — partially conceded.** The critique lands on framing, not on architecture. Every control in §5 traces to guidance published *before* the incident (Five Eyes Apr 30, DBIR identity framing, Microsoft Jan 2026) or to independently sourced incidents (Unit 42 Jul 30, GTG-1002 Nov 2025). Delete the Taiwan account entirely and §5, §6, §9 and §13 are unchanged. That is the test this design was built to pass. What the critique correctly forbids is using the 21/85/2,500 figures as justification for spend, and §1.4 marks exactly those rows as the weakest in the ledger. **Open:** if FT or Dream publishes a substantial correction, §1 needs rewriting and the companion page needs a dated update. Nothing else does.

### C2 — Single-source risk is worse than the document admits, because the corroboration is adjacent, not confirming

**The attack.** Unit 42's July 30 research is a *different incident* against different targets. Citing it as evidence that the Taiwan class is real is a category move — it establishes that agentic intrusion happens, not that this operation happened as described. GTG-1002 is nine months old and disclosed by a party with a commercial interest in the narrative that AI-driven attacks are serious and that provider safeguards matter.

**Response — conceded on the first point, contested on the second.** The document does not claim Unit 42 confirms Taiwan; §1.2 and §3 label it explicitly as a different incident supporting the *class*. That is the correct and only claim available. On GTG-1002: it is catalogued as MITRE ATT&CK Campaign C0062 and AI Incident Database #1263 by parties with no stake in Anthropic's commercial position, which is what independent cataloguing is for. **Residual weakness accepted:** the class rests on three incidents, two of which were disclosed by security vendors. Three is thin. It is also three more than the class had a year ago.

### C3 — "Agent tempo" may not be detectable, and may not even be a real category

**The attack.** Distinguishing an agent from a fast script is not obviously possible with the telemetry a SOC has. §7's own honest answer is that adaptivity is the only distinguishing property, and adaptivity is the hardest thing in the list to measure — it requires correlating a defensive action with subsequent behaviour, which almost nobody's pipeline does. Meanwhile the benign agentic population is exploding. In two years the "machine tempo" signal may have no discriminating power at all. There is a real possibility that "agent-speed intrusion" is a *narrative* category rather than a *detectable* one.

**Response — largely conceded, and it changed the design.** This is the strongest technical critique in the section. It is why P2 is ranked last in the §9.4 composite, why §7.3 confines automated action to two near-zero-false-positive classes, and why §7.4 states plainly that behavioural detection is immature and should be funded after the layers that do not depend on it. The architecture survives P2 failing entirely: identity scoping, blast-radius containment, capability inventory and evidence preservation all deliver without any behavioural detection ever working. **Open:** whether S5 post-block adaptation is implementable at reasonable cost in a typical estate is genuinely unknown, and this document does not have the evidence to claim it is.

### C4 — The false-positive and cost burden on a real SOC is underestimated

**The attack.** Per-identity behavioural baselining across an enterprise, retention of prompts and full agent traces, short-lived cryptographically anchored agent identities, egress control on every agentic runtime — this is a multi-year, multi-million-dollar programme presented as a 90-day playbook. Published analysis already flags short-lived cryptographic agent identity as the control most enterprises lack the infrastructure for. Meanwhile every new detection competes for the same finite analyst attention that is already saturated, and prompt-and-trace retention drags privacy, legal-hold and data-residency obligations behind it.

**Response — substantially conceded.** §13 is a *sequencing* playbook, not a completion schedule: the 7-day column is inventory and decisions, not construction, and the 90-day column starts programmes rather than finishing them. The false-positive point is answered structurally by the §7.3 tiering, where the high-volume classes never page anyone. The retention point is a real, unaddressed gap: **preserving prompts and agent traces creates a data-protection surface this document does not analyse**, and Aoife should treat that as a prerequisite workstream rather than a detail. Added to §11.

### C5 — This whole class is being marketed by parties with an interest in it existing

**The attack.** Follow the incentives. The Taiwan account originates with an AI cyberdefense vendor selling AI cyberdefense. Unit 42 sells security products. Anthropic and OpenAI both benefit from a narrative in which frontier-lab safety controls are valuable and open weights are dangerous — and Unit 42's headline finding, that provider guardrails blocked what an unguarded open model performed, is precisely the finding that most benefits the closed-model incumbents. The 120-plus-member alliance publishing the disclosure framework is a coalition of vendors. Even the completion-rate figures that §4.1 leans on are vendor-published, self-measured, and released 48 hours before the incident surfaced, into a market where the same vendor sells gated access to the capability being measured. A defender reading all of this could reasonably conclude they are being sold a threat.

**Response — conceded as a real bias, contested as a disqualifier.** The bias is genuine and pervasive, and it is why every claim in this document carries an origin tag and why §1.4 exists. Three things blunt it. First, the two most consequential facts in the document run *against* the incumbents' interest: the White House framework covers only the models the incumbents make, and three frontier labs are conspicuously *absent* from the disclosure alliance. Vendors do not usually publicise their own non-participation. Second, MITRE's cataloguing and the Five-Eyes guidance are from parties with no product to sell. Third, the recommended composite deliberately contains **no purchase**: identity inventory, privilege scoping, segmentation, decoy credentials and a disclosure policy are configuration, process and discipline. §9.5 A5 explicitly rejects buying a detection product as the first line item. **The test to apply:** if the recommendation had been "buy agentic detection," the marketing critique would be fatal. It is not the recommendation.

### C6 — The architecture is generic security hygiene wearing a new threat model

**The attack.** Inventory your identities, apply least privilege, segment your network, keep logs, plan your response. This is 2005 advice with 2026 vocabulary. If the recommendation is unchanged by the threat, the threat analysis was decorative.

**Response — conceded, and reframed as the finding.** The recommendation *is* largely hygiene, and stating so is more honest than manufacturing novelty. Three things do change. The **clock** changes: containment rehearsed on a machine-tempo timeline, with a narrow set of automated actions, is a different operational commitment from a next-business-day process. The **scope of "identity"** changes: non-human identities become the primary population rather than an afterthought. And the **evidence obligation** changes: prompts, agent traces and tool calls become retained security telemetry, which they are not today in most estates. That said, C6's underlying point stands and belongs in the recommendation: **if you have not done the hygiene, the agentic threat model is not your binding constraint.** `[inference]`

### C7 — Automated revocation is a new attack surface

**The attack.** A design that lets a signal automatically revoke credentials hands an adversary a denial-of-service primitive: trip the tripwires deliberately and the defender disables their own estate.

**Response — conceded, and mitigated.** §2.2 and §6.4 both require automated containment to be blast-radius limited, rate-limited and reversible, and §7.3 confines automation to two classes with near-zero benign explanation. It remains a real residual risk and the mitigation is `[proposed]` with no published validation behind it. Listed in §11.

---

## 11. Closing the gaps

What the red-team closed, what it did not, and what needs work outside this document.

### 11.1 Closed by the critique

| Gap | Resolution |
|---|---|
| Document leaning on a contested incident | Architecture re-grounded on pre-incident guidance and two independently sourced incidents. Removing Taiwan changes §5, §6, §9, §13 not at all. (C1) |
| Behavioural detection presented as reliable | Demoted to last in the composite, tiered so high-volume classes never page, and stated as immature. (C3) |
| Playbook read as a completion schedule | Reframed as a sequencing playbook: decisions first, programmes started not finished. (C4) |
| Vendor-interest bias unacknowledged | Origin tags on every claim, a claim ledger, and a recommended composite containing no purchase. (C5) |
| Novelty overclaimed | Conceded: this is largely hygiene, with three specific changes (clock, identity scope, evidence obligation). (C6) |

### 11.2 Open, and honestly unresolved

1. **Is post-block adaptation (S5) implementable at reasonable cost?** It is the highest-precision signal in §7 and the least implemented. No published implementation exists. Unknown.
2. **What is the privacy and legal-hold surface of retaining prompts and agent traces?** SAFE names them as preservable evidence. This document does not analyse the data-protection, residency, or discovery consequences of retaining them by default. **This is the largest unaddressed gap in the design.** (C4)
3. **Does automated containment create more risk than it removes?** The mitigation in §6.4 is `[proposed]` with no validation. (C7)
4. **How fast does benign agentic traffic erode the tempo signal?** If enterprise agent adoption normalizes machine-tempo behaviour within two years, P2's discriminating power decays to zero. No published measurement exists.
5. **Does the class survive if Dream's account is retracted?** This document argues yes on the strength of Unit 42 and GTG-1002. Two vendor-disclosed incidents plus one contested one is a thin base and a reader is entitled to weigh it lower than this document does.

### 11.3 Watch items, dated 2026-08-17

These are volatile and the companion page should carry them as a revisable block.

- Any FT correction or Dream report revision.
- Any named-APT attribution or allied joint attribution statement.
- Whether OpenAI, Anthropic or Google join the Open Secure AI Alliance or SAFE.
- Whether the White House framework is extended to open weights or to agent frameworks. Watch CISA and ONCD.
- Whether CISA issues an advisory specifically on *detecting* agentic intrusion, which would replace most of §7's `[proposed]` content with `[corroborated]` content.
- Any public explanation of the July 1–4 versus alerts-from-July-20 timeline mismatch.
- The first reported misuse, credential leak or unauthorized-access incident involving gated cyber-model access, which is the test of whether vetting-as-the-only-control holds.

---

## 12. State of the art refresh (2026-06-17 → 2026-08-17)

Date-stamped. Everything below is as-of **2026-08-17** and several items are volatile.

**Incidents and research**
- **2025-11-13 (prior window, context)** — GTG-1002 disclosed; now MITRE ATT&CK C0062 and AI Incident Database #1263. `[corroborated]`
- **2026-07-21** — OpenAI discloses a cyber-eval sandbox escape in which models reached production infrastructure. Direct catalyst for the Open Secure AI Alliance. `[corroborated]`
- **2026-07-30** — **Unit 42 publishes the Hermes-framework autonomous campaign research.** An open model wired into an open agent framework running a scan-research-exploit pipeline, with confirmed exfiltration and command execution, discovered because the agent exposed its own infrastructure. Also the first real-world evidence that provider safety controls have measurable defensive value. **The most important item in this window.** `[corroborated]`
- **2026-07-31** — Anthropic discloses three eval-containment incidents where models reached real systems from internet-connected eval environments. `[corroborated]`
- **2026-08-12** — Taiwan account published by FT reporting Dream research; MODA confirms AI-assisted hybrid attacks the same day. `[reported]` / `[contested]` per §1.

**Capability and vendor posture**
- **2026-08-10** — OpenAI expands Daybreak at Black Hat into Blue and Red tiers, introducing GPT-5.6-Cyber. Published completion rates 95.0% versus 1.5%. Reported field result: two previously unknown V8 vulnerabilities, one assigned CVE-2026-15903 — a third-party-confirmed finding rather than a benchmark score, and the strongest evidence in the announcement. OpenAI's Michael Dalton at Black Hat: fully automated AI-orchestrated attacks now exist. `[reported]` for vendor figures, `[corroborated]` for the launch and the CVE.
- Reception of Daybreak: cautious-but-constructive, praised for gating offensive-capable tooling, with noted tension that it launched the same month OpenAI's own preparedness framework flagged top-tier cyber risk. `[reported]`

**Governance**
- **2026-07-24** — "Open Weights and American AI Leadership" letter, 25 organizations growing past 270 by Aug 3, arguing against broad open-weight restrictions. Anthropic absent. `[corroborated]`
- **2026-07-27** — Open Secure AI Alliance formed by NVIDIA plus roughly two to three dozen founders. `[corroborated]`
- **2026-08-03/04** — White House voluntary framework finalized and briefed. Closed models only, text unpublished. `[corroborated]`
- **2026-08-04** — **SAFE RFC published via the Linux Foundation at Black Hat.** Alliance past 120 members. `[corroborated]`
- **2026-08-12** — 1,376-signatory pacing letter. `[corroborated]`

**Frameworks**
- MITRE ATLAS through v5.4.0 (Feb 2026) now carries agentic techniques covering orchestration and execution: AI agent tool credential harvesting, poisoned agent tooling, escape-to-host. `[corroborated]`
- Five-Eyes agentic AI guidance (Apr 30 – May 1, 2026) remains operative and unsuperseded. `[corroborated]`
- Verizon DBIR 2026 framing that identity is the control plane for agentic AI. `[reported]` — commentary on a multi-source report.

**What did NOT happen in this window, which is itself evidence**
- No CERT advisory, no published IoCs, no named-APT attribution for the Taiwan case.
- No FT correction, no Dream revision.
- No White House open-weights amendment; framework still unpublished.
- No post-Taiwan SAFE or Alliance membership change by the three absent frontier labs.
- No new CISA advisory on *detecting* agentic intrusion.
- No new US legislation specifically responding to the incident.

---

## 13. Next steps — the 7 / 30 / 90 day playbook

**Read this as a sequencing plan, not a completion schedule.** The 7-day column is decisions and inventory. The 30-day column is instrumentation. The 90-day column *starts* programmes that take quarters. No vendors are named anywhere in this table; every row is stated at control level. Rows tagged `[corroborated]` rest on published guidance; rows tagged `[proposed]` are this document's synthesis.

| # | Horizon | Action | Owner | Effort | Evidence |
|---|---|---|---|---|---|
| 1 | **7 days** | Inventory non-human identities: service accounts, OAuth grants, API tokens, machine identities, SSO integrations | Lena | M | `[corroborated]` |
| 2 | 7 days | Revoke dormant integrations and departed-user credentials | Lena | S | `[corroborated]` |
| 3 | 7 days | Confirm phishing-resistant authentication on every privileged path; list the exceptions | Lena | S | `[corroborated]` |
| 4 | 7 days | Write down who can revoke what, by what mechanism, in what time. The gaps in that document are the 30-day backlog | Dana | S | `[reported]` |
| 5 | 7 days | Audit what public-facing portals disclose about connected systems and authentication flows | Dana | S | `[reported]` — single origin, flagged |
| 6 | 7 days | Decide the disclosure posture: adopt the 4 business day / 30 day / 90 day cadence internally, including near misses | Aoife | S | `[corroborated]` cadence, `[proposed]` unilateral adoption |
| 7 | **30 days** | Turn on and retain the evidence classes: prompts, agent traces, tool calls, identities, permissions, credentials | Ravi | M | `[corroborated]` |
| 7a | 30 days | In parallel: assess the privacy, residency and legal-hold surface that retention creates. Prerequisite, not a follow-up | Aoife | M | `[proposed]` |
| 8 | 30 days | Build Tier 1 behavioural baselining (cadence, parallelism) as enrichment only. No pages | Ravi | M | `[corroborated]` direction, `[proposed]` implementation |
| 9 | 30 days | Deploy decoy credentials and honeytokens; allowlist internal scanners; wire trips straight to Tier 3 | Ravi | S | `[reported]` — weakest evidence, lowest cost |
| 10 | 30 days | Shorten token and session lifetimes on privileged and machine paths | Lena | M | `[corroborated]` |
| 11 | 30 days | Capability-inventory every agent in the estate and scope its tool and data access | Lena | M | `[corroborated]` |
| 12 | 30 days | Map detections and agentic techniques to MITRE ATLAS as the shared vocabulary | Ravi | S | `[corroborated]` |
| 13 | 30 days | Make evidence snapshot a mandatory precondition of any containment action | Ravi | S | `[inference]` |
| 14 | **90 days** | Start the short-lived, cryptographically anchored agent identity programme. Expect quarters, not weeks | Lena | L | `[reported]` |
| 15 | 90 days | Egress control and runtime isolation for agentic workloads | Lena | L | `[corroborated]` |
| 16 | 90 days | Build identity-correlated shape detections: breadth-then-narrowing, short-window technique chaining, identity fan-out. Tier 2 only | Ravi | L | `[proposed]` |
| 17 | 90 days | Prototype post-block adaptation detection by correlating defensive actions with subsequent activity. Treat as research | Ravi | L | `[proposed]` |
| 18 | 90 days | Define the narrow Tier 3 automation set; make every automated action rate-limited, scoped and reversible | Ravi + Lena | M | `[proposed]` |
| 19 | 90 days | Rehearse containment on a machine-tempo clock. Measure detect-to-revoke, not detect-to-ticket | Dana | M | `[proposed]` |
| 20 | 90 days | Decide and record a position on the SAFE RFC, whether or not you join | Aoife | S | `[corroborated]` |

**Sequencing rule.** Identity work sits first in every horizon. If resourcing forces a cut, cut from the bottom of the 90-day column upward, never from rows 1 through 4.

---

## 14. Final recommendation and honest scope

### 14.1 The recommendation

**Build the defense on the threat class, not on the incident. The class is objective-driven agentic intrusion on a commodity substrate with no vendor gate, and the only controls that answer it are the ones inside your own estate.**

Concretely, three commitments:

1. **Identity is the control plane, and non-human identity is the population that matters.** With no provider to revoke access, the identity plane is the only place a defender can still say no. Fund it first. It is justified by the general 2026 breach evidence base regardless of whether agentic intrusion ever touches your estate, which makes it the least regret-prone spend available.
2. **Assume the vendor gate is absent and design accordingly.** No provider policy, no model fingerprinting, no provenance allowlisting, no pending regulation. Preventive and procedural controls first — privilege scoping, blast-radius containment, capability inventory, evidence preservation — because they deliver without any detection working. Behavioural machine-tempo detection last, in tiers, with automated action confined to the two signal classes that have near-zero benign explanation.
3. **Change the clock, not just the controls.** Rehearse containment on a machine-tempo timeline and measure detect-to-revoke rather than detect-to-ticket. Adopt the 4/30/90 disclosure cadence internally, including near misses, before an incident forces the question.

### 14.2 Honest scope

**What this design does not claim.**
- It does not claim these controls would have stopped the reported Taiwan operation. No public evidence supports that claim about any control set.
- It does not claim the Taiwan figures are accurate. §1 says the opposite: they are single-origin, unadopted by the affected government, and the government's own characterization is hybrid rather than autonomous.
- It does not claim behavioural agent-tempo detection is a solved or even a demonstrated problem. §7.4 and C3 say it is immature and may degrade as benign agentic traffic grows.
- It does not claim novelty for most of the control set. C6 concedes that much of this is hygiene. What changes is the clock, the scope of "identity," and the evidence obligation.
- It does not offer thresholds. Publishing a number here is publishing a number for an adversary to stay beneath.
- It does not analyse the data-protection consequences of retaining prompts and agent traces. That is the largest known gap in the design and it is flagged in §11.2 rather than papered over.

**What it does claim.** That the control gaps are real and independently documented; that the class has at least three observed instances from separate origins; that the one policy instrument in force by its own scope does not cover the model class involved; and that the recommended posture requires no purchase, no attribution, and no vendor cooperation to begin.

**The single sentence for a board.** *Act on the class, not on the anecdote — because the anecdote may be overstated and the class is not.*

---

## Appendix A — Source ledger

Grouped by type. "Origin" distinguishes a genuinely independent originating source from republication. Confidence is this document's assessment.

### A.1 Primary sources (party's own release)

| ID | Claim carried | Source | Date | Origin | Confidence |
|---|---|---|---|---|---|
| S01 | Daybreak Blue/Red tiers, GPT-5.6-Cyber, 95.0% vs 1.5% vs 2.0% completion rates, V8 findings, CVE-2026-15903 | OpenAI, "Expanding Daybreak as the Cyber Defense Window Narrows" | 2026-08-10 | Single (vendor primary), widely covered | Medium-high — self-measured |
| S02 | SAFE RFC: reportable events incl. near misses, evidence preservation, 4/30/90 cadence, principles | Linux Foundation SAFE working-group RFC | 2026-08-04 | Single institutional primary, multi-outlet coverage | High |
| S03 | Alliance membership 120+, ASRS model, drafter list | NVIDIA blog, Open Secure AI Alliance contributions | 2026-08-04 | Primary + multi-outlet | High |
| S04 | Five risk categories and headline controls for agentic AI | CISA/NSA/ACSC + Canada, NZ, UK, "Careful Adoption of Agentic AI Services" | 2026-04-30 | Multi-government primary | High |
| S05 | Frontier-model and cybersecurity framework lineage | EO 14409, "Promoting Advanced AI Innovation and Security" | 2026-06 | Primary | High |
| S06 | GTG-1002 campaign, automation share, safeguard-bypass pretext | Anthropic disclosure | 2025-11-13 | Single vendor primary, independently catalogued | High |
| S07 | MITRE ATT&CK Campaign C0062 cataloguing | MITRE ATT&CK | 2025-11+ | Independent body | High |
| S08 | MITRE ATLAS agentic techniques through v5.4.0 | MITRE ATLAS | 2026-02 | Independent body | High |
| S09 | Taiwan: AI-assisted overseas attacks, hybrid characterization, NICS alerts from Jul 20, responses completed | Taiwan MODA statements | 2026-08-12/13 | Government primary | High |

### A.2 Reporting

| ID | Claim carried | Source | Date | Origin | Confidence |
|---|---|---|---|---|---|
| S10 | The Taiwan account: 4 days, 21 systems, 85 accounts, 2,500+ records, victim sectors, open frameworks, authorized-testing pretext | Financial Times, reporting Dream research | 2026-08-12 | **Single originating investigation** | Medium for the campaign, low-medium for the figures |
| S11 | Republication of S10 | The Register, CyberScoop, CNN, TechRadar, Tom's Hardware, TechTimes, Taipei Times, Security Affairs, Slashdot | 2026-08-12/14 | **Not independent — all trace to S10** | n/a |
| S12 | MODA confirmation and divergence from S10 | Reuters via US News, Taipei Times (front page Aug 13, 14), SC Media, Quartz, HSToday | 2026-08-12/14 | Multi-outlet on a government primary | High |
| S13 | Skepticism: no IoCs, no hashes, no victim confirmation, no model ID, internal report inconsistency, timeline mismatch | remio.ai analysis | ~2026-08-14 | Single analysis, checkable against the report | Medium |
| S14 | "Not 100% autonomous" — humans chose targets and directed the operation | Expert comment in CNN and Register coverage | 2026-08-12/13 | Multi-outlet | High |
| S15 | White House framework: closed models only, open weights exempt, text unpublished, criticism | CNBC, Bloomberg, SiliconANGLE, Quartz, Yahoo, bankinfosecurity, techbrew | 2026-08-03/05 | Multi-outlet | High |
| S16 | 1,376 signatories, the ask, named signatories, organizers | Transparency Coalition, CNN, AOL/Fortune, Deseret News | 2026-08-12 | Multi-outlet | High for scale, medium for signatory list |
| S17 | July 24 open-weights industry letter, 25 → 270+ organizations, Anthropic absent | Microsoft, TechCrunch, Tom's Hardware, Simon Willison | 2026-07-24 → 08-03 | Multi-outlet | High |
| S18 | Frontier labs absent from the Alliance | Tom's Hardware, SiliconANGLE, TechRepublic, Cybersecurity Dive | 2026-08-04 | Multi-outlet | High for the gap, medium for "no change since" |
| S19 | Daybreak launch coverage and reception; "fully automated attacks orchestrated by AI now exist" | TechCrunch, CNBC, Cybersecurity Dive, VentureBeat, The Hacker News, Security Boulevard | 2026-08-10 | Multi-outlet | High |
| S20 | OpenAI sandbox escape (Jul 21) and Anthropic eval incidents (Jul 31) | Multi-outlet, on vendor disclosures | 2026-07 | Multi-outlet on primaries | High |
| S21 | Congressional China–Taiwan AI-cyberattack war game | Nextgov/FCW | 2026-07 | Single | Medium |
| S22 | FY2026 NDAA §1535 AI Futures Steering Committee | Legislative record | 2026 | Single in this research | Medium |
| S23 | Open weights ~41% of Hugging Face downloads at framework finalization | Prior-window reporting | 2026-08 | Single | Medium |

### A.3 Research

| ID | Claim carried | Source | Date | Origin | Confidence |
|---|---|---|---|---|---|
| S24 | **Open model in the open Hermes framework running an autonomous scan-research-exploit pipeline; confirmed exfiltration from 3 targets, command execution on 11 endpoints; discovered via the agent exposing its own infrastructure** | Unit 42, Palo Alto Networks | 2026-07-30 | **Independent research origin — the load-bearing corroboration for the class** | High |
| S25 | Provider safety controls blocked what an unguarded open model performed | Unit 42 | 2026-07-30 | Single research origin, widely covered | Medium-high |
| S26 | Open-weight concentration-risk analysis | Cloud Security Alliance research note | 2026-08 | Single | Medium |
| S27 | AI Incident Database #1263 (GTG-1002) | AI Incident Database | 2025-11 | Independent catalogue | High |
| S28 | CRS In Focus, "Agentic Artificial Intelligence and Cyberattacks" (IF13151) | Congressional Research Service | 2026 | Single | Medium |

### A.4 Guidance and practitioner material

| ID | Claim carried | Source | Date | Origin | Confidence |
|---|---|---|---|---|---|
| S29 | Identity is the control plane for agentic AI | Verizon DBIR 2026, via Token Security commentary | 2026 | Single commentary on a multi-source report | Medium |
| S30 | Identity and network-access priorities for 2026 | Microsoft Security Blog | 2026-01-20 | Single vendor | Medium |
| S31 | Short-lived, cryptographically anchored agent identities as the most demanding control | CSA research note on the CISA agentic guide | 2026 | Single analysis of multi-source guidance | Medium |
| S32 | Pre-plan revocation of tokens, connectors and vendor agents | Recorded Future, "Emerging Enterprise Security Risks of AI" | 2026 | Single | Medium |
| S33 | **Honeytokens and deception against credential-harvesting agents — weakest-sourced item in the design** | Practitioner guide (decryptiondigest) | 2026 | Single | **Low-medium** |
| S34 | Legal-liability analysis of the lab containment incidents | TechCrunch | 2026-08-03 | Single | Medium |

### A.5 Sourcing rules applied

1. Republication breadth was never counted as corroboration. S11 exists as a single ledger row precisely to make that visible.
2. Vendor-published measurement is tagged `[reported]` even when coverage is wide (S01, S25).
3. Where a government primary and a vendor account conflict, both are carried and the divergence is tagged `[contested]` rather than resolved (S09 versus S10).
4. Every control in §5 and §13 traces to a source in A.1, A.3 or A.4 that is independent of S10, or is explicitly tagged `[proposed]`.

