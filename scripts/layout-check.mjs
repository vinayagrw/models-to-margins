#!/usr/bin/env node
// Rendered layout check. Drives the locally installed Google Chrome (headless) over the DevTools
// protocol with Node built-ins only (Node 22+: global WebSocket and fetch). No npm dependencies.
//
// Usage:
//   node scripts/layout-check.mjs <path-or-url> [--root=main] [--scene='section[id]']
//        [--readers=buyer,builder,strategy] [--widths=375,1024,1440] [--themes=light,dark]
//        [--json=out.json] [--only=<scene id>] [--budget-words=1800] [--shots=<dir>] [--shot-n=2]
//        [--states=step=1,step=2]
//
//   <path-or-url>  a path is resolved against LAYOUT_BASE (default http://localhost:4321)
//   --readers      sets the URL hash #reader=<name>. Omitted: one pass with no hash
//   --states       extra URL hash parts, one full set of runs per state (joined to the reader
//                  with &). Use it so every interactive state is measured, not only the first
//   --themes       emulated prefers-color-scheme (a data-theme attribute on <html>, if the site
//                  uses one, is switched to match)
//   --scene-allow  parts:vp raises the LN1 scene limit to vp for runs whose reader+state label
//                  contains one of the |-separated parts, e.g. build=arch|builder+rail=b:1.9, for a
//                  screen the owner chose to let grow (state it in the report)
//                  Without the flag, scripts/layout-allow.json supplies it for listed page paths.
//   --page-allow   width:vp[,width:vp] raises the LN2 page limit for a width bucket, e.g. 1440:18,1024:20,
//                  for a long study page the owner chose to keep in one piece (state it in the report).
//                  Without the flag, scripts/layout-allow.json supplies it (key pageAllow, same format
//                  as a string or an object {"1440": 18}) for listed page paths.
//   --only         measure a single scene (page-level rules LN2, LN3 are skipped)
//   --shots        save outlined screenshots, --shot-n per rule (default 2), one per distinct
//                  class path, from the first run that has the fault
//   Exit code 1 if any fault, 0 otherwise. LB4p is a warning and never fails the run.
//
// Each run waits for load, fonts and 800ms, scrolls the page once so scroll reveals fire, finishes
// finite animations, then measures visible elements inside --root only.
//
// Rules
//   LB1  orphan line      heading, label, button, caption, li or p with 2+ lines whose last line is
//                         under 20% of the content width. Blocks over 6 lines or with <br> skipped
//   LB2  squeezed label   under 8 words rendered on 3 or more lines
//   LB3  mid-word break   one word split across lines (soft hyphens, hyphens:auto, URLs,
//                         breaks at a hyphen or slash are intentional and skipped)
//   LB5  stray mark       a line that starts with . , : ! ? or ) because the mark wrapped away from
//                         the word or chip before it
//   LB4  wrap style       h1 to h4 without text-wrap balance (fault)
//   LB4p wrap style       p without text-wrap pretty or balance (warning, count only)
//   SP1  empty panel      painted box over 300x220 whose content leaves an empty strip over 35%
//                         of its height at the bottom, or over 35% of its width at the right
//   SP2  narrow content   at 1024 and wider, scene content uses under 60% of the scene inner width
//   SP3  uneven row       2+ sibling cards on one row (tops within 4px) with heights over 25% apart
//   LN1  scene too tall   over 1.5 viewports at 1440x900, 2.5 at 1024x800, 4 at 375x812
//   LN2  page too long    root over 9 viewports at 1440, 14 at 1024, 22 at 375
//   LN3  words            visible words inside root over the budget (default 1800)
//   CR1  edge             text ink closer than 8px to the inside edge of the nearest ancestor with
//                         a background, border or overflow clip
//   CR2  overlap          two text blocks, neither inside the other, intersecting by over 4px on
//                         both axes (sticky and fixed ignored)
//   CR3  tap target       button, a, input, summary, [role=button] under 42px high or wide (inline links and chips inside running text are exempt)
//                         (inline text links inside running text are exempt)
//   CR4  small text       rendered font-size under 14px
//   CR5  overflow         page scrolls sideways, or an element passes the viewport right edge
//                         outside any scroll container

import { spawn } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import net from 'node:net';

// ---------------------------------------------------------------- thresholds and budgets
const T = {
  ORPHAN_LAST_LINE_FRAC: 0.2, // LB1
  ORPHAN_MAX_LINES: 6,
  SQUEEZE_MAX_WORDS: 8, // LB2 (under)
  SQUEEZE_MIN_LINES: 3,
  PANEL_MIN_W: 300, // SP1
  PANEL_MIN_H: 220,
  PANEL_SLACK_FRAC: 0.35,
  NARROW_MIN_VW: 1024, // SP2
  NARROW_USED_FRAC: 0.6,
  ROW_TOP_TOL: 4, // SP3
  ROW_HEIGHT_DIFF: 0.25,
  CARD_MIN_W: 120,
  CARD_MIN_H: 60,
  EDGE_MIN: 8, // CR1
  OVERLAP_MIN: 4, // CR2
  TAP_MIN: 42, // CR3
  FONT_MIN: 14, // CR4
  WORDS: 1800, // LN3 default
};
// viewport height, scene limit (LN1) and page limit (LN2) in viewports, by width bucket
const VIEWPORTS = [
  { min: 1440, h: 900, scene: 1.5, page: 9 },
  { min: 1024, h: 800, scene: 2.5, page: 14 },
  { min: 0, h: 812, scene: 4, page: 22 },
];
const RULES = ['LB1', 'LB2', 'LB3', 'LB5', 'LB4', 'LB4p', 'SP1', 'SP2', 'SP3', 'LN1', 'LN2', 'LN3', 'CR1', 'CR2', 'CR3', 'CR4', 'CR5'];
const WARN_ONLY = new Set(['LB4p']);
const NAMES = { LB1: 'orphan line', LB2: 'squeezed label', LB3: 'mid-word break', LB5: 'line starts with a mark', LB4: 'heading not balanced', LB4p: 'p not pretty (warn)', SP1: 'empty panel', SP2: 'narrow content', SP3: 'uneven row', LN1: 'scene too tall', LN2: 'page too long', LN3: 'word budget', CR1: 'edge crowding', CR2: 'text overlap', CR3: 'tap target', CR4: 'small text', CR5: 'overflow' };
const CHROME = process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const BASE = process.env.LAYOUT_BASE || 'http://localhost:4321';
const EXAMPLES_PER_RULE = 8;
const JSON_CAP = 300; // faults kept per rule per run in the JSON (counts stay exact)

