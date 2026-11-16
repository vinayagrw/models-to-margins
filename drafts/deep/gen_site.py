"""Build the What Breaks in AI visual family for the site deep dive.

Reads data.json (both page item arrays) and sol.json (the fix for each item) from
this folder, and writes three embed visuals to public/visuals/what-breaks-in-ai/.
Run from anywhere:  python3 drafts/deep/gen_site.py
The figures and wording come from docs/AI_Challenges_Solutions_Technical_Design.md
and the two research docs. Sources stay in those docs, never on the page.
"""
import json, os, re

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.abspath(os.path.join(HERE, '..', '..'))
OUT = os.path.join(REPO, 'public', 'visuals', 'what-breaks-in-ai')
SPRITE_SRC = os.path.expanduser('~/.claude/skills/presales-meeting-prep/assets/iso-tile-icons.svg')

d = json.load(open(os.path.join(HERE, 'data.json')))
sol = json.load(open(os.path.join(HERE, 'sol.json')))
ARCH = json.load(open(os.path.join(HERE, 'arch.json')))


def ev_tag(tag):
    return 'vendor' if tag.lower().startswith('vendor') else 'verified'


items = []
for x in d['search']:
    s = sol['S'][str(x['id'])]
    # The search page used "Worse". The merged view applies the stricter rule
    # from the frontier research, so news without a measured harm rise is "New events".
    st = {'worse': 'new', 'new': 'new', 'true': 'true', 'part': 'true'}[x['st']]
    items.append(dict(id='S' + str(x['id']), lane='s', name=x['name'], ic=x['ic'], st=st,
                      see=x['see'], why=x['why'], num=x['num'], numl=x['numl'], tag=x['tag'],
                      evt=ev_tag(x['tag']), fix=s['fix'], own=s['own'], first=s['first'],
                      eff=s['eff'], mat=s['mat'], ev=s['ev'], evl=s['evl'], b=s['b'], tier=''))
for x in d['frontier']:
    s = sol['F'][str(x['id'])]
    items.append(dict(id='F' + str(x['id']), lane='f', name=x['sn'], ic=x['ic'], st=x['st'],
                      see=x['see'], why=x['why'], num=x['num'], numl=x['numl'], tag=x['tag'],
                      evt=ev_tag(x['tag']), fix=x['fix'], own=s['own'], first=s['first'],
                      eff=s['eff'], mat=s['mat'], ev=s['ev'], evl=s['evl'], b=s['b'], tier=x['tier']))

# Space Grotesk draws straight double quotes slanted, so show curly pairs instead.
for it in items:
    for k, v in it.items():
        if isinstance(v, str):
            it[k] = re.sub(r'"([^"]+)"', '\u201c\\1\u201d', v)

BL = [("P1", "Check every claim"), ("P2", "Source and date rules"), ("P3", "Failure log"),
      ("P4", "Agent fence"), ("P5", "One approved tool"), ("P6", "Gateway, pinned models"),
      ("P7", "Contract terms"), ("P8", "Value ledger"), ("P9", "Named checkers"),
      ("P10", "Your own test set")]
cover = {k: [] for k, _ in BL}
for it in items:
    for b in it['b']:
        cover[b].append(it['id'])
cover['P10'] = [it['id'] for it in items]  # the test set is how every other fix is proven

svg = open(SPRITE_SRC).read()
DEFS = re.search(r'<defs>.*?</defs>', svg, re.S).group(0)
SYMS = {m.group(1): m.group(0) for m in re.finditer(r'<symbol id="([^"]+)".*?</symbol>', svg, re.S)}


def sprite(src):
    used = set(re.findall(r'"(i-[a-z0-9-]+)"', src)) | set(re.findall(r'#(i-[a-z0-9-]+)', src))
    missing = used - set(SYMS)
    if missing:
        raise SystemExit(f'missing icons: {missing}')
    return ('<svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" '
            'style="position:absolute;width:0;height:0;overflow:hidden" aria-hidden="true">'
            + DEFS + ''.join(SYMS[i] for i in sorted(used)) + '</svg>')


SIZE_JS = '''
/* Report content height so the host .visual-frame hugs the visual. */
(() => {
  const main = document.querySelector('main');
  const post = () => {
    if (document.documentElement.dataset.embedded !== 'true') return;
    window.parent.postMessage({ type: 'm2m:frame-size', height: Math.ceil(main.getBoundingClientRect().height) }, '*');
  };
  new ResizeObserver(post).observe(main);
  window.addEventListener('load', post);
  if (document.fonts) document.fonts.ready.then(post);
  window.m2mPostSize = post;
})();
'''


def page(title, css, body, js):
    head = f'''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{title}</title>
<script src="./_theme-bootstrap.js"></script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500;600&display=swap">
<link rel="stylesheet" href="./_theme.css">
<style>{css}</style>
</head>
<body>
'''
    tail = f'''
<script>{SIZE_JS}</script>
<script>{js}</script>
</body>
</html>
'''
    doc = head + '<!--SPRITE-->' + body + tail
    return doc.replace('<!--SPRITE-->', sprite(doc))


