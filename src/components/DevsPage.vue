<script setup lang="ts">
import { useGlobalStore } from '@/stores/store';

const store = useGlobalStore();

</script>

<template>
    <div class="grid-box">
        <p v-if="store.devContribs === null">Loading devs...</p>
        <div 
            v-for="username in store.devUsernames"
            class="dev-box"
        >
            <h3>@{{ username }}</h3>
            <p class="center" v-if="!store.devInfo[username]">Loading info...</p>
            <p v-else>{{ store.devInfo[username] }}</p>
        </div>
    </div>
</template>

<style scoped>
div.grid-box {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1em;
}
div.dev-box {
    border: 1px solid black;
    height: 12em;
    width: 15em;

    h3 {
        margin: 0.5em 0;
        text-align: center;
        font-size: 1.25em;
    }
}
</style>