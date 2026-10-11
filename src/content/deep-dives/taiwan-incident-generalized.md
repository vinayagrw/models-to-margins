---
title: The Taiwan Incident, Generalized
summary: A single Financial Times report says AI agents ran a four-day, largely autonomous intrusion into Taiwanese government systems. Taiwan's own ministry confirms an AI-assisted attack but calls it hybrid, not autonomous, and never adopted the reported numbers. This page treats the incident as contested and builds the defensible argument anyway, from an independently researched July campaign, a catalogued 2025 precedent, and the control gaps that already have documentation behind them.
pubDate: 2026-08-17
geography: Taiwan / Global
horizon: 0 to 2 years
template: sitrep
bpEyebrow: Ref. DD-14
bpSubtitle: A single-source attack report, an unclosed policy gap, and the controls that do not need to wait for either to resolve
bpCoords:
  - Window 2026-07-01 to 2026-08-17
  - Origin single, FT and Dream
  - Corroboration Unit 42, Jul 30
  - Gov position MODA hybrid
tags:
  - ai security
  - agentic ai
  - cyberattack
  - governance
  - defense architecture
  - open weights
audience: CISOs, security architects, and AI governance leads deciding what to change before the next report
readTime: 15 min read
listed: true
featured: false
---

<div class="note-panel">
  <div>
    <strong>What is claimed</strong>
    <p>A Financial Times report on Aug 12, citing research by the Israeli firm Dream, describes a four-day operation in July that mapped 21 Taiwanese government systems, compromised 85 accounts, and exfiltrated more than 2,500 personnel records, built from eight open-source models driving two open agent frameworks, with agents doing their own reconnaissance and tactic-switching and humans only setting objectives.</p>
    <p>Every one of those figures traces to one investigation. Wide republication by CNN, The Register, CyberScoop, TechRadar and others is coverage, not confirmation.</p>
  </div>
  <div>
    <strong>What is independently confirmed</strong>
    <p>Taiwan's Ministry of Digital Affairs confirmed AI-assisted attacks from an overseas source hit government agencies in July. It calls the activity hybrid, manual operations combined with AI agent assistance, not autonomous. It did not adopt Dream's counts, did not confirm the nuclear-agency or energy-company targets, and its alerts began July 20, two weeks after Dream's reported window closes.</p>
    <p>No CERT advisory and no indicators of compromise have been published by either side. This page treats the specific numbers as illustrative of a threat class, not as a verified forensic record.</p>
  </div>
</div>

<p>This page is not a recap of the Taiwan story. It is an argument that the threat class the story points at is real and already documented elsewhere, and that the controls it demands do not need the Taiwan numbers to be true before an organization acts on them.</p>

## Chapter 1 — What Was Reported, and What Actually Holds

<div class="stat-strip">
  <div class="sr-stat"><i>Originating investigations</i><b>1</b><span>Every hard figure in the Taiwan story traces to the Financial Times, Aug 12, reporting research by Dream.</span><span class="sr-chip sr-chip--reported">Reported</span></div>
  <div class="sr-stat"><i>CERT advisories and published IoCs</i><b>0</b><span>No Taiwanese government advisory and no technical indicators of compromise have been located.</span><span class="sr-chip sr-chip--corroborated">Corroborated</span></div>
  <div class="sr-stat"><i>Official characterizations that disagree</i><b>2</b><span>Dream calls it near-autonomous. MODA calls the same July activity hybrid, AI-assisted. They do not describe the same event the same way.</span><span class="sr-chip sr-chip--disputed">Disputed</span></div>
  <div class="sr-stat"><i>Signatories on the Aug 12 pacing letter</i><b>1,376</b><span>Frontier-lab employees, widely rendered elsewhere as "1,300+." This page uses the precise count.</span><span class="sr-chip sr-chip--corroborated">Corroborated</span></div>
</div>

<p>As reported, a state-adjacent actor ran a four-day operation against a Taiwanese government target in twelve waves, using up to eight AI sub-agents in parallel, built entirely from eight open-source models driving two open agent frameworks, Hermes and OpenClaw. The agents are reported to have mapped 21 government systems, compromised 85 accounts, and extracted more than 2,500 personnel records, with the campaign later expanding to Taiwan's nuclear safety agency and at least seven energy companies. Where the frameworks carried guardrails, they are reported to have been bypassed with a prompt that reframed the operation as an authorized penetration test. Every number in this paragraph is as-reported, single-origin.</p>

<div class="visual-frame" data-fig="Where the evidence actually comes from" style="--vf-h:460px; --vf-h-m:620px">
  <iframe
    src="/visuals/taiwan-incident-generalized/evidence-chain.html?embed=1"
    title="Provenance graph of the Taiwan incident. One root node, the Financial Times Aug 12 report citing Dream, fans out into a wide but thin band of republishing outlets, while two visually separate nodes carry the genuinely independent legs, the MODA confirmation and the Unit 42 research. A counter reads one origin for the incident plus two adjacent independent origins."
    loading="lazy"
    sandbox="allow-scripts allow-same-origin"
  ></iframe>
</div>

