<script lang="jsx">
import { RouterView } from "vue-router";
import Header from "@/components/header/index.vue";
import Tab from "@/components/Tab/index.vue";
import Player from "@/components/player/index.vue";
export default {
  components: {
    Header,
    Tab,
    RouterView,
    Player,
  },
  setup: () => {
    return {};
  },
};
</script>

<template>
  <Header />
  <Tab />
  <router-view v-slot="{ Component }">
    <template v-if="Component">
      <transition appear name="slide">
        <KeepAlive>
          <Suspense>
            <!-- 主要内容 -->
            <component :is="Component"></component>

            <!-- 加载中状态 -->
            <template #fallback> <div>正在加载...</div> </template>
          </Suspense>
        </KeepAlive>
      </transition>
    </template>
  </router-view>
  <Player />
</template>

<style scoped></style>
