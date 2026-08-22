---
title: The Customs Entry Agent — The Fast Path Does Not Classify
summary: "The problem: every US import needs a 10-digit tariff code, and getting it wrong is charged as negligence at twice the lost duty. The challenge: graded against tariff experts on the same 632 products, the best of the 23 systems the benchmark scored got 46.8% where the people scored 95%, so a model that guesses the code cannot be trusted with the filing. The solution: sort every line by whether it has been filed before. Repeats reuse an answer a licensed broker already approved, and only genuinely new goods get full reasoning and a human reviewer. A rulebook watcher then finds the past answers a rule change has made wrong. Six chapters follow one arc: the problem, why it is hard, the solution, the AWS build, the money, and where it honestly breaks."
pubDate: 2026-08-22
updatedDate: 2026-08-22
featured: false
listed: true
template: atlas
bpEyebrow: Entry No. TRD-01
bpTitle: The Customs Entry Agent
bpCoords:
  - Domain · US import, CBP / ACE
  - Chapters · 6
  - Figures · 22
  - Sources · 24
geography: US import, CBP / ACE
horizon: 0 to 2 years
tags:
  - agentic ai
  - customs
  - trade compliance
  - solution architecture
  - aws
  - human in the loop
  - tariffs
audience: Solution architects, AI delivery leads, and trade-compliance owners deciding what to automate
readTime: 12 min read
---

<div class="note-panel">
  <p><strong>One-line idea</strong>: the best design for filing customs paperwork with AI does not ask the model to name the goods. Instead it sorts every line by one question: is this something we have filed before? Lines we have filed before reuse an answer a human already approved. Only the genuinely new gets costly reasoning and a licensed broker.</p>
  <p><strong>How to read this page</strong>: the figures carry the content, and the chapters run in one order. What goes wrong, why software cannot simply fix it, the design that works around that, the money, and where it still breaks. Jump in anywhere.</p>
  <nav class="at-routes" aria-label="Ways in">
    <p class="at-route"><span class="at-route-who">Start anywhere</span>
      <a class="at-route-stop" href="#fig-documentation-trap">What goes wrong</a>
      <a class="at-route-stop" href="#chapter-2--the-challenge-why-software-cannot-simply-do-it">Why it is hard</a>
      <a class="at-route-stop" href="#chapter-3--the-solution-how-every-line-is-routed">How lines are routed</a>
      <a class="at-route-stop" href="#chapter-5--the-money">What it returns</a>
      <a class="at-route-stop" href="#chapter-6--where-it-breaks-and-the-plan">Where it breaks</a></p>
  </nav>
  <p><strong>Evidence stance</strong>: this page compresses a solution design dated August 2026. The design was red-teamed, meaning a second team attacked it on purpose to find the holes. Every claim carries a verdict: <span class="at-chip at-chip--confirmed">Confirmed</span> <span class="at-chip at-chip--proposed">Proposed</span> <span class="at-chip at-chip--open">Open</span> <span class="at-chip at-chip--vendor-claim">Vendor claim</span>. Vendor claims are displayed and excluded from every calculation.</p>
</div>

<div class="note-panel at-plain-first">
  <p><strong>Read this first</strong>, if none of the words on this page are familiar.</p>
  <p>Everything brought into the United States has to be given a number. The number decides the tax. Pick the wrong number and the government can charge you twice what you underpaid, or four times if it decides you were careless.</p>
  <p>Picking that number is a judgement, not a lookup. Two experienced people can look at the same product and disagree about it.</p>
  <p>So the obvious idea is to let AI pick it. This page starts there, because the obvious idea does not work. Graded against tariff experts on the same 632 products, the best of the 23 systems the benchmark scored got 46.8% of them right. The people got 95%.</p>
  <p>The design on this page therefore never asks the AI to name the goods. It asks a cheaper question first. Have we shipped this exact thing before? If we have, reuse the answer a qualified person already signed off. Only genuinely new items get the expensive treatment, and a person still signs those.</p>
</div>

## Chapter 1 — The problem, what goes wrong today

<p class="at-plain">In plain words: shipments get held up because the paperwork disagrees with itself, and nobody notices until the goods are already at the border.</p>

Domestic freight asks one hard question: where is it. Cross-border freight adds four more, and none of them has a settled answer while the goods are moving.

Treating a cross-border move as a longer domestic one is what fails. The shippers who do this well validate documents before the freight moves.

<p class="at-fig-claim">The same consignment, run twice. Once with the wrong code found at the border, once with it caught the moment the invoice line is written.</p>

<div class="visual-frame" id="fig-documentation-trap" tabindex="-1" data-fig="The documentation trap" style="--vf-h:1387px; --vf-h-m:2586px">
  <iframe
    src="/visuals/customs-entry-agent/documentation-trap.html?embed=1"
    title="An interactive race between two runs of the same illustrative consignment. A document strip shows eleven required documents, ten correct and one wrong: an HS code classification off by one digit. Below it, two tracks share a five-stop axis running from invoice line written through pickup, arrival at port and customs to delivered. Run A is the way it happens now: the token passes three green checkpoints and stops dead at customs, where the station turns red and a hatched bar grows off the right-hand edge labelled duration not published, because no primary source publishes hold duration. Run B has a check at the source: the wrong code is rejected at the first station and the same shipment then passes every remaining checkpoint and is delivered. Beneath the race, four rows give the delay figures in circulation with their real provenance, three graded Open or Vendor claim for having no primary source, and one graded Confirmed: a worst commercial standard-lane delay of forty minutes anywhere on either US land border in a live pull of CBP’s Border Wait Times feed, which measures queue time rather than hold time."
    loading="lazy"
    sandbox="allow-scripts allow-same-origin"
  ></iframe>
