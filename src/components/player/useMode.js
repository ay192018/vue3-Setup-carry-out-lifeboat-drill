import { useAudio } from "@/stores/useAudio"
import { storeToRefs } from "pinia"
import { computed } from "vue"
export default function useMode() {
  const { mode, currentIndex, playlist } = storeToRefs(useAudio())
  // "i-radix-icons-loop" //顺序播放
  // "i-material-symbols-360" //循环播放
  // "i-tabler-arrows-random" //随机播放

  const changeMode = () => {
    if (mode.value === 0) {
      mode.value = 1
    } else if (mode.value === 1) {
      mode.value = 2
    } else {
      mode.value = 0
    }
  }
  const Random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
  const ModeIndex = () => {
    let index = currentIndex.value
    if (mode.value === 0) {
      return index++
    } else if (mode.value === 2) {
      return Random(0, playlist.value.length - 1)
    }
  }
  return { changeMode, ModeIndex }
}
