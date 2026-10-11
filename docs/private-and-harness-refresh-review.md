# Refresh review — harness-engineering + private-vs-public-ai

**Date:** 2026-08-25
**Scope:** `/deep-dives/harness-engineering` (re-skinned to `tower`, content refreshed, visual set rebuilt) and the new `/deep-dives/private-vs-public-ai-architecture` (`waybill`) plus corrections to the existing `/briefs/private-ai-vs-public-ai`.
**Purpose:** record why the design is what it is, and what the adversarial pass found. Defects found here were fixed in the deliverable; judgment calls are flagged rather than silently resolved.

---

## Part 1 — Design personas

Each persona states what it needs, then signs off or objects. Objections that were acted on are marked **→ fixed**; ones left standing are marked **→ standing**.

### Exec sponsor
*Need: can I decide from the first three scenes without reading further?*

**Signed off.** Both pages front-load a decision. Harness engineering: the four signal cards carry the shift, the evidence, the 2026 narrowing and the compounding rule; Scene 3 closes the exec arc. Private vs public: the four signal cards state the closed gap, the broken dichotomy, air-gapped frontier availability and the enforceable regulatory date — Leg 2 gives the three questions that actually decide it.

**Objection raised:** the harness page's exec arc originally ended on a benchmark delta, which is the weakest possible closing note for a decision-maker. **→ fixed** — Scene 3 now ends on the confound callout, so an exec who stops there leaves knowing the number is a claim about a system, not a model. That is a more useful thing to carry into a vendor conversation than the number itself.

### Enterprise architect
*Need: do the L1/L2/L3 diagrams contain real components and correct edges, or category boxes?*

**Signed off, and this drove the largest share of the work.** Every diagram edge carries a real protocol artifact, verified present in the built files: `Mcp-Method: tools/list` / `tools/call`, `Mcp-Name`, `{tools, ttlMs, cacheScope}`, `resultType: "input_required"`, `messages.create(tools)`, `tool_use` / `tool_result`, `exec` over vsock, `run.created` / `tool.completed{hash}` / `run.completed{manifest}`.

**Objection raised:** the previous Scene 4 and Scene 5 visuals called themselves a framework and a run trace but were a card list and a step list — no components, no edges, no decisions, no loops, no failure exits. **→ fixed** — both superseded by real diagrams. The control flow now carries six decision diamonds, a compaction loop-back, a bounded retry cap and four distinct terminal states.

### Platform engineer
*Need: could I actually stand this up from the L3 topology?*

**Signed off with one reservation.** The deployment instrument names three trust zones, the isolation mechanism per OS (gVisor / Seatbelt / microVM + vsock), the egress broker, and the wire sequence with real headers. The stateless-vs-legacy toggle is the strongest teaching device on either page: flipping it re-adds the `initialize`/`initialized` handshake, `Mcp-Session-Id` on every request, and the sticky router with its session store — verified present in the built file.

**→ standing:** the topology is deliberately vendor-neutral, so it names mechanisms rather than products. An engineer still needs their own platform's concrete equivalents. This is the page's stated stance, not an oversight.

### Security / compliance officer
*Need: are the trust boundaries, egress rules and residency claims accurate and dated?*

**Signed off.** The context map draws three correctly *nested* trust frames (untrusted model output ⊂ sandboxed execution ⊂ enterprise network) rather than three adjacent boxes, which is the distinction that matters. The sandbox's lack of direct internet egress is drawn as the loudest edge in the L3 topology.

On the private-vs-public side the request lifecycle enforces the ordering that most comparison pages get wrong: **classify sensitivity → apply residency constraint → then select model**. Three failure exits are drawn explicitly, including the one nobody draws — a fallback tier in another jurisdiction turning an outage procedure into a data-export procedure.

**Objection raised:** an earlier framing had residency as one of three interchangeable routing policies. That is wrong; residency is a constraint, not an optimisation. **→ fixed** — the reference-architecture readout now states that residency is evaluated first and the other two policies apply only to what survives it.

### FinOps lead
*Need: is every cost claim sourced or clearly parameterised, with no invented break-even?*

**Signed off, emphatically.** The self-host topology publishes **no** break-even figure and **no** GPU hourly rate. It ships a live calculator whose inputs default to placeholders the reader must replace — not to plausible-looking defaults that would read as our estimate — and shows its formula on screen.

**Reasoning, recorded because it will be questioned:** every break-even figure that could be sourced traces to a vendor-adjacent blog, and the single largest input — GPU $/hour — is *directly contradicted* across sources (2026 figures disagree on whether rentals rose or fell; quoted B200 rates span roughly a factor of two). A break-even computed on a disputed input is a number with a decimal point, not analysis. The page says so in the open.

