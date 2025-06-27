<template>
  <header class="sticky top-0 z-40 bg-white/80 dark:bg-charcoal/80 backdrop-blur-lg border-b border-smoke dark:border-slate-700">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <a href="/" class="flex items-center gap-3 hover:scale-105 transition-transform">
          <div class="w-8 h-8 bg-gradient-to-r from-melody-500 to-beat-500 rounded-lg flex items-center justify-center">
            <Music :size="18" class="text-white" />
          </div>
          <span class="font-outfit font-bold text-xl text-charcoal dark:text-pearl">
            Spotify Quiz
          </span>
        </a>
        
        <!-- Navigation -->
        <nav class="hidden md:flex items-center gap-6">
          <a 
            href="/" 
            class="text-slate dark:text-slate-300 hover:text-melody-500 dark:hover:text-melody-400 transition-colors font-medium"
          >
            Inicio
          </a>
          <a 
            href="/quiz" 
            class="text-slate dark:text-slate-300 hover:text-melody-500 dark:hover:text-melody-400 transition-colors font-medium"
          >
            Quiz
          </a>
        </nav>
        
        <!-- Actions -->
        <div class="flex items-center gap-4">
          <button
            @click="toggleTheme"
            class="p-2 rounded-lg hover:bg-melody-50 dark:hover:bg-melody-900/20 text-charcoal dark:text-pearl transition-all"
            :title="isDark ? 'Modo claro' : 'Modo oscuro'"
          >
            <Sun v-if="isDark" :size="20" />
            <Moon v-else :size="20" />
          </button>
          
          <LanguageSelector />
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Music, Sun, Moon } from 'lucide-vue-next';
import LanguageSelector from '../ui/LanguageSelector.vue';

const isDark = ref(false);

const toggleTheme = () => {
  isDark.value = !isDark.value;
  
  if (isDark.value) {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }
};

onMounted(() => {
  // Sync with the theme that was already set in Layout.astro
  isDark.value = document.documentElement.classList.contains('dark');
});
</script>