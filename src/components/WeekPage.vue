<script setup lang="ts">
import type { DevTotal } from '@/data/types';
import { useGlobalStore } from '@/stores/store';
import { computed } from 'vue';

const props = defineProps({
    week: {
        type: Number,
        required: true,
    }
});
const store = useGlobalStore();
const dayNames: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
let days = computed(() => store.monthWeeks[props.week] || []);
let validDays = computed(() => days.value.filter(day => day > 0));
let firstDay = computed(() => (validDays.value[0] || 0).toString());
let lastDay = computed(() => (validDays.value[validDays.value.length-1] || 0).toString());
const dayAtIndex = (index: number): string => {
    let day = days.value[index] || 0;
    if(day == 0) return '&nbsp;'
    return day.toString().padStart(2, '0');
};

let devTotals = computed(() => {
    if(store.devContribs === null) return [];
    let first = +firstDay.value;
    let last  = +lastDay.value;
    const devTotals: DevTotal[] = [];
    for(let dev in store.devContribs.contribs) {
        let total = 0;
        for(let d = first; d <= last; d++) {
            total  += store.devContribs.contribs[dev]?.[d.toString()]?.[0] || 0
        }
        devTotals.push({
            dev: dev,
            total: total,
        });
    }
    devTotals.sort((a, b) => b.total - a.total);
    return devTotals;
});
</script>

<template>
    <table>
        <thead>
            <tr>
                <th colspan="10">{{ firstDay.padStart(2, '0') }}-{{ lastDay.padStart(2, '0') }} {{ store.inputMonthString }}</th>
            </tr>
            <tr>
                <th>Devs</th>
                <th
                    v-for="(dayName, index) in dayNames"
                >
                    {{ dayName }} <br/>
                    <span v-html="dayAtIndex(index)"></span>
                </th>
                <th colspan="2">Total</th>
            </tr>
        </thead>
    </table>
    <p> {{  devTotals }}</p>
</template>
