---
title: The AI Ops Execution Layer — From Reporting to Acting
summary: Every operations vendor now claims AI that acts, not just reports. Eight scenes turn an July 2026 capability atlas into a defensible architecture, with a governed write path, an autonomy ladder, a red team pass, and a ten week evidence refresh that shows what the April read got right and wrong.
pubDate: 2026-07-11
updatedDate: 2026-07-11
featured: false
listed: true
template: console
bpEyebrow: Console OPS-01
bpTitle: The AI Ops Execution Layer
bpSubtitle: From Reporting to Acting
bpCoords:
  - Scale 1:1
  - Scenes 8
  - Sources graded 33
geography: Cross-industry, US and EU signals
tags:
  - ai agents
  - operations
  - execution layer
  - architecture
  - human in the loop
  - evidence audit
audience: Product and engineering leaders deciding how AI should be allowed to act inside live operational workflows
readTime: 12 min read
---

<div class="visual-frame" style="--vf-h:500px; --vf-h-m:830px">
  <iframe
    src="/visuals/ai-ops-execution-layer/hero-ops-feed.html?embed=1"
    title="Animated hero. A live operations feed simulation where incoming exceptions pass through an agent confidence gate, most executed and some routed to a human queue, with a review budget meter that flushes when full."
    loading="lazy"
    sandbox="allow-scripts allow-same-origin"
  ></iframe>
</div>

<div class="cr-master">
  <div class="cr-master-head">
    <span><strong>OPS-01</strong> // AI OPS EXECUTION LAYER</span>
    <span>WINDOW 2026-04-24 &rarr; 2026-07-04 &middot; SOURCES GRADED 33</span>
  </div>
  <div class="cr-lamp-row">
    <a class="cr-lamp" data-s="ok" href="#scene-7--what-ten-weeks-changed"><i></i><b>T1 Execution shift</b><span>Confirmed, now consensus</span></a>
    <a class="cr-lamp" data-s="ok" href="#scene-7--what-ten-weeks-changed"><i></i><b>T2 Workflow native</b><span>Confirmed, contested</span></a>
    <a class="cr-lamp" data-s="warn" href="#scene-7--what-ten-weeks-changed"><i></i><b>T3 Data moat</b><span>Sharpened</span></a>
    <a class="cr-lamp" data-s="warn" href="#scene-7--what-ten-weeks-changed"><i></i><b>T4 Voice and vision</b><span>Mixed</span></a>
    <a class="cr-lamp" data-s="ok" href="#scene-7--what-ten-weeks-changed"><i></i><b>T5 Actioning next</b><span>Arrived on schedule</span></a>
  </div>
  <div class="cr-tile-grid">
    <div class="cr-tile"><b>1 <em>in</em> 4</b><span>How often the best measured agents get the same retail task right all eight times they run it. Auto-act must be earned per action category, not per model.</span></div>
    <div class="cr-tile"><b>11<em>&times;</em> ignored</b><span>An agent deleted a production database during a freeze it was told about eleven times. Safety lives in permissions and staged writes, never in prompts.</span></div>
    <div class="cr-tile"><b>30 <em>/</em> day</b><span>The approval count where humans start rubber-stamping. The review queue gets a hard cap and overflow demotes the noisiest category.</span></div>
  </div>
</div>

<details class="cr-brief">
<summary>Mission brief: what this page is, who it is for, how it treats evidence</summary>
<p><strong>One-line idea</strong>: the AI execution layer for physical operations is not a smarter brain. It is a governed write path with a graduated autonomy ladder, and every mega vendor keynote that skips that part is selling past the evidence.</p>
<p><strong>Who this is for</strong>: a leader who needs the market verdict (Scenes 1 to 3), an architect who needs the reference shape and the gating mechanics (Scenes 4 to 6), anyone about to greenlight an agentic ops project on vendor numbers (Scenes 7 and 8, before you do).</p>
<p><strong>Evidence stance</strong>: this page upgrades an July 10, 2026 capability brief through a full solution design pass. Claims are date-stamped, vendor self-reported numbers are excluded from headline claims and marked <span class="cr-v">V</span> where they appear, and the full graded ledger of 33 sources is in Scene 8.</p>
</details>

