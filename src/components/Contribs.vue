<script setup lang="ts">
import { useGlobalStore } from '@/stores/store';
import Sidebar from './Sidebar.vue';
import SummaryPage from './SummaryPage.vue';
import WeekPage from './WeekPage.vue';

const store = useGlobalStore();
</script>

<template>
<div id="main-box">
    <div id="sidebar-box">
        <Sidebar />
    </div>
    <div id="content-box">
        <h2>{{ store.inputMonthString }} GitHub Contributions</h2>
        <div
            :class="{ hidden : store.currentTab != 'summary' }"
        >
            <SummaryPage />
        </div>
        <div 
            v-for="week of store.weeks"
            :class="{ hidden : store.currentTab != week.index.toString() }"
        >
            <WeekPage :week="week.index" />
        </div>
    </div>
</div>

<!-- <div id="devs-input">
    <input type="text" v-model="store.devs" />
</div> -->
</template>

<style scoped>
    #main-box {
        display: flex;
    }
    #sidebar-box {
        width: 12em;
    }
    #content-box {
        padding-top: 0.5em;
    }
    #devs-input {
        position: absolute;
        top: 3em; right: 0;
    }
    h2 {
        font-size: 1.5em;
        margin-bottom: 1em;
    }
</style>