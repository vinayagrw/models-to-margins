---
title: Private AI vs Public AI
summary: Open models are becoming controllable infrastructure, closed models remain premium managed services, and hybrid model routing is the practical enterprise pattern.
pubDate: 2026-04-05
updatedDate: 2026-08-25
featured: false
listed: true
industry: AI platform strategy
lens:
  - Open models
  - Architecture
  - Pricing
  - Governance
briefType: interactive
openPath: /briefs/private-ai-vs-public-ai
tags:
  - private AI
  - public AI
  - open models
  - enterprise AI
  - model strategy
audience: CTOs, platform teams, and AI operators
readTime: 12 min read
supportingVisualPath: /visuals/model-strategy/private-ai-vs-public-ai-architecture.html
supportingVisualLabel: View the private AI control plane
--- 

## What Changed Since This Was Written

This brief was written on 5 April 2026 and refreshed on 25 August 2026. The argument held; several of the facts did not. The full corrected version, with the architecture underneath it, is the companion deep dive: [Private AI vs Public AI — The Architecture, Not the Argument](/deep-dives/private-vs-public-ai-architecture).

Eight things below are now out of date, and are corrected there, with dates:

- **The reference open families moved on.** GLM-5.2 (MIT, 13 Jun 2026), Kimi K2.7 Code (12 Jun), Kimi K3 weights (27 Jul), and DeepSeek-V4-Flash (MIT, 31 Jul — 284B total / 13B active, 1M context) all post-date the table below. Llama is no longer the reference open family in current roundups.
- **The capability gap nearly closed at the top.** Kimi K3 Max scored 60 on the Artificial Analysis Intelligence Index against Claude Opus 5 at 61 (2 Aug 2026). The three-model average still favours closed by roughly 7.6 points.
- **Every price below is void.** Claude Opus 5 launched at $5/$25 (24 Jul 2026); Sonnet 5 was fixed at $2/$10 permanently, cancelling the planned September rise (11 Aug 2026); OpenAI cut GPT-5.6 Luna by about 80% to roughly $0.20/$1.20 (30 Jul 2026).
- **"Smaller is strictly weaker" no longer holds.** DeepSeek reports its 13B-active V4-Flash beating its own trillion-scale V4-Pro on nine agent benchmarks.
- **EU AI Act GPAI and Article 50 duties are enforceable** as of 2 August 2026, with a transition to 2 December 2026 for synthetic-content marking. High-risk obligations slipped to 2 December 2027 (Annex III) and 2 August 2028 (Annex I).
- **Frontier closed models now run on your own metal.** Air-gapped Gemini on a single eight-GPU server via Google Distributed Cloud; Microsoft Foundry Local and M365 Local; and the AWS European Sovereign Cloud has been live since 15 January 2026.
- **"Open weights" no longer means self-hosting.** Bedrock's managed open-weight catalogue makes the two independent choices.
- **Llama's licence needs checking, not assuming.** Its custom community licence carries a multimodal grant that excludes developers established in the EU. Qwen3+ is Apache 2.0; DeepSeek and GLM-5.2 are MIT.

## Why This Matters Now

The real shift is not "open versus closed" as a brand debate. It is whether a company wants AI as infrastructure it controls or AI as a premium managed service it rents.

Gemma 4 under Apache 2.0 sharpened that conversation because it made the business case more concrete: commercialization rights are cleaner, self-hosting is easier to justify, and the model can sit inside a company's own compliance boundary. The result is a more serious enterprise split between **private AI** and **public AI**.

## Open vs Closed in Plain Language

Open and open-weight models are the models a company can bring closer to its own stack. That means more control over where inference runs, how the model is tuned, how prompts and tools are wired, and how data stays inside internal systems.

Closed models are the opposite operational choice. The vendor runs the model, the serving layer, the safety stack, and the scaling layer. In exchange, the buyer gets speed, managed reliability, and frontier capability without owning inference infrastructure.

One important nuance: not all "open" models are equally open in business terms. Apache 2.0 style releases are the cleanest to approve. Community or custom open-weight licenses need more legal review.

## Where Open Wins

- Sensitive internal copilots over proprietary knowledge, contracts, tickets, and account history.
- Fine-tuned vertical workflows where the company wants tighter behavior and domain control.
- On-prem, sovereign, or air-gapped deployments where data locality matters more than convenience.
- Edge and device AI where latency, offline use, or footprint matter.
- High-volume, predictable inference where self-hosting can beat API economics over time.
- Agent systems that need more control over prompts, tools, routing, and evaluation loops.

## Where Closed Wins

- Frontier multimodal and reasoning quality where absolute capability matters most.
- Small teams that need the fastest path from prototype to production.
- High-stakes customer-facing workflows where vendor SLAs, procurement, and support matter.
- Organizations that do not want to run model serving, GPU capacity, and evaluation infrastructure.
- Workloads where managed reliability is worth more than infrastructure control.

## The Architecture Pattern

