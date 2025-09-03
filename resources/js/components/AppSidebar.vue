<script setup lang="ts">
import NavMain from '@/components/NavMain.vue';
import NavUser from '@/components/NavUser.vue';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link,  usePage } from '@inertiajs/vue3';
import { BookOpen, Folder, LayoutGrid, UserIcon, Activity } from 'lucide-vue-next';
import AppLogo from './AppLogo.vue';
import { computed } from 'vue'

const page = usePage()
const role = computed(() => page.props.auth.user?.role)

// SATU UNTUK @SEMUA LOH YA CIK
const baseNav = [
    { title: 'Dashboard', href: '/dashboard', icon: LayoutGrid },
    { title: 'Profile', href: '/profile', icon: UserIcon },
    ]
// SATU UNTUK @SEMUA LOH YA CIK


    const roleMenus: Record<string, any[]> = {
    //  SI @SUPERADMIN
    superadmin: [
        { title: 'Users', href: '/users', icon: UserIcon },
        { title: 'Branches', href: '/branches', icon: Activity },
        { title: 'Attendances', href: '/attendances', icon: Activity },
    ],

    //  SI @ATASAN
    atasan: [
        { title: 'Users', href: '/users', icon: UserIcon },
        { title: 'Attendances', href: '/attendances', icon: Activity },
    ],

    //  SI @PEGAWAI
    pegawai: [
        { title: 'Input Activity', href: '/inputactivity', icon: Activity },
    ],
}

const footerNavItems: NavItem[] = [
    {
        title: 'Github Repo',
        href: 'https://github.com/laravel/vue-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#vue',
        icon: BookOpen,
    },
];


const mainNavItems = computed(() => [
  ...baseNav,
  ...(roleMenus[role.value] ?? []),
])
</script>

<template>
    <Sidebar collapsible="icon" variant="inset">
        <SidebarHeader>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton size="lg" as-child>
                        <Link href="/dashboard">
                            <AppLogo />
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarHeader>

        <SidebarContent>
            <NavMain :items="mainNavItems" />
        </SidebarContent>

        <SidebarFooter>
            <NavUser />
        </SidebarFooter>
    </Sidebar>
    <slot />
</template>
