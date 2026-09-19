import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// Configuración base de Vite. El alias "@" apunta a /src para evitar
// imports relativos infernales tipo ../../../../components/ui/button
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    // Proxy hacia Laravel cuando se ejecuta con `php artisan serve`.
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
})