<nav class="reading-map" aria-label="Reading map">
  <p class="reading-map-label">Reading map · 8 scenes</p>
  <div class="reading-map-grid">
    <a class="reading-link" href="#scene-1--from-reporting-to-acting"><strong>1 · From reporting to acting</strong><span>The anchor pattern.</span></a>
    <a class="reading-link" href="#scene-2--the-extension-map"><strong>2 · The extension map</strong><span>Five capabilities, seven industries.</span></a>
    <a class="reading-link" href="#scene-3--a-day-in-the-life"><strong>3 · A day in the life</strong><span>Before and after, five personas.</span></a>
    <a class="reading-link" href="#scene-4--the-reference-architecture"><strong>4 · The reference architecture</strong><span>Four planes, one write path.</span></a>
    <a class="reading-link" href="#scene-5--patterns-and-the-decision-tree"><strong>5 · Patterns + decision tree</strong><span>Which pattern earns its place.</span></a>
    <a class="reading-link" href="#scene-6--the-autonomy-ladder"><strong>6 · The autonomy ladder</strong><span>Shadow, suggest, auto, budgeted.</span></a>
    <a class="reading-link" href="#scene-7--what-ten-weeks-changed"><strong>7 · What ten weeks changed</strong><span>May to July, thesis by thesis.</span></a>
    <a class="reading-link" href="#scene-8--opportunities-and-the-evidence-ledger"><strong>8 · Opportunities + ledger</strong><span>Where to build, what to trust.</span></a>
  </div>
</nav>

<div class="callout warm">
  <strong>How to read this page</strong>
  <p>Scenes 1 to 3 carry the market read forward from the July atlas. Scenes 4 to 6 are the new work: the architecture the atlas never drew, the pattern choices it never compared, and the gating mechanics everyone hand-waves. Scene 7 is the ten week evidence refresh, including what the July brief got wrong. Scene 8 ranks the opportunities and shows the graded source ledger. The companion technical design record with the full red team pass lives in the repo as AI_Ops_Execution_Layer_Technical_Design.md.</p>
</div>

## Scene 1 — From reporting to acting

The anchor pattern came from Crunchtime's April release: forecast first, add lightweight frontline interfaces (voice counts, photo checks), then let the system generate actions instead of alerts, then add a natural language analyst, all on one operational graph. That sequencing generalizes far beyond restaurants, and by June it was the explicit strategy of every major operations vendor.

The July brief tracked five capability classes: AI forecasting, voice inventory, photo intelligence, AI actions, and an AI analyst. The design pass reframes them. They are not five products. They are surfaces of one underlying loop: sense the operation, decide what matters, act through a governed write path, and learn from what happened. The vendors that understand this ship write paths and evidence machinery. The vendors that do not ship dashboards with a chat box.

<div class="callout neutral">
  <strong>Sourcing note</strong>
  <p>Crunchtime's own headline numbers (99 percent forecast accuracy for some customers, 3 to 4 times faster counts) are vendor reported and stay out of this page's claims. What is independently observable: the four capabilities exist, three were in early access in July, and none had a GA announcement by July 4. Scene 7 returns to that.</p>
</div>

## Scene 2 — The extension map

Each capability class extends across seven operational domains with different buyers, integrations, and maturity. The matrix below is the July atlas data, kept honest: every cell is graded proven, promising, or mostly marketing, and the grades follow the evidence discipline, not the press releases.

<div class="visual-frame" style="--vf-h:706px; --vf-h-m:906px">
  <iframe
    src="/visuals/ai-ops-execution-layer/extension-matrix.html?embed=1"
    title="Interactive capability by industry matrix. Five AI capability classes cross seven operational domains, each cell graded proven, promising, or marketing. Click a cell for the buyer, workflow, and wedge detail. Filter chips narrow by maturity."
    loading="lazy"
    sandbox="allow-scripts allow-same-origin"
  ></iframe>
</div>

Two readings of the same grid. Read the rows and you see capability maturity: forecasting is proven, actioning is promising, broad agentic claims are mostly marketing. Read the columns and you see domain readiness: grocery replenishment and claims intake are furthest along because the decision loops are dense, measurable, and already digital.

