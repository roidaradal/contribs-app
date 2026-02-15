<script setup lang="ts">
import { useGlobalStore } from '@/stores/store';
import { computed } from 'vue';
const store = useGlobalStore();
const devsDisplay = computed(() => {
    if(store.devs.startsWith('@')) {
        return store.devs
    } else {
        const count = store.devs.split(',').filter(dev => dev.trim() != '').length;
        return `${count} devs`
    }
});
</script>

<template>
    <div id="nav-bar">
        <h1>GitHub Contribs</h1>
        <p>
            {{ store.input_date }}
            <br/>
            {{ devsDisplay }}
        </p>
        <input type="date" v-model="store.input_date"  />
        <br/>
        <input type="text" v-model="store.devs" />
    </div>
</template>

<style scoped>
    #nav-bar {
        margin: 0; padding: 0;
        background-color: #BEB;
    }
</style>