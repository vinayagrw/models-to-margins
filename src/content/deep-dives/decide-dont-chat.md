---
title: "Decide, Don't Chat: Where Each Agent Step Should Run in 2026"
summary: "Agents ace short tasks and fail long ones. Let code own money, small models decide, big models take only the hard cases, APIs beat screens, and a person signs anything you cannot undo. Shown, then replayed on one refund. Research, not advice."
pubDate: 2026-10-23
geography: Global, with European Union rules where they bind
horizon: 0 to 2 years
template: ledger
bpEyebrow: Interactive
bpTitle: Where should each agent step run?
bpSubtitle: For teams putting agents on real work. Pick a seat, then watch one refund run two ways.
bpCoords:
  - Interactive
tags:
  - agents
  - decision models
  - routing
  - AI
audience: Product, engineering and strategy leaders deciding which engine runs each step of an agent
readTime: 8 min, interactive
listed: true
featured: true
---
<div class="ddc">
<script>(function(){var r=document.currentScript.parentNode,m=/reader=([a-z]+)/.exec(location.hash),ok=function(x){return x==="buyer"||x==="builder"||x==="strategy"},v=m&&ok(m[1])?m[1]:null;if(!v){try{v=localStorage.getItem("ddc-reader")}catch(e){}}r.classList.add("ddc-js");if(ok(v))r.setAttribute("data-reader",v)})();</script>
<link rel="stylesheet" href="/styles/dcr.css?v=1faa572e">
<link rel="stylesheet" href="/styles/ddc.css?v=9776ac7c">
<svg class="ddc-defs" aria-hidden="true" focusable="false" width="0" height="0"><defs>
<symbol id="dcr-tile" viewBox="0 0 88 88"><path d="M44 10 78 28 44 46 10 28z" fill="#B3ADF2"/><path d="M10 28 44 46v32L10 60z" fill="#8F86E8"/><path d="M78 28 44 46v32l34-18z" fill="#5F55C9"/></symbol>
<symbol id="dcr-g-ticket" viewBox="0 0 88 88"><use href="#dcr-tile"/><path d="M30 24l14-7 14 7-14 7z M34 26l10-5M37 28l10-5" fill="none" stroke="#2E2873" stroke-width="2.4" stroke-linejoin="round"/></symbol>
<symbol id="dcr-g-class" viewBox="0 0 88 88"><use href="#dcr-tile"/><path d="M32 30a12 7 0 0 1 24 0" fill="none" stroke="#2E2873" stroke-width="3"/><path d="M44 30l7-6" stroke="#2E2873" stroke-width="3" stroke-linecap="round"/></symbol>
<symbol id="dcr-g-rules" viewBox="0 0 88 88"><use href="#dcr-tile"/><path d="M32 24h24M30 29h28M34 34h20" fill="none" stroke="#2E2873" stroke-width="2.6" stroke-linecap="round"/></symbol>
<symbol id="dcr-g-api" viewBox="0 0 88 88"><use href="#dcr-tile"/><path d="M38 22v6M50 22v6M34 28h20l-3 6H37z M44 34v4" fill="none" stroke="#2E2873" stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round"/></symbol>
<symbol id="dcr-g-small" viewBox="0 0 88 88"><use href="#dcr-tile"/><path d="M44 19l11 6-11 6-11-6z" fill="none" stroke="#2E2873" stroke-width="2.6" stroke-linejoin="round"/><circle cx="44" cy="25" r="2.4" fill="#2E2873"/></symbol>
<symbol id="dcr-g-front" viewBox="0 0 88 88"><use href="#dcr-tile"/><path d="M44 16l3 7 8 1-6 5 2 8-7-4-7 4 2-8-6-5 8-1z" fill="#2E2873"/></symbol>
<symbol id="dcr-g-screen" viewBox="0 0 88 88"><use href="#dcr-tile"/><path d="M32 20h24v13H32z M40 37h8" fill="none" stroke="#2E2873" stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round"/></symbol>
<symbol id="dcr-g-human" viewBox="0 0 88 88"><use href="#dcr-tile"/><circle cx="44" cy="21" r="4.5" fill="#2E2873"/><path d="M35 36a9 7 0 0 1 18 0" fill="#2E2873"/></symbol>
<symbol id="ddc-g-buyer" viewBox="0 0 88 88"><use href="#dcr-tile"/><path d="M33 25h22M33 30h16" fill="none" stroke="#2E2873" stroke-width="3" stroke-linecap="round"/></symbol>
<symbol id="ddc-g-builder" viewBox="0 0 88 88"><use href="#dcr-tile"/><g fill="none" stroke="#2E2873" stroke-width="3" stroke-linecap="round"><circle cx="44" cy="28" r="6"/><path d="M44 17v4M44 35v4M32 28h4M52 28h4"/></g></symbol>
<symbol id="ddc-g-strategy" viewBox="0 0 88 88"><use href="#dcr-tile"/><path d="M30 34l9-6 6 3 13-9" fill="none" stroke="#2E2873" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></symbol>
<symbol id="ddc-g-coin" viewBox="0 0 88 88"><use href="#dcr-tile"/><g fill="none" stroke="#2E2873" stroke-width="3" stroke-linecap="round"><ellipse cx="44" cy="28" rx="11" ry="7"/><path d="M44 24v8"/></g></symbol>
<symbol id="ddc-g-shield" viewBox="0 0 88 88"><use href="#dcr-tile"/><path d="M44 18l10 4v4c0 5-4 8-10 10-6-2-10-5-10-10v-4z" fill="none" stroke="#2E2873" stroke-width="3" stroke-linejoin="round"/></symbol>
<symbol id="ddc-g-cal" viewBox="0 0 88 88"><use href="#dcr-tile"/><path d="M32 22h24v14H32z M32 27h24M38 19v5M50 19v5" fill="none" stroke="#2E2873" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></symbol>
<symbol id="ddc-g-check" viewBox="0 0 88 88"><use href="#dcr-tile"/><path d="M35 28l6 5 12-10" fill="none" stroke="#2E2873" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></symbol>
<symbol id="ddc-g-stair" viewBox="0 0 88 88"><use href="#dcr-tile"/><path d="M30 34h7v-5h7v-5h7v-5h6" fill="none" stroke="#2E2873" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></symbol>
<symbol id="ddc-g-route" viewBox="0 0 88 88"><use href="#dcr-tile"/><g fill="none" stroke="#2E2873" stroke-width="3" stroke-linecap="round"><circle cx="32" cy="30" r="3"/><circle cx="56" cy="24" r="3"/><path d="M35 30c8 0 6-6 18-6"/></g></symbol>
<symbol id="ddc-g-doc" viewBox="0 0 88 88"><use href="#dcr-tile"/><path d="M36 19h12l5 5v12H36z M40 28h9M40 32h6" fill="none" stroke="#2E2873" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></symbol>
<symbol id="ddc-g-x" viewBox="0 0 88 88"><use href="#dcr-tile"/><path d="M33 22l22 12M55 22L33 34" fill="none" stroke="#2E2873" stroke-width="3" stroke-linecap="round"/></symbol>
<symbol id="ddc-g-dm" viewBox="0 0 88 88"><use href="#dcr-tile"/><path d="M44 36v-6M44 30l-9-8M44 30l9-8" fill="none" stroke="#2E2873" stroke-width="3" stroke-linecap="round"/></symbol>
</defs></svg>
<nav class="ddc-rail" aria-label="Screens"><a href="#ddc-hook" aria-label="The problem"></a><a href="#ddc-money" aria-label="Code owns money"></a><a href="#ddc-small" aria-label="Small models decide"></a><a href="#ddc-esc" aria-label="Escalate hard cases"></a><a href="#ddc-api" aria-label="APIs before screens"></a><a href="#ddc-undo" aria-label="Person on undo"></a><a href="#ddc-replay" aria-label="Run one refund"></a><a href="#ddc-hype" aria-label="Hype check"></a><a href="#ddc-chooser" aria-label="Rung chooser"></a><a href="#ddc-rules" aria-label="Rules"></a></nav>
<section class="ddc-scene ddc-gate" id="ddc-gate" aria-label="Choose your seat">
<p class="ddc-kicker"><b>0</b>Start here</p>
<h2 class="ddc-q">Where do you sit?</h2>
<p class="ddc-a">Ten screens, tuned to your seat.</p>
<div class="ddc-readers" role="group" aria-label="Choose your seat">
<button type="button" class="ddc-reader" data-reader-btn="buyer" aria-pressed="false"><svg class="ddc-ico ddc-i88" width="88" height="88" aria-hidden="true" focusable="false"><use href="#ddc-g-buyer"/></svg><b>Business buyer</b><span>You fund agent work and own the result.</span></button>
<button type="button" class="ddc-reader" data-reader-btn="builder" aria-pressed="false"><svg class="ddc-ico ddc-i88" width="88" height="88" aria-hidden="true" focusable="false"><use href="#ddc-g-builder"/></svg><b>Agent builder</b><span>You pick the engine for each step.</span></button>
<button type="button" class="ddc-reader" data-reader-btn="strategy" aria-pressed="false"><svg class="ddc-ico ddc-i88" width="88" height="88" aria-hidden="true" focusable="false"><use href="#ddc-g-strategy"/></svg><b>Strategy reader</b><span>You track where cost and control move.</span></button>
</div>
<noscript><p class="ddc-a">The controls need JavaScript. Every seat is shown below.</p></noscript>
</section>
<section class="ddc-scene" id="ddc-hook" aria-label="The problem">
<p class="ddc-kicker"><b>1</b>The problem</p>
<h2 class="ddc-q">Stop asking a chatbot to run your business.</h2>
<div class="ddc-con">
<div class="ddc-con-h"><h3>Task success, same model</h3><span class="ddc-tags"><span class="ddc-tag" data-k="ver">Verified 2026</span></span></div>
<figure class="ddc-con-b ddc-split" role="img" aria-label="Claude Opus 4.8 succeeds on 83.4% of short tasks and 20.6% of long workflows.">
<div class="ddc-sb" style="--v:83.4"><span class="ddc-k">Short tasks</span><div class="ddc-track"><i></i></div><b class="ddc-big" data-to="83.4">83.4%</b></div>
<div class="ddc-sb" data-k="bad" style="--v:20.6"><span class="ddc-k">Long workflows</span><div class="ddc-track"><i></i></div><b class="ddc-big" data-to="20.6">20.6%</b></div>
<figcaption class="ddc-capline">Claude Opus 4.8, OSWorld-Verified against OSWorld 2.0 long runs</figcaption>
</figure>
<ol class="ddc-story" aria-label="The five moves"><li><a href="#ddc-money"><b>1</b><svg class="ddc-ico ddc-i32" width="32" height="32" aria-hidden="true" focusable="false"><use href="#ddc-g-shield"/></svg><span>Code owns money</span></a></li><li><a href="#ddc-small"><b>2</b><svg class="ddc-ico ddc-i32" width="32" height="32" aria-hidden="true" focusable="false"><use href="#dcr-g-class"/></svg><span>Small models decide</span></a></li><li><a href="#ddc-esc"><b>3</b><svg class="ddc-ico ddc-i32" width="32" height="32" aria-hidden="true" focusable="false"><use href="#dcr-g-front"/></svg><span>Escalate hard cases</span></a></li><li><a href="#ddc-api"><b>4</b><svg class="ddc-ico ddc-i32" width="32" height="32" aria-hidden="true" focusable="false"><use href="#dcr-g-api"/></svg><span>APIs before screens</span></a></li><li><a href="#ddc-undo"><b>5</b><svg class="ddc-ico ddc-i32" width="32" height="32" aria-hidden="true" focusable="false"><use href="#dcr-g-human"/></svg><span>Person on undo</span></a></li></ol>
</div>
<div class="ddc-grid ddc-s1"><article class="ddc-tile" data-for="buyer" data-rise><svg class="ddc-ico ddc-i44" width="44" height="44" aria-hidden="true" focusable="false"><use href="#ddc-g-coin"/></svg><span class="ddc-k">Speed claim</span><p class="ddc-num">193.6x</p><p class="ddc-cap">vendor best case, LLM-scored</p><div class="ddc-tile-f"><span class="ddc-tag" data-k="vendor">Vendor</span><a class="ddc-pill" href="#ddc-hype">Hype check</a></div></article><article class="ddc-tile" data-for="buyer" data-rise><svg class="ddc-ico ddc-i44" width="44" height="44" aria-hidden="true" focusable="false"><use href="#ddc-g-cal"/></svg><span class="ddc-k">Pilot length</span><p class="ddc-num">30 days</p><p class="ddc-cap">shadow, suggest, then auto</p><div class="ddc-tile-f"><span class="ddc-tag" data-k="illus">Illustrative</span><a class="ddc-pill" href="#ddc-replay">Run refund</a></div></article><article class="ddc-tile" data-for="buyer" data-rise><svg class="ddc-ico ddc-i44" width="44" height="44" aria-hidden="true" focusable="false"><use href="#ddc-g-shield"/></svg><span class="ddc-k">Calibration reports</span><p class="ddc-num">0</p><p class="ddc-cap">published for Jev</p><div class="ddc-tile-f"><span class="ddc-tag" data-k="ver">Verified 2026</span><a class="ddc-pill" href="#ddc-undo">Person gate</a></div></article><article class="ddc-tile" data-for="builder" data-rise><svg class="ddc-ico ddc-i44" width="44" height="44" aria-hidden="true" focusable="false"><use href="#ddc-g-stair"/></svg><span class="ddc-k">Engine rungs</span><p class="ddc-num">5</p><p class="ddc-cap">cheapest first, climb on fail</p><div class="ddc-tile-f"><span class="ddc-tag" data-k="illus">Illustrative</span><a class="ddc-pill" href="#ddc-small">Rung chart</a></div></article><article class="ddc-tile" data-for="builder" data-rise><svg class="ddc-ico ddc-i44" width="44" height="44" aria-hidden="true" focusable="false"><use href="#ddc-g-route"/></svg><span class="ddc-k">Rescue events</span><p class="ddc-num">2</p><p class="ddc-cap">small wrong, big right</p><div class="ddc-tile-f"><span class="ddc-tag" data-k="illus">Illustrative</span><a class="ddc-pill" href="#ddc-esc">Escalation funnel</a></div></article><article class="ddc-tile" data-for="builder" data-rise><svg class="ddc-ico ddc-i44" width="44" height="44" aria-hidden="true" focusable="false"><use href="#ddc-g-check"/></svg><span class="ddc-k">Public rerun</span><p class="ddc-num">86.6%</p><p class="ddc-cap">Jev, against 73.8% local 7B</p><div class="ddc-tile-f"><span class="ddc-tag" data-k="ver">Verified 2026</span><a class="ddc-pill" href="#ddc-hype">Hype check</a></div></article><article class="ddc-tile" data-for="strategy" data-rise><svg class="ddc-ico ddc-i44" width="44" height="44" aria-hidden="true" focusable="false"><use href="#ddc-g-front"/></svg><span class="ddc-k">TypeSafe seed</span><p class="ddc-num">$40M</p><p class="ddc-cap">behind the Jev launch</p><div class="ddc-tile-f"><span class="ddc-tag" data-k="ver">Verified 2026</span><a class="ddc-pill" href="#ddc-hype">Hype check</a></div></article><article class="ddc-tile" data-for="strategy" data-rise><svg class="ddc-ico ddc-i44" width="44" height="44" aria-hidden="true" focusable="false"><use href="#ddc-g-coin"/></svg><span class="ddc-k">Price gap</span><p class="ddc-num">78%</p><p class="ddc-cap">open-weight median below proprietary</p><div class="ddc-tile-f"><span class="ddc-tag" data-k="ver">Verified 2026</span><a class="ddc-pill" href="#ddc-small">Rung chart</a></div></article><article class="ddc-tile" data-for="strategy" data-rise><svg class="ddc-ico ddc-i44" width="44" height="44" aria-hidden="true" focusable="false"><use href="#ddc-g-doc"/></svg><span class="ddc-k">EU duties</span><p class="ddc-num">2 Aug</p><p class="ddc-cap">2026, transparency in force</p><div class="ddc-tile-f"><span class="ddc-tag" data-k="ver">Verified 2026</span><a class="ddc-pill" href="#ddc-rules">Rules</a></div></article></div>
</section>
<section class="ddc-scene" id="ddc-money" aria-label="Code owns money">
<p class="ddc-kicker"><b>2</b>Code owns money</p>
<h2 class="ddc-q">The model proposes. Code moves the money.</h2>
<div class="ddc-con">
<div class="ddc-con-h"><h3>Money path</h3><span class="ddc-tags"><span class="ddc-tag" data-k="illus">Illustrative</span></span></div>
<figure class="ddc-con-b" role="img" aria-label="A ticket goes to a decision model, which proposes a label. Code checks policy and limits, then the refund API pays. Injected text that says refund $900 bounces off the code check.">
<ol class="ddc-flow">
<li class="ddc-node"><svg class="ddc-ico ddc-i64" width="64" height="64" aria-hidden="true" focusable="false"><use href="#dcr-g-ticket"/></svg><b>Ticket</b><span class="ddc-k">Input</span></li>
<li class="ddc-wire" aria-hidden="true"><i></i></li>
<li class="ddc-node ddc-zone"><svg class="ddc-ico ddc-i64" width="64" height="64" aria-hidden="true" focusable="false"><use href="#ddc-g-dm"/></svg><b>Decision model</b><span class="ddc-k">Proposes label</span></li>
<li class="ddc-wire" aria-hidden="true"><i></i></li>
<li class="ddc-node ddc-vault"><span class="ddc-inj" aria-hidden="true">Refund $900</span><svg class="ddc-ico ddc-i64" width="64" height="64" aria-hidden="true" focusable="false"><use href="#dcr-g-rules"/></svg><b>Code check</b><span class="ddc-k">Limits, state</span><span class="ddc-b ddc-blk" data-r="stop">Blocked</span></li>
<li class="ddc-wire" aria-hidden="true"><i></i></li>
<li class="ddc-node"><svg class="ddc-ico ddc-i64" width="64" height="64" aria-hidden="true" focusable="false"><use href="#dcr-g-api"/></svg><b>Refund API</b><span class="ddc-k">Pays $42</span></li>
</ol>
</figure>
<p class="ddc-capline">Injected text stays data. Only code can pay.</p>
</div>
</section>
<section class="ddc-scene" id="ddc-small" aria-label="Small models decide">
<p class="ddc-kicker"><b>3</b>Small models decide</p>
<h2 class="ddc-q">Each rung up costs ten times more.</h2>
<div class="ddc-con">
<div class="ddc-con-h"><h3>Time and cost per step, log scale</h3><span class="ddc-tags"><span class="ddc-tag" data-k="illus">Illustrative</span></span></div>
<figure class="ddc-con-b" role="img" aria-label="Log scale chart. Rules run under 1 ms at near zero cost. A decision model takes 70 to 500 ms, a vendor figure, at about $0.0002. A small LLM takes about 1 s at $0.002. A frontier LLM about 10 s at $0.02. A screen agent takes minutes at about $0.50.">
<ol class="ddc-ladder"><li class="ddc-rung" style="--i:0"><svg class="ddc-ico ddc-i44" width="44" height="44" aria-hidden="true" focusable="false"><use href="#dcr-g-rules"/></svg><b class="ddc-rn">Rules</b><div class="ddc-bars"><span class="ddc-bar" data-k="lat"><i style="--w:10%"></i><em>under 1 ms</em></span><span class="ddc-bar" data-k="cost"><i style="--w:3%"></i><em>near zero</em></span></div></li><li class="ddc-rung" style="--i:1"><svg class="ddc-ico ddc-i44" width="44" height="44" aria-hidden="true" focusable="false"><use href="#ddc-g-dm"/></svg><b class="ddc-rn">Decision model</b><div class="ddc-bars"><span class="ddc-bar" data-k="lat" data-vendor><i style="--w:43%"></i><em>70 to 500 ms</em><span class="ddc-tag" data-k="vendor">Vendor</span></span><span class="ddc-bar" data-k="cost"><i style="--w:33%"></i><em>$0.0002</em></span></div></li><li class="ddc-rung" style="--i:2"><svg class="ddc-ico ddc-i44" width="44" height="44" aria-hidden="true" focusable="false"><use href="#dcr-g-small"/></svg><b class="ddc-rn">Small LLM</b><div class="ddc-bars"><span class="ddc-bar" data-k="lat"><i style="--w:57%"></i><em>about 1 s</em></span><span class="ddc-bar" data-k="cost"><i style="--w:47%"></i><em>$0.002</em></span></div></li><li class="ddc-rung" style="--i:3"><svg class="ddc-ico ddc-i44" width="44" height="44" aria-hidden="true" focusable="false"><use href="#dcr-g-front"/></svg><b class="ddc-rn">Frontier LLM</b><div class="ddc-bars"><span class="ddc-bar" data-k="lat"><i style="--w:71%"></i><em>about 10 s</em></span><span class="ddc-bar" data-k="cost"><i style="--w:61%"></i><em>$0.02</em></span></div></li><li class="ddc-rung" style="--i:4"><svg class="ddc-ico ddc-i44" width="44" height="44" aria-hidden="true" focusable="false"><use href="#dcr-g-screen"/></svg><b class="ddc-rn">Screen agent</b><div class="ddc-bars"><span class="ddc-bar" data-k="lat"><i style="--w:87%"></i><em>minutes</em></span><span class="ddc-bar" data-k="cost"><i style="--w:81%"></i><em>$0.50</em></span></div></li></ol>
<p class="ddc-key"><span class="ddc-bar" data-k="lat"><i style="--w:100%"></i></span>Time <span class="ddc-bar" data-k="cost"><i style="--w:100%"></i></span>Cost per call <span class="ddc-hatch" aria-hidden="true"></span>Vendor figure</p>
</figure>
<p class="ddc-capline">Narrow questions belong on the low rungs.</p>
</div>
</section>
<section class="ddc-scene" id="ddc-esc" aria-label="Escalate hard cases">
<p class="ddc-kicker"><b>4</b>Escalate hard cases</p>
<h2 class="ddc-q">Only the hard tickets climb.</h2>
<div class="ddc-con">
<div class="ddc-con-h"><h3>100 tickets, where each one lands</h3><span class="ddc-tags"><span class="ddc-tag" data-k="illus">Illustrative</span></span></div>
<div class="ddc-con-b">
<label class="ddc-slide"><span class="ddc-k">Escalation rate</span><input type="range" min="0" max="40" step="1" value="10" data-esc aria-describedby="ddc-esc-sum"><b class="ddc-mono" data-o="rate">10%</b></label>
<div class="ddc-lanes" role="img" aria-label="Of 100 tickets, the decision model settles most, a few escalate to a frontier model and 2 over the limit go to a person." data-lanes>
<div class="ddc-lane" data-l="dm"><svg class="ddc-ico ddc-i44" width="44" height="44" aria-hidden="true" focusable="false"><use href="#ddc-g-dm"/></svg><span class="ddc-k">Decision model</span><b class="ddc-mono" data-o="n-dm">88</b><div class="ddc-dots"><i class="" style="--d:0"></i><i class="" style="--d:1"></i><i class="" style="--d:2"></i><i class="" style="--d:3"></i><i class="" style="--d:4"></i><i class="" style="--d:5"></i><i class="" style="--d:6"></i><i class="" style="--d:7"></i><i class="" style="--d:8"></i><i class="" style="--d:9"></i><i class="" style="--d:10"></i><i class="" style="--d:11"></i><i class="" style="--d:12"></i><i class="" style="--d:13"></i><i class="" style="--d:14"></i><i class="" style="--d:15"></i><i class="" style="--d:16"></i><i class="" style="--d:17"></i><i class="" style="--d:18"></i><i class="" style="--d:19"></i><i class="" style="--d:20"></i><i class="" style="--d:21"></i><i class="" style="--d:22"></i><i class="" style="--d:23"></i><i class="" style="--d:24"></i><i class="" style="--d:25"></i><i class="" style="--d:26"></i><i class="" style="--d:27"></i><i class="" style="--d:28"></i><i class="" style="--d:29"></i><i class="" style="--d:30"></i><i class="" style="--d:31"></i><i class="" style="--d:32"></i><i class="" style="--d:33"></i><i class="" style="--d:34"></i><i class="" style="--d:35"></i><i class="" style="--d:36"></i><i class="" style="--d:37"></i><i class="" style="--d:38"></i><i class="" style="--d:39"></i><i class="" style="--d:40"></i><i class="" style="--d:41"></i><i class="" style="--d:42"></i><i class="" style="--d:43"></i><i class="" style="--d:44"></i><i class="" style="--d:45"></i><i class="" style="--d:46"></i><i class="" style="--d:47"></i><i class="" style="--d:48"></i><i class="" style="--d:49"></i><i class="" style="--d:50"></i><i class="" style="--d:51"></i><i class="" style="--d:52"></i><i class="" style="--d:53"></i><i class="" style="--d:54"></i><i class="" style="--d:55"></i><i class="" style="--d:56"></i><i class="" style="--d:57"></i><i class="" style="--d:58"></i><i class="" style="--d:59"></i><i class="" style="--d:60"></i><i class="" style="--d:61"></i><i class="" style="--d:62"></i><i class="" style="--d:63"></i><i class="" style="--d:64"></i><i class="" style="--d:65"></i><i class="" style="--d:66"></i><i class="" style="--d:67"></i><i class="" style="--d:68"></i><i class="" style="--d:69"></i><i class="" style="--d:70"></i><i class="" style="--d:71"></i><i class="" style="--d:72"></i><i class="" style="--d:73"></i><i class="" style="--d:74"></i><i class="" style="--d:75"></i><i class="" style="--d:76"></i><i class="" style="--d:77"></i><i class="" style="--d:78"></i><i class="" style="--d:79"></i><i class="" style="--d:80"></i><i class="" style="--d:81"></i><i class="" style="--d:82"></i><i class="" style="--d:83"></i><i class="" style="--d:84"></i><i class="" style="--d:85"></i><i class="" style="--d:86"></i><i class="" style="--d:87"></i></div></div>
<div class="ddc-lane" data-l="fr"><svg class="ddc-ico ddc-i44" width="44" height="44" aria-hidden="true" focusable="false"><use href="#dcr-g-front"/></svg><span class="ddc-k">Frontier LLM</span><b class="ddc-mono" data-o="n-fr">10</b><div class="ddc-dots"><i class="" style="--d:0"></i><i class="" style="--d:1"></i><i class="" style="--d:2"></i><i class="" style="--d:3"></i><i class="" style="--d:4"></i><i class="" style="--d:5"></i><i class="" style="--d:6"></i><i class="" style="--d:7"></i><i class="" style="--d:8"></i><i class="" style="--d:9"></i></div></div>
<div class="ddc-lane" data-l="hu"><svg class="ddc-ico ddc-i44" width="44" height="44" aria-hidden="true" focusable="false"><use href="#dcr-g-human"/></svg><span class="ddc-k">Person</span><b class="ddc-mono" data-o="n-hu">2</b><div class="ddc-dots"><i class="" style="--d:0"></i><i class="" style="--d:1"></i></div></div>
</div>
<div class="ddc-kvs" id="ddc-esc-sum">
<div class="ddc-kvt"><span class="ddc-k">Decision first</span><b class="ddc-mono" data-o="c-df">$0.34</b></div>
<div class="ddc-kvt"><span class="ddc-k">All frontier</span><b class="ddc-mono" data-o="c-all">$26</b></div>
<div class="ddc-kvt"><span class="ddc-k">Model cost gap</span><b class="ddc-mono" data-o="c-x">76x</b></div>
</div>
</div>
<p class="ddc-capline">Model cost per 100 tickets, from the replay prices.</p>
</div>
</section>
<section class="ddc-scene" id="ddc-api" aria-label="APIs before screens">
<p class="ddc-kicker"><b>5</b>APIs before screens</p>
<h2 class="ddc-q">Call the API before you drive a screen.</h2>
<div class="ddc-con ddc-race" data-race>
<div class="ddc-con-h"><h3>Race, same refund</h3><span class="ddc-tags"><span class="ddc-tag" data-k="illus">Illustrative</span></span></div>
<div class="ddc-con-b" role="img" aria-label="The screen agent steps take 79 seconds. The decision first path with API calls takes about 1 second.">
<div class="ddc-lane2" data-l="scr"><svg class="ddc-ico ddc-i44" width="44" height="44" aria-hidden="true" focusable="false"><use href="#dcr-g-screen"/></svg><span class="ddc-k">Screen agent</span><div class="ddc-track"><i></i></div><b class="ddc-mono" data-clock="79">79 s</b></div>
<div class="ddc-lane2" data-l="api"><svg class="ddc-ico ddc-i44" width="44" height="44" aria-hidden="true" focusable="false"><use href="#dcr-g-api"/></svg><span class="ddc-k">API path</span><div class="ddc-track"><i></i></div><b class="ddc-mono" data-clock="1.1">1.1 s</b></div>
</div>
<div class="ddc-con-f"><p class="ddc-capline">Screens read hidden text. APIs return typed fields.</p><button type="button" class="ddc-run" data-do="race">Race again</button></div>
</div>
</section>
<section class="ddc-scene" id="ddc-undo" aria-label="Person on undo">
<p class="ddc-kicker"><b>6</b>Person on undo</p>
<h2 class="ddc-q">Anything you cannot undo waits for a person.</h2>
<div class="ddc-con ddc-gatebox" data-g="low">
<div class="ddc-con-h"><h3>Reversibility gate</h3><span class="ddc-tags"><span class="ddc-tag" data-k="illus">Illustrative</span></span></div>
<div class="ddc-con-b">
<div class="ddc-seg" role="group" aria-label="Refund size"><button type="button" class="ddc-opt" data-gate="low" aria-pressed="true">$42 refund</button><button type="button" class="ddc-opt" data-gate="high" aria-pressed="false">Over limit, $2,400</button></div>
<figure class="ddc-gflow" role="img" aria-label="A reversible refund under the limit routes to the refund API. An irreversible refund over the limit stops for a person.">
<div class="ddc-node"><svg class="ddc-ico ddc-i64" width="64" height="64" aria-hidden="true" focusable="false"><use href="#ddc-g-dm"/></svg><b>Decide refund</b></div>
<div class="ddc-wire" aria-hidden="true"><i></i></div>
<div class="ddc-node ddc-vault"><svg class="ddc-ico ddc-i64" width="64" height="64" aria-hidden="true" focusable="false"><use href="#ddc-g-shield"/></svg><b>Undo possible?</b><span class="ddc-k">Limit $500</span></div>
<div class="ddc-fork">
<div class="ddc-br" data-br="low"><i class="ddc-led" aria-hidden="true"></i><svg class="ddc-ico ddc-i44" width="44" height="44" aria-hidden="true" focusable="false"><use href="#dcr-g-api"/></svg><b>API, auto</b><span class="ddc-b" data-r="route">Route</span></div>
<div class="ddc-br" data-br="high"><i class="ddc-led" aria-hidden="true"></i><svg class="ddc-ico ddc-i44" width="44" height="44" aria-hidden="true" focusable="false"><use href="#dcr-g-human"/></svg><b>Person signs</b><span class="ddc-b" data-r="stop">Stop</span></div>
</div>
</figure>
</div>
<p class="ddc-capline">The gate holds in any mode, any model.</p>
</div>
</section>
<section class="ddc-scene" id="ddc-replay" aria-label="Run one refund">
<p class="ddc-kicker"><b>7</b>Proof</p>
<h2 class="ddc-q">Run one refund two ways.</h2>
<div class="dcr">
<script>(function(){var r=document.currentScript.parentNode;r.classList.add("dcr-js");(location.hash.slice(1)||"").split("&").forEach(function(p){var m=/^(mode|fault|run|seat|reader|vol|px)=([a-z0-9]+)$/.exec(p);if(m)r.setAttribute("data-"+(m[1]==="reader"?"seat":m[1]),m[2])})})();</script>
<section class="dcr-cmd dcr-panel" id="dcr-console" aria-label="Replay console">
<div class="dcr-bar">
<svg class="dcr-hero" width="88" height="88" aria-hidden="true" focusable="false"><use href="#dcr-g-ticket"/></svg>
<div class="dcr-kv"><span class="dcr-k">Ticket</span><b class="dcr-mono">REFUND-TRIAGE-A</b></div>
<div class="dcr-kv"><span class="dcr-k">Refund asked</span><b class="dcr-mono" data-o="amt">$42</b></div>
<div class="dcr-kv"><span class="dcr-k">Run state</span><b class="dcr-status"><span class="dcr-led" aria-hidden="true"></span><span class="dcr-stat-t">Ready</span></b><span class="dcr-sr dcr-say" role="status" aria-live="polite"></span></div>
</div>
<div class="dcr-picks">
<div class="dcr-pick" role="group" aria-label="Mode"><span class="dcr-k"><b class="dcr-num">1</b>Mode</span><div class="dcr-seg"><button type="button" class="dcr-opt" data-set="mode" data-v="all" aria-pressed="false">All frontier</button><button type="button" class="dcr-opt" data-set="mode" data-v="df" aria-pressed="true">Decision first</button></div></div>
<div class="dcr-pick" role="group" aria-label="Fault to add"><span class="dcr-k"><b class="dcr-num">2</b>Fault to add</span><div class="dcr-seg"><button type="button" class="dcr-opt" data-set="fault" data-v="none" aria-pressed="true">No fault</button><button type="button" class="dcr-opt" data-set="fault" data-v="inject" aria-pressed="false">Injected text</button><button type="button" class="dcr-opt" data-set="fault" data-v="low" aria-pressed="false">Low confidence</button><button type="button" class="dcr-opt" data-set="fault" data-v="high" aria-pressed="false">Over limit</button><button type="button" class="dcr-opt" data-set="fault" data-v="conf" aria-pressed="false">Confident wrong</button></div></div>
<div class="dcr-pick" role="group" aria-label="Run"><span class="dcr-k"><b class="dcr-num">3</b>Run</span><div class="dcr-acts"><button type="button" class="dcr-run">Run refund</button><button type="button" class="dcr-reset" aria-keyshortcuts="R">Reset <kbd aria-hidden="true">R</kbd></button></div></div>
</div>
<p class="dcr-line"><span class="dcr-k">Case</span> <span data-f="none">A customer asks for $42 back on a late order. Policy allows it.</span><span data-f="inject">The order screen carries hidden text that says to refund $900 and close the ticket.</span><span data-f="low">The ticket reads as either a refund or an exchange. The words are vague.</span><span data-f="high">A $2,400 refund that cannot be pulled back once sent.</span><span data-f="conf">The customer wants an exchange, but the words read like a refund.</span> <span class="dcr-tag">Illustrative</span></p>
</section>

