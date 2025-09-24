import { defineStore } from 'pinia';
import type { Question, QuizState } from '../utils/spotify';

const STORE_KEY = 'quiz-state';

export const useQuizStore = defineStore('quiz', {
  // El estado se inicializa desde sessionStorage para persistir entre cargas de página.
  state: () => {
    if (typeof window !== 'undefined') {
      const savedState = sessionStorage.getItem(STORE_KEY);
      if (savedState) {
        // Aseguramos que las fechas se parseen correctamente si existen.
        const parsed = JSON.parse(savedState);
        if (parsed.results?.startTime) parsed.results.startTime = new Date(parsed.results.startTime);
        if (parsed.results?.endTime) parsed.results.endTime = new Date(parsed.results.endTime);
        return parsed;
      }
    }
    // Estado por defecto si no hay nada guardado.
    return {
      playlistUrl: '' as string,
      questions: [] as Question[],
      results: null as QuizState | null,
    };
  },

  getters: {
    hasActiveQuiz(state): boolean {
      return state.questions.length > 0;
    },
    hasResults(state): boolean {
      return state.results !== null;
    },
  },

  actions: {
    // Acción interna para guardar el estado actual en sessionStorage.
    _persist() {
      sessionStorage.setItem(STORE_KEY, JSON.stringify(this.$state));
    },

    startQuiz(url: string, questions: Question[]) {
      this.playlistUrl = url;
      this.questions = questions;
      this.results = null;
      this._persist(); // Guardar estado después de la mutación.
    },

    completeQuiz(results: QuizState | null) {
      this.results = results;
      this._persist(); // Guardar estado después de la mutación.
    },

    clearStore() {
      // Resetea el estado a sus valores iniciales y limpia el storage.
      this.playlistUrl = '';
      this.questions = [];
      this.results = null;
      sessionStorage.removeItem(STORE_KEY);
    },
  },
});
