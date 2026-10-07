import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Prerendering happens after the build (see scripts/prerender.mjs and the
// "build" script in package.json), not through a Vite plugin.
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
