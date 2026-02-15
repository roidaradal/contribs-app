<script setup lang="ts">
import type { DataResult, DevContribs, Nullable } from '@/data/types';
import { useGlobalStore } from '@/stores/store';
import { onMounted, ref, type Ref } from 'vue';

const store = useGlobalStore();
const apiURL = import.meta.env.VITE_API_URL;
const url = `${apiURL}/contribs/${store.input_date}?devs=${store.devs_url}`;
const data: Ref<Nullable<DevContribs>> = ref(null);

// onMounted(async () => {
//     const resp = await fetch(url);
//     const body = await resp.text();
//     const result: DataResult<Nullable<DevContribs>> = JSON.parse(body);
//     data.value = result.data;
// });
</script>

<template>
<p v-if="data !== null">
    {{  JSON.stringify(data) }}
</p>
<input id="devs" type="text" v-model="store.devs" />
</template>

<style scoped>
    #devs {
        float: right;
    }
</style>