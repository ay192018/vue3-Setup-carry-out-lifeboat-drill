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
    ></div>
    <div>
      <div class="i-logos-medusa-icon" text-7 mr=".5" />
      <span text="#ffcd32">{{ APPNAME }}</span>
    </div>
    <div class="i-carbon-user-avatar-filled-alt" text-2xl></div>
  </div>
</template>

<script lang="jsx">
import { computed, ref, watch } from "vue"
export default {
  setup: () => {
    const isTheme = ref(false)
    watch(
      () => isTheme.value,
      (val) => {
        if (val === true) {
          document.documentElement.classList.add("dark")
        } else {
          document.documentElement.classList.remove("dark")
        }
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
