<script setup lang="ts">
import Contribs from './components/Contribs.vue';
import NavBar from './components/NavBar.vue';
import Footer from './components/Footer.vue';
import { fetchDevInfo, fetchDevContribs } from './data/fetch';
import { useGlobalStore } from './stores/store';
import { onMounted } from 'vue';

onMounted(async () => {
    const store = useGlobalStore();
    store.devContribs = await fetchDevContribs(store.inputDate, store.devsURL, false);
    for(let username of store.devUsernames) {
        store.devInfo[username] = null;
    }
    const storeDevInfo = async (username: string) => {
        store.devInfo[username] = await fetchDevInfo(username);
    };
    await Promise.all(store.devUsernames.map(storeDevInfo));
})
</script>

<template>
    <header><NavBar /></header>
    <main><Contribs /></main>
    <footer><Footer /></footer>
</template>

<style scoped>
    header {
        height: 3em;
    }
    main {
        flex: 1;
    }
</style>
