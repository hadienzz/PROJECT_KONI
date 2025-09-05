import { ref } from 'vue';

// status constant
export const STATUS = {
    DITOLAK: 'ditolak',
    DRAFTED: 'drafted',
    DISETUJUI: 'disetujui',
    HADIR: 'hadir',
    TELAT: 'telat',
    CUTI: 'cuti',
} as const;

// contoh activity bawaan
export const ACTIVITIES = [
    { name: 'Meeting', points: 5 },
    { name: 'Workshop', points: 10 },
    { name: 'Coding', points: 8 },
];

export const USER_EVENTS = ref([
    { event_id: crypto.randomUUID(), title: 'Meeting', photo: null, date: '2025-09-04', status: 'drafted', name: 'Timotius Boy' },
    { event_id: crypto.randomUUID(), title: 'Main Bola', photo: null, date: '2025-09-05', status: 'disetujui', name: 'Hadin Pramiadi' },
    { event_id: crypto.randomUUID(), title: 'Main bola', photo: null, date: '2025-09-03', status: 'ditolak', name: 'Rafi Fauzan' },
]);
