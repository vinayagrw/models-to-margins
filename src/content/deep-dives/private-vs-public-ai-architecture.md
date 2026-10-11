---
title: Private AI vs Public AI — The Architecture, Not the Argument
summary: "The open-versus-closed debate died quietly in 2026. Frontier models now run air-gapped on your own metal, open weights are served as managed APIs, and the capability gap at the top of the table closed to about one index point. What remains is an architecture question with five real answers, and the only thing that decides between them is where your data is allowed to be. Six legs follow one request from the client app to the GPU and back."
pubDate: 2026-08-25
updatedDate: 2026-08-25
featured: true
listed: true
template: waybill
bpEyebrow: Consignment MS-02
bpTitle: Private AI vs Public AI
bpSubtitle: Five deployment positions, one gateway, and the custody chain your prompt actually travels.
bpCoords:
  - Domain · Enterprise AI platform strategy
  - Legs · 6
  - Exhibits · 4
  - Verified · Aug 2026
geography: Global, with EU regulatory detail
horizon: 0 to 2 years
tags:
  - private AI
  - public AI
  - open models
  - enterprise AI
  - model strategy
  - sovereignty
audience: CTOs, platform teams, and AI operators
readTime: 14 min read
---

<div class="note-panel">
  <p><strong>One-line idea</strong>: this was never a choice between two things. It is a position on a five-point spectrum, and the thing that picks your position is <strong>where your data is legally and contractually allowed to be</strong> — not which model scores higher.</p>
  <p><strong>Who this is for</strong>: a CTO who needs the decision (legs 1-2); a platform lead who needs the reference architecture (legs 3-4); an engineer who needs the topology and the serving stack (legs 5-6).</p>
  <p><strong>Companion</strong>: the interactive brief is the one-screen executive version of this argument. This page is the architecture underneath it.</p>
  <p style="margin-top: 4px;"><strong>Evidence discipline</strong>: every model name, price and regulatory date below carries the date it became true, listed in the closing leg. Where the public evidence is vendor-adjacent or self-contradictory — total cost of ownership, GPU hourly rates, cache hit rates — this page gives you the <em>structure</em> and the variables and refuses to invent the number. Those are marked as such in place.</p>
</div>

<div class="signal-grid">
  <div class="signal-card">
    <span class="signal-label">The gap closed</span>
    <strong>About one index point at the top.</strong>
    <p>Kimi K3 Max scored 60 on the Artificial Analysis Intelligence Index against Claude Opus 5 at 61 (2 August 2026). The three-model <em>average</em> still favours closed by roughly 7.6 points — so the gap is real in the middle of the table and nearly gone at the top.</p>
  </div>
  <div class="signal-card">
    <span class="signal-label">The dichotomy broke</span>
    <strong>Open weights no longer mean self-hosting.</strong>
    <p>Bedrock alone serves a managed open-weight catalogue in the mid-twenties of models. You can buy open weights as an API, and you can run a frontier closed model on your own hardware. The two axes — who owns the weights, who runs the metal — finally came apart.</p>
  </div>
  <div class="signal-card">
    <span class="signal-label">Closed came to your metal</span>
    <strong>Air-gapped frontier inference is now purchasable.</strong>
    <p>Gemini runs on a single eight-GPU server via Google Distributed Cloud with no link to Google and no remote kill. Microsoft Foundry Local and M365 Local do the equivalent. The cleanest 2025-era argument for self-hosting open weights no longer holds on its own.</p>
  </div>
  <div class="signal-card">
    <span class="signal-label">The clock started</span>
    <strong>EU AI Act GPAI duties are enforceable.</strong>
    <p>Since 2 August 2026 the AI Office can demand documentation, run model evaluations and fine. Article 50 transparency applies from the same date, with a transition to 2 December 2026 for synthetic-content marking. High-risk obligations slipped to December 2027 and August 2028.</p>
  </div>
</div>

