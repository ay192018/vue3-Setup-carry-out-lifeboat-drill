<template>
  <div
    w="100%"
    top="88px"
    position-fixed
    bottom="0"
    overflow="scroll"
    v-Ayy:[AyyText]="!loading"
    mb-60px
  >
    <Scroll h="100%" overflow="hidden" ref="ScrollRef">
      <div>
        <ul>
          <li
            v-for="{ picUrl, name, id } of HotList"
            flex
            items-center
            px-20px
            pb-20px
            box-border
            :key="id"
            @click="selectItem(id)"
          >
            <div flex-basis-60px mr-10px>
              <img v-lazy="picUrl" rounded-8px w-60px h-60px />
            </div>
            <div
              flex-col
              flex
              justify-center
              flex-1
              leading-20px
              overflow-hidden
            >
              <!--  <h2 mb-10px></h2> -->
              <p style="color: var(--color-text)">
                {{ name }}
              </p>
            </div>
          </li>
        </ul>
      </div>
    </Scroll>
    <router-view v-slot="{ Component }">
      <transition appear name="slide">
        <component :is="Component" :id="ActiveId" />
      </transition>
    </router-view>
  </div>
</template>

<script lang="jsx">
import { onMounted, ref, watchPostEffect } from "vue"
import { $Artist, $HotArtist } from "@/service/singer.js"
import { useRouter } from "vue-router"
import Scroll from "@/components/scorll/index.vue"
import { computed } from "@vue/reactivity"
export default {
  components: {
    Scroll,
  },
  setup: () => {
    const HotList = ref([])
    const router = useRouter()
    const ActiveId = ref()
    const ScrollRef = ref()
    const offset = 0

    watchPostEffect(async () => {
      const { data: singerList } = await $HotArtist({
        limit: 100,
        offset: offset,
      })
      singerList.artists.forEach((_) => {
        HotList.value.push({
          picUrl: _.picUrl,
          name: _.name,
          id: _.id,
        })
      })
      ScrollRef.value.scroll.finishPullUp()
    })
    onMounted(() => {
      ScrollRef.value.scroll.on("pullingUp", () => {
        console.log(offset)
      })
    })
    return {
      ScrollRef,
      HotList,
      loading: computed(() => {
        return Boolean(HotList.value.length)
      }),
      selectItem: (_) => {
        ActiveId.value = _
        router.push({
          name: "Detail",
          params: {
            id: _,
          },
        })
      },
      ActiveId,
      AyyText: "玩命加载中！！！",
    }
  },
}
</script>
<style scoped></style>
