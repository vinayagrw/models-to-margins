---
title: "The Measured Workflow Factory: Records, Meters and a Way Out"
summary: "Regulator texts, a court order, surveys and vendor releases, most from the last sixty days, point to one delivery method for AI in regulated work. Build one bounded workflow at a time, and build three things into it: a record of each decision, a meter on the outcome, and the ability to change the model underneath. A design proposal."
pubDate: 2026-10-03
geography: United States and European Union
horizon: 0 to 2 years
template: ledger
bpEyebrow: File MWF-01
bpTitle: The Measured Workflow Factory
bpSubtitle: One workflow at a time, with the record, the meter and the exit built in.
bpCoords:
  - Window · 2026-08-04 to 2026-10-03
  - Sources · 25
  - Exhibits · 12
  - Status · proposal, unbuilt
tags:
  - ai delivery
  - decision records
  - ai roi
  - model portability
  - ai regulation
  - workflow design
audience: Operations, risk and engineering leads putting AI into regulated workflows
readTime: 16 min read
listed: true
featured: false
---

<div class="mwf-console">
<link rel="stylesheet" href="/styles/mwf-story.css">
<svg class="mwf-sprite" aria-hidden="true" focusable="false">
<symbol id="mwf-i-intake" viewBox="0 0 80 80"><path d="M14 46 24 20h32l10 26v16H14z"/><path d="M14 46h16c0 6 4 9 10 9s10-3 10-9h16"/></symbol>
<symbol id="mwf-i-ai" viewBox="0 0 80 80"><rect x="24" y="24" width="32" height="32" rx="3"/><rect x="33" y="33" width="14" height="14"/><path d="M32 24v-9M40 24v-9M48 24v-9M32 65v-9M40 65v-9M48 65v-9M24 32h-9M24 40h-9M24 48h-9M65 32h-9M65 40h-9M65 48h-9"/></symbol>
<symbol id="mwf-i-router" viewBox="0 0 80 80"><path d="M12 40h22M34 40l26-18M34 40l26 18"/><path d="M52 20l9 2-3 9M58 49l3 9-9 2"/><circle cx="34" cy="40" r="5"/></symbol>
<symbol id="mwf-i-review" viewBox="0 0 80 80"><circle cx="36" cy="26" r="11"/><path d="M14 64c0-13 9-20 22-20 6 0 11 1 15 4"/><path d="M48 58l7 7 13-15"/></symbol>
<symbol id="mwf-i-writeback" viewBox="0 0 80 80"><ellipse cx="40" cy="22" rx="22" ry="8"/><path d="M18 22v36c0 5 10 8 22 8s22-3 22-8V22"/><path d="M18 40c0 5 10 8 22 8s22-3 22-8"/></symbol>
<symbol id="mwf-i-record" viewBox="0 0 80 80"><path d="M20 12h28l12 12v44H20z"/><path d="M48 12v12h12M28 34h24M28 44h24M28 54h12"/><circle cx="52" cy="57" r="6"/></symbol>
<symbol id="mwf-i-meter" viewBox="0 0 80 80"><path d="M12 56a28 28 0 0 1 56 0"/><path d="M40 56l14-20"/><circle cx="40" cy="56" r="4"/><path d="M12 66h56M20 40l-5-3M60 40l5-3M40 28v-6"/></symbol>
<symbol id="mwf-i-exit" viewBox="0 0 80 80"><rect x="10" y="14" width="24" height="22" rx="3"/><rect x="46" y="44" width="24" height="22" rx="3"/><path d="M40 22h14c4 0 6 2 6 6v8M54 30l6 7 6-7M40 58H26c-4 0-6-2-6-6v-8M14 50l6-7 6 7"/></symbol>
<symbol id="mwf-i-gateway" viewBox="0 0 80 80"><rect x="28" y="16" width="24" height="48" rx="3"/><circle cx="40" cy="40" r="5"/><path d="M10 40h18M52 26h18M52 54h18M64 21l6 5-6 5M64 49l6 5-6 5"/></symbol>
</svg>
<p class="mwf-meta">Run date October 3, 2026 &middot; Research window August 4 to October 3, 2026 &middot; A proposal, unbuilt &middot; Researched and drafted by AI agents under the author's direction, with no outside reviewer &middot; Numbered references open the source itself.</p>
<div class="mwf-kpis">
<div class="mwf-kpi"><span class="mwf-kpi-l">Rank AI a strategic priority</span><b><span data-count="97">97</span>%</b><small>BCG, 30 logistics companies<sup class="mwf-ref"><a href="https://www.bcg.com/publications/2026/why-ai-isnt-delivering-roi-logistics" rel="noopener" title="Vendor claim: BCG survey of 30 logistics companies: 97% priority, 13% measurable impact">1</a></sup></small></div>
<div class="mwf-kpi mwf-kpi--warn"><span class="mwf-kpi-l">Report measurable financial impact</span><b><span data-count="13">13</span>%</b><small>Same survey, same respondents<sup class="mwf-ref"><a href="https://www.bcg.com/publications/2026/why-ai-isnt-delivering-roi-logistics" rel="noopener" title="Vendor claim: BCG survey of 30 logistics companies: 97% priority, 13% measurable impact">1</a></sup></small></div>
<div class="mwf-kpi"><span class="mwf-kpi-l">Notice before one model retires</span><b><span data-count="61">61</span> days</b><small>30 September to 30 November 2026<sup class="mwf-ref"><a href="https://platform.claude.com/docs/en/about-claude/model-deprecations" rel="noopener" title="Confirmed: Anthropic model deprecations page: 60-day policy, 30 September notice">23</a></sup></small></div>
<div class="mwf-kpi"><span class="mwf-kpi-l">EU Annex III high-risk rules apply</span><b>2 Dec 2027</b><small>European Commission, after the July omnibus<sup class="mwf-ref"><a href="https://digital-strategy.ec.europa.eu/en/news/ai-omnibus-enters-force" rel="noopener" title="Confirmed: European Commission: AI omnibus in force, high-risk rules from 2 December 2027 (news page, not legal text)">7</a></sup></small></div>
</div>
<section class="mwf-exec" aria-label="Executive summary">
<p class="mwf-exec-k">Executive summary</p>
<p class="mwf-exec-lead">Put AI into regulated work one bounded workflow at a time, and build three parts into each one: a record of every decision, a meter on the outcome, and the ability to change the model underneath. This is a design proposal. It has not been built.</p>
<ol class="mwf-exec-list">
<li><b>97% rank AI a priority, 13% report impact</b><span>Both figures come from one survey of 30 logistics companies, and the second is measurable financial impact. No audited, enterprise-level AI saving from a regulated operator was found in the pages reached for the research window.</span></li>
<li><b>Record and result are joined in the workflow</b><span>A separate evidence platform records what the model did and does not see what happened to the case afterwards. That is why the proposal puts the record inside each workflow.</span></li>
<li><b>61 days from notice to retirement for one model</b><span>One supplier gave notice on September 30 for a retirement on November 30. The proposal is to qualify a second model and time one switch before go-live.</span></li>
</ol>
<p class="mwf-exec-ask"><span>The decision this asks of you</span>Pick one workflow that passes the scorecard. Agree the baseline and the stop conditions before the build. Review at day 30, 60 and 90.</p>
</section>
<div class="mwf-lead">
<p class="mwf-h">What each leader decides</p>
<p class="mwf-sub">Each row is drawn from the sections below. The split by role is my proposal. <span class="ld-stamp ld-stamp--proposed">Proposed</span></p>
<div class="table-wrap">
<table class="mwf-roles">
<thead><tr><th>Role</th><th>Decide</th><th>Ask for</th></tr></thead>
<tbody>
<tr><td data-label="Role">Chief executive</td><td data-label="Decide">Which one workflow goes first, and who can stop it</td><td data-label="Ask for">The scorecard result and the written stop conditions</td></tr>
<tr><td data-label="Role">Finance chief</td><td data-label="Decide">The unit, the baseline and the comparison group, before the build</td><td data-label="Ask for">A result computed by finance from the firm's own data, with an uncertainty range</td></tr>
<tr><td data-label="Role">Operations chief</td><td data-label="Decide">Who reviews exceptions and adverse outcomes</td><td data-label="Ask for">The reviewer catch rate on seeded errors</td></tr>
<tr><td data-label="Role">Risk chief and counsel</td><td data-label="Decide">How much detail the record keeps, given that it can be ordered produced</td><td data-label="Ask for">One record export, and the erasure and legal-hold drill</td></tr>
<tr><td data-label="Role">Technology chief</td><td data-label="Decide">That the firm owns the gateway in front of the model</td><td data-label="Ask for">One timed switch to the second model before go-live</td></tr>
<tr><td data-label="Role">AI lead</td><td data-label="Decide">Which two models are qualified for the workflow</td><td data-label="Ask for">A regression set built from reviewed cases, rerun on any change</td></tr>
</tbody>
</table>
</div>
</div>
<figure class="mwf-fig mwf-hero" data-fig="The factory, running">
<p class="mwf-h">One workflow, three things built into it</p>
<p class="mwf-sub">Cases move through a fixed chain of five steps. Every step writes to the record, and every finished case is joined to its outcome.</p>
<div class="mwf-lane">
<div class="mwf-track" aria-hidden="true"><i class="mwf-tok" style="--d:-0s; --k:0"></i><i class="mwf-tok" style="--d:-3s; --k:1"></i><i class="mwf-tok" style="--d:-6s; --k:2"></i><i class="mwf-tok" style="--d:-9s; --k:3"></i></div>
<div class="mwf-node" style="--p:1.2s"><svg class="mwf-icon" viewBox="0 0 80 80" aria-hidden="true"><use href="#mwf-i-intake"/></svg><b>Intake</b><span>One case, one stable ID</span></div>
<div class="mwf-node" style="--p:0.6s"><svg class="mwf-icon" viewBox="0 0 80 80" aria-hidden="true"><use href="#mwf-i-ai"/></svg><b>AI step</b><span>Extract, classify, draft</span></div>
<div class="mwf-node" style="--p:0s"><svg class="mwf-icon" viewBox="0 0 80 80" aria-hidden="true"><use href="#mwf-i-router"/></svg><b>Exception router</b><span>Sends doubtful cases to a person</span></div>
<div class="mwf-node" style="--p:2.4s"><svg class="mwf-icon" viewBox="0 0 80 80" aria-hidden="true"><use href="#mwf-i-review"/></svg><b>Human review</b><span>Action and reason recorded</span></div>
<div class="mwf-node" style="--p:1.8s"><svg class="mwf-icon" viewBox="0 0 80 80" aria-hidden="true"><use href="#mwf-i-writeback"/></svg><b>Write-back</b><span>System of record holds the outcome</span></div>
</div>
<figcaption>An animation of the proposed design. Nothing here has been built.</figcaption>
</figure>
</div>

