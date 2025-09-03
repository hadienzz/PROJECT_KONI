<script>
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/vue3';

export default {
    components: {
        FullCalendar,
    },
    data() {
        return {
            calendarOptions: {
                plugins: [dayGridPlugin, interactionPlugin],
                initialView: 'dayGridMonth',
                locale: 'id',
                events: [
                    { title: 'event 1', date: '2025-01-09' },
                    { title: 'event 2', date: '2025-09-10' },
                ],
            },
        };
    },
};
</script>
<template>
    <div class="px-2">
        <FullCalendar :options="calendarOptions" />
    </div>
</template>
