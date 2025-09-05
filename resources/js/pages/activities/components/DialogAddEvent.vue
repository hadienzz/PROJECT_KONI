<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import useAddActivities from '@/composables/activities/useAddActivities';
import { SelectContent, SelectItem, SelectRoot, SelectTrigger } from 'reka-ui';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../../../components/ui/dialog';

const open = defineModel<boolean>('open');

const { formik, previewUrl } = useAddActivities();

const DropdownItem = [
    { title: 'Meeting', value: 'Meeting' },
    { title: 'Kunjungan Lapangan', value: 'Kunjungan Lapangan' },
    { title: 'Demo DPR', value: 'Demo DPR' },
    { title: '19 Juta Lapangan Pekerjaan', value: '19 Juta Lapangan Pekerjaan' },
];
</script>

<template>
    <Dialog v-model:open="open" @click="open = false">
        <DialogContent>
            <DialogHeader>
                <DialogTitle class="text-lg font-bold text-neutral-600">Tambah Aktivitas</DialogTitle>
                <DialogDescription>Informasi terkait aktivitas yang ingin ditambahkan</DialogDescription>
            </DialogHeader>

            <form @submit.prevent="formik.handleSubmit" class="space-y-2">
                <SelectRoot
                    class="flex"
                    :model-value="formik.values.title"
                    name="title"
                    @update:model-value="(val: string) => formik.setFieldValue('title', val)"
                >
                    <SelectTrigger class="w-full rounded-md border-[1px] border-gray-800">
                        {{ formik.values.title || 'Judul Aktivitas' }}
                    </SelectTrigger>

                    <SelectContent :position="'popper'" class="flex max-h-60 w-full flex-col gap-1 overflow-y-auto bg-white p-2">
                        <SelectItem
                            v-for="item in DropdownItem"
                            :key="item.value"
                            :value="item.value"
                            class="w-100 cursor-pointer bg-white text-center hover:bg-gray-100 md:w-110"
                        >
                            {{ item.title }}
                        </SelectItem>
                    </SelectContent>
                </SelectRoot>

                <Input
                    name="photo"
                    type="file"
                    accept="image/*"
                    @change="
                        (e: Event) => {
                            const target = e.target as HTMLInputElement;

                            if (target.files && target.files[0]) {
                                formik.setFieldValue('photo', target.files[0]);
                            }
                        }
                    "
                />

                <img v-if="previewUrl" :src="previewUrl" class="h-32 w-32 rounded object-cover" alt="Preview foto" />

                <div class="mt-3 flex justify-end">
                    <Button type="submit" class="">Tambah Aktivitas</Button>
                </div>
            </form>
        </DialogContent>
    </Dialog>
</template>