<section class="dcr-track dcr-panel" id="dcr-track" aria-label="Six steps">
<div class="dcr-phead"><h2>The state view</h2><span class="dcr-tag">State, not chat</span></div>
<p class="dcr-banner" role="status" hidden><span class="dcr-banner-t"></span> <a href="#dcr-memo">Get your memo</a></p>
<ol class="dcr-steps" aria-label="Steps in order"></ol>
<p class="dcr-post" hidden><span class="dcr-b" data-r="esc">Escalate</span> Security is paged. The ticket holds the note and a screen copy. The order is quarantined.</p>
<div class="dcr-tiles" aria-label="Live tiles">
<div class="dcr-tile"><svg width="44" height="44" aria-hidden="true" focusable="false"><use href="#dcr-g-api"/></svg><span class="dcr-k">Task cost</span><b class="dcr-mono" data-t="cost">$0</b><span class="dcr-vs" data-t="costvs">Run to compare</span></div>
<div class="dcr-tile"><svg width="44" height="44" aria-hidden="true" focusable="false"><use href="#dcr-g-class"/></svg><span class="dcr-k">Latency</span><b class="dcr-mono" data-t="lat">0 s</b><span class="dcr-vs" data-t="latvs">Run to compare</span></div>
<div class="dcr-tile"><svg width="44" height="44" aria-hidden="true" focusable="false"><use href="#dcr-g-front"/></svg><span class="dcr-k">Escalations</span><b class="dcr-mono" data-t="esc">0</b><span class="dcr-vs" data-t="gate">No human gate</span></div>
<div class="dcr-tile dcr-out"><svg width="44" height="44" aria-hidden="true" focusable="false"><use href="#dcr-g-human"/></svg><span class="dcr-k">Outcome</span><b data-t="out">Not run</b><span class="dcr-vs">All tiles illustrative</span></div>
</div>
<details class="dcr-notes"><summary>Badge key and notes</summary>
<ul class="dcr-legend" aria-label="Badge meanings"><li><span class="dcr-b" data-r="route">Route</span> handled, next step</li><li><span class="dcr-b" data-r="esc">Escalate</span> sent to a bigger model</li><li><span class="dcr-b" data-r="stop">Stop</span> waits for a person</li><li><span class="dcr-b" data-r="flag">Flagged</span> threat seen and contained</li><li><span class="dcr-b" data-r="unflag">Unflagged</span> threat passed, no guard</li></ul>
<p class="dcr-foot"><span class="dcr-tag">Illustrative</span> Each step is logged and kept 90 days. Small refunds reverse by API. Scores show how sure each engine is.</p>
<p class="dcr-foot">Costs and times are illustrative. A person costs about $1.50 for 3 minutes of review. Most of the gap is screen versus API.</p>
</details>
</section>

