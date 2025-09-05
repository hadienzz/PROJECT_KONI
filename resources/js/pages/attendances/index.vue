<script setup lang="ts">
import Calendar from '@/components/Calendar.vue';
import { useEventsManager } from '@/composables/activities/useEventsManager';
import { useCalendarOptions } from '@/composables/useCalendarOptions';
import { STATUS, USER_EVENTS } from '@/constants';
import AppLayout from '@/layouts/AppLayout.vue';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { computed } from 'vue';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
    {
        title: 'Attendance',
        href: 'attendance',
    },
];

// Ambil data absensi semua karyawan
const { eventsByEmployee, totalKaryawan, hadir, telat, cuti, belumAbsen } = useEventsManager();

const eventsArray = computed(() =>
    Array.from(eventsByEmployee.value.values())
        .flat()
        .map((event) => ({
            ...event,
            extendedProps: {
                ...event.extendedProps,
                startTime: event.extendedProps.startTime ?? '',
                endTime: event.extendedProps.endTime ?? '',
                userName: event.extendedProps.userName ?? '',
                status: event.extendedProps.status ?? '',
            },
        })),
);

const { calendarOptions } = useCalendarOptions(USER_EVENTS.value, 'attendance-calendar', {
    enableDayCellColors: false,
    enableEventHover: true,
    enableDateClick: false,
    page: 'attendance',
});
</script>

<template>
    <Head title="Attendance" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <!-- Statistik -->
            <div class="grid auto-rows-min gap-4 md:grid-cols-4">
                <div class="rounded-xl bg-green-100 p-4 shadow">
                    <p class="font-bold">Total Karyawan</p>
                    <p>{{ totalKaryawan }}</p>
                </div>
                <div class="rounded-xl bg-blue-100 p-4 shadow">
                    <p class="font-bold">Hadir</p>
                    <p>{{ hadir }}</p>
                </div>
                <div class="rounded-xl bg-yellow-100 p-4 shadow">
                    <p class="font-bold">Telat</p>
                    <p>{{ telat }}</p>
                </div>
                <div class="rounded-xl bg-red-100 p-4 shadow">
                    <p class="font-bold">Belum Absen</p>
                    <p>{{ belumAbsen }}</p>
                </div>
            </div>

            <!-- Kalender Absen -->
            <div class="relative rounded-xl border border-sidebar-border/70 p-4 dark:border-sidebar-border">
                <h2 class="mb-2 text-lg font-semibold">Kalender Absensi</h2>
                <Calendar :events="USER_EVENTS" :options="calendarOptions" />
            </div>

            <!-- Detail Absensi Per Karyawan -->
            <div class="relative rounded-xl border border-sidebar-border/70 p-4 dark:border-sidebar-border">
                <h2 class="mb-2 text-lg font-semibold">Detail Absensi</h2>
                <table class="w-full border-collapse border border-gray-200">
                    <thead>
                        <tr class="bg-gray-100">
                            <th class="border px-2 py-1">Nama</th>
                            <th class="border px-2 py-1">Status Terakhir</th>
                            <th class="border px-2 py-1">Jam Masuk</th>
                            <th class="border px-2 py-1">Jam Pulang</th>
                            <th class="border px-2 py-1">Hadir</th>
                            <th class="border px-2 py-1">Telat</th>
                            <th class="border px-2 py-1">Cuti</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="[employeeId, events] in eventsByEmployee" :key="employeeId">
                            <!-- ambil nama dari salah satu event -->
                            <td class="border px-2 py-1">{{ events[0]?.extendedProps.userName || '-' }}</td>

                            <!-- status terakhir = ambil event terakhir -->
                            <td class="border px-2 py-1">{{ events[events.length - 1]?.extendedProps.status || '-' }}</td>

                            <!-- jam masuk/pulang dari event terakhir juga -->
                            <td class="border px-2 py-1">{{ events[events.length - 1]?.extendedProps.startTime || '-' }}</td>
                            <td class="border px-2 py-1">{{ events[events.length - 1]?.extendedProps.endTime || '-' }}</td>

                            <!-- total status -->
                            <td class="border px-2 py-1">
                                {{ events.filter((e) => e.extendedProps.status === STATUS.HADIR).length }}
                            </td>
                            <td class="border px-2 py-1">
                                {{ events.filter((e) => e.extendedProps.status === STATUS.TELAT).length }}
                            </td>
                            <td class="border px-2 py-1">
                                {{ events.filter((e) => e.extendedProps.status === STATUS.CUTI).length }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </AppLayout>
</template>
