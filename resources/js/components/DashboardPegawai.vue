<script setup lang="ts">
import { Button } from './ui/button';
import { Card, CardHeader } from './ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from './ui/dropdown-menu';
</script>

<template>
    <Card>
        <CardHeader class="flex items-center justify-between">
            <h1>Total Absensi</h1>
            <DropdownMenu>
                <DropdownMenuTrigger as-child>
                    <Button variant="outline"> 3 Hari </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent class="w-56">
                    <DropdownMenuLabel>Jangka Waktu</DropdownMenuLabel>
                    <DropdownMenuItem> 7 Hari </DropdownMenuItem>
                    <DropdownMenuItem> 30 Hari </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </CardHeader>
    </Card>
</template>
