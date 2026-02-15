import { defineStore } from "pinia";
import { computed, ref, type ComputedRef } from "vue";

export const useGlobalStore = defineStore('global', () => {
    const input_date = ref(new Date().toISOString().slice(0, 10))
    const devs = ref('@goodapps')
    const devs_list: ComputedRef<string[]> = computed(() => {
        return devs.value.split(',').map(dev => dev.trim()).filter(dev => dev != '')
    });
    const devs_url: ComputedRef<string> = computed(() => {
        return devs_list.value.join(',')
    });

    return { input_date, devs, devs_list, devs_url }
})