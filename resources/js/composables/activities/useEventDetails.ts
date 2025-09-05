// composables/activities/useEventDetails.ts
import { USER_EVENTS } from '@/constants';
import { ref } from 'vue';
import type { AddActivitiesProps } from './useAddActivities';

const detailsOpened = ref(false);
const selectedEvent = ref<AddActivitiesProps | null>(null);

function handleDetail(id: string) {
    const item = USER_EVENTS.value.find((e) => e.event_id === id) ?? null;
    selectedEvent.value = item;
    detailsOpened.value = !!item;
}

function closeDetail() {
    detailsOpened.value = false;
}

export default function useEventDetails() {
    return {
        detailsOpened,
        selectedEvent,
        handleDetail,
        closeDetail,
    };
}
