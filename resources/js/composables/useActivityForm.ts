import { ref } from 'vue'
import type { EventItem } from '@/types/eventActivity'
import { useEvents } from './useActivities'
import { STATUS } from '@/constants'

export function useActivityForm() {
  // Gunakan shared state dari useEvents
  const { addEvent } = useEvents()

  const selectedActivity = ref('')
  const startTime = ref('')
  const endTime = ref('')
  const photoFile = ref<File | null>(null)

  const handlePhotoUpload = (event: Event) => {
    const target = event.target as HTMLInputElement
    if (target.files && target.files[0]) {
      photoFile.value = target.files[0]
    }
  }

  const submitForm = (closeCallback?: () => void) => {
    console.log('submitForm dipanggil!')
    console.log('Data form:', {
      selectedActivity: selectedActivity.value,
      startTime: startTime.value,
      endTime: endTime.value
    })

    if (!selectedActivity.value || !startTime.value || !endTime.value) {
      alert('Isi semua field dulu!')
      return false
    }

    if (startTime.value >= endTime.value) {
      alert('Start time harus sebelum End time!')
      return false
    }

    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2,'0')
    const day = String(now.getDate()).padStart(2,'0')
    const todayStr = `${year}-${month}-${day}`

    // Tambahkan event ke shared myEvents
    const newEvent = {
      title: selectedActivity.value,
      date: todayStr,
      extendedProps: {
        status: STATUS.DISETUJUI,
        activity: selectedActivity.value,
        startTime: startTime.value,
        endTime: endTime.value
      }
    }

    console.log('Event yang akan ditambahkan:', newEvent)
    addEvent(newEvent)

    // Reset form
    selectedActivity.value = ''
    startTime.value = ''
    endTime.value = ''
    photoFile.value = null

    alert('Event berhasil ditambahkan!')
    
    // Close overlay setelah submit berhasil
    if (closeCallback) {
      closeCallback()
    }
    
    return true
  }

  return { selectedActivity, startTime, endTime, photoFile, handlePhotoUpload, submitForm }
}