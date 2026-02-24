<script setup lang="ts">
import { useGlobalStore } from '@/stores/store';

const store = useGlobalStore();
</script>

<template>
    <button>Summary</button>
    <button 
        v-for="week of store.weeks"
        :class="{ active : store.currentTab == week.index.toString()}"
    >
        {{ week.name }}
    </button>
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