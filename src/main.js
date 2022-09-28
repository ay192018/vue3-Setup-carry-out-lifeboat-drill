import { createApp } from "vue"
import { createPinia } from "pinia"
import loadingDirective from "@/components/loading/directive.js"
import "uno.css"
import App from "./App.vue"
import router from "./router"
import "./assets/main.css"
import lazyPlugin from "vue3-lazy"
import "@unocss/reset/tailwind.css"
const app = createApp(App)

app
  .use(createPinia())
  .use(router)
  .use(lazyPlugin, {
    loading: "http://junyu.shop:1005/storage/article/1/2022-09/1663688912.jpg",
  })
  .directive("Ayy", loadingDirective)
  .mount("body")