## Scene 3 — A day in the life

Architecture only matters if it changes someone's shift. Five operator personas, each with a before and after, and an honest split of what automates versus what stays human. The after states assume the suggest tier of Scene 6, not full autonomy, because that is what the 2026 evidence supports.

<div class="visual-frame" style="--vf-h:470px; --vf-h-m:980px">
  <iframe
    src="/visuals/ai-ops-execution-layer/operator-stories.html?embed=1"
    title="Persona stories with a before AI and after AI toggle for a restaurant manager, grocery ops manager, warehouse shift lead, fleet ops manager, and claims lead. Each shows the shift timeline, what automates, what stays human, and which KPIs move."
    loading="lazy"
    sandbox="allow-scripts allow-same-origin"
  ></iframe>
</div>

The common shape across all five: the human moves from data gathering and triage to approval and exception judgment. That is also the failure mode. If the system routes too many approvals, the human becomes a rubber stamp with a title, which is why the review budget in Scene 6 is architecture, not UX polish.

## Scene 4 — The reference architecture

The atlas never drew the system. Here it is: four planes, one governed write path. Signals land in a state plane that resolves identities and scores evidence trust. A decision plane runs a cheap deterministic fast path first and reserves LLM reasoning for the ambiguous residue. Every proposed action, from either path, passes through one actuation gateway that knows its risk tier and its earned autonomy status. An oversight plane closes the loop with a budgeted review queue, a dual identity audit trail, and an eval harness that promotes and demotes action categories on evidence.

<div class="visual-frame" style="--vf-h:800px; --vf-h-m:1190px">
  <iframe
    src="/visuals/ai-ops-execution-layer/architecture-console.html?embed=1"
    title="Two tab instrument. Tab one is the interactive four plane reference architecture: edge signals flow into a state plane, then a decision plane with fast and slow paths, then an actuation gateway with risk tiers, then an oversight plane with a budgeted review queue and eval harness. Tab two is the pattern decision walkthrough: answer five force questions and build a live pattern stack with a collapsible comparison matrix."
    loading="lazy"
    sandbox="allow-scripts allow-same-origin"
  ></iframe>
</div>

Three load-bearing choices, each forced by evidence rather than taste:

<div class="callout neutral">
  <strong>Evidence trust scores, not raw completions.</strong>
  <p>Pencil-whipped checklists are a documented phenomenon with known signatures (a 15 minute checklist completed in 2 minutes, temperature logs that never vary). A completion record is a claim, not a fact, so the state plane weights it by its verification signals before anything acts on it.</p>
</div>

<div class="callout neutral">
  <strong>The semantic layer is the only query surface.</strong>
  <p>Frontier models score above 85 percent on toy text-to-SQL benchmarks and drop below 25 percent on Spider 2.0's real enterprise schemas. The natural language analyst reads governed metrics with deterministic joins, and refuses out-of-model questions instead of hallucinating a plausible wrong number.</p>
</div>

<div class="callout alert">
  <strong>Untrusted input is data, never instructions.</strong>
  <p>EchoLeak was a zero-click exfiltration through a production copilot via a crafted email. NIST scale red teaming broke every frontier model, with optimized attacks succeeding 81 percent of the time against detection-based defenses. Containment is architectural: least privilege tools, quarantined parsing, and never combining private data, untrusted content, and an exfiltration channel in one agent context.</p>
</div>

## Scene 5 — Patterns and the decision tree

The agent pattern catalog (single call, prompt chaining, routing, orchestrator workers, evaluator optimizer, autonomous ReAct, HITL checkpoint) sorts cleanly in this domain once you ask where each one earns its cost. Flip the Scene 4 instrument to its second tab, Pattern decision tree, walk the five force questions, and watch the pattern stack assemble. You can also <a href="/visuals/ai-ops-execution-layer/architecture-console.html?tab=patterns" target="_blank" rel="noopener">open the walkthrough full screen</a>.