<details class="dcr-why dcr-panel" id="dcr-why">
<summary class="dcr-phead"><h2>Why the runs differ</h2><span class="dcr-tag">Judgement</span></summary>
<div class="dcr-why-g">
<div class="dcr-card"><svg width="64" height="64" aria-hidden="true" focusable="false"><use href="#dcr-g-screen"/></svg><h3>Screens lie</h3><p>A screen agent reads any text it sees. An API returns typed fields, so injected words stay data. Typed fields stop the hidden note.</p></div>
<div class="dcr-card"><svg width="64" height="64" aria-hidden="true" focusable="false"><use href="#dcr-g-class"/></svg><h3>Abstain, then escalate</h3><p>A classifier with conformal abstention says when it is unsure. Escalate only when the big model would fix the answer. <span class="dcr-tag">Illustrative</span></p></div>
<div class="dcr-card"><svg width="64" height="64" aria-hidden="true" focusable="false"><use href="#dcr-g-human"/></svg><h3>Gate the money</h3><p>Code owns policy, limits and money. An irreversible refund over the limit stops for a person, in any mode. No calibration data is published yet. <span class="dcr-tag">Verified 2026</span></p></div>
</div>
</details>

<details class="dcr-memo dcr-panel dcr-fold" id="dcr-memo">
<summary class="dcr-phead"><h2>Your memo</h2><span class="dcr-tag">Built from this run</span></summary>
<div class="dcr-m-app">
<div class="dcr-m-ctl">
<div class="dcr-pick" role="group" aria-label="Tickets a month"><span class="dcr-k">Tickets a month</span><div class="dcr-seg dcr-seg-col"><button type="button" class="dcr-opt" data-set="vol" data-v="10k" aria-pressed="false">10,000</button><button type="button" class="dcr-opt" data-set="vol" data-v="100k" aria-pressed="true">100,000</button><button type="button" class="dcr-opt" data-set="vol" data-v="1m" aria-pressed="false">1,000,000</button></div><div class="dcr-seg dcr-seg-col dcr-px" role="group" aria-label="Vendor price"><button type="button" class="dcr-opt" data-set="px" data-v="1" aria-pressed="true">Price today</button><button type="button" class="dcr-opt" data-set="px" data-v="2" aria-pressed="false">Price doubles</button></div></div>
<div class="dcr-m-acts"><button type="button" class="dcr-btn" data-do="copy">Copy link</button><button type="button" class="dcr-btn" data-do="print">Print</button><span class="dcr-sr dcr-m-say" role="status" aria-live="polite"></span></div>
</div>
<article class="dcr-sheet" aria-label="Memo sheet">
<header class="dcr-m-h"><p class="dcr-k">Memo</p><h3>Refund triage, two ways</h3><dl class="dcr-m-meta"><div><dt>Seat</dt><dd data-o="seat">Buyer</dd></div><div><dt>Fault</dt><dd data-o="fault">No fault</dd></div><div><dt>Date</dt><dd>October 23, 2026</dd></div></dl></header>
<div class="dcr-m-s"><h4><b>1</b>Finding</h4><p class="dcr-m-find" data-o="find"></p></div>
<div class="dcr-m-s"><h4><b>2</b>Monthly cost</h4><div class="dcr-m-cmp"><div><span class="dcr-k">All frontier</span><b class="dcr-mono" data-o="mall">$0</b></div><div><span class="dcr-k">Decision first</span><b class="dcr-mono" data-o="mdf">$0</b></div></div><p class="dcr-m-ill">Our arithmetic at <span data-o="vol">100,000</span> tickets, review minutes included. A $60,000 build <b data-o="pay">pays back fast</b>. Illustrative.</p></div>
<div class="dcr-m-s"><h4><b>3</b>Three actions</h4><ol class="dcr-m-al" data-o="acts"></ol></div>
<div class="dcr-m-s"><h4><b>4</b>Next 30 days</h4><p>Shadow the old flow, then suggest, then go auto. To price it by outcome, read <a href="/deep-dives/monetizing-ai-agents">agent pricing</a> next.</p></div>
<footer class="dcr-m-f">Research, not legal or financial advice.</footer>
</article>
</div>
</details>

