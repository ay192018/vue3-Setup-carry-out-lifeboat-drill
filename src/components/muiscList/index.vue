<template>
  <ul>
    <li
      flex
      items-center
      h="64px"
      text-sm
      v-for="(song, index) in songs"
      :key="song.id"
      @click="selectItem(song, index)"
    >
      <div w-25px mr-20px text-center flex-basis-25px>
        <span :class="getRankCls(index)">{{ getRankText(index) }}</span>
      </div>
      <div flex-1 leading-20px overflow-hidden>
        <h2 truncate>{{ song.name }}</h2>
        <p class="desc" truncate mt-4px style="color: var(--vt-name-color)">
          {{ getDesc(song) }}
        </p>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: "song-list",
  props: {
    songs: {
      type: Array,
      default() {
        return []
      },
    },
  },
  emits: ["select"],
  methods: {
    getDesc(song) {
      const name = song.ar.map((_) => _.name)
      return `${name.join("-")}-${song.al.name}`
    },
    selectItem(song, index) {
      this.$emit("select", { song, index })
    },
    getRankCls(index) {
      if (index <= 2) {
        return `icon icon${index}`
      } else {
        return "text"
      }
    },
    getRankText(index) {
      if (index > 2) {
        return index + 1
      }
    },
  },
}
</script>

<style scoped></style>
