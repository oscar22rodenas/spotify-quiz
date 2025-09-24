<template>
  <!--
    Este componente actúa como una barrera.
    No renderizará el contenido de la página (a través del <slot>)
    hasta que las traducciones se hayan cargado.
  -->
  <slot v-if="!i18nState.isLoading" />
  <!--
    Opcionalmente, podríamos mostrar un spinner de carga global aquí
    mientras i18nState.isLoading es true, pero para evitar un parpadeo
    en la mayoría de los casos, simplemente no mostramos nada hasta que
    esté listo.
  -->
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { i18nState, loadTranslations, getCurrentLanguage, setLanguage } from '../../utils/i18n';

// Este componente se asegura de que las traducciones se carguen
// tan pronto como la aplicación se monte en el cliente.
onMounted(() => {
  // 1. Determina el idioma inicial (desde localStorage o por defecto).
  const lang = getCurrentLanguage();
  setLanguage(lang);

  // 2. Dispara la carga de todos los archivos de traducción.
  // La función `loadTranslations` está diseñada para ejecutarse solo una vez.
  loadTranslations();
});
</script>