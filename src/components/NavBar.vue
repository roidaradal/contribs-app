<script setup lang="ts">
import { computed } from 'vue';
import { useGlobalStore } from '@/stores/store';

const store = useGlobalStore();
const devsDisplay = computed(() => {
    if(store.devs.startsWith('@')) {
        return store.devs
    } else {
        const count = store.devs_list.length;
        return `${count} dev${count == 1 ? '' : 's'}`
    }
});
</script>

<template>
    <div id="nav-bar">
        <div id="title-box">
            <h1>GitHub Contribs</h1>
        </div>
        <div id="tabs-box">
            <!-- TODO: Add tab selector here -->
        </div>
        <div id="settings-box">
            <div id="date-box">
                <input type="date" v-model="store.input_date"  />
            </div>
            <div id="devs-box">
                <p>{{ devsDisplay }}</p>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    #nav-bar {
        margin: 0; padding: 0;
        background-color: #BEB;
        display: flex;
        height: 3em;

        #title-box {
            flex: 0 0 25%;
            h1 {
                font-size: 2em;
                margin-top: 0.25em;
                text-align: center;
            }
        }
        
        #tabs-box {
            flex: 0 0 50%;
        }

        #settings-box {
            flex: 0 0 25%;
            display: flex;
            div {
                flex: 0 0 50%;
            }
            #date-box input {
                display: block;
                margin: 0.75em auto;
                font-size: 1.25em;
            }
            #devs-box p {
                font-weight: bold;
                margin: 0.5em 1em;
                font-size: 1.25em;
            }
        }
    }
</style>