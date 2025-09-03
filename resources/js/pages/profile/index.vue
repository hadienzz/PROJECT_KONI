<script setup lang="ts">
import TabsDataPegawai from '@/components/TabsDataPegawai.vue';
import TabsHukdis from '@/components/TabsHukdis.vue';
import TabsJabatan from '@/components/TabsJabatan.vue';
import TabsPrestasi from '@/components/TabsPrestasi.vue';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import AppLayout from '@/layouts/AppLayout.vue';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { usePage } from '@inertiajs/vue3';
import { UserIcon } from 'lucide-vue-next';
import { TabsList, TabsRoot, TabsTrigger } from 'reka-ui';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
    {
        title: 'Profile',
        href: '#',
    },
];

type TabsTriggerProps = {
    value: 'bulanan' | 'jabatan' | 'hukdis' | 'prestasi';
    title: string;
};

const TabsTriggerContent: TabsTriggerProps[] = [
    {
        value: 'bulanan',
        title: 'Data Bulanan',
    },
    {
        value: 'jabatan',
        title: 'Daftar Riwayat Jabatan',
    },
    {
        value: 'hukdis',
        title: 'Daftar Riwayat Hukdis',
    },
    {
        value: 'prestasi',
        title: 'Daftar Prestasi',
    },
];

const page = usePage();
const userInfo = page.props.auth.user;
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbs">
        <Card class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl">
            <CardHeader>
                <div class="flex items-center gap-2 text-xl">
                    <UserIcon />
                    <span class="font-semibold">Profil</span> Pegawai
                </div>
            </CardHeader>

            <CardContent>
                <header class="mb-4">
                    <div class="text-2xl">{{ userInfo.name }}</div>
                    <div class="text-muted-foreground">{{ userInfo.email }}</div>
                </header>

                <TabsRoot default-value="bulanan" class="w-full">
                    <div class="overflow-x-auto">
                        <TabsList class="relative flex gap-6 border-b" aria-label="Data Pegawai">
                            <TabsTrigger
                                v-for="item in TabsTriggerContent"
                                :key="item.value"
                                :value="item.value"
                                class="-mb-px border-b-2 border-transparent px-1.5 pb-3 text-sm font-medium whitespace-nowrap text-gray-600 hover:text-blue-600 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600"
                            >
                                {{ item.title }}
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    <div class="pt-4">
                        <TabsDataPegawai />
                        <TabsJabatan />
                        <TabsHukdis />
                        <TabsPrestasi />
                    </div>
                </TabsRoot>
            </CardContent>
        </Card>
    </AppLayout>
</template>
