import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import type { Connect, ViteDevServer } from 'vite'
import { defineConfig } from 'vite'
import { handleApi } from './server/api.mjs'

function attachApi(middlewares: Connect.Server) {
  middlewares.use((req, res, next) => {
    const url = req.url ?? ''
    if (!url.startsWith('/api/')) {
      next()
      return
    }
    handleApi(req, res).catch((error: unknown) => {
      console.error(error)
      if (!res.headersSent) {
        res.statusCode = 500
        res.setHeader('content-type', 'application/json; charset=utf-8')
        res.end(JSON.stringify({ error: 'server' }))
      }
    })
  })
}

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'aanandi-api',
      configureServer(server: ViteDevServer) {
        attachApi(server.middlewares)
      },
      configurePreviewServer(server) {
        attachApi(server.middlewares)
      },
    },
  ],
})
