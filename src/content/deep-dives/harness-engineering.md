---
title: Harness Engineering — The Discipline Around the Model
summary: "Agent = Model + Harness. The model does the thinking; the harness decides what's true, what tools exist, what gets verified, and what survives a crash. Ten scenes descend from a context map to the wire, and the August 2026 refresh answers a harder question than the original: now that two platforms ship three of the five layers as runtime features, which layers are still yours?"
pubDate: 2026-04-30
updatedDate: 2026-08-25
featured: true
listed: true
template: tower
bpEyebrow: Instrument Log HE-01
bpTitle: Harness Engineering
bpSubtitle: The discipline around the model — five layers, five owners, and the two that are still yours.
bpCoords:
  - Domain · Agentic SDLC, vendor-neutral
  - Scenes · 10
  - Instruments · 10
  - Refreshed · 25 Aug 2026
geography: Vendor-neutral, generic enterprise
horizon: 1 to 3 years
tags:
  - harness engineering
  - ai agents
  - sdlc
  - claude
  - codex
  - mcp
audience: Exec leaders, tech leads, and engineers
readTime: 16 min read
---

<div class="note-panel">
  <p><strong>One-line idea</strong>: <code>Agent = Model + Harness</code>. The model is the brain; the harness is the skeleton, memory, hands, immune system, and nervous system around it.</p>
  <p><strong>Who this is for</strong>: an exec who needs the analogy and the decision (scenes 1-3); a tech lead who needs the framework (scenes 4-5); an engineer who needs the wire and the patterns (scenes 6 onward).</p>
  <p><strong>Vendor stance</strong>: neutral. Examples reference OpenAI Codex, Anthropic Claude Code and Managed Agents, Microsoft Agent Framework, MCP, LangChain, Vercel d0, and HumanLayer where the public evidence comes from those teams.</p>
  <p style="margin-top: 4px;"><strong>Refreshed 25 August 2026.</strong> The original page's newest evidence was April 2026. Five developments since have changed the answer, not just the detail — the MCP stateless spec, a second platform reaching GA, native million-token context, measured containment data, and a result showing the harness itself confounds benchmarks. What changed, and where, is called out in place.</p>
  <p style="margin-top: 4px;"><strong>Prefer a slide deck?</strong> ▶ Open in Present mode — single-viewport, keyboard-navigable.</p>
  <p style="margin-top: 4px;"><strong>Sequel:</strong> Loop Engineering — Designing the Loops That Prompt the Agents — how the harness gets run on a loop.</p>
  <p style="margin-top: 4px;"><strong>Reading the earlier framing?</strong> The <a href="/deep-dives/harness-engineering-foundations">April 2026 version</a> is preserved unchanged, with its original ten scenes.</p>
</div>

<div class="signal-grid">
  <div class="signal-card">
    <span class="signal-label">The shift</span>
    <strong>Leverage moved from the model to the harness.</strong>
    <p>In 2024 the conversation was prompts. Through 2025 it was context. By early 2026 the leading teams stopped arguing about either and started shipping a different artifact — the harness.</p>
  </div>
  <div class="signal-card">
    <span class="signal-label">Hard evidence</span>
    <strong>+13.7 points on Terminal Bench, harness-only.</strong>
    <p>LangChain raised a coding agent from 52.8% to 66.5% by tweaking the harness alone — same model. None of the case studies here beat the next model; they beat the previous version of themselves. Read with the caveat in Scene 3: a harness-only delta is a claim about a system, not a clean model comparison.</p>
  </div>
  <div class="signal-card">
    <span class="signal-label">The 2026 narrowing</span>
    <strong>Two platforms now cover three of the five layers.</strong>
    <p>Anthropic Managed Agents (April) and the Microsoft Agent Framework Harness (GA, 22 July 2026) both ship Context, Execution and Lifecycle as runtime features. The durable developer surface has narrowed to <strong>L1 environment design</strong> and <strong>L4 evidence</strong> — which is exactly where your next dollar should go.</p>
  </div>
  <div class="signal-card">
    <span class="signal-label">The compounding rule</span>
    <strong>The Agentic Principle.</strong>
    <p>"Anytime an agent makes a mistake, engineer it so the agent never makes that mistake again" (Mitchell Hashimoto, February 2026). A team that runs for six months ends up with a harness no one else can copy quickly.</p>
  </div>
