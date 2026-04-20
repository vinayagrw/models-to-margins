# Brief Visual Prompt Pack

Use this guide when you want a coding model to generate a Models to Margins style animated brief visual like the procurement command center or the private AI control-plane diagram.

The goal is not "make me a pretty diagram." The goal is "build a business-first operating map that reads clearly in one pass, stays useful without interaction, and becomes more precise when the user hovers or clicks."

## Best Fit

Use this prompt pack for:

- custom HTML/SVG brief visuals
- left-to-right operating maps
- control-plane diagrams with explicit routing
- premium editorial visuals with subtle animation
- embeddable assets that should work with `?embed=1`

Do not use this prompt pack for:

- static image-only posters
- generic flowcharts with little narrative structure
- dense infrastructure topology maps
- abstract hero art with no operating logic

## Prompt Interface

Fill these placeholders before sending the prompt:

| Placeholder | What to provide |
|---|---|
| `[TOPIC]` | The business topic or operating problem |
| `[MODE]` | `operating-map` or `router-split` |
| `[LEFT_ZONE]` | Business pressure, fragmented inputs, or entry layer |
| `[CENTER_ZONE]` | Governed architecture, orchestration, or control logic |
| `[RIGHT_ZONE]` | ROI outcomes, destination branches, or measurable decisions |
| `[TITLE]` | Primary visual title |
| `[SUBTITLE]` | One-line framing statement under the title |

## Reusable Prompt

Copy this prompt as the starting point:

```text
Create a premium standalone HTML/SVG brief visual for [TOPIC].

The visual should feel like a Models to Margins style operating map: strategic, elegant, business-first, and interactive, not like a generic SaaS flowchart. Use a wide left-to-right composition with strong visual hierarchy, rounded nodes, curved connector lines, glassy panels, soft glows, subtle gradients, and sharp typography.

Narrative structure:
- Left zone: [LEFT_ZONE]
- Center zone: [CENTER_ZONE]
- Right zone: [RIGHT_ZONE]

If [MODE] = operating-map:
Show business pain or fragmented inputs entering from the left, passing through a governed architecture in the center, and resolving into measurable business outcomes on the right.

If [MODE] = router-split:
Show a control-plane flow moving left to right, then split explicitly into two branches on the right. Keep routing logic visually obvious and directional.

Design language:
- Premium editorial feel, not cartoonish
- Space Grotesk + Syne + DM Sans or a very close equivalent
- Light/dark theme aware
- Cyan, teal, violet, gold, and warm accent signals used intentionally by layer
- Clean SVG geometry, not messy icon collage
- Subtle animated halo glows, pulse dots, path shimmer, and staggered reveal on load
- Motion should support comprehension, never become noisy

Interaction requirements:
- Hover or click any node/chip to highlight its exact connected path
- Include a focus bar with a short explanation for the active node
- Include stage chips or summary chips above or around the visual
- Include zoom controls: -, +, Reset
- Support wheel zoom and click-drag pan when zoomed
- Add ?embed=1 mode that hides standalone chrome
- Keep the diagram fully understandable even with no interaction

Content rules:
- Use concise business language in every node
- Prefer operating layers, governance, routing, retrieval, tools, ROI, and decision logic over technical clutter
- Show causality clearly
- Avoid vague labels like "AI magic" or "optimization engine"
- Avoid generic stock icons, 3D blobs, particle backgrounds, and overdesigned neon effects

Deliverable:
Return one self-contained HTML file with inline CSS and JS, accessible SVG labels, polished layout, and production-quality visual polish.

Use this title and subtitle:
- Title: [TITLE]
- Subtitle: [SUBTITLE]
```

## Ready-To-Use Variants

### Operating-Map Template

Use this when the visual should tell a story from business pain to governed system to business value:

