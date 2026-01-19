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
});

// Usamos una variable para asegurarnos de que la carga solo se dispare una vez.
let loadTranslationsPromise: Promise<void> | null = null;

export function loadTranslations(origin?: string) {
  loadTranslationsPromise ??= (async () => {
    try {
      const languages: Language[] = ['es', 'en', 'ca'];
      const fetchPromises = languages.map(async (lang) => {
        const path = `/locales/${lang}.json`;
        // En el servidor, `origin` tendrá un valor (ej: http://localhost:4321)
        // En el cliente, `origin` será `undefined` y el path relativo funcionará.
        const url = origin ? `${origin}${path}` : path;
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Failed to fetch ${lang}.json from ${url}`);
        i18nState.translations[lang] = await response.json();
      });
      await Promise.all(fetchPromises);
    } catch (error) {
      console.error("Failed to load translations:", error);
    }
  })();
  return loadTranslationsPromise;
}

export function setLanguage(lang: Language) {
  i18nState.currentLanguage = lang;
  if (typeof globalThis.window !== 'undefined') {
    localStorage.setItem('spotify-quiz-lang', lang);
    // Dispara un evento para que otros componentes puedan reaccionar si es necesario
    globalThis.window.dispatchEvent(new CustomEvent('language-changed'));
  }
}

export function getCurrentLanguage(): Language {
  if (typeof globalThis.window !== 'undefined') {
    const stored = localStorage.getItem('spotify-quiz-lang') as Language;
    if (stored && ['es', 'en', 'ca'].includes(stored)) {
      i18nState.currentLanguage = stored;
    }
  }
  return i18nState.currentLanguage;
}

export function t(key: string, params: Record<string, any> = {}): string {
  const keys = key.split('.');
  let value: any = i18nState.translations[i18nState.currentLanguage];
  
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
    result = result.replaceAll(new RegExp(`{{${param}}}`, 'g'), String(val));
  }
  
  return result;
}

export function t_any(key: string): any {
  const keys = key.split('.');
  let value = i18nState.translations[i18nState.currentLanguage];
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      return null; // Devuelve null si no se encuentra
    }
  }
  
  return value;
}

export const availableLanguages = [
  { code: 'es' as Language, name: 'Español', flag: '/flags/es.svg' },
  { code: 'en' as Language, name: 'English', flag: '/flags/gb.svg' },
  { code: 'ca' as Language, name: 'Català', flag: '/flags/ca.svg' }
];