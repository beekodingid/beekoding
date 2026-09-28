import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          const normalizedId = id.replace(/\\/g, '/');
          if (normalizedId.includes('node_modules')) {
            if (normalizedId.includes('/react/') || normalizedId.includes('/react-dom/')) {
              return 'vendor-react';
            }
            if (normalizedId.includes('/lucide-react/')) {
              return 'vendor-icons';
            }
            if (normalizedId.includes('/@supabase/')) {
              return 'vendor-supabase';
            }
            return 'vendor';
          }
          if (normalizedId.includes('src/services/adminStorage') || normalizedId.includes('src/data/talentQuestions')) {
            return 'app-data';
          }
        },
      },
    },
  },
})