```text
Create a premium standalone HTML/SVG brief visual for [TOPIC].

Build it as an operating-map, not a generic flowchart.

The composition should move left to right across three clearly legible zones:
- business pressure and fragmented inputs
- governed architecture and workflow logic
- measurable business outcomes

Make the visual feel like an executive-ready command center:
- crisp title block
- subtle legend
- focus bar
- stage chips
- curved pathing with category-based color signals
- polished light/dark theme

Show how each left-side pain point feeds into one or more operating layers, and how those layers translate into specific outcomes on the right.

The visual must stay readable before interaction. Interaction should sharpen understanding rather than reveal hidden meaning.

Use this topic framing:
- Topic: [TOPIC]
- Left zone: [LEFT_ZONE]
- Center zone: [CENTER_ZONE]
- Right zone: [RIGHT_ZONE]
- Title: [TITLE]
- Subtitle: [SUBTITLE]
```

### Router-Split Template

Use this when the visual should show one control plane routing into two or more downstream paths:

```text
Create a premium standalone HTML/SVG brief visual for [TOPIC].

Build it as a router-split control-plane diagram with a clear left-to-right operating flow.

The composition should show:
- entry and policy on the left
- control, retrieval, tools, and routing in the middle
- an explicit branch split on the right

The route split must be unmistakable. One branch should read as path A, the other as path B, with routing logic visually encoded in the center rather than buried in copy.

Add subtle motion:
- halo glow on important nodes
- pulse dots on downstream endpoints
- gentle path shimmer or staged reveal

Keep the aesthetic premium and editorial:
- clean SVG geometry
- restrained neon accents
- dark/light theme support
- interactive focus states
- zoom and pan controls

Use this topic framing:
- Topic: [TOPIC]
- Left zone: [LEFT_ZONE]
- Center zone: [CENTER_ZONE]
- Right zone: [RIGHT_ZONE]
- Title: [TITLE]
- Subtitle: [SUBTITLE]
```

### Story-Map / Workshop-Atlas HTML Template

Use this when the deliverable should be a premium multi-chapter HTML story map rather than a single brief visual:

- for pictorial-first scrollytelling pages
- for workshop/executive explainers that need both narrative and interaction
- for story-led operating maps where the diagram owns the canvas and detail sharpens on click

Use this placeholder set:

- `[TOPIC]`
- `[AUDIENCE]`
- `[THESIS]`
- `[LAYMAN_METAPHOR]`
- `[CHAPTER_2_FOCUS]`
- `[CHAPTER_3_FOCUS]`
- `[RUN_TRACE_TASK]`
- `[BOUNDARY_MODEL]`
- `[OPTIONAL_SIGNAL_LAYER]`
- `[TITLE]`
- `[SUBTITLE]`

