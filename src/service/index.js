import axios from "axios"

const _$ = axios.create({
  method: "get",
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 5000,
  method: "get",
  params: {
    withCredentials: true,
  },
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
  },
})
//拦截器
_$.interceptors.request.use(
  (config) => {
    if (localStorage.getItem("Ayyy-user")) {
      config.params.cookie = JSON.parse(
        localStorage.getItem("Ayyy-user")
      )?.cookie
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
_$.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)
export default _$
