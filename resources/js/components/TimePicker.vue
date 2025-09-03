<script setup>
import { ref, watch } from 'vue'
import VueTimepicker from 'vue3-timepicker'
import 'vue3-timepicker/dist/VueTimepicker.css'

const time = ref(null)
</script>

<template>
  <div>
    <VueTimepicker
      v-model="time"
      format="HH:mm"
      manual-input
      hide-clear-button
    />
    <p>Waktu dipilih: {{ time }}</p>
  </div>
</template>
