<template>
  <div
    position-fixed
    z-10
    top-0
    left-0
    bottom-0
    right-0
    overflow="scroll"
    style="background: var(--color-background)"
  >
    <muiscList :songs="songs" :data="data"></muiscList>
  </div>
</template>

<script lang="jsx">
import { onMounted, reactive, ref, toRefs } from "vue"
import { $playlistDetail, $Allsong } from "@/service/recommended.js"

import muiscList from "@/components/muiscList/musicList.vue"
export default {
  components: {
    muiscList,
  },
  props: {
    id: {
      type: Number,
    },
  },
  setup: (props) => {
    const ArtistsItem = reactive({
      data: {},
      songs: [],
    })
    onMounted(async () => {
      const { data } = await $playlistDetail({
        id: props.id,
      })
      data.playlist.picUrl = data.playlist.coverImgUrl
      ArtistsItem.data = data.playlist
      if (data.playlist) {
        const { data: song } = await $Allsong({
          ids: data.playlist.trackIds.map((_) => _.id).join(","),
        })
        ArtistsItem.songs = song.songs
      }
    })
    return {
      props,
      ...toRefs(ArtistsItem),
    }
  },
}
</script>
<style scoped></style>
