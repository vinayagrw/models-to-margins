"""Splice the drafted sections D1a, D1b, D2, D3 into the design doc, replacing the FILL placeholders.

Run once:  python3 drafts/acx/splice.py
It refuses to run if a placeholder is already gone, so it cannot double insert.
"""
import os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.abspath(os.path.join(HERE, '..', '..'))
RES = os.path.join(REPO, 'docs', 'Agentic_Commerce_Protocols_research')
DOC = os.path.join(REPO, 'docs', 'Agentic_Commerce_Protocols_Technical_Design.md')
KEYS = ['2', '4.3', '4.4', '6', '7', '8.1', '8.3', '8.4', '9', '10', '11']


def blocks(path):
    """Return {key: text} for headings whose number is in KEYS. A block runs to the next key heading."""
    text = open(path).read()
    out, cur, buf, pre = {}, None, [], []
    for line in text.splitlines():
        m = re.match(r'^(#{2,3}) (\d+(?:\.\d+)?)\.? ', line)
        if m and m.group(2) in KEYS:
            if cur:
                out[cur] = '\n'.join(buf).strip() + '\n'
            cur, buf = m.group(2), [line]
        elif cur:
            buf.append(line)
        else:
            pre.append(line)
    if cur:
        out[cur] = '\n'.join(buf).strip() + '\n'
    out['_pre'] = '\n'.join(pre)
    return out


def main():
    B = {}
    for f in ['D1a', 'D1b', 'D2', 'D3']:
        p = os.path.join(RES, f + '_sections.md')
        if not os.path.exists(p):
            sys.exit('missing ' + p)
        b = blocks(p)
        B[f] = b
        print(f, sorted(k for k in b if k != '_pre'))
    doc = open(DOC).read()

    def swap(pattern, new):
        nonlocal doc
        m = re.search(pattern, doc, re.S)
        if not m:
            sys.exit('placeholder not found: ' + pattern[:60])
        doc = doc[:m.start()] + new.rstrip() + '\n\n' + doc[m.end():]

    # 1.3 sentence
    pre = B['D1a']['_pre']
    m = re.search(r'Replacement for 1\.3\s*\n+(.+?)(?:\n\n|\Z)', pre, re.S)
    if m:
        sent = m.group(1).strip().lstrip('- ').strip()
        old = 'No single protocol has won in consumer checkout as of 15 Nov 2026 (FILL with status evidence).'
        if old in doc:
            doc = doc.replace(old, sent)
    swap(r'## 2\. The protocol landscape\n.*?(?=## 3\. )', B['D1a']['2'])
    swap(r'### 4\.3 How each protocol sets them\n\nFILL[^\n]*\n+', B['D1a']['4.3'] + '\n' + B['D1a'].get('4.4', ''))
    swap(r'## 6\. Adoption, graded by evidence\n\nFILL[^\n]*\n+', B['D2']['6'])
    swap(r'## 7\. Liability, regulation and security\n\nFILL[^\n]*\n+', B['D3']['7'])
    swap(r'### 8\.1 The four patterns\n\nFILL[^\n]*\n+', B['D1b']['8.1'])
    swap(r'### 8\.3 Decision tree by use case\n\nFILL[^\n]*\n+', B['D1b']['8.3'] + '\n' + B['D1b'].get('8.4', ''))
    swap(r'## 9\. Who is solving it\n\nFILL[^\n]*\n+', B['D2']['9'])
    swap(r'## 10\. Top 10 challenges and customer pain points\n\nFILL[^\n]*\n+', B['D3']['10'])
    swap(r'## 11\. How this changes the future, 2026 to 2030\n\nFILL[^\n]*\n+', B['D2']['11'])
    open(DOC, 'w').write(doc)
    print('doc lines', doc.count('\n'), 'FILL left', len(re.findall(r'\bFILL\b', doc)))


if __name__ == '__main__':
    main()
