<script setup lang="ts">
import { X } from 'lucide-vue-next';
import { DialogClose, DialogContent, DialogDescription, DialogOverlay, DialogPortal, DialogRoot, DialogTitle } from 'reka-ui';
import { computed, defineModel, onBeforeUnmount, ref, watchEffect } from 'vue';

type Status = 'pending' | 'approved' | 'rejected' | 'ditolak';

export interface ActivityDetail {
    event_id: string;
    title: string;
    date: string; // ISO string: 'YYYY-MM-DD'
    name: string;
    status: Status;
    // Accept either a ready URL, a File (for freshly picked images), or null
    photo?: string | File | null;
}

const model = defineModel<boolean>({ local: true }); // v-model on <DialogDetail />

const props = defineProps<{
    activity: ActivityDetail;
    // Optional explicit URL if your stored record already resolves the file.
    // If provided, this takes precedence over activity.photo when photo is a File.
    photoUrl?: string | null;
}>();

const emit = defineEmits<{
    (e: 'close'): void;
}>();

/** Compute a safe src for <img/> whether you pass a File or a string URL */
const objectUrl = ref<string | null>(null);

const photoSrc = computed<string | null>(() => {
    if (props.photoUrl) return props.photoUrl;
    const p = props.activity.photo;
    if (!p) return null;
    return typeof p === 'string' ? p : objectUrl.value;
});

watchEffect(() => {
    // revoke previous URL first
    if (objectUrl.value) {
        URL.revokeObjectURL(objectUrl.value);
        objectUrl.value = null;
    }
    if (props.activity.photo && props.activity.photo instanceof File) {
        objectUrl.value = URL.createObjectURL(props.activity.photo);
    }
});

onBeforeUnmount(() => {
    if (objectUrl.value) URL.revokeObjectURL(objectUrl.value);
});

/** Pretty date, locale-friendly */
const prettyDate = computed(() => {
    const d = props.activity.date;
    try {
        return new Intl.DateTimeFormat('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }).format(new Date(d));
    } catch {
        return d;
    }
});

/** Status badge color mapping */
const statusMeta = computed(() => {
    const s = props.activity.status?.toLowerCase() as Status;
    if (s === 'approved') return { text: 'Disetujui', cls: 'bg-green-50 text-green-700 ring-green-200' };
    if (s === 'pending') return { text: 'Menunggu', cls: 'bg-amber-50 text-amber-700 ring-amber-200' };
    if (s === 'ditolak' || s === 'rejected') return { text: 'Ditolak', cls: 'bg-rose-50 text-rose-700 ring-rose-200' };
    return { text: props.activity.status, cls: 'bg-gray-50 text-gray-700 ring-gray-200' };
});

/** Small reusable row component */
const DetailRow = (props: { label: string; value?: string | number | null }) => null;
</script>

<template>
    <DialogRoot
        :open="model"
        @update:open="
            (v) => {
                model = v;
                if (!v) emit('close');
            }
        "
    >
        <DialogPortal>
            <DialogOverlay
                class="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0"
            />
            <DialogContent
                class="fixed top-1/2 left-1/2 z-50 w-[92vw] max-w-xl -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-gray-200 bg-white shadow-xl outline-none data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:zoom-in-95"
            >
                <!-- Header -->
                <header class="flex items-start justify-between gap-4 p-5 pb-3">
                    <div class="min-w-0">
                        <DialogTitle class="truncate text-xl font-semibold text-neutral-800">
                            {{ activity.title || 'Detail Aktivitas' }}
                        </DialogTitle>
                        <DialogDescription class="mt-1 text-sm text-neutral-500">
                            ID: <span class="font-mono text-neutral-600">{{ activity.event_id }}</span>
                        </DialogDescription>
                    </div>

                    <span class="inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ring-1" :class="statusMeta.cls">
                        {{ statusMeta.text }}
                    </span>
                </header>

                <!-- Divider -->
                <div class="h-px w-full bg-gradient-to-r from-transparent via-neutral-200 to-transparent" />

                <!-- Body -->
                <section class="grid grid-cols-1 gap-4 p-5 md:grid-cols-5">
                    <!-- Photo -->
                    <div class="md:col-span-2">
                        <div class="relative aspect-square w-full overflow-hidden rounded-xl border border-neutral-200 bg-neutral-50">
                            <img v-if="photoSrc" :src="photoSrc" alt="Foto aktivitas" class="h-full w-full object-cover" />
                            <div v-else class="flex h-full w-full items-center justify-center text-sm text-neutral-400">Tidak ada foto</div>
                        </div>
                    </div>

                    <!-- Info -->
                    <div class="md:col-span-3">
                        <ul class="space-y-3">
                            <li class="flex items-start gap-3">
                                <span class="w-28 shrink-0 text-xs font-medium tracking-wide text-neutral-500 uppercase">Judul</span>
                                <span class="text-neutral-800">{{ activity.title || '—' }}</span>
                            </li>
                            <li class="flex items-start gap-3">
                                <span class="w-28 shrink-0 text-xs font-medium tracking-wide text-neutral-500 uppercase">Tanggal</span>
                                <span class="text-neutral-800">{{ prettyDate }}</span>
                            </li>
                            <li class="flex items-start gap-3">
                                <span class="w-28 shrink-0 text-xs font-medium tracking-wide text-neutral-500 uppercase">Nama</span>
                                <span class="text-neutral-800">{{ activity.name || '—' }}</span>
                            </li>
                            <li class="flex items-start gap-3">
                                <span class="w-28 shrink-0 text-xs font-medium tracking-wide text-neutral-500 uppercase">Status</span>
                                <span class="text-neutral-800">{{ statusMeta.text }}</span>
                            </li>
                            <li class="flex items-start gap-3">
                                <span class="w-28 shrink-0 text-xs font-medium tracking-wide text-neutral-500 uppercase">Event ID</span>
                                <span class="font-mono text-neutral-700">{{ activity.event_id }}</span>
                            </li>
                        </ul>
                    </div>
                </section>

                <!-- Footer -->
                <footer class="flex items-center justify-end gap-2 p-5 pt-3">
                    <DialogClose
                        class="inline-flex items-center justify-center rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm font-medium text-neutral-700 shadow-sm hover:bg-neutral-50 focus:outline-none"
                    >
                        Tutup
                    </DialogClose>
                </footer>

                <!-- Close icon -->
                <DialogClose
                    class="absolute top-3 right-3 inline-flex h-9 w-9 items-center justify-center rounded-xl text-neutral-500 hover:bg-neutral-100 focus:outline-none"
                    aria-label="Close"
                >
                    <X class="h-5 w-5" />
                </DialogClose>
            </DialogContent>
        </DialogPortal>
    </DialogRoot>
</template>

<style scoped>
/* subtle pop shadow */
</style>