# ---------------------------------------------------------------- challenge map
MAP_CSS = '''
.legend{display:flex;flex-wrap:wrap;gap:10px 14px;align-items:center}
.legend .tag{margin-left:auto}
.lanes{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.4fr);gap:18px}
.lane{background:var(--surface);border:1px solid var(--rule);border-radius:16px;padding:18px;display:grid;gap:14px;align-content:start;min-width:0}
.lane .sh{display:flex;gap:14px;align-items:center}
.lane h3{font-size:24px;line-height:1.15}
.lane .job{color:var(--muted);font-weight:500;margin-top:4px}
.tiles{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}
.lane.f .tiles{grid-template-columns:repeat(3,minmax(0,1fr))}
.tile{display:flex;align-items:center;gap:10px;min-height:56px;text-align:left;border:1.5px solid var(--rule);background:var(--bg);border-radius:10px;padding:8px 10px;font-weight:600;font-size:15px;line-height:1.25;cursor:pointer;min-width:0;text-wrap:balance}
.tile:hover{border-color:var(--accent)}
.tile.w{border-color:var(--worse)}
.tile .k{font:500 14px/1 var(--mono);color:var(--muted);flex:none;min-width:28px}
.detail{background:var(--surface);border:1px solid var(--rule);border-radius:16px;padding:18px;display:grid;gap:18px}
.dtop{display:flex;flex-wrap:wrap;gap:10px;align-items:center}
.dtop .navs{display:flex;gap:10px;margin-left:auto}
.btn{min-height:44px;padding:8px 14px;border-radius:10px;border:1.5px solid var(--rule);background:var(--bg);font-weight:600;cursor:pointer}
.btn:hover:not(:disabled){border-color:var(--accent)}
.btn:disabled{opacity:.45;cursor:default}
.dgrid{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.5fr);gap:24px;align-items:start}
.dside{display:grid;gap:14px;align-content:start}
.dh{display:flex;gap:14px;align-items:center}
.dside h2{font-size:28px;line-height:1.15}
.dside h2:focus{outline:none}
.big{display:grid;gap:6px;background:var(--bg);border-radius:12px;padding:14px 16px}
.big b{font-size:34px;line-height:1.05;color:var(--accent)}
.big b.w{color:var(--worse)}
.big .src{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-top:4px}
.dl{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px 22px;margin:0}
.dl div{min-width:0}
.dl dt{font:600 14px/1.2 var(--mono);text-transform:uppercase;letter-spacing:.06em;color:var(--accent-2)}
.dl dd{margin:4px 0 0;line-height:1.5;text-wrap:balance}
.dl dd.evd{display:grid;gap:8px;justify-items:start}
.dl .wide{grid-column:1/-1}
.evp{display:inline-block;font:600 14px/1.2 var(--font);padding:7px 11px;border-radius:999px}
.evp.m{background:var(--new-bg);color:var(--new)}
.evp.v{background:var(--true-bg);color:var(--true)}
.evp.n{background:var(--off);color:var(--muted)}
@media (max-width:900px){.lanes{grid-template-columns:1fr}.dgrid{grid-template-columns:1fr}}
@media (max-width:560px){.tiles,.lane.f .tiles{grid-template-columns:1fr}.dl{grid-template-columns:1fr}.legend .tag{margin-left:0}.dtop .navs{margin-left:0;width:100%}.dtop .navs .btn{flex:1}.dtop>.btn{width:100%}}
'''
MAP_BODY = '''
<main class="shell" id="map">
  <div class="legend">
    <span class="pill worse">Harm rising</span>
    <span class="pill new">New events</span>
    <span class="pill true">Still true</span>
    <span class="tag">Open any problem</span>
  </div>
  <div class="lanes" id="lanes"></div>
  <article class="detail" id="detail" hidden aria-live="polite"></article>
</main>
'''
MAP_JS = '''
const I=%s;
const ST={worse:["worse","Harm rising"],new:["new","New events"],true:["true","Still true"]};
const EV={m:"Measured",v:"Vendor or survey only",n:"Not measured"};
const EVT={verified:"verified 2026",vendor:"vendor"};
const $=q=>document.querySelector(q);
const icon=(id,size,cls)=>`<svg class="ic ${cls}" width="${size}" height="${size}" aria-hidden="true"><use href="#${id}"/></svg>`;
const role=f=>f.st==="worse"?"iso-red":f.lane==="s"?"iso-violet":"iso-coral";
const W=f=>f.st==="worse"?"w":"";
const LANES=[["s","Web search","i-network","iso-violet","10 ways answers go wrong when AI searches the web."],["f","Wider AI use","i-executive","iso-amber","14 problems in daily use, in tiers. Tier A hurts most."]];
$("#lanes").innerHTML=LANES.map(l=>`<div class="lane ${l[0]}"><div class="sh">${icon(l[2],88,l[3])}<div><h3>${l[1]}</h3><p class="job">${l[4]}</p></div></div><div class="tiles">${I.filter(f=>f.lane===l[0]).map(f=>`<button class="tile ${W(f)}" data-open="${f.id}"><span class="k">${f.id}</span>${f.name}</button>`).join("")}</div></div>`).join("");
let cur=null,from=null;
/* Keep what the reader just asked for on screen. Runs after the host has resized the frame. */
function showInHost(el){
  const fe=window.frameElement; if(!fe) return;
  setTimeout(()=>{
    const top=fe.getBoundingClientRect().top+el.getBoundingClientRect().top;
    if(top<90||top>window.parent.innerHeight-80) window.parent.scrollTo({top:window.parent.scrollY+top-120});
  },80);
}
function setHash(v){try{history.replaceState(null,"",v?"#open="+v:location.pathname+location.search)}catch(e){}}
function openD(id,focus){
  const k=I.findIndex(f=>f.id===id); if(k<0) return; const f=I[k]; cur=k;
  $("#detail").innerHTML=`<div class="dtop"><button class="btn" id="d-back">‹ All 24 problems</button><div class="navs"><button class="btn" id="d-p" ${k===0?"disabled":""}>‹ Previous</button><button class="btn" id="d-n" ${k===I.length-1?"disabled":""}>Next ›</button></div></div>
  <div class="dgrid"><div class="dside"><div class="dh">${icon(f.ic,88,role(f))}<div class="tag">${f.id} · ${f.lane==="s"?"Web search":"Wider AI, tier "+f.tier}</div></div>
  <h2 id="d-title" tabindex="-1">${f.name}</h2><span class="pill ${ST[f.st][0]}" style="justify-self:start">${ST[f.st][1]}</span>
  <div class="big"><b class="${W(f)}">${f.num}</b><span>${f.numl}</span><span class="src"><span class="tag">${f.tag}</span><span class="ev ${f.evt}">${EVT[f.evt]}</span></span></div></div>
  <dl class="dl"><div><dt>What you see</dt><dd>${f.see}</dd></div><div><dt>Why it happens</dt><dd>${f.why}</dd></div><div class="wide"><dt>The fix</dt><dd>${f.fix}</dd></div><div><dt>Who owns it</dt><dd>${f.own}</dd></div><div><dt>First step</dt><dd>${f.first}</dd></div><div><dt>Effort and maturity</dt><dd>${f.eff} effort. ${f.mat}.</dd></div><div><dt>Does the fix work?</dt><dd class="evd"><span class="evp ${f.ev}">${EV[f.ev]}</span><span>${f.evl}.</span></dd></div></dl></div>`;
  $("#lanes").hidden=true; $("#detail").hidden=false; setHash(id);
  $("#d-back").onclick=closeD; $("#d-p").onclick=()=>openD(I[cur-1].id,true); $("#d-n").onclick=()=>openD(I[cur+1].id,true);
  if(window.m2mPostSize) window.m2mPostSize();
  if(focus){ $("#d-title").focus({preventScroll:true}); showInHost($("#detail")); }
}
function closeD(){
  const id=cur!==null?I[cur].id:null; cur=null;
  $("#detail").hidden=true; $("#lanes").hidden=false; setHash(null);
  if(window.m2mPostSize) window.m2mPostSize();
  const t=id&&document.querySelector(`[data-open="${id}"]`); if(t){ t.focus({preventScroll:true}); showInHost(t); }
}
document.addEventListener("click",e=>{const b=e.target.closest("[data-open]");if(b) openD(b.dataset.open,true);});
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&cur!==null) closeD();});
const h=new URLSearchParams(location.hash.slice(1));if(h.get("open")) openD(h.get("open"),false);
'''

