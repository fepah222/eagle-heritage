import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    // Production assets are minified and source maps are not published.
    minify: 'esbuild',
    sourcemap: false,
    esbuild: {
      legalComments: 'none',
    },
  },
});