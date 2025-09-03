<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import AppLayout from '@/layouts/AppLayout.vue'
import { dashboard } from '@/routes'
import { type BreadcrumbItem } from '@/types'
import { Head } from '@inertiajs/vue3'
import Calendar from '@/components/Calendar.vue'
import Card from '@/components/ui/card/Card.vue'
import CardHeader from '@/components/ui/card/CardHeader.vue'
import CardContent from '@/components/ui/card/CardContent.vue'
import { useEvents } from '@/composables/useActivities'
import { useAbsent } from '@/composables/useAbsent'
import { STATUS, ACTIVITIES } from '@/constants'
import { useCalendarOptions } from '@/composables/useCalendarOptions'
import { TabsContent, TabsList, TabsRoot, TabsTrigger } from 'reka-ui'
import { useActivityForm } from '@/composables/useActivityForm'

const { 
  myEvents, 
  employeeEvents, 
  totalAktivitas, 
  disetujui, 
  ditolak, 
  belumDivalidasi,
  isAbsen,
  employeeDisetujui,
  employeeDitolak,
  employeeBelumValidasi,
  perUserStats,
  employeesList,
  getEventsByUser,
} = useEvents()

// Import functions dari composables lain
const { handleAbsen } = useAbsent()
const { selectedActivity, startTime, endTime, photoFile, handlePhotoUpload, submitForm } = useActivityForm()

// Add default calendar options for myEvents tab
const { calendarOptions: myCalendarOptions } = useCalendarOptions(myEvents.value, 'my-attendance-calendar', {
  enableDayCellColors: true,  
  enableEventHover: true,    
  enableDateClick: false,       
  page: 'activity',          
})

// === Fitur Filter Karyawan ===
const selectedEmployeeId = ref<number | null>(null) 

// Computed property untuk event karyawan yang difilter
const filteredEmployeeEvents = computed(() => {
  if (selectedEmployeeId.value === null) {
    return employeeEvents.value 
  }
  return getEventsByUser(selectedEmployeeId.value) 
})

const employeeCalendarOptionsComputed = computed(() => {

  return useCalendarOptions(filteredEmployeeEvents.value, 'employee-attendance-calendar', {
    enableDayCellColors: true,  
    enableEventHover: true,    
    enableDateClick: false,       
    page: 'activity',          
  }).calendarOptions.value; // Ambil nilai .value dari ref yang dikembalikan composable
});

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: dashboard().url },
  { title: 'Profile', href: 'Activities' },
]

// Overlay state
const showOverlay = ref(false)
const openOverlay = () => showOverlay.value = true
const closeOverlay = () => showOverlay.value = false

const handleSubmitAndClose = async () => {
  await submitForm()
  closeOverlay()
}

const current = ref<'aktivitasmu' | 'aktivitas pegawai'>('aktivitasmu')

// Watch untuk debug
watch(myEvents, (newVal) => {
  console.log('Events di component:', newVal.length)
  console.log('Event terbaru:', newVal)
}, { deep: true })

watch(employeeEvents, (newVal) => {
  console.log('Employee Events di component:', newVal.length)
  console.log('Employee Event terbaru:', newVal)
}, { deep: true })

</script>

