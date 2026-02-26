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
            {{ username }}
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
}
</style>