```text
Create a premium standalone HTML story map for [TOPIC].

Build it as a pictorial-first, chaptered scrollytelling page for [AUDIENCE], not as a static poster and not as a generic product site.

The page should feel like a Models to Margins style workshop atlas:
- strategic, elegant, business-first
- diagram-led before text-led
- interactive, but fully understandable with no interaction
- premium editorial motion, never noisy motion

Core framing:
- Thesis: [THESIS]
- Layman metaphor: [LAYMAN_METAPHOR]
- Title: [TITLE]
- Subtitle: [SUBTITLE]

Output requirements:
- return one self-contained HTML file with inline CSS and JS
- use a compact sticky chapter rail, not a large sticky overlay
- include a collapsible explorer tray for dense filters and drill-downs
- support `?embed=1` mode that hides standalone-only chrome
- keep the page understandable even if interaction, animation, or web fonts fail

Narrative structure:

Chapter 1 - Layman thesis layer
- Build a switchable layman layer with 3 views:
  - Executive Diagram
  - Workshop Analogy
  - Premium Visual
- Make the model read as the brain and the harness read as the operating system around it
- Keep this chapter simple enough for an executive to understand in seconds

Chapter 2 - Architecture
- Focus: [CHAPTER_2_FOCUS]
- Make the control loop the heartbeat
- Show the surrounding harness components as trust systems around the loop
- Keep the main diagram full-width with short support bands below it

Chapter 3 - Translation
- Focus: [CHAPTER_3_FOCUS]
- Show how harness components translate into enterprise beats, personas, and control-plane capability
- Keep the bridge visually dense and operational, not abstract

Chapter 4 - Run trace
- Use this concrete task trace: [RUN_TRACE_TASK]
- Build a full-width 3-act run:
  - prepare
  - execute
  - govern
- Make checkpoints, retries, evidence, and human handoff explicit

Chapter 5 - Boundary
- Use this decision model: [BOUNDARY_MODEL]
- The boundary must read as operating choice, not as “AI or no AI”
- Show where agentic work fits, where deterministic controls fit, and where human authority must remain explicit

Optional Chapter 6 - Signals
- Add only if useful: [OPTIONAL_SIGNAL_LAYER]
- Use source-linked cards to show what changed recently and what the page should capture because of it

Design language:
- premium editorial feel, not cartoonish
- full-width diagram stages with support bands below
- strong visual hierarchy, rounded surfaces, curved connectors, soft glows, restrained gradients, sharp typography
- Space Grotesk + Syne + DM Sans or a very close equivalent
- light/dark theme aware
- cyan, teal, violet, gold, and warm accents used intentionally by operating layer
- subtle glow sweeps, staged reveal, and calm emphasis motion only where it improves comprehension

Critical layout rules:
- HTML-first layout, not a fixed SVG poster
- all readable text must live in normal HTML/CSS containers
- use SVG only for decorative geometry, connectors, halos, backgrounds, and glow effects
- do not use `foreignObject`
- do not place paragraph text, cards, or labels with fixed SVG x/y positioning
- do not use fixed-height text boxes for variable copy
- do not keep left/right side text columns competing with the main visual
- every card, rail, chip group, panel, and support band must expand naturally with content
- use CSS grid/flex, wrapping chips, and `min-height` only where necessary
- keep inactive content readable; never dim the page into illegibility

Anti-overlap rules:
- no text clipping in headers, chips, cards, rails, inspectors, or labels
- no connector or glow layer may obscure readable text
- if content gets dense, move detail into a secondary drawer or inspector instead of shrinking type
- the layout must remain readable with fallback fonts, browser zoom, and print/PDF output

Interaction requirements:
- hover or click any relevant node, card, chip, step, or lane to highlight its exact connected meaning
- include a focus panel or active-lens surface with a short explanation for the current selection
- keep explorer controls secondary; the main chapters must feel complete without opening the explorer
- support URL state where useful:
  - chapter
  - active lens / focus
  - local chapter view state

Validation requirements:
- test the finished page in a real browser, not only by reading source
- capture screenshots at multiple widths, including desktop and mobile
- verify there is no oversized sticky overlay, no dead canvas, and no overlap in diagrams or support bands
- make sure the page still reads clearly as a static poster when the user does not interact
```

## Filled Examples

### Procurement-Style Example

```text
Create a premium standalone HTML/SVG brief visual for governed procurement AI.

The visual should feel like a Models to Margins style operating map: strategic, elegant, business-first, and interactive, not like a generic SaaS flowchart. Use a wide left-to-right composition with strong visual hierarchy, rounded nodes, curved connector lines, glassy panels, soft glows, subtle gradients, and sharp typography.

Narrative structure:
- Left zone: fragmented procurement pain, system sprawl, policy drift, delayed savings
- Center zone: governed architecture for data unification, intelligence, orchestration, governance, and buyer workflows
- Right zone: ROI outcomes such as cycle-time reduction, admin lift, throughput, policy alignment, and savings confidence

If mode = operating-map:
Show business pain entering from the left, passing through a governed procurement architecture in the center, and resolving into measurable business outcomes on the right.

Design language:
- Premium editorial feel, not cartoonish
- Space Grotesk + Syne + DM Sans or a very close equivalent
- Light/dark theme aware
- Cyan for system flow, red for problem pressure, gold for ROI outcomes
- Clean SVG geometry, not messy icon collage
- Subtle animated halo glows, path shimmer, and staggered reveal on load
- Motion should support comprehension, never become noisy

Interaction requirements:
- Hover or click any node or chip to highlight its exact connected path
- Include a focus bar with a short explanation for the active node
- Include stage chips above the visual
- Include zoom controls: -, +, Reset
- Support wheel zoom and click-drag pan when zoomed
- Add ?embed=1 mode that hides standalone chrome
- Keep the diagram fully understandable even with no interaction

Use this title and subtitle:
- Title: Procurement AI Command Center
- Subtitle: From fragmented source systems to governed execution and measurable value capture.
```

### Private-AI-Style Example