</div>

<nav class="reading-map" aria-label="Reading map">
  <p class="reading-map-label">Reading map · 10 scenes · high altitude to the wire</p>
  <div class="reading-map-grid">
    <a class="reading-link" href="#scene-1--the-context-map"><strong>1 · Context map</strong><span>Where the model actually sits.</span></a>
    <a class="reading-link" href="#scene-2--without-vs-with"><strong>2 · Without vs With</strong><span>Same brain, two outcomes.</span></a>
    <a class="reading-link" href="#scene-3--why-now"><strong>3 · Why now</strong><span>The evidence, and its asterisk.</span></a>
    <a class="reading-link" href="#scene-4--the-reference-architecture"><strong>4 · Reference architecture</strong><span>Five layers, named components.</span></a>
    <a class="reading-link" href="#scene-5--one-governed-run"><strong>5 · One governed run</strong><span>Control flow, loops and exits.</span></a>
    <a class="reading-link" href="#scene-6--deployment-and-the-wire"><strong>6 · Deployment + wire</strong><span>What you actually stand up.</span></a>
    <a class="reading-link" href="#scene-7--failure-modes"><strong>7 · Failure modes</strong><span>9 failures mapped to layers.</span></a>
    <a class="reading-link" href="#scene-8--three-decision-lanes"><strong>8 · Decision lanes</strong><span>Agentic vs deterministic vs human.</span></a>
    <a class="reading-link" href="#scene-9--implementation-playbook"><strong>9 · Playbook</strong><span>One min-viable move per layer.</span></a>
    <a class="reading-link" href="#scene-10--vocabulary"><strong>10 · Vocabulary</strong><span>22 terms, 3 deprecated.</span></a>
  </div>
</nav>

<div class="callout warm">
  <strong>How to read this page</strong>
  <p>The instruments descend in altitude. Scene 1 is the context map — the harness and everything it touches. Scene 4 is the reference architecture. Scene 5 is the control flow of one run. Scene 6 is the wire. Click anything inside an instrument to drill in. An exec can stop after Scene 3, a tech lead after Scene 5, an engineer should reach Scene 9.</p>
</div>

## Scene 1 — The context map

`Agent = Model + Harness`. But "harness" is only a useful word once you can see what it is adjacent to. Before any internals: here is the model in its real environment, with every trust boundary it crosses drawn explicitly. Nine systems, nine labelled edges, three nested trust frames — untrusted model output inside sandboxed execution inside the enterprise network.

<p class="tw-fig-claim">The harness is the only component that talks to all of the model, the tools, the sandbox, the policy store and the evidence log — which is why it, and not the model, is where governance lands.</p>

<div class="visual-frame" id="fig-context-map" tabindex="-1" data-fig="Context map — the harness and its nine neighbours" style="--vf-h:640px">
  <iframe
    src="/visuals/harness-engineering/harness-context-map.html?embed=1"
    title="Context map — the harness runtime at the centre, with human owner, trigger surface, model inference API, MCP tool servers, per-run sandbox, enterprise systems of record, policy and identity, and the evidence store around it. Each edge is labelled with the protocol artifact that crosses it, and three nested dashed frames mark the trust boundaries."
    loading="lazy"
    sandbox="allow-scripts allow-same-origin"
  ></iframe>
</div>

> When everything is harness, nothing is. The word "harness" today is where "networking" was before the OSI model. Everyone agreed networks mattered, but nobody could have a precise conversation about which part was broken.

The objection writes itself. The rest of this page answers it with a precise way to talk about the parts — and, since July 2026, with a protocol precise enough to label the edges.

## Scene 2 — Without vs With

Same model. Same brain. Two completely different outcomes. Run the same task twice: once with the harness switched off, once with it on. Off, the agent drifts, loops and bluffs because nothing bounds it. On, the same reasoning passes through steering, brakes, a dashboard, guardrails and a review stop before it reaches anything that matters.

<p class="tw-fig-claim">Nothing about the model changes between these two runs. Every difference on the screen is something the harness did.</p>

