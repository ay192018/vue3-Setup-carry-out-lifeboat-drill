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

    <Scroll h-full overflow="hidden" position-absolute w="100%" bottom-0>
      <div>
        <div
          position-relative
          class="!bg-cover"
          transform-origin-t
          w="100%"
          h="310px"
          :style="{
            background: `url(${data?.creator?.backgroundUrl || data?.picUrl})`,
          }"
        >
          <div
            position-absolute
            right-25px
            top-260px
            style="width: calc(100% - 25px)"
            text-right
            z-100
          >
            <div
              text-right
              class="text-[var(--vt--color-primary)]"
              text-lg
              mt-12px
              font-500
              leading-24px
              style="width: calc(100% - 85px)"
              z-100
              truncate
            >
              <strong> {{ data?.creator?.nickname || data?.name }}</strong>
            </div>
            <div
              w-70px
              h-70px
              inline
              float-right
              top--20px
              rd-12px
              overflow-hidden
            >
              <img
                :src="data?.creator?.avatarUrl || data?.picUrl"
                w-full
                h-full
                object-cover
              />
            </div>
            <div
              position-absolute
              right-25px
              top-100px
              class="text-[var(--c-text-personality)]"
              truncate
              style="width: calc(100% - 25px)"
              text-right
              px-10px
            >
              {{ data?.description || data?.briefDesc }}
            </div>
          </div>

          <!--       <div
        position-absolute
        top-0
        left-0
        w="100%"
        h="100%"
        bg="#07111b66"
      ></div> -->
        </div>
        <div py-20px px-30px box-border mt-80px>
          <SongList :songs="songs" h="100%"></SongList>
        </div>
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
