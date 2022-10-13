<template>
  <div px-10px v-Ayy="!resultList.length">
    <div flex justify-between items-center my-10px>
      <h1 font-800>搜索结果</h1>
      <div
        class="i-carbon-ai-results text-[var(--vt--color-primary)]"
        text-2xl
      ></div>
    </div>
    <MuiscList :songs="resultList" />
    <div p-20px text-center>
      <div v-if="!props.isPullUpLoad">
        <span>上拉加载更多。。。</span>
      </div>
      <div v-else>
        <span>加载中~~~</span>
      </div>
    </div>
  </div>
</template>

<script lang="jsx">
import Scroll from "@/components/scorll/index.vue"
import { $SearchMultimatch } from "@/service/search"
import { ref, watchPostEffect, onUnmounted } from "vue"
import MuiscList from "@/components/muiscList/index.vue"
export default {
  components: { Scroll, MuiscList },
  props: {
    value: {
      type: String,
      default: () => {
        return ""
      },
    },
    isPullUpLoad: {
      type: Boolean,
      default: false,
    },
    page: {
      type: Number,
      default: 0,
    },
  },
  emits: ["resetPage"],
  setup: (props, { expose, emit }) => {
    const resultList = ref([])
    expose({ resultList })
    const stop = watchPostEffect(async () => {
      const { data } = await $SearchMultimatch({
        keywords: props.value,
        offset: (props.page - 1) * 30,
      })
      resultList.value.push(...data.result.songs)
      console.log(data)
    })
    onUnmounted(() => {
      stop()
      emit("resetPage")
    })
    return { resultList, props }
  },
}
</script>
<style scoped>
.resultStyle {
  width: 90%;
  height: 0.4rem;
}
</style>
