# Models to Margins — Site Experience Design

Design cycle 2026-08. Covers Track 2 (the reading experience of
`/deep-dives/customs-entry-agent`) and Track 3 (site-wide experience). Track 1
(the customs review desk console) and the new-page spec are documented
separately; this is the lighter shared doc for the reading-surface and
site-substrate tracks.

## Track 2 — the reading experience of the flagship deep-dive

### Findings

The atlas page passes as a document. Structure, headings, landmarks and iframe
titles already pass (a11y-audit finding 7) and there is no horizontal overflow
at any tested width (track2-atlas-audit finding 10). It fails as an
instrument: the rail lies about the reader's position (atlas-audit 0, 1),
hides three quarters of itself at the commonest desktop width (atlas-audit 2),
is unreadable in light theme (a11y-audit 3), and a full scroll costs 244
requests to walk (atlas-audit 4).

### Concluded direction

**Fix the instrument, do not redesign the document.** Four defects meet all
four gating conditions (low risk, no content loss, browser-verifiable, no new
interaction surface) and ship this cycle:

1. **The rail tells the truth or it goes away.** Three competing offsets
   decide which chapter is "active" in `public/scripts/spine-atlas.js` — an
   IntersectionObserver `rootMargin`, an `innerHeight * 0.28` election line,
   and the anchors' own `scroll-margin-top: 152px`. Collapse all three to the
   anchors' 152px. No new rail chrome, no progress bar, no back-to-top this
   cycle.
2. **Contrast and focus are not polish.** The rail's inactive links measure
   4.21:1 in light theme (fails WCAG 1.4.3) and all 15 figure iframes are tab
   stops with no focus indicator. Both ship.
3. **Wide mode widens the figures, not the sentences.** At 1700px the shell
   grows to 1,672px and body prose runs to ~130 characters, well past the
   45-90 character measure. Inside the existing `@media (min-width: 1640px)`
   block, prose stays at `--at-prose` and `.visual-frame` gets the full-shell
   breakout instead.

### Gap-closing revisions (W4)

No defect in the four IMPLEMENT items themselves was found. Team B found gaps
in how they get verified, closed as binding verification requirements rather
than code changes:

- IMPL-3 (iframe focus-visible) and IMPL-6 (reduced-motion) are both
  site-wide edits Track 2's own risk register admits were never walked
  against the six bespoke brief pages. A verification pass on one non-atlas
  bespoke route, in both themes and with reduced motion emulated, is now
  binding before either item is marked done.
- IMPL-7 bundles two logically separate colour fixes (rail contrast,
  `--accent-2`/`--accent-2-ink`) under one ID to fit the two-file cap. The
  bundling stays, but the two sub-changes must be verified and logged
  independently so a pass on one does not launder a regression in the other.
- The reduced-motion verification (C6) checks only rail-election correctness,
  not the full accessibility contract of `prefers-reduced-motion` (scroll
  target visibility, absence of animated jump, focus landing after the jump).
  Accepted as a documented follow-up check, not added as new scope.

### Critique (Team B, resolved)

- **C1** — reduced-motion verification scope gap. Accepted as a documented
  risk; the five-heading probe stays the primary regression check for the
  scroll-spy defect, a motion-experience-specific pass is named as the
  correct follow-up.
- **C2** — IMPL-7's bundled colour fixes defeat the two-file cap's
  blast-radius intent. Accepted as a documented risk; fixed via independent
  verification and logging of the two sub-changes.
- **C3** — no verification step walks a non-atlas bespoke page for the two
  site-wide visual changes. Accepted as a documented risk; added to the
  binding verification checklist above.

Nothing in gap-close changes T2-D1 through T2-D4 as scoped.

## Track 3 — site-wide experience

### Findings

Nothing on the site is runtime-broken: zero console errors, zero failed
requests across all 24 real routes (track3-site-audit finding 15). Every
defect is a completeness gap, ranked by reader harm:

- **Tier 1 — the reader cannot read.** `.article-body :not(pre > code)`
  matches every descendant of `.article-body`, not code spans, so on three
  default-template deep-dives every paragraph renders as 13.5px bordered
  monospace, compounding with nesting depth (a11y-audit 1).
- **Tier 2 — the reader is stranded.** No themed 404 (Astro's dev error page
  instead), a linkless footer on all 26 measurements, and a dead "About" nav
  pill carrying a meaningless `aria-disabled`.
- **Tier 3 — the reader is misled or excluded.** 48 tag chips that look like
  links and are not, 15 keyboard-inaccessible iframes, zero
  `prefers-reduced-motion` support against a globally forced smooth scroll,
  and light-theme contrast failures where compliant `-ink` token siblings
  already exist and simply are not used.
- **Tier 4 — the reader is inconvenienced.** Mobile overflow on two routes,
  two routes that bypass `BaseLayout` entirely, no print styles, no RSS,
  render-blocking fonts on bespoke routes, ragged home grid.