<div class="visual-frame" id="fig-without-with" tabindex="-1" data-fig="Same run, harness off vs harness on" style="--vf-h:600px">
  <iframe
    src="/visuals/harness-engineering/without-vs-with.html?embed=1"
    title="Two replays of the same agent run — harness off and harness on — stepping through the same task and diverging at the points where a harness layer would have intervened."
    loading="lazy"
    sandbox="allow-scripts allow-same-origin"
  ></iframe>
</div>

The model isn't the bottleneck. The missing harness is.

## Scene 3 — Why now

Independent teams, very different setups, same conclusion: **the harness moves the needle far more than the next model upgrade does.** None of them beat a frontier model — they beat the previous version of themselves by re-engineering the system around the same model. The 2026 rows add something the earlier ones lacked: measured operational data rather than benchmark deltas.

<p class="tw-fig-claim">Anthropic's containment work put a number on consent fatigue — users approved about 93% of permission prompts — and showed that environmental controls cut prompt volume by 84%, which reframes L1 from writing rules to shaping the environment.</p>

<div class="visual-frame" id="fig-evidence" tabindex="-1" data-fig="The evidence, and the confound" style="--vf-h:560px">
  <iframe
    src="/visuals/harness-engineering/evidence-chart.html?embed=1"
    title="Evidence chart — harness-only improvements reported by independent teams, with the 2026 operational data from Anthropic's containment work and an annotation marking the harness-induced belief divergence confound."
    loading="lazy"
    sandbox="allow-scripts allow-same-origin"
  ></iframe>
</div>

<div class="callout warm">
  <strong>The asterisk that arrived in July 2026</strong>
  <p>Harness-induced belief divergence, established in July 2026 research, shows that action restrictions, repair handling, verification choices and selective evidence logging can leave terminal success rates intact while changing the beliefs the agent carries into later decisions. Two consequences: <strong>report harness configuration as an experimental variable</strong>, and <strong>never compare scores across harnesses</strong>. A "+13.7 points, harness-only" result is a true claim about a system — not a clean measurement of a model.</p>
</div>

## Scene 4 — The reference architecture

The cleanest formalization is five layers, each with a different purpose, owner and rate of change. This instrument draws them as an actual reference architecture — named shipping components, an ownership axis, and the feedback edge most diagrams omit. **Click any band** to open its components. **Switch the platform toggle** to see which components you build and which you inherit.

<p class="tw-fig-claim">On a managed platform, L2, L3 and L5 arrive as runtime features. What remains yours in every configuration is L1 — the environment — and L4 — the evidence.</p>

<div class="visual-frame" id="fig-reference-architecture" tabindex="-1" data-fig="Five-layer reference architecture, build vs inherit" style="--vf-h:760px">
  <iframe
    src="/visuals/harness-engineering/harness-reference-architecture.html?embed=1"
    title="Five-layer harness reference architecture — Constraint, Context, Execution, Verification and Lifecycle as horizontal bands with named components, an owner and rate-of-change axis, a cross-cutting model column, and the Principle feedback arc from Verification back to Constraint. A platform toggle recolours every component as build-it-yourself or inherited."
    loading="lazy"
    sandbox="allow-scripts allow-same-origin"
  ></iframe>
</div>

<div class="callout green">
  <strong>What the platforms now cover — and what they don't</strong>
  <p>Two independent platforms have converged on the same three layers. Anthropic Managed Agents (April 2026) and the Microsoft Agent Framework Harness (GA, 22 July 2026) both ship durable session logs, automatic compaction, sandboxed execution, plan/execute modes, crash recovery and approval heuristics — that is <strong>L2, L3 and L5</strong> as runtime features rather than developer code. Note what neither ships: a policy for <em>your</em> codebase, and evidence that <em>your</em> definition of correct was met. <strong>L1 and L4 stay yours.</strong> Hand-rolling compaction and history persistence in 2026 is increasingly hard to justify; hand-rolling your verification loop is still the job.</p>
</div>

## Scene 5 — One governed run

What does a run actually look like when the harness is doing its job? Not nine friendly steps — a control flow, with swimlanes, decision diamonds, a compaction loop-back, a retry cap and four distinct terminal states. Step through it, or switch scenario to watch a denied tool call and a failed verification take different paths.

<p class="tw-fig-claim">Three of the branches in this diagram did not exist in the April version of this page: the tool-manifest cache check, the mid-call human interrupt that resumes rather than restarts, and the compaction loop-back.</p>

