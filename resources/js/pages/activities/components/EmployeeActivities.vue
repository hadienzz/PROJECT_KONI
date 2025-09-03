<script setup lang="ts">
import { ref, watch } from 'vue'
import Calendar from '@/components/Calendar.vue'
import Card from '@/components/ui/card/Card.vue'
import CardHeader from '@/components/ui/card/CardHeader.vue'
import CardContent from '@/components/ui/card/CardContent.vue'
import { useEvents } from '@/composables/useActivities'
import { useAbsent } from '@/composables/useAbsent'
import { useCalendarOptions } from '@/composables/useCalendarOptions'
import { useActivityForm } from '@/composables/useActivityForm'

const {
    myEvents,
    totalAktivitas,
    disetujui,
    ditolak,
    belumDivalidasi,
    isAbsen,
} = useEvents()

const { handleAbsen } = useAbsent()
const { selectedActivity, startTime, endTime, photoFile, handlePhotoUpload, submitForm } = useActivityForm()

const { calendarOptions: myCalendarOptions } = useCalendarOptions(myEvents.value, 'my-attendance-calendar', {
    enableDayCellColors: true,
    enableEventHover: true,
    enableDateClick: false,
    page: 'activity',
})

// Overlay state
const showOverlay = ref(false)
const current = ref(new Date())
const openOverlay = () => showOverlay.value = true
const closeOverlay = () => showOverlay.value = false

const handleSubmitAndClose = async () => {
    await submitForm()
    closeOverlay()
}
</script>

<template>
    <div class="grid gap-6 lg:grid-cols-1">
        <Card class="border">
            <CardHeader class="pb-2 text-sm font-semibold">Data Aktivitas</CardHeader>
            <CardContent class="space-y-2">
                <div class="flex h-full flex-1 gap-4 overflow-x-auto rounded-xl p-4">

                    <!-- Kalender & Absen -->
                    <div class="flex-1 flex flex-col gap-4">
                        <div>
                            <button @click="handleAbsen"
                                class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                                Absen ({{ isAbsen ? 'Sudah Absen' : 'Belum Absen' }})
                            </button>
                            <span class="ml-2 text-sm text-gray-600">
                                Total Events: {{ myEvents.length }}
                            </span>
                        </div>

                        <div
                            class="relative min-h-[80vh] flex-1 rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                            <Calendar :events="myEvents" :options="myCalendarOptions"
                                :key="`cal-${current}-${myEvents.length}`" />
                        </div>
                    </div>

                    <!-- Statistik -->
                    <div class="w-72 flex flex-col gap-4">
                        <div
                            class="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow text-lg font-semibold flex flex-col gap-2">
                            <div class="flex justify-between items-center">
                                <Card>Total Aktivitas: {{ totalAktivitas }}</Card>
                                <button @click="openOverlay" :disabled="!isAbsen"
                                    :class="isAbsen ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-400 cursor-not-allowed'"
                                    class="px-2 py-1 rounded text-white text-sm flex items-center justify-center">
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
        </Card>
    </div>
</template>
