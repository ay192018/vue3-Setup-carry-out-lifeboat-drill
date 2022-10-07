<template>
  <div
    position-fixed
    z-10
    top-0
    left-0
    bottom-0
    right-0
    overflow="scroll"
    backdrop-blur-5px
    class="bg-[var(--minPlayer--bg)]"
    mb-60px
  >
    <div
      text-center
      leading-44px
      vertical-align-top
      flex
      justify-between
      items-center
      px-3
      text-xl
    >
      <div
        class="i-material-symbols-arrow-back-ios-new-rounded text-[var(--vt--color-primary)]"
        text-2xl
        @click="$router.back"
      ></div>
      <div class="activeLyrics">Theme切换</div>
      <div
        class="i-icon-park-solid-theme text-[var(--vt--color-primary)]"
        text-2xl
        @click="$router.push('/Theme')"
      ></div>
    </div>
    <Content />
  </div>
</template>

<script lang="jsx">
import Content from "./components/content.vue"
export default {
  components: { Content },
  setup: () => {
    return {}
  },
}
</script>
<style scoped></style>