<div class="visual-frame" id="fig-run-controlflow" tabindex="-1" data-fig="Control flow of one governed run" style="--vf-h:800px">
  <iframe
    src="/visuals/harness-engineering/governed-run-controlflow.html?embed=1"
    title="Control-flow diagram of one governed agent run across five swimlanes — human, harness control loop, model, MCP server and sandbox, and evidence store — with decision diamonds for tool-manifest cache hit, tool-use presence, authorisation, mid-call human input, context budget and verification pass, plus four terminal states and the Principle feedback edge."
    loading="lazy"
    sandbox="allow-scripts allow-same-origin"
  ></iframe>
</div>

The shape of a real run, not a demo. Note the edge nobody draws: every denial, abort and failed verification feeds back into the policy store as a new rule. That edge is the Principle, mechanised.

## Scene 6 — Deployment and the wire

Altitude drops one more time. On the left, the deployment topology across three trust zones — who runs where, and where the egress boundary sits. On the right, the same participants as a sequence diagram with the real headers on the messages. Click either half; the other follows.

<p class="tw-fig-claim">The MCP specification of 28 July 2026 removed the session handshake and the <code>Mcp-Session-Id</code> header. Toggling this instrument to the legacy transport re-adds the sticky router and the session-affinity edge — which is exactly what the stateless core bought you.</p>

<div class="visual-frame" id="fig-deployment" tabindex="-1" data-fig="Deployment topology and the wire sequence" style="--vf-h:820px">
  <iframe
    src="/visuals/harness-engineering/harness-deployment-sequence.html?embed=1"
    title="Two synchronised halves — a deployment topology across developer/CI, isolation and service trust zones with an explicit egress broker, and a sequence diagram over the same participants showing the real HTTP headers, the tool manifest cache response, the mid-call input_required branch and the final evidence record."
    loading="lazy"
    sandbox="allow-scripts allow-same-origin"
  ></iframe>
</div>

<div class="callout">
  <strong>What the July 2026 MCP spec changed for L3</strong>
  <p>The 28 July 2026 specification made four things concrete that used to be design choices. The protocol core is <strong>stateless</strong> — the <code>initialize</code> handshake and <code>Mcp-Session-Id</code> are gone, so remote servers sit behind ordinary load balancers with no sticky sessions. Routing moved into <strong>headers</strong> (<code>Mcp-Method</code>, <code>Mcp-Name</code>), so a gateway can authorize and route without parsing the body. <code>tools/list</code> results became <strong>cacheable</strong> via <code>ttlMs</code> and <code>cacheScope</code>, which turns tool-surface management into a caching and versioning problem instead of a per-session token cost. And <strong>MRTR</strong> lets a server return <code>input_required</code> mid-call, making human-in-the-loop a protocol primitive that resumes the same call rather than restarting it. Roots, Sampling, Logging and the legacy HTTP+SSE transport are deprecated on a twelve-month window — if you built on them, migration is now a named L3 workstream.</p>
</div>

## Scene 7 — Failure modes

When the harness is missing a layer, specific failures show up in production. Tap any failure to see the symptom you'd recognize and the layer that should have caught it, then jump straight to that layer in the reference architecture. **Most teams fight the symptoms; the harness fights the root cause.**

<p class="tw-fig-claim">Every failure on this board is a missing layer, not a weak model. That is the diagnostic value of naming the five.</p>

<div class="visual-frame" id="fig-failure-modes" tabindex="-1" data-fig="Nine failure modes, mapped to layers" style="--vf-h:620px">
  <iframe
    src="/visuals/harness-engineering/failure-modes.html?embed=1"
    title="Nine production failure modes mapped to the five harness layers, each with the symptom an operator would recognise and a deep link into the responsible layer of the reference architecture."
    loading="lazy"
    sandbox="allow-scripts allow-same-origin"
  ></iframe>
</div>

If you've watched any of these happen in production, you've seen exactly which layer was empty.

## Scene 8 — Three decision lanes

The right boundary is not "AI or no AI." It's three lanes — **Agentic** for adaptive tool-using work, **Deterministic** for known-path rule-heavy work, and **Human authority** for approval, exceptions and risk acceptance. A harness only earns its keep in lane 1. Click the attributes that describe your workload and watch the lane resolve.