// ---------------------------------------------------------------- args
const argv = process.argv.slice(2);
const target = argv.find((a) => !a.startsWith('--'));
const opt = Object.fromEntries(argv.filter((a) => a.startsWith('--')).map((a) => { const i = a.indexOf('='); return i < 0 ? [a.slice(2), 'true'] : [a.slice(2, i), a.slice(i + 1)]; }));
if (!target) { console.error("usage: node scripts/layout-check.mjs <path-or-url> [--root=main] [--scene='section[id]'] [--readers=a,b] [--widths=375,1024,1440] [--themes=light,dark] [--json=out.json] [--only=<scene id>] [--budget-words=1800] [--shots=<dir>]"); process.exit(2); }
const list = (v, d) => (v ? v.split(',').map((s) => s.trim()).filter(Boolean) : d);
const cfg = {
  url: /^https?:/.test(target) ? target : BASE + (target.startsWith('/') ? '' : '/') + target,
  root: opt.root || 'main',
  scene: opt.scene || 'section[id]',
  readers: list(opt.readers, [null]),
  states: list(opt.states, [null]),
  widths: list(opt.widths, ['375', '1024', '1440']).map(Number),
  themes: list(opt.themes, ['light', 'dark']),
  only: opt.only || null,
  sceneAllow: opt['scene-allow'] ? opt['scene-allow'].split(':') : null,
  pageAllow: opt['page-allow'] ? parsePageAllow(opt['page-allow']) : null,
  words: Number(opt['budget-words'] || T.WORDS),
};
// pageAllow: { <bucket min width>: <viewports> }, from "1440:18,1024:20" or an object with the same keys
function parsePageAllow(v) {
  const out = {};
  if (v && typeof v === 'object') { for (const [k, n] of Object.entries(v)) out[Number(k)] = Number(n); return out; }
  for (const part of String(v).split(',')) { const [w, n] = part.split(':'); if (w && n) out[Number(w)] = Number(n); }
  return out;
}
// Owner-approved exceptions live in scripts/layout-allow.json, keyed by page path, each with a reason.
// They apply to every caller, so no flag has to be typed by hand. --scene-allow still overrides.
const allowNotes = [];
const fmtPage = (pa) => Object.entries(pa).map(([w, n]) => `${w}px up to ${n} viewports`).join(', ');
if (cfg.sceneAllow) allowNotes.push(`LN1 allowance from --scene-allow: ${cfg.sceneAllow[0]} up to ${cfg.sceneAllow[1]} viewports`);
if (cfg.pageAllow) allowNotes.push(`LN2 allowance from --page-allow: ${fmtPage(cfg.pageAllow)}`);
if (!cfg.sceneAllow || !cfg.pageAllow) {
  try {
    const allow = JSON.parse(fs.readFileSync(new URL('./layout-allow.json', import.meta.url), 'utf8'));
    const hit = allow[new URL(cfg.url).pathname.replace(/\/$/, '')];
    if (hit && hit.sceneAllow && !cfg.sceneAllow) { cfg.sceneAllow = hit.sceneAllow.split(':'); allowNotes.push(`LN1 allowance from layout-allow.json: ${cfg.sceneAllow[0]} up to ${cfg.sceneAllow[1]} viewports (${hit.why || 'no reason given'})`); }
    if (hit && hit.pageAllow && !cfg.pageAllow) { cfg.pageAllow = parsePageAllow(hit.pageAllow); allowNotes.push(`LN2 allowance from layout-allow.json: ${fmtPage(cfg.pageAllow)} (${hit.why || 'no reason given'})`); }
  } catch (e) { if (e.code !== 'ENOENT') { console.error('layout-allow.json: ' + e.message); process.exit(2); } }
}
const allowNote = allowNotes.join('\n');
const bucket = (w) => VIEWPORTS.find((v) => w >= v.min);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ---------------------------------------------------------------- in-page measurement
// Runs inside the page. Self-contained: receives thresholds and options as C.
function measureInPage(C) {
  const T = C.T;
  const root = document.querySelector(C.root);
  if (!root) return { error: 'root not found: ' + C.root };
  const scope = C.only ? document.getElementById(C.only) : root;
  if (!scope) return { error: 'scene not found: ' + C.only };
  const vw = innerWidth, vh = innerHeight, sx = scrollX, sy = scrollY;
  const faults = {}; for (const r of C.RULES) faults[r] = [];

  // ---- style helpers
  const csMap = new WeakMap();
  const cs = (el) => { let s = csMap.get(el); if (!s) { s = getComputedStyle(el); csMap.set(el, s); } return s; };
  const alpha = (c) => { if (!c || c === 'transparent') return 0; const m = c.match(/^rgba?\(([^)]+)\)/); if (m) { const p = m[1].split(/[,\/\s]+/).filter(Boolean); return p.length > 3 ? parseFloat(p[3]) : 1; } const s = c.split('/')[1]; return s ? parseFloat(s) : 1; };
  const SIDES = ['Top', 'Right', 'Bottom', 'Left'];
  const borders = (el) => { const s = cs(el); return SIDES.map((k) => (s['border' + k + 'Style'] !== 'none' && alpha(s['border' + k + 'Color']) > 0.02 ? parseFloat(s['border' + k + 'Width']) || 0 : 0)); };
  const hasBg = (el) => { const s = cs(el); return alpha(s.backgroundColor) > 0.02 || s.backgroundImage !== 'none'; };
  const hasBorder = (el) => borders(el).some((w) => w > 0);
  const isInline = (el) => { const d = cs(el).display; return d === 'inline' || d === 'contents'; };
  const inSvg = (el) => el instanceof SVGElement && el.tagName.toLowerCase() !== 'svg' ? el.ownerSVGElement : null;
  const clipsX = (el) => cs(el).overflowX !== 'visible';
  const clipsY = (el) => cs(el).overflowY !== 'visible';
  const rectOf = (el) => { const r = el.getBoundingClientRect(); return { l: r.left, t: r.top, r: r.right, b: r.bottom }; };
  const W = (r) => r.r - r.l, H = (r) => r.b - r.t;
  const inner = (el, pad) => { const r = rectOf(el), b = borders(el), s = cs(el); const p = pad ? ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft'].map((k) => parseFloat(s[k]) || 0) : [0, 0, 0, 0]; return { l: r.l + b[3] + p[3], t: r.t + b[0] + p[0], r: r.r - b[1] - p[1], b: r.b - b[2] - p[2] }; };

  // clip box an element's own content is subject to (itself and every clipping ancestor)
  const clipMap = new WeakMap();
  const clipFor = (el) => {
    if (!el || el === document.documentElement) return { l: -1e9, t: -1e9, r: 1e9, b: 1e9 };
    let c = clipMap.get(el); if (c) return c;
    c = { ...clipFor(el.parentElement) };
    if (!inSvg(el) && (clipsX(el) || clipsY(el)) && el !== document.body) { const r = inner(el, false); if (clipsX(el)) { c.l = Math.max(c.l, r.l); c.r = Math.min(c.r, r.r); } if (clipsY(el)) { c.t = Math.max(c.t, r.t); c.b = Math.min(c.b, r.b); } }
    clipMap.set(el, c); return c;
  };
  const clipRect = (r, c) => { const o = { l: Math.max(r.l, c.l), t: Math.max(r.t, c.t), r: Math.min(r.r, c.r), b: Math.min(r.b, c.b) }; return o.r - o.l > 1.5 && o.b - o.t > 1.5 ? o : null; }; // 1px survivors are visually-hidden helpers
  const visMap = new WeakMap();
  const vis = (el) => {
    let v = visMap.get(el); if (v !== undefined) return v;
    v = el.checkVisibility({ opacityProperty: true, visibilityProperty: true, contentVisibilityAuto: true });
    if (v) { const r = rectOf(el); v = W(r) >= 1 && H(r) >= 1 && !!clipRect(r, clipFor(el.parentElement)); }
    visMap.set(el, v); return v;
  };
  const pinMap = new WeakMap();
  const pinned = (el) => { if (!el || el === document.documentElement) return false; let v = pinMap.get(el); if (v === undefined) { const p = cs(el).position; v = p === 'fixed' || p === 'sticky' || pinned(el.parentElement); pinMap.set(el, v); } return v; };

  // ---- reporting helpers
  const scenes = [...(C.only ? [scope] : root.querySelectorAll(C.scene))].filter(vis);
  const seg = (e) => e.tagName.toLowerCase() + (e.id ? '#' + e.id : (e.getAttribute('class') || '').trim() ? '.' + e.getAttribute('class').trim().split(/\s+/)[0] : '');
  const pathOf = (el) => { const parts = [seg(el)]; let p = el.parentElement; while (p && root.contains(p) && p !== root && parts.length < 3) { parts.unshift(seg(p)); p = p.parentElement; } const sc = scenes.find((s) => s.contains(el) && s !== el); const head = sc && !parts[0].includes('#' + sc.id) ? '#' + sc.id + ' ' : ''; return head + parts.join('>'); };
  const snip = (s) => (s || '').replace(/\s+/g, ' ').trim().slice(0, 40);
  const px = (n) => Math.round(n * 10) / 10;
  const add = (rule, el, value, r, text) => faults[rule].push({ path: pathOf(el), text: snip(text ?? el.textContent), value, rect: r ? [Math.round(r.l + sx), Math.round(r.t + sy), Math.round(W(r)), Math.round(H(r))] : null });

  // ---- collect visible text, grouped into blocks (nearest non-inline ancestor, or the svg <text>)
  const ctx = document.createElement('canvas').getContext('2d');
  const inkCache = new Map();
  // share of the glyph content area that is empty above and below the actual ink of this string
  const inkFrac = (el, text) => {
    const s = cs(el), tt = s.textTransform; const str = (tt === 'uppercase' ? text.toUpperCase() : tt === 'lowercase' ? text.toLowerCase() : text).trim().slice(0, 200);
    const font = `${s.fontStyle} ${s.fontWeight} ${s.fontSize} ${s.fontFamily}`; const key = font + '|' + str; let v = inkCache.get(key);
    if (!v) { ctx.font = font; const m = ctx.measureText(str); const full = m.fontBoundingBoxAscent + m.fontBoundingBoxDescent; v = full > 0 ? { top: Math.max(0, (m.fontBoundingBoxAscent - m.actualBoundingBoxAscent) / full), bottom: Math.max(0, (m.fontBoundingBoxDescent - m.actualBoundingBoxDescent) / full) } : { top: 0, bottom: 0 }; inkCache.set(key, v); }
    return v;
  };
  const blocks = new Map(); const records = [];
  const blockOf = (el) => { const svg = inSvg(el); if (svg) return el.closest('text') || el; let b = el; while (b !== scope && isInline(b) && b.parentElement) b = b.parentElement; return b; };
  const walker = document.createTreeWalker(scope, NodeFilter.SHOW_TEXT);
  const range = document.createRange();
  for (let n = walker.nextNode(); n; n = walker.nextNode()) {
    if (!n.nodeValue.trim()) continue;
    const el = n.parentElement; if (!el || el.closest('script,style,noscript,template,title,desc') || !vis(el)) continue;
    range.selectNodeContents(n); const clip = clipFor(el), f = inkFrac(el, n.nodeValue);
    const rects = [...range.getClientRects()].map((r) => clipRect({ l: r.left, t: r.top, r: r.right, b: r.bottom }, clip)).filter(Boolean)
      .map((r) => ({ ...r, it: r.t + H(r) * f.top, ib: r.b - H(r) * f.bottom }));
    if (!rects.length) continue;
    const bel = blockOf(el); let b = blocks.get(bel);
    if (!b) { b = { el: bel, svg: !!inSvg(el), nodes: [], rects: [], text: '' }; blocks.set(bel, b); }
    const rec = { node: n, el, rects, block: b }; records.push(rec); b.nodes.push(rec); b.rects.push(...rects); b.text += n.nodeValue + ' ';
  }
  // group rects into lines: a rect joins a line when its vertical middle sits inside it
  const linesOf = (rects) => { const out = []; for (const r of [...rects].sort((a, b) => a.t - b.t || a.l - b.l)) { const mid = (r.t + r.b) / 2; const ln = out.find((x) => mid > x.t && mid < x.b); if (ln) { ln.l = Math.min(ln.l, r.l); ln.r = Math.max(ln.r, r.r); ln.t = Math.min(ln.t, r.t); ln.b = Math.max(ln.b, r.b); ln.it = Math.min(ln.it, r.it); ln.ib = Math.max(ln.ib, r.ib); } else out.push({ ...r }); } return out; };
  const norm = (s) => s.replace(/\s+/g, ' ').trim();
  for (const b of blocks.values()) { b.lines = linesOf(b.rects); b.text = norm(b.text); b.flow = [...b.rects]; }
  // an inline-block chip sits in its parent's line flow: count its box in the parent's lines
  for (const b of blocks.values()) { if (b.svg || !/^inline-/.test(cs(b.el).display) || !b.el.parentElement || !scope.contains(b.el.parentElement)) continue; const pb = blocks.get(blockOf(b.el.parentElement)); if (pb && pb !== b) { const r = rectOf(b.el); pb.flow.push({ ...r, it: r.t, ib: r.b }); pb.chips = true; } }
  for (const b of blocks.values()) { b.flowLines = b.chips ? linesOf(b.flow) : b.lines; b.full = b.chips ? norm(b.el.textContent) : b.text; b.words = b.full ? b.full.split(' ').length : 0; }
  const union = (rs) => rs.reduce((a, r) => ({ l: Math.min(a.l, r.l), t: Math.min(a.t, r.t), r: Math.max(a.r, r.r), b: Math.max(a.b, r.b) }), { l: 1e9, t: 1e9, r: -1e9, b: -1e9 });

  // ---- LB1 orphan, LB2 squeezed
  const LB1_SEL = 'h1,h2,h3,h4,h5,h6,label,button,figcaption,caption,li,p,summary,dt,dd,[class*="label"],[class*="caption"]';
  for (const b of blocks.values()) {
    const L = b.flowLines; if (b.svg || L.length < 2 || b.el.querySelector('br')) continue;
    const n = L.length, s = cs(b.el);
    const cw = b.el.clientWidth - (parseFloat(s.paddingLeft) || 0) - (parseFloat(s.paddingRight) || 0);
    const cand = b.el.closest(LB1_SEL);
    const whole = cand && (cand === b.el || norm(cand.textContent) === b.full);
    if (whole && n <= T.ORPHAN_MAX_LINES && cw > 0) { const last = L[n - 1], frac = W(last) / cw; if (frac < T.ORPHAN_LAST_LINE_FRAC) add('LB1', b.el, `last line ${Math.round(frac * 100)}% (${Math.round(W(last))}/${Math.round(cw)}px), ${n} lines`, union(L), b.full.split(' ').slice(-6).join(' ')); }
    if (b.words < T.SQUEEZE_MAX_WORDS && n >= T.SQUEEZE_MIN_LINES) add('LB2', b.el, `${b.words} words on ${n} lines, ${Math.round(cw)}px wide`, union(L), b.full);
  }

  // ---- LB3 mid-word break
  const tops = (rs) => { const t = []; for (const r of rs) if (r.width > 0.5 && !t.some((x) => Math.abs(x - r.top) < 3)) t.push(r.top); return t.length; };
  for (const rec of records) {
    if (rec.block.svg || linesOf(rec.rects).length < 2 || cs(rec.el).hyphens === 'auto') continue;
    const txt = rec.node.nodeValue;
    for (const tok of txt.matchAll(/\S+/g)) {
      if (/­/.test(tok[0]) || /^(https?:|www\.)|\.[a-z]{2,}\//i.test(tok[0])) continue;
      for (const w of tok[0].matchAll(/[^\-‐-―\/\\​]+/g)) {
        if (w[0].length < 2) continue;
        const st = tok.index + w.index; range.setStart(rec.node, st); range.setEnd(rec.node, st + w[0].length);
        if (tops(range.getClientRects()) > 1) { const r = range.getBoundingClientRect(); add('LB3', rec.el, `"${w[0].slice(0, 30)}" split over 2 lines`, { l: r.left, t: r.top, r: r.right, b: r.bottom }, tok[0]); }
      }
    }
  }

  // ---- LB5 a line that starts with a punctuation mark
  for (const rec of records) {
    if (rec.block.svg) continue;
    const m = /^[\s\u2060]*([.,:!?)])/.exec(rec.node.nodeValue); if (!m) continue;
    const at = m[0].length - 1; range.setStart(rec.node, at); range.setEnd(rec.node, at + 1);
    const r = range.getBoundingClientRect(); if (r.width < 0.5) continue;
    const L = rec.block.flowLines, mid = (r.top + r.bottom) / 2, k = L.findIndex((x) => mid > x.t && mid < x.b);
    if (k > 0 && r.left - L[k].l < 2) add('LB5', rec.block.el, `"${m[1]}" starts line ${k + 1}`, { l: r.left, t: r.top, r: r.right, b: r.bottom }, rec.node.nodeValue);
  }

  // ---- LB4 wrap style
  const wrap = (el) => { const s = cs(el); return s.textWrapStyle || s.textWrap || ''; };
  for (const h of scope.querySelectorAll('h1,h2,h3,h4')) if (vis(h) && !/balance/.test(wrap(h))) add('LB4', h, `text-wrap: ${wrap(h) || 'unset'}`, rectOf(h));
  for (const p of scope.querySelectorAll('p')) if (vis(p) && !/pretty|balance/.test(wrap(p))) add('LB4p', p, `text-wrap: ${wrap(p) || 'unset'}`, rectOf(p));

  // ---- shared leaf boxes for the space rules
  const all = [...scope.querySelectorAll('*')].filter((e) => !inSvg(e) && vis(e));
  const painted = all.filter((e) => !isInline(e) && (hasBg(e) || hasBorder(e)));
  const paintedSet = new Set(painted);
  const leaves = []; // {el, r, kind}
  for (const rec of records) for (const r of rec.rects) leaves.push({ el: rec.el, r, kind: 'text' });
  for (const e of all) if (e.matches('svg,img,canvas,video,iframe,button,input,select,textarea,progress,meter')) { const r = clipRect(rectOf(e), clipFor(e.parentElement)); if (r) leaves.push({ el: e, r, kind: 'media' }); }
  for (const e of painted) { const r = clipRect(rectOf(e), clipFor(e.parentElement)); if (r && W(r) >= 8 && H(r) >= 8) leaves.push({ el: e, r, kind: e.children.length === 0 ? 'shape' : 'box' }); }

  // ---- SP1 empty panel
  for (const p of painted) {
    if (p === root || p === scope) continue;
    if (/^(IFRAME|IMG|VIDEO|CANVAS|OBJECT|EMBED)$/.test(p.tagName)) continue; // replaced content: the gate cannot see inside, so it is not empty
    const r = rectOf(p); if (W(r) <= T.PANEL_MIN_W || H(r) <= T.PANEL_MIN_H) continue;
    const vis = clipRect(r, clipFor(p.parentElement)); if (!vis || H(vis) < H(r) - 1) continue; // partly scrolled out of a clipping ancestor: its children are clipped, the panel box is not, so the gap is not real
    if (clipsX(p) && p.scrollWidth > p.clientWidth + 1) continue; // horizontal scroller: its content is wider than the box
    const cb = inner(p, true); let maxB = -1e9, maxR = -1e9, n = 0;
    for (const lf of leaves) {
      if (lf.el === p || !p.contains(lf.el)) continue;
      if (lf.kind === 'box' || lf.kind === 'shape') { if (W(lf.r) >= 0.95 * W(r) && H(lf.r) >= 0.95 * H(r)) continue; } // full overlay
      n++; maxB = Math.max(maxB, lf.r.b); maxR = Math.max(maxR, lf.r.r);
    }
    if (!n) { if (cs(p).backgroundImage === 'none') add('SP1', p, `no content, ${Math.round(W(r))}x${Math.round(H(r))}px`, r, ''); continue; }
    const bot = (cb.b - maxB) / H(r), rig = (cb.r - maxR) / W(r);
    if (bot > T.PANEL_SLACK_FRAC) add('SP1', p, `bottom ${Math.round(bot * 100)}% empty (${Math.round(cb.b - maxB)} of ${Math.round(H(r))}px)`, r);
    else if (rig > T.PANEL_SLACK_FRAC) add('SP1', p, `right ${Math.round(rig * 100)}% empty (${Math.round(cb.r - maxR)} of ${Math.round(W(r))}px)`, r);
  }

  // ---- SP2 narrow content
  if (vw >= T.NARROW_MIN_VW) for (const sc of scenes) {
    const cb = inner(sc, true); let l = 1e9, r = -1e9;
    for (const lf of leaves) if (lf.kind !== 'box' && sc.contains(lf.el) && lf.el !== sc) { l = Math.min(l, lf.r.l); r = Math.max(r, lf.r.r); }
    if (r < l) continue;
    const used = Math.min(r, cb.r) - Math.max(l, cb.l), frac = used / W(cb);
    if (frac < T.NARROW_USED_FRAC) add('SP2', sc, `content uses ${Math.round(frac * 100)}% (${Math.round(used)} of ${Math.round(W(cb))}px)`, rectOf(sc), sc.id);
  }

  // ---- SP3 uneven row
  for (const parent of [scope, ...all]) {
    if (parent.children.length < 2) continue;
    const cards = [...parent.children].filter((c) => paintedSet.has(c) && !pinned(c) && !['absolute', 'fixed'].includes(cs(c).position) && !/span/.test(cs(c).gridRowEnd + cs(c).gridRowStart)).map((c) => ({ c, r: rectOf(c) })).filter((x) => W(x.r) >= T.CARD_MIN_W && H(x.r) >= T.CARD_MIN_H).sort((a, b) => a.r.t - b.r.t);
    for (let i = 0; i < cards.length;) {
      let j = i + 1; while (j < cards.length && Math.abs(cards[j].r.t - cards[i].r.t) <= T.ROW_TOP_TOL) j++;
      const row = cards.slice(i, j); i = j; if (row.length < 2) continue;
      const hs = row.map((x) => H(x.r)), mx = Math.max(...hs), mn = Math.min(...hs);
      if ((mx - mn) / mx > T.ROW_HEIGHT_DIFF) add('SP3', parent, `${row.length} cards, heights ${Math.round(mn)} to ${Math.round(mx)}px (${Math.round(((mx - mn) / mx) * 100)}% apart)`, union(row.map((x) => x.r)), row[0].c.textContent);
    }
  }

  // ---- LN1, LN2, LN3
  const info = { viewport: [vw, vh], scenes: [] };
  for (const sc of scenes) { const h = H(rectOf(sc)); info.scenes.push({ id: sc.id, h: Math.round(h), vp: px(h / vh) }); if (h / vh > C.limits.scene) add('LN1', sc, `${px(h / vh)} viewports (${Math.round(h)}px, limit ${C.limits.scene})`, rectOf(sc), sc.id); }
  if (!C.only) {
    const rh = H(rectOf(root)); info.rootHeight = Math.round(rh); info.rootViewports = px(rh / vh);
    if (rh / vh > C.limits.page) add('LN2', root, `${px(rh / vh)} viewports (${Math.round(rh)}px, limit ${C.limits.page})`, null, '');
    info.words = records.reduce((a, r) => a + r.node.nodeValue.trim().split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w)).length, 0);
    if (info.words > C.words) add('LN3', root, `${info.words} words (budget ${C.words})`, null, '');
  }

  // ---- CR1 edge crowding
  for (const b of blocks.values()) {
    let a = b.svg ? b.el.ownerSVGElement?.parentElement : b.el, kind = null;
    for (; a && root.contains(a); a = a.parentElement) {
      if (isInline(a)) continue;
      const s = cs(a), clip = [s.overflowX, s.overflowY].some((o) => o === 'hidden' || o === 'clip');
      // text inside a box that really scrolls (a pannable map) is scrolled content, not crowding, so CR1 skips it
      if ([s.overflowX, s.overflowY].some((o) => o === 'auto' || o === 'scroll') && (a.scrollWidth > a.clientWidth + 1 || a.scrollHeight > a.clientHeight + 1)) { kind = null; break; }
      if (hasBg(a) || (clip && (a.scrollWidth > a.clientWidth + 1 || a.scrollHeight > a.clientHeight + 1))) { kind = 'all'; break; } // a clip box only counts when it really cuts content if (hasBorder(a)) { kind = 'border'; break; }
    }
    if (!kind) continue;
    const u = union(b.lines), it = Math.min(...b.lines.map((l) => l.it)), ib = Math.max(...b.lines.map((l) => l.ib));
    const e = inner(a, false), bw = borders(a);
    const chip = b.lines.length === 1 && H(e) < 2 * H(b.lines[0]); // pill, badge or button hugging one line: only its side padding is judged
    const on = (i) => (kind === 'all' || bw[i] > 0) && !(chip && i % 2 === 0);
    const d = [['top', it - e.t, on(0)], ['right', e.r - u.r, on(1)], ['bottom', e.b - ib, on(2)], ['left', u.l - e.l, on(3)]].filter((x) => x[2]).sort((x, y) => x[1] - y[1])[0];
    if (d && d[1] < T.EDGE_MIN - 0.25) add('CR1', b.el, `${px(d[1])}px to ${d[0]} edge of ${seg(a)}`, u, b.text);
  }

  // ---- CR2 text overlap
  const items = []; for (const b of blocks.values()) if (!pinned(b.el)) for (const l of b.lines) items.push({ b, l });
  items.sort((x, y) => x.l.it - y.l.it); const seen = new Set();
  for (let i = 0; i < items.length; i++) for (let j = i + 1; j < items.length && items[j].l.it < items[i].l.ib - T.OVERLAP_MIN; j++) {
    const A = items[i], B = items[j]; if (A.b === B.b || A.b.el.contains(B.b.el) || B.b.el.contains(A.b.el)) continue;
    const ox = Math.min(A.l.r, B.l.r) - Math.max(A.l.l, B.l.l), oy = Math.min(A.l.ib, B.l.ib) - Math.max(A.l.it, B.l.it);
    if (ox > T.OVERLAP_MIN && oy > T.OVERLAP_MIN) { const k = [...blocks.keys()].indexOf(A.b.el) + ':' + [...blocks.keys()].indexOf(B.b.el); if (seen.has(k)) continue; seen.add(k); add('CR2', A.b.el, `overlaps "${snip(B.b.text).slice(0, 24)}" by ${Math.round(ox)}x${Math.round(oy)}px`, union([A.l, B.l]), A.b.text); }
  }

  // ---- CR3 tap target
  for (const e of scope.querySelectorAll('button,a,input:not([type=hidden]),summary,[role=button]')) {
    if (!vis(e)) continue;
    if ((e.tagName === 'A' || e.tagName === 'BUTTON') && /^inline/.test(cs(e).display) && !/flex|grid/.test(cs(e.parentElement).display)) { let blk = e.parentElement; while (blk.parentElement && /^inline/.test(cs(blk).display)) blk = blk.parentElement; if ((blk.textContent || '').trim().length > (e.textContent || '').trim().length + 2) continue; }
    const lab = e.tagName === 'INPUT' && (e.closest('label') || (e.id && document.querySelector(`label[for="${CSS.escape(e.id)}"]`)));
    let r = rectOf(e); if (lab && vis(lab)) { const lr = rectOf(lab); if (W(lr) * H(lr) > W(r) * H(r)) r = lr; }
    if (H(r) < T.TAP_MIN - 0.25 || W(r) < T.TAP_MIN - 0.25) add('CR3', e, `${Math.round(W(r))}x${Math.round(H(r))}px`, r, e.textContent || e.getAttribute('aria-label') || e.type);
  }

  // ---- CR4 small text
  const small = new Set();
  for (const rec of records) {
    if (small.has(rec.el)) continue;
    let fsz = parseFloat(cs(rec.el).fontSize);
    if (inSvg(rec.el)) { const m = rec.el.getScreenCTM?.(); if (m) fsz *= Math.sqrt(Math.abs(m.a * m.d - m.b * m.c)); }
    if (fsz < T.FONT_MIN - 0.05) { small.add(rec.el); add('CR4', rec.el, `${px(fsz)}px`, union(rec.rects), rec.node.nodeValue); }
  }

  // ---- CR5 overflow
  const de = document.documentElement;
  if (de.scrollWidth > vw) add('CR5', de, `page scrollWidth ${de.scrollWidth} > ${vw}`, null, '');
  const contained = (el) => { for (let p = el.parentElement; p && p !== de; p = p.parentElement) if (clipsX(p) && p !== document.body) return true; return false; };
  const off = new Set();
  for (const e of all) { const r = rectOf(e); if (r.r > vw + 1 && !contained(e)) { if (!off.has(e.parentElement)) add('CR5', e, `right edge at ${Math.round(r.r)}px, viewport ${vw}px`, r); off.add(e); } }

  const counts = {}; for (const r of C.RULES) counts[r] = faults[r].length;
  return { counts, faults, info };
}

