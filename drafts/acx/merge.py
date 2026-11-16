"""Merge the drafting fragments into drafts/acx/data.json and check them against SCHEMA.md.

Reads   drafts/acx/frag/d1a.json d1b.json d2.json d3.json, and meta from the current data.json
Writes  drafts/acx/data.json (only when --write is given and there are no hard faults)

Checks  every src id exists in a research brief, ev values, icons in the sprite, word caps,
        no em-dash and no semicolon in any string, ev and src on items that carry numbers.

Run:  python3 drafts/acx/merge.py            (check only)
      python3 drafts/acx/merge.py --write
      python3 drafts/acx/merge.py --write --partial   (a missing fragment keeps its keys from the current data.json)
"""
import json, os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
from ledger import load_rows  # noqa: E402

FRAGS = ['d1a', 'd1b', 'd2', 'd3']
OWN = {'d1a': ['layers', 'usecases', 'protocols', 'flows', 'params', 'vars'],
       'd1b': ['configurator', 'patterns', 'tree', 'criteria', 'arch'],
       'd2': ['adoption', 'players', 'scenarios', 'signposts', 'forecasts'],
       'd3': ['stakeholders', 'challenges']}
EV = {'verified 2026', 'vendor', 'illustrative'}
ICONS = set('''i-claim-837 i-remit-835 i-scrub i-submit i-approve i-deploy i-canary i-rollback i-replay i-rule-registry
i-rule-brick i-sdk i-webhook i-mcp i-cds-hooks i-gateway i-roadmap i-model i-llm-drafter i-pattern-miner i-drift i-explain
i-eval i-agent i-fhir i-event-stream i-lake i-sql i-cache i-vault i-monitor i-cloud i-kubernetes i-network i-kpi i-measure
i-ehr i-pm i-clearinghouse i-payer i-analyst i-coder i-executive i-policy-doc i-hcc-evidence i-denial i-appeal i-risk
i-security i-cross'''.split())
TONES = {'teal', 'amber', 'coral', 'violet', 'slate', 'red'}
CAPS = {
    ('layers', 'one'): 12, ('layers', 'arch'): 20, ('usecases', 'one'): 12,
    ('protocols', 'one'): 18, ('protocols', 'arch'): 32, ('protocols', 'gaps'): 16,
    ('flows', 'one'): 16, ('flows', 'arch'): 28, ('steps', 'msg'): 8,
    ('params', 'why'): 14, ('vars', 'why'): 14, ('build', 'must'): 12, ('build', 'why'): 16,
    ('patterns', 'one'): 16, ('patterns', 'arch'): 28, ('patterns', 'best_for'): 10, ('patterns', 'breaks_on'): 12,
    ('tree', 'q'): 12, ('criteria', 'why'): 14, ('components', 'one'): 14,
    ('adoption', 'label'): 8, ('adoption', 'one'): 16,
    ('companies', 'one'): 18, ('companies', 'arch'): 28, ('companies', 'watch'): 12,
    ('startups', 'one'): 18, ('startups', 'arch'): 28, ('startups', 'watch'): 12, ('moves', 'text'): 12,
    ('challenges', 'name'): 5, ('challenges', 'one'): 18, ('challenges', 'arch'): 30, ('challenges', 'pain'): 16,
    ('challenges', 'working'): 14, ('challenges', 'research'): 14,
    ('scenarios', 'name'): 4, ('scenarios', 'one'): 18, ('scenarios', 'arch'): 28, ('signals', '*'): 10, ('by', '*'): 10,
    ('signposts', 'text'): 12, ('forecasts', 'incentive'): 10,
}
NEEDS_EV = {'adoption', 'moves', 'challenges', 'signposts', 'forecasts', 'funding'}


def words(s):
    return len(re.findall(r"[A-Za-z0-9][A-Za-z0-9'.,%$/+-]*", s))


