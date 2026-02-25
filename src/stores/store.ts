import type { DevContribs, Nullable, Week } from "@/data/types";
import { defineStore } from "pinia";
import { computed, ref } from "vue"; 
import type { ComputedRef, Ref } from "vue";

export const useGlobalStore = defineStore('global', () => {
    // Date info
    const inputDate: Ref<string> = ref(new Date().toISOString().slice(0, 10)); // YYYY-MM-DD has 10 characters
    const inputMonth: ComputedRef<string> = computed(() => inputDate.value.slice(0, 7)); // YYYY-MM has 7 chars
    const inputMonthString: ComputedRef<string> = computed(() => {
        const d = new Date(`${inputMonth.value}-01`);
        const monthName = d.toLocaleString('default', {month: 'long'});
        const year = d.getFullYear();
        return `${monthName} ${year}`;
    });
    const monthWeeks: ComputedRef<number[][]> = computed(() => {
        const [yearPart, monthPart] = inputMonth.value.split('-');
        if(yearPart === undefined || monthPart === undefined) return [];
        
        const weeks: number[][] = [];
        let week: number[] = [];

        const [year, month] = [+yearPart, +monthPart];
        const monthIndex = month-1;
        const firstDay = new Date(year, monthIndex, 1).getDay(); // day of the week index
        const lastDate = new Date(year, monthIndex+1, 0).getDate();
        let currDate = 1;

        // Week 0
        if (firstDay == 0) {
            // No week 0
            week = Array(7).fill(0);
            weeks.push(week);
        } else {
            currDate = 7-firstDay;
            week = Array(firstDay).fill(0);
            for(let day = 1; day <= currDate; day++) week.push(day);
            weeks.push(week);
            currDate += 1;
        }
        // Process full weeks
        for(; currDate + 6 <= lastDate; currDate += 7) {
            week = [];
            for(let d = currDate; d < currDate+7; d++) week.push(d);
            weeks.push(week);
        }
        // Last week
        if (currDate <= lastDate) {
            week = Array(7).fill(0);
            for(let i = 0; i <= lastDate-currDate; i++) week[i] = currDate+i;
            weeks.push(week);
        }
        return weeks;
    });
    const weeks: ComputedRef<Week[]> = computed(() => {
        const weeks: Week[] = [];
        monthWeeks.value.forEach((week, i) => {
            if(week.reduce((total, day) => total + day, 0) == 0) return;
            weeks.push({
                index: i,
                name: `Week ${i}`, 
            });
        })
        return weeks;
    });
    const isCurrentMonth: ComputedRef<boolean> = computed(() => inputMonth.value == new Date().toISOString().slice(0,7));
    const daysLeft: ComputedRef<number> = computed(() => {
        if(!isCurrentMonth.value) return 0;
        const today = new Date();
        const lastDate = new Date(today.getFullYear(), today.getMonth()+1, 0).getDate();
        return lastDate - today.getDate();
    });

    const currentWeek: ComputedRef<number> = computed(() => {
        const currDate = +inputDate.value.slice(8, 10);
        for( const [index, week] of monthWeeks.value.entries()) {
            if(week.includes(currDate)) return index;
        }
        return -1;
    });
    const currentTab: Ref<string> = ref(`${currentWeek.value}`);
    const resetCurrentTab = () => currentTab.value = `${currentWeek.value}`;


    // Devs info
    const devs: Ref<string> = ref('@goodapps')
    const devsList: ComputedRef<string[]> = computed(() => {
        return devs.value.split(',').map(dev => dev.trim()).filter(dev => dev != '')
    });
    const devsURL: ComputedRef<string> = computed(() => {
        return devsList.value.join(',')
    });
    const devContribs: Ref<Nullable<DevContribs>> = ref(null);

    return { 
        inputDate, inputMonth, inputMonthString, monthWeeks, weeks,
        isCurrentMonth, daysLeft, currentTab, resetCurrentTab,
        devs, devsList, devsURL, devContribs,
    }
})