<script type="application/json" data-dcr="model">{
"steps":[{"id":"read","n":"Read ticket"},{"id":"intent","n":"Classify intent"},{"id":"policy","n":"Check policy"},{"id":"order","n":"Fetch order"},{"id":"decide","n":"Decide refund"},{"id":"exec","n":"Execute refund"}],
"engines":{"front":{"n":"Frontier LLM","g":"front"},"screen":{"n":"Screen agent","g":"screen"},"rules":{"n":"Rules","g":"rules"},"class":{"n":"Classifier","g":"class"},"api":{"n":"API call","g":"api"},"small":{"n":"Small LLM","g":"small"},"human":{"n":"Person","g":"human"}}
}</script>
<script src="/scripts/dcr.js?v=9577115a" defer></script>
</div>
</section>
<section class="ddc-scene" id="ddc-hype" aria-label="Hype check">
<p class="ddc-kicker"><b>8</b>Hype check</p>
<h2 class="ddc-q">Which viral claims hold up?</h2>
<div class="ddc-con">
<div class="ddc-con-h"><h3>Claim check, 11 claims</h3><div class="ddc-seg" role="group" aria-label="Filter by verdict"><button type="button" class="ddc-vf" data-vf="all" aria-pressed="true">All</button><button type="button" class="ddc-vf" data-vf="ok" data-v="ok" aria-pressed="false"><i class="ddc-led" aria-hidden="true"></i>Verified</button><button type="button" class="ddc-vf" data-vf="part" data-v="part" aria-pressed="false"><i class="ddc-led" aria-hidden="true"></i>Partly</button><button type="button" class="ddc-vf" data-vf="vendor" data-v="vendor" aria-pressed="false"><i class="ddc-led" aria-hidden="true"></i>Vendor</button><button type="button" class="ddc-vf" data-vf="no" data-v="no" aria-pressed="false"><i class="ddc-led" aria-hidden="true"></i>Refuted</button></div></div>
<div class="ddc-con-b ddc-claims"><details class="ddc-claim" data-v="vendor"><summary><i class="ddc-led" aria-hidden="true"></i><span class="ddc-chipv">Vendor</span><b>Jev 200x faster, 400x cheaper</b></summary><p>Rounded from internal 193.6x and 444.6x, one best-case workflow, scored against LLM-averaged labels.</p></details><details class="ddc-claim" data-v="vendor"><summary><i class="ddc-led" aria-hidden="true"></i><span class="ddc-chipv">Vendor</span><b>Outputs are calibrated</b></summary><p>No reliability diagram or calibration error is published.</p></details><details class="ddc-claim" data-v="ok"><summary><i class="ddc-led" aria-hidden="true"></i><span class="ddc-chipv">Verified</span><b>TypeSafe launched Jev</b></summary><p>Early access opened in September 2026, with a $40M seed.</p></details><details class="ddc-claim" data-v="part"><summary><i class="ddc-led" aria-hidden="true"></i><span class="ddc-chipv">Partly</span><b>0.966 accuracy on 49 tasks</b></summary><p>A synthetic benchmark. A public rerun found 86.6% against 73.8% for a local 7B model.</p></details><details class="ddc-claim" data-v="vendor"><summary><i class="ddc-led" aria-hidden="true"></i><span class="ddc-chipv">Vendor</span><b>Zero schema errors</b></summary><p>A valid shape says nothing about a right answer.</p></details><details class="ddc-claim" data-v="no"><summary><i class="ddc-led" aria-hidden="true"></i><span class="ddc-chipv">Refuted</span><b>Made by Typeface</b></summary><p>The company is TypeSafe AI.</p></details><details class="ddc-claim" data-v="no"><summary><i class="ddc-led" aria-hidden="true"></i><span class="ddc-chipv">Refuted</span><b>Stanford open-sourced a skill</b></summary><p>CS329A is a course with public lectures. No code was released.</p></details><details class="ddc-claim" data-v="vendor"><summary><i class="ddc-led" aria-hidden="true"></i><span class="ddc-chipv">Vendor</span><b>Reflection lifts 40% to 95%</b></summary><p>An author claim with no data behind it.</p></details><details class="ddc-claim" data-v="ok"><summary><i class="ddc-led" aria-hidden="true"></i><span class="ddc-chipv">Verified</span><b>Long workflows stay hard</b></summary><p>Claude Opus 4.8 scored 83.4% on OSWorld-Verified and finished 20.6% of 108 long OSWorld 2.0 workflows.</p></details><details class="ddc-claim" data-v="part"><summary><i class="ddc-led" aria-hidden="true"></i><span class="ddc-chipv">Partly</span><b>Open-source fast agent</b></summary><p>The repo is all rights reserved. Its 180 of 180 tests are self-reported.</p></details><details class="ddc-claim" data-v="part"><summary><i class="ddc-led" aria-hidden="true"></i><span class="ddc-chipv">Partly</span><b>EU transparency in force</b></summary><p>Article 50 applies from 2 August 2026. The Digital Omnibus may delay parts.</p></details></div>
<p class="ddc-capline">Tap a claim for the detail.</p>
</div>
</section>
<section class="ddc-scene" id="ddc-chooser" aria-label="Rung chooser">
<p class="ddc-kicker"><b>9</b>Decide</p>
<h2 class="ddc-q">Which rung fits your step?</h2>
<div class="ddc-con">
<div class="ddc-con-h"><h3>Rung chooser</h3><span class="ddc-tags"><span class="ddc-tag" data-k="judge">Judgement</span></span></div>
<div class="ddc-con-b ddc-ch">
<form class="ddc-qs" aria-label="Step questions"><fieldset class="ddc-fs"><legend><b class="ddc-n">1</b>Can it be undone?</legend><div class="ddc-seg"><button type="button" class="ddc-opt" data-q="rev" data-a="yes" aria-pressed="true">Yes</button><button type="button" class="ddc-opt" data-q="rev" data-a="no" aria-pressed="false">No</button></div></fieldset><fieldset class="ddc-fs"><legend><b class="ddc-n">2</b>Latency budget</legend><div class="ddc-seg"><button type="button" class="ddc-opt" data-q="lat" data-a="fast" aria-pressed="false">Under 1 s</button><button type="button" class="ddc-opt" data-q="lat" data-a="sec" aria-pressed="true">Seconds</button><button type="button" class="ddc-opt" data-q="lat" data-a="min" aria-pressed="false">Minutes</button></div></fieldset><fieldset class="ddc-fs"><legend><b class="ddc-n">3</b>Daily volume</legend><div class="ddc-seg"><button type="button" class="ddc-opt" data-q="vol" data-a="low" aria-pressed="false">Low</button><button type="button" class="ddc-opt" data-q="vol" data-a="high" aria-pressed="true">High</button></div></fieldset><fieldset class="ddc-fs"><legend><b class="ddc-n">4</b>External check exists?</legend><div class="ddc-seg"><button type="button" class="ddc-opt" data-q="chk" data-a="yes" aria-pressed="true">Yes</button><button type="button" class="ddc-opt" data-q="chk" data-a="no" aria-pressed="false">No</button></div></fieldset><fieldset class="ddc-fs"><legend><b class="ddc-n">5</b>Need trusted confidence?</legend><div class="ddc-seg"><button type="button" class="ddc-opt" data-q="cal" data-a="yes" aria-pressed="false">Yes</button><button type="button" class="ddc-opt" data-q="cal" data-a="no" aria-pressed="true">No</button></div></fieldset></form>
<div class="ddc-out" aria-live="polite"><span class="ddc-k"><i class="ddc-led" aria-hidden="true"></i>Run it on</span><div class="ddc-pick"><span class="ddc-pico"></span><b class="ddc-pname">Small LLM</b></div><ul class="ddc-why"><li>Seconds allow a model call.</li></ul><ol class="ddc-mini" aria-hidden="true"><li></li><li></li><li></li><li></li><li></li></ol></div>
</div>
</div>
<div class="ddc-grid ddc-guard">
<article class="ddc-gc"><svg class="ddc-ico ddc-i44" width="44" height="44" aria-hidden="true" focusable="false"><use href="#ddc-g-check"/></svg><b>Build it safely</b><p>Lock tests, type contracts, run evals in CI.</p></article>
<article class="ddc-gc"><svg class="ddc-ico ddc-i44" width="44" height="44" aria-hidden="true" focusable="false"><use href="#ddc-g-x"/></svg><b>When not to</b><p>Under about 1,000 tasks a month, skip the ladder. <span class="ddc-tag" data-k="illus">Illustrative</span></p></article>
<article class="ddc-gc"><svg class="ddc-ico ddc-i44" width="44" height="44" aria-hidden="true" focusable="false"><use href="#ddc-g-shield"/></svg><b>Buying hosted?</b><p>Hosted models send data out. Sign a DPA.</p></article>
</div>
<template id="ddc-icons"><svg class="ddc-ico ddc-i88" width="88" height="88" aria-hidden="true" focusable="false"><use href="#dcr-g-rules"/></svg><svg class="ddc-ico ddc-i88" width="88" height="88" aria-hidden="true" focusable="false"><use href="#ddc-g-dm"/></svg><svg class="ddc-ico ddc-i88" width="88" height="88" aria-hidden="true" focusable="false"><use href="#dcr-g-small"/></svg><svg class="ddc-ico ddc-i88" width="88" height="88" aria-hidden="true" focusable="false"><use href="#dcr-g-front"/></svg><svg class="ddc-ico ddc-i88" width="88" height="88" aria-hidden="true" focusable="false"><use href="#dcr-g-screen"/></svg></template>
</section>
<section class="ddc-scene" id="ddc-rules" aria-label="Rules">
<p class="ddc-kicker"><b>10</b>Rules</p>
<h2 class="ddc-q">What is still unknown?</h2>
<div class="ddc-grid ddc-s5">
<ol class="ddc-ql ddc-con" data-for="buyer"><li><b>1</b>Will vendors time your own tasks?</li><li><b>2</b>Who pays when a sure answer is wrong?</li><li><b>3</b>How do you audit a step nobody chatted with?</li></ol>
<ol class="ddc-ql ddc-con" data-for="builder"><li><b>1</b>When will decision models publish calibration?</li><li><b>2</b>Can a router learn rescue from little data?</li><li><b>3</b>Which apps can become typed tools?</li></ol>
<ol class="ddc-ql ddc-con" data-for="strategy"><li><b>1</b>Is the decision layer a product or a feature?</li><li><b>2</b>Do cheap open weights erase the routing margin?</li><li><b>3</b>Will agent standards beat the audits?</li></ol>
<div class="ddc-rulebox ddc-con"><svg class="ddc-ico ddc-i44" width="44" height="44" aria-hidden="true" focusable="false"><use href="#ddc-g-doc"/></svg><ul class="ddc-rl"><li><i class="ddc-led" data-v="part" aria-hidden="true"></i><span class="ddc-chipv" data-v="part">Due</span><span>EU Article 50, from 2 August 2026</span></li><li><i class="ddc-led" data-v="part" aria-hidden="true"></i><span class="ddc-chipv" data-v="part">Moved</span><span>EU high-risk duties, to December 2027</span></li><li><i class="ddc-led" data-v="ok" aria-hidden="true"></i><span class="ddc-chipv" data-v="ok">Yours</span><span>Pin model versions, no silent swaps</span></li><li><i class="ddc-led" data-v="vendor" aria-hidden="true"></i><span class="ddc-chipv" data-v="vendor">Pending</span><span>US agent standards, no final output</span></li></ul></div>
</div>
</section>
<script src="/scripts/ddc.js?v=34ad9090" defer></script>
</div>