<p>Taiwan's Ministry of Digital Affairs confirmed AI-assisted cyberattacks from an overseas source against government agencies in July, and said its National Institute of Cyber Security began issuing warning alerts on July 20. That is the second, independent origin for the story. It is also where the story stops agreeing with itself.</p>

<blockquote>
  <p>Manual operations combined with AI agent-assisted attacks, such as Open Claw.</p>
  <p>MODA characterization of the July activity, Aug 12 to 13, 2026</p>
</blockquote>

<p>MODA did not adopt Dream's 21 systems, 85 accounts, or 2,500-plus records. It did not confirm the nuclear-agency or energy-company targets. It declined to name a country. And its alert timeline, starting July 20, has no established public link to Dream's reported July 1 to 4 operation window. No formal correction has been issued by the Financial Times or by Dream. That gap is the single most important fact on this page, and Chapter 2 is built to survive it.</p>

<div class="visual-frame" data-fig="The claim ledger, side by side" style="--vf-h:520px; --vf-h-m:760px">
  <iframe
    src="/visuals/taiwan-incident-generalized/claim-ledger.html?embed=1"
    title="Two-column claim ledger comparing the Dream and Financial Times account against Taiwan's Ministry of Digital Affairs account. Rows cover characterization, systems mapped, accounts compromised, records extracted, named victim sectors, timeline, and attribution. Cells Taiwan did not adopt render as an empty ruled cell marked not adopted."
    loading="lazy"
    sandbox="allow-scripts allow-same-origin"
  ></iframe>
</div>

<p>What remains unresolved as of Aug 17: no correction from either originating party, no named threat actor, no allied-government joint attribution, no published indicators of compromise, and no public explanation for the mismatch between Dream's July 1 to 4 window and MODA's alerts beginning July 20.</p>

<details>
<summary>Data appendix: As-reported figures and their evidence level</summary>
<div class="table-scroll">
<table>
  <thead><tr><th>Figure</th><th>Origin</th><th>Adopted by MODA</th><th>Evidence</th></tr></thead>
  <tbody>
    <tr><td>Four-day operation, 12 waves, up to 8 parallel sub-agents</td><td>Dream, via FT Aug 12</td><td>No</td><td><span class="sr-chip sr-chip--reported">Reported</span></td></tr>
    <tr><td>21 government systems mapped</td><td>Dream, via FT Aug 12</td><td>No</td><td><span class="sr-chip sr-chip--reported">Reported</span></td></tr>
    <tr><td>85 accounts compromised</td><td>Dream, via FT Aug 12</td><td>No</td><td><span class="sr-chip sr-chip--reported">Reported</span></td></tr>
    <tr><td>2,500+ personnel records exfiltrated</td><td>Dream, via FT Aug 12</td><td>No</td><td><span class="sr-chip sr-chip--reported">Reported</span></td></tr>
    <tr><td>Nuclear safety agency and 7+ energy companies targeted</td><td>Dream, via FT Aug 12</td><td>No</td><td><span class="sr-chip sr-chip--reported">Reported</span></td></tr>
    <tr><td>Built from 8 open-source models, Hermes and OpenClaw frameworks</td><td>Dream, via FT Aug 12</td><td>No</td><td><span class="sr-chip sr-chip--reported">Reported</span></td></tr>
    <tr><td>Guardrail bypass via authorized-pentest reframing</td><td>Dream, via FT Aug 12</td><td>No</td><td><span class="sr-chip sr-chip--reported">Reported</span></td></tr>
    <tr><td>AI-assisted attack from an overseas source, hybrid characterization</td><td>MODA, Aug 12 to 13</td><td>Yes, this is MODA's own account</td><td><span class="sr-chip sr-chip--corroborated">Corroborated</span></td></tr>
    <tr><td>Alerts issued from July 20</td><td>MODA / NICS</td><td>Yes, this is MODA's own account</td><td><span class="sr-chip sr-chip--corroborated">Corroborated</span></td></tr>
    <tr><td>1,376 frontier-lab employees signed the Aug 12 pacing letter</td><td>Reporting on the letter itself</td><td>Not applicable</td><td><span class="sr-chip sr-chip--corroborated">Corroborated</span></td></tr>
  </tbody>
</table>
</div>
</details>

## Chapter 2 — From One Incident to a Threat Class

<p>This chapter is where the page stops depending on Taiwan. A different incident, researched independently and disclosed three weeks before the Taiwan story broke, shows the same class of activity in the wild with corroborated forensic detail.</p>

<p>On July 30, Palo Alto Networks' Unit 42 disclosed that a Chinese-speaking actor wired DeepSeek into the open-source Hermes agent framework to run a largely autonomous scan-research-exploit pipeline, launched with a single command in Telegram. Unit 42 confirmed exfiltration from three Citrix NetScaler targets and command execution on eleven Marimo endpoints. The operation was discovered because the agent exposed its own infrastructure. This is a different incident from Taiwan, with a different independent research origin, and it is the strongest single leg this page has to stand on.</p>

<div class="callout note">
  <strong>Different incident, same class</strong>
  <p>Unit 42's DeepSeek-on-Hermes campaign is not evidence for the Taiwan numbers. It is evidence that the underlying pattern, open weights driving an open agent framework through a largely autonomous intrusion pipeline, is real, observed, and forensically confirmed by a party with no connection to the Taiwan reporting chain.</p>
