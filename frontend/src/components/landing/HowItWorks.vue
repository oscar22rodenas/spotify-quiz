<template>
  <section class="py-20 bg-gradient-to-b from-transparent to-melody-50/30 dark:to-melody-900/10">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="font-outfit font-bold text-3xl sm:text-4xl text-charcoal dark:text-pearl mb-4">
          {{ t('landing.howItWorks.title') }}
        </h2>
        <p class="text-lg text-slate dark:text-slate-300 max-w-2xl mx-auto">
          En solo 3 pasos simples tendrás tu quiz musical personalizado
        </p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
        <div
          v-for="(step, index) in steps"
          :key="index"
          class="text-center group animate-slideUp"
          :style="`animation-delay: ${index * 0.1}s`"
        >
          <!-- Step number -->
          <div class="relative mb-6">
            <div class="w-16 h-16 mx-auto bg-gradient-to-r from-melody-500 to-beat-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-110 transition-transform">
              {{ index + 1 }}
            </div>
            <!-- Connector line (hidden on last step) -->
            <div
              v-if="index < steps.length - 1"
              class="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-gradient-to-r from-melody-200 to-beat-200 dark:from-melody-800 dark:to-beat-800 transform translate-x-8"
            ></div>
          </div>
          
          <!-- Step content -->
          <div class="space-y-4">
            <div class="text-4xl mb-4 group-hover:animate-bounce">{{ step.emoji }}</div>
            <h3 class="font-outfit font-semibold text-lg text-charcoal dark:text-pearl">
              {{ step.title }}
            </h3>
            <p class="text-slate dark:text-slate-300">
              {{ step.description }}
            </p>
          </div>
        </div>
      </div>
      
      <!-- Call to action -->
      <div class="text-center mt-16">
        <p class="text-lg text-slate dark:text-slate-300 mb-6">
          ¿Listo para poner a prueba tu conocimiento musical?
        </p>
        <Button @click="scrollToForm" size="lg">
          <ArrowDown :size="20" />
          ¡Empezar ahora!
        </Button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue';
import { ArrowDown } from 'lucide-vue-next';
import Button from '../ui/Button.vue';
import { t } from '../../utils/i18n';

// Add reactive state for translations
const translations = reactive({});

const steps = [
  {
    emoji: '🔗',
    title: t('landing.howItWorks.step1'),
    description: 'Copia y pega la URL de tu playlist pública de Spotify en el formulario'
  },
  {
    emoji: '🎵',
    title: t('landing.howItWorks.step2'),
    description: 'Responde 10 preguntas sobre los artistas, canciones y álbumes de tu playlist'
  },
  {
    emoji: '🏆',
    title: t('landing.howItWorks.step3'),
    description: 'Obtén tu puntuación final y comparte tus resultados con tus amigos'
  }
];

const scrollToForm = () => {
  const formSection = document.querySelector('form');
  if (formSection) {
    formSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
};

onMounted(() => {
  // Listen for language changes
  window.addEventListener('language-changed', () => {
    // Force reactivity update
    Object.assign(translations, {});
  });
});
</script>