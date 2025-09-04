import { STATUS } from '@/constants';
import { ref } from 'vue';
import { toast } from 'vue-sonner';
import { useEvents } from './useActivities';

export function useActivityForm() {
    const { addEvent } = useEvents();

    const selectedActivity = ref('');
    const startTime = ref('');
    const endTime = ref('');
    const photoFile = ref<File | null>(null);

    const handlePhotoUpload = (event: Event) => {
        const target = event.target as HTMLInputElement;
        if (target.files && target.files[0]) {
            photoFile.value = target.files[0];
        }
    };

    const submitForm = (closeCallback?: () => void) => {
        console.log('submitForm dipanggil!');
        console.log('Data form:', {
            selectedActivity: selectedActivity.value,
            startTime: startTime.value,
            endTime: endTime.value,
        });

        if (!selectedActivity.value || !startTime.value || !endTime.value) {
            alert('Isi semua field dulu!');
            return false;
        }

        if (startTime.value >= endTime.value) {
            alert('Start time harus sebelum End time!');
            return false;
        }

        // Tambahkan event ke shared myEvents
        const newEvent = {
            title: selectedActivity.value,
            date: todayStr,
            extendedProps: {
                status: STATUS.DISETUJUI,
                activity: selectedActivity.value,
                startTime: startTime.value,
                endTime: endTime.value,
            },
        };

        console.log('Event yang akan ditambahkan:', newEvent);
        addEvent(newEvent);

        // Reset form
        selectedActivity.value = '';
        startTime.value = '';
        endTime.value = '';
        photoFile.value = null;

        toast.success('Aktivitas berhasil ditambahkan!');

        // Close overlay setelah submit berhasil
        if (closeCallback) {
            closeCallback();
        }

        return true;
    };

    return { selectedActivity, startTime, endTime, photoFile, handlePhotoUpload, submitForm };
}
