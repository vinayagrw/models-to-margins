# Data contract for the agentic commerce protocols page

Owner: the lead. Drafting agents write fragments that follow this contract. Builders read `drafts/acx/data.json` and never change its shape. If a builder needs a field that is missing, it asks the lead.

## Rules for every text field

- No em-dash and no semicolon. Plain words a client leader can follow.
- Every number shown on the page sits in an item that carries `ev` and `src`.
  - `ev` is one of `verified 2026`, `vendor`, `illustrative`. Use `vendor` for any self reported figure, even if the page was opened. Use `illustrative` for anything we computed or proposed.
  - `src` is a list of claim ids from the research briefs, for example `["R2-14","R4-27"]`. Never a URL. Sources never appear on the page.
- `one` is the leader line. `arch` is the architect line. The page shows one or the other, never both. Caps are in words.
- Icons come only from the list at the end. Tones are `teal`, `amber`, `coral`, `violet`, `slate`, `red`.
- Dates are ISO (`2026-11-15`).

## Shape

```jsonc
{
  "meta": { "bar": "", "nav": ["Stack","Choose","Adoption","Players","Challenges","Future"],
            "eyebrow": "", "title": "", "summary": "", "artifact_title": "", "as_of": "2026-11-15" },

  // scene 1, stack and flows
  "layers": [ { "id": "L1", "name": "Discover", "icon": "i-network", "tone": "slate", "one": "<=12 words", "arch": "<=20 words" } ],
  "usecases": [ { "id": "C", "name": "Consumer checkout", "one": "<=12 words" } ],   // C, B, M. P links to the payouts page
  "protocols": [ {
      "id": "ucp", "name": "UCP", "full": "Universal Commerce Protocol", "owner": "Google with Shopify and others",
      "kind": "commerce | trust | payment | rail", "layers": ["L1","L2"], "icon": "i-network", "tone": "teal",
      "status": { "C": { "m": "Live", "as_of": "2026-10-15", "ev": "verified 2026", "src": ["R1-20"] },
                  "B": { "m": "Spec", "as_of": "", "ev": "", "src": [] },
                  "M": { "m": "Absent", "as_of": "", "ev": "", "src": [] } },
      "flow": "token | mandate | h402 | none",
      "one": "<=18 words", "arch": "<=32 words", "gaps": "<=16 words",
      "params": { "P1": "", "P3": "", "P4": "", "P5": "", "P6": "", "P7": "", "P9": "", "P11": "", "P12": "" }
  } ],
  "flows": [ { "id": "token | mandate | h402", "name": "", "one": "<=16 words", "arch": "<=28 words",
               "steps": [ { "layer": "L1", "actor": "Agent", "msg": "<=8 words" } ] } ],

  // scene 2, compare and choose
  "params": [ { "id": "P1", "area": "A", "name": "", "values": [""], "who": "", "why": "<=14 words" } ],
  "vars":   [ { "id": "V1", "name": "", "typical": "", "why": "<=14 words" } ],
  "configurator": {
      "inputs": [ { "id": "use", "label": "Use case", "options": [ { "v": "C", "label": "Consumer checkout" } ] } ],
      "build": [ { "if": { "use": ["C"], "rail": ["card"] }, "must": "<=12 words", "why": "<=16 words", "layer": "L3" } ]
  },
  "patterns": [ { "id": "token", "name": "", "icon": "", "tone": "", "best_for": "<=10 words", "breaks_on": "<=12 words",
                  "latency": "", "liability": "", "one": "<=16 words", "arch": "<=28 words" } ],
  "tree": [ { "id": "q1", "q": "<=12 words", "yes": "q2 | pattern id", "no": "q3 | pattern id" } ],
  "criteria": [ { "name": "", "weight": 25, "why": "<=14 words" } ],
  "arch": { "components": [ { "id": "", "name": "", "icon": "", "tone": "", "persona": "Maya", "one": "<=14 words" } ] },

  // scene 3, adoption and evidence
  "adoption": [ { "id": "a1", "label": "<=8 words", "value": 50, "unit": "AI partners live", "rung": 6, "ev": "vendor",
                  "src": ["R2-01"], "as_of": "2026-10-27", "protocol": "visa-ic", "use": "C", "one": "<=16 words" } ],
  "checks": { "claims_total": 0, "opened": 0, "kept": 0, "fixed": 0, "cut": 0, "conflicts": 0 },

  // scene 4, who is solving it
  "players": { "companies": [ { "id": "", "name": "", "icon": "", "tone": "", "layers": ["L1"], "score": 0,
                                "one": "<=18 words", "arch": "<=28 words", "moves": [ { "date": "", "text": "<=12 words", "ev": "", "src": [] } ],
                                "watch": "<=12 words" } ],
               "startups": [ /* same shape plus "funding": { "text": "", "ev": "", "src": [] } */ ] },

  // scene 5, ten challenges
  "stakeholders": [ { "id": "consumer", "name": "Consumers", "icon": "i-analyst", "tone": "slate" } ],
  "challenges": [ { "id": 1, "name": "<=5 words", "icon": "", "tone": "", "one": "<=18 words", "arch": "<=30 words",
                    "sev": { "consumer": 0, "merchant": 0, "issuer": 0, "psp": 0, "builder": 0, "regulator": 0 },
                    "pain": "<=16 words, a customer pain in plain words", "working": "<=14 words, who is working on it",
                    "research": "<=14 words", "ev": "", "src": [] } ],

  // scene 6, 2026 to 2030
  "scenarios": [ { "id": "", "name": "<=4 words", "one": "<=18 words", "arch": "<=28 words",
                   "by": { "2027": "<=10 words", "2028": "", "2030": "" }, "signals": ["<=10 words"] } ],
  "signposts": [ { "yr": 2027, "text": "<=12 words", "scenario": "", "ev": "", "src": [] } ],
  "forecasts": [ { "author": "", "range": "", "scope": "", "incentive": "<=10 words", "ev": "vendor", "src": [] } ]
}
```

