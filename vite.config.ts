import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import sitemap from 'vite-plugin-sitemap';
import { robots } from 'vite-plugin-robots';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  base: '/',   // FIXED ❗

  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    chunkSizeWarningLimit: 1600,
  },

  plugins: [
    tailwindcss(),
    vue(),
    robots(),
    sitemap({
      hostname: 'https://prakhar.devcorebit.com/',   // FIXED ❗
      basePath: '/',                                 // FIXED ❗
      changefreq: 'hourly',
      priority: 1,
    }),
  ],

  resolve: {
    alias: { '@': '/src' },
  },

  optimizeDeps: {
    exclude: ['@tailwindcss/vite'],
    force: true,
  },
});