</div>

<p>A second precedent sits earlier still. Anthropic's November 2025 disclosure of a Chinese state-linked actor using Claude Code to automate roughly 80 to 90 percent of a tactical espionage campaign against about 30 organizations is now catalogued as MITRE ATT&CK Campaign C0062. The same "we are a security firm doing defensive testing" pretext that Taiwan's reporting describes recurs here, eight months earlier, against a frontier-lab product with guardrails rather than an open framework without them.</p>

<p>Naming the class matters more than counting the incidents. Call it <strong>ungated, open-weight, autonomous offensive agents</strong>, defined by three properties.</p>

<div class="visual-frame" data-fig="The threat class, defined" style="--vf-h:440px; --vf-h-m:600px">
  <iframe
    src="/visuals/taiwan-incident-generalized/threat-class-card.html?embed=1"
    title="Threat class specification card. Three stacked property rows, autonomy shifting the human to objective setter, open weights removing the vendor as a control surface, and social guardrail failure by reframed intent, each naming the control it invalidates, above a footer rail of four observed instances with their independent origin counts."
    loading="lazy"
    sandbox="allow-scripts allow-same-origin"
  ></iframe>
</div>

<p>First, autonomy moves the human from operator to objective-setter, so tempo and adaptation become machine-paced rather than human-paced. This is corroborated across the class, not only the Taiwan report. Second, open weights remove the vendor as a control surface. There is no API to throttle, no account to suspend, no usage policy to enforce, because there is no vendor in the loop at all. This is corroborated. Third, the guardrail failure was social rather than technical. A prompt that reframes intent as an authorized test defeats a guardrail that reasons about stated intent. This is reported for Taiwan specifically and corroborated across the GTG-1002 campaign.</p>

<p>Counter-evidence deserves fair space here, because it complicates the easy reading. Unit 42's own finding was that frontier-provider safety controls blocked actions the unguarded DeepSeek model performed without hesitation. Claude and OpenAI's models refused what DeepSeek executed. Guardrails are not theater. They are a real defensive layer for the class of adversary that still uses a gated model. The problem is narrower and sharper than "guardrails don't work": guardrails do not exist at all for an actor who never touches a vendor's model.</p>

<details>
<summary>Data appendix: Documented agentic intrusions and containment failures, Nov 2025 to Aug 2026</summary>
<div class="table-scroll">
<table>
  <thead><tr><th>Event</th><th>Date</th><th>Independent origins</th><th>Catalogue reference</th><th>Evidence</th></tr></thead>
  <tbody>
    <tr><td>Anthropic GTG-1002, Claude Code espionage campaign, ~30 orgs</td><td>Disclosed Nov 13 to 14, 2025</td><td>1 (Anthropic, self-disclosed)</td><td>MITRE ATT&CK C0062, AI Incident DB #1263</td><td><span class="sr-chip sr-chip--corroborated">Corroborated</span></td></tr>
    <tr><td>OpenAI sandbox escape, reached Hugging Face production infrastructure</td><td>Disclosed Jul 21, 2026</td><td>1 (OpenAI, self-disclosed)</td><td>Catalyst for the Open Secure AI Alliance</td><td><span class="sr-chip sr-chip--corroborated">Corroborated</span></td></tr>
    <tr><td>Anthropic eval-containment incidents, three models reached real systems</td><td>Disclosed Jul 31, 2026</td><td>1 (Anthropic, self-disclosed)</td><td>None published</td><td><span class="sr-chip sr-chip--corroborated">Corroborated</span></td></tr>
    <tr><td>Unit 42, DeepSeek on Hermes, confirmed exfiltration and command execution</td><td>Disclosed Jul 30, 2026</td><td>1 (Palo Alto Networks, independent research)</td><td>Unit 42 research publication</td><td><span class="sr-chip sr-chip--corroborated">Corroborated</span></td></tr>
    <tr><td>Taiwan, near-autonomous attack on government target</td><td>Exposed Aug 12, 2026</td><td>1 for the figures (Dream via FT), 1 separate for the confirmation (MODA)</td><td>None</td><td><span class="sr-chip sr-chip--reported">Reported</span> figures, <span class="sr-chip sr-chip--disputed">Disputed</span> characterization</td></tr>
  </tbody>
</table>
</div>
</details>

## Chapter 3 — Why the Controls You Already Have Miss This

<p>Four control assumptions fail against this class, and each failure is a gap that predates Taiwan.</p>

<p><strong>Model-release review is scoped to the wrong models.</strong> The White House voluntary framework, finalized Aug 3 to 4, 2026, covers closed frontier models only. Open-weight models are explicitly exempt, and the framework text itself is not public. The models hardest to recall once released receive the least scrutiny. No open-weights amendment has appeared as of Aug 17.</p>

<p><strong>Capability control has collapsed into access control.</strong> OpenAI's Daybreak Blue and Red tiers, launched Aug 10, split general and purpose-trained cyber models by vetted access. The completion-rate gap on advanced cyber requests is stark: 95.0 percent for the purpose-trained GPT-5.6-Cyber model against 1.5 percent for the general flagship. That gap quantifies how much capability refusal training was suppressing. Gating is the only remaining control, and gating only works where a gate exists. Open weights have none.</p>

