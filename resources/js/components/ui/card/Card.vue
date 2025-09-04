<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    data-slot="card"
    :class="cn(
      'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 flex flex-col gap-6 rounded-2xl border border-gray-200 dark:border-gray-700 py-6 px-6 shadow-md transition-transform duration-200 hover:shadow-xl ',
      props.class
    )"
  >
    <slot />
  </div>
</template>
