import { ref, computed } from 'vue'
import type { EventItem } from '@/types/eventActivity'
import { STATUS } from '@/constants'

// ===== SINGLETON PATTERN - STATE DIBUAT DI LUAR FUNCTION =====
const myEvents = ref<EventItem[]>([])
const employeeEvents = ref<EventItem[]>([
  { 
    title: 'Meeting Tim', 
    date: '2025-09-03', 
    extendedProps: { 
      userId: 1, 
      userName: 'Budi Santoso', 
      status: STATUS.DISETUJUI, 
      startTime: '10:00', 
      endTime: '11:00', 
      activity: 'Meeting' 
    } 
  },
  { 
    title: 'Development', 
    date: '2025-09-03', 
    extendedProps: { 
      userId: 2, 
      userName: 'Sinta Dewi', 
      status: STATUS.DISETUJUI, 
      startTime: '11:00', 
      endTime: '12:00', 
      activity: 'Coding' 
    } 
  },
  { 
    title: 'Training Vue.js', 
    date: '2025-09-04', 
    extendedProps: { 
      userId: 3, 
      userName: 'Dina Pratiwi', 
      status: STATUS.DISETUJUI, 
      startTime: '09:00', 
      endTime: '10:30', 
      activity: 'Training' 
    } 
  },
  { 
    title: 'Code Review', 
    date: '2025-09-04', 
    extendedProps: { 
      userId: 1, 
      userName: 'Budi Santoso', 
      status: STATUS.DRAFTED, 
      startTime: '14:00', 
      endTime: '15:00', 
      activity: 'Review' 
    } 
  },
  { 
    title: 'Client Meeting', 
    date: '2025-09-05', 
    extendedProps: { 
      userId: 2, 
      userName: 'Sinta Dewi', 
      status: STATUS.DITOLAK, 
      startTime: '16:00', 
      endTime: '17:00', 
      activity: 'Meeting' 
    } 
  },
  { 
    title: 'Testing', 
    date: '2025-09-05', 
    extendedProps: { 
      userId: 4, 
      userName: 'Andi Wijaya', 
      status: STATUS.DISETUJUI, 
      startTime: '13:00', 
      endTime: '14:30', 
      activity: 'Testing' 
    } 
  }
])
const isAbsen = ref(false)

export function useEvents() {
  // ===== MY EVENTS COMPUTED STATS =====
  const totalAktivitas = computed(() => myEvents.value.filter(e => e.title !== 'Absen').length)
  const disetujui = computed(() => myEvents.value.filter(e => e.extendedProps.status === STATUS.DISETUJUI && e.title !== 'Absen').length)
  const ditolak = computed(() => myEvents.value.filter(e => e.extendedProps.status === STATUS.DITOLAK && e.title !== 'Absen').length)
  const belumDivalidasi = computed(() => myEvents.value.filter(e => e.extendedProps.status === STATUS.DRAFTED && e.title !== 'Absen').length)

  // ===== EMPLOYEE EVENTS COMPUTED STATS =====
  const totalEmployeeActivities = computed(() => employeeEvents.value.filter(e => e.title !== 'Absen').length)
  const employeeDisetujui = computed(() => employeeEvents.value.filter(e => e.extendedProps.status === STATUS.DISETUJUI && e.title !== 'Absen').length)
  const employeeDitolak = computed(() => employeeEvents.value.filter(e => e.extendedProps.status === STATUS.DITOLAK && e.title !== 'Absen').length)
  const employeeBelumValidasi = computed(() => employeeEvents.value.filter(e => e.extendedProps.status === STATUS.DRAFTED && e.title !== 'Absen').length)

  // ===== EMPLOYEE GROUPING =====
  const eventsByEmployee = computed(() => {
    const map = new Map<number, EventItem[]>()
    employeeEvents.value.forEach(ev => {
      if (!ev.extendedProps.userId) return
      if (!map.has(ev.extendedProps.userId)) map.set(ev.extendedProps.userId, [])
      map.get(ev.extendedProps.userId)!.push(ev)
    })
    return map
  })

  // ===== EMPLOYEE STATS PER USER =====
  const perUserStats = computed(() => {
    const stats: Record<number, { 
      userName: string
      hadir: number
      telat: number
      cuti: number
      total: number
      disetujui: number
      ditolak: number
      drafted: number
    }> = {}
    
    eventsByEmployee.value.forEach((events, userId) => {
      const userName = events[0]?.extendedProps?.userName || `User ${userId}`
      stats[userId] = {
        userName,
        hadir: events.filter(e => e.extendedProps.status === STATUS.HADIR).length,
        telat: events.filter(e => e.extendedProps.status === STATUS.TELAT).length,
        cuti: events.filter(e => e.extendedProps.status === STATUS.CUTI).length,
        total: events.filter(e => e.title !== 'Absen').length,
        disetujui: events.filter(e => e.extendedProps.status === STATUS.DISETUJUI).length,
        ditolak: events.filter(e => e.extendedProps.status === STATUS.DITOLAK).length,
        drafted: events.filter(e => e.extendedProps.status === STATUS.DRAFTED).length,
      }
    })
    return stats
  })

  // ===== UNIQUE EMPLOYEES LIST =====
  const employeesList = computed(() => {
    const employees = new Map()
    employeeEvents.value.forEach(event => {
      if (event.extendedProps.userId && event.extendedProps.userName) {
        employees.set(event.extendedProps.userId, {
          id: event.extendedProps.userId,
          name: event.extendedProps.userName
        })
      }
    })
    return Array.from(employees.values())
  })

  // ===== ADD FUNCTIONS =====
  function addEvent(event: EventItem) {
    myEvents.value.push(event)
    console.log('My Event ditambahkan:', event)
    console.log('Total my events sekarang:', myEvents.value.length)
  }

  function addEmployeeEvent(event: EventItem) {
    employeeEvents.value.push(event)
    console.log('Employee event ditambahkan:', event)
    console.log('Total employee events sekarang:', employeeEvents.value.length)
  }

  // ===== FILTER FUNCTIONS =====
  function getEventsByUser(userId: number) {
    return employeeEvents.value.filter(event => event.extendedProps.userId === userId)
  }

  function getEventsByStatus(status: string, isEmployee = false) {
    const events = isEmployee ? employeeEvents.value : myEvents.value
    return events.filter(event => event.extendedProps.status === status)
  }

  function getEventsByDate(date: string, isEmployee = false) {
    const events = isEmployee ? employeeEvents.value : myEvents.value
    return events.filter(event => event.date === date)
  }

  return {
    // ===== MY EVENTS =====
    myEvents,
    isAbsen,
    totalAktivitas,
    disetujui,
    ditolak,
    belumDivalidasi,
    addEvent,
    
    // ===== EMPLOYEE EVENTS =====
    employeeEvents,
    totalEmployeeActivities,
    employeeDisetujui,
    employeeDitolak,
    employeeBelumValidasi,
    addEmployeeEvent,
    
    // ===== EMPLOYEE ANALYSIS =====
    eventsByEmployee,
    perUserStats,
    employeesList,
    
    // ===== UTILITY FUNCTIONS =====
    getEventsByUser,
    getEventsByStatus,
    getEventsByDate,
  }
}