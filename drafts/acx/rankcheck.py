"""Fail if the company and startup order in design doc 9.2 differs from the rank order in data.json."""
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
    doc_top = [r[1].split(' (')[0].lower() for r in rows[:3]]
    dat = sorted(data[grp], key=lambda p: p['rank'])
    dat_top = [p['name'].lower() for p in dat[:3]]
    print(grp, 'doc', doc_top, 'data', dat_top)
    if doc_top != dat_top or [p['rank'] for p in dat] != list(range(1, len(dat) + 1)):
        bad = 1
sys.exit(bad)