### Concluded direction

**Repair the reading substrate and close the exits — not a redesign, not a
feature programme.** Every Tier-1 and Tier-2 fix lands in
`src/styles/global.css` or `src/layouts/BaseLayout.astro`, so the fix is
cheap because the substrate is shared. The 404 routes through `BaseLayout`
rather than standing alone, so it inherits theming, chrome, skip link and
footer in one move. Tokens, not new colours: the rule this cycle establishes
is that `-ink` tokens are the only text-legal accents in light theme. Light
theme is the contrast harness going forward, since dark clears 6:1 on every
token measured and hides every defect.

### Gap-closing revisions (W4)

- **BIZ-1** (Track 3 holds 6 of 8 IMPLEMENT slots against Track 2's
  higher-ranked candidates) — re-derived independently in
  `verification-clusters.md` Cluster 2. IMPL-4 (tabindex) and IMPL-6
  (reduced-motion) both outrank Track 2's DOC-1 (wide-mode figures) on
  reader-impact-per-file. Cap allocation stands; DOC-1 is confirmed as the
  correct promote-on-next-freed-slot candidate.
- **BIZ-4** (the "delete the dead About span" line existed only as unrouted
  prose, never in `implement-list.json`, never red-teamed on its own) — now
  named explicitly as a user checkpoint decision rather than a call this
  cycle silently makes. Resolved this cycle: **leave it, no change.**
- **BIZ-5** (no diagnostic-only task to isolate the 900px mobile overflow
  before the next cycle) — named as a concrete next-cycle starting point, not
  fixed here; isolating the cause is legitimately out of this cycle's
  low-risk, evidence-first scope.

### Critique (Team B, resolved)

- **C1** — cap-allocation defensibility (BIZ-1). Closed by independent
  re-ranking; allocation unchanged, DOC-1's promotion path confirmed.
- **C2** — the About-span deletion recommendation lacked routing and
  red-team scrutiny of its own (BIZ-4). Closed by escalating it to an
  explicit user checkpoint rather than letting the direction file silently
  authorize it. Decision made this cycle: no change.
- **C3** — five lower-visibility fixes were slotted ahead of even a
  diagnostic pass on the 900px mobile overflow (BIZ-5). Accepted as a
  documented risk; a diagnostic-only task (no code change, outside the 8-cap)
  is named as the next-cycle starting point.

## Implemented this cycle

All nine items below were built and verified in this session. IMPL-9 (RSS)
was added after the user's live checkpoint decision to build the feed now
rather than leave it as a documented next step.

| # | Change | Files | Rationale | Verification |
|---|---|---|---|---|
| IMPL-1 | Fix monospace blast-radius selector (`code:not(pre > code)`) | `src/styles/global.css` | One selector restores already-written prose on 3 of 8 articles from unreadable 13.5px bordered monospace | _(placeholder — fill in during W7)_ |
| IMPL-2 | Collapse atlas scroll-spy's three competing offsets to one (152px) | `public/scripts/spine-atlas.js` | Rail was electing the wrong chapter and lagging a full chapter at 1700px; the election rule was already correct, only the offset was wrong | _(placeholder — fill in during W7)_ |
| IMPL-3 | Add `iframe` to focus-visible selector list (merges T2-D2 + Track 3 item 4) | `src/styles/global.css` | 15 figure iframes were keyboard tab stops with no focus indicator, a WCAG 2.1 AA failure | _(placeholder — fill in during W7)_ |
| IMPL-4 | `tabindex="-1"` on `#main-content` | `src/layouts/BaseLayout.astro` | Makes the existing skip link deterministic; it focused nothing before | _(placeholder — fill in during W7)_ |
| IMPL-5 | `src/pages/404.astro` routed through `BaseLayout` | `404.astro` | Replaces Astro's theme-blind dev error page with the site's own chrome, nav, skip link and footer in one move | _(placeholder — fill in during W7)_ |
| IMPL-6 | Global `prefers-reduced-motion` block (landed after IMPL-2 verified) | `src/styles/global.css` | Zero reduced-motion queries existed globally while `scroll-behavior: smooth` was forced site-wide | _(placeholder — fill in during W7)_ |
| IMPL-7 | Light-theme contrast, merged (rail ink + `--accent-2`/`--accent-2-ink`) | `public/styles/deep-dive-atlas.css`, `src/styles/global.css` | Two AA contrast failures where compliant `-ink` token siblings already existed and were unused | _(placeholder — fill in during W7)_ |
| IMPL-8 | Footer doormat nav (Home / Brief / Deep Dives, no RSS yet at authoring time) | `src/layouts/BaseLayout.astro` | Every route below the fold ended in a wordmark and nothing else, on all 26 measured routes | _(placeholder — fill in during W7)_ |
| IMPL-9 | RSS feed via `@astrojs/rss` | `src/pages/rss.xml.js` (new dependency: `@astrojs/rss`) | User checkpoint decision: build now rather than leave as documented next step; config-inspection had already upgraded this to browser-verifiable | _(placeholder — fill in during W7)_ |

