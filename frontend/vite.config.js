import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'global': 'globalThis',
  },
  resolve: {
    alias: {
      buffer: 'buffer',
      process: 'process/browser',
      stream: 'stream-browserify',
      util: 'util',
      events: 'events'
    }
  },
  build: {
    chunkSizeWarningLimit: 1600, // Increase limit to 1600kb to suppress warning
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor libraries into separate chunks
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'chart-vendor': ['recharts'],
          'pdf-vendor': ['jspdf', 'jspdf-autotable', 'html2canvas'],
          'map-vendor': ['leaflet', 'react-leaflet'],
          'socket-vendor': ['socket.io-client', 'simple-peer'],
          'icons': ['react-icons'],
          'qr': ['qrcode.react', 'react-qr-code']
        }
      }
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
