import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vue from '@astrojs/vue';

export default defineConfig({
  site: 'http://localhost:4321',
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    vue({
      reactivityTransform: true
    })
  ],
  vite: {
    optimizeDeps: {
      include: ['vue', '@vueuse/core', 'lucide-vue-next']
    }
  }
});