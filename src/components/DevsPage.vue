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
            <div class="center" v-else>
                <b>{{ store.devInfo[username].name ? store.devInfo[username].name : '-' }}</b> 
                <br/>
                <i>Since: {{ store.devInfo[username].created_at }}</i> 
                <br/>
                <div class="count-box">
                    <div class="bordered">
                        {{ store.devInfo[username].public_repos }} 
                        <br/>
                        <span class="smaller">Repos</span>
                    </div>
                    <div class="bordered">
                        {{ store.devInfo[username].followers }}
                        <br/>
                        <span class="smaller">Followers</span>
                    </div>
                    <div>
                        {{ store.devInfo[username].following }}
                        <br/>
                        <span class="smaller">Following</span>
                    </div>
                </div>
            </div>
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
    height: 10em;
    width: 15em;

    h3 {
        margin: 0.5em 0;
        text-align: center;
        font-size: 1.25em;
    }
}
div.count-box {
    display: flex;
    justify-content: space-between;

    div {
        flex: 1;
        padding: 0 1em;
        margin: 1em 0;
        text-align: center;
    }
    div.bordered {
        border-right: 1px solid black;
    }
    span.smaller {
        font-size: 0.75em;
    }
}
</style>