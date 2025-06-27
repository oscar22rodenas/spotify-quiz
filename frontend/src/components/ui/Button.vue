<template>
  <button
    :class="[
      'inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed',
      'focus:outline-none focus:ring-4 focus:ring-offset-2',
      variantClasses,
      sizeClasses,
      {
        'animate-pulse': loading,
        'hover:scale-105 active:scale-95': !loading && !disabled
      }
    ]"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <component :is="loading ? LoaderIcon : icon" v-if="loading || icon" :size="iconSize" class="animate-spin" :class="{ 'animate-spin': loading }" />
    <span class="contents" v-if="!loading || $slots.default">
      <slot />
    </span>
    <span class="contents" v-if="loading && loadingText">{{ loadingText }}</span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Loader2 } from 'lucide-vue-next';

interface Props {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  loadingText?: string;
  icon?: any;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false,
});

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

const LoaderIcon = Loader2;

const variantClasses = computed(() => {
  const variants = {
    primary: 'bg-melody-500 hover:bg-melody-600 text-white shadow-lg hover:shadow-xl hover:shadow-melody-500/25 focus:ring-melody-500/50',
    secondary: 'border-2 border-melody-500 text-melody-500 hover:bg-melody-50 dark:hover:bg-melody-900/20 focus:ring-melody-500/50',
    success: 'bg-success hover:bg-success/90 text-white shadow-lg hover:shadow-xl hover:shadow-success/25 focus:ring-success/50',
    danger: 'bg-miss hover:bg-miss/90 text-white shadow-lg hover:shadow-xl hover:shadow-miss/25 focus:ring-miss/50',
    ghost: 'hover:bg-melody-50 dark:hover:bg-melody-900/20 text-melody-600 dark:text-melody-400 focus:ring-melody-500/50'
  };
  return variants[props.variant];
});

const sizeClasses = computed(() => {
  const sizes = {
    sm: 'px-4 py-2 text-sm rounded-lg',
    md: 'px-6 py-3 text-base rounded-xl',
    lg: 'px-8 py-4 text-lg rounded-xl'
  };
  return sizes[props.size];
});

const iconSize = computed(() => {
  const sizes = {
    sm: 16,
    md: 20,
    lg: 24
  };
  return sizes[props.size];
});

const handleClick = (event: MouseEvent) => {
  if (!props.disabled && !props.loading) {
    emit('click', event);
  }
};
</script>