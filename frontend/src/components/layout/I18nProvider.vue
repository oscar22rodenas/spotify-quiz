<template>
  <!--
    Este componente ahora usa un `await` en el setup,
    lo que suspende su renderizado hasta que las traducciones estén listas.
    El <slot> solo se renderizará una vez que el `await` se complete.
  -->
  <slot />
</template>

<script setup lang="ts">
import { loadTranslations, getCurrentLanguage, setLanguage } from '../../utils/i18n';

const props = defineProps<{
  origin?: string;
}>();

// 1. Determina el idioma inicial.
const lang = getCurrentLanguage();
setLanguage(lang);

// 2. Espera a que las traducciones se carguen ANTES de que el componente termine de montarse.
// Se pasa el `origin` para que funcione en SSR.
await loadTranslations(props.origin);
</script>