</div>

<span class="at-chip at-chip--confirmed">Confirmed</span> What is published is queue time. In a live pull of <span class="at-term" data-def="US Customs and Border Protection, the agency that runs the US border and collects the import tax">CBP</span>'s Border Wait Times feed on 21 August 2026, the worst commercial standard-lane delay anywhere on either land border was 40 minutes. That measures the wrong thing for this argument, which is exactly why the distinction matters. Waiting in a lane and being held on a document are not the same event, and only one of them is instrumented.

<div class="stat-strip" id="choke-points" tabindex="-1">
  <div class="at-stat alert"><b>Choke 1</b><strong class="at-stat-claim">The declaration and the shipping documents disagree.</strong><span>One field differs across two documents describing the same goods, written long before anyone can see it.</span></div>
  <div class="at-stat warn"><b>Choke 2</b><strong class="at-stat-claim">The same check gets done by hand several times.</strong><span>Food safety, agriculture, health and security agencies each run their own hold, so an importer with unlinked systems answers the same question repeatedly.</span></div>
  <div class="at-stat warn"><b>Choke 3</b><strong class="at-stat-claim">Documents arrive too late to be processed before the goods do.</strong><span>A late document collapses the decision back onto the moment of arrival, the most expensive place to make it.</span></div>
</div>

Each of the three is a data problem before it is a border problem. That is why this design starts at the document, not the crossing.

So this page uses none of the three delay figures in its ROI. Its case rests on numbers that can be checked.

## Chapter 2 — The challenge, why software cannot simply do it

<p class="at-plain">In plain words: AI is not good enough at picking the number. The penalty for getting it wrong is a multiple of the tax, and the rules change faster than software ships.</p>

The obvious fix is to hand the tariff code to a model and let it answer. The three numbers below are why that fails, and they are the constraint the rest of this design is built around.

<div class="stat-strip" id="ch1-numbers" tabindex="-1">
  <div class="at-stat alert"><b>40%</b><strong class="at-stat-claim">The best published AI gets the full tariff code right only 40% of the time.</strong><span>The 10-digit <span class="at-term" data-def="Harmonized Tariff Schedule code. The ten-digit number that decides how much tax an import pays">HTS code</span> sets the import tax. The best published model is wrong roughly 60% of the time on the contested rulings the benchmark uses, measured September 2025 on 200 items.</span></div>
  <div class="at-stat warn"><b>2x to 4x</b><strong class="at-stat-claim">Getting it wrong costs a multiple of the tax you underpaid.</strong><span>Section 1592, the US customs penalty law, charges 2x lost duties for negligence and 4x for gross negligence.</span></div>
  <div class="at-stat"><b>10 working days</b><strong class="at-stat-claim">You have 10 working days from cargo release to file.</strong><span>The <span class="at-term" data-def="the form that tells the government what the goods are and what tax is owed on them">entry summary</span> travels over <span class="at-term" data-def="Automated Broker Interface. The electronic format the paperwork is sent in">ABI</span> into <span class="at-term" data-def="Automated Commercial Environment. The government portal the paperwork is filed into">ACE</span>, the CBP filing portal, and the deadline never moves.</span></div>
  <div class="at-stat warn"><b>4 in 30</b><strong class="at-stat-claim">The rulebook changed 4 times in one month.</strong><span>Four rulebook changes in July 2026 alone, faster than any release train.</span></div>
</div>

A customs entry turns a shipment into a legal declaration. The design therefore cannot rest on a model naming the right code, but on avoiding the guess wherever a human has already answered.

<span class="at-chip at-chip--open">Open</span> The customs function is widening, but this build is not. The gap register records forced-labour screening and the depth of <span class="at-term" data-def="extra duties charged when goods are sold into a country below their home-market price">anti-dumping</span> work as declared exclusions.

The law holds the importer to a reasonable care standard on all four decisions. Reasonable care means CBP, the US border agency, judges how you decided and not only whether you were right. That responsibility cannot be handed to software.

<p class="at-fig-claim">Worked example: one invoice line, from its four decisions through to the filing clock and the penalty behind it.</p>

<div class="visual-frame" id="fig-entry-anatomy" tabindex="-1" data-fig="Anatomy of one entry" style="--vf-h:615px; --vf-h-m:1389px">
  <iframe
    src="/visuals/customs-entry-agent/entry-anatomy.html?embed=1"
    title="Interactive anatomy of a customs entry line. An example invoice line passes through four clickable decision boxes for classification, valuation, origin, and duty regimes, then a filing card with the ten working day statutory clock and the section 1592 penalty ladder."
    loading="lazy"
    sandbox="allow-scripts allow-same-origin"
  ></iframe>
</div>

<p class="at-fig-claim">Your turn: which of those four decisions actually costs you the most, and what in this design is aimed at it.</p>

<div class="visual-frame" id="fig-decision-pressure" tabindex="-1" data-fig="Which of the four costs you most" style="--vf-h:513px; --vf-h-m:1264px">
  <iframe
    src="/visuals/customs-entry-agent/decision-pressure.html?embed=1"
    title="An interactive question with four choices, one per decision an invoice line carries: classification, valuation, origin and duty regimes, each on a card with its own icon. Selecting a card opens two panels joined by an arrow. The left panel gives that decision's real failure mode, for example that classification is a judgement rather than a lookup and that the best published automated classifier is right about forty per cent of the time at ten digits on contested rulings, measured in September 2025 on a two hundred item test set. The right panel names the control in this design aimed at it, such as the novelty router, the deterministic checks, the evidence trail or the rulebook watcher, with a pointer to the chapter where that control is drawn in full. Nothing is stored and nothing is transmitted."
    loading="lazy"
    sandbox="allow-scripts allow-same-origin"
  ></iframe>
