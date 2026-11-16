"""Build Appendix A of the design doc from the claim ids the doc and the page data cite.

Reads   docs/Agentic_Commerce_Protocols_research/R1..R5 claim tables (R1-01 style ids)
        docs/Agentic_Commerce_Protocols_research/R0_*.md baseline rows (C372, V#10 style ids)
        docs/Agentic_Commerce_Protocols_research/W3_verdicts.json if present (keep, fix, cut per id)
        docs/Agentic_Commerce_Protocols_Technical_Design.md and drafts/acx/data.json
Writes  the Appendix A table in the design doc, and prints ids that are cited but unknown.

Run:  python3 drafts/acx/ledger.py           (writes)
      python3 drafts/acx/ledger.py --check   (report only)
"""
import glob, json, os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.abspath(os.path.join(HERE, '..', '..'))
RES = os.path.join(REPO, 'docs', 'Agentic_Commerce_Protocols_research')
DOC = os.path.join(REPO, 'docs', 'Agentic_Commerce_Protocols_Technical_Design.md')
DATA = os.path.join(HERE, 'data.json')
ID_RE = re.compile(r'\b(R[1-5]-\d{2,3}|C\d{2,4}|[A-Z]{1,3}#\d{1,3}|G-\d{2,3})\b')
APPX = '## Appendix A. Source ledger'


def cells(line):
    return [c.strip() for c in line.strip().strip('|').split('|')]


def load_rows():
    rows = {}
    for f in sorted(glob.glob(os.path.join(RES, 'R[1-5]_*.md')) + glob.glob(os.path.join(RES, 'G*_*.md'))):
        for line in open(f):
            if not re.match(r'^\|\s*(R[1-5]|G)-\d', line):
                continue
            c = cells(line)
            rid = c[0]
            url = next((x for x in c if x.startswith('http')), '')
            rung = c[10] if len(c) >= 13 else next((x for x in c[::-1] if re.fullmatch(r'[1-7]', x)), '')
            tier = c[8] if len(c) >= 13 else ''
            rows[rid] = {'claim': c[1], 'url': url, 'rung': rung, 'tier': tier,
                         'date': c[5] if len(c) >= 13 else '', 'file': os.path.basename(f)}
    for f in sorted(glob.glob(os.path.join(RES, 'R0_R*.md'))):
        for line in open(f):
            m = re.match(r'^\|\s*(C\d{2,4}|[A-Z]{1,3}#\d{1,3})\s*\|', line)
            if not m or m.group(1) in rows:
                continue
            c = cells(line)
            url = next((re.sub(r'[<>]', '', x) for x in c if 'http' in x), '')
            rows[m.group(1)] = {'claim': c[1] if len(c) > 1 else '', 'url': url, 'rung': '', 'tier': 'baseline',
                                'date': '', 'file': os.path.basename(f)}
    return rows


def cited():
    doc = open(DOC).read()
    body = doc.split(APPX)[0]
    ids = []
    for m in ID_RE.finditer(body):
        if m.group(1) not in ids:
            ids.append(m.group(1))
    data_ids = []
    if os.path.exists(DATA):
        def walk(o):
            if isinstance(o, dict):
                for k, v in o.items():
                    if k == 'src' and isinstance(v, list):
                        data_ids.extend(v)
                    else:
                        walk(v)
            elif isinstance(o, list):
                for v in o:
                    walk(v)
        walk(json.load(open(DATA)))
    return ids, list(dict.fromkeys(data_ids))


def short(s, n=150):
    s = re.sub(r'\s+', ' ', s).replace('|', '/')
    return s if len(s) <= n else s[:n - 1].rsplit(' ', 1)[0] + ' ...'


def main():
    rows = load_rows()
    verdicts = {}
    vp = os.path.join(RES, 'W3_verdicts.json')
    if os.path.exists(vp):
        verdicts = json.load(open(vp))
    for kf in ('W6_K7a.json', 'W6_K7b.json'):
        kp = os.path.join(RES, kf)
        if os.path.exists(kp):
            for k, r in json.load(open(kp)).items():
                if k not in verdicts:
                    verdicts[k] = {'verdict': {'verified': 'keep', 'wrong': 'fix', 'unverified': 'unverified'}.get(r.get('mark'), '')}
    doc_ids, data_ids = cited()
    all_ids = list(dict.fromkeys(doc_ids + data_ids))
    unknown = [i for i in all_ids if i not in rows]
    cut = [i for i in all_ids if verdicts.get(i, {}).get('verdict') == 'cut']
    print('doc ids', len(doc_ids), 'data ids', len(data_ids), 'unique', len(all_ids), 'rows known', len(rows))
    print('unknown ids', unknown)
    print('cited but cut by W3', cut)
    if '--check' in sys.argv:
        return
    out = [APPX, '',
           'Every claim the doc or the page cites, in order of first use. AC ids are stable for this version. '
           'Rung is the evidence ladder (1 strongest, 7 weakest). Check is the verdict of a second checker who opened the page '
           'and was not the finder, from Wave 3 or the 2026-11-15 recheck (W6): keep, fix (wording changed), cut (removed from doc and page) '
           'or unverified (the page would not confirm it, so the claim keeps its hedge).', '',
           '| AC | Claim id | Claim | Source | Date | Rung | Tier | Check |', '|---|---|---|---|---|---|---|---|']
    for n, i in enumerate(all_ids, 1):
        r = rows.get(i, {'claim': 'not found in briefs', 'url': '', 'rung': '', 'tier': '', 'date': ''})
        v = verdicts.get(i, {}).get('verdict', '')
        out.append('| AC#%d | %s | %s | %s | %s | %s | %s | %s |' % (
            n, i, short(r['claim']), r['url'] or 'baseline row', r['date'], r['rung'], short(r['tier'], 40), v))
    doc = open(DOC).read()
    head = doc.split(APPX)[0].rstrip() + '\n\n'
    open(DOC, 'w').write(head + '\n'.join(out) + '\n')
    print('appendix rows', len(all_ids))


if __name__ == '__main__':
    main()
