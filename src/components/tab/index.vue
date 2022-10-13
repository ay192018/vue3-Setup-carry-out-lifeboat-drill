<template>
  <div flex h-44px leading-44px text-center>
    <div
      flex-1
      v-for="tab in tabs"
      :key="tab.path"
      @click="$router.push(tab.path)"
    >
      <span pb="5px" :class="{ TabActive: route.path === tab.path }">
        {{ tab.name }}
      </span>
    </div>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import { ref } from "vue";
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
      {
        name: "我的",
        path: "/my",
      },
    ]);

    return {
      tabs,
      route: useRoute(),
    };
  },
};
</script>

<style scoped>
.link {
  color: var(--color-text);
}
.TabActive {
  color: var(--vt--color-primary);
  border-bottom: 2px solid var(--vt--color-primary);
}
</style>
