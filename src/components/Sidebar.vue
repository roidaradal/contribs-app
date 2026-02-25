<script setup lang="ts">
import { fetchDevContribs } from '@/data/fetch';
import { useGlobalStore } from '@/stores/store';

const store = useGlobalStore();
const changeTab = (newTab: string) => store.currentTab = newTab;
const forceReload = async () => {
    store.devContribs = null;
    store.devContribs = await fetchDevContribs(store.inputDate, store.devsURL, true);
};
</script>

<template>
    <!---<button
        :class="{ active: store.currentTab == 'summary' }" 
        @click="changeTab('summary')"
    >
        Summary
    </button>-->
    <button 
        v-for="week of store.weeks"
        :class="{ active : store.currentTab == week.index.toString()}"
        @click="changeTab(week.index.toString())"
    >
        {{ week.name }}
    </button>
    <button @click="forceReload">Force Reload</button>
    <p v-if="store.isCurrentMonth">
        {{ store.daysLeft }} day{{ store.daysLeft == 1 ? '' : 's' }} left
    </p>
</template>

<style scoped>
    button {
        display: block;
        width: 10em;
        margin: 1em auto; 
        padding: 5px;

        &:hover {
            cursor: pointer;
        }

        &.active {
            background-color: #BEB;
        }
    }
    p {
        margin-top: 1em;
        text-align: center;
    }
</style>