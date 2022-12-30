<template>
  <div v-show="playlist.length">
    <transition
      name="normal"
      @enter="enter"
      @after-enter="afterEnter"
      @leave="leave"
      @after-leave="afterLeave"
    >
      <div
        fixed
        left-0
        right-0
        top-0
        bottom-0
        z-150
        class="bg-[var(--color-border)]"
        :style="{ background }"
        v-show="fullScreen"
      >
        <div
          absolute
          left-0
          top-0
          w-full
          h-full
          class="-z-1"
          opacity-60
          style="box-shadow: 0px 10px 40px 0px rgb(76 70 124 / 50%)"
        >
          <div w-full h-full />
        </div>
        <div relative mb-25px class="top">
          <div
            class="i-material-symbols-arrow-back-ios-new-rounded -rotate-90 text-[var(--vt--color-primary)]"
            absolute
            top-6px
            left-6px
            z-50
            text-2xl
            leading-40px
            p-9px
            @click="fullScreen = !fullScreen"
          ></div>
          <h1
            w="70%"
            class="text-[var(--vt--color-primary)]"
            my-0
            mx-auto
            leading-40px
            text-center
            text-xl
            font-600
            truncate
          >
            {{ songName }}
          </h1>
          <h2 leading-20px text-center class="text-#ccc">
            <span v-for="({ name }, index) of songSinger" :key="index"
              >{{ name }}&nbsp;&nbsp;</span
            >
          </h2>
        </div>
        <div
          fixed
          w-full
          top-80px
          bottom-170px
          style="white-space: nowrap"
          @touchstart.prevent="onMiddleTouchStart"
          @touchmove.prevent="onMiddleTouchMove"
          @touchend.prevent="onMiddleTouchEnd"
        >
          <div
            inline-block
            vertical-top
            relative
            w-full
            h-0
            pt="80%"
            :style="middleLStyle"
          >
            <div
              ref="cdWrapperRef"
              absolute
              left="15%"
              top-0
              w="70%"
              aspect-ratio-square
              box-border
            >
              <div w-full h-full rd="15px">
                <template v-for="({ al }, index) of playlist" :key="index">
                  <TransitionGroup :name="transitionName" appear>
                    <div
                      class="player-cover__item"
                      absolute
                      left-0
                      top-0
                      w-full
                      h-full
                      box-border
                      rd="15px"
                      v-if="index === currentIndex"
                      :style="{ background: `url(${al.picUrl})` }"
                    ></div
                  ></TransitionGroup>
                </template>
              </div>
            </div>
            <div
              text-center
              class="text-[var(--vt--color-primary)]"
              leading-32px
              text-xl
              v-if="currentLyric"
            >
              <template
                v-for="({ txt, time }, index) of currentLyric.lines"
                :key="time"
              >
                <TransitionGroup name="list"
                  ><p v-if="currentLineNum === index">
                    {{ txt }}
                  </p></TransitionGroup
                >
              </template>
            </div>
          </div>
          <Scroll
            inline-block
            vertical-top
            w-full
            h-full
            overflow-hidden
            ref="lyricScrollRef"
            :style="middleRStyle"
          >
            <div w="80%" mx-auto overflow-hidden text-center>
              <div v-if="currentLyric" ref="lyricListRef">
                <p
                  leading-32px
                  text="#fff"
                  font-500
                  :class="{ activeLyrics: currentLineNum === index }"
                  v-for="({ time, txt }, index) of currentLyric.lines"
                  :key="time"
                >
                  {{ txt }}
                </p>
              </div>
            </div>
          </Scroll>
        </div>
        <div absolute bottom-50px w-full class="bottom">
          <div text-center>
            <span
              inline-block
              vertical-middle
              mx-4px
              w-8px
              h-8px
              rd="50%"
              bg="#ffffff80"
              :class="{ active: currentShow === 'cd' }"
            ></span>
            <span
              inline-block
              vertical-middle
              mx-4px
              w-8px
              h-8px
              rd="50%"
              bg="#ffffff80"
              :class="{ active: currentShow === 'lyric' }"
            ></span>
          </div>
          <div flex items-center w="90%" mx-auto my-0 py-10px>
            <span
              class="text-[var(--vt--color-primary)]"
              leading-30px
              flex-basis-40px
              w-40px
              text-left
              >{{ formatTimeStart(currenTime) }}</span
            >
            <div flex-1 mx-10px>
              <Progress
                ref="barRef"
                :progress="progress"
                @progress-changing="onProgressChanging"
                @progress-changed="onProgressChanged"
              ></Progress>
            </div>
            <span text-left class="text-[var(--vt--color-primary)]">
              {{ formatTime(playlist[currentIndex]?.dt) }}
            </span>
          </div>
          <div flex items-center>
            <div
              text-3xl
              class="text-[var(--vt--color-primary)]"
              :class="modeIcon"
              flex-1
              @click="changeMode"
            ></div>
            <div
              text-4xl
              class="i-tabler-player-track-prev text-[var(--vt--color-primary)]"
              flex-1
              text-right
              @click="prev"
            ></div>
            <div
              text-4xl
              class="text-[var(--vt--color-primary)]"
              :class="playIcon"
              px20px
              flex-1
              @click="togglePlay"
            ></div>
            <div
              text-4xl
              class="i-tabler-player-track-next text-[var(--vt--color-primary)]"
              text-left
              flex-1
              @click="next"
            ></div>
            <div
              text-3xl
              class="i-icon-park-outline-unlike text-[var(--vt--color-primary)]"
              text-left
              flex-1
            ></div>
          </div>
        </div>
      </div>
    </transition>
    <miniPlayer :togglePlay="togglePlay" />
    <audio
      ref="audioRef"
      :src="Url"
      @pause="playing = false"
      @error="error"
      @timeupdate="updateTime"
      @ended="ended"
      @canplay="ready"
    ></audio>
  </div>
