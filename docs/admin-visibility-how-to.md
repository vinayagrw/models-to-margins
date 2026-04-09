# Admin Visibility Editor How-To

This guide is for maintainers working in the local repo.

The visibility editor controls which pages are **visible inside the app**, not whether a route exists at all.

## What the editor controls

The dashboard at `/admin/visibility` manages `src/data/app-visibility.json`.

It can hide or show:

- top-level app pages such as `page:/`, `page:/briefs`, and `page:/deep-dives`
- individual content entries such as `brief:<id>` and `deep-dive:<id>`

The app uses this config across:

- primary navigation
- homepage surfaces
- collection index pages
- featured-entry selection

## Hidden vs direct URL access

Hidden means **removed from app discovery surfaces**.

Hidden does **not** mean unpublished.

Examples:

- If you hide `page:/briefs`, the Brief link disappears from primary nav and homepage discovery surfaces, but `/briefs` still loads directly.
- If you hide `brief:governed-procurement-ai`, it disappears from `/briefs` and homepage brief surfaces, but `/briefs/governed-procurement-ai` still loads directly.
- Raw HTML files under `public/visuals/...` remain direct static assets and embed infrastructure by design.

## How to use the dashboard

1. Run the site locally and open `/admin/visibility`.
2. Find the section you want to edit:
   - Top-level pages
   - Brief entries
   - Deep dives
3. Use the checkbox to control whether that route is visible in the app.
4. Watch the JSON preview update on the left.
5. Save the config back into `src/data/app-visibility.json`.
6. Rebuild and redeploy the site.

## What each button does

- `Save config file`: opens the browser file picker when supported so you can save directly to `src/data/app-visibility.json`
- `Download JSON`: downloads the current config as a JSON file
- `Copy JSON`: copies the current JSON to the clipboard
- `Reset to current`: restores the dashboard to the repo's current saved config
- `Import JSON`: loads a JSON file into the editor so you can preview and continue editing it

## How `listed: false` interacts with the dashboard

The editor cannot override content frontmatter that is already excluded from discovery.

If a content file has:

```yaml
listed: false
```

that item stays hidden even if it does not appear in `hiddenRouteIds`.

Think of it this way:

- `listed: false` = hidden by default in content metadata
- `hiddenRouteIds` = additional app-level hide rules for otherwise listed content

## Worked example: hide a live brief without removing its direct URL

Goal: remove `Governed Procurement AI` from app discovery surfaces without deleting the route.

1. Open `/admin/visibility`.
2. In `Brief entries`, find `Governed Procurement AI`.
3. Uncheck the toggle.
4. Confirm the JSON preview now includes:

```json
{
  "hiddenRouteIds": [
    "brief:governed-procurement-ai"
  ]
}
```

5. Save that JSON into `src/data/app-visibility.json`.
6. Rebuild the site.

Result:

- the item disappears from `/briefs`
- homepage brief surfaces stop promoting it
- `/briefs/governed-procurement-ai` still works directly
- `public/visuals/procurement-ai/command-center.html` still exists as a raw asset

## Worked example: hide Brief from primary navigation and homepage discovery

Goal: keep the Brief page live, but remove it from primary nav and homepage discovery surfaces.

1. Open `/admin/visibility`.
2. In `Top-level pages`, find `Brief`.
3. Uncheck the toggle.
4. Save the JSON so it contains `page:/briefs` in `hiddenRouteIds`.

Example:

```json
{
  "hiddenRouteIds": [
    "page:/briefs"
  ]
}
```

Result:

- the `Brief` nav item disappears
- the homepage no longer promotes brief cards
- `/briefs` still loads directly

## File to commit

The source of truth is:

`src/data/app-visibility.json`

If you used download, copy, or import during editing, make sure the repo file itself reflects the final JSON before committing.

## Verification

After changing visibility:

1. Run `npm run build`
2. Check the relevant pages in `dist`
3. Verify hidden items are gone from app surfaces but still reachable by direct route when that is expected
