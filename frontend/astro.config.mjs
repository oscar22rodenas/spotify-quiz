import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vue from '@astrojs/vue';
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  site: 'https://spotifyquiz.vercel.app',
  output: 'server',
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    vue({
      reactivityTransform: true
    })
  ],
  adapter: vercel(),
  vite: {
    optimizeDeps: {
      include: ['vue', '@vueuse/core', 'lucide-vue-next']
    },
    server: {
      port: 4321,
      proxy: {
        // Redirige /api al backend en 3000
        '/api': {
          target: 'http://localhost:3000',
          changeOrigin: true,
          secure: false,
        }
      }
    }
  }
});