# ---------------------------------------------------------------- fix first
FIX = [(m['n'], m['ic'], m['title'], m['who'], m['first'], m.get('coverslabel') or ', '.join(m['covers']), m['effort']) for m in ARCH['fixfirst']['moves']]
NEXT = [(x['step'], x['who'], x['covers']) for x in ARCH['fixfirst']['next']]
FIX_CSS = '''
.fixes{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px}
.fixc{background:var(--surface);border:1px solid var(--rule);border-radius:16px;padding:18px 16px;display:grid;grid-template-rows:auto auto auto 1fr auto;gap:10px;min-width:0}
.fixc .top{display:flex;justify-content:space-between;align-items:flex-start}
.fixc .n{font-size:30px;font-weight:700;line-height:1;color:var(--accent)}
.fixc h3{font-size:19px;line-height:1.25}
.fixc .who{font:600 14px/1.3 var(--mono);color:var(--accent-2)}
.fixc p{line-height:1.45}
.fixc .meta{display:grid;gap:4px;border-top:1px solid var(--rule);padding-top:10px}
.then{display:grid;gap:10px}
.then h3{font-size:16px;font-weight:600;color:var(--muted)}
.next{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:12px}
.next div{background:var(--surface);border:1px dashed var(--rule);border-radius:12px;padding:12px 14px;display:grid;gap:6px;align-content:start}
.next b{font-size:15px;line-height:1.3;text-wrap:balance}
@media (max-width:1000px){.fixes{grid-template-columns:repeat(2,minmax(0,1fr))}.next{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media (max-width:560px){.fixes,.next{grid-template-columns:1fr}}
'''
FIX_BODY = '<main class="shell" id="fix">\n  <div class="fixes">' + ''.join(
    f'<div class="fixc"><div class="top"><span class="n">{n}</span><svg class="ic iso-teal" width="64" height="64" aria-hidden="true"><use href="#{ic}"/></svg></div>'
    f'<h3>{t}</h3><span class="who">{w}</span><p>{p}</p><div class="meta"><span class="tag">Covers {c}</span><span class="tag">Effort: {e}</span></div></div>'
    for n, ic, t, w, p, c, e in FIX) + '</div>\n  <div class="then"><h3>Then, in this order</h3><div class="next">' + ''.join(
    f'<div><span class="tag">Step {i + 5}</span><b>{a}</b><span class="tag">{o} · {c}</span></div>'
    for i, (a, o, c) in enumerate(NEXT)) + '</div></div>\n</main>\n'

