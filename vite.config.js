import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import prerender from '@prerenderer/rollup-plugin'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    prerender({
      routes: ['/'], // Add any extra paths here if you have multiple pages, e.g. ['/', '/about']
      renderer: '@prerenderer/renderer-puppeteer',
    }),
  ],
})