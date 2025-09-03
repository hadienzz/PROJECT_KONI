<script setup lang="ts">
import FullCalendar from '@fullcalendar/vue3'
import { ref, watch, computed } from 'vue'
import { useCalendarOptions } from '@/composables/useCalendarOptions'

interface MyEvent {
  title: string
  date: string
  category?: string
  extendedProps?: {
    status?: string
    startTime: string
    endTime: string
    activity?: string
    photo?: string
  }
}

const props = defineProps<{ events: MyEvent[] }>()

const calendarRef = ref<InstanceType<typeof FullCalendar> | null>(null)
const calendarKey = ref(0)

// inject composable
const { calendarOptions } = useCalendarOptions(props.events, calendarKey)

// Watch biar auto rerender
watch(
  () => props.events,
  () => calendarKey.value++,
  { deep: true }
)
</script>

<template>
  <FullCalendar 
    :key="calendarKey" 
    ref="calendarRef" 
    :options="calendarOptions" 
  />
</template>
