<template>
  <transition name="mini">
    <div
      flex
      items-center
      fixed
      left-0
      bottom-0
      z-180
      w-full
      h-60px
      style="background: var(--minPlayer--bg)"
      v-show="!fullScreen"
      @click="fullScreen = true"
    >
      <div flex-basis-40px w-40px h-40px mx-20px>
        <div ref="cdRef" w-full h-full>
          <img
            ref="cdImageRef"
            width="50"
            height="50"
            rd="8px"
            :class="cdCls"
            :src="currentBg"
          />
        </div>
      </div>
      <div flex flex-col justify-center flex-1 leading-20px overflow-hidden>
        <div relative overflow-hidden truncate>
          <div inline-block w-full translate-0 backface-hidden>
            <h2 mb-2px style="color: var(--vt--color-primary)">
              {{ songName }}
            </h2>
            <p text-sm>
              <span v-for="({ name }, index) of songSinger" :key="index">{{
                name
              }}</span>
            </p>
          </div>
        </div>
      </div>
      <div flex-basis-50px w-30px px-20px>
        <i
          absolute
          left-0
          top--1rem
          style="color: var(--vt--color-primary)"
          text-3xl
          :class="playIcon"
          @click.stop="togglePlay"
        ></i>
      </div>
    </div>
  </transition>
</template>

<script>
import { computed } from "vue"
import { useAudio } from "@/stores/useAudio"
import { storeToRefs } from "pinia"
import { fullScreen, playing } from "@/stores/useStatus"
import useCd from "./useCd"
import ProgressCircle from "./ProgressCircle.vue"
export default {
  name: "mini-player",
  components: { ProgressCircle },
  props: {
    progress: {
      type: Number,
      default: 0,
    },
    togglePlay: Function,
  },
  setup() {
    const { playlist, currentIndex } = storeToRefs(useAudio())
    const { cdCls, cdRef, cdImageRef } = useCd()
    return {
      cdCls,
      fullScreen,
      cdImageRef,
      cdRef,
      songName: computed(() => {
        return playlist.value[currentIndex.value]?.name
      }),
      songSinger: computed(() => {
        return playlist.value[currentIndex.value]?.ar
      }),
      currentBg: computed(() => {
        return playlist.value[currentIndex.value]?.al.picUrl
      }),
      playIcon: computed(() => {
        if (playing.value) {
          return "i-gg-play-pause-r"
        } else {
          return "i-mdi-play-speed"
        }
      }),
    }
  },
}
</script>

<style scoped>
.mini-enter-active,
.mini-leave-active {
  transition: all 0.6s cubic-bezier(0.45, 0, 0.55, 1);
}
.mini-enter-from,
.mini-leave-to {
  opacity: 0;
  transform: translate3d(0, 100%, 0);
}
</style>
