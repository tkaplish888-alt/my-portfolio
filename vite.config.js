import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// In `npm run dev`, serve /api/chat locally by running the same function
// Vercel runs in production. Put ANTHROPIC_API_KEY in a .env file (git-ignored).
const apiDev = () => ({
  name: 'api-dev',
  configureServer(server) {
    server.middlewares.use('/api/chat', async (req, res) => {
      const { POST } = await server.ssrLoadModule('/api/chat.js')
      let body = ''
      for await (const chunk of req) body += chunk
      const response = await POST(new Request('http://localhost/api/chat', {
        method: 'POST',
        headers: { 'content-type': 'application/json', 'x-forwarded-for': req.socket.remoteAddress || 'local' },
        body,
      }))
      res.statusCode = response.status
      response.headers.forEach((v, k) => res.setHeader(k, v))
      if (response.body) for await (const chunk of response.body) res.write(chunk)
      res.end()
    })
  },
})

// Prerendering happens after the build (see scripts/prerender.mjs and the
// "build" script in package.json), not through a Vite plugin.
export default defineConfig(({ mode }) => {
  process.env.ANTHROPIC_API_KEY ??= loadEnv(mode, process.cwd(), '').ANTHROPIC_API_KEY
  return { plugins: [react(), tailwindcss(), apiDev()] }
})
