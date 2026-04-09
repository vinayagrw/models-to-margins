import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://models-to-margins.vinayagrw.workers.dev',
  output: 'static',
  markdown: {
    shikiConfig: {
      theme: 'github-dark'
    }
  }
});