</div>

<p class="at-fig-claim">The sourced record behind the 40% number. Three benchmarks that disagree, all 23 systems the biggest one scored, and the vendor claim excluded.</p>

<div class="visual-frame" id="fig-evidence-docket" tabindex="-1" data-fig="The evidence docket" style="--vf-h:890px; --vf-h-m:2264px">
  <iframe
    src="/visuals/customs-entry-agent/evidence-docket.html?embed=1"
    title="Interactive evidence board summarising three benchmarks that disagree. Each sits on its own test set and none shares a scale with the others. The first card is ATLAS of September 2025, two hundred contested rulings drawn from eighteen thousand seven hundred and thirty one CROSS rulings, where the best published fine-tune reaches forty per cent at ten digits and 57.5 at six, against GPT-5-Thinking at twenty five and 55.5. The second is an independent product benchmark over one hundred and three classifications drawn at random, where the best commercial tool reaches 89.2 per cent and the weakest entrant 12.8, with the middle two at eighty and 44.1. The third is HSCodeComp of October 2025, six hundred and thirty two products across thirty two categories graded by twenty six tariff experts with twenty three systems entered, where licensed tariff experts reach ninety five per cent, the best of the systems scored reaches 46.8 wrapped in tools, and the best model asked directly reaches 29.3. A sourced caveat explains that the forty five point spread between the first two benchmarks is a sampling difference rather than a contradiction. A closing note explains why no 2026 model appears: all three are one-off papers rather than maintained leaderboards, the newest closed scoring in October 2025, and the only later measurement is a May 2026 workflow reaching 64.2 per cent at six digits, which is a different depth. Five clickable approach family cards carry wins, breaks and maturity verdicts, and a market strip records the Altana acquisition of Cervo AI with its vendor claim stamped and excluded."
    loading="lazy"
    sandbox="allow-scripts allow-same-origin"
  ></iframe>
</div>

<p class="at-fig-claim">Scores the eight gaps that recur across what the market sells, each against the control in this design that closes it.</p>

<div class="visual-frame" id="fig-market-gaps" tabindex="-1" data-fig="Eight gaps that recur" style="--vf-h:1330px; --vf-h-m:2442px">
  <iframe
    src="/visuals/customs-entry-agent/market-gaps.html?embed=1"
    title="An interactive scorecard of eight recurring gaps in currently available customs automation, each carrying an icon and a verdict. A scan sweeps down the eight in turn and each lands with its verdict. The gaps are a tool that is unlicensed once it derives past the sixth digit, accuracy quoted at six digits rather than the ten digits that carry liability, no specific ruling cited per answer, the duty stack flagged rather than computed, confidence that is never calibrated, an update cadence asserted rather than evidenced, breadth across countries bought at the cost of depth in any one, and legal liability that never actually moves off the importer of record. Opening any gap shows what it costs alongside the control in this design aimed at it. No product is named anywhere."
    loading="lazy"
    sandbox="allow-scripts allow-same-origin"
  ></iframe>
</div>

<span class="at-chip at-chip--proposed">Proposed</span> That scorecard is a synthesis of published product material rather than a benchmark run. It is offered as the shape of the gap this design aims at, not as a scored comparison. No vendor is named because the pattern matters more than the logo.

> That number is not a disappointment, it is a specification. It says the architecture must not be built around the model classifying goods. It must be built around the model avoiding the need to classify. When it cannot, it must be rigorously gated, meaning held back for a human check.

