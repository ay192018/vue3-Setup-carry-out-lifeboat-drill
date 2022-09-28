import _$ from "./index"
export function $Artist(params) {
  return _$({
    url: "/artist/list",
    params,
  })
}
export function $HotArtist(params) {
  return _$({
    url: "/top/artists",
    params,
  })
}
export function $ArtistDetail(params) {
  return _$({
    url: "/artist/detail",
    params,
  })
}
export function $Artists(params) {
  return _$({
    url: "/artists",
    params,
  })
}
