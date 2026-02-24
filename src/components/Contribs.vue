<script setup lang="ts">
import type { DataResult, DevContribs, Nullable } from '@/data/types';
import { useGlobalStore } from '@/stores/store';
import { onMounted, ref, type Ref } from 'vue';
import Sidebar from './Sidebar.vue';

const store = useGlobalStore();
const apiURL = import.meta.env.VITE_API_URL;
const url = `${apiURL}/contribs/${store.inputDate}?devs=${store.devsURL}`;
const data: Ref<Nullable<DevContribs>> = ref(null);

// onMounted(async () => {
//     const resp = await fetch(url);
//     const body = await resp.text();
//     const result: DataResult<Nullable<DevContribs>> = JSON.parse(body);
//     data.value = result.data;
// });
</script>

<template>
<!-- <p v-if="data !== null">
    {{  JSON.stringify(data) }}
</p> -->
<div id="main-box">
    <div id="sidebar-box">
        <Sidebar />
    </div>
    <div id="content-box">
        <p>{{ store.monthWeeks }}</p>
    </div>
</div>

<div id="devs-input">
    <input type="text" v-model="store.devs" />
</div>
</template>

<style scoped>
    #main-box {
        display: flex;
    }
    #sidebar-box {
        width: 12em;
    }
    #devs-input {
        position: absolute;
        top: 3em; right: 0;
    }
</style>