import json,sys,re
S=sys.argv[1]; R=sys.argv[2]
d=json.load(open(S+'/data.json')); sol=json.load(open(S+'/sol.json'))
fr=open(R+'/drafts/frontier-challenges-src.html').read()
css=fr[fr.index('<style>')+7:fr.index('</style>')]
items=[]
for x in d['search']:
    s=sol['S'][str(x['id'])]
    st={'worse':'new','true':'true','part':'true'}[x['st']]
    items.append(dict(id='S'+str(x['id']),lane='s',name=x['name'],ic=x['ic'],st=st,see=x['see'],why=x['why'],num=x['num'],numl=x['numl'],tag=x['tag'],fix=s['fix'],own=s['own'],first=s['first'],eff=s['eff'],mat=s['mat'],ev=s['ev'],evl=s['evl'],b=s['b'],tier=''))
for x in d['frontier']:
    s=sol['F'][str(x['id'])]
    items.append(dict(id='F'+str(x['id']),lane='f',name=x['sn'],ic=x['ic'],st=x['st'],see=x['see'],why=x['why'],num=x['num'],numl=x['numl'],tag=x['tag'],fix=x['fix'],own=s['own'],first=s['first'],eff=s['eff'],mat=s['mat'],ev=s['ev'],evl=s['evl'],b=s['b'],tier=x['tier']))
extra_css='''
/* deep dive additions */
.lanes{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.35fr);gap:20px}
.lane{background:var(--panel);border:1px solid var(--line);border-radius:16px;padding:18px;display:grid;gap:14px;align-content:start}
.lane .sh{display:flex;gap:14px;align-items:center}
.lane h3{font-size:24px}
.lane .job{color:var(--muted);font-weight:500;text-wrap:balance}
.tiles{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}
.lane.f .tiles{grid-template-columns:repeat(3,minmax(0,1fr))}
.tile{display:flex;align-items:center;gap:10px;min-height:56px;text-align:left;border:1.5px solid var(--line);background:var(--bg);border-radius:10px;padding:8px 10px;font-weight:600;font-size:15px;line-height:1.25;cursor:pointer;min-width:0}
.tile:hover{border-color:var(--copper)}
.tile.w{border-color:var(--worse)}
.tile{text-wrap:balance}
.tile .k{font:500 14px/1 var(--mono);color:var(--muted);flex:none;min-width:26px}
.fixes{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px}
.fixc{background:var(--panel);border:1px solid var(--line);border-radius:16px;padding:18px 16px;display:grid;gap:10px;align-content:start;min-width:0}
.fixc .n{font:600 30px/1 var(--display);color:var(--teal)}
.fixc h3{font:700 18px/1.25 var(--body)}
.fixc p{line-height:1.45}
.fixc .who{font:500 14px/1.3 var(--mono);color:var(--copper)}
.next{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:12px;margin-top:16px}
.next div{background:var(--panel);border:1px solid var(--line);border-radius:12px;padding:12px 14px;display:grid;gap:6px;align-content:start}
.next b{font:700 15px/1.3 var(--body)}
.next span{font:500 14px/1.3 var(--mono);color:var(--muted)}
.blocks{display:grid;gap:8px}
.brow{display:grid;grid-template-columns:200px minmax(0,1fr) 44px;gap:14px;align-items:center}
.brow b{font-weight:600}
.bar{height:14px;border-radius:7px;background:var(--off);overflow:hidden}
.bar i{display:block;height:100%;background:var(--teal);border-radius:7px}
.brow span{font:600 18px/1 var(--display);text-align:right}
.board{list-style:none;margin:0;padding:0;display:grid;gap:12px;counter-reset:b}
.board li{background:var(--panel);border:1px solid var(--line);border-radius:14px;padding:16px 18px;display:grid;grid-template-columns:auto minmax(0,1fr);gap:16px;align-items:center}
.board li b{font:600 30px/1 var(--display);color:var(--copper);min-width:96px}
.board li p{font-size:17px;font-weight:500;line-height:1.4;text-wrap:balance}
.unk{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px}
.unk div{border:1.5px dashed var(--line);border-radius:12px;padding:14px;display:grid;gap:6px;align-content:start}
.unk b{font-weight:700}
.unk p{color:var(--muted);line-height:1.45;text-wrap:balance}
.foot{text-wrap:balance}
#map .lede{text-wrap:balance}
.evp{display:inline-block;font:600 14px/1.2 var(--body);padding:9px 12px;border-radius:999px}
.dl dd.evd{display:grid;gap:8px;justify-items:start}
.drawer .dl dd{text-wrap:balance}
.evp.m{background:var(--part-bg);color:var(--part)}
.evp.v{background:var(--true-bg);color:var(--true)}
.evp.n{background:var(--off);color:var(--muted)}
@media (max-width:1000px){.lanes{grid-template-columns:1fr}.fixes{grid-template-columns:repeat(2,minmax(0,1fr))}.next{grid-template-columns:repeat(2,minmax(0,1fr))}.unk{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media (max-width:560px){.tiles,.lane.f .tiles{grid-template-columns:1fr}.fixes,.next,.unk{grid-template-columns:1fr}.brow{grid-template-columns:minmax(0,1fr) 40px;row-gap:6px}.brow .bar{grid-column:1/-1;grid-row:2}.board li{grid-template-columns:1fr;gap:8px}}
'''
BL=[("P1","Check every claim"),("P2","Source and date rules"),("P3","Failure log"),("P4","Agent fence"),("P5","One approved tool"),("P6","Gateway, pinned models"),("P7","Contract terms"),("P8","Value ledger"),("P9","Named checkers"),("P10","Your own test set")]
cov={k:0 for k,_ in BL}
for it in items:
    for b in it['b']: cov[b]+=1
