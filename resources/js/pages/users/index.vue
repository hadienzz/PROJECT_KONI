<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/vue3';
import DataTable from '@/components/DataTable.vue';
import { Button } from '@/components/ui/button';
import { computed } from 'vue';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  nrk: string;
  phone: string;
  branch_id: number;
}

const page = usePage<{ users: User[] }>();
const users = computed(() => page.props.users || []);

const tableHeaders = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'role', label: 'Role' },
  { key: 'nrk', label: 'NRK' },
  { key: 'phone', label: 'Phone' },
];

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: dashboard().url,
  },
  {
    title: 'Users',
    href: '#',
  },
];
</script>

<template>
  <Head title="Users" />

  <AppLayout :breadcrumbs="breadcrumbs">
    <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
      <!-- Header -->
      <div class="flex items-center justify-between">
        <h2 class="text-2xl font-bold">Users</h2>
        <Button>Add User</Button>
      </div>

      <!-- Table -->
      <DataTable
        :headers="tableHeaders"
        :items="users"
      >
        <template #actions="{ item }">
          <div class="flex gap-2">
            <Button variant="outline" size="sm">
              Edit
            </Button>
            <Button variant="destructive" size="sm">
              Delete
            </Button>
          </div>
        </template>
      </DataTable>

      <!-- Debug Info -->
      <div class="mt-4 space-y-2 rounded-lg bg-gray-50 p-4 text-sm">
        <h3 class="font-semibold">Debug Information:</h3>
        <div>Available props: {{ Object.keys(page.props).join(', ') }}</div>
        <div>Users count: {{ users.length }}</div>
      </div>
    </div>
  </AppLayout>
</template>