# ---------------------------------------------------------------- building blocks
NAMES = {it['id']: it['name'] for it in items}
BLK_CSS = '''
.blocks{display:grid;gap:8px}
.blk{background:var(--surface);border:1px solid var(--rule);border-radius:12px}
.blk summary{list-style:none;display:grid;grid-template-columns:44px 210px minmax(0,1fr) 44px 28px;gap:14px;align-items:center;min-height:52px;padding:6px 14px;cursor:pointer}
.blk summary::-webkit-details-marker{display:none}
.blk summary::after{content:"+";font:600 20px/1 var(--mono);color:var(--muted);text-align:center}
.blk[open] summary::after{content:"\\2212"}
.blk .id{font:500 14px/1 var(--mono);color:var(--muted)}
.blk b{font-weight:600;line-height:1.25}
.bar{height:14px;border-radius:7px;background:var(--off);overflow:hidden}
.bar i{display:block;height:100%;background:var(--new);border-radius:7px}
.blk.top3 .bar i{background:var(--accent)}
.cnt{font-size:20px;font-weight:700;text-align:right}
.cov{display:flex;flex-wrap:wrap;gap:8px;padding:4px 14px 14px 72px}
.cov span{font-size:14px;font-weight:500;background:var(--bg);border:1px solid var(--rule);border-radius:999px;padding:6px 10px}
.cov span i{font:500 14px/1 var(--mono);font-style:normal;color:var(--muted);margin-right:6px}
.note{display:flex;flex-wrap:wrap;gap:8px 18px;align-items:center}
.key{display:inline-flex;align-items:center;gap:8px;font-size:14px;color:var(--muted)}
.key i{width:28px;height:10px;border-radius:5px;background:var(--new)}
.key.a i{background:var(--accent)}
@media (max-width:700px){.blk summary{grid-template-columns:minmax(0,1fr) 40px 24px;row-gap:8px}.blk .id{display:none}.blk .bar{grid-column:1/-1;grid-row:2}.cov{padding-left:14px}}
'''
FIRST4 = {"P9", "P4", "P6", "P7"}  # blocks behind the four fix-first moves
BLK_BODY = '<main class="shell" id="blocks">\n  <div class="note"><span class="key a"><i></i>The four blocks that do most of the work</span><span class="key"><i></i>Other blocks</span><span class="tag">Open a block to see what it covers</span></div>\n  <div class="blocks">' + ''.join(
    f'<details class="blk{" top3" if k in FIRST4 else ""}" id="{k}"><summary><span class="id">{k}</span><b>{label}</b>'
    f'<span class="bar" role="img" aria-label="{len(cover[k])} of 24"><i style="width:{len(cover[k]) / 24 * 100:.1f}%"></i></span>'
    f'<span class="cnt">{len(cover[k])}</span></summary><div class="cov">'
    + ('<span>All 24 problems. It is how you prove the other fixes work.</span>' if k == 'P10' else
       ''.join(f'<span><i>{i}</i>{NAMES[i]}</span>' for i in cover[k]))
    + '</div></details>'
    for k, label in BL) + '</div>\n</main>\n'
BLK_JS = '''
const h=new URLSearchParams(location.hash.slice(1));const o=h.get("open");
if(o){const el=document.getElementById(o);if(el&&el.tagName==="DETAILS")el.open=true;}
document.querySelectorAll("details").forEach(dt=>dt.addEventListener("toggle",()=>window.m2mPostSize&&window.m2mPostSize()));
'''

# ---------------------------------------------------------------- how the fixes work (round 7)
# Three scenes from arch.json: follow one request, the whole system, who does what.
arch = json.load(open(os.path.join(HERE, 'arch.json')))
BLOCKS = arch['blocks']
for k, b in BLOCKS.items():
    b['id'] = k
    b['fixes'] = [[i, NAMES[i]] for i in cover[k]] if k != 'P10' else [['All', 'All 24 problems']]
    b['layer'] = next(l['name'] for l in arch['layers'] if k in l['blocks'])
EVT = {'verified': 'verified 2026', 'vendor': 'vendor', 'illustrative': 'illustrative'}

SHOW_JS = '''
function showInHost(el){
  const fe=window.frameElement; if(!fe) return;
  setTimeout(()=>{
    const top=fe.getBoundingClientRect().top+el.getBoundingClientRect().top;
    if(top<90||top>window.parent.innerHeight-80) window.parent.scrollTo({top:window.parent.scrollY+top-120});
  },80);
}
function setHash(v){try{history.replaceState(null,"",v?"#"+v:location.pathname+location.search)}catch(e){}}
const icon=(id,size,cls)=>`<svg class="ic ${cls||""}" width="${size}" height="${size}" aria-hidden="true"><use href="#${id}"/></svg>`;
const EVT=%s;
const evChip=e=>e?`<span class="ev ${e}">${EVT[e]}</span>`:"";
function optList(opts){
  if(!opts||!opts.length) return "";
  return `<div class="opts"><h4>Named options, examples not a ranking</h4><ul>${opts.map(o=>`<li><b>${o.name}</b><span>${o.what}</span>${evChip(o.ev)}</li>`).join("")}</ul></div>`;
}
''' % json.dumps(EVT)

