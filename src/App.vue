<script lang="jsx">
import { RouterView } from "vue-router"
import Header from "@/components/header/index.vue"
import Tab from "@/components/Tab/index.vue"
export default {
  components: {
    Header,
    Tab,
    RouterView,
  },
  setup: () => {
    return {}
  },
}
</script>

<template>
  <Header />
  <Tab />
  <router-view v-slot="{ Component }">
    <transition name="slide">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view>
</template>

<style scoped></style>
