import BScroll from "@better-scroll/core"
import ObserveDOM from "@better-scroll/observe-dom"
import ScrollBar from "@better-scroll/scroll-bar"
import { onMounted, onUnmounted, ref } from "vue"
BScroll.use(ObserveDOM).use(ScrollBar)
export default function useScroll(wrapperRef, options) {
  const scroll = ref(null)
  onMounted(() => {
    scroll.value = new BScroll(wrapperRef.value, {
      ...options,
      observeDOM: true,
      scrollY: true,
      scrollbar: true,
    })
  })
  onUnmounted(() => {
    scroll.value.destroy()
  })
}
