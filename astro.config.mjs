import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://models-to-margins.pages.dev',
  output: 'static',
  markdown: {
    shikiConfig: {
      theme: 'github-dark'
    }
  }
});
