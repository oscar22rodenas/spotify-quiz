<template>
  <div class="min-h-screen py-8">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Results Header -->
      <div class="text-center mb-12">
        <div class="text-6xl mb-4 animate-bounce">🏆</div>
        <h1 class="font-outfit font-bold text-3xl sm:text-4xl text-charcoal dark:text-pearl mb-4">
          {{ t('results.title') }}
        </h1>
      </div>
      
      <!-- Score Card -->
      <Card class="text-center mb-8 animate-scaleIn">
        <div class="space-y-6">
          <h2 class="font-outfit font-semibold text-xl text-charcoal dark:text-pearl">
            {{ t('results.scoreTitle') }}
          </h2>
          
          <!-- Animated Score Counter -->
          <div class="space-y-4">
            <div class="text-6xl font-bold">
              <span class="bg-gradient-to-r from-melody-500 to-beat-500 bg-clip-text text-transparent">
                {{ animatedScore }}
              </span>
              <span class="text-slate dark:text-slate-400"> / {{ totalQuestions }}</span>
            </div>
            <div class="text-2xl text-slate dark:text-slate-300">
              {{ scorePercentage }}%
            </div>
          </div>
          
          <!-- Score Message -->
          <div class="p-6 bg-gradient-to-r from-melody-50 to-beat-50 dark:from-melody-900/20 dark:to-beat-900/20 rounded-xl">
            <div class="text-2xl mb-2">{{ getScoreEmoji() }}</div>
            <p class="text-lg font-medium text-charcoal dark:text-pearl">
              {{ getScoreMessageText() }}
            </p>
          </div>
        </div>
      </Card>
      
      <!-- Detailed Results -->
      <Card class="mb-8">
        <div class="space-y-6">
          <div class="flex items-center justify-between">
            <h3 class="font-outfit font-semibold text-lg text-charcoal dark:text-pearl">
              Resumen de respuestas
            </h3>
            <button
              @click="toggleDetails"
              class="flex items-center gap-2 text-melody-500 hover:text-melody-600 transition-colors"
            >
              <span class="text-sm">{{ showDetails ? 'Ocultar' : 'Ver detalles' }}</span>
              <ChevronDown :size="16" :class="{ 'rotate-180': showDetails }" class="transition-transform" />
            </button>
          </div>
          
          <!-- Quick Stats -->
          <div class="grid grid-cols-3 gap-4 text-center">
            <div class="p-4 bg-success/10 rounded-lg">
              <div class="text-2xl font-bold text-success">{{ correctAnswers }}</div>
              <div class="text-sm text-slate dark:text-slate-300">Correctas</div>
            </div>
            <div class="p-4 bg-miss/10 rounded-lg">
              <div class="text-2xl font-bold text-miss">{{ incorrectAnswers }}</div>
              <div class="text-sm text-slate dark:text-slate-300">Incorrectas</div>
            </div>
            <div class="p-4 bg-electric/10 rounded-lg">
              <div class="text-2xl font-bold text-electric">{{ completionTime }}</div>
              <div class="text-sm text-slate dark:text-slate-300">Tiempo</div>
            </div>
          </div>
          
          <!-- Detailed breakdown -->
          <Transition
            enter-active-class="transition ease-out duration-300"
            enter-from-class="opacity-0 max-h-0"
            enter-to-class="opacity-100 max-h-screen"
            leave-active-class="transition ease-in duration-300"
            leave-from-class="opacity-100 max-h-screen"
            leave-to-class="opacity-0 max-h-0"
          >
            <div v-if="showDetails" class="space-y-4 overflow-hidden">
              <div
                v-for="(answer, index) in results?.answers || []"
                :key="index"
                class="p-4 border border-smoke dark:border-slate-600 rounded-lg"
              >
                <div class="flex items-start gap-3">
                  <div class="flex-shrink-0 mt-1">
                    <Check v-if="answer.isCorrect" :size="20" class="text-success" />
                    <X v-else :size="20" class="text-miss" />
                  </div>
                  <div class="flex-1">
                    <p class="font-medium text-charcoal dark:text-pearl mb-1">
                      {{ getQuestionText(answer.questionId) }}
                    </p>
                    <p class="text-sm text-slate dark:text-slate-300">
                      Tu respuesta: {{ getAnswerText(answer.questionId, answer.selectedAnswer) }}
                      <span v-if="!answer.isCorrect" class="block mt-1">
                        Correcta: {{ getCorrectAnswerText(answer.questionId) }}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </Card>
      
      <!-- Social Sharing -->
      <Card class="mb-8">
        <div class="text-center space-y-6">
          <h3 class="font-outfit font-semibold text-lg text-charcoal dark:text-pearl">
            ¡Comparte tus resultados!
          </h3>
          
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <Button @click="shareToTwitter" variant="secondary">
              <Share :size="20" />
              Compartir en Twitter
            </Button>
            <Button @click="copyResults" variant="secondary">
              <Copy :size="20" />
              Copiar resultados
            </Button>
          </div>
          
          <p v-if="copyMessage" class="text-sm text-success">{{ copyMessage }}</p>
        </div>
      </Card>
      
      <!-- Action Buttons -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <Button @click="playAgain" size="lg">
          <RotateCcw :size="20" />
          {{ t('results.playAgain') }}
        </Button>
        <Button @click="goHome" variant="secondary" size="lg">
          <Home :size="20" />
          Inicio
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, reactive } from 'vue';
import { Check, X, ChevronDown, Share, Copy, RotateCcw, Home } from 'lucide-vue-next';
import Button from '../ui/Button.vue';
import Card from '../ui/Card.vue';
import { type QuizState, calculateScorePercentage, getScoreMessage as getScoreMessageUtil } from '../../utils/spotify';
import { t } from '../../utils/i18n';
import { useNavigation } from '../../composables/useNavigation';
import { useQuizStore } from '../../stores/quizStore';
import { pinia } from '../../stores';