SCN_CSS = '''
.dhead{display:flex;gap:14px;align-items:center}
.dhead h2{font-size:26px;line-height:1.15}
.dhead h2:focus{outline:none}
.btn{min-height:44px;padding:8px 14px;border-radius:10px;border:1.5px solid var(--rule);background:var(--bg);font-weight:600;cursor:pointer}
.btn:hover:not(:disabled){border-color:var(--accent)}
.btn:disabled{opacity:.45;cursor:default}
.btn[aria-pressed="true"]{background:var(--accent-2);border-color:var(--accent-2);color:var(--surface)}
.panel{background:var(--surface);border:1px solid var(--rule);border-radius:16px;padding:18px;display:grid;gap:16px}
.lead{font-size:17px;line-height:1.5;text-wrap:balance}
.arch{border-top:1px dashed var(--rule);padding-top:14px;display:grid;gap:12px}
.arch h3{font:600 14px/1.2 var(--mono);text-transform:uppercase;letter-spacing:.06em;color:var(--accent-2)}
.arch h4{font:600 14px/1.3 var(--font);color:var(--muted);margin:0 0 6px;text-wrap:balance}
.arch ul{list-style:none;margin:0;padding:0;display:grid;gap:8px}
.arch li{display:grid;grid-template-columns:minmax(120px,190px) minmax(0,1fr) auto;gap:4px 12px;align-items:start}
.arch li b{font-weight:600}
.arch li span{text-wrap:pretty}
.parts{display:flex;flex-wrap:wrap;gap:8px}
.parts span{font-size:14px;background:var(--bg);border:1px solid var(--rule);border-radius:999px;padding:6px 10px}
.std{font-size:15px;color:var(--muted);text-wrap:pretty}
@media (max-width:560px){.arch li{grid-template-columns:1fr}.dhead h2{font-size:22px}}
'''

# Scene 1: follow one request
PATH_CSS = SCN_CSS + '''
.plays{display:flex;flex-wrap:wrap;gap:8px;align-items:center}
.plays .tag{margin-right:4px}
.lane{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:10px;position:relative}
.lane::before{content:"";position:absolute;left:6%;right:6%;top:52px;height:2px;background:var(--rule)}
.step{position:relative}
.step button{width:100%;display:grid;justify-items:center;gap:6px;text-align:center;background:var(--surface);border:1.5px solid var(--rule);border-radius:14px;padding:12px 6px 10px;cursor:pointer;transition:border-color .25s,background .25s,opacity .25s}
.step button:hover{border-color:var(--accent)}
.step .nm{font-weight:600;font-size:15px;line-height:1.2;text-wrap:balance}
.step .bk{font:500 14px/1 var(--mono);color:var(--muted)}
.step .mk{font:600 14px/1 var(--font);min-height:18px}
.step.on button{border-color:var(--new);background:var(--new-bg)}
.step.on .mk{color:var(--new)}
.step.warn button{border-color:var(--true);background:var(--true-bg)}
.step.warn .mk{color:var(--true)}
.step.stop button{border-color:var(--worse);background:var(--worse-bg)}
.step.stop .mk{color:var(--worse)}
.step.skip button,.step.na button{opacity:.45}
.step.na .mk{color:var(--muted)}
.step.sel button{outline:3px solid var(--accent-2);outline-offset:2px}
.msg{min-height:52px;font-size:17px;line-height:1.45;background:var(--surface);border:1px solid var(--rule);border-radius:12px;padding:12px 16px;text-wrap:balance}
.always{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
.always div{display:flex;gap:14px;align-items:center;background:var(--surface);border:1px dashed var(--rule);border-radius:12px;padding:10px 14px}
.always b{display:block;font-weight:600}
.always span{color:var(--muted);font-size:15px}
@media (max-width:900px){
  .lane{grid-template-columns:1fr;gap:8px}
  .lane::before{left:44px;right:auto;top:20px;bottom:20px;width:2px;height:auto}
  .step button{grid-template-columns:64px minmax(0,1fr) auto;justify-items:start;align-items:center;text-align:left;padding:8px 12px;column-gap:12px}
  .step .nm{grid-column:2;grid-row:1}
  .step .bk{grid-column:2;grid-row:2}
  .step .mk{grid-column:3;grid-row:1/span 2}
  .step svg.ic{grid-row:1/span 2}
  .always{grid-template-columns:1fr}
}
'''
PATH_BODY = ('<main class="shell" id="path">\n'
             '  <div class="plays" role="group" aria-label="Play a request"><span class="tag">Play</span>'
             + ''.join(f'<button class="btn" data-play="{p["id"]}" aria-pressed="false">{p["label"]}</button>' for p in arch['path']['plays'])
             + '<span class="ev illustrative">illustrative</span></div>\n'
             '  <ol class="lane">' + ''.join(
                 f'<li class="step" id="st-{s["id"]}"><button data-step="{s["id"]}"><svg class="ic iso-teal" width="64" height="64" aria-hidden="true"><use href="#{s["ic"]}"/></svg>'
                 f'<span class="nm">{s["name"]}</span><span class="bk">{s["block"]}</span><span class="mk" aria-live="off"></span></button></li>'
                 for s in arch['path']['steps']) + '</ol>\n'
             '  <p class="msg" id="msg" aria-live="polite">Press a play button to send one request through the controls, or open any step.</p>\n'
             '  <div class="always">' + ''.join(
                 f'<div><svg class="ic iso-amber" width="64" height="64" aria-hidden="true"><use href="#{a["ic"]}"/></svg><p><b>Always on: {a["name"]}</b><span>{a["leader"]}</span></p></div>'
                 for a in arch['path']['always']) + '</div>\n'
             '  <article class="panel" id="sdet" hidden></article>\n</main>\n')
