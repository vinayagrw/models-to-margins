/* Shared data model for What Breaks in AI. One place shapes the checked data for the stage and
   for every sample page, so a data fix lands once. Server side only (Astro frontmatter imports it).
   The data files live in src/data/what-breaks/, copied there by drafts/deep/gen_site.py. Edit the
   drafts or the generator, never the copies. */
import fs from 'node:fs';
import path from 'node:path';
import archJson from '../../../data/what-breaks/arch.json';
import solJson from '../../../data/what-breaks/sol.json';
import dataJson from '../../../data/what-breaks/data.json';

export const arch: any = archJson;
export const sol = solJson as Record<string, Record<string, any>>;
export const data: any = dataJson;

// Files that land from research passes. Each may be absent until its fact check is done.
const viewFiles = import.meta.glob('../../../data/what-breaks/arch_view.json', { eager: true, import: 'default' });
export const view: any = Object.values(viewFiles)[0] ?? null;
// Outside systems are listed apart from nodes. Fold them in as ghost nodes so their flows can draw.
if (view?.external) for (const e of view.external) if (!view.nodes.some((n: any) => n.id === e.id)) view.nodes.push({ id: e.id, name: e.name, plane: 'data', zone: e.id, role: (e.examples || []).join(', '), parts: [], ev: 'verified', src: e.src || [], external: true });
const extraFiles = import.meta.glob('../../../data/what-breaks/extra.json', { eager: true, import: 'default' });
// Timelines, the model scorecard and the labels from the two earlier pages. Null until the data pass lands.
export const extra: any = Object.values(extraFiles)[0] ?? null;

// The iso-tile sprite, inlined once per page. Hide it with a zero-size box, never display:none.
export const sprite = fs.readFileSync(path.resolve('public/visuals/what-breaks-in-ai/_iso-icons.svg'), 'utf8')
  .replace(/^[\s\S]*?(<svg)/, '$1');

export const LAYERS = arch.layers as { name: string; blocks: string[] }[];
export const BLOCKS = arch.blocks as Record<string, any>;
export const STEPS = arch.path.steps as any[];
export const ALWAYS = arch.path.always as any[];
export const PLAYS = arch.path.plays as any[];
export const LAYER_TONE = ['iso-teal', 'iso-violet', 'iso-amber', 'iso-coral'];
export const layerOf = (id: string) => LAYERS.findIndex((l) => l.blocks.includes(id));
export const icon = (ic: string, tone: string, size = 64) => `<svg class="ic ${tone}" width="${size}" height="${size}" aria-hidden="true"><use href="#${ic}"/></svg>`;
export const evTag = (e?: string) => e ? `<i class="wb-ev ${e}">${e === 'verified' ? 'verified 2026' : e}</i>` : '';

// Which problems each block covers, from the solutions data.
export const cover: Record<string, string[]> = {};
// Quick fixes this week, grouped by the target block that later replaces them (fact-checked in V11).
export const quickBy: Record<string, any[]> = {};
for (const [pre, grp] of Object.entries(sol)) {
  for (const [n, s] of Object.entries(grp)) {
    for (const b of s.b as string[]) (cover[b] ??= []).push(pre + n);
    const q = s.quick; if (q) for (const b of q.replaced_by as string[]) (quickBy[b] ??= []).push({ id: pre + n, fix: q.fix, who: q.who, effort: q.effort, limit: q.limit, when: q.when, ev: q.ev });
  }
}
export const quickCount = Object.values(sol).reduce((a, g) => a + Object.values(g).filter((s: any) => s.quick).length, 0);

