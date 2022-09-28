<template>
  <div flex h-44px leading-44px text-center>
    <router-link
      flex-1
      class="link"
      v-for="(tab, _) in tabs"
      :key="tab.path"
      :to="tab.path"
    >
      <span pb="5px" :class="{ TabActive: route.path === tab.path }">
        {{ tab.name }}
      </span>
    </router-link>
  </div>
</template>

<script>
import { useRoute } from "vue-router"
import { ref } from "vue"
export default {
  name: "tab",
  setup: () => {
    const tabs = ref([
      {
        name: "推荐",
        path: "/recommend",
      },
      {
        name: "歌手",
        path: "/singer",
      },
      {
        name: "排行",
        path: "/rank",
      },
      {
        name: "搜索",
        path: "/search",
      },
    ])

    return {
      tabs,
      route: useRoute(),
    }
  },
}
</script>

<style scoped>
.link {
  color: var(--color-text);
}
.TabActive {
  color: var(--vt-title-color);
  border-bottom: 2px solid var(--vt-title-color);
}
</style>