Severity in `sev` is 0 none, 1 low, 2 medium, 3 high.

## Word budget per reader (visible in the default state)

| Scene | Words |
|---|---|
| s1 Stack and flows | 300 |
| s2 Compare and choose | 330 |
| s3 Adoption and evidence | 250 |
| s4 Who is solving it | 300 |
| s7 Who pays (placed fifth) | 260 |
| s5 Ten challenges | 320 |
| s6 2026 to 2030 | 250 |

Total about 1,750, under the 1,800 cap. Drawer text counts only when its drawer is open, and only one drawer opens at a time.

## Hash keys (state in the URL)

| Scene | Keys |
|---|---|
| s1 | `use` (C, B, M), `flow` (token, mandate, h402), `p` (protocol id for the open drawer) |
| s2 | `cfg` (configurator values joined by `.`), `view` (matrix, arch, tree) |
| s3 | `ev` (all, verified, vendor), `rt` (red team critique id, shows the red team view) |
| s4 | `who` (player id for the open drawer) |
| s7 | `wv` (routes or places), `wp` (route or place id) |
| s5 | `ch` (challenge id), `sh` (stakeholder id) |
| s6 | `yr` (2026 to 2030), `sc` (scenario id) |

`reader` is owned by the core script.

## Icons allowed (iso tile sprite)

i-claim-837 i-remit-835 i-scrub i-submit i-approve i-deploy i-canary i-rollback i-replay i-rule-registry i-rule-brick i-sdk i-webhook i-mcp i-cds-hooks i-gateway i-roadmap i-model i-llm-drafter i-pattern-miner i-drift i-explain i-eval i-agent i-fhir i-event-stream i-lake i-sql i-cache i-vault i-monitor i-cloud i-kubernetes i-network i-kpi i-measure i-ehr i-pm i-clearinghouse i-payer i-analyst i-coder i-executive i-policy-doc i-hcc-evidence i-denial i-appeal i-risk i-security i-cross

Suggested mapping: Discover `i-network`, Mandate `i-policy-doc`, Identity `i-security`, Credential `i-vault`, Rail `i-event-stream`, Settle `i-clearinghouse`, Dispute `i-appeal`, Issuer or bank `i-payer`, PSP `i-gateway`, Agent `i-agent`, Builder `i-coder`, Fraud `i-risk`, Regulator `i-policy-doc`, Merchant `i-kpi`, Consumer `i-analyst`, Leader `i-executive`.

## Round 4 additions (2026-11-16)

- `players.research[]` (frag d2): id (r-*), name, kind, icon, tone, finding, ev, src, one, arch, means. Shown in scene 4 under the Research tab. Hash `who=r-*` opens the tab.
- `decide[]` (frag d3): id (D1..D6), when, name, icon, tone, ev (illustrative, our proposal), adr, one, arch, trigger. Shown in scene 6 as the This year view in place of the forecasts. Hash key `dy` (empty means forecasts).
- `meta.plain[]` (data.json meta): [term, plain words] pairs for the leader only Plain words list in scene 1.
- Scene 4 tabs (Companies, Startups, Research) are driven by `who`. The tab follows the group of the selected id.
