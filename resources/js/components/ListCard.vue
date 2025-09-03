<script setup lang="ts">
interface Item {
    id: number | string;
    title: string;
    date?: string;
    points?: number;
    user?: string;
}

defineProps<{ title: string; items: Item[]; empty?: string }>();
</script>

<template>
    <div class="rounded-2xl border bg-white p-4 shadow-sm">
        <div class="mb-2 flex items-center justify-between">
            <h3 class="font-semibold">{{ title }}</h3>
            <slot name="actions" />
        </div>

        <div v-if="!items?.length" class="py-8 text-center text-sm text-gray-500">{{ empty }}</div>

        <ul v-else class="divide-y">
            <li v-for="item in items" :key="item.id" class="py-3">
                <slot name="item" :item="item">
                    <!-- Default rendering jika slot tidak dipakai -->
                    <div class="flex items-center justify-between">
                        <div>
                            <div class="font-medium">{{ item.title }}</div>
                            <div class="text-xs text-gray-500">{{ item.date }}</div>
                        </div>
                        <div class="text-sm font-semibold">{{ item.points }} pts</div>
                    </div>
                </slot>
            </li>
        </ul>

        <div class="mt-3 text-right">
            <button class="text-sm text-blue-600 hover:underline">Lihat semua</button>
        </div>
    </div>
</template>
