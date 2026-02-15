import { defineStore } from "pinia";
import { ref } from "vue";

export const useGlobalStore = defineStore('global', () => {
    const input_date = ref(new Date().toISOString().slice(0, 10))
    const devs = ref('@goodapps')

    return { input_date, devs }
})