## The gap

Executives keep being asked whether AI pays, and the answers depend on who asks. Grant Thornton's third-quarter survey of nearly 230 US finance leaders found 84% saying AI returns meet or exceed expectations.<sup class="mwf-ref"><a href="https://www.grantthornton.com/insights/press-releases/2026/september/grant-thornton-survey-cfo-profit-optimism-reaches-record-high" rel="noopener" title="Vendor claim: Grant Thornton Q3 survey, nearly 230 US finance leaders: 84% meet or exceed">2</a></sup> In the same weeks, 65% of the 54 finance chiefs at an Open Future Forum session in August named proving the return as their main blocker, after a rise from 53% within the month. The forum labels that sample directional, and the figure across all 290 respondents is 55%.<sup class="mwf-ref"><a href="https://openfutureforum.com/research/cfo-ai-leverage-report-september-2026" rel="noopener" title="Vendor claim: Open Future Forum CFO report: 53% to 65% in August, n=54, 55% across 290">3</a></sup> BCG's survey of 30 logistics operators put strategic priority at 97% and measurable financial impact at 13%.<sup class="mwf-ref"><a href="https://www.bcg.com/publications/2026/why-ai-isnt-delivering-roi-logistics" rel="noopener" title="Vendor claim: BCG survey of 30 logistics companies: 97% priority, 13% measurable impact">1</a></sup>

These are opinions, collected by firms that sell advice. The questions differ from survey to survey, so the figures cannot be set against each other directly. Where a survey asks about measured impact, as BCG's does, the share is far below the share reporting enthusiasm.

<figure class="mwf-fig" data-fig="Asked, not measured">
<p class="mwf-h">Four surveys, four different questions</p>
<p class="mwf-sub">Share, 0 to 100. Each row says what is counted. Only the first row holds two answers from one survey. <span class="ld-stamp ld-stamp--vendor-claim">Vendor claim</span></p>
<div class="mwf-dots">
<div class="mwf-axis" aria-hidden="true"><span></span><div><span style="left:0">0</span><span style="left:25%">25</span><span style="left:50%">50</span><span style="left:75%">75</span><span style="left:100%">100</span></div></div>
<div class="mwf-row"><div><b>BCG, 30 logistics companies</b><small>AI is a strategic priority, against measurable financial impact</small></div><div class="mwf-rail" role="img" aria-label="97 percent priority, 13 percent measurable impact"><i class="mwf-link" style="--a:13; --b:97"></i><span class="mwf-dot mwf-dot--measured" style="--v:13">13</span><span class="mwf-dot" style="--v:97">97</span></div></div>
<div class="mwf-row"><div><b>Grant Thornton, nearly 230 finance leaders</b><small>AI returns meet or exceed expectations</small></div><div class="mwf-rail" role="img" aria-label="84 percent"><span class="mwf-dot" style="--v:84">84</span></div></div>
<div class="mwf-row"><div><b>Open Future Forum, 290 respondents</b><small>Proving the return is the main blocker</small></div><div class="mwf-rail" role="img" aria-label="55 percent"><span class="mwf-dot mwf-dot--blocker" style="--v:55">55</span></div></div>
<div class="mwf-row"><div><b>IBM, 2,000 chief executives, 2025</b><small>Share of AI initiatives that delivered the expected return</small></div><div class="mwf-rail" role="img" aria-label="25 percent"><span class="mwf-dot mwf-dot--measured" style="--v:25">25</span></div></div>
</div>
<p class="mwf-key"><span><i></i>Enthusiasm or satisfaction</span><span><i class="m"></i>Measured or delivered</span><span><i class="b"></i>Cannot prove it</span></p>
<figcaption>The questions differ, so the rows cannot be set against each other directly. The IBM figure is a share of initiatives and dates from May 2025, before the research window.<sup class="mwf-ref"><a href="https://www.bcg.com/publications/2026/why-ai-isnt-delivering-roi-logistics" rel="noopener" title="Vendor claim: BCG survey of 30 logistics companies: 97% priority, 13% measurable impact">1</a></sup><sup class="mwf-ref"><a href="https://www.grantthornton.com/insights/press-releases/2026/september/grant-thornton-survey-cfo-profit-optimism-reaches-record-high" rel="noopener" title="Vendor claim: Grant Thornton Q3 survey, nearly 230 US finance leaders: 84% meet or exceed">2</a></sup><sup class="mwf-ref"><a href="https://openfutureforum.com/research/cfo-ai-leverage-report-september-2026" rel="noopener" title="Vendor claim: Open Future Forum CFO report: 53% to 65% in August, n=54, 55% across 290">3</a></sup><sup class="mwf-ref"><a href="https://newsroom.ibm.com/2025-05-06-ibm-study-ceos-double-down-on-ai-while-navigating-enterprise-hurdles" rel="noopener" title="Vendor claim: IBM CEO study, 2,000 CEOs: 25% of initiatives delivered expected return (survey chart only)">6</a></sup></figcaption>
</figure>

