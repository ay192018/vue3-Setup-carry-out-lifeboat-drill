import { defineStore } from "pinia";

export const useSearch = defineStore("useSearch", {
    state: () => {
        return {
            historyList: [],
        };
    },
});