cov['P10']=24  # the test set covers all 24
html=f'''<title>What Breaks in AI</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,500;6..72,600&family=Public+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500&display=swap">
<style>{css}{extra_css}</style>

<!--SPRITE-->

<main>
  <section id="top">
    <div class="hero">
      <div class="hero-copy">
        <div class="eyebrow">AI deep dive · October 2026</div>
        <h1>What breaks in frontier AI, and how to fix it</h1>
        <p class="lede">We tracked 24 ways AI tools fail: 10 when they search the web and 14 across wider use. Every one has a fix today. Four fixes cover most of the damage, and most of them a buyer can start without waiting for a vendor.</p>
      </div>
      <div class="stats">
        <div class="stat"><b class="w">0 of 24</b><span>problems were fixed in the last 30 days</span><span class="tag">Re-checked 25 Sep to 25 Oct 2026</span></div>
        <div class="stat"><b>13%</b><span>of CIOs say AI brought significant or transformational value</span><span class="tag">Analyst survey, verified 2026</span></div>
        <div class="stat"><b>60%+</b><span>of AI search citations tested got the article, publisher or link wrong</span><span class="tag">Independent audit, 2025</span></div>
      </div>
    </div>
  </section>

  <section id="map">
    <div class="head">
      <div class="eyebrow">Two kinds of failure</div>
      <h2>Search failures hide in the answer. The rest hit the business</h2>
      <p class="lede">Open any problem for the number, the fix, its owner and the first step.</p>
    </div>
    <div class="legend">
      <span class="pill worse">Harm rising</span>
      <span class="pill part">New events</span>
      <span class="pill true">Still true</span>
    </div>
    <div class="lanes" id="lanes"></div>
  </section>

  <section id="fix">
    <div class="head">
      <div class="eyebrow">Fix first</div>
      <h2>Four fixes do most of the work</h2>
    </div>
    <div class="fixes" id="fixes"></div>
    <div class="next" id="next"></div>
  </section>

  <section id="blocks">
    <div class="head">
      <div class="eyebrow">One platform, not 24 projects</div>
      <h2>Ten building blocks cover all 24 problems</h2>
      <p class="lede">Each bar shows how many of the 24 problems a block helps fix. Your own test set touches all of them, because it is how you prove the rest work.</p>
    </div>
    <div class="blocks" id="bl"></div>
  </section>

  <section id="board">
    <div class="head">
      <div class="eyebrow">For your board</div>
      <h2>Five sentences to repeat</h2>
    </div>
    <ol class="board" id="brd"></ol>
  </section>

  <section id="unknown">
    <div class="head">
      <div class="eyebrow">What we do not know yet</div>
      <h2>The fixes are clearer than the proof</h2>
    </div>
    <div class="unk" id="unk"></div>
  </section>

  <p class="foot">Evidence comes from studies, court records, regulator releases, security advisories, vendor documents and surveys, each reopened by a separate checker. Desk research only, with no interviews yet.</p>
</main>

<div class="scrim" id="scrim" hidden></div>
<aside class="drawer" id="drawer" hidden role="dialog" aria-modal="true" aria-labelledby="dr-title"></aside>

<script>
const I={json.dumps(items,ensure_ascii=False)};
const BL={json.dumps(BL)};
const COV={json.dumps(cov)};
const ST={{worse:["worse","Harm rising"],new:["part","New events"],true:["true","Still true"]}};
const EV={{m:"Measured",v:"Vendor or survey only",n:"Not measured"}};
const $=q=>document.querySelector(q);
const icon=(id,size,cls)=>`<svg class="ic ${{cls}}" width="${{size}}" height="${{size}}" aria-hidden="true"><use href="#${{id}}"/></svg>`;
const role=f=>f.st==="worse"?"iso-red":f.lane==="s"?"iso-violet":"iso-coral";
const W=f=>f.st==="worse"?"w":"";
const LANES=[["s","Web search","i-network","iso-violet","10 ways answers go wrong when AI searches the web."],["f","Wider AI use","i-executive","iso-amber","14 problems in daily use, by tier. A hurts most."]];
$("#lanes").innerHTML=LANES.map(l=>`<div class="lane ${{l[0]}}"><div class="sh">${{icon(l[2],88,l[3])}}<h3>${{l[1]}}</h3></div><p class="job">${{l[4]}}</p><div class="tiles">${{I.filter(f=>f.lane===l[0]).map(f=>`<button class="tile ${{W(f)}}" data-open="${{f.id}}"><span class="k">${{f.id}}</span>${{f.name}}</button>`).join("")}}</div></div>`).join("");
const FIX=[
 ["1","Name a checker for what leaves","Head of each team that sends AI work out","Name one person who opens every cited source and figure before it is sent. Turn on citations.","Covers F1, S1. Low to medium effort"],
 ["2","Fence every agent","Security lead","List every agent, give each its own low-privilege login, and test the off switch.","Covers F2, F4, F9, S10. Medium effort"],
 ["3","Pin models and test before change","Platform lead","Pin model versions and run your own test set before any model or setting change.","Covers F6, F12, F13, F14 and all search. Low to medium"],
 ["4","Write change into contracts","Procurement lead","At the next renewal, add notice for retirements, limits and prices, full export and no silent renewal.","Covers F6, F7, F12, F14. Low effort"]];
$("#fixes").innerHTML=FIX.map(f=>`<div class="fixc"><span class="n">${{f[0]}}</span><h3>${{f[1]}}</h3><span class="who">${{f[2]}}</span><p>${{f[3]}}</p><span class="tag">${{f[4]}}</span></div>`).join("");
const NEXT=[["One approved tool","CIO · F3"],["Value ledger and stop rules","Finance lead · F5, F7"],["Source rules and failure log","Architect · S2 to S9"],["Isolated reader for agents","Security lead · S10"],["Review capacity","HR and team heads · F10"]];
$("#next").innerHTML=NEXT.map((n,i)=>`<div><span>Then ${{i+5}}</span><b>${{n[0]}}</b><span>${{n[1]}}</span></div>`).join("");
$("#bl").innerHTML=BL.map(b=>`<div class="brow"><b>${{b[1]}}</b><div class="bar" role="img" aria-label="${{COV[b[0]]}} of 24"><i style="width:${{COV[b[0]]/24*100}}%"></i></div><span>${{COV[b[0]]}}</span></div>`).join("");
const BRD=[["0 of 24","We tracked 24 ways AI tools fail. None was fixed in the last 30 days."],["13%","Only 13% of CIOs say AI has brought significant or transformational value."],["60%+","In one audit, over 60% of AI search citations got the article, publisher or link wrong."],["3.3x","AI agents acting wrongly is the one problem with harm clearly rising. Our count of agent incidents per month was about 3.3 times higher in Sep and Oct than in Jun to Aug."],["4 of 10","Ten building blocks cover all 24 problems. Four of them do most of the work: a named checker, an agent fence, pinned models and contract terms."]];
$("#brd").innerHTML=BRD.map(b=>`<li><b>${{b[0]}}</b><p>${{b[1]}}</p></li>`).join("");
const UNK=[["Proof the fixes work","Most fixes have no independent before-and-after number yet."],["The human steps","Named checkers, stop rules and off-switch drills are measured nowhere."],["Cost","No block has a priced total for a given firm. Price each at the first funding gate."],["Interviews","This is desk research. Interviews with AI owners have not been run."]];
$("#unk").innerHTML=UNK.map(u=>`<div><b>${{u[0]}}</b><p>${{u[1]}}</p></div>`).join("");
/* drawer */
let cur=null;
function openD(id){{
  const k=I.findIndex(f=>f.id===id); if(k<0) return; const f=I[k]; cur=k;
  $("#drawer").innerHTML=`<div class="dh">${{icon(f.ic,88,role(f))}}<div class="tag">${{f.id}} · ${{f.lane==="s"?"Web search":"Wider AI, tier "+f.tier}}</div><button class="close" id="dr-x" aria-label="Close">×</button></div>
  <h2 id="dr-title">${{f.name}}</h2>
  <span class="pill ${{ST[f.st][0]}}" style="justify-self:start">${{ST[f.st][1]}}</span>
  <div class="big"><b class="${{W(f)}}">${{f.num}}</b><span>${{f.numl}}</span><span class="tag">${{f.tag}}</span></div>
  <dl class="dl"><div><dt>What you see</dt><dd>${{f.see}}</dd></div><div><dt>Why it happens</dt><dd>${{f.why}}</dd></div><div><dt>The fix</dt><dd>${{f.fix}}</dd></div><div><dt>Who owns it</dt><dd>${{f.own}}</dd></div><div><dt>First step</dt><dd>${{f.first}}</dd></div><div><dt>Effort and maturity</dt><dd>${{f.eff}} effort. ${{f.mat}}.</dd></div><div><dt>Does the fix work?</dt><dd class="evd"><span class="evp ${{f.ev}}">${{EV[f.ev]}}</span><span>${{f.evl}}.</span></dd></div></dl>
  <div class="navrow"><button id="dr-p" ${{k===0?"disabled":""}}>‹ Previous</button><button id="dr-n" ${{k===I.length-1?"disabled":""}}>Next ›</button></div>`;
  $("#drawer").hidden=false;$("#scrim").hidden=false;
  $("#dr-x").onclick=closeD;$("#dr-p").onclick=()=>openD(I[cur-1].id);$("#dr-n").onclick=()=>openD(I[cur+1].id);
  $("#dr-x").focus();
}}
function closeD(){{$("#drawer").hidden=true;$("#scrim").hidden=true;cur=null;}}
document.addEventListener("click",e=>{{const b=e.target.closest("[data-open]");if(b) openD(b.dataset.open);}});
$("#scrim").onclick=closeD;
document.addEventListener("keydown",e=>{{if(e.key==="Escape"&&cur!==null) closeD();}});
const h=new URLSearchParams(location.hash.slice(1));if(h.get("open")) openD(h.get("open"));
</script>
'''
open(R+'/drafts/ai-deep-dive-src.html','w').write(html)
print(cov)
