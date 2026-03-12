import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

/**
 * Vite configuration for Sanad Platform.
 *
 * Key decisions:
 * - `@` alias → `./src` for cleaner imports
 * - Manual chunks split the bundle into logical, cache-friendly pieces
 * - Source-maps hidden in prod for debugging without leaking source
 */
export default defineConfig({
  plugins: [react(), tailwindcss()],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
  },

  build: {
    target: 'esnext',
    sourcemap: false, // Disabled for production to reduce bundle size and hide source
    rollupOptions: {
      output: {
        manualChunks: {
          /* ── Core React runtime ── */
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],

          /* ── Animation & UI utilities ── */
          'ui-vendor': ['clsx', 'tailwind-merge'],

          /* ── i18n runtime ── */
          'i18n-vendor': ['i18next', 'react-i18next', 'i18next-browser-languagedetector'],
        },
      },
    },
  },
})

