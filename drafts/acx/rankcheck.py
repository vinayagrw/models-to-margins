"""Fail if the company and startup order in design doc 9.2 disagrees with the rank numbers in data.json, or data lacks ranks 1 to 3."""
import json, os, re, sys
H = os.path.dirname(os.path.abspath(__file__))
doc = open(os.path.join(H, '..', '..', 'docs', 'Agentic_Commerce_Protocols_Technical_Design.md')).read()
sec = doc.split('### 9.2 Scores')[1].split('### 9.3')[0]
tables = [t for t in re.split(r'\n\n', sec) if t.startswith('| Rank')]
data = json.load(open(os.path.join(H, 'data.json')))['players']
bad = 0
for t, grp in zip(tables, ['companies', 'startups']):
    rows = [[c.strip() for c in l.strip('|').split('|')] for l in t.splitlines()[2:]]
    ranks = [r[0] for r in rows]
    if len(set(ranks)) != len(ranks) or any(not x.isdigit() for x in ranks):
        print(grp, 'doc ranks not unique integers:', ranks); bad = 1
    doc_rank = {r[1].split(' (')[0].lower(): int(r[0]) for r in rows}
    dat = sorted(data[grp], key=lambda p: p['rank'])
    names = [p['name'].lower() for p in dat]
    print(grp, 'data', [(p['rank'], p['name']) for p in dat])
    for p in dat:
        if doc_rank.get(p['name'].lower()) != p['rank']:
            print(grp, 'rank mismatch for', p['name'], 'doc', doc_rank.get(p['name'].lower()), 'data', p['rank']); bad = 1
    if [p['rank'] for p in dat[:3]] != [1, 2, 3]:
        print(grp, 'top three in data are not ranks 1 to 3'); bad = 1
sys.exit(bad)