<details>
<summary>Data behind this chapter: benchmark and market record</summary>
<div style="overflow-x:auto">
<table>
  <thead><tr><th>Claim</th><th>Source</th><th>Verdict</th></tr></thead>
  <tbody>
    <tr><td>Fine-tuned LLaMA-3.3-70B: 40.0% at 10-digit, 57.5% at 6-digit, best published. Frontier entrants: GPT-5-Thinking 25.0% / 55.5%, Gemini-2.5-Pro-Thinking 13.5% / 31.0%. Open weights trail far behind at 10 digits</td><td>ATLAS, 200-item test set drawn from 18,731 <span class="at-term" data-def="the government's public archive of past classification decisions. Cases reach it because someone asked, so they skew towards the hard ones">CROSS</span> rulings across 2,992 codes</td><td><span class="at-chip at-chip--confirmed">Confirmed</span></td></tr>
    <tr><td>ATLAS entered six models and no Claude, Grok or Qwen model, and nothing released after Sept 2025. It is a one-off paper, not a maintained leaderboard</td><td>ATLAS, model roster</td><td><span class="at-chip at-chip--confirmed">Confirmed</span></td></tr>
    <tr><td><strong>Licensed tariff experts score 95.0% on the full 10-digit code. The best of 23 AI systems scores 46.8%</strong>, on 632 products across 32 categories graded by a panel of 26 tariff experts</td><td>HSCodeComp, arXiv 2510.19631, Oct 2025, published ACL 2026</td><td><span class="at-chip at-chip--confirmed">Confirmed</span></td></tr>
    <tr><td>HSCodeComp entered 14 foundation models, 6 open agent frameworks and 3 closed agents, so Claude, Grok, Qwen, Kimi and DeepSeek are all covered. Best agent 46.8% (SmolAgents with GPT-5), best model unaided 29.3% (GPT-5), then Gemini-2.5-Pro 24.2%, GPT-4o 18.5%, Kimi-K2 12.2%, Claude Sonnet 4 11.9%, DeepSeek-R1 6.7%, Qwen-MAX 3.8%, seven more below 2%</td><td>HSCodeComp, model roster</td><td><span class="at-chip at-chip--confirmed">Confirmed</span></td></tr>
    <tr><td><strong>Wrapping a model in tools is worth more than changing the model</strong>: the same GPT-5 rises from 29.3% unaided to 46.8% inside an agent harness, on the identical test set</td><td>HSCodeComp</td><td><span class="at-chip at-chip--confirmed">Confirmed</span></td></tr>
    <tr><td>More reasoning steps can lower accuracy rather than raise it, an effect the paper names reasoning drift. Extra thinking time does not close the gap to human experts</td><td>HSCodeComp</td><td><span class="at-chip at-chip--confirmed">Confirmed</span></td></tr>
    <tr><td>The three benchmarks are not comparable bar for bar. ATLAS uses 200 contested rulings, HSCodeComp uses 632 shop-shelf products, the product benchmark uses 103 randomly drawn rulings. Read each within its own set</td><td>Method comparison across the three papers</td><td><span class="at-chip at-chip--confirmed">Confirmed</span></td></tr>
    <tr><td>Four commercial classification products scored 89.2%, 80.0%, 44.1% and 12.8% at 10 digits on 103 classifications drawn from 100 randomly selected CROSS rulings</td><td>Benchmarking HS Classification Models</td><td><span class="at-chip at-chip--confirmed">Confirmed</span></td></tr>
    <tr><td>CROSS is a contested-case distribution. ATLAS samples contested rulings and the product benchmark samples at random, which is why the two disagree. Transfer to routine commercial goods is still unmeasured</td><td>Red-team critique C3</td><td><span class="at-chip at-chip--open">Open</span></td></tr>
    <tr><td>An AI tool deriving tariff subheadings beyond the 6-digit level, where the output directs or influences an entry, is conducting customs business. That requires a broker licence, and to 6 digits it does not. Filing Form 5106 for another party is also customs business</td><td>CBP HQ ruling H350722, 16 Jan 2026</td><td><span class="at-chip at-chip--confirmed">Confirmed</span></td></tr>
    <tr><td>A deterministic agentic workflow with fixed control flow, narrow model stages and verbatim note citation reaches 64.2% <span class="at-term" data-def="counting only the system's single best answer as correct, with no credit for a close second guess">top-1</span> at 6 digits on HSCodeComp</td><td>arXiv 2605.14857, 14 May 2026</td><td><span class="at-chip at-chip--confirmed">Confirmed</span></td></tr>
    <tr><td>Altana acquired Cervo AI on 2026-07-21, an agentic entry writer including <span class="at-term" data-def="partner government agency. Another department, such as food safety or agriculture, that also has to clear the goods">PGA</span> filings</td><td>Altana press release, Sourcing Journal</td><td><span class="at-chip at-chip--confirmed">Confirmed</span></td></tr>
    <tr><td>Deal reportedly over $100M with milestones, and 8 of the 10 largest LSPs as customers</td><td>Altana press release, company-reported, deal value press-reported</td><td><span class="at-chip at-chip--vendor-claim">Vendor claim</span></td></tr>
    <tr><td>"Process up to 5x more customs entries"</td><td>Altana press release, self-reported, no methodology</td><td><span class="at-chip at-chip--vendor-claim">Vendor claim</span></td></tr>
  </tbody>
</table>
</div>
</details>

<p class="at-fig-claim">Shows the boundary line of the whole proposal, five problems it can reach and five it cannot.</p>

<div class="visual-frame" id="fig-scope-boundary" tabindex="-1" data-fig="The scope boundary" style="--vf-h:688px; --vf-h-m:1938px">
  <iframe
    src="/visuals/customs-entry-agent/scope-boundary.html?embed=1"
    title="A two-column boundary board. On the fixable side, five icon items the design can help with: fields that disagree across documents, products approved before, missing value or origin evidence, past decisions affected by a rule change, and routing uncertainty to the right reviewer before filing. Across a dashed border wall, five it cannot fix: border congestion, random government inspections, weather theft or carrier capacity, physical damage or a missed pickup, and every other source of cross-border disruption. A footline states that the importer stays accountable either way."
    loading="lazy"
    sandbox="allow-scripts allow-same-origin"
  ></iframe>
</div>

<p class="at-fig-claim">Fourteen words this page depends on, split by which of the two vocabularies each one comes from.</p>

<div class="visual-frame" id="fig-term-board" tabindex="-1" data-fig="The vocabulary board" style="--vf-h:986px; --vf-h-m:1858px">
  <iframe
    src="/visuals/customs-entry-agent/term-board.html?embed=1"
    title="An interactive vocabulary board of fourteen icon tiles in two registers. The customs register holds HTS code, duty, customs entry, CBP with ACE and ABI, customs broker, PGA and pre-arrival processing. The AI register holds confidence, calibrated, Tier 0, Tier 1, Tier 2, materiality and verbalised certainty. Either register can be shown alone, and selecting any tile opens the plain-words definition."
    loading="lazy"
    sandbox="allow-scripts allow-same-origin"
  ></iframe>
</div>

## Chapter 3 — The solution, how every line is routed

