import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    host: '0.0.0.0',
    port: 6001,
    proxy: {
      '/dev': {
        target: 'http://localhost:4000/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/dev/, '')
      },
    }
  }
})