// ---------------------------------------------------------------- chrome over CDP
const freePort = () => new Promise((res, rej) => { const s = net.createServer(); s.unref(); s.on('error', rej); s.listen(0, '127.0.0.1', () => { const p = s.address().port; s.close(() => res(p)); }); });
let chrome, profile, ws;
function cleanup() {
  try { ws?.close(); } catch {}
  try { chrome?.kill('SIGKILL'); } catch {}
  chrome = null;
  if (profile) for (let i = 0; i < 5; i++) { try { fs.rmSync(profile, { recursive: true, force: true }); break; } catch { /* chrome still letting go */ } }
}
process.on('exit', cleanup);
for (const sig of ['SIGINT', 'SIGTERM', 'SIGHUP']) process.on(sig, () => { cleanup(); process.exit(130); });

async function launch() {
  if (!fs.existsSync(CHROME)) throw new Error('Google Chrome not found at ' + CHROME + ' (set CHROME_PATH)');
  const port = await freePort();
  profile = fs.mkdtempSync(path.join(os.tmpdir(), 'layout-check-'));
  chrome = spawn(CHROME, ['--headless=new', `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, '--hide-scrollbars', '--no-first-run', '--no-default-browser-check', '--disable-extensions', 'about:blank'], { stdio: 'ignore' });
  let tabs;
  for (let i = 0; i < 80 && !tabs; i++) { try { tabs = await (await fetch(`http://127.0.0.1:${port}/json`)).json(); } catch { await sleep(250); } }
  if (!tabs) throw new Error('Chrome did not open its debugging port');
  ws = new WebSocket(tabs.find((t) => t.type === 'page').webSocketDebuggerUrl);
  await new Promise((r, j) => { ws.addEventListener('open', r); ws.addEventListener('error', j); });
  let id = 0; const pending = new Map();
  ws.addEventListener('message', (e) => {
    const m = JSON.parse(e.data);
    if (m.id && pending.has(m.id)) { pending.get(m.id)(m.error ? { __error: m.error } : m.result); pending.delete(m.id); }
  });
  const send = (method, params = {}) => new Promise((r) => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
  const ev = async (expression) => { const r = await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true }); if (r.__error || r.exceptionDetails) throw new Error('page evaluate failed: ' + (r.exceptionDetails?.exception?.description || r.exceptionDetails?.text || JSON.stringify(r.__error))); return r.result?.value; };
  await send('Page.enable'); await send('Runtime.enable');
  return { send, ev };
}

// scroll through the page once so scroll-triggered reveals fire, then settle finite animations
const SETTLE = `(async()=>{const st=document.createElement('style');st.textContent='astro-dev-toolbar{display:none!important}';document.head.appendChild(st);
const z=(ms)=>new Promise(r=>setTimeout(r,ms));const H=()=>document.documentElement.scrollHeight;
for(let y=0;y<H();y+=Math.round(innerHeight*0.8)){scrollTo({top:y,behavior:'instant'});await z(90);}
scrollTo({top:0,behavior:'instant'});await z(500);
for(const a of document.getAnimations()){try{if(a.effect?.getComputedTiming().endTime!==Infinity)a.finish()}catch{}}await z(100);return true})()`;

async function run(cdp, reader, width, theme, state) {
  const hash = [reader ? 'reader=' + reader : null, state].filter(Boolean).join('&');
  const vp = bucket(width);
  await cdp.send('Emulation.setDeviceMetricsOverride', { width, height: vp.h, deviceScaleFactor: 1, mobile: width < 500 });
  await cdp.send('Emulation.setEmulatedMedia', { media: '', features: [{ name: 'prefers-color-scheme', value: theme }] });
  await cdp.send('Page.navigate', { url: 'about:blank' }); await sleep(80); // a hash-only change would not reload
  let nav;
  for (let i = 0; i < 4; i++) { // a fresh Chrome can refuse localhost once before it tries IPv6
    nav = await cdp.send('Page.navigate', { url: cfg.url + (hash ? '#' + hash : '') });
    if (!nav.errorText) break;
    await sleep(600);
  }
  if (nav.errorText) throw new Error(`cannot load ${cfg.url}: ${nav.errorText}`);
  for (let i = 0; i < 150; i++) { // load event, polled so a dev-server reload mid-navigation cannot strand us
    try { if (await cdp.ev(`location.href!=='about:blank'&&document.readyState==='complete'`)) break; } catch {}
    await sleep(200);
  }
  // sites that theme through a data-theme attribute instead of the media query get the attribute too
  await cdp.ev(`(()=>{const d=document.documentElement;if(d.dataset.theme&&d.dataset.theme!=='${theme}')d.dataset.theme='${theme}'})()`);
  await cdp.ev('document.fonts.ready.then(()=>true)');
  await sleep(800);
  await cdp.ev(SETTLE);
  const C = { T, RULES, root: cfg.root, scene: cfg.scene, only: cfg.only, words: cfg.words, limits: { scene: (cfg.sceneAllow && cfg.sceneAllow[0].split('|').some((k) => `${reader || '-'}+${state || ''}`.includes(k))) ? Math.max(vp.scene, Number(cfg.sceneAllow[1])) : vp.scene, page: (cfg.pageAllow && cfg.pageAllow[vp.min] != null) ? Math.max(vp.page, cfg.pageAllow[vp.min]) : vp.page } };
  const res = await cdp.ev(`(${measureInPage.toString()})(${JSON.stringify(C)})`);
  if (res.error) throw new Error(res.error);
  return { reader, width, height: vp.h, theme, state, label: `${reader || '-'}${state ? '+' + state : ''}@${width}/${theme}`, ...res };
}

// outlined screenshots of the first examples of each rule, for eyeballing false positives
async function shots(cdp, r, dir, done) {
  fs.mkdirSync(dir, { recursive: true });
  for (const rule of RULES) {
    if (done.has(rule)) continue;
    const ex = r.faults[rule].filter((f) => f.rect).filter((f, i, a) => a.findIndex((g) => g.path === f.path) === i).slice(0, Number(opt['shot-n'] || 2)); if (!ex.length) continue; done.add(rule);
    for (const [i, f] of ex.entries()) {
      const [x, y, w, h] = f.rect, pad = 48;
      await cdp.ev(`(()=>{const d=document.createElement('div');d.id='__lc_mark';d.style.cssText='position:absolute;z-index:2147483647;pointer-events:none;outline:2px solid #f0f;outline-offset:2px;left:${x}px;top:${y}px;width:${w}px;height:${h}px';document.documentElement.appendChild(d)})()`);
      const s = await cdp.send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, clip: { x: Math.max(0, x - pad), y: Math.max(0, y - pad), width: Math.min(w + 2 * pad, 1600), height: Math.min(h + 2 * pad, 1400), scale: 1 } });
      await cdp.ev(`document.getElementById('__lc_mark')?.remove()`);
      if (s.data) fs.writeFileSync(path.join(dir, `${rule}-${i + 1}-${r.label.replace(/[^\w]+/g, '_')}.png`), Buffer.from(s.data, 'base64'));
    }
  }
}