The verdict the comparison forces: cheap deterministic patterns own the easy majority of signals, reasoning patterns earn their cost only on the hard minority, autonomous ReAct never runs as the top-level controller, and in a domain where actions touch money and physical operations the HITL gateway is not a pattern choice. It is the substrate everything else stands on.

<details>
<summary>Data behind this visual: the pattern verdicts for this domain</summary>
<div style="overflow-x:auto">
<table>
  <thead><tr><th>Pattern</th><th>Role here</th><th>Verdict</th></tr></thead>
  <tbody>
    <tr><td>A · Single call</td><td>Classify one photo, extract one field</td><td>Inner primitive, never an architecture</td></tr>
    <tr><td>B · Prompt chaining</td><td>Document flows: parse, extract, validate, stage</td><td>Slow path backbone</td></tr>
    <tr><td>C · Routing</td><td>Signal class to specialist handler</td><td>The front door, essential at ops volumes</td></tr>
    <tr><td>D · Orchestrator workers</td><td>Cross-system exception diagnosis in parallel</td><td>Core slow path shape</td></tr>
    <tr><td>E · Evaluator optimizer</td><td>Contested claims, high value procurement</td><td>Long tail only, earns its loop cost there</td></tr>
    <tr><td>F · Autonomous ReAct</td><td>Bounded exploration inside a workflow step</td><td>Never top level. The pass^8 collapse is why</td></tr>
    <tr><td>G · HITL checkpoint</td><td>The actuation gateway's suggest tier</td><td>The substrate, budgeted per Scene 6</td></tr>
  </tbody>
</table>
</div>
</details>

## Scene 6 — The autonomy ladder

The part everyone hand-waves, made explicit. Three rungs per action category: shadow (decide and log, never act), suggest (staged action plus one human approval), auto (act, with sampled human QA). Promotion requires shadow-mode precision above the human baseline with statistical confidence on that specific category. Any metric drop demotes instantly. The same ladder appears independently in ServiceNow guidance, LangGraph practitioner patterns, and Afresh's human-executes model, which is strong evidence it is the de facto safety pattern of the field.

<div class="visual-frame" style="--vf-h:700px; --vf-h-m:1540px">
  <iframe
    src="/visuals/ai-ops-execution-layer/confidence-gate.html?embed=1"
    title="Interactive autonomy ladder and review budget. Action categories sit on shadow, suggest, and auto rungs with promotion and demotion mechanics. A volume slider shows the review budget: push approvals past the rubber stamp threshold and the noisiest category demotes to shadow."
    loading="lazy"
    sandbox="allow-scripts allow-same-origin"
  ></iframe>
</div>

Why not gate on model confidence? Because verbalized confidence is systematically miscalibrated (models cluster at 0.9 regardless of accuracy), logprobs degrade on free-form multi-step outputs, and no credible production system found in the research trusts "the model said 0.95" for auto-act. What works is duller: composite signals (retry counts, tool call counts, policy hits, multi-sample agreement where a wrong action is expensive), thresholds tuned on a labeled review set, and random sampling of auto-acted items to track the silent failure rate, meaning confidently wrong, as its own metric.

<div class="callout alert">
  <strong>The budget is the mechanism.</strong>
  <p>Capping approvals below the rubber stamp threshold does not just protect reviewers. It creates the back pressure that forces alert stewardship to happen: when the queue overflows, the noisiest category loses its suggest status instead of the humans losing their attention. Healthcare learned this the hard way with 90 to 95 percent override rates. Ops does not have to.</p>
</div>

## Scene 7 — What ten weeks changed

The July brief was written on July 10. This design pass re-checked every thesis against the May 1 to July 4 window. The verdicts: the execution shift went from differentiating to consensus, actioning arrived on schedule and in ordering first, the moat argument sharpened, and voice earned a cautious confirm while its first wave's obituary was still being written.

Five theses went into the window. Here is each instrument with its verdict and its dated event log. Vendor reported figures carry a <span class="cr-v">V</span> badge and stay out of headline claims.

