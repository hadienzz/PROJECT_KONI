<script setup lang="ts">
import Calendar from '@/components/Calendar.vue';
import DialogEvent from '@/pages/activities/components/DialogAddEvent.vue';
import Card from '@/components/ui/card/Card.vue';
import CardContent from '@/components/ui/card/CardContent.vue';
import CardHeader from '@/components/ui/card/CardHeader.vue';
import { useAbsent } from '@/composables/useAbsent';
import { useEvents } from '@/composables/useActivities';
import { useActivityForm } from '@/composables/useActivityForm';
import { useCalendarOptions } from '@/composables/useCalendarOptions';
import { ref } from 'vue';

const { myEvents, totalAktivitas, disetujui, ditolak, belumDivalidasi, isAbsen } = useEvents();

const { handleAbsen } = useAbsent();
const { selectedActivity, startTime, endTime, photoFile, handlePhotoUpload, submitForm } = useActivityForm();

const { calendarOptions: myCalendarOptions } = useCalendarOptions(myEvents.value, 'my-attendance-calendar', {
    enableDayCellColors: true,
    enableEventHover: true,
    enableDateClick: false,
    page: 'activity',
});

// Overlay state
const showOverlay = ref(false);
const current = ref(new Date());

const openOverlay = () => {
    showOverlay.value = true;
};
const closeOverlay = () => {
    showOverlay.value = false;
};

const handleSubmitAndClose = async () => {
    await submitForm();
    closeOverlay();
};
</script>

<template>
    <div class="grid gap-6 lg:grid-cols-1">
        <Card class="border">
            <CardHeader class="pb-2 text-sm font-semibold">Data Aktivitas</CardHeader>
            <CardContent class="space-y-2">
                <div class="flex h-full flex-1 gap-4 overflow-x-auto rounded-xl p-4">
                    <!-- Kalender & Absen -->
                    <div class="flex flex-1 flex-col gap-4">
                        <div>
                            <button @click="handleAbsen" class="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
                                Absen ({{ isAbsen ? 'Sudah Absen' : 'Belum Absen' }})
                            </button>
                            <span class="ml-2 text-sm text-gray-600"> Total Events: {{ myEvents.length }} </span>
                        </div>

                        <div class="relative min-h-[80vh] flex-1 rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                            <Calendar :events="myEvents" :options="myCalendarOptions" :key="`cal-${current}-${myEvents.length}`" />
                        </div>
                    </div>

                    <!-- Statistik -->
                    <div class="flex w-72 flex-col gap-4">
                        <div class="flex flex-col gap-2 rounded-lg bg-gray-100 p-4 text-lg font-semibold shadow dark:bg-gray-800">
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

                        <Card>Disetujui: {{ disetujui }}</Card>
                        <Card>Ditolak: {{ ditolak }}</Card>
                        <Card>Belum Validasi: {{ belumDivalidasi }}</Card>
                    </div>
                </div>
            </CardContent>
            <DialogEvent v-model:open="showOverlay" />
        </Card>
    </div>
</template>
