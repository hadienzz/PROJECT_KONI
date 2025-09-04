import { usePage } from '@inertiajs/vue3';
import { onBeforeMount, ref, watch } from 'vue';
import { useFormik } from 'vue-formik';
import { toast } from 'vue-sonner';
import { getTodayDate } from '../../utils/getTodayDate';

export interface AddActivitiesProps {
    title: string;
    date: string;
    name: string;
    status: string;
    photo: File | null;
}

const useAddActivities = () => {
    const previewUrl = ref<string | null>(null);
    const selectedEvent = ref<string | null>(null);

    const userInfo = usePage();
    const name = userInfo.props.auth.user.name;
    const todayDate = getTodayDate();
    const formik = useFormik<AddActivitiesProps>({
        initialValues: {
            title: '',
            date: todayDate,
            name: name,
            status: 'pending',
            photo: null,
        },
        onSubmit: (values: AddActivitiesProps) => {
            if (values.title === '') {
                toast.error('Pilih aktivitas dulu!');
                return;
            }
            formik.reset();
            return toast.success('Aktivitas berhasil ditambahkan!');
        },
    });

    watch(
        () => formik.values.photo,
        (file) => {
            // revoke url lama dulu
            if (previewUrl.value) URL.revokeObjectURL(previewUrl.value);
            previewUrl.value = file ? URL.createObjectURL(file) : null;
        },
    );

    onBeforeMount(() => {
        if (previewUrl.value) URL.revokeObjectURL(previewUrl.value);
    });

    return {
        formik,
        selectedEvent,
        previewUrl,
    };
};

export default useAddActivities;