```text
Create a premium standalone HTML/SVG brief visual for private AI versus public AI architecture.

The visual should feel like a Models to Margins style operating map: strategic, elegant, business-first, and interactive, not like a generic SaaS flowchart. Use a wide left-to-right composition with strong visual hierarchy, rounded nodes, curved connector lines, glassy panels, soft glows, subtle gradients, and sharp typography.

Narrative structure:
- Left zone: users, apps, entry policy, sensitive business constraints
- Center zone: control plane, retrieval, tools, observability, and routing logic
- Right zone: split destinations for private inference and premium managed inference

If mode = router-split:
Show a control-plane flow moving left to right, then split explicitly into two branches on the right. Keep routing logic visually obvious and directional.

Design language:
- Premium editorial feel, not cartoonish
- Space Grotesk + Syne + DM Sans or a very close equivalent
- Light/dark theme aware
- Cyan, blue, green, violet, and orange layer signals
- Clean SVG geometry, not messy icon collage
- Subtle animated halo glows, pulse dots on downstream endpoints, and staged reveal
- Motion should support comprehension, never become noisy

Interaction requirements:
- Hover or click any node/chip to highlight its exact connected path
- Include a focus bar with a short explanation for the active node
- Include stage chips or route chips around the visual
- Include zoom controls: -, +, Reset
- Support wheel zoom and click-drag pan when zoomed
- Add ?embed=1 mode that hides standalone chrome
- Keep the diagram fully understandable even with no interaction

Use this title and subtitle:
- Title: Private AI Control Plane
- Subtitle: Open models as controllable infrastructure. Closed models as premium managed services.
```

### Harness-Story-Map Example

```text
Create a premium standalone HTML story map for AI-led SDLC harness engineering.

Build it as a pictorial-first, chaptered scrollytelling page for enterprise AI, architecture, product, engineering, QA, security, and platform leaders, not as a static poster and not as a generic product site.

The page should feel like a Models to Margins style workshop atlas:
- strategic, elegant, business-first
- diagram-led before text-led
- interactive, but fully understandable with no interaction
- premium editorial motion, never noisy motion

Core framing:
- Thesis: stronger prompts are not enough; the missing operating layer is harness engineering
- Layman metaphor: the model is the brain, and the harness is the steering, brakes, memory, tools, guardrails, and review loop around it
- Title: AI-Led SDLC Harness Story Map
- Subtitle: From model capability to governed delivery, evidence, and human authority.

Output requirements:
- return one self-contained HTML file with inline CSS and JS
- use a compact sticky chapter rail, not a large sticky overlay
- include a collapsible explorer tray for dense filters and drill-downs
- support `?embed=1` mode that hides standalone-only chrome
- keep the page understandable even if interaction, animation, or web fonts fail

Narrative structure:

Chapter 1 - Layman thesis layer
- Build a switchable layman layer with 3 views:
  - Executive Diagram
  - Workshop Analogy
  - Premium Visual
- Make the model read as the brain and the harness read as the operating system around it
- Keep this chapter simple enough for an executive to understand in seconds

Chapter 2 - Architecture
- Focus: the control loop is the heartbeat; the surrounding harness components are the trust systems that make the loop trustworthy
- Make the control loop the heartbeat
- Show the surrounding harness components as trust systems around the loop
- Keep the main diagram full-width with short support bands below it

Chapter 3 - Translation
- Focus: show how the literal harness becomes enterprise AI-led SDLC through enterprise beats, personas, evidence rails, and control-plane visibility
- Show how harness components translate into enterprise beats, personas, and control-plane capability
- Keep the bridge visually dense and operational, not abstract

Chapter 4 - Run trace
- Use this concrete task trace: a governed release-readiness / evidence-pack flow for an enterprise service change
- Build a full-width 3-act run:
  - prepare
  - execute
  - govern
- Make checkpoints, retries, evidence, and human handoff explicit

Chapter 5 - Boundary
- Use this decision model: agentic vs deterministic vs human authority
- The boundary must read as operating choice, not as “AI or no AI”
- Show where agentic work fits, where deterministic controls fit, and where human authority must remain explicit

Optional Chapter 6 - Signals
- Add only if useful: recent top-company harness, observability, control-plane, and evaluation signals with source-linked cards
- Use source-linked cards to show what changed recently and what the page should capture because of it

Design language:
- premium editorial feel, not cartoonish
- full-width diagram stages with support bands below
- strong visual hierarchy, rounded surfaces, curved connectors, soft glows, restrained gradients, sharp typography
- Space Grotesk + Syne + DM Sans or a very close equivalent
- light/dark theme aware
- cyan, teal, violet, gold, and warm accents used intentionally by operating layer
- subtle glow sweeps, staged reveal, and calm emphasis motion only where it improves comprehension

Critical layout rules:
- HTML-first layout, not a fixed SVG poster
- all readable text must live in normal HTML/CSS containers
- use SVG only for decorative geometry, connectors, halos, backgrounds, and glow effects
- do not use `foreignObject`
- do not place paragraph text, cards, or labels with fixed SVG x/y positioning
- do not use fixed-height text boxes for variable copy
- do not keep left/right side text columns competing with the main visual
- every card, rail, chip group, panel, and support band must expand naturally with content
- use CSS grid/flex, wrapping chips, and `min-height` only where necessary
- keep inactive content readable; never dim the page into illegibility

Anti-overlap rules:
- no text clipping in headers, chips, cards, rails, inspectors, or labels
- no connector or glow layer may obscure readable text
- if content gets dense, move detail into a secondary drawer or inspector instead of shrinking type
- the layout must remain readable with fallback fonts, browser zoom, and print/PDF output

Interaction requirements:
- hover or click any relevant node, card, chip, step, or lane to highlight its exact connected meaning
- include a focus panel or active-lens surface with a short explanation for the current selection
- keep explorer controls secondary; the main chapters must feel complete without opening the explorer
- support URL state where useful:
  - chapter
  - active lens / focus
  - local chapter view state

Validation requirements:
- test the finished page in a real browser, not only by reading source
- capture screenshots at multiple widths, including desktop and mobile
- verify there is no oversized sticky overlay, no dead canvas, and no overlap in diagrams or support bands
- make sure the page still reads clearly as a static poster when the user does not interact
```

