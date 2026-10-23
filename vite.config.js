import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
// Week 12: GitHub Pages serves the app from https://czen0018.github.io/fit5032-week1/,
// so the production build made by GitHub Actions needs the repository name as base.
// The workflow sets GITHUB_PAGES=true. Local dev and the Cloudflare deployment (Week 11)
// are served from the domain root, so they keep base '/'.
export default defineConfig({
  base: process.env.GITHUB_PAGES === 'true' ? '/fit5032-week1/' : '/',
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
