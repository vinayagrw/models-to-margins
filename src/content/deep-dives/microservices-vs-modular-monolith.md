---
title: Microservices vs Modular Monolith — The 2026 Evidence Check
summary: The debate is over as a trend, and most of its viral statistics fail verification. Nine scenes of date-stamped evidence, a statistics audit, an AI evidence check, and a payments-grade decision framework that replaces the maturity ladder with forces.
pubDate: 2026-07-05
updatedDate: 2026-07-05
featured: false
listed: true
template: blueprint
bpEyebrow: Drawing No. ARC-02
bpTitle: Micro­services vs Modular Monolith
bpSubtitle: The 2026 Evidence Check
bpCoords:
  - Scale 1:1
  - Scenes 9
  - Claims audited 12
geography: Global, vendor-neutral
horizon: Current state, mid-2026
tags:
  - software architecture
  - microservices
  - modular monolith
  - payments
  - evidence audit
  - modernization
audience: Architects, tech leads, and engineering leaders deciding where their service boundaries go
readTime: 13 min read
---

<div class="note-panel">
  <p><strong>One-line idea</strong>: microservices and modular monoliths are not stages on a maturity ladder. They are boundary-placement strategies selected by present forces, and the popular statistics claiming a mass "return to the monolith" mostly fail primary-source verification.</p>
  <p><strong>Who this is for</strong>: a leader who needs the trend verdict (Scenes 1 to 4), an architect who needs the domain stress test and the decision gates (Scenes 5 to 7), anyone about to quote an architecture statistic in a deck (Scene 4, before you do).</p>
  <p><strong>Evidence stance</strong>: every claim below is date-stamped and was adversarially checked in mid-2026. Numbers that could not be traced to a primary source are named and rejected, not laundered.</p>
</div>