## Quality Check

Before using the output, verify:

- it reads as a three-zone business story
- node labels are concise and business-legible
- hover and click highlight only the relevant path
- the focus bar updates with the active node
- zoom, pan, and reset work
- `?embed=1` hides standalone-only chrome
- the visual still makes sense as a static poster
- animation stays subtle and never competes with the information

## Small Upgrades That Usually Help

If the first output is close but still generic, append one or more of these lines:

- "Make the visual feel more editorial and less product-marketing."
- "Reduce decorative effects and increase causal clarity."
- "Tighten the node copy so each label reads in one quick scan."
- "Make the central route logic more visually dominant."
- "Use color to separate problem pressure, governed flow, and business value."
- "Keep the interaction model simple and precise rather than flashy."


```text
Create a premium, responsive visual, but treat layout stability as a hard requirement.

Critical anti-overlap rules:
- Build this as an HTML-first layout, not a fixed SVG poster.
- All readable text must live in normal HTML/CSS containers.
- Use SVG only for decorative geometry, connectors, halos, backgrounds, and non-critical visual effects.
- Do not place paragraph text, labels, or cards using fixed SVG x/y text positioning.
- Do not use foreignObject for main content.
- Do not use character-count wrapping heuristics.
- Do not hard-code card heights for variable text.
- Use CSS grid/flex for layout and let text wrap naturally.
- Every card, panel, chip group, and rail must expand vertically with content.
- Use min-height, not fixed height, for text-bearing components.
- Use flex-wrap or grid-wrap for pills, chips, and tags.
- Prevent text clipping, collision, and overflow at common desktop widths and narrower responsive breakpoints.
- Keep inactive content readable; never dim non-selected content so much that the page becomes unreadable.
- If content is too dense, move detail into a secondary panel instead of shrinking text or stacking content into fixed boxes.
- The page must remain readable if web fonts fail and system fallback fonts are used.
- The layout must work in light mode, dark mode, and browser zoom levels around 90% to 125%.
- In print/PDF mode, readable content must remain visible and correctly wrapped.

Validation requirements:
- No overlapping text in headers, cards, rails, pills, panels, or labels.
- No collisions between title, body copy, and chip rows.
- No text rendered outside the visible canvas.
- No connector or glow layer may cover or obscure readable text.
- Test with longer copy, font fallback, and narrower widths before finalizing.

Implementation preference:
- Prefer a hybrid architecture:
  - HTML/CSS for all text and content layout
  - SVG/canvas only for visual underlay and connectors

If any section risks overlap, redesign the composition instead of squeezing the text.
```

