<template>
  <div w="100%" top="88px" position-fixed bottom="0" overflow="scroll" px-10px>
    <Scroll h="100%" overflow="hidden">
      <div>
        <div
          class="bg-[var(--color-background)] w-full border-rd-.5rem my-10px p-2"
          :style="{
            boxShadow: `rgba(${colorRgb}, 0.5) 0px 4px 7px -1px,
    rgb(0 0 0 / 6%) 0px 2px 4px -1px`,
          }"
        >
          <div
            class="aspect-ratio-1 overflow-hidden h-4rem w-4rem border-rd-30%"
          >
            <img src="https://q1.qlogo.cn/g?b=qq&nk=2510186180&s=100" />
          </div>
        </div>
      </div>
    </Scroll>
  </div>
</template>

<script lang="jsx">
import Scroll from "@/components/scorll/index.vue"
import { storeToRefs } from "pinia"
import { useTheme } from "@/stores/useTheme"
export default {
  components: { Scroll },
  setup: () => {
    const { colorRgb } = storeToRefs(useTheme())
    return {
      colorRgb,
    }
  },
}
</script>
<style scoped></style>