<p class="at-plain">In plain words: sort each item by whether you have shipped it before, and spend real effort only on the ones you have not.</p>

So the design stops asking the model to name the goods. It asks one cheaper question of every <span class="at-term" data-def="one product on one invoice. A shipment of forty different products is forty lines">line</span> first: have we filed this exact <span class="at-term" data-def="stock keeping unit. One distinct product, as the business counts it">SKU</span> before? That answer decides how much work, and how much human, the line needs.

<p class="at-fig-claim">Shows the rule that sorts every line into one of three tiers, and how few of them ever reach the model.</p>

<div class="visual-frame" id="fig-novelty-router" tabindex="-1" data-fig="Sorting every line, the novelty router" style="--vf-h:705px; --vf-h-m:1323px">
  <iframe
    src="/visuals/customs-entry-agent/novelty-router.html?embed=1"
    title="Interactive tier router. A deterministic routing rule readable in ten lines feeds three clickable lanes, Tier 0 recall with zero model calls at 70 to 85 percent of lines, Tier 1 bounded deduction at 10 to 20 percent, and Tier 2 full reasoning with a mandatory human at 5 to 15 percent, with animated line items flowing into each lane."
    loading="lazy"
    sandbox="allow-scripts allow-same-origin"
  ></iframe>
</div>

<p class="at-fig-claim">Shows the permission line moving as product knowledge shrinks, the same four questions answered three ways.</p>

<div class="visual-frame" id="fig-decision-board" tabindex="-1" data-fig="The decision board" style="--vf-h:634px; --vf-h-m:1560px">
  <iframe
    src="/visuals/customs-entry-agent/decision-board.html?embed=1"
    title="Interactive decision board with three tabs for repeat, similar and new products. An automation meter shrinks from mostly machine to mostly person as the tabs move from repeat to new. Each tab answers the same four questions: what the system recognises, what AI is allowed to do, what the human owns, and the outcome. Repeat products proceed after validation against the current rulebook. Similar products require broker review. New products require a licensed decision and never file automatically."
    loading="lazy"
    sandbox="allow-scripts allow-same-origin"
  ></iframe>
</div>

<p class="at-fig-claim">Shows the four specialists that take a line needing reasoning, and the free checks every answer passes before it is scored.</p>

<div class="visual-frame" id="fig-decision-engine" tabindex="-1" data-fig="Four specialists, then the checks" style="--vf-h:550px; --vf-h-m:1288px">
  <iframe
    src="/visuals/customs-entry-agent/decision-engine.html?embed=1"
    title="Interactive decision engine. Four clickable worker cards for the classifier, valuer, origin analyst, and deterministic duty engine, followed by a validator gauntlet of five checks that tick in sequence, from citation verification through schema conformance."
    loading="lazy"
    sandbox="allow-scripts allow-same-origin"
  ></iframe>
</div>

<p class="at-fig-claim">Shows the three ways a line can leave the gate: filed automatically, sent to a broker, or signed by a licensed one.</p>

<div class="visual-frame" id="fig-confidence-gate" tabindex="-1" data-fig="The go or no-go check, the confidence gate" style="--vf-h:694px; --vf-h-m:1504px">
  <iframe
    src="/visuals/customs-entry-agent/confidence-gate.html?embed=1"
    title="Interactive confidence gate. Clickable stages show six signals fusing into a calibrated score, a materiality check, and three outcome lanes for auto accept, broker review, and licensed sign off, with sourced evidence tiles for the 71 versus 30 percent productivity gap and the 2.43 times error capture rate."
    loading="lazy"
    sandbox="allow-scripts allow-same-origin"
  ></iframe>
</div>

<p class="at-fig-claim">Worked example: when a rule changes, the system lists exactly which past decisions cited it. A lookup, not a guess.</p>

<div class="visual-frame" id="fig-invalidation-sweep" tabindex="-1" data-fig="Which past answers a rule change breaks" style="--vf-h:556px; --vf-h-m:1241px">
  <iframe
    src="/visuals/customs-entry-agent/invalidation-sweep.html?embed=1"
    title="Playable invalidation sweep. The section 338 proclamations of July 2026 expand into three scope rows which join against a board of eight illustrative product master decisions, stamping the affected ones for review, including a decision whose only recorded reason was USMCA qualifying therefore exempt."
    loading="lazy"
    sandbox="allow-scripts allow-same-origin"
  ></iframe>
</div>