```text
Create a premium standalone HTML/SVG brief visual for [TOPIC].

The visual should feel like a Models to Margins style operating map: strategic, elegant, business-first, and interactive, not like a generic SaaS flowchart. Use a wide left-to-right composition with strong visual hierarchy, rounded nodes, curved connector lines, glassy panels, soft glows, subtle gradients, and sharp typography.

Narrative structure:

Left zone: [LEFT_ZONE]
Center zone: [CENTER_ZONE]
Right zone: [RIGHT_ZONE]
If [MODE] = operating-map:
Show business pain or fragmented inputs entering from the left, passing through a governed architecture in the center, and resolving into measurable business outcomes on the right.

If [MODE] = router-split:
Show a control-plane flow moving left to right, then split explicitly into two branches on the right. Keep routing logic visually obvious and directional.

Design language:

Premium editorial feel, not cartoonish
Space Grotesk + Syne + DM Sans or a very close equivalent
Light/dark theme aware
Cyan, teal, violet, gold, and warm accent signals used intentionally by layer
Clean SVG geometry, not messy icon collage
Subtle animated halo glows, pulse dots, path shimmer, and staggered reveal on load
Motion should support comprehension, never become noisy
Text layout and overflow safety:

All text must stay fully inside its own box, badge, chip, panel, or SVG node at every supported screen size
Never place body text using a fixed bottom baseline that can collide with the title above it
Measure text and wrap by available rendered width, not only by rough character count
Use consistent text-fit tiers across the whole visual:
standard size first
one smaller compact size only when needed
If text still does not fit after compact size, increase the height of that box in fixed steps rather than shrinking text endlessly
Add clear empty space between:
label and title
bold title and body text
zone descriptions and any badges or chips below them
If a title wraps to multiple lines, automatically add more vertical space before the body text starts
Reflow nearby nodes, cards, and connectors when a box grows taller so nothing overlaps below it
Keep typography consistent across similar elements; avoid random one-off font sizes
In SVG zones and top summary bands, reserve separate vertical lanes for:
zone title
zone description
badges or branch labels
In ?embed=1 mode, switch to an embed-safe layout:
remove sticky summary behavior if it risks overlap
stack dense grids earlier
wrap headers and controls cleanly
reduce minimum canvas height when needed
Make layout decisions based on container width, not only viewport width, so embedded visuals do not break inside narrow containers on wide screens
Use container-aware or equivalent responsive logic so chips, scorecards, headers, and detail panels collapse before text collisions happen
Long pills, badges, and chip labels must be allowed to wrap instead of overflowing or covering nearby text
The diagram must remain clean and readable in both standalone and embed mode with no text clipping, no text collisions, and no text outside borders
Interaction requirements:

Hover or click any node/chip to highlight its exact connected path
Include a focus bar with a short explanation for the active node
Include stage chips or summary chips above or around the visual
Include zoom controls: -, +, Reset
Support wheel zoom and click-drag pan when zoomed
Add ?embed=1 mode that hides standalone chrome
Keep the diagram fully understandable even with no interaction
Content rules:

Use concise business language in every node
Prefer operating layers, governance, routing, retrieval, tools, ROI, and decision logic over technical clutter
Show causality clearly
Avoid vague labels like "AI magic" or "optimization engine"
Avoid generic stock icons, 3D blobs, particle backgrounds, and overdesigned neon effects
Prefer concise labels, but never rely on short copy alone; the layout must still safely handle longer titles and descriptions.
Deliverable:
Return one self-contained HTML file with inline CSS and JS, accessible SVG labels, polished layout, and production-quality visual polish. The HTML/SVG must include built-in safeguards against text overlap, text clipping, and overflow in nodes, badges, summary cards, and embed layouts.

Use this title and subtitle:

Title: [TITLE]
Subtitle: [SUBTITLE]
```
