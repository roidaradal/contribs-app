<script setup lang="ts">
import Contribs from './components/Contribs.vue';
import NavBar from './components/NavBar.vue';
import Footer from './components/Footer.vue';
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