<nav class="reading-map" aria-label="Reading map">
  <p class="reading-map-label">Reading map · 6 legs · decision to GPU</p>
  <div class="reading-map-grid">
    <a class="reading-link" href="#leg-1--the-spectrum-not-the-binary"><strong>1 · The spectrum</strong><span>Five real positions, not two.</span></a>
    <a class="reading-link" href="#leg-2--what-actually-decides-it"><strong>2 · What decides it</strong><span>Data custody, then everything else.</span></a>
    <a class="reading-link" href="#leg-3--the-reference-architecture"><strong>3 · Reference architecture</strong><span>The gateway is the product.</span></a>
    <a class="reading-link" href="#leg-4--one-request-end-to-end"><strong>4 · One request</strong><span>Lifecycle, with the failure exits.</span></a>
    <a class="reading-link" href="#leg-5--the-self-hosted-topology"><strong>5 · Self-hosted topology</strong><span>What serving actually looks like.</span></a>
    <a class="reading-link" href="#leg-6--what-changed-and-what-we-wont-claim"><strong>6 · What changed</strong><span>Dates, and the gaps we won't fill.</span></a>
  </div>
</nav>

<div class="callout warm">
  <strong>What changed since the April brief</strong>
  <p>The interactive brief was written on 5 April 2026 and eight of its load-bearing claims have since expired: the reference open family, the size heuristic, every price on the rate card, the capability gap, the regulatory timeline, and the assumption that frontier models cannot run on your hardware. This page is the corrected argument. Leg 6 lists every change with the date it landed, so you can see exactly what moved rather than taking a rewrite on faith.</p>
</div>

## Leg 1 — The spectrum, not the binary

"Private or public" collapses two independent questions into one: *who owns the weights* and *who runs the metal*. In 2026 those came apart, and the result is five genuinely distinct deployment positions — each a real, purchasable thing, each with a different answer to who holds your prompts, your logs and your weights.

<p class="wb-fig-claim">Every position on this axis is something you can buy today. Two of the five did not exist as credible enterprise options eighteen months ago, and both of them sit in the middle — which is where most organisations actually belong.</p>

<div class="visual-frame" id="fig-spectrum" tabindex="-1" data-fig="The five deployment positions" style="--vf-h:660px">
  <iframe
    src="/visuals/private-vs-public-ai/deployment-spectrum.html?embed=1"
    title="Five positions on one deployment axis — managed frontier API, managed open weights, sovereign-region managed, vendor appliance on your own metal, and self-hosted open weights — each showing who holds the weights, the prompts and the logs, and where the legal boundary falls."
    loading="lazy"
    sandbox="allow-scripts allow-same-origin"
  ></iframe>
</div>

Notice what the axis is not sorted by. It is not sorted by capability, and it is not sorted by cost. It is sorted by **custody** — how much of the chain sits inside your boundary. That is the only ordering that stays stable when the models change again next quarter.

## Leg 2 — What actually decides it

Most comparison pages lead with benchmarks. That was defensible when the gap was large. It is not defensible now that the top of the table is separated by roughly one index point, while the compliance consequences of choosing wrong have become enforceable.

<div class="thesis-grid">
  <div class="thesis-card">
    <em>First question</em>
    <strong>Where is this data allowed to be?</strong>
    <p>Not "where would we prefer it". Data residency, sector regulation, contractual commitments to your own customers, and — since 2 August 2026 — enforceable GPAI and transparency duties. This question alone eliminates two or three of the five positions for most regulated workloads, before capability is discussed at all.</p>
  </div>
  <div class="thesis-card">
    <em>Second question</em>
    <strong>Is this workload high-volume and stable?</strong>
    <p>Self-hosting trades a variable per-token bill for fixed capacity you must keep busy. That trade only pays on predictable, sustained load. Spiky or exploratory workloads lose on it regardless of the token price, because you pay for idle GPUs at full rate.</p>
  </div>
  <div class="thesis-card">
    <em>Third question</em>
    <strong>Can you actually operate it?</strong>
    <p>Serving, evaluating, upgrading and securing an inference stack is a standing platform commitment, not a project. The mid-market teams that succeed with open weights are the ones that already run production infrastructure well. The ones that fail treat it as a cost exercise.</p>
  </div>
</div>

A licence note that is easy to get wrong and expensive to get wrong: the permissive families really are permissive — Qwen3 and later under Apache 2.0, DeepSeek and GLM-5.2 under MIT. Llama is the exception, and it is no longer the reference open family in any current roundup. Its custom community licence carries a multimodal grant that **excludes developers established in the EU**. If your legal team is approving on the assumption that "open weights" means "permissive", that assumption needs checking per family, not per category.

