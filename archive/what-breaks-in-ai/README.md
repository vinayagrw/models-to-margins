# What Breaks in AI, archived versions

Archived on 2026-10-27 (round 11), when the owner picked sample D, the operations floor, as the main page at `/deep-dives/what-breaks-in-ai`. These files sit outside `src`, so Astro does not build them and their old URLs return 404. They will not compile from here as they stand, because their imports point at `src` paths relative to their old folders.

| File | What it was | Old route |
|---|---|---|
| `WhatBreaksStage.astro` | The cinematic stage: eight scroll scenes over a three.js scene of four layer slabs, with DOM still frames for phones | `/deep-dives/what-breaks-in-ai` (until round 11) |
| `present.astro` | The slide deck view of the stage, one scene per slide | `/deep-dives/what-breaks-in-ai/present` |
| `WhatBreaksLiving.astro` | Sample C, the living system, a zoomable board to system to block view | (component of sample C) |
| `sample-c.astro` | The page shell for sample C | `/deep-dives/what-breaks-in-ai/sample-c` |
| `sample-d.astro` | The page shell for sample D, now replaced by the `cinematic` branch of `src/pages/deep-dives/[slug].astro` | `/deep-dives/what-breaks-in-ai/sample-d` |

To restore one, move it back to its old folder (`src/pages/deep-dives/what-breaks-in-ai/` for pages, `src/components/deep-dive/` for components). The stage and sample C also used model fields that round 11 removed from `what-breaks/model.ts` as unused (`ALWAYS`, `PLAYS`, `PROOF`, `FF`, `qOf`, `probById`, `quickCount`, `BOARD` and their `clientModel` fields). `model-before-r11.ts` here is the full model as it was before that pruning.
