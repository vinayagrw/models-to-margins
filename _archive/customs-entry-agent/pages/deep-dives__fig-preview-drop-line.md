---
title: "Figure Preview — The Drop Line"
summary: "A harness page, not an article. It exists so the drop-line figure can be verified inside a real .visual-frame with the real autosize and theme relay, rather than only as a standalone file."
pubDate: 2026-08-21
geography: "North America"
horizon: "Now"
readTime: "1 min"
audience: "Nobody. This page is a test harness."
template: "atlas"
listed: false
featured: false
tags: ["harness"]
bpEyebrow: "HARNESS"
bpTitle: "Figure Preview — The Drop Line"
bpSubtitle: "// Not an article. A frame to verify a figure in."
bpCoords: ["Harness", "Not listed", "Delete after placement"]
---

This page exists to exercise the `.visual-frame` contract. It is not listed, not in the feed, and carries no argument.

The figure below fuses the custody chain and the state board onto one time axis. Three things are being verified here that a standalone file cannot show: that the frame collapses to the figure's reported height rather than leaving a band of empty frame, that the site theme toggle reaches the iframe, and that the figure survives the 760px axis rotation inside a frame rather than inside a bare viewport.

<div class="visual-frame" data-fig="The drop line" style="--vf-h:920px; --vf-h-m:1820px">
  <iframe
    src="/visuals/drop-line/drop-line.html?embed=1"
    title="An interactive diagram of one illustrative consignment of powered hand tools from Guadalajara to Chicago, drawn on a single time axis. The top register is the custody chain, five parties from shipper through origin carrier, customs broker and the border to the consignee. The middle register is what fell out of each handoff, one card per dropped state, each carrying the party who owns it and the clock already running against it. Four of the five read owner nobody. A sixth card sits outside the chain because duty exposure is not a handoff failure. The lower register is the two places the losses surface as cost, the border hold and the landed cost. Curved arcs run from each dropped state forward to the place it bills, and they converge: four of the six land on the border hold and two on the landed cost. Selecting any card dims the other arcs and opens a plate giving what that party knew, what it could not pass on, who should have owned it, where it surfaces as cost with any sourced figure graded, and the control that would close it."
    loading="lazy"
    sandbox="allow-scripts allow-same-origin"
  ></iframe>
</div>

## Chapter 1 — What this harness checks

Autosize is opt-in and the figure opts in, so the authored `--vf-h` above should be overridden by the reported content height within a frame or two of load. If the frame stays at 920px on desktop, the postMessage is not arriving.

The theme relay is pushed by the waybill spine script into every `.visual-frame iframe` on load and on every toggle. Flipping the site theme should repaint the figure without a reload.
