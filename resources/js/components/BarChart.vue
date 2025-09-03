<script setup lang="ts">
import { BarController, BarElement, CategoryScale, Chart, Legend, LinearScale, Tooltip } from 'chart.js';
import { onMounted, ref, watch } from 'vue';
Chart.register(BarController, BarElement, LinearScale, CategoryScale, Tooltip, Legend);

const props = defineProps<{ labels: string[]; data: number[]; barColor?: string }>();
const canvas = ref<HTMLCanvasElement | null>(null);
let chart: Chart | null = null;

function render() {
    if (!canvas.value) return;
    chart?.destroy();
    chart = new Chart(canvas.value, {
        type: 'bar',
        data: {
            labels: props.labels,
            datasets: [
                {
                    label: 'Poin',
                    data: props.data,
                    backgroundColor: props.barColor || 'rgba(234, 179, 8, 0.85)', // amber-500 default
                    borderRadius: 8,
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
watch(() => [props.labels, props.data, props.barColor], render, { deep: true });
</script>

<template>
    <canvas ref="canvas" class="h-full w-full"></canvas>
</template>