PATH_JS = SHOW_JS + '''
const S=%s, PLAYS=%s, BL=%s;
const $=q=>document.querySelector(q);
const MK={on:"Passed",warn:"Partly caught",stop:"Stopped",skip:"",na:"Not used"};
const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
let timers=[];
function paint(i,st){const li=$("#st-"+S[i].id);li.classList.remove("on","warn","stop","skip","na");if(st)li.classList.add(st);li.querySelector(".mk").textContent=MK[st]||"";}
function play(id,instant){
  timers.forEach(clearTimeout);timers=[];
  const p=PLAYS.find(x=>x.id===id);if(!p)return;
  document.querySelectorAll("[data-play]").forEach(b=>b.setAttribute("aria-pressed",b.dataset.play===id?"true":"false"));
  S.forEach((s,i)=>paint(i,null));$("#msg").textContent="";
  let stopped=-1;const fin=S.map((s,i)=>{if(stopped>=0)return s.id==="log"?"on":"skip";const v=p.st[s.id]||"on";if(v==="stop")stopped=i;return v;});
  const done=()=>{fin.forEach((v,i)=>paint(i,v));$("#msg").textContent=p.msg;if(window.m2mPostSize)window.m2mPostSize();};
  if(instant||reduce){done();return;}
  fin.forEach((v,i)=>timers.push(setTimeout(()=>paint(i,v),i*420)));
  timers.push(setTimeout(done,fin.length*420+200));
  setHash("play="+id);
}
function openStep(id,focus){
  const s=S.find(x=>x.id===id);if(!s)return;const b=BL[s.block];
  document.querySelectorAll(".step").forEach(li=>li.classList.toggle("sel",li.id==="st-"+id));
  $("#sdet").innerHTML=`<div class="dhead">${icon(s.ic,88,"iso-teal")}<div><div class="tag">${s.block} · ${b.name} · owner: ${b.owner}</div><h2 id="sd-t" tabindex="-1">${s.name}</h2></div><button class="btn" id="sd-x" style="margin-left:auto">Close</button></div>
  <p class="lead">${s.leader}</p>
  <div class="arch"><h3>For architects</h3>${s.parts.length?`<div class="parts">${s.parts.map(x=>`<span>${x}</span>`).join("")}</div>`:`<p class="std">${b.includes}</p>`}${optList(s.options.length?s.options:b.options)}${(s.std||b.std)?`<p class="std">Standards: ${s.std||b.std}</p>`:""}</div>`;
  $("#sdet").hidden=false;$("#sd-x").onclick=closeStep;setHash("open="+id);
  if(window.m2mPostSize)window.m2mPostSize();
  if(focus){$("#sd-t").focus({preventScroll:true});showInHost($("#sdet"));}
}
function closeStep(){const sel=document.querySelector(".step.sel");$("#sdet").hidden=true;document.querySelectorAll(".step").forEach(li=>li.classList.remove("sel"));setHash(null);if(window.m2mPostSize)window.m2mPostSize();if(sel){sel.querySelector("button").focus({preventScroll:true});showInHost(sel);}}
document.addEventListener("click",e=>{const p=e.target.closest("[data-play]");if(p){play(p.dataset.play);return;}const s=e.target.closest("[data-step]");if(s)openStep(s.dataset.step,true);});
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!$("#sdet").hidden)closeStep();});
const h=new URLSearchParams(location.hash.slice(1));
if(h.get("play"))play(h.get("play"),true);
if(h.get("open"))openStep(h.get("open"),false);
'''

# Scene 2: the whole system
MAP2_CSS = SCN_CSS + '''
.layers{display:grid;gap:10px}
.layer{display:grid;grid-template-columns:170px minmax(0,1fr);gap:14px;align-items:stretch;background:var(--surface);border:1px solid var(--rule);border-radius:16px;padding:12px}
.layer>h3{font-size:18px;line-height:1.2;align-self:center;padding-left:6px;text-wrap:balance}
.lblocks{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}
.blk2{display:flex;gap:12px;align-items:center;text-align:left;background:var(--bg);border:1.5px solid var(--rule);border-radius:12px;padding:8px 12px;cursor:pointer;min-width:0}
.blk2:hover{border-color:var(--accent)}
.blk2 b{display:block;font-weight:600;line-height:1.25;text-wrap:balance}
.blk2 span{display:block;font:500 14px/1.3 var(--mono);color:var(--muted);margin-top:2px}
.fixl{display:flex;flex-wrap:wrap;gap:8px}
.fixl span{font-size:14px;font-weight:500;background:var(--bg);border:1px solid var(--rule);border-radius:999px;padding:6px 10px}
.fixl i{font:500 14px/1 var(--mono);font-style:normal;color:var(--muted);margin-right:6px}
.kv{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}
.kv div{background:var(--bg);border-radius:12px;padding:10px 14px;display:grid;gap:4px;align-content:start}
.kv dt{font:600 14px/1.2 var(--mono);text-transform:uppercase;letter-spacing:.06em;color:var(--accent-2)}
.kv dd{margin:0;line-height:1.4;text-wrap:balance}
.dtop{display:flex;flex-wrap:wrap;gap:10px;align-items:center}
.dtop .navs{display:flex;gap:10px;margin-left:auto}
@media (max-width:900px){.layer{grid-template-columns:1fr}.layer>h3{padding-left:0}.lblocks{grid-template-columns:repeat(2,minmax(0,1fr))}.kv{grid-template-columns:1fr}}
@media (max-width:560px){.lblocks{grid-template-columns:1fr}.dtop .navs{margin-left:0;width:100%}.dtop .navs .btn{flex:1}.dtop>.btn{width:100%}}
'''
ORDER = [k for l in arch['layers'] for k in l['blocks']]
MAP2_BODY = ('<main class="shell" id="system">\n  <div class="layers" id="layers">' + ''.join(
    f'<section class="layer"><h3>{l["name"]}</h3><div class="lblocks">' + ''.join(
        f'<button class="blk2" data-open="{k}"><svg class="ic iso-violet" width="64" height="64" aria-hidden="true"><use href="#{BLOCKS[k]["ic"]}"/></svg>'
        f'<span style="margin:0;font:inherit;color:inherit"><b>{BLOCKS[k]["name"]}</b><span>{k} · fixes {24 if k == "P10" else len(cover[k])}</span></span></button>'
        for k in l['blocks']) + '</div></section>'
    for l in arch['layers']) + '</div>\n  <article class="panel" id="bdet" hidden></article>\n</main>\n')
