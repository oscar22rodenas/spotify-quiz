import { createPinia } from 'pinia';

/**
 * La instancia única de Pinia para toda la aplicación.
 * La exportamos para poder proporcionársela a los stores
 * cuando se usan dentro de los componentes de Vue en Astro.
 */
export const pinia = createPinia();
