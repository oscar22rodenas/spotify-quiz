<template>
  <article class="prose dark:prose-invert lg:prose-lg mx-auto">
    <h1 class="font-outfit font-bold text-4xl sm:text-5xl lg:text-6xl text-charcoal dark:text-pearl mb-4 animate-slideUp">{{ t('privacy.title') }}</h1>
    <p class="text-sm text-slate dark:text-slate-300 mb-8"><em>{{ t('privacy.lastUpdated') }}</em></p>
    
    <h2 class="font-outfit font-bold text-3xl sm:text-4xl text-charcoal dark:text-pearl mb-2">{{ t('privacy.intro.title') }}</h2>
    <p>{{ t('privacy.intro.p1') }}</p>
    <p class="mb-4">{{ t('privacy.intro.p2') }}</p>
    
    <h2 class="font-outfit font-bold text-3xl sm:text-4xl text-charcoal dark:text-pearl mb-2">{{ t('privacy.dataNotCollected.title') }}</h2>
    <p>{{ t('privacy.dataNotCollected.p1') }}</p>
    <ul class="mb-4">
      <li v-for="(item, index) in t_any('privacy.dataNotCollected.items')" :key="index" v-html="item"></li>
    </ul>
    
    <h2 class="font-outfit font-bold text-3xl sm:text-4xl text-charcoal dark:text-pearl mb-2">{{ t('privacy.dataAccessed.title') }}</h2>
    <p>{{ t('privacy.dataAccessed.p1') }}</p>
    <ul >
      <li v-for="(item, index) in t_any('privacy.dataAccessed.items')" :key="index" v-html="item"></li>
    </ul>
    <p class="mb-4" v-html="t('privacy.dataAccessed.p2')"></p>
    
    <h2 class="font-outfit font-bold text-3xl sm:text-4xl text-charcoal dark:text-pearl mb-2">{{ t('privacy.thirdParty.title') }}</h2>
    <p>{{ t('privacy.thirdParty.p1') }}</p>
    <ul class="mb-4">
      <li v-for="(item, index) in t_any('privacy.thirdParty.items')" :key="index" v-html="item"></li>
    </ul>
    
    <h2 class="font-outfit font-bold text-3xl sm:text-4xl text-charcoal dark:text-pearl mb-2">{{ t('privacy.cookies.title') }}</h2>
    <p>{{ t('privacy.cookies.p1') }}</p>
    <ul>
      <li v-for="(item, index) in t_any('privacy.cookies.items')" :key="index" v-html="item"></li>
    </ul>
    <p class="mb-4">{{ t('privacy.cookies.p2') }}</p>
    
    <h2 class="font-outfit font-bold text-3xl sm:text-4xl text-charcoal dark:text-pearl mb-2">{{ t('privacy.policyChanges.title') }}</h2>
    <p class="mb-4">{{ t('privacy.policyChanges.p1') }}</p>
    
    <h2 class="font-outfit font-bold text-3xl sm:text-4xl text-charcoal dark:text-pearl mb-2">{{ t('privacy.contact.title') }}</h2>
    <p class="mb-4" v-html="t('privacy.contact.p1')"></p>
  </article>
</template>

<script setup lang="ts">
import { t, t_any } from '../../utils/i18n';
</script>