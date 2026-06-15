# Visitor Analytics — Privacy & Legal Note

This site captures visitor data on every public page via `/api/collect` and stores
it (Cloudflare KV in production, a local JSONL file in dev, in-memory as a fallback).
A hidden dashboard at `/admin/insights` (secret-gated by `INSIGHTS_TOKEN`) visualizes it.

## What is collected
IP address, approximate geolocation (country/region/city/coords from Cloudflare),
ISP/ASN, timezone, full URL + referrer + UTM params, browser/OS/device, screen and
viewport, language, a canvas/WebGL fingerprint, a first-party session id, visit
count, time-on-page, and clicked links.

## Legal reality
IP address, geolocation, and device fingerprints are **personal data** under GDPR and
similar laws, and fingerprinting/analytics fall under ePrivacy. Collecting this
without consent carries legal risk depending on your visitors' jurisdictions. You,
the site owner, are the data controller and accept that responsibility. This feature
ships with **no consent banner** by deliberate choice — add one if your audience or
jurisdiction requires it.

## Recommended privacy-policy line
> "We collect technical and usage data — including IP address, approximate location,
> device and browser characteristics, and pages visited — to understand site traffic.
> Contact <email> to request access or deletion."

## How to disable or reduce collection
- **Disable entirely:** remove the beacon `<script>` block from
  `src/layouts/BaseLayout.astro` and redeploy.
- **Anonymize IPs:** in `functions/_shared/enrich.js`, truncate the last octet/hextet
  of `ip` inside `extractGeo` before returning it.
- **Drop fingerprinting:** remove `canvas`/`webgl` from the beacon payload
  (`public/scripts/beacon.js`) and from the `fingerprint` allowlist in
  `sanitizeClient` (`functions/_shared/enrich.js`).

## Securing the dashboard
- Set `INSIGHTS_TOKEN` to a long, random secret in the Cloudflare Pages project
  environment variables (Production + Preview). If it is unset, `/api/events` and the
  dashboard return a bland 404 and never leak data.
- The token gate uses a constant-time comparison to avoid timing oracles.
