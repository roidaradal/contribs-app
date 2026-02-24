<script setup lang="ts">
import { useGlobalStore } from '@/stores/store';

const props = defineProps({
    week: {
        type: Number,
        required: true,
    }
});
const store = useGlobalStore();
</script>

<template>
    Week {{ props.week }}
    <p v-if="store.monthWeeks[props.week] !== undefined">
        {{ store.monthWeeks[props.week] }}
    </p>
</template>