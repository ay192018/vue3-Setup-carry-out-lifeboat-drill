<template>
  <div
    position-fixed
    bottom="0"
    w="100%"
    top="0"
    style="height: 100%"
    overflow="scroll"
  >
    <div
      @click="$router.back()"
      position-absolute
      top-0
      left-6px
      z-20
      style="transform: translateZ(2px)"
    >
      左边
    </div>
    <h1
      position-absolute
      top-0
      left="10%"
      w="80%"
      z-20
      style="transform: translateZ(2px)"
      text-center
      leading-40px
      text-lg
      text="#ffcd32"
    >
      {{ data.name }}
    </h1>
    <div
      position-relative
      transform-origin-t
      w="100%"
      h-260px
      z-0
      style="background-size: cover"
      :style="{ background: `url(${data.picUrl}) no-repeat` }"
    >
      <div position-absolute top-200px z-10 w="100%">
        <div
          box-border
          w-135px
          my-0
          mx-auto
          text-center
          h-20px
          style="border: 1px solid #ffcd32; font-size: 0; border-radius: 100px"
          text="#ffcd32"
        >
          随机播放全部
        </div>
      </div>

      <div w="100%" h="100%" style="backdrop-filter: bulr(0px)"></div>
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
        <SongList :songs="songs" style="height: 100%"></SongList>
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
  created() {},
}
</script>
<style scoped></style>
