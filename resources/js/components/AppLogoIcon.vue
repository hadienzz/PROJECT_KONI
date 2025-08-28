<!-- AppLogoIcon.vue -->
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

defineOptions({
  inheritAttrs: false,
})

interface Props {
  className?: HTMLAttributes['class']
  width?: string
  height?: string
}

const props = withDefaults(defineProps<Props>(), {
  width: '32px',
  height: 'auto'
})
</script>

<template>
    <img
        src="/images/logo_no_text.svg"
        alt="Logo"
        :style="{ width: props.width, height: props.height }"
        :class="className"
    >
</template>
