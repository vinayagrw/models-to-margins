import { arch, PROB, BLOCKS, LAYER_TONE, layerOf, icon, evTag, proofCount, view } from './model';
export function story(chip: (id: string) => string) {
// The five-screen story (round 15). One spine, the four fix rows in arch.fixRows, shared by both views.
const ST = arch.story; const FR = arch.fixRows as { block: string; name: string; who: string; first: string; covers: string[] }[];
const hl = (h: string[], cls: string) => `${h[0]}<b class="${cls}">${h[1]}</b>${h[2]}`;
const proofOf = (ids: string[]) => { const ps = ids.map((i) => PROB.find((p) => p.id === i)).filter(Boolean) as any[]; return { m: ps.filter((p) => p.ev === 'm').length, n: ps.length }; };
// Failures two fixes catch. A row count includes them, the totals count each failure once.
const fixCount: Record<string, number> = {}; FR.forEach((f) => f.covers.forEach((i) => { fixCount[i] = (fixCount[i] ?? 0) + 1; }));
const shared = (id: string) => (fixCount[id] ?? 0) > 1;
const withOf = (id: string, f: { block: string }) => FR.filter((r) => r !== f && r.covers.includes(id)).map((r) => r.name).join(' and ');
const partners = (ids: string[], f: { block: string }) => [...new Set(ids.flatMap((id) => withOf(id, f).split(' and ')))].join(' and ');
const caughtIds = [...new Set(FR.flatMap((f) => f.covers))];
const caught = { n: caughtIds.length, m: caughtIds.filter((i) => PROB.find((p) => p.id === i)?.ev === 'm').length };
const stationsOf = (blk: string) => (view?.nodes ?? []).filter((n: any) => n.block === blk).map((n: any) => n.name);
// Each failure counts once, in the row of the first fix that catches it, so the row counts sum to the caught total.
const ownOf = (f: { covers: string[] }) => f.covers.filter((id) => FR.find((r) => r.covers.includes(id)) === f);
const fixRowsHtml = FR.map((f, i) => { const b = BLOCKS[f.block]; const own = ownOf(f); const pr = proofOf(own); const also = f.covers.filter((id) => !own.includes(id)); const ownSh = own.filter(shared); const sts = stationsOf(f.block); return `<li class="wbf-fr"><div class="wbf-frm">${icon(b.ic, LAYER_TONE[layerOf(f.block)], 64)}<div class="wbf-frc fix"><b>${i + 1}. ${f.name}</b><span>${f.who}</span></div>` + `<div class="wbf-frc catches"><span class="wbf-frl">Catches</span><span class="wbf-cchips">${own.map(chip).join('')}</span></div>` + `<div class="wbf-frc sm"><span class="wbf-frl">Proof</span><b class="mono">${pr.m} of ${pr.n}</b><span>measured</span></div>`  + `<div class="wbf-frc first"><span class="wbf-frl">First step</span><span>${f.first}</span></div></div>` + `<details class="wbf-frd"><summary>Control point</summary><dl><div><dt>Stations</dt><dd>${sts.join(', ') || b.name}</dd></div><div><dt>Includes</dt><dd>${b.includes}</dd></div><div><dt>Standards</dt><dd>${b.std}</dd></div></dl><button type="button" class="wbf-pp" data-open="${f.block}">Open block</button></details></li>`; }).join('');
const PB = [['m', 'Measured'], ['v', 'Vendor-reported'], ['n', 'Not measured']].map(([k, t]) => ({ k, t, c: proofCount(k) }));
// What breaks: the 24 failures as tiles, coloured by severity, each tagged with the fix that catches it.
const SEVT: Record<string, string> = { high: 'iso-coral', medium: 'iso-amber', lower: 'iso-slate' };
const fixesOf = (id: string) => FR.filter((f) => f.covers.includes(id)).map((f) => f.name);
const breakTile = (p: any) => { const fx = fixesOf(p.id); return `<button type="button" class="wbf-bt ${p.sev}" id="wbf-t-${p.id}" data-prob="${p.id}" aria-label="${p.name}, ${p.sev} severity, ${fx.length ? 'caught by ' + fx.join(' and ') : 'beyond the four fixes'}">${icon(p.ic, SEVT[p.sev], 44)}<b>${p.name}</b><span class="wbf-btf${fx.length ? '' : ' none'}">${fx[0] ?? 'Beyond four'}</span></button>`; };
// const breaksHtml = [['S', 'Search'], ['F', 'Wider use']].map(([pre, t]) => { const ps = PROB.filter((p) => p.pre === pre); return `<div class="wbf-bgrp"><p class="wbf-bgl">${t} <b class="mono">${ps.length}</b></p><div class="wbf-bgrid">${ps.map(breakTile).join('')}</div></div>`; }).join('');
// Three chapters. A failure sits in the chapter of the first fix that catches it, failures beyond the four in the chapter the data names.
const CH = ST.chapters as { head: string[]; glow: string; tone: string; fixes: string[]; beyond: string[]; case: any; industry: { l: string; s: string; ev: string }[]; our: string }[];
const chOf = (id: string) => { const f = FR.find((r) => r.covers.includes(id)); return CH.findIndex((c) => f ? c.fixes.includes(f.block) : c.beyond.includes(id)); };
const chapters = CH.map((c, i) => { const ps = PROB.filter((p) => chOf(p.id) === i); return { ...c, n: ps.length, tiles: ps.map(breakTile).join(''), fixShort: c.fixes.length > 1 ? 'Pins and contracts' : FR.find((r) => r.block === c.fixes[0])!.name, alsoLine: (() => { const sh = ps.filter((p) => fixesOf(p.id).length > 1); const by: Record<string, number> = {}; sh.forEach((p) => fixesOf(p.id).slice(1).forEach((n) => { by[n] = (by[n] ?? 0) + 1; })); return Object.entries(by).map(([n, k]) => `<span class="wbf-sh">${k} ${k === 1 ? "gets" : "get"} a second check from ${n}</span>`).join(' '); })(), fixNames: c.fixes.map((b) => FR.find((r) => r.block === b)!.name).join(' and '), fixIc: c.fixes.map((b) => icon(BLOCKS[b].ic, LAYER_TONE[layerOf(b)], 44)).join(''), indHtml: c.industry.map((x) => `<li><b>${x.l}</b><span>${x.s} ${evTag(x.ev)}</span></li>`).join('') }; });
// What still breaks: the open gaps, each with the chapter it belongs to.
const GIC = ['i-analyst', 'i-agent', 'i-model'];
const gapsHtml = ST.gaps.items.map((g: any) => `<li>${icon(GIC[g.ch - 1], 'iso-coral', 44)}<div><b>${g.l}</b><span class="wbf-gch">Chapter ${g.ch}</span><p>${g.s} ${evTag(g.ev)}</p></div></li>`).join('');
if (chapters.reduce((a, c) => a + c.n, 0) !== PROB.length) throw new Error('chapters must hold every failure once');
return { ST, FR, hl, fixRowsHtml, PB, gapsHtml, caught, chapters };
}