<p class="tw-fig-claim">Most harness overspend is a lane error: building five layers around work that was always a script.</p>

<div class="visual-frame" id="fig-decision-lanes" tabindex="-1" data-fig="Which lane does this workload belong in?" style="--vf-h:640px">
  <iframe
    src="/visuals/harness-engineering/decision-lanes.html?embed=1"
    title="Interactive lane classifier — the reader selects workload attributes such as path variability, tool breadth, reversibility and audit requirement, and the correct lane of Agentic, Deterministic or Human authority resolves with its reasoning."
    loading="lazy"
    sandbox="allow-scripts allow-same-origin"
  ></iframe>
</div>

Picking the wrong lane is how teams overspend on harnesses for work that should have been a script — or quietly hand authority to an agent that should have stayed with a human.

## Scene 9 — Implementation playbook

One minimum-viable move per layer. Click any layer tab to see the goal, two or three example patterns, the anti-pattern that wastes everyone's time, and a code or config example you can ship this sprint.

<p class="tw-fig-claim">The 2026 edit to this playbook is subtractive for L2, L3 and L5 — stop building what the runtime now gives you — and additive for L1 and L4.</p>

<div class="visual-frame" id="fig-playbook" tabindex="-1" data-fig="Minimum viable move, per layer" style="--vf-h:640px">
  <iframe
    src="/visuals/harness-engineering/playbook-visual.html?embed=1"
    title="Tabbed implementation playbook — for each of the five layers, the goal, example patterns, the anti-pattern, and a shippable code or configuration example."
    loading="lazy"
    sandbox="allow-scripts allow-same-origin"
  ></iframe>
</div>

<div class="thesis-grid">
  <div class="thesis-card">
    <em>L4 first, everywhere</em>
    <strong>A verification loop moves the needle 2-3×.</strong>
    <p>Boris Cherny on Claude Code: give the agent a way to verify its work and the feedback loop will 2-3× the quality of the final result. A pre-stop hook that runs your existing test command and exits non-zero on failure is the cheapest implementation of that loop — and it is the one thing no platform can ship for you, because only you know what correct means here.</p>
  </div>
  <div class="thesis-card">
    <em>L1 is now environmental</em>
    <strong>Shape the environment before you write the rule.</strong>
    <p>Anthropic's containment data reframes this layer. Users approved ~93% of permission prompts, so prompting is not a control — but adding environmental controls cut prompt volume 84%, and auto mode caught ~83% of overeager behaviour pre-execution at ~0.4% false blocks on benign commands. The measure of a good L1 is <strong>prompts per run</strong>, not rules written.</p>
  </div>
  <div class="thesis-card">
    <em>L2 — never trust LLM-written agentfiles</em>
    <strong>Hand-written and short.</strong>
    <p>An ETH Zurich benchmark (138 tasks across 12 repositories) found LLM-generated agentfiles slightly <em>hurt</em> performance while costing 20%+ more in tokens. HumanLayer's working CLAUDE.md is under 60 lines. With a million tokens of native context available, this result matters more, not less: the constraint was never capacity, it was relevance.</p>
  </div>
</div>

## Scene 10 — Vocabulary

The Principle in a sentence, and the vocabulary cards — now including the July 2026 protocol terms, with three marked deprecated — in one closing instrument.

<p class="tw-fig-claim">Three terms on this board are marked deprecated. If they appear in your architecture documents, you have a migration.</p>

<div class="visual-frame" id="fig-vocabulary" tabindex="-1" data-fig="Vocabulary and deprecations" style="--vf-h:660px">
  <iframe
    src="/visuals/harness-engineering/vocabulary-visual.html?embed=1"
    title="Flippable vocabulary cards covering the harness engineering terms including the 2026 protocol additions, with Roots, Sampling and HTTP+SSE marked deprecated."
    loading="lazy"
    sandbox="allow-scripts allow-same-origin"
  ></iframe>
</div>

<div class="callout warm">
  <strong>Principle</strong>
  <p>"Anytime you find an agent makes a mistake, you take the time to engineer a solution such that the agent never makes that mistake again." — Mitchell Hashimoto, whose 5 February 2026 post seeded the discipline. Every other rule in this deep dive is downstream of that one.</p>
