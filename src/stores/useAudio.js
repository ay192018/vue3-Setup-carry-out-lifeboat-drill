import { defineStore } from "pinia"

export const useAudio = defineStore("useAudio", {
  state: () => {
    return {
      playlist: [],
      currentIndex: 0,
      playing: false,
      mode: 0, // 0 顺序播放 ；1 循环播放；2随机播放
      Url: "",
    }
  },
})
