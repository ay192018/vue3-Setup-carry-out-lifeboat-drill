import { createApp, toRaw } from "vue"
import { createPinia } from "pinia"
import loadingDirective from "@/components/loading/directive.js"
import "uno.css"
import App from "./App.vue"
import router from "./router"
import "./assets/main.css"
import lazyPlugin from "vue3-lazy"
import "@unocss/reset/tailwind.css"
const app = createApp(App)
const __piniaKey = "__PINIAKEY__"
//将数据存在本地
const setStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
}
//存缓存中读取
const getStorage = (key) => {
  return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : {}
}
//利用函数柯丽华接受用户入参
const piniaPlugin = (options) => {
  //将函数返回给pinia  让pinia  调用 注入 context
  return (context) => {
    const { store } = context

    const data = getStorage(`${options?.key ?? __piniaKey}-${store.$id}`)

    store.$subscribe(() => {
      setStorage(
        `${options?.key ?? __piniaKey}-${store.$id}`,
        toRaw(store.$state)
      )
    })

    //返回值覆盖pinia 原始值
    return {
      ...data,
    }
  }
}

//初始化pinia
const pinia = createPinia()

//注册pinia 插件
pinia.use(
  piniaPlugin({
    key: "pinia",
  })
)
app
  .use(pinia)
  .use(router)
  .use(lazyPlugin, {
    loading: "http://junyu.shop:1005/storage/article/1/2022-09/1663688912.jpg",
  })
  .directive("Ayy", loadingDirective)
  .mount("body")
