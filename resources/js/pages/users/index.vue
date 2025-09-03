    <script setup lang="ts">
    import AppLayout from '@/layouts/AppLayout.vue';
    import { dashboard } from '@/routes';
    import { type BreadcrumbItem } from '@/types';
    import { Head, Link, router, usePage } from '@inertiajs/vue3';
    import DataTable from '@/components/DataTable.vue';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { computed, ref } from 'vue';

    interface User {
        id: number;
        name: string;
        email: string;
        role: string;
        nrk: string;
        phone: string;
        branch_id: number;
    }

    const page = usePage<{
    users: { data: User[], links: any[], meta: any },
    filters: { search: string, role: string }
    }>();

    const users = computed(() => page.props.users?.data || []);
    const pagination = computed(() => page.props.users?.links || []);

    const filters = ref({ ...page.props.filters });

    const tableHeaders = [
        { key: 'name', label: 'Name' },
        { key: 'email', label: 'Email' },
        { key: 'role', label: 'Role' },
        { key: 'nrk', label: 'NRK' },
        { key: 'phone', label: 'Phone' },
    ];

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: dashboard().url },
        { title: 'Users', href: '#' },
    ];

    function updateFilters() {
        router.get(route('users'), filters.value, { preserveState: true, replace: true });
    }
    </script>

    <template>
    <Head title="Users" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="flex flex-col gap-4 p-4">
        <!-- Header -->
        <div class="flex items-center justify-between">
            <h2 class="text-2xl font-bold">Users</h2>
            <Button>Add User</Button>
        </div>

        <!-- Filters -->
        <div class="flex gap-2">
            <Input v-model="filters.search" placeholder="Search..." @keyup.enter="updateFilters" />
            <select v-model="filters.role" @change="updateFilters" class="border rounded p-2">
            <option value="">All Roles</option>
            <option value="superadmin">Superadmin</option>
            <option value="atasan">Atasan</option>
            <option value="pegawai">Pegawai</option>
            </select>
        </div>

        <!-- Table -->
        <DataTable :headers="tableHeaders" :items="users">
            <template #actions="{ item }">
            <div class="flex gap-2">
                <Button variant="outline" size="sm">Edit</Button>
                <Button variant="destructive" size="sm">Delete</Button>
            </div>
            </template>
        </DataTable>

        <!-- Pagination -->
        <div class="flex gap-2 mt-4">
            <Link
            v-for="link in pagination"
            :key="link.label"
            :href="link.url || ''"
            class="px-3 py-1 rounded"
            :class="[{ 'bg-sky-500 text-white': link.active }, { 'text-gray-400': !link.url }]"
            v-html="link.label"
            />
        </div>
        </div>
    </AppLayout>
    </template>
