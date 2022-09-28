import _$ from "./index"
export function $Banner() {
  return _$({
    url: "/banner",
  })
}
export function $Song(params) {
  return _$({
    url: "/personalized",
    params,
  })
}