</div>

## What changed between April and August 2026

The five layers survived the refresh. What moved is the boundary between what you build and what you inherit.

| Layer | April 2026 position | August 2026 position |
|---|---|---|
| L1 Constraint | Rules, linters, allow-lists — mostly text | **Environmental first.** Sandbox profiles (gVisor, Seatbelt, microVM + vsock) are constraint. Success metric is prompts per run, not rules written. |
| L2 Context | Build compaction and durable scratchpads yourself | **Buy, not build.** Native million-token context plus runtime compaction and history persistence. Your job compresses to curation — deciding what *not* to load. |
| L3 Execution | Tools and sandboxing, session-oriented MCP client | **Stateless MCP core**, header routing, cacheable tool manifests, deprecated Roots/Sampling/Logging and HTTP+SSE, and concurrency from background subagents. |
| L4 Verification | Tests, evals, review gates | Same, plus **`input_required` as a protocol primitive** and a **harness-config manifest** pinned to every eval run. |
| L5 Lifecycle | Engineer crash recovery and durable logs | GA runtime features in two platforms. Your residue is **escalation policy and cost ceilings**. |

Two deliberate non-changes. There is no sixth layer: the harness manifest belongs inside L4, and layer inflation is how frameworks die. And the elaborate orchestrator-router-judge-critic graphs of 2025 were largely compensation for short context and weak tool use — with both constraints eased, treat them as something to justify rather than something to assume.

## How this relates to the older 7-component view

You may see an older community framing that lists seven harness components: control loop, state management, memory, tools and sandboxing, context management, planning and self-verification, and error handling. That view isn't wrong — it's the same system at a different altitude. The 5-layer model is the architectural spine; the 7 components are how the work gets done inside it.

| 5-layer view (this deep dive) | 7-component view (older framing) |
|---|---|
| L1 Constraint | (Implicit — encoded in sandbox profiles, linters and structural rules, not in any single component) |
| L2 Context | Context management, memory |
| L3 Execution | Tools and sandboxing, control loop *(now platform runtime)* |
| L4 Verification | Planning and self-verification |
| L5 Lifecycle | State management *(now platform runtime)*, error handling |

If your team already speaks 7-component, keep speaking it. The 5-layer model is just easier to assign owners and rates of change to, which is why it's becoming the dominant vocabulary — and as the italics show, two of the seven have quietly migrated out of your codebase and into someone's runtime.

## When NOT to invest in a harness

A harness costs real engineering time. Five situations where it's the wrong move:

<div class="action-grid">
  <div class="action-card">
    <strong>Prototyping</strong>
    <p>Throwing the code away in two weeks? Skip it. Prove the idea first; harness it once it has to live.</p>
  </div>
  <div class="action-card">
    <strong>Single-shot tasks</strong>
    <p>One model call, one answer, no loop. There's no multi-step compounding failure to defend against.</p>
  </div>
  <div class="action-card">
    <strong>Spaghetti monoliths</strong>
    <p>A codebase with no module boundaries can't be harnessed cheaply. Refactor (or hire humans) before you ask an agent to behave well in there.</p>
  </div>
  <div class="action-card">
    <strong>Still evaluating runtime platforms</strong>
    <p>Don't build deep harness on a platform you might leave in two months — and in 2026 that risk cuts the other way too: build only what the platform won't hand you.</p>
  </div>
  <div class="action-card">
    <strong>Team too small</strong>
    <p>Five layers need cross-functional ownership. If you can't staff that across architecture, dev, platform, QA and SRE, focus on L4 only and revisit later.</p>
  </div>
  <div class="action-card">
    <strong>Bottom line</strong>
    <p>Harness investment compounds; harness debt compounds faster. But you only earn the compounding if the work is real, repeated and multi-step.</p>
  </div>
</div>

## A closing note on framing

The five-layer decomposition used throughout is a synthesis framing that emerged in essays around the Managed Agents launch, not a vendor artifact. This deep dive is vendor-neutral: the patterns work on any modern coding agent — Claude Code, Codex, Cursor, Copilot Workspace, the Microsoft Agent Framework, or your own — provided you name the five layers, give each one an owner, and run the Principle for long enough to compound.
