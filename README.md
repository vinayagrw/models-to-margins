# Models to Margins


Translating AI, operations, and industry complexity into business value and measurable outcomes.
## Why this structure

- `src/content` uses Astro content collections for typed, reusable editorial content.
- `src/pages` gives clean URLs instead of export-style filenames.
- `public/visuals` keeps handcrafted interactive HTML assets intact for fast static deployment.
- The homepage, section indexes, and individual entry routes all share one layout and metadata system.

## Current content

- Brief: SpendHQ + Sligo AI procurement opportunity study
- Deep dive: Future of Work 2026
- Signal: Governed Procurement AI note
- Visuals: Procurement command center and procurement architecture map

## Local setup

```bash
npm install
npm run dev
```

## Cloudflare Pages

This site is configured as a static Astro site. Per Astro and Cloudflare docs, a static Astro site does not need the Cloudflare adapter.

Use these Cloudflare Pages settings:

- Framework preset: `Astro`
- Build command: `npm run build`
- Build output directory: `dist`

## Publishing pattern

1. Add a new Markdown file in the right content collection.
2. Add any interactive HTML artifact to `public/visuals/<topic>/...`.
3. Create a metadata wrapper in `src/content/visuals`.
4. Deploy the repo through Cloudflare Pages.

## Suggested repo name

`models-to-margins`
