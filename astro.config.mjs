import { defineConfig } from 'astro/config';
import analyticsDev from './src/integrations/analytics-dev.mjs';

export default defineConfig({
  site: 'https://models-to-margins.vinayagrw.workers.dev',
  output: 'static',
  redirects: {
    // Archived 2026-10-24, restored 2026-10-24 except the older payment pages, which the agentic payouts desk replaces
    '/deep-dives/decision-replay': '/deep-dives/agentic-payouts-desk',
    '/deep-dives/payouts-decision-desk': '/deep-dives/agentic-payouts-desk',
    '/deep-dives/ai-in-one-payout': '/deep-dives/agentic-payouts-desk',
    '/deep-dives/payouts-replay': '/deep-dives/agentic-payouts-desk',
    '/deep-dives/stablecoin-b2b-payouts': '/deep-dives/agentic-payouts-desk'
  },
  integrations: [analyticsDev()],
  server: {
    port: Number(process.env.PORT) || 4321
  },
  markdown: {
    shikiConfig: {
      theme: 'github-dark'
    }
  }
});