The practical enterprise pattern is a control plane, not a single model.

The support visual linked above shows the stack in one line:

- policy gateway and auth at the edge
- a central control plane or orchestrator
- retrieval and business-tool access
- routing between model paths
- observability, evaluation, and cost tracking

That architecture is what makes **private AI and public AI** coexist. Sensitive, repetitive, or high-volume work can route to private open models. Premium reasoning or managed external use cases can route to closed APIs. The decision point is the router and policy layer, not the homepage of a single model vendor.

## Major Production-Relevant Open Families

This is **not** a ranking of all open models. It is a shortlist of the major production-relevant open or open-weight families discussed in the April 3, 2026 thread, evaluated for business deployment value rather than benchmark theater.

Representative hosted prices below are April 2026 snapshots cited in that thread and have already moved on several rows (DeepSeek in particular, where V4 has since shipped and typical hosted V3.1/R1 prices are now well below the listed figures). Open-model economics are not standardized.

| Family | License | Business fit | Self-host difficulty | Typical cost | Best use case | When to prefer closed instead |
|---|---|---|---|---|---|---|
| Qwen3 | Apache 2.0 | Best all-around open business option | Medium-High on large variants | About `$0.20/M` input and `$0.60/M` output for `235B-A22B` via hosted providers | Enterprise copilots, multilingual support, coding, agents | When managed support, indemnity, or premium multimodal matter more than control |
| Gemma 4 | Apache 2.0 | Efficient, license-friendly, productizable | Low-Medium for smaller variants | Provider-dependent; no single canonical price | Private assistants, regulated internal apps, edge/local AI | When you want frontier capability with the least operational work |
| gpt-oss | Apache 2.0 (open-weight) | Strong reasoning with major ecosystem gravity | Medium | About `$0.15/M` input and `$0.60/M` output for `120B` via hosted providers | Reasoning agents, coding, private deployment | When a team prefers fully managed OpenAI APIs and does not want infra ownership |
| Mistral open models | Mostly Apache 2.0 on open families | Efficient enterprise production, especially EU-friendly | Low-Medium | About `$0.10/M` input and `$0.30/M` output for `Mistral Small 3` | Fast assistants, multilingual apps, lower-cost production | When frontier reasoning or turnkey multimodal is the priority |
| IBM Granite 4 | Apache 2.0 | Governance-heavy enterprise use | Low-Medium | Provider-dependent; lower infra footprint is part of the pitch | RAG, documents, controlled workflows | When raw frontier quality matters more than auditability and efficiency |
| DeepSeek V3 / R1 | MIT (weights) | Strongest price-performance for reasoning-heavy work | Medium-High | `V3.1` about `$0.60/$1.70` at the April snapshot, typical hosted now nearer `$0.25/$0.95`; `R1` `$3/$7` on Together's list, typical hosted nearer `$0.70/$2.50` | Coding, reasoning, research agents | When compliance, procurement comfort, or geopolitical scrutiny are blockers |
| Llama 4 | Llama 4 Community License | Ecosystem-first generalist | Medium-High | About `$0.27/M` input and `$0.85/M` output for `Maverick` | Broad compatibility and partner tooling | When legal wants cleaner permissive licensing or fewer usage conditions |

Two things can both be true at once:

- Enterprise familiarity still favors families like Llama and Gemma.
- Hosted runtime momentum has shifted toward DeepSeek and Qwen in more developer-heavy environments.

That is why the buying question is not just "which model is best?" It is also "best for whose operating model?"

## How Open Model Providers Make Money

Open model providers usually do not make money by charging for the license itself. They make money around the model:

- hosted inference and premium API tiers
- cloud consumption and GPU demand
- enterprise control planes, security, and governance tooling
- fine-tuning, evaluation, and integration services
- commercial support, procurement, and long-term platform contracts

The simplest metaphor from the original thread still holds:

**They give away the engine to sell the highway, the fuel, the repair shop, and the fleet contract.**

## What This Means by Company Size

- **Startups:** closed models are often the right default early because they reduce operational burden and speed up time to market. Open models become more attractive once privacy, unit economics, or differentiation starts to matter.
- **Mid-market companies:** this is often the sweet spot for open models. They usually have enough engineering capability to self-host or tune models, and enough usage for cost control to matter.
- **Large enterprises:** open models are a strong fit for private, regulated, and high-volume internal workloads. Closed models still stay in the stack for premium reasoning and managed external-facing use cases.
- **Regulated industries:** open models are compelling when auditability and deployment control matter, but only if the organization has the security and platform maturity to run them well.

## The Real Enterprise Pattern

Open models are becoming infrastructure.

Closed models remain premium managed services.

The best AI organizations will use both intentionally:

- own the narrow, repetitive, sensitive, or high-volume workloads
- rent the frontier capability where time-to-value and managed reliability matter more
- route between them with policy, observability, and cost awareness

The future is not one model strategy.

It is a **portfolio strategy**.