The official statistics are no more decisive. US nonfarm business labour productivity rose 2.2% in the year to the second quarter of 2026, and the Bureau of Labor Statistics item reporting it does not mention AI.<sup class="mwf-ref"><a href="https://www.bls.gov/opub/ted/2026/productivity-up-2-2-percent-from-second-quarter-2025-to-second-quarter-2026.htm" rel="noopener" title="Confirmed: BLS: nonfarm business labour productivity up 2.2% year on year, Q2 2026">4</a></sup> The Dallas Fed found 3.7% annualised productivity growth since early 2024 in three AI-exposed sectors against 1.7% elsewhere, and says this is correlation, not cause.<sup class="mwf-ref"><a href="https://www.dallasfed.org/research/economics/2026/0707" rel="noopener" title="Confirmed: Dallas Fed: 3.7% against 1.7% productivity growth, correlation only">5</a></sup>

I did not find an audited, enterprise-level AI saving published by a regulated operator inside the window. That matches what an earlier piece on this site reported for retail and logistics, [AI Governance Arrives Before AI ROI Does](/deep-dives/ai-governance-before-roi), and I will not repeat its argument here. This page asks the next question: if you are putting AI into a regulated workflow this year, what should the delivery include so that the return can be shown and the decisions can be defended?

<p class="mwf-take"><span>What this means</span>Most of the survey figures above record opinion. A firm that wants a measured number has to produce it for its own workflow.</p>

## The factory

The proposal is a delivery method. Take one bounded, countable workflow: a claim, a prior-authorisation request, a lease enquiry, a shipment exception. Deliver it as a fixed chain of steps with a person on exceptions. Build three parts into it from the first day.

<div class="mwf-pin">
<div class="mwf-pin-stage">
<figure class="mwf-fig" data-fig="Lane and built-in parts">
<ol class="mwf-chain">
<li data-k="intake"><i>01</i>Intake</li>
<li data-k="ai"><i>02</i>AI step</li>
<li data-k="router"><i>03</i>Exception router</li>
<li data-k="review"><i>04</i>Human review</li>
<li data-k="writeback"><i>05</i>Write-back</li>
</ol>
<p class="mwf-band"><span class="mwf-mono">Built into the workflow</span></p>
<div class="mwf-parts">
<div class="mwf-part" data-p="record"><svg class="mwf-icon" viewBox="0 0 80 80" aria-hidden="true"><use href="#mwf-i-record"/></svg><b>Decision record</b></div>
<div class="mwf-part" data-p="meter"><svg class="mwf-icon" viewBox="0 0 80 80" aria-hidden="true"><use href="#mwf-i-meter"/></svg><b>Outcome meter</b></div>
<div class="mwf-part" data-p="exit"><svg class="mwf-icon" viewBox="0 0 80 80" aria-hidden="true"><use href="#mwf-i-exit"/></svg><b>Exit</b></div>
</div>
</figure>
</div>
<div class="mwf-steps">
<div class="mwf-step" data-on="intake ai router review writeback" data-part=""><p class="mwf-mono">1 of 5 &middot; The lane</p><p>There is no autonomous agent on the decision path. The pattern is a fixed chain of steps with rule-based routing to a human checkpoint, because I found no production agent with published, measured results and no human gate. That is an absence in what I could read, and it may not hold for long.</p></div>
<div class="mwf-step" data-on="router review" data-part=""><p class="mwf-mono">2 of 5 &middot; The checkpoint</p><p>Cases are routed to a person by rule, such as any adverse outcome or any missing field, and not by the model's stated confidence, because nothing I read shows that confidence to be a reliable signal.</p></div>
<div class="mwf-step" data-on="intake ai router review writeback" data-part="record"><p class="mwf-mono">3 of 5 &middot; Built in: the decision record</p><p>Every step writes one entry, from the case ID to the retention class. The workflow writes it, so nothing depends on a vendor log.</p></div>
<div class="mwf-step" data-on="intake writeback" data-part="meter"><p class="mwf-mono">4 of 5 &middot; Built in: the outcome meter</p><p>The case ID from intake is joined to the outcome in the system of record. Unit cost, cycle time and reversal rate are compared with a holdout or a stepped rollout, and the client computes the number.</p></div>
<div class="mwf-step" data-on="ai" data-part="exit"><p class="mwf-mono">5 of 5 &middot; Built in: the exit</p><p>The AI step calls models through a gateway the client owns. A regression set and a timed switch drill show whether the workflow still passes when the model changes.</p></div>
</div>
</div>

### From one workflow to the next

"Factory" is meant in the plain sense. The second workflow reuses the record writer, the outcome join and the switch drill from the first, so each one costs less to instrument than the last. That claim is untested. Nothing here has been built.

In the proposal, what carries over is the record writer, the outcome join and the switch drill. What is rebuilt each time belongs to the workflow: the baseline, the regression set of reviewed cases, the routing rules and the reviewers' reason codes. The scorecard is applied again to each candidate. How record formats stay consistent across many workflows is not worked out here.

<figure class="mwf-fig" data-fig="Where each part sits">
<p class="mwf-h">Four components, and what breaks without each</p>
<p class="mwf-sub">The failure behaviour is my proposal for the design. None of it has been tested. <span class="ld-stamp ld-stamp--proposed">Proposed</span></p>
<div class="mwf-sys">
<div><svg class="mwf-icon" viewBox="0 0 80 80" aria-hidden="true"><use href="#mwf-i-gateway"/></svg><b>Gateway</b><small>Owned by the client. The AI step calls models through it.</small><p><span class="mwf-mono">If it fails</span>The AI step cannot reach a model. Cases go to the human queue.</p></div>
<div><svg class="mwf-icon" viewBox="0 0 80 80" aria-hidden="true"><use href="#mwf-i-record"/></svg><b>Record chain</b><small>One entry per step. References and versions, no personal data.</small><p><span class="mwf-mono">If it fails</span>A step that cannot write its entry does not complete.</p></div>
<div><svg class="mwf-icon" viewBox="0 0 80 80" aria-hidden="true"><use href="#mwf-i-intake"/></svg><b>Payload store</b><small>Kept apart from the chain, encrypted under the client's keys.</small><p><span class="mwf-mono">If it fails</span>The chain shows that a step ran, without what it saw.</p></div>
<div><svg class="mwf-icon" viewBox="0 0 80 80" aria-hidden="true"><use href="#mwf-i-meter"/></svg><b>Outcome join</b><small>Case ID from intake matched to the outcome in the system of record.</small><p><span class="mwf-mono">If it fails</span>Unjoined cases drop out of the meter. The join rate has a target set at day 30.</p></div>
</div>
<figcaption>Every step in the lane writes to the record chain and the payload store. Only the AI step uses the gateway. The join runs after write-back.</figcaption>
</figure>

