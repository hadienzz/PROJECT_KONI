<script setup lang="ts">
import Calendar from '@/components/Calendar.vue';
import Card from '@/components/ui/card/Card.vue';
import CardContent from '@/components/ui/card/CardContent.vue';
import CardHeader from '@/components/ui/card/CardHeader.vue';
import { useAbsent } from '@/composables/activities/useAbsent';
import { useEvents } from '@/composables/activities/useActivities';
import useEventDetails from '@/composables/activities/useEventDetails';
import { useCalendarOptions } from '@/composables/useCalendarOptions';
import { USER_EVENTS } from '@/constants';
import DialogEvent from '@/pages/activities/components/DialogAddEvent.vue';
import { ref } from 'vue';

const { myEvents, totalAktivitas, disetujui, ditolak, belumDivalidasi, isAbsen } = useEvents();
const { selectedEvent } = useEventDetails();
const { handleAbsen } = useAbsent();

const { calendarOptions: myCalendarOptions } = useCalendarOptions(USER_EVENTS.value, 'my-attendance-calendar', {
    enableDayCellColors: true,
    enableEventHover: true,
    enableDateClick: false,
    page: 'activity',
});

const showOverlay = ref(false);
const current = ref(new Date());

const openOverlay = () => {
    showOverlay.value = true;
};
</script>

<template>
    <div class="grid gap-6 lg:grid-cols-1">
        <Card class="border">
            <CardHeader class="pb-2 text-sm font-semibold">Data Aktivitas</CardHeader>
            <CardContent class="space-y-2">
                <div class="flex h-full flex-1 flex-col-reverse gap-4 overflow-x-auto rounded-xl p-4 lg:flex-row">
                    <div class="flex flex-1 flex-col gap-4">
                        <div>
                            <button @click="handleAbsen" class="rounded bg-blue-500 px-4 py-2 text-xs text-white hover:bg-blue-600 lg:text-base">
                                Absen ({{ isAbsen ? 'Sudah Absen' : 'Belum Absen' }})
                            </button>
                            <span class="ml-2 text-sm text-gray-600"> Total Events: {{ USER_EVENTS.length }} </span>
                        </div>

                        <div class="relative min-h-[80vh] flex-1 rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                            <Calendar :events="USER_EVENTS" :options="myCalendarOptions" :key="`cal-${current}-${USER_EVENTS.length}`" />
                        </div>
                    </div>

                    <div class="flex flex-col gap-4 lg:w-72">
                        <div class="flex flex-col gap-2 rounded-lg bg-gray-100 p-4 text-base font-semibold shadow lg:text-lg dark:bg-gray-800">
                            <div class="flex items-center justify-between">
                                <Card>Total Aktivitas: {{ totalAktivitas }}</Card>
                                <button
                                    @click="openOverlay"
                                    :disabled="!isAbsen"
                                    :class="isAbsen ? 'bg-green-500 hover:bg-green-600' : 'cursor-not-allowed bg-gray-400'"
                                    class="flex items-center justify-center rounded px-2 py-1 text-sm text-white"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                        <div class="grid grid-cols-3 space-y-2 space-x-2 text-xs lg:block lg:text-base">
                            <Card class="">Disetujui: {{ disetujui }}</Card>
                            <Card class="">Ditolak: {{ ditolak }}</Card>
                            <Card class="">Belum Validasi: {{ belumDivalidasi }}</Card>
                        </div>
                    </div>
                </div>
            </CardContent>
            <DialogEvent v-model:open="showOverlay" />
            <!-- <DialogDetail v-model="open" :activity="detail" /> -->
        </Card>
    </div>
</template>
