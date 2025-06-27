<template>
  <div class="relative">
    <button
      @click="toggleDropdown"
      class="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-melody-50 dark:hover:bg-melody-900/20 text-charcoal dark:text-pearl transition-all"
      :class="{ 'bg-melody-50 dark:bg-melody-900/20': isOpen }"
    >
      <img :src="currentLanguage.flag" :alt="currentLanguage.name" class="w-5 h-5 object-cover rounded-full" />
      <span class="text-sm font-medium hidden sm:block">{{ currentLanguage.name }}</span>
      <ChevronDown :size="16" :class="{ 'rotate-180': isOpen }" class="transition-transform" />
    </button>
    
    <Transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div 
        v-if="isOpen"
        class="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-smoke dark:border-slate-600 py-1 z-50"
      >
        <button
          v-for="lang in availableLanguages"
          :key="lang.code"
          @click="selectLanguage(lang.code)"
          class="flex items-center gap-3 w-full px-4 py-2 text-left hover:bg-melody-50 dark:hover:bg-melody-900/20 text-charcoal dark:text-pearl transition-all"
          :class="{ 'bg-melody-50 dark:bg-melody-900/20': lang.code === currentLang }"
        >
          <img :src="lang.flag" :alt="lang.name" class="w-5 h-5 object-cover rounded-full" />
          <span class="text-sm font-medium">{{ lang.name }}</span>
          <Check v-if="lang.code === currentLang" :size="16" class="ml-auto text-melody-500" />
        </button>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { ChevronDown, Check } from 'lucide-vue-next';
import { availableLanguages, getCurrentLanguage, setLanguage, type Language } from '../../utils/i18n';

const isOpen = ref(false);
const currentLang = ref<Language>('es');

const currentLanguage = computed(() => {
  return availableLanguages.find(lang => lang.code === currentLang.value) || availableLanguages[0];
});

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const selectLanguage = (lang: Language) => {
  currentLang.value = lang;
  setLanguage(lang);
  isOpen.value = false;
  // Emit event or trigger reactivity for other components
  window.dispatchEvent(new CustomEvent('language-changed', { detail: lang }));
};

const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as Element;
  if (!target.closest('.relative')) {
    isOpen.value = false;
  }
};

onMounted(() => {
  currentLang.value = getCurrentLanguage();
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>