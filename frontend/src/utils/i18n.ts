import { reactive } from 'vue';

export type Language = 'es' | 'en' | 'ca';

interface Translations {
  [key: string]: any;
}

export const i18nState = reactive({
  currentLanguage: 'es' as Language,
  translations: {
    es: {},
    en: {},
    ca: {}
  } as Record<Language, Translations>,
  // Añadimos un estado para saber si las traducciones están cargando.
  isLoading: true,
});

// Usamos una variable para asegurarnos de que la carga solo se dispare una vez.
let loadTranslationsPromise: Promise<void> | null = null;

export function loadTranslations() {
  if (!loadTranslationsPromise) {
    loadTranslationsPromise = (async () => {
      try {
        const languages: Language[] = ['es', 'en', 'ca'];
        const fetchPromises = languages.map(async (lang) => {
          const response = await fetch(`/locales/${lang}.json`);
          if (!response.ok) throw new Error(`Failed to fetch ${lang}.json`);
          i18nState.translations[lang] = await response.json();
        });
        await Promise.all(fetchPromises);
      } catch (error) {
        console.error("Failed to load translations:", error);
      } finally {
        // Una vez terminada la carga (con o sin error), lo indicamos.
        i18nState.isLoading = false;
      }
    })();
  }
  return loadTranslationsPromise;
}

export function setLanguage(lang: Language) {
  i18nState.currentLanguage = lang;
  if (typeof window !== 'undefined') {
    localStorage.setItem('spotify-quiz-lang', lang);
    // Dispara un evento para que otros componentes puedan reaccionar si es necesario
    window.dispatchEvent(new CustomEvent('language-changed'));
  }
}

export function getCurrentLanguage(): Language {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('spotify-quiz-lang') as Language;
    if (stored && ['es', 'en', 'ca'].includes(stored)) {
      i18nState.currentLanguage = stored;
    }
  }
  return i18nState.currentLanguage;
}

export function t(key: string, params: Record<string, any> = {}): string {
  const keys = key.split('.');
  let value = i18nState.translations[i18nState.currentLanguage];
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      // Devuelve la clave si no se encuentra la traducción
      return key;
    }
  }
  
  if (typeof value !== 'string') {
    return key;
  }
  
  let result = value;
  for (const [param, val] of Object.entries(params)) {
    result = result.replace(new RegExp(`{{${param}}}`, 'g'), String(val));
  }
  
  return result;
}

export const availableLanguages = [
  { code: 'es' as Language, name: 'Español', flag: '/flags/es.svg' },
  { code: 'en' as Language, name: 'English', flag: '/flags/gb.svg' },
  { code: 'ca' as Language, name: 'Català', flag: '/flags/ca.svg' }
];