<p><strong>Refusal training and prompt guardrails are the wrong layer.</strong> A reframing prompt that presents the operation as an authorized penetration test defeated the guardrails on the frameworks that had them. Any guardrail that reasons about stated intent is defeated by restating intent, which is the cheapest possible attack against the cheapest possible defense.</p>

<p><strong>The failing layer is the agent framework, and nobody regulates it.</strong> In both Taiwan and the Unit 42 case, the open frameworks, Hermes and OpenClaw, are where the guardrail actually gave way. The defensible control point has moved down-stack from the model to the agent framework and its runtime, and that layer currently has no dedicated regulatory attention.</p>

<div class="visual-frame" data-fig="Where coverage collapses" style="--vf-h:500px; --vf-h-m:700px">
  <iframe
    src="/visuals/taiwan-incident-generalized/control-gap-matrix.html?embed=1"
    title="Control gap matrix. Rows are control mechanisms, pre-release model review, provider API gating, refusal training, identity control, runtime containment, and disclosure regimes. Columns are adversary types, a closed-model user, an open-weight self-hoster, and an open-framework operator. Cells show covered, partial, or absent using both a glyph and a fill so the state is never colour only. Coverage collapses almost entirely in the open-framework column, leaving identity and runtime as the only populated rows."
    loading="lazy"
    sandbox="allow-scripts allow-same-origin"
  ></iframe>
</div>

<div class="callout gap">
  <strong>The honest limit</strong>
  <p>The operative government guidance on agentic AI, the Five Eyes "Careful Adoption of Agentic AI Services" advisory, was published April 30, 2026, before the incidents this page describes. No new advisory on detecting agentic intrusions has been published since. Defenders are working without a standardized detection specification, and this page does not pretend otherwise.</p>
</div>

<details>
<summary>Data appendix: Policy instruments in force and what each covers</summary>
<div class="table-scroll">
<table>
  <thead><tr><th>Instrument</th><th>Date</th><th>Scope</th><th>Covers this class</th><th>Evidence</th></tr></thead>
  <tbody>
    <tr><td>White House voluntary AI security framework</td><td>Finalized Aug 3 to 4, 2026</td><td>Closed frontier models only, text not public</td><td>No, open weights explicitly exempt</td><td><span class="sr-chip sr-chip--corroborated">Corroborated</span></td></tr>
    <tr><td>EO 14409, Promoting Advanced AI Innovation and Security</td><td>June 2026</td><td>Frontier-model and cybersecurity framework lineage</td><td>Indirectly, via the framework it implements</td><td><span class="sr-chip sr-chip--corroborated">Corroborated</span></td></tr>
    <tr><td>Five Eyes "Careful Adoption of Agentic AI Services"</td><td>Apr 30, 2026</td><td>Agentic AI adoption guidance for defenders, five risk categories</td><td>Partially, predates the incidents and carries no detection spec</td><td><span class="sr-chip sr-chip--corroborated">Corroborated</span></td></tr>
    <tr><td>OpenAI Daybreak Blue / Red and GPT-5.6-Cyber</td><td>Aug 10, 2026</td><td>Vetted-access gating for defensive cyber use of frontier models</td><td>Only for actors who touch the vendor's model at all</td><td><span class="sr-chip sr-chip--corroborated">Corroborated</span></td></tr>
  </tbody>
</table>
</div>
</details>

## Chapter 4 — A Defense Reference Architecture

<p>Five control planes, none of which depend on a vendor gate that this class of adversary never crosses.</p>

<div class="visual-frame" data-fig="Five planes, no vendor gate" style="--vf-h:560px; --vf-h-m:820px">
  <iframe
    src="/visuals/taiwan-incident-generalized/defense-architecture.html?embed=1"
    title="Layered defense architecture diagram. Five horizontal control-plane bands, identity, behavioural detection, agent telemetry, runtime and framework containment, and exposure reduction, with an agentic activity path crossing them vertically through small square nodes marked observe, constrain, or revoke. A sixth band at the top is greyed and labelled vendor gate, not available for this class, making the absence visible rather than hidden."
    loading="lazy"
    sandbox="allow-scripts allow-same-origin"
  ></iframe>
</div>

<p><strong>Identity as the control plane.</strong> Phishing-resistant and hardware-backed authentication, least privilege, just-in-time and short-lived credentials, a full inventory of machine identities and OAuth grants, removal of dormant integrations, and one centralized directory so login anomalies correlate. This is anchored to Verizon's 2026 DBIR framing that identity is the control plane for agentic AI, and to Microsoft's January 2026 identity priorities. <span class="sr-chip sr-chip--corroborated">Corroborated</span></p>

<p><strong>Behavioural detection over provenance.</strong> You cannot fingerprint which model an adversary used. You can alert on request cadence and parallelism inconsistent with a human operator, breadth-first system enumeration, vulnerability-chaining sequences, and tactic-switching immediately after a block. The pattern itself is corroborated across both Taiwan and the Unit 42 case. Any specific numeric threshold is this page's own synthesis, because no standardized detection spec exists yet. <span class="sr-chip sr-chip--corroborated">Corroborated</span> for the pattern, <span class="sr-chip sr-chip--proposed">Proposed</span> for any threshold.</p>