MAP2_JS = SHOW_JS + '''
const B=%s, ORDER=%s;
const $=q=>document.querySelector(q);
let cur=null;
function openB(id,focus){
  const k=ORDER.indexOf(id);if(k<0)return;const b=B[id];cur=k;
  $("#bdet").innerHTML=`<div class="dtop"><button class="btn" id="b-back">‹ Whole system</button><div class="navs"><button class="btn" id="b-p" ${k===0?"disabled":""}>‹ Previous</button><button class="btn" id="b-n" ${k===ORDER.length-1?"disabled":""}>Next ›</button></div></div>
  <div class="dhead">${icon(b.ic,88,"iso-violet")}<div><div class="tag">${b.id} · ${b.layer}</div><h2 id="b-t" tabindex="-1">${b.name}</h2></div></div>
  <p class="lead">${b.includes}</p>
  <dl class="kv"><div><dt>Owner</dt><dd>${b.owner}</dd></div><div><dt>Cost to run</dt><dd>${b.cost||"Price at first funding gate"} ${evChip(b.costev)}</dd></div><div><dt>Fixes</dt><dd>${b.id==="P10"?"All 24 problems":b.fixes.length+" of 24 problems"}</dd></div></dl>${b.cost?`<p class="std">Cost band for an example firm of 1,000 staff and 200 AI users, at list prices. Model spend is extra.</p>`:""}
  ${b.id==="P10"?"":`<div class="fixl">${b.fixes.map(f=>`<span><i>${f[0]}</i>${f[1]}</span>`).join("")}</div>`}
  <div class="arch"><h3>For architects</h3>${optList(b.options)||`<p class="std">Named options are listed in the design document.</p>`}${b.std?`<p class="std">Standards: ${b.std}</p>`:""}</div>`;
  $("#layers").hidden=true;$("#bdet").hidden=false;setHash("open="+id);
  $("#b-back").onclick=closeB;$("#b-p").onclick=()=>openB(ORDER[cur-1],true);$("#b-n").onclick=()=>openB(ORDER[cur+1],true);
  if(window.m2mPostSize)window.m2mPostSize();
  if(focus){$("#b-t").focus({preventScroll:true});showInHost($("#bdet"));}
}
function closeB(){const id=cur!==null?ORDER[cur]:null;cur=null;$("#bdet").hidden=true;$("#layers").hidden=false;setHash(null);if(window.m2mPostSize)window.m2mPostSize();const t=id&&document.querySelector(`[data-open="${id}"]`);if(t){t.focus({preventScroll:true});showInHost(t);}}
document.addEventListener("click",e=>{const b=e.target.closest("[data-open]");if(b)openB(b.dataset.open,true);});
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&cur!==null)closeB();});
const h=new URLSearchParams(location.hash.slice(1));if(h.get("open"))openB(h.get("open"),false);
'''

# Scene 3: who does what
LANES = arch['lanes']
LANE_CSS = SCN_CSS + '''
.grid{display:grid;grid-template-columns:190px repeat(5,minmax(0,1fr));gap:6px}
.grid .ch{font:600 14px/1.2 var(--mono);text-transform:uppercase;letter-spacing:.06em;color:var(--accent-2);text-align:center;padding:6px 0}
.grid .rh{font-weight:600;line-height:1.25;align-self:center;text-wrap:balance;padding-right:6px}
.cell{min-height:64px;border-radius:10px;border:1px dashed var(--rule)}
button.cell{border:1.5px solid var(--rule);background:var(--surface);text-align:left;padding:8px 10px;cursor:pointer;display:grid;gap:4px;align-content:start;min-width:0}
button.cell:hover{border-color:var(--accent)}
button.cell b{font-weight:600;font-size:15px;line-height:1.25;text-wrap:balance}
button.cell span{font:500 14px/1.2 var(--mono);color:var(--muted)}
button.cell.sel{outline:3px solid var(--accent-2);outline-offset:1px}
.phone{display:none}
.stages{display:flex;flex-wrap:wrap;gap:8px}
.plist{display:grid;gap:8px;margin-top:12px}
.plist .pr{display:grid;gap:6px}
.plist .pr>b{font-weight:600}
.plist .none{font-size:15px;color:var(--muted);border:1px dashed var(--rule);border-radius:10px;padding:10px 12px}
@media (max-width:820px){.grid{display:none}.phone{display:block}}
'''
cells = {(c['r'], c['c']): c for c in LANES['cells']}
def cell_btn(c, key):
    return (f'<button class="cell" data-cell="{key}"><b>{c["task"]}</b><span>{c["cad"]}</span></button>')
