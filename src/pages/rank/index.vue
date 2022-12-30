<template>
  <div
    w="100%"
    top="88px"
    position-fixed
    bottom="0"
    overflow="scroll"
    v-Ayy="loading"
  >
    <Scroll h="100%" overflow="hidden">
      <ul>
        <li
          flex
          mx-20px
          pt-20px
          v-for="{
            id,
            coverImgUrl,
            tracks,
            description,
            updateFrequency,
          } of topList"
          :key="id"
          @click="
            ;(ActiveId = id),
              $router.push({
                name: 'rankDetail',
                params: {
                  id,
                },
              })
          "
        >
          <div flex-basis-100px w-100px h-100px flex-shrink-0>
            <img v-lazy="coverImgUrl" />
          </div>
          <ul
            flex
            flex-1
            flex-col
            px-20px
            h-100px
            overflow-hidden
            class="bg-[var(--minPlayer--bg)] text-[var(--color-text)]"
            relative
          >
            <li
              leading-32px
              truncate
              v-for="({ first, second }, index) of tracks"
              :key="second"
              v-if="tracks.length"
            >
              <span>{{ index + 1 }}.</span>
              <span>{{ first }}-{{ second }}</span>
            </li>
            <li v-else class="hidden-3 text-center">
              {{ description ? description : "暂无描述" }}
            </li>
          </ul>
        </li>
      </ul>
    </Scroll>
    <router-view v-slot="{ Component }">
      <transition appear name="slide">
        <component :is="Component" :id="ActiveId" />
      </transition>
    </router-view>
  </div>
</template>

<script lang="jsx">
import Scroll from "@/components/scorll/index.vue"
import { onMounted, ref, computed } from "vue"
import { $toplistDetail } from "@/service/rank"

export default {
  components: { Scroll },
  setup: () => {
    const ActiveId = ref()
    const topList = ref([])
    onMounted(async () => {
      const { data } = await $toplistDetail()
      topList.value = data.list

      console.log(data)
    })
    return {
      topList,
      ActiveId,
      loading: computed(() => {
        return !topList.value.length
      }),
    }
  },
}
</script>
<style scoped></style>
