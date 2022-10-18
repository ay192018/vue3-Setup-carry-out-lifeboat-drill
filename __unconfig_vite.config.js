
let __unconfig_data;
let __unconfig_stub = function (data = {}) { __unconfig_data = data };
__unconfig_stub.default = (data = {}) => { __unconfig_data = data };
import { fileURLToPath, URL } from "node:url"
import presetIcons from "@unocss/preset-icons"
import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import vueJsx from "@vitejs/plugin-vue-jsx"
const unocss = __unconfig_stub;
import { presetAttributify, presetUno } from "unocss"
// https://vitejs.dev/config/
const __unconfig_default =  defineConfig({
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

if (typeof __unconfig_default === "function") __unconfig_default(...[{"command":"serve","mode":"development"}]);export default __unconfig_data;