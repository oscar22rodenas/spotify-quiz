import { defineStore } from 'pinia';
import type { Question, QuizState } from '../utils/spotify';

export const useQuizStore = defineStore('quiz', {
  // El estado inicial de nuestro almacén
  state: () => ({
    playlistUrl: '' as string,
    questions: [] as Question[],
    results: null as QuizState | null,
  }),

  // Los getters nos permiten computar estado derivado
  getters: {
    hasActiveQuiz(state): boolean {
      return state.questions.length > 0;
    },
    hasResults(state): boolean {
      return state.results !== null;
    },
  },

  // Las acciones son funciones para modificar el estado
  actions: {
    /**
     * Inicia un nuevo quiz con las preguntas obtenidas de la API.
     * @param url - La URL de la playlist de Spotify.
     * @param questions - El array de preguntas generado por el backend.
     */
    startQuiz(url: string, questions: Question[]) {
      this.playlistUrl = url;
      this.questions = questions;
      this.results = null; // Limpia resultados anteriores al empezar un nuevo quiz
    },

    /**
     * Marca el quiz como completado y guarda los resultados finales.
     * @param results - El objeto con el estado final del quiz.
     */
    completeQuiz(results: QuizState) {
      this.results = results;
    },

    /**
     * Limpia todo el estado del quiz, para volver al inicio.
     */
    clearStore() {
      this.playlistUrl = '';
      this.questions = [];
      this.results = null;
    },
  },
});
