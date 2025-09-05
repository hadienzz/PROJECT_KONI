<script setup lang="ts">
import DashboardPegawai from '@/components/DashboardPegawai.vue';
import DashboardSuperAdmin from '@/components/DashboardSuperAdmin.vue';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/AppLayout.vue';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/vue3';
import { ClipboardListIcon, Clock, DollarSign, Eye, EyeClosed, Medal } from 'lucide-vue-next';
import { ref } from 'vue';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];
const showSalary = ref<boolean>(false);

const toggleSalary = () => {
    showSalary.value = !showSalary.value;
};

const trend = ref([
    { date: '2025-09-01', dateLabel: '01', points: 80 },
    { date: '2025-09-05', dateLabel: '05', points: 110 },
    { date: '2025-09-10', dateLabel: '10', points: 95 },
    { date: '2025-09-15', dateLabel: '15', points: 160 },
    { date: '2025-09-20', dateLabel: '20', points: 120 },
    { date: '2025-09-25', dateLabel: '25', points: 180 },
]);

const breakdown = ref([
    { label: 'Latihan', points: 640 },
    { label: 'Pertandingan', points: 420 },
    { label: 'Terapi', points: 174 },
]);

function fmtRupiah(x: number) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(x);
}
function fmtNumber(x: number) {
    return new Intl.NumberFormat('id-ID').format(x);
}

const userInfo = usePage();
const isPegawai = userInfo.props.auth.user.role === 'pegawai';
const isSuperadmin = userInfo.props.auth.user.role === 'superadmin';
</script>

<template>
    <Head title="Dashboard" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div class="grid grid-cols-2 gap-2 lg:grid-cols-4">
                <Card class="relative overflow-hidden">
                    <CardHeader class="flex flex-1 flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle class="text-sm font-medium text-muted-foreground">Akumulasi Poin Bulan Ini</CardTitle>
                        <Medal class="h-5 w-5 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div class="text-2xl font-bold text-foreground md:text-3xl">28</div>
                        <p class="mt-1 text-xs text-muted-foreground">Tersisa ... menuju batas</p>
                    </CardContent>
                </Card>

                <Card class="">
                    <CardHeader class="flex flex-1 flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle class="text-sm font-medium text-muted-foreground">Estimasi Gaji</CardTitle>
                        <DollarSign class="h-5 w-5 text-yellow-600" />
                    </CardHeader>
                    <CardContent>
                        <div class="flex items-center justify-between gap-2">
                            <div class="text-2xl font-bold text-foreground">Rp {{ showSalary ? '8.5 Juta' : 'xxx' }}</div>
                            <button
                                type="button"
                                class="inline-flex items-center justify-center rounded-md p-1 hover:bg-accent"
                                @click="toggleSalary"
                                :aria-pressed="showSalary"
                                :title="showSalary ? 'Sembunyikan gaji' : 'Tampilkan gaji'"
                            >
                                <Eye v-if="showSalary" class="h-3 w-3 text-neutral-600" />
                                <EyeClosed v-else class="h-3 w-3 text-neutral-600" />
                            </button>
                        </div>
                        <p class="mt-1 text-xs text-muted-foreground">Berdasarkan poin terkumpul</p>
                    </CardContent>
                </Card>

                <Card class="relative overflow-hidden">
                    <CardHeader class="flex flex-1 flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle class="text-sm font-medium text-muted-foreground">Kehadiran Bulan Ini</CardTitle>
                        <Clock class="h-5 w-5 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div class="text-2xl font-bold text-foreground md:text-3xl">100%</div>
                        <p class="mt-1 text-xs text-muted-foreground">Anda absen sebanyak ... kali</p>
                    </CardContent>
                </Card>

                <Card class="overflow-hidden1 relative">
                    <CardHeader class="flex flex-1 flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle class="text-sm font-medium text-muted-foreground">Menunggu Persetujuan</CardTitle>
                        <ClipboardListIcon class="h-5 w-5 text-yellow-600" />
                    </CardHeader>
                    <CardContent>
                        <div class="text-2xl font-bold text-foreground md:text-3xl">23</div>
                        <p class="mt-1 text-xs text-muted-foreground">Total menunggu persetujuan dari</p>
                    </CardContent>
                </Card>
            </div>
            <div>
                <DashboardSuperAdmin v-if="isSuperadmin" />
                <DashboardPegawai v-if="isPegawai" />
            </div>
        </div>
    </AppLayout>
</template>
