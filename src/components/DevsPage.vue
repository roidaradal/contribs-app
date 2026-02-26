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
            <p class="center" v-if="!store.devInfo[username]">Loading info...</p>
            <div class="center" v-else>
                <div class="dev-header">
                    <div class="img-box">
                        <img :src="store.devInfo[username].avatar_url" />
                    </div>
                    <div>
                        <h3 :class="{smaller : username.length > 15}">
                            <a :href="`https://github.com/${username}`" target="_blank">
                                @{{ username }}
                            </a>
                        </h3>
                        <b>{{ store.devInfo[username].name ? store.devInfo[username].name : '-' }}</b> 
                        <span>Since: {{ store.devInfo[username].created_at }}</span>
                    </div>
                </div>
                <div class="count-box">
                    <div class="bordered">
                        <b>{{ store.devInfo[username].public_repos }}</b>
                        <br/>
                        <span class="smaller">Repos</span>
                    </div>
                    <div class="bordered">
                        <b>{{ store.devInfo[username].followers }}</b>
                        <br/>
                        <span class="smaller">Followers</span>
                    </div>
                    <div>
                        <b>{{ store.devInfo[username].following }}</b>
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
        font-size: 1.1em;
        color: #196c2e;
    }
    h3.smaller {
        font-size: 0.9em;
    }
}
div.count-box {
    display: flex;
    justify-content: space-between;

    div {
        flex: 1;
        padding: 0 1em;
        margin: 0.5em 0;
        text-align: center;
    }
    div.bordered {
        border-right: 1px solid black;
    }
    span.smaller {
        font-size: 0.75em;
    }
}
div.dev-header {
    display: flex;
    justify-content: space-between;
    
    div {
        flex: 1;
        height: 6em;
    }

    span {
        display: block;
        margin-top: 0.5em;
        font-size: 0.8em;
        font-style: italic;
    }

    div.img-box {
        flex: 0 0 30%;
        img {
            height: 4em;
            margin: 1em 0;
            margin-left: 0.5em;
            border-radius: 2em;
            border: 1px solid black;
        }
    }
}
</style>