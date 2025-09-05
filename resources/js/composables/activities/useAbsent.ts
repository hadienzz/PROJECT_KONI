import { STATUS } from '@/constants';
import { toast } from 'vue-sonner';
import { useEvents } from './useActivities';
export function useAbsent() {
    const { addEvent, myEvents, isAbsen } = useEvents();

    const handleAbsen = () => {
        const now = new Date();
        const hours = now.getHours();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const todayStr = `${year}-${month}-${day}`;

        const statusAbsen: 'hadir' | 'telat' = hours > 8 ? STATUS.TELAT : STATUS.HADIR;

        if (myEvents.value.some((e) => e.date === todayStr && e.title === 'Absen')) {
            return;
        }

        addEvent({
            title: 'Absen',
            date: todayStr,
            extendedProps: {
                status: statusAbsen,
                startTime: now.toTimeString().slice(0, 5),
                endTime: '',
            },
        });

        isAbsen.value = true;
        toast.success(`Absen berhasil! Status: ${statusAbsen.toUpperCase()}`);
    };

    return { isAbsen, handleAbsen };
}
