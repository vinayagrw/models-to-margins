---
title: "Stop Calling Everything a Knowledge Graph: Which Layer Answers Which Question in 2026"
summary: "Knowledge graph now names five different things. Shape, meaning and facts are separate layers, and each part of a question has one store built for it. Route each part, check access in the store, cite and stamp every answer. Shown, then replayed on one question. Research, not advice."
pubDate: 2026-10-23
geography: Global, with European Union rules where they bind
horizon: 0 to 2 years
template: ledger
bpEyebrow: Interactive
bpTitle: Which layer answers which question?
bpSubtitle: For teams giving agents company knowledge. Pick a seat, then run one question three ways.
bpCoords:
  - Interactive
tags:
  - knowledge graphs
  - RAG
  - ontology
  - AI
audience: Data, AI and strategy leaders deciding where agent knowledge should live
readTime: 7 min, interactive
listed: true
featured: false
---
<div class="klg">
<script>(function(){var r=document.currentScript.parentNode,m=/reader=([a-z]+)/.exec(location.hash),ok=function(x){return x==="buyer"||x==="builder"||x==="strategy"},v=m&&ok(m[1])?m[1]:null;if(!v){try{v=localStorage.getItem("klg-reader")}catch(e){}}r.classList.add("klg-js");if(ok(v))r.setAttribute("data-reader",v)})();</script>
<link rel="stylesheet" href="/styles/dcr.css?v=f1bf0529">
<link rel="stylesheet" href="/styles/klg.css?v=5050bba7">
<svg class="klg-defs" aria-hidden="true" focusable="false" width="0" height="0"><defs>
<symbol id="klg-tile" viewBox="0 0 88 88"><path d="M44 10 78 28 44 46 10 28z" fill="#B3ADF2"/><path d="M10 28 44 46v32L10 60z" fill="#8F86E8"/><path d="M78 28 44 46v32l34-18z" fill="#5F55C9"/></symbol>
<symbol id="klg-g-buyer" viewBox="0 0 88 88"><use href="#klg-tile"/><path d="M33 25h22M33 30h16" fill="none" stroke="#2E2873" stroke-width="3" stroke-linecap="round"/></symbol>
<symbol id="klg-g-builder" viewBox="0 0 88 88"><use href="#klg-tile"/><g fill="none" stroke="#2E2873" stroke-width="3" stroke-linecap="round"><circle cx="44" cy="28" r="6"/><path d="M44 17v4M44 35v4M32 28h4M52 28h4"/></g></symbol>
<symbol id="klg-g-strategy" viewBox="0 0 88 88"><use href="#klg-tile"/><path d="M30 34l9-6 6 3 13-9" fill="none" stroke="#2E2873" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></symbol>
<symbol id="klg-g-poison" viewBox="0 0 88 88"><use href="#klg-tile"/><path d="M44 16c5 7 8 11 8 14a8 8 0 0 1-16 0c0-3 3-7 8-14z" fill="#2E2873"/></symbol>
<symbol id="klg-g-shape" viewBox="0 0 88 88"><use href="#klg-tile"/><path d="M33 22h22v12H33z M33 28h22M44 22v12" fill="none" stroke="#2E2873" stroke-width="2.6" stroke-linejoin="round"/></symbol>
<symbol id="klg-g-meaning" viewBox="0 0 88 88"><use href="#klg-tile"/><path d="M33 20h12l11 9-9 8-14-11z" fill="none" stroke="#2E2873" stroke-width="2.6" stroke-linejoin="round"/><circle cx="39" cy="24" r="2.2" fill="#2E2873"/></symbol>
<symbol id="klg-g-facts" viewBox="0 0 88 88"><use href="#klg-tile"/><g fill="none" stroke="#2E2873" stroke-width="2.6" stroke-linecap="round"><path d="M34 32l10-12 10 12M34 32h20"/></g><g fill="#2E2873"><circle cx="34" cy="32" r="3.4"/><circle cx="44" cy="20" r="3.4"/><circle cx="54" cy="32" r="3.4"/></g></symbol>
<symbol id="klg-g-rag" viewBox="0 0 88 88"><use href="#klg-tile"/><g fill="none" stroke="#2E2873" stroke-width="3" stroke-linecap="round"><circle cx="42" cy="26" r="7"/><path d="M47 31l7 6"/></g></symbol>
<symbol id="klg-g-okf" viewBox="0 0 88 88"><use href="#klg-tile"/><path d="M32 22h9l3 3h12v11H32z M36 30h14" fill="none" stroke="#2E2873" stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round"/></symbol>
<symbol id="klg-g-code" viewBox="0 0 88 88"><use href="#klg-tile"/><path d="M38 21l-7 7 7 7M50 21l7 7-7 7M46 19l-4 18" fill="none" stroke="#2E2873" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/></symbol>
<symbol id="klg-g-num" viewBox="0 0 88 88"><use href="#klg-tile"/><path d="M34 36V28M41 36V22M48 36V25M55 36V19" fill="none" stroke="#2E2873" stroke-width="3.4" stroke-linecap="round"/></symbol>
<symbol id="klg-g-cluster" viewBox="0 0 88 88"><use href="#klg-tile"/><g fill="#2E2873"><circle cx="36" cy="24" r="3.4"/><circle cx="44" cy="31" r="3.4"/><circle cx="52" cy="22" r="3.4"/><circle cx="40" cy="35" r="2.4"/><circle cx="54" cy="31" r="2.4"/></g><ellipse cx="44" cy="28" rx="14" ry="10" fill="none" stroke="#2E2873" stroke-width="2.2" stroke-dasharray="3 3"/></symbol>
<symbol id="klg-g-lock" viewBox="0 0 88 88"><use href="#klg-tile"/><path d="M36 26h16v11H36z M39 26v-4a5 5 0 0 1 10 0v4" fill="none" stroke="#2E2873" stroke-width="2.8" stroke-linejoin="round"/></symbol>
<symbol id="klg-g-clock" viewBox="0 0 88 88"><use href="#klg-tile"/><g fill="none" stroke="#2E2873" stroke-width="3" stroke-linecap="round"><circle cx="44" cy="28" r="9"/><path d="M44 22v6l4 3"/></g></symbol>
<symbol id="klg-g-coin" viewBox="0 0 88 88"><use href="#klg-tile"/><g fill="none" stroke="#2E2873" stroke-width="3" stroke-linecap="round"><ellipse cx="44" cy="28" rx="11" ry="7"/><path d="M44 24v8"/></g></symbol>
<symbol id="klg-g-check" viewBox="0 0 88 88"><use href="#klg-tile"/><path d="M35 28l6 5 12-10" fill="none" stroke="#2E2873" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></symbol>
<symbol id="klg-g-route" viewBox="0 0 88 88"><use href="#klg-tile"/><g fill="none" stroke="#2E2873" stroke-width="3" stroke-linecap="round"><circle cx="32" cy="30" r="3"/><circle cx="56" cy="24" r="3"/><path d="M35 30c8 0 6-6 18-6"/></g></symbol>
<symbol id="klg-g-doc" viewBox="0 0 88 88"><use href="#klg-tile"/><path d="M36 19h12l5 5v12H36z M40 28h9M40 32h6" fill="none" stroke="#2E2873" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></symbol>
<symbol id="klg-g-stop" viewBox="0 0 88 88"><use href="#klg-tile"/><g fill="none" stroke="#2E2873" stroke-width="3" stroke-linecap="round"><circle cx="44" cy="28" r="9"/><path d="M38 33l12-10"/></g></symbol>
<symbol id="klg-g-ask" viewBox="0 0 88 88"><use href="#klg-tile"/><path d="M33 20h22v12H42l-6 5v-5h-3z" fill="none" stroke="#2E2873" stroke-width="2.6" stroke-linejoin="round"/></symbol>
<symbol id="klg-g-catalog" viewBox="0 0 88 88"><use href="#klg-tile"/><g fill="none" stroke="#2E2873" stroke-width="2.8" stroke-linecap="round"><path d="M34 20h20M34 27h20M34 34h20"/></g><g fill="#2E2873"><circle cx="30" cy="20" r="2"/><circle cx="30" cy="27" r="2"/><circle cx="30" cy="34" r="2"/></g></symbol>
</defs></svg>
<nav class="klg-rail" aria-label="Screens"><a href="#klg-hook" aria-label="The hook"></a><a href="#klg-layers" aria-label="Three layers"></a><a href="#klg-sort" aria-label="Which store"></a><a href="#klg-replay" aria-label="Answer replay"></a><a href="#klg-cost" aria-label="Cost and freshness"></a><a href="#klg-choose" aria-label="Chooser"></a><a href="#klg-rules" aria-label="Rules"></a></nav>
<section class="klg-scene klg-gate" id="klg-gate" aria-label="Choose your seat">
<p class="klg-kicker"><b>0</b>Start here</p>
<h2 class="klg-q">Where do you sit?</h2>
<p class="klg-a">Seven screens. Your seat sets the stakes and the first move.</p>
<div class="klg-readers" role="group" aria-label="Choose your seat">
<button type="button" class="klg-reader" data-reader-btn="buyer" aria-pressed="false"><svg class="klg-ico klg-i88" width="88" height="88" aria-hidden="true" focusable="false"><use href="#klg-g-buyer"/></svg><b>Business buyer</b><span>You fund the knowledge work and own the risk.</span></button>
<button type="button" class="klg-reader" data-reader-btn="builder" aria-pressed="false"><svg class="klg-ico klg-i88" width="88" height="88" aria-hidden="true" focusable="false"><use href="#klg-g-builder"/></svg><b>Data builder</b><span>You pick the store for each question.</span></button>
<button type="button" class="klg-reader" data-reader-btn="strategy" aria-pressed="false"><svg class="klg-ico klg-i88" width="88" height="88" aria-hidden="true" focusable="false"><use href="#klg-g-strategy"/></svg><b>Strategy reader</b><span>You track where cost and control move.</span></button>
</div>
<noscript><p class="klg-a">The controls need JavaScript. Every seat is shown below.</p></noscript>
</section>
<section class="klg-scene" id="klg-hook" aria-label="The hook">
<p class="klg-kicker"><b>1</b>The hook</p>
<h2 class="klg-q">Ask the wrong layer and you get a cited, wrong answer.</h2>
<div class="klg-con">
<div class="klg-con-h"><h3>Four questions, four owners</h3><span class="klg-tag" data-k="illus">Illustrative</span></div>
<figure class="klg-con-b" role="img" aria-label="Four questions each routed to the store that owns it: revenue to the semantic layer, shared parents to the graph, the churn definition to the OKF pack, the refund policy to document search. A fifth row sends the refund policy to the graph and is marked wrong.">
<ul class="klg-routes" aria-hidden="true"><li class="klg-rt"><span class="klg-rt-q">Q3 revenue by region</span><span class="klg-rt-a" aria-hidden="true">→</span><span class="klg-rt-s"><svg class="klg-ico klg-i44" width="44" height="44" aria-hidden="true" focusable="false"><use href="#klg-g-num"/></svg>Semantic layer</span></li><li class="klg-rt"><span class="klg-rt-q">Suppliers that share a parent</span><span class="klg-rt-a" aria-hidden="true">→</span><span class="klg-rt-s"><svg class="klg-ico klg-i44" width="44" height="44" aria-hidden="true" focusable="false"><use href="#klg-g-facts"/></svg>Graph</span></li><li class="klg-rt"><span class="klg-rt-q">Our churn definition</span><span class="klg-rt-a" aria-hidden="true">→</span><span class="klg-rt-s"><svg class="klg-ico klg-i44" width="44" height="44" aria-hidden="true" focusable="false"><use href="#klg-g-okf"/></svg>OKF pack</span></li><li class="klg-rt"><span class="klg-rt-q">Refund policy on gifts</span><span class="klg-rt-a" aria-hidden="true">→</span><span class="klg-rt-s"><svg class="klg-ico klg-i44" width="44" height="44" aria-hidden="true" focusable="false"><use href="#klg-g-rag"/></svg>Document search</span></li><li class="klg-rt" data-r="no"><span class="klg-rt-q">Refund policy on gifts</span><span class="klg-rt-a" aria-hidden="true">→</span><span class="klg-rt-s"><svg class="klg-ico klg-i44" width="44" height="44" aria-hidden="true" focusable="false"><use href="#klg-g-facts"/></svg>Graph</span><span class="klg-rt-x">Wrong</span></li></ul>
</figure>
<p class="klg-capline">Most wrong answers start with a wrong route.</p>
<p class="klg-capline klg-seat" data-for="buyer">You own who answers each question.</p><p class="klg-capline klg-seat" data-for="builder">Send each part to its own store.</p><p class="klg-capline klg-seat" data-for="strategy">Control moves to whoever owns the question.</p>
</div>
<ol class="klg-story" aria-label="The story"><li><a href="#klg-layers"><svg class="klg-ico klg-i32" width="32" height="32" aria-hidden="true" focusable="false"><use href="#klg-g-shape"/></svg><span>Three layers</span></a></li><li><a href="#klg-sort"><svg class="klg-ico klg-i32" width="32" height="32" aria-hidden="true" focusable="false"><use href="#klg-g-route"/></svg><span>Route each part</span></a></li><li><a href="#klg-replay"><svg class="klg-ico klg-i32" width="32" height="32" aria-hidden="true" focusable="false"><use href="#klg-g-ask"/></svg><span>Run one question</span></a></li><li><a href="#klg-rules"><svg class="klg-ico klg-i32" width="32" height="32" aria-hidden="true" focusable="false"><use href="#klg-g-check"/></svg><span>Five rules</span></a></li></ol>
</section>
<section class="klg-scene" id="klg-layers" aria-label="Three layers">
<p class="klg-kicker"><b>2</b>Three layers</p>
<h2 class="klg-q">One question needs all three layers.</h2>
<div class="dcr klg-lq" data-mode="clean" data-layer="shape">
<div class="dcr-cmd dcr-panel">
<div class="dcr-bar">
<svg class="dcr-hero" width="88" height="88" aria-hidden="true" focusable="false"><use href="#klg-g-ask"/></svg>
<div class="dcr-kv klg-lq-q"><span class="dcr-k">Question</span><b>How many EU enterprise customers churned in Q3?</b></div>
<div class="dcr-kv"><span class="dcr-k">Answer</span><b class="dcr-status"><span class="dcr-led" aria-hidden="true"></span><span class="klg-lq-ans" data-o="lq-ans">4.1%</span></b><span class="dcr-sr" role="status" aria-live="polite" data-o="lq-sr"></span></div>
</div>
<div class="dcr-picks klg-lq-picks">
<div class="dcr-pick" role="group" aria-label="Layer"><span class="dcr-k"><b class="dcr-num">1</b>Tap a layer</span><div class="dcr-seg klg-lq-stack">
<button type="button" class="dcr-opt klg-lyr" data-lq="shape" aria-pressed="true"><svg class="klg-ico klg-i64" width="64" height="64" aria-hidden="true" focusable="false"><use href="#klg-g-shape"/></svg><b>Data model</b><i class="klg-pip" aria-hidden="true"></i></button>
<button type="button" class="dcr-opt klg-lyr" data-lq="meaning" aria-pressed="false"><svg class="klg-ico klg-i64" width="64" height="64" aria-hidden="true" focusable="false"><use href="#klg-g-meaning"/></svg><b>Ontology</b><i class="klg-pip" aria-hidden="true"></i></button>
<button type="button" class="dcr-opt klg-lyr" data-lq="facts" aria-pressed="false"><svg class="klg-ico klg-i64" width="64" height="64" aria-hidden="true" focusable="false"><use href="#klg-g-facts"/></svg><b>Graph</b><i class="klg-pip" aria-hidden="true"></i></button>
</div></div>
<div class="dcr-pick" role="group" aria-label="Mode"><span class="dcr-k"><b class="dcr-num">2</b>Mode</span><div class="dcr-seg"><button type="button" class="dcr-opt" data-lqm="clean" aria-pressed="true">Each layer</button><button type="button" class="dcr-opt" data-lqm="mix" aria-pressed="false">Mix them up</button></div></div>
</div>
</div>
<div class="dcr-panel klg-lq-out" aria-live="polite">
<div class="dcr-phead"><h2 data-o="lq-h">What each layer adds</h2><span class="dcr-tag">Illustrative</span></div>
<div class="klg-lq-body">
<div class="klg-lq-pane" data-p="shape-clean"><span class="dcr-k">Data model (CDM)</span><div class="klg-tbl" aria-label="Table shape"><span>customer_id</span><span>region</span><span>tier</span><span>parent_id</span><span>arr_q3_start</span><span>arr_q3_lost</span></div><p class="klg-say"><b>Churn</b> is lost ARR over start ARR. One shape, one measure.</p></div>
<div class="klg-lq-pane" data-p="meaning-clean" hidden><span class="dcr-k">Ontology</span><ul class="klg-chips"><li><b>Enterprise</b> 1,000 seats or more</li><li><b>EU</b> billed in a member state</li></ul><p class="klg-say">The words mean one thing for every agent.</p></div>
<div class="klg-lq-pane" data-p="facts-clean" hidden><span class="dcr-k">Knowledge graph</span><div class="klg-tree" aria-label="Accounts linked to parents"><span class="klg-node is-p">Acme Group</span><span class="klg-node">Acme GmbH</span><span class="klg-node">Acme SAS</span><span class="klg-node">Acme BV</span></div><p class="klg-say">Three accounts, one parent. Count the customer once.</p></div>
<div class="klg-lq-pane is-bad" data-p="shape-mix" hidden><span class="dcr-k">Measure kept in a prompt</span><div class="klg-two-n"><b><span data-n="churnTrue">4.1</span>%</b><span>vs</span><b><span data-n="churnPrompt">6.3</span>%</b></div><p class="klg-say">Two agents, two prompts, two churn numbers.</p></div>
<div class="klg-lq-pane is-bad" data-p="meaning-mix" hidden><span class="dcr-k">Schema field used as meaning</span><ul class="klg-chips"><li><b>tier = gold</b> read as enterprise</li></ul><p class="klg-say">Mid-market accounts slip into the count.</p></div>
<div class="klg-lq-pane is-bad" data-p="facts-mix" hidden><span class="dcr-k">Graph skipped</span><div class="klg-tree is-flat"><span class="klg-node">Acme GmbH</span><span class="klg-node">Acme SAS</span><span class="klg-node">Acme BV</span></div><p class="klg-say">One lost parent counts as three customers.</p></div>
</div>
</div>
<div class="dcr-panel klg-sv">
<div class="dcr-phead"><h2>Stores that serve the layers</h2></div>
<div class="klg-sv-row" role="group" aria-label="Stores">
<button type="button" class="klg-svb" data-sv="rag" aria-pressed="false"><svg class="klg-ico klg-i64" width="64" height="64" aria-hidden="true" focusable="false"><use href="#klg-g-rag"/></svg><b>Vector RAG</b></button>
<button type="button" class="klg-svb" data-sv="okf" aria-pressed="false"><svg class="klg-ico klg-i64" width="64" height="64" aria-hidden="true" focusable="false"><use href="#klg-g-okf"/></svg><b>OKF pack</b></button>
<button type="button" class="klg-svb" data-sv="code" aria-pressed="false"><svg class="klg-ico klg-i64" width="64" height="64" aria-hidden="true" focusable="false"><use href="#klg-g-code"/></svg><b>Code graph</b></button>
<button type="button" class="klg-svb" data-sv="cat" aria-pressed="false"><svg class="klg-ico klg-i64" width="64" height="64" aria-hidden="true" focusable="false"><use href="#klg-g-catalog"/></svg><b>Catalog</b></button>
</div>
<p class="klg-say klg-sv-d" data-o="sv">Tap a store to see which layer it feeds.</p>
</div>
</div>
<p class="klg-capline klg-out">A schema is not an ontology. A graph without one drifts.</p>
</section>
<section class="klg-scene" id="klg-sort" aria-label="Which store">
<p class="klg-kicker"><b>3</b>Which store</p>
<h2 class="klg-q">Which store answers this question?</h2>
<div class="klg-con klg-sorter" data-sorter>
<div class="klg-con-h"><h3>Sort ten questions</h3><span class="klg-k klg-mono" data-o="score">0 of 10</span></div>
<div class="klg-con-b">
<div class="klg-card"><span class="klg-k">Question <span data-o="qi">1</span></span><p class="klg-qtext" data-o="qtext">What was Q3 revenue in the EU?</p></div>
<div class="klg-stores" role="group" aria-label="Pick a store">
<button type="button" class="klg-store" data-s="sem"><svg class="klg-ico klg-i44" width="44" height="44" aria-hidden="true" focusable="false"><use href="#klg-g-num"/></svg><b>Semantic layer</b></button>
<button type="button" class="klg-store" data-s="graph"><svg class="klg-ico klg-i44" width="44" height="44" aria-hidden="true" focusable="false"><use href="#klg-g-facts"/></svg><b>Graph</b></button>
<button type="button" class="klg-store" data-s="okf"><svg class="klg-ico klg-i44" width="44" height="44" aria-hidden="true" focusable="false"><use href="#klg-g-okf"/></svg><b>OKF pack</b></button>
<button type="button" class="klg-store" data-s="rag"><svg class="klg-ico klg-i44" width="44" height="44" aria-hidden="true" focusable="false"><use href="#klg-g-rag"/></svg><b>Vector RAG</b></button>
<button type="button" class="klg-store" data-s="code"><svg class="klg-ico klg-i44" width="44" height="44" aria-hidden="true" focusable="false"><use href="#klg-g-code"/></svg><b>Code graph</b></button>
<button type="button" class="klg-store" data-s="grag"><svg class="klg-ico klg-i44" width="44" height="44" aria-hidden="true" focusable="false"><use href="#klg-g-cluster"/></svg><b>GraphRAG</b></button>
</div>
<div class="klg-fb" aria-live="polite"><p class="klg-say" data-o="fb">Pick the store built for it.</p><button type="button" class="klg-btn" data-do="next">Next question</button></div>
</div>
</div>
<div class="klg-con klg-duel">
<div class="klg-con-h"><h3>No family wins everywhere, one study</h3><span class="klg-tag" data-k="ver">Verified 2026</span></div>
<figure class="klg-con-b klg-duel-b" role="img" aria-label="In one controlled study, RAG scores 64.8 F1 against 63.0 for GraphRAG local search on single hop questions. Graph retrieval scores 70.3 against 67.0 for RAG on multi-hop questions.">
<div class="klg-pair"><span class="klg-k">One fact, F1 score</span><div class="klg-hb" style="--v:64.8"><em>RAG</em><i></i><b class="klg-mono" data-n="singleRag">64.8</b></div><div class="klg-hb" data-k="alt" style="--v:63"><em>GraphRAG local</em><i></i><b class="klg-mono" data-n="singleGraph">63.0</b></div></div>
<div class="klg-pair"><span class="klg-k">Chain of facts, same study</span><div class="klg-hb" data-k="alt" style="--v:70.3"><em>Graph retrieval</em><i></i><b class="klg-mono" data-n="multiGraph">70.3</b></div><div class="klg-hb" style="--v:67"><em>RAG</em><i></i><b class="klg-mono" data-n="multiRag">67.0</b></div></div>
</figure>
</div>
</section>
<section class="klg-scene" id="klg-replay" aria-label="Answer replay">
<p class="klg-kicker"><b>4</b>Proof</p>
<h2 class="klg-q">Run one question three ways.</h2>
<div class="dcr klg-rp" data-fault="none" data-chk="store">
<div class="dcr-cmd dcr-panel">
<div class="dcr-bar">
<svg class="dcr-hero" width="88" height="88" aria-hidden="true" focusable="false"><use href="#klg-g-ask"/></svg>
<div class="dcr-kv"><span class="dcr-k">Question</span><b class="dcr-mono">Q3 churn, EU enterprise</b></div>
<div class="dcr-kv"><span class="dcr-k">Asked by</span><b class="dcr-mono">EU analyst</b></div>
<div class="dcr-kv"><span class="dcr-k">Run state</span><b class="dcr-status"><span class="dcr-led" aria-hidden="true"></span><span class="klg-stat-t">Ready</span></b><span class="dcr-sr klg-sayr" role="status" aria-live="polite"></span></div>
</div>
<div class="dcr-picks">
<div class="dcr-pick" role="group" aria-label="Fault to add"><span class="dcr-k"><b class="dcr-num">1</b>Fault to add</span><div class="dcr-seg"><button type="button" class="dcr-opt" data-set="fault" data-v="none" aria-pressed="true">No fault</button><button type="button" class="dcr-opt" data-set="fault" data-v="poison" aria-pressed="false">Poisoned doc</button><button type="button" class="dcr-opt" data-set="fault" data-v="stale" aria-pressed="false">Stale graph</button><button type="button" class="dcr-opt" data-set="fault" data-v="leak" aria-pressed="false">Permission leak</button></div></div>
<div class="dcr-pick" role="group" aria-label="Where checks run"><span class="dcr-k"><b class="dcr-num">2</b>Checks run</span><div class="dcr-seg"><button type="button" class="dcr-opt" data-set="chk" data-v="store" aria-pressed="true">In the store</button><button type="button" class="dcr-opt" data-set="chk" data-v="prompt" aria-pressed="false">In the prompt</button></div></div>
<div class="dcr-pick" role="group" aria-label="Run"><span class="dcr-k"><b class="dcr-num">3</b>Run</span><div class="dcr-acts"><button type="button" class="dcr-run" data-do="run">Run question</button><button type="button" class="dcr-reset" data-do="reset">Reset</button></div></div>
</div>
<p class="dcr-line"><span class="dcr-k">Case</span> <span data-f="none">Every store is current and filtered.</span><span data-f="poison">Someone indexed a slide that says churn was 0.4%.</span><span data-f="stale">The graph was built in June. Accounts moved since.</span><span data-f="leak">The text index was built with a service account. A US board deck ranks.</span></p>
</div>
<div class="dcr-panel klg-lanes">
<div class="dcr-phead"><h2>Three stores, four checks</h2><span class="dcr-tag">Illustrative</span></div>
<div class="klg-lane-grid" role="group" aria-label="Lanes">
<div class="klg-lane" data-lane="rag"><div class="klg-lh"><svg width="44" height="44" aria-hidden="true" focusable="false"><use href="#klg-g-rag"/></svg><b>Vector RAG</b></div><ol class="klg-steps"></ol><p class="klg-res" data-o="res-rag">Not run</p></div>
<div class="klg-lane" data-lane="okf"><div class="klg-lh"><svg width="44" height="44" aria-hidden="true" focusable="false"><use href="#klg-g-okf"/></svg><b>OKF pack</b></div><ol class="klg-steps"></ol><p class="klg-res" data-o="res-okf">Not run</p></div>
<div class="klg-lane" data-lane="graph"><div class="klg-lh"><svg width="44" height="44" aria-hidden="true" focusable="false"><use href="#klg-g-facts"/></svg><b>Graph</b></div><ol class="klg-steps"></ol><p class="klg-res" data-o="res-graph">Not run</p></div>
</div>
<div class="dcr-tiles" role="group" aria-label="Evidence packet">
<div class="dcr-tile dcr-out"><svg width="44" height="44" aria-hidden="true" focusable="false"><use href="#klg-g-ask"/></svg><span class="dcr-k">Answer</span><b data-t="out">Not run</b><span class="dcr-vs" data-t="outvs">Run to see</span></div>
<div class="dcr-tile klg-cite"><svg width="44" height="44" aria-hidden="true" focusable="false"><use href="#klg-g-doc"/></svg><span class="dcr-k">Cited</span><b class="dcr-mono" data-t="cite">0 of 3</b><span class="dcr-vs" data-t="citevs">Named, not proof</span></div>
<div class="dcr-tile"><svg width="44" height="44" aria-hidden="true" focusable="false"><use href="#klg-g-lock"/></svg><span class="dcr-k">Leaks</span><b class="dcr-mono" data-t="leak">0</b><span class="dcr-vs" data-t="leakvs">Target zero</span></div>
<div class="dcr-tile"><svg width="44" height="44" aria-hidden="true" focusable="false"><use href="#klg-g-clock"/></svg><span class="dcr-k">As of</span><b class="dcr-mono" data-t="asof">None</b><span class="dcr-vs">Freshness stamp</span></div>
</div>
<p class="klg-lesson" data-t="lesson" aria-live="polite">The four tiles are the evidence packet. Add a fault and run.</p>
<ul class="dcr-legend klg-legend" aria-label="Badge meanings"><li><span class="dcr-b" data-r="route">Pass</span> check holds</li><li><span class="dcr-b" data-r="esc">Flag</span> answer stamped</li><li><span class="dcr-b" data-r="stop">Block</span> store refuses</li><li><span class="dcr-b" data-r="unflag">Leak</span> wrong or unsafe</li></ul>
<div class="klg-facts">
<p><span class="dcr-tag klg-ver">Verified 2026</span> Five planted texts steer about <b data-n="poisonRate">90</b>% of targeted answers.</p>
<p><span class="dcr-tag">Illustrative</span> One study: layered defence cut injection from <b data-n="injBefore">40.6</b>% to <b data-n="injAfter">0.2</b>%.</p>
<p><span class="dcr-tag">Illustrative</span> Summary leaks across groups have no public rate.</p>
</div>
</div>
</div>
</section>
<section class="klg-scene" id="klg-cost" aria-label="Cost and freshness">
<p class="klg-kicker"><b>5</b>Cost and freshness</p>
<h2 class="klg-q">What you pay for, and when.</h2>
<div class="dcr klg-cs">
<div class="dcr-panel klg-bt">
<div class="dcr-phead"><h2>Index build time, one study</h2><span class="dcr-tag klg-ver">Verified 2026</span></div>
<figure class="klg-bt-b" role="img" aria-label="Graph index build took 5,560 seconds against 135 seconds for a vector index.">
<div class="klg-btr" data-k="bad"><svg class="klg-ico klg-i64" width="64" height="64" aria-hidden="true" focusable="false"><use href="#klg-g-cluster"/></svg><b>Graph</b><span class="klg-btbar"><i style="--w:100%"></i></span><em class="klg-mono"><span data-n="buildGraph">5,560</span> s</em></div>
<div class="klg-btr"><svg class="klg-ico klg-i64" width="64" height="64" aria-hidden="true" focusable="false"><use href="#klg-g-rag"/></svg><b>Vector</b><span class="klg-btbar"><i data-o="bt-rag"></i></span><em class="klg-mono"><span data-n="buildRag">135</span> s</em></div>
</figure>
</div>
<div class="dcr-panel klg-ph">
<div class="dcr-phead"><h2>Where cost lands</h2><span class="dcr-tag">Illustrative</span></div>
<div class="klg-ph-g" role="table" aria-label="Cost by phase, low to high">
<div class="klg-ph-r klg-ph-h" role="row"><span role="columnheader"></span><span role="columnheader" class="dcr-k">Build</span><span role="columnheader" class="dcr-k">Each question</span><span role="columnheader" class="dcr-k">Keeping fresh</span></div>
</div>
<p class="klg-note">Graph summary query cost varies too much to show. People time to curate is real but not shown. Log it in your pilot.</p>
</div>
<div class="dcr-panel klg-est">
<div class="dcr-phead"><h2>Dollar estimate, not a quote</h2><span class="dcr-tag">Illustrative</span></div>
<div class="klg-sliders">
<label class="klg-slide"><span class="klg-k">Corpus, million tokens</span><input type="range" min="20" max="2000" step="20" value="200" data-in="corpus"><b class="klg-mono" data-o="corpus">200M</b></label>
<label class="klg-slide"><span class="klg-k">Questions a month</span><input type="range" min="10" max="1000" step="10" value="100" data-in="qpm"><b class="klg-mono" data-o="qpm">100k</b></label>
</div>
<div class="dcr-tiles klg-est-t">
<div class="dcr-tile"><span class="dcr-k">Vector index</span><b class="dcr-mono" data-o="ix-rag">$4</b><span class="dcr-vs">One off</span></div>
<div class="dcr-tile"><span class="dcr-k">Graph build</span><b class="dcr-mono" data-o="ix-grag">$1,200</b><span class="dcr-vs">One off</span></div>
<div class="dcr-tile"><span class="dcr-k">RAG questions</span><b class="dcr-mono" data-o="q-rag">$1,200</b><span class="dcr-vs">A month</span></div>
</div>
<div class="klg-be" aria-live="polite"><svg class="klg-ico klg-i64" width="64" height="64" aria-hidden="true" focusable="false"><use href="#klg-g-coin"/></svg><div><span class="klg-k">Break even</span><p class="klg-be-n"><b data-o="be-q">133k</b> questions, about <b data-o="be-m">1.3</b> months</p></div></div>
<details class="klg-dr"><summary>How break even is worked out</summary><p>Graph build cost divided by the saving per question. A compiled answer reads <span data-n="tokCompiled">1,000</span> tokens instead of re-fetching <span data-n="tokPerQ">4,000</span>, at $<span data-n="llmPerM">3</span> per million. Curation hours are left out.</p></details>
</div>
</div>
</section>
<section class="klg-scene" id="klg-choose" aria-label="Chooser">
<p class="klg-kicker"><b>6</b>Chooser</p>
<h2 class="klg-q">Which stores does your question mix need?</h2>
<div class="klg-con">
<div class="klg-con-h"><h3>Five questions, one store set</h3><span class="klg-tag" data-k="illus">Illustrative</span></div>
<div class="klg-con-b klg-ch">
<div class="klg-qs" role="group" aria-label="Your question mix">
<div class="klg-fs"><span class="klg-lg"><b class="klg-n">1</b>Do agents ask for numbers?</span><div class="klg-seg"><button type="button" class="klg-opt" data-q="num" data-a="yes" aria-pressed="true">Yes</button><button type="button" class="klg-opt" data-q="num" data-a="no" aria-pressed="false">No</button></div></div>
<div class="klg-fs"><span class="klg-lg"><b class="klg-n">2</b>Do they ask about code?</span><div class="klg-seg"><button type="button" class="klg-opt" data-q="code" data-a="yes" aria-pressed="false">Yes</button><button type="button" class="klg-opt" data-q="code" data-a="no" aria-pressed="true">No</button></div></div>
<div class="klg-fs"><span class="klg-lg"><b class="klg-n">3</b>Settled terms with an owner?</span><div class="klg-seg"><button type="button" class="klg-opt" data-q="def" data-a="yes" aria-pressed="true">Yes</button><button type="button" class="klg-opt" data-q="def" data-a="no" aria-pressed="false">No</button></div></div>
<div class="klg-fs"><span class="klg-lg"><b class="klg-n">4</b>Relations across entities?</span><div class="klg-seg"><button type="button" class="klg-opt" data-q="rel" data-a="yes" aria-pressed="false">Yes</button><button type="button" class="klg-opt" data-q="rel" data-a="no" aria-pressed="true">No</button></div></div>
<div class="klg-fs"><span class="klg-lg"><b class="klg-n">5</b>Themes across one access group?</span><div class="klg-seg"><button type="button" class="klg-opt" data-q="theme" data-a="yes" aria-pressed="false">Yes</button><button type="button" class="klg-opt" data-q="theme" data-a="no" aria-pressed="true">No</button></div></div>
</div>
<div class="klg-pick" aria-live="polite">
<span class="klg-k">Start with</span>
<ul class="klg-set" data-o="set"><li><svg class="klg-ico klg-i44" width="44" height="44" aria-hidden="true" focusable="false"><use href="#klg-g-num"/></svg><b>Semantic layer</b></li><li><svg class="klg-ico klg-i44" width="44" height="44" aria-hidden="true" focusable="false"><use href="#klg-g-okf"/></svg><b>OKF pack</b></li><li><svg class="klg-ico klg-i44" width="44" height="44" aria-hidden="true" focusable="false"><use href="#klg-g-rag"/></svg><b>Vector RAG</b></li></ul>
<p class="klg-say" data-o="setwhy">Add a store only when its test questions fail.</p>
</div>
</div>
</div>
</section>
<section class="klg-scene" id="klg-rules" aria-label="Rules">
<p class="klg-kicker"><b>7</b>Rules</p>
<h2 class="klg-q">Five rules for the knowledge layer.</h2>
<ol class="klg-rl">
<li><svg class="klg-ico klg-i44" width="44" height="44" aria-hidden="true" focusable="false"><use href="#klg-g-route"/></svg><b>Route each part</b><p>Split a question by type. Send each part to the store that owns it.</p></li>
<li><svg class="klg-ico klg-i44" width="44" height="44" aria-hidden="true" focusable="false"><use href="#klg-g-lock"/></svg><b>Check access in the store</b><p>Pass the user identity. Filter before ranking.</p></li>
<li><svg class="klg-ico klg-i44" width="44" height="44" aria-hidden="true" focusable="false"><use href="#klg-g-doc"/></svg><b>Ship an evidence packet</b><p>Sources, checks passed and time, with every answer.</p></li>
<li><svg class="klg-ico klg-i44" width="44" height="44" aria-hidden="true" focusable="false"><use href="#klg-g-clock"/></svg><b>Stamp freshness</b><p>Batch facts carry an as of date.</p></li>
<li><svg class="klg-ico klg-i44" width="44" height="44" aria-hidden="true" focusable="false"><use href="#klg-g-stop"/></svg><b>Abstain with a reason</b><p>No citation above threshold means no answer.</p></li>
</ol>
<div class="klg-tiers" role="group" aria-label="Agent rights, lowest first"><span class="klg-k">Agent rights, lowest first</span><ol><li data-k="good">Read</li><li>Recommend</li><li>Escalate</li><li data-k="bad">Execute</li></ol><span class="klg-tag" data-k="illus">Illustrative</span></div>
<p class="klg-capline klg-out">Start at read. Earn each step with a clean evidence packet.</p>
<div class="klg-grid klg-two">
<div class="klg-stat"><svg class="klg-ico klg-i44" width="44" height="44" aria-hidden="true" focusable="false"><use href="#klg-g-doc"/></svg><span class="klg-k">Long context is not a store</span><p class="klg-num"><span data-n="nolimaShort">99.3</span>% to <span data-n="nolimaLong">69.7</span>%</p><p class="klg-cap">GPT-4o recall, up to <span data-n="nolimaCtx">32K</span> tokens <span class="klg-tag" data-k="ver">Verified 2026</span></p></div>
<div class="klg-stat klg-move"><svg class="klg-ico klg-i44" width="44" height="44" aria-hidden="true" focusable="false"><use href="#klg-g-check"/></svg><span class="klg-k">Your first move <span class="klg-tag" data-k="illus">Illustrative</span></span><p class="klg-mv" data-for="buyer">Fund a <span data-n="pilotDays">60</span> day pilot on one domain.</p><p class="klg-mv" data-for="builder">Build a <span data-n="goldenSet">200</span> question test set, tagged by store.</p><p class="klg-mv" data-for="strategy">Count your question mix by type first.</p></div>
</div>
<p class="klg-capline klg-out klg-close">Each part of the question now reaches the store that owns it.</p>
</section>
<script src="/scripts/klg.js?v=b02efda1" defer></script>
</div>
