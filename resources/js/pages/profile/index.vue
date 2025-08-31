<script setup lang="ts">
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import AppLayout from '@/layouts/AppLayout.vue';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { UserIcon } from 'lucide-vue-next';
import { TabsContent, TabsList, TabsRoot, TabsTrigger } from 'reka-ui';
import { ref } from 'vue';



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

const current = ref<'bulanan' | 'jabatan' | 'hukdis' | 'prestasi'>('bulanan');
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
                    <div class="text-2xl">{{ $page.props.auth.user.name }}</div>
                    <div class="text-muted-foreground">{{ $page.props.auth.user.email }}</div>
                </header>

                <TabsRoot v-model="current" class="w-full">
                    <div class="overflow-x-auto">
                        <TabsList class="relative flex gap-6 border-b" aria-label="Data Pegawai">
                            <TabsTrigger
                                value="bulanan"
                                class="-mb-px border-b-2 border-transparent px-1.5 pb-3 text-sm font-medium whitespace-nowrap text-gray-600 hover:text-blue-600 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600"
                            >
                                Data Bulanan
                            </TabsTrigger>

                            <TabsTrigger
                                value="jabatan"
                                class="-mb-px border-b-2 border-transparent px-1.5 pb-3 text-sm font-medium whitespace-nowrap text-gray-600 hover:text-blue-600 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600"
                            >
                                Daftar Riwayat Jabatan
                            </TabsTrigger>

                            <TabsTrigger
                                value="hukdis"
                                class="-mb-px border-b-2 border-transparent px-1.5 pb-3 text-sm font-medium whitespace-nowrap text-gray-600 hover:text-blue-600 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600"
                            >
                                Daftar Riwayat Hukdis
                            </TabsTrigger>

                            <TabsTrigger
                                value="prestasi"
                                class="-mb-px border-b-2 border-transparent px-1.5 pb-3 text-sm font-medium whitespace-nowrap text-gray-600 hover:text-blue-600 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600"
                            >
                                Daftar Prestasi
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    <div class="pt-4">
                        <TabsContent value="bulanan">
                            <div class="grid gap-6 lg:grid-cols-2">
                                <Card class="border">
                                    <CardHeader class="pb-2 text-sm font-semibold">Data Pegawai</CardHeader>
                                    <CardContent class="space-y-2">
                                        <div class="grid grid-cols-3 items-center gap-2">
                                            <span class="text-gray-500">NRK</span>
                                            <div class="col-span-2 rounded-md bg-gray-100 p-2">123456</div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card class="border">
                                    <CardHeader class="pb-2 text-sm font-semibold">Data Atasan</CardHeader>
                                    <CardContent class="space-y-2">
                                        <div class="grid grid-cols-3 items-center gap-2">
                                            <span class="text-gray-500">NRK Atasan</span>
                                            <div class="col-span-2 rounded-md bg-gray-100 p-2">123456</div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>

                        <TabsContent value="jabatan">
                            <div class="rounded-xl border p-4">Konten riwayat jabatan…</div>
                        </TabsContent>

                        <TabsContent value="hukdis">
                            <div class="rounded-xl border p-4">Konten riwayat hukdis…</div>
                        </TabsContent>

                        <TabsContent value="prestasi">
                            <div class="rounded-xl border p-4">Konten prestasi…</div>
                        </TabsContent>
                    </div>
                </TabsRoot>
            </CardContent>
        </Card>
    </AppLayout>
</template>
