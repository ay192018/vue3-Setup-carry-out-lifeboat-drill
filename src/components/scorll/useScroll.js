import BScroll from "@better-scroll/core"
import ObserveDOM from "@better-scroll/observe-dom"
import Pullup from "@better-scroll/pull-up"
import MouseWheel from "@better-scroll/mouse-wheel"
import { onMounted, onUnmounted, onActivated, onDeactivated, ref } from "vue"

BScroll.use(ObserveDOM).use(Pullup).use(MouseWheel)

export default function useScroll(wrapperRef, options, emit) {
  const scroll = ref(null)

  onMounted(() => {
    const scrollVal = (scroll.value = new BScroll(wrapperRef.value, {
      observeDOM: true,
      pullUpLoad: true,
      ...options,
      mouseWheel: {
        speed: 20,
        invert: false,
        easeTime: 300,
      },
    }))

    if (options.probeType > 0) {
      scrollVal.on("scroll", (pos) => {
        console.log(pos)
        emit("scroll", pos)
      })
    }
  })

  onUnmounted(() => {
    scroll.value.destroy()
  })

  onActivated(() => {
    scroll.value.enable()
    scroll.value.refresh()
  })

  onDeactivated(() => {
    scroll.value.disable()
  })

  return scroll
}