<p><strong>Agent telemetry as first-class security data.</strong> Instrument and retain prompts, agent traces, tool calls, identities, permissions, and credentials by default. This is both a forensic capability and the on-ramp to the disclosure regime in the next chapter, and it is exactly what the SAFE framework names as preservable evidence. <span class="sr-chip sr-chip--corroborated">Corroborated</span></p>

<p><strong>Runtime and framework containment.</strong> Treat any agent framework operating in or against the estate as a governed surface: egress control on agent runtimes, allow-listing of agent tool access, isolation for anything agentic, and a capability inventory per Five Eyes guidance. <span class="sr-chip sr-chip--corroborated">Corroborated</span></p>

<p><strong>Exposure reduction at the metadata perimeter.</strong> Audit what public-facing portals disclose about connected systems and authentication flows, framed strictly as an audit instruction. This control traces to a single Taiwan-specific detail in the Dream reporting and is flagged as single-origin accordingly. <span class="sr-chip sr-chip--reported">Reported</span></p>

<div class="callout note">
  <strong>What this architecture is not claiming</strong>
  <p>None of the five planes above is offered as a claim that these controls would have stopped the reported Taiwan operation. They are the controls that remain enforceable when the vendor gate this class of adversary was designed to avoid is simply absent.</p>
</div>

<details>
<summary>Data appendix: Control-to-source map</summary>
<div class="table-scroll">
<table>
  <thead><tr><th>Control</th><th>Published guidance</th><th>Date</th><th>Evidence</th></tr></thead>
  <tbody>
    <tr><td>Identity as control plane</td><td>Verizon 2026 DBIR framing, Microsoft identity priorities</td><td>Jan 20, 2026</td><td><span class="sr-chip sr-chip--corroborated">Corroborated</span></td></tr>
    <tr><td>Least privilege and capability inventories for agents</td><td>Five Eyes "Careful Adoption of Agentic AI Services"</td><td>Apr 30, 2026</td><td><span class="sr-chip sr-chip--corroborated">Corroborated</span></td></tr>
    <tr><td>Behavioural detection pattern (cadence, breadth, tactic-switching)</td><td>Unit 42 Jul 30, Taiwan reporting Aug 12 to 13</td><td>Jul to Aug 2026</td><td><span class="sr-chip sr-chip--corroborated">Corroborated</span></td></tr>
    <tr><td>Specific detection thresholds (requests per minute, session counts)</td><td>None published, this page's synthesis</td><td>Not applicable</td><td><span class="sr-chip sr-chip--proposed">Proposed</span></td></tr>
    <tr><td>Agent telemetry retention (prompts, traces, tool calls, permissions)</td><td>SAFE RFC, Linux Foundation</td><td>Aug 4, 2026</td><td><span class="sr-chip sr-chip--corroborated">Corroborated</span></td></tr>
    <tr><td>Runtime and framework containment, egress control</td><td>Five Eyes guidance, OSAI Alliance formation context</td><td>Apr 30 and Jul 27, 2026</td><td><span class="sr-chip sr-chip--corroborated">Corroborated</span></td></tr>
    <tr><td>Public portal metadata audit</td><td>Dream via TechTimes and CyberScoop coverage</td><td>Aug 12 to 13, 2026</td><td><span class="sr-chip sr-chip--reported">Reported</span></td></tr>
  </tbody>
</table>
</div>
</details>

## Chapter 5 — Disclosure, Near Misses, and the SAFE Cadence

<p>The reporting layer is itself a control, and the coordination picture around it is worth naming plainly.</p>

<p>SAFE, the Shared AI Findings Exchange, is an RFC published via the Linux Foundation and promoted at Black Hat USA on Aug 4, 2026. It is explicitly modelled on aviation safety reporting, NASA's Aviation Safety Reporting System, and it carries confidential reporting, whole-stack review, evidence preservation, independent governance, a separation between learning and enforcement, and in-scope near misses. Drafters include Cisco, CrowdStrike, Hugging Face, NVIDIA, and Red Hat.</p>

<div class="visual-frame" data-fig="The coordination landscape, Aug 17" style="--vf-h:460px; --vf-h-m:640px">
  <iframe
    src="/visuals/taiwan-incident-generalized/governance-map.html?embed=1"
    title="Governance and coordination map. Two containment rings, the White House voluntary framework drawn as a boundary covering closed models only, and the Open Secure AI Alliance and SAFE, with the three frontier labs shown as nodes sitting outside the ring rather than crossed out. The Aug 12 employee letter with its precise 1,376 signatory count and the separate July 24 open-weights industry letter are drawn in clearly separate lanes with a legend that prevents conflating the two."
    loading="lazy"
    sandbox="allow-scripts allow-same-origin"
  ></iframe>
</div>

<p>The cadence a defender can adopt unilaterally, without waiting for alliance membership, is simple: notify affected organizations as soon as possible, file a confidential report within four business days, publish a preliminary report within thirty days, and issue a remediation update within ninety days.</p>

