<template>
  <div
    w="100%"
    top="88px"
    position-fixed
    bottom="0"
    overflow="scroll"
    v-Ayy:[AyyText]="loading"
  >
    <Scroll h="100%" overflow="hidden">
      <div>
        <div position="relative" w="100%" h="0" pt="40%" overflow="hidden">
          <div position="absolute" left="0" top="0" w="100%" h="100%">
            <Banner :sliders="sliders" v-if="sliders.length" />
          </div>
        </div>
        <div>
          <h1
            v-Ayy:[AyyText]="loading"
            h-65px
            leading-65px
            text-center
            text-sm
            class="text-[var(--vt--color-primary)]"
          >
            {{ HotSongs }}
          </h1>
          <ul>
            <li
              v-for="{ name, id, picUrl } in albums"
              flex
              items-center
              px-20px
              pb-20px
              box-border
              :key="id"
              @click="selectItem(id)"
            >
              <div flex-basis-60px mr-10px>
                <img width="60" height="60" v-lazy="picUrl" rounded-8px />
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
import { onMounted, ref, computed } from "vue"
import { $Banner, $Song } from "@/service/home.js"
import Banner from "@/components/banner/index.vue"
import Scroll from "@/components/scorll/index.vue"
import { useRouter } from "vue-router"
export default {
  name: "recommend",
  components: {
    Banner,
    Scroll,
  },

  setup: () => {
    const sliders = ref([])
    const albums = ref([])
    const AyyText = ref("正在玩命加载中！！")
    const HotSongs = ref("热门歌单推荐")
    const ActiveId = ref()
    const router = useRouter()
    onMounted(async () => {
      const { data } = await $Banner()
      const { data: song } = await $Song({
        limit: 100,
      })
      song.result.forEach((_) => {
        albums.value.push({
          name: _.name,
          picUrl: _.picUrl,
          id: _.id,
        })
      })
      data.banners.forEach((_) => {
        sliders.value.push({
          imageUrl: _.imageUrl,
          url: _.url,
        })
      })
    })
    return {
      sliders,
      albums,
      loading: computed(() => {
        return !sliders.value.length && !albums.value.length
      }),
      AyyText,
      HotSongs,
      ActiveId,
      selectItem: (_) => {
        ActiveId.value = _
        router.push({
          name: "recommendDetail",
          params: {
            id: _,
          },
        })
      },
    }
  },
}
</script>
<style scoped></style>
