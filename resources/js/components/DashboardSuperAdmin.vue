<script lang="ts" setup>
import { usePage } from '@inertiajs/vue3';
import { ref } from 'vue';
import ListCard from './ListCard.vue';
const userInfo = usePage();

const pending = ref([
    { id: 1, user: 'Asep', title: 'Latihan sore', points: 30, date: '09 Sep' },
    { id: 2, user: 'Rina', title: 'Pertandingan', points: 60, date: '10 Sep' },
]);

const recent = ref([
    { id: 31, user: 'Rina', title: 'Latihan pagi', points: 10, date: '11 Sep' },
    { id: 32, user: 'Budi', title: 'Terapi', points: 8, date: '11 Sep' },
]);
</script>

<template>
    <div class="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <ListCard title="Menunggu Persetujuan" :items="pending" empty="Tidak ada item pending">
            <template #item="{ item }">
                <div class="flex items-center justify-between">
                    <div>
                        <div class="font-medium">{{ item.user }}</div>
                        <div class="text-xs text-gray-500">{{ item.date }} • {{ item.title }}</div>
                    </div>
                    <div class="text-sm font-semibold">+{{ item.points }} pts</div>
                </div>
            </template>
        </ListCard>

        <ListCard title="Aktivitas Terbaru" :items="recent" empty="Belum ada aktivitas terbaru">
            <template #item="{ item }">
                <div class="flex items-center justify-between">
                    <div>
                        <div class="font-medium">{{ item.title }}</div>
                        <div class="text-xs text-gray-500">{{ item.date }} • {{ item.user }}</div>
                    </div>
                    <div class="text-sm font-semibold">+{{ item.points }} pts</div>
                </div>
            </template>
        </ListCard>
    </div>
</template>