<template>
  <Head title="Activities" />
  <AppLayout :breadcrumbs="breadcrumbs">
    <TabsRoot v-model="current" class="w-full">
      <div class="overflow-x-auto">
          <TabsList class="relative flex gap-6 border-b" aria-label="Data Pegawai">
              <TabsTrigger
                  value="aktivitasmu"
                  class="-mb-px border-b-2 border-transparent px-1.5 pb-3 text-sm font-medium whitespace-nowrap text-gray-600 hover:text-blue-600 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600"
              >
                  Aktivitasmu 
              </TabsTrigger>

              <TabsTrigger
                  value="aktivitas pegawai"
                  class="-mb-px border-b-2 border-transparent px-1.5 pb-3 text-sm font-medium whitespace-nowrap text-gray-600 hover:text-blue-600 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600"
              >
                  Aktivitas Pegawai
              </TabsTrigger>
          </TabsList>
      </div>

      <div class="pt-4">
          <TabsContent value="aktivitasmu">
              <div class="grid gap-6 lg:grid-cols-1">
                  <Card class="border">
                      <CardHeader class="pb-2 text-sm font-semibold">Data Pegawai</CardHeader>
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

                            <div class="relative min-h-[80vh] flex-1 rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                              <Calendar :events="myEvents" :options="myCalendarOptions" :key="`cal-${current}-${myEvents.length}`" />
                            </div>
                          </div>

                          <!-- Statistik -->
                          <div class="w-72 flex flex-col gap-4">
                            <div class="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow text-lg font-semibold flex flex-col gap-2">
                              <div class="flex justify-between items-center">
                                <Card>Total Aktivitas: {{ totalAktivitas }}</Card>
                                <button @click="openOverlay" 
                                        :disabled="!isAbsen"
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
          </TabsContent>

          <TabsContent value="aktivitas pegawai">
              <div class="grid gap-6 lg:grid-cols-1">
                  <Card class="border">
                      <CardHeader class="pb-2 text-sm font-semibold">Data Pegawai</CardHeader>
                      <CardContent class="space-y-2">
                        <div class="flex h-full flex-1 gap-4 overflow-x-auto rounded-xl p-4">
                          
                          <!-- Kalender Aktivitas Pegawai -->
                          <div class="flex-1 flex flex-col gap-4">
                            <!-- Dropdown Filter Karyawan -->
                            <div class="mb-4">
                              <label for="employeeFilter" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Lihat Jadwal Karyawan:</label>
                              <select id="employeeFilter" v-model="selectedEmployeeId" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white">
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
                          <div class="w-72 flex flex-col gap-4">
                            <div class="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow text-lg font-semibold flex flex-col gap-2">
                              <!-- Total aktivitas pegawai sekarang merefleksikan yang difilter -->
                              <Card>Total Aktivitas Pegawai: {{ filteredEmployeeEvents.filter(e => e.title !== 'Absen').length }}</Card>
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
                            
                            <h3 class="text-md font-semibold mt-4">Statistik Per Pegawai:</h3>
                            <!-- Tampilkan semua statistik per user jika tidak ada filter, atau hanya yang difilter -->
                            <template v-if="selectedEmployeeId === null">
                              <div v-for="(stats, userId) in perUserStats" :key="userId" class="border p-2 rounded-lg text-sm">
                                <p class="font-medium">{{ stats.userName }}</p>
                                <p>Total: {{ stats.total }}</p>
                                <p>Disetujui: {{ stats.disetujui }}</p>
                                <p>Ditolak: {{ stats.ditolak }}</p>
                                <p>Drafted: {{ stats.drafted }}</p>
                              </div>
                            </template>
                            <template v-else>
                              <div v-if="perUserStats[selectedEmployeeId]" class="border p-2 rounded-lg text-sm">
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
          </TabsContent>
      </div>
  </TabsRoot>

    <!-- Overlay -->
    <div v-if="showOverlay" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-96">
        <h2 class="text-lg font-semibold mb-4">Tambah Aktivitas</h2>

        <div class="space-y-4">
          <div>
            <label class="block mb-1 font-medium">Foto</label>
            <input type="file" @change="handlePhotoUpload" class="border p-1 rounded w-full"/>
          </div>

          <div>
            <label class="block mb-1 font-medium">Kegiatan</label>
            <select v-model="selectedActivity" class="border p-1 rounded w-full">
              <option value="" disabled>Pilih kegiatan</option>
              <option v-for="act in ACTIVITIES" :key="act.name" :value="act.name">
                {{ act.name }} ({{ act.points }} poin)
              </option>
            </select>
          </div>

          <div class="flex gap-4">
            <div class="flex-1">
              <label class="block mb-1 font-medium">Start Time</label>
              <input type="time" v-model="startTime" class="border p-1 rounded w-full"/>
            </div>
            <div class="flex-1">
              <label class="block mb-1 font-medium">End Time</label>
              <input type="time" v-model="endTime" class="border p-1 rounded w-full"/>
            </div>
          </div>

          <div class="flex justify-end gap-3">
            <button @click="closeOverlay" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Tutup</button>
            <button @click="handleSubmitAndClose" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Submit</button>
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>
