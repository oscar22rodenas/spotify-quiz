<template>
  <section class="py-16">
    <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
      <Card class="text-center">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- URL Input -->
          <div class="space-y-2">
            <label for="playlistUrl" class="block text-sm font-medium text-charcoal dark:text-pearl text-left">
              URL de tu playlist de Spotify
            </label>
            <div class="relative">
              <input
                id="playlistUrl"
                v-model="playlistUrl"
                type="url"
                placeholder="https://open.spotify.com/playlist/..."
                :class="[
                  'input-field',
                  {
                    'input-error': urlError,
                    'input-success': isValidUrl && !urlError
                  }
                ]"
                @input="validateUrl"
                @paste="handlePaste"
              />
              <div class="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Check v-if="isValidUrl && !urlError" :size="20" class="text-success" />
                <AlertCircle v-else-if="urlError" :size="20" class="text-miss" />
                <Link v-else :size="20" class="text-slate" />
              </div>
            </div>
            <p v-if="urlError" class="text-sm text-miss text-left">{{ urlError }}</p>
          </div>
          
          <!-- Submit Button -->
          <Button
            type="submit"
            size="lg"
            :loading="isLoading"
            :disabled="!isValidUrl || !!urlError"
            loading-text="Creando tu quiz..."
            class="w-full sm:w-auto"
          >
            <Music :size="20" />
            {{ t('landing.createQuiz') }}
          </Button>
          
          <!-- Loading state -->
          <div v-if="isLoading" class="mt-6 p-4 bg-melody-50 dark:bg-melody-900/20 rounded-lg">
            <div class="flex items-center justify-center gap-3 text-melody-600 dark:text-melody-400">
              <div class="animate-spin">🎵</div>
              <span class="text-sm font-medium">Analizando tu música favorita...</span>
            </div>
          </div>
        </form>
      </Card>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue';
import { Music, Check, AlertCircle, Link } from 'lucide-vue-next';
import Button from '../ui/Button.vue';
import Card from '../ui/Card.vue';
import { isValidSpotifyUrl, fetchQuizFromApi } from '../../utils/spotify';
import { t } from '../../utils/i18n';
import { useNavigation } from '../../composables/useNavigation';
import { useQuizStore } from '../../stores/quizStore';
import { pinia } from '../../stores';

// Usar el composable de navegación y el store de Pinia
const { navigateTo } = useNavigation();
const quizStore = useQuizStore(pinia);

const playlistUrl = ref('');
const urlError = ref('');
const isLoading = ref(false);

// Add reactive state for translations
const translations = reactive({});

const isValidUrl = computed(() => {
  return playlistUrl.value && isValidSpotifyUrl(playlistUrl.value);
});

const validateUrl = () => {
  urlError.value = '';
  
  if (!playlistUrl.value) {
    return;
  }
  
  if (!isValidSpotifyUrl(playlistUrl.value)) {
    urlError.value = t('landing.urlInvalid');
  }
};

const handlePaste = (event: ClipboardEvent) => {
  setTimeout(() => {
    validateUrl();
  }, 10);
};

const handleSubmit = async () => {
  if (!isValidUrl.value) {
    urlError.value = t('landing.urlRequired');
    return;
  }
  
  isLoading.value = true;
  
  try {
    // Fetch quiz data from the backend API
    const questions = await fetchQuizFromApi(playlistUrl.value);
    
    // Use the Pinia store to set the quiz data
    quizStore.startQuiz(playlistUrl.value, questions);
    
    // Navigate to the quiz page
    navigateTo('/quiz');
  } catch (error: any) { // Explicitly type error as 'any' for message property
    console.error('Error generating quiz:', error);
    urlError.value = error.message;
  } finally {
    isLoading.value = false;
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