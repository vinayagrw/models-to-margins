"""Build the agentic commerce protocols page from one data file and six scene files.

Reads   drafts/acx/data.json, drafts/acx/shell/*, drafts/acx/scenes/s1.html .. s6.html
Writes  src/data/acx/acx-body.html   the page body the site template renders
        src/data/acx/data.json       a copy of the data (edit the original, never the copy)
        drafts/acx/out/artifact-src.html, then drafts/build.py makes artifact.html and test.html

Run from anywhere:  python3 drafts/acx/gen.py
Sources never appear on the page. Every number in data.json carries an evidence tag
(ev) and a ledger id (src) that points at docs/Agentic_Commerce_Protocols_Technical_Design.md.
"""
import json, os, re, subprocess, sys

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.abspath(os.path.join(HERE, '..', '..'))
SITE = os.path.join(REPO, 'src', 'data', 'acx')
OUT = os.path.join(HERE, 'out')
SPRITE_SRC = os.path.expanduser('~/.claude/skills/presales-meeting-prep/assets/iso-tile-icons.svg')
SCENES = ['s1', 's2', 's3', 's4', 's5', 's6']

os.makedirs(SITE, exist_ok=True)
os.makedirs(OUT, exist_ok=True)

def put(path, text):
    """Atomic write, so a page request never reads a half written file while two builders run gen.py."""
    tmp = path + '.%d.tmp' % os.getpid()
    with open(tmp, 'w') as f:
        f.write(text)
    os.replace(tmp, path)


D = json.load(open(os.path.join(HERE, 'data.json')))
css = open(os.path.join(HERE, 'shell', 'acx-tokens.css')).read()
core = open(os.path.join(HERE, 'shell', 'acx.js')).read()

scene_html = []
for s in SCENES:
    p = os.path.join(HERE, 'scenes', s + '.html')
    if os.path.exists(p):
        scene_html.append(open(p).read())
    else:
        scene_html.append('<section class="acx-scene" id="acx-%s"><p>Scene %s is not built yet.</p></section>' % (s, s))
scenes = '\n'.join(scene_html)

data_json = json.dumps(D, ensure_ascii=False, separators=(',', ':')).replace('</', '<\\/')

# icons: every i-name used in the scenes or the data
svg = open(SPRITE_SRC).read()
defs = re.search(r'<defs>.*?</defs>', svg, re.S).group(0)
syms = {m.group(1): m.group(0) for m in re.finditer(r'<symbol id="([^"]+)".*?</symbol>', svg, re.S)}
used = set(re.findall(r'\b(i-[a-z0-9-]+)\b', scenes + data_json))
missing = sorted(u for u in used if u not in syms)
sprite = ('<svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" aria-hidden="true" focusable="false" '
          'style="position:absolute;width:0;height:0;overflow:hidden">' + defs +
          ''.join(syms[u] for u in sorted(used) if u in syms) + '</svg>')

meta = D.get('meta', {})
nav = ''.join('<a href="#acx-%s">%s</a>' % (s, n) for s, n in zip(SCENES, meta.get('nav', SCENES)))
bar = ('<div class="acx-bar" role="navigation" aria-label="Page sections">'
       '<span class="acx-bar-title">%s</span><nav class="acx-nav">%s</nav>'
       '<div class="acx-reader"><span id="acx-rl">View as</span><div class="acx-seg" role="group" aria-labelledby="acx-rl">'
       '<button type="button" data-reader-btn="leader" aria-pressed="true">Leader</button>'
       '<button type="button" data-reader-btn="architect" aria-pressed="false">Architect</button>'
       '</div></div></div>') % (meta.get('bar', 'Agentic commerce protocols'), nav)

body = ('<div class="acx" id="acx" data-reader="leader">\n<style id="acx-tokens">' + css + '</style>\n' +
        sprite + '\n' + bar + '\n<script type="application/json" id="acx-data">' + data_json + '</script>\n' +
        '<script id="acx-core">' + core + '</script>\n' + scenes + '\n</div>\n')

put(os.path.join(SITE, 'acx-body.html'), body)
put(os.path.join(SITE, 'data.json'), json.dumps(D, ensure_ascii=False, indent=1))

# artifact: same body, own header and page tokens
head = ('<title>%s</title>\n<meta name="claude:viewport-fit-sides" content="cover">\n'
        '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n'
        '<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500;600&display=swap" rel="stylesheet">\n'
        '<style>:root{--pg-bg:#F6F4EF;--pg-ink:#141820;--pg-ink2:#3E4652;--pg-acc:#B45A28;color-scheme:light}'
        '@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){--pg-bg:#0D1117;--pg-ink:#E9EDF2;--pg-ink2:#B9C2CE;--pg-acc:#E58A55;color-scheme:dark}}'
        ':root[data-theme="dark"]{--pg-bg:#0D1117;--pg-ink:#E9EDF2;--pg-ink2:#B9C2CE;--pg-acc:#E58A55;color-scheme:dark}'
        'body{margin:0;background:var(--pg-bg);color:var(--pg-ink);font-family:"Space Grotesk",system-ui,sans-serif}'
        '.pg{max-width:1280px;margin:0 auto;padding:24px 16px 48px}'
        '.pg-head{padding:8px 8px 20px;max-width:900px}'
        '.pg-eyebrow{font-family:"IBM Plex Mono",monospace;font-size:14px;color:var(--pg-acc);margin:0 0 8px}'
        '.pg-head h1{font-size:clamp(30px,4vw,48px);line-height:1.05;margin:0 0 10px;text-wrap:balance;letter-spacing:-.015em}'
        '.pg-head p{font-size:17px;color:var(--pg-ink2);margin:0;text-wrap:pretty}'
        '.pg .acx{border-radius:22px}</style>\n') % meta.get('artifact_title', 'Agentic Commerce Protocols')
art = (head + '<div class="pg"><header class="pg-head"><p class="pg-eyebrow">%s</p><h1>%s</h1><p>%s</p></header>\n' %
       (meta.get('eyebrow', ''), meta.get('title', ''), meta.get('summary', '')) + body.replace(sprite, '<!--SPRITE-->') + '</div>\n')
put(os.path.join(OUT, 'artifact-src.html'), art)
r = subprocess.run([sys.executable, os.path.join(REPO, 'drafts', 'build.py'), 'acx/out/artifact-src.html',
                    'acx/out/artifact.html', 'acx/out/test.html'], capture_output=True, text=True)
print('body bytes', len(body), 'icons', len(used), 'missing icons', missing)
print('build.py:', (r.stdout or r.stderr).strip())
