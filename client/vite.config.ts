import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    allowedHosts: ['4d7c903b-c89a-4287-a7e4-5ed3a48a80eb-00-ghtcv2to7qr3.worf.replit.dev']
  }
})
