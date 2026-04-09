# Cloudflare Pages Setup

This repo is ready to deploy on Cloudflare Pages as a static Astro site.

> [!NOTE]
> The current public hostname for this project is `https://models-to-margins.vinayagrw.workers.dev`.
> Keep internal routes and asset references root-relative so the same build works there cleanly without rewriting links.

## Prerequisites

- A GitHub repo containing `C:\Users\viagr\Documents\Vinay\git\models-to-margins`
- A Cloudflare account
- Node.js installed locally for preview and build validation

## 1. Push the repo to GitHub

From the repo root:

```powershell
cd C:\Users\viagr\Documents\Vinay\git\models-to-margins
git init
git add .
git commit -m "Initial site"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

If the repo already exists on GitHub, just push the current branch.

## 2. Create the Cloudflare Pages project

1. Sign in to Cloudflare.
2. Open `Workers & Pages`.
3. Click `Create application`.
4. Choose `Pages`.
5. Choose `Connect to Git`.
6. Authorize GitHub if needed.
7. Select the `models-to-margins` repository.

## 3. Configure build settings

Use these settings for this repo:

- Framework preset: `Astro`
- Build command: `npm run build`
- Build output directory: `dist`
- Root directory: leave empty unless the repo is nested in a monorepo

Cloudflare should detect Astro automatically, but these values are the source of truth.

## 4. Deploy

Click `Save and Deploy`.

Cloudflare will build the site and give you a default URL like:

- `https://models-to-margins.pages.dev`

That `pages.dev` address is the Cloudflare-generated default. For this repo, treat `https://models-to-margins.vinayagrw.workers.dev` as the canonical public hostname in metadata, screenshots, and shared documentation unless you intentionally switch to a custom domain later.

## 5. Add a custom domain

After the first successful deploy:

1. Open the Pages project.
2. Go to `Custom domains`.
3. Click `Set up a custom domain`.
4. Enter your domain or subdomain.
5. Follow Cloudflare’s DNS prompts.

## 6. Automatic deploys

Once the GitHub repo is connected:

- every push to the production branch triggers a new deploy
- preview deployments are available for pull requests and non-production branches if enabled in Cloudflare

## 7. Local preview

Run these commands from the repo root:

```powershell
cd C:\Users\viagr\Documents\Vinay\git\models-to-margins
npm install
npm run dev
```

For a production-style local check:

```powershell
npm run build
npm run preview
```

## 8. Static visual assets

This repo includes handcrafted HTML visuals in `public/visuals/...`.

That means:

- files under `public/visuals/` are copied directly into the published site
- no extra build step is needed for those HTML/SVG/JS assets
- routes such as `/visuals/procurement-ai/command-center.html` and `/visuals/model-strategy/private-ai-vs-public-ai-architecture.html` will deploy as static files

## 9. Recommended publish check

Before pushing:

```powershell
cd C:\Users\viagr\Documents\Vinay\git\models-to-margins
npm run build
```

If the build passes locally, Cloudflare Pages should be using the same output contract:

- Astro builds the site
- generated output goes to `dist`

## 10. Hostname rule for this repo

- Canonical metadata lives in `astro.config.mjs` and currently points to `https://models-to-margins.vinayagrw.workers.dev`
- In app code, prefer root-relative paths like `/briefs`, `/deep-dives`, and `/visuals/...`
- Avoid hardcoding `pages.dev` in page templates, raw visuals, or shared components
