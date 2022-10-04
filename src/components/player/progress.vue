<template>
  <div @click="onClick" h-30px>
    <div relative top-13px h-4px bg="#0000004d">
      <div
        ref="progress"
        class="progress"
        :style="progressStyle"
        absolute
        h-full
      ></div>
      <div
        :style="btnStyle"
        absolute
        left--8px
        top--13px
        w-30px
        h-30px
        @touchstart.prevent="onTouchStart"
        @touchmove.prevent="onTouchMove"
        @touchend.prevent="onTouchEnd"
      >
        <div
          relative
          top-7px
          left-7px
          box-border
          w-16px
          h-16px
          b-3
          class="progress"
          style="border-color: var(--vt--color-primary)"
          rd="50%"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
const progressBtnWidth = 16

export default {
  name: "progress-bar",
  emits: ["progress-changing", "progress-changed"],
  props: {
    progress: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      offset: 0,
    }
  },
  computed: {
    progressStyle() {
      return `width:${this.offset}px;`
    },
    btnStyle() {
      return `transform:translate3d(${this.offset}px,0,0)`
    },
  },
  watch: {
    progress(newProgress) {
      this.setOffset(newProgress)
    },
  },
  created() {
    this.touch = {}
  },
  methods: {
    onTouchStart(e) {
      this.touch.x1 = e.touches[0].pageX
      this.touch.beginWidth = this.$refs.progress.clientWidth
    },
    onTouchMove(e) {
      const delta = e.touches[0].pageX - this.touch.x1
      const tempWidth = this.touch.beginWidth + delta
      const barWidth = this.$el.clientWidth - progressBtnWidth
      const progress = Math.min(1, Math.max(tempWidth / barWidth, 0))
      this.offset = barWidth * progress
      this.$emit("progress-changing", progress)
    },
    onTouchEnd() {
      const barWidth = this.$el.clientWidth - progressBtnWidth
      const progress = this.$refs.progress.clientWidth / barWidth
      this.$emit("progress-changed", progress)
    },
    onClick(e) {
      const rect = this.$el.getBoundingClientRect()
      const offsetWidth = e.pageX - rect.left
      const barWidth = this.$el.clientWidth - progressBtnWidth
      const progress = offsetWidth / barWidth
      this.$emit("progress-changed", progress)
    },
    setOffset(progress) {
      const barWidth = this.$el.clientWidth - progressBtnWidth
      this.offset = barWidth * progress
    },
  },
}
</script>

<style scoped>
.progress {
  background-color: var(--vt--color-primary);
}
</style>
