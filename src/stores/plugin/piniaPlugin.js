import { toRaw } from "vue"
const __piniaKey = "__PINIAKEY__"
const setStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
}
const getStorage = (key) => {
  return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : {}
}

const piniaPlugin = (options) => {
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
export default piniaPlugin
