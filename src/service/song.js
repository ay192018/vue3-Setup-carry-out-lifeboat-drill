import _$ from "./index"
export function $songUrl(params) {
  return _$({
    url: "/song/url",
    params,
  })
}
export function $lyrics(params) {
  return _$({
    url: "/lyric",
    params,
  })
}