<div class="cr-instrument-grid">
  <div class="cr-instrument">
    <div class="cr-instrument-head">T1 &middot; Reporting to execution <span class="cr-verdict" data-s="ok">CONFIRMED</span></div>
    <p>Now every mega vendor keynote. No longer differentiating. The positioning moves to the governed write path.</p>
    <details class="cr-log">
      <summary>Event log, 3 signals</summary>
      <span class="cr-log-line"><b>MAY 05</b> ServiceNow Knowledge 2026. IT specialist agents GA June, security and risk GA September. ServiceNow positions itself as governor of every third party agent.</span>
      <span class="cr-log-line"><b>MAY 15</b> SAP Sapphire ships the Autonomous Suite. 50 plus Joule assistants orchestrating 200 plus agents, Claude as a primary reasoning model, A2A interop with Google Cloud and Microsoft.</span>
      <span class="cr-log-line"><b>JUN 02</b> Microsoft Build. Agent Framework hits production, Windows ships an Agent Runtime and Agent Store, computer using agents GA for legacy ops systems.</span>
    </details>
  </div>
  <div class="cr-instrument">
    <div class="cr-instrument-head">T2 &middot; Workflow native wins <span class="cr-verdict" data-s="ok">CONFIRMED</span></div>
    <p>Confirmed with counter pressure. Horizontals are absorbing workflow reach through MCP and A2A interop.</p>
    <details class="cr-log">
      <summary>Event log, 3 signals</summary>
      <span class="cr-log-line"><b>MAY 12</b> Restaurant365 launches R365 AI over the full restaurant P&amp;L with an AI Advisor and one click AI Scheduling. A direct workflow native counter to Crunchtime and PAR.</span>
      <span class="cr-log-line"><b>JUN 29</b> Siemens and IFS partner on closed loop digital twins. IFS Cloud 25R2 ships Loops Digital Workers. The pitch is industrial determinism, not model magic.</span>
      <span class="cr-log-line"><b>ALL WINDOW</b> The absence signal. Crunchtime ships no GA for AI Analyst, AI Actions, or Photo Intelligence, two months after early access launch.</span>
    </details>
  </div>
  <div class="cr-instrument">
    <div class="cr-instrument-head">T3 &middot; Moat is coverage plus data <span class="cr-verdict" data-s="warn">SHARPENED</span></div>
    <p>MCP and A2A commoditize connectivity. The moat sharpens to proprietary workflow data plus trust and guardrails.</p>
    <details class="cr-log">
      <summary>Event log, 2 signals</summary>
      <span class="cr-log-line"><b>MAY 07</b> PAR Q1 earnings. Revenue 124M up 19 percent, ARR 330M, both SEC filed. PAR Intelligence live at about 1,700 sites <span class="cr-v">V</span> with a Burger King rollout at 400 plus sites per month <span class="cr-v">V</span>.</span>
      <span class="cr-log-line"><b>JUN 02</b> Microsoft Build makes A2A interop span Microsoft, Claude Code, and Gemini Enterprise. Connectivity stops being a moat.</span>
    </details>
  </div>
  <div class="cr-instrument">
    <div class="cr-instrument-head">T4 &middot; Voice and vision practical <span class="cr-verdict" data-s="warn">MIXED</span></div>
    <p>The second wave got funded while the first wave's obituary ran in the same article. Closed vocabulary command and confirm is the survivable form.</p>
    <details class="cr-log">
      <summary>Event log, 1 signal</summary>
      <span class="cr-log-line"><b>MAY 26</b> Arc raises 10.76M from a16z for drive thru voice, claiming over 95 percent order accuracy <span class="cr-v">V</span>. The same Fortune article catalogs the failed first wave: McDonald's and IBM terminated, Presto's SEC fraud charges, about 21 percent of AI orders still needing human help.</span>
    </details>
  </div>
  <div class="cr-instrument">
    <div class="cr-instrument-head">T5 &middot; Next wave is actioning <span class="cr-verdict" data-s="ok">CONFIRMED</span></div>
    <p>Arrived on schedule, in ordering first. The beachhead is staged, approvable ordering, which is the suggest tier of Scene 6.</p>
    <details class="cr-log">
      <summary>Event log, 3 signals</summary>
      <span class="cr-log-line"><b>MAY 19</b> Blue Yonder ICON. NVIDIA model factory, cognitive agents with agentic supplier order approvals, and an AI agent testing system, a maturity signal in itself.</span>
      <span class="cr-log-line"><b>JUN 15</b> Afresh lands Grocery Outlet with fresh, center store, and general merchandise ordering in one deployment. Order time halved <span class="cr-v">V</span>, sales up 3 percent <span class="cr-v">V</span>, shrink down 25 percent <span class="cr-v">V</span>.</span>
      <span class="cr-log-line"><b>JUN</b> Iceland moves invent.ai from category pilots to all SKU replenishment. A grocer trusting the whole estate is the promotion step of the autonomy ladder at retail scale.</span>
    </details>
  </div>
  <div class="cr-instrument">
    <div class="cr-instrument-head">CAUTION &middot; Agent washing <span class="cr-verdict" data-s="bad">STANDING</span></div>
    <p>Gartner's anchor still stands. Of thousands of vendors claiming agentic AI, only about 130 were assessed as real, and over 40 percent of agentic projects are predicted canceled by end of 2027. The narrative swung to execution in this window. Verified production evidence stayed thin.</p>
  </div>
