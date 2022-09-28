<template>
  <div class="-translate-50%" position-absolute top="50%" left="50%">
    <div text-center>
      <img width="30" height="30" src="./loading.gif" inline />
      <p leading-20px style="color: var(--color-text)">
        {{ title }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "loading",
  data() {
    return {
      title: "正在载入...",
    }
  },
  methods: {
    setTitle(title) {
      this.title = title
    },
  },
}
</script>

<style scoped></style>
