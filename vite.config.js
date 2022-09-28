import { fileURLToPath, URL } from "node:url"
import presetIcons from "@unocss/preset-icons"
import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import vueJsx from "@vitejs/plugin-vue-jsx"
import unocss from "unocss/vite"
import { presetAttributify, presetUno } from "unocss"
// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [
    vue({
      reactivityTransform: true,
    }),
    vueJsx(),
    unocss({
      rules: [],
      presets: [
        presetIcons({
          extraProperties: {
            display: "inline-block",
            "vertical-align": "middle",
          },
        }),
        presetAttributify(),
        presetUno(),
      ],
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
})