## Leg 3 — The reference architecture

Whatever position you pick, the architecture that makes it survivable is the same, and it has a single load-bearing component: the gateway. It is what lets a portfolio strategy be a strategy rather than five disconnected integrations.

One naming point, because it causes real procurement mistakes. **AI gateway, LLM gateway, model gateway, AI proxy and model router are all the same component.** The name drifted as the traffic broadened past plain text completions to embeddings, rerankers, images and tool calls; the older label stuck to the narrower job. There is no tier structure hiding in the vocabulary. You deploy exactly one.

<div class="note-panel">
  <p><strong>The two-gateway anti-pattern.</strong> Teams that treat the names as different products buy an "AI gateway" for one group and an "LLM gateway" for another, and end up chaining them. The result is two hops of added latency on every call, two policy engines that will eventually disagree about the same request, and two audit logs that are each individually incomplete — which destroys the single-chokepoint property that is the entire reason the component exists.</p>
  <p style="margin-top: 4px;">If you already have two, the fix is not to keep both enforcing. Pick the one closer to your identity and policy systems, and demote the other to a dumb passthrough or remove it.</p>
</div>

<p class="wb-fig-claim">The gateway is where routing, authentication, quota, redaction, caching and audit live. Put it in from the first integration — retrofitting it across an estate of direct SDK calls is the single most common expensive mistake in this space.</p>

<div class="visual-frame" id="fig-reference" tabindex="-1" data-fig="Gateway-centric enterprise reference architecture" style="--vf-h:720px">
  <iframe
    src="/visuals/private-vs-public-ai/reference-architecture.html?embed=1"
    title="Enterprise reference architecture — client applications through an AI gateway handling routing, auth, quota, redaction, semantic cache and audit, to three backend classes of frontier API, managed open weights and a self-hosted cluster, with shared retrieval, evaluation, cost metering and residency control planes. Each edge is labelled with what crosses it."
    loading="lazy"
    sandbox="allow-scripts allow-same-origin"
  ></iframe>
</div>

The three routing policies in that diagram are not interchangeable. Routing by capability sends everything hard to the frontier and is the easiest to reason about. Routing by cost is the one most teams reach for and the one most likely to surprise them, because a cheaper model that fails and retries is not cheaper. Routing by residency is the only one of the three that is not an optimisation — it is a constraint, and it must be evaluated first, with the other two applying only to what survives it.

## Leg 4 — One request, end to end

Architecture diagrams show what exists. This one shows what happens — one request crossing the gateway, with the decisions in the order they actually occur, and with the failure exits that comparison pages leave out.

<p class="wb-fig-claim">Sensitivity classification comes before model selection, not after. If your gateway picks the model first and redacts second, you have already made the residency decision by accident.</p>

<div class="visual-frame" id="fig-lifecycle" tabindex="-1" data-fig="One request across the gateway" style="--vf-h:740px">
  <iframe
    src="/visuals/private-vs-public-ai/request-lifecycle.html?embed=1"
    title="Request lifecycle swimlaned across application, gateway, policy, model backend and audit — classify sensitivity, apply residency constraint, check cache, select model tier, redact, invoke and log, including the blocked-by-residency, over-quota and backend-down fallback exits."
    loading="lazy"
    sandbox="allow-scripts allow-same-origin"
  ></iframe>
</div>

The three exits on the right are the ones that decide whether this design survives contact with production. Blocked by residency must fail closed and be logged as a policy event, not silently downgraded to a permitted model. Over quota needs a defined behaviour agreed with the business before it happens, not at three in the morning. And backend-down fallback is where a residency policy quietly breaks: if your fallback tier sits in a different jurisdiction, your outage procedure is also a data-export procedure.

## Leg 5 — The self-hosted topology

If the answer is position five, this is what you are signing up to run. The serving layer is where the last two years of engineering effort actually went, and it is the part most cost models ignore entirely.

<p class="wb-fig-claim">Prefill and decode have different hardware appetites. Since SGLang 0.5.12 (16 May 2026) treating them as separate, independently scaled stages is a first-class deployment topology rather than a research result — and for agentic workloads with long prompts and short outputs, that split is where the throughput is.</p>