// The 24 problems joined to their fixes. Search problems are scored out of 12 (four lenses of 3),
// wider problems out of 9 (three lenses of 3), both as the research docs score them. Wider problems
// keep their proper-fix text in data.json, search problems in sol.json.
// Search problems rank by score, highest first (stable, so ties keep id order).
export const PROB = [...[...data.search].sort((a: any, b: any) => b.score - a.score).map((x: any) => ({ ...x, pre: 'S', max: 12 })), ...data.frontier.map((x: any) => ({ ...x, pre: 'F', max: 9 }))].map((x: any) => {
  const s = sol[x.pre][String(x.id)];
  const r = x.score / x.max; const sev = r >= 0.8 ? 'high' : r >= 0.65 ? 'medium' : 'lower';
  return { id: x.pre + x.id, pre: x.pre, name: x.sn || x.name, ic: x.ic, st: x.st, sev, score: x.score, pub: x.pub, max: x.max, num: x.num, numl: x.numl, nev: x.ev || 'unverified', see: x.see, why: x.why, you: x.you, seg: x.seg, j: x.j, mx: x.mx, l: x.l, tier: x.tier, stage: x.stage, c: x.c, y: x.y, fix: s.fix ?? x.fix, own: s.own, first: s.first, eff: s.eff, mat: s.mat, ev: s.ev, evl: s.evl, b: s.b, quick: s.quick };
});
export const probById = (id: string) => PROB.find((p) => p.id === id);
export const LABELS = arch.labels as Record<string, { name: string; s: string }>;
export const PROOF: Record<string, string> = { m: 'measured', v: 'vendor-reported', n: 'not measured' };
export const proofCount = (k: string) => PROB.filter((p) => p.ev === k).length;

// Fix first: four moves with the quick fix this week and the target block.
export const FF = arch.fixfirst;
export const qOf = (ids: string[]) => { for (const id of ids) { const p = probById(id); if (p?.quick) return p.quick; } return null; };
export const BUILD = arch.build;
export const LANES = arch.lanes;
export const cellOf = (r: number, c: number) => LANES.cells.find((x: any) => x.r === r && x.c === c);

// Cost bands per block, parsed from the illustrative text, for range bars.
export const money = (s: string) => { const m = s.match(/\$([\d,]+) to \$([\d,]+)/); return m ? [+m[1].replace(/,/g, ''), +m[2].replace(/,/g, '')] : null; };
export const costRows = Object.entries(BLOCKS).map(([id, b]: any) => ({ id, name: b.name, cost: b.cost, costev: b.costev, r: b.cost ? money(b.cost) : null })).filter((x) => x.r) as { id: string; name: string; cost: string; costev: string; r: number[] }[];
export const costMax = Math.max(...costRows.map((x) => x.r[1]));
export const bar = (v: number) => (Math.sqrt(v / costMax) * 100).toFixed(1);

export const BOARD = arch.board as { n: string; s: string; ev: string }[];
export const UNKNOWN = arch.unknowns as { t: string; s: string; ev?: string }[];
export const INCIDENTS = arch.incidents;
// The three hero numbers, each with its own evidence tag in the data. Never hard-code a tag.
export const HERO = (arch.hero ?? []) as { n: string; l: string; ev: string }[];

// What the browser scripts get. One object for the stage and the samples, serialised once.
export const clientModel = {
  layers: LAYERS,
  blocks: Object.fromEntries(Object.entries(BLOCKS).map(([k, b]: any) => [k, { name: b.name, ic: b.ic, owner: b.owner, cost: b.cost, costev: b.costev, includes: b.includes, options: b.options, std: b.std, fixes: cover[k] ?? [], quick: quickBy[k] ?? [] }])),
  steps: STEPS, always: ALWAYS, plays: PLAYS, view, probs: PROB, labels: LABELS, proof: PROOF, lanes: LANES,
  first4: FF.moves.map((m: any) => m.block), moves: FF.moves.map((m: any) => ({ block: m.block, first: m.first, covers: m.covers, effort: m.effort })),
  buildOrder: BUILD.order, board: BOARD, unknowns: UNKNOWN, incidents: INCIDENTS, hero: HERO, costRows, extra
};
export const clientData = JSON.stringify(clientModel);