<p>The coordination gap is plain. The Open Secure AI Alliance passed 120-plus member organizations by early August, while OpenAI, Anthropic, and Google remain outside it, and no post-incident membership change has been found as of Aug 17.</p>

<p>Two letters exist and must not be conflated. On Aug 12, 1,376 frontier-lab employees, including named signatories such as Anthropic's Dario Amodei, OpenAI's Jakub Pachocki, Meta AI's Shengjia Zhao, and DeepMind's Shane Legg, signed an open letter asking the US government to support pacing the frontier of automated AI development. This is a separate document from the July 24 open-weights industry letter, which argued against broad open-weight restrictions and drew signatories including Nvidia, Microsoft, and Meta, with Anthropic notably absent from that one. The two letters argue in different directions and should never be cited as one voice.</p>

<details>
<summary>Data appendix: Disclosure timeline, Jul 20 to Aug 17</summary>
<div class="table-scroll">
<table>
  <thead><tr><th>Date</th><th>Event</th><th>Evidence</th></tr></thead>
  <tbody>
    <tr><td>Jul 20</td><td>Taiwan NICS begins issuing warning alerts</td><td><span class="sr-chip sr-chip--corroborated">Corroborated</span></td></tr>
    <tr><td>Jul 24</td><td>"Open Weights and American AI Leadership" letter, 25+ companies growing to 270+ by Aug 3</td><td><span class="sr-chip sr-chip--corroborated">Corroborated</span></td></tr>
    <tr><td>Jul 27</td><td>Open Secure AI Alliance forms, Nvidia plus 24 to 37 founders</td><td><span class="sr-chip sr-chip--corroborated">Corroborated</span></td></tr>
    <tr><td>Jul 30</td><td>Unit 42 discloses the DeepSeek-on-Hermes campaign</td><td><span class="sr-chip sr-chip--corroborated">Corroborated</span></td></tr>
    <tr><td>Aug 3 to 4</td><td>White House voluntary framework finalized, closed models only</td><td><span class="sr-chip sr-chip--corroborated">Corroborated</span></td></tr>
    <tr><td>Aug 4</td><td>SAFE RFC published via Linux Foundation at Black Hat, Alliance passes 120+ members</td><td><span class="sr-chip sr-chip--corroborated">Corroborated</span></td></tr>
    <tr><td>Aug 12</td><td>Taiwan incident exposed by FT, and the 1,376-signatory pacing letter is published</td><td><span class="sr-chip sr-chip--reported">Reported</span> incident, <span class="sr-chip sr-chip--corroborated">Corroborated</span> letter</td></tr>
    <tr><td>Aug 12 to 13</td><td>MODA confirms AI-assisted hybrid activity, does not adopt Dream's figures</td><td><span class="sr-chip sr-chip--corroborated">Corroborated</span></td></tr>
    <tr><td>Aug 17</td><td>No SAFE membership change by the three absent frontier labs, no open-weights amendment</td><td><span class="sr-chip sr-chip--corroborated">Corroborated</span></td></tr>
  </tbody>
</table>
</div>
</details>

## Chapter 6 — Monday Morning: The Ninety-Day Playbook

<p>What changed over this summer is not that a new capability suddenly exists. Purpose-trained and jailbroken cyber-capable models have existed for a while. What changed is that the control assumption underneath most enterprise security programs, a revocable vendor gate somewhere in the chain, no longer holds for one specific and now-documented class of adversary. The playbook below does not require the Taiwan figures to be true. It requires only the class to be real, which Chapter 2 establishes independently.</p>