</template>

<script lang="jsx">
import { ref, computed, watch, nextTick } from "vue"
import { useAudio } from "@/stores/useAudio"
import { storeToRefs } from "pinia"
import { $songUrl, $lyrics } from "@/service/song"
import useMode from "./useMode"
import Progress from "./progress.vue"
import { formatTime, formatTimeStart } from "@/assets/js/Uilts"
import Scroll from "@/components/scorll/index.vue"
import LyricPlugin from "./useLyric"
import useToggleCd from "./useToggleCd"
import miniPlayer from "./miniPlayer.vue"
import useAnimation from "./useAnimation"
import { fullScreen, playing } from "@/stores/useStatus"
import useLodingConfig from "@/stores/plugin/useLoding"
import { useTheme } from "@/stores/useTheme"
import Color from "color"
import * as Vibrant from "node-vibrant/dist/vibrant.worker.min.js"
export default {
  components: {
    Progress,
    Scroll,
    miniPlayer,
  },
  setup: () => {
    const audioRef = ref()
    const { playlist, currentIndex, mode, Url } = storeToRefs(useAudio())
    const { cdWrapperRef, enter, afterEnter, leave, afterLeave } =
      useAnimation()
    const currenTime = ref(0)
    const currentLineNum = ref(0)
    const songReady = ref(false)
    const lyricScrollRef = ref()
    const playingLyric = ref("")
    const transitionName = ref("")
    const lyricListRef = ref()
    const currentLyric = ref()
    const background = ref("")
    const Color1 = ref("")
    const Color2 = ref("")
    let progressChange = false
    const { changeMode, ModeIndex } = useMode()
    useLodingConfig()
    const {
      currentShow,
      middleLStyle,
      middleRStyle,
      onMiddleTouchStart,
      onMiddleTouchMove,
      onMiddleTouchEnd,
    } = useToggleCd()
    const { colorRgb } = storeToRefs(useTheme())
    watch(
      () => playlist.value[currentIndex.value]?.al.picUrl,
      () => {
        const cover =
          playlist.value[currentIndex.value]?.al.picUrl + "?param=256y256"
        Vibrant.from(cover, { colorCount: 1 })
          .getPalette()
          .then((palette) => {
            const originColor = Color.rgb(palette.DarkMuted._rgb)
            const color = originColor.darken(0.1).rgb().string()
            const color2 = originColor.lighten(0.28).rotate(-30).rgb().string()
            background.value = `linear-gradient(to top left ,${color},${color2})`
            Color1.value = color
            Color2.value = color2
          })
      },
      {
        immediate: true,
      }
    )
    watch(
      () => playlist.value[currentIndex.value]?.id,
      async () => {
        const { data } = await $songUrl({
          id: playlist.value[currentIndex.value].id,
          br: 999000,
        })
        songReady.value = false
        currenTime.value = 0
        stopLyric()
        currentLyric.value = null
        currentLineNum.value = 0
        const { data: lyrics } = await $lyrics({
          id: playlist.value[currentIndex.value].id,
        })
        currentLyric.value = new LyricPlugin(
          lyrics.lrc.lyric,
          ({ lineNum, txt }) => {
            playingLyric.value = txt
            currentLineNum.value = lineNum
            const scrollComp = lyricScrollRef.value
            const listEl = lyricListRef.value
            if (!listEl) return
            if (lineNum > 5) {
              const lineEl = listEl.children[lineNum - 5]
              scrollComp.scroll.scrollToElement(lineEl, 500)
            } else {
              scrollComp.scroll.scrollTo(0, 0, 500)
            }
          }
        )
        const hasLyric = currentLyric.value.lines.length
        if (hasLyric) {
          if (songReady.value) {
            playLyric()
          }
        }
        Url.value = data.data[0].url
        nextTick(() => {
          const audioEl = audioRef.value
          audioEl.src = Url.value
          audioEl.play()
          playLyric()

          playing.value = true
          currenTime.value = 0
        })
      },
      {
        immediate: false,
      }
    )
    watch(playing, (newPlaying) => {
      if (!songReady.value) {
        return
      }
      const audioEl = audioRef.value
      if (newPlaying) {
        audioEl.play()
        playLyric()
      } else {
        audioEl.pause()
        stopLyric()
      }
    })

    const playLyric = () => {
      const currentLyricVal = currentLyric.value
      if (currentLyricVal) {
        currentLyricVal.seek(currenTime.value * 1000)
      }
    }
    const stopLyric = () => {
      const currentLyricVal = currentLyric.value
      if (currentLyricVal) {
        currentLyricVal.stop()
      }
    }
    const loop = () => {
      const audioEl = audioRef.value
      audioEl.currentTime = 0
      audioEl.play()
      playing.value = true
    }
    return {
      background,
      Color1,
      Color2,
      colorRgb,
      transitionName,
      enter,
      afterEnter,
      leave,
      afterLeave,
      cdWrapperRef,
      Url,
      currentShow,
      middleLStyle,
      middleRStyle,
      onMiddleTouchStart,
      onMiddleTouchMove,
      onMiddleTouchEnd,
      playingLyric,
      currentLyric,
      lyricScrollRef,
      lyricListRef,
      currentLineNum,
      currentIndex,
      playlist,
      currenTime,
      changeMode,
      playing,
      modeIcon: computed(() => {
        return mode.value === 0
          ? "i-radix-icons-loop"
          : mode.value === 1
          ? "i-material-symbols-360"
          : "i-tabler-arrows-random"
      }),
      fullScreen,
      audioRef,
      formatTime,
      formatTimeStart,
      loop,
      songName: computed(() => {
        return playlist.value[currentIndex.value]?.name
      }),
      songSinger: computed(() => {
        return playlist.value[currentIndex.value]?.ar
      }),

      playIcon: computed(() => {
        if (playing.value) {
          return "i-fluent-pause-48-filled"
        } else {
          return "i-fluent-play-16-filled"
        }
      }),
      progress: computed(() => {
        return (
          currenTime.value / (playlist.value[currentIndex.value]?.dt / 1000)
        )
      }),

      next() {
        if (!songReady.value || !playlist.value.length) return
        transitionName.value = "scale-out"
        if (playlist.value.length === 1) {
          loop()
        } else {
          if (mode.value === 0 || mode.value === 1) {
            const index = currentIndex.value + 1
            if (index === playlist.value.length) {
              currentIndex.value = 0
            } else {
              currentIndex.value = index
            }
          } else {
            currentIndex.value = ModeIndex()
          }
        }
      },
      prev() {
        if (!songReady.value || !playlist.value.length) return
        transitionName.value = "scale-in"
        if (playlist.value.length === 1) {
          loop()
        } else {
          if (mode.value === 0 || mode.value === 1) {
            const index = currentIndex.value - 1
            if (index === -1) {
              currentIndex.value = playlist.value.length - 1
            } else {
              currentIndex.value = index
            }
          } else {
            currentIndex.value = ModeIndex()
          }
        }
      },
      onProgressChanging(val) {
        progressChange = true
        currenTime.value = (playlist.value[currentIndex.value].dt / 1000) * val
        playLyric()
        stopLyric()
      },
      onProgressChanged(val) {
        progressChange = false
        audioRef.value.currentTime = currenTime.value =
          (playlist.value[currentIndex.value].dt / 1000) * val
        if (!playing.value) playing.value = true
        playLyric()
      },
      error() {
        console.log("error")
      },
      updateTime(e) {
        if (progressChange) return
        currenTime.value = e.target.currentTime
      },
      ended() {
        if (mode.value === 0) {
          currentIndex.value++
        } else if (mode.value === 1) {
          loop()
        } else {
          currentIndex.value = ModeIndex()
        }
      },
      ready() {
        if (songReady.value) {
          return
        }
        songReady.value = true
        playLyric()
      },
      togglePlay() {
        if (!songReady.value) {
          return
        }
        playing.value = !playing.value
      },
    }
  },
}
</script>
<style scoped>
.active {
  width: 20px;
  border-radius: 5px;
  background: var(--vt--color-primary);
}
.normal-enter-active,
.normal-leave-active {
  transition: all 0.6s;
}
.normal-enter-active,
.normal-leave-active .top,
.bottom {
  transition: all 0.6s cubic-bezier(0.45, 0, 0.55, 1);
}
.normal-enter-from,
.normal-leave-to {
  opacity: 0;
}
.normal-enter-from,
.normal-leave-to .top {
  transform: translate3d(0, -100px, 0);
}
.normal-enter-from,
.normal-leave-to .bottom {
  transform: translate3d(0, 100px, 0);
}
.player-cover__item {
  background-repeat: no-repeat !important;
  background-position: center !important;
  background-size: cover !important;
}
.player-cover__item:before {
  content: "";
  background: inherit;
  width: 100%;
  height: 100%;
  box-shadow: -1px 0em 4em rgba(v-bind(Color1));
  display: block;
  z-index: 1;
  position: absolute;
  top: 30px;
  transform: scale(0.9);
  filter: blur(10px);
  opacity: 0.9;
  border-radius: 15px;
}
.player-cover__item:after {
  content: "";
  background: inherit;
  width: 100%;
  height: 100%;
  box-shadow: -1px 0em 4em rgba(v-bind(Color2));
  display: block;
  z-index: 2;
  position: absolute;
  border-radius: 15px;
}
.scale-out-enter-active {
  transition: all 0.35s ease-in-out;
}

.scale-out-leave-active {
  transition: all 0.35s ease-in-out;
}

.scale-out-enter {
  transform: scale(0.35);
  pointer-events: none;
  opacity: 0;
}

.scale-out-leave-to {
  transform: scale(1.5);
  pointer-events: none;
  opacity: 0;
}

.scale-in-enter-active {
  transition: all 0.35s ease-in-out;
}

.scale-in-leave-active {
  transition: all 0.35s ease-in-out;
}

.scale-in-enter {
  transform: translate(100%);
  pointer-events: none;
  opacity: 0;
}

.scale-in-leave-to {
  transform: scale(0.35);
  pointer-events: none;
  opacity: 0;
}
</style>
