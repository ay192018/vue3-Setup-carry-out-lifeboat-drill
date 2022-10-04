export const formatTime = (time) => {
  return `${Math.floor(time / 1000 / 60) < 10 ? 0 : ""}${Math.floor(
    time / 1000 / 60
  )}:${
    (Math.floor(time / 1000) / 60 - Math.floor(Math.floor(time / 1000) / 60)) *
      60 <
    10
      ? 0
      : ""
  }${(
    (Math.floor(time / 1000) / 60 - Math.floor(Math.floor(time / 1000) / 60)) *
    60
  ).toFixed(0)}`
}
export function formatTimeStart(interval) {
  interval = interval | 0
  const minute = (((interval / 60) | 0) + "").padStart(2, "0")
  const second = ((interval % 60) + "").padStart(2, "0")
  return `${minute}:${second}`
}
export const getLyric = (lyric) => {
  if (lyric === "") return
  let time = ""
  let value = ""
  const lyr = lyric.split("\n")
  const result = []
  const key = []
  lyr.forEach((item, index) => {
    //清除空字串
    if (item === "") {
      lyr.splice(index, 1)
    }
  })

  lyr.forEach((item) => {
    time = item.split("]")[0]
    value = item.split("]")[1]
    let t = time.slice(1).split(":")
    result.push({
      time: parseInt(t[0], 10) * 60 + parseFloat(t[1]),
      itemLyric: value,
    })
    key.push(parseInt(t[0], 10) * 60 + parseFloat(t[1]))
  })

  return {
    result,
    key,
  }
}
