<script setup lang="ts">
import { ref, computed } from 'vue'
import AppLayout from '@/layouts/AppLayout.vue'
import { dashboard } from '@/routes'
import { type BreadcrumbItem } from '@/types'
import { Head, usePage } from '@inertiajs/vue3'
import EmployeeActivities from './components/EmployeeActivities.vue'
import SupervisorDashboard from './components/SupervisorDashboard.vue'

const page = usePage()
const user = computed(() => page.props.auth.user)
const isEmployee = computed(() => user.value?.role === 'pegawai')
const isSupervisor = computed(() => ['superadmin', 'atasan'].includes(user.value?.role))

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: dashboard().url },
  { title: 'Activities', href: '#' },
]
</script>

<template>
  <Head title="Activities" />

  <AppLayout :breadcrumbs="breadcrumbs">
    <!-- Show Employee Activities only for employees -->
    <EmployeeActivities v-if="isEmployee" />

    <!-- Show Supervisor Dashboard only for supervisors -->
    <SupervisorDashboard v-if="isSupervisor" />
  </AppLayout>
</template>