### Why the parts sit inside the workflow

The first design considered was a separate evidence platform beside every AI system a firm runs. It was dropped. The deadline that would have forced a purchase moved: the European Commission's news page, read here in place of the legal text, puts the Annex III high-risk rules at December 2, 2027.<sup class="mwf-ref"><a href="https://digital-strategy.ec.europa.eu/en/news/ai-omnibus-enters-force" rel="noopener" title="Confirmed: European Commission: AI omnibus in force, high-risk rules from 2 December 2027 (news page, not legal text)">7</a></sup> No regulator-issued log format was found in the pages reached. California's two September bills give no format and no effective dates,<sup class="mwf-ref"><a href="https://www.gov.ca.gov/2026/09/09/governor-newsom-signs-first-in-the-nation-ai-safeguards-to-protect-californians-calls-on-the-federal-government-to-do-its-part/" rel="noopener" title="Confirmed: Governor of California: SB 813 and AB 1405 signed">8</a></sup> and the insurance supervisors' draft evaluation tool is a questionnaire that defines no record format.<sup class="mwf-ref"><a href="https://content.naic.org/sites/default/files/call_materials/Attachment-B.pdf" rel="noopener" title="Confirmed: NAIC AI Systems Evaluation Tool, draft pilot with Exhibits A to D">9</a></sup> IBM, Credo AI and Deloitte have each announced pieces of such a platform.<sup class="mwf-ref"><a href="https://www.ibm.com/new/announcements/from-governance-policies-to-governance-proof-with-enforcement-tracking-for-watsonx-orchestrate" rel="noopener" title="Vendor claim: IBM: enforcement tracking for watsonx Orchestrate and watsonx.governance">10</a></sup><sup class="mwf-ref"><a href="https://www.credo.ai/blog/credo-ai-brings-aiuc-1-the-worlds-first-ai-agent-standard-into-the-ai-governance-operating-layer" rel="noopener" title="Vendor claim: Credo AI: AIUC-1 agent standard in its governance platform">11</a></sup><sup class="mwf-ref"><a href="https://www.deloitte.com/us/en/about/press-room/deloitte-expands-end-to-end-ai-controls-and-assurance-capabilities.html" rel="noopener" title="Vendor claim: Deloitte: expanded AI controls and assurance services">12</a></sup>

A separate platform would also compete with features bundled into products firms already own, and with an audit firm's brand.

The reason that matters most is structural. A platform beside the workflow records what the model did. It does not know what happened to the case afterwards, so it cannot say whether the decision was good or what it saved. The record and the result have to be joined, and the place where they can be joined is inside the workflow.

Each of the three parts has a working model below. The sections that follow give the reasoning for each.

