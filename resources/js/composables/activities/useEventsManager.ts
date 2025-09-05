// resources/js/composables/useEventsManager.ts
import { ref, computed } from 'vue'
import type { EventItem } from '@/types/eventActivity'
import { STATUS } from '@/constants'

export function useEventsManager() {
  const allEvents = ref<EventItem[]>([
  {
    title: 'Budi',
    date: '2025-09-02',
    extendedProps: {
      status: 'hadir',
      startTime: '08:00',
      endTime: '09:00',
      userId: 1,
      userName: 'Budi',
    },
  },
  {
    title: 'Sinsta',
    date: '2025-09-02',
    extendedProps: {
      status: 'cuti',
      startTime: '09:00',
      endTime: '17:00',
      userId: 2,
      userName: 'Sinta',
    },
  },
  {
    title: 'Agus',
    date: '2025-09-02',
    extendedProps: {
      status: 'telat',
      startTime: '09:30',
      endTime: '17:00',
      userId: 3,
      userName: 'Agus',
    },
  },
])

  const selectedUserId = ref<string | null>(null)

  // --- FILTER USER ---
  const userEvents = computed(() => {
    if (!selectedUserId.value) return []
    return allEvents.value.filter(ev => String(ev.extendedProps.userId) === String(selectedUserId.value))
  })

  // --- STATISTIK GLOBAL ---
  const totalAktivitas = computed(() =>
    allEvents.value.filter(ev => ev.title !== 'Absen').length
  )
  const disetujui = computed(() =>
    allEvents.value.filter(ev => ev.extendedProps.status === STATUS.DISETUJUI && ev.title !== 'Absen').length
  )
  const ditolak = computed(() =>
    allEvents.value.filter(ev => ev.extendedProps.status === STATUS.DITOLAK && ev.title !== 'Absen').length
  )
  const belumDivalidasi = computed(() =>
    allEvents.value.filter(ev => ev.extendedProps.status === STATUS.DRAFTED && ev.title !== 'Absen').length
  )

  // --- STATISTIK ABSENSI ---
  const hadir = computed(() =>
    allEvents.value.filter(ev => ev.extendedProps.status === STATUS.HADIR).length
  )
  const telat = computed(() =>
    allEvents.value.filter(ev => ev.extendedProps.status === STATUS.TELAT).length
  )
  const cuti = computed(() =>
    allEvents.value.filter(ev => ev.extendedProps.status === STATUS.CUTI).length
  )
  const belumAbsen = computed(() => {
    const uniqueUsers = new Set(allEvents.value.map(ev => ev.extendedProps.userId))
    return uniqueUsers.size - (hadir.value + telat.value + cuti.value)
  })

  // --- STATISTIK PER USER ---
  const totalAktivitasUser = computed(() =>
    userEvents.value.filter(ev => ev.title !== 'Absen').length
  )
  const disetujuiUser = computed(() =>
    userEvents.value.filter(ev => ev.extendedProps.status === STATUS.DISETUJUI && ev.title !== 'Absen').length
  )
  const ditolakUser = computed(() =>
    userEvents.value.filter(ev => ev.extendedProps.status === STATUS.DITOLAK && ev.title !== 'Absen').length
  )
  const belumDivalidasiUser = computed(() =>
    userEvents.value.filter(ev => ev.extendedProps.status === STATUS.DRAFTED && ev.title !== 'Absen').length
  )

  // --- TOTAL KARYAWAN (unik userId) ---
  const totalKaryawan = computed(() =>
    new Set(allEvents.value.map(ev => ev.extendedProps.userId)).size
  )

  // --- EVENTS GROUP BY EMPLOYEE ---
  const eventsByEmployee = computed(() => {
    const map = new Map<number, EventItem[]>()
    allEvents.value.forEach(ev => {
      if (!ev.extendedProps.userId) return
      if (!map.has(ev.extendedProps.userId)) {
        map.set(ev.extendedProps.userId, [])
      }
      map.get(ev.extendedProps.userId)!.push(ev)
    })
    return map
  })

  // --- STATISTIK PER USER ---
  const statsPerUser = computed(() => {
    const result: Record<string, { hadir: number; telat: number; cuti: number }> = {}

    for (const ev of allEvents.value) {
      const userId = String(ev.extendedProps.userId)
      const status = ev.extendedProps.status

      if (!result[userId]) {
        result[userId] = { hadir: 0, telat: 0, cuti: 0 }
      }

      if (status === STATUS.HADIR) result[userId].hadir++
      if (status === STATUS.TELAT) result[userId].telat++
      if (status === STATUS.CUTI) result[userId].cuti++
    }

    return result
  })

  // --- ACTIONS ---
  function addEvent(event: EventItem) {
    allEvents.value.push(event)
  }

  function setUser(userId: string) {
    selectedUserId.value = userId
  }

  return {
    allEvents,
    selectedUserId,
    userEvents,
    totalAktivitas,
    disetujui,
    ditolak,
    belumDivalidasi,
    totalAktivitasUser,
    disetujuiUser,
    ditolakUser,
    belumDivalidasiUser,
    hadir,
    telat,
    cuti,
    belumAbsen,
    totalKaryawan,
    eventsByEmployee,
    addEvent,
    setUser
  }
}
