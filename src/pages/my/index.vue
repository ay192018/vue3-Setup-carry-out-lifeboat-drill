<template>
  <div w="100%" top="88px" position-fixed bottom="0" overflow="scroll" px-10px>
    <Scroll h="100%" overflow="hidden">
      <div>
        <div class="card">
          <div class="circle"></div>
          <div class="circle"></div>
          <div class="card-inner text-center">
            <img
              class="rd-50% mx-auto py-20px"
              src="https://q1.qlogo.cn/g?b=qq&nk=2510186180&s=100"
            />
            <h2 class="font-600 text-xl activeLyrics">用户的音乐库</h2>
            <ul class="flex">
              <li class="flex-1">1</li>
            </ul>
          </div>
        </div>
        <DataInfo />
        <Like />
      </div>
    </Scroll>
  </div>
</template>

<script lang="jsx">
import Scroll from "@/components/scorll/index.vue"
import DataInfo from "./components/dataInfo/index.vue"
import Like from "./components/like/index.vue"
import { storeToRefs } from "pinia"
import { useTheme } from "@/stores/useTheme"
export default {
  components: { Scroll, DataInfo, Like },
  setup: () => {
    const { colorRgb, color } = storeToRefs(useTheme())
    return {
      colorRgb,
      color,
    }
  },
}
</script>
<style scoped>
.card {
  width: 100%;
  height: 300px;
  transition: all 0.2s;
  position: relative;
  cursor: pointer;
}

.card-inner {
  width: inherit;
  height: inherit;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(10px);
  border-radius: 8px;
}

.circle {
  width: 100px;
  height: 100px;
  background: radial-gradient(v-bind(color), v-bind(color));
  border-radius: 50%;
  position: absolute;
  animation: move-up6 2s ease-in infinite alternate-reverse;
}

.circle:nth-child(1) {
  top: -25px;
  left: -25px;
}

.circle:nth-child(2) {
  bottom: -25px;
  right: -25px;
  animation-name: move-down1;
}

@keyframes move-up6 {
  to {
    transform: translateY(-10px);
  }
}

@keyframes move-down1 {
  to {
    transform: translateY(10px);
  }
}
</style>
