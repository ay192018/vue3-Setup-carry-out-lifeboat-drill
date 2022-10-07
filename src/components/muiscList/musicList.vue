<template>
  <div position-fixed bottom="0" w="100%" top="0" h="100%" overflow="scroll">
    <div
      @click="$router.back()"
      position-absolute
      top-0
      left-6px
      z-20
      style="transform: translateZ(2px); color: var(--vt--color-primary)"
      class="i-material-symbols-arrow-back-ios-new"
      text-lg
      h-40px
    ></div>
    <h1
      position-absolute
      top-0
      left="10%"
      w="80%"
      z-20
      style="transform: translateZ(2px); color: var(--vt--color-primary)"
      text-center
      leading-40px
      text-lg
    >
      {{ data?.name }}
    </h1>
    <div
      position-relative
      class="!bg-cover"
      transform-origin-t
      w="100%"
      h="260px"
      :style="{ background: `url(${data?.picUrl})` }"
    >
      <div position-absolute bottom-20px z-10 w="100%">
        <div
          box-border
          w-135px
          py-7px
          my-0
          mx-auto
          text-center
          b-rd-100px
          border-1px
          text-0
          style="
            border-radius: 100px;
            color: var(--vt--color-primary);
            border-color: var(--vt--color-primary);
          "
        >
          <span
            inline-block
            class="v-middle"
            style="color: var(--vt--color-primary)"
            text-sm
            >随机播放全部</span
          >
        </div>
      </div>

      <div
        position-absolute
        top-0
        left-0
        w="100%"
        h="100%"
        bg="#07111b66"
      ></div>
    </div>
    <Scroll
      style="height: calc(100% - 260px)"
      overflow="hidden"
      position-absolute
      w="100%"
      bottom-0
      z-0
    >
      <div py-20px px-30px box-border>
        <SongList :songs="songs" h="100%"></SongList>
      </div>
    </Scroll>
  </div>
</template>

<script lang="jsx">
import Scroll from "@/components/scorll/index.vue"
import SongList from "@/components/muiscList/index.vue"
export default {
  name: "music-list",
  components: {
    Scroll,
    SongList,
  },
  props: {
    songs: {
      type: Array,
      default() {
        return []
      },
    },
    data: {
      type: Object,
    },
  },
}
</script>
<style scoped></style>
