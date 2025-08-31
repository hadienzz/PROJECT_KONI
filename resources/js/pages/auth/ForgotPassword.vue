<script setup lang="ts">
import { useForm, Head } from '@inertiajs/vue3';
import InputError from '@/components/InputError.vue';
import TextLink from '@/components/TextLink.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/AuthLayout.vue';
import { login } from '@/routes';
import { LoaderCircle } from 'lucide-vue-next';

defineProps<{
    status?: string;
}>();


const form = useForm({
    email: '',
    nrk: '',
});



</script>

<template>
    <AuthLayout
        title="Forgot password"
        description="Silahkan masukkan email dan NRK Anda untuk menerima tautan reset kata sandi"
    >
        <Head title="Forgot password" />

        <div v-if="status" class="mb-4 text-center text-sm font-medium text-green-600">
            {{ status }}
        </div>

<form @submit.prevent="form.post('/forgot-password')" class="space-y-6">
            <div class="grid gap-2">
                <Label for="nrk">NRK (Nomor Registrasi Kepegawaian)</Label>
                <Input
                    id="nrk"
                    type="text"
                    v-model="form.nrk"
                    required
                    autocomplete="nrk"
                    placeholder="Masukkan NRK"
                />
                <InputError :message="form.errors.nrk" />
            </div>

            <div class="grid gap-2">
                <Label for="email">Email address</Label>
                <Input
                    id="email"
                    type="email"
                    v-model="form.email"
                    required
                    autocomplete="email"
                    placeholder="email@example.com"
                />
                <InputError :message="form.errors.email" />
            </div>

            <div class="my-6 flex items-center justify-start">
                <Button class="w-full" type="submit" :disabled="form.processing">
                    <LoaderCircle v-if="form.processing" class="h-4 w-4 animate-spin" />
                    Email password reset link
                </Button>
            </div>
        </form>

        <div class="space-x-1 text-center text-sm text-muted-foreground">
            <span>Or, return to</span>
            <TextLink :href="login()">log in</TextLink>
        </div>
    </AuthLayout>
</template>