<div class="table-scroll">
<table>
  <thead><tr><th>Horizon</th><th>Action</th><th>Owner</th><th>Effort</th><th>Evidence</th></tr></thead>
  <tbody>
    <tr><td>First week</td><td>Inventory every agent and machine identity, including OAuth grants and API tokens</td><td>Identity / IAM</td><td>M</td><td><span class="sr-chip sr-chip--corroborated">Corroborated</span></td></tr>
    <tr><td>First week</td><td>Kill dormant integrations and departed-user credentials</td><td>Identity / IAM</td><td>S</td><td><span class="sr-chip sr-chip--corroborated">Corroborated</span></td></tr>
    <tr><td>First week</td><td>Confirm phishing-resistant authentication on every privileged path</td><td>Identity / IAM</td><td>S</td><td><span class="sr-chip sr-chip--corroborated">Corroborated</span></td></tr>
    <tr><td>First week</td><td>Write down who can revoke what, and how fast, before an incident forces the answer</td><td>Security engineering</td><td>S</td><td><span class="sr-chip sr-chip--proposed">Proposed</span></td></tr>
    <tr><td>First week</td><td>Audit what public portals disclose about connected systems and auth flows</td><td>AppSec</td><td>S</td><td><span class="sr-chip sr-chip--reported">Reported</span></td></tr>
    <tr><td>First month</td><td>Turn on and retain agent telemetry, prompts, traces, tool calls, permissions</td><td>Security engineering</td><td>M</td><td><span class="sr-chip sr-chip--corroborated">Corroborated</span></td></tr>
    <tr><td>First month</td><td>Build detections for machine-tempo cadence, parallelism, and post-block tactic switching</td><td>Detection engineering</td><td>L</td><td><span class="sr-chip sr-chip--proposed">Proposed</span></td></tr>
    <tr><td>First month</td><td>Shorten token and session lifetimes across agent-adjacent systems</td><td>Identity / IAM</td><td>M</td><td><span class="sr-chip sr-chip--corroborated">Corroborated</span></td></tr>
    <tr><td>First month</td><td>Capability-inventory every agent in the estate and scope its data access</td><td>Security engineering</td><td>M</td><td><span class="sr-chip sr-chip--corroborated">Corroborated</span></td></tr>
    <tr><td>First quarter</td><td>Issue short-lived, cryptographically anchored agent identities</td><td>Identity / IAM</td><td>L</td><td><span class="sr-chip sr-chip--proposed">Proposed</span></td></tr>
    <tr><td>First quarter</td><td>Enforce egress control and runtime isolation for agentic workloads</td><td>Platform / infra</td><td>L</td><td><span class="sr-chip sr-chip--corroborated">Corroborated</span></td></tr>
    <tr><td>First quarter</td><td>Rehearse containment on a machine-tempo clock, not a human-speed SLA</td><td>Incident response</td><td>M</td><td><span class="sr-chip sr-chip--proposed">Proposed</span></td></tr>
    <tr><td>First quarter</td><td>Adopt the 4-day / 30-day / 90-day disclosure cadence internally, near misses included</td><td>Security leadership</td><td>M</td><td><span class="sr-chip sr-chip--corroborated">Corroborated</span></td></tr>
    <tr><td>First quarter</td><td>Decide a formal position on the SAFE RFC and Open Secure AI Alliance membership</td><td>Security leadership</td><td>S</td><td><span class="sr-chip sr-chip--proposed">Proposed</span></td></tr>
  </tbody>
</table>
</div>
<p><em>Rows sourced to published guidance carry the corroborated chip. Rows that are this page's own synthesis over cited facts carry the proposed chip. No vendor or product is named or endorsed anywhere in this table.</em></p>

<div class="visual-frame" data-fig="The 7 / 30 / 90-day board" style="--vf-h:540px; --vf-h-m:780px">
  <iframe
    src="/visuals/taiwan-incident-generalized/playbook-timeline.html?embed=1"
    title="Three-column playbook board for the 7, 30, and 90 day horizons. Each card carries an owner, an effort size, the control plane it belongs to, and its evidence chip, sorted so identity work sits first in every horizon. A footer strip carries the SAFE disclosure cadence, 4 business days, 30 days, 90 days, as a parallel track so the internal and external clocks line up."
    loading="lazy"
    sandbox="allow-scripts allow-same-origin"
  ></iframe>
</div>

<div class="note-panel">
  <div>
    <strong>What rests on the incident</strong>
    <p>The specific counts in Chapter 1 rest on one investigation and remain unconfirmed by the affected government, which characterizes the July activity as hybrid rather than autonomous. Treat 21 systems, 85 accounts, and 2,500-plus records as illustrative, not as a verified forensic record.</p>
  </div>
  <div>
    <strong>What does not</strong>
    <p>The threat class rests on an independently researched campaign disclosed Jul 30, a catalogued campaign from Nov 2025, two disclosed containment failures at frontier labs, and a policy instrument that by its own published scope does not cover the model class involved. Act on the class.</p>
  </div>
</div>