<details>
<summary>Data behind this chapter: confidence evidence and the July 2026 tariff sequence</summary>
<div style="overflow-x:auto">
<table>
  <thead><tr><th>Claim</th><th>Source</th><th>Verdict</th></tr></thead>
  <tbody>
    <tr><td><strong>Asking a model how sure it is, and reading the certainty numbers inside it, each win on some models and lose on others.</strong> Neither is portable across model families. In the technical terms: verbalised confidence versus <span class="at-term" data-def="the model's own internal numbers for how likely each word it chose was">logprobs</span></td><td>ConfBench, arXiv 2608.01792, Aug 2026</td><td><span class="at-chip at-chip--confirmed">Confirmed</span></td></tr>
    <tr><td><strong>The best model sorts its right answers from its wrong ones well, and its stated confidence is close to the truth. The worst is badly overconfident.</strong> In the technical terms: 0.84 <span class="at-term" data-def="a score from 0.5 to 1 for how well a confidence number separates right answers from wrong ones. 0.5 is a coin toss">AUROC</span> with <span class="at-term" data-def="expected calibration error. How far a stated confidence sits from the real hit rate. 0.05 means a claimed 90% is really about 85 to 95%">ECE</span> 0.05, against ECE 0.31</td><td>ConfBench</td><td><span class="at-chip at-chip--confirmed">Confirmed</span></td></tr>
    <tr><td><strong>If a person can only check 3 lines in 10, letting the confidence score choose which 3 catches 2.43 times as many errors as picking at random.</strong> Best configuration measured</td><td>ConfBench</td><td><span class="at-chip at-chip--confirmed">Confirmed</span></td></tr>
    <tr><td><strong>Combining several different measures of confidence beats trusting any one of them.</strong> The combining is done with <span class="at-term" data-def="a standard, well understood way of blending many weak signals into one stronger score. Not itself a language model">gradient boosting</span></td><td>Beyond Logprobs, arXiv 2606.24420, Jun 2026</td><td><span class="at-chip at-chip--confirmed">Confirmed</span></td></tr>
    <tr><td><strong>Letting the system decide which lines a person needs to look at gives a 71% productivity gain. Making a person approve every line gives 30%.</strong> Median figures</td><td>Unstract, 2026, industry source, magnitude treated cautiously</td><td><span class="at-chip at-chip--proposed">Directional</span></td></tr>
  </tbody>
</table>
</div>
<div style="overflow-x:auto">
<table>
  <thead><tr><th>Date (2026)</th><th>Event</th><th>Why it breaks naive systems</th></tr></thead>
  <tbody>
    <tr><td>Jul 20</td><td>Three <span class="at-term" data-def="a 1930 law letting the president add duties on a country's goods without waiting for an investigation">Section 338</span> proclamations signed: an extra 50% on a broad slate of Canadian goods from Aug 19, applying even to <span class="at-term" data-def="the trade agreement between the US, Mexico and Canada. Goods that qualify under it usually pay less, or nothing">USMCA</span>-qualifying product</td><td>Invalidates a structural assumption, not a rate. Any "USMCA therefore exempt" reasoning is now unsafe for CA origin</td></tr>
    <tr><td>Jul 24, 12:01 am</td><td><span class="at-term" data-def="a law letting the president impose a temporary across-the-board duty to address a trade deficit. It expires by statute">Section 122</span>'s 10% global duty expires at the same moment <span class="at-term" data-def="a law letting the president act against another country's unfair trade practices. The usual vehicle for targeted tariffs">Section 301</span> forced-labour duties take effect across 60 economies at 10% or 12.5%</td><td>Two regime changes in one instant, with USMCA and <span class="at-term" data-def="the trade agreement covering Central America and the Dominican Republic">CAFTA-DR</span> textile carve-outs to track</td></tr>
    <tr><td>Whole month</td><td>Four rulebook changes in thirty days</td><td>Corpus updates must ship in hours. A rulebook behind a code-release train is wrong exactly when it matters most</td></tr>
  </tbody>
</table>
</div>
</details>

## Chapter 4 — The build, end to end

<p class="at-plain">In plain words: this is the actual wiring, on Amazon&rsquo;s cloud. Skip it if you are not the one building it.</p>

This chapter is the build. One topology carries all four journeys. The drawing shows what the design will not allow: no model output reaches the government filing system without passing the gate.

<p class="at-fig-claim">Illustrative: four line items, four different amounts of work, and one system that carries all four.</p>

<div class="visual-frame" id="fig-entry-lifecycle" tabindex="-1" data-fig="End to end, four journeys" style="--vf-h:779px; --vf-h-m:806px">
  <iframe
    src="/visuals/customs-entry-agent/entry-lifecycle-flow.html?embed=1"
    title="On a narrow screen this figure opens as a summary card, with a button that loads the full interactive stencil. An orthogonally routed stencil of the entry lifecycle, with four selectable scenarios over one topology. Fifteen stages run left to right: documents arrive, a sandboxed parse inside a quarantine frame with no route out, entity resolution, the novelty router, the three decision tiers of recall, deduce and reason, the validator gauntlet, the confidence gate, the three dispositions of auto-accept, broker review and licensed sign-off, assembly and filing, and the append-only audit ledger, with the always-on rulebook watcher above. Choosing repeat SKU, near neighbour, genuinely novel or rulebook change recesses everything outside that journey and reduces the step scrubber to that journey's steps. Packets ride the connectors in flow order, twelve numbered badges follow the repeat path and the invalidation loop, and every stage opens a detail card. Pan, zoom and fullscreen are available, and all motion stops under reduced motion."
    loading="eager"
    allow="fullscreen"
    sandbox="allow-scripts allow-same-origin"
  ></iframe>
</div>

<p class="at-fig-claim">The same picture in AWS's own stencil language, with every account, network section and connector an architect would need to build it.</p>

<div class="visual-frame" id="fig-aws-stencil" tabindex="-1" data-fig="The AWS stencil" style="--vf-h:1087px; --vf-h-m:491px">
  <iframe
    src="/visuals/customs-entry-agent/aws-stencil.html?embed=1"
    title="On a narrow screen this figure opens as a summary card with a button that loads the full stencil. The AWS reference architecture drawn as a conventional solution-architecture stencil, with official AWS Architecture Icons on a plain canvas and nested AWS Cloud, Region, VPC, subnet and account frames. Customer and partner systems sit outside the cloud on the left, feeding a four path intake component of API Gateway, Amazon SES and AWS Transfer Family into one content addressed S3 document store. EventBridge starts a Step Functions execution per entry. Inside the VPC, a quarantine subnet with no egress holds the sandboxed parser, a decision subnet holds the novelty router, the decision workers and the model gateway, an endpoint subnet holds the Bedrock and Textract interface endpoints, an application subnet holds the confidence gate and the review queue, a data subnet holds Aurora and ElastiCache, and a filing subnet holds the ABI adapter and the credential proxy. A workload-prod account frame wraps the Region, and separate sibling frames mark the shared services, org security and log archive accounts. CBP ACE and the PGA message sets sit outside AWS on the right. Eighteen numbered badges trace the entry from upload to ledger, two dashed red routes with crosses mark paths that do not exist by construction, and an eleven step scrubber walks the flow one hop at a time. Pan, zoom, fullscreen and per service detail cards are available."
    loading="lazy"
    allow="fullscreen"
    sandbox="allow-scripts allow-same-origin"
  ></iframe>
