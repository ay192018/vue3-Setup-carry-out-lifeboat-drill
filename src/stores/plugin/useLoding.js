import { watchEffect } from "vue"
import { storeToRefs } from "pinia"
import { useTheme } from "@/stores/useTheme"

export default function useLodingConfig() {
  const { color } = storeToRefs(useTheme())
  watchEffect(() => {
    document.documentElement.style.setProperty(
      "--vt--color-primary",
      color.value
    )
  })
}
