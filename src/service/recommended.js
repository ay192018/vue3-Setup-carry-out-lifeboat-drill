import _$ from "./index"
export function $playlistDetail(params) {
  return _$({
    url: "/playlist/detail",
    params,
  })
}
export function $Allsong(params) {
  return _$({
    url: "/song/detail",
    params,
  })
}
