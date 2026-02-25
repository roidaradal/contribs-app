<script setup lang="ts">
import { fetchDevContribs } from '@/data/fetch';
import type { DevTotal } from '@/data/types';
import { useGlobalStore } from '@/stores/store';
import { computed, ref } from 'vue';

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

const getClass = (dev: string, day: number): string => {
    if(day == 0) return '';
    if(store.devContribs === null) return '';
    const level = store.devContribs.contribs[dev]?.[day.toString()]?.[1].toString() || '';
    return `level${level}`;
};

const getCount = (dev: string, day: number): string => {
    if(day == 0) return '';
    if(store.devContribs === null) return '';
    const count = store.devContribs.contribs[dev]?.[day.toString()]?.[0] || 0;
    return count == 0 ? '' : count.toString();
};

const getWidth = (total: number): string => {
    if(devTotals.value.length == 0) return '0%';
    const denominator = devTotals.value[0]?.total || 0;
    if(denominator == 0) return '0%';
    const ratio = (total * 100) / denominator;
    return `${ratio.toFixed(2)}%`;
};

let isLoading = ref(false);

const forceReload = async () => {
    isLoading.value = true;
    store.devContribs = null;
    store.devContribs = await fetchDevContribs(store.inputDate, store.devsURL, true);
    isLoading.value = false;
};

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
                    class="day"
                    v-for="(dayName, index) in dayNames"
                >
                    {{ dayName }} <br/>
                    <span v-html="dayAtIndex(index)"></span>
                </th>
                <th colspan="2">Total</th>
            </tr>
        </thead>
        <tbody>
            <tr
                v-if="store.devContribs === null"
            >
                <td class="center" colspan="10">Loading data...</td>
            </tr>
            <tr
                v-for="devTotal in devTotals"
            >
                <td class="dev">{{ devTotal.dev }}</td>
                <td
                    v-for="day in days"
                    :class="getClass(devTotal.dev, day)"
                    class="center"
                >
                    {{ getCount(devTotal.dev, day) }}
                </td>
                <th class="total"> {{ devTotal.total }}</th>
                <td class="bar">
                    <div :style="{ width: getWidth(devTotal.total) }">&nbsp;</div>
                </td>
            </tr>
        </tbody>
    </table>
    
    <button 
        :disabled="isLoading"
        @click="forceReload"
    >
        Force Reload
    </button>
</template>

<style scoped>
th.day {
    min-width: 2em;
}
th.total {
    min-width: 3em;
}
td.dev {
    padding: 0 1em;
}
td.bar {
    min-width: 300px;
    div {
        background-color: green;
        height: 100%;
    }
}
button {
    margin-top: 1em;
}
</style>