**Objection raised:** most published TCO models omit platform-engineering cost entirely. **→ fixed** — it is an explicit input, labelled "the line most models omit". The standing caveat names utilisation as the variable that actually decides the trade and the one most often assumed rather than measured.

### Skeptical practitioner
*Need: does anything read as vendor marketing, or as a claim I can't check?*

**Signed off.** Every factual claim carries a source and a date. Five items surfaced repeatedly in research and were **excluded from page copy** because no primary source could be found — see Part 2, lens 2.

**Objection raised:** the harness page names Anthropic, Microsoft, OpenAI, LangChain, Vercel and HumanLayer, which risks reading as a vendor tour. **→ fixed** — the "3 of 5 layers" claim was rewritten from a single-vendor observation into a structural one about two independent platforms converging, with the analytically useful conclusion attached: *the durable developer surface has narrowed to L1 and L4.* That is a statement against interest for every platform named.

---

## Part 2 — Red-team ledger

Six hostile lenses, default-REJECTED refuter: a claim survives only if it can be positively verified. Findings are recorded with disposition.

### Lens 1 — Technical correctness of every diagram edge *(highest priority; the user's explicit bar was "no technical and flow errors")*

| # | Finding | Disposition |
|---|---|---|
| 1.1 | Does every labelled protocol artifact exist in the cited spec? | **VERIFIED.** All MCP artifacts (`Mcp-Method`, `Mcp-Name`, `ttlMs`, `cacheScope`, `resultType: "input_required"`, absence of `Mcp-Session-Id`) trace to the 2026-07-28 specification, which was checked against its primary source during research. |
| 1.2 | Does the legacy toggle actually model the pre-2026-07-28 world, or just relabel? | **VERIFIED.** Built file contains `initialize`/`initialized`, `Mcp-Session-Id`, and sticky/session-affinity nodes appearing only in legacy mode. |
| 1.3 | Does MRTR `input_required` **resume** the same call, or restart it? Drawing this wrong would teach the opposite of the spec. | **CONFIRMED CORRECT.** Both the L2 control flow and the L3 sequence return to the in-flight call, not to a new `tools/call`. This was called out explicitly in the build specs because it is the easy thing to get wrong. |
| 1.4 | Evidence chart mixed units on a single bar axis — `--w: 0.82` for "+13.7 percentage points" against `0.94` for "−80% of tools removed". Two incomparable quantities sharing one scale is a genuine correctness defect, not a cosmetic one. | **DEFECT — FIXED.** Restructured into three separately-scaled groups, each with its own axis and its unit stated in the group heading; every bar states its unit beside its number; `--w` fractions now match their values on a real 0–100% population scale. |
| 1.5 | Does the L1 build-vs-inherit mapping overstate what platforms provide? | **CORRECTED DURING BUILD.** Background subagents are explicitly **not** GA in the Microsoft Agent Framework Harness, so `Background subagent pool` remains "you build" under that platform. Inherit counts: self-hosted 0/25, Anthropic 12/25, Microsoft 9/25. |
| 1.6 | Do all icon references resolve? A missing icon fails silently and leaves an empty slot. | **VERIFIED.** 158 references across 13 files, zero missing. |
| 1.7 | Does any inline script fail to parse? | **VERIFIED.** All 15 inline script blocks across 13 files pass `node --check`. Zero failures. |
| 1.8 | Request-lifecycle ordering — is sensitivity classified before model selection? | **VERIFIED.** Classification is step 2, residency filtering step 3, model tier selection step 6. Reversing these would make the residency decision by accident, which the diagram annotates in place. |

### Lens 2 — Sourcing

| # | Finding | Disposition |
|---|---|---|
| 2.1 | Five widely-repeated harness claims could not be traced to a primary source: "the new rules of context engineering for Claude 5"; "80% of Claude Code's system prompt cut with no measurable loss"; "building verification loops with skills"; Terminal-Bench 3.0 leaderboard numbers; an OpenAI sandbox-escape transparency report. | **EXCLUDED from page copy.** The Anthropic engineering index shows nothing on the claimed path and the URL 404s; tbench.ai still lists 2.1 as current. High-traffic SEO repetition is not a source. |
| 2.2 | Two commonly-cited sources are misdated across the web in ways that would make this page look current when it isn't. | **CORRECTED IN COPY.** Anthropic's *Effective harnesses for long-running agents* is **2025-11-26**, not recent; LangChain Open SWE is **2026-03-17**, not July. Both now carry their true dates, with a note that the harness recipe predates million-token context and native background subagents. |
| 2.3 | Private-vs-public evidence is largely trade press and aggregators rather than vendor primary pages. | **DISCLOSED, NOT HIDDEN.** Leg 6 states this in the open and instructs re-verification against vendor release notes before any client-facing commitment. |
| 2.4 | Unverifiable quantitative claims on the private side: all TCO break-evens, GPU $/hr as a constant, semantic-cache hit rates, gateway market shares, Qwen3.8-Max and DeepSeek V4-Pro specifics. | **EXPLICITLY NOT ASSERTED**, and listed as such in a "What we deliberately did not assert" section. Stating this is the point, not a disclaimer. |

