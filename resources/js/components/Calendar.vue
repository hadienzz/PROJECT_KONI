<script setup lang="ts">
import { AddActivitiesProps } from '@/composables/activities/useAddActivities';
import { useCalendarOptions } from '@/composables/useCalendarOptions';
import FullCalendar from '@fullcalendar/vue3';
import { ref, watch } from 'vue';

// interface MyEvent {
//     title: string;
//     date: string;
//     category?: string;
//     extendedProps?: {
//         status?: string;
//         startTime: string;
//         endTime: string;
//         activity?: string;
//         photo?: string;
//     };
// }

const props = defineProps<{ events: AddActivitiesProps[] }>();
const calendarRef = ref<InstanceType<typeof FullCalendar> | null>(null);
const calendarKey = ref(0);

const { calendarOptions } = useCalendarOptions(props.events, calendarKey);

watch(
    () => props.events,
    () => calendarKey.value++,
    { deep: true },
);
</script>

<template>
    <FullCalendar :key="calendarKey" ref="calendarRef" :options="calendarOptions" />
</template>
