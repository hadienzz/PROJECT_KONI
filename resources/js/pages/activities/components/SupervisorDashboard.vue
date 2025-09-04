<script setup lang="ts">
import { ref, computed } from 'vue';
import Calendar from '@/components/Calendar.vue';
import Card from '@/components/ui/card/Card.vue';
import CardContent from '@/components/ui/card/CardContent.vue';
import CardHeader from '@/components/ui/card/CardHeader.vue';
import { useEvents } from '@/composables/useActivities';
import { useCalendarOptions } from '@/composables/useCalendarOptions';

// Update StatusType to match your actual status values
type StatusType = 'disetujui' | 'ditolak' | 'drafted';

// Interface for the data structure coming from useEvents
interface ActivityEvent {
    title: string;
    date: string;
    extendedProps: {
        status: StatusType;
        photo?: string;
        activity?: string;
        points?: number;
        startTime: string;
        endTime: string;
        userId?: number;
        userName?: string;
    };
}

// Updated Event interface to match what Calendar component expects
interface Event extends ActivityEvent {
    id: number;
}

const {
    employeeEvents,
    employeeDisetujui,
    employeeDitolak,
    employeeBelumValidasi,
    perUserStats,
    employeesList,
    getEventsByUser
} = useEvents();

const selectedEmployeeId = ref<number | null>(null);
const current = ref<'list' | 'calendar'>('calendar');

// Updated computed property with type assertion
const filteredEmployeeEvents = computed(() => {
    if (!selectedEmployeeId.value) {
        return employeeEvents.value as Event[];
    }
    return employeeEvents.value.filter(event =>
        event.extendedProps.userId === selectedEmployeeId.value
    ) as Event[];
});

const { calendarOptions: baseCalendarOptions } = useCalendarOptions(
    employeeEvents.value,
    'employee-calendar',
    {
        enableDayCellColors: true,
        enableEventHover: true,
        enableDateClick: false,
        page: 'activity',
    }
);

const employeeCalendarOptionsComputed = computed(() => ({
    ...baseCalendarOptions.value,
    // Add any additional calendar options specific to employee view
}));
</script>

<template>
    <div class="grid gap-6 lg:grid-cols-1">
        <Card class="border">
            <CardHeader class="pb-2 text-sm font-semibold">Data Aktivitas Pegawai</CardHeader>
            <CardContent class="space-y-2">
                <div class="flex h-full flex-1 gap-4 overflow-x-auto rounded-xl p-4">
                    <!-- Kalender Aktivitas Pegawai -->
                    <div class="flex flex-1 flex-col gap-4">
                        <!-- Dropdown Filter Karyawan -->
                        <div class="mb-4">
                            <label for="employeeFilter" class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                >Lihat Jadwal Karyawan:</label
                            >
                            <select
                                id="employeeFilter"
                                v-model="selectedEmployeeId"
                                class="mt-1 block w-full rounded-md border-gray-300 py-2 pr-10 pl-3 text-base focus:border-blue-500 focus:ring-blue-500 focus:outline-none sm:text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                            >
                                <option :value="null">Semua Karyawan</option>
                                <option v-for="employee in employeesList" :key="employee.id" :value="employee.id">
                                    {{ employee.name }}
                                </option>
                            </select>
                        </div>

                        <div class="relative min-h-[80vh] flex-1 rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                            <!-- Menggunakan employeeCalendarOptionsComputed -->
                            <Calendar
                                :key="`employee-${current}-${filteredEmployeeEvents.length}-${selectedEmployeeId}`"
                                :events="filteredEmployeeEvents"
                                :options="employeeCalendarOptionsComputed"
                            />
                        </div>
                    </div>

                    <!-- Statistik Aktivitas Pegawai -->
                    <div class="flex w-72 flex-col gap-4">
                        <div class="flex flex-col gap-2 rounded-lg bg-gray-100 p-4 text-lg font-semibold shadow dark:bg-gray-800">
                            <!-- Total aktivitas pegawai sekarang merefleksikan yang difilter -->
                            <Card>Total Aktivitas Pegawai: {{ filteredEmployeeEvents.filter((e) => e.title !== 'Absen').length }}</Card>
                        </div>

                        <!-- Statistik di sini bisa kita buat dinamis berdasarkan `selectedEmployeeId` -->
                        <template v-if="selectedEmployeeId === null">
                            <Card>Disetujui Pegawai: {{ employeeDisetujui }}</Card>
                            <Card>Ditolak Pegawai: {{ employeeDitolak }}</Card>
                            <Card>Belum Validasi Pegawai: {{ employeeBelumValidasi }}</Card>
                        </template>
                        <template v-else>
                            <!-- Tampilkan statistik untuk karyawan yang dipilih -->
                            <div v-if="perUserStats[selectedEmployeeId]">
                                <Card>Disetujui: {{ perUserStats[selectedEmployeeId].disetujui }}</Card>
                                <Card>Ditolak: {{ perUserStats[selectedEmployeeId].ditolak }}</Card>
                                <Card>Drafted: {{ perUserStats[selectedEmployeeId].drafted }}</Card>
                            </div>
                            <div v-else>
                                <Card>Tidak ada data untuk karyawan ini.</Card>
                            </div>
                        </template>

                        <h3 class="text-md mt-4 font-semibold">Statistik Per Pegawai:</h3>
                        <!-- Tampilkan semua statistik per user jika tidak ada filter, atau hanya yang difilter -->
                        <template v-if="selectedEmployeeId === null">
                            <div v-for="(stats, userId) in perUserStats" :key="userId" class="rounded-lg border p-2 text-sm">
                                <p class="font-medium">{{ stats.userName }}</p>
                                <p>Total: {{ stats.total }}</p>
                                <p>Disetujui: {{ stats.disetujui }}</p>
                                <p>Ditolak: {{ stats.ditolak }}</p>
                                <p>Drafted: {{ stats.drafted }}</p>
                            </div>
                        </template>
                        <template v-else>
                            <div v-if="perUserStats[selectedEmployeeId]" class="rounded-lg border p-2 text-sm">
                                <p class="font-medium">{{ perUserStats[selectedEmployeeId].userName }}</p>
                                <p>Total: {{ perUserStats[selectedEmployeeId].total }}</p>
                                <p>Disetujui: {{ perUserStats[selectedEmployeeId].disetujui }}</p>
                                <p>Ditolak: {{ perUserStats[selectedEmployeeId].ditolak }}</p>
                                <p>Drafted: {{ perUserStats[selectedEmployeeId].drafted }}</p>
                            </div>
                            <div v-else>
                                <p>Pilih karyawan untuk melihat statistik.</p>
                            </div>
                        </template>
                    </div>
                </div>
            </CardContent>
        </Card>
    </div>
</template>