### Lens 3 — Staleness

| # | Finding | Disposition |
|---|---|---|
| 3.1 | Model names and prices in this space move faster than the coverage of them. Anything here has a short half-life. | **FLAGGED IN COPY.** Every model, price and regulatory claim carries its date so the reader can judge age directly. |
| 3.2 | The MCP deprecation window (Roots, Sampling, Logging, HTTP+SSE) runs twelve months from 2026-07-28 — so those become *removals*, not deprecations, around July 2027. | **DATED IN COPY.** The vocabulary instrument marks all four with the window stated on the card back. |
| 3.3 | EU AI Act synthetic-content marking transition ends **2026-12-02** — roughly three months after publication. | **DATED IN COPY**, with the high-risk slippage to 2027-12-02 / 2028-08-02 stated alongside so the reader sees both directions of movement. |
| 3.4 | The capability-gap figure (60 vs 61) is a single snapshot of an oscillating series. | **FRAMED, NOT QUOTED BARE.** Copy states the 2026 pattern explicitly: open catches up, closed labs re-open the gap on release; and the 3-model average still favours closed by ~7.6 points. |

### Lens 4 — Vendor neutrality

| # | Finding | Disposition |
|---|---|---|
| 4.1 | Five of the six new harness sources are Anthropic, Microsoft or MCP, which could tilt a page that declares neutrality. | **MITIGATED.** The conclusion drawn from them is platform-adverse — what platforms *don't* cover, and that L1/L4 stay yours. The vendor-stance note now names Microsoft Agent Framework alongside the others. |
| 4.2 | Does the private-vs-public page favour a position on its own spectrum? | **NO.** The axis is explicitly ordered by custody, not by capability or cost, and the copy says so. Operating burden rises with custody and is shown as a meter, so position five is not presented as the enlightened choice. |

### Lens 5 — Framework inflation

| # | Finding | Disposition |
|---|---|---|
| 5.1 | The harness-config manifest is a genuinely new concern with no obvious home. Tempting to add a sixth layer. | **REFUSED.** It goes inside L4. The page states the reasoning in the open — "there is no sixth layer… layer inflation is how frameworks die". Five layers in, five layers out. |
| 5.2 | Does the refresh quietly add concepts without removing any? | **NO.** Four visuals were retired outright (`hero-equation`, `harness-explorer`, `run-trace`, `invest-first`) and the invest-first decision tree was *folded into* the L1 toggle rather than kept alongside it. Scene count held at 10 despite adding a scene. |

### Lens 6 — Accessibility and motion

| # | Finding | Disposition |
|---|---|---|
| 6.1 | Are all controls real buttons with correct state? | **VERIFIED.** `aria-pressed` / `aria-selected` present across all 13 visuals; no `div`-as-button. |
| 6.2 | Does any visual depend on animation to convey meaning? | **VERIFIED NO.** Every visual has a `prefers-reduced-motion: reduce` short-circuit that renders the scene complete and static. |
| 6.3 | Does any visual hard-code a colour, breaking theme response? | **VERIFIED NO.** Zero hard-coded hex across all 13 files, excluding the icon loader's required `#232f3e` → `currentColor` replacement. |
| 6.4 | Is IntersectionObserver gating safe without IO support? | **VERIFIED.** Every visual has a non-IO fallback that starts the scene immediately. |

---

## Part 3 — Defects found and fixed

1. **Component-family gap in both skins.** `tower` and `waybill` styled none of `signal-grid`, `reading-map`, `thesis-grid` or `action-grid`. Left alone, those would have fallen through to `global.css` and rendered in the default site palette inside a bespoke shell — two designs stacked. Fixed with a ~175-line addendum appended to `deep-dive-tower.css`, ported with full token remapping to `deep-dive-waybill.css`.
2. **Evidence-chart unit bug.** See lens 1.4.
3. **Embed-mode height lock defeating autosize.** `public/visuals/harness-engineering/_theme.css` sets `:root[data-embedded="true"] { height: 100%; overflow: hidden }`, which clips any content taller than the frame and defeats the `m2m:frame-size` contract. Every new and reworked harness visual overrides it locally. For the new `private-vs-public-ai` family the fix was made **at the theme level** instead, with a comment explaining why.
4. **Text-led figures.** Ten visuals contained zero flow-icon usage, zero `IntersectionObserver` and five `@keyframes` in 3,046 lines — a direct violation of the standing icon-led/animated/interactive rule. All ten are now icon-led with gated animation; two (`without-vs-with`, `decision-lanes`) were rebuilt from bullet lists into an interactive run replay and an attribute-driven classifier.
5. **Stale brief.** Eight load-bearing claims in `/briefs/private-ai-vs-public-ai` were factually wrong. Corrected in place, with a "What Changed Since This Was Written" section enumerating all eight and pointing at the new deep-dive.

