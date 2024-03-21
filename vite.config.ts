import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { TanStackRouterVite } from '@tanstack/router-vite-plugin'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), TanStackRouterVite()],
  preview: {
    port: 443,
    strictPort: true,
   },
   server: {
    port: 443,
    strictPort: true,
    host: true,
    origin: "http://0.0.0.0:443",
    https: true
   },
})
