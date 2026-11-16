"""Merge the Wave 3 checker verdicts and show where they land.

Reads   docs/Agentic_Commerce_Protocols_research/W3_K1.json .. W3_K6.json
Writes  docs/Agentic_Commerce_Protocols_research/W3_verdicts.json (worst verdict per id wins: cut > fix > keep)
        drafts/acx/data.json "checks" counts, only with --write-checks
Prints  page data items that cite a cut or fix id, and doc lines that cite a cut id, so the lead can act on each.

Run:  python3 drafts/acx/verdicts.py
      python3 drafts/acx/verdicts.py --write-checks
"""
import glob, json, os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.abspath(os.path.join(HERE, '..', '..'))
RES = os.path.join(REPO, 'docs', 'Agentic_Commerce_Protocols_research')
DOC = os.path.join(REPO, 'docs', 'Agentic_Commerce_Protocols_Technical_Design.md')
DATA = os.path.join(HERE, 'data.json')
RANK = {'keep': 0, 'fix': 1, 'cut': 2}
sys.path.insert(0, HERE)
from ledger import cited  # noqa: E402


def main():
    merged, seen = {}, {}
    for f in sorted(glob.glob(os.path.join(RES, 'W3_K[1-9].json'))):
        try:
            d = json.load(open(f))
        except ValueError as e:
            print('bad json', f, e)
            continue
        for cid, v in d.items():
            verdict = str(v.get('verdict', '')).lower().strip()
            if verdict not in RANK:
                if not verdict.startswith('not'):
                    print('odd verdict', os.path.basename(f), cid, verdict)
                continue
            v['verdict'] = verdict
            seen.setdefault(cid, set()).add(verdict)
            if cid not in merged or RANK[verdict] > RANK[merged[cid]['verdict']]:
                merged[cid] = v
    json.dump(merged, open(os.path.join(RES, 'W3_verdicts.json'), 'w'), ensure_ascii=False, indent=1)
    conflicts = [c for c, s in seen.items() if len(s) > 1]
    counts = {k: sum(1 for v in merged.values() if v['verdict'] == k) for k in RANK}
    opened = sum(1 for v in merged.values() if v.get('opened') in (True, 'yes', 'true'))
    doc_ids, data_ids = cited()
    all_ids = list(dict.fromkeys(doc_ids + data_ids))
    print('checked ids', len(merged), counts, 'opened', opened, 'checker conflicts', len(conflicts))
    print('cited ids', len(all_ids), 'not checked', len([i for i in all_ids if i not in merged]))

    D = json.load(open(DATA))

    def walk(o, path):
        if isinstance(o, dict):
            src = o.get('src') or []
            bad = [s for s in src if merged.get(s, {}).get('verdict') in ('cut', 'fix')]
            if bad:
                alive = [s for s in src if merged.get(s, {}).get('verdict') != 'cut']
                tag = 'ALL CUT' if not alive else 'partial'
                print('  DATA %s [%s] %s' % ('.'.join(path), tag, ', '.join('%s=%s' % (b, merged[b]['verdict']) for b in bad)))
            for k, v in o.items():
                walk(v, path + [k])
        elif isinstance(o, list):
            for i, v in enumerate(o):
                walk(v, path + [str(i)])
    print('page data items citing cut or fix ids:')
    walk(D, [])
    print('doc lines citing cut ids:')
    body = open(DOC).read().split('## Appendix A')[0].splitlines()
    cut = {c for c, v in merged.items() if v['verdict'] == 'cut'}
    for n, line in enumerate(body, 1):
        hit = [c for c in re.findall(r'\b(R[1-5]-\d{2,3}|C\d{2,4}|G-\d{2,3})\b', line) if c in cut]
        if hit:
            print('  L%d %s :: %s' % (n, ','.join(hit), line[:110]))
    if '--write-checks' in sys.argv:
        D['checks'] = {'claims_total': len(all_ids), 'opened': opened, 'kept': counts['keep'],
                       'fixed': counts['fix'], 'cut': counts['cut'], 'conflicts': len(conflicts)}
        json.dump(D, open(DATA, 'w'), ensure_ascii=False, indent=1)
        print('wrote checks', D['checks'])


if __name__ == '__main__':
    main()