</div>

<p class="at-fig-claim">Worked example: five roles share one entry, and the drawing says which of them is accountable at each step.</p>

<div class="visual-frame" id="fig-who-does-what" tabindex="-1" data-fig="Who does what" style="--vf-h:925px; --vf-h-m:1293px">
  <iframe
    src="/visuals/customs-entry-agent/user-flow.html?embed=1"
    title="Persona swimlane user flow. Lanes for importer operations, the system, the broker reviewer, the licensed customs broker, and the compliance lead. Scenario buttons switch between the happy path, a CBP reject that returns to the review queue and is refiled by a human, and a deadline risk path where the statutory clock pages the compliance lead and force routes every unresolved line to human review. A transport steps through each scenario with narration."
    loading="lazy"
    sandbox="allow-scripts allow-same-origin"
  ></iframe>
</div>

<p class="at-fig-claim">Lays out every system this platform depends on, with a contract on each one rather than an arrow.</p>

<div class="visual-frame" id="fig-integrations" tabindex="-1" data-fig="Integrations and contracts" style="--vf-h:1432px; --vf-h-m:1377px">
  <iframe
    src="/visuals/customs-entry-agent/integration-map.html?embed=1"
    title="On a narrow screen this figure opens as a summary card, with a button that loads the full interactive map. An orthogonally routed stencil of every external integration. On the left, outside the platform, sit three inbound commercial systems, the importer ERP or TMS, supplier email and EDI or AS2 partners, and four read-only authority feeds, the Federal Register, CBP CSMS, USITC HTS and CBP CROSS rulings. In the middle the platform frame holds a per-entry path of intake and normalisation, decisioning and gate, and the ABI adapter, alongside a separate rulebook plane account holding the rulebook watcher and the pinned corpus versions. On the right, outside the platform, sit CBP ACE over ABI with asynchronous responses, the PGA message sets, and the customer BI and exposure export. A dashed red route with a cross marks the write path from decisioning to the corpus that does not exist. Direction buttons narrow the drawing to inbound, outbound or the rulebook plane, and every system opens a contract card with its transport, cadence, idempotency key and failure semantics."
    loading="lazy"
    allow="fullscreen"
    sandbox="allow-scripts allow-same-origin"
  ></iframe>
</div>

<p class="at-fig-claim">Worked example: one product's decision history, from the first draft through a human override to a re-derivation after a rule change.</p>

<div class="visual-frame" id="fig-audit-ledger" tabindex="-1" data-fig="The record that cannot be edited" style="--vf-h:597px; --vf-h-m:1723px">
  <iframe
    src="/visuals/customs-entry-agent/audit-ledger.html?embed=1"
    title="Interactive audit ledger. Four record cards for one SKU chain through supersession, from an agent proposal to a broker override, a watcher invalidation, and a re-derivation, each pinning its model, prompt, corpus, and rulebook versions, with retention and discoverability rules beneath."
    loading="lazy"
    sandbox="allow-scripts allow-same-origin"
  ></iframe>
</div>

<p class="at-anchor" id="service-register" tabindex="-1"></p>

<p class="at-fig-claim">Every build choice with the alternative it rejected, and the four that the rest of the design rests on marked as such.</p>

<div class="visual-frame" id="fig-service-register" tabindex="-1" data-fig="Fourteen build choices" style="--vf-h:787px; --vf-h-m:1583px">
  <iframe
    src="/visuals/customs-entry-agent/service-register.html?embed=1"
    title="An interactive grid of fourteen icon tiles, one per build decision, covering orchestration, sandboxed parsing, decision workers, retrieval and data, agent framework, audit ledger, rulebook corpus, review queue, trigger plumbing, inference egress, secrets, rulebook feeds, observability and account structure. Four tiles are marked as load-bearing, meaning the design changes shape if they are reversed: orchestration, the deliberate absence of an agent framework, the append-only audit ledger and the Object-Locked rulebook corpus. The grid can be filtered to those four alone. Opening any tile shows the choice against the alternative it rejected and what would flip it."
    loading="lazy"
    sandbox="allow-scripts allow-same-origin"
  ></iframe>
</div>

## Chapter 5 — The money

<p class="at-plain">In plain words: the bill is people&rsquo;s time, not computing. What decides the cost is how many items you can answer from memory.</p>