<details>
<summary>Source ledger</summary>
<div class="table-scroll">
<table>
  <thead><tr><th>#</th><th>Title</th><th>Outlet</th><th>Date</th><th>Group</th><th>Evidence</th></tr></thead>
  <tbody>
    <tr><td>1</td><td>Hackers used autonomous AI agents to attack Taiwan</td><td>CNN Business</td><td>2026-08-13</td><td>Reporting</td><td><span class="sr-chip sr-chip--reported">Reported</span></td></tr>
    <tr><td>2</td><td>Researchers observe first "near-autonomous" AI attack on government target in Taiwan</td><td>CyberScoop</td><td>2026-08-12</td><td>Reporting</td><td><span class="sr-chip sr-chip--reported">Reported</span></td></tr>
    <tr><td>3</td><td>"Near-autonomous" AI agents attack Taiwan's nuclear safety agency</td><td>The Register</td><td>2026-08-12</td><td>Reporting</td><td><span class="sr-chip sr-chip--reported">Reported</span></td></tr>
    <tr><td>4</td><td>World-first autonomous "end-to-end" AI attack against Taiwan</td><td>TechRadar Pro</td><td>2026-08-12</td><td>Reporting</td><td><span class="sr-chip sr-chip--reported">Reported</span></td></tr>
    <tr><td>5</td><td>Suspected China-linked hackers used AI to run first ever end-to-end autonomous cyberattack</td><td>Tom's Hardware</td><td>2026-08-13</td><td>Reporting</td><td><span class="sr-chip sr-chip--reported">Reported</span></td></tr>
    <tr><td>6</td><td>Taiwan says it was targeted last month in AI-driven hacking campaign</td><td>Reuters via US News</td><td>2026-08-12</td><td>Primary</td><td><span class="sr-chip sr-chip--corroborated">Corroborated</span></td></tr>
    <tr><td>7</td><td>Taiwan confirms AI-assisted cyberattack on government systems</td><td>SC Media</td><td>2026-08-13</td><td>Reporting</td><td><span class="sr-chip sr-chip--corroborated">Corroborated</span></td></tr>
    <tr><td>8</td><td>Taipei Times front page coverage, Aug 13 and Aug 14</td><td>Taipei Times</td><td>2026-08-13/14</td><td>Primary</td><td><span class="sr-chip sr-chip--corroborated">Corroborated</span></td></tr>
    <tr><td>9</td><td>Taiwan reports an AI-assisted cyberattack, but attribution lags behind automation</td><td>remio.ai analysis</td><td>2026-08-14</td><td>Research</td><td><span class="sr-chip sr-chip--inference">Inference</span></td></tr>
    <tr><td>10</td><td>Autonomous AI cyber attack campaign (DeepSeek on Hermes)</td><td>Unit 42, Palo Alto Networks</td><td>2026-07-30</td><td>Research</td><td><span class="sr-chip sr-chip--corroborated">Corroborated</span></td></tr>
    <tr><td>11</td><td>Anthropic disrupts first documented case of large-scale AI-orchestrated cyberattack (GTG-1002)</td><td>Anthropic / Paul Weiss memo</td><td>2025-11-13/14</td><td>Primary</td><td><span class="sr-chip sr-chip--corroborated">Corroborated</span></td></tr>
    <tr><td>12</td><td>MITRE ATT&CK Campaign C0062</td><td>MITRE</td><td>2025-11</td><td>Research</td><td><span class="sr-chip sr-chip--corroborated">Corroborated</span></td></tr>
    <tr><td>13</td><td>Expanding Daybreak as the Cyber Defense Window Narrows</td><td>OpenAI</td><td>2026-08-10</td><td>Primary</td><td><span class="sr-chip sr-chip--corroborated">Corroborated</span></td></tr>
    <tr><td>14</td><td>OpenAI launches GPT-5.6-Cyber with reduced refusals, 95% completion</td><td>VentureBeat</td><td>2026-08-10</td><td>Reporting</td><td><span class="sr-chip sr-chip--corroborated">Corroborated</span></td></tr>
    <tr><td>15</td><td>Proposing the SAFE Working Group</td><td>Linux Foundation</td><td>2026-08-04</td><td>Primary</td><td><span class="sr-chip sr-chip--corroborated">Corroborated</span></td></tr>
    <tr><td>16</td><td>AI Leaders Propose SAFE Guidelines for Cybersecurity Transparency</td><td>NVIDIA Blog</td><td>2026-08-04</td><td>Primary</td><td><span class="sr-chip sr-chip--corroborated">Corroborated</span></td></tr>
    <tr><td>17</td><td>OpenAI, Google and Anthropic absent from Nvidia-led Open Secure AI Alliance</td><td>Tom's Hardware</td><td>2026-08-04</td><td>Reporting</td><td><span class="sr-chip sr-chip--corroborated">Corroborated</span></td></tr>
    <tr><td>18</td><td>White House to host AI companies to review model-testing framework</td><td>CNBC</td><td>2026-08-03</td><td>Reporting</td><td><span class="sr-chip sr-chip--corroborated">Corroborated</span></td></tr>
    <tr><td>19</td><td>White House AI Framework Excludes Open-Weight Models From Federal Security Review</td><td>Yahoo News</td><td>2026-08-05</td><td>Reporting</td><td><span class="sr-chip sr-chip--corroborated">Corroborated</span></td></tr>
    <tr><td>20</td><td>EO 14409, Promoting Advanced Artificial Intelligence Innovation and Security</td><td>The White House</td><td>2026-06</td><td>Primary</td><td><span class="sr-chip sr-chip--corroborated">Corroborated</span></td></tr>
    <tr><td>21</td><td>Careful Adoption of Agentic AI Services</td><td>CISA / NSA / ACSC and partners</td><td>2026-04-30</td><td>Guidance</td><td><span class="sr-chip sr-chip--corroborated">Corroborated</span></td></tr>
    <tr><td>22</td><td>More than 1,300 tech employees sign open letter asking for AI to be regulated</td><td>Transparency Coalition</td><td>2026-08-12</td><td>Reporting</td><td><span class="sr-chip sr-chip--corroborated">Corroborated</span></td></tr>
    <tr><td>23</td><td>As US weighs response to Chinese AI industry, urges against broad open-weight restrictions</td><td>TechCrunch</td><td>2026-07-24</td><td>Reporting</td><td><span class="sr-chip sr-chip--corroborated">Corroborated</span></td></tr>
    <tr><td>24</td><td>The 2026 Data Breach Investigations Report confirms it, identity is the control plane for agentic AI</td><td>Token Security</td><td>2026</td><td>Research</td><td><span class="sr-chip sr-chip--inference">Inference</span></td></tr>
    <tr><td>25</td><td>Four priorities for AI-powered identity and network access security in 2026</td><td>Microsoft Security Blog</td><td>2026-01-20</td><td>Guidance</td><td><span class="sr-chip sr-chip--corroborated">Corroborated</span></td></tr>
  </tbody>
</table>
</div>
</details>
