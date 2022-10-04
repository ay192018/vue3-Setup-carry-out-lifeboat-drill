import { defineStore } from "pinia"

export const useTheme = defineStore("useTheme", {
  state: () => {
    return {
      isTheme: false,
    }
  },
})
