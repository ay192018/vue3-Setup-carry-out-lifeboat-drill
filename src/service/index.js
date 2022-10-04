import axios from "axios"

const _$ = axios.create({
  method: "get",
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 5000,
  method: "get",
  params: {
    withCredentials: true,
    cookie: `MUSIC_A_T=1492087609584; Max-Age=2147483647; Expires=Fri, 08 Sep 2090 14:10:19 GMT; Path=/weapi/feedback; HTTPOnly;NMTID=00O8VuS73zT1rh29Ex4v85mWFGmbT8AAAGCwAvBgA; Max-Age=315360000; Expires=Wed, 18 Aug 2032 10:56:12 GMT; Path=/;;MUSIC_SNS=; Max-Age=0; Expires=Sun, 21 Aug 2022 10:56:12 GMT; Path=/;MUSIC_A_T=1492087609584; Max-Age=2147483647; Expires=Fri, 08 Sep 2090 14:10:19 GMT; Path=/weapi/clientlog; HTTPOnly;MUSIC_R_T=1492087620733; Max-Age=2147483647; Expires=Fri, 08 Sep 2090 14:10:19 GMT; Path=/openapi/clientlog; HTTPOnly;MUSIC_U=d0f16e48129735b9cdfa55f245abd32e0639b68b41201360d2acc6650643b23f519e07624a9f0053f992ef3a40dd6850b4ba9b6ba8d0dc7d624a0c78c60f57390a07db19d0dce5afa0d2166338885bd7; Max-Age=15552000; Expires=Fri, 17 Feb 2023 10:56:12 GMT; Path=/; HTTPOnly;MUSIC_A_T=1492087609584; Max-Age=2147483647; Expires=Fri, 08 Sep 2090 14:10:19 GMT; Path=/wapi/feedback; HTTPOnly;MUSIC_A_T=1492087609584; Max-Age=2147483647; Expires=Fri, 08 Sep 2090 14:10:19 GMT; Path=/api/feedback; HTTPOnly;MUSIC_A_T=1492087609584; Max-Age=2147483647; Expires=Fri, 08 Sep 2090 14:10:19 GMT; Path=/api/clientlog; HTTPOnly;MUSIC_R_T=1492087620733; Max-Age=2147483647; Expires=Fri, 08 Sep 2090 14:10:19 GMT; Path=/api/clientlog; HTTPOnly;MUSIC_A_T=1492087609584; Max-Age=2147483647; Expires=Fri, 08 Sep 2090 14:10:19 GMT; Path=/eapi/feedback; HTTPOnly;MUSIC_R_T=1492087620733; Max-Age=2147483647; Expires=Fri, 08 Sep 2090 14:10:19 GMT; Path=/wapi/clientlog; HTTPOnly;MUSIC_R_T=1492087620733; Max-Age=2147483647; Expires=Fri, 08 Sep 2090 14:10:19 GMT; Path=/api/feedback; HTTPOnly;MUSIC_A_T=1492087609584; Max-Age=2147483647; Expires=Fri, 08 Sep 2090 14:10:19 GMT; Path=/neapi/clientlog; HTTPOnly;MUSIC_R_T=1492087620733; Max-Age=2147483647; Expires=Fri, 08 Sep 2090 14:10:19 GMT; Path=/weapi/feedback; HTTPOnly;MUSIC_A_T=1492087609584; Max-Age=2147483647; Expires=Fri, 08 Sep 2090 14:10:19 GMT; Path=/eapi/clientlog; HTTPOnly;MUSIC_R_T=1492087620733; Max-Age=2147483647; Expires=Fri, 08 Sep 2090 14:10:19 GMT; Path=/wapi/feedback; HTTPOnly;MUSIC_R_T=1492087620733; Max-Age=2147483647; Expires=Fri, 08 Sep 2090 14:10:19 GMT; Path=/neapi/feedback; HTTPOnly;__csrf=aa003b1ce9307b9758d5ee87827e1aaa; Max-Age=1296010; Expires=Mon, 05 Sep 2022 10:56:22 GMT; Path=/;;MUSIC_R_T=1492087620733; Max-Age=2147483647; Expires=Fri, 08 Sep 2090 14:10:19 GMT; Path=/weapi/clientlog; HTTPOnly;MUSIC_A_T=1492087609584; Max-Age=2147483647; Expires=Fri, 08 Sep 2090 14:10:19 GMT; Path=/openapi/clientlog; HTTPOnly;MUSIC_R_T=1492087620733; Max-Age=2147483647; Expires=Fri, 08 Sep 2090 14:10:19 GMT; Path=/eapi/clientlog; HTTPOnly;MUSIC_R_T=1492087620733; Max-Age=2147483647; Expires=Fri, 08 Sep 2090 14:10:19 GMT; Path=/neapi/clientlog; HTTPOnly;MUSIC_R_T=1492087620733; Max-Age=2147483647; Expires=Fri, 08 Sep 2090 14:10:19 GMT; Path=/eapi/feedback; HTTPOnly;MUSIC_A_T=1492087609584; Max-Age=2147483647; Expires=Fri, 08 Sep 2090 14:10:19 GMT; Path=/neapi/feedback; HTTPOnly;MUSIC_A_T=1492087609584; Max-Age=2147483647; Expires=Fri, 08 Sep 2090 14:10:19 GMT; Path=/wapi/clientlog; HTTPOnly`,
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