grid = '<div class="grid" role="table" aria-label="Who does what at each stage"><span></span>' + ''.join(
    f'<span class="ch" role="columnheader">{c}</span>' for c in LANES['cols'])
for r, rn in enumerate(LANES['rows']):
    grid += f'<span class="rh" role="rowheader">{rn}</span>'
    for c in range(len(LANES['cols'])):
        grid += cell_btn(cells[(r, c)], f'{r}-{c}') if (r, c) in cells else '<span class="cell" aria-hidden="true"></span>'
grid += '</div>'
phone = ('<div class="phone"><div class="stages" role="group" aria-label="Stage">' + ''.join(
    f'<button class="btn" data-stage="{i}" aria-pressed="{"true" if i == 0 else "false"}">{c}</button>' for i, c in enumerate(LANES['cols']))
    + '</div><div class="plist" id="plist"></div></div>')
LANE_BODY = f'<main class="shell" id="lanes">\n  {grid}\n  {phone}\n  <article class="panel" id="cdet" hidden></article>\n</main>\n'
LANE_JS = SHOW_JS + '''
const L=%s;
const $=q=>document.querySelector(q);
const C={};L.cells.forEach(c=>C[c.r+"-"+c.c]=c);
function stage(i){
  document.querySelectorAll("[data-stage]").forEach(b=>b.setAttribute("aria-pressed",String(+b.dataset.stage===i)));
  $("#plist").innerHTML=L.rows.map((rn,r)=>{const c=C[r+"-"+i];return `<div class="pr"><b>${rn}</b>${c?`<button class="cell" data-cell="${r}-${i}"><b>${c.task}</b><span>${c.cad}</span></button>`:`<span class="none">No task at this stage</span>`}</div>`}).join("");
  if(window.m2mPostSize)window.m2mPostSize();
}
function openC(key,focus){
  const c=C[key];if(!c)return;
  document.querySelectorAll("button.cell").forEach(b=>b.classList.toggle("sel",b.dataset.cell===key));
  $("#cdet").innerHTML=`<div class="dhead"><div><div class="tag">${L.rows[c.r]} · ${L.cols[c.c]} · ${c.cad}</div><h2 id="c-t" tabindex="-1">${c.task}</h2></div><button class="btn" id="c-x" style="margin-left:auto">Close</button></div>
  <p class="lead">${c.detail}</p>
  <div class="arch"><h3>Standard it meets</h3><p class="std">${c.std} ${evChip(c.ev)}</p></div>`;
  $("#cdet").hidden=false;$("#c-x").onclick=closeC;setHash("open="+key);
  if(window.m2mPostSize)window.m2mPostSize();
  if(focus){$("#c-t").focus({preventScroll:true});showInHost($("#cdet"));}
}
function closeC(){const sel=document.querySelector("button.cell.sel");$("#cdet").hidden=true;document.querySelectorAll("button.cell").forEach(b=>b.classList.remove("sel"));setHash(null);if(window.m2mPostSize)window.m2mPostSize();if(sel&&sel.offsetParent){sel.focus({preventScroll:true});showInHost(sel);}}
document.addEventListener("click",e=>{const s=e.target.closest("[data-stage]");if(s){stage(+s.dataset.stage);return;}const c=e.target.closest("[data-cell]");if(c)openC(c.dataset.cell,true);});
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!$("#cdet").hidden)closeC();});
const h=new URLSearchParams(location.hash.slice(1));
stage(h.get("stage")?+h.get("stage"):0);
if(h.get("open"))openC(h.get("open"),false);
'''
SCENES = {
    'request-path.html': page('Follow one request', PATH_CSS, PATH_BODY,
                              PATH_JS % (json.dumps(arch['path']['steps'], ensure_ascii=False), json.dumps(arch['path']['plays'], ensure_ascii=False), json.dumps(BLOCKS, ensure_ascii=False))),
    'system-map.html': page('The whole system', MAP2_CSS, MAP2_BODY, MAP2_JS % (json.dumps(BLOCKS, ensure_ascii=False), json.dumps(ORDER))),
    'who-does-what.html': page('Who does what', LANE_CSS, LANE_BODY, LANE_JS % json.dumps(LANES, ensure_ascii=False)),
}

os.makedirs(OUT, exist_ok=True)
outs = {
    'challenge-map.html': page('Where AI breaks: the 24 problems', MAP_CSS, MAP_BODY, MAP_JS % json.dumps(items, ensure_ascii=False)),
    'fix-first.html': page('Fix first: four moves, then five', FIX_CSS, FIX_BODY, ''),
    'building-blocks.html': page('Ten building blocks', BLK_CSS, BLK_BODY, BLK_JS),

    **SCENES,
}
for name, html in outs.items():
    open(os.path.join(OUT, name), 'w').write(html)
    print(name, len(html))
print({k: len(v) for k, v in cover.items()})

# Keep the site-side copies in step, so the cinematic page imports the same data.
# extra.json holds the timeline, scorecard, segments, journey, pipeline, lenses, matrix and do-now lists
# brought across from the two earlier pages (checked in docs/V12_extra_data_check.md).
import shutil as _sh
_here=os.path.dirname(os.path.abspath(__file__))
_dst=os.path.normpath(os.path.join(_here,'..','..','src','data','what-breaks'))
os.makedirs(_dst,exist_ok=True)
for _f in ('arch.json','data.json','sol.json','arch_view.json','extra.json'):
    if os.path.exists(os.path.join(_here,_f)): _sh.copy(os.path.join(_here,_f), os.path.join(_dst,_f))