<div class="mwf-tabs">
<div class="mwf-tablist" role="tablist" aria-label="The three built-in parts">
<button type="button" class="mwf-tab" role="tab" id="mwf-tab-record" aria-controls="mwf-panel-record" aria-selected="true"><svg class="mwf-icon" viewBox="0 0 80 80" aria-hidden="true"><use href="#mwf-i-record"/></svg><b>Decision record</b></button>
<button type="button" class="mwf-tab" role="tab" id="mwf-tab-meter" aria-controls="mwf-panel-meter" aria-selected="false"><svg class="mwf-icon" viewBox="0 0 80 80" aria-hidden="true"><use href="#mwf-i-meter"/></svg><b>Outcome meter</b></button>
<button type="button" class="mwf-tab" role="tab" id="mwf-tab-exit" aria-controls="mwf-panel-exit" aria-selected="false"><svg class="mwf-icon" viewBox="0 0 80 80" aria-hidden="true"><use href="#mwf-i-exit"/></svg><b>Exit</b></button>
</div>
<div class="mwf-panel" role="tabpanel" id="mwf-panel-record" aria-labelledby="mwf-tab-record" tabindex="0">
<figure class="mwf-fig" data-fig="One entry, four readers">
<p class="mwf-h">Nine fields, and who would ask for them</p>
<p class="mwf-sub">Pick a reader to see the fields that match what its text asks for. The mapping is my reading. <span class="ld-stamp ld-stamp--proposed">Proposed</span></p>
<div class="mwf-rec">
<div class="mwf-card"><p class="mwf-mono">Decision record &middot; entry 482</p>
<ol class="mwf-fields">
<li data-f="1"><i>1</i><b>Case ID</b><code>C-000482</code></li>
<li data-f="2"><i>2</i><b>Input reference</b><code>ref: intake/C-000482/v1</code></li>
<li data-f="3"><i>3</i><b>Model and version</b><code>model-a, dated ID</code></li>
<li data-f="4"><i>4</i><b>Prompt and policy version</b><code>prompt v14, policy v6</code></li>
<li data-f="5"><i>5</i><b>Tool calls and results</b><code>2 calls, results hashed</code></li>
<li data-f="6"><i>6</i><b>Output and route</b><code>draft approve, routed to review</code></li>
<li data-f="7"><i>7</i><b>Reviewer action</b><code>approved, reason code 3</code></li>
<li data-f="8"><i>8</i><b>Explanation sent</b><code>notice template N-2, day 0</code></li>
<li data-f="9"><i>9</i><b>Retention class</b><code>3 years</code></li>
</ol></div>
<div class="mwf-readers" role="group" aria-label="Readers of the record">
<button type="button" class="mwf-btn mwf-reader" data-f="6,7,8,9" aria-pressed="false"><b>A state consumer law</b><small>Colorado SB26-189, developer requirements from 1 January 2027</small><span>Records kept for at least three years. A plain-language description of the system's role within 30 days of an adverse outcome. Correction and human review on request.</span></button>
<button type="button" class="mwf-btn mwf-reader" data-f="3,4,5" aria-pressed="false"><b>An insurance supervisor</b><small>NAIC model bulletin on AI, adopted December 2023</small><span>A regulator may request inventories of AI systems that can produce adverse consumer outcomes, third-party due diligence, and validation and testing documents.</span></button>
<button type="button" class="mwf-btn mwf-reader" data-f="3,4,7" aria-pressed="false"><b>A court in discovery</b><small>D. Minn. order of 9 March 2026 on the nH Predict tool</small><span>Ordered: documents on development, approval and use, and the AI review board's records. Refused: the tool's source code, data and rules.</span></button>
<button type="button" class="mwf-btn mwf-reader" data-f="1,2,9" aria-pressed="false"><b>A books-and-records rule</b><small>SEC Rule 17a-4 as amended in 2022, by analogy</small><span>An audit trail that lets the original record be recreated if it is modified or deleted. Written for broker-dealer records, not for AI decisions.</span></button>
</div>
</div>
<figcaption>The values in the entry are made up to show the shape of a record. The chained entry holds references and versions, and no personal data.</figcaption>
</figure>
</div>
<div class="mwf-panel" role="tabpanel" id="mwf-panel-meter" aria-labelledby="mwf-tab-meter" tabindex="0">
<figure class="mwf-fig" data-fig="Why a comparison group">
<p class="mwf-h">The same drop, counted two ways</p>
<p class="mwf-sub">An illustration with invented shapes and no scale. Switch the view. <span class="ld-stamp ld-stamp--proposed">Proposed</span></p>
<div class="mwf-actions" role="group" aria-label="Chart view" style="margin:0 0 10px"><button type="button" class="mwf-btn" data-mode-btn="before">Before and after</button><button type="button" class="mwf-btn" data-mode-btn="holdout">Against a holdout</button></div>
<div class="mwf-meter">
<div>
<svg class="mwf-chart" data-mode="holdout" viewBox="0 0 720 290" role="img" aria-label="Unit cost over twelve months for cases on the AI workflow and for a holdout group. Both fall after go-live. The AI group falls further.">
<path class="ax" d="M50 40V250H600"/>
<path class="go" d="M324 50V250"/>
<text x="56" y="34">Unit cost (illustrative)</text>
<text x="332" y="64">Go-live</text>
<text x="600" y="274" text-anchor="end">Months</text>
<path class="l-ho" pathLength="1" d="M60 82 L108 76.4 L156 87.6 L204 82 L252 82 L300 87.6 L348 115.6 L396 143.6 L444 160.4 L492 166 L540 160.4 L588 166"/>
<path class="l-ai" pathLength="1" d="M60 82 L108 76.4 L156 87.6 L204 82 L252 82 L300 87.6 L348 138 L396 171.6 L444 194 L492 199.6 L540 194 L588 199.6"/>
<text x="470" y="226" style="fill:var(--ld-stamp)">AI workflow</text>
<text class="only-ho br-t" x="470" y="140" style="fill:var(--ld-seal)">Holdout</text>
<path class="br only-be" d="M598 82h12V198h-12"/>
<text class="br-t only-be" x="618" y="136">Booked as</text><text class="br-t only-be" x="618" y="154">the saving</text>
<path class="br only-ho" d="M598 164h12V198h-12"/>
<text class="br-t only-ho" x="618" y="178">What can</text><text class="br-t only-ho" x="618" y="196">be claimed</text>
</svg>
<p class="mwf-status" data-mwf="mode-status" aria-live="polite">Against a holdout: the cases left on the old process fell too. Only the gap between the two lines counts as a saving.</p>
</div>
<div class="mwf-trial">
<p class="mwf-mono">One randomised trial &middot; 238 physicians</p>
<div class="mwf-bar" style="--v:9.5"><b>AI scribe one</b><small>Cut in time spent on notes, against control</small><div><i></i><span>9.5%</span></div></div>
<div class="mwf-bar mwf-bar--ns" style="--v:1.7"><b>AI scribe two</b><small>Not statistically significant</small><div><i></i><span>1.7%</span></div></div>
<p class="mwf-sub" style="margin:0">Scale 0 to 12%. A preprint from 2025. <span class="ld-stamp ld-stamp--confirmed">Confirmed</span></p>
</div>
</div>
<figcaption>The line chart is not data. The trial bars are percentage reductions in time on one clinical task and are not comparable with the survey shares in the chart above.</figcaption>
</figure>
<figure class="mwf-fig mwf-calc" data-fig="Size it with your own numbers">
<p class="mwf-h">What the holdout does to the business case</p>
<p class="mwf-sub">The starting values are examples and not data. Replace them with your own, in your own currency. <span class="ld-stamp ld-stamp--proposed">Proposed</span></p>
<div class="mwf-calc-in">
<label>Cases per month<input type="number" inputmode="decimal" min="0" value="10000" data-calc="n"></label>
<label>Cost per case today<input type="number" inputmode="decimal" min="0" value="12" data-calc="c"></label>
<label>Fall in cost per case, AI group (%)<input type="number" inputmode="decimal" min="0" value="20" data-calc="a"></label>
<label>Fall in the holdout, same period (%)<input type="number" inputmode="decimal" min="0" value="5" data-calc="h"></label>
<label>Added running cost per month<input type="number" inputmode="decimal" min="0" value="8000" data-calc="r"></label>
<label>One-off cost before go-live<input type="number" inputmode="decimal" min="0" value="60000" data-calc="u"></label>
</div>
<div class="mwf-calc-out">
<div><small>Saving per month, before and after</small><b data-calc-out="naive">24,000</b></div>
<div><small>Saving per month, against the holdout</small><b data-calc-out="gap">18,000</b></div>
<div><small>After the added running cost</small><b data-calc-out="net">10,000</b></div>
<div><small>Months to pay back the one-off cost</small><b data-calc-out="pay">6.0</b></div>
</div>
<p class="mwf-status" data-calc-out="note" aria-live="polite">Before and after would report 6,000 more per month than the holdout supports.</p>
<figcaption>Arithmetic on the six inputs and nothing else. It treats every case as going through the AI path and ignores the share kept in the holdout.</figcaption>
</figure>
</div>
<div class="mwf-panel" role="tabpanel" id="mwf-panel-exit" aria-labelledby="mwf-tab-exit" tabindex="0">
<figure class="mwf-fig" data-fig="Switch drill">
<p class="mwf-h">A 61-day notice, and the drill for it</p>
<p class="mwf-sub">Run the drill to see the sequence the design asks for before go-live. <span class="ld-stamp ld-stamp--proposed">Proposed</span></p>
<div class="mwf-notice"><div class="mwf-notice-bar"><i></i><span>61 days of notice</span></div><div class="mwf-notice-ends"><span>30 Sep 2026 &middot; notice</span><span>30 Nov 2026 &middot; retired</span></div></div>
<div class="mwf-exit">
<div class="mwf-rig">
<div class="mwf-unit" data-state="fixed"><svg class="mwf-icon" viewBox="0 0 80 80" aria-hidden="true"><use href="#mwf-i-gateway"/></svg><div><b>Gateway</b><small>Owned by the client</small></div></div>
<div class="mwf-unit" data-model="a" data-state="in-use"><svg class="mwf-icon" viewBox="0 0 80 80" aria-hidden="true"><use href="#mwf-i-ai"/></svg><div><b>Model A</b><small>In use</small></div></div>
<div class="mwf-unit" data-model="b" data-state="qualified"><svg class="mwf-icon" viewBox="0 0 80 80" aria-hidden="true"><use href="#mwf-i-ai"/></svg><div><b>Model B</b><small>Qualified</small></div></div>
</div>
<div>
<p class="mwf-mono" style="margin-bottom:8px">Regression set &middot; 40 reviewed cases</p>
<div class="mwf-grid" aria-hidden="true"></div>
<div class="mwf-actions"><button type="button" class="mwf-btn mwf-btn--stamp" data-mwf="drill">Run the switch drill</button></div>
<p class="mwf-status" data-mwf="drill-status" aria-live="polite">Model A is in use. Model B has passed qualification and waits.</p>
</div>
</div>
<figcaption>The notice dates are from the supplier's deprecations page. The size of the regression set and its result are invented for the illustration.</figcaption>
</figure>
</div>
</div>

<p class="mwf-take"><span>What this means</span>The unit of delivery is one workflow with a person on exceptions. The record, the meter and the exit ship with it and are meant to be reused by the next workflow.</p>

## The decision record

