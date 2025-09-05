import { usePage } from '@inertiajs/vue3';
import { onBeforeUnmount, ref, watch } from 'vue';
import { useFormik } from 'vue-formik';
import { toast } from 'vue-sonner';
import { getTodayDate } from '../../../utils/getTodayDate';

export interface AddActivitiesProps {
    event_id: string;
    title: string;
    date: string;
    name: string;
    status: string;
    photo: File | null;
}

const useAddActivities = () => {
    const previewUrl = ref<string | null>(null);

    const userInfo = usePage();
    const name = userInfo.props.auth.user.name;
    const todayDate = getTodayDate();

    const formik = useFormik<AddActivitiesProps>({
        initialValues: {
            event_id: crypto.randomUUID(),
            title: '',
            date: todayDate,
            name,
            status: 'pending',
            photo: null,
        },
        onSubmit: (values: AddActivitiesProps) => {
            if (!values.title) {
                return toast.error('Pilih aktivitas dulu!');
            }
            console.log(values);

            toast.success('Aktivitas berhasil ditambahkan!');
        },
    });

    watch(
        () => formik.values.photo,
        (file, _prev, onCleanup) => {
            if (previewUrl.value) URL.revokeObjectURL(previewUrl.value);
            previewUrl.value = file ? URL.createObjectURL(file) : null;

            onCleanup(() => {
                if (previewUrl.value) {
                    URL.revokeObjectURL(previewUrl.value);
                    previewUrl.value = null;
                }
            });
        },
    );

    onBeforeUnmount(() => {
        if (previewUrl.value) URL.revokeObjectURL(previewUrl.value);
    });

    return { formik, previewUrl };
};

export default useAddActivities;