// ---------------------------------------------------------------- main
async function main() {
  const cdp = await launch();
  const runs = []; const shotDone = new Set();
  for (const reader of cfg.readers) for (const state of cfg.states) for (const width of cfg.widths) for (const theme of cfg.themes) {
    const r = await run(cdp, reader, width, theme, state);
    if (opt.shots) await shots(cdp, r, opt.shots, shotDone);
    runs.push(r);
  }
  cleanup();

  // table: one row per run, one column per rule
  const pad = (s, n) => String(s).padEnd(n), lw = Math.max(18, ...runs.map((r) => r.label.length)) + 1;
  console.log(`layout-check ${cfg.url}  root=${cfg.root}  scene=${cfg.scene}${cfg.only ? '  only=' + cfg.only : ''}`);
  if (allowNote) console.log(allowNote);
  console.log(pad('run', lw) + RULES.map((r) => pad(r, 5)).join('') + ' words  page');
  const totals = Object.fromEntries(RULES.map((r) => [r, 0]));
  for (const r of runs) {
    for (const k of RULES) totals[k] += r.counts[k];
    console.log(pad(r.label, lw) + RULES.map((k) => pad(r.counts[k] || '.', 5)).join('') + ' ' + pad(r.info.words ?? '-', 6) + ' ' + (r.info.rootViewports ?? '-') + 'vp');
  }
  console.log(pad('TOTAL', lw) + RULES.map((k) => pad(totals[k] || '.', 5)).join(''));

  // examples: up to 8 distinct per rule across runs
  for (const k of RULES) {
    if (!totals[k] || WARN_ONLY.has(k)) continue;
    const seen = new Map();
    for (const r of runs) for (const f of r.faults[k]) { const key = f.path + '|' + f.text; if (!seen.has(key)) seen.set(key, { ...f, run: r.label, n: 0 }); seen.get(key).n++; }
    console.log(`\n${k} ${NAMES[k]}: ${totals[k]} (${seen.size} distinct)`);
    for (const f of [...seen.values()].slice(0, EXAMPLES_PER_RULE)) console.log(`  ${f.path}  "${f.text}"  ${f.value}  [${f.run}${f.n > 1 ? ', x' + f.n : ''}]`);
  }

  const faultTotal = RULES.filter((k) => !WARN_ONLY.has(k)).reduce((a, k) => a + totals[k], 0);
  const warnTotal = [...WARN_ONLY].reduce((a, k) => a + totals[k], 0);
  if (opt.json) {
    fs.mkdirSync(path.dirname(path.resolve(opt.json)), { recursive: true });
    const out = { url: cfg.url, root: cfg.root, scene: cfg.scene, only: cfg.only, thresholds: T, viewports: VIEWPORTS, wordBudget: cfg.words, totals, faultTotal, warnTotal, runs: runs.map((r) => ({ ...r, faults: Object.fromEntries(RULES.map((k) => [k, r.faults[k].slice(0, JSON_CAP)])) })) };
    fs.writeFileSync(opt.json, JSON.stringify(out, null, 1));
  }
  console.log(`\nTOTAL ${faultTotal} faults, ${warnTotal} warnings across ${runs.length} runs: ${faultTotal ? 'FAIL' : 'PASS'}${opt.json ? '  json: ' + opt.json : ''}`);
  process.exitCode = faultTotal ? 1 : 0;
}

main().catch((e) => { console.error('layout-check: ' + (e?.message || e)); cleanup(); process.exit(2); });
