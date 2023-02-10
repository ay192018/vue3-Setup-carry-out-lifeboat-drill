<template>
  <div :style="{ background: color }" class="w-full h-80px">用户资料组件</div>
</template>

<script lang="jsx">
import { useTheme } from "@/stores/useTheme"
import { storeToRefs } from "pinia"
export default {
  setup: () => {
    console.log(useTheme)
    const { color } = storeToRefs(useTheme())
    return {
      color,
    }
  },
}
</script>
<style scoped></style>