<div class="visual-frame" id="fig-topology" tabindex="-1" data-fig="Self-hosted serving topology" style="--vf-h:700px">
  <iframe
    src="/visuals/private-vs-public-ai/self-host-topology.html?embed=1"
    title="Self-hosted inference topology — ingress through gateway to inference servers on vLLM or SGLang, GPU pool, weights store and observability with cost metering, with a toggle between aggregated serving and disaggregated prefill and decode, plus a parameterised cost structure the reader supplies their own inputs to."
    loading="lazy"
    sandbox="allow-scripts allow-same-origin"
  ></iframe>
</div>

<div class="callout">
  <strong>Why there is no break-even number on this page</strong>
  <p>You will find plenty of them published. We are not repeating any, and the reason is specific rather than squeamish. Every published break-even figure traces back to a vendor-adjacent blog, and the single largest input — GPU hourly cost — is <em>directly contradicted</em> across the available data: one set of 2026 figures has H100 rental cheaper than ever post-Blackwell, another has it roughly doubling, and quoted B200 rates span a factor of two. A break-even calculated on a disputed input is not analysis; it is a number with a decimal point. What the exhibit above gives you instead is the <strong>structure</strong> — utilisation, tokens per month, GPU hours, the amortised platform-engineering cost that most models omit — with the inputs left for you to fill from your own live quotes. Treat GPU pricing as a quote you obtain this week, not a constant you look up.</p>
</div>

## Leg 6 — What changed, and what we won't claim

Everything asserted above, with the date it became true. Then, deliberately, the things we could not stand behind.

### What changed, and when

| What | When |
| --- | --- |
| GLM-5.2 released, 744B total / ~40B active, **MIT** | 13 Jun 2026 |
| Kimi K2.7 Code, ~1T total / 32B active MoE | 12 Jun 2026 |
| Kimi K3 shipped in product 17 Jul; **full weights released 27 Jul** | Jul 2026 |
| **DeepSeek-V4-Flash** open-sourced under **MIT** — 284B total / 13B active, 1M context; DeepSeek claims it beats its own trillion-scale V4-Pro on nine agent benchmarks | 31 Jul 2026 |
| Capability gap at the top: **Kimi K3 Max 60 vs Claude Opus 5 61**; top-3 average 52.7 open vs 60.3 proprietary | 2 Aug 2026 |
| **Claude Opus 5 at $5 / $25** per million tokens | 24 Jul 2026 |
| **OpenAI cut GPT-5.6 Luna ~80%**, Terra ~20%; Luna now ~$0.20 / $1.20 | 30 Jul 2026 |
| **Sonnet 5 fixed at $2 / $10 permanently** — the planned 1 September rise to $3 / $15 was cancelled | 11 Aug 2026 |
| **EU AI Act GPAI obligations enforceable**; Article 50 transparency applies, with transition to 2 Dec 2026 for synthetic-content marking | 2 Aug 2026 |
| **High-risk obligations delayed** — Annex III to 2 Dec 2027, Annex I to 2 Aug 2028 | 2026 |
| **AWS European Sovereign Cloud live** — Brandenburg, separate partition, EU-resident-only operations, German parent | 15 Jan 2026 |
| **Microsoft M365 Local + Foundry Local** — inference on customer hardware, disconnected from public cloud | Feb 2026 |
| **Air-gapped Gemini** on a single eight-GPU server via Google Distributed Cloud — no Google link, not remotely killable | 2026 |
| **SGLang 0.5.12** — first release treating prefill/decode disaggregation as first-class | 16 May 2026 |
| **gpt-oss has not been refreshed** since Aug 2025; 120B/20B under Apache 2.0 remains current | — |
| Licence split: Qwen3+ **Apache 2.0**, DeepSeek **MIT**, GLM-5.2 **MIT**; **Llama 4 custom community licence, multimodal grant excludes EU-established developers** | — |

### What we deliberately did not assert

Stating this is the point, not a disclaimer. Each of these appears confidently in the current literature and none of it survived checking:

- **Every total-cost-of-ownership break-even figure.** All trace to vendor-adjacent blog