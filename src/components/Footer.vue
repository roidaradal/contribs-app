<template>
    <div id="footer">
        <p>
            <img class="logo" alt="logo" title="GitHub Contribs" src="@/assets/logo.png" /> | 
            <a href="https://github.com/roidaradal">@roidaradal</a> | 
            {{ new Date().getFullYear() }}
        </p>
    </div>
</template>

<style scoped>
    #footer {
        padding: 1em 0 0.5em;
        text-align: center;
        
        a, a:visited, a:hover, a:active {
            color: green;
        }
    }
    img.logo {
        height: 1.5em;
        vertical-align: middle;
    }
</style>