<template>
  <div class="min-h-screen py-8">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Quiz Header -->
      <div class="mb-8">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h1 class="font-outfit font-bold text-2xl sm:text-3xl text-charcoal dark:text-pearl">
            Spotify Quiz Musical
          </h1>
          <div class="flex items-center gap-4">
            <div class="text-sm font-medium text-slate dark:text-slate-300">
              {{ t('quiz.progress', { current: currentQuestion + 1, total: questions.length }) }}
            </div>
            <div class="text-sm font-medium text-melody-600 dark:text-melody-400">
              {{ t('quiz.score', { score: quizState.score }) }}
            </div>
          </div>
        </div>

        <!-- Progress Bar -->
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }"></div>
        </div>
      </div>

      <!-- Question Card -->
      <Card v-if="currentQuestionData" class="mb-8 animate-scaleIn">
        <div class="space-y-6">
          <!-- Question -->
          <div class="text-center">
            <p v-if="currentQuestionData.context" class="text-sm text-melody-600 dark:text-melody-400 mb-2">
              {{ currentQuestionData.context }}
            </p>
            <h2 class="font-outfit font-semibold text-xl sm:text-2xl text-charcoal dark:text-pearl">
              {{ currentQuestionData.question }}
            </h2>
          </div>

          <!-- Answer Options -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button v-for="(option, index) in currentQuestionData.options" :key="index" @click="selectAnswer(index)"
              :disabled="selectedAnswer !== null" :class="[
                'question-option',
                {
                  'question-option-correct': selectedAnswer !== null && index === currentQuestionData.correctAnswer,
                  'question-option-incorrect': selectedAnswer !== null && index === selectedAnswer && index !== currentQuestionData.correctAnswer,
                  'opacity-50': selectedAnswer !== null && index !== selectedAnswer && index !== currentQuestionData.correctAnswer
                }
              ]">
              <div class="flex items-center justify-between">
                <span>{{ option }}</span>
                <div v-if="selectedAnswer !== null" class="ml-2">
                  <Check v-if="index === currentQuestionData.correctAnswer" :size="20" class="text-success" />
                  <X v-else-if="index === selectedAnswer && index !== currentQuestionData.correctAnswer" :size="20"
                    class="text-miss" />
                </div>
              </div>
            </button>
          </div>

          <!-- Feedback -->
          <div v-if="selectedAnswer !== null" class="text-center space-y-4 animate-fadeIn">
            <div :class="[
              'text-lg font-semibold',
              isCorrect ? 'text-success' : 'text-miss'
            ]">
              <div class="text-2xl mb-2">
                {{ isCorrect ? '🎉' : '😅' }}
              </div>
              {{ isCorrect ? t('quiz.correct') : t('quiz.incorrect') }}
            </div>

            <p v-if="currentQuestionData.explanation" class="text-slate dark:text-slate-300 text-sm">
              {{ currentQuestionData.explanation }}
            </p>

            <Button @click="nextQuestion" size="lg" :class="{ 'animate-confetti': isCorrect }">
              <ArrowRight :size="20" />
              {{ isLastQuestion ? t('quiz.seeResults') : t('quiz.nextQuestion') }}
            </Button>
          </div>
        </div>
      </Card>

      <!-- Quiz Completion -->
      <div v-if="quizState.isComplete" class="text-center animate-scaleIn">
        <Card>
          <div class="space-y-6">
            <div class="text-6xl">🎉</div>
            <h2 class="font-outfit font-bold text-2xl text-charcoal dark:text-pearl">
              {{ t('results.title') }}
            </h2>
            <p class="text-lg text-slate dark:text-slate-300">
              Redirigiendo a tus resultados...
            </p>
            <div class="animate-spin text-melody-500">🎵</div>
          </div>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, reactive } from 'vue';
import { Check, X, ArrowRight } from 'lucide-vue-next';
import Button from '../ui/Button.vue';
import Card from '../ui/Card.vue';
import { type Question, type QuizState } from '../../utils/spotify';
import { t } from '../../utils/i18n';
import { useNavigation } from '../../composables/useNavigation';
import { useQuizStore } from '../../stores/quizStore';
import { pinia } from '../../stores';

const { navigateTo } = useNavigation();
const quizStore = useQuizStore(pinia);

// Add reactive state for translations
const translations = reactive({});

const questions = ref<Question[]>(quizStore.questions); // Load questions from store
const currentQuestion = ref(0);
const selectedAnswer = ref<number | null>(null);
const quizState = ref<QuizState>({
  currentQuestion: 0,
  score: 0,
  questions: quizStore.questions, // Also init state with questions from store
  answers: [],
  isComplete: false,
  startTime: new Date()
});

const currentQuestionData = computed(() => {
  return questions.value[currentQuestion.value] || null;
});

const isCorrect = computed(() => {
  return selectedAnswer.value === currentQuestionData.value?.correctAnswer;
});

const isLastQuestion = computed(() => {
  return currentQuestion.value === questions.value.length - 1;
});

const selectAnswer = (answerIndex: number) => {
  if (selectedAnswer.value !== null) return;

  selectedAnswer.value = answerIndex;
  const correct = answerIndex === currentQuestionData.value?.correctAnswer;

  if (correct) {
    quizState.value.score++;
  }

  // Store answer
  quizState.value.answers.push({
    questionId: currentQuestionData.value?.id || '',
    selectedAnswer: answerIndex,
    isCorrect: correct,
    timeSpent: Date.now() - new Date().getTime() // Simplified time tracking
  });
};

const nextQuestion = () => {
  if (isLastQuestion.value) {
    // 1. Mark quiz as complete and set end time
    quizState.value.isComplete = true;
    quizState.value.endTime = new Date();

    // 2. Compile final results object
    const resultsData = {
      ...quizState.value,
      finalScore: quizState.value.score,
      totalQuestions: questions.value.length,
      scorePercentage: Math.round((quizState.value.score / questions.value.length) * 100)
    };

    // 3. Save results to the Pinia store
    quizStore.completeQuiz(resultsData);

    // 4. Navigate directly to the results page. No more timeouts!
    navigateTo('/results');

  } else {
    // Next question
    currentQuestion.value++;
    selectedAnswer.value = null;
    quizState.value.currentQuestion = currentQuestion.value;
  }
};

onMounted(() => {
  // If there are no questions in the store, the user probably landed
  // here directly. Redirect them to the home page to start a quiz.
  if (!quizStore.hasActiveQuiz) {
    navigateTo('/');
    return;
  }

  // Load questions from the store into the component's reactive state.
  // This is needed because the store itself is not a ref.
  questions.value = quizStore.questions;
  quizState.value.questions = quizStore.questions;


  // Listen for language changes
  window.addEventListener('language-changed', () => {
    // Force reactivity update
    Object.assign(translations, {});
  });
});
</script>