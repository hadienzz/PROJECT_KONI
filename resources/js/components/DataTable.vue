<script setup lang="ts">
defineProps<{
  headers: { key: string; label: string }[];
  items: any[];
  loading?: boolean;
}>();

const defaultItems: any[] = [];
</script>

<template>
  <div class="relative overflow-x-auto rounded-lg border">
    <table class="w-full text-left text-sm">
      <thead class="bg-muted/50 text-xs uppercase">
        <tr>
          <th v-for="header in headers" :key="header.key" class="px-6 py-3">
            {{ header.label }}
          </th>
          <th class="px-6 py-3">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="loading" class="border-b">
          <td :colspan="headers.length + 1" class="px-6 py-4 text-center">
            Loading...
          </td>
        </tr>
        <tr v-else-if="!items?.length" class="border-b">
          <td :colspan="headers.length + 1" class="px-6 py-4 text-center">
            No data available
          </td>
        </tr>
        <tr v-else v-for="item in (items || defaultItems)" :key="item.id" class="border-b">
          <td v-for="header in headers" :key="header.key" class="px-6 py-4">
            {{ item[header.key] }}
          </td>
          <td class="px-6 py-4">
            <slot name="actions" :item="item" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
