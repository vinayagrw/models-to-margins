import { defineConfig } from 'astro/config';
import analyticsDev from './src/integrations/analytics-dev.mjs';

export default defineConfig({
  site: 'https://models-to-margins.vinayagrw.workers.dev',
  output: 'static',
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
