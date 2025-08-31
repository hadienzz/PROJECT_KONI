<script setup>
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { TabsContent } from 'reka-ui';
import ItemDataPegawai from './ItemDataPegawai.vue';
</script>

<template>
    <TabsContent value="bulanan">
        <div class="grid gap-6 lg:grid-cols-2">
            <Card class="border">
                <CardHeader class="pb-2 text-sm font-semibold">Data Pegawai</CardHeader>
                <CardContent class="space-y-2">
                    <ItemDataPegawai label="NRK Pegawai" value="123456" />
                    <ItemDataPegawai label="Nama" :value="$page.props.auth.user.name" />
                    <ItemDataPegawai label="PG Induk" value="Nama Divisi" />
                </CardContent>
            </Card>

            <Card class="border">
                <CardHeader class="pb-2 text-sm font-semibold">Data Atasan</CardHeader>
                <CardContent class="space-y-2">
                    <ItemDataPegawai label="NRK Atasan" value="654321" />
                    <ItemDataPegawai label="NRK Atasan" value="Nama Atasan" />
                    <ItemDataPegawai label="PG Induk" value="Nama Divisi" />
                </CardContent>
            </Card>
        </div>
    </TabsContent>
</template>