The economics turn on tier mix, not on which model you buy. Shift lines from [Tier 2 to Tier 0](#fig-novelty-router) and the cost per entry falls.

The published evidence for customs automation is quoted loosely everywhere, so it is worth being precise.

<span class="at-chip at-chip--confirmed">Confirmed</span> The OECD estimates that trade costs have "declined by up to 5%" over the last decade, as a result of more efficient border processes. Ambitious reform could deliver "up to 12 percentage points more". Those are economy-level estimates drawn from a trade-cost index covering 2012 to 2022. Automation of border processes is one of ten policy areas behind that number, not the whole of it.

<span class="at-chip at-chip--open">Open</span> Clearance time is worse served. There is no Time Release Study for the United States, Mexico or Canada. The effect of automation on North American release times has not been measured. The nearest study with a stated method is Japanese and dated 2009, and it found sea cargo released in 2.2 days with pre-arrival processing against 2.9 days without.

The honest position: automation is well supported as a direction and poorly supported as a number. So the model below is built from this design’s own arithmetic rather than borrowed macroeconomics.

<div class="stat-strip">
  <div class="at-stat"><b>60 to 75%</b><strong class="at-stat-claim">Expect 60 to 75% of entries to file with no human by month 12.</strong><span>Straight-through means an entry filed with no human touching it, and vendor material implies 95%.</span></div>
  <div class="at-stat good"><b>71% vs 30%</b><strong class="at-stat-claim">Gating quality decides whether review productivity is 71% or 30%.</strong><span>Reviewing only what the gate escalates lifts productivity by 71%, against 30% when a human approves every line.</span></div>
  <div class="at-stat warn"><b>Minutes, not tokens</b><strong class="at-stat-claim">Human review time, not model usage, is the bill.</strong><span>Reviewer minutes dominate cost at any realistic token price, so tier mix wins the business case, not model choice.</span></div>
  <div class="at-stat alert"><b>50% repeat rate</b><strong class="at-stat-claim">Stop the programme if fewer than half the lines are products the customer has shipped before.</strong><span>The kill criterion. Below it, no model is cheap enough to rescue the tier mix.</span></div>
</div>

<p class="at-fig-claim">Illustrative: this is where the money goes on one entry, with human minutes and model cost split apart for each tier.</p>

<div class="visual-frame" id="fig-cost-structure" tabindex="-1" data-fig="Cost structure" style="--vf-h:691px; --vf-h-m:1507px">
  <iframe
    src="/visuals/customs-entry-agent/cost-structure.html?embed=1"
    title="Interactive cost structure. The cost per entry equation, three clickable tier columns with illustrative stacked bars splitting inference from human minutes, the reviewer capacity formula, and the honest straight through expectation against the vendor claim."
    loading="lazy"
    sandbox="allow-scripts allow-same-origin"
  ></iframe>
</div>

<p class="at-fig-claim">Illustrative: drive the two numbers you can measure in week one and watch both kill criteria light up.</p>

<div class="visual-frame" id="fig-roi-model" tabindex="-1" data-fig="The ROI model" style="--vf-h:588px; --vf-h-m:1195px">
  <iframe
    src="/visuals/customs-entry-agent/roi-model.html?embed=1"
    title="Illustrative interactive cost model. Four sliders for monthly line items, SKU repeat rate, review minutes, and reviewer cost drive live outputs for straight through rate, reviewers needed, cost per line against a manual baseline, and two kill criteria lamps."
    loading="lazy"
    sandbox="allow-scripts allow-same-origin"
  ></iframe>
</div>

## Chapter 6 — Where it breaks, and the plan

<p class="at-plain">In plain words: here is what we could not make work, what we left out, and the order to build the rest in.</p>

<p class="at-anchor" id="kill-criteria" tabindex="-1"></p>

Build the rulebook watcher first, then assisted drafting, then selective straight-through. The SKU repeat rate, the share of lines that are products the customer has shipped before, must clear 50% to carry on.

<p class="at-fig-claim">Shows what the red team broke, and which parts of the customs lifecycle this design does not yet cover.</p>

<div class="visual-frame" id="fig-gap-map" tabindex="-1" data-fig="Red team and coverage" style="--vf-h:417px; --vf-h-m:719px">
  <iframe
    src="/visuals/customs-entry-agent/gap-map.html?embed=1"
    title="Tabbed gap instrument. The red team tab holds six clickable critiques from the load bearing repeat rate assumption to automation bias, and the lifecycle tab maps coverage from ISF through liquidation and protest with cards for prior disclosure, bond sufficiency, and broker supervision rules."
    loading="lazy"
    sandbox="allow-scripts allow-same-origin"
  ></iframe>
</div>

<p class="at-anchor" id="gate-theatre" tabindex="-1"></p>

<p class="at-fig-claim">Shows the three delivery waves in order, and the gate each one must pass before the next begins.</p>

<div class="visual-frame" id="fig-wave-plan" tabindex="-1" data-fig="The delivery plan" style="--vf-h:766px; --vf-h-m:1662px">
  <iframe
    src="/visuals/customs-entry-agent/wave-plan.html?embed=1"
    title="Interactive delivery plan. Three clickable wave cards for the rulebook watcher, assisted drafting, and selective straight through carry team shapes and exit gates, above a kill criteria strip and an open questions docket with four stamped rows."
    loading="lazy"
    sandbox="allow-scripts allow-same-origin"
  ></iframe>
</div>

<div class="note-panel at-coda">
  <p><strong>Where this leaves you</strong>: the design does not ask a model to name the goods. It sorts every line by whether the answer already exists, replays the ones a human approved, and gates the rest.</p>
  <p>Three numbers decide whether it is worth starting. Fewer than half the lines being repeat products kills it. One licensed reviewer per 2,000 reviewed lines a month is the staffing shape. Sixty to seventy-five per cent filing with no human by month twelve is the honest target, not the ninety-five vendors imply.</p>
  <p>All three are measurable in week one, before a line of the system is built.</p>
</div>