<div class="signal-grid">
  <div class="signal-card">
    <span class="signal-label">The shift</span>
    <strong>Correction, not collapse.</strong>
    <p>Microservices adoption plateaued at high levels and is not collapsing. Learning interest is measurably declining (O'Reilly platform usage down 24% in a year). The modular monolith crossed to "early majority" on InfoQ's 2024 curve, then the topic left the trends reports entirely.</p>
  </div>
  <div class="signal-card">
    <span class="signal-label">Hard truth</span>
    <strong>The viral numbers are fake or misread.</strong>
    <p>"CNCF says 42% are consolidating microservices" appears in no CNCF document. "Gartner says 60% regret microservices" is a misattribution. The Prime Video story was one team's workload, and its "monolith" label is disputed by the people who were there.</p>
  </div>
  <div class="signal-card">
    <span class="signal-label">The trap</span>
    <strong>The maturity ladder.</strong>
    <p>"Monolith, then modulith, then graduate to microservices" quietly turns an architectural decision into a curriculum. The 2026 correction: neither shape is a reward or a training phase. Choose by forces (consistency, latency, compliance, team topology), not by stage.</p>
  </div>
  <div class="signal-card">
    <span class="signal-label">The discipline</span>
    <strong>Spend distribution only where the forces live.</strong>
    <p>In payments, the evidence converges on one shape: a strongly consistent modular core, exactly two default extractions (PCI vault, fraud ML), and an event backbone for everything after authorization. Neither pole of the debate describes it.</p>
  </div>
</div>

<nav class="reading-map" aria-label="Reading map">
  <p class="reading-map-label">Reading map · 9 scenes</p>
  <div class="reading-map-grid">
    <a class="reading-link" href="#scene-1--the-ladder-is-dead"><strong>1 · The ladder is dead</strong><span>Forces, not stages.</span></a>
    <a class="reading-link" href="#scene-2--twelve-years-in-one-arc"><strong>2 · Twelve years in one arc</strong><span>2014 to 2026, six beats.</span></a>
    <a class="reading-link" href="#scene-3--what-the-adoption-data-says"><strong>3 · The adoption data</strong><span>Surveys, honestly weighted.</span></a>
    <a class="reading-link" href="#scene-4--the-stats-that-fail-verification"><strong>4 · The stats audit</strong><span>Five numbers to never quote.</span></a>
    <a class="reading-link" href="#scene-5--the-institutional-signals"><strong>5 · Institutional signals</strong><span>Frameworks and conferences.</span></a>
    <a class="reading-link" href="#scene-6--the-payments-stress-test"><strong>6 · The payments stress test</strong><span>Adyen vs Monzo vs Lithic.</span></a>
    <a class="reading-link" href="#scene-7--the-composite-and-the-gates"><strong>7 · The composite + gates</strong><span>The shape and the decision tree.</span></a>
    <a class="reading-link" href="#scene-8--what-ai-actually-changes"><strong>8 · The AI evidence check</strong><span>2026 claims vs measurements.</span></a>
    <a class="reading-link" href="#scene-9--open-questions-and-sources"><strong>9 · Open questions</strong><span>Gaps, triggers, sources.</span></a>
  </div>
</nav>

<div class="callout warm">
  <strong>How to read this page</strong>
  <p>Scenes 1 to 4 settle the trend question with dated evidence. Scenes 5 to 7 turn it into decision guidance, stress-tested against the hardest domain available (regulated, low-latency payment platforms). Scene 8 runs the same audit on the 2026 AI discourse. Scene 9 is the honest tail: what remains open. A leader can stop after Scene 4, an architect should reach Scene 7, anyone being told "AI settles this" needs Scene 8.</p>
</div>

## Scene 1 — The ladder is dead

For a decade the default advice had a hidden shape: start with a monolith, modularize it, and one day, when you are mature enough, graduate to microservices. The 2026 correction (articulated most cleanly by Rico Fritzsche in June 2026) is that neither is a stage. They are different answers to one question: where do your boundaries live, in-process or on the network? Toggle the shapes below and watch the same four capabilities rearrange. Nothing about the business changes, only the boundary placement and its costs.

<div class="visual-frame" style="--vf-h:686px; --vf-h-m:876px">
  <iframe
    src="/visuals/microservices-vs-modular-monolith/architecture-morph.html?embed=1"
    title="Interactive architecture morph. Toggle between modular monolith and microservices and watch the same four capabilities rearrange from one process with a shared database into four services with their own databases and an event broker. Arrow keys also toggle."
    loading="lazy"
    sandbox="allow-scripts allow-same-origin"
  ></iframe>
</div>

Distribution has real costs (failed remote calls, eventual consistency, operational burden). Those costs are reasons to choose services deliberately, when concrete forces demand them. They do not establish a mandatory sequence in either direction.

One honesty note this page insists on: the Fritzsche article itself had essentially zero measured community reception as of early July 2026 (no Hacker News, Lobsters, or Reddit threads). It is cited here because the argument is right, not because a movement exists. The forces frame stands on the evidence in the next six scenes.

## Scene 2 — Twelve years in one arc

The discourse behaves like a damped pendulum. It starts at the microservices pole in 2014, swings hard toward the monolith pole through a decade of corrections and reversals, and settles at equilibrium in 2026.

<div class="visual-frame" style="--vf-h:586px; --vf-h-m:726px">
  <iframe
    src="/visuals/microservices-vs-modular-monolith/twelve-year-arc.html?embed=1"
    title="A damped pendulum timeline from 2014 to 2026 with six dated beats: the Lewis and Fowler definition, Fowler's MonolithFirst correction, the 2019 to 2020 reversals, the 2023 Prime Video flashpoint, the 2024 to 2025 new consensus, and the 2026 reframe settling at equilibrium"
    loading="lazy"
    sandbox="allow-scripts allow-same-origin"
  ></iframe>
</div>

Read the arc as a dialectic. 2014 said microservices. 2015 to 2025 said monolith first. 2026 says the question was wrong: there is no "first", there are only forces present or absent.

<details>
<summary>Data behind this visual: the six beats, 2014 to 2026</summary>
<table>
  <thead><tr><th>Date</th><th>Beat</th><th>What happened</th></tr></thead>
  <tbody>
    <tr><td>2014</td><td>Lewis &amp; Fowler define microservices</td><td>Business-capability alignment, independent deployability, decentralized data.</td></tr>
    <tr><td>2015</td><td>Fowler: MonolithFirst</td><td>"Don't even consider microservices unless the system is too complex as a monolith."</td></tr>
    <tr><td>2019–2020</td><td>The reversals begin</td><td>Hightower: "monoliths are the future." Segment folds 100+ services into one. Istio consolidates istiod.</td></tr>
    <tr><td>2023</td><td>Prime Video goes viral, misread</td><td>Spring Modulith hits 1.0 GA. Thoughtworks names fading "microservice envy."</td></tr>
    <tr><td>2024–2025</td><td>"Not the default"</td><td>InfoQ places the modular monolith at early majority. Threads ships on Instagram's monolith. Newman at QCon: not the default.</td></tr>
    <tr><td>2026</td><td>The question was wrong</td><td>Neither shape is a stage. There is no "first." Only forces, present or absent.</td></tr>
  </tbody>
</table>
</details>

## Scene 3 — What the adoption data says

Every signal gets a lane on the console below, with a status light and an honest weight tag. Three lanes are live, one is falling, and three went dark, which is itself the finding.

<div class="visual-frame" style="--vf-h:626px; --vf-h-m:706px">
  <iframe
    src="/visuals/microservices-vs-modular-monolith/adoption-signals.html?embed=1"
    title="Adoption signal console with seven lanes: O'Reilly 2020 survey bars at 77 percent adopted and 29 percent majority, JetBrains flat then dropped, O'Reilly platform usage down 24 percent, InfoQ 2024 early-majority placement, and three dark lanes where measurement ended or never existed"
    loading="lazy"
    sandbox="allow-scripts allow-same-origin"
  ></iframe>
</div>

Google Trends and job-posting signals yielded nothing attributable (the 2024–2025 tech-hiring trough confounds everything). That gap is reported rather than papered over.

<details>
<summary>Data behind this visual: the seven signals</summary>
<table>
  <thead><tr><th>Signal</th><th>Date</th><th>Reading</th><th>Weight it as</th></tr></thead>
  <tbody>
    <tr><td>O'Reilly adoption survey</td><td>Jul 2020, n=1,502</td><td>77% adopted some microservices, 29% ran mostly microservices</td><td>Hype-era high-water mark</td></tr>
    <tr><td>JetBrains developer survey</td><td>2021 → 2022</td><td>35% then ~37% working on microservices, then the question was dropped</td><td>Flat, then unmeasured</td></tr>
    <tr><td>O'Reilly platform usage</td><td>Jan 2025</td><td>Microservices content down 24%, DDD content down 22%, year over year</td><td>Curiosity, not production</td></tr>
    <tr><td>InfoQ architecture trends</td><td>Apr 2024</td><td>"Designing modular monoliths" crosses to early majority</td><td>Editorial judgment</td></tr>
    <tr><td>InfoQ architecture trends</td><td>Apr 2025</td><td>Topic absent entirely, report dominated by agentic AI</td><td>Signal ended</td></tr>
    <tr><td>DORA / State of DevOps</td><td>2023–2024</td><td>Architecture-agnostic by design, a well-structured monolith counts as "loosely coupled"</td><td>Neutral by design</td></tr>
    <tr><td>Stack Overflow survey</td><td>2024–2025</td><td>No architecture-style question exists, any derived claim is blog inference</td><td>Never measured</td></tr>
  </tbody>
</table>
</details>

## Scene 4 — The stats that fail verification

Two independent research passes tried to trace the most-circulated numbers in this debate to primary sources. Five failed. The audit wall below stamps each one with its verdict, shows the pollution loop that keeps them circulating, and names the only two reversal cases that actually survive verification.

<div class="visual-frame" style="--vf-h:646px; --vf-h-m:666px">
  <iframe
    src="/visuals/microservices-vs-modular-monolith/stats-audit.html?embed=1"
    title="Verification audit wall. Five circulating claims stamped fabricated, unverified, misattributed, misread, and no methodology, next to a circular SEO and AI cross-citation pollution loop and two verified reversal cases: Segment 2018 to 2020 and Istio's istiod consolidation in 2020"
    loading="lazy"
    sandbox="allow-scripts allow-same-origin"
  ></iframe>
</div>

The pattern matters more than any single number. No named-company reversal at Segment's scale surfaced for 2024–2026. The discourse outran the evidence, and if one of these five numbers is in your deck, remove it.

<details>
<summary>Data behind this visual: the audit ledger</summary>
<table>
  <thead><tr><th>Circulating claim</th><th>Verdict</th><th>What the check found</th></tr></thead>
  <tbody>
    <tr><td>"CNCF survey: 42% of microservices adopters are consolidating"</td><td>Fabricated</td><td>Appears in no CNCF document checked. Traces only to SEO blogs citing each other. Probably fabricated or AI-laundered.</td></tr>
    <tr><td>"Service mesh adoption fell from 18% to 8%"</td><td>Unverified</td><td>Same provenance problem. No primary source found.</td></tr>
    <tr><td>"Gartner: 60% of teams regret microservices"</td><td>Misattributed</td><td>The real Gartner 60% (Jun 2023) is about technology purchase regret in general.</td></tr>
    <tr><td>"Amazon abandoned microservices"</td><td>Misread</td><td>One team's video pipeline left Step Functions and Lambda for one ECS process. Ex-AWS engineers dispute the "monolith" label.</td></tr>
    <tr><td>"Microservices market worth $7.45B, growing 18.8%"</td><td>No methodology</td><td>Vendor SEO content. No named methodology.</td></tr>
    <tr><td>Segment, 2018–2020</td><td>Verified</td><td>100+ services folded into one. First-party, well documented.</td></tr>
    <tr><td>Istio istiod, 2020</td><td>Verified</td><td>The service mesh consolidated its own control plane.</td></tr>
  </tbody>
</table>
</details>

## Scene 5 — The institutional signals

Framework investment and conference programming are harder to fake than surveys, and they all point the same direction. Watch the Spring Modulith release train run unbroken for three years while QCon's programming moves from "how to do microservices" to "when not to".

<div class="visual-frame" style="--vf-h:626px; --vf-h-m:786px">
  <iframe
    src="/visuals/microservices-vs-modular-monolith/institutional-signals.html?embed=1"
    title="Institutional signals. The Spring Modulith release train from experimental in October 2022 through 2.1 GA in June 2026, the QCon conference arc from 2020 to 2025, plus .NET Aspire and the Thoughtworks Radar blip with its honest Assess-only caveat"
    loading="lazy"
    sandbox="allow-scripts allow-same-origin"
  ></iframe>
</div>

## Scene 6 — The payments stress test

Generic comparisons score "scalability" and "team autonomy" in the abstract. The sharpest way to test the forces frame is the hardest domain available: regulated, high-throughput, low-latency payment platforms, where a timeout is a decline that costs money and the ledger must never be eventually consistent. Four production platforms sit at four different points on the spectrum, and each position is explained by the same four forces.

<div class="visual-frame" style="--vf-h:686px; --vf-h-m:806px">
  <iframe
    src="/visuals/microservices-vs-modular-monolith/payments-stress-test.html?embed=1"
    title="The payments stress test. A spectrum from one deployable to roughly 2,800 services with Adyen, Stripe, Lithic, and Monzo positioned as architecture-shape cards, above the four domain forces: the hop tax is a tail, the ledger cannot be a saga, PCI scope follows access, and fraud ML is the natural seam"
    loading="lazy"
    sandbox="allow-scripts allow-same-origin"
  ></iframe>
</div>

The detail worth keeping from each: Adyen runs an acquiring hot path on one platform at top-10-PSP scale. Stripe's Radar won its ~100ms fraud budget with in-process caching because network feature fetches ate it at 2 to 5ms per hop. Lithic keeps hops few and lets active-active replication with request hedging do the availability work. And Monzo, the maximal pole, still keeps a deliberately simple stand-in authorization stack on a different cloud for the moment cards absolutely must work.

<details>
<summary>Data behind this visual: the four platforms and the four forces</summary>
<table>
  <thead><tr><th>Platform</th><th>Shape</th><th>Proof point</th></tr></thead>
  <tbody>
    <tr><td>Adyen</td><td>One Java + PostgreSQL platform, explicitly not microservices</td><td>A modular monolith runs a real acquiring hot path at top-10-PSP scale, hundreds of billions of EUR per year.</td></tr>
    <tr><td>Stripe</td><td>50M-line Ruby monorepo core, services at the edges</td><td>The core stayed cohesive through a decade of hypergrowth. Radar won its ~100ms fraud budget in-process.</td></tr>
    <tr><td>Lithic</td><td>Coarse services, every one active-active multi-region</td><td>A service-oriented hot path is viable with few hops, replication and request hedging doing the availability work.</td></tr>
    <tr><td>Monzo</td><td>~2,800 Go microservices in a monorepo + a stand-in stack</td><td>The maximal pole works, at the price of a funded platform org, and even Monzo keeps a radically simple independent path.</td></tr>
  </tbody>
</table>
<table>
  <thead><tr><th>Force</th><th>Rule of thumb</th><th>Why</th></tr></thead>
  <tbody>
    <tr><td>The hop tax is a tail, not a mean</td><td>99.99%<sup>5</sup> → 99.95%</td><td>Five sequential p99-jittery hops blow a ~250ms budget even when averages look fine. Sequential dependencies multiply availability risk.</td></tr>
    <tr><td>The ledger cannot be a saga</td><td>No atomicity, no split</td><td>Sagas explicitly cannot give atomicity. Splitting the ledger is where payment microservice migrations actually fail.</td></tr>
    <tr><td>PCI scope follows access</td><td>One vault, tokens elsewhere</td><td>A mesh inside the compliance boundary multiplies audit evidence. Shopify, proudly monolithic, extracted exactly this one enclave.</td></tr>
    <tr><td>Fraud ML is the natural seam</td><td>Fail-open, own cadence</td><td>Advisory, read-mostly, different stack. The textbook extraction even inside a monolith strategy.</td></tr>
  </tbody>
</table>
</details>

## Scene 7 — The composite and the gates

The shape the evidence converges on is neither pole. It is drawn below as one blueprint: a strongly consistent modular core behind a dumb edge, exactly two default extractions, a transactional-outbox event backbone for everything after authorization, and a stand-in path for the day the core is down. Underneath it sit the five gates that replace the ladder. Hover or tap each gate to see where a capability lands.

<div class="visual-frame" style="--vf-h:726px; --vf-h-m:1066px">
  <iframe
    src="/visuals/microservices-vs-modular-monolith/composite-blueprint.html?embed=1"
    title="The composite architecture blueprint: a dumb edge feeding a modular core holding authorization and ledger in one transaction boundary, a PCI vault enclave and fraud ML scorer as the two extractions, a transactional outbox feeding an event backbone with clearing, settlement, disputes, and analytics, plus a stand-in path. Below, five interactive decision gates asked in order"
    loading="lazy"
    sandbox="allow-scripts allow-same-origin"
  ></iframe>
</div>

Notice what is absent: there is no "are we mature enough yet?" gate. Maturity appears only as a cost multiplier on the extract branch, never as a rite of passage. Every gate is a present force. That is the ladder frame, retired.

The gates place one capability at a time. The recipe below places your whole system: answer the five forces for your context and it returns a shape, what to extract by default, and — if you are migrating — the sequencing that avoids the two classic failure modes (splitting the ledger, and "modernize now, decompose never").

<div class="visual-frame" style="--vf-h:706px; --vf-h-m:1150px">
  <iframe
    src="/visuals/microservices-vs-modular-monolith/decision-recipe.html?embed=1"
    title="The extraction recipe. Five yes-or-no force questions: shared transaction boundary, tail-latency budget, regulated data, divergent cadence with a durable owning team, and coordination cost. A live verdict panel recommends a shape from modular monolith through composite to fine-grained microservices, and a three-wave migration sequencing strip sits underneath"
    loading="lazy"
    sandbox="allow-scripts allow-same-origin"
  ></iframe>
</div>

<details>
<summary>Data behind this visual: the recipe in text form</summary>
<table>
  <thead><tr><th>Force</th><th>Question</th><th>A yes pushes toward</th></tr></thead>
  <tbody>
    <tr><td>1 · Consistency</td><td>Do capabilities share one transaction boundary — a ledger that can never be a saga?</td><td>One modular core. Sagas cannot give atomicity; splitting the ledger is where payment migrations fail.</td></tr>
    <tr><td>2 · Latency</td><td>Is the synchronous hot path on a tail-latency budget where every hop costs p99?</td><td>Few or zero network hops on that path. Five sequential 99.99% hops compound to 99.95%.</td></tr>
    <tr><td>3 · Compliance</td><td>Do you hold regulated data whose audit scope follows access?</td><td>Exactly one extracted enclave (the vault), tokens everywhere else.</td></tr>
    <tr><td>4 · Cadence</td><td>Does a capability have a divergent cadence, stack, or scaling profile — and a durable owning team?</td><td>Extracting that capability through an outbox seam. Both halves required.</td></tr>
    <tr><td>5 · Coordination</td><td>Are hundreds of engineers queuing on one release train (the release-coordination-manager tell)?</td><td>More, smaller deployables — priced honestly: a funded platform org.</td></tr>
  </tbody>
</table>
<table>
  <thead><tr><th>Shape</th><th>When the recipe returns it</th></tr></thead>
  <tbody>
    <tr><td>Modular monolith</td><td>No extraction force present (whether or not a core-binding force is). Enforced in-process boundaries, revisited when a force appears.</td></tr>
    <tr><td>Composite: core + default extractions</td><td>A core-binding force (1 or 2) plus an extraction force (3 or 4). The shape drawn in the blueprint above.</td></tr>
    <tr><td>Coarse services, replicated</td><td>Extraction forces without a core-binding force. Few seams, active-active replication for availability.</td></tr>
    <tr><td>Fine-grained microservices + platform org</td><td>Coordination as the dominant force with nothing binding capabilities together. The Monzo pole, priced honestly.</td></tr>
  </tbody>
</table>
<p>If migrating, sequence in waves: (1) tokenize at the edge and stand up the vault first, shrinking compliance scope before anything moves; (2) bring the core to modular parity behind outbox seams, because like-for-like output is dual-run checkable; (3) exercise the seams on a schedule with per-wave extraction reviews, so "later" does not quietly become "never".</p>
</details>

<details>
<summary>Data behind this visual: the five gates, asked in order</summary>
<table>
  <thead><tr><th>Gate</th><th>Question</th><th>If yes</th></tr></thead>
  <tbody>
    <tr><td>1</td><td>Shares a transaction boundary with the ledger?</td><td>Core module, in process. It shares a transaction boundary with the ledger or the authorization decision.</td></tr>
    <tr><td>2</td><td>On the synchronous hot path, inside the tail-latency budget?</td><td>Core module. Scale by replicating the whole core, not by splitting it.</td></tr>
    <tr><td>3</td><td>Holds or accesses card data?</td><td>The one vault enclave. Nothing else joins it, tokens everywhere else.</td></tr>
    <tr><td>4</td><td>Divergent cadence, stack, or scaling, with a durable owning team?</td><td>Extract as a service through an outbox seam. The only gate that creates a new service.</td></tr>
    <tr><td>5</td><td>None of the above?</td><td>Stay a module. Revisit when a force appears.</td></tr>
  </tbody>
</table>
</details>

## Scene 8 — What AI actually changes

The 2026 discourse claims AI settles this debate — in both directions at once. One camp says large-context agents make the monolith the natural unit again; the other says service boundaries are exactly the guardrails agents need. Both camps now field heavyweights (Michael Nygard in May, Chris Richardson across a five-post series from February to May), and neither has published a measurement. Roughly half the "microservices moment" articles are not even about your codebase: they argue for decomposing *AI agents* into multi-agent systems — same vocabulary, different question.

What 2026 did measure is adjacent, and it all points the same way: agent pass rates collapse as repositories grow (91.3% under 10K lines to 15.3% past 50K in RepoMod-Bench), cross-component "integration width" is the dominant bottleneck (ACL 2026), agents fail at *generating* microservice repos mostly on cross-file consistency (RepoGenesis, best pass rate under 24%), and handing agents formal architecture descriptors cuts navigation steps by a third or more. One honest counterweight: the sole controlled minimal-pair study found completion rates unchanged by code structure differences — adjacent evidence is suggestive, not proof. And the direct study — the same system, built both ways, same agent — still does not exist; the one project attempting it is a proposal with no data.

The institutional tell is the loudest signal: the topology debate has simply vanished from the sources that are hardest to fake. Thoughtworks Radar Vol. 34's only monoliths are monolithic *agents*; QCon's AI-architecture track is about context engineering and MCP, not granularity; AWS now scores systems for "agent readiness" across five boundary pillars; DORA measures AI as an amplifier of organizational capabilities (citing Stanford research: often 10% or less uplift on complex legacy code, versus 35 to 40% on greenfield). The vocabulary migrated from service granularity to boundary quality — which is the forces frame's conclusion by another route. AI is not a sixth force. It raises the price of bad boundaries in whichever topology you chose.

<div class="visual-frame" style="--vf-h:860px; --vf-h-m:1760px">
  <iframe
    src="/visuals/microservices-vs-modular-monolith/ai-evidence-board.html?embed=1"
    title="The 2026 AI evidence board in three lanes. Lane one stamps the essay discourse: a monolith-ward pole with Nygard, Lacerda, and the ModulithBench proposal, a services-ward pole with Richardson's series and the Nordic APIs panel, all stamped argument-no-data, plus a category-error bin and a hallucinated-statistics card. Lane two shows the adjacent measurements: pass rates collapsing with repository size, integration width as the bottleneck, microservice generation failures, the navigation gain from architecture descriptors, and a null-result counterweight. Lane three is a January-to-June institutional timeline showing the topology debate absent. A verdict strip reads: boundaries, not topology"
    loading="lazy"
    sandbox="allow-scripts allow-same-origin"
  ></iframe>
</div>

<details>
<summary>Data behind this visual: the 2026 sources</summary>
<table>
  <thead><tr><th>Source</th><th>Date (2026)</th><th>Lane</th><th>Verdict</th></tr></thead>
  <tbody>
    <tr><td>Nygard, "AI Versus Microservices" (michaelnygard.com)</td><td>May 9</td><td>Claims · monolith-ward</td><td>Argument, no data</td></tr>
    <tr><td>Lacerda, "The Death of Microservices" (Medium)</td><td>Feb 14</td><td>Claims · monolith-ward</td><td>Argument, no data; carries an unsourced 1000× figure</td></tr>
    <tr><td>Mysore, ModulithBench (Medium)</td><td>May 14</td><td>Claims · monolith-ward</td><td>Benchmark proposal, no published data</td></tr>
    <tr><td>Richardson, microservices.io GenAI series (5 posts)</td><td>Feb 8 – May 19</td><td>Claims · services-ward</td><td>Argument, no data</td></tr>
    <tr><td>Wagner, "Are Microservices Still Relevant in the Age of AI?" (Nordic APIs; McLarty, Amundsen, Richardson, Posta)</td><td>Mar 17</td><td>Claims · services-ward</td><td>Argument, no data</td></tr>
    <tr><td>Spectro Cloud, "Will AI turn 2026 into the year of the monorepo?"</td><td>Jan 16</td><td>Claims · monolith-ward (caveat: repo shape, not deployment shape)</td><td>Argument, no data</td></tr>
    <tr><td>"AI agents are the new microservices" essays (GoodWork Labs; Gupta; Slathia)</td><td>Jan 20 / Feb 26 / Jun 17</td><td>Claims · category error</td><td>About decomposing agents, not code</td></tr>
    <tr><td>"QCon 2026 monolith renaissance keynote"; "CNCF 42% consolidation"</td><td>—</td><td>Claims · pollution loop</td><td>Hallucinated: absent from the pages the search snippets attributed them to</td></tr>
    <tr><td>RepoMod-Bench (arXiv 2602.22518)</td><td>Feb 26</td><td>Measurements</td><td>Adjacent: size, not topology (91.3% → 15.3%)</td></tr>
    <tr><td>Repo-level agentic reasoning (arXiv 2601.03731, ACL 2026)</td><td>Jan 7</td><td>Measurements</td><td>Adjacent: integration width is the bottleneck</td></tr>
    <tr><td>RepoGenesis (arXiv 2601.13943)</td><td>Jan 20</td><td>Measurements</td><td>Adjacent: microservice generation only, no monolith arm (Pass@1 23.67% / 21.45%)</td></tr>
    <tr><td>Architecture descriptors as navigation primitives (arXiv 2604.13108)</td><td>Apr 11</td><td>Measurements</td><td>Adjacent: documentation, not style (33–44% fewer steps, p=0.009)</td></tr>
    <tr><td>Code cleanliness minimal-pair study (arXiv 2605.20049)</td><td>May 19</td><td>Measurements · counterweight</td><td>Null result on completion rates; 7–8% tokens, 34% revisits</td></tr>
    <tr><td>DORA "ROI of AI-assisted Software Development" (v2026.01)</td><td>Published Feb, updated Apr 22</td><td>Institutions</td><td>AI as amplifier; legacy uplift "often 10% or less" per Stanford research cited by DORA</td></tr>
    <tr><td>QCon London "Architecture in the Age of AI" track</td><td>Mar 16–19</td><td>Institutions</td><td>Context engineering and MCP; granularity absent</td></tr>
    <tr><td>Thoughtworks Technology Radar Vol. 34</td><td>Apr 15</td><td>Institutions</td><td>"Codebase cognitive debt" (Hold); monolithic agents warned against; "microservice" appears 4×, all incidental</td></tr>
    <tr><td>AWS Transform Agentic Readiness Analysis</td><td>May 27</td><td>Institutions</td><td>Agent-readiness tiers, five boundary pillars</td></tr>
    <tr><td>InfoQ Architecture &amp; Design Trends 2026</td><td>Not published as of Jul 4</td><td>Institutions</td><td>Absence noted; named re-sweep trigger</td></tr>
    <tr><td>Wasowski, "Modular Monolith Instead of Microservices…" (Medium)</td><td>May (unverified)</td><td>Excluded</td><td>Paywalled; publication date could not be verified</td></tr>
  </tbody>
</table>
</details>

## Scene 9 — Open questions and sources

What the red-team could not close, stated plainly. The AI-agent question from Scene 8 stays on the scale — heavyweights on both pans, zero *direct* studies at the fulcrum — because adjacent evidence is not a verdict. The other gaps and the named re-sweep triggers sit beside it.

<div class="visual-frame" style="--vf-h:506px; --vf-h-m:686px">
  <iframe
    src="/visuals/microservices-vs-modular-monolith/open-questions.html?embed=1"
    title="The open questions. A balanced scale for the AI-agent question with the whole-codebase camp on one pan and the cheap-scaffolding camp on the other, zero empirical studies at the fulcrum, and the agreed point that enforced module boundaries help either topology. Beside it, the under-evidenced green-field gap, the unmeasured adoption gap, and the named re-sweep triggers"
    loading="lazy"
    sandbox="allow-scripts allow-same-origin"
  ></iframe>
</div>
