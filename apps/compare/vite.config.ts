import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  base: '/compare/',
  plugins: [react(), tailwindcss()],
  build: {
    manifest: true,
    assetsDir: 'compare-assets',
    rollupOptions: {
      input: Object.fromEntries(['index', 'hero', 'mantine'].map((entry) => [entry, fileURLToPath(new URL(`./${entry}.html`, import.meta.url))])),
    },
  },
});
