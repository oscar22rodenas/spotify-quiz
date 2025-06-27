<template>
  <div 
    :class="[
      'card animate-fadeIn',
      {
        'hover:scale-[1.02] cursor-pointer': hoverable,
        'opacity-50': disabled
      }
    ]"
    @click="handleClick"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
interface Props {
  hoverable?: boolean;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  hoverable: false,
  disabled: false,
});

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

const handleClick = (event: MouseEvent) => {
  if (!props.disabled && props.hoverable) {
    emit('click', event);
  }
};
</script>