The record is one entry for each step an AI or a reviewer takes on a case, written by the workflow step itself. A gateway in front of the model can add detail about the model call, but the step is the source of truth, because the step knows the case. Each entry has nine fields: the case ID, a reference to the input, the model and its version, the prompt and policy version, tool calls and their results, the output and the route taken, the reviewer's action, the explanation sent to the person, and a retention class.

The fields come from what named texts ask for. Colorado's SB26-189 was signed on May 14, 2026. The bill page says developer duties start on January 1, 2027, that compliance records are kept for at least three years, and that a person who receives an adverse outcome gets a plain-language description of the system's role within 30 days, with a route to correction and human review.<sup class="mwf-ref"><a href="https://leg.colorado.gov/bills/sb26-189" rel="noopener" title="Confirmed: Colorado SB26-189 bill page: three-year records, 30-day description, human review (summary page)">13</a></sup> I read the legislature's summary page and not the statute text, and the page does not give a start date for the duties of firms that deploy a system as opposed to those that develop one.

The insurance supervisors' model bulletin, adopted in December 2023, advises a written AI program and says a regulator may request inventories of AI systems that can produce adverse consumer outcomes, due-diligence material on third parties, and validation and testing documents. It is a model text that each state chooses to issue.<sup class="mwf-ref"><a href="https://content.naic.org/sites/default/files/cmte-h-big-data-artificial-intelligence-wg-ai-model-bulletin.pdf.pdf" rel="noopener" title="Confirmed: NAIC model bulletin on the use of AI systems by insurers">14</a></sup> The supervisors' adoption map dated August 31, 2026 labels 23 states and the District of Columbia as adopted, among 25 states it lists.<sup class="mwf-ref"><a href="https://content.naic.org/sites/default/files/legal-adoption-map-ai-model-bulletin.pdf" rel="noopener" title="Confirmed: NAIC adoption map: 23 states and DC labelled adopted, 25 listed">15</a></sup>

Courts are a third reader. On March 9, 2026 a federal magistrate judge in Minnesota ordered UnitedHealth to produce, within 21 days, documents on the development, approval and use of its nH Predict tool, along with records of its AI review board. The same order refused the plaintiffs the tool's source code, data and rules.<sup class="mwf-ref"><a href="https://benefitslink.com/src/ctop/lokken-v-uhc-dminn-discovery-order-03092026.pdf" rel="noopener" title="Confirmed: Lokken v. UnitedHealth, D. Minn., discovery order (Doc. 162)">16</a></sup> It is a discovery ruling and decides nothing about the merits. What it shows is which material one court reached for, namely approval and oversight documents, and a record of versions and reviewer actions is the closest match to that. The same record is also discoverable. Keeping more detail means more can be ordered produced, and that is a cost of this design that counsel should weigh.

<figure class="mwf-fig" data-fig="Dates this page relies on">
<p class="mwf-h">What has happened, and what is still ahead</p>
<p class="mwf-sub">Thirteen dates from the article, in order. Amber entries are in the future as of the run date. <span class="ld-stamp ld-stamp--confirmed">Confirmed</span></p>
<ol class="mwf-time">
<li><time>Oct 2022</time><span>SEC amends Rule 17a-4, adding an audit-trail alternative</span></li>
<li><time>Dec 2023</time><span>Insurance supervisors adopt the model bulletin on AI</span></li>
<li><time>Sep 2024</time><span>California SB 1120 becomes law</span></li>
<li><time>9 Mar 2026</time><span>Minnesota discovery order on nH Predict</span></li>
<li><time>14 May 2026</time><span>Colorado SB26-189 signed</span></li>
<li><time>7 Jul 2026</time><span>EDPB blockchain guidelines, version 2.0</span></li>
<li><time>27 Jul 2026</time><span>EU AI omnibus enters into force</span></li>
<li><time>9 Sep 2026</time><span>California signs SB 813 and AB 1405</span></li>
<li><time>30 Sep 2026</time><span>One model supplier gives retirement notice</span></li>
<li class="now"><time>3 Oct 2026</time><span>This page</span></li>
<li class="ahead"><time>30 Nov 2026</time><span>That model retires, 61 days after notice</span></li>
<li class="ahead"><time>1 Jan 2027</time><span>Colorado developer duties start</span></li>
<li class="ahead"><time>2 Dec 2027</time><span>EU Annex III high-risk rules apply</span></li>
</ol>
<figcaption>The spacing is not to scale. The furthest date, for the EU high-risk rules, is about 15 months after this page.</figcaption>
</figure>

### Tamper evidence without a blockchain

The record has to be hard to alter after the fact, and the party that built the workflow has an interest in what it says. The proposal is a hash chain over the entries, with payloads in object storage under a retention lock and the chain's anchor held by the client.

Securities rules offer a precedent. The SEC's 2022 amendments to Rule 17a-4 added an audit-trail alternative to write-once storage: the system must allow the original record to be recreated if it is modified or deleted.<sup class="mwf-ref"><a href="https://www.sec.gov/files/rules/final/2022/34-96034.pdf" rel="noopener" title="Confirmed: SEC Release 34-96034, amendments to Rule 17a-4">17</a></sup> That rule covers broker-dealer records, not AI decisions, and I use it only as a description of what "tamper evident" has meant to one regulator. On September 8, AWS announced variable retention for S3 Object Lock and said Cohasset Associates had assessed it for that rule. I did not open the assessment.<sup class="mwf-ref"><a href="https://aws.amazon.com/about-aws/whats-new/2026/09/amazon-s3-object-lock-variable-retention/" rel="noopener" title="Vendor claim: AWS: S3 Object Lock variable retention, Cohasset assessment stated">18</a></sup>

### The personal data problem

An immutable record and a right to erasure pull against each other. The tempting fix is to encrypt personal data in the chain and delete the key when someone asks to be forgotten.

Version 2.0 of the European Data Protection Board's guidelines on blockchains, adopted July 7, 2026, do not accept that as a clean answer. They say encrypted personal data is still personal data, and that deleting a key makes the data unintelligible at least until the algorithm is broken, decryption advances or the key leaks. They advise against putting personal data on a chain in clear, encrypted or hashed form, and say to keep it off-chain.<sup class="mwf-ref"><a href="https://www.edpb.europa.eu/system/files/2026-07/edpb_guidelines_202502_blockchain_v2_en.pdf" rel="noopener" title="Confirmed: EDPB Guidelines 02/2025 on blockchain, version 2.0, paragraphs 51 and 104">19</a></sup> The guidelines address blockchains. Applying them to a private hash chain is my reading, and counsel should confirm it.

So the design keeps personal data out of the chained entries. The chain holds references and versions. Payloads sit apart, encrypted under the client's keys, captured by an allowlist of fields, and locked only where a named retention duty applies. An erasure and legal-hold drill belongs before go-live.

<p class="mwf-take"><span>What this means</span>Design the record around what named readers have asked for, keep personal data out of the chained entries, and ask counsel about discovery exposure before deciding how much detail to keep.</p>

## The outcome meter

A measured return needs a unit, a baseline and a comparison group, agreed before the build. The unit is the thing the workflow counts. The baseline is cost, cycle time and reversal rate for that unit over the months before. The comparison is a holdout group or a stepped rollout, so that a seasonal dip or a staffing change is not booked as an AI saving. The client's finance function computes the result from its own data.

