<script setup lang="ts">
defineProps<{ title: string }>();
</script>

<template>
    <div class="flex h-[360px] flex-col rounded-2xl border bg-white p-4 shadow-sm">
        <div class="mb-2 flex items-center justify-between">
            <h3 class="font-semibold">{{ title }}</h3>
            <slot name="actions" />
        </div>
        <div class="min-h-0 flex-1">
            <slot />
        </div>
    </div>
</template>
