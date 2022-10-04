<template>
  <div class="slider" ref="rootRef">
    <div class="slider-group">
      <div class="slider-page" v-for="(item, index) in sliders" :key="index">
        <a :href="item.url"> <img :src="item.imageUrl" object-cover /></a>
      </div>
    </div>
    <div class="dots-wrapper">
      <span
        class="dot"
        v-for="(item, index) in sliders"
        :key="index"
        :class="{ active: currentPageIndex === index }"
      >
      </span>
    </div>
  </div>
</template>

<script lang="jsx">
import { ref } from "vue"
import useSlider from "./use-slider"

export default {
  name: "slider",
  props: {
    sliders: {
      type: Array,
      default() {
        return []
      },
    },
  },
  setup: () => {
    const rootRef = ref(null)
    const { currentPageIndex } = useSlider(rootRef)

    return {
      rootRef,
      currentPageIndex,
    }
  },
}
</script>

<style scoped>
.slider {
  min-height: 1px;
  font-size: 0;
  touch-action: pan-y;
}
.slider-group {
  position: relative;
  overflow: hidden;
  white-space: nowrap;
}
.slider-page {
  display: inline-block;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
}
a {
  display: block;
  width: 100%;
}
img {
  display: block;
  width: 100%;
}
.dots-wrapper {
  position: absolute;
  left: 50%;
  bottom: 12px;
  line-height: 12px;
  transform: translateX(-50%);
}
.dot {
  display: inline-block;
  margin: 0 4px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.8);
}
.active {
  width: 20px;
  border-radius: 5px;
  background: var(--vt--color-primary);
}
</style>