## Documented direction backlog

Everything concluded as direction but not implemented this cycle, with why
each was deferred.

| Item | Track | Why deferred |
|---|---|---|
| R1 — 1280px rail disclosure control for the 15 hidden figure links | 2 | Fails `no_new_surface`: a disclosure needs new focus, `aria-expanded` and reduced-motion handling. Blocked further on identifying the sticky mechanism at 1700px, which the current metric cannot distinguish from broken. |
| R2 — strip per-iframe Google Fonts, share icon SVGs across stencil frames | 2 | Touches ~15 files under `public/visuals/customs-entry-agent/`, far past the two-file cap. Named as the single largest performance lever on the site; first in queue for a cycle shaped for it. |
| R3 — collapsed mobile figures with tap-to-expand | 2 | New interaction surface, and changes what a reader sees by default (brushes `no_content_loss`). Should discipline the *new* page's figure count rather than retrofit this article. |
| R4 — edge fade on the mobile rail's clipped labels | 2 | Cosmetic against two AA failures and a lying rail; first to promote if budget frees up. |
| R5 — end-of-article link to the companion `customs-review-desk` page | 2 | Lands as part of that page's own work, not a Track 2 edit to this article. Same scope as the deferred customs-entry-agent forward-link (C12, see below). |
| R6 — print styles across four bespoke stylesheets | 2 | Site-wide gap belonging to Track 3's print decision, not a single-article edit. |
| `/about` page and nav-item activation | 3 | Fails `no_new_surface`; needs authored prose about who writes the site, an editorial decision, not a fix. Nav span left as-is this cycle per user checkpoint decision. |
| Tag index pages (C9) | 3 | Fails `no_new_surface` at scale — one route per tag across ~48 chips, and the content schema does not yet constrain a tag taxonomy. Deferred by user checkpoint decision this cycle. |
| Customs-entry-agent forward-link (C12) | 2/new-page | Deferred by user checkpoint decision this cycle; unassigned owner per conflict-register.md. |
| Two mobile-overflow routes (900px / 361px) | 3 | Fails `low_risk`: the offending element was never isolated. A blind `overflow-x:hidden` would hide the symptom and risk `no_content_loss`. A diagnostic-only task is the named next-cycle starting point (BIZ-5). |
| Two BaseLayout-bypassing routes | 3 | Fails `low_risk`: retrofitting the layout onto a standalone deck changes its geometry, and the deck's missing h1 is a content edit, not a fix. |
| Font preconnect / `font-display: swap`, index-card clamping, home grid third column | 3 | Fail `low_risk` or are polish; documented, not scoped this cycle. |
| Token / design-system overhaul (design record: `-ink` tokens are the only text-legal light-theme accents) | 3 | Established as a rule for future components, not a retrofit task this cycle. |
| Track 1 (customs review desk console) direction and the new-page (`customs-review-desk`) spec | 1 / new-page | Documented separately; out of scope for this shared Track 2/3 doc. |

## Critique and gap table (condensed)

| ID | Finding | Severity | Resolution |
|---|---|---|---|
| C1 (T2) | Reduced-motion verification checks only rail-election correctness, not the full `prefers-reduced-motion` contract | Medium | Accepted as documented risk; follow-up check named for whoever verifies IMPL-6 |
| C2 (T2) | IMPL-7 bundles two unrelated colour fixes under one ID, defeating the cap's blast-radius intent | Medium | Accepted as documented risk; two sub-changes verified and logged independently |
| C3 (T2) | No verification step walks a non-atlas bespoke page for IMPL-3/IMPL-6's site-wide visual changes | Medium | Accepted as documented risk; added as binding verification requirement |
| C1/BIZ-1 (T3) | Track 3 holds 6 of 8 IMPLEMENT slots against higher-ranked Track 2 candidates | High | Re-derived independently (Cluster 2); allocation confirmed unchanged, DOC-1 promotion path confirmed |
| C2/BIZ-4 (T3) | About-span deletion recommendation was unrouted, unscrutinized prose | High | Escalated to explicit user checkpoint; decided this cycle — leave it, no change |
| C3/BIZ-5 (T3) | No diagnostic task on the 900px mobile overflow despite lower-visibility fixes being slotted ahead of it | Medium | Accepted as documented risk; diagnostic-only task named as next-cycle starting point |

Full detail, evidence citations, and rejected findings (A11Y-3, BROKER-5,
CTO-3) live in `40-gapclose/conclusions.md` and the `## Critique (Team B,
resolved)` sections of `20-synthesis/track2-direction.md` and
`20-synthesis/track3-direction.md` from this design cycle's working files.