// Usar el composable de navegación y el store de Pinia
const { navigateTo } = useNavigation();
const quizStore = useQuizStore(pinia);

// Add reactive state for translations
const translations = reactive({});

const results = ref<QuizState | null>(quizStore.results);
const animatedScore = ref(0);
const showDetails = ref(false);
const copyMessage = ref('');

const totalQuestions = computed(() => results.value?.questions.length || 0);
const correctAnswers = computed(() => results.value?.answers.filter(a => a.isCorrect).length || 0);
const incorrectAnswers = computed(() => totalQuestions.value - correctAnswers.value);
const scorePercentage = computed(() => calculateScorePercentage(correctAnswers.value, totalQuestions.value));

const completionTime = computed(() => {
  if (!results.value?.startTime || !results.value?.endTime) return '0:00';
  
  const diff = new Date(results.value.endTime).getTime() - new Date(results.value.startTime).getTime();
  const minutes = Math.floor(diff / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
});

const getScoreEmoji = () => {
  const percentage = scorePercentage.value;
  if (percentage >= 90) return '🎉';
  if (percentage >= 70) return '🔥';
  if (percentage >= 50) return '🎵';
  if (percentage >= 30) return '😅';
  return '🎭';
};

const getScoreMessageText = (): string => {
  const messageKey = getScoreMessageUtil(scorePercentage.value);
  return t(`results.messages.${messageKey}`);
};

const getQuestionText = (questionId: string) => {
  const question = results.value?.questions.find(q => q.id === questionId);
  return question?.question || '';
};

const getAnswerText = (questionId: string, answerIndex: number) => {
  const question = results.value?.questions.find(q => q.id === questionId);
  return question?.options[answerIndex] || '';
};

const getCorrectAnswerText = (questionId: string) => {
  const question = results.value?.questions.find(q => q.id === questionId);
  return question ? question.options[question.correctAnswer] : '';
};

const toggleDetails = () => {
  showDetails.value = !showDetails.value;
};

const shareToTwitter = () => {
  const text = t('results.shareText', { 
    score: correctAnswers.value, 
    total: totalQuestions.value 
  });
  const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text + ' ' + window.location.origin)}`;
  window.open(url, '_blank');
};

const copyResults = async () => {
  const text = t('results.shareText', { 
    score: correctAnswers.value, 
    total: totalQuestions.value 
  });
  
  try {
    await navigator.clipboard.writeText(text + ' ' + window.location.origin);
    copyMessage.value = '¡Resultados copiados al portapapeles!';
    setTimeout(() => {
      copyMessage.value = '';
    }, 3000);
  } catch (error) {
    console.error('Error copying to clipboard:', error);
  }
};

const playAgain = () => {
  // Clear only the results, keeping the questions for a retry
  quizStore.completeQuiz(null);
  navigateTo('/quiz');
};

const goHome = () => {
  // Clear the entire store state and go home
  quizStore.clearStore();
  navigateTo('/');
};

// Animate score counter
const animateScore = () => {
  const target = correctAnswers.value;
  const duration = 2000; // 2 seconds
  const steps = 60;
  const increment = target / steps;
  let current = 0;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      animatedScore.value = target;
      clearInterval(timer);
    } else {
      animatedScore.value = Math.floor(current);
    }
  }, duration / steps);
};

onMounted(() => {
  // If there are no results in the store, the user probably landed
  // here directly. Redirect them to the home page.
  if (!quizStore.hasResults) {
    navigateTo('/');
    return;
  }

  // Load results from the store into the component's reactive state.
  results.value = quizStore.results;

  // Animate the score counter
  setTimeout(animateScore, 500);
  
  // Listen for language changes
  window.addEventListener('language-changed', () => {
    Object.assign(translations, {});
  });
});
</script>