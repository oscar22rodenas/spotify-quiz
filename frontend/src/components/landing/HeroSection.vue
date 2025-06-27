<template>
  <section class="relative py-20 lg:py-32">
    <!-- Background decorations -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute -top-24 -right-24 w-96 h-96 bg-melody-200/30 dark:bg-melody-800/20 rounded-full blur-3xl"></div>
      <div class="absolute -bottom-24 -left-24 w-96 h-96 bg-beat-200/30 dark:bg-beat-800/20 rounded-full blur-3xl"></div>
    </div>
    
    <div class="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <!-- Main heading -->
      <h1 class="font-outfit font-bold text-4xl sm:text-5xl lg:text-6xl text-charcoal dark:text-pearl mb-6 animate-slideUp">
        {{ t('landing.title') }}
        <span class="block mt-2 pb-4 bg-gradient-to-r from-melody-500 to-beat-500 bg-clip-text text-transparent">
          🎵
        </span>
      </h1>
      
      <!-- Subtitle -->
      <p class="text-lg sm:text-xl text-slate dark:text-slate-300 max-w-3xl mx-auto mb-12 animate-slideUp" style="animation-delay: 0.1s">
        {{ t('landing.subtitle') }}
      </p>
      
      <!-- Musical notes animation -->
      <div class="flex justify-center gap-4 mb-12 animate-slideUp" style="animation-delay: 0.2s">
        <div class="animate-bounce" style="animation-delay: 0s">🎵</div>
        <div class="animate-bounce" style="animation-delay: 0.1s">🎶</div>
        <div class="animate-bounce" style="animation-delay: 0.2s">🎵</div>
        <div class="animate-bounce" style="animation-delay: 0.3s">🎶</div>
        <div class="animate-bounce" style="animation-delay: 0.4s">🎵</div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue';
import { t } from '../../utils/i18n';

// Add reactive state for translations
const translations = reactive({});

onMounted(() => {
  // Listen for language changes
  window.addEventListener('language-changed', () => {
    // Force reactivity update
    Object.assign(translations, {});
  });
});
</script>