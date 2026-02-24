<script setup lang="ts">
import { useGlobalStore } from '@/stores/store';

const store = useGlobalStore();
</script>

<template>
    <button>Summary</button>
    <button v-for="week of store.weeks">{{ week.name }}</button>
</template>

<style scoped>
    button {
        display: block;
        width: 10em;
        margin: 1em auto; 
        padding: 5px;
    }
    button:hover {
        cursor: pointer;
    }
</style>