<template>
  <div
    text-center
    leading-44px
    vertical-align-top
    style="font-size: 18px"
    flex
    justify-between
    items-center
    px-3
  >
    <div
      :class="
        isTheme ? 'i-material-symbols-dark-mode' : 'i-ic-sharp-light-mode'
      "
      text-2xl
      @click="isTheme = !isTheme"
      class="text-[var(--vt--color-primary)]"
    ></div>
    <div>
      <div class="i-logos-morpheus-icon" text-7 mr="1" />
      <span class="activeLyrics">{{ APPNAME }}</span>
    </div>
    <div
      class="i-icon-park-solid-theme text-[var(--vt--color-primary)]"
      text-2xl
      @click="$router.push('/Theme')"
    ></div>
  </div>
</template>

<script lang="jsx">
import { computed, watch } from "vue"
import { useTheme } from "../../stores/useTheme"
import { storeToRefs } from "pinia"
export default {
  setup: () => {
    const { isTheme } = storeToRefs(useTheme())
    watch(
      () => isTheme.value,
      (val) => {
        if (val === true) {
          document.documentElement.classList.add("dark")
        } else {
          document.documentElement.classList.remove("dark")
        }
      },
      {
        immediate: true,
      }
    )
    return {
      isTheme,
      APPNAME: computed(() => {
        return import.meta.env.VITE_APP_NAME
      }),
    }
  },
}
</script>
<style scoped></style>
