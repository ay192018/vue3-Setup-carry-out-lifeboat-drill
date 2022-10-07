<template>
  <div w="100%" top="60px" position-fixed bottom="0" overflow="scroll">
    <Scroll h="100%" overflow="hidden">
      <div p-5 box-border flex flex-wrap>
        <div
          w="50%"
          v-for="{ color } in Themes"
          :key="color"
          aspect-ratio-square
          text-center
          @click="setTheme(color)"
        >
          <div
            w="80%"
            aspect-ratio-square
            :style="`background:${color}`"
            rd-4
            inline-block
          ></div>
          <br />
          <span>{{ color }}</span>
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
    const { color } = storeToRefs(useTheme())
    return {
      Themes: [
        {
          color: "#007AFF",
        },
        {
          color: "#5AC8FA",
        },
        {
          color: "#5856D6",
        },
        {
          color: "#536DFE",
        },
        {
          color: "#ffcd32",
        },
        {
          color: "#9C27B0",
        },
        {
          color: "#AF52DE",
        },
        {
          color: "#0096C7",
        },
        {
          color: "#00C1D4",
        },
        {
          color: "#34C759",
        },
        {
          color: "#43A047",
        },
        {
          color: "#7CB342",
        },
        {
          color: "#C0CA33",
        },
        {
          color: "#78DEC7",
        },
        {
          color: "#E53935",
        },
        {
          color: "#D81B60",
        },
        {
          color: "#F4511E",
        },
        {
          color: "#FB8C00",
        },
        {
          color: "#FFB300",
        },
        {
          color: "#FDD835",
        },
        {
          color: "#6D4C41",
        },
      ],
      setTheme: (_) => {
        color.value = _
      },
    }
  },
}
</script>
<style scoped></style>