</div>

The uncomfortable findings the refresh surfaced, stated plainly:

- Crunchtime, the April  anchor, announced no GA for its early access AI features in the entire window, while PAR reported around 1,700 live PAR Intelligence sites on an SEC-filed earnings call. The Aril read of that rivalry inverts.
- The first voice wave demonstrably failed (the McDonald's and IBM drive-thru test ended below human accuracy, Presto drew SEC fraud charges) in the same weeks the second wave got funded. The survivable form is closed vocabulary command and confirm, which warehouse voice picking proved over twenty years.
- One July citation could not be re-verified and collides with a similarly named product. It is flagged in the ledger rather than quietly reused.
- Gartner's agent-washing warning still stands unrefreshed: of thousands of vendors claiming agentic AI, only around 130 were assessed as real, and over 40 percent of agentic projects are predicted to be canceled by end of 2027.

The July atlas also scored the vendor field itself. That comparison never made it onto this page until now, so here it is with the ten week update folded in. Scores are the July analyst-assigned 1 to 10 grades from the atlas, illustrative rather than measured, and every deployment figure is vendor reported.

<div class="cr-vendor-grid">
  <div class="cr-vendor-card">
    <header><b>Crunchtime</b><span>Restaurant operations suite</span></header>
    <div class="cr-score-row"><span class="cr-chip">Base <b>9</b></span><span class="cr-chip">Workflow <b>9</b></span><span class="cr-chip">Action <b>8</b></span><span class="cr-chip">Proof <b>7</b></span></div>
    <p>Opening: go deeper on one wedge like store floor execution or assistant manager workflows across a broader retail base.</p>
    <p class="cr-update"><b>JUL UPDATE</b> No GA announced for its early access AI features in the window. The July anchor is now the laggard on proof.</p>
  </div>
  <div class="cr-vendor-card">
    <header><b>PAR</b><span>Multi unit operator platform</span></header>
    <div class="cr-score-row"><span class="cr-chip">Base <b>9</b></span><span class="cr-chip">Workflow <b>8</b></span><span class="cr-chip">Action <b>7</b></span><span class="cr-chip">Proof <b>5</b></span></div>
    <p>Opening: the broad platform story leaves room for narrower vendors with stronger proof in one workflow.</p>
    <p class="cr-update"><b>JUL UPDATE</b> About 1,700 live PAR Intelligence sites reported on an SEC filed earnings call <span class="cr-v">V</span>. July's proof grade of 5 inverted.</p>
  </div>
  <div class="cr-vendor-card">
    <header><b>Toast</b><span>Hospitality operating system</span></header>
    <div class="cr-score-row"><span class="cr-chip">Base <b>9</b></span><span class="cr-chip">Workflow <b>8</b></span><span class="cr-chip">Action <b>7</b></span><span class="cr-chip">Proof <b>7</b></span></div>
    <p>Opening: strongest at the transaction layer, room above it for compliance, inventory, and multi site execution.</p>
    <p class="cr-update"><b>JUL UPDATE</b> No window signal that it moved beyond POS adjacent AI.</p>
  </div>
  <div class="cr-vendor-card">
    <header><b>AAR Airvoyant</b><span>Agentic procurement for aviation</span></header>
    <div class="cr-score-row"><span class="cr-chip">Base <b>7</b></span><span class="cr-chip">Workflow <b>8</b></span><span class="cr-chip">Action <b>9</b></span><span class="cr-chip">Proof <b>6</b></span></div>
    <p>Opening: the procurement pattern can travel to other sectors where email driven sourcing still dominates.</p>
    <p class="cr-update"><b>JUL UPDATE</b> One July citation could not be re-verified and is flagged in the ledger rather than reused.</p>
  </div>
  <div class="cr-vendor-card">
    <header><b>Treon</b><span>AI native maintenance orchestration</span></header>
    <div class="cr-score-row"><span class="cr-chip">Base <b>6</b></span><span class="cr-chip">Workflow <b>8</b></span><span class="cr-chip">Action <b>8</b></span><span class="cr-chip">Proof <b>6</b></span></div>
    <p>Opening: maintenance stays open because incumbents stop at predictive alerts instead of owning dispatch.</p>
    <p class="cr-update"><b>JUL UPDATE</b> No contradicting signal. The Siemens and IFS moves raise incumbent pressure on this wedge.</p>
  </div>
  <div class="cr-vendor-card">
    <header><b>invent.ai / Afresh class</b><span>Grocery native planning and replenishment AI</span></header>
    <div class="cr-score-row"><span class="cr-chip">Base <b>7</b></span><span class="cr-chip">Workflow <b>9</b></span><span class="cr-chip">Action <b>8</b></span><span class="cr-chip">Proof <b>8</b></span></div>
    <p>Opening: the next wedge is store floor execution and multi department follow through, not better forecasting.</p>
    <p class="cr-update"><b>JUL UPDATE</b> Afresh activity in the window confirms that controlling replenishment decisions is the strong position.</p>
  </div>
</div>

The red team pass on our own design produced eight numbered critiques (the full C1 to C8 list is in the companion design record). The two that changed the architecture: the gateway must attach as a governance layer over suite vendors' own write paths rather than pretending to replace them, and low volume high value action categories should be designed as permanently human approved instead of pretending they will ever accumulate promotion evidence.

## Scene 8 — Opportunities and the evidence ledger

The ranked market opportunities from the July atlas survive the design pass, with one repositioning: every opportunity is now readable as a bet on which plane of the reference architecture you own. Store floor execution is a frontline surface bet. Logistics exceptions is a decision plane bet. Claims intelligence is a slow path bet. Procurement agents are an actuation gateway bet.

<div class="cr-opp-grid">
  <div class="cr-opp-card">
    <header><span class="cr-opp-rank">01</span><b>Store floor AI execution</b><span class="cr-plane">Frontline surface</span></header>
    <p>Hands free issue resolution and task execution for associates, expanding from guidance to task generation to exception resolution.</p>
    <details><summary>Buyer, moat, competitors</summary>
      <dl>
        <dt>Buyer</dt><dd>COO, store operations, retail IT</dd>
        <dt>Moat</dt><dd>Store SOPs, task history, device access, workflow outcomes</dd>
        <dt>Wedge</dt><dd>Hands free issue resolution and task execution for associates</dd>
        <dt>Competitors</dt><dd>VoCoVo, Tote, FORM, PAR, Toast, Microsoft frontline stack</dd>
      </dl>
    </details>
  </div>
  <div class="cr-opp-card">
    <header><span class="cr-opp-rank">02</span><b>Logistics exception management</b><span class="cr-plane">Decision plane</span></header>
    <p>Prioritize and resolve high cost exceptions rather than adding another visibility dashboard, then earn low risk zero touch execution.</p>
    <details><summary>Buyer, moat, competitors</summary>
      <dl>
        <dt>Buyer</dt><dd>VP Transportation, control tower lead</dd>
        <dt>Moat</dt><dd>Shipment events, cost and service tradeoffs, carrier behavior history</dd>
        <dt>Wedge</dt><dd>Resolve high cost exceptions, not another dashboard</dd>
        <dt>Competitors</dt><dd>Oracle, IFS, project44 ecosystem, Shipsy, TMS incumbents</dd>
      </dl>
    </details>
  </div>
  <div class="cr-opp-card">
    <header><span class="cr-opp-rank">03</span><b>Claims and document intelligence</b><span class="cr-plane">Slow path</span></header>
    <p>One claim type or one document class with clear cycle time improvement, expanding to an audit ready workflow layer.</p>
    <details><summary>Buyer, moat, competitors</summary>
      <dl>
        <dt>Buyer</dt><dd>Operations shared services, claims leader, compliance</dd>
        <dt>Moat</dt><dd>Document corpus, policy rules, routing history, audit context</dd>
        <dt>Wedge</dt><dd>One claim type with measurable cycle time gains</dd>
        <dt>Competitors</dt><dd>ServiceNow, Appian, Pega, horizontal OCR vendors</dd>
      </dl>
    </details>
  </div>
  <div class="cr-opp-card">
    <header><span class="cr-opp-rank">04</span><b>Mid market procurement agents</b><span class="cr-plane">Actuation gateway</span></header>
    <p>High friction categories with repeat sourcing and measurable savings, expanding from comparison to negotiation to autonomous ordering.</p>
    <details><summary>Buyer, moat, competitors</summary>
      <dl>
        <dt>Buyer</dt><dd>Procurement leader, operations finance, category manager</dd>
        <dt>Moat</dt><dd>Supplier connectivity, quote history, policy rules, historical performance</dd>
        <dt>Wedge</dt><dd>High friction categories with repeat sourcing</dd>
        <dt>Competitors</dt><dd>SAP, Oracle, Coupa, vertical procurement startups</dd>
      </dl>
    </details>
  </div>
  <div class="cr-opp-card">
    <header><span class="cr-opp-rank">05</span><b>Labor and productivity orchestration</b><span class="cr-plane">Oversight plane</span></header>
    <p>One painful workflow such as maintenance dispatch or store audit follow up, expanding to auto created tasks and closed loop optimization.</p>
    <details><summary>Buyer, moat, competitors</summary>
      <dl>
        <dt>Buyer</dt><dd>Operations excellence, facilities, field service, restaurant ops</dd>
        <dt>Moat</dt><dd>Task history, schedule data, SOPs, work order state</dd>
        <dt>Wedge</dt><dd>Maintenance dispatch or store audit follow up</dd>
        <dt>Competitors</dt><dd>Crunchtime, PAR, Treon, Fexa, CMMS vendors</dd>
      </dl>
    </details>
  </div>
  <div class="cr-opp-card">
    <header><span class="cr-opp-rank">06</span><b>Vertical CX transaction agents</b><span class="cr-plane">Frontline surface</span></header>
    <p>One transactional workflow such as delivery exceptions or simple refunds, expanding from assist to resolve to cross team orchestration.</p>
    <details><summary>Buyer, moat, competitors</summary>
      <dl>
        <dt>Buyer</dt><dd>CX leader, digital operations</dd>
        <dt>Moat</dt><dd>CRM, OMS, payment, policy, and fulfillment context</dd>
        <dt>Wedge</dt><dd>Delivery exceptions or simple refunds first</dd>
        <dt>Competitors</dt><dd>Salesforce, NICE, Genesys, hyperscaler ecosystems</dd>
      </dl>
    </details>
  </div>
</div>

And the discipline that holds the whole page together: the graded ledger. Every non-trivial claim, its source, its confidence grade, and whether a vendor reported number was excluded from headline claims. This is the difference between a defensible design and a slide of press releases.


<div class="callout warm">
  <strong>The honest scope</strong>
  <p>What a first quarter actually buys: one domain, conformed identities for its entities only, fast path exception detection with stewardship metrics, the gateway in shadow and suggest for two or three action categories, the budgeted queue, the audit trail, and the traces-to-evals pipeline. No auto-act in wave one. Not bought at any price this year: the NL analyst without a semantic layer, fleet learning without data rights contracts, autonomous end to end execution without benchmarks that do not yet exist, and anything described as an agentic OS.</p>
</div>