---

## Part 4 — Judgment calls, flagged not resolved

These were decided deliberately. A reviewer may disagree; the reasoning is recorded so the disagreement can be had properly.

1. **`tower` over `waybill` for harness engineering.** Waybill's semantics are a linear custody chain, which would assert false linearity over a layered system with concurrent planes and a feedback loop. Tower's ops-room identity — who owns this, what is the state, what clock is running — maps onto the framework's owner / rate-of-change / coverage axes. `waybill` was then used for private-vs-public, where a custody chain is literally the subject.
2. **A companion deep-dive rather than promoting the brief.** The brief stays the one-screen executive entry point; the deep-dive carries the detail. Cost: two pages to keep in sync, and they can drift. Benefit: the 1,370 words of written analysis that the brief route never rendered finally land somewhere.
3. **A WORM audit-store node added to the private reference architecture.** Not in the original spec; added so the `request record (hash, model, policy decision)` edge has a real destination rather than an arrow into nothing.
4. **Narrow-layout perimeter degradation.** Below 760px the private reference architecture's notched perimeter becomes three dashed regions, because the stacked order makes a single notch geometrically impossible. The two managed backends stay outside the perimeter in both layouts, so the security claim survives the reflow.
5. **No break-even number.** See the FinOps sign-off. This will be the most-questioned decision on the page and the reasoning is stated on the page itself, not just here.
6. **The `_theme.css` embed lock is fixed per-file for the harness family, not at the theme level.** Changing it family-wide would alter the layout of visuals not in scope for this refresh. The latent clipping risk for the rest of that family is real and is recommended as a follow-up.

---

## Part 5 — Verification evidence

All figures below are from the final run, after every visual landed.

| Check | Result |
|---|---|
| `npm run build` | **Pass** — 25 pages, both new routes generated |
| Page render, 4 routes over HTTP | **200** on all four; `dd-tower` and `dd-waybill` shells applied; spine + `frame-autosize.js` injected on both deep dives |
| Figure claim lines | 10/10 on harness, 4/4 on private |
| Reading-map anchors resolve to real heading ids | **16/16**, zero broken (the slug gotcha is clear) |
| Inline JS syntax (`node --check`) | **16/16 blocks pass**, zero failures |
| Visuals served standalone | **14/14 → 200** |
| Icon references resolve | **102/102**, zero missing |
| Hard-coded hex | **Zero** across all 14 files |
| Autosize sender present | 14/14 |
| Reduced-motion short-circuit | 14/14 |
| Present-deck slide references | 10/10 resolve |
| Dangling references to retired visuals | **Zero** — all four deleted, stale header comments corrected |
| Windows copy-duplicate sweep | Clean |

### Browser-verified

`governed-run-controlflow.html` — the largest of the new instruments — was verified in a live browser during its build: **33 nodes / 41 edges with zero node overlaps and zero edge-through-node collisions**, all 33 icons loading, no console errors, no horizontal overflow at either 320px (narrow single-column layout engages) or 1280px, and the transport controls plus all three scenario toggles driving the readout correctly.

### Not yet verified — recommended before publishing

In-app browser navigation was blocked for the main session, so the remaining thirteen visuals were verified over HTTP plus static analysis. That is strong on wiring, syntax, references and theming discipline, but the following still want a human eye or a Playwright pass:

- Visual layout at 375px and across the 760px breakpoint; the 313px in-iframe width trap; the hidden-popup `scrollWidth` trap.
- Live theme relay into iframes when the host page toggles light/dark.
- Settled autosize heights — that no frame shows blank space at the bottom once `m2m:frame-size` arrives.
- Keyboard tab order and focus-visible rings through each visual's controls.
- The `--vf-h` fallback heights in both markdown files were authored from the specs, not measured. Autosize corrects them at runtime; they only govern the moment before the first size message.

### Known, out of scope

- `public/visuals/ai-ops-execution-layer/_theme.css` and `public/visuals/microservices-vs-modular-monolith/_theme.css` carry a copy-pasted comment referencing visuals that never belonged to those families. Cosmetic, pre-existing, untouched.
- The embed-mode height lock (Part 3, item 3) is fixed per-file for the harness family rather than at the theme level, because changing it family-wide would move the layout of visuals outside this refresh. The latent clipping risk for any *other* harness-family visual is real and is the recommended follow-up.