def main():
    rows = load_rows()
    D = json.load(open(os.path.join(HERE, 'data.json')))
    out = {'meta': D.get('meta', {}),
           'checks': D.get('checks', {'claims_total': 0, 'opened': 0, 'kept': 0, 'fixed': 0, 'cut': 0, 'conflicts': 0})}
    hard, soft = [], []
    for f in FRAGS:
        p = os.path.join(HERE, 'frag', f + '.json')
        if not os.path.exists(p):
            (soft if '--partial' in sys.argv else hard).append('missing fragment ' + f)
            for k in OWN[f]:
                if k in D:
                    out[k] = D[k]
            continue
        try:
            frag = json.load(open(p))
        except ValueError as e:
            hard.append('%s bad json %s' % (f, e))
            continue
        for k in OWN[f]:
            if k not in frag:
                hard.append('%s lacks key %s' % (f, k))
            else:
                out[k] = frag[k]
        extra = set(frag) - set(OWN[f])
        if extra:
            soft.append('%s extra keys ignored %s' % (f, sorted(extra)))

    def walk(o, path):
        parent = path[-2] if len(path) > 1 else ''
        if isinstance(o, dict):
            if 'ev' in o and o['ev'] and o['ev'] not in EV:
                hard.append('bad ev %r at %s' % (o['ev'], '.'.join(path)))
            if 'src' in o:
                for s in o['src'] or []:
                    if s not in rows:
                        hard.append('unknown src %s at %s' % (s, '.'.join(path)))
            if 'm' in o and o.get('m') not in ('Absent', '') and not (o.get('ev') and o.get('src')):
                soft.append('status without ev or src at %s' % '.'.join(path))
            for k, v in o.items():
                if k == 'icon' and v not in ICONS:
                    hard.append('icon %s not in sprite at %s' % (v, '.'.join(path)))
                if k == 'tone' and v not in TONES:
                    hard.append('tone %s at %s' % (v, '.'.join(path)))
                walk(v, path + [k])
        elif isinstance(o, list):
            for i, v in enumerate(o):
                walk(v, path + [str(i)])
        elif isinstance(o, str):
            if '—' in o or ';' in o:
                hard.append('em-dash or semicolon at %s: %s' % ('.'.join(path), o[:60]))
            # caps: find nearest named collection and field
            field = path[-1] if path else ''
            coll = next((p for p in reversed(path[:-1]) if not p.isdigit()), '')
            cap = CAPS.get((coll, field)) or CAPS.get((field if field.isdigit() else coll, '*'))
            if field.isdigit():
                cap = CAPS.get((coll, '*'))
            if cap and words(o) > cap:
                soft.append('over cap %d>%d at %s' % (words(o), cap, '.'.join(path)))

    walk(out, [])
    # numbers need evidence
    for k in ('adoption', 'challenges', 'signposts', 'forecasts'):
        for i, it in enumerate(out.get(k, [])):
            if not it.get('ev'):
                hard.append('%s.%d has no ev' % (k, i))
            if k != 'signposts' and not it.get('src') and it.get('ev') != 'illustrative':
                hard.append('%s.%d has no src' % (k, i))
    for grp in ('companies', 'startups'):
        for i, it in enumerate(out.get('players', {}).get(grp, [])):
            for j, mv in enumerate(it.get('moves', [])):
                if not mv.get('src'):
                    hard.append('players.%s.%d.moves.%d has no src' % (grp, i, j))
    # cross references between fragments
    pids = {p.get('id') for p in out.get('protocols', [])}
    lids = {l.get('id') for l in out.get('layers', [])}
    patids = {p.get('id') for p in out.get('patterns', [])}
    tids = {t.get('id') for t in out.get('tree', [])}
    scids = {s.get('id') for s in out.get('scenarios', [])}
    shids = {s.get('id') for s in out.get('stakeholders', [])}
    if pids:
        for i, a in enumerate(out.get('adoption', [])):
            if a.get('protocol') and a['protocol'] not in pids:
                soft.append('adoption.%d protocol %s not in protocols' % (i, a['protocol']))
    if lids:
        for p in out.get('protocols', []):
            for l in p.get('layers', []):
                if l not in lids:
                    hard.append('protocol %s layer %s unknown' % (p.get('id'), l))
        for grp in ('companies', 'startups'):
            for it in out.get('players', {}).get(grp, []):
                for l in it.get('layers', []):
                    if l not in lids:
                        hard.append('player %s layer %s unknown' % (it.get('id'), l))
        for f in out.get('flows', []):
            for st in f.get('steps', []):
                if st.get('layer') not in lids:
                    hard.append('flow %s step layer %s unknown' % (f.get('id'), st.get('layer')))
    for t in out.get('tree', []):
        for k in ('yes', 'no'):
            v = t.get(k, '')
            parts = v.split('+')
            if v not in tids and v != 'payouts' and not all(x in patids for x in parts):
                hard.append('tree %s %s -> %s unknown' % (t.get('id'), k, v))
    for i, s in enumerate(out.get('signposts', [])):
        if s.get('scenario') and s['scenario'] not in scids:
            hard.append('signposts.%d scenario %s unknown' % (i, s['scenario']))
    if shids:
        for c in out.get('challenges', []):
            if set(c.get('sev', {})) != shids:
                hard.append('challenge %s sev keys %s differ from stakeholders' % (c.get('id'), sorted(c.get('sev', {}))))
    print('hard faults', len(hard))
    for h in hard:
        print('  H', h)
    print('soft faults', len(soft))
    for s in soft[:80]:
        print('  S', s)
    if '--write' in sys.argv and not hard:
        json.dump(out, open(os.path.join(HERE, 'data.json'), 'w'), ensure_ascii=False, indent=1)
        print('wrote data.json keys', list(out))


if __name__ == '__main__':
    main()