The reason for the comparison group is visible in the one kind of study that uses one. A randomised trial of 238 physicians, published as a preprint in 2025, tested two AI scribes against a control. One cut time spent on notes by 9.5%. The other cut it by 1.7%, which was not statistically significant.<sup class="mwf-ref"><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC12265753/" rel="noopener" title="Confirmed: Randomised trial of two AI scribes, 238 physicians (preprint)">20</a></sup> Only the first result was statistically significant, and the trial did not compare the two products head to head. The effect is modest next to the survey numbers above, and it is a time saving on one clinical task. It says nothing about cost, or about claims and lending operations.

The meter also has to watch the human checkpoint, because review is where the design places its trust. A 2025 experiment with 2,784 crowdworkers checking data an AI had extracted from company reports found that people who viewed AI favourably over-relied on it and people who were sceptical caught more errors. Asking reviewers to supply the correct value led to fewer corrections, although overall accuracy was slightly higher at 68% against 66%. Paying bonuses made no meaningful difference.<sup class="mwf-ref"><a href="https://arxiv.org/html/2509.08514v1" rel="noopener" title="Confirmed: Experiment with 2,784 crowdworkers reviewing AI-extracted data (preprint)">21</a></sup> The study is a preprint and its subjects were crowdworkers, so it may not transfer to trained claims handlers. I take from it only that reviewer accuracy should be measured, and the proposal seeds known errors into the review queue and reports the catch rate.

What to measure at each layer, and how a model metric does or does not reach a business number, is covered in [The Metric Chain for AI Products](/deep-dives/from-models-to-margins-metric-chain). The meter here is the top of that chain, wired to one workflow.

<p class="mwf-take"><span>What this means</span>Agree the unit, the baseline and the comparison group before the build, and have the client's finance function compute the result.</p>

## The exit

The third part is the ability to change the model without rebuilding the workflow. Two things in the window make it a requirement.

Models retire on a schedule the buyer does not set. Anthropic's deprecations page lists dated model IDs with retirement dates and commits to at least 60 days' notice for publicly released models. It gave notice on September 30, 2026 that one model retires on November 30, which is 61 days by my count. An earlier model was retired on August 5 after notice on June 5.<sup class="mwf-ref"><a href="https://platform.claude.com/docs/en/about-claude/model-deprecations" rel="noopener" title="Confirmed: Anthropic model deprecations page: 60-day policy, 30 September notice">23</a></sup> I use this supplier as the example because its page is specific. Two months is short when a model change means re-validating a workflow whose outputs feed a regulated decision.

The second is concentration, and at least one firm with its own data is keeping its options open. Thomson Reuters launched Thomson on August 24, which it describes as its first proprietary large language model, built on an open-source foundation with a $40 million investment in talent and compute. It said its legal product stays multi-model, using its own model where that is better and others elsewhere.<sup class="mwf-ref"><a href="https://www.thomsonreuters.com/en/press-releases/2026/august/thomson-reuters-leverages-its-world-class-data-assets-to-launch-its-own-frontier-model" rel="noopener" title="Vendor claim: Thomson Reuters: own legal model, about $40 million, product stays multi-model">24</a></sup> A paper from the Bank for International Settlements' Financial Stability Institute, published September 9 and read here in its web summary, says reliance on common cloud, software and frontier AI providers creates concentration and sovereign access risks for the financial sector.<sup class="mwf-ref"><a href="https://www.bis.org/publications/fsi-paper-28-when-machines-attack-frontier-ai-cyber-threats-and-policy-responses-financial-sector" rel="noopener" title="Confirmed: BIS Financial Stability Institute, Occasional Paper 28 (web summary read)">25</a></sup>

The AI step calls models through a gateway the client owns. Two models are qualified for the workflow and one is in use. A regression set built from real, reviewed cases is rerun on any change, and a timed switch drill is done once before go-live. Because the decision record stores the model version on every entry, a change of model shows up in the outcome meter as a before and after.

I did not find published evidence on how long a supplier switch takes in practice. The drill is there to produce that number for one workflow. Running an open-weight model on infrastructure the firm controls is another way out of the retirement schedule, with its own costs, and this page does not compare the two.

<p class="mwf-take"><span>What this means</span>Qualify a second model and time one switch before go-live. This supplier's page commits to at least 60 days of notice for publicly released models.</p>

## What it costs

None of this is free, and I have no measured figure for any of it. The method adds work that a plain build does not have: a second model qualified and kept current, a gateway to run, a regression set assembled from reviewed cases, reviewers' time spent on seeded errors, the chain and retention engineering, and weeks of shadow running before anything goes live. A holdout also means some cases keep the old process for longer, which delays the benefit and in some regulated settings needs its own sign-off. My expectation is that these costs fall on the second and third workflow, and I have no evidence for that yet.

<figure class="mwf-fig" data-fig="Added work, and when it falls">
<p class="mwf-h">Seven costs a plain build does not have</p>
<p class="mwf-sub">A dot marks when each item is paid. The timing is my inference. <span class="ld-stamp ld-stamp--proposed">Proposed</span></p>
<table class="mwf-cost">
<thead><tr><th scope="col"><span class="mwf-mono">Added work</span></th><th scope="col">Once, before go-live</th><th scope="col">At each model change</th><th scope="col">While running</th></tr></thead>
<tbody>
<tr><th scope="row">Second model<small>qualified and kept current</small></th><td><i></i><span>yes</span></td><td><i></i><span>yes</span></td><td></td></tr>
<tr><th scope="row">Gateway<small>to build and run</small></th><td><i></i><span>yes</span></td><td></td><td><i></i><span>yes</span></td></tr>
<tr><th scope="row">Regression set<small>assembled from reviewed cases</small></th><td><i></i><span>yes</span></td><td><i></i><span>yes</span></td><td></td></tr>
<tr><th scope="row">Seeded errors<small>reviewer time spent on them</small></th><td><i></i><span>yes</span></td><td></td><td><i></i><span>yes</span></td></tr>
<tr><th scope="row">Chain and retention<small>engineering</small></th><td><i></i><span>yes</span></td><td></td><td></td></tr>
<tr><th scope="row">Shadow running<small>weeks beside the current process</small></th><td><i></i><span>yes</span></td><td></td><td></td></tr>
<tr><th scope="row">Holdout<small>cases kept on the old process</small></th><td></td><td></td><td><i></i><span>yes</span></td></tr>
</tbody>
</table>
<figcaption>No sizes are shown, because none were measured.</figcaption>
</figure>

<p class="mwf-take"><span>What this means</span>Budget a second model, a gateway, reviewer time and shadow running before go-live. I found no measured figure for any of them.</p>

## Which workflow first

The method only works on a workflow that can be measured. The scorecard below has eight conditions. Three are gates.

<div class="visual-frame" data-fig="Workflow scorecard" style="--vf-h:620px; --vf-h-m:980px">
  <iframe
    src="/visuals/measured-workflow-factory/workflow-scorecard.html?embed=1"
    title="Workflow scorecard. An eight-item checklist for choosing a workflow, with three gate items and a verdict of qualifies, fix first or stop."
    loading="lazy"
    sandbox="allow-scripts allow-same-origin"
  ></iframe>
</div>

The thresholds in the scorecard, such as six months of baseline and an outcome within 30 days, are judgment.

