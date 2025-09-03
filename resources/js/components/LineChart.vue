<script setup lang="ts">
import { CategoryScale, Chart, Filler, Legend, LinearScale, LineController, LineElement, PointElement, Tooltip } from 'chart.js';
import { onMounted, ref, watch } from 'vue';

Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Filler, Legend);

const props = defineProps<{ labels: string[]; data: number[] }>();
const canvas = ref<HTMLCanvasElement | null>(null);
let chart: Chart | null = null;

function render() {
    if (!canvas.value) return;
    chart?.destroy();
    chart = new Chart(canvas.value, {
        type: 'line',
        data: {
            labels: props.labels,
            datasets: [
                {
                    label: 'Poin',
                    data: props.data,
                    borderColor: 'rgba(220, 38, 38, 0.9)', // red-600
                    backgroundColor: 'rgba(220, 38, 38, 0.15)',
                    fill: true,
                    tension: 0.35,
                    pointRadius: 3,
                },
            ],
        },
        options: {
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                x: { grid: { display: false } },
                y: { beginAtZero: true, ticks: { precision: 0 } },
            },
        },
    });
}

onMounted(render);
watch(() => [props.labels, props.data], render, { deep: true });
</script>

<template>
    <canvas ref="canvas" class="h-full w-full"></canvas>
</template>
