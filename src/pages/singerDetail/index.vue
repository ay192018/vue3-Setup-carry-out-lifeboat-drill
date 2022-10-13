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
import { onMounted, reactive, ref, toRefs } from "vue";
import { $ArtistDetail, $Artists } from "@/service/singer.js";

import muiscList from "@/components/muiscList/musicList.vue";
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
    });
    onMounted(async () => {
      /*  const { data } = await $ArtistDetail({
        id: props.id,
      }) */
      const { data } = await $Artists({
        id: props.id,
      });
      ArtistsItem.songs = data.hotSongs;
      ArtistsItem.data = data.artist;
      console.log(ArtistsItem.data);
    });
    return {
      props,
      ...toRefs(ArtistsItem),
    };
  },
};
</script>
<style scoped></style>