The third gate says adverse outcomes are decided by a person. The automated path may approve or route, and it does not deny. A workflow passes the gate when it is built that way. Workflows whose value depends on automating the denial itself, as in some health-plan claim and prior-authorisation processes, lose that value under the gate and are poor first candidates. One example of the rule already in law, for one domain: California's SB 1120, in law since September 2024, covers health plans and insurers that use AI in utilisation review. It says a denial, delay or change of care on medical-necessity grounds must be made by a licensed physician or licensed health care professional and not by the tool.<sup class="mwf-ref"><a href="https://leginfo.legislature.ca.gov/faces/billTextClient.xhtml?bill_id=202320240SB1120" rel="noopener" title="Confirmed: California SB 1120, Health and Safety Code 1367.01(k)">22</a></sup>

Each part needs a named owner before the build. The split below is my proposal, and nothing in the sources assigns these roles.

<div class="table-wrap">
<table class="mwf-roles">
<thead><tr><th>Part</th><th>Owned by</th><th>Signed off at</th></tr></thead>
<tbody>
<tr><td data-label="Part">Decision record</td><td data-label="Owned by">Engineering lead</td><td data-label="Signed off at">Day 90, when the risk lead reviews one export</td></tr>
<tr><td data-label="Part">Outcome meter</td><td data-label="Owned by">Finance</td><td data-label="Signed off at">Day 30 for the metric definitions, day 90 for the first comparison</td></tr>
<tr><td data-label="Part">Exit</td><td data-label="Owned by">Engineering lead with the AI lead</td><td data-label="Signed off at">Before go-live for the first timed switch, and again at day 90</td></tr>
<tr><td data-label="Part">Human checkpoint</td><td data-label="Owned by">Operations lead</td><td data-label="Signed off at">Day 60, with the reviewer catch rate</td></tr>
<tr><td data-label="Part">Stop conditions</td><td data-label="Owned by">The sponsor who chose the workflow</td><td data-label="Signed off at">Each of the three checkpoints</td></tr>
</tbody>
</table>
</div>

A first workflow should also carry stop conditions that are written down before it starts. These three are my proposal, and the day counts are judgment:

<figure class="mwf-fig" data-fig="Three checkpoints, three stops">
<p class="mwf-h">What must be true by day 30, 60 and 90</p>
<p class="mwf-sub">Trip a stop condition to see what it halts. <span class="ld-stamp ld-stamp--proposed">Proposed</span></p>
<div class="mwf-rail90" aria-hidden="true"><i></i><span style="left:0">30</span><span style="left:50%">60</span><span style="left:100%">90</span></div>
<div class="mwf-gates">
<div class="mwf-gate"><b>By day 30</b><ul><li>Data access granted in writing</li><li>Metric definitions signed by finance</li><li>Baseline computed by the client</li><li>Targets set for record coverage and outcome join rate</li><li>Regression set assembled from reviewed cases</li></ul><p class="mwf-stop"><span class="mwf-mono">Stop if</span>Data access is not granted.</p><button type="button" class="mwf-btn" aria-pressed="false">Trip this stop</button></div>
<div class="mwf-gate"><b>By day 60</b><ul><li>Shadow run beside the current process complete</li><li>Record coverage and outcome join rate measured</li><li>Reviewer catch rate on seeded errors measured</li><li>Erasure drill done</li></ul><p class="mwf-stop"><span class="mwf-mono">Stop if</span>Coverage or join rate miss the targets set at day 30.</p><button type="button" class="mwf-btn" aria-pressed="false">Trip this stop</button></div>
<div class="mwf-gate"><b>By day 90</b><ul><li>Live on a stepped share of cases since day 60</li><li>First comparison of unit cost and cycle time against the holdout, with an uncertainty range</li><li>One timed model switch</li><li>One record export reviewed by the client's risk lead</li></ul><p class="mwf-stop"><span class="mwf-mono">Stop if</span>The export is rejected, or the comparison shows the workflow is worse.</p><button type="button" class="mwf-btn" aria-pressed="false">Trip this stop</button></div>
</div>
<p class="mwf-status" data-mwf="gate-status" aria-live="polite">No stop condition has tripped. All three checkpoints are attempted.</p>
</figure>

Thirty days of live running may be too few cases to tell a real difference from noise. If the range at day 90 includes zero, the report should say so and extend the comparison. Ninety days will also not show reversal or appeal rates for slow outcomes, and that number should be left blank.

<p class="mwf-take"><span>What this means</span>Choose a first workflow that passes all three gates, and write the stop conditions down before it starts.</p>

## Objections

These are the strongest arguments I can make against the proposal, with where each one stands.

<div class="mwf-obj">
<p class="mwf-mono">Objection 1</p>
<p class="mwf-q">The gap may be a publishing gap.</p>
<p>Firms may have audited savings and not publish them. The 97% and 13% at the top of the page come from 30 logistics companies.</p>
<p>This stands. The page cannot tell an absence of savings from an absence of publication. A firm that wants a number it can defend still has to compute it for its own workflow.</p>
</div>

<div class="mwf-obj">
<p class="mwf-mono">Objection 2</p>
<p class="mwf-q">The factory is a platform under another name.</p>
<p>Reusing the record writer, the outcome join and the switch drill across workflows is shared infrastructure.</p>
<p>Partly right. The shared parts are a platform in the engineering sense. What the page argues for is where the record is written: by the workflow step, which knows the case and can be joined to its outcome. How record formats stay consistent across many workflows is unanswered here.</p>
</div>

<div class="mwf-obj">
<p class="mwf-mono">Objection 3</p>
<p class="mwf-q">A holdout may not be allowed.</p>
<p>Giving some customers the old process on purpose needs its own sign-off in some regulated settings, and the objection is that it may not be given.</p>
<p>The cost section says a holdout needs its own sign-off in some regulated settings, and the meter offers a stepped rollout as the alternative. A stepped rollout also treats cases differently for a time. Where neither is allowed, I would fall back to before and after, and label the result as that.</p>
</div>

<div class="mwf-obj">
<p class="mwf-mono">Objection 4</p>
<p class="mwf-q">A person on every adverse outcome removes much of the value, and review is unreliable.</p>
<p>The page's own cited experiment found crowdworkers who viewed AI favourably over-relied on it.</p>
<p>The gate does cost value, and workflows that depend on automating denials are named as poor first candidates. On reliability, the design measures the reviewer catch rate with seeded errors. The page offers a way to measure review quality and no way to improve it.</p>
</div>

<div class="mwf-obj">
<p class="mwf-mono">Objection 5</p>
<p class="mwf-q">Two models double the validation work, and the lock-in is elsewhere.</p>
<p>Prompts and regression sets tuned to one model may not carry over unchanged, and a gateway does not fix that.</p>
<p>This stands. The cost table lists the second model before go-live and at each model change. The switch drill is there to show how long a switch takes and whether the workflow still passes. The page has no figure for either.</p>
</div>

<p class="mwf-take"><span>What this means</span>Three points stay unanswered on this page: whether savings exist unpublished, how record formats stay consistent across workflows, and how to improve human review.</p>

## What to do next

1. Score the candidate workflows and pick one that passes all three gates.
2. Before the build, agree the unit, the baseline and the comparison group with finance, and write down the stop conditions.
3. Name the second model and put the switch drill in the plan before go-live.

The smallest first step is the day-30 list on its own: data access granted in writing, metric definitions signed by finance, a baseline computed by the client, targets set for record coverage and outcome join rate, and a regression set assembled from reviewed cases. None of it needs a model in production.

This page should be read again in January 2027. Colorado's developer duties start on January 1, and the model retirement set for November 30 will have happened.

<script src="/scripts/mwf-story.js" defer></script>
