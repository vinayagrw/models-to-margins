import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://models-to-margins.vinayagrw.workers.dev',
  output: 'static',
  server: {
    port: Number(process.env.PORT) || 4321
  },
  markdown: {
    shikiConfig: {
      theme: 'github-dark'
    }
  }
});
