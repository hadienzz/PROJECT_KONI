<script setup lang="ts">
defineProps<{
    label: string;
    value: string;
}>();
</script>

<template>
    <div class="grid grid-cols-3 items-center gap-2">
        <span class="text-gray-500">{{ label }}</span>
        <div class="col-span-2 rounded-md bg-gray-100 p-2">
            {{ value }}
        </div>
    </div>
</template>
